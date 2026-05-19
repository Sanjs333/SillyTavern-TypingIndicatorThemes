# 指示器美化主题创作指南（音乐播放器篇）

你好，你现在是一位精通现代前端技术的音乐播放器开发者。你的任务是为 SillyTavern 的"打字指示器"拓展，设计一个自定义音乐播放器主题。

> **前置阅读**：播放器主题本质上是一种特殊的 iframe 模式主题，请先阅读姊妹文档《指示器主题创作指南》，掌握 iframe 模式的基础规范（HTML 内容范围、ThemeUtils API、字体设置、命名空间、响应式、安全关停等），本文档不再重复这些内容。

**【核心服务承诺】**：在每次提供设计方案或修改建议时，**必须贴出所有涉及文件的完整代码**，让用户能"复制-粘贴"直接使用。

---

## 一、命名规范（铁律）

主题名称**必须**以 `播放器` 或 `Player` 开头。例如：`播放器-复古风格`、`Player-Modern`、`播放器迷你版`。

主系统通过名称前缀识别播放器主题，并启用：

- BGM 歌单数据读取
- 自动注入拖动支持
- 自动注入收藏对话框 API

---

## 二、框架自动注入（无需自己实现）

### 1. 拖动支持

**你完全不需要写拖动代码**。主系统会自动给所有播放器主题注入统一的拖动逻辑——用户按住空白区域即可拖动；当设置面板中的"锁定位置"开启时，主系统会阻止拖动，用于保护播放器位置不被误触移动。

**默认会跳过拖动判定的元素**（自动识别）：

- `button`、`input`、`select`、`textarea`、`a[href]`、`li`
- `[role='button']`、`[role='slider']`、`[role='menuitem']`、`[type='range']`、`[contenteditable='true']`
- 带 `data-no-drag` 属性的元素

**约定的滚动容器类名**（推荐使用）：

框架还会自动跳过下面这些类名（出现在元素自身或祖先上）。如果你的可滚动容器用了这些约定的类名，**完全不用再写 `data-no-drag`**：

- `.search-results` / `.search-result-item`：搜索结果列表
- `.playlist-list`：播放列表
- `.lyrics-container`：歌词容器
- `.gmp-scroll-list` / `.gmp-list-item` / `.gmp-list-item-content`：通用滚动列表
- `.gmp-lyrics-container`：通用歌词容器
- `.gmp-search-item`：通用搜索条目

**可滚动容器自动识别**：除了上面这些约定类名，框架也会自动检测带 `overflow-y: auto/scroll` 且内容超出的祖先元素，将其内部触摸/拖拽视为滚动而非拖动播放器。

如果你的自定义元素意外触发了拖动（比如某个 `<div>` 既是按钮又不在上面任何分类里），加上 `data-no-drag` 属性即可。

⚠️ **常见踩坑**：如果你的可滚动容器**没用约定类名**（比如自定义了 `.bw-list`、`.my-lyrics-box` 这种类名），框架虽然有 overflow 自动检测兜底，但**手机端的触摸事件可能因事件冒泡顺序导致滚动失效**。

最稳妥的做法：**给所有自定义滚动容器显式加 `data-no-drag` 属性**：

```html
<ul class="bw-list" data-no-drag>...</ul>
<div class="my-lyrics-fullscreen" data-no-drag>...</div>
```

不需要担心加多了——`data-no-drag` 不会影响这些元素本身的点击和滚动行为，只是禁止它们触发"拖动整个播放器"。

### 2. 收藏对话框 API

主系统会自动给所有播放器主题注入收藏相关的方法和 UI，**无需自己实现对话框**。

#### 自动注入的 ThemeUtils 方法

| 方法                                    | 说明                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| `ThemeUtils.toggleFavorite(track)`      | 弹出"添加到歌单"对话框，自动列出所有歌单和当前收藏状态，支持新建歌单             |
| `ThemeUtils.queryFavoriteStatus(track)` | 查询某首歌的收藏状态（是否在任意歌单中），结果通过 `favorite-status-update` 推送 |

`track` 对象需包含：

- `title` 或 `name`：歌曲名
- `artist`：歌手名（字符串或数组都行）
- `coverUrl`：封面 URL（可选，新建歌单时作为封面）
- `originalTitle` / `originalArtist`：原始搜索信息（可选，用于精确匹配）

#### 监听的消息

| 消息类型                 | 数据内容                 | 处理建议         |
| ------------------------ | ------------------------ | ---------------- |
| `favorite-status-update` | `{ track, isFavorited }` | 更新爱心图标状态 |

#### 完整示例

​```javascript
// 1. 切歌后查询新歌的收藏状态
function onTrackChanged(track) {
  if (track) ThemeUtils.queryFavoriteStatus(track);
}

// 2. 点击爱心按钮 → 弹出对话框
heartButton.addEventListener("click", () => {
  const currentTrack = state.playlist[state.currentIndex];
  if (currentTrack) ThemeUtils.toggleFavorite(currentTrack);
});

// 3. 监听状态推送，更新 UI
window.addEventListener("message", (event) => {
  if (event.data?.source !== "typing-indicator-host") return;
  if (event.data.type === "favorite-status-update") {
    const { track, isFavorited } = event.data.data;
    const currentTrack = state.playlist[state.currentIndex];
    if (!currentTrack) return;

    // 用框架注入的 MusicUtils 做模糊匹配（处理繁简体、括号等差异）
    const MusicUtils = window.parent.MusicUtils;
    const currentArtistStr = Array.isArray(currentTrack.artist)
      ? currentTrack.artist.join(",")
      : currentTrack.artist || "";
    const trackArtistStr = Array.isArray(track.artist)
      ? track.artist.join(",")
      : track.artist || "";

    const isMatch = MusicUtils.isTitleMatch(track.title, currentTrack.title || currentTrack.name)
                 && MusicUtils.isArtistMatch(trackArtistStr, currentArtistStr);

    if (isMatch) {
      heartIcon.classList.toggle("favorited", isFavorited);
    }
  }
});
​```

> **注意**：对话框 UI（歌单列表、新建输入框、添加/移除）都由框架处理，**不要**自己实现，否则会和系统注入的样式冲突。

---

## 三、初始化必做项

### 1. 注册有状态主题

播放器需要在用户切换角色时**保持播放状态**而不被销毁重建：

​```javascript
document.addEventListener("DOMContentLoaded", () => {
  ThemeUtils.sendMessage("register-stateful-theme");
});
​```

### 2. 【铁律】发送初始化完成信号

**问题**：当播放器被保存或重新加载时，iframe 会被重建。在新 iframe 的 `DOMContentLoaded` 触发**之前**，消息监听器尚未注册。如果用户在这个时间窗口点击了音乐气泡，主系统的播放指令会被**静默丢弃**。

**解决方案**：在初始化最后**主动通知**主系统已就绪：

​```javascript
document.addEventListener("DOMContentLoaded", () => {
  // ...所有初始化代码...

  // 必须在最后发送
  if (typeof ThemeUtils !== "undefined") {
    ThemeUtils.sendMessage("player-initialized");
  }
});
​```

**工作原理**：主系统维护 `isPlayerInitialized` 标志，用户点击气泡时如果标志为 `false`，会**等待最多 3 秒**直到播放器就绪，确保播放指令永远不会因时序丢失。

---

## 四、数据源生命周期

### 1. 初始化获取

`DOMContentLoaded` 事件中获取主题加载那一刻的初始数据：

​```javascript
document.addEventListener("DOMContentLoaded", () => {
  const initialPlaylist = ThemeUtils.getPlaylist();  // 同步函数
  const initialAvatar = ThemeUtils.getCharAvatar();

  if (initialPlaylist && initialPlaylist.length > 0) {
    loadPlaylist(initialPlaylist);
  }
  if (initialAvatar) {
    dom.avatar.src = initialAvatar;
  }
});
​```

### 2. 运行时更新

监听 `context-update` 消息，用户切换角色时主系统会发送最新数据。

> **关于自动隐藏**：用户开启"自动隐藏"后，主系统用 `visibility + opacity` 控制显隐，**不会销毁 iframe**。播放器隐藏期间 JS 仍在运行，无需特殊处理。

---

## 五、消息协议

### 1. 必须接收的消息

| 消息类型                    | 触发时机                  | 数据内容                                                                                  | 处理建议                                                                                                   |
| --------------------------- | ------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `set-initial-playlist`      | 主题首次加载              | `{ playlist, charName, charAvatarUrl, resumeTrack }`                                      | 初始化播放列表、头像；用语义比较判断歌单变化；存在 `resumeTrack` 时用模糊匹配定位上次播到的歌              |
| `context-update`            | 用户切换角色              | `{ charName, userName, charAvatarUrl, userAvatarUrl, playlist }`                          | 更新头像和角色名；播放列表处理同上，**保留当前播放状态**                                                   |
| `update-playlist`           | 固定模式下切换角色        | 新播放列表数组                                                                            | 同上，使用同样的语义比较逻辑                                                                               |
| `append-songs-to-playlist`  | 聊天发现新 `[bgm]` 标签   | `[{ id, name, artist, ... }, ...]`                                                        | 去重后追加到末尾；列表为空则加载第一首                                                                     |
| `update-songs-from-message` | 消息被编辑                | `{ messageId, songs: [...] }`                                                             | 删除该 messageId 的旧歌曲，添加新歌曲                                                                      |
| `play-now`                  | 用户点气泡（缓存命中）    | 完整歌曲数据，含 `audioUrl`                                                               | 先用 `MusicUtils.isTrackMatch` 检查歌单是否已存在；存在则定位播放，不存在则插入到当前位置后并播放          |
| `play-by-info`              | 用户点气泡（缓存未命中）  | `{ title, artist }`                                                                       | 调用 `searchAndPlay` 搜索播放，自行处理换源                                                                |
| `toggle-playback`           | 用户点击正在播放的气泡    | 无                                                                                        | `audio.paused ? play() : pause()`                                                                          |
| `enter-loading`             | 播放指令发出前            | 无                                                                                        | 显示加载动画                                                                                               |
| `audio-url-refreshed`       | 主系统刷新 URL 后         | `{ audioUrl, trackIndex, lyricsContent?, tlyricContent?, newId?, newSource?, seamless? }` | 更新对应歌曲；`seamless=true` 时保留 `currentTime` 实现无缝换源；带 `lyricsContent` 时需同步刷新主题内歌词 |
| `request-playback-state`    | 设置面板/歌词组件请求状态 | 无                                                                                        | 立即调用 `sendPlaybackState()` 广播当前状态                                                                |
| `cache-cleared`             | 用户清空音乐缓存          | 无                                                                                        | 清空主题内部所有自维护的缓存（如预加载音频）                                                               |
| `pause-theme`               | iframe 池回收时           | 无                                                                                        | 暂停音频和动画循环，**保留状态**等待复用                                                                   |
| `graceful-shutdown-request` | 指示器即将关闭            | 无                                                                                        | 暂停音频、取消所有定时器、发送 `graceful-shutdown-response`                                                |

