import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import React, { useState } from "react";
import travelDealsdataSource from "../../travelDealsdata";
import Button from "./UI/button";

const TravelDealsSlider = () => {
  const [travelDealsdata, setTravelDealsdata] = useState(travelDealsdataSource);
  return (
    <div className="TravelDealsSlider w-full max-w-7xl mx-auto px-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        ✈️ Exclusive Travel Deals
      </h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {travelDealsdata
          .filter((deal) => deal.cta === true)
          .map((deal) => (
            <SwiperSlide key={deal.id}>
              <div
                className="rounded-2xl shadow-lg overflow-hidden flex flex-col gap-2 items-center justify-center text-white pt-12 pb-14 bg-no-repeat bg-cover "
                style={{ backgroundImage: `url(${deal.bigImage})` }}
              >
                <p className="-mb-14 transform translate-x-full">
                  {deal.duration}
                </p>
                <h2 className="text-[120px] font-melodrama tracking-widest relative ">
                  {deal.country}
                  <span className="absolute h-[1px] w-44 bg-white left-1/2 bottom-0 translate-x-[-50%] -translate-y-4"></span>
                </h2>
                <p className="text-xl">Explore your journey</p>
                <div className="flex gap-8 items-center">
                  <div className="mt-3 flex flex-col items-center justify-between">
                    <p className="flex gap-2 items-center ">
                      <span className="line-through text-gray-600 text-xs">
                        ${deal.oldPrice.toFixed(2)}
                      </span>
                      <span className="text-2xl">${deal.price.toFixed(2)}</span>
                    </p>
                    <p className="text-xs uppercase ">Offer price per person</p>
                  </div>
                  <Button>Book Now</Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TravelDealsSlider;
