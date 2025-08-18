import 'react-native-url-polyfill/auto';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your onboarding flow
import OnboardingFlow from './src/screens/onboarding/OnboardingFlow';
import { Colors, CommonStyles, Typography } from './src/constants/Styles';

// 🚀 Main App Component - Your community app starts here!
export default function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [user, setUser] = useState(null);

  // Handle onboarding completion
  const handleOnboardingComplete = (userData) => {
    console.log('Onboarding completed with data:', userData);
    setUser(userData);
    setIsOnboardingComplete(true);
  };

  // Show different screens based on user state
  if (!isOnboardingComplete) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={Colors.background} />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </SafeAreaProvider>
    );
  }

  // Placeholder for main app (after onboarding)
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={Colors.background} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          Welcome to LusoTown, {user?.firstName}! 🎉
        </Text>
        <Text style={styles.subText}>
          Your Portuguese community in London awaits...
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.centerContainer,
  },
  welcomeText: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: 16,
  },
  subText: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
});
