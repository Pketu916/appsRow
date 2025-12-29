import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TravelDestinationForm from "../components/TravelDestinationForm";
import AdminHeader from "../components/AdminHeader";
import { travelDestinationsAPI } from "../../utils/http";
import api from "../../utils/api";
import toast from "react-hot-toast";

const TravelDestinationFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDestination, setSelectedDestination] = React.useState(null);
  const [formLoading, setFormLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [adminData, setAdminData] = React.useState(null);

  React.useEffect(() => {
    // Fetch admin data
    const fetchAdminData = async () => {
      const token = localStorage.getItem("adminToken");
      const storedAdminData = localStorage.getItem("adminData");
      if (token && storedAdminData) {
        try {
          const data = await api.auth.getProfile(token);
          if (data.success) {
            setAdminData(data.data.admin);
          } else if (storedAdminData) {
            setAdminData(JSON.parse(storedAdminData));
          }
        } catch (error) {
          console.error("Error fetching admin data:", error);
          if (storedAdminData) {
            setAdminData(JSON.parse(storedAdminData));
          }
        }
      }
    };
    fetchAdminData();
  }, []);

  React.useEffect(() => {
    if (id) {
      fetchDestination();
    }
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin");
  };

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const response = await travelDestinationsAPI.getById(id);
      setSelectedDestination(response.data || response);
    } catch (err) {
      const errorMessage = "Failed to fetch travel destination";
      toast.error(errorMessage);
      console.error("Error fetching destination:", err);
      navigate("/admin/destinations");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);

      // Check if backend is running
      try {
        const healthCheck = await fetch("http://localhost:5000/health");
        if (!healthCheck.ok) {
          throw new Error("Backend server is not responding");
        }
      } catch (healthErr) {
        throw new Error(
          "Backend server is not running. Please start the server first."
        );
      }

      if (id) {
        await travelDestinationsAPI.update(id, formData);
        toast.success("Travel destination updated successfully");
      } else {
        await travelDestinationsAPI.create(formData);
        toast.success("Travel destination created successfully");
      }

      navigate("/admin/destinations");
    } catch (err) {
      const errorMessage = err.message || "Failed to save travel destination";
      toast.error(errorMessage);
      console.error("Error saving destination:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleAutoSave = async (data) => {
    // Auto-save functionality can be added here
    console.log("Auto-saving data:", data);
  };

  const handleModalClose = () => {
    navigate("/admin/destinations");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <AdminHeader
        adminData={adminData}
        onLogout={handleLogout}
        showBackButton={true}
        backTo="/admin/destinations"
        backLabel="Back to Destinations"
      />
      <div className="flex-1 overflow-hidden">
        <TravelDestinationForm
          initialData={selectedDestination}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
          onAutoSave={handleAutoSave}
          loading={formLoading}
        />
      </div>
    </div>
  );
};

export default TravelDestinationFormPage;
