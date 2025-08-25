"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from 'framer-motion';
import { 
  HeartIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon,
  StarIcon,
  GlobeEuropeAfricaIcon,
  MusicalNoteIcon,
  BuildingLibraryIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HandRaisedIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
  FireIcon as FireSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import { COMMUNITY_INCLUSIVITY_GUIDELINES } from '@/config/community-guidelines';

// Lusophone Heritage Selection Interface with Cultural Flags
interface HeritageSelectionProps {
  onHeritageSelect: (heritage: string) => void;
  selectedHeritage?: string;
  className?: string;
}

export function MobileHeritageSelection({ 
  onHeritageSelect, 
  selectedHeritage,
  className = '' 
}: HeritageSelectionProps) {
  const { language } = useLanguage();
  const [touchFeedback, setTouchFeedback] = useState<string>('');

  const lusophoneCountries = [
    {
      code: 'pt',
      name: language === 'pt' ? 'Portugal' : 'Portugal',
      flag: '🇵🇹',
      colors: 'from-red-500 via-white to-green-500',
      culturalElements: language === 'pt' ? 'Fado • Santos Populares' : 'Fado • Santos Populares',
      population: '28%'
    },
    {
      code: 'br',
      name: language === 'pt' ? 'Brasil' : 'Brazil',
      flag: '🇧🇷',
      colors: 'from-blue-500 via-yellow-400 to-green-500',
      culturalElements: language === 'pt' ? 'Samba • Festa Junina' : 'Samba • Festa Junina',
      population: '32%'
    },
    {
      code: 'cv',
      name: language === 'pt' ? 'Cabo Verde' : 'Cape Verde',
      flag: '🇨🇻',
      colors: 'from-blue-600 via-white to-blue-400',
      culturalElements: language === 'pt' ? 'Morna • Coladeira' : 'Morna • Coladeira',
      population: '8%'
    },
    {
      code: 'ao',
      name: 'Angola',
      flag: '🇦🇴',
      colors: 'from-red-600 via-black to-yellow-500',
      culturalElements: language === 'pt' ? 'Kizomba • Kuduro' : 'Kizomba • Kuduro',
      population: '12%'
    },
    {
      code: 'mz',
      name: language === 'pt' ? 'Moçambique' : 'Mozambique',
      flag: '🇲🇿',
      colors: 'from-green-600 via-white to-yellow-500',
      culturalElements: language === 'pt' ? 'Marrabenta • Xigubo' : 'Marrabenta • Xigubo',
      population: '6%'
    },
    {
      code: 'gw',
      name: language === 'pt' ? 'Guiné-Bissau' : 'Guinea-Bissau',
      flag: '🇬🇼',
      colors: 'from-red-600 via-yellow-500 to-green-600',
      culturalElements: language === 'pt' ? 'Gumbé • Tina' : 'Gumbé • Tina',
      population: '3%'
    },
    {
      code: 'st',
      name: language === 'pt' ? 'São Tomé' : 'São Tomé',
      flag: '🇸🇹',
      colors: 'from-green-600 via-yellow-500 to-red-600',
      culturalElements: language === 'pt' ? 'Ússua • Socopé' : 'Ússua • Socopé',
      population: '1%'
    },
    {
      code: 'mixed',
      name: language === 'pt' ? 'Herança Mista' : 'Mixed Heritage',
      flag: '🌍',
      colors: 'from-purple-500 via-pink-500 to-blue-500',
      culturalElements: language === 'pt' ? 'Todas as Culturas' : 'All Cultures',
      population: '8%'
    },
    {
      code: 'uk',
      name: language === 'pt' ? 'Nascido no RU' : 'UK-Born',
      flag: '🇬🇧',
      colors: 'from-red-700 via-white to-blue-700',
      culturalElements: language === 'pt' ? 'Lusófono Britânico' : 'British Lusophone',
      population: '2%'
    }
  ];

  const handleHeritageSelect = (heritage: string) => {
    setTouchFeedback(heritage);
    setTimeout(() => setTouchFeedback(''), 200);
    onHeritageSelect(heritage);
  };

  return (
    <div className={`mobile-heritage-selection ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-3 responsive-portuguese-heading"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {language === 'pt' 
            ? 'Celebre Sua Herança Lusófona' 
            : 'Celebrate Your Lusophone Heritage'}
        </motion.h2>
        <motion.p
          className="text-gray-600 responsive-portuguese-text px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {language === 'pt'
            ? 'Qual herança lusófona representa você? Celebramos TODAS igualmente 🌍'
            : 'Which Portuguese-speaking heritage represents you? We celebrate ALL equally 🌍'}
        </motion.p>
      </motion.div>

      {/* Heritage Cards Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {lusophoneCountries.map((country, index) => {
          const isSelected = selectedHeritage === country.code;
          const hasFeedback = touchFeedback === country.code;
          
          return (
            <motion.button
              key={country.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleHeritageSelect(country.code)}
              className={`
                heritage-selection-card lusophone-touch-target
                relative overflow-hidden rounded-2xl p-6 border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-red-500 bg-red-50 shadow-lg ring-4 ring-red-200' 
                  : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'
                }
                ${hasFeedback ? 'scale-95' : ''}
                min-h-[140px] flex flex-col justify-between
                focus:outline-none focus:ring-4 focus:ring-red-500/20
              `}
              aria-label={`${language === 'pt' ? 'Selecionar herança' : 'Select heritage'} ${country.name}`}
            >
              {/* Flag and Country Name */}
              <div className="text-center">
                <motion.div
                  className="text-4xl mb-3 flag-flow-animation"
                  animate={isSelected ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.6, repeat: isSelected ? Infinity : 0 }}
                >
                  {country.flag}
                </motion.div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                  {country.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {country.population} {language === 'pt' ? 'da comunidade' : 'of community'}
                </p>
              </div>

              {/* Cultural Elements */}
              <div className="mt-3">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  {country.culturalElements}
                </p>
              </div>

              {/* Selection Indicator */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cultural Color Gradient Border */}
              <div 
                className={`
                  absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br ${country.colors}
                  ${isSelected ? 'opacity-20' : ''}
                `}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Cultural Unity Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 mx-4 p-4 bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-xl border border-red-200"
      >
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            {language === 'pt' ? 'Unidos pela Língua' : 'Unidos pela Língua'}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            {language === 'pt'
              ? 'Todas as origens lusófonas são igualmente celebradas e bem-vindas na nossa comunidade'
              : 'All Portuguese-speaking backgrounds are equally celebrated and welcome in our community'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Mobile Lusophone Event Discovery Interface
interface EventDiscoveryProps {
  events?: Array<{
    id: string;
    title: string;
    titlePt?: string;
    date: string;
    location: string;
    type: string;
    country: string;
    flag: string;
    attendees: number;
    price?: number;
    isFavorited?: boolean;
  }>;
  onEventSelect?: (eventId: string) => void;
  onFavoriteToggle?: (eventId: string) => void;
}

export function MobileEventDiscovery({ 
  events = [],
  onEventSelect,
  onFavoriteToggle 
}: EventDiscoveryProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sample events following inclusivity guidelines
  const sampleEvents = [
    {
      id: '1',
      title: 'Noite de Fado Autêntico',
      titlePt: 'Noite de Fado Autêntico',
      date: '2024-03-15T19:00:00',
      location: 'Vauxhall Lusophone Centre',
      type: 'cultural',
      country: 'Portugal',
      flag: '🇵🇹',
      attendees: 45,
      price: 15,
      isFavorited: false
    },
    {
      id: '2',
      title: 'Brazilian Festa Junina',
      titlePt: 'Festa Junina Brasileira',
      date: '2024-03-16T18:30:00',
      location: 'Stockwell Community Hub',
      type: 'festival',
      country: 'Brazil',
      flag: '🇧🇷',
      attendees: 78,
      price: 12,
      isFavorited: true
    },
    {
      id: '3',
      title: 'Cape Verdean Morna Night',
      titlePt: 'Noite de Morna Cabo-verdiana',
      date: '2024-03-17T20:00:00',
      location: 'South London Cultural Centre',
      type: 'music',
      country: 'Cape Verde',
      flag: '🇨🇻',
      attendees: 32,
      isFavorited: false
    },
    {
      id: '4',
      title: 'Angolan Kizomba Workshop',
      titlePt: 'Workshop de Kizomba Angolana',
      date: '2024-03-18T19:30:00',
      location: 'East London Dance Studio',
      type: 'workshop',
      country: 'Angola',
      flag: '🇦🇴',
      attendees: 28,
      price: 18,
      isFavorited: false
    }
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;

  const categories = [
    { 
      id: 'all', 
      label: language === 'pt' ? 'Todos' : 'All', 
      icon: GlobeEuropeAfricaIcon,
      count: displayEvents.length 
    },
    { 
      id: 'cultural', 
      label: language === 'pt' ? 'Cultural' : 'Cultural', 
      icon: BuildingLibraryIcon,
      count: displayEvents.filter(e => e.type === 'cultural').length 
    },
    { 
      id: 'music', 
      label: language === 'pt' ? 'Música' : 'Music', 
      icon: MusicalNoteIcon,
      count: displayEvents.filter(e => e.type === 'music').length 
    },
    { 
      id: 'festival', 
      label: language === 'pt' ? 'Festival' : 'Festival', 
      icon: FireSolidIcon,
      count: displayEvents.filter(e => e.type === 'festival').length 
    },
    { 
      id: 'workshop', 
      label: language === 'pt' ? 'Workshop' : 'Workshop', 
      icon: HandRaisedIcon,
      count: displayEvents.filter(e => e.type === 'workshop').length 
    }
  ];

  const filteredEvents = activeCategory === 'all' 
    ? displayEvents 
    : displayEvents.filter(event => event.type === activeCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', options);
  };

  const handleScroll = useCallback((info: PanInfo) => {
    setIsScrolling(Math.abs(info.velocity.x) > 50);
  }, []);

  return (
    <div className="mobile-event-discovery">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 responsive-portuguese-heading">
          {language === 'pt' 
            ? 'Eventos Lusófonos Próximos' 
            : 'Upcoming Lusophone Events'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Descubra eventos culturais de todas as nações lusófonas'
            : 'Discover cultural events from all Portuguese-speaking nations'}
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="mb-6">
        <div 
          ref={scrollRef}
          className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2"
        >
          {categories.map((category, index) => {
            const isActive = activeCategory === category.id;
            const IconComponent = category.icon;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300
                  lusophone-touch-target min-w-[120px] justify-center
                  ${isActive 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-red-300'
                  }
                `}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-semibold text-sm">{category.label}</span>
                {category.count > 0 && (
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-bold
                    ${isActive ? 'bg-white/20' : 'bg-red-100 text-red-600'}
                  `}>
                    {category.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="px-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEventSelect?.(event.id)}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{event.flag}</span>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {event.country}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 responsive-portuguese-title">
                      {language === 'pt' && event.titlePt ? event.titlePt : event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavoriteToggle?.(event.id);
                    }}
                    className="lusophone-touch-target flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {event.isFavorited ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.button>
                </div>

                {/* Event Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>
                        {event.attendees} {language === 'pt' ? 'participantes' : 'attendees'}
                      </span>
                    </div>
                    
                    {event.price && (
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        £{event.price}
                      </div>
                    )}
                    
                    {!event.price && (
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {language === 'pt' ? 'Gratuito' : 'Free'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cultural Heritage Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {language === 'pt' ? 'Evento Cultural Lusófono' : 'Lusophone Cultural Event'}
                    </span>
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-semibold text-gray-600">
                        {language === 'pt' ? 'Verificado' : 'Verified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 px-4"
        >
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'pt' ? 'Nenhum evento encontrado' : 'No events found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'pt'
              ? 'Experimente filtros diferentes ou crie seu próprio evento cultural'
              : 'Try different filters or create your own cultural event'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
          >
            {language === 'pt' ? 'Criar Evento' : 'Create Event'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default {
  MobileHeritageSelection,
  MobileEventDiscovery
};