import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import { PORTUGUESE_COLORS, MOBILE_UX_CONFIG } from '../../config';

/**
 * TfL Transport Mode Types
 */
export type TransportMode = 'tube' | 'bus' | 'dlr' | 'overground' | 'tram' | 'walking' | 'cycling';

/**
 * Journey Leg Information
 */
export interface JourneyLeg {
  mode: TransportMode;
  line?: string;
  direction?: string;
  departure: {
    point: string;
    time: string;
    plannedTime: string;
  };
  arrival: {
    point: string;
    time: string;
    plannedTime: string;
  };
  duration: number; // in minutes
  distance?: number; // in meters
  disruptions?: DisruptionInfo[];
  accessibility?: AccessibilityInfo;
}

/**
 * Complete Journey Information
 */
export interface JourneyPlan {
  id: string;
  from: LocationPoint;
  to: LocationPoint;
  duration: number; // total duration in minutes
  legs: JourneyLeg[];
  fare?: {
    adult: number;
    currency: 'GBP';
    zones: string[];
  };
  accessibility: {
    isAccessible: boolean;
    stepFree: boolean;
    wheelchairAccessible: boolean;
    issues?: string[];
  };
  alternatives: JourneyPlan[];
}

/**
 * Location Point
 */
export interface LocationPoint {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'station' | 'stop' | 'poi' | 'address';
  modes: TransportMode[];
}

/**
 * Disruption Information
 */
export interface DisruptionInfo {
  id: string;
  category: 'real-time' | 'planned' | 'information';
  type: 'service-closed' | 'delays' | 'reduced-service' | 'information';
  description: {
    en: string;
    pt: string;
  };
  severity: 'severe' | 'serious' | 'minor' | 'information';
  affectedLines: string[];
  from?: string;
  to?: string;
  additionalInfo?: string;
}

/**
 * Accessibility Information
 */
export interface AccessibilityInfo {
  stepFree: boolean;
  wheelchairAccessible: boolean;
  lifts: {
    available: number;
    outOfOrder: number;
  };
  tactileGuidance: boolean;
  audioAnnouncements: boolean;
  visualAnnouncements: boolean;
  platformGap: 'small' | 'medium' | 'large' | 'unknown';
  specialAssistance: boolean;
}

/**
 * Portuguese Event with Transport Information
 */
export interface EventWithTransport {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  location: LocationPoint;
  startTime: string;
  endTime: string;
  category: 'cultural' | 'business' | 'community' | 'religious' | 'music';
  heritage: string;
  transportOptions: JourneyPlan[];
  nearestStations: {
    station: string;
    distance: number; // meters
    walkingTime: number; // minutes
    modes: TransportMode[];
    accessibility: AccessibilityInfo;
  }[];
  accessibilityNotes?: {
    en: string;
    pt: string;
  };
}

/**
 * TfL API Response Mock (in real implementation, this would come from TfL Unified API)
 */
const MOCK_TFL_RESPONSES = {
  journeyPlanner: {
    'stockwell-to-south-lambeth': {
      journeys: [
        {
          id: 'journey-1',
          duration: 15,
          legs: [
            {
              mode: 'tube' as TransportMode,
              line: 'Northern',
              direction: 'Southbound',
              departure: {
                point: 'Stockwell Underground Station',
                time: '14:30',
                plannedTime: '14:30',
              },
              arrival: {
                point: 'Oval Underground Station',
                time: '14:35',
                plannedTime: '14:35',
              },
              duration: 5,
            },
            {
              mode: 'walking' as TransportMode,
              departure: {
                point: 'Oval Underground Station',
                time: '14:35',
                plannedTime: '14:35',
              },
              arrival: {
                point: 'South Lambeth Portuguese Quarter',
                time: '14:45',
                plannedTime: '14:45',
              },
              duration: 10,
              distance: 800,
            },
          ],
          accessibility: {
            isAccessible: true,
            stepFree: false,
            wheelchairAccessible: false,
            issues: ['Steps at Oval station'],
          },
        },
      ],
    },
  },
  disruptions: [
    {
      id: 'northern-line-delay',
      category: 'real-time' as const,
      type: 'delays' as const,
      description: {
        en: 'Minor delays on Northern Line due to signal failure',
        pt: 'Pequenos atrasos na Linha Northern devido a falha de sinalização',
      },
      severity: 'minor' as const,
      affectedLines: ['Northern'],
    },
  ],
};

