import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Divider } from 'react-native-paper';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase, signInWithEmail } from '../../lib/supabase';
import SocialLoginButtons from '../../components/auth/SocialLoginButtons';
import BiometricAuthButton from '../../components/auth/BiometricAuthButton';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
    checkSavedCredentials();
  }, []);

  const checkBiometricAvailability = async () => {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricAvailable(isAvailable && isEnrolled);
  };

  const checkSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('lusotown_user_email');
      const hasBiometricLogin = await AsyncStorage.getItem('lusotown_biometric_enabled');
      if (savedEmail && hasBiometricLogin === 'true') {
        setSavedCredentials({ email: savedEmail });
      }
    } catch (error) {
      console.error('Error checking saved credentials:', error);
    }
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmail(values.email, values.password);
      
      if (result.user) {
        // Save email for future biometric login
        await AsyncStorage.setItem('lusotown_user_email', values.email);
        
        // Track Portuguese community login
        // TODO: Add analytics tracking
        console.log('Portuguese community member logged in:', result.user.email);
        
        navigation.replace('Main');
      }
    } catch (error: any) {
      let errorMessage = t('auth.login.error.generic');
      
      // Portuguese-friendly error messages
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = t('auth.login.error.invalidCredentials');
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = t('auth.login.error.emailNotConfirmed');
      }
      
      Alert.alert(t('auth.login.error.title'), errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    if (!savedCredentials) return;
    
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t('auth.biometric.loginPrompt'),
        subtitle: savedCredentials.email,
        fallbackLabel: t('auth.biometric.fallback'),
        cancelLabel: t('common.cancel'),
      });
      
      if (result.success) {
        // Sign in with stored session or refresh token
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session && session.user) {
          navigation.replace('Main');
        } else {
          // If no valid session, show regular login
          Alert.alert(
            t('auth.biometric.sessionExpired.title'),
            t('auth.biometric.sessionExpired.message')
          );
        }
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert(
        t('auth.biometric.error.title'),
        t('auth.biometric.error.message')
      );
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Portuguese Community Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>
            {t('auth.login.welcome.title')}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {t('auth.login.welcome.subtitle')}
          </Text>
          <Text style={styles.communityInfo}>
            🇵🇹🇧🇷🇨🇻 {t('auth.login.community.info')}
          </Text>
        </View>

        {/* Biometric Login Option */}
        {biometricAvailable && savedCredentials && (
          <BiometricAuthButton
            onPress={handleBiometricLogin}
            email={savedCredentials.email}
          />
        )}

        {/* Social Login Options */}
        <SocialLoginButtons onSuccess={() => navigation.replace('Main')} />

        <Divider style={styles.divider} />
        <Text style={styles.orText}>{t('auth.login.or')}</Text>

        {/* Email/Password Login Form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <TextInput
                label={t('auth.form.email')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && !!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                label={t('auth.form.password')}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && !!errors.password}
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>
                  {t('auth.login.forgotPassword')}
                </Text>
              </TouchableOpacity>

              <Button
                mode="contained"
                onPress={handleSubmit as any}
                disabled={isLoading}
                style={styles.loginButton}
                labelStyle={styles.buttonLabel}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  t('auth.login.submit')
                )}
              </Button>
            </View>
          )}
        </Formik>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>{t('auth.login.noAccount')}</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>{t('auth.login.signUp')}</Text>
          </TouchableOpacity>
        </View>

        {/* Portuguese Community Info */}
        <View style={styles.communityStats}>
          <Text style={styles.statsText}>
            {t('auth.login.community.stats', { members: '2,750+' })}
          </Text>
          <Text style={styles.locationsText}>
            {t('auth.login.community.locations')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    ...Typography.h1,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  communityInfo: {
    ...Typography.caption,
    color: Colors.primary,
    textAlign: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  divider: {
    marginVertical: 24,
    backgroundColor: Colors.border,
  },
  orText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: Colors.surface,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginBottom: 16,
    marginLeft: 16,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    ...Typography.caption,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
  },
  buttonLabel: {
    ...Typography.button,
    color: 'white',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signUpText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  signUpLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  communityStats: {
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginTop: 'auto',
  },
  statsText: {
    ...Typography.caption,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});