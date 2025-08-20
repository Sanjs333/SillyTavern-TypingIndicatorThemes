import {
    name1,
    name2,
    eventSource,
    event_types,
    isStreamingEnabled,
    saveSettingsDebounced,
    getThumbnailUrl,
    characters,
    this_chid,
    getRequestHeaders,
} from "../../../../script.js";
import { world_info } from "../../../../scripts/world-info.js";
import { extension_settings } from "../../../extensions.js";
import { power_user } from "../../../power-user.js";
import { selected_group } from "../../../group-chats.js";
import { t } from "../../../i18n.js";
import { user_avatar } from "../../../personas.js";
import { default as libs } from "../../../../lib.js";
import {
    presets as defaultPresets,
    themes as defaultThemes,
} from "./definitions.js";
const { yaml } = libs;

const MODULE = "typing_indicator_themes";
let isIndicatorPersisted = false;
const THEME_STYLE_ID = "typing-indicator-theme-style";

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

async function getBgmPlaylistAsync() {
    console.log("[TypingIndicator] 开始获取BGM播放列表...");

    const BGM_KEY = "@BGM@";

    if (this_chid === undefined || !characters[this_chid]) {
        return null;
    }
    const character = characters[this_chid];

    const findEntryInBook = (bookContent, entryKey) => {
        if (!bookContent || !bookContent.entries) return null;
        const entries = Object.values(bookContent.entries);

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
        let entry = findEntryInBook(character.data?.character_book, BGM_KEY);
        if (entry) {
            console.log(
                `[TypingIndicator] 优先级1: 在内嵌世界书中找到 "${BGM_KEY}" 条目。`
            );
            return parseBgmData(entry.content);
        }

        const worldName = character.data?.extensions?.world;
        if (!worldName) {
            return null;
        }

        const response = await fetch("/api/worldinfo/get", {
            method: "POST",
            headers: getRequestHeaders(),
            body: JSON.stringify({ name: worldName }),
        });

        if (!response.ok) {
            throw new Error(`获取世界书失败，状态码: ${response.status}`);
        }

        const worldBookContent = await response.json();

        entry = findEntryInBook(worldBookContent, BGM_KEY);
        if (entry) {
            console.log(
                `[TypingIndicator] 优先级2: 在外部世界书 "${worldName}" 中找到 "${BGM_KEY}" 条目。`
            );
            return parseBgmData(entry.content);
        }

        console.log(
            `[TypingIndicator] 在所有关联的世界书中都未找到 "${BGM_KEY}" 条目。`
        );
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
            console.warn(
                "[TypingIndicator] BGM数据解析后为空，请检查格式或内容。"
            );
            return null;
        }
    } catch (error) {
        console.error("[TypingIndicator] 解析BGM数据时出错:", error);
        toastr.error("角色的BGM世界书条目格式有误，请检查。", "BGM解析失败");
        return null;
    }
}

function getAvatarUrls() {
    const DEFAULT_CHAR_AVATAR = "img/ai4.png";
    const DEFAULT_USER_AVATAR = "img/user-default.png";

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
                charAvatarUrl = getThumbnailUrl("avatar", avatarFileName);
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
            console.log(
                "[TypingIndicator] 核心变量方案失败，尝试使用 TavernHelper 作为备用..."
            );
            const pathFromHelper =
                window.TavernHelper.getCharAvatarPath("current");
            if (pathFromHelper) {
                charAvatarUrl = pathFromHelper.startsWith("/")
                    ? pathFromHelper
                    : `/${pathFromHelper}`;
                charAvatarFound = true;
            }
        } catch (error) {
            console.warn(
                "[TypingIndicator] 调用 TavernHelper 备用方案失败:",
                error
            );
        }
    }
    try {
        if (user_avatar) {
            userAvatarUrl = getThumbnailUrl("persona", user_avatar, true);
        } else if (
            window.TavernHelper &&
            typeof window.TavernHelper.getUserAvatarPath === "function"
        ) {
            const userPath = window.TavernHelper.getUserAvatarPath();
            if (userPath) {
                userAvatarUrl = userPath;
            }
        }
    } catch (error) {
        console.error("[TypingIndicator] 获取用户头像时出错:", error);
    }

    // 头像调试日志
    // console.log("[TypingIndicator] 最终生成的头像 URLs:", {
    //     char: charAvatarUrl,
    //     user: userAvatarUrl,
    // });

    return {
        char: charAvatarUrl,
        user: userAvatarUrl,
    };
}

function getSettings() {
    const defaultSettings = {
        enabled: true,
        persistentMode: false,
        streaming: false,
        showAnimation: true,
        autoFollowTheme: false,
        devMode: false,
        position: "floating_bottom",
        customPosition: {
            x: 50,
            y: 50,
            locked: false,
        },
        selectedTextPresetId: "cat_default",
        textPresets: defaultPresets,
        selectedThemeId: "default",
        themes: defaultThemes,
    };

    if (!extension_settings[MODULE]) {
        extension_settings[MODULE] = {};
    }
    const settings = extension_settings[MODULE];

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
                const mergedItem = {
                    ...defaultItem,
                    ...userItem,
                };
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
        settings.textPresets
    );

    Object.keys(defaultSettings).forEach((key) => {
        if (
            !["themes", "textPresets"].includes(key) &&
            settings[key] === undefined
        ) {
            settings[key] = structuredClone(defaultSettings[key]);
        }
    });

    return settings;
}

