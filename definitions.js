const presets = [
  {
    id: "cat_default",
    name: "猫猫风格",
    text: `...🐈‍⬛‧˚🐾✧{{char}}回复中`,
    isBuiltIn: true,
  },
  {
    id: "original",
    name: "SillyTavern Style",
    text: `{{char}} is typing...`,
    isBuiltIn: true,
  },
  {
    id: "player_love_you",
    name: "《𝙇𝙤𝙫𝙚 𝙮𝙤𝙪》播放器",
    text: `{{char}}'s Radio <br>正在播放《𝙇𝙤𝙫𝙚 𝙮𝙤𝙪》━●──5:20<br>⇆ㅤㅤ  ㅤ◁ㅤ  ㅤ❚❚ㅤ  ㅤ▷ㅤㅤㅤ↻`,
    isBuiltIn: true,
  },
  {
    id: "pixel_blackboard",
    name: "像素小黑板",
    text: `<pre id="kaomoji-indicator">\n    ∧,,∧      <span class="heart-sparkle">♡</span>\n   ( •ω• ) <span class="heart-breath">♡</span>\n┏-∪-∪━━━━━━┓\n│ <span class="char-name">{{char}}</span>\n│ 在码字了<span class="typing-dots">...</span>      ｜\n┗━━━━━━━━━┛\n</pre>`,
    isBuiltIn: true,
  },
  {
    id: "retro_pgear",
    name: "复古P-GEAR",
    text: `<div id="pixel-player">\n    <div class="player-header">\n        <span>{{char}}'s P-GEAR</span>\n        <div class="header-lights">\n            <i class="light-red"></i><i class="light-green"></i>\n        </div>\n    </div>\n    <div class="player-screen">\n        <div class="track-info">\n            <span class="track-title">>> ANALYZING INPUT...</span>\n        </div>\n        <div class="progress-bar">\n            <div class="progress-line"></div>\n            <div class="progress-dot"></div>\n            <span class="time">LOADING</span>\n        </div>\n    </div>\n    <div class="player-controls">\n        <div class="d-pad-container">\n            <div class="d-pad">\n                <div class="d-pad-center"></div>\n            </div>\n        </div>\n        <div class="ab-select-start-container">\n            <span class="btn-a">A</span>\n            <span class="btn-b">B</span>\n            <span class="btn-select">SELECT</span>\n            <span class="btn-start">START</span>\n        </div>\n    </div>\n</div>`,
    isBuiltIn: true,
  },
  {
    id: "pixel_mint_green",
    name: "像素薄荷绿",
    text: `<div class="radio-theme-wrapper">\n  <div class="player-container">\n    <img class="background-pixel-art" src="https://i.imgur.com/WOlrha3.png" alt="Radio Background">\n    <div class="top-panel">\n      <div class="title">{{char}}'s Radio</div>\n    </div>\n    <div class="main-content">\n      <div class="now-playing-line">\n        <span class="music-note">♪</span> Now Playing <span class="music-note">♪</span>\n      </div>\n      <div class="song-title">《Love you》</div>\n      <div class="progress-bar-container">\n        <div class="progress-track">\n          <div class="progress-thumb">\n            <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; shape-rendering: crispEdges;"><path d="M4 1C2.34315 1 1 2.34315 1 4C1 5.48422 1.83883 7.21854 3.23607 8.61577C4.6333 10.013 6.43585 11.2332 8 12.3588C9.56415 11.2332 11.3667 10.013 12.7639 8.61577C14.1612 7.21854 15 5.48422 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4H7C7 2.34315 5.65685 1 4 1Z" fill="#FF7BAC" stroke="#FFFFFF" stroke-width="2"/></svg>\n          </div>\n        </div>\n        <div class="timestamp">5:20</div>\n      </div>\n    </div>\n    <div class="bottom-panel">\n      <div class="controls-container">\n        <div class="control-btn small-btn"><span>⇆</span></div>\n        <div class="control-btn"><span>ᐊ</span></div>\n        <div class="control-btn play-pause-btn"><span>❚❚</span></div>\n        <div class="control-btn"><span>ᐅ</span></div>\n        <div class="control-btn small-btn"><span>↻</span></div>\n      </div>\n    </div>\n  </div>\n</div>`,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_loading",
    name: "心跳加载中",
    text: `<div class="pixel-heart-indicator">\n    <img class="bg-image" src="https://i.imgur.com/VsLl9fw.png" alt="Typing Indicator Background">\n    <div class="content-wrapper">\n        <svg class="loading-heart-svg" viewBox="0 0 100 90">\n            <path class="heart-path-bg" d="M50 90 L0 50 L0 35 L30 15 L50 30 L70 15 L100 35 L100 50 Z"/>\n            <path class="heart-path-fg" d="M50 90 L0 50 L0 35 L30 15 L50 30 L70 15 L100 35 L100 50 Z"/>\n        </svg>\n        <div class="text-container">\n            <div class="line line1"><span class="typing-text char-name-line">{{char}}</span></div>\n            <div class="line line2"><span class="typing-text">的心跳</span></div>\n            <div class="line line3"><span class="typing-text">加载中</span></div>\n            <div class="line line4"></div>\n        </div>\n        <div class="floating-particles">\n            <span></span><span></span><span></span>\n        </div>\n    </div>\n</div>`,
    isBuiltIn: true,
  },
  {
    id: "night_mare",
    name: "夜骐",
    text: `<div class="aether-miracle-stage">
  <p class="thestral-text">ℌ𝔬𝔬𝔣𝔟𝔢𝔞𝔱𝔰 𝔞𝔯𝔢 𝔞𝔭𝔭𝔯𝔬𝔞𝔠𝔥𝔦𝔫𝔤 𝔣𝔯𝔬𝔪 𝔞𝔣𝔞𝔯...</p>
  <div class="thestral-actor">
    <img class="thestral-image" src="https://i.imgur.com/EFLEB1z.png" alt="Thestral">
  </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "black_scroll",
    name: "黑色卷轴",
    text: `<div class="scroll-container">
  <img class="scroll-image" src="https://i.imgur.com/5xIx6LB.png" alt="Ornate Scroll">
  <p class="scroll-text">Destiny Awaits</p>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_line_pink",
    name: "心跳线-粉白",
    text: `<div class="heartbeat-container-refined">
    <div class="heartbeat-line-wrapper">
        <svg class="heartbeat-svg" viewBox="0 0 180 50">
            <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ff85b2" />
                    <stop offset="50%" stop-color="#ffffff" />
                    <stop offset="100%" stop-color="#ff69b4" />
                </linearGradient>
                <filter id="heartGlow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path class="heartbeat-path-bg"
                  d="M5,25 h35 l5,-15 l5,30 l5,-25 l5,10 h10 m12,-2 c0,-6 12,-6 12,3 c0,6 -6,10 -12,16 c-6,-6 -12,-10 -12,-16 c0,-9 12,-9 12,-3 m12,3 h10 l5,-10 l5,25 l5,-30 l5,15 h35"></path>
            <path class="heartbeat-path-fg"
                  d="M5,25 h35 l5,-15 l5,30 l5,-25 l5,10 h10 m12,-2 c0,-6 12,-6 12,3 c0,6 -6,10 -12,16 c-6,-6 -12,-10 -12,-16 c0,-9 12,-9 12,-3 m12,3 h10 l5,-10 l5,25 l5,-30 l5,15 h35"></path>
        </svg>
    </div>
    <div class="typing-text-container">
        <span class="char-name">{{char}}</span> is thinking<span class="ellipsis">...</span>
    </div>
    <div class="sparkle-particles">
        <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_line_black",
    name: "心跳线-黑红",
    text: `<div class="heartbeat-container-refined">
    <div class="heartbeat-line-wrapper">
        <svg class="heartbeat-svg" viewBox="0 0 180 50">
            <defs>
                <linearGradient id="gradient-left-to-heart" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ff1f1f" /><stop offset="100%" stop-color="#1a0000" />
                </linearGradient>
                <linearGradient id="gradient-right-to-heart" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1a0000" /><stop offset="100%" stop-color="#ff1f1f" />
                </linearGradient>
                <radialGradient id="gradient-black-heart">
                    <stop offset="0%" stop-color="#4d0000" /><stop offset="100%" stop-color="#000000" />
                </radialGradient>
            </defs>
            <path class="heartbeat-path-bg" d="M5,25 h35 l5,-15 l5,30 l5,-25 l5,10 h10 m12,-2 c0,-6 12,-6 12,3 c0,6 -6,10 -12,16 c-6,-6 -12,-10 -12,-16 c0,-9 12,-9 12,-3 m12,3 h10 l5,-10 l5,25 l5,-30 l5,15 h35"></path>
            <path class="heartbeat-line-left" d="M5,25 h35 l5,-15 l5,30 l5,-25 l5,10 h10"></path>
            <path class="heartbeat-heart" d="M82,23 c0,-6 12,-6 12,3 c0,6 -6,10 -12,16 c-6,-6 -12,-10 -12,-16 c0,-9 12,-9 12,-3"></path>
            <path class="heartbeat-line-right" d="M159,26 h-35 l-5,-15 l-5,30 l-5,-25 l-5,10 h-10"></path>
        </svg>
    </div>

    <div class="typing-text-container">
        <div class="char-name-line">
            <span class="char-name">{{char}}</span>
        </div>
        <div class="status-line">
            is plotting<span class="ellipsis">...</span>
        </div>
    </div>

    <div class="sparkle-particles">
        <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_line_purple",
    name: "心跳线-紫黑",
    text: `<div class="heartbeat-container-refined">
    <div class="heartbeat-line-wrapper">
        <svg class="heartbeat-svg" viewBox="0 0 180 50">
            <defs>
                <linearGradient id="gradient-left-to-void" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#c56eff" /><stop offset="100%" stop-color="#1a0d24" />
                </linearGradient>
                <linearGradient id="gradient-right-to-void" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1a0d24" /><stop offset="100%" stop-color="#c56eff" />
                </linearGradient>

                <radialGradient id="gradient-void-heart">
                    <stop offset="0%" stop-color="#6c00b0" />
                    <stop offset="100%" stop-color="#000000" />
                </radialGradient>
            </defs>

            <path class="heartbeat-path-bg"
                  d="M5,25 h35 l5,-15 l5,30 l5,-25 l5,10 h10 m12,-2 c0,-6 12,-6 12,3 c0,6 -6,10 -12,16 c-6,-6 -12,-10 -12,-16 c0,-9 12,-9 12,-3 m12,3 h10 l5,-10 l5,25 l5,-30 l5,15 h35"></path>

            <path class="heartbeat-line-left" d="M5,25 h35 l5,-15 l5,30 l5,-25 l5,10 h10"></path>
            <path class="heartbeat-heart" d="M82,23 c0,-6 12,-6 12,3 c0,6 -6,10 -12,16 c-6,-6 -12,-10 -12,-16 c0,-9 12,-9 12,-3"></path>
            <path class="heartbeat-line-right" d="M159,26 h-35 l-5,-15 l-5,30 l-5,-25 l-5,10 h-10"></path>
        </svg>
    </div>

    <div class="typing-text-container">
        <div class="char-name-line"><span class="char-name">{{char}}</span></div>
        <div class="status-line">is plotting<span class="ellipsis">...</span></div>
    </div>

    <div class="sparkle-particles">
        <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "listen_to_the_heartbeat",
    name: "聆听心跳",
    text: `<div class="heartbeat-container">
    <svg class="hbg-border-svg" width="100%" height="100%">
        <rect class="hbg-marching-ants-border" width="100%" height="100%" rx="12" ry="12"/>
    </svg>

    <div class="char-name-wrapper">{{char}}</div>
    <div class="typing-subtitle">
        <span class="typing-text">正在输入</span>
        <span class="loading-heart">❤</span><span class="loading-heart">❤</span><span class="loading-heart">❤</span>
    </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "dinner_party",
    name: "晚宴",
    text: `<div class="silver-feast-container">
    <img class="sf-background" src="https://i.imgur.com/VuUq5uy.png" alt="Silver Plate Setting">

    <div class="sf-avatar-wrapper">
        <img class="sf-avatar" src="{{char_avatar_url}}" alt="{{char}}'s avatar">
    </div>

    <div class="sf-text-wrapper">
        <span class="sf-char-name">{{char}}</span>
        <span class="sf-typing-text"> is waiting...</span>
    </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "gothic style billboard",
    name: "哥特风告示牌",
    text: `<div class="gb-container">
  <img class="gb-background" src="https://i.imgur.com/4IfPduH.png" alt="Gothic decorative bar">
  <div class="gb-text-wrapper" aria-label="Scribentis...">
    <span>S</span><span>c</span><span>r</span><span>i</span><span>b</span><span>e</span><span>n</span><span>t</span><span>i</span><span>s</span><span>.</span><span>.</span><span>.</span>
  </div>
</div>`,
    isBuiltIn: true,
  },
  {
    id: "plain_paper_with_ink_charm",
    name: "素笺墨韵",
    text: `<div class="sim-container">
    <img class="sim-background" src="https://i.imgur.com/fzQtOoh.png" alt="Paper texture">
    <div class="sim-text-wrapper" aria-label="素笺墨韵...">
        <span>素</span><span>笺</span><span>墨</span><span>韵</span><span>…</span>
    </div>
    <img class="sim-flower sim-flower-left-main" src="https://i.imgur.com/KALz9Ls.png" alt="Flower silhouette">
    <img class="sim-flower sim-flower-left-sub" src="https://i.imgur.com/KALz9Ls.png" alt="Flower silhouette">
</div>`,
    isBuiltIn: true,
  },
  {
    id: "hesitant_to_speak",
    name: "欲语还休",
    text: `<div class="sdb-container">
    <img class="sdb-background" src="https://i.imgur.com/PWcstHJ.png" alt="Paper background with border">
    <div class="sdb-text-wrapper" aria-label="欲语还休...">
        <span>欲</span><span>语</span><span>还</span><span>休</span><span>…</span>
    </div>
    <img class="sdb-flower sdb-flower-left" src="https://i.imgur.com/KALz9Ls.png" alt="Flower silhouette">
    <img class="sdb-flower sdb-flower-right" src="https://i.imgur.com/KALz9Ls.png" alt="Flower silhouette">
</div>`,
    isBuiltIn: true,
  },
  {
    id: "troublemaker",
    name: "捣蛋鬼",
    text: `<div class="pg-container">
    <div class="pg-bubble">
        <img class="pg-ghost" src="https://i.imgur.com/qRicd7h.png" alt="Pixel Ghost">
        <div class="pg-text">
            <span>Trick or Treat</span>
        </div>
    </div>
    <div class="pg-avatar-container">
        {{char_avatar}}
    </div>
</div>`,
    isBuiltIn: true,
  },
];

// ===================================================================
//                        THEMES (样式主题)
// ===================================================================

// --- CSS 常量定义区 ---
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
.typing_indicator {
    position: relative;
}
.typing_indicator .typing_indicator_text::after {
    content: '☁️';
    position: absolute;
    right: 0px;
    bottom: -10px;
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
  --top-panel-top: 0%;
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

@media (max-width: 480px) {
  :root {
    --font-size-title: 11px;
    --font-size-now-playing: 9px;
    --top-panel-top: -1%;
  }
}
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

const NIGHT_MARE_CSS = `
:root {
    --journey-duration: 8s;
    --journey-delay: 0s;

    --thestral-image-size: 50px;
    --vertical-float-height: 8px;
    --vertical-float-duration: 10s;
    --min-opacity: 0;
    --vertical-gap: 0px;

    --thestral-base-color: rgba(160, 160, 160, 0.3);
    --thestral-ink-color: #2c2c2c;
    --thestral-font-size: 20px;
    --ink-animation-duration: var(--journey-duration);
}

.typing_indicator .svg_dots { display: none !important; }

.aether-miracle-stage {
    display: inline-block;
    position: relative;
    padding: 0 0 8px 0;
    vertical-align: middle;
}

.thestral-text {
    font-size: var(--thestral-font-size);
    font-weight: 500;
    background: linear-gradient(to right,
        var(--thestral-ink-color) 50%, var(--thestral-ink-color) 50%,
        var(--thestral-base-color) 50%, var(--thestral-base-color)
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: ink-reveal var(--ink-animation-duration) linear infinite;
    animation-delay: calc(var(--journey-delay) / 2);
}

.thestral-actor {
    position: absolute;
    bottom: calc(100% + var(--vertical-gap));
    left: 0;
    width: var(--thestral-image-size);
    height: var(--thestral-image-size);
    animation:
        horizontal-patrol var(--journey-duration) ease-in-out var(--journey-delay) infinite,
        vertical-float var(--vertical-float-duration) ease-in-out infinite alternate;
}

.thestral-image {
    width: 100%;
    height: 100%;
}

@keyframes horizontal-patrol {
    0%   { left: 0%; transform: translateX(-50%); opacity: var(--min-opacity); }
    15%  { left: 0%; transform: translateX(0); opacity: 1; }
    85%  { left: 100%; transform: translateX(-100%); opacity: 1; }
    100% { left: 100%; transform: translateX(-50%); opacity: var(--min-opacity); }
}

@keyframes vertical-float {
    from { transform: translateY(0); }
    to { transform: translateY(var(--vertical-float-height)); }
}
@keyframes ink-reveal {
    from { background-position: 100% 0; }
    to { background-position: 0% 0; }
}

@media (max-width: 480px) {
    :root {
        --thestral-image-size: 40px;
        --thestral-font-size: 18px;
        --vertical-gap: 0px;
    }
}
}`;

const BLACK_SCROLL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');

:root {
  --scroll-loop-duration: 8s;
}

.typing_indicator .svg_dots { display: none !important; }

.scroll-container {
  width: 100%;
  max-width: 500px;
  position: relative;
}

.scroll-image {
  display: block;
  width: 100%;
  mask-image: linear-gradient(to right, black, black);
  mask-repeat: no-repeat;
  mask-position: center;
  animation: scroll-breathe var(--scroll-loop-duration) infinite ease-in-out;
}

.scroll-text {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Cinzel Decorative', cursive;
  font-size: 22px;
  white-space: nowrap;
  color: #a0a0a0;

  text-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.7),
    -1px -1px 1px rgba(255, 255, 255, 0.15);

  animation: reveal-text-synced var(--scroll-loop-duration) infinite ease-in-out;
}

@keyframes scroll-breathe {
  0%, 100% { opacity: 0; mask-size: 0% 100%; transform: scale(0.95); }
  20% { opacity: 1; transform: scale(1); }
  40% { mask-size: 100% 100%; }
  60% { mask-size: 100% 100%; opacity: 1; transform: scale(1); }
  100% { opacity: 0; mask-size: 0% 100%; transform: scale(0.95); }
}

@keyframes reveal-text-synced {
  0%, 5% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  95%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
}

@media(max-width: 480px) {
  .scroll-container { max-width: 300px; }
  .scroll-text { font-size: 16px; }
}
}`;

const HEARTBEAT_LINE_PINK_CSS = `
.typing_indicator .svg_dots {
    display: none !important;
}

.typing_indicator {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    overflow: visible;
    width: 100%;
    max-width: 380px;
    margin: 15px auto !important;
    position: relative;
}

.typing_indicator .heartbeat-container-refined {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    padding: 20px;
}

.typing_indicator .heartbeat-line-wrapper {
    width: 100%;
}
.typing_indicator .heartbeat-svg {
    width: 100%;
    height: auto;
    overflow: visible;
}

.typing_indicator .heartbeat-path-bg,
.typing_indicator .heartbeat-path-fg {
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
}

.typing_indicator .heartbeat-path-bg {
    stroke: rgba(255, 182, 193, 0.2);
}

.typing_indicator .heartbeat-path-fg {
    stroke: url(#heartGradient);
    stroke-dasharray: 360;
    stroke-dashoffset: 360;
    filter: drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 4px #ff69b4);

    animation:
        ti-heart-draw-line 3s ease-in-out infinite,
        ti-heart-pulse-glow 1.5s infinite alternate;
}

.typing_indicator .typing-text-container {
    font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
    color: #fce4ec;
    font-size: 0.9em;
    text-shadow: 0 0 5px #ff69b4, 0 0 10px rgba(255, 105, 180, 0.5);
    animation: ti-text-fade-in 3s ease-in-out infinite;
}

.typing_indicator .char-name {
    font-weight: bold;
    color: #fff;
}

.typing_indicator .ellipsis {
    display: inline-block;
    width: 1.2em;
    text-align: left;
    animation: ti-ellipsis-anim 1.5s steps(4, end) infinite;
}

.typing_indicator .sparkle-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
}

.typing_indicator .sparkle-particles span {
    position: absolute;
    bottom: 30%;
    opacity: 0;
    font-size: 14px;
    color: #ffb6c1;
    animation: ti-particle-float 4s ease-out infinite;
}

.typing_indicator .sparkle-particles span::before {
    content: '♥';
    text-shadow: 0 0 5px #ff69b4;
}

.typing_indicator .sparkle-particles span:nth-child(1) { left: 48%; animation-delay: 0s; font-size: 16px; }
.typing_indicator .sparkle-particles span:nth-child(2) { left: 52%; animation-delay: 0.5s; }
.typing_indicator .sparkle-particles span:nth-child(3) { left: 45%; animation-delay: 1.2s; font-size: 12px; }
.typing_indicator .sparkle-particles span:nth-child(4) { left: 55%; animation-delay: 1.8s; }
.typing_indicator .sparkle-particles span:nth-child(5) { left: 40%; animation-delay: 2.5s; font-size: 14px; }
.typing_indicator .sparkle-particles span:nth-child(6) { left: 60%; animation-delay: 3.2s; }

@keyframes ti-heart-draw-line {
    0% { stroke-dashoffset: 360; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 0; }
}

@keyframes ti-heart-pulse-glow {
    from {
        stroke-width: 1.5;
        filter: drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 4px #ff69b4) drop-shadow(0 0 6px #ff1493);
    }
    to {
        stroke-width: 2;
        filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 8px #ff69b4) drop-shadow(0 0 12px #ff1493);
    }
}

@keyframes ti-text-fade-in {
    0%, 20% { opacity: 0; }
    40%, 100% { opacity: 1; }
}

@keyframes ti-ellipsis-anim {
    0% { content: "."; }
    33% { content: ".."; }
    66% { content: "..."; }
    100% { content: "..."; }
}
@keyframes ti-ellipsis-anim {
    to {
        text-indent: -9999px;
    }
}
.typing_indicator .ellipsis::after {
    content: '.';
    animation: ti-ellipsis-dots 1.5s steps(3, start) infinite;
}
@keyframes ti-ellipsis-dots {
    33% { content: '..'; }
    66% { content: '...'; }
}

@keyframes ti-particle-float {
    0% {
        transform: translateY(0) scale(0.5);
        opacity: 0;
    }
    20%, 80% {
        opacity: 1;
    }
    100% {
        transform: translateY(-80px) scale(1.2);
        opacity: 0;
    }
}
}`;

const HEARTBEAT_LINE_BLACK_CSS = `
:root {
    --vertical-text-gap: -10px;
    --horizontal-padding: 25px;
    --text-horizontal-offset: -10px;
}

.typing_indicator .svg_dots { display: none !important; }
.typing_indicator { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; overflow: visible; width: 100%; max-width: 380px; margin: 15px auto !important; position: relative; }

.typing_indicator .heartbeat-container-refined {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    position: relative;
    padding: 20px var(--horizontal-padding);
}

.typing_indicator .heartbeat-line-wrapper { width: 100%; }
.typing_indicator .heartbeat-svg { width: 100%; height: auto; overflow: visible; }
.typing_indicator .heartbeat-path-bg { stroke: rgba(139, 0, 0, 0.15); stroke-width: 1.5; fill: none; }
.typing_indicator .heartbeat-heart { fill: url(#gradient-black-heart); stroke: none; animation: ti-text-fade-in 3s ease-in-out infinite; filter: drop-shadow(0 0 4px #330000); }
.typing_indicator .heartbeat-line-left, .typing_indicator .heartbeat-line-right { stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; fill: none; filter: drop-shadow(0 0 2px #ff4d4d) drop-shadow(0 0 5px #ff0000); stroke-dasharray: 150; stroke-dashoffset: 150; animation: ti-heart-draw-line-converge 3s ease-in-out infinite, ti-heart-pulse-glow-redonly 1.5s infinite alternate; }
.typing_indicator .heartbeat-line-left { stroke: url(#gradient-left-to-heart); }
.typing_indicator .heartbeat-line-right { stroke: url(#gradient-right-to-heart); }

.typing_indicator .typing-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    margin-top: var(--vertical-text-gap);
    animation: ti-text-fade-in 3s ease-in-out infinite;
    transform: translateX(var(--text-horizontal-offset));
}
.typing_indicator .char-name-line { }
.typing_indicator .status-line { font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; color: #c0c0c0; font-size: 0.85em; text-shadow: 0 0 4px rgba(255, 0, 0, 0.7); }
.typing_indicator .char-name { font-weight: bold; color: #fff; font-size: 1.1em; text-shadow: 0 0 2px #fff, 0 0 6px #ff1f1f, 0 0 12px #b80000; animation: ti-char-name-flame-flicker 2s linear infinite; }
.typing_indicator .ellipsis::after { content: '.'; animation: ti-ellipsis-dots 1.5s steps(3, start) infinite; }

.typing_indicator .sparkle-particles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; }
.typing_indicator .sparkle-particles span { position: absolute; bottom: 30%; opacity: 0; font-size: 14px; animation: ti-particle-float 4s ease-out infinite; }
.typing_indicator .sparkle-particles span::before { content: '❤'; color: #111; text-shadow: 0 0 3px #550000; }
.typing_indicator .sparkle-particles span:nth-child(1) { left: 48%; animation-delay: 0s; font-size: 16px; } .typing_indicator .sparkle-particles span:nth-child(2) { left: 52%; animation-delay: 0.5s; } .typing_indicator .sparkle-particles span:nth-child(3) { left: 45%; animation-delay: 1.2s; font-size: 12px; } .typing_indicator .sparkle-particles span:nth-child(4) { left: 55%; animation-delay: 1.8s; } .typing_indicator .sparkle-particles span:nth-child(5) { left: 40%; animation-delay: 2.5s; font-size: 14px; } .typing_indicator .sparkle-particles span:nth-child(6) { left: 60%; animation-delay: 3.2s; }

@keyframes ti-heart-draw-line-converge { 0% { stroke-dashoffset: 150; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
@keyframes ti-heart-pulse-glow-redonly { from { stroke-width: 1.8; filter: drop-shadow(0 0 2px #ff4d4d) drop-shadow(0 0 5px #ff0000); } to { stroke-width: 2.2; filter: drop-shadow(0 0 3px #ff6666) drop-shadow(0 0 8px #ff0000); } }
@keyframes ti-char-name-flame-flicker { 0%, 100% { text-shadow: 0 0 2px #fff, 0 0 6px #ff1f1f, 0 0 12px #b80000; opacity: 1; } 25% { text-shadow: 0 0 3px #fff, 0 0 8px #ff4d4d, 0 0 15px #b80000; opacity: 0.95; } 50% { text-shadow: 0 0 2px #fff, 0 0 5px #ff1f1f, 0 0 10px #b80000; opacity: 1; } 75% { text-shadow: 0 0 4px #fff, 0 0 10px #ff4d4d, 0 0 18px #b80000; opacity: 0.9; } }
@keyframes ti-text-fade-in { 0%, 20% { opacity: 0; } 40%, 100% { opacity: 1; } }
@keyframes ti-ellipsis-dots { 33% { content: '..'; } 66% { content: '...'; } }
@keyframes ti-particle-float { 0% { transform: translateY(0) scale(0.5); opacity: 0; } 20%, 80% { opacity: 1; } 100% { transform: translateY(-80px) scale(1.2); opacity: 0; } }
}`;

const HEARTBEAT_LINE_PURPLE_CSS = `
:root {
    --vertical-text-gap: -10px;
    --horizontal-padding: 25px;
    --text-horizontal-offset: -10px;
}

.typing_indicator .svg_dots { display: none !important; }
.typing_indicator { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; overflow: visible; width: 100%; max-width: 380px; margin: 15px auto !important; position: relative; }
.typing_indicator .heartbeat-container-refined { display: flex; flex-direction: column; align-items: center; gap: 0; position: relative; padding: 20px var(--horizontal-padding); }

.typing_indicator .heartbeat-line-wrapper { width: 100%; }
.typing_indicator .heartbeat-svg { width: 100%; height: auto; overflow: visible; }
.typing_indicator .heartbeat-path-bg { stroke: rgba(108, 2, 175, 0.2); stroke-width: 1.5; fill: none; }

.typing_indicator .heartbeat-heart {
    fill: url(#gradient-void-heart);
    stroke: none;
    animation: ti-text-fade-in 3s ease-in-out infinite;
    filter: drop-shadow(0 0 5px #420369);
}

.typing_indicator .heartbeat-line-left, .typing_indicator .heartbeat-line-right {
    stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; fill: none;
    filter: drop-shadow(0 0 2px #d98dff) drop-shadow(0 0 5px #a13dff);
    stroke-dasharray: 150; stroke-dashoffset: 150;
    animation:
        ti-heart-draw-line-converge 3s ease-in-out infinite,
        ti-heart-pulse-glow-void 1.5s infinite alternate;
}
.typing_indicator .heartbeat-line-left { stroke: url(#gradient-left-to-void); }
.typing_indicator .heartbeat-line-right { stroke: url(#gradient-right-to-void); }

.typing_indicator .typing-text-container { display: flex; flex-direction: column; align-items: center; gap: 2px; margin-top: var(--vertical-text-gap); animation: ti-text-fade-in 3s ease-in-out infinite; transform: translateX(var(--text-horizontal-offset)); }
.typing_indicator .char-name-line {  }
.typing_indicator .status-line { font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; color: #d9c8ff; font-size: 0.85em; text-shadow: 0 0 4px rgba(173, 66, 245, 0.7); }
.typing_indicator .char-name { font-weight: bold; color: #fff; font-size: 1.1em; text-shadow: 0 0 2px #fff, 0 0 6px #c56eff, 0 0 12px #6c00b0; animation: ti-char-name-void-flicker 2s linear infinite; }
.typing_indicator .ellipsis::after { content: '.'; animation: ti-ellipsis-dots 1.5s steps(3, start) infinite; }

.typing_indicator .sparkle-particles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; }
.typing_indicator .sparkle-particles span { position: absolute; bottom: 30%; opacity: 0; font-size: 14px; animation: ti-particle-float 4s ease-out infinite; }
.typing_indicator .sparkle-particles span::before { content: '✦'; }
.typing_indicator .sparkle-particles span:nth-child(odd)::before {
    color: #c56eff; text-shadow: 0 0 5px #d98dff;
}
.typing_indicator .sparkle-particles span:nth-child(even)::before {
    color: #111; text-shadow: 0 0 3px #420369;
}
.typing_indicator .sparkle-particles span:nth-child(1) { left: 48%; animation-delay: 0s; font-size: 16px; } .typing_indicator .sparkle-particles span:nth-child(2) { left: 52%; animation-delay: 0.5s; } .typing_indicator .sparkle-particles span:nth-child(3) { left: 45%; animation-delay: 1.2s; font-size: 12px; } .typing_indicator .sparkle-particles span:nth-child(4) { left: 55%; animation-delay: 1.8s; } .typing_indicator .sparkle-particles span:nth-child(5) { left: 40%; animation-delay: 2.5s; font-size: 14px; } .typing_indicator .sparkle-particles span:nth-child(6) { left: 60%; animation-delay: 3.2s; }

@keyframes ti-heart-draw-line-converge { 0% { stroke-dashoffset: 150; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
@keyframes ti-heart-pulse-glow-void { from { stroke-width: 1.8; filter: drop-shadow(0 0 2px #d98dff) drop-shadow(0 0 5px #a13dff); } to { stroke-width: 2.2; filter: drop-shadow(0 0 3px #eac4ff) drop-shadow(0 0 8px #b468ff); } }
@keyframes ti-char-name-void-flicker { 0%, 100% { text-shadow: 0 0 2px #fff, 0 0 6px #c56eff, 0 0 12px #6c00b0; opacity: 1; } 25% { text-shadow: 0 0 3px #fff, 0 0 8px #d98dff, 0 0 15px #6c00b0; opacity: 0.95; } 50% { text-shadow: 0 0 2px #fff, 0 0 5px #c56eff, 0 0 10px #6c00b0; opacity: 1; } 75% { text-shadow: 0 0 4px #fff, 0 0 10px #d98dff, 0 0 18px #6c00b0; opacity: 0.9; } }
@keyframes ti-text-fade-in { 0%, 20% { opacity: 0; } 40%, 100% { opacity: 1; } }
@keyframes ti-ellipsis-dots { 33% { content: '..'; } 66% { content: '...'; } }
@keyframes ti-particle-float { 0% { transform: translateY(0) scale(0.5); opacity: 0; } 20%, 80% { opacity: 1; } 100% { transform: translateY(-80px) scale(1.2); opacity: 0; } }
}`;

const LISTEN_TO_THE_HEARTBEAT_CSS = `
:root {
    --hbg-pink-rgb: 255, 133, 178;
    --hbg-pink: rgb(var(--hbg-pink-rgb));
    --hbg-heart-color: #000000;
    --hbg-heart-glow-color: #ffc0cb;
    --hbg-container-glow-color: rgba(255, 192, 203, 0.7);
    --hbg-heart-font-size: 22px;
    --hbg-pulse-duration: 5.5s;
    --hbg-ants-speed: 0.8s;
}

.typing_indicator .svg_dots {
    display: none !important;
}

.heartbeat-container {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    padding: 2px 60px;
    border: 2px solid transparent;
    border-radius: 12px;
    background-color: rgba(var(--hbg-pink-rgb), 0.05);
    overflow: hidden;
    animation: hbg-glow-pulse 4s infinite ease-in-out;
}

.hbg-border-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

.hbg-marching-ants-border {
    fill: transparent;
    stroke: var(--hbg-pink);
    stroke-width: 2;

    stroke-dasharray: 8 4;

    animation: hbg-marching-ants var(--hbg-ants-speed) linear infinite;
}

.char-name-wrapper,
.typing-subtitle,
.heartbeat-container::before,
.heartbeat-container::after {
    position: relative;
    z-index: 2;
}

.char-name-wrapper {
    color: var(--hbg-pink);
    font-size: 16px;
    font-weight: bold;
    font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
}

.typing-subtitle {
    font-size: 13px;
    color: rgba(var(--hbg-pink-rgb), 0.85);
    display: flex;
    align-items: center;
}

.loading-heart {
    font-size: 15px;
    font-weight: bold;
    margin-left: 3px;
    opacity: 0;
    animation: hbg-fade-in-out-heart 1.8s infinite;
}

.loading-heart:nth-of-type(1) { animation-delay: 0s; }
.loading-heart:nth-of-type(2) { animation-delay: 0.3s; }
.loading-heart:nth-of-type(3) { animation-delay: 0.6s; }

.heartbeat-container::before,
.heartbeat-container::after {
    content: '🖤';
    color: var(--hbg-heart-color);
    font-size: var(--hbg-heart-font-size);
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    animation: hbg-heart-pulse var(--hbg-pulse-duration) infinite ease-in-out;
}

.heartbeat-container::before { left: 15px; }
.heartbeat-container::after { right: 15px; }

@keyframes hbg-marching-ants {
    to {

        stroke-dashoffset: -12;
    }
}
@keyframes hbg-glow-pulse {
    0%, 100% { box-shadow: 0 0 5px 0px transparent; }
    50% { box-shadow: 0 0 10px 2px var(--hbg-container-glow-color); }
}

@keyframes hbg-heart-pulse {
    0%, 100% {
        transform: translateY(-50%) scale(1);
        filter: drop-shadow(0 0 2px transparent);
    }
    50% {
        transform: translateY(-50%) scale(1.15);
        filter: drop-shadow(0 0 6px var(--hbg-heart-glow-color));
    }
}

@keyframes hbg-fade-in-out-heart {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
}

@media (max-width: 480px) {
    .char-name-wrapper {
        font-size: 14px;
        max-width: 120px;
    }
    .typing-subtitle { font-size: 12px; }
    .heartbeat-container { padding: 2px 45px; }

    .heartbeat-container::before { left: 10px; }
    .heartbeat-container::after { right: 10px; }
    .heartbeat-container::before,
    .heartbeat-container::after {
        font-size: 20px;
    }
}
}`;

const DINNER_PARTY_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

:root {
    --sf-animation-duration: 6s;
    --sf-text-color: var(--primary-text-color);
}

.typing_indicator .svg_dots {
    display: none !important;
}

.silver-feast-container {
    position: relative;
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Cinzel', serif;
}

.sf-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
}

.sf-avatar-wrapper {
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 2;
}

.sf-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(200, 200, 200, 0.5);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    animation: sf-spin var(--sf-animation-duration) linear infinite;
}

@keyframes sf-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.sf-text-wrapper {
    position: absolute;
    bottom: -20px;
    z-index: 3;
    color: var(--sf-text-color);
    text-align: center;
    width: 90%;
    text-shadow: 0 0 4px currentColor, 0 1px 5px rgba(0, 0, 0, 0.5);
}

.sf-char-name {
    font-weight: 700;
}

.sf-char-name, .sf-typing-text {
    display: block;
    white-space: nowrap;
}

.sf-char-name {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 auto;
}

@media (max-width: 480px) {
    .silver-feast-container {
        transform: scale(0.7);
    }
}
}`;

const GOTHIC_STYLE_BILLBOARD_CSS = `
@font-face {
    font-family: "ZSFT-dd";
    src: url("https://fontsapi.zeoseven.com/dd/main.woff2") format("woff2"),
         url("https://fontsapi-storage.zeoseven.com/dd/main.woff2") format("woff2");
    font-display: swap;
}

:root {
    --gb-width: 320px;
    --gb-height: 48px;
    --gb-text-color: #C5C5C5;
    --gb-highlight-color: rgba(220, 220, 220, 0.5);
    --gb-shadow-color: #2a2a2a;
    --gb-animation-duration: 4.5s;
    --gb-letter-delay: 0.12s;
}

.typing_indicator .svg_dots {
    display: none !important;
}

.gb-container {
    position: relative;
    width: var(--gb-width);
    height: var(--gb-height);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.gb-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
    filter: brightness(0.85) drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
}

.gb-text-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    font-family: "ZSFT-dd", "Uncial Antiqua", cursive;
    font-size: 18px;
    letter-spacing: 2px;
    top: 3.5px;
}

.gb-text-wrapper span {
    color: var(--gb-text-color);
    text-shadow:
        1px 1px 2px var(--gb-shadow-color),
        -0.5px -0.5px 1px var(--gb-highlight-color);
    opacity: 0;
    animation-name: gb-letter-appear;
    animation-duration: var(--gb-animation-duration);
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
}

@keyframes gb-letter-appear {
    0%, 100% {
        opacity: 0;
        transform: translateY(3px);
    }
    10%, 80% {
        opacity: 1;
        transform: translateY(0);
    }
}

.gb-text-wrapper span:nth-child(1) { animation-delay: calc(var(--gb-letter-delay) * 0); }
.gb-text-wrapper span:nth-child(2) { animation-delay: calc(var(--gb-letter-delay) * 1); }
.gb-text-wrapper span:nth-child(3) { animation-delay: calc(var(--gb-letter-delay) * 2); }
.gb-text-wrapper span:nth-child(4) { animation-delay: calc(var(--gb-letter-delay) * 3); }
.gb-text-wrapper span:nth-child(5) { animation-delay: calc(var(--gb-letter-delay) * 4); }
.gb-text-wrapper span:nth-child(6) { animation-delay: calc(var(--gb-letter-delay) * 5); }
.gb-text-wrapper span:nth-child(7) { animation-delay: calc(var(--gb-letter-delay) * 6); }
.gb-text-wrapper span:nth-child(8) { animation-delay: calc(var(--gb-letter-delay) * 7); }
.gb-text-wrapper span:nth-child(9) { animation-delay: calc(var(--gb-letter-delay) * 8); }
.gb-text-wrapper span:nth-child(10) { animation-delay: calc(var(--gb-letter-delay) * 9); }
.gb-text-wrapper span:nth-child(11) { animation-delay: calc(var(--gb-letter-delay) * 10); }
.gb-text-wrapper span:nth-child(12) { animation-delay: calc(var(--gb-letter-delay) * 11); }

@media (max-width: 480px) {
    :root {
        --gb-width: 260px;
        --gb-height: 40px;
    }
    .gb-text-wrapper {
        font-size: 15px;
        letter-spacing: 2px;
    }
}
}`;

const PLAIN_PAPER_WITH_INK_CHARM_CSS = `
@import url("https://fontsapi.zeoseven.com/419/main/result.css");

:root {
    --sim-width: 230px;
    --sim-height: 50px;
    --sim-animation-duration: 5s;
    --sim-letter-delay: 0.3s;
    --sim-flower-animation-duration: 8s;
    --sim-text-color: #2a2a2a;
}

.typing_indicator .svg_dots {
    display: none !important;
}

.sim-container {
    position: relative;
    width: var(--sim-width);
    height: var(--sim-height);
    font-family: "LanternMingA", serif;
    font-weight: normal;
    -webkit-mask-image: radial-gradient(ellipse 85% 100% at center, black 60%, transparent 100%);
    mask-image: radial-gradient(ellipse 85% 100% at center, black 60%, transparent 100%);
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    -webkit-tap-highlight-color: transparent;
}

.sim-container:hover,
.sim-container:active {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.sim-container::before, .sim-container::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    -webkit-mask-image: radial-gradient(ellipse 85% 100% at center, black 60%, transparent 100%);
    mask-image: radial-gradient(ellipse 85% 100% at center, black 60%, transparent 100%);
}

.sim-container::before {
    z-index: 1;
    background-image:
        radial-gradient(circle at 15% 20%, rgba(0,0,0,0.15) 5%, transparent 30%),
        radial-gradient(circle at 80% 90%, rgba(0,0,0,0.12) 8%, transparent 40%),
        radial-gradient(circle at 5% 85%, rgba(0,0,0,0.18) 4%, transparent 25%),
        radial-gradient(circle at 95% 15%, rgba(0,0,0,0.1) 10%, transparent 50%),
        radial-gradient(circle at 50% 5%, rgba(0,0,0,0.08) 12%, transparent 60%),
        radial-gradient(circle at 50% 95%, rgba(0,0,0,0.2) 6%, transparent 40%);
    animation: sim-border-shift 15s infinite linear;
}

.sim-container::after {
    z-index: 3;
    box-shadow: inset 0 0 1px 1px rgba(0,0,0,0.5);
}

@keyframes sim-border-shift {
    0% { background-position: 0 0; }
    50% { background-position: 10px 5px; }
    100% { background-position: 0 0; }
}

.sim-background {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    z-index: 2;
    box-shadow: inset 0 0 20px 10px rgba(0, 0, 0, 0.07);
}

.sim-text-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 25px;
    align-items: center;
    gap: 5px;
    font-size: 25px;
    color: var(--sim-text-color);
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    z-index: 4;
}

.sim-text-wrapper span {
    opacity: 0;
    animation: sim-fade-in var(--sim-animation-duration) infinite ease-in-out both;
}

@keyframes sim-fade-in {
    0%, 100% { opacity: 0; transform: translateY(5px); }
    15%, 85% { opacity: 1; transform: translateY(0); }
}

.sim-text-wrapper span:nth-child(1) { animation-delay: calc(var(--sim-letter-delay) * 0); }
.sim-text-wrapper span:nth-child(2) { animation-delay: calc(var(--sim-letter-delay) * 1); }
.sim-text-wrapper span:nth-child(3) { animation-delay: calc(var(--sim-letter-delay) * 2); }
.sim-text-wrapper span:nth-child(4) { animation-delay: calc(var(--sim-letter-delay) * 3); }
.sim-text-wrapper span:nth-child(5) { animation-delay: calc(var(--sim-letter-delay) * 4); }

.sim-flower {
    position: absolute;
    width: 35px;
    animation: sim-breathe var(--sim-flower-animation-duration) infinite ease-in-out;
    z-index: 5;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.4s ease;
}

.sim-flower-left-main {
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
}

.sim-flower-left-sub {
    width: 22px;
    top: 68%;
    left: 8px;
    transform: translateY(-50%) scaleX(-1);
    opacity: 0.85;
    animation-delay: -1.2s;
}

.sim-container:hover .sim-flower,
.sim-container:active .sim-flower {
    filter: brightness(1.2);
}

.sim-container:hover .sim-flower-left-main,
.sim-container:active .sim-flower-left-main {
    transform: translateY(-55%) scale(1.15) rotate(-6deg);
}

.sim-container:hover .sim-flower-left-sub,
.sim-container:active .sim-flower-left-sub {
    transform: translateY(-50%) scaleX(-1) scale(1.1) rotate(10deg);
}

@keyframes sim-breathe {
    0%, 100% { opacity: 0.9; }
    50% { opacity: 1; }
}

@media (max-width: 480px) {
    .sim-container {
        transform: scale(0.8);
    }
    .sim-container:hover,
    .sim-container:active {
        transform: scale(0.8) translateY(-4px);
    }
}
}`;

const HESITANT_TO_SPEAK_CSS = `
@import url("https://fontsapi.zeoseven.com/438/main/result.css");

:root {
    --sdb-width: 270px;
    --sdb-height: 50px;
    --sdb-text-color: #2a2a2a;
    --sdb-animation-duration: 5s;
    --sdb-letter-delay: 0.3s;
    --sdb-flower-animation-duration: 8s;
    --sdb-float-duration: 4s;
}

.typing_indicator .svg_dots { display: none !important; }

.sdb-container {
    position: relative;
    width: var(--sdb-width);
    height: var(--sdb-height);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease-out, filter 0.3s ease-out;
    -webkit-tap-highlight-color: transparent;
}
.sdb-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: fill;
    filter:
        drop-shadow(1px 0 0 #514E4F)
        drop-shadow(-1px 0 0 #514E4F)
        drop-shadow(0 2px 0 #514E4F)
        drop-shadow(0 -1px 0 #514E4F);
}

.sdb-text-wrapper {
    display: flex; justify-content: center; align-items: center; gap: 5px; font-size: 25px;
    font-family: "Huiwen-ZhengKai", serif;
    font-weight: normal;
    color: var(--sdb-text-color);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); z-index: 2; transition: text-shadow 0.3s ease-out;
}
.sdb-text-wrapper span {
    opacity: 0; animation: sdb-fade-in var(--sdb-animation-duration) infinite ease-in-out both;
}
@keyframes sdb-fade-in { 0%, 100% { opacity: 0; transform: translateY(5px); } 15%, 85% { opacity: 1; transform: translateY(0); } }
.sdb-text-wrapper span:nth-child(1){animation-delay:calc(var(--sdb-letter-delay)*0)}.sdb-text-wrapper span:nth-child(2){animation-delay:calc(var(--sdb-letter-delay)*1)}.sdb-text-wrapper span:nth-child(3){animation-delay:calc(var(--sdb-letter-delay)*2)}.sdb-text-wrapper span:nth-child(4){animation-delay:calc(var(--sdb-letter-delay)*3)}.sdb-text-wrapper span:nth-child(5){animation-delay:calc(var(--sdb-letter-delay)*4)}

.sdb-flower {
    position: absolute;
    top: 50%;
    width: 35px;
    animation-name: sdb-breathe;
    animation-duration: var(--sdb-flower-animation-duration);
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    z-index: 3;
    transition: transform 0.4s ease-in-out;
}

.sdb-flower-left {
    left: 20px;
    animation:
        sdb-breathe var(--sdb-flower-animation-duration) infinite ease-in-out,
        sdb-float-left var(--sdb-float-duration) infinite ease-in-out;
    animation-delay: 0s, calc(var(--sdb-float-duration) / -2);
}
.sdb-flower-right {
    right: 20px;
    animation:
        sdb-breathe var(--sdb-flower-animation-duration) infinite ease-in-out,
        sdb-float-right var(--sdb-float-duration) infinite ease-in-out;
}

@keyframes sdb-float-left {
    0%, 100% { transform: translateY(-50%) scaleX(-1); }
    50% { transform: translateY(-56%) scaleX(-1); }
}
@keyframes sdb-float-right {
    0%, 100% { transform: translateY(-50%) scaleX(1); }
    50% { transform: translateY(-56%) scaleX(1); }
}

@keyframes sdb-breathe {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
}

.sdb-container:hover,
.sdb-container:active {
    transform: translateY(-4px);
    filter: drop-shadow(0 6px 15px rgba(0, 0, 0, 0.2));
}

.sdb-container:hover .sdb-flower,
.sdb-container:active .sdb-flower {
    animation-play-state: paused;
    opacity: 1;
}

.sdb-container:hover .sdb-flower-left,
.sdb-container:active .sdb-flower-left {
    transform: translateY(-50%) scaleX(1) scale(1.15) !important;
}

.sdb-container:hover .sdb-flower-right,
.sdb-container:active .sdb-flower-right {
    transform: translateY(-50%) scaleX(-1) scale(1.15) !important;
}

.sdb-container:hover .sdb-text-wrapper,
.sdb-container:active .sdb-text-wrapper {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

@media (max-width: 480px) {
    .sdb-container { transform: scale(0.8); transform-origin: center; }
    .sdb-container:hover, .sdb-container:active { transform: scale(0.9) translateY(-4px); }
}
}`;

const TROUBLEMAKER_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

:root {
    --pg-width: 320px;
    --pg-height: 100px;
    --pg-main-color: #ff6d00;
    --pg-border-color: #1a1a1a;
    --pg-bg-color: #f0f0f0;
    --pg-float-duration: 3s;
    --pg-typing-duration: 4s;
    --pg-text-color: #757575;
}

.typing_indicator .svg_dots {
    display: none !important;
}

.pg-container {
    position: relative;
    width: var(--pg-width);
    height: var(--pg-height);
    font-family: 'Press Start 2P', cursive;
    transition: transform 0.2s ease-out;
    -webkit-tap-highlight-color: transparent;
}

.pg-bubble {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 230px;
    height: 60px;
    background-color: var(--pg-bg-color);
    border: 3px solid var(--pg-border-color);
    box-shadow:
        inset 0 0 0 3px var(--pg-bg-color),
        inset 0 0 0 6px var(--pg-border-color),
        3px 3px 0 0 var(--pg-border-color),
        6px 6px 0 0 var(--pg-border-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
}

.pg-bubble::before,
.pg-bubble::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: var(--pg-border-color);
}
.pg-bubble::before {
    top: -9px;
    left: 12px;
}
.pg-bubble::after {
    bottom: -9px;
    right: 12px;
}

.pg-ghost {
    position: absolute;
    bottom: 25px;
    left: -40px;
    width: 80px;
    animation: pg-float var(--pg-float-duration) steps(6) infinite;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    transition: transform 0.3s ease;
}

@keyframes pg-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.pg-text {
    color: var(--pg-text-color);
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    border-right: .12em solid var(--pg-border-color);
    animation:
        pg-typing var(--pg-typing-duration) steps(15, end) infinite,
        pg-blink-caret .75s step-end infinite;
}

@keyframes pg-typing {
    from { width: 0 }
    to { width: 100% }
}

@keyframes pg-blink-caret {
    from, to { border-color: transparent }
    50% { border-color: var(--pg-border-color); }
}

.pg-avatar-container {
    position: absolute;
    right: 0;
    bottom: 5px;
    width: 70px;
    height: 70px;
    padding: 5px;
    background-color: var(--pg-bg-color);
    border: 3px solid var(--pg-border-color);
    box-sizing: border-box;
    box-shadow: 3px 3px 0 0 var(--pg-border-color);
}

.pg-avatar-container .typing-indicator-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: pixelated;
}

.pg-container:hover,
.pg-container:active {
    transform: scale(1.05) translate(-3px, -3px);
}
.pg-container:hover .pg-ghost,
.pg-container:active .pg-ghost {
    transform: translateY(-15px) rotate(-5deg) scale(1.1);
}

@media (max-width: 480px) {
    .pg-container {
        transform: scale(0.85);
        transform-origin: left bottom;
    }
    .pg-container:hover,
    .pg-container:active {
        transform-origin: center center;
        transform: scale(0.9) translate(-3px, -3px);
    }
}
}`;

// --- Themes 数组定义区 ---
const themes = [
  {
    id: "transparent",
    name: "简约透明",
    css: TRANSPARENT_THEME_CSS,
    isBuiltIn: true,
  },
  {
    id: "soft_pink_cloud",
    name: "柔粉云朵",
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
    name: "冰晶主题 (by 长青青)",
    css: CRYSTAL_THEME_CSS,
    isBuiltIn: true,
  },
  {
    id: "bubble",
    name: "Q弹泡泡 (by 长青青)",
    css: BUBBLE_THEME_CSS,
    isBuiltIn: true,
  },
  {
    id: "vine_green",
    name: "藤曼绿 (by 长青青)",
    css: VINE_GREEN_THEME_CSS,
    isBuiltIn: true,
  },
  {
    id: "night_mare",
    name: "夜骐-美化",
    css: NIGHT_MARE_CSS,
    isBuiltIn: true,
  },
  {
    id: "black_scroll_style",
    name: "黑色卷轴-美化",
    css: BLACK_SCROLL_CSS,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_line_pink_style",
    name: "心跳线-粉白-美化",
    css: HEARTBEAT_LINE_PINK_CSS,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_line_black_style",
    name: "心跳线-黑红-美化",
    css: HEARTBEAT_LINE_BLACK_CSS,
    isBuiltIn: true,
  },
  {
    id: "heartbeat_line_purple_style",
    name: "心跳线-紫黑-美化",
    css: HEARTBEAT_LINE_PURPLE_CSS,
    isBuiltIn: true,
  },
  {
    id: "listen_to_the_heartbeat_style",
    name: "聆听心跳-美化",
    css: LISTEN_TO_THE_HEARTBEAT_CSS,
    isBuiltIn: true,
  },
  {
    id: "dinner_party_style",
    name: "晚宴-美化",
    css: DINNER_PARTY_CSS,
    isBuiltIn: true,
  },
  {
    id: "gothic_style_billboard_style",
    name: "哥特风告示牌-美化",
    css: GOTHIC_STYLE_BILLBOARD_CSS,
    isBuiltIn: true,
  },
  {
    id: "plain_paper_with_ink_charm_style",
    name: "素笺墨韵-美化",
    css: PLAIN_PAPER_WITH_INK_CHARM_CSS,
    isBuiltIn: true,
  },
  {
    id: "hesitant_to_speak_style",
    name: "欲语还休-美化",
    css: HESITANT_TO_SPEAK_CSS,
    isBuiltIn: true,
  },
  {
    id: "troublemaker_style",
    name: "捣蛋鬼-美化",
    css: TROUBLEMAKER_CSS,
    isBuiltIn: true,
  },
  {
    id: "little_cat_bubbles",
    name: "小猫气泡",
    useIframe: true,
    html: '<div class="pbc-container">\n    <div class="pbc-avatar-wrapper">\n        <img class="pbc-avatar-img" src="" alt="Character Avatar">\n        <img class="pbc-pixel-cat" src="https://i.imgur.com/JjP4VwO.png" alt="Pixel Cat">\n    </div>\n    \n    <div class="pbc-bubbles-wrapper">\n    </div>\n</div>',
    iframeCSS:
      "body { \n    margin: 0; \n    padding: 0; \n    background-color: transparent; \n    overflow: hidden; \n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; \n}\n\n.pbc-container { \n    position: relative; \n    width: 100%; \n    height: 100%; \n    display: flex; \n    align-items: flex-end; \n    padding: 10px; \n    box-sizing: border-box; \n    cursor: pointer;\n    transition: transform 0.3s ease;\n}\n\n.pbc-avatar-wrapper { position: relative; width: 60px; height: 60px; flex-shrink: 0; padding: 3px; box-sizing: border-box; transition: all 0.3s ease; }\n.pbc-avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }\n.pbc-avatar-wrapper--circle, .pbc-avatar-wrapper--squircle { background: conic-gradient(from 180deg at 50% 50%, #ffcad4, #f5d5e6, #d8e2dc, #f5d5e6, #ffcad4); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }\n.pbc-avatar-wrapper--circle, .pbc-avatar-wrapper--circle .pbc-avatar-img { border-radius: 50%; }\n.pbc-avatar-wrapper--squircle, .pbc-avatar-wrapper--squircle .pbc-avatar-img { border-radius: 16px; }\n.pbc-avatar-wrapper--circle .pbc-avatar-img, .pbc-avatar-wrapper--squircle .pbc-avatar-img { box-shadow: inset 0 0 4px rgba(0,0,0,0.2); }\n.pbc-avatar-wrapper--soft { padding: 0; background: #e0e5ec; box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff; }\n.pbc-avatar-wrapper--soft, .pbc-avatar-wrapper--soft .pbc-avatar-img { border-radius: 50%; }\n.pbc-avatar-wrapper--soft .pbc-avatar-img { box-shadow: inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff; }\n.pbc-pixel-cat { position: absolute; bottom: -8px; right: -12px; width: 35px; z-index: 10; image-rendering: pixelated; animation: pbc-cat-twitch 4s infinite ease-in-out; transform-origin: bottom center; }\n.pbc-bubbles-wrapper { position: relative; flex-grow: 1; height: 100%; margin-left: 15px; }\n.pbc-bubble { position: absolute; white-space: nowrap; opacity: 0; transform: translateY(10px) scale(0.9); animation: pbc-pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; display: flex; align-items: center; gap: 6px; font-weight: 500; }\n.pbc-bubble::before { content: ''; position: absolute; background-color: inherit; }\n.pbc-bubble--round, .pbc-bubble--square, .pbc-bubble--3d { padding: 8px 14px; font-size: 14px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }\n.pbc-bubble--round::before, .pbc-bubble--square::before, .pbc-bubble--3d::before { bottom: 4px; left: -7px; width: 12px; height: 12px; clip-path: polygon(100% 100%, 0 100%, 100% 0); }\n.pbc-bubble--round{ border-radius:18px; }\n.pbc-bubble--square{ border-radius:8px; }\n.pbc-bubble--3d{ border-radius:12px; border-bottom:3px solid rgba(0,0,0,.15); }\n.pbc-bubble--tag { padding: 6px 12px; font-size: 13px; border-radius: 8px; font-weight: 600; }\n.pbc-bubble--tag::before { top: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 6px; clip-path: polygon(50% 0, 0 100%, 100% 100%); }\n.pbc-bubble--spotify { padding: 6px 12px; border-radius: 50px; background-color: #f1f1f1 !important; color: #121212 !important; }\n.pbc-bubble--spotify svg { height: 18px; fill: #121212; }\n.pbc-bubble--spotify .pbc-waveform rect { animation: pbc-waveform-anim 1.5s infinite alternate; }\n.pbc-bubble--spotify .pbc-waveform rect:nth-child(2n){ animation-delay:-.2s; }\n.pbc-bubble--spotify .pbc-waveform rect:nth-child(3n){ animation-delay:-.5s; }\n.pbc-bubble--spotify .pbc-waveform rect:nth-child(4n){ animation-delay:-.8s; }\n.pbc-bubble--stats { padding: 4px 12px; border-radius: 8px; font-size: 14px; font-weight: 600; }\n.pbc-bubble--stats svg { height: 12px; fill: white; margin-right: -2px; }\n.pbc-bubble--stats::before { bottom: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 6px; clip-path: polygon(50% 100%, 0 0, 100% 0); }\n.pbc-bubble--glass { padding: 8px 14px; font-size: 14px; border-radius: 18px; background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.85); }\n.pbc-bubble--glass.pbc-bubble--dark { background-color: rgba(0,0,0,0.1); border-color: rgba(255,255,255,0.15); }\n.pbc-bubble--glass::before { bottom: 4px; left: -7px; width: 12px; height: 12px; clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: transparent; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.2); border-left: 1px solid rgba(255,255,255,0.2); }\n.pbc-bubble--soft { padding: 10px 16px; font-size: 15px; border-radius: 20px; font-weight: 600; }\n.pbc-bubble--soft.pbc-bubble--light::before { display: none; }\n.pbc-bubble--soft::before { bottom: 4px; left: -7px; width: 12px; height: 12px; clip-path: polygon(100% 100%, 0 100%, 100% 0); }\n.pbc-bubble--dark{ background-color:#1c1c1e; color:#fff; }\n.pbc-bubble--light{ background-color:#e9e9eb; color:#000; }\n.pbc-bubble--pink{ background-color:#ff6b81; color:#fff; }\n.pbc-bubble--red{ background-color:#e74c3c; color:#fff; }\n.pbc-bubble--purple{ background-color:#9b59b6; color:#fff; }\n.pbc-bubble--blue{ background-color:#92c5eb; color:#fff; }\n.pbc-bubble--soft.pbc-bubble--light { background: #e0e5ec; box-shadow: 4px 4px 8px #bebebe, -4px -4px 8px #ffffff; color: #555; }\n.pbc-bubble--soft.pbc-bubble--pink { background: linear-gradient(145deg, #ff7a8f, #e65c71); box-shadow: 4px 4px 8px #d95368, -4px -4px 8px #ff8598; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); }\n.pbc-bubble--soft.pbc-bubble--blue { background: linear-gradient(145deg, #a7d7f9, #8dc1e0); box-shadow: 4px 4px 8px #7fb5d1, -4px -4px 8px #b9e3ff; color: #2c5a77; }\n.pbc-heart { position: absolute; font-size: 24px; pointer-events: none; animation: pbc-heart-float 2s ease-out forwards; z-index: 100; }\n.pbc-heart--pink { color: #ff6b81; text-shadow: 1px 1px 0 #c94a60, -1px -1px 0 #ff9cb0; }\n.pbc-heart--black { color: #2c3e50; text-shadow: 1px 1px 0 #000, -1px -1px 0 #5f7d9c; }\n.pbc-heart--white { color: #ecf0f1; text-shadow: 1px 1px 0 #bdc3c7, -1px -1px 0 #fff; }\n@keyframes pbc-pop-in { to { opacity: 1; transform: translateY(0) scale(1); } }\n@keyframes pbc-cat-twitch { 0%,100%,50%{transform:rotate(0deg)} 10%,30%{transform:rotate(-5deg)} 20%,40%{transform:rotate(5deg)} }\n@keyframes pbc-waveform-anim { from{transform:scaleY(.2)} to{transform:scaleY(1)} }\n@keyframes pbc-heart-float { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-80px) scale(0.5) rotate(20deg); } }\n\n@media (max-width: 400px) {\n    .pbc-container {\n        transform: scale(0.75);\n        transform-origin: left bottom;\n    }\n}",
    iframeJS:
      'const avatarStyles = ["circle", "squircle", "soft"];\nconst bubbleTemplates = [\n  { type: "text", text: "Let\'s talk! ^ ^", style: "square", color: "light" },\n  { type: "text", text: "!!!", style: "square", color: "red" },\n  { type: "text", text: "typing...", style: "3d", color: "dark" },\n  { type: "text", text: "{{char}} wants to chat!", style: "3d", color: "purple" },\n  { type: "text", text: "cutie", style: "tag", color: "dark" },\n  { type: "spotify", style: "spotify" },\n  { type: "stats", style: "stats", color: "dark" },\n  { type: "text", text: "where are you...", style: "glass", color: "dark" },\n  { type: "text", text: "...miss u", style: "glass", color: "light" },\n  { type: "text", text: "👀", style: "glass", color: "dark" },\n  { type: "text", text: "gimme a hug", style: "soft", color: "pink" },\n  { type: "text", text: "so fluffy!", style: "soft", color: "light" },\n  { type: "text", text: "՞⩌⌯⩌՞", style: "soft", color: "blue" },\n  { type: "text", text: "(´｡• ᵕ •｡`) ♡", style: "soft", color: "pink" },\n];\nconst heartOptions = [\n  { char: "🩷", color: "pink" },\n  { char: "🖤", color: "black" },\n  { char: "🤍", color: "white" },\n];\n\nlet intervalId = null;\n\nconst container = ThemeUtils.$(".pbc-container");\nconst avatarWrapper = ThemeUtils.$(".pbc-avatar-wrapper");\nconst avatarImg = ThemeUtils.$(".pbc-avatar-img");\nconst bubblesWrapper = ThemeUtils.$(".pbc-bubbles-wrapper");\n\nThemeUtils.sendMessage("set-overlay-mode");\nThemeUtils.sendMessage("register-stateful-theme");\n\nfunction createBubble() {\n  if (!bubblesWrapper) return;\n  const templateIndex = ThemeUtils.randomInt(0, bubbleTemplates.length - 1);\n  const template = bubbleTemplates[templateIndex];\n\n  const bubble = document.createElement("div");\n  bubble.className = `pbc-bubble pbc-bubble--${template.style} pbc-bubble--${template.color || ""}`;\n\n  let content = "";\n  let bubbleWidthEstimate = 100;\n\n  switch (template.type) {\n    case "spotify":\n      const bars = Array.from(\n        { length: 15 },\n        () =>\n          `<rect x="${ThemeUtils.random(0, 100)}%" y="0" width="2" height="100%" style="transform-origin: center; transform: scaleY(${ThemeUtils.random(0.1, 1).toFixed(2)})"></rect>`,\n      ).join("");\n      content = `<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M6 13.5C7.5 12.5 9.5 12 11 12.5S14 14 15 14.5M6.5 10.5C8 9.5 10 9 11.5 9.5S14.5 11 15.5 11.5M7 7.5C8.5 6.5 10.5 6 12 6.5S15 8 16 8.5"/></svg><svg class="pbc-waveform" viewbox="0 0 100 12" preserveAspectRatio="none">${bars}</svg>`;\n      bubbleWidthEstimate = 150;\n      break;\n    case "stats":\n      const comments = ThemeUtils.randomInt(20, 150);\n      const likes = ThemeUtils.randomInt(100, 999);\n      const followers = ThemeUtils.randomInt(10, 99);\n      content = `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span>${comments}</span><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg><span>${likes}</span><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span>${followers}</span>`;\n      bubbleWidthEstimate = 180;\n      break;\n    case "text":\n    default:\n      let text = template.text.replace(\n        "{{char}}",\n        ThemeUtils.getCharacterName(),\n      );\n      content = `<span>${text}</span>`;\n      bubbleWidthEstimate = text.length * 9 + 30;\n      break;\n  }\n\n  bubble.innerHTML = content;\n  const wrapperRect = bubblesWrapper.getBoundingClientRect();\n  const maxBottom = wrapperRect.height - 40;\n  const maxLeft = wrapperRect.width - bubbleWidthEstimate;\n\n  bubble.style.bottom = `${ThemeUtils.randomInt(0, maxBottom)}px`;\n  bubble.style.left = `${ThemeUtils.randomInt(0, Math.max(0, maxLeft))}px`;\n\n  bubblesWrapper.appendChild(bubble);\n  setTimeout(() => {\n    bubble.remove();\n  }, 4000);\n}\n\nfunction spawnHearts(count) {\n  if (!container) return;\n\n  for (let i = 0; i < count; i++) {\n    const heartData =\n      heartOptions[ThemeUtils.randomInt(0, heartOptions.length - 1)];\n    const heart = document.createElement("div");\n    heart.className = `pbc-heart pbc-heart--${heartData.color}`;\n    heart.innerHTML = heartData.char;\n    heart.style.left = `${ThemeUtils.randomInt(10, 80)}%`;\n    heart.style.bottom = `${ThemeUtils.randomInt(0, 20)}px`;\n    container.appendChild(heart);\n    setTimeout(() => {\n      heart.remove();\n    }, 2000);\n  }\n}\n\nfunction initialize() {\n  if (avatarImg) {\n    avatarImg.src = ThemeUtils.getCharAvatar();\n  }\n  if (avatarWrapper) {\n    const randomStyle =\n      avatarStyles[ThemeUtils.randomInt(0, avatarStyles.length - 1)];\n    avatarWrapper.classList.add(`pbc-avatar-wrapper--${randomStyle}`);\n  }\n  intervalId = setInterval(createBubble, 1800);\n\n  if (container) {\n    container.addEventListener("click", () => {\n      createBubble();\n      if (ThemeUtils.random() < 0.35) {\n        spawnHearts(ThemeUtils.randomInt(2, 4));\n      }\n    });\n  }\n}\n\ninitialize();\n\nwindow.addEventListener("message", (event) => {\n  if (event.data?.source === "typing-indicator-host") {\n    if (event.data.type === "context-update" && event.data.data) {\n      console.log("[PBC主题] 收到 context-update:", event.data.data);\n\n      if (event.data.data.charAvatarUrl && avatarImg) {\n        avatarImg.src = event.data.data.charAvatarUrl;\n      }\n\n      if (event.data.data.charName) {\n        window.themeData.charName = event.data.data.charName;\n      }\n      if (event.data.data.userName) {\n        window.themeData.userName = event.data.data.userName;\n      }\n      if (event.data.data.charAvatarUrl) {\n        window.themeData.charAvatarUrl = event.data.data.charAvatarUrl;\n      }\n      if (event.data.data.userAvatarUrl) {\n        window.themeData.userAvatarUrl = event.data.data.userAvatarUrl;\n      }\n    }\n\n    if (event.data.type === "graceful-shutdown-request") {\n      if (intervalId) {\n        clearInterval(intervalId);\n        intervalId = null;\n      }\n      ThemeUtils.sendMessage("graceful-shutdown-response");\n    }\n  }\n});',
    sizes: {
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
    isBuiltIn: true,
  },
  {
    id: "cat's_eye",
    name: "眼镜猫",
    useIframe: true,
    html: '<div class="dc-container">\n    <div class="dc-indicator-wrapper dc-indicator--user">\n        <div class="dc-avatar-wrapper">\n            {{user_avatar}}\n            <img class="dc-sticker-frame" src="https://i.imgur.com/coapmKd.png" alt="User Glasses Frame">\n            <img class="dc-sticker-ear dc-sticker-ear--left" src="https://i.imgur.com/rMFewcW.png" alt="User Left Ear">\n            <img class="dc-sticker-ear dc-sticker-ear--right" src="https://i.imgur.com/LspRbnx.png" alt="User Right Ear">\n        </div>\n        <div class="dc-bubble dc-bubble--user">\n            <span>^⌯𖥦⌯^੭</span>\n        </div>\n    </div>\n    <div class="dc-indicator-wrapper dc-indicator--char">\n        <div class="dc-avatar-wrapper">\n            {{char_avatar}}\n            <img class="dc-sticker-frame" src="https://i.imgur.com/p4Kln6g.png" alt="Char Glasses Frame">\n            <img class="dc-sticker-ear dc-sticker-ear--left" src="https://i.imgur.com/raprlkV.png" alt="Char Left Ear">\n            <img class="dc-sticker-ear dc-sticker-ear--right" src="https://i.imgur.com/DatrZlT.png" alt="Char Right Ear">\n        </div>\n        <div class="dc-bubble dc-bubble--char">\n            <div class="dc-line-one">ദ്ദി ≽^⎚˕⎚^≼ .ᐟ</div>\n            <div class="dc-line-two">\n                <span class="dc-char-name">{{char}}</span>在回复啦喵～！\n            </div>\n        </div>\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;800&display=swap');\n\nbody { \n    margin: 0; \n    padding: 0; \n    background-color: transparent; \n    overflow: hidden; \n    font-family: 'M PLUS Rounded 1c', sans-serif; \n}\n\n.dc-container { \n    display: flex; \n    flex-direction: column; \n    justify-content: flex-end; \n    align-items: center; \n    gap: 8px; \n    width: 100%; \n    height: 100%; \n    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); \n    -webkit-tap-highlight-color: transparent;\n}\n\n.dc-indicator-wrapper { \n    display: flex; \n    align-items: center; \n    width: 330px; \n    gap: 22px; \n}\n.dc-avatar-wrapper { \n    position: relative; \n    width: 75px; \n    height: 75px; \n    flex-shrink: 0; \n}\n.dc-avatar-wrapper .typing-indicator-avatar { \n    width: 100%; \n    height: 100%; \n    border-radius: 50%; \n    object-fit: cover; \n}\n.dc-sticker-frame, .dc-sticker-ear { \n    position: absolute; \n    pointer-events: none; \n}\n.dc-bubble { \n    position: relative; \n    opacity: 0; \n    transform: scale(0.8); \n    transition: opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); \n}\n.dc-bubble.is-visible { \n    opacity: 1; \n    transform: scale(1); \n}\n.dc-bubble::before, .dc-bubble::after { \n    content: ''; \n    position: absolute; \n    border-radius: 50%; \n}\n\n.dc-indicator--char { \n    justify-content: flex-start; \n}\n.dc-indicator--char .dc-avatar-wrapper .typing-indicator-avatar { \n    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ffc2d4, 0 2px 8px rgba(0,0,0,0.15); \n}\n.dc-indicator--char .dc-sticker-frame { \n    width: 105%; \n    height: 40%; \n    top: 50%; \n    left: 50%; \n    transform: translate(-50%, -50%); \n    animation: dc-char-float 3s infinite ease-in-out; \n}\n.dc-indicator--char .dc-sticker-ear { \n    width: 38%; \n    transform-origin: bottom center; \n}\n.dc-indicator--char .dc-sticker-ear--left { \n    top: -12%; \n    left: -2%; \n    animation: dc-char-ear-twitch-left 2.5s infinite ease-in-out; \n}\n.dc-indicator--char .dc-sticker-ear--right { \n    top: -12%; \n    right: -2%; \n    animation: dc-char-ear-twitch-right 2.5s infinite ease-in-out -0.3s; \n}\n.dc-bubble--char { \n    padding: 8px 20px; \n    border-radius: 50px; \n    background: linear-gradient(135deg, #ffdde1 0%, #ffc4d3 100%); \n    border-top: 2px solid rgba(255, 255, 255, 0.8); \n    border-bottom: 2px solid rgba(255, 158, 185, 0.5); \n    box-shadow: 0 5px 15px rgba(239, 137, 163, 0.4); \n    display: flex; \n    flex-direction: column; \n    gap: 2px; \n    z-index: 1; \n}\n.dc-bubble--char::before { \n    width: 18px; \n    height: 18px; \n    background: #ffc2d4; \n    bottom: 5px; \n    left: -15px; \n    z-index: -2; \n}\n.dc-bubble--char::after { \n    width: 14px; \n    height: 14px; \n    background: linear-gradient(135deg, #ffdde1 0%, #ffc4d3 100%); \n    bottom: 7px; \n    left: -13px; \n    z-index: -1; \n}\n.dc-bubble--char .dc-line-one { \n    font-size: 16px; \n    font-weight: 800; \n    color: #fff; \n    text-shadow: 0 0 1px #e38ca0, 1px 1px 2px rgba(204, 98, 126, 0.7); \n}\n.dc-bubble--char .dc-line-two { \n    font-size: 14px; \n    font-weight: 500; \n    color: rgba(255, 255, 255, 0.9); \n    text-shadow: 1px 1px 1px rgba(204, 98, 126, 0.5); \n    overflow: hidden; \n    white-space: nowrap; \n    width: 0; \n    border-right: 2px solid transparent; \n}\n.dc-bubble--char .dc-line-two.is-typing { \n    border-right-color: rgba(255,255,255,0.75); \n    animation: dc-typing 2.5s steps(12) forwards, dc-blink-caret .75s step-end infinite; \n}\n.dc-bubble--char .dc-char-name { \n    display: inline; \n    font-weight: 800; \n    color: #fff; \n}\n\n.dc-indicator--user { \n    flex-direction: row-reverse; \n    justify-content: flex-start; \n}\n.dc-indicator--user .dc-avatar-wrapper .typing-indicator-avatar { \n    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ff8a8a, 0 2px 8px rgba(0,0,0,0.15); \n}\n.dc-indicator--user .dc-sticker-frame { \n    width: 105%; \n    height: 40%; \n    top: 50%; \n    left: 50%; \n    transform: translate(-50%, -50%); \n    animation: dc-user-float 2.8s infinite ease-in-out; \n}\n.dc-indicator--user .dc-sticker-ear { \n    width: 45%; \n    transform-origin: bottom center; \n}\n.dc-indicator--user .dc-sticker-ear--left { \n    top: -12%; \n    left: -2%; \n    animation: dc-user-ear-twitch-left 2s infinite ease-in-out; \n}\n.dc-indicator--user .dc-sticker-ear--right { \n    top: -12%; \n    right: -2%; \n    animation: dc-user-ear-twitch-right 2s infinite ease-in-out -0.4s; \n}\n.dc-bubble--user { \n    padding: 5px 20px; \n    border-radius: 50px; \n    background: linear-gradient(135deg, #ff8a8a 0%, #ff6b6b 100%); \n    border-top: 2px solid rgba(255, 255, 255, 0.7); \n    border-bottom: 2px solid rgba(255, 85, 85, 0.6); \n    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.5); \n    font-size: 20px; \n    font-weight: 800; \n    color: white; \n    text-shadow: 1px 1px 2px rgba(184, 53, 53, 0.6); \n    z-index: 2; \n}\n.dc-bubble--user::before { \n    width: 18px; \n    height: 18px; \n    background: #ff8a8a; \n    bottom: 5px; \n    right: -15px; \n    z-index: -2; \n}\n.dc-bubble--user::after { \n    width: 14px; \n    height: 14px; \n    background: linear-gradient(135deg, #ff8a8a 0%, #ff6b6b 100%); \n    bottom: 7px; \n    right: -13px; \n    z-index: -1; \n}\n\n@keyframes dc-char-ear-twitch-left { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-8deg)} } \n@keyframes dc-char-ear-twitch-right { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(8deg)} } \n@keyframes dc-char-float { 0%,100%{transform:translate(-50%,-50%)} 50%{transform:translate(-50%,-52%)} }\n@keyframes dc-user-ear-twitch-left { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-15deg)} } \n@keyframes dc-user-ear-twitch-right { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(15deg)} } \n@keyframes dc-user-float { 0%,100%{transform:translate(-50%,-50%)} 50%{transform:translate(-50%,-55%)} }\n@keyframes dc-typing { from { width: 0; } to { width: 100%; } }\n@keyframes dc-blink-caret { from, to { border-color: transparent; } 50% { border-color: rgba(255,255,255,0.75); } }\n\n.dc-container:hover,\n.dc-container:active {\n    transform: scale(1.05);\n}\n\n.dc-container:hover *,\n.dc-container:active * {\n    animation-play-state: paused !important;\n}\n@media (max-width: 480px) {\n    .dc-container { \n        transform: scale(0.75); \n        transform-origin: center bottom; \n    }\n    \n    .dc-container:hover, \n    .dc-container:active { \n        transform: scale(0.9); \n        transform-origin: center bottom; \n    }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("set-overlay-mode");\n  ThemeUtils.sendMessage("register-stateful-theme");\n\n  const container = ThemeUtils.$(".dc-container");\n  const userBubble = ThemeUtils.$(".dc-bubble--user");\n  const charBubble = ThemeUtils.$(".dc-bubble--char");\n  const userAvatarImg = ThemeUtils.$(\n    ".dc-indicator--user .typing-indicator-avatar",\n  );\n  const charAvatarImg = ThemeUtils.$(\n    ".dc-indicator--char .typing-indicator-avatar",\n  );\n  const charNameSpan = ThemeUtils.$(".dc-char-name");\n  const charLineTwo = ThemeUtils.$(".dc-bubble--char .dc-line-two");\n\n  let intervalId = null;\n\n  function updateContext() {\n    if (userAvatarImg) userAvatarImg.src = window.themeData.userAvatarUrl;\n    if (charAvatarImg) charAvatarImg.src = window.themeData.charAvatarUrl;\n    if (charNameSpan) charNameSpan.textContent = window.themeData.charName;\n  }\n\n  function runAnimationSequence() {\n    userBubble.classList.remove("is-visible");\n    charBubble.classList.remove("is-visible");\n    charLineTwo.classList.remove("is-typing");\n\n    setTimeout(() => {\n      if (userBubble) userBubble.classList.add("is-visible");\n    }, 500);\n\n    setTimeout(() => {\n      if (charBubble) charBubble.classList.add("is-visible");\n      if (charLineTwo) charLineTwo.classList.add("is-typing");\n    }, 1500);\n  }\n\n  function initialize() {\n    if (userAvatarImg) userAvatarImg.src = ThemeUtils.getUserAvatar();\n    if (charAvatarImg) charAvatarImg.src = ThemeUtils.getCharAvatar();\n    if (charNameSpan) charNameSpan.textContent = ThemeUtils.getCharacterName();\n\n    runAnimationSequence();\n    intervalId = setInterval(runAnimationSequence, 5000);\n  }\n\n  initialize();\n\n  window.addEventListener("message", (event) => {\n    if (event.data?.source === "typing-indicator-host") {\n      if (event.data.type === "context-update" && event.data.data) {\n        if (event.data.data.charName) {\n          window.themeData.charName = event.data.data.charName;\n        }\n        if (event.data.data.userName) {\n          window.themeData.userName = event.data.data.userName;\n        }\n        if (event.data.data.charAvatarUrl) {\n          window.themeData.charAvatarUrl = event.data.data.charAvatarUrl;\n        }\n        if (event.data.data.userAvatarUrl) {\n          window.themeData.userAvatarUrl = event.data.data.userAvatarUrl;\n        }\n        updateContext();\n      }\n\n      if (event.data.type === "graceful-shutdown-request") {\n        if (intervalId) {\n          clearInterval(intervalId);\n          intervalId = null;\n        }\n        ThemeUtils.sendMessage("graceful-shutdown-response");\n      }\n    }\n  });\n});',
    sizes: {
      floating_bottom: {
        width: "95vw",
        height: "170px",
        maxWidth: "350px",
      },
      chat_center: {
        width: "95vw",
        height: "170px",
        maxWidth: "350px",
      },
      draggable: {
        width: "95vw",
        height: "170px",
        maxWidth: "350px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "game-heart slash",
    name: "游戏-Heart Slash!",
    useIframe: true,
    html: '<div class="gh-container">\n    <div class="gh-backgrounds">\n        <img id="bgMenu" class="gh-bg-img" src="https://i.imgur.com/aohOFEX.jpeg">\n        <img id="bgEasy" class="gh-bg-img" src="https://i.imgur.com/mxeIqK2.gif">\n        <img id="bgNormal" class="gh-bg-img" src="https://i.imgur.com/lcFJxpM.gif">\n        <img id="bgHard" class="gh-bg-img" src="https://i.imgur.com/d5NqIcv.gif">\n    </div>\n\n    <div class="gh-ui-top">\n        <div class="gh-score">Score: <span id="scoreValue">0</span></div>\n        <div class="gh-top-center-controls">\n            <button id="muteBtn" class="gh-button">🔊</button>\n            <button id="pauseBtn" class="gh-button" disabled>❚❚</button>\n        </div>\n        <!-- 【升级】排行榜和最高分显示 -->\n        <div class="gh-highscore">\n            <div id="mainHighscore" class="gh-main-highscore">🏆 High: 0</div>\n            <ol id="highscoreList"></ol>\n        </div>\n    </div>\n\n    <canvas id="gameCanvas"></canvas>\n    \n    <div id="startScreen" class="gh-overlay">\n        <div id="loadingText" class="gh-loading-text">Loading Assets...</div>\n        <div id="startMenu" style="display: none;">\n            <div class="gh-title">Heart Slash!</div>\n            <div class="gh-difficulty-select">\n                <button class="gh-button difficulty-btn" data-difficulty="easy">简单</button>\n                <button class="gh-button difficulty-btn" data-difficulty="normal">普通</button>\n                <button class="gh-button difficulty-btn" data-difficulty="hard">困难</button>\n            </div>\n        </div>\n    </div>\n    \n    <div id="pauseScreen" class="gh-overlay" style="display: none;">\n        <div class="gh-pause-menu">\n            <div class="gh-pause-text">已暂停</div>\n            <div class="gh-pause-actions">\n                <button id="resumeBtn" class="gh-button">继续</button>\n                <button id="backToMenuBtn" class="gh-button">返回菜单</button>\n            </div>\n        </div>\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');\n:root { --gh-bg-start: #d2cce5; --gh-bg-end: #f0e6f2; --gh-text-color: #4a2c5a; --gh-button-bg: #fff; --gh-button-shadow: #bdaecf; }\nbody { margin: 0; overflow: hidden; font-family: 'Press Start TtP', monospace, sans-serif; }\n\n.gh-container { position: relative; width: 100%; height: 100%; cursor: crosshair; overflow: hidden; } \n\n.gh-backgrounds { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }\n.gh-bg-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease; }\n.gh-container.state-menu #bgMenu, .gh-container.state-easy #bgEasy, .gh-container.state-normal #bgNormal, .gh-container.state-hard #bgHard { opacity: 1; }\n.gh-container.state-easy #bgEasy { animation: gh-scroll-bg 60s linear infinite alternate; }\n@keyframes gh-scroll-bg { from { object-position: 50% 0%; } to { object-position: 50% 100%; } }\n\n\n#gameCanvas { display: block; width: 100%; height: 100%; background: transparent; }\n.gh-ui-top { position: absolute; top: 5px; left: 10px; right: 10px; z-index: 10; display: flex; justify-content: space-between; align-items: flex-start; color: #fff; font-size: 10px; text-shadow: 1px 1px 2px rgba(0,0,0,0.7); pointer-events: none; }\n.gh-ui-top .gh-button { pointer-events: all; }\n.gh-score { line-height: 24px; background: rgba(0,0,0,0.3); padding: 0 5px; border-radius: 3px; }\n\n.gh-highscore { text-align: right; }\n.gh-main-highscore { font-size: 12px; font-weight: bold; background: rgba(0,0,0,0.3); padding: 4px 6px; border-radius: 3px; margin-bottom: 2px; }\n.gh-highscore ol { list-style: decimal; text-align: left; padding-left: 20px; margin: 0; font-size: 9px; line-height: 1.4; background: rgba(0,0,0,0.2); border-radius: 3px; }\n\n.gh-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 20; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(2px); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }\n.gh-loading-text, .gh-title, .gh-pause-text { color: #fff; text-shadow: 2px 2px 0 #000; }\n.gh-loading-text { font-size: 14px; }\n.gh-title { font-size: 20px; margin-bottom: 20px; animation: gh-pulse 1.5s infinite; }\n.gh-difficulty-select { display: flex; gap: 10px; }\n.gh-button { padding: 4px 8px; font-family: inherit; font-size: 10px; color: var(--gh-text-color); background: var(--gh-button-bg); border: 2px solid var(--gh-text-color); box-shadow: 2px 2px 0 var(--gh-button-shadow); cursor: pointer; transition: all 0.1s ease; }\n.gh-button:active, .gh-button.active { transform: translate(2px, 2px); box-shadow: 0 0 0 var(--gh-button-shadow); }\n.gh-button:disabled { background: #ccc; cursor: not-allowed; }\n.gh-top-center-controls { position: absolute; top: 0; left: 50%; transform: translateX(-50%); display: flex; gap: 5px; }\n.gh-pause-menu { display: flex; flex-direction: column; align-items: center; gap: 15px; }\n.gh-pause-text { font-size: 18px; }\n.gh-pause-actions { display: flex; gap: 10px; }\n.gh-score-popup, .gh-slash-fx, .gh-particle { position: absolute; pointer-events: none; user-select: none; z-index: 15; }\n.gh-score-popup { color: #fff; text-shadow: 1px 1px 0 #e84393; font-size: 14px; font-weight: bold; animation: gh-float-up 0.8s ease-out forwards; }\n.gh-slash-fx { width: 100px; height: 100px; background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%); border-radius: 50%; animation: gh-fade-out 0.2s ease-out forwards; }\n.gh-particle { width: 4px; height: 4px; background-color: #ff7bac; border-radius: 50%; animation: gh-explode 0.6s ease-out forwards; }\n@keyframes gh-pulse { 50% { transform: scale(1.05); } }\n@keyframes gh-float-up { to { transform: translate(-50%, -50px); opacity: 0; } }\n@keyframes gh-fade-out { to { transform: scale(1.5); opacity: 0; } }\n@keyframes gh-explode { to { transform: translate(var(--x), var(--y)); opacity: 0; } }",
    iframeJS:
      'const assetManager = {\n  images: {},\n  imageUrls: {\n    item1: "https://i.imgur.com/VrrJ3Z4.png",\n    item2: "https://i.imgur.com/U1mVVFj.png",\n    item3: "https://i.imgur.com/71efsm9.png",\n    item4: "https://i.imgur.com/eN7wh93.png",\n  },\n  load() {\n    const promises = Object.entries(this.imageUrls).map(([name, url]) => {\n      return new Promise((resolve, reject) => {\n        const img = new Image();\n        img.src = url;\n        img.onload = () => {\n          this.images[name] = img;\n          resolve();\n        };\n        img.onerror = reject;\n      });\n    });\n    return Promise.all(promises);\n  },\n};\n\nconst audioManager = {\n  sounds: {},\n  isMuted: false,\n  currentBgm: null,\n  init() {\n    this.sounds["bgm_menu"] = new Audio("https://files.catbox.moe/40erm4.aac");\n    this.sounds["bgm_easy"] = new Audio("https://files.catbox.moe/7lyf59.aac");\n    this.sounds["bgm_normal"] = new Audio("https://files.catbox.moe/qtmjy0.mp3");\n    this.sounds["bgm_hard"] = new Audio("https://files.catbox.moe/jplvoy.aac");\n    Object.keys(this.sounds).forEach((key) => {\n      if (key.startsWith("bgm")) this.sounds[key].loop = true;\n    });\n    this.sounds["sfx_hit"] = new Audio("https://files.catbox.moe/xitita.wav");\n  },\n  playBgm(trackName) {\n    if (this.currentBgm) {\n      this.currentBgm.pause();\n      this.currentBgm.currentTime = 0;\n    }\n    this.currentBgm = this.sounds[trackName];\n    if (!this.isMuted && this.currentBgm) {\n      this.currentBgm.play().catch((e) => console.warn("Autoplay prevented"));\n    }\n  },\n  playSfx(sfxName) {\n    if (!this.isMuted) {\n      const sfx = this.sounds[sfxName];\n      if (sfx) {\n        sfx.currentTime = 0;\n        sfx.play();\n      }\n    }\n  },\n  toggleMute() {\n    this.isMuted = !this.isMuted;\n    ui.muteBtn.textContent = this.isMuted ? "🔇" : "🔊";\n    if (this.isMuted) {\n      if (this.currentBgm) this.currentBgm.pause();\n    } else {\n      if (this.currentBgm) this.currentBgm.play();\n    }\n  },\n  pauseBgm() {\n    if (this.currentBgm) this.currentBgm.pause();\n  },\n  resumeBgm() {\n    if (this.currentBgm && !this.isMuted) this.currentBgm.play();\n  },\n  stopAll() {\n    if (this.currentBgm) {\n      this.currentBgm.pause();\n      this.currentBgm.currentTime = 0;\n      this.currentBgm = null;\n    }\n  },\n};\n\nconst canvas = ThemeUtils.$("#gameCanvas");\nconst ctx = canvas.getContext("2d");\nconst ui = {\n  scoreValue: ThemeUtils.$("#scoreValue"),\n  highscoreList: ThemeUtils.$("#highscoreList"),\n  mainHighscore: ThemeUtils.$("#mainHighscore"),\n  pauseBtn: ThemeUtils.$("#pauseBtn"),\n  muteBtn: ThemeUtils.$("#muteBtn"),\n  startScreen: ThemeUtils.$("#startScreen"),\n  startMenu: ThemeUtils.$("#startMenu"),\n  loadingText: ThemeUtils.$("#loadingText"),\n  pauseScreen: ThemeUtils.$("#pauseScreen"),\n  difficultyBtns: ThemeUtils.$$(".difficulty-btn"),\n  container: ThemeUtils.$(".gh-container"),\n  resumeBtn: ThemeUtils.$("#resumeBtn"),\n  backToMenuBtn: ThemeUtils.$("#backToMenuBtn"),\n};\n\nlet state = {\n  score: 0,\n  highscores: [],\n  entities: [],\n  isActive: false,\n  isPaused: false,\n  spawnTimer: 0,\n  config: {},\n};\nlet animationFrameId = null;\nconst difficultySettings = {\n  easy: { spawnInterval: 40, speedMultiplier: 0.8 },\n  normal: { spawnInterval: 22, speedMultiplier: 1.2 },\n  hard: { spawnInterval: 15, speedMultiplier: 1.8 },\n};\n\nfunction saveHighscores() {\n  ThemeUtils.sendMessage("save-data", { highscores: state.highscores });\n}\n\nfunction loadHighscores() {\n  ThemeUtils.sendMessage("request-data");\n}\n\nfunction updateHighscores(newScore) {\n  if (newScore === 0) return;\n  state.highscores.push(newScore);\n  state.highscores.sort((a, b) => b - a);\n  state.highscores = state.highscores.slice(0, 5);\n  updateHighscoreDisplay();\n  saveHighscores();\n}\n\nfunction updateHighscoreDisplay() {\n  const topScore = state.highscores.length > 0 ? state.highscores[0] : 0;\n  ui.mainHighscore.textContent = `🏆 High: ${topScore}`;\n  ui.highscoreList.innerHTML =\n    state.highscores.map((score) => `<li>${score}</li>`).join("") || "<li>-</li>";\n}\n\nclass Entity {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n    this.dead = false;\n  }\n  update() {}\n  draw() {}\n}\n\nclass Item extends Entity {\n  constructor() {\n    const size = ThemeUtils.randomInt(30, 45);\n    super(ThemeUtils.random(size, canvas.width - size), -size);\n    this.size = size;\n    this.speed = ThemeUtils.random(1, 2.5) * state.config.speedMultiplier;\n    this.hitboxSize = this.size * 0.7;\n    const imageKeys = Object.keys(assetManager.images);\n    this.image = assetManager.images[imageKeys[ThemeUtils.randomInt(0, imageKeys.length - 1)]];\n  }\n  update() {\n    this.y += this.speed;\n    if (this.y > canvas.height + this.size) this.dead = true;\n  }\n  draw() {\n    if (this.image) {\n      ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);\n    }\n  }\n}\n\nclass Particle extends Entity {\n  constructor(x, y) {\n    super(x, y);\n    this.life = 1;\n    this.vx = ThemeUtils.random(-3, 3);\n    this.vy = ThemeUtils.random(-3, 3);\n  }\n  update() {\n    this.x += this.vx;\n    this.y += this.vy;\n    this.vx *= 0.98;\n    this.vy *= 0.98;\n    this.life -= 0.02;\n    if (this.life <= 0) this.dead = true;\n  }\n  draw() {\n    ctx.fillStyle = `rgba(255, 123, 172, ${this.life})`;\n    ctx.fillRect(this.x - 2, this.y - 2, 4, 4);\n  }\n}\n\nfunction gameLoop() {\n  if (!document.body.contains(ui.container)) {\n    if (animationFrameId) {\n      cancelAnimationFrame(animationFrameId);\n      animationFrameId = null;\n    }\n    return;\n  }\n  if (!state.isActive) {\n    animationFrameId = null;\n    return;\n  }\n  if (state.isPaused) {\n    animationFrameId = requestAnimationFrame(gameLoop);\n    return;\n  }\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  state.spawnTimer++;\n  if (state.spawnTimer > state.config.spawnInterval) {\n    state.entities.push(new Item());\n    state.spawnTimer = 0;\n  }\n  for (let i = state.entities.length - 1; i >= 0; i--) {\n    const entity = state.entities[i];\n    entity.update();\n    entity.draw();\n    if (entity.dead) state.entities.splice(i, 1);\n  }\n  animationFrameId = requestAnimationFrame(gameLoop);\n}\n\nfunction handleInteraction(x, y) {\n  if (!state.isActive || state.isPaused) return;\n  const slash = document.createElement("div");\n  slash.className = "gh-slash-fx";\n  slash.style.left = `${x - 50}px`;\n  slash.style.top = `${y - 50}px`;\n  ui.container.appendChild(slash);\n  setTimeout(() => slash.remove(), 200);\n  for (let i = state.entities.length - 1; i >= 0; i--) {\n    const entity = state.entities[i];\n    if (entity instanceof Item) {\n      const distance = Math.hypot(x - entity.x, y - entity.y);\n      if (distance < entity.hitboxSize) {\n        entity.dead = true;\n        audioManager.playSfx("sfx_hit");\n        const popup = document.createElement("div");\n        popup.className = "gh-score-popup";\n        popup.textContent = "+1";\n        popup.style.left = `${entity.x}px`;\n        popup.style.top = `${entity.y}px`;\n        ui.container.appendChild(popup);\n        setTimeout(() => popup.remove(), 800);\n        for (let j = 0; j < 8; j++) state.entities.push(new Particle(entity.x, entity.y));\n        updateScore(state.score + 1);\n        break;\n      }\n    }\n  }\n}\n\nfunction updateScore(newScore) {\n  state.score = newScore;\n  ui.scoreValue.textContent = state.score;\n}\n\nfunction setGameScene(scene) {\n  ui.container.className = "gh-container";\n  ui.container.classList.add(`state-${scene}`);\n}\n\nfunction startGame(difficulty) {\n  state.config = difficultySettings[difficulty];\n  state.isActive = true;\n  state.isPaused = false;\n  state.spawnTimer = 0;\n  state.entities = [];\n  ui.startScreen.style.display = "none";\n  ui.pauseScreen.style.display = "none";\n  ui.pauseBtn.disabled = false;\n  setGameScene(difficulty);\n  audioManager.playBgm("bgm_" + difficulty);\n  updateScore(0);\n  if (animationFrameId) {\n    cancelAnimationFrame(animationFrameId);\n  }\n  gameLoop();\n}\n\nfunction togglePause() {\n  if (!state.isActive) return;\n  state.isPaused = !state.isPaused;\n  ui.pauseScreen.style.display = state.isPaused ? "flex" : "none";\n  if (state.isPaused) {\n    audioManager.pauseBgm();\n  } else {\n    audioManager.resumeBgm();\n  }\n}\n\nfunction resetGame() {\n  if (animationFrameId) {\n    cancelAnimationFrame(animationFrameId);\n    animationFrameId = null;\n  }\n  state.isActive = false;\n  state.isPaused = false;\n  state.entities = [];\n  state.score = 0;\n  state.spawnTimer = 0;\n  ui.startScreen.style.display = "flex";\n  ui.pauseScreen.style.display = "none";\n  ui.pauseBtn.disabled = true;\n  setGameScene("menu");\n  audioManager.playBgm("bgm_menu");\n  updateScore(0);\n}\n\nasync function initialize() {\n  ThemeUtils.sendMessage("register-stateful-theme");\n\n  window.addEventListener("message", (event) => {\n    const msg = event.data;\n    if (msg?.source === "typing-indicator-host") {\n      switch (msg.type) {\n        case "data-response":\n          if (msg.data && Array.isArray(msg.data.highscores)) {\n            state.highscores = msg.data.highscores;\n            updateHighscoreDisplay();\n          }\n          break;\n        case "context-update":\n          break;\n        case "graceful-shutdown-request":\n          if (animationFrameId) {\n            cancelAnimationFrame(animationFrameId);\n            animationFrameId = null;\n          }\n          if (state.isActive && state.score > 0) {\n            state.highscores.push(state.score);\n            state.highscores.sort((a, b) => b - a);\n            state.highscores = state.highscores.slice(0, 5);\n          }\n          state.isActive = false;\n          audioManager.stopAll();\n          ThemeUtils.sendMessage("graceful-shutdown-response", { highscores: state.highscores });\n          break;\n      }\n    }\n  });\n\n  const rect = canvas.getBoundingClientRect();\n  canvas.width = rect.width;\n  canvas.height = rect.height;\n  setGameScene("menu");\n  audioManager.init();\n  loadHighscores();\n\n  try {\n    await assetManager.load();\n    ui.loadingText.style.display = "none";\n    ui.startMenu.style.display = "block";\n  } catch (error) {\n    ui.loadingText.textContent = "Error loading assets!";\n    return;\n  }\n\n  ui.difficultyBtns.forEach((btn) => {\n    btn.addEventListener("click", (e) => {\n      startGame(e.target.dataset.difficulty);\n    });\n  });\n  ui.pauseBtn.addEventListener("click", togglePause);\n  ui.resumeBtn.addEventListener("click", togglePause);\n  ui.backToMenuBtn.addEventListener("click", () => {\n    if (state.isActive) {\n      updateHighscores(state.score);\n    }\n    resetGame();\n  });\n  ui.muteBtn.addEventListener("click", () => audioManager.toggleMute());\n\n  const firstInteractionHandler = () => {\n    if (audioManager.sounds["bgm_menu"]?.paused) {\n      audioManager.playBgm("bgm_menu");\n    }\n    document.body.removeEventListener("click", firstInteractionHandler);\n    document.body.removeEventListener("touchstart", firstInteractionHandler);\n  };\n  document.body.addEventListener("click", firstInteractionHandler);\n  document.body.addEventListener("touchstart", firstInteractionHandler);\n\n  canvas.addEventListener("mousedown", (e) => handleInteraction(e.offsetX, e.offsetY));\n  canvas.addEventListener("touchstart", (e) => {\n    e.preventDefault();\n    const rect = canvas.getBoundingClientRect();\n    const touch = e.touches[0];\n    handleInteraction(touch.clientX - rect.left, touch.clientY - rect.top);\n  }, { passive: false });\n}\n\ninitialize();',
    sizes: {
      floating_bottom: {
        width: "90vw",
        height: "160px",
        maxWidth: "380px",
      },
      chat_center: {
        width: "90vw",
        height: "200px",
        maxWidth: "420px",
      },
      draggable: {
        width: "90vw",
        height: "180px",
        maxWidth: "400px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "game-2048",
    name: "游戏-2048",
    useIframe: true,
    html: '<div class="g2048-container">\n    <div class="g2048-header">\n        <div class="g2048-title-area">\n            <h1 class="g2048-title">2048</h1>\n            <button id="g2048-new-game-btn" class="g2048-button small">新游戏</button>\n        </div>\n        <div class="g2048-scores">\n            <div class="g2048-score-box">\n                <span class="g2048-score-label">分数</span>\n                <span id="g2048-score">0</span>\n            </div>\n            <div class="g2048-score-box">\n                <span class="g2048-score-label">最高分</span>\n                <span id="g2048-best-score">0</span>\n            </div>\n        </div>\n    </div>\n    <div class="g2048-board-wrapper">\n        <div id="g2048-board" class="g2048-board">\n        </div>\n        <div id="g2048-game-over" class="g2048-overlay" style="display: none;">\n            <div class="g2048-menu">\n                <h2 id="g2048-menu-title">游戏结束!</h2>\n                <div class="g2048-button-group">\n                    <button id="g2048-continue-btn" class="g2048-button" style="display: none;">继续游戏</button>\n                    <button id="g2048-restart-btn" class="g2048-button">再试一次</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="g2048-footer">\n        <p class="g2048-instructions">合并方块，得到<strong>2048</strong>！</p>\n        <button id="g2048-undo-btn" class="g2048-button">撤销</button>\n    </div>\n</div>',
    iframeCSS:
      '@import url("https://fontsapi.zeoseven.com/114/main/result.css");\n\n:root {\n    --g2048-bg-start: #485563;\n    --g2048-bg-end: #29323c;\n    --g2048-board-bg: rgba(255, 255, 255, 0.1);\n    --g2048-cell-bg: rgba(255, 255, 255, 0.05);\n    --g2048-text-light: #fff;\n    --g2048-text-dark: #4a2c5a;\n    --g2048-font-cute: "ZoomlaMengyas-A080", sans-serif;\n    --g2048-radius: 12px;\n    --c2: #eee4da; --c4: #ede0c8; --c8: #f2b179; --c16: #f59563;\n    --c32: #f67c5f; --c64: #f65e3b; --c128: #edcf72; --c256: #edcc61;\n    --c512: #edc850; --c1024: #edc53f; --c2048: #edc22e; --c-super: #3c3a32;\n}\n\nbody { margin: 0; padding: 0; overflow: hidden; background: transparent; user-select: none; font-family: var(--g2048-font-cute); }\n\n.g2048-container {\n    width: 100%; height: 100%;\n    background: linear-gradient(45deg, var(--g2048-bg-start), var(--g2048-bg-end));\n    display: flex; flex-direction: column;\n    align-items: center; justify-content: center;\n    padding: 15px; box-sizing: border-box;\n}\n\n.g2048-header {\n    width: 100%; max-width: 400px;\n    display: flex; justify-content: space-between; align-items: center;\n    margin-bottom: 15px; color: var(--g2048-text-light);\n}\n.g2048-title-area { text-align: center; }\n.g2048-title { font-size: 3em; margin: 0; }\n.g2048-scores { display: flex; gap: 10px; }\n.g2048-score-box {\n    background: var(--g2048-board-bg);\n    padding: 8px 15px; border-radius: var(--g2048-radius);\n    text-align: center; min-width: 60px;\n}\n.g2048-score-label { font-size: 0.8em; display: block; opacity: 0.8; }\n#g2048-score, #g2048-best-score { font-size: 1.2em; }\n\n.g2048-board-wrapper { position: relative; width: 100%; max-width: 400px; aspect-ratio: 1 / 1; }\n.g2048-board {\n    width: 100%; height: 100%;\n    background: var(--g2048-board-bg);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: var(--g2048-radius);\n    backdrop-filter: blur(10px);\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 10px; padding: 10px;\n    box-sizing: border-box; position: relative;\n}\n.g2048-board::before {\n    content: \'\'; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;\n    display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; z-index: 1;\n    background-image: repeating-linear-gradient(45deg, var(--g2048-cell-bg) 0, var(--g2048-cell-bg) 2px, transparent 2px, transparent 5px);\n    border-radius: calc(var(--g2048-radius) - 5px);\n}\n\n.g2048-tile {\n    position: absolute;\n    width: calc(25% - 10px * 3/4); height: calc(25% - 10px * 3/4);\n    border-radius: var(--g2048-radius);\n    display: flex; justify-content: center; align-items: center;\n    font-size: 2em;\n    z-index: 2;\n    transition: transform 0.1s ease-in-out;\n    transform: translate(calc(var(--x, 0) * (100% + 10px)), calc(var(--y, 0) * (100% + 10px)));\n}\n.g2048-tile[data-value="2"], .g2048-tile[data-value="4"] { color: var(--g2048-text-dark); }\n.g2048-tile[data-value="2"] { background: var(--c2); } .g2048-tile[data-value="4"] { background: var(--c4); }\n.g2048-tile[data-value="8"] { background: var(--c8); color: var(--g2048-text-light); }\n.g2048-tile[data-value="16"] { background: var(--c16); color: var(--g2048-text-light); }\n.g2048-tile[data-value="32"] { background: var(--c32); color: var(--g2048-text-light); }\n.g2048-tile[data-value="64"] { background: var(--c64); color: var(--g2048-text-light); }\n.g2048-tile[data-value="128"] { background: var(--c128); color: var(--g2048-text-light); font-size: 1.8em; }\n.g2048-tile[data-value="256"] { background: var(--c256); color: var(--g2048-text-light); font-size: 1.8em; }\n.g2048-tile[data-value="512"] { background: var(--c512); color: var(--g2048-text-light); font-size: 1.8em; }\n.g2048-tile[data-value="1024"] { background: var(--c1024); color: var(--g2048-text-light); font-size: 1.5em; }\n.g2048-tile[data-value="2048"] { background: var(--c2048); color: var(--g2048-text-light); font-size: 1.5em; }\n.g2048-tile[data-value^="4"], .g2048-tile[data-value^="8"] { background: var(--c-super); color: var(--g2048-text-light); font-size: 1.5em; }\n\n.g2048-tile.new { animation: g2048-appear 0.2s ease; }\n@keyframes g2048-appear { from { transform: scale(0) translate(calc(var(--x, 0) * (100% + 10px)), calc(var(--y, 0) * (100% + 10px))); opacity: 0; } to { transform: scale(1) translate(calc(var(--x, 0) * (100% + 10px)), calc(var(--y, 0) * (100% + 10px))); opacity: 1; } }\n.g2048-tile.merged { animation: g2048-merge 0.2s ease; }\n@keyframes g2048-merge { 0%, 100% { transform: scale(1) translate(calc(var(--x, 0) * (100% + 10px)), calc(var(--y, 0) * (100% + 10px))); } 50% { transform: scale(1.2) translate(calc(var(--x, 0) * (100% + 10px)), calc(var(--y, 0) * (100% + 10px))); box-shadow: 0 0 10px #fff; } }\n\n\n.g2048-footer { width: 100%; max-width: 400px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; }\n.g2048-instructions { font-size: 0.9em; color: var(--g2048-text-light); opacity: 0.8; }\n\n.g2048-overlay {\n    position: absolute; top: 0; left: 0; width: 100%; height: 100%;\n    background: rgba(10, 5, 20, 0.4); backdrop-filter: blur(10px);\n    display: flex; justify-content: center; align-items: center;\n    z-index: 30; transition: opacity 0.3s ease;\n}\n.g2048-menu {\n    background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: 24px; padding: 2em; text-align: center;\n    color: var(--g2048-text-light); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\n}\n.g2048-menu h2 { font-size: 2.5em; margin: 0 0 20px; }\n\n.g2048-button {\n    font-family: var(--g2048-font-cute); font-size: 1.2em; color: var(--g2048-text-light);\n    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1)), linear-gradient(135deg, #ff85a1 0%, #a269c9 100%);\n    border: 2px solid rgba(255, 255, 255, 0.4); border-radius: 50px;\n    padding: 0.6em 1.5em; cursor: pointer;\n    transition: all 0.2s ease-in-out; text-shadow: 0 1px 3px rgba(0,0,0,0.4);\n    box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 -3px 4px rgba(0,0,0,0.2), inset 0 2px 2px rgba(255,255,255,0.4);\n}\n.g2048-button:hover { transform: translateY(-3px) scale(1.05); }\n.g2048-button:active { transform: translateY(1px) scale(1); }\n.g2048-button.small { font-size: 0.8em; padding: 0.5em 1em; }\n.g2048-button:disabled { background: #555; cursor: not-allowed; opacity: 0.6; }\n\n.g2048-button-group {\n    display: flex;\n    gap: 15px;\n    justify-content: center;\n}',
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("register-stateful-theme");\n\n  const boardElement = ThemeUtils.$("#g2048-board");\n  const scoreElement = ThemeUtils.$("#g2048-score");\n  const bestScoreElement = ThemeUtils.$("#g2048-best-score");\n  const gameOverOverlay = ThemeUtils.$("#g2048-game-over");\n  const restartButton = ThemeUtils.$("#g2048-restart-btn");\n  const newGameButton = ThemeUtils.$("#g2048-new-game-btn");\n  const undoButton = ThemeUtils.$("#g2048-undo-btn");\n  const menuTitle = ThemeUtils.$("#g2048-menu-title");\n  const continueButton = ThemeUtils.$("#g2048-continue-btn");\n\n  const SIZE = 4;\n  let grid = [];\n  let score = 0;\n  let bestScore = 0;\n  let previousGrid = [];\n  let previousScore = 0;\n  let canUndo = false;\n\n  function getGameState() {\n    return {\n      grid: grid,\n      score: score,\n      bestScore: bestScore,\n      isGameOver: gameOverOverlay.style.display !== "none",\n    };\n  }\n\n  function saveAndShutdown() {\n    if (score > bestScore) {\n      bestScore = score;\n    }\n    ThemeUtils.sendMessage("graceful-shutdown-response", getGameState());\n  }\n\n  window.addEventListener("message", (event) => {\n    const msg = event.data;\n    if (msg?.source === "typing-indicator-host") {\n      switch (msg.type) {\n        case "data-response":\n          const savedState = msg.data;\n          if (savedState && savedState.grid && !savedState.isGameOver) {\n            grid = savedState.grid;\n            score = savedState.score;\n            bestScore = savedState.bestScore;\n            menuTitle.textContent = "发现游戏存档";\n            continueButton.style.display = "inline-block";\n            restartButton.textContent = "新游戏";\n            gameOverOverlay.style.display = "flex";\n            updateUI();\n          } else {\n            setupNewGame();\n          }\n          break;\n        case "graceful-shutdown-request":\n          saveAndShutdown();\n          break;\n      }\n    }\n  });\n\n  function setupNewGame() {\n    grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));\n    score = 0;\n    canUndo = false;\n    gameOverOverlay.style.display = "none";\n    addRandomTile();\n    addRandomTile();\n    updateUI();\n  }\n\n  function startNewGameFromMenu() {\n    menuTitle.textContent = "游戏结束!";\n    continueButton.style.display = "none";\n    restartButton.textContent = "再试一次";\n    setupNewGame();\n  }\n\n  function saveState() {\n    previousGrid = JSON.parse(JSON.stringify(grid));\n    previousScore = score;\n    canUndo = true;\n  }\n\n  function undo() {\n    if (canUndo) {\n      grid = JSON.parse(JSON.stringify(previousGrid));\n      score = previousScore;\n      canUndo = false;\n      updateUI();\n    }\n  }\n\n  function addRandomTile() {\n    let emptyCells = [];\n    for (let r = 0; r < SIZE; r++) {\n      for (let c = 0; c < SIZE; c++) {\n        if (grid[r][c] === 0) emptyCells.push({ r, c });\n      }\n    }\n    if (emptyCells.length > 0) {\n      let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];\n      const tileValue = Math.random() < 0.9 ? 2 : 4;\n      grid[r][c] = tileValue;\n    }\n  }\n\n  function move(direction) {\n    let tempPreviousGrid = JSON.parse(JSON.stringify(grid));\n    let tempPreviousScore = score;\n    let hasChanged = false;\n    let tempGrid = JSON.parse(JSON.stringify(grid));\n\n    if (direction === "up") tempGrid = rotateGrid(tempGrid, 1);\n    if (direction === "right") tempGrid = rotateGrid(tempGrid, 2);\n    if (direction === "down") tempGrid = rotateGrid(tempGrid, 3);\n\n    for (let r = 0; r < SIZE; r++) {\n      let row = tempGrid[r].filter((val) => val !== 0);\n      for (let c = 0; c < row.length - 1; c++) {\n        if (row[c] === row[c + 1]) {\n          row[c] *= 2;\n          score += row[c];\n          row.splice(c + 1, 1);\n        }\n      }\n      while (row.length < SIZE) row.push(0);\n      tempGrid[r] = row;\n    }\n\n    if (direction === "up") tempGrid = rotateGrid(tempGrid, 3);\n    if (direction === "right") tempGrid = rotateGrid(tempGrid, 2);\n    if (direction === "down") tempGrid = rotateGrid(tempGrid, 1);\n\n    hasChanged = JSON.stringify(grid) !== JSON.stringify(tempGrid);\n\n    if (hasChanged) {\n      previousGrid = tempPreviousGrid;\n      previousScore = tempPreviousScore;\n      canUndo = true;\n      grid = tempGrid;\n      addRandomTile();\n      if (isGameOver()) {\n        if (score > bestScore) bestScore = score;\n        menuTitle.textContent = "游戏结束!";\n        continueButton.style.display = "none";\n        restartButton.textContent = "再试一次";\n        gameOverOverlay.style.display = "flex";\n      }\n      updateUI();\n    } else {\n      score = tempPreviousScore;\n    }\n  }\n\n  function rotateGrid(matrix, n = 1) {\n    for (let i = 0; i < n; i++) {\n      matrix = matrix[0].map((val, index) =>\n        matrix.map((row) => row[index]).reverse(),\n      );\n    }\n    return matrix;\n  }\n\n  function isGameOver() {\n    for (let r = 0; r < SIZE; r++) {\n      for (let c = 0; c < SIZE; c++) {\n        if (grid[r][c] === 0) return false;\n        if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return false;\n        if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return false;\n      }\n    }\n    return true;\n  }\n\n  function updateUI() {\n    boardElement.innerHTML = "";\n    for (let r = 0; r < SIZE; r++) {\n      for (let c = 0; c < SIZE; c++) {\n        if (grid[r][c] !== 0) {\n          const tile = document.createElement("div");\n          tile.className = "g2048-tile";\n          tile.dataset.value = grid[r][c];\n          tile.textContent = grid[r][c];\n          tile.style.setProperty("--x", c);\n          tile.style.setProperty("--y", r);\n          boardElement.appendChild(tile);\n        }\n      }\n    }\n    if (score > bestScore) {\n      bestScore = score;\n    }\n    scoreElement.textContent = score;\n    bestScoreElement.textContent = bestScore;\n    undoButton.disabled = !canUndo;\n  }\n\n  document.addEventListener("keydown", (e) => {\n    if (gameOverOverlay.style.display === "none") {\n      e.preventDefault();\n      switch (e.key) {\n        case "ArrowUp":\n          move("up");\n          break;\n        case "ArrowDown":\n          move("down");\n          break;\n        case "ArrowLeft":\n          move("left");\n          break;\n        case "ArrowRight":\n          move("right");\n          break;\n      }\n    }\n  });\n\n  let touchStartX = 0,\n    touchStartY = 0;\n  boardElement.addEventListener("touchstart", (e) => {\n    if (gameOverOverlay.style.display === "none") {\n      touchStartX = e.touches[0].clientX;\n      touchStartY = e.touches[0].clientY;\n    }\n  });\n\n  boardElement.addEventListener("touchend", (e) => {\n    if (gameOverOverlay.style.display === "none") {\n      let touchEndX = e.changedTouches[0].clientX;\n      let touchEndY = e.changedTouches[0].clientY;\n      let dx = touchEndX - touchStartX;\n      let dy = touchEndY - touchStartY;\n      if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {\n        if (Math.abs(dx) > Math.abs(dy)) {\n          move(dx > 0 ? "right" : "left");\n        } else {\n          move(dy > 0 ? "down" : "up");\n        }\n      }\n    }\n  });\n\n  continueButton.addEventListener("click", () => {\n    gameOverOverlay.style.display = "none";\n  });\n  restartButton.addEventListener("click", startNewGameFromMenu);\n  newGameButton.addEventListener("click", setupNewGame);\n  undoButton.addEventListener("click", undo);\n\n  ThemeUtils.sendMessage("request-data");\n});',
    sizes: {
      floating_bottom: {
        width: "90vw",
        height: "420px",
        maxWidth: "400px",
      },
      chat_center: {
        width: "90vw",
        height: "480px",
        maxWidth: "450px",
      },
      draggable: {
        width: "90vw",
        height: "450px",
        maxWidth: "420px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "spider_man_progress_bar",
    name: "蜘蛛侠-进度条",
    useIframe: true,
    html: '<div class="sm-container">\n    <div class="sm-avatar-container">\n        <div class="sm-comic-text-container"></div>\n        \n        <img class="sm-sticker sm-sticker-tl" src="https://i.imgur.com/2PPz1ml.png" alt="Sticker">\n        <img class="sm-avatar" src="{{char_avatar_url}}" alt="Character Avatar">\n        <img class="sm-sticker sm-sticker-br" src="https://i.imgur.com/kHMbSrk.png" alt="Sticker">\n    </div>\n\n    <div class="sm-progress-container">\n        <div class="sm-progress-bar">\n            <div class="sm-progress-bar-inner"></div>\n        </div>\n        <img class="sm-pointer" src="https://i.imgur.com/mWnRFqt.png" alt="Pointer">\n    </div>\n\n    <p class="sm-text">Your friendly neighborhood is typing...</p>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');\n\n:root {\n    --sm-red: #e62429;\n    --sm-dark-red: #a11b20;\n    --sm-black: #1a1a1a;\n    --sm-blue: #00509b;\n    --sm-white: #f0f0f0;\n    --sm-yellow: #fcee30;\n    --sm-cyan: #29abe2;\n    --sm-anim-duration: 5s; \n}\n\nbody {\n    background-color: transparent;\n    margin: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    overflow: hidden;\n}\n\n.sm-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 12px;\n    font-family: 'Bangers', cursive;\n    transition: transform 0.2s ease-out;\n}\n\n.sm-avatar-container {\n    position: relative;\n    width: 80px;\n    height: 80px;\n}\n.sm-avatar-container::before {\n    content: '';\n    position: absolute;\n    top: -5px; left: -5px;\n    width: calc(100% + 10px);\n    height: calc(100% + 10px);\n    background: conic-gradient(var(--sm-red), var(--sm-blue), var(--sm-red));\n    border-radius: 50%;\n    z-index: -1;\n    animation: sm-spin calc(var(--sm-anim-duration) * 1.5) linear infinite;\n}\n.sm-avatar {\n    width: 100%; height: 100%;\n    border-radius: 50%;\n    object-fit: cover;\n}\n\n.sm-sticker {\n    position: absolute;\n    width: 35px; height: 35px;\n    z-index: 10;\n    animation: sm-wobble var(--sm-anim-duration) ease-in-out infinite;\n    filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5));\n}\n.sm-sticker-tl {\n    top: -8px; left: -8px;\n}\n.sm-sticker-br {\n    bottom: -5px; right: -5px;\n    animation-delay: calc(var(--sm-anim-duration) / -2);\n}\n\n.sm-progress-container {\n    position: relative;\n    width: 260px; height: 22px;\n}\n\n.sm-progress-bar {\n    width: 100%; height: 100%;\n    background-color: var(--sm-black);\n    border-radius: 15px;\n    border: 2px solid #00284d;\n    overflow: hidden;\n    box-shadow: inset 0 3px 5px rgba(0,0,0,0.6), 0 2px 3px rgba(0,0,0,0.4);\n    position: relative;\n}\n.sm-progress-bar::after {\n    content: '';\n    position: absolute;\n    top: 1px; left: -30%;\n    width: 80%; height: 8px;\n    background: linear-gradient(to bottom, rgba(255,255,255,0.25), transparent);\n    border-radius: 8px;\n    transform: skewX(-45deg);\n}\n\n.sm-progress-bar-inner {\n    height: 100%; width: 0%;\n    border-radius: 15px;\n    background-image: repeating-linear-gradient(\n        -45deg,\n        var(--sm-red), var(--sm-red) 15px,\n        var(--sm-dark-red) 15px, var(--sm-dark-red) 30px\n    );\n    animation: sm-loading-progress var(--sm-anim-duration) linear infinite;\n}\n\n.sm-pointer {\n    position: absolute;\n    width: 45px; top: -14px; left: 0;\n    z-index: 20;\n    filter: drop-shadow(2px 3px 2px rgba(0,0,0,0.5));\n    animation: sm-pointer-move var(--sm-anim-duration) linear infinite;\n}\n\n.sm-text {\n    color: var(--sm-red);\n    font-size: 19px;\n    letter-spacing: 1.5px;\n    margin: 0;\n    padding-top: 5px;\n    text-align: center;\n    text-shadow: \n        -1.5px -1.5px 0 var(--sm-black), 1.5px -1.5px 0 var(--sm-black),\n        -1.5px 1.5px 0 var(--sm-black), 1.5px 1.5px 0 var(--sm-black),\n        3px 3px 4px rgba(0,0,0,0.6);\n    width: 39ch;\n    white-space: nowrap;\n    overflow: hidden;\n    border-right: 3px solid var(--sm-red);\n    animation: \n        sm-typing-effect var(--sm-anim-duration) steps(39) infinite,\n        sm-blink-cursor 0.75s step-end infinite;\n}\n\n.sm-comic-text-container {\n    position: absolute;\n    top: 0; left: 0;\n    width: 100%; height: 100%;\n    pointer-events: none; \n    z-index: 100;\n}\n\n.sm-comic-word {\n    position: absolute;\n    font-family: 'Bangers', cursive;\n    font-size: 28px;\n    font-weight: bold;\n    text-shadow: \n        -1.5px -1.5px 0 var(--sm-red), 1.5px -1.5px 0 var(--sm-red),\n        -1.5px 1.5px 0 var(--sm-red), 1.5px 1.5px 0 var(--sm-red),\n        3px 3px 0px var(--sm-black);\n    animation: sm-comic-pop 1.5s ease-out forwards;\n    user-select: none;\n}\n\n@keyframes sm-spin {\n    from { transform: rotate(0deg); }\n    to { transform: rotate(360deg); }\n}\n@keyframes sm-wobble {\n    0%, 100% { transform: rotate(-5deg) scale(1); }\n    50% { transform: rotate(5deg) scale(1.1); }\n}\n@keyframes sm-loading-progress {\n    0% { width: 0%; }\n    80% { width: 100%; }\n    90% { width: 100%; }\n    100% { width: 0%; }\n}\n@keyframes sm-pointer-move {\n    0% { left: 0; }\n    80% { left: calc(100% - 45px); }\n    90% { left: calc(100% - 45px); }\n    100% { left: 0; }\n}\n@keyframes sm-typing-effect {\n    0% { width: 0ch; }\n    80% { width: 39ch; }\n    90% { width: 39ch; }\n    100% { width: 0ch; }\n}\n@keyframes sm-blink-cursor {\n    50% { border-right-color: transparent; }\n}\n@keyframes sm-comic-pop {\n    0% { transform: scale(0) rotate(-30deg); opacity: 0; }\n    30% { transform: scale(1.2) rotate(10deg); opacity: 1; }\n    60% { transform: scale(1) rotate(-5deg); }\n    80% { opacity: 1; }\n    100% { transform: scale(0.8) rotate(15deg); opacity: 0; }\n}\n\n@media (max-width: 480px) {\n    .sm-container {\n        transform: scale(0.85);\n        transform-origin: center bottom;\n    }\n}",
    iframeJS:
      "document.addEventListener('DOMContentLoaded', () => {\n    let spawnerTimeoutId;\n    const textContainer = ThemeUtils.$('.sm-comic-text-container');\n    if (!textContainer) return;\n\n    const comicWords = ['WOW!', 'HI~', 'POW!', 'BAM!', 'ZAP!', '...?!', 'THWIP!'];\n    const comicColors = ['var(--sm-yellow)', 'var(--sm-cyan)', 'var(--sm-white)'];\n\n    function spawnComicWord() {\n        const wordElement = document.createElement('div');\n        wordElement.classList.add('sm-comic-word');\n        const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)];\n        const randomColor = comicColors[Math.floor(Math.random() * comicColors.length)];\n        wordElement.textContent = randomWord;\n        wordElement.style.color = randomColor;\n        wordElement.style.top = `${10 + Math.random() * 60}%`;\n        let randomLeft;\n        if (Math.random() < 0.5) {\n            randomLeft = Math.random() * 40 - 30;\n        } else {\n            randomLeft = Math.random() * 40 + 70;\n        }\n        wordElement.style.left = `${randomLeft}%`;\n        textContainer.appendChild(wordElement);\n        setTimeout(() => {\n            wordElement.remove();\n        }, 1500);\n    }\n\n    function autoSpawner() {\n        spawnComicWord();\n        const randomDelay = Math.random() * 2000 + 2000;\n        spawnerTimeoutId = setTimeout(autoSpawner, randomDelay);\n    }\n\n    spawnerTimeoutId = setTimeout(autoSpawner, 2500);\n\n    window.addEventListener('message', (event) => {\n        if (event.data?.source === 'typing-indicator-host' &&\n            event.data?.type === 'graceful-shutdown-request') {\n            if (spawnerTimeoutId) {\n                clearTimeout(spawnerTimeoutId);\n            }\n            ThemeUtils.sendMessage('graceful-shutdown-response');\n        }\n    });\n});",
    sizes: {
      floating_bottom: {
        width: "90vw",
        height: "180px",
        maxWidth: "300px",
      },
      chat_center: {
        width: "90vw",
        height: "190px",
        maxWidth: "320px",
      },
      draggable: {
        width: "90vw",
        height: "180px",
        maxWidth: "300px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "traverse_the_universe",
    name: "纵横宇宙",
    useIframe: true,
    html: '<div class="sv-container">\n    <img class="sv-background" src="https://i.imgur.com/glDasLB.jpeg">\n\n    <div class="sv-avatar-glitch">\n        <div class="sv-avatar" style="background-image: url(\'{{char_avatar_url}}\');"></div>\n    </div>\n    \n    <p class="sv-text-glitch" data-text="{{char}} is typing...">\n        {{char}} is typing...\n    </p>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');\n\n:root {\n    --sv-magenta: #ff00ff;\n    --sv-cyan: #00ffff;\n    --sv-black: #121212;\n    --sv-text-color: #f0f0f0;\n}\n\nbody {\n    background-color: transparent;\n    margin: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    overflow: hidden;\n    font-family: 'Bangers', cursive;\n}\n\n.sv-container {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 15px;\n    padding: 20px;\n    border-radius: 15px;\n    box-shadow: 0 0 8px var(--sv-cyan), 0 0 12px var(--sv-magenta);\n    overflow: hidden; \n}\n\n.sv-background {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    z-index: -1;\n}\n\n.sv-avatar-glitch {\n    position: relative;\n    width: 80px;\n    height: 80px;\n    animation: sv-flicker 3s infinite steps(1);\n}\n.sv-avatar {\n    width: 100%;\n    height: 100%;\n    background-size: cover;\n    background-position: center;\n    border-radius: 50%;\n    position: relative;\n}\n.sv-avatar::before,\n.sv-avatar::after {\n    content: '';\n    position: absolute;\n    top: 0; left: 0;\n    width: 100%; height: 100%;\n    background: inherit;\n    border-radius: 50%;\n    mix-blend-mode: lighten;\n    animation: sv-glitch-shift 1.5s infinite steps(2, jump-none);\n    z-index: 1;\n}\n.sv-avatar::before {\n    background-color: var(--sv-cyan);\n    animation-delay: -0.2s;\n}\n.sv-avatar::after {\n    background-color: var(--sv-magenta);\n    animation-delay: 0.2s;\n}\n\n.sv-text-glitch {\n    position: relative;\n    font-size: 18px;\n    color: var(--sv-text-color);\n    letter-spacing: 2px;\n    animation: sv-flicker 3s infinite steps(1) reverse;\n    text-shadow: 0 0 5px var(--sv-black);\n}\n.sv-text-glitch::before,\n.sv-text-glitch::after {\n    content: attr(data-text);\n    position: absolute;\n    top: 0; left: 0;\n    width: 100%; height: 100%;\n    text-shadow: none;\n}\n.sv-text-glitch::before {\n    left: 2px;\n    color: var(--sv-magenta);\n    mix-blend-mode: lighten;\n    animation: sv-text-glitch-anim 2s infinite steps(3);\n}\n.sv-text-glitch::after {\n    left: -2px;\n    color: var(--sv-cyan);\n    mix-blend-mode: lighten;\n    animation: sv-text-glitch-anim 2s infinite steps(3) reverse;\n}\n\n@keyframes sv-glitch-shift {\n    0%, 100% { transform: translate(0, 0); }\n    50% { transform: translate(calc(sin(var(--random-x, 0)*1deg)*4px), calc(cos(var(--random-y, 0)*1deg)*4px)); }\n}\n\n@keyframes sv-flicker {\n    50% { opacity: 0.8; }\n}\n\n@keyframes sv-text-glitch-anim {\n    0%, 100% { clip-path: inset(0 0 0 0); }\n    25% { clip-path: inset(20% 0 50% 0); transform: translateX(-3px); }\n    50% { clip-path: inset(40% 0 10% 0); transform: translateX(3px); }\n    75% { clip-path: inset(70% 0 5% 0); transform: translateX(-2px); }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n    const avatar = ThemeUtils.$(".sv-avatar");\n    const textGlitch = ThemeUtils.$(".sv-text-glitch");\n\n    if (!avatar || !textGlitch) return;\n    const updateText = (charName) => {\n        const newText = `${charName} is typing...`;\n        textGlitch.textContent = newText;\n        textGlitch.setAttribute("data-text", newText);\n    };\n\n    const updateAvatar = (avatarUrl) => {\n        if (avatar && avatarUrl) {\n            avatar.style.backgroundImage = `url(\'${avatarUrl}\')`;\n        }\n    };\n    if (window.themeData) {\n        updateText(window.themeData.charName);\n    }\n\n    const intervalId = setInterval(() => {\n        avatar.style.setProperty("--random-x", String(Math.random() * 360));\n        avatar.style.setProperty("--random-y", String(Math.random() * 360));\n    }, 500);\n    window.addEventListener("message", (event) => {\n        if (event.data?.source === "typing-indicator-host") {\n            switch (event.data.type) {\n                case "context-update":\n                    const data = event.data.data;\n                    if (data.charName) {\n                        updateText(data.charName);\n                    }\n                    if (data.charAvatarUrl) {\n                        updateAvatar(data.charAvatarUrl);\n                    }\n                    break;\n\n                case "graceful-shutdown-request":\n                    clearInterval(intervalId);\n                    ThemeUtils.sendMessage("graceful-shutdown-response");\n                    break;\n            }\n        }\n    });\n});',
    sizes: {
      floating_bottom: {
        width: "90vw",
        height: "180px",
        maxWidth: "320px",
      },
      chat_center: {
        width: "90vw",
        height: "190px",
        maxWidth: "340px",
      },
      draggable: {
        width: "90vw",
        height: "180px",
        maxWidth: "320px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "spider_man_stay",
    name: "蜘蛛侠-《STAY》",
    useIframe: true,
    html: '<div class="story-container state-loading">\n    <div class="stage stage-loading">\n        <img id="loading-gif" src="https://i.imgur.com/LJRjLt5.gif" alt="Loading Animation">\n    </div>\n\n    <div class="stage stage-choice">\n        <p class="choice-text">INCOMING MESSAGE...</p>\n        <div class="button-container">\n            <button class="choice-button">YES</button>\n            <button class="choice-button">YES</button>\n        </div>\n    </div>\n\n    <div class="stage stage-video">\n        <video id="main-video" src="https://files.catbox.moe/cgc410.mp4" playsinline controls></video>\n    </div>\n\n    <div class="stage stage-ending">\n        <img id="ending-gif" src="https://i.imgur.com/PcgZM2H.gif" alt="Ending Animation">\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');\n\n:root {\n    --sp-red: #e62429;\n    --sp-blue: #00509b;\n    --sp-black: #121212;\n    --sp-white: #f0f0f0;\n}\n\nbody {\n    background-color: transparent;\n    margin: 0;\n    font-family: 'Bangers', cursive;\n}\n\n.story-container {\n    width: 100%; height: 100%;\n    position: relative;\n    background-color: var(--sp-black);\n    border-radius: 10px;\n    overflow: hidden;\n    box-shadow: 0 0 10px var(--sp-blue), 0 0 15px var(--sp-red);\n}\n\n.stage {\n    display: none;\n    width: 100%; height: 100%;\n    justify-content: center;\n    align-items: center;\n}\n.stage img, .stage video {\n    width: 100%; height: 100%;\n    object-fit: cover;\n}\n.state-loading .stage-loading,\n.state-choice .stage-choice,\n.state-video .stage-video,\n.state-ending .stage-ending {\n    display: flex;\n}\n\n.stage-choice {\n    flex-direction: column;\n    gap: 15px;\n    background: radial-gradient(circle, var(--sp-blue) 0%, var(--sp-black) 70%);\n}\n.choice-text {\n    color: var(--sp-white);\n    font-size: 24px;\n    letter-spacing: 2px;\n    margin: 0;\n    text-shadow: 2px 2px 5px var(--sp-red);\n    animation: sp-fade-in-up 0.5s ease-out forwards;\n}\n.button-container {\n    display: flex;\n    gap: 20px;\n}\n.choice-button {\n    font-family: 'Bangers', cursive;\n    font-size: 20px;\n    background-color: var(--sp-red);\n    color: var(--sp-white);\n    border: 2px solid var(--sp-white);\n    border-radius: 5px;\n    padding: 5px 25px;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    opacity: 0;\n    animation: sp-fade-in-up 0.5s ease-out 0.3s forwards;\n}\n\n.choice-button:hover {\n    transform: scale(1.05);\n    box-shadow: 0 0 5px var(--sp-white), 0 0 15px var(--sp-red), 0 0 25px var(--sp-blue);\n}\n\n@keyframes sp-fade-in-up {\n    from {\n        opacity: 0;\n        transform: translateY(20px);\n    }\n    to {\n        opacity: 1;\n        transform: translateY(0);\n    }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  const container = ThemeUtils.$(".story-container");\n  const choiceButtons = ThemeUtils.$$(".choice-button");\n  const video = ThemeUtils.$("#main-video");\n  const loadingGif = ThemeUtils.$("#loading-gif");\n  const endingGif = ThemeUtils.$("#ending-gif");\n\n  if (\n    !container ||\n    !choiceButtons.length ||\n    !video ||\n    !loadingGif ||\n    !endingGif\n  )\n    return;\n\n  const originalLoadingSrc = loadingGif.src;\n  const originalEndingSrc = endingGif.src;\n  let loadingTimeoutId = null;\n  let endingTimeoutId = null;\n\n  function changeState(newState) {\n    container.className = `story-container state-${newState}`;\n  }\n\n  function startCycle() {\n    loadingGif.src = `${originalLoadingSrc}?t=${Date.now()}`;\n\n    changeState("loading");\n    loadingTimeoutId = setTimeout(() => {\n      changeState("choice");\n    }, 1500);\n  }\n\n  choiceButtons.forEach((button) => {\n    button.addEventListener("click", () => {\n      changeState("video");\n      video\n        .play()\n        .catch((e) => console.warn("[Spider-Man STAY] Play failed:", e));\n    });\n  });\n\n  video.addEventListener("ended", () => {\n    endingGif.src = `${originalEndingSrc}?t=${Date.now()}`;\n\n    changeState("ending");\n    endingTimeoutId = setTimeout(() => {\n      video.currentTime = 0;\n      startCycle();\n    }, 3000);\n  });\n\n  startCycle();\n  window.addEventListener("message", (event) => {\n    if (\n      event.data?.source === "typing-indicator-host" &&\n      event.data?.type === "graceful-shutdown-request"\n    ) {\n      if (loadingTimeoutId) clearTimeout(loadingTimeoutId);\n      if (endingTimeoutId) clearTimeout(endingTimeoutId);\n      video.pause();\n      video.currentTime = 0;\n      ThemeUtils.sendMessage("graceful-shutdown-response");\n    }\n  });\n});',
    sizes: {
      floating_bottom: {
        width: "90vw",
        height: "200px",
        maxWidth: "340px",
      },
      chat_center: {
        width: "90vw",
        height: "210px",
        maxWidth: "350px",
      },
      draggable: {
        width: "90vw",
        height: "200px",
        maxWidth: "340px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "player_white",
    name: "播放器-白色",
    useIframe: true,
    html: '<div class="mpp-container" data-state="collapsed" data-playlist-visible="false" data-search-visible="false">\n    <div class="mpp-collapsed-view" id="mpp-toggle-expand">\n        <img class="mpp-album-cover-small" id="mpp-avatar-small" src="" alt="Character Avatar">\n        <div class="mpp-deco-icon mpp-icon-waveform"><span></span><span></span><span></span></div>\n        <div class="mpp-deco-icon mpp-icon-heart-top">♡</div>\n        <div class="mpp-deco-icon mpp-icon-heart-bottom">♡</div>\n    </div>\n\n    <div class="mpp-player">\n        <div class="mpp-player-art">\n            <img class="mpp-album-cover" id="mpp-avatar-large" src="" alt="Character Avatar">\n            <div class="mpp-deco-icon mpp-icon-waveform"><span></span><span></span><span></span></div>\n            <div class="mpp-deco-icon mpp-icon-heart-top">♡</div>\n            <div class="mpp-deco-icon mpp-icon-heart-bottom">♡</div>\n        </div>\n        <div class="mpp-player-panel">\n            <div class="mpp-top-controls">\n                <button class="mpp-playlist-toggle" id="mpp-playlist-toggle-btn" title="播放列表">\n                    <svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></svg>\n                </button>\n                <button class="mpp-search-toggle" id="mpp-search-toggle-btn" title="搜索歌曲">\n                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>\n                </button>\n                <button class="mpp-collapse-btn" id="mpp-collapse-btn" title="收起">\n                    <svg viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>\n                </button>\n            </div>\n\n            <div class="mpp-song-info">\n    <div class="mpp-title-wrapper">\n        <h2 id="mpp-song-title">Song Title</h2>\n    </div>\n    <p id="mpp-song-artist">Artist</p>\n</div>\n\n            <div class="mpp-progress-bar-wrapper">\n                <div id="mpp-progress-bar" class="mpp-progress-bar">\n                    <div id="mpp-progress-fill" class="mpp-progress-fill"></div>\n                    <div id="mpp-progress-thumb" class="mpp-progress-thumb"></div>\n                </div>\n                <div class="mpp-time-display">\n                    <span id="mpp-current-time">0:00</span>\n                    <span id="mpp-duration-time">0:00</span>\n                </div>\n            </div>\n\n            <div class="mpp-controls">\n                <button id="mpp-prev-btn" class="mpp-control-btn" title="上一首"></button>\n                <button id="mpp-play-pause-btn" class="mpp-control-btn play" title="播放/暂停"></button>\n                <button id="mpp-next-btn" class="mpp-control-btn" title="下一首"></button>\n            </div>\n\n            <div class="mpp-lyrics-wrapper">\n                <ul id="mpp-lyrics-list"></ul>\n            </div>\n\n            <div class="mpp-bottom-bar">\n                <div class="mpp-waveform-bubble">\n                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n                </div>\n            </div>\n        </div>\n\n        <div class="mpp-playlist-panel">\n            <div class="mpp-playlist-header">\n                <button class="mpp-clear-playlist-btn" id="mpp-clear-playlist-btn" title="清空歌单">\n                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>\n                </button>\n                <h3>播放列表</h3>\n                <button class="mpp-panel-close-btn" id="mpp-playlist-close-btn">×</button>\n            </div>\n            <ul id="mpp-playlist-list"></ul>\n        </div>\n\n        <div class="mpp-search-panel">\n            <div class="mpp-search-header">\n                <h3>搜索歌曲</h3>\n                <button class="mpp-panel-close-btn" id="mpp-search-close-btn">×</button>\n            </div>\n            <div class="mpp-search-input-wrapper">\n                <input type="text" id="mpp-search-input" placeholder="输入歌曲名或歌手..." autocomplete="off">\n                <button id="mpp-search-btn" class="mpp-search-submit-btn">\n                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>\n                </button>\n            </div>\n            <div class="mpp-search-status" id="mpp-search-status"></div>\n            <ul id="mpp-search-results" class="mpp-search-results"></ul>\n        </div>\n    </div>\n\n    <div id="mpp-confirm-dialog" class="mpp-confirm-dialog mpp-hidden">\n        <div class="mpp-confirm-backdrop"></div>\n        <div class="mpp-confirm-content">\n            <div class="mpp-confirm-message">确定要清空播放列表吗？</div>\n            <div class="mpp-confirm-buttons">\n                <button id="mpp-confirm-cancel" class="mpp-confirm-btn cancel">取消</button>\n                <button id="mpp-confirm-ok" class="mpp-confirm-btn ok">确定</button>\n            </div>\n        </div>\n    </div>\n\n    <audio id="mpp-audio-player" crossorigin="anonymous"></audio>\n</div>',
    iframeCSS:
      '@import url(\'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap\');\n\n:root {\n    --mpp-bg-color: #F1F1F1;\n    --mpp-panel-color: #FFFFFF;\n    --mpp-text-main: #333333;\n    --mpp-text-light: #AAAAAA;\n    --mpp-text-highlight: #111;\n    --mpp-icon-color: #8A8A8A;\n    --mpp-accent-color: #555555;\n    --mpp-border-radius-large: 25px;\n    --mpp-border-radius-small: 12px;\n    --mpp-anim-duration: 0.4s;\n    --mpp-success-color: #4CAF50;\n    --mpp-hover-bg: rgba(0, 0, 0, 0.05);\n}\n\n@keyframes mpp-wave-quiet { 50% { transform: scaleY(0.5); } }\n@keyframes mpp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n@keyframes mpp-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }\n\nbody {\n    background-color: transparent;\n    margin: 0;\n    font-family: \'Noto Sans SC\', sans-serif;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    overflow: hidden;\n}\n\n.mpp-container {\n    position: relative;\n    width: 280px;\n    height: 440px;\n    transform-origin: top right;\n    transition: transform var(--mpp-anim-duration) cubic-bezier(0.25, 1, 0.5, 1), opacity var(--mpp-anim-duration) ease;\n}\n\n.mpp-container[data-state="collapsed"] {\n    width: 60px;\n    height: 60px;\n    transform: scale(0);\n    opacity: 0;\n}\n\n.mpp-container[data-state="collapsed"].visible {\n    transform: scale(1);\n    opacity: 1;\n}\n\n.mpp-container[data-state="collapsed"] .mpp-player { display: none; }\n\n.mpp-collapsed-view {\n    position: relative;\n    width: 60px;\n    height: 60px;\n    cursor: pointer;\n    transform-origin: center center;\n    transition: transform 0.2s ease;\n}\n\n.mpp-collapsed-view:hover { transform: scale(1.1); }\n\n.mpp-album-cover-small {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    border: 4px solid var(--mpp-bg-color);\n    box-shadow: 0 2px 8px rgba(0,0,0,0.15);\n    object-fit: cover;\n    animation: mpp-spin 25s linear infinite;\n    animation-play-state: paused;\n}\n\n.mpp-container.playing .mpp-album-cover-small,\n.mpp-container.playing .mpp-album-cover {\n    animation-play-state: running;\n}\n\n.mpp-deco-icon {\n    position: absolute;\n    background-color: var(--mpp-bg-color);\n    border-radius: 50%;\n    color: var(--mpp-icon-color);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n    z-index: 2;\n}\n\n.mpp-collapsed-view .mpp-icon-waveform {\n    width: 22px;\n    height: 22px;\n    top: 10px;\n    left: -12px;\n    gap: 2px;\n}\n\n.mpp-collapsed-view .mpp-icon-waveform span {\n    width: 1px;\n    height: 6px;\n    background-color: var(--mpp-icon-color);\n    border-radius: 1px;\n    animation: mpp-wave-quiet 1.5s infinite ease-in-out;\n}\n\n.mpp-collapsed-view .mpp-icon-waveform span:nth-child(2) { height: 9px; animation-delay: -1.2s; }\n.mpp-collapsed-view .mpp-icon-waveform span:nth-child(3) { height: 5px; animation-delay: -0.9s; }\n\n.mpp-collapsed-view .mpp-icon-heart-top { font-size: 8px; width: 16px; height: 16px; top: -3px; right: -2px; }\n.mpp-collapsed-view .mpp-icon-heart-bottom { font-size: 8px; width: 16px; height: 16px; bottom: 0; left: 5px; }\n\n.mpp-container[data-state="expanded"] {\n    transform: scale(1);\n    opacity: 1;\n}\n\n.mpp-container[data-state="expanded"] .mpp-collapsed-view { display: none; }\n\n.mpp-player {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    overflow: hidden;\n}\n\n.mpp-player-art {\n    position: absolute;\n    top: 10px;\n    left: 50%;\n    transform: translateX(-50%);\n    width: 120px;\n    height: 120px;\n    z-index: 2;\n}\n\n.mpp-player-art .mpp-icon-waveform {\n    width: 36px;\n    height: 36px;\n    top: 20px;\n    left: -20px;\n    gap: 2px;\n}\n\n.mpp-player-art .mpp-icon-waveform span {\n    width: 2px;\n    height: 10px;\n    background-color: var(--mpp-icon-color);\n    border-radius: 1px;\n    animation: mpp-wave-quiet 1.5s infinite ease-in-out;\n}\n\n.mpp-player-art .mpp-icon-waveform span:nth-child(2) { height: 15px; animation-delay: -1.2s; }\n.mpp-player-art .mpp-icon-waveform span:nth-child(3) { height: 8px; animation-delay: -0.9s; }\n\n.mpp-player-art .mpp-icon-heart-top { font-size: 14px; width: 28px; height: 28px; top: 0px; right: -8px; }\n.mpp-player-art .mpp-icon-heart-bottom { font-size: 14px; width: 28px; height: 28px; bottom: 0px; left: 8px; }\n\n.mpp-album-cover {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    border: 8px solid var(--mpp-bg-color);\n    box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n    object-fit: cover;\n    animation: mpp-spin 25s linear infinite;\n    animation-play-state: paused;\n}\n\n.mpp-player-panel {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    height: 370px;\n    background-color: var(--mpp-panel-color);\n    border-radius: var(--mpp-border-radius-large);\n    box-shadow: 0 8px 30px rgba(0,0,0,0.1);\n    padding: 75px 15px 8px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    transition: transform var(--mpp-anim-duration) ease, filter var(--mpp-anim-duration) ease;\n}\n\n.mpp-top-controls {\n    position: absolute;\n    top: 15px;\n    left: 15px;\n    right: 15px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    z-index: 5;\n    gap: 4px;\n}\n\n.mpp-collapse-btn,\n.mpp-playlist-toggle,\n.mpp-search-toggle {\n    width: 40px;\n    height: 40px;\n    background: var(--mpp-bg-color);\n    border: none;\n    border-radius: 50%;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: background-color 0.2s, transform 0.2s;\n}\n\n.mpp-collapse-btn:hover,\n.mpp-playlist-toggle:hover,\n.mpp-search-toggle:hover {\n    background: #E5E5E5;\n    transform: scale(1.05);\n}\n\n.mpp-collapse-btn:active,\n.mpp-playlist-toggle:active,\n.mpp-search-toggle:active {\n    transform: scale(0.95);\n}\n\n.mpp-collapse-btn svg,\n.mpp-playlist-toggle svg,\n.mpp-search-toggle svg {\n    width: 20px;\n    height: 20px;\n    fill: var(--mpp-icon-color);\n}\n\n.mpp-search-toggle {\n    margin-left: auto;\n}\n\n.mpp-song-info {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    width: 100%;\n    flex-shrink: 0;\n    height: 65px;\n    margin-bottom: 5px;\n}\n\n.mpp-title-wrapper {\n    width: 100%;\n    overflow: hidden;\n    position: relative;\n}\n\n#mpp-song-title {\n    font-size: 20px;\n    font-weight: 600;\n    margin: 0;\n    color: var(--mpp-text-main);\n    white-space: nowrap;\n    display: inline-block;\n    position: relative;\n}\n\n#mpp-song-title:not(.scrolling) {\n    max-width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n#mpp-song-title.scrolling {\n    animation: mpp-marquee-scroll var(--mpp-scroll-duration, 10s) linear infinite;\n}\n\n#mpp-song-title.scrolling::after {\n    content: attr(data-text);\n    position: absolute;\n    left: 100%;\n    padding-left: 50px;\n    white-space: nowrap;\n}\n\n@keyframes mpp-marquee-scroll {\n    0% { transform: translateX(0); }\n    100% { transform: translateX(calc(-100% - 30px)); }\n}\n\n#mpp-song-artist {\n    font-size: 13px;\n    margin: 4px 0 0 0;\n    color: var(--mpp-text-light);\n    width: 100%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mpp-progress-bar-wrapper {\n    width: 100%;\n    position: relative;\n    flex-shrink: 0;\n}\n\n.mpp-progress-bar {\n    width: 100%;\n    height: 5px;\n    background: var(--mpp-bg-color);\n    border-radius: 2.5px;\n    cursor: pointer;\n    position: relative;\n}\n\n.mpp-progress-fill {\n    height: 100%;\n    background: var(--mpp-accent-color);\n    border-radius: 2.5px;\n    transition: width 0.1s linear;\n}\n\n.mpp-progress-thumb {\n    width: 10px;\n    height: 10px;\n    background: var(--mpp-accent-color);\n    border-radius: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(0, -50%);\n    transition: left 0.1s linear;\n}\n\n.mpp-time-display {\n    display: flex;\n    justify-content: space-between;\n    font-size: 11px;\n    font-weight: 500;\n    color: var(--mpp-text-light);\n    margin-top: 8px;\n}\n\n.mpp-controls {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 45px;\n    margin: 10px 0 5px;\n    position: relative;\n    flex-shrink: 0;\n}\n\n.mpp-control-btn {\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: var(--mpp-text-main);\n    padding: 10px;\n    width: 44px;\n    height: 44px;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: contain;\n    transition: transform 0.15s ease, opacity 0.15s ease;\n}\n\n.mpp-control-btn:hover { transform: scale(1.1); }\n.mpp-control-btn:active { transform: scale(0.95); }\n\n#mpp-prev-btn { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M6 6h2v12H6zm12 0l-8.5 6 8.5 6V6z"/></svg>\'); }\n#mpp-next-btn { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M6 6l8.5 6-8.5 6V6zm10 12V6h2v12h-2z"/></svg>\'); }\n#mpp-play-pause-btn.play { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M8 5v14l11-7z"/></svg>\'); }\n#mpp-play-pause-btn.pause { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>\'); }\n\n.mpp-lyrics-wrapper {\n    flex-grow: 1;\n    overflow-y: auto;\n    overflow-x: hidden;\n    position: relative;\n    margin: 0 -5px;\n    min-height: 0;\n    scroll-behavior: smooth;\n    -webkit-overflow-scrolling: touch;\n}\n\n.mpp-lyrics-wrapper::-webkit-scrollbar {\n    width: 0;\n    display: none;\n}\n\n#mpp-lyrics-list {\n    list-style: none;\n    padding: 50px 0;\n    margin: 0;\n    text-align: center;\n}\n\n#mpp-lyrics-list > div {\n    padding: 2px 5px;\n    margin: 0;\n}\n\n#mpp-lyrics-list li {\n    color: var(--mpp-text-light);\n    transition: all 0.3s ease;\n    word-break: break-word;\n    overflow-wrap: break-word;\n    hyphens: auto;\n}\n\n#mpp-lyrics-list li.current {\n    color: var(--mpp-text-highlight);\n    font-weight: 700;\n    transform: scale(1.08);\n}\n\n.mpp-original-lyric { font-size: 15px; line-height: 1.5; }\n.mpp-translated-lyric { font-size: 13px; line-height: 1.4; opacity: 0.8; }\n\n.mpp-bottom-bar {\n    display: flex;\n    align-items: center;\n    margin-top: 5px;\n    flex-shrink: 0;\n    padding-bottom: 2px;\n}\n\n.mpp-waveform-bubble {\n    display: flex;\n    justify-content: center;\n    align-items: flex-end;\n    gap: 3px;\n    height: 36px;\n    background-color: var(--mpp-bg-color);\n    border-radius: var(--mpp-border-radius-small);\n    padding: 8px 15px;\n    flex-grow: 1;\n}\n\n.mpp-waveform-bubble span {\n    width: 3px;\n    height: 100%;\n    background-color: var(--mpp-icon-color);\n    border-radius: 1.5px;\n    transform-origin: bottom;\n    transform: scaleY(0.1);\n    transition: transform 0.1s ease-out;\n}\n\n.mpp-playlist-panel,\n.mpp-search-panel {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(255, 255, 255, 0.95);\n    backdrop-filter: blur(10px);\n    z-index: 10;\n    border-radius: var(--mpp-border-radius-large);\n    padding: 10px;\n    box-sizing: border-box;\n    transform: translateY(100%);\n    transition: transform var(--mpp-anim-duration) ease;\n    display: flex;\n    flex-direction: column;\n}\n\n.mpp-playlist-header,\n.mpp-search-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0 10px 10px;\n    flex-shrink: 0;\n}\n\n.mpp-playlist-header h3,\n.mpp-search-header h3 {\n    margin: 0;\n    font-weight: 500;\n    color: var(--mpp-text-main);\n    font-size: 16px;\n}\n\n.mpp-panel-close-btn {\n    background: none;\n    border: none;\n    font-size: 24px;\n    font-weight: 300;\n    color: var(--mpp-icon-color);\n    cursor: pointer;\n    line-height: 1;\n    padding: 0 5px;\n    transition: color 0.2s, transform 0.2s;\n}\n\n.mpp-panel-close-btn:hover {\n    color: var(--mpp-text-main);\n    transform: scale(1.1);\n}\n\n.mpp-container[data-playlist-visible="true"] .mpp-player-panel,\n.mpp-container[data-search-visible="true"] .mpp-player-panel {\n    transform: scale(0.95);\n    filter: blur(2px);\n}\n\n.mpp-container[data-playlist-visible="true"] .mpp-playlist-panel,\n.mpp-container[data-search-visible="true"] .mpp-search-panel {\n    transform: translateY(0%);\n}\n\n#mpp-playlist-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    overflow-y: auto;\n    flex-grow: 1;\n}\n\n#mpp-playlist-list li {\n    padding: 10px 12px;\n    border-bottom: 1px solid var(--mpp-bg-color);\n    cursor: pointer;\n    transition: background-color 0.2s;\n    font-size: 14px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 8px;\n}\n\n#mpp-playlist-list li:hover { background-color: var(--mpp-hover-bg); }\n#mpp-playlist-list li.active { color: var(--mpp-accent-color); font-weight: 700; }\n\n#mpp-playlist-list li .mpp-track-info {\n    flex: 1;\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n#mpp-playlist-list li .mpp-track-actions {\n    display: flex;\n    gap: 4px;\n    opacity: 0.6;\n    transition: opacity 0.2s;\n}\n\n#mpp-playlist-list li:hover .mpp-track-actions {\n    opacity: 1;\n}\n\n.mpp-track-action-btn {\n    width: 24px;\n    height: 24px;\n    border: none;\n    background: var(--mpp-bg-color);\n    border-radius: 4px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: background-color 0.2s, transform 0.15s;\n}\n\n.mpp-track-action-btn:hover {\n    background: #E0E0E0;\n    transform: scale(1.1);\n}\n\n.mpp-track-action-btn svg {\n    width: 14px;\n    height: 14px;\n    fill: var(--mpp-icon-color);\n}\n\n.mpp-search-input-wrapper {\n    display: flex;\n    gap: 6px;\n    padding: 0 2px 10px;\n    flex-shrink: 0;\n}\n\n#mpp-search-input {\n    flex: 1;\n    padding: 10px 14px;\n    border: 1px solid var(--mpp-bg-color);\n    border-radius: 20px;\n    font-size: 14px;\n    font-family: inherit;\n    outline: none;\n    transition: border-color 0.2s, box-shadow 0.2s;\n    background: var(--mpp-bg-color);\n}\n\n#mpp-search-input:focus {\n    border-color: var(--mpp-accent-color);\n    box-shadow: 0 0 0 2px rgba(85, 85, 85, 0.1);\n}\n\n#mpp-search-input::placeholder {\n    color: var(--mpp-text-light);\n}\n\n.mpp-search-submit-btn {\n    width: 40px;\n    height: 40px;\n    border: none;\n    background: var(--mpp-accent-color);\n    border-radius: 50%;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: background-color 0.2s, transform 0.15s;\n    flex-shrink: 0;\n}\n\n.mpp-search-submit-btn:hover {\n    background: #444;\n    transform: scale(1.05);\n}\n\n.mpp-search-submit-btn:active { transform: scale(0.95); }\n\n.mpp-search-submit-btn svg {\n    width: 18px;\n    height: 18px;\n    fill: white;\n}\n\n.mpp-search-submit-btn.loading svg {\n    animation: mpp-spin 0.8s linear infinite;\n}\n\n.mpp-search-status {\n    padding: 0 10px;\n    font-size: 12px;\n    color: var(--mpp-text-light);\n    min-height: 20px;\n    flex-shrink: 0;\n}\n\n.mpp-search-status.error { color: #e74c3c; }\n.mpp-search-status.success { color: var(--mpp-success-color); }\n\n.mpp-search-results {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    overflow-y: auto;\n    flex-grow: 1;\n}\n\n.mpp-search-results li {\n    padding: 10px 12px;\n    border-bottom: 1px solid var(--mpp-bg-color);\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    transition: background-color 0.2s;\n}\n\n.mpp-search-results li:hover { background-color: var(--mpp-hover-bg); }\n\n.mpp-search-result-cover {\n    width: 40px;\n    height: 40px;\n    border-radius: 6px;\n    object-fit: cover;\n    flex-shrink: 0;\n    background: var(--mpp-bg-color);\n}\n\n.mpp-search-result-info {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n}\n\n.mpp-search-result-title {\n    font-size: 14px;\n    font-weight: 500;\n    color: var(--mpp-text-main);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mpp-search-result-artist {\n    font-size: 12px;\n    color: var(--mpp-text-light);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mpp-search-result-source {\n    font-size: 10px;\n    color: var(--mpp-text-light);\n    background: var(--mpp-bg-color);\n    padding: 2px 6px;\n    border-radius: 10px;\n}\n\n.mpp-search-result-actions {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n    flex-shrink: 0;\n}\n\n.mpp-result-action-btn {\n    padding: 6px 10px;\n    border: none;\n    border-radius: 15px;\n    cursor: pointer;\n    font-size: 11px;\n    font-family: inherit;\n    transition: all 0.2s;\n    white-space: nowrap;\n}\n\n.mpp-result-action-btn.play-now {\n    background: var(--mpp-accent-color);\n    color: white;\n}\n\n.mpp-result-action-btn.play-now:hover {\n    background: #444;\n    transform: scale(1.02);\n}\n\n.mpp-result-action-btn.add-to-list {\n    background: var(--mpp-bg-color);\n    color: var(--mpp-text-main);\n}\n\n.mpp-result-action-btn.add-to-list:hover {\n    background: #E0E0E0;\n    transform: scale(1.02);\n}\n\n.mpp-result-action-btn.added {\n    background: var(--mpp-success-color);\n    color: white;\n    pointer-events: none;\n}\n\n.mpp-empty-state {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    color: var(--mpp-text-light);\n    font-size: 14px;\n    text-align: center;\n    padding: 20px;\n}\n\n.mpp-empty-state svg {\n    width: 48px;\n    height: 48px;\n    fill: var(--mpp-bg-color);\n    margin-bottom: 12px;\n}\n\n.mpp-container.loading #mpp-play-pause-btn,\n.mpp-container.loading .mpp-progress-bar {\n    pointer-events: none;\n    opacity: 0.6;\n}\n\n.mpp-container.loading #mpp-play-pause-btn {\n    background-image: none !important;\n    position: relative;\n}\n\n.mpp-container.loading #mpp-play-pause-btn::after {\n    content: \'\';\n    display: block;\n    width: 24px;\n    height: 24px;\n    border: 3px solid var(--mpp-icon-color);\n    border-top-color: var(--mpp-accent-color);\n    border-radius: 50%;\n    animation: mpp-spin 0.8s linear infinite;\n}\n\n.mpp-progress-bar::after {\n    content: \'\';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);\n    animation: mpp-loading-shine 1.5s linear infinite;\n    opacity: 0;\n    transition: opacity 0.3s;\n    border-radius: 2.5px;\n}\n\n.mpp-container.loading .mpp-progress-bar::after { opacity: 1; }\n\n@keyframes mpp-loading-shine {\n    0% { transform: translateX(-100%); }\n    100% { transform: translateX(100%); }\n}\n\n#mpp-playlist-list::-webkit-scrollbar,\n.mpp-search-results::-webkit-scrollbar {\n    width: 4px;\n}\n\n#mpp-playlist-list::-webkit-scrollbar-track,\n.mpp-search-results::-webkit-scrollbar-track {\n    background: transparent;\n}\n\n#mpp-playlist-list::-webkit-scrollbar-thumb,\n.mpp-search-results::-webkit-scrollbar-thumb {\n    background: var(--mpp-bg-color);\n    border-radius: 2px;\n}\n\n#mpp-playlist-list::-webkit-scrollbar-thumb:hover,\n.mpp-search-results::-webkit-scrollbar-thumb:hover {\n    background: #DDD;\n}\n\n.mpp-clear-playlist-btn {\n    width: 28px;\n    height: 28px;\n    background: none;\n    border: none;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    transition: background-color 0.2s, transform 0.15s;\n}\n\n.mpp-clear-playlist-btn:hover {\n    background: var(--mpp-hover-bg);\n    transform: scale(1.1);\n}\n\n.mpp-clear-playlist-btn:hover svg {\n    fill: #e74c3c;\n}\n\n.mpp-clear-playlist-btn svg {\n    width: 18px;\n    height: 18px;\n    fill: var(--mpp-icon-color);\n    transition: fill 0.2s;\n}\n\n.mpp-confirm-dialog {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 100;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.mpp-confirm-dialog.mpp-hidden { display: none; }\n\n.mpp-confirm-backdrop {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.5);\n    backdrop-filter: blur(4px);\n    border-radius: var(--mpp-border-radius-large);\n}\n\n.mpp-confirm-content {\n    position: relative;\n    background: var(--mpp-panel-color);\n    border-radius: var(--mpp-border-radius-small);\n    padding: 20px;\n    min-width: 200px;\n    text-align: center;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n    animation: mpp-scale-in 0.2s ease;\n}\n\n@keyframes mpp-scale-in {\n    from { transform: scale(0.9); opacity: 0; }\n    to { transform: scale(1); opacity: 1; }\n}\n\n.mpp-confirm-message {\n    font-size: 14px;\n    color: var(--mpp-text-main);\n    margin-bottom: 16px;\n}\n\n.mpp-confirm-buttons {\n    display: flex;\n    gap: 10px;\n    justify-content: center;\n}\n\n.mpp-confirm-btn {\n    padding: 8px 20px;\n    border: none;\n    border-radius: 20px;\n    font-size: 13px;\n    font-family: inherit;\n    cursor: pointer;\n    transition: all 0.2s;\n}\n\n.mpp-confirm-btn.cancel {\n    background: var(--mpp-bg-color);\n    color: var(--mpp-text-main);\n}\n\n.mpp-confirm-btn.cancel:hover {\n    background: #E0E0E0;\n}\n\n.mpp-confirm-btn.ok {\n    background: #8e281cff;\n    color: #fff;\n}\n\n.mpp-confirm-btn.ok:hover {\n    background: #8e281cff;\n}\n\n.mpp-container.loading #mpp-song-title,\n.mpp-container.loading #mpp-song-artist {\n    animation: mpp-pulse 1.5s ease-in-out infinite;\n}\n\n.mpp-container.loading .mpp-album-cover {\n    filter: grayscale(30%);\n    transition: filter 0.3s;\n}',
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  const DEBUG_MODE = false;\n\n  const log = (...args) => DEBUG_MODE && console.log("[Player]", ...args);\n  const warn = (...args) => DEBUG_MODE && console.warn("[Player]", ...args);\n  const error = (...args) => console.error("[Player]", ...args);\n\n  const DEFAULT_PLAYLIST = [\n    {\n      audioUrl: "https://files.catbox.moe/fcop94.mp3",\n      lyricsUrl: "https://files.catbox.moe/ev9d68.lrc",\n      title: "close your eyes",\n      artist: "澤野弘之/本田みちよ",\n    },\n    {\n      audioUrl: "https://files.catbox.moe/ookw2y.mp3",\n      lyricsUrl: "https://files.catbox.moe/z5n210.lrc",\n      title: "All Alone With You",\n      artist: "EGOIST",\n    },\n  ];\n\n  let state = {\n    isExpanded: false,\n    isPlaylistVisible: false,\n    isSearchVisible: false,\n    isPlaying: false,\n    currentTrackIndex: 0,\n    currentLyricIndex: -1,\n    playlist: [],\n    parsedLRC: [],\n    isSearching: false,\n    consecutiveErrors: 0,\n    shouldAutoPlay: false,\n    fallbackAttempts: 0,\n    maxFallbackAttempts: 3,\n    isChangingTrack: false,\n  };\n\n  function checkTitleScroll() {\n    const titleEl = dom.songTitle;\n    const wrapperEl = titleEl.parentElement;\n\n    titleEl.classList.remove("scrolling");\n\n    const containerWidth = wrapperEl.clientWidth;\n    if (containerWidth < 100) return;\n    const tempSpan = document.createElement("span");\n    tempSpan.style.cssText = `\n        visibility: hidden;\n        position: absolute;\n        white-space: nowrap;\n        font-size: 20px;\n        font-weight: 600;\n        font-family: \'Noto Sans SC\', sans-serif;\n    `;\n    tempSpan.textContent = titleEl.textContent;\n    document.body.appendChild(tempSpan);\n    const textWidth = tempSpan.offsetWidth;\n    document.body.removeChild(tempSpan);\n\n    if (textWidth > containerWidth - 10) {\n      const duration = Math.max(6, textWidth / 30);\n      titleEl.style.setProperty("--mpp-scroll-duration", `${duration}s`);\n      titleEl.setAttribute("data-text", titleEl.textContent);\n      titleEl.classList.add("scrolling");\n    }\n  }\n\n  let audioContext, analyser, source;\n  let animationFrameId;\n\n  function fuzzyMatchTrack(searchTitle, searchArtist, track) {\n    if (!track) return false;\n\n    const normalize = (str) => {\n      if (!str) return "";\n      if (Array.isArray(str)) {\n        str = str.join(" ");\n      }\n      return String(str)\n        .toLowerCase()\n        .replace(/\\s*[\\(\\（].*?[\\)\\）]\\s*/g, "")\n        .replace(/\\s*\\[.*?\\]\\s*/g, "")\n        .replace(/[-_]/g, " ")\n        .replace(/\\s+/g, " ")\n        .trim();\n    };\n\n    const normalizedSearchTitle = normalize(searchTitle);\n    const normalizedSearchArtist = normalize(searchArtist);\n\n    const trackTitles = [\n      track.title,\n      track.name,\n      track.originalTitle,\n      track.song,\n    ]\n      .filter(Boolean)\n      .map(normalize);\n\n    let artistSources = [];\n    if (Array.isArray(track.artist)) {\n      artistSources.push(...track.artist);\n    } else if (track.artist) {\n      artistSources.push(track.artist);\n    }\n    if (track.originalArtist) artistSources.push(track.originalArtist);\n    if (track.singer) artistSources.push(track.singer);\n\n    const trackArtists = artistSources.filter(Boolean).map((a) => normalize(a));\n\n    const titleMatch = trackTitles.some(\n      (t) =>\n        t === normalizedSearchTitle ||\n        t.includes(normalizedSearchTitle) ||\n        normalizedSearchTitle.includes(t),\n    );\n\n    const artistMatch = trackArtists.some(\n      (a) =>\n        a === normalizedSearchArtist ||\n        a.includes(normalizedSearchArtist) ||\n        normalizedSearchArtist.includes(a),\n    );\n\n    return titleMatch && artistMatch;\n  }\n\n  const dom = {\n    container: ThemeUtils.$(".mpp-container"),\n    toggleExpandBtn: ThemeUtils.$("#mpp-toggle-expand"),\n    collapseBtn: ThemeUtils.$("#mpp-collapse-btn"),\n    clearPlaylistBtn: ThemeUtils.$("#mpp-clear-playlist-btn"),\n    confirmDialog: ThemeUtils.$("#mpp-confirm-dialog"),\n    confirmCancel: ThemeUtils.$("#mpp-confirm-cancel"),\n    confirmOk: ThemeUtils.$("#mpp-confirm-ok"),\n    audioPlayer: ThemeUtils.$("#mpp-audio-player"),\n    avatarSmall: ThemeUtils.$("#mpp-avatar-small"),\n    avatarLarge: ThemeUtils.$("#mpp-avatar-large"),\n    songTitle: ThemeUtils.$("#mpp-song-title"),\n    songArtist: ThemeUtils.$("#mpp-song-artist"),\n    playPauseBtn: ThemeUtils.$("#mpp-play-pause-btn"),\n    nextBtn: ThemeUtils.$("#mpp-next-btn"),\n    prevBtn: ThemeUtils.$("#mpp-prev-btn"),\n    progressBar: ThemeUtils.$("#mpp-progress-bar"),\n    progressFill: ThemeUtils.$("#mpp-progress-fill"),\n    progressThumb: ThemeUtils.$("#mpp-progress-thumb"),\n    currentTimeEl: ThemeUtils.$("#mpp-current-time"),\n    durationTimeEl: ThemeUtils.$("#mpp-duration-time"),\n    lyricsWrapper: ThemeUtils.$(".mpp-lyrics-wrapper"),\n    lyricsList: ThemeUtils.$("#mpp-lyrics-list"),\n    waveformSpans: ThemeUtils.$$(".mpp-waveform-bubble span"),\n    playlistToggleBtn: ThemeUtils.$("#mpp-playlist-toggle-btn"),\n    playlistList: ThemeUtils.$("#mpp-playlist-list"),\n    playlistPanel: ThemeUtils.$(".mpp-playlist-panel"),\n    playlistCloseBtn: ThemeUtils.$("#mpp-playlist-close-btn"),\n    searchToggleBtn: ThemeUtils.$("#mpp-search-toggle-btn"),\n    searchPanel: ThemeUtils.$(".mpp-search-panel"),\n    searchCloseBtn: ThemeUtils.$("#mpp-search-close-btn"),\n    searchInput: ThemeUtils.$("#mpp-search-input"),\n    searchBtn: ThemeUtils.$("#mpp-search-btn"),\n    searchStatus: ThemeUtils.$("#mpp-search-status"),\n    searchResults: ThemeUtils.$("#mpp-search-results"),\n  };\n\n  const enterLoadingState = () => dom.container.classList.add("loading");\n  const exitLoadingState = () => dom.container.classList.remove("loading");\n\n  function formatTime(seconds) {\n    const minutes = Math.floor(seconds / 60);\n    const secondsPart = Math.floor(seconds % 60);\n    return `${minutes}:${secondsPart.toString().padStart(2, "0")}`;\n  }\n\n  function getAudioSource(audioUrl) {\n    if (!audioUrl) return "";\n    const needProxyDomains = [\n      "music.126.net",\n      "126.net",\n      "netease.com",\n      "qq.com",\n      "qqmusic.qq.com",\n      "y.qq.com",\n      "kuwo.cn",\n      "kuwo.com",\n      "kugou.com",\n      "migu.cn",\n    ];\n    const needProxy = needProxyDomains.some((domain) =>\n      audioUrl.includes(domain),\n    );\n    if (needProxy) {\n      return `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(\n        audioUrl,\n      )}`;\n    }\n    return audioUrl;\n  }\n\n  function getAudioDurationQuick(audioUrl) {\n    return new Promise((resolve) => {\n      const needProxyDomains = ["music.126.net", "qq.com", "kuwo.cn"];\n      const needProxy = needProxyDomains.some((d) => audioUrl.includes(d));\n      const finalUrl = needProxy\n        ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`\n        : audioUrl;\n      const audio = new Audio();\n      audio.preload = "metadata";\n      const timeout = setTimeout(() => {\n        audio.src = "";\n        resolve(null);\n      }, 3000);\n      audio.onloadedmetadata = () => {\n        clearTimeout(timeout);\n        const dur = audio.duration;\n        audio.src = "";\n        resolve(isFinite(dur) ? dur : null);\n      };\n      audio.onerror = () => {\n        clearTimeout(timeout);\n        audio.src = "";\n        resolve(null);\n      };\n      audio.src = finalUrl;\n    });\n  }\n\n  function sendCacheWriteback(track) {\n    if (!track || track._fromCache) return;\n    if (!track.id || !track.source) {\n      track._fromCache = true;\n      return;\n    }\n\n    if (typeof ThemeUtils === "undefined") return;\n\n    ThemeUtils.sendMessage("cache-track-data", {\n      title: track.originalTitle || track.title,\n      artist: track.originalArtist || track.artist,\n      trackData: {\n        id: track.id,\n        source: track.source,\n        title: track.title,\n        artist: track.artist,\n        coverUrl: track.coverUrl || "",\n      },\n      audioUrl: track.audioUrl,\n      lyricsContent: track.lyricsContent || "",\n      tlyricContent: track.tlyricContent || "",\n      coverUrl: track.coverUrl || "",\n    });\n\n    track._fromCache = true;\n  }\n\n  async function initialize() {\n    const charAvatarUrl = ThemeUtils.getCharAvatar();\n    dom.avatarSmall.src = charAvatarUrl;\n    dom.avatarLarge.src = charAvatarUrl;\n\n    let playlistFromCard = ThemeUtils.getPlaylist();\n    if (\n      playlistFromCard &&\n      Array.isArray(playlistFromCard) &&\n      playlistFromCard.length > 0\n    ) {\n      state.playlist = normalizePlaylist(playlistFromCard);\n    } else {\n      state.playlist = normalizePlaylist(DEFAULT_PLAYLIST);\n    }\n    if (state.playlist.length === 0) {\n      state.playlist = normalizePlaylist(DEFAULT_PLAYLIST);\n    }\n\n    renderPlaylist();\n    if (state.playlist.length > 0) {\n      await loadTrack(0, false);\n    }\n    setupEventListeners();\n    setTimeout(() => dom.container.classList.add("visible"), 50);\n    ThemeUtils.sendMessage("register-stateful-theme");\n    ThemeUtils.sendMessage("player-initialized");\n  }\n\n  function normalizePlaylist(playlist) {\n    if (!Array.isArray(playlist)) return [];\n    return playlist\n      .filter((song) => {\n        if (song == null) return false;\n        if (typeof song !== "object") return false;\n        const hasTitle = song.title || song.name || song.song;\n        return !!hasTitle;\n      })\n      .map((song) => ({\n        title: song.title || song.name || song.song || "未知歌曲",\n        artist: Array.isArray(song.artist)\n          ? song.artist.join(" / ")\n          : song.artist || song.singer || "未知艺术家",\n        audioUrl: song.audioUrl || song.url || song.mp3 || "",\n        lyricsUrl: song.lyricsUrl || song.lrc || "",\n        lyricsContent: song.lyricsContent || "",\n        tlyricContent: song.tlyricContent || "",\n        coverUrl: song.coverUrl || song.cover || song.pic || "",\n        id: song.id || null,\n        source: song.source || null,\n        sourceMessageId: song.sourceMessageId || null,\n        originalTitle:\n          song.originalTitle || song.title || song.name || song.song || null,\n        originalArtist:\n          song.originalArtist ||\n          (Array.isArray(song.artist)\n            ? song.artist.join(" / ")\n            : song.artist) ||\n          song.singer ||\n          null,\n        _fromCache: song._fromCache || false,\n        _triedSources: song._triedSources || [],\n        _isDirectLink: !!(song.audioUrl || song.url || song.mp3) && !song.id,\n      }));\n  }\n\n  function renderPlaylist() {\n    if (!dom.playlistList) return;\n\n    if (state.playlist.length === 0) {\n      dom.playlistList.innerHTML = `\n                <div class="mpp-empty-state">\n                    <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/></svg>\n                    <span>播放列表为空</span>\n                </div>`;\n      return;\n    }\n\n    dom.playlistList.innerHTML = state.playlist\n      .map(\n        (track, index) => `\n            <li data-index="${index}" class="${\n              index === state.currentTrackIndex ? "active" : ""\n            }">\n                <span class="mpp-track-info">${track.title} - ${\n                  track.artist\n                }</span>\n                <span class="mpp-track-actions">\n                    <button class="mpp-track-action-btn mpp-remove-track" data-index="${index}" title="移除">\n                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>\n                    </button>\n                </span>\n            </li>\n        `,\n      )\n      .join("");\n\n    updatePlaylistUI();\n  }\n\n  function updatePlaylistUI() {\n    if (!dom.playlistList) return;\n    Array.from(dom.playlistList.children).forEach((el, index) => {\n      if (el.tagName === "LI") {\n        el.classList.toggle("active", index === state.currentTrackIndex);\n      }\n    });\n  }\n\n  async function loadTrack(index, autoPlay = true) {\n    if (!state.playlist || !Array.isArray(state.playlist)) {\n      warn("Playlist is not an array");\n      exitLoadingState();\n      return;\n    }\n\n    if (state.playlist.length === 0) {\n      warn("Playlist is empty");\n      exitLoadingState();\n      return;\n    }\n\n    if (index < 0 || index >= state.playlist.length) {\n      warn(\n        "Track index out of bounds:",\n        index,\n        "playlist length:",\n        state.playlist.length,\n      );\n      exitLoadingState();\n      return;\n    }\n\n    let track = state.playlist[index];\n    if (!track || typeof track !== "object") {\n      warn("Track data invalid at index:", index, track);\n      state.playlist.splice(index, 1);\n      renderPlaylist();\n      if (state.playlist.length > 0) {\n        const newIndex = Math.min(index, state.playlist.length - 1);\n        await loadTrack(newIndex, autoPlay);\n      }\n      return;\n    }\n\n    state.isChangingTrack = true;\n    dom.audioPlayer.pause();\n    dom.audioPlayer.src = "";\n\n    state.consecutiveErrors = 0;\n    state.fallbackAttempts = 0;\n    enterLoadingState();\n    state.currentTrackIndex = index;\n    state.currentLyricIndex = -1;\n    state.shouldAutoPlay = autoPlay;\n    dom.lyricsList.innerHTML = "";\n    dom.lyricsWrapper.scrollTop = 0;\n    updatePlaylistUI();\n    if (!track.audioUrl && track.id && track.source) {\n      dom.songArtist.textContent = "正在获取播放链接...";\n      try {\n        const songData = await fetchSongUrl(track.id, track.source);\n        if (songData) {\n          track.audioUrl = songData.audioUrl || "";\n          track.lyricsUrl = track.lyricsUrl || songData.lyricsUrl || "";\n          track.lyricsContent =\n            track.lyricsContent || songData.lyricsContent || "";\n          track.tlyricContent =\n            track.tlyricContent || songData.tlyricContent || "";\n          if (songData._fromCache) {\n            track._fromCache = true;\n          }\n          state.playlist[index] = track;\n        }\n      } catch (err) {\n        error("[Player] 获取音频URL失败:", err);\n      }\n    }\n\n    if (!track.audioUrl) {\n      const title = track.originalTitle || track.title;\n      const artist = track.originalArtist || track.artist;\n\n      if (title && artist) {\n        log("No audioUrl, attempting to search:", title, artist);\n        await tryFallbackSource(\n          title,\n          artist,\n          track._triedSources || [],\n          autoPlay,\n        );\n        return;\n      } else {\n        warn("Track has no audioUrl and no title/artist info, skipping");\n        exitLoadingState();\n        state.isChangingTrack = false;\n        if (state.playlist.length > 1) {\n          const newIndex = (index + 1) % state.playlist.length;\n          setTimeout(() => loadTrack(newIndex, autoPlay), 500);\n        }\n        return;\n      }\n    }\n\n    dom.songTitle.textContent = track.title || "未知歌曲";\n    dom.songTitle.setAttribute("data-text", track.title || "未知歌曲");\n    setTimeout(() => {\n      if (state.isExpanded) {\n        checkTitleScroll();\n      }\n    }, 150);\n    dom.songArtist.textContent = track.artist || "未知艺术家";\n    dom.progressFill.style.width = "0%";\n    dom.progressThumb.style.left = "0";\n    dom.currentTimeEl.textContent = "0:00";\n    dom.durationTimeEl.textContent = "0:00";\n    dom.durationTimeEl.dataset.loaded = "false";\n\n    if (track.lyricsContent && track.lyricsContent.startsWith("[")) {\n      parseLRCText(track.lyricsContent, track.tlyricContent || "", track.source);\n      renderLyrics();\n    } else if (track.lyricsUrl) {\n      if (\n        track.lyricsUrl.startsWith("http://") ||\n        track.lyricsUrl.startsWith("https://")\n      ) {\n        await fetchAndParseLRC(track.lyricsUrl);\n        track = state.playlist[state.currentTrackIndex];\n        if (!track) {\n          warn("Track was removed during lyrics fetch, aborting loadTrack");\n          exitLoadingState();\n          state.isChangingTrack = false;\n          return;\n        }\n      } else if (track.lyricsUrl.startsWith("[")) {\n        parseLRCText(track.lyricsUrl, "", track.source);\n        renderLyrics();\n      } else {\n        state.parsedLRC = [];\n        renderLyrics();\n      }\n    } else if (track.id && track.source) {\n      await fetchLyricsFromAPI(\n        track.id,\n        track.source,\n        track.originalTitle || track.title,\n        track.originalArtist || track.artist,\n      );\n      track = state.playlist[state.currentTrackIndex];\n      if (!track) {\n        warn("Track was removed during lyrics API fetch, aborting loadTrack");\n        exitLoadingState();\n        state.isChangingTrack = false;\n        return;\n      }\n    } else {\n      state.parsedLRC = [];\n      renderLyrics();\n    }\n\n    const audioSrc = getAudioSource(track.audioUrl);\n    dom.audioPlayer.src = audioSrc;\n\n    if (autoPlay) {\n      dom.audioPlayer.preload = "auto";\n      dom.audioPlayer.load();\n    }\n  }\n\n  async function fetchLyricsFromAPI(id, source, title = "", artist = "") {\n    try {\n      const sourceMap = {\n        Netease: "netease",\n        Tencent: "tencent",\n        Kuwo: "kuwo",\n      };\n      const apiSource = sourceMap[source] || source.toLowerCase();\n\n      let url = `/api/plugins/g-player-proxy/lyric?id=${id}&source=${apiSource}`;\n      if (title) url += `&title=${encodeURIComponent(title)}`;\n      if (artist) url += `&artist=${encodeURIComponent(artist)}`;\n\n      const response = await fetch(url);\n      if (!response.ok) throw new Error("Lyrics fetch failed");\n      const data = await response.json();\n\n      const lyricData = data.data || data;\n      let lrcText = lyricData.lrc || lyricData.lyric || "";\n      let tlyricText = lyricData.tlyric || lyricData.trans || "";\n\n      const currentTrack = state.playlist[state.currentTrackIndex];\n      if (currentTrack) {\n        currentTrack.lyricsContent = lrcText;\n        currentTrack.tlyricContent = tlyricText;\n        state.playlist[state.currentTrackIndex] = currentTrack;\n      }\n\n      if (lrcText) {\n        parseLRCText(lrcText, tlyricText, source);\n      } else {\n        state.parsedLRC = [];\n      }\n    } catch (err) {\n      error("[Player] 歌词API获取失败:", err);\n      state.parsedLRC = [];\n    }\n    renderLyrics();\n  }\n\n  async function fetchSongUrl(id, source) {\n    try {\n      const sourceMap = {\n        Netease: "netease",\n        Tencent: "tencent",\n        Kuwo: "kuwo",\n      };\n      const apiSource = sourceMap[source] || source.toLowerCase();\n      const sourceLabel =\n        { netease: "Netease", tencent: "Tencent", kuwo: "Kuwo" }[apiSource] ||\n        source;\n\n      if (window.MusicCache) {\n        const cachedAudioUrl = window.MusicCache.getAudio(id, sourceLabel);\n        const cachedLyrics = window.MusicCache.getLyrics(id, sourceLabel);\n\n        if (cachedAudioUrl) {\n          return {\n            audioUrl: cachedAudioUrl,\n            lyricsUrl: "",\n            lyricsContent: cachedLyrics?.content || "",\n            tlyricContent: cachedLyrics?.tlyric || "",\n            _fromCache: true,\n          };\n        }\n      }\n\n      const response = await fetch(\n        `/api/plugins/g-player-proxy/song?id=${id}&source=${apiSource}`,\n      );\n      if (!response.ok) throw new Error("Song fetch failed");\n\n      const data = await response.json();\n      if (data._needFallback) {\n        return null;\n      }\n\n      let audioUrl = "";\n      let lyricsUrl = "";\n      let lyricsContent = "";\n      let tlyricContent = "";\n\n      if (data.data) {\n        if (Array.isArray(data.data)) {\n          const songItem = data.data[0] || {};\n          audioUrl = songItem.url || "";\n          const lrc = songItem.lrc || songItem.lyric || "";\n          const tlyric = songItem.tlyric || songItem.trans || "";\n          if (lrc && lrc.startsWith("[")) {\n            lyricsContent = lrc;\n            tlyricContent = tlyric;\n          } else {\n            lyricsUrl = lrc;\n          }\n        } else {\n          const songItem = data.data;\n          audioUrl = songItem.url || "";\n          const lrc = songItem.lrc || songItem.lyric || "";\n          const tlyric = songItem.tlyric || songItem.trans || "";\n          if (lrc && lrc.startsWith("[")) {\n            lyricsContent = lrc;\n            tlyricContent = tlyric;\n          } else {\n            lyricsUrl = lrc;\n          }\n        }\n      }\n\n      if (!audioUrl) {\n        return null;\n      }\n\n      if (window.MusicCache) {\n        window.MusicCache.setAudio(id, sourceLabel, audioUrl);\n        if (lyricsContent) {\n          window.MusicCache.setLyrics(\n            id,\n            sourceLabel,\n            lyricsContent,\n            tlyricContent,\n          );\n        }\n      }\n\n      return {\n        audioUrl,\n        lyricsUrl,\n        lyricsContent,\n        tlyricContent,\n        _fromCache: false,\n      };\n    } catch (err) {\n      error("[Player] fetchSongUrl 失败:", err);\n      return null;\n    }\n  }\n\n  async function tryFallbackSource(\n    title,\n    artist,\n    excludeSources = [],\n    autoPlay = false,\n  ) {\n    const track = state.playlist[state.currentTrackIndex];\n    if (!track) {\n      exitLoadingState();\n      state.isChangingTrack = false;\n      return;\n    }\n\n    if (state.fallbackAttempts >= state.maxFallbackAttempts) {\n      dom.songTitle.textContent = "无完整版音源";\n      dom.songArtist.textContent = `${title} - ${artist}`;\n      exitLoadingState();\n      state.fallbackAttempts = 0;\n      state.isChangingTrack = false;\n      setTimeout(() => {\n        if (state.playlist.length > 1) {\n          const newIndex =\n            (state.currentTrackIndex + 1) % state.playlist.length;\n          loadTrack(newIndex, autoPlay);\n        }\n      }, 2000);\n      return;\n    }\n\n    state.fallbackAttempts++;\n    state.isChangingTrack = true;\n    enterLoadingState();\n    dom.songTitle.textContent = title || "正在换源...";\n    dom.songArtist.textContent = `尝试其他音源... (${state.maxFallbackAttempts - state.fallbackAttempts + 1}个剩余)`;\n\n    if (window.MusicCache) {\n      const oldCached = window.MusicCache.getSearch(title, artist);\n      if (oldCached) {\n        window.MusicCache.invalidateAudio(oldCached.id, oldCached.source);\n      }\n    }\n\n    const allSources = ["tencent", "netease", "kuwo"];\n    const sources = allSources.filter((s) => {\n      const label = { tencent: "Tencent", netease: "Netease", kuwo: "Kuwo" }[s];\n      return !excludeSources.includes(label);\n    });\n\n    for (const source of sources) {\n      try {\n        const searchRes = await fetch(\n          `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(`${title} ${artist}`)}&source=${source}`,\n        );\n        const searchData = await searchRes.json();\n        if (!searchData?.data || searchData.data.length === 0) continue;\nconst normalizedTitle = title.toLowerCase().trim();\nconst normalizedArtist = artist.toLowerCase().trim();\n\nconst searchTrack = searchData.data.find((item) => {\n  const itemName = (item.song || item.name || "").toLowerCase();\n  const itemArtist = (item.singer || item.artist || "").toLowerCase();\n\n  const titleMatch =\n    itemName.includes(normalizedTitle) ||\n    normalizedTitle.includes(itemName);\n\n  const artistMatch =\n    itemArtist.includes(normalizedArtist) ||\n    normalizedArtist.includes(itemArtist);\n\n  return titleMatch && artistMatch;\n});\n\nif (!searchTrack) {\n  log(`[Player] ${source} 未找到匹配 "${title} - ${artist}"`);\n  continue;\n}\n\n        const trackId = searchTrack.id || searchTrack.rid;\n\n        const songRes = await fetch(\n          `/api/plugins/g-player-proxy/song?id=${trackId}&source=${source}`,\n        );\n        const songData = await songRes.json();\n\n        if (songData?._needFallback) continue;\n\n        let audioUrl = null;\n        let lyricData = { lyric: null, tlyric: null };\n\n        if (source === "netease") {\n          if (songData?.data?.[0]?.url) {\n            audioUrl = songData.data[0].url;\n            lyricData.lyric = songData.data[0].lyric || "";\n            lyricData.tlyric = songData.data[0].tlyric || "";\n          } else if (songData?.url) {\n            audioUrl = songData.url;\n            lyricData.lyric = songData.lyric || "";\n          }\n        } else if (source === "kuwo") {\n          if (songData?.data?.url) {\n            audioUrl = songData.data.url;\n            lyricData.lyric = songData.data.lrc || "";\n          }\n        } else if (source === "tencent") {\n          audioUrl = songData?.data?.url;\n          try {\n            const lyricRes = await fetch(\n              `/api/plugins/g-player-proxy/lyric?id=${trackId}&source=tencent`,\n            );\n            const lyricJson = await lyricRes.json();\n            if (lyricJson?.data) {\n              lyricData.lyric = lyricJson.data.lrc || "";\n              lyricData.tlyric =\n                lyricJson.data.tlyric || lyricJson.data.trans || "";\n            }\n          } catch (e) {}\n        }\n\n        if (!audioUrl || audioUrl.includes(".mp4")) continue;\n\n        const duration = await getAudioDurationQuick(audioUrl);\n        if (duration !== null && duration <= 35) continue;\n\n        state.fallbackAttempts = 0;\n        const sourceLabel = source.charAt(0).toUpperCase() + source.slice(1);\n\n        track.id = trackId;\n        track.source = sourceLabel;\n        track.audioUrl = audioUrl;\n        track.lyricsContent = lyricData.lyric || "";\n        track.tlyricContent = lyricData.tlyric || "";\n        track.coverUrl = searchTrack.cover || searchTrack.pic || track.coverUrl;\n        track.originalTitle = title;\n        track.originalArtist = artist;\n        track._fromCache = false;\n        track._triedSources = [...excludeSources, sourceLabel];\n        track._isDirectLink = false;\n\n        state.playlist[state.currentTrackIndex] = track;\n\n        if (window.MusicCache) {\n          window.MusicCache.setSearch(title, artist, {\n            id: trackId,\n            source: sourceLabel,\n            title: track.title,\n            artist: track.artist,\n            coverUrl: track.coverUrl || "",\n          });\n          window.MusicCache.setAudio(trackId, sourceLabel, audioUrl);\n          if (lyricData.lyric) {\n            window.MusicCache.setLyrics(\n              trackId,\n              sourceLabel,\n              lyricData.lyric,\n              lyricData.tlyric || "",\n            );\n          }\n        }\n\n        dom.songTitle.textContent = track.title;\n        dom.songArtist.textContent = track.artist;\n\n        if (lyricData.lyric) {\n          parseLRCText(lyricData.lyric, lyricData.tlyric || "", source);\n          renderLyrics();\n        }\n\n        dom.audioPlayer.src = getAudioSource(audioUrl);\n\n        sendCacheWriteback(track);\n\n        state.isChangingTrack = false;\n\n        if (autoPlay) {\n          dom.audioPlayer.play().catch((e) => warn("播放失败:", e));\n        }\n\n        renderPlaylist();\n        exitLoadingState();\n        return;\n      } catch (e) {\n        warn(`${source} 换源失败:`, e.message);\n      }\n    }\n\n    dom.songTitle.textContent = "无完整版音源";\n    dom.songArtist.textContent = `${title} - ${artist}`;\n    exitLoadingState();\n    state.isChangingTrack = false;\n    setTimeout(() => {\n      if (state.playlist.length > 1) {\n        const newIndex = (state.currentTrackIndex + 1) % state.playlist.length;\n        loadTrack(newIndex, autoPlay);\n      }\n    }, 2000);\n  }\n\n  function nextTrack() {\n    if (state.playlist.length === 0) return;\n    const newIndex = (state.currentTrackIndex + 1) % state.playlist.length;\n    loadTrack(newIndex, true);\n  }\n\n  function prevTrack() {\n    if (state.playlist.length === 0) return;\n    const newIndex =\n      (state.currentTrackIndex - 1 + state.playlist.length) %\n      state.playlist.length;\n    loadTrack(newIndex, true);\n  }\n\n  function setupAudioContext() {\n    if (audioContext) return;\n    audioContext = new (window.AudioContext || window.webkitAudioContext)();\n    analyser = audioContext.createAnalyser();\n    analyser.fftSize = 64;\n    source = audioContext.createMediaElementSource(dom.audioPlayer);\n    source.connect(analyser);\n    analyser.connect(audioContext.destination);\n    visualize();\n  }\n\n  function playTrack() {\n    if (state.playlist.length === 0) return;\n    if (!audioContext) setupAudioContext();\n    if (audioContext.state === "suspended") audioContext.resume();\n\n    state.isPlaying = true;\n    const playPromise = dom.audioPlayer.play();\n    if (playPromise !== undefined) {\n      playPromise.catch((err) => {\n        if (err.name !== "AbortError") {\n          error("Playback failed:", err);\n          pauseTrack();\n        }\n      });\n    }\n\n    dom.playPauseBtn.classList.remove("play");\n    dom.playPauseBtn.classList.add("pause");\n    dom.container.classList.add("playing");\n\n    sendPlaybackState(true);\n  }\n\n  function pauseTrack() {\n    state.isPlaying = false;\n    dom.audioPlayer.pause();\n    dom.playPauseBtn.classList.remove("pause");\n    dom.playPauseBtn.classList.add("play");\n    dom.container.classList.remove("playing");\n\n    sendPlaybackState(false);\n  }\n\n  function sendPlaybackState(isPlaying) {\n    const currentTrack = state.playlist[state.currentTrackIndex];\n    if (currentTrack && typeof ThemeUtils !== "undefined") {\n      ThemeUtils.sendMessage("playback-state-changed", {\n        isPlaying: isPlaying,\n        currentTrack: {\n          title: currentTrack.title,\n          name: currentTrack.title,\n          artist: currentTrack.artist,\n          originalTitle: currentTrack.originalTitle,\n          originalArtist: currentTrack.originalArtist,\n        },\n        lyrics: state.parsedLRC,\n      });\n    }\n  }\n\n  function updateProgress() {\n    const { duration, currentTime } = dom.audioPlayer;\n    if (duration) {\n      const progressPercent = (currentTime / duration) * 100;\n      dom.progressFill.style.width = `${progressPercent}%`;\n      dom.progressThumb.style.left = `calc(${progressPercent}% - 5px)`;\n      dom.currentTimeEl.textContent = formatTime(currentTime);\n\n      if (\n        !dom.durationTimeEl.dataset.loaded ||\n        dom.durationTimeEl.dataset.loaded === "false"\n      ) {\n        dom.durationTimeEl.textContent = formatTime(duration);\n        dom.durationTimeEl.dataset.loaded = "true";\n      }\n\n      const currentTrack = state.playlist[state.currentTrackIndex];\n      if (\n        currentTrack &&\n        state.isPlaying &&\n        typeof ThemeUtils !== "undefined"\n      ) {\n        ThemeUtils.sendMessage("playback-progress", {\n          currentTrack: {\n            title: currentTrack.title,\n            artist: currentTrack.artist,\n            originalTitle: currentTrack.originalTitle,\n            originalArtist: currentTrack.originalArtist,\n          },\n          progress: progressPercent,\n          currentTime: formatTime(currentTime),\n          duration: formatTime(duration),\n          currentTimeRaw: currentTime,\n        });\n      }\n    }\n    updateLyrics(dom.audioPlayer.currentTime);\n  }\n\n  function visualize() {\n    if (!analyser) return;\n    const bufferLength = analyser.frequencyBinCount;\n    const dataArray = new Uint8Array(bufferLength);\n\n    function draw() {\n      animationFrameId = requestAnimationFrame(draw);\n      analyser.getByteFrequencyData(dataArray);\n      dom.waveformSpans.forEach((span, i) => {\n        const barIndex = Math.floor(\n          i * (bufferLength / dom.waveformSpans.length),\n        );\n        const barHeight = Math.max(0.05, dataArray[barIndex] / 255);\n        span.style.transform = `scaleY(${barHeight})`;\n      });\n    }\n    draw();\n  }\n\n  async function fetchAndParseLRC(url) {\n    try {\n      const response = await fetch(url);\n      if (!response.ok)\n        throw new Error(`HTTP error! status: ${response.status}`);\n      const text = await response.text();\n\n      const currentTrack = state.playlist[state.currentTrackIndex];\n      parseLRCText(text, "", currentTrack?.source || "");\n\n      if (currentTrack) {\n        currentTrack.lyricsContent = text;\n      }\n    } catch (err) {\n      error("LRC loading or parsing failed:", err);\n      state.parsedLRC = [];\n    }\n    renderLyrics();\n  }\n\n  function parseLRCKuwo(lrcText) {\n    if (!lrcText) return [];\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/;\n    const lines = lrcText.split("\\n");\n\n    const parsed = [];\n    for (const line of lines) {\n      const match = line.match(timeRegex);\n      if (!match) continue;\n\n      const content = line.replace(/\\[[\\d:.]+\\]/g, "").trim();\n      if (\n        !content ||\n        content === "//" ||\n        content === "/ /" ||\n        /^\\/+$/.test(content) ||\n        /^[:\\s]+$/.test(content)\n      )\n        continue;\n\n      const time =\n        parseInt(match[1], 10) * 60 +\n        parseInt(match[2], 10) +\n        parseInt(match[3].padEnd(3, "0"), 10) / 1000;\n\n      parsed.push({ time, text: content });\n    }\n\n    const timeGroups = new Map();\n    for (const item of parsed) {\n      const key = item.time.toFixed(3);\n      if (!timeGroups.has(key)) {\n        timeGroups.set(key, []);\n      }\n      timeGroups.get(key).push(item.text);\n    }\n\n    const result = [];\n    const sortedTimes = Array.from(timeGroups.keys()).sort(\n      (a, b) => parseFloat(a) - parseFloat(b),\n    );\n\n    for (const timeKey of sortedTimes) {\n      const time = parseFloat(timeKey);\n      const texts = timeGroups.get(timeKey);\n\n      if (texts.length === 1) {\n        result.push({ time, text: texts[0], translated: null });\n      } else if (texts.length >= 2) {\n        if (result.length > 0 && !result[result.length - 1].translated) {\n          result[result.length - 1].translated = texts[0];\n        }\n        result.push({ time, text: texts[1], translated: null });\n        if (texts.length > 2) {\n          result[result.length - 1].translated = texts.slice(2).join(" ");\n        }\n      }\n    }\n\n    return result;\n  }\n\n  function parseLRCText(lrcText, tlyricText = "", source = "") {\n    if (!lrcText && !tlyricText) {\n      state.parsedLRC = [];\n      return;\n    }\n\n    if (source && source.toLowerCase() === "kuwo") {\n      state.parsedLRC = parseLRCKuwo(lrcText);\n      return;\n    }\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g;\n\n    function parseLines(text) {\n      if (!text) return [];\n      const lines = [];\n      text.split("\\n").forEach((line) => {\n        const content = line.replace(timeRegex, "").trim();\n        if (!content) return;\n        if (content === "//" || content === "//\\\\n" || /^\\/+$/.test(content))\n          return;\n        if (/^\\s+$/.test(content)) return;\n\n        timeRegex.lastIndex = 0;\n        let match;\n        while ((match = timeRegex.exec(line))) {\n          const time =\n            parseInt(match[1]) * 60 +\n            parseInt(match[2]) +\n            parseInt(match[3].padEnd(3, "0")) / 1000;\n          lines.push({ time, text: content });\n        }\n      });\n      return lines;\n    }\n\n    const isChinese = (text) => /[\\u4e00-\\u9fa5]/.test(text);\n    const isJapanese = (text) => /[\\u3040-\\u309f\\u30a0-\\u30ff]/.test(text);\n    const isKorean = (text) => /[\\uac00-\\ud7af]/.test(text);\n    const isAsian = (text) =>\n      isChinese(text) || isJapanese(text) || isKorean(text);\n\n    let mainLines = parseLines(lrcText);\n    let transLines = parseLines(tlyricText);\n\n    if (mainLines.length === 0 && transLines.length === 0) {\n      state.parsedLRC = [];\n      return;\n    }\n\n    if (tlyricText && transLines.length > 0) {\n      mainLines.sort((a, b) => a.time - b.time);\n      transLines.sort((a, b) => a.time - b.time);\n      const transMap = new Map();\n      transLines.forEach((line) => {\n        const key = line.time.toFixed(2);\n        if (!transMap.has(key)) {\n          transMap.set(key, line.text);\n        }\n      });\n      state.parsedLRC = mainLines.map((line) => ({\n        time: line.time,\n        text: line.text,\n        translated: transMap.get(line.time.toFixed(2)) || null,\n      }));\n      return;\n    }\n\n    let splitIndex = -1;\n    for (let i = 1; i < mainLines.length; i++) {\n      if (mainLines[i].time < mainLines[i - 1].time - 30) {\n        splitIndex = i;\n        break;\n      }\n    }\n\n    if (splitIndex > 0) {\n      const firstPart = mainLines.slice(0, splitIndex);\n      const secondPart = mainLines.slice(splitIndex);\n\n      const firstHasChinese = firstPart.some((l) => isChinese(l.text));\n      const secondHasChinese = secondPart.some((l) => isChinese(l.text));\n      const firstHasJapanese = firstPart.some((l) => isJapanese(l.text));\n\n      let originalPart, transPart;\n      if (!firstHasChinese && secondHasChinese) {\n        originalPart = firstPart;\n        transPart = secondPart;\n      } else if (firstHasChinese && !secondHasChinese) {\n        originalPart = secondPart;\n        transPart = firstPart;\n      } else if (firstHasJapanese && secondHasChinese) {\n        originalPart = firstPart;\n        transPart = secondPart;\n      } else {\n        originalPart = firstPart;\n        transPart = secondPart;\n      }\n\n      const transMap = new Map();\n      transPart.forEach((t) => transMap.set(t.time.toFixed(2), t.text));\n\n      originalPart.sort((a, b) => a.time - b.time);\n      state.parsedLRC = originalPart.map((line) => ({\n        time: line.time,\n        text: line.text,\n        translated: transMap.get(line.time.toFixed(2)) || null,\n      }));\n      return;\n    }\n\n    mainLines.sort((a, b) => a.time - b.time);\n\n    let hasAlternatingPattern = false;\n    if (mainLines.length >= 4) {\n      let alternateCount = 0;\n      for (let i = 0; i < Math.min(mainLines.length - 1, 20); i++) {\n        const curr = mainLines[i];\n        const next = mainLines[i + 1];\n        const currIsAsian = isAsian(curr.text);\n        const nextIsAsian = isAsian(next.text);\n        if (currIsAsian !== nextIsAsian) {\n          alternateCount++;\n        }\n      }\n      hasAlternatingPattern =\n        alternateCount >= Math.min(mainLines.length - 1, 20) * 0.7;\n    }\n\n    if (hasAlternatingPattern) {\n      const merged = [];\n      let i = 0;\n      while (i < mainLines.length) {\n        const curr = mainLines[i];\n        const next = mainLines[i + 1];\n        if (next) {\n          const currIsAsian = isAsian(curr.text);\n          const nextIsAsian = isAsian(next.text);\n          if (!currIsAsian && nextIsAsian) {\n            merged.push({\n              time: curr.time,\n              text: curr.text,\n              translated: next.text,\n            });\n            i += 2;\n            continue;\n          } else if (currIsAsian && !nextIsAsian) {\n            merged.push({\n              time: curr.time,\n              text: next.text,\n              translated: curr.text,\n            });\n            i += 2;\n            continue;\n          }\n        }\n        merged.push({ time: curr.time, text: curr.text, translated: null });\n        i++;\n      }\n      state.parsedLRC = merged;\n      return;\n    }\n\n    const merged = [];\n    for (let i = 0; i < mainLines.length; i++) {\n      const current = mainLines[i];\n      const next = mainLines[i + 1];\n      if (next && Math.abs(next.time - current.time) < 0.05) {\n        const currentIsAsian = isAsian(current.text);\n        const nextIsAsian = isAsian(next.text);\n        if (currentIsAsian && !nextIsAsian) {\n          merged.push({\n            time: current.time,\n            text: next.text,\n            translated: current.text,\n          });\n        } else if (!currentIsAsian && nextIsAsian) {\n          merged.push({\n            time: current.time,\n            text: current.text,\n            translated: next.text,\n          });\n        } else {\n          merged.push({\n            time: current.time,\n            text: current.text,\n            translated: next.text,\n          });\n        }\n        i++;\n        continue;\n      }\n      merged.push({ time: current.time, text: current.text, translated: null });\n    }\n\n    state.parsedLRC = merged;\n  }\n\n  function renderLyrics() {\n    if (state.parsedLRC.length === 0) {\n      dom.lyricsList.innerHTML = \'<li class="mpp-empty-lyric">暂无歌词</li>\';\n      return;\n    }\n    dom.lyricsList.innerHTML = state.parsedLRC\n      .map(\n        (line, index) => `\n            <div data-index="${index}">\n                <li class="mpp-original-lyric">${line.text}</li>\n                ${\n                  line.translated\n                    ? `<li class="mpp-translated-lyric">${line.translated}</li>`\n                    : ""\n                }\n            </div>\n        `,\n      )\n      .join("");\n  }\n\n  function updateLyrics(currentTime) {\n    if (state.parsedLRC.length === 0) return;\n\n    let newLyricIndex = -1;\n    for (let i = state.parsedLRC.length - 1; i >= 0; i--) {\n      if (currentTime >= state.parsedLRC[i].time) {\n        newLyricIndex = i;\n        break;\n      }\n    }\n\n    if (newLyricIndex !== -1 && newLyricIndex !== state.currentLyricIndex) {\n      const allLines = dom.lyricsList.children;\n\n      if (allLines[state.currentLyricIndex]) {\n        Array.from(allLines[state.currentLyricIndex].children).forEach((el) =>\n          el.classList.remove("current"),\n        );\n      }\n\n      state.currentLyricIndex = newLyricIndex;\n      const currentLineEl = allLines[state.currentLyricIndex];\n\n      if (currentLineEl) {\n        Array.from(currentLineEl.children).forEach((el) =>\n          el.classList.add("current"),\n        );\n\n        const container = dom.lyricsWrapper;\n        const targetScrollTop =\n          currentLineEl.offsetTop -\n          container.clientHeight / 2 +\n          currentLineEl.offsetHeight / 2;\n\n        container.scrollTo({\n          top: Math.max(0, targetScrollTop),\n          behavior: "smooth",\n        });\n      }\n    }\n  }\n\n  async function searchSongs(query) {\n    if (!query.trim() || state.isSearching) return;\n\n    state.isSearching = true;\n    dom.searchBtn.classList.add("loading");\n    dom.searchStatus.textContent = "搜索中...";\n    dom.searchStatus.className = "mpp-search-status";\n    dom.searchResults.innerHTML = "";\n\n    const sources = ["tencent", "netease", "kuwo"];\n    let allResults = [];\n\n    for (const source of sources) {\n      try {\n        const response = await fetch(\n          `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(\n            query,\n          )}&source=${source}`,\n        );\n        if (!response.ok) continue;\n\n        const result = await response.json();\n        if (result.data && result.data.length > 0) {\n          const sourceLabel =\n            { netease: "Netease", tencent: "Tencent", kuwo: "Kuwo" }[source] ||\n            source;\n          const tracks = result.data.map((track) => ({\n            id: track.id || track.rid,\n            title: track.song || track.name,\n            artist: track.singer || track.artist,\n            coverUrl: track.cover || track.pic || "",\n            source: sourceLabel,\n          }));\n          allResults = allResults.concat(tracks);\n        }\n      } catch (err) {\n        warn(`[Search] ${source} failed:`, err.message);\n      }\n    }\n\n    state.isSearching = false;\n    dom.searchBtn.classList.remove("loading");\n\n    if (allResults.length > 0) {\n      dom.searchStatus.textContent = `找到 ${allResults.length} 首歌曲`;\n      dom.searchStatus.className = "mpp-search-status success";\n      renderSearchResults(allResults);\n    } else {\n      dom.searchStatus.textContent = "未找到相关歌曲";\n      dom.searchStatus.className = "mpp-search-status error";\n      dom.searchResults.innerHTML = `\n                <div class="mpp-empty-state">\n                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>\n                    <span>换个关键词试试？</span>\n                </div>`;\n    }\n  }\n\n  function renderSearchResults(results) {\n    dom.searchResults.innerHTML = results\n      .map(\n        (track, index) => `\n            <li data-index="${index}">\n                <img class="mpp-search-result-cover" src="${\n                  track.coverUrl ||\n                  "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23ccc%22><path d=%22M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z%22/></svg>"\n                }"\n                     onerror="this.src=\'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23ccc%22><path d=%22M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z%22/></svg>\'">\n                <div class="mpp-search-result-info">\n                    <span class="mpp-search-result-title">${track.title}</span>\n                    <span class="mpp-search-result-artist">${\n                      track.artist\n                    }</span>\n                    <span class="mpp-search-result-source">${\n                      track.source\n                    }</span>\n                </div>\n                <div class="mpp-search-result-actions">\n                    <button class="mpp-result-action-btn play-now" data-action="play" data-id="${\n                      track.id\n                    }" data-source="${track.source}" data-title="${\n                      track.title\n                    }" data-artist="${track.artist}" data-cover="${track.coverUrl || ""}">\n                        立即播放\n                    </button>\n                    <button class="mpp-result-action-btn add-to-list" data-action="add" data-id="${\n                      track.id\n                    }" data-source="${track.source}" data-title="${\n                      track.title\n                    }" data-artist="${track.artist}" data-cover="${track.coverUrl || ""}">\n                        添加到末尾\n                    </button>\n                </div>\n            </li>\n        `,\n      )\n      .join("");\n  }\n\n  async function handleSearchResultAction(btn, action) {\n    const id = btn.dataset.id;\n    const source = btn.dataset.source;\n    const title = btn.dataset.title;\n    const artist = btn.dataset.artist;\n    const coverUrl = btn.dataset.cover;\n\n    btn.disabled = true;\n    const originalText = btn.textContent;\n    btn.textContent = "加载中...";\n\n    try {\n      const trackData = await searchSongInPlayer(`${title} ${artist}`, []);\n\n      if (!trackData || !trackData.audioUrl) {\n        throw new Error("No audio URL found after search");\n      }\n      const newTrack = {\n        id: trackData.id,\n        title: trackData.name,\n        artist: trackData.artist,\n        audioUrl: trackData.audioUrl,\n        lyricsContent: trackData.lyricsContent,\n        tlyricContent: trackData.tlyricContent,\n        coverUrl: trackData.coverUrl,\n        source: trackData.source,\n        _fromCache: trackData._fromCache || false,\n        _triedSources: [],\n      };\n\n      if (action === "play") {\n        const insertIndex = state.currentTrackIndex + 1;\n        state.playlist.splice(insertIndex, 0, newTrack);\n        renderPlaylist();\n        await loadTrack(insertIndex, true);\n        toggleSearch(false);\n      } else if (action === "add") {\n        state.playlist.push(newTrack);\n        renderPlaylist();\n        btn.textContent = "已添加 ✓";\n        btn.classList.add("added");\n        setTimeout(() => {\n          btn.textContent = originalText;\n          btn.classList.remove("added");\n          btn.disabled = false;\n        }, 1500);\n        return;\n      }\n    } catch (err) {\n      error("[Search] Action failed:", err);\n      btn.textContent = "失败";\n      setTimeout(() => {\n        btn.textContent = originalText;\n        btn.disabled = false;\n      }, 1500);\n      return;\n    }\n    btn.disabled = false;\n    btn.textContent = originalText;\n  }\n\n  function toggleExpand(expand) {\n    state.isExpanded = expand;\n    const sizeSmall = { width: "90px", height: "70px" };\n    const sizeLarge = { width: "280px", height: "440px" };\n\n    if (state.isExpanded) {\n      ThemeUtils.sendMessage("resize-iframe", sizeLarge);\n      ThemeUtils.sendMessage("player-expanding");\n      setTimeout(() => {\n        dom.container.dataset.state = "expanded";\n        setTimeout(checkTitleScroll, 300);\n      }, 50);\n    } else {\n      ThemeUtils.sendMessage("player-collapsing");\n      togglePlaylist(false);\n      toggleSearch(false);\n      dom.container.dataset.state = "collapsed";\n      dom.songTitle.classList.remove("scrolling");\n      setTimeout(() => ThemeUtils.sendMessage("resize-iframe", sizeSmall), 400);\n    }\n  }\n\n  function togglePlaylist(visible) {\n    state.isPlaylistVisible = visible;\n    state.isSearchVisible = false;\n    dom.container.dataset.playlistVisible = state.isPlaylistVisible;\n    dom.container.dataset.searchVisible = "false";\n  }\n\n  function toggleSearch(visible) {\n    state.isSearchVisible = visible;\n    state.isPlaylistVisible = false;\n    dom.container.dataset.searchVisible = state.isSearchVisible;\n    dom.container.dataset.playlistVisible = "false";\n\n    if (visible) {\n      setTimeout(() => dom.searchInput.focus(), 100);\n    }\n  }\n\n  function setupEventListeners() {\n    let loadingTimeoutId = null;\n    let lastProgressTime = 0;\n    let progressCheckInterval = null;\n    const LOADING_TIMEOUT = 15000;\n\n    const startLoadingTimeout = () => {\n      clearTimeout(loadingTimeoutId);\n      loadingTimeoutId = setTimeout(() => {\n        if (dom.container.classList.contains("loading")) {\n          handleLoadingTimeout();\n        }\n      }, LOADING_TIMEOUT);\n    };\n\n    const clearLoadingTimeout = () => {\n      clearTimeout(loadingTimeoutId);\n      loadingTimeoutId = null;\n    };\n\n    const handleLoadingTimeout = () => {\n      const track = state.playlist[state.currentTrackIndex];\n      if (!track) {\n        exitLoadingState();\n        return;\n      }\n      const currentTime = dom.audioPlayer.currentTime;\n      if (currentTime > 0 && dom.audioPlayer.src) {\n        dom.audioPlayer.currentTime = currentTime + 0.1;\n        dom.audioPlayer.play().catch(() => {\n          const src = dom.audioPlayer.src;\n          dom.audioPlayer.src = "";\n          setTimeout(() => {\n            dom.audioPlayer.src = src;\n            dom.audioPlayer.currentTime = currentTime;\n            dom.audioPlayer.play().catch(() => {\n              tryFallbackSource(\n                track.originalTitle || track.title,\n                track.originalArtist || track.artist,\n                track._triedSources || [],\n                true,\n              );\n            });\n          }, 500);\n        });\n      } else {\n        tryFallbackSource(\n          track.originalTitle || track.title,\n          track.originalArtist || track.artist,\n          track._triedSources || [],\n          true,\n        );\n      }\n    };\n\n    const startProgressCheck = () => {\n      stopProgressCheck();\n      lastProgressTime = dom.audioPlayer.currentTime;\n      progressCheckInterval = setInterval(() => {\n        if (state.isPlaying && !dom.audioPlayer.paused) {\n          const currentTime = dom.audioPlayer.currentTime;\n          if (Math.abs(currentTime - lastProgressTime) < 0.1) {\n            handleLoadingTimeout();\n          }\n          lastProgressTime = currentTime;\n        }\n      }, 5000);\n    };\n\n    const stopProgressCheck = () => {\n      if (progressCheckInterval) {\n        clearInterval(progressCheckInterval);\n        progressCheckInterval = null;\n      }\n    };\n\n    dom.toggleExpandBtn.addEventListener("click", () => toggleExpand(true));\n    dom.collapseBtn.addEventListener("click", () => toggleExpand(false));\n\n    dom.playPauseBtn.addEventListener("click", () => {\n      if (state.isPlaying) {\n        pauseTrack();\n      } else {\n        if (state.playlist.length > 0) {\n          if (dom.audioPlayer.src && dom.audioPlayer.readyState > 0) {\n            playTrack();\n          } else {\n            loadTrack(state.currentTrackIndex, true);\n          }\n        } else {\n          ThemeUtils.sendMessage("request-chat-scan");\n        }\n      }\n    });\n\n    dom.nextBtn.addEventListener("click", nextTrack);\n    dom.prevBtn.addEventListener("click", prevTrack);\n    dom.audioPlayer.addEventListener("timeupdate", updateProgress);\n\n    dom.audioPlayer.addEventListener("canplay", () => {\n      dom.durationTimeEl.dataset.loaded = "false";\n      updateProgress();\n      exitLoadingState();\n      clearLoadingTimeout();\n    });\n\n    dom.audioPlayer.addEventListener("loadedmetadata", () => {\n      const wasChanging = state.isChangingTrack;\n      state.isChangingTrack = false;\n\n      const duration = dom.audioPlayer.duration;\n      const track = state.playlist[state.currentTrackIndex];\n\n      if (duration > 0 && duration <= 35) {\n        dom.audioPlayer.pause();\n        dom.audioPlayer.src = "";\n\n        if (track) {\n          if (!track._triedSources) track._triedSources = [];\n          if (track.source && !track._triedSources.includes(track.source)) {\n            track._triedSources.push(track.source);\n          }\n        }\n\n        tryFallbackSource(\n          track?.originalTitle || track?.title,\n          track?.originalArtist || track?.artist,\n          track?._triedSources || [],\n          state.shouldAutoPlay,\n        );\n        return;\n      }\n\n      if (track && !track._fromCache) {\n        sendCacheWriteback(track);\n      }\n\n      if (state.shouldAutoPlay) {\n        playTrack();\n      }\n    });\n\n    dom.audioPlayer.addEventListener("ended", nextTrack);\n\n    dom.audioPlayer.addEventListener("waiting", () => {\n      enterLoadingState();\n      startLoadingTimeout();\n    });\n\n    dom.audioPlayer.addEventListener("playing", () => {\n      exitLoadingState();\n      clearLoadingTimeout();\n      startProgressCheck();\n    });\n\n    dom.audioPlayer.addEventListener("pause", stopProgressCheck);\n\n    dom.audioPlayer.addEventListener("stalled", () => {\n      setTimeout(() => {\n        if (dom.audioPlayer.readyState < 3 && !dom.audioPlayer.paused) {\n          const currentTime = dom.audioPlayer.currentTime;\n          dom.audioPlayer.load();\n          dom.audioPlayer.currentTime = currentTime;\n          dom.audioPlayer.play().catch(() => {});\n        }\n      }, 3000);\n    });\n\n    dom.audioPlayer.addEventListener("suspend", () => {\n      if (state.isPlaying && dom.audioPlayer.paused) {\n        dom.audioPlayer.play().catch(() => {});\n      }\n    });\n\n    window.addEventListener("online", () => {\n      if (dom.container.classList.contains("loading") && state.isPlaying) {\n        const currentTime = dom.audioPlayer.currentTime;\n        dom.audioPlayer.load();\n        dom.audioPlayer.currentTime = currentTime;\n        dom.audioPlayer.play().catch(() => {});\n      }\n    });\n\n    dom.clearPlaylistBtn.addEventListener("click", () => {\n      if (state.playlist.length === 0) return;\n      dom.confirmDialog.classList.remove("mpp-hidden");\n    });\n\n    dom.confirmCancel.addEventListener("click", () => {\n      dom.confirmDialog.classList.add("mpp-hidden");\n    });\n\n    dom.confirmOk.addEventListener("click", () => {\n      dom.confirmDialog.classList.add("mpp-hidden");\n      clearPlaylist();\n    });\n\n    dom.audioPlayer.addEventListener("error", async (e) => {\n      exitLoadingState();\n      clearLoadingTimeout();\n      stopProgressCheck();\n\n      state.consecutiveErrors++;\n      const currentTrack = state.playlist[state.currentTrackIndex];\n      const playlistSize = state.playlist.length;\n\n      if (playlistSize > 0 && state.consecutiveErrors >= playlistSize) {\n        dom.songTitle.textContent = "播放列表错误";\n        dom.songArtist.textContent = "所有歌曲加载失败";\n        if (state.isPlaying) pauseTrack();\n        state.consecutiveErrors = 0;\n        return;\n      }\n\n      const wantAutoPlay = state.isPlaying || state.shouldAutoPlay;\n\n      if (currentTrack) {\n        if (window.MusicCache && currentTrack.id && currentTrack.source) {\n          window.MusicCache.invalidateAudio(\n            currentTrack.id,\n            currentTrack.source,\n          );\n        }\n\n        const title = currentTrack.originalTitle || currentTrack.title;\n        const artist = currentTrack.originalArtist || currentTrack.artist;\n        if (title && artist) {\n          log("Direct link failed, searching for:", title, artist);\n          if (!currentTrack._triedSources) currentTrack._triedSources = [];\n          if (\n            currentTrack.source &&\n            !currentTrack._triedSources.includes(currentTrack.source)\n          ) {\n            currentTrack._triedSources.push(currentTrack.source);\n          }\n          if (currentTrack._isDirectLink) {\n            currentTrack._isDirectLink = false;\n            currentTrack.audioUrl = "";\n          }\n\n          await tryFallbackSource(\n            title,\n            artist,\n            currentTrack._triedSources || [],\n            wantAutoPlay,\n          );\n          return;\n        }\n      }\n\n      setTimeout(() => {\n        if (state.playlist.length > 1) {\n          const newIndex =\n            (state.currentTrackIndex + 1) % state.playlist.length;\n          loadTrack(newIndex, wantAutoPlay);\n        }\n      }, 1000);\n    });\n\n    dom.progressBar.addEventListener("click", (e) => {\n      if (dom.audioPlayer.duration) {\n        dom.audioPlayer.currentTime =\n          (e.offsetX / dom.progressBar.clientWidth) * dom.audioPlayer.duration;\n      }\n    });\n\n    dom.playlistToggleBtn.addEventListener("click", () => togglePlaylist(true));\n    dom.playlistCloseBtn.addEventListener("click", () => togglePlaylist(false));\n\n    dom.playlistList.addEventListener("click", (e) => {\n      const li = e.target.closest("li");\n      if (!li) return;\n\n      if (e.target.closest(".mpp-remove-track")) {\n        const index = parseInt(\n          e.target.closest(".mpp-remove-track").dataset.index,\n          10,\n        );\n        removeTrack(index);\n        return;\n      }\n\n      const index = parseInt(li.dataset.index, 10);\n      if (!isNaN(index)) {\n        loadTrack(index, true);\n      }\n    });\n\n    dom.searchToggleBtn.addEventListener("click", () => toggleSearch(true));\n    dom.searchCloseBtn.addEventListener("click", () => toggleSearch(false));\n\n    dom.searchBtn.addEventListener("click", () =>\n      searchSongs(dom.searchInput.value),\n    );\n\n    dom.searchInput.addEventListener("keypress", (e) => {\n      if (e.key === "Enter") {\n        searchSongs(dom.searchInput.value);\n      }\n    });\n\n    dom.searchResults.addEventListener("click", (e) => {\n      const btn = e.target.closest(".mpp-result-action-btn");\n      if (btn && !btn.disabled) {\n        handleSearchResultAction(btn, btn.dataset.action);\n      }\n    });\n  }\n\n  function removeTrack(index) {\n    if (index < 0 || index >= state.playlist.length) return;\n\n    const wasPlaying = state.isPlaying;\n    const isCurrentTrack = index === state.currentTrackIndex;\n\n    state.playlist.splice(index, 1);\n\n    if (state.playlist.length === 0) {\n      pauseTrack();\n      dom.songTitle.textContent = "暂无歌曲";\n      dom.songArtist.textContent = "...";\n      dom.audioPlayer.src = "";\n    } else if (isCurrentTrack) {\n      const newIndex = Math.min(index, state.playlist.length - 1);\n      loadTrack(newIndex, wasPlaying);\n    } else if (index < state.currentTrackIndex) {\n      state.currentTrackIndex--;\n    }\n\n    renderPlaylist();\n  }\n\n  function clearPlaylist() {\n    if (state.playlist.length === 0) return;\n\n    pauseTrack();\n    state.playlist = [];\n    state.currentTrackIndex = 0;\n    state.parsedLRC = [];\n    state.currentLyricIndex = -1;\n\n    dom.songTitle.textContent = "暂无歌曲";\n    dom.songArtist.textContent = "...";\n    dom.audioPlayer.src = "";\n    dom.progressFill.style.width = "0%";\n    dom.progressThumb.style.left = "0";\n    dom.currentTimeEl.textContent = "0:00";\n    dom.durationTimeEl.textContent = "0:00";\n    dom.lyricsList.innerHTML = "";\n\n    renderPlaylist();\n  }\n\n  async function handlePlayByInfo(title, artist) {\n    enterLoadingState();\n    const existingIndex = state.playlist.findIndex((track) =>\n      fuzzyMatchTrack(title, artist, track),\n    );\n\n    if (existingIndex !== -1) {\n      await loadTrack(existingIndex, true);\n      return;\n    }\n\n    if (window.MusicCache) {\n      const cached = window.MusicCache.getSearch(title, artist);\n      if (cached) {\n        const audioUrl = window.MusicCache.getAudio(cached.id, cached.source);\n        const lyricsData = window.MusicCache.getLyrics(\n          cached.id,\n          cached.source,\n        );\n        const coverUrl = window.MusicCache.getCover(cached.id, cached.source);\n\n        if (audioUrl) {\n          const trackFromCache = {\n            id: cached.id,\n            source: cached.source,\n            title: cached.title,\n            name: cached.title,\n            artist: cached.artist,\n            coverUrl: coverUrl || cached.coverUrl || "",\n            audioUrl: audioUrl,\n            lyricsContent: lyricsData?.content || "",\n            tlyricContent: lyricsData?.tlyric || "",\n            originalTitle: title,\n            originalArtist: artist,\n            _fromCache: true,\n            _triedSources: [],\n          };\n\n          const normalizedTrack = normalizePlaylist([trackFromCache])[0];\n\n          if (state.playlist.length === 0) {\n            state.playlist.push(normalizedTrack);\n            await loadTrack(0, true);\n          } else {\n            const insertIndex = state.currentTrackIndex + 1;\n            state.playlist.splice(insertIndex, 0, normalizedTrack);\n            await loadTrack(insertIndex, true);\n          }\n          renderPlaylist();\n          return;\n        }\n      }\n    }\n\n    const searchResult = await searchSongInPlayer(`${title} ${artist}`, []);\n\n    if (searchResult) {\n      searchResult.originalTitle = title;\n      searchResult.originalArtist = artist;\n\n      const normalizedTrack = normalizePlaylist([searchResult])[0];\n\n      if (state.playlist.length === 0) {\n        state.playlist.push(normalizedTrack);\n        await loadTrack(0, true);\n      } else {\n        const insertIndex = state.currentTrackIndex + 1;\n        state.playlist.splice(insertIndex, 0, normalizedTrack);\n        await loadTrack(insertIndex, true);\n      }\n      renderPlaylist();\n    } else {\n      exitLoadingState();\n    }\n  }\n\n  async function searchSongInPlayer(query, excludeSources = []) {\n    const allSources = ["tencent", "netease", "kuwo"];\n    const sources = allSources.filter((s) => {\n      const label = { tencent: "Tencent", netease: "Netease", kuwo: "Kuwo" }[s];\n      return !excludeSources.includes(label);\n    });\n\n    const parts = query.split(/\\s+/);\n    let queryTitle = "";\n    let queryArtist = "";\n\n    if (parts.length >= 2) {\n      queryArtist = parts[parts.length - 1];\n      queryTitle = parts.slice(0, -1).join(" ");\n    } else {\n      queryTitle = query;\n    }\n\n    if (window.MusicCache && queryTitle && excludeSources.length === 0) {\n      const cached = window.MusicCache.getSearch(queryTitle, queryArtist);\n      if (cached) {\n        const cachedSourceLabel = cached.source;\n        if (!excludeSources.includes(cachedSourceLabel)) {\n          const audioUrl = window.MusicCache.getAudio(cached.id, cached.source);\n          const lyricsData = window.MusicCache.getLyrics(\n            cached.id,\n            cached.source,\n          );\n          const coverUrl = window.MusicCache.getCover(cached.id, cached.source);\n\n          if (audioUrl) {\n            return {\n              id: cached.id,\n              name: cached.title,\n              artist: cached.artist,\n              coverUrl: coverUrl || cached.coverUrl || "",\n              source: cached.source,\n              audioUrl: audioUrl,\n              lyricsContent: lyricsData?.content || "",\n              tlyricContent: lyricsData?.tlyric || "",\n              _fromCache: true,\n            };\n          }\n        }\n      }\n    }\n\n    for (const source of sources) {\n      try {\n        const searchResponse = await fetch(\n          `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,\n        );\n        if (!searchResponse.ok) continue;\n\n        const searchResult = await searchResponse.json();\n        if (!searchResult.data || searchResult.data.length === 0) continue;\n\nconst normalizedQueryTitle = queryTitle.toLowerCase().trim();\nconst normalizedQueryArtist = queryArtist.toLowerCase().trim();\n\nconst track = searchResult.data.find((item) => {\n  const itemName = (item.song || item.name || "").toLowerCase();\n  const itemArtist = (item.singer || item.artist || "").toLowerCase();\n\n  const titleMatch =\n    itemName.includes(normalizedQueryTitle) ||\n    normalizedQueryTitle.includes(itemName);\n\n  const artistMatch =\n    !normalizedQueryArtist ||\n    itemArtist.includes(normalizedQueryArtist) ||\n    normalizedQueryArtist.includes(itemArtist);\n\n  return titleMatch && artistMatch;\n});\n\nif (!track) {\n  log(`[Player] ${source} 未找到匹配 "${query}"`);\n  continue;\n}\n\n        const trackId = track.id || track.rid;\n        const songResponse = await fetch(\n          `/api/plugins/g-player-proxy/song?id=${trackId}&source=${source}`,\n        );\n        if (!songResponse.ok) continue;\n\n        const songData = await songResponse.json();\n        if (songData._needFallback) continue;\n\n        let audioUrl = "";\n        let lyricsContent = "";\n        let tlyricContent = "";\n\n        if (songData.data) {\n          const songItem = Array.isArray(songData.data)\n            ? songData.data[0]\n            : songData.data;\n          if (songItem) {\n            audioUrl = songItem.url || "";\n          }\n        }\n\n        if (!audioUrl) continue;\n\n        const duration = await getAudioDurationQuick(audioUrl);\n        if (duration !== null && duration <= 35) continue;\n\n        try {\n          const lyricResponse = await fetch(\n            `/api/plugins/g-player-proxy/lyric?id=${trackId}&source=${source}`,\n          );\n          if (lyricResponse.ok) {\n            const lyricData = await lyricResponse.json();\n            if (lyricData.data) {\n              const lyricItem = Array.isArray(lyricData.data)\n                ? lyricData.data[0]\n                : lyricData.data;\n              if (lyricItem) {\n                lyricsContent = lyricItem.lrc || lyricItem.lyric || "";\n                tlyricContent = lyricItem.tlyric || lyricItem.trans || "";\n              }\n            }\n          }\n        } catch (e) {}\n\n        const sourceLabel =\n          { netease: "Netease", tencent: "Tencent", kuwo: "Kuwo" }[source] ||\n          source;\n        const coverUrl = track.cover || track.pic || "";\n\n        if (window.MusicCache) {\n          if (queryTitle) {\n            window.MusicCache.setSearch(queryTitle, queryArtist, {\n              id: trackId,\n              source: sourceLabel,\n              title: track.song || track.name,\n              artist: track.singer || track.artist,\n              coverUrl: coverUrl,\n            });\n          }\n\n          window.MusicCache.setAudio(trackId, sourceLabel, audioUrl);\n\n          if (lyricsContent) {\n            window.MusicCache.setLyrics(\n              trackId,\n              sourceLabel,\n              lyricsContent,\n              tlyricContent,\n            );\n          }\n\n          if (coverUrl) {\n            window.MusicCache.setCover(trackId, sourceLabel, coverUrl);\n          }\n        }\n\n        return {\n          id: trackId,\n          name: track.song || track.name,\n          artist: track.singer || track.artist,\n          coverUrl: coverUrl,\n          source: sourceLabel,\n          audioUrl: audioUrl,\n          lyricsContent: lyricsContent,\n          tlyricContent: tlyricContent,\n          _fromCache: false,\n        };\n      } catch (err) {\n        continue;\n      }\n    }\n\n    return null;\n  }\n\n  window.addEventListener("message", async (event) => {\n    if (event.data?.source !== "typing-indicator-host") return;\n    const { type, data } = event.data;\n\n    switch (type) {\n      case "set-initial-playlist":\n      case "context-update":\n        if (data.charAvatarUrl) {\n          dom.avatarSmall.src = data.charAvatarUrl;\n          dom.avatarLarge.src = data.charAvatarUrl;\n        }\n        if (data.playlist) {\n          const markedPlaylist = data.playlist.map((song) => ({\n            ...song,\n            _fromCache: true,\n            _triedSources: [],\n          }));\n          const newPlaylist = normalizePlaylist(markedPlaylist);\n          if (JSON.stringify(state.playlist) !== JSON.stringify(newPlaylist)) {\n            state.playlist = newPlaylist;\n            renderPlaylist();\n            if (state.playlist.length > 0) {\n              const wasPlaying = state.isPlaying;\n              await loadTrack(0, false);\n              if (wasPlaying) playTrack();\n            }\n          }\n        }\n        break;\n\n      case "append-songs-to-playlist":\n        if (Array.isArray(data) && data.length > 0) {\n          const markedData = data.map((song) => ({\n            ...song,\n            _fromCache: true,\n            _triedSources: [],\n          }));\n          const normalizedSongs = normalizePlaylist(markedData);\n          state.playlist.push(...normalizedSongs);\n          renderPlaylist();\n          if (\n            !state.isPlaying &&\n            state.playlist.length === normalizedSongs.length\n          ) {\n            loadTrack(0, false);\n          }\n        }\n        break;\n\n      case "update-songs-from-message":\n        if (data?.messageId !== undefined) {\n          state.playlist = state.playlist.filter(\n            (t) => t.sourceMessageId !== data.messageId,\n          );\n          if (data.songs?.length > 0) {\n            const markedSongs = data.songs.map((song) => ({\n              ...song,\n              _triedSources: [],\n            }));\n            state.playlist.push(...normalizePlaylist(markedSongs));\n          }\n          renderPlaylist();\n        }\n        break;\n\n      case "play-by-info":\n        if (data && data.title && data.artist) {\n          await handlePlayByInfo(data.title, data.artist);\n        }\n        break;\n\n      case "play-now":\n        if (data) {\n          const existingIndex = state.playlist.findIndex((track) =>\n            fuzzyMatchTrack(data.name || data.title, data.artist, track),\n          );\n\n          if (existingIndex !== -1) {\n            const existingTrack = state.playlist[existingIndex];\n            if (data.audioUrl) existingTrack.audioUrl = data.audioUrl;\n            if (data.lyricsContent)\n              existingTrack.lyricsContent = data.lyricsContent;\n            if (data.tlyricContent)\n              existingTrack.tlyricContent = data.tlyricContent;\n            if (data.coverUrl) existingTrack.coverUrl = data.coverUrl;\n            existingTrack._fromCache = true;\n            existingTrack._triedSources = [];\n            if (window.MusicCache && existingTrack.id && existingTrack.source) {\n              if (data.audioUrl) {\n                window.MusicCache.setAudio(\n                  existingTrack.id,\n                  existingTrack.source,\n                  data.audioUrl,\n                );\n              }\n              if (data.lyricsContent) {\n                window.MusicCache.setLyrics(\n                  existingTrack.id,\n                  existingTrack.source,\n                  data.lyricsContent,\n                  data.tlyricContent || "",\n                );\n              }\n              if (data.coverUrl) {\n                window.MusicCache.setCover(\n                  existingTrack.id,\n                  existingTrack.source,\n                  data.coverUrl,\n                );\n              }\n            }\n\n            state.playlist[existingIndex] = existingTrack;\n            await loadTrack(existingIndex, true);\n          } else {\n            const normalizedTrack = normalizePlaylist([\n              { ...data, _fromCache: true, _triedSources: [] },\n            ])[0];\n            if (window.MusicCache && data.id && data.source) {\n              if (data.audioUrl) {\n                window.MusicCache.setAudio(data.id, data.source, data.audioUrl);\n              }\n              if (data.lyricsContent) {\n                window.MusicCache.setLyrics(\n                  data.id,\n                  data.source,\n                  data.lyricsContent,\n                  data.tlyricContent || "",\n                );\n              }\n              if (data.coverUrl) {\n                window.MusicCache.setCover(data.id, data.source, data.coverUrl);\n              }\n              if (data.originalTitle && data.originalArtist) {\n                window.MusicCache.setSearch(\n                  data.originalTitle,\n                  data.originalArtist,\n                  {\n                    id: data.id,\n                    source: data.source,\n                    title: data.title || data.name,\n                    artist: data.artist,\n                    coverUrl: data.coverUrl || "",\n                  },\n                );\n              }\n            }\n\n            if (state.playlist.length === 0) {\n              state.playlist.push(normalizedTrack);\n              await loadTrack(0, true);\n            } else {\n              const insertIndex = state.currentTrackIndex + 1;\n              state.playlist.splice(insertIndex, 0, normalizedTrack);\n              await loadTrack(insertIndex, true);\n            }\n          }\n          renderPlaylist();\n        }\n        break;\n\n      case "toggle-playback":\n        if (state.isPlaying) {\n          pauseTrack();\n        } else {\n          playTrack();\n        }\n        break;\n\n      case "graceful-shutdown-request":\n        if (dom.audioPlayer) dom.audioPlayer.pause();\n        if (animationFrameId) cancelAnimationFrame(animationFrameId);\n        ThemeUtils.sendMessage("graceful-shutdown-response");\n        break;\n    }\n  });\n\n  initialize();\n});',
    sizes: {
      draggable: {
        width: "90px",
        height: "70px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "player_transparent_and_minimalist",
    name: "播放器-透明简约",
    useIframe: true,
    html: '<div id="player-container" class="mini">\n    <div id="mini-toggle" class="mini-toggle">\n        <img id="mini-cover" src="https://i.imgur.com/lcFJxpM.gif" alt="cover">\n    </div>\n\n    <div class="player-content">\n        <div class="cover-art-container">\n            <img id="cover-art" src="https://i.imgur.com/lcFJxpM.gif" alt="Album Cover">\n            <button id="search-button" class="menu-button" title="搜索歌曲">\n                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>\n            </button>\n        </div>\n        <div class="details">\n            <div class="track-info">\n                <div id="track-title" class="marquee"><span>未加载</span></div>\n                <div id="track-artist">...</div>\n            </div>\n            <div id="lyrics-container" class="lyrics-container">\n                <div class="lyrics-line" id="lyrics-line-1">♪</div>\n                <div class="lyrics-line sub" id="lyrics-line-2"></div>\n            </div>\n            <div class="controls">\n                <button id="prev-button" class="control-button" title="上一首">\n                    <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg>\n                </button>\n                <button id="play-pause-button" class="control-button play" title="播放/暂停">\n                    <svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>\n                    <svg class="pause-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>\n                </button>\n                <button id="next-button" class="control-button" title="下一首">\n                    <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>\n                </button>\n                <button id="menu-button" class="control-button small" title="播放列表">\n                    <svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></svg>\n                </button>\n            </div>\n        </div>\n    </div>\n    <div id="playlist-menu" class="playlist-menu hidden">\n        <div class="playlist-header">\n            <h3>播放列表</h3>\n            <div class="playlist-actions">\n                <button id="scan-chat-button" class="action-button" title="扫描聊天记录">\n                    <svg viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>\n                </button>\n                <button id="clear-playlist-button" class="action-button" title="清空播放列表">\n                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>\n                </button>\n                <button id="close-playlist-button" class="close-button" title="关闭">\n                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>\n                </button>\n            </div>\n        </div>\n        <ul id="playlist-list"></ul>\n    </div>\n    <div id="search-menu" class="search-menu hidden">\n        <div class="search-header">\n            <h3>搜索歌曲</h3>\n            <button id="close-search-button" class="close-button" title="关闭">\n                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>\n            </button>\n        </div>\n        <div class="search-input-container">\n            <input type="text" id="search-input" placeholder="输入歌曲名或歌手..." />\n            <button id="do-search-button" class="search-btn" title="搜索">\n                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>\n            </button>\n        </div>\n        <div id="search-status" class="search-status"></div>\n        <ul id="search-results"></ul>\n    </div>\n    <div id="song-action-menu" class="song-action-menu hidden">\n        <button id="action-play-next" class="song-action-item">\n            <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>\n            <span>下一首播放</span>\n        </button>\n        <button id="action-add-to-end" class="song-action-item">\n            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>\n            <span>添加到末尾</span>\n        </button>\n    </div>\n    <div id="confirm-modal" class="confirm-modal hidden">\n    <div class="confirm-content">\n        <p id="confirm-message">确定要清空播放列表吗？</p>\n        <div class="confirm-buttons">\n            <button id="confirm-yes" class="confirm-btn yes">确定</button>\n            <button id="confirm-no" class="confirm-btn no">取消</button>\n        </div>\n      </div>\n    </div>\n\n    <audio id="audio-player"></audio>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');\n\n:root {\n    --mp-mini-size: 50px;\n    --mp-cover-spin-duration: 4s;\n    --mp-border-radius: 12px;\n    --mp-bg-crystal: rgba(10, 15, 30, 0.25);\n    --mp-border-crystal: rgba(255, 255, 255, 0.2);\n    --mp-shadow-crystal: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05);\n    --mp-bg-playlist: rgba(30, 35, 55, 0.5);\n    --mp-text-primary: #f8f8f2;\n    --mp-text-secondary: #bd93f9;\n    --mp-text-lyrics-sub: #b0c4de;\n    --mp-transition-fast: 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    --mp-transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n    --mp-accent-color: #8fcddaff;\n    --mp-danger-color: #841414ff;\n}\n\n* { box-sizing: border-box; }\n\nbody {\n    font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;\n    background: transparent;\n    margin: 0;\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n#player-container {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.mini-toggle {\n    width: var(--mp-mini-size);\n    height: var(--mp-mini-size);\n    border-radius: 50%;\n    overflow: hidden;\n    position: absolute;\n    box-shadow: 0 4px 20px rgba(0,0,0,0.5);\n    background-color: #282a36;\n    transition: opacity var(--mp-transition-fast), transform var(--mp-transition-fast);\n}\n\n#mini-cover {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    animation: mp-spin var(--mp-cover-spin-duration) linear infinite;\n    animation-play-state: paused;\n}\n\n#player-container.playing #mini-cover { animation-play-state: running; }\n\n@keyframes mp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n\n#player-container.expanded .mini-toggle {\n    opacity: 0;\n    pointer-events: none;\n    transform: scale(0.5);\n}\n\n.player-content {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    height: 100%;\n    padding: 8px;\n    border-radius: var(--mp-border-radius);\n    background: var(--mp-bg-crystal);\n    border: 1px solid var(--mp-border-crystal);\n    box-shadow: var(--mp-shadow-crystal);\n    opacity: 0;\n    visibility: hidden;\n    transform: scale(0.9);\n    transition: all var(--mp-transition-slow);\n}\n\n#player-container.expanded .player-content {\n    visibility: visible;\n    opacity: 1;\n    transform: scale(1);\n}\n\n.cover-art-container {\n    width: 110px;\n    height: 110px;\n    flex-shrink: 0;\n    margin-right: 10px;\n    position: relative;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n}\n\n#cover-art {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n\n.menu-button {\n    position: absolute;\n    bottom: 4px;\n    right: 4px;\n    width: 24px;\n    height: 24px;\n    background-color: rgba(0,0,0,0.4);\n    border: none;\n    border-radius: 50%;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 0;\n    transition: background-color 0.2s, transform 0.2s;\n}\n\n.menu-button:hover {\n    background-color: rgba(0,0,0,0.7);\n    transform: scale(1.1);\n}\n\n.menu-button svg {\n    width: 16px;\n    height: 16px;\n    fill: #fff;\n}\n\n.details {\n    flex-grow: 1;\n    color: var(--mp-text-primary);\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    justify-content: space-between;\n    padding: 2px 0;\n}\n\n.track-info {\n    flex-shrink: 0;\n    padding-bottom: 2px;\n    margin-top: -6px;\n}\n\n#track-title {\n    font-size: 14px;\n    font-weight: 700;\n    white-space: nowrap;\n    overflow: hidden;\n    width: 100%;\n    position: relative;\n}\n\n#track-title span {\n    display: inline-block;\n    position: relative;\n}\n\n#track-title.scrolling span {\n    animation: mp-marquee var(--scroll-duration, 10s) linear infinite;\n}\n\n#track-title.scrolling span::after {\n    content: attr(data-text);\n    position: absolute;\n    left: 100%;\n    padding-left: 50px;\n    white-space: nowrap;\n}\n\n@keyframes mp-marquee {\n    0% { transform: translateX(0); }\n    100% { transform: translateX(calc(-100% - 50px)); }\n}\n\n#track-artist {\n    font-size: 12px;\n    font-weight: 400;\n    color: var(--mp-text-secondary);\n    opacity: 0.9;\n    margin-top: -2px;\n    line-height: 1.2;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n.lyrics-container {\n    flex-grow: 1;\n    min-height: 28px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n\n.lyrics-line {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--mp-text-primary);\n    white-space: normal;\n    word-break: break-word;\n    overflow: visible;\n    width: 100%;\n    line-height: 1.2em;\n}\n\n.lyrics-line.sub {\n    font-size: 12px;\n    font-weight: 400;\n    color: var(--mp-text-lyrics-sub);\n}\n\n.controls {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    padding-top: 0;\n    margin-bottom: -2px;\n}\n\n.control-button {\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    padding: 0;\n    display: flex;\n}\n\n.control-button svg {\n    width: 20px;\n    height: 20px;\n    fill: #fff;\n    opacity: 0.8;\n    transition: opacity 0.2s, transform 0.2s;\n}\n\n.control-button:hover svg {\n    opacity: 1;\n    transform: scale(1.1);\n}\n\n.control-button.small svg {\n    width: 18px;\n    height: 18px;\n}\n\n#play-pause-button {\n    background-color: rgba(255,255,255,0.1);\n    border-radius: 50%;\n    width: 30px;\n    height: 30px;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n}\n\n#play-pause-button svg { width: 20px; height: 20px; }\n#play-pause-button.play .play-icon { margin-left: 2px; }\n\n.control-button.play .pause-icon,\n.control-button.pause .play-icon { display: none; }\n\n.playlist-menu,\n.search-menu {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: var(--mp-bg-playlist);\n    backdrop-filter: blur(8px) saturate(150%);\n    -webkit-backdrop-filter: blur(8px) saturate(150%);\n    border: 1px solid var(--mp-border-crystal);\n    border-radius: var(--mp-border-radius);\n    padding: 10px;\n    z-index: 10;\n    display: flex;\n    flex-direction: column;\n    opacity: 1;\n    visibility: visible;\n    transform: scale(1);\n    transition: all var(--mp-transition-fast);\n}\n\n.playlist-menu.hidden,\n.search-menu.hidden {\n    opacity: 0;\n    visibility: hidden;\n    transform: scale(0.95);\n    pointer-events: none;\n}\n\n.playlist-header,\n.search-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 8px;\n    flex-shrink: 0;\n}\n\n.playlist-header h3,\n.search-header h3 {\n    margin: 0;\n    font-size: 14px;\n    color: var(--mp-text-primary);\n}\n\n.playlist-actions {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n}\n\n.action-button {\n    background: rgba(255,255,255,0.1);\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    padding: 4px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: background 0.2s;\n}\n\n.action-button:hover {\n    background: rgba(255,255,255,0.2);\n}\n\n.action-button svg {\n    width: 16px;\n    height: 16px;\n    fill: var(--mp-text-primary);\n    opacity: 0.8;\n}\n\n#clear-playlist-button:hover svg {\n    fill: var(--mp-danger-color);\n}\n\n.close-button {\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    padding: 4px;\n}\n\n.close-button svg {\n    width: 20px;\n    height: 20px;\n    fill: var(--mp-text-primary);\n    opacity: 0.7;\n    transition: opacity 0.2s;\n}\n\n.close-button:hover svg { opacity: 1; }\n\n#playlist-list,\n#search-results {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    overflow-y: auto;\n    flex-grow: 1;\n}\n\n#playlist-list::-webkit-scrollbar,\n#search-results::-webkit-scrollbar { width: 4px; }\n\n#playlist-list::-webkit-scrollbar-thumb,\n#search-results::-webkit-scrollbar-thumb {\n    background-color: rgba(255,255,255,0.2);\n    border-radius: 4px;\n}\n\n#playlist-list li {\n    padding: 8px 10px;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: background-color 0.2s;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 14px;\n    color: var(--mp-text-lyrics-sub);\n}\n\n#playlist-list li:hover { background-color: rgba(255,255,255,0.1); }\n\n#playlist-list li.active {\n    background-color: rgba(189, 147, 249, 0.2);\n    font-weight: 500;\n    color: var(--mp-text-secondary);\n}\n\n.search-input-container {\n    display: flex;\n    gap: 4px;\n    margin-bottom: 4px;\n}\n\n#search-input {\n    flex: 1;\n    padding: 6px 10px;\n    border: 1px solid var(--mp-border-crystal);\n    border-radius: 4px;\n    background: rgba(0,0,0,0.3);\n    color: var(--mp-text-primary);\n    font-size: 13px;\n    outline: none;\n}\n\n#search-input:focus {\n    border-color: var(--mp-text-secondary);\n}\n\n#search-input::placeholder {\n    color: rgba(255,255,255,0.4);\n}\n\n.search-btn {\n    width: 32px;\n    height: 32px;\n    background: var(--mp-text-secondary);\n    border: none;\n    border-radius: 6px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: background 0.2s, transform 0.2s;\n}\n\n.search-btn:hover {\n    background: #a87fdb;\n    transform: scale(1.05);\n}\n\n.search-btn svg {\n    width: 18px;\n    height: 18px;\n    fill: #fff;\n}\n\n.search-status {\n    font-size: 11px;\n    color: var(--mp-text-lyrics-sub);\n    padding: 2px 0;\n    text-align: center;\n    min-height: 16px;\n}\n\n.search-status.error {\n    color: var(--mp-danger-color);\n}\n\n.search-status.success {\n    color: var(--mp-accent-color);\n}\n\n#search-results li {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 6px 8px;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.2s;\n    font-size: 12px;\n    color: var(--mp-text-lyrics-sub);\n}\n\n#search-results li:hover {\n    background-color: rgba(255,255,255,0.1);\n}\n\n.search-result-info {\n    flex: 1;\n    min-width: 0;\n    overflow: hidden;\n}\n\n.search-result-title {\n    font-weight: 500;\n    color: var(--mp-text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 12px;\n}\n\n.search-result-artist {\n    font-size: 10px;\n    color: var(--mp-text-lyrics-sub);\n    opacity: 0.8;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.search-result-more {\n    flex-shrink: 0;\n    width: 24px;\n    height: 24px;\n    background: transparent;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    opacity: 0.6;\n    transition: opacity 0.2s, background 0.2s;\n}\n\n.search-result-more:hover {\n    opacity: 1;\n    background: rgba(255,255,255,0.15);\n}\n\n.search-result-more svg {\n    width: 16px;\n    height: 16px;\n    fill: var(--mp-text-primary);\n}\n\n.song-action-menu {\n    position: absolute;\n    background: rgba(40, 45, 65, 0.95);\n    border: 1px solid var(--mp-border-crystal);\n    border-radius: 8px;\n    padding: 4px;\n    z-index: 20;\n    box-shadow: 0 4px 16px rgba(0,0,0,0.4);\n    min-width: 140px;\n}\n\n.song-action-menu.hidden {\n    display: none;\n}\n\n.song-action-item {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    width: 100%;\n    padding: 8px 10px;\n    background: transparent;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    color: var(--mp-text-primary);\n    font-size: 13px;\n    text-align: left;\n    transition: background 0.2s;\n}\n\n.song-action-item:hover {\n    background: rgba(255,255,255,0.1);\n}\n\n.song-action-item svg {\n    width: 16px;\n    height: 16px;\n    fill: var(--mp-text-secondary);\n}\n\n#player-container.loading .control-button {\n    pointer-events: none;\n    opacity: 0.6;\n}\n\n#player-container.loading #play-pause-button {\n    background-color: rgba(255,255,255,0.05) !important;\n}\n\n#player-container.loading #play-pause-button svg { display: none !important; }\n\n#play-pause-button::after {\n    content: '';\n    display: none;\n    width: 20px;\n    height: 20px;\n    border: 2px solid rgba(255, 255, 255, 0.3);\n    border-top-color: var(--mp-text-secondary);\n    border-radius: 50%;\n    animation: mp-spin 0.8s linear infinite;\n}\n\n#player-container.loading #play-pause-button::after { display: block; }\n\n.scanning {\n    animation: mp-pulse 1.5s ease-in-out infinite;\n}\n\n@keyframes mp-pulse {\n    0%, 100% { opacity: 1; }\n    50% { opacity: 0.5; }\n}\n\n#search-results li {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 8px;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: background-color 0.2s;\n    font-size: 12px;\n    color: var(--mp-text-lyrics-sub);\n}\n\n#search-results li:hover {\n    background-color: rgba(255,255,255,0.1);\n}\n\n.search-result-cover {\n    width: 32px;\n    height: 32px;\n    border-radius: 4px;\n    object-fit: cover;\n    flex-shrink: 0;\n    background-color: rgba(0,0,0,0.3);\n    border: 1px solid rgba(255,255,255,0.1);\n}\n\n.search-result-info {\n    flex: 1;\n    min-width: 0;\n    overflow: hidden;\n}\n\n.search-result-title {\n    font-weight: 500;\n    color: var(--mp-text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 12px;\n}\n\n.search-result-artist {\n    font-size: 10px;\n    color: var(--mp-text-lyrics-sub);\n    opacity: 0.8;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.search-result-more {\n    flex-shrink: 0;\n    width: 24px;\n    height: 24px;\n    background: transparent;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    opacity: 0.6;\n    transition: opacity 0.2s, background 0.2s;\n}\n\n.search-result-more:hover {\n    opacity: 1;\n    background: rgba(255,255,255,0.15);\n}\n\n.search-result-more svg {\n    width: 16px;\n    height: 16px;\n    fill: var(--mp-text-primary);\n}\n\n.confirm-modal {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.6);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 30;\n    opacity: 1;\n    transition: opacity 0.2s;\n}\n\n.confirm-modal.hidden {\n    opacity: 0;\n    pointer-events: none;\n}\n\n.confirm-content {\n    background: rgba(40, 45, 65, 0.95);\n    border: 1px solid var(--mp-border-crystal);\n    border-radius: 8px;\n    padding: 16px;\n    text-align: center;\n    max-width: 200px;\n}\n\n.confirm-content p {\n    margin: 0 0 12px 0;\n    color: var(--mp-text-primary);\n    font-size: 13px;\n}\n\n.confirm-buttons {\n    display: flex;\n    gap: 8px;\n    justify-content: center;\n}\n\n.confirm-btn {\n    padding: 6px 16px;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 12px;\n    transition: background 0.2s;\n}\n\n.confirm-btn.yes {\n    background: var(--mp-danger-color);\n    color: #fff;\n}\n\n.confirm-btn.yes:hover {\n    background: #841414ff;\n}\n\n.confirm-btn.no {\n    background: rgba(255,255,255,0.1);\n    color: var(--mp-text-primary);\n}\n\n.confirm-btn.no:hover {\n    background: rgba(255,255,255,0.2);\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  const DEBUG_MODE = false;\n  const log = (...args) => DEBUG_MODE && console.log("[Player]", ...args);\n  const warn = (...args) => DEBUG_MODE && console.warn("[Player]", ...args);\n  const error = (...args) => console.error("[Player]", ...args);\n\n  const DEFAULT_PLAYLIST = [\n    {\n      title: "Close Your Eyes",\n      artist: "澤野弘之/本田みちよ",\n      audioUrl: "https://files.catbox.moe/fcop94.mp3",\n      coverUrl: "https://i.imgur.com/lcFJxpM.gif",\n      lyricsUrl: "https://files.catbox.moe/ev9d68.lrc",\n      id: null,\n      source: null,\n      _isBuiltIn: true,\n    },\n  ];\n\n  const DEFAULT_COVER = "https://i.imgur.com/lcFJxpM.gif";\n\n  function findMatchingTrack(searchResults, targetTitle, targetArtist) {\n    if (!searchResults || searchResults.length === 0) return null;\n\n    const normalizedTitle = (targetTitle || "").toLowerCase().trim();\n    const normalizedArtist = (targetArtist || "").toLowerCase().trim();\n\n    return searchResults.find((item) => {\n      const itemName = (item.song || item.name || "").toLowerCase();\n      const itemArtist = (item.singer || item.artist || "").toLowerCase();\n\n      const titleMatch =\n        itemName.includes(normalizedTitle) ||\n        normalizedTitle.includes(itemName);\n\n      const artistMatch =\n        itemArtist.includes(normalizedArtist) ||\n        normalizedArtist.includes(itemArtist);\n\n      return titleMatch && artistMatch;\n    });\n  }\n\n  const dom = {\n    container: ThemeUtils.$("#player-container"),\n    audioPlayer: ThemeUtils.$("#audio-player"),\n    coverArt: ThemeUtils.$("#cover-art"),\n    miniCover: ThemeUtils.$("#mini-cover"),\n    trackTitle: ThemeUtils.$("#track-title span"),\n    trackArtist: ThemeUtils.$("#track-artist"),\n    playPauseBtn: ThemeUtils.$("#play-pause-button"),\n    prevBtn: ThemeUtils.$("#prev-button"),\n    nextBtn: ThemeUtils.$("#next-button"),\n    lyricsLine1: ThemeUtils.$("#lyrics-line-1"),\n    lyricsLine2: ThemeUtils.$("#lyrics-line-2"),\n    menuButton: ThemeUtils.$("#menu-button"),\n    searchButton: ThemeUtils.$("#search-button"),\n    playlistMenu: ThemeUtils.$("#playlist-menu"),\n    playlistList: ThemeUtils.$("#playlist-list"),\n    closePlaylistBtn: ThemeUtils.$("#close-playlist-button"),\n    scanChatBtn: ThemeUtils.$("#scan-chat-button"),\n    clearPlaylistBtn: ThemeUtils.$("#clear-playlist-button"),\n    searchMenu: ThemeUtils.$("#search-menu"),\n    closeSearchBtn: ThemeUtils.$("#close-search-button"),\n    searchInput: ThemeUtils.$("#search-input"),\n    doSearchBtn: ThemeUtils.$("#do-search-button"),\n    searchStatus: ThemeUtils.$("#search-status"),\n    searchResults: ThemeUtils.$("#search-results"),\n    songActionMenu: ThemeUtils.$("#song-action-menu"),\n    actionPlayNext: ThemeUtils.$("#action-play-next"),\n    actionAddToEnd: ThemeUtils.$("#action-add-to-end"),\n    confirmModal: ThemeUtils.$("#confirm-modal"),\n    confirmMessage: ThemeUtils.$("#confirm-message"),\n    confirmYes: ThemeUtils.$("#confirm-yes"),\n    confirmNo: ThemeUtils.$("#confirm-no"),\n  };\n\n  let currentPlaylist = [];\n  let currentTrackIndex = 0;\n  let isPlaying = false;\n  let isExpanded = false;\n  let lrcData = [];\n  let pendingActionSong = null;\n  let confirmCallback = null;\n  let shouldAutoPlay = false;\n  let isSwitchingSource = false;\n\n  const enterLoadingState = () => dom.container.classList.add("loading");\n  const exitLoadingState = () => dom.container.classList.remove("loading");\n\n  const updateButtonStates = () => {\n    const singleSong = currentPlaylist.length <= 1;\n    if (dom.prevBtn) dom.prevBtn.disabled = singleSong;\n    if (dom.nextBtn) dom.nextBtn.disabled = singleSong;\n  };\n\n  const checkTitleScroll = () => {\n    const titleEl = document.getElementById("track-title");\n    const spanEl = titleEl?.querySelector("span");\n    if (!titleEl || !spanEl) return;\n    titleEl.classList.remove("scrolling");\n\n    const containerWidth = titleEl.clientWidth;\n    const textWidth = spanEl.scrollWidth;\n    if (containerWidth < 50) return;\n\n    if (textWidth > containerWidth) {\n      const duration = Math.max(5, textWidth / 30);\n      titleEl.style.setProperty("--scroll-duration", `${duration}s`);\n      titleEl.classList.add("scrolling");\n    }\n  };\n\n  function showConfirm(message, onConfirm) {\n    if (dom.confirmMessage) dom.confirmMessage.textContent = message;\n    confirmCallback = onConfirm;\n    dom.confirmModal?.classList.remove("hidden");\n  }\n\n  function hideConfirm() {\n    dom.confirmModal?.classList.add("hidden");\n    confirmCallback = null;\n  }\n\n  function parseLRC(lrcText, tlyricText = "", source = "") {\n    if (!lrcText && !tlyricText) return [];\n    if (source && source.toLowerCase() === "kuwo") {\n      return parseLRCKuwo(lrcText);\n    }\n    if (!lrcText && !tlyricText) return [];\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g;\n\n    function parseLines(text) {\n      if (!text) return [];\n      const lines = [];\n      text.split("\\n").forEach((line) => {\n        let content = line.replace(timeRegex, "").trim();\n        if (!content) return;\n        if (content === "//" || content === "//\\\\n" || /^\\/+$/.test(content))\n          return;\n        if (\n          /^(作词|作曲|编曲|制作|Lyrics|Composed|Written)\\s*[:：]/i.test(\n            content,\n          )\n        )\n          return;\n        if (/^\\s+$/.test(content)) return;\n\n        timeRegex.lastIndex = 0;\n        let match;\n        while ((match = timeRegex.exec(line))) {\n          const time =\n            parseInt(match[1]) * 60 +\n            parseInt(match[2]) +\n            parseInt(match[3].padEnd(3, "0")) / 1000;\n          lines.push({ time, text: content });\n        }\n      });\n      return lines;\n    }\n\n    const isChinese = (text) => /[\\u4e00-\\u9fa5]/.test(text);\n    const isJapanese = (text) => /[\\u3040-\\u309f\\u30a0-\\u30ff]/.test(text);\n    const isKorean = (text) => /[\\uac00-\\ud7af]/.test(text);\n    const isAsian = (text) =>\n      isChinese(text) || isJapanese(text) || isKorean(text);\n\n    let mainLines = parseLines(lrcText);\n    let transLines = parseLines(tlyricText);\n\n    if (mainLines.length === 0 && transLines.length === 0) return [];\n\n    if (tlyricText && transLines.length > 0) {\n      mainLines.sort((a, b) => a.time - b.time);\n      transLines.sort((a, b) => a.time - b.time);\n      const transMap = new Map();\n      transLines.forEach((line) => {\n        const key = line.time.toFixed(2);\n        if (!transMap.has(key)) transMap.set(key, line.text);\n      });\n      return mainLines.map((line) => ({\n        time: line.time,\n        text: line.text,\n        translated: transMap.get(line.time.toFixed(2)) || null,\n      }));\n    }\n\n    let splitIndex = -1;\n    for (let i = 1; i < mainLines.length; i++) {\n      if (mainLines[i].time < mainLines[i - 1].time - 30) {\n        splitIndex = i;\n        break;\n      }\n    }\n\n    if (splitIndex > 0) {\n      const firstPart = mainLines.slice(0, splitIndex);\n      const secondPart = mainLines.slice(splitIndex);\n      const firstHasChinese = firstPart.some((l) => isChinese(l.text));\n      const secondHasChinese = secondPart.some((l) => isChinese(l.text));\n      const firstHasJapanese = firstPart.some((l) => isJapanese(l.text));\n\n      let originalPart, transPart;\n      if (!firstHasChinese && secondHasChinese) {\n        originalPart = firstPart;\n        transPart = secondPart;\n      } else if (firstHasChinese && !secondHasChinese) {\n        originalPart = secondPart;\n        transPart = firstPart;\n      } else if (firstHasJapanese && secondHasChinese) {\n        originalPart = firstPart;\n        transPart = secondPart;\n      } else {\n        originalPart = firstPart;\n        transPart = secondPart;\n      }\n\n      const transMap = new Map();\n      transPart.forEach((t) => transMap.set(t.time.toFixed(2), t.text));\n      originalPart.sort((a, b) => a.time - b.time);\n      return originalPart.map((line) => ({\n        time: line.time,\n        text: line.text,\n        translated: transMap.get(line.time.toFixed(2)) || null,\n      }));\n    }\n\n    mainLines.sort((a, b) => a.time - b.time);\n\n    let hasAlternatingPattern = false;\n    if (mainLines.length >= 4) {\n      let alternateCount = 0;\n      for (let i = 0; i < Math.min(mainLines.length - 1, 20); i++) {\n        const curr = mainLines[i];\n        const next = mainLines[i + 1];\n        if (isAsian(curr.text) !== isAsian(next.text)) alternateCount++;\n      }\n      hasAlternatingPattern =\n        alternateCount >= Math.min(mainLines.length - 1, 20) * 0.7;\n    }\n\n    if (hasAlternatingPattern) {\n      const merged = [];\n      let i = 0;\n      while (i < mainLines.length) {\n        const curr = mainLines[i];\n        const next = mainLines[i + 1];\n        if (next) {\n          const currIsAsian = isAsian(curr.text);\n          const nextIsAsian = isAsian(next.text);\n          if (!currIsAsian && nextIsAsian) {\n            merged.push({\n              time: curr.time,\n              text: curr.text,\n              translated: next.text,\n            });\n            i += 2;\n            continue;\n          } else if (currIsAsian && !nextIsAsian) {\n            merged.push({\n              time: curr.time,\n              text: next.text,\n              translated: curr.text,\n            });\n            i += 2;\n            continue;\n          }\n        }\n        merged.push({ time: curr.time, text: curr.text, translated: null });\n        i++;\n      }\n      return merged;\n    }\n\n    const merged = [];\n    for (let i = 0; i < mainLines.length; i++) {\n      const current = mainLines[i];\n      const next = mainLines[i + 1];\n      if (next && Math.abs(next.time - current.time) < 0.05) {\n        const currentIsAsian = isAsian(current.text);\n        const nextIsAsian = isAsian(next.text);\n        if (currentIsAsian && !nextIsAsian) {\n          merged.push({\n            time: current.time,\n            text: next.text,\n            translated: current.text,\n          });\n        } else if (!currentIsAsian && nextIsAsian) {\n          merged.push({\n            time: current.time,\n            text: current.text,\n            translated: next.text,\n          });\n        } else {\n          merged.push({\n            time: current.time,\n            text: current.text,\n            translated: next.text,\n          });\n        }\n        i++;\n        continue;\n      }\n      merged.push({ time: current.time, text: current.text, translated: null });\n    }\n    return merged;\n  }\n\n  function parseLRCKuwo(lrcText) {\n    if (!lrcText) return [];\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/;\n    const lines = lrcText.split("\\n");\n    const parsed = [];\n    for (const line of lines) {\n      const match = line.match(timeRegex);\n      if (!match) continue;\n\n      const content = line.replace(/\\[[\\d:.]+\\]/g, "").trim();\n      if (\n        !content ||\n        content === "//" ||\n        content === "/ /" ||\n        /^\\/+$/.test(content) ||\n        /^[:\\s]+$/.test(content)\n      )\n        continue;\n      if (\n        /^(作词|作曲|编曲|制作|Lyrics|Composed|Written)\\s*[:：]/i.test(content)\n      )\n        continue;\n\n      const time =\n        parseInt(match[1]) * 60 +\n        parseInt(match[2]) +\n        parseInt(match[3].padEnd(3, "0")) / 1000;\n\n      parsed.push({ time, text: content });\n    }\n\n    const timeGroups = new Map();\n    for (const item of parsed) {\n      const key = item.time.toFixed(3);\n      if (!timeGroups.has(key)) {\n        timeGroups.set(key, []);\n      }\n      timeGroups.get(key).push(item.text);\n    }\n\n    const result = [];\n    const sortedTimes = Array.from(timeGroups.keys()).sort(\n      (a, b) => parseFloat(a) - parseFloat(b),\n    );\n\n    for (const timeKey of sortedTimes) {\n      const time = parseFloat(timeKey);\n      const texts = timeGroups.get(timeKey);\n\n      if (texts.length === 1) {\n        result.push({ time, text: texts[0], translated: null });\n      } else if (texts.length >= 2) {\n        if (result.length > 0 && !result[result.length - 1].translated) {\n          result[result.length - 1].translated = texts[0];\n        }\n        result.push({ time, text: texts[1], translated: null });\n        if (texts.length > 2) {\n          result[result.length - 1].translated = texts.slice(2).join(" ");\n        }\n      }\n    }\n\n    return result;\n  }\n\n  const setParentIframeSize = (mode) => {\n    let size;\n    switch (mode) {\n      case "mini":\n        size = { width: "50px", height: "50px" };\n        break;\n      case "search":\n        size = { width: "290px", height: "280px" };\n        break;\n      case "playlist":\n        size = { width: "290px", height: "240px" };\n        break;\n      case "expanded":\n      default:\n        size = { width: "290px", height: "130px" };\n        break;\n    }\n    ThemeUtils.sendMessage("resize-iframe", size);\n  };\n\n  const expandPlayer = () => {\n    if (isExpanded) return;\n    isExpanded = true;\n    setParentIframeSize("expanded");\n    ThemeUtils.sendMessage("player-expanding");\n    dom.container?.classList.add("expanded");\n    setTimeout(() => {\n      checkTitleScroll();\n    }, 350);\n  };\n\n  const collapsePlayer = () => {\n    if (!isExpanded) return;\n    isExpanded = false;\n    setParentIframeSize("mini");\n    ThemeUtils.sendMessage("player-collapsing");\n    dom.container?.classList.remove("expanded");\n    dom.playlistMenu?.classList.add("hidden");\n    dom.searchMenu?.classList.add("hidden");\n    hideSongActionMenu();\n    hideConfirm();\n  };\n\n  const loadTrackFromCache = (track) => {\n    if (!track.id || !track.source || !window.MusicCache) return false;\n\n    let cacheHit = false;\n\n    if (!track.audioUrl) {\n      const cachedAudioUrl = window.MusicCache.getAudio(track.id, track.source);\n      if (cachedAudioUrl) {\n        log("✓ 从缓存获取音频URL");\n        track.audioUrl = cachedAudioUrl;\n        cacheHit = true;\n      }\n    }\n\n    if (!track.lyricsContent) {\n      const cachedLyrics = window.MusicCache.getLyrics(track.id, track.source);\n      if (cachedLyrics) {\n        log("✓ 从缓存获取歌词");\n        track.lyricsContent = cachedLyrics.content;\n        track.tlyricContent = cachedLyrics.tlyric;\n        cacheHit = true;\n      }\n    }\n\n    if (!track.coverUrl || track.coverUrl === DEFAULT_COVER) {\n      const cachedCover = window.MusicCache.getCover(track.id, track.source);\n      if (cachedCover) {\n        log("✓ 从缓存获取封面");\n        track.coverUrl = cachedCover;\n        cacheHit = true;\n      }\n    }\n\n    return cacheHit;\n  };\n\n  const writeCacheForTrack = (track) => {\n    if (!track || track._fromCache) {\n      log("跳过缓存回写（已标记）");\n      return;\n    }\n    if (!track.id || !track.source || !track.audioUrl) {\n      log("跳过缓存回写（数据不完整）");\n      return;\n    }\n\n    if (window.MusicCache) {\n      window.MusicCache.setAudio(track.id, track.source, track.audioUrl);\n\n      if (track.lyricsContent) {\n        window.MusicCache.setLyrics(\n          track.id,\n          track.source,\n          fetchedLyricsContent,\n          track.tlyricContent || "",\n        );\n      }\n\n      if (track.coverUrl && track.coverUrl !== DEFAULT_COVER) {\n        window.MusicCache.setCover(track.id, track.source, track.coverUrl);\n      }\n\n      const searchTitle = track.originalTitle || track.title || track.name;\n      const searchArtist =\n        track.originalArtist ||\n        (Array.isArray(track.artist) ? track.artist[0] : track.artist);\n\n      if (searchTitle && searchArtist) {\n        window.MusicCache.setSearch(searchTitle, searchArtist, {\n          id: track.id,\n          source: track.source,\n          title: track.title || track.name,\n          artist: Array.isArray(track.artist) ? track.artist[0] : track.artist,\n          coverUrl: track.coverUrl || "",\n        });\n      }\n    }\n\n    ThemeUtils.sendMessage("cache-track-data", {\n      title: track.originalTitle || track.title || track.name,\n      artist:\n        track.originalArtist ||\n        (Array.isArray(track.artist) ? track.artist[0] : track.artist),\n      trackData: {\n        id: track.id,\n        source: track.source,\n        title: track.title || track.name,\n        artist: Array.isArray(track.artist) ? track.artist[0] : track.artist,\n        coverUrl: track.coverUrl || "",\n      },\n      audioUrl: track.audioUrl,\n      lyricsContent: track.lyricsContent || "",\n      tlyricContent: track.tlyricContent || "",\n      coverUrl: track.coverUrl || "",\n    });\n\n    track._fromCache = true;\n    log("✓ 已写入缓存:", track.title);\n  };\n\n  const loadTrack = async (trackIndex, autoPlay = true) => {\n    shouldAutoPlay = autoPlay;\n    enterLoadingState();\n\n    if (!currentPlaylist || currentPlaylist.length === 0) {\n      exitLoadingState();\n      return;\n    }\n\n    currentTrackIndex = trackIndex;\n    const track = currentPlaylist[trackIndex];\n    if (dom.trackTitle) {\n      const titleText = track.title || track.name || "未知歌曲";\n      dom.trackTitle.textContent = titleText;\n      dom.trackTitle.setAttribute("data-text", titleText);\n    }\n    if (dom.trackArtist) {\n      const artist = Array.isArray(track.artist)\n        ? track.artist.join(" / ")\n        : track.artist || "未知艺术家";\n      dom.trackArtist.textContent = artist;\n    }\n    loadTrackFromCache(track);\n    let coverSrc = track.coverUrl || DEFAULT_COVER;\n    if (dom.coverArt) dom.coverArt.src = coverSrc;\n    if (dom.miniCover) dom.miniCover.src = coverSrc;\n    lrcData = [];\n    if (dom.lyricsLine1) dom.lyricsLine1.textContent = "♪";\n    if (dom.lyricsLine2) dom.lyricsLine2.textContent = "";\n    if (!track.audioUrl && track.id && track.source) {\n      log("没有音频URL，正在获取...");\n      try {\n        const sourceMap = {\n          Netease: "netease",\n          Tencent: "tencent",\n          Kuwo: "kuwo",\n        };\n        const apiSource = sourceMap[track.source] || track.source.toLowerCase();\n\n        const response = await fetch(\n          `/api/plugins/g-player-proxy/song?id=${track.id}&source=${apiSource}`,\n        );\n        if (response.ok) {\n          const data = await response.json();\n          if (data.data) {\n            const songItem = Array.isArray(data.data)\n              ? data.data[0]\n              : data.data;\n            if (songItem && songItem.url) {\n              track.audioUrl = songItem.url;\n              if (!track.lyricsContent) {\n                track.lyricsContent = songItem.lrc || songItem.lyric || "";\n                track.tlyricContent = songItem.tlyric || songItem.trans || "";\n              }\n            }\n          }\n        }\n      } catch (err) {\n        error("获取音频URL失败:", err);\n      }\n    }\n\n    if (!track.audioUrl) {\n      error("无法获取音频URL，跳过此曲目");\n      exitLoadingState();\n      if (currentPlaylist.length > 1) {\n        setTimeout(() => {\n          const newIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n          loadTrack(newIndex, true);\n        }, 500);\n      }\n      return;\n    }\n\n    const audioSrc = getAudioSource(track.audioUrl);\n    dom.audioPlayer.src = audioSrc;\n    if (track.lyricsContent) {\n      lrcData = parseLRC(\n        track.lyricsContent,\n        track.tlyricContent || "",\n        track.source,\n      );\n    } else if (track.lyricsUrl) {\n      if (track.lyricsUrl.startsWith("http")) {\n        try {\n          const response = await fetch(track.lyricsUrl);\n          if (response.ok) {\n            const fetchedLyricsContent = await response.text();\n            lrcData = parseLRC(\n              track.lyricsContent,\n              track.tlyricContent || "",\n              track.source,\n            );\n            track.lyricsContent = fetchedLyricsContent;\n          }\n        } catch (err) {\n          error("加载歌词失败:", err);\n        }\n      } else if (track.lyricsUrl.startsWith("[")) {\n        track.lyricsContent = track.lyricsUrl;\n        lrcData = parseLRC(track.lyricsUrl, "", track.source);\n      }\n    } else if (track.id && track.source) {\n      const lyrics = await fetchLyricsFromAPIWithReturn(track.id, track.source);\n      if (lyrics) {\n        track.lyricsContent = lyrics.lrc;\n        track.tlyricContent = lyrics.tlyric;\n      }\n    }\n\n    updatePlaylistUI();\n    if (!track._fromCache && track.audioUrl && track.id && track.source) {\n      writeCacheForTrack(track);\n    }\n\n    setTimeout(() => {\n      checkTitleScroll();\n    }, 200);\n\n    exitLoadingState();\n  };\n\n  async function fetchLyricsFromAPIWithReturn(id, source) {\n    try {\n      const sourceMap = {\n        Netease: "netease",\n        Tencent: "tencent",\n        Kuwo: "kuwo",\n      };\n      const apiSource = sourceMap[source] || source.toLowerCase();\n      const response = await fetch(\n        `/api/plugins/g-player-proxy/lyric?id=${id}&source=${apiSource}`,\n      );\n      if (response.ok) {\n        const data = await response.json();\n        const lrc = data?.data?.lrc || "";\n        const tlyric = data?.data?.tlyric || "";\n        async function fetchLyricsFromAPIWithReturn(id, source) {\n          try {\n            const sourceMap = {\n              Netease: "netease",\n              Tencent: "tencent",\n              Kuwo: "kuwo",\n            };\n            const apiSource = sourceMap[source] || source.toLowerCase();\n            const response = await fetch(\n              `/api/plugins/g-player-proxy/lyric?id=${id}&source=${apiSource}`,\n            );\n            if (response.ok) {\n              const data = await response.json();\n              const lrc = data?.data?.lrc || "";\n              const tlyric = data?.data?.tlyric || "";\n              lrcData = parseLRC(lrc, tlyric, source);\n              return { lrc, tlyric };\n            }\n          } catch (err) {\n            warn("获取歌词失败:", err);\n          }\n          return null;\n        }\n        return { lrc, tlyric };\n      }\n    } catch (err) {\n      warn("获取歌词失败:", err);\n    }\n    return null;\n  }\n\n  function getAudioSource(audioUrl) {\n    if (!audioUrl) return "";\n    const needProxyDomains = [\n      "music.126.net",\n      "126.net",\n      "netease.com",\n      "qq.com",\n      "qqmusic.qq.com",\n      "y.qq.com",\n      "kuwo.cn",\n      "kuwo.com",\n      "kugou.com",\n      "migu.cn",\n    ];\n    if (needProxyDomains.some((domain) => audioUrl.includes(domain))) {\n      return `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`;\n    }\n    return audioUrl;\n  }\n\n  const play = () => {\n    isPlaying = true;\n    dom.container?.classList.add("playing");\n    dom.playPauseBtn?.classList.replace("play", "pause");\n    const playPromise = dom.audioPlayer.play();\n    if (playPromise !== undefined) {\n      playPromise.catch((err) => {\n        if (err.name !== "AbortError") {\n          error("Playback failed:", err);\n          pause();\n        }\n      });\n    }\n    sendPlaybackState(true);\n  };\n\n  const pause = () => {\n    isPlaying = false;\n    dom.container?.classList.remove("playing");\n    dom.playPauseBtn?.classList.replace("pause", "play");\n    dom.audioPlayer.pause();\n    sendPlaybackState(false);\n  };\n\n  const togglePlayPause = () => (isPlaying ? pause() : play());\n\n  function sendPlaybackState(playing) {\n    const currentTrack = currentPlaylist[currentTrackIndex];\n    if (currentTrack && typeof ThemeUtils !== "undefined") {\n      ThemeUtils.sendMessage("playback-state-changed", {\n        isPlaying: playing,\n        currentTrack: {\n          title: currentTrack.title || currentTrack.name,\n          name: currentTrack.title || currentTrack.name,\n          artist: Array.isArray(currentTrack.artist)\n            ? currentTrack.artist.join(" / ")\n            : currentTrack.artist,\n          coverUrl: currentTrack.coverUrl,\n          originalTitle: currentTrack.originalTitle,\n          originalArtist: currentTrack.originalArtist,\n        },\n        lyrics: lrcData,\n      });\n    }\n  }\n\n  const updateLyrics = () => {\n    if (lrcData.length === 0 || !dom.audioPlayer) return;\n\n    const currentTime = dom.audioPlayer.currentTime;\n    let currentLine = { text: "♪", translated: "" };\n\n    const activeLine = lrcData\n      .slice()\n      .reverse()\n      .find((line) => currentTime >= line.time);\n\n    if (activeLine) {\n      currentLine.text = activeLine.text;\n      currentLine.translated = activeLine.translated || "";\n    }\n\n    if (dom.lyricsLine1.textContent !== currentLine.text) {\n      dom.lyricsLine1.textContent = currentLine.text;\n    }\n    if (dom.lyricsLine2.textContent !== currentLine.translated) {\n      dom.lyricsLine2.textContent = currentLine.translated;\n    }\n\n    const currentTrack = currentPlaylist[currentTrackIndex];\n    if (currentTrack && isPlaying) {\n      ThemeUtils.sendMessage("playback-progress", {\n        currentTrack: {\n          title: currentTrack.title || currentTrack.name,\n          artist: Array.isArray(currentTrack.artist)\n            ? currentTrack.artist.join(" / ")\n            : currentTrack.artist,\n        },\n        currentTimeRaw: currentTime,\n      });\n    }\n  };\n\n  const updatePlaylistUI = () => {\n    if (!dom.playlistList) return;\n    dom.playlistList.innerHTML = "";\n\n    currentPlaylist.forEach((song, index) => {\n      const li = document.createElement("li");\n      const title = song.title || song.name || "未知";\n      const artist = Array.isArray(song.artist)\n        ? song.artist.join(" / ")\n        : song.artist || "未知";\n      li.textContent = `${title} - ${artist}`;\n      if (index === currentTrackIndex) li.classList.add("active");\n      li.addEventListener("click", (e) => {\n        e.stopPropagation();\n        loadTrack(index, true);\n        dom.playlistMenu?.classList.add("hidden");\n        setParentIframeSize("expanded");\n      });\n      dom.playlistList.appendChild(li);\n    });\n  };\n\n  async function fetchFullSongDetails(trackInfo) {\n    const sourceMap = { Netease: "netease", Tencent: "tencent", Kuwo: "kuwo" };\n    const apiSource =\n      sourceMap[trackInfo.source] || trackInfo.source.toLowerCase();\n    const trackId = trackInfo.id;\n\n    if (!trackId || !apiSource) {\n      error("获取歌曲详情失败: 缺少 ID 或 source");\n      return null;\n    }\n\n    const sourceLabel =\n      trackInfo.source.charAt(0).toUpperCase() +\n      trackInfo.source.slice(1).toLowerCase();\n    let cachedAudioUrl = null;\n    let cachedLyrics = null;\n    let cachedCover = null;\n\n    if (window.MusicCache) {\n      cachedAudioUrl = window.MusicCache.getAudio(trackId, sourceLabel);\n      cachedLyrics = window.MusicCache.getLyrics(trackId, sourceLabel);\n      cachedCover = window.MusicCache.getCover(trackId, sourceLabel);\n    }\n    if (cachedAudioUrl) {\n      log("✓ fetchFullSongDetails: 缓存完全命中");\n      return {\n        id: trackId,\n        source: sourceLabel,\n        title: trackInfo.title,\n        name: trackInfo.title,\n        artist: trackInfo.artist,\n        audioUrl: cachedAudioUrl,\n        coverUrl:\n          cachedCover || trackInfo.cover || trackInfo.coverUrl || DEFAULT_COVER,\n        lyricsContent: cachedLyrics?.content || "",\n        tlyricContent: cachedLyrics?.tlyric || "",\n        _fromCache: true,\n      };\n    }\n    try {\n      const songResponse = await fetch(\n        `/api/plugins/g-player-proxy/song?id=${trackId}&source=${apiSource}`,\n      );\n      if (!songResponse.ok) throw new Error("获取音频链接失败");\n\n      const songData = await songResponse.json();\n      let audioUrl = "";\n\n      if (songData.data) {\n        const songItem = Array.isArray(songData.data)\n          ? songData.data[0]\n          : songData.data;\n        if (songItem) audioUrl = songItem.url || "";\n      }\n\n      if (!audioUrl || songData._needFallback) {\n        throw new Error("无法获取有效的音频链接");\n      }\n      let lyricsContent = cachedLyrics?.content || "";\n      let tlyricContent = cachedLyrics?.tlyric || "";\n      if (!lyricsContent) {\n        try {\n          const lyricResponse = await fetch(\n            `/api/plugins/g-player-proxy/lyric?id=${trackId}&source=${apiSource}`,\n          );\n          if (lyricResponse.ok) {\n            const lyricData = await lyricResponse.json();\n            if (lyricData.data) {\n              const lyricItem = Array.isArray(lyricData.data)\n                ? lyricData.data[0]\n                : lyricData.data;\n              if (lyricItem) {\n                lyricsContent = lyricItem.lrc || lyricItem.lyric || "";\n                tlyricContent = lyricItem.tlyric || lyricItem.trans || "";\n              }\n            }\n          }\n        } catch (e) {\n          warn("歌词接口获取失败:", e);\n        }\n      } else {\n        log("✓ 使用缓存的歌词");\n      }\n\n      return {\n        id: trackId,\n        source: sourceLabel,\n        title: trackInfo.title,\n        name: trackInfo.title,\n        artist: trackInfo.artist,\n        audioUrl: audioUrl,\n        coverUrl:\n          cachedCover || trackInfo.cover || trackInfo.coverUrl || DEFAULT_COVER,\n        lyricsContent: lyricsContent,\n        tlyricContent: tlyricContent,\n        _fromCache: false,\n      };\n    } catch (err) {\n      error(`获取 ${trackInfo.title} 的完整信息失败:`, err);\n      return null;\n    }\n  }\n\n  async function performSearch(query) {\n    if (!query.trim()) return;\n\n    if (window.MusicCache) {\n      const parts = query.trim().split(/\\s+/);\n      if (parts.length >= 2) {\n        const artist = parts[parts.length - 1];\n        const title = parts.slice(0, -1).join(" ");\n        const cached = window.MusicCache.getSearch(title, artist);\n\n        if (cached) {\n          log("✓ 搜索缓存命中:", title, "-", artist);\n          dom.searchStatus.textContent = "找到 1 首歌曲（缓存）";\n          dom.searchStatus.className = "search-status success";\n          renderSearchResults([\n            {\n              id: cached.id,\n              title: cached.title,\n              artist: cached.artist,\n              cover: cached.coverUrl,\n              source: cached.source,\n            },\n          ]);\n          return;\n        }\n      }\n    }\n\n    dom.searchStatus.textContent = "搜索中...";\n    dom.searchStatus.className = "search-status";\n    dom.searchResults.innerHTML = "";\n\n    try {\n      const sources = ["tencent", "netease", "kuwo"];\n      let allResults = [];\n\n      const searchPromises = sources.map(async (source) => {\n        try {\n          const response = await fetch(\n            `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,\n          );\n          if (response.ok) {\n            const data = await response.json();\n            if (data.data && data.data.length > 0) {\n              return data.data.slice(0, 10).map((item) => ({\n                id: item.id || item.rid,\n                title: item.song || item.name,\n                artist: item.singer || item.artist,\n                cover: item.cover || item.pic || "",\n                source: source.charAt(0).toUpperCase() + source.slice(1),\n              }));\n            }\n          }\n        } catch (e) {\n          warn(`${source} 搜索失败:`, e);\n        }\n        return [];\n      });\n\n      const resultsArrays = await Promise.all(searchPromises);\n      allResults = resultsArrays.flat();\n\n      const seen = new Set();\n      const uniqueResults = allResults\n        .filter((item) => {\n          const key = `${item.title}-${item.artist}`.toLowerCase();\n          if (seen.has(key)) return false;\n          seen.add(key);\n          return true;\n        })\n        .slice(0, 30);\n\n      if (uniqueResults.length > 0) {\n        dom.searchStatus.textContent = `找到 ${uniqueResults.length} 首歌曲`;\n        dom.searchStatus.className = "search-status success";\n        renderSearchResults(uniqueResults);\n      } else {\n        dom.searchStatus.textContent = "未找到结果";\n        dom.searchStatus.className = "search-status error";\n      }\n    } catch (err) {\n      error("搜索失败:", err);\n      dom.searchStatus.textContent = "搜索失败";\n      dom.searchStatus.className = "search-status error";\n    }\n  }\n\n  function renderSearchResults(results) {\n    dom.searchResults.innerHTML = "";\n\n    results.forEach((result, index) => {\n      const li = document.createElement("li");\n      const coverUrl = result.cover || DEFAULT_COVER;\n\n      li.innerHTML = `\n        <img class="search-result-cover" src="${coverUrl}" alt="" onerror="this.src=\'${DEFAULT_COVER}\'">\n        <div class="search-result-info">\n          <div class="search-result-title">${result.title}</div>\n          <div class="search-result-artist">${result.artist}</div>\n        </div>\n        <button class="search-result-more" data-index="${index}" title="更多操作">\n          <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>\n        </button>\n      `;\n\n      li.querySelector(".search-result-info").addEventListener(\n        "click",\n        async (e) => {\n          e.stopPropagation();\n          await playSongFromSearch(result);\n        },\n      );\n\n      li.querySelector(".search-result-cover").addEventListener(\n        "click",\n        async (e) => {\n          e.stopPropagation();\n          await playSongFromSearch(result);\n        },\n      );\n\n      li.querySelector(".search-result-more").addEventListener("click", (e) => {\n        e.stopPropagation();\n        showSongActionMenu(result, e.target);\n      });\n\n      dom.searchResults.appendChild(li);\n    });\n  }\n\n  function showSongActionMenu(song, button) {\n    pendingActionSong = song;\n    const rect = button.getBoundingClientRect();\n    const containerRect = dom.container.getBoundingClientRect();\n    dom.songActionMenu.style.right = "10px";\n    dom.songActionMenu.style.top = `${rect.top - containerRect.top}px`;\n    dom.songActionMenu.classList.remove("hidden");\n  }\n\n  function hideSongActionMenu() {\n    dom.songActionMenu.classList.add("hidden");\n    pendingActionSong = null;\n  }\n\n  async function playSongFromSearch(result) {\n    enterLoadingState();\n    dom.searchStatus.textContent = "获取歌曲信息...";\n\n    let song = await fetchFullSongDetails(result);\n    if (!song || !song.audioUrl) {\n      log(`${result.source} 源失败，尝试换源...`);\n      const allSources = ["tencent", "netease", "kuwo"];\n      const otherSources = allSources.filter(\n        (s) => s.toLowerCase() !== (result.source || "").toLowerCase(),\n      );\n\n      for (const source of otherSources) {\n        try {\n          dom.searchStatus.textContent = `尝试 ${source} 源...`;\n          const query = `${result.title} ${result.artist}`;\n          const response = await fetch(\n            `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,\n          );\n          if (!response.ok) continue;\n\n          const searchData = await response.json();\n          if (searchData.data && searchData.data.length > 0) {\n            const matchedTrack = findMatchingTrack(\n              searchData.data,\n              result.title,\n              result.artist,\n            );\n            if (!matchedTrack) {\n              log(`${source} 未找到匹配 "${result.title} - ${result.artist}"`);\n              continue;\n            }\n            const newResult = {\n              id: matchedTrack.id || matchedTrack.rid,\n              title: result.title,\n              artist: result.artist,\n              cover: matchedTrack.cover || matchedTrack.pic || result.cover,\n              source: source.charAt(0).toUpperCase() + source.slice(1),\n            };\n            song = await fetchFullSongDetails(newResult);\n            if (song && song.audioUrl) {\n              log(`✓ 换源成功: ${source}`);\n              break;\n            }\n          }\n        } catch (e) {\n          warn(`换源 ${source} 失败`, e);\n        }\n      }\n    }\n\n    if (song && song.audioUrl) {\n      writeCacheForTrack(song);\n      if (currentPlaylist.length === 0) {\n        currentPlaylist.push(song);\n        await loadTrack(0, true);\n      } else {\n        const newIndex = currentTrackIndex + 1;\n        currentPlaylist.splice(newIndex, 0, song);\n        await loadTrack(newIndex, true);\n      }\n      updatePlaylistUI();\n      updateButtonStates();\n\n      dom.searchMenu?.classList.add("hidden");\n      setParentIframeSize("expanded");\n      dom.searchStatus.textContent = "";\n      return song;\n    } else {\n      exitLoadingState();\n      error("播放失败:", result);\n      dom.searchStatus.textContent = "播放失败，所有音源都不可用";\n      dom.searchStatus.className = "search-status error";\n      return null;\n    }\n  }\n\n  async function addSongToPlaylist(result, position = "end") {\n    enterLoadingState();\n    dom.searchStatus.textContent = "获取歌曲信息...";\n\n    const song = await fetchFullSongDetails(result);\n    exitLoadingState();\n\n    if (song && song.audioUrl) {\n      writeCacheForTrack(song);\n      if (position === "next") {\n        currentPlaylist.splice(currentTrackIndex + 1, 0, song);\n        dom.searchStatus.textContent = "已添加到下一首";\n      } else {\n        currentPlaylist.push(song);\n        dom.searchStatus.textContent = "已添加到末尾";\n      }\n\n      dom.searchStatus.className = "search-status success";\n      updatePlaylistUI();\n      updateButtonStates();\n\n      setTimeout(() => {\n        dom.searchStatus.textContent = "";\n      }, 2000);\n    } else {\n      error("添加失败:", result);\n      dom.searchStatus.textContent = "添加失败";\n      dom.searchStatus.className = "search-status error";\n    }\n  }\n\n  function scanChatForSongs() {\n    dom.scanChatBtn.classList.add("scanning");\n    ThemeUtils.sendMessage("request-chat-scan");\n    setTimeout(() => {\n      dom.scanChatBtn.classList.remove("scanning");\n    }, 2000);\n  }\n\n  function clearPlaylist() {\n    if (currentPlaylist.length === 0) return;\n    pause();\n    currentPlaylist = [];\n    currentTrackIndex = 0;\n    if (dom.trackTitle) dom.trackTitle.textContent = "未加载";\n    if (dom.trackArtist) dom.trackArtist.textContent = "...";\n    if (dom.lyricsLine1) dom.lyricsLine1.textContent = "♪";\n    if (dom.lyricsLine2) dom.lyricsLine2.textContent = "";\n    if (dom.coverArt) dom.coverArt.src = DEFAULT_COVER;\n    if (dom.miniCover) dom.miniCover.src = DEFAULT_COVER;\n    if (dom.audioPlayer) dom.audioPlayer.src = "";\n    lrcData = [];\n    updatePlaylistUI();\n    updateButtonStates();\n  }\n\n  function normalizePlaylist(playlist) {\n    if (!Array.isArray(playlist)) return [];\n    return playlist.map((song) => ({\n      title: song.title || song.name || song.song || "未知歌曲",\n      name: song.title || song.name || song.song || "未知歌曲",\n      artist: Array.isArray(song.artist)\n        ? song.artist\n        : song.artist || song.singer || "未知艺术家",\n      audioUrl: song.audioUrl || song.url || song.mp3 || "",\n      lyricsUrl: song.lyricsUrl || song.lrc || "",\n      lyricsContent: song.lyricsContent || "",\n      tlyricContent: song.tlyricContent || "",\n      coverUrl: song.coverUrl || song.cover || song.pic || "",\n      id: song.id || null,\n      source: song.source || null,\n      originalTitle: song.originalTitle || null,\n      originalArtist: song.originalArtist || null,\n      _fromCache: song._fromCache || false,\n    }));\n  }\n\n  const init = async () => {\n    const playlistFromCard = ThemeUtils.getPlaylist();\n    currentPlaylist =\n      playlistFromCard && playlistFromCard.length > 0\n        ? normalizePlaylist(playlistFromCard)\n        : DEFAULT_PLAYLIST;\n    updateButtonStates();\n    await loadTrack(0, false);\n    collapsePlayer();\n    ThemeUtils.sendMessage("register-stateful-theme");\n  };\n\n  async function trySwitchSource(currentTrack, autoPlayAfterSwitch = false) {\n    if (!currentTrack) return;\n\n    if (isSwitchingSource) {\n      log("已在换源中，跳过重复调用");\n      return;\n    }\n\n    if (!currentTrack._switchAttempts) {\n      currentTrack._switchAttempts = 0;\n    }\n    currentTrack._switchAttempts++;\n\n    if (currentTrack._switchAttempts > 3) {\n      error("换源尝试次数已达上限，跳过此歌曲");\n      exitLoadingState();\n      setTimeout(() => {\n        if (currentPlaylist.length > 1) {\n          const newIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n          loadTrack(newIndex, autoPlayAfterSwitch); // ← 这里也用传入的参数\n        }\n      }, 1000);\n      return;\n    }\n\n    isSwitchingSource = true;\n    enterLoadingState();\n\n    const query = `${currentTrack.title} ${currentTrack.artist}`;\n    log(`换源尝试 #${currentTrack._switchAttempts}，搜索: ${query}`);\n\n    const allSources = ["kuwo", "netease", "tencent"];\n    const triedSources = currentTrack._triedSources || [];\n    const sourcesToTry = allSources.filter((s) => !triedSources.includes(s));\n\n    if (sourcesToTry.length === 0) {\n      error("所有音源都已尝试过，跳过此歌曲");\n      isSwitchingSource = false;\n      exitLoadingState();\n      setTimeout(() => {\n        if (currentPlaylist.length > 1) {\n          const newIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n          loadTrack(newIndex, autoPlayAfterSwitch);\n        }\n      }, 1000);\n      return;\n    }\n\n    for (const source of sourcesToTry) {\n      try {\n        log(`尝试从 ${source} 换源...`);\n\n        if (!currentTrack._triedSources) {\n          currentTrack._triedSources = [];\n        }\n        currentTrack._triedSources.push(source);\n\n        const response = await fetch(\n          `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,\n        );\n        if (!response.ok) continue;\n\n        const res = await response.json();\n        if (res.data && res.data.length > 0) {\n          const newTrackBase = findMatchingTrack(\n            res.data,\n            currentTrack.title,\n            currentTrack.artist,\n          );\n          if (!newTrackBase) {\n            log(\n              `${source} 未找到匹配 "${currentTrack.title} - ${currentTrack.artist}"`,\n            );\n            continue;\n          }\n          const searchResult = {\n            id: newTrackBase.id || newTrackBase.rid,\n            title: currentTrack.title,\n            artist: currentTrack.artist,\n            cover: currentTrack.coverUrl,\n            source: source.charAt(0).toUpperCase() + source.slice(1),\n          };\n          const fullSong = await fetchFullSongDetails(searchResult);\n\n          if (fullSong && fullSong.audioUrl) {\n            log(`✓ 换源成功: ${source}`);\n            fullSong._fromCache = false;\n            fullSong._switchAttempts = currentTrack._switchAttempts;\n            fullSong._triedSources = currentTrack._triedSources;\n            writeCacheForTrack(fullSong);\n            currentPlaylist[currentTrackIndex] = fullSong;\n            isSwitchingSource = false;\n            await loadTrack(currentTrackIndex, autoPlayAfterSwitch);\n            return;\n          }\n        }\n      } catch (e) {\n        warn(`换源 ${source} 失败`, e);\n      }\n    }\n\n    error("所有换源尝试均失败");\n    isSwitchingSource = false;\n    exitLoadingState();\n\n    setTimeout(() => {\n      if (currentPlaylist.length > 1) {\n        const newIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n        loadTrack(newIndex, autoPlayAfterSwitch);\n      }\n    }, 1000);\n  }\n\n  const bindEvents = () => {\n    dom.container?.addEventListener("click", (e) => {\n      if (\n        e.target.closest(\n          ".control-button, .menu-button, .playlist-menu, .search-menu, .song-action-menu, .action-button, .confirm-modal",\n        )\n      )\n        return;\n      isExpanded ? collapsePlayer() : expandPlayer();\n    });\n\n    dom.menuButton?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      dom.searchMenu?.classList.add("hidden");\n      hideSongActionMenu();\n      const isHidden = dom.playlistMenu?.classList.contains("hidden");\n      dom.playlistMenu?.classList.toggle("hidden");\n      if (isHidden) {\n        setParentIframeSize("playlist");\n      } else {\n        setParentIframeSize("expanded");\n      }\n    });\n\n    dom.searchButton?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      dom.playlistMenu?.classList.add("hidden");\n      hideSongActionMenu();\n      const isHidden = dom.searchMenu?.classList.contains("hidden");\n      dom.searchMenu?.classList.toggle("hidden");\n      if (isHidden) {\n        setParentIframeSize("search");\n        dom.searchInput?.focus();\n      } else {\n        setParentIframeSize("expanded");\n      }\n    });\n\n    dom.closeSearchBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      dom.searchMenu?.classList.add("hidden");\n      setParentIframeSize("expanded");\n    });\n\n    dom.closePlaylistBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      dom.playlistMenu?.classList.add("hidden");\n      setParentIframeSize("expanded");\n    });\n\n    dom.playPauseBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      togglePlayPause();\n    });\n\n    const playNext = () => {\n      if (currentPlaylist.length === 0) return;\n      const newIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n      loadTrack(newIndex, true);\n    };\n\n    const playPrev = () => {\n      if (currentPlaylist.length === 0) return;\n      const newIndex =\n        (currentTrackIndex - 1 + currentPlaylist.length) %\n        currentPlaylist.length;\n      loadTrack(newIndex, true);\n    };\n\n    dom.prevBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      playPrev();\n    });\n\n    dom.nextBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      playNext();\n    });\n\n    dom.audioPlayer?.addEventListener("ended", playNext);\n    dom.audioPlayer?.addEventListener("timeupdate", updateLyrics);\n\n    dom.audioPlayer?.addEventListener("loadedmetadata", () => {\n      const duration = dom.audioPlayer.duration;\n      log(\n        `音频元数据加载，时长: ${duration ? duration.toFixed(1) : "未知"} 秒`,\n      );\n\n      if (duration > 0 && duration <= 35) {\n        warn(`⚠️ 检测到试听版 (${duration.toFixed(1)}s)，触发换源...`);\n        const wantAutoPlay = shouldAutoPlay;\n        pause();\n        dom.audioPlayer.src = "";\n        const currentTrack = currentPlaylist[currentTrackIndex];\n        if (currentTrack) {\n          if (window.MusicCache && currentTrack.id && currentTrack.source) {\n            window.MusicCache.invalidateAudio(\n              currentTrack.id,\n              currentTrack.source,\n            );\n          }\n          trySwitchSource(currentTrack, wantAutoPlay);\n        }\n        return;\n      }\n    });\n\n    dom.audioPlayer?.addEventListener("canplay", () => {\n      exitLoadingState();\n      if (shouldAutoPlay) {\n        play();\n        shouldAutoPlay = false;\n      }\n    });\n\n    dom.audioPlayer?.addEventListener("waiting", enterLoadingState);\n    dom.audioPlayer?.addEventListener("playing", exitLoadingState);\n\n    dom.audioPlayer?.addEventListener("error", () => {\n      exitLoadingState();\n      const currentTrack = currentPlaylist[currentTrackIndex];\n\n      if (currentTrack) {\n        log("播放错误，尝试换源...");\n        if (window.MusicCache && currentTrack.id && currentTrack.source) {\n          window.MusicCache.invalidateAudio(\n            currentTrack.id,\n            currentTrack.source,\n          );\n        }\n        trySwitchSource(currentTrack, isPlaying || shouldAutoPlay);\n      }\n    });\n\n    dom.doSearchBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      performSearch(dom.searchInput.value);\n    });\n\n    dom.searchInput?.addEventListener("keypress", (e) => {\n      if (e.key === "Enter") {\n        e.preventDefault();\n        performSearch(dom.searchInput.value);\n      }\n    });\n\n    dom.actionPlayNext?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      if (pendingActionSong) {\n        addSongToPlaylist(pendingActionSong, "next");\n        hideSongActionMenu();\n      }\n    });\n\n    dom.actionAddToEnd?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      if (pendingActionSong) {\n        addSongToPlaylist(pendingActionSong, "end");\n        hideSongActionMenu();\n      }\n    });\n\n    document.addEventListener("click", () => {\n      hideSongActionMenu();\n    });\n\n    dom.scanChatBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      scanChatForSongs();\n    });\n\n    dom.clearPlaylistBtn?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      showConfirm("确定要清空播放列表吗？", () => {\n        clearPlaylist();\n        hideConfirm();\n      });\n    });\n\n    dom.confirmYes?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      if (confirmCallback) confirmCallback();\n    });\n\n    dom.confirmNo?.addEventListener("click", (e) => {\n      e.stopPropagation();\n      hideConfirm();\n    });\n  };\n\n  window.addEventListener("message", async (event) => {\n    if (event.data?.source !== "typing-indicator-host") return;\n    const { type, data } = event.data;\n\n    switch (type) {\n      case "set-initial-playlist":\n      case "context-update":\n        if (data.charAvatarUrl) {\n          if (dom.coverArt) dom.coverArt.src = data.charAvatarUrl;\n          if (dom.miniCover) dom.miniCover.src = data.charAvatarUrl;\n        }\n        if (data.playlist) {\n          const newPlaylist = normalizePlaylist(data.playlist);\n          newPlaylist.forEach((song, i) => {\n            if (data.playlist[i]?._fromCache) {\n              song._fromCache = true;\n            }\n          });\n          if (JSON.stringify(currentPlaylist) !== JSON.stringify(newPlaylist)) {\n            currentPlaylist = newPlaylist;\n            updatePlaylistUI();\n            updateButtonStates();\n            if (currentPlaylist.length > 0 && !isPlaying)\n              await loadTrack(0, false);\n          }\n        }\n        break;\n\n      case "append-songs-to-playlist":\n        if (Array.isArray(data) && data.length > 0) {\n          const normalizedSongs = normalizePlaylist(data);\n          normalizedSongs.forEach((song, i) => {\n            if (data[i]?._fromCache) {\n              song._fromCache = true;\n            }\n          });\n          currentPlaylist.push(...normalizedSongs);\n          updatePlaylistUI();\n          updateButtonStates();\n          if (!isPlaying && currentPlaylist.length === normalizedSongs.length)\n            await loadTrack(0, false);\n        }\n        break;\n\n      case "play-now":\n      case "play-by-info":\n        if (data && data.title && data.artist) {\n          const searchTitle = data.title.toLowerCase();\n          const searchArtist = (\n            Array.isArray(data.artist)\n              ? data.artist.join(" ")\n              : data.artist || ""\n          ).toLowerCase();\n\n          const existingIndex = currentPlaylist.findIndex((track) => {\n            const trackTitle = (track.title || track.name || "").toLowerCase();\n            const trackArtist = (\n              Array.isArray(track.artist)\n                ? track.artist.join(" ")\n                : track.artist || ""\n            ).toLowerCase();\n\n            const titleMatch =\n              trackTitle.includes(searchTitle) ||\n              searchTitle.includes(trackTitle);\n            const artistMatch =\n              trackArtist.includes(searchArtist) ||\n              searchArtist.includes(trackArtist);\n\n            return titleMatch && artistMatch;\n          });\n\n          if (existingIndex !== -1) {\n            const existingTrack = currentPlaylist[existingIndex];\n            if (data.audioUrl) {\n              existingTrack.audioUrl = data.audioUrl || existingTrack.audioUrl;\n              existingTrack.lyricsContent =\n                data.lyricsContent || existingTrack.lyricsContent;\n              existingTrack.tlyricContent =\n                data.tlyricContent || existingTrack.tlyricContent;\n              existingTrack.coverUrl = data.coverUrl || existingTrack.coverUrl;\n              existingTrack._fromCache = true;\n            }\n            log("在播放列表中找到，直接播放");\n            await loadTrack(existingIndex, true);\n            updateButtonStates();\n            break;\n          }\n\n          if (data.audioUrl) {\n            log("✓ 使用来自主机的预搜索结果");\n            const normalizedSong = normalizePlaylist([data])[0];\n            normalizedSong._fromCache = true;\n            if (currentPlaylist.length === 0) {\n              currentPlaylist.push(normalizedSong);\n              await loadTrack(0, true);\n            } else {\n              currentPlaylist.splice(currentTrackIndex + 1, 0, normalizedSong);\n              await loadTrack(currentTrackIndex + 1, true);\n            }\n            updatePlaylistUI();\n            updateButtonStates();\n            break;\n          }\n\n          if (window.MusicCache) {\n            const artistForCache = Array.isArray(data.artist)\n              ? data.artist[0]\n              : data.artist;\n            const cached = window.MusicCache.getSearch(\n              data.title,\n              artistForCache,\n            );\n\n            if (cached) {\n              log("✓ play-by-info: 搜索缓存命中");\n              const fullSong = await fetchFullSongDetails({\n                id: cached.id,\n                title: cached.title,\n                artist: cached.artist,\n                cover: cached.coverUrl,\n                source: cached.source,\n              });\n\n              if (fullSong && fullSong.audioUrl) {\n                if (currentPlaylist.length === 0) {\n                  currentPlaylist.push(fullSong);\n                  await loadTrack(0, true);\n                } else {\n                  currentPlaylist.splice(currentTrackIndex + 1, 0, fullSong);\n                  await loadTrack(currentTrackIndex + 1, true);\n                }\n                updatePlaylistUI();\n                updateButtonStates();\n                break;\n              }\n            }\n          }\n\n          log(`未在播放列表找到，开始为 ${data.title} 搜索...`);\n          let songAdded = false;\n          for (const source of ["tencent", "netease", "kuwo"]) {\n            try {\n              const artistForSearch = Array.isArray(data.artist)\n                ? data.artist[0]\n                : data.artist;\n              const query = `${data.title} ${artistForSearch}`;\n              const response = await fetch(\n                `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=${source}`,\n              );\n              if (response.ok) {\n                const searchData = await response.json();\n                if (searchData.data && searchData.data.length > 0) {\n                  const matchedTrack = findMatchingTrack(\n                    searchData.data,\n                    data.title,\n                    artistForSearch,\n                  );\n                  if (!matchedTrack) {\n                    log(\n                      `${source} 未找到匹配 "${data.title} - ${artistForSearch}"`,\n                    );\n                    continue;\n                  }\n                  const searchResult = {\n                    id: matchedTrack.id || matchedTrack.rid,\n                    title: data.title,\n                    artist: artistForSearch,\n                    cover: matchedTrack.cover || matchedTrack.pic || "",\n                    source: source.charAt(0).toUpperCase() + source.slice(1),\n                  };\n                  const fullSongDetails =\n                    await fetchFullSongDetails(searchResult);\n\n                  if (fullSongDetails && fullSongDetails.audioUrl) {\n                    log("✓ 成功获取歌曲详情，添加到播放列表");\n                    fullSongDetails.originalTitle = data.title;\n                    fullSongDetails.originalArtist = artistForSearch;\n                    writeCacheForTrack(fullSongDetails);\n                    if (currentPlaylist.length === 0) {\n                      currentPlaylist.push(fullSongDetails);\n                      await loadTrack(0, true);\n                    } else {\n                      currentPlaylist.splice(\n                        currentTrackIndex + 1,\n                        0,\n                        fullSongDetails,\n                      );\n                      await loadTrack(currentTrackIndex + 1, true);\n                    }\n                    updatePlaylistUI();\n                    updateButtonStates();\n                    songAdded = true;\n                    break;\n                  }\n                }\n              }\n            } catch (e) {\n              warn(`${source} 搜索失败:`, e);\n            }\n          }\n          if (!songAdded) {\n            error(`搜索 ${data.title} 失败`);\n          }\n        }\n        break;\n\n      case "toggle-playback":\n        togglePlayPause();\n        break;\n\n      case "audio-url-refreshed":\n        if (data && data.trackIndex !== undefined) {\n          const { audioUrl, trackIndex } = data;\n\n          if (trackIndex < 0 || trackIndex >= currentPlaylist.length) {\n            exitLoadingState();\n            return;\n          }\n\n          if (audioUrl) {\n            log(`✓ 收到刷新的URL，用于轨道 ${trackIndex}`);\n            const track = currentPlaylist[trackIndex];\n\n            loadTrackFromCache(track);\n\n            track.audioUrl = audioUrl;\n\n            writeCacheForTrack(track);\n\n            if (trackIndex === currentTrackIndex) {\n              log("立即应用新URL并尝试播放...");\n              const newSrc = getAudioSource(audioUrl);\n              dom.audioPlayer.src = newSrc;\n\n              dom.audioPlayer.addEventListener(\n                "loadedmetadata",\n                () => {\n                  const duration = dom.audioPlayer.duration;\n\n                  if (duration > 0 && duration <= 35) {\n                    warn(`⚠️ 检测到试听版，尝试换源...`);\n                    pause();\n                    dom.audioPlayer.src = "";\n                    if (window.MusicCache) {\n                      window.MusicCache.invalidateAudio(track.id, track.source);\n                    }\n                    trySwitchSource(track, shouldAutoPlay);\n                    return;\n                  }\n\n                  log("✓ 音频有效，准备播放...");\n                  if (shouldAutoPlay) play();\n                },\n                { once: true },\n              );\n            }\n          } else {\n            exitLoadingState();\n            warn(`刷新URL失败，返回空链接。`);\n          }\n        }\n        break;\n\n      case "graceful-shutdown-request":\n        pause();\n        ThemeUtils.sendMessage("graceful-shutdown-response");\n        break;\n    }\n  });\n\n  init();\n  bindEvents();\n});',
    sizes: {
      draggable: {
        width: "90vw",
        height: "130px",
        maxWidth: "320px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "player-spotify",
    name: "播放器-Spotify",
    useIframe: true,
    html: '<div id="player-container">\n    <div id="mini-view" class="view">\n        <img id="mini-cover" src="" alt="cover">\n    </div>\n    <div id="expanded-view" class="view hidden">\n        <div id="main-content" class="content-wrapper">\n            <header class="player-header">\n                <button id="collapse-btn" class="header-btn">\n                    <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>\n                </button>\n                <div class="header-title">正在播放</div>\n                <div class="header-btn-group">\n                    <button id="search-btn" class="header-btn" title="搜索歌曲">\n                        <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>\n                    </button>\n                    <button id="playlist-btn" class="header-btn">\n                        <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>\n                    </button>\n                </div>\n            </header>\n            <main class="player-body">\n                <div id="cover-art-wrapper" class="cover-art-wrapper">\n                    <img id="cover-art" src="" alt="Album Cover">\n                </div>\n                <div class="track-info">\n                    <h2 id="track-title">...</h2>\n                    <p id="track-artist">...</p>\n                </div>\n                <div class="progress-bar-container">\n                    <div id="progress-bar-wrapper" class="progress-bar-wrapper">\n                        <div class="progress-track"></div>\n                        <div id="progress-bar" class="progress-bar">\n                            <div class="progress-thumb"></div>\n                        </div>\n                    </div>\n                    <div class="time-stamps">\n                        <span id="current-time">0:00</span>\n                        <span id="duration">0:00</span>\n                    </div>\n                </div>\n                <div class="controls">\n                    <button id="shuffle-btn" class="control-btn secondary"><svg viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></svg></button>\n                    <button id="prev-btn" class="control-btn"><svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg></button>\n                    <button id="play-pause-btn" class="control-btn main"><svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg><svg class="pause-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg></button>\n                    <button id="next-btn" class="control-btn"><svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm12-12v12h2V6h-2z"></path></svg></button>\n                    <button id="repeat-btn" class="control-btn secondary">\n                        <svg class="repeat-all-icon" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></svg>\n                        <svg class="repeat-one-icon" style="display: none;" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zM13 15h-2v-2h2v2zm-2-4h2V9h-2v2z"></path></svg>\n                    </button>\n                </div>\n            </main>\n        </div>\n\n        <div id="lyrics-content" class="content-wrapper hidden">\n            <header class="player-header">\n                <button id="lyrics-back-btn" class="header-btn"><svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg></button>\n                <div class="header-title" id="lyrics-header-title">歌词</div>\n                <div class="header-btn placeholder"></div>\n            </header>\n            <div id="lyrics-container" class="lyrics-container"></div>\n        </div>\n\n        <div id="playlist-content" class="content-wrapper hidden">\n    <header class="player-header">\n        <button id="playlist-clear-btn" class="header-btn" title="清空歌单">\n            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>\n        </button>\n        <div class="header-title">播放列表</div>\n        <button id="playlist-close-btn" class="header-btn"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button>\n            </header>\n            <ul id="playlist-list" class="playlist-list"></ul>\n        </div>\n\n        <div id="search-content" class="content-wrapper hidden">\n            <header class="player-header">\n                <button id="search-back-btn" class="header-btn">\n                    <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>\n                </button>\n                <div class="header-title">搜索歌曲</div>\n                <div class="header-btn placeholder"></div>\n            </header>\n            <div class="search-container">\n                <div class="search-input-wrapper">\n                    <input type="text" id="search-input" class="search-input" placeholder="输入歌曲名或歌手...">\n                    <button id="search-submit-btn" class="search-submit-btn">\n                        <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>\n                    </button>\n                </div>\n                <div class="search-source-tabs">\n                    <button class="source-tab active" data-source="tencent">QQ音乐</button>\n                    <button class="source-tab" data-source="netease">网易云</button>\n                    <button class="source-tab" data-source="kuwo">酷我</button>\n                </div>\n            </div>\n            <div id="search-results" class="search-results">\n                <div class="search-placeholder">输入关键词开始搜索</div>\n            </div>\n        </div>\n\n        <div id="more-menu" class="more-menu hidden">\n            <div class="more-menu-backdrop"></div>\n            <div class="more-menu-content">\n                <div class="more-menu-header">\n                    <img class="more-menu-cover" src="" alt="">\n                    <div class="more-menu-info">\n                        <div class="more-menu-title"></div>\n                        <div class="more-menu-artist"></div>\n                    </div>\n                </div>\n                <div class="more-menu-options">\n                    <button class="more-menu-option" data-action="play-next">\n                        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>\n                        <span>下一首播放</span>\n                    </button>\n                    <button class="more-menu-option" data-action="add-to-end">\n                        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>\n                        <span>添加到末尾</span>\n                    </button>\n                    <button class="more-menu-option" data-action="play-now">\n                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>\n                        <span>立即播放</span>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div id="confirm-dialog" class="confirm-dialog hidden">\n    <div class="confirm-backdrop"></div>\n    <div class="confirm-content">\n        <div class="confirm-message">确定要清空播放列表吗？</div>\n        <div class="confirm-buttons">\n            <button id="confirm-cancel" class="confirm-btn cancel">取消</button>\n            <button id="confirm-ok" class="confirm-btn ok">确定</button>\n        </div>\n    </div>\n</div>\n\n    <audio id="audio-player"></audio>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');\n:root { --font-family: 'Inter', 'Noto Sans SC', sans-serif; --bg-main-gradient: linear-gradient(160deg, rgba(45, 45, 45, 0.65), rgba(20, 20, 20, 0.8)); --text-primary: #ffffff; --text-secondary: #b3b3b3; --accent-color: #94999dff; --border-color: rgba(255, 255, 255, 0.1); --border-highlight: rgba(255, 255, 255, 0.2); --border-radius-main: 16px; --border-radius-inner: 10px; --shadow-heavy: 0 8px 32px rgba(0,0,0,0.6); --shadow-luminous-edge: inset 0 1px 1px var(--border-highlight); --transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }\n* { box-sizing: border-box; margin: 0; padding: 0; }\nhtml, body { width: 100%; height: 100%; overflow: hidden; }\nbody { font-family: var(--font-family); background: transparent; color: var(--text-primary); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n::-webkit-scrollbar { width: 0; height: 0; }\n.lyrics-container, .playlist-list, .search-results { scrollbar-width: none; -ms-overflow-style: none; }\n#player-container { width: 100%; height: 100%; position: relative; cursor: pointer; }\n.view { width: 100%; height: 100%; transition: opacity var(--transition), transform var(--transition); position: absolute; top: 0; left: 0; }\n.view.hidden { opacity: 0; pointer-events: none; transform: scale(0.95); }\n#mini-view { border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-heavy); }\n#mini-cover { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }\n@keyframes mp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n#expanded-view { background: var(--bg-main-gradient); backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); border-radius: var(--border-radius-main); overflow: hidden; padding: 12px; position: relative; box-shadow: var(--shadow-heavy), var(--shadow-luminous-edge), inset 0 -1px 1px rgba(0,0,0,0.2); }\n#expanded-view::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: var(--border-radius-main); border: 1px solid var(--border-color); pointer-events: none; z-index: 1; }\n#expanded-view::after { content: ''; position: absolute; top: 1px; left: 1px; right: 1px; height: 1px; background: linear-gradient(to right, transparent, var(--border-highlight), transparent); opacity: 0.7; border-radius: var(--border-radius-main); pointer-events: none; z-index: 1; }\n.content-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; transition: opacity 0.3s ease; }\n.content-wrapper.hidden { display: none; }\n.player-header { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; z-index: 10; }\n.header-title { font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }\n.header-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px; transition: color var(--transition); }\n.header-btn:hover { color: var(--text-primary); }\n.header-btn svg { width: 24px; height: 24px; fill: currentColor; }\n.header-btn.placeholder { width: 32px; height: 32px; }\n.header-btn-group { display: flex; align-items: center; gap: 2px; }\n.player-body { display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; min-height: 0; }\n.cover-art-wrapper { width: 90%; padding-top: 90%; margin: 10px auto 0; position: relative; border-radius: var(--border-radius-inner); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.5); flex-shrink: 0; }\n#cover-art { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }\n.track-info {\n    text-align: center;\n    flex-shrink: 0;\n    margin-top: 10px;\n    overflow: hidden;\n    position: relative;\n    width: 100%;\n}\n\n.track-info h2 {\n    font-size: 18px;\n    font-weight: 700;\n    white-space: nowrap;\n    display: inline-block;\n    position: relative;\n}\n\n.track-info h2.scrolling {\n    animation: marquee-scroll var(--scroll-duration, 10s) linear infinite;\n}\n\n.track-info h2.scrolling::after {\n    content: attr(data-text);\n    position: absolute;\n    left: 100%;\n    padding-left: 50px;\n    white-space: nowrap;\n}\n\n@keyframes marquee-scroll {\n    0% { transform: translateX(0); }\n    100% { transform: translateX(calc(-100% - 50px)); }\n}\n\n.track-info p { font-size: 13px; font-weight: 500; color: var(--text-secondary); margin-top: 4px; word-break: break-word; }\n.progress-bar-container { flex-shrink: 0; margin-top: 10px; }\n.progress-bar-wrapper { width: 100%; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; cursor: pointer; position: relative; }\n.progress-bar { width: 0%; height: 100%; background: var(--text-primary); border-radius: 2px; position: relative; }\n.progress-bar-wrapper:hover .progress-bar { background: var(--accent-color); }\n.progress-bar-wrapper:hover .progress-thumb { opacity: 1; }\n.progress-thumb { width: 12px; height: 12px; background: var(--text-primary); border-radius: 50%; position: absolute; right: -6px; top: 50%; transform: translateY(-50%); opacity: 0; transition: opacity var(--transition); }\n.time-stamps { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-secondary); margin-top: 6px; font-variant-numeric: tabular-nums; }\n.controls { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; margin-top: 10px; }\n.control-btn { background: none; border: none; color: var(--text-primary); cursor: pointer; padding: 8px; transition: transform 0.2s ease, color var(--transition); }\n.control-btn:active { transform: scale(0.9); }\n.control-btn svg { width: 28px; height: 28px; fill: currentColor; }\n.control-btn.secondary svg { width: 20px; height: 20px; }\n.control-btn.secondary.active { color: var(--accent-color); }\n.control-btn.main { background: transparent; border: 2px solid rgba(255, 255, 255, 0.7); color: var(--text-primary); border-radius: 50%; width: 48px; height: 48px; display: flex; justify-content: center; align-items: center; transition: background-color var(--transition); position: relative; }\n.control-btn.main:hover { background-color: rgba(255, 255, 255, 0.1); }\n.control-btn.main svg { width: 28px; height: 28px; }\n.control-btn.main .play-icon, .control-btn.main.playing .pause-icon { display: block; }\n.control-btn.main .pause-icon, .control-btn.main.playing .play-icon { display: none; }\n.control-btn.main .play-icon { margin-left: 3px; }\n#lyrics-back-btn svg { transform: rotate(90deg); }\n.lyrics-container { flex-grow: 1; overflow-y: auto; padding: 0 5px; min-height: 0; }\n.lyrics-line { padding: 12px 0; font-size: 18px; font-weight: 700; text-align: center; color: var(--text-secondary); opacity: 0.5; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); word-break: break-word; }\n.lyrics-line.active { color: var(--text-primary); opacity: 1; transform: scale(1.02); }\n.lyrics-padding { height: 45%; flex-shrink: 0; }\n.playlist-list { list-style: none; flex-grow: 1; overflow-y: auto; min-height: 0; }\n.playlist-list li { display: flex; align-items: center; padding: 10px 4px; border-radius: 6px; cursor: pointer; transition: background-color var(--transition); }\n.playlist-list li:hover { background: rgba(50, 50, 50, 0.7); }\n.playlist-list li.active { color: var(--accent-color); }\n.playlist-cover { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 12px; flex-shrink: 0; }\n.playlist-info { flex: 1; min-width: 0; }\n.playlist-info h3 { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.playlist-info p { font-size: 12px; color: var(--text-secondary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.playlist-more-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 8px; transition: color var(--transition); flex-shrink: 0; }\n.playlist-more-btn:hover { color: var(--text-primary); }\n.playlist-more-btn svg { width: 20px; height: 20px; fill: currentColor; }\n#player-container.loading .control-btn, #player-container.loading .progress-bar-wrapper { pointer-events: none; opacity: 0.6; }\n#player-container.loading .control-btn.main { background: transparent !important; border-color: rgba(255, 255, 255, 0.3) !important; }\n#player-container.loading .control-btn.main svg { display: none !important; }\n.control-btn.main::after { content: ''; display: none; width: 24px; height: 24px; border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: var(--accent-color); border-radius: 50%; animation: mp-spin 0.8s linear infinite; }\n#player-container.loading .control-btn.main::after { display: block; }\n.progress-bar-wrapper .progress-track::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); animation: mp-loading-shine 1.5s linear infinite; opacity: 0; transition: opacity 0.3s; }\n#player-container.loading .progress-bar-wrapper .progress-track::after { opacity: 1; }\n@keyframes mp-loading-shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }\n\n.search-container { padding: 10px 0; flex-shrink: 0; }\n.search-input-wrapper { display: flex; align-items: center; background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 4px; gap: 4px; border: 1px solid var(--border-color); transition: border-color var(--transition), background var(--transition); }\n.search-input-wrapper:focus-within { border-color: var(--accent-color); background: rgba(255, 255, 255, 0.15); }\n.search-input { flex: 1; background: none; border: none; color: var(--text-primary); font-size: 14px; padding: 8px 12px; outline: none; font-family: var(--font-family); }\n.search-input::placeholder { color: var(--text-secondary); opacity: 0.7; }\n.search-submit-btn { background: var(--accent-color); border: none; color: #fff; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background var(--transition), transform 0.2s ease; flex-shrink: 0; }\n.search-submit-btn:hover { background: #9680aaff; }\n.search-submit-btn:active { transform: scale(0.95); }\n.search-submit-btn svg { width: 18px; height: 18px; fill: currentColor; }\n.search-source-tabs { display: flex; gap: 8px; margin-top: 10px; }\n.source-tab { background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 16px; cursor: pointer; transition: all var(--transition); font-family: var(--font-family); }\n.source-tab:hover { background: rgba(255, 255, 255, 0.12); color: var(--text-primary); }\n.source-tab.active { background: var(--accent-color); border-color: var(--accent-color); color: #fff; }\n.search-results { flex: 1; overflow-y: auto; min-height: 0; margin-top: 10px; }\n.search-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary); font-size: 14px; opacity: 0.7; }\n.search-placeholder svg { width: 48px; height: 48px; fill: currentColor; margin-bottom: 12px; opacity: 0.5; }\n.search-loading { display: flex; align-items: center; justify-content: center; height: 100%; }\n.search-loading::after { content: ''; width: 32px; height: 32px; border: 3px solid rgba(255, 255, 255, 0.2); border-top-color: var(--accent-color); border-radius: 50%; animation: mp-spin 0.8s linear infinite; }\n.search-result-item { display: flex; align-items: center; padding: 10px 4px; border-radius: 6px; cursor: pointer; transition: background-color var(--transition); }\n.search-result-item:hover { background: rgba(50, 50, 50, 0.7); }\n.search-result-cover { width: 44px; height: 44px; object-fit: cover; border-radius: 4px; margin-right: 12px; flex-shrink: 0; background: rgba(255, 255, 255, 0.1); }\n.search-result-info { flex: 1; min-width: 0; }\n.search-result-title { font-size: 14px; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.search-result-artist { font-size: 12px; color: var(--text-secondary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.search-result-source { font-size: 10px; color: var(--accent-color); margin-top: 2px; opacity: 0.8; }\n.search-result-more { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 8px; transition: color var(--transition); flex-shrink: 0; }\n.search-result-more:hover { color: var(--text-primary); }\n.search-result-more svg { width: 20px; height: 20px; fill: currentColor; }\n\n.more-menu { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 100; display: flex; flex-direction: column; justify-content: flex-end; }\n.more-menu.hidden { display: none; }\n.more-menu-backdrop { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); animation: mp-fade-in 0.2s ease; }\n@keyframes mp-fade-in { from { opacity: 0; } to { opacity: 1; } }\n.more-menu-content { position: relative; background: linear-gradient(180deg, rgba(50, 50, 50, 0.95), rgba(30, 30, 30, 0.98)); border-radius: 16px 16px 0 0; padding: 16px; animation: mp-slide-up 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }\n@keyframes mp-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }\n.more-menu-header { display: flex; align-items: center; padding-bottom: 16px; border-bottom: 1px solid var(--border-color); margin-bottom: 8px; }\n.more-menu-cover { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; margin-right: 12px; flex-shrink: 0; background: rgba(255, 255, 255, 0.1); }\n.more-menu-info { flex: 1; min-width: 0; }\n.more-menu-title { font-size: 15px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.more-menu-artist { font-size: 13px; color: var(--text-secondary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.more-menu-options { display: flex; flex-direction: column; gap: 4px; }\n.more-menu-option { display: flex; align-items: center; gap: 14px; background: none; border: none; color: var(--text-primary); font-size: 15px; font-family: var(--font-family); padding: 14px 8px; border-radius: 8px; cursor: pointer; transition: background var(--transition); text-align: left; width: 100%; }\n.more-menu-option:hover { background: rgba(255, 255, 255, 0.1); }\n.more-menu-option:active { background: rgba(255, 255, 255, 0.15); }\n.more-menu-option svg { width: 22px; height: 22px; fill: currentColor; flex-shrink: 0; opacity: 0.8; }\n\n.playlist-delete-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 8px; transition: color var(--transition); flex-shrink: 0; opacity: 0.6; }\n.playlist-delete-btn:hover { color: #89252dff; opacity: 1; }\n.playlist-delete-btn svg { width: 16px; height: 16px; fill: currentColor; }\n.playlist-list li .playlist-actions { display: flex; align-items: center; gap: 2px; }\n#playlist-clear-btn:hover { color: #89252dff; }\n\n.confirm-dialog { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 200; display: flex; align-items: center; justify-content: center; }\n.confirm-dialog.hidden { display: none; }\n.confirm-backdrop { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); }\n.confirm-content { position: relative; background: linear-gradient(180deg, rgba(60, 60, 60, 0.95), rgba(40, 40, 40, 0.98)); border-radius: 12px; padding: 20px; min-width: 200px; text-align: center; animation: mp-scale-in 0.2s ease; }\n@keyframes mp-scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }\n.confirm-message { font-size: 14px; color: var(--text-primary); margin-bottom: 16px; }\n.confirm-buttons { display: flex; gap: 10px; justify-content: center; }\n.confirm-btn { padding: 8px 20px; border: none; border-radius: 6px; font-size: 13px; font-family: var(--font-family); cursor: pointer; transition: all 0.2s; }\n.confirm-btn.cancel { background: rgba(255, 255, 255, 0.1); color: var(--text-secondary); }\n.confirm-btn.cancel:hover { background: rgba(255, 255, 255, 0.2); }\n.confirm-btn.ok { background: #89252dff; color: #fff; }\n.confirm-btn.ok:hover { background: #89252dff; }\n.lyrics-empty { display: flex; align-items: center; justify-content: center; height: 100%; font-size: 16px; color: var(--text-secondary); opacity: 0.6; }",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  const DEBUG_MODE = false;\n  const log = (...args) => DEBUG_MODE && console.log("[Player]", ...args);\n  const warn = (...args) => DEBUG_MODE && console.warn("[Player]", ...args);\n  const error = (...args) => console.error("[Player]", ...args);\n  const DEFAULT_COVER_URL = "https://i.imgur.com/QpHvo8B.jpeg";\n  const DEFAULT_PLAYLIST = [\n    {\n      title: "Let Go",\n      artist: "Beau Young Prince",\n      lyricsUrl: "https://files.catbox.moe/3dp8qo.lrc",\n      audioUrl: "https://files.catbox.moe/6492x2.mp3",\n      coverUrl: "https://i.imgur.com/gSfUYJK.jpeg",\n    },\n    {\n      title: "What\'s Up Danger",\n      artist: "Blackway, Black Caviar",\n      lyricsUrl: "https://files.catbox.moe/w6h2a3.lrc",\n      audioUrl: "https://files.catbox.moe/tcm7db.mp3",\n      coverUrl: "https://i.imgur.com/gSfUYJK.jpeg",\n    },\n    {\n      title: "Mona Lisa",\n      artist: "Dominic Fike",\n      lyricsUrl: "https://files.catbox.moe/rbvfoa.lrc",\n      audioUrl: "https://files.catbox.moe/rasy0e.mp3",\n      coverUrl: "https://i.imgur.com/B9lSbdy.jpeg",\n    },\n    {\n      title: "Silk and Cologne",\n      artist: "ei8ht, Offset",\n      lyricsUrl: "https://files.catbox.moe/ltxfcq.lrc",\n      audioUrl: "https://files.catbox.moe/j0hl5m.mp3",\n      coverUrl: "https://i.imgur.com/B9lSbdy.jpeg",\n    },\n    {\n      title: "Scared of the Dark",\n      artist: "Lil Wayne, Ty Dolla $ign, XXXTENTACION",\n      lyricsUrl: "https://files.catbox.moe/kaozzt.lrc",\n      audioUrl: "https://files.catbox.moe/mrzvse.mp3",\n      coverUrl: "https://i.imgur.com/gSfUYJK.jpeg",\n    },\n    {\n      title: "Am I Dreaming",\n      artist: "Metro Boomin, A$AP Rocky, Roisee",\n      lyricsUrl: "https://files.catbox.moe/xecaha.lrc",\n      audioUrl: "https://files.catbox.moe/tmfv9t.mp3",\n      coverUrl: "https://i.imgur.com/B9lSbdy.jpeg",\n    },\n    {\n      title: "Self Love",\n      artist: "Metro Boomin, Coi Leray",\n      lyricsUrl: "https://files.catbox.moe/n08sxt.lrc",\n      audioUrl: "https://files.catbox.moe/jxxc8e.mp3",\n      coverUrl: "https://i.imgur.com/B9lSbdy.jpeg",\n    },\n    {\n      title: "Hummingbird",\n      artist: "Metro Boomin, James Blake",\n      lyricsUrl: "https://files.catbox.moe/mz1a4g.lrc",\n      audioUrl: "https://files.catbox.moe/wqe6jy.mp3",\n      coverUrl: "https://i.imgur.com/B9lSbdy.jpeg",\n    },\n    {\n      title: "Sunflower",\n      artist: "Post Malone, Swae Lee",\n      lyricsUrl: "https://files.catbox.moe/m5k19z.lrc",\n      audioUrl: "https://files.catbox.moe/aawwzw.mp3",\n      coverUrl: "https://i.imgur.com/B9lSbdy.jpeg",\n    },\n  ];\n\n  const dom = {\n    container: ThemeUtils.$("#player-container"),\n    confirmDialog: ThemeUtils.$("#confirm-dialog"),\n    confirmCancel: ThemeUtils.$("#confirm-cancel"),\n    confirmOk: ThemeUtils.$("#confirm-ok"),\n    audioPlayer: ThemeUtils.$("#audio-player"),\n    miniView: ThemeUtils.$("#mini-view"),\n    miniCover: ThemeUtils.$("#mini-cover"),\n    expandedView: ThemeUtils.$("#expanded-view"),\n    mainContent: ThemeUtils.$("#main-content"),\n    lyricsContent: ThemeUtils.$("#lyrics-content"),\n    playlistContent: ThemeUtils.$("#playlist-content"),\n    coverArt: ThemeUtils.$("#cover-art"),\n    trackTitle: ThemeUtils.$("#track-title"),\n    trackArtist: ThemeUtils.$("#track-artist"),\n    currentTime: ThemeUtils.$("#current-time"),\n    duration: ThemeUtils.$("#duration"),\n    progressBarWrapper: ThemeUtils.$("#progress-bar-wrapper"),\n    progressBar: ThemeUtils.$("#progress-bar"),\n    playPauseBtn: ThemeUtils.$("#play-pause-btn"),\n    prevBtn: ThemeUtils.$("#prev-btn"),\n    nextBtn: ThemeUtils.$("#next-btn"),\n    shuffleBtn: ThemeUtils.$("#shuffle-btn"),\n    repeatBtn: ThemeUtils.$("#repeat-btn"),\n    collapseBtn: ThemeUtils.$("#collapse-btn"),\n    playlistBtn: ThemeUtils.$("#playlist-btn"),\n    playlistCloseBtn: ThemeUtils.$("#playlist-close-btn"),\n    playlistList: ThemeUtils.$("#playlist-list"),\n    playlistClearBtn: ThemeUtils.$("#playlist-clear-btn"),\n    coverArtWrapper: ThemeUtils.$("#cover-art-wrapper"),\n    lyricsContainer: ThemeUtils.$("#lyrics-container"),\n    lyricsBackBtn: ThemeUtils.$("#lyrics-back-btn"),\n    repeatAllIcon: ThemeUtils.$(".repeat-all-icon"),\n    repeatOneIcon: ThemeUtils.$(".repeat-one-icon"),\n    searchBtn: ThemeUtils.$("#search-btn"),\n    searchContent: ThemeUtils.$("#search-content"),\n    searchBackBtn: ThemeUtils.$("#search-back-btn"),\n    searchInput: ThemeUtils.$("#search-input"),\n    searchSubmitBtn: ThemeUtils.$("#search-submit-btn"),\n    searchResults: ThemeUtils.$("#search-results"),\n    sourceTabs: ThemeUtils.$$(".source-tab"),\n    moreMenu: ThemeUtils.$("#more-menu"),\n    moreMenuBackdrop: ThemeUtils.$(".more-menu-backdrop"),\n    moreMenuCover: ThemeUtils.$(".more-menu-cover"),\n    moreMenuTitle: ThemeUtils.$(".more-menu-title"),\n    moreMenuArtist: ThemeUtils.$(".more-menu-artist"),\n    moreMenuOptions: ThemeUtils.$$(".more-menu-option"),\n  };\n\n  let currentPlaylist = [];\n  let currentTrackIndex = 0;\n  let isPlaying = false;\n  let playMode = "normal";\n  let lrcData = [];\n  let isExpanded = false;\n  let isUpdatingPlaylist = false;\n  let currentSearchSource = "tencent";\n  let currentSearchResults = [];\n  let selectedTrackForMenu = null;\n  let shouldAutoPlay = false;\n  let isChangingTrack = false;\n  let loadingTimeoutId = null;\n  let lastProgressTime = 0;\n  let progressCheckInterval = null;\n  const LOADING_TIMEOUT = 15000;\n\n  const enterLoadingState = () => dom.container.classList.add("loading");\n  const exitLoadingState = () => dom.container.classList.remove("loading");\n  const startLoadingTimeout = () => {\n    clearTimeout(loadingTimeoutId);\n    loadingTimeoutId = setTimeout(() => {\n      if (dom.container.classList.contains("loading")) {\n        handleLoadingTimeout();\n      }\n    }, LOADING_TIMEOUT);\n  };\n\n  const clearLoadingTimeout = () => {\n    clearTimeout(loadingTimeoutId);\n    loadingTimeoutId = null;\n  };\n\n  const handleLoadingTimeout = () => {\n    const track = currentPlaylist[currentTrackIndex];\n    if (!track) {\n      exitLoadingState();\n      return;\n    }\n    const currentTime = dom.audioPlayer.currentTime;\n    if (currentTime > 0 && dom.audioPlayer.src) {\n      dom.audioPlayer.currentTime = currentTime + 0.1;\n      dom.audioPlayer.play().catch(() => {\n        const src = dom.audioPlayer.src;\n        dom.audioPlayer.src = "";\n        setTimeout(() => {\n          dom.audioPlayer.src = src;\n          dom.audioPlayer.currentTime = currentTime;\n          dom.audioPlayer.play().catch(() => {\n            const title = track.originalTitle || track.title;\n            const artist = track.originalArtist || track.artist;\n            searchAndPlay(title, artist, track.source, true);\n          });\n        }, 500);\n      });\n    } else {\n      const title = track.originalTitle || track.title;\n      const artist = track.originalArtist || track.artist;\n      searchAndPlay(title, artist, track.source, true);\n    }\n  };\n\n  const startProgressCheck = () => {\n    stopProgressCheck();\n    lastProgressTime = dom.audioPlayer.currentTime;\n    progressCheckInterval = setInterval(() => {\n      if (isPlaying && !dom.audioPlayer.paused) {\n        const currentTime = dom.audioPlayer.currentTime;\n        if (Math.abs(currentTime - lastProgressTime) < 0.1) {\n          handleLoadingTimeout();\n        }\n        lastProgressTime = currentTime;\n      }\n    }, 5000);\n  };\n\n  const stopProgressCheck = () => {\n    if (progressCheckInterval) {\n      clearInterval(progressCheckInterval);\n      progressCheckInterval = null;\n    }\n  };\n\n  const setIframeSize = (expanded) => {\n    const size = expanded\n      ? { width: "320px", height: "480px" }\n      : { width: "70px", height: "70px" };\n    ThemeUtils.sendMessage("resize-iframe", size);\n  };\n\n  const switchView = (viewToShow) => {\n    [\n      dom.mainContent,\n      dom.lyricsContent,\n      dom.playlistContent,\n      dom.searchContent,\n    ].forEach((view) => view.classList.add("hidden"));\n    viewToShow.classList.remove("hidden");\n  };\n\n  const expandPlayer = () => {\n    if (isExpanded) return;\n    isExpanded = true;\n    dom.container.classList.add("expanded");\n    dom.miniView.classList.add("hidden");\n    dom.expandedView.classList.remove("hidden");\n    setIframeSize(true);\n    ThemeUtils.sendMessage("player-expanding");\n    setTimeout(() => {\n      checkTitleScroll();\n    }, 300);\n  };\n\n  const checkTitleScroll = () => {\n    const titleEl = dom.trackTitle;\n    const containerWidth = titleEl.parentElement.clientWidth;\n    const textWidth = titleEl.scrollWidth;\n    titleEl.classList.remove("scrolling");\n    if (containerWidth < 100) return;\n\n    if (textWidth > containerWidth) {\n      const duration = Math.max(5, textWidth / 30);\n      titleEl.style.setProperty("--scroll-duration", `${duration}s`);\n      titleEl.classList.add("scrolling");\n    }\n  };\n\n  const collapsePlayer = () => {\n    if (!isExpanded) return;\n    isExpanded = false;\n    dom.container.classList.remove("expanded");\n    dom.expandedView.classList.add("hidden");\n    dom.miniView.classList.remove("hidden");\n    setIframeSize(false);\n    ThemeUtils.sendMessage("player-collapsing");\n    setTimeout(() => switchView(dom.mainContent), 300);\n  };\n\n  const getAudioDurationQuick = (audioUrl) => {\n    return new Promise((resolve) => {\n      const needProxyDomains = ["music.126.net", "qq.com", "kuwo.cn"];\n      const needProxy = needProxyDomains.some((d) => audioUrl.includes(d));\n      const finalUrl = needProxy\n        ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`\n        : audioUrl;\n      const audio = new Audio();\n      audio.preload = "metadata";\n      const timeout = setTimeout(() => {\n        audio.src = "";\n        resolve(null);\n      }, 3000);\n      audio.onloadedmetadata = () => {\n        clearTimeout(timeout);\n        const dur = audio.duration;\n        audio.src = "";\n        resolve(isFinite(dur) ? dur : null);\n      };\n      audio.onerror = () => {\n        clearTimeout(timeout);\n        audio.src = "";\n        resolve(null);\n      };\n      audio.src = finalUrl;\n    });\n  };\n\n  const sendCacheWriteback = (track) => {\n    if (!track || track._fromCache) return;\n    if (!track.audioUrl || !track.id || !track.source) return;\n\n    ThemeUtils.sendMessage("cache-track-data", {\n      title: track.originalTitle || track.title,\n      artist: track.originalArtist || track.artist,\n      trackData: {\n        id: track.id,\n        source: track.source,\n        title: track.title,\n        artist: track.artist,\n        coverUrl: track.coverUrl || "",\n      },\n      audioUrl: track.audioUrl,\n      lyricsContent: track.lyricsContent || "",\n      tlyricContent: track.tlyricContent || "",\n      coverUrl: track.coverUrl || "",\n    });\n\n    track._fromCache = true;\n  };\n\n  const parseLrcKuwo = (lrcText) => {\n    if (!lrcText) return [];\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/;\n    const lines = lrcText.split("\\n");\n\n    const parsed = [];\n    for (const line of lines) {\n      const match = line.match(timeRegex);\n      if (!match) continue;\n\n      const content = line.replace(/\\[[\\d:.]+\\]/g, "").trim();\n      if (\n        !content ||\n        content === "//" ||\n        content === "/ /" ||\n        /^\\/+$/.test(content) ||\n        /^[:\\s]+$/.test(content)\n      )\n        continue;\n\n      const time =\n        parseInt(match[1], 10) * 60 +\n        parseInt(match[2], 10) +\n        parseInt(match[3].padEnd(3, "0"), 10) / 1000;\n\n      parsed.push({ time, text: content });\n    }\n\n    const timeGroups = new Map();\n    for (const item of parsed) {\n      const key = item.time.toFixed(3);\n      if (!timeGroups.has(key)) {\n        timeGroups.set(key, []);\n      }\n      timeGroups.get(key).push(item.text);\n    }\n\n    const result = [];\n    const sortedTimes = Array.from(timeGroups.keys()).sort(\n      (a, b) => parseFloat(a) - parseFloat(b),\n    );\n\n    for (const timeKey of sortedTimes) {\n      const time = parseFloat(timeKey);\n      const texts = timeGroups.get(timeKey);\n\n      if (texts.length === 1) {\n        result.push({ time, text: texts[0], translated: null });\n      } else if (texts.length >= 2) {\n        if (result.length > 0 && !result[result.length - 1].translated) {\n          result[result.length - 1].translated = texts[0];\n        }\n        result.push({ time, text: texts[1], translated: null });\n        if (texts.length > 2) {\n          result[result.length - 1].translated = texts.slice(2).join(" ");\n        }\n      }\n    }\n\n    return result;\n  };\n\n  const parseLrcText = (lrcText, tlyricText = "", source = "") => {\n    if (!lrcText) return [];\n    if (source && source.toLowerCase() === "kuwo") {\n      return parseLrcKuwo(lrcText);\n    }\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g;\n\n    const isChinese = (text) => /[\\u4e00-\\u9fa5]/.test(text);\n    const isJapanese = (text) => /[\\u3040-\\u309f\\u30a0-\\u30ff]/.test(text);\n    const isAsian = (text) =>\n      isChinese(text) || isJapanese(text) || /[\\uac00-\\ud7af]/.test(text);\n\n    const parseLines = (text) => {\n      if (!text) return [];\n      const lines = [];\n      text.split("\\n").forEach((line) => {\n        const content = line.replace(timeRegex, "").trim();\n        if (!content) return;\n        if (content === "//" || content === "//\\\\n" || /^\\/+$/.test(content))\n          return;\n        timeRegex.lastIndex = 0;\n        let match;\n        while ((match = timeRegex.exec(line))) {\n          const minutes = parseInt(match[1], 10);\n          const seconds = parseInt(match[2], 10);\n          const milliseconds = parseInt(match[3].padEnd(3, "0"), 10);\n          const time = minutes * 60 + seconds + milliseconds / 1000;\n          lines.push({\n            time,\n            text: content,\n            isChinese: isChinese(content),\n            isAsian: isAsian(content),\n          });\n        }\n      });\n      return lines;\n    };\n\n    let allLines = parseLines(lrcText);\n    if (allLines.length === 0) return [];\n\n    if (tlyricText && tlyricText.trim()) {\n      const transLines = parseLines(tlyricText);\n      if (transLines.length > 0) {\n        const transMap = new Map();\n        transLines.forEach((t) => transMap.set(t.time.toFixed(2), t.text));\n        allLines.sort((a, b) => a.time - b.time);\n        return allLines.map((line) => ({\n          time: line.time,\n          text: line.text,\n          translated: transMap.get(line.time.toFixed(2)) || null,\n        }));\n      }\n    }\n\n    let splitIndex = -1;\n    for (let i = 1; i < allLines.length; i++) {\n      if (allLines[i].time < allLines[i - 1].time - 30) {\n        splitIndex = i;\n        break;\n      }\n    }\n\n    if (splitIndex > 0) {\n      const firstPart = allLines.slice(0, splitIndex);\n      const secondPart = allLines.slice(splitIndex);\n\n      const firstHasChinese = firstPart.some((l) => l.isChinese);\n      const secondHasChinese = secondPart.some((l) => l.isChinese);\n      const firstHasJapanese = firstPart.some((l) => isJapanese(l.text));\n\n      let originalPart, transPart;\n      if (!firstHasChinese && secondHasChinese) {\n        originalPart = firstPart;\n        transPart = secondPart;\n      } else if (firstHasChinese && !secondHasChinese) {\n        originalPart = secondPart;\n        transPart = firstPart;\n      } else if (firstHasJapanese && secondHasChinese) {\n        originalPart = firstPart;\n        transPart = secondPart;\n      } else {\n        originalPart = firstPart;\n        transPart = secondPart;\n      }\n\n      const transMap = new Map();\n      transPart.forEach((t) => transMap.set(t.time.toFixed(2), t.text));\n\n      originalPart.sort((a, b) => a.time - b.time);\n      return originalPart.map((line) => ({\n        time: line.time,\n        text: line.text,\n        translated: transMap.get(line.time.toFixed(2)) || null,\n      }));\n    }\n\n    allLines.sort((a, b) => a.time - b.time);\n\n    const chineseLines = allLines.filter(\n      (l) => l.isChinese && !isJapanese(l.text),\n    );\n    const nonChineseLines = allLines.filter(\n      (l) => !l.isChinese || isJapanese(l.text),\n    );\n\n    if (\n      chineseLines.length > 0 &&\n      nonChineseLines.length > 0 &&\n      Math.abs(chineseLines.length - nonChineseLines.length) <=\n        Math.max(chineseLines.length, nonChineseLines.length) * 0.3\n    ) {\n      const merged = [];\n      const usedChineseIndices = new Set();\n\n      for (const nonChinese of nonChineseLines) {\n        let bestMatch = null;\n        let bestMatchIdx = -1;\n        let minTimeDiff = Infinity;\n\n        for (let i = 0; i < chineseLines.length; i++) {\n          if (usedChineseIndices.has(i)) continue;\n          const chinese = chineseLines[i];\n          const timeDiff = Math.abs(chinese.time - nonChinese.time);\n          if (timeDiff < minTimeDiff && timeDiff < 10) {\n            minTimeDiff = timeDiff;\n            bestMatch = chinese;\n            bestMatchIdx = i;\n          }\n        }\n\n        if (bestMatch && bestMatchIdx !== -1) {\n          usedChineseIndices.add(bestMatchIdx);\n          merged.push({\n            time: nonChinese.time,\n            text: nonChinese.text,\n            translated: bestMatch.text,\n          });\n        } else {\n          merged.push({\n            time: nonChinese.time,\n            text: nonChinese.text,\n            translated: null,\n          });\n        }\n      }\n\n      for (let i = 0; i < chineseLines.length; i++) {\n        if (!usedChineseIndices.has(i)) {\n          merged.push({\n            time: chineseLines[i].time,\n            text: chineseLines[i].text,\n            translated: null,\n          });\n        }\n      }\n\n      return merged.sort((a, b) => a.time - b.time);\n    }\n\n    const merged = [];\n    for (let i = 0; i < allLines.length; i++) {\n      const current = allLines[i];\n      const next = allLines[i + 1];\n      if (\n        next &&\n        Math.abs(next.time - current.time) < 0.1 &&\n        current.isAsian !== next.isAsian\n      ) {\n        if (current.isChinese && !next.isChinese) {\n          merged.push({\n            time: current.time,\n            text: next.text,\n            translated: current.text,\n          });\n        } else {\n          merged.push({\n            time: current.time,\n            text: current.text,\n            translated: next.text,\n          });\n        }\n        i++;\n      } else {\n        merged.push({\n          time: current.time,\n          text: current.text,\n          translated: null,\n        });\n      }\n    }\n\n    return merged;\n  };\n\n  const loadTrack = async (index, autoPlay = false) => {\n    enterLoadingState();\n    shouldAutoPlay = autoPlay;\n    isChangingTrack = true;\n\n    dom.audioPlayer.pause();\n    dom.audioPlayer.src = "";\n\n    if (!currentPlaylist || !currentPlaylist[index]) {\n      exitLoadingState();\n      isChangingTrack = false;\n      return;\n    }\n\n    currentTrackIndex = index;\n    let track = currentPlaylist[index];\n\n    dom.trackTitle.textContent = track.title;\n    dom.trackTitle.setAttribute("data-text", track.title);\n    dom.trackArtist.textContent = track.artist;\n    const coverSrc = track.coverUrl || DEFAULT_COVER_URL;\n    dom.coverArt.src = coverSrc;\n    dom.miniCover.src = coverSrc;\n\n    if (!track.audioUrl || !track.audioUrl.startsWith("http")) {\n      log("[Player] audioUrl 无效，尝试获取...");\n      dom.trackArtist.textContent = "正在获取播放链接...";\n\n      let details = null;\n      if (track.id && track.source) {\n        details = await fetchSongDetails(track);\n      }\n      if (!details || !details.audioUrl) {\n        const title = track.originalTitle || track.title;\n        const artist = track.originalArtist || track.artist;\n\n        if (title && artist) {\n          for (const source of ["tencent", "netease", "kuwo"]) {\n            dom.trackArtist.textContent = `正在尝试获取...`;\n            details = await fetchSongDetailsFromSource(title, artist, source);\n            if (details && details.audioUrl) {\n              const duration = await getAudioDurationQuick(details.audioUrl);\n              if (duration !== null && duration <= 35) {\n                log(`[Player] ${source} 是试听版，跳过`);\n                continue;\n              }\n              log(`[Player] ✓ 通过 ${source} 获取成功`);\n              break;\n            }\n          }\n        }\n      }\n\n      if (details && details.audioUrl) {\n        track = { ...track, ...details };\n        currentPlaylist[index] = track;\n        updatePlaylistUI();\n      } else {\n        exitLoadingState();\n        isChangingTrack = false;\n        dom.trackTitle.textContent = "无法播放";\n        dom.trackArtist.textContent = "获取链接失败，请尝试搜索";\n        log("[Player] 无法获取 audioUrl");\n        return;\n      }\n    }\n\n    dom.trackArtist.textContent = track.artist;\n    dom.audioPlayer.src = track.audioUrl;\n\n    setTimeout(() => {\n      if (\n        dom.container.classList.contains("loading") &&\n        !dom.audioPlayer.duration\n      ) {\n        log("[Player] 加载超时，尝试重新获取...");\n        track._refreshed = false;\n        track.audioUrl = "";\n        currentPlaylist[index] = track;\n        loadTrack(index, autoPlay);\n      }\n    }, 15000);\n\n    lrcData = [];\n    dom.lyricsContainer.innerHTML =\n      \'<div class="lyrics-empty">正在加载歌词...</div>\';\n\n    try {\n      if (track.lyricsContent && track.lyricsContent.startsWith("[")) {\n        log("[Player] 使用 lyricsContent");\n        lrcData = parseLrcText(\n          track.lyricsContent,\n          track.tlyricContent || "",\n          track.source,\n        );\n        renderLyrics();\n      } else if (track.lyricsUrl) {\n        if (\n          track.lyricsUrl.startsWith("http://") ||\n          track.lyricsUrl.startsWith("https://")\n        ) {\n          log("[Player] 从 URL 加载歌词");\n          const res = await fetch(track.lyricsUrl);\n          const text = await res.text();\n          lrcData = parseLrcText(text, track.tlyricContent || "", track.source);\n          renderLyrics();\n          track.lyricsContent = text;\n        } else if (track.lyricsUrl.startsWith("[")) {\n          lrcData = parseLrcText(\n            track.lyricsUrl,\n            track.tlyricContent || "",\n            track.source,\n          );\n          renderLyrics();\n        } else {\n          dom.lyricsContainer.innerHTML =\n            \'<div class="lyrics-empty">暂无歌词</div>\';\n        }\n      } else {\n        dom.lyricsContainer.innerHTML =\n          \'<div class="lyrics-empty">暂无歌词</div>\';\n      }\n    } catch (e) {\n      console.error("歌词加载失败:", e);\n      dom.lyricsContainer.innerHTML =\n        \'<div class="lyrics-empty">歌词加载失败</div>\';\n    }\n\n    updatePlaylistUI();\n    isChangingTrack = false;\n\n    setTimeout(() => {\n      checkTitleScroll();\n    }, 150);\n  };\n\n  const fetchSongDetailsFromSource = async (title, artist, source) => {\n    const query = `${title} ${artist}`;\n\n    try {\n      const searchRes = await fetch(\n        `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(\n          query,\n        )}&source=${source}`,\n      );\n      const searchData = await searchRes.json();\n\n      if (!searchData.data || searchData.data.length === 0) {\n        return null;\n      }\n\n      const normalizedTitle = title.toLowerCase().trim();\n      const normalizedArtist = artist.toLowerCase().trim();\n\n      const track = searchData.data.find((item) => {\n        const itemName = (item.song || item.name || "").toLowerCase();\n        const itemArtist = (item.singer || item.artist || "").toLowerCase();\n\n        const titleMatch =\n          itemName.includes(normalizedTitle) ||\n          normalizedTitle.includes(itemName);\n\n        const artistMatch =\n          itemArtist.includes(normalizedArtist) ||\n          normalizedArtist.includes(itemArtist);\n\n        return titleMatch && artistMatch;\n      });\n\n      if (!track) {\n        log(`[Player] ${source} 未找到匹配 "${title} - ${artist}" 的结果`);\n        return null;\n      }\n\n      const trackId = track.id || track.rid;\n      const sourceLabel =\n        { netease: "Netease", tencent: "Tencent", kuwo: "Kuwo" }[source] ||\n        source;\n\n      const songRes = await fetch(\n        `/api/plugins/g-player-proxy/song?id=${trackId}&source=${source}`,\n      );\n      const songData = await songRes.json();\n\n      if (songData._needFallback) return null;\n\n      let audioUrl = "";\n      let lyricsContent = "";\n      let tlyricContent = "";\n\n      if (songData.data) {\n        if (Array.isArray(songData.data)) {\n          audioUrl = songData.data[0]?.url || "";\n          lyricsContent =\n            songData.data[0]?.lrc || songData.data[0]?.lyric || "";\n          tlyricContent = songData.data[0]?.tlyric || "";\n        } else {\n          audioUrl = songData.data.url || "";\n          lyricsContent = songData.data.lrc || songData.data.lyric || "";\n          tlyricContent = songData.data.tlyric || "";\n        }\n      }\n\n      if (!audioUrl) return null;\n\n      if (window.MusicCache) {\n        window.MusicCache.setSearch(title, artist, {\n          id: trackId,\n          source: sourceLabel,\n          title: track.song || track.name,\n          artist: track.singer || track.artist,\n          coverUrl: track.cover || track.pic || "",\n        });\n        window.MusicCache.setAudio(trackId, sourceLabel, audioUrl);\n        if (lyricsContent) {\n          window.MusicCache.setLyrics(\n            trackId,\n            sourceLabel,\n            lyricsContent,\n            tlyricContent,\n          );\n        }\n      }\n\n      return {\n        id: trackId,\n        source: sourceLabel,\n        title: track.song || track.name,\n        artist: track.singer || track.artist,\n        coverUrl: track.cover || track.pic || "",\n        audioUrl: audioUrl,\n        lyricsContent: lyricsContent,\n        tlyricContent: tlyricContent,\n        originalTitle: title,\n        originalArtist: artist,\n        _fromCache: false,\n      };\n    } catch (e) {\n      warn(`[Player] fetchSongDetailsFromSource ${source} 失败:`, e);\n      return null;\n    }\n  };\n\n  const play = () => {\n    isPlaying = true;\n    dom.playPauseBtn.classList.add("playing");\n    dom.container.classList.add("playing");\n    const playPromise = dom.audioPlayer.play();\n    if (playPromise !== undefined) {\n      playPromise.catch((error) => {\n        if (error.name !== "AbortError") {\n          console.error("Playback failed:", error);\n          pause();\n        }\n      });\n    }\n    const track = currentPlaylist[currentTrackIndex];\n    if (track) {\n      ThemeUtils.sendMessage("playback-state-changed", {\n        isPlaying: true,\n        currentTrack: {\n          title: track.title,\n          name: track.title,\n          artist: track.artist,\n          originalTitle: track.originalTitle || track.title,\n          originalArtist: track.originalArtist || track.artist,\n        },\n        lyrics: lrcData,\n      });\n    }\n  };\n\n  const pause = () => {\n    isPlaying = false;\n    dom.playPauseBtn.classList.remove("playing");\n    dom.container.classList.remove("playing");\n    dom.audioPlayer.pause();\n    const track = currentPlaylist[currentTrackIndex];\n    if (track) {\n      ThemeUtils.sendMessage("playback-state-changed", {\n        isPlaying: false,\n        currentTrack: {\n          title: track.title,\n          name: track.title,\n          artist: track.artist,\n        },\n      });\n    }\n  };\n\n  const playNextTrack = () => {\n    let nextIndex;\n    if (playMode === "repeat-one") {\n      nextIndex = currentTrackIndex;\n    } else if (playMode === "shuffle") {\n      if (currentPlaylist.length <= 1) {\n        nextIndex = 0;\n      } else {\n        do {\n          nextIndex = Math.floor(Math.random() * currentPlaylist.length);\n        } while (nextIndex === currentTrackIndex);\n      }\n    } else {\n      nextIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n    }\n    loadTrack(nextIndex, true);\n  };\n\n  const playPrevTrack = () => {\n    const prevIndex =\n      (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;\n    loadTrack(prevIndex, true);\n  };\n\n  const formatTime = (seconds) => {\n    const min = Math.floor(seconds / 60);\n    const sec = Math.floor(seconds % 60)\n      .toString()\n      .padStart(2, "0");\n    return `${min}:${sec}`;\n  };\n\n  const updateProgress = () => {\n    if (!dom.audioPlayer.duration) return;\n    const progressPercent =\n      (dom.audioPlayer.currentTime / dom.audioPlayer.duration) * 100;\n    dom.progressBar.style.width = `${progressPercent}%`;\n    dom.currentTime.textContent = formatTime(dom.audioPlayer.currentTime);\n  };\n\n  const renderLyrics = () => {\n    if (lrcData.length === 0) {\n      dom.lyricsContainer.innerHTML =\n        \'<div class="lyrics-empty">暂无歌词</div>\';\n      return;\n    }\n    const lyricsHtml = lrcData\n      .map(\n        (line, index) =>\n          `<div class="lyrics-line" data-index="${index}">${line.text}${\n            line.translated ? `<br><small>${line.translated}</small>` : ""\n          }</div>`,\n      )\n      .join("");\n    const paddingElement = \'<div class="lyrics-padding"></div>\';\n    dom.lyricsContainer.innerHTML =\n      paddingElement + lyricsHtml + paddingElement;\n  };\n\n  const updateActiveLyrics = () => {\n    if (\n      lrcData.length === 0 ||\n      !isExpanded ||\n      dom.lyricsContent.classList.contains("hidden")\n    )\n      return;\n    const currentTime = dom.audioPlayer.currentTime;\n    let activeIndex = -1;\n    for (let i = lrcData.length - 1; i >= 0; i--) {\n      if (currentTime >= lrcData[i].time) {\n        activeIndex = i;\n        break;\n      }\n    }\n    if (activeIndex !== -1) {\n      const currentActiveLine = dom.lyricsContainer.querySelector(\n        ".lyrics-line.active",\n      );\n      const currentIndex = currentActiveLine\n        ? parseInt(currentActiveLine.dataset.index)\n        : -1;\n      if (currentIndex !== activeIndex) {\n        if (currentActiveLine) currentActiveLine.classList.remove("active");\n        const newActiveLine = dom.lyricsContainer.querySelector(\n          `.lyrics-line[data-index="${activeIndex}"]`,\n        );\n        if (newActiveLine) {\n          newActiveLine.classList.add("active");\n          const container = dom.lyricsContainer;\n          const targetScrollTop =\n            newActiveLine.offsetTop -\n            container.clientHeight / 2 +\n            newActiveLine.offsetHeight / 2;\n          container.scrollTo({ top: targetScrollTop, behavior: "smooth" });\n        }\n      }\n    }\n  };\n\n  const updatePlaylistUI = () => {\n    dom.playlistList.innerHTML = currentPlaylist\n      .map(\n        (track, index) => `\n        <li data-index="${index}" class="${\n          index === currentTrackIndex ? "active" : ""\n        }">\n            <img src="${\n              track.coverUrl || DEFAULT_COVER_URL\n            }" class="playlist-cover">\n            <div class="playlist-info">\n                <h3>${track.title}</h3>\n                <p>${track.artist}</p>\n            </div>\n            <div class="playlist-actions">\n                <button class="playlist-more-btn" data-index="${index}" title="更多选项">\n                    <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>\n                </button>\n                <button class="playlist-delete-btn" data-index="${index}" title="删除">\n                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>\n                </button>\n            </div>\n        </li>`,\n      )\n      .join("");\n  };\n\n  const performSearch = async (query) => {\n    if (!query.trim()) return;\n    dom.searchResults.innerHTML = \'<div class="search-loading"></div>\';\n    try {\n      const response = await fetch(\n        `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(\n          query,\n        )}&source=${currentSearchSource}`,\n      );\n      if (!response.ok) {\n        throw new Error(`HTTP ${response.status}`);\n      }\n      const data = await response.json();\n      if (data.data && data.data.length > 0) {\n        currentSearchResults = data.data.map((item) => ({\n          id: item.id || item.rid,\n          title: item.song || item.name,\n          artist: item.singer || item.artist,\n          coverUrl: item.cover || item.pic || DEFAULT_COVER_URL,\n          source: currentSearchSource,\n        }));\n        renderSearchResults();\n      } else {\n        dom.searchResults.innerHTML =\n          \'<div class="search-placeholder"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>未找到相关歌曲</div>\';\n      }\n    } catch (error) {\n      console.error("Search failed:", error);\n      dom.searchResults.innerHTML =\n        \'<div class="search-placeholder"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>搜索失败，请换个音源试试</div>\';\n    }\n  };\n\n  const renderSearchResults = () => {\n    const sourceLabels = { tencent: "QQ音乐", netease: "网易云", kuwo: "酷我" };\n    dom.searchResults.innerHTML = currentSearchResults\n      .map(\n        (track, index) => `\n            <div class="search-result-item" data-index="${index}">\n                <img src="${\n                  track.coverUrl\n                }" class="search-result-cover" onerror="this.src=\'${DEFAULT_COVER_URL}\'">\n                <div class="search-result-info">\n                    <div class="search-result-title">${track.title}</div>\n                    <div class="search-result-artist">${track.artist}</div>\n                    <div class="search-result-source">${\n                      sourceLabels[track.source] || track.source\n                    }</div>\n                </div>\n                <button class="search-result-more" data-index="${index}" title="更多选项">\n                    <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>\n                </button>\n            </div>\n        `,\n      )\n      .join("");\n  };\n\n  const fetchSongDetails = async (track) => {\n    try {\n      if (window.MusicCache && track.id && track.source) {\n        const audioUrl = window.MusicCache.getAudio(track.id, track.source);\n        const lyricsData = window.MusicCache.getLyrics(track.id, track.source);\n        const coverUrl = window.MusicCache.getCover(track.id, track.source);\n\n        if (audioUrl) {\n          log(`[Player] ✓ fetchSongDetails 缓存命中: ${track.title}`);\n          return {\n            title: track.title,\n            artist: track.artist,\n            coverUrl: coverUrl || track.coverUrl || DEFAULT_COVER_URL,\n            audioUrl: audioUrl,\n            lyricsContent: lyricsData?.content || "",\n            tlyricContent: lyricsData?.tlyric || "",\n            lyricsUrl: "",\n            id: track.id,\n            source: track.source,\n            _fromCache: true,\n          };\n        }\n      }\n\n      log(`[Player] 缓存未命中，获取详情: ${track.title}`);\n\n      const songResponse = await fetch(\n        `/api/plugins/g-player-proxy/song?id=${track.id}&source=${track.source}`,\n      );\n      const songData = await songResponse.json();\n\n      if (songData._needFallback) {\n        warn("需要换源");\n        return null;\n      }\n\n      let audioUrl = "";\n      let lyricsContent = "";\n      let tlyricContent = "";\n\n      if (songData.data) {\n        if (Array.isArray(songData.data)) {\n          audioUrl = songData.data[0]?.url || "";\n          lyricsContent =\n            songData.data[0]?.lrc || songData.data[0]?.lyric || "";\n          tlyricContent = songData.data[0]?.tlyric || "";\n        } else {\n          audioUrl = songData.data.url || "";\n          lyricsContent = songData.data.lrc || songData.data.lyric || "";\n          tlyricContent = songData.data.tlyric || "";\n        }\n      }\n\n      if (!audioUrl) return null;\n\n      if (!lyricsContent || !lyricsContent.startsWith("[")) {\n        try {\n          let lyricUrl = `/api/plugins/g-player-proxy/lyric?id=${track.id}&source=${track.source}`;\n          const lyricTitle = track.originalTitle || track.title;\n          const lyricArtist = track.originalArtist || track.artist;\n          if (lyricTitle)\n            lyricUrl += `&title=${encodeURIComponent(lyricTitle)}`;\n          if (lyricArtist)\n            lyricUrl += `&artist=${encodeURIComponent(lyricArtist)}`;\n          const lyricResponse = await fetch(lyricUrl);\n          const lyricData = await lyricResponse.json();\n          if (lyricData.data) {\n            if (!lyricsContent || !lyricsContent.startsWith("[")) {\n              lyricsContent = lyricData.data.lrc || lyricData.data.lyric || "";\n            }\n            if (!tlyricContent) {\n              tlyricContent = lyricData.data.tlyric || "";\n            }\n          }\n        } catch (e) {\n          warn("歌词获取失败:", e);\n        }\n      }\n\n      if (window.MusicCache && track.id && track.source) {\n        if (audioUrl) {\n          window.MusicCache.setAudio(track.id, track.source, audioUrl);\n          log(`[Player] 已缓存音频URL: ${track.title}`);\n        }\n        if (lyricsContent) {\n          window.MusicCache.setLyrics(\n            track.id,\n            track.source,\n            lyricsContent,\n            tlyricContent || "",\n          );\n          log(`[Player] 已缓存歌词: ${track.title}`);\n        }\n        if (track.coverUrl) {\n          window.MusicCache.setCover(track.id, track.source, track.coverUrl);\n        }\n      }\n\n      return {\n        title: track.title,\n        artist: track.artist,\n        coverUrl: track.coverUrl,\n        audioUrl: audioUrl,\n        lyricsContent: lyricsContent.startsWith("[") ? lyricsContent : "",\n        tlyricContent: tlyricContent,\n        lyricsUrl: "",\n        id: track.id,\n        source: track.source,\n        _fromCache: false,\n      };\n    } catch (error) {\n      console.error("获取歌曲详情失败:", error);\n      return null;\n    }\n  };\n\n  const searchAndPlay = async (\n    title,\n    artist,\n    excludeSource = null,\n    autoPlay = true,\n  ) => {\n    const query = `${title} - ${artist}`;\n    log(\n      `[Player] 搜索并播放: ${query}${\n        excludeSource ? ` (排除: ${excludeSource})` : ""\n      }`,\n    );\n\n    isChangingTrack = true;\n    enterLoadingState();\n    dom.trackTitle.textContent = "正在搜索...";\n    dom.trackArtist.textContent = `${title} - ${artist}`;\n\n    if (excludeSource && window.MusicCache) {\n      const cached = window.MusicCache.getSearch(title, artist);\n      if (cached && cached.source === excludeSource) {\n        log(`[Player] 清除失败源的搜索缓存: ${excludeSource}`);\n        window.MusicCache.invalidateSearch(title, artist);\n      }\n    }\n\n    const allSources = ["tencent", "netease", "kuwo"];\n    const sourceMap = { Netease: "netease", Tencent: "tencent", Kuwo: "kuwo" };\n    const excludeKey = excludeSource\n      ? sourceMap[excludeSource] || excludeSource.toLowerCase()\n      : null;\n\n    if (!excludeSource && window.MusicCache) {\n      const cached = window.MusicCache.getSearch(title, artist);\n      if (cached) {\n        log(`[Player] ✓ 搜索缓存命中: ${title} - ${artist}`);\n        const audioUrl = window.MusicCache.getAudio(cached.id, cached.source);\n        const lyricsData = window.MusicCache.getLyrics(\n          cached.id,\n          cached.source,\n        );\n        const coverUrl = window.MusicCache.getCover(cached.id, cached.source);\n\n        if (audioUrl) {\n          log(`[Player] ✓ 完整缓存命中，直接播放`);\n          const trackData = {\n            id: cached.id,\n            source: cached.source,\n            title: cached.title,\n            artist: cached.artist,\n            coverUrl: coverUrl || cached.coverUrl || "",\n            audioUrl: audioUrl,\n            lyricsContent: lyricsData?.content || "",\n            tlyricContent: lyricsData?.tlyric || "",\n            originalTitle: title,\n            originalArtist: artist,\n            _fromCache: true,\n          };\n          addAndPlayTrack(trackData, autoPlay);\n          return;\n        }\n      }\n    }\n\n    const orderedSources = excludeKey\n      ? [...allSources.filter((s) => s !== excludeKey), excludeKey]\n      : allSources;\n\n    log(`[Player] 搜索顺序: ${orderedSources.join(" → ")}`);\n\n    const sourceLabels = { tencent: "QQ音乐", netease: "网易云", kuwo: "酷我" };\n\n    for (const source of orderedSources) {\n      if (\n        source === excludeKey &&\n        orderedSources.indexOf(source) < orderedSources.length - 1\n      ) {\n        continue;\n      }\n\n      dom.trackArtist.textContent = `正在尝试 ${sourceLabels[source] || source}...`;\n\n      try {\n        const details = await fetchSongDetailsFromSource(title, artist, source);\n        if (details && details.audioUrl) {\n          const duration = await getAudioDurationQuick(details.audioUrl);\n          if (duration !== null && duration <= 35) {\n            log(`[Player] ${source} 是试听版 (${duration.toFixed(1)}s)，跳过`);\n            continue;\n          }\n          log(`[Player] ✓ ${source} 获取成功`);\n          addAndPlayTrack(details, autoPlay);\n          return;\n        }\n      } catch (e) {\n        warn(`[Player] ${source} 失败:`, e.message);\n      }\n    }\n\n    log(`[Player] ❌ 所有音源都失败`);\n    exitLoadingState();\n    isChangingTrack = false;\n    dom.trackTitle.textContent = "搜索失败";\n    dom.trackArtist.textContent = "请换个关键词试试";\n  };\n\n  const addAndPlayTrack = (trackData, autoPlay = true) => {\n    delete trackData._triedSources;\n\n    const existingIndex = currentPlaylist.findIndex((track) => {\n      if (trackData.id && track.id) {\n        return track.id === trackData.id && track.source === trackData.source;\n      }\n      return false;\n    });\n\n    if (existingIndex !== -1) {\n      log(`[Player] 歌曲已在列表中，更新数据并播放`);\n      const merged = {\n        ...currentPlaylist[existingIndex],\n        ...trackData,\n      };\n      delete merged._triedSources;\n      currentPlaylist[existingIndex] = merged;\n      loadTrack(existingIndex, autoPlay);\n    } else {\n      const insertIndex =\n        currentPlaylist.length > 0 ? currentTrackIndex + 1 : 0;\n      currentPlaylist.splice(insertIndex, 0, trackData);\n      log(`[Player] 新歌曲插入到位置 ${insertIndex}`);\n      loadTrack(insertIndex, autoPlay);\n    }\n\n    updatePlaylistUI();\n  };\n\n  const showMoreMenu = (track, isFromSearch = false) => {\n    selectedTrackForMenu = { ...track, isFromSearch };\n    dom.moreMenuCover.src = track.coverUrl || DEFAULT_COVER_URL;\n    dom.moreMenuTitle.textContent = track.title;\n    dom.moreMenuArtist.textContent = track.artist;\n    dom.moreMenu.classList.remove("hidden");\n  };\n\n  const hideMoreMenu = () => {\n    dom.moreMenu.classList.add("hidden");\n    selectedTrackForMenu = null;\n  };\n\n  const deleteTrack = (index) => {\n    if (currentPlaylist.length <= 1) {\n      currentPlaylist = [];\n      pause();\n      dom.trackTitle.textContent = "暂无歌曲";\n      dom.trackArtist.textContent = "...";\n      dom.coverArt.src = DEFAULT_COVER_URL;\n      dom.miniCover.src = DEFAULT_COVER_URL;\n      lrcData = [];\n      dom.lyricsContainer.innerHTML =\n        \'<div class="lyrics-empty">暂无歌词</div>\';\n      updatePlaylistUI();\n      return;\n    }\n\n    const isCurrentTrack = index === currentTrackIndex;\n    const wasPlaying = isPlaying;\n\n    currentPlaylist.splice(index, 1);\n\n    if (isCurrentTrack) {\n      if (currentTrackIndex >= currentPlaylist.length) {\n        currentTrackIndex = 0;\n      }\n      loadTrack(currentTrackIndex, wasPlaying);\n    } else if (index < currentTrackIndex) {\n      currentTrackIndex--;\n    }\n\n    updatePlaylistUI();\n  };\n\n  const clearPlaylist = () => {\n    if (currentPlaylist.length === 0) return;\n\n    pause();\n    currentPlaylist = [];\n    currentTrackIndex = 0;\n    lrcData = [];\n\n    dom.trackTitle.textContent = "暂无歌曲";\n    dom.trackArtist.textContent = "...";\n    dom.coverArt.src = DEFAULT_COVER_URL;\n    dom.miniCover.src = DEFAULT_COVER_URL;\n    dom.lyricsContainer.innerHTML = \'<div class="lyrics-empty">暂无歌词</div>\';\n    dom.progressBar.style.width = "0%";\n    dom.currentTime.textContent = "0:00";\n    dom.duration.textContent = "0:00";\n\n    updatePlaylistUI();\n  };\n\n  const handleMenuAction = async (action) => {\n    if (!selectedTrackForMenu) return;\n    let trackToAdd = selectedTrackForMenu;\n    if (selectedTrackForMenu.isFromSearch) {\n      enterLoadingState();\n      let details = await fetchSongDetails(selectedTrackForMenu);\n      if (!details || !details.audioUrl) {\n        const allSources = ["tencent", "netease", "kuwo"];\n        const otherSources = allSources.filter(\n          (s) => s !== selectedTrackForMenu.source,\n        );\n        for (const source of otherSources) {\n          const result = await fetchSongDetailsFromSource(\n            selectedTrackForMenu.title,\n            selectedTrackForMenu.artist,\n            source,\n          );\n          if (result && result.audioUrl) {\n            details = result;\n            break;\n          }\n        }\n      }\n      exitLoadingState();\n      if (!details) {\n        console.error("无法获取歌曲详情");\n        hideMoreMenu();\n        return;\n      }\n      trackToAdd = details;\n    }\n    switch (action) {\n      case "play-next":\n        const nextIndex = currentTrackIndex + 1;\n        currentPlaylist.splice(nextIndex, 0, trackToAdd);\n        updatePlaylistUI();\n        break;\n      case "add-to-end":\n        currentPlaylist.push(trackToAdd);\n        updatePlaylistUI();\n        break;\n      case "play-now":\n        const insertIndex = currentTrackIndex + 1;\n        currentPlaylist.splice(insertIndex, 0, trackToAdd);\n        loadTrack(insertIndex, true);\n        switchView(dom.mainContent);\n        break;\n    }\n    hideMoreMenu();\n  };\n\n  const init = async () => {\n    setIframeSize(false);\n    const playlistFromCard = await ThemeUtils.getPlaylist();\n    currentPlaylist =\n      playlistFromCard && playlistFromCard.length > 0\n        ? playlistFromCard\n        : DEFAULT_PLAYLIST;\n    await loadTrack(0, false);\n  };\n\n  dom.miniView.addEventListener("click", expandPlayer);\n  dom.collapseBtn.addEventListener("click", collapsePlayer);\n  dom.playlistBtn.addEventListener("click", () =>\n    switchView(dom.playlistContent),\n  );\n  dom.playlistCloseBtn.addEventListener("click", () =>\n    switchView(dom.mainContent),\n  );\n  dom.coverArtWrapper.addEventListener("click", () =>\n    switchView(dom.lyricsContent),\n  );\n  dom.lyricsBackBtn.addEventListener("click", () =>\n    switchView(dom.mainContent),\n  );\n  dom.playPauseBtn.addEventListener("click", () =>\n    isPlaying ? pause() : play(),\n  );\n  dom.nextBtn.addEventListener("click", playNextTrack);\n  dom.prevBtn.addEventListener("click", playPrevTrack);\n  dom.shuffleBtn.addEventListener("click", () => {\n    playMode = playMode === "shuffle" ? "normal" : "shuffle";\n    dom.shuffleBtn.classList.toggle("active", playMode === "shuffle");\n    dom.repeatBtn.classList.remove("active");\n    dom.repeatAllIcon.style.display = "block";\n    dom.repeatOneIcon.style.display = "none";\n  });\n  dom.playlistClearBtn.addEventListener("click", () => {\n    if (currentPlaylist.length === 0) return;\n    dom.confirmDialog.classList.remove("hidden");\n  });\n\n  dom.confirmCancel.addEventListener("click", () => {\n    dom.confirmDialog.classList.add("hidden");\n  });\n\n  dom.confirmOk.addEventListener("click", () => {\n    dom.confirmDialog.classList.add("hidden");\n    clearPlaylist();\n  });\n\n  dom.repeatBtn.addEventListener("click", () => {\n    if (playMode === "normal" || playMode === "shuffle") {\n      playMode = "repeat-all";\n    } else if (playMode === "repeat-all") {\n      playMode = "repeat-one";\n    } else {\n      playMode = "normal";\n    }\n    dom.repeatBtn.classList.toggle(\n      "active",\n      playMode === "repeat-all" || playMode === "repeat-one",\n    );\n    dom.shuffleBtn.classList.remove("active");\n    dom.repeatAllIcon.style.display =\n      playMode === "repeat-one" ? "none" : "block";\n    dom.repeatOneIcon.style.display =\n      playMode === "repeat-one" ? "block" : "none";\n  });\n\n  dom.audioPlayer.addEventListener("timeupdate", () => {\n    updateProgress();\n    updateActiveLyrics();\n    const track = currentPlaylist[currentTrackIndex];\n    if (track && isPlaying) {\n      const ct = dom.audioPlayer.currentTime || 0;\n      const duration = dom.audioPlayer.duration || 0;\n      ThemeUtils.sendMessage("playback-progress", {\n        currentTrack: {\n          title: track.title,\n          artist: track.artist,\n          originalTitle: track.originalTitle || track.title,\n          originalArtist: track.originalArtist || track.artist,\n        },\n        progress: duration > 0 ? (ct / duration) * 100 : 0,\n        currentTime: formatTime(ct),\n        duration: formatTime(duration),\n        currentTimeRaw: ct,\n      });\n    }\n  });\n\n  dom.audioPlayer.addEventListener("loadedmetadata", () => {\n    if (isChangingTrack) return;\n\n    const duration = dom.audioPlayer.duration;\n    log(`[Player] 音频元数据加载，时长: ${duration.toFixed(1)} 秒`);\n\n    dom.duration.textContent = formatTime(duration);\n\n    if (duration > 0 && duration <= 35) {\n      log(`[Player] ⚠️ 检测到试听版 (${duration.toFixed(1)}s)，将自动换源...`);\n\n      const wantAutoPlay = shouldAutoPlay;\n      dom.audioPlayer.pause();\n      dom.audioPlayer.src = "";\n      shouldAutoPlay = false;\n\n      const track = currentPlaylist[currentTrackIndex];\n      if (!track) return;\n\n      const failedSource = track.source;\n      const title = track.originalTitle || track.title || track.name;\n      const artist = track.originalArtist || track.artist;\n\n      log(`[Player] 换源搜索启动: ${title} - ${artist}，排除: ${failedSource}`);\n      searchAndPlay(title, artist, failedSource, wantAutoPlay);\n      return;\n    }\n\n    const track = currentPlaylist[currentTrackIndex];\n    if (track && !track._fromCache) {\n      sendCacheWriteback(track);\n    }\n\n    exitLoadingState();\n    if (shouldAutoPlay) {\n      shouldAutoPlay = false;\n      play();\n    }\n  });\n\n  dom.audioPlayer.addEventListener("ended", playNextTrack);\n  dom.audioPlayer.addEventListener("waiting", () => {\n    enterLoadingState();\n    startLoadingTimeout();\n  });\n\n  dom.audioPlayer.addEventListener("canplay", () => {\n    exitLoadingState();\n    clearLoadingTimeout();\n  });\n\n  dom.audioPlayer.addEventListener("playing", () => {\n    exitLoadingState();\n    clearLoadingTimeout();\n    startProgressCheck();\n  });\n\n  dom.audioPlayer.addEventListener("pause", stopProgressCheck);\n\n  dom.audioPlayer.addEventListener("stalled", () => {\n    setTimeout(() => {\n      if (dom.audioPlayer.readyState < 3 && !dom.audioPlayer.paused) {\n        const currentTime = dom.audioPlayer.currentTime;\n        dom.audioPlayer.load();\n        dom.audioPlayer.currentTime = currentTime;\n        dom.audioPlayer.play().catch(() => {});\n      }\n    }, 3000);\n  });\n\n  dom.audioPlayer.addEventListener("suspend", () => {\n    if (isPlaying && dom.audioPlayer.paused) {\n      dom.audioPlayer.play().catch(() => {});\n    }\n  });\n\n  window.addEventListener("online", () => {\n    if (dom.container.classList.contains("loading") && isPlaying) {\n      const currentTime = dom.audioPlayer.currentTime;\n      dom.audioPlayer.load();\n      dom.audioPlayer.currentTime = currentTime;\n      dom.audioPlayer.play().catch(() => {});\n    }\n  });\n\n  dom.audioPlayer.addEventListener("error", async (e) => {\n    if (isUpdatingPlaylist || isChangingTrack) {\n      log("[Player] 歌单更新中或换源中，忽略此错误");\n      return;\n    }\n    console.error("[Player] 音频播放错误:", e);\n    exitLoadingState();\n    const wasPlaying = isPlaying || shouldAutoPlay;\n    const track = currentPlaylist[currentTrackIndex];\n\n    if (track && track.id && track.source && !track._refreshed) {\n      warn("[Player] 音频链接可能已失效，正在尝试重新获取...");\n      isChangingTrack = true;\n      enterLoadingState();\n      dom.trackTitle.textContent = "链接已过期";\n      dom.trackArtist.textContent = "正在重新获取...";\n\n      track._refreshed = true;\n      currentPlaylist[currentTrackIndex] = track;\n\n      if (window.MusicCache) {\n        window.MusicCache.invalidateAudio(track.id, track.source);\n        log("[Player] 已清除过期音频缓存");\n      }\n\n      const details = await fetchSongDetails(track);\n\n      if (details && details.audioUrl) {\n        log("[Player] ✓ 成功获取新的音频URL，将重新加载。");\n        details._fromCache = false;\n        details._refreshed = true;\n        currentPlaylist[currentTrackIndex] = details;\n        ThemeUtils.sendMessage("update-audio-cache", {\n          id: details.id,\n          source: details.source,\n          audioUrl: details.audioUrl,\n        });\n        log("[Player] 已通知主插件更新音频缓存");\n        isChangingTrack = false;\n        loadTrack(currentTrackIndex, wasPlaying);\n      } else {\n        log("[Player] 重新获取URL失败，尝试换源搜索...");\n        dom.trackTitle.textContent = "正在换源...";\n        dom.trackArtist.textContent = `${track.originalTitle || track.title} - ${track.originalArtist || track.artist}`;\n\n        const title = track.originalTitle || track.title;\n        const artist = track.originalArtist || track.artist;\n        currentPlaylist.splice(currentTrackIndex, 1);\n        updatePlaylistUI();\n        await searchAndPlay(title, artist, null, wasPlaying);\n      }\n      return;\n    }\n\n    if (track && !track._refreshed && (track.title || track.name)) {\n      track._refreshed = true;\n      currentPlaylist[currentTrackIndex] = track;\n\n      const title = track.originalTitle || track.title || track.name;\n      const artist = track.originalArtist || track.artist || "";\n\n      log(`[Player] 外部链接失效，尝试搜索: ${title} - ${artist}`);\n      await searchAndPlay(title, artist, null, wasPlaying);\n      return;\n    }\n\n    log("[Player] 无法自动刷新URL，将尝试播放下一首。");\n    isChangingTrack = false;\n    dom.trackTitle.textContent = "播放失败";\n    dom.trackArtist.textContent = "即将播放下一首...";\n    if (wasPlaying) setTimeout(playNextTrack, 1500);\n  });\n\n  dom.progressBarWrapper.addEventListener("click", (e) => {\n    const rect = dom.progressBarWrapper.getBoundingClientRect();\n    const clickX = e.clientX - rect.left;\n    if (dom.audioPlayer.duration) {\n      dom.audioPlayer.currentTime =\n        (clickX / rect.width) * dom.audioPlayer.duration;\n    }\n  });\n\n  dom.playlistList.addEventListener("click", (e) => {\n    const deleteBtn = e.target.closest(".playlist-delete-btn");\n    if (deleteBtn) {\n      e.stopPropagation();\n      const index = parseInt(deleteBtn.dataset.index, 10);\n      deleteTrack(index);\n      return;\n    }\n\n    const moreBtn = e.target.closest(".playlist-more-btn");\n    if (moreBtn) {\n      e.stopPropagation();\n      const index = parseInt(moreBtn.dataset.index, 10);\n      const track = currentPlaylist[index];\n      showMoreMenu(track, false);\n      return;\n    }\n\n    const li = e.target.closest("li");\n    if (li) {\n      const index = parseInt(li.dataset.index, 10);\n      loadTrack(index, true);\n      switchView(dom.mainContent);\n    }\n  });\n\n  dom.searchBtn.addEventListener("click", () => switchView(dom.searchContent));\n  dom.searchBackBtn.addEventListener("click", () =>\n    switchView(dom.mainContent),\n  );\n  dom.searchSubmitBtn.addEventListener("click", () =>\n    performSearch(dom.searchInput.value),\n  );\n  dom.searchInput.addEventListener("keypress", (e) => {\n    if (e.key === "Enter") performSearch(dom.searchInput.value);\n  });\n\n  dom.sourceTabs.forEach((tab) => {\n    tab.addEventListener("click", () => {\n      dom.sourceTabs.forEach((t) => t.classList.remove("active"));\n      tab.classList.add("active");\n      currentSearchSource = tab.dataset.source;\n      if (dom.searchInput.value.trim()) performSearch(dom.searchInput.value);\n    });\n  });\n\n  dom.searchResults.addEventListener("click", async (e) => {\n    const moreBtn = e.target.closest(".search-result-more");\n    if (moreBtn) {\n      e.stopPropagation();\n      const index = parseInt(moreBtn.dataset.index, 10);\n      const track = currentSearchResults[index];\n      showMoreMenu(track, true);\n      return;\n    }\n    const item = e.target.closest(".search-result-item");\n    if (item) {\n      const index = parseInt(item.dataset.index, 10);\n      const track = currentSearchResults[index];\n      switchView(dom.mainContent);\n      dom.trackTitle.textContent = track.title;\n      dom.trackArtist.textContent = track.artist;\n      dom.coverArt.src = track.coverUrl || DEFAULT_COVER_URL;\n      dom.miniCover.src = track.coverUrl || DEFAULT_COVER_URL;\n      isChangingTrack = true;\n      enterLoadingState();\n\n      let details = await fetchSongDetails(track);\n\n      if (details && details.audioUrl) {\n        const duration = await getAudioDurationQuick(details.audioUrl);\n        if (duration !== null && duration <= 35) {\n          log(`[Player] ${track.source} 是试听版，尝试换源...`);\n          details = null;\n        }\n      }\n\n      if (!details || !details.audioUrl) {\n        log(`[Player] ${track.source} 源失败或是试听版，尝试换源...`);\n        const allSources = ["tencent", "netease", "kuwo"];\n        const otherSources = allSources.filter((s) => s !== track.source);\n\n        for (const source of otherSources) {\n          dom.trackArtist.textContent = `正在尝试 ${source}...`;\n          const result = await fetchSongDetailsFromSource(\n            track.title,\n            track.artist,\n            source,\n          );\n          if (result && result.audioUrl) {\n            const dur = await getAudioDurationQuick(result.audioUrl);\n            if (dur !== null && dur <= 35) {\n              log(`[Player] ${source} 也是试听版，跳过`);\n              continue;\n            }\n            log(`[Player] ✓ 换源成功: ${source}`);\n            details = result;\n            break;\n          }\n        }\n      }\n\n      isChangingTrack = false;\n\n      if (details && details.audioUrl) {\n        let insertIndex;\n        if (currentPlaylist.length === 0) {\n          insertIndex = 0;\n          currentPlaylist.push(details);\n        } else {\n          insertIndex = currentTrackIndex + 1;\n          currentPlaylist.splice(insertIndex, 0, details);\n        }\n        log(`[Player] 搜索结果插入到位置 ${insertIndex}，准备播放`);\n        await loadTrack(insertIndex, true);\n      } else {\n        exitLoadingState();\n        dom.trackTitle.textContent = "所有音源都失败";\n        dom.trackArtist.textContent = "请换个歌曲试试";\n      }\n    }\n  });\n\n  dom.moreMenuBackdrop.addEventListener("click", hideMoreMenu);\n  dom.moreMenuOptions.forEach((option) => {\n    option.addEventListener("click", () =>\n      handleMenuAction(option.dataset.action),\n    );\n  });\n\n  window.addEventListener("message", (event) => {\n    if (event.data?.source !== "typing-indicator-host") return;\n    const { type, data } = event.data;\n    switch (type) {\n      case "update-playlist":\n        const newPlaylist = data;\n        log("[Player Theme] Received new playlist.", newPlaylist);\n        const playlistToLoad =\n          newPlaylist && Array.isArray(newPlaylist) && newPlaylist.length > 0\n            ? newPlaylist\n            : DEFAULT_PLAYLIST;\n        if (JSON.stringify(currentPlaylist) === JSON.stringify(playlistToLoad))\n          return;\n        currentPlaylist = playlistToLoad;\n        updatePlaylistUI();\n        if (currentPlaylist.length > 0) {\n          const wasPlaying = isPlaying;\n          loadTrack(0, wasPlaying);\n        } else {\n          pause();\n          dom.trackTitle.textContent = "暂无歌曲";\n          dom.trackArtist.textContent = "...";\n          dom.coverArt.src = DEFAULT_COVER_URL;\n          dom.miniCover.src = DEFAULT_COVER_URL;\n        }\n        break;\n\n      case "play-now":\n        if (data) {\n          const dataArtist = Array.isArray(data.artist)\n            ? data.artist.join(" / ")\n            : data.artist || "";\n\n          const existingIndex = currentPlaylist.findIndex((track) => {\n            if (data.id && track.id) {\n              return track.id === data.id && track.source === data.source;\n            }\n            const normalizeStr = (s) =>\n              (s || "")\n                .toLowerCase()\n                .replace(/\\s+/g, "")\n                .replace(/[^\\w\\u4e00-\\u9fa5]/g, "");\n            const titleMatch =\n              normalizeStr(track.title) ===\n              normalizeStr(data.title || data.name);\n            const artistMatch =\n              normalizeStr(track.artist).includes(normalizeStr(dataArtist)) ||\n              normalizeStr(dataArtist).includes(normalizeStr(track.artist));\n            return titleMatch && artistMatch;\n          });\n\n          if (existingIndex !== -1) {\n            log("[Player] play-now: 歌曲已存在，更新数据并播放");\n            const existingTrack = currentPlaylist[existingIndex];\n            if (data.audioUrl) existingTrack.audioUrl = data.audioUrl;\n            if (data.lyricsContent)\n              existingTrack.lyricsContent = data.lyricsContent;\n            if (data.tlyricContent)\n              existingTrack.tlyricContent = data.tlyricContent;\n            if (data.coverUrl) existingTrack.coverUrl = data.coverUrl;\n            existingTrack._fromCache = true;\n            existingTrack._refreshed = false;\n            currentPlaylist[existingIndex] = existingTrack;\n            loadTrack(existingIndex, true);\n          } else {\n            const trackData = {\n              title: data.title || data.name || "未知歌曲",\n              artist: dataArtist || "未知艺术家",\n              audioUrl: data.audioUrl || "",\n              lyricsUrl: data.lyricsUrl || "",\n              lyricsContent: data.lyricsContent || "",\n              tlyricContent: data.tlyricContent || "",\n              coverUrl: data.coverUrl || DEFAULT_COVER_URL,\n              id: data.id || null,\n              source: data.source || null,\n              originalTitle: data.originalTitle || null,\n              originalArtist: data.originalArtist || null,\n              _fromCache: true,\n              _refreshed: false,\n            };\n            const insertIndex =\n              currentPlaylist.length > 0 ? currentTrackIndex + 1 : 0;\n            currentPlaylist.splice(insertIndex, 0, trackData);\n            loadTrack(insertIndex, true);\n            log("[Player] play-now: 添加新歌曲并播放");\n          }\n          updatePlaylistUI();\n        }\n        break;\n\n      case "set-initial-playlist":\n      case "context-update":\n        if (data.playlist) {\n          isUpdatingPlaylist = true;\n          const newPlaylist = data.playlist.map((song) => ({\n            title: song.title || song.name || song.song || "未知歌曲",\n            artist: Array.isArray(song.artist)\n              ? song.artist.join(" / ")\n              : song.artist || song.singer || "未知艺术家",\n            audioUrl: song.audioUrl || song.url || "",\n            lyricsUrl: song.lyricsUrl || song.lrc || "",\n            lyricsContent: song.lyricsContent || "",\n            tlyricContent: song.tlyricContent || "",\n            coverUrl:\n              song.coverUrl || song.cover || song.pic || DEFAULT_COVER_URL,\n            id: song.id || null,\n            source: song.source || null,\n            sourceMessageId: song.sourceMessageId || null,\n            originalTitle: song.originalTitle || null,\n            originalArtist: song.originalArtist || null,\n            _fromCache: song._fromCache || false,\n          }));\n          if (JSON.stringify(currentPlaylist) !== JSON.stringify(newPlaylist)) {\n            currentPlaylist = newPlaylist;\n            updatePlaylistUI();\n            if (currentPlaylist.length > 0 && !isPlaying) {\n              loadTrack(0, false);\n            }\n          }\n          setTimeout(() => {\n            isUpdatingPlaylist = false;\n          }, 500);\n        }\n        break;\n\n      case "append-songs-to-playlist":\n        if (Array.isArray(data) && data.length > 0) {\n          const newSongs = data.map((song) => ({\n            title: song.title || song.name || "未知歌曲",\n            artist: Array.isArray(song.artist)\n              ? song.artist.join(" / ")\n              : song.artist || "未知艺术家",\n            audioUrl: song.audioUrl || "",\n            lyricsUrl: song.lyricsUrl || "",\n            lyricsContent: song.lyricsContent || "",\n            tlyricContent: song.tlyricContent || "",\n            coverUrl: song.coverUrl || DEFAULT_COVER_URL,\n            id: song.id || null,\n            source: song.source || null,\n            sourceMessageId: song.sourceMessageId || null,\n            originalTitle: song.originalTitle || null,\n            originalArtist: song.originalArtist || null,\n            _fromCache: song._fromCache || false,\n          }));\n          currentPlaylist.push(...newSongs);\n          updatePlaylistUI();\n          if (!isPlaying && currentPlaylist.length === newSongs.length) {\n            loadTrack(0, false);\n          }\n        }\n        break;\n\n      case "update-songs-from-message":\n        if (data && data.messageId !== undefined) {\n          isUpdatingPlaylist = true;\n          currentPlaylist = currentPlaylist.filter(\n            (track) => track.sourceMessageId !== data.messageId,\n          );\n          if (data.songs && data.songs.length > 0) {\n            const updatedSongs = data.songs.map((song) => ({\n              title: song.title || song.name || "未知歌曲",\n              artist: Array.isArray(song.artist)\n                ? song.artist.join(" / ")\n                : song.artist || "未知艺术家",\n              audioUrl: song.audioUrl || "",\n              lyricsUrl: song.lyricsUrl || "",\n              lyricsContent: song.lyricsContent || "",\n              tlyricContent: song.tlyricContent || "",\n              coverUrl: song.coverUrl || DEFAULT_COVER_URL,\n              id: song.id || null,\n              source: song.source || null,\n              sourceMessageId: data.messageId,\n              originalTitle: song.originalTitle || null,\n              originalArtist: song.originalArtist || null,\n              _fromCache: song._fromCache || false,\n            }));\n            currentPlaylist.push(...updatedSongs);\n          }\n          updatePlaylistUI();\n          setTimeout(() => {\n            isUpdatingPlaylist = false;\n          }, 500);\n        }\n        break;\n\n      case "play-by-info":\n        if (data && data.title && data.artist) {\n          searchAndPlay(data.title, data.artist, null, true);\n        }\n        break;\n\n      case "toggle-playback":\n        if (isPlaying) {\n          pause();\n        } else {\n          play();\n        }\n        break;\n\n      case "graceful-shutdown-request":\n        dom.audioPlayer.pause();\n        ThemeUtils.sendMessage("graceful-shutdown-response");\n        break;\n    }\n  });\n\n  init();\n  if (typeof ThemeUtils !== "undefined") {\n    ThemeUtils.sendMessage("player-initialized");\n  }\n});\n\nwindow.addEventListener("message", (event) => {\n  if (\n    event.data?.source === "typing-indicator-host" &&\n    event.data?.type === "graceful-shutdown-request"\n  ) {\n    const audioPlayer = ThemeUtils.$("#audio-player");\n    if (audioPlayer) audioPlayer.pause();\n  }\n});',
    sizes: {
      floating_bottom: {
        width: "70px",
        height: "70px",
      },
      chat_center: {
        width: "70px",
        height: "70px",
      },
      draggable: {
        width: "70px",
        height: "70px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "Out_of_control_channel",
    name: "播放器-失控频道",
    useIframe: true,
    html: '<div id="gmp-container" class="gmp-container">\n    <div id="gmp-dynamic-bg" class="gmp-dynamic-bg"></div>\n    <div class="gmp-noise-overlay"></div>\n    <div id="gmp-grid-overlay" class="gmp-grid-overlay"></div>\n\n    <div id="gmp-loader" class="gmp-loader">\n        <div class="gmp-loader-text">LOADING...</div>\n    </div>\n\n    <div id="gmp-collapsed-view" class="gmp-view">\n        <div class="gmp-retro-window">\n            <div class="gmp-retro-title-bar">\n                <div class="gmp-retro-title-wrapper">\n                    <span id="gmp-retro-char-name">♡․․․⚝ 夢の回線․․․</span>\n                </div>\n                <div class="gmp-retro-controls">\n                    <div class="gmp-retro-btn"></div>\n                    <div class="gmp-retro-btn"></div>\n                    <div class="gmp-retro-btn close"></div>\n                </div>\n            </div>\n            <div class="gmp-retro-content">\n                <div class="gmp-avatar-wrapper">\n                    <img id="gmp-collapsed-avatar" src="" alt="avatar" />\n                    <canvas id="gmp-visualizer-canvas"></canvas>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div id="gmp-expanded-view" class="gmp-view hidden">\n        <div id="gmp-bubble-container"></div>\n        <div class="gmp-window-title-bar">\n            <div class="gmp-window-title">こちらのセカイの音ですか？</div>\n            <div class="gmp-window-controls">\n                <button id="gmp-search-btn" class="gmp-window-btn" title="Search Music">\n                    <svg viewBox="0 0 16 16" style="width: 12px; height: 12px; fill: currentColor;"><path d="M6,1c-2.8,0-5,2.2-5,5s2.2,5,5,5c1.4,0,2.6-0.5,3.5-1.4l3.1,3.1l1.4-1.4L10.9,8.2 C11.6,7.3,12,6.2,12,5C12,2.2,9.8,1,7,1z M7,2c2.2,0,4,1.8,4,4s-1.8,4-4,4S3,8.2,3,6S4.8,2,7,2z" /></svg>\n                </button>\n                <button id="gmp-collapse-btn" class="gmp-window-btn gmp-window-btn-close">×</button>\n            </div>\n        </div>\n        <div class="gmp-window-content">\n            <div id="gmp-player-content" class="gmp-content-wrapper">\n                <div class="gmp-main-content">\n                    <div id="gmp-album-art-wrapper" class="gmp-album-art-wrapper">\n                        <img id="gmp-album-art" src="https://i.postimg.cc/8zQsfgMv/cb5972985b4893db3ce9ce638dd8f5aa.jpg" alt="Album Art">\n                    </div>\n                    <div class="gmp-track-info">\n                        <div id="gmp-title" class="gmp-title">♡°ஂ...電波受信中...𓈒𓏸˚₊</div>\n                        <div id="gmp-artist" class="gmp-artist">...ノイズ...</div>\n                        <div id="gmp-main-lyrics-display" class="gmp-main-lyrics-display">\n                            <span id="gmp-main-lyric-line1">...</span>\n                            <span id="gmp-main-lyric-line2">...</span>\n                        </div>\n                    </div>\n                </div>\n                <div class="gmp-progress-wrapper">\n                     <div class="gmp-time-display" id="gmp-current-time">00:00</div>\n                     <div class="gmp-progress-bar-outer">\n                        <input type="range" id="gmp-progress-bar" class="gmp-progress-bar" value="0" min="0" max="100" step="1">\n                        <div id="gmp-buffer-fill" class="gmp-buffer-fill"></div>\n                        <div id="gmp-progress-fill" class="gmp-progress-fill"></div>\n                     </div>\n                </div>\n                <div class="gmp-controls-wrapper">\n                    <button id="gmp-mode-btn" class="gmp-control-btn secondary" title="播放模式"><svg id="icon-mode-loop" viewBox="0 0 16 16"><path d="M12,3V0l4,4l-4,4V5H5v3H3V5C3,3.9,3.9,3,5,3H12z M4,13v3l-4-4l4-4v3h7v-3h2v3C14,12.1,13.1,13,12,13H4z"/></svg><svg id="icon-mode-single" style="display:none;" viewBox="0 0 16 16"><path d="M12,3V0l4,4l-4,4V5H5v3H3V5C3,3.9,3.9,3,5,3H12z M4,13v3l-4-4l4-4v3h7v-3h2v3c0,1.1-0.9,2-2,2H4z M8,7h2v5H8V7z M9,8v1h1V8H9z"/></svg><svg id="icon-mode-shuffle" style="display:none;" viewBox="0 0 16 16"><path d="M1,4l3,3L1,10V4z M5,4l3,3L5,10V4z M10,4v6l3-3L10,4z M1,12h14v2H1V12z"/></svg></button>\n                    <button id="gmp-prev-btn" class="gmp-control-btn"><svg viewBox="0 0 16 16"><path d="M4,2H2v12h2V2z M13,2L6,8l7,6V2z"/></svg></button>\n                    <button id="gmp-play-pause-btn" class="gmp-control-btn main">\n                        <svg class="gmp-play-icon" viewBox="0 0 16 16"><path d="M3,2l10,6L3,14V2z"/></svg>\n                        <svg class="gmp-pause-icon" viewBox="0 0 16 16"><path d="M3,2h4v12H3V2z M9,2h4v12H9V2z"/></svg>\n                        <svg class="gmp-buffering-icon" viewBox="0 0 16 16"><path d="M8,1A7,7,0,1,0,15,8,7,7,0,0,0,8,1Zm0,12A5,5,0,1,1,13,8,5,5,0,0,1,8,13Z" opacity="0.3"/><path d="M8,1V3a5,5,0,0,1,5,5h2A7,7,0,0,0,8,1Z"/></svg>\n                    </button>\n                    <button id="gmp-next-btn" class="gmp-control-btn"><svg viewBox="0 0 16 16"><path d="M12,2h2v12h-2V2z M3,2l7,6l-7,6V2z"/></svg></button>\n                    <button id="gmp-playlist-btn" class="gmp-control-btn secondary" title="播放列表"><svg viewBox="0 0 16 16"><path d="M2,4h2V2H2V4z M6,3h8v2H6V3z M2,9h2V7H2V9z M6,8h8v2H6V8z M2,14h2v-2H2V14z M6,13h8v2H6V13z"/></svg></button>\n                </div>\n            </div>\n\n            <div id="gmp-search-content" class="gmp-content-wrapper hidden">\n                 <div class="gmp-view-header">\n                    <button id="gmp-search-back-btn" class="gmp-icon-btn"><svg viewBox="0 0 16 16"><path d="M10,13l-6-5l6-5v10z"/></svg></button>\n                    <div class="gmp-search-input-wrapper"><input type="text" id="gmp-search-input" placeholder="検索曲詞中..." autocomplete="off"><button id="gmp-search-clear-btn" class="gmp-icon-btn gmp-search-clear-btn" style="display: none;"><svg viewBox="0 0 16 16"><path d="M3.1,1.7L1.7,3.1L6.6,8l-4.9,4.9l1.4,1.4L8,9.4l4.9,4.9l1.4-1.4L9.4,8l4.9-4.9L12.9,1.7L8,6.6L3.1,1.7z"/></svg></button></div>\n                    <button id="gmp-search-submit-btn" class="gmp-icon-btn gmp-search-submit-btn"><svg viewBox="0 0 16 16"><path d="M6,1c-2.8,0-5,2.2-5,5s2.2,5,5,5c1.4,0,2.6-0.5,3.5-1.4l3.1,3.1l1.4-1.4L10.9,8.2 C11.6,7.3,12,6.2,12,5C12,2.2,9.8,1,7,1z M7,2c2.2,0,4,1.8,4,4s-1.8,4-4,4S3,8.2,3,6S4.8,2,7,2z"/></svg></button>\n                </div>\n                <div id="gmp-search-results" class="gmp-scroll-list"></div>\n            </div>\n\n            <div id="gmp-lyrics-content" class="gmp-content-wrapper hidden">\n                <div class="gmp-view-header">\n                    <button id="gmp-lyrics-back-btn" class="gmp-icon-btn"><svg viewBox="0 0 16 16"><path d="M10,13l-6-5l6-5v10z"/></svg></button>\n                    <div class="gmp-top-title">夢の回線</div>\n                    <div style="width: 36px;"></div>\n                </div>\n                <div id="gmp-lyrics-container" class="gmp-lyrics-container"></div>\n            </div>\n\n            <div id="gmp-playlist-content" class="gmp-content-wrapper hidden">\n                <div class="gmp-view-header">\n                    <button id="gmp-playlist-back-btn" class="gmp-icon-btn"><svg viewBox="0 0 16 16"><path d="M10,13l-6-5l6-5v10z"/></svg></button>\n                    <div class="gmp-top-title">軌道上の音波...</div>\n                    <button id="gmp-playlist-clear-btn" class="gmp-icon-btn" title="清空队列"><svg viewBox="0 0 16 16"><path d="M2,5H14V3H10L9,2H7L6,3H2V5z M3,6V13c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V6H3z"/></svg></button>\n                </div>\n                <div id="gmp-playlist-container" class="gmp-scroll-list"></div>\n            </div>\n        </div>\n    </div>\n\n    <audio id="gmp-audio-player" crossorigin="anonymous"></audio>\n</div>',
    iframeCSS:
      "@import url(\"https://fontsapi.zeoseven.com/111/main/result.css\");\n\n:root {\n    --vw-font: \"点点像素体-圆形\", sans-serif;\n    --vw-bg-color: rgba(24, 21, 53, 0.85);\n    --vw-window-bg: #e3e3ff;\n    --vw-text-primary: #181535;\n    --vw-text-secondary: rgba(24, 21, 53, 0.6);\n    --vw-accent-pink: #f4c2f4;\n    --vw-accent-blue: #a3abff;\n    --vw-border-dark: #181535;\n    --vw-border-light: #ffffff;\n    --vw-transition: 0.2s ease-out;\n}\n\n* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n\nbody { background-color: transparent; font-family: var(--vw-font); font-weight: normal; color: var(--vw-text-primary); overflow: hidden; user-select: none; image-rendering: pixelated; }\ninput, textarea { user-select: auto; font-family: var(--vw-font); }\n\n.gmp-container { width: 100%; height: 100%; position: relative; overflow: hidden; background: transparent; transition: all 0.4s ease; will-change: border-radius; }\n.gmp-container.expanded { border-radius: 0; }\n\n.gmp-dynamic-bg, .gmp-noise-overlay, .gmp-grid-overlay { position: absolute; inset: 0; z-index: -1; pointer-events: none; }\n.gmp-dynamic-bg { top: -25%; left: -25%; width: 150%; height: 150%; background-color: #181535; background-image: var(--gmp-bg-image, none); background-size: cover; background-position: center; filter: blur(25px) brightness(0.7); opacity: 1; transition: background-image 0.8s ease; will-change: background-image; z-index: -3; }\n.gmp-noise-overlay { opacity: 0.05; background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\"); z-index: -2; }\n.gmp-grid-overlay { background-image: linear-gradient(rgba(163, 171, 255, 0.2) 1px, transparent 1px), linear-gradient(to right, rgba(163, 171, 255, 0.2) 1px, transparent 1px); background-size: 20px 20px; opacity: 0; transition: opacity var(--vw-transition); }\n.gmp-container.expanded .gmp-grid-overlay { opacity: 1; }\n\n.gmp-view { position: absolute; inset: 0; transition: opacity var(--vw-transition), transform var(--vw-transition); }\n.gmp-view.hidden { opacity: 0; pointer-events: none; transform: scale(0.95); }\n\n#gmp-expanded-view { background: var(--vw-window-bg); box-shadow: inset 0 0 0 4px var(--vw-accent-blue), inset 0 0 0 8px var(--vw-border-dark); display: flex; flex-direction: column; }\n\n.gmp-window-title-bar { display: flex; justify-content: space-between; align-items: center; background: var(--vw-accent-blue); color: var(--vw-border-light); padding: 4px; border-bottom: 4px solid var(--vw-border-dark); flex-shrink: 0; z-index: 2; }\n.gmp-window-title { font-weight: 700; font-size: 14px; text-shadow: 2px 2px 0 var(--vw-border-dark); }\n.gmp-window-controls { display: flex; gap: 4px; }\n.gmp-window-btn { width: 22px; height: 22px; background: #d8d9ff; border: 2px solid var(--vw-border-dark); box-shadow: inset 2px 2px 0 var(--vw-border-light); font-family: sans-serif; font-size: 14px; line-height: 18px; color: var(--vw-border-dark); cursor: pointer; display: flex; align-items: center; justify-content: center; }\n.gmp-window-btn:active { box-shadow: inset -2px -2px 0 var(--vw-border-light); }\n\n.gmp-window-content { padding: 12px; flex-grow: 1; min-height: 0; position: relative; display: flex; flex-direction: column; }\n.gmp-window-content::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; background-image: radial-gradient(circle at center, transparent 40%, rgba(24, 21, 53, 0.1) 100%), url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(#n)\" opacity=\"0.15\"/></svg>'); background-size: auto, 80px; animation: gmp-noise-flicker 0.2s infinite; z-index: 1; }\n@keyframes gmp-noise-flicker { 0% { transform: translate(0, 0); } 20% { transform: translate(-1px, 1px); } 40% { transform: translate(1px, -1px); } 60% { transform: translate(-2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0, 0); } }\n\n.gmp-content-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; z-index: 2; }\n.gmp-content-wrapper.hidden { display: none; }\n\n#gmp-collapsed-view { display: flex; align-items: center; justify-content: center; padding: 4px; }\n.gmp-retro-window { width: 100%; height: 100%; background: var(--vw-window-bg); box-shadow: 2px 2px 0 var(--vw-border-dark), inset 2px 2px 0 var(--vw-border-light), inset -2px -2px 0 var(--vw-text-secondary); border: 2px solid var(--vw-border-dark); display: flex; flex-direction: column; }\n.gmp-retro-title-bar { display: flex; justify-content: space-between; align-items: center; background: var(--vw-accent-blue); color: var(--vw-border-light); padding: 2px 4px; flex-shrink: 0; transition: all var(--vw-transition); border-bottom: 2px solid var(--vw-border-dark); }\n.gmp-container.playing .gmp-retro-title-bar { animation: gmp-title-pulse 2s infinite; }\n.gmp-retro-title-wrapper { flex: 1; overflow: hidden; white-space: nowrap; }\n#gmp-retro-char-name { display: inline-block; font-size: 12px; text-shadow: 1px 1px 0 var(--vw-border-dark); padding-left: 100%; animation: gmp-marquee 10s linear infinite; }\n@keyframes gmp-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }\n.gmp-container:not(.playing) #gmp-retro-char-name { animation: none; padding-left: 0; transform: translateX(0); }\n.gmp-retro-controls { display: flex; gap: 2px; }\n.gmp-retro-btn { width: 10px; height: 10px; border: 1px solid var(--vw-border-dark); box-shadow: inset 1px 1px 0 var(--vw-border-light); }\n.gmp-retro-btn.close { background: var(--vw-accent-pink); }\n.gmp-retro-content { flex-grow: 1; padding: 4px; box-shadow: inset 2px 2px 0px var(--vw-text-secondary); min-height: 0; display: flex; align-items: center; justify-content: center; }\n.gmp-avatar-wrapper { width: 100%; height: 100%; aspect-ratio: 1 / 1; overflow: hidden; margin: auto 0; position: relative; }\n#gmp-collapsed-avatar { width: 100%; height: 100%; object-fit: cover; }\n@keyframes gmp-title-pulse { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.2); } }\n\n.gmp-view-header { display: flex; justify-content: space-between; align-items: center; height: 32px; margin-bottom: 10px; flex-shrink: 0; gap: 8px; border-bottom: 2px solid var(--vw-accent-blue); padding-bottom: 8px; }\n.gmp-top-title { font-size: 16px; font-weight: 700; color: var(--vw-text-primary); }\n.gmp-icon-btn { background: none; border: none; color: var(--vw-text-secondary); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }\n.gmp-icon-btn:hover { color: var(--vw-text-primary); transform: translateY(-1px); }\n.gmp-icon-btn svg { width: 16px; height: 16px; fill: currentColor; }\n\n#gmp-player-content .gmp-main-content { background-image: url('https://i.postimg.cc/8PrjCzJB/0327453829ba203c83aa1470fc4c2308.jpg'); background-size: cover; background-position: center; box-shadow: inset 0 0 0 2px var(--vw-border-dark); }\n.gmp-main-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; text-align: center; min-height: 0; }\n.gmp-album-art-wrapper { width: 150px; height: 150px; flex-shrink: 0; padding: 8px; background: var(--vw-accent-pink); border: 2px solid var(--vw-border-dark); box-shadow: 4px 4px 0 var(--vw-border-dark); cursor: pointer; transition: all var(--vw-transition); }\n.gmp-album-art-wrapper:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--vw-border-dark); }\n#gmp-album-art { width: 100%; height: 100%; object-fit: cover; }\n.gmp-track-info { width: 100%; overflow: hidden; background: rgba(227, 227, 255, 0.7); padding: 4px; backdrop-filter: blur(2px); }\n\n.gmp-title {\n    font-size: 18px;\n    font-weight: 700;\n    margin-bottom: 5px;\n    white-space: nowrap;\n    color: var(--vw-text-primary);\n    display: inline-block;\n    position: relative;\n}\n\n.gmp-title.scrolling {\n    animation: gmp-title-scroll var(--scroll-duration, 10s) linear infinite;\n}\n\n.gmp-title.scrolling::after {\n    content: attr(data-text);\n    position: absolute;\n    left: 100%;\n    padding-left: 50px;\n    white-space: nowrap;\n}\n\n@keyframes gmp-title-scroll {\n    0% { transform: translateX(0); }\n    100% { transform: translateX(calc(-100% - 50px)); }\n}\n\n.gmp-title.loading {\n    background: linear-gradient(90deg, var(--vw-text-primary) 0%, var(--vw-accent-pink) 50%, var(--vw-text-primary) 100%);\n    background-size: 200% 100%;\n    -webkit-background-clip: text;\n    background-clip: text;\n    -webkit-text-fill-color: transparent;\n    animation: gmp-title-loading 1.5s ease-in-out infinite;\n}\n\n@keyframes gmp-title-loading {\n    0% { background-position: 100% 0; }\n    100% { background-position: -100% 0; }\n}\n\n.gmp-artist { font-size: 12px; color: var(--vw-text-secondary); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 5px; }\n\n.gmp-main-lyrics-display { min-height: 42px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: var(--vw-border-light); font-size: 14px; text-shadow: 1px 1px 0 var(--vw-border-dark), -1px -1px 0 var(--vw-border-dark), 1px -1px 0 var(--vw-border-dark), -1px 1px 0 var(--vw-border-dark); }\n.gmp-main-lyrics-display span { display: block; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 4px; line-height: 1.2; }\n#gmp-main-lyric-line2 { font-size: 12px; opacity: 0.8; }\n\n.gmp-progress-wrapper { display: flex; align-items: center; gap: 8px; margin-top: 8px; }\n.gmp-time-display { font-size: 14px; background: var(--vw-border-dark); color: var(--vw-accent-pink); padding: 4px 6px; }\n.gmp-progress-bar-outer { height: 20px; flex-grow: 1; position: relative; background: repeating-conic-gradient(#b9b9ef 0% 25%, #d8d9ff 0% 50%) 50% / 10px 10px; box-shadow: inset 0 0 0 2px var(--vw-border-dark); overflow: hidden; }\n.gmp-progress-bar { position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 3; margin: 0; }\n.gmp-buffer-fill { position: absolute; height: 100%; background: rgba(163, 171, 255, 0.4); width: 0%; z-index: 1; }\n.gmp-progress-fill { position: absolute; height: 100%; background: var(--vw-accent-blue); width: 0%; box-shadow: inset 0 0 0 2px var(--vw-border-dark); background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent); background-size: 20px 20px; z-index: 2; }\n.gmp-container.playing .gmp-progress-fill { animation: gmp-progress-flow 2s linear infinite; }\n@keyframes gmp-progress-flow { from { background-position-x: 0; } to { background-position-x: 40px; } }\n\n.gmp-controls-wrapper { display: flex; align-items: center; justify-content: space-between; padding: 8px 0 0; }\n.gmp-control-btn { background: #d8d9ff; border: 2px solid var(--vw-border-dark); box-shadow: 2px 2px 0 var(--vw-border-dark); color: var(--vw-text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 44px; height: 36px; transition: all 0.1s ease-out; position: relative; }\n.gmp-control-btn:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--vw-border-dark); }\n.gmp-control-btn:active { transform: translate(2px, 2px); box-shadow: none; }\n.gmp-control-btn svg { width: 16px; height: 16px; fill: currentColor; }\n.gmp-control-btn.main { width: 56px; height: 44px; }\n.gmp-control-btn.main svg { width: 24px; height: 24px; }\n.gmp-control-btn.secondary { width: 36px; height: 32px; }\n.gmp-control-btn.secondary svg { width: 16px; height: 16px; }\n\n.gmp-play-icon, .gmp-pause-icon, .gmp-buffering-icon { display: none; }\n#gmp-play-pause-btn:not(.playing):not(.buffering) .gmp-play-icon { display: block; }\n#gmp-play-pause-btn.playing:not(.buffering) .gmp-pause-icon { display: block; }\n#gmp-play-pause-btn.buffering .gmp-buffering-icon { display: block; animation: gmp-buffering-spin 1s linear infinite; }\n\n.gmp-control-btn.main.buffering { pointer-events: none; }\n\n@keyframes gmp-buffering-spin {\n    to { transform: rotate(360deg); }\n}\n\n#gmp-search-content .gmp-scroll-list { background-image: url('https://i.postimg.cc/mgfh1WCH/395a75e221625a70f05fef6ff8cca93f.jpg'); }\n#gmp-playlist-content .gmp-scroll-list { background-image: url('https://i.postimg.cc/v8Lt8yjx/ce16b0b5fafe.jpg'); }\n.gmp-scroll-list { flex: 1; overflow-y: auto; min-height: 0; border: 2px solid var(--vw-border-dark); padding: 4px; background-size: cover; background-position: center; box-shadow: inset 2px 2px 0px var(--vw-text-secondary); position: relative; }\n.gmp-scroll-list::-webkit-scrollbar { display: none; }\n\n.gmp-list-item { display: flex; align-items: center; gap: 8px; padding: 6px; cursor: pointer; position: relative; }\n.gmp-list-item-bg { position: absolute; inset: 0; background: rgba(24, 21, 53, 0.7); backdrop-filter: blur(1px); border-radius: 2px; transition: all var(--vw-transition); }\n.gmp-list-item:hover .gmp-list-item-bg { background: var(--vw-accent-blue); }\n#gmp-playlist-content .gmp-list-item.active .gmp-list-item-bg { background: var(--vw-accent-blue); }\n\n.gmp-list-item-content { display: flex; align-items: center; gap: 8px; flex: 1; z-index: 1; }\n.gmp-list-item-art-wrapper { width: 32px; height: 32px; flex-shrink: 0; border: 1px solid var(--vw-border-dark); overflow: hidden; }\n.gmp-list-item img { width: 100%; height: 100%; object-fit: cover; }\n.gmp-list-info { flex: 1; overflow: hidden; color: var(--vw-accent-pink); text-shadow: 1px 1px 0 rgba(0,0,0,0.5); }\n.gmp-list-title { font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.gmp-list-artist { font-size: 12px; color: var(--vw-accent-blue); opacity: 0.8; }\n.gmp-list-item:hover .gmp-list-info, #gmp-playlist-content .gmp-list-item.active .gmp-list-info { color: var(--vw-border-light); text-shadow: 1px 1px 0 var(--vw-border-dark); }\n.gmp-list-item:hover .gmp-list-artist, #gmp-playlist-content .gmp-list-item.active .gmp-list-artist { color: var(--vw-border-light); }\n.gmp-list-item .gmp-icon-btn { z-index: 1; }\n\n.gmp-search-input-wrapper { flex: 1; position: relative; }\n#gmp-search-input { width: 100%; background: var(--vw-border-light); border: 2px solid var(--vw-border-dark); box-shadow: inset 2px 2px 0px var(--vw-text-secondary); color: var(--vw-text-primary); height: 32px; padding: 0 32px 0 8px; font-size: 14px; outline: none; }\n#gmp-search-clear-btn { position: absolute; right: 0; top: 0; height: 32px; width: 32px; }\n\n#gmp-lyrics-content { position: relative; cursor: pointer; }\n#gmp-lyrics-content::before, #gmp-lyrics-content::after { content: ''; position: absolute; inset: 0; z-index: -1; }\n#gmp-lyrics-content::before { background-image: url('https://i.postimg.cc/v8Lt8yjx/ce16b0b5fafe.jpg'); background-size: cover; background-position: center; filter: blur(4px); }\n#gmp-lyrics-content::after { background: rgba(24, 21, 53, 0.4); }\n.gmp-lyrics-container { flex: 1; overflow-y: auto; text-align: center; padding: 20px 0; min-height: 0; }\n.gmp-lyrics-container::-webkit-scrollbar { display: none; }\n.gmp-lyrics-line { padding: 8px 0; font-size: 18px; color: rgba(255,255,255,0.7); transition: all 0.4s ease; opacity: 0.7; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); }\n.gmp-lyrics-translated { font-size: 0.8em; opacity: 0.6; }\n.gmp-lyrics-line.active { color: var(--vw-accent-pink); font-size: 20px; opacity: 1; font-weight: 700; text-shadow: 1px 1px 4px rgba(0,0,0,0.8); }\n\n.gmp-loader { position: absolute; inset: 0; background: rgba(24, 21, 53, 0.7); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 99; opacity: 0; pointer-events: none; transition: opacity 0.3s; }\n.gmp-loader.show { opacity: 1; pointer-events: auto; }\n.gmp-loader-text { color: var(--vw-accent-pink); font-size: 24px; text-shadow: 2px 2px 0 var(--vw-border-dark); animation: gmp-glitch 1.5s infinite steps(2, start); }\n@keyframes gmp-glitch { 0% { text-shadow: 2px 2px 0 var(--vw-border-dark); transform: translate(0); } 49% { text-shadow: 2px 2px 0 var(--vw-border-dark); transform: translate(0); } 50% { text-shadow: -2px 2px 0 var(--vw-accent-pink); transform: translate(-1px, 1px); } 99% { text-shadow: -2px 2px 0 var(--vw-accent-pink); transform: translate(-1px, 1px); } 100% { text-shadow: 2px 2px 0 var(--vw-border-dark); transform: translate(0); } }\n\n.gmp-popover-menu { position: fixed; background: var(--vw-window-bg); border: 2px solid var(--vw-border-dark); box-shadow: 2px 2px 0 var(--vw-border-dark); padding: 4px; z-index: 100; min-width: 140px; animation: popIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }\n@keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }\n.gmp-menu-item { padding: 6px 8px; font-size: 14px; color: var(--vw-text-primary); cursor: pointer; }\n.gmp-menu-item:hover { background: var(--vw-accent-blue); color: var(--vw-border-light); text-shadow: 1px 1px 0 var(--vw-border-dark); }\n\n#gmp-search-content .gmp-list-info { color: var(--vw-window-bg); text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); }\n#gmp-search-content .gmp-list-artist { color: var(--vw-window-bg); opacity: 0.8; }\n\n#gmp-search-content .gmp-list-item.playing-in-search .gmp-list-item-bg { background: var(--vw-accent-pink); opacity: 0.7; }\n#gmp-search-content .gmp-list-item.playing-in-search .gmp-list-info,\n#gmp-search-content .gmp-list-item.playing-in-search .gmp-list-artist { color: var(--vw-border-dark); text-shadow: none; }\n#gmp-search-content .gmp-list-item .gmp-list-menu-btn { color: var(--vw-window-bg); opacity: 0.7; }\n#gmp-search-content .gmp-list-item .gmp-list-menu-btn:hover { color: var(--vw-text-primary); opacity: 1; }\n#gmp-visualizer-canvas { position: absolute; bottom: 0; left: 0; width: 100%; height: 60%; pointer-events: none; opacity: 0.6; mix-blend-mode: screen; image-rendering: pixelated; }\n\n#gmp-bubble-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; z-index: 10; }\n\n.gmp-bubble { position: absolute; bottom: -50px; font-family: sans-serif; color: var(--vw-accent-pink); text-shadow: 1px 1px 0 var(--vw-border-dark); opacity: 0; animation: floatUp 10s linear forwards; }\n@keyframes floatUp { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 0.8; } 25% { transform: translateY(-150px) translateX(-10px); } 50% { transform: translateY(-300px) translateX(10px); } 75% { transform: translateY(-450px) translateX(-5px); } 95% { opacity: 0.8; } 100% { transform: translateY(-600px) translateX(0); opacity: 0; } }",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  const DEBUG_MODE = false;\n  const log = (...args) => DEBUG_MODE && console.log("[G-Player]", ...args);\n  const warn = (...args) => DEBUG_MODE && console.warn("[G-Player]", ...args);\n  const error = (...args) => DEBUG_MODE && console.error("[G-Player]", ...args);\n\n  const state = {\n    playlist: [],\n    originalQueue: [],\n    currentIndex: 0,\n    isPlaying: false,\n    playMode: 0,\n    lyrics: [],\n    isExpanded: false,\n    shouldAutoPlay: false,\n    fallbackAttempts: 0,\n    maxFallbackAttempts: 3,\n  };\n\n  const bufferState = {\n    isBuffering: false,\n    isActuallyPlaying: false,\n  };\n\n  let audioContext, analyser, sourceNode, visualizerFrameId;\n  let bubbleInterval = null;\n  let isUserSeeking = false;\n  let lyricsAnimationId = null;\n  let loadingTimeout = null;\n  let progressCheckInterval = null;\n  let lastProgressTime = 0;\n\n  const PLACEHOLDER_IMG =\n    "https://i.postimg.cc/yYSkN8gg/9256285f402878ada2fd8ae5ac6a8d87.jpg";\n\n  function checkTitleScroll() {\n    const titleEl = dom.player.title;\n    if (!titleEl) return;\n    const containerWidth = titleEl.parentElement.clientWidth;\n    const textWidth = titleEl.scrollWidth;\n    titleEl.classList.remove("scrolling");\n    if (containerWidth < 100) return;\n    if (textWidth > containerWidth) {\n      const duration = Math.max(5, textWidth / 30);\n      titleEl.style.setProperty("--scroll-duration", `${duration}s`);\n      titleEl.classList.add("scrolling");\n    }\n  }\n\n  const getProxyUrl = (audioUrl) => {\n    if (!audioUrl) return "";\n    const needProxyDomains = [\n      "music.126.net",\n      "126.net",\n      "netease.com",\n      "qq.com",\n      "qqmusic.qq.com",\n      "y.qq.com",\n      "kuwo.cn",\n      "kuwo.com",\n      "kugou.com",\n      "migu.cn",\n    ];\n    const needProxy = needProxyDomains.some((domain) =>\n      audioUrl.includes(domain),\n    );\n    return needProxy\n      ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`\n      : audioUrl;\n  };\n\n  const $ = (sel) => document.querySelector(sel);\n  const dom = {\n    container: $("#gmp-container"),\n    audio: $("#gmp-audio-player"),\n    bg: $("#gmp-dynamic-bg"),\n    views: {\n      collapsed: $("#gmp-collapsed-view"),\n      expanded: $("#gmp-expanded-view"),\n    },\n    contents: {\n      player: $("#gmp-player-content"),\n      search: $("#gmp-search-content"),\n      lyrics: $("#gmp-lyrics-content"),\n      playlist: $("#gmp-playlist-content"),\n    },\n    player: {\n      art: $("#gmp-album-art"),\n      title: $("#gmp-title"),\n      artist: $("#gmp-artist"),\n      curTime: $("#gmp-current-time"),\n      progress: $("#gmp-progress-bar"),\n      progressOuter: $(".gmp-progress-bar-outer"),\n      progressFill: $("#gmp-progress-fill"),\n      bufferFill: $("#gmp-buffer-fill"),\n      playBtn: $("#gmp-play-pause-btn"),\n      modeBtn: $("#gmp-mode-btn"),\n    },\n    search: {\n      input: $("#gmp-search-input"),\n      clearBtn: $("#gmp-search-clear-btn"),\n      submitBtn: $("#gmp-search-submit-btn"),\n      results: $("#gmp-search-results"),\n    },\n    lyricsContainer: $("#gmp-lyrics-container"),\n    mainLyrics: {\n      line1: $("#gmp-main-lyric-line1"),\n      line2: $("#gmp-main-lyric-line2"),\n    },\n    collapsed: {\n      avatar: $("#gmp-collapsed-avatar"),\n      charName: $("#gmp-retro-char-name"),\n    },\n    loader: $("#gmp-loader"),\n    searchBtn: $("#gmp-search-btn"),\n    visualizerCanvas: $("#gmp-visualizer-canvas"),\n    bubbleContainer: $("#gmp-bubble-container"),\n  };\n\n  const normalizePlaylist = (rawPlaylist) => {\n    if (!Array.isArray(rawPlaylist)) return [];\n    return rawPlaylist.map((track) => {\n      const artist = track.artist || track.singer || track.歌手;\n      return {\n        name:\n          track.name ||\n          track.song ||\n          track.title ||\n          track.歌曲名 ||\n          "Unknown Title",\n        artist: Array.isArray(artist)\n          ? artist\n          : artist\n            ? [artist]\n            : ["Unknown Artist"],\n        audioUrl: track.audioUrl || track.url || track.音频链接,\n        lyricsUrl: track.lyricsUrl || track.lrc || track.歌词链接,\n        coverUrl: track.coverUrl || track.cover || track.pic || track.封面链接,\n        ...track,\n      };\n    });\n  };\n\n  const showLoader = (show) => dom.loader.classList.toggle("show", show);\n  const formatTime = (s) => {\n    const m = Math.floor(s / 60) || 0;\n    const sec = Math.floor(s % 60) || 0;\n    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;\n  };\n\n  function setBufferingState(buffering) {\n    bufferState.isBuffering = buffering;\n    dom.player.playBtn.classList.toggle("buffering", buffering);\n    if (buffering) {\n      dom.container.classList.remove("playing");\n      dom.player.playBtn.classList.remove("playing");\n    } else if (bufferState.isActuallyPlaying) {\n      dom.container.classList.add("playing");\n      dom.player.playBtn.classList.add("playing");\n    }\n  }\n\n  function setLoadingTitle(loading) {\n    dom.player.title.classList.toggle("loading", loading);\n  }\n\n  function startLoadingTimeout() {\n    clearTimeout(loadingTimeout);\n    loadingTimeout = setTimeout(() => {\n      if (bufferState.isBuffering) {\n        warn("加载超时，尝试换源...");\n        showLoader(false);\n        setBufferingState(false);\n        setLoadingTitle(false);\n        tryFallbackSource(state.shouldAutoPlay);\n      }\n    }, 15000);\n  }\n\n  function clearLoadingTimeout() {\n    clearTimeout(loadingTimeout);\n  }\n\n  function startProgressCheck() {\n    stopProgressCheck();\n    lastProgressTime = dom.audio.currentTime;\n    progressCheckInterval = setInterval(() => {\n      if (state.isPlaying && !dom.audio.paused) {\n        const currentTime = dom.audio.currentTime;\n        if (Math.abs(currentTime - lastProgressTime) < 0.1) {\n          warn("检测到播放进度停滞，尝试恢复...");\n          handlePlaybackStall();\n        }\n        lastProgressTime = currentTime;\n      }\n    }, 5000);\n  }\n\n  function stopProgressCheck() {\n    if (progressCheckInterval) {\n      clearInterval(progressCheckInterval);\n      progressCheckInterval = null;\n    }\n  }\n\n  function handlePlaybackStall() {\n    const track = state.playlist[state.currentIndex];\n    if (!track) return;\n\n    const currentTime = dom.audio.currentTime;\n    if (currentTime > 0 && dom.audio.src) {\n      dom.audio.currentTime = currentTime + 0.1;\n      dom.audio.play().catch(() => {\n        const src = dom.audio.src;\n        dom.audio.src = "";\n        setTimeout(() => {\n          dom.audio.src = src;\n          dom.audio.currentTime = currentTime;\n          dom.audio.play().catch(() => {\n            tryFallbackSource(state.shouldAutoPlay);\n          });\n        }, 500);\n      });\n    } else {\n      tryFallbackSource(state.shouldAutoPlay);\n    }\n  }\n\n  function sendLyricsProgress() {\n    if (!state.isPlaying) return;\n    const ct = dom.audio.currentTime || 0;\n    const duration = dom.audio.duration || 0;\n    const progress = duration > 0 ? (ct / duration) * 100 : 0;\n    const currentTrack = state.playlist[state.currentIndex];\n    if (currentTrack && typeof ThemeUtils !== "undefined") {\n      ThemeUtils.sendMessage("playback-progress", {\n        currentTrack: {\n          title: currentTrack.name,\n          artist: Array.isArray(currentTrack.artist)\n            ? currentTrack.artist.join(" / ")\n            : currentTrack.artist,\n        },\n        progress: progress,\n        currentTime: formatTime(ct),\n        duration: formatTime(duration),\n        currentTimeRaw: ct,\n      });\n    }\n    lyricsAnimationId = requestAnimationFrame(sendLyricsProgress);\n  }\n\n  const switchView = (contentId) => {\n    Object.values(dom.contents).forEach((c) => c.classList.add("hidden"));\n    if (dom.contents[contentId])\n      dom.contents[contentId].classList.remove("hidden");\n  };\n\n  const setDynamicBackground = (url) => {\n    dom.bg.style.backgroundImage = url ? `url(\'${url}\')` : "none";\n  };\n\n  function resetPlayerUI() {\n    dom.player.title.textContent = "♡°ஂ...電波受信中...𓈒𓏸˚₊";\n    dom.player.artist.textContent = "...ノイズ...";\n    dom.player.art.src = PLACEHOLDER_IMG;\n    dom.collapsed.avatar.src = PLACEHOLDER_IMG;\n    dom.collapsed.charName.textContent = "G-PLAYER.EXE";\n    dom.player.curTime.textContent = "00:00";\n    dom.player.progress.value = 0;\n    dom.player.progressFill.style.width = "0%";\n    if (dom.player.bufferFill) dom.player.bufferFill.style.width = "0%";\n    dom.mainLyrics.line1.textContent = "...";\n    dom.mainLyrics.line2.textContent = "";\n    state.lyrics = [];\n    renderLyrics();\n    setDynamicBackground(null);\n    setBufferingState(false);\n    setLoadingTitle(false);\n  }\n\n  const getHighResCoverUrl = (url) => {\n    if (!url) return PLACEHOLDER_IMG;\n    if (url.includes("p1.music.126.net")) {\n      return url.replace(/\\?param=\\d+y\\d+/, "?param=400y400");\n    }\n    return url;\n  };\n\n  const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {\n    for (let i = 0; i < retries; i++) {\n      try {\n        const response = await fetch(url, options);\n        if (!response.ok)\n          throw new Error(`HTTP error! status: ${response.status}`);\n        return response;\n      } catch (error) {\n        if (i === retries - 1) throw error;\n        await new Promise((resolve) => setTimeout(resolve, delay));\n      }\n    }\n  };\n\n  function getAudioDurationQuick(audioUrl) {\n    return new Promise((resolve) => {\n      const needProxyDomains = ["music.126.net", "qq.com", "kuwo.cn"];\n      const needProxy = needProxyDomains.some((d) => audioUrl.includes(d));\n      const finalUrl = needProxy\n        ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`\n        : audioUrl;\n      const audio = new Audio();\n      audio.preload = "metadata";\n      const timeout = setTimeout(() => {\n        audio.src = "";\n        resolve(null);\n      }, 3000);\n      audio.onloadedmetadata = () => {\n        clearTimeout(timeout);\n        const dur = audio.duration;\n        audio.src = "";\n        resolve(isFinite(dur) ? dur : null);\n      };\n      audio.onerror = () => {\n        clearTimeout(timeout);\n        audio.src = "";\n        resolve(null);\n      };\n      audio.src = finalUrl;\n    });\n  }\n\n  async function tryFallbackSource(autoPlayAfterSwitch = false) {\n    const currentTrack = state.playlist[state.currentIndex];\n    if (!currentTrack) return;\n\n    if (state.fallbackAttempts >= state.maxFallbackAttempts) {\n      error("达到最大换源次数限制");\n      dom.player.title.textContent = "所有音源都不可用";\n      setLoadingTitle(false);\n      setBufferingState(false);\n      state.fallbackAttempts = 0;\n      setTimeout(() => {\n        if (state.playlist.length > 1) nextTrack(true, autoPlayAfterSwitch);\n      }, 2000);\n      return;\n    }\n\n    state.fallbackAttempts++;\n    log(`换源尝试 ${state.fallbackAttempts}/${state.maxFallbackAttempts}`);\n\n    const searchQuery = `${currentTrack.name} ${Array.isArray(currentTrack.artist) ? currentTrack.artist[0] : currentTrack.artist}`;\n    const fallbackSources = ["tencent", "netease", "kuwo"].filter(\n      (s) => s.toLowerCase() !== (currentTrack.source || "").toLowerCase(),\n    );\n\n    for (const source of fallbackSources) {\n      try {\n        log(`尝试 ${source} 源...`);\n        const searchRes = await fetch(\n          `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(searchQuery)}&source=${source}`,\n        );\n        const searchData = await searchRes.json();\n        const searchResults = searchData?.data || [];\n        if (searchResults.length === 0) continue;\n\n        const targetName = currentTrack.name.toLowerCase();\n        const targetArtist = (\n          Array.isArray(currentTrack.artist)\n            ? currentTrack.artist[0]\n            : currentTrack.artist || ""\n        ).toLowerCase();\n\n        const newTrack =\n          searchResults.find((item) => {\n            const itemName = (item.song || item.name || "").toLowerCase();\n            const itemArtist = (item.singer || item.artist || "").toLowerCase();\n            return (\n              (itemName.includes(targetName) ||\n                targetName.includes(itemName)) &&\n              (itemArtist.includes(targetArtist) ||\n                targetArtist.includes(itemArtist))\n            );\n          }) \n          if (!newTrack) {\n            log(`${source} 未找到匹配歌手 "${targetArtist}" 的结果，跳过...`);\n            continue;\n          }\n\n        const newId = newTrack.id || newTrack.rid;\n        const songRes = await fetch(\n          `/api/plugins/g-player-proxy/song?id=${newId}&source=${source}`,\n        );\n        const songData = await songRes.json();\n\n        if (songData?._needFallback) {\n          log(`${source} 返回换源标记，跳过...`);\n          continue;\n        }\n\n        let audioUrl = null;\n        let lyricData = { lyric: null, tlyric: null };\n\n        if (source === "netease") {\n          if (songData?.data?.[0]) {\n            audioUrl = songData.data[0].url;\n            lyricData.lyric = songData.data[0].lyric || "";\n            lyricData.tlyric = songData.data[0].tlyric || "";\n          } else if (songData?.url) {\n            audioUrl = songData.url;\n            lyricData.lyric = songData.lyric || "";\n          }\n        } else if (source === "kuwo") {\n          if (!songData?.data?.url) {\n            log(`${source} 无有效数据，跳过...`);\n            continue;\n          }\n          audioUrl = songData.data.url;\n          lyricData.lyric = songData.data.lrc || "";\n        } else if (source === "tencent") {\n          audioUrl = songData?.data?.url;\n          try {\n            const lyricRes = await fetch(\n              `/api/plugins/g-player-proxy/lyric?id=${newId}&source=tencent`,\n            );\n            const lyricJson = await lyricRes.json();\n            if (lyricJson?.data) {\n              lyricData.lyric = lyricJson.data.lrc || "";\n              lyricData.tlyric =\n                lyricJson.data.tlyric || lyricJson.data.trans || "";\n            }\n          } catch (e) {\n            warn(`${source} 歌词获取失败`);\n          }\n        }\n\n        if (!audioUrl || audioUrl.includes(".mp4")) {\n          log(`${source} 音频无效或是mp4格式`);\n          continue;\n        }\n\n        const duration = await getAudioDurationQuick(audioUrl);\n        if (duration !== null && duration <= 35) {\n          log(`${source} 检测到试听版 (${duration.toFixed(1)}s)`);\n          continue;\n        }\n\n        log(`✓ ${source} 换源成功！`);\n        state.fallbackAttempts = 0;\n\n        const track = state.playlist[state.currentIndex];\n        track.source = source.charAt(0).toUpperCase() + source.slice(1);\n        track.id = newId;\n        track.audioUrl = audioUrl;\n        track.coverUrl = newTrack.cover || newTrack.pic || track.coverUrl;\n        track._fromCache = false;\n\n        if (lyricData.lyric?.trim()) {\n          state.lyrics = parseLRC(lyricData.lyric, lyricData.tlyric, source);\n          renderLyrics();\n        }\n\n        if (newTrack.cover || newTrack.pic) {\n          const newCover = newTrack.cover || newTrack.pic;\n          dom.player.art.src = newCover;\n          dom.collapsed.avatar.src = newCover;\n          setDynamicBackground(newCover);\n        }\n\n        dom.audio.src = getProxyUrl(audioUrl);\n        if (autoPlayAfterSwitch) {\n          dom.audio.play().catch((e) => warn("播放失败:", e));\n        }\n        if (typeof ThemeUtils !== "undefined" && track.id && track.source) {\n          const originalArtist =\n            track.originalArtist ||\n            (Array.isArray(track.artist) ? track.artist[0] : track.artist);\n          const trackArtist = Array.isArray(track.artist)\n            ? track.artist[0]\n            : track.artist;\n\n          const normalizeArtist = (str) => (str || "").toLowerCase().trim();\n          const origNorm = normalizeArtist(originalArtist);\n          const trackNorm = normalizeArtist(trackArtist);\n\n          const artistMatch =\n            !origNorm ||\n            !trackNorm ||\n            origNorm.includes(trackNorm) ||\n            trackNorm.includes(origNorm) ||\n            origNorm === trackNorm;\n\n          if (!artistMatch) {\n            warn(\n              `⚠️ 歌手不匹配，跳过缓存回写\\n  原始: ${originalArtist}\\n  实际: ${trackArtist}`,\n            );\n          } else {\n            ThemeUtils.sendMessage("cache-track-data", {\n              title: track.originalTitle || track.name,\n              artist: originalArtist,\n              trackData: {\n                id: track.id || newId,\n                source: track.source,\n                title: track.name,\n                artist: trackArtist,\n                coverUrl: track.coverUrl || "",\n              },\n              audioUrl: audioUrl,\n              lyricsContent: lyricData.lyric || "",\n              tlyricContent: lyricData.tlyric || "",\n              coverUrl: track.coverUrl || "",\n            });\n            log("已发送缓存回写请求");\n          }\n        }\n        return;\n      } catch (e) {\n        warn(`${source} 换源失败:`, e.message);\n      }\n    }\n\n    error("所有换源尝试都失败");\n    dom.player.title.textContent = "该歌曲暂时无法播放";\n    setLoadingTitle(false);\n    setBufferingState(false);\n    setTimeout(() => {\n      if (state.playlist.length > 1) nextTrack(true, autoPlayAfterSwitch);\n    }, 2000);\n  }\n\n  async function loadTrack(index, autoPlay = true) {\n    if (!state.playlist.length || index < 0 || index >= state.playlist.length)\n      return;\n    state.shouldAutoPlay = autoPlay;\n    state.fallbackAttempts = 0;\n    bufferState.isActuallyPlaying = false;\n    showLoader(true);\n    setLoadingTitle(true);\n    setBufferingState(false);\n    state.currentIndex = index;\n    const track = state.playlist[index];\n    dom.player.title.textContent = track.name;\n    dom.player.title.setAttribute("data-text", track.name);\n    setTimeout(() => {\n      checkTitleScroll();\n    }, 150);\n    dom.player.artist.textContent = Array.isArray(track.artist)\n      ? track.artist.join(" / ")\n      : track.artist;\n    dom.collapsed.charName.textContent = track.name;\n    const highResUrl = getHighResCoverUrl(track.coverUrl);\n    const coverSrc = highResUrl || PLACEHOLDER_IMG;\n    dom.player.art.src = coverSrc;\n    dom.collapsed.avatar.src = coverSrc;\n    dom.player.art.onerror = () => {\n      dom.player.art.src = PLACEHOLDER_IMG;\n      dom.collapsed.avatar.src = PLACEHOLDER_IMG;\n    };\n    setDynamicBackground(track.coverUrl);\n    dom.mainLyrics.line1.textContent = "...";\n    dom.mainLyrics.line2.textContent = "";\n    if (dom.player.bufferFill) dom.player.bufferFill.style.width = "0%";\n    try {\n      let audioUrl = track.audioUrl || "";\n      let lyricData = {\n        lyric: track.lyricsContent || null,\n        tlyric: track.tlyricContent || null,\n      };\n      const needFetchAudio = !audioUrl;\n      const needFetchLyrics = !lyricData.lyric && !track.lyricsUrl;\n      if (needFetchAudio || needFetchLyrics) {\n        log(`需要请求API: audio=${needFetchAudio}, lyrics=${needFetchLyrics}`);\n        if (track.source === "Netease") {\n          try {\n            const response = await fetchWithRetry(\n              `/api/plugins/g-player-proxy/song?id=${track.id}&source=netease`,\n            );\n            const resData = await response.json();\n            if (resData?._needFallback) {\n              warn("网易云源需要换源...");\n              await tryFallbackSource(autoPlay);\n              return;\n            }\n            if (resData?.data?.[0]?.url) {\n              audioUrl = audioUrl || resData.data[0].url;\n              lyricData.lyric = lyricData.lyric || resData.data[0].lyric;\n              lyricData.tlyric = lyricData.tlyric || resData.data[0].tlyric;\n            } else if (resData?.url) {\n              audioUrl = audioUrl || resData.url;\n              lyricData.lyric = lyricData.lyric || resData.lyric;\n              lyricData.tlyric = lyricData.tlyric || resData.tlyric;\n            }\n          } catch (e) {\n            warn("Netease fetch failed:", e);\n          }\n        } else if (track.source === "Tencent") {\n          try {\n            const promises = [];\n            if (needFetchAudio) {\n              promises.push(\n                fetchWithRetry(\n                  `/api/plugins/g-player-proxy/lyric?id=${track.id}&source=tencent&title=${encodeURIComponent(track.originalTitle || track.name)}&artist=${encodeURIComponent(track.originalArtist || (Array.isArray(track.artist) ? track.artist[0] : track.artist))}`,\n                ).then((r) => r.json()),\n              );\n            } else {\n              promises.push(Promise.resolve(null));\n            }\n            if (needFetchLyrics) {\n              promises.push(\n                fetchWithRetry(\n                  `/api/plugins/g-player-proxy/lyric?id=${track.id}&source=tencent`,\n                ).then((r) => r.json()),\n              );\n            } else {\n              promises.push(Promise.resolve(null));\n            }\n            const [urlRes, lrcRes] = await Promise.allSettled(promises);\n            if (urlRes.status === "fulfilled" && urlRes.value?._needFallback) {\n              warn("腾讯源需要换源，尝试其他源...");\n              await tryFallbackSource(autoPlay);\n              return;\n            }\n            if (urlRes.status === "fulfilled" && urlRes.value?.data?.url) {\n              audioUrl = audioUrl || urlRes.value.data.url;\n            }\n            if (lrcRes.status === "fulfilled" && lrcRes.value?.data) {\n              lyricData.lyric = lyricData.lyric || lrcRes.value.data.lrc;\n              lyricData.tlyric =\n                lyricData.tlyric ||\n                lrcRes.value.data.tlyric ||\n                lrcRes.value.data.trans;\n            }\n          } catch (e) {\n            warn("Tencent fetch failed:", e);\n          }\n        } else if (track.source === "Kuwo") {\n          try {\n            const response = await fetchWithRetry(\n              `/api/plugins/g-player-proxy/song?id=${track.id}&source=kuwo`,\n            );\n            const resData = await response.json();\n            if (resData?._needFallback || !resData?.data?.url) {\n              warn("酷我源失败，尝试换源...");\n              await tryFallbackSource(autoPlay);\n              return;\n            }\n            audioUrl = resData.data.url;\n            lyricData.lyric = lyricData.lyric || resData.data.lrc;\n            if (!lyricData.lyric) {\n              try {\n                const lyricRes = await fetch(\n                  `/api/plugins/g-player-proxy/lyric?id=${track.id}&source=kuwo`,\n                );\n                const lyricJson = await lyricRes.json();\n                if (lyricJson?.data?.lrc) {\n                  lyricData.lyric = lyricJson.data.lrc;\n                }\n              } catch (e) {\n                warn("Kuwo 歌词单独请求失败");\n              }\n            }\n          } catch (e) {\n            warn("Kuwo fetch failed:", e);\n            await tryFallbackSource();\n            return;\n          }\n        }\n      } else {\n        log("✓ 数据完整，跳过API请求");\n      }\n      if (!audioUrl && track.id) {\n        log("主源无法获取音频，尝试换源...");\n        await tryFallbackSource(autoPlay);\n        return;\n      }\n      if (track.lyricsUrl && !lyricData.lyric) {\n        try {\n          const res = await fetchWithRetry(track.lyricsUrl);\n          lyricData.lyric = await res.text();\n        } catch (e) {\n          warn("Failed to fetch lyrics from provided URL:", e);\n        }\n      }\n      if (audioUrl) {\n        log("设置音频源");\n        dom.audio.src = getProxyUrl(audioUrl);\n        if (autoPlay) {\n          dom.audio.preload = "auto";\n          dom.audio.load();\n        }\n        state.fallbackAttempts = 0;\n        if (typeof ThemeUtils !== "undefined" && !track._fromCache) {\n          if (track.id && track.source) {\n            ThemeUtils.sendMessage("cache-track-data", {\n              title: track.originalTitle || track.name,\n              artist:\n                track.originalArtist ||\n                (Array.isArray(track.artist) ? track.artist[0] : track.artist),\n              trackData: {\n                id: track.id,\n                source: track.source,\n                title: track.name,\n                artist: Array.isArray(track.artist)\n                  ? track.artist[0]\n                  : track.artist,\n                coverUrl: track.coverUrl || "",\n              },\n              audioUrl: audioUrl,\n              lyricsContent: lyricData.lyric || "",\n              tlyricContent: lyricData.tlyric || "",\n              coverUrl: track.coverUrl || "",\n            });\n            log("已发送缓存回写请求");\n          } else {\n            log("直链歌曲，无需缓存回写");\n          }\n          track._fromCache = true;\n        } else if (track._fromCache) {\n          log("数据来自缓存，跳过回写");\n        }\n      } else {\n        dom.player.title.textContent = "播放失败，请尝试播放另一首歌曲。";\n        showLoader(false);\n        setLoadingTitle(false);\n      }\n      state.lyrics = parseLRC(lyricData.lyric, lyricData.tlyric, track.source);\n      renderLyrics();\n      renderPlaylist();\n      updateSearchListHighlight();\n    } catch (e) {\n      error("无法加载曲目:", e);\n      dom.player.title.textContent = "Load failed, skipping in 2s";\n      dom.player.artist.textContent = track.name;\n      state.lyrics = [];\n      renderLyrics();\n      showLoader(false);\n      setLoadingTitle(false);\n      setTimeout(() => nextTrack(true, state.shouldAutoPlay), 2000);\n    }\n  }\n\n  function togglePlay() {\n    if (\n      !dom.audio.src ||\n      dom.audio.src === "" ||\n      dom.audio.src === "about:blank"\n    ) {\n      if (state.playlist.length > 0) {\n        loadTrack(state.currentIndex);\n      } else {\n        log("播放列表为空，无法播放");\n      }\n      return;\n    }\n    if (dom.audio.paused) {\n      setBufferingState(true);\n      dom.audio.play().catch((e) => {\n        if (e.name === "AbortError") return;\n        warn("播放失败:", e);\n        setBufferingState(false);\n      });\n    } else {\n      dom.audio.pause();\n    }\n  }\n\n  function nextTrack(force = false, autoPlay = true) {\n    if (state.playMode === 1 && !force) {\n      dom.audio.currentTime = 0;\n      if (autoPlay) dom.audio.play().catch(() => {});\n      return;\n    }\n    let nextIndex = state.currentIndex + 1;\n    if (nextIndex >= state.playlist.length) nextIndex = 0;\n    loadTrack(nextIndex, autoPlay);\n  }\n\n  function prevTrack() {\n    let prevIndex = state.currentIndex - 1;\n    if (prevIndex < 0) prevIndex = state.playlist.length - 1;\n    loadTrack(prevIndex);\n  }\n\n  function switchMode() {\n    state.playMode = (state.playMode + 1) % 3;\n    $("#icon-mode-loop").style.display =\n      state.playMode === 0 ? "block" : "none";\n    $("#icon-mode-single").style.display =\n      state.playMode === 1 ? "block" : "none";\n    $("#icon-mode-shuffle").style.display =\n      state.playMode === 2 ? "block" : "none";\n    if (state.playMode === 2) {\n      state.originalQueue = [...state.playlist];\n      shufflePlaylist();\n    } else if (state.originalQueue.length > 0) {\n      const currentTrack = state.playlist[state.currentIndex];\n      state.playlist = [...state.originalQueue];\n      state.originalQueue = [];\n      state.currentIndex =\n        state.playlist.findIndex((t) => t.id === currentTrack.id) || 0;\n      renderPlaylist();\n    }\n  }\n\n  function shufflePlaylist() {\n    if (state.playlist.length <= 1) return;\n    const current = state.playlist.splice(state.currentIndex, 1)[0];\n    for (let i = state.playlist.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [state.playlist[i], state.playlist[j]] = [\n        state.playlist[j],\n        state.playlist[i],\n      ];\n    }\n    state.playlist.unshift(current);\n    state.currentIndex = 0;\n    renderPlaylist();\n  }\n\n  function createBubble() {\n    if (!dom.bubbleContainer) return;\n    const symbols = [\n      "♡",\n      "○",\n      "◇",\n      "☆",\n      "✧",\n      "𓆝",\n      "𓆞",\n      "𓆟",\n      "⚬",\n      "𓈒˚",\n      "✩",\n      "☽",\n      "⚝",\n    ];\n    const bubble = document.createElement("div");\n    bubble.className = "gmp-bubble";\n    bubble.textContent = symbols[Math.floor(Math.random() * symbols.length)];\n    bubble.style.left = `${Math.random() * 95}%`;\n    bubble.style.fontSize = `${10 + Math.random() * 20}px`;\n    const duration = 8 + Math.random() * 7;\n    bubble.style.animationDuration = `${duration}s`;\n    bubble.style.animationDelay = `${Math.random() * 2}s`;\n    dom.bubbleContainer.appendChild(bubble);\n    setTimeout(\n      () => {\n        bubble.remove();\n      },\n      duration * 1000 + 2000,\n    );\n  }\n\n  function toggleExpand(expand) {\n    if (expand === state.isExpanded) return;\n    state.isExpanded = expand;\n    dom.container.classList.toggle("expanded", expand);\n    if (expand) {\n      ThemeUtils.sendMessage("resize-iframe", {\n        width: "340px",\n        height: "520px",\n      });\n      ThemeUtils.sendMessage("player-expanding");\n      dom.views.collapsed.classList.add("hidden");\n      dom.views.expanded.classList.remove("hidden");\n      if (!bubbleInterval) {\n        bubbleInterval = setInterval(createBubble, 500);\n      }\n      setTimeout(() => {\n        checkTitleScroll();\n      }, 300);\n    } else {\n      ThemeUtils.sendMessage("resize-iframe", {\n        width: "80px",\n        height: "100px",\n      });\n      ThemeUtils.sendMessage("player-collapsing");\n      dom.views.expanded.classList.add("hidden");\n      dom.views.collapsed.classList.remove("hidden");\n      setTimeout(() => switchView("player"), 300);\n      clearInterval(bubbleInterval);\n      bubbleInterval = null;\n      if (dom.bubbleContainer) {\n        dom.bubbleContainer.innerHTML = "";\n      }\n    }\n  }\n\n  function renderPlaylist() {\n    const container = $("#gmp-playlist-container");\n    container.innerHTML = state.playlist\n      .map((track, i) => {\n        const safeTrackData = JSON.stringify(track).replace(/\'/g, "\'");\n        return `<div class="gmp-list-item ${i === state.currentIndex ? "active" : ""}" data-index="${i}" data-track=\'${safeTrackData}\'><div class="gmp-list-item-bg"></div><div class="gmp-list-item-content"><div class="gmp-list-item-art-wrapper"><img class="gmp-search-item-art" src="${track.coverUrl || PLACEHOLDER_IMG}" alt="art"></div><div class="gmp-list-info"><div class="gmp-list-title">${track.name}</div><div class="gmp-list-artist">${Array.isArray(track.artist) ? track.artist.join(" / ") : track.artist}</div></div></div><button class="gmp-icon-btn gmp-remove-btn" data-index="${i}"><svg viewBox="0 0 16 16"><path d="M2,5H14V3H10L9,2H7L6,3H2V5z M3,6V13c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V6H3z"/></svg></button></div>`;\n      })\n      .join("");\n  }\n\n  function updateSearchListHighlight() {\n    if (dom.contents.search.classList.contains("hidden")) return;\n    const currentTrack = state.playlist[state.currentIndex];\n    if (!currentTrack) return;\n    const currentlyHighlighted =\n      dom.search.results.querySelector(".playing-in-search");\n    if (currentlyHighlighted) {\n      currentlyHighlighted.classList.remove("playing-in-search");\n    }\n    const allSearchItems =\n      dom.search.results.querySelectorAll(".gmp-search-item");\n    for (const item of allSearchItems) {\n      try {\n        const trackData = JSON.parse(item.dataset.track);\n        if (\n          trackData.id === currentTrack.id &&\n          trackData.source === currentTrack.source\n        ) {\n          item.classList.add("playing-in-search");\n          break;\n        }\n      } catch (e) {}\n    }\n  }\n\n  function initAudioVisualizer() {\n    if (audioContext) return;\n    try {\n      audioContext = new (window.AudioContext || window.webkitAudioContext)();\n      analyser = audioContext.createAnalyser();\n      analyser.fftSize = 256;\n      sourceNode = audioContext.createMediaElementSource(dom.audio);\n      sourceNode.connect(analyser);\n      analyser.connect(audioContext.destination);\n    } catch (e) {\n      error("Web Audio API not supported.", e);\n    }\n  }\n\n  function drawVisualizer() {\n    if (!analyser) return;\n    const bufferLength = analyser.frequencyBinCount;\n    const dataArray = new Uint8Array(bufferLength);\n    analyser.getByteFrequencyData(dataArray);\n    const canvas = dom.visualizerCanvas;\n    const ctx = canvas.getContext("2d");\n    const WIDTH = canvas.width;\n    const HEIGHT = canvas.height;\n    ctx.clearRect(0, 0, WIDTH, HEIGHT);\n    const barWidth = (WIDTH / bufferLength) * 2.5;\n    let x = 0;\n    const gradient = ctx.createLinearGradient(0, HEIGHT, 0, 0);\n    gradient.addColorStop(0, "rgba(244, 194, 244, 0.5)");\n    gradient.addColorStop(1, "rgba(163, 171, 255, 1)");\n    ctx.fillStyle = gradient;\n    for (let i = 0; i < bufferLength; i++) {\n      const barHeight = (dataArray[i] / 255) * HEIGHT * 0.8;\n      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);\n      x += barWidth;\n    }\n    visualizerFrameId = requestAnimationFrame(drawVisualizer);\n  }\n\n  $("#gmp-playlist-container").addEventListener("click", (e) => {\n    const item = e.target.closest(".gmp-list-item");\n    if (!item) return;\n    const index = parseInt(item.dataset.index, 10);\n    if (e.target.closest(".gmp-remove-btn")) {\n      e.stopPropagation();\n      state.playlist.splice(index, 1);\n      if (index < state.currentIndex) {\n        state.currentIndex--;\n      } else if (index === state.currentIndex) {\n        if (state.playlist.length === 0) {\n          dom.audio.pause();\n          dom.audio.src = "";\n          resetPlayerUI();\n        } else {\n          if (state.currentIndex >= state.playlist.length)\n            state.currentIndex = 0;\n          loadTrack(state.currentIndex, state.isPlaying);\n        }\n      }\n      renderPlaylist();\n    } else {\n      loadTrack(index);\n    }\n  });\n\n  function parseLRC(lrcData, tlyricData, source = "") {\n    if (Array.isArray(lrcData)) {\n      return lrcData\n        .map((item) => ({\n          time: parseFloat(item.time),\n          text: item.lineLyric || item.text || "",\n          translated: item.tns ? item.tns[0] : item.translated || null,\n        }))\n        .sort((a, b) => a.time - b.time);\n    }\n\n    if (source && source.toLowerCase() === "kuwo") {\n      return parseLRCKuwo(lrcData);\n    }\n\n    const combinedText = (lrcData || "") + "\\n" + (tlyricData || "");\n    if (!combinedText.trim()) return [];\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g;\n    let allLines = [];\n    combinedText.split("\\n").forEach((line) => {\n      const content = line.replace(timeRegex, "").trim();\n      if (\n        !content ||\n        content === "//" ||\n        content === "/ /" ||\n        content.match(/^\\/+$/) ||\n        content.startsWith("TME享有")\n      )\n        return;\n      timeRegex.lastIndex = 0;\n      let match;\n      while ((match = timeRegex.exec(line))) {\n        const time =\n          parseInt(match[1]) * 60 +\n          parseInt(match[2]) +\n          parseInt(match[3].padEnd(3, "0")) / 1000;\n        allLines.push({ time, text: content });\n      }\n    });\n    allLines.sort((a, b) => a.time - b.time);\n    const merged = [];\n    for (let i = 0; i < allLines.length; i++) {\n      const current = allLines[i];\n      const next = allLines[i + 1];\n      if (next && Math.abs(next.time - current.time) < 0.01) {\n        const currentIsChinese = /[\\u4e00-\\u9fa5]/.test(current.text);\n        const nextIsChinese = /[\\u4e00-\\u9fa5]/.test(next.text);\n        if (currentIsChinese && !nextIsChinese) {\n          merged.push({\n            time: current.time,\n            text: next.text,\n            translated: current.text,\n          });\n        } else {\n          merged.push({\n            time: current.time,\n            text: current.text,\n            translated: next.text,\n          });\n        }\n        i++;\n        continue;\n      }\n      const currentIsChinese = /[\\u4e00-\\u9fa5]/.test(current.text);\n      const nextIsChinese = next && /[\\u4e00-\\u9fa5]/.test(next.text);\n      if (!currentIsChinese && nextIsChinese) {\n        merged.push({\n          time: current.time,\n          text: current.text,\n          translated: next.text,\n        });\n        i++;\n        continue;\n      }\n      merged.push({ time: current.time, text: current.text, translated: null });\n    }\n    return merged;\n  }\n\n  function parseLRCKuwo(lrcData) {\n    if (!lrcData || typeof lrcData !== "string") return [];\n\n    const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/;\n    const lines = lrcData.split("\\n");\n    const parsed = [];\n    for (const line of lines) {\n      const match = line.match(timeRegex);\n      if (!match) continue;\n\n      const content = line.replace(/\\[[\\d:.]+\\]/g, "").trim();\n      if (\n        !content ||\n        content === "//" ||\n        content === "/ /" ||\n        content.match(/^\\/+$/) ||\n        content.match(/^[:\\s]+$/)\n      )\n        continue;\n\n      const time =\n        parseInt(match[1]) * 60 +\n        parseInt(match[2]) +\n        parseInt(match[3].padEnd(3, "0")) / 1000;\n\n      parsed.push({ time, text: content });\n    }\n    const timeGroups = new Map();\n    for (const item of parsed) {\n      const key = item.time.toFixed(3);\n      if (!timeGroups.has(key)) {\n        timeGroups.set(key, []);\n      }\n      timeGroups.get(key).push(item.text);\n    }\n\n    const result = [];\n    const sortedTimes = Array.from(timeGroups.keys()).sort(\n      (a, b) => parseFloat(a) - parseFloat(b),\n    );\n\n    for (const timeKey of sortedTimes) {\n      const time = parseFloat(timeKey);\n      const texts = timeGroups.get(timeKey);\n\n      if (texts.length === 1) {\n        result.push({ time, text: texts[0], translated: null });\n      } else if (texts.length >= 2) {\n        if (result.length > 0 && !result[result.length - 1].translated) {\n          result[result.length - 1].translated = texts[0];\n        }\n        result.push({ time, text: texts[1], translated: null });\n        if (texts.length > 2) {\n          result[result.length - 1].translated = texts.slice(2).join(" ");\n        }\n      }\n    }\n\n    return result;\n  }\n\n  function renderLyrics() {\n    const container = dom.lyricsContainer;\n    container.innerHTML = state.lyrics.length\n      ? state.lyrics\n          .map(\n            (line, i) =>\n              `<div class="gmp-lyrics-line" data-index="${i}"><span class="gmp-lyrics-original">${(line.text || "").replace(/\\n/g, "<br>")}</span>${line.translated ? `<br><span class="gmp-lyrics-translated">${line.translated}</span>` : ""}</div>`,\n          )\n          .join("")\n      : \'<div class="gmp-lyrics-line active" style="margin-top:50%">NO LYRICS</div>\';\n  }\n\n  function updateMainScreenLyrics(currentTime) {\n    if (!state.lyrics.length) {\n      dom.mainLyrics.line1.textContent = "...";\n      dom.mainLyrics.line2.textContent = "";\n      return;\n    }\n    let activeIdx =\n      state.lyrics.findIndex((l) => l.time > currentTime + 0.2) - 1;\n    if (activeIdx < 0 && currentTime >= (state.lyrics[0]?.time ?? 0)) {\n      activeIdx = 0;\n    }\n    if (activeIdx === -1 && state.lyrics.length > 0)\n      activeIdx = state.lyrics.length - 1;\n    const currentLine = state.lyrics[activeIdx];\n    if (currentLine) {\n      if (dom.mainLyrics.line1.textContent !== currentLine.text) {\n        dom.mainLyrics.line1.textContent = currentLine.text;\n      }\n      const newTlyric = currentLine.translated || "";\n      if (dom.mainLyrics.line2.textContent !== newTlyric) {\n        dom.mainLyrics.line2.textContent = newTlyric;\n      }\n    } else {\n      dom.mainLyrics.line1.textContent = "...";\n      dom.mainLyrics.line2.textContent = "";\n    }\n  }\n\n  dom.audio.onloadstart = () => {\n    log("开始加载音频...");\n    setBufferingState(true);\n    setLoadingTitle(true);\n    startLoadingTimeout();\n  };\n\n  dom.audio.onwaiting = () => {\n    log("缓冲中...");\n    setBufferingState(true);\n  };\n\n  dom.audio.oncanplay = () => {\n    log("可以播放");\n    setLoadingTitle(false);\n  };\n\n  dom.audio.oncanplaythrough = () => {\n    log("可以流畅播放");\n    showLoader(false);\n    clearLoadingTimeout();\n    setLoadingTitle(false);\n    if (!state.shouldAutoPlay) {\n      setBufferingState(false);\n    }\n  };\n\n  dom.audio.onplaying = () => {\n    log("✓ 正在播放中");\n    bufferState.isActuallyPlaying = true;\n    setBufferingState(false);\n    clearLoadingTimeout();\n    dom.container.classList.add("playing");\n    dom.player.playBtn.classList.add("playing");\n    if (!audioContext) initAudioVisualizer();\n    if (audioContext && audioContext.state === "suspended")\n      audioContext.resume();\n    cancelAnimationFrame(visualizerFrameId);\n    drawVisualizer();\n    cancelAnimationFrame(lyricsAnimationId);\n    sendLyricsProgress();\n    startProgressCheck();\n  };\n\n  dom.audio.onstalled = () => {\n    warn("加载停滞，3秒后尝试恢复...");\n    setBufferingState(true);\n    setTimeout(() => {\n      if (dom.audio.readyState < 3 && !dom.audio.paused) {\n        const currentTime = dom.audio.currentTime;\n        dom.audio.load();\n        dom.audio.currentTime = currentTime;\n        dom.audio.play().catch(() => {});\n      }\n    }, 3000);\n  };\n\n  dom.audio.onsuspend = () => {\n    if (state.isPlaying && dom.audio.paused) {\n      log("检测到 suspend，尝试继续播放...");\n      dom.audio.play().catch(() => {});\n    }\n  };\n\n  dom.audio.onprogress = () => {\n    if (!dom.audio.buffered.length || !dom.audio.duration) return;\n    const currentTime = dom.audio.currentTime;\n    let bufferedEnd = 0;\n    for (let i = 0; i < dom.audio.buffered.length; i++) {\n      if (\n        dom.audio.buffered.start(i) <= currentTime &&\n        dom.audio.buffered.end(i) >= currentTime\n      ) {\n        bufferedEnd = dom.audio.buffered.end(i);\n        break;\n      }\n    }\n    const bufferPercent = (bufferedEnd / dom.audio.duration) * 100;\n    if (dom.player.bufferFill) {\n      dom.player.bufferFill.style.width = `${bufferPercent}%`;\n    }\n  };\n\n  dom.audio.onplay = () => {\n    state.isPlaying = true;\n    setBufferingState(true);\n    const currentTrack = state.playlist[state.currentIndex];\n    if (currentTrack && typeof ThemeUtils !== "undefined") {\n      ThemeUtils.sendMessage("playback-state-changed", {\n        isPlaying: true,\n        isBuffering: true,\n        currentTrack: {\n          title: currentTrack.name,\n          name: currentTrack.name,\n          artist: currentTrack.artist,\n          originalTitle: currentTrack.originalTitle,\n          originalArtist: currentTrack.originalArtist,\n          coverUrl: currentTrack.coverUrl,\n          id: currentTrack.id,\n          source: currentTrack.source,\n        },\n        lyrics: state.lyrics,\n      });\n    }\n  };\n\n  dom.audio.onpause = () => {\n    dom.container.classList.remove("playing");\n    dom.player.playBtn.classList.remove("playing");\n    dom.player.playBtn.classList.remove("buffering");\n    state.isPlaying = false;\n    bufferState.isActuallyPlaying = false;\n    setBufferingState(false);\n    cancelAnimationFrame(visualizerFrameId);\n    cancelAnimationFrame(lyricsAnimationId);\n    stopProgressCheck();\n    const currentTrack = state.playlist[state.currentIndex];\n    if (currentTrack && typeof ThemeUtils !== "undefined") {\n      ThemeUtils.sendMessage("playback-state-changed", {\n        isPlaying: false,\n        currentTrack: {\n          title: currentTrack.name,\n          name: currentTrack.name,\n          artist: currentTrack.artist,\n          originalTitle: currentTrack.originalTitle,\n          originalArtist: currentTrack.originalArtist,\n          coverUrl: currentTrack.coverUrl,\n          id: currentTrack.id,\n          source: currentTrack.source,\n        },\n        lyrics: state.lyrics,\n      });\n    }\n  };\n\n  dom.audio.onended = () => {\n    cancelAnimationFrame(visualizerFrameId);\n    nextTrack();\n  };\n\n  dom.audio.ontimeupdate = () => {\n    const { currentTime: ct = 0 } = dom.audio;\n    if (dom.player.curTime) dom.player.curTime.textContent = formatTime(ct);\n    if (!isUserSeeking) {\n      const progress =\n        dom.audio.duration > 0 ? (ct / dom.audio.duration) * 100 : 0;\n      dom.player.progress.value = progress;\n      dom.player.progressFill.style.width = `${progress}%`;\n    }\n    updateMainScreenLyrics(ct);\n    if (!dom.contents.lyrics.classList.contains("hidden")) {\n      let activeIdx = state.lyrics.findIndex((l) => l.time > ct + 0.2) - 1;\n      if (activeIdx < 0 && ct >= (state.lyrics[0]?.time ?? 0)) {\n        activeIdx = 0;\n      }\n      const currentActive = dom.lyricsContainer.querySelector(\n        ".gmp-lyrics-line.active",\n      );\n      if (currentActive && currentActive.dataset.index == activeIdx) return;\n      currentActive?.classList.remove("active");\n      const newLine = dom.lyricsContainer.querySelector(\n        `[data-index="${activeIdx}"]`,\n      );\n      if (newLine) {\n        newLine.classList.add("active");\n        const container = dom.lyricsContainer;\n        const targetScrollTop =\n          newLine.offsetTop -\n          container.clientHeight / 2 +\n          newLine.offsetHeight / 2;\n        container.scrollTo({ top: targetScrollTop, behavior: "smooth" });\n      }\n    }\n  };\n\n  dom.audio.onloadedmetadata = () => {\n    const duration = dom.audio.duration;\n    log(\n      `音频元数据加载完成，时长: ${duration ? duration.toFixed(1) : "未知"} 秒`,\n    );\n\n    if (duration > 0 && duration <= 35) {\n      warn(`⚠️ 检测到试听版 (${duration.toFixed(1)}s)，尝试换源...`);\n      tryFallbackSource(state.shouldAutoPlay);\n      return;\n    }\n\n    log("✓ 音频有效");\n    if (state.shouldAutoPlay) {\n      dom.audio.play().catch((e) => {\n        if (e.name === "AbortError") return;\n        error("播放失败:", e);\n      });\n    }\n  };\n\n  dom.audio.onerror = () => {\n    clearLoadingTimeout();\n    if (!dom.audio.src || dom.audio.src.includes("about:blank")) {\n      return;\n    }\n    error(`音频流加载失败: ${dom.audio.src}`);\n    const currentTrack = state.playlist[state.currentIndex];\n    if (currentTrack) {\n      if (typeof ThemeUtils !== "undefined") {\n        log("播放失败，请求刷新URL...");\n        ThemeUtils.sendMessage("audio-playback-failed", {\n          id: currentTrack.id,\n          source: currentTrack.source,\n          trackIndex: state.currentIndex,\n        });\n      }\n      showLoader(true);\n      dom.player.title.textContent = `播放失败，正在尝试换源...`;\n      dom.player.artist.textContent = currentTrack.name;\n      log("触发 onerror，开始尝试备用源...");\n      tryFallbackSource(state.isPlaying || state.shouldAutoPlay);\n    }\n  };\n\n  window.addEventListener("online", () => {\n    log("网络已恢复");\n    if (bufferState.isBuffering && state.isPlaying) {\n      const currentTime = dom.audio.currentTime;\n      dom.audio.load();\n      dom.audio.currentTime = currentTime;\n      dom.audio.play().catch(() => {});\n    }\n  });\n\n  dom.audio.onseeked = () => {\n    isUserSeeking = false;\n  };\n\n  let isDragging = false;\n  let dragTimeout = null;\n\n  dom.player.progress.addEventListener("mousedown", () => {\n    isDragging = true;\n    isUserSeeking = true;\n  });\n  dom.player.progress.addEventListener("input", function (e) {\n    const dur = dom.audio.duration;\n    if (!dur || isNaN(dur)) return;\n    const seekPercentage = parseFloat(this.value) / 100;\n    const targetTime = seekPercentage * dur;\n    dom.player.progressFill.style.width = `${this.value}%`;\n    dom.player.curTime.textContent = formatTime(targetTime);\n    if (isDragging) {\n      clearTimeout(dragTimeout);\n      dragTimeout = setTimeout(() => {\n        dom.audio.currentTime = targetTime;\n      }, 100);\n    }\n  });\n  dom.player.progress.addEventListener("mouseup", function (e) {\n    if (!isDragging) return;\n    isDragging = false;\n    const dur = dom.audio.duration;\n    if (!dur || isNaN(dur)) return;\n    const seekPercentage = parseFloat(this.value) / 100;\n    dom.audio.currentTime = seekPercentage * dur;\n  });\n  dom.player.progress.addEventListener("touchstart", () => {\n    isDragging = true;\n    isUserSeeking = true;\n  });\n  dom.player.progress.addEventListener("touchend", function () {\n    isDragging = false;\n    const dur = dom.audio.duration;\n    if (!dur || isNaN(dur)) return;\n    const seekPercentage = parseFloat(this.value) / 100;\n    dom.audio.currentTime = seekPercentage * dur;\n  });\n  dom.player.progressOuter.addEventListener("click", function (e) {\n    if (e.target === dom.player.progress) return;\n    const dur = dom.audio.duration;\n    if (!dur || isNaN(dur)) return;\n    isUserSeeking = true;\n    const rect = this.getBoundingClientRect();\n    const clickX = e.clientX - rect.left;\n    const seekPercentage = Math.max(0, Math.min(1, clickX / this.offsetWidth));\n    dom.audio.currentTime = seekPercentage * dur;\n    dom.player.progress.value = seekPercentage * 100;\n    dom.player.progressFill.style.width = `${seekPercentage * 100}%`;\n  });\n\n  dom.views.collapsed.onclick = () => toggleExpand(true);\n  $("#gmp-collapse-btn").onclick = () => toggleExpand(false);\n  dom.player.playBtn.onclick = togglePlay;\n  $("#gmp-next-btn").onclick = () => nextTrack(true, true);\n  $("#gmp-prev-btn").onclick = prevTrack;\n  dom.player.modeBtn.onclick = switchMode;\n  $("#gmp-playlist-btn").onclick = () => switchView("playlist");\n  dom.searchBtn.onclick = () => {\n    switchView("search");\n    updateSearchListHighlight();\n  };\n  $("#gmp-album-art-wrapper").onclick = () => switchView("lyrics");\n  $("#gmp-search-back-btn").onclick = () => switchView("player");\n  $("#gmp-lyrics-back-btn").onclick = () => switchView("player");\n  $("#gmp-playlist-back-btn").onclick = () => switchView("player");\n  $("#gmp-playlist-clear-btn").onclick = () => {\n    state.playlist = [];\n    state.currentIndex = 0;\n    dom.audio.pause();\n    dom.audio.src = "";\n    renderPlaylist();\n    resetPlayerUI();\n  };\n  dom.contents.lyrics.addEventListener("click", (e) => {\n    if (e.target.closest("#gmp-lyrics-back-btn")) return;\n    switchView("player");\n  });\n\n  function showPopover(target, items) {\n    $(".gmp-popover-menu")?.remove();\n    const menu = document.createElement("div");\n    menu.className = "gmp-popover-menu";\n    menu.innerHTML = items\n      .map(\n        (item) =>\n          `<div class="gmp-menu-item" data-action="${item.text}">${item.text}</div>`,\n      )\n      .join("");\n    document.body.appendChild(menu);\n    menu.onclick = (e) => {\n      const action = e.target.dataset.action;\n      items.find((i) => i.text === action)?.action();\n      menu.remove();\n    };\n    const rect = target.getBoundingClientRect();\n    menu.style.top = `${rect.bottom + 5}px`;\n    menu.style.right = `${window.innerWidth - rect.right}px`;\n    setTimeout(() => {\n      document.addEventListener("click", () => menu.remove(), { once: true });\n    }, 0);\n  }\n\n  async function doSearch() {\n    const query = dom.search.input.value.trim();\n    if (!query) return;\n    showLoader(true);\n    const container = dom.search.results;\n    container.innerHTML = "";\n    try {\n      const neteasePromise = fetch(\n        `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=netease`,\n      ).then((r) => r.json());\n      const tencentPromise = fetch(\n        `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=tencent`,\n      ).then((r) => r.json());\n      const kuwoPromise = fetch(\n        `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(query)}&source=kuwo`,\n      ).then((r) => r.json());\n      const [neteaseRes, tencentRes, kuwoRes] = await Promise.allSettled([\n        neteasePromise,\n        tencentPromise,\n        kuwoPromise,\n      ]);\n      let results = [];\n      if (neteaseRes.status === "fulfilled" && neteaseRes.value?.data) {\n        results = results.concat(\n          neteaseRes.value.data.map((item) => ({\n            id: item.id,\n            name: item.song,\n            artist: [item.singer],\n            coverUrl: item.cover,\n            source: "Netease",\n          })),\n        );\n      }\n      if (tencentRes.status === "fulfilled" && tencentRes.value?.data) {\n        results = results.concat(\n          tencentRes.value.data.map((item) => ({\n            id: item.id,\n            name: item.song,\n            artist: [item.singer],\n            coverUrl: item.cover,\n            source: "Tencent",\n          })),\n        );\n      }\n      if (kuwoRes.status === "fulfilled" && kuwoRes.value?.data) {\n        results = results.concat(\n          kuwoRes.value.data.map((item) => ({\n            id: item.id,\n            name: item.song || item.name,\n            artist: [item.singer || item.artist],\n            coverUrl: item.cover || item.pic,\n            source: "Kuwo",\n          })),\n        );\n      }\n      const seen = new Set();\n      results = results.filter((track) => {\n        const key = `${(track.name || "").toLowerCase()}-${(track.artist || []).join(",").toLowerCase()}`;\n        if (seen.has(key)) return false;\n        seen.add(key);\n        return true;\n      });\n      container.innerHTML =\n        results.length > 0\n          ? results\n              .map((track) => {\n                const safeTrackData = JSON.stringify(track).replace(/\'/g, "\'");\n                return `<div class="gmp-list-item gmp-search-item" data-track=\'${safeTrackData}\'><div class="gmp-list-item-bg"></div><div class="gmp-list-item-content"><div class="gmp-list-item-art-wrapper"><img class="gmp-search-item-art" src="${track.coverUrl || PLACEHOLDER_IMG}" alt="art"></div><div class="gmp-list-info"><div class="gmp-list-title">${track.name}</div><div class="gmp-list-artist">${Array.isArray(track.artist) ? track.artist.join(" / ") : track.artist} · ${track.source}</div></div></div><button class="gmp-icon-btn gmp-list-menu-btn"><svg viewBox="0 0 16 16"><path d="M8,10c1.1,0,2-0.9,2-2s-0.9-2-2-2S6,6.9,6,8S6.9,10,8,10z M8,4C6.9,4,6,4.9,6,6s0.9,2,2,2s2-0.9,2-2S9.1,4,8,4z M8,12 c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9.1,12,8,12z"/></svg></button></div>`;\n              })\n              .join("")\n          : \'<div style="padding:20px;text-align:center;opacity:0.6">未找到结果</div>\';\n      updateSearchListHighlight();\n    } catch (e) {\n      error("搜索失败:", e);\n      container.innerHTML =\n        \'<div style="padding:20px;text-align:center;opacity:0.6">搜索失败</div>\';\n    } finally {\n      showLoader(false);\n    }\n  }\n\n  dom.search.input.onkeydown = (e) => {\n    e.stopPropagation();\n    if (e.key === "Enter") doSearch();\n  };\n  dom.search.input.oninput = () => {\n    dom.search.clearBtn.style.display = dom.search.input.value\n      ? "flex"\n      : "none";\n  };\n  dom.search.clearBtn.onclick = () => {\n    dom.search.input.value = "";\n    dom.search.clearBtn.style.display = "none";\n    dom.search.input.focus();\n  };\n  dom.search.submitBtn.onclick = doSearch;\n\n  dom.search.results.addEventListener("click", (e) => {\n    const item = e.target.closest(".gmp-search-item");\n    if (!item) return;\n    const track = JSON.parse(item.dataset.track);\n    if (e.target.closest(".gmp-list-menu-btn")) {\n      e.stopPropagation();\n      showPopover(e.target, [\n        {\n          text: "下一首播放",\n          action: () => {\n            state.playlist.splice(state.currentIndex + 1, 0, track);\n            renderPlaylist();\n          },\n        },\n        {\n          text: "添加到末尾",\n          action: () => {\n            state.playlist.push(track);\n            renderPlaylist();\n          },\n        },\n      ]);\n    } else {\n      const newIndex = state.playlist.length > 0 ? state.currentIndex + 1 : 0;\n      state.playlist.splice(newIndex, 0, track);\n      loadTrack(newIndex);\n      switchView("player");\n    }\n  });\n\n  if (typeof ThemeUtils !== "undefined") {\n    window.addEventListener("message", async (event) => {\n      if (event.data?.source !== "typing-indicator-host") return;\n      const { type, data } = event.data;\n      if (type === "append-songs-to-playlist") {\n        if (data && Array.isArray(data) && data.length > 0) {\n          state.playlist.push(...data);\n          renderPlaylist();\n          if (!state.isPlaying && state.playlist.length === data.length) {\n            loadTrack(0);\n          }\n        }\n        return;\n      } else if (type === "update-songs-from-message") {\n        if (data && data.messageId !== undefined && Array.isArray(data.songs)) {\n          const messageId = data.messageId;\n          const newSongs = data.songs;\n          state.playlist = state.playlist.filter(\n            (track) => track.sourceMessageId !== messageId,\n          );\n          if (newSongs.length > 0) {\n            state.playlist.push(...newSongs);\n          }\n          renderPlaylist();\n        }\n        return;\n      } else if (type === "toggle-playback") {\n        if (dom.audio.paused) {\n          dom.audio.play().catch((e) => {\n            if (e.name === "AbortError") return;\n            warn("播放失败:", e);\n          });\n        } else {\n          dom.audio.pause();\n        }\n        return;\n      } else if (type === "set-initial-playlist" || type === "context-update") {\n        if (data.charName) dom.collapsed.charName.textContent = data.charName;\n        if (data.charAvatarUrl) dom.collapsed.avatar.src = data.charAvatarUrl;\n        if (data.playlist) {\n          const newPlaylist = normalizePlaylist(data.playlist);\n          const wasEmpty = state.playlist.length === 0;\n\n          if (JSON.stringify(state.playlist) !== JSON.stringify(newPlaylist)) {\n            state.playlist = newPlaylist;\n            renderPlaylist();\n            if (\n              wasEmpty &&\n              state.playlist.length > 0 &&\n              !state.isPlaying &&\n              !bufferState.isBuffering\n            ) {\n              loadTrack(0, false);\n            } else if (state.playlist.length === 0) {\n              dom.audio.pause();\n              dom.audio.src = "";\n              dom.player.title.textContent = "G-PLAYER.EXE";\n              dom.player.artist.textContent = "";\n            }\n          }\n        }\n        return;\n      } else if (type === "play-now") {\n        if (data) {\n          const trackData = {\n            ...data,\n            name: data.name || data.title,\n            artist: Array.isArray(data.artist) ? data.artist : [data.artist],\n            _fromCache: true,\n          };\n          if (state.playlist.length === 0) {\n            state.playlist.push(trackData);\n            loadTrack(0, true);\n          } else {\n            const newIndex = state.currentIndex + 1;\n            state.playlist.splice(newIndex, 0, trackData);\n            loadTrack(newIndex, true);\n          }\n          renderPlaylist();\n        }\n        return;\n      } else if (type === "play-by-info") {\n        const { title, artist } = data;\n        if (!title || !artist) return;\n        const normalize = (str) => {\n          if (!str) return "";\n          return str\n            .toLowerCase()\n            .replace(/\\s*[\\(\\（].*?[\\)\\）]\\s*/g, "")\n            .replace(/\\s*\\[.*?\\]\\s*/g, "")\n            .replace(/[-_]/g, " ")\n            .replace(/\\s+/g, " ")\n            .trim();\n        };\n        const fuzzyMatch = (bubbleTitle, bubbleArtist, track) => {\n          if (!track) return false;\n          const normalizedTitle = normalize(bubbleTitle);\n          const normalizedArtist = normalize(bubbleArtist);\n          const trackTitles = [\n            track.name,\n            track.title,\n            track.originalTitle,\n            track.song,\n          ]\n            .filter(Boolean)\n            .map(normalize);\n          const trackArtists = [\n            ...(Array.isArray(track.artist) ? track.artist : [track.artist]),\n            track.originalArtist,\n            track.singer,\n          ]\n            .filter(Boolean)\n            .map((a) => normalize(String(a)));\n          const titleMatch = trackTitles.some(\n            (t) =>\n              t === normalizedTitle ||\n              t.includes(normalizedTitle) ||\n              normalizedTitle.includes(t),\n          );\n          const artistMatch = trackArtists.some(\n            (a) =>\n              a === normalizedArtist ||\n              a.includes(normalizedArtist) ||\n              normalizedArtist.includes(a),\n          );\n          return titleMatch && artistMatch;\n        };\n        const existingIndex = state.playlist.findIndex((track) =>\n          fuzzyMatch(title, artist, track),\n        );\n        if (existingIndex !== -1) {\n          log(`歌单中找到匹配: ${title}, 索引: ${existingIndex}`);\n          if (existingIndex === state.currentIndex && dom.audio.src) {\n            if (dom.audio.paused) {\n              dom.audio.play().catch((e) => {\n                if (e.name === "AbortError") return;\n                warn("播放失败:", e);\n              });\n            } else {\n              dom.audio.pause();\n            }\n            return;\n          }\n          loadTrack(existingIndex, true);\n        } else {\n          log(`歌单中未找到，开始多源搜索: ${title} - ${artist}`);\n          showLoader(true);\n          try {\n            const sources = ["tencent", "netease", "kuwo"];\n            let foundTrack = null;\n            let audioUrl = null;\n            let lyricData = { lyric: null, tlyric: null };\n            for (const source of sources) {\n              try {\n                log(`尝试 ${source} 源搜索...`);\n                const searchRes = await fetch(\n                  `/api/plugins/g-player-proxy/search?query=${encodeURIComponent(`${title} ${artist}`)}&source=${source}`,\n                );\n                const searchData = await searchRes.json();\n                if (!searchData?.data || searchData.data.length === 0) {\n                  log(`${source} 无结果，尝试下一个源...`);\n                  continue;\n                }\n                const normalizedRequestArtist = normalize(artist);\n                let track = searchData.data.find((item) => {\n                  const itemArtist = normalize(item.singer || item.artist || "");\n                  return (\n                    itemArtist.includes(normalizedRequestArtist) ||\n                    normalizedRequestArtist.includes(itemArtist)\n                  );\n                });\n                if (!track) {\n                  log(`${source} 无匹配歌手 "${artist}"，跳过...`);\n                  continue;\n                }\n                const trackId = track.id || track.rid;\n                log(`${source} 搜索成功，获取音频URL...`);\n                const songRes = await fetch(\n                  `/api/plugins/g-player-proxy/song?id=${trackId}&source=${source}`,\n                );\n                const songData = await songRes.json();\n                if (songData?._needFallback) {\n                  log(`${source} 返回换源标记，跳过...`);\n                  continue;\n                }\n                if (source === "netease") {\n                  if (songData?.data?.[0]?.url) {\n                    audioUrl = songData.data[0].url;\n                    lyricData.lyric = songData.data[0].lyric || "";\n                    lyricData.tlyric = songData.data[0].tlyric || "";\n                  } else if (songData?.url) {\n                    audioUrl = songData.url;\n                    lyricData.lyric = songData.lyric || "";\n                  }\n                  if (!lyricData.lyric) {\n                    try {\n                      const lyricRes = await fetch(\n                        `/api/plugins/g-player-proxy/lyric?id=${trackId}&source=netease`,\n                      );\n                      const lyricJson = await lyricRes.json();\n                      if (lyricJson?.data) {\n                        lyricData.lyric = lyricJson.data.lrc || "";\n                        lyricData.tlyric = lyricJson.data.tlyric || "";\n                      }\n                    } catch (e) {\n                      warn(`netease 歌词单独请求失败`);\n                    }\n                  }\n                } else if (source === "kuwo") {\n                  if (songData?.data?.url) {\n                    audioUrl = songData.data.url;\n                    lyricData.lyric = songData.data.lrc || "";\n                  }\n                } else if (source === "tencent") {\n                  audioUrl = songData?.data?.url;\n                  try {\n                    const lyricRes = await fetch(\n                      `/api/plugins/g-player-proxy/lyric?id=${trackId}&source=tencent`,\n                    );\n                    const lyricJson = await lyricRes.json();\n                    if (lyricJson?.data) {\n                      lyricData.lyric = lyricJson.data.lrc || "";\n                      lyricData.tlyric =\n                        lyricJson.data.tlyric || lyricJson.data.trans || "";\n                    }\n                  } catch (e) {\n                    warn(`${source} 歌词获取失败`);\n                  }\n                }\n                if (!audioUrl || audioUrl.includes(".mp4")) {\n                  log(`${source} 音频无效或是mp4格式，跳过...`);\n                  continue;\n                }\n                const duration = await getAudioDurationQuick(audioUrl);\n                if (duration !== null && duration <= 35) {\n                  log(\n                    `${source} 检测到试听版 (${duration.toFixed(1)}s)，跳过...`,\n                  );\n                  continue;\n                }\n                foundTrack = {\n                  id: trackId,\n                  name: track.song || track.name || title,\n                  artist: [track.singer || track.artist || artist],\n                  coverUrl: track.cover || track.pic || "",\n                  source: source.charAt(0).toUpperCase() + source.slice(1),\n                  originalTitle: title,\n                  originalArtist: artist,\n                  audioUrl: audioUrl,\n                  lyricsContent: lyricData.lyric || "",\n                  tlyricContent: lyricData.tlyric || "",\n                  _fromCache: false,\n                };\n                log(`✓ ${source} 完整获取成功`);\n                break;\n              } catch (e) {\n                warn(`${source} 搜索/获取失败:`, e.message);\n              }\n            }\n            if (foundTrack) {\n              const newIndex =\n                state.playlist.length > 0 ? state.currentIndex + 1 : 0;\n              state.playlist.splice(newIndex, 0, foundTrack);\n              renderPlaylist();\n              loadTrack(newIndex, true);\n            } else {\n              warn("所有源搜索都无结果或无有效音频");\n              dom.player.title.textContent = "未找到可播放的音源";\n              setTimeout(() => {\n                const currentTrack = state.playlist[state.currentIndex];\n                if (currentTrack) {\n                  dom.player.title.textContent = currentTrack.name;\n                }\n              }, 2000);\n            }\n          } catch (e) {\n            error("搜索失败:", e);\n          } finally {\n            showLoader(false);\n          }\n        }\n        return;\n      } else if (type === "audio-url-refreshed") {\n        if (data && data.trackIndex !== undefined) {\n          const { audioUrl, trackIndex } = data;\n          if (trackIndex < 0 || trackIndex >= state.playlist.length) return;\n          if (audioUrl) {\n            log(`✓ 收到主机刷新的URL，用于轨道 ${trackIndex}`);\n            state.playlist[trackIndex].audioUrl = audioUrl;\n            if (trackIndex === state.currentIndex) {\n              log("立即应用新URL并尝试播放...");\n              const finalUrl = getProxyUrl(audioUrl);\n              const currentTime = dom.audio.currentTime;\n              dom.audio.src = finalUrl;\n              dom.audio.addEventListener(\n                "loadedmetadata",\n                () => {\n                  if (currentTime > 0.5) {\n                    dom.audio.currentTime = currentTime;\n                  }\n                  dom.audio.play().catch((e) => error("刷新后播放失败:", e));\n                },\n                { once: true },\n              );\n            }\n          } else {\n            warn(`主机刷新URL失败，返回空链接。备用源逻辑将继续。`);\n          }\n        }\n        return;\n      } else if (type === "graceful-shutdown-request") {\n        dom.audio.pause();\n        ThemeUtils.sendMessage("graceful-shutdown-response");\n      }\n    });\n    (async () => {\n      toggleExpand(false);\n      dom.collapsed.avatar.src = ThemeUtils.getCharAvatar() || "";\n      dom.collapsed.charName.textContent = "G-PLAYER.EXE";\n    })();\n  } else {\n    toggleExpand(false);\n    dom.collapsed.avatar.src =\n      "https://i.postimg.cc/8zQsfgMv/cb5972985b4893db3ce9ce638dd8f5aa.jpg";\n    dom.collapsed.charName.textContent = "G-Player";\n  }\n  if (typeof ThemeUtils !== "undefined") {\n    ThemeUtils.sendMessage("player-initialized");\n  }\n});',
    sizes: {
      draggable: {
        width: "80px",
        height: "100px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "snow",
    name: "飘雪",
    useIframe: true,
    css: "",
    html: '<div class="ss-container">\n    <canvas id="ss-canvas"></canvas>\n    <div class="ss-indicator-text">\n        <span class="ss-char-name">{{char}}</span> is thinking...\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,300;1,400&display=swap');\n\n:root {\n    --ss-text-color: #f0f8ff; \n    --ss-glow-color: rgba(173, 216, 230, 0.7); \n}\n\n.ss-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    pointer-events: auto;\n}\n\n#ss-canvas {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.ss-indicator-text {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 2;\n    color: var(--ss-text-color);\n    font-family: 'Lato', sans-serif; \n    font-size: 22px;\n    font-weight: 300;\n    font-style: italic;\n    white-space: nowrap;\n    pointer-events: auto;\n    \n    text-shadow: \n        0 0 5px var(--ss-text-color),\n        0 0 12px var(--ss-glow-color),\n        0 0 25px var(--ss-glow-color);\n    \n    animation: ss-fade-in 3s ease-out;\n}\n\n.ss-char-name {\n    font-weight: 400;\n}\n\n@keyframes ss-fade-in {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}\n\n@media (max-width: 600px) {\n    .ss-indicator-text {\n        font-size: 18px;\n    }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("set-overlay-mode");\n  ThemeUtils.sendMessage("register-stateful-theme");\n\n  const canvas = ThemeUtils.$("#ss-canvas");\n  const container = ThemeUtils.$(".ss-container");\n  const ctx = canvas.getContext("2d");\n  const charNameEl = ThemeUtils.$(".ss-char-name");\n\n  let animationFrameId;\n  let debounceTimer;\n  let resizeObserver;\n\n    window.addEventListener("message", (event) => {\n      if (event.data?.source === "typing-indicator-host") {\n        if (event.data.type === "context-update" && event.data.data) {\n          if (event.data.data.charName) {\n            window.themeData.charName = event.data.data.charName;\n          }\n          if (event.data.data.userName) {\n            window.themeData.userName = event.data.data.userName;\n          }\n          if (event.data.data.charAvatarUrl) {\n            window.themeData.charAvatarUrl = event.data.data.charAvatarUrl;\n          }\n          if (event.data.data.userAvatarUrl) {\n            window.themeData.userAvatarUrl = event.data.data.userAvatarUrl;\n          }\n          if (charNameEl) {\n            charNameEl.textContent = window.themeData.charName;\n          }\n        }\n      }\n    });\n\n  if (charNameEl) {\n    charNameEl.textContent = ThemeUtils.getCharacterName();\n  }\n\n  let snowflakes = [];\n\n  class Snowflake {\n    constructor() {\n      this.reset();\n    }\n    reset() {\n      this.x = Math.random() * canvas.width;\n      this.y = Math.random() * -canvas.height;\n      this.opacity = Math.random() * 0.7 + 0.3;\n      this.radius = this.opacity * 3;\n      this.speed = this.opacity * 1.5 + 0.5;\n      this.sway = Math.random() * Math.PI * 2;\n      this.swaySpeed = Math.random() * 0.02;\n    }\n    update() {\n      this.y += this.speed;\n      this.sway += this.swaySpeed;\n      this.x += Math.sin(this.sway) * 0.3;\n      if (this.y > canvas.height + this.radius) {\n        this.reset();\n        this.y = -this.radius;\n      }\n    }\n    draw() {\n      ctx.beginPath();\n      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;\n      ctx.shadowColor = "rgba(200, 220, 255, 0.8)";\n      ctx.shadowBlur = 10;\n      ctx.fill();\n      ctx.closePath();\n      ctx.shadowBlur = 0;\n    }\n  }\n\n  function setup() {\n    const rect = container.getBoundingClientRect();\n    canvas.width = rect.width;\n    canvas.height = rect.height;\n    snowflakes = [];\n    const numberOfFlakes = Math.floor(canvas.width / 5);\n    for (let i = 0; i < numberOfFlakes; i++) {\n      snowflakes.push(new Snowflake());\n    }\n  }\n\n  function animate() {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    snowflakes.forEach((flake) => {\n      flake.update();\n      flake.draw();\n    });\n    animationFrameId = requestAnimationFrame(animate);\n  }\n  resizeObserver = new ResizeObserver(() => {\n    clearTimeout(debounceTimer);\n    debounceTimer = setTimeout(setup, 100);\n  });\n\n  if (container) {\n    resizeObserver.observe(container);\n    setup();\n    animate();\n  }\n  window.addEventListener("message", (event) => {\n    if (\n      event.data?.source === "typing-indicator-host" &&\n      event.data?.type === "graceful-shutdown-request"\n    ) {\n      if (animationFrameId) {\n        cancelAnimationFrame(animationFrameId);\n      }\n      clearTimeout(debounceTimer);\n      if (resizeObserver) {\n        resizeObserver.disconnect();\n      }\n      ThemeUtils.sendMessage("graceful-shutdown-response");\n    }\n  });\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "cherry_blossoms",
    name: "樱落",
    useIframe: true,
    css: "",
    html: '<div class="pr-container">\n    <img id="pr-background" src="https://i.imgur.com/EuN3LB8.png" alt="background">\n    <canvas id="pr-canvas"></canvas>\n    <div class="pr-indicator-text">\n        <span class="pr-char-name">{{char}}</span> is writing a reply...\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');\n\n:root {\n    --pr-text-color: #fff;\n    --pr-glow-color-1: rgba(236, 155, 178, 0.8);\n    --pr-glow-color-2: rgba(255, 220, 230, 0.6);\n}\n\n.pr-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    pointer-events: auto;\n}\n\n#pr-background {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    z-index: 0;\n    pointer-events: none;\n    opacity: 0.7;// 背景樱花透明度\n}\n\n#pr-canvas {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.pr-indicator-text {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 2;\n    color: var(--pr-text-color);\n    font-family: 'Playfair Display', serif;\n    font-size: 26px;\n    font-style: italic;\n    white-space: nowrap;\n    pointer-events: auto;\n    text-shadow: \n        0 0 4px rgba(0, 0, 0, 0.5),\n        0 0 8px var(--pr-text-color),\n        0 0 16px var(--pr-glow-color-1),\n        0 0 32px var(--pr-glow-color-1),\n        0 0 48px var(--pr-glow-color-2);\n    \n    animation: pr-text-fade-in 2.5s ease-out;\n}\n\n.pr-char-name {\n    font-weight: 700;\n}\n\n@keyframes pr-text-fade-in {\n    from { opacity: 0; transform: translate(-50%, -45%); }\n    to { opacity: 1; transform: translate(-50%, -50%); }\n}\n\n@media (max-width: 600px) {\n    .pr-indicator-text {\n        font-size: 20px;\n    }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n    ThemeUtils.sendMessage("set-overlay-mode");\n    ThemeUtils.sendMessage("register-stateful-theme");\n\n    const canvas = ThemeUtils.$("#pr-canvas");\n    const container = ThemeUtils.$(".pr-container");\n    const ctx = canvas.getContext("2d");\n    const charNameEl = ThemeUtils.$(".pr-char-name");\n\n    window.addEventListener("message", (event) => {\n        if (event.data?.source === "typing-indicator-host") {\n            if (event.data.type === "context-update" && event.data.data) {\n                if (event.data.data.charName) {\n                    window.themeData.charName = event.data.data.charName;\n                }\n                if (event.data.data.userName) {\n                    window.themeData.userName = event.data.data.userName;\n                }\n                if (event.data.data.charAvatarUrl) {\n                    window.themeData.charAvatarUrl = event.data.data.charAvatarUrl;\n                }\n                if (event.data.data.userAvatarUrl) {\n                    window.themeData.userAvatarUrl = event.data.data.userAvatarUrl;\n                }\n                if (charNameEl) {\n                    charNameEl.textContent = window.themeData.charName;\n                }\n            }\n        }\n    });\n\n    if (charNameEl) {\n        charNameEl.textContent = ThemeUtils.getCharacterName();\n    }\n\n    let petals = [];\n    const petalImages = [];\n    const petalImageUrls = [\n        "https://i.imgur.com/hjq06Ub.png",\n        "https://i.imgur.com/fldjuCX.png",\n        "https://i.imgur.com/Jgal7zL.png",\n        "https://i.imgur.com/klrYZkn.png",\n        "https://i.imgur.com/2Moy30B.png",\n    ];\n    let imagesLoaded = 0;\n    let animationFrameId = null;\n    let creationIntervalId = null;\n    let resizeDebounceTimer = null;\n\n    petalImageUrls.forEach((url) => {\n        const img = new Image();\n        img.src = url;\n        img.onload = () => {\n            imagesLoaded++;\n            if (imagesLoaded === petalImageUrls.length) {\n                requestAnimationFrame(setupAndStart);\n            }\n        };\n        petalImages.push(img);\n    });\n\n    function setupAndStart() {\n        setup();\n        animate();\n    }\n\n    class Petal {\n        constructor() {\n            this.reset();\n        }\n        reset() {\n            const randomIndex = Math.floor(Math.random() * petalImages.length);\n            this.img = petalImages[randomIndex];\n            this.x = Math.random() * canvas.width;\n            this.y = Math.random() * -canvas.height;\n            if (randomIndex <= 1) {\n                this.size = Math.random() * 20 + 25;\n            } else if (randomIndex <= 3) {\n                this.size = Math.random() * 15 + 15;\n            } else {\n                this.size = Math.random() * 10 + 10;\n            }\n            this.speed = Math.random() * 1.2 + 0.6;\n            this.rotation = Math.random() * 360;\n            this.rotationSpeed = Math.random() * 0.5 - 0.25;\n            this.sway = Math.random() * Math.PI * 2;\n            this.swaySpeed = Math.random() * 0.03 + 0.01;\n        }\n        update() {\n            this.y += this.speed;\n            this.rotation += this.rotationSpeed;\n            this.sway += this.swaySpeed;\n            this.x += Math.sin(this.sway) * 0.5;\n            if (this.y > canvas.height + this.size) {\n                this.reset();\n                this.y = -this.size;\n            }\n        }\n        draw() {\n            ctx.save();\n            ctx.translate(this.x, this.y);\n            ctx.rotate((this.rotation * Math.PI) / 180);\n            ctx.drawImage(\n                this.img,\n                -this.size / 2,\n                -this.size / 2,\n                this.size,\n                this.size\n            );\n            ctx.restore();\n        }\n    }\n\n    function setup() {\n        if (creationIntervalId) {\n            clearInterval(creationIntervalId);\n            creationIntervalId = null;\n        }\n        const rect = container.getBoundingClientRect();\n        canvas.width = rect.width;\n        canvas.height = rect.height;\n        petals = [];\n        const totalPetals = Math.floor(canvas.width / 8);\n        let createdPetals = 0;\n        creationIntervalId = setInterval(() => {\n            const batchSize = Math.ceil(totalPetals / 20);\n            for (let i = 0; i < batchSize && createdPetals < totalPetals; i++) {\n                petals.push(new Petal());\n                createdPetals++;\n            }\n            if (createdPetals >= totalPetals) {\n                clearInterval(creationIntervalId);\n                creationIntervalId = null;\n            }\n        }, 50);\n    }\n\n    function animate() {\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        petals.forEach((petal) => {\n            petal.update();\n            petal.draw();\n        });\n        animationFrameId = requestAnimationFrame(animate);\n    }\n\n    const resizeObserver = new ResizeObserver(() => {\n        clearTimeout(resizeDebounceTimer);\n        resizeDebounceTimer = setTimeout(setup, 100);\n    });\n\n    if (container) {\n        resizeObserver.observe(container);\n    }\n\n    window.addEventListener("message", (event) => {\n        const msg = event.data;\n        if (\n            msg?.source === "typing-indicator-host" &&\n            msg?.type === "graceful-shutdown-request"\n        ) {\n            if (animationFrameId) {\n                cancelAnimationFrame(animationFrameId);\n                animationFrameId = null;\n            }\n            if (creationIntervalId) {\n                clearInterval(creationIntervalId);\n                creationIntervalId = null;\n            }\n            if (resizeDebounceTimer) {\n                clearTimeout(resizeDebounceTimer);\n                resizeDebounceTimer = null;\n            }\n            resizeObserver.disconnect();\n            ThemeUtils.sendMessage("graceful-shutdown-response");\n        }\n    });\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "rain",
    name: "雨",
    useIframe: true,
    css: "",
    html: '<div class="rd-container">\n    <canvas id="rd-canvas"></canvas>\n</div>',
    iframeCSS:
      ".rd-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    pointer-events: auto;\n    background-color: rgba(10, 20, 40, 0.1);\n}\n\n#rd-canvas {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("set-overlay-mode");\n\n  const canvas = ThemeUtils.$("#rd-canvas");\n  const container = ThemeUtils.$(".rd-container");\n  const ctx = canvas.getContext("2d", { alpha: true });\n  const charNameEl = ThemeUtils.$(".rd-char-name");\n\n  if (charNameEl) {\n    charNameEl.textContent = ThemeUtils.getCharacterName();\n  }\n\n  const CONFIG = {\n    MAX_DROPS: 150,\n    DROPS_PER_WIDTH: 0.4,\n    Z_LAYERS: 5,\n    TARGET_FPS: 45,\n  };\n\n  const FRAME_INTERVAL = 1000 / CONFIG.TARGET_FPS;\n\n  let raindrops = [];\n  let animationFrameId;\n  let lastFrameTime = 0;\n  let canvasWidth = 0;\n  let canvasHeight = 0;\n  class Raindrop {\n    constructor() {\n      this.reset(true);\n    }\n\n    reset(initial = false) {\n      this.x = Math.random() * canvasWidth;\n      this.y = initial ? Math.random() * -canvasHeight : -20;\n      this.z = Math.random() * 0.8 + 0.2;\n      this.len = this.z * 15;\n      this.speed = this.z * 12 + 5;\n      this.width = this.z * 1.5;\n      this.alpha = this.z * 0.7;\n      this.layerIndex = Math.floor(this.z * CONFIG.Z_LAYERS);\n    }\n\n    update() {\n      this.y += this.speed;\n      if (this.y > canvasHeight + this.len) {\n        this.reset();\n      }\n    }\n  }\n\n  const layerColors = [];\n  function initLayerColors() {\n    layerColors.length = 0;\n    for (let i = 0; i < CONFIG.Z_LAYERS; i++) {\n      const alpha = ((i + 1) / CONFIG.Z_LAYERS) * 0.7;\n      layerColors.push(`rgba(174, 194, 224, ${alpha.toFixed(2)})`);\n    }\n  }\n  function setup() {\n    const rect = container.getBoundingClientRect();\n    canvasWidth = rect.width;\n    canvasHeight = rect.height;\n    canvas.width = canvasWidth;\n    canvas.height = canvasHeight;\n\n    initLayerColors();\n    const numberOfDrops = Math.min(\n      Math.floor(canvasWidth * CONFIG.DROPS_PER_WIDTH),\n      CONFIG.MAX_DROPS,\n    );\n    while (raindrops.length > numberOfDrops) {\n      raindrops.pop();\n    }\n    while (raindrops.length < numberOfDrops) {\n      raindrops.push(new Raindrop());\n    }\n    raindrops.forEach((drop) => drop.reset(true));\n  }\n\n  function draw() {\n    ctx.clearRect(0, 0, canvasWidth, canvasHeight);\n    for (let layer = 0; layer < CONFIG.Z_LAYERS; layer++) {\n      ctx.beginPath();\n      ctx.strokeStyle = layerColors[layer];\n      ctx.lineWidth = ((layer + 1) / CONFIG.Z_LAYERS) * 1.5;\n      ctx.lineCap = "round";\n      for (let i = 0; i < raindrops.length; i++) {\n        const drop = raindrops[i];\n        if (drop.layerIndex === layer) {\n          ctx.moveTo(drop.x, drop.y);\n          ctx.lineTo(drop.x, drop.y + drop.len);\n        }\n      }\n      ctx.stroke();\n    }\n  }\n\n  function animate(currentTime) {\n    animationFrameId = requestAnimationFrame(animate);\n\n    const deltaTime = currentTime - lastFrameTime;\n    if (deltaTime < FRAME_INTERVAL) return;\n    lastFrameTime = currentTime - (deltaTime % FRAME_INTERVAL);\n    for (let i = 0; i < raindrops.length; i++) {\n      raindrops[i].update();\n    }\n\n    draw();\n  }\n\n  let resizeDebounce;\n  const resizeObserver = new ResizeObserver(() => {\n    clearTimeout(resizeDebounce);\n    resizeDebounce = setTimeout(setup, 150);\n  });\n  if (container) {\n    resizeObserver.observe(container);\n    setup();\n    requestAnimationFrame(animate);\n  }\n  window.addEventListener("message", (event) => {\n    const msg = event.data;\n    if (\n      msg?.source === "typing-indicator-host" &&\n      msg?.type === "graceful-shutdown-request"\n    ) {\n      cancelAnimationFrame(animationFrameId);\n      clearTimeout(resizeDebounce);\n      resizeObserver.disconnect();\n      raindrops.length = 0;\n      ThemeUtils.sendMessage("graceful-shutdown-response");\n    }\n  });\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "firefly",
    name: "萤火",
    useIframe: true,
    css: "",
    html: '<div class="ff-container">\n    <canvas id="ff-canvas"></canvas>\n    <div class="ff-indicator-text">\n        <span class="ff-char-name">{{char}}</span> is whispering...\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400&display=swap');\n\n.ff-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    pointer-events: auto;\n}\n\n#ff-canvas {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.ff-indicator-text {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 2;\n    color: #f5f5dc;\n    font-family: 'Cormorant Garamond', serif;\n    font-size: 24px;\n    font-weight: 300;\n    font-style: italic;\n    white-space: nowrap;\n    pointer-events: auto;\n    opacity: 0.8;\n    text-shadow: \n        0 0 2px rgba(0,0,0,0.7),\n        0 0 8px rgba(255, 255, 150, 0.8),\n        0 0 16px rgba(255, 230, 100, 0.6);\n    \n    animation: ff-pulse 5s infinite ease-in-out;\n}\n\n.ff-char-name {\n    font-weight: 400;\n}\n\n@keyframes ff-pulse {\n    0%, 100% { opacity: 0.7; }\n    50% { opacity: 0.9; }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n    ThemeUtils.sendMessage("set-overlay-mode");\n    ThemeUtils.sendMessage("register-stateful-theme");\n\n    const canvas = ThemeUtils.$("#ff-canvas");\n    const container = ThemeUtils.$(".ff-container");\n    const ctx = canvas.getContext("2d");\n    const charNameEl = ThemeUtils.$(".ff-char-name");\n    let animationFrameId;\n    let resizeDebounce;\n\n    if (charNameEl) {\n        charNameEl.textContent = ThemeUtils.getCharacterName();\n    }\n\n    let layers = {\n        far: [],\n        middle: [],\n        near: [],\n    };\n\n    class Firefly {\n        constructor(layer) {\n            this.layer = layer;\n            this.reset();\n        }\n\n        reset() {\n            this.x = Math.random() * canvas.width;\n            this.y = Math.random() * canvas.height;\n\n            if (this.layer === "far") {\n                this.radius = Math.random() * 1 + 0.5;\n                this.speed = 0.1;\n                this.pulseRange = 0.2;\n            } else if (this.layer === "middle") {\n                this.radius = Math.random() * 1.5 + 1;\n                this.speed = 0.2;\n                this.pulseRange = 0.4;\n            } else {\n                this.radius = Math.random() * 2 + 1.5;\n                this.speed = 0.3;\n                this.pulseRange = 0.6;\n            }\n\n            this.vx = (Math.random() - 0.5) * this.speed;\n            this.vy = (Math.random() - 0.5) * this.speed;\n            this.life = Math.random() * 5 + 3;\n            this.initialLife = this.life;\n        }\n\n        update() {\n            this.x += this.vx;\n            this.y += this.vy;\n            this.life -= 0.01;\n            if (Math.random() > 0.98) {\n                this.vx = (Math.random() - 0.5) * this.speed;\n                this.vy = (Math.random() - 0.5) * this.speed;\n            }\n\n            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {\n                this.reset();\n            }\n        }\n\n        draw() {\n            const pulse = Math.abs(Math.sin((this.initialLife - this.life) * 0.8));\n            const currentRadius = this.radius * (1 + pulse * this.pulseRange);\n            const opacity = pulse;\n\n            ctx.beginPath();\n            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius * 4);\n            gradient.addColorStop(0, `rgba(255, 255, 220, ${opacity * 0.9})`);\n            gradient.addColorStop(0.3, `rgba(255, 230, 150, ${opacity * 0.4})`);\n            gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);\n\n            ctx.fillStyle = gradient;\n            ctx.arc(this.x, this.y, currentRadius * 4, 0, Math.PI * 2);\n            ctx.fill();\n        }\n    }\n\n    function setup() {\n        const rect = container.getBoundingClientRect();\n        canvas.width = rect.width;\n        canvas.height = rect.height;\n        const density = canvas.width / 30;\n        layers.far = [];\n        layers.middle = [];\n        layers.near = [];\n\n        for (let i = 0; i < density * 2; i++) layers.far.push(new Firefly("far"));\n        for (let i = 0; i < density; i++) layers.middle.push(new Firefly("middle"));\n        for (let i = 0; i < density / 2; i++) layers.near.push(new Firefly("near"));\n    }\n\n    function animate() {\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        Object.values(layers).flat().forEach((fly) => {\n            fly.update();\n            fly.draw();\n        });\n        animationFrameId = requestAnimationFrame(animate);\n    }\n\n    const resizeObserver = new ResizeObserver(() => {\n        clearTimeout(resizeDebounce);\n        resizeDebounce = setTimeout(setup, 100);\n    });\n\n    if (container) {\n        resizeObserver.observe(container);\n        setup();\n        animate();\n    }\n\n    window.addEventListener("message", (event) => {\n        const msg = event.data;\n        if (msg?.source === "typing-indicator-host") {\n            if (msg.type === "graceful-shutdown-request") {\n                if (animationFrameId) {\n                    cancelAnimationFrame(animationFrameId);\n                }\n                resizeObserver.disconnect();\n                ThemeUtils.sendMessage("graceful-shutdown-response");\n            } else if (msg.type === "context-update" && msg.data) {\n                if (msg.data.charName && charNameEl) {\n                    charNameEl.textContent = msg.data.charName;\n                }\n            }\n        }\n    });\n});\n',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "wind chime",
    name: "风铃",
    useIframe: true,
    css: "",
    html: '<div class="wc-container">\n    <img class="wc-bell" src="https://i.imgur.com/ezHNAMJ.png">\n    <img class="wc-strip" src="https://i.imgur.com/eXxObCw.png">\n    <div class="wc-text-container">\n        <p class="wc-char-name">{{char}}</p>\n        <p class="wc-status">is replying quietly...</p>\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400&display=swap');\n\n.wc-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    filter: saturate(1.1) brightness(1.05);\n}\n\n@keyframes wc-gentle-sway {\n    0%, 100% { transform: rotate(-2deg); }\n    50% { transform: rotate(2deg); }\n}\n\n@keyframes wc-strip-flutter {\n    0%, 100% { transform: rotate(-5deg) translateX(-2px); }\n    50% { transform: rotate(5deg) translateX(2px); }\n}\n\n.wc-bell {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    width: 60px;\n    transform-origin: top center;\n    animation: wc-gentle-sway 8s ease-in-out infinite alternate;\n}\n\n.wc-strip {\n    position: absolute;\n    top: 50%;\n    left: 45%;\n    width: 75px;\n    transform-origin: top center;\n    animation: wc-strip-flutter 4s ease-in-out infinite alternate;\n    animation-delay: -0.5s;\n}\n\n.wc-text-container {\n    position: relative;\n    z-index: 10;\n    text-align: center;\n    font-family: 'Noto Serif SC', serif;\n    color: #333;\n    text-shadow: 1px 1px 2px rgba(255,255,255,0.7);\n    padding-top: 150px;\n}\n\n.wc-char-name {\n    font-size: 20px;\n    font-weight: 400;\n    margin: 0;\n}\n\n.wc-status {\n    font-size: 14px;\n    font-weight: 300;\n    margin: 0;\n    opacity: 0.8;\n}",
    iframeJS:
      "document.addEventListener('DOMContentLoaded', () => {\n    ThemeUtils.sendMessage('set-overlay-mode');\n    ThemeUtils.sendMessage('register-stateful-theme');\n\n    updateCharName();\n\n    window.addEventListener('message', (event) => {\n        if (event.data?.source === 'typing-indicator-host' &&\n            event.data?.type === 'context-update') {\n            if (event.data.data?.charName) {\n                window.themeData.charName = event.data.data.charName;\n            }\n            updateCharName();\n        }\n    });\n\n    function updateCharName() {\n        const charNameEl = ThemeUtils.$('.wc-char-name');\n        if (charNameEl) {\n            charNameEl.textContent = ThemeUtils.getCharacterName();\n        }\n    }\n});",
    sizes: {
      floating_bottom: {
        width: "90vw",
        height: "300px",
        maxWidth: "200px",
      },
      chat_center: {
        width: "90vw",
        height: "300px",
        maxWidth: "200px",
      },
      draggable: {
        width: "90vw",
        height: "300px",
        maxWidth: "200px",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "lightning",
    name: "闪电",
    useIframe: true,
    css: "",
    html: '<div class="lightning-container">\n    <canvas id="lightning-canvas"></canvas>\n</div>',
    iframeCSS:
      ".lightning-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n}\n\n#lightning-canvas {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 0;\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("set-overlay-mode");\n\n  const canvas = ThemeUtils.$("#lightning-canvas");\n  if (!canvas) return;\n\n  const hue = 230;\n  const speed = 1.0;\n  const intensity = 1.0;\n  const size = 1.0;\n\n  let animationFrameId;\n\n  function runWebGL() {\n    const gl = canvas.getContext("webgl", { alpha: true });\n    if (!gl) {\n      console.error("WebGL not supported in this browser.");\n      return;\n    }\n\n    const vertexShaderSource = `\n            attribute vec2 aPosition;\n            void main() {\n                gl_Position = vec4(aPosition, 0.0, 1.0);\n            }\n        `;\n\n    const fragmentShaderSource = `\n            precision mediump float;\n            uniform vec2 iResolution;\n            uniform float iTime;\n            uniform float uHue;\n            uniform float uSpeed;\n            uniform float uIntensity;\n            uniform float uSize;\n\n            #define OCTAVE_COUNT 10\n\n            vec3 hsv2rgb(vec3 c) {\n                vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\n                return c.z * mix(vec3(1.0), rgb, c.y);\n            }\n\n            float hash11(float p) {\n                p = fract(p * .1031);\n                p *= p + 33.33;\n                p *= p + p;\n                return fract(p);\n            }\n\n            float hash12(vec2 p) {\n                vec3 p3 = fract(vec3(p.xyx) * .1031);\n                p3 += dot(p3, p3.yzx + 33.33);\n                return fract((p3.x + p3.y) * p3.z);\n            }\n\n            mat2 rotate2d(float theta) {\n                float c = cos(theta);\n                float s = sin(theta);\n                return mat2(c, -s, s, c);\n            }\n\n            float noise(vec2 p) {\n                vec2 ip = floor(p);\n                vec2 fp = fract(p);\n                float a = hash12(ip);\n                float b = hash12(ip + vec2(1.0, 0.0));\n                float c = hash12(ip + vec2(0.0, 1.0));\n                float d = hash12(ip + vec2(1.0, 1.0));\n                vec2 t = smoothstep(0.0, 1.0, fp);\n                return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);\n            }\n\n            float fbm(vec2 p) {\n                float value = 0.0;\n                float amplitude = 0.5;\n                for (int i = 0; i < OCTAVE_COUNT; ++i) {\n                    value += amplitude * noise(p);\n                    p *= rotate2d(0.45);\n                    p *= 2.0;\n                    amplitude *= 0.5;\n                }\n                return value;\n            }\n\n            void mainImage(out vec4 fragColor, in vec2 fragCoord) {\n                vec2 uv = fragCoord / iResolution.xy;\n                uv = 2.0 * uv - 1.0;\n                uv.x *= iResolution.x / iResolution.y;\n                uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;\n                float dist = abs(uv.x);\n                vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));\n                vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;\n                col = pow(col, vec3(1.0));\n                float alpha = clamp(length(col), 0.0, 1.0);\n                fragColor = vec4(col * alpha, alpha);\n            }\n\n            void main() {\n                mainImage(gl_FragColor, gl_FragCoord.xy);\n            }\n        `;\n\n    const compileShader = (source, type) => {\n      const shader = gl.createShader(type);\n      gl.shaderSource(shader, source);\n      gl.compileShader(shader);\n      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n        console.error("Shader compile error:", gl.getShaderInfoLog(shader));\n        gl.deleteShader(shader);\n        return null;\n      }\n      return shader;\n    };\n\n    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);\n    const fragmentShader = compileShader(\n      fragmentShaderSource,\n      gl.FRAGMENT_SHADER,\n    );\n    if (!vertexShader || !fragmentShader) return;\n\n    const program = gl.createProgram();\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n    gl.linkProgram(program);\n    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\n      console.error("Program linking error:", gl.getProgramInfoLog(program));\n      return;\n    }\n    gl.useProgram(program);\n\n    const vertices = new Float32Array([\n      -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1, -1,\n    ]);\n    const vertexBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\n    const aPosition = gl.getAttribLocation(program, "aPosition");\n    gl.enableVertexAttribArray(aPosition);\n    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);\n\n    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");\n    const iTimeLocation = gl.getUniformLocation(program, "iTime");\n    const uHueLocation = gl.getUniformLocation(program, "uHue");\n    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");\n    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");\n    const uSizeLocation = gl.getUniformLocation(program, "uSize");\n\n    const startTime = performance.now();\n\n    function render() {\n      canvas.width = canvas.clientWidth;\n      canvas.height = canvas.clientHeight;\n      gl.viewport(0, 0, canvas.width, canvas.height);\n      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);\n      const currentTime = performance.now();\n      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);\n      gl.uniform1f(uHueLocation, hue);\n      gl.uniform1f(uSpeedLocation, speed);\n      gl.uniform1f(uIntensityLocation, intensity);\n      gl.uniform1f(uSizeLocation, size);\n      gl.drawArrays(gl.TRIANGLES, 0, 6);\n      animationFrameId = requestAnimationFrame(render);\n    }\n\n    render();\n  }\n\n  runWebGL();\n  window.addEventListener("message", (event) => {\n    const msg = event.data;\n    if (\n      msg?.source === "typing-indicator-host" &&\n      msg?.type === "graceful-shutdown-request"\n    ) {\n      console.log("[Lightning Theme] 收到关闭信号，正在清理...");\n\n      if (animationFrameId) {\n        cancelAnimationFrame(animationFrameId);\n      }\n\n      ThemeUtils.sendMessage("graceful-shutdown-response");\n    }\n  });\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "fireworks",
    name: "烟火",
    useIframe: true,
    css: "",
    html: '<canvas id="fireworks-canvas"></canvas>',
    iframeCSS:
      "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml, body {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: transparent;\n}\n\n#fireworks-canvas {\n  display: block;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}",
    iframeJS:
      'function rand(min, max) {\n  return Math.random() * (max - min) + min;\n}\n\nconst colorPalettes = [\n  {\n    name: "Classic Gold",\n    hues: [40, 50],\n    saturation: [50, 70],\n    brightness: [60, 80],\n  },\n  {\n    name: "Icy Blue",\n    hues: [200, 220],\n    saturation: [30, 50],\n    brightness: [70, 90],\n  },\n  {\n    name: "Dusty Pink",\n    hues: [320, 340],\n    saturation: [30, 50],\n    brightness: [60, 80],\n  },\n  {\n    name: "Pale Cyan",\n    hues: [160, 180],\n    saturation: [25, 45],\n    brightness: [65, 85],\n  },\n  {\n    name: "Warm White",\n    hues: [20, 40],\n    saturation: [10, 30],\n    brightness: [80, 95],\n  },\n];\n\nclass Particle {\n  constructor(x, y, palette) {\n    this.x = x;\n    this.y = y;\n    this.angle = Math.random() * Math.PI * 2;\n    this.speed = Math.random() * 4 + 1;\n    this.friction = 0.97;\n    this.gravity = 0.05;\n    this.alpha = 1;\n    this.decay = Math.random() * 0.03 + 0.015;\n    this.size = rand(1, 2.5);\n    this.vx = Math.cos(this.angle) * this.speed;\n    this.vy = Math.sin(this.angle) * this.speed;\n    this.isBrilliant = Math.random() < 0.1; // 10% chance to be a white-hot spark\n\n    if (this.isBrilliant) {\n      this.hue = 0;\n      this.saturation = 0;\n      this.brightness = 80;\n    } else {\n      this.hue = rand(palette.hues[0], palette.hues[1]);\n      this.saturation = rand(palette.saturation[0], palette.saturation[1]);\n      this.brightness = rand(palette.brightness[0], palette.brightness[1]);\n    }\n  }\n\n  update(index, dt, particles) {\n    this.vx *= this.friction;\n    this.vy *= this.friction;\n    this.vy += this.gravity;\n    this.x += this.vx * dt;\n    this.y += this.vy * dt;\n    this.alpha -= this.decay;\n    if (this.alpha <= this.decay) {\n      particles.splice(index, 1);\n    }\n  }\n\n  draw(ctx) {\n    const color = `hsla(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha})`;\n    ctx.shadowColor = color;\n    ctx.shadowBlur = 15;\n    ctx.fillStyle = color;\n    ctx.fillRect(\n      this.x - this.size / 2,\n      this.y - this.size / 2,\n      this.size,\n      this.size,\n    );\n  }\n}\n\nclass Firework {\n  constructor(startX, startY, targetX, targetY) {\n    this.x = startX;\n    this.y = startY;\n    this.startX = startX;\n    this.startY = startY;\n    this.coordLast = [\n      { x: startX, y: startY },\n      { x: startX, y: startY },\n      { x: startX, y: startY },\n    ];\n    this.targetX = targetX;\n    this.targetY = targetY;\n    this.speed = 2.5;\n    this.angle = Math.atan2(targetY - startY, targetX - startX);\n    this.acceleration = 1.03;\n    this.palette =\n      colorPalettes[Math.floor(Math.random() * colorPalettes.length)];\n    const trailHue = rand(this.palette.hues[0], this.palette.hues[1]);\n    this.trailColor = `hsl(${trailHue}, 80%, 60%)`;\n    this.lineWidth = 1.5;\n  }\n\n  update(index, dt, fireworks) {\n    const vx = Math.cos(this.angle) * this.speed;\n    const vy = Math.sin(this.angle) * this.speed;\n    this.speed *= this.acceleration;\n    this.coordLast.pop();\n    this.coordLast.unshift({ x: this.x, y: this.y });\n    this.x += vx * dt;\n    this.y += vy * dt;\n    const distanceToTarget = Math.hypot(\n      this.x - this.targetX,\n      this.y - this.targetY,\n    );\n    if (distanceToTarget <= this.speed) {\n      fireworks.splice(index, 1);\n      return this.createParticles();\n    }\n    return null;\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.moveTo(\n      this.coordLast[this.coordLast.length - 1].x,\n      this.coordLast[this.coordLast.length - 1].y,\n    );\n    ctx.lineTo(this.x, this.y);\n    ctx.strokeStyle = this.trailColor;\n    ctx.lineWidth = this.lineWidth;\n    ctx.stroke();\n  }\n\n  createParticles() {\n    const particles = [];\n    const particleCount = 120;\n    for (let i = 0; i < particleCount; i++) {\n      particles.push(new Particle(this.targetX, this.targetY, this.palette));\n    }\n    return particles;\n  }\n}\n\nconst canvas = document.getElementById("fireworks-canvas");\nconst ctx = canvas.getContext("2d");\nlet fireworks = [];\nlet particles = [];\nlet animationFrameId;\nlet oldTime = Date.now();\nlet dt = 0;\n\nfunction resizeCanvas() {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n}\n\nfunction launchFirework() {\n  const startX = canvas.width * rand(0.4, 0.6);\n  const startY = canvas.height;\n  const targetX = rand(canvas.width * 0.2, canvas.width * 0.8);\n  const targetY = rand(canvas.height * 0.2, canvas.height * 0.5);\n  fireworks.push(new Firework(startX, startY, targetX, targetY));\n}\n\nfunction animate() {\n  const newTime = Date.now();\n  dt = (newTime - oldTime) / 16.67;\n  dt = dt > 5 ? 5 : dt;\n  oldTime = newTime;\n\n  ctx.globalCompositeOperation = "destination-out";\n  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n  ctx.globalCompositeOperation = "lighter";\n  ctx.shadowBlur = 0; // Reset shadow for trails\n\n  for (let i = fireworks.length - 1; i >= 0; i--) {\n    const newParticles = fireworks[i].update(i, dt, fireworks);\n    if (fireworks[i]) fireworks[i].draw(ctx);\n    if (newParticles) particles.push(...newParticles);\n  }\n\n  for (let i = particles.length - 1; i >= 0; i--) {\n    particles[i].update(i, dt, particles);\n    if (particles[i]) particles[i].draw(ctx);\n  }\n\n  if (Math.random() > 0.97) launchFirework();\n  animationFrameId = requestAnimationFrame(animate);\n}\n\nfunction init() {\n  resizeCanvas();\n  window.addEventListener("resize", resizeCanvas);\n  ThemeUtils.sendMessage("set-overlay-mode");\n  setTimeout(launchFirework, 200);\n  animate();\n}\n\nwindow.addEventListener("message", (event) => {\n  if (event.data?.source !== "typing-indicator-host") return;\n  if (event.data?.type === "graceful-shutdown-request") {\n    if (animationFrameId) cancelAnimationFrame(animationFrameId);\n    fireworks = [];\n    particles = [];\n    ThemeUtils.sendMessage("graceful-shutdown-response");\n  }\n});\n\ndocument.addEventListener("DOMContentLoaded", init);',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "Butterfly_Dance",
    name: "蝶舞",
    useIframe: true,
    css: "",
    html: '<div id="butterfly-container"></div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap');\n\n:root {\n  --bf-font-family: 'Noto Sans SC', sans-serif;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  font-family: var(--bf-font-family);\n  background: transparent;\n}\n\n#butterfly-container {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.butterfly {\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n  will-change: transform;\n  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.8));\n}",
    iframeJS:
      "document.addEventListener('DOMContentLoaded', () => {\n    ThemeUtils.sendMessage('set-overlay-mode');\n\n    const container = ThemeUtils.$('#butterfly-container');\n    if (!container) return;\n\n    const butterflyImageUrls = [\n        'https://i.imgur.com/Lj4DOtI.png', 'https://i.imgur.com/6agzJfq.png',\n        'https://i.imgur.com/7etSc5S.png', 'https://i.imgur.com/zwiaEmd.png',\n        'https://i.imgur.com/WgNad2J.png', 'https://i.imgur.com/w3XMWOC.png'\n    ];\n\n    const SETTINGS = {\n        numberOfButterflies: 25,\n        minSpeed: 0.5,\n        maxSpeed: 1.5,\n        minScale: 0.4,\n        maxScale: 1.1,\n        minOpacity: 0.5,\n        maxOpacity: 1.0,\n        turnSpeed: 0.03,\n        waypointThreshold: 80,\n        swayAmount: 0.2,\n        wingFlapSpeed: 0.08,\n        minBlur: 2.0,\n        maxBlur: 0.0,\n    };\n\n    const butterflies = [];\n    let imagesLoaded = 0;\n    let animationFrameId = null;\n\n    function preloadImages(urls, callback) {\n        urls.forEach(url => {\n            const img = new Image();\n            img.src = url;\n            img.onload = () => {\n                imagesLoaded++;\n                if (imagesLoaded === urls.length) callback();\n            };\n        });\n    }\n\n    class Butterfly {\n        constructor() {\n            this.el = document.createElement('div');\n            this.el.className = 'butterfly';\n            container.appendChild(this.el);\n            this.init();\n        }\n\n        init() {\n            this.z = Math.random();\n            this.scale = SETTINGS.minScale + this.z * (SETTINGS.maxScale - SETTINGS.minScale);\n            this.opacity = SETTINGS.minOpacity + this.z * (SETTINGS.maxOpacity - SETTINGS.minOpacity);\n            this.blur = SETTINGS.maxBlur + (1 - this.z) * (SETTINGS.minBlur - SETTINGS.maxBlur);\n\n            this.generateCurvePath();\n\n            this.x = this.path[0].x;\n            this.y = this.path[0].y;\n            this.angle = Math.atan2(this.path[1].y - this.y, this.path[1].x - this.x);\n            this.speed = (SETTINGS.minSpeed + this.z * (SETTINGS.maxSpeed - SETTINGS.minSpeed));\n\n            this.frame = Math.random() * butterflyImageUrls.length;\n            this.frameSpeed = (0.8 + Math.random() * 0.4) * SETTINGS.wingFlapSpeed;\n            this.sway = Math.random() * Math.PI * 2;\n            this.swayFrequency = 0.5 + Math.random() * 0.5;\n\n            this.el.style.opacity = this.opacity;\n            this.el.style.zIndex = Math.floor(this.z * 10);\n            this.el.style.filter = `drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.8)) blur(${this.blur}px)`;\n        }\n\n        generateCurvePath() {\n            const w = container.clientWidth;\n            const h = container.clientHeight;\n            const margin = 150;\n\n            const edges = ['top', 'bottom', 'left', 'right'];\n            let startEdge = edges[Math.floor(Math.random() * 4)];\n            let endEdge;\n            do {\n                endEdge = edges[Math.floor(Math.random() * 4)];\n            } while (endEdge === startEdge);\n\n            const getPointOnEdge = (edge) => {\n                switch (edge) {\n                    case 'top':    return { x: Math.random() * w, y: -margin };\n                    case 'bottom': return { x: Math.random() * w, y: h + margin };\n                    case 'left':   return { x: -margin, y: Math.random() * h };\n                    case 'right':  return { x: w + margin, y: Math.random() * h };\n                }\n            };\n\n            const startPoint = getPointOnEdge(startEdge);\n            const endPoint = getPointOnEdge(endEdge);\n\n            const midX = (startPoint.x + endPoint.x) / 2;\n            const midY = (startPoint.y + endPoint.y) / 2;\n\n            const vecX = endPoint.x - startPoint.x;\n            const vecY = endPoint.y - startPoint.y;\n            const length = Math.sqrt(vecX * vecX + vecY * vecY);\n\n            const perpX = -vecY / length;\n            const perpY = vecX / length;\n\n            const bendAmount = (Math.random() - 0.5) * length * 0.5;\n            const controlPoint = {\n                x: midX + perpX * bendAmount,\n                y: midY + perpY * bendAmount\n            };\n\n            this.path = [startPoint, controlPoint, endPoint];\n            this.currentTargetIndex = 1;\n        }\n\n        update(deltaTime) {\n            const target = this.path[this.currentTargetIndex];\n\n            const dx = target.x - this.x;\n            const dy = target.y - this.y;\n            const distance = Math.sqrt(dx * dx + dy * dy);\n            const targetAngle = Math.atan2(dy, dx);\n\n            if (distance < SETTINGS.waypointThreshold) {\n                this.currentTargetIndex++;\n                if (this.currentTargetIndex >= this.path.length) {\n                    this.init();\n                    return;\n                }\n            }\n\n            let angleDiff = targetAngle - this.angle;\n            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;\n            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;\n            this.angle += angleDiff * SETTINGS.turnSpeed * (deltaTime * 60);\n\n            this.sway += this.swayFrequency * deltaTime * 5;\n            const swayX = Math.cos(this.angle + Math.PI / 2) * Math.sin(this.sway) * SETTINGS.swayAmount;\n            const swayY = Math.sin(this.angle + Math.PI / 2) * Math.sin(this.sway) * SETTINGS.swayAmount;\n\n            this.x += Math.cos(this.angle) * this.speed + swayX;\n            this.y += Math.sin(this.angle) * this.speed + swayY;\n\n            this.frame = (this.frame + this.frameSpeed * deltaTime * 60) % butterflyImageUrls.length;\n\n            this.el.style.backgroundImage = `url(${butterflyImageUrls[Math.floor(this.frame)]})`;\n            this.el.style.transform = `translate(${this.x.toFixed(2)}px, ${this.y.toFixed(2)}px) scale(${this.scale}) rotate(${(this.angle + Math.PI / 2)}rad)`;\n        }\n    }\n\n    let lastTime = 0;\n    function animate(currentTime) {\n        if (!lastTime) lastTime = currentTime;\n        const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);\n        lastTime = currentTime;\n\n        butterflies.forEach(butterfly => butterfly.update(deltaTime));\n        animationFrameId = requestAnimationFrame(animate);\n    }\n\n    function init() {\n        for (let i = 0; i < SETTINGS.numberOfButterflies; i++) {\n            butterflies.push(new Butterfly());\n        }\n        animationFrameId = requestAnimationFrame(animate);\n    }\n\n    preloadImages(butterflyImageUrls, init);\n    window.addEventListener('message', (event) => {\n        const msg = event.data;\n        if (msg?.source === 'typing-indicator-host' && msg?.type === 'graceful-shutdown-request') {\n            console.log('[Butterfly Theme] 收到关闭信号，正在清理...');\n            if (animationFrameId) {\n                cancelAnimationFrame(animationFrameId);\n                animationFrameId = null;\n            }\n\n            ThemeUtils.sendMessage('graceful-shutdown-response');\n        }\n    });\n});",
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "Sparrow_on_the_Branch",
    name: "雀登梅梢",
    useIframe: true,
    css: "",
    html: '<div class="theme-container">\n    <div class="branch">\n        <img src="https://i.imgur.com/6V5byjI.png" alt="树干">\n    </div>\n    <div class="flowers">\n        <img src="https://i.imgur.com/ecVHk2N.png" alt="花朵">\n    </div>\n    <div class="bird">\n        <img src="https://i.imgur.com/sZ1qqTg.png" alt="飞鸟">\n    </div>\n</div>',
    iframeCSS:
      "html, body {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background: transparent;\n}\n\n.theme-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n}\n\n.branch, .flowers, .bird {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    animation-iteration-count: infinite;\n}\n\n.branch img, .flowers img, .bird img {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n}\n\n.branch {\n    animation-name: animate-branch;\n    animation-duration: 12s;\n}\n\n.flowers {\n    animation-name: animate-flowers;\n    animation-duration: 12s;\n}\n\n.bird {\n    animation-name: animate-bird;\n    animation-duration: 12s;\n}\n\n@keyframes animate-branch {\n    0%, 100% { opacity: 0; transform: scale(0.98); }\n    8%       { opacity: 0; transform: scale(0.98); }\n    33%      { opacity: 1; transform: scale(1); }\n    100%     { opacity: 1; transform: scale(1); } \n}\n\n@keyframes animate-flowers {\n    0%, 25%  { opacity: 0; }\n    50%      { opacity: 1; }\n    100%     { opacity: 1; }\n}\n\n@keyframes animate-bird {\n    0%, 50%  { \n        opacity: 0; \n        transform: translate(-150px, -100px) rotate(-10deg) scale(1.1);\n    }\n    75%      { \n        opacity: 1; \n        transform: translate(0, 0px) rotate(0deg) scale(1);\n    }\n    100%     { opacity: 1; }\n}",
    iframeJS:
      "document.addEventListener('DOMContentLoaded', () => {\n    ThemeUtils.sendMessage('set-overlay-mode');\n});",
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "Kongming_lantern",
    name: "孔明灯",
    useIframe: true,
    css: "",
    html: '<div class="sky-container">\n    <div class="night-sky"></div>\n    <div class="lantern-container"></div>\n</div>',
    iframeCSS:
      "html, body {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background: transparent;\n}\n\n.sky-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n}\n\n.night-sky {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(to bottom, \n        rgba(10, 20, 45, 0.6) 0%, \n        rgba(25, 35, 65, 0.4) 50%, \n        rgba(35, 50, 80, 0) 100%\n    );\n    opacity: 0;\n    animation: darken-sky 15s infinite;\n}\n\n.lantern-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n\n.lantern {\n    position: absolute;\n    bottom: -200px;\n    width: 70px;\n    height: 100px;\n    animation-name: rise-glow-fade;\n    animation-timing-function: ease-in-out;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.lantern img {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n}\n\n@keyframes darken-sky {\n    0%       { opacity: 0; }\n    30%      { opacity: 1; }\n    70%      { opacity: 1; }\n    100%     { opacity: 0; }\n}\n\n@keyframes rise-glow-fade {\n    0% {\n        transform: translateY(0);\n        opacity: 0;\n        filter: brightness(0.8);\n    }\n    15% {\n        opacity: 1;\n    }\n    70% {\n        transform: translateY(-110vh);\n        filter: brightness(1.6) drop-shadow(0 0 15px rgba(255, 200, 100, 0.8));\n    }\n    90% {\n        opacity: 1;\n    }\n    100% {\n        transform: translateY(-120vh);\n        opacity: 0;\n        filter: brightness(1.6) drop-shadow(0 0 15px rgba(255, 200, 100, 0.8));\n    }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("set-overlay-mode");\n\n  const lanternContainer = document.querySelector(".lantern-container");\n  const lanternImages = [\n    "https://i.imgur.com/uM2dcbI.png",\n    "https://i.imgur.com/fejbfnx.png",\n    "https://i.imgur.com/EaE50fE.png",\n    "https://i.imgur.com/QEg6HJs.png",\n    "https://i.imgur.com/qPC7hUK.png",\n    "https://i.imgur.com/EawsUt1.png",\n    "https://i.imgur.com/1i1GfHu.png",\n    "https://i.imgur.com/IZTZ54i.png",\n    "https://i.imgur.com/wEwRz7X.png",\n  ];\n  const numberOfLanterns = 20;\n  let isRunning = true;\n\n  function createLantern() {\n    if (!isRunning || !lanternContainer) return;\n\n    const lantern = document.createElement("div");\n    lantern.className = "lantern";\n\n    const imgElement = document.createElement("img");\n    imgElement.setAttribute("referrerpolicy", "no-referrer");\n    imgElement.onerror = () => {\n      lantern.remove();\n      if (isRunning) createLantern();\n    };\n\n    const randomImage =\n      lanternImages[Math.floor(Math.random() * lanternImages.length)];\n    const randomScale = 0.4 + Math.random() * 0.7;\n    const randomPosition = Math.random() * 95;\n    const randomDuration = 15 + Math.random() * 10;\n    const randomDelay = Math.random() * 5;\n\n    imgElement.src = randomImage;\n    lantern.style.transform = `scale(${randomScale})`;\n    lantern.style.left = `${randomPosition}vw`;\n    lantern.style.animationDuration = `${randomDuration}s`;\n    lantern.style.animationDelay = `${randomDelay}s`;\n\n    lantern.appendChild(imgElement);\n    lanternContainer.appendChild(lantern);\n\n    lantern.addEventListener("animationend", () => {\n      lantern.remove();\n      if (isRunning) createLantern();\n    });\n  }\n\n  for (let i = 0; i < numberOfLanterns; i++) {\n    createLantern();\n  }\n  window.addEventListener("message", (event) => {\n    const msg = event.data;\n    if (\n      msg?.source === "typing-indicator-host" &&\n      msg?.type === "graceful-shutdown-request"\n    ) {\n      console.log("[孔明灯主题] 收到关闭信号，停止创建新灯笼");\n      isRunning = false;\n      ThemeUtils.sendMessage("graceful-shutdown-response");\n    }\n  });\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "digital_stream",
    name: "数字流",
    useIframe: true,
    css: "",
    html: '<div class="mc-container">\n    <canvas id="mc-canvas"></canvas>\n    <div class="mc-indicator-text">\n        &gt; <span class="mc-char-name">{{char}}</span><span class="mc-cursor">_</span>\n    </div>\n</div>',
    iframeCSS:
      "@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');\n\n.mc-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    pointer-events: auto;\n}\n\n#mc-canvas {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.mc-indicator-text {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 2;\n    color: #00ff41;\n    font-family: 'VT323', monospace;\n    font-size: 28px;\n    white-space: nowrap;\n    pointer-events: auto;\n    text-shadow: \n        0 0 5px #00ff41, \n        0 0 10px #00ff41,\n        0 0 15px rgba(0, 255, 65, 0.7);\n    \n    animation: mc-flicker 2s infinite;\n}\n\n.mc-cursor {\n    animation: mc-blink 1s infinite step-end;\n}\n\n@keyframes mc-flicker {\n    0%, 100% { opacity: 1; }\n    50% { opacity: 0.8; }\n}\n\n@keyframes mc-blink {\n    50% { opacity: 0; }\n}",
    iframeJS:
      'document.addEventListener("DOMContentLoaded", () => {\n    ThemeUtils.sendMessage("set-overlay-mode");\n    ThemeUtils.sendMessage("register-stateful-theme");\n\n    const canvas = ThemeUtils.$("#mc-canvas");\n    const container = ThemeUtils.$(".mc-container");\n    const ctx = canvas.getContext("2d");\n    const charNameEl = ThemeUtils.$(".mc-char-name");\n\n    function updateCharName() {\n        if (charNameEl) {\n            charNameEl.textContent = `${ThemeUtils.getCharacterName()} is compiling...`;\n        }\n    }\n\n    updateCharName();\n\n    window.addEventListener("message", (event) => {\n        if (event.data?.source === "typing-indicator-host") {\n            if (event.data.type === "context-update" && event.data.data) {\n                if (event.data.data.charName) {\n                    window.themeData.charName = event.data.data.charName;\n                }\n                if (event.data.data.userName) {\n                    window.themeData.userName = event.data.data.userName;\n                }\n                if (event.data.data.charAvatarUrl) {\n                    window.themeData.charAvatarUrl = event.data.data.charAvatarUrl;\n                }\n                if (event.data.data.userAvatarUrl) {\n                    window.themeData.userAvatarUrl = event.data.data.userAvatarUrl;\n                }\n                updateCharName();\n            }\n            if (event.data.type === "graceful-shutdown-request") {\n                cancelAnimationFrame(animationFrameId);\n                clearTimeout(resizeDebounce);\n                resizeObserver.disconnect();\n                ThemeUtils.sendMessage("graceful-shutdown-response");\n            }\n        }\n    });\n\n    const fontSize = 16;\n    const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";\n\n    let columns;\n    let drops;\n    let animationFrameId;\n    let resizeDebounce;\n\n    function setup() {\n        const rect = container.getBoundingClientRect();\n        canvas.width = rect.width;\n        canvas.height = rect.height;\n        columns = Math.floor(canvas.width / fontSize);\n        drops = [];\n        for (let i = 0; i < columns; i++) {\n            drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));\n        }\n    }\n\n    function draw() {\n        ctx.globalCompositeOperation = "destination-out";\n        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\n        ctx.globalCompositeOperation = "source-over";\n        ctx.font = `${fontSize}px monospace`;\n        for (let i = 0; i < drops.length; i++) {\n            const text = characters[Math.floor(Math.random() * characters.length)];\n            if (drops[i] < 3) {\n                ctx.fillStyle = "#fff";\n            } else {\n                ctx.fillStyle = "#0F0";\n            }\n            ctx.fillText(text, i * fontSize, drops[i] * fontSize);\n            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {\n                drops[i] = 0;\n            }\n            drops[i]++;\n        }\n    }\n\n    function animate() {\n        draw();\n        animationFrameId = requestAnimationFrame(animate);\n    }\n\n    const resizeObserver = new ResizeObserver(() => {\n        clearTimeout(resizeDebounce);\n        resizeDebounce = setTimeout(setup, 100);\n    });\n\n    if (container) {\n        resizeObserver.observe(container);\n        setup();\n        animate();\n    }\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
  {
    id: "Nightmare",
    name: "梦魇",
    useIframe: true,
    css: "",
    html: '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700;900&display=swap" rel="stylesheet">\n\n<div class="cn-container">\n    <svg style="display: none;">\n        <defs>\n            <filter id="blood-glitch">\n                <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" result="noise" />\n                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />\n            </filter>\n            <filter id="heavy-blur">\n                <feGaussianBlur stdDeviation="2,0" />\n            </filter>\n        </defs>\n    </svg>\n    <div class="cn-overlay-texture"></div>\n    <div class="cn-vignette"></div>\n    <div id="cn-text-layer"></div>\n</div>',
    iframeCSS:
      ":root {\n    --cn-font: 'Noto Serif SC', 'Songti SC', 'SimSun', serif;\n    --cn-blood: #ff0000;\n    --cn-dark-blood: #3d0000;\n}\n\nbody, html {\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    background: transparent;\n}\n\n.cn-container {\n    width: 100vw;\n    height: 100vh;\n    position: relative;\n    pointer-events: none;\n    overflow: hidden;\n}\n\n.cn-overlay-texture {\n    position: absolute;\n    top: 0; left: 0; right: 0; bottom: 0;\n    background: \n        linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),\n        linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));\n    background-size: 100% 2px, 3px 100%;\n    z-index: 1;\n    opacity: 0.6;\n    pointer-events: none;\n}\n\n.cn-vignette {\n    position: absolute;\n    top: 0; left: 0; width: 100%; height: 100%;\n    background: radial-gradient(circle, transparent 50%, rgba(60, 0, 0, 0.6) 90%, black 120%);\n    z-index: 2;\n    animation: cn-breathe 4s infinite ease-in-out;\n}\n\n.cn-text {\n    position: absolute;\n    font-family: var(--cn-font);\n    font-weight: 900;\n    line-height: 1;\n    z-index: 10;\n    white-space: nowrap;\n    opacity: 0;\n    user-select: none;\n    mix-blend-mode: hard-light; \n}\n\n.cn-style-scream {\n    color: var(--cn-blood);\n    font-size: clamp(40px, 8vw, 120px);\n    -webkit-text-stroke: 2px #000;\n    text-shadow: \n        4px 4px 0px #000,\n        -2px -2px 10px rgba(255,0,0,0.8);\n    filter: url(#blood-glitch) drop-shadow(0 0 10px red);\n    animation: cn-flash-in 0.1s forwards, cn-shake 0.2s infinite;\n}\n\n.cn-style-whisper {\n    color: #000;\n    font-size: clamp(16px, 3vw, 30px);\n    text-shadow: 0 0 5px var(--cn-blood);\n    font-weight: 700;\n    letter-spacing: -1px;\n    animation: cn-creep-in 4s forwards;\n    opacity: 0.8;\n}\n\n.cn-style-madness {\n    color: rgba(168, 25, 25, 0.7);\n    font-size: clamp(20px, 5vw, 60px);\n    filter: blur(1px);\n    animation: cn-appear 0.5s forwards, cn-scale-pulse 2s infinite;\n}\n\n@keyframes cn-flash-in {\n    0% { opacity: 0; transform: scale(2); }\n    100% { opacity: 1; transform: scale(1); }\n}\n\n@keyframes cn-creep-in {\n    0% { opacity: 0; transform: translateY(20px); }\n    20% { opacity: 1; }\n    80% { opacity: 1; filter: blur(0px); }\n    100% { opacity: 0; transform: translateY(-20px); filter: blur(4px); }\n}\n\n@keyframes cn-shake {\n    0% { transform: translate(1px, 1px) rotate(0deg); }\n    25% { transform: translate(-1px, -2px) rotate(-1deg); }\n    50% { transform: translate(-3px, 0px) rotate(1deg); }\n    75% { transform: translate(3px, 2px) rotate(0deg); }\n    100% { transform: translate(1px, -1px) rotate(-1deg); }\n}\n\n@keyframes cn-scale-pulse {\n    0%, 100% { transform: scale(1); filter: blur(1px); }\n    50% { transform: scale(1.1); filter: blur(3px) contrast(200%); }\n}\n\n@keyframes cn-breathe {\n    0%, 100% { box-shadow: inset 0 0 100px rgba(0,0,0,0.5); }\n    50% { box-shadow: inset 0 0 200px rgba(80,0,0,0.6); }\n}",
    iframeJS:
      'const NIGHTMARES = [\n  "看着我",\n  "看着我",\n  "看着我",\n  "看着我",\n  "骗子",\n  "骗子",\n  "骗子",\n  "去死",\n  "去死",\n  "别走",\n  "好痛",\n  "你在想谁？",\n  "不准想别人",\n  "把心挖出来",\n  "嘻嘻",\n  "嘻嘻嘻",\n  "哈哈哈哈",\n  "找到你了",\n  "I SEE YOU",\n  "FOUND YOU",\n  "为什么不理我",\n  "回消息",\n  "说话啊",\n  "永远在一起",\n  "融为一体",\n  "吃掉你",\n  "背叛者",\n  "杀",\n  "杀",\n  "爱",\n  "爱",\n  "爱",\n  "眼睛",\n  "好多眼睛",\n  "别逃了",\n  "没用的",\n  "我会找到你",\n  "我爱你我爱你我爱你我爱你我爱你",\n];\n\nconst textLayer = document.getElementById("cn-text-layer");\nlet mainInterval;\nlet clusterInterval;\nconst r = (min, max) => Math.random() * (max - min) + min;\n\nfunction createText(isCluster = false) {\n  if (!textLayer) return;\n\n  const el = document.createElement("div");\n  el.classList.add("cn-text");\n  el.textContent = NIGHTMARES[Math.floor(Math.random() * NIGHTMARES.length)];\n  el.style.left = r(5, 85) + "vw";\n  el.style.top = r(5, 90) + "vh";\n  el.style.transform = `rotate(${r(-15, 15)}deg)`;\n  const type = Math.random();\n  if (isCluster || type > 0.85) {\n    el.classList.add("cn-style-scream");\n    el.style.zIndex = 100;\n  } else if (type > 0.5) {\n    el.classList.add("cn-style-madness");\n  } else {\n    el.classList.add("cn-style-whisper");\n  }\n\n  textLayer.appendChild(el);\n  setTimeout(\n    () => {\n      if (el.parentElement) el.remove();\n    },\n    r(2000, 4000),\n  );\n}\nfunction triggerCluster() {\n  const count = Math.floor(r(5, 12));\n  for (let i = 0; i < count; i++) {\n    setTimeout(() => createText(true), i * 50);\n  }\n}\n\ndocument.addEventListener("DOMContentLoaded", () => {\n  ThemeUtils.sendMessage("set-overlay-mode");\n  ThemeUtils.sendMessage("set-shutdown-timeout", { duration: 1500 });\n  mainInterval = setInterval(() => {\n    createText();\n  }, 400);\n  clusterInterval = setInterval(() => {\n    if (Math.random() > 0.6) {\n      triggerCluster();\n    }\n  }, 2000);\n\n  triggerCluster();\n});\n\nwindow.addEventListener("message", (event) => {\n  const msg = event.data;\n  if (\n    msg?.source === "typing-indicator-host" &&\n    msg?.type === "graceful-shutdown-request"\n  ) {\n    clearInterval(mainInterval);\n    clearInterval(clusterInterval);\n    const allTexts = document.querySelectorAll(".cn-text");\n    allTexts.forEach((t) => {\n      t.style.transition = "all 1s ease";\n      t.style.color = "#000";\n      t.style.textShadow = "0 0 20px red";\n      t.style.opacity = "0";\n      t.style.transform = "scale(2)";\n    });\n\n    ThemeUtils.sendMessage("graceful-shutdown-response");\n  }\n});',
    sizes: {
      floating_bottom: {
        width: "100vw",
        height: "100vh",
      },
      chat_center: {
        width: "100vw",
        height: "100vh",
      },
      draggable: {
        width: "100vw",
        height: "100vh",
      },
    },
    isBuiltIn: true,
  },
];

// --- 音乐气泡区 ---
const bubbleStyles = [
  {
    id: "bubble_default",
    name: "深色气泡",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
        <span class="play-btn">
            <svg class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </span>
        <span class="bubble-song-info">
            <span class="bubble-song-title">{{title}}</span>
            <span class="bubble-song-artist"> — {{artist}}</span>
        </span>
    </span></span>
`,
    css: `.music-bubble-container {
    display: inline-block;
    position: relative;
    padding: 2px 0;
    vertical-align: middle;
}

.music-bubble {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: #1c1c1e;
    color: #cbcbd6;
    padding: 6px 14px;
    border-radius: 18px;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.2px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 280px;
    position: relative;
}

.music-bubble:hover {
    background-color: #2c2c2e;
}

.music-bubble-container:active {
    transform: scale(0.97);
}

.music-bubble-container::before {
    content: '';
    position: absolute;
    left: 2px;
    bottom: 4px;
    width: 35px;
    height: 10px;
    background-color: #1c1c1e;
    border-radius: 0 0 10px 0;
    transform: rotate(-15deg) skewX(-15deg);
    z-index: -1;
    transition: background-color 0.2s ease-in-out;
}

.music-bubble-container:hover::before {
    background-color: #2c2c2e;
}

.music-bubble .play-btn {
    width: 12px;
    height: 12px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.music-bubble .icon {
    width: 14px;
    height: 14px;
    fill: currentColor;
    opacity: 0.8;
    position: absolute;
    transition: all 0.2s ease;
}

.music-bubble .play-icon {
    opacity: 1;
    transform: scale(1);
}

.music-bubble .pause-icon {
    opacity: 0;
    transform: scale(0.5);
}

.music-bubble.is-playing .play-icon {
    opacity: 0;
    transform: scale(0.5);
}

.music-bubble.is-playing .pause-icon {
    opacity: 1;
    transform: scale(1);
}

.bubble-song-info {
    display: flex;
    align-items: center;
    min-width: 0;
}

.bubble-song-title {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    flex-shrink: 1;
}

.bubble-song-artist {
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    flex-shrink: 2;
}`,
  },
  {
    id: "bubble_light",
    name: "浅色气泡",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
        <span class="play-btn">
            <svg class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </span>
        <span class="bubble-song-info">
            <span class="bubble-song-title">{{title}}</span>
            <span class="bubble-song-artist"> — {{artist}}</span>
        </span>
    </span></span>`,
    css: `.music-bubble-container {
    display: inline-block;
    position: relative;
    padding: 2px 0;
    vertical-align: middle;
}

.music-bubble {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: #f5f5f7;
    color: #1d1d1f;
    padding: 6px 14px;
    border-radius: 18px;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.2px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 280px;
    position: relative;
}

.music-bubble:hover {
    background-color: #e8e8ed;
}

.music-bubble-container:active {
    transform: scale(0.97);
}

.music-bubble-container::before {
    content: '';
    position: absolute;
    right: 1px;
    left: auto;
    bottom: 4px;
    width: 35px;
    height: 15px;
    background-color: #f5f5f7;
    border-radius: 0 0 0 10px;
    transform: rotate(15deg) skewX(15deg);
    z-index: -1;
    transition: background-color 0.2s ease-in-out;
}

.music-bubble-container:hover::before {
    background-color: #e8e8ed;
}

.music-bubble .play-btn {
    width: 12px;
    height: 12px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.music-bubble .icon {
    width: 14px;
    height: 14px;
    fill: currentColor;
    opacity: 0.7;
    position: absolute;
    transition: all 0.2s ease;
}

.music-bubble .play-icon {
    opacity: 1;
    transform: scale(1);
}

.music-bubble .pause-icon {
    opacity: 0;
    transform: scale(0.5);
}

.music-bubble.is-playing .play-icon {
    opacity: 0;
    transform: scale(0.5);
}

.music-bubble.is-playing .pause-icon {
    opacity: 1;
    transform: scale(1);
}

.bubble-song-info {
    display: flex;
    align-items: center;
    min-width: 0;
}

.bubble-song-title {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    flex-shrink: 1;
}

.bubble-song-artist {
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    flex-shrink: 2;
}`,
  },
  {
    id: "bubble_minimal",
    name: "极简风格",
    isBuiltIn: true,
    html: `<span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}"><span class="bubble-icon">▶</span><span class="bubble-bars"><span></span><span></span><span></span></span> {{title}}</span>`,
    css: `.music-bubble {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(100,100,100,0.15);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    border-bottom: 1px dashed currentColor;
    transition: background 0.2s;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}

.music-bubble:hover {
    background: rgba(100,100,100,0.25);
}

.bubble-icon {
    display: inline-block;
}

.bubble-bars {
    display: none;
    align-items: flex-end;
    gap: 1px;
    height: 12px;
}

.bubble-bars span {
    width: 2px;
    background: currentColor;
    border-radius: 1px;
}

.music-bubble.is-playing {
    background: rgba(100,100,100,0.3);
    border-bottom: 1px solid currentColor;
}

.music-bubble.is-playing .bubble-icon {
    display: none;
}

.music-bubble.is-playing .bubble-bars {
    display: inline-flex;
}

.music-bubble.is-playing .bubble-bars span {
    animation: bubble-wave 0.8s ease-in-out infinite;
}

.music-bubble.is-playing .bubble-bars span:nth-child(1) {
    height: 40%;
    animation-delay: 0s;
}

.music-bubble.is-playing .bubble-bars span:nth-child(2) {
    height: 70%;
    animation-delay: 0.2s;
}

.music-bubble.is-playing .bubble-bars span:nth-child(3) {
    height: 50%;
    animation-delay: 0.4s;
}

@keyframes bubble-wave {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1); }
}`,
  },
  {
    id: "bubble_off_white",
    name: "米白气泡",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
    <span class="music-icon-wrapper">
        <svg class="music-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <span class="sound-waves">
            <span></span>
            <span></span>
            <span></span>
        </span>
    </span>
    <span class="song-info">
        <span class="song-title">{{title}}</span>
        <span class="song-artist"> — {{artist}}</span>
    </span>
</span></span>`,
    css: `.music-bubble-container {
    display: inline-block;
    position: relative;
    padding: 2px 0;
    vertical-align: middle;
    font-family: "Songti SC", "Noto Serif SC", "STSong", "SimSun", serif;
}

.music-bubble {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: #fcfaf2;
    color: #2b2b2b;
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #dcd8cf;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s ease;
    box-shadow: 2px 3px 6px rgba(139, 137, 130, 0.1);
    max-width: 280px;
    position: relative;
}

.music-bubble:hover {
    border-color: #bfaea0;
    background-color: #fffef9;
    box-shadow: 2px 4px 12px rgba(139, 137, 130, 0.15);
}

.music-bubble-container:active {
    transform: translateY(1px);
}

.music-bubble-container::before {
    content: '';
    position: absolute;
    right: 12px;
    bottom: -4px;
    width: 12px;
    height: 12px;
    background-color: #fcfaf2;
    border-bottom: 1px solid #dcd8cf;
    border-right: 1px solid #dcd8cf;
    transform: rotate(45deg);
    z-index: 1;
    transition: all 0.3s ease;
}
.music-bubble-container::after {
    content: '';
    position: absolute;
    right: 11px;
    bottom: 2px;
    width: 14px;
    height: 6px;
    background-color: #fcfaf2;
    z-index: 2;
    transition: all 0.3s ease;
}

.music-bubble-container:hover::before,
.music-bubble-container:hover::after {
    background-color: #fffef9;
    border-color: #bfaea0;
}

.music-icon-wrapper {
    position: relative;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.music-icon {
    width: 16px;
    height: 16px;
    fill: #a93226;
    opacity: 1;
    filter: drop-shadow(0 0 2px rgba(169, 50, 38, 0.2));
    transition: all 0.3s ease;
}

.sound-waves {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
}

.sound-waves span {
    width: 2px;
    background: #a93226;
    border-radius: 1px;
}

.song-info {
    display: flex;
    align-items: baseline;
    min-width: 0;
}

.song-title {
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    flex-shrink: 1;
    transition: color 0.3s ease;
}

.song-artist {
    font-size: 0.9em;
    color: #666;
    margin-left: 6px;
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    flex-shrink: 2;
    font-family: serif;
}
.music-bubble.is-playing {
    background-color: #fff9f0;
    border-color: #d4a574;
    box-shadow: 2px 4px 12px rgba(169, 50, 38, 0.15);
}

.music-bubble.is-playing .song-title {
    color: #a93226;
}
.music-bubble.is-playing .music-icon {
    display: none;
}

.music-bubble.is-playing .sound-waves {
    display: inline-flex;
}

.music-bubble.is-playing .sound-waves span {
    animation: ancient-wave 0.8s ease-in-out infinite;
}

.music-bubble.is-playing .sound-waves span:nth-child(1) {
    height: 40%;
    animation-delay: 0s;
}

.music-bubble.is-playing .sound-waves span:nth-child(2) {
    height: 70%;
    animation-delay: 0.2s;
}

.music-bubble.is-playing .sound-waves span:nth-child(3) {
    height: 50%;
    animation-delay: 0.4s;
}

@keyframes ancient-wave {
    0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
    50% { transform: scaleY(1); opacity: 1; }
}
.music-bubble.is-playing + .music-bubble-container::before,
.music-bubble-container:has(.is-playing)::before {
    background-color: #fff9f0;
    border-color: #d4a574;
}

.music-bubble-container:has(.is-playing)::after {
    background-color: #fff9f0;
}
@media (max-width: 768px) {
    .music-bubble-container {
        transform: scale(0.9);
        transform-origin: left center;
    }
}`,
  },
  {
    id: "bubble_retro_player",
    name: "复古白",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
        <span class="play-btn">
            <svg class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </span>
        <span class="song-info">
            <span class="song-title">{{title}}</span>
            <span class="song-artist">{{artist}}</span>
        </span>
        <span class="sound-wave">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </span>
    </span></span>`,
    css: `.music-bubble-container { display: inline-block; vertical-align: middle; transition: transform 0.15s ease; }
.music-bubble-container:active { transform: scale(0.97); }
.music-bubble { display: inline-flex; align-items: center; height: 34px; padding: 0 10px 0 4px; gap: 10px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 6px; color: #000; font-family: "SF Mono", ui-monospace, monospace; font-size: 12px; cursor: pointer; user-select: none; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.music-bubble:hover { border-color: #000; transform: translateY(-1px); box-shadow: 4px 4px 0 rgba(0,0,0,0.1); }
.play-btn { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: #1a1a1a; border-radius: 4px; flex-shrink: 0; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; }
.icon { width: 15px; height: 15px; fill: #fff; position: absolute; transition: all 0.3s ease; }
.play-icon { opacity: 1; transform: scale(1) rotate(0deg); }
.pause-icon { opacity: 0; transform: scale(0.5) rotate(-90deg); }
.music-bubble.is-playing .play-btn { background: #000; }
.music-bubble.is-playing .play-icon { opacity: 0; transform: scale(0.5) rotate(90deg); }
.music-bubble.is-playing .pause-icon { opacity: 1; transform: scale(1) rotate(0deg); }
.song-info { display: flex; align-items: center; gap: 8px; overflow: hidden; line-height: 1; }
.song-title { font-weight: 700; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.song-artist { font-size: 12px; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80px; }
.song-artist::before { content: "|"; color: #ddd; margin-right: 8px; font-weight: 300; }
.sound-wave { display: flex; align-items: center; gap: 2px; height: 10px; margin-left: auto; }
.bar { width: 2px; height: 100%; background: #000; border-radius: 1px; animation: retroWhiteWave 1s ease-in-out infinite; animation-play-state: paused; transform: scaleY(0.2); }
.music-bubble.is-playing .bar { animation-play-state: running; }
.bar:nth-child(1) { height: 40%; animation-delay: 0s; }
.bar:nth-child(2) { height: 80%; animation-delay: 0.2s; }
.bar:nth-child(3) { height: 50%; animation-delay: 0.4s; }
.bar:nth-child(4) { height: 90%; animation-delay: 0.1s; }
@keyframes retroWhiteWave { 0%, 100% { transform: scaleY(0.3); opacity: 0.3; } 50% { transform: scaleY(1); opacity: 1; } }`,
  },
  {
    id: "bubble_retro_player_dark",
    name: "复古黑",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
        <span class="play-btn">
            <svg class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </span>
        <span class="song-info">
            <span class="song-title">{{title}}</span>
            <span class="song-artist">{{artist}}</span>
        </span>
        <span class="sound-wave">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </span>
    </span></span>`,
    css: `.music-bubble-container { display: inline-block; vertical-align: middle; transition: transform 0.15s ease; }
.music-bubble-container:active { transform: scale(0.97); }
.music-bubble { display: inline-flex; align-items: center; height: 34px; padding: 0 10px 0 4px; gap: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f0f0f0; font-family: "SF Mono", ui-monospace, monospace; font-size: 12px; cursor: pointer; user-select: none; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.2); }
.music-bubble:hover { border-color: #fff; transform: translateY(-1px); box-shadow: 4px 4px 0 rgba(255,255,255,0.1); }
.play-btn { display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: #f0f0f0; border-radius: 4px; flex-shrink: 0; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; }
.icon { width: 15px; height: 15px; fill: #1a1a1a; position: absolute; transition: all 0.3s ease; }
.play-icon { opacity: 1; transform: scale(1) rotate(0deg); }
.pause-icon { opacity: 0; transform: scale(0.5) rotate(-90deg); }
.music-bubble.is-playing .play-btn { background: #fff; }
.music-bubble.is-playing .play-icon { opacity: 0; transform: scale(0.5) rotate(90deg); }
.music-bubble.is-playing .pause-icon { opacity: 1; transform: scale(1) rotate(0deg); }
.song-info { display: flex; align-items: center; gap: 8px; overflow: hidden; line-height: 1; }
.song-title { font-weight: 700; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.song-artist { font-size: 12px; color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 80px; }
.song-artist::before { content: "|"; color: #444; margin-right: 8px; font-weight: 300; }
.sound-wave { display: flex; align-items: center; gap: 2px; height: 10px; margin-left: auto; }
.bar { width: 2px; height: 100%; background: #f0f0f0; border-radius: 1px; animation: retroDarkWave 1s ease-in-out infinite; animation-play-state: paused; transform: scaleY(0.2); }
.music-bubble.is-playing .bar { animation-play-state: running; }
.bar:nth-child(1) { height: 40%; animation-delay: 0s; }
.bar:nth-child(2) { height: 80%; animation-delay: 0.2s; }
.bar:nth-child(3) { height: 50%; animation-delay: 0.4s; }
.bar:nth-child(4) { height: 90%; animation-delay: 0.1s; }
@keyframes retroDarkWave { 0%, 100% { transform: scaleY(0.3); opacity: 0.3; } 50% { transform: scaleY(1); opacity: 1; } }`,
  },
  {
    id: "bubble_capsule",
    name: "胶囊",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
        <span class="play-btn">
            <svg class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </span>
        <span class="song-info">
            <span class="info-label">NOW PLAYING</span>
            <span class="text-scroll-mask">
                <span class="song-title">{{title}}</span>
                <span class="divider">-</span>
                <span class="song-artist">{{artist}}</span>
            </span>
        </span>
        <span class="sound-wave">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </span>
    </span></span>`,
    css: `.music-bubble-container { display: inline-flex; align-items: center; padding: 3px; background: #fff; border: 1px solid #000; border-radius: 999px; transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); box-shadow: 2px 2px 0px rgba(0,0,0,1); vertical-align: middle; }
.music-bubble-container:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0px rgba(0,0,0,1); }
.music-bubble-container:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px rgba(0,0,0,1); }
.music-bubble { display: inline-flex; align-items: center; height: 36px; padding: 0 16px 0 4px; gap: 10px; background: #000; color: #fff; border-radius: 999px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; cursor: pointer; user-select: none; position: relative; overflow: hidden; }
.play-btn { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #fff; color: #000; border-radius: 50%; flex-shrink: 0; transition: transform 0.3s ease; position: relative; }
.music-bubble:hover .play-btn { transform: scale(1.05); }
.icon { width: 14px; height: 14px; display: block; position: absolute; transition: all 0.2s ease; fill: #000; }
.play-icon { opacity: 1; transform: scale(1); }
.pause-icon { opacity: 0; transform: scale(0.8); }
.music-bubble.is-playing .play-icon { opacity: 0; transform: scale(0.8); }
.music-bubble.is-playing .pause-icon { opacity: 1; transform: scale(1); }
.song-info { display: flex; flex-direction: column; justify-content: center; line-height: 1; max-width: 120px; overflow: hidden; min-width: 0; }
.info-label { font-size: 8px; color: #888; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 2px; text-transform: uppercase; }
.text-scroll-mask { display: flex; align-items: center; overflow: hidden; white-space: nowrap; }
.song-title { font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 0.2px; overflow: hidden; text-overflow: ellipsis; max-width: 70px; flex-shrink: 1; }
.divider { margin: 0 4px; font-size: 10px; color: #666; flex-shrink: 0; }
.song-artist { font-size: 12px; font-weight: 400; color: #ccc; overflow: hidden; text-overflow: ellipsis; max-width: 50px; flex-shrink: 2; }
.sound-wave { display: flex; align-items: center; gap: 2px; height: 12px; flex-shrink: 0; }
.bar { width: 2px; height: 100%; background: #fff; border-radius: 1px; animation: capsuleBlackWave 1s ease-in-out infinite; animation-play-state: paused; transform: scaleY(0.2); }
.music-bubble.is-playing .bar { animation-play-state: running; }
.bar:nth-child(1) { height: 60%; animation-delay: 0s; }
.bar:nth-child(2) { height: 100%; animation-delay: 0.2s; }
.bar:nth-child(3) { height: 50%; animation-delay: 0.4s; }
.bar:nth-child(4) { height: 80%; animation-delay: 0.1s; }
@keyframes capsuleBlackWave { 0%, 100% { transform: scaleY(0.2); opacity: 0.5; } 50% { transform: scaleY(1); opacity: 1; } }`,
  },
  {
    id: "bubble_capsule_powderpink",
    name: "胶囊粉紫",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
        <span class="play-btn">
            <svg class="icon play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </span>
        <span class="song-info">
            <span class="info-label">NOW PLAYING</span>
            <span class="text-scroll-mask">
                <span class="song-title">{{title}}</span>
                <span class="divider">-</span>
                <span class="song-artist">{{artist}}</span>
            </span>
        </span>
        <span class="sound-wave">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </span>
    </span></span>`,
    css: `.music-bubble-container { display: inline-flex; align-items: center; padding: 4px; background: #e3e3ff; border: 2px solid #EFE3FF; border-radius: 999px; transition: transform 0.1s steps(2); box-shadow: 4px 4px 0px #BFB8E0; vertical-align: middle; }
.music-bubble-container:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #BFB8E0; }
.music-bubble-container:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px #EFE3FF; }
.music-bubble { display: inline-flex; align-items: center; height: 38px; padding: 0 16px 0 4px; gap: 12px; background: #EFE3FF; color: #fff; border-radius: 999px; font-family: 'Courier New', Courier, monospace, sans-serif; cursor: pointer; user-select: none; position: relative; overflow: hidden; border: 2px solid #E9FEFA; }
.play-btn { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: #f4c2f4; color: #EFE3FF; border: 2px solid #EFE3FF; border-radius: 50%; flex-shrink: 0; transition: all 0.1s; position: relative; box-shadow: inset -2px -2px 0 rgba(0,0,0,0.2); }
.music-bubble:hover .play-btn { background: #fff; transform: scale(1.05); }
.music-bubble:active .play-btn { transform: scale(0.95); box-shadow: inset 2px 2px 0 rgba(0,0,0,0.2); }
.icon { width: 14px; height: 14px; display: block; position: absolute; fill: #EFE3FF; }
.play-icon { opacity: 1; transform: scale(1); }
.pause-icon { opacity: 0; transform: scale(0.8); }
.music-bubble.is-playing .play-icon { opacity: 0; transform: scale(0.8); }
.music-bubble.is-playing .pause-icon { opacity: 1; transform: scale(1); }
.song-info { display: flex; flex-direction: column; justify-content: center; line-height: 1.3; max-width: 120px; overflow: hidden; min-width: 0; }
.info-label { font-size: 9px; color: #a3abff; font-weight: 700; letter-spacing: 1px; margin-bottom: 1px; text-transform: uppercase; text-shadow: 1px 1px 0 #000; }
.text-scroll-mask { display: flex; align-items: center; overflow: hidden; white-space: nowrap; }
.song-title { font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 0.5px; overflow: hidden; text-overflow: ellipsis; max-width: 70px; flex-shrink: 1; }
.divider { margin: 0 6px; font-size: 10px; color: #f4c2f4; flex-shrink: 0; }
.song-artist { font-size: 12px; font-weight: 400; color: #a3abff; overflow: hidden; text-overflow: ellipsis; max-width: 50px; flex-shrink: 2; }
.sound-wave { display: flex; align-items: center; gap: 3px; height: 14px; flex-shrink: 0; }
.bar { width: 3px; height: 100%; background: #f4c2f4; border-radius: 1px; animation: capsulePinkWave 1s ease-in-out infinite; animation-play-state: paused; transform: scaleY(0.2); border: 1px solid #EFE3FF; }
.music-bubble.is-playing .bar { animation-play-state: running; }
.bar:nth-child(1) { height: 60%; animation-delay: 0s; background: #a3abff; }
.bar:nth-child(2) { height: 100%; animation-delay: 0.2s; }
.bar:nth-child(3) { height: 50%; animation-delay: 0.4s; background: #a3abff; }
.bar:nth-child(4) { height: 80%; animation-delay: 0.1s; }
@keyframes capsulePinkWave { 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(1); } }`,
  },
  {
    id: "bubble_film",
    name: "影片",
    isBuiltIn: true,
    html: `<span class="tech-player-container"><span class="tech-player music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
    <span class="tp-header">
        <span class="tp-brand">AUDIO_SPEC</span>
        <span class="tp-status"></span>
    </span>
    <span class="tp-body">
        <span class="tp-row-heavy">
            <span class="tp-label">TRACK_ID</span>
            <span class="tp-title">{{title}}</span>
        </span>
        <span class="tp-row">
            <span class="tp-label">ARTIST_REF</span>
            <span class="tp-artist">{{artist}}</span>
        </span>
        <span class="tp-row">
            <span class="tp-label">DURATION</span>
            <span class="tp-time">--:-- / 0%</span>
        </span>
        <span class="tp-progress-track">
            <span class="tp-progress-bar"></span>
        </span>
    </span>
    <span class="tp-footer">
        <span class="tp-barcode"></span>
        <span class="tp-icon-box">
            <svg class="tp-music-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"/>
            </svg>
        </span>
    </span>
</span></span>`,
    css: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Roboto+Mono:wght@500&display=swap');

.tech-player-container {
    display: inline-block;
    padding: 2px 0;
    vertical-align: middle;
}

.tech-player {
    font-family: 'Inter', Arial, sans-serif;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    width: 180px;
    position: relative;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.2);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    flex-direction: column;
    text-align: left;
    line-height: normal;
}

.tech-player:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0px rgba(0,0,0,0.25); }
.tech-player:active { transform: translate(1px, 1px); box-shadow: 1px 1px 0px rgba(0,0,0,0.2); }

.tp-header {
    background-color: #000;
    color: #fff;
    padding: 5px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000;
    white-space: nowrap;
}
.tp-brand {
    font-weight: 900;
    font-size: 9px;
    letter-spacing: 0.5px;
}

.tp-status {
    font-family: 'Roboto Mono', monospace;
    font-size: 7px;
    opacity: 0.8;
}
.tech-player.is-playing .tp-status::before { content: 'PLAYING ▶'; }
.tech-player:not(.is-playing) .tp-status::before { content: 'STANDBY ■'; }

.tech-player.is-playing .tp-header { animation: tp-header-pulse 2s infinite; }
@keyframes tp-header-pulse { 0%, 100% { background-color: #000; } 50% { background-color: #333; } }

.tp-body {
    padding: 0 6px;
    display: flex;
    flex-direction: column;
}

.tp-row-heavy {
    border-bottom: 2px solid #000;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
}
.tp-row {
    border-bottom: 1px solid #000;
    padding: 3px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    white-space: nowrap;
    gap: 5px;
}

.tp-label {
    font-size: 6px;
    font-weight: 700;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    flex-shrink: 0;
}

.tp-title {
    font-size: 11px;
    font-weight: 900;
    line-height: 1.2;
    margin-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.tp-artist, .tp-time {
    font-family: 'Roboto Mono', monospace;
    font-size: 7px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90px;
}

.tp-progress-track {
    height: 6px;
    background-color: #e0e0e0;
    margin: 4px 0;
    border: 1px solid #000;
    position: relative;
    overflow: hidden;
}

.tp-progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background-color: #000;
    transition: width 0.5s linear;
}

.tech-player:not(.is-playing) .tp-progress-track {
    background: repeating-linear-gradient(90deg, #fff 0px, #fff 2px, #ddd 2px, #ddd 4px);
}

.tech-player.is-playing .tp-progress-track {
    background-color: #ccc;
}

.tp-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 6px;
    background: #f0f0f0;
    border-top: 2px solid #000;
}

.tp-barcode {
    height: 10px;
    width: 60px;
    background: repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 2px, #000 2px, #000 3px, transparent 3px, transparent 5px, #000 5px, #000 6px, transparent 6px, transparent 7px);
    opacity: 0.8;
}

.tp-icon-box {
    width: 14px;
    height: 14px;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tech-player.is-playing .tp-icon-box { animation: tp-icon-bounce 0.6s ease infinite; }
@keyframes tp-icon-bounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }

.tp-music-icon { width: 8px; height: 8px; fill: #fff; }`,
  },
  {
    id: "bubble_record",
    name: "唱片",
    isBuiltIn: true,
    html: `<span class="music-bubble-container"><span class="retro-tape mini music-bubble music-bubble-from-regex" data-title="{{title}}" data-artist="{{artist}}">
    <span class="tape-body">
        <span class="tape-sticker">
            <span class="sticker-col left">
                <span class="wb-logo">W</span>
                <span class="tiny-text scaling-text">SIDE A</span>
            </span>
            <span class="sticker-col center">
                <span class="album-info">
                    <span class="song-title">{{title}}</span>
                    <span class="song-artist">{{artist}}</span>
                </span>
                <span class="tape-window">
                    <span class="reel"></span>
                    <span class="window-glass"></span>
                    <span class="reel"></span>
                </span>
            </span>
            <span class="sticker-col right">
                <span class="side-number">1</span>
                <span class="tiny-text scaling-text">STEREO</span>
            </span>
        </span>
        <span class="tape-bottom-plate">
            <span class="screw-hole"></span>
            <span class="screw-hole"></span>
        </span>
        <span class="control-overlay">
            <svg class="icon play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg class="icon pause-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </span>
    </span>
</span></span>`,
    css: `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap');

.music-bubble-container { display: inline-block; vertical-align: middle; }

.retro-tape.mini {
    display: inline-block;
    width: 160px;
    height: 100px;
    position: relative;
    cursor: pointer;
    user-select: none;
    font-family: 'Roboto', Arial, sans-serif;
    transition: transform 0.2s;
    filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2));
}
.retro-tape.mini:hover { transform: translateY(-2px); }
.retro-tape.mini:active { transform: scale(0.98); }

.tape-body {
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    border-radius: 6px;
    padding: 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
    background-size: 3px 3px;
    box-shadow: inset 0 0 10px #000;
    position: relative;
}

.tape-sticker {
    background-color: #EBEBD3;
    flex: 1;
    max-height: 65px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    padding: 4px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.tape-sticker::before,
.tape-sticker::after {
    content: '';
    position: absolute;
    top: -4px;
    width: 10px;
    height: 10px;
    background: #1a1a1a;
    transform: rotate(45deg);
}
.tape-sticker::before { left: -5px; }
.tape-sticker::after { right: -5px; }

.sticker-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.sticker-col.left,
.sticker-col.right {
    width: 30px;
    flex-shrink: 0;
}
.sticker-col.center {
    flex: 1;
    margin: 0 1px;
    overflow: hidden;
}
.wb-logo {
    font-size: 10px;
    font-weight: 900;
    color: #000;
    border: 1px solid #000;
    padding: 0 2px;
    border-radius: 2px;
    margin-bottom: 2px;
    box-shadow: 0 0 0 1px #EBEBD3, 0 0 0 2px #000;
    line-height: 1.2;
}
.side-number {
    font-size: 18px;
    font-weight: 900;
    line-height: 1;
    color: #111;
}
.scaling-text {
    font-size: 12px;
    transform: scale(0.5);
    white-space: nowrap;
    font-weight: bold;
    color: #444;
}

.album-info {
    text-align: center;
    width: 100%;
    margin-bottom: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.song-title {
    font-size: 10px;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
}
.song-artist {
    font-size: 8px;
    color: #555;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
    transform: scale(0.9);
}

.tape-window {
    width: 100%;
    height: 20px;
    background: #111;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    box-sizing: border-box;
    position: relative;
    border: 1px solid #ccc;
}
.window-glass {
    width: 30px;
    height: 10px;
    background: rgba(50,50,50,0.8);
    border: 1px solid #333;
}
.reel {
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    position: relative;
}

.reel::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(transparent 10%, #ccc 0, transparent 30%, #ccc 0, transparent 50%, #ccc 0, transparent 70%, #ccc 0, transparent 90%, #ccc 0);
    mask: radial-gradient(transparent 40%, black 41%);
    -webkit-mask: radial-gradient(transparent 40%, black 41%);
}

.retro-tape.mini.is-playing .reel::after {
    animation: tape-spin 2s linear infinite;
}
@keyframes tape-spin {
    to { transform: rotate(360deg); }
}

.tape-bottom-plate {
    position: absolute;
    bottom: 8px;
    left: 15px;
    right: 15px;
    height: 16px;
    background: repeating-linear-gradient(90deg, #111 0, #111 2px, #222 2px, #222 4px);
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    transform: perspective(50px) rotateX(5deg);
    border: 1px solid #000;
}
.screw-hole {
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #000;
}

.control-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 6px;
    z-index: 10;
}
.retro-tape.mini:hover .control-overlay { opacity: 1; }

.control-overlay .icon {
    width: 24px;
    height: 24px;
    fill: #fff;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));
}
.control-overlay .play-icon { display: block; }
.control-overlay .pause-icon { display: none; }

.retro-tape.mini.is-playing .play-icon { display: none; }
.retro-tape.mini.is-playing .pause-icon { display: block; }

.retro-tape.mini.is-playing .tape-sticker {
    box-shadow: 0 1px 2px rgba(0,0,0,0.2), inset 0 0 8px rgba(255,255,255,0.3);
}`,
  },
];
// ===================================================================
//                        统一导出
// ===================================================================

export { bubbleStyles, presets, themes };
