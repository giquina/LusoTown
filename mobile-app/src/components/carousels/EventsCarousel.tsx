import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Badge, Chip } from 'react-native-paper';
import LusophoneCarousel, { EventCarouselItem, type MobileCarouselConfig } from './LusophoneCarousel';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG } from '../../config';

/**
 * Events-specific carousel configuration
 */
const EVENTS_CAROUSEL_CONFIG: Partial<MobileCarouselConfig> = {
  itemHeight: 320, // Taller for event information
  enableAutoplay: true,
  autoplayDelay: 4000,
  inactiveSlideScale: 0.85,
};

/**
 * Portuguese Events Carousel Component
 * Displays Portuguese community events with cultural context
 */
interface EventsCarouselProps {
  events: EventCarouselItem[];
  loading?: boolean;
  onEventPress?: (event: EventCarouselItem, index: number) => void;
  testID?: string;
}

export default function EventsCarousel({
  events,
  loading = false,
  onEventPress,
  testID = 'events-carousel',
}: EventsCarouselProps) {
  const { t, i18n } = useTranslation();

  const renderEventItem = ({ item, index }: { item: EventCarouselItem; index: number }) => {
    const language = i18n.language as 'en' | 'pt';

    return (
      <Card style={styles.eventCard} onPress={() => onEventPress?.(item, index)}>
        <Card.Content style={styles.eventContent}>
          {/* Event Header */}
          <View style={styles.eventHeader}>
            <View style={styles.eventTitleContainer}>
              <Text style={styles.eventTitle}>
                {item.title[language]}
              </Text>
              {item.isFeature && (
                <Badge style={styles.featuredBadge} size={16}>
                  {t('events.featured', 'Featured')}
                </Badge>
              )}
            </View>
            {item.heritage && (
              <Text style={styles.eventFlag}>
                {item.heritage === 'portugal' ? '🇵🇹' : 
                 item.heritage === 'brazil' ? '🇧🇷' : 
                 item.heritage === 'cape-verde' ? '🇨🇻' : 
                 item.heritage === 'angola' ? '🇦🇴' : '🇵🇹'}
              </Text>
            )}
          </View>

          {/* Event Details */}
          <View style={styles.eventDetails}>
            <Text style={styles.eventDate}>
              📅 {new Date(item.date).toLocaleDateString(
                language === 'pt' ? 'pt-PT' : 'en-GB',
                { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }
              )}
            </Text>
            
            <Text style={styles.eventLocation}>
              📍 {item.location}
            </Text>

            {item.attendees !== undefined && (
              <Text style={styles.eventAttendees}>
                👥 {item.attendees} {t('events.attending', 'attending')}
              </Text>
            )}
          </View>

          {/* Event Description */}
          {item.description && (
            <Text style={styles.eventDescription}>
              {item.description[language]}
            </Text>
          )}

          {/* Event Tags */}
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <Chip
                  key={tagIndex}
                  mode="outlined"
                  compact
                  style={styles.eventTag}
                  textStyle={styles.eventTagText}
                >
                  {tag}
                </Chip>
              ))}
              {item.tags.length > 3 && (
                <Text style={styles.moreTagsText}>
                  +{item.tags.length - 3} {t('events.more', 'more')}
                </Text>
              )}
            </View>
          )}

          {/* Price Information */}
          {item.price !== undefined && (
            <View style={styles.priceContainer}>
              <Text style={[
                styles.eventPrice,
                { color: item.price === 0 ? PORTUGUESE_COLORS.success : PORTUGUESE_COLORS.primary }
              ]}>
                {item.price === 0 
                  ? t('events.free', 'Free') 
                  : `£${item.price.toFixed(2)}`
                }
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <LusophoneCarousel
      items={events}
      renderItem={renderEventItem}
      title={{
        en: 'Portuguese Community Events',
        pt: 'Eventos da Comunidade Portuguesa',
      }}
      config={EVENTS_CAROUSEL_CONFIG}
      onItemPress={onEventPress}
      loading={loading}
      emptyMessage={{
        en: 'No events scheduled at the moment. Check back soon!',
        pt: 'Nenhum evento agendado no momento. Volte em breve!',
      }}
      testID={testID}
      accessibilityLabel={{
        en: 'Portuguese community events carousel',
        pt: 'Carrossel de eventos da comunidade portuguesa',
      }}
    />
  );
}

/**
 * Styles specific to Events Carousel
 */
const styles = StyleSheet.create({
  eventCard: {
    flex: 1,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderRadius: 16,
    elevation: 3,
    shadowColor: PORTUGUESE_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  eventContent: {
    flex: 1,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  eventTitleContainer: {
    flex: 1,
    marginRight: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
    lineHeight: 22,
    marginBottom: 4,
  },
  featuredBadge: {
    backgroundColor: PORTUGUESE_COLORS.accent,
    alignSelf: 'flex-start',
  },
  eventFlag: {
    fontSize: 24,
  },
  eventDetails: {
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  eventDate: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    marginBottom: 4,
  },
  eventAttendees: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  eventTag: {
    marginRight: 6,
    marginBottom: 4,
    borderColor: PORTUGUESE_COLORS.primary,
  },
  eventTagText: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.primary,
  },
  moreTagsText: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.textLight,
    fontStyle: 'italic',
  },
  priceContainer: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export { type EventCarouselItem };