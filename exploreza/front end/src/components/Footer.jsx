import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Social Media */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Follow the latest travel destination updates from Rajkamal
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick links</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                About us
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                All tours
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                Tour blogs
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                Our destination
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(888) 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>contact@exemple.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  410 Sandtown, California 94001, United State of America
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Logo */}
      <div className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-5xl font-bold text-orange-500 tracking-wider">
            RAJKAMAL
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Your Travel Partner</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-sm text-gray-400 mb-2 md:mb-0">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure,
              excepturi.
            </div>
            <div className="text-sm text-gray-400">License | 404</div>
          </div>

          {/* <div className="text-sm text-gray-400 text-center">
            <span className="hidden md:inline">
              USA | France | Switzerland | New Zealand | Australia | Venezuela |
              Colombia | Cameroon | Argentina | Brazil | Egypt | South Africa |
              Sri Lanka | Thailand | UAE | Bhutan | India
            </span>
            <div className="md:hidden space-y-1">
              <div>USA | France | Switzerland | New Zealand</div>
              <div>Australia | Venezuela | Colombia | Cameroon</div>
              <div>Argentina | Brazil | Egypt | South Africa</div>
              <div>Sri Lanka | Thailand | UAE | Bhutan | India</div>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
