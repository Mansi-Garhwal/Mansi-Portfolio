// carousel.js
document.addEventListener("DOMContentLoaded", () => {
  const tracks = document.querySelectorAll(".gallery-track, .project-track");

  tracks.forEach(track => {
    let startX = 0, scrollLeft = 0, isDown = false;

    track.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX;
      scrollLeft = track.scrollLeft;
    }, { passive: true });

    track.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX;
      const walk = startX - x;
      track.scrollLeft = scrollLeft + walk;
    }, { passive: true });

    track.addEventListener("touchend", () => { isDown = false; });
  });
});
