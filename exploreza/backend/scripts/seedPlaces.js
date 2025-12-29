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
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1535392779539-228ae50151f5?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1519148331902-567ed8e9e5d9?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1596195869248-47b29e8a1ac9?w=800",
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1504950531248-0c7d43ee6d75?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1565035010268-a3816f985123?w=800",
      "https://images.unsplash.com/photo-1535035779776-7e38d5b1a295?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1476782376802-32a9afb5995c?w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1513494789931-28cb2994669e?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1526761122248-27c4c0c21f20?w=800",
      "https://images.unsplash.com/photo-1519869325930-281384ef6c9b?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1551732998-d092b38fa374?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      "https://images.unsplash.com/photo-1529258283598-8d07f75e2841?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
      "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1543401457-b5f0b4b3c92e?w=800",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800",
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=800",
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    ],
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
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800",
      "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=800",
    ],
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

    console.log("\n✅ Places seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding places:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seeder
seedPlaces();
