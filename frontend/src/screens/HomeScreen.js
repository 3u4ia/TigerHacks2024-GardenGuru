// src/screens/HomeScreen.js
import React, {useEffect} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { dataTest } from '../components/data';
import { useUser } from '../../Context/UserContext';

const HomeScreen = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log("Loaded plantArray data:", user.plantArray);
  }, [user.plantArray])

  const hasPlants = user.plantArray[0] && Array.isArray(user.plantArray) && user.plantArray[0].length > 0;

  //console.log(user.plantArray[0]);

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Garden Dashboard {user.username}!</Text>
      <Text style={styles.description}>Here you’ll find your gardening tools and resources.</Text>
      
      <Text style={styles.subtitle}>Your Selected Plants:</Text>
      { hasPlants ? (
      <FlatList
        data={user.plantArray[0]}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderPlantItem}
      />
      ) : (
        <Text>You have not chosen the plants in your garden just yet head to Garden Registration to add some plants.</Text>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#00796b',
  },
  plantContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%', // Change to 100% to utilize full width
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  plantTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  plantDetail: {
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
