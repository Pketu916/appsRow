const mongoose = require("mongoose");
const TravelDestination = require("../models/TravelDestination");
require("dotenv").config({ path: "./config.env" });

const sampleTravelDestinations = [
  {
    title: "Tropical Paradise - Maldives",
    tripType: "international",
    country: "Maldives",
    states: [],
    duration: "5 Days 4 Nights",
    rating: 4.8,
    reviews: 450,
    offer: "Early Bird Special",
    category: "Beach Holiday",
    plans: {
      deluxe: {
        price: 899,
        oldPrice: 1299,
        facilities: ["Overwater Villa", "Breakfast", "WiFi"],
        description: "Standard accommodation with basic amenities",
      },
      superDeluxe: {
        price: 1299,
        oldPrice: 1799,
        facilities: [
          "Deluxe Villa",
          "All Meals",
          "Airport Transfer",
          "Spa Access",
        ],
        description: "Premium accommodation with full-board meals",
      },
      luxury: {
        price: 1999,
        oldPrice: 2599,
        facilities: [
          "Luxury Villa",
          "Butler Service",
          "Private Pool",
          "All Meals",
          "Water Sports",
        ],
        description: "Ultimate luxury with personalized service",
      },
    },
    currency: "USD",
    description:
      "Experience the breathtaking beauty of Maldives with crystal-clear waters, pristine beaches, and world-class resorts.",
    highlights: [
      "Overwater Villa Experience",
      "Snorkeling & Diving",
      "Spa & Wellness",
      "Romantic Dinners",
      "Sunset Cruises",
    ],
    inclusions: ["Accommodation", "Breakfast", "Airport Transfer"],
    exclusions: ["International Flights", "Additional Meals"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    title: "Mountain Retreat - Shimla",
    tripType: "domestic",
    country: "India",
    states: ["Himachal Pradesh"],
    duration: "6 Days 5 Nights",
    rating: 4.6,
    reviews: 320,
    offer: "Honeymoon Special",
    category: "Honeymoon trip",
    plans: {
      deluxe: {
        price: 14999,
        oldPrice: 19999,
        facilities: ["Hotel Stay", "Breakfast", "Local Transport"],
        description: "Comfortable stay with essential amenities",
      },
      superDeluxe: {
        price: 22999,
        oldPrice: 27999,
        facilities: [
          "Luxury Hotel",
          "All Meals",
          "Sightseeing Tours",
          "Toy Train Ride",
        ],
        description: "Deluxe stay with guided experiences",
      },
      luxury: {
        price: 34999,
        oldPrice: 39999,
        facilities: [
          "5-Star Resort",
          "Private Cab",
          "Adventure Activities",
          "Couple Spa",
        ],
        description: "Premium mountain resort experience",
      },
    },
    currency: "INR",
    description:
      "Discover the colonial charm of Shimla nestled in the Himalayan mountains. Perfect for couples and families alike.",
    highlights: [
      "Colonial Heritage Tour",
      "Toy Train Journey",
      "Mountain Trekking",
      "Local Shopping",
      "Sunset Views",
    ],
    inclusions: ["Hotel Stay", "Breakfast", "Transport"],
    exclusions: ["Meals", "Optional Activities"],
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6a73e6c?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    ],
    isActive: true,
    isFeatured: false,
  },
  {
    title: "Cultural Heritage - Rajasthan",
    tripType: "domestic",
    country: "India",
    states: ["Rajasthan"],
    duration: "8 Days 7 Nights",
    rating: 4.9,
    reviews: 567,
    offer: "Festival Special",
    category: "Family trip",
    plans: {
      deluxe: {
        price: 24999,
        oldPrice: 32999,
        facilities: ["Heritage Hotels", "Breakfast", "AC Transport"],
        description: "Traditional stay with cultural insights",
      },
      superDeluxe: {
        price: 34999,
        oldPrice: 42999,
        facilities: [
          "Palace Hotels",
          "All Meals",
          "Camel Safari",
          "Cultural Shows",
        ],
        description: "Royal experience with cultural activities",
      },
      luxury: {
        price: 49999,
        oldPrice: 59999,
        facilities: [
          "Royal Palace Stay",
          "Private Transport",
          "Personal Guide",
          "Spa & Wellness",
        ],
        description: "Luxury royal experience",
      },
    },
    currency: "INR",
    description:
      "Explore the royal heritage of Rajasthan with magnificent palaces, forts, and vibrant culture.",
    highlights: [
      "City Palace Udaipur",
      "Amber Fort Jaipur",
      "Desert Safari Jaisalmer",
      "Cultural Performances",
      "Traditional Cuisine",
    ],
    inclusions: ["Hotel Stay", "Breakfast", "Sightseeing"],
    exclusions: ["Meals", "Personal Shopping"],
    image: "https://images.unsplash.com/photo-1560534157-3cefbb69c3c5?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1504950531248-0c7d43ee6d75?w=800",
      "https://images.unsplash.com/photo-1565035010268-a3816f985123?w=800",
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    title: "Adventure Sports - Rishikesh",
    tripType: "domestic",
    country: "India",
    states: ["Uttarakhand"],
    duration: "4 Days 3 Nights",
    rating: 4.7,
    reviews: 234,
    offer: "Thrill Seeker Package",
    category: "Adventure trip",
    plans: {
      deluxe: {
        price: 8999,
        oldPrice: 12999,
        facilities: ["Campsite Stay", "Meals", "Basic Activities"],
        description: "Budget adventure package",
      },
      superDeluxe: {
        price: 13999,
        oldPrice: 17999,
        facilities: [
          "Adventure Resort",
          "All Meals",
          "Water Rafting",
          "Bungee Jumping",
        ],
        description: "Complete adventure experience",
      },
      luxury: {
        price: 19999,
        oldPrice: 24999,
        facilities: [
          "Luxury Resort",
          "Premium Activities",
          "Flying Fox",
          "Spa & Yoga",
        ],
        description: "Luxury adventure with wellness",
      },
    },
    currency: "INR",
    description:
      "Indulge in extreme sports in the adventure capital of India. From river rafting to bungee jumping.",
    highlights: [
      "River Rafting",
      "Bungee Jumping",
      "Camping by River",
      "Rock Climbing",
      "Yoga & Meditation",
    ],
    inclusions: ["Accommodation", "Meals", "Activities"],
    exclusions: ["Transportation", "Personal Gear"],
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    ],
    isActive: true,
    isFeatured: false,
  },
  {
    title: "Island Hopping - Bali",
    tripType: "international",
    country: "Indonesia",
    states: [],
    duration: "7 Days 6 Nights",
    rating: 4.8,
    reviews: 389,
    offer: "Best Seller",
    category: "Honeymoon trip",
    plans: {
      deluxe: {
        price: 749,
        oldPrice: 999,
        facilities: ["Beach Villa", "Breakfast", "Airport Transfer"],
        description: "Relaxing beach stay",
      },
      superDeluxe: {
        price: 1149,
        oldPrice: 1499,
        facilities: [
          "Premium Villa",
          "All Meals",
          "Private Pool",
          "Spa Access",
        ],
        description: "Luxury villa experience",
      },
      luxury: {
        price: 1749,
        oldPrice: 2199,
        facilities: [
          "Private Villa",
          "Butler Service",
          "Water Sports",
          "Cultural Tours",
        ],
        description: "Ultimate Bali luxury",
      },
    },
    currency: "USD",
    description:
      "Explore the magical island of Bali with its stunning beaches, ancient temples, and vibrant nightlife.",
    highlights: [
      "Beach Villas",
      "Temple Tours",
      "Water Sports",
      "Spa Treatments",
      "Local Markets",
    ],
    inclusions: ["Villa Stay", "Breakfast", "Transport"],
    exclusions: ["International Flights", "Additional Meals"],
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1539650116574-75c0c6a73e6c?w=800",
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    title: "Wildlife Safari - Bandhavgarh",
    tripType: "domestic",
    country: "India",
    states: ["Madhya Pradesh"],
    duration: "5 Days 4 Nights",
    rating: 4.5,
    reviews: 198,
    offer: "Wildlife Enthusiast",
    category: "Family trip",
    plans: {
      deluxe: {
        price: 17999,
        oldPrice: 23999,
        facilities: ["Resort Stay", "Meals", "2 Safari Rides"],
        description: "Basic wildlife package",
      },
      superDeluxe: {
        price: 25999,
        oldPrice: 31999,
        facilities: [
          "Luxury Resort",
          "All Meals",
          "4 Safari Rides",
          "Naturalist Guide",
        ],
        description: "Enhanced safari experience",
      },
      luxury: {
        price: 37999,
        oldPrice: 44999,
        facilities: [
          "5-Star Resort",
          "Premium Meals",
          "Unlimited Safaris",
          "Photography Tour",
        ],
        description: "Ultimate wildlife experience",
      },
    },
    currency: "INR",
    description:
      "Witness the majestic Bengal tigers in their natural habitat. An unforgettable wildlife experience.",
    highlights: [
      "Tiger Spotting Safaris",
      "Bird Watching",
      "Naturalist Tours",
      "Village Visits",
      "Nature Walks",
    ],
    inclusions: ["Resort Stay", "Meals", "Safari Rides"],
    exclusions: ["Transportation", "Additional Safaris"],
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
      "https://images.unsplash.com/photo-1557886545-0e7b7a3b05fb?w=800",
    ],
    isActive: true,
    isFeatured: false,
  },
];

const seedTravelDestinations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing travel destinations
    await TravelDestination.deleteMany({});
    console.log("Cleared existing travel destinations");

    // Insert sample travel destinations
    const createdDestinations = await TravelDestination.insertMany(
      sampleTravelDestinations
    );
    console.log(`Created ${createdDestinations.length} travel destinations`);

    // Display summary
    console.log("\n=== Travel Destinations Summary ===");
    console.log(`Total Destinations: ${createdDestinations.length}`);

    const tripTypeCounts = {
      domestic: 0,
      international: 0,
    };

    createdDestinations.forEach((dest) => {
      tripTypeCounts[dest.tripType]++;
    });

    console.log("\n=== Destinations by Type ===");
    console.log(`Domestic: ${tripTypeCounts.domestic}`);
    console.log(`International: ${tripTypeCounts.international}`);

    console.log("\n=== Destinations List ===");
    createdDestinations.forEach((dest, index) => {
      console.log(
        `${index + 1}. ${dest.title} - ${dest.country} (${dest.tripType})`
      );
    });

    console.log("\n✅ Travel destinations seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding travel destinations:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seeder
seedTravelDestinations();
