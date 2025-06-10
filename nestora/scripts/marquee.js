// Select all elements with the 'logo-stage' class
const stages = document.querySelectorAll(".logo-stage");

stages.forEach((stage) => {
  // Select all logos (img tags) within this stage
  const logos = stage.querySelectorAll("img");

  // Create a GSAP timeline for this stage, looping forever
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0 });

  // Get the class list for conditional logic
  const classList = stage.classList;

  logos.forEach((logo, i) => {
    const from = {}; // Starting animation values
    const to = {}; // Ending animation values
    let durationIn = 1.0; // Default duration for animating in
    let durationOut = 1.0; // Default duration for animating out

    // Assign directions and durations based on class
    if (classList.contains("topleft")) {
      Object.assign(from, { y: "-100%", x: 0, scale: 0.8, opacity: 0 });
      Object.assign(to, { x: "-100vw", opacity: 0 });
      durationIn = 0.4;
      durationOut = 1.0;
    } else if (classList.contains("lefttop")) {
      Object.assign(from, { x: "-100%", y: 0, scale: 0.8, opacity: 0 });
      Object.assign(to, { y: "-100vh", opacity: 0 });
      durationIn = 0.5;
      durationOut = 1.0;
    } else if (classList.contains("righttobottom")) {
      Object.assign(from, { x: "100%", y: 0, scale: 0.8, opacity: 0 });
      Object.assign(to, { y: "100vh", opacity: 0 });
      durationIn = 0.6;
      durationOut = 1.0;
    } else if (classList.contains("lefttobottom")) {
      Object.assign(from, { x: "-100%", y: 0, scale: 0.8, opacity: 0 });
      Object.assign(to, { y: "100vh", opacity: 0 });
      durationIn = 0.7;
      durationOut = 1.0;
    } else if (classList.contains("bottomtoright")) {
      Object.assign(from, { y: "100%", x: 0, scale: 0.8, opacity: 0 });
      Object.assign(to, { x: "100vw", opacity: 0 });
      durationIn = 0.8;
      durationOut = 1.0;
    } else if (classList.contains("righttotop")) {
      Object.assign(from, { y: 0, x: "100%", scale: 0.8, opacity: 0 });
      Object.assign(to, { y: "-100vw", opacity: 0 });
      durationIn = 0.8;
      durationOut = 1.0;
    } else {
      Object.assign(from, { y: "-100%", scale: 0.8, opacity: 0 });
      Object.assign(to, { x: "-100vw", opacity: 0 });
      durationIn = 0.8;
      durationOut = 1.0;
    }

    // Set initial state
    tl.set(logo, from);

    // Animate logo in
    tl.to(logo, {
      duration: durationIn,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "power2.out",
    });

    // Animate logo out after a short delay
    tl.to(logo, {
      duration: durationOut,
      ...to,
      ease: "power2.in",
      delay: 2,
    });

    // Clear styles so the animation can restart cleanly
    tl.set(logo, { clearProps: "all" });
  });
});
