// menu.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.createElement("div");
  toggle.className = "menu-toggle";
  toggle.innerHTML = "<span></span><span></span><span></span>";

  const sidebar = document.querySelector(".sidebar");
  const nav = document.querySelector(".sidebar-nav");

  if (sidebar && nav) {
    sidebar.appendChild(toggle);

    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
