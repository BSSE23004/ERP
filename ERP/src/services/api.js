import axios from "axios";

// Create axios instance with base configuration
// Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies for session authentication
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add CSRF token to requests
api.interceptors.request.use((config) => {
  // Get CSRF token from cookie or meta tag
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrfToken = getCookie("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear session and redirect to login
      console.warn("Unauthorized access - redirecting to login");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

// Authentication API endpoints
export const authAPI = {
  login: (username, password) =>
    api.post("/api/auth/login/", { username, password }),

  logout: () => api.post("/api/auth/logout/"),

  getCurrentUser: () => api.get("/api/auth/me/"),

  register: (username, password, email, firstName, lastName) =>
    api.post("/api/auth/register/", {
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
    }),

  changePassword: (oldPassword, newPassword) =>
    api.post("/api/auth/change-password/", {
      old_password: oldPassword,
      new_password: newPassword,
    }),
};

export default api;