async function createUnifiedIframe(theme, indicatorElement, characterName) {
    const oldIframe = indicatorElement.querySelector(".theme-iframe");
    if (oldIframe) {
        oldIframe.remove();
    }

    if (!theme.useIframe) {
        return null;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "theme-iframe";
    iframe.style.cssText = `border: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: transparent; pointer-events: auto; z-index: 1;`;
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    indicatorElement.appendChild(iframe);

    let playlist = null;
    if (
        theme.name.startsWith("播放器-") ||
        theme.name.startsWith("Player - ")
    ) {
        playlist = await getBgmPlaylistAsync();
    }

    iframe.onload = () => {
        const iframeDoc = iframe.contentDocument;
        if (!iframeDoc) return;

        const userName = name1 || "User";
        const avatarUrls = getAvatarUrls();
        const charName = characterName || "Assistant";

        let processedHTML =
            theme.html || "<div>No HTML content provided.</div>";
        processedHTML = processedHTML
            .replace(/\$\{name2\}/g, charName)
            .replace(/\{\{char\}\}/g, charName)
            .replace(/\{\{user\}\}/g, userName)
            .replace(/\{\{char_avatar_url\}\}/g, avatarUrls.char)
            .replace(/\{\{user_avatar_url\}\}/g, avatarUrls.user)
            .replace(
                /\{\{char_avatar\}\}/g,
                `<img class="typing-indicator-avatar" src="${avatarUrls.char}">`
            )
            .replace(
                /\{\{user_avatar\}\}/g,
                `<img class="typing-indicator-avatar" src="${avatarUrls.user}">`
            );

        const finalJS = `
            (function() {
                window.addEventListener('error', function(e) { console.error('[Theme Error]:', e.error ? e.error.stack : e.message); });
                
                window.themeData = {
                    id: '${jsEscape(theme.id || "preview")}',
                    charName: '${jsEscape(charName)}',
                    userName: '${jsEscape(userName)}',
                    charAvatarUrl: '${jsEscape(avatarUrls.char)}',
                    userAvatarUrl: '${jsEscape(avatarUrls.user)}',
                    playlist: ${JSON.stringify(playlist)}
                };

                const ThemeUtils = {
                    getCharacterName: () => window.themeData.charName,
                    getUserName: () => window.themeData.userName,
                    getCharAvatar: () => window.themeData.charAvatarUrl,
                    getUserAvatar: () => window.themeData.userAvatarUrl,
                    getPlaylist: () => window.themeData.playlist,
                    sendMessage: (type, data, themeId) => {
                        try {
                            const idToSend = themeId || window.themeData.id;
                            window.parent.postMessage({
                                source: 'typing-indicator-theme',
                                type: type,
                                data: data,
                                themeId: idToSend
                            }, '*');
                        } catch (e) {
                            console.warn('Cannot send message to parent:', e);
                        }
                    },
                    $: (selector) => document.querySelector(selector),
                    $$: (selector) => document.querySelectorAll(selector),
                    animate: (callback) => { function loop() { callback(); requestAnimationFrame(loop); } requestAnimationFrame(loop); },
                    random: (min = 0, max = 1) => Math.random() * (max - min) + min,
                    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
                    hsl: (h, s, l) => \`hsl(\${h}, \${s}%, \${l}%)\`,
                    rgba: (r, g, b, a) => \`rgba(\${r}, \${g}, \${b}, \${a})\`,
                };
                window.ThemeUtils = ThemeUtils;

                try {
                    ${theme.iframeJS || "// No JavaScript code"}
                } catch(e) {
                    console.error('[Theme User JS Error]:', e.stack);
                }

                try {
                  ThemeUtils.sendMessage('theme-loaded', { themeId: '${jsEscape(
                      theme.id || "preview"
                  )}', themeName: '${jsEscape(theme.name || "Preview")}' });
                } catch (error) {
                  console.error('[Theme Framework Error]:', error.stack);
                  const errorDiv = document.createElement('div');
                  errorDiv.style.cssText = \`position: fixed; top: 10px; right: 10px; background: #ff4444; color: white; padding: 8px 12px; border-radius: 4px; font-size: 12px; z-index: 9999; max-width: 200px; word-wrap: break-word;\`;
                  errorDiv.textContent = \`主题错误: \${error.message}\`;
                  document.body.appendChild(errorDiv);
                  setTimeout(() => { if (errorDiv.parentNode) { errorDiv.parentNode.removeChild(errorDiv); } }, 3000);
                }
            })();
        `;

        const fullHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Typing Indicator Theme</title>
  <style>
    ${theme.iframeCSS || ""}
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: transparent; overflow: hidden; }
    </style>
</head>
<body>
  ${processedHTML}
  <script>${finalJS.replace(/<\/script>/g, "<\\/script>")}<\/script>
</body>
</html>`;

        iframeDoc.open();
        iframeDoc.write(fullHTML);
        iframeDoc.close();
    };

    iframe.src = "about:blank";

    function jsEscape(str) {
        if (str === null || str === undefined) return "null";
        return String(str)
            .replace(/[\\'"]/g, "\\$&")
            .replace(/\u0000/g, "\\0")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r");
    }

    return iframe;
}

function cleanupUnifiedIframe(indicatorElement) {
    const iframe = indicatorElement.querySelector(".theme-iframe");
    if (iframe) {
        iframe.remove();
    }
}

function applyThemeToIndicator(theme, indicatorElement) {
    if (theme.useIframe) {
        indicatorElement.classList.add("iframe-theme");
        const characterName = name2 || "Assistant";
        setTimeout(() => {
            createUnifiedIframe(theme, indicatorElement, characterName);
        }, 50);
    } else {
        indicatorElement.classList.remove("iframe-theme");
        cleanupUnifiedIframe(indicatorElement);
    }
}

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
        if (theme.css) {
            styleTag.innerHTML = theme.css;
        }
    }
    document.head.appendChild(styleTag);
}

function makeDraggable(element) {
    const settings = getSettings();

    const oldHandle = element.querySelector(".ti-drag-handle");
    if (oldHandle) {
        oldHandle.remove();
    }

    if (settings.customPosition.locked) {
        element.style.cursor = "default";
        return;
    }

    const dragHandle = document.createElement("div");
    dragHandle.className = "ti-drag-handle";
    dragHandle.style.cssText =
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: move; z-index: 99;";
    element.appendChild(dragHandle);

    let initialX, initialY, startX, startY, elementWidth, elementHeight;

    function onDragStart(e) {
        const iframe = element.querySelector("iframe");
        if (iframe) {
            iframe.style.pointerEvents = "none";
        }
        document.body.style.userSelect = "none";

        if (e.cancelable) e.preventDefault();

        element.style.transition = "none";

        const rect = element.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
        elementWidth = rect.width;
        elementHeight = rect.height;

        startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
        startY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);
        document.addEventListener("touchmove", onDragMove, { passive: false });
        document.addEventListener("touchend", onDragEnd);
    }

    function onDragMove(e) {
        const currentX =
            e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const currentY =
            e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

        let deltaX = currentX - startX;
        let deltaY = currentY - startY;
        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        newX = Math.max(0, Math.min(newX, window.innerWidth - elementWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - elementHeight));

        let finalDeltaX = newX - initialX;
        let finalDeltaY = newY - initialY;

        element.style.transform = `translate3d(${finalDeltaX}px, ${finalDeltaY}px, 0)`;
    }

    function onDragEnd(e) {
        const iframe = element.querySelector("iframe");
        if (iframe) {
            iframe.style.pointerEvents = "auto";
        }
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
        settings.customPosition.x = (centerX / window.innerWidth) * 100;
        settings.customPosition.y = (centerY / window.innerHeight) * 100;
        saveSettingsDebounced();
    }

    dragHandle.addEventListener("mousedown", onDragStart);
    dragHandle.addEventListener("touchstart", onDragStart, { passive: false });
}

function showTypingIndicator(type, _args, dryRun) {
    const settings = getSettings();
    const existingIndicator = document.getElementById("typing_indicator");

    if (isIndicatorPersisted && existingIndicator) {
        return;
    }

    if (!isIndicatorPersisted && existingIndicator) {
        hideTypingIndicator();
    }

    if (!isIndicatorPersisted) {
        if (
            !settings.enabled ||
            dryRun ||
            ["quiet", "impersonate"].includes(type)
        )
            return;
        if (!name2 || (!settings.streaming && isStreamingEnabled())) return;
        if (
            document.getElementById("typing_indicator_template") &&
            selected_group &&
            !isStreamingEnabled()
        )
            return;
    }

    const oldIndicator = document.getElementById("typing_indicator");
    if (oldIndicator) {
        cleanupUnifiedIframe(oldIndicator);
        oldIndicator.remove();
    }

    const avatarUrls = getAvatarUrls();
    const userName = name1 || "User";
    const charName = name2 || "Assistant";

    console.log("--- Typing Indicator Display ---");
    console.log(`User: ${userName}, Character: ${charName}`);
    console.log("Final Avatar URLs:", avatarUrls);

    const currentTheme =
        settings.themes.find((t) => t.id === settings.selectedThemeId) ||
        settings.themes[0];
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
            console.warn(
                `TypingIndicator: iframe 主题 "${currentTheme.name}" 不支持 "${settings.position}" 位置。`
            );
            return;
        }
    }

    let typingIndicator = document.createElement("div");
    typingIndicator.id = "typing_indicator";
    typingIndicator.classList.add("typing_indicator");

    if (!currentTheme.useIframe) {
        console.log("--- Typing Indicator Start (CSS Mode) ---");
        console.log(`name1 (user): ${name1}, name2 (char): ${name2}`);
        console.log("Avatar URLs:", avatarUrls);
        console.log(`Final names: user="${userName}", char="${charName}"`);

        const preset =
            settings.textPresets.find(
                (p) => p.id === settings.selectedTextPresetId
            ) || settings.textPresets[0];

        console.log("Initial preset text:", preset.text);
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
                `<img class="typing-indicator-avatar" src="${safeCharAvatarUrl}" onerror="this.onerror=null; this.src='/img/default-char.png';">`
            )
            .replace(
                /\{\{user_avatar\}\}/g,
                `<img class="typing-indicator-avatar" src="${safeUserAvatarUrl}" onerror="this.onerror=null; this.src='/img/default-user.png';">`
            );

        const defsRegex = /<defs>([\s\S]*?)<\/defs>/i;
        const match = baseText.match(defsRegex);
        if (match && match[0]) {
            updateGlobalDefs({ name: "runtime-theme", text: match[0] });
            baseText = baseText.replace(match[0], "");
        }

        console.log("Text after all replaces:", baseText);

        const svgAnimation = `<span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor"><style>.dot-fade-1{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) 0s infinite}.dot-fade-2{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .2s infinite}.dot-fade-3{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .4s infinite}@keyframes smoothFade{0%{opacity:.2}30%{opacity:1}60%{opacity:.4}100%{opacity:.2}}</style><circle class="dot-fade-1" cx="5" cy="8" r="3"/><circle class="dot-fade-2" cx="15" cy="8" r="3"/><circle class="dot-fade-3" cx="25" cy="8" r="3"/></svg></span>`;
        const htmlContent = `${baseText}${
            settings.showAnimation ? svgAnimation : ""
        }`;

        console.log("Final HTML content:", htmlContent);
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
            if (
                memoryTable &&
                getComputedStyle(memoryTable).display !== "none"
            ) {
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
            typingIndicator.style.position = "static";
            break;
    }

    if (parentContainer) {
        if (position === "above_input" || position === "full_width_banner") {
            parentContainer.parentNode.insertBefore(
                typingIndicator,
                parentContainer
            );
        } else {
            parentContainer.appendChild(typingIndicator);
        }
    } else {
        document.body.appendChild(typingIndicator);
        console.warn(
            "TypingIndicator: Parent container not found, appending to body."
        );
    }

    $(typingIndicator).hide();

    const chat = document.getElementById("chat");
    const wasChatScrolledDown =
        Math.ceil(chat.scrollTop + chat.clientHeight) >= chat.scrollHeight;

    $(typingIndicator).show(() => {
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
            makeDraggable(typingIndicator);
        }

        if (position === "bottom" && wasChatScrolledDown) {
            chat.scrollTop = chat.scrollHeight;
        }

        applyThemeToIndicator(currentTheme, typingIndicator);
    });
}

