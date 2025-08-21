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

// Mock recent activities with Portuguese cultural context
const mockActivities: CommunityActivity[] = [
  {
    id: '1',
    type: 'cultural_moment',
    title: { 
      en: 'Fado Performance at Kentish Town', 
      pt: 'Apresentação de Fado em Kentish Town' 
    },
    description: { 
      en: 'Maria shared photos from last night\'s intimate fado performance', 
      pt: 'Maria partilhou fotos da apresentação íntima de fado de ontem à noite' 
    },
    actor: {
      name: 'Maria Santos',
      location: 'Kentish Town',
      region: 'Porto',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    metadata: {
      culturalTag: 'fado',
      rating: 5
    },
    trustScore: 95,
    verified: true
  },
  {
    id: '2',
    type: 'event_created',
    title: { 
      en: 'Pastéis de Nata Workshop This Saturday', 
      pt: 'Workshop de Pastéis de Nata Este Sábado' 
    },
    description: { 
      en: 'Traditional Portuguese baking workshop in Borough Market', 
      pt: 'Workshop tradicional de pastelaria portuguesa no Borough Market' 
    },
    actor: {
      name: 'João Silva',
      location: 'Borough Market',
      region: 'Lisboa',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    metadata: {
      eventType: 'gastronomia'
    },
    trustScore: 92,
    verified: true
  },
  {
    id: '3',
    type: 'member_joined',
    title: { 
      en: 'New member from São Paulo', 
      pt: 'Novo membro de São Paulo' 
    },
    description: { 
      en: 'Ana joined looking for Brazilian community events in Vauxhall', 
      pt: 'Ana juntou-se procurando eventos da comunidade brasileira em Vauxhall' 
    },
    actor: {
      name: 'Ana Pereira',
      location: 'Vauxhall',
      region: 'São Paulo',
      flag: '🇧🇷'
    },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    trustScore: 88,
    verified: false
  },
  {
    id: '4',
    type: 'business_added',
    title: { 
      en: 'New Portuguese Restaurant in Stockwell', 
      pt: 'Novo Restaurante Português em Stockwell' 
    },
    description: { 
      en: 'Casa do Bacalhau brings authentic Portuguese flavors to South London', 
      pt: 'Casa do Bacalhau traz sabores portugueses autênticos ao Sul de Londres' 
    },
    actor: {
      name: 'Carlos Mendes',
      location: 'Stockwell',
      region: 'Aveiro',
      flag: '🇵🇹'
    },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    metadata: {
      businessCategory: 'restaurant'
    },
    trustScore: 90,
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust & Safety Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "pt" ? "Confiança e Segurança Cultural" : "Cultural Trust & Safety"}
            </h2>
            <p className="text-gray-600">
              {language === "pt" 
                ? "Nossa comunidade prioriza a autenticidade e sensibilidade cultural portuguesa"
                : "Our community prioritizes authenticity and Portuguese cultural sensitivity"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{indicator.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {language === "pt" ? indicator.name.pt : indicator.name.en}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${indicator.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-primary-600">{indicator.score}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
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
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {language === "pt" ? "Atividade da Comunidade" : "Community Activity"}
              </h2>
              <p className="text-gray-600 flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-4 h-4 text-primary-500" />
                {language === "pt" 
                  ? "Últimas atualizações da nossa comunidade lusófona"
                  : "Latest updates from our Portuguese community"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {activities.length}
              </div>
              <div className="text-xs text-gray-600">
                {language === "pt" ? "atividades hoje" : "activities today"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Activity Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {language === "pt" ? activity.title.pt : activity.title.en}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {language === "pt" ? activity.description.pt : activity.description.en}
                        </p>
                      </div>
                      {activity.verified && (
                        <CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Actor Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{activity.actor.flag}</span>
                        <span className="font-medium">{activity.actor.name}</span>
                        <span>•</span>
                        <span>{activity.actor.region}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{activity.actor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{formatTimeAgo(activity.timestamp)}</span>
                      </div>
                    </div>

                    {/* Trust Score */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {language === "pt" ? "Confiança:" : "Trust:"}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1.5 rounded-full"
                              style={{ width: `${activity.trustScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-primary-600">
                            {activity.trustScore}%
                          </span>
                        </div>
                      </div>

                      {/* Cultural Tags */}
                      {activity.metadata?.culturalTag && (
                        <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                          #{activity.metadata.culturalTag}
                        </span>
                      )}
                      {activity.metadata?.rating && (
                        <div className="flex items-center gap-1">
                          {Array(activity.metadata.rating).fill(0).map((_, i) => (
                            <StarIcon key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fresh Content Indicators */}
          <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
            <div className="text-center">
              <h3 className="font-bold text-gray-900 mb-2">
                {language === "pt" ? "🔥 Comunidade Ativa" : "🔥 Active Community"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-primary-500" />
                  <span className="text-gray-700">
                    {language === "pt" ? "24 conversas ativas hoje" : "24 active conversations today"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 text-secondary-500" />
                  <span className="text-gray-700">
                    {language === "pt" ? "8 novos eventos esta semana" : "8 new events this week"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <UsersIcon className="w-4 h-4 text-accent-500" />
                  <span className="text-gray-700">
                    {language === "pt" ? "15 novos membros hoje" : "15 new members today"}
                  </span>
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