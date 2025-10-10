import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTravelDestinations } from "../hooks/useTravelDestinations";
import Header from "../components/header";
import Footer from "../components/Footer";
import Marquee from "../components/marquee";
import HeroSection from "../components/AllTravels/HeroSection";
import StickyFilters from "../components/AllTravels/StickyFilters";
import MobileTopFilters from "../components/AllTravels/MobileTopFilters";
import TravelResults from "../components/AllTravels/TravelResults";

const TravelDestinations = () => {
  const navigate = useNavigate();

  // Use custom hook to fetch travel destinations from API
  const {
    destinations: travelDeals,
    loading,
    error,
    fetchDestinations,
  } = useTravelDestinations();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique countries and categories
  const countries = useMemo(
    () => [
      "All",
      ...Array.from(new Set(travelDeals.map((deal) => deal.country))),
    ],
    [travelDeals]
  );

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(travelDeals.map((deal) => deal.category))),
    ],
    [travelDeals]
  );

  // Filter deals based on search query and selected filters
  const filteredDeals = useMemo(() => {
    return travelDeals.filter((deal) => {
      // Comprehensive search across all deal properties
      const searchMatch =
        searchQuery === "" ||
        (() => {
          const query = searchQuery.toLowerCase();
          const searchableFields = [
            deal.title,
            deal.country,
            deal.description,
            deal.category,
            deal.duration,
            deal.groupSize,
            deal.currency,
            ...(deal.tags || []),
            ...(deal.highlights || []),
            ...(deal.includes || []),
          ];

          return searchableFields.some(
            (field) => field && field.toString().toLowerCase().includes(query)
          );
        })();

      const countryMatch =
        selectedCountry === "All" || deal.country === selectedCountry;
      const categoryMatch =
        selectedCategory === "All" || deal.category === selectedCategory;

      return searchMatch && countryMatch && categoryMatch;
    });
  }, [travelDeals, searchQuery, selectedCountry, selectedCategory]);

  const handleDealClick = (deal) => {
    navigate(`/property/${deal.id}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("All");
    setSelectedCategory("All");
  };

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee Section */}
      <section className="mx-auto px-5 max-w-7xl -mt-16">
        <Marquee />
      </section>

      {/* Mobile Top Filters */}
      <section className=" px-5">
        <MobileTopFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          countries={countries}
          categories={categories}
          onClearFilters={handleClearFilters}
        />
      </section>

      {/* Main Content with Sidebar Layout */}
      <div className=" min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-5 py-28">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Left Sidebar - Sticky Filters */}
            <div className="hidden md:block md:w-80 flex-shrink-0">
              <StickyFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                countries={countries}
                categories={categories}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Right Content - Travel Results */}
            <div className="flex-1 min-w-0">
              <TravelResults
                filteredDeals={filteredDeals}
                totalDeals={travelDeals.length}
                selectedCountry={selectedCountry}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                onDealClick={handleDealClick}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TravelDestinations;