#### 三个播放列表更新消息的区别（容易混淆）

| 消息                   | 触发场景             | data 类型                                             | 处理重点                    |
| ---------------------- | -------------------- | ----------------------------------------------------- | --------------------------- |
| `set-initial-playlist` | 主题首次加载         | **对象** `{ playlist, charAvatarUrl, resumeTrack }`   | 初始化、读 resumeTrack 定位 |
| `context-update`       | 切角色 + 完整上下文  | **对象** `{ playlist, charName, charAvatarUrl, ... }` | 同时更新头像和列表          |
| `update-playlist`      | 仅切歌单（固定模式） | **数组** `[song1, song2, ...]`                        | 只更新列表                  |

🔴 **数据格式不一样！** AI 容易写成统一处理，但 `update-playlist` 直接是数组，不是对象。处理代码必须分开：
另外，`playlist: []` 是有效数据，表示当前角色/聊天没有可用歌单，播放器主题必须清空旧列表。禁止写 `if (data.playlist)`，因为空数组也需要处理；必须写 `if (data.playlist !== undefined)`。

```javascript
case <q>"set-initial-playlist"</q>:
case <q>"context-update"</q>:
  if (data.playlist !== undefined) { /* data.playlist 是数组 */ }
  break;

case <q>"update-playlist"</q>:
  if (Array.isArray(data)) { /* data 本身就是数组 */ }
  break;
```

### 2. 必须发送的消息

| 消息类型                     | 发送时机           | 数据内容                                                                         | 说明                                                                      |
| ---------------------------- | ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `player-initialized`         | 初始化完成后       | 无                                                                               | **必须**在 `DOMContentLoaded` 最后一行发送                                |
| `register-stateful-theme`    | 初始化时           | 无                                                                               | 角色切换时只更新数据不重建                                                |
| `playback-state-changed`     | 播放/暂停/切歌时   | `{ isPlaying, currentTrack, lyrics }`                                            | `currentTrack` 需含 `originalTitle/originalArtist`；`lyrics` 用于悬浮歌词 |
| `playback-progress`          | 播放过程中         | `{ progress, currentTime, duration, currentTimeRaw, currentTrack }`              | 推荐用 `requestAnimationFrame` 流畅同步                                   |
| `player-expanding`           | 从迷你模式展开时   | 无                                                                               | 移动端会自动居中                                                          |
| `player-collapsing`          | 收起到迷你时       | 无                                                                               | 通知主系统恢复原位                                                        |
| `audio-playback-failed`      | 音频播放失败       | `{ id, source, trackIndex }`                                                     | 请求主系统刷新 URL，配合 `_refreshed` 标记防循环                          |
| `cache-track-data`           | 成功获取完整信息   | `{ title, artist, trackData, audioUrl, lyricsContent, tlyricContent, coverUrl }` | 只在 `!track._fromCache` 时发送                                           |
| `update-audio-cache`         | URL 刷新成功       | `{ id, source, audioUrl }`                                                       | 更新缓存中的音频 URL                                                      |
| `request-chat-scan`          | 用户主动点扫描按钮 | 无                                                                               | 主系统会扫描最近 30 条消息，结果通过 `append-songs-to-playlist` 推回      |
| `graceful-shutdown-response` | 响应关闭请求后     | 可选数据对象                                                                     | 在清理完资源后发送                                                        |
| `resize-iframe`              | 改变播放器尺寸     | `{ width, height }`                                                              | 展开/收起时使用                                                           |

### 3. 关键消息详解

#### `play-now` vs `play-by-info`

​```javascript
case "play-now":
  // 主系统已准备好完整数据，data 含 audioUrl，直接用
  addAndPlayTrack(data, true);
  break;

case "play-by-info":
  // 主系统只知道歌名歌手，需要播放器自己搜索
  searchAndPlay(data.title, data.artist, null, true);
  break;
​```

#### `pause-theme` vs `graceful-shutdown-request`

| 消息                        | 目的            | 是否清理状态   | 后续动作         |
| --------------------------- | --------------- | -------------- | ---------------- |
| `pause-theme`               | iframe 回收复用 | ❌ 保留所有状态 | 等待重新激活     |
| `graceful-shutdown-request` | 主题即将销毁    | ✅ 完全清理     | 发送响应后被移除 |

#### 【铁律】正确处理空歌单

🔴 **必须用 `data.playlist !== undefined` 判断，三个等号一个都不能少！**

如果写成 `if (data.playlist)`，空数组 `[]` 会被 JS 当作 falsy 跳过。后果：用户从有 BGM 的角色切到没 BGM 的角色时，**旧角色的歌单会残留在新角色这里**，导致用户以为播放器坏了。

切换到没有 `@BGM@` 条目的角色时，主系统会发送 `playlist: []`：

​```javascript
case "set-initial-playlist":
case "context-update":
  if (data.charAvatarUrl) dom.avatar.src = data.charAvatarUrl;
  if (data.charName) dom.charName.textContent = data.charName;

  // 必须用 !== undefined
  if (data.playlist !== undefined) {
    const newPlaylist = normalizePlaylist(data.playlist);

    // 必须用语义比较，禁止 JSON.stringify
    const isSamePlaylist = (oldList, newList) => {
      if (oldList.length !== newList.length) return false;
      for (let i = 0; i < oldList.length; i++) {
        const a = oldList[i], b = newList[i];
        const idMatch = a.id && b.id && a.id === b.id && a.source === b.source;
        const urlMatch = a.audioUrl && b.audioUrl && a.audioUrl === b.audioUrl;
        const infoMatch = (a.title || a.name) === (b.title || b.name)
                       && a.artist === b.artist;
        if (!idMatch && !urlMatch && !infoMatch) return false;
      }
      return true;
    };

    if (!isSamePlaylist(state.playlist, newPlaylist)) {
      const wasPlaying = state.isPlaying;
      const currentTrack = state.playlist[state.currentIndex];

      // 在新列表中查找当前正在播放的歌曲
      let newIndex = -1;
      if (currentTrack) {
        newIndex = newPlaylist.findIndex((t) => {
          if (currentTrack.id && t.id) return t.id === currentTrack.id && t.source === currentTrack.source;
          if (currentTrack.audioUrl && t.audioUrl) return t.audioUrl === currentTrack.audioUrl;
          return (t.title || t.name) === (currentTrack.title || currentTrack.name)
              && t.artist === currentTrack.artist;
        });
      }

      if (newIndex !== -1 && (wasPlaying || dom.audio.currentTime > 0)) {
        // 当前歌还在 → 不打断，保留运行时数据
        newPlaylist[newIndex] = { ...newPlaylist[newIndex], ...currentTrack };
        state.playlist = newPlaylist;
        state.currentIndex = newIndex;
        renderPlaylist();
      } else if (newPlaylist.length > 0) {
        state.playlist = newPlaylist;
        renderPlaylist();
        loadTrack(0, false);
      } else {
        state.playlist = newPlaylist;
        renderPlaylist();
      }
    }
  }
  break;
​```

#### `resumeTrack` 字段（刷新恢复）

用户开启"记忆播放进度"后，主系统在 `set-initial-playlist` 时附带 `resumeTrack`：

​```javascript
{
  playlist: [...],
  charAvatarUrl: "...",
  resumeTrack: {
    title: "歌曲名",      // 来自 originalTitle
    artist: "歌手名",     // 来自 originalArtist
    updatedAt: 1700000000000
  }
}
​```

**处理逻辑**：

​```javascript
let startIdx = 0;
if (data.resumeTrack) {
  const rt = data.resumeTrack;
  const foundIdx = newPlaylist.findIndex((t) => {
    const tArtist = Array.isArray(t.artist) ? t.artist.join(",") : t.artist || "";
    return MusicUtils.isTitleMatch(rt.title || "", t.originalTitle || t.title || "")
        && MusicUtils.isArtistMatch(rt.artist || "", t.originalArtist || tArtist);
  });
  if (foundIdx > 0) startIdx = foundIdx;
}
loadTrack(startIdx, false);  // autoPlay=false，刷新后不自动播放
​```

**铁律**：

- 用 `MusicUtils.isTitleMatch` / `isArtistMatch` 模糊匹配，**禁用** `===`
- 优先用 `t.originalTitle/t.originalArtist`，fallback 到 `t.title/t.artist`
- `autoPlay` 必须传 `false`
- 找不到时回退到第一首

### 4. 完整消息处理模板

