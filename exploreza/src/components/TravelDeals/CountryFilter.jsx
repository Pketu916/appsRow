import React from "react";

const CountryFilter = ({ countries, selectedCountry, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-12 pt-5 pb-9">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => onSelect(country)}
          className={` ${
            selectedCountry === country
              ? "text-orange-600 "
              : "text-gray-700/60"
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
};

export default CountryFilter;
