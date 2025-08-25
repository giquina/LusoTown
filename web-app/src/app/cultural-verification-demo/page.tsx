'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  StarIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { ShieldCheckIcon as ShieldCheckSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import PortugueseCulturalPhotoVerification, { CulturalPhoto, VerificationResults } from '@/components/matches/PortugueseCulturalPhotoVerification'
import CulturallyVerifiedMatchCard from '@/components/matches/CulturallyVerifiedMatchCard'
import CulturalVerificationIntegration from '@/components/matches/CulturalVerificationIntegration'
import { VerificationBadge } from '@/components/matches/CulturalVerificationBadges'

// Mock data for demo
const MOCK_VERIFIED_PROFILE = {
  id: 'demo_profile_1',
  name: 'Sofia',
  age: 28,
  location: 'Vauxhall',
  profession: 'Lusophone Teacher',
  origin: 'Porto, Portugal',
  interests: ['Fado Music', 'Lusophone Cuisine', 'Santos Populares', 'Travel', 'Photography'],
  bio: 'Apaixonada pela cultura portuguesa e sempre à procura de pessoas que partilhem esta paixão. Adoro noites de fado e fazer pastéis de nata aos fins de semana.',
  image: undefined,
  compatibility: 92,
  eventCompatibility: 88,
  culturalAlignment: 95,
  verificationScore: 94,
  heritageAuthenticity: 96,
  communityInvolvement: 89,
  culturalKnowledge: 91,
  verificationBadges: [
    {
      id: 'heritage_verified',
      name: 'Heritage Verified',
      namePortuguese: 'Herança Verificada',
      description: 'Verified Lusophone cultural heritage through authentic photos',
      descriptionPortuguese: 'Herança cultural portuguesa verificada através de fotos autênticas',
      icon: '🛡️',
      color: 'emerald',
      rarity: 'common' as const,
      category: 'heritage' as const,
      earnedAt: '2024-01-15T10:30:00Z',
      verificationScore: 85
    },
    {
      id: 'santos_populares_champion',
      name: 'Santos Populares Champion',
      namePortuguese: 'Campeã dos Santos Populares',
      description: 'Celebrates Lusophone Saints festivals with passion',
      descriptionPortuguese: 'Celebra as festas dos Santos Populares com paixão',
      icon: '🎊',
      color: 'yellow',
      rarity: 'legendary' as const,
      category: 'events' as const,
      earnedAt: '2024-06-23T18:45:00Z',
      verificationScore: 98
    },
    {
      id: 'fado_lover',
      name: 'Fado Lover',
      namePortuguese: 'Amante do Fado',
      description: 'Deep appreciation for Lusophone Fado music',
      descriptionPortuguese: 'Apreço profundo pela música Fado portuguesa',
      icon: '🎵',
      color: 'slate',
      rarity: 'epic' as const,
      category: 'cultural' as const,
      earnedAt: '2024-03-10T20:15:00Z',
      verificationScore: 92
    }
  ] as VerificationBadge[],
  culturalPhotos: [] as CulturalPhoto[],
  suggestedEvents: [
    {
      id: 'event_1',
      title: 'Noite de Fado Autêntico',
      category: 'Music',
      date: '2024-02-15',
      price: 25
    },
    {
      id: 'event_2',
      title: 'Workshop de Pastéis de Nata',
      category: 'Food',
      date: '2024-02-20',
      price: 35
    }
  ],
  conversationStarters: [
    {
      id: 'starter_1',
      text: 'Qual é a tua memória favorita dos Santos Populares?',
      category: 'Cultural',
      culturalContext: 'Lusophone Festivals',
      popularity: 89
    },
    {
      id: 'starter_2',
      text: 'Where do you find the best pastéis de nata in London?',
      category: 'Food',
      culturalContext: 'Lusophone Cuisine',
      popularity: 76
    }
  ],
  achievements: [],
  isVerified: true,
  responseRate: 95,
  lastActive: '2024-01-20T15:30:00Z'
}

