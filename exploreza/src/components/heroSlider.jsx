import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Reusable Full Screen Slider
 * @param {Array} slides - Array of slide objects [{id, image, title, description, button}]
 * @param {Boolean} auto - Enable/disable autoplay
 */
const HeroSlider = ({ slides = [], auto = true }) => {
  return (
    <div className="w-full h-[663px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={auto ? { delay: 40000, disableOnInteraction: false } : false}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="relative z-10 text-white text-center px-6 max-w-4xl">
                <h1 className="text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-white/70 ">
                  {slide.description}
                </p>
                {slide.button && (
                  <button className="mt-6 px-6 py-3 rounded bg-red-600 hover:bg-red-700 transition text-white font-semibold">
                    {slide.button}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
