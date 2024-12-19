// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Ensure this is the correct backend URL
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers["Authorization"]);
    }
    console.log(
      "Making request to:",
      config.url,
      "with params:",
      config.params
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to log all responses
api.interceptors.response.use(
  (response) => {
    console.log("API response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API error response:", error.response);
    }
    if (error.response && error.response.status === 401) {
      // Token might be expired or invalid
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
