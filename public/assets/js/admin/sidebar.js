const sidebar = document.querySelector(".sidebar");
const btnOpenSidebar = document.querySelector(".open-sidebar");
const overlay = document.querySelector(".overlay");

if (btnOpenSidebar) {
  btnOpenSidebar.addEventListener("click", function () {
    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      overlay.classList.remove("hidden");
    } else {
      sidebar.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });

  overlay.addEventListener("click", function () {
    sidebar.classList.add("hidden");
    this.classList.add("hidden");
  });
}
