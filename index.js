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
  saveSettingsDebounced,
  this_chid,
} from "../../../../script.js";
import { extension_settings } from "../../../extensions.js";
import { selected_group } from "../../../group-chats.js";
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
    console.log("[FPS Monitor] Started");
  },

  stop() {
    this.enabled = false;
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
    console.log("[FPS Monitor] Stopped");
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

let iframePoolContainer = null;
let acornPromise = null;
let messageFlushScheduled = false;
const iframeCache = new Map();
const MAX_CACHE_SIZE = 10;
const PLUGIN_VERSION = "3.4.2";
const pendingMessages = new Map();
const pendingSearches = new Map();
const failedSearches = new Map();
const FAILED_SEARCH_COOLDOWN = 5 * 60 * 1000;
const BGM_REGEX = /\[bgm\](.+)-(.+?)\[\/bgm\]/g;

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
  "3.4.2": {
    date: "2026-2-21",
    title: {
      zh: "修复重新生成时指示器偶发消失 & 穿透模式",
      en: "Fix Indicator Disappearing on Regenerate & Click-Through Mode",
      th: "แก้ไขตัวบ่งชี้หายเมื่อ Regenerate & โหมดคลิกทะลุ",
    },
    content: {
      zh: `
### 修复
- **修复 Regenerate 时指示器偶发不显示的问题**
  - 原因：隐藏指示器时使用 jQuery 异步动画删除 DOM，与新指示器的 iframe 创建产生竞态
  - 改为同步删除，彻底消除时序冲突

### 新增
- **穿透模式**：新增"穿透模式"开关
  - 开启后点击会穿透到聊天界面，主题本身不可交互
  - 适合纯装饰类主题，避免遮挡聊天操作
      `,
      en: `
### Fixed
- **Fixed indicator occasionally not showing on Regenerate**
  - Cause: jQuery async animation removal racing with new iframe creation
  - Changed to synchronous removal to eliminate timing conflicts

### Added
- **Click-Through Mode**: New toggle in Indicator Position settings
  - When enabled, clicks pass through to the chat below
  - The theme itself cannot be interacted with
  - Works with all position modes, recommended for decorative themes
      `,
      th: `
### แก้ไข
- **แก้ไขตัวบ่งชี้ไม่แสดงเมื่อ Regenerate**
  - สาเหตุ: jQuery ลบ DOM แบบ async แข่งกับการสร้าง iframe ใหม่
  - เปลี่ยนเป็นลบแบบ sync เพื่อขจัดปัญหาจังหวะ

### เพิ่ม
- **โหมดคลิกทะลุ**: เพิ่มสวิตช์ใหม่ในการตั้งค่าตำแหน่งตัวบ่งชี้
  - เมื่อเปิดใช้งาน การคลิกจะทะลุไปยังแชทด้านล่าง
  - ธีมจะไม่สามารถโต้ตอบได้
  - ใช้ได้กับทุกโหมดตำแหน่ง แนะนำสำหรับธีมตกแต่ง
      `,
    },
  },
};

function checkAndShowChangelog() {
  const settings = getSettings();
  const lastSeenVersion = settings.lastSeenVersion || "0.0.0";

  if (lastSeenVersion === PLUGIN_VERSION) {
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
    settings.lastSeenVersion = PLUGIN_VERSION;
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
      debugLog("[Typing Indicator] Acorn library is already available.");
      return resolve();
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      debugLog("[Typing Indicator] Acorn library loaded successfully.");
      resolve();
    };
    script.onerror = (err) => {
      console.error("[Typing Indicator] Failed to load Acorn script.", err);
      reject(new Error(`Failed to load script: ${src}`));
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
      console.warn(
        "[Typing Indicator] Acorn validation skipped because the library failed to load.",
      );
      return { isValid: true, error: null };
    } else {
      return {
        isValid: false,
        error: {
          message: e.message.split(" (")[0],
          line: e.loc.line,
          column: e.loc.column,
        },
      };
    }
  }
}

function ensurePoolContainer() {
  if (!iframePoolContainer) {
    iframePoolContainer = document.createElement("div");
    iframePoolContainer.id = "ti-iframe-pool";
    iframePoolContainer.style.cssText =
      "position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none; z-index: -1;";
    document.body.appendChild(iframePoolContainer);
  }
  return iframePoolContainer;
}

async function getOrCreateIframe(theme, indicatorElement, characterName) {
  const cacheKey = theme.id;

  if (iframeCache.has(cacheKey)) {
    const cachedItem = iframeCache.get(cacheKey);
    iframeCache.delete(cacheKey);
    iframeCache.set(cacheKey, cachedItem);

    verboseLog(`[IndicatorPool] 命中缓存: ${theme.name}`);

    indicatorElement.appendChild(cachedItem.element);
    cachedItem.element.style.display = "block";

    updateIframeContext(cachedItem.element, theme, characterName);

    return cachedItem.element;
  }

  if (iframeCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = iframeCache.keys().next().value;
    const oldestItem = iframeCache.get(oldestKey);
    verboseLog(`[IndicatorPool] 缓存已满，淘汰: ${oldestKey}`);
    oldestItem.element.remove();
    iframeCache.delete(oldestKey);
  }

  debugLog(`[IndicatorPool] 创建新实例: ${theme.name}`);
  const newIframe = await createUnifiedIframeOriginal(
    theme,
    indicatorElement,
    characterName,
  );

  if (newIframe) {
    newIframe.style.display = "block";
    iframeCache.set(cacheKey, {
      element: newIframe,
      themeId: theme.id,
    });
  }

  return newIframe;
}

function releaseIframeToPool(indicatorElement) {
  const iframe = indicatorElement.querySelector(".theme-iframe");
  if (!iframe) return;

  const pool = ensurePoolContainer();
  pool.appendChild(iframe);
  iframe.style.display = "none";

  if (iframe.contentWindow) {
    queuePostMessage(
      iframe.contentWindow,
      {
        source: "typing-indicator-host",
        type: "pause-theme",
      },
      "*",
    );
  }
}

