import React from "react";
import BasicInformation from "./BasicInformation";
import PricingInformation from "./PricingInformation";
import PlansPricing from "./PlansPricing";

const FormContent = ({
  activeSection,
  formData,
  setFormData,
  handleInputChange,
  categories,
  currencies,
  difficulties,
  addState,
  removeState,
  addPlace,
  removePlace,
  addArrayItem,
  removeArrayItem,
  handleFileChange,
  imagePreview,
  additionalImagePreviews,
  ctaBgImagePreview,
  removeAdditionalImage,
  autoSave,
  fieldErrors = {},
}) => {
  const renderSectionContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BasicInformation
                formData={formData}
                handleInputChange={handleInputChange}
                categories={categories}
                fieldErrors={fieldErrors}
              />
              <PricingInformation
                formData={formData}
                handleInputChange={handleInputChange}
                currencies={currencies}
              />
            </div>
          </div>
        );

      case "pricing":
        return (
          <PlansPricing
            formData={formData}
            setFormData={setFormData}
            onAutoSave={autoSave}
          />
        );

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BasicInformation
                formData={formData}
                handleInputChange={handleInputChange}
                categories={categories}
                fieldErrors={fieldErrors}
              />
              <PricingInformation
                formData={formData}
                handleInputChange={handleInputChange}
                currencies={currencies}
              />
            </div>
          </div>
        );
    }
  };

  return renderSectionContent();
};

export default FormContent;
