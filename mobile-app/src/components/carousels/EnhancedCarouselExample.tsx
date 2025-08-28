import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import LusophoneCarousel, { EventCarouselItem, type ShareableContent } from './LusophoneCarousel';
import SmartCulturalPreloader from './SmartCulturalPreloader';

/**
 * Example Portuguese Cultural Events with Enhanced Mobile Features
 */
const SAMPLE_EVENTS: EventCarouselItem[] = [
  {
    id: 'fado-night-lambeth',
    title: {
      en: 'Traditional Fado Night',
      pt: 'Noite de Fado Tradicional',
    },
    description: {
      en: 'Experience authentic Portuguese Fado music in London\'s Portuguese quarter',
      pt: 'Experimente música Fado portuguesa autêntica no bairro português de Londres',
    },
    heritage: 'Portuguese',
    date: '2025-09-15',
    time: '19:30',
    location: 'South Lambeth Portuguese Centre',
    price: 15,
    attendees: 45,
    maxAttendees: 80,
    tags: ['fado', 'music', 'cultural'],
    isFeature: true,
    category: 'cultural',
    priority: 10,
    actionLabel: {
      en: 'Reserve Seat',
      pt: 'Reservar Lugar',
    },
    // Enhanced properties for mobile features
    location_coordinates: {
      latitude: 51.4838,
      longitude: -0.1151,
    },
    accessibility_info: {
      wheelchair_accessible: true,
      hearing_loop: true,
      parking_available: false,
    },
  },
  {
    id: 'brazilian-carnival-east',
    title: {
      en: 'Brazilian Carnival Celebration',
      pt: 'Celebração do Carnaval Brasileiro',
    },
    description: {
      en: 'Join the vibrant Brazilian community for an authentic carnival experience',
      pt: 'Junte-se à vibrante comunidade brasileira para uma experiência de carnaval autêntica',
    },
    heritage: 'Brazilian',
    date: '2025-10-01',
    time: '15:00',
    location: 'East London Community Centre',
    price: 20,
    attendees: 120,
    maxAttendees: 200,
    tags: ['carnival', 'samba', 'dance', 'food'],
    isFeature: true,
    category: 'cultural',
    priority: 9,
    actionLabel: {
      en: 'Join Celebration',
      pt: 'Participar na Celebração',
    },
    location_coordinates: {
      latitude: 51.5462,
      longitude: -0.0571,
    },
  },
  {
    id: 'cape-verdean-music-brixton',
    title: {
      en: 'Cape Verdean Music Night',
      pt: 'Noite de Música Cabo-verdiana',
    },
    description: {
      en: 'Discover the beautiful sounds of Cape Verde with live morna and coladeira',
      pt: 'Descubra os belos sons de Cabo Verde com morna e coladeira ao vivo',
    },
    heritage: 'CapeVerdean',
    date: '2025-09-22',
    time: '18:00',
    location: 'Brixton Cultural Centre',
    price: 12,
    attendees: 35,
    maxAttendees: 60,
    tags: ['morna', 'coladeira', 'live music'],
    isFeature: false,
    category: 'music',
    priority: 8,
    actionLabel: {
      en: 'Book Ticket',
      pt: 'Comprar Bilhete',
    },
    location_coordinates: {
      latitude: 51.4618,
      longitude: -0.1151,
    },
  },
];

/**
 * Enhanced Carousel Example Component
 * Demonstrates all three key mobile carousel improvements
 */
export default function EnhancedCarouselExample() {
  const { t } = useTranslation();

  // Transform carousel items to shareable content
  const transformToShareableContent = (item: EventCarouselItem): ShareableContent => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      url: `https://lusotown.com/events/${item.id}`,
      imageUrl: `https://lusotown.com/images/events/${item.id}.jpg`,
      category: 'event',
      hashtags: [
        'LusoTown',
        'PortugueseCommunityUK',
        'LondonPortugueseCommunity',
        ...item.tags,
        item.heritage + 'Community',
      ],
      communitySpecific: {
        heritage: item.heritage || 'Portuguese',
        location: item.location,
        culturalContext: `Authentic ${item.heritage} cultural experience in London`,
      },
    };
  };

  return (
    <SmartCulturalPreloader
      enableLocationServices={true}
      preloadRadius={3000}
      culturalRelevanceThreshold={7}
    >
      <View style={styles.container}>
        <LusophoneCarousel
          items={SAMPLE_EVENTS}
          title={{
            en: 'Portuguese Community Events',
            pt: 'Eventos da Comunidade Portuguesa',
          }}
          
          // Enhanced Mobile Features Configuration
          enableSmartPreloading={true}
          enableCommunitySharing={true}
          enableTransportIntegration={true}
          
          // Content transformation for sharing
          shareableContentTransformer={transformToShareableContent}
          
          // Cultural category for preloading
          culturalCategory="events"
          
          // UI preferences
          showPreloadingStatus={true}
          showNearbyRecommendations={true}
          
          // Mobile configuration
          config={{
            itemHeight: 320, // Increased height for enhanced features
            enableAutoplay: false, // Manual control for better UX
            enableLoop: true,
            inactiveSlideScale: 0.95,
            inactiveSlideOpacity: 0.8,
          }}
          
          // Event handlers
          onItemPress={(item, index) => {
            console.log('Portuguese event selected:', item.title.en, 'at index:', index);
            // Handle event selection - could navigate to event details
          }}
          
          // Accessibility
          accessibilityLabel={{
            en: 'Portuguese community events carousel with transport and sharing features',
            pt: 'Carrossel de eventos da comunidade portuguesa com funcionalidades de transporte e partilha',
          }}
          testID="enhanced-portuguese-events-carousel"
        />
      </View>
    </SmartCulturalPreloader>
  );
}

/**
 * Styles for the enhanced carousel example
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
});

/**
 * Export for use in other components
 */
export { SAMPLE_EVENTS, EnhancedCarouselExample };