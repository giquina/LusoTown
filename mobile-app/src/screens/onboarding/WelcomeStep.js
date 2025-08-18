import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';
import { 
  signUpWithEmail, 
  createProfile, 
  uploadProfilePicture, 
  uploadVerificationSelfie,
  addUserInterests 
} from '../../lib/supabase';

const WelcomeStep = ({ onComplete, userData }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [isCompletingSignup, setIsCompletingSignup] = useState(false);

  useEffect(() => {
    // Start welcome animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleComplete = async () => {
    try {
      setIsCompletingSignup(true);
      
      // Generate a temporary password for the user (in real app, they'd set this)
      const tempPassword = `LusoTown2024_${Math.random().toString(36).substring(7)}`;
      
      // 1. Sign up the user with email
      const { user } = await signUpWithEmail(userData.email, tempPassword, {
        first_name: userData.firstName,
        date_of_birth: userData.dateOfBirth?.toISOString(),
        age_verified: true,
        verification_completed: userData.selfieVerification?.verified || false,
      });

      if (!user) throw new Error('Failed to create user account');

      // 2. Create profile
      const profileData = {
        first_name: userData.firstName,
        email: userData.email,
        date_of_birth: userData.dateOfBirth?.toISOString(),
        age_verified: true,
        verification_completed: userData.selfieVerification?.verified || false,
        onboarding_completed: true,
        created_at: new Date().toISOString(),
      };

      // 3. Upload profile picture if exists
      if (userData.profilePicture) {
        try {
          const profilePictureUrl = await uploadProfilePicture(
            user.id, 
            userData.profilePicture, 
            `profile_${Date.now()}.jpg`
          );
          profileData.profile_picture_url = profilePictureUrl;
        } catch (error) {
          console.warn('Failed to upload profile picture:', error);
          // Continue with signup even if profile picture upload fails
        }
      }

      // 4. Upload verification selfie if exists
      if (userData.selfieVerification?.uri) {
        try {
          await uploadVerificationSelfie(
            user.id,
            userData.selfieVerification.uri,
            `verification_${Date.now()}.jpg`
          );
        } catch (error) {
          console.warn('Failed to upload verification selfie:', error);
          // Continue with signup even if verification upload fails
        }
      }

      await createProfile(user.id, profileData);

      // 5. Add user interests
      if (userData.selectedInterests && userData.selectedInterests.length > 0) {
        try {
          await addUserInterests(user.id, userData.selectedInterests);
        } catch (error) {
          console.warn('Failed to add user interests:', error);
          // Continue even if interests fail to save
        }
      }

      // Complete onboarding
      onComplete({
        ...userData,
        userId: user.id,
        tempPassword, // Pass this so user can be notified to change it
      });

    } catch (error) {
      console.error('Error completing signup:', error);
      Alert.alert(
        'Signup Error',
        'There was a problem completing your registration. Please try again.',
        [
          { text: 'Try Again', onPress: handleComplete },
          { text: 'Skip for Now', onPress: () => onComplete(userData) },
        ]
      );
    } finally {
      setIsCompletingSignup(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getInterestCount = () => {
    return userData?.selectedInterests?.length || 0;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        style={[
          styles.stepContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Celebration Header */}
        <View style={styles.celebrationContainer}>
          <Text style={styles.celebrationEmoji}>🇵🇹</Text>
          <Text style={styles.welcomeTitle}>
            Welcome to LusoTown, {userData?.firstName}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {getGreeting()}! You're now part of our amazing Portuguese community in London.
          </Text>
        </View>

        {/* Profile Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Your Profile Summary:</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>👋</Text>
            <View style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Name</Text>
              <Text style={styles.summaryValue}>{userData?.firstName}</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>📧</Text>
            <View style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Email</Text>
              <Text style={styles.summaryValue}>{userData?.email}</Text>
            </View>
          </View>

          {userData?.profilePicture && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>📸</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Profile Picture</Text>
                <Text style={styles.summaryValue}>✓ Added</Text>
              </View>
            </View>
          )}

          {userData?.selfieVerification?.verified && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>🛡️</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Identity Verified</Text>
                <Text style={styles.summaryValue}>✓ Complete</Text>
              </View>
            </View>
          )}

          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>❤️</Text>
            <View style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Interests</Text>
              <Text style={styles.summaryValue}>
                {getInterestCount()} activities selected
              </Text>
            </View>
          </View>
        </View>

        {/* Community Guidelines */}
        <View style={styles.guidelinesContainer}>
          <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
          <Text style={styles.guidelinesSubtitle}>
            Help us maintain a safe, supportive environment:
          </Text>
          
          <View style={styles.guideline}>
            <Text style={styles.guidelineIcon}>🤝</Text>
            <Text style={styles.guidelineText}>
              <Text style={styles.guidelineBold}>Seja Gentil</Text> - Treat everyone with kindness and respect
            </Text>
          </View>

          <View style={styles.guideline}>
            <Text style={styles.guidelineIcon}>🛡️</Text>
            <Text style={styles.guidelineText}>
              <Text style={styles.guidelineBold}>Stay Safe</Text> - Meet in public places and trust your instincts
            </Text>
          </View>

          <View style={styles.guideline}>
            <Text style={styles.guidelineIcon}>💬</Text>
            <Text style={styles.guidelineText}>
              <Text style={styles.guidelineBold}>Authentic Connections</Text> - Build genuine Portuguese friendships
            </Text>
          </View>

          <View style={styles.guideline}>
            <Text style={styles.guidelineIcon}>🇵🇹</Text>
            <Text style={styles.guidelineText}>
              <Text style={styles.guidelineBold}>Celebrate Culture</Text> - Share and preserve Portuguese traditions
            </Text>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          
          <View style={styles.nextStep}>
            <Text style={styles.nextStepNumber}>1</Text>
            <Text style={styles.nextStepText}>
              Browse Portuguese events and groups in London
            </Text>
          </View>

          <View style={styles.nextStep}>
            <Text style={styles.nextStepNumber}>2</Text>
            <Text style={styles.nextStepText}>
              Connect with fellow Portuguese speakers
            </Text>
          </View>

          <View style={styles.nextStep}>
            <Text style={styles.nextStepNumber}>3</Text>
            <Text style={styles.nextStepText}>
              Attend events and build your Portuguese community
            </Text>
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity 
          style={[styles.completeButton, isCompletingSignup && styles.completeButtonDisabled]} 
          onPress={handleComplete}
          disabled={isCompletingSignup}
        >
          {isCompletingSignup ? (
            <ActivityIndicator color={Colors.surface} size="small" />
          ) : (
            <Text style={styles.completeButtonText}>
              Start My LusoTown Journey! 🇵🇹
            </Text>
          )}
        </TouchableOpacity>

        {/* Footer Message */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Ready to connect with Portuguese speakers and discover London's Portuguese community?
          </Text>
          <Text style={styles.footerSubtext}>
            Bem-vindo à LusoTown! 🇵🇹
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  stepContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  celebrationEmoji: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  welcomeTitle: {
    ...Typography.h1,
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  welcomeSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  summaryContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...CommonStyles.shadow,
  },
  summaryTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
    width: 32,
    textAlign: 'center',
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  summaryValue: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  guidelinesContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  guidelinesTitle: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
    color: Colors.text,
  },
  guidelinesSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  guidelineIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
    marginTop: 2,
    width: 24,
  },
  guidelineText: {
    ...Typography.bodySmall,
    color: Colors.text,
    flex: 1,
    lineHeight: 20,
  },
  guidelineBold: {
    fontWeight: '600',
  },
  nextStepsContainer: {
    backgroundColor: Colors.secondaryLight,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  nextStepsTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  nextStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  nextStepNumber: {
    ...Typography.body,
    fontWeight: 'bold',
    color: Colors.surface,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: Spacing.sm,
  },
  nextStepText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  completeButton: {
    ...CommonStyles.button,
    backgroundColor: Colors.primary,
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  completeButtonText: {
    ...CommonStyles.buttonText,
    color: Colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  completeButtonDisabled: {
    backgroundColor: Colors.border,
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },
  footerSubtext: {
    ...Typography.h3,
    textAlign: 'center',
    color: Colors.primary,
  },
});

export default WelcomeStep;