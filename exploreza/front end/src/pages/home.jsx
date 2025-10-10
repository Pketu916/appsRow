import React from "react";
import Header from "../components/header";
import HeroSlider from "../components/heroSlider";
import Marquee from "../components/marquee";
import TravelDeals from "../components/TravelDeals/TravelDeals";
import TravelDealsSlider from "../components/TravelDealsSlider";
import CategorySection from "../components/CategorySection";
import VacationSection from "../components/VacationSection";
import Footer from "../components/Footer";
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
      <section className="mx-auto px-5 max-w-7xl -mt-16">
        <Marquee />
      </section>

      <section className="py-28 px-5">
        <TravelDeals />
      </section>

      <section className=" px-5">
        <TravelDealsSlider />
      </section>

      <section className="py-28 px-5">
        <VacationSection />
      </section>

      <section
        className="py-28 px-5 bg-cover bg-center bg-no-repeat bg-[#fccdaf] max-w-screen-2xl mx-auto rounded-2xl"
        style={{ backgroundImage: `url(${HotDealsBg})` }}
      >
        <CategorySection />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
