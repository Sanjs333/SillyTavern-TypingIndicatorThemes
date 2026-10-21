const MAX_BYTES = 10 * 1024 * 1024;
const MAX_ITEMS = 500;
const MAX_DEPTH = 20;
const LISTS = new Map([
  ["theme", "themes"],
  ["preset", "textPresets"],
  ["bubble", "bubbleStyles"],
]);
const COLLECTIONS = new Map([
  ["themes", "theme"],
  ["textPresets", "preset"],
  ["presets", "preset"],
  ["bubbleStyles", "bubble"],
  ["items", null],
]);
const METADATA_TYPES = new Map([
  ["theme", "theme"],
  ["player-theme", "theme"],
  ["preset", "preset"],
  ["bubble-style", "bubble"],
]);
const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);
const STRING_FIELDS = ["id", "name", "readme", "text", "html", "css", "iframeCSS", "iframeJS"];
const SIZE_FIELDS = ["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"];
const own = (value, key) => Object.hasOwn(value, key);
const record = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const safeId = (id) => typeof id === "string" && id.trim() !== "" && !UNSAFE_KEYS.has(id.trim());
const nameKey = (name) => typeof name === "string" ? name.trim() : null;

function fail(code, message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}

function errorRecord(source, error, path = "") {
  return {
    source,
    message: path ? `${error.message} (${path})` : error.message,
    code: error.code || "INVALID_ITEM",
  };
}

function checkDepth(value, depth = 0) {
  if (value === null || typeof value !== "object") return;
  if (depth > MAX_DEPTH) fail("MAX_DEPTH", "Import nesting exceeds 20 levels.");
  for (const key of Object.keys(value)) checkDepth(value[key], depth + 1);
}

function metadataType(raw) {
  if (!own(raw, "_metadata")) return null;
  if (!record(raw._metadata)) fail("INVALID_METADATA", "Metadata must be an object.");
  if (!own(raw._metadata, "type")) return null; 
  const type = raw._metadata.type;
  if (!METADATA_TYPES.has(type)) fail("UNSUPPORTED_TYPE", "Unsupported metadata type.");
  return type;
}

function inferKind(raw, fallbackKind) {
  const type = metadataType(raw);
  if (type) return METADATA_TYPES.get(type);
  if (own(raw, "useIframe")) return "theme";
  if (own(raw, "text")) return "preset";
  if (own(raw, "html")) return "bubble";
  if (own(raw, "css")) return "theme";
  return fallbackKind;
}

function copySizes(sizes) {
  if (!record(sizes)) fail("INVALID_SIZES", "Sizes must be an object.");
  const result = {};
  for (const position of Object.keys(sizes)) {
    if (UNSAFE_KEYS.has(position)) fail("UNSAFE_KEY", "Unsafe key in sizes.");
    const dimensions = sizes[position];
    if (!record(dimensions)) fail("INVALID_SIZES", "Each sizes position must be an object.");
    const clean = {};
    for (const field of SIZE_FIELDS) {
      if (!own(dimensions, field)) continue;
      if (typeof dimensions[field] !== "string" || !dimensions[field].trim()) {
        fail("INVALID_SIZES", "Size dimensions must be non-empty strings.");
      }
      clean[field] = dimensions[field];
    }
    result[position] = clean;
  }
  return result;
}

