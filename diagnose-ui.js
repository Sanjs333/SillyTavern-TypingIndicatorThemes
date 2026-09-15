import { getRequestHeaders } from "../../../../script.js";
import { t } from "../../../i18n.js";

const GROUPS = [
    { key: "search", label: () => t`Search APIs`, icon: "fa-magnifying-glass" },
    { key: "song", label: () => t`Audio URL APIs`, icon: "fa-music" },
    { key: "lyric", label: () => t`Lyrics APIs`, icon: "fa-align-left" },
    { key: "playlist", label: () => t`Playlist Import APIs`, icon: "fa-list-ul" },
    { key: "proxy", label: () => t`Proxy Channels`, icon: "fa-shuffle" },
];

const STATUS_META = {
    ok: { cls: "ok", icon: "fa-circle-check", label: () => t`Normal` },
    degraded: { cls: "degraded", icon: "fa-triangle-exclamation", label: () => t`Degraded` },
    fail: { cls: "fail", icon: "fa-circle-xmark", label: () => t`Failed` },
    skipped: { cls: "skipped", icon: "fa-circle-minus", label: () => t`Skipped` },
};

let _dialog = null;
let _running = false;
let _abort = null;
let _apicxToken = "";
const _results = new Map();

function esc(str) {
    const d = document.createElement("div");
    d.textContent = str == null ? "" : String(str);
    return d.innerHTML;
}

async function requestGroup(group, params, signal) {
    const resp = await fetch("/api/plugins/g-player-proxy/diagnose", {
        method: "POST",
        headers: getRequestHeaders(),
        body: JSON.stringify({ group, ...params }),
        signal,
    });
    if (resp.status === 404) {
        throw new Error(
            t`Diagnose endpoint not found. The server plugin may be outdated or not restarted yet.`,
        );
    }
    if (!resp.ok) {
        let msg = t`Diagnose request failed`;
        try {
            const err = await resp.json();
            msg = err.error || msg;
        } catch (e) {}
        throw new Error(msg);
    }
    return await resp.json();
}

function renderGroupBody(group) {
    const data = _results.get(group.key);
    if (!data) {
        return `<div class="ti-diag-pending">${t`Waiting...`}</div>`;
    }
    if (data.error) {
        return `<div class="ti-diag-error"><i class="fa-solid fa-circle-exclamation"></i> ${esc(data.error)}</div>`;
    }
    if (data.loading) {
        return `<div class="ti-diag-pending"><span class="ti-diag-spinner"></span>${t`Testing...`}</div>`;
    }
    const items = data.items || [];
    if (items.length === 0) {
        return `<div class="ti-diag-pending">${t`No items in this group`}</div>`;
    }
    return items
        .map((it) => {
            const meta = STATUS_META[it.status] || STATUS_META.fail;
            const timeText = it.ms > 0 ? `${it.ms} ms` : "-";
            const extra = it.sample || it.detail || "";
            return `
            <div class="ti-diag-item ${meta.cls}">
                <i class="fa-solid ${meta.icon} ti-diag-item-icon"></i>
                <div class="ti-diag-item-main">
                    <div class="ti-diag-item-title">${esc(it.label)}</div>
                    ${extra ? `<div class="ti-diag-item-detail">${esc(extra)}</div>` : ""}
                </div>
                <div class="ti-diag-item-time">${timeText}</div>
            </div>`;
        })
        .join("");
}

function computeSummary() {
    const sum = { ok: 0, degraded: 0, fail: 0, skipped: 0 };
    _results.forEach((data) => {
        (data.items || []).forEach((it) => {
            if (sum[it.status] !== undefined) sum[it.status]++;
        });
    });
    return sum;
}

