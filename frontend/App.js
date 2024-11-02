// App.js
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
//import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import GardenRegisterScreen from './src/screens/GardenRegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          console.log(route)
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Garden Register') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#e0ffe0',
          borderTopWidth: 0,
        },
      })}
    >
      {/* Put More Tabs Here for each page to show up in tab navigator*/}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Garden Register" component={GardenRegisterScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Cochin: require('./assets/fonts/Cochin-Regular.ttf'),
    ChalkboardSE: require('./assets/fonts/ChalkboardSE-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      //await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="Tabs" // Start with Login screen
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
