"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ScaleIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  TrophyIcon,
  SparklesIcon,
  ChartBarIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  CurrencyPoundIcon,
  MapPinIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolid,
  ScaleIcon as ScaleSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import BusinessMatchCard from "./BusinessMatchCard";
import BusinessMatchFilters from "./BusinessMatchFilters";
import PortugueseBusinessConversationStarters from "./PortugueseBusinessConversationStarters";

interface BusinessProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  profession: string;
  company: string;
  industry: string;
  experience: string;
  companySize: string;
  networkingGoals: string[];
  businessInterests: string[];
  origin: string;
  bio: string;
  skills: string[];
  achievements: string[];
  languages: string[];
  isVerified: boolean;
  professionalScore: number;
  culturalAlignment: number;
  businessCompatibility: number;
  responseRate: number;
  lastActive: string;
  portfolioUrl?: string;
  linkedInUrl?: string;
  mentorshipInterest: "mentor" | "mentee" | "peer" | "both";
  availableForMentorship: boolean;
  businessEvents: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    price: number;
  }>;
  conversationStarters: Array<{
    id: string;
    text: string;
    category: string;
    culturalContext: string;
    businessRelevance: string;
    popularity: number;
  }>;
  image?: string;
}

interface BusinessMatch {
  id: string;
  userId: string;
  targetUserId: string;
  compatibilityScore: number;
  businessCompatibility: number;
  culturalAlignment: number;
  professionalAlignment: number;
  sharedInterests: string[];
  sharedGoals: string[];
  isMutual: boolean;
  matchType: "mentorship" | "collaboration" | "networking" | "partnership" | "investment";
  matchedAt?: string;
  profile: BusinessProfile;
}

interface BusinessNetworkingFilters {
  industry: string[];
  companySize: string[];
  experience: string[];
  networkingGoals: string[];
  businessInterests: string[];
  mentorshipType: string[];
  location: string[];
}

interface BusinessNetworkingMatchProps {
  currentUserId?: string;
  onBusinessMatchAction?: (matchId: string, action: 'connect' | 'skip' | 'priority_connect') => void;
  onMentorshipRequest?: (menteeId: string, mentorId: string) => void;
  onBusinessEventBooking?: (eventId: string, matchId?: string) => void;
}

