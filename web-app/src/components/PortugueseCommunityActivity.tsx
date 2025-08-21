"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  ClockIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { useHeritage } from "@/context/HeritageContext";

interface CommunityActivity {
  id: string;
  type: 'event_created' | 'member_joined' | 'review_posted' | 'photo_shared' | 'business_added' | 'cultural_moment';
  title: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  actor: {
    name: string;
    location: string;
    region: string;
    flag: string;
  };
  timestamp: Date;
  metadata?: {
    eventType?: string;
    businessCategory?: string;
    rating?: number;
    culturalTag?: string;
  };
  trustScore: number; // 0-100
  verified: boolean;
}

interface TrustIndicator {
  id: string;
  name: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  icon: string;
  score: number;
  culturalContext: {
    en: string;
    pt: string;
  };
}

// Generate dynamic trust indicators based on heritage
function generateTrustIndicators(heritage: any): TrustIndicator[] {
  return [
    {
      id: 'cultural_understanding',
      name: { en: 'Cultural Understanding', pt: 'Compreensão Cultural' },
      description: { en: `Deep appreciation for ${heritage.identity.name} heritage`, pt: `Apreço profundo pela herança ${heritage.identity.name.toLowerCase()}` },
      icon: heritage.branding.symbols.flag,
      score: 98,
      culturalContext: { 
        en: `Members understand ${heritage.culture.values.join(', ')} and ${heritage.identity.name} values`,
        pt: `Membros compreendem ${heritage.culture.values.join(', ')} e valores ${heritage.identity.name.toLowerCase()}s`
      }
    },
    {
      id: 'community_moderation',
      name: { en: 'Community Moderation', pt: 'Moderação Comunitária' },
      description: { en: `${heritage.identity.name}-speaking moderators ensure cultural sensitivity`, pt: 'Moderadores nativos garantem sensibilidade cultural' },
      icon: '🛡️',
      score: 96,
      culturalContext: {
        en: `Moderation by ${heritage.identity.name} speakers who understand cultural nuances`,
        pt: 'Moderação por falantes nativos que compreendem nuances culturais'
      }
    },
    {
      id: 'verified_heritage',
      name: { en: 'Verified Heritage', pt: 'Herança Verificada' },
      description: { en: `Authentic ${heritage.identity.name} connections verified`, pt: `Conexões ${heritage.identity.name.toLowerCase()} autênticas verificadas` },
      icon: '✅',
      score: 94,
      culturalContext: {
        en: `Members with genuine ${heritage.identity.name}${heritage.geography.relatedCountries ? '/' + heritage.geography.relatedCountries.map(c => c.name.split(' ')[0]).join('/') : ''} backgrounds`,
        pt: `Membros com origens genuinamente ${heritage.identity.name.toLowerCase()}s`
      }
    },
    {
      id: 'cultural_events',
      name: { en: 'Cultural Events', pt: 'Eventos Culturais' },
      description: { en: `Authentic ${heritage.identity.name} cultural experiences`, pt: `Experiências culturais ${heritage.identity.name.toLowerCase()} autênticas` },
      icon: '🎉',
      score: 97,
      culturalContext: {
        en: `Real ${heritage.culture.music[0] || 'traditional music'} nights, ${heritage.culture.traditions[0] || 'cultural celebrations'}, and traditional celebrations`,
        pt: `Verdadeiras noites de ${heritage.culture.music[0] || 'música tradicional'}, ${heritage.culture.traditions[0] || 'celebrações culturais'} e celebrações tradicionais`
      }
    }
  ]
}