async function updateIframeContext(iframe, theme, characterName) {
  if (!iframe.contentWindow) return;

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

function postContextWhenReady(containerId, retry = 6) {
  const ctx = getCurrentCharContext();
  const invalid =
    !ctx.charName ||
    ctx.charName === "{{char}}" ||
    (ctx.charAvatarUrl || "").includes("{{char}}");

  if (invalid && retry > 0) {
    return setTimeout(() => postContextWhenReady(containerId, retry - 1), 40);
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
    debugWarn("[TypingIndicator] 获取角色名失败:", e);
  }
  return name2 || "Assistant";
}

function getCurrentUserName() {
  try {
    if (typeof power_user !== "undefined" && power_user.name) {
      return power_user.name;
    }
  } catch (e) {
    debugWarn("[TypingIndicator] 获取用户名失败:", e);
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
    debugLog = (message, ...args) => console.log(`[TI]`, message, ...args);
    debugWarn = (message, ...args) => console.warn(`[TI]`, message, ...args);

    if (settings?.verboseLogs) {
      verboseLog = (message, ...args) =>
        console.log(`[TI][VERBOSE]`, message, ...args);
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
const MusicUtils = {
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
    if (a.includes(b) || b.includes(a)) return true;

    const shorter = a.length < b.length ? a : b;
    const longer = a.length < b.length ? b : a;
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

    const candidateArtists = candidate
      .split(/[\/\,、&]/)
      .map((s) => this.normalize(s.trim()))
      .filter(Boolean);

    return candidateArtists.some(
      (ca) => ca === a || ca.includes(a) || a.includes(ca),
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
};

window.MusicUtils = MusicUtils;

const MusicCache = {
  STORAGE_KEY: "gplayer_music_cache",
  VERSION: 1,

  DEFAULT_EXPIRY: {
    search: 30 * 24 * 60 * 60 * 1000, // 30天
    audio: 6 * 60 * 60 * 1000, // 6小时
    lyrics: 30 * 24 * 60 * 60 * 1000, // 30天
    cover: 7 * 24 * 60 * 60 * 1000, // 7天
  },

  MAX_ENTRIES: {
    search: 200,
    audio: 100,
    lyrics: 100,
    cover: 100,
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

    this._memoryCache = { search: {}, audio: {}, lyrics: {}, cover: {} };
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

    this._memoryCache.search[key] = {
      data: {
        id: data.id,
        source: data.source,
        title: data.title || data.name || title,
        artist: this._normalizeArtist(data.artist || artist),
        coverUrl: data.coverUrl || data.cover || data.pic || "",
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

  setAudio(id, source, url) {
    if (!url || !id || !source) return;
    const key = this._detailKey(id, source);
    this._memoryCache.audio[key] = { url, ts: Date.now() };
    this._enforceLimit("audio");
    this.save();
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
    this._enforceLimit("cover");
    const key = this._detailKey(id, source);
    this._memoryCache.cover[key] = { url, ts: Date.now() };
    this.save();
  },

  invalidateCover(id, source) {
    const key = this._detailKey(id, source);
    if (this._memoryCache.cover[key]) {
      delete this._memoryCache.cover[key];
      this.save();
      verboseLog(`[MusicCache] 已清除封面缓存: ${key}`);
    }
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

    ["search", "audio", "lyrics", "cover"].forEach((type) => {
      const expiry = aggressive
        ? this.DEFAULT_EXPIRY[type] / 2
        : this.DEFAULT_EXPIRY[type];

      Object.keys(this._memoryCache[type] || {}).forEach((key) => {
        if (now - this._memoryCache[type][key].ts > expiry) {
          delete this._memoryCache[type][key];
          count++;
        }
      });
    });

    if (count > 0) {
      debugLog(`[MusicCache] 清理了 ${count} 条过期缓存`);
      this.save();
    }

    return count;
  },

  clear() {
    this._memoryCache = { search: {}, audio: {}, lyrics: {}, cover: {} };
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

function fuzzyMatchTrack(bubbleTitle, bubbleArtist, track) {
  if (!track || !bubbleTitle || !bubbleArtist) return false;
  const normalize = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/\s*[\(\（].*?[\)\）]\s*/g, "")
      .replace(/\s*\[.*?\]\s*/g, "")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalizedBubbleTitle = normalize(bubbleTitle);
  const normalizedBubbleArtist = normalize(bubbleArtist);
  const trackTitles = [track.title, track.name, track.originalTitle, track.song]
    .filter(Boolean)
    .map(normalize);
  let artistSources = [track.artist, track.originalArtist, track.singer];
  if (Array.isArray(track.artist)) {
    artistSources = [...artistSources, ...track.artist];
  }
  const trackArtists = artistSources
    .filter(Boolean)
    .map((a) => normalize(String(a)));
  const titleMatch = trackTitles.some(
    (t) =>
      t === normalizedBubbleTitle ||
      t.includes(normalizedBubbleTitle) ||
      normalizedBubbleTitle.includes(t),
  );
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
function getSettings() {
  const defaultSettings = {
    enabled: true,
    persistentMode: false,
    streaming: false,
    showAnimation: true,
    autoFollowTheme: false,
    devMode: false,
    debugLogs: false,
    verboseLogs: false,
    position: "floating_bottom",
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
    clickThrough: false,
    showFpsMonitor: false,
  };

  if (!extension_settings[MODULE]) {
    extension_settings[MODULE] = {};
    _needsSync = true;
  }
  const settings = extension_settings[MODULE];

  if (_needsSync) {
    const syncList = (defaultList, userList) => {
      if (!userList || !Array.isArray(userList)) {
        return structuredClone(defaultList);
      }

      const defaultMap = new Map(defaultList.map((item) => [item.id, item]));
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
        if (defaultItem.isBuiltIn && !userMap.has(defaultItem.id)) {
          finalSyncedList.push(structuredClone(defaultItem));
        }
      });

      return finalSyncedList;
    };

    settings.themes = syncList(defaultSettings.themes, settings.themes);
    settings.textPresets = syncList(
      defaultSettings.textPresets,
      settings.textPresets,
    );
    settings.bubbleStyles = syncList(
      defaultBubbleStyles,
      settings.bubbleStyles,
    );

    settings.themes.forEach((theme) => {
      if (theme.isBuiltIn && !theme.readme) {
        const authorMatch = theme.name.match(/\(by\s+(.+?)\)/i);
        const author = authorMatch ? authorMatch[1].trim() : "SANJ";
        const displayName = theme.name.replace(/\s*\(by\s+.+?\)/i, "").trim();

        const isPlayer =
          theme.name.startsWith("播放器") || theme.name.startsWith("Player");
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
        const author = authorMatch ? authorMatch[1].trim() : "SANJ";
        const displayName = preset.name.replace(/\s*\(by\s+.+?\)/i, "").trim();

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
        const author = authorMatch ? authorMatch[1].trim() : "SANJ";
        const displayName = style.name.replace(/\s*\(by\s+.+?\)/i, "").trim();

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
    !settings.bubbleStyles.find((s) => s.id === settings.selectedBubbleStyleId)
  ) {
    settings.selectedBubbleStyleId = "bubble_default";
  }
  if (settings.enableBubbleReplacement === undefined) {
    settings.enableBubbleReplacement = true;
  }

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
    verboseLog(`[TypingIndicator] 动态主题激活，覆盖有状态锁`);
    return {
      themeId: currentDynamicThemeId,
      presetId: currentDynamicPresetId || globalPresetId,
    };
  }

  if (settings.persistentMode && indicator) {
    const runningThemeId = indicator.dataset.themeId;
    if (runningThemeId) {
      const runningTheme = settings.themes.find((t) => t.id === runningThemeId);
      const isStateful =
        runningTheme &&
        (statefulThemes.has(runningThemeId) ||
          runningTheme.name.startsWith("播放器") ||
          runningTheme.name.startsWith("Player"));

      if (isStateful) {
        debugLog(`[TypingIndicator] 有状态主题运行中: "${runningTheme.name}"`);
        isStatefulThemeLocked = true;
        return {
          themeId: runningThemeId,
          presetId: currentlyAppliedConfig.presetId || globalPresetId,
        };
      }
    }
  }

  isStatefulThemeLocked = false;
  verboseLog(`[TypingIndicator] 全局锁已解除`);

  if (manualOverrideActive) {
    verboseLog(`[TypingIndicator] 应用手动覆盖`);
    return { themeId: globalThemeId, presetId: globalPresetId };
  }

  if (this_chid !== undefined && characters[this_chid]) {
    const charAvatar = characters[this_chid].avatar;
    const charConfig = settings.characterThemes?.[charAvatar];

    if (charConfig && (charConfig.themeId || charConfig.presetId)) {
      verboseLog(`[TypingIndicator] 应用角色专属主题`);
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
      verboseLog(`[TypingIndicator] 应用UI跟随主题`);
      const matchedPreset = settings.textPresets.find((p) =>
        p.name.startsWith(themeBaseName),
      );
      return {
        themeId: matchedTheme.id,
        presetId: matchedPreset ? matchedPreset.id : globalPresetId,
      };
    }
  }

  verboseLog(`[TypingIndicator] 应用全局主题`);
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
    console.warn("[TypingIndicator] 从核心变量获取角色头像失败:", error);
  }

  if (
    !charAvatarFound &&
    window.TavernHelper &&
    typeof window.TavernHelper.getCharAvatarPath === "function"
  ) {
    try {
      debugLog(
        "[TypingIndicator] 核心变量方案失败，尝试使用 TavernHelper 作为备用...",
      );
      const pathFromHelper = window.TavernHelper.getCharAvatarPath("current");
      if (pathFromHelper) {
        charAvatarUrl = pathFromHelper.startsWith("/")
          ? pathFromHelper
          : `/${pathFromHelper}`;
        charAvatarFound = true;
      }
    } catch (error) {
      console.warn("[TypingIndicator] 调用 TavernHelper 备用方案失败:", error);
    }
  }

  try {
    if (user_avatar && user_avatar !== "none") {
      userAvatarUrl = `/User Avatars/${encodeURIComponent(user_avatar)}`;
    }
  } catch (error) {
    console.error("[TypingIndicator] 获取用户头像时出错:", error);
  }

  return { char: charAvatarUrl, user: userAvatarUrl };
}

async function getBgmPlaylistAsync() {
  debugLog("[TypingIndicator] 开始获取BGM播放列表...");

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
      debugLog(`[TypingIndicator] 检查关联世界书: "${worldName}"`);

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
            `[TypingIndicator] ✓ 在关联世界书 "${worldName}" 中找到 "${BGM_KEY}" 条目`,
          );
          return parseBgmData(entry.content);
        }
      }
    }

    const charAvatar = character.avatar;
    if (charAvatar) {
      debugLog(`[TypingIndicator] 检查内嵌世界书（通过API获取最新数据）...`);

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
                `[TypingIndicator] ✓ 在内嵌世界书中找到 "${BGM_KEY}" 条目（最新数据）`,
              );
              return parseBgmData(entry.content);
            }
          }
        }
      } catch (e) {
        debugWarn(`[TypingIndicator] 获取最新角色数据失败，使用内存缓存:`, e);
      }

      const cachedBook = character.data?.character_book;
      if (cachedBook) {
        const entry = findEntryInBook(cachedBook, BGM_KEY);
        if (entry) {
          debugLog(
            `[TypingIndicator] ✓ 在内嵌世界书中找到 "${BGM_KEY}" 条目（缓存数据）`,
          );
          return parseBgmData(entry.content);
        }
      }
    }

    debugLog(`[TypingIndicator] 在所有世界书中都未找到 "${BGM_KEY}" 条目`);
    return null;
  } catch (error) {
    console.error(`[TypingIndicator] 获取或解析BGM播放列表时出错:`, error);
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
      console.log("[TypingIndicator] BGM数据解析成功，歌单:", playlist);
      return playlist;
    } else {
      console.warn("[TypingIndicator] BGM数据解析后为空，请检查格式或内容。");
      return null;
    }
  } catch (error) {
    console.error("[TypingIndicator] 解析BGM数据时出错:", error);
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
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    textNode.parentNode.replaceChild(fragment, textNode);
  });

  if (processedCount >= allMatches.length) {
    console.log(
      `[Typing Indicator Music] 已渲染 ${processedCount} 个 BGM 气泡`,
    );
    return;
  }

  console.warn(
    `[Typing Indicator Music] 检测到 ${allMatches.length - processedCount} 个跨节点 BGM 标签，启用修复模式`,
  );

  const currentNonCodeText = getNonCodeText(mesText);
  BGM_REGEX.lastIndex = 0;
  const remainingMatches = [...currentNonCodeText.matchAll(BGM_REGEX)];

  if (remainingMatches.length === 0) {
    console.log(`[Typing Indicator Music] 所有标签已处理完成`);
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
    console.log(
      `[Typing Indicator Music] 已修复 ${remainingMatches.length} 个跨节点 BGM 气泡`,
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
        const container = bubble.closest(".music-bubble-container") || bubble;
        const temp = document.createElement("div");
        temp.innerHTML = newHtml;
        const newEl = temp.firstElementChild || temp.firstChild;
        if (!newEl) return;
        const innerBubble = newEl.classList?.contains("music-bubble-from-regex")
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

  console.log("[Typing Indicator Music] 已刷新所有BGM气泡样式");
}

async function searchSongWithDedup(title, artist) {
  if (failedSearches.size > 100) {
    const now = Date.now();
    for (const [k, t] of failedSearches) {
      if (now - t > FAILED_SEARCH_COOLDOWN) {
        failedSearches.delete(k);
      }
    }
  }
  const key = `${(title || "").toLowerCase().trim()}|||${(artist || "").toLowerCase().trim()}`;
  const failedAt = failedSearches.get(key);
  if (failedAt && Date.now() - failedAt < FAILED_SEARCH_COOLDOWN) {
    console.log(`[搜索] 跳过最近失败的搜索: ${title} - ${artist}`);
    return null;
  }
  const cached = MusicCache.getSearch(title, artist);
  if (cached) {
    const cachedArtist = MusicCache._normalizeArtist(
      cached.artist || "",
    ).toLowerCase();
    const requestedArtist = (artist || "").toLowerCase().trim();

    const isMatch =
      !requestedArtist ||
      !cachedArtist ||
      cachedArtist.includes(requestedArtist) ||
      requestedArtist.includes(cachedArtist);

    if (isMatch) {
      console.log(`[搜索] ✓ 缓存命中: ${title} - ${artist}`);
      return cached;
    } else {
      console.log(`[搜索] ⚠️ 缓存歌手不匹配，重新搜索: ${title} - ${artist}`);
    }
  }

  if (pendingSearches.has(key)) {
    console.log(`[搜索] 等待进行中的搜索: ${title} - ${artist}`);
    return pendingSearches.get(key);
  }

  const promise = (async () => {
    const result = await searchSong(title, artist);

    if (result) {
      const resultArtist = MusicCache._normalizeArtist(
        result.artist || "",
      ).toLowerCase();
      const requestedArtist = (artist || "").toLowerCase().trim();

      const isMatch =
        !requestedArtist ||
        !resultArtist ||
        resultArtist.includes(requestedArtist) ||
        requestedArtist.includes(resultArtist);

      if (!isMatch) {
        console.warn(
          `[搜索] ⚠️ 歌手不匹配，丢弃结果\n  期望: ${artist}\n  实际: ${result.artist}`,
        );
        failedSearches.set(key, Date.now());
        return null;
      }
      MusicCache.setSearch(title, artist, result);
      return result;
    }
    failedSearches.set(key, Date.now());
    return null;
  })();

  pendingSearches.set(key, promise);

  try {
    return await promise;
  } finally {
    pendingSearches.delete(key);
  }
}

async function searchSong(title, artist = "") {
  const query = artist ? `${title} ${artist}` : title;
  const sources = ["tencent", "netease", "kuwo"];
  console.log(
    `[搜索] 开始搜索: "${query}" (歌曲: ${title}, 歌手: ${artist || "未指定"})`,
  );

  for (const source of sources) {
    try {
      console.log(`[搜索] 尝试 ${source}...`);

      const searchResponse = await fetch(
        `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,
      );

      if (!searchResponse.ok) {
        console.log(
          `[搜索] ✗ ${source} 搜索请求失败: HTTP ${searchResponse.status}`,
        );
        continue;
      }

      const searchResult = await searchResponse.json();

      if (!searchResult.data || searchResult.data.length === 0) {
        console.log(`[搜索] ✗ ${source} 无搜索结果`);
        continue;
      }

      const normalizedTitle = MusicUtils.normalize(title);
      let track = null;

      if (normalizedTitle) {
        let bestTrack = null;
        let bestScore = -1;

        for (const item of searchResult.data) {
          const itemTitle = item.song || item.name || "";
          const itemArtist = item.singer || item.artist || "";

          if (!MusicUtils.isTitleMatch(title, itemTitle)) continue;
          if (!MusicUtils.isArtistMatch(artist, itemArtist)) continue;

          let score = 0;

          if (itemTitle.trim() === title.trim()) {
            score += 100;
          }
          if (
            /[\(\（\[\【]\s*(Live|LIVE|live|现场|翻唱|Cover|Remix|伴奏|inst)/i.test(
              itemTitle,
            )
          ) {
            score -= 50;
          }
          const normalizedQueryArtist = MusicUtils.normalize(artist);
          const normalizedItemArtist = MusicUtils.normalize(itemArtist);
          if (normalizedQueryArtist === normalizedItemArtist) {
            score += 80;
          } else if (normalizedItemArtist.includes(normalizedQueryArtist)) {
            score += 30;
          }
          score -= normalizedItemArtist.length;

          if (score > bestScore) {
            bestScore = score;
            bestTrack = item;
          }
        }

        track = bestTrack;

        if (!track) {
          console.log(
            `[搜索] ✗ ${source} 无匹配 "${title} - ${artist}"，跳过...`,
          );
          continue;
        }
      } else {
        track = searchResult.data[0];
      }

      const trackId = track.id || track.rid;
      const sourceLabel =
        {
          netease: "Netease",
          tencent: "Tencent",
          kuwo: "Kuwo",
        }[source] || source;
      const coverUrl = track.cover || track.pic || "";

      console.log(
        `[搜索] ${source} 选中: id=${trackId}, 歌名=${track.song || track.name}, 歌手=${track.singer || track.artist}`,
      );

      let audioUrl = MusicCache.getAudio(trackId, sourceLabel);
      let lyricsData = MusicCache.getLyrics(trackId, sourceLabel);
      let cachedCover = MusicCache.getCover(trackId, sourceLabel);

      console.log(
        `[搜索] 缓存检查: audioUrl=${audioUrl ? "有" : "无"}, lyrics=${lyricsData ? "有" : "无"}, cover=${cachedCover ? "有" : "无"}`,
      );

      if (audioUrl && lyricsData) {
        console.log(`[搜索] ✓ ${source} 缓存完全命中，直接返回`);
        return {
          id: trackId,
          name: track.song || track.name,
          title: track.song || track.name,
          artist: track.singer || track.artist,
          coverUrl: cachedCover || coverUrl,
          source: sourceLabel,
          audioUrl: audioUrl,
          lyricsContent: lyricsData.content || "",
          tlyricContent: lyricsData.tlyric || "",
        };
      }

      debugLog(`[搜索] ${source} 获取音频URL...`);
      const songData = await fetchAndValidateSong(trackId, source);

      if (songData && songData.audioUrl) {
        MusicCache.setAudio(trackId, sourceLabel, songData.audioUrl);
        if (songData.lyricsContent) {
          MusicCache.setLyrics(
            trackId,
            sourceLabel,
            songData.lyricsContent,
            songData.tlyricContent || "",
          );
        }
        if (coverUrl) {
          MusicCache.setCover(trackId, sourceLabel, coverUrl);
        }

        console.log(`[搜索] ✓ ${source} 成功，已缓存所有数据`);

        return {
          id: trackId,
          name: track.song || track.name,
          title: track.song || track.name,
          artist: track.singer || track.artist,
          coverUrl: coverUrl,
          source: sourceLabel,
          audioUrl: songData.audioUrl,
          lyricsContent: songData.lyricsContent || "",
          tlyricContent: songData.tlyricContent || "",
        };
      } else {
        console.log(`[搜索] ✗ ${source} 无效音频，尝试下一个音源...`);
      }
    } catch (error) {
      debugWarn(`[搜索] ✗ ${source} 异常:`, error.message);
    }
  }

  console.error("[搜索] ✗ 所有音源搜索失败");
  return null;
}

async function fetchAndValidateSong(id, source) {
  try {
    const [songResponse, lyricResponse] = await Promise.all([
      fetch(`/api/plugins/g-player-proxy/song?id=${id}&source=${source}`),
      fetch(`/api/plugins/g-player-proxy/lyric?id=${id}&source=${source}`),
    ]);

    if (!songResponse.ok) return null;

    const songData = await songResponse.json();

    if (songData._needFallback) {
      return null;
    }

    let audioUrl = "";
    let lyricsContent = "";
    let tlyricContent = "";

    if (songData.data) {
      if (Array.isArray(songData.data)) {
        audioUrl = songData.data[0]?.url || "";
        lyricsContent = songData.data[0]?.lyric || songData.data[0]?.lrc || "";
        tlyricContent =
          songData.data[0]?.tlyric || songData.data[0]?.trans || "";
      } else {
        audioUrl = songData.data.url || "";
        lyricsContent = songData.data.lrc || songData.data.lyric || "";
        tlyricContent = songData.data.tlyric || songData.data.trans || "";
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
            console.warn(`[搜索] 使用 lrcId 获取歌词失败`);
          }
        }
      }
    }

    if (!lyricsContent && lyricResponse.ok) {
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

    if (!audioUrl) return null;

    const duration = await getAudioDuration(audioUrl);
    if (duration !== null && duration < 35) return null;

    return { audioUrl, lyricsContent, tlyricContent };
  } catch (error) {
    debugWarn(`[搜索调试] fetchAndValidateSong 失败:`, error);
    return null;
  }
}

function getAudioDuration(audioUrl) {
  return new Promise((resolve) => {
    const needProxyDomains = [
      "music.126.net",
      "126.net",
      "netease.com",
      "qq.com",
      "qqmusic.qq.com",
      "y.qq.com",
      "kuwo.cn",
      "kuwo.com",
      "kugou.com",
      "migu.cn",
    ];
    const needProxy = needProxyDomains.some((domain) =>
      audioUrl.includes(domain),
    );
    const finalUrl = needProxy
      ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`
      : audioUrl;

    const audio = new Audio();
    audio.preload = "metadata";

    const cleanup = () => {
      clearTimeout(timeout);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
      audio.src = "";
    };

    const onLoaded = () => {
      const duration = audio.duration;
      cleanup();
      resolve(isFinite(duration) ? duration : null);
    };

    const onError = () => {
      cleanup();
      resolve(null);
    };

    const timeout = setTimeout(() => {
      cleanup();
      resolve(null);
    }, 3000);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);
    audio.src = finalUrl;
  });
}

async function findSongsInMessage(messageId) {
  const message = chat[messageId];
  if (!message || !message.mes) return [];
  if (message.is_hidden) return [];

  const content = message.mes;
  BGM_REGEX.lastIndex = 0;
  let match;
  const songsToAdd = [];

  while ((match = BGM_REGEX.exec(content)) !== null) {
    const title = match[1].trim();
    const artist = match[2].trim();
    if (!title || !artist) continue;

    const cached = MusicCache.getSearch(title, artist);
    if (cached) {
      console.log(`[Player] ✓ 缓存命中: ${title} - ${artist}`);
      const audioUrl = MusicCache.getAudio(cached.id, cached.source);
      const lyricsData = MusicCache.getLyrics(cached.id, cached.source);
      const coverUrl = MusicCache.getCover(cached.id, cached.source);

      songsToAdd.push({
        id: cached.id,
        source: cached.source,
        name: cached.title,
        title: cached.title,
        artist: cached.artist,
        coverUrl: coverUrl || cached.coverUrl || "",
        audioUrl: audioUrl || "",
        lyricsContent: lyricsData?.content || "",
        tlyricContent: lyricsData?.tlyric || "",
        originalTitle: title,
        originalArtist: artist,
        sourceMessageId: messageId,
        _fromCache: true,
      });
      continue;
    }

    console.log(`[Player] 搜索: ${title} - ${artist}`);
    const trackData = await searchSongWithDedup(title, artist);

    if (trackData) {
      trackData.sourceMessageId = messageId;
      trackData.originalTitle = title;
      trackData.originalArtist = artist;
      trackData._fromCache = true;
      songsToAdd.push(trackData);
    } else {
      console.log(
        `[Player] ⚠️ 未找到可用音源: ${title} - ${artist}，继续下一首`,
      );
    }
  }

  return songsToAdd;
}

async function scanChatForSongs() {
  if (!chat || chat.length === 0) return [];
  const validMessages = chat
    .map((msg, index) => ({ msg, index }))
    .filter(({ msg }) => {
      if (SCAN_CONFIG.SKIP_HIDDEN && msg.is_hidden) return false;
      if (msg.is_system) return false;
      if (!msg.mes || !msg.mes.includes("[bgm]")) return false;
      return true;
    });
  const messagesToScan = validMessages.slice(-SCAN_CONFIG.MAX_MESSAGES_TO_SCAN);

  console.log(`[Player] 扫描 ${messagesToScan.length}/${chat.length} 条消息`);

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

let _playlistBuildPromise = null;

async function buildAndSetInitialPlaylist() {
  const settings = getSettings();
  if (!settings.playerEnabled) {
    return;
  }
  if (_playlistBuildPromise) {
    return _playlistBuildPromise;
  }
  _playlistBuildPromise = _doBuildAndSetInitialPlaylist();
  try {
    await _playlistBuildPromise;
  } finally {
    _playlistBuildPromise = null;
  }
}

async function _doBuildAndSetInitialPlaylist() {
  isPlaylistReady = false;
  try {
    const [chatSongs, worldInfoSongsRaw] = await Promise.all([
      scanChatForSongs(),
      getBgmPlaylistAsync(),
    ]);

    let finalPlaylist = [...chatSongs];
    if (worldInfoSongsRaw && worldInfoSongsRaw.length > 0) {
      const worldInfoSongs = worldInfoSongsRaw.map((track) => ({
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
        lyricsUrl: track.lyricsUrl || track.lrc || track.歌词链接,
        coverUrl: track.coverUrl || track.cover || track.pic || track.封面链接,
        sourceMessageId: "world-info",
        ...track,
      }));

      const makeDedupKey = (s) => {
        if (s.id && s.source) return `${s.id}-${s.source}`;
        if (s.audioUrl) return `url:${s.audioUrl}`;
        const title = s.title || s.name || "";
        const artist = Array.isArray(s.artist)
          ? s.artist.join(",")
          : s.artist || "";
        return `info:${title}-${artist}`;
      };

      const chatSongIds = new Set(chatSongs.map((s) => makeDedupKey(s)));
      worldInfoSongs.forEach((ws) => {
        if (!chatSongIds.has(makeDedupKey(ws))) {
          finalPlaylist.push(ws);
        }
      });
    }
    const avatarUrls = getAvatarUrls();

    const playerIframe = document.querySelector("#music_player .theme-iframe");
    if (playerIframe && playerIframe.contentWindow) {
      if (finalPlaylist.length > 0) {
        if (playlistsAreDifferent(lastSentPlaylist, finalPlaylist)) {
          lastSentPlaylist = finalPlaylist;
          playerIframe.contentWindow.postMessage(
            {
              source: "typing-indicator-host",
              type: "set-initial-playlist",
              data: {
                playlist: finalPlaylist,
                charAvatarUrl: avatarUrls.char,
                userAvatarUrl: avatarUrls.user,
              },
            },
            "*",
          );
        } else {
          debugLog("[Player] 播放列表未变化，只更新上下文");
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
              charAvatarUrl: avatarUrls.char,
              userAvatarUrl: avatarUrls.user,
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
  }
}

async function handleSongPlayRequest(songData) {
  if (!songData || !songData.title || !songData.artist) {
    console.error("[Typing Indicator Music] 从正则点击中收到无效的歌曲数据。");
    return;
  }

  const settings = getSettings();
  if (!settings.playerEnabled) {
    settings.playerEnabled = true;
    saveSettingsDebounced();
    showPlayer();
    const playerEnableCheckbox = document.getElementById("ti_player_enabled");
    if (playerEnableCheckbox) {
      playerEnableCheckbox.checked = true;
      const playerControls = document.getElementById("ti_player_controls");
      if (playerControls) playerControls.style.display = "block";
    }
    toastr.info(t`Player has been automatically enabled.`, t`Music Player`, {
      timeOut: 2000,
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await buildAndSetInitialPlaylist();
  }

  const playerIframe = document.querySelector("#music_player .theme-iframe");
  if (!playerIframe || !playerIframe.contentWindow) {
    toastr.error(t`Music player is not ready.`, t`Music Player`);
    return;
  }

  if (!isPlayerInitialized || !isPlaylistReady) {
    debugLog("[TypingIndicator] 等待播放器和播放列表初始化...");
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
      debugLog("[TypingIndicator] 初始化超时，继续尝试发送");
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
    const cachedArtist = MusicCache._normalizeArtist(cached.artist)
      .toLowerCase()
      .trim();
    const requestedArtist = MusicCache._normalizeArtist(songData.artist)
      .toLowerCase()
      .trim();
    const isValidMatch =
      cachedArtist.includes(requestedArtist) ||
      requestedArtist.includes(cachedArtist) ||
      cachedArtist === requestedArtist;

    if (!isValidMatch) {
      console.warn(
        `[Player] ⚠️ 缓存 artist 不匹配\n` +
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

    if (audioUrl) {
      console.log(
        `[Typing Indicator Music] ✓ 缓存完全命中: ${songData.title} - ${songData.artist}`,
      );
      sendPlayNow(playerIframe, cached, audioUrl, songData);
      showPlayerFeedback();
      return;
    }

    debugLog(
      `[Typing Indicator Music] 音频URL过期，重新获取: ${songData.title}`,
    );
    try {
      const sourceMap = {
        Netease: "netease",
        Tencent: "tencent",
        Kuwo: "kuwo",
      };
      const apiSource = sourceMap[cached.source] || cached.source.toLowerCase();

      const response = await fetch(
        `/api/plugins/g-player-proxy/song?id=${cached.id}&source=${apiSource}`,
      );
      const data = await response.json();

      let newAudioUrl = "";
      if (data.data) {
        newAudioUrl = Array.isArray(data.data)
          ? data.data[0]?.url
          : data.data.url;
      }

      if (newAudioUrl && !newAudioUrl.includes(".mp4")) {
        MusicCache.setAudio(cached.id, cached.source, newAudioUrl);
        console.log(
          `[Typing Indicator Music] ✓ 音频URL已刷新: ${songData.title}`,
        );
        sendPlayNow(playerIframe, cached, newAudioUrl, songData);
        showPlayerFeedback();
        return;
      }
    } catch (e) {
      debugWarn(`[Typing Indicator Music] 刷新音频URL失败:`, e);
    }
  }

  console.log(
    `[Typing Indicator Music] 缓存未命中，发送搜索请求: ${songData.title} - ${songData.artist}`,
  );
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
  debugLog(`[TypingIndicator] Theme update triggered by: ${source}`);
  const settings = getSettings();
  const newConfig = getActiveThemeConfig();

  if (
    newConfig.themeId === currentlyAppliedConfig.themeId &&
    newConfig.presetId === currentlyAppliedConfig.presetId
  ) {
    debugLog(`[TypingIndicator] Theme config is unchanged. Skipping update.`);
    return;
  }

  debugLog(
    `[TypingIndicator] Applying new theme config. Old:`,
    currentlyAppliedConfig,
    `New:`,
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
    setTimeout(() => {
      if (!indicatorElement.isConnected) {
        debugLog("[TypingIndicator] Element detached, skip iframe creation");
        return;
      }
      getOrCreateIframe(theme, indicatorElement, characterName);
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
    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const currentY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

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

  if (settings.position === "draggable") {
    if (settings.customPosition.locked) {
      indicator.querySelector(".ti-drag-handle")?.remove();
    } else {
      makeDraggable(indicator, "indicator");
    }
  } else {
    indicator.querySelector(".ti-drag-handle")?.remove();
  }

  if (indicator.dataset.overlayMode === "1") {
    const pe = settings.customPosition.locked ? "none" : "auto";
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

// ==================== 指示器显示和隐藏 ====================

function showTypingIndicator(type, _args, dryRun, overrideThemeId) {
  if (isRendering) {
    debugLog(`[TypingIndicator] ⚠️ isRendering 锁阻止了调用, type=${type}`);
    return;
  }
  isRendering = true;
  try {
    const settings = getSettings();
    let { themeId, presetId } = getActiveThemeConfig();
    if (overrideThemeId) {
      themeId = overrideThemeId;
    }

    const currentTheme =
      settings.themes.find((t) => t.id === themeId) || settings.themes[0];
    debugLog(
      `[TypingIndicator] Theme resolved: id=${currentTheme.id}, name="${currentTheme.name}", useIframe=${currentTheme.useIframe}, requestedId=${themeId}`,
    );
    if (themeId && themeId !== currentTheme.id) {
      console.error(
        `[TypingIndicator] ⚠️ THEME ID MISMATCH! Requested="${themeId}" but resolved="${currentTheme.id}". Check if theme exists in settings.`,
      );
    }

    const existingIndicator = document.getElementById("typing_indicator");

    if (isIndicatorPersisted && existingIndicator) {
      debugLog(
        `[TypingIndicator] ⚠️ 早退: isIndicatorPersisted=${isIndicatorPersisted}, existingIndicator存在`,
      );
      isRendering = false;
      return;
    }

    debugLog(
      `[TypingIndicator] 检查点A: isIndicatorPersisted=${isIndicatorPersisted}, existingIndicator=${!!existingIndicator}`,
    );

    if (!isIndicatorPersisted && existingIndicator) {
      cleanupUnifiedIframe(existingIndicator);
      existingIndicator.remove();
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
      debugLog(
        `[TypingIndicator] 检查点B: isDynamicCall=${isDynamicCall}, type=${type}, name2="${name2}", streaming=${settings.streaming}, isStreamingEnabled=${isStreamingEnabled()}`,
      );
      const charName = getCurrentCharName();
      if (
        !isDynamicCall &&
        type !== "test" &&
        (!charName || (!settings.streaming && isStreamingEnabled()))
      ) {
        return;
      }
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

    debugLog("--- Typing Indicator Display ---");
    debugLog(`User: ${userName}, Character: ${charName}`);

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
      debugLog(
        `[TypingIndicator] 检查点C: position=${settings.position}, supportedPositions=${JSON.stringify(supportedPositions)}`,
      );
      if (!supportedPositions.includes(settings.position)) {
        console.warn(
          `TypingIndicator: iframe 主题 "${currentTheme.name}" 不支持 "${settings.position}" 位置。`,
        );
        isRendering = false;
        return;
      }
    }

    let typingIndicator = document.createElement("div");
    typingIndicator.id = "typing_indicator";
    typingIndicator.dataset.themeId = themeId;
    typingIndicator.classList.add("typing_indicator");

    if (!currentTheme.useIframe) {
      debugLog("--- Typing Indicator Start (CSS Mode) ---");
      debugLog(`User: ${userName}, Character: ${charName}`);
      console.log("Avatar URLs:", avatarUrls);
      console.log(`Final names: user="${userName}", char="${charName}"`);

      let preset =
        settings.textPresets.find((p) => p.id === presetId) ||
        settings.textPresets.find(
          (p) => p.id === settings.selectedTextPresetId,
        ) ||
        settings.textPresets[0];

      if (!preset) {
        console.warn(
          "[TypingIndicator] CSS主题需要相应的预设设置，但当前配置中未找到任何适用的预设。",
        );
        isRendering = false;
        return;
      }

      debugLog(
        "Initial preset text:",
        preset ? preset.text : "N/A (iframe theme)",
      );
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

      debugLog("Text after all replaces:", baseText);

      const svgAnimation = `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.dot-fade-1{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) 0s infinite}.dot-fade-2{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .2s infinite}.dot-fade-3{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .4s infinite}@keyframes smoothFade{0%{opacity:.2}30%{opacity:1}60%{opacity:.4}100%{opacity:.2}}</style><circle class="dot-fade-1" cx="5" cy="8" r="3"/><circle class="dot-fade-2" cx="15" cy="8" r="3"/><circle class="dot-fade-3" cx="25" cy="8" r="3"/></svg></span>`;
      const htmlContent = `${baseText}${
        settings.showAnimation ? svgAnimation : ""
      }`;

      debugLog("Final HTML content:", htmlContent);
      typingIndicator.innerHTML = `<span class="typing_indicator_text" style="font-family: inherit;">${htmlContent}</span>`;
    }

    const position = settings.position;
    let parentContainer;

    switch (position) {
      case "floating_bottom":
        typingIndicator.classList.add("typing_indicator_floating");
        const sendForm = document.getElementById("send_form");
        const memoryTable = document.getElementById("tableStatusContainer");
        let bottomOffset = 5;
        if (sendForm) bottomOffset += sendForm.offsetHeight;
        if (memoryTable && getComputedStyle(memoryTable).display !== "none") {
          bottomOffset += memoryTable.offsetHeight;
        }
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
          typingIndicator.classList.add("typing_indicator_full_width");
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
      if (position === "above_input" || position === "full_width_banner") {
        parentContainer.parentNode.insertBefore(
          typingIndicator,
          parentContainer,
        );
      } else {
        parentContainer.appendChild(typingIndicator);
      }
    } else {
      document.body.appendChild(typingIndicator);
      console.warn(
        "TypingIndicator: Parent container not found, appending to body.",
      );
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
        if (size.maxWidth) typingIndicator.style.maxWidth = size.maxWidth;
        if (size.maxHeight) typingIndicator.style.maxHeight = size.maxHeight;
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
    console.error("[TypingIndicator] showTypingIndicator 异常:", e);
    isRendering = false;
  }
}

async function hideTypingIndicator() {
  const settings = getSettings();
  if (
    isIndicatorPersisted ||
    (settings.enableDynamicThemes && dynamicThemeTimeoutId)
  ) {
    console.log("[TypingIndicator] 隐藏请求被跳过 (固定模式或动态停留中)。");
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
          setTimeout(() => resolve({ timedOut: true }), shutdownTimeout);
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
            console.warn(
              `[TypingIndicator] Graceful shutdown for theme "${themeId}" failed: Timed out after ${shutdownTimeout}ms.`,
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
          if (themeDataToSave && Object.keys(themeDataToSave).length > 0) {
            if (!settings.themeData) settings.themeData = {};
            if (!settings.themeData[themeId]) settings.themeData[themeId] = {};
            Object.assign(settings.themeData[themeId], themeDataToSave);
            saveSettingsDebounced();
            console.log(
              `[TypingIndicator] Gracefully saved data for theme ${themeId}:`,
              themeDataToSave,
            );
          }
        }
      } catch (error) {
        console.warn(
          "[TypingIndicator] An unexpected error occurred during graceful shutdown:",
          error,
        );
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
    console.warn("[TypingIndicator] 没有找到播放器主题");
    return;
  }

  const selectedTheme =
    playerThemes.find((t) => t.id === settings.selectedPlayerThemeId) ||
    playerThemes[0];

  if (!selectedTheme) {
    console.warn("[TypingIndicator] 没有可用的播放器主题");
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
    if (text) lines.push({ time, text });
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
    console.error("[Lyrics] 获取歌词失败:", error);
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
    console.log("[Lyrics] 当前歌曲没有歌词URL");
    hideLyricsOverlay();
    return;
  }

  console.log("[Lyrics] 正在加载歌词:", lyricsUrl);
  const lyrics = await fetchLyrics(lyricsUrl);

  if (lyrics && lyrics.length > 0) {
    currentLyrics = lyrics;
    currentLyricIndex = -1;
    showLyricsOverlay();
    console.log(`[Lyrics] 成功加载 ${lyrics.length} 行歌词`);
  } else {
    console.log("[Lyrics] 歌词加载失败或为空");
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

        innerEl.style.setProperty("--scroll-distance", `-${scrollDistance}px`);
        innerEl.style.setProperty("--scroll-duration", `${scrollDuration}s`);
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
  if (settings._autoShowTranslation !== undefined) {
    return settings._autoShowTranslation;
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
      const currentProgress = lastLyricsProgress >= 0 ? lastLyricsProgress : 0;
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
    settings.listeningStats[charAvatar].lastPlayed = new Date().toISOString();
    saveSettingsDebounced();
    console.log(
      `[ListeningStats] ${reason}: +${Math.round(duration / 1000)}秒 → ${charAvatar}`,
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

function hidePlayer() {
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
    const allPanels = document.querySelectorAll("#typing_indicator_settings");
    if (allPanels.length > 1) {
      console.warn(
        "[TypingIndicator] Detected duplicate settings panels. Cleaning up.",
      );
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
        oldSection.querySelector(".inline-drawer-content").style.display !==
          "none";
      oldSection.remove();
    }

    const renderFn = addExtensionSettings();
    renderFn(wasOpen);
  }, 50);
}

function replaceIndicator(source = "unknown") {
  debugLog(`[TypingIndicator] 执行原子化替换操作。来源: ${source}`);
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
      debugLog(`[TypingIndicator] 无指示器，正在创建。来源: ${source}`);
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
      `[TypingIndicator] State-Lock: 锁定有状态主题 "${runningTheme.name}"。来源: ${source}. 只更新内容。`,
    );
    const iframe = indicator.querySelector(".theme-iframe");
    if (iframe && iframe.contentWindow) {
      if (runningTheme.name.startsWith("播放器")) {
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
        `[TypingIndicator] 尝试更新有状态主题内容时，iframe或contentWindow未就绪。Source: ${source}`,
      );
    }
    return;
  }

  debugLog(
    `[TypingIndicator] State-Lock Disengaged: 当前运行的是无状态主题，将根据新环境更新。Source: ${source}`,
  );
  const newConfig = getActiveThemeConfig();

  if (indicator.dataset.themeId === newConfig.themeId) {
    debugLog(
      `[TypingIndicator] 新旧主题ID相同 (${newConfig.themeId})，仅刷新内容。`,
    );
    refreshIndicatorContent(indicator);
  } else {
    replaceIndicator(source);
  }
}

function refreshLiveIndicators(source = "unknown") {
  debugLog(`[TypingIndicator] 刷新请求来源: ${source}`);
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
      debugLog(
        "[TypingIndicator] 刷新被全局锁阻止。有状态主题不允许被替换式刷新。",
      );
      handlePersistentModeUpdate(`refresh_content_only_for_stateful`).catch(
        (err) =>
          console.error(
            "[TypingIndicator] persistentModeUpdate (refresh) 失败:",
            err,
          ),
      );
      return;
    }

    const newConfig = getActiveThemeConfig();

    if (handleCrossTypeSwitch(newConfig.themeId, `refresh-${source}`)) {
      return;
    }

    debugLog("[TypingIndicator] 同类型刷新，执行fade替换");
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
      if (memoryTable && getComputedStyle(memoryTable).display !== "none") {
        bottomOffset += memoryTable.offsetHeight;
      }
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
    const size = themeSizes[settings.position] || Object.values(themeSizes)[0];
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

    const svgAnimation = `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.dot-fade-1{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) 0s infinite}.dot-fade-2{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .2s infinite}.dot-fade-3{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .4s infinite}@keyframes smoothFade{0%{opacity:.2}30%{opacity:1}60%{opacity:.4}100%{opacity:.2}}</style><circle class="dot-fade-1" cx="5" cy="8" r="3"/><circle class="dot-fade-2" cx="15" cy="8" r="3"/><circle class="dot-fade-3" cx="25" cy="8" r="3"/></svg></span>`;
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
    `[TypingIndicator] 跨类型切换: ${oldTheme.useIframe ? "iframe" : "CSS"} → ${newTheme.useIframe ? "iframe" : "CSS"}, 来源: ${source}`,
  );

  applyTheme(newThemeId);
  currentlyAppliedConfig = {
    themeId: newThemeId,
    presetId: getActiveThemeConfig().presetId,
  };

  cleanupUnifiedIframe(indicator);
  indicator.remove();

  isRendering = false;
  showTypingIndicator(`cross-type-${source}`, undefined, undefined, newThemeId);

  return true;
}

function revertDynamicTheme(source = "unknown") {
  if (!currentDynamicThemeId) return;

  console.log(`[TypingIndicator] Reverting dynamic theme. Source: ${source}`);
  const revertingFromThemeId = currentDynamicThemeId;
  currentDynamicThemeId = null;
  currentDynamicPresetId = null;

  const settings = getSettings();

  if (revertingFromThemeId && statefulThemes.has(revertingFromThemeId)) {
    isStatefulThemeLocked = false;
    debugLog(`[TypingIndicator] 回退：解锁 ${revertingFromThemeId}`);
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
    const baseName = matchedTheme.name.replace(/-美化$|-Style$/i, "").trim();
    const matchedPreset = settings.textPresets.find((p) => p.name === baseName);
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

function handleMainThemeChange() {
  const settings = getSettings();
  if (!settings.autoFollowTheme) {
    return;
  }

  let mainThemeName;
  try {
    mainThemeName = power_user.theme;
  } catch (error) {
    console.warn("[TypingIndicator] Could not read power_user.theme:", error);
    return;
  }

  if (!mainThemeName) {
    return;
  }

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
        `[TypingIndicator] 未找到与基础名称匹配的指示器主题 "${themeBaseName}".`,
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
  console.log("[TypingIndicator] Global SVG defs container initialized.");
}

function updateGlobalDefs(itemToProcess = null) {
  let globalSvgContainer = document.getElementById("ti-global-svg-defs");
  if (!globalSvgContainer) {
    console.warn(
      "[TypingIndicator] Global SVG defs container not found. Initializing now.",
    );
    setupGlobalSvgDefs();
    globalSvgContainer = document.getElementById("ti-global-svg-defs");
    if (!globalSvgContainer) {
      console.error(
        "[TypingIndicator] Failed to create global SVG defs container.",
      );
      return;
    }
  }

  const masterDefs = globalSvgContainer.querySelector("defs");
  if (!masterDefs) {
    console.error(
      "[TypingIndicator] 'defs' tag not found in global container.",
    );
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
        console.log(
          `[TypingIndicator] Defs from "${item.name}" dynamically updated.`,
        );
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
        if (attr.name.startsWith("on") || attr.value.includes("javascript:")) {
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
  const existingSection = document.getElementById("typing_indicator_settings");
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
                                <label class="checkbox_label"><input type="checkbox" id="ti_show_animation" ${
                                  settings.showAnimation ? "checked" : ""
                                }>${t`Show typing animation`}</label>
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
                                  settings.enableDynamicThemes ? "checked" : ""
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
                                          !theme.name.startsWith("播放器") &&
                                          !theme.name.startsWith("Player"),
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
                            <h4>${t`Indicator Position`}</h4>
                            <div style="display: flex; align-items: center; gap: 10px;"><select id="ti_position" class="text_pole" style="flex-grow: 1;"></select></div>
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
    <div class="ti-readme-textarea-wrapper">
        <textarea id="ti_preset_text" class="text_pole" rows="5"></textarea>
    </div>
</details>
<details class="ti-readme-details" id="ti_preset_readme_details">
    <summary><i class="fa-solid fa-circle-info"></i> ${t`Theme Info`} (Markdown)</summary>
    <div class="ti-readme-textarea-wrapper">
        <textarea id="ti_preset_readme" class="text_pole" rows="4"
            placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
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
                                <details class="ti-readme-details" id="ti_theme_readme_details">
                                    <summary><i class="fa-solid fa-circle-info"></i> ${t`Theme Info`} (Markdown)</summary>
                                    <div class="ti-readme-textarea-wrapper">
                                        <textarea id="ti_theme_readme" class="text_pole" rows="4"
                                            placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
                                    </div>
                                                                </details>
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
                            <div class="ti-checkbox-container"><label class="checkbox_label"><input type="checkbox" id="ti_player_enabled" ${
                              settings.playerEnabled ? "checked" : ""
                            }>${t`Enable Player`}</label></div>
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
            <input type="checkbox" id="ti_player_locked" ${
              settings.playerPosition.locked ? "checked" : ""
            }>
            ${t`Lock Position`}
        </label>
        <small style="margin-left: 24px; opacity: 0.7;">${t`Lock to enable player interaction.`}</small>
    </div>
</div>
        <div style="display: flex; gap: 5px;">
            <button id="ti_player_reset" class="menu_button fa-solid fa-undo" title="${t`Reset Position`}"></button>
        </div>
    </div>

    <!-- 听歌统计部分 -->
    <div style="border-top: 1px solid var(--SmartThemeBorderColor); padding-top: 12px; margin-top: 12px;">
        <h4 style="margin-bottom: 8px;">${t`Listening Stats`}</h4>
        <div id="ti_listening_stats" style="margin-bottom: 10px; padding: 12px; background: var(--SmartThemeBlurTintColor); border-radius: 8px;">
            <div style="text-align: center; color: var(--SmartThemeBodyColor); opacity: 0.6;">
                ${t`Select a character to view stats`}
            </div>
        </div>
    </div>

    <!-- 音乐缓存部分 -->
    <div style="border-top: 1px solid var(--SmartThemeBorderColor); padding-top: 12px; margin-top: 5px;">
        <h4 style="margin-bottom: 8px;">${t`Music Cache`}</h4>
        <div id="ti_cache_stats" style="margin-bottom: 10px; padding: 10px; background: var(--SmartThemeBlurTintColor); border-radius: 6px; font-size: 0.9em;">
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
                                <details class="ti-readme-details" id="ti_player_theme_readme_details">
                                    <summary><i class="fa-solid fa-circle-info"></i> ${t`Theme Info`} (Markdown)</summary>
                                    <div class="ti-readme-textarea-wrapper">
                                        <textarea id="ti_player_theme_readme" class="text_pole" rows="4"
                                            placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
                                    </div>
                                                                </details>
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
                                <div class="ti-grid-2-col" style="gap: 10px; margin-bottom: 15px;">
                                    <label style="text-align: right;">${t`Sung Color`}:</label>
                                    <input type="color" id="ti_lyrics_sung_color" value="${
                                      settings.lyricsSungColor
                                    }" style="width: 60px; height: 30px;">

                                    <label style="text-align: right;">${t`Unsung Color`}:</label>
                                    <input type="color" id="ti_lyrics_unsung_color" value="${
                                      settings.lyricsUnsungColor
                                    }" style="width: 60px; height: 30px;">

                                    <label style="text-align: right;">${t`Background`}:</label>
                                    <input type="text" id="ti_lyrics_background" class="text_pole" value="${
                                      settings.lyricsBackground
                                    }" style="width: 150px;" placeholder="rgba(0,0,0,0.6)">

                                    <label style="text-align: right;">${t`Font Size`}:</label>
                                    <input type="number" id="ti_lyrics_font_size" class="text_pole" value="${
                                      settings.lyricsFontSize
                                    }" min="12" max="36" style="width: 80px;">
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
            <details class="ti-readme-details" id="ti_bubble_readme_details">
                <summary><i class="fa-solid fa-circle-info"></i> ${t`Theme Info`} (Markdown)</summary>
                <div class="ti-readme-textarea-wrapper">
                    <textarea id="ti_bubble_readme" class="text_pole" rows="4"
                        placeholder="${t`Optional: description, author credits, notes, etc. Supports Markdown`}"></textarea>
                </div>
            </details>
        </div>
</details>

        <div id="ti_bubble_preview_area" style="margin-top: 15px; padding: 15px; background: var(--SmartThemeBlurTintColor); border-radius: 8px; text-align: center;">
            <span style="color: var(--SmartThemeBodyColor); opacity: 0.7;">${t`Bubble preview will appear here`}</span>
        </div>
    </div>
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
                                <button id="ti_download_guide_btn" class="menu_button"><i class="fa-solid fa-book-open"></i><span>${t`Theme Creation Guide`}</span></button>
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
                            <label class="checkbox_label" style="color: var(--text-color-secondary); margin-left: 20px;">
    <input type="checkbox" id="ti_verbose_logs" ${settings.verboseLogs ? "checked" : ""} ${!settings.debugLogs ? "disabled" : ""}>
    ${t`Verbose: Show all internal logs`}
</label>
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
    initializeToolsSettings();

    section.querySelectorAll(".ti-more-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = toggle.nextElementSibling;
        section.querySelectorAll(".ti-more-dropdown.open").forEach((d) => {
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
        setTimeout(() => section.querySelector(focusTargetId)?.focus(), 50);
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
          const parentDetails = details.parentElement?.closest("details");
          if (parentDetails && !parentDetails.hasAttribute("open")) {
            parentDetails.setAttribute("open", "");
          }
          details.setAttribute("open", "");
          setTimeout(() => details.querySelector("textarea")?.focus(), 50);
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

    section.querySelector("#ti_streaming").addEventListener("change", (e) => {
      settings.streaming = e.target.checked;
      saveSettingsDebounced();
    });

    section
      .querySelector("#ti_show_animation")
      .addEventListener("change", (e) => {
        settings.showAnimation = e.target.checked;
        saveSettingsDebounced();
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

        if (settings.persistentMode) {
          isIndicatorPersisted = true;
          showTypingIndicator("persistent-start");
          const testButton = section.querySelector("#ti_test_draggable");
          if (testButton) {
            testButton.disabled = true;
            testButton.title = t`Unavailable in Persistent Mode`;
          }
        } else {
          isIndicatorPersisted = false;
          const indicator = document.getElementById("typing_indicator");
          if (indicator) {
            $(indicator).stop(true, true);
            cleanupUnifiedIframe(indicator);
            indicator.remove();
          }
          const testButton = section.querySelector("#ti_test_draggable");
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

    // 位置设置
    updatePositionOptions();

    const positionSelect = section.querySelector("#ti_position");
    const draggableControls = section.querySelector("#ti_draggable_controls");

    positionSelect.addEventListener("change", (e) => {
      settings.position = e.target.value;
      draggableControls.style.display =
        settings.position === "draggable" ? "flex" : "none";
      saveSettingsDebounced();
      syncIndicatorInteractivity();
    });

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
          indicator.style.transition = "left 0.3s ease, top 0.3s ease";
          indicator.style.left = `${window.innerWidth / 2}px`;
          indicator.style.top = `${window.innerHeight / 2}px`;
          indicator.style.transform = "translate(-50%, -50%)";

          setTimeout(() => {
            if (indicator) {
              indicator.style.transition = "";
              syncIndicatorInteractivity();
            }
          }, 300);

          toastr.info(t`Draggable state refreshed.`, "", {
            timeOut: 1000,
          });
        }
      });

    section
      .querySelector("#ti_test_draggable")
      .addEventListener("click", () => {
        const indicator = document.getElementById("typing_indicator");
        const testButton = section.querySelector("#ti_test_draggable");

        if (indicator) {
          isIndicatorPersisted = false;
          hideTypingIndicator();
          testButton.classList.remove("fa-solid", "fa-eye-slash");
          testButton.classList.add("fa-solid", "fa-crosshairs");
          testButton.title = t`Test Dragging`;
          isTestIndicatorActive = false;
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
    const playerEnabledCheckbox = section.querySelector("#ti_player_enabled");
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
              style.id === settings.selectedBubbleStyleId ? "selected" : ""
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
      const previewArea = section.querySelector("#ti_bubble_preview_area");
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
          openEditorAfterCreate("#ti_bubble_editor_details", "#ti_bubble_html");
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
          if (style && style.isBuiltIn) {
            toastr.warning(t`Cannot delete built-in style.`);
            return;
          }
          if (confirm(t`Delete this style?`)) {
            settings.bubbleStyles = settings.bubbleStyles.filter(
              (s) => s.id !== settings.selectedBubbleStyleId,
            );
            settings.selectedBubbleStyleId = settings.bubbleStyles[0].id;
            saveSettingsDebounced();
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
                const imported = JSON.parse(event.target.result);

                if (!imported.name || !imported.html) {
                  throw new Error(t`Invalid bubble style format.`);
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

                const existingIndex = settings.bubbleStyles.findIndex(
                  (s) => s.id === newStyle.id,
                );
                if (existingIndex !== -1) {
                  settings.bubbleStyles[existingIndex] = newStyle;
                } else {
                  settings.bubbleStyles.push(newStyle);
                }

                settings.selectedBubbleStyleId = newStyle.id;
                saveSettingsDebounced();
                populateBubbleStyles();
                applyBubbleStyles();
                refreshAllBubbles();
                toastr.success(t`Bubble style "${newStyle.name}" imported.`);
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
            exportedBy: "SillyTavern Typing Indicator Themes Extension",
            type: "bubble-style",
          };

          const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: "application/json",
          });
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
            player.style.setProperty("display", "none", "important");
          } else {
            player.style.setProperty("display", "block", "important");
          }
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

    section.querySelector("#ti_player_reset").addEventListener("click", () => {
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

        toastr.info(t`Draggable state refreshed.`, "", {
          timeOut: 1000,
        });
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

    const clearCacheBtn = section.querySelector("#ti_cache_clear");
    if (clearCacheBtn) {
      clearCacheBtn.addEventListener("click", () => {
        if (
          confirm(
            t`Clear all music cache? You will need to search songs again.`,
          )
        ) {
          MusicCache.clear();
          failedSearches.clear();
          lastSentPlaylist = null;
          const playerIframe = document.querySelector(
            "#music_player .theme-iframe",
          );
          if (playerIframe && playerIframe.contentWindow) {
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
      const lyricsEnabledCheckbox = section.querySelector("#ti_lyrics_enabled");
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
        lyricsControls.style.display = e.target.checked ? "block" : "none";
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

      const sungColorInput = section.querySelector("#ti_lyrics_sung_color");
      if (sungColorInput) {
        sungColorInput.addEventListener("input", (e) => {
          const settings = getSettings();
          settings.lyricsSungColor = e.target.value;
          saveSettingsDebounced();
          debouncedRefreshLyrics();
        });
      }

      const unsungColorInput = section.querySelector("#ti_lyrics_unsung_color");
      if (unsungColorInput) {
        unsungColorInput.addEventListener("input", (e) => {
          const settings = getSettings();
          settings.lyricsUnsungColor = e.target.value;
          saveSettingsDebounced();
          debouncedRefreshLyrics();
        });
      }

      const backgroundInput = section.querySelector("#ti_lyrics_background");
      if (backgroundInput) {
        backgroundInput.addEventListener("change", (e) => {
          const settings = getSettings();
          settings.lyricsBackground = e.target.value;
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

      const showNextCheckbox = section.querySelector("#ti_lyrics_show_next");
      if (showNextCheckbox) {
        showNextCheckbox.addEventListener("change", (e) => {
          const settings = getSettings();
          settings.lyricsShowNextLine = e.target.checked;
          delete settings._autoShowTranslation;
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
            if (lyricsEnabledCheckbox) lyricsEnabledCheckbox.checked = true;
            const lyricsControls = section.querySelector("#ti_lyrics_controls");
            if (lyricsControls) lyricsControls.style.display = "block";
            saveSettingsDebounced();
          }
          savedTestLyrics = currentLyrics.length > 0 ? [...currentLyrics] : [];
          savedTestLyricIndex = currentLyricIndex;
          wasLyricsPlaying = currentLyrics.length > 0 && currentLyricIndex >= 0;
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
          currentSessionTime = Date.now() - listeningSession.startTime;
        }

        const totalTimeWithCurrent = charStats.totalTime + currentSessionTime;
        const isCurrentlyPlaying = currentSessionTime > 0;

        const avatarUrl = getThumbnailUrl("avatar", charStats.charAvatar);

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
              throw new Error(`文件未找到 (状态码: ${response.status})`);
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
                            <h3 style="margin: 0; font-size: 1.2em;">📖 ${currentLang === "zh" ? "使用说明" : currentLang === "th" ? "คู่มือการใช้งาน" : "Usage Guide"}</h3>
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

          const popup = document.getElementById("ti_usage_guide_popup");
          const dialog = document.getElementById("ti_usage_guide_dialog");
          const closeBtn = document.getElementById("ti_close_usage_guide");
          const contentDiv = document.getElementById("ti_usage_guide_content");
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
                lang === "zh" ? "#000" : "var(--SmartThemeBodyColor, #fff)";

              langEnBtn.style.background =
                lang === "en"
                  ? "var(--SmartThemeQuoteColor, #88c0d0)"
                  : "transparent";
              langEnBtn.style.color =
                lang === "en" ? "#000" : "var(--SmartThemeBodyColor, #fff)";

              langThBtn.style.background =
                lang === "th"
                  ? "var(--SmartThemeQuoteColor, #88c0d0)"
                  : "transparent";
              langThBtn.style.color =
                lang === "th" ? "#000" : "var(--SmartThemeBodyColor, #fff)";

              titleEl.textContent =
                lang === "zh"
                  ? "📖 使用说明"
                  : lang === "th"
                    ? "📖 คู่มือการใช้งาน"
                    : "📖 Usage Guide";

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

          langZhBtn.addEventListener("click", () => switchLanguage("zh"));
          langEnBtn.addEventListener("click", () => switchLanguage("en"));
          langThBtn.addEventListener("click", () => switchLanguage("th"));
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
            document.removeEventListener("keydown", escHandler, true);
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

    section.querySelector("#ti_dev_mode").addEventListener("change", (e) => {
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

    section.querySelector("#ti_debug_logs").addEventListener("change", (e) => {
      settings.debugLogs = e.target.checked;
      saveSettingsDebounced();
      updateLogFunctions();
      const verboseCheckbox = section.querySelector("#ti_verbose_logs");
      if (verboseCheckbox) {
        verboseCheckbox.disabled = !e.target.checked;
        if (!e.target.checked) {
          verboseCheckbox.checked = false;
          settings.verboseLogs = false;
        }
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

    section
      .querySelector("#ti_download_guide_btn")
      .addEventListener("click", async () => {
        try {
          const scriptUrl = new URL(import.meta.url);
          const extensionPath = scriptUrl.pathname.substring(
            0,
            scriptUrl.pathname.lastIndexOf("/") + 1,
          );
          const guideFilePath = `${extensionPath}theme_guide.md`;
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
          downloader.download = "指示器美化主题创作指南.md";
          document.body.appendChild(downloader);
          downloader.click();
          window.URL.revokeObjectURL(url);
          downloader.remove();
        } catch (error) {
          console.error("下载创作指南失败:", error);
          toastr.error(
            t`Failed to download the creation guide. Please ensure the 'theme_guide.md' file is in the extension's root directory.`,
          );
        }
      });

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
          const userCreatedThemes = settings.themes.filter((t) => !t.isBuiltIn);
          _needsSync = true;
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
          saveSettingsDebounced();
          iframeCache.clear();

          if (typeof populatePresets === "function") populatePresets();
          if (typeof populateThemes === "function") populateThemes();
          if (typeof populatePlayerThemes === "function")
            populatePlayerThemes();

          applyTheme(settings.selectedThemeId);
          if (settings.playerEnabled) {
            reloadPlayer();
          }
          if (settings.persistentMode) {
            const indicator = document.getElementById("typing_indicator");
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

          console.log(
            `[TypingIndicator] 检测到语言: ${currentLang}, 使用文件: ${fileName}, 名称: ${worldBookName}`,
          );

          const formData = new FormData();
          const blob = new Blob([JSON.stringify(worldBookData)], {
            type: "application/json",
          });
          const file = new File([blob], `${worldBookData.name}.json`, {
            type: "application/json",
          });
          formData.append("avatar", file);

          const headers = getRequestHeaders();
          delete headers["Content-Type"];

          const importResponse = await fetch("/api/worldinfo/import", {
            method: "POST",
            headers: headers,
            body: formData,
          });

          if (!importResponse.ok) {
            const errorText = await importResponse.text();
            throw new Error(errorText || t`Import failed`);
          }

          const result = await importResponse.json();
          const displayName = result.name || worldBookData.name;

          try {
            await updateWorldInfoList();
            console.log("[TypingIndicator] 世界书列表刷新成功");
          } catch (e) {
            console.warn(
              "[TypingIndicator] updateWorldInfoList 调用失败，尝试备用方案:",
              e,
            );

            try {
              const listResponse = await fetch("/api/worldinfo/list", {
                method: "POST",
                headers: getRequestHeaders(),
              });

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
                    const firstOption = $select.find("option:first").clone();
                    $select.empty().append(firstOption);

                    worldList.forEach((world) => {
                      $select.append(
                        `<option value="${world}">${world}</option>`,
                      );
                    });

                    if (currentValue && worldList.includes(currentValue)) {
                      $select.val(currentValue);
                    }
                  }
                });

                console.log("[TypingIndicator] 世界书选择器已手动刷新");
              }
            } catch (refreshError) {
              console.error(
                "[TypingIndicator] 备用刷新方案也失败了:",
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

    section.querySelector("#ti_reset_all_btn").addEventListener("click", () => {
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
      if (iframePoolContainer) {
        iframePoolContainer.innerHTML = "";
      }
      iframeCache.clear();
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
            console.error("[TypingIndicator] 重置后播放器初始化失败:", err);
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

    console.log(
      `[TypingIndicator] updateCharSpecificUI called. Active theme: ${activeThemeId}, preset: ${activePresetId}`,
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
      const presetSelect = section.querySelector("#ti_char_preset_select");
      const presetRow = section.querySelector("#ti_char_preset_row");
      const charAvatar = characters[this_chid].avatar;
      const charConfig = getSettings().characterThemes?.[charAvatar] || {};
      const { themeId = "", presetId = "" } = charConfig;
      const isOverrideEnabled = !!(themeId || presetId);
      overrideCheckbox.checked = isOverrideEnabled;
      optionsContainer.style.display = isOverrideEnabled ? "block" : "none";
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

    const overrideCheckbox = section.querySelector("#ti_char_override_enabled");
    const charThemeSelect = section.querySelector("#ti_char_theme_select");
    const charPresetSelect = section.querySelector("#ti_char_preset_select");

    if (overrideCheckbox) {
      overrideCheckbox.addEventListener(
        "change",
        (e) => {
          const isChecked = e.target.checked;
          const optionsContainer = section.querySelector(
            "#ti_char_options_container",
          );
          optionsContainer.style.display = isChecked ? "block" : "none";

          if (!isChecked) {
            if (this_chid !== undefined && characters[this_chid]) {
              const charAvatar = characters[this_chid].avatar;
              const settings = getSettings();
              if (settings.characterThemes?.[charAvatar]) {
                delete settings.characterThemes[charAvatar];
                saveSettingsDebounced();
                setTimeout(() => {
                  updateAndApplyTheme("char_override_disabled_delayed");
                  updateCharSpecificUI();
                  const currentSettings = getSettings();

                  const revertMessage = currentSettings.autoFollowTheme
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
        const selectedTheme = settings.themes.find((t) => t.id === themeId);
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

          if (recommendedPreset && recommendedPreset.id !== presetId) {
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
        const preset = settings.textPresets.find((p) => p.id === presetId);

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
      debugWarn(`[TypingIndicator] Theme ${themeToLoad} not found`);
      return;
    }

    debugLog(
      `[TypingIndicator] Loading theme into editor: ${theme.name}, useIframe: ${theme.useIframe}`,
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

    debugLog(
      `[TypingIndicator] Loading preset into editor: ${presetToLoad.name}`,
    );

    if (globalPresetSelect && globalPresetSelect.value !== presetToLoadId) {
      globalPresetSelect.value = presetToLoadId;
    }

    if (presetTextarea && presetTextarea.value !== presetToLoad.text) {
      presetTextarea.value = presetToLoad.text;
      debugLog(`[TypingIndicator] Preset text updated in textarea`);
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

    const selectedPreset = settings.textPresets.find((p) => p.id === currentId);
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
          !theme.name.startsWith("播放器") && !theme.name.startsWith("Player"),
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
    const playerThemeSelect = section.querySelector("#ti_player_theme_select");

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
      playerThemes.find((theme) => theme.id === currentId) || playerThemes[0];
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
    const iframeContainer = section.querySelector("#iframe_editor_container");
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
    const sizesErrorDiv = section.querySelector("#ti_theme_iframe_sizes_error");

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
        const message = `💡 ${t`Found a matching theme`}: "<b>${
          recommendedTheme.name
        }</b>". `;
        const applyLink = $(
          `<a href="#" style="margin-left: 8px; font-weight: bold;">[${t`Apply`}]</a>`,
        );

        applyLink.on("click", (e) => {
          e.preventDefault();
          settings.selectedThemeId = recommendedTheme.id;
          const tiThemeSelect = section.querySelector("#ti_theme_select");
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

    section.querySelector("#ti_preset_save").addEventListener("click", () => {
      const settings = getSettings();
      const p = settings.textPresets.find((p) => p.id === tiPresetSelect.value);
      if (p) {
        p.text = tiPresetText.value;
        const hasReadme = presetReadme.save(p);
        saveSettingsDebounced();
        savedToast(p.name, hasReadme);
        refreshLiveIndicators("preset_save");
      }
    });

    section.querySelector("#ti_preset_add").addEventListener("click", () => {
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
        openEditorAfterCreate("#ti_preset_editor_details", "#ti_preset_text");
      }
    });

    section.querySelector("#ti_preset_rename").addEventListener("click", () => {
      const settings = getSettings();
      const preset = settings.textPresets.find(
        (p) => p.id === settings.selectedTextPresetId,
      );
      if (!preset) return;

      const newName = prompt(t`Enter new name for preset:`, preset.name);
      if (newName && newName.trim() !== "") {
        preset.name = newName.trim();
        populatePresets();
        saveSettingsDebounced();
        toastr.success(t`Preset renamed successfully!`);
      }
    });

    section.querySelector("#ti_preset_del").addEventListener("click", () => {
      const settings = getSettings();
      if (settings.textPresets.length <= 1) {
        toastr.warning(t`Cannot delete the last preset.`);
        return;
      }
      const p = settings.textPresets.find((p) => p.id === tiPresetSelect.value);
      if (
        confirm(t`Are you sure you want to delete the preset "${p?.name}"?`)
      ) {
        settings.textPresets = settings.textPresets.filter(
          (pr) => pr.id !== p.id,
        );
        settings.selectedTextPresetId = settings.textPresets[0].id;
        populatePresets();
        saveSettingsDebounced();
      }
    });

    // 导入导出
    section.querySelector("#ti_preset_import").addEventListener("click", () =>
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
        let themeNameClean = selectedTheme.name.replace(/ \[CSS\]$/, "").trim();
        let baseName = themeNameClean;
        const styleSuffixes = ["-美化", "-Style", " Style", "主题", " Theme"];
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
          const message = `💡 ${t`Found a matching preset`}: "<b>${
            recommendedPreset.name
          }</b>".`;
          const applyLink = $(
            `<a href="#" style="margin-left: 8px; font-weight: bold;">[${t`Apply`}]</a>`,
          );

          applyLink.on("click", (e) => {
            e.preventDefault();
            settings.selectedTextPresetId = recommendedPreset.id;
            const tiPresetSelect = section.querySelector("#ti_preset_select");
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
        const testIndicator = document.getElementById("typing_indicator");
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
          themeToSave.html = section.querySelector("#ti_theme_html").value;
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
          themeToSave.css = section.querySelector("#ti_theme_css").value;
          delete themeToSave.html;
          delete themeToSave.iframeCSS;
          delete themeToSave.iframeJS;
          delete themeToSave.sizes;
        }

        const hasReadme = themeReadme.save(themeToSave);
        iframeCache.delete(themeToSave.id);
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
          const testIndicator = document.getElementById("typing_indicator");
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
      const isNewThemeIframe = currentTheme ? currentTheme.useIframe : false;
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

    section.querySelector("#ti_theme_rename").addEventListener("click", () => {
      const settings = getSettings();
      const theme = settings.themes.find(
        (t) => t.id === settings.selectedThemeId,
      );
      if (!theme) return;

      const newName = prompt(t`Enter new name for theme:`, theme.name);
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
        settings.themes = settings.themes.filter(
          (th) => th.id !== themeToDelete.id,
        );
        settings.selectedThemeId = "default";
        populateThemes();
        applyTheme("default");
        saveSettingsDebounced();
      }
    });

    section
      .querySelector("#preview_theme")
      .addEventListener("click", async () => {
        const previewArea = document.getElementById("theme_preview_area");
        const settings = getSettings();
        const currentThemeId = tiThemeSelect.value;

        const previewTheme = {
          id: `preview-${currentThemeId}`,
          name: "Preview Theme",
          useIframe: document.getElementById("theme_mode_iframe").checked,
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
          previewTheme.html = document.getElementById("ti_theme_html").value;
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
              console.warn("Preview sizes JSON is invalid, using defaults.");
              toastr.error(t`Preview sizes JSON format is invalid!`);
            }
          }
        } else {
          previewTheme.css = document.getElementById("ti_theme_css").value;
        }

        previewArea.innerHTML = "";
        const oldPreviewStyle = document.getElementById("temp_preview_style");
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
          if (size.maxWidth) previewIndicator.style.maxWidth = size.maxWidth;
          if (size.maxHeight) previewIndicator.style.maxHeight = size.maxHeight;
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
                previewIndicator.style.transformOrigin = "center center";
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
              (p) => p.id === section.querySelector("#ti_preset_select").value,
            ) || settings.textPresets[0];

          let htmlContent = (textPreset.text || "正在输入...")
            .replace(/\$\{name2\}/g, previewCharName)
            .replace(/\{\{char\}\}/g, previewCharName)
            .replace(/\{\{user\}\}/g, previewUserName)
            .replace(/\{\{char_avatar_url\}\}/g, previewAvatarUrls.char)
            .replace(/\{\{user_avatar_url\}\}/g, previewAvatarUrls.user)
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

    section.querySelector("#ti_theme_import").addEventListener("click", () =>
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

    const formatSizesButton = section.querySelector("#ti_format_iframe_sizes");
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
          toastr.success(t`Default size examples have been filled in.`, "", {
            timeOut: 1000,
          });
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
          toastr.error(t`JSON format is incorrect, cannot format!`, "", {
            timeOut: 2000,
          });
        }
      });

      sizesTextarea.addEventListener("input", validateSizesJson);
    }
  }

  function setupPlayerThemeEventListeners() {
    const playerThemeSelect = section.querySelector("#ti_player_theme_select");

    if (!playerThemeSelect) return;

    const playerThemeInfoBtn = section.querySelector("#ti_player_theme_info");
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
        requestAnimationFrame(() => updatePlayerEditorMode(selectedTheme));
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
        themeToSave.html = section.querySelector("#ti_player_theme_html").value;
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

        iframeCache.delete(themeToSave.id);
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
              n.startsWith(t`Player`) || n.startsWith("Player")
                ? n
                : `${t`Player`}-${n}`,
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

        const newName = prompt(t`Enter new name for theme:`, theme.name);
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
          settings.themes = settings.themes.filter(
            (th) => th.id !== themeToDelete.id,
          );
          const remainingPlayerThemes = settings.themes.filter(
            (t) => t.name.startsWith("播放器") || t.name.startsWith("Player"),
          );
          settings.selectedPlayerThemeId =
            remainingPlayerThemes.length > 0
              ? remainingPlayerThemes[0].id
              : null;
          populatePlayerThemes();
          populateThemes();
          saveSettingsDebounced();
          if (settings.playerEnabled && remainingPlayerThemes.length === 0) {
            settings.playerEnabled = false;
            section.querySelector("#ti_player_enabled").checked = false;
            section.querySelector("#ti_player_controls").style.display = "none";
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
          validatePlayerSizesJson();
          toastr.success(t`Default size examples have been filled in.`, "", {
            timeOut: 1000,
          });
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
          toastr.error(t`JSON format is incorrect, cannot format!`, "", {
            timeOut: 2000,
          });
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
          if (!validation) throw new Error(t`Invalid ${type} format.`);

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
  bodyClassObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        setTimeout(() => handleMainThemeChange(), 100);
        setTimeout(() => {
          if (lyricsOverlayElement) {
            lyricsOverlayElement.style.fontFamily = getComputedStyle(
              document.body,
            ).fontFamily;
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
    stopButtonObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.attributeName === "style" ||
          mutation.attributeName === "class"
        ) {
          const isHidden =
            window.getComputedStyle(stopButton).display === "none";
          const settings = getSettings();
          const indicator = document.getElementById("typing_indicator");
          if (isHidden && !settings.persistentMode && indicator) {
            if (
              settings.enableDynamicThemes &&
              (currentDynamicThemeId || dynamicThemeTimeoutId)
            ) {
              return;
            }
            hideTypingIndicator();
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
      debugLog("[Performance] 页面已显示。");
    } else {
      debugLog("[Performance] 页面已隐藏，更新操作暂停。");
      if (bubbleRenderScheduled) {
        bubbleRenderQueue.clear();
        bubbleRenderScheduled = false;
      }
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

      console.log(
        "[Typing Indicator Music] 音乐泡泡点击了，发送播放请求:",
        songData,
      );
      handleSongPlayRequest(songData);
    }
  });

  loadScript("https://cdn.jsdelivr.net/npm/acorn/dist/acorn.min.js");

  const processedAppendMessages = new Set();
  const appendedSongKeys = new Set();
  async function appendNewSongs(messageId) {
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
      appendedSongKeys.add(key);
      return true;
    });

    if (trulyNewSongs.length === 0) {
      debugLog(`[Player] 所有歌曲已追加过，跳过: 消息 ${messageId}`);
      return;
    }

    console.log(
      `[Typing Indicator Music] Found ${trulyNewSongs.length} new songs in message ${messageId}.`,
    );
    const playerIframe = document.querySelector("#music_player .theme-iframe");
    if (playerIframe && playerIframe.contentWindow) {
      playerIframe.contentWindow.postMessage(
        {
          source: "typing-indicator-host",
          type: "append-songs-to-playlist",
          data: trulyNewSongs,
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
      if (type === "player-initialized") {
        isPlayerInitialized = true;
        debugLog("[TypingIndicator] ✓ 播放器已就绪");
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

          console.log("[缓存回写] 收到播放器数据:", {
            title,
            artist,
            id: trackData?.id,
          });
          if (title && artist && trackData?.artist) {
            if (!MusicUtils.isArtistMatch(artist, trackData.artist)) {
              console.warn(
                `[缓存回写] ⚠️ 歌手不匹配，拒绝缓存\n  期望: ${artist}\n  实际: ${trackData.artist}`,
              );
              return;
            }
          }

          if (title && artist && trackData) {
            MusicCache.setSearch(title, artist, trackData);
            console.log("[缓存回写] ✓ 写入搜索缓存");
          }
          if (trackData?.id && trackData?.source) {
            if (audioUrl) {
              MusicCache.setAudio(trackData.id, trackData.source, audioUrl);
              console.log("[缓存回写] ✓ 写入音频缓存");
            }
            if (lyricsContent) {
              MusicCache.setLyrics(
                trackData.id,
                trackData.source,
                lyricsContent,
                tlyricContent || "",
              );
              console.log("[缓存回写] ✓ 写入歌词缓存");
            }
            if (coverUrl) {
              MusicCache.setCover(trackData.id, trackData.source, coverUrl);
              console.log("[缓存回写] ✓ 写入封面缓存");
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
        console.log("[Typing Indicator] 收到扫描聊天记录请求");
        if (!containerId) {
          console.warn(
            "[TypingIndicator] request-chat-scan: containerId 缺失，跳过处理",
          );
          return;
        }
        scanChatForSongs()
          .then((songs) => {
            debugLog(
              `[Typing Indicator] 扫描完成，找到 ${songs.length} 首歌曲`,
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
              toastr.info(t`No BGM tags found in chat history`, "", {
                timeOut: 2000,
              });
            }
          })
          .catch((err) => {
            console.error("[Typing Indicator] 扫描失败:", err);
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
          const pointerEventsValue = isDraggableAndUnlocked ? "auto" : "none";
          indicator.style.pointerEvents = pointerEventsValue;
          const iframe = indicator.querySelector(".theme-iframe");
          if (iframe) iframe.style.pointerEvents = pointerEventsValue;
          indicator.dataset.overlayMode = "1";
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
          const savedData = extension_settings[MODULE].themeData[themeId] || {};
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
            const elementToResize = document.getElementById(containerId);
            if (elementToResize && data && data.width && data.height) {
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
        case "playback-state-changed":
          if (data) {
            const { isPlaying, currentTrack, lyrics } = data;
            if (isPlaying && currentTrack) {
              startListeningSession();
              startStatsUpdateTimer();
            } else if (!isPlaying) {
              settleListeningTime("paused");
              listeningSession.isPlaying = false;
              stopStatsUpdateTimer();
              if (listeningStatsUpdateCallback) {
                listeningStatsUpdateCallback();
              }
            }
            const settings = getSettings();
            if (settings.lyricsEnabled) {
              if (isPlaying && currentTrack) {
                const normalizeArtistForCompare = (a) =>
                  Array.isArray(a) ? a.join(",") : a || "";

                const isNewTrack =
                  !currentPlayerTrack ||
                  currentTrack.name !== currentPlayerTrack?.name ||
                  normalizeArtistForCompare(currentTrack.artist) !==
                    normalizeArtistForCompare(currentPlayerTrack?.artist);

                if (isNewTrack) {
                  if (lyrics && lyrics.length > 0) {
                    currentLyrics = lyrics;
                    currentLyricIndex = -1;
                    const hasAnyTranslation = lyrics.some(
                      (line) =>
                        line.translated && line.translated.trim() !== "",
                    );
                    settings._autoShowTranslation = hasAnyTranslation;

                    showLyricsOverlay();
                    console.log(
                      `[Lyrics] ✓ 收到歌词: ${lyrics.length} 行, 有翻译: ${hasAnyTranslation}`,
                    );
                    refreshLyricsOverlay();
                  } else {
                    currentLyrics = [];
                    settings._autoShowTranslation = false;
                    hideLyricsOverlay();
                  }
                }
              }
            }

            currentPlayerTrack = currentTrack;

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
              .querySelectorAll(".music-bubble-from-regex.is-playing")
              .forEach((el) => {
                const bubbleTitle = el.dataset.title;
                const bubbleArtist = el.dataset.artist;

                const matchesCurrent = fuzzyMatchTrack(
                  bubbleTitle,
                  bubbleArtist,
                  currentTrack,
                );

                if (matchesCurrent) {
                  const progressBar = el.querySelector(".tp-progress-bar");
                  if (progressBar) {
                    progressBar.style.animation = "none";
                    progressBar.style.width = `${progress}%`;
                  }

                  const timeDisplay = el.querySelector(".tp-time");
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
            debugLog("[TypingIndicator] 收到播放失败通知，重新获取音频URL...");
            MusicCache.invalidateAudio(data.id, data.source);
            const sourceMap = {
              Netease: "netease",
              Tencent: "tencent",
              Kuwo: "kuwo",
            };
            const apiSource =
              sourceMap[data.source] || data.source.toLowerCase();

            fetch(
              `/api/plugins/g-player-proxy/song?id=${data.id}&source=${apiSource}`,
            )
              .then((res) => res.json())
              .then((songData) => {
                let newAudioUrl = "";

                if (songData.data) {
                  if (Array.isArray(songData.data)) {
                    newAudioUrl = songData.data[0]?.url || "";
                  } else {
                    newAudioUrl = songData.data.url || "";
                  }
                }

                if (newAudioUrl) {
                  MusicCache.setAudio(data.id, data.source, newAudioUrl);
                }
                const playerIframe = document.querySelector(
                  "#music_player .theme-iframe",
                );
                if (playerIframe && playerIframe.contentWindow) {
                  playerIframe.contentWindow.postMessage(
                    {
                      source: "typing-indicator-host",
                      type: "audio-url-refreshed",
                      data: {
                        audioUrl: newAudioUrl,
                        trackIndex: data.trackIndex,
                      },
                    },
                    "*",
                  );
                }
              })
              .catch((err) => {
                console.error("[TypingIndicator] 重新获取音频URL失败:", err);

                const playerIframe = document.querySelector(
                  "#music_player .theme-iframe",
                );
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
            player.style.transition = "left 0.3s ease, top 0.3s ease";
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
            player.style.transition = "left 0.3s ease, top 0.3s ease";
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
            console.log(
              "[缓存更新] 收到播放器的URL刷新通知:",
              data.id,
              data.source,
            );
            MusicCache.setAudio(data.id, data.source, data.audioUrl);
            console.log("[缓存更新] ✓ 音频URL已更新");
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
      updateAndApplyTheme("generation_start_display");
      showTypingIndicator(type, args, dryRun);
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

  eventSource.on(event_types.MESSAGE_RECEIVED, (messageId) => {
    if (messageId === undefined || messageId === null) return;
    appendNewSongs(messageId).catch((err) =>
      console.error("[TypingIndicator] 追加新歌曲失败:", err),
    );
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
        subtree: true,
        characterData: false,
      });
      console.log("[Typing Indicator Music] MutationObserver 兜底已启动");
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
      if (!settings.persistentMode || settings.dynamicThemesInPersistent) {
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
            console.error("[TypingIndicator] 播放列表构建失败:", err),
          );
        } else {
          showPlayer();
          const waitStart = Date.now();
          await new Promise((resolve) => {
            const checkInterval = setInterval(() => {
              if (isPlayerInitialized || Date.now() - waitStart > 3000) {
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
    lastSentPlaylist = null;
    hideLyricsOverlay();
    setTimeout(() => {
      if (chatId) {
        buildAndSetInitialPlaylist().catch((err) =>
          console.error("[TypingIndicator] 播放列表构建失败:", err),
        );
        const settings = getSettings();
        updateAndApplyTheme("chatChanged_logic");
        requestSettingsRender();
        setTimeout(() => postContextWhenReady("typing_indicator"), 150);
        if (settings.persistentMode) {
          handlePersistentModeUpdate("切换聊天").catch((err) =>
            console.error("[TypingIndicator] persistentModeUpdate 失败:", err),
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
            console.error("[TypingIndicator] persistentModeUpdate 失败:", err),
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
    if (settings.playerEnabled && !document.getElementById("music_player")) {
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
          console.error("[TypingIndicator] fallback 播放列表构建失败:", err),
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
