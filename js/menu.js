// js/menu.js — updated for mobile topbar + dropdown
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const sidebarFooter = sidebar ? sidebar.querySelector('.sidebar-footer') : null;

  if (!sidebar || !hamburger) return;

  const lockScroll = () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };
  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  function openMenu() {
    sidebar.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    if (mobileNav) mobileNav.setAttribute('aria-hidden', 'false');
    if (sidebarFooter) sidebarFooter.setAttribute('aria-hidden', 'false');
    lockScroll();

    // focus first link for accessibility
    const firstLink = mobileNav ? mobileNav.querySelector('a') : sidebar.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    sidebar.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (mobileNav) mobileNav.setAttribute('aria-hidden', 'true');
    if (sidebarFooter) sidebarFooter.setAttribute('aria-hidden', 'true');
    unlockScroll();
    hamburger.focus();
  }

  function toggleMenu() {
    if (sidebar.classList.contains('open')) closeMenu();
    else openMenu();
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking on any nav link (so menu collapses after navigation)
  sidebar.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    // If link points to same page anchor or external, still close
    closeMenu();
  });

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('open')) return;
    if (sidebar.contains(e.target) || hamburger.contains(e.target)) return;
    closeMenu();
  });

  // Escape closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeMenu();
    }
  });

  // If viewport goes to desktop width, ensure we close menu and unlock scroll
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && sidebar.classList.contains('open')) {
      closeMenu();
    }
  });

  // Initial ARIA state
  hamburger.setAttribute('aria-expanded', sidebar.classList.contains('open') ? 'true' : 'false');
  if (mobileNav) mobileNav.setAttribute('aria-hidden', sidebar.classList.contains('open') ? 'false' : 'true');
  if (sidebarFooter) sidebarFooter.setAttribute('aria-hidden', sidebar.classList.contains('open') ? 'false' : 'true');
});
