// js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.querySelector(".hamburger");

  if (!sidebar || !hamburger) return; // exit if elements are missing

  // Toggle sidebar open/close when hamburger is clicked
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");

    // toggle aria-expanded for accessibility
    const isOpen = sidebar.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when any nav link is clicked
  const links = sidebar.querySelectorAll(".sidebar-nav a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Optional: close when clicking outside sidebar (mobile only)
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});