async function updatePersistentIndicatorContent() {
    const indicator = document.getElementById("typing_indicator");
    if (!indicator) {
        return;
    }

    const settings = getSettings();
    const currentTheme =
        settings.themes.find((t) => t.id === settings.selectedThemeId) ||
        settings.themes[0];
    if (currentTheme.useIframe) {
        console.log(
            "[TypingIndicator] 检测到角色切换，正在为 iframe 主题重新加载内容..."
        );
        const charName = name2 || "Assistant";
        cleanupUnifiedIframe(indicator);
        await createUnifiedIframe(currentTheme, indicator, charName);
    }
}

async function hideTypingIndicator() {
    if (isIndicatorPersisted) {
        console.log(
            "[TypingIndicator] Indicator is persisted. Skipping hide triggered by generation events."
        );
        return;
    }

    const typingIndicator = document.getElementById("typing_indicator");
    if (typingIndicator) {
        const iframe = typingIndicator.querySelector(".theme-iframe");

        if (iframe && iframe.contentWindow) {
            const settings = getSettings();
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

                const themeId = settings.selectedThemeId;
                const shutdownTimeout =
                    (typeof themeShutdownTimeouts !== "undefined" &&
                        themeShutdownTimeouts[themeId]) ||
                    200;

                const timeoutPromise = new Promise((resolve) => {
                    setTimeout(
                        () => resolve({ timedOut: true }),
                        shutdownTimeout
                    );
                });

                iframe.contentWindow.postMessage(
                    {
                        source: "typing-indicator-host",
                        type: "graceful-shutdown-request",
                    },
                    "*"
                );

                const result = await Promise.race([
                    themeResponsePromise,
                    timeoutPromise,
                ]);

                if (result.timedOut) {
                    if (shutdownTimeout > 200) {
                        console.warn(
                            `[TypingIndicator] Graceful shutdown for theme "${themeId}" failed: Timed out after ${shutdownTimeout}ms.`
                        );
                    }
                } else {
                    if (isDevMode) {
                        const endTime = performance.now();
                        const duration = endTime - startTime;
                        console.log(
                            `%c[TypingIndicator DevMode]%c Theme "${themeId}" responded in %c${duration.toFixed(
                                2
                            )}ms`,
                            "background: #3498db; color: #fff; padding: 2px 6px; border-radius: 3px;",
                            "background: transparent; color: inherit;",
                            "font-weight: bold;"
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
                            themeDataToSave
                        );
                        saveSettingsDebounced();
                        console.log(
                            `[TypingIndicator] Gracefully saved data for theme ${themeId}:`,
                            themeDataToSave
                        );
                    }
                }
            } catch (error) {
                console.warn(
                    "[TypingIndicator] An unexpected error occurred during graceful shutdown:",
                    error
                );
            } finally {
                if (messageListener) {
                    window.removeEventListener("message", messageListener);
                }
            }
        }

        cleanupUnifiedIframe(typingIndicator);
        $(typingIndicator).hide(() => typingIndicator.remove());
    }
}

function handleMainThemeChange(renderFn) {
    const settings = getSettings();
    if (!settings.autoFollowTheme) {
        return;
    }

    let mainThemeName;
    try {
        mainThemeName = power_user.theme;
    } catch (error) {
        console.warn(
            "[TypingIndicator] Could not read power_user.theme:",
            error
        );
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
            (t) => t.name.startsWith(baseName) && t.useIframe
        );
        if (iframeMatch) return iframeMatch;
        return themes.find((t) => t.name.startsWith(baseName) && !t.useIframe);
    };

    const matchedTheme = findThemeByBaseName(themeBaseName);
    if (matchedTheme && settings.selectedThemeId !== matchedTheme.id) {
        settings.selectedThemeId = matchedTheme.id;
        applyTheme(matchedTheme.id);
        toastr.info(`指示器主题已自动同步为: ${themeBaseName}`);
        switched = true;
    } else if (!matchedTheme) {
        console.warn(
            `[TypingIndicator] No matching indicator theme found for base name "${themeBaseName}".`
        );
    }

    const matchedPreset = settings.textPresets.find((p) =>
        p.name.startsWith(themeBaseName)
    );
    if (matchedPreset && settings.selectedTextPresetId !== matchedPreset.id) {
        settings.selectedTextPresetId = matchedPreset.id;
        switched = true;
    }

    if (switched) {
        if (typeof renderFn === "function") {
            renderFn(true);
        }
        saveSettingsDebounced();
    }
}

