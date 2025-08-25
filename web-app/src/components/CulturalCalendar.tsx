"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UsersIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  TicketIcon,
  StarIcon,
  CurrencyPoundIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { ROUTES } from '@/config/routes';
import { formatPrice } from '@/config/pricing';

interface CulturalEvent {
  id: number;
  title: string;
  titlePt: string;
  type: 'cultural' | 'business' | 'social' | 'educational' | 'exclusive';
  date: string;
  time: string;
  location: string;
  address: string;
  price: number;
  memberPrice: number;
  maxAttendees: number;
  currentAttendees: number;
  description: string;
  descriptionPt: string;
  category: string;
  membershipRequired: boolean;
  exclusiveLevel: 'community' | 'ambassador' | 'executive';
  spotsleft: number;
  flag: string;
  organizer: string;
}

interface CulturalCalendarProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'weekly' | 'monthly' | 'featured';
  showMembershipGates?: boolean;
}

export default function CulturalCalendar({ 
  className = '', 
  children,
  variant = 'weekly',
  showMembershipGates = true
}: CulturalCalendarProps) {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock cultural events data with membership positioning
  const mockEvents: CulturalEvent[] = [
    {
      id: 1,
      title: "Exclusive Fado Night at Soho",
      titlePt: "Noite de Fado Exclusiva no Soho",
      type: 'exclusive',
      date: 'Fri, 30 Aug',
      time: '19:30',
      location: 'Lusophone Cultural Centre Soho',
      address: '25 Frith Street, London W1D 5LJ',
      price: 45,
      memberPrice: 30,
      maxAttendees: 35,
      currentAttendees: 28,
      description: 'Intimate fado evening with acclaimed Lusophone fadistas',
      descriptionPt: 'Noite íntima de fado com fadistas portugueses aclamados',
      category: 'Cultural Heritage',
      membershipRequired: true,
      exclusiveLevel: 'ambassador',
      spotsleft: 7,
      flag: '🇵🇹',
      organizer: 'Casa do Fado London'
    },
    {
      id: 2,
      title: "Elite Business Networking Dinner",
      titlePt: "Jantar de Networking Empresarial de Elite",
      type: 'business',
      date: 'Sat, 31 Aug',
      time: '18:00',
      location: 'The Shard Private Dining',
      address: '31 St Thomas Street, London SE1 9QU',
      price: 85,
      memberPrice: 65,
      maxAttendees: 25,
      currentAttendees: 22,
      description: 'Executive networking dinner for Lusophone business leaders',
      descriptionPt: 'Jantar de networking executivo para líderes empresariais lusófonos',
      category: 'Executive Network',
      membershipRequired: true,
      exclusiveLevel: 'executive',
      spotsleft: 3,
      flag: '🌍',
      organizer: 'LusoTown Executive Circle'
    },
    {
      id: 3,
      title: "Brazilian Capoeira Workshop",
      titlePt: "Workshop de Capoeira Brasileira",
      type: 'cultural',
      date: 'Sun, 1 Sep',
      time: '14:00',
      location: 'Community Centre Vauxhall',
      address: '390 Wandsworth Road, London SW8 4TE',
      price: 25,
      memberPrice: 18,
      maxAttendees: 40,
      currentAttendees: 15,
      description: 'Learn traditional Brazilian martial arts and music',
      descriptionPt: 'Aprenda artes marciais e música tradicionais brasileiras',
      category: 'Cultural Experience',
      membershipRequired: false,
      exclusiveLevel: 'community',
      spotsleft: 25,
      flag: '🇧🇷',
      organizer: 'Brasil Cultural London'
    },
    {
      id: 4,
      title: "Lusophone Wine Tasting Masterclass",
      titlePt: "Masterclass de Prova de Vinhos Portugueses",
      type: 'educational',
      date: 'Wed, 4 Sep',
      time: '19:00',
      location: 'Borough Market Wine Bar',
      address: '8 Southwark Street, London SE1 1TL',
      price: 55,
      memberPrice: 40,
      maxAttendees: 20,
      currentAttendees: 18,
      description: 'Guided tasting of premium Portuguese wines with sommelier',
      descriptionPt: 'Prova guiada de vinhos portugueses premium com sommelier',
      category: 'Gastronomy',
      membershipRequired: false,
      exclusiveLevel: 'community',
      spotsleft: 2,
      flag: '🇵🇹',
      organizer: 'Vinho & Cultura'
    },
    {
      id: 5,
      title: "Cape Verdean Morna Music Evening",
      titlePt: "Noite de Música Morna Cabo-verdiana",
      type: 'cultural',
      date: 'Thu, 5 Sep',
      time: '20:00',
      location: 'Rich Mix Cultural Centre',
      address: '35-47 Bethnal Green Road, London E1 6LA',
      price: 35,
      memberPrice: 25,
      maxAttendees: 60,
      currentAttendees: 31,
      description: 'Authentic Cape Verdean morna music with traditional artists',
      descriptionPt: 'Música morna cabo-verdiana autêntica com artistas tradicionais',
      category: 'Musical Heritage',
      membershipRequired: false,
      exclusiveLevel: 'community',
      spotsleft: 29,
      flag: '🇨🇻',
      organizer: 'Cabo Verde Cultural Society'
    },
    {
      id: 6,
      title: "Angola Heritage & Business Summit",
      titlePt: "Cúpula de Património e Negócios de Angola",
      type: 'business',
      date: 'Fri, 6 Sep',
      time: '17:00',
      location: 'Canary Wharf Business Centre',
      address: '1 Churchill Place, London E14 5HP',
      price: 95,
      memberPrice: 75,
      maxAttendees: 30,
      currentAttendees: 26,
      description: 'Business opportunities and cultural preservation discussion',
      descriptionPt: 'Discussão sobre oportunidades de negócios e preservação cultural',
      category: 'Heritage Business',
      membershipRequired: true,
      exclusiveLevel: 'executive',
      spotsleft: 4,
      flag: '🇦🇴',
      organizer: 'Angola Business Network UK'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadEvents = async () => {
      setLoading(true);
      // Filter events based on variant
      let filteredEvents = mockEvents;
      
      if (variant === 'featured') {
        filteredEvents = mockEvents.filter(e => e.membershipRequired || e.spotsleft < 10);
      } else if (variant === 'weekly') {
        filteredEvents = mockEvents.slice(0, 4);
      }
      
      setEvents(filteredEvents);
      setLoading(false);
    };

    loadEvents();
  }, [variant]);

  const getExclusivityBadge = (event: CulturalEvent) => {
    if (event.membershipRequired) {
      return (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">
          <StarIcon className="w-3 h-3" />
          MEMBERS ONLY
        </div>
      );
    }
    
    if (event.spotsleft < 5) {
      return (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
          <SparklesIcon className="w-3 h-3" />
          LAST {event.spotsleft} SPOTS
        </div>
      );
    }
    
    return (
      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
        <TicketIcon className="w-3 h-3" />
        AVAILABLE
      </div>
    );
  };

  const getExclusivityColor = (level: string) => {
    switch (level) {
      case 'executive': return 'border-purple-500';
      case 'ambassador': return 'border-gold-500';
      case 'community': return 'border-blue-500';
      default: return 'border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className={`cultural-calendar-loading ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 bg-gradient-to-br from-white via-gray-50 to-blue-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-6"
          >
            <CalendarDaysIcon className="w-4 h-4" />
            {language === 'pt' ? 'Calendário Cultural Premium' : 'Premium Cultural Calendar'}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
          >
            {variant === 'weekly' && (language === 'pt' ? 'Eventos da Semana - Acesso Exclusivo' : 'Weekly Events - Exclusive Access')}
            {variant === 'monthly' && (language === 'pt' ? 'Calendário Mensal da Comunidade' : 'Monthly Community Calendar')}
            {variant === 'featured' && (language === 'pt' ? 'Experiências Culturais Premium' : 'Premium Cultural Experiences')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-6"
          >
            {language === 'pt' 
              ? 'Eventos culturais exclusivos para membros da comunidade lusófona. Acesso prioritário, preços preferenciais e experiências curadas.'
              : 'Exclusive cultural events for Lusophone community members. Priority access, preferential pricing, and curated experiences.'
            }
          </motion.p>

          {/* Membership Benefits Banner */}
          {showMembershipGates && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-2xl p-4 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-amber-800">Members save 30%</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-800">Priority booking</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="flex items-center gap-1">
                  <SparklesIcon className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-purple-800">Exclusive events</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 ${getExclusivityColor(event.exclusiveLevel)} hover:-translate-y-2`}
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{event.flag}</span>
                    <span className="text-sm font-medium text-gray-600">{event.category}</span>
                    {getExclusivityBadge(event)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'pt' ? event.titlePt : event.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'pt' ? event.descriptionPt : event.description}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4" />
                  <div>
                    <div className="font-medium">{event.location}</div>
                    <div className="text-xs text-gray-500">{event.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <UsersIcon className="w-4 h-4" />
                    <span>{event.currentAttendees}/{event.maxAttendees} attending</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <TicketIcon className="w-4 h-4" />
                    <span>{event.spotsleft} spots left</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-gray-900 flex items-center gap-1">
                      <CurrencyPoundIcon className="w-5 h-5" />
                      {event.memberPrice}
                      <span className="text-sm font-normal text-gray-600 ml-2">members</span>
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      Non-members: £{event.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      Save £{event.price - event.memberPrice}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((1 - event.memberPrice/event.price) * 100)}% off
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {event.membershipRequired ? (
                  <div className="space-y-2">
                    <a
                      href={`${ROUTES.events}/${event.id}/book`}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-center block"
                    >
                      {language === 'pt' ? 'Reservar Agora - Apenas Membros' : 'Reserve Now - Members Only'}
                    </a>
                    <a
                      href={ROUTES.signup}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-center block text-sm"
                    >
                      {language === 'pt' ? 'Candidatar-se à Membresia' : 'Apply for Membership'}
                    </a>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <a
                      href={`${ROUTES.events}/${event.id}/book`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center"
                    >
                      {language === 'pt' ? 'Reservar' : 'Book Now'}
                    </a>
                    <a
                      href={`${ROUTES.events}/${event.id}`}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      {language === 'pt' ? 'Detalhes' : 'Details'}
                    </a>
                  </div>
                )}
                
                {/* Organizer Credit */}
                <div className="text-xs text-center text-gray-500 bg-gray-50 py-2 px-3 rounded-lg">
                  {language === 'pt' ? 'Organizado por' : 'Organized by'} <span className="font-medium">{event.organizer}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-6">
            {language === 'pt' 
              ? 'Junte-se aos 750+ Membros da Comunidade Lusófona'
              : 'Join Portuguese speakers of the Lusophone Community'}
          </h3>
          <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'Acesso prioritário a eventos exclusivos, preços preferenciais e uma rede de contactos de elite no Reino Unido.'
              : 'Priority access to exclusive events, preferential pricing, and an elite network across the United Kingdom.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={ROUTES.events}
              className="inline-flex items-center bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl"
            >
              {language === 'pt' ? 'Ver Todos os Eventos' : 'View All Events'}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href={ROUTES.signup}
              className="inline-flex items-center border-2 border-white text-white font-bold px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              {language === 'pt' ? 'Candidatar-se Agora' : 'Apply for Membership'}
            </a>
          </div>
        </motion.div>
        
        {children}
      </div>
    </section>
  );
}

export { CulturalCalendar };