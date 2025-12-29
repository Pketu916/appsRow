import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { travelDestinationsAPI } from "../../utils/http";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import toast from "react-hot-toast";

const TravelDestinationsAdmin = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // 'create', 'edit', 'view'
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await travelDestinationsAPI.getAllAdmin();
      setDestinations(response.data || []);
      setError(null);
    } catch (err) {
      const errorMessage = "Failed to fetch travel destinations";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    navigate("/admin/destinations/create");
  };

  const handleEdit = (destination) => {
    navigate(`/admin/destinations/edit/${destination._id}`);
  };

  const handleView = (destination) => {
    setSelectedDestination(destination);
    setModalMode("view");
    setShowModal(true);
  };

  const handleDelete = async (destination) => {
    if (
      window.confirm("Are you sure you want to delete this travel destination?")
    ) {
      try {
        await travelDestinationsAPI.delete(destination._id);
        await fetchDestinations();
        setError(null);
        toast.success("Travel destination deleted successfully");
      } catch (err) {
        const errorMessage = "Failed to delete travel destination";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Error deleting destination:", err);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      setError(null);

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

      if (modalMode === "create") {
        await travelDestinationsAPI.create(formData);
        toast.success("Travel destination created successfully");
      } else if (modalMode === "edit") {
        await travelDestinationsAPI.update(selectedDestination._id, formData);
        toast.success("Travel destination updated successfully");
      }

      setShowModal(false);
      await fetchDestinations();
    } catch (err) {
      let errorMessage =
        err.message || `Failed to ${modalMode} travel destination`;

      // Handle specific error types
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("ERR_CONNECTION_REFUSED")
      ) {
        errorMessage =
          "Connection failed. Please ensure backend server is running on port 5000.";
      } else if (err.message.includes("Backend server is not running")) {
        errorMessage =
          "Backend server is not running. Please start the server first.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
      console.error(`Error ${modalMode}ing destination:`, err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDestination(null);
    setError(null);
  };

  // Auto-save function that doesn't close the modal
  const handleAutoSave = async (formData) => {
    try {
      // Only auto-save in edit mode
      if (modalMode === "edit" && selectedDestination) {
        // Check if backend is running before auto-save
        try {
          const healthCheck = await fetch("http://localhost:5000/health");
          if (!healthCheck.ok) {
            console.warn("Backend not responding, skipping auto-save");
            return;
          }
        } catch (healthErr) {
          console.warn("Backend not available, skipping auto-save");
          return;
        }

        await travelDestinationsAPI.update(selectedDestination._id, formData);
        console.log("Auto-saved successfully");
        // Don't show toast for auto-save to avoid spam
        // Don't close modal
        // Don't refetch all destinations
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
      // Don't show error toast for auto-save failures to avoid spam
    }
  };

  const columns = useMemo(
    () => [
      {
        key: "image",
        header: "Image",
        render: (value, row) => {
          const imageSrc =
            row.imageUrl || row.image || "/placeholder-image.jpg";
          return (
            <div className="w-16 h-16">
              <img
                src={imageSrc}
                alt={row.title}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
              />
            </div>
          );
        },
      },
      {
        key: "title",
        header: "Title",
        render: (value, row) => (
          <div className="max-w-xs">
            <div className="font-medium text-gray-900 truncate">{value}</div>
            <div className="text-sm text-gray-500">{row.country}</div>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        render: (value) => {
          if (!value || value.trim() === "") {
            return <span className="text-gray-400">-</span>;
          }
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {value}
            </span>
          );
        },
      },
      {
        key: "price",
        header: "Price",
        render: (value, row) => {
          const getCurrencySymbol = (currencyCode) => {
            const currencies = {
              INR: "₹",
              USD: "$",
              EUR: "€",
              GBP: "£",
            };
            return currencies[currencyCode] || "₹";
          };

          return (
            <div>
              <div className="font-medium">
                {getCurrencySymbol(row.currency)}
                {value}
              </div>
              {row.oldPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {getCurrencySymbol(row.currency)}
                  {row.oldPrice}
                </div>
              )}
            </div>
          );
        },
      },
      {
        key: "rating",
        header: "Rating",
        render: (value, row) => (
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{value}</span>
            <span className="ml-1 text-gray-500">({row.reviews})</span>
          </div>
        ),
      },
      {
        key: "isActive",
        header: "Status",
        render: (value, row) => (
          <div className="flex space-x-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                value
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {value ? "Active" : "Inactive"}
            </span>
            {row.isFeatured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
          </div>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        render: (value) => new Date(value).toLocaleDateString(),
      },
    ],
    []
  );

  const getModalTitle = () => {
    switch (modalMode) {
      case "create":
        return "Create Travel Destination";
      case "edit":
        return "Edit Travel Destination";
      case "view":
        return "View Travel Destination";
      default:
        return "Travel Destination";
    }
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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            Travel Destinations
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Add New Destination
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {destinations.length}
            </div>
            <div className="text-sm text-gray-600">Total Destinations</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {destinations.filter((d) => d.isActive !== false).length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {
                destinations.filter(
                  (d) => d.category && d.category.trim() !== ""
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Categorized</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {destinations.filter((d) => d.price && d.price > 0).length}
            </div>
            <div className="text-sm text-gray-600">With Pricing</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Destinations Table */}
        <div className="overflow-x-auto">
          <DataTable
            data={destinations}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            loading={loading}
            emptyMessage="No travel destinations found"
          />
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={getModalTitle()}
        size="fullscreen"
        showCloseButton={modalMode === "view"}
      >
        <div className="space-y-4">
          {selectedDestination && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDestination.title}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDestination.country}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedDestination.category &&
                    selectedDestination.category.trim() !== ""
                      ? selectedDestination.category
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    ${selectedDestination.price} {selectedDestination.currency}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedDestination.description}
                </p>
              </div>
              {selectedDestination.highlights &&
                selectedDestination.highlights.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Highlights
                    </label>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedDestination.highlights.map(
                        (highlight, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {highlight}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TravelDestinationsAdmin;
