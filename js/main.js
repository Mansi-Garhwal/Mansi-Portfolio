// Enable drag-to-scroll for horizontal gallery
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('scrollGallery');
  if (!gallery) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });
  gallery.addEventListener('mouseleave', () => { isDown = false; });
  gallery.addEventListener('mouseup', () => { isDown = false; });
  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.2; // scroll speed
    gallery.scrollLeft = scrollLeft - walk;
  });
});
