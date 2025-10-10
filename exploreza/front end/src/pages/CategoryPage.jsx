// pages/CategoryPage.jsx
import { useParams, useNavigate } from "react-router-dom";

import React, { useState, useMemo } from "react";
import { useTravelDestinations } from "../hooks/useTravelDestinations";
import travelcategoryData from "../../travelcategory";
import TravelCard from "../components/UI/TravelCard";
import Header from "../components/header";
import Footer from "../components/Footer";
import Hero from "../components/UI/hero";
import Marquee from "../components/marquee";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Use custom hook to fetch travel destinations from API
  const { destinations: travelDeals, loading, error } = useTravelDestinations();

  const [travelcategory, setTravelcategory] = useState(travelcategoryData);

  const handleDealClick = (deal) => {
    navigate(`/property/${deal.id}`);
  };

  // Filter deals by category
  const filteredDeals = useMemo(() => {
    return travelDeals.filter((deal) => deal.category === categoryName);
  }, [travelDeals, categoryName]);

  // Find matching category object
  const categoryObj = travelcategory.find(
    (cat) => cat.category === categoryName
  );

  // Show loading state
  if (loading) {
    return (
      <>
        <Header />
        <Hero
          title={categoryObj?.title || categoryName}
          description={
            categoryObj?.description ||
            `Find the best ${categoryName} packages for your next journey`
          }
          image={categoryObj?.categoryImage || categoryObj?.image || ""}
        />
        <section className="mx-auto px-5 max-w-7xl -mt-16">
          <Marquee />
        </section>

        <section className="py-28 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              <span className="ml-3 text-lg">
                Loading {categoryName} packages...
              </span>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Header />
        <Hero
          title={categoryObj?.title || categoryName}
          description={
            categoryObj?.description ||
            `Find the best ${categoryName} packages for your next journey`
          }
          image={categoryObj?.categoryImage || categoryObj?.image || ""}
        />
        <section className="mx-auto px-5 max-w-7xl -mt-16">
          <Marquee />
        </section>

        <section className="py-28 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <p className="text-red-600 text-lg mb-4">Error: {error}</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <Hero
        title={categoryObj?.title || categoryName}
        description={
          categoryObj?.description ||
          `Find the best ${categoryName} packages for your next journey`
        }
        image={categoryObj?.categoryImage || categoryObj?.image || ""}
      />
      <section className="mx-auto px-5 max-w-7xl -mt-16">
        <Marquee />
      </section>

      <section className="py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            {categoryObj?.title || categoryName} Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <TravelCard
                  key={deal.id}
                  deal={deal}
                  onClick={handleDealClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  No packages found
                </h3>
                <p className="text-gray-600 text-lg">
                  No deals available for {categoryName}.
                </p>
                {travelDeals.length === 0 && (
                  <p className="text-gray-500 mt-2">
                    No travel destinations available at the moment.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CategoryPage;
