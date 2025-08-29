import dynamic from 'next/dynamic';
'use client'

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import EventDiscoverySystem from '@/components/events/EventDiscoverySystem';
const LusophoneCarousel = dynamic(() => import('@/components/LusophoneCarousel'), { loading: () => <div>Loading...</div> });
import { LUSOPHONE_CELEBRATIONS, getCelebrationsByCategory, type LusophoneCelebration } from '@/config/lusophone-celebrations';
import logger from '@/utils/logger';
import { COMMON_IMAGES } from '@/config/cdn';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
}

interface CarouselEvent extends Event {
  flagEmoji?: string;
  countries?: string[];
  culturalCategory?: string;
}

export default function EventsPage() {
  const { t, language } = useLanguage();
  const isPortuguese = language === 'pt';
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState('events');
  const [carouselEvents, setCarouselEvents] = useState<LusophoneCelebration[]>([]);

  useEffect(() => {
    // Mock events data with enhanced PALOP content
    const mockEvents: Event[] = [
      {
        id: '1',
        title: isPortuguese ? 'Noite de Fado' : 'Fado Night',
        description: isPortuguese ? 'Uma noite tradicional de Fado português' : 'A traditional Portuguese Fado evening',
        date: '2025-09-15',
        time: '19:00',
        location: 'Portuguese Club London',
        category: 'Arts & Culture',
        tags: ['fado', 'music', 'portuguese'],
        imageUrl: COMMON_IMAGES.portuguese.events
      },
      {
        id: '2', 
        title: isPortuguese ? 'Festival Brasileiro' : 'Brazilian Festival',
        description: isPortuguese ? 'Celebração da cultura brasileira' : 'Celebration of Brazilian culture',
        date: '2025-09-22',
        time: '14:00',
        location: 'Hyde Park',
        category: 'Arts & Culture',
        tags: ['brazil', 'festival', 'samba'],
        imageUrl: COMMON_IMAGES.portuguese.cultural
      },
      {
        id: '3',
        title: isPortuguese ? 'Noite de Kizomba' : 'Kizomba Night',
        description: isPortuguese ? 'Dança e música tradicional angolana' : 'Traditional Angolan dance and music',
        date: '2025-09-28',
        time: '20:00',
        location: 'East London Community Center',
        category: 'Arts & Culture',
        tags: ['kizomba', 'angola', 'dance'],
        imageUrl: COMMON_IMAGES.portuguese.events
      },
      {
        id: '4',
        title: isPortuguese ? 'Festival de Morna' : 'Morna Festival',
        description: isPortuguese ? 'Celebração da música tradicional cabo-verdiana' : 'Celebration of traditional Cape Verdean music',
        date: '2025-10-05',
        time: '18:30',
        location: 'South London Cultural Center',
        category: 'Arts & Culture',
        tags: ['morna', 'cape-verde', 'music'],
        imageUrl: COMMON_IMAGES.portuguese.events
      }
    ];
    setEvents(mockEvents);
    
    // Load cultural celebrations for carousel
    setCarouselEvents(LUSOPHONE_CELEBRATIONS.slice(0, 8)); // Show first 8 celebrations
  }, [isPortuguese]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-green-50/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-6">
              {isPortuguese ? 'Eventos da Comunidade' : 'Community Events'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese 
                ? 'Descubra eventos culturais portugueses em Londres e conecte-se com a nossa comunidade'
                : 'Discover Portuguese cultural events in London and connect with our community'
              }
            </p>
          </div>
        </section>

        {/* Event Discovery System with Cultural Calendar Integration */}
        <section className="container mx-auto px-4 py-8">
          <EventDiscoverySystem className="mb-8" />
        </section>

        {/* Cultural Celebrations Showcase */}
        <section className="container mx-auto px-4 py-8">
          <LusophoneCarousel
            items={carouselEvents}
            title={{
              en: 'Portuguese-Speaking Cultural Celebrations',
              pt: 'Celebrações Culturais da Comunidade Lusófona'
            }}
            subtitle={{
              en: 'Discover rich cultural traditions from Portugal, Brazil, Angola, Cape Verde and all Portuguese-speaking nations',
              pt: 'Descubra ricas tradições culturais de Portugal, Brasil, Angola, Cabo Verde e todas as nações lusófonas'
            }}
            renderItem={(celebration, index) => (
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <div className="h-32 bg-gradient-to-br from-primary-50 to-gold-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{celebration.icon}</div>
                    <div className="text-2xl">{celebration.flagEmoji}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-primary-500 to-gold-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {celebration.category}
                    </span>
                    <span className="text-xs text-primary-600">
                      {celebration.businessCount} {isPortuguese ? 'negócios' : 'businesses'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2 line-clamp-2">
                    {celebration.name[language]}
                  </h3>
                  <p className="text-primary-700 text-sm mb-3 line-clamp-3">
                    {celebration.description[language]}
                  </p>
                  <div className="space-y-1 text-xs text-primary-600">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{celebration.period[language]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌍</span>
                      <span>{celebration.countries.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-gradient-to-r from-primary-500 to-gold-500 text-white font-medium py-2 px-3 rounded-lg hover:from-primary-600 hover:to-gold-600 transition-colors text-sm">
                    {isPortuguese ? 'Explorar Cultura' : 'Explore Culture'}
                  </button>
                </div>
              </div>
            )}
            showControls={true}
            showDots={true}
            autoAdvance={true}
            autoAdvanceInterval={6000}
            className="mb-12"
            onItemClick={(celebration) => {
              logger.debug('Cultural celebration selected', {
                area: 'events',
                culturalContext: celebration.countries[0]?.toLowerCase() as any,
                action: 'celebration_selection',
                eventId: celebration.id
              })
            }}
            mobileSettings={{
              enableSwipeGestures: true,
              enableHapticFeedback: false,
              enablePullToRefresh: true
            }}
            enablePortugueseGestures={true}
            enableAccessibilityAnnouncements={true}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}