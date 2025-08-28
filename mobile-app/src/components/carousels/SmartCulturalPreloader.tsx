import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';
import { PORTUGUESE_COLORS } from '../../config';

/**
 * Cultural Heritage Preferences for Portuguese-speaking communities
 */
export interface CulturalHeritageProfile {
  primaryHeritage: 'Portuguese' | 'Brazilian' | 'CapeVerdean' | 'Angolan' | 'Mozambican' | 'GuineaBissau' | 'SaoTome' | 'EastTimor';
  secondaryHeritages: string[];
  culturalInterests: ('music' | 'cuisine' | 'festivals' | 'traditions' | 'business' | 'sports' | 'art')[];
  languagePreference: 'pt' | 'en' | 'both';
  generationInUK: '1st' | '2nd' | '3rd' | 'student' | 'recent';
  communityEngagement: 'high' | 'medium' | 'low' | 'exploring';
  lastUpdated: string;
}

/**
 * London Portuguese Community Hotspots
 */
export interface CommunityHotspot {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in meters
  primaryCommunity: string;
  businessTypes: string[];
  eventFrequency: 'high' | 'medium' | 'low';
  culturalRelevance: number; // 1-10 scale
  isActive: boolean;
}

/**
 * Preloading Cache Entry
 */
export interface PreloadCacheEntry {
  id: string;
  content: any;
  culturalRelevance: number;
  location?: string;
  timestamp: number;
  accessCount: number;
  priority: 'high' | 'medium' | 'low';
  expiresAt: number;
}

/**
 * London Portuguese community hotspots data
 */
const LONDON_PORTUGUESE_HOTSPOTS: CommunityHotspot[] = [
  {
    id: 'south-lambeth',
    name: 'South Lambeth Portuguese Quarter',
    coordinates: { latitude: 51.4838, longitude: -0.1151 },
    radius: 1500,
    primaryCommunity: 'Portuguese',
    businessTypes: ['restaurants', 'bakeries', 'services', 'cultural_centers'],
    eventFrequency: 'high',
    culturalRelevance: 9,
    isActive: true,
  },
  {
    id: 'stockwell',
    name: 'Stockwell Portuguese Community',
    coordinates: { latitude: 51.4721, longitude: -0.1211 },
    radius: 1200,
    primaryCommunity: 'Portuguese',
    businessTypes: ['restaurants', 'shops', 'services'],
    eventFrequency: 'high',
    culturalRelevance: 8,
    isActive: true,
  },
  {
    id: 'east-london-brazilian',
    name: 'East London Brazilian Community',
    coordinates: { latitude: 51.5462, longitude: -0.0571 },
    radius: 2000,
    primaryCommunity: 'Brazilian',
    businessTypes: ['restaurants', 'capoeira_schools', 'music_venues'],
    eventFrequency: 'medium',
    culturalRelevance: 7,
    isActive: true,
  },
  {
    id: 'brixton-cape-verdean',
    name: 'Brixton Cape Verdean Quarter',
    coordinates: { latitude: 51.4618, longitude: -0.1151 },
    radius: 1000,
    primaryCommunity: 'CapeVerdean',
    businessTypes: ['restaurants', 'music_venues', 'cultural_centers'],
    eventFrequency: 'medium',
    culturalRelevance: 8,
    isActive: true,
  },
  {
    id: 'north-london-angolan',
    name: 'North London Angolan Community',
    coordinates: { latitude: 51.5830, longitude: -0.1400 },
    radius: 1500,
    primaryCommunity: 'Angolan',
    businessTypes: ['restaurants', 'shops', 'services'],
    eventFrequency: 'medium',
    culturalRelevance: 7,
    isActive: true,
  },
];

/**
 * Smart Cultural Content Preloader Hook
 */