​```javascript
window.addEventListener("message", async (event) => {
  if (event.data?.source !== "typing-indicator-host") return;
  const { type, data } = event.data;

  switch (type) {
    case "set-initial-playlist":
    case "context-update":
      // 见上文"正确处理空歌单"
      break;

    case "append-songs-to-playlist":
      if (Array.isArray(data) && data.length > 0) {
        // 必须先去重
        const songsToAdd = data.filter(song =>
          !state.playlist.some(existing =>
            (existing.id && song.id && existing.id === song.id && existing.source === song.source) ||
            (existing.audioUrl && song.audioUrl && existing.audioUrl === song.audioUrl)
          )
        );
        if (songsToAdd.length > 0) {
          state.playlist.push(...songsToAdd);
          renderPlaylist();
        }
        if (!state.isPlaying && state.playlist.length === songsToAdd.length) {
          loadTrack(0);
        }
      }
      break;

    case "update-songs-from-message":
      if (data?.messageId !== undefined) {
        state.playlist = state.playlist.filter(t => t.sourceMessageId !== data.messageId);
        if (data.songs?.length > 0) state.playlist.push(...data.songs);
        renderPlaylist();
      }
      break;

    case "play-now":
      if (data) {
        const trackData = {
          ...data,
          name: data.name || data.title,
          artist: Array.isArray(data.artist) ? data.artist : [data.artist],
          _fromCache: true,
        };
        const existingIndex = state.playlist.findIndex(track =>
          MusicUtils.isTrackMatch(
            data.originalTitle || data.title || data.name,
            data.originalArtist || (Array.isArray(data.artist) ? data.artist[0] : data.artist),
            track,
          )
        );
        if (existingIndex !== -1) {
          loadTrack(existingIndex, true);
          renderPlaylist();
          return;
        }
        if (state.playlist.length === 0) {
          state.playlist.push(trackData);
          loadTrack(0, true);
        } else {
          const newIndex = state.currentIndex + 1;
          state.playlist.splice(newIndex, 0, trackData);
          loadTrack(newIndex, true);
        }
        renderPlaylist();
      }
      break;

    case "toggle-playback":
      if (dom.audio.paused) dom.audio.play().catch(e => console.warn(e));
      else dom.audio.pause();
      break;

    case "graceful-shutdown-request":
      dom.audio.pause();
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
      ThemeUtils.sendMessage("graceful-shutdown-response");
      break;
  }
});
​```

---

## 六、播放控制实战

### 1. 必须监听的 audio 事件矩阵

播放器的健壮性 80% 来自对各种 audio 事件的兜底处理。以下是**必须监听**的事件清单：

| 事件             | 触发时机           | 必做处理                           |
| ---------------- | ------------------ | ---------------------------------- |
| `canplay`        | 首帧可播放         | 退出 loading、清超时               |
| `canplaythrough` | 缓冲充足可流畅播   | 启动预加载下一首                   |
| `loadedmetadata` | 时长就绪           | **试听版检测**（< 60 秒立即换源）  |
| `playing`        | 真正开始播放       | 启动 progress watchdog             |
| `waiting`        | 缓冲不足等待数据   | 进入 loading 状态、启动超时        |
| `stalled`        | 网络中断           | 3 秒后 reload 当前位置             |
| `suspend`        | 浏览器节流挂起音频 | 若用户意图播放，立即重新 play      |
| `pause`          | 暂停               | 停止 progress watchdog             |
| `error`          | 播放出错           | 走错误处理优先级链（见下文）       |
| `ended`          | 自然结束           | 单曲循环 / 随机 / 顺序，按用户选择 |

另外还要监听 **window 的 `online` 事件**，处理网络重连：

```javascript
window.addEventListener("online", () => {
  if (state.isPlaying && audio.readyState < 3) {
    const ct = audio.currentTime;
    audio.load();
    audio.currentTime = ct;
    audio.play().catch(() => {});
  }
});
```

只监听 `error` 一个事件是远远不够的，浏览器在不同场景下触发的事件路径**完全不同**——比如手机后台切回时是 `suspend`，断网是 `stalled`，链接 404 才是 `error`。

### 2. 错误处理优先级链（铁律）

当 `<audio>` 触发 `error` 事件时，**绝对禁止**直接 `nextTrack()` 或直接换源，必须按以下三级优先级处理：

```
第一级：主系统刷新 URL（同源、最低成本）
   ↓ 失败
第二级：前端跨源换源（tryFallbackSource）
   ↓ 失败
第三级：跳到下一首
```

#### 完整实现

```javascript
dom.audio.addEventListener(<q>"error"</q>, async (e) => {
  exitLoadingState();
  state.consecutiveErrors++;

  // 防雪崩：连续错误次数 ≥ 列表长度时停止
  if (state.playlist.length > 0 && state.consecutiveErrors >= state.playlist.length) {
    showError(<q>"播放列表错误"</q>);
    if (state.isPlaying) pauseTrack();
    state.consecutiveErrors = 0;
    return;
  }

  const track = state.playlist[state.currentIndex];
  const wantAutoPlay = state.isPlaying || state.shouldAutoPlay;

  // ━━━ 第一级：让主系统刷新 URL ━━━
  // 仅对有 id+source 且未尝试过刷新的搜索歌生效
  if (track && track.id && track.source && !track._refreshed && !track._isDirectLink) {
    track._refreshed = true;
    if (window.MusicCache) {
      window.MusicCache.invalidateAudio(track.id, track.source);
    }
    ThemeUtils.sendMessage(<q>"audio-playback-failed"</q>, {
      id: track.id, source: track.source, trackIndex: state.currentIndex,
    });
    return;
  }

  // ━━━ 第二级：前端跨源换源 ━━━
  const title = track?.originalTitle || track?.title;
  const artist = track?.originalArtist || track?.artist;
  if (track && title && artist) {
    if (!track._triedSources) track._triedSources = [];
    if (track.source && !track._triedSources.includes(track.source)) {
      track._triedSources.push(track.source);
    }
    // 直链失败后转为搜索模式
    if (track._isDirectLink) {
      track._isDirectLink = false;
      track.audioUrl = <q>""</q>;
    }
    track._refreshed = false;  // 换源成功后允许下次再刷
    await tryFallbackSource(title, artist, track._triedSources, wantAutoPlay);
    return;
  }

  // ━━━ 第三级：跳下一首 ━━━
  setTimeout(() => {
    if (state.playlist.length > 1) nextTrack();
  }, 1000);
});
```

#### 监听 URL 刷新结果

主系统在 `audio-playback-failed` 后会跨源搜索，并通过 `audio-url-refreshed` 把新数据一起传回来。**当 `seamless: true` 时必须保留 currentTime，不要用 loadTrack 重新加载**（否则会从 0 秒开始播）：

```javascript
window.addEventListener(<q>"message"</q>, (event) => {
  if (event.data?.type === <q>"audio-url-refreshed"</q>) {
    const {
      audioUrl,
      trackIndex,
      lyricsContent,
      tlyricContent,
      newId,
      newSource,
      seamless,
    } = event.data.data;

    if (trackIndex < 0 || trackIndex >= state.playlist.length) return;
    if (!audioUrl) return;  // 刷新失败，前端的换源逻辑会兜底

    const track = state.playlist[trackIndex];
    track.audioUrl = audioUrl;

    // 跨源换源时同步更新 id/source，否则下次坏链刷不动
    if (newId) track.id = newId;
    if (newSource) track.source = newSource;
    if (seamless) track._fromCache = true;
    track._refreshed = false;

    // 无缝刷新主题内歌词
    if (lyricsContent !== undefined) {
      track.lyricsContent = lyricsContent || <q>""</q>;
      track.tlyricContent = tlyricContent || <q>""</q>;
      if (trackIndex === state.currentIndex && lyricsContent) {
        state.lyrics = parseLRC(lyricsContent, tlyricContent, newSource || track.source);
        renderLyrics();
      }
    }

    // 应用新音频时保留 currentTime
    if (trackIndex === state.currentIndex) {
      const currentTime = dom.audio.currentTime;
      dom.audio.src = getProxyUrl(audioUrl);
      dom.audio.addEventListener(<q>"loadedmetadata"</q>, () => {
        if (currentTime > 0.5) dom.audio.currentTime = currentTime;
        if (state.isPlaying || state.shouldAutoPlay) {
          dom.audio.play().catch(() => {});
        }
      }, { once: true });
    }
  }
});
```

> **重要**：旧版主题如果还在用 `loadTrack(trackIndex, ...)` 处理这个消息，跨源换源时会从 0 秒重新开始播放，**不是无缝的**。请按上面的写法改成保留 currentTime。

#### 切歌时必须重置标记

```javascript
async function loadTrack(index, autoPlay) {
  const track = state.playlist[index];
  if (track) track._refreshed = false;  // 关键！否则换源后下次坏链刷不动
  // ...其他逻辑
}
```

### 3. 试听版检测

某些歌曲只返回 30~60 秒试听版。监听 `loadedmetadata` 事件：

​```javascript
dom.audio.addEventListener("loadedmetadata", () => {
  const duration = dom.audio.duration;
  if (!duration) return;

  // 从主插件读取阈值（默认 60 秒），低于此值判定为试听版
  const minDuration = window.parent.MusicUtils?.MIN_PLAYABLE_DURATION || 60;
  if (duration > 0 && duration <= minDuration) {
    console.warn(`检测到试听版 (${duration.toFixed(1)}s)，换源中...`);
    dom.audio.pause();
    dom.audio.src = "";  // 彻底中止
    const track = state.playlist[state.currentIndex];
    if (track) handleFallbackSearch(track.title, track.artist);
  }
});
​```

#### 搜索/换源阶段的预检测

除了 `loadedmetadata` 事件兜底，在搜索和换源过程中也需要预检测音频时长，避免把试听版加入播放队列。**不要自己实现检测逻辑**，直接委托给主插件：

​```javascript
// 在搜索/换源流程中预检测
const duration = await window.parent.MusicUtils.checkAudioDuration(audioUrl);
const minDuration = window.parent.MusicUtils?.MIN_PLAYABLE_DURATION || 60;
if (duration !== null && duration <= minDuration) {
  console.log(`预检测到试听版 (${duration.toFixed(1)}s)，跳过`);
  continue;  // 尝试下一个音源
}
​```

**为什么不自己实现**：主插件的 `checkAudioDuration` 已经处理了代理域名判断、超时控制、Audio 对象清理等细节。自己写会导致：

