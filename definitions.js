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
    animation-delay: 0s, calc(var(--sdb-float-duration) / -2); /* 动画错开 */
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
            "body { \n    margin: 0; \n    padding: 0; \n    background-color: transparent; \n    overflow: hidden; \n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; \n}\n\n.pbc-container { \n    position: relative; \n    width: 100%; \n    height: 100%; \n    display: flex; \n    align-items: flex-end; \n    padding: 10px; \n    box-sizing: border-box; \n    cursor: pointer;\n    /* 为transform:scale()添加平滑过渡 */\n    transition: transform 0.3s ease;\n}\n\n/* ... 此处省略所有内部元素的样式，它们与上一版完全相同，无需改动 ... */\n.pbc-avatar-wrapper { position: relative; width: 60px; height: 60px; flex-shrink: 0; padding: 3px; box-sizing: border-box; transition: all 0.3s ease; }\n.pbc-avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }\n.pbc-avatar-wrapper--circle, .pbc-avatar-wrapper--squircle { background: conic-gradient(from 180deg at 50% 50%, #ffcad4, #f5d5e6, #d8e2dc, #f5d5e6, #ffcad4); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }\n.pbc-avatar-wrapper--circle, .pbc-avatar-wrapper--circle .pbc-avatar-img { border-radius: 50%; }\n.pbc-avatar-wrapper--squircle, .pbc-avatar-wrapper--squircle .pbc-avatar-img { border-radius: 16px; }\n.pbc-avatar-wrapper--circle .pbc-avatar-img, .pbc-avatar-wrapper--squircle .pbc-avatar-img { box-shadow: inset 0 0 4px rgba(0,0,0,0.2); }\n.pbc-avatar-wrapper--soft { padding: 0; background: #e0e5ec; box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff; }\n.pbc-avatar-wrapper--soft, .pbc-avatar-wrapper--soft .pbc-avatar-img { border-radius: 50%; }\n.pbc-avatar-wrapper--soft .pbc-avatar-img { box-shadow: inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff; }\n.pbc-pixel-cat { position: absolute; bottom: -8px; right: -12px; width: 35px; z-index: 10; image-rendering: pixelated; animation: pbc-cat-twitch 4s infinite ease-in-out; transform-origin: bottom center; }\n.pbc-bubbles-wrapper { position: relative; flex-grow: 1; height: 100%; margin-left: 15px; }\n.pbc-bubble { position: absolute; white-space: nowrap; opacity: 0; transform: translateY(10px) scale(0.9); animation: pbc-pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; display: flex; align-items: center; gap: 6px; font-weight: 500; }\n.pbc-bubble::before { content: ''; position: absolute; background-color: inherit; }\n.pbc-bubble--round, .pbc-bubble--square, .pbc-bubble--3d { padding: 8px 14px; font-size: 14px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }\n.pbc-bubble--round::before, .pbc-bubble--square::before, .pbc-bubble--3d::before { bottom: 4px; left: -7px; width: 12px; height: 12px; clip-path: polygon(100% 100%, 0 100%, 100% 0); }\n.pbc-bubble--round{ border-radius:18px; }\n.pbc-bubble--square{ border-radius:8px; }\n.pbc-bubble--3d{ border-radius:12px; border-bottom:3px solid rgba(0,0,0,.15); }\n.pbc-bubble--tag { padding: 6px 12px; font-size: 13px; border-radius: 8px; font-weight: 600; }\n.pbc-bubble--tag::before { top: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 6px; clip-path: polygon(50% 0, 0 100%, 100% 100%); }\n.pbc-bubble--spotify { padding: 6px 12px; border-radius: 50px; background-color: #f1f1f1 !important; color: #121212 !important; }\n.pbc-bubble--spotify svg { height: 18px; fill: #121212; }\n.pbc-bubble--spotify .pbc-waveform rect { animation: pbc-waveform-anim 1.5s infinite alternate; }\n.pbc-bubble--spotify .pbc-waveform rect:nth-child(2n){ animation-delay:-.2s; }\n.pbc-bubble--spotify .pbc-waveform rect:nth-child(3n){ animation-delay:-.5s; }\n.pbc-bubble--spotify .pbc-waveform rect:nth-child(4n){ animation-delay:-.8s; }\n.pbc-bubble--stats { padding: 4px 12px; border-radius: 8px; font-size: 14px; font-weight: 600; }\n.pbc-bubble--stats svg { height: 12px; fill: white; margin-right: -2px; }\n.pbc-bubble--stats::before { bottom: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 6px; clip-path: polygon(50% 100%, 0 0, 100% 0); }\n.pbc-bubble--glass { padding: 8px 14px; font-size: 14px; border-radius: 18px; background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.2); color: rgba(255, 255, 255, 0.85); }\n.pbc-bubble--glass.pbc-bubble--dark { background-color: rgba(0,0,0,0.1); border-color: rgba(255,255,255,0.15); }\n.pbc-bubble--glass::before { bottom: 4px; left: -7px; width: 12px; height: 12px; clip-path: polygon(100% 100%, 0 100%, 100% 0); background-color: transparent; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.2); border-left: 1px solid rgba(255,255,255,0.2); }\n.pbc-bubble--soft { padding: 10px 16px; font-size: 15px; border-radius: 20px; font-weight: 600; }\n.pbc-bubble--soft.pbc-bubble--light::before { display: none; }\n.pbc-bubble--soft::before { bottom: 4px; left: -7px; width: 12px; height: 12px; clip-path: polygon(100% 100%, 0 100%, 100% 0); }\n.pbc-bubble--dark{ background-color:#1c1c1e; color:#fff; }\n.pbc-bubble--light{ background-color:#e9e9eb; color:#000; }\n.pbc-bubble--pink{ background-color:#ff6b81; color:#fff; }\n.pbc-bubble--red{ background-color:#e74c3c; color:#fff; }\n.pbc-bubble--purple{ background-color:#9b59b6; color:#fff; }\n.pbc-bubble--blue{ background-color:#92c5eb; color:#fff; }\n.pbc-bubble--soft.pbc-bubble--light { background: #e0e5ec; box-shadow: 4px 4px 8px #bebebe, -4px -4px 8px #ffffff; color: #555; }\n.pbc-bubble--soft.pbc-bubble--pink { background: linear-gradient(145deg, #ff7a8f, #e65c71); box-shadow: 4px 4px 8px #d95368, -4px -4px 8px #ff8598; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); }\n.pbc-bubble--soft.pbc-bubble--blue { background: linear-gradient(145deg, #a7d7f9, #8dc1e0); box-shadow: 4px 4px 8px #7fb5d1, -4px -4px 8px #b9e3ff; color: #2c5a77; }\n.pbc-heart { position: absolute; font-size: 24px; pointer-events: none; animation: pbc-heart-float 2s ease-out forwards; z-index: 100; }\n.pbc-heart--pink { color: #ff6b81; text-shadow: 1px 1px 0 #c94a60, -1px -1px 0 #ff9cb0; }\n.pbc-heart--black { color: #2c3e50; text-shadow: 1px 1px 0 #000, -1px -1px 0 #5f7d9c; }\n.pbc-heart--white { color: #ecf0f1; text-shadow: 1px 1px 0 #bdc3c7, -1px -1px 0 #fff; }\n@keyframes pbc-pop-in { to { opacity: 1; transform: translateY(0) scale(1); } }\n@keyframes pbc-cat-twitch { 0%,100%,50%{transform:rotate(0deg)} 10%,30%{transform:rotate(-5deg)} 20%,40%{transform:rotate(5deg)} }\n@keyframes pbc-waveform-anim { from{transform:scaleY(.2)} to{transform:scaleY(1)} }\n@keyframes pbc-heart-float { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-80px) scale(0.5) rotate(20deg); } }\n\n@media (max-width: 400px) {\n    .pbc-container {\n        transform: scale(0.75);\n        transform-origin: left bottom;\n    }\n}",
        iframeJS:
            "const avatarStyles = ['circle', 'squircle', 'soft'];\nconst bubbleTemplates = [\n    { type: 'text', text: 'Let\\'s talk! ^ ^', style: 'square', color: 'light' },\n    { type: 'text', text: '!!!', style: 'square', color: 'red' },\n    { type: 'text', text: 'typing...', style: '3d', color: 'dark' },\n    { type: 'text', text: '{{char}} wants to chat!', style: '3d', color: 'purple' },\n    { type: 'text', text: 'cutie', style: 'tag', color: 'dark' },\n    { type: 'spotify', style: 'spotify' },\n    { type: 'stats', style: 'stats', color: 'dark' },\n    { type: 'text', text: 'where are you...', style: 'glass', color: 'dark' },\n    { type: 'text', text: '...miss u', style: 'glass', color: 'light' },\n    { type: 'text', text: '👀', style: 'glass', color: 'dark' },\n    { type: 'text', text: 'gimme a hug', style: 'soft', color: 'pink' },\n    { type: 'text', text: 'so fluffy!', style: 'soft', color: 'light' },\n    { type: 'text', text: '՞⩌⌯⩌՞', style: 'soft', color: 'blue' },\n    { type: 'text', text: '(´｡• ᵕ •｡`) ♡', style: 'soft', color: 'pink' }\n];\nconst heartOptions = [\n    { char: '🩷', color: 'pink' },\n    { char: '🖤', color: 'black' },\n    { char: '🤍', color: 'white' }\n];\n\nconst container = ThemeUtils.$('.pbc-container');\nconst avatarWrapper = ThemeUtils.$('.pbc-avatar-wrapper');\nconst avatarImg = ThemeUtils.$('.pbc-avatar-img');\nconst bubblesWrapper = ThemeUtils.$('.pbc-bubbles-wrapper');\nfunction createBubble() {\n    if (!bubblesWrapper) return;\n    const templateIndex = ThemeUtils.randomInt(0, bubbleTemplates.length - 1);\n    const template = bubbleTemplates[templateIndex];\n    \n    const bubble = document.createElement('div');\n    bubble.className = `pbc-bubble pbc-bubble--${template.style} pbc-bubble--${template.color || ''}`;\n    \n    let content = '';\n    let bubbleWidthEstimate = 100;\n\n    switch (template.type) {\n        case 'spotify':\n            const bars = Array.from({ length: 15 }, () => \n                `<rect x=\"${ThemeUtils.random(0, 100)}%\" y=\"0\" width=\"2\" height=\"100%\" style=\"transform-origin: center; transform: scaleY(${ThemeUtils.random(0.1, 1).toFixed(2)})\"></rect>`\n            ).join('');\n            content = `<svg viewBox=\"0 0 20 20\"><circle cx=\"10\" cy=\"10\" r=\"9\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\"/><path d=\"M6 13.5C7.5 12.5 9.5 12 11 12.5S14 14 15 14.5M6.5 10.5C8 9.5 10 9 11.5 9.5S14.5 11 15.5 11.5M7 7.5C8.5 6.5 10.5 6 12 6.5S15 8 16 8.5\"/></svg><svg class=\"pbc-waveform\" viewbox=\"0 0 100 12\" preserveAspectRatio=\"none\">${bars}</svg>`;\n            bubbleWidthEstimate = 150;\n            break;\n        case 'stats':\n            const comments = ThemeUtils.randomInt(20, 150);\n            const likes = ThemeUtils.randomInt(100, 999);\n            const followers = ThemeUtils.randomInt(10, 99);\n            content = `<svg viewBox=\"0 0 24 24\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path></svg><span>${comments}</span><svg viewBox=\"0 0 24 24\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path></svg><span>${likes}</span><svg viewBox=\"0 0 24 24\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle></svg><span>${followers}</span>`;\n            bubbleWidthEstimate = 180;\n            break;\n        case 'text':\n        default:\n            let text = template.text.replace('{{char}}', ThemeUtils.getCharacterName());\n            content = `<span>${text}</span>`;\n            bubbleWidthEstimate = text.length * 9 + 30;\n            break;\n    }\n    \n    bubble.innerHTML = content;\n    const wrapperRect = bubblesWrapper.getBoundingClientRect();\n    const maxBottom = wrapperRect.height - 40;\n    const maxLeft = wrapperRect.width - bubbleWidthEstimate;\n    \n    bubble.style.bottom = `${ThemeUtils.randomInt(0, maxBottom)}px`;\n    bubble.style.left = `${ThemeUtils.randomInt(0, Math.max(0, maxLeft))}px`;\n    \n    bubblesWrapper.appendChild(bubble);\n    setTimeout(() => { bubble.remove(); }, 4000);\n}\n\nfunction spawnHearts(count) {\n    for (let i = 0; i < count; i++) {\n        const heartData = heartOptions[ThemeUtils.randomInt(0, heartOptions.length - 1)];\n        const heart = document.createElement('div');\n        heart.className = `pbc-heart pbc-heart--${heartData.color}`;\n        heart.innerHTML = heartData.char;\n        heart.style.left = `${ThemeUtils.randomInt(10, 80)}%`;\n        heart.style.bottom = `${ThemeUtils.randomInt(0, 20)}px`;\n        container.appendChild(heart);\n        setTimeout(() => { heart.remove(); }, 2000);\n    }\n}\nfunction initialize() {\n    if (avatarImg) { avatarImg.src = ThemeUtils.getCharAvatar(); }\n    if (avatarWrapper) {\n        const randomStyle = avatarStyles[ThemeUtils.randomInt(0, avatarStyles.length - 1)];\n        avatarWrapper.classList.add(`pbc-avatar-wrapper--${randomStyle}`);\n    }\n    \n    setInterval(createBubble, 1800);\n    \n    if (container) {\n        container.addEventListener('click', () => {\n            createBubble();\n            if (ThemeUtils.random() < 0.35) {\n                spawnHearts(ThemeUtils.randomInt(2, 4));\n            }\n        });\n    }\n}\n\ninitialize();",
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
            "document.addEventListener('DOMContentLoaded', () => {\n    const container = ThemeUtils.$('.dc-container');\n    const userBubble = ThemeUtils.$('.dc-bubble--user');\n    const charBubble = ThemeUtils.$('.dc-bubble--char');\n    const userAvatarImg = ThemeUtils.$('.dc-indicator--user .typing-indicator-avatar');\n    const charAvatarImg = ThemeUtils.$('.dc-indicator--char .typing-indicator-avatar');\n    const charNameSpan = ThemeUtils.$('.dc-char-name');\n    const charLineTwo = ThemeUtils.$('.dc-bubble--char .dc-line-two');\n\n    function runAnimationSequence() {\n        userBubble.classList.remove('is-visible');\n        charBubble.classList.remove('is-visible');\n        charLineTwo.classList.remove('is-typing');\n\n        setTimeout(() => {\n            if (userBubble) {\n                userBubble.classList.add('is-visible');\n            }\n        }, 500);\n\n        setTimeout(() => {\n            if (charBubble) {\n                charBubble.classList.add('is-visible');\n            }\n            if (charLineTwo) {\n                charLineTwo.classList.add('is-typing');\n            }\n        }, 1500);\n    }\n\n    function initialize() {\n        if (userAvatarImg) userAvatarImg.src = ThemeUtils.getUserAvatar();\n        if (charAvatarImg) charAvatarImg.src = ThemeUtils.getCharAvatar();\n        if (charNameSpan) charNameSpan.textContent = ThemeUtils.getCharacterName();\n\n        runAnimationSequence();\n        setInterval(runAnimationSequence, 5000);\n    }\n\n    initialize();\n});",
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
            "const assetManager = {\n    images: {},\n    imageUrls: {\n        item1: 'https://i.imgur.com/VrrJ3Z4.png',\n        item2: 'https://i.imgur.com/U1mVVFj.png',\n        item3: 'https://i.imgur.com/71efsm9.png',\n        item4: 'https://i.imgur.com/eN7wh93.png'\n    },\n    load() {\n        const promises = Object.entries(this.imageUrls).map(([name, url]) => {\n            return new Promise((resolve, reject) => {\n                const img = new Image();\n                img.src = url;\n                img.onload = () => { this.images[name] = img; resolve(); };\n                img.onerror = reject;\n            });\n        });\n        return Promise.all(promises);\n    }\n};\n\nconst audioManager = {\n    sounds: {}, isMuted: false, currentBgm: null,\n    init() {\n        this.sounds['bgm_menu'] = new Audio('https://files.catbox.moe/40erm4.aac');\n        this.sounds['bgm_easy'] = new Audio('https://files.catbox.moe/7lyf59.aac');\n        this.sounds['bgm_normal'] = new Audio('https://files.catbox.moe/qtmjy0.mp3');\n        this.sounds['bgm_hard'] = new Audio('https://files.catbox.moe/jplvoy.aac');\n        Object.keys(this.sounds).forEach(key => { if (key.startsWith('bgm')) this.sounds[key].loop = true; });\n        this.sounds['sfx_hit'] = new Audio('https://files.catbox.moe/xitita.wav');\n    },\n    playBgm(trackName) { if (this.currentBgm) { this.currentBgm.pause(); this.currentBgm.currentTime = 0; } this.currentBgm = this.sounds[trackName]; if (!this.isMuted && this.currentBgm) { this.currentBgm.play().catch(e => console.warn(\"Autoplay prevented\")); } },\n    playSfx(sfxName) { if (!this.isMuted) { const sfx = this.sounds[sfxName]; if (sfx) { sfx.currentTime = 0; sfx.play(); } } },\n    toggleMute() { this.isMuted = !this.isMuted; ui.muteBtn.textContent = this.isMuted ? '🔇' : '🔊'; if (this.isMuted) { if (this.currentBgm) this.currentBgm.pause(); } else { if (this.currentBgm) this.currentBgm.play(); } },\n    pauseBgm() { if(this.currentBgm) this.currentBgm.pause(); },\n    resumeBgm() { if(this.currentBgm && !this.isMuted) this.currentBgm.play(); },\n    stopAll() { if (this.currentBgm) { this.currentBgm.pause(); this.currentBgm.currentTime = 0; this.currentBgm = null; } }\n};\n\nconst canvas = ThemeUtils.$('#gameCanvas');\nconst ctx = canvas.getContext('2d');\nconst ui = {\n    scoreValue: ThemeUtils.$('#scoreValue'),\n    highscoreList: ThemeUtils.$('#highscoreList'),\n    mainHighscore: ThemeUtils.$('#mainHighscore'),\n    pauseBtn: ThemeUtils.$('#pauseBtn'),\n    muteBtn: ThemeUtils.$('#muteBtn'),\n    startScreen: ThemeUtils.$('#startScreen'),\n    startMenu: ThemeUtils.$('#startMenu'),\n    loadingText: ThemeUtils.$('#loadingText'),\n    pauseScreen: ThemeUtils.$('#pauseScreen'),\n    difficultyBtns: ThemeUtils.$$('.difficulty-btn'),\n    container: ThemeUtils.$('.gh-container'),\n    resumeBtn: ThemeUtils.$('#resumeBtn'),\n    backToMenuBtn: ThemeUtils.$('#backToMenuBtn'),\n};\n\nlet state = { score: 0, highscores: [], entities: [], isActive: false, isPaused: false, spawnTimer: 0, config: {} };\nlet animationFrameId = null;\nconst difficultySettings = { easy: { spawnInterval: 40, speedMultiplier: 0.8 }, normal: { spawnInterval: 22, speedMultiplier: 1.2 }, hard: { spawnInterval: 15, speedMultiplier: 1.8 } };\n\nfunction saveHighscores() {\n    ThemeUtils.sendMessage('save-data', { highscores: state.highscores });\n    console.log('[Heart Slash] Saving scores:', state.highscores);\n}\nfunction loadHighscores() {\n    ThemeUtils.sendMessage('request-data');\n    console.log('[Heart Slash] Requesting scores...');\n}\nfunction updateHighscores(newScore) {\n    if (newScore === 0) return;\n    state.highscores.push(newScore);\n    state.highscores.sort((a, b) => b - a);\n    state.highscores = state.highscores.slice(0, 5);\n    updateHighscoreDisplay();\n    saveHighscores();\n}\nfunction updateHighscoreDisplay() {\n    const topScore = state.highscores.length > 0 ? state.highscores[0] : 0;\n    ui.mainHighscore.textContent = `🏆 High: ${topScore}`;\n    ui.highscoreList.innerHTML = state.highscores.map(score => `<li>${score}</li>`).join('') || '<li>-</li>';\n}\n\nclass Entity { constructor(x, y) { this.x = x; this.y = y; this.dead = false; } update() {} draw() {} }\nclass Item extends Entity {\n    constructor() {\n        const size = ThemeUtils.randomInt(30, 45);\n        super(ThemeUtils.random(size, canvas.width - size), -size);\n        this.size = size;\n        this.speed = (ThemeUtils.random(1, 2.5) * state.config.speedMultiplier);\n        this.hitboxSize = this.size * 0.7;\n        const imageKeys = Object.keys(assetManager.images);\n        this.image = assetManager.images[imageKeys[ThemeUtils.randomInt(0, imageKeys.length - 1)]];\n    }\n    update() { this.y += this.speed; if (this.y > canvas.height + this.size) this.dead = true; }\n    draw() { if (this.image) { ctx.drawImage(this.image, this.x - this.size/2, this.y - this.size/2, this.size, this.size); } }\n}\nclass Particle extends Entity { constructor(x, y) { super(x, y); this.life = 1; this.vx = ThemeUtils.random(-3, 3); this.vy = ThemeUtils.random(-3, 3); } update() { this.x += this.vx; this.y += this.vy; this.vx *= 0.98; this.vy *= 0.98; this.life -= 0.02; if (this.life <= 0) this.dead = true; } draw() { ctx.fillStyle = `rgba(255, 123, 172, ${this.life})`; ctx.fillRect(this.x - 2, this.y - 2, 4, 4); } }\n\nfunction gameLoop() {\n    if (!document.body.contains(ui.container)) {\n        // If the element is gone, stop the loop completely\n        if (animationFrameId) {\n            cancelAnimationFrame(animationFrameId);\n            animationFrameId = null;\n        }\n        return;\n    }\n    \n    if (state.isPaused) {\n        animationFrameId = requestAnimationFrame(gameLoop);\n        return;\n    }\n    \n    if (state.isActive) {\n        ctx.clearRect(0, 0, canvas.width, canvas.height);\n        state.spawnTimer++;\n        if (state.spawnTimer > state.config.spawnInterval) {\n            state.entities.push(new Item());\n            state.spawnTimer = 0;\n        }\n        for (let i = state.entities.length - 1; i >= 0; i--) {\n            const entity = state.entities[i];\n            entity.update();\n            entity.draw();\n            if (entity.dead) state.entities.splice(i, 1);\n        }\n    }\n    \n    animationFrameId = requestAnimationFrame(gameLoop);\n}\n\nfunction handleInteraction(x, y) {\n    if (!state.isActive || state.isPaused) return;\n    const slash = document.createElement('div'); slash.className = 'gh-slash-fx'; slash.style.left = `${x - 50}px`; slash.style.top = `${y - 50}px`; ui.container.appendChild(slash); setTimeout(() => slash.remove(), 200);\n    for (let i = state.entities.length - 1; i >= 0; i--) {\n        const entity = state.entities[i];\n        if (entity instanceof Item) {\n            const distance = Math.hypot(x - entity.x, y - entity.y);\n            if (distance < entity.hitboxSize) {\n                entity.dead = true; audioManager.playSfx('sfx_hit');\n                const popup = document.createElement('div'); popup.className = 'gh-score-popup'; popup.textContent = '+1'; popup.style.left = `${entity.x}px`; popup.style.top = `${entity.y}px`; ui.container.appendChild(popup); setTimeout(() => popup.remove(), 800);\n                for(let j=0; j<8; j++) state.entities.push(new Particle(entity.x, entity.y));\n                updateScore(state.score + 1);\n                break;\n            }\n        }\n    }\n}\n\nfunction updateScore(newScore) { \n    state.score = newScore; \n    ui.scoreValue.textContent = state.score; \n}\n\nfunction setGameScene(scene) {\n    ui.container.className = 'gh-container';\n    ui.container.classList.add(`state-${scene}`);\n}\n\nfunction startGame(difficulty) {\n    state.config = difficultySettings[difficulty];\n    state.isActive = true; \n    state.isPaused = false;\n    state.spawnTimer = 0;\n    state.entities = [];\n    \n    ui.startScreen.style.display = 'none'; \n    ui.pauseScreen.style.display = 'none'; \n    ui.pauseBtn.disabled = false;\n    \n    setGameScene(difficulty);\n    audioManager.playBgm('bgm_' + difficulty);\n    updateScore(0);\n\n    if (animationFrameId) {\n        cancelAnimationFrame(animationFrameId);\n    }\n    gameLoop();\n}\n\nfunction togglePause() {\n    if (!state.isActive) return;\n    state.isPaused = !state.isPaused;\n    ui.pauseScreen.style.display = state.isPaused ? 'flex' : 'none';\n    if (state.isPaused) { \n        audioManager.pauseBgm(); \n    } else { \n        audioManager.resumeBgm(); \n    }\n}\n\nfunction resetGame() {\n    if (animationFrameId) {\n        cancelAnimationFrame(animationFrameId);\n        animationFrameId = null;\n    }\n    \n    state.isActive = false; \n    state.isPaused = false; \n    state.entities = []; \n    state.score = 0;\n    state.spawnTimer = 0;\n    \n    ui.startScreen.style.display = 'flex'; \n    ui.pauseScreen.style.display = 'none'; \n    ui.pauseBtn.disabled = true;\n    \n    setGameScene('menu');\n    audioManager.playBgm('bgm_menu');\n    updateScore(0);\n}\n\nasync function initialize() {\n    window.addEventListener('message', (event) => {\n        const msg = event.data;\n        if (msg?.source === 'typing-indicator-host') {\n            switch (msg.type) {\n                case 'data-response':\n                    if (msg.data && Array.isArray(msg.data.highscores)) {\n                        state.highscores = msg.data.highscores;\n                        updateHighscoreDisplay();\n                        console.log('[Heart Slash] Scores loaded:', state.highscores);\n                    } else {\n                        console.log('[Heart Slash] No scores found or invalid data.');\n                    }\n                    break;\n                case 'graceful-shutdown-request':\n                    console.log('[Heart Slash] Received shutdown request. Cleaning up and replying.');\n                    if (animationFrameId) {\n                        cancelAnimationFrame(animationFrameId);\n                        animationFrameId = null;\n                    }\n                    const wasActive = state.isActive;\n                    if (wasActive) {\n                        updateHighscores(state.score);\n                    }\n                    state.isActive = false;\n                    audioManager.stopAll();\n                    window.parent.postMessage({\n                        source: 'typing-indicator-theme',\n                        type: 'graceful-shutdown-response',\n                        data: { highscores: state.highscores }\n                    }, '*');\n                    break;\n            }\n        }\n    });\n\n    const rect = canvas.getBoundingClientRect(); canvas.width = rect.width; canvas.height = rect.height;\n\n    setGameScene('menu');\n    audioManager.init();\n    loadHighscores();\n\n    try {\n        await assetManager.load();\n        ui.loadingText.style.display = 'none';\n        ui.startMenu.style.display = 'block';\n    } catch (error) {\n        ui.loadingText.textContent = \"Error loading assets!\";\n        console.error(\"Failed to load game assets:\", error);\n        return;\n    }\n\n    ui.difficultyBtns.forEach(btn => { btn.addEventListener('click', (e) => { startGame(e.target.dataset.difficulty); }); });\n    ui.pauseBtn.addEventListener('click', togglePause);\n    ui.resumeBtn.addEventListener('click', togglePause);\n    ui.backToMenuBtn.addEventListener('click', () => {\n        if (state.isActive) {\n            updateHighscores(state.score);\n        }\n        resetGame();\n    });\n    ui.muteBtn.addEventListener('click', () => audioManager.toggleMute());\n\n    const firstInteractionHandler = () => { if (audioManager.sounds['bgm_menu']?.paused) { audioManager.playBgm('bgm_menu'); } document.body.removeEventListener('click', firstInteractionHandler); document.body.removeEventListener('touchstart', firstInteractionHandler); };\n    document.body.addEventListener('click', firstInteractionHandler);\n    document.body.addEventListener('touchstart', firstInteractionHandler);\n\n    canvas.addEventListener('mousedown', (e) => handleInteraction(e.offsetX, e.offsetY));\n    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); const rect = canvas.getBoundingClientRect(); const touch = e.touches[0]; handleInteraction(touch.clientX - rect.left, touch.clientY - rect.top); }, { passive: false });\n}\n\ninitialize();",
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
            "document.addEventListener('DOMContentLoaded', () => {\n    const boardElement = ThemeUtils.$('#g2048-board');\n    const scoreElement = ThemeUtils.$('#g2048-score');\n    const bestScoreElement = ThemeUtils.$('#g2048-best-score');\n    const gameOverOverlay = ThemeUtils.$('#g2048-game-over');\n    const restartButton = ThemeUtils.$('#g2048-restart-btn');\n    const newGameButton = ThemeUtils.$('#g2048-new-game-btn');\n    const undoButton = ThemeUtils.$('#g2048-undo-btn');\n    const menuTitle = ThemeUtils.$('#g2048-menu-title');\n    const continueButton = ThemeUtils.$('#g2048-continue-btn');\n\n    const SIZE = 4;\n    let grid = [];\n    let score = 0;\n    let bestScore = 0;\n    let previousGrid = [];\n    let previousScore = 0;\n    let canUndo = false;\n    \n    function getGameState() {\n        return {\n            grid: grid,\n            score: score,\n            bestScore: bestScore,\n            isGameOver: gameOverOverlay.style.display !== 'none',\n        };\n    }\n\n    function saveAndShutdown() {\n        if (score > bestScore) {\n            bestScore = score;\n        }\n        ThemeUtils.sendMessage('graceful-shutdown-response', getGameState());\n    }\n    \n    window.addEventListener('message', (event) => {\n        const msg = event.data;\n        if (msg?.source === 'typing-indicator-host') {\n            switch (msg.type) {\n                case 'data-response':\n                    const savedState = msg.data;\n                    if (savedState && savedState.grid && !savedState.isGameOver) {\n                        grid = savedState.grid;\n                        score = savedState.score;\n                        bestScore = savedState.bestScore;\n                        \n                        menuTitle.textContent = '发现游戏存档';\n                        continueButton.style.display = 'inline-block';\n                        restartButton.textContent = '新游戏';\n                        gameOverOverlay.style.display = 'flex';\n                        \n                        console.log('[2048] Game state restored. Offering choice to continue.');\n                        updateUI();\n                    } else {\n                        setupNewGame();\n                    }\n                    break;\n                case 'graceful-shutdown-request':\n                    saveAndShutdown();\n                    break;\n            }\n        }\n    });\n\n    function setupNewGame() {\n        grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));\n        score = 0;\n        canUndo = false;\n        gameOverOverlay.style.display = 'none';\n        addRandomTile();\n        addRandomTile();\n        updateUI();\n    }\n    \n    function startNewGameFromMenu() {\n        menuTitle.textContent = '游戏结束!';\n        continueButton.style.display = 'none';\n        restartButton.textContent = '再试一次';\n        setupNewGame();\n    }\n\n    function saveState() {\n        previousGrid = JSON.parse(JSON.stringify(grid));\n        previousScore = score;\n        canUndo = true;\n    }\n\n    function undo() {\n        if (canUndo) {\n            grid = JSON.parse(JSON.stringify(previousGrid));\n            score = previousScore;\n            canUndo = false;\n            updateUI();\n        }\n    }\n\n    function addRandomTile() {\n        let emptyCells = [];\n        for (let r = 0; r < SIZE; r++) { for (let c = 0; c < SIZE; c++) { if (grid[r][c] === 0) emptyCells.push({ r, c }); } }\n        if (emptyCells.length > 0) {\n            let { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];\n            const tileValue = Math.random() < 0.9 ? 2 : 4;\n            grid[r][c] = tileValue;\n        }\n    }\n\n    function move(direction) {\n        saveState();\n        let hasChanged = false;\n        let tempGrid = JSON.parse(JSON.stringify(grid));\n\n        if (direction === 'up') tempGrid = rotateGrid(tempGrid, 1);\n        if (direction === 'right') tempGrid = rotateGrid(tempGrid, 2);\n        if (direction === 'down') tempGrid = rotateGrid(tempGrid, 3);\n\n        for (let r = 0; r < SIZE; r++) {\n            let row = tempGrid[r].filter(val => val !== 0);\n            for (let c = 0; c < row.length - 1; c++) {\n                if (row[c] === row[c + 1]) {\n                    row[c] *= 2;\n                    score += row[c];\n                    row.splice(c + 1, 1);\n                }\n            }\n            while (row.length < SIZE) row.push(0);\n            tempGrid[r] = row;\n        }\n\n        if (direction === 'up') tempGrid = rotateGrid(tempGrid, 3);\n        if (direction === 'right') tempGrid = rotateGrid(tempGrid, 2);\n        if (direction === 'down') tempGrid = rotateGrid(tempGrid, 1);\n\n        hasChanged = JSON.stringify(grid) !== JSON.stringify(tempGrid);\n        \n        if (hasChanged) {\n            grid = tempGrid;\n            addRandomTile();\n            if (isGameOver()) {\n                if (score > bestScore) bestScore = score;\n                menuTitle.textContent = '游戏结束!';\n                continueButton.style.display = 'none';\n                restartButton.textContent = '再试一次';\n                gameOverOverlay.style.display = 'flex';\n            }\n            updateUI();\n        } else {\n            canUndo = false;\n        }\n    }\n\n    function rotateGrid(matrix, n = 1) {\n        for (let i = 0; i < n; i++) {\n            matrix = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());\n        }\n        return matrix;\n    }\n\n    function isGameOver() {\n        for (let r = 0; r < SIZE; r++) {\n            for (let c = 0; c < SIZE; c++) {\n                if (grid[r][c] === 0) return false;\n                if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return false;\n                if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return false;\n            }\n        }\n        return true;\n    }\n\n    function updateUI() {\n        boardElement.innerHTML = '';\n        for (let r = 0; r < SIZE; r++) {\n            for (let c = 0; c < SIZE; c++) {\n                if (grid[r][c] !== 0) {\n                    const tile = document.createElement('div');\n                    tile.className = 'g2048-tile';\n                    tile.dataset.value = grid[r][c];\n                    tile.textContent = grid[r][c];\n                    tile.style.setProperty('--x', c);\n                    tile.style.setProperty('--y', r);\n                    boardElement.appendChild(tile);\n                }\n            }\n        }\n        if (score > bestScore) {\n            bestScore = score;\n        }\n        scoreElement.textContent = score;\n        bestScoreElement.textContent = bestScore;\n        undoButton.disabled = !canUndo;\n    }\n\n    document.addEventListener('keydown', e => {\n        if (gameOverOverlay.style.display === 'none') {\n            e.preventDefault();\n            switch (e.key) {\n                case 'ArrowUp': move('up'); break;\n                case 'ArrowDown': move('down'); break;\n                case 'ArrowLeft': move('left'); break;\n                case 'ArrowRight': move('right'); break;\n            }\n        }\n    });\n\n    let touchStartX = 0, touchStartY = 0;\n    boardElement.addEventListener('touchstart', e => {\n        if (gameOverOverlay.style.display === 'none') {\n            touchStartX = e.touches[0].clientX;\n            touchStartY = e.touches[0].clientY;\n        }\n    });\n\n    boardElement.addEventListener('touchend', e => {\n        if (gameOverOverlay.style.display === 'none') {\n            let touchEndX = e.changedTouches[0].clientX;\n            let touchEndY = e.changedTouches[0].clientY;\n            let dx = touchEndX - touchStartX;\n            let dy = touchEndY - touchStartY;\n            if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {\n                if (Math.abs(dx) > Math.abs(dy)) {\n                    move(dx > 0 ? 'right' : 'left');\n                } else {\n                    move(dy > 0 ? 'down' : 'up');\n                }\n            }\n        }\n    });\n\n    continueButton.addEventListener('click', () => {\n        gameOverOverlay.style.display = 'none';\n    });\n    restartButton.addEventListener('click', startNewGameFromMenu);\n    newGameButton.addEventListener('click', setupNewGame);\n    undoButton.addEventListener('click', undo);\n\n    ThemeUtils.sendMessage('request-data');\n});",
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
            "document.addEventListener('DOMContentLoaded', () => {\n    const textContainer = ThemeUtils.$('.sm-comic-text-container');\n    if (!textContainer) return;\n\n    const comicWords = ['WOW!', 'HI~', 'POW!', 'BAM!', 'ZAP!', '...?!', 'THWIP!'];\n    const comicColors = ['var(--sm-yellow)', 'var(--sm-cyan)', 'var(--sm-white)'];\n\n    function spawnComicWord() {\n        const wordElement = document.createElement('div');\n        wordElement.classList.add('sm-comic-word');\n\n        const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)];\n        const randomColor = comicColors[Math.floor(Math.random() * comicColors.length)];\n        const randomRotate = -25 + Math.random() * 50;\n        const randomTop = 10 + Math.random() * 60;\n\n        let randomLeft;\n        if (Math.random() < 0.5) {\n            randomLeft = Math.random() * 40 - 30;\n        } else {\n            randomLeft = Math.random() * 40 + 70;\n        }\n\n        wordElement.textContent = randomWord;\n        wordElement.style.color = randomColor;\n        wordElement.style.top = `${randomTop}%`;\n        wordElement.style.left = `${randomLeft}%`;\n\n        textContainer.appendChild(wordElement);\n\n        setTimeout(() => {\n            wordElement.remove();\n        }, 1500); // 与CSS动画时长一致\n    }\n\n    function autoSpawner() {\n        spawnComicWord();\n        const randomDelay = Math.random() * 2000 + 2000; \n        setTimeout(autoSpawner, randomDelay);\n    }\n\n    setTimeout(autoSpawner, 2500);\n});",
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
            "document.addEventListener('DOMContentLoaded', () => {\n    const avatar = ThemeUtils.$('.sv-avatar');\n    const textGlitch = ThemeUtils.$('.sv-text-glitch');\n    \n    if (!avatar || !textGlitch) return;\n\n    const originalText = textGlitch.textContent;\n    textGlitch.setAttribute('data-text', originalText);\n\n    setInterval(() => {\n        avatar.style.setProperty('--random-x', Math.random() * 360);\n        avatar.style.setProperty('--random-y', Math.random() * 360);\n    }, 500);\n});",
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
            "document.addEventListener('DOMContentLoaded', () => {\n    const container = ThemeUtils.$('.story-container');\n    const choiceButtons = ThemeUtils.$$('.choice-button');\n    const video = ThemeUtils.$('#main-video');\n    const loadingGif = ThemeUtils.$('#loading-gif');\n    const endingGif = ThemeUtils.$('#ending-gif');\n\n    if (!container || !choiceButtons.length || !video || !loadingGif || !endingGif) return;\n\n    const originalLoadingSrc = loadingGif.src;\n    const originalEndingSrc = endingGif.src;\n\n    function changeState(newState) {\n        container.className = `story-container state-${newState}`;\n    }\n\n    function startCycle() {\n        loadingGif.src = `${originalLoadingSrc}?t=${Date.now()}`;\n        \n        changeState('loading');\n        setTimeout(() => {\n            changeState('choice');\n        }, 1500); \n    }\n\n    choiceButtons.forEach(button => {\n        button.addEventListener('click', () => {\n            changeState('video');\n            video.play();\n        });\n    });\n\n    video.addEventListener('ended', () => {\n        endingGif.src = `${originalEndingSrc}?t=${Date.now()}`;\n        \n        changeState('ending');\n\n        setTimeout(() => {\n            video.currentTime = 0;\n            startCycle();\n        }, 3000);\n    });\n\n    startCycle();\n});",
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
        html: '<div class="mpp-container" data-state="collapsed" data-playlist-visible="false">\n    <div class="mpp-collapsed-view" id="mpp-toggle-expand">\n        <img class="mpp-album-cover-small" id="mpp-avatar-small" src="" alt="Character Avatar">\n        <div class="mpp-deco-icon mpp-icon-waveform"><span></span><span></span><span></span></div>\n        <div class="mpp-deco-icon mpp-icon-heart-top">♡</div>\n        <div class="mpp-deco-icon mpp-icon-heart-bottom">♡</div>\n    </div>\n\n    <div class="mpp-player">\n        <div class="mpp-player-art">\n            <img class="mpp-album-cover" id="mpp-avatar-large" src="" alt="Character Avatar">\n            <div class="mpp-deco-icon mpp-icon-waveform"><span></span><span></span><span></span></div>\n            <div class="mpp-deco-icon mpp-icon-heart-top">♡</div>\n            <div class="mpp-deco-icon mpp-icon-heart-bottom">♡</div>\n        </div>\n        <div class="mpp-player-panel">\n            <div class="mpp-top-controls">\n                <button class="mpp-playlist-toggle" id="mpp-playlist-toggle-btn">\n                    <svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></svg>\n                </button>\n                <button class="mpp-collapse-btn" id="mpp-collapse-btn">\n                    <svg viewBox="0 0 24 24"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>\n                </button>\n            </div>\n            \n            <div class="mpp-song-info">\n                <h2 id="mpp-song-title">Song Title</h2>\n                <p id="mpp-song-artist">Artist</p>\n            </div>\n\n            <div class="mpp-progress-bar-wrapper">\n                <div id="mpp-progress-bar" class="mpp-progress-bar">\n                    <div id="mpp-progress-fill" class="mpp-progress-fill"></div>\n                    <div id="mpp-progress-thumb" class="mpp-progress-thumb"></div>\n                </div>\n                <div class="mpp-time-display">\n                    <span id="mpp-current-time">0:00</span>\n                    <span id="mpp-duration-time">0:00</span>\n                </div>\n            </div>\n\n            <div class="mpp-controls">\n                <button id="mpp-prev-btn" class="mpp-control-btn"></button>\n                <button id="mpp-play-pause-btn" class="mpp-control-btn play"></button>\n                <button id="mpp-next-btn" class="mpp-control-btn"></button>\n            </div>\n            \n            <div class="mpp-lyrics-wrapper">\n                <ul id="mpp-lyrics-list"></ul>\n            </div>\n            \n            <!-- 恢复底部的音浪区 -->\n            <div class="mpp-bottom-bar">\n                <div class="mpp-waveform-bubble">\n                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>\n                </div>\n            </div>\n        </div>\n        \n        <div class="mpp-playlist-panel">\n            <div class="mpp-playlist-header">\n                <h3>播放列表</h3>\n                <button class="mpp-playlist-close-btn" id="mpp-playlist-close-btn">×</button>\n            </div>\n            <ul id="mpp-playlist-list"></ul>\n        </div>\n    </div>\n\n    <audio id="mpp-audio-player" crossorigin="anonymous"></audio>\n</div>',
        iframeCSS:
            '@import url(\'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap\');\n\n:root {\n    --mpp-bg-color: #F1F1F1; --mpp-panel-color: #FFFFFF; --mpp-text-main: #333333;\n    --mpp-text-light: #AAAAAA; --mpp-text-highlight: #111; --mpp-icon-color: #8A8A8A;\n    --mpp-accent-color: #555555; --mpp-border-radius-large: 25px; --mpp-border-radius-small: 12px;\n    --mpp-anim-duration: 0.4s;\n}\n\n@keyframes mpp-wave-quiet { 50% { transform: scaleY(0.5); } }\n@keyframes mpp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n\nbody { background-color: transparent; margin: 0; font-family: \'Noto Sans SC\', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }\n.mpp-container { position: relative; width: 280px; height: 440px; transform-origin: top right; transition: transform var(--mpp-anim-duration) cubic-bezier(0.25, 1, 0.5, 1), opacity var(--mpp-anim-duration) ease; }\n.mpp-container[data-state="collapsed"] { width: 60px; height: 60px; transform: scale(0); opacity: 0; }\n.mpp-container[data-state="collapsed"].visible { transform: scale(1); opacity: 1; }\n.mpp-container[data-state="collapsed"] .mpp-player { display: none; }\n.mpp-collapsed-view { position: relative; width: 60px; height: 60px; cursor: pointer; transform-origin: center center; transition: transform 0.2s ease; }\n.mpp-collapsed-view:hover { transform: scale(1.1); }\n.mpp-album-cover-small { width: 100%; height: 100%; border-radius: 50%; border: 4px solid var(--mpp-bg-color); box-shadow: 0 2px 8px rgba(0,0,0,0.15); object-fit: cover; animation: mpp-spin 25s linear infinite; animation-play-state: paused; }\n.mpp-container.playing .mpp-album-cover-small, .mpp-container.playing .mpp-album-cover { animation-play-state: running; }\n.mpp-deco-icon { position: absolute; background-color: var(--mpp-bg-color); border-radius: 50%; color: var(--mpp-icon-color); display: flex; justify-content: center; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 2; }\n.mpp-collapsed-view .mpp-icon-waveform { width: 22px; height: 22px; top: 10px; left: -12px; gap: 2px; }\n.mpp-collapsed-view .mpp-icon-waveform span { width: 1px; height: 6px; background-color: var(--mpp-icon-color); border-radius: 1px; animation: mpp-wave-quiet 1.5s infinite ease-in-out; }\n.mpp-collapsed-view .mpp-icon-waveform span:nth-child(2) { height: 9px; animation-delay: -1.2s; }\n.mpp-collapsed-view .mpp-icon-waveform span:nth-child(3) { height: 5px; animation-delay: -0.9s; }\n.mpp-collapsed-view .mpp-icon-heart-top { font-size: 8px; width: 16px; height: 16px; top: -3px; right: -2px; }\n.mpp-collapsed-view .mpp-icon-heart-bottom { font-size: 8px; width: 16px; height: 16px; bottom: 0; left: 5px; }\n.mpp-container[data-state="expanded"] { transform: scale(1); opacity: 1; }\n.mpp-container[data-state="expanded"] .mpp-collapsed-view { display: none; }\n.mpp-player { width: 100%; height: 100%; position: relative; overflow: hidden; }\n.mpp-player-art { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 120px; height: 120px; z-index: 2; }\n.mpp-player-art .mpp-icon-waveform { width: 36px; height: 36px; top: 20px; left: -20px; gap: 2px; }\n.mpp-player-art .mpp-icon-waveform span { width: 2px; height: 10px; background-color: var(--mpp-icon-color); border-radius: 1px; animation: mpp-wave-quiet 1.5s infinite ease-in-out; }\n.mpp-player-art .mpp-icon-waveform span:nth-child(2) { height: 15px; animation-delay: -1.2s; }\n.mpp-player-art .mpp-icon-waveform span:nth-child(3) { height: 8px; animation-delay: -0.9s; }\n.mpp-player-art .mpp-icon-heart-top { font-size: 14px; width: 28px; height: 28px; top: 0px; right: -8px; }\n.mpp-player-art .mpp-icon-heart-bottom { font-size: 14px; width: 28px; height: 28px; bottom: 0px; left: 8px; }\n.mpp-album-cover { width: 100%; height: 100%; border-radius: 50%; border: 8px solid var(--mpp-bg-color); box-shadow: 0 4px 12px rgba(0,0,0,0.1); object-fit: cover; animation: mpp-spin 25s linear infinite; animation-play-state: paused; }\n.mpp-player-panel { position: absolute; bottom: 0; width: 100%; height: 370px; background-color: var(--mpp-panel-color); border-radius: var(--mpp-border-radius-large); box-shadow: 0 8px 30px rgba(0,0,0,0.1); padding: 75px 20px 15px; box-sizing: border-box; display: flex; flex-direction: column; transition: transform var(--mpp-anim-duration) ease; }\n.mpp-top-controls { position: absolute; top: 15px; left: 15px; right: 15px; display: flex; justify-content: space-between; align-items: center; z-index: 5; }\n.mpp-collapse-btn, .mpp-playlist-toggle { width: 32px; height: 32px; background: var(--mpp-bg-color); border: none; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center; }\n.mpp-collapse-btn svg, .mpp-playlist-toggle svg { width: 24px; height: 24px; fill: var(--mpp-icon-color); }\n.mpp-song-info { text-align: center; }\n#mpp-song-title { font-size: 20px; font-weight: 600; margin: 0; color: var(--mpp-text-main); }\n#mpp-song-artist { font-size: 13px; margin: 5px 0 15px; color: var(--mpp-text-light); }\n.mpp-progress-bar-wrapper { width: 100%; }\n.mpp-progress-bar { width: 100%; height: 5px; background: var(--mpp-bg-color); border-radius: 2.5px; cursor: pointer; position: relative; }\n.mpp-progress-fill { height: 100%; background: var(--mpp-accent-color); border-radius: 2.5px; }\n.mpp-progress-thumb { width: 10px; height: 10px; background: var(--mpp-accent-color); border-radius: 50%; position: absolute; top: 50%; transform: translate(0, -50%); }\n.mpp-time-display { display: flex; justify-content: space-between; font-size: 11px; font-weight: 500; color: var(--mpp-text-light); margin-top: 8px; }\n.mpp-controls { display: flex; justify-content: center; align-items: center; gap: 45px; margin: 10px 0 5px; }\n.mpp-control-btn { background: none; border: none; cursor: pointer; color: var(--mpp-text-main); padding: 10px; width: 44px; height: 44px; background-repeat: no-repeat; background-position: center; background-size: contain; }\n#mpp-prev-btn { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M6 6h2v12H6zm12 0l-8.5 6 8.5 6V6z"/></svg>\'); }\n#mpp-next-btn { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M6 6l8.5 6-8.5 6V6zm10 12V6h2v12h-2z"/></svg>\'); }\n#mpp-play-pause-btn.play { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M8 5v14l11-7z"/></svg>\'); }\n#mpp-play-pause-btn.pause { background-image: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>\'); }\n.mpp-lyrics-wrapper { flex-grow: 1; overflow: hidden; position: relative; margin: 0; min-height: 0; }\n#mpp-lyrics-list { list-style: none; padding: 0; margin: 0; text-align: center; transition: transform 0.4s ease-out; }\n#mpp-lyrics-list li { color: var(--mpp-text-light); transition: all 0.3s ease; }\n#mpp-lyrics-list li.current { color: var(--mpp-text-highlight); font-weight: 700; transform: scale(1.08); }\n.mpp-original-lyric { font-size: 15px; line-height: 1.5; }\n.mpp-translated-lyric { font-size: 13px; line-height: 1.4; opacity: 0.8; }\n.mpp-bottom-bar { display: flex; align-items: center; margin-top: auto; flex-shrink: 0; }\n.mpp-waveform-bubble { display: flex; justify-content: center; align-items: flex-end; gap: 3px; height: 36px; background-color: var(--mpp-bg-color); border-radius: var(--mpp-border-radius-small); padding: 8px 15px; flex-grow: 1; }\n.mpp-waveform-bubble span { width: 3px; height: 100%; background-color: var(--mpp-icon-color); border-radius: 1.5px; transform-origin: bottom; transform: scaleY(0.1); transition: transform 0.1s ease-out; }\n.mpp-playlist-panel { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); z-index: 10; border-radius: var(--mpp-border-radius-large); padding: 10px; box-sizing: border-box; transform: translateY(100%); transition: transform var(--mpp-anim-duration) ease; display: flex; flex-direction: column; }\n.mpp-container[data-playlist-visible="true"] .mpp-player-panel { transform: scale(0.95); filter: blur(2px); }\n.mpp-container[data-playlist-visible="true"] .mpp-playlist-panel { transform: translateY(0%); }\n.mpp-playlist-header { display: flex; justify-content: space-between; align-items: center; padding: 0 10px 10px; flex-shrink: 0; }\n.mpp-playlist-header h3 { margin: 0; font-weight: 500; color: var(--mpp-text-main); }\n.mpp-playlist-close-btn { background: none; border: none; font-size: 24px; font-weight: 300; color: var(--mpp-icon-color); cursor: pointer; }\n#mpp-playlist-list { list-style: none; padding: 0; margin: 0; overflow-y: auto; flex-grow: 1; }\n#mpp-playlist-list li { padding: 10px 5px; border-bottom: 1px solid var(--mpp-bg-color); cursor: pointer; transition: background-color 0.2s; font-size: 14px; }\n#mpp-playlist-list li:hover { background-color: var(--mpp-bg-color); }\n#mpp-playlist-list li.active { color: var(--mpp-accent-color); font-weight: 700; }',
        iframeJS:
            "document.addEventListener('DOMContentLoaded', () => {\n    let state = {\n        isExpanded: false, isPlaylistVisible: false, isPlaying: false,\n        currentTrackIndex: 0, currentLyricIndex: -1, playlist: [], parsedLRC: [],\n    };\n    let audioContext, analyser, source;\n\n    const dom = {\n        container: ThemeUtils.$('.mpp-container'), toggleExpandBtn: ThemeUtils.$('#mpp-toggle-expand'),\n        collapseBtn: ThemeUtils.$('#mpp-collapse-btn'), audioPlayer: ThemeUtils.$('#mpp-audio-player'),\n        avatarSmall: ThemeUtils.$('#mpp-avatar-small'), avatarLarge: ThemeUtils.$('#mpp-avatar-large'),\n        songTitle: ThemeUtils.$('#mpp-song-title'), songArtist: ThemeUtils.$('#mpp-song-artist'),\n        playPauseBtn: ThemeUtils.$('#mpp-play-pause-btn'), nextBtn: ThemeUtils.$('#mpp-next-btn'),\n        prevBtn: ThemeUtils.$('#mpp-prev-btn'), progressBar: ThemeUtils.$('#mpp-progress-bar'),\n        progressFill: ThemeUtils.$('#mpp-progress-fill'), progressThumb: ThemeUtils.$('#mpp-progress-thumb'),\n        currentTimeEl: ThemeUtils.$('#mpp-current-time'), durationTimeEl: ThemeUtils.$('#mpp-duration-time'),\n        lyricsWrapper: ThemeUtils.$('.mpp-lyrics-wrapper'), lyricsList: ThemeUtils.$('#mpp-lyrics-list'),\n        waveformSpans: ThemeUtils.$$('.mpp-waveform-bubble span'),\n        playlistToggleBtn: ThemeUtils.$('#mpp-playlist-toggle-btn'), playlistList: ThemeUtils.$('#mpp-playlist-list'),\n        playlistPanel: ThemeUtils.$('.mpp-playlist-panel'), playlistCloseBtn: ThemeUtils.$('#mpp-playlist-close-btn'),\n    };\n\n    async function initialize() {\n        const charAvatarUrl = ThemeUtils.getCharAvatar();\n        dom.avatarSmall.src = charAvatarUrl;\n        dom.avatarLarge.src = charAvatarUrl;\n        let playlistFromCard = await ThemeUtils.getPlaylist();\n        if (!playlistFromCard || playlistFromCard.length === 0) {\n            playlistFromCard = [\n                { audioUrl: 'https://files.catbox.moe/fcop94.mp3', lyricsUrl: 'https://files.catbox.moe/ev9d68.lrc', title: 'close your eyes', artist: '本田みちよ' },\n                { audioUrl: 'https://files.catbox.moe/ookw2y.mp3', lyricsUrl: 'https://files.catbox.moe/z5n210.lrc', title: 'All Alone With You', artist: 'EGOIST' },\n            ];\n        }\n        state.playlist = playlistFromCard.map(song => ({\n            title: song.title, artist: song.artist,\n            audioUrl: song.audioUrl || song.mp3, lyricsUrl: song.lyricsUrl || song.lrc,\n        }));\n        renderPlaylist();\n        loadTrack(0);\n        setupEventListeners();\n        setTimeout(() => dom.container.classList.add('visible'), 50);\n    }\n    \n    async function loadTrack(index) {\n        state.currentTrackIndex = index;\n        state.currentLyricIndex = -1;\n        dom.lyricsList.innerHTML = '';\n        dom.lyricsList.style.transform = 'translateY(0px)';\n        updatePlaylistUI();\n        const track = state.playlist[index];\n        if (!track) return;\n        dom.audioPlayer.src = track.audioUrl;\n        dom.songTitle.textContent = track.title || '未知歌曲';\n        dom.songArtist.textContent = track.artist || '未知艺术家';\n        if (track.lyricsUrl) {\n            await fetchAndParseLRC(track.lyricsUrl);\n        } else {\n            state.parsedLRC = [];\n            renderLyrics();\n        }\n    }\n\n    function nextTrack() {\n        const newIndex = (state.currentTrackIndex + 1) % state.playlist.length;\n        loadTrack(newIndex).then(playTrack);\n    }\n    \n    function prevTrack() {\n        const newIndex = (state.currentTrackIndex - 1 + state.playlist.length) % state.playlist.length;\n        loadTrack(newIndex).then(playTrack);\n    }\n\n    function setupAudioContext(){if(audioContext)return;audioContext=new(window.AudioContext||window.webkitAudioContext)();analyser=audioContext.createAnalyser();analyser.fftSize=64;source=audioContext.createMediaElementSource(dom.audioPlayer);source.connect(analyser);analyser.connect(audioContext.destination);visualize()}\n    function playTrack(){if(!audioContext)setupAudioContext();if(audioContext.state==='suspended')audioContext.resume();state.isPlaying=true;dom.audioPlayer.play();dom.playPauseBtn.classList.remove('play');dom.playPauseBtn.classList.add('pause');dom.container.classList.add('playing')}\n    function pauseTrack(){state.isPlaying=false;dom.audioPlayer.pause();dom.playPauseBtn.classList.remove('pause');dom.playPauseBtn.classList.add('play');dom.container.classList.remove('playing')}\n    function updateProgress(){const{duration:e,currentTime:t}=dom.audioPlayer;if(e){const a=(t/e)*100;dom.progressFill.style.width=`${a}%`;dom.progressThumb.style.left=`calc(${a}% - 5px)`;dom.currentTimeEl.textContent=formatTime(t);if(!dom.durationTimeEl.dataset.loaded){dom.durationTimeEl.textContent=formatTime(e);dom.durationTimeEl.dataset.loaded=\"true\"}}updateLyrics(t)}\n    function formatTime(e){const t=Math.floor(e/60),a=Math.floor(e%60);return`${t}:${a.toString().padStart(2,'0')}`}\n    function visualize(){if(!analyser)return;const e=analyser.frequencyBinCount,t=new Uint8Array(e);function a(){requestAnimationFrame(a);analyser.getByteFrequencyData(t);dom.waveformSpans.forEach((a,r)=>{const n=Math.floor(r*(e/dom.waveformSpans.length)),s=Math.max(.05,t[n]/255);a.style.transform=`scaleY(${s})`})}a()}\n    async function fetchAndParseLRC(e){try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const a=await t.text(),r=a.split('\\n').filter(e=>e.trim()!==''),n=/\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g,s=[];for(const o of r){const i=o.replace(n,'').trim();if(!i)continue;const l=[...o.matchAll(n)];for(const c of l){const d=60*parseInt(c[1])+parseInt(c[2])+parseInt(c[3].padEnd(3,'0'))/1e3;s.push({time:d,text:i})}}s.sort((e,t)=>e.time-t.time);const o=[];for(let i=0;i<s.length;i++){const l=s[i],c=s[i+1];if(c&&Math.abs(c.time-l.time)<.01){o.push({time:l.time,text:l.text,translated:c.text});i++}else o.push({time:l.time,text:l.text,translated:null})}state.parsedLRC=o}catch(e){console.error(\"LRC加载或解析失败:\",e);state.parsedLRC=[]}finally{renderLyrics()}}\n    function renderLyrics(){if(state.parsedLRC.length===0){dom.lyricsList.innerHTML='<li>暂无歌词</li>';return}dom.lyricsList.innerHTML=state.parsedLRC.map(e=>`<div><li class=\"mpp-original-lyric\">${e.text}</li>`+(e.translated?`<li class=\"mpp-translated-lyric\">${e.translated}</li>`:\"\")+\"</div>\").join('')}\n    function updateLyrics(e){if(!state.parsedLRC.length)return;let t=-1;for(let a=state.parsedLRC.length-1;a>=0;a--){if(e>=state.parsedLRC[a].time){t=a;break}}if(t!==-1&&t!==state.currentLyricIndex){const a=dom.lyricsList.children;if(a[state.currentLyricIndex])Array.from(a[state.currentLyricIndex].children).forEach(e=>e.classList.remove('current'));state.currentLyricIndex=t;const r=a[state.currentLyricIndex];if(r){Array.from(r.children).forEach(e=>e.classList.add('current'));const n=r.offsetTop-dom.lyricsWrapper.clientHeight/2+r.clientHeight/2;dom.lyricsList.style.transform=`translateY(-${n}px)`}}}\n    function toggleExpand(e){state.isExpanded=e;const t={width:\"87px\",height:\"70px\"},a={width:\"280px\",height:\"440px\"};if(state.isExpanded){ThemeUtils.sendMessage('resize-iframe',a);setTimeout(()=>{dom.container.dataset.state='expanded'},50)}else{togglePlaylist(false);dom.container.dataset.state='collapsed';setTimeout(()=>{ThemeUtils.sendMessage('resize-iframe',t)},400)}}\n    function togglePlaylist(e){state.isPlaylistVisible=e;dom.container.dataset.playlistVisible=state.isPlaylistVisible}\n    function renderPlaylist(){dom.playlistList.innerHTML=state.playlist.map((e,t)=>`<li data-index=\"${t}\">${e.title} - ${e.artist||\"未知\"}</li>`).join('');updatePlaylistUI()}\n    function updatePlaylistUI(){Array.from(dom.playlistList.children).forEach((e,t)=>{e.classList.toggle('active',t===state.currentTrackIndex)})}\n    \n    function setupEventListeners(){\n        dom.toggleExpandBtn.addEventListener('click',()=>toggleExpand(true));\n        dom.collapseBtn.addEventListener('click',()=>toggleExpand(false));\n        dom.playPauseBtn.addEventListener('click',()=>state.isPlaying?pauseTrack():playTrack());\n        dom.nextBtn.addEventListener('click', nextTrack);\n        dom.prevBtn.addEventListener('click', prevTrack);\n        dom.audioPlayer.addEventListener('timeupdate',updateProgress);\n        dom.audioPlayer.addEventListener('canplay',()=>{dom.durationTimeEl.dataset.loaded=\"false\";updateProgress()});\n        dom.audioPlayer.addEventListener('ended',nextTrack);\n        dom.progressBar.addEventListener('click',e=>{if(dom.audioPlayer.duration){dom.audioPlayer.currentTime=e.offsetX/dom.progressBar.clientWidth*dom.audioPlayer.duration}});\n        dom.playlistToggleBtn.addEventListener('click',()=>togglePlaylist(true));\n        dom.playlistCloseBtn.addEventListener('click',()=>togglePlaylist(false));\n        dom.playlistList.addEventListener('click',e=>{\n            if(e.target.tagName==='LI'){\n                const index=parseInt(e.target.dataset.index,10);\n                loadTrack(index).then(playTrack);\n            }\n        });\n    }\n    \n    initialize();\n});",
        sizes: {
            floating_bottom: {
                width: "87px",
                height: "70px",
            },
            chat_center: {
                width: "87px",
                height: "70px",
            },
            draggable: {
                width: "87px",
                height: "70px",
            },
        },
        isBuiltIn: true,
    },
    {
        id: "player_transparent_and_minimalist",
        name: "播放器-透明简约",
        useIframe: true,
        html: '<div id="player-container" class="mini">\n    <div id="mini-toggle" class="mini-toggle">\n        <img id="mini-cover" src="https://i.imgur.com/lcFJxpM.gif" alt="cover">\n    </div>\n\n    <div class="player-content">\n        <div class="cover-art-container">\n            <img id="cover-art" src="https://i.imgur.com/lcFJxpM.gif" alt="Album Cover">\n            <button id="menu-button" class="menu-button" title="播放列表">\n                <svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></svg>\n            </button>\n        </div>\n        <div class="details">\n            <div class="track-info">\n                <div id="track-title" class="marquee"><span>未加载</span></div>\n                <div id="track-artist">...</div>\n            </div>\n            <div id="lyrics-container" class="lyrics-container">\n                <div class="lyrics-line" id="lyrics-line-1">♪</div>\n                <div class="lyrics-line sub" id="lyrics-line-2"></div>\n            </div>\n            <div class="controls">\n                <button id="prev-button" class="control-button" title="上一首">\n                    <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg>\n                </button>\n                <button id="play-pause-button" class="control-button play" title="播放/暂停">\n                    <svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>\n                    <svg class="pause-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>\n                </button>\n                <button id="next-button" class="control-button" title="下一首">\n                    <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></svg>\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <div id="playlist-menu" class="playlist-menu hidden">\n        <div class="playlist-header">\n            <h3>播放列表</h3>\n            <button id="close-playlist-button" class="close-button" title="关闭">\n                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>\n            </button>\n        </div>\n        <ul id="playlist-list"></ul>\n    </div>\n    \n    <audio id="audio-player"></audio>\n</div>',
        iframeCSS:
            "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');\n\n:root {\n    --mp-mini-size: 50px;\n    --mp-cover-spin-duration: 4s;\n    --mp-border-radius: 12px;\n\n    --mp-bg-crystal: rgba(10, 15, 30, 0.25);\n    --mp-border-crystal: rgba(255, 255, 255, 0.2);\n    --mp-shadow-crystal: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05);\n\n    --mp-bg-playlist: rgba(30, 35, 55, 0.5);\n\n    --mp-text-primary: #f8f8f2;\n    --mp-text-secondary: #bd93f9;\n    --mp-text-lyrics-sub: #b0c4de;\n\n    --mp-transition-fast: 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    --mp-transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n* { box-sizing: border-box; }\n\nbody {\n    font-family: 'Noto Sans SC', system-ui, -apple-system, sans-serif;\n    background: transparent; margin: 0; overflow: hidden;\n    width: 100%; height: 100%;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n#player-container {\n    width: 100%; height: 100%; position: relative;\n    cursor: pointer; display: flex;\n    justify-content: center; align-items: center;\n}\n\n.mini-toggle {\n    width: var(--mp-mini-size); height: var(--mp-mini-size);\n    border-radius: 50%; overflow: hidden; position: absolute;\n    box-shadow: 0 4px 20px rgba(0,0,0,0.5);\n    background-color: #282a36;\n    transition: opacity var(--mp-transition-fast), transform var(--mp-transition-fast);\n}\n#mini-cover {\n    width: 100%; height: 100%; object-fit: cover;\n    animation: mp-spin var(--mp-cover-spin-duration) linear infinite;\n    animation-play-state: paused;\n}\n#player-container.playing #mini-cover { animation-play-state: running; }\n\n@keyframes mp-spin {\n    from { transform: rotate(0deg); }\n    to { transform: rotate(360deg); }\n}\n\n#player-container.expanded .mini-toggle {\n    opacity: 0; pointer-events: none; transform: scale(0.5);\n}\n\n.player-content {\n    display: flex; align-items: center;\n    width: 100%; height: 100%;\n    padding: 8px;\n    border-radius: var(--mp-border-radius);\n    background: var(--mp-bg-crystal);\n    border: 1px solid var(--mp-border-crystal);\n    box-shadow: var(--mp-shadow-crystal);\n    opacity: 0; visibility: hidden;\n    transform: scale(0.9);\n    transition: all var(--mp-transition-slow);\n}\n#player-container.expanded .player-content {\n    visibility: visible; opacity: 1; transform: scale(1);\n}\n\n.cover-art-container {\n    width: 110px;\n    height: 110px;\n    flex-shrink: 0; \n    margin-right: 20px;\n    position: relative;\n    border-radius: 8px; overflow: hidden;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n}\n#cover-art { width: 100%; height: 100%; object-fit: cover; }\n.menu-button {\n    position: absolute; bottom: 4px; right: 4px;\n    width: 24px; height: 24px; background-color: rgba(0,0,0,0.4);\n    border: none; border-radius: 50%; cursor: pointer;\n    display: flex; justify-content: center; align-items: center;\n    padding: 0; transition: background-color 0.2s;\n}\n.menu-button:hover { background-color: rgba(0,0,0,0.7); }\n.menu-button svg { width: 16px; height: 16px; fill: #fff; }\n\n.details { \n    flex-grow: 1; color: var(--mp-text-primary); \n    height: 100%; display: flex; flex-direction: column;\n    overflow: hidden; \n}\n.track-info { flex-shrink: 0; padding-bottom: 4px; }\n#track-title { \n    font-size: 14px; font-weight: 700; white-space: nowrap;\n    overflow: hidden; width: 100%;\n}\n#track-artist { \n    font-size: 12px; font-weight: 400; color: var(--mp-text-secondary); \n    opacity: 0.9; margin-top: 3px; \n}\n\n.lyrics-container {\n    flex-grow: 1; min-height: 28px;\n    display: flex; flex-direction: column; justify-content: center;\n}\n.lyrics-line {\n    font-size: 13px; font-weight: 500; color: var(--mp-text-primary);\n    white-space: nowrap; text-overflow: ellipsis; overflow: hidden;\n    width: 100%; line-height: 1.3em;\n}\n.lyrics-line.sub { font-size: 12px; font-weight: 400; color: var(--mp-text-lyrics-sub); }\n\n.controls { display: flex; align-items: center; justify-content: flex-start; gap: 12px; padding-top: 4px; }\n.control-button { background: transparent; border: none; cursor: pointer; padding: 0; display: flex; }\n.control-button svg { width: 20px; height: 20px; fill: #fff; opacity: 0.8; transition: opacity 0.2s, transform 0.2s; }\n.control-button:hover svg { opacity: 1; transform: scale(1.1); }\n#play-pause-button {\n    background-color: rgba(255,255,255,0.1); border-radius: 50%;\n    width: 36px; height: 36px;\n    justify-content: center; align-items: center;\n}\n#play-pause-button svg { \n    width: 20px; height: 20px;\n}\n#play-pause-button.play .play-icon { margin-left: 3px; }\n.control-button.play .pause-icon, .control-button.pause .play-icon { display: none; }\n\n.playlist-menu {\n    position: absolute; top: 0; left: 0;\n    width: 100%; height: 100%;\n    background: var(--mp-bg-playlist);\n    backdrop-filter: blur(8px) saturate(150%);\n    -webkit-backdrop-filter: blur(8px) saturate(150%);\n    border: 1px solid var(--mp-border-crystal);\n    border-radius: var(--mp-border-radius);\n    padding: 10px; z-index: 10;\n    display: flex; flex-direction: column;\n    opacity: 1; visibility: visible;\n    transform: scale(1);\n    transition: all var(--mp-transition-fast);\n}\n.playlist-menu.hidden {\n    opacity: 0; visibility: hidden;\n    transform: scale(0.95); pointer-events: none;\n}\n.playlist-header {\n    display: flex; justify-content: space-between; align-items: center;\n    margin-bottom: 8px; flex-shrink: 0;\n}\n.playlist-header h3 { margin: 0; font-size: 16px; color: var(--mp-text-primary); }\n.close-button { background: transparent; border: none; cursor: pointer; padding: 4px; }\n.close-button svg { width: 20px; height: 20px; fill: var(--mp-text-primary); opacity: 0.7; transition: opacity 0.2s; }\n.close-button:hover svg { opacity: 1; }\n\n#playlist-list { list-style: none; padding: 0; margin: 0; overflow-y: auto; flex-grow: 1; }\n#playlist-list::-webkit-scrollbar { width: 4px; }\n#playlist-list::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.2); border-radius: 4px; }\n#playlist-list li {\n    padding: 8px 10px; border-radius: 6px; cursor: pointer;\n    transition: background-color 0.2s; white-space: nowrap;\n    overflow: hidden; text-overflow: ellipsis; font-size: 14px;\n    color: var(--mp-text-lyrics-sub);\n}\n#playlist-list li:hover { background-color: rgba(255,255,255,0.1); }\n#playlist-list li.active {\n    background-color: rgba(189, 147, 249, 0.2); font-weight: 500;\n    color: var(--mp-text-secondary);\n}",
        iframeJS:
            "document.addEventListener('DOMContentLoaded', () => {\n    const DEFAULT_PLAYLIST = [{\n        title: 'Close Your Eyes',\n        artist: '本田みちよ',\n        audioUrl: 'https://files.catbox.moe/fcop94.mp3',\n        coverUrl: 'https://i.imgur.com/lcFJxpM.gif',\n        lyricsUrl: 'https://files.catbox.moe/ev9d68.lrc'\n    }];\n\n    const dom = {\n        container: ThemeUtils.$('#player-container'),\n        audioPlayer: ThemeUtils.$('#audio-player'),\n        coverArt: ThemeUtils.$('#cover-art'),\n        miniCover: ThemeUtils.$('#mini-cover'),\n        trackTitle: ThemeUtils.$('#track-title span'),\n        trackArtist: ThemeUtils.$('#track-artist'),\n        playPauseBtn: ThemeUtils.$('#play-pause-button'),\n        prevBtn: ThemeUtils.$('#prev-button'),\n        nextBtn: ThemeUtils.$('#next-button'),\n        lyricsLine1: ThemeUtils.$('#lyrics-line-1'),\n        lyricsLine2: ThemeUtils.$('#lyrics-line-2'),\n        menuButton: ThemeUtils.$('#menu-button'),\n        playlistMenu: ThemeUtils.$('#playlist-menu'),\n        playlistList: ThemeUtils.$('#playlist-list'),\n        closePlaylistBtn: ThemeUtils.$('#close-playlist-button'),\n    };\n\n    let currentPlaylist = [];\n    let currentTrackIndex = 0;\n    let isPlaying = false;\n    let isExpanded = false;\n    let lrcData = [];\n\n    function parseLRC(lrcText) {\n        const lines = lrcText.split('\\n').filter(line => line.trim() !== '');\n        const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g;\n        \n        let allLines = [];\n        for (const line of lines) {\n            const content = line.replace(timeRegex, '').trim();\n            if (!content) continue;\n            const matches = [...line.matchAll(timeRegex)];\n            for (const match of matches) {\n                const minutes = parseInt(match[1], 10);\n                const seconds = parseInt(match[2], 10);\n                const milliseconds = parseInt(match[3].padEnd(3, '0'), 10);\n                const time = minutes * 60 + seconds + milliseconds / 1000;\n                allLines.push({ time, text: content });\n            }\n        }\n        \n        allLines.sort((a, b) => a.time - b.time);\n        \n        const mergedLyrics = [];\n        for (let i = 0; i < allLines.length; i++) {\n            const currentLine = allLines[i];\n            const nextLine = allLines[i + 1];\n\n            if (nextLine && Math.abs(nextLine.time - currentLine.time) < 0.01) { \n                mergedLyrics.push({ time: currentLine.time, text: currentLine.text, translated: nextLine.text });\n                i++;\n            } else {\n                mergedLyrics.push({ time: currentLine.time, text: currentLine.text, translated: null });\n            }\n        }\n        return mergedLyrics;\n    }\n\n    const setParentIframeSize = (mode) => {\n        const size = (mode === 'mini') \n            ? { width: '50px', height: '50px' } \n            : { width: '290px', height: '130px' };\n        ThemeUtils.sendMessage('resize-iframe', size);\n    };\n    \n    const expandPlayer = () => {\n        if (isExpanded) return;\n        isExpanded = true;\n        setParentIframeSize('expanded');\n        dom.container?.classList.add('expanded');\n    };\n\n    const collapsePlayer = () => {\n        if (!isExpanded) return;\n        isExpanded = false;\n        setParentIframeSize('mini');\n        dom.container?.classList.remove('expanded');\n        dom.playlistMenu?.classList.add('hidden');\n    };\n    \n    const loadTrack = async (trackIndex) => {\n        if (!currentPlaylist || currentPlaylist.length === 0) return;\n        currentTrackIndex = trackIndex;\n        const track = currentPlaylist[trackIndex];\n        \n        if (dom.trackTitle) dom.trackTitle.textContent = track.title || '未知歌曲';\n        if (dom.trackArtist) dom.trackArtist.textContent = track.artist || '未知艺术家';\n        \n        const coverSrc = track.coverUrl || 'https://i.imgur.com/lcFJxpM.gif';\n        if (dom.coverArt) dom.coverArt.src = coverSrc;\n        if (dom.miniCover) dom.miniCover.src = coverSrc;\n        \n        if (dom.audioPlayer) dom.audioPlayer.src = track.audioUrl;\n        \n        lrcData = [];\n        if (dom.lyricsLine1) dom.lyricsLine1.textContent = '♪';\n        if (dom.lyricsLine2) dom.lyricsLine2.textContent = '';\n        if (track.lyricsUrl) {\n            try {\n                const response = await fetch(track.lyricsUrl);\n                if (response.ok) {\n                    lrcData = parseLRC(await response.text());\n                }\n            } catch (error) { console.error('加载歌词失败:', error); }\n        }\n        updatePlaylistUI();\n    };\n\n    const play = () => {\n        dom.audioPlayer?.play().catch(e => console.error(\"播放失败:\", e));\n        isPlaying = true;\n        dom.container?.classList.add('playing');\n        dom.playPauseBtn?.classList.replace('play', 'pause');\n    };\n\n    const pause = () => {\n        dom.audioPlayer?.pause();\n        isPlaying = false;\n        dom.container?.classList.remove('playing');\n        dom.playPauseBtn?.classList.replace('pause', 'play');\n    };\n\n    const togglePlayPause = () => isPlaying ? pause() : play();\n\n    const updateLyrics = () => {\n        if (lrcData.length === 0 || !dom.audioPlayer) return;\n        const currentTime = dom.audioPlayer.currentTime;\n        let currentLine = { text: dom.lyricsLine1.textContent, translated: dom.lyricsLine2.textContent };\n        \n        const activeLine = lrcData.slice().reverse().find(line => currentTime >= line.time);\n\n        if (activeLine) {\n            currentLine.text = activeLine.text;\n            currentLine.translated = activeLine.translated || '';\n        } else {\n             currentLine.text = '...';\n             currentLine.translated = '';\n        }\n        \n        if (dom.lyricsLine1.textContent !== currentLine.text) dom.lyricsLine1.textContent = currentLine.text;\n        if (dom.lyricsLine2.textContent !== currentLine.translated) dom.lyricsLine2.textContent = currentLine.translated;\n    };\n    \n    const updatePlaylistUI = () => {\n        if (!dom.playlistList) return;\n        dom.playlistList.innerHTML = '';\n        currentPlaylist.forEach((song, index) => {\n            const li = document.createElement('li');\n            li.textContent = `${song.title} - ${song.artist || '未知'}`;\n            if (index === currentTrackIndex) li.classList.add('active');\n            \n            li.addEventListener('click', (e) => {\n                e.stopPropagation();\n                loadTrack(index).then(play);\n                dom.playlistMenu?.classList.add('hidden');\n            });\n            dom.playlistList.appendChild(li);\n        });\n    };\n    \n    const init = async () => {\n        const playlistFromCard = await ThemeUtils.getPlaylist();\n        currentPlaylist = (playlistFromCard && playlistFromCard.length > 0) ? playlistFromCard : DEFAULT_PLAYLIST;\n        \n        const singleSong = currentPlaylist.length <= 1;\n        if(dom.prevBtn) dom.prevBtn.disabled = singleSong;\n        if(dom.nextBtn) dom.nextBtn.disabled = singleSong;\n        \n        await loadTrack(0);\n        pause();\n        collapsePlayer();\n    };\n    \n    const bindEvents = () => {\n        dom.container?.addEventListener('click', (e) => {\n            if (e.target.closest('.control-button, .menu-button, .playlist-menu')) return;\n            isExpanded ? collapsePlayer() : expandPlayer();\n        });\n        \n        dom.menuButton?.addEventListener('click', (e) => {\n            e.stopPropagation();\n            dom.playlistMenu?.classList.remove('hidden');\n        });\n\n        dom.closePlaylistBtn?.addEventListener('click', (e) => {\n            e.stopPropagation();\n            dom.playlistMenu?.classList.add('hidden');\n        });\n\n        dom.playPauseBtn?.addEventListener('click', (e) => { e.stopPropagation(); togglePlayPause(); });\n        \n        const playNext = () => {\n            const newIndex = (currentTrackIndex + 1) % currentPlaylist.length;\n            loadTrack(newIndex).then(play);\n        };\n        const playPrev = () => {\n            const newIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;\n            loadTrack(newIndex).then(play);\n        };\n        \n        dom.prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); playPrev(); });\n        dom.nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); playNext(); });\n        \n        dom.audioPlayer?.addEventListener('ended', playNext);\n        dom.audioPlayer?.addEventListener('timeupdate', updateLyrics);\n    };\n\n    init();\n    bindEvents();\n});",
        sizes: {
            floating_bottom: {
                width: "50px",
                height: "50px",
            },
            chat_center: {
                width: "50px",
                height: "50px",
            },
            draggable: {
                width: "50px",
                height: "50px",
            },
        },
        isBuiltIn: true,
    },
    {
        id: "player-spotify",
        name: "播放器-Spotify",
        useIframe: true,
        html: '<div id="player-container">\n    <div id="mini-view" class="view">\n        <img id="mini-cover" src="" alt="cover">\n    </div>\n    <div id="expanded-view" class="view hidden">\n        <div id="main-content" class="content-wrapper">\n            <header class="player-header">\n                <button id="collapse-btn" class="header-btn">\n                    <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg>\n                </button>\n                <div class="header-title">正在播放</div>\n                <button id="playlist-btn" class="header-btn">\n                    <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>\n                </button>\n            </header>\n            <main class="player-body">\n                <div id="cover-art-wrapper" class="cover-art-wrapper">\n                    <img id="cover-art" src="" alt="Album Cover">\n                </div>\n                <div class="track-info">\n                    <h2 id="track-title">...</h2>\n                    <p id="track-artist">...</p>\n                </div>\n                <div class="progress-bar-container">\n                    <div id="progress-bar-wrapper" class="progress-bar-wrapper">\n                        <div class="progress-track"></div>\n                        <div id="progress-bar" class="progress-bar">\n                            <div class="progress-thumb"></div>\n                        </div>\n                    </div>\n                    <div class="time-stamps">\n                        <span id="current-time">0:00</span>\n                        <span id="duration">0:00</span>\n                    </div>\n                </div>\n                <div class="controls">\n                    <button id="shuffle-btn" class="control-btn secondary"><svg viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></svg></button>\n                    <button id="prev-btn" class="control-btn"><svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></svg></button>\n                    <button id="play-pause-btn" class="control-btn main"><svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg><svg class="pause-icon" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg></button>\n                    <button id="next-btn" class="control-btn"><svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zm12-12v12h2V6h-2z"></path></svg></button>\n                    <button id="repeat-btn" class="control-btn secondary">\n                        <svg class="repeat-all-icon" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></svg>\n                        <svg class="repeat-one-icon" style="display: none;" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zM13 15h-2v-2h2v2zm-2-4h2V9h-2v2z"></path></svg>\n                    </button>\n                </div>\n            </main>\n        </div>\n\n        <div id="lyrics-content" class="content-wrapper hidden">\n            <header class="player-header">\n                <button id="lyrics-back-btn" class="header-btn"><svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path></svg></button>\n                <div class="header-title" id="lyrics-header-title">歌词</div>\n                <div class="header-btn placeholder"></div>\n            </header>\n            <div id="lyrics-container" class="lyrics-container"></div>\n        </div>\n\n        <div id="playlist-content" class="content-wrapper hidden">\n            <header class="player-header">\n                <div class="header-btn placeholder"></div>\n                <div class="header-title">播放列表</div>\n                <button id="playlist-close-btn" class="header-btn"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg></button>\n            </header>\n            <ul id="playlist-list" class="playlist-list"></ul>\n        </div>\n    </div>\n    <audio id="audio-player"></audio>\n</div>',
        iframeCSS:
            "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');\n\n:root {\n    --font-family: 'Inter', 'Noto Sans SC', sans-serif;\n    --bg-main-gradient: linear-gradient(160deg, rgba(45, 45, 45, 0.65), rgba(20, 20, 20, 0.8));\n    --text-primary: #ffffff;\n    --text-secondary: #b3b3b3;\n    --accent-color: #1DB954;\n    --border-color: rgba(255, 255, 255, 0.1);\n    --border-highlight: rgba(255, 255, 255, 0.2);\n    --border-radius-main: 16px;\n    --border-radius-inner: 10px;\n    --shadow-heavy: 0 8px 32px rgba(0,0,0,0.6);\n    --shadow-luminous-edge: inset 0 1px 1px var(--border-highlight);\n    --transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n* { box-sizing: border-box; margin: 0; padding: 0; }\nhtml, body { width: 100%; height: 100%; overflow: hidden; }\nbody { font-family: var(--font-family); background: transparent; color: var(--text-primary); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }\n::-webkit-scrollbar { width: 0; height: 0; }\n.lyrics-container, .playlist-list { scrollbar-width: none; -ms-overflow-style: none; }\n\n#player-container { width: 100%; height: 100%; position: relative; cursor: pointer; }\n.view { width: 100%; height: 100%; transition: opacity var(--transition), transform var(--transition); position: absolute; top: 0; left: 0; }\n.view.hidden { opacity: 0; pointer-events: none; transform: scale(0.95); }\n#mini-view { border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-heavy); }\n#mini-cover { width: 100%; height: 100%; object-fit: cover; }\n\n#expanded-view {\n    background: var(--bg-main-gradient);\n    backdrop-filter: blur(16px) saturate(180%);\n    -webkit-backdrop-filter: blur(16px) saturate(180%);\n    border-radius: var(--border-radius-main);\n    overflow: hidden;\n    padding: 12px;\n    position: relative;\n    box-shadow: \n        var(--shadow-heavy),\n        var(--shadow-luminous-edge),\n        inset 0 -1px 1px rgba(0,0,0,0.2);\n}\n\n#expanded-view::before {\n    content: '';\n    position: absolute;\n    top: 0; left: 0; right: 0; bottom: 0;\n    border-radius: var(--border-radius-main);\n    border: 1px solid var(--border-color);\n    pointer-events: none;\n    z-index: 1;\n}\n\n#expanded-view::after {\n    content: '';\n    position: absolute;\n    top: 1px; left: 1px; right: 1px;\n    height: 1px;\n    background: linear-gradient(to right, transparent, var(--border-highlight), transparent);\n    opacity: 0.7;\n    border-radius: var(--border-radius-main);\n    pointer-events: none;\n    z-index: 1;\n}\n\n.content-wrapper { width: 100%; height: 100%; display: flex; flex-direction: column; transition: opacity 0.3s ease; }\n.content-wrapper.hidden { display: none; }\n\n.player-header { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; z-index: 10; }\n.header-title { font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }\n.header-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px; transition: color var(--transition); }\n.header-btn:hover { color: var(--text-primary); } .header-btn svg { width: 24px; height: 24px; fill: currentColor; } .header-btn.placeholder { width: 32px; height: 32px; }\n\n.player-body { display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; min-height: 0; }\n.cover-art-wrapper { width: 90%; padding-top: 90%; margin: 10px auto 0; position: relative; border-radius: var(--border-radius-inner); overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.5); flex-shrink: 0; }\n#cover-art { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }\n.track-info { text-align: center; flex-shrink: 0; margin-top: 10px; }\n.track-info h2 { font-size: 18px; font-weight: 700; word-break: break-word; }\n.track-info p { font-size: 13px; font-weight: 500; color: var(--text-secondary); margin-top: 4px; word-break: break-word; }\n.progress-bar-container { flex-shrink: 0; margin-top: 10px; }\n.progress-bar-wrapper { width: 100%; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; cursor: pointer; }\n.progress-bar { width: 0%; height: 100%; background: var(--text-primary); border-radius: 2px; position: relative; }\n.progress-bar-wrapper:hover .progress-bar { background: var(--accent-color); }\n.progress-bar-wrapper:hover .progress-thumb { opacity: 1; }\n.progress-thumb { width: 12px; height: 12px; background: var(--text-primary); border-radius: 50%; position: absolute; right: -6px; top: 50%; transform: translateY(-50%); opacity: 0; transition: opacity var(--transition); }\n.time-stamps { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-secondary); margin-top: 6px; font-variant-numeric: tabular-nums; }\n.controls { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; margin-top: 10px; }\n.control-btn { background: none; border: none; color: var(--text-primary); cursor: pointer; padding: 8px; transition: transform 0.2s ease, color var(--transition); }\n.control-btn:active { transform: scale(0.9); }\n.control-btn svg { width: 28px; height: 28px; fill: currentColor; }\n.control-btn.secondary svg { width: 20px; height: 20px; }\n.control-btn.secondary.active { color: var(--accent-color); }\n.control-btn.main { background: transparent; border: 2px solid rgba(255, 255, 255, 0.7); color: var(--text-primary); border-radius: 50%; width: 52px; height: 52px; display: flex; justify-content: center; align-items: center; transition: background-color var(--transition); }\n.control-btn.main:hover { background-color: rgba(255, 255, 255, 0.1); }\n.control-btn.main svg { width: 22px; height: 22px; }\n.control-btn.main .play-icon, .control-btn.main.playing .pause-icon { display: block; }\n.control-btn.main .pause-icon, .control-btn.main.playing .play-icon { display: none; }\n.control-btn.main .play-icon { margin-left: 3px; }\n\n#lyrics-back-btn svg { transform: rotate(90deg); }\n.lyrics-container { flex-grow: 1; overflow-y: auto; padding: 0 5px; min-height: 0; }\n.lyrics-line { padding: 12px 0; font-size: 18px; font-weight: 700; text-align: center; color: var(--text-secondary); opacity: 0.5; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); word-break: break-word; }\n.lyrics-line.active { color: var(--text-primary); opacity: 1; transform: scale(1.02); }\n.lyrics-padding { height: 45%; flex-shrink: 0; }\n\n.playlist-list { list-style: none; flex-grow: 1; overflow-y: auto; min-height: 0; }\n.playlist-list li { display: flex; align-items: center; padding: 10px 4px; border-radius: 6px; cursor: pointer; transition: background-color var(--transition); }\n.playlist-list li:hover { background: rgba(50, 50, 50, 0.7); }\n.playlist-list li.active { color: var(--accent-color); }\n.playlist-cover { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 12px; }\n.playlist-info h3 { font-size: 14px; font-weight: 500; }\n.playlist-info p { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }",
        iframeJS:
            "document.addEventListener('DOMContentLoaded', () => {\n    const DEFAULT_COVER_URL = 'https://i.imgur.com/QpHvo8B.jpeg';\n    const DEFAULT_PLAYLIST = [\n        { title: \"Let Go\", artist: \"Beau Young Prince\", lyricsUrl: \"https://files.catbox.moe/3dp8qo.lrc\", audioUrl: \"https://files.catbox.moe/6492x2.mp3\", coverUrl: \"https://i.imgur.com/gSfUYJK.jpeg\" },\n        { title: \"What's Up Danger\", artist: \"Blackway, Black Caviar\", lyricsUrl: \"https://files.catbox.moe/w6h2a3.lrc\", audioUrl: \"https://files.catbox.moe/tcm7db.mp3\", coverUrl: \"https://i.imgur.com/gSfUYJK.jpeg\" },\n        { title: \"Mona Lisa\", artist: \"Dominic Fike\", lyricsUrl: \"https://files.catbox.moe/rbvfoa.lrc\", audioUrl: \"https://files.catbox.moe/rasy0e.mp3\", coverUrl: \"https://i.imgur.com/B9lSbdy.jpeg\" },\n        { title: \"Silk and Cologne\", artist: \"ei8ht, Offset\", lyricsUrl: \"https://files.catbox.moe/ltxfcq.lrc\", audioUrl: \"https://files.catbox.moe/j0hl5m.mp3\", coverUrl: \"https://i.imgur.com/B9lSbdy.jpeg\" },\n        { title: \"Scared of the Dark\", artist: \"Lil Wayne, Ty Dolla $ign, XXXTENTACION\", lyricsUrl: \"https://files.catbox.moe/kaozzt.lrc\", audioUrl: \"https://files.catbox.moe/mrzvse.mp3\", coverUrl: \"https://i.imgur.com/gSfUYJK.jpeg\" },\n        { title: \"Am I Dreaming\", artist: \"Metro Boomin, A$AP Rocky, Roisee\", lyricsUrl: \"https://files.catbox.moe/xecaha.lrc\", audioUrl: \"https://files.catbox.moe/tmfv9t.mp3\", coverUrl: \"https://i.imgur.com/B9lSbdy.jpeg\" },\n        { title: \"Self Love\", artist: \"Metro Boomin, Coi Leray\", lyricsUrl: \"https://files.catbox.moe/n08sxt.lrc\", audioUrl: \"https://files.catbox.moe/jxxc8e.mp3\", coverUrl: \"https://i.imgur.com/B9lSbdy.jpeg\" },\n        { title: \"Hummingbird\", artist: \"Metro Boomin, James Blake\", lyricsUrl: \"https://files.catbox.moe/mz1a4g.lrc\", audioUrl: \"https://files.catbox.moe/wqe6jy.mp3\", coverUrl: \"https://i.imgur.com/B9lSbdy.jpeg\" },\n        { title: \"Sunflower\", artist: \"Post Malone, Swae Lee\", lyricsUrl: \"https://files.catbox.moe/m5k19z.lrc\", audioUrl: \"https://files.catbox.moe/aawwzw.mp3\", coverUrl: \"https://i.imgur.com/B9lSbdy.jpeg\" }\n    ];\n    const dom = { container: ThemeUtils.$('#player-container'), audioPlayer: ThemeUtils.$('#audio-player'), miniView: ThemeUtils.$('#mini-view'), miniCover: ThemeUtils.$('#mini-cover'), expandedView: ThemeUtils.$('#expanded-view'), mainContent: ThemeUtils.$('#main-content'), lyricsContent: ThemeUtils.$('#lyrics-content'), playlistContent: ThemeUtils.$('#playlist-content'), coverArt: ThemeUtils.$('#cover-art'), trackTitle: ThemeUtils.$('#track-title'), trackArtist: ThemeUtils.$('#track-artist'), currentTime: ThemeUtils.$('#current-time'), duration: ThemeUtils.$('#duration'), progressBarWrapper: ThemeUtils.$('#progress-bar-wrapper'), progressBar: ThemeUtils.$('#progress-bar'), playPauseBtn: ThemeUtils.$('#play-pause-btn'), prevBtn: ThemeUtils.$('#prev-btn'), nextBtn: ThemeUtils.$('#next-btn'), shuffleBtn: ThemeUtils.$('#shuffle-btn'), repeatBtn: ThemeUtils.$('#repeat-btn'), collapseBtn: ThemeUtils.$('#collapse-btn'), playlistBtn: ThemeUtils.$('#playlist-btn'), playlistCloseBtn: ThemeUtils.$('#playlist-close-btn'), playlistList: ThemeUtils.$('#playlist-list'), coverArtWrapper: ThemeUtils.$('#cover-art-wrapper'), lyricsContainer: ThemeUtils.$('#lyrics-container'), lyricsBackBtn: ThemeUtils.$('#lyrics-back-btn'), repeatAllIcon: ThemeUtils.$('.repeat-all-icon'), repeatOneIcon: ThemeUtils.$('.repeat-one-icon'), };\n    let currentPlaylist = []; let currentTrackIndex = 0; let isPlaying = false; let playMode = 'normal'; let lrcData = []; let isExpanded = false;\n\n    const setIframeSize = (expanded) => { const size = expanded ? { width: '320px', height: '480px' } : { width: '70px', height: '70px' }; ThemeUtils.sendMessage('resize-iframe', size); };\n    const switchView = (viewToShow) => { [dom.mainContent, dom.lyricsContent, dom.playlistContent].forEach(view => view.classList.add('hidden')); viewToShow.classList.remove('hidden'); };\n    const expandPlayer = () => { if (isExpanded) return; isExpanded = true; dom.miniView.classList.add('hidden'); dom.expandedView.classList.remove('hidden'); setIframeSize(true); };\n    const collapsePlayer = () => { if (!isExpanded) return; isExpanded = false; dom.expandedView.classList.add('hidden'); dom.miniView.classList.remove('hidden'); setIframeSize(false); setTimeout(() => switchView(dom.mainContent), 300); };\n    const loadTrack = async (index) => { if (!currentPlaylist || !currentPlaylist[index]) return; currentTrackIndex = index; const track = currentPlaylist[index]; dom.trackTitle.textContent = track.title; dom.trackArtist.textContent = track.artist; const coverSrc = track.coverUrl || DEFAULT_COVER_URL; dom.coverArt.src = coverSrc; dom.miniCover.src = coverSrc; dom.audioPlayer.src = track.audioUrl; lrcData = []; dom.lyricsContainer.innerHTML = '正在加载歌词...'; if (track.lyricsUrl) { try { const res = await fetch(track.lyricsUrl); const text = await res.text(); lrcData = ((lrcText) => { const lines = lrcText.split('\\n').filter(line => line.trim() !== ''); const timeRegex = /\\[(\\d{2}):(\\d{2})\\.(\\d{2,3})\\]/g; let allLines = []; for (const line of lines) { const content = line.replace(timeRegex, '').trim(); if (!content) continue; const matches = [...line.matchAll(timeRegex)]; for (const match of matches) { const minutes = parseInt(match[1], 10); const seconds = parseInt(match[2], 10); const milliseconds = parseInt(match[3].padEnd(3, '0'), 10); const time = minutes * 60 + seconds + milliseconds / 1000; allLines.push({ time, text: content }); } } allLines.sort((a, b) => a.time - b.time); const mergedLyrics = []; for (let i = 0; i < allLines.length; i++) { const currentLine = allLines[i]; const nextLine = allLines[i + 1]; if (nextLine && Math.abs(nextLine.time - currentLine.time) < 0.01) { mergedLyrics.push({ time: currentLine.time, text: currentLine.text, translated: nextLine.text }); i++; } else { mergedLyrics.push({ time: currentLine.time, text: currentLine.text, translated: null }); } } return mergedLyrics; })(text); renderLyrics(); } catch (e) { dom.lyricsContainer.innerHTML = '歌词加载失败'; } } else { dom.lyricsContainer.innerHTML = '暂无歌词'; } updatePlaylistUI(); };\n    const play = () => { isPlaying = true; dom.playPauseBtn.classList.add('playing'); dom.audioPlayer.play().catch(e => { console.error(\"Playback failed:\", e); pause(); }); };\n    const pause = () => { isPlaying = false; dom.playPauseBtn.classList.remove('playing'); dom.audioPlayer.pause(); };\n    const playNextTrack = () => { let nextIndex; if (playMode === 'repeat-one') { nextIndex = currentTrackIndex; } else if (playMode === 'shuffle') { if (currentPlaylist.length <= 1) { nextIndex = 0; } else { do { nextIndex = Math.floor(Math.random() * currentPlaylist.length); } while (nextIndex === currentTrackIndex); } } else { nextIndex = (currentTrackIndex + 1) % currentPlaylist.length; } loadTrack(nextIndex).then(play); };\n    const playPrevTrack = () => { const prevIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length; loadTrack(prevIndex).then(play); };\n    const togglePlayMode = () => { const modes = ['normal', 'repeat-all', 'repeat-one', 'shuffle']; const currentModeIndex = modes.indexOf(playMode); playMode = modes[(currentModeIndex + 1) % modes.length]; dom.shuffleBtn.classList.toggle('active', playMode === 'shuffle'); dom.repeatBtn.classList.toggle('active', playMode === 'repeat-all' || playMode === 'repeat-one'); dom.repeatAllIcon.style.display = (playMode === 'repeat-one') ? 'none' : 'block'; dom.repeatOneIcon.style.display = (playMode === 'repeat-one') ? 'block' : 'none'; };\n    const formatTime = (seconds) => { const min = Math.floor(seconds / 60); const sec = Math.floor(seconds % 60).toString().padStart(2, '0'); return `${min}:${sec}`; };\n    const updateProgress = () => { if (!dom.audioPlayer.duration) return; const progressPercent = (dom.audioPlayer.currentTime / dom.audioPlayer.duration) * 100; dom.progressBar.style.width = `${progressPercent}%`; dom.currentTime.textContent = formatTime(dom.audioPlayer.currentTime); };\n    const renderLyrics = () => { const lyricsHtml = lrcData.map((line, index) => `<div class=\"lyrics-line\" data-index=\"${index}\">${line.text}${line.translated ? `<br><small>${line.translated}</small>` : ''}</div>`).join(''); const paddingElement = '<div class=\"lyrics-padding\"></div>'; dom.lyricsContainer.innerHTML = paddingElement + lyricsHtml + paddingElement; };\n    const updateActiveLyrics = () => { if (lrcData.length === 0 || !isExpanded || dom.lyricsContent.classList.contains('hidden')) return; const currentTime = dom.audioPlayer.currentTime; let activeIndex = -1; for (let i = lrcData.length - 1; i >= 0; i--) { if (currentTime >= lrcData[i].time) { activeIndex = i; break; } } if (activeIndex !== -1) { const currentActiveLine = dom.lyricsContainer.querySelector('.lyrics-line.active'); const currentIndex = currentActiveLine ? parseInt(currentActiveLine.dataset.index) : -1; if (currentIndex !== activeIndex) { if (currentActiveLine) currentActiveLine.classList.remove('active'); const newActiveLine = dom.lyricsContainer.querySelector(`.lyrics-line[data-index=\"${activeIndex}\"]`); if (newActiveLine) { newActiveLine.classList.add('active'); requestAnimationFrame(() => { if (newActiveLine && typeof newActiveLine.scrollIntoView === 'function') newActiveLine.scrollIntoView({ behavior: 'smooth', block: 'center' }); }); } } } };\n    const updatePlaylistUI = () => { dom.playlistList.innerHTML = currentPlaylist.map((track, index) => ` <li data-index=\"${index}\" class=\"${index === currentTrackIndex ? 'active' : ''}\"> <img src=\"${track.coverUrl || DEFAULT_COVER_URL}\" class=\"playlist-cover\"> <div class=\"playlist-info\"><h3>${track.title}</h3><p>${track.artist}</p></div> </li>`).join(''); };\n    const init = async () => { setIframeSize(false); const playlistFromCard = await ThemeUtils.getPlaylist(); currentPlaylist = (playlistFromCard && playlistFromCard.length > 0) ? playlistFromCard : DEFAULT_PLAYLIST; await loadTrack(0); };\n\n    dom.miniView.addEventListener('click', expandPlayer);\n    dom.collapseBtn.addEventListener('click', collapsePlayer);\n    dom.playlistBtn.addEventListener('click', () => switchView(dom.playlistContent));\n    dom.playlistCloseBtn.addEventListener('click', () => switchView(dom.mainContent));\n    dom.coverArtWrapper.addEventListener('click', () => switchView(dom.lyricsContent));\n    dom.lyricsBackBtn.addEventListener('click', () => switchView(dom.mainContent));\n    dom.playPauseBtn.addEventListener('click', () => isPlaying ? pause() : play());\n    dom.nextBtn.addEventListener('click', playNextTrack);\n    dom.prevBtn.addEventListener('click', playPrevTrack);\n    dom.shuffleBtn.addEventListener('click', () => { playMode = (playMode === 'shuffle') ? 'normal' : 'shuffle'; dom.shuffleBtn.classList.toggle('active', playMode === 'shuffle'); dom.repeatBtn.classList.remove('active'); dom.repeatAllIcon.style.display = 'block'; dom.repeatOneIcon.style.display = 'none'; });\n    dom.repeatBtn.addEventListener('click', () => { if (playMode === 'normal' || playMode === 'shuffle') { playMode = 'repeat-all'; } else if (playMode === 'repeat-all') { playMode = 'repeat-one'; } else { playMode = 'normal'; } dom.repeatBtn.classList.toggle('active', playMode === 'repeat-all' || playMode === 'repeat-one'); dom.shuffleBtn.classList.remove('active'); dom.repeatAllIcon.style.display = (playMode === 'repeat-one') ? 'none' : 'block'; dom.repeatOneIcon.style.display = (playMode === 'repeat-one') ? 'block' : 'none'; });\n    dom.audioPlayer.addEventListener('timeupdate', () => { updateProgress(); updateActiveLyrics(); });\n    dom.audioPlayer.addEventListener('loadedmetadata', () => dom.duration.textContent = formatTime(dom.audioPlayer.duration));\n    dom.audioPlayer.addEventListener('ended', playNextTrack);\n    dom.progressBarWrapper.addEventListener('click', (e) => { const rect = dom.progressBarWrapper.getBoundingClientRect(); const clickX = e.clientX - rect.left; if (dom.audioPlayer.duration) { dom.audioPlayer.currentTime = (clickX / rect.width) * dom.audioPlayer.duration; } });\n    dom.playlistList.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) { const index = parseInt(li.dataset.index, 10); loadTrack(index).then(play); switchView(dom.mainContent); } });\n\n    init();\n});",
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
];

// ===================================================================
//                        统一导出
// ===================================================================

export { presets, themes };
