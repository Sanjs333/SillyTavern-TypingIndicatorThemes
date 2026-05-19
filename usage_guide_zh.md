## G-Player 音乐代理插件安装

**播放器功能需要安装后端代理插件才能正常使用在线搜索和播放**。

---

### 一键安装（推荐）

> ⚠️ **执行前请先导航到 SillyTavern 所在的文件夹**（即包含 SillyTavern 文件夹的目录）

#### 🪟 Windows (PowerShell)

1. 打开 PowerShell
2. 导航到 SillyTavern 所在位置，例如：

   ```powershell
   cd D:\AI    # 如果你的 SillyTavern 在 D:\AI\SillyTavern
   ```

3. 执行安装命令：

   **GitHub 源（国际）：**

   ```powershell
   cd SillyTavern && (Get-Content config.yaml) -replace 'enableServerPlugins: false', 'enableServerPlugins: true' | Set-Content config.yaml && cd plugins && git clone https://github.com/Sanjs333/g-player-proxy.git && cd g-player-proxy && npm install && cd ../.. && echo "安装完成！请重启 SillyTavern"
   ```

   **Gitee 源（国内）：**

   ```powershell
   cd SillyTavern && (Get-Content config.yaml) -replace 'enableServerPlugins: false', 'enableServerPlugins: true' | Set-Content config.yaml && cd plugins && git clone https://gitee.com/Sanj333/g-player-proxy.git && cd g-player-proxy && npm install && cd ../.. && echo "安装完成！请重启 SillyTavern"
   ```

#### 🐧 Linux / macOS

1. 打开终端
2. 导航到 SillyTavern 所在位置：

   ```bash
   cd ~    # 如果 SillyTavern 在用户目录下
   ```

3. 执行安装命令：

   **GitHub 源（国际）：**

   ```bash
   cd SillyTavern && sed -i 's/enableServerPlugins: false/enableServerPlugins: true/' config.yaml && cd plugins && git clone https://github.com/Sanjs333/g-player-proxy.git && cd g-player-proxy && npm install && echo "安装完成！请重启 SillyTavern"
   ```

   **Gitee 源（国内）：**

   ```bash
   cd SillyTavern && sed -i 's/enableServerPlugins: false/enableServerPlugins: true/' config.yaml && cd plugins && git clone https://gitee.com/Sanj333/g-player-proxy.git && cd g-player-proxy && npm install && echo "安装完成！请重启 SillyTavern"
   ```

#### 📱 Termux (Android)

1. 打开 Termux
2. 执行安装命令：

   **GitHub 源（国际）：**

   ```bash
   cd ~ && cd SillyTavern && sed -i 's/enableServerPlugins: false/enableServerPlugins: true/' config.yaml && cd plugins && git clone https://github.com/Sanjs333/g-player-proxy.git && cd g-player-proxy && npm install && echo "安装完成！请重启 SillyTavern"
   ```

   **Gitee 源（国内）：**

   ```bash
   cd ~ && cd SillyTavern && sed -i 's/enableServerPlugins: false/enableServerPlugins: true/' config.yaml && cd plugins && git clone https://gitee.com/Sanj333/g-player-proxy.git && cd g-player-proxy && npm install && echo "安装完成！请重启 SillyTavern"
   ```

---

### 手动安装

如果一键命令失败，请按以下步骤手动安装：

**第一步：启用服务端插件**

1. 打开 SillyTavern 根目录下的 `config.yaml` 文件
2. 找到 `enableServerPlugins: false`
3. 将 `false` 改为 `true`
4. 保存文件

**第二步：创建插件目录**

在 SillyTavern 根目录下，找到 `plugins` 文件夹。

**第三步：下载插件**

**方式一：使用 Git（推荐）**

```bash
cd SillyTavern/plugins

# GitHub 源（国际）
git clone https://github.com/Sanjs333/g-player-proxy.git

# 或 Gitee 源（国内）
git clone https://gitee.com/Sanj333/g-player-proxy.git

cd g-player-proxy
npm install
```

**方式二：手动下载 ZIP**

> ⚠️ **重要**：手动下载 ZIP 不会自带 `node_modules`，**重启酒馆也不会自动帮你装依赖**，必须手动执行下面第 3 步的 `npm install`，否则插件无法工作。

