import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Vibration,
  AccessibilityInfo,
  InteractionManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Chip, ProgressBar } from 'react-native-paper';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Colors, Typography } from '../../constants/Styles';
import { TOUCH_TARGETS, SPACING, GESTURE_SPACING } from '../../design-system/tokens/spacing';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - (SPACING.lg * 2);
const SWIPE_THRESHOLD = GESTURE_SPACING.swipe.minDistance;
const TRIGGER_DISTANCE = GESTURE_SPACING.swipe.triggerDistance;

interface MatchUser {
  id: string;
  first_name: string;
  last_name: string;
  age?: number;
  avatar_url?: string;
  heritage: string[];
  interests: string[];
  location: string;
  university?: string;
  bio?: string;
  compatibility_score: number;
  distance_km?: number;
  last_active: string;
  is_verified: boolean;
  is_premium: boolean;
  occupation?: string;
  languages: string[];
}

interface EnhancedMatchCardProps {
  user: MatchUser;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
  onSuperLike: (userId: string) => void;
  onProfilePress: (userId: string) => void;
  isPremium: boolean;
  isLastCard?: boolean;
}

export default function EnhancedMatchCard({ 
  user, 
  onLike, 
  onPass, 
  onSuperLike, 
  onProfilePress, 
  isPremium,
  isLastCard = false 
}: EnhancedMatchCardProps) {
  const { t } = useTranslation();
  const [actionInProgress, setActionInProgress] = useState(false);
  
  // Animated values for smoother interactions
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);

  // Memoized functions for better performance
  const getCulturalFlag = useCallback((heritage: string) => {
    const flags: { [key: string]: string } = {
      'portugal': '🇵🇹',
      'brazil': '🇧🇷',
      'cape-verde': '🇨🇻',
      'angola': '🇦🇴',
      'mozambique': '🇲🇿',
      'sao-tome-principe': '🇸🇹',
      'guinea-bissau': '🇬🇼',
      'east-timor': '🇹🇱',
      'macau': '🇲🇴',
    };
    return flags[heritage] || '🌍';
  }, []);

  const getCompatibilityColor = useCallback((score: number) => {
    if (score >= 90) return Colors.success;
    if (score >= 70) return Colors.primary;
    if (score >= 50) return Colors.warning;
    return Colors.error;
  }, []);

  const getCompatibilityText = useCallback((score: number) => {
    if (score >= 90) return t('matches.compatibility.excellent');
    if (score >= 70) return t('matches.compatibility.good');
    if (score >= 50) return t('matches.compatibility.fair');
    return t('matches.compatibility.low');
  }, [t]);

  const formatLastActive = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return t('matches.lastActive.now');
    if (diffHours < 24) return t('matches.lastActive.hours', { count: diffHours });
    if (diffDays < 7) return t('matches.lastActive.days', { count: diffDays });
    return t('matches.lastActive.long');
  }, [t]);

  const onSwipeComplete = useCallback((direction: 'left' | 'right' | 'up') => {
    if (actionInProgress) return;
    
    setActionInProgress(true);
    
    // Enhanced haptic feedback patterns
    const hapticPatterns = {
      left: [30, 50],           // Quick disapproval
      right: [50, 100, 50],     // Positive engagement  
      up: [30, 50, 30, 100],    // Premium super like
    };
    
    Vibration.vibrate(hapticPatterns[direction]);
    
    InteractionManager.runAfterInteractions(() => {
      switch (direction) {
        case 'left':
          onPass(user.id);
          break;
        case 'right':
          onLike(user.id);
          break;
        case 'up':
          if (isPremium) {
            onSuperLike(user.id);
          } else {
            Alert.alert(
              t('matches.superLike.premium.title'),
              t('matches.superLike.premium.message')
            );
            // Reset position if not premium
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            rotate.value = withSpring(0);
            scale.value = withSpring(1);
            opacity.value = withSpring(1);
            overlayOpacity.value = withSpring(0);
            setActionInProgress(false);
            return;
          }
          break;
      }
      
      // Announce action for accessibility
      const actionText = {
        left: t('matches.accessibility.passed', { name: user.first_name }),
        right: t('matches.accessibility.liked', { name: user.first_name }),
        up: t('matches.accessibility.superLiked', { name: user.first_name }),
      };
      
      AccessibilityInfo.announceForAccessibility(actionText[direction]);
    });
  }, [user.id, user.first_name, isPremium, onLike, onPass, onSuperLike, t, actionInProgress]);

  // Enhanced gesture handler with improved physics
  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withTiming(0.95, { duration: 100 });
    },
    onActive: (event) => {
      if (actionInProgress) return;
      
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // More natural rotation based on swipe
      const rotation = interpolate(
        event.translationX,
        [-width, 0, width],
        [-15, 0, 15],
        Extrapolate.CLAMP
      );
      rotate.value = rotation;
      
      // Dynamic opacity based on swipe distance
      const swipeDistance = Math.abs(event.translationX) + Math.abs(event.translationY);
      const opacityValue = interpolate(
        swipeDistance,
        [0, SWIPE_THRESHOLD, TRIGGER_DISTANCE],
        [1, 0.9, 0.7],
        Extrapolate.CLAMP
      );
      opacity.value = opacityValue;
      
      // Show overlay based on swipe direction
      if (event.translationX > SWIPE_THRESHOLD) {
        overlayOpacity.value = withTiming(0.8, { duration: 100 });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        overlayOpacity.value = withTiming(0.8, { duration: 100 });
      } else if (event.translationY < -SWIPE_THRESHOLD && isPremium) {
        overlayOpacity.value = withTiming(0.8, { duration: 100 });
      } else {
        overlayOpacity.value = withTiming(0, { duration: 100 });
      }
    },
    onEnd: (event) => {
      if (actionInProgress) return;
      
      const isSwipeRight = event.translationX > TRIGGER_DISTANCE;
      const isSwipeLeft = event.translationX < -TRIGGER_DISTANCE;
      const isSwipeUp = event.translationY < -TRIGGER_DISTANCE && isPremium;

      if (isSwipeRight) {
        // Animate card off screen to the right
        translateX.value = withSpring(width + 100, { damping: 15 });
        opacity.value = withSpring(0, undefined, () => {
          runOnJS(onSwipeComplete)('right');
        });
      } else if (isSwipeLeft) {
        // Animate card off screen to the left
        translateX.value = withSpring(-width - 100, { damping: 15 });
        opacity.value = withSpring(0, undefined, () => {
          runOnJS(onSwipeComplete)('left');
        });
      } else if (isSwipeUp) {
        // Animate card off screen upward
        translateY.value = withSpring(-width - 100, { damping: 15 });
        opacity.value = withSpring(0, undefined, () => {
          runOnJS(onSwipeComplete)('up');
        });
      } else {
        // Spring back to center with improved physics
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
        rotate.value = withSpring(0, { damping: 20 });
        scale.value = withSpring(1, { damping: 15 });
        opacity.value = withSpring(1);
        overlayOpacity.value = withSpring(0);
      }
    },
  });

  // Animated styles with improved interpolation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  // Enhanced overlay style with better visual feedback
  const overlayStyle = useAnimatedStyle(() => {
    let backgroundColor = 'transparent';
    let borderColor = 'transparent';
    
    if (translateX.value > SWIPE_THRESHOLD) {
      backgroundColor = Colors.success + '40';
      borderColor = Colors.success;
    } else if (translateX.value < -SWIPE_THRESHOLD) {
      backgroundColor = Colors.error + '40';
      borderColor = Colors.error;
    } else if (translateY.value < -SWIPE_THRESHOLD && isPremium) {
      backgroundColor = Colors.primary + '40';
      borderColor = Colors.primary;
    }
    
    return {
      backgroundColor,
      borderColor,
      borderWidth: backgroundColor !== 'transparent' ? 2 : 0,
      opacity: overlayOpacity.value,
    };
  });

  // Memoized user info to prevent unnecessary re-renders
  const userInfo = useMemo(() => ({
    displayName: `${user.first_name} ${user.last_name}`,
    ageText: user.age ? `, ${user.age}` : '',
    lastActiveText: formatLastActive(user.last_active),
    compatibilityColor: getCompatibilityColor(user.compatibility_score),
    compatibilityText: getCompatibilityText(user.compatibility_score),
  }), [user, formatLastActive, getCompatibilityColor, getCompatibilityText]);

  // Enhanced action handlers
  const handleActionPress = useCallback((action: 'pass' | 'like' | 'superLike') => {
    if (actionInProgress) return;
    
    const actions = {
      pass: () => onSwipeComplete('left'),
      like: () => onSwipeComplete('right'),
      superLike: () => onSwipeComplete('up'),
    };
    
    actions[action]();
  }, [actionInProgress, onSwipeComplete]);

  const handleProfilePress = useCallback(() => {
    Vibration.vibrate(30);
    onProfilePress(user.id);
  }, [user.id, onProfilePress]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={!actionInProgress}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Card style={styles.card} elevation={8}>
          <TouchableOpacity 
            onPress={handleProfilePress}
            activeOpacity={0.9}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t('matches.accessibility.profileButton', { 
              name: userInfo.displayName,
              compatibility: user.compatibility_score 
            })}
            accessibilityHint={t('matches.accessibility.tapForProfile')}
            style={styles.cardContent}
          >
            {/* Profile Image */}
            <View style={styles.imageContainer}>
              {user.avatar_url ? (
                <Image 
                  source={{ uri: user.avatar_url }} 
                  style={styles.image}
                  accessible={true}
                  accessibilityLabel={t('matches.accessibility.profilePhoto', { name: user.first_name })}
                />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText} accessible={false}>
                    {user.first_name[0]}{user.last_name[0]}
                  </Text>
                </View>
              )}
              
              {/* Enhanced badges with better positioning */}
              {user.is_verified && (
                <View 
                  style={styles.verificationBadge}
                  accessible={true}
                  accessibilityLabel={t('matches.accessibility.verifiedUser')}
                >
                  <Text style={styles.verificationIcon}>✓</Text>
                </View>
              )}

              {user.is_premium && (
                <View 
                  style={styles.premiumBadge}
                  accessible={true}
                  accessibilityLabel={t('matches.accessibility.premiumUser')}
                >
                  <Text style={styles.premiumIcon}>👑</Text>
                </View>
              )}
            </View>

            <Card.Content style={styles.content}>
              {/* User Name and Activity */}
              <View style={styles.nameSection}>
                <Text style={styles.name}>
                  {userInfo.displayName}{userInfo.ageText}
                </Text>
                <Text style={styles.lastActive}>
                  {userInfo.lastActiveText}
                </Text>
              </View>

              {/* Portuguese Heritage with improved accessibility */}
              <View style={styles.heritageSection}>
                <Text style={styles.sectionTitle}>
                  {t('matches.heritage')}
                </Text>
                <View style={styles.heritageFlags}>
                  {user.heritage.map((heritage, index) => (
                    <Text 
                      key={index} 
                      style={styles.heritageFlag}
                      accessible={true}
                      accessibilityLabel={t('matches.accessibility.heritage', { heritage })}
                    >
                      {getCulturalFlag(heritage)}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Location and Details */}
              <View style={styles.locationSection}>
                <Text style={styles.locationText}>
                  📍 {user.location}
                  {user.distance_km && ` • ${user.distance_km}km ${t('matches.away')}`}
                </Text>
                {user.university && (
                  <Text style={styles.universityText}>
                    🎓 {user.university}
                  </Text>
                )}
                {user.occupation && (
                  <Text style={styles.occupationText}>
                    💼 {user.occupation}
                  </Text>
                )}
              </View>

              {/* Languages */}
              <View style={styles.languagesSection}>
                <Text style={styles.sectionTitle}>
                  {t('matches.languages')}
                </Text>
                <View style={styles.languageChips}>
                  {user.languages.slice(0, 4).map((language, index) => (
                    <Chip
                      key={index}
                      mode="outlined"
                      style={styles.languageChip}
                      textStyle={styles.languageChipText}
                      accessible={true}
                      accessibilityLabel={t('matches.accessibility.language', { language })}
                    >
                      {language}
                    </Chip>
                  ))}
                  {user.languages.length > 4 && (
                    <Chip
                      mode="outlined"
                      style={styles.moreChip}
                      textStyle={styles.moreChipText}
                    >
                      +{user.languages.length - 4}
                    </Chip>
                  )}
                </View>
              </View>

              {/* Bio */}
              {user.bio && (
                <View style={styles.bioSection}>
                  <Text style={styles.bio} numberOfLines={3}>
                    {user.bio}
                  </Text>
                </View>
              )}

              {/* Enhanced Compatibility Score */}
              <View style={styles.compatibilitySection}>
                <View style={styles.compatibilityHeader}>
                  <Text style={styles.compatibilityTitle}>
                    {t('matches.compatibility.title')}
                  </Text>
                  <Text style={[
                    styles.compatibilityScore,
                    { color: userInfo.compatibilityColor }
                  ]}>
                    {user.compatibility_score}%
                  </Text>
                </View>
                <ProgressBar
                  progress={user.compatibility_score / 100}
                  color={userInfo.compatibilityColor}
                  style={styles.compatibilityBar}
                />
                <Text style={[
                  styles.compatibilityText,
                  { color: userInfo.compatibilityColor }
                ]}>
                  {userInfo.compatibilityText}
                </Text>
              </View>

              {/* Common Interests */}
              {user.interests.length > 0 && (
                <View style={styles.interestsSection}>
                  <Text style={styles.sectionTitle}>
                    {t('matches.interests.common')}
                  </Text>
                  <View style={styles.interestChips}>
                    {user.interests.slice(0, 3).map((interest, index) => (
                      <Chip
                        key={index}
                        mode="flat"
                        style={styles.interestChip}
                        textStyle={styles.interestChipText}
                      >
                        {interest}
                      </Chip>
                    ))}
                    {user.interests.length > 3 && (
                      <Chip
                        mode="flat"
                        style={styles.moreChip}
                        textStyle={styles.moreChipText}
                      >
                        +{user.interests.length - 3}
                      </Chip>
                    )}
                  </View>
                </View>
              )}
            </Card.Content>
          </TouchableOpacity>

          {/* Enhanced Swipe Overlay */}
          <Animated.View style={[styles.swipeOverlay, overlayStyle]} pointerEvents="none">
            <View style={styles.overlayContent}>
              <Text style={styles.swipeText}>
                {translateX.value > SWIPE_THRESHOLD ? t('matches.swipe.like') :
                 translateX.value < -SWIPE_THRESHOLD ? t('matches.swipe.pass') :
                 translateY.value < -SWIPE_THRESHOLD ? t('matches.swipe.superLike') : ''}
              </Text>
            </View>
          </Animated.View>
        </Card>

        {/* Enhanced Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.passButton]}
            onPress={() => handleActionPress('pass')}
            disabled={actionInProgress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t('matches.accessibility.passButton')}
            accessibilityHint={t('matches.accessibility.passHint')}
          >
            <Text style={styles.actionButtonIcon}>✕</Text>
          </TouchableOpacity>

          {isPremium && (
            <TouchableOpacity
              style={[styles.actionButton, styles.superLikeButton]}
              onPress={() => handleActionPress('superLike')}
              disabled={actionInProgress}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t('matches.accessibility.superLikeButton')}
              accessibilityHint={t('matches.accessibility.superLikeHint')}
            >
              <Text style={styles.actionButtonIcon}>⭐</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, styles.likeButton]}
            onPress={() => handleActionPress('like')}
            disabled={actionInProgress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t('matches.accessibility.likeButton')}
            accessibilityHint={t('matches.accessibility.likeHint')}
          >
            <Text style={styles.actionButtonIcon}>♥</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardContent: {
    borderRadius: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 320,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 32,
  },
  verificationBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: Colors.success,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  verificationIcon: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  premiumBadge: {
    position: 'absolute',
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: Colors.warning + 'DD',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  premiumIcon: {
    fontSize: 14,
  },
  content: {
    padding: SPACING.lg,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    fontWeight: 'bold',
    flex: 1,
  },
  lastActive: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  heritageSection: {
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 10,
  },
  heritageFlags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  heritageFlag: {
    fontSize: 24,
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  locationSection: {
    marginBottom: SPACING.sm,
  },
  locationText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 2,
    fontSize: 13,
  },
  universityText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 2,
    fontSize: 13,
  },
  occupationText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  languagesSection: {
    marginBottom: SPACING.sm,
  },
  languageChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  languageChip: {
    height: 28,
    backgroundColor: Colors.primaryLight || Colors.primary + '20',
    borderColor: Colors.primary,
  },
  languageChipText: {
    ...Typography.caption,
    color: Colors.primary,
    fontSize: 10,
  },
  bioSection: {
    marginBottom: SPACING.md,
  },
  bio: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 20,
    fontStyle: 'italic',
    fontSize: 13,
  },
  compatibilitySection: {
    marginBottom: SPACING.md,
    backgroundColor: Colors.primaryLight || Colors.primary + '10',
    padding: SPACING.sm,
    borderRadius: 8,
  },
  compatibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  compatibilityTitle: {
    ...Typography.subtitle,
    color: Colors.text,
    fontWeight: '600',
    fontSize: 12,
  },
  compatibilityScore: {
    ...Typography.h3,
    fontWeight: 'bold',
  },
  compatibilityBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
    marginBottom: SPACING.xs,
  },
  compatibilityText: {
    ...Typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 10,
  },
  interestsSection: {
    marginBottom: SPACING.sm,
  },
  interestChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  interestChip: {
    height: 26,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  interestChipText: {
    ...Typography.caption,
    color: Colors.text,
    fontSize: 10,
  },
  moreChip: {
    height: 26,
    backgroundColor: Colors.textSecondary + '20',
  },
  moreChipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  swipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  overlayContent: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  swipeText: {
    ...Typography.h2,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.lg,
  },
  actionButton: {
    width: TOUCH_TARGETS.large,
    height: TOUCH_TARGETS.large,
    borderRadius: TOUCH_TARGETS.large / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  passButton: {
    backgroundColor: Colors.error,
  },
  superLikeButton: {
    backgroundColor: Colors.primary,
    width: TOUCH_TARGETS.medium,
    height: TOUCH_TARGETS.medium,
    borderRadius: TOUCH_TARGETS.medium / 2,
  },
  likeButton: {
    backgroundColor: Colors.success,
  },
  actionButtonIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});