function normalizeItem(raw, kind, depth = 0) {
  if (!record(raw)) fail("INVALID_ITEM", "Each import item must be an object.");
  checkDepth(raw, depth);
  if (!LISTS.has(kind)) fail("UNSUPPORTED_KIND", "Unsupported import kind.");
  const type = metadataType(raw);
  if (type && METADATA_TYPES.get(type) !== kind) {
    fail("TYPE_MISMATCH", "Item kind conflicts with metadata type.");
  }
  for (const field of STRING_FIELDS) {
    if (own(raw, field) && typeof raw[field] !== "string") {
      fail(`INVALID_${field.toUpperCase()}`, `${field} must be a string.`);
    }
  }
  if (typeof raw.name !== "string" || !raw.name.trim()) {
    fail("INVALID_NAME", "Name must be a non-empty string.");
  }
  if (own(raw, "id") && !safeId(raw.id)) fail("UNSAFE_ID", "ID must be a safe non-empty string.");
  if (own(raw, "useIframe") && typeof raw.useIframe !== "boolean") {
    fail("INVALID_USE_IFRAME", "useIframe must be a boolean.");
  }
  if (kind !== "theme" && raw.useIframe === true) {
    fail("TYPE_MISMATCH", "Only themes may use iframe mode.");
  }
  if (type === "player-theme" && raw.useIframe !== true) {
    fail("PLAYER_REQUIRES_IFRAME", "Player themes must use iframe mode.");
  }

  const item = { name: raw.name };
  if (own(raw, "id")) item.id = raw.id;
  if (own(raw, "readme")) item.readme = raw.readme;
  if (kind === "preset") {
    if (typeof raw.text !== "string" || !raw.text.trim()) {
      fail("INVALID_TEXT", "Preset text must be a non-empty string.");
    }
    item.text = raw.text;
  } else if (kind === "bubble") {
    if (typeof raw.html !== "string" || !raw.html.trim()) {
      fail("INVALID_HTML", "Bubble HTML must be a non-empty string.");
    }
    item.html = raw.html;
    item.css = raw.css ?? "";
  } else {
    item.useIframe = raw.useIframe ?? false;
    const required = item.useIframe ? "html" : "css";
    if (typeof raw[required] !== "string" || !raw[required].trim()) {
      fail(`INVALID_${required.toUpperCase()}`, `Theme ${required} must be a non-empty string.`);
    }
    for (const field of ["html", "css", "iframeCSS", "iframeJS"]) {
      if (own(raw, field)) item[field] = raw[field];
    }
    if (item.useIframe) {
      item.iframeCSS ??= "";
      item.iframeJS ??= "";
    }
    if (own(raw, "sizes")) item.sizes = copySizes(raw.sizes);
    if (type === "player-theme" && !item.name.startsWith("Player") && !item.name.startsWith("播放器")) {
      item.name = `Player - ${item.name}`;
    }
  }
  return item;
}

export function parseThemeImport(text, { sourceName = "", fallbackKind = "theme" } = {}) {
  const result = { entries: [], errors: [] };
  const report = (code, message, path = "") => result.errors.push(errorRecord(sourceName, { code, message }, path));
  if (typeof text !== "string") {
    report("INVALID_TEXT", "Import text must be a string.");
    return result;
  }
  if (text.length > MAX_BYTES || new TextEncoder().encode(text).byteLength > MAX_BYTES) {
    report("FILE_TOO_LARGE", "Import text exceeds 10 MiB.");
    return result;
  }
  if (!LISTS.has(fallbackKind)) {
    report("UNSUPPORTED_KIND", "Unsupported fallback kind.");
    return result;
  }
  let document;
  try {
    document = JSON.parse(text.replace(/^\uFEFF/, ""));
  } catch {
    report("INVALID_JSON", "Invalid JSON.");
    return result;
  }

  let candidates = 0;
  let visited = 0;
  let stopped = false;
  function visit(value, fallback, path, depth) {
    if (stopped) return;
    if (++visited > MAX_ITEMS * (MAX_DEPTH + 1)) {
      report("MAX_ITEMS", "Import contains too many containers.", path);
      stopped = true;
      return;
    }
    if (depth > MAX_DEPTH) {
      report("MAX_DEPTH", "Import nesting exceeds 20 levels.", path);
      return;
    }
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length && !stopped; index++) {
        visit(value[index], fallback, `${path}[${index}]`, depth + 1);
      }
      return;
    }
    if (record(value) && !own(value, "name") && !own(value, "item")) {
      const collections = [...COLLECTIONS].filter(([key]) => own(value, key));
      if (collections.length) {
        for (const [key, kind] of collections) {
          if (stopped) break;
          if (!Array.isArray(value[key])) {
            report("INVALID_COLLECTION", "Import collections must be arrays.", `${path}.${key}`);
          } else {
            visit(value[key], kind || fallback, `${path}.${key}`, depth + 1);
          }
        }
        return;
      }
    }
    if (++candidates > MAX_ITEMS) {
      report("MAX_ITEMS", "Import exceeds 500 items.", path);
      stopped = true;
      return;
    }
    try {
      if (!record(value)) fail("INVALID_ITEM", "Each import item must be an object.");
      const wrapped = own(value, "item") && own(value, "kind");
      const raw = wrapped ? value.item : value;
      if (!record(raw)) fail("INVALID_ITEM", "Each import item must be an object.");
      const kind = wrapped ? value.kind : inferKind(raw, fallback);
      result.entries.push({ kind, item: normalizeItem(raw, kind, depth + (wrapped ? 1 : 0)), source: sourceName });
    } catch (error) {
      result.errors.push(errorRecord(sourceName, error, path));
    }
  }
  visit(document, fallbackKind, "$", 0);
  return result;
}

