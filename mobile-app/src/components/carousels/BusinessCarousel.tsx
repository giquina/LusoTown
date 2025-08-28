import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, Badge, Avatar, Button } from 'react-native-paper';
import LusophoneCarousel, { BusinessCarouselItem, type MobileCarouselConfig } from './LusophoneCarousel';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG } from '../../config';

/**
 * Business Directory carousel configuration
 */
const BUSINESS_CAROUSEL_CONFIG: Partial<MobileCarouselConfig> = {
  itemHeight: 300,
  enableAutoplay: false, // User-controlled browsing for business discovery
  inactiveSlideScale: 0.9,
  activeSlideOffset: 15,
};

/**
 * Business type icons mapping
 */
const BUSINESS_ICONS = {
  restaurant: '🍽️',
  service: '🔧',
  shop: '🛍️',
  cultural: '🎭',
};

/**
 * Portuguese Business Directory Carousel Component
 */
interface BusinessCarouselProps {
  businesses: BusinessCarouselItem[];
  loading?: boolean;
  onBusinessPress?: (business: BusinessCarouselItem, index: number) => void;
  testID?: string;
}

export default function BusinessCarousel({
  businesses,
  loading = false,
  onBusinessPress,
  testID = 'business-carousel',
}: BusinessCarouselProps) {
  const { t, i18n } = useTranslation();

  const renderBusinessItem = ({ item, index }: { item: BusinessCarouselItem; index: number }) => {
    const language = i18n.language as 'en' | 'pt';

    return (
      <Card style={styles.businessCard} onPress={() => onBusinessPress?.(item, index)}>
        <Card.Content style={styles.businessContent}>
          {/* Business Header */}
          <View style={styles.businessHeader}>
            <View style={styles.businessTypeContainer}>
              <Avatar.Text 
                size={48} 
                label={BUSINESS_ICONS[item.businessType] || '🏪'}
                style={[styles.businessIcon, { backgroundColor: PORTUGUESE_COLORS.primaryLight }]}
                labelStyle={styles.businessIconLabel}
              />
              {item.isVerified && (
                <Badge 
                  style={[styles.verifiedBadge, { backgroundColor: PORTUGUESE_COLORS.success }]}
                  size={16}
                >
                  ✓
                </Badge>
              )}
            </View>
            {item.heritage && (
              <Text style={styles.businessFlag}>
                {item.heritage === 'portugal' ? '🇵🇹' : 
                 item.heritage === 'brazil' ? '🇧🇷' : 
                 item.heritage === 'cape-verde' ? '🇨🇻' : 
                 item.heritage === 'angola' ? '🇦🇴' : '🇵🇹'}
              </Text>
            )}
          </View>

          {/* Business Info */}
          <View style={styles.businessInfo}>
            <Text style={styles.businessTitle}>
              {item.title[language]}
            </Text>

            <Text style={styles.businessType}>
              {t(`business.type.${item.businessType}`, item.businessType.charAt(0).toUpperCase() + item.businessType.slice(1))}
            </Text>

            <Text style={styles.businessArea}>
              📍 {item.area}
            </Text>

            {/* Rating */}
            {item.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  ⭐ {item.rating.toFixed(1)}
                </Text>
              </View>
            )}
          </View>

          {/* Business Description */}
          {item.description && (
            <Text style={styles.businessDescription}>
              {item.description[language]}
            </Text>
          )}

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <Button
              mode="contained"
              onPress={() => onBusinessPress?.(item, index)}
              style={[styles.actionButton, { backgroundColor: PORTUGUESE_COLORS.primary }]}
              contentStyle={styles.actionButtonContent}
              labelStyle={styles.actionButtonLabel}
              compact
            >
              {item.actionLabel?.[language] || t('business.viewDetails', 'View Details')}
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <LusophoneCarousel
      items={businesses}
      renderItem={renderBusinessItem}
      title={{
        en: 'Portuguese Business Directory',
        pt: 'Diretório de Negócios Portugueses',
      }}
      config={BUSINESS_CAROUSEL_CONFIG}
      onItemPress={onBusinessPress}
      loading={loading}
      emptyMessage={{
        en: 'No businesses listed at the moment. Be the first to add your business!',
        pt: 'Nenhum negócio listado no momento. Seja o primeiro a adicionar o seu negócio!',
      }}
      testID={testID}
      accessibilityLabel={{
        en: 'Portuguese business directory carousel',
        pt: 'Carrossel do diretório de negócios portugueses',
      }}
    />
  );
}

/**
 * Styles specific to Business Carousel
 */
const styles = StyleSheet.create({
  businessCard: {
    flex: 1,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderRadius: 16,
    elevation: 3,
    shadowColor: PORTUGUESE_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  businessContent: {
    flex: 1,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  businessTypeContainer: {
    position: 'relative',
  },
  businessIcon: {
    backgroundColor: PORTUGUESE_COLORS.primaryLight,
  },
  businessIconLabel: {
    fontSize: 20,
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: PORTUGUESE_COLORS.success,
  },
  businessFlag: {
    fontSize: 24,
  },
  businessInfo: {
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
    lineHeight: 22,
    marginBottom: 4,
  },
  businessType: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.primary,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  businessArea: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.accent,
    fontWeight: '600',
  },
  businessDescription: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    flex: 1,
  },
  actionContainer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: PORTUGUESE_COLORS.primary,
    borderRadius: 8,
    minWidth: 120,
  },
  actionButtonContent: {
    paddingVertical: 4,
    minHeight: MOBILE_UX_CONFIG.minTouchTarget,
  },
  actionButtonLabel: {
    color: PORTUGUESE_COLORS.surface,
    fontSize: 14,
    fontWeight: '600',
  },
});

export { type BusinessCarouselItem };