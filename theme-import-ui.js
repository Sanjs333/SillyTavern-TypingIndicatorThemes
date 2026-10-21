import { Popup, POPUP_TYPE } from "../../../popup.js";
import { t } from "../../../i18n.js";
import { applyThemeImport, parseThemeImport, planThemeImport } from "./theme-import.js";
import { readThemeImportFiles } from "./theme-import-files.js";

const MAX_ENTRIES = 500;
let activeImport = null;

function kindLabel(entry) {
  if (entry.kind === "preset") return t`Text Preset`;
  if (entry.kind === "bubble") return t`BGM Bubble Style`;
  if (/^(播放器|Player)/.test(entry.item.name)) return t`Music Player Themes`;
  return entry.item.useIframe ? t`Indicator Theme (iframe)` : t`Indicator Theme (CSS)`;
}

export function showThemeImportPopup({ getSettings, onImported, fallbackKind = "theme" }) {
  if (activeImport) {
    activeImport.popup.dlg.focus();
    return activeImport.done;
  }

  const root = document.createElement("div");
  root.className = "ti-theme-import";
  root.innerHTML = `
    <header class="ti-theme-import-header">
      <i class="fa-solid fa-file-import" aria-hidden="true"></i>
      <h3 id="ti-theme-import-title">${t`Batch Import Themes`}</h3>
    </header>
    <div class="ti-theme-import-body">
    <p class="ti-theme-import-help">${t`Choose one ZIP package or a whole folder to load multiple themes at once. You can also select JSON files or collections.`}</p>
    <div class="ti-theme-import-dropzone" data-role="dropzone">
      <div class="ti-theme-import-pickers">
        <button type="button" class="menu_button" data-action="choose-zip" title="${t`Choose ZIP package`}" aria-label="${t`Choose ZIP package`}" autofocus><i class="fa-solid fa-file-zipper" aria-hidden="true"></i><span>${t`ZIP package`}</span></button>
        <button type="button" class="menu_button" data-action="choose-folder" title="${t`Choose folder`}" aria-label="${t`Choose folder`}"><i class="fa-solid fa-folder-open" aria-hidden="true"></i><span>${t`Folder`}</span></button>
        <button type="button" class="menu_button" data-action="choose" title="${t`Choose JSON files`}" aria-label="${t`Choose JSON files`}"><i class="fa-solid fa-file-code" aria-hidden="true"></i><span>${t`JSON files`}</span></button>
      </div>
      <span class="ti-theme-import-drop-hint"><i class="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i>${t`Drop JSON or ZIP files here.`}</span>
      <small data-role="folder-hint" hidden>${t`Folder selection is unavailable in this browser. Choose a ZIP package instead.`}</small>
      <input type="file" data-role="files" accept=".json,application/json" multiple hidden>
      <input type="file" data-role="zip" accept=".zip,application/zip,application/x-zip-compressed" multiple hidden>
      <input type="file" data-role="folder" webkitdirectory multiple hidden>
    </div>
    <details class="ti-theme-import-notes">
      <summary><i class="fa-solid fa-circle-info" aria-hidden="true"></i>${t`Import notes`}</summary>
      <p>${t`A folder includes its subfolders. ZIP packages are read without extracting them manually. You can also drop JSON or ZIP files here.`}</p>
      <p>${t`Up to 500 JSON files/items, 10 MiB per JSON and 50 MiB per batch before and after decompression. Only JSON files are imported; nested ZIPs and external assets are ignored.`}</p>
    </details>
    <p class="ti-theme-import-warning"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i><span>${t`Themes may contain JavaScript. Only import files from authors you trust. Existing selections are kept unless you choose to activate imported items.`}</span></p>
    <div class="ti-theme-import-options">
      <label class="ti-theme-import-conflict"><span>${t`When an ID or name already exists`}</span>
        <select class="text_pole" data-role="conflict">
          <option value="copy">${t`Keep both (create a copy)`}</option>
          <option value="skip">${t`Skip existing items`}</option>
          <option value="replace">${t`Replace existing items`}</option>
        </select>
      </label>
      <label class="ti-theme-import-switch">
        <span>${t`Activate the last imported item of each type`}</span>
        <span class="ti-theme-import-switch-control">
          <input type="checkbox" role="switch" data-role="activate">
          <span class="ti-theme-import-switch-track" aria-hidden="true"></span>
        </span>
      </label>
    </div>
    <p class="ti-theme-import-warning" data-role="replace-warning" hidden>${t`Replacing changes the existing item and its bindings. Export a backup first if you want to keep the original.`}</p>
    <div class="ti-theme-import-list-header">
      <strong>${t`Items to import`}</strong>
      <div class="ti-theme-import-toolbar" role="group" aria-label="${t`Items to import`}">
        <button type="button" class="menu_button ti-theme-import-icon" data-action="all" title="${t`Select All`}" aria-label="${t`Select All`}"><i class="fa-solid fa-list-check" aria-hidden="true"></i></button>
        <button type="button" class="menu_button ti-theme-import-icon" data-action="none" title="${t`Deselect All`}" aria-label="${t`Deselect All`}"><i class="fa-solid fa-square-minus" aria-hidden="true"></i></button>
        <button type="button" class="menu_button ti-theme-import-icon" data-action="clear" title="${t`Clear list`}" aria-label="${t`Clear list`}"><i class="fa-solid fa-trash-can" aria-hidden="true"></i></button>
      </div>
    </div>
    <p data-role="summary" role="status" aria-live="polite"></p>
    <div class="ti-theme-import-empty" data-role="empty"><i class="fa-solid fa-layer-group" aria-hidden="true"></i><span>${t`Choose files to preview the items to import.`}</span></div>
    <ul class="ti-theme-import-entries" data-role="entries" aria-label="${t`Items to import`}"></ul>
    <details class="ti-theme-import-errors" data-role="error-details" hidden>
      <summary>${t`Files or items that could not be imported`} <span data-role="error-count"></span></summary>
      <ul data-role="errors"></ul>
    </details>
    <p data-role="result" role="status" aria-live="polite" hidden></p>
    </div>
    <div class="ti-theme-import-footer">
      <button type="button" class="menu_button ti-theme-import-icon ti-theme-import-close" data-action="close" title="${t`Close`}" aria-label="${t`Close`}"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      <button type="button" class="menu_button ti-theme-import-primary" data-action="import" disabled><i class="fa-solid fa-file-import" aria-hidden="true"></i><span>${t`Import selected items`}</span></button>
    </div>`;

  const find = (role) => root.querySelector(`[data-role="${role}"]`);
  const button = (action) => root.querySelector(`[data-action="${action}"]`);
  const entries = [];
  const errors = [];
  const budget = { files: 0, bytes: 0, inputBytes: 0 };
  const readerController = new AbortController();
  const folderSupported = "webkitdirectory" in find("folder");
  find("folder-hint").hidden = folderSupported;
  let reading = false;
  let importing = false;
  let completed = false;
  let closed = false;
  let currentPlan = null;

  function errorMessage(error) {
    if (error.code === "INVALID_JSON") return t`Invalid JSON file.`;
    if (error.code === "AMBIGUOUS_CONFLICT") return t`The ID and name match different existing items. Use Keep both or Skip instead of Replace.`;
    if (error.code === "STALE_PLAN") return t`This item changed while importing. Review the list and import it again.`;
    if (error.code) return t`Invalid or unsupported item: ${error.message}`;
    return error.message;
  }

  function renderErrors() {
    const displayedErrors = completed ? errors : [...errors, ...(currentPlan?.errors || [])];
    find("errors").replaceChildren();
    const fragment = document.createDocumentFragment();
    for (const error of displayedErrors) {
      const row = document.createElement("li");
      row.textContent = `${error.source || t`Import`}: ${errorMessage(error)}`;
      row.title = error.message;
      fragment.appendChild(row);
    }
    find("errors").appendChild(fragment);
    find("error-details").hidden = displayedErrors.length === 0;
    find("error-count").textContent = `(${displayedErrors.length})`;
  }

  function refresh() {
    if (closed) return;
    const selected = entries.filter((entry) => entry.selected);
    if (!completed) try {
      currentPlan = planThemeImport(selected, getSettings(), { conflict: find("conflict").value });
      if (!reading && !completed) {
        const replacements = currentPlan.changes.filter((change) => change.action === "replace").length;
        const additions = currentPlan.changes.length - replacements;
        find("summary").textContent = t`${selected.length} selected / ${entries.length} valid items: ${additions} new, ${replacements} replacements, ${currentPlan.skipped} skipped.`;
      }
    } catch (error) {
      currentPlan = null;
      find("summary").textContent = t`Could not prepare import: ${error.message}`;
    }
    renderErrors();
    const busy = reading || importing;
    root.setAttribute("aria-busy", String(busy));
    find("empty").hidden = entries.length > 0;
    find("entries").hidden = entries.length === 0;
    find("summary").hidden = !reading && !completed && entries.length === 0 && errors.length === 0;
    popup.closeButton.setAttribute("aria-disabled", String(importing));
    for (const action of ["choose", "choose-zip", "clear"]) button(action).disabled = busy;
    button("choose-folder").disabled = busy || !folderSupported;
    for (const action of ["all", "none"]) button(action).disabled = busy || completed || !entries.length;
    for (const role of ["conflict", "activate"]) find(role).disabled = busy || completed;
    root.querySelectorAll('[data-role="entry-check"]').forEach((check) => { check.disabled = busy || completed; });
    button("import").disabled = busy || completed || !currentPlan?.changes.length;
    button("close").disabled = importing;
    find("replace-warning").hidden = find("conflict").value !== "replace";
  }

  function renderEntries() {
    const fragment = document.createDocumentFragment();
    for (const [index, entry] of entries.entries()) {
      const row = document.createElement("li");
      const label = document.createElement("label");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = entry.selected;
      check.dataset.role = "entry-check";
      check.dataset.index = String(index);
      const description = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = entry.item.name;
      const details = document.createElement("small");
      const kind = document.createElement("span");
      kind.className = "ti-theme-import-kind";
      kind.textContent = kindLabel(entry);
      const source = document.createElement("span");
      source.className = "ti-theme-import-source";
      source.textContent = entry.source;
      details.append(kind, source);
      description.append(title, details);
      label.append(check, description);
      row.appendChild(label);
      fragment.appendChild(row);
    }
    find("entries").replaceChildren(fragment);
  }

  function reset() {
    entries.length = 0;
    errors.length = 0;
    budget.files = budget.bytes = budget.inputBytes = 0;
    completed = false;
    find("result").hidden = true;
    for (const role of ["files", "zip", "folder"]) find(role).value = "";
    renderEntries();
    renderErrors();
    refresh();
  }

  async function addFiles(fileList) {
    if (closed || reading || importing) return;
    const files = Array.from(fileList || []);
    if (!files.length) return;
    if (completed) reset();
    reading = true;
    refresh();
    try {
      for await (const { text, source } of readThemeImportFiles(files, {
        budget,
        signal: readerController.signal,
        onError: (error) => { if (!closed) errors.push(error); },
        onProgress: (source) => { if (!closed) find("summary").textContent = t`Reading: ${source}`; },
      })) {
        if (closed) return;
        if (entries.length >= MAX_ENTRIES) {
          errors.push({ source, message: t`The 500-item limit was reached. Any remaining files were not read.` });
          break;
        }
        const parsed = parseThemeImport(text, { sourceName: source, fallbackKind });
        errors.push(...parsed.errors);
        const slots = Math.max(0, MAX_ENTRIES - entries.length);
        if (parsed.entries.length > slots) errors.push({ source, message: t`Only the first 500 valid items in a batch are kept.` });
        entries.push(...parsed.entries.slice(0, slots).map((entry) => ({ ...entry, selected: true })));
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    } catch (error) {
      if (!closed && error.name !== "AbortError") errors.push({ message: error.message || t`Could not read this file.` });
    } finally {
      reading = false;
      if (!closed) {
        for (const role of ["files", "zip", "folder"]) find(role).value = "";
        renderEntries();
        renderErrors();
        refresh();
      }
    }
  }

  for (const [action, role] of [["choose", "files"], ["choose-zip", "zip"], ["choose-folder", "folder"]]) {
    button(action).addEventListener("click", () => find(role).click());
    find(role).addEventListener("change", () => { void addFiles(find(role).files); });
  }
  button("clear").addEventListener("click", reset);
  for (const action of ["all", "none"]) {
    button(action).addEventListener("click", () => {
      entries.forEach((entry) => { entry.selected = action === "all"; });
      renderEntries();
      refresh();
    });
  }
  find("conflict").addEventListener("change", refresh);
  find("entries").addEventListener("change", (event) => {
    if (event.target.matches('[data-role="entry-check"]')) {
      const entry = entries[Number(event.target.dataset.index)];
      if (entry) entry.selected = event.target.checked;
      refresh();
    }
  });
  root.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (!reading && !importing) find("dropzone").classList.add("is-dragging");
  });
  root.addEventListener("dragleave", (event) => {
    if (!root.contains(event.relatedTarget)) find("dropzone").classList.remove("is-dragging");
  });
  root.addEventListener("drop", (event) => {
    event.preventDefault();
    find("dropzone").classList.remove("is-dragging");
    void addFiles(event.dataTransfer?.files);
  });

  const popup = new Popup(root, POPUP_TYPE.DISPLAY, "", {
    wide: true,
    allowVerticalScrolling: true,
    leftAlign: true,
    onClosing: () => !importing,
    onClose: () => {
      closed = true;
      readerController.abort();
      if (activeImport?.popup === popup) activeImport = null;
    },
    onOpen: () => button("choose-zip").focus(),
  });
  popup.dlg.classList.add("ti-theme-import-dialog");
  popup.dlg.setAttribute("aria-labelledby", "ti-theme-import-title");
  popup.closeButton.classList.replace("fa-circle-xmark", "fa-xmark");
  popup.closeButton.setAttribute("role", "button");
  popup.closeButton.setAttribute("aria-label", t`Close`);
  popup.closeButton.tabIndex = 0;
  popup.closeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      popup.closeButton.click();
    }
  });
  button("close").addEventListener("click", () => { void popup.complete(null); });
  button("import").addEventListener("click", async () => {
    if (closed || reading || importing || completed) return;
    refresh();
    if (!currentPlan?.changes.length) return;
    importing = true;
    refresh();
    try {
      const settings = getSettings();
      const result = applyThemeImport(currentPlan, settings);
      errors.push(...currentPlan.errors, ...(result.errors || []));
      completed = true;
      await onImported(result, { activate: find("activate").checked });
      if (closed) return;
      find("summary").textContent = t`Import finished. Choose more files to start another batch.`;
      find("result").textContent = t`${result.imported} imported, ${result.skipped} skipped, ${errors.length} file/item errors.`;
      find("result").hidden = false;
    } catch (error) {
      if (closed) return;
      find("result").textContent = completed
        ? t`Items were imported, but refreshing or saving failed: ${error.message}`
        : t`Import failed: ${error.message}`;
      find("result").hidden = false;
    } finally {
      importing = false;
      refresh();
    }
  });

  refresh();
  const done = popup.show();
  activeImport = { popup, done };
  return done;
}
