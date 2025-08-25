import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnboardingFlow from '../screens/onboarding/OnboardingFlow';

import HomeScreen from '../screens/main/HomeScreen';
import EventsScreen from '../screens/main/EventsScreen';
import MatchesScreen from '../screens/main/MatchesScreen';
import DirectoryScreen from '../screens/main/DirectoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Modal Screens
import EventDetailsScreen from '../screens/modals/EventDetailsScreen';
import UserProfileScreen from '../screens/modals/UserProfileScreen';
import BusinessDetailsScreen from '../screens/modals/BusinessDetailsScreen';
import SettingsScreen from '../screens/modals/SettingsScreen';

import { Colors } from '../constants/Styles';
import { NavigationParamList } from '../types';

const Stack = createStackNavigator<NavigationParamList>();
const Tab = createBottomTabNavigator();

// Portuguese Cultural Tab Bar with Flag Colors
function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Events':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Matches':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Directory':
              iconName = focused ? 'business' : 'business-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary, // Portuguese red
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        headerStyle: {
          backgroundColor: Colors.surface,
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: Colors.text,
        },
        headerTintColor: Colors.text,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: t('navigation.home'),
          headerTitle: 'LusoTown 🇵🇹',
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen}
        options={{
          title: t('navigation.events'),
          headerTitle: t('navigation.events'),
        }}
      />
      <Tab.Screen 
        name="Matches" 
        component={MatchesScreen}
        options={{
          title: t('navigation.matches'),
          headerTitle: t('navigation.matches'),
        }}
      />
      <Tab.Screen 
        name="Directory" 
        component={DirectoryScreen}
        options={{
          title: t('navigation.directory'),
          headerTitle: t('navigation.directory'),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: t('navigation.profile'),
          headerTitle: t('navigation.profile'),
        }}
      />
    </Tab.Navigator>
  );
}

// Auth Stack Navigator
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
    </Stack.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  // TODO: Replace with actual auth state
  const isAuthenticated = false;
  const hasCompletedOnboarding = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.background },
        }}
      >
        {!isAuthenticated ? (
          // Auth Flow
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : !hasCompletedOnboarding ? (
          // Onboarding Flow  
          <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
        ) : (
          // Main App Flow
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            
            {/* Modal Screens */}
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen 
                name="EventDetails" 
                component={EventDetailsScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Event Details',
                  headerStyle: { backgroundColor: Colors.surface },
                  headerTitleStyle: { color: Colors.text },
                  headerTintColor: Colors.primary,
                }}
              />
              <Stack.Screen 
                name="UserProfile" 
                component={UserProfileScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Profile',
                  headerStyle: { backgroundColor: Colors.surface },
                  headerTitleStyle: { color: Colors.text },
                  headerTintColor: Colors.primary,
                }}
              />
              <Stack.Screen 
                name="BusinessDetails" 
                component={BusinessDetailsScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Business Details',
                  headerStyle: { backgroundColor: Colors.surface },
                  headerTitleStyle: { color: Colors.text },
                  headerTintColor: Colors.primary,
                }}
              />
              <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Settings',
                  headerStyle: { backgroundColor: Colors.surface },
                  headerTitleStyle: { color: Colors.text },
                  headerTintColor: Colors.primary,
                }}
              />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}