function addExtensionSettings() {
    const settings = getSettings();
    const container = document.getElementById("extensions_settings");
    const section = document.createElement("div");
    section.id = "typing_indicator_settings";

    const render = (preserveDrawerState = false) => {
        const drawerToggle = section.querySelector(".inline-drawer-toggle");
        const isDrawerOpen =
            preserveDrawerState &&
            drawerToggle &&
            drawerToggle.classList.contains("open");

        function updatePositionOptions() {
            const settings = getSettings();
            const currentTheme = settings.themes.find(
                (t) => t.id === settings.selectedThemeId
            );
            const positionSelect = section.querySelector("#ti_position");
            if (!positionSelect) return;

            const allOptions = [
                {
                    value: "floating_bottom",
                    text: t`Bottom of Chat (Floating)`,
                },
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
                    supportedPositions.includes(opt.value)
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
                        }>${opt.text}</option>`
                )
                .join("");
        }

        section.innerHTML = `
        <div class="inline-drawer">
    <style>
        #typing_indicator_settings .inline-drawer-content {
            transition: max-height 0.3s ease-in-out;
        }
        #ti_preset_section {
        margin-bottom: 10px;
        }
    </style>
    <div class="inline-drawer"><div class="inline-drawer-toggle inline-drawer-header"><b>${t`Typing Indicator Themes`}</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>
        <div class="inline-drawer-content" style="display: none; flex-direction: column; gap: 15px;">
<div style="display: flex; justify-content: flex-end; align-items: center;">
    <button id="ti_download_guide_btn"
            title="${t`Theme Creation Guide`}"
            style="background: none; border: none; padding: 0; cursor: pointer; color: var(--text-color-secondary); font-size: 0.9em; display: inline-flex; align-items: center; gap: 5px;">
        <i class="fa-solid fa-book-open"></i>
        <span>${t`Theme Creation Guide`}</span>
    </button>
</div>
        <div class="ti-checkbox-container">
            <label class="checkbox_label"><input type="checkbox" id="ti_enabled" ${
                settings.enabled ? "checked" : ""
            }>${t`Enabled`}</label>
                                <label class="checkbox_label">
                        <input type="checkbox" id="ti_persistent_mode" ${
                            settings.persistentMode ? "checked" : ""
                        }>
                        ${t`Persistent Mode`}
                    </label>
            <label class="checkbox_label"><input type="checkbox" id="ti_streaming" ${
                settings.streaming ? "checked" : ""
            }>${t`Show if streaming`}</label>
            <label class="checkbox_label"><input type="checkbox" id="ti_show_animation" ${
                settings.showAnimation ? "checked" : ""
            }>${t`Show typing animation`}</label>
            <label class="checkbox_label">
                <input type="checkbox" id="ti_auto_follow_theme" ${
                    settings.autoFollowTheme ? "checked" : ""
                }>
                ${t`Auto-sync with Main UI Theme`}
            </label>
            <label class="checkbox_label" style="color: var(--text-color-secondary);">
                <input type="checkbox" id="ti_dev_mode" ${
                    settings.devMode ? "checked" : ""
                }>
                ${t`Developer: Log theme performance`}
            </label>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
    <label for="ti_position" style="white-space: nowrap;">${t`Indicator Position`}:</label>
    <select id="ti_position" class="text_pole" style="flex-grow: 1;"></select>
</div>
            <div id="ti_draggable_controls" style="display: ${
                settings.position === "draggable" ? "flex" : "none"
            }; flex-direction: column; align-items: stretch; gap: 8px; margin-top: 5px; padding: 8px 12px; background: var(--background-color-secondary); border-radius: 8px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <label class="checkbox_label" style="margin-bottom: 0;"><input type="checkbox" id="ti_position_locked" ${
            settings.customPosition.locked ? "checked" : ""
        }>${t`Lock Position`}</label>
        <div style="display: flex; gap: 5px;">
            <button id="ti_reset_position" class="menu_button fa-solid fa-undo" title="${t`Reset Position`}"></button>
            <button id="ti_test_draggable" class="menu_button fa-solid fa-crosshairs" title="${t`Test Dragging`}"></button>
        </div>
    </div>
    <small style="color: var(--text-color-secondary); font-size: 0.85em; text-align: left;">${t`Lock to enable interaction within the theme.`}</small>
</div>
        </div>
        <div id="ti_preset_section">
            <h4>${t`Indicator Text Presets`}</h4><p>${t`Select a preset to edit or switch.`}</p>
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
                <select id="ti_preset_select" class="text_pole" style="flex-grow: 1;"></select>
                <button id="ti_preset_add" class="menu_button fa-solid fa-plus" title="${t`Add New Preset`}"></button>
                <button id="ti_preset_rename" class="menu_button fa-solid fa-pencil" title="${t`Rename Preset`}"></button>
                <button id="ti_preset_del" class="menu_button fa-solid fa-trash-can" title="${t`Delete Preset`}"></button>
                <button id="ti_preset_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
                <button id="ti_preset_import" class="menu_button fa-solid fa-file-import" title="${t`Import`}"></button>
                <button id="ti_preset_export" class="menu_button fa-solid fa-file-export" title="${t`Export`}"></button>
            </div>
            <textarea id="ti_preset_text" class="text_pole" rows="5"></textarea>
        </div>
        <div>
            <h4>${t`Indicator Style Themes`}</h4><p>${t`Select a theme to edit or switch.`}</p>
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 10px;">
                <select id="ti_theme_select" class="text_pole" style="flex-grow: 1;"></select>
                <button id="ti_theme_add" class="menu_button fa-solid fa-plus" title="${t`Add New Theme`}"></button>
                <button id="ti_theme_rename" class="menu_button fa-solid fa-pencil" title="${t`Rename Theme`}"></button>
                <button id="ti_theme_del" class="menu_button fa-solid fa-trash-can" title="${t`Delete Theme`}"></button>
                <button id="ti_theme_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
                <button id="ti_theme_import" class="menu_button fa-solid fa-file-import" title="${t`Import`}"></button>
                <button id="ti_theme_export" class="menu_button fa-solid fa-file-export" title="${t`Export`}"></button>
            </div>
            <div style="margin-bottom: 15px; padding: 10px; background: var(--background-color-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                <label style="font-weight: bold; margin-bottom: 8px; display: block;">${t`Theme Mode`}:</label>
                <div style="display: flex; gap: 15px;">
                    <label class="checkbox_label"><input type="radio" name="theme_mode" value="css" id="theme_mode_css"> ${t`Legacy CSS Mode`}</label>
                    <label class="checkbox_label"><input type="radio" name="theme_mode" value="iframe" id="theme_mode_iframe"> ${t`Full iframe Mode (HTML+CSS+JS)`}</label>
                </div>
                <small style="color: var(--text-color-secondary); display: block; margin-top: 5px;">${t`iframe mode allows complex HTML and JS, offering more flexibility.`}</small>
            </div>
            <div id="css_editor_container">
                <label for="ti_theme_css" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`CSS Style`}:</label>
                <textarea id="ti_theme_css" class="text_pole" rows="10" placeholder="${t`CSS styles that apply directly to the .typing_indicator element.`}"></textarea>
            </div>
            <div id="iframe_editor_container" style="display: none;">
                <div style="margin-bottom: 15px;"><label for="ti_theme_html" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`HTML Structure (for iframe)`}:</label><textarea id="ti_theme_html" class="text_pole" rows="8" placeholder="${t`HTML structure, supports {{char}} variable.`}"></textarea></div>
                <div style="margin-bottom: 15px;"><label for="ti_theme_iframe_css" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`CSS Style (for iframe)`}:</label><textarea id="ti_theme_iframe_css" class="text_pole" rows="12" placeholder="${t`Full CSS styles, effective inside the iframe.`}"></textarea></div>
                <div style="margin-bottom: 15px;"><label for="ti_theme_iframe_js" style="font-weight: bold; margin-bottom: 5px; display: block;">${t`JavaScript Code (for iframe)`}:</label><textarea id="ti_theme_iframe_js" class="text_pole" rows="15" placeholder="${t`JavaScript code to manipulate DOM elements inside the iframe.`}"></textarea><small style="color: var(--text-color-secondary); display: block; margin-top: 5px;">${t`Hint: Use window.parent.name2 or ThemeUtils.getCharacterName() in JS to get the character name.`}</small></div>
                <div id="ti_sizes_container" style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <label for="ti_theme_iframe_sizes" style="font-weight: bold; display: block;">${t`Sizes (JSON format)`}</label>
                        <button id="ti_format_iframe_sizes" class="menu_button fa-solid fa-code" title="${t`Format JSON`}"></button>
                    </div>
                    <textarea id="ti_theme_iframe_sizes" class="text_pole" rows="8" 
    placeholder='在这里为你的iframe主题配置可用位置及其尺寸。
