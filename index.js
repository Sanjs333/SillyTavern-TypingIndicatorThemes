import {
  characters,
  chat,
  eventSource,
  event_types,
  getRequestHeaders,
  getThumbnailUrl,
  isStreamingEnabled,
  name1,
  name2,
  saveSettings,
  saveSettingsDebounced,
  this_chid,
} from "../../../../script.js";
import { extension_settings } from "../../../extensions.js";
import { groups, selected_group } from "../../../group-chats.js";
import { t } from "../../../i18n.js";
import { user_avatar } from "../../../personas.js";
import { power_user } from "../../../power-user.js";
import { updateWorldInfoList } from "../../../world-info.js";
import {
  bubbleStyles as defaultBubbleStyles,
  presets as defaultPresets,
  themes as defaultThemes,
} from "./definitions.js";
const FPSMonitor = {
    enabled: false,
    frames: 0,
    lastTime: performance.now(),
    fps: 0,
    element: null,
    _boundLoop: null,

    start() {
        if (this.enabled) return;
        this.enabled = true;
        this._boundLoop = this._boundLoop || this.loop.bind(this);
        this.createDisplay();
        this.loop();
    },

    stop() {
        this.enabled = false;
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    },

    createDisplay() {
        this.element = document.createElement("div");
        this.element.id = "ti-fps-monitor";
        this.element.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: #0f0;
            padding: 8px 12px;
            font-family: monospace;
            font-size: 14px;
            z-index: 99999;
            border-radius: 4px;
            pointer-events: none;
        `;
        document.body.appendChild(this.element);
    },

    loop() {
        if (!this.enabled) return;

        this.frames++;
        const now = performance.now();
        const delta = now - this.lastTime;

        if (delta >= 1000) {
            this.fps = Math.round((this.frames * 1000) / delta);
            this.frames = 0;
            this.lastTime = now;

            if (this.element) {
                const color =
                    this.fps >= 50 ? "#0f0" : this.fps >= 30 ? "#ff0" : "#f00";
                this.element.style.color = color;
                this.element.textContent = `FPS: ${this.fps}`;
            }
        }

        requestAnimationFrame(this._boundLoop);
    },
};

window.TI_FPS = FPSMonitor;

let acornPromise = null;
let messageFlushScheduled = false;
const PLUGIN_VERSION = "4.3";
const pendingMessages = new Map();
const pendingSearches = new Map();
const BGM_REGEX = /\[bgm\]([^\[\]]+)-([^\[\]]+?)\[\/bgm\]/g;

function playlistsAreDifferent(oldList, newList) {
    if (oldList === newList) return false;
    if (!oldList || !newList) return true;
    if (oldList.length !== newList.length) return true;
    if (oldList.length === 0) return false;
    for (let i = 0; i < oldList.length; i++) {
        if (oldList[i]?.id !== newList[i]?.id) return true;
        if (!oldList[i]?.id && oldList[i]?.audioUrl !== newList[i]?.audioUrl)
            return true;
    }
    return false;
}

function queuePostMessage(targetWindow, message, origin = "*") {
    if (!targetWindow) return;
    const immediateTypes = [
        "graceful-shutdown-request",
        "graceful-shutdown-response",
        "play-now",
        "toggle-playback",
        "context-update",
    ];

    if (immediateTypes.includes(message.type)) {
        targetWindow.postMessage(message, origin);
        return;
    }
    const key = `${message.type}_${message.containerId || "default"}`;
    pendingMessages.set(key, { targetWindow, message, origin });

    if (!messageFlushScheduled) {
        messageFlushScheduled = true;
        requestAnimationFrame(() => {
            pendingMessages.forEach(({ targetWindow, message, origin }) => {
                try {
                    targetWindow.postMessage(message, origin);
                } catch (e) {}
            });
            pendingMessages.clear();
            messageFlushScheduled = false;
        });
    }
}

const CHANGELOG = {
    4.3: {
        date: "2026-6-5",
        title: {
            zh: "指示器与悬浮歌词修复",
            en: "Indicator and Floating Lyrics Fixes",
            th: "แก้ไขตัวบ่งชี้และเนื้อเพลงลอย",
        },
        content: {
            zh: `### 问题修复
- 修复了重新生成、重抽回复等场景下，指示器可能不出现或中途消失的问题
- 修复了开启「自动跟随主界面主题」后，自动切到 iframe 主题时指示器可能不显示的问题
- 修复了 iframe 主题不支持当前位置时直接不显示的问题，现在会自动回退到可用位置
- 修复了切换音源后，悬浮歌词可能丢失「原文（译文）」同行翻译的问题
- 修复了旧设置中没有版本记录时，内置项自动更新逻辑可能被跳过的问题

### 体验优化
- 生成开始时增加了停止按钮兜底检测，重新生成时显示更稳定
- 自动跟随主题时对 iframe 主题的兼容性更好
- 悬浮歌词在换源后会优先使用独立翻译歌词；如果没有，则保留歌词行内自带翻译

> 更新后建议刷新或重启 SillyTavern，以确保前端脚本和内置项完全更新
`,
            en: `### Bug Fixes
- Fixed the indicator sometimes not appearing or disappearing during regenerate / reroll scenarios
- Fixed the indicator not showing when Auto-sync with Main UI Theme switches to an iframe theme
- Fixed iframe themes failing silently when the current indicator position is unsupported; it now falls back to a supported position
- Fixed floating lyrics losing inline translations after source switching, such as "original (translation)" format
- Fixed built-in item auto-restore possibly being skipped when old settings had no stored version record

### UX Improvements
- Added a fallback display trigger based on the stop button for more reliable regenerate behavior
- Improved compatibility when auto-following iframe themes
- Floating lyrics now prefer separate translated lyrics, and fall back to inline translations when no separate translation is available

> Please refresh or restart SillyTavern after updating to ensure frontend scripts and built-in items are fully updated
`,
            th: `### การแก้ไขข้อบกพร่อง
- แก้ไขปัญหาตัวบ่งชี้อาจไม่แสดงหรือหายไประหว่างการสร้างคำตอบใหม่ / สุ่มคำตอบใหม่
- แก้ไขปัญหาตัวบ่งชี้ไม่แสดงเมื่อเปิดการซิงก์ธีมหลักอัตโนมัติแล้วสลับไปยังธีม iframe
- แก้ไขปัญหาธีม iframe ไม่แสดงผลเมื่อไม่รองรับตำแหน่งปัจจุบัน ตอนนี้จะย้อนกลับไปยังตำแหน่งที่ใช้ได้โดยอัตโนมัติ
- แก้ไขปัญหาเนื้อเพลงลอยสูญเสียคำแปลแบบอยู่ในบรรทัดเดียวกันหลังเปลี่ยนแหล่งเพลง เช่น รูปแบบ "ต้นฉบับ (คำแปล)"
- แก้ไขปัญหาการกู้คืนรายการในตัวอาจถูกข้าม หากการตั้งค่าเก่าไม่มีข้อมูลเวอร์ชัน

### ปรับปรุงประสบการณ์
- เพิ่มกลไกสำรองจากปุ่มหยุด เพื่อให้ตัวบ่งชี้แสดงได้เสถียรขึ้นระหว่างการสร้างใหม่
- ปรับปรุงความเข้ากันได้เมื่อซิงก์ไปยังธีม iframe อัตโนมัติ
- เนื้อเพลงลอยจะใช้คำแปลแยกก่อน หากไม่มีจึงใช้คำแปลที่อยู่ในบรรทัดเดียวกัน

> หลังอัปเดต แนะนำให้รีเฟรชหรือรีสตาร์ท SillyTavern เพื่อให้สคริปต์และรายการในตัวอัปเดตครบถ้วน
`,
        },
    },
};

function checkAndAutoRestoreBuiltIns() {
    const settings = extension_settings[MODULE];
    if (!settings) return false;

    const lastSeenVersion = settings.lastSeenVersion || "0.0.0";
    if (lastSeenVersion === PLUGIN_VERSION) return false;
    debugLog(
        `[TI] 检测到版本升级 ${lastSeenVersion} → ${PLUGIN_VERSION}，自动恢复内置项...`,
    );

    const userCreatedPresets = (settings.textPresets || []).filter(
        (p) => !p.isBuiltIn,
    );
    const userCreatedThemes = (settings.themes || []).filter(
        (t) => !t.isBuiltIn,
    );
    const userCreatedBubbles = (settings.bubbleStyles || []).filter(
        (s) => !s.isBuiltIn,
    );

    _needsSync = true;
    const deleted = settings.deletedBuiltIns || {
        themes: [],
        textPresets: [],
        bubbleStyles: [],
    };

    settings.textPresets = [
        ...userCreatedPresets,
        ...structuredClone(defaultPresets).filter(
            (p) => !deleted.textPresets.includes(p.id),
        ),
    ];
    settings.themes = [
        ...userCreatedThemes,
        ...structuredClone(defaultThemes).filter(
            (t) => !deleted.themes.includes(t.id),
        ),
    ];
    settings.bubbleStyles = [
        ...userCreatedBubbles,
        ...structuredClone(defaultBubbleStyles).filter(
            (s) => !deleted.bubbleStyles.includes(s.id),
        ),
    ];

    if (
        !settings.textPresets.some(
            (p) => p.id === settings.selectedTextPresetId,
        )
    ) {
        settings.selectedTextPresetId = "cat_default";
    }
    if (!settings.themes.some((t) => t.id === settings.selectedThemeId)) {
        settings.selectedThemeId = "default";
    }
    if (
        !settings.bubbleStyles.some(
            (s) => s.id === settings.selectedBubbleStyleId,
        )
    ) {
        settings.selectedBubbleStyleId = "bubble_default";
    }

    settings.lastSeenVersion = PLUGIN_VERSION;
    saveSettingsDebounced();

    debugLog("[TI] ✓ 内置项已自动更新");
    return true;
}

function checkAndShowChangelog() {
    const settings = getSettings();
    const lastShownChangelogVersion =
        settings.lastShownChangelogVersion || "0.0.0";

    if (lastShownChangelogVersion === PLUGIN_VERSION) {
        return;
    }

    const userLang = (
        power_user?.language ||
        navigator.language ||
        "en"
    ).toLowerCase();
    let currentLang = "en";

    if (userLang.startsWith("zh")) {
        currentLang = "zh";
    } else if (userLang.startsWith("th")) {
        currentLang = "th";
    }

    const changelog = CHANGELOG[PLUGIN_VERSION];
    if (!changelog) return;

    const title = changelog.title[currentLang] || changelog.title.en;
    const content = changelog.content[currentLang] || changelog.content.en;

    const converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
        ghCodeBlocks: true,
    });
    const htmlContent = converter.makeHtml(content);

    const dialogHtml = `
        <dialog id="ti_changelog_dialog" style="
            max-width: 500px;
            max-height: 80vh;
            border-radius: 12px;
            border: 1px solid var(--SmartThemeBorderColor, #444);
            background: var(--SmartThemeBlurTintColor, #1a1a2e);
            color: var(--SmartThemeBodyColor, #fff);
            padding: 0;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        ">
            <div style="
                padding: 16px 20px;
                border-bottom: 1px solid var(--SmartThemeBorderColor, #444);
            ">
                <h3 style="margin: 0; font-size: 1.2em;">${title}</h3>
                <small style="opacity: 0.6;">v${PLUGIN_VERSION} · ${changelog.date}</small>
            </div>
            <div id="ti_changelog_content" style="
                padding: 20px;
                overflow-y: auto;
                max-height: 60vh;
                line-height: 1.7;
            ">
                ${htmlContent}
            </div>
            <div style="
    padding: 12px 20px;
    border-top: 1px solid var(--SmartThemeBorderColor, #444);
    display: flex;
    justify-content: flex-end;
">
    <button id="ti_changelog_close" class="menu_button" style="
        padding: 8px 20px;
        font-weight: bold;
        white-space: nowrap;
    ">${currentLang === "zh" ? "我知道了" : currentLang === "th" ? "เข้าใจแล้ว" : "Got it"}</button>
</div>
        </dialog>
    `;

    document.body.insertAdjacentHTML("beforeend", dialogHtml);

    const dialog = document.getElementById("ti_changelog_dialog");

    const style = document.createElement("style");
    style.id = "ti-changelog-style";
    style.textContent = `
        #ti_changelog_dialog::backdrop {
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(4px);
        }
        #ti_changelog_content h3 {
            margin: 16px 0 8px 0;
            font-size: 1.1em;
            color: var(--SmartThemeQuoteColor, #88c0d0);
        }
        #ti_changelog_content h3:first-child {
            margin-top: 0;
        }
        #ti_changelog_content ul {
            margin: 8px 0;
            padding-left: 20px;
        }
        #ti_changelog_content li {
            margin: 4px 0;
        }
        #ti_changelog_content blockquote {
            margin: 10px 0;
            padding: 8px 12px;
            background: rgba(255,255,255,0.05);
            border-left: 3px solid var(--SmartThemeQuoteColor, #88c0d0);
            border-radius: 0 6px 6px 0;
        }
        #ti_changelog_content strong {
            color: var(--SmartThemeQuoteColor, #88c0d0);
        }
        #ti_changelog_content code {
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
    dialog.showModal();
    [
        "click",
        "mousedown",
        "mouseup",
        "pointerdown",
        "pointerup",
        "touchstart",
        "touchend",
    ].forEach((evt) => {
        dialog.addEventListener(evt, (e) => e.stopPropagation());
    });
    dialog.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    });
    dialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dialog.close();
    });

    const closeBtn = document.getElementById("ti_changelog_close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => dialog.close());
    }

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
        settings.lastShownChangelogVersion = PLUGIN_VERSION;
        saveSettingsDebounced();
        dialog.remove();
        document.getElementById("ti-changelog-style")?.remove();
    });
}

function loadScript(src) {
    if (acornPromise) {
        return acornPromise;
    }

    acornPromise = new Promise((resolve, reject) => {
        if (typeof window.acorn !== "undefined") {
            return resolve();
        }

        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve();
        };
        script.onerror = (err) => {
            console.error("[TI] Acorn 脚本加载失败:", err);
            reject(new Error(`脚本加载失败: ${src}`));
        };
        document.head.appendChild(script);
    });

    return acornPromise;
}

async function validateJavaScriptSyntax(jsCode) {
    if (!jsCode || jsCode.trim() === "") {
        return { isValid: true, error: null };
    }

    try {
        await acornPromise;
        window.acorn.parse(jsCode, { ecmaVersion: "latest", silent: true });

        return { isValid: true, error: null };
    } catch (e) {
        if (typeof window.acorn === "undefined") {
            console.warn("[TI] Acorn 库加载失败，跳过 JS 语法校验");
            return { isValid: true, error: null };
        } else {
            return {
                isValid: false,
                error: {
                    message: e.message ? e.message.split(" (")[0] : String(e),
                    line: e.loc?.line ?? 0,
                    column: e.loc?.column ?? 0,
                },
            };
        }
    }
}

async function getOrCreateIframe(theme, indicatorElement, characterName) {
    debugLog(`[IndicatorPool] 创建新实例: ${theme.name}`);
    const newIframe = await createUnifiedIframeOriginal(
        theme,
        indicatorElement,
        characterName,
    );

    if (newIframe) {
        newIframe.style.display = "block";
    }

    return newIframe;
}

function releaseIframeToPool(indicatorElement) {
    const iframe = indicatorElement.querySelector(".theme-iframe");
    if (!iframe) return;

    if (iframe.contentWindow) {
        try {
            iframe.contentWindow.postMessage(
                {
                    source: "typing-indicator-host",
                    type: "pause-theme",
                },
                "*",
            );
        } catch (e) {}
    }
    iframe.remove();
}

function postContextWhenReady(containerId, retry = 6) {
    const ctx = getCurrentCharContext();
    const invalid =
        !ctx.charName ||
        ctx.charName === "{{char}}" ||
        (ctx.charAvatarUrl || "").includes("{{char}}");

    if (invalid && retry > 0) {
        return setTimeout(
            () => postContextWhenReady(containerId, retry - 1),
            40,
        );
    }

    const container = containerId
        ? document.getElementById(containerId)
        : document.getElementById("typing_indicator");
    const iframe = container?.querySelector(".theme-iframe");

    if (iframe?.contentWindow) {
        queuePostMessage(
            iframe.contentWindow,
            {
                source: "typing-indicator-host",
                type: "context-update",
                data: ctx,
            },
            "*",
        );
    }
}

async function createUnifiedIframeOriginal(
    theme,
    indicatorElement,
    characterName,
) {
    if (!theme.useIframe) return null;

    const iframe = document.createElement("iframe");
    iframe.className = "theme-iframe";
    iframe.style.cssText = `border: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: transparent; pointer-events: auto; z-index: 1;`;
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    const userName = getCurrentUserName();
    const avatarUrls = getAvatarUrls();
    const charName = characterName || getCurrentCharName();

    function jsEscape(str) {
        if (str === null || str === undefined) return "null";
        return String(str)
            .replace(/[\\'"]/g, "\\$&")
            .replace(/\u0000/g, "\\0")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029");
    }

    let processedHTML =
        theme.html || `<div>${t`No HTML content provided.`}</div>`;
    const safeCharName = escapeHtml(charName);
    const safeUserName = escapeHtml(userName);
    processedHTML = processedHTML
        .replace(/\$\{name2\}/g, safeCharName)
        .replace(/\{\{char\}\}/g, safeCharName)
        .replace(/\{\{user\}\}/g, safeUserName)
        .replace(/\{\{char_avatar_url\}\}/g, avatarUrls.char)
        .replace(/\{\{user_avatar_url\}\}/g, avatarUrls.user)
        .replace(
            /\{\{char_avatar\}\}/g,
            `<img class="typing-indicator-avatar" src="${avatarUrls.char}">`,
        )
        .replace(
            /\{\{user_avatar\}\}/g,
            `<img class="typing-indicator-avatar" src="${avatarUrls.user}">`,
        );
    const isPlayerTheme =
        theme.name &&
        (theme.name.startsWith("播放器") || theme.name.startsWith("Player"));
    const dragInjection = isPlayerTheme
        ? `
        (function setupDragForwarding() {
            let dragState = null;
            let blockClick = false;
            let pendingDrag = null;
            let dragRaf = null;
            let lastTouchEndAt = 0;

            document.addEventListener("dragstart", function(e) { e.preventDefault(); return false; }, true);

            const dragStyle = document.createElement("style");
            dragStyle.textContent = [
                "html, body, body * {",
                "  -webkit-user-drag: none !important;",
                "  user-drag: none !important;",
                "  -webkit-tap-highlight-color: transparent !important;",
                "  -webkit-touch-callout: none !important;",
                "}",
                "input, textarea, [contenteditable='true'] {",
                "  -webkit-user-select: text !important;",
                "  user-select: text !important;",
                "}",
                "body *:not(input):not(textarea):not([contenteditable='true']) {",
                "  -webkit-user-select: none !important;",
                "  user-select: none !important;",
                "}",
                "button, [role='button'], a {",
                "  outline: none !important;",
                "  -webkit-focus-ring-color: transparent !important;",
                "}"
            ].join("");
            document.head.appendChild(dragStyle);

            function shouldSkipDrag(target) {
                if (target.closest(
                    "button, input, select, textarea, a[href], " +
                    "[role='button'], [role='slider'], [role='menuitem'], " +
                    "[type='range'], [contenteditable='true'], " +
                    "li, [data-no-drag]"
                )) return true;
                if (target.closest(
                    ".search-results, .search-result-item, " +
                    ".playlist-list, .lyrics-container, " +
                    ".gmp-scroll-list, .gmp-list-item, .gmp-lyrics-container, " +
                    ".gmp-search-item, .gmp-list-item-content"
                )) return true;
                let el = target;
                while (el && el !== document.body) {
                    const style = window.getComputedStyle(el);
                    const overflowY = style.overflowY;
                    if ((overflowY === "auto" || overflowY === "scroll") &&
                        el.scrollHeight > el.clientHeight) {
                        return true;
                    }
                    el = el.parentElement;
                }
                return false;
            }

            function flushDrag() {
                dragRaf = null;
                if (pendingDrag) {
                    ThemeUtils.sendMessage("theme-drag-move", pendingDrag);
                    pendingDrag = null;
                }
            }

            function getCoords(e) {
                if (e.touches && e.touches[0]) {
                    return { x: e.touches[0].screenX, y: e.touches[0].screenY };
                }
                if (e.changedTouches && e.changedTouches[0]) {
                    return { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
                }
                return { x: e.screenX, y: e.screenY };
            }

            function onStart(e) {
                if (e.type === "mousedown" && e.button !== undefined && e.button !== 0) return;
                if (e.type === "mousedown" && Date.now() - lastTouchEndAt < 500) return;
                if (shouldSkipDrag(e.target)) return;
                const coords = getCoords(e);
                dragState = {
                    startScreenX: coords.x,
                    startScreenY: coords.y,
                    moved: false,
                    target: e.target
                };
            }

            function onMove(e) {
                if (!dragState) return;
                const coords = getCoords(e);
                const dx = coords.x - dragState.startScreenX;
                const dy = coords.y - dragState.startScreenY;
                if (!dragState.moved && Math.hypot(dx, dy) > 5) {
                    dragState.moved = true;
                    ThemeUtils.sendMessage("theme-drag-start", {});
                    document.body.style.userSelect = "none";
                }
                if (dragState.moved) {
                    if (e.cancelable) e.preventDefault();
                    pendingDrag = { dx: dx, dy: dy };
                    if (!dragRaf) dragRaf = requestAnimationFrame(flushDrag);
                }
            }

            function onEnd(e) {
                if (e && e.type === "touchend") lastTouchEndAt = Date.now();
                if (!dragState) return;
                document.body.style.userSelect = "";
                if (dragState.moved) {
                    if (dragRaf) { cancelAnimationFrame(dragRaf); dragRaf = null; }
                    if (pendingDrag) {
                        ThemeUtils.sendMessage("theme-drag-move", pendingDrag);
                        pendingDrag = null;
                    }
                    ThemeUtils.sendMessage("theme-drag-end", {});
                    blockClick = true;
                    setTimeout(function() { blockClick = false; }, 100);
                }
                dragState = null;
            }
            document.addEventListener("mousedown", onStart, true);
            document.addEventListener("mousemove", onMove, true);
            document.addEventListener("mouseup", onEnd, true);
            document.addEventListener("touchstart", onStart, { capture: true, passive: false });
            document.addEventListener("touchmove", onMove, { capture: true, passive: false });
            document.addEventListener("touchend", onEnd, { capture: true, passive: false });
            document.addEventListener("touchcancel", onEnd, { capture: true, passive: false });

            document.addEventListener("click", function(e) {
                if (blockClick) {
                    e.stopPropagation();
                    e.preventDefault();
                    blockClick = false;
                }
            }, true);
        })();
    `
        : "";
    const favoriteInjection = isPlayerTheme
        ? `
        (function setupFavoriteDialog() {
            let favDialog = null;
            let currentFavTrack = null;
            const ensureStyle = () => {
                if (document.getElementById("ti-fav-style")) return;
                const s = document.createElement("style");
                s.id = "ti-fav-style";
                s.textContent =
                    ".ti-fav-dialog{position:absolute;inset:0;z-index:300;display:flex;align-items:center;justify-content:center}" +
                    ".ti-fav-dialog.hidden{display:none}" +
                    ".ti-fav-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(4px)}" +
                    ".ti-fav-content{position:relative;background:linear-gradient(180deg,rgba(50,50,50,0.96),rgba(28,28,28,0.98));border-radius:14px;padding:14px 12px;width:84%;max-width:280px;max-height:74%;display:flex;flex-direction:column;color:#fff;box-shadow:0 10px 28px rgba(0,0,0,0.55);animation:ti-fav-pop .22s ease;font-family:inherit}" +
                    "@keyframes ti-fav-pop{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}" +
                    ".ti-fav-title{font-size:13px;font-weight:600;text-align:center;margin-bottom:10px;opacity:.85}" +
                    ".ti-fav-list{flex:1;overflow-y:auto;margin:0 -2px;padding:0 2px;scrollbar-width:none}" +
                    ".ti-fav-list::-webkit-scrollbar{display:none}" +
                    ".ti-fav-item{display:flex;align-items:center;width:100%;padding:10px 10px;border-radius:8px;border:none;background:transparent;color:#fff;font-size:13px;text-align:left;cursor:pointer;font-family:inherit;transition:background .2s}" +
                    ".ti-fav-item:hover{background:rgba(255,255,255,.08)}" +
                    ".ti-fav-item.in{color:#ff8a8a}" +
                    ".ti-fav-item-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
                    ".ti-fav-item-count{font-size:11px;opacity:.5;margin-left:8px}" +
                    ".ti-fav-item-mark{font-size:14px;margin-left:6px}" +
                    ".ti-fav-new{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:8px;padding:10px;border-radius:8px;background:rgba(255,255,255,.06);border:1px dashed rgba(255,255,255,.22);color:#fff;font-size:13px;cursor:pointer;font-family:inherit;transition:all .2s}" +
                    ".ti-fav-new:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.4)}" +
                    ".ti-fav-empty,.ti-fav-loading{text-align:center;padding:24px 10px;font-size:13px;opacity:.6}" +
                    ".ti-fav-name-input{flex:1;min-width:0;padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-size:13px;outline:none;font-family:inherit}" +
                    ".ti-fav-name-input:focus{border-color:rgba(255,255,255,.5)}" +
                    ".ti-fav-name-actions{display:flex;gap:4px;margin-left:6px}" +
                    ".ti-fav-name-ok,.ti-fav-name-cancel{width:26px;height:26px;border-radius:6px;border:none;cursor:pointer;font-size:14px;font-family:inherit;display:flex;align-items:center;justify-content:center}" +
                    ".ti-fav-name-ok{background:rgba(255,255,255,.15);color:#fff}" +
                    ".ti-fav-name-cancel{background:rgba(255,255,255,.08);color:#fff}";
                document.head.appendChild(s);
            };
            const escapeHtml = (s) => {
                const d = document.createElement("div");
                d.textContent = s == null ? "" : s;
                return d.innerHTML;
            };
            const closeDialog = () => {
                if (favDialog) {
                    favDialog.classList.add("hidden");
                    const newBtn = favDialog.querySelector(".ti-fav-new");
                    if (newBtn && newBtn.dataset.editing === "1") {
                        newBtn.dataset.editing = "0";
                        newBtn.innerHTML = '<span style="font-size:16px;line-height:1">+</span><span>新建歌单</span>';
                    }
                }
                currentFavTrack = null;
            };
            const ensureDialog = () => {
                if (favDialog) return favDialog;
                ensureStyle();
                favDialog = document.createElement("div");
                favDialog.className = "ti-fav-dialog hidden";
                favDialog.innerHTML =
                    '<div class="ti-fav-backdrop"></div>' +
                    '<div class="ti-fav-content">' +
                        '<div class="ti-fav-title">添加到歌单</div>' +
                        '<div class="ti-fav-list"><div class="ti-fav-loading">加载中...</div></div>' +
                        '<button class="ti-fav-new" type="button"><span style="font-size:16px;line-height:1">+</span><span>新建歌单</span></button>' +
                    '</div>';
                document.body.appendChild(favDialog);
                favDialog.querySelector(".ti-fav-backdrop").addEventListener("click", closeDialog);
                favDialog.querySelector(".ti-fav-new").addEventListener("click", () => {
                    const newBtn = favDialog.querySelector(".ti-fav-new");
                    if (newBtn.dataset.editing === "1") return;
                    if (!currentFavTrack) return;
                    newBtn.dataset.editing = "1";
                    newBtn.innerHTML =
                        '<input type="text" class="ti-fav-name-input" placeholder="歌单名称" maxlength="30">' +
                        '<span class="ti-fav-name-actions">' +
                            '<button class="ti-fav-name-ok" type="button">✓</button>' +
                            '<button class="ti-fav-name-cancel" type="button">✕</button>' +
                        '</span>';
                    const input = newBtn.querySelector(".ti-fav-name-input");
                    setTimeout(() => input.focus(), 50);
                    const reset = () => {
                        newBtn.dataset.editing = "0";
                        newBtn.innerHTML = '<span style="font-size:16px;line-height:1">+</span><span>新建歌单</span>';
                    };
                    const submit = () => {
                        const name = input.value.trim();
                        if (!name) return;
                        ThemeUtils.sendMessage("favorite-create-playlist", {
                            name: name,
                            track: currentFavTrack
                        });
                        closeDialog();
                    };
                    input.addEventListener("keydown", (ev) => {
                        ev.stopPropagation();
                        if (ev.key === "Enter") { ev.preventDefault(); submit(); }
                        if (ev.key === "Escape") { ev.preventDefault(); reset(); }
                    });
                    input.addEventListener("click", (ev) => ev.stopPropagation());
                    newBtn.querySelector(".ti-fav-name-ok").addEventListener("click", (ev) => {
                        ev.stopPropagation();
                        submit();
                    });
                    newBtn.querySelector(".ti-fav-name-cancel").addEventListener("click", (ev) => {
                        ev.stopPropagation();
                        reset();
                    });
                });
                return favDialog;
            };
            const renderList = (playlists, statusMap) => {
                if (!favDialog) return;
                const list = favDialog.querySelector(".ti-fav-list");
                if (!playlists || playlists.length === 0) {
                    list.innerHTML = '<div class="ti-fav-empty">还没有歌单，点下面新建一个吧~</div>';
                    return;
                }
                list.innerHTML = playlists.map((p) => {
                    const isIn = !!(statusMap && statusMap[p.id]);
                    return '<button class="ti-fav-item ' + (isIn ? "in" : "") + '" type="button" data-id="' + p.id + '">' +
                        '<span class="ti-fav-item-name">' + escapeHtml(p.name) + '</span>' +
                        '<span class="ti-fav-item-count">' + (p.songCount || 0) + '</span>' +
                        '<span class="ti-fav-item-mark">' + (isIn ? "♥" : "♡") + '</span>' +
                        '</button>';
                }).join("");
                list.querySelectorAll(".ti-fav-item").forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const id = btn.dataset.id;
                        const isIn = btn.classList.contains("in");
                        ThemeUtils.sendMessage("favorite-toggle-playlist", {
                            playlistId: id,
                            track: currentFavTrack,
                            isCurrentlyIn: isIn
                        });
                        closeDialog();
                    });
                });
            };
            window.ThemeUtils.toggleFavorite = function(track) {
                if (!track) return;
                const title = track.originalTitle || track.title || track.name || "";
                const artistRaw = track.originalArtist || track.artist || "";
                const artist = Array.isArray(artistRaw) ? artistRaw.join(" / ") : artistRaw;
                if (!title) return;
                currentFavTrack = { title: title, artist: artist, coverUrl: track.coverUrl || "" };
                const dialog = ensureDialog();
                dialog.classList.remove("hidden");
                dialog.querySelector(".ti-fav-list").innerHTML = '<div class="ti-fav-loading">加载中...</div>';
                ThemeUtils.sendMessage("favorite-query-list", { track: currentFavTrack });
            };
            window.ThemeUtils.queryFavoriteStatus = function(track) {
                if (!track) return;
                const title = track.originalTitle || track.title || track.name || "";
                const artistRaw = track.originalArtist || track.artist || "";
                const artist = Array.isArray(artistRaw) ? artistRaw.join(" / ") : artistRaw;
                if (!title) return;
                ThemeUtils.sendMessage("favorite-query-status", { track: { title: title, artist: artist } });
            };
            window.addEventListener("message", (event) => {
                if (event.data && event.data.source === "typing-indicator-host" && event.data.type === "favorite-list-response") {
                    const d = event.data.data || {};
                    renderList(d.playlists || [], d.statusMap || {});
                }
            });
        })();
    `
        : "";
    const finalJS = `
        (function() {
            window.addEventListener('error', function(e) { console.error('[Theme Error]:', e.error ? e.error.stack : e.message); });
            window.themeData = {
                id: '${jsEscape(theme.id || "preview")}',
                containerId: '${jsEscape(indicatorElement.id)}',
                charName: '${jsEscape(charName)}',
                userName: '${jsEscape(userName)}',
                charAvatarUrl: '${jsEscape(avatarUrls.char)}',
                userAvatarUrl: '${jsEscape(avatarUrls.user)}',
                playlist: ${JSON.stringify(null)}
            };
            const ThemeUtils = { getCharacterName: () => window.themeData.charName, getUserName: () => window.themeData.userName, getCharAvatar: () => window.themeData.charAvatarUrl, getUserAvatar: () => window.themeData.userAvatarUrl, getPlaylist: () => window.themeData.playlist, sendMessage: (type, data, themeId) => { try { const idToSend = themeId || window.themeData.id; window.parent.postMessage({ source: 'typing-indicator-theme', type: type, data: data, themeId: idToSend, containerId: window.themeData.containerId, }, '*'); } catch (e) { console.warn('Cannot send message to parent:', e); } }, $: (selector) => document.querySelector(selector), $$: (selector) => document.querySelectorAll(selector), animate: (callback) => { function loop() { callback(); requestAnimationFrame(loop); } requestAnimationFrame(loop); }, random: (min = 0, max = 1) => Math.random() * (max - min) + min, randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min, hsl: (h, s, l) => 'hsl(' + h + ', ' + s + '%, ' + l + '%)', rgba: (r, g, b, a) => 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')' };
            window.ThemeUtils = ThemeUtils;
            window.MusicCache = window.parent.MusicCache;
            ${dragInjection}
            ${favoriteInjection}
            try { ${theme.iframeJS || ""} } catch(e) { console.error('[Theme User JS Error]:', e.stack); }
            try { ThemeUtils.sendMessage('theme-loaded', { themeId: '${jsEscape(theme.id || "preview")}', themeName: '${jsEscape(theme.name || "Preview")}' }); } catch (error) { console.error('[Theme Framework Error]:', error.stack); }
        })();
    `;

    const fullHTML = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light only"><title>Typing Indicator Theme</title><style>${theme.iframeCSS || ""} :root, html, body { color-scheme: light only !important; forced-color-adjust: none !important; -webkit-forced-color-adjust: none !important; } * { margin: 0; padding: 0; box-sizing: border-box; } html, body { width: 100%; height: 100%; background: transparent; overflow: hidden; }</style></head><body>${processedHTML}<script>${finalJS.replace(/<\/script>/g, "<\\/script>")}<\/script></body></html>`;
    return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(iframe), 3000);
        iframe.onload = () => {
            clearTimeout(timer);
            resolve(iframe);
        };
        iframe.onerror = () => {
            clearTimeout(timer);
            resolve(null);
        };
        iframe.srcdoc = fullHTML;
        indicatorElement.appendChild(iframe);
    });
}

// ==================== 全局变量和常量 ====================

function validateAndFixIconFonts() {
    const old = document.getElementById("extension-icon-font-fixer");
    if (old) old.remove();
    const style = document.createElement("style");
    style.id = "extension-icon-font-fixer";
    style.textContent = `
        #typing_indicator_settings .fa-solid,
        #typing_indicator_settings .fa-regular,
        #typing_indicator_settings .fa-brands {
            font-family: "Font Awesome 6 Free", "Font Awesome 6 Brands" !important;
        }

        .typing_indicator .svg_dots {
            vertical-align: middle;
            margin-left: 2px;
        }
        .ti-more-menu {
            position: relative;
            display: inline-flex;
        }
        .ti-more-menu .ti-more-toggle {
            cursor: pointer;
            min-width: 30px;
            text-align: center;
        }
        .ti-more-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1050;
            background: var(--SmartThemeBlurTintColor, #1a1a2e);
            border: 1px solid var(--SmartThemeBorderColor, #444);
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            padding: 4px;
            min-width: auto;
            flex-direction: column;
            gap: 2px;
        }
        .ti-more-dropdown.open {
            display: flex;
        }
        .ti-more-dropdown .menu_button {
            width: 100%;
            justify-content: flex-start;
            gap: 8px;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 0.9em;
            white-space: nowrap;
        }
        .ti-more-dropdown .menu_button:hover {
            background: rgba(255, 255, 255, 0.1);
        }
            /* ========== 主题信息弹窗 ========== */
#ti_theme_info_dialog {
    margin: auto;
    max-width: 520px;
    width: 90%;
    max-height: 80vh;
    border-radius: 12px;
    border: 1px solid var(--SmartThemeBorderColor, #444);
    background: var(--SmartThemeBlurTintColor, #1a1a2e);
    color: var(--SmartThemeBodyColor, #fff);
    padding: 0;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
}
#ti_theme_info_dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
}
#ti_theme_info_dialog .ti-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid var(--SmartThemeBorderColor, #444);
    flex-shrink: 0;
}
#ti_theme_info_dialog .ti-info-header h3 {
    margin: 0;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    gap: 8px;
}
#ti_theme_info_dialog .ti-info-header h3 i {
    opacity: 0.7;
}
#ti_theme_info_dialog .ti-info-header-actions {
    display: flex;
    gap: 6px;
    align-items: center;
}
#ti_theme_info_dialog .ti-info-header-actions .menu_button {
    padding: 4px 10px;
    min-width: unset;
    display: inline-flex !important;
    flex-direction: row !important;
    align-items: center !important;
    white-space: nowrap;
}

/* 预览区 */
#ti_theme_info_dialog .ti-info-preview {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
    line-height: 1.8;
}
#ti_theme_info_dialog .ti-info-preview h1 {
    font-size: 1.3em;
    margin: 0 0 14px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--SmartThemeBorderColor, #444);
}
#ti_theme_info_dialog .ti-info-preview h2 {
    font-size: 1.1em;
    margin: 18px 0 8px 0;
    color: var(--SmartThemeQuoteColor, #88c0d0);
}
#ti_theme_info_dialog .ti-info-preview h3 {
    font-size: 1em;
    margin: 14px 0 6px 0;
}
#ti_theme_info_dialog .ti-info-preview ul,
#ti_theme_info_dialog .ti-info-preview ol {
    margin: 8px 0;
    padding-left: 22px;
}
#ti_theme_info_dialog .ti-info-preview li {
    margin: 4px 0;
}
#ti_theme_info_dialog .ti-info-preview code {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: monospace;
}
#ti_theme_info_dialog .ti-info-preview blockquote {
    margin: 10px 0;
    padding: 8px 14px;
    border-left: 3px solid var(--SmartThemeQuoteColor, #88c0d0);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0 6px 6px 0;
    font-style: italic;
    opacity: 0.85;
}
#ti_theme_info_dialog .ti-info-preview strong {
    color: var(--SmartThemeQuoteColor, #88c0d0);
}
#ti_theme_info_dialog .ti-info-preview hr {
    border: none;
    border-top: 1px solid var(--SmartThemeBorderColor, #444);
    margin: 14px 0;
}
#ti_theme_info_dialog .ti-info-preview p {
    margin: 6px 0;
}
/* ========== 折叠式 README 编辑区 ========== */
.ti-readme-details {
    margin-top: 12px;
    border: 1px solid var(--SmartThemeBorderColor, #444);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.2s;
}
.ti-readme-details:hover {
    border-color: var(--SmartThemeQuoteColor, #88c0d0);
}
.ti-readme-details summary {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9em;
    opacity: 0.75;
    display: flex;
    align-items: center;
    gap: 6px;
    user-select: none;
    list-style: none;
}
.ti-readme-details summary::-webkit-details-marker {
    display: none;
}
.ti-readme-details summary::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(-45deg);
    transition: transform 0.25s ease;
    will-change: transform;
    flex-shrink: 0;
    opacity: 0.7;
}
.ti-readme-details[open] summary::before {
    transform: rotate(45deg);
}
.ti-readme-details:hover summary::before {
    opacity: 1;
}
.ti-readme-details summary:hover {
    opacity: 1;
}
.ti-readme-details[open] summary {
    border-bottom: 1px solid var(--SmartThemeBorderColor, #444);
    opacity: 1;
    font-weight: 600;
}
.ti-readme-details .ti-readme-textarea-wrapper {
    padding: 10px;
}
.ti-readme-details textarea {
    width: 100%;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.88em;
    line-height: 1.5;
    resize: vertical;
}
.ti-readme-details.has-content summary::after {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--SmartThemeQuoteColor, #88c0d0);
    border-radius: 50%;
    margin-left: 6px;
    flex-shrink: 0;
}
    `;
    document.head.appendChild(style);
}

const MODULE = "typing_indicator_themes";

const NOOP = () => {};
let debugLog = NOOP;
let debugWarn = NOOP;
let verboseLog = NOOP;

// ==================== 角色信息获取工具 ====================

function getCurrentCharName() {
    try {
        if (
            this_chid !== undefined &&
            characters &&
            characters.length > 0 &&
            characters[this_chid]
        ) {
            return characters[this_chid].name || name2 || "Assistant";
        }
    } catch (e) {
        debugWarn("[TI] 获取角色名失败:", e);
    }
    return name2 || "Assistant";
}

function getCurrentUserName() {
    try {
        if (typeof power_user !== "undefined" && power_user.name) {
            return power_user.name;
        }
    } catch (e) {
        debugWarn("[TI] 获取用户名失败:", e);
    }
    return name1 || "User";
}

function getCurrentCharContext() {
    const avatarUrls = getAvatarUrls();
    return {
        charName: getCurrentCharName(),
        userName: getCurrentUserName(),
        charAvatarUrl: avatarUrls.char,
        userAvatarUrl: avatarUrls.user,
    };
}

function updateLogFunctions() {
    const settings = extension_settings[MODULE];

    if (settings?.debugLogs) {
        const filter = settings?.logFilter || "all";
        const matchFilter = (message, args) => {
            if (filter === "all") return true;
            const argText = args.filter((a) => typeof a === "string").join(" ");
            const text =
                (typeof message === "string" ? message : "") + " " + argText;
            const isPlayer = text.includes("[Player]");
            if (filter === "player") return isPlayer;
            if (filter === "indicator") return !isPlayer;
            return true;
        };
        debugLog = (message, ...args) => {
            if (!matchFilter(message, args)) return;
            console.log(`[TI]`, message, ...args);
        };
        debugWarn = (message, ...args) => {
            if (!matchFilter(message, args)) return;
            console.warn(`[TI]`, message, ...args);
        };

        if (settings?.verboseLogs) {
            verboseLog = (message, ...args) => {
                if (!matchFilter(message, args)) return;
                console.log(`[TI][VERBOSE]`, message, ...args);
            };
        } else {
            verboseLog = NOOP;
        }
    } else {
        debugLog = NOOP;
        debugWarn = NOOP;
        verboseLog = NOOP;
    }
}

// ============ 歌曲匹配工具（供播放器主题复用） ============
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function getAnimationHTML(style) {
    switch (style) {
        case "bounce":
            return `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.db1{animation:db 1.4s ease-in-out infinite}.db2{animation:db 1.4s ease-in-out .2s infinite}.db3{animation:db 1.4s ease-in-out .4s infinite}@keyframes db{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}</style><g transform="translate(5,10)"><circle class="db1" r="3"/></g><g transform="translate(15,10)"><circle class="db2" r="3"/></g><g transform="translate(25,10)"><circle class="db3" r="3"/></g></svg></span>`;
        case "pulse":
            return `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.dp1{animation:dp 1.5s ease-in-out infinite}.dp2{animation:dp 1.5s ease-in-out .2s infinite}.dp3{animation:dp 1.5s ease-in-out .4s infinite}@keyframes dp{0%,100%{opacity:.3;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}</style><g transform="translate(5,8)"><circle class="dp1" r="3"/></g><g transform="translate(15,8)"><circle class="dp2" r="3"/></g><g transform="translate(25,8)"><circle class="dp3" r="3"/></g></svg></span>`;
        case "appear":
            return `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.da1{animation:dotAppear 2.4s ease-in-out infinite}.da2{animation:dotAppear 2.4s ease-in-out .3s infinite}.da3{animation:dotAppear 2.4s ease-in-out .6s infinite}@keyframes dotAppear{0%,15%{opacity:0;transform:scale(0)}25%{opacity:1;transform:scale(1.15)}35%,65%{opacity:1;transform:scale(1)}75%,100%{opacity:0;transform:scale(0)}}</style><g transform="translate(5,8)"><circle class="da1" r="3"/></g><g transform="translate(15,8)"><circle class="da2" r="3"/></g><g transform="translate(25,8)"><circle class="da3" r="3"/></g></svg></span>`;
        case "fade":
        default:
            return `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.dot-fade-1{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) 0s infinite}.dot-fade-2{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .2s infinite}.dot-fade-3{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .4s infinite}@keyframes smoothFade{0%{opacity:.2}30%{opacity:1}60%{opacity:.4}100%{opacity:.2}}</style><circle class="dot-fade-1" cx="5" cy="8" r="3"/><circle class="dot-fade-2" cx="15" cy="8" r="3"/><circle class="dot-fade-3" cx="25" cy="8" r="3"/></svg></span>`;
    }
}

const MusicUtils = {
    // 试听版判定阈值：音频时长 ≤ 此值（秒）视为试听版，需换源
    MIN_PLAYABLE_DURATION: 60,

    /**
     * 集中的音频时长检测（供所有播放器主题调用）
     * 用法：await window.parent.MusicUtils.checkAudioDuration(url)
     */
    checkAudioDuration(audioUrl, timeoutMs = 5000) {
        return new Promise((resolve) => {
            if (!audioUrl) return resolve(null);
            const needProxyDomains = ["music.126.net", "qq.com", "kuwo.cn"];
            const needProxy = needProxyDomains.some((d) =>
                audioUrl.includes(d),
            );
            const finalUrl = needProxy
                ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`
                : audioUrl;
            const audio = new Audio();
            audio.preload = "metadata";
            const timer = setTimeout(() => {
                audio.src = "";
                resolve(null);
            }, timeoutMs);
            audio.onloadedmetadata = () => {
                clearTimeout(timer);
                const dur = audio.duration;
                audio.src = "";
                resolve(isFinite(dur) ? dur : null);
            };
            audio.onerror = () => {
                clearTimeout(timer);
                audio.src = "";
                resolve(null);
            };
            audio.src = finalUrl;
        });
    },

    /**
     * 一步到位的试听版判定（推荐播放器使用）
     * 用法：if (await window.parent.MusicUtils.isPreviewClip(url)) continue;
     */
    async isPreviewClip(audioUrl) {
        const dur = await this.checkAudioDuration(audioUrl);
        return dur !== null && dur <= this.MIN_PLAYABLE_DURATION;
    },

    CHAR_MAP: {
        愛: "爱",
        樂: "乐",
        東: "东",
        風: "风",
        華: "华",
        見: "见",
        聲: "声",
        時: "时",
        來: "来",
        夢: "梦",
        語: "语",
        間: "间",
        關: "关",
        門: "门",
        長: "长",
        戀: "恋",
        無: "无",
        為: "为",
        飛: "飞",
        雲: "云",
        気: "气",
        桜: "樱",
        開: "开",
        電: "电",
        優: "优",
        傷: "伤",
    },

    normalize(str) {
        if (!str) return "";
        if (Array.isArray(str)) str = str.join(" ");
        if (typeof str !== "string") str = String(str);

        let s = str
            .toLowerCase()
            .normalize("NFKC")
            .replace(/\s*[-—–]\s*《[^》]*》[\s\S]*$/g, "")
            .replace(/\s*[\(\（\[\【].*?[\)\）\]\】]\s*/g, "")
            .replace(/[\s\-_·・,，.。!！?？'"「」『』:：/／]/g, "");

        for (const [from, to] of Object.entries(this.CHAR_MAP)) {
            s = s.replaceAll(from, to);
        }
        return s;
    },

    isTitleMatch(query, candidate) {
        const a = this.normalize(query);
        const b = this.normalize(candidate);

        if (!a || !b) return false;
        if (a === b) return true;

        const shorter = a.length < b.length ? a : b;
        const longer = a.length < b.length ? b : a;

        if (longer.includes(shorter)) {
            if (shorter.length / longer.length >= 0.75) return true;
            return false;
        }

        let matchCount = 0;
        for (const char of shorter) {
            if (longer.includes(char)) matchCount++;
        }
        return matchCount / shorter.length > 0.8;
    },

    isArtistMatch(query, candidate) {
        if (!query) return true;
        const a = this.normalize(query);
        const b = this.normalize(candidate);
        if (!b) return true;
        if (a === b) return true;

        const queryArtists = String(query)
            .split(/[\/\,、&]/)
            .map((s) => this.normalize(s.trim()))
            .filter(Boolean);
        const candidateArtists = String(candidate)
            .split(/[\/\,、&]/)
            .map((s) => this.normalize(s.trim()))
            .filter(Boolean);
        return queryArtists.some((qa) =>
            candidateArtists.some(
                (ca) => ca === qa || ca.includes(qa) || qa.includes(ca),
            ),
        );
    },

    isTrackMatch(queryTitle, queryArtist, track) {
        if (!track) return false;
        const trackTitle = track?.title || track?.name || track?.song || "";
        const trackArtist = track?.artist || track?.singer || "";

        return (
            this.isTitleMatch(queryTitle, trackTitle) &&
            this.isArtistMatch(queryArtist, trackArtist)
        );
    },

    scoreCandidate(queryTitle, queryArtist, item) {
        const itemTitle = item.song || item.name || item.title || "";
        const itemArtist = item.singer || item.artist || "";
        const itemArtistList = item.singer_list || null;
        const itemAlbum = item.album || "";
        const itemTime = item.time || "";
        const itemSubtitle = item.subtitle || "";

        if (!this.isTitleMatch(queryTitle, itemTitle)) return null;
        if (!this.isArtistMatch(queryArtist, itemArtist)) return null;

        let score = 0;
        const artistSegments = String(itemArtist)
            .split(/[\/&,]/)
            .map((s) => s.trim())
            .filter(Boolean);
        const hasAntiCensorMark = artistSegments.some((seg) =>
            /[-._、]$/.test(seg),
        );
        if (hasAntiCensorMark) score -= 300;
        if (itemTitle.trim() === (queryTitle || "").trim()) score += 100;
        if (
            /[\(\（\[\【]\s*(Live|LIVE|live|现场|翻唱|Cover|cover|COVER|Remix|remix|REMIX|伴奏|inst|Inst|INST|纯音乐|Demo|demo|DEMO|加长版|Extended|live版|演唱会|karaoke|Karaoke|KARAOKE|instrumental|Instrumental)/i.test(
                itemTitle,
            )
        ) {
            score -= 80;
        }
        if (
            /(Live|live|LIVE|现场|翻唱|Cover|cover|演唱会|karaoke)/i.test(
                itemTitle,
            ) &&
            !/[\(\（\[\【]/.test(itemTitle)
        ) {
            score -= 40;
        }
        if (
            /(翻自|cover[:：]|Originally Performed|Performed by|Backing Business|Karaoke Version|Instrumental Version)/i.test(
                itemTitle,
            )
        ) {
            score -= 120;
        }
        if (itemAlbum) {
            if (
                /(翻唱|Karaoke|Backing|Originally Performed|Tribute)/i.test(
                    itemAlbum,
                )
            ) {
                score -= 100;
            } else if (itemAlbum.length > 0 && itemAlbum.length < 80) {
                score += 25;
            }
        }
        if (itemTime) {
            const yearMatch = String(itemTime).match(/^(\d{4})/);
            if (yearMatch) {
                const year = parseInt(yearMatch[1], 10);
                if (year > 0 && year <= 2015) score += 30;
            }
        }
        if (
            itemSubtitle &&
            /(原声带|电影|插曲|OST|主题曲|片头曲|片尾曲)/i.test(itemSubtitle)
        ) {
            score += 40;
        }
        const queryArtists = String(queryArtist || "")
            .split(/[\/&,、]/)
            .map((s) => s.trim())
            .filter(Boolean);
        const normQueryArtists = queryArtists
            .map((a) => this.normalize(a))
            .filter(Boolean);
        const normQ = this.normalize(queryArtist || "");
        const normI = this.normalize(itemArtist || "");
        if (normQ && normQ === normI) {
            score += 80;
        } else if (normQ && normI.includes(normQ)) {
            score += 30;
        }
        let cArtists;
        if (Array.isArray(itemArtistList) && itemArtistList.length > 0) {
            cArtists = itemArtistList
                .map((a) =>
                    this.normalize(typeof a === "string" ? a : a.name || ""),
                )
                .filter(Boolean);
        } else {
            cArtists = String(itemArtist || "")
                .split(/[\/&,、]/)
                .map((s) => this.normalize(s.trim()))
                .filter(Boolean);
        }
        if (queryArtists.length > 1) {
            const matchedCount = normQueryArtists.filter((qa) =>
                cArtists.some(
                    (ca) => ca === qa || ca.includes(qa) || qa.includes(ca),
                ),
            ).length;
            score += matchedCount * 35;
            if (cArtists.length >= queryArtists.length) score += 20;
        }
        if (queryArtists.length === 1 && cArtists.length > 1) {
            const firstMatches = cArtists.some(
                (ca) =>
                    ca === normQueryArtists[0] ||
                    ca.includes(normQueryArtists[0]) ||
                    normQueryArtists[0].includes(ca),
            );
            if (firstMatches) {
                score += 10;
            } else {
                score -= 80;
            }
        }
        if (cArtists.length > Math.max(queryArtists.length, 1) * 2) {
            score -= 60;
        }
        score -= normI.length * 0.3;
        return score;
    },

    selectBestMatch(queryTitle, queryArtist, candidates) {
        if (!candidates || candidates.length === 0) return null;
        let best = null;
        let bestScore = -Infinity;

        for (const item of candidates) {
            const score = this.scoreCandidate(queryTitle, queryArtist, item);
            if (score === null) continue;
            if (score > bestScore) {
                bestScore = score;
                best = item;
            }
        }

        if (best && bestScore <= -100) return null;
        return best;
    },
};

window.MusicUtils = MusicUtils;

const MusicCache = {
    STORAGE_KEY: "gplayer_music_cache",
    VERSION: 1,

    DEFAULT_EXPIRY: {
        search: 365 * 24 * 60 * 60 * 1000, // 1年（数据本身不变，依赖失效自清）
        audio: 24 * 60 * 60 * 1000, // 24小时（链接真失效会触发stage1自清）
        lyrics: 365 * 24 * 60 * 60 * 1000, // 1年（数据基本不变）
        cover: 365 * 24 * 60 * 60 * 1000, // 1年（无效封面写入有过滤）
        failedSearch: 3 * 24 * 60 * 60 * 1000, // 3天（失败搜索3天后自动重试）
    },

    MAX_ENTRIES: {
        search: 200,
        audio: 100,
        lyrics: 100,
        cover: 100,
        failedSearch: 300,
    },

    _memoryCache: null,
    _saveTimeout: null,
    _isDirty: false,

    init() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.version === this.VERSION && parsed.data) {
                    this._memoryCache = {
                        search: parsed.data.search || {},
                        audio: parsed.data.audio || {},
                        lyrics: parsed.data.lyrics || {},
                        cover: parsed.data.cover || {},
                        failedSearch: parsed.data.failedSearch || {},
                    };
                    this.cleanup();
                    debugLog(`[MusicCache] 缓存已加载`);
                    return this;
                }
                debugLog(`[MusicCache] 数据格式不匹配，重置缓存`);
                localStorage.removeItem(this.STORAGE_KEY);
            }
        } catch (e) {
            console.warn("[MusicCache] 加载失败:", e);
            localStorage.removeItem(this.STORAGE_KEY);
        }

        this._memoryCache = {
            search: {},
            audio: {},
            lyrics: {},
            cover: {},
            failedSearch: {},
        };
        return this;
    },

    save() {
        this._isDirty = true;

        if (this._saveTimeout) {
            clearTimeout(this._saveTimeout);
        }
        this._saveTimeout = setTimeout(() => {
            this._saveTimeout = null;
            if (this._isDirty) {
                this._doSave();
                this._isDirty = false;
            }
        }, 5000);
    },

    saveImmediately() {
        if (this._saveTimeout) {
            clearTimeout(this._saveTimeout);
            this._saveTimeout = null;
        }
        this._doSave();
    },

    _doSave() {
        try {
            localStorage.setItem(
                this.STORAGE_KEY,
                JSON.stringify({
                    version: this.VERSION,
                    data: this._memoryCache,
                }),
            );
        } catch (e) {
            if (e.name === "QuotaExceededError") {
                console.warn("[MusicCache] 存储空间不足，尝试清理...");
                this.cleanup(true);
                try {
                    localStorage.setItem(
                        this.STORAGE_KEY,
                        JSON.stringify({
                            version: this.VERSION,
                            data: this._memoryCache,
                        }),
                    );
                } catch (e2) {
                    console.error("[MusicCache] 清理后仍无法保存");
                }
            }
        }
    },

    _normalizeArtist(artist) {
        if (!artist) return "";
        if (Array.isArray(artist)) {
            return artist.join(" / ");
        }
        return String(artist);
    },

    _searchKey(t, a) {
        const title = (t || "").toLowerCase().trim();
        const artist = this._normalizeArtist(a).toLowerCase().trim();
        return `${title}|||${artist}`;
    },

    _detailKey(id, src) {
        return `${id}|||${(src || "").toLowerCase()}`;
    },

    _enforceLimit(type) {
        const cache = this._memoryCache[type];
        if (!cache) return;

        const keys = Object.keys(cache);
        const limit = this.MAX_ENTRIES[type];

        if (keys.length > limit) {
            const toDelete = Math.max(1, Math.floor(limit * 0.2));
            const sorted = keys.sort((a, b) => cache[a].ts - cache[b].ts);
            for (let i = 0; i < toDelete; i++) {
                delete cache[sorted[i]];
            }
            debugLog(`[MusicCache] ${type} 清理了 ${toDelete} 条数据`);
        }
    },
    getSearch(title, artist) {
        const key = this._searchKey(title, artist);
        const item = this._memoryCache.search[key];
        if (!item) return null;
        if (Date.now() - item.ts > this.DEFAULT_EXPIRY.search) {
            delete this._memoryCache.search[key];
            this.save();
            return null;
        }
        return item.data;
    },

    setSearch(title, artist, data) {
        if (!data || !data.id || !data.source) {
            verboseLog("[MusicCache] setSearch: 数据不完整，跳过缓存");
            return;
        }

        this._enforceLimit("search");
        const key = this._searchKey(title, artist);
        let coverUrl = data.coverUrl || data.cover || data.pic || "";
        if (coverUrl) {
            const midMatch = coverUrl.match(/M([0-9a-zA-Z]+)\.jpg/i);
            const isEmptyShell = midMatch && /^0+$/.test(midMatch[1]);
            const isEmptyMeting =
                coverUrl.includes("meting") && /[?&]id=(&|$)/.test(coverUrl);
            if (
                isEmptyShell ||
                isEmptyMeting ||
                coverUrl.includes("default_cover")
            ) {
                verboseLog(
                    `[MusicCache] setSearch: 拒绝写入无效封面URL: ${coverUrl}`,
                );
                coverUrl = "";
            }
            if (coverUrl) {
                const isNeteaseDirectLink = /p\d+\.music\.126\.net/.test(
                    coverUrl,
                );
                const isNeteaseSource =
                    String(data.source).toLowerCase() === "netease";
                if (isNeteaseDirectLink) {
                    if (isNeteaseSource && data.id) {
                        coverUrl = `https://api.qijieya.cn/meting/?server=netease&type=pic&id=${data.id}&size=500`;
                    } else {
                        debugWarn(
                            `[MusicCache] ⚠️ 网易云直链但 source/id 异常: source="${data.source}" id="${data.id}"`,
                        );
                    }
                }
            }
        }

        this._memoryCache.search[key] = {
            data: {
                id: String(data.id),
                source: data.source,
                title: data.title || data.name || title,
                artist: this._normalizeArtist(data.artist || artist),
                coverUrl: coverUrl,
            },
            ts: Date.now(),
        };
        this.save();
    },

    invalidateSearch(title, artist) {
        const key = this._searchKey(title, artist);
        if (this._memoryCache.search[key]) {
            delete this._memoryCache.search[key];
            this.save();
            verboseLog(`[MusicCache] 已清除搜索缓存: ${title} - ${artist}`);
        }
    },

    getAudio(id, source) {
        const key = this._detailKey(id, source);
        const item = this._memoryCache.audio[key];
        if (!item) return null;
        if (Date.now() - item.ts > this.DEFAULT_EXPIRY.audio) {
            delete this._memoryCache.audio[key];
            this.save();
            return null;
        }
        return item.url;
    },

    setAudio(id, source, url, verified = true) {
        if (!url || !id || !source) return;
        const key = this._detailKey(id, source);
        const now = Date.now();
        const existing = this._memoryCache.audio[key];
        this._memoryCache.audio[key] = {
            url,
            ts: now,
            verifiedAt: verified ? now : existing?.verifiedAt || 0,
        };
        this._enforceLimit("audio");
        this.save();
    },

    markAudioAsVerified(id, source) {
        const key = this._detailKey(id, source);
        const item = this._memoryCache.audio[key];
        if (item) {
            item.verifiedAt = Date.now();
            this.save();
        }
    },

    isAudioRecentlyVerified(id, source, ttl = 2 * 60 * 60 * 1000) {
        const key = this._detailKey(id, source);
        const item = this._memoryCache.audio[key];
        if (!item || !item.verifiedAt) return false;
        return Date.now() - item.verifiedAt < ttl;
    },

    invalidateAudio(id, source) {
        const key = this._detailKey(id, source);
        if (this._memoryCache.audio[key]) {
            delete this._memoryCache.audio[key];
            this.save();
            verboseLog(`[MusicCache] 已清除音频缓存: ${key}`);
        }
    },

    getCover(id, source) {
        const key = this._detailKey(id, source);
        const item = this._memoryCache.cover[key];
        if (!item) return null;
        if (Date.now() - item.ts > this.DEFAULT_EXPIRY.cover) {
            delete this._memoryCache.cover[key];
            this.save();
            return null;
        }
        return item.url;
    },

    setCover(id, source, url) {
        if (!url || !id || !source) return;
        const midMatch = url.match(/M([0-9a-zA-Z]+)\.jpg/i);
        const isEmptyShell = midMatch && /^0+$/.test(midMatch[1]);
        const isEmptyMeting =
            url.includes("meting") && /[?&]id=(&|$)/.test(url);
        if (isEmptyShell || isEmptyMeting || url.includes("default_cover")) {
            verboseLog(`[MusicCache] 拒绝写入无效封面: ${url}`);
            return;
        }
        const isNeteaseDirectLink = /p\d+\.music\.126\.net/.test(url);
        const isNeteaseSource = String(source).toLowerCase() === "netease";
        if (isNeteaseDirectLink) {
            if (isNeteaseSource) {
                url = `https://api.qijieya.cn/meting/?server=netease&type=pic&id=${id}&size=500`;
            } else {
                debugWarn(
                    `[MusicCache] 网易云直链但 source 不匹配（"${source}"），未替换`,
                );
            }
        }
        this._enforceLimit("cover");
        const key = this._detailKey(id, source);
        this._memoryCache.cover[key] = { url, ts: Date.now() };
        this.save();
    },

    invalidateCover(id, source) {
        const key = this._detailKey(id, source);
        if (this._memoryCache.cover[key]) {
            delete this._memoryCache.cover[key];
            verboseLog(`[MusicCache] 已清除封面缓存: ${key}`);
        }
        let cleanedSearchCount = 0;
        for (const k of Object.keys(this._memoryCache.search)) {
            const entry = this._memoryCache.search[k];
            if (
                String(entry?.data?.id) === String(id) &&
                entry?.data?.source === source &&
                entry.data.coverUrl
            ) {
                entry.data.coverUrl = "";
                cleanedSearchCount++;
            }
        }
        if (cleanedSearchCount > 0) {
            verboseLog(
                `[MusicCache] 同步清除搜索缓存中的过期封面: ${cleanedSearchCount}条`,
            );
        }
        this.save();
    },

    getLyrics(id, source) {
        const key = this._detailKey(id, source);
        const item = this._memoryCache.lyrics[key];
        if (!item) return null;
        if (Date.now() - item.ts > this.DEFAULT_EXPIRY.lyrics) {
            delete this._memoryCache.lyrics[key];
            this.save();
            return null;
        }
        return item.data;
    },

    setLyrics(id, source, content, tlyric = "") {
        if (!content || !id || !source) return;
        this._enforceLimit("lyrics");
        const key = this._detailKey(id, source);
        this._memoryCache.lyrics[key] = {
            data: { content, tlyric },
            ts: Date.now(),
        };
        this.save();
    },

    invalidateLyrics(id, source) {
        const key = this._detailKey(id, source);
        if (this._memoryCache.lyrics[key]) {
            delete this._memoryCache.lyrics[key];
            this.save();
            verboseLog(`[MusicCache] 已清除歌词缓存: ${key}`);
        }
    },
    invalidateTrack(id, source) {
        this.invalidateAudio(id, source);
        this.invalidateLyrics(id, source);
        this.invalidateCover(id, source);
        verboseLog(`[MusicCache] 已清除歌曲所有缓存: ${id}-${source}`);
    },
    getFailedSearch(title, artist) {
        const key = this._searchKey(title, artist);
        const item = this._memoryCache.failedSearch?.[key];
        if (!item) return false;
        if (Date.now() - item.ts > this.DEFAULT_EXPIRY.failedSearch) {
            delete this._memoryCache.failedSearch[key];
            this.save();
            return false;
        }
        return true;
    },
    setFailedSearch(title, artist) {
        if (!this._memoryCache.failedSearch)
            this._memoryCache.failedSearch = {};
        this._enforceLimit("failedSearch");
        const key = this._searchKey(title, artist);
        this._memoryCache.failedSearch[key] = { ts: Date.now() };
        this.save();
    },
    clearFailedSearch(title, artist) {
        const key = this._searchKey(title, artist);
        if (this._memoryCache.failedSearch?.[key]) {
            delete this._memoryCache.failedSearch[key];
            this.save();
        }
    },
    invalidateByInfo(title, artist) {
        const cached = this.getSearch(title, artist);
        if (cached && cached.id && cached.source) {
            this.invalidateTrack(cached.id, cached.source);
        }
        this.invalidateSearch(title, artist);
    },

    cleanup(aggressive = false) {
        const now = Date.now();
        let count = 0;

        ["search", "audio", "lyrics", "cover", "failedSearch"].forEach(
            (type) => {
                const expiry = aggressive
                    ? this.DEFAULT_EXPIRY[type] / 2
                    : this.DEFAULT_EXPIRY[type];

                Object.keys(this._memoryCache[type] || {}).forEach((key) => {
                    if (now - this._memoryCache[type][key].ts > expiry) {
                        delete this._memoryCache[type][key];
                        count++;
                    }
                });
            },
        );

        if (count > 0) {
            debugLog(`[MusicCache] 清理了 ${count} 条过期缓存`);
            this.save();
        }

        return count;
    },

    clear() {
        this._memoryCache = {
            search: {},
            audio: {},
            lyrics: {},
            cover: {},
            failedSearch: {},
        };
        localStorage.removeItem(this.STORAGE_KEY);
        debugLog(`[MusicCache] 已清空所有缓存`);
    },

    getStats() {
        const now = Date.now();

        const countItems = (type) =>
            Object.keys(this._memoryCache[type] || {}).length;

        const countExpired = (type) => {
            const expiry = this.DEFAULT_EXPIRY[type];
            return Object.values(this._memoryCache[type] || {}).filter(
                (item) => now - item.ts > expiry,
            ).length;
        };

        return {
            search: countItems("search"),
            audio: countItems("audio"),
            lyrics: countItems("lyrics"),
            cover: countItems("cover"),
            expired: {
                search: countExpired("search"),
                audio: countExpired("audio"),
                lyrics: countExpired("lyrics"),
                cover: countExpired("cover"),
            },
            total:
                countItems("search") +
                countItems("audio") +
                countItems("lyrics") +
                countItems("cover"),
        };
    },

    getSize() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) return { bytes: 0, formatted: "0 B" };
            const bytes = data.length * 2;

            let formatted;
            if (bytes < 1024) {
                formatted = bytes + " B";
            } else if (bytes < 1024 * 1024) {
                formatted = (bytes / 1024).toFixed(1) + " KB";
            } else {
                formatted = (bytes / (1024 * 1024)).toFixed(2) + " MB";
            }

            return { bytes, formatted };
        } catch (e) {
            return { bytes: 0, formatted: "未知" };
        }
    },
    debug() {
        if (!extension_settings[MODULE]?.debugLogs) return;

        debugLog("[MusicCache] 当前缓存状态:");
        debugLog("  Stats:", this.getStats());
        debugLog("  Size:", this.getSize());
        verboseLog("  Search keys:", Object.keys(this._memoryCache.search));
        verboseLog("  Audio keys:", Object.keys(this._memoryCache.audio));
        verboseLog("  Lyrics keys:", Object.keys(this._memoryCache.lyrics));
        verboseLog("  Cover keys:", Object.keys(this._memoryCache.cover));
    },
};

MusicCache.init();
window.MusicCache = MusicCache;
// 调试用：暴露关键状态到 window，调试代码
window.__tiDebug = {
    get currentTrack() {
        return currentPlayerTrack;
    },
    simulateUrlExpired() {
        MusicCache._memoryCache.audio = {};
        MusicCache.saveImmediately();
        console.log("✅ 所有音频URL缓存已清空");
    },
    simulatePlayFailed() {
        const t = currentPlayerTrack;
        if (!t) return console.log("❌ 没有正在播放的歌");
        const iframe = document.querySelector("#music_player .theme-iframe");
        const themeId =
            document.querySelector("#music_player")?.dataset.themeId;
        window.postMessage(
            {
                source: "typing-indicator-theme",
                type: "audio-playback-failed",
                themeId,
                containerId: "music_player",
                data: {
                    id: t.id,
                    source: t.source,
                    title: t.originalTitle || t.title || t.name,
                    artist: Array.isArray(t.artist)
                        ? t.artist.join(" / ")
                        : t.artist,
                    trackIndex: 0,
                },
            },
            "*",
        );
        console.log(`🔥 已触发 "${t.title}" 播放失败事件`);
    },
    forceSourceFail(sourceName) {
        Object.keys(MusicCache._memoryCache.audio).forEach((k) => {
            if (k.toLowerCase().includes(sourceName.toLowerCase())) {
                delete MusicCache._memoryCache.audio[k];
            }
        });
        MusicCache.saveImmediately();
        console.log(`✅ ${sourceName} 源的音频缓存已清空`);
    },
};

const ApiHealthMonitor = {
    _state: new Map(),
    BLACKLIST_THRESHOLD: 5,
    BLACKLIST_DURATION: 2 * 60 * 1000,

    _shouldLog() {
        return !!extension_settings[MODULE]?.playerEnabled;
    },

    isBlacklisted(key) {
        const s = this._state.get(key);
        if (!s) return false;
        if (s.blacklistUntil && Date.now() < s.blacklistUntil) return true;
        if (s.blacklistUntil && Date.now() >= s.blacklistUntil) {
            s.failCount = 0;
            s.blacklistUntil = 0;
        }
        return false;
    },

    recordSuccess(key) {
        const s = this._state.get(key);
        if (s) {
            s.failCount = 0;
            s.blacklistUntil = 0;
        }
    },

    recordFailure(key) {
        let s = this._state.get(key);
        if (!s) {
            s = { failCount: 0, blacklistUntil: 0 };
            this._state.set(key, s);
        }
        s.failCount++;
        if (s.failCount >= this.BLACKLIST_THRESHOLD) {
            s.blacklistUntil = Date.now() + this.BLACKLIST_DURATION;
            if (this._shouldLog())
                console.warn(
                    `[ApiHealth] ${key} 连续失败 ${s.failCount} 次，熔断 ${this.BLACKLIST_DURATION / 60000} 分钟`,
                );
        }
    },

    getStatus() {
        const result = {};
        for (const [key, s] of this._state) {
            result[key] = {
                failCount: s.failCount,
                isBlacklisted: this.isBlacklisted(key),
                blacklistedUntil: s.blacklistUntil
                    ? new Date(s.blacklistUntil).toLocaleTimeString()
                    : null,
            };
        }
        return result;
    },

    clear() {
        this._state.clear();
        debugLog("[ApiHealth] 已清空所有熔断状态");
    },
};
window.ApiHealthMonitor = ApiHealthMonitor;

// ==================== 歌单模块状态和 API ====================

let _playlistState = {
    all: [],
    currentId: null,
    current: null,
    isLoading: false,
    songCurrentPage: 1,
    songPageSize: 50,
    songFilter: "",
    multiSelectMode: false,
    selectedSongIndices: new Set(),
    searchMode: "local",
    onlineResults: [],
    onlineSearching: false,
    onlineCurrentPage: 1,
    onlineHasMore: false,
};
let _updatePlaylistPlayingState = null;
let _loadingSongKey = null;
let _loadingSongTimeout = null;

const PlaylistAPI = {
    baseUrl: "/api/plugins/g-player-proxy/playlists",

    async list() {
        const resp = await fetch(this.baseUrl, {
            headers: getRequestHeaders(),
        });
        if (!resp.ok) throw new Error("加载歌单列表失败");
        const data = await resp.json();
        return data.playlists || [];
    },

    async get(id) {
        const resp = await fetch(`${this.baseUrl}/${id}`, {
            headers: getRequestHeaders(),
        });
        if (!resp.ok) throw new Error("加载歌单失败");
        return await resp.json();
    },

    async create(name, cover = "") {
        const resp = await fetch(this.baseUrl, {
            method: "POST",
            headers: getRequestHeaders(),
            body: JSON.stringify({ name, cover }),
        });
        if (!resp.ok) throw new Error("创建歌单失败");
        return await resp.json();
    },

    async update(id, data) {
        const resp = await fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: getRequestHeaders(),
            body: JSON.stringify(data),
        });
        if (!resp.ok) throw new Error("更新歌单失败");
        return await resp.json();
    },

    async remove(id) {
        const resp = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
            headers: getRequestHeaders(),
        });
        if (!resp.ok) throw new Error("删除歌单失败");
        return await resp.json();
    },

    async addSongs(id, songs) {
        const resp = await fetch(`${this.baseUrl}/${id}/songs`, {
            method: "POST",
            headers: getRequestHeaders(),
            body: JSON.stringify({ songs }),
        });
        if (!resp.ok) throw new Error("添加歌曲失败");
        return await resp.json();
    },

    async removeSongs(id, payload) {
        const resp = await fetch(`${this.baseUrl}/${id}/songs`, {
            method: "DELETE",
            headers: getRequestHeaders(),
            body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error("移除歌曲失败");
        return await resp.json();
    },

    async importFromUrl(url, name = "") {
        const resp = await fetch(`${this.baseUrl}/import`, {
            method: "POST",
            headers: getRequestHeaders(),
            body: JSON.stringify({ url, name }),
        });
        if (!resp.ok) {
            let msg = "导入失败";
            try {
                const err = await resp.json();
                msg = err.error || msg;
            } catch (e) {}
            throw new Error(msg);
        }
        return await resp.json();
    },
};

window.PlaylistAPI = PlaylistAPI;

window.addEventListener("beforeunload", () => {
    settleListeningTime("page_unload");
    try {
        const settings = extension_settings[MODULE];
        if (settings && settings.listeningStats) {
            localStorage.setItem(
                "ti_listening_stats_backup",
                JSON.stringify(settings.listeningStats),
            );
        }
    } catch (e) {
        console.warn("[TI] 紧急备份失败:", e);
    }

    MusicCache.saveImmediately();
});

const SCAN_CONFIG = {
    MAX_MESSAGES_TO_SCAN: 30,
    CONCURRENT_LIMIT: 2,
    SKIP_HIDDEN: true,
};

async function asyncPool(limit, items, iteratorFn) {
    const results = [];
    const executing = new Set();

    for (const [index, item] of items.entries()) {
        const promise = Promise.resolve().then(() => iteratorFn(item, index));
        results.push(promise);
        executing.add(promise);

        const clean = () => executing.delete(promise);
        promise.then(clean, clean);

        if (executing.size >= limit) {
            await Promise.race(executing);
        }
    }

    return Promise.all(results);
}

const THEME_STYLE_ID = "typing-indicator-theme-style";

let isStatefulThemeLocked = false;
let isIndicatorPersisted = false;
let bodyClassObserver = null;
let stopButtonObserver = null;
let currentlyAppliedConfig = { themeId: null, presetId: null };
let manualOverrideActive = false;
let renderTimeout;
let accumulatedStreamedText = "";
let currentDynamicThemeId = null;
let currentDynamicPresetId = null;
let dynamicThemeTimeoutId = null;
let dynamicPrevLock = null;
let isRendering = false;
let isTestIndicatorActive = false;
let currentActiveTab = "main";
const themeShutdownTimeouts = {};
const statefulThemes = new Set();
let isPlaylistReady = false;
let isPlayerInitialized = false;
let currentPlayerTrack = null;
let playerOriginalPosition = null;
let currentLyrics = [];
let currentLyricIndex = -1;
let savedTestLyrics = null;
let savedTestLyricIndex = -1;
let wasLyricsPlaying = false;
let lyricsTestInterval = null;
let listeningSession = {
    charAvatar: null,
    startTime: null,
    isPlaying: false,
};
let listeningStatsUpdateCallback = null;
let lyricsOverlayElement = null;
let listeningStatsUpdateTimer = null;
let lastSentPlaylist = null;
let playerAutoHideVisible = true;
let _autoShowTranslationFlag = null;
let playerAutoHideHandlers = null;
let generationStartedSafetyTimer = null;
let stopButtonHasAppearedFlag = false;

function fuzzyMatchTrack(bubbleTitle, bubbleArtist, track) {
    if (!track || !bubbleTitle || !bubbleArtist) return false;
    const normalize = (str) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .replace(/[-_]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    };

    const normalizedBubbleTitle = normalize(bubbleTitle);
    const normalizedBubbleArtist = normalize(bubbleArtist);
    const trackTitles = [
        track.title,
        track.name,
        track.originalTitle,
        track.song,
    ]
        .filter(Boolean)
        .map(normalize);
    let artistSources = [track.artist, track.originalArtist, track.singer];
    if (Array.isArray(track.artist)) {
        artistSources = [...artistSources, ...track.artist];
    }
    const trackArtists = artistSources
        .filter(Boolean)
        .map((a) => normalize(String(a)));
    const titleMatch = trackTitles.some((t) => t === normalizedBubbleTitle);
    const artistMatch = trackArtists.some(
        (a) =>
            a === normalizedBubbleArtist ||
            a.includes(normalizedBubbleArtist) ||
            normalizedBubbleArtist.includes(a),
    );

    return titleMatch && artistMatch;
}

// CSS 默认样式
const DEFAULT_THEME_CSS = `
.typing_indicator {
    padding: 8px 16px;
    background-color: var(--background-color-tertiary, #f0f0f0);
    color: var(--text-color, #000);
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    text-align: center;
}
.typing_indicator .svg_dots svg { fill: currentColor; }
@media (max-width: 768px) {
    .typing_indicator {
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.9em;
    }
}`;

// ==================== 核心设置管理 ====================
let _needsSync = true;
let _listeningStatsRestored = false;
function getSettings() {
    const defaultSettings = {
        enabled: true,
        persistentMode: false,
        streaming: false,
        showAnimation: true,
        animationStyle: "fade",
        autoFollowTheme: false,
        devMode: false,
        debugLogs: false,
        verboseLogs: false,
        logFilter: "all",
        position: "floating_bottom",
        floatingBottomOffset: 0,
        customPosition: { x: 50, y: 50, locked: false },
        selectedTextPresetId: "cat_default",
        textPresets: defaultPresets,
        selectedThemeId: "default",
        themes: defaultThemes,
        characterThemes: {},
        enableDynamicThemes: false,
        dynamicThemeDuration: 10,
        dynamicThemesInPersistent: false,

        // 播放器相关设置
        playerEnabled: false,
        playerPosition: { x: 50, y: 50, locked: false },
        selectedPlayerThemeId: null,
        playerHidden: false,
        playerAutoHide: false,
        // BGM气泡样式设置
        bubbleStyles: [],
        selectedBubbleStyleId: "bubble_default",
        enableBubbleReplacement: true,
        lyricsEnabled: false,
        lyricsPosition: { x: 50, y: 10, locked: false },
        lyricsSungColor: "#90cdee",
        lyricsUnsungColor: "#ffffff",
        lyricsBackground: "rgba(0, 0, 0, 0.6)",
        lyricsFontSize: 18,
        lyricsShowNextLine: true,
        listeningStats: {},
        deletedBuiltIns: { themes: [], textPresets: [], bubbleStyles: [] },
        clickThrough: false,
        showFpsMonitor: false,
        playlistSourceMode: "mixed",
        selectedPlaylistId: null,
        enableCharacterPlaylist: false,
        autoSwitchCharacterPlaylist: true,
        rememberPlaybackProgress: true,
        characterPlaylists: {},
        lastPlaybackProgress: {},
    };

    if (!extension_settings[MODULE]) {
        extension_settings[MODULE] = {};
        _needsSync = true;
    }
    const settings = extension_settings[MODULE];

    if (_needsSync) {
        const syncList = (defaultList, userList, deletedIds = []) => {
            if (!userList || !Array.isArray(userList)) {
                return structuredClone(defaultList).filter(
                    (item) => !deletedIds.includes(item.id),
                );
            }

            const deletedSet = new Set(deletedIds);
            const defaultMap = new Map(
                defaultList.map((item) => [item.id, item]),
            );
            const userMap = new Map(userList.map((item) => [item.id, item]));
            const finalSyncedList = [];

            userList.forEach((userItem) => {
                if (defaultMap.has(userItem.id)) {
                    const defaultItem = defaultMap.get(userItem.id);
                    const mergedItem = { ...defaultItem, ...userItem };
                    mergedItem.isBuiltIn = true;
                    finalSyncedList.push(mergedItem);
                } else if (!userItem.isBuiltIn) {
                    finalSyncedList.push(structuredClone(userItem));
                }
            });

            defaultList.forEach((defaultItem) => {
                if (
                    defaultItem.isBuiltIn &&
                    !userMap.has(defaultItem.id) &&
                    !deletedSet.has(defaultItem.id)
                ) {
                    finalSyncedList.push(structuredClone(defaultItem));
                }
            });

            return finalSyncedList;
        };

        if (!settings.deletedBuiltIns) {
            settings.deletedBuiltIns = {
                themes: [],
                textPresets: [],
                bubbleStyles: [],
            };
        }

        settings.themes = syncList(
            defaultSettings.themes,
            settings.themes,
            settings.deletedBuiltIns.themes,
        );
        settings.textPresets = syncList(
            defaultSettings.textPresets,
            settings.textPresets,
            settings.deletedBuiltIns.textPresets,
        );
        settings.bubbleStyles = syncList(
            defaultBubbleStyles,
            settings.bubbleStyles,
            settings.deletedBuiltIns.bubbleStyles,
        );

        settings.themes.forEach((theme) => {
            if (theme.isBuiltIn && !theme.readme) {
                const authorMatch = theme.name.match(/\(by\s+(.+?)\)/i);
                const author = authorMatch ? authorMatch[1].trim() : "ssssan_";
                const displayName = theme.name
                    .replace(/\s*\(by\s+.+?\)/i, "")
                    .trim();

                const isPlayer =
                    theme.name.startsWith("播放器") ||
                    theme.name.startsWith("Player");
                const mode = theme.useIframe ? "iframe 动画" : "CSS";
                const category = isPlayer ? "播放器" : "指示器";

                theme.readme = [
                    `# ${displayName}`,
                    ``,
                    `> ❑ 内置${category}${mode}主题 | ❒ 作者: **${author}**`,
                    ``,
                    `这是「指示器美化」插件的内置${category}主题，开箱即用。`,
                    ``,
                    `---`,
                    `*如需自定义，建议先导出备份再修改。恢复内置项可还原此主题。*`,
                ].join("\n");
            }
        });

        settings.textPresets.forEach((preset) => {
            if (preset.isBuiltIn && !preset.readme) {
                const authorMatch = preset.name.match(/\(by\s+(.+?)\)/i);
                const author = authorMatch ? authorMatch[1].trim() : "ssssan_";
                const displayName = preset.name
                    .replace(/\s*\(by\s+.+?\)/i, "")
                    .trim();

                preset.readme = [
                    `# ${displayName}`,
                    ``,
                    `> ✭ 内置文本预设 | ✮ 作者: **${author}**`,
                    ``,
                    `这是「指示器美化」插件的内置文本预设，定义指示器显示的文字内容与排版。`,
                    ``,
                    `---`,
                    `*如需自定义，建议先导出备份再修改。恢复内置项可还原此预设。*`,
                ].join("\n");
            }
        });

        settings.bubbleStyles.forEach((style) => {
            if (style.isBuiltIn && !style.readme) {
                const authorMatch = style.name.match(/\(by\s+(.+?)\)/i);
                const author = authorMatch ? authorMatch[1].trim() : "ssssan_";
                const displayName = style.name
                    .replace(/\s*\(by\s+.+?\)/i, "")
                    .trim();

                style.readme = [
                    `# ${displayName}`,
                    ``,
                    `> ✦ 内置音乐气泡样式 | ✧ 作者: **${author}**`,
                    ``,
                    `这是「指示器美化」插件的内置BGM气泡样式，用于美化聊天中的 \`[bgm]歌名-歌手[/bgm]\` 标签。`,
                    ``,
                    `---`,
                    `*如需自定义，建议先导出备份再修改。恢复内置项可还原此样式。*`,
                ].join("\n");
            }
        });
        _needsSync = false;
    }

    Object.keys(defaultSettings).forEach((key) => {
        if (
            !["themes", "textPresets", "bubbleStyles"].includes(key) &&
            settings[key] === undefined
        ) {
            settings[key] = structuredClone(defaultSettings[key]);
        }
    });

    if (
        !settings.selectedBubbleStyleId ||
        !settings.bubbleStyles.find(
            (s) => s.id === settings.selectedBubbleStyleId,
        )
    ) {
        settings.selectedBubbleStyleId = "bubble_default";
    }
    if (settings.enableBubbleReplacement === undefined) {
        settings.enableBubbleReplacement = true;
    }

    if (!_listeningStatsRestored) {
        _listeningStatsRestored = true;
        try {
            const backup = localStorage.getItem("ti_listening_stats_backup");
            if (backup) {
                const backupStats = JSON.parse(backup);
                if (backupStats && typeof backupStats === "object") {
                    if (!settings.listeningStats) settings.listeningStats = {};
                    for (const [avatar, stats] of Object.entries(backupStats)) {
                        const existing = settings.listeningStats[avatar];
                        if (!existing || stats.totalTime > existing.totalTime) {
                            settings.listeningStats[avatar] = stats;
                        }
                    }

                    localStorage.removeItem("ti_listening_stats_backup");
                    saveSettingsDebounced();

                    debugLog("[TI] ✓ 从 localStorage 恢复了听歌统计");
                }
            }
        } catch (e) {
            console.warn("[TI] 恢复听歌统计失败:", e);
        }
    }
    if (settings._autoShowTranslation !== undefined) {
        delete settings._autoShowTranslation;
    }
    updateLogFunctions();
    return settings;
}

// ==================== 主题解析和配置 ====================

function parseThemeFromText(text) {
    if (!text) return null;
    const regex = /\[Theme:\s*([^\]]+)\]/g;
    let matches;
    let lastMatch = null;
    while ((matches = regex.exec(text)) !== null) {
        lastMatch = matches[1].trim();
    }
    return lastMatch;
}

function getActiveThemeConfig() {
    const settings = getSettings();
    const indicator = document.getElementById("typing_indicator");
    const globalThemeId = settings.selectedThemeId;
    const globalPresetId = settings.selectedTextPresetId;
    const useDynamic =
        settings.enableDynamicThemes &&
        currentDynamicThemeId &&
        (!settings.persistentMode || settings.dynamicThemesInPersistent);

    if (useDynamic) {
        isStatefulThemeLocked = false;
        verboseLog(`[TI] 动态主题激活，覆盖有状态锁`);
        return {
            themeId: currentDynamicThemeId,
            presetId: currentDynamicPresetId || globalPresetId,
        };
    }

    if (settings.persistentMode && indicator) {
        const runningThemeId = indicator.dataset.themeId;
        if (runningThemeId) {
            const runningTheme = settings.themes.find(
                (t) => t.id === runningThemeId,
            );
            const isStateful =
                runningTheme &&
                (statefulThemes.has(runningThemeId) ||
                    runningTheme.name.startsWith("播放器") ||
                    runningTheme.name.startsWith("Player"));

            if (isStateful) {
                debugLog(`[TI] 有状态主题运行中: "${runningTheme.name}"`);
                isStatefulThemeLocked = true;
                return {
                    themeId: runningThemeId,
                    presetId: currentlyAppliedConfig.presetId || globalPresetId,
                };
            }
        }
    }

    isStatefulThemeLocked = false;
    verboseLog(`[TI] 全局锁已解除`);

    if (manualOverrideActive) {
        verboseLog(`[TI] 应用手动覆盖`);
        return { themeId: globalThemeId, presetId: globalPresetId };
    }

    if (this_chid !== undefined && characters[this_chid]) {
        const charAvatar = characters[this_chid].avatar;
        const charConfig = settings.characterThemes?.[charAvatar];

        if (charConfig && (charConfig.themeId || charConfig.presetId)) {
            verboseLog(`[TI] 应用角色专属主题`);
            return {
                themeId: charConfig.themeId || globalThemeId,
                presetId: charConfig.presetId || globalPresetId,
            };
        }
    }

    if (settings.autoFollowTheme && power_user.theme) {
        const themeBaseName = power_user.theme;
        const matchedTheme = settings.themes.find((t) =>
            t.name.startsWith(themeBaseName),
        );

        if (matchedTheme) {
            verboseLog(`[TI] 应用UI跟随主题`);
            const matchedPreset = settings.textPresets.find((p) =>
                p.name.startsWith(themeBaseName),
            );
            return {
                themeId: matchedTheme.id,
                presetId: matchedPreset ? matchedPreset.id : globalPresetId,
            };
        }
    }

    verboseLog(`[TI] 应用全局主题`);
    return { themeId: globalThemeId, presetId: globalPresetId };
}

// ==================== 头像和BGM获取 ====================

function getAvatarUrls() {
    const DEFAULT_CHAR_AVATAR = "/img/ai4.png";
    const DEFAULT_USER_AVATAR = "/img/user-default.png";

    let charAvatarUrl = DEFAULT_CHAR_AVATAR;
    let userAvatarUrl = DEFAULT_USER_AVATAR;
    let charAvatarFound = false;

    try {
        if (
            this_chid !== undefined &&
            characters &&
            characters.length > 0 &&
            characters[this_chid]
        ) {
            const avatarFileName = characters[this_chid].avatar;
            if (avatarFileName && avatarFileName !== "none") {
                charAvatarUrl = `/characters/${encodeURIComponent(avatarFileName)}`;
                charAvatarFound = true;
            }
        }
    } catch (error) {
        console.warn("[TI] 从 characters 获取头像失败:", error);
    }

    if (!charAvatarFound && selected_group && groups && groups.length > 0) {
        try {
            const groupData = groups.find((g) => g.id === selected_group);
            if (groupData) {
                if (groupData.avatar_url && groupData.avatar_url !== "none") {
                    charAvatarUrl = groupData.avatar_url.startsWith("/")
                        ? groupData.avatar_url
                        : `/${groupData.avatar_url}`;
                    charAvatarFound = true;
                } else if (
                    Array.isArray(groupData.members) &&
                    groupData.members.length > 0
                ) {
                    const disabled = groupData.disabled_members || [];
                    const activeMember =
                        groupData.members.find((m) => !disabled.includes(m)) ||
                        groupData.members[0];
                    if (activeMember && activeMember !== "none") {
                        charAvatarUrl = `/characters/${encodeURIComponent(activeMember)}`;
                        charAvatarFound = true;
                    }
                }
            }
        } catch (error) {
            console.warn("[TI] 从群组获取头像失败:", error);
        }
    }

    if (
        !charAvatarFound &&
        window.TavernHelper &&
        typeof window.TavernHelper.getCharAvatarPath === "function"
    ) {
        try {
            const pathFromHelper =
                window.TavernHelper.getCharAvatarPath("current");
            if (pathFromHelper) {
                charAvatarUrl = pathFromHelper.startsWith("/")
                    ? pathFromHelper
                    : `/${pathFromHelper}`;
                charAvatarFound = true;
            }
        } catch (error) {
            console.warn("[TI] TavernHelper 兜底失败:", error);
        }
    }

    try {
        if (user_avatar && user_avatar !== "none") {
            userAvatarUrl = `/User Avatars/${encodeURIComponent(user_avatar)}`;
        }
    } catch (error) {
        console.error("[TI] 获取用户头像时出错:", error);
    }

    return { char: charAvatarUrl, user: userAvatarUrl };
}

async function getBgmPlaylistAsync() {
    debugLog("[TI] 开始获取BGM播放列表...");

    const BGM_KEY = "@BGM@";

    if (this_chid === undefined || !characters[this_chid]) {
        return null;
    }
    const character = characters[this_chid];

    const findEntryInBook = (bookContent, entryKey) => {
        if (!bookContent || !bookContent.entries) return null;
        const entries = Array.isArray(bookContent.entries)
            ? bookContent.entries
            : Object.values(bookContent.entries);

        return entries.find((entry) => {
            if (!entry) return false;
            const keysRaw = entry.keys || entry.key;
            if (!keysRaw) return false;

            const keysArray = Array.isArray(keysRaw)
                ? keysRaw
                : String(keysRaw)
                      .split(",")
                      .map((k) => k.trim());
            return keysArray.includes(entryKey);
        });
    };

    try {
        const worldName = character.data?.extensions?.world;
        if (worldName) {
            debugLog(`[TI] 检查关联世界书: "${worldName}"`);

            const response = await fetch("/api/worldinfo/get", {
                method: "POST",
                headers: getRequestHeaders(),
                body: JSON.stringify({ name: worldName }),
            });

            if (response.ok) {
                const worldBookContent = await response.json();
                const entry = findEntryInBook(worldBookContent, BGM_KEY);

                if (entry) {
                    debugLog(
                        `[TI] ✓ 在关联世界书 "${worldName}" 中找到 "${BGM_KEY}" 条目`,
                    );
                    return parseBgmData(entry.content);
                }
            }
        }

        const charAvatar = character.avatar;
        if (charAvatar) {
            debugLog(`[TI] 检查内嵌世界书（通过API获取最新数据）...`);

            try {
                const charResponse = await fetch("/api/characters/get", {
                    method: "POST",
                    headers: getRequestHeaders(),
                    body: JSON.stringify({
                        avatar_url: charAvatar,
                    }),
                });

                if (charResponse.ok) {
                    const freshCharData = await charResponse.json();
                    const freshBook = freshCharData?.data?.character_book;

                    if (freshBook) {
                        const entry = findEntryInBook(freshBook, BGM_KEY);
                        if (entry) {
                            debugLog(
                                `[TI] ✓ 在内嵌世界书中找到 "${BGM_KEY}" 条目（最新数据）`,
                            );
                            return parseBgmData(entry.content);
                        }
                    }
                }
            } catch (e) {
                debugWarn(`[TI] 获取最新角色数据失败，使用内存缓存:`, e);
            }

            const cachedBook = character.data?.character_book;
            if (cachedBook) {
                const entry = findEntryInBook(cachedBook, BGM_KEY);
                if (entry) {
                    debugLog(
                        `[TI] ✓ 在内嵌世界书中找到 "${BGM_KEY}" 条目（缓存数据）`,
                    );
                    return parseBgmData(entry.content);
                }
            }
        }

        debugLog(`[TI] 在所有世界书中都未找到 "${BGM_KEY}" 条目`);
        return null;
    } catch (error) {
        console.error(`[TI] 获取或解析BGM播放列表时出错:`, error);
        return null;
    }
}

function parseBgmData(rawText) {
    if (!rawText || typeof rawText !== "string") {
        return null;
    }

    const keyMap = {
        歌曲名: "title",
        title: "title",
        歌手: "artist",
        artist: "artist",
        音频链接: "audioUrl",
        audioUrl: "audioUrl",
        封面链接: "coverUrl",
        coverUrl: "coverUrl",
        歌词链接: "lyricsUrl",
        lyricsUrl: "lyricsUrl",
    };

    try {
        const playlist = [];
        const songBlocks = rawText.split(/\n\s*={3,}\s*\n/);

        for (const block of songBlocks) {
            if (block.trim() === "") continue;

            const song = {};
            const lines = block.split("\n");

            for (const line of lines) {
                const trimmedLine = line.trim();
                if (trimmedLine === "") continue;

                const separatorIndex = trimmedLine.indexOf(":");
                if (separatorIndex === -1) continue;

                const key = trimmedLine.substring(0, separatorIndex).trim();
                const value = trimmedLine.substring(separatorIndex + 1).trim();

                const standardKey = keyMap[key];

                if (standardKey && value) {
                    song[standardKey] = value;
                }
            }

            if (song.title && song.audioUrl) {
                playlist.push(song);
            }
        }

        if (playlist.length > 0) {
            debugLog("[Player][BGM] 数据解析成功，歌单:", playlist);
            return playlist;
        } else {
            debugWarn("[Player][BGM] 数据解析后为空，请检查世界书格式或内容。");
            return null;
        }
    } catch (error) {
        console.error("[Player][BGM] 解析BGM数据时出错:", error);
        toastr.error(
            t`The character's BGM world book entry is incorrectly formatted. Please check it.`,
            t`BGM Parsing Failed`,
        );
        return null;
    }
}

// ==================== BGM气泡渲染 ====================

function getBubbleStyleCSS() {
    const settings = getSettings();
    const style = settings.bubbleStyles.find(
        (s) => s.id === settings.selectedBubbleStyleId,
    );
    return style ? style.css : "";
}

const bubbleRenderCache = new Map();
const RENDER_DEBOUNCE_MS = 200;
const MAX_BUBBLE_CACHE_SIZE = 20;
let bubbleRenderQueue = new Set();
let bubbleRenderScheduled = false;

function renderBgmBubblesDebounced(messageElement) {
    if (!messageElement) return;

    const mesId = messageElement.getAttribute("mesid");
    if (!mesId) return;
    const lastRender = bubbleRenderCache.get(mesId);
    const now = Date.now();
    if (lastRender && now - lastRender < RENDER_DEBOUNCE_MS) {
        return;
    }

    bubbleRenderQueue.add(messageElement);
    bubbleRenderCache.set(mesId, now);
    if (!bubbleRenderScheduled) {
        bubbleRenderScheduled = true;

        const processQueue = () => {
            const elementsToProcess = [...bubbleRenderQueue];
            bubbleRenderQueue.clear();
            bubbleRenderScheduled = false;

            elementsToProcess.forEach((el) => {
                if (el && el.isConnected) {
                    renderBgmBubbles(el);
                }
            });

            if (bubbleRenderCache.size > MAX_BUBBLE_CACHE_SIZE) {
                const keysToDelete = [];
                const expireTime = Date.now() - 60000;
                for (const [key, time] of bubbleRenderCache) {
                    if (time < expireTime) {
                        keysToDelete.push(key);
                    }
                    if (keysToDelete.length >= 10) break;
                }
                if (keysToDelete.length === 0) {
                    const sorted = [...bubbleRenderCache.entries()]
                        .sort((a, b) => a[1] - b[1])
                        .slice(0, 10);
                    sorted.forEach(([key]) => keysToDelete.push(key));
                }
                keysToDelete.forEach((key) => bubbleRenderCache.delete(key));
            }
        };
        if ("requestIdleCallback" in window) {
            requestIdleCallback(processQueue, { timeout: 300 });
        } else {
            setTimeout(processQueue, 50);
        }
    }
}

function renderBgmBubbles(messageElement) {
    const settings = getSettings();
    if (!settings.enableBubbleReplacement) return;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const style = settings.bubbleStyles.find(
        (s) => s.id === settings.selectedBubbleStyleId,
    );
    if (!style) return;

    const mesText = messageElement.querySelector(".mes_text");
    if (!mesText) return;

    BGM_REGEX.lastIndex = 0;

    const getNonCodeText = (element) => {
        let text = "";
        const walk = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.tagName.toUpperCase();
                if (tag !== "CODE" && tag !== "PRE") {
                    for (const child of node.childNodes) {
                        walk(child);
                    }
                }
            }
        };
        walk(element);
        return text;
    };

    const nonCodeText = getNonCodeText(mesText);
    if (!nonCodeText.includes("[bgm]")) return;

    BGM_REGEX.lastIndex = 0;
    const allMatches = [...nonCodeText.matchAll(BGM_REGEX)];
    if (allMatches.length === 0) return;

    let processedCount = 0;

    const walker = document.createTreeWalker(mesText, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
            let parent = node.parentElement;
            while (parent && parent !== mesText) {
                const tagName = parent.tagName.toUpperCase();
                if (tagName === "PRE" || tagName === "CODE") {
                    return NodeFilter.FILTER_REJECT;
                }
                parent = parent.parentElement;
            }
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    const textNodesToProcess = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
        BGM_REGEX.lastIndex = 0;
        if (BGM_REGEX.test(currentNode.textContent)) {
            textNodesToProcess.push(currentNode);
        }
    }

    textNodesToProcess.forEach((textNode) => {
        const text = textNode.textContent;
        BGM_REGEX.lastIndex = 0;
        const nodeMatches = [...text.matchAll(BGM_REGEX)];
        if (nodeMatches.length === 0) return;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        nodeMatches.forEach((match) => {
            const [fullMatch, title, artist] = match;
            const matchStart = match.index;

            if (matchStart > lastIndex) {
                fragment.appendChild(
                    document.createTextNode(text.slice(lastIndex, matchStart)),
                );
            }

            const bubbleHtml = style.html
                .replace(/\{\{title\}\}/g, escapeHtml(title.trim()))
                .replace(/\{\{artist\}\}/g, escapeHtml(artist.trim()));

            const temp = document.createElement("div");
            temp.innerHTML = bubbleHtml;
            const bubble = temp.querySelector(".music-bubble-from-regex");
            if (bubble) {
                bubble.dataset.title = title.trim();
                bubble.dataset.artist = artist.trim();
            }
            while (temp.firstChild) {
                fragment.appendChild(temp.firstChild);
            }

            lastIndex = matchStart + fullMatch.length;
            processedCount++;
        });

        if (lastIndex < text.length) {
            fragment.appendChild(
                document.createTextNode(text.slice(lastIndex)),
            );
        }
        textNode.parentNode.replaceChild(fragment, textNode);
    });

    if (processedCount >= allMatches.length) {
        verboseLog(`[Player][气泡] 已渲染 ${processedCount} 个 BGM 气泡`);
        return;
    }

    debugWarn(
        `[Player][气泡] 检测到 ${allMatches.length - processedCount} 个跨节点 BGM 标签，启用修复模式`,
    );

    const currentNonCodeText = getNonCodeText(mesText);
    BGM_REGEX.lastIndex = 0;
    const remainingMatches = [...currentNonCodeText.matchAll(BGM_REGEX)];

    if (remainingMatches.length === 0) {
        verboseLog(`[Typing Indicator Music] 所有标签已处理完成`);
        return;
    }

    let html = mesText.innerHTML;
    const protectedBlocks = [];

    html = html.replace(/<(pre|code)[^>]*>[\s\S]*?<\/\1>/gi, (match) => {
        const placeholder = `__PROTECTED_BLOCK_${protectedBlocks.length}__`;
        protectedBlocks.push(match);
        return placeholder;
    });

    let hasChanges = false;

    for (const match of remainingMatches) {
        const [, title, artist] = match;

        const flexPattern = (str) => {
            return str
                .split("")
                .map((ch) => escapeRegex(ch))
                .join("(?:<[^>]*>)*");
        };

        const searchRegex = new RegExp(
            `\\[bgm\\](?:<[^>]*>)*${flexPattern(title)}(?:<[^>]*>)*-(?:<[^>]*>)*${flexPattern(artist)}(?:<[^>]*>)*\\[/bgm\\]`,
            "gi",
        );

        const bubbleHtml = style.html
            .replace(/\{\{title\}\}/g, escapeHtml(title.trim()))
            .replace(/\{\{artist\}\}/g, escapeHtml(artist.trim()));

        const temp = document.createElement("div");
        temp.innerHTML = bubbleHtml;
        const bubble = temp.querySelector(".music-bubble-from-regex");
        if (bubble) {
            bubble.dataset.title = title.trim();
            bubble.dataset.artist = artist.trim();
        }

        const newHtml = html.replace(searchRegex, temp.innerHTML);
        if (newHtml !== html) {
            html = newHtml;
            hasChanges = true;
        }
    }

    protectedBlocks.forEach((block, index) => {
        html = html.replace(`__PROTECTED_BLOCK_${index}__`, () => block);
    });

    if (hasChanges) {
        mesText.innerHTML = html;
        verboseLog(
            `[Player][气泡] 已修复 ${remainingMatches.length} 个跨节点 BGM 气泡`,
        );
    }
}

function applyBubbleStyles() {
    const styleId = "ti-bubble-style";
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }

    styleEl.textContent = getBubbleStyleCSS();
}

function refreshAllBubbles() {
    applyBubbleStyles();

    const settings = getSettings();
    if (!settings.enableBubbleReplacement) return;

    const style = settings.bubbleStyles.find(
        (s) => s.id === settings.selectedBubbleStyleId,
    );
    if (!style) return;

    document.querySelectorAll("#chat .mes").forEach((mes) => {
        const mesId = mes.getAttribute("mesid");
        if (mesId === null) return;

        const mesText = mes.querySelector(".mes_text");
        if (!mesText) return;

        const existingBubbles = mesText.querySelectorAll(
            ".music-bubble-from-regex",
        );

        if (existingBubbles.length > 0) {
            existingBubbles.forEach((bubble) => {
                const title = bubble.dataset.title;
                const artist = bubble.dataset.artist;
                if (!title || !artist) return;

                const newHtml = style.html
                    .replace(/\{\{title\}\}/g, escapeHtml(title))
                    .replace(/\{\{artist\}\}/g, escapeHtml(artist));
                const container =
                    bubble.closest(".music-bubble-container") || bubble;
                const temp = document.createElement("div");
                temp.innerHTML = newHtml;
                const newEl = temp.firstElementChild || temp.firstChild;
                if (!newEl) return;
                const innerBubble = newEl.classList?.contains(
                    "music-bubble-from-regex",
                )
                    ? newEl
                    : newEl.querySelector(".music-bubble-from-regex");
                if (innerBubble) {
                    innerBubble.dataset.title = title;
                    innerBubble.dataset.artist = artist;
                }
                container.replaceWith(newEl);
            });
        } else {
            renderBgmBubbles(mes);
        }
    });

    verboseLog("[Player][气泡] 已刷新所有BGM气泡样式");
}

async function searchSongWithDedup(title, artist, excludeSourcesInput = []) {
    const excludeSources = [...excludeSourcesInput];
    const hasExclude = excludeSources.length > 0;
    const excludeLower = excludeSources.map((s) => String(s).toLowerCase());
    const key = hasExclude
        ? `${(title || "").toLowerCase().trim()}|||${(artist || "").toLowerCase().trim()}|||ex:${excludeLower.join(",")}`
        : `${(title || "").toLowerCase().trim()}|||${(artist || "").toLowerCase().trim()}`;

    if (
        !hasExclude &&
        MusicCache.getFailedSearch &&
        MusicCache.getFailedSearch(title, artist)
    ) {
        verboseLog(
            `[Player][搜索] 跳过已知失败的搜索（3天后自动重试）: ${title} - ${artist}`,
        );
        return null;
    }
    const cached = MusicCache.getSearch(title, artist);
    if (cached) {
        const cachedSrc = (cached.source || "").toLowerCase();
        const isExcluded = excludeLower.includes(cachedSrc);
        const isMatch =
            !artist ||
            !cached.artist ||
            MusicUtils.isArtistMatch(
                artist,
                MusicCache._normalizeArtist(cached.artist || ""),
            );

        if (isMatch && !isExcluded) {
            verboseLog(`[Player][搜索] ✓ 搜索缓存命中: ${title} - ${artist}`);
            let audioUrl = MusicCache.getAudio(cached.id, cached.source);
            if (!audioUrl) {
                verboseLog(`[Player][搜索] 音频URL缓存过期，主动刷新...`);
                const sourceMap = {
                    Netease: "netease",
                    Tencent: "tencent",
                    Kuwo: "kuwo",
                };
                const apiSource =
                    sourceMap[cached.source] || cached.source.toLowerCase();
                try {
                    const refreshed = await fetchAndValidateSong(
                        cached.id,
                        apiSource,
                        { title, artist },
                    );
                    if (refreshed && refreshed.audioUrl) {
                        audioUrl = refreshed.audioUrl;
                        MusicCache.setAudio(cached.id, cached.source, audioUrl);
                        if (refreshed.lyricsContent) {
                            MusicCache.setLyrics(
                                cached.id,
                                cached.source,
                                refreshed.lyricsContent,
                                refreshed.tlyricContent || "",
                            );
                        }
                        debugLog(
                            `[Player][搜索] ✓ 缓存歌曲音频URL已刷新: ${title}`,
                        );
                    }
                } catch (e) {
                    debugWarn(`[Player][搜索] 音频刷新失败:`, e.message);
                }
            }
            if (audioUrl) {
                const recentlyVerified = MusicCache.isAudioRecentlyVerified(
                    cached.id,
                    cached.source,
                );
                let cachedDur = null;
                if (!recentlyVerified) {
                    cachedDur = await MusicUtils.checkAudioDuration(audioUrl);
                } else {
                    verboseLog(
                        `[Player][搜索] ⏩ 缓存链接 2 小时内验证过，跳过时长检测: ${title}`,
                    );
                }
                if (
                    cachedDur !== null &&
                    cachedDur <= MusicUtils.MIN_PLAYABLE_DURATION
                ) {
                    debugWarn(
                        `[Player][搜索] ⚠️ 缓存链接已变试听版(${cachedDur.toFixed(1)}s)，丢弃并跨源: ${title} - ${artist}`,
                    );
                    MusicCache.invalidateAudio(cached.id, cached.source);
                    if (
                        cached.source &&
                        !excludeLower.includes(
                            String(cached.source).toLowerCase(),
                        )
                    ) {
                        excludeSources.push(cached.source);
                        excludeLower.push(String(cached.source).toLowerCase());
                    }
                } else {
                    const lyricsData = MusicCache.getLyrics(
                        cached.id,
                        cached.source,
                    );
                    const coverUrl =
                        MusicCache.getCover(cached.id, cached.source) ||
                        cached.coverUrl ||
                        "";
                    return {
                        id: cached.id,
                        source: cached.source,
                        name: cached.title,
                        title: cached.title,
                        artist: cached.artist,
                        coverUrl: coverUrl,
                        audioUrl: audioUrl,
                        lyricsContent: lyricsData?.content || "",
                        tlyricContent: lyricsData?.tlyric || "",
                    };
                }
            }
            debugLog(
                `[Player][搜索] 缓存歌曲音频无法获取，转跨源搜索: ${title} - ${artist}`,
            );
            if (
                cached.source &&
                !excludeLower.includes(String(cached.source).toLowerCase())
            ) {
                excludeSources.push(cached.source);
                excludeLower.push(String(cached.source).toLowerCase());
            }
        } else if (isExcluded) {
            verboseLog(
                `[Player][搜索] ⚠️ 缓存源 ${cached.source} 已被排除（说明该源刚才已播放失败），直接转跨源搜索: ${title} - ${artist}`,
            );
        } else {
            debugLog(
                `[Player][搜索] ⚠️ 缓存歌手不匹配，重新搜索: ${title} - ${artist}`,
            );
        }
    }

    if (pendingSearches.has(key)) {
        verboseLog(`[Player][搜索] 等待进行中的搜索: ${title} - ${artist}`);
        return pendingSearches.get(key);
    }

    const promise = (async () => {
        const result = await searchSong(title, artist, excludeSources);

        if (result) {
            const isMatch =
                !artist ||
                !result.artist ||
                MusicUtils.isArtistMatch(
                    artist,
                    MusicCache._normalizeArtist(result.artist || ""),
                );

            if (!isMatch) {
                debugWarn(
                    `[Player][搜索] ⚠️ 歌手不匹配，丢弃结果\n  期望: ${artist}\n  实际: ${result.artist}`,
                );
                if (!hasExclude) {
                    MusicCache.setFailedSearch &&
                        MusicCache.setFailedSearch(title, artist);
                }
                return null;
            }
            MusicCache.setSearch(title, artist, result);
            MusicCache.clearFailedSearch &&
                MusicCache.clearFailedSearch(title, artist);
            return result;
        }
        if (!hasExclude) {
            MusicCache.setFailedSearch &&
                MusicCache.setFailedSearch(title, artist);
        }
        return null;
    })();

    pendingSearches.set(key, promise);

    try {
        return await promise;
    } finally {
        pendingSearches.delete(key);
    }
}
const _candidatesCache = new Map();
const _CANDIDATES_TTL = 60 * 1000;

async function searchSong(title, artist = "", excludeSources = []) {
    const query = artist ? `${title} ${artist}` : title;
    const allSources = ["netease", "tencent", "kuwo"];
    const lowerExclude = excludeSources.map((s) => String(s).toLowerCase());
    const sourceLabelMap = {
        netease: "Netease",
        tencent: "Tencent",
        kuwo: "Kuwo",
    };

    const _candKey = `${(title || "").toLowerCase().trim()}|${(artist || "").toLowerCase().trim()}`;
    const _cachedEntry = _candidatesCache.get(_candKey);
    let candidates = null;

    if (_cachedEntry && Date.now() - _cachedEntry.ts < _CANDIDATES_TTL) {
        const filtered = _cachedEntry.candidates.filter(
            (c) => !lowerExclude.includes(c._source),
        );
        if (filtered.length > 0) {
            debugLog(
                `[Player][搜索] ✓ 复用 ${filtered.length}/${_cachedEntry.candidates.length} 条候选 (排除: ${lowerExclude.join(",") || "无"})`,
            );
            candidates = filtered;
        }
    }

    if (!candidates) {
        const sources = allSources.filter((s) => {
            if (lowerExclude.includes(s)) return false;
            if (ApiHealthMonitor.isBlacklisted(`search:${s}`)) {
                debugLog(`[搜索] 跳过熔断中的源: ${s}`);
                return false;
            }
            return true;
        });

        if (sources.length === 0) {
            console.warn("[Player][搜索] 所有源都被排除/熔断");
            return null;
        }

        debugLog(
            `[Player][搜索] 并发搜索 "${query}"，启用源: ${sources.join(", ")}`,
        );

        const searchPromises = sources.map(async (source) => {
            try {
                const resp = await fetch(
                    `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,
                );
                if (!resp.ok) {
                    ApiHealthMonitor.recordFailure(`search:${source}`);
                    return { source, results: [] };
                }
                const data = await resp.json();
                const results = data?.data || [];
                if (results.length > 0) {
                    ApiHealthMonitor.recordSuccess(`search:${source}`);
                }
                return { source, results };
            } catch (e) {
                ApiHealthMonitor.recordFailure(`search:${source}`);
                return { source, results: [] };
            }
        });

        const allResults = await Promise.all(searchPromises);

        candidates = [];
        for (const { source, results } of allResults) {
            const sourceLabel = sourceLabelMap[source];
            results.slice(0, 5).forEach((item) => {
                candidates.push({
                    ...item,
                    _source: source,
                    _sourceLabel: sourceLabel,
                });
            });
        }

        if (candidates.length > 0) {
            _candidatesCache.set(_candKey, {
                candidates: [...candidates],
                ts: Date.now(),
            });
            if (_candidatesCache.size > 100) {
                const firstKey = _candidatesCache.keys().next().value;
                _candidatesCache.delete(firstKey);
            }
        }
    }

    if (candidates.length === 0) {
        debugWarn(`[Player][搜索] 三源都没结果: ${query}`);
        return null;
    }

    const scored = candidates
        .map((item) => ({
            item,
            score: MusicUtils.scoreCandidate(title, artist, item),
        }))
        .filter((x) => x.score !== null && x.score > -100)
        .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
        debugWarn(
            `[Player][搜索] 候选 ${candidates.length} 条，无任何符合阈值的匹配: ${query}`,
        );
        return null;
    }

    verboseLog(
        `[Player][搜索] 候选 ${candidates.length} 条 → 符合 ${scored.length} 条，TOP3:`,
        scored.slice(0, 3).map((s) => ({
            score: s.score.toFixed(1),
            source: s.item._source,
            song: s.item.song || s.item.name,
            artist: s.item.singer || s.item.artist,
        })),
    );

    for (const { item, score } of scored.slice(0, 5)) {
        const source = item._source;
        const sourceLabel = item._sourceLabel;
        const trackId = item.id || item.rid;

        if (ApiHealthMonitor.isBlacklisted(`song:${source}`)) {
            debugLog(`[搜索] 跳过熔断中的 song:${source}`);
            continue;
        }

        const cachedAudio = MusicCache.getAudio(trackId, sourceLabel);
        const cachedLyrics = MusicCache.getLyrics(trackId, sourceLabel);
        const cachedCover = MusicCache.getCover(trackId, sourceLabel);
        const itemCover = item.cover || item.pic || "";

        if (cachedAudio) {
            const recentlyVerified = MusicCache.isAudioRecentlyVerified(
                trackId,
                sourceLabel,
            );
            let cachedDur = null;
            if (!recentlyVerified) {
                cachedDur = await MusicUtils.checkAudioDuration(cachedAudio);
            }
            if (
                cachedDur !== null &&
                cachedDur <= MusicUtils.MIN_PLAYABLE_DURATION
            ) {
                debugWarn(
                    `[Player][搜索] ✗ 缓存的 ${sourceLabel} 已变成试听版(${cachedDur.toFixed(1)}s)，清除并重新获取`,
                );
                MusicCache.invalidateAudio(trackId, sourceLabel);
            } else {
                if (cachedDur !== null) {
                    MusicCache.markAudioAsVerified(trackId, sourceLabel);
                }
                verboseLog(
                    `[Player][搜索] ✓ 缓存命中 ${sourceLabel} (分数 ${score.toFixed(1)})`,
                );
                let finalTlyric = cachedLyrics?.tlyric || "";
                const _checkKey = `${trackId}-${sourceLabel}`;
                const _needTrans =
                    cachedLyrics?.content &&
                    shouldTryTranslation(cachedLyrics.content);
                if (
                    cachedLyrics?.content &&
                    !finalTlyric &&
                    _needTrans &&
                    !_translationCheckedKeys.has(_checkKey)
                ) {
                    if (_translationCheckedKeys.size > 500)
                        _translationCheckedKeys.clear();
                    _translationCheckedKeys.add(_checkKey);
                    try {
                        const lyricRes = await fetch(
                            `/api/plugins/g-player-proxy/lyric?id=${trackId}&source=${source}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`,
                        );
                        if (lyricRes.ok) {
                            const lyricJson = await lyricRes.json();
                            const newTlyric =
                                lyricJson?.data?.tlyric ||
                                lyricJson?.data?.trans ||
                                "";
                            if (newTlyric && newTlyric.trim() !== "") {
                                finalTlyric = newTlyric;
                                MusicCache.setLyrics(
                                    trackId,
                                    sourceLabel,
                                    cachedLyrics.content,
                                    newTlyric,
                                );
                            }
                        }
                    } catch (e) {
                        debugWarn("[搜索] 补翻译失败:", e.message);
                    }
                }
                return {
                    id: trackId,
                    name: item.song || item.name,
                    title: item.song || item.name,
                    artist: item.singer || item.artist,
                    coverUrl: cachedCover || itemCover,
                    source: sourceLabel,
                    audioUrl: cachedAudio,
                    lyricsContent: cachedLyrics?.content || "",
                    tlyricContent: finalTlyric,
                };
            }
        }
        try {
            const songData = await fetchAndValidateSong(trackId, source, {
                title,
                artist,
            });
            if (!songData) {
                ApiHealthMonitor.recordFailure(`song:${source}`);
                verboseLog(
                    `[Player][搜索] ✗ ${sourceLabel} 接口故障，尝试下一候选`,
                );
                continue;
            }
            if (songData._noSource) {
                verboseLog(
                    `[Player][搜索] ✗ ${sourceLabel} 这首歌没源，跳过但不熔断`,
                );
                continue;
            }
            if (songData._isPreview) {
                verboseLog(
                    `[Player][搜索] ✗ ${sourceLabel} 是试听版，跳过但不熔断`,
                );
                continue;
            }
            if (!songData.audioUrl) {
                continue;
            }
            ApiHealthMonitor.recordSuccess(`song:${source}`);

            MusicCache.setAudio(trackId, sourceLabel, songData.audioUrl);
            if (songData.lyricsContent) {
                MusicCache.setLyrics(
                    trackId,
                    sourceLabel,
                    songData.lyricsContent,
                    songData.tlyricContent || "",
                );
            }
            if (itemCover) {
                MusicCache.setCover(trackId, sourceLabel, itemCover);
            }

            debugLog(
                `[Player][搜索] ✓ ${sourceLabel} 成功 (分数 ${score.toFixed(1)})`,
            );

            return {
                id: trackId,
                name: item.song || item.name,
                title: item.song || item.name,
                artist: item.singer || item.artist,
                coverUrl: itemCover,
                source: sourceLabel,
                audioUrl: songData.audioUrl,
                lyricsContent: songData.lyricsContent || "",
                tlyricContent: songData.tlyricContent || "",
            };
        } catch (e) {
            ApiHealthMonitor.recordFailure(`song:${source}`);
            debugWarn(`[Player][搜索] ${sourceLabel} 异常:`, e.message);
            continue;
        }
    }

    console.warn(`[Player][搜索] 所有 TOP5 候选都失败: ${query}`);
    return null;
}

async function fetchAndValidateSong(id, source, queryInfo = null) {
    try {
        let lyricUrl = `/api/plugins/g-player-proxy/lyric?id=${id}&source=${source}`;
        if (queryInfo?.title)
            lyricUrl += `&title=${encodeURIComponent(queryInfo.title)}`;
        if (queryInfo?.artist)
            lyricUrl += `&artist=${encodeURIComponent(queryInfo.artist)}`;
        const [songResponse, lyricResponse] = await Promise.all([
            fetch(`/api/plugins/g-player-proxy/song?id=${id}&source=${source}`),
            fetch(lyricUrl),
        ]);

        if (!songResponse.ok) return null;

        const songData = await songResponse.json();

        if (songData._needFallback) {
            return { _noSource: true };
        }

        let audioUrl = "";
        let lyricsContent = "";
        let tlyricContent = "";

        if (songData.data) {
            if (Array.isArray(songData.data)) {
                audioUrl = songData.data[0]?.url || "";
                lyricsContent =
                    songData.data[0]?.lyric || songData.data[0]?.lrc || "";
                tlyricContent =
                    songData.data[0]?.tlyric || songData.data[0]?.trans || "";
            } else {
                audioUrl = songData.data.url || "";
                lyricsContent = songData.data.lrc || songData.data.lyric || "";
                tlyricContent =
                    songData.data.tlyric || songData.data.trans || "";
                if (!lyricsContent && songData.data.lrcId) {
                    try {
                        const lrcIdResponse = await fetch(
                            `/api/plugins/g-player-proxy/lyric?id=${songData.data.lrcId}&source=${source}`,
                        );
                        if (lrcIdResponse.ok) {
                            const lrcIdData = await lrcIdResponse.json();
                            if (lrcIdData?.data?.lrc) {
                                lyricsContent = lrcIdData.data.lrc;
                            }
                        }
                    } catch (e) {
                        verboseLog(`[搜索] 使用 lrcId 获取歌词失败`);
                    }
                }
            }
        }

        if ((!lyricsContent || !tlyricContent) && lyricResponse.ok) {
            try {
                const lyricData = await lyricResponse.json();
                if (lyricData?.data) {
                    const item = Array.isArray(lyricData.data)
                        ? lyricData.data[0]
                        : lyricData.data;
                    lyricsContent = item?.lrc || item?.lyric || "";
                    tlyricContent = item?.tlyric || item?.trans || "";
                } else {
                    lyricsContent = lyricData?.lyric || lyricData?.lrc || "";
                    tlyricContent = lyricData?.tlyric || "";
                }
            } catch (e) {}
        }

        if (!audioUrl) return { _noSource: true };
        const duration = await MusicUtils.checkAudioDuration(audioUrl);
        if (duration !== null && duration <= MusicUtils.MIN_PLAYABLE_DURATION) {
            return { _isPreview: true };
        }
        return {
            audioUrl,
            lyricsContent,
            tlyricContent,
            _verified: duration !== null,
        };
    } catch (error) {
        debugWarn(`[搜索调试] fetchAndValidateSong 失败:`, error);
        return null;
    }
}

const _translationCheckedKeys = new Set();
function shouldTryTranslation(lrcText) {
    if (!lrcText) return false;
    let cleanText = lrcText
        .replace(/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/g, "")
        .replace(/\[[a-zA-Z]+:[^\]]*\]/g, "")
        .replace(
            /^[\s]*(?:作词|作曲|编曲|制作人|和声|混音|监制|出品|录音|演唱|原唱|翻唱|词|曲)[\s:：].*$/gm,
            "",
        )
        .replace(
            /^[\s]*(?:Lyrics|Composed|Arranged|Produced|Mixed|Written)[\s:：by].*$/gim,
            "",
        );

    const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
    const meaningful = cleanText.replace(
        /[\s\d,.\-—:!?'"()（）。，、！？;:""''…·\n\r]/g,
        "",
    ).length;
    if (meaningful > 0 && chineseChars / meaningful > 0.25) return false;
    if (/[\u3040-\u309f\u30a0-\u30ff]/.test(cleanText)) return true;
    if (/[\uac00-\ud7af]/.test(cleanText)) return true;
    const letters = (cleanText.match(/[a-zA-Z]/g) || []).length;
    if (meaningful > 0 && letters / meaningful > 0.4) return true;

    return false;
}

async function findSongsInMessage(messageId) {
    if (!extension_settings[MODULE]?.playerEnabled) return [];
    const message = chat[messageId];
    if (!message || !message.mes) return [];
    if (message.is_hidden) return [];

    const content = message.mes;
    const songsToAdd = [];
    const allMatches = [...content.matchAll(BGM_REGEX)];

    for (const match of allMatches) {
        const title = match[1].trim();
        const artist = match[2].trim();
        if (!title || !artist) continue;

        const cached = MusicCache.getSearch(title, artist);
        if (cached) {
            verboseLog(`[Player][搜索] ✓ 缓存命中: ${title} - ${artist}`);
            const audioUrl = MusicCache.getAudio(cached.id, cached.source);
            const lyricsData = MusicCache.getLyrics(cached.id, cached.source);
            const coverUrl = MusicCache.getCover(cached.id, cached.source);

            let finalTlyric = lyricsData?.tlyric || "";
            const _checkKey = `${cached.id}-${cached.source}`;
            const _needTrans =
                lyricsData?.content && shouldTryTranslation(lyricsData.content);
            if (
                lyricsData?.content &&
                !finalTlyric &&
                _needTrans &&
                !_translationCheckedKeys.has(_checkKey)
            ) {
                if (_translationCheckedKeys.size > 500)
                    _translationCheckedKeys.clear();
                _translationCheckedKeys.add(_checkKey);
                verboseLog(`[Player][歌词] 缓存里翻译缺失，主动补: ${title}`);
                try {
                    const sourceMap = {
                        Netease: "netease",
                        Tencent: "tencent",
                        Kuwo: "kuwo",
                    };
                    const apiSource =
                        sourceMap[cached.source] || cached.source.toLowerCase();
                    const lyricRes = await fetch(
                        `/api/plugins/g-player-proxy/lyric?id=${cached.id}&source=${apiSource}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`,
                    );
                    if (lyricRes.ok) {
                        const lyricJson = await lyricRes.json();
                        const newTlyric =
                            lyricJson?.data?.tlyric ||
                            lyricJson?.data?.trans ||
                            "";
                        if (newTlyric && newTlyric.trim() !== "") {
                            finalTlyric = newTlyric;
                            MusicCache.setLyrics(
                                cached.id,
                                cached.source,
                                lyricsData.content,
                                newTlyric,
                            );
                            verboseLog(`[Player][歌词] ✓ 翻译已补齐: ${title}`);
                        } else {
                            verboseLog(
                                `[Player][歌词] /lyric 接口也没翻译: ${title}`,
                            );
                        }
                    }
                } catch (e) {
                    debugWarn(`[Player][歌词] 补翻译失败:`, e.message);
                }
            }

            songsToAdd.push({
                id: cached.id,
                source: cached.source,
                name: cached.title,
                title: cached.title,
                artist: cached.artist,
                coverUrl: (() => {
                    const isEmptyShell = (u) => {
                        if (!u) return true;
                        const m = u.match(/M([0-9a-zA-Z]+)\.jpg/i);
                        return m && /^0+$/.test(m[1]);
                    };
                    if (coverUrl && !isEmptyShell(coverUrl)) return coverUrl;
                    if (cached.coverUrl && !isEmptyShell(cached.coverUrl))
                        return cached.coverUrl;
                    return "";
                })(),
                audioUrl: audioUrl || "",
                lyricsContent: lyricsData?.content || "",
                tlyricContent: finalTlyric,
                originalTitle: title,
                originalArtist: artist,
                sourceMessageId: messageId,
                _fromCache: true,
            });
            continue;
        }

        debugLog(`[Player][搜索] 开始搜: ${title} - ${artist}`);
        const trackData = await searchSongWithDedup(title, artist);

        if (trackData) {
            trackData.sourceMessageId = messageId;
            trackData.originalTitle = title;
            trackData.originalArtist = artist;
            trackData._fromCache = true;
            songsToAdd.push(trackData);
        } else {
            debugWarn(`[Player][搜索] ⚠️ 未找到可用音源: ${title} - ${artist}`);
        }
    }

    return songsToAdd;
}

async function scanChatForSongs(scanAll = false) {
    if (!chat || chat.length === 0) return [];
    const validMessages = chat
        .map((msg, index) => ({ msg, index }))
        .filter(({ msg }) => {
            if (SCAN_CONFIG.SKIP_HIDDEN && msg.is_hidden) return false;
            if (msg.is_system) return false;
            if (!msg.mes || !msg.mes.includes("[bgm]")) return false;
            return true;
        });
    const messagesToScan = scanAll
        ? validMessages
        : validMessages.slice(-SCAN_CONFIG.MAX_MESSAGES_TO_SCAN);

    debugLog(
        `[Player] 扫描 ${messagesToScan.length}/${chat.length} 条消息${scanAll ? "（全部）" : ""}`,
    );

    if (messagesToScan.length === 0) return [];
    const results = await asyncPool(
        SCAN_CONFIG.CONCURRENT_LIMIT,
        messagesToScan,
        ({ index }) => findSongsInMessage(index),
    );

    const allSongs = results.flat();
    const uniqueSongs = new Map();
    allSongs.forEach((song) => {
        const key = `${song.id}-${song.source}`;
        if (!uniqueSongs.has(key)) {
            uniqueSongs.set(key, song);
        }
    });

    const finalPlaylist = Array.from(uniqueSongs.values());
    debugLog(`[Player] 找到 ${finalPlaylist.length} 首不重复的歌`);
    return finalPlaylist;
}
function getProgressKey(mode, fallbackPlaylistId) {
    if (mode === "mixed" || mode === "chat_only") {
        const charAvatar =
            this_chid !== undefined && characters[this_chid]
                ? characters[this_chid].avatar
                : null;
        return charAvatar ? `${mode}:${charAvatar}` : null;
    }
    return fallbackPlaylistId || null;
}

let _playlistBuildPromise = null;
let _playlistBuildPending = false;

async function buildAndSetInitialPlaylist() {
    const settings = getSettings();
    if (!settings.playerEnabled) {
        return;
    }
    if (_playlistBuildPromise) {
        _playlistBuildPending = true;
        return _playlistBuildPromise;
    }
    _playlistBuildPromise = _doBuildAndSetInitialPlaylist();
    try {
        await _playlistBuildPromise;
    } finally {
        _playlistBuildPromise = null;
        if (_playlistBuildPending) {
            _playlistBuildPending = false;
            buildAndSetInitialPlaylist();
        }
    }
}

async function _loadPlaylistSongsAsTracks(playlistId) {
    if (!playlistId) return [];
    try {
        const resp = await fetch(
            `/api/plugins/g-player-proxy/playlists/${playlistId}`,
        );
        if (!resp.ok) return [];
        const pl = await resp.json();
        if (!Array.isArray(pl.songs)) return [];
        return pl.songs.map((s) => {
            const title = s.title || "未知歌曲";
            const artist = s.artist || "";
            const track = {
                title: title,
                name: title,
                artist: artist,
                coverUrl: s.cover || "",
                sourceMessageId: `playlist-${playlistId}`,
                originalTitle: title,
                originalArtist: artist,
            };
            const cached = MusicCache.getSearch(title, artist);
            if (cached && cached.id && cached.source) {
                track.id = cached.id;
                track.source = cached.source;
                if (!track.coverUrl) track.coverUrl = cached.coverUrl || "";
                const audioUrl = MusicCache.getAudio(cached.id, cached.source);
                if (audioUrl) {
                    track.audioUrl = audioUrl;
                    track._fromCache = true;
                }
                const lyrics = MusicCache.getLyrics(cached.id, cached.source);
                if (lyrics) {
                    track.lyricsContent = lyrics.content || "";
                    track.tlyricContent = lyrics.tlyric || "";
                }
                const cover = MusicCache.getCover(cached.id, cached.source);
                if (cover && !track.coverUrl) track.coverUrl = cover;
            }
            return track;
        });
    } catch (e) {
        console.warn("[Player][歌单] 加载歌单歌曲失败:", e);
        return [];
    }
}

let _prefetchAbortController = null;
async function prefetchPlaylistUrls(playlist, startIndex = 0) {
    if (!Array.isArray(playlist) || playlist.length === 0) return;
    if (_prefetchAbortController) {
        _prefetchAbortController.abort();
    }
    _prefetchAbortController = new AbortController();
    const signal = _prefetchAbortController.signal;

    const PREFETCH_LIMIT = 5;
    const targets = [];
    const len = playlist.length;
    for (let i = 0; i < len; i++) {
        if (targets.length >= PREFETCH_LIMIT) break;
        const t = playlist[(startIndex + i) % len];
        if (t.audioUrl) continue;
        const title = t.originalTitle || t.title || t.name || "";
        const artist = t.originalArtist || t.artist || "";
        if (!title) continue;
        targets.push({ title, artist });
    }

    if (targets.length === 0) return;
    debugLog(`[Player][歌单] 后台预搜 ${targets.length} 首歌的播放链接...`);

    for (const item of targets) {
        if (signal.aborted) return;
        try {
            const result = await searchSongWithDedup(item.title, item.artist);
            if (signal.aborted) return;
            if (result && result.audioUrl) {
                verboseLog(`[Player][歌单] ✓ 预搜成功: ${item.title}`);
            }
        } catch (e) {
            debugWarn(`[Player][歌单] 预搜失败:`, e.message);
        }
    }
    debugLog(`[Player][歌单] 后台预搜完成`);
}

async function _doBuildAndSetInitialPlaylist() {
    const settings = getSettings();
    const mode = settings.playlistSourceMode || "mixed";
    if (
        settings.rememberPlaybackProgress &&
        (mode === "mixed" || mode === "chat_only") &&
        (this_chid === undefined || !characters[this_chid])
    ) {
        debugLog(
            `[Player][歌单] 角色未就绪 (this_chid=${this_chid})，跳过本次构建，等待聊天加载完成`,
        );
        return;
    }

    isPlaylistReady = false;
    let finalPlaylist = [];
    try {
        if (mode === "playlist_only") {
            finalPlaylist = await _loadPlaylistSongsAsTracks(
                settings.selectedPlaylistId,
            );
            debugLog(
                `[Player][歌单] 纯歌单模式，加载 ${finalPlaylist.length} 首`,
            );
        } else if (mode === "character_playlist") {
            const charAvatar =
                this_chid !== undefined && characters[this_chid]
                    ? characters[this_chid].avatar
                    : null;
            const boundId =
                charAvatar && settings.characterPlaylists
                    ? settings.characterPlaylists[charAvatar]
                    : null;
            if (boundId) {
                finalPlaylist = await _loadPlaylistSongsAsTracks(boundId);
                debugLog(
                    `[Player][歌单] 角色歌单模式，加载 ${finalPlaylist.length} 首`,
                );
            } else {
                debugLog("[Player][歌单] 角色歌单模式但无绑定，播放列表为空");
            }
        } else if (mode === "chat_only") {
            finalPlaylist = await scanChatForSongs(true);
            debugLog(
                `[Player][歌单] 纯聊天模式，扫描全部消息，加载 ${finalPlaylist.length} 首`,
            );
        } else {
            const [chatSongs, worldInfoSongsRaw] = await Promise.all([
                scanChatForSongs(),
                getBgmPlaylistAsync(),
            ]);

            finalPlaylist = [];
            const existingKeys = new Set();
            const existingTitleArtist = new Set();

            const idSourceKey = (s) => {
                if (s.id && s.source) return `${s.id}-${s.source}`;
                if (s.audioUrl) return `url:${s.audioUrl}`;
                return null;
            };
            const titleArtistKey = (s) => {
                const title = (s.title || s.name || "").toLowerCase();
                const artist = Array.isArray(s.artist)
                    ? s.artist.join(",").toLowerCase()
                    : (s.artist || "").toLowerCase();
                return `info:${title}-${artist}`;
            };
            const tryAdd = (song) => {
                const k1 = idSourceKey(song);
                const k2 = titleArtistKey(song);
                if (k1 && existingKeys.has(k1)) return;
                if (existingTitleArtist.has(k2)) return;
                finalPlaylist.push(song);
                if (k1) existingKeys.add(k1);
                existingTitleArtist.add(k2);
            };

            if (worldInfoSongsRaw && worldInfoSongsRaw.length > 0) {
                worldInfoSongsRaw.forEach((track) => {
                    tryAdd({
                        name:
                            track.name ||
                            track.song ||
                            track.title ||
                            track.歌曲名 ||
                            t`Unknown Title`,
                        artist: Array.isArray(track.artist)
                            ? track.artist
                            : track.artist
                              ? [track.artist]
                              : [t`Unknown Artist`],
                        audioUrl: track.audioUrl || track.url || track.音频链接,
                        lyricsUrl:
                            track.lyricsUrl || track.lrc || track.歌词链接,
                        coverUrl:
                            track.coverUrl ||
                            track.cover ||
                            track.pic ||
                            track.封面链接,
                        sourceMessageId: "world-info",
                        ...track,
                    });
                });
            }

            if (settings.selectedPlaylistId) {
                const playlistSongs = await _loadPlaylistSongsAsTracks(
                    settings.selectedPlaylistId,
                );
                playlistSongs.forEach(tryAdd);
            }

            chatSongs.forEach(tryAdd);

            debugLog(
                `[Player][歌单] 混合模式，最终 ${finalPlaylist.length} 首（世界书→歌单→聊天）`,
            );
        }

        const avatarUrls = getAvatarUrls();

        const playerIframe = document.querySelector(
            "#music_player .theme-iframe",
        );
        if (playerIframe && playerIframe.contentWindow) {
            if (finalPlaylist.length > 0) {
                if (playlistsAreDifferent(lastSentPlaylist, finalPlaylist)) {
                    lastSentPlaylist = finalPlaylist;
                    let resumeTrack = null;
                    if (settings.rememberPlaybackProgress) {
                        let activePlaylistId = settings.selectedPlaylistId;
                        if (mode === "character_playlist") {
                            const charAvatar =
                                this_chid !== undefined && characters[this_chid]
                                    ? characters[this_chid].avatar
                                    : null;
                            activePlaylistId =
                                charAvatar && settings.characterPlaylists
                                    ? settings.characterPlaylists[charAvatar]
                                    : null;
                        }
                        const rKey = getProgressKey(mode, activePlaylistId);
                        if (rKey && settings.lastPlaybackProgress?.[rKey]) {
                            resumeTrack = settings.lastPlaybackProgress[rKey];
                            debugLog(
                                `[Player][记忆] ✓ 读取到进度 key="${rKey}" → "${resumeTrack.title}" - "${resumeTrack.artist}"，将传递给播放器`,
                            );
                        } else {
                            debugLog(
                                `[Player][记忆] ✗ 没有找到进度 key="${rKey || "(空)"}", mode="${mode}"`,
                            );
                        }
                    }
                    playerIframe.contentWindow.postMessage(
                        {
                            source: "typing-indicator-host",
                            type: "set-initial-playlist",
                            data: {
                                playlist: finalPlaylist,
                                charAvatarUrl: avatarUrls.char,
                                userAvatarUrl: avatarUrls.user,
                                resumeTrack: resumeTrack,
                            },
                        },
                        "*",
                    );
                } else {
                    debugLog("[Player][歌单] 播放列表未变化，只更新上下文");
                    playerIframe.contentWindow.postMessage(
                        {
                            source: "typing-indicator-host",
                            type: "context-update",
                            data: getCurrentCharContext(),
                        },
                        "*",
                    );
                }
            } else {
                playerIframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "context-update",
                        data: {
                            ...getCurrentCharContext(),
                            playlist: [],
                        },
                    },
                    "*",
                );
            }
        }
    } catch (error) {
        console.error(
            "[Typing Indicator Music] 构建并设置初始播放列表失败:",
            error,
        );
    } finally {
        isPlaylistReady = true;
        if (finalPlaylist && finalPlaylist.length > 0) {
            let prefetchStart = 0;
            if (settings.rememberPlaybackProgress) {
                let activePlaylistId = settings.selectedPlaylistId;
                if (mode === "character_playlist") {
                    const charAvatar =
                        this_chid !== undefined && characters[this_chid]
                            ? characters[this_chid].avatar
                            : null;
                    activePlaylistId =
                        charAvatar && settings.characterPlaylists
                            ? settings.characterPlaylists[charAvatar]
                            : null;
                }
                const rKey = getProgressKey(mode, activePlaylistId);
                const saved = rKey
                    ? settings.lastPlaybackProgress?.[rKey]
                    : null;
                if (saved) {
                    const idx = finalPlaylist.findIndex((t) => {
                        const tArtist = Array.isArray(t.artist)
                            ? t.artist.join(",")
                            : t.artist || "";
                        return (
                            MusicUtils.isTitleMatch(
                                saved.title || "",
                                t.originalTitle || t.title || "",
                            ) &&
                            MusicUtils.isArtistMatch(
                                saved.artist || "",
                                t.originalArtist || tArtist,
                            )
                        );
                    });
                    if (idx > 0) prefetchStart = idx;
                }
            }
            setTimeout(
                () => prefetchPlaylistUrls(finalPlaylist, prefetchStart),
                800,
            );
        }
    }
}

async function handleSongPlayRequest(songData) {
    if (!songData || !songData.title || !songData.artist) {
        console.error(
            "[Typing Indicator Music] 从正则点击中收到无效的歌曲数据。",
        );
        return;
    }

    const settings = getSettings();
    if (!settings.playerEnabled) {
        settings.playerEnabled = true;
        saveSettingsDebounced();
        showPlayer();
        const playerEnableCheckbox =
            document.getElementById("ti_player_enabled");
        if (playerEnableCheckbox) {
            playerEnableCheckbox.checked = true;
            const playerControls =
                document.getElementById("ti_player_controls");
            if (playerControls) playerControls.style.display = "block";
        }
        toastr.info(
            t`Player has been automatically enabled.`,
            t`Music Player`,
            {
                timeOut: 2000,
            },
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await buildAndSetInitialPlaylist();
    }

    const playerIframe = document.querySelector("#music_player .theme-iframe");
    if (!playerIframe || !playerIframe.contentWindow) {
        toastr.error(t`Music player is not ready.`, t`Music Player`);
        return;
    }

    if (!isPlayerInitialized || !isPlaylistReady) {
        debugLog("[TI] 等待播放器和播放列表初始化...");
        const waitStart = Date.now();
        await new Promise((resolve) => {
            const checkReady = setInterval(() => {
                if (
                    (isPlayerInitialized && isPlaylistReady) ||
                    Date.now() - waitStart > 5000
                ) {
                    clearInterval(checkReady);
                    resolve();
                }
            }, 50);
        });
        if (!isPlayerInitialized || !isPlaylistReady) {
            debugLog("[TI] 初始化超时，继续尝试发送");
        }
    }

    playerIframe.contentWindow.postMessage(
        {
            source: "typing-indicator-host",
            type: "enter-loading",
        },
        "*",
    );
    await new Promise((resolve) => setTimeout(resolve, 150));
    const cached = MusicCache.getSearch(songData.title, songData.artist);
    if (cached) {
        const isValidMatch = MusicUtils.isArtistMatch(
            songData.artist,
            MusicCache._normalizeArtist(cached.artist || ""),
        );

        if (!isValidMatch) {
            debugWarn(
                `[Player][缓存] ⚠️ artist 不匹配\n` +
                    `  期望: ${songData.artist}\n` +
                    `  实际: ${cached.artist}\n` +
                    `  → 删除错误缓存并重新搜索`,
            );

            MusicCache.invalidateSearch(songData.title, songData.artist);

            if (playerIframe && playerIframe.contentWindow) {
                playerIframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "play-by-info",
                        data: {
                            title: songData.title,
                            artist: songData.artist,
                        },
                    },
                    "*",
                );
            }
            return;
        }
        let audioUrl = MusicCache.getAudio(cached.id, cached.source);

        let cachedDur = null;
        if (audioUrl) {
            const recentlyVerified = MusicCache.isAudioRecentlyVerified(
                cached.id,
                cached.source,
            );
            if (!recentlyVerified) {
                cachedDur = await MusicUtils.checkAudioDuration(audioUrl);
            }
            if (
                cachedDur !== null &&
                cachedDur <= MusicUtils.MIN_PLAYABLE_DURATION
            ) {
                debugWarn(
                    `[Player][缓存] ⚠️ 缓存链接已变试听版(${cachedDur.toFixed(1)}s)，丢弃: ${songData.title}`,
                );
                MusicCache.invalidateAudio(cached.id, cached.source);
                audioUrl = null;
            }
        }

        if (audioUrl) {
            if (cachedDur !== null) {
                MusicCache.markAudioAsVerified(cached.id, cached.source);
            }
            verboseLog(
                `[Player][缓存] ✓ 完全命中: ${songData.title} - ${songData.artist}`,
            );
            const cachedLyrics = MusicCache.getLyrics(cached.id, cached.source);
            if (cachedLyrics && cachedLyrics.content && !cachedLyrics.tlyric) {
                try {
                    const sourceMap = {
                        Netease: "netease",
                        Tencent: "tencent",
                        Kuwo: "kuwo",
                    };
                    const apiSource =
                        sourceMap[cached.source] || cached.source.toLowerCase();
                    let lyricUrl = `/api/plugins/g-player-proxy/lyric?id=${cached.id}&source=${apiSource}`;
                    lyricUrl += `&title=${encodeURIComponent(songData.title)}&artist=${encodeURIComponent(songData.artist)}`;
                    const lyricRes = await fetch(lyricUrl);
                    const lyricJson = await lyricRes.json();
                    const newTlyric =
                        lyricJson?.data?.tlyric || lyricJson?.data?.trans || "";
                    if (newTlyric && newTlyric.trim() !== "") {
                        MusicCache.setLyrics(
                            cached.id,
                            cached.source,
                            cachedLyrics.content,
                            newTlyric,
                        );
                        verboseLog(
                            `[Player][歌词] ✓ 补齐翻译: ${songData.title}`,
                        );
                    }
                } catch (e) {
                    debugWarn(`[Player][歌词] 补翻译失败:`, e);
                }
            }
            sendPlayNow(playerIframe, cached, audioUrl, songData);
            showPlayerFeedback();
            return;
        }

        debugLog(`[Player][缓存] 音频URL过期，重新获取: ${songData.title}`);
        try {
            const sourceMap = {
                Netease: "netease",
                Tencent: "tencent",
                Kuwo: "kuwo",
            };
            const apiSource =
                sourceMap[cached.source] || cached.source.toLowerCase();
            const refreshed = await fetchAndValidateSong(cached.id, apiSource, {
                title: songData.title,
                artist: songData.artist,
            });

            if (refreshed && refreshed.audioUrl) {
                MusicCache.setAudio(
                    cached.id,
                    cached.source,
                    refreshed.audioUrl,
                );
                if (refreshed.lyricsContent) {
                    MusicCache.setLyrics(
                        cached.id,
                        cached.source,
                        refreshed.lyricsContent,
                        refreshed.tlyricContent || "",
                    );
                }
                debugLog(`[Player][缓存] ✓ 音频URL已刷新: ${songData.title}`);
                sendPlayNow(playerIframe, cached, refreshed.audioUrl, songData);
                showPlayerFeedback();
                return;
            }
        } catch (e) {
            debugWarn(`[Player][缓存] 刷新音频URL失败:`, e);
        }
    }

    debugLog(
        `[Player][搜索] 缓存未命中，主插件并发搜索: ${songData.title} - ${songData.artist}`,
    );

    try {
        const exclude = cached && cached.source ? [cached.source] : [];
        const newTrack = await searchSongWithDedup(
            songData.title,
            songData.artist,
            exclude,
        );

        if (newTrack && newTrack.audioUrl) {
            debugLog(
                `[Player][搜索] ✓ 主插件搜到，直接 play-now: ${songData.title} (${newTrack.source})`,
            );
            sendPlayNow(
                playerIframe,
                {
                    id: newTrack.id,
                    source: newTrack.source,
                    title: newTrack.title || newTrack.name,
                    artist: newTrack.artist,
                    coverUrl: newTrack.coverUrl || "",
                },
                newTrack.audioUrl,
                songData,
            );
            showPlayerFeedback();
            return;
        }
        debugWarn(
            `[Player][搜索] 主插件没搜到，交给 iframe 兜底: ${songData.title}`,
        );
    } catch (e) {
        console.error(`[Player][搜索] 主插件搜索异常，回退到 iframe:`, e);
    }

    playerIframe.contentWindow.postMessage(
        {
            source: "typing-indicator-host",
            type: "play-by-info",
            data: {
                title: songData.title,
                artist: songData.artist,
            },
        },
        "*",
    );
    showPlayerFeedback();
}

function sendPlayNow(iframe, cached, audioUrl, originalData) {
    const lyricsData = MusicCache.getLyrics(cached.id, cached.source);
    const coverUrl =
        MusicCache.getCover(cached.id, cached.source) || cached.coverUrl || "";
    let artistArray;
    if (Array.isArray(cached.artist)) {
        artistArray = cached.artist;
    } else if (
        typeof cached.artist === "string" &&
        cached.artist.includes(" / ")
    ) {
        artistArray = cached.artist
            .split(" / ")
            .map((a) => a.trim())
            .filter(Boolean);
    } else {
        artistArray = cached.artist ? [cached.artist] : [];
    }

    const messageData = {
        id: cached.id,
        source: cached.source,
        name: cached.title,
        title: cached.title,
        artist: artistArray,
        coverUrl: coverUrl,
        audioUrl: audioUrl,
        lyricsContent: lyricsData?.content || "",
        tlyricContent: lyricsData?.tlyric || "",
        originalTitle: originalData.title,
        originalArtist: originalData.artist,
    };

    queuePostMessage(
        iframe.contentWindow,
        {
            source: "typing-indicator-host",
            type: "play-now",
            data: messageData,
        },
        "*",
    );
}

async function getFavoriteSnapshot(track) {
    const all = await PlaylistAPI.list();
    const details = await Promise.all(
        all.map((p) => PlaylistAPI.get(p.id).catch(() => null)),
    );
    const statusMap = {};
    let isFavorited = false;
    const trackArtistStr = Array.isArray(track.artist)
        ? track.artist.join(",")
        : track.artist || "";
    details.forEach((pl, idx) => {
        if (!pl || !Array.isArray(pl.songs)) return;
        const inList = pl.songs.some((s) => {
            const sArtist = Array.isArray(s.artist)
                ? s.artist.join(",")
                : s.artist || "";
            return (
                MusicUtils.isTitleMatch(track.title, s.title) &&
                MusicUtils.isArtistMatch(trackArtistStr, sArtist)
            );
        });
        if (inList) {
            statusMap[all[idx].id] = true;
            isFavorited = true;
        }
    });
    return { all, statusMap, isFavorited };
}

function broadcastFavoriteStatus(track) {
    getFavoriteSnapshot(track)
        .then((snap) => {
            const playerIframe = document.querySelector(
                "#music_player .theme-iframe",
            );
            if (playerIframe && playerIframe.contentWindow) {
                playerIframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "favorite-status-update",
                        data: { track, isFavorited: snap.isFavorited },
                    },
                    "*",
                );
            }
        })
        .catch((e) => console.error("[Player][收藏] 广播失败:", e));
}

function showPlayerFeedback() {
    const playerElement = document.getElementById("music_player");
    if (!playerElement) return;

    const currentTransform = playerElement.style.transform || "";

    playerElement.style.transition =
        "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out";
    playerElement.style.boxShadow = "0 0 25px 8px rgba(160, 130, 200, 0.7)";
    playerElement.style.transform = `${currentTransform} scale(1.03)`.trim();

    setTimeout(() => {
        if (playerElement) {
            playerElement.style.boxShadow = "";
            playerElement.style.transform = currentTransform;
        }
    }, 600);
}

// ==================== 主题应用和样式 ====================

function applyTheme(themeId) {
    const settings = getSettings();
    const theme = settings.themes.find((t) => t.id === themeId);
    if (!theme) return;

    let oldStyleTag = document.getElementById(THEME_STYLE_ID);
    if (oldStyleTag) oldStyleTag.remove();

    const styleTag = document.createElement("style");
    styleTag.id = THEME_STYLE_ID;

    if (theme.useIframe) {
        styleTag.innerHTML = `
            .typing_indicator.iframe-theme {
                padding: 0 !important;
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                display: block !important;
                overflow: hidden !important;
                width: auto;
                height: auto;
            }
            .typing_indicator.iframe-theme .theme-iframe {
                width: 100%;
                height: 100%;
            }
        `;
    } else {
        styleTag.innerHTML = theme.css || DEFAULT_THEME_CSS;
    }
    document.head.appendChild(styleTag);
}

function updateAndApplyTheme(source = "unknown") {
    debugLog(`[TI] 主题更新触发，来源: ${source}`);
    const settings = getSettings();
    const newConfig = getActiveThemeConfig();

    if (
        newConfig.themeId === currentlyAppliedConfig.themeId &&
        newConfig.presetId === currentlyAppliedConfig.presetId
    ) {
        debugLog(`[TI] 主题配置未变，跳过更新`);
        return;
    }

    debugLog(
        `[TI] 应用新主题配置。旧:`,
        currentlyAppliedConfig,
        `新:`,
        newConfig,
    );

    applyTheme(newConfig.themeId);
    currentlyAppliedConfig = newConfig;
    refreshLiveIndicators(`theme_auto_update_by_${source}`);
}

// ==================== iframe 处理 ====================

function cleanupUnifiedIframe(indicatorElement) {
    releaseIframeToPool(indicatorElement);
}

function applyThemeToIndicator(theme, indicatorElement) {
    const existingIframe = indicatorElement.querySelector(".theme-iframe");
    if (existingIframe) {
        releaseIframeToPool(indicatorElement);
    }

    if (theme.useIframe) {
        indicatorElement.classList.add("iframe-theme");
        const characterName = getCurrentCharName();
        setTimeout(async () => {
            if (!indicatorElement.isConnected) {
                debugLog("[TI] 元素已脱离文档，跳过 iframe 创建");
                return;
            }
            await getOrCreateIframe(theme, indicatorElement, characterName);
            syncIndicatorInteractivity();
        }, 50);
    }
}

// ==================== 拖拽功能 ====================

function makeDraggable(element, positionType = "indicator") {
    const settings = getSettings();
    const positionSettings =
        positionType === "player"
            ? settings.playerPosition
            : positionType === "lyrics"
              ? settings.lyricsPosition
              : settings.customPosition;

    const oldHandle = element.querySelector(
        ".ti-drag-handle, .lyrics-drag-handle",
    );
    if (oldHandle) oldHandle.remove();
    if (positionType === "player") {
        element.style.cursor = "default";
        return;
    }

    if (positionSettings.locked) {
        element.style.cursor = "default";
        return;
    }

    const dragHandle = document.createElement("div");
    dragHandle.className =
        positionType === "lyrics" ? "lyrics-drag-handle" : "ti-drag-handle";
    dragHandle.style.cssText =
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: move; z-index: 99;";
    element.appendChild(dragHandle);

    let initialX, initialY, startX, startY, elementWidth, elementHeight;

    function onDragStart(e) {
        const iframe = element.querySelector("iframe");
        if (iframe) iframe.style.pointerEvents = "none";
        document.body.style.userSelect = "none";
        if (e.cancelable) e.preventDefault();
        element.style.transition = "none";

        const rect = element.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        elementWidth = rect.width;
        elementHeight = rect.height;

        element.style.left = `${rect.left}px`;
        element.style.top = `${rect.top}px`;
        element.style.transform = "none";
        startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        startY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
        document.addEventListener("touchmove", onDragMove, { passive: false });
        document.addEventListener("touchend", onDragEnd);
    }

    function onDragMove(e) {
        if (e.cancelable) e.preventDefault();
        const currentX =
            e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const currentY =
            e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

        let newX = initialX + (currentX - startX);
        let newY = initialY + (currentY - startY);
        newX = Math.max(0, Math.min(newX, window.innerWidth - elementWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - elementHeight));

        element.style.transform = `translate3d(${newX - initialX}px, ${newY - initialY}px, 0)`;
    }

    function onDragEnd() {
        const iframe = element.querySelector("iframe");
        if (iframe) iframe.style.pointerEvents = "auto";
        document.body.style.userSelect = "";

        const finalRect = element.getBoundingClientRect();
        element.style.transform = "";
        element.style.left = `${finalRect.left}px`;
        element.style.top = `${finalRect.top}px`;
        element.style.transition = "";

        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        document.removeEventListener("touchmove", onDragMove);
        document.removeEventListener("touchend", onDragEnd);

        const centerX = finalRect.left + finalRect.width / 2;
        const centerY = finalRect.top + finalRect.height / 2;

        positionSettings.x = (centerX / window.innerWidth) * 100;
        positionSettings.y = (centerY / window.innerHeight) * 100;
        saveSettingsDebounced();
    }

    dragHandle.addEventListener("mousedown", onDragStart);
    dragHandle.addEventListener("touchstart", onDragStart, { passive: false });
}

function syncIndicatorInteractivity() {
    const settings = getSettings();
    const indicator = document.getElementById("typing_indicator");
    if (!indicator) return;

    if (indicator.dataset.overlayMode === "1") {
        const isDraggableAndUnlocked =
            settings.position === "draggable" &&
            !settings.customPosition.locked;
        const pe = isDraggableAndUnlocked ? "auto" : "none";
        indicator.style.pointerEvents = pe;
        const iframe = indicator.querySelector(".theme-iframe");
        if (iframe) iframe.style.pointerEvents = pe;
        return;
    }

    indicator.style.pointerEvents = "";
    if (settings.clickThrough) {
        indicator.style.pointerEvents = "none";
        const iframe = indicator.querySelector(".theme-iframe");
        if (iframe) iframe.style.pointerEvents = "none";
    } else {
        indicator.style.pointerEvents = "";
        const iframe = indicator.querySelector(".theme-iframe");
        if (iframe) iframe.style.pointerEvents = "";
    }

    if (settings.position === "draggable") {
        if (settings.customPosition.locked) {
            indicator.querySelector(".ti-drag-handle")?.remove();
        } else {
            makeDraggable(indicator, "indicator");
        }
    } else {
        indicator.querySelector(".ti-drag-handle")?.remove();
    }
}

// ==================== 浮动指示器自动跟随输入框 ====================

let _floatingIndicatorResizeObserver = null;
let _floatingIndicatorWatcherSetup = false;

function setupFloatingIndicatorAutoAdjust() {
    if (_floatingIndicatorWatcherSetup) return;
    _floatingIndicatorWatcherSetup = true;

    const updatePosition = () => {
        const indicator = document.getElementById("typing_indicator");
        if (!indicator) return;
        if (!indicator.classList.contains("typing_indicator_floating")) return;

        const settings = getSettings();
        const sendForm = document.getElementById("send_form");
        const memoryTable = document.getElementById("tableStatusContainer");
        let bottomOffset = 5; /* 基础间距，可自定义 */
        if (sendForm) bottomOffset += sendForm.offsetHeight;
        if (memoryTable && getComputedStyle(memoryTable).display !== "none") {
            bottomOffset += memoryTable.offsetHeight;
        }
        bottomOffset += settings.floatingBottomOffset || 0;
        indicator.style.bottom = `${bottomOffset}px`;
    };

    const attachSendFormObserver = () => {
        const sendForm = document.getElementById("send_form");
        if (!sendForm || typeof ResizeObserver === "undefined") return;
        if (_floatingIndicatorResizeObserver) {
            _floatingIndicatorResizeObserver.disconnect();
        }
        _floatingIndicatorResizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updatePosition);
        });
        _floatingIndicatorResizeObserver.observe(sendForm);
    };

    attachSendFormObserver();
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => {
            requestAnimationFrame(updatePosition);
        });
        window.visualViewport.addEventListener("scroll", () => {
            requestAnimationFrame(updatePosition);
        });
    }

    window.addEventListener("resize", () => {
        requestAnimationFrame(updatePosition);
    });

    if (!document.getElementById("send_form")) {
        const retryTimer = setInterval(() => {
            if (document.getElementById("send_form")) {
                clearInterval(retryTimer);
                attachSendFormObserver();
            }
        }, 500);
        setTimeout(() => clearInterval(retryTimer), 10000);
    }
}

// ==================== 指示器显示和隐藏 ====================

function showTypingIndicator(type, _args, dryRun, overrideThemeId) {
    if (isRendering) return;
    isRendering = true;
    try {
        const settings = getSettings();
        let { themeId, presetId } = getActiveThemeConfig();
        if (overrideThemeId) {
            themeId = overrideThemeId;
        }

        const currentTheme =
            settings.themes.find((t) => t.id === themeId) || settings.themes[0];
        if (themeId && themeId !== currentTheme.id) {
            console.error(
                `[TI] ⚠️ 主题 ID 不匹配！请求="${themeId}" 实际="${currentTheme.id}"，请检查设置中是否存在该主题。`,
            );
        }

        const existingIndicator = document.getElementById("typing_indicator");

        if (isIndicatorPersisted && existingIndicator) {
            isRendering = false;
            return;
        }

        if (!isIndicatorPersisted) {
            if (
                !settings.enabled ||
                dryRun ||
                ["quiet", "impersonate"].includes(type)
            ) {
                isRendering = false;
                return;
            }
            const isDynamicCall =
                typeof type === "string" &&
                (type.startsWith("dynamic") ||
                    type.startsWith("revert") ||
                    type.startsWith("persistent-type"));
            const charName = getCurrentCharName();
            if (
                !isDynamicCall &&
                type !== "test" &&
                (!charName || (!settings.streaming && isStreamingEnabled()))
            ) {
                isRendering = false;
                return;
            }
        }

        if (!isIndicatorPersisted && existingIndicator) {
            cleanupUnifiedIframe(existingIndicator);
            existingIndicator.remove();
        }

        const oldIndicator = document.getElementById("typing_indicator");
        if (oldIndicator) {
            $(oldIndicator).stop(true, true);
            cleanupUnifiedIframe(oldIndicator);
            oldIndicator.remove();
        }

        const avatarUrls = getAvatarUrls();
        const userName = getCurrentUserName();
        const charName = getCurrentCharName();

        const defaultIframePositions = [
            "floating_bottom",
            "chat_center",
            "draggable",
        ];
        const defaultIframeSizes = {
            floating_bottom: { width: "320px", height: "110px" },
            chat_center: { width: "350px", height: "120px" },
            draggable: { width: "320px", height: "110px" },
        };

        if (currentTheme.useIframe) {
            const supportedPositions = currentTheme.sizes
                ? Object.keys(currentTheme.sizes)
                : defaultIframePositions;
            if (!supportedPositions.includes(settings.position)) {
                const fallbackPos = supportedPositions[0] || "floating_bottom";
                console.warn(
                    `TypingIndicator: iframe 主题 "${currentTheme.name}" 不支持 "${settings.position}" 位置，已自动回退到 "${fallbackPos}"。`,
                );
                settings.position = fallbackPos;
            }
        }

        let typingIndicator = document.createElement("div");
        typingIndicator.id = "typing_indicator";
        typingIndicator.dataset.themeId = themeId;
        typingIndicator.classList.add("typing_indicator");

        if (!currentTheme.useIframe) {
            let preset =
                settings.textPresets.find((p) => p.id === presetId) ||
                settings.textPresets.find(
                    (p) => p.id === settings.selectedTextPresetId,
                ) ||
                settings.textPresets[0];

            if (!preset) {
                console.warn(
                    "[TI] CSS主题需要相应的预设设置，但当前配置中未找到任何适用的预设。",
                );
                isRendering = false;
                return;
            }

            const safeCharAvatarUrl = String(avatarUrls.char);
            const safeUserAvatarUrl = String(avatarUrls.user);

            let baseText = preset.text
                .replace(/\$\{name2\}/g, charName)
                .replace(/\{\{char\}\}/g, charName)
                .replace(/\{\{user\}\}/g, userName)
                .replace(/\{\{char_avatar_url\}\}/g, safeCharAvatarUrl)
                .replace(/\{\{user_avatar_url\}\}/g, safeUserAvatarUrl)
                .replace(
                    /\{\{char_avatar\}\}/g,
                    `<img class="typing-indicator-avatar" src="${safeCharAvatarUrl}" onerror="this.onerror=null; this.src='/img/ai4.png';">`,
                )
                .replace(
                    /\{\{user_avatar\}\}/g,
                    `<img class="typing-indicator-avatar" src="${safeUserAvatarUrl}" onerror="this.onerror=null; this.src='/img/user-default.png';">`,
                );

            const defsRegex = /<defs>([\s\S]*?)<\/defs>/i;
            const match = baseText.match(defsRegex);
            if (match && match[0]) {
                updateGlobalDefs({ name: "runtime-theme", text: match[0] });
                baseText = baseText.replace(match[0], "");
            }

            const svgAnimation = getAnimationHTML(settings.animationStyle);
            const htmlContent = `${baseText}${
                settings.showAnimation ? svgAnimation : ""
            }`;

            typingIndicator.innerHTML = `<span class="typing_indicator_text" style="font-family: inherit;">${htmlContent}</span>`;
        }

        const position = settings.position;
        let parentContainer;

        switch (position) {
            case "floating_bottom":
                typingIndicator.classList.add("typing_indicator_floating");
                const sendForm = document.getElementById("send_form");
                const memoryTable = document.getElementById(
                    "tableStatusContainer",
                );
                let bottomOffset = 5;
                if (sendForm) bottomOffset += sendForm.offsetHeight;
                if (
                    memoryTable &&
                    getComputedStyle(memoryTable).display !== "none"
                ) {
                    bottomOffset += memoryTable.offsetHeight;
                }
                bottomOffset += settings.floatingBottomOffset || 0;
                typingIndicator.style.bottom = `${bottomOffset}px`;
                typingIndicator.style.position = "fixed";
                parentContainer = document.body;
                break;
            case "chat_center":
                const chatEl = document.getElementById("chat");
                if (chatEl) {
                    const rect = chatEl.getBoundingClientRect();
                    typingIndicator.style.left = `${rect.left + rect.width / 2}px`;
                    typingIndicator.style.top = `${rect.top + rect.height / 2}px`;
                    typingIndicator.style.transform = "translate(-50%, -50%)";
                }
                typingIndicator.style.position = "fixed";
                parentContainer = document.body;
                break;
            case "draggable":
                typingIndicator.style.left = `${
                    (settings.customPosition.x / 100) * window.innerWidth
                }px`;
                typingIndicator.style.top = `${
                    (settings.customPosition.y / 100) * window.innerHeight
                }px`;
                typingIndicator.style.transform = "translate(-50%, -50%)";
                typingIndicator.style.position = "fixed";
                parentContainer = document.body;
                break;
            case "above_input":
            case "full_width_banner":
                parentContainer = document.getElementById("send_form");
                if (position === "full_width_banner") {
                    typingIndicator.classList.add(
                        "typing_indicator_full_width",
                    );
                }
                typingIndicator.style.position = "static";
                break;
            case "bottom":
            default:
                parentContainer = document.getElementById("chat");
                typingIndicator.style.position = "sticky";
                typingIndicator.style.bottom = "0";
                typingIndicator.style.alignSelf = "center";
                typingIndicator.style.zIndex = "10";
                break;
        }

        if (parentContainer) {
            if (
                position === "above_input" ||
                position === "full_width_banner"
            ) {
                parentContainer.parentNode.insertBefore(
                    typingIndicator,
                    parentContainer,
                );
            } else {
                parentContainer.appendChild(typingIndicator);
            }
        } else {
            document.body.appendChild(typingIndicator);
            console.warn("TypingIndicator: 找不到父容器，已附加到 body");
        }

        $(typingIndicator).hide();

        const chatElement = document.getElementById("chat");
        const wasChatScrolledDown =
            Math.ceil(chatElement.scrollTop + chatElement.clientHeight) >=
            chatElement.scrollHeight;

        $(typingIndicator).show();

        if (currentTheme.useIframe) {
            const themeSizes = currentTheme.sizes || defaultIframeSizes;
            const size = themeSizes[position];
            if (size) {
                typingIndicator.style.width = size.width || "auto";
                typingIndicator.style.height = size.height || "auto";
                if (size.maxWidth)
                    typingIndicator.style.maxWidth = size.maxWidth;
                if (size.maxHeight)
                    typingIndicator.style.maxHeight = size.maxHeight;
            }
            typingIndicator.style.resize = "none";
            typingIndicator.style.overflow = "hidden";
        }

        if (position === "draggable") {
            makeDraggable(typingIndicator, "indicator");
        }
        if (position === "bottom" && wasChatScrolledDown) {
            chatElement.scrollTop = chatElement.scrollHeight;
        }
        applyThemeToIndicator(currentTheme, typingIndicator);
        syncIndicatorInteractivity();
        isRendering = false;
    } catch (e) {
        console.error("[TI] showTypingIndicator 异常:", e);
        isRendering = false;
    }
}

async function hideTypingIndicator() {
    const settings = getSettings();
    if (
        isIndicatorPersisted ||
        isTestIndicatorActive ||
        (settings.enableDynamicThemes && dynamicThemeTimeoutId)
    ) {
        debugLog("[TI] 隐藏请求被跳过 (固定模式/测试中/动态停留中)。");
        return;
    }

    const typingIndicator = document.getElementById("typing_indicator");
    if (typingIndicator) {
        const iframe = typingIndicator.querySelector(".theme-iframe");
        if (iframe && iframe.contentWindow) {
            const isDevMode = settings.devMode === true;
            let startTime;

            if (isDevMode) {
                startTime = performance.now();
            }

            let messageListener;

            try {
                const themeResponsePromise = new Promise((resolve) => {
                    messageListener = (event) => {
                        if (
                            event.source === iframe.contentWindow &&
                            event.data?.source === "typing-indicator-theme" &&
                            event.data?.type === "graceful-shutdown-response"
                        ) {
                            resolve(event.data.data);
                        }
                    };
                    window.addEventListener("message", messageListener);
                });

                const themeId =
                    typingIndicator.dataset.themeId || settings.selectedThemeId;
                const shutdownTimeout = themeShutdownTimeouts[themeId] || 200;

                const timeoutPromise = new Promise((resolve) => {
                    setTimeout(
                        () => resolve({ timedOut: true }),
                        shutdownTimeout,
                    );
                });

                queuePostMessage(
                    iframe.contentWindow,
                    {
                        source: "typing-indicator-host",
                        type: "graceful-shutdown-request",
                    },
                    "*",
                );

                const result = await Promise.race([
                    themeResponsePromise,
                    timeoutPromise,
                ]);

                if (result && result.timedOut) {
                    if (shutdownTimeout > 200) {
                        debugWarn(
                            `[TI] 主题 "${themeId}" 优雅关闭超时（${shutdownTimeout}ms）`,
                        );
                    }
                } else {
                    if (isDevMode) {
                        const endTime = performance.now();
                        const duration = endTime - startTime;
                        console.log(
                            `%c[TypingIndicator DevMode]%c Theme "${themeId}" responded in %c${duration.toFixed(
                                2,
                            )}ms`,
                            "background: #3498db; color: #fff; padding: 2px 6px; border-radius: 3px;",
                            "background: transparent; color: inherit;",
                            "font-weight: bold;",
                        );
                    }

                    const themeDataToSave = result;
                    if (
                        themeDataToSave &&
                        Object.keys(themeDataToSave).length > 0
                    ) {
                        if (!settings.themeData) settings.themeData = {};
                        if (!settings.themeData[themeId])
                            settings.themeData[themeId] = {};
                        Object.assign(
                            settings.themeData[themeId],
                            themeDataToSave,
                        );
                        saveSettingsDebounced();
                        debugLog(
                            `[TI] 已保存主题 ${themeId} 的数据:`,
                            themeDataToSave,
                        );
                    }
                }
            } catch (error) {
                console.warn("[TI] 优雅关闭过程中出现异常:", error);
            } finally {
                if (messageListener) {
                    window.removeEventListener("message", messageListener);
                }
            }
        }

        cleanupUnifiedIframe(typingIndicator);
        $(typingIndicator).stop(true, true).hide();
        typingIndicator.remove();
    }
}

function showPlayer() {
    const settings = getSettings();
    if (!settings.playerEnabled) return;

    const existingPlayer = document.getElementById("music_player");
    if (existingPlayer) return;

    const playerThemes = settings.themes.filter(
        (t) => t.name.startsWith("播放器") || t.name.startsWith("Player"),
    );

    if (playerThemes.length === 0) {
        console.warn("[TI] 没有找到播放器主题");
        return;
    }

    const selectedTheme =
        playerThemes.find((t) => t.id === settings.selectedPlayerThemeId) ||
        playerThemes[0];

    if (!selectedTheme) {
        console.warn("[TI] 没有可用的播放器主题");
        return;
    }

    let musicPlayer = document.createElement("div");
    musicPlayer.id = "music_player";
    musicPlayer.classList.add("music_player_container", "iframe-theme");
    musicPlayer.dataset.themeId = selectedTheme.id;

    musicPlayer.style.left = `${
        (settings.playerPosition.x / 100) * window.innerWidth
    }px`;
    musicPlayer.style.top = `${
        (settings.playerPosition.y / 100) * window.innerHeight
    }px`;
    musicPlayer.style.transform = "translate(-50%, -50%)";
    musicPlayer.style.position = "fixed";
    musicPlayer.style.zIndex = "1000";

    const defaultSize = { width: "320px", height: "110px" };
    const themeSizes = selectedTheme.sizes || { draggable: defaultSize };
    const size =
        themeSizes.draggable || Object.values(themeSizes)[0] || defaultSize;

    musicPlayer.style.width = size.width || "auto";
    musicPlayer.style.height = size.height || "auto";
    if (size.maxWidth) musicPlayer.style.maxWidth = size.maxWidth;
    if (size.maxHeight) musicPlayer.style.maxHeight = size.maxHeight;
    musicPlayer.style.resize = "none";
    musicPlayer.style.overflow = "hidden";

    document.body.appendChild(musicPlayer);
    makeDraggable(musicPlayer, "player");
    applyThemeToIndicator(selectedTheme, musicPlayer);
    if (settings.playerHidden) {
        musicPlayer.style.setProperty("display", "none", "important");
    } else {
        musicPlayer.style.opacity = "0";
        musicPlayer.style.display = "block";
        $(musicPlayer).animate({ opacity: 1 }, 300);
    }

    if (settings.playerAutoHide && !settings.playerHidden) {
        setTimeout(() => setupPlayerAutoHide(), 400);
    }
}

// ==================== 悬浮歌词功能 ====================

function parseLRC(lrcText) {
    if (!lrcText || typeof lrcText !== "string") return [];

    const lines = [];
    const regex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/g;
    let match;

    while ((match = regex.exec(lrcText)) !== null) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const msStr = match[3];
        const ms = msStr
            ? msStr.length === 2
                ? parseInt(msStr) * 10
                : parseInt(msStr)
            : 0;
        const time = minutes * 60 + seconds + ms / 1000;
        const text = match[4].trim();
        if (text) {
            const inlineTrans = text.match(
                /^(.+?)\s*[（(]([\u4e00-\u9fa5][^()（）]*)[）)]\s*$/,
            );
            if (inlineTrans) {
                lines.push({
                    time,
                    text: inlineTrans[1].trim(),
                    translated: inlineTrans[2].trim(),
                });
            } else {
                lines.push({ time, text });
            }
        }
    }

    return lines.sort((a, b) => a.time - b.time);
}

async function fetchLyrics(lyricsUrl) {
    if (!lyricsUrl) return null;
    try {
        const response = await fetch(lyricsUrl);
        if (!response.ok) return null;
        const text = await response.text();
        return parseLRC(text);
    } catch (error) {
        console.error("[Player][歌词] 获取歌词失败:", error);
        return null;
    }
}

function createLyricsOverlay() {
    if (lyricsOverlayElement) return lyricsOverlayElement;

    const settings = getSettings();
    const overlay = document.createElement("div");
    overlay.id = "floating_lyrics";
    overlay.innerHTML = `
        <div class="lyrics-line lyrics-current"><span class="lyrics-line-inner"></span></div>
        <div class="lyrics-line lyrics-next"><span class="lyrics-line-inner"></span></div>
    `;

    applyLyricsStyles(overlay);

    document.body.appendChild(overlay);
    lyricsOverlayElement = overlay;

    overlay.style.left = `${
        (settings.lyricsPosition.x / 100) * window.innerWidth
    }px`;
    overlay.style.top = `${
        (settings.lyricsPosition.y / 100) * window.innerHeight
    }px`;
    overlay.style.transform = "translate(-50%, -50%)";

    if (!settings.lyricsPosition.locked) {
        makeDraggable(overlay, "lyrics");
    }

    return overlay;
}

function applyLyricsStyles(overlay) {
    const settings = getSettings();
    const showTranslation = shouldShowTranslation();
    const pointerEvents = settings.lyricsPosition.locked ? "none" : "auto";
    const tavernFont =
        getComputedStyle(document.body).fontFamily ||
        '"Microsoft YaHei", "PingFang SC", sans-serif';

    overlay.style.cssText = `
        position: fixed;
        z-index: 1002;
        padding: 3px 10px;
        border-radius: 6px;
        text-align: center;
        font-family: ${tavernFont};
        pointer-events: ${pointerEvents};
        user-select: none;
        width: 350px;
        max-width: 80vw;
        background: ${settings.lyricsBackground};
        transition: opacity 0.3s ease;
        overflow: hidden;
        text-shadow: none !important;
    `;

    const currentLine = overlay.querySelector(".lyrics-current");
    const nextLine = overlay.querySelector(".lyrics-next");

    if (currentLine) {
        currentLine.style.cssText = `
            font-size: ${settings.lyricsFontSize}px;
            font-weight: bold;
            margin-bottom: ${showTranslation ? "3px" : "0"};
            min-height: ${settings.lyricsFontSize + 4}px;
            white-space: nowrap;
            overflow: hidden;
            text-shadow: none !important;
        `;
    }

    if (nextLine) {
        nextLine.style.cssText = `
            font-size: ${settings.lyricsFontSize - 4}px;
            color: ${settings.lyricsUnsungColor};
            opacity: 0.6;
            min-height: ${showTranslation ? settings.lyricsFontSize + "px" : "0"};
            display: ${showTranslation ? "block" : "none"};
            white-space: nowrap;
            overflow: hidden;
            text-shadow: none !important;
        `;
    }

    let styleEl = document.getElementById("ti-lyrics-scroll-style");
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "ti-lyrics-scroll-style";
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
        @keyframes lyrics-scroll {
            0% { transform: translateX(0); }
            10% { transform: translateX(0); }
            90% { transform: translateX(var(--scroll-distance)); }
            100% { transform: translateX(var(--scroll-distance)); }
        }
        .lyrics-line-inner {
            display: inline-block;
            text-shadow: none !important;
        }
        .lyrics-line-inner.scrolling {
            padding-right: 20px;
            animation: lyrics-scroll var(--scroll-duration) linear infinite;
        }
        #floating_lyrics, #floating_lyrics * {
            text-shadow: none !important;
        }
    `;
}

function showLyricsOverlay() {
    const settings = getSettings();
    if (!settings.lyricsEnabled) return;

    if (!lyricsOverlayElement) {
        createLyricsOverlay();
    }

    lyricsOverlayElement.style.display = "block";
    lyricsOverlayElement.style.opacity = "1";
}

function hideLyricsOverlay() {
    if (lyricsOverlayElement) {
        lyricsOverlayElement.style.opacity = "0";
        setTimeout(() => {
            if (lyricsOverlayElement) {
                lyricsOverlayElement.style.display = "none";
            }
        }, 300);
    }
}

function removeLyricsOverlay() {
    if (lyricsOverlayElement) {
        lyricsOverlayElement.remove();
        lyricsOverlayElement = null;
    }
    currentLyrics = [];
    currentLyricIndex = -1;
}

async function loadLyricsForTrack(track) {
    currentLyrics = [];
    currentLyricIndex = -1;

    if (!track) {
        hideLyricsOverlay();
        return;
    }

    const lyricsUrl = track.lyricsUrl || track.lrc;
    if (!lyricsUrl) {
        verboseLog("[Player][歌词] 当前歌曲没有歌词URL");
        hideLyricsOverlay();
        return;
    }

    debugLog("[Player][歌词] 正在加载:", lyricsUrl);
    const lyrics = await fetchLyrics(lyricsUrl);

    if (lyrics && lyrics.length > 0) {
        currentLyrics = lyrics;
        currentLyricIndex = -1;
        showLyricsOverlay();
        debugLog(`[Player][歌词] ✓ 成功加载 ${lyrics.length} 行`);
    } else {
        debugLog("[Player][歌词] 加载失败或为空");
        hideLyricsOverlay();
    }
}

let lastLyricsUpdateTime = 0;
let lastLyricsProgress = -1;

function updateLyricsDisplay(currentTime) {
    if (document.hidden) return;

    const settings = getSettings();
    if (
        !settings.lyricsEnabled ||
        !lyricsOverlayElement ||
        currentLyrics.length === 0
    ) {
        return;
    }
    const now = performance.now();
    if (now - lastLyricsUpdateTime < 100) {
        return;
    }
    lastLyricsUpdateTime = now;

    let newIndex = -1;
    for (let i = currentLyrics.length - 1; i >= 0; i--) {
        if (currentTime >= currentLyrics[i].time) {
            newIndex = i;
            break;
        }
    }

    const currentLineEl = lyricsOverlayElement.querySelector(".lyrics-current");
    const nextLineEl = lyricsOverlayElement.querySelector(".lyrics-next");
    const currentInner = currentLineEl?.querySelector(".lyrics-line-inner");
    const nextInner = nextLineEl?.querySelector(".lyrics-line-inner");

    if (!currentInner) return;
    const updateScrollEffect = (innerEl, containerEl, text) => {
        if (!innerEl || !containerEl) return;
        innerEl.classList.remove("scrolling");
        innerEl.textContent = text;
        requestAnimationFrame(() => {
            const textWidth = innerEl.scrollWidth;
            const containerWidth = containerEl.clientWidth;

            if (textWidth > containerWidth) {
                const scrollDistance = textWidth - containerWidth + 30;
                const scrollDuration = Math.max(3, text.length * 0.2);

                innerEl.style.setProperty(
                    "--scroll-distance",
                    `-${scrollDistance}px`,
                );
                innerEl.style.setProperty(
                    "--scroll-duration",
                    `${scrollDuration}s`,
                );
                innerEl.classList.add("scrolling");
            }
        });
    };

    if (newIndex >= 0 && newIndex < currentLyrics.length) {
        const currentLyric = currentLyrics[newIndex];
        const nextLyric = currentLyrics[newIndex + 1];
        const nextTime = nextLyric ? nextLyric.time : currentLyric.time + 5;
        const lineDuration = nextTime - currentLyric.time;
        const elapsed = currentTime - currentLyric.time;

        const textLength = currentLyric.text.length || 1;
        const timePerChar = lineDuration / textLength;
        const charsCompleted = Math.floor(elapsed / timePerChar);
        const charProgress = (elapsed % timePerChar) / timePerChar;

        const baseProgress = (charsCompleted / textLength) * 100;
        const currentCharProgress = (charProgress / textLength) * 100;
        let lineProgress = Math.min(
            100,
            Math.max(0, baseProgress + currentCharProgress),
        );
        lineProgress = Math.min(100, lineProgress * 1.25);
        if (newIndex !== currentLyricIndex) {
            updateScrollEffect(currentInner, currentLineEl, currentLyric.text);
            if (nextInner && shouldShowTranslation()) {
                const translatedText = currentLyric.translated || "";
                updateScrollEffect(nextInner, nextLineEl, translatedText);
            }

            currentLyricIndex = newIndex;
        }

        const roundedProgress = Math.round(lineProgress);
        if (roundedProgress !== lastLyricsProgress) {
            lastLyricsProgress = roundedProgress;
            currentInner.style.background = `linear-gradient(to right,
        ${settings.lyricsSungColor} 0%,
        ${settings.lyricsSungColor} ${roundedProgress}%,
        ${settings.lyricsUnsungColor} ${roundedProgress}%,
        ${settings.lyricsUnsungColor} 100%)`;
            currentInner.style.webkitBackgroundClip = "text";
            currentInner.style.backgroundClip = "text";
            currentInner.style.webkitTextFillColor = "transparent";
            currentInner.style.color = "transparent";
        }
    } else {
        currentInner.classList.remove("scrolling");
        currentInner.style.background = "none";
        currentInner.style.webkitBackgroundClip = "initial";
        currentInner.style.backgroundClip = "initial";
        currentInner.style.webkitTextFillColor = settings.lyricsUnsungColor;
        currentInner.style.color = settings.lyricsUnsungColor;
        currentInner.textContent = currentLyrics[0]?.text || "♪ ♪ ♪";
        lastLyricsProgress = -1;

        if (nextInner) {
            nextInner.classList.remove("scrolling");
            nextInner.textContent = currentLyrics[0]?.translated || "";
        }
    }
}

function shouldShowTranslation() {
    const settings = getSettings();
    if (_autoShowTranslationFlag !== null) {
        return _autoShowTranslationFlag;
    }
    return settings.lyricsShowNextLine;
}

function refreshLyricsOverlay() {
    if (!lyricsOverlayElement) return;
    applyLyricsStyles(lyricsOverlayElement);

    const settings = getSettings();
    lyricsOverlayElement.style.left = `${
        (settings.lyricsPosition.x / 100) * window.innerWidth
    }px`;
    lyricsOverlayElement.style.top = `${
        (settings.lyricsPosition.y / 100) * window.innerHeight
    }px`;
    lyricsOverlayElement.style.transform = "translate(-50%, -50%)";

    const oldHandle = lyricsOverlayElement.querySelector(".lyrics-drag-handle");
    if (oldHandle) oldHandle.remove();

    if (!settings.lyricsPosition.locked) {
        makeDraggable(lyricsOverlayElement, "lyrics");
    } else {
        lyricsOverlayElement.style.cursor = "default";
    }

    const currentInner = lyricsOverlayElement.querySelector(
        ".lyrics-current .lyrics-line-inner",
    );
    const nextLine = lyricsOverlayElement.querySelector(".lyrics-next");

    if (currentInner) {
        if (currentLyrics.length > 0 && currentLyricIndex >= 0) {
            const currentProgress =
                lastLyricsProgress >= 0 ? lastLyricsProgress : 0;
            currentInner.style.background = `linear-gradient(to right,
                ${settings.lyricsSungColor} 0%,
                ${settings.lyricsSungColor} ${currentProgress}%,
                ${settings.lyricsUnsungColor} ${currentProgress}%,
                ${settings.lyricsUnsungColor} 100%)`;
            currentInner.style.webkitBackgroundClip = "text";
            currentInner.style.backgroundClip = "text";
            currentInner.style.webkitTextFillColor = "transparent";
            currentInner.style.color = "transparent";
        } else {
            currentInner.style.background = "none";
            currentInner.style.webkitBackgroundClip = "initial";
            currentInner.style.backgroundClip = "initial";
            currentInner.style.webkitTextFillColor = settings.lyricsUnsungColor;
            currentInner.style.color = settings.lyricsUnsungColor;
        }
    }

    if (nextLine) {
        nextLine.style.color = settings.lyricsUnsungColor;
    }
}

// ========== 听歌时长统计函数 ==========
function settleListeningTime(reason = "unknown") {
    if (!listeningSession.isPlaying || !listeningSession.startTime) return;

    const duration = Date.now() - listeningSession.startTime;
    const charAvatar = listeningSession.charAvatar;

    if (charAvatar && duration > 1000) {
        const settings = getSettings();
        if (!settings.listeningStats) settings.listeningStats = {};
        if (!settings.listeningStats[charAvatar]) {
            settings.listeningStats[charAvatar] = {
                totalTime: 0,
                sessions: 0,
                lastPlayed: "",
            };
        }
        settings.listeningStats[charAvatar].totalTime += duration;
        settings.listeningStats[charAvatar].sessions += 1;
        settings.listeningStats[charAvatar].lastPlayed =
            new Date().toISOString();
        saveSettingsDebounced();
        debugLog(
            `[Player][统计] ${reason}: +${Math.round(duration / 1000)}秒 → ${charAvatar}`,
        );
    }
    listeningSession.startTime = null;
}

function startListeningSession() {
    if (listeningSession.isPlaying && listeningSession.startTime) {
        settleListeningTime("new_session");
    }
    listeningSession = {
        charAvatar: characters[this_chid]?.avatar || null,
        startTime: Date.now(),
        isPlaying: true,
    };
}

function formatListeningTime(ms) {
    if (!ms || ms < 0) return t`0 minutes`;
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
        const hoursText = t`${hours} hours`;
        const minutesText = t`${minutes} minutes`;
        return `${hoursText} ${minutesText}`;
    } else if (minutes > 0) {
        return t`${minutes} minutes`;
    } else {
        return t`${totalSeconds} seconds`;
    }
}

function startStatsUpdateTimer() {
    stopStatsUpdateTimer();
    listeningStatsUpdateTimer = setInterval(() => {
        if (listeningStatsUpdateCallback) {
            listeningStatsUpdateCallback();
        }
    }, 1000);
}

function stopStatsUpdateTimer() {
    if (listeningStatsUpdateTimer) {
        clearInterval(listeningStatsUpdateTimer);
        listeningStatsUpdateTimer = null;
    }
}

function getCurrentCharStats() {
    if (this_chid === undefined || !characters[this_chid]) return null;
    const charAvatar = characters[this_chid].avatar;
    const settings = getSettings();
    const stats = settings.listeningStats?.[charAvatar];
    return {
        charName: characters[this_chid].name,
        charAvatar: charAvatar,
        totalTime: stats?.totalTime || 0,
        sessions: stats?.sessions || 0,
        lastPlayed: stats?.lastPlayed || null,
    };
}

function applyPlayerAutoHideState() {
    const player = document.getElementById("music_player");
    if (!player) return;
    const settings = getSettings();
    if (settings.playerHidden) return;

    if (playerAutoHideVisible) {
        player.style.visibility = "";
        player.style.pointerEvents = "";
        $(player).stop(true).animate({ opacity: 1 }, 200);
    } else {
        $(player)
            .stop(true)
            .animate({ opacity: 0 }, 150, function () {
                if (!playerAutoHideVisible) {
                    player.style.visibility = "hidden";
                    player.style.pointerEvents = "none";
                }
            });
    }
}

function togglePlayerAutoHide() {
    const player = document.getElementById("music_player");
    if (!player) return;
    playerAutoHideVisible = !playerAutoHideVisible;
    applyPlayerAutoHideState();
}

function setupPlayerAutoHide() {
    if (playerAutoHideHandlers) return;

    const chatEl = document.getElementById("chat");
    if (!chatEl) return;
    playerAutoHideVisible = false;
    applyPlayerAutoHideState();

    let touchStartY = 0;
    let touchMoved = false;
    let ahTouchHandled = false;
    let lastToggleTime = 0;
    const skipTarget = (target) => {
        const $target = $(target);
        if (
            $target.is(
                "a, button, input, textarea, select, label, video, audio, iframe",
            ) ||
            $target.is(
                "[onclick], [contenteditable], [role='button'], [tabindex]:not([tabindex='-1'])",
            )
        ) {
            return true;
        }
        if (
            $target.closest(
                ".mes_buttons, .swipe_left, .swipe_right, .mes_edit_buttons, " +
                    "#music_player, #floating_lyrics, " +
                    ".music-bubble-from-regex, " +
                    ".qr--button, .qr--buttons",
            ).length
        ) {
            return true;
        }
        if ($target.is("summary") || $target.closest("summary").length) {
            return true;
        }
        if (
            $target.is(".reasoning-toggle-btn") ||
            $target.closest(".reasoning-toggle-btn").length
        ) {
            return true;
        }
        if (
            $target.is(".inline-drawer-toggle, .inline-drawer-header") ||
            $target.closest(".inline-drawer-toggle, .inline-drawer-header")
                .length
        ) {
            return true;
        }
        return false;
    };

    const touchStart = (e) => {
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
    };

    const touchMove = () => {
        touchMoved = true;
    };

    const touchEnd = (e) => {
        if (touchMoved) return;
        if (skipTarget(e.target)) return;
        if (Date.now() - lastToggleTime < 350) return;
        ahTouchHandled = true;
        setTimeout(() => {
            ahTouchHandled = false;
        }, 350);
        lastToggleTime = Date.now();
        togglePlayerAutoHide();
    };

    const chatClick = (e) => {
        if (Date.now() - lastToggleTime < 350) return;
        if (ahTouchHandled) return;
        if (skipTarget(e.target)) return;
        lastToggleTime = Date.now();
        togglePlayerAutoHide();
    };

    const docClick = (e) => {
        if (Date.now() - lastToggleTime < 350) return;
        const $target = $(e.target);
        if (
            $target.closest(
                "#music_player, #floating_lyrics, #chat, #send_form, #form_sheld, " +
                    "dialog[open], .popup, #shadow_popup, " +
                    ".ih-folder-dropdown-portal, .ih-dialog-overlay, " +
                    ".input-helper-settings, #extensions_settings, #extensions_settings2, " +
                    ".ih-find-bar, .ih-floating-ball, .ih-floating-panel, " +
                    ".music-bubble-from-regex, .drawer-content",
            ).length
        ) {
            return;
        }
        if (skipTarget(e.target)) return;
        lastToggleTime = Date.now();
        togglePlayerAutoHide();
    };

    chatEl.addEventListener("touchstart", touchStart, { passive: true });
    chatEl.addEventListener("touchmove", touchMove, { passive: true });
    chatEl.addEventListener("touchend", touchEnd, { passive: true });
    chatEl.addEventListener("click", chatClick);
    document.addEventListener("click", docClick, true);

    playerAutoHideHandlers = {
        chatEl,
        touchStart,
        touchMove,
        touchEnd,
        chatClick,
        docClick,
    };
}

function removePlayerAutoHide() {
    if (!playerAutoHideHandlers) return;
    const h = playerAutoHideHandlers;
    if (h.chatEl) {
        h.chatEl.removeEventListener("touchstart", h.touchStart);
        h.chatEl.removeEventListener("touchmove", h.touchMove);
        h.chatEl.removeEventListener("touchend", h.touchEnd);
        h.chatEl.removeEventListener("click", h.chatClick);
    }
    document.removeEventListener("click", h.docClick, true);
    playerAutoHideHandlers = null;
    playerAutoHideVisible = true;
    const player = document.getElementById("music_player");
    if (player) {
        player.style.visibility = "";
        player.style.pointerEvents = "";
        player.style.opacity = "";
    }
}

function hidePlayer() {
    removePlayerAutoHide();
    settleListeningTime("player_closed");
    listeningSession.isPlaying = false;
    stopStatsUpdateTimer();
    const musicPlayer = document.getElementById("music_player");
    if (musicPlayer) {
        cleanupUnifiedIframe(musicPlayer);
        $(musicPlayer).stop(true, true).hide();
        musicPlayer.remove();
    }
    removeLyricsOverlay();
}

function reloadPlayer() {
    isPlayerInitialized = false;
    isPlaylistReady = false;
    lastSentPlaylist = null;

    const musicPlayer = document.getElementById("music_player");
    if (musicPlayer) {
        cleanupUnifiedIframe(musicPlayer);
        musicPlayer.remove();
    }
    showPlayer();

    const waitForInit = () =>
        new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (isPlayerInitialized) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
            }, 3000);
        });

    waitForInit().then(async () => {
        await buildAndSetInitialPlaylist();
        isPlaylistReady = true;
    });
}

// ==================== 刷新和更新功能 ====================

function requestSettingsRender(preserveDrawerState = true) {
    if (lyricsTestInterval) {
        clearInterval(lyricsTestInterval);
        lyricsTestInterval = null;
        if (savedTestLyrics !== null) {
            currentLyrics = savedTestLyrics;
            currentLyricIndex = savedTestLyricIndex;
            savedTestLyrics = null;
            savedTestLyricIndex = -1;
        }
    }
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(() => {
        const allPanels = document.querySelectorAll(
            "#typing_indicator_settings",
        );
        if (allPanels.length > 1) {
            allPanels.forEach((panel, index) => {
                if (index > 0) panel.remove();
            });
        }

        const oldSection = document.getElementById("typing_indicator_settings");
        let wasOpen = false;

        if (oldSection) {
            const activeTab = oldSection.querySelector(".tab-button.active");
            if (activeTab) {
                currentActiveTab = activeTab.dataset.tab;
            }
            wasOpen =
                preserveDrawerState &&
                oldSection.querySelector(".inline-drawer-content").style
                    .display !== "none";
            oldSection.remove();
        }

        const renderFn = addExtensionSettings();
        renderFn(wasOpen);
    }, 50);
}

function replaceIndicator(source = "unknown") {
    debugLog(`[TI] 执行原子化替换操作。来源: ${source}`);
    const oldIndicator = document.getElementById("typing_indicator");

    if (oldIndicator) {
        cleanupUnifiedIframe(oldIndicator);
        oldIndicator.remove();
    }
    showTypingIndicator(`persistent-replace-${source}`);
}

async function handlePersistentModeUpdate(source) {
    const indicator = document.getElementById("typing_indicator");
    const settings = getSettings();

    if (!indicator) {
        if (
            settings.persistentMode &&
            (this_chid !== undefined || selected_group)
        ) {
            debugLog(`[TI] 无指示器，正在创建。来源: ${source}`);
            showTypingIndicator(`persistent-init-${source}`);
        }
        return;
    }

    const runningThemeId = indicator.dataset.themeId;
    const runningTheme = runningThemeId
        ? settings.themes.find((t) => t.id === runningThemeId)
        : null;
    const isRunningStateful =
        runningTheme &&
        (statefulThemes.has(runningThemeId) ||
            runningTheme.name.startsWith("播放器") ||
            runningTheme.name.startsWith("Player"));

    if (isRunningStateful) {
        debugLog(
            `[TI] State-Lock: 锁定有状态主题 "${runningTheme.name}"。来源: ${source}. 只更新内容。`,
        );
        const iframe = indicator.querySelector(".theme-iframe");
        if (iframe && iframe.contentWindow) {
            if (
                runningTheme.name.startsWith("播放器") ||
                runningTheme.name.startsWith("Player")
            ) {
                const newPlaylist = await getBgmPlaylistAsync();
                queuePostMessage(
                    iframe.contentWindow,
                    {
                        source: "typing-indicator-host",
                        type: "update-playlist",
                        data: newPlaylist,
                    },
                    "*",
                );
            } else {
                const context = getCurrentCharContext();
                queuePostMessage(
                    iframe.contentWindow,
                    {
                        source: "typing-indicator-host",
                        type: "context-update",
                        data: context,
                    },
                    "*",
                );
            }
        } else {
            console.warn(
                `[TI] 尝试更新有状态主题内容时，iframe或contentWindow未就绪。Source: ${source}`,
            );
        }
        return;
    }

    debugLog(
        `[TI] State-Lock Disengaged: 当前运行的是无状态主题，将根据新环境更新。Source: ${source}`,
    );
    const newConfig = getActiveThemeConfig();

    if (indicator.dataset.themeId === newConfig.themeId) {
        debugLog(`[TI] 新旧主题ID相同 (${newConfig.themeId})，仅刷新内容。`);
        refreshIndicatorContent(indicator);
    } else {
        replaceIndicator(source);
    }
}

function refreshLiveIndicators(source = "unknown") {
    debugLog(`[TI] 刷新请求来源: ${source}`);
    const indicator = document.getElementById("typing_indicator");

    const previewArea = document.getElementById("theme_preview_area");
    if (previewArea && previewArea.querySelector(".typing_indicator")) {
        const previewButton = document.getElementById("preview_theme");
        if (previewButton) {
            previewButton.click();
        }
    }

    const settings = getSettings();
    if (settings.persistentMode && indicator) {
        if (isStatefulThemeLocked) {
            debugLog("[TI] 刷新被全局锁阻止。有状态主题不允许被替换式刷新。");
            handlePersistentModeUpdate(
                `refresh_content_only_for_stateful`,
            ).catch((err) =>
                console.error("[TI] persistentModeUpdate (refresh) 失败:", err),
            );
            return;
        }

        const newConfig = getActiveThemeConfig();

        if (handleCrossTypeSwitch(newConfig.themeId, `refresh-${source}`)) {
            return;
        }

        debugLog("[TI] 同类型刷新，执行fade替换");
        $(indicator).stop(true, true);
        cleanupUnifiedIframe(indicator);
        indicator.remove();
        showTypingIndicator("persistent-refresh");
    }
}

function refreshIndicatorContent(indicator) {
    const { themeId, presetId } = getActiveThemeConfig();
    const settings = getSettings();
    const theme = settings.themes.find((t) => t.id === themeId);
    if (!theme) return;

    indicator.removeAttribute("style");

    indicator.classList.remove(
        "iframe-theme",
        "typing_indicator_floating",
        "typing_indicator_full_width",
    );

    indicator.dataset.themeId = themeId;

    const positionStyles = {
        floating_bottom: () => {
            indicator.classList.add("typing_indicator_floating");
            const sendForm = document.getElementById("send_form");
            const memoryTable = document.getElementById("tableStatusContainer");
            let bottomOffset = 5;
            if (sendForm) bottomOffset += sendForm.offsetHeight;
            if (
                memoryTable &&
                getComputedStyle(memoryTable).display !== "none"
            ) {
                bottomOffset += memoryTable.offsetHeight;
            }
            bottomOffset += settings.floatingBottomOffset || 0;
            indicator.style.bottom = `${bottomOffset}px`;
            indicator.style.position = "fixed";
        },
        chat_center: () => {
            const chatEl = document.getElementById("chat");
            if (chatEl) {
                const rect = chatEl.getBoundingClientRect();
                indicator.style.left = `${rect.left + rect.width / 2}px`;
                indicator.style.top = `${rect.top + rect.height / 2}px`;
                indicator.style.transform = "translate(-50%, -50%)";
            }
            indicator.style.position = "fixed";
        },
        draggable: () => {
            indicator.style.left = `${
                (settings.customPosition.x / 100) * window.innerWidth
            }px`;
            indicator.style.top = `${
                (settings.customPosition.y / 100) * window.innerHeight
            }px`;
            indicator.style.transform = "translate(-50%, -50%)";
            indicator.style.position = "fixed";
        },
        above_input: () => {
            indicator.style.position = "static";
        },
        full_width_banner: () => {
            indicator.classList.add("typing_indicator_full_width");
            indicator.style.position = "static";
        },
        bottom: () => {
            indicator.style.position = "static";
        },
    };

    const positionHandler = positionStyles[settings.position];
    if (positionHandler) positionHandler();

    if (theme.useIframe) {
        const defaultIframeSizes = {
            floating_bottom: { width: "320px", height: "110px" },
            chat_center: { width: "350px", height: "120px" },
            draggable: { width: "320px", height: "110px" },
        };
        const themeSizes = theme.sizes || defaultIframeSizes;
        const size =
            themeSizes[settings.position] || Object.values(themeSizes)[0];
        if (size) {
            indicator.style.width = size.width || "auto";
            indicator.style.height = size.height || "auto";
            if (size.maxWidth) indicator.style.maxWidth = size.maxWidth;
            if (size.maxHeight) indicator.style.maxHeight = size.maxHeight;
            indicator.style.resize = "none";
            indicator.style.overflow = "hidden";
        }
    }

    cleanupUnifiedIframe(indicator);

    if (theme.useIframe) {
        indicator.innerHTML = "";
        applyThemeToIndicator(theme, indicator);
    } else {
        const preset =
            settings.textPresets.find((p) => p.id === presetId) ||
            settings.textPresets[0];
        const charName = getCurrentCharName();
        const userName = getCurrentUserName();
        const avatarUrls = getAvatarUrls();

        let baseText = preset.text
            .replace(/\$\{name2\}/g, charName)
            .replace(/\{\{char\}\}/g, charName)
            .replace(/\{\{user\}\}/g, userName)
            .replace(/\{\{char_avatar_url\}\}/g, avatarUrls.char)
            .replace(/\{\{user_avatar_url\}\}/g, avatarUrls.user)
            .replace(
                /\{\{char_avatar\}\}/g,
                `<img class="typing-indicator-avatar" src="${avatarUrls.char}">`,
            )
            .replace(
                /\{\{user_avatar\}\}/g,
                `<img class="typing-indicator-avatar" src="${avatarUrls.user}">`,
            );

        const svgAnimation = getAnimationHTML(settings.animationStyle);
        const htmlContent = `${baseText}${
            settings.showAnimation ? svgAnimation : ""
        }`;
        indicator.innerHTML = `<span class="typing_indicator_text" style="font-family: inherit;">${htmlContent}</span>`;
    }
    indicator.dataset.overlayMode = indicator.dataset.overlayMode || "0";
    syncIndicatorInteractivity();
}

// ==================== 动态主题处理 ====================
function handleCrossTypeSwitch(newThemeId, source) {
    const settings = getSettings();
    const indicator = document.getElementById("typing_indicator");
    if (!indicator) return false;

    const oldThemeId = indicator.dataset.themeId;
    const oldTheme = oldThemeId
        ? settings.themes.find((t) => t.id === oldThemeId)
        : null;
    const newTheme = settings.themes.find((t) => t.id === newThemeId);

    if (!oldTheme || !newTheme) return false;
    if (oldTheme.useIframe === newTheme.useIframe) return false;

    debugLog(
        `[TI] 跨类型切换: ${oldTheme.useIframe ? "iframe" : "CSS"} → ${newTheme.useIframe ? "iframe" : "CSS"}, 来源: ${source}`,
    );

    applyTheme(newThemeId);
    currentlyAppliedConfig = {
        themeId: newThemeId,
        presetId: getActiveThemeConfig().presetId,
    };

    cleanupUnifiedIframe(indicator);
    indicator.remove();

    isRendering = false;
    showTypingIndicator(
        `cross-type-${source}`,
        undefined,
        undefined,
        newThemeId,
    );

    return true;
}

function revertDynamicTheme(source = "unknown") {
    if (!currentDynamicThemeId) return;

    debugLog(`[TI] 回退动态主题，来源: ${source}`);
    const revertingFromThemeId = currentDynamicThemeId;
    currentDynamicThemeId = null;
    currentDynamicPresetId = null;

    const settings = getSettings();

    if (dynamicPrevLock !== null) {
        settings.customPosition.locked = dynamicPrevLock;
        saveSettingsDebounced();
        const lockCb = document.querySelector("#ti_position_locked");
        if (lockCb) lockCb.checked = dynamicPrevLock;
        dynamicPrevLock = null;
    }

    if (revertingFromThemeId && statefulThemes.has(revertingFromThemeId)) {
        isStatefulThemeLocked = false;
        debugLog(`[TI] 回退：解锁 ${revertingFromThemeId}`);
    }

    if (settings.persistentMode) {
        const newConfig = getActiveThemeConfig();

        if (handleCrossTypeSwitch(newConfig.themeId, `revert-${source}`)) {
            return;
        }

        if (newConfig.themeId !== currentlyAppliedConfig.themeId) {
            applyTheme(newConfig.themeId);
            currentlyAppliedConfig = newConfig;
        }

        const indicator = document.getElementById("typing_indicator");
        if (indicator) {
            refreshIndicatorContent(indicator);
        }
    } else {
        hideTypingIndicator();
    }
}

function applyDynamicTheme(themeName) {
    const settings = getSettings();
    const matchedTheme = settings.themes.find((t) => t.name === themeName);
    if (!matchedTheme) return;
    if (currentDynamicThemeId === matchedTheme.id) return;

    const needLock =
        settings.position === "draggable" && !settings.customPosition.locked;

    if (needLock) {
        if (dynamicPrevLock === null) {
            dynamicPrevLock = settings.customPosition.locked;
        }
        settings.customPosition.locked = true;
        saveSettingsDebounced();
        const lockCb = document.querySelector("#ti_position_locked");
        if (lockCb) lockCb.checked = true;
    }

    const indicator = document.getElementById("typing_indicator");
    const oldThemeId = indicator?.dataset.themeId;

    if (oldThemeId && statefulThemes.has(oldThemeId)) {
        isStatefulThemeLocked = false;
    }

    currentDynamicThemeId = matchedTheme.id;
    currentDynamicPresetId = null;

    if (!matchedTheme.useIframe) {
        const baseName = matchedTheme.name
            .replace(/-美化$|-Style$/i, "")
            .trim();
        const matchedPreset = settings.textPresets.find(
            (p) => p.name === baseName,
        );
        if (matchedPreset) currentDynamicPresetId = matchedPreset.id;
    }

    if (indicator && handleCrossTypeSwitch(matchedTheme.id, "dynamic-apply")) {
        syncIndicatorInteractivity();
        return;
    }

    applyTheme(matchedTheme.id);
    currentlyAppliedConfig = {
        themeId: matchedTheme.id,
        presetId: currentDynamicPresetId || settings.selectedTextPresetId,
    };

    if (indicator) {
        refreshIndicatorContent(indicator);
    }
    syncIndicatorInteractivity();
}

function processMessageForTheme(messageId) {
    const settings = getSettings();
    if (!settings.enabled || !settings.enableDynamicThemes) return false;
    const message = chat[messageId];
    if (message && message.mes) {
        const themeName = parseThemeFromText(message.mes);
        if (themeName) {
            applyDynamicTheme(themeName);
            if (
                !document.getElementById("typing_indicator") &&
                !settings.persistentMode
            ) {
                showTypingIndicator("dynamic-post-process");
            }
            return true;
        }
    }
    return false;
}

// ==================== 主界面主题跟随 ====================

let _lastSeenMainTheme = null;
function handleMainThemeChange() {
    const settings = getSettings();
    if (!settings.autoFollowTheme) {
        return;
    }

    let mainThemeName;
    try {
        mainThemeName = power_user.theme;
    } catch (error) {
        console.warn("[TI] Could not read power_user.theme:", error);
        return;
    }

    if (!mainThemeName) {
        return;
    }

    if (_lastSeenMainTheme === mainThemeName) {
        return;
    }
    _lastSeenMainTheme = mainThemeName;

    const themeBaseName = mainThemeName;
    let switched = false;

    const findThemeByBaseName = (baseName) => {
        const themes = settings.themes;
        const iframeMatch = themes.find(
            (t) => t.name.startsWith(baseName) && t.useIframe,
        );
        if (iframeMatch) return iframeMatch;
        return themes.find((t) => t.name.startsWith(baseName) && !t.useIframe);
    };

    const matchedTheme = findThemeByBaseName(themeBaseName);
    if (matchedTheme && settings.selectedThemeId !== matchedTheme.id) {
        settings.selectedThemeId = matchedTheme.id;
        switched = true;
    }

    const matchedPreset = settings.textPresets.find((p) =>
        p.name.startsWith(themeBaseName),
    );
    if (matchedPreset && settings.selectedTextPresetId !== matchedPreset.id) {
        settings.selectedTextPresetId = matchedPreset.id;
        switched = true;
    }

    if (switched) {
        saveSettingsDebounced();
        requestSettingsRender();
        toastr.info(
            t`Indicator theme has been automatically synced to: ${themeBaseName}`,
            "",
            { timeOut: 1500 },
        );
    } else if (!matchedTheme) {
        if (settings.devMode) {
            console.debug(
                `[TI] 未找到与基础名称匹配的指示器主题 "${themeBaseName}".`,
            );
        }
    }

    updateAndApplyTheme(
        switched ? "main_theme_sync_success" : "main_theme_sync_check",
    );
}

// ==================== SVG Defs 全局管理 ====================

function setupGlobalSvgDefs() {
    if (document.getElementById("ti-global-svg-defs")) return;

    const svgDefsContainer = document.createElement("div");
    svgDefsContainer.id = "ti-global-svg-defs";
    svgDefsContainer.style.position = "absolute";
    svgDefsContainer.style.width = "0";
    svgDefsContainer.style.height = "0";
    svgDefsContainer.style.overflow = "hidden";
    svgDefsContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs></defs>
        </svg>
    `;
    document.body.appendChild(svgDefsContainer);
    debugLog("[TI] 全局 SVG defs 容器已初始化");
}

function updateGlobalDefs(itemToProcess = null) {
    let globalSvgContainer = document.getElementById("ti-global-svg-defs");
    if (!globalSvgContainer) {
        debugWarn("[TI] 全局 SVG defs 容器未找到，正在初始化");
        setupGlobalSvgDefs();
        globalSvgContainer = document.getElementById("ti-global-svg-defs");
        if (!globalSvgContainer) {
            console.error("[TI] 创建全局 SVG defs 容器失败");
            return;
        }
    }

    const masterDefs = globalSvgContainer.querySelector("defs");
    if (!masterDefs) {
        console.error("[TI] 全局容器中找不到 defs 标签");
        return;
    }

    const defsRegex = /<defs>([\s\S]*?)<\/defs>/i;
    const itemsToProcess = itemToProcess
        ? [itemToProcess]
        : [...getSettings().textPresets, ...getSettings().themes];

    itemsToProcess.forEach((item) => {
        const content = item.text || item.html || item.css || "";
        const match = content.match(defsRegex);

        if (match && match[1]) {
            const defsContent = match[1].trim();
            if (defsContent && !masterDefs.innerHTML.includes(defsContent)) {
                masterDefs.innerHTML += defsContent;
                verboseLog(`[TI] 已动态更新主题 "${item.name}" 的 defs`);
            }
        }
    });
}

// ==================== 扩展设置界面 ====================
function showThemeInfoPopup(theme) {
    if (!theme || !theme.readme) return;
    const existingDialog = document.getElementById("ti_theme_info_dialog");
    if (existingDialog) {
        existingDialog.close();
        existingDialog.remove();
    }

    const converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
        ghCodeBlocks: true,
        simpleLineBreaks: true,
    });
    const rawHtml = converter.makeHtml(theme.readme);
    let renderedHtml;
    if (typeof DOMPurify !== "undefined") {
        renderedHtml = DOMPurify.sanitize(rawHtml, {
            USE_PROFILES: { html: true },
        });
    } else {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = rawHtml;
        tempDiv
            .querySelectorAll("script, iframe, object, embed, form")
            .forEach((el) => el.remove());
        tempDiv.querySelectorAll("*").forEach((el) => {
            for (const attr of [...el.attributes]) {
                if (
                    attr.name.startsWith("on") ||
                    attr.value.includes("javascript:")
                ) {
                    el.removeAttribute(attr.name);
                }
            }
        });
        renderedHtml = tempDiv.innerHTML;
    }

    const dialog = document.createElement("dialog");
    dialog.id = "ti_theme_info_dialog";
    dialog.innerHTML = `
        <div class="ti-info-header">
            <h3>
                <i class="fa-solid fa-circle-info"></i>
                ${t`Theme Info`} — ${escapeHtml(theme.name || t`Untitled`)}
            </h3>
            <div class="ti-info-header-actions">
                <button class="ti-info-close menu_button" title="${t`Close`}"
                    style="display:inline-flex!important;align-items:center!important;white-space:nowrap;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <div class="ti-info-preview">
            ${renderedHtml}
        </div>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();
    [
        "click",
        "mousedown",
        "mouseup",
        "pointerdown",
        "pointerup",
        "touchstart",
        "touchend",
    ].forEach((evt) => {
        dialog.addEventListener(evt, (e) => e.stopPropagation());
    });
    dialog.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    });
    dialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closePopup();
    });

    const closeBtn = dialog.querySelector(".ti-info-close");
    const closePopup = () => {
        dialog.close();
        dialog.remove();
    };
    closeBtn.addEventListener("click", closePopup);
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closePopup();
    });
    dialog.addEventListener("close", () => {
        if (dialog.parentNode) dialog.remove();
    });
}

function addExtensionSettings() {
    const existingSection = document.getElementById(
        "typing_indicator_settings",
    );
    if (existingSection) {
        return (preserveDrawerState = true) => {
            requestSettingsRender(preserveDrawerState);
        };
    }

    const settings = getSettings();
    const container = document.getElementById("extensions_settings");
    const section = document.createElement("div");
    section.id = "typing_indicator_settings";
    section.className = "extension_container";

    const render = (preserveDrawerState = false) => {
        const isDrawerOpen = preserveDrawerState;

        section.innerHTML = `
    <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header">
            <b>${t`Typing Indicator Themes`}</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>

        <div class="inline-drawer-content" style="display: ${
            isDrawerOpen ? "flex" : "none"
        };">
            <div class="ti-tabs-container">
                <div class="ti-tab-buttons">
                    <button class="tab-button ${
                        currentActiveTab === "main" ? "active" : ""
                    }" data-tab="main">${t`Main Settings`}</button>
                    <button class="tab-button ${
                        currentActiveTab === "indicator" ? "active" : ""
                    }" data-tab="indicator">${t`Indicator`}</button>
                    <button class="tab-button ${
                        currentActiveTab === "player" ? "active" : ""
                    }" data-tab="player">${t`Player`}</button>
                    <button class="tab-button ${
                        currentActiveTab === "playlist" ? "active" : ""
                    }" data-tab="playlist">${t`Playlist`}</button>
                    <button class="tab-button ${
                        currentActiveTab === "tools" ? "active" : ""
                    }" data-tab="tools">${t`Tools`}</button>
                </div>

                <div class="ti-tab-content">
                    <!-- 主设置标签页 -->
                    <div class="tab-panel ${
                        currentActiveTab === "main" ? "active" : ""
                    }" data-tab="main">
                        <div class="ti-section">
                            <h4>${t`Core Functions`}</h4>
                            <div class="ti-checkbox-container">
                                <label class="checkbox_label"><input type="checkbox" id="ti_enabled" ${
                                    settings.enabled ? "checked" : ""
                                }>${t`Enabled`}</label>
                                <label class="checkbox_label"><input type="checkbox" id="ti_streaming" ${
                                    settings.streaming ? "checked" : ""
                                }>${t`Show if streaming`}</label>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label class="checkbox_label" style="margin-bottom: 0;"><input type="checkbox" id="ti_show_animation" ${
                                        settings.showAnimation ? "checked" : ""
                                    }>${t`Built-in Animation`}</label>
                                    <select id="ti_animation_style" class="text_pole" style="display: ${settings.showAnimation ? "inline-block" : "none"}; width: auto; min-width: 110px;">
                                        <option value="fade" ${settings.animationStyle === "fade" ? "selected" : ""}>${t`Fading Dots`}</option>
                                        <option value="bounce" ${settings.animationStyle === "bounce" ? "selected" : ""}>${t`Bouncing Dots`}</option>
                                        <option value="pulse" ${settings.animationStyle === "pulse" ? "selected" : ""}>${t`Pulsing Dots`}</option>
                                        <option value="appear" ${settings.animationStyle === "appear" ? "selected" : ""}>${t`Sequential Dots`}</option>
                                    </select>
                                </div>
                                <label class="checkbox_label"><input type="checkbox" id="ti_persistent_mode" ${
                                    settings.persistentMode ? "checked" : ""
                                }>${t`Persistent Mode`}</label>
                                <small style="margin-left: 24px; opacity: 0.7; display: block; margin-top: 2px;">${t`When enabled, the indicator stays visible and will not disappear after replies.`}</small>
                            </div>
                        </div>
                        <div class="ti-section">
                            <h4>${t`Automation & Dynamic Effects`}</h4>
                            <div class="ti-checkbox-container">
                                <label class="checkbox_label"><input type="checkbox" id="ti_auto_follow_theme" ${
                                    settings.autoFollowTheme ? "checked" : ""
                                }>${t`Auto-sync with Main UI Theme`}</label>
                                <label class="checkbox_label"><input type="checkbox" id="ti_enable_dynamic_themes" ${
                                    settings.enableDynamicThemes
                                        ? "checked"
                                        : ""
                                }>${t`Enable Dynamic Themes`}</label>
                            </div>
                            <div id="ti_dynamic_options_container" style="display: ${
                                settings.enableDynamicThemes ? "block" : "none"
                            }; margin-top: 12px;">
                                <div class="ti-grid-2-col" style="max-width: 400px;">
                                    <label for="ti_dynamic_theme_duration">${t`Theme Duration (seconds)`}:</label>
                                    <input type="number" id="ti_dynamic_theme_duration" class="text_pole" min="0" value="${
                                        settings.dynamicThemeDuration
                                    }" style="width: 80px;">
                                </div>
                                <small>${t`0 = Hide immediately after generation.`}</small>
                                <div style="margin-top: 10px;">
                                    <label class="checkbox_label"><input type="checkbox" id="ti_dynamic_themes_in_persistent" ${
                                        settings.dynamicThemesInPersistent
                                            ? "checked"
                                            : ""
                                    }>${t`Enable in Persistent Mode`}</label>
                                    <small>${t`Theme will temporarily change and revert on your next action.`}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 指示器标签页 -->
                    <div class="tab-panel ${
                        currentActiveTab === "indicator" ? "active" : ""
                    }" data-tab="indicator">
                        <div id="ti_char_specific_settings" class="ti-section" style="display: none;">
                            <h4>${t`Character Specific Theme`}</h4>
                            <label class="checkbox_label" style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; cursor: pointer; padding: 0;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <input type="checkbox" id="ti_char_override_enabled" style="margin-top: 2px;">
                                    <span>${t`Enable Character-Specific Theme`}</span>
                                </div>
                                <small style="margin-left: 28px;">${t`Settings for the current character. Overrides global settings.`}</small>
                            </label>
                            <div id="ti_char_options_container" style="display: none;">
                                <div class="ti-grid-2-col">
                                    <div id="ti_char_preset_row" style="display: contents;">
                                        <label for="ti_char_preset_select" style="font-weight: bold; text-align: right;">${t`Text Preset`}:</label>
                                        <select id="ti_char_preset_select" class="text_pole"><option value="">-- ${t`Use Global Settings`} --</option>${settings.textPresets
                                            .map(
                                                (p) =>
                                                    `<option value="${p.id}">${p.name}</option>`,
                                            )
                                            .join("")}</select>
                                    </div>
                                    <label for="ti_char_theme_select" style="font-weight: bold; text-align: right;">${t`Style Themes`}:</label>
                                    <select id="ti_char_theme_select" class="text_pole"><option value="">-- ${t`Use Global Settings`} --</option>${settings.themes
                                        .filter(
                                            (theme) =>
                                                !theme.name.startsWith(
                                                    "播放器",
                                                ) &&
                                                !theme.name.startsWith(
                                                    "Player",
                                                ),
                                        )
                                        .map(
                                            (theme) =>
                                                `<option value="${theme.id}">${theme.name}${
                                                    theme.useIframe
                                                        ? " [iframe]"
                                                        : " [CSS]"
                                                }</option>`,
                                        )
                                        .join("")}</select>
                                </div>
                            </div>
                        </div>

                        <div class="ti-section">
                            <h4 style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                                <span>${t`Indicator Position`}</span>
                                <button id="ti_test_position" class="menu_button fa-solid fa-crosshairs" title="${t`Test Display`}" style="display: none; padding: 4px 10px; min-width: unset;"></button>
                            </h4>
                            <div style="display: flex; align-items: center; gap: 10px;"><select id="ti_position" class="text_pole" style="flex-grow: 1;"></select></div>
                            <div id="ti_floating_bottom_controls" style="display: ${
                                settings.position === "floating_bottom"
                                    ? "block"
                                    : "none"
                            }; margin-top: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label for="ti_floating_bottom_offset" style="white-space: nowrap;">${t`Extra Offset (px)`}:</label>
                                    <input type="number" id="ti_floating_bottom_offset" class="text_pole" value="${settings.floatingBottomOffset || 0}" style="width: 80px;" min="-500" max="500">
                                </div>
                                <small style="opacity: 0.7;">${t`Positive = move up, Negative = move down`}</small>
                            </div>
                            <div id="ti_draggable_controls" style="display: ${
                                settings.position === "draggable"
                                    ? "flex"
                                    : "none"
                            }; flex-direction: column; gap: 8px; margin-top: 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <label class="checkbox_label" style="margin-bottom: 0;"><input type="checkbox" id="ti_position_locked" ${
                                        settings.customPosition.locked
                                            ? "checked"
                                            : ""
                                    }>${t`Lock Position`}</label>
                                    <div style="display: flex; gap: 5px;"><button id="ti_reset_position" class="menu_button fa-solid fa-undo" title="${t`Reset Position`}"></button><button id="ti_test_draggable" class="menu_button fa-solid fa-crosshairs" title="${t`Test Dragging`}"></button></div>
                                </div>
                                <small>${t`Lock to enable interaction within the theme.`}</small>
                            </div>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Interaction`}</h4>
                            <label class="checkbox_label"><input type="checkbox" id="ti_click_through" ${
                                settings.clickThrough ? "checked" : ""
                            }>${t`Click-Through Mode`}</label>
                            <small style="margin-left: 24px; opacity: 0.7; display: block; margin-top: 2px;">${t`When enabled, clicks pass through to the chat. The theme itself cannot be interacted with. Recommended for decorative themes.`}</small>
                        </div>

                        <div id="ti_preset_section" class="ti-section">
                            <h4>${t`Indicator Text Presets`}</h4><p>${t`Select a preset to edit or switch.`}</p>
<div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
    <select id="ti_preset_select" class="text_pole" style="flex-grow: 1;"></select>
    <button id="ti_preset_info" class="menu_button" title="${t`Theme Info`}">
        <i class="fa-solid fa-circle-info"></i>
    </button>
    <button id="ti_preset_add" class="menu_button fa-solid fa-plus" title="${t`Add New Preset`}"></button>
    <button id="ti_preset_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
    <div class="ti-more-menu">
        <button class="menu_button fa-solid fa-ellipsis ti-more-toggle" title="${t`More`}"></button>
        <div class="ti-more-dropdown">
            <button id="ti_preset_rename" class="menu_button" title="${t`Rename Preset`}">
                <i class="fa-solid fa-pencil"></i>
                <span>${t`Rename`}</span>
            </button>
            <button id="ti_preset_del" class="menu_button" title="${t`Delete Preset`}">
                <i class="fa-solid fa-trash-can"></i>
                <span>${t`Delete`}</span>
            </button>
            <button id="ti_preset_import" class="menu_button" title="${t`Import`}">
                <i class="fa-solid fa-file-import"></i>
                <span>${t`Import`}</span>
            </button>
            <button id="ti_preset_export" class="menu_button" title="${t`Export`}">
                <i class="fa-solid fa-file-export"></i>
                <span>${t`Export`}</span>
            </button>
        </div>
    </div>
</div>

                            <details class="ti-readme-details" id="ti_preset_editor_details">
    <summary><i class="fa-solid fa-code"></i> ${t`Editor`}</summary>
    <div class="ti-readme-textarea-wrapper" style="display: flex; flex-direction: column; gap: 10px;">
        <textarea id="ti_preset_text" class="text_pole" rows="5"></textarea>
        <div id="ti_preset_readme_details">
            <label for="ti_preset_readme" style="font-weight: bold; display: block; margin-bottom: 5px;">${t`Theme Info`} (Markdown):</label>
            <textarea id="ti_preset_readme" class="text_pole" rows="4"
                placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
        </div>
    </div>
</details>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Indicator Style Themes`}</h4><p>${t`Select a theme to edit or switch.`}</p>
                            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 10px;">
    <select id="ti_theme_select" class="text_pole" style="flex-grow: 1;"></select>
    <button id="ti_theme_info" class="menu_button" title="${t`Theme Info`}">
        <i class="fa-solid fa-circle-info"></i>
    </button>
    <button id="ti_theme_add" class="menu_button fa-solid fa-plus" title="${t`Add New Theme`}"></button>
    <button id="ti_theme_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
    <div class="ti-more-menu">
        <button class="menu_button fa-solid fa-ellipsis ti-more-toggle" title="${t`More`}"></button>
        <div class="ti-more-dropdown">
            <button id="ti_theme_rename" class="menu_button" title="${t`Rename Theme`}">
                <i class="fa-solid fa-pencil"></i>
                <span>${t`Rename`}</span>
            </button>
            <button id="ti_theme_del" class="menu_button" title="${t`Delete Theme`}">
                <i class="fa-solid fa-trash-can"></i>
                <span>${t`Delete`}</span>
            </button>
            <button id="ti_theme_import" class="menu_button" title="${t`Import`}">
                <i class="fa-solid fa-file-import"></i>
                <span>${t`Import`}</span>
            </button>
            <button id="ti_theme_export" class="menu_button" title="${t`Export`}">
                <i class="fa-solid fa-file-export"></i>
                <span>${t`Export`}</span>
            </button>
        </div>
    </div>
</div>

                            <details class="ti-readme-details" id="ti_theme_editor_details">
    <summary><i class="fa-solid fa-code"></i> ${t`Editor`}</summary>
<div class="ti-card" style="border:none; margin:0;">
    <label style="font-weight: bold; ...">${t`Theme Mode`}:</label>
                                <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                                    <label class="checkbox_label"><input type="radio" name="theme_mode" value="css" id="theme_mode_css">${t`CSS Mode`}</label>
                                    <label class="checkbox_label"><input type="radio" name="theme_mode" value="iframe" id="theme_mode_iframe">${t`iframe Mode`}</label>
                                </div>

                                <div id="css_editor_container">
                                    <label for="ti_theme_css" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`CSS Style`}:</label>
                                    <textarea id="ti_theme_css" class="text_pole" rows="10" placeholder="${t`CSS styles that apply directly to the .typing_indicator element.`}"></textarea>
                                </div>
                                <div id="iframe_editor_container" style="display: none; flex-direction:column; gap:15px;">
                                    <div><label for="ti_theme_html" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`HTML Structure (for iframe)`}:</label><textarea id="ti_theme_html" class="text_pole" rows="8" placeholder="${t`HTML structure, supports {{char}} variable.`}"></textarea></div>
                                    <div><label for="ti_theme_iframe_css" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`CSS Style (for iframe)`}:</label><textarea id="ti_theme_iframe_css" class="text_pole" rows="12" placeholder="${t`Full CSS styles, effective inside the iframe.`}"></textarea></div>
                                    <div><label for="ti_theme_iframe_js" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`JavaScript Code (for iframe)`}:</label><textarea id="ti_theme_iframe_js" class="text_pole" rows="15" placeholder="${t`JavaScript code to manipulate DOM elements inside the iframe.`}"></textarea><small>${t`Hint: Use window.parent.name2 or ThemeUtils.getCharacterName() in JS to get the character name.`}</small></div>
                                    <div id="ti_sizes_container">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                            <label for="ti_theme_iframe_sizes" style="font-weight: bold; display: block;">${t`Sizes (JSON format)`}</label>
                                            <button id="ti_format_iframe_sizes" class="menu_button fa-solid fa-code" title="${t`Format JSON`}"></button>
                                        </div>
                                        <textarea id="ti_theme_iframe_sizes" class="text_pole" rows="8" placeholder="${t`Configure sizes for your iframe theme. If left empty, only the default three floating positions will be supported with default sizes.`}"></textarea>
                                        <div id="ti_theme_iframe_sizes_error"></div><small>${t`Set width and height for different positions. If left empty, default sizes and positions will be used.`}</small>
                                    </div>
                                </div>
                                <div id="ti_theme_readme_details">
                                    <label for="ti_theme_readme" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`Theme Info`} (Markdown):</label>
                                    <textarea id="ti_theme_readme" class="text_pole" rows="4"
                                        placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
                                </div>
                            </div>
</details>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Live Preview`}</h4>
                            <div style="display: flex; align-items: center; justify-content: flex-end; margin-bottom: 10px;"><button id="preview_theme" class="menu_button fa-solid fa-eye" title="${t`Preview Effect`}"></button></div>
                            <div id="theme_preview_area" style="min-height: 150px; border-radius: 6px; padding: 15px; position: relative; display: flex; justify-content: center; align-items: center; overflow: auto; resize: vertical; z-index: 10;"><div style="color: var(--text-color-secondary); text-align: center; padding: 20px;">${t`Click the Preview button to see the effect.`}</div></div>
                        </div>
                    </div>

                    <!-- 播放器标签页 -->
                    <div class="tab-panel ${
                        currentActiveTab === "player" ? "active" : ""
                    }" data-tab="player">
                        <div class="ti-section">
                            <h4>${t`Music Player`}</h4>
                            <label class="checkbox_label" style="margin-bottom: 0;"><input type="checkbox" id="ti_player_enabled" ${
                                settings.playerEnabled ? "checked" : ""
                            }>${t`Enable Player`}</label>
                        </div>

                        <div id="ti_player_controls" class="ti-section" style="display: ${
                            settings.playerEnabled ? "block" : "none"
                        };">
    <h4>${t`Player Controls`}</h4>
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 15px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
    <label class="checkbox_label" style="margin-bottom: 0;">
        <input type="checkbox" id="ti_player_hidden" ${
            settings.playerHidden ? "checked" : ""
        }>
        ${t`Background Mode`}
    </label>
    <div style="display: flex; flex-direction: column; gap: 2px;">
        <label class="checkbox_label" style="margin-bottom: 0;">
            <input type="checkbox" id="ti_player_auto_hide" ${
                settings.playerAutoHide ? "checked" : ""
            }>
            ${t`Auto Hide`}
        </label>
        <small style="margin-left: 24px; opacity: 0.7;">${t`Click chat area to toggle show/hide`}</small>
    </div>
    <label class="checkbox_label" style="margin-bottom: 0;">
        <input type="checkbox" id="ti_player_locked" ${
            settings.playerPosition.locked ? "checked" : ""
        }>
        ${t`Lock Position`}
    </label>
</div>
        <div style="display: flex; gap: 5px;">
            <button id="ti_player_reset" class="menu_button fa-solid fa-undo" title="${t`Reset Position`}"></button>
        </div>
    </div>

    <!-- 听歌统计部分 -->
    <div style="margin-top: 12px;">
        <h4 style="margin-bottom: 8px;">${t`Listening Stats`}</h4>
        <div id="ti_listening_stats" style="margin-bottom: 10px; padding: 12px; background: rgba(var(--background-color-secondary-rgb), 0.25); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px;">
            <div style="text-align: center; color: var(--SmartThemeBodyColor); opacity: 0.6;">
                ${t`Select a character to view stats`}
            </div>
        </div>
    </div>

    <!-- 音乐缓存部分 -->
    <div style="margin-top: 12px;">
        <h4 style="margin-bottom: 8px;">${t`Music Cache`}</h4>
        <div id="ti_cache_stats" style="margin-bottom: 10px; padding: 10px; background: rgba(var(--background-color-secondary-rgb), 0.25); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; font-size: 0.9em;">
            ${t`Loading...`}
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="ti_cache_clear" class="menu_button" style="display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;">
                <i class="fa-solid fa-trash"></i>
                <span>${t`Clear Cache`}</span>
            </button>
            <button id="ti_cache_cleanup" class="menu_button" style="display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;">
                <i class="fa-solid fa-broom"></i>
                <span>${t`Clean Expired`}</span>
            </button>
        </div>
    </div>
</div>

                        <!-- 播放器主题section -->
                        <div id="ti_player_theme_section" class="ti-section" style="display: ${
                            settings.playerEnabled ? "block" : "none"
                        };">
                            <h4>${t`Music Player Themes`}</h4>
                            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 10px;">
    <select id="ti_player_theme_select" class="text_pole" style="flex-grow: 1;"></select>
    <button id="ti_player_theme_info" class="menu_button" title="${t`Theme Info`}">
        <i class="fa-solid fa-circle-info"></i>
    </button>
    <button id="ti_player_theme_add" class="menu_button fa-solid fa-plus" title="${t`Add New Theme`}"></button>
    <button id="ti_player_theme_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
    <div class="ti-more-menu">
        <button class="menu_button fa-solid fa-ellipsis ti-more-toggle" title="${t`More`}"></button>
        <div class="ti-more-dropdown">
    <button id="ti_player_theme_rename" class="menu_button" title="${t`Rename Theme`}">
        <i class="fa-solid fa-pencil"></i>
        <span>${t`Rename`}</span>
    </button>
    <button id="ti_player_theme_del" class="menu_button" title="${t`Delete Theme`}">
        <i class="fa-solid fa-trash-can"></i>
        <span>${t`Delete`}</span>
    </button>
    <button id="ti_player_theme_import" class="menu_button" title="${t`Import`}">
        <i class="fa-solid fa-file-import"></i>
        <span>${t`Import`}</span>
    </button>
    <button id="ti_player_theme_export" class="menu_button" title="${t`Export`}">
        <i class="fa-solid fa-file-export"></i>
        <span>${t`Export`}</span>
    </button>
</div>
    </div>
</div>

                            <details class="ti-readme-details" id="ti_player_editor_details">
    <summary><i class="fa-solid fa-code"></i> ${t`Editor`}</summary>
<div id="player_iframe_editor_container" class="ti-card" style="display:flex; flex-direction:column; gap:15px; border:none; margin:0;">
                                <div><label for="ti_player_theme_html" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`HTML Structure (for iframe)`}:</label><textarea id="ti_player_theme_html" class="text_pole" rows="8" placeholder="${t`HTML structure, supports {{char}} variable.`}"></textarea></div>
                                <div><label for="ti_player_theme_iframe_css" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`CSS Style (for iframe)`}:</label><textarea id="ti_player_theme_iframe_css" class="text_pole" rows="12" placeholder="${t`Full CSS styles, effective inside the iframe.`}"></textarea></div>
                                <div><label for="ti_player_theme_iframe_js" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`JavaScript Code (for iframe)`}:</label><textarea id="ti_player_theme_iframe_js" class="text_pole" rows="15" placeholder="${t`JavaScript code to manipulate DOM elements inside the iframe.`}"></textarea><small>${t`Hint: Use window.parent.name2 or ThemeUtils.getCharacterName() in JS to get the character name.`}</small></div>
                                <div id="ti_player_sizes_container">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                        <label for="ti_player_theme_iframe_sizes" style="font-weight: bold; display: block;">${t`Sizes (JSON format)`}</label>
                                        <button id="ti_player_format_iframe_sizes" class="menu_button fa-solid fa-code" title="${t`Format JSON`}"></button>
                                    </div>
                                    <textarea id="ti_player_theme_iframe_sizes" class="text_pole" rows="8" placeholder="${t`Configure sizes for the player theme. The player only supports draggable mode.`}"></textarea>
                                    <div id="ti_player_theme_iframe_sizes_error"></div><small>${t`Player themes only support the draggable position.`}</small>
                                </div>
                                <div id="ti_player_theme_readme_details">
                                    <label for="ti_player_theme_readme" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`Theme Info`} (Markdown):</label>
                                    <textarea id="ti_player_theme_readme" class="text_pole" rows="4"
                                        placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
                                </div>
                            </div>
</details>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Floating Lyrics`}</h4>
                            <div class="ti-checkbox-container" style="margin-bottom: 15px;">
                                <label class="checkbox_label">
                                    <input type="checkbox" id="ti_lyrics_enabled" ${
                                        settings.lyricsEnabled ? "checked" : ""
                                    }>
                                    ${t`Enable Floating Lyrics`}
                                </label>
                            </div>

                            <div id="ti_lyrics_controls" style="display: ${
                                settings.lyricsEnabled ? "block" : "none"
                            };">
                                <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 15px;">
                                    <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <label style="margin: 0;">${t`Sung Color`}:</label>
                                            <input type="color" id="ti_lyrics_sung_color" value="${
                                                settings.lyricsSungColor
                                            }" style="width: 45px; height: 28px; padding: 0; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer;">
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <label style="margin: 0;">${t`Unsung Color`}:</label>
                                            <input type="color" id="ti_lyrics_unsung_color" value="${
                                                settings.lyricsUnsungColor
                                            }" style="width: 45px; height: 28px; padding: 0; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer;">
                                        </div>
                                    </div>

                                    <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <label style="margin: 0;">${t`Background`}:</label>
                                            <input type="color" id="ti_lyrics_background_picker" value="#000000" style="width: 45px; height: 28px; padding: 0; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; cursor: pointer;" title="${t`Pick color`}">
                                            <input type="text" id="ti_lyrics_background" class="text_pole" value="${
                                                settings.lyricsBackground
                                            }" style="width: 140px;" placeholder="rgba(0,0,0,0.6)">
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <label style="margin: 0;">${t`Font Size`}:</label>
                                            <input type="number" id="ti_lyrics_font_size" class="text_pole" value="${
                                                settings.lyricsFontSize
                                            }" min="12" max="36" style="width: 70px;">
                                        </div>
                                    </div>
                                </div>

                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <label class="checkbox_label" style="margin-bottom: 0;">
                                        <input type="checkbox" id="ti_lyrics_show_next" ${
                                            settings.lyricsShowNextLine
                                                ? "checked"
                                                : ""
                                        }>
                                        ${t`Show Translation`}
                                    </label>
                                </div>

                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <label class="checkbox_label" style="margin-bottom: 0;">
                                        <input type="checkbox" id="ti_lyrics_locked" ${
                                            settings.lyricsPosition.locked
                                                ? "checked"
                                                : ""
                                        }>
                                        ${t`Lock Position`}
                                    </label>
                                    <div style="display: flex; gap: 5px;">
                                        <button id="ti_lyrics_reset_position" class="menu_button fa-solid fa-undo" title="${t`Reset Position`}"></button>
                                        <button id="ti_lyrics_test" class="menu_button fa-solid fa-eye" title="${t`Preview Lyrics`}"></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ti-section">
    <h4>${t`BGM Bubble Style`}</h4>
    <div class="ti-checkbox-container" style="margin-bottom: 10px;">
        <label class="checkbox_label">
            <input type="checkbox" id="ti_bubble_enabled" ${
                settings.enableBubbleReplacement ? "checked" : ""
            }>
            ${t`Enable BGM Bubble Replacement`}
        </label>
    </div>
    <small style="display: block; margin-bottom: 10px;">${t`Automatically convert [bgm]Song-Artist[/bgm] tags in messages to clickable bubbles.`}</small>

    <div id="ti_bubble_controls" style="display: ${
        settings.enableBubbleReplacement ? "block" : "none"
    };">

<div style="display: flex; align-items: center; gap: 5px; margin-bottom: 10px;">
    <select id="ti_bubble_style_select" class="text_pole" style="flex-grow: 1;"></select>
    <button id="ti_bubble_info" class="menu_button" title="${t`Theme Info`}">
        <i class="fa-solid fa-circle-info"></i>
    </button>
    <button id="ti_bubble_add" class="menu_button fa-solid fa-plus" title="${t`Add New Style`}"></button>
    <button id="ti_bubble_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
    <div class="ti-more-menu">
        <button class="menu_button fa-solid fa-ellipsis ti-more-toggle" title="${t`More`}"></button>
        <div class="ti-more-dropdown">
            <button id="ti_bubble_rename" class="menu_button" title="${t`Rename Style`}">
                <i class="fa-solid fa-pencil"></i>
                <span>${t`Rename`}</span>
            </button>
            <button id="ti_bubble_del" class="menu_button" title="${t`Delete Style`}">
                <i class="fa-solid fa-trash-can"></i>
                <span>${t`Delete`}</span>
            </button>
            <button id="ti_bubble_import" class="menu_button" title="${t`Import`}">
                <i class="fa-solid fa-file-import"></i>
                <span>${t`Import`}</span>
            </button>
            <button id="ti_bubble_export" class="menu_button" title="${t`Export`}">
                <i class="fa-solid fa-file-export"></i>
                <span>${t`Export`}</span>
            </button>
        </div>
    </div>
</div>

        <details class="ti-readme-details" id="ti_bubble_editor_details">
    <summary><i class="fa-solid fa-code"></i> ${t`Editor`}</summary>
<div class="ti-card" style="display: flex; flex-direction: column; gap: 10px; border:none; margin:0;">
            <div>
                <label for="ti_bubble_html" style="font-weight: bold; display: block; margin-bottom: 5px;">${t`HTML Template`}:</label>
                <textarea id="ti_bubble_html" class="text_pole" rows="5" placeholder="${t`Use {{title}} and {{artist}} as placeholders`}"></textarea>
                <small>${t`Variables: {{title}}, {{artist}}`}</small>
            </div>
            <div>
                <label for="ti_bubble_css" style="font-weight: bold; display: block; margin-bottom: 5px;">${t`CSS Style`}:</label>
                <textarea id="ti_bubble_css" class="text_pole" rows="8" placeholder="${t`CSS styles for .music-bubble`}"></textarea>
            </div>
            <div id="ti_bubble_readme_details">
                <label for="ti_bubble_readme" style="font-weight: bold; display: block; margin-bottom: 5px;">${t`Theme Info`} (Markdown):</label>
                <textarea id="ti_bubble_readme" class="text_pole" rows="4"
                    placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
            </div>
        </div>
</details>

        <div id="ti_bubble_preview_area" style="margin-top: 15px; padding: 15px; background: var(--SmartThemeBlurTintColor); border-radius: 8px; text-align: center;">
            <span style="color: var(--SmartThemeBodyColor); opacity: 0.7;">${t`Bubble preview will appear here`}</span>
        </div>
    </div>
</div>
                    </div>

                    <!-- 歌单标签页 -->
                    <div class="tab-panel ${
                        currentActiveTab === "playlist" ? "active" : ""
                    }" data-tab="playlist">

                        <div class="ti-section">
                            <h4>${t`Playback Source`}</h4>
                            <select id="ti_playlist_source_mode_select" class="text_pole">
                                <option value="mixed" ${settings.playlistSourceMode === "mixed" ? "selected" : ""}>${t`Mixed Mode`}</option>
                                <option value="playlist_only" ${settings.playlistSourceMode === "playlist_only" ? "selected" : ""}>${t`Playlist Only`}</option>
                                <option value="character_playlist" ${settings.playlistSourceMode === "character_playlist" ? "selected" : ""}>${t`Character Playlist`}</option>
                                <option value="chat_only" ${settings.playlistSourceMode === "chat_only" ? "selected" : ""}>${t`Chat Only`}</option>
                            </select>
                            <small id="ti_source_mode_desc" class="ti-source-mode-desc"></small>
                            <div id="ti_character_playlist_warning" style="display: none; margin-top: 10px; padding: 10px 12px; background: rgba(240, 173, 78, 0.12); border: 1px solid rgba(240, 173, 78, 0.5); border-radius: 8px; color: var(--SmartThemeBodyColor); font-size: 0.9em; line-height: 1.5;">
                                <i class="fa-solid fa-triangle-exclamation" style="color: #f0ad4e; margin-right: 6px;"></i>
                                <span id="ti_character_playlist_warning_text"></span>
                            </div>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Character Specific Playlist`}</h4>
                            <div class="ti-checkbox-container">
                                <label class="checkbox_label">
                                    <input type="checkbox" id="ti_enable_character_playlist" ${settings.enableCharacterPlaylist ? "checked" : ""}>
                                    ${t`Bind a dedicated playlist to the current character`}
                                </label>
                                <label class="checkbox_label">
                                    <input type="checkbox" id="ti_auto_switch_character_playlist" ${settings.autoSwitchCharacterPlaylist ? "checked" : ""}>
                                    ${t`Auto-switch playlist when changing characters`}
                                </label>
                                <label class="checkbox_label">
                                    <input type="checkbox" id="ti_remember_playback_progress" ${settings.rememberPlaybackProgress ? "checked" : ""}>
                                    ${t`Remember last playback progress for each playlist`}
                                </label>
                            </div>
                            <div id="ti_character_playlist_row" class="ti-grid-2-col" style="margin-top: 12px; display: ${settings.enableCharacterPlaylist ? "grid" : "none"};">
                                <label for="ti_character_playlist_select" style="font-weight: bold; text-align: right;">${t`Current Character Playlist`}:</label>
                                <select id="ti_character_playlist_select" class="text_pole">
                                    <option value="">-- ${t`None`} --</option>
                                </select>
                            </div>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Playlist Management`}</h4>
                            <div class="ti-playlist-header">
                                <select id="ti_playlist_select" class="text_pole" style="flex: 1; min-width: 0;">
                                    <option value="">-- ${t`No playlists yet`} --</option>
                                </select>
                                <button id="ti_playlist_play_all" class="menu_button" title="${t`Play Entire Playlist`}">
                                    <i class="fa-solid fa-play"></i>
                                </button>
                                <button id="ti_playlist_info" class="menu_button" title="${t`Playlist Info`}">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                                <button id="ti_playlist_add" class="menu_button fa-solid fa-plus" title="${t`New Playlist`}"></button>
                                <button id="ti_playlist_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
                                <div class="ti-more-menu">
                                    <button class="menu_button fa-solid fa-ellipsis ti-more-toggle" title="${t`More`}"></button>
                                    <div class="ti-more-dropdown">
                                        <button id="ti_playlist_rename" class="menu_button" title="${t`Rename`}">
                                            <i class="fa-solid fa-pencil"></i>
                                            <span>${t`Rename`}</span>
                                        </button>
                                        <button id="ti_playlist_delete" class="menu_button" title="${t`Delete`}">
                                            <i class="fa-solid fa-trash-can"></i>
                                            <span>${t`Delete`}</span>
                                        </button>
                                        <button id="ti_playlist_import_json" class="menu_button" title="${t`Import`}">
                                            <i class="fa-solid fa-file-import"></i>
                                            <span>${t`Import`}</span>
                                        </button>
                                        <button id="ti_playlist_export_json" class="menu_button" title="${t`Export`}">
                                            <i class="fa-solid fa-file-export"></i>
                                            <span>${t`Export`}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="ti-song-list-container">
                                <div class="ti-song-list-header">
                                    <div class="ti-song-search-wrapper">
                                        <button type="button" class="ti-song-search-btn" id="ti_song_search_btn" title="${t`Search`}">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                        <input type="text" id="ti_song_search" class="ti-song-search" placeholder="${t`Search songs or artists...`}">
                                        <button type="button" class="ti-song-search-clear" id="ti_song_search_clear" title="${t`Clear`}">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
<div class="ti-song-search-tabs">
                                        <button class="ti-search-tab active" data-search-mode="local" type="button">${t`In Playlist`}</button>
                                        <button class="ti-search-tab" data-search-mode="tencent" type="button">${t`QQ Music`}</button>
                                        <button class="ti-search-tab" data-search-mode="netease" type="button">${t`NetEase`}</button>
                                        <button class="ti-search-tab" data-search-mode="kuwo" type="button">${t`Kuwo`}</button>
                                    </div>
                                    <div class="ti-song-list-meta">
                                        <span id="ti_song_count">0 ${t`songs`}</span>
                                        <div class="ti-song-meta-actions">
                                            <button id="ti_song_multi_select" class="ti-icon-btn" type="button" title="${t`Multi-select`}">
                                                <i class="fa-solid fa-list-check"></i>
                                            </button>
                                            <div id="ti_song_multi_actions" class="ti-song-multi-actions-inline">
                                                <span id="ti_song_selected_count" class="ti-song-selected-count">0</span>
                                                <button id="ti_song_select_all" class="ti-icon-btn" type="button" title="${t`Select All`}">
                                                    <i class="fa-solid fa-check-double"></i>
                                                </button>
                                                <button id="ti_song_multi_remove" class="ti-icon-btn danger" type="button" title="${t`Remove`}">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                                <button id="ti_song_multi_cancel" class="ti-icon-btn" type="button" title="${t`Cancel`}">
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="ti_song_list" class="ti-song-list">
                                    <div class="ti-song-list-empty">${t`Select a playlist to view songs`}</div>
                                </div>
                                <div id="ti_song_list_footer" class="ti-song-list-footer" style="display:none;">
                                    <button id="ti_song_page_prev" class="ti-icon-btn" type="button" title="${t`Previous Page`}">
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <div class="ti-pagination-info">
                                        <input type="number" id="ti_song_page_input" min="1" value="1" class="ti-pagination-input">
                                        <span class="ti-pagination-total">/ <span id="ti_song_page_total">1</span></span>
                                    </div>
                                    <button id="ti_song_page_next" class="ti-icon-btn" type="button" title="${t`Next Page`}">
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </button>
                                    <span id="ti_song_list_progress" class="ti-pagination-progress"></span>
                                </div>
                            </div>
                        </div>

                        <div class="ti-section">
                            <h4>${t`Batch Import`}</h4>
                            <div class="ti-import-url-row">
                                <input type="text" id="ti_import_url" class="text_pole" placeholder="${t`Paste NetEase / QQ Music playlist URL...`}">
                                <button id="ti_import_url_btn" class="menu_button ti-url-submit-btn" title="${t`Import playlist from URL`}">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                            <small style="opacity: 0.7; display: block; margin-top: 8px;">
                                ${t`Supports NetEase Music and QQ Music playlist share links. Short links will be resolved automatically.`}
                            </small>
                        </div>

                    </div>

                    <!-- 工具标签页 -->
                    <div class="tab-panel ${
                        currentActiveTab === "tools" ? "active" : ""
                    }" data-tab="tools">
                        <div class="ti-section">
                            <h4>${t`Utilities`}</h4>
                            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px;">
                            <button id="ti_usage_guide_btn" class="menu_button"><i class="fa-solid fa-circle-question"></i><span>${t`Usage Guide`}</span></button>
                                <button id="ti_download_indicator_guide_btn" class="menu_button"><i class="fa-solid fa-palette"></i><span>${t`Indicator Theme Guide`}</span></button>
<button id="ti_download_player_guide_btn" class="menu_button"><i class="fa-solid fa-music"></i><span>${t`Player Theme Guide`}</span></button>
                                <button id="ti_restore_defaults_btn" class="menu_button"><i class="fa-solid fa-arrows-rotate"></i><span>${t`Restore Built-in Items`}</span></button>
                                <button id="ti_import_worldbook_btn" class="menu_button">
                                <i class="fa-solid fa-book-atlas"></i>
                                <span>${t`Import Indicator World Book`}</span>
                                </button>
                                <button id="ti_reset_all_btn" class="menu_button">
                                <i class="fa-solid fa-rotate"></i>
                                <span>${t`Refresh Display`}</span>
                                </button>
                            </div>
                        </div>
                        <div class="ti-section">
                            <h4>${t`Debugging`}</h4>
                            <label class="checkbox_label" style="color: var(--text-color-secondary);">
                            <input type="checkbox" id="ti_fps_monitor" ${settings.showFpsMonitor ? "checked" : ""}>
                            ${t`Show FPS Monitor`}
                            </label>
                            <label class="checkbox_label" style="color: var(--text-color-secondary);"><input type="checkbox" id="ti_dev_mode" ${
                                settings.devMode ? "checked" : ""
                            }>${t`Developer: Log theme performance`}</label>
                            <label class="checkbox_label" style="color: var(--text-color-secondary);"><input type="checkbox" id="ti_debug_logs" ${
                                settings.debugLogs ? "checked" : ""
                            }>${t`Debug: Show detailed logs`}</label>
                            <label class="checkbox_label" id="ti_verbose_logs_label" style="color: var(--text-color-secondary); margin-left: 20px; display: ${settings.debugLogs ? "flex" : "none"};">
    <input type="checkbox" id="ti_verbose_logs" ${settings.verboseLogs ? "checked" : ""}>
    ${t`Verbose: Show all internal logs`}
</label>
                            <div id="ti_log_filter_row" style="margin-top: 8px; margin-left: 20px; display: ${settings.debugLogs ? "flex" : "none"}; align-items: center; gap: 8px;">
                                <label for="ti_log_filter" style="margin-bottom: 0; color: var(--text-color-secondary);">${t`Log Category`}:</label>
                                <select id="ti_log_filter" class="text_pole" style="width: auto; min-width: 140px;">
                                    <option value="all" ${settings.logFilter === "all" ? "selected" : ""}>${t`All Logs`}</option>
                                    <option value="indicator" ${settings.logFilter === "indicator" ? "selected" : ""}>${t`Indicator Only`}</option>
                                    <option value="player" ${settings.logFilter === "player" ? "selected" : ""}>${t`Player Only`}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

        container.appendChild(section);
        const tabButtons = section.querySelectorAll(".tab-button");
        const tabPanels = section.querySelectorAll(".tab-panel");

        tabButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetTab = button.dataset.tab;
                currentActiveTab = targetTab;
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                button.classList.add("active");
                tabPanels.forEach((panel) => {
                    panel.classList.remove("active");
                    if (panel.dataset.tab === targetTab) {
                        panel.classList.add("active");
                    }
                });

                if (
                    targetTab === "playlist" &&
                    typeof window._tiPlaylistLazyLoad === "function"
                ) {
                    window._tiPlaylistLazyLoad();
                }
            });
        });

        const drawerToggle = section.querySelector(".inline-drawer-toggle");
        const drawerContent = section.querySelector(".inline-drawer-content");

        if (isDrawerOpen) {
            drawerToggle.classList.add("open");
        }

        let hasCheckedChangelog = false;
        drawerToggle.addEventListener("click", () => {
            const isOpening = drawerContent.style.display === "none";
            if (isOpening && !hasCheckedChangelog) {
                hasCheckedChangelog = true;
                setTimeout(() => {
                    checkAndShowChangelog();
                }, 300);
            }
        });
        initializeMainSettings();
        initializeIndicatorSettings();
        initializePlayerSettings();
        initializePlaylistSettings();
        initializeToolsSettings();
        if (
            isDrawerOpen &&
            currentActiveTab === "playlist" &&
            typeof window._tiPlaylistLazyLoad === "function"
        ) {
            window._tiPlaylistLazyLoad();
        }

        section.querySelectorAll(".ti-more-toggle").forEach((toggle) => {
            toggle.addEventListener("click", (e) => {
                e.stopPropagation();
                const dropdown = toggle.nextElementSibling;
                section
                    .querySelectorAll(".ti-more-dropdown.open")
                    .forEach((d) => {
                        if (d !== dropdown) d.classList.remove("open");
                    });
                dropdown.classList.toggle("open");
            });
        });

        section
            .querySelectorAll(".ti-more-dropdown .menu_button")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    btn.closest(".ti-more-dropdown").classList.remove("open");
                });
            });

        if (!window._tiMoreMenuClickRegistered) {
            window._tiMoreMenuClickRegistered = true;
            document.addEventListener("click", (e) => {
                if (!e.target.closest(".ti-more-menu")) {
                    document
                        .querySelectorAll(
                            "#typing_indicator_settings .ti-more-dropdown.open",
                        )
                        .forEach((d) => {
                            d.classList.remove("open");
                        });
                }
            });
        }
    };

    function openEditorAfterCreate(editorDetailsId, focusTargetId) {
        setTimeout(() => {
            const details = section.querySelector(editorDetailsId);
            if (details) {
                details.setAttribute("open", "");
                setTimeout(
                    () => section.querySelector(focusTargetId)?.focus(),
                    50,
                );
            }
        }, 60);
    }

    function savedToast(name, hasReadme) {
        const msg = hasReadme
            ? t`"${name}" saved (with theme info).`
            : t`"${name}" saved.`;
        toastr.success(msg);
    }

    function saveReadmeField(textareaId, targetObj) {
        const textarea = section.querySelector(textareaId);
        if (!textarea) return !!targetObj.readme;
        const val = textarea.value.trim();
        if (val) {
            targetObj.readme = val;
        } else {
            delete targetObj.readme;
        }
        return !!targetObj.readme;
    }

    function updateReadmeIndicators(
        infoIconSelector,
        detailsSelector,
        hasReadme,
    ) {
        const icon = section.querySelector(infoIconSelector);
        if (icon) {
            icon.style.color = hasReadme
                ? "var(--SmartThemeQuoteColor, #88c0d0)"
                : "";
        }
        const details = section.querySelector(detailsSelector);
        if (details) {
            details.classList.toggle("has-content", hasReadme);
        }
    }

    function loadReadmeField(textareaId, detailsId, readme) {
        const textarea = section.querySelector(textareaId);
        if (textarea) textarea.value = readme || "";
        const details = section.querySelector(detailsId);
        if (details) details.removeAttribute("open");
    }

    function handleReadmeInfoClick(itemWithName, textareaId, detailsId) {
        const textarea = section.querySelector(textareaId);
        const currentReadme = textarea
            ? textarea.value.trim()
            : itemWithName.readme || "";
        if (currentReadme) {
            const savedReadme = (itemWithName.readme || "").trim();
            const isUnsaved = currentReadme !== savedReadme;
            showThemeInfoPopup({
                name: itemWithName.name + (isUnsaved ? ` (${t`unsaved`})` : ""),
                readme: currentReadme,
            });
        } else {
            const details = section.querySelector(detailsId);
            if (details) {
                if (details.hasAttribute("open")) {
                    details.removeAttribute("open");
                } else {
                    const parentDetails =
                        details.parentElement?.closest("details");
                    if (parentDetails && !parentDetails.hasAttribute("open")) {
                        parentDetails.setAttribute("open", "");
                    }
                    details.setAttribute("open", "");
                    setTimeout(
                        () => details.querySelector("textarea")?.focus(),
                        50,
                    );
                }
            }
        }
    }

    function readmeOps({ textarea, details, icon }) {
        return {
            load(readme) {
                loadReadmeField(textarea, details, readme);
                updateReadmeIndicators(icon, details, !!readme);
            },
            save(targetObj) {
                const hasReadme = saveReadmeField(textarea, targetObj);
                updateReadmeIndicators(icon, details, hasReadme);
                return hasReadme;
            },
            infoClick(itemWithName) {
                handleReadmeInfoClick(itemWithName, textarea, details);
            },
            openForEdit() {
                const el = section.querySelector(details);
                if (el) {
                    const parentDetails = el.parentElement?.closest("details");
                    if (parentDetails && !parentDetails.hasAttribute("open")) {
                        parentDetails.setAttribute("open", "");
                    }
                    el.setAttribute("open", "");
                    setTimeout(() => el.querySelector("textarea")?.focus(), 50);
                }
            },
        };
    }

    const presetReadme = readmeOps({
        textarea: "#ti_preset_readme",
        details: "#ti_preset_readme_details",
        icon: "#ti_preset_info i",
    });
    const themeReadme = readmeOps({
        textarea: "#ti_theme_readme",
        details: "#ti_theme_readme_details",
        icon: "#ti_theme_info i",
    });
    const playerThemeReadme = readmeOps({
        textarea: "#ti_player_theme_readme",
        details: "#ti_player_theme_readme_details",
        icon: "#ti_player_theme_info i",
    });
    const bubbleReadme = readmeOps({
        textarea: "#ti_bubble_readme",
        details: "#ti_bubble_readme_details",
        icon: "#ti_bubble_info i",
    });

    function initializeMainSettings() {
        const settings = getSettings();

        section.querySelector("#ti_enabled").addEventListener("change", (e) => {
            settings.enabled = e.target.checked;
            saveSettingsDebounced();
        });

        section
            .querySelector("#ti_streaming")
            .addEventListener("change", (e) => {
                settings.streaming = e.target.checked;
                saveSettingsDebounced();
            });

        section
            .querySelector("#ti_show_animation")
            .addEventListener("change", (e) => {
                settings.showAnimation = e.target.checked;
                const styleSelect = section.querySelector(
                    "#ti_animation_style",
                );
                if (styleSelect) {
                    styleSelect.style.display = e.target.checked
                        ? "inline-block"
                        : "none";
                }
                saveSettingsDebounced();
                refreshLiveIndicators("animation_toggle");
            });

        section
            .querySelector("#ti_animation_style")
            .addEventListener("change", (e) => {
                settings.animationStyle = e.target.value;
                saveSettingsDebounced();
                refreshLiveIndicators("animation_style_change");
            });

        section
            .querySelector("#ti_auto_follow_theme")
            .addEventListener("change", (e) => {
                manualOverrideActive = false;
                settings.autoFollowTheme = e.target.checked;
                saveSettingsDebounced();
                updateAndApplyTheme("auto_follow_toggled");
                const { themeId, presetId } = getActiveThemeConfig();
                loadThemeIntoMainEditor(themeId);
                loadPresetIntoMainEditor(presetId);
            });

        section
            .querySelector("#ti_persistent_mode")
            .addEventListener("change", (e) => {
                settings.persistentMode = e.target.checked;
                saveSettingsDebounced();
                const testPosBtn = section.querySelector("#ti_test_position");
                if (testPosBtn) {
                    const show =
                        settings.position !== "draggable" &&
                        !settings.persistentMode;
                    testPosBtn.style.display = show ? "inline-flex" : "none";
                }
                if (settings.persistentMode) {
                    isIndicatorPersisted = true;
                    showTypingIndicator("persistent-start");
                    const testButton =
                        section.querySelector("#ti_test_draggable");
                    if (testButton) {
                        testButton.disabled = true;
                        testButton.title = t`Unavailable in Persistent Mode`;
                    }
                } else {
                    isIndicatorPersisted = false;
                    const indicator =
                        document.getElementById("typing_indicator");
                    if (indicator) {
                        $(indicator).stop(true, true);
                        cleanupUnifiedIframe(indicator);
                        indicator.remove();
                    }
                    const testButton =
                        section.querySelector("#ti_test_draggable");
                    if (testButton) {
                        testButton.disabled = false;
                        testButton.title = t`Test Dragging`;
                    }
                }
            });

        // 动态主题设置
        const dynamicThemesToggle = section.querySelector(
            "#ti_enable_dynamic_themes",
        );
        const dynamicOptionsContainer = section.querySelector(
            "#ti_dynamic_options_container",
        );

        dynamicThemesToggle.addEventListener("change", (e) => {
            settings.enableDynamicThemes = e.target.checked;
            dynamicOptionsContainer.style.display = e.target.checked
                ? "block"
                : "none";
            saveSettingsDebounced();

            if (!e.target.checked) {
                if (dynamicThemeTimeoutId) {
                    clearTimeout(dynamicThemeTimeoutId);
                    dynamicThemeTimeoutId = null;
                }
                if (currentDynamicThemeId) {
                    revertDynamicTheme("dynamic_themes_disabled");
                }
            }
        });

        section
            .querySelector("#ti_dynamic_theme_duration")
            .addEventListener("input", (e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value) && value >= 0) {
                    settings.dynamicThemeDuration = value;
                    saveSettingsDebounced();
                }
            });

        section
            .querySelector("#ti_dynamic_themes_in_persistent")
            .addEventListener("change", (e) => {
                settings.dynamicThemesInPersistent = e.target.checked;
                saveSettingsDebounced();
            });
    }

    function initializeIndicatorSettings() {
        const settings = getSettings();
        updatePositionOptions();
        const positionSelect = section.querySelector("#ti_position");
        const draggableControls = section.querySelector(
            "#ti_draggable_controls",
        );

        positionSelect.addEventListener("change", (e) => {
            settings.position = e.target.value;
            draggableControls.style.display =
                settings.position === "draggable" ? "flex" : "none";
            const floatingControls = section.querySelector(
                "#ti_floating_bottom_controls",
            );
            if (floatingControls) {
                floatingControls.style.display =
                    settings.position === "floating_bottom" ? "block" : "none";
            }
            saveSettingsDebounced();
            syncIndicatorInteractivity();
        });

        const floatingOffsetInput = section.querySelector(
            "#ti_floating_bottom_offset",
        );
        if (floatingOffsetInput) {
            floatingOffsetInput.addEventListener("input", (e) => {
                settings.floatingBottomOffset = parseInt(e.target.value) || 0;
                saveSettingsDebounced();
                const indicator = document.getElementById("typing_indicator");
                if (indicator && settings.position === "floating_bottom") {
                    const sendForm = document.getElementById("send_form");
                    const memoryTable = document.getElementById(
                        "tableStatusContainer",
                    );
                    let bottomOffset = 5;
                    if (sendForm) bottomOffset += sendForm.offsetHeight;
                    if (
                        memoryTable &&
                        getComputedStyle(memoryTable).display !== "none"
                    ) {
                        bottomOffset += memoryTable.offsetHeight;
                    }
                    bottomOffset += settings.floatingBottomOffset || 0;
                    indicator.style.bottom = `${bottomOffset}px`;
                }
                refreshLiveIndicators("floating_offset_change");
            });
        }
        const testPositionBtn = section.querySelector("#ti_test_position");
        const updateTestPositionBtnVisibility = () => {
            if (!testPositionBtn) return;
            const show =
                settings.position !== "draggable" && !settings.persistentMode;
            testPositionBtn.style.display = show ? "inline-flex" : "none";
        };
        updateTestPositionBtnVisibility();
        positionSelect.addEventListener(
            "change",
            updateTestPositionBtnVisibility,
        );

        if (testPositionBtn) {
            testPositionBtn.addEventListener("click", () => {
                const indicator = document.getElementById("typing_indicator");
                if (indicator) {
                    isIndicatorPersisted = false;
                    isTestIndicatorActive = false;
                    hideTypingIndicator();
                    testPositionBtn.classList.remove("fa-eye-slash");
                    testPositionBtn.classList.add("fa-crosshairs");
                    testPositionBtn.title = t`Test Display`;
                } else {
                    showTypingIndicator("test");
                    testPositionBtn.classList.remove("fa-crosshairs");
                    testPositionBtn.classList.add("fa-eye-slash");
                    testPositionBtn.title = t`Hide Test`;
                    isTestIndicatorActive = true;
                }
            });
        }

        section
            .querySelector("#ti_position_locked")
            .addEventListener("change", (e) => {
                settings.customPosition.locked = e.target.checked;
                saveSettingsDebounced();
                syncIndicatorInteractivity();
            });

        const clickThroughCheckbox = section.querySelector("#ti_click_through");
        if (clickThroughCheckbox) {
            clickThroughCheckbox.addEventListener("change", (e) => {
                settings.clickThrough = e.target.checked;
                saveSettingsDebounced();
                syncIndicatorInteractivity();
            });
        }

        section
            .querySelector("#ti_reset_position")
            .addEventListener("click", () => {
                settings.customPosition.x = 50;
                settings.customPosition.y = 50;
                settings.customPosition.locked = false;
                section.querySelector("#ti_position_locked").checked = false;
                toastr.success(t`Position has been reset.`, "", {
                    timeOut: 500,
                });
                saveSettingsDebounced();

                const indicator = document.getElementById("typing_indicator");
                if (indicator) {
                    indicator.style.transition =
                        "left 0.3s ease, top 0.3s ease";
                    indicator.style.left = `${window.innerWidth / 2}px`;
                    indicator.style.top = `${window.innerHeight / 2}px`;
                    indicator.style.transform = "translate(-50%, -50%)";

                    setTimeout(() => {
                        if (indicator) {
                            indicator.style.transition = "";
                            syncIndicatorInteractivity();
                        }
                    }, 300);
                }
            });

        section
            .querySelector("#ti_test_draggable")
            .addEventListener("click", () => {
                const indicator = document.getElementById("typing_indicator");
                const testButton = section.querySelector("#ti_test_draggable");

                if (indicator) {
                    isIndicatorPersisted = false;
                    isTestIndicatorActive = false;
                    hideTypingIndicator();
                    testButton.classList.remove("fa-solid", "fa-eye-slash");
                    testButton.classList.add("fa-solid", "fa-crosshairs");
                    testButton.title = t`Test Dragging`;
                } else {
                    showTypingIndicator("test");
                    testButton.classList.remove("fa-solid", "fa-crosshairs");
                    testButton.classList.add("fa-solid", "fa-eye-slash");
                    testButton.title = t`Hide Test Indicator`;
                    isTestIndicatorActive = true;
                }
            });
        updateCharSpecificUI();
        populatePresets();
        setupPresetEventListeners();
        populateThemes();
        setupThemeEventListeners();
    }

    function initializePlayerSettings() {
        const settings = getSettings();
        const playerEnabledCheckbox =
            section.querySelector("#ti_player_enabled");
        const playerControls = section.querySelector("#ti_player_controls");
        const lockCheckbox = section.querySelector("#ti_player_locked");
        function populateBubbleStyles() {
            const settings = getSettings();
            const select = section.querySelector("#ti_bubble_style_select");
            const htmlTextarea = section.querySelector("#ti_bubble_html");
            const cssTextarea = section.querySelector("#ti_bubble_css");

            if (!select) return;

            select.innerHTML = settings.bubbleStyles
                .map(
                    (style) =>
                        `<option value="${style.id}" ${
                            style.id === settings.selectedBubbleStyleId
                                ? "selected"
                                : ""
                        }>${style.name}</option>`,
                )
                .join("");

            const currentStyle = settings.bubbleStyles.find(
                (s) => s.id === settings.selectedBubbleStyleId,
            );
            if (htmlTextarea) htmlTextarea.value = currentStyle?.html || "";
            if (cssTextarea) cssTextarea.value = currentStyle?.css || "";
            bubbleReadme.load(currentStyle?.readme);
            updateBubblePreview();
        }

        function updateBubblePreview() {
            const previewArea = section.querySelector(
                "#ti_bubble_preview_area",
            );
            const htmlTextarea = section.querySelector("#ti_bubble_html");
            const cssTextarea = section.querySelector("#ti_bubble_css");

            if (!previewArea || !htmlTextarea || !cssTextarea) return;

            const html = htmlTextarea.value
                .replace(/\{\{title\}\}/g, t`Sample Song`)
                .replace(/\{\{artist\}\}/g, t`Sample Artist`);

            let tempStyle = document.getElementById("ti-bubble-preview-style");
            if (!tempStyle) {
                tempStyle = document.createElement("style");
                tempStyle.id = "ti-bubble-preview-style";
                document.head.appendChild(tempStyle);
            }
            tempStyle.textContent = cssTextarea.value;

            previewArea.innerHTML = html;
        }

        function setupBubbleStyleEventListeners() {
            const enableCheckbox = section.querySelector("#ti_bubble_enabled");
            const controls = section.querySelector("#ti_bubble_controls");
            const select = section.querySelector("#ti_bubble_style_select");
            const htmlTextarea = section.querySelector("#ti_bubble_html");
            const cssTextarea = section.querySelector("#ti_bubble_css");

            if (!enableCheckbox || !controls) return;

            enableCheckbox.addEventListener("change", (e) => {
                const settings = getSettings();
                settings.enableBubbleReplacement = e.target.checked;
                controls.style.display = e.target.checked ? "block" : "none";
                saveSettingsDebounced();
                applyBubbleStyles();
            });

            if (select) {
                select.addEventListener("change", () => {
                    const settings = getSettings();
                    settings.selectedBubbleStyleId = select.value;
                    saveSettingsDebounced();
                    populateBubbleStyles();
                    applyBubbleStyles();
                    refreshAllBubbles();
                });
            }

            const bubbleInfoBtn = section.querySelector("#ti_bubble_info");
            if (bubbleInfoBtn) {
                bubbleInfoBtn.addEventListener("click", () => {
                    const settings = getSettings();
                    const style = settings.bubbleStyles.find(
                        (s) => s.id === settings.selectedBubbleStyleId,
                    );
                    if (!style) return;
                    bubbleReadme.infoClick(style);
                });
            }

            const saveBtn = section.querySelector("#ti_bubble_save");
            if (saveBtn) {
                saveBtn.addEventListener("click", () => {
                    const settings = getSettings();
                    const style = settings.bubbleStyles.find(
                        (s) => s.id === settings.selectedBubbleStyleId,
                    );
                    if (style) {
                        style.html = htmlTextarea.value;
                        style.css = cssTextarea.value;
                        const hasReadme = bubbleReadme.save(style);
                        saveSettingsDebounced();
                        applyBubbleStyles();
                        refreshAllBubbles();
                        savedToast(style.name, hasReadme);
                    }
                });
            }

            const addBtn = section.querySelector("#ti_bubble_add");
            if (addBtn) {
                addBtn.addEventListener("click", () => {
                    const name = prompt(t`Style Name`);
                    if (!name) return;

                    const settings = getSettings();
                    const newStyle = {
                        id: "bubble_" + Date.now(),
                        name: name,
                        html: "",
                        css: "",
                    };
                    settings.bubbleStyles.push(newStyle);
                    settings.selectedBubbleStyleId = newStyle.id;
                    saveSettingsDebounced();
                    populateBubbleStyles();
                    openEditorAfterCreate(
                        "#ti_bubble_editor_details",
                        "#ti_bubble_html",
                    );
                });
            }

            const renameBtn = section.querySelector("#ti_bubble_rename");
            if (renameBtn) {
                renameBtn.addEventListener("click", () => {
                    const settings = getSettings();
                    const style = settings.bubbleStyles.find(
                        (s) => s.id === settings.selectedBubbleStyleId,
                    );
                    if (!style) return;

                    const newName = prompt(t`Enter new name:`, style.name);
                    if (newName && newName.trim()) {
                        style.name = newName.trim();
                        saveSettingsDebounced();
                        populateBubbleStyles();
                        toastr.success(t`Style renamed.`);
                    }
                });
            }

            const delBtn = section.querySelector("#ti_bubble_del");
            if (delBtn) {
                delBtn.addEventListener("click", () => {
                    const settings = getSettings();
                    if (settings.bubbleStyles.length <= 1) {
                        toastr.warning(t`Cannot delete the last style.`);
                        return;
                    }
                    const style = settings.bubbleStyles.find(
                        (s) => s.id === settings.selectedBubbleStyleId,
                    );
                    if (!style) return;
                    if (confirm(t`Delete this style?`)) {
                        if (style.isBuiltIn) {
                            if (!settings.deletedBuiltIns) {
                                settings.deletedBuiltIns = {
                                    themes: [],
                                    textPresets: [],
                                    bubbleStyles: [],
                                };
                            }
                            if (
                                !settings.deletedBuiltIns.bubbleStyles.includes(
                                    style.id,
                                )
                            ) {
                                settings.deletedBuiltIns.bubbleStyles.push(
                                    style.id,
                                );
                            }
                        }
                        settings.bubbleStyles = settings.bubbleStyles.filter(
                            (s) => s.id !== settings.selectedBubbleStyleId,
                        );
                        settings.selectedBubbleStyleId =
                            settings.bubbleStyles[0].id;
                        saveSettingsDebounced();
                        if (typeof saveSettings === "function") {
                            saveSettings();
                        }
                        populateBubbleStyles();
                        applyBubbleStyles();
                    }
                });
            }

            const importBtn = section.querySelector("#ti_bubble_import");
            if (importBtn) {
                importBtn.addEventListener("click", () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "application/json,.json";
                    input.onchange = (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            try {
                                const imported = JSON.parse(
                                    event.target.result,
                                );

                                if (!imported.name || !imported.html) {
                                    throw new Error(
                                        t`Invalid bubble style format.`,
                                    );
                                }

                                const settings = getSettings();
                                const newStyle = {
                                    id: imported.id || "bubble_" + Date.now(),
                                    name: imported.name,
                                    html: imported.html || "",
                                    css: imported.css || "",
                                    isBuiltIn: false,
                                };
                                if (imported.readme) {
                                    newStyle.readme = imported.readme;
                                }

                                const existingIndex =
                                    settings.bubbleStyles.findIndex(
                                        (s) => s.id === newStyle.id,
                                    );
                                if (existingIndex !== -1) {
                                    settings.bubbleStyles[existingIndex] =
                                        newStyle;
                                } else {
                                    settings.bubbleStyles.push(newStyle);
                                }

                                settings.selectedBubbleStyleId = newStyle.id;
                                saveSettingsDebounced();
                                populateBubbleStyles();
                                applyBubbleStyles();
                                refreshAllBubbles();
                                toastr.success(
                                    t`Bubble style "${newStyle.name}" imported.`,
                                );
                            } catch (error) {
                                toastr.error(
                                    t`Failed to import bubble style: ${error.message}`,
                                );
                            }
                        };
                        reader.readAsText(file);
                    };
                    input.click();
                });
            }

            const exportBtn = section.querySelector("#ti_bubble_export");
            if (exportBtn) {
                exportBtn.addEventListener("click", () => {
                    const settings = getSettings();
                    const style = settings.bubbleStyles.find(
                        (s) => s.id === settings.selectedBubbleStyleId,
                    );
                    if (!style) return;

                    const exportData = { ...style };
                    exportData._metadata = {
                        exportedAt: new Date().toISOString(),
                        exportedBy:
                            "SillyTavern Typing Indicator Themes Extension",
                        type: "bubble-style",
                    };

                    const blob = new Blob(
                        [JSON.stringify(exportData, null, 2)],
                        {
                            type: "application/json",
                        },
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${style.name.replace(
                        /[\\/*?:"<>|]/g,
                        "_",
                    )} [Bubble].json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    a.remove();

                    toastr.success(t`Bubble style "${style.name}" exported.`);
                });
            }

            if (htmlTextarea) {
                htmlTextarea.addEventListener("input", updateBubblePreview);
            }
            if (cssTextarea) {
                cssTextarea.addEventListener("input", updateBubblePreview);
            }

            populateBubbleStyles();
            applyBubbleStyles();
        }

        playerEnabledCheckbox.addEventListener("change", (e) => {
            settings.playerEnabled = e.target.checked;

            const sectionsToToggle = [
                section.querySelector("#ti_player_controls"),
                section.querySelector("#ti_player_theme_section"),
            ];

            sectionsToToggle.forEach((el) => {
                if (el) el.style.display = e.target.checked ? "block" : "none";
            });

            saveSettingsDebounced();

            if (settings.playerEnabled) {
                showPlayer();
                if (typeof window._tiPlaylistLazyLoad === "function") {
                    window._tiPlaylistLazyLoad();
                }
            } else {
                hidePlayer();
            }
        });

        const hiddenCheckbox = section.querySelector("#ti_player_hidden");
        if (hiddenCheckbox) {
            hiddenCheckbox.addEventListener("change", (e) => {
                const settings = getSettings();
                settings.playerHidden = e.target.checked;
                saveSettingsDebounced();

                const player = document.getElementById("music_player");
                if (player) {
                    if (e.target.checked) {
                        player.style.setProperty(
                            "display",
                            "none",
                            "important",
                        );
                    } else {
                        player.style.setProperty(
                            "display",
                            "block",
                            "important",
                        );
                    }
                }
            });
        }
        const autoHideCheckbox = section.querySelector("#ti_player_auto_hide");
        if (autoHideCheckbox) {
            autoHideCheckbox.addEventListener("change", (e) => {
                const settings = getSettings();
                settings.playerAutoHide = e.target.checked;
                saveSettingsDebounced();

                if (e.target.checked) {
                    if (settings.playerEnabled && !settings.playerHidden) {
                        setupPlayerAutoHide();
                    }
                } else {
                    removePlayerAutoHide();
                }
            });
        }

        lockCheckbox.addEventListener("change", (e) => {
            settings.playerPosition.locked = e.target.checked;
            saveSettingsDebounced();

            const player = document.getElementById("music_player");
            if (player) {
                const oldHandle = player.querySelector(".ti-drag-handle");
                if (oldHandle) oldHandle.remove();
                if (!settings.playerPosition.locked) {
                    makeDraggable(player, "player");
                } else {
                    player.style.cursor = "default";
                }
            }
        });

        section
            .querySelector("#ti_player_reset")
            .addEventListener("click", () => {
                settings.playerPosition.x = 50;
                settings.playerPosition.y = 50;
                settings.playerPosition.locked = false;

                if (lockCheckbox) {
                    lockCheckbox.checked = false;
                }

                saveSettingsDebounced();
                toastr.success(t`Position has been reset.`, "", {
                    timeOut: 500,
                });

                const player = document.getElementById("music_player");
                if (player) {
                    player.style.transition = "left 0.3s ease, top 0.3s ease";
                    player.style.left = `${window.innerWidth / 2}px`;
                    player.style.top = `${window.innerHeight / 2}px`;
                    player.style.transform = "translate(-50%, -50%)";

                    setTimeout(() => {
                        if (player) {
                            player.style.transition = "";
                        }
                    }, 300);
                    const oldHandle = player.querySelector(".ti-drag-handle");
                    if (oldHandle) oldHandle.remove();
                    makeDraggable(player, "player");
                }
            });
        populatePlayerThemes();
        setupPlayerThemeEventListeners();
        setupBubbleStyleEventListeners();
        setupLyricsEventListeners();
        function updateCacheStats() {
            const statsDiv = section.querySelector("#ti_cache_stats");
            if (!statsDiv) return;

            const stats = MusicCache.getStats();
            const size = MusicCache.getSize();

            statsDiv.innerHTML = `
<div style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
    ${(() => {
        const chipStyle =
            "background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px; font-size: 0.9em; white-space: nowrap;";
        return `
            <span style="${chipStyle}">${t`Songs`}: <b>${
                stats.search
            }</b></span>
            <span style="${chipStyle}">${t`Audio`}: <b>${stats.audio}</b></span>
            <span style="${chipStyle}">${t`Lyrics`}: <b>${
                stats.lyrics
            }</b></span>
            <span style="${chipStyle}">${t`Covers`}: <b>${
                stats.cover
            }</b></span>
        `;
    })()}

    <span style="font-size: 0.8em; opacity: 0.6; margin-left: auto;">
        📦${t`Cache size`}: ${size.formatted}
    </span>
</div>
`;
        }

        updateCacheStats();
        setupListeningStatsUI();
        if (window._tiCacheStatsTimer) {
            clearInterval(window._tiCacheStatsTimer);
        }
        window._tiCacheStatsTimer = setInterval(() => {
            const statsDiv = section.querySelector("#ti_cache_stats");
            if (!statsDiv || !statsDiv.isConnected) {
                clearInterval(window._tiCacheStatsTimer);
                window._tiCacheStatsTimer = null;
                return;
            }
            updateCacheStats();
        }, 100000);

        const clearCacheBtn = section.querySelector("#ti_cache_clear");
        if (clearCacheBtn) {
            clearCacheBtn.addEventListener("click", () => {
                if (
                    confirm(
                        t`Clear all music cache? You will need to search songs again.`,
                    )
                ) {
                    MusicCache.clear();
                    lastSentPlaylist = null;
                    const playerIframe = document.querySelector(
                        "#music_player .theme-iframe",
                    );
                    if (playerIframe && playerIframe.contentWindow) {
                        playerIframe.contentWindow.postMessage(
                            {
                                source: "typing-indicator-host",
                                type: "cache-cleared",
                            },
                            "*",
                        );
                        playerIframe.contentWindow.postMessage(
                            {
                                source: "typing-indicator-host",
                                type: "context-update",
                                data: {
                                    ...getCurrentCharContext(),
                                    playlist: [],
                                },
                            },
                            "*",
                        );
                    }

                    isPlaylistReady = false;
                    buildAndSetInitialPlaylist();

                    updateCacheStats();
                    toastr.success(t`Cache cleared`);
                }
            });
        }

        const cleanupCacheBtn = section.querySelector("#ti_cache_cleanup");
        if (cleanupCacheBtn) {
            cleanupCacheBtn.addEventListener("click", () => {
                MusicCache.cleanup();
                updateCacheStats();
                toastr.success(t`Expired cache cleaned`);
            });
        }

        function setupLyricsEventListeners() {
            const lyricsEnabledCheckbox =
                section.querySelector("#ti_lyrics_enabled");
            const lyricsControls = section.querySelector("#ti_lyrics_controls");

            if (!lyricsEnabledCheckbox) return;
            let colorUpdateTimeout = null;
            const debouncedRefreshLyrics = () => {
                clearTimeout(colorUpdateTimeout);
                colorUpdateTimeout = setTimeout(() => {
                    refreshLyricsOverlay();
                }, 150);
            };

            lyricsEnabledCheckbox.addEventListener("change", (e) => {
                const settings = getSettings();
                settings.lyricsEnabled = e.target.checked;
                lyricsControls.style.display = e.target.checked
                    ? "block"
                    : "none";
                saveSettingsDebounced();

                if (e.target.checked) {
                    if (currentLyrics.length > 0) {
                        showLyricsOverlay();
                    } else if (currentPlayerTrack) {
                        const playerIframe = document.querySelector(
                            "#music_player .theme-iframe",
                        );
                        if (playerIframe && playerIframe.contentWindow) {
                            playerIframe.contentWindow.postMessage(
                                {
                                    source: "typing-indicator-host",
                                    type: "request-playback-state",
                                },
                                "*",
                            );
                        }
                    }
                } else {
                    hideLyricsOverlay();
                }
            });

            const sungColorInput = section.querySelector(
                "#ti_lyrics_sung_color",
            );
            if (sungColorInput) {
                sungColorInput.addEventListener("input", (e) => {
                    const settings = getSettings();
                    settings.lyricsSungColor = e.target.value;
                    saveSettingsDebounced();
                    debouncedRefreshLyrics();
                });
            }

            const unsungColorInput = section.querySelector(
                "#ti_lyrics_unsung_color",
            );
            if (unsungColorInput) {
                unsungColorInput.addEventListener("input", (e) => {
                    const settings = getSettings();
                    settings.lyricsUnsungColor = e.target.value;
                    saveSettingsDebounced();
                    debouncedRefreshLyrics();
                });
            }

            const backgroundInput = section.querySelector(
                "#ti_lyrics_background",
            );
            if (backgroundInput) {
                backgroundInput.addEventListener("change", (e) => {
                    const settings = getSettings();
                    settings.lyricsBackground = e.target.value;
                    saveSettingsDebounced();
                    refreshLyricsOverlay();
                });
            }
            const backgroundPicker = section.querySelector(
                "#ti_lyrics_background_picker",
            );
            if (backgroundPicker && backgroundInput) {
                backgroundPicker.addEventListener("input", (e) => {
                    const hex = e.target.value;
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    const newValue = `rgba(${r}, ${g}, ${b}, 0.6)`;
                    backgroundInput.value = newValue;
                    const settings = getSettings();
                    settings.lyricsBackground = newValue;
                    saveSettingsDebounced();
                    refreshLyricsOverlay();
                });
            }
            const fontSizeInput = section.querySelector("#ti_lyrics_font_size");
            if (fontSizeInput) {
                fontSizeInput.addEventListener("change", (e) => {
                    const settings = getSettings();
                    settings.lyricsFontSize = parseInt(e.target.value) || 18;
                    saveSettingsDebounced();
                    refreshLyricsOverlay();
                });
            }

            const showNextCheckbox = section.querySelector(
                "#ti_lyrics_show_next",
            );
            if (showNextCheckbox) {
                showNextCheckbox.addEventListener("change", (e) => {
                    const settings = getSettings();
                    settings.lyricsShowNextLine = e.target.checked;
                    _autoShowTranslationFlag = null;
                    saveSettingsDebounced();
                    refreshLyricsOverlay();
                });
            }

            const lockedCheckbox = section.querySelector("#ti_lyrics_locked");
            if (lockedCheckbox) {
                lockedCheckbox.addEventListener("change", (e) => {
                    const settings = getSettings();
                    settings.lyricsPosition.locked = e.target.checked;
                    saveSettingsDebounced();
                    refreshLyricsOverlay();
                });
            }

            const resetPositionBtn = section.querySelector(
                "#ti_lyrics_reset_position",
            );
            if (resetPositionBtn) {
                resetPositionBtn.addEventListener("click", () => {
                    const settings = getSettings();
                    settings.lyricsPosition.x = 50;
                    settings.lyricsPosition.y = 10;
                    settings.lyricsPosition.locked = false;

                    const lockedCb = section.querySelector("#ti_lyrics_locked");
                    if (lockedCb) lockedCb.checked = false;

                    saveSettingsDebounced();
                    refreshLyricsOverlay();
                    toastr.success(t`Lyrics position reset.`);
                });
            }

            const testBtn = section.querySelector("#ti_lyrics_test");

            if (testBtn) {
                testBtn.addEventListener("click", () => {
                    const settings = getSettings();

                    if (lyricsTestInterval) {
                        clearInterval(lyricsTestInterval);
                        lyricsTestInterval = null;
                        if (savedTestLyrics !== null) {
                            currentLyrics = savedTestLyrics;
                            currentLyricIndex = savedTestLyricIndex;
                            savedTestLyrics = null;
                            savedTestLyricIndex = -1;
                        }
                        if (currentLyrics.length === 0 || !wasLyricsPlaying) {
                            hideLyricsOverlay();
                        } else {
                            lastLyricsProgress = -1;
                            showLyricsOverlay();
                        }

                        wasLyricsPlaying = false;
                        testBtn.classList.remove("fa-eye-slash");
                        testBtn.classList.add("fa-eye");
                        testBtn.title = t`Preview Lyrics`;
                        return;
                    }

                    if (!settings.lyricsEnabled) {
                        settings.lyricsEnabled = true;
                        const lyricsEnabledCheckbox =
                            section.querySelector("#ti_lyrics_enabled");
                        if (lyricsEnabledCheckbox)
                            lyricsEnabledCheckbox.checked = true;
                        const lyricsControls = section.querySelector(
                            "#ti_lyrics_controls",
                        );
                        if (lyricsControls)
                            lyricsControls.style.display = "block";
                        saveSettingsDebounced();
                    }
                    savedTestLyrics =
                        currentLyrics.length > 0 ? [...currentLyrics] : [];
                    savedTestLyricIndex = currentLyricIndex;
                    wasLyricsPlaying =
                        currentLyrics.length > 0 && currentLyricIndex >= 0;
                    currentLyrics = [
                        {
                            time: 0,
                            text: t`This is the first test lyric line`,
                            translated: t`Test translation 1`,
                        },
                        {
                            time: 3,
                            text: t`This is the second test lyric line`,
                            translated: t`Test translation 2`,
                        },
                        {
                            time: 6,
                            text: t`Lyrics scroll with time`,
                            translated: t`Scroll demo`,
                        },
                        {
                            time: 9,
                            text: t`Color gradient effect test`,
                            translated: t`Gradient demo`,
                        },
                    ];

                    currentLyricIndex = -1;
                    lastLyricsProgress = -1;
                    showLyricsOverlay();

                    testBtn.classList.remove("fa-eye");
                    testBtn.classList.add("fa-eye-slash");
                    testBtn.title = t`Stop Preview`;

                    let testTime = 0;
                    lyricsTestInterval = setInterval(() => {
                        testTime += 0.1;
                        updateLyricsDisplay(testTime);
                        if (testTime >= 12) {
                            testTime = 0;
                            currentLyricIndex = -1;
                            lastLyricsProgress = -1;
                        }
                    }, 100);
                });
            }
        }

        function setupListeningStatsUI() {
            function updateStatsDisplay() {
                const statsDiv = section.querySelector("#ti_listening_stats");
                if (!statsDiv) return;

                const charStats = getCurrentCharStats();

                if (!charStats || !charStats.charName) {
                    statsDiv.innerHTML = `
                <div style="text-align: center; color: var(--SmartThemeBodyColor); opacity: 0.6;">
                    ${t`Select a character to view stats`}
                </div>
            `;
                    return;
                }

                let currentSessionTime = 0;
                if (
                    listeningSession.isPlaying &&
                    listeningSession.startTime &&
                    listeningSession.charAvatar === charStats.charAvatar
                ) {
                    currentSessionTime =
                        Date.now() - listeningSession.startTime;
                }

                const totalTimeWithCurrent =
                    charStats.totalTime + currentSessionTime;
                const isCurrentlyPlaying = currentSessionTime > 0;

                const avatarUrl = getThumbnailUrl(
                    "avatar",
                    charStats.charAvatar,
                );

                statsDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${avatarUrl}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid ${isCurrentlyPlaying ? "#889095ff" : "var(--SmartThemeBorderColor)"};">
                <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 1.1em; margin-bottom: 4px;">
                        ${charStats.charName}
                        ${isCurrentlyPlaying ? '<span style="color: #889095ff; font-size: 0.8em;"> ♪ ' + t`Playing` + "</span>" : ""}
                    </div>
                    <div style="display: flex; gap: 16px; font-size: 0.9em; color: var(--SmartThemeBodyColor);">
                        <span>${t`Total`}: <b>${formatListeningTime(totalTimeWithCurrent)}</b></span>
                        <span>${t`Sessions`}: <b>${charStats.sessions}</b></span>
                    </div>
                </div>
            </div>
        `;
            }

            updateStatsDisplay();
            listeningStatsUpdateCallback = updateStatsDisplay;
        }
    }

    function initializePlaylistSettings() {
        const settings = getSettings();

        const modeSelect = section.querySelector(
            "#ti_playlist_source_mode_select",
        );
        const sourceModeDescEl = section.querySelector("#ti_source_mode_desc");
        const charEnableCb = section.querySelector(
            "#ti_enable_character_playlist",
        );
        const charAutoSwitchCb = section.querySelector(
            "#ti_auto_switch_character_playlist",
        );
        const rememberProgressCb = section.querySelector(
            "#ti_remember_playback_progress",
        );
        const charPlaylistSelect = section.querySelector(
            "#ti_character_playlist_select",
        );
        const charPlaylistRow = section.querySelector(
            "#ti_character_playlist_row",
        );
        const playlistSelect = section.querySelector("#ti_playlist_select");
        const playAllBtn = section.querySelector("#ti_playlist_play_all");
        const infoBtn = section.querySelector("#ti_playlist_info");
        const addBtn = section.querySelector("#ti_playlist_add");
        const saveBtn = section.querySelector("#ti_playlist_save");
        const renameBtn = section.querySelector("#ti_playlist_rename");
        const deleteBtn = section.querySelector("#ti_playlist_delete");
        const importJsonBtn = section.querySelector("#ti_playlist_import_json");
        const exportJsonBtn = section.querySelector("#ti_playlist_export_json");
        const importUrlBtn = section.querySelector("#ti_import_url_btn");
        const importUrlInput = section.querySelector("#ti_import_url");
        const songListEl = section.querySelector("#ti_song_list");
        const songCountEl = section.querySelector("#ti_song_count");
        const songSearchInput = section.querySelector("#ti_song_search");
        const songFooter = section.querySelector("#ti_song_list_footer");
        const songProgressEl = section.querySelector("#ti_song_list_progress");
        const pagePrevBtn = section.querySelector("#ti_song_page_prev");
        const pageNextBtn = section.querySelector("#ti_song_page_next");
        const pageInput = section.querySelector("#ti_song_page_input");
        const pageTotalEl = section.querySelector("#ti_song_page_total");
        const multiToggleBtn = section.querySelector("#ti_song_multi_select");
        const multiActions = section.querySelector("#ti_song_multi_actions");
        const multiSelectedCount = section.querySelector(
            "#ti_song_selected_count",
        );
        const multiSelectAllBtn = section.querySelector("#ti_song_select_all");
        const multiRemoveBtn = section.querySelector("#ti_song_multi_remove");
        const multiCancelBtn = section.querySelector("#ti_song_multi_cancel");

        if (!playlistSelect) return;

        function updateSourceModeDesc() {
            const mode = settings.playlistSourceMode || "mixed";
            const descMap = {
                mixed: t`World book + chat BGM + current playlist combined. Recommended for daily use.`,
                playlist_only: t`Only play the selected playlist. Ignores world book and chat BGM.`,
                character_playlist: t`Follow the playlist bound to the current character.`,
                chat_only: t`Only play BGM tags from chat history. Scans all non-hidden messages.`,
            };
            if (sourceModeDescEl) {
                sourceModeDescEl.textContent = descMap[mode] || "";
            }
            updateCharacterPlaylistWarning();
        }

        function updateCharacterPlaylistWarning() {
            const warningEl = section.querySelector(
                "#ti_character_playlist_warning",
            );
            const warningText = section.querySelector(
                "#ti_character_playlist_warning_text",
            );
            if (!warningEl || !warningText) return;

            const mode = settings.playlistSourceMode || "mixed";
            if (mode !== "character_playlist") {
                warningEl.style.display = "none";
                return;
            }

            const charAvatar =
                this_chid !== undefined && characters[this_chid]
                    ? characters[this_chid].avatar
                    : null;
            const boundId =
                charAvatar && settings.characterPlaylists
                    ? settings.characterPlaylists[charAvatar]
                    : null;

            if (!charAvatar) {
                warningText.textContent = t`Currently in character playlist mode, but no character is selected. Open a character chat first.`;
                warningEl.style.display = "block";
            } else if (!boundId) {
                const charName =
                    characters[this_chid]?.name || t`current character`;
                warningText.textContent = t`Currently in character playlist mode, but "${charName}" has no playlist bound. Enable the option below and pick one, otherwise playback will be empty.`;
                warningEl.style.display = "block";
            } else {
                warningEl.style.display = "none";
            }
        }
        updateSourceModeDesc();

        function refreshPlaylistSelect() {
            const list = _playlistState.all;
            const currentId = _playlistState.currentId;
            if (list.length === 0) {
                playlistSelect.innerHTML = `<option value="">-- ${t`No playlists yet`} --</option>`;
            } else {
                playlistSelect.innerHTML = list
                    .map(
                        (p) =>
                            `<option value="${p.id}" ${p.id === currentId ? "selected" : ""}>${escapeHtml(p.name)} (${p.songCount || 0})</option>`,
                    )
                    .join("");
            }
        }

        function refreshCharPlaylistSelect() {
            const list = _playlistState.all;
            const charAvatar =
                this_chid !== undefined && characters[this_chid]
                    ? characters[this_chid].avatar
                    : null;
            const boundId =
                charAvatar && settings.characterPlaylists
                    ? settings.characterPlaylists[charAvatar] || ""
                    : "";
            charPlaylistSelect.innerHTML =
                `<option value="">-- ${t`None`} --</option>` +
                list
                    .map(
                        (p) =>
                            `<option value="${p.id}" ${p.id === boundId ? "selected" : ""}>${escapeHtml(p.name)}</option>`,
                    )
                    .join("");
        }

        function updateMultiSelectCount() {
            const n = _playlistState.selectedSongIndices.size;
            multiSelectedCount.textContent = String(n);
        }

        function renderSongList() {
            if (!_playlistState.current) {
                songListEl.innerHTML = `<div class="ti-song-list-empty">${t`Select a playlist to view songs`}</div>`;
                songCountEl.textContent = `0 ${t`songs`}`;
                songFooter.style.display = "none";
                return;
            }
            // 在线搜索模式分支
            if (_playlistState.searchMode !== "local") {
                const results = _playlistState.onlineResults || [];
                const kw = (songSearchInput?.value || "").trim();

                if (_playlistState.onlineSearching) {
                    songCountEl.textContent = t`Searching...`;
                    songListEl.innerHTML = `<div class="ti-song-list-empty"><span class="ti-spinner"></span>${t`Searching...`}</div>`;
                    songFooter.style.display = "none";
                    return;
                }

                if (results.length === 0) {
                    songCountEl.textContent = kw
                        ? t`Click search to look up`
                        : t`Enter keywords`;
                    const searchIconHtml = `<i class="fa-solid fa-magnifying-glass" style="opacity:0.7;margin:0 2px;"></i>`;
                    const emptyTextHtml = kw
                        ? t`Click ${searchIconHtml} to search "${kw}"`
                        : t`Type keywords, then click ${searchIconHtml} to search online`;
                    songListEl.innerHTML = `<div class="ti-song-list-empty">${emptyTextHtml}</div>`;
                    songFooter.style.display = "none";
                    return;
                }

                songCountEl.textContent = `${results.length} ${t`results`}`;

                const html = results
                    .map((s, i) => {
                        const cover = s.cover || "/img/ai4.png";
                        const artistLine = s.artist || t`Unknown Artist`;
                        const isPlayingThis =
                            currentPlayerTrack &&
                            fuzzyMatchTrack(
                                s.title || "",
                                s.artist || "",
                                currentPlayerTrack,
                            );
                        const isPaused =
                            isPlayingThis && !listeningSession.isPlaying;
                        const onlineKey = `${(s.title || "").toLowerCase()}|${(s.artist || "").toLowerCase()}`;
                        const isLoading =
                            !isPlayingThis && _loadingSongKey === onlineKey;
                        let stateCls = "";
                        if (isLoading) stateCls = " loading";
                        else if (isPlayingThis)
                            stateCls = isPaused
                                ? " playing paused"
                                : " playing";
                        const prefixHtml = isLoading
                            ? `<span class="ti-song-loading-dot"></span>`
                            : isPlayingThis
                              ? `<span class="ti-song-playing-bars"><span></span><span></span><span></span></span>`
                              : "";
                        return `
                        <div class="ti-song-item ti-song-item-online${stateCls}" data-online-index="${i}">
                            <img class="ti-song-item-cover" src="${escapeHtml(cover)}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/img/ai4.png'">
                            <div class="ti-song-item-info">
                                <div class="ti-song-item-title">${prefixHtml}${escapeHtml(s.title || t`Unknown Title`)}</div>
                                <div class="ti-song-item-artist">${escapeHtml(artistLine)} · ${escapeHtml(s.sourceLabel || "")}</div>
                            </div>
                            <div class="ti-song-item-actions">
                                <button class="ti-song-btn" data-online-action="add" data-online-index="${i}" title="${t`Add to current playlist`}">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button class="ti-song-btn" data-online-action="more" data-online-index="${i}" title="${t`More`}">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                            </div>
                        </div>`;
                    })
                    .join("");

                songListEl.innerHTML = html;
                const curPage = _playlistState.onlineCurrentPage || 1;
                const hasMore = !!_playlistState.onlineHasMore;
                if (curPage > 1 || hasMore) {
                    songFooter.style.display = "flex";
                    if (pageInput) {
                        pageInput.value = curPage;
                        pageInput.max = hasMore ? curPage + 1 : curPage;
                    }
                    if (pageTotalEl) {
                        pageTotalEl.textContent = hasMore
                            ? `${curPage}+`
                            : curPage;
                    }
                    if (pagePrevBtn) pagePrevBtn.disabled = curPage <= 1;
                    if (pageNextBtn) pageNextBtn.disabled = !hasMore;
                    if (songProgressEl) songProgressEl.textContent = "";
                } else {
                    songFooter.style.display = "none";
                }
                return;
            }

            const songs = _playlistState.current.songs || [];
            const filter = _playlistState.songFilter.toLowerCase().trim();
            const settingsForBadge = getSettings();
            const progressKeyForBadge = getProgressKey(
                settingsForBadge.playlistSourceMode,
                _playlistState.currentId,
            );
            const lastPlayedForList =
                settingsForBadge.rememberPlaybackProgress && progressKeyForBadge
                    ? settingsForBadge.lastPlaybackProgress?.[
                          progressKeyForBadge
                      ]
                    : null;

            let filteredSongs = songs;
            let filteredIndexMap = null;
            if (filter) {
                filteredIndexMap = [];
                filteredSongs = [];
                songs.forEach((s, idx) => {
                    const title = (s.title || "").toLowerCase();
                    const artist = (s.artist || "").toLowerCase();
                    if (title.includes(filter) || artist.includes(filter)) {
                        filteredSongs.push(s);
                        filteredIndexMap.push(idx);
                    }
                });
            }

            songCountEl.textContent = filter
                ? `${filteredSongs.length} / ${songs.length} ${t`songs`}`
                : `${songs.length} ${t`songs`}`;

            if (filteredSongs.length === 0) {
                songListEl.innerHTML = `<div class="ti-song-list-empty">${filter ? t`No matching songs` : t`This playlist is empty`}</div>`;
                songFooter.style.display = "none";
                return;
            }

            const pageSize = _playlistState.songPageSize;
            const totalPages = Math.max(
                1,
                Math.ceil(filteredSongs.length / pageSize),
            );
            if (_playlistState.songCurrentPage > totalPages)
                _playlistState.songCurrentPage = totalPages;
            if (_playlistState.songCurrentPage < 1)
                _playlistState.songCurrentPage = 1;

            const startIdx = (_playlistState.songCurrentPage - 1) * pageSize;
            const endIdx = Math.min(startIdx + pageSize, filteredSongs.length);
            const visible = filteredSongs.slice(startIdx, endIdx);
            const selectedSet = _playlistState.selectedSongIndices;

            const html = visible
                .map((s, i) => {
                    const originalIdx = filteredIndexMap
                        ? filteredIndexMap[startIdx + i]
                        : startIdx + i;
                    const isSelected = selectedSet.has(originalIdx);
                    const sArtistStr = Array.isArray(s.artist)
                        ? s.artist.join(",")
                        : s.artist || "";
                    const isInvalidCover = (url) => {
                        if (!url) return true;
                        if (!url.startsWith("http")) return true;
                        const midMatch = url.match(/M([0-9a-zA-Z]+)\.jpg/i);
                        if (midMatch && /^0+$/.test(midMatch[1])) return true;
                        if (url.includes("default_cover")) return true;
                        if (url.includes("meting") && /[?&]id=(&|$)/.test(url))
                            return true;
                        return false;
                    };

                    const normalizeCoverUrl = (url) => {
                        if (!url || typeof url !== "string") return url;
                        if (
                            /^https?:\/\/(y\.qq\.com|y\.gtimg\.cn)\//i.test(url)
                        ) {
                            return `/api/plugins/g-player-proxy/cover-proxy?url=${encodeURIComponent(url)}`;
                        }
                        return url;
                    };

                    let cover = normalizeCoverUrl(s.cover);
                    if (isInvalidCover(cover)) {
                        cover = "";
                        const cached = MusicCache.getSearch(
                            s.title || "",
                            sArtistStr,
                        );
                        if (cached && cached.id && cached.source) {
                            const cachedCover = normalizeCoverUrl(
                                MusicCache.getCover(cached.id, cached.source),
                            );
                            if (cachedCover && !isInvalidCover(cachedCover)) {
                                cover = cachedCover;
                            } else if (cached.coverUrl) {
                                const fixedCachedCoverUrl = normalizeCoverUrl(
                                    cached.coverUrl,
                                );
                                if (!isInvalidCover(fixedCachedCoverUrl)) {
                                    cover = fixedCachedCoverUrl;
                                }
                            }
                        }
                    }
                    cover = cover || "/img/ai4.png";
                    const isPlayingThis =
                        currentPlayerTrack &&
                        fuzzyMatchTrack(
                            s.title || "",
                            sArtistStr,
                            currentPlayerTrack,
                        );
                    const isPaused =
                        isPlayingThis && !listeningSession.isPlaying;
                    const songKey = `${(s.title || "").toLowerCase()}|${(sArtistStr || "").toLowerCase()}`;
                    const isLoading =
                        !isPlayingThis &&
                        _loadingSongKey &&
                        _loadingSongKey === songKey;
                    const isLastPlayed =
                        !isPlayingThis &&
                        !isLoading &&
                        lastPlayedForList &&
                        MusicUtils.isTitleMatch(
                            lastPlayedForList.title || "",
                            s.title || "",
                        ) &&
                        MusicUtils.isArtistMatch(
                            lastPlayedForList.artist || "",
                            sArtistStr,
                        );
                    let stateCls = "";
                    if (isLoading) stateCls = " loading";
                    else if (isPlayingThis)
                        stateCls = isPaused ? " playing paused" : " playing";
                    else if (isLastPlayed) stateCls = " last-played";
                    const prefixHtml = isLoading
                        ? `<span class="ti-song-loading-dot"></span>`
                        : isPlayingThis
                          ? `<span class="ti-song-playing-bars"><span></span><span></span><span></span></span>`
                          : "";
                    return `
                    <div class="ti-song-item${isSelected ? " selected" : ""}${stateCls}" data-index="${originalIdx}">
                        <img class="ti-song-item-cover" src="${escapeHtml(cover)}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/img/ai4.png'">
                        <div class="ti-song-item-info">
                            <div class="ti-song-item-title">${prefixHtml}${escapeHtml(s.title || t`Unknown Title`)}</div>
                            <div class="ti-song-item-artist">${escapeHtml(s.artist || t`Unknown Artist`)}</div>
                        </div>
                        <div class="ti-song-item-actions">
                            <button class="ti-song-btn" data-action="queue-next" data-index="${originalIdx}" title="${t`Play Next`}">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h8v-2H3v2zm0-7v2h12V6H3v2zm13 3v2h-2v2h2v2h2v-2h2v-2h-2V9h-2z"/></svg>
                            </button>
                            <button class="ti-song-btn" data-action="more" data-index="${originalIdx}" title="${t`More`}">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <button class="ti-song-btn danger" data-action="remove" data-index="${originalIdx}" title="${t`Remove from playlist`}">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>`;
                })
                .join("");

            let resumeBarHtml = "";
            let resumeIdx = -1;
            const lastPlayedIsCurrent =
                lastPlayedForList &&
                currentPlayerTrack &&
                MusicUtils.isTitleMatch(
                    lastPlayedForList.title || "",
                    currentPlayerTrack.title || currentPlayerTrack.name || "",
                ) &&
                MusicUtils.isArtistMatch(
                    lastPlayedForList.artist || "",
                    Array.isArray(currentPlayerTrack.artist)
                        ? currentPlayerTrack.artist.join(",")
                        : currentPlayerTrack.artist || "",
                );
            const dismissedInThisSession =
                _playlistState._dismissedResumeFor === _playlistState.currentId;
            if (
                lastPlayedForList &&
                !filter &&
                !lastPlayedIsCurrent &&
                !dismissedInThisSession
            ) {
                resumeIdx = songs.findIndex((s) => {
                    const sArt = Array.isArray(s.artist)
                        ? s.artist.join(",")
                        : s.artist || "";
                    return (
                        MusicUtils.isTitleMatch(
                            lastPlayedForList.title || "",
                            s.title || "",
                        ) &&
                        MusicUtils.isArtistMatch(
                            lastPlayedForList.artist || "",
                            sArt,
                        )
                    );
                });
                if (resumeIdx >= 0) {
                    const resumeSong = songs[resumeIdx];
                    const resumeArtist = Array.isArray(resumeSong.artist)
                        ? resumeSong.artist.join(" / ")
                        : resumeSong.artist || "";
                    resumeBarHtml = `
                        <div class="ti-song-resume-bar" data-action="resume-play" data-index="${resumeIdx}" title="${t`Click to jump to last played song`}">
                            <span class="ti-song-resume-bar-icon">▶</span>
                            <span class="ti-song-resume-bar-label">${t`Continue Playing`}</span>
                            <span class="ti-song-resume-bar-title">${escapeHtml(resumeSong.title || "")}</span>
                            <span class="ti-song-resume-bar-artist">${escapeHtml(resumeArtist)}</span>
                        </div>
                    `;
                }
            }

            songListEl.innerHTML = resumeBarHtml + html;

            if (filteredSongs.length > pageSize) {
                songFooter.style.display = "flex";
                if (pageInput) {
                    pageInput.value = _playlistState.songCurrentPage;
                    pageInput.max = totalPages;
                }
                if (pageTotalEl) pageTotalEl.textContent = totalPages;
                if (pagePrevBtn)
                    pagePrevBtn.disabled = _playlistState.songCurrentPage <= 1;
                if (pageNextBtn)
                    pageNextBtn.disabled =
                        _playlistState.songCurrentPage >= totalPages;
                if (songProgressEl) {
                    songProgressEl.textContent = `${filteredSongs.length} ${t`songs`}`;
                }
            } else {
                songFooter.style.display = "none";
            }

            if (typeof fetchMissingCovers === "function") {
                setTimeout(() => fetchMissingCovers(), 100);
            }
            requestAnimationFrame(() => {
                const targetItem =
                    songListEl?.querySelector(".ti-song-item.playing") ||
                    songListEl?.querySelector(".ti-song-item.last-played");
                if (targetItem && songListEl) {
                    const containerRect = songListEl.getBoundingClientRect();
                    const itemRect = targetItem.getBoundingClientRect();
                    const isOutOfView =
                        itemRect.top < containerRect.top ||
                        itemRect.bottom > containerRect.bottom;
                    if (isOutOfView) {
                        const targetOffset =
                            targetItem.offsetTop -
                            songListEl.offsetTop -
                            songListEl.clientHeight / 2 +
                            targetItem.clientHeight / 2;
                        songListEl.scrollTo({
                            top: Math.max(0, targetOffset),
                            behavior: "smooth",
                        });
                    }
                }
            });
        }
        let _coverFetchSeq = 0;
        async function fetchMissingCovers() {
            if (!_playlistState.current) return;
            const mySeq = ++_coverFetchSeq;
            const songs = _playlistState.current.songs || [];
            const items = Array.from(
                songListEl.querySelectorAll(".ti-song-item"),
            );
            const needsFetch = [];

            const isInvalidCoverUrl = (url) => {
                if (!url) return true;
                if (!url.startsWith("http")) return true;
                if (url.includes("/img/ai4.png")) return true;
                const midMatch = url.match(/M([0-9a-zA-Z]+)\.jpg/i);
                if (midMatch && /^0+$/.test(midMatch[1])) return true;
                if (url.includes("default_cover")) return true;
                if (url.includes("meting") && /[?&]id=(&|$)/.test(url))
                    return true;
                return false;
            };

            items.forEach((item) => {
                const idx = parseInt(item.dataset.index, 10);
                const song = songs[idx];
                if (!song) return;
                const imgEl = item.querySelector(".ti-song-item-cover");
                if (!imgEl) return;
                const currentSrc = imgEl.getAttribute("src") || "";
                if (!isInvalidCoverUrl(currentSrc)) {
                    return;
                }
                needsFetch.push({ song, imgEl });
            });

            if (needsFetch.length === 0) {
                verboseLog(`[Player][封面] 所有歌都有封面了，无需处理`);
                return;
            }
            verboseLog(
                `[Player][封面] 发现 ${needsFetch.length} 首歌缺/无效封面，开始主动获取`,
            );

            await asyncPool(3, needsFetch, async ({ song, imgEl }) => {
                if (mySeq !== _coverFetchSeq) return;
                const artistStr = Array.isArray(song.artist)
                    ? song.artist.join(",")
                    : song.artist || "";
                verboseLog(
                    `[Player][封面] 处理: "${song.title}" - "${artistStr}"`,
                );

                let cover = null;
                const cached = MusicCache.getSearch(song.title, artistStr);
                if (cached && cached.id && cached.source) {
                    const cachedCover =
                        MusicCache.getCover(cached.id, cached.source) ||
                        cached.coverUrl;
                    if (cachedCover && !isInvalidCoverUrl(cachedCover)) {
                        cover = cachedCover;
                        verboseLog(
                            `[Player][封面]   ↪ 从缓存拿到: ${cover.slice(0, 60)}...`,
                        );
                    }
                }

                if (!cover) {
                    verboseLog(
                        `[Player][封面]   ↪ 缓存没有有效图，跨源搜索...`,
                    );
                    for (const source of ["tencent", "netease", "kuwo"]) {
                        if (mySeq !== _coverFetchSeq) return;
                        try {
                            const resp = await fetch(
                                `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(song.title + " " + artistStr)}&source=${source}`,
                            );
                            if (!resp.ok) continue;
                            const data = await resp.json();
                            const list = data?.data || [];
                            for (const item of list) {
                                const itemTitle = item.song || item.name || "";
                                const itemArtist =
                                    item.singer || item.artist || "";
                                if (
                                    MusicUtils.isTitleMatch(
                                        song.title,
                                        itemTitle,
                                    ) &&
                                    MusicUtils.isArtistMatch(
                                        artistStr,
                                        itemArtist,
                                    )
                                ) {
                                    const candidate =
                                        item.cover || item.pic || "";
                                    if (
                                        candidate &&
                                        !isInvalidCoverUrl(candidate)
                                    ) {
                                        cover = candidate;
                                        verboseLog(
                                            `[Player][封面]   ↪ ✓ 从 ${source} 拿到有效封面`,
                                        );
                                        break;
                                    }
                                }
                            }
                            if (cover) break;
                        } catch (e) {
                            verboseLog(
                                `[Player][封面]   ↪ ${source} 搜索失败:`,
                                e.message,
                            );
                        }
                    }
                    if (!cover) {
                        verboseLog(`[Player][封面]   ↪ 所有源都没有有效封面`);
                    }
                }

                if (mySeq !== _coverFetchSeq) return;
                if (cover && imgEl.isConnected) {
                    const finalCover =
                        /^https?:\/\/(y\.qq\.com|y\.gtimg\.cn)\//i.test(cover)
                            ? `/api/plugins/g-player-proxy/cover-proxy?url=${encodeURIComponent(cover)}`
                            : cover;
                    imgEl.setAttribute("referrerpolicy", "no-referrer");
                    imgEl.src = finalCover;
                    verboseLog(`[Player][封面] ✅ 已填充: ${song.title}`);
                } else {
                    verboseLog(
                        `[Player][封面] 未找到封面，保持占位符: ${song.title}`,
                    );
                }
            });
        }

        function exitMultiSelectMode() {
            _playlistState.multiSelectMode = false;
            _playlistState.selectedSongIndices.clear();
            multiToggleBtn.classList.remove("active");
            multiActions.classList.remove("show");
            songListEl.classList.remove("multi-mode");
            renderSongList();
        }

        async function loadCurrentPlaylist(id) {
            if (!id) {
                _playlistState.current = null;
                _playlistState.currentId = null;
                renderSongList();
                return;
            }
            try {
                _playlistState.isLoading = true;
                songListEl.innerHTML = `<div class="ti-song-list-empty">${t`Loading...`}</div>`;
                const pl = await PlaylistAPI.get(id);
                _playlistState.current = pl;
                _playlistState.currentId = id;
                const settingsForPage = getSettings();
                const progressKeyForPage = getProgressKey(
                    settingsForPage.playlistSourceMode,
                    id,
                );
                const lastPlayedForPage =
                    settingsForPage.rememberPlaybackProgress &&
                    progressKeyForPage
                        ? settingsForPage.lastPlaybackProgress?.[
                              progressKeyForPage
                          ]
                        : null;
                let initialPage = 1;
                if (lastPlayedForPage && Array.isArray(pl.songs)) {
                    const idx = pl.songs.findIndex((s) => {
                        const sArtist = Array.isArray(s.artist)
                            ? s.artist.join(",")
                            : s.artist || "";
                        return (
                            MusicUtils.isTitleMatch(
                                lastPlayedForPage.title || "",
                                s.title || "",
                            ) &&
                            MusicUtils.isArtistMatch(
                                lastPlayedForPage.artist || "",
                                sArtist,
                            )
                        );
                    });
                    if (idx > 0) {
                        initialPage =
                            Math.floor(idx / _playlistState.songPageSize) + 1;
                    }
                }
                _playlistState.songCurrentPage = initialPage;
                _playlistState.songFilter = "";
                _playlistState.selectedSongIndices.clear();
                if (songSearchInput) songSearchInput.value = "";
                if (_playlistState.multiSelectMode) exitMultiSelectMode();
                renderSongList();
            } catch (e) {
                console.error("[Player][歌单] 加载失败:", e);
                toastr.error(e.message);
                songListEl.innerHTML = `<div class="ti-song-list-empty">${t`Load failed`}</div>`;
            } finally {
                _playlistState.isLoading = false;
            }
        }

        async function refreshAll() {
            try {
                _playlistState.all = await PlaylistAPI.list();
                refreshPlaylistSelect();
                refreshCharPlaylistSelect();
                let selectedId = settings.selectedPlaylistId;
                if (
                    !selectedId ||
                    !_playlistState.all.find((p) => p.id === selectedId)
                ) {
                    selectedId = _playlistState.all[0]?.id || null;
                    settings.selectedPlaylistId = selectedId;
                    saveSettingsDebounced();
                }
                if (selectedId) {
                    playlistSelect.value = selectedId;
                    await loadCurrentPlaylist(selectedId);
                } else {
                    renderSongList();
                }
            } catch (e) {
                debugWarn("[Player][歌单] 刷新失败:", e);
                if (songListEl) {
                    songListEl.innerHTML = `<div class="ti-song-list-empty">${t`Playlist backend not available. If you need the playlist feature, please make sure the backend plugin has been installed according to the instructions on the Tools page.`}</div>`;
                }
                if (playlistSelect) {
                    playlistSelect.innerHTML = `<option value="">-- ${t`Backend not available`} --</option>`;
                }
            }
        }

        function setSongLoading(song) {
            const artistStr = Array.isArray(song.artist)
                ? song.artist.join(",")
                : song.artist || "";
            const newKey = `${(song.title || "").toLowerCase()}|${artistStr.toLowerCase()}`;
            _loadingSongKey = newKey;

            if (!songListEl) return;
            songListEl
                .querySelectorAll(".ti-song-item.loading")
                .forEach((el) => {
                    el.classList.remove("loading");
                    const dot = el.querySelector(".ti-song-loading-dot");
                    if (dot) dot.remove();
                });

            // 本地歌单的歌
            songListEl
                .querySelectorAll(".ti-song-item[data-index]")
                .forEach((item) => {
                    const idx = parseInt(item.dataset.index, 10);
                    const s = _playlistState.current?.songs?.[idx];
                    if (!s) return;
                    const sArtist = Array.isArray(s.artist)
                        ? s.artist.join(",")
                        : s.artist || "";
                    const key = `${(s.title || "").toLowerCase()}|${sArtist.toLowerCase()}`;
                    if (key === newKey && !item.classList.contains("playing")) {
                        item.classList.add("loading");
                        const titleEl = item.querySelector(
                            ".ti-song-item-title",
                        );
                        if (
                            titleEl &&
                            !titleEl.querySelector(".ti-song-loading-dot")
                        ) {
                            const dot = document.createElement("span");
                            dot.className = "ti-song-loading-dot";
                            titleEl.prepend(dot);
                        }
                    }
                });

            songListEl
                .querySelectorAll(".ti-song-item-online")
                .forEach((item) => {
                    const idx = parseInt(item.dataset.onlineIndex, 10);
                    const s = _playlistState.onlineResults?.[idx];
                    if (!s) return;
                    const sArtist = s.artist || "";
                    const key = `${(s.title || "").toLowerCase()}|${sArtist.toLowerCase()}`;
                    if (key === newKey && !item.classList.contains("playing")) {
                        item.classList.add("loading");
                        const titleEl = item.querySelector(
                            ".ti-song-item-title",
                        );
                        if (
                            titleEl &&
                            !titleEl.querySelector(".ti-song-loading-dot")
                        ) {
                            const dot = document.createElement("span");
                            dot.className = "ti-song-loading-dot";
                            titleEl.prepend(dot);
                        }
                    }
                });

            if (_loadingSongTimeout) clearTimeout(_loadingSongTimeout);
            _loadingSongTimeout = setTimeout(() => {
                _loadingSongKey = null;
                _loadingSongTimeout = null;
                if (typeof _updatePlaylistPlayingState === "function") {
                    _updatePlaylistPlayingState();
                }
            }, 15000);
        }
        async function queueSongToPlayer(song) {
            const playerIframe = document.querySelector(
                "#music_player .theme-iframe",
            );
            if (!playerIframe || !playerIframe.contentWindow) {
                toastr.error(t`Music player is not ready.`);
                return;
            }
            const title = song.title || "";
            const artist = song.artist || "";
            const toastId = toastr.info(t`Queueing "${title}"...`, "", {
                timeOut: 800,
            });
            try {
                let trackData = null;
                const cached = MusicCache.getSearch(title, artist);
                if (cached) {
                    const audioUrl = MusicCache.getAudio(
                        cached.id,
                        cached.source,
                    );
                    if (audioUrl) {
                        trackData = {
                            id: cached.id,
                            source: cached.source,
                            title: cached.title,
                            name: cached.title,
                            artist: cached.artist,
                            coverUrl: cached.coverUrl || "",
                            audioUrl: audioUrl,
                            originalTitle: title,
                            originalArtist: artist,
                            _fromCache: true,
                        };
                    }
                }
                if (!trackData) {
                    trackData = await searchSongWithDedup(title, artist);
                    if (trackData) {
                        trackData.originalTitle = title;
                        trackData.originalArtist = artist;
                        trackData._fromCache = true;
                    }
                }
                if (!trackData) {
                    trackData = {
                        title: title,
                        name: title,
                        artist: artist,
                        coverUrl: song.cover || "",
                        originalTitle: title,
                        originalArtist: artist,
                    };
                }
                playerIframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "append-songs-to-playlist",
                        data: [trackData],
                    },
                    "*",
                );
                toastr.success(t`Added "${title}" to play queue.`, "", {
                    timeOut: 1200,
                });
            } catch (err) {
                console.error("[Player][歌单 queue next 失败:", err);
                toastr.error(err.message || "Failed");
            }
        }

        function syncMorePopoverTheme(el) {
            if (!el) return;
            try {
                const sample =
                    document.querySelector(".drawer-content") ||
                    document.querySelector("#sheld") ||
                    document.body;
                if (!sample) return;
                const cs = window.getComputedStyle(sample);
                if (cs.backgroundImage && cs.backgroundImage !== "none") {
                    el.style.backgroundImage = cs.backgroundImage;
                    el.style.backgroundSize = cs.backgroundSize || "cover";
                    el.style.backgroundPosition =
                        cs.backgroundPosition || "center";
                    el.style.backgroundRepeat =
                        cs.backgroundRepeat || "no-repeat";
                    el.style.backgroundAttachment = "fixed";
                }
                const rootCs = window.getComputedStyle(
                    document.documentElement,
                );
                const tintRaw = rootCs
                    .getPropertyValue("--SmartThemeBlurTintColor")
                    .trim();
                if (tintRaw) {
                    const probe = document.createElement("div");
                    probe.style.cssText = "color:" + tintRaw + ";display:none;";
                    document.body.appendChild(probe);
                    const parsed = window.getComputedStyle(probe).color;
                    probe.remove();
                    const m = parsed.match(
                        /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
                    );
                    if (m) {
                        const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
                        el.style.backgroundColor = `rgba(${m[1]},${m[2]},${m[3]},${Math.max(a, 0.92)})`;
                    }
                }
                if (cs.color) el.style.color = cs.color;
                const blurRaw = rootCs
                    .getPropertyValue("--SmartThemeBlurStrength")
                    .trim();
                if (blurRaw) {
                    el.style.backdropFilter = `blur(${blurRaw})`;
                    el.style.webkitBackdropFilter = `blur(${blurRaw})`;
                }
            } catch (e) {}
        }

        function closeSongMorePopover() {
            const existing = document.getElementById("ti_song_more_popover");
            if (!existing) return;
            if (existing._closeHandler) {
                document.removeEventListener(
                    "click",
                    existing._closeHandler,
                    true,
                );
            }
            existing.remove();
        }

        function showSongMorePopover(anchorBtn, song, includeCurrent = false) {
            const existing = document.getElementById("ti_song_more_popover");
            if (existing && existing._anchor === anchorBtn) {
                closeSongMorePopover();
                return;
            }
            closeSongMorePopover();

            const currentId = _playlistState.currentId;
            const otherPlaylists = includeCurrent
                ? _playlistState.all.slice()
                : _playlistState.all.filter((p) => p.id !== currentId);

            const popover = document.createElement("div");
            popover.className = "ti-song-more-popover";
            popover.id = "ti_song_more_popover";

            const headerHtml = `<div class="ti-song-more-header">${t`Add to playlist`}</div>`;
            const listHtml =
                otherPlaylists.length > 0
                    ? otherPlaylists
                          .map(
                              (p) =>
                                  `<button class="ti-song-more-item" data-playlist-id="${p.id}" type="button">
                                      <i class="fa-solid fa-plus"></i>
                                      <span>${escapeHtml(p.name)}</span>
                                      <span class="ti-song-more-meta">${p.songCount || 0}</span>
                                   </button>`,
                          )
                          .join("")
                    : `<div class="ti-song-more-empty">${t`No other playlists`}</div>`;

            popover.innerHTML = headerHtml + listHtml;
            popover._anchor = anchorBtn;
            document.body.appendChild(popover);
            syncMorePopoverTheme(popover);

            [
                "click",
                "mousedown",
                "mouseup",
                "pointerdown",
                "pointerup",
                "touchstart",
                "touchend",
            ].forEach((evt) => {
                popover.addEventListener(evt, (e) => e.stopPropagation());
            });

            const rect = anchorBtn.getBoundingClientRect();
            const popWidth = 220;
            const viewportW = window.innerWidth;
            const viewportH = window.innerHeight;
            let left = rect.right - popWidth;
            if (left < 8) left = 8;
            if (left + popWidth > viewportW - 8)
                left = viewportW - popWidth - 8;
            let top = rect.bottom + 4;
            const popHeightGuess = Math.min(
                320,
                (otherPlaylists.length || 1) * 40 + 40,
            );
            if (top + popHeightGuess > viewportH - 8) {
                top = rect.top - popHeightGuess - 4;
                if (top < 8) top = 8;
            }
            popover.style.left = `${left}px`;
            popover.style.top = `${top}px`;
            popover.style.width = `${popWidth}px`;

            popover.addEventListener("click", async (e) => {
                const btn = e.target.closest(".ti-song-more-item");
                if (!btn) return;
                e.stopPropagation();
                const targetId = btn.dataset.playlistId;
                const targetPl = _playlistState.all.find(
                    (p) => p.id === targetId,
                );
                btn.disabled = true;
                btn.querySelector("i").className =
                    "fa-solid fa-spinner fa-spin";
                try {
                    await PlaylistAPI.addSongs(targetId, [
                        {
                            title: song.title,
                            artist: song.artist,
                            cover: song.cover || "",
                        },
                    ]);
                    toastr.success(t`Added to "${targetPl?.name || ""}"`, "", {
                        timeOut: 1200,
                    });
                    _playlistState.all = await PlaylistAPI.list();
                    refreshPlaylistSelect();
                    if (targetId === _playlistState.currentId) {
                        try {
                            _playlistState.current =
                                await PlaylistAPI.get(targetId);
                            if (_playlistState.searchMode === "local") {
                                renderSongList();
                            }
                        } catch (e) {}
                    }
                } catch (err) {
                    toastr.error(err.message);
                    btn.disabled = false;
                    btn.querySelector("i").className = "fa-solid fa-plus";
                    return;
                }
                closeSongMorePopover();
            });

            setTimeout(() => {
                const closeHandler = (e) => {
                    if (
                        !e.target.closest("#ti_song_more_popover") &&
                        !e.target.closest('[data-action="more"]') &&
                        !e.target.closest('[data-online-action="more"]')
                    ) {
                        closeSongMorePopover();
                    }
                };
                document.addEventListener("click", closeHandler, true);
                popover._closeHandler = closeHandler;
            }, 0);
        }

        async function ensurePlayerEnabled() {
            if (settings.playerEnabled) return;
            settings.playerEnabled = true;
            saveSettingsDebounced();
            showPlayer();
            const cb = document.getElementById("ti_player_enabled");
            if (cb) cb.checked = true;
            const playerControls =
                document.getElementById("ti_player_controls");
            const playerThemeSection = document.getElementById(
                "ti_player_theme_section",
            );
            if (playerControls) playerControls.style.display = "block";
            if (playerThemeSection) playerThemeSection.style.display = "block";
            await new Promise((resolve) => {
                const start = Date.now();
                const check = setInterval(() => {
                    if (isPlayerInitialized || Date.now() - start > 2500) {
                        clearInterval(check);
                        resolve();
                    }
                }, 60);
            });
        }

        if (modeSelect) {
            modeSelect.addEventListener("change", (e) => {
                settings.playlistSourceMode = e.target.value;
                saveSettingsDebounced();
                updateSourceModeDesc();
                lastSentPlaylist = null;
                if (settings.playerEnabled) {
                    buildAndSetInitialPlaylist().catch((err) =>
                        console.error("[Player][歌单] 重建播放列表失败:", err),
                    );
                }
                toastr.info(t`Playback source mode updated.`, "", {
                    timeOut: 1200,
                });
            });
        }

        if (charEnableCb) {
            charEnableCb.addEventListener("change", (e) => {
                settings.enableCharacterPlaylist = e.target.checked;
                saveSettingsDebounced();
                if (charPlaylistRow) {
                    charPlaylistRow.style.display = e.target.checked
                        ? "grid"
                        : "none";
                }
            });
        }
        if (charAutoSwitchCb) {
            charAutoSwitchCb.addEventListener("change", (e) => {
                settings.autoSwitchCharacterPlaylist = e.target.checked;
                saveSettingsDebounced();
            });
        }
        if (rememberProgressCb) {
            rememberProgressCb.addEventListener("change", (e) => {
                settings.rememberPlaybackProgress = e.target.checked;
                saveSettingsDebounced();
            });
        }

        if (charPlaylistSelect) {
            charPlaylistSelect.addEventListener("change", (e) => {
                if (this_chid === undefined || !characters[this_chid]) {
                    toastr.warning(t`Please select a character first.`);
                    refreshCharPlaylistSelect();
                    return;
                }
                const charAvatar = characters[this_chid].avatar;
                const pid = e.target.value;
                if (!settings.characterPlaylists)
                    settings.characterPlaylists = {};
                if (pid) {
                    settings.characterPlaylists[charAvatar] = pid;
                    const pl = _playlistState.all.find((p) => p.id === pid);
                    toastr.success(
                        t`Character bound to playlist: ${pl?.name || pid}`,
                    );
                } else {
                    delete settings.characterPlaylists[charAvatar];
                    toastr.info(t`Unbound playlist from character.`);
                }
                saveSettingsDebounced();
                updateCharacterPlaylistWarning();
                if (
                    settings.playlistSourceMode === "character_playlist" &&
                    settings.playerEnabled
                ) {
                    lastSentPlaylist = null;
                    buildAndSetInitialPlaylist().catch((err) =>
                        console.error(
                            "[Player][歌单] 角色歌单切换后重建失败:",
                            err,
                        ),
                    );
                }
            });
        }

        playlistSelect.addEventListener("change", async (e) => {
            const id = e.target.value;
            settings.selectedPlaylistId = id;
            saveSettingsDebounced();
            await loadCurrentPlaylist(id);
            if (
                (settings.playlistSourceMode === "playlist_only" ||
                    settings.playlistSourceMode === "mixed") &&
                settings.playerEnabled
            ) {
                lastSentPlaylist = null;
                buildAndSetInitialPlaylist().catch((err) =>
                    console.error("[Player][歌单] 切换歌单后重建失败:", err),
                );
            }
        });

        playAllBtn.addEventListener("click", async () => {
            if (!_playlistState.current) {
                toastr.warning(t`Please select a playlist first.`);
                return;
            }
            const songs = _playlistState.current.songs || [];
            if (songs.length === 0) {
                toastr.warning(t`This playlist is empty.`);
                return;
            }
            await ensurePlayerEnabled();
            const playerIframe = document.querySelector(
                "#music_player .theme-iframe",
            );
            if (!playerIframe || !playerIframe.contentWindow) {
                toastr.error(t`Music player is not ready.`);
                return;
            }
            const avatarUrls = getAvatarUrls();
            const playlistForPlayer = songs.map((s) => ({
                title: s.title,
                name: s.title,
                artist: s.artist,
                coverUrl: s.cover || "",
            }));
            lastSentPlaylist = null;
            playerIframe.contentWindow.postMessage(
                {
                    source: "typing-indicator-host",
                    type: "set-initial-playlist",
                    data: {
                        playlist: playlistForPlayer,
                        charAvatarUrl: avatarUrls.char,
                        userAvatarUrl: avatarUrls.user,
                    },
                },
                "*",
            );
            let startIndex = 0;
            const progressKey = getProgressKey(
                settings.playlistSourceMode,
                _playlistState.currentId,
            );
            if (
                settings.rememberPlaybackProgress &&
                progressKey &&
                settings.lastPlaybackProgress?.[progressKey]
            ) {
                const saved = settings.lastPlaybackProgress[progressKey];
                const idx = songs.findIndex((s) => {
                    const sArtist = Array.isArray(s.artist)
                        ? s.artist.join(",")
                        : s.artist || "";
                    return (
                        MusicUtils.isTitleMatch(
                            saved.title || "",
                            s.title || "",
                        ) &&
                        MusicUtils.isArtistMatch(saved.artist || "", sArtist)
                    );
                });
                if (idx > 0) {
                    startIndex = idx;
                    const pageSize = _playlistState.songPageSize;
                    _playlistState.songCurrentPage =
                        Math.floor(idx / pageSize) + 1;
                    renderSongList();
                    setTimeout(() => {
                        const playingItem = songListEl?.querySelector(
                            `.ti-song-item[data-index="${idx}"]`,
                        );
                        if (playingItem && songListEl) {
                            const targetOffset =
                                playingItem.offsetTop -
                                songListEl.offsetTop -
                                songListEl.clientHeight / 2 +
                                playingItem.clientHeight / 2;
                            songListEl.scrollTo({
                                top: Math.max(0, targetOffset),
                                behavior: "smooth",
                            });
                        }
                    }, 120);
                }
            }
            setTimeout(() => {
                const startSong = songs[startIndex];
                if (startSong) {
                    playerIframe.contentWindow.postMessage(
                        {
                            source: "typing-indicator-host",
                            type: "play-by-info",
                            data: {
                                title: startSong.title,
                                artist: startSong.artist,
                            },
                        },
                        "*",
                    );
                }
            }, 350);
            if (startIndex > 0) {
                toastr.success(
                    t`Resuming playlist: ${_playlistState.current.name}`,
                );
            } else {
                toastr.success(
                    t`Playing playlist: ${_playlistState.current.name}`,
                );
            }
        });

        infoBtn.addEventListener("click", () => {
            if (!_playlistState.current) {
                toastr.warning(t`Please select a playlist first.`);
                return;
            }
            const pl = _playlistState.current;
            const fmt = (iso) => {
                if (!iso) return "-";
                try {
                    return new Date(iso).toLocaleString();
                } catch (e) {
                    return iso;
                }
            };
            const sourceLabel =
                {
                    netease: t`NetEase Music`,
                    tencent: t`QQ Music`,
                    custom: t`Custom`,
                }[pl.source] || pl.source;
            const info = [
                `# ${pl.name}`,
                ``,
                `> ${t`Playlist details`}`,
                ``,
                `- **${t`Song count`}**: ${pl.songs?.length || 0}`,
                `- **${t`Source`}**: ${sourceLabel}`,
                pl.sourceId
                    ? `- **${t`Original playlist ID`}**: \`${pl.sourceId}\``
                    : "",
                `- **${t`Created at`}**: ${fmt(pl.createdAt)}`,
                `- **${t`Updated at`}**: ${fmt(pl.updatedAt)}`,
                ``,
                `---`,
                `*${t`Playlists imported from URL keep their original source info.`}*`,
            ]
                .filter(Boolean)
                .join("\n");
            showThemeInfoPopup({ name: pl.name, readme: info });
        });

        addBtn.addEventListener("click", async () => {
            const name = prompt(t`Enter new playlist name:`);
            if (!name || !name.trim()) return;
            try {
                const pl = await PlaylistAPI.create(name.trim());
                settings.selectedPlaylistId = pl.id;
                saveSettingsDebounced();
                await refreshAll();
                toastr.success(t`Playlist "${pl.name}" created.`);
            } catch (e) {
                toastr.error(e.message);
            }
        });

        saveBtn.addEventListener("click", async () => {
            await refreshAll();
            toastr.success(t`Synced from server.`, "", { timeOut: 1000 });
        });
        saveBtn.title = t`Sync from server`;

        renameBtn.addEventListener("click", async () => {
            if (!_playlistState.current) {
                toastr.warning(t`Please select a playlist first.`);
                return;
            }
            const current = _playlistState.current;
            const newName = prompt(t`Enter new name:`, current.name);
            if (!newName || !newName.trim() || newName.trim() === current.name)
                return;
            try {
                await PlaylistAPI.update(current.id, {
                    name: newName.trim(),
                });
                await refreshAll();
                toastr.success(t`Renamed.`);
            } catch (e) {
                toastr.error(e.message);
            }
        });

        deleteBtn.addEventListener("click", async () => {
            if (!_playlistState.current) {
                toastr.warning(t`Please select a playlist first.`);
                return;
            }
            const pl = _playlistState.current;
            if (
                !confirm(
                    t`Delete playlist "${pl.name}"? This cannot be undone.`,
                )
            )
                return;
            try {
                await PlaylistAPI.remove(pl.id);
                if (settings.characterPlaylists) {
                    for (const key of Object.keys(
                        settings.characterPlaylists,
                    )) {
                        if (settings.characterPlaylists[key] === pl.id) {
                            delete settings.characterPlaylists[key];
                        }
                    }
                }
                if (settings.lastPlaybackProgress) {
                    delete settings.lastPlaybackProgress[pl.id];
                }
                settings.selectedPlaylistId = null;
                saveSettingsDebounced();
                await refreshAll();
                toastr.success(t`Playlist "${pl.name}" deleted.`);
            } catch (e) {
                toastr.error(e.message);
            }
        });

        exportJsonBtn.addEventListener("click", () => {
            if (!_playlistState.current) {
                toastr.warning(t`Please select a playlist first.`);
                return;
            }
            const pl = _playlistState.current;
            const exportData = {
                _type: "ti-playlist",
                _exportedAt: new Date().toISOString(),
                _exportedBy: "TypingIndicator Themes Extension",
                name: pl.name,
                cover: pl.cover || "",
                source: pl.source || "custom",
                sourceId: pl.sourceId || "",
                songs: pl.songs || [],
            };
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${pl.name.replace(/[\\/*?:"<>|]/g, "_")} [Playlist].json`;
            a.click();
            URL.revokeObjectURL(url);
            toastr.success(t`Exported "${pl.name}"`);
        });

        importJsonBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/json,.json";
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                    const text = await file.text();
                    const data = JSON.parse(text);
                    if (!data.name || !Array.isArray(data.songs)) {
                        throw new Error(t`Invalid playlist JSON format.`);
                    }
                    const pl = await PlaylistAPI.create(
                        data.name,
                        data.cover || "",
                    );
                    if (data.songs.length > 0) {
                        await PlaylistAPI.addSongs(pl.id, data.songs);
                    }
                    settings.selectedPlaylistId = pl.id;
                    saveSettingsDebounced();
                    await refreshAll();
                    toastr.success(
                        t`Imported "${data.name}" with ${data.songs.length} songs.`,
                    );
                } catch (err) {
                    toastr.error(t`Import failed: ${err.message}`);
                }
            };
            input.click();
        });

        importUrlBtn.addEventListener("click", async () => {
            const url = (importUrlInput.value || "").trim();
            if (!url) {
                toastr.warning(t`Please paste a playlist URL.`);
                return;
            }
            const originalHtml = importUrlBtn.innerHTML;
            importUrlBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
            importUrlBtn.disabled = true;
            try {
                const result = await PlaylistAPI.importFromUrl(url);
                if (result.success && result.playlist) {
                    importUrlInput.value = "";
                    settings.selectedPlaylistId = result.playlist.id;
                    saveSettingsDebounced();
                    await refreshAll();
                    toastr.success(
                        t`Imported "${result.playlist.name}" with ${result.playlist.songCount} songs.`,
                    );
                } else {
                    throw new Error(t`Import failed.`);
                }
            } catch (e) {
                toastr.error(e.message);
            } finally {
                importUrlBtn.innerHTML = originalHtml;
                importUrlBtn.disabled = false;
            }
        });

        if (importUrlInput) {
            importUrlInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    importUrlBtn.click();
                }
            });
        }

        async function performOnlineSearch(page = 1) {
            const query = (songSearchInput?.value || "").trim();
            const source = _playlistState.searchMode;
            if (!query || source === "local") return;

            _playlistState.onlineResults = [];
            _playlistState.onlineSearching = true;
            renderSongList();

            try {
                const resp = await fetch(
                    `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}&page=${page}`,
                );
                if (!resp.ok) throw new Error(t`Search request failed`);
                const data = await resp.json();
                const sourceLabels = {
                    tencent: t`QQ Music`,
                    netease: t`NetEase`,
                    kuwo: t`Kuwo`,
                };
                const newItems = (data.data || []).map((item) => ({
                    id: item.id || item.rid,
                    title: item.song || item.name || "",
                    artist: item.singer || item.artist || "",
                    cover: (item.cover || item.pic || "").replace(
                        /^https?:\/\/y\.qq\.com\//i,
                        "https://y.gtimg.cn/",
                    ),
                    source: source,
                    sourceLabel: sourceLabels[source] || source,
                }));
                _playlistState.onlineResults = newItems;
                _playlistState.onlineCurrentPage = page;
                _playlistState.onlineHasMore = newItems.length >= 30;
            } catch (err) {
                console.error("[Player][歌单] 在线搜索失败:", err);
                _playlistState.onlineResults = [];
                _playlistState.onlineHasMore = false;
                toastr.error(err.message || t`Search failed`);
            } finally {
                _playlistState.onlineSearching = false;
                renderSongList();
            }
        }

        const songSearchBtn = section.querySelector("#ti_song_search_btn");
        const songSearchClear = section.querySelector("#ti_song_search_clear");

        function updateClearBtnVisibility() {
            if (!songSearchClear || !songSearchInput) return;
            if (songSearchInput.value) {
                songSearchClear.classList.add("show");
            } else {
                songSearchClear.classList.remove("show");
            }
        }

        if (songSearchInput) {
            let searchTimeout;
            let lastSearchedQuery = "";
            songSearchInput.addEventListener("input", (e) => {
                updateClearBtnVisibility();
                clearTimeout(searchTimeout);
                if (_playlistState.searchMode === "local") {
                    searchTimeout = setTimeout(() => {
                        _playlistState.songFilter = e.target.value;
                        _playlistState.songCurrentPage = 1;
                        renderSongList();
                    }, 180);
                } else {
                    const query = e.target.value.trim();
                    if (!query) {
                        _playlistState.onlineResults = [];
                        _playlistState.onlineSearching = false;
                        lastSearchedQuery = "";
                        renderSongList();
                        return;
                    }
                    searchTimeout = setTimeout(() => {
                        const cur = (songSearchInput.value || "").trim();
                        if (cur === query && cur !== lastSearchedQuery) {
                            lastSearchedQuery = cur;
                            performOnlineSearch();
                        }
                    }, 800);
                }
            });
            songSearchInput.addEventListener("keydown", (e) => {
                if (
                    e.key === "Enter" &&
                    _playlistState.searchMode !== "local"
                ) {
                    e.preventDefault();
                    clearTimeout(searchTimeout);
                    lastSearchedQuery = (songSearchInput.value || "").trim();
                    performOnlineSearch();
                }
            });

            if (songSearchBtn) {
                songSearchBtn.addEventListener("click", () => {
                    if (_playlistState.searchMode === "local") {
                        _playlistState.songFilter = songSearchInput.value || "";
                        _playlistState.songCurrentPage = 1;
                        renderSongList();
                        songSearchInput.focus();
                    } else {
                        const q = (songSearchInput.value || "").trim();
                        if (!q) {
                            toastr.info(t`Enter keywords`, "", {
                                timeOut: 1200,
                            });
                            songSearchInput.focus();
                            return;
                        }
                        clearTimeout(searchTimeout);
                        lastSearchedQuery = q;
                        performOnlineSearch();
                    }
                });
            }

            if (songSearchClear) {
                songSearchClear.addEventListener("click", () => {
                    songSearchInput.value = "";
                    lastSearchedQuery = "";
                    updateClearBtnVisibility();
                    clearTimeout(searchTimeout);
                    if (_playlistState.searchMode === "local") {
                        _playlistState.songFilter = "";
                        _playlistState.songCurrentPage = 1;
                    } else {
                        _playlistState.onlineResults = [];
                        _playlistState.onlineSearching = false;
                    }
                    renderSongList();
                    songSearchInput.focus();
                });
            }
        }

        // tab 切换
        const searchTabs = section.querySelectorAll(".ti-search-tab");
        searchTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const mode = tab.dataset.searchMode;
                if (_playlistState.searchMode === mode) return;
                searchTabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");
                _playlistState.searchMode = mode;

                if (mode === "local") {
                    _playlistState.onlineResults = [];
                    _playlistState.onlineSearching = false;
                    if (songSearchInput) {
                        _playlistState.songFilter = songSearchInput.value || "";
                    }
                    renderSongList();
                } else {
                    _playlistState.songFilter = "";
                    if (_playlistState.multiSelectMode) exitMultiSelectMode();
                    if (songSearchInput) {
                        songSearchInput.placeholder = t`Type and press Enter to search...`;
                    }
                    const q = (songSearchInput?.value || "").trim();
                    if (q && q.length >= 2) {
                        _playlistState.onlineResults = [];
                        _playlistState.onlineCurrentPage = 1;
                        _playlistState.onlineHasMore = false;
                        performOnlineSearch();
                    } else {
                        renderSongList();
                    }
                    setTimeout(() => songSearchInput?.focus(), 30);
                }
            });
        });

        if (pagePrevBtn) {
            pagePrevBtn.addEventListener("click", () => {
                if (_playlistState.searchMode !== "local") {
                    if ((_playlistState.onlineCurrentPage || 1) > 1) {
                        performOnlineSearch(
                            _playlistState.onlineCurrentPage - 1,
                        );
                        songListEl.scrollTop = 0;
                    }
                    return;
                }
                if (_playlistState.songCurrentPage > 1) {
                    _playlistState.songCurrentPage--;
                    renderSongList();
                    songListEl.scrollTop = 0;
                }
            });
        }
        if (pageNextBtn) {
            pageNextBtn.addEventListener("click", () => {
                if (_playlistState.searchMode !== "local") {
                    if (_playlistState.onlineHasMore) {
                        performOnlineSearch(
                            (_playlistState.onlineCurrentPage || 1) + 1,
                        );
                        songListEl.scrollTop = 0;
                    }
                    return;
                }
                _playlistState.songCurrentPage++;
                renderSongList();
                songListEl.scrollTop = 0;
            });
        }
        if (pageInput) {
            const handlePageInput = () => {
                const val = parseInt(pageInput.value, 10);
                if (isNaN(val) || val < 1) return;
                if (_playlistState.searchMode !== "local") {
                    performOnlineSearch(val);
                    songListEl.scrollTop = 0;
                    return;
                }
                _playlistState.songCurrentPage = val;
                renderSongList();
                songListEl.scrollTop = 0;
            };
            pageInput.addEventListener("change", handlePageInput);
            pageInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    handlePageInput();
                    pageInput.blur();
                }
            });
        }

        if (multiToggleBtn) {
            multiToggleBtn.addEventListener("click", () => {
                const isActive = multiToggleBtn.classList.toggle("active");
                _playlistState.multiSelectMode = isActive;
                _playlistState.selectedSongIndices.clear();
                if (isActive) {
                    multiActions.classList.add("show");
                    songListEl.classList.add("multi-mode");
                } else {
                    multiActions.classList.remove("show");
                    songListEl.classList.remove("multi-mode");
                }
                updateMultiSelectCount();
                renderSongList();
            });
        }

        if (multiSelectAllBtn) {
            multiSelectAllBtn.addEventListener("click", () => {
                const songs = _playlistState.current?.songs || [];
                if (songs.length === 0) return;
                if (_playlistState.selectedSongIndices.size === songs.length) {
                    _playlistState.selectedSongIndices.clear();
                } else {
                    songs.forEach((_, i) =>
                        _playlistState.selectedSongIndices.add(i),
                    );
                }
                updateMultiSelectCount();
                renderSongList();
            });
        }

        if (multiRemoveBtn) {
            multiRemoveBtn.addEventListener("click", async () => {
                const indices = Array.from(_playlistState.selectedSongIndices);
                if (indices.length === 0) {
                    toastr.warning(t`Nothing selected.`);
                    return;
                }
                if (
                    !confirm(
                        t`Remove ${indices.length} songs from this playlist?`,
                    )
                )
                    return;
                try {
                    await PlaylistAPI.removeSongs(_playlistState.currentId, {
                        indices,
                    });
                    exitMultiSelectMode();
                    await loadCurrentPlaylist(_playlistState.currentId);
                    await refreshAll();
                    toastr.success(t`Removed ${indices.length} songs.`);
                } catch (err) {
                    toastr.error(err.message);
                }
            });
        }

        if (multiCancelBtn) {
            multiCancelBtn.addEventListener("click", exitMultiSelectMode);
        }

        songListEl.addEventListener("click", async (e) => {
            if (_playlistState.multiSelectMode) {
                const item = e.target.closest(".ti-song-item");
                if (!item) return;
                const idx = parseInt(item.dataset.index, 10);
                if (_playlistState.selectedSongIndices.has(idx)) {
                    _playlistState.selectedSongIndices.delete(idx);
                    item.classList.remove("selected");
                } else {
                    _playlistState.selectedSongIndices.add(idx);
                    item.classList.add("selected");
                }
                updateMultiSelectCount();
                return;
            }
            // 在线搜索结果的操作
            const onlineActionBtn = e.target.closest("[data-online-action]");
            if (onlineActionBtn) {
                e.stopPropagation();
                const i = parseInt(onlineActionBtn.dataset.onlineIndex, 10);
                const track = _playlistState.onlineResults[i];
                if (!track) return;
                const action = onlineActionBtn.dataset.onlineAction;

                if (action === "add") {
                    if (!_playlistState.currentId) {
                        toastr.warning(t`Please select a playlist first.`);
                        return;
                    }
                    const iconEl = onlineActionBtn.querySelector("i");
                    onlineActionBtn.disabled = true;
                    if (iconEl)
                        iconEl.className = "fa-solid fa-spinner fa-spin";
                    try {
                        await PlaylistAPI.addSongs(_playlistState.currentId, [
                            {
                                title: track.title,
                                artist: track.artist,
                                cover: track.cover || "",
                            },
                        ]);
                        toastr.success(t`Added "${track.title}"`, "", {
                            timeOut: 1000,
                        });
                        _playlistState.all = await PlaylistAPI.list();
                        refreshPlaylistSelect();
                        try {
                            _playlistState.current = await PlaylistAPI.get(
                                _playlistState.currentId,
                            );
                        } catch (e) {}
                        if (iconEl) iconEl.className = "fa-solid fa-check";
                        setTimeout(() => {
                            if (iconEl && iconEl.isConnected)
                                iconEl.className = "fa-solid fa-plus";
                            onlineActionBtn.disabled = false;
                        }, 1200);
                    } catch (err) {
                        toastr.error(err.message);
                        if (iconEl) iconEl.className = "fa-solid fa-plus";
                        onlineActionBtn.disabled = false;
                    }
                    return;
                }

                if (action === "more") {
                    showSongMorePopover(
                        onlineActionBtn,
                        {
                            title: track.title,
                            artist: track.artist,
                            cover: track.cover || "",
                        },
                        true,
                    );
                    return;
                }
                return;
            }

            const onlineItem = e.target.closest(".ti-song-item-online");
            if (onlineItem) {
                const i = parseInt(onlineItem.dataset.onlineIndex, 10);
                const track = _playlistState.onlineResults[i];
                if (!track) return;
                setSongLoading({ title: track.title, artist: track.artist });
                await ensurePlayerEnabled();
                handleSongPlayRequest({
                    title: track.title,
                    artist: track.artist,
                });
                return;
            }

            const actionBtn = e.target.closest("[data-action]");
            if (actionBtn && actionBtn.dataset.action !== "resume-play") {
                e.stopPropagation();
                const idx = parseInt(actionBtn.dataset.index, 10);
                const action = actionBtn.dataset.action;
                const songs = _playlistState.current?.songs || [];
                const song = songs[idx];
                if (!song) return;
                if (action === "queue-next") {
                    await ensurePlayerEnabled();
                    queueSongToPlayer(song);
                } else if (action === "toggle-play") {
                    const sArtStr = Array.isArray(song.artist)
                        ? song.artist.join(",")
                        : song.artist || "";
                    const isCurrent =
                        currentPlayerTrack &&
                        fuzzyMatchTrack(
                            song.title || "",
                            sArtStr,
                            currentPlayerTrack,
                        );
                    if (isCurrent) {
                        const playerIframe = document.querySelector(
                            "#music_player .theme-iframe",
                        );
                        if (playerIframe && playerIframe.contentWindow) {
                            playerIframe.contentWindow.postMessage(
                                {
                                    source: "typing-indicator-host",
                                    type: "toggle-playback",
                                },
                                "*",
                            );
                        }
                    } else {
                        setSongLoading(song);
                        await ensurePlayerEnabled();
                        handleSongPlayRequest({
                            title: song.title,
                            artist: song.artist,
                        });
                    }
                } else if (action === "more") {
                    showSongMorePopover(actionBtn, song);
                } else if (action === "remove") {
                    if (!confirm(t`Remove "${song.title}" from this playlist?`))
                        return;
                    try {
                        await PlaylistAPI.removeSongs(
                            _playlistState.currentId,
                            {
                                indices: [idx],
                            },
                        );
                        await loadCurrentPlaylist(_playlistState.currentId);
                        await refreshAll();
                        toastr.success(t`Removed.`, "", { timeOut: 1000 });
                    } catch (err) {
                        toastr.error(err.message);
                    }
                }
                return;
            }
            // 继续播放提示条点击
            const resumeBar = e.target.closest(".ti-song-resume-bar");
            if (resumeBar) {
                e.stopPropagation();
                const idx = parseInt(resumeBar.dataset.index, 10);
                const song = _playlistState.current?.songs?.[idx];
                if (!song) return;
                _playlistState._dismissedResumeFor = _playlistState.currentId;
                const pageSize = _playlistState.songPageSize;
                _playlistState.songCurrentPage = Math.floor(idx / pageSize) + 1;
                renderSongList();
                setSongLoading(song);
                await ensurePlayerEnabled();
                handleSongPlayRequest({
                    title: song.title,
                    artist: song.artist,
                });
                return;
            }

            const item = e.target.closest(".ti-song-item");
            if (item) {
                const idx = parseInt(item.dataset.index, 10);
                const song = _playlistState.current?.songs?.[idx];
                if (!song) return;
                const sArtStr = Array.isArray(song.artist)
                    ? song.artist.join(",")
                    : song.artist || "";
                const isCurrent =
                    currentPlayerTrack &&
                    fuzzyMatchTrack(
                        song.title || "",
                        sArtStr,
                        currentPlayerTrack,
                    );
                if (isCurrent) {
                    const playerIframe = document.querySelector(
                        "#music_player .theme-iframe",
                    );
                    if (playerIframe && playerIframe.contentWindow) {
                        playerIframe.contentWindow.postMessage(
                            {
                                source: "typing-indicator-host",
                                type: "toggle-playback",
                            },
                            "*",
                        );
                    }
                    return;
                }
                setSongLoading(song);
                await ensurePlayerEnabled();
                handleSongPlayRequest({
                    title: song.title,
                    artist: song.artist,
                });
            }
        });

        _updatePlaylistPlayingState = () => {
            if (!songListEl) return;
            if (_playlistState.searchMode !== "local") {
                const results = _playlistState.onlineResults || [];
                if (results.length === 0) return;
                const onlineItems = songListEl.querySelectorAll(
                    ".ti-song-item-online",
                );
                onlineItems.forEach((item) => {
                    const idx = parseInt(item.dataset.onlineIndex, 10);
                    const s = results[idx];
                    if (!s) return;
                    const matches =
                        currentPlayerTrack &&
                        fuzzyMatchTrack(
                            s.title || "",
                            s.artist || "",
                            currentPlayerTrack,
                        );
                    item.classList.remove("playing", "paused", "loading");
                    const oldEq = item.querySelector(".ti-song-playing-bars");
                    if (oldEq) oldEq.remove();
                    const oldDot = item.querySelector(".ti-song-loading-dot");
                    if (oldDot) oldDot.remove();
                    const titleEl = item.querySelector(".ti-song-item-title");
                    if (matches) {
                        item.classList.add("playing");
                        if (!listeningSession.isPlaying)
                            item.classList.add("paused");
                        const eq = document.createElement("span");
                        eq.className = "ti-song-playing-bars";
                        eq.innerHTML =
                            "<span></span><span></span><span></span>";
                        if (titleEl) titleEl.prepend(eq);
                    } else {
                        const key = `${(s.title || "").toLowerCase()}|${(s.artist || "").toLowerCase()}`;
                        if (_loadingSongKey === key) {
                            item.classList.add("loading");
                            const dot = document.createElement("span");
                            dot.className = "ti-song-loading-dot";
                            if (titleEl) titleEl.prepend(dot);
                        }
                    }
                });
                return;
            }

            const songs = _playlistState.current?.songs || [];
            if (songs.length === 0) return;

            const currentArtistStr = currentPlayerTrack
                ? Array.isArray(currentPlayerTrack.artist)
                    ? currentPlayerTrack.artist.join(",")
                    : currentPlayerTrack.artist || ""
                : "";

            const items = songListEl.querySelectorAll(".ti-song-item");
            items.forEach((item) => {
                const idx = parseInt(item.dataset.index, 10);
                const song = songs[idx];
                if (!song) return;
                const artistStr = Array.isArray(song.artist)
                    ? song.artist.join(",")
                    : song.artist || "";
                const matches =
                    currentPlayerTrack &&
                    fuzzyMatchTrack(
                        song.title || "",
                        artistStr,
                        currentPlayerTrack,
                    );

                item.classList.remove("playing", "paused", "loading");
                const oldEq = item.querySelector(".ti-song-playing-bars");
                if (oldEq) oldEq.remove();
                const oldDot = item.querySelector(".ti-song-loading-dot");
                if (oldDot) oldDot.remove();

                const titleEl = item.querySelector(".ti-song-item-title");

                if (matches) {
                    item.classList.add("playing");
                    const isPausedNow = !listeningSession.isPlaying;
                    if (isPausedNow) {
                        item.classList.add("paused");
                    }
                    const eq = document.createElement("span");
                    eq.className = "ti-song-playing-bars";
                    eq.innerHTML = "<span></span><span></span><span></span>";
                    if (titleEl) titleEl.prepend(eq);
                } else {
                    if (
                        _loadingSongKey &&
                        `${(song.title || "").toLowerCase()}|${artistStr.toLowerCase()}` ===
                            _loadingSongKey
                    ) {
                        item.classList.add("loading");
                        const dot = document.createElement("span");
                        dot.className = "ti-song-loading-dot";
                        if (titleEl) titleEl.prepend(dot);
                    }
                }
            });

            if (currentPlayerTrack && _loadingSongKey) {
                const currentKey = `${(currentPlayerTrack.title || currentPlayerTrack.name || "").toLowerCase()}|${currentArtistStr.toLowerCase()}`;
                if (
                    currentKey === _loadingSongKey ||
                    songs.some((s) => {
                        const sArtist = Array.isArray(s.artist)
                            ? s.artist.join(",")
                            : s.artist || "";
                        const sKey = `${(s.title || "").toLowerCase()}|${sArtist.toLowerCase()}`;
                        return (
                            sKey === _loadingSongKey &&
                            fuzzyMatchTrack(
                                s.title || "",
                                sArtist,
                                currentPlayerTrack,
                            )
                        );
                    })
                ) {
                    _loadingSongKey = null;
                    if (_loadingSongTimeout) {
                        clearTimeout(_loadingSongTimeout);
                        _loadingSongTimeout = null;
                    }
                }
            }
        };
        window._tiPlaylistPanelNotify = async (options = {}) => {
            try {
                _playlistState.all = await PlaylistAPI.list();
                refreshPlaylistSelect();
                refreshCharPlaylistSelect();
                if (
                    options.affectedPlaylistId &&
                    options.affectedPlaylistId === _playlistState.currentId
                ) {
                    try {
                        _playlistState.current = await PlaylistAPI.get(
                            _playlistState.currentId,
                        );
                        if (_playlistState.searchMode === "local") {
                            renderSongList();
                        }
                    } catch (e) {}
                }
            } catch (e) {
                console.warn("[Player][歌单] 通知刷新失败:", e);
            }
        };

        let playlistLazyLoaded = false;
        window._tiPlaylistLazyLoad = () => {
            if (playlistLazyLoaded) return;
            playlistLazyLoaded = true;
            refreshAll().catch((e) =>
                console.error("[Player][歌单] 初始化加载失败:", e),
            );
        };
    }

    function initializeToolsSettings() {
        const settings = getSettings();
        const fpsMonitorCheckbox = section.querySelector("#ti_fps_monitor");
        if (fpsMonitorCheckbox) {
            fpsMonitorCheckbox.addEventListener("change", (e) => {
                settings.showFpsMonitor = e.target.checked;
                saveSettingsDebounced();
                if (e.target.checked) {
                    FPSMonitor.start();
                    toastr.info(t`FPS Monitor enabled`, "", { timeOut: 1000 });
                } else {
                    FPSMonitor.stop();
                    toastr.info(t`FPS Monitor disabled`, "", { timeOut: 1000 });
                }
            });
        }
        section
            .querySelector("#ti_usage_guide_btn")
            .addEventListener("click", async () => {
                try {
                    const scriptUrl = new URL(import.meta.url);
                    const extensionPath = scriptUrl.pathname.substring(
                        0,
                        scriptUrl.pathname.lastIndexOf("/") + 1,
                    );
                    const detectLanguage = () => {
                        if (power_user && power_user.language) {
                            return power_user.language;
                        }
                        return navigator.language || "en";
                    };

                    const detectedLang = detectLanguage().toLowerCase();
                    let currentLang = "en";
                    if (detectedLang.startsWith("zh")) {
                        currentLang = "zh";
                    } else if (detectedLang.startsWith("th")) {
                        currentLang = "th";
                    }
                    const loadGuideContent = async (lang) => {
                        let fileName = "usage_guide_en.md";
                        if (lang === "zh") {
                            fileName = "usage_guide_zh.md";
                        } else if (lang === "th") {
                            fileName = "usage_guide_th.md";
                        }
                        const guideFilePath = `${extensionPath}${fileName}`;
                        const response = await fetch(guideFilePath);
                        if (!response.ok) {
                            throw new Error(
                                `文件未找到 (状态码: ${response.status})`,
                            );
                        }
                        return await response.text();
                    };
                    const renderMarkdown = (markdownContent) => {
                        const converter = new showdown.Converter({
                            tables: true,
                            strikethrough: true,
                            tasklists: true,
                            ghCodeBlocks: true,
                            smoothLivePreview: true,
                            simpleLineBreaks: true,
                        });
                        return converter.makeHtml(markdownContent);
                    };
                    let markdownContent = await loadGuideContent(currentLang);
                    let htmlContent = renderMarkdown(markdownContent);

                    const popupHtml = `
                <div id="ti_usage_guide_popup" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 10000;
                    backdrop-filter: blur(3px);
                ">
                    <div id="ti_usage_guide_dialog" style="
                        position: fixed;
                        background: var(--SmartThemeBlurTintColor, #1a1a2e);
                        border: 1px solid var(--SmartThemeBorderColor, #333);
                        border-radius: 12px;
                        width: 90%;
                        max-width: 800px;
                        max-height: 85vh;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                        z-index: 10001;
                    ">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 16px 20px;
                            border-bottom: 1px solid var(--SmartThemeBorderColor, #333);
                            flex-shrink: 0;
                        ">
                            <h3 style="margin: 0; font-size: 1.2em;"><i class="fa-solid fa-book-open" style="opacity:0.85;margin-right:8px;"></i>${currentLang === "zh" ? "使用说明" : currentLang === "th" ? "คู่มือการใช้งาน" : "Usage Guide"}</h3>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <!-- 语言切换按钮 -->
                                <div id="ti_lang_switch" style="
    display: flex;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--SmartThemeBorderColor, #444);
">
    <button id="ti_lang_zh" class="${currentLang === "zh" ? "active" : ""}" style="
        padding: 4px 10px;
        border: none;
        background: ${currentLang === "zh" ? "var(--SmartThemeQuoteColor, #88c0d0)" : "transparent"};
        color: ${currentLang === "zh" ? "#000" : "var(--SmartThemeBodyColor, #fff)"};
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
    ">中文</button>
    <button id="ti_lang_en" class="${currentLang === "en" ? "active" : ""}" style="
        padding: 4px 10px;
        border: none;
        background: ${currentLang === "en" ? "var(--SmartThemeQuoteColor, #88c0d0)" : "transparent"};
        color: ${currentLang === "en" ? "#000" : "var(--SmartThemeBodyColor, #fff)"};
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
    ">EN</button>
    <button id="ti_lang_th" class="${currentLang === "th" ? "active" : ""}" style="
        padding: 4px 10px;
        border: none;
        background: ${currentLang === "th" ? "var(--SmartThemeQuoteColor, #88c0d0)" : "transparent"};
        color: ${currentLang === "th" ? "#000" : "var(--SmartThemeBodyColor, #fff)"};
        cursor: pointer;
        font-size: 12px;
        transition: all 0.2s;
    ">ไทย</button>
</div>
                                <button id="ti_close_usage_guide" style="
                                    background: transparent;
                                    border: none;
                                    font-size: 24px;
                                    cursor: pointer;
                                    color: var(--SmartThemeBodyColor, #fff);
                                    opacity: 0.7;
                                    transition: opacity 0.2s;
                                    padding: 0 8px;
                                " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">×</button>
                            </div>
                        </div>
                        <div id="ti_usage_guide_content" style="
                            padding: 20px;
                            overflow-y: auto;
                            flex: 1;
                            line-height: 1.7;
                            -webkit-overflow-scrolling: touch;
                        ">
                            ${htmlContent}
                        </div>
                    </div>
                </div>
            `;

                    document.body.insertAdjacentHTML("beforeend", popupHtml);
                    function centerDialog(element) {
                        if (!element) return;
                        const winWidth = window.innerWidth;
                        const winHeight = window.innerHeight;
                        const elWidth = element.offsetWidth;
                        const elHeight = element.offsetHeight;
                        element.style.left = `${Math.max(0, (winWidth - elWidth) / 2)}px`;
                        element.style.top = `${Math.max(0, (winHeight - elHeight) / 2)}px`;
                    }

                    const popup = document.getElementById(
                        "ti_usage_guide_popup",
                    );
                    const dialog = document.getElementById(
                        "ti_usage_guide_dialog",
                    );
                    const closeBtn = document.getElementById(
                        "ti_close_usage_guide",
                    );
                    const contentDiv = document.getElementById(
                        "ti_usage_guide_content",
                    );
                    const langZhBtn = document.getElementById("ti_lang_zh");
                    const langEnBtn = document.getElementById("ti_lang_en");
                    const langThBtn = document.getElementById("ti_lang_th");
                    const titleEl = dialog.querySelector("h3");

                    centerDialog(dialog);
                    const switchLanguage = async (lang) => {
                        if (lang === currentLang) return;

                        try {
                            contentDiv.style.opacity = "0.5";

                            const newContent = await loadGuideContent(lang);
                            const newHtml = renderMarkdown(newContent);
                            contentDiv.innerHTML = newHtml;
                            contentDiv.style.opacity = "1";
                            currentLang = lang;

                            langZhBtn.style.background =
                                lang === "zh"
                                    ? "var(--SmartThemeQuoteColor, #88c0d0)"
                                    : "transparent";
                            langZhBtn.style.color =
                                lang === "zh"
                                    ? "#000"
                                    : "var(--SmartThemeBodyColor, #fff)";

                            langEnBtn.style.background =
                                lang === "en"
                                    ? "var(--SmartThemeQuoteColor, #88c0d0)"
                                    : "transparent";
                            langEnBtn.style.color =
                                lang === "en"
                                    ? "#000"
                                    : "var(--SmartThemeBodyColor, #fff)";

                            langThBtn.style.background =
                                lang === "th"
                                    ? "var(--SmartThemeQuoteColor, #88c0d0)"
                                    : "transparent";
                            langThBtn.style.color =
                                lang === "th"
                                    ? "#000"
                                    : "var(--SmartThemeBodyColor, #fff)";

                            titleEl.innerHTML =
                                `<i class="fa-solid fa-book-open" style="opacity:0.85;margin-right:8px;"></i>` +
                                (lang === "zh"
                                    ? "使用说明"
                                    : lang === "th"
                                      ? "คู่มือการใช้งาน"
                                      : "Usage Guide");

                            contentDiv.scrollTop = 0;
                        } catch (error) {
                            console.error("切换语言失败:", error);
                            toastr.error(
                                lang === "zh"
                                    ? "加载中文版本失败"
                                    : lang === "th"
                                      ? "โหลดเวอร์ชันภาษาไทยล้มเหลว"
                                      : "Failed to load English version",
                            );
                            contentDiv.style.opacity = "1";
                        }
                    };

                    langZhBtn.addEventListener("click", () =>
                        switchLanguage("zh"),
                    );
                    langEnBtn.addEventListener("click", () =>
                        switchLanguage("en"),
                    );
                    langThBtn.addEventListener("click", () =>
                        switchLanguage("th"),
                    );
                    const resizeHandler = () => centerDialog(dialog);

                    let escHandler;
                    [
                        "click",
                        "mousedown",
                        "mouseup",
                        "pointerdown",
                        "pointerup",
                        "touchstart",
                        "touchend",
                    ].forEach((evt) => {
                        popup.addEventListener(evt, (e) => e.stopPropagation());
                    });

                    const closePopup = () => {
                        window.removeEventListener("resize", resizeHandler);
                        document.removeEventListener(
                            "keydown",
                            escHandler,
                            true,
                        );
                        popup.style.opacity = "0";
                        popup.style.transition = "opacity 0.2s";
                        setTimeout(() => popup.remove(), 200);
                    };

                    escHandler = (e) => {
                        if (e.key === "Escape") {
                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            e.preventDefault();
                            closePopup();
                        }
                    };

                    closeBtn.addEventListener("click", closePopup);
                    popup.addEventListener("click", (e) => {
                        if (e.target === popup) closePopup();
                    });
                    document.addEventListener("keydown", escHandler, true);
                    window.addEventListener("resize", resizeHandler);
                } catch (error) {
                    console.error("加载使用说明失败:", error);
                    toastr.error(t`Failed to load usage guide.`);
                }
            });

        section
            .querySelector("#ti_dev_mode")
            .addEventListener("change", (e) => {
                settings.devMode = e.target.checked;
                saveSettingsDebounced();
                if (e.target.checked) {
                    toastr.info(
                        t`Theme performance logging is enabled. Please check the console in your browser's developer tools (F12).`,
                        t`Developer Mode`,
                        { timeOut: 3000 },
                    );
                }
            });

        section
            .querySelector("#ti_debug_logs")
            .addEventListener("change", (e) => {
                settings.debugLogs = e.target.checked;
                saveSettingsDebounced();
                updateLogFunctions();
                const verboseLabel = section.querySelector(
                    "#ti_verbose_logs_label",
                );
                const verboseCheckbox =
                    section.querySelector("#ti_verbose_logs");
                if (verboseLabel) {
                    verboseLabel.style.display = e.target.checked
                        ? "flex"
                        : "none";
                }
                const logFilterRow =
                    section.querySelector("#ti_log_filter_row");
                if (logFilterRow) {
                    logFilterRow.style.display = e.target.checked
                        ? "flex"
                        : "none";
                }
                if (verboseCheckbox && !e.target.checked) {
                    verboseCheckbox.checked = false;
                    settings.verboseLogs = false;
                }
                if (e.target.checked) {
                    toastr.info(
                        t`Debug logging is enabled. Detailed information will be shown in the console.`,
                        t`Debug Mode`,
                        { timeOut: 3000 },
                    );
                } else {
                    toastr.info(
                        t`Debug logging is disabled. Console will be cleaner.`,
                        t`Debug Mode`,
                        { timeOut: 3000 },
                    );
                }
            });

        section
            .querySelector("#ti_verbose_logs")
            .addEventListener("change", (e) => {
                settings.verboseLogs = e.target.checked;
                saveSettingsDebounced();
                updateLogFunctions();
            });
        const logFilterSelect = section.querySelector("#ti_log_filter");
        if (logFilterSelect) {
            logFilterSelect.addEventListener("change", (e) => {
                settings.logFilter = e.target.value;
                saveSettingsDebounced();
                updateLogFunctions();
            });
        }

        const downloadGuide = async (fileName, displayName) => {
            try {
                const scriptUrl = new URL(import.meta.url);
                const extensionPath = scriptUrl.pathname.substring(
                    0,
                    scriptUrl.pathname.lastIndexOf("/") + 1,
                );
                const guideFilePath = `${extensionPath}${fileName}`;
                const response = await fetch(guideFilePath);
                if (!response.ok) {
                    throw new Error(`文件未找到 (状态码: ${response.status})`);
                }
                const markdownContent = await response.text();
                const blob = new Blob([markdownContent], {
                    type: "text/markdown;charset=utf-8",
                });
                const url = URL.createObjectURL(blob);
                const downloader = document.createElement("a");
                downloader.style.display = "none";
                downloader.href = url;
                downloader.download = displayName;
                document.body.appendChild(downloader);
                downloader.click();
                window.URL.revokeObjectURL(url);
                downloader.remove();
            } catch (error) {
                console.error("下载创作指南失败:", error);
                toastr.error(
                    t`Failed to download the creation guide. Please ensure the guide file is in the extension's root directory.`,
                );
            }
        };

        section
            .querySelector("#ti_download_indicator_guide_btn")
            .addEventListener("click", () =>
                downloadGuide(
                    "theme_guide_indicator.md",
                    "指示器主题创作指南.md",
                ),
            );

        section
            .querySelector("#ti_download_player_guide_btn")
            .addEventListener("click", () =>
                downloadGuide("theme_guide_player.md", "播放器主题创作指南.md"),
            );

        section
            .querySelector("#ti_restore_defaults_btn")
            .addEventListener("click", () => {
                if (
                    confirm(
                        t`Are you sure you want to restore all built-in presets and themes? This will overwrite any changes you've made to them, but your custom-created items will not be deleted.`,
                    )
                ) {
                    const settings = getSettings();
                    const userCreatedPresets = settings.textPresets.filter(
                        (p) => !p.isBuiltIn,
                    );
                    const userCreatedThemes = settings.themes.filter(
                        (t) => !t.isBuiltIn,
                    );
                    _needsSync = true;
                    settings.deletedBuiltIns = {
                        themes: [],
                        textPresets: [],
                        bubbleStyles: [],
                    };
                    settings.textPresets = [
                        ...userCreatedPresets,
                        ...structuredClone(defaultPresets),
                    ];
                    settings.themes = [
                        ...userCreatedThemes,
                        ...structuredClone(defaultThemes),
                    ];
                    const userCreatedBubbles = settings.bubbleStyles.filter(
                        (s) => !s.isBuiltIn,
                    );
                    settings.bubbleStyles = [
                        ...userCreatedBubbles,
                        ...structuredClone(defaultBubbleStyles),
                    ];
                    if (
                        !settings.textPresets.some(
                            (p) => p.id === settings.selectedTextPresetId,
                        )
                    ) {
                        settings.selectedTextPresetId = "cat_default";
                    }
                    if (
                        !settings.themes.some(
                            (t) => t.id === settings.selectedThemeId,
                        )
                    ) {
                        settings.selectedThemeId = "default";
                    }
                    if (
                        !settings.bubbleStyles.some(
                            (s) => s.id === settings.selectedBubbleStyleId,
                        )
                    ) {
                        settings.selectedBubbleStyleId = "bubble_default";
                    }
                    saveSettingsDebounced();

                    if (typeof populatePresets === "function")
                        populatePresets();
                    if (typeof populateThemes === "function") populateThemes();
                    if (typeof populatePlayerThemes === "function")
                        populatePlayerThemes();

                    applyTheme(settings.selectedThemeId);
                    if (settings.playerEnabled) {
                        reloadPlayer();
                    }
                    if (settings.persistentMode) {
                        const indicator =
                            document.getElementById("typing_indicator");
                        if (indicator) {
                            replaceIndicator("restore_defaults");
                        }
                    }

                    toastr.success(
                        t`Built-in items have been restored to their default settings.`,
                    );
                    requestSettingsRender(true);
                }
            });

        section
            .querySelector("#ti_import_worldbook_btn")
            .addEventListener("click", async () => {
                try {
                    const scriptUrl = new URL(import.meta.url);
                    const extensionPath = scriptUrl.pathname.substring(
                        0,
                        scriptUrl.pathname.lastIndexOf("/") + 1,
                    );
                    const detectLanguage = () => {
                        if (power_user && power_user.language) {
                            return power_user.language;
                        }
                        if (document.documentElement.lang) {
                            return document.documentElement.lang;
                        }
                        return navigator.language || "en";
                    };

                    const currentLang = detectLanguage().toLowerCase();
                    let fileName, worldBookName;
                    if (currentLang.startsWith("zh")) {
                        fileName = "indicator_zh.json";
                        worldBookName = "指示器";
                    } else if (currentLang.startsWith("th")) {
                        fileName = "indicator_th.json";
                        worldBookName = "ตัวบ่งชี้";
                    } else {
                        fileName = "indicator_en.json";
                        worldBookName = "Indicator";
                    }

                    const worldBookPath = `${extensionPath}${fileName}`;
                    const response = await fetch(worldBookPath);

                    if (!response.ok) {
                        throw new Error(
                            t`World book file not found (status: ${response.status})`,
                        );
                    }

                    const worldBookContent = await response.text();
                    const worldBookData = JSON.parse(worldBookContent);
                    worldBookData.name = worldBookName;

                    const formData = new FormData();
                    const blob = new Blob([JSON.stringify(worldBookData)], {
                        type: "application/json",
                    });
                    const file = new File(
                        [blob],
                        `${worldBookData.name}.json`,
                        {
                            type: "application/json",
                        },
                    );
                    formData.append("avatar", file);

                    const headers = getRequestHeaders();
                    delete headers["Content-Type"];

                    const importResponse = await fetch(
                        "/api/worldinfo/import",
                        {
                            method: "POST",
                            headers: headers,
                            body: formData,
                        },
                    );

                    if (!importResponse.ok) {
                        const errorText = await importResponse.text();
                        throw new Error(errorText || t`Import failed`);
                    }

                    const result = await importResponse.json();
                    const displayName = result.name || worldBookData.name;

                    try {
                        await updateWorldInfoList();
                    } catch (e) {
                        console.warn(
                            "[TI] updateWorldInfoList 调用失败，尝试备用方案:",
                            e,
                        );

                        try {
                            const listResponse = await fetch(
                                "/api/worldinfo/list",
                                {
                                    method: "POST",
                                    headers: getRequestHeaders(),
                                },
                            );

                            if (listResponse.ok) {
                                const worldList = await listResponse.json();
                                const selectors = [
                                    "#world_info",
                                    "#world_editor_select",
                                    'select[name="world_info"]',
                                ];

                                selectors.forEach((selector) => {
                                    const $select = $(selector);
                                    if ($select.length > 0) {
                                        const currentValue = $select.val();
                                        const firstOption = $select
                                            .find("option:first")
                                            .clone();
                                        $select.empty().append(firstOption);

                                        worldList.forEach((world) => {
                                            $select.append(
                                                `<option value="${world}">${world}</option>`,
                                            );
                                        });

                                        if (
                                            currentValue &&
                                            worldList.includes(currentValue)
                                        ) {
                                            $select.val(currentValue);
                                        }
                                    }
                                });
                            }
                        } catch (refreshError) {
                            console.error(
                                "[TI] 备用刷新方案也失败了:",
                                refreshError,
                            );
                            toastr.warning(
                                t`World book imported but list may need manual refresh.`,
                                t`Note`,
                                { timeOut: 3000 },
                            );
                        }
                    }

                    toastr.success(
                        t`World book "${displayName}" imported successfully!`,
                        t`Import Complete`,
                        { timeOut: 3000 },
                    );
                } catch (error) {
                    console.error("导入世界书失败:", error);
                    toastr.error(
                        t`Failed to import world book: ${error.message}`,
                        t`Import Failed`,
                        { timeOut: 5000 },
                    );
                }
            });

        section
            .querySelector("#ti_reset_all_btn")
            .addEventListener("click", () => {
                if (
                    !confirm(
                        t`This will refresh all indicator displays. Music playback will pause but playlist will reload. Your settings and cache are preserved. Continue?`,
                    )
                ) {
                    return;
                }
                const indicator = document.getElementById("typing_indicator");
                if (indicator) {
                    cleanupUnifiedIframe(indicator);
                    indicator.remove();
                }
                const player = document.getElementById("music_player");
                if (player) {
                    cleanupUnifiedIframe(player);
                    player.remove();
                }
                removeLyricsOverlay();
                isIndicatorPersisted = false;
                isPlayerInitialized = false;
                isPlaylistReady = false;
                isStatefulThemeLocked = false;
                currentDynamicThemeId = null;
                currentDynamicPresetId = null;
                dynamicPrevLock = null;
                currentPlayerTrack = null;
                currentLyrics = [];
                currentLyricIndex = -1;
                isTestIndicatorActive = false;
                settleListeningTime("manual_reset");
                listeningSession.isPlaying = false;
                const settings = getSettings();

                if (settings.persistentMode) {
                    isIndicatorPersisted = true;
                    setTimeout(() => showTypingIndicator("manual-reset"), 100);
                }

                if (settings.playerEnabled) {
                    setTimeout(async () => {
                        try {
                            showPlayer();
                            await new Promise((resolve) => {
                                const check = setInterval(() => {
                                    if (isPlayerInitialized) {
                                        clearInterval(check);
                                        resolve();
                                    }
                                }, 50);
                                setTimeout(() => {
                                    clearInterval(check);
                                    resolve();
                                }, 3000);
                            });
                            await buildAndSetInitialPlaylist();
                        } catch (err) {
                            console.error("[TI] 重置后播放器初始化失败:", err);
                        }
                    }, 200);
                }

                toastr.success(t`All indicators have been reset.`, "", {
                    timeOut: 2000,
                });
            });
    }

    // 辅助函数
    function updatePositionOptions() {
        const settings = getSettings();
        const currentTheme = settings.themes.find(
            (t) => t.id === settings.selectedThemeId,
        );
        const positionSelect = section.querySelector("#ti_position");
        if (!positionSelect) return;

        const allOptions = [
            { value: "floating_bottom", text: t`Bottom of Chat (Floating)` },
            { value: "bottom", text: t`Bottom of Chat (Compact)` },
            { value: "above_input", text: t`Above Input Bar (Compact)` },
            {
                value: "full_width_banner",
                text: t`Above Input Bar (Full-Width Banner)`,
            },
            { value: "chat_center", text: t`Chat Area Center` },
            { value: "draggable", text: t`Custom Draggable Position` },
        ];

        const defaultIframePositions = [
            "floating_bottom",
            "chat_center",
            "draggable",
        ];
        let availableOptions = allOptions;

        if (currentTheme && currentTheme.useIframe) {
            const supportedPositions = currentTheme.sizes
                ? Object.keys(currentTheme.sizes)
                : defaultIframePositions;
            availableOptions = allOptions.filter((opt) =>
                supportedPositions.includes(opt.value),
            );
            if (
                !supportedPositions.includes(settings.position) &&
                supportedPositions.length > 0
            ) {
                settings.position = supportedPositions[0];
                saveSettingsDebounced();
            }
        }

        positionSelect.innerHTML = availableOptions
            .map(
                (opt) =>
                    `<option value="${opt.value}" ${
                        settings.position === opt.value ? "selected" : ""
                    }>${opt.text}</option>`,
            )
            .join("");
    }

    function updateCharSpecificUI() {
        const charSettingsSection = section.querySelector(
            "#ti_char_specific_settings",
        );
        if (!charSettingsSection) return;

        const { themeId: activeThemeId, presetId: activePresetId } =
            getActiveThemeConfig();

        debugLog(
            `[TI] updateCharSpecificUI 调用，当前主题: ${activeThemeId}，预设: ${activePresetId}`,
        );

        loadThemeIntoMainEditor(activeThemeId);
        loadPresetIntoMainEditor(activePresetId);

        const isCharChat =
            this_chid !== undefined && characters[this_chid] && !selected_group;
        if (isCharChat) {
            charSettingsSection.style.display = "block";
            const overrideCheckbox = section.querySelector(
                "#ti_char_override_enabled",
            );
            const optionsContainer = section.querySelector(
                "#ti_char_options_container",
            );
            const themeSelect = section.querySelector("#ti_char_theme_select");
            const presetSelect = section.querySelector(
                "#ti_char_preset_select",
            );
            const presetRow = section.querySelector("#ti_char_preset_row");
            const charAvatar = characters[this_chid].avatar;
            const charConfig =
                getSettings().characterThemes?.[charAvatar] || {};
            const { themeId = "", presetId = "" } = charConfig;
            const isOverrideEnabled = !!(themeId || presetId);
            overrideCheckbox.checked = isOverrideEnabled;
            optionsContainer.style.display = isOverrideEnabled
                ? "block"
                : "none";
            themeSelect.value = themeId;
            presetSelect.value = presetId;
            const effectiveThemeIdForPresetRow = themeId || activeThemeId;
            const effectiveTheme = getSettings().themes.find(
                (t) => t.id === effectiveThemeIdForPresetRow,
            );
            const isIframe = effectiveTheme && effectiveTheme.useIframe;
            presetRow.style.display = isIframe ? "none" : "contents";
            setupCharacterSpecificEventListeners();
        } else {
            charSettingsSection.style.display = "none";
        }
    }

    let charSettingsController = null;

    function setupCharacterSpecificEventListeners() {
        if (charSettingsController) {
            charSettingsController.abort();
        }
        charSettingsController = new AbortController();
        const { signal } = charSettingsController;

        const overrideCheckbox = section.querySelector(
            "#ti_char_override_enabled",
        );
        const charThemeSelect = section.querySelector("#ti_char_theme_select");
        const charPresetSelect = section.querySelector(
            "#ti_char_preset_select",
        );

        if (overrideCheckbox) {
            overrideCheckbox.addEventListener(
                "change",
                (e) => {
                    const isChecked = e.target.checked;
                    const optionsContainer = section.querySelector(
                        "#ti_char_options_container",
                    );
                    optionsContainer.style.display = isChecked
                        ? "block"
                        : "none";

                    if (!isChecked) {
                        if (this_chid !== undefined && characters[this_chid]) {
                            const charAvatar = characters[this_chid].avatar;
                            const settings = getSettings();
                            if (settings.characterThemes?.[charAvatar]) {
                                delete settings.characterThemes[charAvatar];
                                saveSettingsDebounced();
                                setTimeout(() => {
                                    updateAndApplyTheme(
                                        "char_override_disabled_delayed",
                                    );
                                    updateCharSpecificUI();
                                    const currentSettings = getSettings();

                                    const revertMessage =
                                        currentSettings.autoFollowTheme
                                            ? t`Now following the main UI theme.`
                                            : t`Reverted to global settings.`;

                                    const finalToastMessage = `${t`Character-specific theme disabled.`} ${revertMessage}`;

                                    toastr.info(finalToastMessage, "", {
                                        timeOut: 2000,
                                    });
                                }, 50);
                            }
                        }
                    }
                },
                { signal },
            );
        }

        const saveAndApplyCharSettings = () => {
            manualOverrideActive = false;
            if (this_chid === undefined || !characters[this_chid]) return;
            const charAvatar = characters[this_chid].avatar;
            const settings = getSettings();

            const themeId = charThemeSelect.value;
            const presetId = charPresetSelect.value;

            if (!settings.characterThemes) settings.characterThemes = {};

            if (!themeId && !presetId) {
                delete settings.characterThemes[charAvatar];
            } else {
                const selectedTheme = settings.themes.find(
                    (t) => t.id === themeId,
                );
                const isIframe = selectedTheme && selectedTheme.useIframe;

                settings.characterThemes[charAvatar] = {
                    themeId: themeId,
                    presetId: isIframe ? null : presetId,
                };
            }

            saveSettingsDebounced();

            setTimeout(() => {
                updateAndApplyTheme("char_settings_changed_delayed");
                updateCharSpecificUI();
            }, 50);
        };

        charThemeSelect.addEventListener(
            "change",
            () => {
                saveAndApplyCharSettings();
                const themeId = charThemeSelect.value;
                const presetId = charPresetSelect.value;
                const settings = getSettings();
                const theme = settings.themes.find((t) => t.id === themeId);

                if (themeId) {
                    loadThemeIntoMainEditor(themeId);
                }

                if (theme && !theme.useIframe) {
                    const themeNameBase = theme.name
                        .replace(
                            /(-美化|-Style| Style|主题| Theme| \[CSS\]| \[iframe\])/g,
                            "",
                        )
                        .trim();
                    const recommendedPreset = settings.textPresets.find(
                        (p) => p.name === themeNameBase,
                    );

                    if (
                        recommendedPreset &&
                        recommendedPreset.id !== presetId
                    ) {
                        if (
                            confirm(
                                t`A matching text preset "${recommendedPreset.name}" was detected. Apply it now?`,
                            )
                        ) {
                            charPresetSelect.value = recommendedPreset.id;
                            saveAndApplyCharSettings();
                        }
                    }
                }
            },
            { signal },
        );

        charPresetSelect.addEventListener(
            "change",
            () => {
                saveAndApplyCharSettings();
                const presetId = charPresetSelect.value;
                const themeId = charThemeSelect.value;
                const settings = getSettings();
                const preset = settings.textPresets.find(
                    (p) => p.id === presetId,
                );

                if (presetId) {
                    loadPresetIntoMainEditor(presetId);
                }

                if (preset) {
                    const presetNameBase = preset.name;
                    const recommendedTheme = settings.themes.find((theme) => {
                        if (theme.useIframe) return false;
                        const themeNameClean = theme.name
                            .replace(
                                /(-美化|-Style| Style|主题| Theme| \[CSS\]| \[iframe\])/g,
                                "",
                            )
                            .trim();
                        return themeNameClean === presetNameBase;
                    });

                    if (recommendedTheme && recommendedTheme.id !== themeId) {
                        if (
                            confirm(
                                t`A matching style theme "${recommendedTheme.name}" was detected. Apply it now?`,
                            )
                        ) {
                            charThemeSelect.value = recommendedTheme.id;
                            saveAndApplyCharSettings();
                        }
                    }
                }
            },
            { signal },
        );
    }

    function loadThemeIntoMainEditor(themeId) {
        const globalThemeSelect = section.querySelector("#ti_theme_select");
        const themeToLoad = themeId || getSettings().selectedThemeId;

        if (globalThemeSelect && globalThemeSelect.value !== themeToLoad) {
            globalThemeSelect.value = themeToLoad;
        }

        const theme = getSettings().themes.find((t) => t.id === themeToLoad);
        if (!theme) {
            debugWarn(`[TI] 找不到主题 ${themeToLoad}`);
            return;
        }

        debugLog(
            `[TI] 加载主题到编辑器: ${theme.name}, useIframe: ${theme.useIframe}`,
        );

        requestAnimationFrame(() => {
            updateEditorMode(theme);
            applyTheme(themeToLoad);
        });
    }

    function loadPresetIntoMainEditor(presetId) {
        const globalPresetSelect = section.querySelector("#ti_preset_select");
        const presetTextarea = section.querySelector("#ti_preset_text");

        const presetToLoadId = presetId || getSettings().selectedTextPresetId;
        const presetToLoad =
            getSettings().textPresets.find((p) => p.id === presetToLoadId) ||
            getSettings().textPresets[0];

        debugLog(`[TI] 加载预设到编辑器: ${presetToLoad.name}`);

        if (globalPresetSelect && globalPresetSelect.value !== presetToLoadId) {
            globalPresetSelect.value = presetToLoadId;
        }

        if (presetTextarea && presetTextarea.value !== presetToLoad.text) {
            presetTextarea.value = presetToLoad.text;
            debugLog(`[TI] 预设文本已更新到编辑器`);
        }
    }

    function populatePresets() {
        const settings = getSettings();
        const currentId = settings.selectedTextPresetId;
        const tiPresetSelect = section.querySelector("#ti_preset_select");
        const tiPresetText = section.querySelector("#ti_preset_text");

        if (!tiPresetSelect || !tiPresetText) return;
        tiPresetSelect.innerHTML = settings.textPresets
            .map(
                (p) =>
                    `<option value="${p.id}" data-is-builtin="${
                        p.isBuiltIn || false
                    }" ${p.id === currentId ? "selected" : ""}>${p.name}</option>`,
            )
            .join("");

        const selectedPreset = settings.textPresets.find(
            (p) => p.id === currentId,
        );
        if (!selectedPreset) {
            settings.selectedTextPresetId = settings.textPresets[0]?.id;
            return populatePresets();
        }
        tiPresetText.value = selectedPreset.text;
        presetReadme.load(selectedPreset.readme);
    }

    function populateThemes() {
        const settings = getSettings();
        const tiThemeSelect = section.querySelector("#ti_theme_select");
        const currentId = settings.selectedThemeId;

        if (!tiThemeSelect) return;

        tiThemeSelect.innerHTML = settings.themes
            .filter(
                (theme) =>
                    !theme.name.startsWith("播放器") &&
                    !theme.name.startsWith("Player"),
            )
            .map((theme) => {
                const modeIndicator = theme.useIframe ? " [iframe]" : " [CSS]";
                return `<option value="${theme.id}" data-is-builtin="${
                    theme.isBuiltIn || false
                }" ${theme.id === currentId ? "selected" : ""}>${
                    theme.name
                }${modeIndicator}</option>`;
            })
            .join("");

        const selectedTheme =
            settings.themes.find((theme) => theme.id === currentId) ||
            settings.themes[0];
        requestAnimationFrame(() => {
            updateEditorMode(selectedTheme);
        });
    }

    function populatePlayerThemes() {
        const settings = getSettings();
        const playerThemeSelect = section.querySelector(
            "#ti_player_theme_select",
        );

        if (!playerThemeSelect) return;

        const playerThemes = settings.themes.filter(
            (t) => t.name.startsWith("播放器") || t.name.startsWith("Player"),
        );
        const currentId = settings.selectedPlayerThemeId;

        playerThemeSelect.innerHTML = playerThemes
            .map(
                (theme) =>
                    `<option value="${theme.id}" ${
                        theme.id === currentId ? "selected" : ""
                    }>${theme.name}</option>`,
            )
            .join("");

        const selectedTheme =
            playerThemes.find((theme) => theme.id === currentId) ||
            playerThemes[0];
        if (selectedTheme) {
            updatePlayerEditorMode(selectedTheme);
        } else {
            const fields = [
                "#ti_player_theme_html",
                "#ti_player_theme_iframe_css",
                "#ti_player_theme_iframe_js",
                "#ti_player_theme_iframe_sizes",
            ];
            fields.forEach((id) => {
                const el = section.querySelector(id);
                if (el) el.value = "";
            });
            playerThemeReadme.load(undefined);
        }
    }

    function updateEditorMode(theme) {
        const cssContainer = section.querySelector("#css_editor_container");
        const iframeContainer = section.querySelector(
            "#iframe_editor_container",
        );
        const cssRadio = section.querySelector("#theme_mode_css");
        const iframeRadio = section.querySelector("#theme_mode_iframe");
        const cssTextarea = section.querySelector("#ti_theme_css");
        const htmlTextarea = section.querySelector("#ti_theme_html");
        const iframeCssTextarea = section.querySelector("#ti_theme_iframe_css");
        const iframeJsTextarea = section.querySelector("#ti_theme_iframe_js");
        const presetSection = section.querySelector("#ti_preset_section");
        const sizesContainer = section.querySelector("#ti_sizes_container");
        const sizesTextarea = section.querySelector("#ti_theme_iframe_sizes");

        if (!cssContainer || !iframeContainer) return;

        if (theme.useIframe) {
            iframeRadio.checked = true;
            cssContainer.style.display = "none";
            iframeContainer.style.display = "flex";
            sizesContainer.style.display = "block";
            presetSection.style.display = "none";

            htmlTextarea.value = theme.html || "";
            iframeCssTextarea.value = theme.iframeCSS || "";
            iframeJsTextarea.value = theme.iframeJS || "";

            if (theme.sizes) {
                sizesTextarea.value = JSON.stringify(theme.sizes, null, 2);
            } else {
                sizesTextarea.value = "";
            }

            validateSizesJson();
        } else {
            cssRadio.checked = true;
            cssContainer.style.display = "block";
            iframeContainer.style.display = "none";
            sizesContainer.style.display = "none";
            presetSection.style.display = "block";
            cssTextarea.value = (theme.css || "").trim();
        }
        themeReadme.load(theme.readme);
    }

    function updatePlayerEditorMode(theme) {
        const htmlTextarea = section.querySelector("#ti_player_theme_html");
        const iframeCssTextarea = section.querySelector(
            "#ti_player_theme_iframe_css",
        );
        const iframeJsTextarea = section.querySelector(
            "#ti_player_theme_iframe_js",
        );
        const sizesTextarea = section.querySelector(
            "#ti_player_theme_iframe_sizes",
        );

        if (
            !htmlTextarea ||
            !iframeCssTextarea ||
            !iframeJsTextarea ||
            !sizesTextarea
        )
            return;

        htmlTextarea.value = theme.html || "";
        iframeCssTextarea.value = theme.iframeCSS || "";
        iframeJsTextarea.value = theme.iframeJS || "";

        if (theme.sizes) {
            sizesTextarea.value = JSON.stringify(theme.sizes, null, 2);
        } else {
            sizesTextarea.value = "";
        }

        validatePlayerSizesJson();
        playerThemeReadme.load(theme.readme);
    }

    function validateSizesJson() {
        const sizesTextarea = section.querySelector("#ti_theme_iframe_sizes");
        const sizesErrorDiv = section.querySelector(
            "#ti_theme_iframe_sizes_error",
        );

        if (!sizesTextarea || !sizesErrorDiv) return true;

        const text = sizesTextarea.value.trim();
        if (!text) {
            sizesErrorDiv.textContent = "";
            sizesErrorDiv.style.display = "none";
            return true;
        }
        try {
            JSON.parse(text);
            sizesErrorDiv.textContent = "";
            sizesErrorDiv.style.display = "none";
            return true;
        } catch (e) {
            sizesErrorDiv.textContent = t`JSON format error: ${e.message}`;
            sizesErrorDiv.style.display = "block";
            return false;
        }
    }

    function validatePlayerSizesJson() {
        const sizesTextarea = section.querySelector(
            "#ti_player_theme_iframe_sizes",
        );
        const sizesErrorDiv = section.querySelector(
            "#ti_player_theme_iframe_sizes_error",
        );

        if (!sizesTextarea || !sizesErrorDiv) return true;

        const text = sizesTextarea.value.trim();
        if (!text) {
            sizesErrorDiv.textContent = "";
            sizesErrorDiv.style.display = "none";
            return true;
        }
        try {
            JSON.parse(text);
            sizesErrorDiv.textContent = "";
            sizesErrorDiv.style.display = "none";
            return true;
        } catch (e) {
            sizesErrorDiv.textContent = t`JSON format error: ${e.message}`;
            sizesErrorDiv.style.display = "block";
            return false;
        }
    }

    function setupPresetEventListeners() {
        const tiPresetSelect = section.querySelector("#ti_preset_select");
        const tiPresetText = section.querySelector("#ti_preset_text");

        if (!tiPresetSelect || !tiPresetText) return;
        const presetInfoBtn = section.querySelector("#ti_preset_info");
        if (presetInfoBtn) {
            presetInfoBtn.addEventListener("click", () => {
                const settings = getSettings();
                const preset = settings.textPresets.find(
                    (p) => p.id === settings.selectedTextPresetId,
                );
                if (!preset) return;
                presetReadme.infoClick(preset);
            });
        }
        tiPresetSelect.addEventListener("change", () => {
            manualOverrideActive = true;
            const settings = getSettings();
            settings.selectedTextPresetId = tiPresetSelect.value;
            populatePresets();
            saveSettingsDebounced();

            $("#suggestion-container-theme").remove();

            const selectedPreset = settings.textPresets.find(
                (p) => p.id === settings.selectedTextPresetId,
            );
            if (!selectedPreset) return;

            const presetName = selectedPreset.name;
            const recommendedTheme = settings.themes.find((theme) => {
                const cleanThemeName = theme.name
                    .replace(/ \[CSS\]$/, "")
                    .replace(/ \[iframe\]$/, "")
                    .trim();
                return (
                    cleanThemeName === `${presetName}-美化` ||
                    cleanThemeName === `${presetName} Style` ||
                    cleanThemeName === `${presetName}-Style` ||
                    cleanThemeName === presetName
                );
            });

            if (
                recommendedTheme &&
                settings.selectedThemeId !== recommendedTheme.id
            ) {
                const suggestionContainer = $(
                    `<div id="suggestion-container-theme" style="padding: 8px; margin-top: 5px; background: var(--background-color-tertiary); border: 1px solid var(--border-color); border-radius: 6px; text-align: center; font-size: 0.9em;"></div>`,
                );
                const message = `<i class="fa-solid fa-lightbulb" style="color:#f0c674;margin-right:4px;"></i>${t`Found a matching theme`}: "<b>${
                    recommendedTheme.name
                }</b>". `;
                const applyLink = $(
                    `<a href="#" style="margin-left: 8px; font-weight: bold;">[${t`Apply`}]</a>`,
                );

                applyLink.on("click", (e) => {
                    e.preventDefault();
                    settings.selectedThemeId = recommendedTheme.id;
                    const tiThemeSelect =
                        section.querySelector("#ti_theme_select");
                    if (tiThemeSelect) {
                        tiThemeSelect.value = recommendedTheme.id;
                    }
                    populateThemes();
                    applyTheme(recommendedTheme.id);
                    saveSettingsDebounced();
                    suggestionContainer.remove();
                });

                suggestionContainer.html(message).append(applyLink);
                $(section.querySelector("#ti_theme_select"))
                    .parent()
                    .after(suggestionContainer);
            }

            refreshLiveIndicators("preset_select_change");
            section.querySelector("#preview_theme").click();
        });

        section
            .querySelector("#ti_preset_save")
            .addEventListener("click", () => {
                const settings = getSettings();
                const p = settings.textPresets.find(
                    (p) => p.id === tiPresetSelect.value,
                );
                if (p) {
                    p.text = tiPresetText.value;
                    const hasReadme = presetReadme.save(p);
                    saveSettingsDebounced();
                    savedToast(p.name, hasReadme);
                    refreshLiveIndicators("preset_save");
                }
            });

        section
            .querySelector("#ti_preset_add")
            .addEventListener("click", () => {
                const settings = getSettings();
                const n = prompt(t`Preset Name`);
                if (n) {
                    const p = {
                        id: Date.now().toString(),
                        name: n,
                        text: "",
                    };
                    settings.textPresets.push(p);
                    settings.selectedTextPresetId = p.id;
                    populatePresets();
                    saveSettingsDebounced();
                    openEditorAfterCreate(
                        "#ti_preset_editor_details",
                        "#ti_preset_text",
                    );
                }
            });

        section
            .querySelector("#ti_preset_rename")
            .addEventListener("click", () => {
                const settings = getSettings();
                const preset = settings.textPresets.find(
                    (p) => p.id === settings.selectedTextPresetId,
                );
                if (!preset) return;

                const newName = prompt(
                    t`Enter new name for preset:`,
                    preset.name,
                );
                if (newName && newName.trim() !== "") {
                    preset.name = newName.trim();
                    populatePresets();
                    saveSettingsDebounced();
                    toastr.success(t`Preset renamed successfully!`);
                }
            });

        section
            .querySelector("#ti_preset_del")
            .addEventListener("click", () => {
                const settings = getSettings();
                if (settings.textPresets.length <= 1) {
                    toastr.warning(t`Cannot delete the last preset.`);
                    return;
                }
                const p = settings.textPresets.find(
                    (p) => p.id === tiPresetSelect.value,
                );
                if (
                    confirm(
                        t`Are you sure you want to delete the preset "${p?.name}"?`,
                    )
                ) {
                    if (p?.isBuiltIn) {
                        if (!settings.deletedBuiltIns) {
                            settings.deletedBuiltIns = {
                                themes: [],
                                textPresets: [],
                                bubbleStyles: [],
                            };
                        }
                        if (
                            !settings.deletedBuiltIns.textPresets.includes(p.id)
                        ) {
                            settings.deletedBuiltIns.textPresets.push(p.id);
                        }
                    }
                    settings.textPresets = settings.textPresets.filter(
                        (pr) => pr.id !== p.id,
                    );
                    settings.selectedTextPresetId = settings.textPresets[0].id;
                    populatePresets();
                    saveSettingsDebounced();
                    if (typeof saveSettings === "function") {
                        saveSettings();
                    }
                }
            });

        // 导入导出
        section
            .querySelector("#ti_preset_import")
            .addEventListener("click", () =>
                createImportHandler(
                    "preset",
                    getSettings().textPresets,
                    populatePresets,
                    (id) => {
                        getSettings().selectedTextPresetId = id;
                    },
                ),
            );
        section
            .querySelector("#ti_preset_export")
            .addEventListener("click", () =>
                createExportHandler(
                    "preset",
                    getSettings().textPresets,
                    getSettings().selectedTextPresetId,
                ),
            );
    }

    function setupThemeEventListeners() {
        const tiThemeSelect = section.querySelector("#ti_theme_select");

        if (!tiThemeSelect) return;

        const themeInfoBtn = section.querySelector("#ti_theme_info");
        if (themeInfoBtn) {
            themeInfoBtn.addEventListener("click", () => {
                const settings = getSettings();
                const theme = settings.themes.find(
                    (t) => t.id === settings.selectedThemeId,
                );
                if (!theme) return;
                themeReadme.infoClick(theme);
            });
        }

        tiThemeSelect.addEventListener("change", () => {
            manualOverrideActive = true;
            const settings = getSettings();
            settings.selectedThemeId = tiThemeSelect.value;

            const selectedTheme = settings.themes.find(
                (t) => t.id === settings.selectedThemeId,
            );
            if (selectedTheme) {
                updateGlobalDefs(selectedTheme);
            }

            updatePositionOptions();
            populateThemes();
            applyTheme(settings.selectedThemeId);
            saveSettingsDebounced();

            if (getSettings().persistentMode) {
                const indicator = document.getElementById("typing_indicator");
                if (indicator) {
                    $(indicator).stop(true, true);
                    cleanupUnifiedIframe(indicator);
                    indicator.remove();
                }
                showTypingIndicator("persistent-retheme");
            }

            $("#suggestion-container-preset").remove();

            if (selectedTheme && !selectedTheme.useIframe) {
                let themeNameClean = selectedTheme.name
                    .replace(/ \[CSS\]$/, "")
                    .trim();
                let baseName = themeNameClean;
                const styleSuffixes = [
                    "-美化",
                    "-Style",
                    " Style",
                    "主题",
                    " Theme",
                ];
                for (const suffix of styleSuffixes) {
                    if (themeNameClean.endsWith(suffix)) {
                        baseName = themeNameClean
                            .substring(0, themeNameClean.length - suffix.length)
                            .trim();
                        break;
                    }
                }

                const recommendedPreset = settings.textPresets.find(
                    (p) => p.name === baseName,
                );

                if (
                    recommendedPreset &&
                    settings.selectedTextPresetId !== recommendedPreset.id
                ) {
                    const suggestionContainer = $(
                        `<div id="suggestion-container-preset" style="padding: 8px; margin-top: 5px; background: var(--background-color-tertiary); border: 1px solid var(--border-color); border-radius: 6px; text-align: center; font-size: 0.9em;"></div>`,
                    );
                    const message = `<i class="fa-solid fa-lightbulb" style="color:#f0c674;margin-right:4px;"></i>${t`Found a matching preset`}: "<b>${
                        recommendedPreset.name
                    }</b>".`;
                    const applyLink = $(
                        `<a href="#" style="margin-left: 8px; font-weight: bold;">[${t`Apply`}]</a>`,
                    );

                    applyLink.on("click", (e) => {
                        e.preventDefault();
                        settings.selectedTextPresetId = recommendedPreset.id;
                        const tiPresetSelect =
                            section.querySelector("#ti_preset_select");
                        if (tiPresetSelect) {
                            tiPresetSelect.value = recommendedPreset.id;
                        }
                        populatePresets();
                        saveSettingsDebounced();
                        suggestionContainer.remove();
                        refreshLiveIndicators("theme_suggestion_applied");
                    });

                    suggestionContainer.html(message).append(applyLink);
                    $(section.querySelector("#ti_preset_select"))
                        .parent()
                        .after(suggestionContainer);
                }
            }

            refreshLiveIndicators("theme_select_change");
            setTimeout(() => {
                section.querySelector("#preview_theme").click();
            }, 50);
            if (isTestIndicatorActive) {
                const testIndicator =
                    document.getElementById("typing_indicator");
                if (testIndicator) {
                    refreshIndicatorContent(testIndicator);
                }
            }
        });

        const cssRadio = section.querySelector("#theme_mode_css");
        const iframeRadio = section.querySelector("#theme_mode_iframe");

        function handleModeChange() {
            const settings = getSettings();
            const currentTheme = settings.themes.find(
                (t) => t.id === settings.selectedThemeId,
            );
            if (!currentTheme) return;
            currentTheme.useIframe = iframeRadio.checked;
            updateEditorMode(currentTheme);
            populateThemes();
            updatePositionOptions();
        }

        cssRadio.addEventListener("change", handleModeChange);
        iframeRadio.addEventListener("change", handleModeChange);

        section
            .querySelector("#ti_theme_save")
            .addEventListener("click", async () => {
                const settings = getSettings();
                const themeToSave = settings.themes.find(
                    (theme) => theme.id === tiThemeSelect.value,
                );
                if (!themeToSave) return;

                const isModeIframe =
                    section.querySelector("#theme_mode_iframe").checked;
                themeToSave.useIframe = isModeIframe;

                if (isModeIframe) {
                    const jsCodeToValidate = section.querySelector(
                        "#ti_theme_iframe_js",
                    ).value;
                    const validationResult =
                        await validateJavaScriptSyntax(jsCodeToValidate);

                    if (!validationResult.isValid) {
                        const err = validationResult.error;
                        toastr.error(
                            t`JavaScript syntax error!<br><b>Error:</b> ${err.message}<br><b>Location:</b> Line ${err.line}, Column ${err.column}`,
                            t`Save Failed`,
                            { timeOut: 10000, escapeHtml: false },
                        );
                        return;
                    }
                    if (!validateSizesJson()) {
                        toastr.error(
                            t`The JSON format for Sizes configuration is incorrect, please fix it!`,
                            t`Save Failed`,
                        );
                        return;
                    }
                    themeToSave.html =
                        section.querySelector("#ti_theme_html").value;
                    themeToSave.iframeCSS = section.querySelector(
                        "#ti_theme_iframe_css",
                    ).value;
                    themeToSave.iframeJS = section.querySelector(
                        "#ti_theme_iframe_js",
                    ).value;

                    const sizesText = section
                        .querySelector("#ti_theme_iframe_sizes")
                        .value.trim();
                    if (sizesText) {
                        try {
                            themeToSave.sizes = JSON.parse(sizesText);
                        } catch (e) {
                            toastr.error(
                                t`Could not parse Sizes configuration, please check the format.`,
                                t`Save Failed`,
                            );
                            return;
                        }
                    } else {
                        delete themeToSave.sizes;
                    }
                    themeToSave.css = "";
                } else {
                    themeToSave.css =
                        section.querySelector("#ti_theme_css").value;
                    delete themeToSave.html;
                    delete themeToSave.iframeCSS;
                    delete themeToSave.iframeJS;
                    delete themeToSave.sizes;
                }

                const hasReadme = themeReadme.save(themeToSave);
                updateGlobalDefs(themeToSave);
                applyTheme(themeToSave.id);
                saveSettingsDebounced();
                populateThemes();
                savedToast(themeToSave.name, hasReadme);
                refreshLiveIndicators("theme_save");
                setTimeout(() => {
                    section.querySelector("#preview_theme").click();
                }, 50);
                if (isTestIndicatorActive) {
                    const testIndicator =
                        document.getElementById("typing_indicator");
                    if (testIndicator) {
                        refreshIndicatorContent(testIndicator);
                    }
                }
            });

        section.querySelector("#ti_theme_add").addEventListener("click", () => {
            const settings = getSettings();
            const n = prompt(t`Theme Name`);
            if (!n) return;
            const currentTheme = settings.themes.find(
                (theme) => theme.id === settings.selectedThemeId,
            );
            const isNewThemeIframe = currentTheme
                ? currentTheme.useIframe
                : false;
            const newTheme = {
                id: Date.now().toString(),
                name: n,
                useIframe: isNewThemeIframe,
            };

            if (isNewThemeIframe) {
                newTheme.html = "";
                newTheme.iframeCSS = "";
                newTheme.iframeJS = "";
            } else {
                newTheme.css = "";
            }
            settings.themes.push(newTheme);
            settings.selectedThemeId = newTheme.id;
            populateThemes();
            applyTheme(newTheme.id);
            saveSettingsDebounced();
            openEditorAfterCreate(
                "#ti_theme_editor_details",
                isNewThemeIframe ? "#ti_theme_html" : "#ti_theme_css",
            );
        });

        section
            .querySelector("#ti_theme_rename")
            .addEventListener("click", () => {
                const settings = getSettings();
                const theme = settings.themes.find(
                    (t) => t.id === settings.selectedThemeId,
                );
                if (!theme) return;

                const newName = prompt(
                    t`Enter new name for theme:`,
                    theme.name,
                );
                if (newName && newName.trim() !== "") {
                    theme.name = newName.trim();
                    populateThemes();
                    saveSettingsDebounced();
                    toastr.success(t`Theme renamed successfully!`);
                }
            });

        section.querySelector("#ti_theme_del").addEventListener("click", () => {
            const settings = getSettings();
            if (tiThemeSelect.value === "default") {
                toastr.error(t`The default theme cannot be deleted.`);
                return;
            }
            const themeToDelete = settings.themes.find(
                (theme) => theme.id === tiThemeSelect.value,
            );
            if (
                confirm(
                    t`Are you sure you want to delete the theme "${themeToDelete?.name}"?`,
                )
            ) {
                if (themeToDelete?.isBuiltIn) {
                    if (!settings.deletedBuiltIns) {
                        settings.deletedBuiltIns = {
                            themes: [],
                            textPresets: [],
                            bubbleStyles: [],
                        };
                    }
                    if (
                        !settings.deletedBuiltIns.themes.includes(
                            themeToDelete.id,
                        )
                    ) {
                        settings.deletedBuiltIns.themes.push(themeToDelete.id);
                    }
                }
                settings.themes = settings.themes.filter(
                    (th) => th.id !== themeToDelete.id,
                );
                settings.selectedThemeId = "default";
                populateThemes();
                applyTheme("default");
                saveSettingsDebounced();
                if (typeof saveSettings === "function") {
                    saveSettings();
                }
            }
        });

        section
            .querySelector("#preview_theme")
            .addEventListener("click", async () => {
                const previewArea =
                    document.getElementById("theme_preview_area");
                const settings = getSettings();
                const currentThemeId = tiThemeSelect.value;

                const previewTheme = {
                    id: `preview-${currentThemeId}`,
                    name: "Preview Theme",
                    useIframe:
                        document.getElementById("theme_mode_iframe").checked,
                };

                if (previewTheme.useIframe) {
                    const jsCodeToValidate =
                        document.getElementById("ti_theme_iframe_js").value;
                    const validationResult =
                        await validateJavaScriptSyntax(jsCodeToValidate);

                    if (!validationResult.isValid) {
                        const err = validationResult.error;
                        previewArea.innerHTML = `
        <div style="color: var(--error-color); padding: 20px; text-align: left; font-family: monospace;">
            <h4>${t`JavaScript preview failed`}</h4>
            <p><b>${t`Error:`}</b> ${err.message}</p>
            <p><b>${t`Location:`}</b> ${t`Line`} ${err.line}, ${t`Column`} ${
                err.column
            }</p>
        </div>`;
                        return;
                    }
                    previewTheme.html =
                        document.getElementById("ti_theme_html").value;
                    previewTheme.iframeCSS = document.getElementById(
                        "ti_theme_iframe_css",
                    ).value;
                    previewTheme.iframeJS = jsCodeToValidate;
                    const sizesText = document
                        .getElementById("ti_theme_iframe_sizes")
                        .value.trim();
                    if (sizesText) {
                        try {
                            previewTheme.sizes = JSON.parse(sizesText);
                        } catch (e) {
                            console.warn(
                                "Preview sizes JSON is invalid, using defaults.",
                            );
                            toastr.error(
                                t`Preview sizes JSON format is invalid!`,
                            );
                        }
                    }
                } else {
                    previewTheme.css =
                        document.getElementById("ti_theme_css").value;
                }

                previewArea.innerHTML = "";
                const oldPreviewStyle =
                    document.getElementById("temp_preview_style");
                if (oldPreviewStyle) oldPreviewStyle.remove();

                const previewIndicator = document.createElement("div");
                previewIndicator.className = "typing_indicator";
                previewIndicator.style.position = "relative";

                const previewCharName = getCurrentCharName();
                const previewUserName = getCurrentUserName();
                const previewAvatarUrls = getAvatarUrls();

                if (previewTheme.useIframe) {
                    previewIndicator.classList.add("iframe-theme");

                    const defaultIframeSizes = {
                        floating_bottom: { width: "320px", height: "110px" },
                        chat_center: { width: "350px", height: "120px" },
                        draggable: { width: "320px", height: "110px" },
                    };
                    const themeSizes = previewTheme.sizes || defaultIframeSizes;
                    const size = themeSizes.draggable ||
                        themeSizes.floating_bottom ||
                        themeSizes.chat_center || {
                            width: "320px",
                            height: "110px",
                        };

                    previewIndicator.style.width = size.width || "auto";
                    previewIndicator.style.height = size.height || "auto";
                    if (size.maxWidth)
                        previewIndicator.style.maxWidth = size.maxWidth;
                    if (size.maxHeight)
                        previewIndicator.style.maxHeight = size.maxHeight;
                    previewIndicator.style.resize = "none";
                    previewIndicator.style.overflow = "hidden";

                    const wrapper = document.createElement("div");
                    wrapper.style.cssText =
                        "display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;";

                    wrapper.appendChild(previewIndicator);
                    previewArea.appendChild(wrapper);

                    setTimeout(() => {
                        const previewAreaWidth = previewArea.clientWidth;
                        const previewAreaHeight = previewArea.clientHeight;
                        const themeWidth = previewIndicator.offsetWidth;
                        const themeHeight = previewIndicator.offsetHeight;

                        if (themeWidth > 0 && themeHeight > 0) {
                            const scaleX = previewAreaWidth / themeWidth;
                            const scaleY = previewAreaHeight / themeHeight;
                            const scale = Math.min(scaleX, scaleY, 1);

                            if (scale < 1) {
                                previewIndicator.style.transform = `scale(${scale})`;
                                previewIndicator.style.transformOrigin =
                                    "center center";
                            }
                        }
                    }, 0);

                    createUnifiedIframeOriginal(
                        previewTheme,
                        previewIndicator,
                        previewCharName,
                    );
                } else {
                    previewArea.appendChild(previewIndicator);
                    previewIndicator.style.margin = "0 auto";

                    const textPreset =
                        settings.textPresets.find(
                            (p) =>
                                p.id ===
                                section.querySelector("#ti_preset_select")
                                    .value,
                        ) || settings.textPresets[0];

                    let htmlContent = (textPreset.text || "正在输入...")
                        .replace(/\$\{name2\}/g, previewCharName)
                        .replace(/\{\{char\}\}/g, previewCharName)
                        .replace(/\{\{user\}\}/g, previewUserName)
                        .replace(
                            /\{\{char_avatar_url\}\}/g,
                            previewAvatarUrls.char,
                        )
                        .replace(
                            /\{\{user_avatar_url\}\}/g,
                            previewAvatarUrls.user,
                        )
                        .replace(
                            /\{\{char_avatar\}\}/g,
                            `<img class="typing-indicator-avatar" src="${previewAvatarUrls.char}">`,
                        )
                        .replace(
                            /\{\{user_avatar\}\}/g,
                            `<img class="typing-indicator-avatar" src="${previewAvatarUrls.user}">`,
                        );

                    const defsRegex = /<defs>([\s\S]*?)<\/defs>/i;
                    const match = htmlContent.match(defsRegex);
                    if (match && match[0]) {
                        updateGlobalDefs({
                            name: "preview-theme",
                            text: match[0],
                        });
                        htmlContent = htmlContent.replace(match[0], "");
                    }

                    previewIndicator.innerHTML = `<span class="typing_indicator_text" style="font-family: inherit;">${htmlContent}</span>`;

                    const previewStyle = document.createElement("style");
                    previewStyle.id = "temp_preview_style";
                    let scopedCss = (previewTheme.css || "").replace(
                        /\.typing_indicator/g,
                        "#theme_preview_area .typing_indicator",
                    );
                    previewStyle.innerHTML = scopedCss;
                    document.head.appendChild(previewStyle);
                }
            });

        section
            .querySelector("#ti_theme_import")
            .addEventListener("click", () =>
                createImportHandler(
                    "theme",
                    getSettings().themes,
                    populateThemes,
                    (id) => {
                        getSettings().selectedThemeId = id;
                        applyTheme(id);
                    },
                ),
            );
        section
            .querySelector("#ti_theme_export")
            .addEventListener("click", () =>
                createExportHandler(
                    "theme",
                    getSettings().themes,
                    getSettings().selectedThemeId,
                ),
            );

        const formatSizesButton = section.querySelector(
            "#ti_format_iframe_sizes",
        );
        const sizesTextarea = section.querySelector("#ti_theme_iframe_sizes");

        if (formatSizesButton && sizesTextarea) {
            formatSizesButton.addEventListener("click", () => {
                const text = sizesTextarea.value.trim();
                const defaultSizesJsonString = JSON.stringify(
                    {
                        floating_bottom: {
                            width: "90vw",
                            height: "110px",
                            maxWidth: "320px",
                        },
                        chat_center: {
                            width: "90vw",
                            height: "120px",
                            maxWidth: "350px",
                        },
                        draggable: {
                            width: "90vw",
                            height: "110px",
                            maxWidth: "320px",
                        },
                    },
                    null,
                    2,
                );

                if (!text) {
                    sizesTextarea.value = defaultSizesJsonString;
                    validateSizesJson();
                    toastr.success(
                        t`Default size examples have been filled in.`,
                        "",
                        {
                            timeOut: 1000,
                        },
                    );
                    return;
                }

                try {
                    const parsed = JSON.parse(text);
                    sizesTextarea.value = JSON.stringify(parsed, null, 2);
                    validateSizesJson();
                    toastr.success(t`JSON has been formatted.`, "", {
                        timeOut: 1000,
                    });
                } catch (e) {
                    validateSizesJson();
                    toastr.error(
                        t`JSON format is incorrect, cannot format!`,
                        "",
                        {
                            timeOut: 2000,
                        },
                    );
                }
            });

            sizesTextarea.addEventListener("input", validateSizesJson);
        }
    }

    function setupPlayerThemeEventListeners() {
        const playerThemeSelect = section.querySelector(
            "#ti_player_theme_select",
        );

        if (!playerThemeSelect) return;

        const playerThemeInfoBtn = section.querySelector(
            "#ti_player_theme_info",
        );
        if (playerThemeInfoBtn) {
            playerThemeInfoBtn.addEventListener("click", () => {
                const settings = getSettings();
                const theme = settings.themes.find(
                    (t) => t.id === settings.selectedPlayerThemeId,
                );
                if (!theme) return;
                playerThemeReadme.infoClick(theme);
            });
        }
        playerThemeSelect.addEventListener("change", () => {
            const settings = getSettings();
            settings.selectedPlayerThemeId = playerThemeSelect.value;
            saveSettingsDebounced();

            const selectedTheme = settings.themes.find(
                (t) => t.id === settings.selectedPlayerThemeId,
            );
            if (selectedTheme) {
                requestAnimationFrame(() =>
                    updatePlayerEditorMode(selectedTheme),
                );
            }

            if (settings.playerEnabled) {
                reloadPlayer();
            }
        });

        section
            .querySelector("#ti_player_theme_save")
            .addEventListener("click", async () => {
                const settings = getSettings();
                const themeToSave = settings.themes.find(
                    (theme) => theme.id === playerThemeSelect.value,
                );
                if (!themeToSave) return;

                const jsCodeToValidate = section.querySelector(
                    "#ti_player_theme_iframe_js",
                ).value;
                const validationResult =
                    await validateJavaScriptSyntax(jsCodeToValidate);
                if (!validationResult.isValid) {
                    const err = validationResult.error;
                    toastr.error(
                        t`JavaScript syntax error!<br><b>Error:</b> ${err.message}<br><b>Location:</b> Line ${err.line}, Column ${err.column}`,
                        t`Save Failed`,
                        { timeOut: 10000, escapeHtml: false },
                    );
                    return;
                }
                if (!validatePlayerSizesJson()) {
                    toastr.error(
                        t`The JSON format for Sizes configuration is incorrect, please fix it!`,
                        t`Save Failed`,
                    );
                    return;
                }

                themeToSave.useIframe = true;
                themeToSave.html = section.querySelector(
                    "#ti_player_theme_html",
                ).value;
                themeToSave.iframeCSS = section.querySelector(
                    "#ti_player_theme_iframe_css",
                ).value;
                themeToSave.iframeJS = section.querySelector(
                    "#ti_player_theme_iframe_js",
                ).value;

                const sizesText = section
                    .querySelector("#ti_player_theme_iframe_sizes")
                    .value.trim();
                if (sizesText) {
                    try {
                        themeToSave.sizes = JSON.parse(sizesText);
                    } catch (e) {
                        toastr.error(
                            t`Could not parse Sizes configuration, please check the format.`,
                            t`Save Failed`,
                        );
                        return;
                    }
                } else {
                    delete themeToSave.sizes;
                }

                const hasReadme = playerThemeReadme.save(themeToSave);
                saveSettingsDebounced();
                populatePlayerThemes();
                populateThemes();
                savedToast(themeToSave.name, hasReadme);
                if (settings.playerEnabled) {
                    reloadPlayer();
                }
            });

        section
            .querySelector("#ti_player_theme_add")
            .addEventListener("click", () => {
                const settings = getSettings();
                const n = prompt(t`Theme Name`);
                if (n) {
                    const newTheme = {
                        id: Date.now().toString(),
                        name:
                            n.startsWith("播放器") || n.startsWith("Player")
                                ? n
                                : `Player-${n}`,
                        useIframe: true,
                        html: "",
                        iframeCSS: "",
                        iframeJS: "",
                    };
                    settings.themes.push(newTheme);
                    settings.selectedPlayerThemeId = newTheme.id;
                    populatePlayerThemes();
                    populateThemes();
                    saveSettingsDebounced();
                    openEditorAfterCreate(
                        "#ti_player_editor_details",
                        "#ti_player_theme_html",
                    );
                }
            });

        section
            .querySelector("#ti_player_theme_rename")
            .addEventListener("click", () => {
                const settings = getSettings();
                const theme = settings.themes.find(
                    (t) => t.id === settings.selectedPlayerThemeId,
                );
                if (!theme) return;

                const newName = prompt(
                    t`Enter new name for theme:`,
                    theme.name,
                );
                if (newName && newName.trim() !== "") {
                    theme.name = newName.trim();
                    populatePlayerThemes();
                    populateThemes();
                    saveSettingsDebounced();
                    toastr.success(t`Theme renamed successfully!`);
                }
            });

        section
            .querySelector("#ti_player_theme_del")
            .addEventListener("click", () => {
                const settings = getSettings();
                const themeToDelete = settings.themes.find(
                    (theme) => theme.id === playerThemeSelect.value,
                );
                if (
                    confirm(
                        t`Are you sure you want to delete the player theme "${themeToDelete?.name}"?`,
                    )
                ) {
                    if (themeToDelete?.isBuiltIn) {
                        if (!settings.deletedBuiltIns) {
                            settings.deletedBuiltIns = {
                                themes: [],
                                textPresets: [],
                                bubbleStyles: [],
                            };
                        }
                        if (
                            !settings.deletedBuiltIns.themes.includes(
                                themeToDelete.id,
                            )
                        ) {
                            settings.deletedBuiltIns.themes.push(
                                themeToDelete.id,
                            );
                        }
                    }
                    settings.themes = settings.themes.filter(
                        (th) => th.id !== themeToDelete.id,
                    );
                    const remainingPlayerThemes = settings.themes.filter(
                        (t) =>
                            t.name.startsWith("播放器") ||
                            t.name.startsWith("Player"),
                    );
                    settings.selectedPlayerThemeId =
                        remainingPlayerThemes.length > 0
                            ? remainingPlayerThemes[0].id
                            : null;
                    populatePlayerThemes();
                    populateThemes();
                    saveSettingsDebounced();
                    if (typeof saveSettings === "function") {
                        saveSettings();
                    }
                    if (
                        settings.playerEnabled &&
                        remainingPlayerThemes.length === 0
                    ) {
                        settings.playerEnabled = false;
                        section.querySelector("#ti_player_enabled").checked =
                            false;
                        section.querySelector(
                            "#ti_player_controls",
                        ).style.display = "none";
                        hidePlayer();
                        toastr.warning(
                            t`No player themes available, the player has been disabled.`,
                        );
                    }
                }
            });

        section
            .querySelector("#ti_player_theme_import")
            .addEventListener("click", () =>
                createImportHandler(
                    "theme",
                    getSettings().themes,
                    () => {
                        populatePlayerThemes();
                        populateThemes();
                    },
                    (id) => {
                        getSettings().selectedPlayerThemeId = id;
                    },
                ),
            );
        section
            .querySelector("#ti_player_theme_export")
            .addEventListener("click", () =>
                createExportHandler(
                    "theme",
                    getSettings().themes,
                    getSettings().selectedPlayerThemeId,
                ),
            );

        const formatSizesButton = section.querySelector(
            "#ti_player_format_iframe_sizes",
        );
        const sizesTextarea = section.querySelector(
            "#ti_player_theme_iframe_sizes",
        );

        if (formatSizesButton && sizesTextarea) {
            formatSizesButton.addEventListener("click", () => {
                const text = sizesTextarea.value.trim();
                const defaultSizesJsonString = JSON.stringify(
                    {
                        draggable: {
                            width: "80px",
                            height: "100px",
                        },
                    },
                    null,
                    2,
                );

                if (!text) {
                    sizesTextarea.value = defaultSizesJsonString;
                    validatePlayerSizesJson();
                    toastr.success(
                        t`Default size examples have been filled in.`,
                        "",
                        {
                            timeOut: 1000,
                        },
                    );
                    return;
                }

                try {
                    const parsed = JSON.parse(text);
                    sizesTextarea.value = JSON.stringify(parsed, null, 2);
                    validatePlayerSizesJson();
                    toastr.success(t`JSON has been formatted.`, "", {
                        timeOut: 1000,
                    });
                } catch (e) {
                    validatePlayerSizesJson();
                    toastr.error(
                        t`JSON format is incorrect, cannot format!`,
                        "",
                        {
                            timeOut: 2000,
                        },
                    );
                }
            });

            sizesTextarea.addEventListener("input", validatePlayerSizesJson);
        }
    }

    // 导入导出处理器
    function createImportHandler(type, list, populateFn, onImported) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json,.json";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    let validation = false;
                    if (type === "theme") {
                        validation =
                            imported.name &&
                            ((!imported.useIframe && imported.css) ||
                                (imported.useIframe && imported.html));
                    } else {
                        validation = imported.name && imported.text;
                    }
                    if (!validation)
                        throw new Error(t`Invalid ${type} format.`);

                    const newItem = {
                        id: imported.id || Date.now().toString(),
                        name: imported.name,
                    };

                    if (type === "theme") {
                        newItem.useIframe = imported.useIframe || false;
                        if (newItem.useIframe) {
                            newItem.html = imported.html || "";
                            newItem.iframeCSS = imported.iframeCSS || "";
                            newItem.iframeJS = imported.iframeJS || "";
                            if (
                                imported.sizes &&
                                typeof imported.sizes === "object" &&
                                !Array.isArray(imported.sizes)
                            ) {
                                newItem.sizes = imported.sizes;
                            }
                        } else {
                            newItem.css = imported.css || "";
                        }
                        if (imported.readme) {
                            newItem.readme = imported.readme;
                        }
                    } else {
                        newItem.text = imported.text;
                        if (imported.readme) {
                            newItem.readme = imported.readme;
                        }
                    }

                    const existingIndex = list.findIndex(
                        (item) => item.id === newItem.id,
                    );
                    if (existingIndex !== -1) {
                        list[existingIndex] = newItem;
                        _needsSync = true;
                    } else {
                        list.push(newItem);
                    }

                    if (type === "theme") {
                        updateGlobalDefs(newItem);
                    }

                    onImported(newItem.id);
                    populateFn();
                    saveSettingsDebounced();
                    toastr.success(
                        type === "theme"
                            ? t`Theme "${newItem.name}" imported.`
                            : t`Preset "${newItem.name}" imported.`,
                    );
                } catch (error) {
                    toastr.error(
                        type === "theme"
                            ? t`Failed to import theme: ${error.message}`
                            : t`Failed to import preset: ${error.message}`,
                    );
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

    function createExportHandler(type, list, selectedId) {
        const item = list.find((i) => i.id === selectedId);
        if (!item) return;
        const exportItem = { ...item };
        exportItem._metadata = {
            exportedAt: new Date().toISOString(),
            exportedBy: "SillyTavern Typing Indicator Themes Extension",
        };
        const blob = new Blob([JSON.stringify(exportItem, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        let fileName = item.name.replace(/[\\/*?:"<>|]/g, "_");
        let suffix = "";

        if (type === "theme") {
            suffix = item.useIframe ? " [iframe]" : " [CSS]";
        } else if (type === "preset") {
            suffix = " [Preset]";
        }

        fileName += suffix;
        a.download = `${fileName}.json`;

        a.click();
        URL.revokeObjectURL(url);
        a.remove();
    }

    return render;
}

function initializeObservers() {
    if (bodyClassObserver) {
        bodyClassObserver.disconnect();
    }
    setupFloatingIndicatorAutoAdjust();
    bodyClassObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (
                mutation.type === "attributes" &&
                mutation.attributeName === "class"
            ) {
                setTimeout(() => handleMainThemeChange(), 100);
                setTimeout(() => {
                    if (lyricsOverlayElement) {
                        lyricsOverlayElement.style.fontFamily =
                            getComputedStyle(document.body).fontFamily;
                    }
                }, 200);
            }
        }
    });
    bodyClassObserver.observe(document.body, { attributes: true });

    if (stopButtonObserver) {
        stopButtonObserver.disconnect();
    }
    const stopButton = document.getElementById("mes_stop");
    if (stopButton) {
        let stopButtonHideTimer = null;
        stopButtonObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (
                    mutation.attributeName === "style" ||
                    mutation.attributeName === "class"
                ) {
                    const inlineDisplay = stopButton.style.display;
                    const isHidden = inlineDisplay === "none";
                    if (!isHidden) {
                        stopButtonHasAppearedFlag = true;
                        if (stopButtonHideTimer) {
                            clearTimeout(stopButtonHideTimer);
                            stopButtonHideTimer = null;
                        }
                        const tiSettings = getSettings();
                        if (
                            tiSettings.enabled &&
                            !tiSettings.persistentMode &&
                            !isIndicatorPersisted &&
                            !isTestIndicatorActive &&
                            !currentDynamicThemeId &&
                            !dynamicThemeTimeoutId &&
                            !document.getElementById("typing_indicator")
                        ) {
                            updateAndApplyTheme("stop_button_appeared");
                            showTypingIndicator("stop-button-fallback");
                        }
                        continue;
                    }

                    const settings = getSettings();
                    const indicator =
                        document.getElementById("typing_indicator");
                    if (isHidden && !settings.persistentMode && indicator) {
                        if (
                            settings.enableDynamicThemes &&
                            (currentDynamicThemeId || dynamicThemeTimeoutId)
                        ) {
                            continue;
                        }
                        if (stopButtonHideTimer)
                            clearTimeout(stopButtonHideTimer);
                        stopButtonHideTimer = setTimeout(() => {
                            stopButtonHideTimer = null;
                            const stillHidden =
                                window.getComputedStyle(stopButton).display ===
                                "none";
                            const stillExists =
                                document.getElementById("typing_indicator");
                            const curSettings = getSettings();
                            if (
                                stillHidden &&
                                stillExists &&
                                !curSettings.persistentMode &&
                                !isIndicatorPersisted &&
                                !(
                                    curSettings.enableDynamicThemes &&
                                    (currentDynamicThemeId ||
                                        dynamicThemeTimeoutId)
                                )
                            ) {
                                hideTypingIndicator();
                            }
                        }, 500);
                    }
                }
            }
        });
        stopButtonObserver.observe(stopButton, { attributes: true });
    }
}

// ==================== 事件监听器设置 ====================
(function () {
    let isInitialized = false;

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            verboseLog("[TI] 页面已显示。");
            if (
                listeningSession.isPlaying &&
                listeningStatsUpdateCallback &&
                !listeningStatsUpdateTimer
            ) {
                startStatsUpdateTimer();
            }
        } else {
            verboseLog("[TI] 页面已隐藏，更新操作暂停。");
            if (bubbleRenderScheduled) {
                bubbleRenderQueue.clear();
                bubbleRenderScheduled = false;
            }
            stopStatsUpdateTimer();
        }
    });
    document.addEventListener("click", function (event) {
        const target = event.target.closest(".music-bubble-from-regex");
        if (target) {
            event.preventDefault();
            event.stopPropagation();

            const bubbleTitle = target.dataset.title;
            const bubbleArtist = target.dataset.artist;
            const isCurrentTrack = fuzzyMatchTrack(
                bubbleTitle,
                bubbleArtist,
                currentPlayerTrack,
            );

            if (isCurrentTrack) {
                const playerIframe = document.querySelector(
                    "#music_player .theme-iframe",
                );
                if (playerIframe && playerIframe.contentWindow) {
                    playerIframe.contentWindow.postMessage(
                        {
                            source: "typing-indicator-host",
                            type: "toggle-playback",
                        },
                        "*",
                    );
                }
                return;
            }
            const songData = {
                title: bubbleTitle,
                artist: bubbleArtist,
            };

            debugLog("[Player][气泡] 点击播放请求:", songData);
            handleSongPlayRequest(songData);
        }
    });

    loadScript("https://cdn.jsdelivr.net/npm/acorn/dist/acorn.min.js");

    const processedAppendMessages = new Set();
    const appendedSongKeys = new Set();
    async function appendNewSongs(messageId) {
        if (!extension_settings[MODULE]?.playerEnabled) return;
        if (processedAppendMessages.has(messageId)) return;
        if (processedAppendMessages.size > 500) {
            const iterator = processedAppendMessages.values();
            for (let i = 0; i < 100; i++) {
                const val = iterator.next();
                if (val.done) break;
                processedAppendMessages.delete(val.value);
            }
        }
        const newSongs = await findSongsInMessage(messageId);
        if (newSongs.length === 0) return;
        processedAppendMessages.add(messageId);

        const trulyNewSongs = newSongs.filter((song) => {
            const key =
                song.id && song.source
                    ? `${song.id}-${song.source}`
                    : `${(song.title || song.name || "").toLowerCase()}-${(Array.isArray(
                          song.artist,
                      )
                          ? song.artist.join(",")
                          : song.artist || ""
                      ).toLowerCase()}`;
            if (appendedSongKeys.has(key)) return false;
            if (appendedSongKeys.size > 1000) {
                appendedSongKeys.clear();
            }
            appendedSongKeys.add(key);
            return true;
        });

        if (trulyNewSongs.length === 0) {
            verboseLog(`[Player] 所有歌曲已追加过，跳过: 消息 ${messageId}`);
            return;
        }

        debugLog(
            `[Player] 消息 ${messageId} 中发现 ${trulyNewSongs.length} 首新歌`,
        );
        const playerIframe = document.querySelector(
            "#music_player .theme-iframe",
        );
        if (playerIframe && playerIframe.contentWindow) {
            playerIframe.contentWindow.postMessage(
                {
                    source: "typing-indicator-host",
                    type: "append-songs-to-playlist",
                    data: trulyNewSongs,
                    insertAfterCurrent: true,
                },
                "*",
            );
        }
    }

    window.addEventListener("message", (event) => {
        if (
            event.data?.source !== "typing-indicator-host" &&
            event.data?.source !== "typing-indicator-theme"
        ) {
            return;
        }

        const { type, data, themeId, containerId } = event.data;
        if (type === "theme-loaded" && containerId) {
            postContextWhenReady(containerId);
        }
        if (event.data.source === "typing-indicator-theme") {
            if (type === "theme-drag-start") {
                const player = document.getElementById("music_player");
                if (player) {
                    if (getSettings().playerPosition.locked) {
                        return;
                    }
                    const rect = player.getBoundingClientRect();
                    player.dataset._origTransition =
                        player.style.transition || "";
                    player.style.transition = "none";
                    player.style.left = rect.left + "px";
                    player.style.top = rect.top + "px";
                    player.style.transform = "none";
                    void player.offsetHeight;
                    player._dragOrigin = {
                        left: rect.left,
                        top: rect.top,
                        width: rect.width,
                        height: rect.height,
                    };
                    player._pendingDrag = null;
                    player._dragRaf = null;
                }
                return;
            }
            if (type === "theme-drag-move") {
                const player = document.getElementById("music_player");
                if (player && player._dragOrigin && data) {
                    player._pendingDrag = data;
                    if (!player._dragRaf) {
                        player._dragRaf = requestAnimationFrame(() => {
                            player._dragRaf = null;
                            if (!player._pendingDrag || !player._dragOrigin)
                                return;
                            const dx = player._pendingDrag.dx || 0;
                            const dy = player._pendingDrag.dy || 0;
                            const o = player._dragOrigin;
                            const maxX = window.innerWidth - o.width;
                            const maxY = window.innerHeight - o.height;
                            const finalLeft = Math.max(
                                0,
                                Math.min(maxX, o.left + dx),
                            );
                            const finalTop = Math.max(
                                0,
                                Math.min(maxY, o.top + dy),
                            );
                            const useDx = finalLeft - o.left;
                            const useDy = finalTop - o.top;
                            player.style.transform = `translate3d(${useDx}px, ${useDy}px, 0)`;
                        });
                    }
                }
                return;
            }
            if (type === "theme-drag-end") {
                const player = document.getElementById("music_player");
                if (player && player._dragOrigin) {
                    if (player._dragRaf) {
                        cancelAnimationFrame(player._dragRaf);
                        player._dragRaf = null;
                    }
                    const rect = player.getBoundingClientRect();
                    player.style.transform = "none";
                    player.style.left = rect.left + "px";
                    player.style.top = rect.top + "px";
                    const _settings = getSettings();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    _settings.playerPosition.x =
                        (centerX / window.innerWidth) * 100;
                    _settings.playerPosition.y =
                        (centerY / window.innerHeight) * 100;
                    saveSettingsDebounced();
                    player._dragOrigin = null;
                    player._pendingDrag = null;
                    player.style.transition =
                        player.dataset._origTransition || "";
                    delete player.dataset._origTransition;
                }
                return;
            }

            if (type === "player-initialized") {
                isPlayerInitialized = true;
                debugLog("[TI] ✓ 播放器已就绪");
                return;
            }
            if (type === "cache-track-data") {
                if (data) {
                    const {
                        title,
                        artist,
                        trackData,
                        audioUrl,
                        lyricsContent,
                        tlyricContent,
                        coverUrl,
                    } = data;

                    verboseLog("[Player][缓存] 收到播放器数据:", {
                        title,
                        artist,
                        id: trackData?.id,
                    });
                    if (title && artist && trackData?.artist) {
                        if (
                            !MusicUtils.isArtistMatch(artist, trackData.artist)
                        ) {
                            debugWarn(
                                `[Player][缓存] ⚠️ 歌手不匹配，拒绝缓存\n  期望: ${artist}\n  实际: ${trackData.artist}`,
                            );
                            return;
                        }
                    }

                    if (title && artist && trackData) {
                        MusicCache.setSearch(title, artist, trackData);
                        verboseLog("[Player][缓存] ✓ 写入搜索缓存");
                    }
                    if (trackData?.id && trackData?.source) {
                        if (audioUrl) {
                            MusicCache.setAudio(
                                trackData.id,
                                trackData.source,
                                audioUrl,
                            );
                            verboseLog("[Player][缓存] ✓ 写入音频缓存");
                        }
                        if (lyricsContent) {
                            MusicCache.setLyrics(
                                trackData.id,
                                trackData.source,
                                lyricsContent,
                                tlyricContent || "",
                            );
                            verboseLog("[Player][缓存] ✓ 写入歌词缓存");
                        }
                        if (coverUrl) {
                            MusicCache.setCover(
                                trackData.id,
                                trackData.source,
                                coverUrl,
                            );
                            verboseLog("[Player][缓存] ✓ 写入封面缓存");
                        }
                        if (coverUrl && title && artist) {
                            const songList =
                                document.querySelector("#ti_song_list");
                            if (songList) {
                                songList
                                    .querySelectorAll(".ti-song-item")
                                    .forEach((item) => {
                                        const titleEl = item.querySelector(
                                            ".ti-song-item-title",
                                        );
                                        const artistEl = item.querySelector(
                                            ".ti-song-item-artist",
                                        );
                                        if (!titleEl || !artistEl) return;
                                        const itemTitle =
                                            titleEl.textContent.trim();
                                        const itemArtist =
                                            artistEl.textContent.trim();
                                        if (
                                            MusicUtils.isTitleMatch(
                                                title,
                                                itemTitle,
                                            ) &&
                                            MusicUtils.isArtistMatch(
                                                artist,
                                                itemArtist,
                                            )
                                        ) {
                                            const imgEl = item.querySelector(
                                                ".ti-song-item-cover",
                                            );
                                            if (
                                                imgEl &&
                                                imgEl.getAttribute("src") !==
                                                    coverUrl
                                            ) {
                                                imgEl.setAttribute(
                                                    "referrerpolicy",
                                                    "no-referrer",
                                                );
                                                imgEl.src = coverUrl;
                                                debugLog(
                                                    `[Player][缓存] ✓ 已同步更新歌单封面: ${itemTitle}`,
                                                );
                                            }
                                        }
                                    });
                            }
                        }
                    }
                }
                return;
            }
            if (type === "register-stateful-theme" && themeId) {
                statefulThemes.add(themeId);
                return;
            }
            if (type === "request-chat-scan") {
                debugLog("[TI] 收到扫描聊天记录请求");
                if (!containerId) {
                    debugWarn(
                        "[TI] request-chat-scan: containerId 缺失，跳过处理",
                    );
                    return;
                }
                scanChatForSongs()
                    .then((songs) => {
                        debugLog(
                            `[TI] 扫描完成，找到 ${songs.length} 首歌曲`,
                            songs,
                        );

                        if (songs.length > 0) {
                            const iframe = document.querySelector(
                                `#${containerId} .theme-iframe`,
                            );
                            if (iframe && iframe.contentWindow) {
                                queuePostMessage(
                                    iframe.contentWindow,
                                    {
                                        source: "typing-indicator-host",
                                        type: "append-songs-to-playlist",
                                        data: songs,
                                    },
                                    "*",
                                );
                            }
                        } else {
                            toastr.info(
                                t`No BGM tags found in chat history`,
                                "",
                                {
                                    timeOut: 2000,
                                },
                            );
                        }
                    })
                    .catch((err) => {
                        console.error("[TI] 扫描失败:", err);
                        toastr.error(t`Scan failed`, "", { timeOut: 2000 });
                    });
            }

            if (type === "set-overlay-mode") {
                const indicator = document.getElementById("typing_indicator");
                if (indicator) {
                    indicator.style.position = "fixed";
                    indicator.style.top = "0";
                    indicator.style.left = "0";
                    indicator.style.bottom = "0";
                    indicator.style.right = "0";
                    indicator.style.transform = "none";
                    const settings = getSettings();
                    const isDraggableAndUnlocked =
                        settings.position === "draggable" &&
                        !settings.customPosition.locked;
                    const pointerEventsValue = isDraggableAndUnlocked
                        ? "auto"
                        : "none";
                    indicator.style.pointerEvents = pointerEventsValue;
                    const iframe = indicator.querySelector(".theme-iframe");
                    if (iframe) iframe.style.pointerEvents = pointerEventsValue;
                    indicator.dataset.overlayMode = "1";

                    if (
                        iframe &&
                        iframe.contentWindow &&
                        !iframe._scrollForwardInjected &&
                        !isDraggableAndUnlocked
                    ) {
                        try {
                            const win = iframe.contentWindow;
                            const getChatEl = () =>
                                document.getElementById("chat");

                            win.addEventListener(
                                "wheel",
                                (e) => {
                                    const chatEl = getChatEl();
                                    if (!chatEl) return;
                                    if (e.cancelable) e.preventDefault();
                                    chatEl.scrollTop += e.deltaY;
                                },
                                { passive: false },
                            );

                            let lastTouchY = 0;
                            win.addEventListener(
                                "touchstart",
                                (e) => {
                                    if (e.touches.length === 1) {
                                        lastTouchY = e.touches[0].clientY;
                                    }
                                },
                                { passive: true },
                            );

                            win.addEventListener(
                                "touchmove",
                                (e) => {
                                    if (e.touches.length !== 1) return;
                                    const chatEl = getChatEl();
                                    if (!chatEl) return;
                                    if (e.cancelable) e.preventDefault();
                                    const currentY = e.touches[0].clientY;
                                    chatEl.scrollTop += lastTouchY - currentY;
                                    lastTouchY = currentY;
                                },
                                { passive: false },
                            );

                            iframe._scrollForwardInjected = true;
                        } catch (err) {
                            console.warn("[TI] 滚动转发注入失败:", err);
                        }
                    }
                }
                return;
            }

            if (type === "set-shutdown-timeout" && themeId) {
                const duration = parseInt(data.duration, 10);
                if (duration > 200 && duration <= 5000)
                    themeShutdownTimeouts[themeId] = duration;
                return;
            }
            if (!themeId || themeId === "preview") return;

            if (!extension_settings[MODULE].themeData)
                extension_settings[MODULE].themeData = {};
            if (!extension_settings[MODULE].themeData[themeId])
                extension_settings[MODULE].themeData[themeId] = {};

            switch (type) {
                case "request-data":
                    const savedData =
                        extension_settings[MODULE].themeData[themeId] || {};
                    if (event.source) {
                        event.source.postMessage(
                            {
                                source: "typing-indicator-host",
                                type: "data-response",
                                data: savedData,
                            },
                            event.origin,
                        );
                    }
                    break;
                case "save-data":
                    extension_settings[MODULE].themeData[themeId] = data;
                    saveSettingsDebounced();
                    break;
                case "resize-iframe":
                    if (containerId) {
                        const elementToResize =
                            document.getElementById(containerId);
                        if (
                            elementToResize &&
                            data &&
                            data.width &&
                            data.height
                        ) {
                            elementToResize.style.transition =
                                "width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
                            elementToResize.style.width = data.width;
                            elementToResize.style.height = data.height;
                        }
                    }
                    break;
                case "play-bgm-from-regex":
                    if (data) {
                        handleSongPlayRequest(data);
                    }
                    break;
                case "favorite-query-list":
                    if (data && data.track) {
                        getFavoriteSnapshot(data.track)
                            .then((snap) => {
                                if (event.source) {
                                    event.source.postMessage(
                                        {
                                            source: "typing-indicator-host",
                                            type: "favorite-list-response",
                                            data: {
                                                playlists: snap.all,
                                                statusMap: snap.statusMap,
                                            },
                                        },
                                        event.origin,
                                    );
                                }
                            })
                            .catch((e) =>
                                console.error("[Player][收藏] 查询失败:", e),
                            );
                    }
                    break;
                case "favorite-query-status":
                    if (data && data.track) {
                        broadcastFavoriteStatus(data.track);
                    }
                    break;
                case "favorite-toggle-playlist":
                    if (data && data.track && data.playlistId) {
                        (async () => {
                            try {
                                if (data.isCurrentlyIn) {
                                    const pl = await PlaylistAPI.get(
                                        data.playlistId,
                                    );
                                    const trackArtistStr = Array.isArray(
                                        data.track.artist,
                                    )
                                        ? data.track.artist.join(",")
                                        : data.track.artist || "";
                                    const idx = (pl.songs || []).findIndex(
                                        (s) => {
                                            const sArtist = Array.isArray(
                                                s.artist,
                                            )
                                                ? s.artist.join(",")
                                                : s.artist || "";
                                            return (
                                                MusicUtils.isTitleMatch(
                                                    data.track.title,
                                                    s.title,
                                                ) &&
                                                MusicUtils.isArtistMatch(
                                                    trackArtistStr,
                                                    sArtist,
                                                )
                                            );
                                        },
                                    );
                                    if (idx >= 0) {
                                        await PlaylistAPI.removeSongs(
                                            data.playlistId,
                                            { indices: [idx] },
                                        );
                                        toastr.info(
                                            t`Removed from "${pl.name}"`,
                                            "",
                                            { timeOut: 1200 },
                                        );
                                    }
                                } else {
                                    await PlaylistAPI.addSongs(
                                        data.playlistId,
                                        [
                                            {
                                                title: data.track.title,
                                                artist: data.track.artist,
                                                cover:
                                                    data.track.coverUrl || "",
                                            },
                                        ],
                                    );
                                    const list = await PlaylistAPI.list();
                                    const pl = list.find(
                                        (p) => p.id === data.playlistId,
                                    );
                                    toastr.success(
                                        t`Added to "${pl ? pl.name : ""}"`,
                                        "",
                                        { timeOut: 1200 },
                                    );
                                }
                                broadcastFavoriteStatus(data.track);
                                if (window._tiPlaylistPanelNotify) {
                                    window._tiPlaylistPanelNotify({
                                        affectedPlaylistId: data.playlistId,
                                    });
                                }
                            } catch (e) {
                                console.error("[Player][收藏] 操作失败:", e);
                                toastr.error(e.message || t`Operation failed`);
                            }
                        })();
                    }
                    break;
                case "favorite-create-playlist":
                    if (data && data.track && data.name) {
                        (async () => {
                            try {
                                const pl = await PlaylistAPI.create(data.name);
                                await PlaylistAPI.addSongs(pl.id, [
                                    {
                                        title: data.track.title,
                                        artist: data.track.artist,
                                        cover: data.track.coverUrl || "",
                                    },
                                ]);
                                toastr.success(
                                    t`Created "${pl.name}" and added song`,
                                    "",
                                    { timeOut: 1500 },
                                );
                                broadcastFavoriteStatus(data.track);
                                if (window._tiPlaylistPanelNotify) {
                                    window._tiPlaylistPanelNotify({
                                        affectedPlaylistId: pl.id,
                                    });
                                }
                            } catch (e) {
                                console.error("[Player][收藏] 创建失败:", e);
                                toastr.error(e.message || t`Create failed`);
                            }
                        })();
                    }
                    break;
                case "playback-state-changed":
                    if (data) {
                        const { isPlaying, currentTrack, lyrics } = data;
                        if (isPlaying && currentTrack) {
                            startListeningSession();
                            startStatsUpdateTimer();
                            const _s = getSettings();
                            if (_s.rememberPlaybackProgress) {
                                let activePlaylistId = _s.selectedPlaylistId;
                                if (
                                    _s.playlistSourceMode ===
                                    "character_playlist"
                                ) {
                                    const charAvatar =
                                        this_chid !== undefined &&
                                        characters[this_chid]
                                            ? characters[this_chid].avatar
                                            : null;
                                    activePlaylistId =
                                        charAvatar && _s.characterPlaylists
                                            ? _s.characterPlaylists[charAvatar]
                                            : null;
                                }
                                const progressKey = getProgressKey(
                                    _s.playlistSourceMode,
                                    activePlaylistId,
                                );
                                if (progressKey) {
                                    if (!_s.lastPlaybackProgress)
                                        _s.lastPlaybackProgress = {};
                                    const savedTitle =
                                        currentTrack.originalTitle ||
                                        currentTrack.title ||
                                        currentTrack.name ||
                                        "";
                                    const savedArtist =
                                        currentTrack.originalArtist ||
                                        (Array.isArray(currentTrack.artist)
                                            ? currentTrack.artist.join(" / ")
                                            : currentTrack.artist || "");
                                    _s.lastPlaybackProgress[progressKey] = {
                                        title: savedTitle,
                                        artist: savedArtist,
                                        updatedAt: Date.now(),
                                    };
                                    saveSettingsDebounced();
                                    debugLog(
                                        `[Player][记忆] ✓ 保存进度 key="${progressKey}" → "${savedTitle}" - "${savedArtist}"`,
                                    );
                                } else {
                                    debugWarn(
                                        `[Player][记忆] ⚠️ progressKey 为空，无法保存进度（mode=${_s.playlistSourceMode}）`,
                                    );
                                }
                            }
                        } else if (!isPlaying) {
                            settleListeningTime("paused");
                            listeningSession.isPlaying = false;
                            stopStatsUpdateTimer();
                            if (listeningStatsUpdateCallback) {
                                listeningStatsUpdateCallback();
                            }
                            if (
                                typeof _updatePlaylistPlayingState ===
                                "function"
                            ) {
                                _updatePlaylistPlayingState();
                            }
                        }
                        if (currentTrack) {
                            const settings = getSettings();
                            if (settings.lyricsEnabled && isPlaying) {
                                if (isPlaying && currentTrack) {
                                    const normalizeArtistForCompare = (a) =>
                                        Array.isArray(a)
                                            ? a.join(",")
                                            : a || "";

                                    const isNewTrack =
                                        !currentPlayerTrack ||
                                        currentTrack.name !==
                                            currentPlayerTrack?.name ||
                                        normalizeArtistForCompare(
                                            currentTrack.artist,
                                        ) !==
                                            normalizeArtistForCompare(
                                                currentPlayerTrack?.artist,
                                            );

                                    if (isNewTrack) {
                                        if (lyrics && lyrics.length > 0) {
                                            currentLyrics = lyrics;
                                            currentLyricIndex = -1;
                                            const hasAnyTranslation =
                                                lyrics.some(
                                                    (line) =>
                                                        line.translated &&
                                                        line.translated.trim() !==
                                                            "",
                                                );
                                            _autoShowTranslationFlag =
                                                hasAnyTranslation;

                                            showLyricsOverlay();
                                            debugLog(
                                                `[Player][歌词] ✓ 收到: ${lyrics.length} 行, 有翻译: ${hasAnyTranslation}`,
                                            );
                                            refreshLyricsOverlay();
                                        } else {
                                            currentLyrics = [];
                                            _autoShowTranslationFlag = false;
                                            hideLyricsOverlay();
                                        }
                                    }
                                }
                            }

                            currentPlayerTrack = currentTrack;

                            if (
                                typeof _updatePlaylistPlayingState ===
                                "function"
                            ) {
                                _updatePlaylistPlayingState();
                            }

                            document
                                .querySelectorAll(".music-bubble-from-regex")
                                .forEach((el) => {
                                    const bubbleTitle = el.dataset.title;
                                    const bubbleArtist = el.dataset.artist;
                                    const matchesCurrent = fuzzyMatchTrack(
                                        bubbleTitle,
                                        bubbleArtist,
                                        currentTrack,
                                    );

                                    if (matchesCurrent && isPlaying) {
                                        el.classList.add("is-playing");
                                    } else {
                                        el.classList.remove("is-playing");
                                    }
                                });
                        }
                    }
                    break;
                case "playback-progress":
                    if (data) {
                        const {
                            currentTrack,
                            progress,
                            currentTime,
                            duration,
                            currentTimeRaw,
                        } = data;

                        document
                            .querySelectorAll(
                                ".music-bubble-from-regex.is-playing",
                            )
                            .forEach((el) => {
                                const bubbleTitle = el.dataset.title;
                                const bubbleArtist = el.dataset.artist;

                                const matchesCurrent = fuzzyMatchTrack(
                                    bubbleTitle,
                                    bubbleArtist,
                                    currentTrack,
                                );

                                if (matchesCurrent) {
                                    const progressBar =
                                        el.querySelector(".tp-progress-bar");
                                    if (progressBar) {
                                        progressBar.style.animation = "none";
                                        progressBar.style.width = `${progress}%`;
                                    }

                                    const timeDisplay =
                                        el.querySelector(".tp-time");
                                    if (timeDisplay) {
                                        timeDisplay.textContent = `${currentTime} / ${Math.round(
                                            progress,
                                        )}%`;
                                    }
                                }
                            });

                        if (typeof currentTimeRaw === "number") {
                            updateLyricsDisplay(currentTimeRaw);
                        }
                    }
                    break;
                case "audio-playback-failed":
                    if (data && data.id && data.source) {
                        const _failedSrcLower = String(
                            data.source,
                        ).toLowerCase();
                        let originalTitle = "";
                        let originalArtist = "";
                        if (currentPlayerTrack) {
                            originalTitle =
                                currentPlayerTrack.originalTitle ||
                                data.title ||
                                currentPlayerTrack.title ||
                                currentPlayerTrack.name ||
                                "";
                            const aRaw =
                                currentPlayerTrack.originalArtist ||
                                data.artist ||
                                currentPlayerTrack.artist;
                            originalArtist = Array.isArray(aRaw)
                                ? aRaw.join(" / ")
                                : aRaw || "";
                        } else {
                            originalTitle = data.title || "";
                            originalArtist = data.artist || "";
                        }

                        MusicCache.invalidateAudio(data.id, data.source);

                        const playerIframe = document.querySelector(
                            "#music_player .theme-iframe",
                        );
                        const sourceMap = {
                            Netease: "netease",
                            Tencent: "tencent",
                            Kuwo: "kuwo",
                        };
                        const apiSource =
                            sourceMap[data.source] || data.source.toLowerCase();

                        const replyEmpty = () => {
                            if (playerIframe && playerIframe.contentWindow) {
                                playerIframe.contentWindow.postMessage(
                                    {
                                        source: "typing-indicator-host",
                                        type: "audio-url-refreshed",
                                        data: {
                                            audioUrl: "",
                                            trackIndex: data.trackIndex,
                                        },
                                    },
                                    "*",
                                );
                            }
                        };

                        const goCrossSource = (isApiFailure = true) => {
                            if (!originalTitle || !originalArtist) {
                                replyEmpty();
                                return;
                            }
                            if (isApiFailure) {
                                ApiHealthMonitor.recordFailure(
                                    `song:${_failedSrcLower}`,
                                );
                                debugLog(
                                    `[ApiHealth] 累计 song:${_failedSrcLower} 失败一次（达到 ${ApiHealthMonitor.BLACKLIST_THRESHOLD} 次将熔断 ${ApiHealthMonitor.BLACKLIST_DURATION / 60000} 分钟）`,
                                );
                            }
                            debugLog("[TI] 同源刷新失败，转入跨源搜索...");
                            const allTriedSources = Array.isArray(
                                data.triedSources,
                            )
                                ? [...data.triedSources]
                                : [];
                            if (
                                data.source &&
                                !allTriedSources.includes(data.source)
                            ) {
                                allTriedSources.push(data.source);
                            }
                            searchSongWithDedup(
                                originalTitle,
                                originalArtist,
                                allTriedSources,
                            )
                                .then(async (newTrack) => {
                                    if (
                                        !playerIframe ||
                                        !playerIframe.contentWindow
                                    )
                                        return;
                                    if (!newTrack || !newTrack.audioUrl) {
                                        debugLog(
                                            "[TI] 跨源也搜不到，告知播放器无可用音源",
                                        );
                                        MusicCache.invalidateTrack(
                                            data.id,
                                            data.source,
                                        );
                                        if (originalTitle) {
                                            MusicCache.invalidateSearch(
                                                originalTitle,
                                                originalArtist,
                                            );
                                        }
                                        replyEmpty();
                                        return;
                                    }
                                    MusicCache.invalidateTrack(
                                        data.id,
                                        data.source,
                                    );
                                    if (originalTitle) {
                                        MusicCache.invalidateSearch(
                                            originalTitle,
                                            originalArtist,
                                        );
                                    }
                                    if (currentPlayerTrack) {
                                        currentPlayerTrack.id = newTrack.id;
                                        currentPlayerTrack.source =
                                            newTrack.source;
                                    }
                                    playerIframe.contentWindow.postMessage(
                                        {
                                            source: "typing-indicator-host",
                                            type: "audio-url-refreshed",
                                            data: {
                                                audioUrl: newTrack.audioUrl,
                                                trackIndex: data.trackIndex,
                                                lyricsContent:
                                                    newTrack.lyricsContent ||
                                                    "",
                                                tlyricContent:
                                                    newTrack.tlyricContent ||
                                                    "",
                                                newId: newTrack.id,
                                                newSource: newTrack.source,
                                                newCoverUrl:
                                                    newTrack.coverUrl || "",
                                                seamless: true,
                                            },
                                        },
                                        "*",
                                    );
                                    const _hostSettings = getSettings();
                                    if (
                                        _hostSettings.lyricsEnabled &&
                                        newTrack.lyricsContent
                                    ) {
                                        const mainLines = parseLRC(
                                            newTrack.lyricsContent,
                                        );
                                        const transLines = parseLRC(
                                            newTrack.tlyricContent || "",
                                        );
                                        const transMap = new Map();
                                        transLines.forEach((t) =>
                                            transMap.set(
                                                t.time.toFixed(2),
                                                t.text,
                                            ),
                                        );
                                        currentLyrics = mainLines.map(
                                            (line) => ({
                                                time: line.time,
                                                text: line.text,
                                                translated:
                                                    transMap.get(
                                                        line.time.toFixed(2),
                                                    ) ||
                                                    line.translated ||
                                                    "",
                                            }),
                                        );
                                        currentLyricIndex = -1;
                                        lastLyricsProgress = -1;
                                        if (currentLyrics.length > 0) {
                                            const hasTrans = currentLyrics.some(
                                                (l) => l.translated,
                                            );
                                            _autoShowTranslationFlag = hasTrans;
                                            showLyricsOverlay();
                                            refreshLyricsOverlay();
                                            debugLog(
                                                `[TI] ✓ 悬浮歌词已无缝刷新: ${currentLyrics.length} 行`,
                                            );
                                        }
                                    }
                                    debugLog(
                                        `[TI] ✓ 无缝换源到 ${newTrack.source}`,
                                    );
                                })
                                .catch((err) => {
                                    console.error("[TI] 跨源搜索失败:", err);
                                    replyEmpty();
                                });
                        };

                        debugLog("[TI] 第一级：尝试同源刷新 URL...");
                        fetch(
                            `/api/plugins/g-player-proxy/song?id=${data.id}&source=${apiSource}`,
                        )
                            .then((res) => res.json())
                            .then((songData) => {
                                let newAudioUrl = "";
                                if (songData?.data) {
                                    newAudioUrl = Array.isArray(songData.data)
                                        ? songData.data[0]?.url || ""
                                        : songData.data.url || "";
                                }
                                const isMp4 = newAudioUrl.includes(".mp4");
                                const isNeedFallback = songData?._needFallback;

                                if (newAudioUrl && !isMp4 && !isNeedFallback) {
                                    MusicUtils.checkAudioDuration(
                                        newAudioUrl,
                                    ).then((dur) => {
                                        if (
                                            dur !== null &&
                                            dur <=
                                                MusicUtils.MIN_PLAYABLE_DURATION
                                        ) {
                                            debugWarn(
                                                `[TI] ⚠️ 同源刷新仍是试听版(${dur.toFixed(1)}s)，转跨源`,
                                            );
                                            goCrossSource(false);
                                            return;
                                        }
                                        ApiHealthMonitor.recordSuccess(
                                            `song:${_failedSrcLower}`,
                                        );
                                        MusicCache.setAudio(
                                            data.id,
                                            data.source,
                                            newAudioUrl,
                                        );
                                        MusicCache.markAudioAsVerified(
                                            data.id,
                                            data.source,
                                        );
                                        debugLog(
                                            "[TI] ✓ 同源刷新成功，无缝继续播放",
                                        );
                                        if (
                                            playerIframe &&
                                            playerIframe.contentWindow
                                        ) {
                                            playerIframe.contentWindow.postMessage(
                                                {
                                                    source: "typing-indicator-host",
                                                    type: "audio-url-refreshed",
                                                    data: {
                                                        audioUrl: newAudioUrl,
                                                        trackIndex:
                                                            data.trackIndex,
                                                        seamless: true,
                                                    },
                                                },
                                                "*",
                                            );
                                        }
                                    });
                                    return;
                                }
                                goCrossSource(false);
                            })
                            .catch((err) => {
                                console.warn("[TI] 同源刷新请求异常:", err);
                                goCrossSource();
                            });
                    }
                    break;
                case "player-expanding": {
                    const player = document.getElementById("music_player");
                    if (player) {
                        const settings = getSettings();
                        if (!playerOriginalPosition) {
                            playerOriginalPosition = {
                                x: settings.playerPosition.x,
                                y: settings.playerPosition.y,
                            };
                        }
                        player.style.transition =
                            "left 0.3s ease, top 0.3s ease";
                        player.style.left = `${window.innerWidth / 2}px`;
                        player.style.top = `${window.innerHeight / 2}px`;
                        player.style.transform = "translate(-50%, -50%)";

                        setTimeout(() => {
                            if (player) player.style.transition = "";
                        }, 300);
                    }
                    break;
                }

                case "player-collapsing": {
                    const player = document.getElementById("music_player");
                    if (player && playerOriginalPosition) {
                        player.style.transition =
                            "left 0.3s ease, top 0.3s ease";
                        player.style.left = `${(playerOriginalPosition.x / 100) * window.innerWidth}px`;
                        player.style.top = `${(playerOriginalPosition.y / 100) * window.innerHeight}px`;
                        player.style.transform = "translate(-50%, -50%)";

                        setTimeout(() => {
                            if (player) player.style.transition = "";
                        }, 300);
                        playerOriginalPosition = null;
                    }
                    break;
                }
                case "update-audio-cache":
                    if (data && data.id && data.source && data.audioUrl) {
                        verboseLog(
                            "[Player][缓存] 收到播放器的URL刷新通知:",
                            data.id,
                            data.source,
                        );
                        MusicCache.setAudio(
                            data.id,
                            data.source,
                            data.audioUrl,
                        );
                        verboseLog("[Player][缓存] ✓ 音频URL已更新");
                    }
                    break;
                case "request-search":
                    if (data && data.reqId) {
                        const reqId = data.reqId;
                        const reqTitle = data.title || "";
                        const reqArtist = data.artist || "";
                        const reqExclude = Array.isArray(data.excludeSources)
                            ? data.excludeSources
                            : [];
                        const replyToIframe = (result) => {
                            const playerIframe = document.querySelector(
                                "#music_player .theme-iframe",
                            );
                            if (playerIframe && playerIframe.contentWindow) {
                                playerIframe.contentWindow.postMessage(
                                    {
                                        source: "typing-indicator-host",
                                        type: "search-result",
                                        reqId: reqId,
                                        data: result,
                                    },
                                    "*",
                                );
                            }
                        };
                        if (!reqTitle) {
                            replyToIframe(null);
                            break;
                        }
                        debugLog(
                            `[Player][搜索委托] iframe 请求: ${reqTitle} - ${reqArtist}`,
                        );
                        searchSongWithDedup(reqTitle, reqArtist, reqExclude)
                            .then((result) => {
                                if (result && result.audioUrl) {
                                    debugLog(
                                        `[Player][搜索委托] ✓ 主插件搜到 (${result.source}): ${reqTitle}`,
                                    );
                                } else {
                                    debugWarn(
                                        `[Player][搜索委托] ✗ 主插件也搜不到: ${reqTitle}`,
                                    );
                                }
                                replyToIframe(result);
                            })
                            .catch((e) => {
                                console.error(`[Player][搜索委托] 异常:`, e);
                                replyToIframe(null);
                            });
                    }
                    break;
            }
        }
    });

    setupGlobalSvgDefs();
    updateGlobalDefs();

    window.ti_debug = {
        eventSource: eventSource,
        event_types: event_types,
        triggerEnd: (msgId) => {
            const finalId = typeof msgId === "number" ? msgId : chat.length - 1;
            eventSource.emit(event_types.GENERATION_ENDED, finalId);
        },
    };
    let messageSentCheckTimer = null;
    eventSource.on(
        event_types.GENERATION_AFTER_COMMANDS,
        (type, args, dryRun) => {
            if (dryRun) return;
            clearTimeout(dynamicThemeTimeoutId);
            dynamicThemeTimeoutId = null;
            accumulatedStreamedText = "";
            if (currentDynamicThemeId) {
                revertDynamicTheme("new_action_started");
            }
        },
    );

    eventSource.on(event_types.GENERATION_STARTED, (type, args, dryRun) => {
        if (dryRun) return;
        if (currentDynamicThemeId) {
            revertDynamicTheme("generation_started");
        }

        const settings = getSettings();
        if (!settings.persistentMode) {
            stopButtonHasAppearedFlag = false;

            clearTimeout(messageSentCheckTimer);
            messageSentCheckTimer = null;
            clearTimeout(generationStartedSafetyTimer);
            generationStartedSafetyTimer = setTimeout(() => {
                generationStartedSafetyTimer = null;
                if (
                    stopButtonHasAppearedFlag &&
                    !document.getElementById("typing_indicator")
                ) {
                    updateAndApplyTheme("generation_start_display");
                    showTypingIndicator(type, args, dryRun);
                }
            }, 200);
        }
    });

    eventSource.on("stream_token_received", (token) => {
        const settings = getSettings();
        if (
            settings.enabled &&
            settings.enableDynamicThemes &&
            isStreamingEnabled()
        ) {
            accumulatedStreamedText += token;
            const themeName = parseThemeFromText(accumulatedStreamedText);
            if (themeName) applyDynamicTheme(themeName);
        }
    });

    eventSource.on(event_types.GENERATION_ENDED, (messageId) => {
        clearTimeout(generationStartedSafetyTimer);
        generationStartedSafetyTimer = null;
        stopButtonHasAppearedFlag = false;
        const settings = getSettings();
        if (settings.enableBubbleReplacement) {
            setTimeout(() => {
                const lastMes = document.querySelector("#chat .mes:last-child");
                if (lastMes) {
                    const mesId = lastMes.getAttribute("mesid");
                    if (mesId) {
                        bubbleRenderCache.delete(mesId);
                        renderBgmBubbles(lastMes);
                    }
                }
            }, 150);
        }

        if (settings.persistentMode) return;

        const shouldHideDynamicThemeNow =
            currentDynamicThemeId && settings.dynamicThemeDuration === 0;
        if (
            (!isStreamingEnabled() && !currentDynamicThemeId) ||
            shouldHideDynamicThemeNow
        ) {
            if (shouldHideDynamicThemeNow) {
                revertDynamicTheme("generation_end_duration_0");
                return;
            }
            hideTypingIndicator();
        }
    });
    eventSource.on(event_types.MESSAGE_SENT, (messageId) => {
        clearTimeout(messageSentCheckTimer);
        messageSentCheckTimer = setTimeout(() => {
            const stopButton = document.getElementById("mes_stop");
            const isGenerating =
                stopButton &&
                window.getComputedStyle(stopButton).display !== "none";

            if (isGenerating) return;

            const settings = getSettings();
            if (settings.persistentMode) return;
            if (dynamicThemeTimeoutId) return;
            if (currentDynamicThemeId) return;
            if (isTestIndicatorActive) return;
            if (isIndicatorPersisted) return;

            const indicator = document.getElementById("typing_indicator");
            if (indicator) {
                hideTypingIndicator();
            }
        }, 1500);
    });

    eventSource.on(event_types.MESSAGE_RECEIVED, (messageId) => {
        if (messageId === undefined || messageId === null) return;
        appendNewSongs(messageId).catch((err) =>
            console.error("[TI] 追加新歌曲失败:", err),
        );
        const settings = getSettings();
        if (settings.enableBubbleReplacement) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    const messageElement = document.querySelector(
                        `#chat .mes[mesid="${messageId}"]`,
                    );
                    if (messageElement) {
                        const mesText =
                            messageElement.querySelector(".mes_text");
                        if (mesText && mesText.textContent.includes("[bgm]")) {
                            bubbleRenderCache.delete(String(messageId));
                            renderBgmBubbles(messageElement);
                        }
                    }
                });
            }, 200);
        }
    });

    eventSource.on(event_types.MESSAGE_EDITED, (messageId) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const messageElement = document.querySelector(
                    `#chat .mes[mesid="${messageId}"]`,
                );
                renderBgmBubblesDebounced(messageElement);
            });
        });

        if (messageId === 0) {
            setTimeout(() => buildAndSetInitialPlaylist(), 100);
            return;
        }

        processedAppendMessages.delete(messageId);
        setTimeout(async () => {
            const newSongs = await findSongsInMessage(messageId);
            const playerIframe = document.querySelector(
                "#music_player .theme-iframe",
            );
            if (playerIframe && playerIframe.contentWindow) {
                playerIframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "update-songs-from-message",
                        data: {
                            messageId: messageId,
                            songs: newSongs,
                        },
                    },
                    "*",
                );
            }
        }, 100);
    });

    eventSource.on(event_types.MESSAGE_UPDATED, (messageId) => {
        requestAnimationFrame(() => {
            const messageElement = document.querySelector(
                `#chat .mes[mesid="${messageId}"]`,
            );
            renderBgmBubblesDebounced(messageElement);
        });
    });

    eventSource.on(event_types.MESSAGE_SWIPED, (data) => {
        const messageId = typeof data === "object" ? data.id : data;
        requestAnimationFrame(() => {
            const messageElement = document.querySelector(
                `#chat .mes[mesid="${messageId}"]`,
            );
            renderBgmBubblesDebounced(messageElement);
        });

        processedAppendMessages.delete(messageId);

        setTimeout(async () => {
            const newSongs = await findSongsInMessage(messageId);
            const playerIframe = document.querySelector(
                "#music_player .theme-iframe",
            );
            if (playerIframe && playerIframe.contentWindow) {
                playerIframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "update-songs-from-message",
                        data: {
                            messageId: messageId,
                            songs: newSongs,
                        },
                    },
                    "*",
                );
            }
        }, 200);
    });

    let observerTimeout = null;
    let lastObserverRun = 0;
    const OBSERVER_THROTTLE = 250;

    const chatObserver = new MutationObserver((mutations) => {
        const settings = getSettings();
        if (!settings.enableBubbleReplacement) return;
        const now = Date.now();
        if (now - lastObserverRun < OBSERVER_THROTTLE) {
            if (!observerTimeout) {
                observerTimeout = setTimeout(
                    () => {
                        lastObserverRun = Date.now();
                        observerTimeout = null;
                        document
                            .querySelectorAll("#chat .mes:last-child")
                            .forEach((mes) => {
                                renderBgmBubblesDebounced(mes);
                            });
                    },
                    OBSERVER_THROTTLE - (now - lastObserverRun) + 10,
                );
            }
            return;
        }

        const messagesToProcess = new Set();

        for (const mutation of mutations) {
            if (mutation.type === "characterData") continue;

            let targetMes = mutation.target.closest?.(".mes");
            if (!targetMes && mutation.target.classList?.contains("mes")) {
                targetMes = mutation.target;
            }

            if (targetMes) {
                const mesText = targetMes.querySelector(".mes_text");
                if (
                    mesText &&
                    mesText.textContent.includes("[bgm]") &&
                    mesText.textContent.includes("[/bgm]")
                ) {
                    messagesToProcess.add(targetMes);
                }
            }
        }

        if (messagesToProcess.size > 0) {
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                lastObserverRun = Date.now();
                messagesToProcess.forEach((mes) => {
                    renderBgmBubblesDebounced(mes);
                });
            }, 50);
        }
    });

    setTimeout(() => {
        const chatElement = document.getElementById("chat");
        if (chatElement) {
            chatObserver.observe(chatElement, {
                childList: true,
                subtree: false,
                characterData: false,
            });
            debugLog("[Player][气泡] MutationObserver 兜底已启动");
        }
    }, 1500);

    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, (messageId) => {
        const messageElement = document.querySelector(
            `#chat .mes[mesid="${messageId}"]`,
        );
        if (messageElement) {
            const mesText = messageElement.querySelector(".mes_text");
            if (mesText && mesText.textContent.includes("[bgm]")) {
                bubbleRenderCache.delete(String(messageId));
                renderBgmBubbles(messageElement);
            }
        }

        const settings = getSettings();

        if (settings.enabled && settings.enableDynamicThemes) {
            if (
                !settings.persistentMode ||
                settings.dynamicThemesInPersistent
            ) {
                const foundTheme = processMessageForTheme(messageId);
                if (foundTheme) {
                    const duration = settings.dynamicThemeDuration * 1000;
                    clearTimeout(dynamicThemeTimeoutId);
                    if (settings.persistentMode) {
                        if (duration >= 0) {
                            dynamicThemeTimeoutId = setTimeout(() => {
                                dynamicThemeTimeoutId = null;
                                revertDynamicTheme("duration_ended_persistent");
                            }, duration);
                        }
                    } else {
                        if (duration > 0) {
                            dynamicThemeTimeoutId = setTimeout(() => {
                                dynamicThemeTimeoutId = null;
                                revertDynamicTheme("duration_ended");
                            }, duration);
                        } else {
                            revertDynamicTheme("duration_ended_immediate");
                        }
                    }
                    return;
                }
            }
        }

        if (!settings.persistentMode) {
            if (!dynamicThemeTimeoutId) {
                hideTypingIndicator();
            }
        }
    });

    eventSource.on(event_types.GENERATION_STOPPED, (messageId) => {
        clearTimeout(generationStartedSafetyTimer);
        generationStartedSafetyTimer = null;
        stopButtonHasAppearedFlag = false;
        const settings = getSettings();
        if (!settings.persistentMode) {
            clearTimeout(dynamicThemeTimeoutId);
            dynamicThemeTimeoutId = null;

            if (currentDynamicThemeId) {
                revertDynamicTheme("generation_stopped");
                return;
            }
            hideTypingIndicator();
        }
    });

    eventSource.on("chatLoaded", () => {
        if (isInitialized) return;
        isInitialized = true;
        manualOverrideActive = false;
        setTimeout(async () => {
            checkAndAutoRestoreBuiltIns();
            const renderSettings = addExtensionSettings();
            renderSettings(false);
            validateAndFixIconFonts();
            updateAndApplyTheme("extension_init");
            const initialSettings = getSettings();

            if (initialSettings.persistentMode) {
                isIndicatorPersisted = true;
                showTypingIndicator("persistent-start");
            }

            if (initialSettings.playerEnabled) {
                if (document.getElementById("music_player")) {
                    buildAndSetInitialPlaylist().catch((err) =>
                        console.error("[TI] 播放列表构建失败:", err),
                    );
                } else {
                    showPlayer();
                    const waitStart = Date.now();
                    await new Promise((resolve) => {
                        const checkInterval = setInterval(() => {
                            if (
                                isPlayerInitialized ||
                                Date.now() - waitStart > 3000
                            ) {
                                clearInterval(checkInterval);
                                resolve();
                            }
                        }, 50);
                    });
                    await buildAndSetInitialPlaylist();
                }
            }

            applyBubbleStyles();

            const settings = getSettings();
            if (settings.showFpsMonitor) {
                FPSMonitor.start();
            }
            initializeObservers();
            if (getSettings().autoFollowTheme) handleMainThemeChange();
        }, 500);
    });

    eventSource.on(event_types.CHAT_CHANGED, (chatId) => {
        manualOverrideActive = false;
        settleListeningTime("chat_changed");
        currentLyrics = [];
        currentLyricIndex = -1;
        appendedSongKeys.clear();
        processedAppendMessages.clear();
        _translationCheckedKeys.clear();
        lastSentPlaylist = null;
        hideLyricsOverlay();
        if (dynamicThemeTimeoutId) {
            clearTimeout(dynamicThemeTimeoutId);
            dynamicThemeTimeoutId = null;
        }
        if (currentDynamicThemeId) {
            revertDynamicTheme("chat_changed");
        }
        setTimeout(() => {
            if (chatId) {
                const _s = getSettings();
                if (
                    _s.playerEnabled &&
                    _s.enableCharacterPlaylist &&
                    _s.autoSwitchCharacterPlaylist &&
                    this_chid !== undefined &&
                    characters[this_chid]
                ) {
                    const _charAvatar = characters[this_chid].avatar;
                    const _boundId = _s.characterPlaylists?.[_charAvatar];
                    if (_boundId && _boundId !== _s.selectedPlaylistId) {
                        _s.selectedPlaylistId = _boundId;
                        saveSettingsDebounced();
                        debugLog(
                            `[Player][歌单 角色切换，自动绑定歌单: ${_boundId}`,
                        );
                    }
                }
                buildAndSetInitialPlaylist().catch((err) =>
                    console.error("[TI] 播放列表构建失败:", err),
                );
                const settings = getSettings();
                updateAndApplyTheme("chatChanged_logic");
                requestSettingsRender();
                setTimeout(() => postContextWhenReady("typing_indicator"), 150);
                if (settings.persistentMode) {
                    handlePersistentModeUpdate("切换聊天").catch((err) =>
                        console.error("[TI] persistentModeUpdate 失败:", err),
                    );
                }
                refreshAllBubbles();
                if (listeningStatsUpdateCallback) {
                    listeningStatsUpdateCallback();
                }
            } else {
                const settings = getSettings();
                const { themeId: globalThemeId } = getActiveThemeConfig();
                applyTheme(globalThemeId);
                requestSettingsRender();
                if (settings.persistentMode) {
                    handlePersistentModeUpdate("退出聊天").catch((err) =>
                        console.error("[TI] persistentModeUpdate 失败:", err),
                    );
                } else {
                    hideTypingIndicator();
                }
            }
        }, 100);
    });
    setTimeout(() => {
        if (isInitialized) return;
        isInitialized = true;
        checkAndAutoRestoreBuiltIns();
        if (!document.getElementById("typing_indicator_settings")) {
            const renderFn = addExtensionSettings();
            renderFn(false);
        }
        validateAndFixIconFonts();
        updateAndApplyTheme("extension_init");

        const settings = getSettings();
        if (
            settings.persistentMode &&
            !document.getElementById("typing_indicator")
        ) {
            isIndicatorPersisted = true;
            showTypingIndicator("persistent-start");
        }
        if (
            settings.playerEnabled &&
            !document.getElementById("music_player")
        ) {
            showPlayer();
            const waitForInit = () =>
                new Promise((resolve) => {
                    const checkInterval = setInterval(() => {
                        if (isPlayerInitialized) {
                            clearInterval(checkInterval);
                            resolve();
                        }
                    }, 50);
                    setTimeout(() => {
                        clearInterval(checkInterval);
                        resolve();
                    }, 3000);
                });
            waitForInit().then(() => {
                buildAndSetInitialPlaylist().catch((err) =>
                    console.error("[TI] fallback 播放列表构建失败:", err),
                );
            });
        }
        applyBubbleStyles();
        if (settings.showFpsMonitor) {
            FPSMonitor.start();
        }
        initializeObservers();
        if (settings.autoFollowTheme) {
            handleMainThemeChange();
        }
    }, 500);
})();
