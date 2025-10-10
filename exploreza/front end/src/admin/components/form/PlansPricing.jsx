import React, { useState } from "react";

const PlansPricing = ({ formData, setFormData, onAutoSave }) => {
  const [activePlan, setActivePlan] = useState("deluxe");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [facilityInputs, setFacilityInputs] = useState({
    deluxe: "",
    superDeluxe: "",
    luxury: "",
  });

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];

  const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency ? currency.symbol : "₹";
  };

  // Debug: Log formData
  console.log("PlansPricing - formData:", formData);
  console.log("PlansPricing - plans:", formData?.plans);

  const planTypes = [
    {
      key: "deluxe",
      name: "Deluxe",
      color: "blue",
      defaultHotelRating: "3 Star",
    },
    {
      key: "superDeluxe",
      name: "Super Deluxe",
      color: "green",
      defaultHotelRating: "4 Star",
    },
    {
      key: "luxury",
      name: "Luxury",
      color: "purple",
      defaultHotelRating: "5 Star",
    },
  ];

  // Handle plan tab change with auto-save
  const handlePlanChange = async (planKey) => {
    if (activePlan !== planKey && !isAutoSaving) {
      try {
        setIsAutoSaving(true);
        // Auto-save before changing plan (only if onAutoSave is provided)
        if (onAutoSave) {
          await onAutoSave();
        }
        setActivePlan(planKey);
      } catch (error) {
        console.error("Error during plan change auto-save:", error);
        // Still change the plan even if auto-save fails
        setActivePlan(planKey);
      } finally {
        setIsAutoSaving(false);
      }
    }
  };

  const updatePlanField = (planKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      plans: {
        ...prev.plans,
        [planKey]: {
          ...prev.plans[planKey],
          [field]: value,
        },
      },
    }));
  };

  const addFacility = (planKey, facility) => {
    if (facility.trim()) {
      setFormData((prev) => ({
        ...prev,
        plans: {
          ...prev.plans,
          [planKey]: {
            ...prev.plans[planKey],
            facilities: [...prev.plans[planKey].facilities, facility.trim()],
          },
        },
      }));
    }
  };

  const removeFacility = (planKey, index) => {
    setFormData((prev) => ({
      ...prev,
      plans: {
        ...prev.plans,
        [planKey]: {
          ...prev.plans[planKey],
          facilities: prev.plans[planKey].facilities.filter(
            (_, i) => i !== index
          ),
        },
      },
    }));
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
        badge: "bg-blue-100 text-blue-800",
        remove: "text-blue-600 hover:text-blue-800",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        button: "bg-green-600 hover:bg-green-700",
        badge: "bg-green-100 text-green-800",
        remove: "text-green-600 hover:text-green-800",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-800",
        button: "bg-purple-600 hover:bg-purple-700",
        badge: "bg-purple-100 text-purple-800",
        remove: "text-purple-600 hover:text-purple-800",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-6">
          <div className="flex items-center justify-end">
            {isAutoSaving && (
              <div className="flex items-center text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Saving...
              </div>
            )}
          </div>
        </div>

        {/* Plan Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {planTypes.map((plan) => {
              const colors = getColorClasses(plan.color);
              return (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => handlePlanChange(plan.key)}
                  className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200 ${
                    activePlan === plan.key
                      ? `${colors.border} ${colors.text} bg-white border-b-2`
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">
                      {plan.key === "deluxe" && "🏨"}
                      {plan.key === "superDeluxe" && "🏩"}
                      {plan.key === "luxury" && "🏰"}
                    </span>
                    {plan.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Plan Content */}
        {planTypes.map((plan) => {
          if (activePlan !== plan.key) return null;

          const colors = getColorClasses(plan.color);
          const planData = formData.plans?.[plan.key] || {
            price: 0,
            oldPrice: 0,
            facilities: [],
            description: "",
          };

          console.log(`Plan ${plan.key} data:`, planData);

          return (
            <div
              key={plan.key}
              className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 shadow-sm`}
            >
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name} Package
                </h4>
                <p className="text-gray-600">
                  Configure pricing and details for the{" "}
                  {plan.name.toLowerCase()} package
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pricing */}
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">💰</span>
                      Pricing Information
                    </h5>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Price *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {getCurrencySymbol(formData.currency)}
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={planData.price}
                            onChange={(e) =>
                              updatePlanField(
                                plan.key,
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="pl-8 mt-1 block w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            placeholder="Enter current price"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Original Price (Optional)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {getCurrencySymbol(formData.currency)}
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={planData.oldPrice}
                            onChange={(e) =>
                              updatePlanField(
                                plan.key,
                                "oldPrice",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="pl-8 mt-1 block w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            placeholder="Enter original price for discount"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📝</span>
                      Package Description
                    </h5>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan Description
                      </label>
                      <textarea
                        value={planData.description}
                        onChange={(e) =>
                          updatePlanField(
                            plan.key,
                            "description",
                            e.target.value
                          )
                        }
                        rows={6}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Describe what's included in this plan, amenities, services, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="mt-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="mr-2">✨</span>
                    Package Facilities
                  </h5>

                  <div className="flex space-x-2 mb-4">
                    <input
                      type="text"
                      value={facilityInputs[plan.key] || ""}
                      onChange={(e) =>
                        setFacilityInputs((prev) => ({
                          ...prev,
                          [plan.key]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addFacility(plan.key, facilityInputs[plan.key]);
                          setFacilityInputs((prev) => ({
                            ...prev,
                            [plan.key]: "",
                          }));
                        }
                      }}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add facility (e.g., Free WiFi, Swimming Pool, Airport Transfer)"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addFacility(plan.key, facilityInputs[plan.key]);
                        setFacilityInputs((prev) => ({
                          ...prev,
                          [plan.key]: "",
                        }));
                      }}
                      className={`px-6 py-3 ${colors.button} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium`}
                    >
                      Add Facility
                    </button>
                  </div>

                  {planData.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {planData.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${colors.badge} border`}
                        >
                          <span className="mr-2">✓</span>
                          {facility}
                          <button
                            type="button"
                            onClick={() => removeFacility(plan.key, index)}
                            className={`ml-3 ${colors.remove} hover:scale-110 transition-transform`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Summary */}
              {planData.price > 0 && (
                <div className="mt-8">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">💎</span>
                      Price Summary
                    </h5>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-green-600">
                          {getCurrencySymbol(formData.currency)}
                          {planData.price.toLocaleString()}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">per person</p>
                      </div>
                      {planData.oldPrice > planData.price && (
                        <div className="flex items-center space-x-3">
                          <span className="text-xl text-gray-500 line-through">
                            {getCurrencySymbol(formData.currency)}
                            {planData.oldPrice.toLocaleString()}
                          </span>
                          <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                            {Math.round(
                              ((planData.oldPrice - planData.price) /
                                planData.oldPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        </div>
                      )}
                    </div>
                    {planData.oldPrice > planData.price && (
                      <p className="text-sm text-gray-600 mt-2">
                        You save {getCurrencySymbol(formData.currency)}
                        {(
                          planData.oldPrice - planData.price
                        ).toLocaleString()}{" "}
                        per person!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlansPricing;
