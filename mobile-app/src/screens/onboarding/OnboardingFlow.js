import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

// Import onboarding steps
import WelcomeStep from './WelcomeStep';
import HeritageSelectionScreen from './HeritageSelectionScreen';
import FirstNameStep from './FirstNameStep';
import DateOfBirthStep from './DateOfBirthStep';
import EmailStep from './EmailStep';
import ProfilePictureStep from './ProfilePictureStep';
import SelfieVerificationStep from './SelfieVerificationStep';
import InterestTagsStep from './InterestTagsStep';

import { CommonStyles } from '../../constants/Styles';

// 🇵🇹 Portuguese Community Onboarding Flow - Unidos pela Língua
const OnboardingFlow = () => {
  const { i18n } = useTranslation();
  const { completeOnboarding, isLoading } = useAuth();
  
  // Current step in the onboarding process  
  const [currentStep, setCurrentStep] = useState(0);
  
  // User data collected during onboarding
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    email: '',
    heritage: ['portugal'], // Default heritage
    language: i18n.language === 'pt' ? 'pt' : 'en',
    profilePicture: null,
    selfieVerification: null,
    selectedInterests: [],
    acceptedTerms: false,
    marketingConsent: false,
  });

  // Navigate to next step with data
  const handleNext = (stepData = {}) => {
    const updatedUserData = { ...userData, ...stepData };
    setUserData(updatedUserData);

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      handleCompleteOnboarding(updatedUserData);
    }
  };

  // Complete Portuguese cultural onboarding
  const handleCompleteOnboarding = async (onboardingData) => {
    try {
      await completeOnboarding(onboardingData);
      console.log('Portuguese cultural onboarding completed successfully');
    } catch (error) {
      Alert.alert(
        'Onboarding Error', 
        'Failed to complete onboarding. Please try again.',
        [
          { text: 'OK', style: 'default' }
        ]
      );
      console.error('Onboarding completion error:', error);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Update user data
  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            onNext={() => handleNext()}
            userData={userData}
          />
        );
      
      case 1:
        return (
          <HeritageSelectionScreen
            onContinue={(heritage) => handleNext({ heritage })}
            onBack={handleBack}
          />
        );

      case 2:
        return (
          <FirstNameStep
            onNext={handleNext}
            onBack={handleBack}
            firstName={userData.firstName}
            setFirstName={(value) => updateUserData('firstName', value)}
          />
        );
      
      case 3:
        return (
          <DateOfBirthStep
            onNext={handleNext}
            onBack={handleBack}
            dateOfBirth={userData.dateOfBirth}
            setDateOfBirth={(value) => updateUserData('dateOfBirth', value)}
          />
        );
      
      case 4:
        return (
          <EmailStep
            onNext={handleNext}
            onBack={handleBack}
            email={userData.email}
            setEmail={(value) => updateUserData('email', value)}
          />
        );

      case 5:
        return (
          <ProfilePictureStep
            onNext={handleNext}
            onBack={handleBack}
            profilePicture={userData.profilePicture}
            setProfilePicture={(value) => updateUserData('profilePicture', value)}
          />
        );

      case 6:
        return (
          <SelfieVerificationStep
            onNext={handleNext}
            onBack={handleBack}
            selfieVerification={userData.selfieVerification}
            setSelfieVerification={(value) => updateUserData('selfieVerification', value)}
          />
        );

      case 7:
        return (
          <InterestTagsStep
            onNext={() => handleCompleteOnboarding(userData)}
            onBack={handleBack}
            selectedInterests={userData.selectedInterests}
            setSelectedInterests={(value) => updateUserData('selectedInterests', value)}
            isLoading={isLoading}
          />
        );

      default:
        return (
          <View style={CommonStyles.centerContainer}>
            <Text>Step {currentStep} - Coming Soon! 🇵🇹</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderCurrentStep()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default OnboardingFlow;
