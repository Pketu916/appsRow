// counter

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
        const counters = entry.target.querySelectorAll(".count");
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
);

const counterSection = document.querySelector(".counter");
if (counterSection) {
  observer.observe(counterSection);
}
