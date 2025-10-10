import React from "react";
import {
  useTravelDestinations,
  useFeaturedTravelDestinations,
} from "../hooks/useTravelDestinations";

const APITestComponent = () => {
  const {
    destinations,
    loading: allLoading,
    error: allError,
    fetchDestinations,
  } = useTravelDestinations();

  const {
    featuredDestinations,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedTravelDestinations();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>

      {/* All Travel Destinations Test */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">All Travel Destinations</h2>

        {allLoading && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading all destinations...</span>
          </div>
        )}

        {allError && (
          <div className="text-red-600 mb-4">
            <p className="font-semibold">Error:</p>
            <p>{allError}</p>
            <button
              onClick={() => fetchDestinations()}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        )}

        {destinations && !allLoading && !allError && (
          <div>
            <p className="text-green-600 font-semibold mb-2">
              ✅ Successfully loaded {destinations.length} destinations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.slice(0, 6).map((destination) => (
                <div key={destination.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{destination.title}</h3>
                  <p className="text-sm text-gray-600">{destination.country}</p>
                  <p className="text-sm text-gray-500">
                    {destination.duration}
                  </p>
                  <p className="text-sm text-blue-600">${destination.price}</p>
                  {destination.image && (
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-32 object-cover rounded mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
            {destinations.length > 6 && (
              <p className="text-sm text-gray-500 mt-4">
                ... and {destinations.length - 6} more destinations
              </p>
            )}
          </div>
        )}
      </div>

      {/* Featured Travel Destinations Test */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Featured Travel Destinations
        </h2>

        {featuredLoading && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading featured destinations...</span>
          </div>
        )}

        {featuredError && (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <p>{featuredError}</p>
          </div>
        )}

        {featuredDestinations && !featuredLoading && !featuredError && (
          <div>
            <p className="text-green-600 font-semibold mb-2">
              ✅ Successfully loaded {featuredDestinations.length} featured
              destinations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredDestinations.map((destination) => (
                <div key={destination.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{destination.title}</h3>
                  <p className="text-sm text-gray-600">{destination.country}</p>
                  <p className="text-sm text-gray-500">
                    {destination.duration}
                  </p>
                  <p className="text-sm text-blue-600">${destination.price}</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                    Featured
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* API Endpoint Info */}
      <div className="p-6 border rounded-lg bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">API Information</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Base URL:</strong> http://localhost:5000/api
          </p>
          <p>
            <strong>All Destinations:</strong> GET /travel-destinations
          </p>
          <p>
            <strong>Featured Destinations:</strong> GET
            /travel-destinations/featured
          </p>
          <p>
            <strong>Single Destination:</strong> GET /travel-destinations/:id
          </p>
        </div>
      </div>
    </div>
  );
};

export default APITestComponent;
