import React, { useState, useEffect, useCallback } from "react";
import FormNavigation from "./form/FormNavigation";
import FormContent from "./form/FormContent";
import ErrorDisplay from "./ErrorDisplay";
// Removed formValidation import - using inline validation

const TravelDestinationForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  onAutoSave, // New prop for auto-save
  loading = false,
}) => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tripType: "domestic",
    country: "",
    duration: "",
    rating: 0,
    reviews: 0,
    offer: "",
    category: "",
    places: [],
    states: [],
    plans: {
      deluxe: {
        price: 0,
        oldPrice: 0,
        facilities: [],
        hotelRating: "3 Star",
        description: "",
      },
      superDeluxe: {
        price: 0,
        oldPrice: 0,
        facilities: [],
        hotelRating: "4 Star",
        description: "",
      },
      luxury: {
        price: 0,
        oldPrice: 0,
        facilities: [],
        hotelRating: "5 Star",
        description: "",
      },
    },
    // Legacy fields for backward compatibility
    price: 0,
    oldPrice: 0,
    currency: "INR",
    description: "",
    highlights: [],
    inclusions: [],
    exclusions: [],
    tags: [],
    includes: [],
    departureDate: "",
    returnDate: "",
    departureDateEnabled: true,
    returnDateEnabled: true,
    difficulty: "Easy",
    isActive: true,
    isFeatured: false,
    cta: false,
    image: null,
    additionalImages: [],
    ctaBgImage: null,
    highlightInput: "",
    inclusionInput: "",
    exclusionInput: "",
    tagInput: "",
    includeInput: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [ctaBgImagePreview, setCtaBgImagePreview] = useState(null);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});
  const [validationWarnings, setValidationWarnings] = useState({});
  const [showErrorPanel, setShowErrorPanel] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const categories = [
    "Honeymoon trip",
    "Family trip",
    "Adventure",
    "Adventure trip",
    "Business trip",
    "Solo trip",
    "Group trip",
    "Hiking and trekking",
    "Beach Holiday",
  ];

  const difficulties = ["Easy", "Moderate", "Hard"];

  const formSections = [
    { id: "basic", name: "Basic Info", icon: "📝" },
    { id: "pricing", name: "Plans & Pricing", icon: "💰" },
    { id: "details", name: "Details", icon: "📋" },
    { id: "images", name: "Images", icon: "🖼️" },
    { id: "status", name: "Status", icon: "⚙️" },
  ];

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (isAutoSaving) return; // Prevent multiple simultaneous saves

    try {
      setIsAutoSaving(true);

      // For edit mode, always save if we have initialData
      // For new data, validate required fields
      const shouldSave = initialData
        ? true
        : formData.title &&
          formData.country &&
          formData.duration &&
          formData.tripType;

      if (shouldSave) {
        console.log("Auto-saving form data:", formData);

        // Prepare data for auto-save (don't include file objects for auto-save)
        const autoSaveData = {
          ...formData,
          // Remove file objects for auto-save to avoid issues
          image: initialData ? initialData.image : formData.image,
          additionalImages: initialData
            ? initialData.additionalImages
            : formData.additionalImages,
          ctaBgImage: initialData
            ? initialData.ctaBgImage
            : formData.ctaBgImage,
        };

        // Call onAutoSave if available, otherwise fallback to onSubmit
        if (onAutoSave) {
          await onAutoSave(autoSaveData);
        } else {
          await onSubmit(autoSaveData);
        }
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [formData, initialData, onSubmit, onAutoSave, isAutoSaving]);

  // Handle section change with auto-save
  const handleSectionChange = async (sectionId) => {
    if (activeSection !== sectionId) {
      // Auto-save before changing section
      await autoSave();
      setActiveSection(sectionId);
    }
  };

  // Handle next step
  const handleNext = async () => {
    const currentIndex = formSections.findIndex((s) => s.id === activeSection);
    if (currentIndex < formSections.length - 1) {
      await autoSave();
      setActiveSection(formSections[currentIndex + 1].id);
    }
  };

  // Handle previous step
  const handlePrevious = async () => {
    const currentIndex = formSections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      await autoSave();
      setActiveSection(formSections[currentIndex - 1].id);
    }
  };

  useEffect(() => {
    if (initialData) {
      console.log("TravelDestinationForm - initialData:", initialData);
      console.log("TravelDestinationForm - tripType:", initialData.tripType);
      console.log("TravelDestinationForm - country:", initialData.country);
      console.log(
        "TravelDestinationForm - initialData.plans:",
        initialData.plans
      );
      console.log(
        "TravelDestinationForm - initialData.places:",
        initialData.places
      );

      setFormData({
        ...initialData,
        highlights: initialData.highlights || [],
        inclusions: initialData.inclusions || [],
        exclusions: initialData.exclusions || [],
        tags: initialData.tags || [],
        includes: initialData.includes || [],
        places: initialData.places || [],
        states: initialData.states || [],
        plans: initialData.plans || {
          deluxe: {
            price: 0,
            oldPrice: 0,
            facilities: [],
            hotelRating: "3 Star",
            description: "",
          },
          superDeluxe: {
            price: 0,
            oldPrice: 0,
            facilities: [],
            hotelRating: "4 Star",
            description: "",
          },
          luxury: {
            price: 0,
            oldPrice: 0,
            facilities: [],
            hotelRating: "5 Star",
            description: "",
          },
        },
        departureDate: initialData.departureDate
          ? initialData.departureDate.split("T")[0]
          : "",
        returnDate: initialData.returnDate
          ? initialData.returnDate.split("T")[0]
          : "",
        departureDateEnabled:
          initialData.departureDateEnabled !== undefined
            ? initialData.departureDateEnabled
            : true,
        returnDateEnabled:
          initialData.returnDateEnabled !== undefined
            ? initialData.returnDateEnabled
            : true,
        image: null,
        additionalImages: [],
        ctaBgImage: null,
        highlightInput: "",
        inclusionInput: "",
        exclusionInput: "",
        tagInput: "",
        includeInput: "",
      });

      // Set image previews for existing images
      if (initialData.imageUrl) {
        setImagePreview(initialData.imageUrl);
      }
      if (
        initialData.additionalImageUrls &&
        initialData.additionalImageUrls.length > 0
      ) {
        setAdditionalImagePreviews(initialData.additionalImageUrls);
      }
      if (initialData.ctaBgImageUrl) {
        setCtaBgImagePreview(initialData.ctaBgImageUrl);
      }
    }
  }, [initialData]);

  // Simple inline validation functions
  const validateFormData = useCallback(() => {
    const errors = [];
    const warnings = [];

    // Basic required field validation
    if (!formData.title?.trim()) {
      errors.push("Title is required");
    }
    if (!formData.description?.trim()) {
      errors.push("Description is required");
    }
    if (!formData.category) {
      errors.push("Category is required");
    }
    if (!formData.country?.trim()) {
      errors.push("Country is required");
    }

    setValidationErrors(errors);
    setValidationWarnings(warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }, [formData]);

  const validateSingleField = (fieldName, value) => {
    let error = null;

    // Basic field validation
    if (fieldName === "title" && !value?.trim()) {
      error = "Title is required";
    } else if (fieldName === "description" && !value?.trim()) {
      error = "Description is required";
    } else if (fieldName === "category" && !value) {
      error = "Category is required";
    } else if (fieldName === "country" && !value?.trim()) {
      error = "Country is required";
    }

    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(
      "handleInputChange - name:",
      name,
      "value:",
      value,
      "initialData exists:",
      !!initialData
    );

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-set country based on trip type (only for new forms, not when editing)
      if (name === "tripType") {
        console.log(
          "Trip type changed to:",
          value,
          "initialData exists:",
          !!initialData
        );

        // Only auto-set for new forms (no initialData)
        if (!initialData) {
          if (value === "domestic") {
            console.log("Setting country to India for domestic trip");
            newData.country = "India";
          } else if (value === "international") {
            console.log("Clearing country for international trip");
            newData.country = "";
          }
        } else {
          // For edit mode, only change if user is switching trip types
          console.log("Edit mode - keeping existing country:", newData.country);
        }
      }

      console.log("handleInputChange - newData:", newData);
      return newData;
    });

    // Real-time validation
    validateSingleField(name, value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (name === "image" && files[0]) {
      if (files[0].size > maxSize) {
        alert("Image size should be less than 10MB");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === "additionalImages" && files.length > 0) {
      const validFiles = Array.from(files).filter((file) => {
        if (file.size > maxSize) {
          alert(`File ${file.name} is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      });

      setFormData((prev) => {
        const existingFiles = prev.additionalImages || [];
        const newFiles = [...existingFiles, ...validFiles];
        return { ...prev, [name]: newFiles };
      });

      setAdditionalImagePreviews((prev) => {
        const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
        return [...prev, ...newPreviews];
      });
    } else if (name === "ctaBgImage" && files[0]) {
      if (files[0].size > maxSize) {
        alert("CTA Background image size should be less than 10MB");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setCtaBgImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const addArrayItem = (arrayName, inputName) => {
    const inputValue = formData[inputName].trim();
    if (inputValue) {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: [...prev[arrayName], inputValue],
        [inputName]: "",
      }));
    }
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const removeAdditionalImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // States management
  const addState = (state) => {
    if (state.trim()) {
      // Split by comma and clean up each state
      const statesToAdd = state
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && !formData.states.includes(s));

      if (statesToAdd.length > 0) {
        setFormData((prev) => ({
          ...prev,
          states: [...prev.states, ...statesToAdd],
        }));
      }
    }
  };

  const removeState = (index) => {
    setFormData((prev) => ({
      ...prev,
      states: prev.states.filter((_, i) => i !== index),
    }));
  };

  // Places management
  const addPlace = (place) => {
    console.log("addPlace called with:", place);
    console.log("Current formData.places:", formData.places);

    if (place.trim()) {
      // Split by comma and clean up each place
      const placesToAdd = place
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p && !formData.places.includes(p));

      console.log("Places to add:", placesToAdd);

      if (placesToAdd.length > 0) {
        setFormData((prev) => {
          const newPlaces = [...prev.places, ...placesToAdd];
          console.log("New places array:", newPlaces);
          return {
            ...prev,
            places: newPlaces,
          };
        });
      }
    }
  };

  const removePlace = (index) => {
    setFormData((prev) => ({
      ...prev,
      places: prev.places.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run comprehensive validation
    const validation = validateFormData();

    if (validation.hasErrors) {
      setShowErrorPanel(true);
      return;
    }

    console.log("Submitting form data:", formData);
    console.log("Submit - tripType:", formData.tripType);
    console.log("Submit - country:", formData.country);

    // Debug: Check if plans data is properly structured
    console.log("Plans data:", formData.plans);
    console.log("Places data:", formData.places);

    // Ensure plans data is properly structured
    const submitData = {
      ...formData,
      // Handle date fields based on enabled status
      departureDate:
        formData.departureDateEnabled &&
        formData.departureDate &&
        formData.departureDate.trim() !== ""
          ? formData.departureDate
          : null,
      returnDate:
        formData.returnDateEnabled &&
        formData.returnDate &&
        formData.returnDate.trim() !== ""
          ? formData.returnDate
          : null,
      plans: {
        deluxe: {
          price: parseFloat(formData.plans.deluxe.price) || 0,
          oldPrice: parseFloat(formData.plans.deluxe.oldPrice) || 0,
          facilities: formData.plans.deluxe.facilities || [],
          hotelRating: formData.plans.deluxe.hotelRating || "3 Star",
          description: formData.plans.deluxe.description || "",
        },
        superDeluxe: {
          price: parseFloat(formData.plans.superDeluxe.price) || 0,
          oldPrice: parseFloat(formData.plans.superDeluxe.oldPrice) || 0,
          facilities: formData.plans.superDeluxe.facilities || [],
          hotelRating: formData.plans.superDeluxe.hotelRating || "4 Star",
          description: formData.plans.superDeluxe.description || "",
        },
        luxury: {
          price: parseFloat(formData.plans.luxury.price) || 0,
          oldPrice: parseFloat(formData.plans.luxury.oldPrice) || 0,
          facilities: formData.plans.luxury.facilities || [],
          hotelRating: formData.plans.luxury.hotelRating || "5 Star",
          description: formData.plans.luxury.description || "",
        },
      },
    };

    console.log("Final submit data:", submitData);
    onSubmit(submitData);
  };

  const currentIndex = formSections.findIndex((s) => s.id === activeSection);

  return (
    <div className="flex flex-col h-full">
      {/* Horizontal Navigation at Top */}
      <FormNavigation
        formSections={formSections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        loading={loading}
        validationErrors={validationErrors}
        validationWarnings={validationWarnings}
        onShowErrors={() => setShowErrorPanel(true)}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit}>
              <FormContent
                activeSection={activeSection}
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
                categories={categories}
                currencies={[
                  { code: "INR", symbol: "₹", name: "Indian Rupee" },
                  { code: "USD", symbol: "$", name: "US Dollar" },
                ]}
                difficulties={difficulties}
                addState={addState}
                removeState={removeState}
                addPlace={addPlace}
                removePlace={removePlace}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
                handleFileChange={handleFileChange}
                imagePreview={imagePreview}
                additionalImagePreviews={additionalImagePreviews}
                ctaBgImagePreview={ctaBgImagePreview}
                removeAdditionalImage={removeAdditionalImage}
                autoSave={autoSave}
                fieldErrors={fieldErrors}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Buttons at Bottom */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || loading}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {isAutoSaving && (
              <div className="flex items-center text-sm text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Saving...
              </div>
            )}

            {currentIndex === formSections.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : initialData
                  ? "Update Destination"
                  : "Create Destination"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Display Panel */}
      {showErrorPanel && (
        <ErrorDisplay
          errors={validationErrors}
          warnings={validationWarnings}
          onClose={() => setShowErrorPanel(false)}
        />
      )}
    </div>
  );
};

export default TravelDestinationForm;
