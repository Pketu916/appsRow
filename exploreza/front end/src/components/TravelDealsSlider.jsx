import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useTravelDestinations } from "../hooks/useTravelDestinations";
import Button from "./UI/button";

const TravelDealsSlider = () => {
  const navigate = useNavigate();

  // Use custom hook to fetch all travel destinations from API
  const {
    destinations: travelDealsdata,
    loading,
    error,
  } = useTravelDestinations();

  const handleDealClick = (deal) => {
    navigate(`/property/${deal.id}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="TravelDealsSlider w-full max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-6">
          ✈️ Exclusive Travel Deals
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg">Loading featured deals...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="TravelDealsSlider w-full max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-6">
          ✈️ Exclusive Travel Deals
        </h2>
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter deals that have CTA enabled (only show deals with cta: true)
  const ctaDeals = travelDealsdata.filter((deal) => deal.cta === true);

  return (
    <div className="TravelDealsSlider w-full max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">
        ✈️ Exclusive Travel Deals
      </h2>

      {ctaDeals.length > 0 ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={ctaDeals.length > 1}
          className="w-full"
        >
          {ctaDeals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <div
                className="rounded-2xl shadow-lg overflow-hidden flex flex-col gap-2 items-center justify-center text-white pt-12 pb-14 bg-no-repeat bg-cover bg-center cursor-pointer relative"
                style={{
                  backgroundImage:
                    deal.ctaBgImageUrl || deal.ctaBgImage
                      ? `url(${deal.ctaBgImageUrl || deal.ctaBgImage})`
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                onClick={() => handleDealClick(deal)}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>

                {/* Content with relative positioning to appear above overlay */}
                <div className="relative z-10 flex flex-col gap-2 items-center justify-center">
                  <p className=" transform translate-x-full">
                    {deal.duration}
                  </p>
                  <h2 className="text-9xl font-melodrama tracking-tighter relative ">
                    {deal.country}
                  </h2>
                  <p className="text-xl">Explore your journey</p>
                  <div className="flex gap-8 items-center">
                    <div className="mt-3 flex flex-col items-center justify-between">
                      <p className="flex gap-2 items-center ">
                        <span className="line-through text-gray-200 text-xs">
                          ${deal.oldPrice.toFixed(2)}
                        </span>
                        <span className="text-2xl">
                          ${deal.price.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-xs uppercase ">
                        Offer price per person
                      </p>
                    </div>
                    <Button variant="primary" size="lg">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No featured deals available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelDealsSlider;
