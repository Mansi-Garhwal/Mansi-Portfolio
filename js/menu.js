// Simple hamburger toggle
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
});
