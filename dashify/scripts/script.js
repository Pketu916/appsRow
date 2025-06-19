   function loadHTML(id, file) {
      fetch(file)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to load");
          return response.text();
        })
        .then((data) => {
          document.getElementById(id).innerHTML = data;

          // Add toggle logic after header is loaded
          if (file === "header.html") {
            const toggleBtn = document.querySelector(".menu-toggle");
            const navMenu = document.querySelector(".nav-menu");

            if (toggleBtn && navMenu) {
              toggleBtn.addEventListener("click", () => {
                  // navMenu.style.maxHeight === "0" ? "500px" : "0";
                  navMenu.style.display === "flex" ? "none" : "flex";
                  navMenu.classList.toggle("show");
              });
            }
          }
        })
        .catch((error) => {
          console.error(`Error loading ${file}:`, error);
        });
    }

    // Load header and footer after DOM is ready
    window.addEventListener("DOMContentLoaded", () => {
      loadHTML("common-header", "header.html");
      loadHTML("common-footer", "footer.html");
    });