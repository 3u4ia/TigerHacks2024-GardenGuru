// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ScrollView } from 'react-native';
import { plants } from '../components/data'

const GardenRegister = () => {
  const [availablePlants, setAvailablePlants] = useState(
    [...plants].sort((a, b) => a.label.localeCompare(b.label))
  );
  const [selectedPlants, setSelectedPlants] = useState([]);

    const handleSelectPlant = (plant) => {
      // Add the plant to selectedPlants
      setSelectedPlants((prevSelectedPlants) => [...prevSelectedPlants, plant]);
      // Remove the plant from availablePlants
      setAvailablePlants((prevAvailablePlants) =>
        prevAvailablePlants.filter((item) => item.id !== plant.id)
      );
    };

    const handleRemovePlant = (plant) => {
      // Add the plant back to availablePlants
      setAvailablePlants((prevAvailablePlants) => {
        // Create a new array with the plant added back
        const updatedPlants = [...prevAvailablePlants, plant];
        // Sort the updated array by label
        return updatedPlants.sort((a, b) => a.label.localeCompare(b.label));
      });
      
      // Remove the plant from selectedPlants
      setSelectedPlants((prevSelectedPlants) =>
        prevSelectedPlants.filter((item) => item.id !== plant.id)
      );
    };

    const handleSubmit = () => {
      // Prepare the data to be sent to the API
      const plantData = selectedPlants.map((plant) => plant.label);
      
      // Here you can implement your API submission logic
      console.log('Submitting selected plants:', plantData);
  
      // Show a success alert for now
      alert('Your selected plants have been submitted!');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Garden Plants</Text>
        
        <Text style={styles.subtitle}>Available Plants</Text>
        <ScrollView style={styles.scrollContainer}>
          {availablePlants.map((plant) => (
            <View key={plant.id} style={styles.buttonContainer}>
              <Button
                title={plant.label}
                onPress={() => handleSelectPlant(plant)}
                color="#4CAF50"
              />
            </View>
          ))}
        </ScrollView>
  
        <Text style={styles.subtitle}>Your Garden Plants</Text>
        <FlatList
        data={selectedPlants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.selectedPlantContainer}>
            <Text style={styles.selectedPlant}>{item.label}</Text>
            <Button
              title="Remove"
              onPress={() => handleRemovePlant(item)}
              color="#FF6347" // Tomato color for "Remove" button
            />
          </View>
        )}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
        color="#2196F3" // Blue color for "Submit" button
        style={styles.submitButton}
      />
      </View>
    );
  }

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#004d40',
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 200, // Limit the height of the ScrollView
    width: '100%',
    marginBottom: 20, // Add some space below the ScrollView
    
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
  selectedPlantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 5,
  },
  selectedPlant: {
    fontSize: 16,
    color: '#333',
    marginTop: 5
  },
});

export default GardenRegister;
