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
    const token = localStorage.getItem("accessToken");
    const response = await apiClient.post("/events", eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create event");
  }
};
//get individual user event
export const getUserEvents = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await apiClient.get("/events/my-events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user events");
  }
};


//  Archive (update) an event by ID (protected route)
 
export const archiveEvent = async (id: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await apiClient.put(`/events/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to archive event");
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await apiClient.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete event");
  }
};
