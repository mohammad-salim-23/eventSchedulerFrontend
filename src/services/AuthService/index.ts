/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecode } from "jwt-decode";

const BASE_API = import.meta.env.VITE_BASE_API;


export const registerUser = async (userData: any) => {
  try {
    const res = await fetch(`${BASE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Registration failed");
    }

    // Store token if registration successful
    if (result?.success && result?.data?.token) {
      localStorage.setItem("accessToken", result.data.token);
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Registration request failed");
  }
};


export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(`${BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    // Store token if login successful
    if (result?.success && result?.data?.token) {
      localStorage.setItem("accessToken", result.data.token);
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Login request failed");
  }
};


export const getCurrentUser = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;

  try {
    const decodedData = jwtDecode(accessToken);
    return decodedData;
  } catch (error) {
    // Invalid token: remove it from storage for security
    localStorage.removeItem("accessToken");
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};
