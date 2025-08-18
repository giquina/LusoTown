import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';

// 📧 Step 3: Email - Your digital key to our community
const EmailStep = ({ onNext, email, setEmail, onBack }) => {
  const [isValid, setIsValid] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Email validation regex - covers most common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email in real-time
  useEffect(() => {
    if (!email.trim()) {
      setIsValid(false);
      setErrorMessage('');
      return;
    }

    if (!emailRegex.test(email)) {
      setIsValid(false);
      setErrorMessage('Please enter a valid email address');
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  }, [email]);

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!hasBeenTouched) {
      setHasBeenTouched(true);
    }
  };

  const handleNext = () => {
    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your email address');
      return;
    }

    if (!isValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    onNext();
  };

  // Show error only if field has been touched and has content
  const shouldShowError = hasBeenTouched && email.length > 0 && !isValid;
  const shouldShowSuccess = hasBeenTouched && isValid;

  return (
    <KeyboardAvoidingView 
      style={CommonStyles.centerContainer} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.stepContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.stepNumber}>3 of 7</Text>
          <Text style={styles.title}>What's your email?</Text>
          <Text style={styles.subtitle}>
            We'll use this to send you Portuguese community updates and keep your account secure
          </Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              shouldShowError && styles.inputError,
              shouldShowSuccess && styles.inputSuccess
            ]}
            placeholder="Enter your email address"
            placeholderTextColor={Colors.textLight}
            value={email}
            onChangeText={handleEmailChange}
            autoFocus
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={handleNext}
            autoCorrect={false}
          />
          
          {/* Validation message */}
          {shouldShowError && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          
          {shouldShowSuccess && (
            <Text style={styles.successText}>Perfect! ✨</Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, isValid && styles.buttonActive]} 
            onPress={handleNext}
            disabled={!isValid}
          >
            <Text style={[styles.buttonText, isValid && styles.buttonTextActive]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  stepNumber: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  inputContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  input: {
    ...CommonStyles.input,
    fontSize: 18,
    textAlign: 'center',
    borderColor: Colors.border,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  inputSuccess: {
    borderColor: Colors.success,
    borderWidth: 2,
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  successText: {
    ...Typography.bodySmall,
    color: Colors.success,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  button: {
    ...CommonStyles.button,
    flex: 1,
    marginLeft: Spacing.md,
    backgroundColor: Colors.border,
  },
  buttonActive: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    ...CommonStyles.buttonText,
    color: Colors.textSecondary,
  },
  buttonTextActive: {
    color: Colors.surface,
  },
});

export default EmailStep;