如果留空，将仅支持默认的三个浮动位置并使用默认尺寸。

格式为 JSON。iframe主题仅推荐支持以下3个位置：
- "floating_bottom": 浮动于聊天区底部
- "chat_center":     聊天区域居中
- "draggable":       可自定义拖拽

示例 (请确保JSON格式正确):
{
  "floating_bottom": { "width": "90vw", "maxWidth": "320px", "height": "110px" },
  "chat_center": { "width": "90vw", "maxWidth": "350px", "height": "120px" },
  "draggable": { "width": "90vw", "maxWidth": "320px", "height": "110px" }
}

请在此处写下你主题支持的位置及尺寸。
点击 </> 按钮可一键填充包含上述模板或格式化已有内容。'></textarea>
                    <div id="ti_theme_iframe_sizes_error" style="color: var(--color-error); font-size: 0.85em; margin-top: 5px; min-height: 1.2em;"></div>
                    <small style="color: var(--text-color-secondary); display: block; margin-top: 5px;">为不同位置设置宽高。如果留空，将使用默认尺寸和位置。</small>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: var(--background-color-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <label style="font-weight: bold;">${t`Live Preview`}:</label>
                    <button id="preview_theme" class="menu_button fa-solid fa-eye" title="${t`Preview Effect`}" style="padding: 5px 8px;"></button>
                </div>
                <div id="theme_preview_area" style="min-height: 150px; background: var(--background-color); border-radius: 6px; padding: 15px; position: relative; display: flex; justify-content: center; align-items: center; overflow: auto; resize: vertical; z-index: 10;">
                    <div style="color: var(--text-color-secondary); text-align: center; padding: 20px;">${t`Click the Preview button to see the effect.`}</div>
                </div>
            </div>
        </div>
    </div></div>
`;
        container.appendChild(section);

        const tiPresetSelect = section.querySelector("#ti_preset_select");
        const tiThemeSelect = section.querySelector("#ti_theme_select");
        const tiPresetText = section.querySelector("#ti_preset_text");
        const newDrawerToggle = section.querySelector(".inline-drawer-toggle");
        const sizesTextarea = section.querySelector("#ti_theme_iframe_sizes");
        const sizesErrorDiv = section.querySelector(
            "#ti_theme_iframe_sizes_error"
        );
        const formatSizesButton = section.querySelector(
            "#ti_format_iframe_sizes"
        );
        const sizesContainer = section.querySelector("#ti_sizes_container");

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
            2
        );

        function validateSizesJson() {
            const text = sizesTextarea.value.trim();
            if (!text) {
                sizesErrorDiv.textContent = "";
                return true;
            }
            try {
                JSON.parse(text);
                sizesErrorDiv.textContent = "";
                return true;
            } catch (e) {
                sizesErrorDiv.textContent = `JSON格式错误: ${e.message}`;
                return false;
            }
        }

        function formatSizesJson() {
            const text = sizesTextarea.value.trim();

            if (!text) {
                sizesTextarea.value = defaultSizesJsonString;
                validateSizesJson();
                toastr.success("已填充默认尺寸示例。", "", { timeOut: 1000 });
                return;
            }
            try {
                const parsed = JSON.parse(text);
                sizesTextarea.value = JSON.stringify(parsed, null, 2);
                validateSizesJson();
                toastr.success("JSON已格式化。", "", { timeOut: 1000 });
            } catch (e) {
                validateSizesJson();
                toastr.error("JSON格式错误，无法格式化！", "", {
                    timeOut: 2000,
                });
            }
        }

        function updateEditorMode(theme) {
            const cssContainer = section.querySelector("#css_editor_container");
            const iframeContainer = section.querySelector(
                "#iframe_editor_container"
            );
            const cssRadio = section.querySelector("#theme_mode_css");
            const iframeRadio = section.querySelector("#theme_mode_iframe");
            const cssTextarea = section.querySelector("#ti_theme_css");
            const htmlTextarea = section.querySelector("#ti_theme_html");
            const iframeCssTextarea = section.querySelector(
                "#ti_theme_iframe_css"
            );
            const iframeJsTextarea = section.querySelector(
                "#ti_theme_iframe_js"
            );
            const presetSection = section.querySelector("#ti_preset_section");
            const sizesContainer = section.querySelector("#ti_sizes_container");
            const sizesTextarea = section.querySelector(
                "#ti_theme_iframe_sizes"
            );

            if (theme.useIframe) {
                iframeRadio.checked = true;
                cssContainer.style.display = "none";
                iframeContainer.style.display = "block";
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

            const drawerContent = section.querySelector(
                ".inline-drawer-content"
            );

            if (drawerContent && drawerContent.style.display !== "none") {
                setTimeout(() => {
                    drawerContent.style.maxHeight =
                        drawerContent.scrollHeight + "px";
                }, 50);
            }
        }

        const populatePresets = () => {
            const settings = getSettings();
            const currentId = settings.selectedTextPresetId;
            const tiPresetSelect = section.querySelector("#ti_preset_select");
            const tiPresetText = section.querySelector("#ti_preset_text");

            tiPresetSelect.innerHTML = settings.textPresets
                .map(
                    (p) =>
                        `<option value="${p.id}" data-is-builtin="${
                            p.isBuiltIn || false
                        }" ${p.id === currentId ? "selected" : ""}>${
                            p.name
                        }</option>`
                )
                .join("");

            const selectedPreset =
                settings.textPresets.find((p) => p.id === currentId) ||
                settings.textPresets[0];

            tiPresetText.value = selectedPreset.text;

            if (settings.selectedTextPresetId !== selectedPreset.id) {
                settings.selectedTextPresetId = selectedPreset.id;
            }
        };

        function updateRenameButtonState() {
            const presetRenameBtn = section.querySelector("#ti_preset_rename");
            const tiPresetSelect = section.querySelector("#ti_preset_select");
            const selectedPresetOption =
                tiPresetSelect.options[tiPresetSelect.selectedIndex];
            const isPresetBuiltIn =
                selectedPresetOption &&
                selectedPresetOption.dataset.isBuiltin === "true";

            presetRenameBtn.disabled = false;
            presetRenameBtn.title = t`Rename Preset`;

            const themeRenameBtn = section.querySelector("#ti_theme_rename");
            const tiThemeSelect = section.querySelector("#ti_theme_select");
            const selectedThemeOption =
                tiThemeSelect.options[tiThemeSelect.selectedIndex];
            const isThemeBuiltIn =
                selectedThemeOption &&
                selectedThemeOption.dataset.isbuiltin === "true";

            themeRenameBtn.disabled = false;
            themeRenameBtn.title = t`Rename Theme`;
        }

        const populateThemes = () => {
            const settings = getSettings();
            const currentId = settings.selectedThemeId;
            const tiThemeSelect = section.querySelector("#ti_theme_select");

            tiThemeSelect.innerHTML = settings.themes
                .map((theme) => {
                    const modeIndicator = theme.useIframe
                        ? " [iframe]"
                        : " [CSS]";
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

            updateEditorMode(selectedTheme);

            if (settings.selectedThemeId !== selectedTheme.id) {
                settings.selectedThemeId = selectedTheme.id;
            }
        };

        function addModeChangeListeners() {
            const cssRadio = document.getElementById("theme_mode_css");
            const iframeRadio = document.getElementById("theme_mode_iframe");
            function handleModeChange() {
                const currentTheme = settings.themes.find(
                    (t) => t.id === settings.selectedThemeId
                );
                if (!currentTheme) return;
                currentTheme.useIframe = iframeRadio.checked;
                updateEditorMode(currentTheme);
                populateThemes();
                updatePositionOptions();
            }
            cssRadio.addEventListener("change", handleModeChange);
            iframeRadio.addEventListener("change", handleModeChange);
        }

        populatePresets();
        populateThemes();
        updatePositionOptions();
        addModeChangeListeners();
        updateRenameButtonState();

        sizesTextarea.addEventListener("input", validateSizesJson);
        formatSizesButton.addEventListener("click", formatSizesJson);

        if (isDrawerOpen) {
            newDrawerToggle.classList.add("open");
            section.querySelector(".inline-drawer-content").style.display =
                "flex";
        }

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
                saveSettingsDebounced();
            });

        tiPresetSelect.addEventListener("change", () => {
            settings.selectedTextPresetId = tiPresetSelect.value;
            populatePresets();
            saveSettingsDebounced();
            updateRenameButtonState();

            const suggestionContainerId = "theme-suggestion-container";
            $(`#${suggestionContainerId}`).remove();

            const selectedPreset = settings.textPresets.find(
                (p) => p.id === settings.selectedTextPresetId
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
                    `<div id="${suggestionContainerId}" style="padding: 10px; margin: 10px 0; background: var(--background-color-tertiary); border: 1px solid var(--border-color); border-radius: 8px; text-align: center;"></div>`
                );
                const message = `💡${t`Found a matching theme`}: "<b>${
                    recommendedTheme.name
                }</b>". `;
                const applyLink = $(
                    `<a href="#" style="margin-left: 10px; font-weight: bold;">[${t`Apply`}]</a>`
                );

                applyLink.on("click", (e) => {
                    e.preventDefault();
                    settings.selectedThemeId = recommendedTheme.id;
                    populateThemes();
                    applyTheme(recommendedTheme.id);
                    saveSettingsDebounced();
                    suggestionContainer.remove();
                });

                suggestionContainer.html(message).append(applyLink);
                $("#ti_theme_select")
                    .closest(".inline-drawer-content > div > div")
                    .after(suggestionContainer);
            }
        });

        section
            .querySelector("#ti_preset_save")
            .addEventListener("click", () => {
                const p = settings.textPresets.find(
                    (p) => p.id === tiPresetSelect.value
                );
                if (p) {
                    p.text = tiPresetText.value;
                    saveSettingsDebounced();
                    toastr.success(
                        t`Preset "{{presetName}}" saved.`.replace(
                            "{{presetName}}",
                            p.name
                        )
                    );
                }
            });

        section
            .querySelector("#ti_preset_add")
            .addEventListener("click", () => {
                const n = prompt(t`Preset Name`);
                if (n) {
                    const p = {
                        id: Date.now().toString(),
                        name: n,
                        text: `...✧{{char}}回复中...`,
                    };
                    settings.textPresets.push(p);
                    settings.selectedTextPresetId = p.id;
                    populatePresets();
                    saveSettingsDebounced();
                }
            });

        section
            .querySelector("#ti_preset_rename")
            .addEventListener("click", () => {
                const preset = settings.textPresets.find(
                    (p) => p.id === settings.selectedTextPresetId
                );
                if (!preset) return;

                const newName = prompt(
                    t`Enter new name for preset:`,
                    preset.name
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
                if (settings.textPresets.length <= 1) {
                    toastr.warning(t`Cannot delete the last preset.`);
                    return;
                }
                const p = settings.textPresets.find(
                    (p) => p.id === tiPresetSelect.value
                );
                if (confirm(`你确定要删除方案 "${p?.name}" 吗？`)) {
                    settings.textPresets = settings.textPresets.filter(
                        (pr) => pr.id !== p.id
                    );
                    settings.selectedTextPresetId = settings.textPresets[0].id;
                    populatePresets();
                    saveSettingsDebounced();
                }
            });

        tiThemeSelect.addEventListener("change", () => {
            const settings = getSettings();
            settings.selectedThemeId = tiThemeSelect.value;

            const selectedTheme = settings.themes.find(
                (t) => t.id === settings.selectedThemeId
            );
            if (selectedTheme) {
                updateGlobalDefs(selectedTheme);
            }

            updatePositionOptions();
            populateThemes();
            applyTheme(settings.selectedThemeId);
            saveSettingsDebounced();
            updateRenameButtonState();

            if (getSettings().persistentMode) {
                console.log(
                    "[TypingIndicator] Retheming persistent indicator..."
                );
                isIndicatorPersisted = false;
                $("#typing_indicator").fadeOut(50, function () {
                    $(this).remove();
                    isIndicatorPersisted = true;
                    showTypingIndicator("persistent-retheme");
                });
            }

            const suggestionContainerId = "preset-suggestion-container";
            $(`#${suggestionContainerId}`).remove();
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
                    (p) => p.name === baseName
                );

                if (
                    recommendedPreset &&
                    settings.selectedTextPresetId !== recommendedPreset.id
                ) {
                    const suggestionContainer = $(
                        `<div id="${suggestionContainerId}" style="padding: 10px; margin: 10px 0; background: var(--background-color-tertiary); border: 1px solid var(--border-color); border-radius: 8px; text-align: center;"></div>`
                    );
                    const message = `💡检测到配套的预设方案: "<b>${recommendedPreset.name}</b>"。`;

                    const applyLink = $(
                        `<a href="#" style="margin-left: 10px; font-weight: bold;">[${t`Apply`}]</a>`
                    );

                    applyLink.on("click", (e) => {
                        e.preventDefault();
                        settings.selectedTextPresetId = recommendedPreset.id;
                        populatePresets();
                        saveSettingsDebounced();
                        suggestionContainer.remove();
                        toastr.success(
                            `已应用内容方案: "${recommendedPreset.name}"`
                        );
                    });
                    suggestionContainer.html(message).append(applyLink);
                    $("#ti_preset_section").prepend(suggestionContainer);
                }
            }
        });

        section
            .querySelector("#ti_theme_save")
            .addEventListener("click", () => {
                const settings = getSettings();
                const themeToSave = settings.themes.find(
                    (theme) => theme.id === tiThemeSelect.value
                );
                if (!themeToSave) return;
                const isModeIframe =
                    section.querySelector("#theme_mode_iframe").checked;
                themeToSave.useIframe = isModeIframe;

                if (isModeIframe) {
                    if (!validateSizesJson()) {
                        toastr.error(
                            "尺寸配置 (Sizes) 的JSON格式有误，请修正！",
                            "保存失败"
                        );
                        return;
                    }
                    themeToSave.html =
                        section.querySelector("#ti_theme_html").value;
                    themeToSave.iframeCSS = section.querySelector(
                        "#ti_theme_iframe_css"
                    ).value;
                    themeToSave.iframeJS = section.querySelector(
                        "#ti_theme_iframe_js"
                    ).value;

                    const sizesText = sizesTextarea.value.trim();
                    if (sizesText) {
                        try {
                            themeToSave.sizes = JSON.parse(sizesText);
                        } catch (e) {
                            toastr.error(
                                "无法解析尺寸配置，请检查格式。",
                                "保存失败"
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

                updateGlobalDefs(themeToSave);

                applyTheme(themeToSave.id);
                saveSettingsDebounced();
                populateThemes();
                toastr.success(
                    t`Theme "{{themeName}}" saved.`.replace(
                        "{{themeName}}",
                        themeToSave.name
                    )
                );
                if (isIndicatorPersisted) {
                    console.log(
                        "[TypingIndicator] Theme saved, refreshing persistent indicator..."
                    );
                    const indicator =
                        document.getElementById("typing_indicator");
                    if (indicator) {
                        $(indicator).fadeOut(150, function () {
                            cleanupUnifiedIframe(this);
                            $(this).remove();
                            showTypingIndicator("persistent-retheme");
                            console.log(
                                "[TypingIndicator] Persistent indicator refreshed with new theme."
                            );
                        });
                    }
                }
            });

        section.querySelector("#ti_theme_add").addEventListener("click", () => {
            const n = prompt(t`Theme Name`);
            if (n) {
                const newTheme = {
                    id: Date.now().toString(),
                    name: n,
                    useIframe: false,
                    css: `.typing_indicator {\n\n}`,
                };
                settings.themes.push(newTheme);
                settings.selectedThemeId = newTheme.id;
                populateThemes();
                applyTheme(newTheme.id);
                saveSettingsDebounced();
            }
        });

        section
            .querySelector("#ti_theme_rename")
            .addEventListener("click", () => {
                const theme = settings.themes.find(
                    (t) => t.id === settings.selectedThemeId
                );
                if (!theme) return;

                const newName = prompt(
                    t`Enter new name for theme:`,
                    theme.name
                );
                if (newName && newName.trim() !== "") {
                    theme.name = newName.trim();
                    populateThemes();
                    saveSettingsDebounced();
                    toastr.success(t`Theme renamed successfully!`);
                }
            });

        section.querySelector("#ti_theme_del").addEventListener("click", () => {
            if (tiThemeSelect.value === "default") {
                toastr.error(t`The default theme cannot be deleted.`);
                return;
            }
            const themeToDelete = settings.themes.find(
                (theme) => theme.id === tiThemeSelect.value
            );
            if (confirm(`你确定要删除主题 "${themeToDelete?.name}" 吗？`)) {
                settings.themes = settings.themes.filter(
                    (th) => th.id !== themeToDelete.id
                );
                settings.selectedThemeId = "default";
                populateThemes();
                applyTheme("default");
                saveSettingsDebounced();
            }
        });

        section
            .querySelector("#preview_theme")
            .addEventListener("click", () => {
                const previewArea =
                    document.getElementById("theme_preview_area");
                const settings = getSettings();
                const tiThemeSelect = section.querySelector("#ti_theme_select");
                const currentThemeId = tiThemeSelect.value;

                const previewTheme = {
                    id: `preview-${currentThemeId}`,
                    name: "Preview Theme",
                    useIframe:
                        document.getElementById("theme_mode_iframe").checked,
                };

                if (previewTheme.useIframe) {
                    previewTheme.html =
                        document.getElementById("ti_theme_html").value;
                    previewTheme.iframeCSS = document.getElementById(
                        "ti_theme_iframe_css"
                    ).value;
                    previewTheme.iframeJS =
                        document.getElementById("ti_theme_iframe_js").value;
                    const sizesText = document
                        .getElementById("ti_theme_iframe_sizes")
                        .value.trim();
                    if (sizesText) {
                        try {
                            previewTheme.sizes = JSON.parse(sizesText);
                        } catch (e) {
                            console.warn(
                                "Preview sizes JSON is invalid, using defaults."
                            );
                            toastr.error("预览尺寸JSON格式无效！");
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

                const previewCharName = name2 || "Assistant";
                const previewUserName = name1 || "User";
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

                    createUnifiedIframe(
                        previewTheme,
                        previewIndicator,
                        previewCharName
                    );
                } else {
                    previewArea.appendChild(previewIndicator);
                    previewIndicator.style.margin = "0 auto";

                    const tiPresetSelect =
                        section.querySelector("#ti_preset_select");
                    const textPreset =
                        settings.textPresets.find(
                            (p) => p.id === tiPresetSelect.value
                        ) || settings.textPresets[0];

                    let htmlContent = (
                        textPreset.text || "{{char}} is typing..."
                    )
                        .replace(/\$\{name2\}/g, previewCharName)
                        .replace(/\{\{char\}\}/g, previewCharName)
                        .replace(/\{\{user\}\}/g, previewUserName)
                        .replace(
                            /\{\{char_avatar_url\}\}/g,
                            previewAvatarUrls.char
                        )
                        .replace(
                            /\{\{user_avatar_url\}\}/g,
                            previewAvatarUrls.user
                        )
                        .replace(
                            /\{\{char_avatar\}\}/g,
                            `<img class="typing-indicator-avatar" src="${previewAvatarUrls.char}">`
                        )
                        .replace(
                            /\{\{user_avatar\}\}/g,
                            `<img class="typing-indicator-avatar" src="${previewAvatarUrls.user}">`
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
                        "#theme_preview_area .typing_indicator"
                    );
                    previewStyle.innerHTML = scopedCss;
                    document.head.appendChild(previewStyle);
                }
                setTimeout(() => {
                    const drawerContent = section.querySelector(
                        ".inline-drawer-content"
                    );
                    if (
                        drawerContent &&
                        drawerContent.style.display !== "none"
                    ) {
                        drawerContent.style.maxHeight =
                            drawerContent.scrollHeight + "px";
                    }
                }, 100);
            });

        const createImportHandler = (type, list, populateFn, onImported) => {
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
                            throw new Error(`Invalid ${type} format.`);

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
                        } else {
                            newItem.text = imported.text;
                        }
                        const existingIndex = list.findIndex(
                            (item) => item.id === newItem.id
                        );
                        if (existingIndex !== -1) {
                            list[existingIndex] = newItem;
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
                                : t`Preset "${newItem.name}" imported.`
                        );
                    } catch (error) {
                        toastr.error(
                            type === "theme"
                                ? t`Failed to import theme: ${error.message}`
                                : t`Failed to import preset: ${error.message}`
                        );
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        };

        section
            .querySelector("#ti_preset_import")
            .addEventListener("click", () =>
                createImportHandler(
                    "preset",
                    settings.textPresets,
                    populatePresets,
                    (id) => (settings.selectedTextPresetId = id)
                )
            );
        section
            .querySelector("#ti_theme_import")
            .addEventListener("click", () =>
                createImportHandler(
                    "theme",
                    settings.themes,
                    populateThemes,
                    (id) => {
                        settings.selectedThemeId = id;
                        applyTheme(id);
                    }
                )
            );

        const createExportHandler = (type, list, selectedId) => {
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
        };

        section
            .querySelector("#ti_preset_export")
            .addEventListener("click", () =>
                createExportHandler(
                    "preset",
                    settings.textPresets,
                    settings.selectedTextPresetId
                )
            );
        section
            .querySelector("#ti_theme_export")
            .addEventListener("click", () =>
                createExportHandler(
                    "theme",
                    settings.themes,
                    settings.selectedThemeId
                )
            );

        const positionSelect = section.querySelector("#ti_position");
        const draggableControls = section.querySelector(
            "#ti_draggable_controls"
        );
        const lockCheckbox = section.querySelector("#ti_position_locked");
        const resetButton = section.querySelector("#ti_reset_position");
        const testButton = section.querySelector("#ti_test_draggable");

        positionSelect.addEventListener("change", (e) => {
            settings.position = e.target.value;
            draggableControls.style.display =
                settings.position === "draggable" ? "flex" : "none";
            saveSettingsDebounced();
        });

        lockCheckbox.addEventListener("change", (e) => {
            settings.customPosition.locked = e.target.checked;
            saveSettingsDebounced();

            const indicator = document.getElementById("typing_indicator");
            if (indicator && settings.position === "draggable") {
                const oldHandle = indicator.querySelector(
                    'div[style*="cursor: move"]'
                );
                if (oldHandle) oldHandle.remove();

                if (!settings.customPosition.locked) {
                    makeDraggable(indicator);
                } else {
                    indicator.style.cursor = "default";
                }
            }
        });

        resetButton.addEventListener("click", () => {
            settings.customPosition.x = 50;
            settings.customPosition.y = 50;
            settings.customPosition.locked = false;

            lockCheckbox.checked = false;
            toastr.success(t`Position has been reset.`, "", { timeOut: 500 });

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
                    }
                }, 300);

                const oldHandle = indicator.querySelector(
                    'div[style*="cursor: move"]'
                );
                if (oldHandle) oldHandle.remove();

                makeDraggable(indicator);
                toastr.info(t`Draggable state refreshed.`, "", {
                    timeOut: 1000,
                });
            }
        });

        testButton.addEventListener("click", () => {
            const indicator = document.getElementById("typing_indicator");
            if (indicator) {
                isIndicatorPersisted = false;
                hideTypingIndicator();
                testButton.classList.remove("fa-solid", "fa-eye-slash");
                testButton.classList.add("fa-solid", "fa-crosshairs");
                testButton.title = t`Test Dragging`;
            } else {
                showTypingIndicator("test");
                testButton.classList.remove("fa-solid", "fa-crosshairs");
                testButton.classList.add("fa-solid", "fa-eye-slash");
                testButton.title = t`Hide Test Indicator`;
            }
        });

        section
            .querySelector("#ti_dev_mode")
            .addEventListener("change", (e) => {
                const settings = getSettings();
                settings.devMode = e.target.checked;
                saveSettingsDebounced();
                if (e.target.checked) {
                    toastr.info(
                        "主题性能日志已开启。请在浏览器开发者工具(F12)的控制台中查看。",
                        "开发者模式",
                        { timeOut: 3000 }
                    );
                }
            });

        const persistentModeCheckbox = section.querySelector(
            "#ti_persistent_mode"
        );

        persistentModeCheckbox.addEventListener("change", (e) => {
            const settings = getSettings();
            settings.persistentMode = e.target.checked;
            saveSettingsDebounced();

            if (settings.persistentMode) {
                isIndicatorPersisted = true;
                showTypingIndicator("persistent-start");

                testButton.disabled = true;
                testButton.title = t`Unavailable in Persistent Mode`;
            } else {
                isIndicatorPersisted = false;
                const indicator = document.getElementById("typing_indicator");
                if (indicator) {
                    cleanupUnifiedIframe(indicator);
                    $(indicator).hide(() => indicator.remove());
                }

                testButton.disabled = false;
                testButton.title = t`Test Dragging`;
            }
        });
        if (getSettings().persistentMode) {
            testButton.disabled = true;
            testButton.title = t`Unavailable in Persistent Mode`;
        } else {
            testButton.disabled = false;
            testButton.title = t`Test Dragging`;
        }
        const downloadGuideButton = section.querySelector(
            "#ti_download_guide_btn"
        );
        if (downloadGuideButton) {
            downloadGuideButton.addEventListener("click", async () => {
                try {
                    const scriptUrl = new URL(import.meta.url);
                    const extensionPath = scriptUrl.pathname.substring(
                        0,
                        scriptUrl.pathname.lastIndexOf("/") + 1
                    );
                    const guideFilePath = `${extensionPath}theme_guide.md`;
                    const response = await fetch(guideFilePath);
                    if (!response.ok) {
                        throw new Error(
                            `文件未找到 (状态码: ${response.status})`
                        );
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
                        "下载创作指南失败，请确保 'theme_guide.md' 文件在扩展根目录中。"
                    );
                }
            });
        }
    };
    render();
    return render;
}

