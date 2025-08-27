'use client'

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import LusophoneCarousel from '@/components/carousels/LusophoneCarousel';
import { LUSOPHONE_CELEBRATIONS, getCelebrationsByCategory, type LusophoneCelebration } from '@/config/lusophone-celebrations';

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
        imageUrl: '/images/fado-night.jpg'
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
        imageUrl: '/images/brazilian-festival.jpg'
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
        imageUrl: '/images/kizomba-night.jpg'
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
        imageUrl: '/images/morna-festival.jpg'
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

        {/* Portuguese Cultural Events Carousel */}
        <section className="container mx-auto px-4 py-8">
          <LusophoneCarousel
            items={carouselEvents}
            title={{
              en: 'Discover Portuguese-Speaking Cultural Events',
              pt: 'Descubra Eventos Culturais da Comunidade Lusófona'
            }}
            subtitle={{
              en: 'Experience the rich cultural diversity of Portuguese-speaking communities across London',
              pt: 'Experimente a rica diversidade cultural das comunidades lusófonas por toda Londres'
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
              console.log('Selected celebration:', celebration.name[language])
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

        {/* Navigation Tabs */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-red-500 to-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
              }`}
            >
              {isPortuguese ? 'Eventos' : 'Events'}
            </button>
            <button
              onClick={() => setActiveTab('cultural')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'cultural'
                  ? 'bg-gradient-to-r from-red-500 to-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
              }`}
            >
              {isPortuguese ? 'Cultura' : 'Culture'}
            </button>
          </div>

          {/* Events Grid */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl">🎭</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gradient-to-r from-red-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      <span className="text-2xl">🇵🇹</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-gradient-to-r from-red-500 to-green-500 text-white font-medium py-2 px-4 rounded-lg hover:from-red-600 hover:to-green-600 transition-colors">
                      {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cultural Tab Content */}
          {activeTab === 'cultural' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Experiências Culturais' : 'Cultural Experiences'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {isPortuguese 
                  ? 'Mergulhe na rica cultura portuguesa através dos nossos eventos especiais, workshops de fado, aulas de dança e festivais tradicionais.'
                  : 'Immerse yourself in rich Portuguese culture through our special events, fado workshops, dance classes, and traditional festivals.'
                }
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}