function renderAll() {
    if (!_dialog) return;
    GROUPS.forEach((g) => {
        const bodyEl = _dialog.querySelector(`[data-group-body="${g.key}"]`);
        if (bodyEl) bodyEl.innerHTML = renderGroupBody(g);
        const badgeEl = _dialog.querySelector(`[data-group-badge="${g.key}"]`);
        if (badgeEl) {
            const data = _results.get(g.key);
            if (!data || data.loading) {
                badgeEl.textContent = "";
            } else if (data.error) {
                badgeEl.textContent = "!";
                badgeEl.className = "ti-diag-group-badge fail";
            } else {
                const items = data.items || [];
                const bad = items.filter(
                    (x) => x.status === "fail" || x.status === "degraded",
                ).length;
                badgeEl.textContent = `${items.length - bad}/${items.length}`;
                badgeEl.className =
                    "ti-diag-group-badge " + (bad === 0 ? "ok" : "degraded");
            }
        }
    });

    const sum = computeSummary();
    const sumEl = _dialog.querySelector(".ti-diag-summary");
    if (sumEl) {
        sumEl.innerHTML = `
            <span class="ti-diag-chip ok">${STATUS_META.ok.label()} ${sum.ok}</span>
            <span class="ti-diag-chip degraded">${STATUS_META.degraded.label()} ${sum.degraded}</span>
            <span class="ti-diag-chip fail">${STATUS_META.fail.label()} ${sum.fail}</span>
            <span class="ti-diag-chip skipped">${STATUS_META.skipped.label()} ${sum.skipped}</span>
        `;
    }

    const runBtn = _dialog.querySelector(".ti-diag-run");
    if (runBtn) {
        runBtn.disabled = false;
        runBtn.innerHTML = _running
            ? `<i class="fa-solid fa-stop"></i><span>${t`Stop`}</span>`
            : `<i class="fa-solid fa-play"></i><span>${t`Start Test`}</span>`;
    }
    const copyBtn = _dialog.querySelector(".ti-diag-copy");
    if (copyBtn) copyBtn.disabled = _running || _results.size === 0;
}

function buildReport() {
    const lines = ["# G-Player 音源诊断报告", ""];
    lines.push(`生成时间: ${new Date().toLocaleString()}`);
    const sum = computeSummary();
    lines.push(
        `汇总: 正常 ${sum.ok} / 降级 ${sum.degraded} / 失败 ${sum.fail} / 跳过 ${sum.skipped}`,
    );
    GROUPS.forEach((g) => {
        const data = _results.get(g.key);
        if (!data) return;
        lines.push("", `## ${g.label()}`);
        if (data.error) {
            lines.push(`- [ERROR] ${data.error}`);
            return;
        }
        (data.items || []).forEach((it) => {
            const tag = String(it.status).toUpperCase();
            const extra = it.sample || it.detail || "";
            lines.push(
                `- [${tag}] ${it.label} (${it.ms} ms)${extra ? " — " + extra : ""}`,
            );
        });
    });
    return lines.join("\n");
}

async function copyReport() {
    const text = buildReport();
    try {
        await navigator.clipboard.writeText(text);
        toastr.success(t`Report copied to clipboard.`);
        return;
    } catch (e) {}
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;left:-9999px;top:0;";
    document.body.appendChild(ta);
    ta.select();
    let done = false;
    try {
        done = document.execCommand("copy");
    } catch (e) {}
    ta.remove();
    if (done) {
        toastr.success(t`Report copied to clipboard.`);
    } else {
        toastr.error(t`Copy failed. Please select and copy manually.`);
    }
}

function collectParams() {
    if (!_dialog) return {};
    const get = (sel) => {
        const el = _dialog.querySelector(sel);
        return el ? el.value.trim() : "";
    };
    return {
        apicxToken: _apicxToken,
        title: get(".ti-diag-input-title"),
        artist: get(".ti-diag-input-artist"),
        neteasePlaylistId: get(".ti-diag-input-nplaylist"),
        tencentPlaylistId: get(".ti-diag-input-tplaylist"),
    };
}

async function runAll() {
    if (_running) {
        if (_abort) _abort.abort();
        _running = false;
        renderAll();
        return;
    }
    _running = true;
    _results.clear();
    _abort = new AbortController();
    const params = collectParams();
    renderAll();

    for (const g of GROUPS) {
        if (!_running) break;
        _results.set(g.key, { loading: true });
        renderAll();
        const timer = setTimeout(() => {
            if (_abort) _abort.abort();
        }, 60000);
        try {
            const data = await requestGroup(g.key, params, _abort.signal);
            _results.set(g.key, data);
        } catch (e) {
            if (e.name === "AbortError") {
                _results.set(g.key, { error: t`Test aborted or timed out.` });
                _running = false;
                clearTimeout(timer);
                renderAll();
                break;
            }
            _results.set(g.key, { error: e.message });
            _abort = new AbortController();
        }
        clearTimeout(timer);
        renderAll();
    }

    _running = false;
    renderAll();
}

