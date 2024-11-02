// src/services/weatherService.js

import axios from 'axios';

const WEATHER_API_KEY = 'da49dcd4f34ddd6aec7e640c2826b23b';

export async function fetchWeatherData(latitude, longitude) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: WEATHER_API_KEY,
        units: 'imperial',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export default fetchWeatherData;
