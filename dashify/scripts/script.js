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

const toggle = document.getElementById("checkboxInput");
const priceElements = document.querySelectorAll(".planCard .h4");

// Example Monthly and Yearly prices
const monthlyPrices = ["$26", "$59", "$99"];
const yearlyPrices = ["$280", "$640", "$1080"]; // 10% off approx

toggle.addEventListener("change", () => {
  priceElements.forEach((priceEl, index) => {
    if (toggle.checked) {
      priceEl.innerHTML = `${yearlyPrices[index]} <span class="body-lg gray-500">/ yr</span>`;
    } else {
      priceEl.innerHTML = `${monthlyPrices[index]} <span class="body-lg gray-500">/ mo</span>`;
    }
  });
});
