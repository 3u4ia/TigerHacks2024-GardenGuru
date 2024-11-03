// src/screens/GardenRegister.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { plants } from '../components/data';
import axios from 'axios';
import { useUser } from '../../Context/UserContext';

const GardenRegister = () => {
  const { user, setUser } = useUser();

  const initialSelectedPlants = Array.isArray(user.plantArray) && user.plantArray.length > 0 ? user.plantArray[0] : [];

  const initialAvailablePlants = plants.filter(plant => 
    !initialSelectedPlants.some(selected => selected.id === plant.id)
  ).sort((a, b) => a.label.localeCompare(b.label));

  const [availablePlants, setAvailablePlants] = useState(initialAvailablePlants);
  const [selectedPlants, setSelectedPlants] = useState(initialSelectedPlants);

  useEffect(() => {
    if (user.plantArray[0]) {
      setSelectedPlants(user.plantArray[0]);
      const updatedAvailablePlants = plants.filter(plant => 
        !user.plantArray[0].some(selected => selected?.id === plant.id)
      ).sort((a, b) => a.label.localeCompare(b.label));
      
      setAvailablePlants(updatedAvailablePlants);
    }
  }, [user.plantArray]);

  const handleSelectPlant = (plant) => {
    setSelectedPlants((prevSelectedPlants) => [...prevSelectedPlants, plant]);
    setAvailablePlants((prevAvailablePlants) =>
      prevAvailablePlants.filter((item) => item.id !== plant.id)
    );
  };

  const handleRemovePlant = (plant) => {
    setAvailablePlants((prevAvailablePlants) => {
      const updatedPlants = [...prevAvailablePlants, plant];
      return updatedPlants.sort((a, b) => a.label.localeCompare(b.label));
    });
    setSelectedPlants((prevSelectedPlants) =>
      prevSelectedPlants.filter((item) => item.id !== plant.id)
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put('https://us-central1-tigerhacks-backend.cloudfunctions.net/api/user/update-plants', {
        username: user.username,
        plantArray: selectedPlants
      });

      setUser(response.data.user);
      Alert.alert("Success", "Your plants have been registered. Head back to Home to see information about the plants you chose.");
    } catch (error) {
      console.error("Error updating plant array:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Garden Plants</Text>
        
        <Text style={styles.subtitle}>Available Plants</Text>
        <ScrollView style={styles.scrollContainer} contentInset={{ bottom: 20 }}>
          {availablePlants.map((plant) => (
            <TouchableOpacity key={plant.id} style={styles.plantButton} onPress={() => handleSelectPlant(plant)}>
              <Text style={styles.plantButtonText}>{plant.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        <Text style={styles.subtitle}>Your Garden Plants</Text>
        <FlatList
          data={selectedPlants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.selectedPlantContainer}>
              <Text style={styles.selectedPlantText}>{item.label}</Text>
              <TouchableOpacity onPress={() => handleRemovePlant(item)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffffcc',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Cochin',
  },
  scrollContainer: {
    maxHeight: 200,
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  plantButton: {
    backgroundColor: '#4CAF50a0', // Transparent green background
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
    alignItems: 'center',
  },
  plantButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ChalkboardSE',
  },
  selectedPlantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedPlantText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'ChalkboardSE',
  },
  removeButton: {
    backgroundColor: '#FF6347a0', // Semi-transparent red background
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  submitButton: {
    backgroundColor: '#2E7D32', // Dark green background
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    fontFamily: 'Cochin',
  },
});

export default GardenRegister;