function conflictsFor(list, item) {
  return list.filter((existing) => record(existing) && (
    (own(item, "id") && existing.id === item.id) || nameKey(existing.name) === nameKey(item.name)
  ));
}

function uniqueName(name, list) {
  const names = new Set(list.filter(record).map((item) => nameKey(item.name)));
  let candidate = name;
  for (let number = 2; names.has(nameKey(candidate)); number++) candidate = `${name} (${number})`;
  return candidate;
}

function checkReplacementKind(kind, item, existing) {
  if (kind === "theme" && /^(播放器|Player)/.test(item.name) !== /^(播放器|Player)/.test(existing.name)) {
    fail("TYPE_MISMATCH", "Cannot replace an indicator theme with a player theme or vice versa. Keep both instead.");
  }
}

function preserveBuiltIn(item, existing) {
  if (own(existing, "isBuiltIn") && typeof existing.isBuiltIn === "boolean") {
    item.isBuiltIn = existing.isBuiltIn;
  }
}

export function planThemeImport(entries, settings, { conflict = "copy" } = {}) {
  const plan = { changes: [], skipped: 0, errors: [] };
  if (!Array.isArray(entries)) {
    plan.errors.push(errorRecord("", { code: "INVALID_ENTRIES", message: "Import entries must be an array." }));
    return plan;
  }
  if (!["copy", "skip", "replace"].includes(conflict) || !record(settings)) {
    const code = record(settings) ? "INVALID_CONFLICT" : "INVALID_SETTINGS";
    const message = record(settings) ? "Conflict policy must be copy, skip or replace." : "Settings must be an object.";
    plan.errors.push(errorRecord("", { code, message }));
    plan.skipped = entries.length;
    return plan;
  }
  const working = new Map();
  const reserved = new Map();
  const counters = new Map();
  for (const [kind, key] of LISTS) {
    const list = settings[key];
    working.set(kind, list === undefined ? [] : Array.isArray(list) ? list.slice() : null);
    reserved.set(kind, new Set((Array.isArray(list) ? list : []).filter(record).map((item) => item.id)));
    counters.set(kind, 0);
  }
  for (const entry of entries.slice(0, MAX_ITEMS)) {
    if (record(entry) && reserved.has(entry.kind) && record(entry.item) && safeId(entry.item.id)) {
      reserved.get(entry.kind).add(entry.item.id);
    }
  }
  function newId(kind) {
    let id;
    do {
      counters.set(kind, counters.get(kind) + 1);
      id = `${kind}_import_${counters.get(kind)}`;
    } while (reserved.get(kind).has(id));
    reserved.get(kind).add(id);
    return id;
  }

  for (let index = 0; index < Math.min(entries.length, MAX_ITEMS); index++) {
    const entry = entries[index];
    const source = record(entry) && typeof entry.source === "string" ? entry.source : "";
    try {
      if (!record(entry)) fail("INVALID_ENTRY", "Import entry must be an object.");
      const { kind } = entry;
      const item = normalizeItem(entry.item, kind);
      const list = working.get(kind);
      if (!list) fail("INVALID_SETTINGS", "The destination settings list must be an array.");
      const matches = conflictsFor(list, item);
      if (matches.length && conflict === "skip") {
        plan.skipped++;
        continue;
      }
      if (matches.length && conflict === "replace") {
        if (matches.length !== 1) fail("AMBIGUOUS_CONFLICT", "ID and name match multiple existing items.");
        const existing = matches[0];
        checkReplacementKind(kind, item, existing);
        if (!safeId(existing.id)) fail("UNSAFE_ID", "The existing item has no safe ID to replace.");
        item.id = existing.id;
        preserveBuiltIn(item, existing);
        plan.changes.push({ kind, item, action: "replace", existingId: existing.id, source });
        list[list.indexOf(existing)] = item;
      } else {
        if (matches.length || !own(item, "id")) item.id = newId(kind);
        item.name = uniqueName(item.name, list);
        reserved.get(kind).add(item.id);
        plan.changes.push({ kind, item, action: "add", source });
        list.push(item);
      }
    } catch (error) {
      plan.skipped++;
      plan.errors.push(errorRecord(source, error, `$[${index}]`));
    }
  }
  if (entries.length > MAX_ITEMS) {
    plan.skipped += entries.length - MAX_ITEMS;
    plan.errors.push(errorRecord("", { code: "MAX_ITEMS", message: "Import exceeds 500 items." }));
  }
  return plan;
}

