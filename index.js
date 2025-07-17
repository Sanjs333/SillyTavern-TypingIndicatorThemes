import {
  name2,
  eventSource,
  event_types,
  isStreamingEnabled,
  saveSettingsDebounced,
} from "../../../../script.js";
import { extension_settings } from "../../../extensions.js";
import { selected_group } from "../../../group-chats.js";
import { t } from "../../../i18n.js";

const MODULE = "typing_indicator_themes";
const THEME_STYLE_ID = "typing-indicator-theme-style";

const CRYSTAL_THEME_CSS = `
.typing_indicator {
  color: #2c4a5e; font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  text-shadow: 0 1px 2px rgba(255,255,255,0.3); padding: 5px 30px; border-radius: 20px;
  background: radial-gradient(circle at 50% 50%, rgba(173, 216, 230, 0.5) 0%, rgba(255,255,255,0.3) 70%),
    linear-gradient(to bottom right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(135, 206, 235, 0.2), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(203,228,238,0.5);
  text-align: center;
}
.typing_indicator .svg_dots svg { fill: currentColor; }
@media (max-width: 768px) {
    .typing_indicator {
        padding: 4px 15px;
        border-radius: 15px;
        font-size: 0.85em;
    }
}`;

const BUBBLE_THEME_CSS = `
.typing_indicator {
    position: relative;
    box-shadow: 0 15px 35px rgba(255,182,193,0.6), 0 5px 12px rgba(173,216,230,0.6), inset 0 8px 20px rgba(255,255,255,0.8), inset 0 -8px 20px rgba(255,192,203,0.5);
    padding: 5px 30px; border-radius: 20px; border: 0.5px solid rgba(255,255,255,0.2);
    background: linear-gradient(145deg, rgba(173,216,230,0.5) 20%, rgba(255,192,203,0.5) 80%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.7) 10%, transparent 80%);
    animation: ti-bubble 1.5s ease-in-out infinite;
    backdrop-filter: blur(17px); -webkit-backdrop-filter: blur(17px);
    text-align: center;
    color: #4a2c3a;
}
.typing_indicator::before {
    content: "ᜊ"; position: absolute; left: -20px; top: -24px; color: #FFB6C1; font-size: 1.8em;
    filter: drop-shadow(0 4px 6px rgba(255,182,193,0.5));
    animation: ti-sparkle 1.2s ease-in-out infinite, ti-swing 5s ease-in-out infinite;
}
.typing_indicator::after {
    content: "ᜊ"; position: absolute; right: -22px; bottom: -26px; color: #FFB6C1; font-size: 2em;
    animation: ti-bounce 1s ease-in-out infinite, ti-glow 1.5s alternate infinite;
}
@keyframes ti-bubble { 0%, 100% { transform: scale(1) rotate(-1deg); } 50% { transform: scale(1.08) rotate(2deg); } }
@keyframes ti-sparkle { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.4); } 100% { opacity: 0.8; transform: scale(1); } }
@keyframes ti-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px) rotate(10deg); } }
@keyframes ti-glow { from { filter: drop-shadow(0 0 8px #FF69B4); } to { filter: drop-shadow(0 0 15px #FFB6C1); } }
@keyframes ti-swing { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
@media (prefers-color-scheme: dark) {
    .typing_indicator {
        background: linear-gradient(145deg, rgba(100,149,237,0.8) 20%, rgba(219,112,147,0.8) 80%);
        box-shadow: 0 15px 35px rgba(147,112,219,0.3), inset 0 8px 20px rgba(255,255,255,0.3);
        color: #fff;
    }
    .typing_indicator::before { color: #DDA0DD; }
    .typing_indicator::after { color: #FF69B4; }
}
@media (max-width: 768px) {
    .typing_indicator {
        padding: 4px 18px;
        border-radius: 15px;
        font-size: 0.85em;
    }
    .typing_indicator::before {
        font-size: 1.4em;
        left: -12px;
        top: -16px;
    }
    .typing_indicator::after {
        font-size: 1.5em;
        right: -15px;
        bottom: -18px;
    }
}`;

const TRANSPARENT_THEME_CSS = `
.typing_indicator {
    padding: 8px 16px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    border-radius: 20px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
}
@media (max-width: 768px) {
    .typing_indicator {
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.9em;
    }
}`;

const SOFT_PINK_CLOUD_CSS = `
.typing_indicator {
    padding: 10px 25px;
    border-radius: 50px;
    color: #a4708c;
    background: linear-gradient(135deg, #fce4ec, #e3f2fd);
    box-shadow: 0 4px 8px rgba(239, 154, 154, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.7);
    border: 1px solid white;
    font-weight: bold;
    text-align: center;
}
.typing_indicator_text {
    position: relative;
}
.typing_indicator_text::after {
    content: '☁️';
    position: absolute;
    right: -30px;
    bottom: -15px;
    font-size: 1.5em;
    opacity: 0.8;
    animation: ti-cloud-drift 4s ease-in-out infinite alternate;
}
.typing_indicator .svg_dots svg {
    fill: #b39ddb;
}
@keyframes ti-cloud-drift {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(-5px, 2px) scale(1.1); }
}`;

