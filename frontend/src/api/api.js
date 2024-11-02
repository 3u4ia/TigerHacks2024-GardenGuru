// src/api/api.js

import axios from 'axios';

// Base URL for all requests
const BASE_URL = 'https://us-central1-tigerhacks-backend.cloudfunctions.net/api';

// Get user data, list items, etc. - customize based on API routes
export const getData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

// Register user example
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

// Login user example
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
};
