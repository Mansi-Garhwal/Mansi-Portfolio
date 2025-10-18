// js/menu.js  — REPLACE your existing file with this
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelectorAll('.sidebar-nav a');

  if (!sidebar || !hamburger) return;

  hamburger.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    // set aria-expanded on the actual button for accessibility (string 'true'/'false')
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // lock scrolling on body when menu is open (mobile)
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked (mobile)
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Optional: close menu on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});
