"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  HomeIcon,
  BuildingOfficeIcon,
  TrainIcon,
  TruckIcon,
  WalkIcon,
} from '@heroicons/react/24/outline';
import {
  MapPinIcon as MapPinSolid,
  HeartIcon as HeartSolid,
} from '@heroicons/react/24/solid';
import { advancedMatchingAlgorithms, type MatchingResult } from '@/services/AdvancedMatchingAlgorithms';
import type { CulturalDepthProfile } from './SaudadeMatchingSystem';

// Geographic Types
interface GeographicZone {
  id: string;
  name: string;
  namePortuguese: string;
  center: [number, number]; // [lat, lng]
  radius: number; // km
  description: string;
  descriptionPortuguese: string;
  culturalVenues: CulturalVenue[];
  transportHubs: string[];
  portugueseDensity: number; // per km²
  averageCompatibility: number;
  costOfLiving: 'low' | 'medium' | 'high' | 'very_high';
  safetyRating: number; // 1-10
  communityEvents: number; // events per month
  color: string;
}

interface CulturalVenue {
  name: string;
  namePortuguese: string;
  type: 'restaurant' | 'church' | 'community_center' | 'shop' | 'cultural_center' | 'school';
  address: string;
  rating: number;
  portugueseAuthenticity: number; // 1-10
}

interface TravelOption {
  mode: 'walking' | 'cycling' | 'bus' | 'underground' | 'train' | 'car';
  duration: number; // minutes
  cost: number; // pounds
  frequency?: number; // per hour for public transport
  accessibility: number; // 1-10
  comfort: number; // 1-10
}

interface GeographicMatch extends MatchingResult {
  location: {
    zone: string;
    distance: number;
    travelOptions: TravelOption[];
    estimatedMeetupTime: number;
    culturalVenuesNearby: CulturalVenue[];
    safetyScore: number;
  };
}

interface GeographicMatchingEngineProps {
  userProfile: CulturalDepthProfile;
  userLocation: [number, number];
  onMatchSelect: (match: GeographicMatch) => void;
  onLocationUpdate?: (location: [number, number]) => void;
  maxDistance?: number;
  preferredTransport?: ('walking' | 'cycling' | 'bus' | 'underground' | 'train' | 'car')[];
  showMap?: boolean;
}

