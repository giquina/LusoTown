import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  Vibration,
  AccessibilityInfo,
  InteractionManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { TOUCH_TARGETS, SPACING, LAYOUT_SPACING } from '../../design-system/tokens/spacing';
import { supabase } from '../../lib/supabase';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = 180; // Fixed height for better FlatList performance

interface Business {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  isVerified: boolean;
  isPremium: boolean;
  culturalOfferings: string[];
  openingHours: {
    [key: string]: string;
  };
  photos?: string[];
}

interface EnhancedDirectoryScreenProps {
  navigation: any;
}

export default function EnhancedDirectoryScreen({ navigation }: EnhancedDirectoryScreenProps) {
  const { t } = useTranslation();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Refs for performance optimization
  const flatListRef = useRef<FlatList>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Business Categories with enhanced accessibility
  const categories = useMemo(() => [
    { id: 'all', name: t('directory.categories.all'), emoji: '🏪', count: businesses.length },
    { id: 'restaurants', name: t('directory.categories.restaurants'), emoji: '🍽️', count: businesses.filter(b => b.category === 'restaurants').length },
    { id: 'services', name: t('directory.categories.services'), emoji: '🔧', count: businesses.filter(b => b.category === 'services').length },
    { id: 'professional', name: t('directory.categories.professional'), emoji: '💼', count: businesses.filter(b => b.category === 'professional').length },
    { id: 'beauty_wellness', name: t('directory.categories.health'), emoji: '💆‍♀️', count: businesses.filter(b => b.category === 'beauty_wellness').length },
    { id: 'retail', name: t('directory.categories.retail'), emoji: '🛍️', count: businesses.filter(b => b.category === 'retail').length },
    { id: 'cultural_services', name: t('directory.categories.cultural'), emoji: '🎭', count: businesses.filter(b => b.category === 'cultural_services').length },
    { id: 'import_export', name: t('directory.categories.import'), emoji: '🌍', count: businesses.filter(b => b.category === 'import_export').length }
  ], [businesses, t]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      fetchBusinesses();
      getUserLocation();
    });
  }, []);

  // Enhanced search with debouncing and performance optimization
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      filterBusinesses();
    }, 300); // Debounce search for better performance

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, selectedCategory, businesses]);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portuguese_businesses')
        .select(`
          id,
          name,
          category,
          subcategory,
          description,
          address,
          postcode,
          city,
          phone,
          website,
          rating,
          review_count,
          price_range,
          coordinates,
          is_verified,
          is_premium,
          cultural_offerings,
          opening_hours,
          photos
        `)
        .eq('is_active', true)
        .order('is_premium', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;
      
      const formattedBusinesses = (data || []).map(business => ({
        id: business.id,
        name: business.name,
        category: business.category,
        subcategory: business.subcategory,
        description: business.description,
        address: business.address,
        postcode: business.postcode,
        city: business.city,
        phone: business.phone,
        website: business.website,
        rating: business.rating,
        reviewCount: business.review_count,
        priceRange: business.price_range,
        coordinates: business.coordinates,
        isVerified: business.is_verified,
        isPremium: business.is_premium,
        culturalOfferings: business.cultural_offerings || [],
        openingHours: business.opening_hours || {},
        photos: business.photos || [],
      }));

      setBusinesses(formattedBusinesses);
      
    } catch (error) {
      console.error('Error fetching businesses:', error);
      Alert.alert(t('common.error'), t('errors.network'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  const getUserLocation = useCallback(async () => {
    // Implement location fetching with expo-location
    // This is a placeholder for the location service integration
  }, []);

  const filterBusinesses = useCallback(() => {
    let filtered = businesses;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(query) ||
        business.description.toLowerCase().includes(query) ||
        business.category.toLowerCase().includes(query) ||
        business.subcategory.toLowerCase().includes(query) ||
        business.city.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery, selectedCategory]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBusinesses();
    setRefreshing(false);
  }, [fetchBusinesses]);

  const handleBusinessPress = useCallback((businessId: string) => {
    Vibration.vibrate(30);
    navigation.navigate('BusinessDetails', { businessId });
  }, [navigation]);

  const handleCategoryPress = useCallback((categoryId: string) => {
    Vibration.vibrate(20);
    setSelectedCategory(categoryId);
    
    // Announce category change for accessibility
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      AccessibilityInfo.announceForAccessibility(
        t('directory.accessibility.categorySelected', { category: category.name })
      );
    }
  }, [categories, t]);

  const handleViewModeChange = useCallback((mode: 'list' | 'map') => {
    Vibration.vibrate(20);
    setViewMode(mode);
    
    AccessibilityInfo.announceForAccessibility(
      t('directory.accessibility.viewModeChanged', { mode })
    );
  }, [t]);

  const handleSearchFocus = useCallback(() => {
    setSearchFocused(true);
    AccessibilityInfo.announceForAccessibility(
      t('directory.accessibility.searchActive')
    );
  }, [t]);

  const handleSearchBlur = useCallback(() => {
    setSearchFocused(false);
  }, []);

  // Optimized business card renderer with memoization
  const renderBusinessCard = useCallback(({ item: business, index }: { item: Business; index: number }) => (
    <TouchableOpacity
      style={[styles.businessCard, { marginTop: index === 0 ? SPACING.sm : 0 }]}
      onPress={() => handleBusinessPress(business.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={t('directory.accessibility.businessCard', { 
        name: business.name,
        category: business.subcategory,
        rating: business.rating
      })}
      accessibilityHint={t('directory.accessibility.tapForDetails')}
      activeOpacity={0.8}
    >
      {/* Business Image */}
      <View style={styles.imageContainer}>
        {business.photos && business.photos.length > 0 ? (
          <Image 
            source={{ uri: business.photos[0] }} 
            style={styles.businessImage}
            accessible={true}
            accessibilityLabel={t('directory.accessibility.businessPhoto', { name: business.name })}
          />
        ) : (
          <View style={[styles.businessImage, styles.placeholderImage]}>
            <Ionicons name="business" size={32} color={Colors.textSecondary} />
          </View>
        )}

        {/* Premium Badge */}
        {business.isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={14} color={Colors.warning} />
          </View>
        )}
      </View>

      <View style={styles.businessInfo}>
        <View style={styles.businessHeader}>
          <Text style={styles.businessName} numberOfLines={1}>
            {business.name}
          </Text>
          <View style={styles.badges}>
            {business.isVerified && (
              <View 
                style={styles.verifiedBadge}
                accessible={true}
                accessibilityLabel={t('directory.accessibility.verified')}
              >
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              </View>
            )}
          </View>
        </View>

        <Text style={styles.businessCategory} numberOfLines={1}>
          {business.subcategory}
        </Text>
        <Text style={styles.businessDescription} numberOfLines={2}>
          {business.description}
        </Text>

        <View style={styles.businessMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={Colors.warning} />
            <Text style={styles.ratingText}>
              {business.rating.toFixed(1)} ({business.reviewCount})
            </Text>
          </View>
          <Text style={styles.priceRange}>{business.priceRange}</Text>
        </View>

        <View style={styles.location}>
          <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {business.city}, {business.postcode}
          </Text>
        </View>

        {/* Cultural Offerings */}
        {business.culturalOfferings && business.culturalOfferings.length > 0 && (
          <View style={styles.culturalTags}>
            {business.culturalOfferings.slice(0, 2).map((offering, index) => (
              <View key={index} style={styles.culturalTag}>
                <Text style={styles.culturalTagText} numberOfLines={1}>
                  {offering}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  ), [handleBusinessPress, t]);

  // Optimized category chip renderer
  const renderCategoryChip = useCallback(({ item: category, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === category.id && styles.selectedCategoryChip,
        { marginLeft: index === 0 ? SPACING.lg : SPACING.xs }
      ]}
      onPress={() => handleCategoryPress(category.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${category.name}, ${category.count} ${t('directory.businesses')}`}
      accessibilityState={{ selected: selectedCategory === category.id }}
      activeOpacity={0.8}
    >
      <Text style={styles.categoryEmoji}>{category.emoji}</Text>
      <View style={styles.categoryTextContainer}>
        <Text
          style={[
            styles.categoryText,
            selectedCategory === category.id && styles.selectedCategoryText
          ]}
          numberOfLines={1}
        >
          {category.name}
        </Text>
        <Text
          style={[
            styles.categoryCount,
            selectedCategory === category.id && styles.selectedCategoryCount
          ]}
        >
          {category.count}
        </Text>
      </View>
    </TouchableOpacity>
  ), [selectedCategory, handleCategoryPress, t]);

  // Optimized map view with performance considerations
  const renderMapView = useCallback(() => (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 51.5074,
        longitude: -0.1278,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      accessible={true}
      accessibilityLabel={t('directory.accessibility.map')}
    >
      {filteredBusinesses
        .filter(business => business.coordinates)
        .slice(0, 50) // Limit markers for performance
        .map(business => (
        <Marker
          key={business.id}
          coordinate={business.coordinates!}
          title={business.name}
          description={business.subcategory}
          onPress={() => handleBusinessPress(business.id)}
        >
          <View style={styles.markerContainer}>
            <View style={[
              styles.marker,
              business.isPremium && styles.premiumMarker
            ]}>
              <Ionicons
                name="business"
                size={16}
                color={business.isPremium ? Colors.warning : Colors.primary}
              />
            </View>
            {business.isVerified && (
              <View style={styles.markerBadge}>
                <Ionicons name="checkmark" size={8} color={Colors.white} />
              </View>
            )}
          </View>
        </Marker>
      ))}
    </MapView>
  ), [filteredBusinesses, handleBusinessPress, t]);

  // Enhanced empty state component
  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🔍</Text>
      <Text style={styles.emptyStateTitle}>
        {searchQuery ? t('directory.noResults.title') : t('directory.noBusinesses.title')}
      </Text>
      <Text style={styles.emptyStateMessage}>
        {searchQuery ? 
          t('directory.noResults.message', { query: searchQuery }) : 
          t('directory.noBusinesses.message')
        }
      </Text>
      {searchQuery && (
        <TouchableOpacity
          style={styles.clearSearchButton}
          onPress={() => setSearchQuery('')}
        >
          <Text style={styles.clearSearchText}>
            {t('directory.clearSearch')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  ), [searchQuery, t]);

  // Loading state
  if (loading) {
    return (
      <View style={CommonStyles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{t('directory.title')}</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === 'list' && styles.activeViewToggle
              ]}
              onPress={() => handleViewModeChange('list')}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t('directory.accessibility.listView')}
              accessibilityState={{ selected: viewMode === 'list' }}
            >
              <Ionicons
                name="list"
                size={20}
                color={viewMode === 'list' ? Colors.white : Colors.textSecondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === 'map' && styles.activeViewToggle
              ]}
              onPress={() => handleViewModeChange('map')}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t('directory.accessibility.mapView')}
              accessibilityState={{ selected: viewMode === 'map' }}
            >
              <Ionicons
                name="map"
                size={20}
                color={viewMode === 'map' ? Colors.white : Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Enhanced Search Bar */}
        <View style={[styles.searchContainer, searchFocused && styles.searchContainerFocused]}>
          <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('directory.search_placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholderTextColor={Colors.textSecondary}
            returnKeyType="search"
            accessible={true}
            accessibilityLabel={t('directory.accessibility.searchInput')}
            accessibilityHint={t('directory.accessibility.searchHint')}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchIcon}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t('directory.accessibility.clearSearch')}
            >
              <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Enhanced Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategoryChip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
        />

        {/* Enhanced Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredBusinesses.length} {t('directory.businesses_found')}
          </Text>
          {selectedCategory !== 'all' && (
            <TouchableOpacity
              onPress={() => setSelectedCategory('all')}
              style={styles.clearFilterButton}
            >
              <Text style={styles.clearFilterText}>
                {t('directory.showAll')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Content */}
      {viewMode === 'list' ? (
        <FlatList
          ref={flatListRef}
          data={filteredBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.businessList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={8}
          ListEmptyComponent={renderEmptyState}
          onEndReachedThreshold={0.5}
          accessible={true}
          accessibilityLabel={t('directory.accessibility.businessList')}
        />
      ) : (
        renderMapView()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 2,
  },
  viewToggleButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    minWidth: TOUCH_TARGETS.minimum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeViewToggle: {
    backgroundColor: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    minHeight: TOUCH_TARGETS.medium,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchContainerFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    ...Typography.body,
    color: Colors.text,
    fontSize: 16,
  },
  clearSearchIcon: {
    padding: SPACING.xs,
  },
  categoriesContainer: {
    paddingVertical: SPACING.xs,
    paddingRight: SPACING.lg,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.xs,
    minHeight: TOUCH_TARGETS.medium,
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCategoryChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: Colors.white,
    fontWeight: '600',
  },
  categoryCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  selectedCategoryCount: {
    color: Colors.white + 'CC',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xs,
  },
  resultsCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  clearFilterButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  clearFilterText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  businessList: {
    padding: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  businessCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: SPACING.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    height: ITEM_HEIGHT,
  },
  imageContainer: {
    position: 'relative',
  },
  businessImage: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.background,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    backgroundColor: Colors.warning + 'DD',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessInfo: {
    padding: SPACING.sm,
    flex: 1,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  businessName: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
    marginRight: SPACING.xs,
    fontWeight: '600',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    marginLeft: SPACING.xs,
  },
  businessCategory: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
    fontSize: 10,
    fontWeight: '600',
  },
  businessDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: SPACING.xs,
    lineHeight: 18,
    fontSize: 13,
  },
  businessMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: SPACING.xs,
    fontSize: 12,
  },
  priceRange: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  locationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: SPACING.xs,
    flex: 1,
    fontSize: 12,
  },
  culturalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  culturalTag: {
    backgroundColor: Colors.primaryLight || Colors.primary + '20',
    borderRadius: 8,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  culturalTagText: {
    ...Typography.caption,
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '500',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: SPACING.xs,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  premiumMarker: {
    borderColor: Colors.warning,
  },
  markerBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.success,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['4xl'],
    paddingHorizontal: SPACING.lg,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyStateTitle: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  emptyStateMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  clearSearchButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  clearSearchText: {
    ...Typography.button,
    color: Colors.white,
    fontWeight: '600',
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});