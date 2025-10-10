import { useState, useEffect, useCallback } from "react";
import travelDestinationsService from "../services/travelDestinationsService.js";

// Custom hook for managing travel destinations state
export const useTravelDestinations = (initialParams = {}) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Fetch destinations function
  const fetchDestinations = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await travelDestinationsService.getAllTravelDestinations(
        params
      );

      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        setDestinations(response.data);
        setTotalCount(response.totalCount || response.data.length);
        setHasMore(response.hasMore || false);
      } else if (Array.isArray(response)) {
        setDestinations(response);
        setTotalCount(response.length);
        setHasMore(false);
      } else {
        setDestinations([]);
        setTotalCount(0);
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch travel destinations");
      setDestinations([]);
      setTotalCount(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more destinations (for pagination)
  const loadMore = useCallback(
    async (params = {}) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response =
          await travelDestinationsService.getAllTravelDestinations({
            ...params,
            page: Math.floor(destinations.length / 10) + 1, // Assuming 10 items per page
            limit: 10,
          });

        if (response.data && Array.isArray(response.data)) {
          setDestinations((prev) => [...prev, ...response.data]);
          setHasMore(response.hasMore || false);
        } else if (Array.isArray(response)) {
          setDestinations((prev) => [...prev, ...response]);
          setHasMore(false);
        }
      } catch (err) {
        setError(err.message || "Failed to load more destinations");
      } finally {
        setLoading(false);
      }
    },
    [destinations.length, loading, hasMore]
  );

  // Refresh destinations
  const refresh = useCallback(
    (params = {}) => {
      travelDestinationsService.clearCache();
      return fetchDestinations(params);
    },
    [fetchDestinations]
  );

  // Initial load
  useEffect(() => {
    fetchDestinations(initialParams);
  }, [fetchDestinations]);

  return {
    destinations,
    loading,
    error,
    totalCount,
    hasMore,
    fetchDestinations,
    loadMore,
    refresh,
    setDestinations,
  };
};

// Custom hook for featured travel destinations
export const useFeaturedTravelDestinations = (params = {}) => {
  const [featuredDestinations, setFeaturedDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeatured = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await travelDestinationsService.getFeaturedTravelDestinations(params);

      if (response.data && Array.isArray(response.data)) {
        setFeaturedDestinations(response.data);
      } else if (Array.isArray(response)) {
        setFeaturedDestinations(response);
      } else {
        setFeaturedDestinations([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch featured destinations");
      setFeaturedDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchFeatured();
  }, []);

  return {
    featuredDestinations,
    loading,
    error,
    refresh: fetchFeatured,
  };
};

// Custom hook for single travel destination
export const useTravelDestination = (id) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDestination = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await travelDestinationsService.getTravelDestinationById(
        id
      );

      if (response.data) {
        setDestination(response.data);
      } else {
        setDestination(response);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch destination");
      setDestination(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDestination();
  }, [fetchDestination]);

  return {
    destination,
    loading,
    error,
    refresh: fetchDestination,
  };
};

// Custom hook for search functionality
export const useTravelDestinationSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await travelDestinationsService.searchTravelDestinations(
        searchParams
      );

      if (response.data && Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else if (Array.isArray(response)) {
        setSearchResults(response);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError(err.message || "Search failed");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    search,
    clearSearch,
  };
};

export default useTravelDestinations;
