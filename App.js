import React, { useState, useEffect } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import VerificationScreen from './Screens/VerificationScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import HomePage from './Screens/HomePage';
import PasswordResetRequestScreen from './Screens/PasswordResetRequestScreen';
import PasswordResetScreen from './Screens/PasswordResetScreen';
import PasswordResetVerifyScreen from './Screens/PasswordResetVerifyScreen';

const Stack = createStackNavigator();


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading experience
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen once we are ready
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // If the app is not ready, render a loading indicator
    // This is only necessary if you want to display something while the resources are loaded
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        {/* Initially, show the LoginScreen after the splash screen */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordResetRequestScreen" component={PasswordResetRequestScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordResetVerifyScreen" component={PasswordResetVerifyScreen} options={{ headerShown: false }} />
        {/* Add more screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
