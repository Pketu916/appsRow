import React from "react";
import BreadcrumbNavigation from "./BreadcrumbNavigation";

const HeroSection = ({ deal, selectedPlan, setSelectedPlan }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-16 overflow-hidden">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNavigation />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/8 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title with Enhanced Styling */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
              {deal.title}
            </h1>
            <div className="w-44 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>

          {/* Enhanced Info Cards */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white/80 text-sm">Location</p>
                <p className="text-white font-semibold">{deal.country}</p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-white"
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
              <div className="text-left">
                <p className="text-white/80 text-sm">Duration</p>
                <p className="text-white font-semibold">{deal.duration}</p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 bg-yellow-500/30 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-white"
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
              <div className="text-left">
                <p className="text-white/80 text-sm">Rating</p>
                <p className="text-white font-semibold">
                  {deal.rating}/5 ({deal.reviews} reviews)
                </p>
              </div>
            </div>
          </div>

          {/* Trip Dates */}
          {(deal.departureDateEnabled || deal.returnDateEnabled) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
              {deal.departureDateEnabled && deal.departureDate && (
                <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white/80 text-sm">Departure</p>
                    <p className="text-white font-semibold">
                      {new Date(deal.departureDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              )}

              {deal.returnDateEnabled && deal.returnDate && (
                <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-10 h-10 bg-red-500/30 rounded-full flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white/80 text-sm">Return</p>
                    <p className="text-white font-semibold">
                      {new Date(deal.returnDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Tags */}
          {deal.tags && deal.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {deal.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-6 py-3 text-sm font-semibold rounded-full backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 ${
                    tag === "Recommended"
                      ? "bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white shadow-lg"
                      : tag === "Only for couples"
                      ? "bg-gradient-to-r from-pink-500/80 to-rose-500/80 text-white shadow-lg"
                      : tag === "Family trip"
                      ? "bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
