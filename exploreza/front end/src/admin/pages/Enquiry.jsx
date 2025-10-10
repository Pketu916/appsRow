import React, { useState, useEffect } from "react";
import { enquiryAPI } from "../../utils/http";
import EnquiryDetailsModal from "../components/EnquiryDetailsModal";

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEnquiries = async () => {
    try {
      const response = await enquiryAPI.getAll();
      if (response.success) {
        setEnquiries(response.data);
      } else {
        console.error("Error fetching enquiries:", response.message);
        setEnquiries([]);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

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

  const filteredEnquiries = enquiries.filter((enquiry) => {
    if (filter === "all") return true;
    return enquiry.status === filter;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await enquiryAPI.updateStatus(id, newStatus);

      if (response.success) {
        // Update local state
        setEnquiries((prev) =>
          prev.map((enquiry) =>
            enquiry._id === id ? { ...enquiry, status: newStatus } : enquiry
          )
        );
      } else {
        console.error("Error updating status:", response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const handleSaveEnquiry = async (enquiryId, updatedData) => {
    try {
      const response = await enquiryAPI.update(enquiryId, updatedData);

      if (response.success) {
        // Update local state
        setEnquiries((prev) =>
          prev.map((enquiry) =>
            enquiry._id === enquiryId ? { ...enquiry, ...updatedData } : enquiry
          )
        );
        // Refresh the data
        fetchEnquiries();
      } else {
        console.error("Error updating enquiry:", response.message);
      }
    } catch (error) {
      console.error("Error updating enquiry:", error);
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Enquiry Management
          </h1>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Enquiries</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {enquiries.length}
            </div>
            <div className="text-sm text-gray-600">Total Enquiries</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {enquiries.filter((e) => e.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {enquiries.filter((e) => e.status === "contacted").length}
            </div>
            <div className="text-sm text-gray-600">Contacted</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {enquiries.filter((e) => e.status === "confirmed").length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submit Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEnquiries.map((enquiry) => (
                <tr
                  key={enquiry._id || enquiry.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {enquiry.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enquiry.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enquiry.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {enquiry.packageTitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      {enquiry.destination} • {enquiry.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {calculatePrice(
                      enquiry.selectedPlan,
                      enquiry.adults,
                      enquiry.children,
                      enquiry.currency
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        enquiry.status
                      )}`}
                    >
                      {enquiry.status.charAt(0).toUpperCase() +
                        enquiry.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-2">
                      {/* Status Dropdown */}
                      <select
                        value={enquiry.status}
                        onChange={(e) =>
                          handleStatusChange(
                            enquiry._id || enquiry.id,
                            e.target.value
                          )
                        }
                        className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="new">New</option>
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      {/* Action Buttons */}
                      <div className="flex space-x-1">
                        {/* WhatsApp Button */}
                        <button
                          onClick={() => {
                            const phoneNumber = enquiry.phone.replace(
                              /\D/g,
                              ""
                            );
                            const message = `Hi ${enquiry.name}, I'm contacting you regarding your travel enquiry for ${enquiry.packageTitle}. How can I help you?`;
                            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                              message
                            )}`;
                            window.open(whatsappUrl, "_blank");
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center justify-center"
                          title="Send WhatsApp message"
                        >
                          <svg
                            className="w-3 h-3"
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
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs flex items-center justify-center"
                          title="Call customer"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                        </button>

                        {/* View Details Button */}
                        <button
                          onClick={() => handleViewDetails(enquiry)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                          title="View details"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEnquiries.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              No enquiries found for the selected filter.
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Details Modal */}
      <EnquiryDetailsModal
        enquiry={selectedEnquiry}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEnquiry}
      />
    </div>
  );
};

export default Enquiry;
