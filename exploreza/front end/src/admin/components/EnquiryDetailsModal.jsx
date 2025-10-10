import React, { useState } from "react";
import Modal from "./Modal";

const EnquiryDetailsModal = ({ enquiry, isOpen, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  if (!enquiry) return null;

  const handleEdit = () => {
    setEditedData({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      destination: enquiry.destination,
      packageTitle: enquiry.packageTitle,
      currency: enquiry.currency,
      travelDate: enquiry.travelDate,
      duration: enquiry.duration,
      adults: enquiry.adults,
      children: enquiry.children,
      selectedPlan: enquiry.selectedPlan,
      message: enquiry.message,
      status: enquiry.status,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(enquiry._id || enquiry.id, editedData);
      }
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error saving enquiry:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculatePrice = (plan, adults, children, currency = "INR") => {
    const basePrices = {
      deluxe: currency === "USD" ? 60 : 5000,
      superDeluxe: currency === "USD" ? 100 : 8000,
      luxury: currency === "USD" ? 150 : 12000,
    };

    const basePrice = basePrices[plan] || (currency === "USD" ? 100 : 8000);
    const adultPrice = basePrice * adults;
    const childPrice = basePrice * 0.7 * children; // 70% of adult price for children

    const totalPrice = Math.round(adultPrice + childPrice);
    const symbol = currency === "USD" ? "$" : "₹";

    return `${symbol}${totalPrice.toLocaleString()}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enquiry Details" size="lg">
      <div className="p-6">
        {/* Header with Status and Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                enquiry.status
              )}`}
            >
              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              Created: {new Date(enquiry.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex space-x-2">
            {/* Quick Contact Buttons */}
            <div className="flex space-x-2 mr-4">
              {/* WhatsApp Button */}
              <button
                onClick={() => {
                  const phoneNumber = enquiry.phone.replace(/\D/g, "");
                  const message = `Hi ${enquiry.name}, I'm contacting you regarding your travel enquiry for ${enquiry.packageTitle}. How can I help you?`;
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                title="Send WhatsApp message"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </button>

              {/* Call Button */}
              <button
                onClick={() => {
                  window.open(`tel:${enquiry.phone}`, "_self");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                title="Call customer"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
            </div>

            {/* Edit/Save/Cancel Buttons */}
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              {isEditing ? (
                <select
                  value={editedData.status || ""}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{enquiry.status}</p>
              )}
            </div>
          </div>
        </div>

        {/* Travel Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Travel Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.packageTitle || ""}
                  onChange={(e) =>
                    handleInputChange("packageTitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900 font-medium">
                  {enquiry.packageTitle}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.destination || ""}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.destination}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              {isEditing ? (
                <select
                  value={editedData.currency || "INR"}
                  onChange={(e) =>
                    handleInputChange("currency", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">
                  {enquiry.currency || "INR"} (
                  {enquiry.currency === "USD" ? "$" : "₹"})
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Travel Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedData.travelDate || ""}
                  onChange={(e) =>
                    handleInputChange("travelDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {new Date(enquiry.travelDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.duration || ""}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.duration}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Price
              </label>
              <p className="text-sm text-gray-900 font-semibold">
                {calculatePrice(
                  enquiry.selectedPlan,
                  enquiry.adults,
                  enquiry.children,
                  enquiry.currency
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Guest Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Guest Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adults
              </label>
              {isEditing ? (
                <input
                  type="number"
                  min="1"
                  value={editedData.adults || ""}
                  onChange={(e) =>
                    handleInputChange("adults", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.adults}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Children
              </label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  value={editedData.children || ""}
                  onChange={(e) =>
                    handleInputChange("children", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{enquiry.children}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Plan
              </label>
              {isEditing ? (
                <select
                  value={editedData.selectedPlan || ""}
                  onChange={(e) =>
                    handleInputChange("selectedPlan", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="deluxe">Deluxe</option>
                  <option value="superDeluxe">Super Deluxe</option>
                  <option value="luxury">Luxury</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">
                  {enquiry.selectedPlan?.charAt(0).toUpperCase() +
                    enquiry.selectedPlan?.slice(1)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          {isEditing ? (
            <textarea
              value={editedData.message || ""}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
              {enquiry.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EnquiryDetailsModal;
