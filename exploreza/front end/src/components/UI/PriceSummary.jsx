import React from "react";
import { formatPriceWithCurrency } from "../../utils/currencyUtils";

const PriceSummary = ({ deal, formData, calculateTotalPrice }) => {
  if (!deal || !formData) return null;

  const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
  const selectedPlan = formData.selectedPlan || "superDeluxe";

  // Dynamic pricing based on currency
  const currency = deal?.currency || "INR";
  const basePrices = {
    deluxe: currency === "USD" ? 60 : 5000,
    superDeluxe: currency === "USD" ? 100 : 8000,
    luxury: currency === "USD" ? 150 : 12000,
  };

  const planPrice =
    basePrices[selectedPlan] || (currency === "USD" ? 100 : 8000);
  const planName =
    selectedPlan === "deluxe"
      ? "Deluxe"
      : selectedPlan === "superDeluxe"
      ? "Super Deluxe"
      : selectedPlan === "luxury"
      ? "Luxury"
      : "Package";

  // Check if price is available
  const hasPrice = planPrice > 0;

  return (
    <div
      className={`p-6 rounded-xl border ${
        hasPrice
          ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
          : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-4 flex items-center ${
          hasPrice ? "text-gray-800" : "text-green-800"
        }`}
      >
        <svg
          className={`w-6 h-6 mr-2 ${
            hasPrice ? "text-blue-600" : "text-green-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        {hasPrice
          ? `Price Summary - ${planName} Package`
          : `Quote Request - ${planName} Package`}
      </h3>

      {hasPrice ? (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Selected Package:</span>
            <span className="font-semibold text-blue-600">{planName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price per person:</span>
            <span className="font-semibold">
              {formatPriceWithCurrency(planPrice, deal.currency)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Adults ({formData.adults}):</span>
            <span className="font-semibold">
              {formatPriceWithCurrency(
                planPrice * parseInt(formData.adults),
                deal.currency
              )}
            </span>
          </div>
          {parseInt(formData.children) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                Children ({formData.children}):
              </span>
              <span className="font-semibold">
                {formatPriceWithCurrency(
                  planPrice * 0.7 * parseInt(formData.children),
                  deal.currency
                )}
              </span>
            </div>
          )}
          <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">
              Total Amount:
            </span>
            <span className="text-2xl font-bold text-green-600">
              {formatPriceWithCurrency(calculateTotalPrice(), deal.currency)}
            </span>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> Final pricing will be confirmed after
              discussing your travel dates and requirements. Children under 12
              years get 30% discount.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-green-600"
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
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Custom Quote Required
            </h4>
            <p className="text-green-700 text-sm mb-4">
              We'll provide a personalized quote based on your travel details
            </p>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selected Package:</span>
                <span className="font-semibold text-green-600">{planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Adults:</span>
                <span className="font-semibold">{formData.adults}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Children:</span>
                <span className="font-semibold">{formData.children}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Guests:</span>
                <span className="font-semibold">{totalGuests}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-800">
              <strong>Note:</strong> Our team will contact you within 24 hours
              with a personalized quote based on your travel dates and group
              size.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
