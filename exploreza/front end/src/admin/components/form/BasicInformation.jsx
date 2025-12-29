import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../utils/externalAPI";

const BasicInformation = ({
  formData,
  handleInputChange,
  categories,
  fieldErrors = {},
}) => {
  const [countries, setCountries] = useState([]);

  // Fetch countries from external API
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const fetchedCountries = await fetchCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error loading countries:", error);
        setCountries([]);
      }
    };

    loadCountries();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            fieldErrors.title ? "border-red-300" : "border-gray-300"
          }`}
        />
        {fieldErrors.title && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Trip Type *
        </label>
        <select
          name="tripType"
          value={formData.tripType}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="domestic">Domestic</option>
          <option value="international">International</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country *
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          list="countries"
          required
          placeholder="Type to search or enter country name"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            fieldErrors.country ? "border-red-300" : "border-gray-300"
          }`}
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
          <option value="Other" />
        </datalist>
        {fieldErrors.country && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.country}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration *
        </label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
          placeholder="e.g., 8 Nights - 9 Days"
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            fieldErrors.duration ? "border-red-300" : "border-gray-300"
          }`}
        />
        {fieldErrors.duration && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.duration}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating *
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reviews *
          </label>
          <input
            type="number"
            name="reviews"
            value={formData.reviews}
            onChange={handleInputChange}
            min="0"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          list="categories"
          placeholder="Type to search or enter category"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <datalist id="categories">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default BasicInformation;
