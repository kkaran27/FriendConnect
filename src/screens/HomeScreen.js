// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Optionally, you could add a logout function or other app-specific actions.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FriendConnect</Text>
      <Text style={styles.subtitle}>
        Connect with people and join exciting nearby events.
      </Text>
      {/* Example: A button to navigate to a profile or other functionality */}
      <Button title="Go to Profile" onPress={() => navigation.navigate('ProfileSetup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});
