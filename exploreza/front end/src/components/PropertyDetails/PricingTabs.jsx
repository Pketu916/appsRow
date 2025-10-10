import React from "react";
import Button from "../UI/button";
import { formatPriceWithCurrency } from "../../utils/currencyUtils";

const PricingTabs = ({
  selectedPlan,
  setSelectedPlan,
  deal,
  handleBookNow,
}) => {
  const planOptions = [
    { key: "deluxe", name: "Deluxe", icon: "🏨", color: "bg-gray-500" },
    {
      key: "superDeluxe",
      name: "Super Deluxe",
      icon: "🏢",
      color: "bg-green-500",
    },
    { key: "luxury", name: "Luxury", icon: "🏰", color: "bg-purple-500" },
  ];

  const getPlanName = (planKey) => {
    switch (planKey) {
      case "deluxe":
        return "Deluxe";
      case "superDeluxe":
        return "Super Deluxe";
      case "luxury":
        return "Luxury";
      default:
        return "Package";
    }
  };

  return (
    <div className="space-y-6">
      {/* Pricing Plans Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Choose Your Package
            </h2>
          </div>

          {/* Plan Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {planOptions.map((plan) => (
              <button
                key={plan.key}
                onClick={() => setSelectedPlan(plan.key)}
                className={`flex flex-col items-center justify-center px-4 py-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedPlan === plan.key
                    ? `${plan.color} text-white shadow-lg transform scale-105`
                    : "bg-white/20 text-white/80 hover:bg-white/30 hover:scale-102"
                }`}
              >
                <span className="text-2xl mb-1">{plan.icon}</span>
                <span className="text-sm font-semibold">{plan.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Plan Details */}
        <div className="p-6">
          {deal.plans && deal.plans[selectedPlan] ? (
            <div className="space-y-6">
              {/* Pricing Section */}
              <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
                {deal.plans[selectedPlan].price ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-5xl font-bold text-blue-600">
                        {formatPriceWithCurrency(
                          deal.plans[selectedPlan].price,
                          deal.currency
                        )}
                      </span>
                      {deal.plans[selectedPlan].oldPrice && (
                        <span className="text-2xl text-gray-500 line-through ml-4">
                          {formatPriceWithCurrency(
                            deal.plans[selectedPlan].oldPrice,
                            deal.currency
                          )}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg mb-3">per person</p>
                    {deal.plans[selectedPlan].oldPrice &&
                      deal.plans[selectedPlan].oldPrice >
                        deal.plans[selectedPlan].price && (
                        <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {Math.round(
                            ((deal.plans[selectedPlan].oldPrice -
                              deal.plans[selectedPlan].price) /
                              deal.plans[selectedPlan].oldPrice) *
                              100
                          )}
                          % OFF
                        </div>
                      )}
                  </>
                ) : (
                  <div>
                    <div className="w-max bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 p-1">
                      <svg
                        className="w-10 h-10 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Custom Pricing Available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get personalized pricing based on your travel dates and
                      group size
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800 font-medium mb-2">
                        Contact us for a quote:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 text-sm text-blue-700">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          info@exploreza.com
                        </span>
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          +91 9876543210
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Plan Features */}
              {deal.plans[selectedPlan].facilities &&
                deal.plans[selectedPlan].facilities.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Package Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {deal.plans[selectedPlan].facilities.map(
                        (facility, index) => (
                          <div
                            key={index}
                            className="flex items-center text-base text-gray-700"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {facility}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Description */}
              {deal.plans[selectedPlan].description && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Package Description
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {deal.plans[selectedPlan].description}
                  </p>
                </div>
              )}

              {/* Book Now Button */}
              <Button
                onClick={handleBookNow}
                variant="primary"
                size="md"
                className={`flex items-center w-max transform transition-all duration-200 ${
                  deal.plans[selectedPlan].price
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                }`}
              >
                {deal.plans[selectedPlan].price ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Book {getPlanName(selectedPlan)} Package
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Get Quote for {getPlanName(selectedPlan)} Package
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-lg">Pricing information not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingTabs;
