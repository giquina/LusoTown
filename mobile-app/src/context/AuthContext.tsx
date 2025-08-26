import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { 
  supabase, 
  getCurrentUser, 
  signOut,
  onAuthStateChange,
  PortugueseCommunityAPI 
} from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboardingComplete: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const isAuthenticated = !!user;

  // Load persisted auth state
  const loadPersistedAuthState = useCallback(async () => {
    try {
      // Check for stored session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session?.user && !error) {
        await loadUserProfile(session.user.id);
      } else {
        // Clear any invalid stored data
        await AsyncStorage.removeItem('lusotown_user');
        await AsyncStorage.removeItem('lusotown_onboarding_complete');
      }
    } catch (error) {
      console.error('Error loading persisted auth state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        const userProfile: User = {
          id: data.id,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          dateOfBirth: data.date_of_birth || '',
          profilePicture: data.profile_picture || '',
          heritage: data.heritage || 'portugal',
          language: data.language || 'en',
          interests: data.interests || [],
          isVerified: data.is_verified || false,
          createdAt: data.created_at || '',
          updatedAt: data.updated_at || '',
        };

        setUser(userProfile);
        setIsOnboardingComplete(data.onboarding_completed || false);
        
        // Store user data for offline access
        await AsyncStorage.setItem('lusotown_user', JSON.stringify(userProfile));
        await AsyncStorage.setItem('lusotown_onboarding_complete', String(data.onboarding_completed || false));
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    loadPersistedAuthState();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsOnboardingComplete(false);
        await AsyncStorage.removeItem('lusotown_user');
        await AsyncStorage.removeItem('lusotown_onboarding_complete');
        await SecureStore.deleteItemAsync('lusotown_biometric_enabled');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [loadPersistedAuthState, loadUserProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await loadUserProfile(data.user.id);
        
        // Store email for biometric login
        await AsyncStorage.setItem('lusotown_user_email', email);
        
        console.log('Portuguese-speaking community member signed in:', email);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  }, [loadUserProfile]);

  const signUp = useCallback(async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const profileData = {
          id: data.user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: email,
          heritage: userData.heritage || 'portugal',
          language: userData.language || 'en',
          onboarding_completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([profileData]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error('Failed to create user profile');
        }

        console.log('New Portuguese-speaking community member signed up:', email);
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await signOut();
      
      // Clear all stored data
      setUser(null);
      setIsOnboardingComplete(false);
      await AsyncStorage.multiRemove([
        'lusotown_user',
        'lusotown_user_email',
        'lusotown_onboarding_complete'
      ]);
      await SecureStore.deleteItemAsync('lusotown_biometric_enabled');
      
      console.log('User signed out');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (userData: Partial<User>) => {
    if (!user) throw new Error('No user authenticated');

    try {
      setIsLoading(true);
      
      const updateData: any = {};
      
      if (userData.firstName) updateData.first_name = userData.firstName;
      if (userData.lastName) updateData.last_name = userData.lastName;
      if (userData.phone) updateData.phone = userData.phone;
      if (userData.heritage) updateData.heritage = userData.heritage;
      if (userData.language) updateData.language = userData.language;
      if (userData.interests) updateData.interests = userData.interests;
      if (userData.profilePicture) updateData.profile_picture = userData.profilePicture;
      
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update local user state
      const updatedUser = { ...user, ...userData, updatedAt: updateData.updated_at };
      setUser(updatedUser);
      await AsyncStorage.setItem('lusotown_user', JSON.stringify(updatedUser));
      
      console.log('User profile updated');
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const completeOnboarding = useCallback(async (onboardingData: any) => {
    if (!user) throw new Error('No user authenticated');

    try {
      setIsLoading(true);
      
      const result = await PortugueseCommunityAPI.completePortugueseOnboarding({
        ...onboardingData,
        userId: user.id,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to complete onboarding');
      }

      setIsOnboardingComplete(true);
      await AsyncStorage.setItem('lusotown_onboarding_complete', 'true');
      
      // Reload user profile to get updated data
      await loadUserProfile(user.id);
      
      console.log('Portuguese cultural onboarding completed');
    } catch (error: any) {
      console.error('Complete onboarding error:', error);
      throw new Error(error.message || 'Failed to complete onboarding');
    } finally {
      setIsLoading(false);
    }
  }, [user, loadUserProfile]);

  const refreshUser = useCallback(async () => {
    if (!user) return;
    
    try {
      await loadUserProfile(user.id);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  }, [user, loadUserProfile]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    isOnboardingComplete,
    signIn,
    signUp,
    signOut: signOutUser,
    updateUserProfile,
    completeOnboarding,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;