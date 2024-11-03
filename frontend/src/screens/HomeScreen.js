// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../../Context/UserContext';

const HomeScreen = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log("Loaded plantArray data:", user.plantArray);
  }, [user.plantArray]);

  const hasPlants = user.plantArray[0] && Array.isArray(user.plantArray) && user.plantArray[0].length > 0;

  const renderPlantItem = ({ item }) => (
    <View style={styles.plantContainer}>
      <Text style={styles.plantTitle}>{item.label}</Text>
      <Text style={styles.plantDetail}>In-Line Distance: {item.inLineDistance} inches</Text>
      <Text style={styles.plantDetail}>Row Distance: {item.rowDistance} inches</Text>
      <Text style={styles.plantDetail}>Time to Plant: {item.timeToPlant}</Text>
      <Text style={styles.plantDetail}>Depth: {item.depth} inches</Text>
      <Text style={styles.plantDetail}>Harvest Time: {item.harvestTime}</Text>
      <Text style={styles.plantDetail}>Watering Info: {item.wateringInfo}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.background}>
      <View style={styles.container}>
        <Ionicons name="leaf-outline" size={80} color="#4CAF50" style={styles.icon} />
        
        <Text style={styles.title}>Welcome to Garden Guru, {user.username}!</Text>
        <Text style={styles.description}>Here you’ll find your gardening tools and resources.</Text>

        <Text style={styles.subtitle}>Your Selected Plants:</Text>
        
        {hasPlants ? (
          <FlatList
            data={user.plantArray[0]}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderPlantItem}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noPlantsText}>
            You have not chosen the plants in your garden yet. Head to Garden Registration to add some plants.
          </Text>
        )}
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
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ffffffcc',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'ChalkboardSE',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 15,
    fontFamily: 'Cochin',
    textAlign: 'center',
  },
  noPlantsText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ChalkboardSE',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  plantContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffffa0',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  plantTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Cochin',
  },
  plantDetail: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'ChalkboardSE',
  },
});

export default HomeScreen;
