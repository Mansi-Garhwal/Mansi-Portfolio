// menu.js — improved sidebar toggle + accessibility
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const hamburger = sidebar && sidebar.querySelector(".hamburger");
  const sidebarNav = sidebar && sidebar.querySelector(".sidebar-nav");

  if (!sidebar || !hamburger) return;

  // Toggle open / close
  function toggleMenu() {
    const isOpen = sidebar.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    // if you need to force show/hide of sidebar-nav for older CSS, you can toggle a class on nav too
    sidebarNav && sidebarNav.classList.toggle("open", isOpen);
  }

  hamburger.addEventListener("click", toggleMenu);

  // Close menu on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      sidebarNav && sidebarNav.classList.remove("open");
    }
  });

  // Optional: close menu when a nav link is clicked (mobile)
  sidebarNav && sidebarNav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A" && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      sidebarNav.classList.remove("open");
    }
  });
});