export default function CulturalVerificationDemoPage() {
  const { language } = useLanguage()
  const [userPhotos, setUserPhotos] = useState<CulturalPhoto[]>([])
  const [verificationResults, setVerificationResults] = useState<VerificationResults | null>(null)
  const [activeDemo, setActiveDemo] = useState<'upload' | 'integration' | 'matchcard'>('integration')

  const handlePhotosChange = (photos: CulturalPhoto[]) => {
    setUserPhotos(photos)
  }

  const handleVerificationComplete = (results: VerificationResults) => {
    setVerificationResults(results)
  }

  const demoTabs = [
    {
      id: 'integration' as const,
      title: language === 'pt' ? 'Integração Completa' : 'Full Integration',
      description: language === 'pt' ? 'Sistema completo de verificação' : 'Complete verification system'
    },
    {
      id: 'upload' as const,
      title: language === 'pt' ? 'Upload de Fotos' : 'Photo Upload',
      description: language === 'pt' ? 'Sistema de upload e verificação' : 'Upload and verification system'
    },
    {
      id: 'matchcard' as const,
      title: language === 'pt' ? 'Match Card' : 'Match Card',
      description: language === 'pt' ? 'Perfil verificado culturalmente' : 'Culturally verified profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/matches"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="font-medium">
                  {language === 'pt' ? 'Voltar aos Matches' : 'Back to Matches'}
                </span>
              </Link>
              
              <div className="w-px h-6 bg-gray-300" />
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <ShieldCheckSolid className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {language === 'pt' ? 'Demo: Verificação Cultural Portuguesa' : 'Demo: Lusophone Cultural Verification'}
                  </h1>
                  <p className="text-gray-600">
                    {language === 'pt' 
                      ? 'Sistema inteligente de verificação de autenticidade cultural'
                      : 'Smart cultural authenticity verification system'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">
                  {verificationResults ? Math.round(verificationResults.overallScore) : 0}%
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Verificação' : 'Verified'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {verificationResults ? verificationResults.totalBadges : 0}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Distintivos' : 'Badges'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Overview */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Sistema de Verificação Cultural' : 'Cultural Verification System'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'Revolucione os seus matches com verificação inteligente da autenticidade cultural portuguesa. Aumente a credibilidade, ganhe distintivos e conecte-se com pessoas que realmente partilham a sua herança.'
                  : 'Revolutionize your matches with intelligent Lusophone cultural authenticity verification. Boost credibility, earn badges, and connect with people who truly share your heritage.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-xl">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckSolid className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Verificação Inteligente' : 'Smart Verification'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Sistema inteligente detecta elementos culturais portugueses automaticamente'
                    : 'Smart system automatically detects Lusophone cultural elements'
                  }
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Sistema de Distintivos' : 'Badge System'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Ganhe distintivos únicos por autenticidade cultural e envolvimento na comunidade'
                    : 'Earn unique badges for cultural authenticity and community involvement'
                  }
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Matches Melhorados' : 'Enhanced Matches'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Perfis verificados têm prioridade e melhores taxas de compatibilidade'
                    : 'Verified profiles get priority and better compatibility rates'
                  }
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-b from-pink-50 to-pink-100 rounded-xl">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Confiança da Comunidade' : 'Community Trust'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'Construa confiança na comunidade de falantes de português através da verificação autêntica'
                    : 'Build trust in the Portuguese-speaking community through authentic verification'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {demoTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeDemo === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="text-left">
                  <div className="font-bold">{tab.title}</div>
                  <div className="text-xs opacity-75">{tab.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <div className="space-y-8">
          {activeDemo === 'integration' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <CulturalVerificationIntegration
                userPhotos={userPhotos}
                onPhotosChange={handlePhotosChange}
                showVerificationPrompt={true}
                isUserProfile={true}
                onComplete={handleVerificationComplete}
              />
            </motion.div>
          )}

          {activeDemo === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <PortugueseCulturalPhotoVerification
                photos={userPhotos}
                onPhotosChange={handlePhotosChange}
                onVerificationComplete={handleVerificationComplete}
                maxPhotos={12}
                showVerificationDetails={true}
              />
            </motion.div>
          )}

          {activeDemo === 'matchcard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Perfil Culturalmente Verificado' : 'Culturally Verified Profile'}
                </h3>
                <p className="text-gray-600">
                  {language === 'pt' 
                    ? 'Veja como os perfis verificados aparecem para outros utilizadores'
                    : 'See how verified profiles appear to other users'
                  }
                </p>
              </div>

              <div className="flex justify-center">
                <CulturallyVerifiedMatchCard
                  profile={MOCK_VERIFIED_PROFILE}
                  onLike={(id) => console.log('Liked:', id)}
                  onSkip={(id) => console.log('Skipped:', id)}
                  onSuperLike={(id) => console.log('Super liked:', id)}
                  onStartConversation={(id, starter) => console.log('Start conversation:', id, starter)}
                  onViewCulturalPhotos={(id) => console.log('View cultural photos:', id)}
                  showCulturalDetails={true}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Benefits Summary */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {language === 'pt' ? 'Benefícios da Verificação Cultural' : 'Cultural Verification Benefits'}
              </h3>
              <p className="text-primary-700 max-w-2xl mx-auto">
                {language === 'pt' 
                  ? 'Descubra como a verificação cultural transforma a sua experiência de matches e conexões na comunidade de falantes de português'
                  : 'Discover how cultural verification transforms your matching experience and connections in the Portuguese-speaking community'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Matches de Maior Qualidade' : 'Higher Quality Matches'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'pt' 
                    ? 'Perfis verificados têm 3x mais probabilidade de resultar em conexões autênticas'
                    : 'Verified profiles are 3x more likely to result in authentic connections'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Prioridade na Comunidade' : 'Community Priority'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'pt' 
                    ? 'Apareça primeiro nos resultados de pesquisa e seja destacado em eventos'
                    : 'Appear first in search results and get featured in events'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Confiança Aumentada' : 'Increased Trust'}
                </h4>
                <p className="text-gray-600 text-sm">
                  {language === 'pt' 
                    ? 'Membros confiam mais em perfis com verificação cultural autêntica'
                    : 'Members trust profiles with authentic cultural verification more'
                  }
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {language === 'pt' ? 'Começar Verificação' : 'Start Verification'}
                <ShieldCheckSolid className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}