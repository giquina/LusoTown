'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  MapPin, 
  Navigation, 
  Compass,
  Map,
  Users,
  Store,
  Calendar,
  Coffee,
  Music,
  Camera,
  Heart,
  Clock,
  AlertCircle,
  Settings
} from 'lucide-react';

// Portuguese cultural locations in London
const PORTUGUESE_CULTURAL_SITES = [
  {
    id: 'casa-do-bacalhau',
    name: 'Casa do Bacalhau',
    namePortuguese: 'Casa do Bacalhau',
    type: 'restaurant',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    address: 'Sample Street, London',
    description: 'Traditional Portuguese restaurant',
    culturalSignificance: 'Authentic Portuguese cuisine in London'
  },
  {
    id: 'portuguese-church',
    name: 'Portuguese Catholic Church',
    namePortuguese: 'Igreja Católica Portuguesa',
    type: 'cultural',
    coordinates: { lat: 51.5155, lng: -0.1426 },
    address: 'Sample Road, London',
    description: 'Portuguese Catholic community center',
    culturalSignificance: 'Center of Portuguese Catholic community in London'
  },
  {
    id: 'fado-venue',
    name: 'London Fado House',
    namePortuguese: 'Casa de Fado de Londres',
    type: 'entertainment',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    address: 'Sample Avenue, London',
    description: 'Authentic fado performances',
    culturalSignificance: 'Traditional Portuguese fado music venue'
  }
];

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface PortugueseBusiness {
  id: string;
  name: string;
  namePortuguese?: string;
  type: 'restaurant' | 'services' | 'retail' | 'professional' | 'cultural' | 'entertainment';
  coordinates: { lat: number; lng: number };
  distance?: number;
  address: string;
  phone?: string;
  website?: string;
  verified: boolean;
  rating?: number;
  culturalAuthenticity?: number;
  specialties: string[];
}

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  distance?: number;
  online: boolean;
  interests: string[];
  region: 'portugal' | 'brazil' | 'angola' | 'mozambique' | 'cape-verde' | 'other';
}

interface CulturalEvent {
  id: string;
  title: string;
  titlePortuguese?: string;
  type: 'festa' | 'fado' | 'networking' | 'cultural' | 'food' | 'music' | 'dance';
  coordinates: { lat: number; lng: number };
  distance?: number;
  date: string;
  venue: string;
  description: string;
}

interface MobileGeolocationServicesProps {
  showMap?: boolean;
  showNearbyBusinesses?: boolean;
  showCommunityMembers?: boolean;
  showCulturalEvents?: boolean;
  className?: string;
}

