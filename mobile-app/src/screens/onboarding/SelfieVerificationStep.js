import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';

const SelfieVerificationStep = ({ onNext, onBack, selfieVerification, setSelfieVerification }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'We need camera access for identity verification to keep our community safe. Please enable camera permissions in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Take verification selfie
  const takeVerificationSelfie = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    setIsProcessing(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // No editing for verification
        quality: 0.9, // High quality for verification
        exif: false, // No location data for privacy
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        // Simulate AI verification process
        setTimeout(() => {
          setSelfieVerification({
            uri: result.assets[0].uri,
            verified: true, // In real app, this would be AI verification result
            timestamp: new Date().toISOString(),
          });
          setIsProcessing(false);
          
          Alert.alert(
            'Verification Successful! 🎉',
            'Your identity has been verified. Welcome to the AdyaTribe community!',
            [{ text: 'Continue' }]
          );
        }, 2000); // Simulate 2-second verification process
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
      Alert.alert(
        'Verification Failed',
        'Unable to process verification photo. Please ensure good lighting and try again.',
        [{ text: 'Try Again', onPress: takeVerificationSelfie }]
      );
    }
  };

  const handleNext = () => {
    if (!selfieVerification?.verified) {
      Alert.alert(
        'Verification Required',
        'Identity verification helps us maintain a safe, trusted community for all members. This step is required to continue.',
        [
          { text: 'Take Verification Photo', onPress: takeVerificationSelfie },
          { text: 'Learn More', onPress: showVerificationInfo },
        ]
      );
      return;
    }
    onNext();
  };

  const showVerificationInfo = () => {
    Alert.alert(
      'Why Identity Verification?',
      'AdyaTribe uses identity verification to:\n\n• Prevent fake profiles and catfishing\n• Maintain a safe environment for all women\n• Build trust within our community\n• Protect against harassment\n\nYour verification photo is processed securely and not shared with other members.',
      [
        { text: 'Take Photo Now', onPress: takeVerificationSelfie },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const retakeSelfie = () => {
    setSelfieVerification(null);
    takeVerificationSelfie();
  };

  return (
    <View style={styles.stepContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.stepNumber}>5 of 7</Text>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>
          Take a quick verification selfie to keep our community safe and trusted.
        </Text>
      </View>

      {/* Verification Section */}
      <View style={styles.verificationContainer}>
        {isProcessing ? (
          // Processing verification
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.processingText}>Verifying your identity...</Text>
            <Text style={styles.processingSubtext}>This may take a few moments</Text>
          </View>
        ) : selfieVerification?.verified ? (
          // Verification complete
          <View style={styles.verifiedContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
            <Text style={styles.verifiedTitle}>Verification Complete!</Text>
            <Text style={styles.verifiedText}>
              Your identity has been successfully verified. Welcome to AdyaTribe!
            </Text>
            <TouchableOpacity style={styles.retakeButton} onPress={retakeSelfie}>
              <Text style={styles.retakeButtonText}>Take Another Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Take verification photo
          <View style={styles.captureContainer}>
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraIconText}>🛡️</Text>
            </View>
            <Text style={styles.captureTitle}>Ready for verification?</Text>
            <Text style={styles.captureText}>
              We'll take a quick photo to verify your identity and keep our community safe.
            </Text>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takeVerificationSelfie}
            >
              <Text style={styles.captureButtonText}>Take Verification Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Verification Guidelines */}
      <View style={styles.guidelinesContainer}>
        <Text style={styles.guidelinesTitle}>Verification Tips:</Text>
        <Text style={styles.guideline}>• Face the camera directly with good lighting</Text>
        <Text style={styles.guideline}>• Remove sunglasses or face coverings</Text>
        <Text style={styles.guideline}>• Keep a neutral expression</Text>
        <Text style={styles.guideline}>• Hold still during the photo</Text>
        <Text style={styles.privacyNote}>
          🔒 Your verification photo is processed securely and never shared with other members.
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoButton} onPress={showVerificationInfo}>
          <Text style={styles.infoButtonText}>Why Verify?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            selfieVerification?.verified && styles.buttonActive
          ]} 
          onPress={handleNext}
        >
          <Text style={[
            styles.buttonText, 
            selfieVerification?.verified && styles.buttonTextActive
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
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
    lineHeight: 24,
  },
  verificationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    minHeight: 200,
    justifyContent: 'center',
  },
  processingContainer: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  processingText: {
    ...Typography.body,
    fontWeight: '600',
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  processingSubtext: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  verifiedContainer: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  successIconText: {
    fontSize: 40,
    color: Colors.surface,
    fontWeight: 'bold',
  },
  verifiedTitle: {
    ...Typography.h2,
    color: Colors.success,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  verifiedText: {
    ...Typography.body,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  retakeButton: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    borderRadius: 20,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  retakeButtonText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  captureContainer: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  cameraIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cameraIconText: {
    fontSize: 36,
  },
  captureTitle: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  captureText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  captureButton: {
    ...CommonStyles.button,
    backgroundColor: Colors.primary,
    minWidth: 220,
  },
  captureButtonText: {
    ...CommonStyles.buttonText,
    color: Colors.surface,
  },
  guidelinesContainer: {
    width: '100%',
    backgroundColor: Colors.secondaryLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  guidelinesTitle: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  guideline: {
    ...Typography.bodySmall,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 2,
  },
  privacyNote: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  infoButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  infoButtonText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '500',
  },
  button: {
    ...CommonStyles.button,
    flex: 1,
    marginLeft: Spacing.sm,
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

export default SelfieVerificationStep;