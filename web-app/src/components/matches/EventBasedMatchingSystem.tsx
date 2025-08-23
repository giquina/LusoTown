"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  TicketIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  FireIcon,
  BoltIcon,
  AcademicCapIcon,
  FlagIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { formatPrice } from "@/config/pricing";
import Image from "next/image";

interface PortugueseEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  culturalCategory: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  price: number;
  maxAttendees: number;
  currentAttendees: number;
  attendeeProfiles: EventAttendee[];
  culturalAuthenticity: number;
  languageLevel: 'Portuguese' | 'English' | 'Bilingual';
  ageGroup: string;
  hostInfo: {
    name: string;
    verified: boolean;
    rating: number;
    experience: string;
  };
  tags: string[];
  image?: string;
  isFeatured: boolean;
  requiresVerification: boolean;
  eventType: 'Public' | 'Community Only' | 'Premium Members' | 'Cultural Ambassador';
}

interface EventAttendee {
  id: string;
  name: string;
  age: number;
  profession: string;
  origin: string;
  interests: string[];
  compatibilityScore: number;
  isMatch: boolean;
  hasSharedInterests: boolean;
  culturalAlignment: number;
  profileImage?: string;
  lastActive: string;
  membershipType: 'Free' | 'Community' | 'Ambassador';
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
}

interface EventMatch {
  matchId: string;
  eventId: string;
  eventTitle: string;
  sharedEvent: PortugueseEvent;
  matchProfile: EventAttendee;
  connectionReason: 'both_attending' | 'similar_interest' | 'cultural_match' | 'recommended_event';
  connectionStrength: number;
  suggestedConversationStarters: string[];
  meetupSuggestions: string[];
  safetyLevel: 'High' | 'Medium' | 'Low';
}

interface EventBasedMatchingSystemProps {
  currentUserId: string;
  userInterests: string[];
  userLocation: string;
  onEventBooking?: (eventId: string, withMatchId?: string) => void;
  onMatchInteraction?: (matchId: string, action: 'like' | 'message' | 'request_meetup') => void;
  onConversationStart?: (matchId: string, eventId: string, starter: string) => void;
  showEventSuggestions?: boolean;
  showAttendeeMatches?: boolean;
}

