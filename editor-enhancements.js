/** Settings-only editor helpers. No SillyTavern, QuickBar or package imports. */
export const EDITOR_GROUPS = Object.freeze({
  preset: Object.freeze(["ti_preset_text", "ti_preset_readme"]),
  theme: Object.freeze([
    "ti_theme_css", "ti_theme_html", "ti_theme_iframe_css",
    "ti_theme_iframe_js", "ti_theme_iframe_sizes", "ti_theme_readme",
  ]),
  player: Object.freeze([
    "ti_player_theme_html", "ti_player_theme_iframe_css",
    "ti_player_theme_iframe_js", "ti_player_theme_iframe_sizes",
    "ti_player_theme_readme",
  ]),
  bubble: Object.freeze(["ti_bubble_html", "ti_bubble_css", "ti_bubble_readme"]),
});

const installations = new WeakMap();
let generation = 0; // Deliberately survives teardown/reinstall: A -> B -> A is never A again.

/** Release bridges and owned controls before the settings host removes a root. */
export function destroyEditorEnhancements(root) {
  installations.get(root)?.destroy();
}

/**
 * Add native .editor_maximize[data-for] buttons and an optional jQuery input bridge.
 * Installation is idempotent for a root. Call destroy() before replacing that root's HTML.
 * labels: { expand, presetText, groups: { preset, theme, player, bubble } }.
 * jquery may be null (plain DOM / no QuickBar); no click handler opens a custom editor.
 */
