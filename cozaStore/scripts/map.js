
// map

// Fullscreen Toggle
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  const frame = document.getElementById("mapFrame");
  if (!document.fullscreenElement) {
    frame.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});


