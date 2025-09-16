import React from "react";

const TravelCard = ({ deal }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={deal.image}
        alt={deal.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{deal.title}</h2>
        <p className="text-gray-500 text-sm">{deal.duration}</p>
        <p className="mt-2 text-gray-700">{deal.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-blue-600">
            ${deal.price.toFixed(2)}
          </span>
          <span className="line-through text-gray-400">
            ${deal.oldPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
