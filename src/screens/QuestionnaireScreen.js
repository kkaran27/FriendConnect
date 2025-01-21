// src/screens/QuestionnaireScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.4.44:3000/api/profile';

export default function QuestionnaireScreen({ navigation, route }) {
  const { userId } = route.params;
  
  const questions = [
    'Do you enjoy outdoor activities?',
    'Are you a morning person?',
    'Do you prefer quiet evenings or lively events?',
  ];
  
  const [responses, setResponses] = useState(Array(questions.length).fill(''));

  const handleChangeResponse = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmitQuestionnaire = async () => {
    const payload = {
      userId,
      questionnaire: responses,
    };

    try {
      const response = await axios.put(`${API_URL}/update`, payload);
      console.log('Questionnaire updated:', response.data);
      // Navigate to the main app screen after successfully updating
      navigation.navigate('MainApp');
    } catch (error) {
      console.error('Questionnaire update error:', error.response || error.message);
      Alert.alert('Failed to save questionnaire', error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Questionnaire</Text>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          <TextInput
            style={styles.input}
            placeholder="Your answer..."
            value={responses[index]}
            onChangeText={(value) => handleChangeResponse(index, value)}
          />
        </View>
      ))}
      <Button title="Submit Questionnaire" onPress={handleSubmitQuestionnaire} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  questionContainer: { marginBottom: 15 },
  question: { fontSize: 16, marginBottom: 5 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 5 },
});