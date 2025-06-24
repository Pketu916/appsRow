var swiper = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 25000,
    disableOnInteraction: false,
  },
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
      document.querySelectorAll('.hero-content').forEach(el => {
        el.classList.remove('active');
      });
    },
    slideChangeTransitionEnd: function () {
      // Add 'active' class to current slide's hero-content
      const activeSlide = document.querySelector('.swiper-slide-active');
      const heroContent = activeSlide.querySelector('.hero-content');
      if (heroContent) {
        heroContent.classList.add('active');
      }
    },
  }
});
