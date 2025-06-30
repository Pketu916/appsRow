// header script

const menuBtn = document.querySelector(".menu");
const nav = document.querySelector(".header-wrapper nav");
const navLinks = nav.querySelectorAll("nav a");
const dropdownToggles = document.querySelectorAll("nav ul");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.classList.toggle("activeMenu");
});

// Close menu only on <a> clicks
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.classList.remove("activeMenu");
  });
});

// Toggle dropdown independently
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent bubbling
    const dropdownMenu = toggle.nextElementSibling;
    dropdownMenu.classList.toggle("active");
  });
});

// card

//

const cartToggle = document.getElementById("cartToggle");
const cartAside = document.getElementById("cartAside");
const overlay = document.getElementById("overlay");
const cartClose = document.getElementById("cartClose");

cartToggle.addEventListener("click", () => {
  cartAside.classList.add("active");
  overlay.classList.add("active");
});

cartClose.addEventListener("click", () => {
  cartAside.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  cartAside.classList.remove("active");
  overlay.classList.remove("active");
});
