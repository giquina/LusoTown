import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Vibration,
  AccessibilityInfo,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Button, Chip } from 'react-native-paper';
import { Colors, Typography } from '../../constants/Styles';
import { TOUCH_TARGETS, SPACING } from '../../design-system/tokens/spacing';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  cultural_context: string[];
  category: string;
  price: number;
  max_attendees: number;
  current_attendees: number;
  image_url?: string;
  organizer_name: string;
  is_premium: boolean;
}

interface EventCardProps {
  event: Event;
  onPress: () => void;
  onRegister: () => void;
  currentUser: any;
}

export default function EventCard({ event, onPress, onRegister, currentUser }: EventCardProps) {
  const { t } = useTranslation();
  const [isPressed, setIsPressed] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return t('events.date.today');
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t('events.date.tomorrow');
    } else {
      return date.toLocaleDateString('pt-PT', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return t('events.price.free');
    return `£${price.toFixed(2)}`;
  };

  const getCulturalFlag = (context: string) => {
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
    return flags[context] || '🌍';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'music': '🎵',
      'food': '🍽️',
      'culture': '🎭',
      'business': '💼',
      'sports': '⚽',
      'education': '📚',
      'social': '👥',
      'festival': '🎪',
      'art': '🎨',
      'dance': '💃',
    };
    return icons[category] || '📅';
  };

  const isEventFull = () => {
    return event.current_attendees >= event.max_attendees;
  };

  const getAvailabilityText = () => {
    const remaining = event.max_attendees - event.current_attendees;
    if (remaining <= 0) return t('events.availability.full');
    if (remaining <= 5) return t('events.availability.limited', { count: remaining });
    return t('events.availability.available');
  };

  const getAvailabilityColor = () => {
    const remaining = event.max_attendees - event.current_attendees;
    if (remaining <= 0) return Colors.error;
    if (remaining <= 5) return Colors.warning;
    return Colors.success;
  };

  // Enhanced touch interaction handlers
  const handleCardPressIn = () => {
    setIsPressed(true);
  };

  const handleCardPressOut = () => {
    setIsPressed(false);
  };

  const handleCardPress = () => {
    // Haptic feedback for better Portuguese community engagement
    Vibration.vibrate(50);
    onPress();
  };

  const handleRegisterPress = async () => {
    if (!currentUser) {
      Alert.alert(
        t('auth.required.title'),
        t('auth.required.message')
      );
      return;
    }

    if (isEventFull()) return;

    setIsRegistering(true);
    
    // Haptic feedback for registration action
    Vibration.vibrate([50, 100, 50]);
    
    try {
      await onRegister();
      
      // Announce registration success for accessibility
      AccessibilityInfo.announceForAccessibility(
        t('events.register.success', { title: event.title })
      );
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        t('common.error'),
        t('events.register.error')
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Card 
      style={[styles.card, isPressed && styles.cardPressed]} 
      elevation={isPressed ? 6 : 2}
    >
      <TouchableOpacity 
        onPress={handleCardPress}
        onPressIn={handleCardPressIn}
        onPressOut={handleCardPressOut}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${t('events.event')}: ${event.title}, ${formatDate(event.date)}, ${event.location}`}
        accessibilityHint={t('events.accessibility.tapForDetails')}
      >
        {/* Event Image */}
        {event.image_url && (
          <Card.Cover
            source={{ uri: event.image_url }}
            style={styles.image}
          />
        )}

        <Card.Content style={styles.content}>
          {/* Header with cultural context */}
          <View style={styles.header}>
            <View style={styles.culturalFlags}>
              {event.cultural_context.map((context, index) => (
                <Text key={index} style={styles.flag}>
                  {getCulturalFlag(context)}
                </Text>
              ))}\n            </View>\n            {event.is_premium && (\n              <Chip\n                mode=\"flat\"\n                style={styles.premiumChip}\n                textStyle={styles.premiumText}\n              >\n                {t('events.premium')}\n              </Chip>\n            )}\n          </View>\n\n          {/* Event Title and Category */}\n          <View style={styles.titleRow}>\n            <Text style={styles.categoryIcon}>\n              {getCategoryIcon(event.category)}\n            </Text>\n            <Text style={styles.title} numberOfLines={2}>\n              {event.title}\n            </Text>\n          </View>\n\n          {/* Event Details */}\n          <View style={styles.details}>\n            <View style={styles.detailRow}>\n              <Text style={styles.detailIcon}>📅</Text>\n              <Text style={styles.detailText}>\n                {formatDate(event.date)} • {event.time}\n              </Text>\n            </View>\n\n            <View style={styles.detailRow}>\n              <Text style={styles.detailIcon}>📍</Text>\n              <Text style={styles.detailText} numberOfLines={1}>\n                {event.location}\n              </Text>\n            </View>\n\n            <View style={styles.detailRow}>\n              <Text style={styles.detailIcon}>👤</Text>\n              <Text style={styles.detailText}>\n                {event.organizer_name}\n              </Text>\n            </View>\n          </View>\n\n          {/* Description */}\n          <Text style={styles.description} numberOfLines={2}>\n            {event.description}\n          </Text>\n\n          {/* Footer */}\n          <View style={styles.footer}>\n            <View style={styles.priceSection}>\n              <Text style={styles.price}>\n                {formatPrice(event.price)}\n              </Text>\n              <Text style={[\n                styles.availability,\n                { color: getAvailabilityColor() }\n              ]}>\n                {getAvailabilityText()}\n              </Text>\n            </View>\n\n            <Button\n              mode=\"contained\"\n              onPress={(e) => {\n                e.stopPropagation();\n                if (!currentUser) {\n                  Alert.alert(\n                    t('auth.required.title'),\n                    t('auth.required.message')\n                  );\n                  return;\n                }\n                onRegister();\n              }}\n              disabled={isEventFull()}\n              style={[\n                styles.registerButton,\n                isEventFull() && styles.registerButtonDisabled\n              ]}\n              labelStyle={styles.registerButtonText}\n              compact\n            >\n              {isEventFull() ? \n                t('events.register.full') : \n                t('events.register.button')\n              }\n            </Button>\n          </View>\n        </Card.Content>\n      </TouchableOpacity>\n    </Card>\n  );\n}\n\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: Colors.surface,\n    borderRadius: 12,\n    overflow: 'hidden',\n  },\n  image: {\n    height: 160,\n  },\n  content: {\n    padding: 16,\n  },\n  header: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: 12,\n  },\n  culturalFlags: {\n    flexDirection: 'row',\n  },\n  flag: {\n    fontSize: 18,\n    marginRight: 4,\n  },\n  premiumChip: {\n    backgroundColor: Colors.warning + '20',\n    height: 24,\n  },\n  premiumText: {\n    ...Typography.caption,\n    color: Colors.warning,\n    fontSize: 10,\n    fontWeight: 'bold',\n  },\n  titleRow: {\n    flexDirection: 'row',\n    alignItems: 'flex-start',\n    marginBottom: 12,\n  },\n  categoryIcon: {\n    fontSize: 20,\n    marginRight: 8,\n    marginTop: 2,\n  },\n  title: {\n    ...Typography.h3,\n    color: Colors.text,\n    fontWeight: 'bold',\n    flex: 1,\n    lineHeight: 22,\n  },\n  details: {\n    marginBottom: 12,\n  },\n  detailRow: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    marginBottom: 4,\n  },\n  detailIcon: {\n    fontSize: 14,\n    width: 20,\n    textAlign: 'center',\n    marginRight: 8,\n  },\n  detailText: {\n    ...Typography.body,\n    color: Colors.textSecondary,\n    flex: 1,\n  },\n  description: {\n    ...Typography.body,\n    color: Colors.textSecondary,\n    lineHeight: 20,\n    marginBottom: 16,\n  },\n  footer: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n  },\n  priceSection: {\n    flex: 1,\n  },\n  price: {\n    ...Typography.h3,\n    color: Colors.primary,\n    fontWeight: 'bold',\n    marginBottom: 2,\n  },\n  availability: {\n    ...Typography.caption,\n    fontWeight: '600',\n  },\n  registerButton: {\n    backgroundColor: Colors.primary,\n    borderRadius: 8,\n  },\n  registerButtonDisabled: {\n    backgroundColor: Colors.disabled,\n  },\n  registerButtonText: {\n    ...Typography.button,\n    color: 'white',\n    fontSize: 12,\n  },\n});