function loadHTML(id, file, callback) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load");
      return response.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      // ✅ Run any logic after HTML is loaded
      if (typeof callback === "function") callback();
    })
    .catch((error) => {
      console.error(`Error loading ${file}:`, error);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadHTML("common-header", "header.html", () => {
    // ✅ Toggle menu for mobile
    const toggleBtn = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
      });
    }

    // ✅ Highlight current nav link
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("nav a").forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop();
      if (linkPage === currentPage) {
        link.classList.add("navActive"); // 👈 your correct class
      }
    });
  });

  loadHTML("common-footer", "footer.html");
});
