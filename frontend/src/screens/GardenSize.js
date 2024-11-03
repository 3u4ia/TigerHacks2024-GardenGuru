import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';


const GardenSize = () => {
    const [gardenWidth, setGardenWidth] = useState('');
    const [gardenLength, setGardenLength] = useState('');

    const handleSubmit = () => {
        if(!gardenWidth || !gardenLength) {
            Alert.alert('Please fill out all fields');
            return;
        }

        //Here is where I would send data to an api
        console.log('Garden Width:', gardenWidth);
        console.log('Garden Length:', gardenLength);

        Alert.alert('Your garden info has been submitted!');

    }
    console.log("rendinging GardnSize()");
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Garden Details</Text>
        
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Width</Text>
                <TextInput
                    value={gardenWidth}
                    onChangeText={setGardenWidth}
                    keyboardType='numeric'
                    placeholder='e.g., 200 width'

                />
                <Text style={styles.label}>Length</Text>
                <TextInput 
                    value={gardenLength}
                    onChangeText={setGardenLength}
                    keyboardAppearance='numeric'
                    placeholder='200 length'
                />
            </View>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#e0f7fa',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 10,
        padding: 10,
      },
      label: {
        marginTop: 15,
        fontWeight: 'bold',
        justifyContent: 'center',
        paddingTop: 30,
        
      },
      inputGroup: {
        alignContent: 'center',
        justifyContent: 'center',
        maxWidth: 300,
        paddingTop: 90,
        alignItems: 'center',
      },
      submitButton: {
        backgroundColor: '#00796b', // Primary color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25, // Rounded corners
        alignItems: 'center', // Center text horizontally
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Shadow for Android
        marginTop: 20, // Spacing from other components
    },
})

export default GardenSize;