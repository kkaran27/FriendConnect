// src/screens/PhotoUploadScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert 
} from 'react-native';

export default function PhotoUploadScreen({ navigation }) {
  const [photos, setPhotos] = useState(Array(10).fill(null)); 
  // Up to 10 pictures; each slot initially null

  const handlePickImage = (index) => {
    // Placeholder for real image picking
    Alert.alert('Photo Picker', `Pick/Replace photo slot #${index + 1}`);
    // For example, if using expo-image-picker:
    /*
      const result = await launchImageLibraryAsync(...);
      if (!result.canceled) {
        const updated = [...photos];
        updated[index] = result.uri;
        setPhotos(updated);
      }
    */
  };

  const handleSave = () => {
    // You could upload these URIs to your server
    // or save to local state. For now, just close the screen:
    navigation.goBack(); 
  };

  const handleClearPhoto = (index) => {
    const updated = [...photos];
    updated[index] = null;
    setPhotos(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Photos</Text>
      <View style={styles.grid}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoSlot}>
            <TouchableOpacity onPress={() => handlePickImage(index)}>
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={styles.photo}
                />
              ) : (
                <View style={[styles.photo, styles.placeholder]}>
                  <Text style={styles.placeholderText}>+</Text>
                </View>
              )}
            </TouchableOpacity>
            {photo && (
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => handleClearPhoto(index)}
              >
                <Text style={styles.removeButtonText}>x</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save & Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffecef',
    // Extra space from top so text isn't at the very edge
    paddingTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#ff5864',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photoSlot: {
    width: '33.3%',
    padding: 5,
    position: 'relative',
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
    color: '#999',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#ff5864',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#ff5864',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