// Lusophone community zones in London and UK
const portugueseZones: GeographicZone[] = [
  {
    id: 'stockwell_vauxhall',
    name: 'Stockwell & Vauxhall',
    namePortuguese: 'Stockwell e Vauxhall',
    center: [51.4886, -0.1234],
    radius: 3,
    description: 'Heart of Lusophone London community',
    descriptionPortuguese: 'Coração da comunidade portuguesa em Londres',
    culturalVenues: [
      {
        name: 'Lusophone Church of Our Lady of Fatima',
        namePortuguese: 'Igreja Portuguesa de Nossa Senhora de Fátima',
        type: 'church',
        address: 'Stockwell Road',
        rating: 4.8,
        portugueseAuthenticity: 10
      },
      {
        name: 'Casa do Bacalhau',
        namePortuguese: 'Casa do Bacalhau',
        type: 'restaurant',
        address: 'Stockwell Road',
        rating: 4.6,
        portugueseAuthenticity: 9
      },
      {
        name: 'Lusophone Centre',
        namePortuguese: 'Centro Português',
        type: 'community_center',
        address: 'South Lambeth Road',
        rating: 4.5,
        portugueseAuthenticity: 10
      }
    ],
    transportHubs: ['Stockwell Underground', 'Vauxhall Station', 'Nine Elms'],
    portugueseDensity: 28.5,
    averageCompatibility: 85,
    costOfLiving: 'high',
    safetyRating: 7.5,
    communityEvents: 8,
    color: '#10B981'
  },
  {
    id: 'camden_kentish_town',
    name: 'Camden & Kentish Town',
    namePortuguese: 'Camden e Kentish Town',
    center: [51.5373, -0.1457],
    radius: 4,
    description: 'Creative Lusophone community with cultural venues',
    descriptionPortuguese: 'Comunidade portuguesa criativa com espaços culturais',
    culturalVenues: [
      {
        name: 'Cafe Oporto',
        namePortuguese: 'Café Oporto',
        type: 'restaurant',
        address: 'Camden High Street',
        rating: 4.3,
        portugueseAuthenticity: 8
      },
      {
        name: 'Lusophone Language School',
        namePortuguese: 'Escola de Língua Portuguesa',
        type: 'school',
        address: 'Kentish Town Road',
        rating: 4.7,
        portugueseAuthenticity: 10
      }
    ],
    transportHubs: ['Camden Town', 'Kentish Town', 'Chalk Farm'],
    portugueseDensity: 15.2,
    averageCompatibility: 78,
    costOfLiving: 'very_high',
    safetyRating: 8.2,
    communityEvents: 6,
    color: '#8B5CF6'
  },
  {
    id: 'east_london',
    name: 'East London (Newham & Tower Hamlets)',
    namePortuguese: 'East London (Newham e Tower Hamlets)',
    center: [51.5254, 0.0356],
    radius: 8,
    description: 'Growing Lusophone community with good transport links',
    descriptionPortuguese: 'Comunidade portuguesa crescente com boas ligações de transporte',
    culturalVenues: [
      {
        name: 'Casa Portugal',
        namePortuguese: 'Casa Portugal',
        type: 'restaurant',
        address: 'Mile End Road',
        rating: 4.2,
        portugueseAuthenticity: 8
      },
      {
        name: 'Lusophone Community Association East',
        namePortuguese: 'Associação Comunitária Portuguesa Este',
        type: 'community_center',
        address: 'Stratford',
        rating: 4.4,
        portugueseAuthenticity: 9
      }
    ],
    transportHubs: ['Stratford', 'Canary Wharf', 'Mile End', 'Bethnal Green'],
    portugueseDensity: 8.7,
    averageCompatibility: 72,
    costOfLiving: 'medium',
    safetyRating: 7.8,
    communityEvents: 4,
    color: '#F59E0B'
  },
  {
    id: 'west_london',
    name: 'West London (Hammersmith & Ealing)',
    namePortuguese: 'West London (Hammersmith e Ealing)',
    center: [51.4927, -0.2353],
    radius: 6,
    description: 'Family-oriented Lusophone community',
    descriptionPortuguese: 'Comunidade portuguesa orientada para famílias',
    culturalVenues: [
      {
        name: 'Lusophone Family Centre',
        namePortuguese: 'Centro Familiar Português',
        type: 'community_center',
        address: 'Hammersmith',
        rating: 4.5,
        portugueseAuthenticity: 9
      },
      {
        name: 'Tasca do João',
        namePortuguese: 'Tasca do João',
        type: 'restaurant',
        address: 'Ealing Broadway',
        rating: 4.4,
        portugueseAuthenticity: 8
      }
    ],
    transportHubs: ['Hammersmith', 'Ealing Broadway', 'Acton Town'],
    portugueseDensity: 12.3,
    averageCompatibility: 80,
    costOfLiving: 'high',
    safetyRating: 8.5,
    communityEvents: 5,
    color: '#3B82F6'
  },
  {
    id: 'south_london',
    name: 'South London (Croydon & Wimbledon)',
    namePortuguese: 'South London (Croydon e Wimbledon)',
    center: [51.3762, -0.0982],
    radius: 10,
    description: 'Suburban Lusophone families and professionals',
    descriptionPortuguese: 'Famílias e profissionais portugueses suburbanos',
    culturalVenues: [
      {
        name: 'Lusophone Club Croydon',
        namePortuguese: 'Clube Português Croydon',
        type: 'community_center',
        address: 'Croydon High Street',
        rating: 4.3,
        portugueseAuthenticity: 8
      }
    ],
    transportHubs: ['East Croydon', 'Wimbledon', 'Clapham Junction'],
    portugueseDensity: 6.8,
    averageCompatibility: 75,
    costOfLiving: 'medium',
    safetyRating: 8.0,
    communityEvents: 3,
    color: '#EF4444'
  }
];