| 源            | 下载地址                                                                         |
| ------------- | -------------------------------------------------------------------------------- |
| GitHub        | [github.com/Sanjs333/g-player-proxy](https://github.com/Sanjs333/g-player-proxy) |
| Gitee（国内） | [gitee.com/Sanj333/g-player-proxy](https://gitee.com/Sanj333/g-player-proxy)     |

1. 点击绿色的 `Code` / `克隆/下载` 按钮 → `Download ZIP` / `下载 ZIP`
2. 解压后将文件夹重命名为 `g-player-proxy`，放入 `SillyTavern/plugins/` 目录
3. 在插件目录内打开终端，执行 `npm install`（**这一步不能省**）

**第四步：重启 SillyTavern**

关闭并重新启动 SillyTavern。

---

### 验证安装

启动后在控制台看到以下信息表示安装成功：

```
[G-Player Proxy] ✓ 已启动
```

---

### 安装失败排查

| 问题                     | 解决方案                                                                          |
| ------------------------ | --------------------------------------------------------------------------------- |
| 没有看到启动信息         | 检查 `config.yaml` 中 `enableServerPlugins` 是否为 `true`                         |
| `git clone` GitHub 失败  | 国内用户请使用 Gitee 源：`git clone https://gitee.com/Sanj333/g-player-proxy.git` |
| `git` 命令不存在         | 请先安装 Git：<https://git-scm.com/downloads>                                     |
| `npm` 命令不存在         | 请先安装 Node.js：<https://nodejs.org/>                                           |
| `npm install` 很慢或失败 | 设置国内镜像：`npm config set registry https://registry.npmmirror.com`            |
| 文件夹结构不对           | 确保路径为 `SillyTavern/plugins/g-player-proxy/index.js`                          |
| macOS 的 sed 报错        | 使用 `sed -i '' 's/...'`（加空引号）或安装 gnu-sed                                |

---

## 重要：位置锁定

指示器主题需要**先锁定位置**，才能与主题内部进行交互（如点击按钮等）。

---

## 🎨 指示器主题

### 自动跟随主界面主题

勾选「自动跟随主界面主题」后，符合命名规则的主题会自动切换。

**命名规则：** 主界面主题名必须是指示器主题/方案名的**开头部分**

| 类型       | 名称示例                           |
| ---------- | ---------------------------------- |
| UI主题     | 像素薄荷绿                         |
| 指示器方案 | 像素薄荷绿                         |
| 指示器美化 | 像素薄荷绿-美化 / 像素薄荷绿 Style |

### 方案与主题快速配套

当你选择一个方案或主题时，插件会自动提示匹配的配套项。

**配套规则：** 方案名 + 后缀 = 主题名

支持的后缀：`-美化`、`-Style`、`Style`、`主题`、`Theme`

| 方案名     | 可配套的主题名                                       |
| ---------- | ---------------------------------------------------- |
| 像素薄荷绿 | 像素薄荷绿-美化、像素薄荷绿 Style、像素薄荷绿主题 等 |

---

## 🎵 播放器

### 拖动播放器

播放器现在可以**随时拖动**，无需先锁定位置。

- 按住**播放器空白区域**即可拖动
- 拖动时丝滑跟手，使用 GPU 加速
- 按钮、进度条、列表项等交互元素**不会**触发拖动

> "锁定位置"开关对播放器不再生效（拖动永远启用）。但**指示器主题**仍然需要锁定才能交互。

### 自动隐藏

开启"自动隐藏"后，播放器会**默认隐身**：

- **点击聊天空白区域** → 切换播放器显示/隐藏
- 点按钮、消息操作、BGM 气泡等不会误触发
- 隐藏时音乐继续播放，进度不会丢失
- 适合不想让播放器挡视线的场景

> 「自动隐藏」和「后台模式」不要同时开启，逻辑上会冲突。

### 从世界书读取歌单

播放器可以自动读取**角色卡世界书（非全局世界书）**里定义的歌单。

**设置步骤：**

1. 在世界书中创建一个**已激活（绿灯）**的条目
2. 关键字 (Key) 设置为：`@BGM@`
3. 内容 (Content) 按以下格式填写：

```
歌曲名: All Alone With You
歌手: EGOIST
音频链接: https://…….mp3
封面链接: https://…….gif
歌词链接: https://…….lrc
=====
歌曲名: 優しい彗星
歌手: YOASOBI
音频链接: https://…….mp3
=====
歌曲名: Close Your Eyes
歌手: 本田みちよ
音频链接: https://…….mp3
封面链接: https://…….jpg
歌词链接: https://…….lrc
```

**格式说明：**

- 使用**英文冒号 `:`** 后跟一个空格
- 用 `=====`（至少3个**英文等号**）分隔多首歌曲
- 封面链接和歌词链接为可选项

### 自动添加BGM（AI输出）

导入指示器世界书并全局启用后，AI回复中的BGM会被自动渲染为可点击气泡，并加入播放列表。

**AI输出格式：**

```
[bgm]歌曲名-歌手[/bgm]
```

> ⚠️ BGM格式不可被 \` 或 \`\`\` 包裹

---

## 动态主题

动态主题可用于氛围美化。当AI描述特定场景时，输出触发标签即可切换主题。

**触发格式：**

```
[Theme: 主题名]
```

**示例：** AI描述下雪场景时输出 `[Theme: 飘雪]`，即触发飘雪动态效果。
停留时间由设置中的「主题持续时间」决定（设为0则立即隐藏）。

**动态主题会消耗一定性能，可能会造成卡顿，请根据设备情况启用**

---

## ❓ 常见问题

### 插件安装相关

**Q: 一键命令执行失败怎么办？**
A: 请使用手动安装方式，按步骤逐一操作。

**Q: GitHub 克隆失败或速度很慢？**
A: 国内用户请使用 Gitee 镜像源：

```bash
git clone https://gitee.com/Sanj333/g-player-proxy.git
```

**Q: 提示 `git` 或 `npm` 命令不存在？**
A: 需要先安装 [Git](https://git-scm.com/downloads) 和 [Node.js](https://nodejs.org/)。

**Q: `npm install` 下载很慢或失败？**
A: 设置国内 npm 镜像后重试：

```bash
npm config set registry https://registry.npmmirror.com
npm install
```

**Q: 重启后没有看到插件启动信息？**
A: 请确认：

1. `config.yaml` 中 `enableServerPlugins: true`
2. 插件路径正确：`SillyTavern/plugins/g-player-proxy/index.js`
3. 已在插件目录执行过 `npm install`

**Q: 重启后没有看到插件启动信息？**
A: 请确认：

1. `config.yaml` 中 `enableServerPlugins: true`
2. 插件路径正确：`SillyTavern/plugins/g-player-proxy/index.js`
3. 已在插件目录执行过 `npm install`

**Q: 手动下载 ZIP 装的，重启酒馆它会自动装依赖吗？**
A: 不会。SillyTavern 启动时**不会**自动给 plugins 目录里的子项目跑 `npm install`，必须自己进 `g-player-proxy` 文件夹打开终端执行一次 `npm install`。如果之前用 git clone 装的话也是一样，git 不会自动装依赖。

### 指示器相关

**Q: 为什么点不动主题内的按钮？**
A: 需要先在设置中勾选「锁定位置」。

**Q: 指示器样式错乱？**
A: 请检查当前使用的主题与方案是否存在配套主题，尝试使用配套的主题方案组合，或使用**固定模式**、**刷新显示内容**刷新页面指示器显示。

**Q: 自动跟随主题没生效？**
A: 检查命名是否符合规则——主界面主题名必须是指示器主题名的开头部分。

**Q: 指示器内图片不显示？**
A: 请开启VPN加载图床链接，若开启后还未显示推荐更换节点（如日本）。

**Q: 为什么我给角色绑定了专属指示器但使用时不是专属指示器？**
A: 如果你之前在「指示器样式主题」的全局下拉框中手动选择过主题，这个操作会临时覆盖角色专属设置。

**Q：插件更新后内置项要手动恢复吗？**
A：从 3.4.6 起，插件升级时会**自动恢复内置主题/预设/气泡**到最新版。如果您修改过内置项又想保留，请先在「工具」页**导出备份**再升级。

解决方法：

1. 切换到其他聊天再切回来（会自动重置）
2. 下拉框中重新切换一下主题

优先级说明：手动选择 > 角色专属 > UI跟随 > 全局设置

### 播放器相关

**Q: BGM气泡没有显示？**
A: 确认AI输出了正确格式 `[bgm]歌曲名-歌手[/bgm]`，且没有被代码块包裹。

**Q: 播放器主题不显示在列表中？**
A: 播放器主题必须以 `播放器` 或 `Player` 作为名称前缀才能被插件识别。

**Q: AI不输出BGM或动态主题？**
A: 检查**全局是否启用指示器世界书**，或**调整条目位置**。BGM条目可调整至**深度0**，动态主题可调整至**@⚙、深度0**的位置，或**更改条目提示词内容**。

**Q: BGM在播放器内无法播放？**
A: 尝试**重启播放器**或**刷新SillyTavern网页**，若依旧无法播放则可能该歌曲不支持。

**Q: 音乐气泡无法暂停播放器内的音乐？**
A: 气泡使用模糊匹配来识别当前播放的歌曲。如果无法控制，可能是气泡中的歌名/歌手与播放器显示的差异较大（如气泡写「周杰伦」但播放器显示「Jay Chou」）。

**Q: 为什么我的播放器没有搜索功能？**
A: 请使用工具页恢复内置项更新播放器，若之前修改过内置主题想要保留，请记得备份。
