// document.addEventListener('DOMContentLoaded', () => {
//   const hamburgerButton = document.querySelector('.hamburger-button');
//   const navContainer = document.querySelector('.nav-container');
//   const openIcon = document.querySelector('.open-icon');
//   const closeIcon = document.querySelector('.close-icon');
//   const navLinks = document.querySelectorAll('.nav-list a');
//   const startButton = document.querySelector('.global-button');

//   function showMenu() {
//     navContainer.classList.add('show');
//     openIcon.style.display = 'none';
//     closeIcon.style.display = 'inline';
//   }

//   function hideMenu() {
//     navContainer.classList.remove('show');
//     openIcon.style.display = 'inline';
//     closeIcon.style.display = 'none';
//   }

//   hamburgerButton.addEventListener('click', () => {
//     const isMenuOpen = navContainer.classList.contains('show');
//     if (isMenuOpen) {
//       hideMenu();
//     } else {
//       showMenu();
//     }
//   });

//   // Close menu on nav link or button click
//   navLinks.forEach(link => {
//     link.addEventListener('click', hideMenu);
//   });

//   startButton.addEventListener('click', hideMenu);
// });
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
