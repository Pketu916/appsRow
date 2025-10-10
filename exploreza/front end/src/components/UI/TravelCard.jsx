import React from "react";
import Button from "./button";
import { formatPriceWithCurrency } from "../../utils/currencyUtils";

const TravelCard = ({ deal, onClick, className = "" }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(deal);
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={deal.imageUrl || deal.image || "/placeholder-image.jpg"}
          alt={deal.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {deal.tags && deal.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {deal.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  tag === "Recommended"
                    ? "bg-green-500 text-white"
                    : tag === "Only for couples"
                    ? "bg-pink-500 text-white"
                    : tag === "Family trip"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {deal.offer && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            {deal.offer}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1">{deal.title}</h2>
        <p className="text-gray-500 text-sm mb-1">{deal.duration}</p>
        <p className="text-gray-500 text-sm mb-2">{deal.country}</p>
        {deal.rating && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm text-gray-600">
              {deal.rating} ({deal.reviews} reviews)
            </span>
          </div>
        )}
        <p className="mt-2 text-gray-700 text-sm line-clamp-2">
          {deal.description}
        </p>
        {deal.departureDateEnabled && deal.departureDate && (
          <p className="text-gray-500 text-xs mt-2">
            Departure: {new Date(deal.departureDate).toLocaleDateString()}
          </p>
        )}
        {deal.returnDateEnabled && deal.returnDate && (
          <p className="text-gray-500 text-xs mt-1">
            Return: {new Date(deal.returnDate).toLocaleDateString()}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-orange-600">
              {formatPriceWithCurrency(deal.price, deal.currency)}
            </span>
            {deal.oldPrice && deal.oldPrice > 0 && (
              <span className="line-through text-gray-400 text-sm">
                {formatPriceWithCurrency(deal.oldPrice, deal.currency)}
              </span>
            )}
          </div>
          <Button variant="primary" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
