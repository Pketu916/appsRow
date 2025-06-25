var swiper = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  speed: 1500,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  on: {
    slideChangeTransitionStart: function () {
      // Remove 'active' class from all hero-content
      document.querySelectorAll(".hero-content").forEach((el) => {
        el.classList.remove("active");
      });
    },
    slideChangeTransitionEnd: function () {
      // Add 'active' class to current slide's hero-content
      const activeSlide = document.querySelector(".swiper-slide-active");
      const heroContent = activeSlide.querySelector(".hero-content");
      if (heroContent) {
        heroContent.classList.add("active");
      }
    },
  },
});

// const categoryButtons = document.querySelectorAll(".categories button");
// const products = document.querySelectorAll(".product-card");

// categoryButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // Remove active class from all buttons
//     categoryButtons.forEach((btn) => btn.classList.remove("active"));
//     button.classList.add("active");

//     const selectedCategory = button.dataset.category;

//     products.forEach((product) => {
//       const productCategory = product.dataset.category;

//       if (selectedCategory === "all" || selectedCategory === productCategory) {
//         product.style.display = "block";
//       } else {
//         product.style.display = "none";
//       }
//     });
//   });
// });

// product card -------------------------------------------

const categoryButtons = document.querySelectorAll(".categories button");
const products = document.querySelectorAll(".product-card");
const loadMoreBtn = document.querySelector(".load-more");

let visibleCount = 4; // How many cards show initially
let currentCategory = "all";

function showProducts() {
  let shown = 0;
  products.forEach((product) => {
    const productCategory = product.dataset.category;

    if (currentCategory === "all" || productCategory === currentCategory) {
      if (shown < visibleCount) {
        product.style.display = "flex";
        shown++;
      } else {
        product.style.display = "none";
      }
    } else {
      product.style.display = "none";
    }
  });

  // Hide load more if all are visible
  const totalVisible = Array.from(products).filter(
    (p) => p.dataset.category === currentCategory || currentCategory === "all"
  );
  if (shown >= totalVisible.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    visibleCount = 4; // Reset visible count on filter change
    showProducts();
  });
});

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 4; // Load 4 more cards
  showProducts();
});

// Initial load
showProducts();

// header---------------------------------------------------
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // Change 50 to desired scroll amount
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//
const filterBtn = document.getElementById("filterBtn");
const filter = document.getElementById("filter");

filterBtn.addEventListener("click", () => {
    filter.classList.toggle("filter-slide");
});
