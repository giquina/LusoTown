import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { Surface, Card, IconButton, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG, HERITAGE_FLAGS } from '../../config';

// Import our new implementations
import { useSmartCulturalPreloader } from './SmartCulturalPreloader';
import { useCommunityShareSystem, CommunityShareButton, type ShareableContent } from './CommunityShareSystem';
import { useLondonTransportIntegration, EventTransportInfo } from './LondonTransportIntegration';

// Screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Base interface for mobile carousel items - optimized for Portuguese content
 */
export interface LusophoneCarouselItem {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  description?: {
    en: string;
    pt: string;
  };
  image?: string;
  heritage?: keyof typeof HERITAGE_FLAGS;
  category?: string;
  priority?: number;
  actionLabel?: {
    en: string;
    pt: string;
  };
  onPress?: () => void;
}

/**
 * Portuguese Event carousel item for mobile
 */
export interface EventCarouselItem extends LusophoneCarouselItem {
  date: string;
  location: string;
  price?: number;
  attendees?: number;
  tags: string[];
  isFeature: boolean;
}

/**
 * Business Directory carousel item for mobile
 */
export interface BusinessCarouselItem extends LusophoneCarouselItem {
  businessType: 'restaurant' | 'service' | 'shop' | 'cultural';
  rating?: number;
  area: string;
  isVerified: boolean;
}

/**
 * Cultural Heritage carousel item for mobile
 */
export interface CulturalCarouselItem extends LusophoneCarouselItem {
  country: string;
  culturalElements: string[];
  communitySize?: number;
}

/**
 * Union type for all carousel items
 */
export type CarouselItemType = EventCarouselItem | BusinessCarouselItem | CulturalCarouselItem | LusophoneCarouselItem;

/**
 * Mobile carousel configuration
 */
interface MobileCarouselConfig {
  itemWidth: number;
  itemHeight: number;
  sliderWidth: number;
  enableLoop: boolean;
  enableAutoplay: boolean;
  autoplayDelay: number;
  activeSlideOffset: number;
  inactiveSlideScale: number;
  inactiveSlideOpacity: number;
  enablePagination: boolean;
  enableParallax: boolean;
}

/**
 * Main carousel component props
 */
interface LusophoneCarouselProps<T extends CarouselItemType> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: {
    en: string;
    pt: string;
  };
  config?: Partial<MobileCarouselConfig>;
  onItemPress?: (item: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: {
    en: string;
    pt: string;
  };
  testID?: string;
  accessibilityLabel?: {
    en: string;
    pt: string;
  };
  // Enhanced mobile features
  enableSmartPreloading?: boolean;
  enableCommunitySharing?: boolean;
  enableTransportIntegration?: boolean;
  shareableContentTransformer?: (item: T) => ShareableContent;
  culturalCategory?: string;
  showPreloadingStatus?: boolean;
  showNearbyRecommendations?: boolean;
}

/**
 * Default mobile configuration optimized for Portuguese content
 */
const DEFAULT_MOBILE_CONFIG: MobileCarouselConfig = {
  itemWidth: screenWidth * 0.85, // 85% of screen width
  itemHeight: 280,               // Optimized for Portuguese text
  sliderWidth: screenWidth,
  enableLoop: true,
  enableAutoplay: false,         // Disabled by default for better UX
  autoplayDelay: 5000,
  activeSlideOffset: 20,
  inactiveSlideScale: 0.9,
  inactiveSlideOpacity: 0.7,
  enablePagination: true,
  enableParallax: false,         // Simplified for performance
};

/**
 * Mobile-optimized LusophoneCarousel Component
 */
