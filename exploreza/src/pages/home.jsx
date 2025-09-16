import React from "react";
import Header from "../components/header";
import HeroSlider from "../components/heroSlider";
import Marquee from "../components/marquee";
import TravelDeals from "../components/TravelDeals/TravelDeals";
import TravelDealsSlider from "../components/TravelDealsSlider";
import CategorySection from "../components/CategorySection";
import HotDealsBg from "../assets/Hot Deals Background.webp";

const slidesData = [
  {
    id: 1,
    image: "https://picsum.photos/id/1018/1920/1080",
    title: "Discover the wonders of the frozen frontier",
    description: "Lorem ipsum dolor sit amet consectetur massa pulvinar.",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/1015/1920/1080",
    title: "Adventure awaits in the mountains",
    description: "Explore breathtaking landscapes and hidden trails.",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/1016/1920/1080",
    title: "Boats in Rio’s cultural landscape",
    description: "Lorem ipsum dolor sit amet consectetur massa pulvinar.",
  },
];

const Home = () => {
  return (
    <main>
      <Header />
      <HeroSlider slides={slidesData} auto={true} />
      <section className=" mx-auto px-5 max-w-7xl -mt-16">
        <Marquee />
      </section>
      <section className="py-28">
        <TravelDeals />
      </section>
      <TravelDealsSlider />
      <div className="px-5">
        <section
          className="py-28 my-28 bg-cover bg-center bg-no-repeat bg-[#fccdaf] max-w-screen-2xl mx-auto rounded-2xl "
          style={{ backgroundImage: `url(${HotDealsBg})` }}
        >
          <CategorySection />
        </section>
      </div>
    </main>
  );
};

export default Home;
