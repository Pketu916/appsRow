import { travelDestinationsAPI } from "../utils/http.js";

class TravelDestinationsService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Cache management
  _isCacheValid(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheTimeout;
  }

  _setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  _getCache(key) {
    const cached = this.cache.get(key);
    return cached ? cached.data : null;
  }

  // Get all travel destinations
  async getAllTravelDestinations(params = {}) {
    const cacheKey = `all_${JSON.stringify(params)}`;

    if (this._isCacheValid(cacheKey)) {
      return this._getCache(cacheKey);
    }

    try {
      const response = await travelDestinationsAPI.getAll(params);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error("Error fetching travel destinations:", error);
      throw error;
    }
  }

  // Get featured travel destinations
  async getFeaturedTravelDestinations(params = {}) {
    const cacheKey = `featured_${JSON.stringify(params)}`;

    if (this._isCacheValid(cacheKey)) {
      return this._getCache(cacheKey);
    }

    try {
      const response = await travelDestinationsAPI.getFeatured(params);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error("Error fetching featured travel destinations:", error);
      throw error;
    }
  }

  // Get travel destination by ID
  async getTravelDestinationById(id) {
    const cacheKey = `single_${id}`;

    if (this._isCacheValid(cacheKey)) {
      return this._getCache(cacheKey);
    }

    try {
      const response = await travelDestinationsAPI.getById(id);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error(`Error fetching travel destination ${id}:`, error);
      throw error;
    }
  }

  // Search travel destinations
  async searchTravelDestinations(searchParams = {}) {
    const cacheKey = `search_${JSON.stringify(searchParams)}`;

    if (this._isCacheValid(cacheKey)) {
      return this._getCache(cacheKey);
    }

    try {
      const response = await travelDestinationsAPI.getAll(searchParams);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error("Error searching travel destinations:", error);
      throw error;
    }
  }

  // Get travel destinations by country
  async getTravelDestinationsByCountry(country, params = {}) {
    const searchParams = { ...params, country };
    return this.searchTravelDestinations(searchParams);
  }

  // Get travel destinations by category
  async getTravelDestinationsByCategory(category, params = {}) {
    const searchParams = { ...params, category };
    return this.searchTravelDestinations(searchParams);
  }

  // Get travel destinations by price range
  async getTravelDestinationsByPriceRange(minPrice, maxPrice, params = {}) {
    const searchParams = { ...params, minPrice, maxPrice };
    return this.searchTravelDestinations(searchParams);
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Clear specific cache entry
  clearCacheEntry(key) {
    this.cache.delete(key);
  }
}

// Create and export singleton instance
const travelDestinationsService = new TravelDestinationsService();

export default travelDestinationsService;
