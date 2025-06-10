var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
  },
  loop: true,
});

var swiper = new Swiper(".reviews_mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: false,
  slidesPerGroupSkip: 0,
  slidesPerGroup: 1,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 2,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
  // },
  // scrollbar: {
  //   el: ".swiper-scrollbar",
  // },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
});

const selectEl = document.getElementsByTagName("select")[0];

function updateIcon(eventType) {
  if (eventType === "mousedown") {
    selectEl.style.backgroundImage = 'url("./assets/image/arrow.svg")';
  } else if (eventType === "change" || eventType === "blur") {
    selectEl.style.backgroundImage = 'url("./assets/image/plus.svg")';
  }
}

selectEl.addEventListener("mousedown", () => updateIcon("mousedown")); // fires before click/focus
selectEl.addEventListener("change", () => updateIcon("change"));
selectEl.addEventListener("blur", () => updateIcon("blur"));

const ul = document.querySelector(
  ".latest_properties_section .header_wrapper ul"
);

let isDown = false;
let startX;
let scrollLeft;

ul.addEventListener("mousedown", (e) => {
  isDown = true;
  ul.classList.add("dragging");
  startX = e.pageX - ul.offsetLeft;
  scrollLeft = ul.scrollLeft;
});

ul.addEventListener("mouseleave", () => {
  isDown = false;
  ul.classList.remove("dragging");
});

ul.addEventListener("mouseup", () => {
  isDown = false;
  ul.classList.remove("dragging");
});

ul.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - ul.offsetLeft;
  const walk = (x - startX) * 1.5; // Scroll speed
  ul.scrollLeft = scrollLeft - walk;
});
