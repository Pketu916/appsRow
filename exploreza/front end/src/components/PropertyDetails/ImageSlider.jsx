import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

// Custom Swiper styles
const swiperStyles = `
  .thumbnail-swiper .swiper-slide {
    width: auto;
  }
`;

const ImageSlider = ({ images, selectedImage, setSelectedImage, deal }) => {
  return (
    <>
      <style>{swiperStyles}</style>
      <div className="space-y-6">
        {/* Main Image Gallery with Swiper */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Swiper
            modules={[Thumbs]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            loopAdditionalSlides={1}
            onSlideChange={(swiper) => setSelectedImage(swiper.realIndex)}
            initialSlide={selectedImage}
            className="relative"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative group">
                  <img
                    src={image || "/placeholder-image.jpg"}
                    alt={`${deal.title} ${index + 1}`}
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                  />

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {index + 1} / {images.length}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Enhanced Pagination */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3  ">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative transition-all duration-300 ease-out ${
                        selectedImage === index
                          ? "w-8 h-2 bg-white rounded-full shadow-lg"
                          : "w-2 h-2 bg-white/60 rounded-full hover:bg-white/80 hover:scale-110"
                      }`}
                    >
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Swiper>
        </div>

        {/* Image Thumbnails with Swiper */}
        {images.length > 1 && (
          <div className="p-4 bg-gray-50">
            <Swiper
              modules={[FreeMode, Thumbs]}
              spaceBetween={8}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 8,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 8,
                },
              }}
              className="thumbnail-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative group">
                    <img
                      src={image || "/placeholder-image.jpg"}
                      alt={`${deal.title} ${index + 1}`}
                      className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                        selectedImage === index
                          ? "border-blue-500 shadow-lg scale-105"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedImage(index)}
                      loading="lazy"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Package Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Package Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Duration</span>
                <p className="font-semibold text-gray-900">{deal.duration}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Category</span>
                <p className="font-semibold text-gray-900">{deal.category}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Rating</span>
                <p className="font-semibold text-gray-900">
                  {deal.rating}/5 ⭐
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Reviews</span>
                <p className="font-semibold text-gray-900">
                  {deal.reviews} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
