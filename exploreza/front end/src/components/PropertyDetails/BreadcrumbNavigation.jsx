import React from "react";
import { useNavigate } from "react-router-dom";

const BreadcrumbNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-6 left-6 z-50">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white transition-all duration-300 rounded-full px-4 py-2 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium">Back to Travel Deals</span>
      </button>
    </div>
  );
};

export default BreadcrumbNavigation;
