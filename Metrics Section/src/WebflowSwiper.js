import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const WebflowSwiper = () => {
  return (
    <div className="webflow-swiper-wrapper">
      <h2 className="main-slider-heading">Our Featured Services</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Slide 1"
              className="slide-image"
            />
            <h3 className="slide-title">Web Design</h3>
            <p className="slide-text">
              Modern and responsive web design services.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Slide 2"
              className="slide-image"
            />
            <h3 className="slide-title">App Development</h3>
            <p className="slide-text">
              Custom mobile and web applications built for you.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Slide 2"
              className="slide-image"
            />
            <h3 className="slide-title">App Development</h3>
            <p className="slide-text">
              Custom mobile and web applications built for you.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Slide 2"
              className="slide-image"
            />
            <h3 className="slide-title">App Development</h3>
            <p className="slide-text">
              Custom mobile and web applications built for you.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Slide 2"
              className="slide-image"
            />
            <h3 className="slide-title">App Development</h3>
            <p className="slide-text">
              Custom mobile and web applications built for you.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Slide 2"
              className="slide-image"
            />
            <h3 className="slide-title">App Development</h3>
            <p className="slide-text">
              Custom mobile and web applications built for you.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Slide 3"
              className="slide-image"
            />
            <h3 className="slide-title">Digital Marketing</h3>
            <p className="slide-text">
              Grow your brand with our marketing experts.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-card">
            <img
              src="https://picsum.photos/200/300"
              alt="Slide 4"
              className="slide-image"
            />
            <h3 className="slide-title">SEO Optimization</h3>
            <p className="slide-text">Improve your search engine rankings.</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default WebflowSwiper;
