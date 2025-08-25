"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  UsersIcon,
  StarIcon,
  BuildingOffice2Icon,
  HeartIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

interface Event {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  type: 'business' | 'romantic' | 'cultural';
  date: string;
  location: string;
  attendees: number;
  price: string;
  image: string;
  tags: string[];
  rating: number;
}

interface EventShowcaseProps {
  selectedAudience?: 'business' | 'romantic' | 'both' | '';
  className?: string;
}

export function EventShowcase({ selectedAudience = '', className = '' }: EventShowcaseProps) {
  const { language } = useLanguage();

  const allEvents: Event[] = [
    // Business Events
    {
      id: 'executive-networking-gala',
      title: {
        en: 'Portuguese Executive Networking Gala',
        pt: 'Gala de Networking Executivo Português'
      },
      description: {
        en: 'Black-tie networking event with C-suite executives from Portuguese companies. Premium venue, gourmet dining, strategic partnerships.',
        pt: 'Evento de networking de gala com executivos C-level de empresas portuguesas. Local premium, jantar gourmet, parcerias estratégicas.'
      },
      type: 'business',
      date: 'Friday, March 15th, 7:00 PM',
      location: 'The Shard, London',
      attendees: 85,
      price: '£250 per person',
      image: '/images/events/executive-gala.jpg',
      tags: ['Networking', 'Executive', 'Luxury'],
      rating: 4.9
    },
    {
      id: 'tech-startup-pitch',
      title: {
        en: 'Portuguese Tech Startup Pitch Night',
        pt: 'Noite de Pitch de Startups Tech Portuguesas'
      },
      description: {
        en: 'Monthly startup pitch event featuring Portuguese entrepreneurs. Angel investors, VCs, and mentors. Innovation meets tradition.',
        pt: 'Evento mensal de pitch de startups com empreendedores portugueses. Investidores anjo, VCs e mentores. Inovação encontra tradição.'
      },
      type: 'business',
      date: 'Thursday, March 21st, 6:30 PM',
      location: 'Shoreditch, Tech Hub',
      attendees: 120,
      price: 'Free - VIP £50',
      image: '/images/events/tech-startup.jpg',
      tags: ['Startups', 'Investment', 'Innovation'],
      rating: 4.7
    },
    {
      id: 'university-career-fair',
      title: {
        en: 'Portuguese University Career Fair',
        pt: 'Feira de Carreiras Universitárias Portuguesas'
      },
      description: {
        en: 'Exclusive career fair connecting 2,150+ Portuguese students with top employers. Graduate opportunities, internships, mentorship.',
        pt: 'Feira de carreiras exclusiva conectando 2.150+ estudantes portugueses com empregadores de topo. Oportunidades de graduação, estágios, mentoria.'
      },
      type: 'business',
      date: 'Saturday, March 23rd, 10:00 AM',
      location: 'UCL, Bloomsbury',
      attendees: 400,
      price: 'Free for students',
      image: '/images/events/career-fair.jpg',
      tags: ['Students', 'Careers', 'Universities'],
      rating: 4.8
    },

    // Romantic Events
    {
      id: 'fado-romance-night',
      title: {
        en: 'Romantic Fado Night - Souls Connecting',
        pt: 'Noite Romântica de Fado - Almas se Conectando'
      },
      description: {
        en: 'Intimate Fado performance in candlelit venue. Traditional Portuguese music creating magical moments for meaningful connections.',
        pt: 'Performance íntima de Fado em local à luz de velas. Música tradicional portuguesa criando momentos mágicos para conexões significativas.'
      },
      type: 'romantic',
      date: 'Saturday, March 16th, 8:00 PM',
      location: 'Stockwell Portuguese Quarter',
      attendees: 45,
      price: '£35 per person',
      image: '/images/events/fado-romance.jpg',
      tags: ['Fado', 'Romance', 'Music'],
      rating: 4.9
    },
    {
      id: 'wine-tasting-romance',
      title: {
        en: 'Portuguese Wine & Romance Tasting',
        pt: 'Degustação de Vinhos e Romance Português'
      },
      description: {
        en: 'Curated wine tasting featuring Portuguese wines. Guided pairings, intimate atmosphere, perfect for couples or singles seeking connection.',
        pt: 'Degustação de vinhos curada com vinhos portugueses. Harmonizações guiadas, atmosfera íntima, perfeita para casais ou solteiros buscando conexão.'
      },
      type: 'romantic',
      date: 'Friday, March 22nd, 7:30 PM',
      location: 'Kensington Wine Bar',
      attendees: 30,
      price: '£55 per person',
      image: '/images/events/wine-romance.jpg',
      tags: ['Wine', 'Romance', 'Culture'],
      rating: 4.8
    },
    {
      id: 'kizomba-dance-love',
      title: {
        en: 'Sensual Kizomba Dance - Finding Connection',
        pt: 'Dança Sensual de Kizomba - Encontrando Conexão'
      },
      description: {
        en: 'Learn the passionate art of Kizomba dancing. Partner rotations, professional instruction, romantic atmosphere for meaningful connections.',
        pt: 'Aprenda a arte apaixonada da dança Kizomba. Rotação de parceiros, instrução profissional, atmosfera romântica para conexões significativas.'
      },
      type: 'romantic',
      date: 'Sunday, March 24th, 6:00 PM',
      location: 'Camden Dance Studio',
      attendees: 60,
      price: '£25 per person',
      image: '/images/events/kizomba-love.jpg',
      tags: ['Dancing', 'Kizomba', 'Romance'],
      rating: 4.7
    },

    // Cultural Events
    {
      id: 'santos-populares',
      title: {
        en: 'Santos Populares Festival - Portuguese Street Party',
        pt: 'Festival Santos Populares - Festa de Rua Portuguesa'
      },
      description: {
        en: 'Traditional Portuguese street festival with live music, authentic food, folk dancing, and community celebrations. Family-friendly cultural immersion.',
        pt: 'Festival de rua tradicional português com música ao vivo, comida autêntica, danças folclóricas e celebrações comunitárias. Imersão cultural para toda família.'
      },
      type: 'cultural',
      date: 'Saturday, June 1st, 2:00 PM',
      location: 'Stockwell Park',
      attendees: 800,
      price: 'Free',
      image: '/images/events/santos-populares.jpg',
      tags: ['Festival', 'Culture', 'Family'],
      rating: 4.9
    },
    {
      id: 'cape-verde-morna',
      title: {
        en: 'Cape Verdean Morna Soul Sessions',
        pt: 'Sessões de Alma Morna Cabo-verdiana'
      },
      description: {
        en: 'Heartfelt acoustic sessions featuring Cape Verde\'s most emotional music. Intimate venue, traditional instruments, soul-stirring performances.',
        pt: 'Sessões acústicas emocionantes com a música mais emocional de Cabo Verde. Local íntimo, instrumentos tradicionais, performances comoventes.'
      },
      type: 'cultural',
      date: 'Thursday, March 28th, 7:00 PM',
      location: 'Stockwell Community Centre',
      attendees: 50,
      price: '£20 per session',
      image: '/images/events/morna-sessions.jpg',
      tags: ['Cape Verde', 'Music', 'Culture'],
      rating: 4.8
    }
  ];

  // Filter events based on selected audience
  const getFilteredEvents = () => {
    if (selectedAudience === 'business') {
      return allEvents.filter(event => event.type === 'business');
    } else if (selectedAudience === 'romantic') {
      return allEvents.filter(event => event.type === 'romantic');
    } else if (selectedAudience === 'both') {
      return allEvents.filter(event => event.type === 'business' || event.type === 'romantic');
    } else {
      return allEvents.slice(0, 6); // Show mix of all types
    }
  };

  const events = getFilteredEvents();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [events.length]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'business':
        return <BuildingOffice2Icon className="h-5 w-5 text-blue-500" />;
      case 'romantic':
        return <HeartIcon className="h-5 w-5 text-red-500" />;
      case 'cultural':
        return <MusicalNoteIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <CalendarDaysIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'business':
        return language === 'pt' ? 'Negócios' : 'Business';
      case 'romantic':
        return language === 'pt' ? 'Romance' : 'Romance';
      case 'cultural':
        return language === 'pt' ? 'Cultural' : 'Cultural';
      default:
        return language === 'pt' ? 'Evento' : 'Event';
    }
  };

  if (events.length === 0) return null;

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarDaysIcon className="h-6 w-6 text-primary-500" />
          {language === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6">
          {selectedAudience === 'business'
            ? (language === 'pt' ? 'Eventos exclusivos de networking profissional' : 'Exclusive professional networking events')
            : selectedAudience === 'romantic'
            ? (language === 'pt' ? 'Eventos íntimos para conexões românticas' : 'Intimate events for romantic connections')
            : (language === 'pt' ? 'Diversos eventos culturais portugueses' : 'Diverse Portuguese cultural events')
          }
        </p>
      </motion.div>

      {/* Featured Event */}
      <div className="mb-6">
        <motion.div
          key={currentEventIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-white/90 to-primary-50/90 backdrop-blur-sm rounded-xl p-6 border border-white/70 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium">
              {getEventIcon(events[currentEventIndex].type)}
              <span>{getEventTypeLabel(events[currentEventIndex].type)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(events[currentEventIndex].rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">
                {events[currentEventIndex].rating}
              </span>
            </div>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-2">
            {events[currentEventIndex].title[language]}
          </h4>
          
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {events[currentEventIndex].description[language]}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <CalendarDaysIcon className="h-4 w-4 text-blue-500" />
              <span>{events[currentEventIndex].date}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPinIcon className="h-4 w-4 text-green-500" />
              <span>{events[currentEventIndex].location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <UsersIcon className="h-4 w-4 text-purple-500" />
              <span>{events[currentEventIndex].attendees} {language === 'pt' ? 'participantes' : 'attendees'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-semibold text-green-600">{events[currentEventIndex].price}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {events[currentEventIndex].tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700 underline">
              {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Event Navigation */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentEventIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentEventIndex 
                ? 'bg-primary-500' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Event ${index + 1}`}
          />
        ))}
      </div>

      {/* Quick Events Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {events.slice(0, 4).filter((_, index) => index !== currentEventIndex).slice(0, 2).map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setCurrentEventIndex(events.indexOf(event))}
          >
            <div className="flex items-center gap-2 mb-2">
              {getEventIcon(event.type)}
              <h5 className="text-sm font-semibold text-gray-900 truncate">
                {event.title[language]}
              </h5>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <CalendarDaysIcon className="h-3 w-3" />
              <span>{event.date.split(',')[0]}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-600">{event.price}</span>
              <div className="flex items-center gap-1">
                <UsersIcon className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{event.attendees}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-100">
          <p className="text-sm font-medium text-gray-800 mb-2">
            {language === 'pt' 
              ? '🎉 Junte-se para acesso exclusivo a eventos'
              : '🎉 Join for exclusive access to events'
            }
          </p>
          <p className="text-xs text-gray-600">
            {language === 'pt'
              ? 'Membros têm acesso antecipado e descontos especiais'
              : 'Members get early access and special discounts'
            }
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default EventShowcase;
