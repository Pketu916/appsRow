import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTravelDestinations } from "../../hooks/useTravelDestinations";
import TravelCard from "../UI/TravelCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TravelDeals = () => {
  const [selectedCountries, setSelectedCountries] = useState(["India"]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const navigate = useNavigate();

  // Use custom hook to fetch travel destinations from API
  const {
    destinations: travelDeals,
    loading,
    error,
    fetchDestinations,
  } = useTravelDestinations();

  const handleDealClick = (deal) => {
    navigate(`/property/${deal.id}`);
  };

  // Handle country selection
  const handleCountryToggle = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  // Handle state selection
  const handleStateToggle = (state) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter((s) => s !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };

  // Clear all selections
  const clearAllCountries = () => {
    setSelectedCountries([]);
  };

  const clearAllStates = () => {
    setSelectedStates([]);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setIsStateOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamically generate the list of countries from API data
  const countries = [
    ...Array.from(new Set(travelDeals.map((deal) => deal.country))),
  ];

  // Dynamically generate the list of states from API data for selected countries
  const states = [
    ...Array.from(
      new Set(
        travelDeals
          .filter((deal) => selectedCountries.includes(deal.country))
          .flatMap((deal) => deal.states || [])
      )
    ),
  ].sort();

  // Filter deals by selected countries and states
  const filteredDeals = travelDeals.filter((deal) => {
    const countryMatch =
      selectedCountries.length === 0 ||
      selectedCountries.includes(deal.country);
    const stateMatch =
      selectedStates.length === 0 ||
      (deal.states &&
        deal.states.some((state) => selectedStates.includes(state)));
    return countryMatch && stateMatch;
  });

  // Fetch destinations when component mounts
  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // Show loading state
  if (loading) {
    return (
      <section className="px-5 max-w-7xl mx-auto flex items-center flex-col">
        <h1 className="text-4xl font-medium">
          Find your weekends destinations
        </h1>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg">Loading destinations...</span>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="px-5 max-w-7xl mx-auto flex items-center flex-col">
        <h1 className="text-4xl font-medium">
          Find your weekends destinations
        </h1>
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">Error: {error}</p>
            <button
              onClick={() => fetchDestinations()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto flex items-center flex-col">
      <h1 className="text-4xl font-bold text-center pb-4">
        Find your weekends destinations
      </h1>
      {/* Filter Section */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Country Filter Dropdown */}
          <div className="relative" ref={countryRef}>
            <button
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center justify-between w-full md:w-64 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <span className="text-sm font-medium text-gray-700">
                {selectedCountries.length === 0
                  ? "Select Countries"
                  : `${selectedCountries.length} Countries Selected`}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isCountryOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isCountryOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                <div className="p-2">
                  {selectedCountries.length > 0 && (
                    <div className="flex justify-between items-center p-2 border-b border-gray-100">
                      <span className="text-xs text-gray-500">
                        Selected: {selectedCountries.length}
                      </span>
                      <button
                        onClick={clearAllCountries}
                        className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                  <div className="space-y-1">
                    {countries.map((country) => (
                      <label
                        key={country}
                        className="flex items-center gap-3 p-2 hover:bg-orange-50 rounded cursor-pointer transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCountries.includes(country)}
                          onChange={() => handleCountryToggle(country)}
                          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* State Filter Dropdown */}
          <div className="relative" ref={stateRef}>
            <button
              onClick={() => setIsStateOpen(!isStateOpen)}
              disabled={states.length === 0}
              className={`flex items-center justify-between w-full md:w-64 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                states.length === 0
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 hover:border-orange-300"
              }`}
            >
              <span className="text-sm font-medium">
                {states.length === 0
                  ? "No States Available"
                  : selectedStates.length === 0
                  ? "Select States"
                  : `${selectedStates.length} States Selected`}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isStateOpen ? "rotate-180" : ""
                } ${states.length === 0 ? "text-gray-300" : "text-gray-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isStateOpen && states.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                <div className="p-2">
                  {selectedStates.length > 0 && (
                    <div className="flex justify-between items-center p-2 border-b border-gray-100">
                      <span className="text-xs text-gray-500">
                        Selected: {selectedStates.length}
                      </span>
                      <button
                        onClick={clearAllStates}
                        className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                  <div className="space-y-1">
                    {states.map((state) => (
                      <label
                        key={state}
                        className="flex items-center gap-3 p-2 hover:bg-orange-50 rounded cursor-pointer transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStates.includes(state)}
                          onChange={() => handleStateToggle(state)}
                          className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">{state}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Filters Display */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {selectedCountries.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {country}
              <button
                onClick={() => handleCountryToggle(country)}
                className="ml-1 text-orange-600 hover:text-orange-800"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
          {selectedStates.map((state) => (
            <span
              key={state}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {state}
              <button
                onClick={() => handleStateToggle(state)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Travel Deals Slider */}
      <div className="w-full relative">
        {/* Left Navigation Button */}
        {filteredDeals.length > 0 && (
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Navigation Button */}
        {filteredDeals.length > 0 && (
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {filteredDeals.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
              hideOnClick: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="travel-deals-swiper"
          >
            {filteredDeals.map((deal) => (
              <SwiperSlide key={deal.id}>
                <TravelCard deal={deal} onClick={handleDealClick} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              No deals found for the selected filters
            </p>
            {selectedCountries.length > 0 && (
              <p className="text-gray-500 mt-2">
                Countries: {selectedCountries.join(", ")}
              </p>
            )}
            {selectedStates.length > 0 && (
              <p className="text-gray-500 mt-1">
                States: {selectedStates.join(", ")}
              </p>
            )}
            {travelDeals.length === 0 && (
              <p className="text-gray-500 mt-2">
                No travel destinations available at the moment.
              </p>
            )}
          </div>
        )}

        {/* Pagination Dots */}
        {filteredDeals.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="swiper-pagination-custom"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelDeals;
