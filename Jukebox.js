/* ═══════════════════════════════════════════
   JUKEBOX WIDGET
   Draggable, persists position + playback
   across pages via localStorage.
   Drop your mp3 files into the /music folder
   and list them below.
═══════════════════════════════════════════ */
(function () {

  /* ── 1. YOUR PLAYLIST ──
     Add/remove tracks here. "title" is what shows in the widget,
     "src" is the path to the mp3 inside the /music folder. */
  var TRACKS = [
    { title: "The Original One!!", src: "music/track1.mp3" },
    { title: "Always after from the start", src: "music/track2.mp3" },
    { title: "Cruel Summer -taylor the creator", src: "music/track3.mp3" },
    { title: "Paper rings -the old lady", src: "music/track4.mp3" },
    { title: "Weird but ok...", src: "music/track5.mp3" },
    { title: "MOZZA HELWA LEBANESE", src: "music/track6.mp3" },
    { title: "the morning -Saturday/Sunday", src: "music/track7.mp3" },
    { title: "Church bells -king henry", src: "music/track8.mp3" }

  ];

  /* ── 2. STORAGE HELPERS ── */
  var LS = {
    pos:      "jukebox_pos",
    state:    "jukebox_state",     // 'open' | 'minimized' | 'closed'
    track:    "jukebox_track",
    time:     "jukebox_time",
    playing:  "jukebox_playing",
    volume:   "jukebox_volume",
    size:     "jukebox_size"
  };

  function getLS(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  }
  function setLS(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  /* ── 3. BUILD MARKUP ── */
  var launcher = document.createElement("div");
  launcher.id = "jukeboxLauncher";
  launcher.className = "jukebox-launcher";
  launcher.title = "Open Jukebox";
  launcher.innerHTML = "♪";

  var widget = document.createElement("div");
  widget.id = "jukeboxWidget";
  widget.className = "jukebox-widget";
  widget.innerHTML =
    '<div class="jukebox-header" id="jukeboxDragHandle">' +
      '<span class="jukebox-title">♫ Our Jukebox</span>' +
      '<div class="jukebox-controls-top">' +
        '<button id="jukeboxMinBtn" class="jukebox-icon-btn" title="Minimize">&#8211;</button>' +
        '<button id="jukeboxCloseBtn" class="jukebox-icon-btn" title="Close">&times;</button>' +
      '</div>' +
    '</div>' +
    '<div class="jukebox-body" id="jukeboxBody">' +
      '<div class="jukebox-track-name" id="jukeboxTrackName">—</div>' +
      '<div class="jukebox-progress-row">' +
        '<span class="jukebox-time" id="jukeboxCurrentTime">0:00</span>' +
        '<input type="range" id="jukeboxSeek" class="jukebox-seek" min="0" max="1000" value="0" step="1">' +
        '<span class="jukebox-time" id="jukeboxDuration">0:00</span>' +
      '</div>' +
      '<div class="jukebox-buttons-row">' +
        '<button id="jukeboxPrevBtn" class="jukebox-btn" title="Previous">&#9198;</button>' +
        '<button id="jukeboxPlayBtn" class="jukebox-btn jukebox-play" title="Play">&#9658;</button>' +
        '<button id="jukeboxNextBtn" class="jukebox-btn" title="Next">&#9197;</button>' +
      '</div>' +
    '</div>' +
    '<div class="jukebox-resize jr-n" data-dx="0" data-dy="-1"></div>' +
    '<div class="jukebox-resize jr-s" data-dx="0" data-dy="1"></div>' +
    '<div class="jukebox-resize jr-e" data-dx="1" data-dy="0"></div>' +
    '<div class="jukebox-resize jr-w" data-dx="-1" data-dy="0"></div>' +
    '<div class="jukebox-resize jr-ne" data-dx="1" data-dy="-1"></div>' +
    '<div class="jukebox-resize jr-nw" data-dx="-1" data-dy="-1"></div>' +
    '<div class="jukebox-resize jr-se jr-grip" data-dx="1" data-dy="1"></div>' +
    '<div class="jukebox-resize jr-sw" data-dx="-1" data-dy="1"></div>';

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(launcher);
    document.body.appendChild(widget);
    init();
  });

  /* ── 4. STATE ── */
  var audio = new Audio();
  var trackIndex = getLS(LS.track, 0);
  if (trackIndex < 0 || trackIndex >= TRACKS.length) trackIndex = 0;
  var wasPlaying = getLS(LS.playing, false);
  var savedTime  = getLS(LS.time, 0);
  var volume     = getLS(LS.volume, 0.8);
  var seeking    = false;

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  function loadTrack(i, autoplay, resumeAt) {
    trackIndex = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
    setLS(LS.track, trackIndex);
    var t = TRACKS[trackIndex];
    var nameEl = document.getElementById("jukeboxTrackName");
    if (nameEl) nameEl.textContent = t.title;
    audio.src = t.src;
    audio.volume = volume;
    audio.load();
    if (resumeAt) {
      audio.addEventListener("loadedmetadata", function onMeta() {
        audio.currentTime = Math.min(resumeAt, audio.duration || resumeAt);
        audio.removeEventListener("loadedmetadata", onMeta);
      });
    }
    if (autoplay) {
      audio.play().catch(function () {
        /* Autoplay blocked — leave paused, user can hit play */
        setPlayIcon(false);
      });
    }
  }

  function setPlayIcon(playing) {
    var btn = document.getElementById("jukeboxPlayBtn");
    if (!btn) return;
    btn.innerHTML = playing ? "&#10074;&#10074;" : "&#9658;";
    btn.title = playing ? "Pause" : "Play";
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().catch(function () {});
    } else {
      audio.pause();
    }
  }

  function next() { loadTrack(trackIndex + 1, true, 0); }
  function prev() { loadTrack(trackIndex - 1, true, 0); }

  /* ── 5. WIRE UP AUDIO EVENTS ── */
  audio.addEventListener("play", function () {
    setPlayIcon(true);
    setLS(LS.playing, true);
  });
  audio.addEventListener("pause", function () {
    setPlayIcon(false);
    setLS(LS.playing, false);
  });
  audio.addEventListener("ended", function () { next(); });
  audio.addEventListener("timeupdate", function () {
    setLS(LS.time, audio.currentTime);
    if (seeking) return;
    var cur = document.getElementById("jukeboxCurrentTime");
    var dur = document.getElementById("jukeboxDuration");
    var seek = document.getElementById("jukeboxSeek");
    if (cur) cur.textContent = fmtTime(audio.currentTime);
    if (dur) dur.textContent = fmtTime(audio.duration);
    if (seek && audio.duration) {
      seek.value = (audio.currentTime / audio.duration) * 1000;
    }
  });
  audio.addEventListener("loadedmetadata", function () {
    var dur = document.getElementById("jukeboxDuration");
    if (dur) dur.textContent = fmtTime(audio.duration);
  });

  /* ── 6. SIZE LIMITS (mobile-aware) ── */
  var MIN_W = 200, MIN_H = 170;
  function maxW() { return Math.min(460, window.innerWidth - 16); }
  function maxH() { return Math.min(560, window.innerHeight - 16); }

  /* ── 7. DRAGGING + RESIZING ── */
  function makeInteractive(handle, box) {
    var dragging = false, offX = 0, offY = 0;

    function clampPos(x, y) {
      var maxX = window.innerWidth  - box.offsetWidth  - 8;
      var maxY = window.innerHeight - box.offsetHeight - 8;
      return [Math.max(8, Math.min(x, maxX)), Math.max(8, Math.min(y, maxY))];
    }

    function setPos(x, y) {
      var c = clampPos(x, y);
      box.style.left = c[0] + "px";
      box.style.top  = c[1] + "px";
      box.style.right = "auto";
      box.style.bottom = "auto";
      setLS(LS.pos, { x: c[0], y: c[1] });
      return c;
    }

    handle.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".jukebox-icon-btn")) return;
      dragging = true;
      var rect = box.getBoundingClientRect();
      offX = e.clientX - rect.left;
      offY = e.clientY - rect.top;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      setPos(e.clientX - offX, e.clientY - offY);
    });
    handle.addEventListener("pointerup", function () { dragging = false; });
    handle.addEventListener("pointercancel", function () { dragging = false; });

    /* restore saved position, else default bottom-right */
    var saved = getLS(LS.pos, null);
    if (saved) {
      setPos(saved.x, saved.y);
    } else {
      box.style.right = "24px";
      box.style.bottom = "24px";
    }

    /* ── resize handles ── */
    var resizing = false, rDx = 0, rDy = 0;
    var startW, startH, startLeft, startTop, startX, startY;

    var handles = box.querySelectorAll(".jukebox-resize");
    for (var i = 0; i < handles.length; i++) {
      handles[i].addEventListener("pointerdown", function (e) {
        e.stopPropagation();
        resizing = true;
        rDx = parseInt(e.currentTarget.getAttribute("data-dx"), 10);
        rDy = parseInt(e.currentTarget.getAttribute("data-dy"), 10);
        var rect = box.getBoundingClientRect();
        startW = rect.width;
        startH = rect.height;
        startLeft = rect.left;
        startTop  = rect.top;
        startX = e.clientX;
        startY = e.clientY;
        e.currentTarget.setPointerCapture(e.pointerId);
      });
    }

    function onResizeMove(e) {
      if (!resizing) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;

      var newW = startW, newH = startH, newLeft = startLeft, newTop = startTop;

      if (rDx === 1) {
        newW = clamp(startW + dx, MIN_W, maxW());
      } else if (rDx === -1) {
        newW = clamp(startW - dx, MIN_W, maxW());
        newLeft = startLeft + (startW - newW);
      }
      if (rDy === 1) {
        newH = clamp(startH + dy, MIN_H, maxH());
      } else if (rDy === -1) {
        newH = clamp(startH - dy, MIN_H, maxH());
        newTop = startTop + (startH - newH);
      }

      /* keep panel fully on-screen */
      newLeft = Math.max(8, Math.min(newLeft, window.innerWidth  - newW - 8));
      newTop  = Math.max(8, Math.min(newTop,  window.innerHeight - newH - 8));

      box.style.width  = newW + "px";
      box.style.height = newH + "px";
      box.style.left   = newLeft + "px";
      box.style.top    = newTop + "px";
      box.style.right  = "auto";
      box.style.bottom = "auto";
    }

    function endResize() {
      if (!resizing) return;
      resizing = false;
      var rect = box.getBoundingClientRect();
      setLS(LS.size, { w: rect.width, h: rect.height });
      setLS(LS.pos,  { x: rect.left,  y: rect.top });
    }

    document.addEventListener("pointermove", onResizeMove);
    document.addEventListener("pointerup", endResize);
    document.addEventListener("pointercancel", endResize);

    /* restore saved size, clamped to current viewport */
    var savedSize = getLS(LS.size, null);
    if (savedSize) {
      var w = clamp(savedSize.w, MIN_W, maxW());
      var h = clamp(savedSize.h, MIN_H, maxH());
      box.style.width  = w + "px";
      box.style.height = h + "px";
    }

    window.addEventListener("resize", function () {
      var p = getLS(LS.pos, null);
      var s = getLS(LS.size, null);
      if (s) {
        var w = clamp(s.w, MIN_W, maxW());
        var h = clamp(s.h, MIN_H, maxH());
        box.style.width  = w + "px";
        box.style.height = h + "px";
        setLS(LS.size, { w: w, h: h });
      }
      if (p) setPos(p.x, p.y);
    });
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(v, hi)); }

  /* ── 8. WIDGET STATE (open / minimized / closed) ── */
  function applyState(state) {
    setLS(LS.state, state);
    if (state === "closed") {
      widget.style.display = "none";
      launcher.style.display = "flex";
    } else if (state === "minimized") {
      widget.style.display = "flex";
      widget.classList.add("minimized");
      launcher.style.display = "none";
    } else {
      widget.style.display = "flex";
      widget.classList.remove("minimized");
      launcher.style.display = "none";
    }
  }

  /* ── 9. INIT ── */
  function init() {
    var dragHandle = document.getElementById("jukeboxDragHandle");
    makeInteractive(dragHandle, widget);

    document.getElementById("jukeboxPlayBtn").addEventListener("click", togglePlay);
    document.getElementById("jukeboxNextBtn").addEventListener("click", next);
    document.getElementById("jukeboxPrevBtn").addEventListener("click", prev);

    var seek = document.getElementById("jukeboxSeek");
    seek.addEventListener("input", function () {
      seeking = true;
      var cur = document.getElementById("jukeboxCurrentTime");
      if (audio.duration) {
        var t = (seek.value / 1000) * audio.duration;
        if (cur) cur.textContent = fmtTime(t);
      }
    });
    seek.addEventListener("change", function () {
      if (audio.duration) {
        audio.currentTime = (seek.value / 1000) * audio.duration;
      }
      seeking = false;
    });

    document.getElementById("jukeboxMinBtn").addEventListener("click", function () {
      var isMin = widget.classList.contains("minimized");
      applyState(isMin ? "open" : "minimized");
    });
    document.getElementById("jukeboxCloseBtn").addEventListener("click", function () {
      applyState("closed");
    });
    launcher.addEventListener("click", function () {
      applyState("open");
    });
    /* double-click header title also restores from minimized */
    document.querySelector(".jukebox-title").addEventListener("click", function () {
      if (widget.classList.contains("minimized")) applyState("open");
    });

    applyState(getLS(LS.state, "open"));
    loadTrack(trackIndex, wasPlaying, savedTime);
  }

})();
