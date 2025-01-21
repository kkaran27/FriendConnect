// src/navigation/AppStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileSetup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <Stack.Screen name="MainApp" component={HomeScreen} />
    </Stack.Navigator>
  );
}
