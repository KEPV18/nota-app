import React, { useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import AppNavigator from './navigation/AppNavigator';
import { UserProvider } from './context/UserContext';
import { CustomLightTheme, CustomDarkTheme } from './theme/AppTheme';

export default function App() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        // Handle user state here
        setLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
});