import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_URL = 'http://192.168.4.44:3000/api/profile';

export default function CompleteProfileScreen({ navigation }) {
  const { userId, signOut } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    if (!userId) {
      Alert.alert('Error', 'No user ID found. Logging out...');
      signOut();
    }
  }, [userId]);

  const handleSaveProfile = async () => {
    const interestsArray = interests.split(',').map(item => item.trim());

    const payload = {
      userId,
      name,
      age,
      location: { type: 'Point', coordinates: [0, 0] }, // Simplified
      interests: interestsArray,
    };

    try {
      await axios.put(`${API_URL}/update`, payload);
      Alert.alert('Success', 'Profile updated!');
      navigation.navigate('MainApp');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert(
        'Profile Update Failed',
        error.response?.data?.msg || 'An error occurred'
      );
    }
  };

  // Navigate to the separate PhotoUploadScreen
  const handleEditPhotos = () => {
    navigation.navigate('PhotoUpload');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Complete Your Profile</Text>

        {/* Image Container with position: 'relative' */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/placeholder.png')}
            style={styles.profileImage}
          />
          {/* Edit icon at bottom-right of image */}
          <TouchableOpacity style={styles.editIcon} onPress={handleEditPhotos}>
            <Text style={styles.editIconText}>✎</Text>
          </TouchableOpacity>
        </View>

        {/* Basic fields */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Location (city/country)"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Interests (comma separated)"
          value={interests}
          onChangeText={setInterests}
        />

        {/* Save profile button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

        {/* Optional Logout */}
        <Button title="Logout" onPress={signOut} color="#666" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffecef', // Light pink background
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // Extra space from top so text isn't at the very edge
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ff5864',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageContainer: {
    // 'relative' so the edit icon can be absolutely placed inside
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#ff5864',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  editIconText: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#ff5864',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
