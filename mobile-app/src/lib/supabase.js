import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable automatic session refresh for mobile to handle it manually
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Important for mobile apps
    storage: undefined, // Use default AsyncStorage for React Native
  },
});

// Helper functions for mobile app
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email, password, userData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData, // Additional user metadata
      },
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const createProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          ...profileData,
        },
      ]);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (userId, imageUri, fileName) => {
  try {
    // For React Native, we need to handle file uploads differently
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const filePath = `${userId}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });
    
    if (error) throw error;
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

export const uploadVerificationSelfie = async (userId, imageUri, fileName) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    const filePath = `${userId}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('verification-selfies')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });
    
    if (error) throw error;
    
    // Note: Verification selfies are private, so we don't get public URL
    return filePath;
  } catch (error) {
    console.error('Error uploading verification selfie:', error);
    throw error;
  }
};

export const getUserInterests = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_interests')
      .select(`
        interest_id,
        interests (
          id,
          name,
          category,
          description,
          icon
        )
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data.map(item => item.interests);
  } catch (error) {
    console.error('Error getting user interests:', error);
    throw error;
  }
};

export const addUserInterests = async (userId, interestIds) => {
  try {
    const userInterests = interestIds.map(interestId => ({
      user_id: userId,
      interest_id: interestId,
    }));
    
    const { data, error } = await supabase
      .from('user_interests')
      .insert(userInterests);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding user interests:', error);
    throw error;
  }
};

export const getAllInterests = async () => {
  try {
    const { data, error } = await supabase
      .from('interests')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting all interests:', error);
    throw error;
  }
};

// Auth state listener for the mobile app
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};