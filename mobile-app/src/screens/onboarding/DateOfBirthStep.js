import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';

// 🎂 Step 2: Date of Birth - Age verification for our 30+ community
const DateOfBirthStep = ({ onNext, dateOfBirth, setDateOfBirth, onBack }) => {
  const [showPicker, setShowPicker] = useState(false);
  
  // Calculate age from date
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (date) => {
    if (!date) return 'Select your date of birth';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleNext = () => {
    if (!dateOfBirth) {
      Alert.alert('Required', 'Please select your date of birth');
      return;
    }

    const age = calculateAge(dateOfBirth);
    if (age < 30) {
      Alert.alert(
        'Age Requirement', 
        'Our community is designed for women 30 and over. We appreciate your interest!'
      );
      return;
    }

    onNext();
  };

  const onDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const age = dateOfBirth ? calculateAge(dateOfBirth) : null;
  const isValidAge = age && age >= 30;

  return (
    <View style={CommonStyles.centerContainer}>
      <View style={styles.stepContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.stepNumber}>2 of 7</Text>
          <Text style={styles.title}>When's your birthday?</Text>
          <Text style={styles.subtitle}>
            Our community is for amazing women 30 and over ✨
          </Text>
        </View>

        {/* Date Picker */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={[styles.dateButton, dateOfBirth && styles.dateButtonSelected]}
            onPress={() => setShowPicker(true)}
          >
            <Text style={[styles.dateText, dateOfBirth && styles.dateTextSelected]}>
              {formatDate(dateOfBirth)}
            </Text>
          </TouchableOpacity>

          {age && (
            <Text style={[styles.ageText, isValidAge ? styles.ageValid : styles.ageInvalid]}>
              {isValidAge ? `Perfect! You're ${age} 🎉` : `You're ${age} - our community is for 30+`}
            </Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, isValidAge && styles.buttonActive]} 
            onPress={handleNext}
            disabled={!isValidAge}
          >
            <Text style={[styles.buttonText, isValidAge && styles.buttonTextActive]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
        {showPicker && (
          <DateTimePicker
            value={dateOfBirth || new Date(1990, 0, 1)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1950, 0, 1)}
          />
        )}
      </View>
    </View>
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
    alignItems: 'center',
  },
  dateButton: {
    ...CommonStyles.input,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderColor: Colors.border,
  },
  dateButtonSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  dateText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  dateTextSelected: {
    color: Colors.text,
    fontWeight: '500',
  },
  ageText: {
    ...Typography.bodySmall,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  ageValid: {
    color: Colors.success,
  },
  ageInvalid: {
    color: Colors.error,
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

export default DateOfBirthStep;
