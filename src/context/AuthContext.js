// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app mount, check AsyncStorage for an existing token/userId
  useEffect(() => {
    const checkStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('jwtToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedToken && storedUserId) {
          setToken(storedToken);
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error reading from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkStorage();
  }, []);

  // Called after a successful login
  const signIn = async (newToken, newUserId) => {
    try {
      await AsyncStorage.setItem('jwtToken', newToken);
      await AsyncStorage.setItem('userId', newUserId);
      setToken(newToken);
      setUserId(newUserId);
    } catch (error) {
      console.error('Error storing token/userId:', error);
    }
  };

  // Called to log out or when userId is missing
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('jwtToken');
      await AsyncStorage.removeItem('userId');
      setToken(null);
      setUserId(null);
    } catch (error) {
      console.error('Error removing token/userId:', error);
    }
  };

  // isAuthenticated if we have a token & userId
  const isAuthenticated = !!token && !!userId;

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userId, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
