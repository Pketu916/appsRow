const mongoose = require("mongoose");
const Place = require("../models/Place");
require("dotenv").config({ path: "./config.env" });

// Sample places data
const samplePlaces = [
  // Domestic Places (India)
  {
    name: "Delhi",
    state: "Delhi",
    country: "India",
    description: "Capital city of India with rich history and culture",
    highlights: ["Red Fort", "India Gate", "Qutub Minar", "Lotus Temple"],
    attractions: [
      "Chandni Chowk",
      "Connaught Place",
      "Humayun's Tomb",
      "Akshardham Temple",
    ],
    bestTimeToVisit: "October to March",
    duration: "2-3 days",
    coordinates: {
      latitude: 28.6139,
      longitude: 77.209,
    },
    isActive: true,
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    country: "India",
    description: "Home to the iconic Taj Mahal",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"],
    attractions: ["Mehtab Bagh", "Itmad-ud-Daulah", "Sikandra"],
    bestTimeToVisit: "October to March",
    duration: "1-2 days",
    coordinates: {
      latitude: 27.1767,
      longitude: 78.0081,
    },
    isActive: true,
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    description: "The Pink City, known for its palaces and forts",
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Jantar Mantar"],
    attractions: ["Nahargarh Fort", "Jal Mahal", "Albert Hall Museum"],
    bestTimeToVisit: "October to March",
    duration: "2-3 days",
    coordinates: {
      latitude: 26.9124,
      longitude: 75.7873,
    },
    isActive: true,
  },
  {
    name: "Goa",
    state: "Goa",
    country: "India",
    description: "Beach paradise with Portuguese heritage",
    highlights: ["Beaches", "Portuguese Architecture", "Nightlife"],
    attractions: [
      "Calangute Beach",
      "Baga Beach",
      "Old Goa",
      "Dudhsagar Falls",
    ],
    bestTimeToVisit: "November to March",
    duration: "3-5 days",
    coordinates: {
      latitude: 15.2993,
      longitude: 74.124,
    },
    isActive: true,
  },
  {
    name: "Kerala",
    state: "Kerala",
    country: "India",
    description: "God's Own Country with backwaters and hill stations",
    highlights: ["Backwaters", "Hill Stations", "Ayurveda", "Beaches"],
    attractions: ["Alleppey Backwaters", "Munnar", "Kochi", "Kovalam Beach"],
    bestTimeToVisit: "October to March",
    duration: "5-7 days",
    coordinates: {
      latitude: 10.8505,
      longitude: 76.2711,
    },
    isActive: true,
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    description: "Financial capital and Bollywood hub",
    highlights: [
      "Gateway of India",
      "Marine Drive",
      "Bollywood",
      "Street Food",
    ],
    attractions: [
      "Elephanta Caves",
      "Siddhivinayak Temple",
      "Juhu Beach",
      "CST Station",
    ],
    bestTimeToVisit: "October to March",
    duration: "2-3 days",
    coordinates: {
      latitude: 19.076,
      longitude: 72.8777,
    },
    isActive: true,
  },

  // International Places
  {
    name: "Dubai",
    state: "Dubai",
    country: "UAE",
    description: "Modern city with luxury shopping and skyscrapers",
    highlights: [
      "Burj Khalifa",
      "Dubai Mall",
      "Palm Jumeirah",
      "Desert Safari",
    ],
    attractions: [
      "Dubai Fountain",
      "Burj Al Arab",
      "Dubai Marina",
      "Gold Souk",
    ],
    bestTimeToVisit: "November to March",
    duration: "4-5 days",
    coordinates: {
      latitude: 25.2048,
      longitude: 55.2708,
    },
    isActive: true,
  },
  {
    name: "Singapore",
    state: "Singapore",
    country: "Singapore",
    description: "Modern city-state with diverse culture",
    highlights: [
      "Marina Bay Sands",
      "Gardens by the Bay",
      "Sentosa Island",
      "Chinatown",
    ],
    attractions: [
      "Universal Studios",
      "Singapore Flyer",
      "Merlion Park",
      "Little India",
    ],
    bestTimeToVisit: "Year-round",
    duration: "3-4 days",
    coordinates: {
      latitude: 1.3521,
      longitude: 103.8198,
    },
    isActive: true,
  },
  {
    name: "Bangkok",
    state: "Bangkok",
    country: "Thailand",
    description: "Vibrant city with temples and street food",
    highlights: [
      "Grand Palace",
      "Wat Pho",
      "Chatuchak Market",
      "Floating Markets",
    ],
    attractions: [
      "Khao San Road",
      "Jim Thompson House",
      "Lumpini Park",
      "Asiatique",
    ],
    bestTimeToVisit: "November to March",
    duration: "3-4 days",
    coordinates: {
      latitude: 13.7563,
      longitude: 100.5018,
    },
    isActive: true,
  },
  {
    name: "Paris",
    state: "Île-de-France",
    country: "France",
    description: "City of Light with art, fashion, and cuisine",
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame",
      "Champs-Élysées",
    ],
    attractions: [
      "Arc de Triomphe",
      "Montmartre",
      "Seine River Cruise",
      "Versailles",
    ],
    bestTimeToVisit: "April to October",
    duration: "4-5 days",
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    isActive: true,
  },
  {
    name: "London",
    state: "England",
    country: "United Kingdom",
    description: "Historic city with royal heritage",
    highlights: [
      "Big Ben",
      "Tower of London",
      "Buckingham Palace",
      "British Museum",
    ],
    attractions: [
      "London Eye",
      "Westminster Abbey",
      "Hyde Park",
      "Covent Garden",
    ],
    bestTimeToVisit: "May to September",
    duration: "4-5 days",
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
    isActive: true,
  },
  {
    name: "New York",
    state: "New York",
    country: "United States",
    description: "The Big Apple with iconic landmarks",
    highlights: [
      "Statue of Liberty",
      "Times Square",
      "Central Park",
      "Empire State Building",
    ],
    attractions: ["Broadway", "Brooklyn Bridge", "9/11 Memorial", "High Line"],
    bestTimeToVisit: "April to June, September to November",
    duration: "5-7 days",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    isActive: true,
  },
];

const seedPlaces = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing places
    await Place.deleteMany({});
    console.log("Cleared existing places");

    // Insert sample places
    const createdPlaces = await Place.insertMany(samplePlaces);
    console.log(`Created ${createdPlaces.length} places`);

    // Display summary
    const domesticCount = createdPlaces.filter(
      (p) => p.country === "India"
    ).length;
    const internationalCount = createdPlaces.length - domesticCount;

    console.log("\n=== Places Summary ===");
    console.log(`Total Places: ${createdPlaces.length}`);
    console.log(`Domestic (India): ${domesticCount}`);
    console.log(`International: ${internationalCount}`);

    console.log("\n=== Domestic Places ===");
    createdPlaces
      .filter((p) => p.country === "India")
      .forEach((place) => {
        console.log(`- ${place.name}, ${place.state}`);
      });

    console.log("\n=== International Places ===");
    createdPlaces
      .filter((p) => p.country !== "India")
      .forEach((place) => {
        console.log(`- ${place.name}, ${place.country}`);
      });

    console.log("\nPlaces seeded successfully!");
  } catch (error) {
    console.error("Error seeding places:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seeder
seedPlaces();
