// FAQ
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const answer = item.querySelector(".faq-answer");
    const isActive = item.classList.contains("active");

    // Collapse all
    document.querySelectorAll(".faq-item").forEach((el) => {
      const ans = el.querySelector(".faq-answer");
      el.classList.remove("active");
      ans.style.maxHeight = null;
      ans.style.paddingBottom = null;
    });

    // Expand the clicked one only if it wasn't already open
    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.paddingBottom = "16px";
    }
  });
});

// Review Slider

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".feature-slider", {
    // slidesPerView: 5,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: "auto",
      },
      768: {
        slidesPerView: 2.5,
      },
      468: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   new Swiper(".feature-slider", {
//     slidesPerView: "auto",
//     spaceBetween: 20,
//     grabCursor: true,
//     breakpoints: {
//       1024: {
//         slidesPerView: 3,
//       },
//       768: {
//         slidesPerView: 2.5,
//       },
//       468: {
//         slidesPerView: 2,
//       },
//       0: {
//         slidesPerView: 1,
//       },
//     },
//   });
// });

// Before Card
let started = false; // to ensure animation runs only once

function startMatter() {
  if (started) return;
  started = true;

  const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

  // Create engine
  const engine = Engine.create();
  const world = engine.world;

  const scene = document.getElementById("scene");
  const { width, height } = scene.getBoundingClientRect();

  const runner = Runner.create();
  Runner.run(runner, engine);

  // Static boundaries
  const ground = Bodies.rectangle(width / 2, height + 20, width, 40, {
    isStatic: true,
  });
  const leftWall = Bodies.rectangle(-20, height / 2, 40, height, {
    isStatic: true,
  });
  const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height, {
    isStatic: true,
  });
  Composite.add(world, [ground, leftWall, rightWall]);

  // Button labels
  const labels = [
    `<img src="../assets/images/svg-clock.svg" class="icon"> Untracked hours & unclear accountability`,
    `<img src="../assets/images/svg-device.svg" class="icon"> Missed updates between office & site`,
    `<img src="../assets/images/svg-folder.svg" class="icon"> Disorganised task lists`,
    `<img src="../assets/images/svg-gear.svg" class="icon"> Inconsistent instructions`,
    `<img src="../assets/images/svg-excel.svg" class="icon"> Paper reports & Excel sheets`,
    `<img src="../assets/images/svg-whatsapp.svg" class="icon"> WhatsApp chats & endless calls`,
  ];

  // Create HTML buttons & physics bodies
  labels.forEach((text) => {
    const btn = document.createElement("div");
    btn.className = "button";
    btn.innerHTML = text;
    scene.appendChild(btn);

    const x = Math.random() * width;
    const y = Math.random() * -200;

    const rect = btn.getBoundingClientRect();
    const bw = rect.width || 120;
    const bh = rect.height || 36;

    const body = Bodies.rectangle(x, y, bw, bh, {
      restitution: 0.5,
      friction: 0.3,
    });

    body.el = btn;
    Composite.add(world, body);
  });

  // Mouse drag
  const mouse = Mouse.create(scene);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  });
  Composite.add(world, mouseConstraint);

  // Restrict dragging inside scene only
  Matter.Events.on(mouseConstraint, "mousemove", function (event) {
    const mousePos = event.mouse.position;
    if (
      mousePos.x < 0 ||
      mousePos.x > width ||
      mousePos.y < 0 ||
      mousePos.y > height
    ) {
      mouseConstraint.constraint.bodyB = null; // release body
    }
  });

  // Sync DOM with physics
  (function update() {
    Composite.allBodies(world).forEach((body) => {
      if (body.el) {
        body.el.style.left = body.position.x - body.el.offsetWidth / 2 + "px";
        body.el.style.top = body.position.y - body.el.offsetHeight / 2 + "px";
        body.el.style.transform = `rotate(${body.angle}rad)`;
      }
    });
    requestAnimationFrame(update);
  })();
}

// Trigger animation when section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startMatter();
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(document.querySelector(".before-card"));

const lenis = new Lenis({
  // Value between 0 and 1
  // Default value: 0.1
  // The lower the value, the smoother the scroll
  lerp: 0.05,
  // Default value: 1
  // The higher the value, the faster the scrolling
  wheelMultiplier: 1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Navbar

// document.addEventListener("DOMContentLoaded", function () {
//     const navToggle = document.querySelector(".nav-toggle");
//     const navMenu = document.querySelector(".nav-menu ul");

//     navToggle.addEventListener("click", function () {
//         navMenu.classList.toggle("active");
//         this.classList.toggle("open");
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu-v2 ");
  const navLinks = document.querySelectorAll(".nav-menu-v2 ul li a");

  // Toggle menu open/close
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    this.classList.toggle("open");
  });

  // Close menu when any link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("open");
    });
  });
});

// Home Page Animation Script
function initAnimationsWeb() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".hero-sub-image-1",
    { x: "168%", y: "-570%" },
    {
      x: "30%",
      // y: "-35vw",
      y: "-252%",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "0%",
        end: "40%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
      },
    }
  );

  gsap.fromTo(
    ".hero-sub-image-3",
    { x: "117%", y: "-1201%" },
    {
      x: "27.5%",
      // y: "-228%",
      y: "-270%",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "0%",
        end: "65%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
      },
    }
  );

  gsap.fromTo(
    ".hero-sub-image-4",
    { x: "117%", y: "-1310%" },
    {
      x: "145%",
      y: "-160%",
      // y: "-135%",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "0%",
        end: "65%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
        // markers: true,
      },
    }
  );
}

function initAnimationsTab() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".hero-sub-image-1",
    {
      top: "-29%",
      maxWidth: "255px",
    },
    {
      top: "14%",
      maxWidth: "700px",
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "-40%",
        end: "160%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
      },
    }
  );

  // Animate maxWidth with delay
  gsap.fromTo(
    ".hero-sub-image-1",
    { maxWidth: "255px" },
    {
      maxWidth: "750px",
      delay: 1,
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "-10%",
        end: "160%",
        // scrub: true,
        ease: "power2.out",
        duration: 2.5,
      },
    }
  );

  gsap.fromTo(
    ".hero-sub-image-3",
    { top: "-15%" },
    {
      top: "67.2%",
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "40%",
        end: "300%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
        markers: true,
      },
    }
  );

  gsap.fromTo(
    ".hero-sub-image-4",
    { top: "-10%" },
    {
      top: "86.15%",
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "40%",
        end: "350%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
        // markers: true,
      },
    }
  );
}

function initAnimationsMobile() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".hero-sub-image-1",
    {
      top: "-50%",
      // maxWidth:"255px"
    },
    {
      top: "14%",
      // maxWidth: "unset",
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "-40%",
        end: "80%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
      },
    }
  );

  gsap.fromTo(
    ".hero-sub-image-3",
    { top: "-15%" },
    {
      top: "67.2%",
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "40%",
        end: "230%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
        // markers: true,
      },
    }
  );

  gsap.fromTo(
    ".hero-sub-image-4",
    { top: "-10%" },
    {
      top: "86.15%",
      scrollTrigger: {
        trigger: ".hero-wrapper-right",
        start: "40%",
        end: "300%",
        scrub: true,
        ease: "power2.out",
        duration: 2.5,
        // markers: true,
      },
    }
  );
}

function triggerAnimations() {
  if (window.innerWidth < 475) {
    initAnimationsMobile();
  } else if (window.innerWidth <= 767) {
    initAnimationsTab();
  } else {
    initAnimationsWeb();
  }
}

triggerAnimations(); // Run on page load
window.addEventListener("resize", triggerAnimations); // Run on resize