export default function BusinessNetworkingMatch({
  currentUserId = "user1",
  onBusinessMatchAction,
  onMentorshipRequest,
  onBusinessEventBooking,
}: BusinessNetworkingMatchProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [currentMatch, setCurrentMatch] = useState<BusinessMatch | null>(null);
  const [businessMatches, setBusinessMatches] = useState<BusinessMatch[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'discover' | 'mentorship' | 'partnerships' | 'events'>('discover');
  const [filters, setFilters] = useState<BusinessNetworkingFilters>({
    industry: [],
    companySize: [],
    experience: [],
    networkingGoals: [],
    businessInterests: [],
    mentorshipType: [],
    location: [],
  });
  const [businessStats, setBusinessStats] = useState({
    connectionsToday: 0,
    mentorshipRequests: 0,
    businessEventsBooked: 0,
    partnershipOpportunities: 0,
  });

  // Mock data - In production, this would come from API
  useEffect(() => {
    const mockBusinessMatches: BusinessMatch[] = [
      {
        id: "biz-match1",
        userId: currentUserId,
        targetUserId: "biz-user1",
        compatibilityScore: 92,
        businessCompatibility: 95,
        culturalAlignment: 89,
        professionalAlignment: 94,
        sharedInterests: ["FinTech", "Portuguese Market", "UK-Portugal Trade", "Startup Ecosystem"],
        sharedGoals: ["Business Expansion", "Mentorship", "Investment Opportunities"],
        isMutual: false,
        matchType: "mentorship",
        profile: {
          id: "biz-user1",
          name: "Carlos Mendes",
          age: 38,
          location: "City of London",
          profession: "FinTech Entrepreneur",
          company: "LusoFinance",
          industry: "Financial Technology",
          experience: "12+ years",
          companySize: "50-100 employees",
          networkingGoals: ["Mentorship", "Investment", "Partnership"],
          businessInterests: ["FinTech", "Portuguese Market", "Cross-border Payments", "Blockchain"],
          origin: "Lisboa, Portugal",
          bio: "Fundador da LusoFinance, especializada em soluções de pagamento para a comunidade de falantes de português no Reino Unido. Procuro mentorar jovens empreendedores portugueses e expandir para novos mercados.",
          skills: ["Financial Services", "Product Strategy", "Team Leadership", "Fundraising"],
          achievements: ["Series A £5M raised", "100k+ Portuguese users", "Featured in FinTech Times"],
          languages: ["Portuguese (Native)", "English (Fluent)", "Spanish (Conversational)"],
          isVerified: true,
          professionalScore: 95,
          culturalAlignment: 89,
          businessCompatibility: 94,
          responseRate: 88,
          lastActive: "2h ago",
          linkedInUrl: "https://linkedin.com/in/carlosmendes",
          mentorshipInterest: "mentor",
          availableForMentorship: true,
          businessEvents: [
            { id: "be1", title: "FinTech Portuguese Network", category: "Networking", date: "2025-08-30", price: 0 },
            { id: "be2", title: "Portugal-UK Trade Summit", category: "Conference", date: "2025-09-15", price: 150 },
          ],
          conversationStarters: [
            {
              id: "bcs1",
              text: "Vi que fundaste uma FinTech focada na comunidade de falantes de português. Como identificaste esta oportunidade de mercado?",
              category: "Empreendedorismo",
              culturalContext: "Focado no mercado português no Reino Unido",
              businessRelevance: "Estratégia de negócio e identificação de oportunidades",
              popularity: 87,
            },
            {
              id: "bcs2",
              text: "Que desafios enfrentaste ao levantar capital para uma startup FinTech em Londres?",
              category: "Financiamento",
              culturalContext: "Experiência de empreendedor português em Londres",
              businessRelevance: "Fundraising e investor relations",
              popularity: 92,
            },
          ],
        },
      },
      {
        id: "biz-match2",
        userId: currentUserId,
        targetUserId: "biz-user2", 
        compatibilityScore: 89,
        businessCompatibility: 91,
        culturalAlignment: 94,
        professionalAlignment: 88,
        sharedInterests: ["Sustainable Business", "Portuguese Crafts", "E-commerce", "Cultural Heritage"],
        sharedGoals: ["Partnership", "Knowledge Sharing", "Market Expansion"],
        isMutual: true,
        matchType: "collaboration",
        matchedAt: "2025-08-20",
        profile: {
          id: "biz-user2",
          name: "Ana Rodrigues",
          age: 32,
          location: "Portobello Road",
          profession: "Sustainable Fashion Entrepreneur",
          company: "Herança Portuguesa",
          industry: "Fashion & Retail",
          experience: "8+ years",
          companySize: "10-25 employees",
          networkingGoals: ["Partnership", "Knowledge Sharing", "Supplier Network"],
          businessInterests: ["Sustainable Fashion", "Portuguese Crafts", "E-commerce", "Artisan Network"],
          origin: "Porto, Portugal",
          bio: "Fundadora da Herança Portuguesa, uma marca de moda sustentável que promove artesanato tradicional português. Procuro parceiros para expandir o negócio e preservar as tradições portuguesas.",
          skills: ["Sustainable Design", "Artisan Relations", "Brand Strategy", "E-commerce"],
          achievements: ["£500k annual revenue", "Featured in Vogue Portugal", "Sustainability Award 2024"],
          languages: ["Portuguese (Native)", "English (Fluent)", "French (Basic)"],
          isVerified: true,
          professionalScore: 88,
          culturalAlignment: 94,
          businessCompatibility: 91,
          responseRate: 95,
          lastActive: "30min ago",
          portfolioUrl: "https://herancaportuguesa.com",
          mentorshipInterest: "peer",
          availableForMentorship: true,
          businessEvents: [
            { id: "be3", title: "Sustainable Fashion Workshop", category: "Workshop", date: "2025-09-01", price: 85 },
            { id: "be4", title: "Portuguese Artisan Showcase", category: "Exhibition", date: "2025-09-10", price: 25 },
          ],
          conversationStarters: [
            {
              id: "bcs3",
              text: "Adoro o conceito da Herança Portuguesa! Como consegues trabalhar directamente com artesãos em Portugal?",
              category: "Supply Chain",
              culturalContext: "Preservação do artesanato tradicional português",
              businessRelevance: "Gestão da cadeia de fornecimento e relacionamentos",
              popularity: 84,
            },
            {
              id: "bcs4", 
              text: "Que estratégias usas para comunicar a sustentabilidade aos consumidores no mercado britânico?",
              category: "Marketing",
              culturalContext: "Posicionamento de marca portuguesa no Reino Unido",
              businessRelevance: "Brand positioning e marketing estratégico",
              popularity: 79,
            },
          ],
        },
      },
      {
        id: "biz-match3",
        userId: currentUserId,
        targetUserId: "biz-user3",
        compatibilityScore: 87,
        businessCompatibility: 89,
        culturalAlignment: 91,
        professionalAlignment: 85,
        sharedInterests: ["Digital Marketing", "Portuguese Tourism", "Content Creation", "Cultural Events"],
        sharedGoals: ["Collaboration", "Skill Sharing", "Client Referrals"],
        isMutual: false,
        matchType: "networking",
        profile: {
          id: "biz-user3",
          name: "Pedro Silva",
          age: 29,
          location: "Shoreditch",
          profession: "Digital Marketing Specialist",
          company: "Freelance / LusoMedia",
          industry: "Marketing & Communications",
          experience: "5+ years",
          companySize: "Freelance",
          networkingGoals: ["Collaboration", "Skill Sharing", "Client Referrals"],
          businessInterests: ["Digital Marketing", "Portuguese Tourism", "Content Creation", "Social Media"],
          origin: "Braga, Portugal",
          bio: "Especialista em marketing digital com foco na promoção da cultura e turismo português no Reino Unido. Procuro colaborar com outros profissionais portugueses para projetos criativos.",
          skills: ["Digital Strategy", "Content Marketing", "Social Media", "Video Production"],
          achievements: ["500k+ followers generated", "Tourism Portugal campaign", "Google Certified"],
          languages: ["Portuguese (Native)", "English (Fluent)", "Spanish (Intermediate)"],
          isVerified: true,
          professionalScore: 85,
          culturalAlignment: 91,
          businessCompatibility: 89,
          responseRate: 92,
          lastActive: "1h ago",
          portfolioUrl: "https://lusomedia.pt",
          mentorshipInterest: "both",
          availableForMentorship: true,
          businessEvents: [
            { id: "be5", title: "Digital Marketing Masterclass", category: "Workshop", date: "2025-08-28", price: 65 },
            { id: "be6", title: "Portuguese Content Creators Meetup", category: "Networking", date: "2025-09-05", price: 0 },
          ],
          conversationStarters: [
            {
              id: "bcs5",
              text: "Vi o teu trabalho com o Turismo de Portugal. Que estratégias funcionam melhor para promover destinos portugueses no Reino Unido?",
              category: "Turismo Digital",
              culturalContext: "Promoção da cultura portuguesa no mercado britânico",
              businessRelevance: "Marketing de destinos e promoção cultural",
              popularity: 88,
            },
            {
              id: "bcs6",
              text: "Como freelancer português em Londres, que dicas tens para construir uma rede de clientes sólida?",
              category: "Freelancing",
              culturalContext: "Experiência de trabalho independente em Londres",
              businessRelevance: "Desenvolvimento de negócio e networking",
              popularity: 82,
            },
          ],
        },
      },
    ];

    setTimeout(() => {
      setBusinessMatches(mockBusinessMatches);
      setCurrentMatch(mockBusinessMatches[0]);
      setBusinessStats({
        connectionsToday: 5,
        mentorshipRequests: 2,
        businessEventsBooked: 1,
        partnershipOpportunities: 3,
      });
      setLoading(false);
    }, 1000);
  }, [currentUserId]);

  const handleBusinessMatchAction = (profileId: string, action: 'connect' | 'skip' | 'priority_connect') => {
    onBusinessMatchAction?.(profileId, action);
    
    // Move to next match
    if (currentMatchIndex < businessMatches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
      setCurrentMatch(businessMatches[currentMatchIndex + 1]);
    } else {
      setCurrentMatchIndex(0);
      setCurrentMatch(businessMatches[0]);
    }

    // Update business stats
    if (action === 'connect' || action === 'priority_connect') {
      setBusinessStats(prev => ({
        ...prev,
        connectionsToday: prev.connectionsToday + 1,
      }));
    }
  };

  const handleMentorshipRequest = (menteeId: string, mentorId: string) => {
    onMentorshipRequest?.(menteeId, mentorId);
    setBusinessStats(prev => ({
      ...prev,
      mentorshipRequests: prev.mentorshipRequests + 1,
    }));
  };

  const handleBusinessEventBooking = (eventId: string) => {
    onBusinessEventBooking?.(eventId, currentMatch?.id);
    setBusinessStats(prev => ({
      ...prev,
      businessEventsBooked: prev.businessEventsBooked + 1,
    }));
  };

  const filterMatches = (matches: BusinessMatch[]): BusinessMatch[] => {
    return matches.filter(match => {
      if (filters.industry.length > 0 && !filters.industry.includes(match.profile.industry)) return false;
      if (filters.companySize.length > 0 && !filters.companySize.includes(match.profile.companySize)) return false;
      if (filters.experience.length > 0 && !filters.experience.includes(match.profile.experience)) return false;
      if (filters.networkingGoals.length > 0 && 
          !filters.networkingGoals.some(goal => match.profile.networkingGoals.includes(goal))) return false;
      if (filters.businessInterests.length > 0 && 
          !filters.businessInterests.some(interest => match.profile.businessInterests.includes(interest))) return false;
      if (filters.mentorshipType.length > 0 && !filters.mentorshipType.includes(match.profile.mentorshipInterest)) return false;
      if (filters.location.length > 0 && !filters.location.includes(match.profile.location)) return false;
      return true;
    });
  };

  const filteredMatches = filterMatches(businessMatches);
  const mutualBusinessMatches = filteredMatches.filter(m => m.isMutual);
  const mentorshipMatches = filteredMatches.filter(m => m.profile.availableForMentorship);

  const views = [
    {
      id: 'discover' as const,
      label: language === "pt" ? "Descobrir" : "Discover",
      icon: SparklesIcon,
      count: filteredMatches.length,
    },
    {
      id: 'mentorship' as const,
      label: language === "pt" ? "Mentoria" : "Mentorship",
      icon: AcademicCapIcon,
      count: mentorshipMatches.length,
    },
    {
      id: 'partnerships' as const,
      label: language === "pt" ? "Parcerias" : "Partnerships",
      icon: ScaleIcon,
      count: mutualBusinessMatches.length,
    },
    {
      id: 'events' as const,
      label: language === "pt" ? "Eventos" : "Events",
      icon: PresentationChartLineIcon,
      count: 8,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-primary-100 rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-96 bg-primary-50 rounded-2xl"></div>
              <div className="h-96 bg-primary-50 rounded-2xl"></div>
              <div className="h-96 bg-primary-50 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl">
              <BriefcaseIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-900">
                {language === "pt" ? "Networking Profissional Português" : "Portuguese Professional Networking"}
              </h1>
              <p className="text-primary-600">
                {language === "pt" 
                  ? "Conecte-se com profissionais portugueses para crescimento de carreira e oportunidades de negócio"
                  : "Connect with Portuguese professionals for career growth and business opportunities"}
              </p>
            </div>
          </div>

          {/* Business Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100 mb-6">
            <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-secondary-500" />
              {language === "pt" ? "Atividade Profissional de Hoje" : "Today's Professional Activity"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{businessStats.connectionsToday}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Conexões Feitas" : "Connections Made"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{businessStats.mentorshipRequests}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Pedidos Mentoria" : "Mentorship Requests"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{businessStats.businessEventsBooked}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Eventos Marcados" : "Events Booked"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">{businessStats.partnershipOpportunities}</div>
                <div className="text-sm text-primary-600">
                  {language === "pt" ? "Oportunidades" : "Opportunities"}
                </div>
              </div>
            </div>
          </div>

          {/* View Navigation */}
          <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-primary-100 overflow-x-auto mb-6">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeView === view.id
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                      : "text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {view.label}
                  {view.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeView === view.id
                        ? "bg-white/20 text-white"
                        : "bg-primary-100 text-primary-700"
                    }`}>
                      {view.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <BusinessMatchFilters
              filters={filters}
              onFiltersChange={setFilters}
              totalMatches={businessMatches.length}
              filteredMatches={filteredMatches.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeView === 'discover' && currentMatch && (
                <motion.div
                  key="discover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  <div>
                    <BusinessMatchCard
                      profile={currentMatch.profile}
                      matchType={currentMatch.matchType}
                      compatibilityScore={currentMatch.compatibilityScore}
                      businessCompatibility={currentMatch.businessCompatibility}
                      culturalAlignment={currentMatch.culturalAlignment}
                      onConnect={(profileId) => handleBusinessMatchAction(profileId, 'connect')}
                      onSkip={(profileId) => handleBusinessMatchAction(profileId, 'skip')}
                      onPriorityConnect={(profileId) => handleBusinessMatchAction(profileId, 'priority_connect')}
                      onMentorshipRequest={(menteeId, mentorId) => handleMentorshipRequest(menteeId, mentorId)}
                      showBusinessEvents={true}
                      showConversationStarters={true}
                    />
                  </div>
                  
                  <div>
                    <PortugueseBusinessConversationStarters
                      profile={currentMatch.profile}
                      onStartConversation={(starterId) => {
                        // Handle business conversation start
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {activeView === 'mentorship' && (
                <motion.div
                  key="mentorship"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
                    <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                      <AcademicCapIcon className="w-6 h-6 text-secondary-500" />
                      {language === "pt" ? "Oportunidades de Mentoria" : "Mentorship Opportunities"}
                    </h3>
                    
                    {mentorshipMatches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mentorshipMatches.map((match) => (
                          <div
                            key={match.id}
                            className="border border-primary-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                                👤
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-primary-900">
                                  {match.profile.name}, {match.profile.age}
                                </h4>
                                <p className="text-sm text-primary-600">
                                  {match.profile.profession} • {match.profile.company}
                                </p>
                                <p className="text-xs text-secondary-600">
                                  {match.profile.experience} • {match.profile.mentorshipInterest}
                                </p>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-secondary-800">{match.businessCompatibility}%</div>
                                <div className="text-xs text-secondary-600">
                                  {language === "pt" ? "Match" : "Match"}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <h5 className="text-sm font-semibold text-primary-900">
                                {language === "pt" ? "Competências:" : "Skills:"}
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {match.profile.skills.slice(0, 3).map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleMentorshipRequest(currentUserId, match.profile.id)}
                                className="flex-1 bg-gradient-to-r from-secondary-600 to-accent-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all"
                              >
                                {language === "pt" ? "Solicitar Mentoria" : "Request Mentorship"}
                              </button>
                              <button className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                                <UserGroupIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AcademicCapIcon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h4 className="font-semibold text-primary-900 mb-2">
                          {language === "pt" ? "Nenhuma oportunidade de mentoria encontrada" : "No mentorship opportunities found"}
                        </h4>
                        <p className="text-primary-600 text-sm">
                          {language === "pt"
                            ? "Ajuste os filtros para encontrar mentores ou mentorandos na sua área."
                            : "Adjust filters to find mentors or mentees in your field."}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeView === 'partnerships' && (
                <motion.div
                  key="partnerships"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
                    <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                      <ScaleSolid className="w-6 h-6 text-secondary-500" />
                      {language === "pt" ? "Suas Parcerias de Negócio" : "Your Business Partnerships"}
                    </h3>
                    
                    {mutualBusinessMatches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mutualBusinessMatches.map((match) => (
                          <div
                            key={match.id}
                            className="border border-primary-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                                👤
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-primary-900">
                                  {match.profile.name}
                                </h4>
                                <p className="text-sm text-primary-600">
                                  {match.profile.profession} • {match.profile.company}
                                </p>
                                <p className="text-xs text-secondary-600">
                                  {match.profile.industry}
                                </p>
                              </div>
                              <div className="text-green-500">
                                <ScaleSolid className="w-5 h-5" />
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <h5 className="text-sm font-semibold text-primary-900">
                                {language === "pt" ? "Objetivos Partilhados:" : "Shared Goals:"}
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {match.sharedGoals.slice(0, 2).map((goal, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    {goal}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all">
                                {language === "pt" ? "Colaborar" : "Collaborate"}
                              </button>
                              <button 
                                onClick={() => handleBusinessEventBooking(match.profile.businessEvents[0]?.id)}
                                className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                              >
                                <PresentationChartLineIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ScaleIcon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h4 className="font-semibold text-primary-900 mb-2">
                          {language === "pt" ? "Nenhuma parceria estabelecida ainda" : "No partnerships established yet"}
                        </h4>
                        <p className="text-primary-600 text-sm">
                          {language === "pt"
                            ? "Continue fazendo conexões para estabelecer as suas primeiras parcerias de negócio!"
                            : "Keep making connections to establish your first business partnerships!"}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeView === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
                    <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                      <PresentationChartLineIcon className="w-6 h-6 text-secondary-500" />
                      {language === "pt" ? "Eventos de Networking Português" : "Portuguese Networking Events"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Mock business events */}
                      {[
                        {
                          id: "bev1",
                          title: language === "pt" ? "Portugal-UK Business Summit" : "Portugal-UK Business Summit",
                          category: language === "pt" ? "Conferência" : "Conference",
                          date: "2025-09-15",
                          price: 150,
                          attendees: 45,
                          type: "Premium",
                        },
                        {
                          id: "bev2", 
                          title: language === "pt" ? "FinTech Portuguese Network" : "FinTech Portuguese Network",
                          category: language === "pt" ? "Networking" : "Networking",
                          date: "2025-08-30",
                          price: 0,
                          attendees: 28,
                          type: "Free",
                        },
                        {
                          id: "bev3",
                          title: language === "pt" ? "Sustainable Business Workshop" : "Sustainable Business Workshop",
                          category: language === "pt" ? "Workshop" : "Workshop", 
                          date: "2025-09-01",
                          price: 85,
                          attendees: 22,
                          type: "Workshop",
                        },
                      ].map((event) => (
                        <div
                          key={event.id}
                          className="border border-primary-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                              event.type === 'Premium' ? 'bg-premium-100 text-premium-700' :
                              event.type === 'Free' ? 'bg-green-100 text-green-700' :
                              'bg-primary-100 text-primary-700'
                            }`}>
                              {event.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-primary-600">
                              <UserGroupIcon className="w-3 h-3" />
                              {event.attendees}
                            </div>
                          </div>

                          <h4 className="font-bold text-primary-900 mb-2 text-sm">
                            {event.title}
                          </h4>

                          <div className="flex items-center justify-between text-xs text-primary-600 mb-4">
                            <span>{event.date}</span>
                            <span className="font-semibold">
                              {event.price === 0 ? (language === "pt" ? "Grátis" : "Free") : `£${event.price}`}
                            </span>
                          </div>

                          <button 
                            onClick={() => handleBusinessEventBooking(event.id)}
                            className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                          >
                            {language === "pt" ? "Reservar" : "Book Now"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Premium Business Features Footer */}
        {!hasActiveSubscription && (
          <div className="mt-8 bg-gradient-to-r from-premium-50 to-secondary-50 border border-premium-200 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-premium-500 to-secondary-500 rounded-xl">
                <TrophyIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-premium-900 mb-2">
                  {language === "pt" 
                    ? "Desbloqueie Networking Profissional Premium" 
                    : "Unlock Premium Professional Networking"}
                </h4>
                <p className="text-premium-700 text-sm">
                  {language === "pt"
                    ? "Membros Premium têm acesso a conexões ilimitadas, eventos exclusivos, mentorship priority e oportunidades de investimento."
                    : "Premium members get unlimited connections, exclusive events, priority mentorship and investment opportunities."}
                </p>
              </div>
              <button className="bg-gradient-to-r from-premium-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-premium-700 hover:to-secondary-700 transition-all shadow-lg">
                {language === "pt" ? "Upgrade Premium" : "Upgrade Premium"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}