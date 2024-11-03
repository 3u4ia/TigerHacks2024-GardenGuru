import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useUser } from '../../Context/UserContext';





const GardenSize = () => {
    const [gardenWidth, setGardenWidth] = useState('');
    const [gardenLength, setGardenLength] = useState('');
    const [cropResults, setCropResults] = useState([]);
    const { user } = useUser();

    const calculateCropCount = () => {
        if (!user.plantArray[0] && !Array.isArray(user.plantArray[0])) {
            alert("Please enter plants first via Garden Register.");
            return;
        }
        else if(!gardenWidth || !gardenLength) {
            Alert.alert('Please fill out all fields');
            return;
        } 

        let width = (gardenWidth*12) / user.plantArray[0].length;
        let length = (gardenLength*12);
        

        let cropArray = [];
        console.log(user.plantArray[0]);
        user.plantArray[0].forEach(element => {
            
            let cropsInRow = Math.floor(length / element.inLineDistance);
            let rowsInGarden = Math.floor(width / element.rowDistance);
            let totalCrops = cropsInRow * rowsInGarden;
            cropArray.push(totalCrops);

            // cropArray.append((gardenLength / element.inLineDistance) * (width / element.rowDistance));
            
        });


        // Prepare results to display
        const results = user.plantArray[0].map((plant, index) => {
            const plantName = plant.label;
            const totalNumCrops = cropArray[index];
            return `${plantName} can have ${totalNumCrops} crops`;
        });

        setCropResults(results); // Update state with results
    }

    // const handleSubmit = () => {
    //     if (!user.plantArray[0] && !Array.isArray(user.plantArray[0])) {
    //         alert("Please enter plants first via Garden Register.");
    //         return;
    //     }
    //     else if(!gardenWidth || !gardenLength) {
    //         Alert.alert('Please fill out all fields');
    //         return;
    //     } else {
    //         calculateCropCount(gardenWidth, gardenLength);
    //     }


    //     //Here is where I would send data to an api
    //     console.log('Garden Width:', gardenWidth);
    //     console.log('Garden Length:', gardenLength);



    //     Alert.alert('Your garden info has been submitted!');

    // }
    console.log("rendinging GardnSize()");
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Garden Details</Text>
        
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Width (ft)</Text>
                <TextInput
                    value={gardenWidth}
                    onChangeText={setGardenWidth}
                    keyboardType='number-pad'
                    returnKeyType='done'
                    placeholder='e.g., 200 ft '

                />
                <Text style={styles.label}>Length (ft)</Text>
                <TextInput 
                    value={gardenLength}
                    onChangeText={setGardenLength}
                    keyboardType='number-pad'
                    returnKeyType="done"
                    placeholder='200 ft long'
                />
            </View>
            
            <TouchableOpacity style={styles.submitButton} onPress={calculateCropCount}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            {/* Scrollable view for crop results */}
            <Text style={styles.subtitle}>Here's the recommended number of plants for your garden, assuming equal space for each crop.</Text>
            <ScrollView style={styles.resultsContainer} contentInset={{ bottom: 20 }}>
                {cropResults.map((result, index) => (
                    <Text key={index} style={styles.resultText}>{result}</Text>
                ))}
            </ScrollView>

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
        paddingTop: 0,
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
    resultsContainer: {
        marginTop: 20,
        width: '100%',
        maxHeight: 200,
        padding: 10,
        borderColor: '#00796b',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        padding: 25

    },
    resultText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#00796b',
    },
})

export default GardenSize;