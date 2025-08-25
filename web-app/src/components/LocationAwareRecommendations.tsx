"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  EyeIcon,
  FireIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  TrainIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

// Portuguese Areas in London with Detailed Info
const PORTUGUESE_LONDON_AREAS = {
  'stockwell': {
    name: 'Stockwell',
    namePt: 'Stockwell',
    coordinates: { lat: 51.4720, lng: -0.1226 },
    description: 'Heart of London\'s Portuguese community',
    descriptionPt: 'Coração da comunidade portuguesa de Londres',
    characteristics: ['Little Portugal', 'Portuguese restaurants', 'Cultural center', 'Traditional bakeries'],
    travelTime: { tube: '15 min from Westminster', bus: '25 min from Central London' },
    popularVenues: ['Casa do Bacalhau', 'Estrela Bar', 'Portuguese Cultural Centre'],
    events: ['Fado nights', 'Santos Populares', 'Portuguese football viewing'],
  },
  'vauxhall': {
    name: 'Vauxhall',
    namePt: 'Vauxhall',
    coordinates: { lat: 51.4861, lng: -0.1253 },
    description: 'Vibrant Portuguese community hub',
    descriptionPt: 'Centro vibrante da comunidade portuguesa',
    characteristics: ['Portuguese businesses', 'Riverside location', 'Good transport links', 'Mixed community'],
    travelTime: { tube: '10 min from Westminster', bus: '20 min from City' },
    popularVenues: ['Vauxhall Portuguese Club', 'Riverside restaurants', 'Community center'],
    events: ['Business networking', 'Community meetings', 'Cultural events'],
  },
  'camden': {
    name: 'Camden',
    namePt: 'Camden',
    coordinates: { lat: 51.5392, lng: -0.1426 },
    description: 'Cultural and artistic Portuguese hub',
    descriptionPt: 'Centro cultural e artístico português',
    characteristics: ['Arts scene', 'Music venues', 'Markets', 'Young professionals'],
    travelTime: { tube: '8 min from King\'s Cross', bus: '15 min from Oxford Circus' },
    popularVenues: ['Camden Market', 'Music venues', 'Art galleries'],
    events: ['Fado concerts', 'Art exhibitions', 'Music festivals'],
  },
  'kensington': {
    name: 'Kensington',
    namePt: 'Kensington',
    coordinates: { lat: 51.5020, lng: -0.1948 },
    description: 'Premium Portuguese professional community',
    descriptionPt: 'Comunidade profissional portuguesa premium',
    characteristics: ['High-end area', 'Professional community', 'Museums', 'Parks'],
    travelTime: { tube: '20 min from City', bus: '30 min from Westminster' },
    popularVenues: ['Upscale restaurants', 'Museums', 'Hotels'],
    events: ['Business dinners', 'Cultural galas', 'Professional networking'],
  },
  'central-london': {
    name: 'Central London',
    namePt: 'Centro de Londres',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    description: 'Business and tourist Portuguese events',
    descriptionPt: 'Eventos portugueses de negócios e turismo',
    characteristics: ['Business district', 'Tourist attractions', 'Transport hub', 'International community'],
    travelTime: { tube: 'Central location', bus: 'All areas accessible' },
    popularVenues: ['Business centers', 'Hotels', 'Restaurants', 'Cultural venues'],
    events: ['Conference events', 'Business meetings', 'Cultural showcases'],
  },
};

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface LocationAwareEvent {
  id: string;
  title: string;
  area: keyof typeof PORTUGUESE_LONDON_AREAS;
  distance?: number;
  travelTime?: string;
  popularity: number;
  attendees: number;
  category: string;
  startTime: string;
  venue: string;
}

interface LocationAwareRecommendationsProps {
  userLocation?: LocationData;
  onLocationRequest?: () => void;
  maxDistance?: number; // in km
  className?: string;
}