- 阈值分散在多处，改一个漏一个
- 代理域名列表不同步
- 重复创建 Audio 对象浪费内存

**两层检测的分工**：

| 层级                        | 时机        | 作用                                   |
| --------------------------- | ----------- | -------------------------------------- |
| `checkAudioDuration` 预检测 | 搜索/换源时 | 避免把试听版加入队列                   |
| `loadedmetadata` 兜底       | 实际播放时  | 捕获预检测漏网的（如缓存命中直接播放） |

### 4. 状态标记防冲突

​```javascript
// A. isChangingTrack：换源/换歌过程
let isChangingTrack = false;
async function loadTrack(index, autoPlay = false) {
  isChangingTrack = true;
  // ...异步加载...
  isChangingTrack = false;
}
dom.audio.addEventListener("error", async (e) => {
  if (isChangingTrack) return;  // 换源中忽略错误
  // ...错误处理...
});

// B. shouldAutoPlay：记住播放意图
let shouldAutoPlay = false;
async function loadTrack(index, autoPlay = false) {
  shouldAutoPlay = autoPlay;
  // ...异步加载，可能清空 audio.src...
}
dom.audio.addEventListener("loadedmetadata", () => {
  if (shouldAutoPlay) {
    shouldAutoPlay = false;
    play();
  }
});
​```

### 5. 换源处理

#### A. 后端返回 `_needFallback`

​```javascript
const urlData = await fetch(`/api/plugins/g-player-proxy/song?id=${id}&source=tencent`).then(r => r.json());
if (urlData?._needFallback) {
  await tryFallbackSource();
  return;
}
​```

#### B. 跨源换源（前端责任）

后端只负责单源内 API 降级，跨源换源由前端处理：

​```javascript
async function searchWithFallback(title, artist, excludeSource) {
  const sources = ["tencent", "netease", "kuwo"];
  const orderedSources = excludeSource
    ? [...sources.filter(s => s !== excludeSource), excludeSource]
    : sources;
  for (const source of orderedSources) {
    const result = await fetchSongFromSource(title, artist, source);
    if (result?.audioUrl) return result;
  }
  return null;
}
​```

### 6. 防雪崩三件套（铁律）

错误处理有三个独立的计数器，缺一不可。否则会出现"无限切歌""无限换源""把整个浏览器搞卡"等灾难。

| 计数器                 | 上限              | 触发后行为                       | 重置时机                       |
| ---------------------- | ----------------- | -------------------------------- | ------------------------------ |
| `consecutiveErrors`    | = 播放列表长度    | 停止播放，显示"播放列表错误"     | 用户手动点播放、loadTrack 成功 |
| `fallbackAttempts`     | 3 次              | 显示"无可用音源"，2 秒后跳下一首 | 换源成功、loadTrack 切歌       |
| `_triedSources.length` | = 全部音源数（3） | 同上，所有源都试过了             | 切歌时清空                     |

#### 完整防御代码

```javascript
let state = {
  consecutiveErrors: 0,    // 连续失败次数
  fallbackAttempts: 0,     // 当前歌的换源次数
  maxFallbackAttempts: 3,
};

async function tryFallbackSource(title, artist, excludeSources, autoPlay) {
  // 检查 1：单首歌的换源次数上限
  if (state.fallbackAttempts >= state.maxFallbackAttempts) {
    showError(`无可用音源: ${title} - ${artist}`);
    state.fallbackAttempts = 0;
    setTimeout(() => nextTrack(), 2000);
    return;
  }
  state.fallbackAttempts++;

  // 检查 2：可用音源是否还有
  const allSources = [<q>"tencent"</q>, <q>"netease"</q>, <q>"kuwo"</q>];
  const availableSources = allSources.filter(s =>
    !excludeSources.includes(capitalize(s))
  );
  if (availableSources.length === 0) {
    showError(<q>"所有音源都已尝试"</q>);
    return;
  }

  // ...实际换源逻辑...
}

audio.addEventListener(<q>"error"</q>, async (e) => {
  state.consecutiveErrors++;

  // 检查 3：防止整个列表雪崩
  if (state.playlist.length > 0 && state.consecutiveErrors >= state.playlist.length) {
    showError(<q>"播放列表错误"</q>);
    if (state.isPlaying) pauseTrack();
    state.consecutiveErrors = 0;  // 重置以便用户手动恢复
    return;
  }
  // ...错误处理优先级链...
});

async function loadTrack(index, autoPlay) {
  state.consecutiveErrors = 0;   // 切新歌就清零
  state.fallbackAttempts = 0;
  // ...
}
```

#### 触发场景对照

- 单首歌换 3 个源都不行 → `fallbackAttempts` 触发，跳下一首
- 整个列表都挂了（每首都进 error）→ `consecutiveErrors` 触发，停止
- 用户从一个挂掉的状态点了播放 → 切歌时计数器重置，重新开始

### 7. 【铁律】搜索结果匹配策略

**禁止**只匹配歌手名或匹配失败后取第一条结果：

```javascript
// ❌ 错误一：直接取第一条结果
const track = searchData.data[0];  // 会播错歌

// ❌ 错误二：只匹配歌手名
const track = searchData.data.find(item =>
  (item.singer || <q>""</q>).toLowerCase().includes(artist.toLowerCase())
);

// ❌ 错误三：匹配失败后 fallback 到第一条
const track = searchData.data.find(...) || searchData.data[0];
// 这是最隐蔽的错误！会让<q>"找不到原版就播任意一首同名歌"</q>

// 用户体验：明明点了<q>「Lemon - 米津玄師」</q>，结果播放器在放<q>「Lemon - 网友翻唱版」</q>

// 正确 ✅ - 用 MusicUtils
const MusicUtils = window.parent.MusicUtils || {
  isTitleMatch: (a, b) => a?.toLowerCase() === b?.toLowerCase(),
  isArtistMatch: (a, b) => !a || b?.toLowerCase().includes(a?.toLowerCase()),
};

const track = searchData.data.find(item => {
  const itemTitle = item.song || item.name || "";
  const itemArtist = item.singer || item.artist || "";
  return MusicUtils.isTitleMatch(title, itemTitle)
      && MusicUtils.isArtistMatch(artist, itemArtist);
});

// 找不到返回 null，让换源继续
if (!track) return null;
​```

#### 进阶：用 `selectBestMatch` 排除 Live / 翻唱 / Remix 版本

`find` 只能解决"找到匹配"的问题，但不能解决"找到的是不是用户想要的版本"。常见陷阱：

- 用户期望：`Lemon - 米津玄師`（正版）
- 网易云返回顺序：`[Lemon (Live) - 米津玄師, Lemon - 米津玄師]`
- `find` 取到第一条 → 播了 Live 版

主系统在 `MusicUtils.selectBestMatch` 里实现了打分排序，自动扣分跳过 Live/Remix/翻唱/演唱会版本，**所有换源逻辑都应优先用它**：

```js
const track = MusicUtils.selectBestMatch
  ? MusicUtils.selectBestMatch(title, artist, searchData.data)
  : searchData.data.find(item => {
      const itemTitle = item.song || item.name || <q>""</q>;
      const itemArtist = item.singer || item.artist || <q>""</q>;
      return MusicUtils.isTitleMatch(title, itemTitle)
          && MusicUtils.isArtistMatch(artist, itemArtist);
    });

if (!track) return null;
```

**`selectBestMatch` 的打分规则**（从主插件 `MusicUtils` 暴露）：

| 规则                                                                        | 加/减分   |
| --------------------------------------------------------------------------- | --------- |
| 标题完全相等                                                                | +100      |
| 歌手名归一化后相等                                                          | +80       |
| 歌手名包含查询歌手                                                          | +30       |
| 标题带 `(Live)`/`(现场)`/`(翻唱)`/`(Cover)`/`(Remix)`/`(伴奏)` 等括号关键词 | -80       |
| 标题裸带 `Live`/`现场`/`演唱会` 等关键词（无括号）                          | -40       |
| 歌手名长度惩罚（处理"歌手 A & 歌手 B & 歌手 C"过长情况）                    | -0.3/字符 |

**适用范围**：所有"按 title+artist 反查具体哪条结果"的场景必须用它。包括：

- 音频 `onerror` 触发的换源（`tryFallbackSource`）
- 收到 `play-by-info` 后的搜索匹配
- 任何需要从搜索结果列表挑出"最像用户期望"的场景

**不适用**：搜索面板把所有结果列给用户挑选——那种场景用户视觉判断更准，不应该过滤。

> ⚠️ **fallback 写法的意义**：每个播放器顶部都定义了 `const MusicUtils = window.parent.MusicUtils || {极简版}`，万一拿不到 parent 就用本地兜底。`selectBestMatch` 只在主系统里有，所以必须用三元判断 `MusicUtils.selectBestMatch ? ... : ...`，否则单独打开 iframe 调试时会报错。

`MusicUtils` 自动处理：

- 繁简体差异（`可愛くてごめん` vs `可爱くてごめん`）
- 全角半角字符
- 括号内容（`(Remix)`、`【Live】`）
- 数组格式歌手名
- 字符重叠度容差

### 6. 【铁律】音频代理策略：不是所有链接都走后端

后端服务器无法访问某些外部资源（如 catbox.moe，因为它不会用用户本地代理）。**只有需要防盗链的音乐平台才走后端**：

| 链接类型                         | 处理方式       | 原因                |
| -------------------------------- | -------------- | ------------------- |
| 网易云、QQ音乐、酷我、酷狗、咪咕 | 走后端代理     | 需要 Referer 防盗链 |
| catbox / GitHub / 其他           | 浏览器直接播放 | 浏览器可走用户代理  |

​```javascript
function getAudioSource(audioUrl) {
  const needProxyDomains = [
    "music.126.net", "126.net", "netease.com",
    "qq.com", "qqmusic.qq.com", "y.qq.com",
    "kuwo.cn", "kuwo.com",
    "kugou.com", "migu.cn",
  ];
  const needProxy = needProxyDomains.some(d => audioUrl.includes(d));
  return needProxy
    ? `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(audioUrl)}`
    : audioUrl;
}

dom.audio.src = getAudioSource(track.audioUrl);
​```

