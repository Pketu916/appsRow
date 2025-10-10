import React, { useRef, useEffect, useState } from "react";
import marquee_logo_1 from "../assets/marquee logo 1.svg";
import marquee_logo_2 from "../assets/marquee logo 2.svg";
import marquee_logo_3 from "../assets/marquee logo 3.svg";
import marquee_logo_4 from "../assets/marquee logo 4.svg";
import marquee_logo_5 from "../assets/marquee logo 5.svg";

const logos = [
  marquee_logo_1,
  marquee_logo_2,
  marquee_logo_3,
  marquee_logo_4,
  marquee_logo_5,
];

const Marquee = () => {
  const containerRef = useRef(null);
  const [duration, setDuration] = useState(50);
  const [repeatCount, setRepeatCount] = useState(2);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const logoWidth =
      containerRef.current.querySelector("img")?.offsetWidth || 100;
    const minContentWidth = containerWidth * 2; // ensure enough logos for seamless scroll
    const count = Math.ceil(minContentWidth / (logos.length * logoWidth));
    setRepeatCount(count);
    const speed = 100;
    const newDuration = (logos.length * logoWidth * count) / speed;
    setDuration(newDuration);
  }, []);

  // Repeat logos enough times to fill container for seamless scroll
  const repeatedLogos = Array.from({ length: repeatCount }, () => logos).flat();

  return (
    <div ref={containerRef} className="gap-6 bg-white ">
      <div
        className="flex flex-col shadow-[0px_4px_42px_rgba(0,0,0,0.25)]
 gap-6 items-center overflow-hidden rounded-[200px] px-[60px] pt-[28px] pb-[20px] relative z-10 bg-white"
      >
        <div className="marquee-overlay"></div>
        <div className=" mx-auto overflow-hidden bg-white">
          <div
            className="flex gap-20 overflow-hidden"
            style={{
              width: "max-content",
              animation: `marquee ${duration}s linear infinite`,
            }}
          >
            {repeatedLogos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`logo-${idx}`}
                className="h-10 flex-shrink-0 mr-10 select-none pointer-events-none"
                draggable={false}
              />
            ))}
          </div>
        </div>
        <p className="text-[#5b5e61]">
          Trusted by 15,000+ founders & business owners
        </p>
      </div>
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
