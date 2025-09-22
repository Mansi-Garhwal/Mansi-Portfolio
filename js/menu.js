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
});
