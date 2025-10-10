// External API utilities for fetching country data
const API_BASE_URL = "https://restcountries.com/v3.1";

// Fetch countries from external API
export const fetchCountries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all?fields=name,cca2`);
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const countries = await response.json();
    return countries
      .map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching countries:", error);
    // Fallback to static list if API fails
    return getFallbackCountries();
  }
};

// Fallback countries list if API fails
const getFallbackCountries = () => {
  return [
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Thailand", code: "TH" },
    { name: "Singapore", code: "SG" },
    { name: "Malaysia", code: "MY" },
    { name: "Indonesia", code: "ID" },
    { name: "Nepal", code: "NP" },
    { name: "Bhutan", code: "BT" },
    { name: "Sri Lanka", code: "LK" },
    { name: "Maldives", code: "MV" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "Turkey", code: "TR" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Italy", code: "IT" },
    { name: "Spain", code: "ES" },
    { name: "Germany", code: "DE" },
    { name: "Switzerland", code: "CH" },
    { name: "Austria", code: "AT" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Australia", code: "AU" },
    { name: "New Zealand", code: "NZ" },
    { name: "South Africa", code: "ZA" },
    { name: "Kenya", code: "KE" },
    { name: "Morocco", code: "MA" },
    { name: "Brazil", code: "BR" },
    { name: "Argentina", code: "AR" },
    { name: "Chile", code: "CL" },
    { name: "Peru", code: "PE" },
    { name: "China", code: "CN" },
    { name: "South Korea", code: "KR" },
    { name: "Vietnam", code: "VN" },
    { name: "Philippines", code: "PH" },
    { name: "Myanmar", code: "MM" },
    { name: "Cambodia", code: "KH" },
    { name: "Laos", code: "LA" },
    { name: "Bangladesh", code: "BD" },
    { name: "Pakistan", code: "PK" },
    { name: "Afghanistan", code: "AF" },
    { name: "Iran", code: "IR" },
    { name: "Iraq", code: "IQ" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Israel", code: "IL" },
    { name: "Jordan", code: "JO" },
    { name: "Lebanon", code: "LB" },
    { name: "Syria", code: "SY" },
    { name: "Russia", code: "RU" },
    { name: "Ukraine", code: "UA" },
    { name: "Poland", code: "PL" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Hungary", code: "HU" },
    { name: "Romania", code: "RO" },
    { name: "Bulgaria", code: "BG" },
    { name: "Greece", code: "GR" },
    { name: "Portugal", code: "PT" },
    { name: "Netherlands", code: "NL" },
    { name: "Belgium", code: "BE" },
    { name: "Luxembourg", code: "LU" },
    { name: "Denmark", code: "DK" },
    { name: "Sweden", code: "SE" },
    { name: "Norway", code: "NO" },
    { name: "Finland", code: "FI" },
    { name: "Iceland", code: "IS" },
    { name: "Ireland", code: "IE" },
    { name: "Mexico", code: "MX" },
    { name: "Cuba", code: "CU" },
    { name: "Jamaica", code: "JM" },
    { name: "Dominican Republic", code: "DO" },
    { name: "Haiti", code: "HT" },
    { name: "Colombia", code: "CO" },
    { name: "Venezuela", code: "VE" },
    { name: "Ecuador", code: "EC" },
    { name: "Bolivia", code: "BO" },
    { name: "Paraguay", code: "PY" },
    { name: "Uruguay", code: "UY" },
    { name: "Guyana", code: "GY" },
    { name: "Suriname", code: "SR" },
    { name: "French Guiana", code: "GF" },
  ].sort((a, b) => a.name.localeCompare(b.name));
};

// Fetch states/provinces for a specific country using a different API
export const fetchStatesForCountry = async (countryName) => {
  try {
    // Using a different API for states/provinces
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryName}/states`,
      {
        headers: {
          "X-CSCAPI-KEY": "YOUR_API_KEY_HERE", // You'll need to get a free API key
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch states");
    }

    const states = await response.json();
    return states.map((state) => state.name);
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};

// Alternative: Use a free API without key requirement
export const fetchStatesAlternative = async (countryName) => {
  try {
    // Using a free API that doesn't require authentication
    const response = await fetch(
      `https://raw.githubusercontent.com/hiiamrohit/Countries-States-Cities-database/master/states.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch states");
    }

    const data = await response.json();
    const countryStates = data[countryName];

    if (countryStates) {
      return countryStates.map((state) => state.name);
    }

    return [];
  } catch (error) {
    console.error("Error fetching states from alternative API:", error);
    return [];
  }
};

// Fetch cities for a specific state
export const fetchCitiesForState = async (countryName, stateName) => {
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${countryName}/states/${stateName}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY": "YOUR_API_KEY_HERE",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const cities = await response.json();
    return cities.map((city) => city.name);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

// Alternative cities API
export const fetchCitiesAlternative = async (countryName, stateName) => {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/hiiamrohit/Countries-States-Cities-database/master/cities.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }

    const data = await response.json();
    const stateCities = data[`${countryName}-${stateName}`];

    if (stateCities) {
      return stateCities.map((city) => city.name);
    }

    return [];
  } catch (error) {
    console.error("Error fetching cities from alternative API:", error);
    return [];
  }
};

// Get country code from country name
export const getCountryCode = async (countryName) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/name/${countryName}?fields=cca2`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country code");
    }
    const countries = await response.json();
    return countries[0]?.cca2 || null;
  } catch (error) {
    console.error("Error fetching country code:", error);
    return null;
  }
};
