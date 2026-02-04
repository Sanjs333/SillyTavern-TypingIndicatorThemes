## G-Player Music Proxy Plugin Installation

**The backend proxy plugin is required for online search and playback features.**

---

### One-Click Installation (Recommended)

> ⚠️ **Navigate to the parent folder containing your SillyTavern directory before running these commands**

#### 🪟 Windows (PowerShell)

1. Open PowerShell
2. Navigate to where SillyTavern is located, for example:

   ```powershell
   cd D:\AI    # If your SillyTavern is at D:\AI\SillyTavern
   ```

3. Run the installation command:

   ```powershell
   cd SillyTavern && (Get-Content config.yaml) -replace 'enableServerPlugins: false', 'enableServerPlugins: true' | Set-Content config.yaml && cd plugins && git clone https://github.com/Sanjs333/g-player-proxy.git && cd g-player-proxy && npm install && cd ../.. && echo "Installation complete! Please restart SillyTavern"
   ```

#### 🐧 Linux / macOS

1. Open Terminal
2. Navigate to where SillyTavern is located:

   ```bash
   cd ~    # If SillyTavern is in your home directory
   ```

3. Run the installation command:

   ```bash
   cd SillyTavern && sed -i 's/enableServerPlugins: false/enableServerPlugins: true/' config.yaml && cd plugins && git clone https://github.com/Sanjs333/g-player-proxy.git && cd g-player-proxy && npm install && echo "Installation complete! Please restart SillyTavern"
   ```

#### 📱 Termux (Android)

1. Open Termux
2. Run the installation command:

   ```bash
   cd ~ && cd SillyTavern && sed -i 's/enableServerPlugins: false/enableServerPlugins: true/' config.yaml && cd plugins && git clone https://github.com/Sanjs333/g-player-proxy.git && cd g-player-proxy && npm install && echo "Installation complete! Please restart SillyTavern"
   ```

---

### Manual Installation

If the one-click command fails, follow these steps:

**Step 1: Enable Server Plugins**

1. Open `config.yaml` in your SillyTavern root directory
2. Find `enableServerPlugins: false`
3. Change `false` to `true`
4. Save the file

**Step 2: Locate Plugins Directory**

Find the `plugins` folder in your SillyTavern root directory.

**Step 3: Download Plugin**

**Option A: Using Git (Recommended)**

```bash
cd SillyTavern/plugins
git clone https://github.com/Sanjs333/g-player-proxy.git
cd g-player-proxy
npm install
```

**Option B: Manual ZIP Download**

