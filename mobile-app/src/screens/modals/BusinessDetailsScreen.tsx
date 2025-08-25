import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

interface BusinessDetails {
  id: string;
  name: string;
  namePortuguese?: string;
  category: string;
  subcategory: string;
  description: string;
  descriptionPortuguese: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  email: string;
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
  services: string[];
  servicesPortuguese: string[];
  paymentMethods: string[];
  languages: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  culturalConnection: string;
  ownerName: string;
  ownerCountry: string;
}

export default function BusinessDetailsScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { businessId } = route.params;
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllHours, setShowAllHours] = useState(false);

  useEffect(() => {
    fetchBusinessDetails();
  }, [businessId]);

  const fetchBusinessDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portuguese_businesses')
        .select('*')
        .eq('id', businessId)
        .single();

      if (error) throw error;
      setBusiness(data);
    } catch (error) {
      console.error('Error fetching business details:', error);
      Alert.alert(t('common.error'), t('errors.network'));
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (business?.phone) {
      Linking.openURL(`tel:${business.phone}`);
    }
  };

  const handleWebsite = () => {
    if (business?.website) {
      Linking.openURL(business.website);
    }
  };

  const handleDirections = () => {
    if (business?.coordinates) {
      const url = `https://maps.apple.com/?daddr=${business.coordinates.latitude},${business.coordinates.longitude}`;
      Linking.openURL(url);
    }
  };

  const handleShare = async () => {
    // Implement sharing functionality
    Alert.alert('Share', 'Sharing functionality coming soon!');
  };

  const handleBookService = () => {
    navigation.navigate('BookingScreen', { businessId: business?.id });
  };

  const getTodayHours = () => {
    if (!business?.openingHours) return null;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
    return business.openingHours[today] || 'Closed';
  };

  const isOpenNow = () => {
    const hours = getTodayHours();
    if (!hours || hours === 'Closed') return false;
    
    // Simple check - would need more sophisticated logic for actual implementation
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 9 && currentHour < 22; // Simplified check
  };

  if (loading) {
    return (
      <View style={CommonStyles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (!business) {
    return (
      <View style={CommonStyles.centerContainer}>
        <Text style={styles.errorText}>Business not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Images */}
      <View style={styles.imageContainer}>
        {business.photos && business.photos.length > 0 ? (
          <ScrollView 
            horizontal 
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
          >
            {business.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.businessImage} />
            ))}
          </ScrollView>
        ) : (
          <View style={[styles.businessImage, styles.placeholderImage]}>
            <Ionicons name="business" size={64} color={Colors.textSecondary} />
          </View>
        )}
        
        {/* Image indicators */}
        {business.photos && business.photos.length > 1 && (
          <View style={styles.imageIndicators}>
            {business.photos.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === activeImageIndex && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        )}

        {/* Back button */}
        <TouchableOpacity 
          style={styles.backButtonHeader}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Business Info */}
      <View style={styles.contentContainer}>
        {/* Header Info */}
        <View style={styles.businessHeader}>
          <View style={styles.businessTitleContainer}>
            <Text style={styles.businessName}>{business.name}</Text>
            <Text style={styles.businessCategory}>{business.subcategory}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: isOpenNow() ? Colors.success : Colors.error }]} />
              <Text style={[styles.statusText, { color: isOpenNow() ? Colors.success : Colors.error }]}>
                {isOpenNow() ? t('directory.business.open') : t('directory.business.closed')} • {getTodayHours()}
              </Text>
            </View>
          </View>
          
          <View style={styles.badges}>
            {business.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                <Text style={styles.badgeText}>{t('directory.business.verified')}</Text>
              </View>
            )}
            {business.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={18} color={Colors.warning} />
                <Text style={styles.badgeText}>Premium</Text>
              </View>
            )}
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.floor(business.rating) ? "star" : "star-outline"}
                size={16}
                color={Colors.warning}
              />
            ))}
            <Text style={styles.ratingText}>
              {business.rating.toFixed(1)} ({business.reviewCount} reviews)
            </Text>
          </View>
          <Text style={styles.priceRange}>{business.priceRange}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>{t('directory.business.call')}</Text>
          </TouchableOpacity>
          
          {business.website && (
            <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
              <Ionicons name="globe-outline" size={20} color={Colors.primary} />
              <Text style={styles.actionButtonText}>{t('directory.business.website')}</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
            <Ionicons name="navigate-outline" size={20} color={Colors.primary} />
            <Text style={styles.actionButtonText}>{t('directory.business.directions')}</Text>
          </TouchableOpacity>
        </View>

        {/* Book Service Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBookService}>
          <Text style={styles.bookButtonText}>Book Service</Text>
        </TouchableOpacity>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('directory.business.about')}</Text>
          <Text style={styles.description}>{business.description}</Text>
          
          {business.culturalConnection && (
            <View style={styles.culturalConnection}>
              <Ionicons name="heart" size={16} color={Colors.primary} />
              <Text style={styles.culturalConnectionText}>{business.culturalConnection}</Text>
            </View>
          )}
        </View>

        {/* Cultural Offerings */}
        {business.culturalOfferings && business.culturalOfferings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cultural Offerings</Text>
            <View style={styles.tagsContainer}>
              {business.culturalOfferings.map((offering, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{offering}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Services */}
        {business.services && business.services.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            {business.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Opening Hours */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowAllHours(!showAllHours)}
          >
            <Text style={styles.sectionTitle}>{t('directory.business.hours')}</Text>
            <Ionicons 
              name={showAllHours ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={Colors.textSecondary} 
            />
          </TouchableOpacity>
          
          <View style={styles.hoursContainer}>
            <Text style={styles.todayHours}>Today: {getTodayHours()}</Text>
            
            {showAllHours && (
              <View style={styles.allHours}>
                {Object.entries(business.openingHours).map(([day, hours]) => (
                  <View key={day} style={styles.hoursRow}>
                    <Text style={styles.dayText}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                    <Text style={styles.hoursText}>{hours}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('directory.business.contact')}</Text>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>{business.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>{business.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.contactText}>
              {business.address}, {business.city}, {business.postcode}
            </Text>
          </View>
        </View>

        {/* Map */}
        {business.coordinates && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  ...business.coordinates,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={business.coordinates}
                  title={business.name}
                  description={business.address}
                />
              </MapView>
              <TouchableOpacity style={styles.mapOverlay} onPress={handleDirections}>
                <Text style={styles.mapOverlayText}>Tap for directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Payment Methods */}
        {business.paymentMethods && business.paymentMethods.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <View style={styles.tagsContainer}>
              {business.paymentMethods.map((method, index) => (
                <View key={index} style={styles.paymentTag}>
                  <Text style={styles.paymentTagText}>{method}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {business.languages && business.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages Spoken</Text>
            <View style={styles.tagsContainer}>
              {business.languages.map((language, index) => (
                <View key={index} style={styles.languageTag}>
                  <Text style={styles.languageTagText}>{language}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Social Media */}
        {business.socialMedia && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.socialContainer}>
              {business.socialMedia.instagram && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL(business.socialMedia.instagram)}
                >
                  <Ionicons name="logo-instagram" size={24} color={Colors.primary} />
                </TouchableOpacity>
              )}
              {business.socialMedia.facebook && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL(business.socialMedia.facebook)}
                >
                  <Ionicons name="logo-facebook" size={24} color={Colors.primary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  businessImage: {
    width: width,
    height: 250,
  },
  placeholderImage: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    opacity: 0.5,
    marginHorizontal: 4,
  },
  activeIndicator: {
    opacity: 1,
  },
  backButtonHeader: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  shareButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    padding: 16,
  },
  businessHeader: {
    marginBottom: 16,
  },
  businessTitleContainer: {
    marginBottom: 8,
  },
  businessName: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: 4,
  },
  businessCategory: {
    ...Typography.body,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.text,
    marginLeft: 4,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  priceRange: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionButtonText: {
    ...Typography.caption,
    color: Colors.primary,
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  bookButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  culturalConnection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.primaryLight,
    padding: 12,
    borderRadius: 8,
  },
  culturalConnectionText: {
    ...Typography.body,
    color: Colors.primary,
    marginLeft: 8,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    ...Typography.caption,
    color: Colors.primary,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: 8,
  },
  hoursContainer: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 8,
  },
  todayHours: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: 8,
  },
  allHours: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  dayText: {
    ...Typography.body,
    color: Colors.text,
    textTransform: 'capitalize',
  },
  hoursText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    alignItems: 'center',
  },
  mapOverlayText: {
    color: Colors.white,
    ...Typography.caption,
  },
  paymentTag: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  paymentTagText: {
    ...Typography.caption,
    color: Colors.success,
  },
  languageTag: {
    backgroundColor: Colors.warningLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  languageTagText: {
    ...Typography.caption,
    color: Colors.warning,
  },
  socialContainer: {
    flexDirection: 'row',
  },
  socialButton: {
    padding: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 16,
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});