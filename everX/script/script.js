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

// Function to change the text in the hero section
function changeHeroText() {
  const heroText = document.getElementById("hero-text");
  const texts = [
    "Your <span>full-service</span> supply chain partner<span>.</span>",
    "Your <span>dynamic-service</span> supply chain partner<span>.</span>",
    "Your <span>EverX-service</span> supply chain partner<span>.</span>",
  ];

  let index = 0;

  setInterval(() => {
    heroText.innerHTML = texts[index];
    index = (index + 1) % texts.length;
  }, 1000);
}
// changeHeroText();

let swiperInstances = [];

function initSwipers() {
  const isMobile = window.innerWidth <= 1024;
  const isFade = window.innerWidth <= 530;
  const newEffect = isFade ? "fade" : "slide";

  // Destroy old instances
  swiperInstances.forEach((instance) => instance.destroy(true, true));
  swiperInstances = [];

  const swiperContainers = document.querySelectorAll(".mySwiper");

  swiperContainers.forEach((swiperContainer, index) => {
    if (isMobile) {
      const swiper = new Swiper(swiperContainer, {
        // loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        effect: "slide",
        fadeEffect: isFade ? { crossFade: true } : undefined,
        navigation: {
          nextEl: swiperContainer.querySelector(".swiper-button-next"),
          prevEl: swiperContainer.querySelector(".swiper-button-prev"),
        },
        breakpoints: !isFade
          ? {
              530: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }
          : {},
      });

      swiperInstances.push(swiper);
    } else {
      // Optional: clean styles if not mobile
      const wrapper = swiperContainer.querySelector(".swiper-wrapper");
      if (wrapper) wrapper.removeAttribute("style");
    }
  });
}

// Debounced resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSwipers, 150);
});

window.addEventListener("load", initSwipers);

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
      const footer = await fetch("footer.html").then(res => res.text());

      // document.getElementById("header").innerHTML = header;
      document.getElementById("footer").innerHTML = footer;
    }

    includeHTML();