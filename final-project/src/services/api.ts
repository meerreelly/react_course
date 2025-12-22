import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../state/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please sign in again.");
      useAuthStore.getState().clearAuth();
      window.location.href = "/";
    } else if (error.response?.status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (error.response?.status === 404) {
      toast.error("Resource not found.");
    } else if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

export default api;