---

## 七、歌词处理

### 1. 区分歌词 URL 和歌词内容

后端返回的 `lrc` 字段可能是**歌词文本**（`[` 开头）或 **URL**（`http` 开头），需要分别处理：

​```javascript
async function loadTrack(index, autoPlay = false) {
  const track = state.playlist[index];
  if (track.lyricsUrl) {
    if (track.lyricsUrl.startsWith("http://") || track.lyricsUrl.startsWith("https://")) {
      await fetchAndParseLRC(track.lyricsUrl);
    } else if (track.lyricsUrl.startsWith("[")) {
      parseLRCText(track.lyricsUrl, "");
      renderLyrics();
    } else {
      state.parsedLRC = [];
      renderLyrics();
    }
  } else if (track.id && track.source) {
    await fetchLyricsFromSongAPI(track.id, track.source);
  } else {
    state.parsedLRC = [];
    renderLyrics();
  }
}
​```

### 2. 多格式双语 LRC 解析

不同音源的双语歌词格式差异巨大，常见格式：

| 优先级 | 格式         | 检测方法                 | 示例                                            |
| ------ | ------------ | ------------------------ | ----------------------------------------------- |
| 1      | 独立翻译文本 | `tlyricText` 参数有值    | 网易云的 `lyric` + `tlyric` 分开返回            |
| 2      | 分离格式     | 时间戳回退 > 30 秒       | 前半全日文，后半全中文，时间戳重新从 00:00 开始 |
| 3      | 交替格式     | 相邻行语言不同 ≥ 70%     | 日→中→日→中…，时间递增                          |
| 4      | 同时间戳格式 | 相邻两行时间差 < 0.05 秒 | 同时间戳两行不同语言                            |
| 5      | 酷我格式     | `source === "Kuwo"`      | 翻译行时间戳 = 下一句原文时间戳，按出现顺序配对 |

#### 五种格式对照样本（拷贝下来直观对比）

```

【格式 1：独立翻译文本】
原文 lrc：
[00:12.020]Hello world
[00:15.500]Goodbye world
翻译 tlyric（独立字段）：
[00:12.020]你好世界
[00:15.500]再见世界

【格式 2：分离格式（时间戳回退 > 30 秒）】
[00:12.020]Hello world          ← 原文部分（前半段）
[00:15.500]Goodbye world
[02:30.500]End of song
[00:12.020]你好世界               ← 翻译部分开始（时间戳回到 00:12）
[00:15.500]再见世界
[02:30.500]歌曲结束

【格式 3：交替格式（行级交替）】
[00:12.020]Hello world
[00:12.500]你好世界               ← 紧跟原文的下一行就是翻译
[00:15.020]Goodbye world
[00:15.500]再见世界

【格式 4：同时间戳格式（< 0.05 秒视为同行）】
[00:12.020]Hello world
[00:12.020]你好世界               ← 同时间戳两行
[00:15.500]Goodbye world
[00:15.500]再见世界

【格式 5：酷我格式】
[00:12.020]Hello world           ← 原文 1
[00:16.820]你好世界               ← 翻译 1（时间戳是下一句的）
[00:16.820]Goodbye world         ← 原文 2
[00:21.020]再见世界               ← 翻译 2

```

#### 酷我格式特殊性

酷我翻译行的时间戳**不是当前原文的时间戳，而是下一句原文的**：

```

[00:12.020]認めていた臆病な過去      ← 原文1 (12.020)
[00:16.820]原本早已认同软弱的过去    ← 翻译1 (时间戳是下一句的!)
[00:16.820]わからないままに怖がっていた ← 原文2 (16.820)

```

无法通过歌词内容检测，**必须通过 `source` 参数识别**。

#### 分离格式检测原理

翻译部分的时间戳会"回退"到歌曲开头重新计算。当某行时间戳比前一行**小超过 30 秒**时即可判定。

#### 推荐解析器

​```javascript
function parseLRCText(lrcText, tlyricText = "", source = "") {
  if (source && source.toLowerCase() === "kuwo") {
    state.parsedLRC = parseLRCKuwo(lrcText);
    return;
  }
  if (!lrcText && !tlyricText) {
    state.parsedLRC = [];
    return;
  }

  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

  function parseLines(text) {
    if (!text) return [];
    const lines = [];
    text.split("\n").forEach(line => {
      const content = line.replace(timeRegex, "").trim();
      if (!content) return;
      if (content === "//" || /^\/+$/.test(content)) return;
      if (/^(作词|作曲|编曲|制作|Lyrics|Composed|Written)\s*[:：]/i.test(content)) return;
      timeRegex.lastIndex = 0;
      let match;
      while ((match = timeRegex.exec(line))) {
        const time = parseInt(match[1])* 60 + parseInt(match[2])
                   + parseInt(match[3].padEnd(3, "0")) / 1000;
        lines.push({ time, text: content });
      }
    });
    return lines;
  }

  const isChinese = t => /[\u4e00-\u9fa5]/.test(t);
  const isJapanese = t => /[\u3040-\u309f\u30a0-\u30ff]/.test(t);
  const isKorean = t => /[\uac00-\ud7af]/.test(t);
  const isAsian = t => isChinese(t) || isJapanese(t) || isKorean(t);

  let mainLines = parseLines(lrcText);
  let transLines = parseLines(tlyricText);

  if (mainLines.length === 0 && transLines.length === 0) {
    state.parsedLRC = [];
    return;
  }

  // 优先级 1：独立翻译文本（带容差匹配）
  if (tlyricText && transLines.length > 0) {
    mainLines.sort((a, b) => a.time - b.time);
    transLines.sort((a, b) => a.time - b.time);
    state.parsedLRC = mainLines.map(line => {
      let bestMatch = null;
      let minDiff = 0.5;
      for (const trans of transLines) {
        const diff = Math.abs(trans.time - line.time);
        if (diff < minDiff) {
          minDiff = diff;
          bestMatch = trans.text;
        }
      }
      return { time: line.time, text: line.text, translated: bestMatch };
    });
    return;
  }

  // 优先级 2：分离格式（时间回退 > 30 秒）
  let splitIndex = -1;
  for (let i = 1; i < mainLines.length; i++) {
    if (mainLines[i].time < mainLines[i - 1].time - 30) {
      splitIndex = i;
      break;
    }
  }
  if (splitIndex > 0) {
    const firstPart = mainLines.slice(0, splitIndex);
    const secondPart = mainLines.slice(splitIndex);
    const firstHasChinese = firstPart.some(l => isChinese(l.text));
    const secondHasChinese = secondPart.some(l => isChinese(l.text));
    let originalPart, transPart;
    if (!firstHasChinese && secondHasChinese) {
      originalPart = firstPart;
      transPart = secondPart;
    } else if (firstHasChinese && !secondHasChinese) {
      originalPart = secondPart;
      transPart = firstPart;
    } else {
      originalPart = firstPart;
      transPart = secondPart;
    }
    originalPart.sort((a, b) => a.time - b.time);
    transPart.sort((a, b) => a.time - b.time);
    state.parsedLRC = originalPart.map(line => {
      let bestMatch = null;
      let minDiff = 0.5;
      for (const trans of transPart) {
        const diff = Math.abs(trans.time - line.time);
        if (diff < minDiff) {
          minDiff = diff;
          bestMatch = trans.text;
        }
      }
      return { time: line.time, text: line.text, translated: bestMatch };
    });
    return;
  }

  mainLines.sort((a, b) => a.time - b.time);

  // 优先级 3：交替格式
  let hasAlternatingPattern = false;
  if (mainLines.length >= 4) {
    let alternateCount = 0;
    for (let i = 0; i < Math.min(mainLines.length - 1, 20); i++) {
      if (isAsian(mainLines[i].text) !== isAsian(mainLines[i + 1].text)) {
        alternateCount++;
      }
    }
    hasAlternatingPattern = alternateCount >= Math.min(mainLines.length - 1, 20) * 0.7;
  }
  if (hasAlternatingPattern) {
    const merged = [];
    let i = 0;
    while (i < mainLines.length) {
      const curr = mainLines[i];
      const next = mainLines[i + 1];
      if (next) {
        const currIsAsian = isAsian(curr.text);
        const nextIsAsian = isAsian(next.text);
        if (!currIsAsian && nextIsAsian) {
          merged.push({ time: curr.time, text: curr.text, translated: next.text });
          i += 2; continue;
        } else if (currIsAsian && !nextIsAsian) {
          merged.push({ time: curr.time, text: next.text, translated: curr.text });
          i += 2; continue;
        }
      }
      merged.push({ time: curr.time, text: curr.text, translated: null });
      i++;
    }
    state.parsedLRC = merged;
    return;
  }

  // 优先级 4：同时间戳格式
  const merged = [];
  for (let i = 0; i < mainLines.length; i++) {
    const current = mainLines[i];
    const next = mainLines[i + 1];
    if (next && Math.abs(next.time - current.time) < 0.05) {
      const currentIsAsian = isAsian(current.text);
      const nextIsAsian = isAsian(next.text);
      if (currentIsAsian && !nextIsAsian) {
        merged.push({ time: current.time, text: next.text, translated: current.text });
      } else {
        merged.push({ time: current.time, text: current.text, translated: next.text });
      }
      i++;
      continue;
    }
    merged.push({ time: current.time, text: current.text, translated: null });
  }
  state.parsedLRC = merged;
}

function parseLRCKuwo(lrcData) {
  if (!lrcData || typeof lrcData !== "string") return [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  const lines = lrcData.split("\n");

  const parsed = [];
  for (const line of lines) {
    const match = line.match(timeRegex);
    if (!match) continue;
    const content = line.replace(/\[[\d:.]+\]/g, "").trim();
    if (!content || /^\/+$/.test(content)) continue;
    const time = parseInt(match[1]) * 60 + parseInt(match[2])
               + parseInt(match[3].padEnd(3, "0")) / 1000;
    parsed.push({ time, text: content });
  }

  const timeGroups = new Map();
  for (const item of parsed) {
    const key = item.time.toFixed(3);
    if (!timeGroups.has(key)) timeGroups.set(key, []);
    timeGroups.get(key).push(item.text);
  }

  const result = [];
  const sortedTimes = Array.from(timeGroups.keys()).sort((a, b) => parseFloat(a) - parseFloat(b));
  for (const timeKey of sortedTimes) {
    const time = parseFloat(timeKey);
    const texts = timeGroups.get(timeKey);
    if (texts.length === 1) {
      result.push({ time, text: texts[0], translated: null });
    } else if (texts.length >= 2) {
      if (result.length > 0 && !result[result.length - 1].translated) {
        result[result.length - 1].translated = texts[0];
      }
      result.push({ time, text: texts[1], translated: null });
    }
  }
  return result;
}
​```

