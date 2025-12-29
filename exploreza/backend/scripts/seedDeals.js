const mongoose = require("mongoose");
const Deal = require("../models/Deal");
require("dotenv").config({ path: "./config.env" });

const sampleDeals = [
  {
    title: "Maldives Honeymoon Paradise",
    country: "Maldives",
    duration: "5 Days 4 Nights",
    rating: 4.8,
    reviews: 342,
    offer: "Special Honeymoon Package",
    category: "Honeymoon trip",
    price: 899,
    oldPrice: 1299,
    currency: "USD",
    description:
      "Experience the ultimate romantic getaway in the pristine waters of Maldives. Stay in overwater villas with stunning ocean views.",
    highlights: [
      "Overwater Villa Stay",
      "Private Beach Access",
      "Romantic Dinner Setup",
      "Snorkeling Experience",
      "Spa Treatments",
    ],
    inclusions: [
      "Accommodation",
      "Meals (Breakfast & Dinner)",
      "Airport Transfers",
      "Activity Charges",
    ],
    exclusions: [
      "Flight Tickets",
      "Personal Expenses",
      "Optional Activities",
      "Insurance",
    ],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    ],
    isActive: true,
    maxGuests: 2,
    minGuests: 1,
  },
  {
    title: "Swiss Alps Family Adventure",
    country: "Switzerland",
    duration: "7 Days 6 Nights",
    rating: 4.9,
    reviews: 512,
    offer: "Family Special Discount",
    category: "Family trip",
    price: 1499,
    oldPrice: 1999,
    currency: "USD",
    description:
      "Explore the breathtaking Swiss Alps with your family. Enjoy mountain views, cable car rides, and Swiss hospitality.",
    highlights: [
      "Mountain Cable Car Ride",
      "Lucerne City Tour",
      "Swiss Cheese Factory Visit",
      "Lake Geneva Cruise",
      "Jungfraujoch Excursion",
    ],
    inclusions: ["Accommodation", "Breakfast", "Train Passes", "Guided Tours"],
    exclusions: [
      "International Flights",
      "Lunch & Dinner",
      "Personal Expenses",
    ],
    image: "https://images.unsplash.com/photo-1534361960057-19889dbdf1bb?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    ],
    isActive: true,
    maxGuests: 4,
    minGuests: 2,
  },
  {
    title: "Bali Solo Adventure",
    country: "Indonesia",
    duration: "6 Days 5 Nights",
    rating: 4.7,
    reviews: 289,
    offer: "Solo Traveler Special",
    category: "Solo trip",
    price: 599,
    oldPrice: 799,
    currency: "USD",
    description:
      "Discover the beauty of Bali on your own terms. From rice terraces to beach parties, experience the island's diverse culture.",
    highlights: [
      "Ubud Rice Terrace Visit",
      "Tanah Lot Temple Tour",
      "Sunset Beach Party",
      "Waterfall Trekking",
      "Balinese Cooking Class",
    ],
    inclusions: [
      "Accommodation in Hostel",
      "Breakfast",
      "Group Tours",
      "Transportation",
    ],
    exclusions: ["Flight Tickets", "Personal Meals", "Optional Activities"],
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1539650116574-75c0c6a73e6c?w=800",
    ],
    isActive: true,
    maxGuests: 8,
    minGuests: 1,
  },
  {
    title: "Manali Trekking Expedition",
    country: "India",
    duration: "5 Days 4 Nights",
    rating: 4.6,
    reviews: 421,
    offer: "Early Bird Discount",
    category: "Hiking and trekking",
    price: 399,
    oldPrice: 599,
    currency: "INR",
    description:
      "Trek through the majestic mountains of Manali. Experience snow-capped peaks, lush valleys, and adventure activities.",
    highlights: [
      "Hampta Pass Trek",
      "Solang Valley Visit",
      "River Rafting",
      "Rock Climbing",
      "Camping Under Stars",
    ],
    inclusions: [
      "Camping Accommodation",
      "All Meals",
      "Trekking Guide",
      "Equipment Rental",
    ],
    exclusions: ["Transportation to Manali", "Travel Insurance"],
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800",
    ],
    isActive: true,
    maxGuests: 15,
    minGuests: 4,
  },
  {
    title: "Dubai Business & Luxury",
    country: "UAE",
    duration: "4 Days 3 Nights",
    rating: 4.8,
    reviews: 189,
    offer: "Business Travel Special",
    category: "Business trip",
    price: 1299,
    oldPrice: 1799,
    currency: "USD",
    description:
      "Combine business with pleasure in the luxurious city of Dubai. Modern amenities and world-class service.",
    highlights: [
      "Burj Khalifa Visit",
      "Dubai Mall Shopping",
      "Desert Safari",
      "Business Center Access",
      "Fine Dining",
    ],
    inclusions: [
      "5-Star Hotel",
      "Breakfast",
      "Airport Transfers",
      "Business Services",
    ],
    exclusions: ["International Flights", "Lunch & Dinner"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
      "https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?w=800",
    ],
    isActive: true,
    maxGuests: 2,
    minGuests: 1,
  },
  {
    title: "Goa Beach Holiday",
    country: "India",
    duration: "7 Days 6 Nights",
    rating: 4.5,
    reviews: 678,
    offer: "Beach Lovers Special",
    category: "Beach Holiday",
    price: 299,
    oldPrice: 499,
    currency: "INR",
    description:
      "Unwind on the golden beaches of Goa. Enjoy water sports, beach parties, and Portuguese heritage sites.",
    highlights: [
      "Baga Beach Stay",
      "Water Sports Package",
      "Sunset Cruise",
      "Spice Plantation Tour",
      "Dudhsagar Waterfalls",
    ],
    inclusions: [
      "Beach Resort Stay",
      "Breakfast",
      "Water Sports Activities",
      "Local Tours",
    ],
    exclusions: ["Flight Tickets", "Lunch & Dinner", "Personal Expenses"],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      "https://images.unsplash.com/photo-1476782376802-32a9afb5995c?w=800",
    ],
    isActive: true,
    maxGuests: 6,
    minGuests: 2,
  },
  {
    title: "Thailand Group Tour",
    country: "Thailand",
    duration: "8 Days 7 Nights",
    rating: 4.7,
    reviews: 456,
    offer: "Group Booking Discount",
    category: "Group trip",
    price: 799,
    oldPrice: 1099,
    currency: "USD",
    description:
      "Explore the vibrant culture of Thailand with friends. From temples to beaches, experience the best of Southeast Asia.",
    highlights: [
      "Bangkok City Tour",
      "Pattaya Beach",
      "Phi Phi Islands",
      "Floating Markets",
      "Thai Massage & Spa",
    ],
    inclusions: [
      "Hotel Accommodation",
      "Breakfast",
      "Group Tours",
      "Internal Transportation",
    ],
    exclusions: [
      "International Flights",
      "Meals",
      "Personal Shopping",
      "Optional Activities",
    ],
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800",
    ],
    isActive: true,
    maxGuests: 25,
    minGuests: 8,
  },
  {
    title: "Kerala Backwaters Adventure",
    country: "India",
    duration: "6 Days 5 Nights",
    rating: 4.9,
    reviews: 523,
    offer: "Monsoon Special",
    category: "Adventure trip",
    price: 449,
    oldPrice: 699,
    currency: "INR",
    description:
      "Cruise through the serene backwaters of Kerala. Experience Ayurvedic treatments, elephant rides, and traditional cuisine.",
    highlights: [
      "Houseboat Stay",
      "Ayurvedic Spa",
      "Elephant Sanctuary",
      "Tiger Reserve Visit",
      "Kathakali Dance Show",
    ],
    inclusions: [
      "Houseboat Accommodation",
      "All Meals",
      "Ayurvedic Treatment",
      "Cultural Shows",
    ],
    exclusions: ["Flight Tickets", "Personal Expenses"],
    image: "https://images.unsplash.com/photo-1513494789931-28cb2994669e?w=800",
    additionalImages: [
      "https://images.unsplash.com/photo-1526761122248-27c4c0c21f20?w=800",
      "https://images.unsplash.com/photo-1519869325930-281384ef6c9b?w=800",
    ],
    isActive: true,
    maxGuests: 12,
    minGuests: 2,
  },
];

const seedDeals = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing deals
    await Deal.deleteMany({});
    console.log("Cleared existing deals");

    // Insert sample deals
    const createdDeals = await Deal.insertMany(sampleDeals);
    console.log(`Created ${createdDeals.length} deals`);

    // Display summary by category
    console.log("\n=== Deals Summary ===");
    console.log(`Total Deals: ${createdDeals.length}`);

    const categoryCounts = {};
    sampleDeals.forEach((deal) => {
      categoryCounts[deal.category] = (categoryCounts[deal.category] || 0) + 1;
    });

    console.log("\n=== Deals by Category ===");
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`${category}: ${count}`);
    });

    console.log("\n=== Deals List ===");
    createdDeals.forEach((deal, index) => {
      console.log(
        `${index + 1}. ${deal.title} - ${deal.country} (${deal.price} ${
          deal.currency
        })`
      );
    });

    console.log("\n✅ Deals seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding deals:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
};

// Run the seeder
seedDeals();
