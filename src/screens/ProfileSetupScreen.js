// src/screens/ProfileSetupScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_URL = 'http://192.168.4.44:3000/api/profile';

export default function ProfileSetupScreen({ navigation, route }) {
  // Retrieve the userId passed from LoginScreen
  // Safely retrieve userId from route.params
  const { userId, signOut } = useContext(AuthContext);
  
  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please log in again.');
      signOut();
    }
  }, [userId]);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  // Optionally initialize other fields like location
  const [questionnaire, setQuestionnaire] = useState([]); // This might remain empty initially

  const handleSubmit = async () => {
    // Convert interests (comma-separated string) into an array
    const interestsArray = interests.split(',').map(item => item.trim());
    
    // Prepare payload. In this example, location is hardcoded; 
    // you can integrate expo-location to capture actual coordinates.
    const payload = {
      userId,
      name,
      bio,
      interests: interestsArray,
      location: { type: 'Point', coordinates: [0, 0] },
      profilePictureUrl,
      questionnaire, // might be updated on a separate screen
    };

    try {
      const response = await axios.put(`${API_URL}/update`, payload);
      console.log('Profile updated:', response.data);
      // Navigate to the Questionnaire screen if you want to continue onboarding,
      // or directly to the main app if the questionnaire is optional.
      navigation.navigate('Questionnaire', { userId });
    } catch (error) {
      console.error('Profile update error:', error.response || error.message);
      Alert.alert('Profile Update Failed', error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Interests (comma separated)"
        value={interests}
        onChangeText={setInterests}
      />
      <TextInput
        style={styles.input}
        placeholder="Profile Picture URL"
        value={profilePictureUrl}
        onChangeText={setProfilePictureUrl}
      />
      <Button title="Save Profile" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});
