import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Custom hook for managing API data with CRUD operations
 * Usage: const { data, loading, error, create, update, delete_, refetch } = useAPI("/api/academics/subjects/");
 */
export const useAPI = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch data from API endpoint
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(endpoint);
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to fetch data";
      setError(errorMessage);
      console.error(`Error fetching from ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch data on component mount
   */
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  /**
   * Create new item
   * @param {Object} item - Item to create
   * @returns {Promise<Object>} - Created item from server
   */
  const create = async (item) => {
    try {
      setError(null);
      const response = await api.post(endpoint, item);
      setData([...data, response.data]);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to create item";
      setError(errorMessage);
      console.error(`Error creating at ${endpoint}:`, err);
      throw err;
    }
  };

  /**
   * Update existing item
   * @param {number|string} id - Item ID
   * @param {Object} item - Updated item data
   * @returns {Promise<Object>} - Updated item from server
   */
  const update = async (id, item) => {
    try {
      setError(null);
      const response = await api.put(`${endpoint}${id}/`, item);
      setData(data.map((d) => (d.id === id ? response.data : d)));
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to update item";
      setError(errorMessage);
      console.error(`Error updating at ${endpoint}${id}/:`, err);
      throw err;
    }
  };

  /**
   * Delete item
   * @param {number|string} id - Item ID to delete
   * @returns {Promise<void>}
   */
  const delete_ = async (id) => {
    try {
      setError(null);
      await api.delete(`${endpoint}${id}/`);
      setData(data.filter((d) => d.id !== id));
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to delete item";
      setError(errorMessage);
      console.error(`Error deleting from ${endpoint}${id}/:`, err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    delete: delete_,
    refetch: fetchData,
  };
};

export default useAPI;
