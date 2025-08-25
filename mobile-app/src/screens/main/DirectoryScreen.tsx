import React, { useState, useEffect } from 'react';
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
  Image
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

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

export default function DirectoryScreen({ navigation }) {
  const { t } = useTranslation();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Business Categories
  const categories = [
    { id: 'all', name: t('directory.categories.all'), emoji: '🏪' },
    { id: 'restaurants', name: t('directory.categories.restaurants'), emoji: '🍽️' },
    { id: 'services', name: t('directory.categories.services'), emoji: '🔧' },
    { id: 'professional', name: t('directory.categories.professional'), emoji: '💼' },
    { id: 'beauty_wellness', name: t('directory.categories.health'), emoji: '💆‍♀️' },
    { id: 'retail', name: t('directory.categories.retail'), emoji: '🛍️' },
    { id: 'cultural_services', name: t('directory.categories.cultural'), emoji: '🎭' },
    { id: 'import_export', name: t('directory.categories.import'), emoji: '🌍' }
  ];

  useEffect(() => {
    fetchBusinesses();
    getUserLocation();
  }, []);

  const fetchBusinesses = async () => {
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
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      Alert.alert(t('common.error'), t('errors.network'));
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = async () => {
    // Implement location fetching
    // This would typically use expo-location
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderBusinessCard = ({ item: business }: { item: Business }) => (
    <TouchableOpacity
      style={styles.businessCard}
      onPress={() => navigation.navigate('BusinessDetails', { businessId: business.id })}
    >
      {/* Business Image */}
      {business.photos && business.photos.length > 0 ? (
        <Image source={{ uri: business.photos[0] }} style={styles.businessImage} />
      ) : (
        <View style={[styles.businessImage, styles.placeholderImage]}>
          <Ionicons name="business" size={32} color={Colors.textSecondary} />
        </View>
      )}

      <View style={styles.businessInfo}>
        <View style={styles.businessHeader}>
          <Text style={styles.businessName} numberOfLines={1}>{business.name}</Text>
          <View style={styles.badges}>
            {business.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              </View>
            )}
            {business.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={14} color={Colors.warning} />
              </View>
            )}
          </View>
        </View>

        <Text style={styles.businessCategory}>{business.subcategory}</Text>
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
                <Text style={styles.culturalTagText}>{offering}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategoryChip = ({ item: category }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === category.id && styles.selectedCategoryChip
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={styles.categoryEmoji}>{category.emoji}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category.id && styles.selectedCategoryText
        ]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMapView = () => (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 51.5074,
        longitude: -0.1278,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {filteredBusinesses
        .filter(business => business.coordinates)
        .map(business => (
        <Marker
          key={business.id}
          coordinate={business.coordinates!}
          title={business.name}
          description={business.subcategory}
          onPress={() => navigation.navigate('BusinessDetails', { businessId: business.id })}
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
  );

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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{t('directory.title')}</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.viewToggleButton,
                viewMode === 'list' && styles.activeViewToggle
              ]}
              onPress={() => setViewMode('list')}
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
              onPress={() => setViewMode('map')}
            >
              <Ionicons
                name="map"
                size={20}
                color={viewMode === 'map' ? Colors.white : Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('directory.search_placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textSecondary}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategoryChip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />

        {/* Results Count */}
        <Text style={styles.resultsCount}>
          {filteredBusinesses.length} {t('directory.businesses_found')}
        </Text>
      </View>

      {/* Content */}
      {viewMode === 'list' ? (
        <FlatList
          data={filteredBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.businessList}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchBusinesses}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    marginBottom: 16,
  },
  title: {
    ...Typography.h1,
    color: Colors.primary,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 2,
  },
  viewToggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeViewToggle: {
    backgroundColor: Colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    ...Typography.body,
    color: Colors.text,
  },
  filterButton: {
    padding: 4,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    minWidth: 80,
  },
  selectedCategoryChip: {
    backgroundColor: Colors.primary,
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  selectedCategoryText: {
    color: Colors.white,
  },
  resultsCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  businessList: {
    padding: 16,
  },
  businessCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  businessImage: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.background,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessInfo: {
    padding: 16,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  businessName: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  premiumBadge: {
    marginLeft: 4,
  },
  businessCategory: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  businessDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  businessMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  priceRange: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  culturalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  culturalTag: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  culturalTagText: {
    ...Typography.caption,
    color: Colors.primary,
    fontSize: 11,
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
    padding: 8,
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
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 16,
  },
});