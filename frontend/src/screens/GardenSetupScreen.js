// src/screens/GardenSetupScreen.js

import React, { useEffect } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { registerForPushNotificationsAsync, scheduleWateringReminder } from '../services/notificationService.js';

export default function GardenSetupScreen() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const handleSetReminder = () => {
    Alert.prompt(
      'Set Watering Reminder',
      'Enter crop name and time',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: (cropName, time) => {
          const [hour, minute] = time.split(':').map(Number);
          scheduleWateringReminder(cropName, hour, minute);
          alert(`Reminder set for ${cropName} at ${hour}:${minute}`);
        }}
      ],
      'plain-text'
    );
  };

  return (
    <View>
      <Text>Garden Setup</Text>
      <Button title="Set Watering Reminder" onPress={handleSetReminder} />
    </View>
  );
}