// Showcase LusoTown benefits through real community activities
const mockActivities: CommunityActivity[] = [
  {
    id: '1',
    type: 'member_joined',
    title: { 
      en: 'Found Portuguese Speaking Driver', 
      pt: 'Encontrou Motorista que Fala Português' 
    },
    description: { 
      en: 'Ana found a verified Portuguese-speaking luxury driver for airport transfers', 
      pt: 'Ana encontrou um motorista de luxo verificado que fala português para transfers do aeroporto' 
    },
    actor: {
      name: 'Ana Costa',
      location: 'Heathrow Terminal 5',
      region: 'Minho',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    metadata: {
      eventType: 'transport',
      rating: 5
    },
    trustScore: 98,
    verified: true
  },
  {
    id: '2',
    type: 'event_created',
    title: { 
      en: 'Premium Match Success: Found Life Partner', 
      pt: 'Sucesso Premium Match: Encontrou Parceiro de Vida' 
    },
    description: { 
      en: 'Miguel & Sofia met through LusoTown Premium Matching and are now engaged!', 
      pt: 'Miguel e Sofia conheceram-se através do LusoTown Premium Matching e agora estão noivos!' 
    },
    actor: {
      name: 'Miguel & Sofia',
      location: 'Vauxhall Portuguese Centre',
      region: 'Porto & Lisboa',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    metadata: {
      eventType: 'premium_matching',
      rating: 5
    },
    trustScore: 96,
    verified: true
  },
  {
    id: '3',
    type: 'cultural_moment',
    title: { 
      en: 'LusoTown TV: Business Networking Success', 
      pt: 'LusoTown TV: Sucesso de Networking Empresarial' 
    },
    description: { 
      en: 'Carlos started his Portuguese catering business after meeting investors on LusoTown TV livestream', 
      pt: 'Carlos começou o seu negócio de catering português depois de conhecer investidores no livestream LusoTown TV' 
    },
    actor: {
      name: 'Carlos Rodrigues',
      location: 'Elephant & Castle',
      region: 'Açores',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    metadata: {
      culturalTag: 'business_success',
      rating: 5
    },
    trustScore: 94,
    verified: true
  },
  {
    id: '4',
    type: 'review_posted',
    title: { 
      en: 'Student Housing Success: University Partnership', 
      pt: 'Sucesso em Habitação Estudantil: Parceria Universitária' 
    },
    description: { 
      en: 'Beatriz found Portuguese-speaking flatmates through LusoTown\'s King\'s College partnership program', 
      pt: 'Beatriz encontrou colegas de casa que falam português através do programa de parceria do LusoTown com King\'s College' 
    },
    actor: {
      name: 'Beatriz Lima',
      location: 'King\'s College London',
      region: 'Braga',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
    metadata: {
      eventType: 'student_services',
      rating: 5
    },
    trustScore: 97,
    verified: true
  }
];

const PortugueseCommunityActivity: React.FC = () => {
  const { language } = useLanguage();
  const { heritage } = useHeritage();
  const [activities, setActivities] = useState<CommunityActivity[]>([]);
  const [loading, setLoading] = useState(true);
  
  const trustIndicators = generateTrustIndicators(heritage);

  useEffect(() => {
    // Simulate loading activities
    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours >= 24) {
      const diffDays = Math.floor(diffHours / 24);
      return language === 'pt' 
        ? `${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`
        : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours >= 1) {
      return language === 'pt' 
        ? `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`
        : `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return language === 'pt' 
        ? `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`
        : `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  };

  const getActivityIcon = (type: CommunityActivity['type']) => {
    const iconMap = {
      'event_created': <CalendarDaysIcon className="w-5 h-5" />,
      'member_joined': <UsersIcon className="w-5 h-5" />,
      'review_posted': <StarIcon className="w-5 h-5" />,
      'photo_shared': <SparklesIcon className="w-5 h-5" />,
      'business_added': <MapPinIcon className="w-5 h-5" />,
      'cultural_moment': <HeartIcon className="w-5 h-5" />
    };
    return iconMap[type] || <SparklesIcon className="w-5 h-5" />;
  };

  const getActivityColor = (type: CommunityActivity['type']) => {
    const colorMap = {
      'event_created': 'from-primary-500 to-secondary-500',
      'member_joined': 'from-secondary-500 to-accent-500',
      'review_posted': 'from-accent-500 to-coral-500',
      'photo_shared': 'from-coral-500 to-primary-500',
      'business_added': 'from-primary-500 to-accent-500',
      'cultural_moment': 'from-secondary-500 to-coral-500'
    };
    return colorMap[type] || 'from-primary-500 to-secondary-500';
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust & Safety Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-4">
              <SparklesIcon className="w-5 h-5 text-primary-600" />
              <span className="text-primary-700 font-semibold text-sm">
                {language === "pt" ? "Comunidade Verificada" : "Verified Community"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
              {language === "pt" ? "Confiança e Segurança Cultural" : "Cultural Trust & Safety"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === "pt" 
                ? "Nossa comunidade prioriza a autenticidade e sensibilidade cultural portuguesa"
                : "Our community prioritizes authenticity and Portuguese cultural sensitivity"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100/50 to-secondary-100/50 rounded-full blur-xl transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {indicator.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-900 text-base mb-2">
                      {language === "pt" ? indicator.name.pt : indicator.name.en}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-primary-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 h-3 rounded-full transition-all duration-1000 group-hover:animate-pulse"
                          style={{ width: `${indicator.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">{indicator.score}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed relative z-10">
                  {language === "pt" ? indicator.culturalContext.pt : indicator.culturalContext.en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Community Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-accent-100 px-4 py-2 rounded-full mb-4">
                <ArrowTrendingUpIcon className="w-5 h-5 text-secondary-600" />
                <span className="text-secondary-700 font-semibold text-sm">
                  {language === "pt" ? "Ao Vivo" : "Live Updates"}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                {language === "pt" ? "Atividade da Comunidade" : "Community Activity"}
              </h2>
              <p className="text-gray-600 text-lg">
                {language === "pt" 
                  ? "Últimas atualizações da nossa comunidade lusófona"
                  : "Latest updates from our Portuguese community"}
              </p>
            </div>
            <div className="text-right bg-white rounded-2xl p-6 shadow-lg border border-primary-200">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {activities.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {language === "pt" ? "atividades hoje" : "activities today"}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white border border-primary-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-start gap-6 relative z-10">
                  {/* Activity Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-primary-900 text-xl">
                            {language === "pt" ? activity.title.pt : activity.title.en}
                          </h3>
                          {activity.verified && (
                            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                              <CheckBadgeIcon className="w-4 h-4 text-green-600" />
                              <span className="text-green-700 text-xs font-semibold">
                                {language === "pt" ? "Verificado" : "Verified"}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {language === "pt" ? activity.description.pt : activity.description.en}
                        </p>
                      </div>
                    </div>

                    {/* Actor Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 px-3 py-2 rounded-full">
                        <span className="text-lg">{activity.actor.flag}</span>
                        <span className="font-bold text-primary-900">{activity.actor.name}</span>
                        <span className="text-primary-400">•</span>
                        <span className="text-primary-700 font-medium">{activity.actor.region}</span>
                      </div>
                      <div className="flex items-center gap-1 text-secondary-600">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="font-medium">{activity.actor.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent-600">
                        <ClockIcon className="w-4 h-4" />
                        <span className="font-medium">{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                    </div>

                    {/* Trust Score & Metadata */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-primary-200 shadow-sm">
                        <span className="text-sm text-primary-700 font-medium">
                          {language === "pt" ? "Confiança:" : "Trust:"}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-primary-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${activity.trustScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            {activity.trustScore}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Cultural Tags */}
                        {activity.metadata?.culturalTag && (
                          <span className="px-3 py-1 bg-gradient-to-r from-accent-100 to-coral-100 text-accent-700 text-sm font-semibold rounded-full border border-accent-200">
                            #{activity.metadata.culturalTag}
                          </span>
                        )}
                        {activity.metadata?.rating && (
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                            {Array(activity.metadata.rating).fill(0).map((_, i) => (
                              <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fresh Content Indicators */}
          <div className="mt-12 relative">
            <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-xl transform -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl transform translate-x-16 translate-y-16"></div>
              
              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                  <FireIcon className="w-6 h-6 text-yellow-300" />
                  <h3 className="font-bold text-white text-xl">
                    {language === "pt" ? "Comunidade Ativa" : "Active Community"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">24</div>
                    <span className="text-white/90 text-sm font-medium">
                      {language === "pt" ? "conversas ativas hoje" : "active conversations today"}
                    </span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <CalendarDaysIcon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">8</div>
                    <span className="text-white/90 text-sm font-medium">
                      {language === "pt" ? "novos eventos esta semana" : "new events this week"}
                    </span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <UsersIcon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">15</div>
                    <span className="text-white/90 text-sm font-medium">
                      {language === "pt" ? "novos membros hoje" : "new members today"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortugueseCommunityActivity;