console.clear();
gsap.registerPlugin(ScrollTrigger);

let wheel = document.querySelector(".wheel");
let images = gsap.utils.toArray(".wheel__card");

function setup() {
  let radius = wheel.offsetWidth / 2.5; // adjust size of circle
  let center = wheel.offsetWidth / 2;
  let total = images.length;
  let slice = (2 * Math.PI) / total;

  images.forEach((item, i) => {
    let angle = i * slice;

    let x = center + radius * Math.sin(angle);
    let y = center - radius * Math.cos(angle);

    gsap.set(item, {
      rotation: (angle * 180) / Math.PI, // convert rad → deg
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y,
    });
  });
}

setup();
window.addEventListener("resize", setup);

// Rotate on scroll with snapping to each card
gsap.to(".wheel", {
  rotate: () => -360, // full rotation
  ease: "none",
  scrollTrigger: {
    trigger: ".slider-section",
    start: "top center",
    end: "+=4000", // scroll length
    scrub: 1,
    pin: true,
    snap: 1 / images.length, // snap per card
    invalidateOnRefresh: true,
  },
});