export function useSmartCulturalPreloader() {
  const { i18n } = useTranslation();
  const [culturalProfile, setCulturalProfile] = useState<CulturalHeritageProfile | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [nearbyHotspots, setNearbyHotspots] = useState<CommunityHotspot[]>([]);
  const [preloadCache, setPreloadCache] = useState<Map<string, PreloadCacheEntry>>(new Map());
  const [isPreloading, setIsPreloading] = useState(false);

  // Load cultural heritage profile on mount
  useEffect(() => {
    loadCulturalProfile();
    getCurrentLocation();
  }, []);

  /**
   * Task 1: Cultural heritage preference detection
   */
  const loadCulturalProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('@cultural_heritage_profile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setCulturalProfile(profile);
      } else {
        // Create default profile based on app language
        await detectInitialCulturalProfile();
      }
    } catch (error) {
      console.error('Error loading cultural profile:', error);
    }
  };

  const detectInitialCulturalProfile = async () => {
    const defaultProfile: CulturalHeritageProfile = {
      primaryHeritage: 'Portuguese',
      secondaryHeritages: [],
      culturalInterests: ['festivals', 'cuisine', 'business'],
      languagePreference: i18n.language as 'pt' | 'en' | 'both',
      generationInUK: 'exploring',
      communityEngagement: 'medium',
      lastUpdated: new Date().toISOString(),
    };

    await saveCulturalProfile(defaultProfile);
  };

  const updateCulturalProfile = async (updates: Partial<CulturalHeritageProfile>) => {
    if (!culturalProfile) return;

    const updatedProfile = {
      ...culturalProfile,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    await saveCulturalProfile(updatedProfile);
  };

  const saveCulturalProfile = async (profile: CulturalHeritageProfile) => {
    try {
      await AsyncStorage.setItem('@cultural_heritage_profile', JSON.stringify(profile));
      setCulturalProfile(profile);
    } catch (error) {
      console.error('Error saving cultural profile:', error);
    }
  };

  /**
   * Task 2: Location-based caching for London Portuguese community hotspots
   */
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setCurrentLocation(location);
      await findNearbyHotspots(location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const findNearbyHotspots = async (location: Location.LocationObject) => {
    const nearby = LONDON_PORTUGUESE_HOTSPOTS.filter(hotspot => {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        hotspot.coordinates.latitude,
        hotspot.coordinates.longitude
      );
      return distance <= hotspot.radius;
    });

    setNearbyHotspots(nearby);

    // Trigger preloading for nearby hotspots
    if (nearby.length > 0) {
      await preloadContentForHotspots(nearby);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  /**
   * Task 3: Intelligent preloading based on user cultural background
   */
  const preloadContentForHotspots = async (hotspots: CommunityHotspot[]) => {
    if (!culturalProfile || isPreloading) return;

    setIsPreloading(true);

    try {
      for (const hotspot of hotspots) {
        const relevanceScore = calculateCulturalRelevance(hotspot, culturalProfile);
        
        if (relevanceScore >= 6) { // Only preload highly relevant content
          await preloadHotspotContent(hotspot, relevanceScore);
        }
      }
    } catch (error) {
      console.error('Error preloading content:', error);
    } finally {
      setIsPreloading(false);
    }
  };

  const calculateCulturalRelevance = (hotspot: CommunityHotspot, profile: CulturalHeritageProfile): number => {
    let score = hotspot.culturalRelevance;

    // Boost score for primary heritage match
    if (hotspot.primaryCommunity.toLowerCase() === profile.primaryHeritage.toLowerCase()) {
      score += 3;
    }

    // Boost score for secondary heritage matches
    if (profile.secondaryHeritages.some(heritage => 
      hotspot.primaryCommunity.toLowerCase().includes(heritage.toLowerCase())
    )) {
      score += 2;
    }

    // Adjust based on community engagement level
    if (profile.communityEngagement === 'high') {
      score += 1;
    } else if (profile.communityEngagement === 'low') {
      score -= 1;
    }

    // Boost for business interests
    if (profile.culturalInterests.includes('business') && 
        hotspot.businessTypes.some(type => type.includes('business') || type.includes('service'))) {
      score += 1;
    }

    return Math.min(score, 10); // Cap at 10
  };

  const preloadHotspotContent = async (hotspot: CommunityHotspot, relevanceScore: number) => {
    const cacheKey = `hotspot_${hotspot.id}_${culturalProfile?.primaryHeritage}`;
    
    // Check if already cached and not expired
    const existingEntry = preloadCache.get(cacheKey);
    if (existingEntry && existingEntry.expiresAt > Date.now()) {
      return;
    }

    // Simulate content preloading based on hotspot characteristics
    const content = await generateHotspotContent(hotspot);
    
    const cacheEntry: PreloadCacheEntry = {
      id: cacheKey,
      content,
      culturalRelevance: relevanceScore,
      location: hotspot.name,
      timestamp: Date.now(),
      accessCount: 0,
      priority: relevanceScore >= 8 ? 'high' : relevanceScore >= 6 ? 'medium' : 'low',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    setPreloadCache(prev => new Map(prev.set(cacheKey, cacheEntry)));
    
    // Store in AsyncStorage for persistence
    try {
      await AsyncStorage.setItem(`@preload_${cacheKey}`, JSON.stringify(cacheEntry));
    } catch (error) {
      console.error('Error storing preload cache:', error);
    }
  };

  const generateHotspotContent = async (hotspot: CommunityHotspot) => {
    // This would typically fetch from API, but for now we'll generate sample content
    return {
      businesses: hotspot.businessTypes.map((type, index) => ({
        id: `${hotspot.id}_business_${index}`,
        type,
        name: `${hotspot.primaryCommunity} ${type} ${index + 1}`,
        rating: 4 + Math.random(),
        distance: Math.random() * hotspot.radius,
      })),
      events: Array.from({ length: Math.random() * 5 + 1 }, (_, index) => ({
        id: `${hotspot.id}_event_${index}`,
        title: `${hotspot.primaryCommunity} Cultural Event ${index + 1}`,
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        location: hotspot.name,
      })),
      culturalInfo: {
        community: hotspot.primaryCommunity,
        specialties: hotspot.businessTypes,
        culturalRelevance: hotspot.culturalRelevance,
      },
    };
  };

  // Cleanup expired cache entries
  const cleanupExpiredCache = useCallback(async () => {
    const currentTime = Date.now();
    const expiredKeys: string[] = [];

    preloadCache.forEach((entry, key) => {
      if (entry.expiresAt < currentTime) {
        expiredKeys.push(key);
      }
    });

    if (expiredKeys.length > 0) {
      setPreloadCache(prev => {
        const newCache = new Map(prev);
        expiredKeys.forEach(key => {
          newCache.delete(key);
          AsyncStorage.removeItem(`@preload_${key}`);
        });
        return newCache;
      });
    }
  }, [preloadCache]);

  // Cleanup effect
  useEffect(() => {
    const cleanup = setInterval(cleanupExpiredCache, 60 * 60 * 1000); // Every hour
    return () => clearInterval(cleanup);
  }, [cleanupExpiredCache]);

  // Get preloaded content for carousel
  const getPreloadedContent = useCallback((category?: string) => {
    const relevantEntries = Array.from(preloadCache.values())
      .filter(entry => !category || entry.content.culturalInfo?.specialties?.includes(category))
      .sort((a, b) => b.culturalRelevance - a.culturalRelevance);

    return relevantEntries.map(entry => ({
      ...entry.content,
      preloadMetadata: {
        relevance: entry.culturalRelevance,
        location: entry.location,
        priority: entry.priority,
        cached: true,
      },
    }));
  }, [preloadCache]);

  const getLocationBasedRecommendations = useMemo(() => {
    if (!currentLocation || nearbyHotspots.length === 0) return [];

    return nearbyHotspots
      .filter(hotspot => hotspot.isActive)
      .sort((a, b) => {
        const distanceA = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          a.coordinates.latitude,
          a.coordinates.longitude
        );
        const distanceB = calculateDistance(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          b.coordinates.latitude,
          b.coordinates.longitude
        );
        return distanceA - distanceB;
      })
      .slice(0, 3); // Top 3 nearest hotspots
  }, [currentLocation, nearbyHotspots]);

  return {
    // Cultural Profile Management
    culturalProfile,
    updateCulturalProfile,
    
    // Location & Hotspots
    currentLocation,
    nearbyHotspots,
    locationBasedRecommendations: getLocationBasedRecommendations,
    
    // Preloading System
    isPreloading,
    preloadCache,
    getPreloadedContent,
    
    // Utility Functions
    refreshLocation: getCurrentLocation,
    clearCache: () => {
      setPreloadCache(new Map());
      AsyncStorage.getAllKeys().then(keys => {
        const preloadKeys = keys.filter(key => key.startsWith('@preload_'));
        AsyncStorage.multiRemove(preloadKeys);
      });
    },
  };
}

/**
 * Smart Cultural Preloader Component
 */
interface SmartCulturalPreloaderProps {
  children: React.ReactNode;
  enableLocationServices?: boolean;
  preloadRadius?: number;
  culturalRelevanceThreshold?: number;
}

export default function SmartCulturalPreloader({
  children,
  enableLocationServices = true,
  preloadRadius = 2000,
  culturalRelevanceThreshold = 6,
}: SmartCulturalPreloaderProps) {
  const preloaderData = useSmartCulturalPreloader();

  useEffect(() => {
    // Initialize preloading system
    if (enableLocationServices) {
      preloaderData.refreshLocation();
    }
  }, [enableLocationServices]);

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Export types and utilities
 */
export type {
  CulturalHeritageProfile,
  CommunityHotspot,
  PreloadCacheEntry,
};

export { LONDON_PORTUGUESE_HOTSPOTS };