function closePopup() {
    if (_abort) _abort.abort();
    _running = false;
    if (_dialog) {
        _dialog.close();
        _dialog.remove();
        _dialog = null;
    }
}

export function showDiagnosePopup({ apicxToken = "" } = {}) {
    _apicxToken = String(apicxToken || "").trim();
    if (_dialog) {
        closePopup();
    }
    _results.clear();

    const dialog = document.createElement("dialog");
    dialog.id = "ti_diagnose_dialog";
    dialog.innerHTML = `
        <div class="ti-diag-header">
            <h3><i class="fa-solid fa-stethoscope"></i> ${t`Music Source Diagnostics`}</h3>
            <button class="ti-diag-close menu_button" title="${t`Close`}">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="ti-diag-note ti-diag-usage-notice" role="note">
            <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>${t`Run tests only when troubleshooting. Avoid repeated tests in a short period to reduce load on upstream services.`}</span>
        </div>
        <div class="ti-diag-params">
            <div class="ti-diag-param">
                <label>${t`Test Song`}</label>
                <input type="text" class="text_pole ti-diag-input-title" placeholder="${t`Leave empty for default`}">
            </div>
            <div class="ti-diag-param">
                <label>${t`Test Artist`}</label>
                <input type="text" class="text_pole ti-diag-input-artist" placeholder="${t`Leave empty for default`}">
            </div>
            <div class="ti-diag-param">
                <label>${t`NetEase Playlist ID`}</label>
                <input type="text" class="text_pole ti-diag-input-nplaylist" placeholder="${t`Leave empty for default`}">
            </div>
            <div class="ti-diag-param">
                <label>${t`QQ Music Playlist ID`}</label>
                <input type="text" class="text_pole ti-diag-input-tplaylist" placeholder="${t`Optional, skipped if empty`}">
            </div>
        </div>
        <div class="ti-diag-body">
            ${GROUPS.map(
                (g) => `
                <div class="ti-diag-group">
                    <div class="ti-diag-group-head">
                        <i class="fa-solid ${g.icon}"></i>
                        <span>${g.label()}</span>
                        <span class="ti-diag-group-badge" data-group-badge="${g.key}"></span>
                    </div>
                    <div class="ti-diag-group-body" data-group-body="${g.key}">
                        <div class="ti-diag-pending">${t`Waiting...`}</div>
                    </div>
                </div>`,
            ).join("")}
            <div class="ti-diag-note">
                <i class="fa-solid fa-circle-info"></i>
                ${t`The font proxy is a generic forwarder with no fixed upstream, so it is excluded from diagnostics. "Degraded" means the endpoint responded but returned no usable data.`}
            </div>
        </div>
        <div class="ti-diag-footer">
            <div class="ti-diag-summary"></div>
            <div class="ti-diag-actions">
                <button class="menu_button ti-diag-copy" disabled>
                    <i class="fa-solid fa-clipboard"></i><span>${t`Copy Report`}</span>
                </button>
                <button class="menu_button ti-diag-run">
                    <i class="fa-solid fa-play"></i><span>${t`Start Test`}</span>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);
    _dialog = dialog;
    dialog.showModal();

    [
        "click",
        "mousedown",
        "mouseup",
        "pointerdown",
        "pointerup",
        "touchstart",
        "touchend",
    ].forEach((evt) => {
        dialog.addEventListener(evt, (e) => e.stopPropagation());
    });
    dialog.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Escape") {
            e.preventDefault();
            e.stopImmediatePropagation();
            closePopup();
        }
    });
    dialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        closePopup();
    });
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closePopup();
    });

    dialog
        .querySelector(".ti-diag-close")
        .addEventListener("click", closePopup);
    dialog.querySelector(".ti-diag-run").addEventListener("click", () => {
        runAll().catch((err) => {
            console.error("[TI] 诊断执行异常:", err);
            toastr.error(err.message || t`Diagnose request failed`);
            _running = false;
            renderAll();
        });
    });
    dialog.querySelector(".ti-diag-copy").addEventListener("click", copyReport);

    renderAll();
}