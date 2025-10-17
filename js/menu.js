// menu.js — final working version
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".sidebar-nav");
  const footer = document.querySelector(".sidebar-footer");

  // Safety check
  if (!sidebar || !hamburger) {
    console.warn("menu.js: Missing .sidebar or .hamburger");
    return;
  }

  // Prevent body scroll when menu open
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };
  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  // Toggle menu
  const toggleMenu = () => {
    const isOpen = sidebar.classList.toggle("open");

    if (isOpen) {
      lockScroll();
      hamburger.setAttribute("aria-expanded", "true");
      if (nav) nav.setAttribute("aria-hidden", "false");
      if (footer) footer.setAttribute("aria-hidden", "false");
    } else {
      unlockScroll();
      hamburger.setAttribute("aria-expanded", "false");
      if (nav) nav.setAttribute("aria-hidden", "true");
      if (footer) footer.setAttribute("aria-hidden", "true");
    }
  };

  // Hamburger click
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.classList.contains("open")) return;
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove("open");
      unlockScroll();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      unlockScroll();
    }
  });

  // Close menu when resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900 && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      unlockScroll();
    }
  });
});
