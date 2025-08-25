import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Colors, Typography } from '../../constants/Styles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const SWIPE_THRESHOLD = 150;

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

interface MatchCardProps {
  user: MatchUser;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
  onSuperLike: (userId: string) => void;
  onProfilePress: (userId: string) => void;
  isPremium: boolean;
}

export default function MatchCard({ 
  user, 
  onLike, 
  onPass, 
  onSuperLike, 
  onProfilePress, 
  isPremium 
}: MatchCardProps) {
  const { t } = useTranslation();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  const getCulturalFlag = (heritage: string) => {
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
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return Colors.success;
    if (score >= 70) return Colors.primary;
    if (score >= 50) return Colors.warning;
    return Colors.error;
  };

  const getCompatibilityText = (score: number) => {
    if (score >= 90) return t('matches.compatibility.excellent');
    if (score >= 70) return t('matches.compatibility.good');
    if (score >= 50) return t('matches.compatibility.fair');
    return t('matches.compatibility.low');
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return t('matches.lastActive.now');
    if (diffHours < 24) return t('matches.lastActive.hours', { count: diffHours });
    if (diffDays < 7) return t('matches.lastActive.days', { count: diffDays });
    return t('matches.lastActive.long');
  };

  const onSwipeComplete = (direction: 'left' | 'right' | 'up') => {
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
        }
        break;
    }
  };

  const gestureHandler = useAnimatedGestureHandler({\n    onStart: () => {\n      scale.value = withSpring(0.95);\n    },\n    onActive: (event) => {\n      translateX.value = event.translationX;\n      translateY.value = event.translationY;\n      rotate.value = event.translationX * 0.1;\n      \n      // Visual feedback for swipe direction\n      if (event.translationX > SWIPE_THRESHOLD) {\n        // Right swipe - like (green overlay)\n        opacity.value = 0.8;\n      } else if (event.translationX < -SWIPE_THRESHOLD) {\n        // Left swipe - pass (red overlay)\n        opacity.value = 0.8;\n      } else if (event.translationY < -SWIPE_THRESHOLD && isPremium) {\n        // Up swipe - super like (blue overlay)\n        opacity.value = 0.8;\n      } else {\n        opacity.value = 1;\n      }\n    },\n    onEnd: (event) => {\n      const isSwipeRight = event.translationX > SWIPE_THRESHOLD;\n      const isSwipeLeft = event.translationX < -SWIPE_THRESHOLD;\n      const isSwipeUp = event.translationY < -SWIPE_THRESHOLD && isPremium;\n\n      if (isSwipeRight) {\n        // Like - animate to right\n        translateX.value = withSpring(width);\n        opacity.value = withSpring(0, undefined, () => {\n          runOnJS(onSwipeComplete)('right');\n        });\n      } else if (isSwipeLeft) {\n        // Pass - animate to left\n        translateX.value = withSpring(-width);\n        opacity.value = withSpring(0, undefined, () => {\n          runOnJS(onSwipeComplete)('left');\n        });\n      } else if (isSwipeUp) {\n        // Super like - animate up\n        translateY.value = withSpring(-width);\n        opacity.value = withSpring(0, undefined, () => {\n          runOnJS(onSwipeComplete)('up');\n        });\n      } else {\n        // Snap back to center\n        translateX.value = withSpring(0);\n        translateY.value = withSpring(0);\n        rotate.value = withSpring(0);\n        scale.value = withSpring(1);\n        opacity.value = withSpring(1);\n      }\n    },\n  });\n\n  const animatedStyle = useAnimatedStyle(() => {\n    return {\n      transform: [\n        { translateX: translateX.value },\n        { translateY: translateY.value },\n        { rotate: `${rotate.value}deg` },\n        { scale: scale.value },\n      ],\n      opacity: opacity.value,\n    };\n  });\n\n  const overlayStyle = useAnimatedStyle(() => {\n    let backgroundColor = 'transparent';\n    let text = '';\n    \n    if (translateX.value > SWIPE_THRESHOLD) {\n      backgroundColor = Colors.success + '80';\n      text = 'LIKE';\n    } else if (translateX.value < -SWIPE_THRESHOLD) {\n      backgroundColor = Colors.error + '80';\n      text = 'PASS';\n    } else if (translateY.value < -SWIPE_THRESHOLD && isPremium) {\n      backgroundColor = Colors.primary + '80';\n      text = 'SUPER LIKE';\n    }\n    \n    return {\n      backgroundColor,\n      opacity: backgroundColor === 'transparent' ? 0 : 1,\n    };\n  });\n\n  return (\n    <PanGestureHandler onGestureEvent={gestureHandler}>\n      <Animated.View style={[styles.container, animatedStyle]}>\n        <Card style={styles.card} elevation={8}>\n          <TouchableOpacity \n            onPress={() => onProfilePress(user.id)}\n            activeOpacity={0.9}\n          >\n            {/* Profile Image */}\n            <View style={styles.imageContainer}>\n              {user.avatar_url ? (\n                <Image source={{ uri: user.avatar_url }} style={styles.image} />\n              ) : (\n                <View style={styles.placeholderImage}>\n                  <Text style={styles.placeholderText}>\n                    {user.first_name[0]}{user.last_name[0]}\n                  </Text>\n                </View>\n              )}\n              \n              {/* Verification Badge */}\n              {user.is_verified && (\n                <View style={styles.verificationBadge}>\n                  <Text style={styles.verificationIcon}>✓</Text>\n                </View>\n              )}\n\n              {/* Premium Badge */}\n              {user.is_premium && (\n                <View style={styles.premiumBadge}>\n                  <Text style={styles.premiumIcon}>👑</Text>\n                </View>\n              )}\n            </View>\n\n            {/* User Info */}\n            <Card.Content style={styles.content}>\n              {/* Name and Age */}\n              <View style={styles.nameSection}>\n                <Text style={styles.name}>\n                  {user.first_name} {user.last_name}\n                  {user.age && `, ${user.age}`}\n                </Text>\n                <Text style={styles.lastActive}>\n                  {formatLastActive(user.last_active)}\n                </Text>\n              </View>\n\n              {/* Portuguese Heritage */}\n              <View style={styles.heritageSection}>\n                <Text style={styles.sectionTitle}>\n                  {t('matches.heritage')}\n                </Text>\n                <View style={styles.heritageFlags}>\n                  {user.heritage.map((heritage, index) => (\n                    <Text key={index} style={styles.heritageFlag}>\n                      {getCulturalFlag(heritage)}\n                    </Text>\n                  ))}\n                </View>\n              </View>\n\n              {/* Location and University */}\n              <View style={styles.locationSection}>\n                <Text style={styles.locationText}>\n                  📍 {user.location}\n                  {user.distance_km && ` • ${user.distance_km}km away`}\n                </Text>\n                {user.university && (\n                  <Text style={styles.universityText}>\n                    🎓 {user.university}\n                  </Text>\n                )}\n                {user.occupation && (\n                  <Text style={styles.occupationText}>\n                    💼 {user.occupation}\n                  </Text>\n                )}\n              </View>\n\n              {/* Languages */}\n              <View style={styles.languagesSection}>\n                <Text style={styles.sectionTitle}>\n                  {t('matches.languages')}\n                </Text>\n                <View style={styles.languageChips}>\n                  {user.languages.map((language, index) => (\n                    <Chip\n                      key={index}\n                      mode=\"outlined\"\n                      style={styles.languageChip}\n                      textStyle={styles.languageChipText}\n                    >\n                      {language}\n                    </Chip>\n                  ))}\n                </View>\n              </View>\n\n              {/* Bio */}\n              {user.bio && (\n                <View style={styles.bioSection}>\n                  <Text style={styles.bio} numberOfLines={3}>\n                    {user.bio}\n                  </Text>\n                </View>\n              )}\n\n              {/* Compatibility Score */}\n              <View style={styles.compatibilitySection}>\n                <View style={styles.compatibilityHeader}>\n                  <Text style={styles.compatibilityTitle}>\n                    {t('matches.compatibility.title')}\n                  </Text>\n                  <Text style={[\n                    styles.compatibilityScore,\n                    { color: getCompatibilityColor(user.compatibility_score) }\n                  ]}>\n                    {user.compatibility_score}%\n                  </Text>\n                </View>\n                <ProgressBar\n                  progress={user.compatibility_score / 100}\n                  color={getCompatibilityColor(user.compatibility_score)}\n                  style={styles.compatibilityBar}\n                />\n                <Text style={[\n                  styles.compatibilityText,\n                  { color: getCompatibilityColor(user.compatibility_score) }\n                ]}>\n                  {getCompatibilityText(user.compatibility_score)}\n                </Text>\n              </View>\n\n              {/* Common Interests */}\n              {user.interests.length > 0 && (\n                <View style={styles.interestsSection}>\n                  <Text style={styles.sectionTitle}>\n                    {t('matches.interests.common')}\n                  </Text>\n                  <View style={styles.interestChips}>\n                    {user.interests.slice(0, 4).map((interest, index) => (\n                      <Chip\n                        key={index}\n                        mode=\"flat\"\n                        style={styles.interestChip}\n                        textStyle={styles.interestChipText}\n                      >\n                        {interest}\n                      </Chip>\n                    ))}\n                    {user.interests.length > 4 && (\n                      <Chip\n                        mode=\"flat\"\n                        style={styles.moreChip}\n                        textStyle={styles.moreChipText}\n                      >\n                        +{user.interests.length - 4}\n                      </Chip>\n                    )}\n                  </View>\n                </View>\n              )}\n            </Card.Content>\n          </TouchableOpacity>\n\n          {/* Swipe Overlay */}\n          <Animated.View style={[styles.swipeOverlay, overlayStyle]} pointerEvents=\"none\">\n            <Text style={styles.swipeText}>\n              {translateX.value > SWIPE_THRESHOLD ? t('matches.swipe.like') :\n               translateX.value < -SWIPE_THRESHOLD ? t('matches.swipe.pass') :\n               translateY.value < -SWIPE_THRESHOLD ? t('matches.swipe.superLike') : ''}\n            </Text>\n          </Animated.View>\n        </Card>\n\n        {/* Action Buttons */}\n        <View style={styles.actionButtons}>\n          <TouchableOpacity\n            style={[styles.actionButton, styles.passButton]}\n            onPress={() => onPass(user.id)}\n          >\n            <Text style={styles.actionButtonIcon}>✕</Text>\n          </TouchableOpacity>\n\n          {isPremium && (\n            <TouchableOpacity\n              style={[styles.actionButton, styles.superLikeButton]}\n              onPress={() => onSuperLike(user.id)}\n            >\n              <Text style={styles.actionButtonIcon}>⭐</Text>\n            </TouchableOpacity>\n          )}\n\n          <TouchableOpacity\n            style={[styles.actionButton, styles.likeButton]}\n            onPress={() => onLike(user.id)}\n          >\n            <Text style={styles.actionButtonIcon}>♥</Text>\n          </TouchableOpacity>\n        </View>\n      </Animated.View>\n    </PanGestureHandler>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    width: CARD_WIDTH,\n    alignSelf: 'center',\n    marginBottom: 20,\n  },\n  card: {\n    backgroundColor: Colors.surface,\n    borderRadius: 16,\n    overflow: 'hidden',\n  },\n  imageContainer: {\n    position: 'relative',\n    height: 300,\n  },\n  image: {\n    width: '100%',\n    height: '100%',\n    resizeMode: 'cover',\n  },\n  placeholderImage: {\n    width: '100%',\n    height: '100%',\n    backgroundColor: Colors.primary + '20',\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  placeholderText: {\n    ...Typography.h1,\n    color: Colors.primary,\n    fontWeight: 'bold',\n  },\n  verificationBadge: {\n    position: 'absolute',\n    top: 16,\n    right: 16,\n    backgroundColor: Colors.success,\n    borderRadius: 12,\n    width: 24,\n    height: 24,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  verificationIcon: {\n    color: 'white',\n    fontSize: 12,\n    fontWeight: 'bold',\n  },\n  premiumBadge: {\n    position: 'absolute',\n    top: 16,\n    left: 16,\n    backgroundColor: Colors.warning + 'CC',\n    borderRadius: 12,\n    width: 24,\n    height: 24,\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  premiumIcon: {\n    fontSize: 12,\n  },\n  content: {\n    padding: 20,\n  },\n  nameSection: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: 16,\n  },\n  name: {\n    ...Typography.h2,\n    color: Colors.text,\n    fontWeight: 'bold',\n  },\n  lastActive: {\n    ...Typography.caption,\n    color: Colors.textSecondary,\n  },\n  heritageSection: {\n    marginBottom: 12,\n  },\n  sectionTitle: {\n    ...Typography.caption,\n    color: Colors.textSecondary,\n    marginBottom: 4,\n    fontWeight: '600',\n    textTransform: 'uppercase',\n    letterSpacing: 0.5,\n  },\n  heritageFlags: {\n    flexDirection: 'row',\n  },\n  heritageFlag: {\n    fontSize: 24,\n    marginRight: 8,\n  },\n  locationSection: {\n    marginBottom: 12,\n  },\n  locationText: {\n    ...Typography.body,\n    color: Colors.textSecondary,\n    marginBottom: 2,\n  },\n  universityText: {\n    ...Typography.body,\n    color: Colors.textSecondary,\n    marginBottom: 2,\n  },\n  occupationText: {\n    ...Typography.body,\n    color: Colors.textSecondary,\n  },\n  languagesSection: {\n    marginBottom: 12,\n  },\n  languageChips: {\n    flexDirection: 'row',\n    flexWrap: 'wrap',\n    gap: 6,\n  },\n  languageChip: {\n    height: 28,\n    backgroundColor: Colors.primaryLight,\n    borderColor: Colors.primary,\n  },\n  languageChipText: {\n    ...Typography.caption,\n    color: Colors.primary,\n    fontSize: 11,\n  },\n  bioSection: {\n    marginBottom: 16,\n  },\n  bio: {\n    ...Typography.body,\n    color: Colors.text,\n    lineHeight: 20,\n    fontStyle: 'italic',\n  },\n  compatibilitySection: {\n    marginBottom: 16,\n    backgroundColor: Colors.primaryLight,\n    padding: 12,\n    borderRadius: 8,\n  },\n  compatibilityHeader: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: 8,\n  },\n  compatibilityTitle: {\n    ...Typography.subtitle,\n    color: Colors.text,\n    fontWeight: '600',\n  },\n  compatibilityScore: {\n    ...Typography.h3,\n    fontWeight: 'bold',\n  },\n  compatibilityBar: {\n    height: 6,\n    borderRadius: 3,\n    backgroundColor: Colors.border,\n    marginBottom: 4,\n  },\n  compatibilityText: {\n    ...Typography.caption,\n    fontWeight: '600',\n    textAlign: 'center',\n  },\n  interestsSection: {\n    marginBottom: 16,\n  },\n  interestChips: {\n    flexDirection: 'row',\n    flexWrap: 'wrap',\n    gap: 6,\n  },\n  interestChip: {\n    height: 28,\n    backgroundColor: Colors.surface,\n    borderWidth: 1,\n    borderColor: Colors.border,\n  },\n  interestChipText: {\n    ...Typography.caption,\n    color: Colors.text,\n    fontSize: 11,\n  },\n  moreChip: {\n    height: 28,\n    backgroundColor: Colors.textSecondary + '20',\n  },\n  moreChipText: {\n    ...Typography.caption,\n    color: Colors.textSecondary,\n    fontSize: 11,\n    fontWeight: '600',\n  },\n  swipeOverlay: {\n    position: 'absolute',\n    top: 0,\n    left: 0,\n    right: 0,\n    bottom: 0,\n    alignItems: 'center',\n    justifyContent: 'center',\n    borderRadius: 16,\n  },\n  swipeText: {\n    ...Typography.h2,\n    color: 'white',\n    fontWeight: 'bold',\n    textShadowColor: 'rgba(0,0,0,0.5)',\n    textShadowOffset: { width: 0, height: 2 },\n    textShadowRadius: 4,\n  },\n  actionButtons: {\n    flexDirection: 'row',\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginTop: 16,\n    gap: 20,\n  },\n  actionButton: {\n    width: 56,\n    height: 56,\n    borderRadius: 28,\n    alignItems: 'center',\n    justifyContent: 'center',\n    elevation: 4,\n    shadowColor: '#000',\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n  },\n  passButton: {\n    backgroundColor: Colors.error,\n  },\n  superLikeButton: {\n    backgroundColor: Colors.primary,\n    width: 48,\n    height: 48,\n    borderRadius: 24,\n  },\n  likeButton: {\n    backgroundColor: Colors.success,\n  },\n  actionButtonIcon: {\n    color: 'white',\n    fontSize: 24,\n    fontWeight: 'bold',\n  },\n});"