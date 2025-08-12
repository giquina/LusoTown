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

const ProfilePictureStep = ({ onNext, onBack, profilePicture, setProfilePicture }) => {
  const [isUploading, setIsUploading] = useState(false);

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need camera access to take your profile picture. Please enable camera permissions in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Request photo library permissions
  const requestLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need photo access to select your profile picture. Please enable photo permissions in your device settings.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    setIsUploading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square crop for profile picture
        quality: 0.8,
        exif: false, // Don't include location data for privacy
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Choose from photo library
  const chooseFromLibrary = async () => {
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) return;

    setIsUploading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square crop for profile picture
        quality: 0.8,
        exif: false, // Don't include location data for privacy
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Show photo selection options
  const showPhotoOptions = () => {
    Alert.alert(
      'Add Profile Picture',
      'Choose how you\'d like to add your profile picture:',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: chooseFromLibrary },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleNext = () => {
    if (!profilePicture) {
      Alert.alert(
        'Profile Picture Required',
        'Adding a profile picture helps other members get to know you better and builds trust in our community.',
        [
          { text: 'Add Photo', onPress: showPhotoOptions },
          { text: 'Skip for Now', onPress: onNext, style: 'cancel' },
        ]
      );
      return;
    }
    onNext();
  };

  const retakePhoto = () => {
    setProfilePicture(null);
    showPhotoOptions();
  };

  return (
    <View style={styles.stepContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.stepNumber}>4 of 7</Text>
        <Text style={styles.title}>Add your profile picture</Text>
        <Text style={styles.subtitle}>
          Help other members get to know you! A friendly photo builds trust and connection in our community.
        </Text>
      </View>

      {/* Photo Section */}
      <View style={styles.photoContainer}>
        {profilePicture ? (
          // Show selected photo with option to retake
          <View style={styles.photoPreviewContainer}>
            <Image source={{ uri: profilePicture }} style={styles.photoPreview} />
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.retakeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Show photo selection prompt
          <View style={styles.photoPlaceholderContainer}>
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderIcon}>📷</Text>
              <Text style={styles.photoPlaceholderText}>No photo selected</Text>
            </View>
            <TouchableOpacity 
              style={styles.addPhotoButton} 
              onPress={showPhotoOptions}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color={Colors.surface} size="small" />
              ) : (
                <Text style={styles.addPhotoButtonText}>Add Profile Picture</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Photo Guidelines */}
      <View style={styles.guidelinesContainer}>
        <Text style={styles.guidelinesTitle}>Photo Guidelines:</Text>
        <Text style={styles.guideline}>• Clear, well-lit photo of your face</Text>
        <Text style={styles.guideline}>• Smile naturally - you're amazing!</Text>
        <Text style={styles.guideline}>• Avoid sunglasses or hats covering your face</Text>
        <Text style={styles.guideline}>• Recent photo (within the last 2 years)</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, profilePicture && styles.buttonActive]} 
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, profilePicture && styles.buttonTextActive]}>
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  photoPreviewContainer: {
    alignItems: 'center',
  },
  photoPreview: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  retakeButton: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  retakeButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  photoPlaceholderContainer: {
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.textLight,
  },
  photoPlaceholderIcon: {
    fontSize: 48,
    marginBottom: Spacing.xs,
  },
  photoPlaceholderText: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
  addPhotoButton: {
    ...CommonStyles.button,
    minWidth: 200,
    backgroundColor: Colors.primary,
  },
  addPhotoButtonText: {
    ...CommonStyles.buttonText,
    color: Colors.surface,
  },
  guidelinesContainer: {
    width: '100%',
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
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
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  backButtonText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
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

export default ProfilePictureStep;