(function () {
    const themeShutdownTimeouts = {};

    window.addEventListener("message", (event) => {
        if (
            event.source &&
            event.data &&
            event.data.source === "typing-indicator-theme"
        ) {
            const { type, data, themeId } = event.data;

            if (type === "set-shutdown-timeout" && themeId) {
                const duration = parseInt(data.duration, 10);
                if (duration > 200 && duration <= 5000) {
                    themeShutdownTimeouts[themeId] = duration;
                    console.log(
                        `[TypingIndicator] Theme "${themeId}" requested a custom shutdown timeout of ${duration}ms.`
                    );
                }
                return;
            }

            if (!themeId || themeId === "preview") return;

            if (!extension_settings[MODULE].themeData) {
                extension_settings[MODULE].themeData = {};
            }
            if (!extension_settings[MODULE].themeData[themeId]) {
                extension_settings[MODULE].themeData[themeId] = {};
            }

            switch (type) {
                case "request-data": {
                    const savedData =
                        extension_settings[MODULE].themeData[themeId] || {};
                    if (event.source) {
                        event.source.postMessage(
                            {
                                source: "typing-indicator-host",
                                type: "data-response",
                                data: savedData,
                            },
                            event.origin
                        );
                    } else {
                        console.warn(
                            "[TypingIndicator] Could not respond to request-data: event.source is null."
                        );
                    }
                    break;
                }
                case "save-data": {
                    extension_settings[MODULE].themeData[themeId] = data;
                    saveSettingsDebounced();
                    break;
                }
                case "resize-iframe": {
                    const indicator =
                        document.getElementById("typing_indicator");
                    if (indicator && data && data.width && data.height) {
                        indicator.style.transition =
                            "width 0.4s cubic-bezier(0.25, 1, 0.5, 1), height 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
                        indicator.style.width = data.width;
                        indicator.style.height = data.height;
                    }
                    break;
                }
            }
        }
    });

    setupGlobalSvgDefs();
    updateGlobalDefs();

    const showIndicatorEvents = [event_types.GENERATION_AFTER_COMMANDS];
    const hideIndicatorEvents = [
        event_types.GENERATION_STOPPED,
        event_types.GENERATION_ENDED,
    ];

    showIndicatorEvents.forEach((e) =>
        eventSource.on(e, (type, args, dryRun) => {
            if (!getSettings().persistentMode) {
                showTypingIndicator(type, args, dryRun);
            }
        })
    );

    hideIndicatorEvents.forEach((e) => eventSource.on(e, hideTypingIndicator));

    eventSource.on("chatLoaded", () => {
        const settings = getSettings();
        if (settings.persistentMode) {
            console.log(
                "[TypingIndicator] 检测到聊天加载完成(chatLoaded)，准备更新播放器信息..."
            );
            updatePersistentIndicatorContent();
        } else {
            hideTypingIndicator();
        }
    });

    eventSource.on(event_types.CHAT_CHANGED, (chatId) => {
        if (!chatId) {
            console.log("[TypingIndicator] 检测到聊天关闭，隐藏指示器...");
            hideTypingIndicator();
        }
    });

    setTimeout(() => {
        const renderSettings = addExtensionSettings();
        const initialSettings = getSettings();
        if (initialSettings.persistentMode) {
            isIndicatorPersisted = true;
            showTypingIndicator("persistent-start");
        }
        applyTheme(initialSettings.selectedThemeId);
        const autoFollowCheckbox = document.getElementById(
            "ti_auto_follow_theme"
        );
        if (autoFollowCheckbox) {
            autoFollowCheckbox.addEventListener("change", (e) => {
                const settings = getSettings();
                settings.autoFollowTheme = e.target.checked;
                saveSettingsDebounced();
                if (e.target.checked) {
                    handleMainThemeChange(renderSettings);
                }
            });
        }
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "class"
                ) {
                    setTimeout(
                        () => handleMainThemeChange(renderSettings),
                        100
                    );
                }
            }
        });
        observer.observe(document.body, { attributes: true });
        if (getSettings().autoFollowTheme) {
            handleMainThemeChange(renderSettings);
        }
    }, 500);
})();

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
            "[TypingIndicator] Global SVG defs container not found. Initializing now."
        );
        setupGlobalSvgDefs();
        globalSvgContainer = document.getElementById("ti-global-svg-defs");
        if (!globalSvgContainer) {
            console.error(
                "[TypingIndicator] Failed to create global SVG defs container."
            );
            return;
        }
    }

    const masterDefs = globalSvgContainer.querySelector("defs");
    if (!masterDefs) {
        console.error(
            "[TypingIndicator] 'defs' tag not found in global container."
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
                    `[TypingIndicator] Defs from "${item.name}" dynamically updated.`
                );
            }
        }
    });
}
