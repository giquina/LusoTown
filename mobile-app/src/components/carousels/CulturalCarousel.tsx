import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Chip } from 'react-native-paper';
import LusophoneCarousel, { CulturalCarouselItem, type MobileCarouselConfig } from './LusophoneCarousel';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG, HERITAGE_FLAGS } from '../../config';

/**
 * Cultural Heritage carousel configuration
 */
const CULTURAL_CAROUSEL_CONFIG: Partial<MobileCarouselConfig> = {
  itemHeight: 350, // Taller for cultural content
  enableAutoplay: true,
  autoplayDelay: 6000, // Slower for reading cultural content
  inactiveSlideScale: 0.88,
  enableParallax: true, // Enhanced visual appeal for cultural content
};

/**
 * Portuguese Cultural Heritage Carousel Component
 */
interface CulturalCarouselProps {
  culturalItems: CulturalCarouselItem[];
  loading?: boolean;
  onCulturalPress?: (item: CulturalCarouselItem, index: number) => void;
  testID?: string;
}

export default function CulturalCarousel({
  culturalItems,
  loading = false,
  onCulturalPress,
  testID = 'cultural-carousel',
}: CulturalCarouselProps) {
  const { t, i18n } = useTranslation();

  const renderCulturalItem = ({ item, index }: { item: CulturalCarouselItem; index: number }) => {
    const language = i18n.language as 'en' | 'pt';

    return (
      <Card style={styles.culturalCard} onPress={() => onCulturalPress?.(item, index)}>
        <Card.Content style={styles.culturalContent}>
          {/* Cultural Header */}
          <View style={styles.culturalHeader}>
            <View style={styles.countryContainer}>
              <Text style={styles.countryFlag}>
                {HERITAGE_FLAGS[item.heritage as keyof typeof HERITAGE_FLAGS] || '🇵🇹'}
              </Text>
              <Text style={styles.countryName}>
                {item.country}
              </Text>
            </View>
            {item.communitySize && (
              <Text style={styles.communitySizeText}>
                👥 {item.communitySize.toLocaleString()} {t('cultural.inUK', 'in UK')}
              </Text>
            )}
          </View>

          {/* Cultural Title */}
          <Text style={styles.culturalTitle}>
            {item.title[language]}
          </Text>

          {/* Cultural Description */}
          {item.description && (
            <Text style={styles.culturalDescription}>
              {item.description[language]}
            </Text>
          )}

          {/* Cultural Elements */}
          {item.culturalElements && item.culturalElements.length > 0 && (
            <View style={styles.elementsContainer}>
              <Text style={styles.elementsTitle}>
                {t('cultural.highlights', 'Cultural Highlights')}:
              </Text>
              <View style={styles.elementsGrid}>
                {item.culturalElements.slice(0, 6).map((element, elementIndex) => (
                  <Chip
                    key={elementIndex}
                    mode="outlined"
                    compact
                    style={styles.culturalElement}
                    textStyle={styles.culturalElementText}
                  >
                    {element}
                  </Chip>
                ))}
                {item.culturalElements.length > 6 && (
                  <Text style={styles.moreElementsText}>
                    +{item.culturalElements.length - 6} {t('cultural.more', 'more')}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Cultural Symbols */}
          <View style={styles.symbolsContainer}>
            <Text style={styles.culturalSymbols}>
              🎵 🍽️ 🎭 🏛️ ⛵ 🌿
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <LusophoneCarousel
      items={culturalItems}
      renderItem={renderCulturalItem}
      title={{
        en: 'Portuguese Cultural Heritage',
        pt: 'Patrimônio Cultural Português',
      }}
      config={CULTURAL_CAROUSEL_CONFIG}
      onItemPress={onCulturalPress}
      loading={loading}
      emptyMessage={{
        en: 'No cultural content available. Explore Portuguese heritage!',
        pt: 'Nenhum conteúdo cultural disponível. Explore o patrimônio português!',
      }}
      testID={testID}
      accessibilityLabel={{
        en: 'Portuguese cultural heritage carousel',
        pt: 'Carrossel do patrimônio cultural português',
      }}
    />
  );
}

/**
 * Styles specific to Cultural Carousel
 */
const styles = StyleSheet.create({
  culturalCard: {
    flex: 1,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderRadius: 16,
    elevation: 4,
    shadowColor: PORTUGUESE_COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Cultural gradient border effect
    borderWidth: 1,
    borderColor: PORTUGUESE_COLORS.primaryLight,
  },
  culturalContent: {
    flex: 1,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
  },
  culturalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    paddingBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_COLORS.border,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 28,
    marginRight: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
  },
  communitySizeText: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.textSecondary,
    fontStyle: 'italic',
  },
  culturalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
    lineHeight: 24,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    textAlign: 'center',
  },
  culturalDescription: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
    textAlign: 'center',
    flex: 1,
  },
  elementsContainer: {
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  elementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  elementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  culturalElement: {
    margin: 2,
    borderColor: PORTUGUESE_COLORS.secondary,
    backgroundColor: PORTUGUESE_COLORS.secondaryLight,
  },
  culturalElementText: {
    fontSize: 11,
    color: PORTUGUESE_COLORS.secondary,
    fontWeight: '500',
  },
  moreElementsText: {
    fontSize: 11,
    color: PORTUGUESE_COLORS.textLight,
    fontStyle: 'italic',
    marginTop: 4,
  },
  symbolsContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: MOBILE_UX_CONFIG.comfortableSpacing,
    borderTopWidth: 1,
    borderTopColor: PORTUGUESE_COLORS.border,
  },
  culturalSymbols: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export { type CulturalCarouselItem };