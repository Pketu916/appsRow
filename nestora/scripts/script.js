document.addEventListener("DOMContentLoaded", function () {
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

  const selectEl = document.querySelector(
    ".subscribe_section_container select"
  );

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
});

// header

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("activeNav");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    navMenu.classList.remove("activeNav");
  });
});

// achievement

function animateValue(el, end, suffix = "", duration = 2000) {
  let start = 0;
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = duration / frameRate;
  const increment = end / totalFrames;

  const counter = setInterval(() => {
    start += increment;
    if (start >= end) {
      el.innerText = Math.round(end) + suffix;
      clearInterval(counter);
    } else {
      el.innerText = Math.floor(start) + suffix;
    }
  }, frameRate);
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".h2");
        counters.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target"));
          const text = el.textContent.trim();
          const suffix = text.replace(/[0-9]/g, "").trim();
          animateValue(el, target, suffix);
        });
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  },
  { threshold: 0.5 }
); // Adjust threshold if needed

const achievementSection = document.querySelector(".achievement");
if (achievementSection) {
  observer.observe(achievementSection);
}
