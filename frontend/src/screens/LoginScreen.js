// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useUser } from '../../Context/UserContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://us-central1-tigerhacks-backend.cloudfunctions.net/api/user/login', {
        username,
        password,
      });

      const userData = response.data.user;
      console.log(userData);
      setUser(userData);
      navigation.navigate('Tabs');
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid Credentials Provided.")
      } else if (error.response.status === 500) {
        alert("Invalid Credentials Provided.")
      }
    }
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Offset for iOS
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Ionicons name="leaf-outline" size={80} color="#4CAF50" style={styles.icon} />

          <Text style={styles.title}>Welcome to Garden Guru!</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Ionicons name="log-in-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.promptText}>
            Don’t have an account?{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>
              Register here
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
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Cochin',
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
