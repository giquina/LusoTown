import 'react-native-url-polyfill/auto';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';

// i18n setup
import './src/i18n';

// Navigation
import AppNavigator from './src/navigation/AppNavigator';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { PerformanceProvider } from './src/context/PerformanceContext';

// Styles
import { Colors, CommonStyles } from './src/constants/Styles';
import { paperTheme } from './src/constants/Theme';

// Performance optimization imports
import { PerformanceUtils } from './src/utils/performance';
import CoreWebVitalsMonitor from './src/components/performance/CoreWebVitals';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

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
        
        // Initialize Portuguese cultural content and auth state
        // This will be handled by our context providers
        await new Promise(resolve => setTimeout(resolve, 800)); // Portuguese cultural content preloading
        
        // Hide splash screen
        await SplashScreen.hideAsync();
        
        setIsLoading(false);
        console.log('✅ LusoTown Mobile App initialization complete');
      } catch (error) {
        console.error('❌ App initialization error:', error);
        await SplashScreen.hideAsync();
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
        <PaperProvider theme={paperTheme}>
          <PerformanceProvider>
            <LanguageProvider>
              <AuthProvider>
                <StatusBar style="dark" backgroundColor={Colors.background} />
                <AppNavigator />
                <CoreWebVitalsMonitor />
              </AuthProvider>
            </LanguageProvider>
          </PerformanceProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
