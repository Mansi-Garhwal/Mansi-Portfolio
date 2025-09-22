// js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.querySelector(".hamburger");

  if (!sidebar || !hamburger) return;

  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");

    const isOpen = sidebar.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Optional: close menu on nav link click
  const links = sidebar.querySelectorAll(".sidebar-nav a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
});
