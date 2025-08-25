// 🇵🇹 LusoTown Mobile - Cultural Event Card Component
// Event card with Portuguese cultural context and styling

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PORTUGUESE_THEME, COMPONENT_THEMES } from '../tokens';
import { PortugueseEvent, HeritageCountry } from '../../types';

export interface CulturalEventCardProps {
  /** Event data */
  event: PortugueseEvent;
  
  /** Card layout style */
  layout?: 'compact' | 'standard' | 'featured';
  
  /** Current language for display */
  language?: 'en' | 'pt';
  
  /** Whether user is attending */
  isAttending?: boolean;
  
  /** Whether event is favorited */
  isFavorite?: boolean;
  
  /** Show cultural context badges */
  showCulturalContext?: boolean;
  
  /** Show event categories */
  showCategories?: boolean;
  
  /** Show attendees count */
  showAttendeesCount?: boolean;
  
  /** Show price information */
  showPrice?: boolean;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Card press handler */
  onPress?: (event: PortugueseEvent, gestureEvent: GestureResponderEvent) => void;
  
  /** Attend button handler */
  onAttend?: (event: PortugueseEvent) => void;
  
  /** Favorite toggle handler */
  onToggleFavorite?: (event: PortugueseEvent) => void;
  
  /** Share event handler */
  onShare?: (event: PortugueseEvent) => void;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Cultural Event Card Component
 * 
 * A culturally-aware event card component optimized for Portuguese cultural events.
 * Features heritage context, cultural categories, and Portuguese-specific styling.
 * 
 * @example
 * ```tsx
 * <CulturalEventCard
 *   event={fadoNightEvent}
 *   layout="featured"
 *   language="pt"
 *   showCulturalContext={true}
 *   showCategories={true}
 *   onPress={(event) => navigateToEventDetails(event)}
 *   onAttend={(event) => joinEvent(event)}
 * />
 * ```
 */
export function CulturalEventCard({
  event,
  layout = 'standard',
  language = 'en',
  isAttending = false,
  isFavorite = false,
  showCulturalContext = true,
  showCategories = true,
  showAttendeesCount = true,
  showPrice = true,
  style,
  onPress,
  onAttend,
  onToggleFavorite,
  onShare,
  testID
}: CulturalEventCardProps) {
  
  const theme = COMPONENT_THEMES.events;
  const cardStyles = getCardStyles(layout, theme);
  const isFeatured = layout === 'featured';
  
  const handlePress = (gestureEvent: GestureResponderEvent) => {
    if (onPress) {
      onPress(event, gestureEvent);
    }
  };
  
  const handleAttend = () => {
    if (onAttend) {
      onAttend(event);
    }
  };
  
  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(event);
    }
  };
  
  const handleShare = () => {
    if (onShare) {
      onShare(event);
    }
  };
  
  const renderEventImage = () => {
    if (!event.imageUrl || layout === 'compact') return null;
    
    const imageHeight = layout === 'featured' ? 200 : 120;
    
    return (
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.eventImage}
          resizeMode="cover"
        />
        {renderFavoriteButton()}
        {renderCulturalContextBadges()}
      </View>
    );
  };
  
  const renderFavoriteButton = () => (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={handleToggleFavorite}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={isFavorite ? PORTUGUESE_THEME.colors.error : PORTUGUESE_THEME.colors.surface}
      />
    </TouchableOpacity>
  );
  
  const renderCulturalContextBadges = () => {
    if (!showCulturalContext || !event.culturalContext?.length) return null;
    
    return (
      <View style={styles.culturalBadges}>
        {event.culturalContext.slice(0, 2).map((heritage, index) => (
          <View key={heritage} style={styles.culturalBadge}>
            <Text style={styles.culturalBadgeText}>
              {getCulturalFlag(heritage)}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  const renderEventHeader = () => (
    <View style={styles.eventHeader}>
      <View style={styles.eventTitleContainer}>
        <Text
          style={[
            styles.eventTitle,
            layout === 'featured' && styles.featuredTitle
          ]}
          numberOfLines={layout === 'compact' ? 1 : 2}
        >
          {event.title[language]}
        </Text>
        {event.organizer.isVerified && (
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={PORTUGUESE_THEME.colors.success}
            style={styles.verifiedIcon}
          />
        )}
      </View>
      
      <Text
        style={styles.eventDescription}
        numberOfLines={layout === 'compact' ? 1 : 3}
      >
        {event.description[language]}
      </Text>
    </View>
  );
  
  const renderEventMetadata = () => (
    <View style={styles.eventMetadata}>
      <View style={styles.eventDetails}>
        <View style={styles.detailItem}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={PORTUGUESE_THEME.colors.textSecondary}
          />
          <Text style={styles.detailText}>
            {formatEventDate(event.date, language)}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons
            name="location-outline"
            size={16}
            color={PORTUGUESE_THEME.colors.textSecondary}
          />
          <Text style={styles.detailText} numberOfLines={1}>
            {event.location.name}
          </Text>
        </View>
        
        {showPrice && event.price && (
          <View style={styles.detailItem}>
            <Ionicons
              name="card-outline"
              size={16}
              color={PORTUGUESE_THEME.colors.textSecondary}
            />
            <Text style={styles.detailText}>
              {formatPrice(event.price, event.currency)}
            </Text>
          </View>
        )}
      </View>
      
      {showAttendeesCount && (
        <View style={styles.attendeesContainer}>
          <Ionicons
            name="people-outline"
            size={16}
            color={PORTUGUESE_THEME.colors.textSecondary}
          />
          <Text style={styles.attendeesText}>
            {event.attendeesCount}
          </Text>
        </View>
      )}
    </View>
  );
  
  const renderEventCategories = () => {
    if (!showCategories || !event.categories?.length) return null;
    
    return (
      <View style={styles.categoriesContainer}>
        {event.categories.slice(0, 3).map((category, index) => (
          <View key={category.id} style={[styles.categoryChip, { backgroundColor: category.color + '20' }]}>
            <Text style={[styles.categoryText, { color: category.color }]}>
              {category.icon} {category.name[language]}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  const renderEventActions = () => {
    if (layout === 'compact') return null;
    
    return (
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={[
            styles.attendButton,
            isAttending && styles.attendingButton
          ]}
          onPress={handleAttend}
          accessibilityRole="button"
          accessibilityLabel={isAttending ? 'You are attending' : 'Attend event'}
        >
          <Ionicons
            name={isAttending ? 'checkmark-circle' : 'add-circle-outline'}
            size={20}
            color={isAttending ? PORTUGUESE_THEME.colors.surface : PORTUGUESE_THEME.colors.primary}
          />
          <Text style={[
            styles.attendButtonText,
            isAttending && styles.attendingButtonText
          ]}>
            {isAttending 
              ? (language === 'pt' ? 'Participando' : 'Attending')
              : (language === 'pt' ? 'Participar' : 'Attend')
            }
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          accessibilityRole="button"
          accessibilityLabel="Share event"
        >
          <Ionicons
            name="share-outline"
            size={20}
            color={PORTUGUESE_THEME.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <TouchableOpacity
      style={[cardStyles, style]}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${event.title[language]} event`}
      testID={testID}
    >
      {renderEventImage()}
      
      <View style={styles.eventContent}>
        {renderEventHeader()}
        {renderEventMetadata()}
        {renderEventCategories()}
        {renderEventActions()}
      </View>
    </TouchableOpacity>
  );
}

// Helper functions
function getCardStyles(layout: 'compact' | 'standard' | 'featured', theme: any): ViewStyle {
  const baseStyles: ViewStyle = {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.cardMargin,
    overflow: 'hidden',
    ...theme.shadows.default,
  };
  
  switch (layout) {
    case 'compact':
      return {
        ...baseStyles,
        flexDirection: 'row',
        padding: theme.spacing.cardPadding,
      };
    case 'featured':
      return {
        ...baseStyles,
        ...theme.shadows.featured,
        backgroundColor: theme.colors.featuredBackground,
      };
    default:
      return baseStyles;
  }
}

function getCulturalFlag(heritage: HeritageCountry): string {
  const flags: Record<HeritageCountry, string> = {
    portugal: '🇵🇹',
    brazil: '🇧🇷',
    'cape-verde': '🇨🇻',
    angola: '🇦🇴',
    mozambique: '🇲🇿',
    'guinea-bissau': '🇬🇼',
    'east-timor': '🇹🇱',
    'sao-tome': '🇸🇹'
  };
  return flags[heritage] || '🇵🇹';
}

function formatEventDate(date: string, language: 'en' | 'pt'): string {
  const eventDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
  return eventDate.toLocaleDateString(locale, options);
}

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency || 'GBP'
  }).format(price);
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: PORTUGUESE_THEME.borderRadius.medium,
    borderTopRightRadius: PORTUGUESE_THEME.borderRadius.medium,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  culturalBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
  },
  culturalBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
  },
  culturalBadgeText: {
    fontSize: 16,
  },
  eventContent: {
    padding: PORTUGUESE_THEME.spacing.md,
  },
  eventHeader: {
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  eventTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventTitle: {
    ...PORTUGUESE_THEME.typography.headingSmall,
    color: PORTUGUESE_THEME.colors.text,
    flex: 1,
  },
  featuredTitle: {
    ...PORTUGUESE_THEME.typography.headingMedium,
    fontWeight: '700',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  eventDescription: {
    ...PORTUGUESE_THEME.typography.bodySmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    lineHeight: 20,
  },
  eventMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  eventDetails: {
    flex: 1,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    ...PORTUGUESE_THEME.typography.labelSmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    ...PORTUGUESE_THEME.typography.labelSmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: PORTUGUESE_THEME.borderRadius.full,
    marginRight: 6,
    marginBottom: 4,
  },
  categoryText: {
    ...PORTUGUESE_THEME.typography.caption,
    fontWeight: '600',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderColor: PORTUGUESE_THEME.colors.primary,
    borderWidth: 2,
    borderRadius: PORTUGUESE_THEME.borderRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  attendingButton: {
    backgroundColor: PORTUGUESE_THEME.colors.success,
    borderColor: PORTUGUESE_THEME.colors.success,
  },
  attendButtonText: {
    ...PORTUGUESE_THEME.typography.labelMedium,
    color: PORTUGUESE_THEME.colors.primary,
    marginLeft: 6,
    fontWeight: '600',
  },
  attendingButtonText: {
    color: PORTUGUESE_THEME.colors.surface,
  },
  shareButton: {
    padding: 8,
    borderRadius: PORTUGUESE_THEME.borderRadius.full,
  },
});

export default CulturalEventCard;