/**
 * Portuguese Community Event Locations in London
 */
const PORTUGUESE_EVENT_LOCATIONS: EventWithTransport[] = [
  {
    id: 'fado-night-south-lambeth',
    title: {
      en: 'Traditional Fado Night',
      pt: 'Noite de Fado Tradicional',
    },
    description: {
      en: 'Authentic Portuguese Fado performance in the heart of London\'s Portuguese quarter',
      pt: 'Apresentação autêntica de Fado português no coração do bairro português de Londres',
    },
    location: {
      name: 'South Lambeth Portuguese Quarter',
      coordinates: { latitude: 51.4838, longitude: -0.1151 },
      type: 'poi',
      modes: ['tube', 'bus', 'walking'],
    },
    startTime: '19:30',
    endTime: '22:00',
    category: 'music',
    heritage: 'Portuguese',
    transportOptions: [],
    nearestStations: [
      {
        station: 'Oval',
        distance: 800,
        walkingTime: 10,
        modes: ['tube'],
        accessibility: {
          stepFree: false,
          wheelchairAccessible: false,
          lifts: { available: 0, outOfOrder: 0 },
          tactileGuidance: true,
          audioAnnouncements: true,
          visualAnnouncements: true,
          platformGap: 'medium',
          specialAssistance: true,
        },
      },
      {
        station: 'Stockwell',
        distance: 1200,
        walkingTime: 15,
        modes: ['tube', 'bus'],
        accessibility: {
          stepFree: true,
          wheelchairAccessible: true,
          lifts: { available: 2, outOfOrder: 0 },
          tactileGuidance: true,
          audioAnnouncements: true,
          visualAnnouncements: true,
          platformGap: 'small',
          specialAssistance: true,
        },
      },
    ],
    accessibilityNotes: {
      en: 'Venue is wheelchair accessible. Contact organizers for special assistance.',
      pt: 'Local é acessível para cadeira de rodas. Entre em contacto com organizadores para assistência especial.',
    },
  },
  {
    id: 'brazilian-carnival-east-london',
    title: {
      en: 'Brazilian Carnival Celebration',
      pt: 'Celebração do Carnaval Brasileiro',
    },
    description: {
      en: 'Vibrant Brazilian carnival celebration with samba, capoeira, and traditional food',
      pt: 'Vibrante celebração do carnaval brasileiro com samba, capoeira e comida tradicional',
    },
    location: {
      name: 'East London Brazilian Community Center',
      coordinates: { latitude: 51.5462, longitude: -0.0571 },
      type: 'poi',
      modes: ['tube', 'dlr', 'bus'],
    },
    startTime: '15:00',
    endTime: '20:00',
    category: 'cultural',
    heritage: 'Brazilian',
    transportOptions: [],
    nearestStations: [
      {
        station: 'Mile End',
        distance: 600,
        walkingTime: 8,
        modes: ['tube'],
        accessibility: {
          stepFree: true,
          wheelchairAccessible: true,
          lifts: { available: 3, outOfOrder: 0 },
          tactileGuidance: true,
          audioAnnouncements: true,
          visualAnnouncements: true,
          platformGap: 'small',
          specialAssistance: true,
        },
      },
    ],
  },
];

/**
 * London Transport Integration Hook
 */
