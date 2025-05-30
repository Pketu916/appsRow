document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const navContainer = document.querySelector(".nav-container");
  const openIcon = document.querySelector(".open-icon");
  const closeIcon = document.querySelector(".close-icon");
  const navLinks = document.querySelectorAll(".nav-list a");
  const startButton = document.querySelector(".global-button");
  const body = document.body;

  function showMenu() {
    navContainer.classList.add("show");
    openIcon.style.display = "none";
    closeIcon.style.display = "inline";
    body.classList.add("no-scroll");
  }

  function hideMenu() {
    navContainer.classList.remove("show");
    openIcon.style.display = "inline";
    closeIcon.style.display = "none";
    body.classList.remove("no-scroll");
  }

  hamburgerButton.addEventListener("click", () => {
    const isMenuOpen = navContainer.classList.contains("show");
    if (isMenuOpen) {
      hideMenu();
    } else {
      showMenu();
    }
  });

  // Close menu on any nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", hideMenu);
  });

  // Close menu on "Let’s get started" button click
  if (startButton) {
    startButton.addEventListener("click", hideMenu);
  }
});

// swiper 1 started
let swiperInstances = [];

function initSwipers() {
  const isTablet = window.innerWidth <= 1024;
  const isMobile = window.innerWidth <= 530;

  // Destroy old instances
  swiperInstances.forEach((instance) => instance.destroy(true, true));
  swiperInstances = [];

  // Initialize Swiper 1
  const swiper1 = document.querySelector(".mySwiper-1");
  if (swiper1 && isTablet) {
    swiperInstances.push(
      new Swiper(swiper1, {
        spaceBetween: 20,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },

        slidesPerView: "auto",
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          stretch: isMobile ? -20 : -30,
          depth: isMobile ? 200 : 100,
          modifier: 1,
          scale: 1,
          slideShadows: true,
        },
        // fadeEffect: isMobile ? { crossFade: true } : undefined,
        fadeEffect: true,
        navigation: {
          nextEl: ".swiper-button-next-1",
          prevEl: ".swiper-button-prev-1",
        },
        breakpoints: !isMobile
          ? {
              530: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }
          : {},
      })
    );
  }

  // Initialize Swiper 2
  const swiper2 = document.querySelector(".mySwiper-2");
  if (swiper2 && isTablet) {
    swiperInstances.push(
      new Swiper(swiper2, {
        spaceBetween: 20,
        // keyboard: {
        //   enabled: true,
        //   onlyInViewport: true,
        // },

        slidesPerView: 1,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          stretch: isMobile ? -20 : -30,
          depth: isMobile ? 150 : 100,
          modifier: 1,
          scale: 1,
          slideShadows: false,
        },
        // fadeEffect: isMobile ? { crossFade: true } : undefined,
        fadeEffect: true,
        navigation: {
          nextEl: ".swiper-button-next-2",
          prevEl: ".swiper-button-prev-2",
        },
        breakpoints: !isMobile
          ? {
              530: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }
          : {},
      })
    );
  }
}

// Debounced resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSwipers, 150);
});

window.addEventListener("load", initSwipers);

//swiper 1 ended

// FAQ accordion functionality
const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach((card) => {
  const questionArea = card.querySelector(".faq-question");
  const answer = card.querySelector(".faq-answer");

  questionArea.addEventListener("click", () => {
    faqCards.forEach((other) => {
      if (other !== card) {
        other.classList.remove("active");
        other.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    const isActive = card.classList.contains("active");

    card.classList.toggle("active");

    if (!isActive) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

// header footer
async function includeHTML() {
  // const header = await fetch("header.html").then(res => res.text());
  const footer = await fetch("footer.html").then((res) => res.text());

  // document.getElementById("header").innerHTML = header;
  document.getElementById("footer").innerHTML = footer;
}

includeHTML();
