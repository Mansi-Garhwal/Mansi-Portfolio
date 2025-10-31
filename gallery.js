/* gallery.js — small fix: include .project-track */
(function () {
  // Select gallery track for HOME (.gallery-track) OR PROJECT (.project-track)
  const track = document.querySelector('.gallery-track, .project-track');
  if (!track) return; // Exit if no gallery on page

  let isDown = false;
  let startX, scrollLeft;
  let lastX = 0, lastTime = 0, velocity = 0, raf = null;

  function onDown(e) {
    isDown = true;
    track.classList.add('dragging');
    startX = e.clientX ?? (e.touches && e.touches[0].clientX);
    scrollLeft = track.scrollLeft;
    lastX = startX;
    lastTime = performance.now();
    velocity = 0;
    if (e.pointerId) track.setPointerCapture && track.setPointerCapture(e.pointerId);
  }

  function onMove(e) {
    if (!isDown) return;
    const x = e.clientX ?? (e.touches && e.touches[0].clientX);
    const dx = x - startX;
    track.scrollLeft = scrollLeft - dx;
    const now = performance.now();
    const dt = Math.max(now - lastTime, 1);
    velocity = (lastX - x) / dt;
    lastX = x;
    lastTime = now;
  }

  function onUp() {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('dragging');
    let v = velocity * 16;
    function step() {
      v *= 0.95;
      track.scrollLeft += v;
      if (Math.abs(v) > 0.5) raf = requestAnimationFrame(step);
      else { cancelAnimationFrame(raf); raf = null; }
    }
    if (Math.abs(v) > 0.5) raf = requestAnimationFrame(step);
  }

  track.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  track.addEventListener('touchstart', onDown, { passive: true });
  track.addEventListener('touchmove', onMove, { passive: true });
  track.addEventListener('touchend', onUp);
  track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      track.scrollLeft += e.deltaX || e.deltaY;
    }
  }, { passive: false });

  console.log("✅ gallery.js active on", track.className);
})();
