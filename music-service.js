const SONG_PATH = '/api/plugins/g-player-proxy/song';
const PROXY_DOMAINS = ['126.net', 'netease.com', 'qq.com', 'kuwo.cn', 'kuwo.com', 'kugou.com', 'migu.cn'];

export function audioSource(url) {
    try {
        const parsed = new URL(url);
        if (PROXY_DOMAINS.some(domain => parsed.hostname === domain || parsed.hostname.endsWith('.' + domain))) {
            return `/api/plugins/g-player-proxy/stream?url=${encodeURIComponent(url)}`;
        }
    } catch {}
    return url;
}

export function originalAudioSource(url, baseUrl = globalThis.location?.href || 'http://localhost/') {
    try {
        const parsed = new URL(url, baseUrl);
        if (parsed.pathname === '/api/plugins/g-player-proxy/stream') {
            return parsed.searchParams.get('url') || url;
        }
    } catch {}
    return url;
}

export function selectSourceCandidates(scored, limit = 5) {
    const first = [];
    const rest = [];
    const sources = new Set();
    const tracks = new Set();
    for (const candidate of scored) {
        const source = String(candidate.item._source || '').toLowerCase();
        const key = JSON.stringify([source, candidate.item.id || candidate.item.rid]);
        if (tracks.has(key)) continue;
        tracks.add(key);
        if (sources.has(source)) rest.push(candidate);
        else { sources.add(source); first.push(candidate); }
    }
    return [...first, ...rest].slice(0, limit);
}

export function isMobileFirefox(userAgent = globalThis.navigator?.userAgent || '') {
    return /Android/i.test(userAgent) && /Firefox|Fennec|Focus/i.test(userAgent);
}

export function playbackFailureData(data = {}, audio) {
    return {
        ...data,
        audioUrl: originalAudioSource(data.audioUrl || audio?.currentSrc || audio?.src || ''),
        currentTime: Number.isFinite(data.currentTime) ? data.currentTime : Number(audio?.currentTime) || 0,
    };
}

export function probeAudio(url, { timeoutMs = 3000, createAudio = () => new Audio() } = {}) {
    if (!url) return Promise.resolve({ status: 'unknown', duration: null });
    return new Promise(resolve => {
        let audio;
        let timer;
        let settled = false;
        const finish = result => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            if (audio) {
                audio.onloadedmetadata = null;
                audio.onerror = null;
                try { audio.removeAttribute('src'); audio.load(); } catch {}
            }
            resolve(result);
        };
        try {
            audio = createAudio();
            audio.preload = 'metadata';
            audio.muted = true;
            audio.volume = 0;
            audio.crossOrigin = 'anonymous';
            timer = setTimeout(() => finish({ status: 'unknown', duration: null }), timeoutMs);
            audio.onloadedmetadata = () => {
                const duration = audio.duration;
                finish(Number.isFinite(duration) && duration > 0
                    ? { status: duration <= 60 ? 'preview' : 'verified', duration }
                    : { status: 'unknown', duration: null });
            };
            audio.onerror = () => finish({ status: 'unknown', duration: null });
            audio.src = audioSource(url);
        } catch {
            finish({ status: 'unknown', duration: null });
        }
    });
}

export function trackVersion(title) {
    const text = String(title || '').normalize('NFKC').toLowerCase();
    const sections = [...text.matchAll(/[\[【(]([^\]】)]*)[\]】)]/g)].map(match => match[1]);
    const suffix = text.match(/(?:\s[-–—]\s*|\s+)(live|cover|remix|instrumental|karaoke|demo|acoustic|extended)(?:\s+version)?\s*$/i);
    if (suffix) sections.push(suffix[1]);
    sections.push(...(text.match(/现场版|演唱会版|翻唱版|伴奏版|纯音乐版|混音版|不插电版/g) || []));
    const markers = [
        ['live', /\blive\b|现场|演唱会/],
        ['cover', /\bcover\b|翻唱|翻自/],
        ['instrumental', /\binstrumental\b|\binst\b|\bkaraoke\b|伴奏|纯音乐/],
        ['remix', /\bremix\b|混音/],
        ['demo', /\bdemo\b|小样/],
        ['acoustic', /\bacoustic\b|不插电/],
        ['extended', /\bextended\b|加长/],
    ];
    return markers.filter(([, pattern]) => sections.some(section => pattern.test(section))).map(([name]) => name).join('|');
}