export default function EventBasedMatchingSystem({
  currentUserId,
  userInterests,
  userLocation,
  onEventBooking,
  onMatchInteraction,
  onConversationStart,
  showEventSuggestions = true,
  showAttendeeMatches = true,
}: EventBasedMatchingSystemProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  
  const [selectedTab, setSelectedTab] = useState<'upcoming_events' | 'attendee_matches' | 'event_suggestions' | 'post_event'>('upcoming_events');
  const [loading, setLoading] = useState(true);
  const [portugueseEvents, setPortugueseEvents] = useState<PortugueseEvent[]>([]);
  const [eventMatches, setEventMatches] = useState<EventMatch[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PortugueseEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [conversationStarters, setConversationStarters] = useState<{[key: string]: string[]}>({});
  const [postEventConnections, setPostEventConnections] = useState<EventMatch[]>([]);

  // Mock Portuguese cultural events
  const mockPortugueseEvents: PortugueseEvent[] = [
    {
      id: "fado-night-soho",
      title: language === "pt" ? "Noite de Fado Autêntico no Soho" : "Authentic Fado Night in Soho",
      description: language === "pt" 
        ? "Uma noite íntima de Fado com fadistas tradicionais, guitarra portuguesa e atmosfera autêntica. Venha experienciar a alma portuguesa." 
        : "An intimate evening of Fado with traditional fadistas, Portuguese guitar and authentic atmosphere. Come experience the Portuguese soul.",
      category: "Cultural",
      culturalCategory: "Fado Music",
      date: "2025-08-25",
      time: "19:30",
      location: "Portuguese Cultural Centre",
      neighborhood: "Soho",
      price: 25,
      maxAttendees: 40,
      currentAttendees: 23,
      culturalAuthenticity: 100,
      languageLevel: "Portuguese",
      ageGroup: "25-45",
      hostInfo: {
        name: "Maria Fernandes",
        verified: true,
        rating: 4.9,
        experience: "Fadista profissional há 15 anos"
      },
      tags: ["Fado", "Música Tradicional", "Cultura Portuguesa", "Intimista"],
      isFeatured: true,
      requiresVerification: false,
      eventType: "Community Only",
      attendeeProfiles: []
    },
    {
      id: "santos-populares-festival",
      title: language === "pt" ? "Santos Populares - Festa de São João" : "Santos Populares - São João Festival",
      description: language === "pt" 
        ? "Celebre os Santos Populares com música, dança, comida tradicional e a magia das festas de São João. Sardinhas, manjericos e muita diversão!"
        : "Celebrate Santos Populares with music, dance, traditional food and the magic of São João festivals. Sardines, manjerico and lots of fun!",
      category: "Festival",
      culturalCategory: "Santos Populares",
      date: "2025-06-23",
      time: "18:00",
      location: "Vauxhall Community Gardens",
      neighborhood: "Vauxhall",
      price: 35,
      maxAttendees: 120,
      currentAttendees: 67,
      culturalAuthenticity: 95,
      languageLevel: "Bilingual",
      ageGroup: "All Ages",
      hostInfo: {
        name: "Associação Portuguesa de Londres",
        verified: true,
        rating: 4.8,
        experience: "Organizando festivais há 20+ anos"
      },
      tags: ["Santos Populares", "São João", "Festa Tradicional", "Família", "Comunidade"],
      isFeatured: true,
      requiresVerification: false,
      eventType: "Public",
      attendeeProfiles: []
    },
    {
      id: "pasteis-nata-workshop",
      title: language === "pt" ? "Workshop Pastéis de Nata - Segredos da Receita" : "Pastéis de Nata Workshop - Recipe Secrets",
      description: language === "pt"
        ? "Aprenda os segredos da receita original dos pastéis de nata com chef português. Inclui degustação e receitas para levar para casa."
        : "Learn the secrets of the original pastéis de nata recipe with Portuguese chef. Includes tasting and recipes to take home.",
      category: "Workshop",
      culturalCategory: "Portuguese Cuisine",
      date: "2025-08-28",
      time: "14:00",
      location: "Cooking Studio Lisboa",
      neighborhood: "Camden",
      price: 45,
      maxAttendees: 16,
      currentAttendees: 12,
      culturalAuthenticity: 100,
      languageLevel: "English",
      ageGroup: "18+",
      hostInfo: {
        name: "Chef António Silva",
        verified: true,
        rating: 4.9,
        experience: "Master pasteleiro de Belém"
      },
      tags: ["Pastéis de Nata", "Workshop", "Culinária", "Aprenda", "Hands-on"],
      isFeatured: false,
      requiresVerification: false,
      eventType: "Premium Members",
      attendeeProfiles: []
    },
    {
      id: "portugal-vs-spain-final",
      title: language === "pt" ? "Portugal vs Espanha - Final Europeu" : "Portugal vs Spain - European Final",
      description: language === "pt"
        ? "Assistam ao grande jogo juntos! Ambiente português garantido, petiscos tradicionais e energia da torcida portuguesa em Londres."
        : "Watch the big game together! Guaranteed Portuguese atmosphere, traditional snacks and Portuguese fan energy in London.",
      category: "Sports",
      culturalCategory: "Football",
      date: "2025-09-01",
      time: "20:00",
      location: "Sports Bar Português",
      neighborhood: "Stockwell",
      price: 15,
      maxAttendees: 80,
      currentAttendees: 45,
      culturalAuthenticity: 90,
      languageLevel: "Portuguese",
      ageGroup: "18+",
      hostInfo: {
        name: "Bar Lusitano",
        verified: true,
        rating: 4.7,
        experience: "Bar português tradicional"
      },
      tags: ["Futebol", "Portugal", "Torcida", "Desporto", "Comunidade"],
      isFeatured: true,
      requiresVerification: false,
      eventType: "Public",
      attendeeProfiles: []
    },
    {
      id: "portuguese-wine-tasting",
      title: language === "pt" ? "Degustação Vinhos do Douro e Alentejo" : "Douro and Alentejo Wine Tasting",
      description: language === "pt"
        ? "Descubra os sabores únicos dos vinhos portugueses numa degustação guiada com sommelier português. Inclui queijos e enchidos."
        : "Discover the unique flavors of Portuguese wines in a guided tasting with Portuguese sommelier. Includes cheeses and charcuterie.",
      category: "Gastronomy",
      culturalCategory: "Portuguese Wine",
      date: "2025-08-30",
      time: "19:00",
      location: "Wine Bar Lusitania",
      neighborhood: "Borough Market",
      price: 55,
      maxAttendees: 24,
      currentAttendees: 18,
      culturalAuthenticity: 95,
      languageLevel: "Bilingual",
      ageGroup: "25+",
      hostInfo: {
        name: "Sommelier João Pereira",
        verified: true,
        rating: 4.8,
        experience: "Especialista em vinhos portugueses"
      },
      tags: ["Vinho", "Degustação", "Douro", "Alentejo", "Gastronomia"],
      isFeatured: false,
      requiresVerification: true,
      eventType: "Cultural Ambassador",
      attendeeProfiles: []
    },
    {
      id: "portuguese-business-networking",
      title: language === "pt" ? "Networking Empresarial LusoTown" : "LusoTown Business Networking",
      description: language === "pt"
        ? "Conecte-se com empresários e profissionais portugueses em Londres. Networking, palestras e oportunidades de negócio."
        : "Connect with Portuguese entrepreneurs and professionals in London. Networking, talks and business opportunities.",
      category: "Business",
      culturalCategory: "Professional Networking",
      date: "2025-09-05",
      time: "18:30",
      location: "Portugal Business Hub",
      neighborhood: "City of London",
      price: 30,
      maxAttendees: 60,
      currentAttendees: 35,
      culturalAuthenticity: 80,
      languageLevel: "Bilingual",
      ageGroup: "25-55",
      hostInfo: {
        name: "Câmara de Comércio Portuguesa",
        verified: true,
        rating: 4.6,
        experience: "Organizando eventos de negócios há 10+ anos"
      },
      tags: ["Business", "Networking", "Empreendedorismo", "Profissionais", "Oportunidades"],
      isFeatured: false,
      requiresVerification: true,
      eventType: "Premium Members",
      attendeeProfiles: []
    }
  ];

  // Mock attendee profiles for events
  const generateEventAttendees = (eventId: string): EventAttendee[] => {
    const baseAttendees: Omit<EventAttendee, 'compatibilityScore' | 'isMatch' | 'hasSharedInterests' | 'culturalAlignment'>[] = [
      {
        id: "attendee-1",
        name: "Sofia Martins",
        age: 29,
        profession: "Marketing Manager",
        origin: "Porto, Portugal",
        interests: ["Fado", "Portuguese Culture", "Professional Networking", "Arts"],
        profileImage: "/avatars/sofia.jpg",
        lastActive: "2 hours ago",
        membershipType: "Community",
        verificationStatus: "Verified"
      },
      {
        id: "attendee-2", 
        name: "Miguel Santos",
        age: 32,
        profession: "Software Engineer",
        origin: "Lisboa, Portugal",
        interests: ["Football", "Technology", "Portuguese Wine", "Networking"],
        profileImage: "/avatars/miguel.jpg",
        lastActive: "1 day ago",
        membershipType: "Ambassador",
        verificationStatus: "Verified"
      },
      {
        id: "attendee-3",
        name: "Carolina Lima",
        age: 28,
        profession: "Financial Analyst", 
        origin: "São Paulo, Brasil",
        interests: ["Dance", "Portuguese Cuisine", "Cultural Events", "Language Exchange"],
        profileImage: "/avatars/carolina.jpg",
        lastActive: "3 hours ago",
        membershipType: "Community",
        verificationStatus: "Verified"
      },
      {
        id: "attendee-4",
        name: "Ricardo Costa",
        age: 34,
        profession: "Chef",
        origin: "Coimbra, Portugal",
        interests: ["Portuguese Cuisine", "Business", "Traditional Cooking", "Food Culture"],
        profileImage: "/avatars/ricardo.jpg",
        lastActive: "5 hours ago",
        membershipType: "Ambassador",
        verificationStatus: "Verified"
      },
      {
        id: "attendee-5",
        name: "Ana Pereira",
        age: 26,
        profession: "Medical Student",
        origin: "Braga, Portugal",
        interests: ["Healthcare", "Young Professionals", "Cultural Learning", "Volunteering"],
        profileImage: "/avatars/ana.jpg",
        lastActive: "1 hour ago",
        membershipType: "Free",
        verificationStatus: "Pending"
      }
    ];

    return baseAttendees.map(attendee => {
      const sharedInterests = attendee.interests.filter(interest => 
        userInterests.some(userInterest => 
          userInterest.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(userInterest.toLowerCase())
        )
      );

      return {
        ...attendee,
        compatibilityScore: 70 + Math.floor(Math.random() * 25) + (sharedInterests.length * 5),
        isMatch: Math.random() > 0.7,
        hasSharedInterests: sharedInterests.length > 0,
        culturalAlignment: 75 + Math.floor(Math.random() * 20)
      };
    });
  };

  // Generate conversation starters based on event and cultural context
  const generateConversationStarters = (event: PortugueseEvent, attendee: EventAttendee): string[] => {
    const starters = [];

    // Event-specific starters
    if (event.culturalCategory === "Fado Music") {
      starters.push(
        language === "pt" 
          ? `Olá ${attendee.name}! Também vens ao Fado esta noite? Qual é a tua fadista favorita?`
          : `Hi ${attendee.name}! Are you coming to the Fado tonight? Who's your favorite fadista?`
      );
    } else if (event.culturalCategory === "Santos Populares") {
      starters.push(
        language === "pt"
          ? `Olá! Viste que há festa de São João no sábado? Já foste às festas em Portugal?`
          : `Hi! Did you see there's a São João festival on Saturday? Have you been to the festivals in Portugal?`
      );
    } else if (event.culturalCategory === "Portuguese Cuisine") {
      starters.push(
        language === "pt"
          ? `Olá! Vais ao workshop de pastéis de nata? Adoro culinária portuguesa!`
          : `Hi! Are you going to the pastéis de nata workshop? I love Portuguese cuisine!`
      );
    } else if (event.culturalCategory === "Football") {
      starters.push(
        language === "pt"
          ? `Força Portugal! Vais ver o jogo? De que região de Portugal és?`
          : `Força Portugal! Are you watching the game? Which region of Portugal are you from?`
      );
    }

    // Origin-based starters
    if (attendee.origin.includes("Portugal")) {
      starters.push(
        language === "pt"
          ? `Vi que és de ${attendee.origin.split(',')[0]}. Que saudades de casa! Como está a adaptar-se a Londres?`
          : `I saw you're from ${attendee.origin.split(',')[0]}. Missing home! How are you adapting to London?`
      );
    } else if (attendee.origin.includes("Brasil")) {
      starters.push(
        language === "pt"
          ? `Oi! Somos ambos lusófonos em Londres. Como achas a comunidade portuguesa aqui?`
          : `Hi! We're both Portuguese speakers in London. What do you think of the Portuguese community here?`
      );
    }

    // Interest-based starters
    const sharedInterests = attendee.interests.filter(interest => 
      userInterests.some(userInterest => 
        userInterest.toLowerCase().includes(interest.toLowerCase())
      )
    );

    if (sharedInterests.length > 0) {
      starters.push(
        language === "pt"
          ? `Olá! Vi que também gostas de ${sharedInterests[0]}. Vamos falar sobre isso no evento?`
          : `Hi! I saw you also like ${sharedInterests[0]}. Let's chat about it at the event?`
      );
    }

    // Professional starters
    if (attendee.profession) {
      starters.push(
        language === "pt"
          ? `Olá! És ${attendee.profession}? Seria interessante conhecer mais sobre o teu trabalho em Londres.`
          : `Hi! Are you a ${attendee.profession}? Would be interesting to learn more about your work in London.`
      );
    }

    // Safety and event-focused starters
    starters.push(
      language === "pt"
        ? `Olá! Primeira vez neste tipo de evento? Parece que vai ser fantástico!`
        : `Hi! First time at this type of event? It looks like it's going to be fantastic!`
    );

    return starters.slice(0, 3); // Return top 3 most relevant
  };

  // Initialize data
  useEffect(() => {
    const initializeData = () => {
      setLoading(true);
      
      // Populate events with attendees
      const eventsWithAttendees = mockPortugueseEvents.map(event => ({
        ...event,
        attendeeProfiles: generateEventAttendees(event.id)
      }));

      setPortugueseEvents(eventsWithAttendees);

      // Generate event-based matches
      const matches: EventMatch[] = [];
      eventsWithAttendees.forEach(event => {
        event.attendeeProfiles.forEach(attendee => {
          if (attendee.isMatch || attendee.hasSharedInterests) {
            matches.push({
              matchId: `${event.id}-${attendee.id}`,
              eventId: event.id,
              eventTitle: event.title,
              sharedEvent: event,
              matchProfile: attendee,
              connectionReason: attendee.isMatch ? 'both_attending' : 'similar_interest',
              connectionStrength: attendee.compatibilityScore,
              suggestedConversationStarters: generateConversationStarters(event, attendee),
              meetupSuggestions: [
                language === "pt" ? "Encontrem-se 15 min antes do evento" : "Meet 15 min before the event",
                language === "pt" ? "Partilhem uma mesa durante o evento" : "Share a table during the event",
                language === "pt" ? "Vão tomar um café após o evento" : "Go for coffee after the event"
              ],
              safetyLevel: 'High'
            });
          }
        });
      });

      setEventMatches(matches.slice(0, 8)); // Limit to 8 matches

      // Generate conversation starters for all matches
      const starters: {[key: string]: string[]} = {};
      matches.forEach(match => {
        starters[match.matchId] = match.suggestedConversationStarters;
      });
      setConversationStarters(starters);

      setLoading(false);
    };

    setTimeout(initializeData, 1000); // Simulate loading
  }, [userInterests, language]);

  const getEventCategoryIcon = (category: string) => {
    switch (category) {
      case "Fado Music":
        return "🎵";
      case "Santos Populares":
        return "🎉";
      case "Portuguese Cuisine":
        return "🥮";
      case "Football":
        return "⚽";
      case "Portuguese Wine":
        return "🍷";
      case "Professional Networking":
        return "🤝";
      default:
        return "🇵🇹";
    }
  };

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal")) return "🇵🇹";
    if (origin.includes("Brasil")) return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
    if (origin.includes("Mozambique")) return "🇲🇿";
    return "🌍";
  };

  const getMembershipBadge = (type: string) => {
    switch (type) {
      case "Ambassador":
        return { icon: "👑", color: "text-yellow-600", bg: "bg-yellow-100" };
      case "Community":
        return { icon: "⭐", color: "text-blue-600", bg: "bg-blue-100" };
      case "Free":
        return { icon: "🌟", color: "text-gray-600", bg: "bg-gray-100" };
      default:
        return { icon: "👤", color: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  const handleEventBooking = (eventId: string, withMatchId?: string) => {
    onEventBooking?.(eventId, withMatchId);
  };

  const handleMatchInteraction = (matchId: string, action: 'like' | 'message' | 'request_meetup') => {
    onMatchInteraction?.(matchId, action);
  };

  const handleConversationStart = (matchId: string, eventId: string, starter: string) => {
    onConversationStart?.(matchId, eventId, starter);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-3/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-primary-50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
            <CalendarDaysIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-900">
              {language === "pt" 
                ? "Conecte-se Através de Eventos Portugueses" 
                : "Connect Through Portuguese Events"}
            </h3>
            <p className="text-sm text-primary-600">
              {language === "pt"
                ? "Encontre pessoas compatíveis em eventos culturais autênticos"
                : "Find compatible people at authentic cultural events"}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-primary-50 rounded-xl p-1 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('upcoming_events')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedTab === 'upcoming_events'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Próximos Eventos" : "Upcoming Events"}
          </button>
          <button
            onClick={() => setSelectedTab('attendee_matches')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedTab === 'attendee_matches'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Matches em Eventos" : "Event Matches"}
          </button>
          <button
            onClick={() => setSelectedTab('event_suggestions')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedTab === 'event_suggestions'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Sugestões Culturais" : "Cultural Suggestions"}
          </button>
          <button
            onClick={() => setSelectedTab('post_event')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              selectedTab === 'post_event'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Pós-Evento" : "Post-Event"}
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {/* Upcoming Events with Attendee Previews */}
        {selectedTab === 'upcoming_events' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-primary-900">
                {language === "pt" ? "Eventos Portugueses em Breve" : "Portuguese Events Coming Up"}
              </h4>
              <span className="text-sm text-primary-600">
                {portugueseEvents.length} {language === "pt" ? "eventos disponíveis" : "events available"}
              </span>
            </div>

            {portugueseEvents.slice(0, 4).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-primary-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
              >
                {/* Event Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center text-2xl">
                      {getEventCategoryIcon(event.culturalCategory)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-primary-900 text-base mb-1 leading-tight">
                          {event.title}
                        </h5>
                        <p className="text-sm text-primary-700 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                      
                      {event.culturalAuthenticity >= 95 && (
                        <div className="ml-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          ✨ Autêntico
                        </div>
                      )}
                    </div>
                    
                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1 text-primary-600">
                        <CalendarDaysIcon className="w-3 h-3" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-600">
                        <MapPinIcon className="w-3 h-3" />
                        <span className="truncate">{event.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-600">
                        <TicketIcon className="w-3 h-3" />
                        <span>{formatPrice(event.price)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-600">
                        <UsersIcon className="w-3 h-3" />
                        <span>{event.currentAttendees}/{event.maxAttendees}</span>
                      </div>
                    </div>

                    {/* Attendee Preview */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <UserGroupIcon className="w-3 h-3 text-secondary-500" />
                        <span className="text-xs font-semibold text-secondary-700">
                          {language === "pt" ? "Quem vai:" : "Who's going:"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Profile previews */}
                        <div className="flex -space-x-2">
                          {event.attendeeProfiles.slice(0, 4).map((attendee, idx) => (
                            <div
                              key={attendee.id}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white ${
                                attendee.isMatch ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-primary-400 to-secondary-400'
                              }`}
                              title={`${attendee.name} - ${attendee.compatibilityScore}% match`}
                            >
                              {attendee.name.charAt(0)}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {event.attendeeProfiles.filter(a => a.isMatch).length > 0 && (
                            <span className="text-red-600 font-semibold">
                              {event.attendeeProfiles.filter(a => a.isMatch).length} {language === "pt" ? "matches" : "matches"}
                            </span>
                          )}
                          {event.attendeeProfiles.filter(a => a.hasSharedInterests).length > 0 && (
                            <span className="text-blue-600 font-semibold ml-2">
                              {event.attendeeProfiles.filter(a => a.hasSharedInterests).length} {language === "pt" ? "interesses comuns" : "shared interests"}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEventBooking(event.id)}
                        className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center gap-1"
                      >
                        <TicketIcon className="w-4 h-4" />
                        {language === "pt" ? "Reservar" : "Book"}
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventDetails(true);
                        }}
                        className="px-3 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                      >
                        {language === "pt" ? "Ver Detalhes" : "View Details"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Event-Based Matches */}
        {selectedTab === 'attendee_matches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-primary-900">
                {language === "pt" ? "Pessoas Compatíveis em Eventos" : "Compatible People at Events"}
              </h4>
              <span className="text-sm text-primary-600">
                {eventMatches.length} {language === "pt" ? "matches encontrados" : "matches found"}
              </span>
            </div>

            {eventMatches.map((match, index) => (
              <motion.div
                key={match.matchId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-primary-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl relative">
                      👤
                      {/* Match indicator */}
                      {match.matchProfile.isMatch && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <HeartSolid className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Profile Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-primary-900">
                            {match.matchProfile.name}, {match.matchProfile.age}
                          </h5>
                          <span className="text-lg">{getOriginFlag(match.matchProfile.origin)}</span>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${getMembershipBadge(match.matchProfile.membershipType).bg} ${getMembershipBadge(match.matchProfile.membershipType).color}`}>
                            {getMembershipBadge(match.matchProfile.membershipType).icon}
                          </div>
                        </div>
                        <p className="text-sm text-primary-600">{match.matchProfile.profession}</p>
                        <p className="text-xs text-gray-500">{match.matchProfile.lastActive}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary-600">
                          {match.connectionStrength}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === "pt" ? "compatibilidade" : "compatibility"}
                        </div>
                      </div>
                    </div>

                    {/* Event Connection */}
                    <div className="bg-secondary-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-sm">{getEventCategoryIcon(match.sharedEvent.culturalCategory)}</div>
                        <span className="text-sm font-semibold text-secondary-800">
                          {match.eventTitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-secondary-600">
                        <div className="flex items-center gap-1">
                          <CalendarDaysIcon className="w-3 h-3" />
                          <span>{match.sharedEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          <span>{match.sharedEvent.neighborhood}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connection Reason */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <SparklesIcon className="w-3 h-3 text-accent-500" />
                        <span className="text-xs font-semibold text-accent-700">
                          {match.connectionReason === 'both_attending' 
                            ? (language === "pt" ? "Ambos vão ao evento" : "Both attending event")
                            : match.connectionReason === 'similar_interest'
                            ? (language === "pt" ? "Interesses similares" : "Similar interests")
                            : match.connectionReason === 'cultural_match'
                            ? (language === "pt" ? "Compatibilidade cultural" : "Cultural match")
                            : (language === "pt" ? "Evento recomendado" : "Recommended event")
                          }
                        </span>
                      </div>
                    </div>

                    {/* Conversation Starters */}
                    <div className="mb-3">
                      <h6 className="text-xs font-semibold text-gray-700 mb-2">
                        {language === "pt" ? "Como iniciar conversa:" : "Conversation starters:"}
                      </h6>
                      <div className="space-y-1">
                        {match.suggestedConversationStarters.slice(0, 2).map((starter, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleConversationStart(match.matchId, match.eventId, starter)}
                            className="block w-full text-left bg-gray-50 hover:bg-primary-50 p-2 rounded-lg text-xs text-gray-700 hover:text-primary-700 transition-colors"
                          >
                            💬 "{starter}"
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMatchInteraction(match.matchId, 'message')}
                        className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center gap-1"
                      >
                        <ChatBubbleLeftRightIcon className="w-3 h-3" />
                        {language === "pt" ? "Mensagem" : "Message"}
                      </button>
                      
                      <button
                        onClick={() => handleEventBooking(match.eventId, match.matchId)}
                        className="flex-1 bg-gradient-to-r from-accent-600 to-coral-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:from-accent-700 hover:to-coral-700 transition-all flex items-center justify-center gap-1"
                      >
                        <UsersIcon className="w-3 h-3" />
                        {language === "pt" ? "Ir Juntos" : "Go Together"}
                      </button>

                      {!hasActiveSubscription && (
                        <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded text-center">
                          Premium
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cultural Event Suggestions */}
        {selectedTab === 'event_suggestions' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-primary-900 mb-2">
                {language === "pt" 
                  ? "Sugestões de Eventos Baseadas na Compatibilidade" 
                  : "Compatibility-Based Event Suggestions"}
              </h4>
              <p className="text-primary-600 text-sm mb-4">
                {language === "pt"
                  ? "Encontre eventos onde pode conhecer pessoas com interesses e valores similares aos seus."
                  : "Find events where you can meet people with similar interests and values to yours."}
              </p>
              <button className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all">
                {language === "pt" ? "Ver Sugestões Personalizadas" : "View Personalized Suggestions"}
              </button>
            </div>
          </div>
        )}

        {/* Post-Event Connections */}
        {selectedTab === 'post_event' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-primary-900 mb-2">
                {language === "pt" 
                  ? "Conexões Pós-Evento" 
                  : "Post-Event Connections"}
              </h4>
              <p className="text-primary-600 text-sm mb-4">
                {language === "pt"
                  ? "Continue as conversas iniciadas em eventos e construa relacionamentos duradouros."
                  : "Continue conversations started at events and build lasting relationships."}
              </p>
              <button className="bg-gradient-to-r from-coral-600 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-coral-700 hover:to-accent-700 transition-all">
                {language === "pt" ? "Ver Conexões Recentes" : "View Recent Connections"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Premium Upgrade Prompt for Free Users */}
      {!hasActiveSubscription && (
        <div className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <BoltIcon className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <h5 className="font-semibold text-orange-900 mb-1">
                {language === "pt" 
                  ? "Desbloqueie Conexões Premium de Eventos" 
                  : "Unlock Premium Event Connections"}
              </h5>
              <p className="text-orange-700 text-sm">
                {language === "pt"
                  ? "Membros Premium podem mensagear matches de eventos e receber sugestões personalizadas."
                  : "Premium members can message event matches and receive personalized suggestions."}
              </p>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
              {language === "pt" ? "Upgrade" : "Upgrade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}