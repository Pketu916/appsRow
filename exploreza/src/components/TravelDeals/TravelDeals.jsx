import React, { useState } from "react";
import travelDealsData from "../../../travelDealsdata";
import TravelCard from "../UI/TravelCard";
import CountryFilter from "./CountryFilter";

const TravelDeals = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [travelDeals, setTravelDeals] = useState(travelDealsData);

  // Dynamically generate the list of countries from data
  const countries = [
    "All",
    ...Array.from(new Set(travelDeals.map((deal) => deal.country))),
  ];

  const filteredDeals =
    selectedCountry === "All"
      ? travelDeals
      : travelDeals.filter((deal) => deal.country === selectedCountry);

  return (
    <section className="px-5 max-w-7xl mx-auto flex items-center flex-col">
      <h1 className="text-4xl font-medium ">Find your weekends destinations</h1>

      {/* Country Filter */}
      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />

      {/* Travel Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => <TravelCard key={deal.id} deal={deal} />)
        ) : (
          <p>No deals found for "{selectedCountry}"</p>
        )}
      </div>
    </section>
  );
};

export default TravelDeals;
