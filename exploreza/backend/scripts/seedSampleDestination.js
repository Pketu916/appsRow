const mongoose = require("mongoose");
const TravelDestination = require("../models/TravelDestination");
const Place = require("../models/Place");
require("dotenv").config({ path: "./config.env" });

const seedSampleDestination = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get some places for the sample destination
    const delhi = await Place.findOne({ name: "Delhi" });
    const agra = await Place.findOne({ name: "Agra" });
    const jaipur = await Place.findOne({ name: "Jaipur" });

    if (!delhi || !agra || !jaipur) {
      console.log("Please run seedPlaces.js first to create places");
      return;
    }

    // Sample travel destination data
    const sampleDestination = {
      title: "Golden Triangle Tour - Delhi, Agra, Jaipur",
      tripType: "domestic",
      country: "India",
      duration: "6 Nights - 7 Days",
      rating: 4.5,
      reviews: 1250,
      offer: "Early Bird Discount",
      category: "Family trip",
      places: [
        {
          place: delhi._id,
          duration: "2 days",
          order: 1,
        },
        {
          place: agra._id,
          duration: "1 day",
          order: 2,
        },
        {
          place: jaipur._id,
          duration: "2 days",
          order: 3,
        },
      ],
      plans: {
        deluxe: {
          price: 25000,
          oldPrice: 30000,
          facilities: [
            "3 Star Hotel Accommodation",
            "Daily Breakfast",
            "AC Vehicle for Transfers",
            "Professional Guide",
            "Monument Entry Tickets",
            "Airport Transfers",
          ],
          hotelRating: "3 Star",
          description:
            "Comfortable stay with basic amenities and guided sightseeing",
        },
        superDeluxe: {
          price: 35000,
          oldPrice: 40000,
          facilities: [
            "4 Star Hotel Accommodation",
            "Daily Breakfast & Dinner",
            "AC Vehicle for Transfers",
            "Professional Guide",
            "Monument Entry Tickets",
            "Airport Transfers",
            "Cultural Show in Jaipur",
            "Shopping Assistance",
          ],
          hotelRating: "4 Star",
          description:
            "Premium accommodation with enhanced services and cultural experiences",
        },
        luxury: {
          price: 50000,
          oldPrice: 60000,
          facilities: [
            "5 Star Hotel Accommodation",
            "All Meals Included",
            "Luxury AC Vehicle",
            "Personal Guide",
            "Monument Entry Tickets",
            "Airport Transfers",
            "Cultural Show in Jaipur",
            "Shopping Assistance",
            "Spa Services",
            "Private Dining Experience",
          ],
          hotelRating: "5 Star",
          description:
            "Luxury accommodation with premium services and exclusive experiences",
        },
      },
      // Legacy fields for backward compatibility
      price: 25000,
      oldPrice: 30000,
      currency: "INR",
      description:
        "Explore the rich heritage of India with our Golden Triangle tour covering Delhi, Agra, and Jaipur. Experience the perfect blend of history, culture, and architecture.",
      highlights: [
        "Visit the iconic Taj Mahal",
        "Explore the magnificent Red Fort",
        "Experience the royal palaces of Jaipur",
        "Witness the architectural marvels",
        "Enjoy traditional Rajasthani culture",
      ],
      inclusions: [
        "Hotel accommodation as per plan",
        "Daily meals as specified",
        "AC vehicle for all transfers",
        "Professional guide services",
        "Monument entry tickets",
        "Airport transfers",
      ],
      exclusions: [
        "International/Domestic flights",
        "Personal expenses",
        "Tips and gratuities",
        "Travel insurance",
        "Any additional meals not mentioned",
      ],
      tags: ["Golden Triangle", "Heritage", "Culture", "History", "Family"],
      includes: [
        "Hotel accommodation as per plan",
        "Daily meals as specified",
        "AC vehicle for all transfers",
        "Professional guide services",
        "Monument entry tickets",
        "Airport transfers",
      ],
      departureDate: new Date("2024-03-01"),
      returnDate: new Date("2024-03-08"),
      difficulty: "Easy",
      isActive: true,
      isFeatured: true,
      cta: true,
    };

    // Clear existing sample destination
    await TravelDestination.deleteOne({ title: sampleDestination.title });
    console.log("Cleared existing sample destination");

    // Create the sample destination
    const createdDestination = await TravelDestination.create(
      sampleDestination
    );
    console.log("Created sample travel destination:", createdDestination.title);

    // Display the created destination with populated places
    const populatedDestination = await TravelDestination.findById(
      createdDestination._id
    ).populate("places.place", "name state country duration");

    console.log("\n=== Sample Destination Details ===");
    console.log(`Title: ${populatedDestination.title}`);
    console.log(`Trip Type: ${populatedDestination.tripType}`);
    console.log(`Duration: ${populatedDestination.duration}`);
    console.log(`Rating: ${populatedDestination.rating}/5`);
    console.log(`Reviews: ${populatedDestination.reviews}`);

    console.log("\n=== Places in this Trip ===");
    populatedDestination.places.forEach((placeData, index) => {
      console.log(
        `${index + 1}. ${placeData.place.name}, ${placeData.place.state} (${
          placeData.duration
        })`
      );
    });

    console.log("\n=== Pricing Plans ===");
    Object.entries(populatedDestination.plans).forEach(
      ([planName, planData]) => {
        console.log(
          `${planName.toUpperCase()}: ₹${planData.price.toLocaleString()}`
        );
        if (planData.oldPrice > planData.price) {
          const discount = Math.round(
            ((planData.oldPrice - planData.price) / planData.oldPrice) * 100
          );
          console.log(
            `  (Was ₹${planData.oldPrice.toLocaleString()}, ${discount}% OFF)`
          );
        }
        console.log(`  Hotel: ${planData.hotelRating}`);
        console.log(`  Facilities: ${planData.facilities.length} included`);
      }
    );

    console.log("\nSample destination created successfully!");
  } catch (error) {
    console.error("Error creating sample destination:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seeder
seedSampleDestination();
