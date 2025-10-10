// Form validation functions
export const validateForm = (formData) => {
  const errors = {};

  // First Name validation
  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  // Last Name validation
  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone validation
  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  // Adults validation
  if (formData.adults < 1) {
    errors.adults = "At least 1 adult is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// Individual field validation functions
export const validateField = (name, value, formData = {}) => {
  switch (name) {
    case "firstName":
      return !value?.trim() ? "First name is required" : "";

    case "lastName":
      return !value?.trim() ? "Last name is required" : "";

    case "email":
      if (!value?.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value))
        return "Please enter a valid email address";
      return "";

    case "phone":
      if (!value?.trim()) return "Phone number is required";
      if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
        return "Please enter a valid 10-digit phone number";
      return "";

    case "adults":
      return value < 1 ? "At least 1 adult is required" : "";

    default:
      return "";
  }
};

// Price calculation function with dynamic currency-based pricing
export const calculateTotalPrice = (deal, formData) => {
  if (!deal) return 0;

  // Get selected plan price with dynamic currency support
  const selectedPlan = formData.selectedPlan || "superDeluxe";
  const currency = deal?.currency || "INR";

  // Dynamic pricing based on currency
  const basePrices = {
    deluxe: currency === "USD" ? 60 : 5000,
    superDeluxe: currency === "USD" ? 100 : 8000,
    luxury: currency === "USD" ? 150 : 12000,
  };

  let basePrice = basePrices[selectedPlan] || (currency === "USD" ? 100 : 8000);

  // Try to get price from selected plan first (if available in deal data)
  if (
    deal.plans &&
    deal.plans[selectedPlan] &&
    deal.plans[selectedPlan].price
  ) {
    basePrice = deal.plans[selectedPlan].price;
  } else if (deal.price) {
    // Fallback to main deal price
    if (typeof deal.price === "string") {
      basePrice = parseFloat(deal.price.replace(/[^\d.]/g, ""));
    } else if (typeof deal.price === "number") {
      basePrice = deal.price;
    }
  }

  if (basePrice === 0) return "Quote Required";

  const adults = parseInt(formData.adults) || 1;
  const children = parseInt(formData.children) || 0;

  // Adults pay full price, children get 30% discount
  const adultTotal = basePrice * adults;
  const childrenTotal = basePrice * 0.7 * children;

  const total = adultTotal + childrenTotal;
  return total.toLocaleString();
};
