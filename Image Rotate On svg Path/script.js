gsap.registerPlugin(MotionPathPlugin);

gsap.to("#orbitImage", {
  duration: 6,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: "#orbitPath",
    align: "#orbitPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  }
});
