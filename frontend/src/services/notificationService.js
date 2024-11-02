// src/services/notificationService.js

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

/**
 * Registers the device for push notifications.
 * @returns {Promise<string>} - The Expo push token.
 */
export async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Failed to get push token for push notifications!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Notification Token:', token);
  return token;
}

/**
 * Configures notification behavior.
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Schedules a daily watering reminder notification.
 * @param {string} cropName - Name of the crop.
 * @param {number} hour - Hour of the day for notification.
 * @param {number} minute - Minute of the hour for notification.
 */
export async function scheduleWateringReminder(cropName, hour, minute) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Watering Reminder for ${cropName}`,
      body: `It’s time to water your ${cropName}!`,
    },
    trigger: {
      hour,
      minute,
      repeats: true, // Set to true to repeat daily
    },
  });
}

/**
 * Sends an immediate weather alert notification.
 * @param {string} alertMessage - The alert message for weather conditions.
 */
export async function scheduleWeatherAlert(alertMessage) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Weather Alert!',
      body: alertMessage,
    },
    trigger: null, // Sends immediately
  });
}