export default function GeographicMatchingEngine({
  userProfile,
  userLocation,
  onMatchSelect,
  onLocationUpdate,
  maxDistance = 25,
  preferredTransport = ['underground', 'bus', 'walking'],
  showMap = true,
}: GeographicMatchingEngineProps) {
  const { language } = useLanguage();
  const [geographicMatches, setGeographicMatches] = useState<GeographicMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(maxDistance);
  const [transportFilter, setTransportFilter] = useState<string[]>(preferredTransport);
  const [showFilters, setShowFilters] = useState(false);

  // Find user's current zone
  const userZone = useMemo(() => {
    return portugueseZones.find(zone => {
      const distance = calculateDistance(userLocation, zone.center);
      return distance <= zone.radius;
    }) || portugueseZones[0]; // Default to Stockwell if no zone found
  }, [userLocation]);

  useEffect(() => {
    findGeographicMatches();
  }, [userLocation, distanceFilter, transportFilter]);

  const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
    const R = 6371; // Earth's radius in kilometers
    
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
  };

  const calculateTravelOptions = (
    userLoc: [number, number],
    matchLoc: [number, number],
    distance: number
  ): TravelOption[] => {
    const options: TravelOption[] = [];

    // Walking (up to 3km)
    if (distance <= 3 && transportFilter.includes('walking')) {
      options.push({
        mode: 'walking',
        duration: Math.ceil(distance * 12), // 12 min/km
        cost: 0,
        accessibility: 9,
        comfort: 7
      });
    }

    // Cycling (up to 8km)
    if (distance <= 8 && transportFilter.includes('cycling')) {
      options.push({
        mode: 'cycling',
        duration: Math.ceil(distance * 4), // 4 min/km
        cost: 0,
        accessibility: 7,
        comfort: 6
      });
    }

    // Underground
    if (transportFilter.includes('underground')) {
      options.push({
        mode: 'underground',
        duration: Math.ceil(distance * 2.5 + 15), // 2.5 min/km + 15 min overhead
        cost: 2.8,
        frequency: 12, // trains per hour
        accessibility: 8,
        comfort: 8
      });
    }

    // Bus
    if (transportFilter.includes('bus')) {
      options.push({
        mode: 'bus',
        duration: Math.ceil(distance * 4 + 10), // 4 min/km + 10 min overhead
        cost: 1.75,
        frequency: 8, // buses per hour
        accessibility: 9,
        comfort: 6
      });
    }

    // Train (for longer distances)
    if (distance > 10 && transportFilter.includes('train')) {
      options.push({
        mode: 'train',
        duration: Math.ceil(distance * 2 + 20), // 2 min/km + 20 min overhead
        cost: 5.5,
        frequency: 4, // trains per hour
        accessibility: 7,
        comfort: 9
      });
    }

    // Car (always available)
    if (transportFilter.includes('car')) {
      options.push({
        mode: 'car',
        duration: Math.ceil(distance * 3 + 10), // 3 min/km + parking/traffic
        cost: distance * 0.8 + 5, // fuel + parking
        accessibility: 10,
        comfort: 9
      });
    }

    return options.sort((a, b) => a.duration - b.duration);
  };

  const findNearbyVenues = (location: [number, number], maxDist: number = 2): CulturalVenue[] => {
    const nearbyVenues: CulturalVenue[] = [];
    
    for (const zone of portugueseZones) {
      const distance = calculateDistance(location, zone.center);
      if (distance <= maxDist) {
        nearbyVenues.push(...zone.culturalVenues);
      }
    }
    
    return nearbyVenues.sort((a, b) => b.portugueseAuthenticity - a.portugueseAuthenticity).slice(0, 5);
  };

  const findGeographicMatches = async () => {
    setLoading(true);
    try {
      // Get base matches from advanced algorithm
      const baseMatches = await advancedMatchingAlgorithms.findAdvancedMatches(
        'current-user', // Would be actual user ID
        {
          maxResults: 50,
          focusAreas: ['geographic', 'cultural'],
          customWeights: {
            distanceFactors: {
              maxDistance: distanceFilter,
              distanceDecayRate: 0.8,
              transportAccessibility: 0.4
            }
          }
        }
      );

      // Enhance with geographic data
      const geoMatches: GeographicMatch[] = baseMatches.map(match => {
        // Simulate match location (would come from database)
        const matchLocation: [number, number] = [
          userLocation[0] + (Math.random() - 0.5) * 0.1,
          userLocation[1] + (Math.random() - 0.5) * 0.1
        ];

        const distance = calculateDistance(userLocation, matchLocation);
        const travelOptions = calculateTravelOptions(userLocation, matchLocation, distance);
        const nearbyVenues = findNearbyVenues(matchLocation);
        const matchZone = portugueseZones.find(zone => 
          calculateDistance(matchLocation, zone.center) <= zone.radius
        ) || portugueseZones[0];

        return {
          ...match,
          location: {
            zone: matchZone.name,
            distance: Math.round(distance * 10) / 10,
            travelOptions,
            estimatedMeetupTime: Math.min(...travelOptions.map(opt => opt.duration)),
            culturalVenuesNearby: nearbyVenues,
            safetyScore: matchZone.safetyRating
          }
        };
      });

      // Filter by distance and sort by travel convenience
      const filteredMatches = geoMatches
        .filter(match => match.location.distance <= distanceFilter)
        .sort((a, b) => {
          const scoreA = a.compatibilityScore * 0.6 + (100 - a.location.estimatedMeetupTime) * 0.4;
          const scoreB = b.compatibilityScore * 0.6 + (100 - b.location.estimatedMeetupTime) * 0.4;
          return scoreB - scoreA;
        });

      setGeographicMatches(filteredMatches);
    } catch (error) {
      console.error('[Geographic Matching] Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'walking': return <WalkIcon className="w-4 h-4" />;
      case 'cycling': return <TruckIcon className="w-4 h-4" />; // Use as cycle icon
      case 'underground': return <TrainIcon className="w-4 h-4" />;
      case 'bus': return <TruckIcon className="w-4 h-4" />;
      case 'train': return <TrainIcon className="w-4 h-4" />;
      case 'car': return <TruckIcon className="w-4 h-4" />;
      default: return <MapPinIcon className="w-4 h-4" />;
    }
  };

  const getTransportColor = (mode: string) => {
    switch (mode) {
      case 'walking': return 'text-green-600 bg-green-50';
      case 'cycling': return 'text-blue-600 bg-blue-50';
      case 'underground': return 'text-red-600 bg-red-50';
      case 'bus': return 'text-orange-600 bg-orange-50';
      case 'train': return 'text-purple-600 bg-purple-50';
      case 'car': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Geographic Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <GlobeAltIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'pt' ? 'Matches por Localização' : 'Location-Based Matches'}
              </h2>
              <p className="text-sm text-gray-600">
                {language === 'pt' 
                  ? `${geographicMatches.length} matches perto de ${userZone.namePortuguese}`
                  : `${geographicMatches.length} matches near ${userZone.name}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Current Location Info */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <MapPinSolid className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                {language === 'pt' ? 'A sua localização' : 'Your Location'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'pt' ? userZone.namePortuguese : userZone.name}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-blue-50 p-2 rounded">
              <div className="font-semibold text-blue-800">{userZone.portugueseDensity}/km²</div>
              <div className="text-blue-600">
                {language === 'pt' ? 'Densidade' : 'Density'}
              </div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="font-semibold text-green-800">{userZone.averageCompatibility}%</div>
              <div className="text-green-600">
                {language === 'pt' ? 'Compatibilidade' : 'Compatibility'}
              </div>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <div className="font-semibold text-yellow-800">{userZone.safetyRating}/10</div>
              <div className="text-yellow-600">
                {language === 'pt' ? 'Segurança' : 'Safety'}
              </div>
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <div className="font-semibold text-purple-800">{userZone.communityEvents}/mês</div>
              <div className="text-purple-600">
                {language === 'pt' ? 'Eventos' : 'Events'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Filtros Geográficos' : 'Geographic Filters'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Distance Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? `Distância Máxima: ${distanceFilter}km` : `Max Distance: ${distanceFilter}km`}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1km</span>
                  <span>50km</span>
                </div>
              </div>

              {/* Transport Modes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? 'Meios de Transporte' : 'Transport Modes'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['walking', 'cycling', 'bus', 'underground', 'train', 'car'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={transportFilter.includes(mode)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTransportFilter([...transportFilter, mode]);
                          } else {
                            setTransportFilter(transportFilter.filter(m => m !== mode));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="capitalize">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zone Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'pt' ? 'Explorar Zonas Portuguesas' : 'Explore Lusophone Zones'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portugueseZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                selectedZone === zone.id
                  ? `border-blue-500 bg-blue-50`
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: zone.color }}
                />
                <h4 className="font-semibold text-gray-900">
                  {language === 'pt' ? zone.namePortuguese : zone.name}
                </h4>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {language === 'pt' ? zone.descriptionPortuguese : zone.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-semibold">{zone.portugueseDensity}/km²</div>
                  <div className="text-gray-500">
                    {language === 'pt' ? 'Densidade' : 'Density'}
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-semibold">{zone.communityEvents}</div>
                  <div className="text-gray-500">
                    {language === 'pt' ? 'Eventos/mês' : 'Events/mo'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Geographic Matches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'pt' ? 'Matches por Proximidade' : 'Proximity Matches'}
          </h3>
          
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
              {language === 'pt' ? 'A procurar...' : 'Searching...'}
            </div>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {geographicMatches.length === 0 && !loading ? (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {language === 'pt' ? 'Nenhum match próximo encontrado' : 'No nearby matches found'}
              </h3>
              <p className="text-gray-500 mb-4">
                {language === 'pt' 
                  ? 'Tente aumentar a distância máxima ou alterar os filtros de transporte'
                  : 'Try increasing the max distance or changing transport filters'}
              </p>
              <button
                onClick={() => setDistanceFilter(Math.min(50, distanceFilter + 10))}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {language === 'pt' ? 'Expandir Pesquisa' : 'Expand Search'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {geographicMatches.map((match, index) => (
                <motion.div
                  key={match.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  {/* Match Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {match.userId.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          User {match.userId.slice(-4)}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPinIcon className="w-3 h-3" />
                          <span>{match.location.zone}</span>
                          <span>•</span>
                          <span>{match.location.distance}km away</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {match.compatibilityScore}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'pt' ? 'compatibilidade' : 'compatibility'}
                      </div>
                    </div>
                  </div>

                  {/* Travel Options */}
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      {language === 'pt' ? 'Opções de Viagem' : 'Travel Options'}
                    </h5>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {match.location.travelOptions.slice(0, 4).map((option, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded-lg ${getTransportColor(option.mode)}`}
                        >
                          {getTransportIcon(option.mode)}
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {formatDuration(option.duration)}
                            </div>
                            <div className="text-xs opacity-80">
                              £{option.cost.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Venues Nearby */}
                  {match.location.culturalVenuesNearby.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        {language === 'pt' ? 'Locais Culturais Próximos' : 'Nearby Cultural Venues'}
                      </h5>
                      
                      <div className="space-y-2">
                        {match.location.culturalVenuesNearby.slice(0, 2).map((venue, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {language === 'pt' ? venue.namePortuguese : venue.name}
                              </div>
                              <div className="text-xs text-gray-600 capitalize">
                                {venue.type.replace('_', ' ')}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-semibold text-orange-600">
                                {venue.portugueseAuthenticity}/10
                              </div>
                              <div className="text-xs text-gray-500">authentic</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Safety & Convenience Score */}
                  <div className="mb-4 bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">
                          {language === 'pt' ? 'Zona Segura' : 'Safe Area'}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-green-600">
                        {match.location.safetyScore}/10
                      </div>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      {language === 'pt' 
                        ? `Tempo estimado de encontro: ${formatDuration(match.location.estimatedMeetupTime)}`
                        : `Estimated meetup time: ${formatDuration(match.location.estimatedMeetupTime)}`}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onMatchSelect(match)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-green-700 transition-all"
                    >
                      {language === 'pt' ? 'Ver Perfil' : 'View Profile'}
                    </button>
                    <button
                      className="px-3 py-2 border border-blue-300 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                    >
                      {language === 'pt' ? 'Sugerir Local' : 'Suggest Venue'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}