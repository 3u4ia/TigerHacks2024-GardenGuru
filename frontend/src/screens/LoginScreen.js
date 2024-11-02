// src/screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.background}>
      <View style={styles.container}>
        {/* Use "leaf-outline" icon instead of "tree-outline" */}
        <Ionicons name="leaf-outline" size={80} color="#4CAF50" style={styles.icon} />

        {/* Title with Custom Font */}
        <Text style={styles.title}>Welcome to Garden Guru!</Text>

        {/* Username and Password Fields */}
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />

        {/* Login Button */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="log-in-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Register Prompt */}
        <Text style={styles.promptText}>
          Don’t have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
            Register here
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
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Cochin', // Use loaded font
    textAlign: 'center',
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
    fontFamily: 'ChalkboardSE', // Use loaded font
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
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
  },
  linkText: {
    color: '#ffd700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
