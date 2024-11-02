// src/services/updateGardenInfo.js

import fetchWeatherData from './weatherService.js';
import { updateWateringInfo } from './UpdateGardenInfo.js';
import { scheduleWeatherAlert } from './notificationService.js';

/**
 * Updates garden recommendations based on weather data.
 * @param {number} latitude - The latitude of the location
 * @param {number} longitude - The longitude of the location
 * @param {number} cropId - The ID of the crop to update
 */
async function updateGardenRecommendations(latitude, longitude, cropId) {
  try {
    const weather = await fetchWeatherData(latitude, longitude);
    const { main, weather: weatherDescription } = weather;

    let newWateringInfo;
    if (weatherDescription[0].main === 'Rain') {
      newWateringInfo = 'Reduce watering due to rain';
      await scheduleWeatherAlert('Rain expected. Adjust watering schedule.');
    } else if (main.temp > 85) {
      newWateringInfo = 'Water daily due to high temperatures';
    } else if (main.temp < 50) {
      newWateringInfo = 'Minimal watering due to low temperatures';
    } else {
      newWateringInfo = 'Water as per regular schedule';
    }

    updateWateringInfo(cropId, newWateringInfo);
    console.log(`Updated watering info based on weather: ${newWateringInfo}`);
  } catch (error) {
    console.error('Could not update garden recommendations:', error);
  }
}

export { updateGardenRecommendations };
