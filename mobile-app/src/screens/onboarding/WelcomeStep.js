import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';

const WelcomeStep = ({ onComplete, userData }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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

  const handleComplete = () => {
    // In a real app, this would save user data and navigate to main app
    onComplete(userData);
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
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.welcomeTitle}>
            Welcome to AdyaTribe, {userData?.firstName}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {getGreeting()}! You're now part of our amazing community of 30+ women.
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
              <Text style={styles.guidelineBold}>Be Kind & Respectful</Text> - Treat everyone with kindness and respect
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
              <Text style={styles.guidelineBold}>Authentic Connections</Text> - Be genuine and build real friendships
            </Text>
          </View>

          <View style={styles.guideline}>
            <Text style={styles.guidelineIcon}>🚫</Text>
            <Text style={styles.guidelineText}>
              <Text style={styles.guidelineBold}>No Harassment</Text> - Report inappropriate behavior immediately
            </Text>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsContainer}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>
          
          <View style={styles.nextStep}>
            <Text style={styles.nextStepNumber}>1</Text>
            <Text style={styles.nextStepText}>
              Browse groups based on your interests
            </Text>
          </View>

          <View style={styles.nextStep}>
            <Text style={styles.nextStepNumber}>2</Text>
            <Text style={styles.nextStepText}>
              Join conversations and introduce yourself
            </Text>
          </View>

          <View style={styles.nextStep}>
            <Text style={styles.nextStepNumber}>3</Text>
            <Text style={styles.nextStepText}>
              Attend events and meet amazing women near you
            </Text>
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity 
          style={styles.completeButton} 
          onPress={handleComplete}
        >
          <Text style={styles.completeButtonText}>
            Start My AdyaTribe Journey! 🚀
          </Text>
        </TouchableOpacity>

        {/* Footer Message */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            Ready to build amazing friendships and discover new adventures?
          </Text>
          <Text style={styles.footerSubtext}>
            Welcome to your tribe! 💜
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