// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://us-central1-tigerhacks-backend.cloudfunctions.net/api/user/signup', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        alert(response.data);
        navigation.navigate('Login');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset for iOS
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Ionicons name="flower-outline" size={80} color="#4CAF50" style={styles.icon} />

          <Text style={styles.title}>Create Your Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Ionicons name="leaf-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.promptText}>
            Already have an account?{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
              Log in here
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Cochin',
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
    fontFamily: 'ChalkboardSE',
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