// Calculate distance between two points
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Estimate travel time
const estimateTravelTime = (distance: number): string => {
  const walkingSpeed = 5; // km/h
  const tubeSpeed = 25; // km/h average including stops
  const busSpeed = 15; // km/h average in London traffic

  if (distance < 1) {
    const walkTime = Math.round((distance / walkingSpeed) * 60);
    return `${walkTime} min walk`;
  } else if (distance < 5) {
    const tubeTime = Math.round((distance / tubeSpeed) * 60);
    return `${tubeTime} min by tube`;
  } else {
    const busTime = Math.round((distance / busSpeed) * 60);
    return `${busTime} min by bus`;
  }
};

export default function LocationAwareRecommendations({
  userLocation,
  onLocationRequest,
  maxDistance = 15,
  className = '',
}: LocationAwareRecommendationsProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [nearbyEvents, setNearbyEvents] = useState<LocationAwareEvent[]>([]);
  const [selectedArea, setSelectedArea] = useState<keyof typeof PORTUGUESE_LONDON_AREAS | null>(null);
  const [showAreaDetails, setShowAreaDetails] = useState(false);

  // Mock events data (in real app, this would come from API)
  const mockEvents: LocationAwareEvent[] = [
    {
      id: '1',
      title: 'Fado Night at Estrela Bar',
      area: 'stockwell',
      popularity: 85,
      attendees: 45,
      category: 'Cultural',
      startTime: '20:00',
      venue: 'Estrela Bar',
    },
    {
      id: '2',
      title: 'Portuguese Business Networking',
      area: 'central-london',
      popularity: 92,
      attendees: 67,
      category: 'Business',
      startTime: '18:30',
      venue: 'The Shard',
    },
    {
      id: '3',
      title: 'Kizomba Dance Class',
      area: 'vauxhall',
      popularity: 78,
      attendees: 32,
      category: 'Dance',
      startTime: '19:00',
      venue: 'Community Center',
    },
  ];

  // Request location permission
  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      alert(isPortuguese 
        ? 'Geolocalização não é suportada neste navegador'
        : 'Geolocation is not supported by this browser'
      );
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        });
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now(),
      };

      setLocationPermission('granted');
      if (onLocationRequest) {
        onLocationRequest();
      }

      // Calculate distances for events
      const eventsWithDistance = mockEvents.map(event => {
        const area = PORTUGUESE_LONDON_AREAS[event.area];
        const distance = calculateDistance(
          locationData.latitude,
          locationData.longitude,
          area.coordinates.lat,
          area.coordinates.lng
        );
        
        return {
          ...event,
          distance,
          travelTime: estimateTravelTime(distance),
        };
      }).filter(event => event.distance! <= maxDistance)
        .sort((a, b) => a.distance! - b.distance!);

      setNearbyEvents(eventsWithDistance);

    } catch (error) {
      console.error('Location error:', error);
      setLocationPermission('denied');
    }
  }, [isPortuguese, onLocationRequest, maxDistance]);

  // Auto-request location if available
  useEffect(() => {
    if (userLocation) {
      const eventsWithDistance = mockEvents.map(event => {
        const area = PORTUGUESE_LONDON_AREAS[event.area];
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          area.coordinates.lat,
          area.coordinates.lng
        );
        
        return {
          ...event,
          distance,
          travelTime: estimateTravelTime(distance),
        };
      }).filter(event => event.distance! <= maxDistance)
        .sort((a, b) => a.distance! - b.distance!);

      setNearbyEvents(eventsWithDistance);
      setLocationPermission('granted');
    }
  }, [userLocation, maxDistance]);

  return (
    <div className={`${className}`}>
      {/* Location Permission Request */}
      {locationPermission === 'prompt' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-50 to-red-50 rounded-2xl p-6 border border-green-200 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                {isPortuguese ? '📍 Eventos Próximos de Si' : '📍 Events Near You'}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {isPortuguese 
                  ? 'Permita a localização para descobrir eventos portugueses na sua área de Londres'
                  : 'Allow location access to discover Portuguese events in your London area'
                }
              </p>
              <button
                onClick={requestLocation}
                className="bg-gradient-to-r from-green-500 to-red-500 text-white px-6 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-200"
              >
                {isPortuguese ? 'Permitir Localização' : 'Allow Location'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Location Access Denied */}
      {locationPermission === 'denied' && (
        <div className="bg-gray-100 rounded-2xl p-6 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              {isPortuguese ? 'Localização Não Disponível' : 'Location Not Available'}
            </h3>
            <p className="text-sm text-gray-600">
              {isPortuguese 
                ? 'Explore eventos por área de Londres abaixo'
                : 'Explore events by London area below'
              }
            </p>
          </div>
        </div>
      )}

      {/* Nearby Events (Location Enabled) */}
      {locationPermission === 'granted' && nearbyEvents.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
              <FireIcon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {isPortuguese ? 'Eventos Próximos' : 'Nearby Events'}
            </h3>
            <span className="text-sm text-gray-600">
              {isPortuguese ? `${nearbyEvents.length} encontrados` : `${nearbyEvents.length} found`}
            </span>
          </div>

          <div className="space-y-4">
            {nearbyEvents.map((event) => {
              const area = PORTUGUESE_LONDON_AREAS[event.area];
              return (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <div className="text-right text-sm text-gray-600">
                          <div className="font-medium">
                            {event.distance ? `${event.distance.toFixed(1)} km` : '--'}
                          </div>
                          <div>{event.travelTime || '--'}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{area.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{event.startTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>{event.attendees} {isPortuguese ? 'confirmados' : 'attending'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                            {event.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600">
                              {event.popularity}%
                            </span>
                          </div>
                        </div>
                        <button className="text-sm font-medium text-green-600 hover:text-green-700">
                          {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Portuguese Areas Explorer */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
            <GlobeAltIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {isPortuguese ? 'Áreas Portuguesas de Londres' : 'Portuguese Areas of London'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(PORTUGUESE_LONDON_AREAS).map(([key, area]) => (
            <motion.button
              key={key}
              onClick={() => {
                setSelectedArea(key as keyof typeof PORTUGUESE_LONDON_AREAS);
                setShowAreaDetails(true);
              }}
              className="text-left bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-red-100 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{area.name}</h4>
                  <p className="text-sm text-gray-600">
                    {isPortuguese ? area.descriptionPt : area.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrainIcon className="w-4 h-4" />
                  <span>{area.travelTime.tube}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {area.characteristics.slice(0, 2).map((char) => (
                    <span
                      key={char}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Area Details Modal */}
      <AnimatePresence>
        {showAreaDetails && selectedArea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {selectedArea && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
                        <MapPinIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {PORTUGUESE_LONDON_AREAS[selectedArea].name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {isPortuguese 
                            ? PORTUGUESE_LONDON_AREAS[selectedArea].descriptionPt 
                            : PORTUGUESE_LONDON_AREAS[selectedArea].description
                          }
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAreaDetails(false)}
                      className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Characteristics */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {isPortuguese ? 'Características' : 'Characteristics'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {PORTUGUESE_LONDON_AREAS[selectedArea].characteristics.map((char) => (
                          <span
                            key={char}
                            className="px-3 py-2 bg-green-100 text-green-800 text-sm rounded-lg font-medium"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Popular Venues */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {isPortuguese ? 'Locais Populares' : 'Popular Venues'}
                      </h3>
                      <div className="space-y-2">
                        {PORTUGUESE_LONDON_AREAS[selectedArea].popularVenues.map((venue) => (
                          <div key={venue} className="flex items-center gap-2 text-sm text-gray-700">
                            <BuildingOffice2Icon className="w-4 h-4 text-gray-500" />
                            <span>{venue}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Types */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {isPortuguese ? 'Tipos de Eventos' : 'Event Types'}
                      </h3>
                      <div className="space-y-2">
                        {PORTUGUESE_LONDON_AREAS[selectedArea].events.map((event) => (
                          <div key={event} className="flex items-center gap-2 text-sm text-gray-700">
                            <SparklesIcon className="w-4 h-4 text-green-500" />
                            <span>{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Travel Info */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {isPortuguese ? 'Como Chegar' : 'Getting There'}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <TrainIcon className="w-4 h-4 text-blue-500" />
                          <span>{PORTUGUESE_LONDON_AREAS[selectedArea].travelTime.tube}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1V5a1 1 0 00-1-1H3z"/>
                          </svg>
                          <span>{PORTUGUESE_LONDON_AREAS[selectedArea].travelTime.bus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}