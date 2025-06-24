var swiper = new Swiper(".mySwiper", {
  slidesPerView: 'auto',    // Allow flexible slide width
  spaceBetween: 20,
  centeredSlides: true,
  loop: false,
  
  breakpoints: {
    992: {
      slidesPerView: 3,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 2,
      centeredSlides: false,
    },
    0: {
      slidesPerView: 1,
      centeredSlides: false,
    }
  }
});
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('.header-wrapper nav');
const navLinks = nav.querySelectorAll('li a, .mobile-header-links a');
const headerLinks = document.querySelectorAll('.header-links a');
const dropdownToggles = document.querySelectorAll('.dropdown-container .dropdown');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.classList.toggle('activeMenu');
});

// Close menu only on <a> clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('activeMenu');
    });
});

headerLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('activeMenu');
    });
});

// Toggle dropdown independently
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle('active');
    });
});