export function installEditorEnhancements(root, {
  jquery = root.ownerDocument.defaultView?.jQuery,
  labels = {},
} = {}) {
  if (installations.has(root)) return installations.get(root);
  const doc = root.ownerDocument;
  const records = new Map();
  const bindings = new Map();
  const bridging = new WeakSet();
  const cleanup = [];
  let destroyed = false;

  for (const [group, ids] of Object.entries(EDITOR_GROUPS)) {
    const fields = [];
    for (const id of ids) {
      const textarea = root.querySelector(`#${id}`);
      if (!textarea || textarea.tagName !== "TEXTAREA") continue;
      let label = root.querySelector(`label[for="${id}"]`);
      const createdLabel = !label;
      if (!label) {
        label = doc.createElement("label");
        label.htmlFor = id;
        label.textContent = labels.presetText || "Text Preset";
        textarea.before(label);
      }
      // JSON already has a heading containing its format button; keep that button/node.
      const reuseHeading = label.parentElement !== textarea.parentElement
        && label.parentElement.nextElementSibling === textarea;
      const heading = reuseHeading ? label.parentElement : doc.createElement("div");
      const hadHeadingClass = heading.classList.contains("ti-editor-heading");
      if (!reuseHeading) {
        label.before(heading);
        heading.append(label);
      }
      heading.classList.add("ti-editor-heading");

      const fieldTitle = label.textContent.trim().replace(/[:：]\s*$/, "");
      const expand = labels.expand || "Expand editor";
      const button = doc.createElement("button");
      button.type = "button";
      button.className = "editor_maximize fa-solid fa-maximize right_menu_button ti-editor-maximize";
      button.dataset.for = id;
      button.title = `${expand}: ${fieldTitle}`;
      button.setAttribute("aria-label", button.title);
      button.setAttribute("aria-controls", id);
      button.setAttribute("aria-haspopup", "dialog");
      heading.append(button);

      const record = {
        textarea, button, fieldTitle,
        disabled: textarea.disabled,
        readOnly: textarea.readOnly,
        key: textarea.getAttribute("data-quickbar-editor-key"),
        title: textarea.getAttribute("data-quickbar-editor-title"),
      };
      fields.push(record);

      // No custom popup: let SillyTavern's delegated handler (or QuickBar) handle clicks.
      const guardClick = (event) => {
        refresh(group);
        if (button.disabled) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      };
      button.addEventListener("click", guardClick);

      // jQuery.trigger('input') doesn't invoke addEventListener handlers. Native input
      // already does, so never forward originalEvent. A per-field guard also covers
      // a native listener that synchronously re-triggers jQuery input during forwarding.
      const bridge = (event) => {
        if (event.originalEvent || bridging.has(textarea) || textarea.disabled
            || textarea.readOnly || destroyed) return;
        bridging.add(textarea);
        try {
          textarea.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
        } finally {
          bridging.delete(textarea);
        }
      };
      if (typeof jquery === "function") jquery(textarea).on("input.tiEditorEnhancements", bridge);
      cleanup.push(() => {
        if (typeof jquery === "function") jquery(textarea).off("input.tiEditorEnhancements", bridge);
        button.removeEventListener("click", guardClick);
        button.remove();
        if (!reuseHeading) heading.replaceWith(label);
        else if (!hadHeadingClass) heading.classList.remove("ti-editor-heading");
        if (createdLabel) label.remove();
        textarea.disabled = record.disabled;
        textarea.readOnly = record.readOnly;
        for (const [attr, value] of [
          ["data-quickbar-editor-key", record.key],
          ["data-quickbar-editor-title", record.title],
        ]) {
          if (value === null) textarea.removeAttribute(attr);
          else textarea.setAttribute(attr, value);
        }
      });
    }
    records.set(group, fields);
  }

  function refresh(group) {
    if (destroyed) return;
    const groups = group ? [group] : Object.keys(EDITOR_GROUPS);
    for (const name of groups) {
      const state = bindings.get(name);
      for (const { textarea, button, bindingKey } of records.get(name) || []) {
        button.disabled = !state?.token.id || state.pending || textarea.disabled || textarea.readOnly;
        button.setAttribute("aria-disabled", String(button.disabled));
        // An explicitly empty key means unavailable, not "use character context".
        textarea.dataset.quickbarEditorKey = button.disabled ? "" : bindingKey;
      }
    }
  }

  /**
   * Explicitly invalidate a group's old windows BEFORE replacing any .value.
   * Always increments the generation, even for the same ID (reload/import/mode switch).
   * Returns an opaque ticket. pending:true disables the sources until complete(ticket).
   * A missing/empty object ID represents no selection and keeps all fields disabled.
   */
  function begin(group, item, { mode = "", pending = false, readOnly = false } = {}) {
    if (destroyed) throw new Error("Editor enhancements have been destroyed");
    if (!records.has(group)) throw new Error(`Unknown editor group: ${group}`);
    const id = item?.id == null ? "" : String(item.id);
    const token = Object.freeze({ group, id, mode, generation: ++generation });
    const state = { token, pending, readOnly };
    bindings.set(group, state);
    for (const record of records.get(group)) {
      const { textarea, fieldTitle } = record;
      // Use actual attributes, not jQuery's cached .data(). Each source has its own key.
      record.bindingKey = JSON.stringify([
        "typing-indicator", group, id, token.generation, mode, textarea.id,
      ]);
      textarea.dataset.quickbarEditorTitle = [
        labels.groups?.[group], item?.name, fieldTitle,
      ].filter(Boolean).join(" — ");
      setAvailability(record, state);
    }
    refresh(group);
    return token;
  }

  function setAvailability(record, state) {
    const { textarea } = record;
    const { id, mode, group } = state.token;
    const inactiveMode = group === "theme" && (mode === "iframe"
      ? textarea.id === "ti_theme_css"
      : mode === "css" && textarea.id !== "ti_theme_css" && textarea.id !== "ti_theme_readme");
    textarea.disabled = record.disabled || !id || state.pending || inactiveMode;
    textarea.readOnly = record.readOnly || state.readOnly;
  }

  function isCurrent(token) {
    return !destroyed && !!token && bindings.get(token.group)?.token === token;
  }

  /** Unlock a completed load, but never a stale animation-frame callback. */
  function complete(token) {
    if (!isCurrent(token)) return false;
    const state = bindings.get(token.group);
    state.pending = false;
    for (const record of records.get(token.group)) setAvailability(record, state);
    refresh(token.group);
    return true;
  }

  const api = Object.freeze({
    begin, complete, isCurrent, refresh,
    current: (group) => bindings.get(group)?.token,
    isReady: (group) => {
      const state = bindings.get(group);
      return !destroyed && !!state?.token.id && !state.pending && !state.readOnly;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      bindings.clear();
      cleanup.forEach((fn) => fn());
      installations.delete(root);
    },
  });
  installations.set(root, api);
  for (const group of Object.keys(EDITOR_GROUPS)) begin(group, null);
  return api;
}