export function mergeLyrics(primary = {}, secondary = {}) {
    const item = value => Array.isArray(value?.data) ? value.data[0] || {} : value?.data || value || {};
    const a = item(primary);
    const b = item(secondary);
    const text = value => typeof value === 'string' ? value : '';
    return {
        lyricsContent: text(a.lrc || a.lyric) || text(b.lrc || b.lyric),
        tlyricContent: text(a.tlyric || a.trans) || text(b.tlyric || b.trans),
    };
}

export function waitForLyrics(promise, timeoutMs = 1200) {
    return new Promise(resolve => {
        const timer = setTimeout(() => resolve(null), timeoutMs);
        Promise.resolve(promise).then(value => {
            clearTimeout(timer);
            resolve(value);
        }, () => {
            clearTimeout(timer);
            resolve(null);
        });
    });
}

export function createPlaybackStallWatchdog({
    getAudio,
    onStall,
    now = Date.now,
    stallMs = 10000,
} = {}) {
    let lastTime = null;
    let stalledAt = null;
    let reported = false;

    function reset(currentTime = null) {
        lastTime = Number.isFinite(currentTime) ? currentTime : null;
        stalledAt = null;
        reported = false;
    }

    function check() {
        const audio = typeof getAudio === 'function' ? getAudio() : null;
        const src = audio?.currentSrc || audio?.src || '';
        const currentTime = Number(audio?.currentTime);
        const duration = Number(audio?.duration);
        if (!audio || !src || audio.paused || audio.ended || audio.seeking || !Number.isFinite(currentTime) || (Number.isFinite(duration) && duration - currentTime <= 1)) {
            reset(currentTime);
            return false;
        }
        if (!(currentTime > 0)) {
            reset(currentTime);
            return false;
        }
        if (lastTime === null || Math.abs(currentTime - lastTime) >= 0.15) {
            reset(currentTime);
            return false;
        }
        if (stalledAt === null) stalledAt = now();
        if (reported || now() - stalledAt < stallMs) return false;
        reported = true;
        if (typeof onStall === 'function') {
            onStall({
                audioUrl: src,
                currentTime,
                duration: Number.isFinite(duration) ? duration : null,
                readyState: audio.readyState,
                networkState: audio.networkState,
            });
        }
        return true;
    }

    return { check, reset };
}

