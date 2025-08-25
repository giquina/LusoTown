import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';
import { PortugueseEvent, Match, Business } from '../../types';
import { OptimizedImage } from '../../components/optimized/OptimizedImage';
import { withOptimization, useOptimizedCallback, usePortugueseCulturalMemo } from '../../components/optimized/OptimizedComponent';
import { PortugueseCacheManager, PerformanceMonitor } from '../../utils/performance';
import { PortugueseEvent as PortugueseEventAPI } from '../../lib/supabase';

function HomeScreenComponent() {
  const { t, i18n } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<PortugueseEvent[]>([]);
  const [newMatches, setNewMatches] = useState<Match[]>([]);
  const [nearbyBusinesses, setNearbyBusinesses] = useState<Business[]>([]);

  // Performance tracking
  const renderStartTime = performance.now();

  // Optimized data loading with caching
  const loadHomeData = useOptimizedCallback(async () => {
    const apiStartTime = performance.now();
    
    try {
      // Try to get cached data first
      const cachedEvents = await PortugueseCacheManager.getCachedData<PortugueseEvent[]>('portuguese-events');
      const cachedMatches = await PortugueseCacheManager.getCachedData<Match[]>('user-matches');
      const cachedBusinesses = await PortugueseCacheManager.getCachedData<Business[]>('cultural-businesses');

      if (cachedEvents) setUpcomingEvents(cachedEvents);
      if (cachedMatches) setNewMatches(cachedMatches);
      if (cachedBusinesses) setNearbyBusinesses(cachedBusinesses);

      // If we have cached data, we can return early for better performance
      if (cachedEvents && cachedMatches && cachedBusinesses) {
        PerformanceMonitor.trackApiCall('loadHomeData_cached', performance.now() - apiStartTime);
        return;
      }

      // Fallback to mock data (replace with actual API calls)
      await loadMockData();
      
      PerformanceMonitor.trackApiCall('loadHomeData', performance.now() - apiStartTime);
    } catch (error) {
      console.error('Failed to load home data:', error);
      // Fallback to mock data on error
      await loadMockData();
    }
  }, []);

  const loadMockData = useOptimizedCallback(async () => {
    const mockEvents: PortugueseEvent[] = [
      {
        id: '1',
        title: { 
          en: 'Portuguese Wine Tasting', 
          pt: 'Degustação de Vinhos Portugueses' 
        },
        description: { 
          en: 'Taste the finest Portuguese wines', 
          pt: 'Prove os melhores vinhos portugueses' 
        },
        date: '2024-12-30T19:00:00Z',
        location: {
          name: 'Portuguese Cultural Centre',
          address: '123 Heritage Street',
          city: 'London',
          postcode: 'SW1A 1AA',
        },
        price: 25.00,
        currency: 'GBP',
        attendeesCount: 24,
        categories: [],
        organizer: {
          id: '1',
          name: 'Portuguese Cultural Centre',
          isVerified: true,
        },
        culturalContext: ['portugal'],
      },
    ];

    const mockMatches: Match[] = [
      {
        id: '1',
        user: {
          id: '1',
          firstName: 'Maria',
          lastName: 'Santos',
          email: 'maria@example.com',
          dateOfBirth: '1990-01-01',
          heritage: 'portugal',
          language: 'pt',
          interests: ['food', 'music'],
          isVerified: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        compatibilityScore: 92,
        sharedInterests: ['food', 'music', 'festivals'],
        culturalConnections: ['portugal'],
        lastActive: '2024-12-25T10:00:00Z',
        distance: 2.5,
      },
    ];

    const mockBusinesses: Business[] = [
      {
        id: '1',
        name: 'Tasca do Bacalhau',
        description: { 
          en: 'Authentic Portuguese restaurant', 
          pt: 'Restaurante português autêntico' 
        },
        category: {
          id: 'restaurants',
          name: { en: 'Restaurants', pt: 'Restaurantes' },
          icon: '🍽️',
        },
        location: {
          address: '456 Portuguese Lane',
          city: 'London',
          postcode: 'E1 6AN',
          coordinates: { latitude: 51.5074, longitude: -0.1278 },
        },
        contact: {
          phone: '+44 20 1234 5678',
        },
        images: [],
        rating: 4.5,
        reviewCount: 127,
        isVerified: true,
        ownerHeritage: ['portugal'],
        isOpen: true,
      },
    ];

    setUpcomingEvents(mockEvents);
    setNewMatches(mockMatches);
    setNearbyBusinesses(mockBusinesses);
    
    // Cache the mock data for better performance
    await Promise.allSettled([
      PortugueseCacheManager.cacheData('portuguese-events', mockEvents),
      PortugueseCacheManager.cacheData('user-matches', mockMatches),
      PortugueseCacheManager.cacheData('cultural-businesses', mockBusinesses)
    ]);
  }, []);

  // Load data on mount with performance tracking
  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  // Track render performance
  useEffect(() => {
    PerformanceMonitor.trackRenderTime('HomeScreen', renderStartTime);
  });

  const onRefresh = useOptimizedCallback(async () => {
    setRefreshing(true);
    await loadHomeData();
    setRefreshing(false);
  }, [loadHomeData]);

  // Memoized date formatting for Portuguese cultural context
  const formatDate = useOptimizedCallback((dateString: string) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'pt' ? 'pt-PT' : 'en-GB';
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }, [i18n.language]);

  // Memoized Portuguese cultural data processing
  const portugueseCulturalData = usePortugueseCulturalMemo({
    events: upcomingEvents,
    matches: newMatches,
    businesses: nearbyBusinesses
  }, ['portugal'], i18n.language);

  // Optimized cultural tip based on language
  const culturalTip = useMemo(() => {
    return i18n.language === 'pt' 
      ? 'Sabia que "saudade" é uma palavra única portuguesa que não tem tradução direta em inglês? Representa uma sensação profunda de nostalgia e amor.'
      : 'Did you know "saudade" is a uniquely Portuguese word with no direct English translation? It represents a deep feeling of nostalgia and love.';
  }, [i18n.language]);

  return (
    <SafeAreaView style={CommonStyles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>
            {t('home.greeting', { name: 'João' })} 🇵🇹
          </Text>
          <Text style={styles.welcomeText}>
            {t('home.welcome_back')}
          </Text>
        </View>

        {/* Cultural Tip of the Day */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={20} color={Colors.gold} />
            <Text style={styles.tipTitle}>{t('home.cultural_tip')}</Text>
          </View>
          <Text style={styles.tipText}>
            {culturalTip}
          </Text>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.upcoming_events')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>{t('home.see_all')}</Text>
            </TouchableOpacity>
          </View>

          {upcomingEvents.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {upcomingEvents.map((event) => (
                <TouchableOpacity key={event.id} style={styles.eventCard}>
                  <View style={styles.eventDateBadge}>
                    <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
                  </View>
                  <Text style={styles.eventTitle} numberOfLines={2}>
                    {event.title[i18n.language as 'en' | 'pt']}
                  </Text>
                  <Text style={styles.eventLocation} numberOfLines={1}>
                    📍 {event.location.name}
                  </Text>
                  <Text style={styles.eventPrice}>
                    £{event.price?.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>{t('home.no_events')}</Text>
          )}
        </View>

        {/* New Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.new_matches')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>{t('home.see_all')}</Text>
            </TouchableOpacity>
          </View>

          {newMatches.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {newMatches.map((match) => (
                <TouchableOpacity key={match.id} style={styles.matchCard}>
                  <View style={styles.matchAvatar}>
                    <Text style={styles.matchAvatarText}>
                      {match.user.firstName[0]}
                    </Text>
                  </View>
                  <Text style={styles.matchName} numberOfLines={1}>
                    {match.user.firstName}
                  </Text>
                  <Text style={styles.matchCompatibility}>
                    {t('matches.compatibility', { score: match.compatibilityScore })}
                  </Text>
                  <View style={styles.matchHeritage}>
                    <Text style={styles.heritageFlag}>
                      {match.culturalConnections.includes('portugal') && '🇵🇹'}
                      {match.culturalConnections.includes('brazil') && '🇧🇷'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>{t('home.no_matches')}</Text>
          )}
        </View>

        {/* Nearby Businesses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.nearby_businesses')}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>{t('home.see_all')}</Text>
            </TouchableOpacity>
          </View>

          {nearbyBusinesses.map((business) => (
            <TouchableOpacity key={business.id} style={styles.businessCard}>
              <View style={styles.businessInfo}>
                <View style={styles.businessHeader}>
                  <Text style={styles.businessName}>{business.name}</Text>
                  {business.isVerified && (
                    <Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
                  )}
                </View>
                <Text style={styles.businessDescription} numberOfLines={1}>
                  {business.description[i18n.language as 'en' | 'pt']}
                </Text>
                <View style={styles.businessDetails}>
                  <View style={styles.businessRating}>
                    <Ionicons name="star" size={14} color={Colors.gold} />
                    <Text style={styles.ratingText}>
                      {business.rating} ({business.reviewCount})
                    </Text>
                  </View>
                  <Text style={styles.businessStatus}>
                    {business.isOpen ? 'Open' : 'Closed'}
                  </Text>
                </View>
              </View>
              <View style={styles.businessIcon}>
                <Text style={styles.businessEmoji}>
                  {business.category.icon}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.primaryLight,
  },
  greeting: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  welcomeText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tipCard: {
    margin: Spacing.lg,
    padding: Spacing.md,
    backgroundColor: Colors.goldLight,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  tipTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginLeft: Spacing.sm,
    color: Colors.text,
  },
  tipText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  seeAllLink: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '500',
  },
  eventCard: {
    width: 200,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginLeft: Spacing.lg,
    marginRight: Spacing.xs,
    ...CommonStyles.shadow,
  },
  eventDateBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  eventDate: {
    ...Typography.caption,
    color: Colors.surface,
    fontWeight: '600',
  },
  eventTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  eventLocation: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  eventPrice: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },
  matchCard: {
    width: 100,
    alignItems: 'center',
    marginLeft: Spacing.lg,
    marginRight: Spacing.xs,
  },
  matchAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  matchAvatarText: {
    ...Typography.h3,
    color: Colors.surface,
  },
  matchName: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  matchCompatibility: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  matchHeritage: {
    alignItems: 'center',
  },
  heritageFlag: {
    fontSize: 16,
  },
  businessCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    ...CommonStyles.shadow,
  },
  businessInfo: {
    flex: 1,
  },
  businessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  businessName: {
    ...Typography.body,
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  businessDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  businessDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  businessRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.caption,
    marginLeft: 4,
    color: Colors.textSecondary,
  },
  businessStatus: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: '500',
  },
  businessIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessEmoji: {
    fontSize: 24,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: Spacing.lg,
  },
});

// Export with performance optimization
const HomeScreen = withOptimization(
  HomeScreenComponent,
  'HomeScreen',
  (prevProps, nextProps) => {
    // Home screen has no props, so always optimize
    return true;
  }
);

export default HomeScreen;