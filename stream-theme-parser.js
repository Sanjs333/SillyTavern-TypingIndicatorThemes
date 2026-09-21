const THEME_PREFIX = "[Theme:";
const SNAPSHOT_OVERLAP = 64;

export function createStreamThemeParser() {
  let previousText = "";
  let previousTail = "";
  let scannedLength = 0;
  let prefixLength = 0;
  let nameStart = -1;

  function reset() {
    previousText = "";
    previousTail = "";
    scannedLength = 0;
    prefixLength = 0;
    nameStart = -1;
  }

  function scan(text) {
    if (typeof text !== "string" || text === previousText) return null;

    // SillyTavern sends cumulative snapshots; only their new suffix is scanned.
    if (
      text.length <= scannedLength ||
      text.slice(Math.max(0, scannedLength - SNAPSHOT_OVERLAP), scannedLength) !==
        previousTail
    ) {
      reset();
    }

    let cursor = scannedLength;
    let themeName = null;
    while (cursor < text.length) {
      if (nameStart !== -1) {
        const end = text.indexOf("]", cursor);
        if (end === -1) break;
        if (end > nameStart) {
          themeName = text.slice(nameStart, end).trim();
        }
        nameStart = -1;
        cursor = end + 1;
        continue;
      }

      if (prefixLength === 0) {
        const start = text.indexOf("[", cursor);
        if (start === -1) break;
        cursor = start;
      }

      const character = text[cursor++];
      if (character === THEME_PREFIX[prefixLength]) {
        prefixLength++;
      } else {
        prefixLength = character === "[" ? 1 : 0;
      }
      if (prefixLength === THEME_PREFIX.length) {
        nameStart = cursor;
        prefixLength = 0;
      }
    }

    previousText = text;
    scannedLength = text.length;
    previousTail = text.slice(-SNAPSHOT_OVERLAP);
    return themeName;
  }

  return { scan, reset };
}
