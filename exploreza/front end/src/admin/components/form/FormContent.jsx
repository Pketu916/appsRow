import React from "react";
import BasicInformation from "./BasicInformation";
import PricingInformation from "./PricingInformation";
import PlansPricing from "./PlansPricing";
import DetailsInformation from "./DetailsInformation";
import ImagesInformation from "./ImagesInformation";
import StatusInformation from "./StatusInformation";

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

      case "details":
        return (
          <DetailsInformation
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            difficulties={difficulties}
          />
        );

      case "images":
        return (
          <ImagesInformation
            formData={formData}
            handleFileChange={handleFileChange}
            imagePreview={imagePreview}
            additionalImagePreviews={additionalImagePreviews}
            ctaBgImagePreview={ctaBgImagePreview}
            removeAdditionalImage={removeAdditionalImage}
          />
        );

      case "status":
        return (
          <StatusInformation
            formData={formData}
            handleInputChange={handleInputChange}
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
