import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import { Colors, Typography } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

interface SocialLoginButtonsProps {
  onSuccess: () => void;
  isSignup?: boolean;
}

export default function SocialLoginButtons({ onSuccess, isSignup = false }: SocialLoginButtonsProps) {
  const { t } = useTranslation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  // Google Auth Configuration
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  // Facebook Auth Configuration
  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '',
  });

  React.useEffect(() => {
    if (googleResponse?.type === 'success') {
      handleGoogleSuccess(googleResponse.authentication?.accessToken);
    }
  }, [googleResponse]);

  React.useEffect(() => {
    if (facebookResponse?.type === 'success') {
      handleFacebookSuccess(facebookResponse.authentication?.accessToken);
    }
  }, [facebookResponse]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await googlePromptAsync();
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert(
        t('auth.social.error.title'),
        t('auth.social.error.google')
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleSuccess = async (accessToken?: string) => {
    if (!accessToken) return;
    
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: accessToken,
      });

      if (error) throw error;

      if (data.user) {
        // Create or update Portuguese community profile
        await createPortugueseProfile(data.user.id, {
          email: data.user.email,
          full_name: data.user.user_metadata.full_name,
          avatar_url: data.user.user_metadata.avatar_url,
          provider: 'google',
        });
        
        onSuccess();
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      Alert.alert(
        t('auth.social.error.title'),
        t('auth.social.error.authentication')
      );
    }
  };

  const handleFacebookLogin = async () => {
    setIsFacebookLoading(true);
    try {
      await facebookPromptAsync();
    } catch (error) {
      console.error('Facebook login error:', error);
      Alert.alert(
        t('auth.social.error.title'),
        t('auth.social.error.facebook')
      );
    } finally {
      setIsFacebookLoading(false);
    }
  };

  const handleFacebookSuccess = async (accessToken?: string) => {
    if (!accessToken) return;
    
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'facebook',
        token: accessToken,
      });

      if (error) throw error;

      if (data.user) {
        // Create or update Portuguese community profile
        await createPortugueseProfile(data.user.id, {
          email: data.user.email,
          full_name: data.user.user_metadata.full_name,
          avatar_url: data.user.user_metadata.avatar_url,
          provider: 'facebook',
        });
        
        onSuccess();
      }
    } catch (error) {
      console.error('Facebook authentication error:', error);
      Alert.alert(
        t('auth.social.error.title'),
        t('auth.social.error.authentication')
      );
    }
  };

  const handleAppleLogin = async () => {
    if (!AppleAuthentication.isAvailableAsync()) {
      Alert.alert(
        t('auth.social.error.title'),
        t('auth.social.error.appleNotAvailable')
      );
      return;
    }

    setIsAppleLoading(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });

        if (error) throw error;

        if (data.user) {
          // Create or update Portuguese community profile
          await createPortugueseProfile(data.user.id, {
            email: credential.email || data.user.email,
            full_name: credential.fullName ? 
              `${credential.fullName.givenName} ${credential.fullName.familyName}` : 
              data.user.user_metadata.full_name,
            provider: 'apple',
          });
          
          onSuccess();
        }
      }
    } catch (error: any) {
      if (error.code === 'ERR_CANCELED') {
        // User canceled the sign-in flow
        return;
      }
      
      console.error('Apple login error:', error);
      Alert.alert(
        t('auth.social.error.title'),
        t('auth.social.error.apple')
      );
    } finally {
      setIsAppleLoading(false);
    }
  };

  const createPortugueseProfile = async (userId: string, userData: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email: userData.email,
          first_name: userData.full_name?.split(' ')[0] || '',
          last_name: userData.full_name?.split(' ').slice(1).join(' ') || '',
          avatar_url: userData.avatar_url,
          provider: userData.provider,
          is_portuguese_speaker: true,
          community_type: 'portuguese-speaking',
          joined_via_app: true,
          registration_source: 'social-login',
          onboarding_completed: false, // Will complete in heritage selection
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Error creating Portuguese profile:', error);
      }
    } catch (error) {
      console.error('Error in createPortugueseProfile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignup ? 
          t('auth.social.signup.title') : 
          t('auth.social.login.title')
        }
      </Text>

      {/* Google Login */}
      <TouchableOpacity
        style={[styles.socialButton, styles.googleButton]}
        onPress={handleGoogleLogin}
        disabled={isGoogleLoading || !googleRequest}
      >
        {isGoogleLoading ? (
          <ActivityIndicator size="small" color="#4285F4" />
        ) : (
          <>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>
              {isSignup ? 
                t('auth.social.signup.google') : 
                t('auth.social.login.google')
              }
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Facebook Login */}
      <TouchableOpacity
        style={[styles.socialButton, styles.facebookButton]}
        onPress={handleFacebookLogin}
        disabled={isFacebookLoading || !facebookRequest}
      >
        {isFacebookLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Text style={styles.facebookIcon}>f</Text>
            <Text style={styles.facebookText}>
              {isSignup ? 
                t('auth.social.signup.facebook') : 
                t('auth.social.login.facebook')
              }
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Apple Login (iOS only) */}
      {Platform.OS === 'ios' && (
        <TouchableOpacity
          style={[styles.socialButton, styles.appleButton]}
          onPress={handleAppleLogin}
          disabled={isAppleLoading}
        >
          {isAppleLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <>
              <Text style={styles.appleIcon}></Text>
              <Text style={styles.appleText}>
                {isSignup ? 
                  t('auth.social.signup.apple') : 
                  t('auth.social.login.apple')
                }
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Portuguese Community Note */}
      <Text style={styles.communityNote}>
        {t('auth.social.community.note')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    minHeight: 48,
  },
  googleButton: {
    backgroundColor: 'white',
    borderColor: '#DADCE0',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  googleText: {
    ...Typography.button,
    color: '#3C4043',
    flex: 1,
    textAlign: 'center',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  facebookIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  facebookText: {
    ...Typography.button,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  appleButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  appleIcon: {
    fontSize: 18,
    color: 'white',
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  appleText: {
    ...Typography.button,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  communityNote: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    lineHeight: 16,
  },
});