export function useLondonTransportIntegration() {
  const { t, i18n } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [journeyPlans, setJourneyPlans] = useState<Map<string, JourneyPlan>>(new Map());
  const [disruptions, setDisruptions] = useState<DisruptionInfo[]>([]);
  const [isLoadingJourney, setIsLoadingJourney] = useState(false);
  const [isLoadingDisruptions, setIsLoadingDisruptions] = useState(false);

  // Initialize location and load disruptions on mount
  useEffect(() => {
    getCurrentLocation();
    loadCurrentDisruptions();
  }, []);

  /**
   * Task 7: TfL API integration for real-time journey planning
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
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const planJourneyToEvent = async (event: EventWithTransport, from?: LocationPoint): Promise<JourneyPlan | null> => {
    setIsLoadingJourney(true);

    try {
      const startPoint = from || (currentLocation ? {
        name: 'Current Location',
        coordinates: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        type: 'address' as const,
        modes: ['walking' as TransportMode],
      } : null);

      if (!startPoint) {
        throw new Error('No starting location available');
      }

      // In a real implementation, this would call TfL Unified API
      // For demo, we'll use mock data
      const journeyPlan = await callTfLJourneyPlannerAPI(startPoint, event.location);
      
      if (journeyPlan) {
        setJourneyPlans(prev => new Map(prev.set(event.id, journeyPlan)));
      }

      return journeyPlan;
    } catch (error) {
      console.error('Error planning journey:', error);
      return null;
    } finally {
      setIsLoadingJourney(false);
    }
  };

  const callTfLJourneyPlannerAPI = async (from: LocationPoint, to: LocationPoint): Promise<JourneyPlan | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In real implementation:
    /*
    const response = await fetch(
      `https://api.tfl.gov.uk/journey/journeyresults/${from.coordinates.latitude},${from.coordinates.longitude}/to/${to.coordinates.latitude},${to.coordinates.longitude}?app_id=${TFL_APP_ID}&app_key=${TFL_APP_KEY}`
    );
    const data = await response.json();
    return parseJourneyPlannerResponse(data);
    */

    // Mock implementation
    const mockJourney: JourneyPlan = {
      id: `journey-${Date.now()}`,
      from,
      to,
      duration: 25,
      legs: [
        {
          mode: 'walking',
          departure: {
            point: from.name,
            time: '14:00',
            plannedTime: '14:00',
          },
          arrival: {
            point: 'Nearest Station',
            time: '14:08',
            plannedTime: '14:08',
          },
          duration: 8,
          distance: 600,
        },
        {
          mode: 'tube',
          line: 'Northern',
          direction: 'Southbound',
          departure: {
            point: 'Nearest Station',
            time: '14:10',
            plannedTime: '14:10',
          },
          arrival: {
            point: 'Destination Station',
            time: '14:20',
            plannedTime: '14:20',
          },
          duration: 10,
          accessibility: {
            stepFree: true,
            wheelchairAccessible: true,
            lifts: { available: 2, outOfOrder: 0 },
            tactileGuidance: true,
            audioAnnouncements: true,
            visualAnnouncements: true,
            platformGap: 'small',
            specialAssistance: true,
          },
        },
        {
          mode: 'walking',
          departure: {
            point: 'Destination Station',
            time: '14:20',
            plannedTime: '14:20',
          },
          arrival: {
            point: to.name,
            time: '14:25',
            plannedTime: '14:25',
          },
          duration: 5,
          distance: 400,
        },
      ],
      accessibility: {
        isAccessible: true,
        stepFree: true,
        wheelchairAccessible: true,
        issues: [],
      },
      alternatives: [],
    };

    return mockJourney;
  };

  /**
   * Task 8: Portuguese event discovery with transport data
   */
  const getPortugueseEventsWithTransport = useCallback(async (): Promise<EventWithTransport[]> => {
    try {
      // Load transport information for each event
      const eventsWithTransport = await Promise.all(
        PORTUGUESE_EVENT_LOCATIONS.map(async (event) => {
          const journey = await planJourneyToEvent(event);
          return {
            ...event,
            transportOptions: journey ? [journey] : [],
          };
        })
      );

      return eventsWithTransport;
    } catch (error) {
      console.error('Error loading Portuguese events with transport:', error);
      return PORTUGUESE_EVENT_LOCATIONS;
    }
  }, [currentLocation]);

  const findNearestPortugueseEvents = useCallback((maxDistance: number = 5000): EventWithTransport[] => {
    if (!currentLocation) return PORTUGUESE_EVENT_LOCATIONS;

    return PORTUGUESE_EVENT_LOCATIONS.filter(event => {
      const distance = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        event.location.coordinates.latitude,
        event.location.coordinates.longitude
      );
      return distance <= maxDistance;
    }).sort((a, b) => {
      const distanceA = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        a.location.coordinates.latitude,
        a.location.coordinates.longitude
      );
      const distanceB = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        b.location.coordinates.latitude,
        b.location.coordinates.longitude
      );
      return distanceA - distanceB;
    });
  }, [currentLocation]);

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
   * Task 9: Wheelchair accessibility information
   */
  const loadCurrentDisruptions = async () => {
    setIsLoadingDisruptions(true);

    try {
      // In real implementation:
      /*
      const response = await fetch(
        `https://api.tfl.gov.uk/line/mode/tube,dlr,overground/disruption?app_id=${TFL_APP_ID}&app_key=${TFL_APP_KEY}`
      );
      const data = await response.json();
      const processedDisruptions = parseDisruptionsResponse(data);
      */

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 800));
      const processedDisruptions = MOCK_TFL_RESPONSES.disruptions;
      
      setDisruptions(processedDisruptions);
    } catch (error) {
      console.error('Error loading disruptions:', error);
      setDisruptions([]);
    } finally {
      setIsLoadingDisruptions(false);
    }
  };

  const getAccessibilityInfoForStation = async (stationName: string): Promise<AccessibilityInfo | null> => {
    try {
      // In real implementation:
      /*
      const response = await fetch(
        `https://api.tfl.gov.uk/stoppoint/search/${stationName}?app_id=${TFL_APP_ID}&app_key=${TFL_APP_KEY}`
      );
      const data = await response.json();
      return parseAccessibilityInfo(data);
      */

      // Mock implementation
      return {
        stepFree: Math.random() > 0.3, // 70% of stations are step-free in our mock
        wheelchairAccessible: Math.random() > 0.2, // 80% are wheelchair accessible
        lifts: {
          available: Math.floor(Math.random() * 4),
          outOfOrder: Math.random() > 0.9 ? 1 : 0, // 10% chance of lift being out of order
        },
        tactileGuidance: true,
        audioAnnouncements: true,
        visualAnnouncements: true,
        platformGap: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
        specialAssistance: true,
      };
    } catch (error) {
      console.error('Error getting accessibility info:', error);
      return null;
    }
  };

  const openTfLJourneyPlanner = async (from?: string, to?: string) => {
    try {
      let url = 'https://tfl.gov.uk/plan-a-journey/';
      
      if (from && to) {
        url += `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      }

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          t('transport.error.title', 'Cannot Open TfL'),
          t('transport.error.message', 'Unable to open TfL Journey Planner'),
          [{ text: t('common.ok', 'OK'), style: 'default' }]
        );
      }
    } catch (error) {
      console.error('Error opening TfL Journey Planner:', error);
    }
  };

  const openCitymapperApp = async (from?: LocationPoint, to?: LocationPoint) => {
    try {
      let url = 'citymapper://';
      
      if (from && to) {
        url += `directions?startcoord=${from.coordinates.latitude},${from.coordinates.longitude}&endcoord=${to.coordinates.latitude},${to.coordinates.longitude}&startname=${encodeURIComponent(from.name)}&endname=${encodeURIComponent(to.name)}`;
      }

      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Fallback to web version
        const webUrl = 'https://citymapper.com/london';
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error('Error opening Citymapper:', error);
    }
  };

  return {
    // Location & Journey Planning
    currentLocation,
    getCurrentLocation,
    planJourneyToEvent,
    isLoadingJourney,
    
    // Portuguese Events with Transport
    getPortugueseEventsWithTransport,
    findNearestPortugueseEvents,
    
    // Disruptions & Accessibility
    disruptions,
    isLoadingDisruptions,
    loadCurrentDisruptions,
    getAccessibilityInfoForStation,
    
    // External Apps
    openTfLJourneyPlanner,
    openCitymapperApp,
    
    // Journey Plans Cache
    journeyPlans,
  };
}

/**
 * Transport Mode Icon Component
 */
function TransportModeIcon({ mode, size = 20, color = PORTUGUESE_COLORS.primary }: {
  mode: TransportMode;
  size?: number;
  color?: string;
}) {
  const iconMap = {
    tube: 'subway',
    bus: 'bus',
    dlr: 'train',
    overground: 'train',
    tram: 'train',
    walking: 'walk',
    cycling: 'bicycle',
  };

  return (
    <Ionicons 
      name={iconMap[mode] as any} 
      size={size} 
      color={color} 
    />
  );
}

/**
 * Journey Leg Component
 */
interface JourneyLegComponentProps {
  leg: JourneyLeg;
  isLast: boolean;
}

function JourneyLegComponent({ leg, isLast }: JourneyLegComponentProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.journeyLeg}>
      <View style={styles.journeyLegIcon}>
        <TransportModeIcon mode={leg.mode} />
      </View>
      
      <View style={styles.journeyLegDetails}>
        <Text style={styles.journeyLegMode}>
          {leg.line ? `${leg.line} Line` : t(`transport.mode.${leg.mode}`, leg.mode)}
        </Text>
        
        <View style={styles.journeyLegTimes}>
          <Text style={styles.journeyTime}>
            {leg.departure.time} - {leg.arrival.time}
          </Text>
          <Text style={styles.journeyDuration}>
            ({leg.duration} {t('common.minutes', 'min')})
          </Text>
        </View>
        
        <Text style={styles.journeyLegRoute}>
          {leg.departure.point} → {leg.arrival.point}
        </Text>
        
        {leg.accessibility && !leg.accessibility.wheelchairAccessible && (
          <View style={styles.accessibilityWarning}>
            <Ionicons name="warning" size={14} color={PORTUGUESE_COLORS.warning} />
            <Text style={styles.accessibilityWarningText}>
              {t('transport.accessibility.not_accessible', 'Not wheelchair accessible')}
            </Text>
          </View>
        )}
      </View>
      
      {!isLast && <View style={styles.journeyLegConnector} />}
    </View>
  );
}

/**
 * Event Transport Info Component
 */
interface EventTransportInfoProps {
  event: EventWithTransport;
  onPlanJourney?: () => void;
  onOpenExternalApp?: (app: 'tfl' | 'citymapper') => void;
}

export function EventTransportInfo({ 
  event, 
  onPlanJourney,
  onOpenExternalApp,
}: EventTransportInfoProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'en' | 'pt';
  
  return (
    <View style={styles.eventTransportContainer}>
      <Text style={styles.eventTransportTitle}>
        {t('transport.how_to_get_there', 'How to get there')}
      </Text>
      
      {/* Nearest Stations */}
      <View style={styles.nearestStationsContainer}>
        <Text style={styles.sectionTitle}>
          {t('transport.nearest_stations', 'Nearest Stations')}
        </Text>
        
        {event.nearestStations.map((station, index) => (
          <View key={index} style={styles.stationInfo}>
            <View style={styles.stationHeader}>
              <Text style={styles.stationName}>{station.station}</Text>
              <View style={styles.stationModes}>
                {station.modes.map((mode, modeIndex) => (
                  <TransportModeIcon key={modeIndex} mode={mode} size={16} />
                ))}
              </View>
            </View>
            
            <View style={styles.stationDetails}>
              <Text style={styles.stationDistance}>
                {station.distance}m • {station.walkingTime} {t('common.minutes', 'min')} {t('transport.walking', 'walk')}
              </Text>
              
              {station.accessibility.wheelchairAccessible && (
                <View style={styles.accessibilityBadge}>
                  <Ionicons name="accessibility" size={14} color={PORTUGUESE_COLORS.success} />
                  <Text style={styles.accessibilityBadgeText}>
                    {t('transport.wheelchair_accessible', 'Wheelchair accessible')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
      
      {/* Journey Plans */}
      {event.transportOptions.length > 0 && (
        <View style={styles.journeyPlansContainer}>
          <Text style={styles.sectionTitle}>
            {t('transport.recommended_journey', 'Recommended Journey')}
          </Text>
          
          {event.transportOptions.map((journey, index) => (
            <View key={index} style={styles.journeyPlan}>
              <View style={styles.journeyHeader}>
                <Text style={styles.journeyDuration}>
                  {journey.duration} {t('common.minutes', 'minutes')}
                </Text>
                {journey.accessibility.wheelchairAccessible && (
                  <Ionicons name="accessibility" size={18} color={PORTUGUESE_COLORS.success} />
                )}
              </View>
              
              {journey.legs.map((leg, legIndex) => (
                <JourneyLegComponent 
                  key={legIndex} 
                  leg={leg} 
                  isLast={legIndex === journey.legs.length - 1}
                />
              ))}
            </View>
          ))}
        </View>
      )}
      
      {/* Accessibility Notes */}
      {event.accessibilityNotes && (
        <View style={styles.accessibilityNotes}>
          <Ionicons name="information-circle" size={20} color={PORTUGUESE_COLORS.primary} />
          <Text style={styles.accessibilityNotesText}>
            {event.accessibilityNotes[language]}
          </Text>
        </View>
      )}
      
      {/* Action Buttons */}
      <View style={styles.transportActions}>
        <TouchableOpacity
          style={[styles.transportButton, styles.primaryButton]}
          onPress={onPlanJourney}
        >
          <Ionicons name="map" size={18} color="white" />
          <Text style={styles.primaryButtonText}>
            {t('transport.plan_journey', 'Plan Journey')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.transportButton, styles.secondaryButton]}
          onPress={() => onOpenExternalApp?.('tfl')}
        >
          <Text style={styles.secondaryButtonText}>TfL</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.transportButton, styles.secondaryButton]}
          onPress={() => onOpenExternalApp?.('citymapper')}
        >
          <Text style={styles.secondaryButtonText}>Citymapper</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Disruptions Panel Component
 */
interface DisruptionsPanelProps {
  disruptions: DisruptionInfo[];
  visible: boolean;
  onClose: () => void;
}

export function DisruptionsPanel({ disruptions, visible, onClose }: DisruptionsPanelProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as 'en' | 'pt';

  if (!visible) return null;

  return (
    <View style={styles.disruptionsPanel}>
      <View style={styles.disruptionsPanelHeader}>
        <Text style={styles.disruptionsPanelTitle}>
          {t('transport.disruptions.title', 'Transport Disruptions')}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={PORTUGUESE_COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.disruptionsList}>
        {disruptions.length === 0 ? (
          <Text style={styles.noDisruptions}>
            {t('transport.disruptions.none', 'No current disruptions affecting Portuguese community areas')}
          </Text>
        ) : (
          disruptions.map((disruption) => (
            <View 
              key={disruption.id} 
              style={[
                styles.disruptionItem,
                { borderLeftColor: getSeverityColor(disruption.severity) }
              ]}
            >
              <View style={styles.disruptionHeader}>
                <Text style={styles.disruptionLines}>
                  {disruption.affectedLines.join(', ')} Line{disruption.affectedLines.length > 1 ? 's' : ''}
                </Text>
                <Text style={[styles.disruptionSeverity, { color: getSeverityColor(disruption.severity) }]}>
                  {t(`transport.disruptions.severity.${disruption.severity}`, disruption.severity)}
                </Text>
              </View>
              <Text style={styles.disruptionDescription}>
                {disruption.description[language]}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const getSeverityColor = (severity: DisruptionInfo['severity']): string => {
  switch (severity) {
    case 'severe': return '#dc2626';
    case 'serious': return '#ea580c';
    case 'minor': return '#d97706';
    case 'information': return '#2563eb';
    default: return PORTUGUESE_COLORS.textSecondary;
  }
};

const styles = StyleSheet.create({
  eventTransportContainer: {
    padding: MOBILE_UX_CONFIG.premiumSpacing,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderRadius: 12,
    marginTop: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  eventTransportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  nearestStationsContainer: {
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  stationInfo: {
    backgroundColor: PORTUGUESE_COLORS.background,
    padding: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
  },
  stationModes: {
    flexDirection: 'row',
    gap: 4,
  },
  stationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationDistance: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
  },
  accessibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  accessibilityBadgeText: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.success,
  },
  journeyPlansContainer: {
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  journeyPlan: {
    backgroundColor: PORTUGUESE_COLORS.background,
    padding: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_COLORS.border,
  },
  journeyDuration: {
    fontSize: 16,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.primary,
  },
  journeyLeg: {
    flexDirection: 'row',
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    position: 'relative',
  },
  journeyLegIcon: {
    width: 30,
    alignItems: 'center',
    paddingTop: 2,
  },
  journeyLegDetails: {
    flex: 1,
    marginLeft: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  journeyLegMode: {
    fontSize: 14,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
    marginBottom: 2,
  },
  journeyLegTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  journeyTime: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
  },
  journeyLegRoute: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.textSecondary,
    lineHeight: 16,
  },
  journeyLegConnector: {
    position: 'absolute',
    left: 14,
    top: 25,
    width: 2,
    height: 20,
    backgroundColor: PORTUGUESE_COLORS.border,
  },
  accessibilityWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  accessibilityWarningText: {
    fontSize: 12,
    color: PORTUGUESE_COLORS.warning,
  },
  accessibilityNotes: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: PORTUGUESE_COLORS.primaryLight,
    padding: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
  },
  accessibilityNotesText: {
    flex: 1,
    fontSize: 14,
    color: PORTUGUESE_COLORS.primary,
    lineHeight: 18,
  },
  transportActions: {
    flexDirection: 'row',
    gap: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  transportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: MOBILE_UX_CONFIG.comfortableSpacing,
    paddingHorizontal: MOBILE_UX_CONFIG.premiumSpacing,
    borderRadius: 8,
    minHeight: MOBILE_UX_CONFIG.minTouchTarget,
  },
  primaryButton: {
    backgroundColor: PORTUGUESE_COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: PORTUGUESE_COLORS.primary,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  secondaryButtonText: {
    color: PORTUGUESE_COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  disruptionsPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PORTUGUESE_COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: MOBILE_UX_CONFIG.premiumSpacing,
    maxHeight: '70%',
    elevation: 10,
    shadowColor: PORTUGUESE_COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  disruptionsPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: MOBILE_UX_CONFIG.premiumSpacing,
    paddingBottom: MOBILE_UX_CONFIG.comfortableSpacing,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_COLORS.border,
  },
  disruptionsPanelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PORTUGUESE_COLORS.text,
  },
  disruptionsList: {
    flex: 1,
  },
  noDisruptions: {
    textAlign: 'center',
    fontSize: 16,
    color: PORTUGUESE_COLORS.textSecondary,
    marginTop: MOBILE_UX_CONFIG.premiumSpacing,
  },
  disruptionItem: {
    backgroundColor: PORTUGUESE_COLORS.background,
    padding: MOBILE_UX_CONFIG.comfortableSpacing,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: MOBILE_UX_CONFIG.comfortableSpacing,
  },
  disruptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  disruptionLines: {
    fontSize: 14,
    fontWeight: '600',
    color: PORTUGUESE_COLORS.text,
  },
  disruptionSeverity: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  disruptionDescription: {
    fontSize: 14,
    color: PORTUGUESE_COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default {
  useLondonTransportIntegration,
  EventTransportInfo,
  DisruptionsPanel,
  TransportModeIcon,
};