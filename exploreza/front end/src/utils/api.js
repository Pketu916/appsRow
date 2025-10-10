// API Configuration
const API_BASE_URL = "http://localhost:5000";

export const api = {
  baseURL: API_BASE_URL,

  // Helper function to make API calls
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      const contentType = response.headers.get("content-type");
      let responseData;

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        // If response has JSON error data, throw it
        if (typeof responseData === "object" && responseData.message) {
          const error = new Error(responseData.message);
          error.status = response.status;
          error.data = responseData;
          throw error;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      return responseData;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    login: (credentials) =>
      api.request("/api/admin/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),

    sendOTP: (email) =>
      api.request("/api/admin/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),

    verifyOTP: (email, otp) =>
      api.request("/api/admin/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      }),

    getProfile: (token) =>
      api.request("/api/admin/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    logout: (token) =>
      api.request("/api/admin/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },

  // Admin Management endpoints
  adminManagement: {
    getAll: (token) =>
      api.request("/api/admin/management", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    getById: (id, token) =>
      api.request(`/api/admin/management/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    create: (adminData, token) =>
      api.request("/api/admin/management", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }),

    update: (id, adminData, token) =>
      api.request(`/api/admin/management/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }),

    delete: (id, token) =>
      api.request(`/api/admin/management/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },
};

export default api;
