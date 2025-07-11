import { useEffect } from "react";
import { initLogosMarquee } from "../utils/initLogosMarquee";
import { initMarqueeHover } from "../utils/initMarqueeHover"; // ✅ import new script
import "../module/marquee.css"

const Marquee = () => {
  useEffect(() => {
    const cleanup = initLogosMarquee({
      containerSelector: ".marquee__ctn",
      trackSelector: ".marquee__track",
      speed: 60,
    });

    initMarqueeHover(); // ✅ run hover effect script

    return cleanup;
  }, []);

  return (
    <section className="w-[100vw] h-[10vw] bg-red-500 marquee-section">
      <div className="custom-container h-full">
        <div className="wrapper">
          <div className="marquee" data-speed="60">
            <div className="marquee__ctn">
              <div className="marquee__track marquee-track">
                {logos.map((src, i) => (
                  <div
                    className="marquee__item marquee-text"
                    key={`dup-${i}`}
                    data-img={src}
                  >
                    <h4 className="text-white">hello</h4>
                    <img className="hover_img" src={src} alt="LOGO" />
                  </div>
                ))}
              </div>
              <div className="marquee__track" aria-hidden="true">
                {logos.map((src, i) => (
                  <div
                    className="marquee__item marquee-text"
                    key={`dup2-${i}`}
                    data-img={src}
                  >
                    <h4 className="text-white">hello</h4>
                    <img className="hover_img" src={src} alt="LOGO" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* cursor circle */}
      <div className="custom-cursor"></div>
    </section>
  );
};
const logos = [
  "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0eeeb860f66063130cc_Amsterdam-colored.svg",
  "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09591135411dbf1f686_colorado-colored.svg",
  "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/65609f775edfd6ba4a3c3af7_Nairobi-colored.svg",
  "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/656093f6591bba4a6757b985_Hudon-colored.svg",
  "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/6560817610fbd2b58993793c_Aura-colored.svg",
  "https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/65607df9d46a61fcef7c719f_Aiken-colored.svg",
];
export default Marquee;
