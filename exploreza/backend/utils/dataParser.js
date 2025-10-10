// Utility function to parse states field from various formats
const parseStatesField = (states) => {
  if (!states) return [];

  // If already an array, return as is
  if (Array.isArray(states)) {
    return states.filter((state) => state && state.trim());
  }

  // If string, try to parse
  if (typeof states === "string") {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(states);
      if (Array.isArray(parsed)) {
        return parsed.filter((state) => state && state.trim());
      }
    } catch (error) {
      // If JSON parsing fails, treat as comma-separated string
      return states
        .split(",")
        .map((state) => state.trim())
        .filter((state) => state);
    }
  }

  return [];
};

// Utility function to parse places field from various formats
const parsePlacesField = (places) => {
  if (!places) return [];

  // If already an array, return as is
  if (Array.isArray(places)) {
    return places.filter((place) => place && place.trim());
  }

  // If string, try to parse
  if (typeof places === "string") {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(places);
      if (Array.isArray(parsed)) {
        return parsed.filter((place) => place && place.trim());
      }
    } catch (error) {
      // If JSON parsing fails, treat as comma-separated string
      return places
        .split(",")
        .map((place) => place.trim())
        .filter((place) => place);
    }
  }

  return [];
};

module.exports = {
  parseStatesField,
  parsePlacesField,
};
