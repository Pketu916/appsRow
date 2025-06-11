let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-10vw";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});



class LogosMarquee {
	constructor({
		containerSelector = ".marquee__ctn",
		trackSelector = ".marquee__track",
		speed = 60 // pixels per second
	} = {}) {
		this.container = document.querySelector(containerSelector);
		this.track = document.querySelector(trackSelector);
		this.speed = speed;

		if (!this.container || !this.track) {
			return;
		}

		this.trackWidth = this.track.getBoundingClientRect().width;
		this.pos = 0;
		this.start = null;
		this.rafId = null;

		this.setup();
		this.animate = this.animate.bind(this); // Bind pour requestAnimationFrame
		requestAnimationFrame(this.animate);
	}

	setup() {
		this.container.style.width = `${this.trackWidth}px`;

		this.clone = this.track.cloneNode(true);
		this.container.appendChild(this.clone);

		this.container.style.willChange = "transform";
	}

	animate(timestamp) {
		if (!this.start) this.start = timestamp;

		const elapsed = timestamp - this.start;
		this.pos = -(elapsed / 1000) * this.speed;

		if (Math.abs(this.pos) >= this.trackWidth) {
			this.start = timestamp;
			this.pos = 0;
		}

		this.container.style.transform = `translateX(${this.pos}px)`;

		this.rafId = requestAnimationFrame(this.animate);
	}

	destroy() {
		cancelAnimationFrame(this.rafId);
		if (this.clone) this.clone.remove();
		this.container.style.transform = "";
		this.container.style.willChange = "";
	}
}

window.addEventListener("load", () => {
	const marquee = new LogosMarquee({
		containerSelector: ".marquee__ctn",
		trackSelector: ".marquee__track",
		speed: 80
	});

	// Si besoin, tu peux le détruire plus tard :
	// marquee.destroy();
});
