'use client'

import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Heart, 
  Users, 
  MapPin, 
  Briefcase, 
  Globe, 
  Calendar,
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react'

export default function MatchingAlgorithm() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Intelligent Portuguese Community Matching',
      subtitle: 'Our AI-powered algorithm connects you with compatible Portuguese speakers',
      
      factors: {
        title: 'Matching Factors',
        cultural: {
          name: 'Cultural Compatibility',
          description: 'Portuguese heritage, traditions, and cultural values alignment',
          weight: '25%'
        },
        professional: {
          name: 'Professional Synergy',
          description: 'Career field, experience level, and business networking potential',
          weight: '20%'
        },
        location: {
          name: 'Geographic Proximity',
          description: 'London area, commute distance, and local community connections',
          weight: '15%'
        },
        interests: {
          name: 'Shared Interests',
          description: 'Hobbies, activities, and Portuguese community involvement',
          weight: '20%'
        },
        goals: {
          name: 'Relationship Goals',
          description: 'Friendship, professional networking, or cultural exchange intentions',
          weight: '10%'
        },
        lifestyle: {
          name: 'Lifestyle Compatibility',
          description: 'Family status, age range, and life stage alignment',
          weight: '10%'
        }
      },
      
      process: {
        title: 'How Matching Works',
        steps: [
          {
            title: 'Profile Analysis',
            description: 'We analyze your interests, background, and preferences to understand your Portuguese community identity.'
          },
          {
            title: 'Community Mapping',
            description: 'Our algorithm maps connections within the London Portuguese community and identifies potential matches.'
          },
          {
            title: 'Compatibility Scoring',
            description: 'Each potential match receives a compatibility score based on multiple cultural and personal factors.'
          },
          {
            title: 'Smart Recommendations',
            description: 'We present your best matches with detailed explanations of why you\'re compatible.'
          }
        ]
      },
      
      features: {
        title: 'Premium Matching Features',
        ai: 'AI-powered cultural compatibility analysis',
        learning: 'Machine learning from Portuguese community patterns',
        realtime: 'Real-time updates based on community activity',
        privacy: 'Privacy-first approach with secure data handling'
      }
    },
    
    pt: {
      title: 'Matching Inteligente da Comunidade Portuguesa',
      subtitle: 'O nosso algoritmo com IA conecta-o com portugueses compatíveis',
      
      factors: {
        title: 'Fatores de Matching',
        cultural: {
          name: 'Compatibilidade Cultural',
          description: 'Património português, tradições e alinhamento de valores culturais',
          weight: '25%'
        },
        professional: {
          name: 'Sinergia Profissional',
          description: 'Área de carreira, nível de experiência e potencial de networking empresarial',
          weight: '20%'
        },
        location: {
          name: 'Proximidade Geográfica',
          description: 'Área de Londres, distância de deslocação e conexões da comunidade local',
          weight: '15%'
        },
        interests: {
          name: 'Interesses Partilhados',
          description: 'Hobbies, atividades e envolvimento na comunidade portuguesa',
          weight: '20%'
        },
        goals: {
          name: 'Objetivos de Relacionamento',
          description: 'Intenções de amizade, networking profissional ou intercâmbio cultural',
          weight: '10%'
        },
        lifestyle: {
          name: 'Compatibilidade de Estilo de Vida',
          description: 'Estado familiar, faixa etária e alinhamento de fase da vida',
          weight: '10%'
        }
      },
      
      process: {
        title: 'Como Funciona o Matching',
        steps: [
          {
            title: 'Análise de Perfil',
            description: 'Analisamos os seus interesses, origem e preferências para compreender a sua identidade na comunidade portuguesa.'
          },
          {
            title: 'Mapeamento da Comunidade',
            description: 'O nosso algoritmo mapeia conexões dentro da comunidade portuguesa de Londres e identifica potenciais matches.'
          },
          {
            title: 'Pontuação de Compatibilidade',
            description: 'Cada potencial match recebe uma pontuação de compatibilidade baseada em múltiplos fatores culturais e pessoais.'
          },
          {
            title: 'Recomendações Inteligentes',
            description: 'Apresentamos os seus melhores matches com explicações detalhadas sobre a compatibilidade.'
          }
        ]
      },
      
      features: {
        title: 'Funcionalidades Premium de Matching',
        ai: 'Análise de compatibilidade cultural com IA',
        learning: 'Machine learning de padrões da comunidade portuguesa',
        realtime: 'Atualizações em tempo real baseadas na atividade da comunidade',
        privacy: 'Abordagem privacy-first com tratamento seguro de dados'
      }
    }
  }

  const t = translations[language]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-8 w-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-neutral-900">{t.title}</h2>
          <Sparkles className="h-8 w-8 text-accent-500" />
        </div>
        <p className="text-neutral-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </motion.div>

      {/* Matching Factors Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h3 className="text-xl font-semibold text-neutral-900 mb-6 text-center">{t.factors.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              data: t.factors.cultural,
              color: 'coral'
            },
            {
              icon: Briefcase,
              data: t.factors.professional,
              color: 'primary'
            },
            {
              icon: MapPin,
              data: t.factors.location,
              color: 'secondary'
            },
            {
              icon: Users,
              data: t.factors.interests,
              color: 'accent'
            },
            {
              icon: Target,
              data: t.factors.goals,
              color: 'premium'
            },
            {
              icon: Calendar,
              data: t.factors.lifestyle,
              color: 'neutral'
            }
          ].map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-neutral-50 p-6 rounded-xl border border-neutral-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <factor.icon className={`h-6 w-6 text-${factor.color}-600`} />
                <div>
                  <h4 className="font-semibold text-neutral-900">{factor.data.name}</h4>
                  <span className={`text-sm font-medium text-${factor.color}-600`}>{factor.data.weight}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-600">{factor.data.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Process Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-xl font-semibold text-neutral-900 mb-6 text-center">{t.process.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-xl border-2 border-primary-200 text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">{step.title}</h4>
                <p className="text-sm text-neutral-600">{step.description}</p>
              </div>
              
              {index < t.process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-primary-300"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-primary-300 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent absolute -right-1.5 top-1/2 transform -translate-y-1/2"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Premium Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-premium-50 to-accent-50 p-6 rounded-xl border border-premium-200"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 text-center flex items-center justify-center gap-2">
          <TrendingUp className="h-5 w-5 text-premium-600" />
          {t.features.title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Brain, text: t.features.ai },
            { icon: TrendingUp, text: t.features.learning },
            { icon: Globe, text: t.features.realtime },
            { icon: Target, text: t.features.privacy }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <feature.icon className="h-5 w-5 text-premium-600 flex-shrink-0" />
              <span className="text-sm text-neutral-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}