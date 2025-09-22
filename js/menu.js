/* =====================================
   menu.js — handles hamburger toggle
   Works on all pages
   ===================================== */

(function () {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (!hamburger || !sidebar) {
    console.warn("⚠️ menu.js: Hamburger or sidebar not found.");
    return;
  }

  // Toggle sidebar open/close
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when a nav link is clicked (mobile only)
  const navLinks = sidebar.querySelectorAll('.sidebar-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });

  console.log("✅ menu.js loaded, hamburger ready");
})();
