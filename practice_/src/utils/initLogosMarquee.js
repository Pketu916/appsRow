export function initLogosMarquee({
  containerSelector = ".marquee__ctn",
  trackSelector = ".marquee__track",
  speed = 60, // pixels per second
} = {}) {
  const container = document.querySelector(containerSelector);
  const track = document.querySelector(trackSelector);

  if (!container || !track) return () => {};

  const trackWidth = track.getBoundingClientRect().width;
  let pos = 0;
  let start = null;
  let rafId = null;

  // Clone for seamless loop
  const clone = track.cloneNode(true);
  container.appendChild(clone);
  container.style.width = `${trackWidth}px`;
  container.style.willChange = "transform";

  const animate = (timestamp) => {
    if (!start) start = timestamp;

    const elapsed = timestamp - start;
    pos = -(elapsed / 1000) * speed;

    if (Math.abs(pos) >= trackWidth) {
      start = timestamp;
      pos = 0;
    }

    container.style.transform = `translateX(${pos}px)`;
    rafId = requestAnimationFrame(animate);
  };

  rafId = requestAnimationFrame(animate);

  // Return a cleanup function
  return () => {
    cancelAnimationFrame(rafId);
    if (clone) clone.remove();
    container.style.transform = "";
    container.style.willChange = "";
  };
}