export function createMusicService({
    fetchImpl = (...args) => globalThis.fetch(...args),
    probe = probeAudio,
    baseUrl = globalThis.location?.href || 'http://localhost/',
    now = Date.now,
    requestTimeoutMs = 30000,
    totalTimeoutMs = 45000,
    maxProviderAttempts = 4,
    context = () => ({}),
} = {}) {
    const pending = new Map();
    const probes = new Map();
    const pendingProbes = new Map();
    const rejected = new Map();
    const hints = new Map();
    const limit = map => { while (map.size > 200) map.delete(map.keys().next().value); };
    const trackKey = (id, source) => `${String(source).toLowerCase()}|${id}`;
    const abortError = () => new DOMException('The operation was aborted', 'AbortError');

    function noteTrack(track) {
        if (!track || track.id === undefined || track.id === null || track.id === '') return;
        const title = track.originalTitle || track.title || track.name || '';
        if (!title) return;
        const artist = track.originalArtist || track.artist || track.singer || '';
        hints.set(trackKey(track.id, track.source || 'tencent'), { title: String(title), artist: String(artist || '') });
        limit(hints);
    }

    function trackHint(id, source) {
        return hints.get(trackKey(id, source)) || null;
    }

    function readContext() {
        let value;
        try {
            value = context() || {};
        } catch {
            return { token: '' };
        }
        const token = typeof value.apicxToken === 'string' ? value.apicxToken.trim() : '';
        return { token };
    }

    function withApicxToken(init, token) {
        const headers = new Headers(init?.headers || {});
        headers.set('x-apicx-token', token);
        return { ...(init || {}), headers };
    }

    function withContext(init) {
        const { token } = readContext();
        return token ? withApicxToken(init, token) : init;
    }

    function getValidation(url) {
        const entry = probes.get(url);
        if (!entry || now() - entry.ts > entry.ttl) return null;
        return entry.result;
    }

    async function inspectAudio(url, timeoutMs = 3000) {
        const cached = getValidation(url);
        if (cached) return cached;
        if (pendingProbes.has(url)) return pendingProbes.get(url);
        const promise = Promise.resolve().then(() => probe(url, { timeoutMs })).catch(() => ({ status: 'unknown', duration: null })).then(result => {
            const safe = result && typeof result.status === 'string' ? result : { status: 'unknown', duration: null };
            probes.set(url, { result: safe, ts: now(), ttl: safe.status === 'unknown' ? 1000 : 30000 });
            limit(probes);
            return safe;
        }).finally(() => pendingProbes.delete(url));
        pendingProbes.set(url, promise);
        return promise;
    }

    function rejectAudio(id, source, url) {
        if (!url || !id || !source) return;
        const key = trackKey(id, source);
        const urls = rejected.get(key) || new Map();
        urls.set(url, now());
        while (urls.size > 8) urls.delete(urls.keys().next().value);
        rejected.set(key, urls);
        limit(rejected);
        probes.delete(url);
    }

    function wasRejected(key, url) {
        const urls = rejected.get(key);
        if (!urls) return false;
        for (const [value, ts] of urls) if (now() - ts > 60000) urls.delete(value);
        if (!urls.size) rejected.delete(key);
        return urls.has(url);
    }

    async function request(url, init = {}, timeoutMs = requestTimeoutMs, nativeFetch = fetchImpl, parseJson = false) {
        if (init.signal?.aborted) throw init.signal.reason || abortError();
        const controller = new AbortController();
        let timer;
        let onAbort;
        const interrupted = new Promise((_, reject) => {
            onAbort = () => {
                const reason = init.signal?.reason || abortError();
                controller.abort(reason);
                reject(reason);
            };
            init.signal?.addEventListener('abort', onAbort, { once: true });
            timer = setTimeout(() => {
                const error = new DOMException('Music request timed out', 'TimeoutError');
                controller.abort(error);
                reject(error);
            }, timeoutMs);
        });
        try {
            const operation = Promise.resolve().then(async () => {
                const response = await nativeFetch(url, { ...init, signal: controller.signal });
                return parseJson ? { response, body: await response.json() } : response;
            });
            return await Promise.race([operation, interrupted]);
        } finally {
            clearTimeout(timer);
            init.signal?.removeEventListener('abort', onAbort);
        }
    }

    async function resolveSong(url, init, nativeFetch) {
        const startedAt = now();
        const excluded = new Set((url.searchParams.get('excludeProviders') || '').split(',').filter(Boolean));
        const seenUrls = new Set();
        const attempts = new Set();
        const id = url.searchParams.get('id');
        const source = url.searchParams.get('source') || 'tencent';
        const key = trackKey(id, source);
        const hint = trackHint(id, source);
        const { token } = readContext();
        const songInit = token ? withApicxToken(init, token) : init;
        let failureKind = 'unavailable';
        let lastStatus = 'unavailable';
        let lastBody = null;
        for (let count = 0; count < maxProviderAttempts; count++) {
            if (init?.signal?.aborted) throw init.signal.reason || abortError();
            const remaining = totalTimeoutMs - (now() - startedAt);
            if (remaining <= 0) { failureKind = 'upstream'; lastStatus = 'timeout'; break; }
            const next = new URL(url);
            if (excluded.size) next.searchParams.set('excludeProviders', [...excluded].join(','));
            if (hint) {
                if (hint.title && !next.searchParams.get('title')) next.searchParams.set('title', hint.title);
                if (hint.artist && !next.searchParams.get('artist')) next.searchParams.set('artist', hint.artist);
            }
            let response;
            let body;
            try {
                ({ response, body } = await request(next.href, songInit, Math.min(requestTimeoutMs, remaining), nativeFetch, true));
            } catch (error) {
                if (init?.signal?.aborted || error?.name === 'AbortError') throw error;
                failureKind = 'upstream';
                lastStatus = error?.name === 'TimeoutError' ? 'timeout' : 'upstream';
                break;
            }
            lastBody = body;
            for (const name of Array.isArray(body?._attemptedProviders) ? body._attemptedProviders : []) if (typeof name === 'string') attempts.add(name);
            const provider = typeof body?._provider === 'string' ? body._provider : '';
            if (provider) attempts.add(provider);
            const item = Array.isArray(body?.data) ? body.data[0] : body?.data;
            const audioUrl = typeof item?.url === 'string' ? item.url : '';
            if (!response.ok || body?._needFallback || !audioUrl) {
                failureKind = body?._failure?.kind || (response.ok ? 'unavailable' : 'upstream');
                lastStatus = failureKind;
                break;
            }
            const duplicate = !/^https?:\/\//i.test(audioUrl) || seenUrls.has(audioUrl) || wasRejected(key, audioUrl);
            seenUrls.add(audioUrl);
            const validation = duplicate
                ? { status: 'rejected', duration: null }
                : body._isPreview === true || item.isPreview === true
                    ? { status: 'preview', duration: null }
                    : await inspectAudio(audioUrl, Math.max(1, Math.min(3000, totalTimeoutMs - (now() - startedAt))));
            if (init?.signal?.aborted) throw init.signal.reason || abortError();
            if (validation.status !== 'preview' && validation.status !== 'rejected' && validation.status !== 'unavailable') {
                const headers = new Headers(response.headers);
                headers.delete('content-length');
                headers.delete('content-encoding');
                headers.set('content-type', 'application/json');
                return { body: { ...body, _musicValidation: validation }, status: response.status, headers };
            }
            lastStatus = validation.status;
            if (!provider || excluded.has(provider)) break;
            excluded.add(provider);
            for (const name of Array.isArray(body._attemptedProviders) ? body._attemptedProviders : []) {
                if (typeof name === 'string' && name.length <= 80 && excluded.size < 20) excluded.add(name);
            }
        }
        return {
            body: {
                _needFallback: true,
                _reason: lastStatus,
                _failure: { kind: failureKind },
                _attemptedProviders: [...attempts],
                _musicValidation: { status: lastStatus, duration: null },
                ...(lastBody?._source ? { _source: lastBody._source } : {}),
            },
            status: failureKind === 'upstream' ? 503 : 200,
            headers: { 'content-type': 'application/json' },
        };
    }

    async function musicFetch(input, init, nativeFetch = fetchImpl) {
        let url;
        try {
            if (typeof input !== 'string' && !(input instanceof URL)) return nativeFetch(input, init);
            url = new URL(input, baseUrl);
            if (url.origin !== new URL(baseUrl).origin || url.pathname !== SONG_PATH || (init?.method || 'GET').toUpperCase() !== 'GET') {
                return nativeFetch(input, init);
            }
        } catch { return nativeFetch(input, init); }
        const key = url.href;
        const share = !init || Object.keys(init).length === 0;
        let task = share ? pending.get(key) : null;
        if (!task) {
            task = resolveSong(url, init, fetchImpl);
            if (share) {
                pending.set(key, task);
                task.finally(() => { if (pending.get(key) === task) pending.delete(key); }).catch(() => {});
            }
        }
        const result = await task;
        return new Response(JSON.stringify(result.body), { status: result.status, headers: result.headers });
    }

    async function getSong(id, source, queryInfo = null) {
        const params = new URLSearchParams({ id: String(id), source: String(source).toLowerCase() });
        if (queryInfo?.title) params.set('title', queryInfo.title);
        if (queryInfo?.artist) params.set('artist', queryInfo.artist);
        const response = await musicFetch(`${SONG_PATH}?${params}`);
        return response.json();
    }

    async function requestJson(url, init = {}, timeoutMs = requestTimeoutMs) {
        const { response, body } = await request(url, withContext(init), timeoutMs, fetchImpl, true);
        if (!response.ok) throw new Error(`Music request failed: ${response.status}`);
        return body;
    }

    return { fetch: musicFetch, request, requestJson, getSong, inspectAudio, getValidation, rejectAudio, noteTrack };
}

export function createRecoveryGuard() {
    let revision = 0;
    let identity = '';
    return {
        noteTrack(track) {
            if (!track) return;
            const key = JSON.stringify([track.id, String(track.source || '').toLowerCase(), track.originalTitle || track.title || track.name, track.originalArtist || track.artist]);
            if (key !== identity) { identity = key; revision++; }
        },
        begin() {
            const started = ++revision;
            return () => started === revision;
        },
    };
}