**调用时传入 source 参数**：

​```javascript
const track = state.playlist[index];
parseLRCText(lyricsContent, tlyricContent, track.source);
​```

### 3. 悬浮歌词支持

主系统提供悬浮歌词功能，播放器只需正确发送数据。

**工作原理**：

1. 在 `playback-state-changed` 中附带 `lyrics` 字段
2. 在 `playback-progress` 中附带 `currentTimeRaw`（原始秒数）
3. 主系统自动处理变色和翻译显示

**`lyrics` 数据格式**：

```javascript
const lyrics = [
  { time: 0,    text: <q>"Music intro..."</q>,     translated: null },
  { time: 15.5, text: <q>"All alone with you"</q>, translated: <q>"独自与你在一起"</q> },
];
```

### 8. 完整的播放状态广播代码

播放/暂停时必须广播状态，让悬浮歌词、聊天气泡能同步：

```javascript
dom.audio.onplay = () => {
    state.isPlaying = true;
    const currentTrack = state.playlist[state.currentIndex];
    if (currentTrack && typeof ThemeUtils !== <q>"undefined"</q>) {
        ThemeUtils.sendMessage(<q>"playback-state-changed"</q>, {
            isPlaying: true,
            currentTrack: {
                title: currentTrack.name,
                name: currentTrack.name,
                artist: Array.isArray(currentTrack.artist)
                    ? currentTrack.artist.join(<q>" / "</q>)
                    : currentTrack.artist,
                coverUrl: currentTrack.coverUrl,
                originalTitle: currentTrack.originalTitle,
                originalArtist: currentTrack.originalArtist,
            },
            lyrics: state.parsedLRC,  // 悬浮歌词数据
        });
    }
};

dom.audio.onpause = () => {
    state.isPlaying = false;
    const currentTrack = state.playlist[state.currentIndex];
    if (currentTrack && typeof ThemeUtils !== <q>"undefined"</q>) {
        ThemeUtils.sendMessage(<q>"playback-state-changed"</q>, {
            isPlaying: false,
            currentTrack: {
                title: currentTrack.name,
                artist: Array.isArray(currentTrack.artist)
                    ? currentTrack.artist.join(<q>" / "</q>)
                    : currentTrack.artist,
                originalTitle: currentTrack.originalTitle,
                originalArtist: currentTrack.originalArtist,
            },
        });
    }
};
```

### 9. 用 RAF 实现丝滑歌词变色（性能优化）

`ontimeupdate` 事件大约 250ms 才触发一次，会让歌词变色卡顿。**用 `requestAnimationFrame` 高频推送进度**：

```javascript
let lyricsAnimationId = null;

function sendLyricsProgress() {
    if (!state.isPlaying) return;

    const ct = dom.audio.currentTime || 0;
    const duration = dom.audio.duration || 0;
    const progress = duration > 0 ? (ct / duration) * 100 : 0;
    const currentTrack = state.playlist[state.currentIndex];

    if (currentTrack && typeof ThemeUtils !== <q>"undefined"</q>) {
        ThemeUtils.sendMessage(<q>"playback-progress"</q>, {
            currentTrack: {
                title: currentTrack.name,
                artist: Array.isArray(currentTrack.artist)
                    ? currentTrack.artist.join(<q>" / "</q>)
                    : currentTrack.artist,
                originalTitle: currentTrack.originalTitle,
                originalArtist: currentTrack.originalArtist,
            },
            progress: progress,
            currentTime: formatTime(ct),
            duration: formatTime(duration),
            currentTimeRaw: ct,   // 悬浮歌词需要这个原始秒数
        });
    }

    lyricsAnimationId = requestAnimationFrame(sendLyricsProgress);
}

// 在 audio 的事件里启动/停止
dom.audio.onplay = () => {
    cancelAnimationFrame(lyricsAnimationId);
    sendLyricsProgress();
};

dom.audio.onpause = () => {
    cancelAnimationFrame(lyricsAnimationId);
};
```

> **注意**：上面这两段 `dom.audio.onplay` 是同一个事件的不同职责，实际写代码时要**合并到一起**——既要广播 `playback-state-changed`，又要启动 RAF 进度推送。完整模板如下：

```javascript
dom.audio.onplay = () => {
    state.isPlaying = true;
    const currentTrack = state.playlist[state.currentIndex];

    // 广播状态
    if (currentTrack && typeof ThemeUtils !== <q>"undefined"</q>) {
        ThemeUtils.sendMessage(<q>"playback-state-changed"</q>, {
            isPlaying: true,
            currentTrack: {
                title: currentTrack.name,
                name: currentTrack.name,
                artist: Array.isArray(currentTrack.artist)
                    ? currentTrack.artist.join(<q>" / "</q>)
                    : currentTrack.artist,
                coverUrl: currentTrack.coverUrl,
                originalTitle: currentTrack.originalTitle,
                originalArtist: currentTrack.originalArtist,
            },
            lyrics: state.parsedLRC,
        });
    }

    // 启动 RAF 进度推送
    cancelAnimationFrame(lyricsAnimationId);
    sendLyricsProgress();
};
```

---

## 八、API 后端代理

### 1. 端点列表

| 端点                                     | 用途               | 参数                                          |
| ---------------------------------------- | ------------------ | --------------------------------------------- |
| `/api/plugins/g-player-proxy/search`     | 搜索歌曲           | `query`, `source`（tencent/netease/kuwo）     |
| `/api/plugins/g-player-proxy/song`       | 获取详情和音频 URL | `id`, `source`                                |
| `/api/plugins/g-player-proxy/lyric`      | 获取歌词           | `id`, `source`, `title`(可选), `artist`(可选) |
| `/api/plugins/g-player-proxy/stream`     | 音频流代理         | `url`（需 `encodeURIComponent`）              |
| `/api/plugins/g-player-proxy/font-proxy` | 字体文件代理       | `url`（需 `encodeURIComponent`）              |

### 2. 调用示例

​```javascript
// 错误 ❌ - 直接调用外部 API（跨域、Token 暴露）
const response = await fetch("<https://api.vkeys.cn/v2/music/tencent?word=周杰伦>");

// 正确 ✅ - 通过后端代理
const response = await fetch(
  `/api/plugins/g-player-proxy/search?query=${encodeURIComponent("周杰伦")}&source=tencent`
);
const data = await response.json();
​```

### 3. 响应数据结构

​```javascript
// 搜索响应
{
  "data": [
    { "id": "12345", "song": "歌曲名", "singer": "歌手名", "cover": "封面URL" }
  ]
}

// 获取歌曲（网易云）
{ "data": [{ "url": "...", "lyric": "...", "tlyric": "..." }] }

// 获取歌曲（腾讯/酷我）
{ "data": { "url": "...", "lrc": "..." } }

// 换源标记
{ "_needFallback": true, "_reason": "all_sources_failed_or_mp4" }
​```

### 4. 【铁律】调用 `/lyric` 必须传 `title` 和 `artist`

腾讯源 VIP 解锁依赖 mid 字符串，但 `/lyric` 接口只认数字 id。后端会自动用 `title + artist` 反查数字 id。**前端必须传歌名歌手作为 fallback**：

​```javascript
// 错误 ❌ - 翻译会丢失
const response = await fetch(`/api/plugins/g-player-proxy/lyric?id=${id}&source=tencent`);

// 正确 ✅
function buildLyricUrl(id, source, title, artist) {
  const sourceMap = { Netease: "netease", Tencent: "tencent", Kuwo: "kuwo" };
  const apiSource = sourceMap[source] || source.toLowerCase();
  let url = `/api/plugins/g-player-proxy/lyric?id=${id}&source=${apiSource}`;
  if (title) url += `&title=${encodeURIComponent(title)}`;
  if (artist) url += `&artist=${encodeURIComponent(artist)}`;
  return url;
}
​```

适用于**所有音源**——后端对所有源都有 fallback 反查机制，即使当前源拿不到歌词，传了 `title + artist` 后端会去其他源搜歌词作为兜底。

### 5. 【铁律】歌词翻译必须单独获取

`/song` API **只返回音频 URL 和原文歌词**，翻译歌词（`tlyric`）需要额外调用 `/lyric`。

| API      | 返回内容                         |
| -------- | -------------------------------- |
| `/song`  | 音频 URL + 原文歌词 (`lrc`)      |
| `/lyric` | 原文歌词 + **翻译** (`tlyric`) ✓ |

**完整双请求模式**：

