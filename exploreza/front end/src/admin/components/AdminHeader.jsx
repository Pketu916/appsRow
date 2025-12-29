import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = ({
  adminData,
  onLogout,
  showBackButton = false,
  backTo = "/admin/dashboard",
  backLabel = "Back",
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      id: "destinations",
      name: "Travel Destinations",
      path: "/admin/destinations",
    },
    {
      id: "enquiry",
      name: "Enquiry Management",
      path: "/admin/enquiry",
    },
    ...(adminData?.role === "super_admin"
      ? [
          {
            id: "admin-management",
            name: "Admin Management",
            path: "/admin/management",
          },
        ]
      : []),
  ];

  const isActive = (path) => window.location.pathname === path;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard">
              <h1 className="text-2xl font-bold text-gray-900">
                Rajkamal Admin
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {adminData && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {adminData.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {adminData.role}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {adminData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            {showBackButton && (
              <button
                onClick={() => navigate(backTo)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors ml-4"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {backLabel}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {showBackButton && (
              <button
                onClick={() => navigate(backTo)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm">{backLabel}</span>
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {adminData && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {adminData.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {adminData.role}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