export function applyThemeImport(plan, settings) {
  const result = {
    imported: 0,
    skipped: Number.isSafeInteger(plan?.skipped) && plan.skipped >= 0 ? plan.skipped : 0,
    items: [],
    errors: [],
  };
  if (!record(plan) || !Array.isArray(plan.changes)) {
    result.errors.push(errorRecord("", { code: "INVALID_PLAN", message: "Import plan changes must be an array." }));
    return result;
  }
  const changes = plan.changes;
  if (!record(settings)) {
    result.skipped += changes.length;
    result.errors.push(errorRecord("", { code: "INVALID_SETTINGS", message: "Settings must be an object." }));
    return result;
  }
  for (let index = 0; index < Math.min(changes.length, MAX_ITEMS); index++) {
    const change = changes[index];
    const source = record(change) && typeof change.source === "string" ? change.source : "";
    try {
      if (!record(change) || !LISTS.has(change.kind) || !["add", "replace"].includes(change.action)) {
        fail("INVALID_CHANGE", "Invalid import change.");
      }
      const { kind, action } = change;
      const item = normalizeItem(change.item, kind);
      if (!safeId(item.id)) fail("UNSAFE_ID", "Imported item has no safe ID.");
      const key = LISTS.get(kind);
      const list = settings[key] === undefined ? [] : settings[key];
      if (!Array.isArray(list)) fail("INVALID_SETTINGS", "The destination settings list must be an array.");
      const matches = conflictsFor(list, item);
      if (action === "replace") {
        if (!safeId(change.existingId) || item.id !== change.existingId || matches.length !== 1 || matches[0].id !== change.existingId) {
          fail("STALE_PLAN", "Replacement target or conflicts have changed.");
        }
        checkReplacementKind(kind, item, matches[0]);
        preserveBuiltIn(item, matches[0]);
        list[list.indexOf(matches[0])] = item;
      } else {
        if (matches.length) fail("STALE_PLAN", "The imported item now conflicts with settings.");
        list.push(item);
        if (settings[key] === undefined) settings[key] = list;
      }
      result.items.push({ kind, item, action });
      result.imported++;
    } catch (error) {
      result.skipped++;
      result.errors.push(errorRecord(source, error, `$[${index}]`));
    }
  }
  if (changes.length > MAX_ITEMS) {
    result.skipped += changes.length - MAX_ITEMS;
    const source = typeof changes[MAX_ITEMS]?.source === "string" ? changes[MAX_ITEMS].source : "";
    result.errors.push(errorRecord(source, { code: "MAX_ITEMS", message: "Import exceeds 500 items." }));
  }
  return result;
}
