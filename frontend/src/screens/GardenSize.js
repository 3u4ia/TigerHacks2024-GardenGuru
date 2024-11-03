// src/screens/GardenSize.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../../Context/UserContext';

const GardenSize = () => {
    const [gardenWidth, setGardenWidth] = useState('');
    const [gardenLength, setGardenLength] = useState('');
    const [cropResults, setCropResults] = useState([]);
    const { user } = useUser();

    const calculateCropCount = () => {
        if (!user.plantArray[0] && !Array.isArray(user.plantArray[0])) {
            Alert.alert("Please enter plants first via Garden Register.");
            return;
        } else if (!gardenWidth || !gardenLength) {
            Alert.alert('Please fill out all fields');
            return;
        }

        let width = (gardenWidth * 12) / user.plantArray[0].length;
        let length = (gardenLength * 12);

        let cropArray = [];
        user.plantArray[0].forEach(element => {
            let cropsInRow = Math.floor(length / element.inLineDistance);
            let rowsInGarden = Math.floor(width / element.rowDistance);
            let totalCrops = cropsInRow * rowsInGarden;
            cropArray.push(totalCrops);
        });

        const results = user.plantArray[0].map((plant, index) => {
            const plantName = plant.label;
            const totalNumCrops = cropArray[index];
            return `${plantName} can have ${totalNumCrops} crops`;
        });

        setCropResults(results);
    };

    return (
        <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Garden Details</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Width (ft)</Text>
                    <TextInput
                        style={styles.input}
                        value={gardenWidth}
                        onChangeText={setGardenWidth}
                        keyboardType='number-pad'
                        returnKeyType='done'
                        placeholder='e.g., 200 ft'
                        placeholderTextColor="#888"
                    />
                    <Text style={styles.label}>Length (ft)</Text>
                    <TextInput
                        style={styles.input}
                        value={gardenLength}
                        onChangeText={setGardenLength}
                        keyboardType='number-pad'
                        returnKeyType="done"
                        placeholder='e.g., 200 ft'
                        placeholderTextColor="#888"
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={calculateCropCount}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

                <Text style={styles.subtitle}>Here's the recommended number of plants for your garden, assuming equal space for each crop:</Text>
                
                <ScrollView style={styles.resultsContainer} contentInset={{ bottom: 20 }}>
                    {cropResults.map((result, index) => (
                        <Text key={index} style={styles.resultText}>{result}</Text>
                    ))}
                </ScrollView>
            </SafeAreaView>
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
    inputGroup: {
        alignContent: 'center',
        justifyContent: 'center',
        maxWidth: 300,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffffcc',
        marginTop: 20,
        fontFamily: 'Cochin',
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
    submitButton: {
        backgroundColor: '#4CAF50',
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
    subtitle: {
        fontSize: 14,
        color: '#ffffffcc',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        fontFamily: 'ChalkboardSE',
    },
    resultsContainer: {
        marginTop: 20,
        width: '90%',
        maxHeight: 200,
        padding: 10,
        borderColor: '#00796b',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    resultText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#00796b',
        fontFamily: 'ChalkboardSE',
    },
});

export default GardenSize;
