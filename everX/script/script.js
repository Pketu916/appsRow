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

let swiperInstance;

function initSwiper() {
  const isMobile = window.innerWidth <= 1024;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      loop: true,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });
  } else if (!isMobile && !swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = undefined;
  }
}

window.addEventListener("load", initSwiper);
window.addEventListener("resize", () => {
  clearTimeout(window.swiperResizeTimeout);
  window.swiperResizeTimeout = setTimeout(initSwiper, 200); // debounce
});


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
