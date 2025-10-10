import React from "react";

const VacationSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              We recommended beautiful destinations every day
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Ac lobortis tempus
              tincidunt suscipit volutpat nunc condimentum imperdiet tincidunt.
              Blandit dui habitant porttitor ullamcorper pulvinar.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {/* Trusted Advisor */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Trusted advisor
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Massa ac at faucibus
                  eget congue.
                </p>
              </div>
            </div>

            {/* Curated Tours */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Curated tours
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Massa ac at faucibus
                  eget congue.
                </p>
              </div>
            </div>

            {/* Complimentary Upgrades */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Complimentary upgrades
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur. Massa ac at faucibus
                  eget congue.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Images */}
        <div className="space-y-6">
          {/* Top Image - Couple */}
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/6729979d41b7f1ade7b05122_Vacation%20images-p-500.webp"
              alt="Couple on vacation"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Bottom Image - Family */}
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/66920f2a1e03460f2a6e88a5/6729979d63ec1c635b693b8f_Vacation%20images-2-p-500.webp"
              alt="Family on vacation"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationSection;
