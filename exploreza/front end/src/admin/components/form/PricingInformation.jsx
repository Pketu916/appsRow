import React from "react";

const PricingInformation = ({ formData, handleInputChange }) => {
  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];

  const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency ? currency.symbol : "₹";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Pricing Information</h3>

      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Currency *
        </label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.symbol} {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price ({getCurrencySymbol(formData.currency)}) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Old Price ({getCurrencySymbol(formData.currency)})
          </label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Offer</label>
        <input
          type="text"
          name="offer"
          value={formData.offer}
          onChange={handleInputChange}
          placeholder="e.g., 10% off"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default PricingInformation;
