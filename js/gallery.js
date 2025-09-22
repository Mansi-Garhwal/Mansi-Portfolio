// gallery.js — desktop drag & inertia scroll
document.addEventListener("DOMContentLoaded", () => {
  const tracks = document.querySelectorAll(".gallery-track, .project-track");
  tracks.forEach(track => {
    let isDown = false, startX = 0, startScroll = 0;
    let lastX = 0, lastTime = 0, velocity = 0, raf = null;

    function onDown(e) {
      isDown = true;
      track.classList.add("dragging");
      startX = e.clientX ?? e.touches?.[0].clientX;
      startScroll = track.scrollLeft;
      lastX = startX;
      lastTime = performance.now();
      velocity = 0;
      if (e.pointerId) track.setPointerCapture?.(e.pointerId);
    }

    function onMove(e) {
      if (!isDown) return;
      const x = e.clientX ?? e.touches?.[0].clientX;
      const dx = x - startX;
      track.scrollLeft = startScroll - dx;
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      velocity = (lastX - x) / dt;
      lastX = x; lastTime = now;
    }

    function onUp() {
      if (!isDown) return;
      isDown = false;
      track.classList.remove("dragging");
      let v = velocity * 16;
      function step() {
        v *= 0.95;
        track.scrollLeft += v;
        if (Math.abs(v) > 0.5) raf = requestAnimationFrame(step);
        else cancelAnimationFrame(raf);
      }
      if (Math.abs(v) > 0.5) raf = requestAnimationFrame(step);
    }

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    // Touch fallback
    track.addEventListener("touchstart", onDown, { passive: true });
    track.addEventListener("touchmove", onMove, { passive: true });
    track.addEventListener("touchend", onUp);

  });
});