1. Go to [github.com/Sanjs333/g-player-proxy](https://github.com/Sanjs333/g-player-proxy)
2. Click the green `Code` button → `Download ZIP`
3. Extract and rename the folder to `g-player-proxy`, place it in `SillyTavern/plugins/`
4. Open terminal in the plugin directory and run `npm install`

**Step 4: Restart SillyTavern**

Close and restart SillyTavern.

---

### Verify Installation

You should see this message in the console on startup:

```
[G-Player Proxy] ✓ Started
```

---

### Troubleshooting Installation

| Issue                   | Solution                                                       |
| ----------------------- | -------------------------------------------------------------- |
| No startup message      | Check that `enableServerPlugins` is `true` in `config.yaml`    |
| `git` command not found | Install Git: <https://git-scm.com/downloads>                   |
| `npm` command not found | Install Node.js: <https://nodejs.org/>                         |
| Wrong folder structure  | Ensure path is `SillyTavern/plugins/g-player-proxy/index.js`   |
| macOS sed error         | Use `sed -i '' 's/...'` (with empty quotes) or install gnu-sed |

---

## Important: Lock Position

Both indicator themes and the player require **locking position first** to enable interaction with internal elements (such as clicking buttons).

---

## 🎨 Indicator Themes

### Auto-Follow Main UI Theme

When "Auto-sync with Main UI Theme" is enabled, themes matching the naming convention will switch automatically.

**Naming Rule:** The main UI theme name must be the **prefix** of the indicator theme/preset name

| Type             | Example Name                      |
| ---------------- | --------------------------------- |
| UI Theme         | PixelMint                         |
| Indicator Preset | PixelMint                         |
| Indicator Theme  | PixelMint-Style / PixelMint Theme |

### Quick Preset-Theme Pairing

When you select a preset or theme, the plugin will automatically suggest matching pairs.

**Pairing Rule:** Preset Name + Suffix = Theme Name

Supported suffixes: `-Style`, `Style`, `Theme`

| Preset Name | Matching Theme Names                                    |
| ----------- | ------------------------------------------------------- |
| PixelMint   | PixelMint-Style, PixelMint Style, PixelMint Theme, etc. |

---

## 🎵 Player

### Loading Playlist from World Book

The player can automatically read playlists defined in **character-attached World Books (not global World Books)**.

**Setup Steps:**

1. Create an **activated (green light)** entry in the World Book
2. Set the Key to: `@BGM@`
3. Fill in the Content using this format:

```
title: All Alone With You
artist: EGOIST
audioUrl: https://…….mp3
coverUrl: https://…….gif
lyricsUrl: https://…….lrc
=====
title: Yasashii Suisei
artist: YOASOBI
audioUrl: https://…….mp3
=====
title: Close Your Eyes
artist: Honda Michiyo
audioUrl: https://…….mp3
coverUrl: https://…….jpg
lyricsUrl: https://…….lrc
```

**Format Notes:**

- Use **colon `:`** followed by a space
- Separate multiple songs with `=====` (at least 3 equal signs)
- Cover URL and Lyrics URL are optional

### Auto-Adding BGM (AI Output)

After importing the indicator World Book and enabling it globally, BGM tags in AI responses will be automatically rendered as clickable bubbles and added to the playlist.

**AI Output Format:**

```
[bgm]Song Title-Artist[/bgm]
```

> ⚠️ BGM format must NOT be wrapped in \` or \`\`\`

---

## Dynamic Themes

Dynamic themes can be used for atmosphere effects. When AI describes specific scenarios, outputting a trigger tag will switch the theme.

**Trigger Format:**

```
[Theme: ThemeName]
```

**Example:** When AI describes a snowing scene, outputting `[Theme: Snow]` triggers the snow effect.
Display duration is controlled by the "Theme Duration" setting (set to 0 for immediate hide).

**Dynamic themes consume performance and may cause lag. Enable based on your device capabilities.**

---

## ❓ FAQ

### Plugin Installation

**Q: One-click command failed?**
A: Use manual installation and follow the steps one by one.

**Q: `git` or `npm` command not found?**
A: Install [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) first.

**Q: No plugin startup message after restart?**
A: Please verify:

1. `enableServerPlugins: true` in `config.yaml`
2. Correct plugin path: `SillyTavern/plugins/g-player-proxy/index.js`
3. `npm install` was run in the plugin directory

### Indicator

**Q: Why can't I click buttons inside the theme?**
A: You need to check "Lock Position" in settings first.

**Q: Indicator style is broken?**
A: Check if there's a matching theme for your current preset. Try using matched theme-preset combinations, or use persistent mode and refresh the page.

**Q: Auto-follow theme not working?**
A: Check if naming follows the rule—the main UI theme name must be the prefix of the indicator theme name.

**Q: Images not showing in indicator?**
A: The image hosting might be blocked. Try using a VPN and switching nodes (e.g., Japan).

**Q: Character-specific indicator not applying?**
A: If you manually selected a theme from the global dropdown, it temporarily overrides character-specific settings.

Solutions:

1. Switch to another chat and back (auto-resets)
2. Re-select a theme from the dropdown

Priority: Manual Selection > Character-Specific > UI Follow > Global Settings

### Player

**Q: BGM bubbles not showing?**
A: Confirm AI output uses correct format `[bgm]Song-Artist[/bgm]` and is not wrapped in code blocks.

**Q: Player theme not showing in the list?**
A: Player themes must have `Player` as a name prefix to be recognized.

**Q: AI not outputting BGM or dynamic themes?**
A: Check if **indicator World Book is globally enabled**, or **adjust entry position**. BGM entries can be set to **Depth 0**, dynamic themes to **@⚙, Depth 0**, or **modify the entry prompt content**.

**Q: BGM won't play in the player?**
A: Try **restarting the player** or **refreshing the SillyTavern page**. If it still won't play, the song may not be available.

**Q: Music bubble can't control player playback?**
A: Bubbles use fuzzy matching to identify the current track. If control fails, the song name/artist in the bubble may differ significantly from what the player shows.

**Q: Why doesn't my player have search functionality?**
A: Use the Tools page to restore built-in items to update the player. If you modified built-in themes and want to keep them, remember to export a backup first.
