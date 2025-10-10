const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class HttpClient {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async request(endpoint, options = {}, retryCount = 0) {
    const url = `${this.baseURL}${endpoint}`;
    const maxRetries = 2;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Handle FormData for file uploads
    if (options.body instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    try {
      const response = await fetch(url, config);

      // Parse response
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("HTTP Request Error:", error);

      // Retry logic for network errors
      if (
        retryCount < maxRetries &&
        ((error.name === "TypeError" &&
          error.message.includes("Failed to fetch")) ||
          error.message.includes("ERR_CONNECTION_REFUSED"))
      ) {
        console.log(`Retrying request (${retryCount + 1}/${maxRetries})...`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (retryCount + 1))
        ); // Exponential backoff
        return this.request(endpoint, options, retryCount + 1);
      }

      // Handle specific network errors
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        const networkError = new Error(
          "Network error: Unable to connect to server. Please check if backend is running."
        );
        networkError.originalError = error;
        throw networkError;
      }

      if (error.message.includes("ERR_CONNECTION_REFUSED")) {
        const connectionError = new Error(
          "Connection refused: Backend server is not running on port 5000."
        );
        connectionError.originalError = error;
        throw connectionError;
      }

      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: "GET" });
  }

  // POST request
  async post(endpoint, data = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      method: "POST",
      body,
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      method: "PUT",
      body,
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return this.request(endpoint, {
      method: "PATCH",
      body,
    });
  }
}

// Create and export instance
const httpClient = new HttpClient();

// Travel Destinations API
export const travelDestinationsAPI = {
  // Get all travel destinations (public - only active)
  getAll: (params = {}) => httpClient.get("/travel-destinations", params),

  // Get all travel destinations for admin (all data)
  getAllAdmin: (params = {}) =>
    httpClient.get("/travel-destinations/admin/all", params),

  // Get single travel destination
  getById: (id) => httpClient.get(`/travel-destinations/${id}`),

  // Get featured travel destinations
  getFeatured: (params = {}) =>
    httpClient.get("/travel-destinations/featured", params),

  // Create travel destination
  create: (data) => {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        if (
          key === "highlights" ||
          key === "inclusions" ||
          key === "exclusions" ||
          key === "includes" ||
          key === "tags"
        ) {
          // Handle arrays
          if (Array.isArray(data[key])) {
            data[key].forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          }
        } else if (key === "departureDate" || key === "returnDate") {
          // Handle dates
          if (data[key]) {
            formData.append(key, new Date(data[key]).toISOString());
          }
        } else if (key === "image" && data[key] instanceof File) {
          // Handle main image file
          formData.append("image", data[key]);
        } else if (key === "additionalImages" && Array.isArray(data[key])) {
          // Handle additional images
          data[key].forEach((file, index) => {
            if (file instanceof File) {
              formData.append("additionalImages", file);
            }
          });
        } else if (key === "ctaBgImage" && data[key] instanceof File) {
          // Handle CTA background image
          formData.append("ctaBgImage", data[key]);
        } else if (key === "plans") {
          // Handle plans object
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === "places") {
          // Handle places array
          formData.append(key, JSON.stringify(data[key]));
        } else {
          // Handle regular fields
          formData.append(key, data[key]);
        }
      }
    });

    return httpClient.post("/travel-destinations", formData);
  },

  // Update travel destination
  update: (id, data) => {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        if (
          key === "highlights" ||
          key === "inclusions" ||
          key === "exclusions" ||
          key === "includes" ||
          key === "tags"
        ) {
          // Handle arrays
          if (Array.isArray(data[key])) {
            data[key].forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          }
        } else if (key === "departureDate" || key === "returnDate") {
          // Handle dates
          if (data[key]) {
            formData.append(key, new Date(data[key]).toISOString());
          }
        } else if (key === "image" && data[key] instanceof File) {
          // Handle main image file
          formData.append("image", data[key]);
        } else if (key === "additionalImages" && Array.isArray(data[key])) {
          // Handle additional images
          data[key].forEach((file, index) => {
            if (file instanceof File) {
              formData.append("additionalImages", file);
            }
          });
        } else if (key === "ctaBgImage" && data[key] instanceof File) {
          // Handle CTA background image
          formData.append("ctaBgImage", data[key]);
        } else if (key === "plans") {
          // Handle plans object
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === "places") {
          // Handle places array
          formData.append(key, JSON.stringify(data[key]));
        } else {
          // Handle regular fields
          formData.append(key, data[key]);
        }
      }
    });

    return httpClient.put(`/travel-destinations/${id}`, formData);
  },

  // Delete travel destination
  delete: (id) => httpClient.delete(`/travel-destinations/${id}`),
};

// Deals API (existing)
export const dealsAPI = {
  getAll: (params = {}) => httpClient.get("/deals", params),
  getById: (id) => httpClient.get(`/deals/${id}`),
  getFeatured: (params = {}) => httpClient.get("/deals/featured", params),
  getByCategory: (category, params = {}) =>
    httpClient.get(`/deals/category/${category}`, params),
  create: (data) => httpClient.post("/deals", data),
  update: (id, data) => httpClient.put(`/deals/${id}`, data),
  delete: (id) => httpClient.delete(`/deals/${id}`),
};

// Enquiry API
export const enquiryAPI = {
  getAll: (params = {}) => httpClient.get("/enquiries", params),
  getById: (id) => httpClient.get(`/enquiries/${id}`),
  create: (data) => httpClient.post("/enquiries", data),
  update: (id, data) => httpClient.put(`/enquiries/${id}`, data),
  updateStatus: (id, status) =>
    httpClient.put(`/enquiries/${id}/status`, { status }),
  delete: (id) => httpClient.delete(`/enquiries/${id}`),
};

export default httpClient;