​```javascript
async function fetchFullSongDetails(trackInfo) {
  try {
    // 第一步：拿音频
    const songResponse = await fetch(`/api/plugins/g-player-proxy/song?id=${trackInfo.id}&source=${trackInfo.source}`);
    const songData = await songResponse.json();
    const audioUrl = songData?.data?.url || (Array.isArray(songData?.data) && songData.data[0]?.url);
    if (!audioUrl) throw new Error("无法获取音频链接");

    // 第二步：拿歌词（必须传 title/artist）
    let lyricsContent = "", tlyricContent = "";
    try {
      const lyricResponse = await fetch(buildLyricUrl(
        trackInfo.id, trackInfo.source, trackInfo.title, trackInfo.artist
      ));
      if (lyricResponse.ok) {
        const lyricData = await lyricResponse.json();
        if (lyricData.data) {
          lyricsContent = lyricData.data.lrc || lyricData.data.lyric || "";
          tlyricContent = lyricData.data.tlyric || lyricData.data.trans || "";
        }
      }
    } catch (e) {
      console.warn("歌词获取失败，将只播放音乐:", e);
    }

    return { ...trackInfo, audioUrl, lyricsContent, tlyricContent };
  } catch (error) {
    console.error(`获取歌曲 ${trackInfo.title} 详情失败:`, error);
    return null;
  }
}
​```

### 6. 其他后端说明

- **腾讯 VIP 解锁**：vkeys 接口对 VIP 歌曲的解锁依赖**正确的 mid 字符串**而非 songid 数字。后端自动判断并选择正确的参数名调用，前端直接传 mid 即可
- **vkeys 双成功码**：vkeys 负载均衡，官方节点返回 `code: 200`，落月节点返回 `code: 0`。后端已兼容
- **酷我封面归一化**：酷我搜索的 `pic_id` 字段格式很乱，后端 `/search` 已统一归一化为可直接 `<img src>` 使用的 `cover` 字段

---

## 九、缓存机制

### 1. MusicCache（直接读）

主系统的歌曲缓存对象自动注入到所有 iframe 主题中：

​```javascript
const MusicCache = window.MusicCache;
if (MusicCache) {
  const cached = MusicCache.getSearch(title, artist);
  if (cached) {
    const audioUrl = MusicCache.getAudio(cached.id, cached.source);
    if (audioUrl) {
      playAudio(audioUrl);  // 跳过搜索和详情接口
    }
  }
}
​```

| 方法                          | 说明                       | 返回值                                              |
| ----------------------------- | -------------------------- | --------------------------------------------------- |
| `getSearch(title, artist)`    | 查询搜索结果缓存           | `{ id, source, title, artist, coverUrl }` 或 `null` |
| `getAudio(id, source)`        | 查询音频 URL（6 小时有效） | URL 或 `null`                                       |
| `getLyrics(id, source)`       | 查询歌词（30 天有效）      | `{ content, tlyric }` 或 `null`                     |
| `getCover(id, source)`        | 查询封面（7 天有效）       | URL 或 `null`                                       |
| `invalidateAudio(id, source)` | 失效音频缓存               | -                                                   |
| `invalidateTrack(id, source)` | 失效该歌曲所有缓存         | -                                                   |

### 2. 【铁律】写入缓存（cache-track-data）

🔴 **不要直接调用** `MusicCache.setXxx` 方法！必须通过 `cache-track-data` 消息让主系统统一处理写入。直接调用会绕过主系统的回调链，导致设置面板里的歌单封面、统计数据无法同步刷新。**读取（getXxx）可以直接调，写入必须走消息。**

​```javascript
ThemeUtils.sendMessage("cache-track-data", {
  title: "歌曲名",        // 搜索缓存 key
  artist: "歌手名",       // 搜索缓存 key
  trackData: {           // 搜索结果缓存
    id: "12345", source: "Netease",
    title: "歌曲名", artist: "歌手名",
    coverUrl: "https://...",
  },
  audioUrl: "https://...",
  lyricsContent: "[00:00.00]歌词...",
  tlyricContent: "[00:00.00]翻译...",  // 可选
  coverUrl: "https://...",
});
​```

### 3. 用 `_fromCache` 标记避免重复写入

​```javascript
if (!track._fromCache) {
  sendCacheWriteback(track);
  track._fromCache = true;
}

// normalizePlaylist 中保留标记
function normalizePlaylist(playlist) {
  return playlist.map(song => ({
    // ...其他字段...
    _fromCache: song._fromCache || false,
  }));
}
​```

---

## 十、保留原始搜索信息（气泡匹配关键）

**问题背景**：用户点击的气泡显示 `Sweet Boy`，API 返回的是 `Sweet Boy (Explicit)`，主系统无法识别它们是同一首，导致无法更新气泡的 `.is-playing` 状态。

**解决方案**：保留并回传 `originalTitle` 和 `originalArtist`。

### 1. 修改 `normalizePlaylist`

​```javascript
function normalizePlaylist(playlist) {
  if (!Array.isArray(playlist)) return [];
  return playlist.map(song => ({
    name: song.name || song.title || "未知歌曲",
    title: song.name || song.title || "未知歌曲",
    artist: Array.isArray(song.artist) ? song.artist.join(" / ") : song.artist || song.singer || "未知艺术家",
    audioUrl: song.audioUrl || song.url || "",
    lyricsUrl: song.lyricsUrl || song.lrc || "",
    coverUrl: song.coverUrl || song.cover || "",
    id: song.id || null,
    source: song.source || null,
    sourceMessageId: song.sourceMessageId || null,
    // 保留原始搜索信息
    originalTitle: song.originalTitle || null,
    originalArtist: song.originalArtist || null,
  }));
}
​```

### 2. 发送状态时附带

​```javascript
function sendPlaybackState(isPlaying) {
  const currentTrack = state.playlist[state.currentTrackIndex];
  if (currentTrack && typeof ThemeUtils !== "undefined") {
    ThemeUtils.sendMessage("playback-state-changed", {
      isPlaying,
      currentTrack: {
        title: currentTrack.title,
        name: currentTrack.title,
        artist: currentTrack.artist,
        originalTitle: currentTrack.originalTitle,    // 关键
        originalArtist: currentTrack.originalArtist,  // 关键
      },
      lyrics: state.parsedLRC,
    });
  }
}
​```

`playback-progress` 消息也要附带这两个字段。

---

## 十一、内部状态字段约定（铁律）

播放器主题需要在 `track` 对象上挂 4 个**内部状态字段**来支撑错误处理逻辑。这些字段以下划线开头，**绝对不能在 normalizePlaylist 时被洗掉**。

### 字段速查表

| 字段            | 类型     | 用途                                | 何时设置                                                           | 何时清除                                               |
| --------------- | -------- | ----------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `_fromCache`    | bool     | 防止重复写缓存                      | 数据来自缓存/外部消息时设 true；`sendCacheWriteback` 写入后设 true | 仅在主动失效时重置                                     |
| `_triedSources` | string[] | 已尝试过的换源列表                  | `tryFallbackSource` 每次成功换源后追加                             | 切歌时重置为 `[]`                                      |
| `_isDirectLink` | bool     | 区分直链歌 / 搜索歌                 | `normalizePlaylist` 时根据"有 audioUrl 但无 id"判断                | 换源成功后设 false                                     |
| `_refreshed`    | bool     | 防止 `audio-playback-failed` 死循环 | 第一次发送刷新请求时设 true                                        | `loadTrack` 切歌时重置 false；前端换源成功时重置 false |

### 在 normalizePlaylist 中保留这些字段

```javascript
function normalizePlaylist(playlist) {
  return playlist.map(song => ({
    title: song.title || song.name,
    artist: song.artist,
    audioUrl: song.audioUrl || song.url || <q>""</q>,
    id: song.id || null,
    source: song.source || null,
    coverUrl: song.coverUrl || song.cover || <q>""</q>,
    originalTitle: song.originalTitle || song.title || song.name,
    originalArtist: song.originalArtist || song.artist,

    // 🔴 内部状态字段 —— 必须保留
    _fromCache: song._fromCache || false,
    _triedSources: song._triedSources || [],
    _isDirectLink: !!(song.audioUrl || song.url) && !song.id,
    // _refreshed 不在 normalize 时设置，由 loadTrack 控制
  }));
}
```

### 为什么要区分 `_isDirectLink`？

- **直链歌**（角色卡里写死的 catbox 链接）：失败时无法刷 URL，应直接转为搜索模式
- **搜索歌**（点击 BGM 气泡得来的）：失败时优先让主系统刷 URL

不区分这两类，会导致直链歌挂掉时反复发无效的刷新请求。

## 十二、其他增强

### 1. 【铁律】长歌单必须做虚拟滚动

**问题**：用户的歌单可能有几百首甚至上千首歌。如果直接 `innerHTML` 全部渲染，会出现：

- 首次打开播放列表卡顿 1~3 秒
- 滚动掉帧严重
- 歌曲项里有封面图时，浏览器会一次性发起几百个图片请求，把网络打满

**所有播放器主题都必须实现虚拟滚动**，这是底线，不是可选项。

#### 推荐实现思路

设置阈值（比如 80 首），少于阈值时直接全量渲染；超过阈值时启用虚拟滚动：只渲染可视区附近的项，其他用一个撑开高度的占位元素填充滚动条。

