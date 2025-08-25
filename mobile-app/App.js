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

// Performance optimization imports
import { PerformanceUtils } from './src/utils/performance';
import { ComponentPerformanceAnalyzer } from './src/components/optimized/OptimizedComponent';
import CoreWebVitalsMonitor from './src/components/performance/CoreWebVitals';

// 🇵🇹 LusoTown Mobile - Portuguese-speaking Community Platform
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [performanceInitialized, setPerformanceInitialized] = useState(false);

  useEffect(() => {
    // Initialize app with performance optimizations
    const initializeApp = async () => {
      try {
        console.log('🚀 Initializing LusoTown Mobile App...');
        
        // Initialize performance optimizations first
        await PerformanceUtils.initialize();
        setPerformanceInitialized(true);
        
        // TODO: Initialize auth state, load fonts, etc.
        // Simulate loading with Portuguese cultural content preloading
        await new Promise(resolve => setTimeout(resolve, 800)); // Reduced from 1000ms
        
        setIsLoading(false);
        console.log('✅ App initialization complete');
      } catch (error) {
        console.error('❌ App initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
    
    // Cleanup performance resources on unmount
    return () => {
      PerformanceUtils.cleanup();
    };
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
