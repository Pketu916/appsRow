// pages/CategoryPage.jsx
import { useParams } from "react-router-dom";

import React, { useState } from "react";
import travelDealsData from "../../travelDealsdata";
import travelcategoryData from "../../travelcategory";
import TravelCard from "../components/UI/TravelCard";
import Header from "../components/header";
import Hero from "../components/UI/hero";
import Marquee from "../components/marquee";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [travelDeals,setTravelDeals] = useState(travelDealsData);
  const [travelcategory,setTravelcategory] = useState(travelcategoryData);

  const filteredDeals = travelDeals.filter(
    (deal) => deal.category === categoryName
  );

  // Find matching category object
  const categoryObj = travelcategory.find(
    (cat) => cat.category === categoryName
  );

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
      <section className=" mx-auto px-5 max-w-7xl -mt-16">
        <Marquee />
      </section>

      <section className="max-w-7xl px-5 mx-auto py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => <TravelCard key={deal.id} deal={deal} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No deals available for {categoryName}.
          </p>
        )}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default CategoryPage;
