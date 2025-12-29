import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import AdminHeader from "./components/AdminHeader";
import api from "../utils/api";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const storedAdminData = localStorage.getItem("adminData");

      if (!token) {
        setShowLoginModal(true);
        setIsLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const data = await api.auth.getProfile(token);

        if (data.success) {
          setAdminData(data.data.admin);
          if (storedAdminData) {
            setAdminData(JSON.parse(storedAdminData));
          }
        } else {
          // Token is invalid
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
          setShowLoginModal(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        setShowLoginModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setAdminData(null);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (admin) => {
    setAdminData(admin);
    setShowLoginModal(false);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login modal if not authenticated
  if (showLoginModal && !adminData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

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

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <AdminHeader adminData={adminData} onLogout={handleLogout} />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow mr-6">
            <nav className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full lg:w-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {}} // Prevent closing modal by clicking outside
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AdminLayout;