export default function LusophoneCarousel<T extends CarouselItemType>({
  items,
  renderItem,
  title,
  config = {},
  onItemPress,
  loading = false,
  emptyMessage,
  testID = 'lusotown-carousel',
  accessibilityLabel,
  // Enhanced mobile features
  enableSmartPreloading = true,
  enableCommunitySharing = true,
  enableTransportIntegration = true,
  shareableContentTransformer,
  culturalCategory,
  showPreloadingStatus = false,
  showNearbyRecommendations = true,
}: LusophoneCarouselProps<T>) {
  const { t, i18n } = useTranslation();
  const carouselRef = useRef<Carousel<T>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showTransportInfo, setShowTransportInfo] = useState(false);
  const [selectedItemForSharing, setSelectedItemForSharing] = useState<T | null>(null);

  // Enhanced mobile systems
  const preloader = enableSmartPreloading ? useSmartCulturalPreloader() : null;
  const shareSystem = enableCommunitySharing ? useCommunityShareSystem() : null;
  const transportSystem = enableTransportIntegration ? useLondonTransportIntegration() : null;

  // Merge default config with props
  const carouselConfig = useMemo(() => ({
    ...DEFAULT_MOBILE_CONFIG,
    ...config,
  }), [config]);

  // Animation values
  const scrollX = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  // Auto-play functionality
  useEffect(() => {
    let autoplayInterval: NodeJS.Timeout;

    if (carouselConfig.enableAutoplay && isAutoplayActive && items.length > 1) {
      autoplayInterval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % items.length;
        carouselRef.current?.snapToItem(nextIndex, true);
      }, carouselConfig.autoplayDelay);
    }

    return () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };
  }, [activeIndex, isAutoplayActive, items.length, carouselConfig]);

  const handleSnapToItem = useCallback((index: number) => {
    setActiveIndex(index);
    scrollX.value = withSpring(index);
  }, [scrollX]);

  const handleItemPress = useCallback((item: T, index: number) => {
    // Haptic feedback for iOS
    if (Platform.OS === 'ios') {
      const { HapticFeedback } = require('expo-haptics');
      HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Light);
    }

    onItemPress?.(item, index);
  }, [onItemPress]);

  // Default render item with Portuguese styling
  const defaultRenderItem = useCallback(({ item, index }: { item: T; index: number }) => {
    const isActive = index === activeIndex;
    const language = i18n.language as 'en' | 'pt';

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0.9, 1, 0.9]
      );

      return {
        transform: [{ scale: withSpring(scale) }],
      };
    });

    return (
      <Animated.View style={animatedStyle}>
        <Surface style={[styles.carouselItem, { height: carouselConfig.itemHeight }]}>
          <Card
            style={[
              styles.itemCard,
              isActive && styles.activeCard,
            ]}
            onPress={() => handleItemPress(item, index)}
          >
            <Card.Content style={styles.cardContent}>
              {/* Heritage Flag */}
              {item.heritage && (
                <View style={styles.heritageContainer}>
                  <Text style={styles.heritageFlag}>
                    {HERITAGE_FLAGS[item.heritage]}
                  </Text>
                </View>
              )}

              {/* Title */}
              <Text style={[styles.itemTitle, { color: PORTUGUESE_COLORS.text }]}>
                {item.title[language]}
              </Text>

              {/* Description */}
              {item.description && (
                <Text style={[styles.itemDescription, { color: PORTUGUESE_COLORS.textSecondary }]}>
                  {item.description[language]}
                </Text>
              )}

              {/* Action Button */}
              {item.actionLabel && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: PORTUGUESE_COLORS.primary }]}
                  onPress={() => handleItemPress(item, index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.actionLabel[language]}
                >
                  <Text style={styles.actionButtonText}>
                    {item.actionLabel[language]}
                  </Text>
                </TouchableOpacity>
              )}
            </Card.Content>
          </Card>
        </Surface>
      </Animated.View>
    );
  }, [activeIndex, i18n.language, carouselConfig.itemHeight, handleItemPress, scrollX]);

  // Enhanced render item with new mobile features
  const enhancedRenderItem = useCallback(({ item, index }: { item: T; index: number }) => {
    const isActive = index === activeIndex;
    const language = i18n.language as 'en' | 'pt';

    // Get preloaded content if available
    const preloadedContent = preloader?.getPreloadedContent(culturalCategory);
    const isPreloaded = preloadedContent && preloadedContent.some(content => content.id === item.id);

    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0.9, 1, 0.9]
      );

      return {
        transform: [{ scale: withSpring(scale) }],
      };
    });

    const handleShare = () => {
      if (shareSystem && shareableContentTransformer) {
        const shareableContent = shareableContentTransformer(item);
        setSelectedItemForSharing(item);
        setShowSharePanel(true);
      }
    };

    const handleTransportInfo = () => {
      if (transportSystem && 'location' in item) {
        setShowTransportInfo(true);
      }
    };

    return (
      <Animated.View style={animatedStyle}>
        <Surface style={[styles.carouselItem, { height: carouselConfig.itemHeight }]}>
          <Card
            style={[
              styles.itemCard,
              isActive && styles.activeCard,
              isPreloaded && styles.preloadedCard,
            ]}
            onPress={() => handleItemPress(item, index)}
          >
            <Card.Content style={styles.cardContent}>
              {/* Status indicators */}
              <View style={styles.cardStatusBar}>
                {/* Heritage Flag */}
                {item.heritage && (
                  <View style={styles.heritageContainer}>
                    <Text style={styles.heritageFlag}>
                      {HERITAGE_FLAGS[item.heritage]}
                    </Text>
                  </View>
                )}

                {/* Preload indicator */}
                {showPreloadingStatus && isPreloaded && (
                  <View style={styles.preloadBadge}>
                    <Ionicons name="download" size={12} color={PORTUGUESE_COLORS.success} />
                  </View>
                )}

                {/* Quick actions */}
                <View style={styles.quickActions}>
                  {enableCommunitySharing && shareSystem && shareableContentTransformer && (
                    <TouchableOpacity
                      style={styles.quickActionButton}
                      onPress={handleShare}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="share-outline" size={16} color={PORTUGUESE_COLORS.primary} />
                    </TouchableOpacity>
                  )}

                  {enableTransportIntegration && transportSystem && 'location' in item && (
                    <TouchableOpacity
                      style={styles.quickActionButton}
                      onPress={handleTransportInfo}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="navigate-outline" size={16} color={PORTUGUESE_COLORS.primary} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Title */}
              <Text style={[styles.itemTitle, { color: PORTUGUESE_COLORS.text }]}>
                {item.title[language]}
              </Text>

              {/* Description */}
              {item.description && (
                <Text style={[styles.itemDescription, { color: PORTUGUESE_COLORS.textSecondary }]}>
                  {item.description[language]}
                </Text>
              )}

              {/* Transport info preview */}
              {enableTransportIntegration && 'location' in item && (
                <View style={styles.transportPreview}>
                  <Ionicons name="navigate" size={14} color={PORTUGUESE_COLORS.primary} />
                  <Text style={styles.transportPreviewText}>
                    {t('carousel.transport_available', 'Transport info available')}
                  </Text>
                </View>
              )}

              {/* Cultural relevance indicator */}
              {preloader && isPreloaded && (
                <View style={styles.relevanceIndicator}>
                  <Text style={styles.relevanceText}>
                    {t('carousel.culturally_relevant', 'Culturally relevant for you')}
                  </Text>
                </View>
              )}

              {/* Action Button */}
              {item.actionLabel && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: PORTUGUESE_COLORS.primary }]}
                  onPress={() => handleItemPress(item, index)}
                  accessibilityRole="button"
                  accessibilityLabel={item.actionLabel[language]}
                >
                  <Text style={styles.actionButtonText}>
                    {item.actionLabel[language]}
                  </Text>
                </TouchableOpacity>
              )}
            </Card.Content>
          </Card>
        </Surface>
      </Animated.View>
    );
  }, [
    activeIndex, 
    i18n.language, 
    carouselConfig.itemHeight, 
    handleItemPress, 
    scrollX, 
    preloader, 
    shareSystem, 
    transportSystem,
    shareableContentTransformer,
    culturalCategory,
    showPreloadingStatus,
    enableCommunitySharing,
    enableTransportIntegration,
    t
  ]);

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        {title && (
          <Text style={[styles.carouselTitle, { color: PORTUGUESE_COLORS.text }]}>
            {title[i18n.language as 'en' | 'pt']}
          </Text>
        )}
        <View style={[styles.loadingContainer, { height: carouselConfig.itemHeight }]}>
          <ActivityIndicator
            size="large"
            color={PORTUGUESE_COLORS.primary}
            testID={`${testID}-loading`}
          />
        </View>
      </View>
    );
  }

  // Empty state
  if (items.length === 0) {
    const defaultEmpty = {
      en: 'No content available at the moment.',
      pt: 'Nenhum conteúdo disponível no momento.',
    };
    const message = emptyMessage || defaultEmpty;

    return (
      <View style={styles.container}>
        {title && (
          <Text style={[styles.carouselTitle, { color: PORTUGUESE_COLORS.text }]}>
            {title[i18n.language as 'en' | 'pt']}
          </Text>
        )}
        <View style={[styles.emptyContainer, { height: carouselConfig.itemHeight }]}>
          <Text style={[styles.emptyMessage, { color: PORTUGUESE_COLORS.textSecondary }]}>
            {message[i18n.language as 'en' | 'pt']}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      testID={testID}
      accessibilityLabel={accessibilityLabel?.[i18n.language as 'en' | 'pt']}
    >
      {/* Title */}
      {title && (
        <Text style={[styles.carouselTitle, { color: PORTUGUESE_COLORS.text }]}>
          {title[i18n.language as 'en' | 'pt']}
        </Text>
      )}

      {/* Auto-play Controls */}
      {carouselConfig.enableAutoplay && (
        <View style={styles.controlsContainer}>
          <IconButton
            icon={isAutoplayActive ? 'pause' : 'play'}
            size={24}
            iconColor={PORTUGUESE_COLORS.primary}
            onPress={() => setIsAutoplayActive(!isAutoplayActive)}
            accessibilityLabel={
              isAutoplayActive
                ? t('carousel.pause', 'Pause carousel')
                : t('carousel.play', 'Play carousel')
            }
          />
        </View>
      )}

      {/* Main Carousel */}
      <Carousel
        ref={carouselRef}
        data={items}
        renderItem={renderItem || enhancedRenderItem}
        sliderWidth={carouselConfig.sliderWidth}
        itemWidth={carouselConfig.itemWidth}
        itemHeight={carouselConfig.itemHeight}
        loop={carouselConfig.enableLoop}
        enableSnap
        snapOnAndroid
        removeClippedSubviews={Platform.OS === 'android'}
        onSnapToItem={handleSnapToItem}
        onScrollIndexChanged={(index) => {
          scrollX.value = withTiming(index);
          setActiveIndex(index);
        }}
        firstItem={0}
        inactiveSlideScale={carouselConfig.inactiveSlideScale}
        inactiveSlideOpacity={carouselConfig.inactiveSlideOpacity}
        activeSlideOffset={carouselConfig.activeSlideOffset}
        contentContainerCustomStyle={styles.carouselContent}
        useScrollView
        testID={`${testID}-carousel`}
      />

      {/* Pagination Dots */}
      {carouselConfig.enablePagination && items.length > 1 && (
        <Pagination
          dotsLength={items.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={[styles.paginationDot, { backgroundColor: PORTUGUESE_COLORS.primary }]}
          inactiveDotStyle={[styles.paginationInactiveDot, { backgroundColor: PORTUGUESE_COLORS.textLight }]}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
          animatedDuration={250}
          testID={`${testID}-pagination`}
        />
      )}

      {/* Enhanced Mobile Features UI */}

      {/* Smart Preloading Status */}
      {enableSmartPreloading && preloader && showPreloadingStatus && (
        <View style={styles.preloadingStatus}>
          <View style={styles.preloadingHeader}>
            <Ionicons name="download" size={16} color={PORTUGUESE_COLORS.primary} />
            <Text style={styles.preloadingText}>
              {preloader.isPreloading
                ? t('carousel.preloading', 'Loading cultural content...')
                : t('carousel.preloaded', `${preloader.preloadCache.size} items cached`)
              }
            </Text>
          </View>
          
          {preloader.isPreloading && (
            <ActivityIndicator size="small" color={PORTUGUESE_COLORS.primary} />
          )}
        </View>
      )}

      {/* Nearby Recommendations */}
      {enableSmartPreloading && preloader && showNearbyRecommendations && 
       preloader.locationBasedRecommendations.length > 0 && (
        <View style={styles.nearbyRecommendations}>
          <Text style={styles.nearbyTitle}>
            {t('carousel.nearby_hotspots', 'Nearby Portuguese Community Hotspots')}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {preloader.locationBasedRecommendations.map((hotspot, index) => (
              <TouchableOpacity key={index} style={styles.hotspotCard}>
                <Text style={styles.hotspotName}>{hotspot.name}</Text>
                <Text style={styles.hotspotCommunity}>{hotspot.primaryCommunity}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Community Share Panel */}
      {enableCommunitySharing && shareSystem && selectedItemForSharing && showSharePanel && (
        <View style={styles.sharePanel}>
          <View style={styles.sharePanelOverlay} />
          <View style={styles.sharePanelContent}>
            <View style={styles.sharePanelHeader}>
              <Text style={styles.sharePanelTitle}>
                {t('share.panel.title', 'Share with Portuguese Community')}
              </Text>
              <TouchableOpacity onPress={() => setShowSharePanel(false)}>
                <Ionicons name="close" size={24} color={PORTUGUESE_COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.shareButtonsContainer}>
              {shareableContentTransformer && (
                <>
                  <CommunityShareButton
                    content={shareableContentTransformer(selectedItemForSharing)}
                    platform="whatsapp"
                    style={styles.shareButtonInPanel}
                    onShareComplete={() => setShowSharePanel(false)}
                  />
                  <CommunityShareButton
                    content={shareableContentTransformer(selectedItemForSharing)}
                    platform="instagram"
                    style={styles.shareButtonInPanel}
                    onShareComplete={() => setShowSharePanel(false)}
                  />
                  <CommunityShareButton
                    content={shareableContentTransformer(selectedItemForSharing)}
                    platform="telegram"
                    style={styles.shareButtonInPanel}
                    onShareComplete={() => setShowSharePanel(false)}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Transport Information Panel */}
      {enableTransportIntegration && transportSystem && showTransportInfo && 
       selectedItemForSharing && 'location' in selectedItemForSharing && (
        <View style={styles.transportPanel}>
          <View style={styles.transportPanelOverlay} />
          <View style={styles.transportPanelContent}>
            <View style={styles.transportPanelHeader}>
              <Text style={styles.transportPanelTitle}>
                {t('transport.panel.title', 'Transport Information')}
              </Text>
              <TouchableOpacity onPress={() => setShowTransportInfo(false)}>
                <Ionicons name="close" size={24} color={PORTUGUESE_COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <EventTransportInfo
              event={{
                id: selectedItemForSharing.id,
                title: selectedItemForSharing.title,
                description: selectedItemForSharing.description || { en: '', pt: '' },
                location: (selectedItemForSharing as any).location,
                startTime: (selectedItemForSharing as any).startTime || '',
                endTime: (selectedItemForSharing as any).endTime || '',
                category: (selectedItemForSharing as any).category || 'community',
                heritage: selectedItemForSharing.heritage || 'Portuguese',
                transportOptions: [],
                nearestStations: [],
                accessibilityNotes: {
                  en: 'Contact venue for accessibility information',
                  pt: 'Contacte o local para informações sobre acessibilidade',
                },
              }}
              onPlanJourney={() => {
                if (transportSystem && 'location' in selectedItemForSharing) {
                  transportSystem.openTfLJourneyPlanner(
                    undefined,
                    (selectedItemForSharing as any).location?.name
                  );
                }
                setShowTransportInfo(false);
              }}
              onOpenExternalApp={(app) => {
                if (transportSystem && 'location' in selectedItemForSharing) {
                  if (app === 'tfl') {
                    transportSystem.openTfLJourneyPlanner();
                  } else if (app === 'citymapper') {
                    transportSystem.openCitymapperApp();
                  }
                }
                setShowTransportInfo(false);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

/**
 * Styles optimized for Portuguese content and mobile UX
 */
const styles = StyleSheet.create({
  container: {
    paddingVertical: MOBILE_UX_CONFIG.premiumSpacing,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
    paddingHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
    // Portuguese text accommodation
    lineHeight: 28,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  carouselContent: {
    alignItems: 'center',
  },
  carouselItem: {
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderRadius: 16,
    elevation: 4,
    shadowColor: PORTUGUESE_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginHorizontal: MOBILE_UX_CONFIG.comfortableSpacing / 2,
  },
  itemCard: {
    flex: 1,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderRadius: 16,
  },
  activeCard: {
    elevation: 8,
    shadowOpacity: 0.2,
  },
  cardContent: {
    flex: 1,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
    justifyContent: 'space-between',
  },
  heritageContainer: {
    alignSelf: 'flex-start',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  heritageFlag: {
    fontSize: 24,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    // Portuguese text handling
    lineHeight: 22,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
    // Portuguese text expansion accommodation
    flex: 1,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: MOBILE_UX_CONFIG.comfortableSpacing,
    paddingHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
    alignItems: 'center',
    // WCAG touch target compliance
    minHeight: MOBILE_UX_CONFIG.minTouchTarget,
  },
  actionButtonText: {
    color: PORTUGUESE_COLORS.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  paginationContainer: {
    paddingTop: MOBILE_UX_CONFIG.premiumSpacing,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  paginationInactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PORTUGUESE_COLORS.background,
    borderRadius: 16,
    marginHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PORTUGUESE_COLORS.background,
    borderRadius: 16,
    marginHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },

  // Enhanced mobile features styles
  cardStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  preloadedCard: {
    borderWidth: 2,
    borderColor: PORTUGUESE_COLORS.success + '30', // 30% opacity
  },
  preloadBadge: {
    backgroundColor: PORTUGUESE_COLORS.success + '20',
    borderRadius: 12,
    padding: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: MOBILE_UX_CONFIG.comfortableSpacing / 2,
  },
  quickActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PORTUGUESE_COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing / 2,
  },
  transportPreviewText: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.primary,
    fontWeight: '500',
  },
  relevanceIndicator: {
    backgroundColor: PORTUGUESE_COLORS.gold + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing / 2,
  },
  relevanceText: {
    fontSize: 11,
    color: PORTUGUESE_COLORS.gold,
    fontWeight: '600',
  },

  // Preloading status styles
  preloadingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PORTUGUESE_COLORS.primaryLight,
    padding: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
    marginTop: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  preloadingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  preloadingText: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.primary,
    fontWeight: '500',
  },

  // Nearby recommendations styles
  nearbyRecommendations: {
    marginTop: MOBILE_UX_CONFIG.premiumSpacing,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    paddingHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
  },
  hotspotCard: {
    backgroundColor: PORTUGUESE_COLORS.surface,
    padding: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
    marginLeft: MOBILE_UX_CONFIG.premiumSpacing,
    minWidth: 140,
    borderWidth: 1,
    borderColor: PORTUGUESE_COLORS.border,
  },
  hotspotName: {
    fontSize: 14,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
    marginBottom: 4,
  },
  hotspotCommunity: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.primary,
    fontWeight: '500',
  },

  // Share panel styles
  sharePanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sharePanelOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sharePanelContent: {
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
    width: '100%',
    maxHeight: '50%',
  },
  sharePanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  sharePanelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
  },
  shareButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  shareButtonInPanel: {
    flex: 1,
    minWidth: '30%',
  },

  // Transport panel styles
  transportPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  transportPanelOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transportPanelContent: {
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
    width: '100%',
    maxHeight: '70%',
  },
  transportPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
    paddingBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_COLORS.border,
  },
  transportPanelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
  },
});

/**
 * Export utility types and default configurations
 */
export type {
  LusophoneCarouselItem,
  EventCarouselItem,
  BusinessCarouselItem,
  CulturalCarouselItem,
  CarouselItemType,
  MobileCarouselConfig,
};

export { DEFAULT_MOBILE_CONFIG };