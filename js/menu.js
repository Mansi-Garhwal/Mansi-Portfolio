// js/menu.js — updated
// - Toggles .sidebar.open on hamburger click
// - Updates ARIA attributes for accessibility
// - Prevents background scroll when mobile menu is open
// - Closes on link click, outside click, or Escape key
// - Defensive: will not run if expected elements are missing

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  // mobile nav that we show/hide (may be inside sidebar)
  const mobileNav = document.getElementById('mobile-nav') || document.querySelector('.sidebar-nav');

  // Defensive: if no sidebar or hamburger, do nothing (preserves desktop)
  if (!sidebar || !hamburger) return;

  // Utility: lock/unlock body scroll (used when menu opens)
  const lockScroll = () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };
  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  // Toggle function used by click handler (kept idempotent)
  function toggleSidebar(open = undefined) {
    const isOpen = typeof open === 'boolean' ? open : !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    if (mobileNav) mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    if (isOpen) lockScroll();
    else unlockScroll();
  }

  // Primary click handler for hamburger
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // so click-outside handler doesn't close immediately
    toggleSidebar();
  });

  // Close menu when any nav link is clicked (keeps desktop unchanged)
  const links = sidebar.querySelectorAll('.sidebar-nav a, #mobile-nav a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleSidebar(false);
    });
  });

  // Close when clicking outside the sidebar (mobile-friendly)
  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('open')) return;
    // if click happens inside sidebar or on hamburger, ignore
    if (sidebar.contains(e.target) || hamburger.contains(e.target)) return;
    toggleSidebar(false);
  });

  // Close on Escape key for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleSidebar(false);
      hamburger.focus();
    }
  });

  // Optional: close the menu when the viewport is resized to desktop (prevents stale open state)
  // This keeps desktop layout safe: if window becomes >=900px, remove open state and unlock scroll.
  window.addEventListener('resize', () => {
    try {
      if (window.innerWidth >= 900 && sidebar.classList.contains('open')) {
        toggleSidebar(false);
      }
    } catch (err) { /* noop */ }
  });

  // Helpful small enhancement: if the sidebar contains a focusable first link, move focus there when opened
  const firstLink = sidebar.querySelector('.sidebar-nav a, #mobile-nav a');
  const observer = new MutationObserver(() => {
    if (sidebar.classList.contains('open') && firstLink) {
      firstLink.focus();
    }
  });
  observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

  // Keep original behavior: leave a console message (non-essential)
  console.log('✅ menu.js loaded — hamburger & sidebar handlers active');
});
