// components/Hero.jsx
import React from "react";

const Hero = ({ title, description, image }) => {
  return (
    <div
      className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 text-white max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        {description && (
          <p className="text-lg md:text-xl mb-8">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
