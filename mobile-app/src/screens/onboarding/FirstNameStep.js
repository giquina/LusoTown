import React, { useState } from 'react';
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

// 🚀 Step 1: First Name - The welcoming front door of your app
const FirstNameStep = ({ onNext, firstName, setFirstName }) => {
  const handleNext = () => {
    if (firstName.trim().length < 2) {
      Alert.alert('Oops!', 'Please enter your first name (at least 2 characters)');
      return;
    }
    onNext();
  };

  return (
    <KeyboardAvoidingView 
      style={CommonStyles.centerContainer} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.stepContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.stepNumber}>1 of 7</Text>
          <Text style={styles.title}>What's your first name?</Text>
          <Text style={styles.subtitle}>
            This helps us create a personalized experience for you in our community
          </Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, firstName && styles.inputFilled]}
            placeholder="Enter your first name"
            placeholderTextColor={Colors.textLight}
            value={firstName}
            onChangeText={setFirstName}
            autoFocus
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={handleNext}
          />
        </View>

        {/* Button */}
        <TouchableOpacity 
          style={[styles.button, firstName.length >= 2 && styles.buttonActive]} 
          onPress={handleNext}
          disabled={firstName.length < 2}
        >
          <Text style={[styles.buttonText, firstName.length >= 2 && styles.buttonTextActive]}>
            Continue
          </Text>
        </TouchableOpacity>
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
  inputFilled: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  button: {
    ...CommonStyles.button,
    width: '100%',
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

export default FirstNameStep;
