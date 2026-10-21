import { t } from "../../../i18n.js";

export const THEME_IMPORT_LIMITS = Object.freeze({
  files: 500,
  fileBytes: 10 * 1024 * 1024,
  batchBytes: 50 * 1024 * 1024,
  zipEntries: 5000,
});

let zipLibraryPromise;

async function loadZipLibrary() {
  if (typeof globalThis.JSZip === "function") return globalThis.JSZip;
  zipLibraryPromise ||= import("../../../../lib/jszip.min.js").then(() => {
    if (typeof globalThis.JSZip !== "function") throw new Error(t`ZIP reader could not be loaded. Refresh the page and try again.`);
    return globalThis.JSZip;
  }).catch((error) => {
    zipLibraryPromise = null;
    throw error;
  });
  return zipLibraryPromise;
}

function checkAborted(signal) {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
}

function readBlob(file, signal, binary = false) {
  checkAborted(signal);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const abort = () => reader.abort();
    const finish = (callback, value) => {
      signal?.removeEventListener("abort", abort);
      callback(value);
    };
    reader.onload = () => finish(resolve, reader.result);
    reader.onerror = () => finish(reject, reader.error || new Error(t`Could not read this file.`));
    reader.onabort = () => finish(reject, new DOMException("Aborted", "AbortError"));
    signal?.addEventListener("abort", abort, { once: true });
    try {
      if (binary) reader.readAsArrayBuffer(file);
      else reader.readAsText(file);
    } catch (error) {
      finish(reject, error);
    }
  });
}

function checkZipIndex(buffer) {
  const view = new DataView(buffer);
  for (let offset = view.byteLength - 22; offset >= Math.max(0, view.byteLength - 65557); offset--) {
    if (view.getUint32(offset, true) !== 0x06054b50) continue;
    if (offset + 22 + view.getUint16(offset + 20, true) !== view.byteLength) continue;
    const count = view.getUint16(offset + 10, true);
    if (view.getUint16(offset + 4, true) || view.getUint16(offset + 6, true)
      || view.getUint16(offset + 8, true) !== count || count === 0xffff
      || view.getUint32(offset + 12, true) === 0xffffffff
      || view.getUint32(offset + 16, true) === 0xffffffff) {
      throw new Error(t`Use a standard, unencrypted, single-volume ZIP archive (not ZIP64).`);
    }
    if (count > THEME_IMPORT_LIMITS.zipEntries) throw new Error(t`ZIP contains too many entries. Split it into smaller archives.`);
    const start = view.getUint32(offset + 16, true);
    const size = view.getUint32(offset + 12, true);
    if (start + size > offset) throw new Error(t`Invalid or damaged ZIP archive.`);
    let cursor = start;
    for (let index = 0; index < count; index++) {
      if (cursor + 46 > start + size || view.getUint32(cursor, true) !== 0x02014b50) throw new Error(t`Invalid or damaged ZIP archive.`);
      if ((view.getUint16(cursor + 8, true) & 1) || view.getUint32(cursor + 20, true) === 0xffffffff
        || view.getUint32(cursor + 24, true) === 0xffffffff || view.getUint16(cursor + 34, true)) {
        throw new Error(t`Use a standard, unencrypted, single-volume ZIP archive (not ZIP64).`);
      }
      cursor += 46 + view.getUint16(cursor + 28, true) + view.getUint16(cursor + 30, true) + view.getUint16(cursor + 32, true);
    }
    if (cursor !== start + size) throw new Error(t`Invalid or damaged ZIP archive.`);
    return;
  }
  throw new Error(t`Invalid or damaged ZIP archive.`);
}

