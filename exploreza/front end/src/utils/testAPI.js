// Simple API test utility
import travelDestinationsService from "../services/travelDestinationsService.js";

export const testTravelDestinationsAPI = async () => {
  console.log("🧪 Testing Travel Destinations API...");

  try {
    // Test 1: Get all travel destinations
    console.log("📡 Testing: Get all travel destinations");
    const allDestinations =
      await travelDestinationsService.getAllTravelDestinations();
    console.log("✅ All destinations:", allDestinations);

    // Test 2: Get featured travel destinations
    console.log("📡 Testing: Get featured travel destinations");
    const featuredDestinations =
      await travelDestinationsService.getFeaturedTravelDestinations();
    console.log("✅ Featured destinations:", featuredDestinations);

    // Test 3: Get destinations by country (if any destinations exist)
    if (allDestinations && allDestinations.length > 0) {
      const firstDestination = allDestinations[0];
      if (firstDestination.country) {
        console.log(
          `📡 Testing: Get destinations by country (${firstDestination.country})`
        );
        const countryDestinations =
          await travelDestinationsService.getTravelDestinationsByCountry(
            firstDestination.country
          );
        console.log(
          `✅ Destinations for ${firstDestination.country}:`,
          countryDestinations
        );
      }
    }

    // Test 4: Search destinations
    console.log("📡 Testing: Search destinations");
    const searchResults =
      await travelDestinationsService.searchTravelDestinations({ limit: 5 });
    console.log("✅ Search results:", searchResults);

    console.log("🎉 All API tests completed successfully!");
  } catch (error) {
    console.error("❌ API Test failed:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      stack: error.stack,
    });
  }
};

// Export for use in browser console or components
export default testTravelDestinationsAPI;