const PIXEL_BLACKBOARD_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
.typing_indicator {
    background-color: #3d355a;
    color: #f6e5f6;
    border: 3px solid #1e1a30;
    padding: 12px;
    box-shadow: 4px 4px 0px #1e1a30;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
}
#kaomoji-indicator {
    font-family: 'DotGothic16', monospace;
    line-height: 1.3;
    margin: 0;
    padding: 0;
    text-align: left;
    text-shadow: 2px 2px 0px #1e1a30;
    color: #a7d28d;
}
#kaomoji-indicator .char-name {
    color: #f6e5f6;
    font-weight: bold;
}
#kaomoji-indicator .typing-dots {
    display: inline-block;
    animation: text-bounce 1.4s ease-in-out infinite;
}
#kaomoji-indicator .heart-sparkle {
    display: inline-block;
    font-size: 0.8em;
    color: #f6e5f6;
    animation: pixel-sparkle 2.2s infinite;
}
#kaomoji-indicator .heart-breath {
    display: inline-block;
    animation: pixel-breath 1.8s infinite;
}
@keyframes text-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
}
@keyframes pixel-sparkle {
    0%, 48%, 100% { opacity: 0.8; }
    50% { opacity: 1; transform: scale(1.2); }
    52% { opacity: 0.4; }
}
@keyframes pixel-breath {
    0%, 100% { 
        color: #a7d28d;
        transform: translateY(0);
    }
    50% {
        color: #cffaa2;
        transform: translateY(-2px);
    }
}
.typing_indicator .svg_dots {
    display: none;
}`;

const RETRO_PGEAR_CSS = `
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
.typing_indicator { background: linear-gradient(145deg, #d5d5d5, #b1b1b1); border: 2px solid #4a4a4a; border-bottom: 4px solid #333; border-right: 4px solid #333; padding: 10px; border-radius: 12px 12px 16px 16px; box-shadow: 5px 5px 0px #1e1a30, inset 1px 1px 2px #fff, inset -1px -1px 2px #888; image-rendering: pixelated; font-family: 'VT323', monospace; width: 320px; box-sizing: border-box; }
#pixel-player { display: flex; flex-direction: column; gap: 8px; }
#pixel-player .player-header { display: flex; justify-content: space-between; align-items: center; color: #1e1a30; font-size: 1.2em; padding: 0 4px; text-shadow: 1px 1px 0 #e0e0e0; }
#pixel-player .header-lights { display: flex; gap: 5px; align-items: center; }
#pixel-player .header-lights i { width: 12px; height: 12px; border: 2px solid #1e1a30; border-radius: 50%; box-shadow: inset 1px 1px 2px rgba(0,0,0,0.5); }
#pixel-player .light-red { background-color: #d93a65; }
#pixel-player .light-green { background-color: #94c37d; animation: header-blink 2s infinite; }
#pixel-player .player-screen { background-color: #889e77; border: 4px solid #1e1a30; border-radius: 6px; padding: 10px; color: #1e1a30; box-shadow: inset 2px 2px 4px rgba(0,0,0,0.4); position: relative; overflow: hidden; }
#pixel-player .player-screen::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%), linear-gradient(90deg, rgba(0,0,0,0.1) 50%, transparent 50%); background-size: 3px 3px; pointer-events: none; animation: screen-flicker 0.1s infinite; }
#pixel-player .track-info { white-space: nowrap; overflow: hidden; font-size: 1.1em; }
#pixel-player .track-title { display: inline-block; animation: text-blink 1.5s infinite; }
#pixel-player .progress-bar { position: relative; height: 10px; display: flex; align-items: center; margin-top: 8px; }
#pixel-player .progress-line { width: calc(100% - 70px); height: 4px; background-color: #1e1a30; border-radius: 2px; }
#pixel-player .progress-dot { position: absolute; width: 10px; height: 10px; background-color: #1e1a30; border-radius: 50%; animation: move-progress 4s linear infinite; }
#pixel-player .time { position: absolute; right: 0; font-size: 1.1em; }
#pixel-player .player-controls { display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 10px 5px; gap: 15px; }
#pixel-player .d-pad-container { display: flex; justify-content: center; align-items: center; }
#pixel-player .d-pad { position: relative; width: 60px; height: 60px; }
#pixel-player .d-pad::before, #pixel-player .d-pad::after { content: ''; position: absolute; background-color: #4a4a4a; border-radius: 4px; box-shadow: 1px 1px 1px #777, -1px -1px 1px #222; }
#pixel-player .d-pad::before { left: 25px; top: 0; width: 10px; height: 60px; }
#pixel-player .d-pad::after { left: 0; top: 25px; width: 60px; height: 10px; }
#pixel-player .d-pad-center { position: absolute; width: 20px; height: 20px; background: #4a4a4a; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: inset 1px 1px 2px #333, inset -1px -1px 2px #777; }
#pixel-player .ab-select-start-container { display: grid; grid-template-areas: "b a" "select start"; gap: 10px 20px; justify-items: center; align-items: center; }
#pixel-player .btn-a, #pixel-player .btn-b { width: 45px; height: 45px; border-radius: 50%; border: 2px solid #1e1a30; display: flex; align-items: center; justify-content: center; font-size: 2em; color: #1e1a30; text-shadow: 1px 1px 0 #e0e0e0; box-shadow: 2px 2px 0px #4a4a4a, inset 1px 1px 1px #fff, inset -1px -1px 3px rgba(0,0,0,0.4); cursor: pointer; transition: all 0.05s ease; }
#pixel-player .btn-a:active, #pixel-player .btn-b:active { transform: translate(2px, 2px); box-shadow: inset 1px 1px 1px #fff, inset -1px -1px 3px rgba(0,0,0,0.4); }
#pixel-player .btn-a { background-color: #d93a65; grid-area: a; }
#pixel-player .btn-b { background-color: #a7d28d; grid-area: b; }
#pixel-player .btn-select, #pixel-player .btn-start { height: 15px; border-radius: 10px; background: #4a4a4a; border: 2px solid #1e1a30; padding: 2px 10px; color: #c2c2c2; font-size: 0.9em; text-shadow: none; }
#pixel-player .btn-select { grid-area: select; }
#pixel-player .btn-start { grid-area: start; }
.typing_indicator .svg_dots { display: none; }
@keyframes header-blink { 50% { opacity: 0.3; } }
@keyframes move-progress { from { left: 0; } to { left: calc(100% - 80px); } }
@keyframes text-blink { 50% { opacity: 0; } }
@keyframes screen-flicker { 0% { opacity: 1; } 50% { opacity: 0.98; } 100% { opacity: 1; } }
@media (max-width: 480px) { .typing_indicator { width: 100%; max-width: 280px; padding: 8px; transform: scale(0.9); transform-origin: center; } }`;

const PIXEL_MINT_GREEN_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
:root {
  --panel-bg-color: #BAEBED;
  --panel-border-color: #89c5c7;
  --color-title: #3a8b8e;
  --color-now-playing: #5f9ea0;
  --color-song-title: #3a8b8e;
  --color-time: #5f9ea0;
  --top-panel-top: -5%;
  --top-panel-left: 25%;
  --top-panel-width: 44%;
  --now-playing-top: 30%;
  --now-playing-left: 35%;
  --now-playing-width: 26%;
  --song-title-top: 46%;
  --song-title-left: 22%;
  --song-title-width: 52%;
  --progress-bar-top: 62%;
  --progress-bar-left: 24%;
  --progress-bar-width: 52%;
  --bottom-panel-top: 79%; 
  --bottom-panel-left: 20%;
  --bottom-panel-width: 55%;
  --font-size-title: 13px;
  --font-size-now-playing: 10px;
  --font-size-song: 16px;
  --font-size-time: 11px;
}
.typing_indicator { padding: 0 !important; background: none !important; border: none !important; box-shadow: none !important; width: 100%; max-width: 480px; margin: 8px auto !important; }
.typing_indicator .typing_indicator_text { display: block !important; width: 100%; }
.typing_indicator .svg_dots { display: none !important; }
.radio-theme-wrapper { position: relative; width: 100%; aspect-ratio: 940 / 280; margin: 0 auto; }
.player-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.background-pixel-art { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 1; }
.top-panel, .bottom-panel { position: absolute; padding: 5px; background-color: var(--panel-bg-color); border: 1px solid var(--panel-border-color); border-radius: 4px; box-shadow: 2px 2px 0px 0px #d4a5b8; display: flex; justify-content: center; align-items: center; background-image: repeating-linear-gradient(45deg,rgba(255,255,255,0.08),rgba(255,255,255,0.08) 1px,transparent 1px,transparent 5px),repeating-radial-gradient(circle at center,rgba(255,255,255,0.1) 0,rgba(255,255,255,0.1) 1px,transparent 1px,transparent 4px); background-size: 7px 7px, 4px 4px; animation: scrolling-dither 10s linear infinite; }
.top-panel { top: var(--top-panel-top); left: var(--top-panel-left); width: var(--top-panel-width); z-index: 2; }
.top-panel .title { font-family: 'Pixelify Sans', monospace; font-size: var(--font-size-title); color: var(--color-title); font-weight: bold; text-shadow: 1px 1px 0 rgba(255,255,255,0.5); position: relative; animation: title-glow 2s ease-in-out infinite alternate; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.top-panel .title::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: linear-gradient(45deg, #ff85b2, #87ceeb, #ff85b2); border-radius: 3px; z-index: -1; opacity: 0; animation: title-border-glow 3s linear infinite; }
.now-playing-line { position: absolute; top: var(--now-playing-top); left: var(--now-playing-left); width: var(--now-playing-width); box-sizing: border-box; text-align: center; font-family: 'Pixelify Sans', monospace; font-size: var(--font-size-now-playing); color: var(--color-now-playing); background-color: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 3px; border: 1px solid rgba(0,0,0,0.1); box-shadow: inset 0 0 2px rgba(0,0,0,0.1); z-index: 2; }
.song-title { position: absolute; top: var(--song-title-top); left: var(--song-title-left); width: var(--song-title-width); box-sizing: border-box; text-align: center; font-family: 'Pixelify Sans', monospace; font-size: var(--font-size-song); font-weight: 500; color: var(--color-song-title); text-shadow: 1px 1px 0 rgba(255,255,255,0.4); background: linear-gradient(45deg, #ff85b2, #87ceeb, #ff85b2, #87ceeb); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rainbow-flow 3s linear infinite, gentle-vibration 1.5s infinite ease-in-out; z-index: 2; }
.song-title::before, .song-title::after { content: '✨'; position: absolute; top: -5px; font-size: 10px; animation: star-twinkle 1.5s infinite ease-in-out alternate; }
.song-title::before { left: -15px; animation-delay: 0s; }
.song-title::after { right: -15px; animation-delay: 0.5s; }
.progress-bar-container { position: absolute; top: var(--progress-bar-top); left: var(--progress-bar-left); width: var(--progress-bar-width); box-sizing: border-box; display: flex; align-items: center; gap: 8px; z-index: 2; }
.progress-track { flex-grow: 1; height: 10px; background-color: #d3b8c3; border-radius: 2px; position: relative; overflow: visible; box-shadow: inset 0 1px 2px rgba(0,0,0,0.2); background-image: repeating-linear-gradient(90deg, #ffc1da, #ffc1da 8px, transparent 8px, transparent 10px); animation: shimmering-progress 2s linear infinite; }
.progress-thumb { position: absolute; top: 50%; width: 18px; height: 18px; z-index: 2; animation: heart-pulse 1.5s infinite, sliding-heart 10s linear infinite; }
.timestamp { font-family: 'Pixelify Sans', monospace; font-size: var(--font-size-time); color: var(--color-time); font-weight: 500; text-shadow: 1px 1px 0 rgba(255,255,255,0.4); }
.bottom-panel { top: var(--bottom-panel-top); left: var(--bottom-panel-left); width: var(--bottom-panel-width); z-index: 10; }
.controls-container { width: 100%; display: flex; justify-content: space-around; align-items: center; }
.control-btn { width: 22px; height: 22px; background-color: #f0f8ff; border-radius: 2px; display: flex; justify-content: center; align-items: center; cursor: default; box-shadow: 2px 2px 0 #b0c4de, inset 1px 1px 0 #fff, inset -1px -1px 0 #d0d0d0; position: relative; transition: all 0.1s ease-in-out; background-image: radial-gradient(circle at 25% 25%,rgba(255,255,255,0.3) 1px,transparent 1px),radial-gradient(circle at 75% 75%,rgba(255,255,255,0.2) 1px,transparent 1px); background-size: 4px 4px; }
.control-btn:active { transform: translateY(2px) translateX(1px); box-shadow: 0 0 0 #b0c4de, inset 1px 1px 0 #fff, inset -1px -1px 0 #d0d0d0; }
.control-btn span { font-family: 'Press Start 2P', monospace; color: #4682b4; font-size: 8px; position: relative; text-shadow: 1px 1px 0 rgba(255,255,255,0.8); }
.play-pause-btn { width: 24px; height: 24px; background-color: #87ceeb; border-radius: 2px; box-shadow: 3px 3px 0 #4682b4, inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 #6495ed; background-image: radial-gradient(circle at 30% 30%,rgba(255,255,255,0.4) 1px,transparent 1px),radial-gradient(circle at 70% 70%,rgba(255,255,255,0.3) 1px,transparent 1px); background-size: 6px 6px; }
.play-pause-btn:active { transform: translateY(3px) translateX(1px); box-shadow: 0 0 0 #4682b4, inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 #6495ed; }
.play-pause-btn span { color: white; font-family: 'Press Start 2P', monospace; font-size: 10px; text-shadow: 1px 1px 0 rgba(0,0,0,0.3); }
.music-note { display: inline-block; color: #ff85b2; }
.small-btn span { font-size: 16px; }
@media (max-width: 480px) { :root { --font-size-title: 11px; --font-size-now-playing: 9px; } }
@keyframes sliding-heart { from { left: 0%; transform: translateX(-50%) translateY(-50%); } to { left: 100%; transform: translateX(-50%) translateY(-50%); } }
@keyframes heart-pulse { 0%, 100% { transform: translateY(-50%) scale(1); filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0)); } 50% { transform: translateY(-50%) scale(1.1); filter: drop-shadow(0 0 3px rgba(255, 123, 172, 0.8)); } }
@keyframes scrolling-dither { to { background-position: 0 0, -4px -4px; } }
@keyframes shimmering-progress { to { background-position: -20px 0; } }
@keyframes gentle-vibration { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1px); } }
@keyframes title-glow { 0% { text-shadow: 1px 1px 0 rgba(255,255,255,0.5); } 100% { text-shadow: 1px 1px 0 rgba(255,255,255,0.8), 0 0 8px rgba(255,133,178,0.3); } }
@keyframes title-border-glow { 0%, 100% { opacity: 0; } 50% { opacity: 0.3; } }
@keyframes rainbow-flow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
@keyframes star-twinkle { 0% { opacity: 0.3; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.1); } }`;

const HEARTBEAT_LOADING_CSS = `
@import url('https://cdn.jsdelivr.net/gh/SolidZORO/zpix-pixel-font@master/dist/zpix.css');
.typing_indicator { padding: 0 !important; background: none !important; border: none !important; box-shadow: none !important; width: 100%; max-width: 380px; margin: 8px auto !important; font-family: 'Zpix', 'Press Start 2P', monospace; }
.typing_indicator .typing_indicator_text { display: block !important; width: 100%; }
.typing_indicator .svg_dots { display: none !important; }
:root {
    --heart-vertical-position: 20px;
    --dots-vertical-position: 73%;
    --line1-top: 45%;
    --line2-top: 55%;
    --line3-top: 65%;
    --font-size-char: 14px;
    --font-size-main: 12px;
    --font-main-color: #FFFFFF;
    --font-glow-color: #6d2b68;
    --dots-color: #ff85b2;
    --indicator-height: 180px;
    --heart-size: 155px;
    --heart-unloaded-color: rgba(255, 255, 255, 0.4);
    --heart-loaded-color: #ff85b2;
    --heart-glow-blur: 8px;
    --heart-stroke-width: 4;
    --particle-color: #ff85b2;
    --particle-size: 12px;
    --heart-charge-duration: 5s;
    --heart-pulse-duration: 2.5s;
    --typing-duration: 2s;
    --cursor-blink-duration: 0.75s;
}
.pixel-heart-indicator { position: relative; width: 100%; height: var(--indicator-height); margin: 0 auto; }
.bg-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; object-position: center; z-index: 1; }
.content-wrapper { position: relative; width: 100%; height: 100%; z-index: 2; display: flex; justify-content: center; align-items: center; padding-top: var(--heart-vertical-position); }
.text-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; pointer-events: none; }
.loading-heart-svg { position: absolute; width: var(--heart-size); height: var(--heart-size); pointer-events: none; overflow: visible; animation: heart-pulse var(--heart-pulse-duration) ease-in-out infinite; }
.heart-path-bg, .heart-path-fg { fill: none; stroke-width: var(--heart-stroke-width); stroke-dasharray: 4 5; stroke-linecap: butt; }
.heart-path-bg { stroke: var(--heart-unloaded-color); }
.heart-path-fg { stroke: var(--heart-loaded-color); stroke-dasharray: 320; stroke-dashoffset: 320; animation: draw-heart var(--heart-charge-duration) linear infinite, glow-pulse var(--heart-pulse-duration) ease-in-out infinite; }
.line { position: absolute; width: 100%; left: 0; display: flex; justify-content: center; }
.line1 { width: max-content; max-width: 90%; left: 50%; transform: translateX(-50%); display: block; }
.line1 { top: var(--line1-top); }
.line2 { top: var(--line2-top); }
.line3 { top: var(--line3-top); }
.line4 { top: var(--dots-vertical-position); }
.typing-text { display: inline-block; box-sizing: border-box; white-space: nowrap; overflow: hidden; width: 0; border-right: .15em solid var(--heart-loaded-color); vertical-align: bottom; text-align: left; pointer-events: auto; color: var(--font-main-color); text-shadow: 0 0 5px var(--font-glow-color), 1px 1px 1px rgba(0,0,0,0.3); }
.line1 .typing-text { font-size: var(--font-size-char); animation: typing var(--typing-duration) steps(20, end) infinite, blink-caret var(--cursor-blink-duration) step-end infinite; }
.line2 .typing-text { font-size: var(--font-size-main); max-width: calc(6ch + 0.15em); animation: typing var(--typing-duration) steps(3, end) infinite, blink-caret var(--cursor-blink-duration) step-end infinite; animation-delay: calc(var(--typing-duration) + 0.5s); }
.line3 .typing-text { font-size: var(--font-size-main); max-width: calc(6ch + 0.15em); animation: typing var(--typing-duration) steps(3, end) infinite, blink-caret var(--cursor-blink-duration) step-end infinite; animation-delay: calc(var(--typing-duration) * 2 + 1s); }
.line4 { width: 50px; height: 8px; z-index: 5; position: relative; }
.line4, .line4::before, .line4::after { content: ''; position: absolute; width: 8px; height: 8px; border-radius: 50%; background-color: var(--dots-color); animation: dot-bounce 1.2s infinite ease-in-out; box-shadow: 0 0 4px var(--dots-color); }
.line4 { left: 50%; transform: translateX(-50%); animation-delay: 0.2s; }
.line4::before { left: -20px; animation-delay: 0s; }
.line4::after { right: -20px; animation-delay: 0.4s; }
@keyframes draw-heart { to { stroke-dashoffset: 0; } }
@keyframes heart-pulse { 50% { transform: scale(1.05); } }
@keyframes glow-pulse { 50% { filter: drop-shadow(0 0 var(--heart-glow-blur) var(--heart-loaded-color)); } }
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: var(--heart-loaded-color); } }
@keyframes dot-bounce { 0%, 60%, 100% { transform: scale(0.4); opacity: 0.6; } 30% { transform: scale(1); opacity: 1; } }
.floating-particles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 3; overflow: hidden; pointer-events: none; }
.floating-particles span { position: absolute; bottom: -20px; font-size: var(--particle-size); color: var(--particle-color); animation: float-up 6s linear infinite; }
.floating-particles span:nth-child(1) { left: 15%; animation-delay: 0s; }
.floating-particles span:nth-child(2) { left: 75%; animation-delay: 2s; animation-duration: 7s; }
.floating-particles span:nth-child(3) { left: 45%; animation-delay: 4s; animation-duration: 5s; }
.floating-particles span::before { content: '♡\\FE0E'; }
@keyframes float-up { to { transform: translateY(-180px) rotate(15deg); opacity: 0; } }
@media (max-width: 480px) {
    .typing_indicator { max-width: 320px; }
    :root { --indicator-height: 150px; --heart-size: 130px; --font-size-char: 12px; --font-size-main: 10px; --line1-top: 46%; --line2-top: 56%; --line3-top: 66%; }
}`;

const VINE_GREEN_THEME_CSS = `
.typing_indicator {
position: relative;
display: flex;
justify-content: center;
align-items: center;
margin: 1rem auto;
padding: 12px 24px;
border-radius: 16px;
line-height: 1.8;
overflow: visible;
width: fit-content;
max-width: 90%;
order: 9999;
color: #2a5d5f;
border: none;
background:
repeating-linear-gradient(
0deg,
rgba(162, 216, 173, 0.1),
rgba(162, 216, 173, 0.1) 8px,
transparent 8px,
transparent 16px
),
repeating-linear-gradient(
90deg,
rgba(162, 216, 173, 0.1),
rgba(162, 216, 173, 0.1) 8px,
transparent 8px,
transparent 16px
),
#ffffff;
box-shadow:
0 8px 16px rgba(104, 175, 121, 0.08),
inset 0 0 10px rgba(255,255,255,0.8);
text-align: center;
transition: opacity 0.3s ease;
}
.typing_indicator::before {
content: '';
position: absolute;
top: -30px;
right: -60px;
width: 100px;
height: 100px;
background: url('https://files.catbox.moe/ve8phy.png') no-repeat;
background-size: contain;
z-index: 2;
opacity: 0.95;
filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.1));
transform: rotate(8deg);
}
.typing_indicator::after {
content: '';
position: absolute;
bottom: -20px;
left: -10px;
width: 35px;
height: 35px;
background: url('https://files.catbox.moe/jf5ia6.png') no-repeat;
background-size: contain;
z-index: 2;
opacity: 0.85;
filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.1)) hue-rotate(-10deg);
transform: rotate(-12deg);
mix-blend-mode: multiply;
}`;

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

const defaultSettings = {
  enabled: true,
  streaming: false,
  showAnimation: true,
  position: "floating_bottom",
  selectedTextPresetId: "cat_default",
  textPresets: [
    {
      id: "cat_default",
      name: t`Cat Theme`,
      text: `...🐈‍⬛‧˚🐾✧{{char}}回复中`,
    },
    {
      id: "original",
      name: "SillyTavern Style",
      text: `{{char}} is typing...`,
    },
    {
      id: "player_love_you",
      name: "《𝙇𝙤𝙫𝙚 𝙮𝙤𝙪》播放器",
      text: `{{char}}'s Radio <br>正在播放《𝙇𝙤𝙫𝙚 𝙮𝙤𝙪》━●──5:20<br>⇆ㅤㅤ  ㅤ◁ㅤ  ㅤ❚❚ㅤ  ㅤ▷ㅤㅤㅤ↻`,
    },
    {
      id: "pixel_blackboard",
      name: "像素小黑板",
      text: `<pre id="kaomoji-indicator">\n    ∧,,∧      <span class="heart-sparkle">♡</span>\n   ( •ω• ) <span class="heart-breath">♡</span>\n┏-∪-∪━━━━━━┓\n│ <span class="char-name">{{char}}</span>\n│ 在码字了<span class="typing-dots">...</span>      ｜\n┗━━━━━━━━━┛\n</pre>`,
    },
    {
      id: "retro_pgear",
      name: "复古P-GEAR",
      text: `<div id="pixel-player">\n    <div class="player-header">\n        <span>{{char}}'s P-GEAR</span>\n        <div class="header-lights">\n            <i class="light-red"></i><i class="light-green"></i>\n        </div>\n    </div>\n    <div class="player-screen">\n        <div class="track-info">\n            <span class="track-title">>> ANALYZING INPUT...</span>\n        </div>\n        <div class="progress-bar">\n            <div class="progress-line"></div>\n            <div class="progress-dot"></div>\n            <span class="time">LOADING</span>\n        </div>\n    </div>\n    <div class="player-controls">\n        <div class="d-pad-container">\n            <div class="d-pad">\n                <div class="d-pad-center"></div>\n            </div>\n        </div>\n        <div class="ab-select-start-container">\n            <span class="btn-a">A</span>\n            <span class="btn-b">B</span>\n            <span class="btn-select">SELECT</span>\n            <span class="btn-start">START</span>\n        </div>\n    </div>\n</div>`,
    },
    {
      id: "pixel_mint_green",
      name: "像素薄荷绿",
      text: `<div class="radio-theme-wrapper">\n  <div class="player-container">\n    <img class="background-pixel-art" src="https://i.imgur.com/WOlrha3.png" alt="Radio Background">\n    <div class="top-panel">\n      <div class="title">{{char}}'s Radio</div>\n    </div>\n    <div class="main-content">\n      <div class="now-playing-line">\n        <span class="music-note">♪</span> Now Playing <span class="music-note">♪</span>\n      </div>\n      <div class="song-title">《Love you》</div>\n      <div class="progress-bar-container">\n        <div class="progress-track">\n          <div class="progress-thumb">\n            <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; shape-rendering: crispEdges;"><path d="M4 1C2.34315 1 1 2.34315 1 4C1 5.48422 1.83883 7.21854 3.23607 8.61577C4.6333 10.013 6.43585 11.2332 8 12.3588C9.56415 11.2332 11.3667 10.013 12.7639 8.61577C14.1612 7.21854 15 5.48422 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4H7C7 2.34315 5.65685 1 4 1Z" fill="#FF7BAC" stroke="#FFFFFF" stroke-width="2"/></svg>\n          </div>\n        </div>\n        <div class="timestamp">5:20</div>\n      </div>\n    </div>\n    <div class="bottom-panel">\n      <div class="controls-container">\n        <div class="control-btn small-btn"><span>⇆</span></div>\n        <div class="control-btn"><span>ᐊ</span></div>\n        <div class="control-btn play-pause-btn"><span>❚❚</span></div>\n        <div class="control-btn"><span>ᐅ</span></div>\n        <div class="control-btn small-btn"><span>↻</span></div>\n      </div>\n    </div>\n  </div>\n</div>`,
    },
    {
      id: "heartbeat_loading",
      name: "心跳加载中",
      text: `<div class="pixel-heart-indicator">\n    <img class="bg-image" src="https://i.imgur.com/VsLl9fw.png" alt="Typing Indicator Background">\n    <div class="content-wrapper">\n        <svg class="loading-heart-svg" viewBox="0 0 100 90">\n            <path class="heart-path-bg" d="M50 90 L0 50 L0 35 L30 15 L50 30 L70 15 L100 35 L100 50 Z"/>\n            <path class="heart-path-fg" d="M50 90 L0 50 L0 35 L30 15 L50 30 L70 15 L100 35 L100 50 Z"/>\n        </svg>\n        <div class="text-container">\n            <div class="line line1"><span class="typing-text char-name-line">{{char}}</span></div>\n            <div class="line line2"><span class="typing-text">的心跳</span></div>\n            <div class="line line3"><span class="typing-text">加载中</span></div>\n            <div class="line line4"></div>\n        </div>\n        <div class="floating-particles">\n            <span></span><span></span><span></span>\n        </div>\n    </div>\n</div>`,
    },
  ],
  selectedThemeId: "default",
  themes: [
    {
      id: "default",
      name: t`Default`,
      css: DEFAULT_THEME_CSS,
      isBuiltIn: true,
    },
    {
      id: "transparent",
      name: t`Transparent Theme`,
      css: TRANSPARENT_THEME_CSS,
      isBuiltIn: true,
    },
    {
      id: "soft_pink_cloud",
      name: t`柔粉云朵`,
      css: SOFT_PINK_CLOUD_CSS,
      isBuiltIn: true,
    },
    {
      id: "pixel_blackboard_style",
      name: "像素小黑板-美化",
      css: PIXEL_BLACKBOARD_CSS,
      isBuiltIn: true,
    },
    {
      id: "retro_pgear_style",
      name: "复古P-GEAR-美化",
      css: RETRO_PGEAR_CSS,
      isBuiltIn: true,
    },
    {
      id: "pixel_mint_green_style",
      name: "像素薄荷绿-美化",
      css: PIXEL_MINT_GREEN_CSS,
      isBuiltIn: true,
    },
    {
      id: "heartbeat_loading_style",
      name: "心跳加载中-美化",
      css: HEARTBEAT_LOADING_CSS,
      isBuiltIn: true,
    },
    {
      id: "crystal",
      name: t`Crystal Theme (by 长青青)`,
      css: CRYSTAL_THEME_CSS,
      isBuiltIn: true,
    },
    {
      id: "bubble",
      name: t`Bubble Theme (by 长青青)`,
      css: BUBBLE_THEME_CSS,
      isBuiltIn: true,
    },
    {
      id: "vine_green",
      name: t`Vine Green (by 长青青)`,
      css: VINE_GREEN_THEME_CSS,
      isBuiltIn: true,
    },
  ],
};

function getSettings() {
  if (!extension_settings[MODULE]) {
    extension_settings[MODULE] = {};
  }
  const settings = extension_settings[MODULE];

  const syncList = (defaultList, userList) => {
    if (!userList || !Array.isArray(userList)) {
      return structuredClone(defaultList);
    }

    const defaultMap = new Map(defaultList.map((item) => [item.id, item]));

    const finalSyncedList = structuredClone(userList);
    const finalMap = new Map(finalSyncedList.map((item) => [item.id, item]));

    defaultMap.forEach((defaultItem, id) => {
      if (!finalMap.has(id)) {
        finalSyncedList.push(structuredClone(defaultItem));
      }
    });

    finalSyncedList.forEach((finalItem) => {
      if (finalItem.isBuiltIn && defaultMap.has(finalItem.id)) {
        const defaultItem = defaultMap.get(finalItem.id);
        if (finalItem.name !== defaultItem.name) {
          finalItem.name = defaultItem.name;
        }
      }
    });

    return finalSyncedList;
  };

  settings.themes = syncList(defaultSettings.themes, settings.themes, "css");
  settings.textPresets = syncList(
    defaultSettings.textPresets,
    settings.textPresets,
    "text"
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

function applyTheme(themeId) {
  const settings = getSettings();
  const theme = settings.themes.find((t) => t.id === themeId);
  let oldStyleTag = document.getElementById(THEME_STYLE_ID);
  if (oldStyleTag) oldStyleTag.remove();
  if (!theme || !theme.css) return;

  const styleTag = document.createElement("style");
  styleTag.id = THEME_STYLE_ID;
  styleTag.innerHTML = theme.css;
  document.head.appendChild(styleTag);
}

function showTypingIndicator(type, _args, dryRun) {
  const settings = getSettings();
  if (!settings.enabled || dryRun || ["quiet", "impersonate"].includes(type))
    return;
  if (!name2 || (!settings.streaming && isStreamingEnabled())) return;
  if (
    document.getElementById("typing_indicator_template") &&
    selected_group &&
    !isStreamingEnabled()
  )
    return;

  hideTypingIndicator();

  let parentContainer;
  const isAboveInput = ["above_input", "full_width_banner"].includes(
    settings.position
  );
  if (settings.position === "floating_bottom") parentContainer = document.body;
  else
    parentContainer = isAboveInput
      ? document.getElementById("send_form")
      : document.getElementById("chat");
  if (!parentContainer) return;

  const preset =
    settings.textPresets.find((p) => p.id === settings.selectedTextPresetId) ||
    settings.textPresets[0];
  const baseText = preset.text.replace(/\{\{char\}\}/g, name2);
  const svgAnimation = `
        <span class="svg_dots"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16" fill="currentColor">
        <style>.dot-fade-1{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) 0s infinite}.dot-fade-2{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .2s infinite}.dot-fade-3{animation:smoothFade 1.2s cubic-bezier(.25,.46,.45,.94) .4s infinite}@keyframes smoothFade{0%{opacity:.2}30%{opacity:1}60%{opacity:.4}100%{opacity:.2}}</style>
        <circle class="dot-fade-1" cx="5" cy="8" r="3"/><circle class="dot-fade-2" cx="15" cy="8" r="3"/><circle class="dot-fade-3" cx="25" cy="8" r="3"/></svg></span>`;

  const htmlContent = `<span class="typing_indicator_text">${baseText}</span>${
    settings.showAnimation ? svgAnimation : ""
  }`;

  let typingIndicator = document.createElement("div");
  typingIndicator.id = "typing_indicator";
  typingIndicator.classList.add("typing_indicator");
  if (isAboveInput)
    typingIndicator.classList.add("typing_indicator_above_input");
  if (settings.position === "full_width_banner")
    typingIndicator.classList.add("typing_indicator_full_width");
  if (settings.position === "floating_bottom") {
    typingIndicator.classList.add("typing_indicator_floating");
    const sendForm = document.getElementById("send_form");
    const memoryTable = document.getElementById("tableStatusContainer");
    let bottomOffset = 1;
    if (sendForm) bottomOffset += sendForm.offsetHeight;
    if (memoryTable && getComputedStyle(memoryTable).display !== "none")
      bottomOffset += memoryTable.offsetHeight;
    typingIndicator.style.bottom = `${bottomOffset}px`;
  }
  typingIndicator.innerHTML = htmlContent;
  $(typingIndicator).hide();

  if (isAboveInput)
    parentContainer.parentNode.insertBefore(typingIndicator, parentContainer);
  else parentContainer.appendChild(typingIndicator);

  const chat = document.getElementById("chat");
  const wasChatScrolledDown =
    Math.ceil(chat.scrollTop + chat.clientHeight) >= chat.scrollHeight;
  $(typingIndicator).show(() => {
    if (
      !isAboveInput &&
      !settings.position === "floating_bottom" &&
      wasChatScrolledDown
    ) {
      const computedStyle = getComputedStyle(typingIndicator);
      const bottomOffset =
        parseInt(computedStyle.bottom) + parseInt(computedStyle.marginBottom);
      chat.scrollTop += typingIndicator.clientHeight + bottomOffset;
    }
  });
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing_indicator");
  if (typingIndicator) $(typingIndicator).hide(() => typingIndicator.remove());
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

    section.innerHTML = `
            <div class="inline-drawer"><div class="inline-drawer-toggle inline-drawer-header"><b>${t`Typing Indicator Themes`}</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>
            <div class="inline-drawer-content" style="display: none; flex-direction: column; gap: 15px;">
                <div>
                    <label class="checkbox_label"><input type="checkbox" id="ti_enabled" ${
                      settings.enabled ? "checked" : ""
                    }>${t`Enabled`}</label>
                    <label class="checkbox_label"><input type="checkbox" id="ti_streaming" ${
                      settings.streaming ? "checked" : ""
                    }>${t`Show if streaming`}</label>
                    <label class="checkbox_label"><input type="checkbox" id="ti_show_animation" ${
                      settings.showAnimation ? "checked" : ""
                    }>${t`Show typing animation`}</label>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label for="ti_position">${t`Indicator Position`}:</label>
                    <select id="ti_position" class="text_pole" style="flex-grow: 1;">
                        <option value="floating_bottom" ${
                          settings.position === "floating_bottom"
                            ? "selected"
                            : ""
                        }>${t`Bottom of Chat (Floating)`}</option>
                        <option value="bottom" ${
                          settings.position === "bottom" ? "selected" : ""
                        }>${t`Bottom of Chat (Compact)`}</option>
                        <option value="above_input" ${
                          settings.position === "above_input" ? "selected" : ""
                        }>${t`Above Input Bar (Compact)`}</option>
                        <option value="full_width_banner" ${
                          settings.position === "full_width_banner"
                            ? "selected"
                            : ""
                        }>${t`Above Input Bar (Full-Width Banner)`}</option>
                    </select>
                </div><hr>
                <div>
                    <h4>${t`Indicator Text Presets`}</h4><p>${t`Select a preset to edit or switch.`}</p>
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
                        <select id="ti_preset_select" class="text_pole" style="flex-grow: 1;"></select>
                        <button id="ti_preset_add" class="menu_button fa-solid fa-plus" title="${t`Add New Preset`}"></button>
                        <button id="ti_preset_del" class="menu_button fa-solid fa-trash-can" title="${t`Delete Preset`}"></button>
                        <button id="ti_preset_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
                        <button id="ti_preset_import" class="menu_button fa-solid fa-file-import" title="${t`Import`}"></button>
                        <button id="ti_preset_export" class="menu_button fa-solid fa-file-export" title="${t`Export`}"></button>
                    </div>
                    <textarea id="ti_preset_text" class="text_pole" rows="3"></textarea>
                </div><hr>
                <div>
                    <h4>${t`Indicator Style Themes`}</h4><p>${t`Select a theme to edit or switch.`}</p>
                    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
                        <select id="ti_theme_select" class="text_pole" style="flex-grow: 1;"></select>
                        <button id="ti_theme_add" class="menu_button fa-solid fa-plus" title="${t`Add New Theme`}"></button>
                        <button id="ti_theme_del" class="menu_button fa-solid fa-trash-can" title="${t`Delete Theme`}"></button>
                        <button id="ti_theme_save" class="menu_button fa-solid fa-save" title="${t`Save`}"></button>
                        <button id="ti_theme_import" class="menu_button fa-solid fa-file-import" title="${t`Import`}"></button>
                        <button id="ti_theme_export" class="menu_button fa-solid fa-file-export" title="${t`Export`}"></button>
                    </div>
                    <textarea id="ti_theme_css" class="text_pole" rows="10" style="margin-top: 5px;"></textarea>
                </div>
            </div></div>`;

    container.appendChild(section);

    const tiPresetSelect = section.querySelector("#ti_preset_select");
    const tiThemeSelect = section.querySelector("#ti_theme_select");
    const tiPresetText = section.querySelector("#ti_preset_text");
    const tiThemeCss = section.querySelector("#ti_theme_css");
    const newDrawerToggle = section.querySelector(".inline-drawer-toggle");

    const populatePresets = () => {
      const currentId = settings.selectedTextPresetId;
      tiPresetSelect.innerHTML = settings.textPresets
        .map(
          (p) =>
            `<option value="${p.id}" ${p.id === currentId ? "selected" : ""}>${
              p.name
            }</option>`
        )
        .join("");
      const selectedPreset =
        settings.textPresets.find((p) => p.id === currentId) ||
        settings.textPresets[0];
      tiPresetText.value = selectedPreset.text;
      if (settings.selectedTextPresetId !== selectedPreset.id)
        settings.selectedTextPresetId = selectedPreset.id;
    };
    const populateThemes = () => {
      const currentId = settings.selectedThemeId;
      tiThemeSelect.innerHTML = settings.themes
        .map(
          (theme) =>
            `<option value="${theme.id}" ${
              theme.id === currentId ? "selected" : ""
            }>${theme.name}</option>`
        )
        .join("");
      const selectedTheme =
        settings.themes.find((theme) => theme.id === currentId) ||
        settings.themes[0];
      tiThemeCss.value = selectedTheme.css;
      if (settings.selectedThemeId !== selectedTheme.id)
        settings.selectedThemeId = selectedTheme.id;
    };

    populatePresets();
    populateThemes();

    if (isDrawerOpen) {
      newDrawerToggle.classList.add("open");
      section.querySelector(".inline-drawer-content").style.display = "flex";
    }

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
    section.querySelector("#ti_position").addEventListener("change", (e) => {
      settings.position = e.target.value;
      saveSettingsDebounced();
    });

    tiPresetSelect.addEventListener("change", () => {
      settings.selectedTextPresetId = tiPresetSelect.value;
      populatePresets();
      saveSettingsDebounced();
    });
    section.querySelector("#ti_preset_save").addEventListener("click", () => {
      const p = settings.textPresets.find((p) => p.id === tiPresetSelect.value);
      if (p) {
        p.text = tiPresetText.value;
        saveSettingsDebounced();
        toastr.success(`${t`Preset`} "${p.name}" ${t`saved`}.`);
      }
    });
    section.querySelector("#ti_preset_add").addEventListener("click", () => {
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
    section.querySelector("#ti_preset_del").addEventListener("click", () => {
      if (settings.textPresets.length <= 1) {
        toastr.warning(t`Cannot delete the last preset.`);
        return;
      }
      const p = settings.textPresets.find((p) => p.id === tiPresetSelect.value);
      const msg = `你确定要删除方案 "${p?.name}" 吗？`;
      if (confirm(msg)) {
        settings.textPresets = settings.textPresets.filter(
          (pr) => pr.id !== p.id
        );
        settings.selectedTextPresetId = settings.textPresets[0].id;
        populatePresets();
        saveSettingsDebounced();
      }
    });

    tiThemeSelect.addEventListener("change", () => {
      settings.selectedThemeId = tiThemeSelect.value;
      populateThemes();
      applyTheme(settings.selectedThemeId);
      saveSettingsDebounced();
    });
    section.querySelector("#ti_theme_save").addEventListener("click", () => {
      const themeToSave = settings.themes.find(
        (theme) => theme.id === tiThemeSelect.value
      );
      if (themeToSave) {
        themeToSave.css = tiThemeCss.value;
        applyTheme(themeToSave.id);
        saveSettingsDebounced();
        toastr.success(`${t`Theme`} "${themeToSave.name}" ${t`saved`}.`);
      }
    });
    section.querySelector("#ti_theme_add").addEventListener("click", () => {
      const n = prompt(t`Theme Name`);
      if (n) {
        const newTheme = {
          id: Date.now().toString(),
          name: n,
          css: `.typing_indicator {\n\n}`,
        };
        settings.themes.push(newTheme);
        settings.selectedThemeId = newTheme.id;
        populateThemes();
        applyTheme(newTheme.id);
        saveSettingsDebounced();
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
      const msg = `你确定要删除主题 "${themeToDelete?.name}" 吗？`;
      if (confirm(msg)) {
        settings.themes = settings.themes.filter(
          (th) => th.id !== themeToDelete.id
        );
        settings.selectedThemeId = "default";
        populateThemes();
        applyTheme("default");
        saveSettingsDebounced();
      }
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
            const validation =
              type === "theme"
                ? imported.name && imported.css
                : imported.name && imported.text;
            if (!validation) throw new Error(`Invalid ${type} format.`);
            const newItem = {
              id: imported.id || Date.now().toString(),
              name: imported.name,
              ...(type === "theme"
                ? { css: imported.css }
                : { text: imported.text }),
            };
            const existingIndex = list.findIndex(
              (item) => item.id === newItem.id
            );
            if (existingIndex !== -1) {
              list[existingIndex] = newItem;
            } else {
              list.push(newItem);
            }
            onImported(newItem.id);
            populateFn();
            saveSettingsDebounced();

            const typeString = type === "theme" ? t`Theme` : t`Preset`;
            toastr.success(`${typeString} "${newItem.name}" ${t`imported`}.`);
          } catch (error) {
            const errorString =
              type === "theme"
                ? t`Failed to import theme`
                : t`Failed to import preset`;
            toastr.error(`${errorString}: ${error.message}`);
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
    section.querySelector("#ti_theme_import").addEventListener("click", () =>
      createImportHandler("theme", settings.themes, populateThemes, (id) => {
        settings.selectedThemeId = id;
        applyTheme(id);
      })
    );

    const createExportHandler = (type, list, selectedId) => {
      const item = list.find((i) => i.id === selectedId);
      if (!item) return;
      const blob = new Blob([JSON.stringify(item, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.name.replace(/[\\/*?:"<>|]/g, "_")}.json`;
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
        createExportHandler("theme", settings.themes, settings.selectedThemeId)
      );
  };

  render();
}

(function () {
  applyTheme(getSettings().selectedThemeId);
  const showIndicatorEvents = [event_types.GENERATION_AFTER_COMMANDS];
  const hideIndicatorEvents = [
    event_types.GENERATION_STOPPED,
    event_types.GENERATION_ENDED,
    event_types.CHAT_CHANGED,
  ];
  showIndicatorEvents.forEach((e) => eventSource.on(e, showTypingIndicator));
  hideIndicatorEvents.forEach((e) => eventSource.on(e, hideTypingIndicator));
  addExtensionSettings();
})();
