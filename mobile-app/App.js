import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// i18n setup
import './src/i18n';

// Navigation
import AppNavigator from './src/navigation/AppNavigator';

// Styles
import { Colors, CommonStyles } from './src/constants/Styles';

// 🇵🇹 LusoTown Mobile - Portuguese-speaking Community Platform
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize app (fonts, auth, etc.)
    const initializeApp = async () => {
      try {
        // TODO: Initialize auth state, load fonts, etc.
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View style={CommonStyles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={Colors.background} />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
