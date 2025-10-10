import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTravelDestination } from "../hooks/useTravelDestinations";
import Header from "../components/header.jsx";
import Footer from "../components/Footer.jsx";
import EnquiryForm from "../components/EnquiryForm";
import ImageSlider from "../components/PropertyDetails/ImageSlider";
import PricingTabs from "../components/PropertyDetails/PricingTabs";
import DynamicContent from "../components/PropertyDetails/DynamicContent";
import HeroSection from "../components/PropertyDetails/HeroSection";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookNowForm, setShowBookNowForm] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("superDeluxe"); // Default to super deluxe

  // Use custom hook to fetch single travel destination from API
  const { destination: deal, loading, error } = useTravelDestination(id);

  // Handle sticky booking section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = () => {
    setShowBookNowForm(true);
  };

  const handleCloseBookNowForm = () => {
    setShowBookNowForm(false);
  };

  const handleBookingSubmit = (formData) => {
    // Alert is already shown in EnquiryForm component
    setShowBookNowForm(false);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Loading Travel Package...
          </h1>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Error Loading Package
          </h1>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Travel Package Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const images = [
    deal.imageUrl || deal.image,
    ...(deal.additionalImageUrls || deal.additionalImages || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 pt-16">
        {/* Hero Section - Enhanced Title and Info */}
        <HeroSection
          deal={deal}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Image Slider */}
            <ImageSlider
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              deal={deal}
            />

            {/* Right Side - Pricing Tabs */}
            <PricingTabs
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              deal={deal}
              handleBookNow={handleBookNow}
            />
          </div>

          {/* Dynamic Content Section */}
          <DynamicContent deal={deal} selectedPlan={selectedPlan} />
        </div>
      </main>

      <Footer />

      {/* Book Now Form Modal */}
      <EnquiryForm
        deal={deal}
        selectedPlan={selectedPlan}
        onClose={handleCloseBookNowForm}
        onSubmit={handleBookingSubmit}
        isOpen={showBookNowForm}
      />
    </div>
  );
};

export default PropertyDetails;
