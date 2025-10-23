// js/menu.js  — REPLACE your existing file with this
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.sidebar-nav');
  const footer = document.querySelector('.sidebar-footer');

  if (!sidebar || !hamburger) return;

  function openMenu(open) {
    if (open) {
      sidebar.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      // Lock body scroll for mobile (optional)
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  }

  // Toggle on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu(!sidebar.classList.contains('open'));
  });

  // Close when clicking a nav link (mobile behaviour)
  if (nav) {
    nav.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && sidebar.classList.contains('open')) {
        openMenu(false);
      }
    });
  }

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) openMenu(false);
  });

  // Optional: close when clicking the dim overlay area (if you implement it)
  // clicking anywhere outside the inner sidebar content should close
  sidebar.addEventListener('click', (e) => {
    // if click is directly on the aside (not on inner nav/footer), close
    if (e.target === sidebar && sidebar.classList.contains('open')) openMenu(false);
  });
});
