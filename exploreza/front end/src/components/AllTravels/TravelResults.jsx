import React from "react";
import TravelCard from "../UI/TravelCard";

const TravelResults = ({
  filteredDeals,
  totalDeals,
  selectedCountry,
  selectedCategory,
  searchQuery,
  onDealClick,
}) => {
  const getResultsTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (selectedCountry !== "All" && selectedCategory !== "All") {
      return `${selectedCategory} packages in ${selectedCountry}`;
    }
    if (selectedCountry !== "All") {
      return `All packages in ${selectedCountry}`;
    }
    if (selectedCategory !== "All") {
      return `All ${selectedCategory} packages`;
    }
    return "All Travel Packages";
  };

  if (filteredDeals.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🔍</div>
        <h3 className="text-4xl font-bold text-gray-900 mb-6">
          No packages found
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {searchQuery
            ? `No results found for "${searchQuery}". Try different keywords or clear your search.`
            : "Try adjusting your filters to see more results"}
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Suggestions:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try different keywords</li>
            <li>• Use more general terms</li>
            <li>• Clear all filters</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {getResultsTitle()}
        </h2>
        <p className="text-lg text-gray-600">
          Showing {filteredDeals.length} of {totalDeals} packages
        </p>
      </div>

      {/* Travel Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <TravelCard key={deal.id} deal={deal} onClick={onDealClick} />
        ))}
      </div>

      {/* Results Footer */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Found {filteredDeals.length} amazing destinations for your next
          adventure
        </p>
      </div>
    </div>
  );
};

export default TravelResults;
