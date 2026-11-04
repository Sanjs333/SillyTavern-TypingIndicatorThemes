// Layout belongs to an ST theme / indicator ID pairing, not a shared theme asset.
function parseOffset(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(-500, Math.min(500, Math.trunc(number)));
}

function pairingKey(uiThemeName, indicatorThemeId) {
  if (
    typeof uiThemeName !== "string" || !uiThemeName ||
    typeof indicatorThemeId !== "string" || !indicatorThemeId
  ) return null;
  // JSON tuples avoid delimiter collisions and special object-property names.
  return JSON.stringify([uiThemeName, indicatorThemeId]);
}

function offsetMap(settings) {
  const map = settings.floatingBottomOffsets;
  return map && typeof map === "object" && !Array.isArray(map) ? map : null;
}

function disabledOffsetMap(settings) {
  const map = settings.disabledFloatingBottomOffsets;
  return map && typeof map === "object" && !Array.isArray(map) ? map : null;
}

export function normalizeFloatingOffset(value) {
  return parseOffset(value) ?? 0;
}

export function getFloatingOffsetState(settings, uiThemeName, indicatorThemeId) {
  const key = pairingKey(uiThemeName, indicatorThemeId);
  const map = offsetMap(settings);
  const remembered = key && map && Object.prototype.hasOwnProperty.call(map, key)
    ? parseOffset(map[key])
    : null;
  const disabled = disabledOffsetMap(settings);
  const bound = remembered !== null && !(disabled &&
    Object.prototype.hasOwnProperty.call(disabled, key) && disabled[key] === true);
  return {
    key,
    bound,
    offset: bound ? remembered : normalizeFloatingOffset(settings.floatingBottomOffset),
  };
}

export function setFloatingOffset(settings, uiThemeName, indicatorThemeId, value) {
  const key = pairingKey(uiThemeName, indicatorThemeId);
  const offset = parseOffset(value);
  if (!key || offset === null) return false;
  if (!offsetMap(settings)) settings.floatingBottomOffsets = {};
  settings.floatingBottomOffsets[key] = offset;
  const disabled = disabledOffsetMap(settings);
  if (disabled) delete disabled[key];
  return true;
}

// Disabling keeps the numeric value, so enabling again restores the user's tuning.
export function setFloatingOffsetEnabled(settings, uiThemeName, indicatorThemeId, enabled) {
  const key = pairingKey(uiThemeName, indicatorThemeId);
  if (!key || typeof enabled !== "boolean") return false;
  const map = offsetMap(settings);
  const remembered = map && Object.prototype.hasOwnProperty.call(map, key)
    ? parseOffset(map[key])
    : null;
  let disabled = disabledOffsetMap(settings);
  if (enabled) {
    if (remembered === null) {
      return setFloatingOffset(settings, uiThemeName, indicatorThemeId,
        normalizeFloatingOffset(settings.floatingBottomOffset));
    }
    if (disabled) delete disabled[key];
  } else {
    if (remembered === null) return false;
    if (!disabled) disabled = settings.disabledFloatingBottomOffsets = {};
    disabled[key] = true;
  }
  return true;
}

export function clearFloatingOffset(settings, uiThemeName, indicatorThemeId) {
  const key = pairingKey(uiThemeName, indicatorThemeId);
  if (!key) return false;
  let removed = false;
  for (const map of [offsetMap(settings), disabledOffsetMap(settings)]) {
    if (!map || !Object.prototype.hasOwnProperty.call(map, key)) continue;
    delete map[key];
    removed = true;
  }
  return removed;
}

export function removeFloatingOffsetsForTheme(settings, indicatorThemeId) {
  for (const map of [offsetMap(settings), disabledOffsetMap(settings)]) {
    if (!map) continue;
    for (const key of Object.keys(map)) {
      try {
        const pairing = JSON.parse(key);
        if (
          Array.isArray(pairing) && pairing.length === 2 &&
          pairing[1] === indicatorThemeId
        ) {
          delete map[key];
        }
      } catch {
        // Ignore unrelated or malformed imported settings.
      }
    }
  }
}
