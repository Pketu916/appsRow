import gsap from "gsap";

export function initMarqueeHover() {
  const hoverCircle = document.querySelector(".custom-cursor");
  const marqueeTexts = document.querySelectorAll(".marquee-text");
  const marqueeSection = document.querySelector(".marquee-section");
  const marqueeTrack = document.querySelector(".marquee-track");

  // Show and grow the cursor circle with image
  function appearCursor(imgUrl, sizeVW = 10) {
    hoverCircle.style.backgroundImage = imgUrl ? `url(${imgUrl})` : "none";

    // Start small and invisible
    gsap.set(hoverCircle, {
      scale: 0.1,
      opacity: 1,
      width: `${sizeVW}vw`,
      height: `${sizeVW}vw`,
      display: "block",
    });

    // Animate to full size and visible
    gsap.to(hoverCircle, {
      duration: 0.5,
      scale: 1,
      opacity: 1,
      ease: "power3.out",
    });
  }

  // Shrink and hide cursor circle
  function disappearCursor() {
    gsap.to(hoverCircle, {
      duration: 0.4,
      scale: 0.1,
      opacity: 0,
      ease: "power3.in",
      onComplete: () => {
        hoverCircle.style.backgroundImage = "none";
        hoverCircle.style.display = "none";
      },
    });
  }

  function setupHoverListeners() {
    if (window.innerWidth > 992) {
      marqueeSection.addEventListener("mouseenter", () => {
        marqueeSection.classList.add("default-cursor");
        appearCursor(null, 2.5);
      });

      marqueeSection.addEventListener("mouseleave", () => {
        marqueeSection.classList.remove("default-cursor");
        disappearCursor();
      });

      marqueeTexts.forEach((text) => {
        text.addEventListener("mouseenter", () => {
          const imgUrl = text.dataset.img;
          marqueeTrack.style.animationPlayState = "paused";
          appearCursor(imgUrl, 50);
        });

        text.addEventListener("mouseleave", () => {
          marqueeTrack.style.animationPlayState = "running";
          disappearCursor();
        });
      });

      marqueeTrack.addEventListener("mouseenter", () => {
        appearCursor("default-image-url.jpg", 50);
        marqueeTrack.style.animationPlayState = "running";
      });

      marqueeTrack.addEventListener("mouseleave", () => {
        disappearCursor();
        marqueeTrack.style.animationPlayState = "running";
      });

      marqueeSection.addEventListener("mousemove", (e) => {
        const x = e.clientX - hoverCircle.offsetWidth / 2;
        const y = e.clientY - hoverCircle.offsetHeight / 2;

        // Smoothly move the circle near cursor
        gsap.to(hoverCircle, {
          duration: 0.2,
          x,
          y,
          ease: "power3.out",
        });
      });
    } else {
      hoverCircle.style.display = "none";
    }
  }

  window.addEventListener("load", setupHoverListeners);
  window.addEventListener("resize", () => location.reload());
}
