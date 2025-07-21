/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_API;

// Axios instance for better scalability
const apiClient = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getAllEvents = async () => {
  try {
    const response = await apiClient.get("/events");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch events");
  }
};

export const createEvent = async (eventData: any) => {
  try {
    const response = await apiClient.post("/events", eventData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create event");
  }
};

/**
 * Archive (update) an event by ID (protected route)
 */
export const archiveEvent = async (id: string) => {
  try {
    const response = await apiClient.put(`/events/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to archive event");
  }
};


export const deleteEvent = async (id: string) => {
  try {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete event");
  }
};
