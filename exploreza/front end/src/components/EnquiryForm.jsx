import React, { useState } from "react";
import Button from "./UI/button";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Select from "./UI/Select";
import Textarea from "./UI/Textarea";
import FormSection from "./UI/FormSection";
import PriceSummary from "./UI/PriceSummary";
import { enquiryAPI } from "../utils/http";
// Removed formValidation import - using inline validation

const EnquiryForm = ({
  deal,
  selectedPlan,
  onClose,
  onSubmit,
  isOpen = true,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    selectedPlan: selectedPlan || "superDeluxe",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const error = validateField(name, value, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFormValidation = () => {
    const { errors: newErrors, isValid } = validateForm(formData);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare enquiry data
      const enquiryData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        destination: deal?.country || "Not specified",
        packageTitle: deal?.title || "Not specified",
        currency: deal?.currency || "INR",
        travelDate: new Date().toISOString().split("T")[0],
        duration: deal?.duration || "Not specified",
        adults: formData.adults,
        children: formData.children,
        selectedPlan: formData.selectedPlan,
        message: formData.message || "Travel enquiry",
        status: "new",
        createdAt: new Date().toISOString(),
      };

      // Submit enquiry to backend using http service
      const response = await enquiryAPI.create(enquiryData);

      // Show success message
      alert("Enquiry submitted successfully! We will contact you soon.");

      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        adults: 1,
        children: 0,
        selectedPlan: selectedPlan || "superDeluxe",
        message: "",
      });

      // Call parent component's onSubmit function
      if (onSubmit) {
        onSubmit(response.data);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Error submitting enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalPrice = () => {
    if (!deal) return "0.00";
    return calculateTotalPrice(deal, formData);
  };

  // Dynamic pricing based on currency
  const getPlanPrice = (planKey) => {
    const currency = deal?.currency || "INR";
    const basePrices = {
      deluxe: currency === "USD" ? 60 : 5000,
      superDeluxe: currency === "USD" ? 100 : 8000,
      luxury: currency === "USD" ? 150 : 12000,
    };

    return basePrices[planKey] || (currency === "USD" ? 100 : 8000);
  };

  const getCurrencySymbol = () => {
    const currency = deal?.currency || "INR";
    return currency === "USD" ? "$" : "₹";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Travel Enquiry Form"
      size="lg"
    >
      {/* Deal Information */}
      {deal && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{deal.title}</h3>
          <p className="text-gray-600">{deal.country}</p>
          <p className="text-sm text-gray-500 mt-1">{deal.duration}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Personal Information */}
        <FormSection title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              label="First Name"
              placeholder="Enter your first name"
              required
              error={errors.firstName}
            />
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              label="Last Name"
              placeholder="Enter your last name"
              required
              error={errors.lastName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="Email Address"
              placeholder="example@email.com"
              required
              error={errors.email}
            />
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              label="Phone Number"
              placeholder="9876543210"
              required
              error={errors.phone}
            />
          </div>
        </FormSection>

        {/* Package Selection */}
        <FormSection title="Package Selection">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                key: "deluxe",
                name: "Deluxe",
                icon: "🏨",
                color: "bg-gray-500",
              },
              {
                key: "superDeluxe",
                name: "Super Deluxe",
                icon: "🏢",
                color: "bg-green-500",
              },
              {
                key: "luxury",
                name: "Luxury",
                icon: "🏰",
                color: "bg-purple-500",
              },
            ].map((plan) => (
              <button
                key={plan.key}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, selectedPlan: plan.key }))
                }
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.selectedPlan === plan.key
                    ? `${plan.color} text-white border-transparent shadow-lg transform scale-105`
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:scale-102"
                }`}
              >
                <span className="text-2xl mb-2">{plan.icon}</span>
                <span className="text-sm font-semibold">{plan.name}</span>
                <span className="text-xs mt-1 opacity-75">
                  {getCurrencySymbol()}
                  {getPlanPrice(plan.key).toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </FormSection>

        {/* Guest Information */}
        <FormSection title="Guest Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              name="adults"
              value={formData.adults}
              onChange={handleInputChange}
              label="Number of Adults"
              required
              error={errors.adults}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
                value: num,
                label: `${num} Adult${num > 1 ? "s" : ""}`,
              }))}
            />
            <Select
              name="children"
              value={formData.children}
              onChange={handleInputChange}
              label="Number of Children"
              options={[0, 1, 2, 3, 4, 5].map((num) => ({
                value: num,
                label: `${num} Child${num !== 1 ? "ren" : ""}`,
              }))}
            />
          </div>
        </FormSection>

        {/* Additional Message */}
        <FormSection title="Additional Information">
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            label="Message (Optional)"
            placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
            rows={4}
            error={errors.message}
          />
        </FormSection>

        {/* Price Summary - Only show if price is available */}
        {(() => {
          const selectedPlan = formData.selectedPlan || "superDeluxe";
          const planPrice =
            deal?.plans?.[selectedPlan]?.price || deal?.price || 0;
          const hasPrice = planPrice > 0;

          return hasPrice ? (
            <PriceSummary
              deal={deal}
              formData={formData}
              calculateTotalPrice={getTotalPrice}
            />
          ) : null;
        })()}

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EnquiryForm;