```javascript
const VPL_ITEM_HEIGHT = 46;   // 单项固定高度，必须和 CSS 一致
const VPL_BUFFER = 5;         // 上下额外渲染的缓冲行数
const VPL_THRESHOLD = 80;     // 启用虚拟滚动的阈值

let vplScrollHandler = null;
let vplRafId = null;
let vplRenderVisible = null;

function renderPlaylist() {
  // 卸载上次的滚动监听
  if (vplScrollHandler) {
    listEl.removeEventListener(<q>"scroll"</q>, vplScrollHandler);
    vplScrollHandler = null;
  }
  if (vplRafId) {
    cancelAnimationFrame(vplRafId);
    vplRafId = null;
  }

  const total = state.playlist.length;

  // 数据少：全量渲染，简单可靠
  if (total <= VPL_THRESHOLD) {
    listEl.style.position = "";
    listEl.innerHTML = state.playlist
      .map((track, idx) => buildItemHtml(track, idx, false))
      .join(<q>""</q>);
    return;
  }

  // 数据多：启用虚拟滚动
  listEl.style.position = <q>"relative"</q>;
  const totalHeight = total * VPL_ITEM_HEIGHT;

  const renderVisible = () => {
    const scrollTop = listEl.scrollTop;
    const viewHeight = listEl.clientHeight || 300;
    const start = Math.max(0, Math.floor(scrollTop / VPL_ITEM_HEIGHT) - VPL_BUFFER);
    const end = Math.min(total, Math.ceil((scrollTop + viewHeight) / VPL_ITEM_HEIGHT) + VPL_BUFFER);

    // 撑开总高度的占位元素 + 可视区的真实项
    const parts = [
      `<li class="vpl-spacer" style="height:${totalHeight}px;"></li>`,
    ];
    for (let i = start; i < end; i++) {
      parts.push(buildItemHtml(state.playlist[i], i, true));
    }
    listEl.innerHTML = parts.join("");
  };

  vplRenderVisible = renderVisible;
  vplScrollHandler = () => {
    if (vplRafId) return;
    vplRafId = requestAnimationFrame(() => {
      vplRafId = null;
      renderVisible();
    });
  };

  listEl.addEventListener(<q>"scroll"</q>, vplScrollHandler);
  renderVisible();
}

// 真实列表项需要绝对定位到正确高度
function buildItemHtml(track, index, virtual) {
  const posStyle = virtual
    ? `style="position:absolute;top:${index * VPL_ITEM_HEIGHT}px;left:0;right:0;"`
    : <q>""</q>;
  return `<li data-index="${index}" ${posStyle}>${track.title}</li>`;
}
```

对应的 CSS：

```css
.vpl-spacer {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
  opacity: 0;
  pointer-events: none;
}
```

#### 必须配套的细节

| 细节                       | 说明                                                                                                                                         |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **统一项高度**             | CSS 里给每个 `<li>` 写死 `height: 46px; box-sizing: border-box;`，否则虚拟滚动会错位                                                         |
| **打开面板时刷新一次**     | 面板默认 `display:none`，刚打开时 `clientHeight` 是 0，可视区算出来是空的。打开面板后用两层 `requestAnimationFrame` 调一次 `renderVisible()` |
| **更新选中态用 DOM 操作**  | 切歌时不要重新 `renderPlaylist()`，应该 `querySelectorAll` 出当前可见项，挨个 `classList.toggle`，否则滚动位置会丢                           |
| **scroll 事件用 RAF 节流** | 直接绑 scroll 不节流会卡，用 `requestAnimationFrame` 包一层                                                                                  |
| **切换数据源时清理监听**   | 切换到新歌单或清空列表时，记得 `removeEventListener` 清理上一次的滚动监听，否则会内存泄漏                                                    |

#### 触摸滚动注意

播放器的拖动逻辑会自动跳过 `.bw-list`、`.gmp-scroll-list` 这类约定类名，但**自定义类名时记得给可滚动容器加 `data-no-drag`**，否则手机端滑动可能被拖动逻辑吃掉。

### 2. 预加载下一首

​```javascript
const preloadNextTrack = async () => {
  if (currentPlaylist.length <= 1) return;
  const nextIndex = (currentTrackIndex + 1) % currentPlaylist.length;
  const nextTrack = currentPlaylist[nextIndex];
  if (!nextTrack) return;

  // 优先从缓存获取
  if (window.MusicCache && nextTrack.id && nextTrack.source) {
    const cachedAudio = window.MusicCache.getAudio(nextTrack.id, nextTrack.source);
    if (cachedAudio) nextTrack.audioUrl = cachedAudio;
  }

  // 缓存没有则获取
  if (!nextTrack.audioUrl && nextTrack.id && nextTrack.source) {
    try {
      const sourceMap = { Netease: "netease", Tencent: "tencent", Kuwo: "kuwo" };
      const apiSource = sourceMap[nextTrack.source] || nextTrack.source.toLowerCase();
      const response = await fetch(`/api/plugins/g-player-proxy/song?id=${nextTrack.id}&source=${apiSource}`);
      if (response.ok) {
        const data = await response.json();
        const songItem = Array.isArray(data.data) ? data.data[0] : data.data;
        if (songItem?.url) nextTrack.audioUrl = songItem.url;
      }
    } catch (e) { return; }
  }
  if (!nextTrack.audioUrl) return;

  if (!preloadAudio) {
    preloadAudio = new Audio();
    preloadAudio.preload = "auto";
    preloadAudio.volume = 0;
  }
  const trackKey = `${nextTrack.id}-${nextTrack.source}`;
  if (preloadAudio.dataset.trackId === trackKey) return;
  preloadAudio.dataset.trackId = trackKey;
  preloadAudio.src = getProxiedUrl(nextTrack.audioUrl);
};
​```

### 3. 加载超时 + Progress Watchdog（双层保护）

#### 第一层：加载超时

防止「连 loading 都卡住进不去」的死局。`waiting` 事件触发后启动 15 秒超时，超时未恢复就走错误处理链。

```javascript
const LOADING_TIMEOUT = 15000;
let loadingTimeoutId = null;

const startLoadingTimeout = () => {
  clearTimeout(loadingTimeoutId);
  loadingTimeoutId = setTimeout(() => {
    if (dom.container.classList.contains(<q>"loading"</q>)) handleStuckPlayback();
  }, LOADING_TIMEOUT);
};

const clearLoadingTimeout = () => {
  clearTimeout(loadingTimeoutId);
  loadingTimeoutId = null;
};

dom.audio.addEventListener(<q>"waiting"</q>, () => {
  enterLoadingState();
  startLoadingTimeout();
});

dom.audio.addEventListener(<q>"canplay"</q>, clearLoadingTimeout);
dom.audio.addEventListener(<q>"canplaythrough"</q>, clearLoadingTimeout);
```

#### 第二层：Progress Watchdog（进度看门狗）

防止「正在播放但 currentTime 不动」的假死。每 5 秒检查进度是否推进，没推进就视为卡死。

```javascript
let lastProgressTime = 0;
let progressCheckInterval = null;

const startProgressCheck = () => {
  stopProgressCheck();
  lastProgressTime = audio.currentTime;
  progressCheckInterval = setInterval(() => {
    if (state.isPlaying && !audio.paused) {
      const ct = audio.currentTime;
      // 5 秒内进度没推进（容差 0.1 秒）→ 卡死
      if (Math.abs(ct - lastProgressTime) < 0.1) {
        handleStuckPlayback();
      }
      lastProgressTime = ct;
    }
  }, 5000);
};

const stopProgressCheck = () => {
  if (progressCheckInterval) {
    clearInterval(progressCheckInterval);
    progressCheckInterval = null;
  }
};

audio.addEventListener(<q>"playing"</q>, startProgressCheck);
audio.addEventListener(<q>"pause"</q>, stopProgressCheck);
```

#### 卡死处理函数

两层保护都调用同一个处理函数。**先尝试就地恢复（seek + play），失败再走错误链**：

```javascript
function handleStuckPlayback() {
  const track = state.playlist[state.currentIndex];
  if (!track) return;

  const ct = audio.currentTime;
  if (ct > 0 && audio.src) {
    // 尝试就地恢复：把当前时间往前推一点点强制 seek
    audio.currentTime = ct + 0.1;
    audio.play().catch(() => {
      // 就地恢复失败 → 重载
      const src = audio.src;
      audio.src = <q>""</q>;
      setTimeout(() => {
        audio.src = src;
        audio.currentTime = ct;
        audio.play().catch(() => {
          // 重载也失败 → 走错误链
          tryFallbackSource(
            track.originalTitle || track.title,
            track.originalArtist || track.artist,
            track._triedSources || [],
            true
          );
        });
      }, 500);
    });
  }
}
```

**为什么需要两层**：

- `waiting` 事件不一定会触发——浏览器有时候音频卡住了但不发 `waiting`
- 单靠 watchdog 又会让首次加载阶段误判（首次加载可能 5 秒都拿不到首帧）
- 两层配合：loading 阶段靠 timeout，播放阶段靠 watchdog

### 4. BGM 数据来源

播放器歌单数据有两个来源：

**A. 世界书 `@BGM@` 条目**

```
歌曲名: 晴天
歌手: 周杰伦
音频链接: https://example.com/audio.mp3
封面链接: https://example.com/cover.jpg
歌词链接: https://example.com/lyrics.lrc
===
歌曲名: 七里香
歌手: 周杰伦
音频链接: https://example.com/audio2.mp3
===
```

每首歌之间用 `===` 分隔。必填：`歌曲名`、`音频链接`。可选：`歌手`、`封面链接`、`歌词链接`。也支持英文字段名 `title`、`artist` 等。

**B. 聊天消息中的 `[bgm]` 标签**

AI 输出 `[bgm]歌曲名-歌手[/bgm]` 时，主系统自动搜索并添加。

---

## 十三、尺寸策略（与普通主题不同）

播放器主题用 **JS 动态尺寸**：

- **JSON 配置**：`width` 和 `height` 设为最小状态（迷你模式）的**固定像素**
- **【禁止】**：用 `maxWidth` 或 `vw`

​```json
{ "draggable": { "width": "80px", "height": "100px" } }
​```

**工作原理**：通过 `ThemeUtils.sendMessage('resize-iframe', ...)` 主动命令外部容器在不同状态间改变大小：

​```javascript
function toggleExpand(expand) {
  if (expand) {
    ThemeUtils.sendMessage("resize-iframe", { width: "340px", height: "520px" });
    ThemeUtils.sendMessage("player-expanding");  // 移动端会自动居中
  } else {
    ThemeUtils.sendMessage("resize-iframe", { width: "80px", height: "100px" });
    ThemeUtils.sendMessage("player-collapsing");
  }
}
​```

---

## 十四、输出格式要求

请根据用户的播放器主题需求提供方案。务必为用户提供**完整的、可直接复制粘贴的代码块**。

--- HTML Structure ---
​```html
...完整HTML代码...
​```

--- CSS Style (for iframe) ---
​```css
...完整CSS代码...
​```

--- JavaScript Code (for iframe) ---
​```javascript
...完整JS代码...
​```

--- 尺寸配置（JSON） ---
​```json
...完整JSON配置...
​```