function readZipText(entry, limit, signal) {
  checkAborted(signal);
  return new Promise((resolve, reject) => {
    const stream = entry.internalStream("uint8array");
    const chunks = [];
    let bytes = 0;
    let settled = false;
    const abort = () => finish(new DOMException("Aborted", "AbortError"));
    const finish = (error) => {
      if (settled) return;
      settled = true;
      stream.pause();
      signal?.removeEventListener("abort", abort);
      if (error) {
        chunks.length = 0;
        error.importBytes = Math.min(bytes, limit);
        reject(error);
        return;
      }
      try {
        const data = new Uint8Array(bytes);
        let offset = 0;
        for (const chunk of chunks) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        chunks.length = 0;
        resolve({ text: new TextDecoder().decode(data), bytes });
      } catch (failure) {
        reject(failure);
      }
    };
    signal?.addEventListener("abort", abort, { once: true });
    stream.on("data", (chunk) => {
      if (settled) return;
      bytes += chunk.length;
      if (bytes > limit) {
        finish(new Error(t`ZIP item exceeds the file or remaining batch size limit.`));
        return;
      }
      chunks.push(chunk);
    });
    stream.on("error", finish);
    stream.on("end", () => finish());
    stream.resume();
  });
}

function isJson(name) {
  const parts = name.replace(/\\/g, "/").split("/");
  return /\.json$/i.test(name) && !parts.includes("__MACOSX") && !parts.at(-1).startsWith("._");
}

export async function* readThemeImportFiles(fileList, {
  budget = { files: 0, bytes: 0, inputBytes: 0 },
  signal,
  onError = () => {},
  onProgress = () => {},
} = {}) {
  const limits = THEME_IMPORT_LIMITS;
  const files = Array.from(fileList || []);
  let found = false;
  const report = (source, error) => onError({ source, message: error.message || String(error) });
  const full = () => budget.files >= limits.files || budget.bytes >= limits.batchBytes;
  for (const file of files) {
    checkAborted(signal);
    const source = file.webkitRelativePath || file.name;
    const zipFile = /\.zip$/i.test(file.name);
    if (!zipFile && !isJson(source)) continue;
    found = true;
    if (full()) {
      report(source, new Error(t`Batch limit reached. Import this batch, then select the remaining files.`));
      break;
    }
    onProgress(source);
    try {
      if (file.size > (zipFile ? limits.batchBytes : limits.fileBytes)) {
        throw new Error(zipFile ? t`ZIP exceeds the 50 MiB limit.` : t`File exceeds the 10 MiB limit.`);
      }
      if (budget.inputBytes + file.size > limits.batchBytes) throw new Error(t`Selected files exceed 50 MiB. Start a new batch.`);
      budget.inputBytes += file.size;
      if (!zipFile) {
        budget.files++;
        if (budget.bytes + file.size > limits.batchBytes) throw new Error(t`Batch exceeds the 50 MiB limit. Start a new batch.`);
        budget.bytes += file.size;
        const text = await readBlob(file, signal);
        checkAborted(signal);
        yield { source, text };
        continue;
      }
      const buffer = await readBlob(file, signal, true);
      checkAborted(signal);
      checkZipIndex(buffer);
      const Zip = await loadZipLibrary();
      checkAborted(signal);
      const zip = await new Zip().loadAsync(buffer);
      checkAborted(signal);
      const allItems = Object.values(zip.files);
      if (allItems.length > limits.zipEntries) throw new Error(t`ZIP contains too many entries. Split it into smaller archives.`);
      const items = allItems.filter((entry) => !entry.dir && isJson(entry.name));
      if (!items.length) throw new Error(t`No JSON theme files were found in this ZIP archive.`);
      for (const item of items) {
        checkAborted(signal);
        const itemSource = `${source} / ${item.name}`;
        if (full()) {
          report(itemSource, new Error(t`Batch limit reached. Import this batch, then select the remaining files.`));
          break;
        }
        budget.files++;
        onProgress(itemSource);
        const available = Math.min(limits.fileBytes, limits.batchBytes - budget.bytes);
        try {
          const { text, bytes } = await readZipText(item, available, signal);
          checkAborted(signal);
          budget.bytes += bytes;
          yield { source: itemSource, text };
        } catch (error) {
          checkAborted(signal);
          budget.bytes += error.importBytes || 0;
          report(itemSource, error);
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    } catch (error) {
      checkAborted(signal);
      report(source, error);
    }
  }
  if (!found && files.length) report("", new Error(t`No JSON or ZIP files were found. Choose a theme folder or ZIP package.`));
}
