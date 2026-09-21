export function installThemeRuntime(targetWindow, initiallyPaused = false) {
  const requestFrame = targetWindow.requestAnimationFrame.bind(targetWindow);
  const cancelFrame = targetWindow.cancelAnimationFrame.bind(targetWindow);
  const setInterval = targetWindow.setInterval.bind(targetWindow);
  const frames = new Map();
  let nextFrameId = 1;
  let hostPaused = initiallyPaused;
  let paused = hostPaused || targetWindow.document.hidden;

  function scheduleFrame(id, frame) {
    if (paused) return;
    frame.nativeId = requestFrame((time) => {
      frame.nativeId = null;
      if (paused) return;
      frames.delete(id);
      frame.callback.call(targetWindow, time);
    });
  }

  function updatePaused() {
    const nextPaused = hostPaused || targetWindow.document.hidden;
    if (paused === nextPaused) return;
    paused = nextPaused;
    for (const [id, frame] of frames) {
      if (paused) {
        if (frame.nativeId !== null) cancelFrame(frame.nativeId);
        frame.nativeId = null;
      } else {
        scheduleFrame(id, frame);
      }
    }
  }

  // Cached, display:none iframes do not suspend their JavaScript timers.
  targetWindow.setInterval = (callback, delay, ...args) => {
    if (typeof callback !== "function") {
      return setInterval(callback, delay, ...args);
    }
    return setInterval(() => {
      if (!paused) callback.apply(targetWindow, args);
    }, delay);
  };

  targetWindow.requestAnimationFrame = (callback) => {
    if (typeof callback !== "function") {
      throw new TypeError("Animation frame callback must be a function");
    }
    const id = nextFrameId++;
    const frame = { callback, nativeId: null };
    frames.set(id, frame);
    scheduleFrame(id, frame);
    return id;
  };

  targetWindow.cancelAnimationFrame = (id) => {
    const frame = frames.get(id);
    if (!frame) return;
    if (frame.nativeId !== null) cancelFrame(frame.nativeId);
    frames.delete(id);
  };

  targetWindow.addEventListener("message", (event) => {
    if (
      event.source !== targetWindow.parent ||
      event.data?.source !== "typing-indicator-host"
    )
      return;
    if (event.data.type === "pause-theme") {
      hostPaused = true;
    } else if (event.data.type === "resume-theme") {
      hostPaused = false;
    } else {
      return;
    }
    updatePaused();
  });
  targetWindow.document.addEventListener("visibilitychange", updatePaused);
}