export default function MobileGeolocationServices({
  showMap = true,
  showNearbyBusinesses = true,
  showCommunityMembers = true,
  showCulturalEvents = true,
  className = ''
}: MobileGeolocationServicesProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Location states
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Content states
  const [nearbyBusinesses, setNearbyBusinesses] = useState<PortugueseBusiness[]>([]);
  const [nearbyMembers, setNearbyMembers] = useState<CommunityMember[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<CulturalEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'businesses' | 'members' | 'events' | 'cultural'>('all');

  // Map states
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 }); // London center
  const [mapZoom, setMapZoom] = useState(12);
  const [showUserLocation, setShowUserLocation] = useState(true);

  // Watch position reference
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    checkLocationPermission();
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchNearbyContent();
      setMapCenter({ lat: currentLocation.latitude, lng: currentLocation.longitude });
    }
  }, [currentLocation]);

  const checkLocationPermission = async () => {
    if (!('geolocation' in navigator)) {
      setLocationError(language === 'pt' ? 'Geolocalização não suportada' : 'Geolocation not supported');
      return;
    }

    try {
      // Check if permission API is available
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(permission.state as 'granted' | 'denied' | 'prompt');
        
        permission.addEventListener('change', () => {
          setLocationPermission(permission.state as 'granted' | 'denied' | 'prompt');
        });

        if (permission.state === 'granted') {
          getCurrentLocation();
        }
      } else {
        // Fallback for browsers without permission API
        getCurrentLocation();
      }
    } catch (error) {
      console.error('[Geolocation] Permission check failed:', error);
    }
  };

  const getCurrentLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setLocationError(language === 'pt' ? 'Geolocalização não disponível' : 'Geolocation unavailable');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      };

      setCurrentLocation(locationData);
      setLocationPermission('granted');


      addNotification({
        id: 'location-success',
        type: 'success',
        title: language === 'pt' ? 'Localização Obtida!' : 'Location Found!',
        message: language === 'pt' 
          ? 'A descobrir comunidade portuguesa próxima' 
          : 'Discovering nearby Portuguese community',
        duration: 3000
      });

      // Start watching position for updates
      startLocationWatch();

    } catch (error: any) {
      console.error('[Geolocation] Location error:', error);
      
      let errorMessage = '';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = language === 'pt' ? 'Permissão negada' : 'Permission denied';
          setLocationPermission('denied');
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = language === 'pt' ? 'Localização indisponível' : 'Location unavailable';
          break;
        case error.TIMEOUT:
          errorMessage = language === 'pt' ? 'Tempo esgotado' : 'Location timeout';
          break;
        default:
          errorMessage = language === 'pt' ? 'Erro desconhecido' : 'Unknown error';
      }

      setLocationError(errorMessage);
      
      addNotification({
        id: 'location-error',
        type: 'error',
        title: language === 'pt' ? 'Erro de Localização' : 'Location Error',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setIsLoadingLocation(false);
    }
  }, [language]);

  const startLocationWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    const options = {
      enableHighAccuracy: false, // Lower accuracy for watching
      timeout: 30000,
      maximumAge: 600000 // 10 minutes
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };

        setCurrentLocation(locationData);
      },
      (error) => {
      },
      options
    );
  };

  const fetchNearbyContent = async () => {
    if (!currentLocation) return;

    try {
      // Fetch nearby Portuguese businesses
      if (showNearbyBusinesses) {
        const businessesResponse = await fetch(
          `/api/businesses/nearby?lat=${currentLocation.latitude}&lng=${currentLocation.longitude}&radius=5000&portuguese=true`
        );
        if (businessesResponse.ok) {
          const businesses = await businessesResponse.json();
          setNearbyBusinesses(businesses.map(calculateDistance));
        }
      }

      // Fetch nearby community members
      if (showCommunityMembers) {
        const membersResponse = await fetch(
          `/api/community/nearby?lat=${currentLocation.latitude}&lng=${currentLocation.longitude}&radius=2000`
        );
        if (membersResponse.ok) {
          const members = await membersResponse.json();
          setNearbyMembers(members.map(calculateDistance));
        }
      }

      // Fetch nearby cultural events
      if (showCulturalEvents) {
        const eventsResponse = await fetch(
          `/api/events/nearby?lat=${currentLocation.latitude}&lng=${currentLocation.longitude}&radius=10000&cultural=true`
        );
        if (eventsResponse.ok) {
          const events = await eventsResponse.json();
          setNearbyEvents(events.map(calculateDistance));
        }
      }

    } catch (error) {
      console.error('[Geolocation] Failed to fetch nearby content:', error);
    }
  };

  const calculateDistance = (item: any) => {
    if (!currentLocation) return item;

    const R = 6371e3; // Earth's radius in metres
    const φ1 = currentLocation.latitude * Math.PI / 180;
    const φ2 = item.coordinates.lat * Math.PI / 180;
    const Δφ = (item.coordinates.lat - currentLocation.latitude) * Math.PI / 180;
    const Δλ = (item.coordinates.lng - currentLocation.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // Distance in metres

    return { ...item, distance: Math.round(distance) };
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1000) {
      return `${distance}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  };

  const requestLocationPermission = async () => {
    await getCurrentLocation();
  };

  const openInMaps = (coordinates: { lat: number; lng: number }, name: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&destination_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  const findNearestPortugueseBusiness = (type?: string) => {
    let businesses = nearbyBusinesses;
    if (type) {
      businesses = businesses.filter(b => b.type === type);
    }
    return businesses.sort((a, b) => (a.distance || 0) - (b.distance || 0))[0];
  };

  const renderLocationPrompt = () => (
    <div className="bg-gradient-to-r from-red-50 to-green-50 border border-red-200 rounded-lg p-6">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-coral-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {language === 'pt' ? 'Descobrir Comunidade Portuguesa' : 'Discover Portuguese Community'}
        </h3>
        <p className="text-secondary-600 mb-4">
          {language === 'pt' 
            ? 'Permite acesso à localização para encontrares portugueses, negócios e eventos culturais próximos' 
            : 'Allow location access to find nearby Portuguese speakers, businesses, and cultural events'}
        </p>
        <button
          onClick={requestLocationPermission}
          disabled={isLoadingLocation}
          className="inline-flex items-center space-x-2 bg-coral-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isLoadingLocation ? (
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Navigation className="h-5 w-5" />
          )}
          <span>
            {isLoadingLocation 
              ? (language === 'pt' ? 'A obter localização...' : 'Getting location...')
              : (language === 'pt' ? 'Ativar Localização' : 'Enable Location')
            }
          </span>
        </button>
      </div>
    </div>
  );

  const renderLocationDenied = () => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-yellow-800">
            {language === 'pt' ? 'Localização Negada' : 'Location Denied'}
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            {language === 'pt' 
              ? 'Para descobrir a comunidade portuguesa próxima, ativa a localização nas definições do navegador'
              : 'To discover nearby Portuguese community, enable location in your browser settings'}
          </p>
          <button
            onClick={() => window.open('https://support.google.com/chrome/answer/142065', '_blank')}
            className="text-sm text-yellow-800 hover:text-yellow-900 font-medium mt-2"
          >
            {language === 'pt' ? 'Como ativar →' : 'How to enable →'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderNearbyBusinesses = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
        <Store className="h-5 w-5 text-coral-600" />
        <span>{language === 'pt' ? 'Negócios Portugueses' : 'Portuguese Businesses'}</span>
        <span className="text-sm text-gray-500 font-normal">({nearbyBusinesses.length})</span>
      </h3>

      {nearbyBusinesses.length === 0 ? (
        <p className="text-secondary-600 text-sm">
          {language === 'pt' ? 'Nenhum negócio português encontrado próximo' : 'No Portuguese businesses found nearby'}
        </p>
      ) : (
        <div className="space-y-3">
          {nearbyBusinesses.slice(0, 5).map((business) => (
            <div key={business.id} className="bg-white border border-secondary-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {business.type === 'restaurant' && <Coffee className="h-6 w-6 text-orange-600" />}
                  {business.type === 'services' && <Settings className="h-6 w-6 text-primary-600" />}
                  {business.type === 'cultural' && <Music className="h-6 w-6 text-accent-600" />}
                  {!['restaurant', 'services', 'cultural'].includes(business.type) && <Store className="h-6 w-6 text-secondary-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 truncate">
                        {language === 'pt' && business.namePortuguese ? business.namePortuguese : business.name}
                      </h4>
                      <p className="text-sm text-secondary-600 truncate">{business.address}</p>
                      {business.specialties.length > 0 && (
                        <p className="text-xs text-primary-600 mt-1">
                          {business.specialties.slice(0, 2).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {business.distance !== undefined && (
                        <span className="text-sm text-gray-500">{formatDistance(business.distance)}</span>
                      )}
                      {business.verified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          ✓ {language === 'pt' ? 'Verificado' : 'Verified'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      onClick={() => openInMaps(business.coordinates, business.name)}
                      className="flex items-center space-x-1 text-primary-600 hover:text-blue-800 text-sm"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>{language === 'pt' ? 'Direções' : 'Directions'}</span>
                    </button>
                    {business.phone && (
                      <a
                        href={`tel:${business.phone}`}
                        className="flex items-center space-x-1 text-action-600 hover:text-green-800 text-sm"
                      >
                        <span>{language === 'pt' ? 'Ligar' : 'Call'}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNearbyCommunity = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
        <Users className="h-5 w-5 text-action-600" />
        <span>{language === 'pt' ? 'Portugueses Próximos' : 'Nearby Portuguese Speakers'}</span>
        <span className="text-sm text-gray-500 font-normal">({nearbyMembers.length})</span>
      </h3>

      {nearbyMembers.length === 0 ? (
        <p className="text-secondary-600 text-sm">
          {language === 'pt' ? 'Nenhum português encontrado próximo' : 'No Portuguese speakers found nearby'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {nearbyMembers.slice(0, 6).map((member) => (
            <div key={member.id} className="bg-white border border-secondary-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {member.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-action-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{member.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {member.distance !== undefined && (
                      <span>{formatDistance(member.distance)}</span>
                    )}
                    <span className="text-xs">
                      {member.region === 'portugal' && '🇵🇹'}
                      {member.region === 'brazil' && '🇧🇷'}
                      {member.region === 'angola' && '🇦🇴'}
                      {member.region === 'mozambique' && '🇲🇿'}
                      {member.region === 'cape-verde' && '🇨🇻'}
                    </span>
                  </div>
                  {member.interests.length > 0 && (
                    <p className="text-xs text-primary-600 mt-1">
                      {member.interests.slice(0, 2).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNearbyEvents = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-accent-600" />
        <span>{language === 'pt' ? 'Eventos Culturais' : 'Cultural Events'}</span>
        <span className="text-sm text-gray-500 font-normal">({nearbyEvents.length})</span>
      </h3>

      {nearbyEvents.length === 0 ? (
        <p className="text-secondary-600 text-sm">
          {language === 'pt' ? 'Nenhum evento cultural encontrado próximo' : 'No cultural events found nearby'}
        </p>
      ) : (
        <div className="space-y-3">
          {nearbyEvents.slice(0, 4).map((event) => (
            <div key={event.id} className="bg-white border border-secondary-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {event.type === 'fado' && <Music className="h-6 w-6 text-accent-600" />}
                  {event.type === 'festa' && <Heart className="h-6 w-6 text-coral-600" />}
                  {event.type === 'food' && <Coffee className="h-6 w-6 text-orange-600" />}
                  {!['fado', 'festa', 'food'].includes(event.type) && <Calendar className="h-6 w-6 text-primary-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' && event.titlePortuguese ? event.titlePortuguese : event.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-secondary-600 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    {event.distance !== undefined && (
                      <>
                        <span>•</span>
                        <span>{formatDistance(event.distance)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-secondary-600 mt-1">{event.venue}</p>
                  <button
                    onClick={() => openInMaps(event.coordinates, event.title)}
                    className="flex items-center space-x-1 text-primary-600 hover:text-blue-800 text-sm mt-2"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>{language === 'pt' ? 'Ver no mapa' : 'View on map'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (locationPermission === 'denied') {
    return (
      <div className={`space-y-6 ${className}`}>
        {renderLocationDenied()}
      </div>
    );
  }

  if (!currentLocation) {
    return (
      <div className={`space-y-6 ${className}`}>
        {renderLocationPrompt()}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Location Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-green-800">
          <MapPin className="h-5 w-5" />
          <span className="font-medium">
            {language === 'pt' ? 'Localização Ativa' : 'Location Active'}
          </span>
          <span className="text-sm text-action-600">
            ({language === 'pt' ? 'Precisão' : 'Accuracy'}: {Math.round(currentLocation.accuracy)}m)
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: language === 'pt' ? 'Tudo' : 'All', icon: Map },
          { id: 'businesses', label: language === 'pt' ? 'Negócios' : 'Businesses', icon: Store },
          { id: 'members', label: language === 'pt' ? 'Pessoas' : 'People', icon: Users },
          { id: 'events', label: language === 'pt' ? 'Eventos' : 'Events', icon: Calendar },
          { id: 'cultural', label: language === 'pt' ? 'Cultural' : 'Cultural', icon: Compass }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === id
                ? 'bg-coral-600 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content based on category */}
      {(selectedCategory === 'all' || selectedCategory === 'businesses') && showNearbyBusinesses && renderNearbyBusinesses()}
      {(selectedCategory === 'all' || selectedCategory === 'members') && showCommunityMembers && renderNearbyCommunity()}
      {(selectedCategory === 'all' || selectedCategory === 'events') && showCulturalEvents && renderNearbyEvents()}
      
      {selectedCategory === 'cultural' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Compass className="h-5 w-5 text-primary-600" />
            <span>{language === 'pt' ? 'Locais Culturais Portugueses' : 'Portuguese Cultural Sites'}</span>
          </h3>
          <div className="space-y-3">
            {PORTUGUESE_CULTURAL_SITES.map((site) => (
              <div key={site.id} className="bg-white border border-secondary-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {language === 'pt' ? site.namePortuguese : site.name}
                    </h4>
                    <p className="text-sm text-secondary-600 mt-1">{site.address}</p>
                    <p className="text-sm text-primary-600 mt-1">{site.culturalSignificance}</p>
                  </div>
                  <button
                    onClick={() => openInMaps(site.coordinates, site.name)}
                    className="flex items-center space-x-1 text-primary-600 hover:text-blue-800 text-sm"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>{language === 'pt' ? 'Ir' : 'Go'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}