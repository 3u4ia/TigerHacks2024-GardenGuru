// src/screens/RegisterScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#a8e063', '#56ab2f']} // Same gradient background as Welcome page
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Icon at the Top */}
        <Ionicons name="flower-outline" size={80} color="#4CAF50" style={styles.icon} />

        {/* Title */}
        <Text style={styles.title}>Create Your Account</Text>

        {/* Input Fields */}
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />

        {/* Register Button */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="leaf-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Login Prompt */}
        <Text style={styles.promptText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Log in here
          </Text>
        </Text>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Cochin', // Match the font from Welcome Page
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#ffffffa0',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    color: '#4a4a4a',
    fontFamily: 'ChalkboardSE', // Match the playful font from Welcome Page
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 8,
  },
  promptText: {
    marginTop: 20,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  linkText: {
    color: '#ffd700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;