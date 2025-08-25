'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheckIcon,
  PhotoIcon,
  StarIcon,
  TrophyIcon,
  SparklesIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CameraIcon,
  HeartIcon,
  FireIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import {
  ShieldCheckIcon as ShieldCheckSolid,
  StarIcon as StarSolid,
  CheckBadgeIcon
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { toast } from 'react-hot-toast'
import PortugueseCulturalPhotoVerification, { CulturalPhoto, VerificationResults } from './PortugueseCulturalPhotoVerification'
import CulturalVerificationBadges, { VerificationBadge } from './CulturalVerificationBadges'
import CulturalPhotoGallery from './CulturalPhotoGallery'

interface CulturalVerificationIntegrationProps {
  userPhotos?: CulturalPhoto[]
  onPhotosChange?: (photos: CulturalPhoto[]) => void
  showVerificationPrompt?: boolean
  isUserProfile?: boolean
  onComplete?: (results: VerificationResults) => void
}

interface VerificationStep {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: React.ComponentType<{ className?: string }>
  completed: boolean
  required: boolean
  points: number
}

const VERIFICATION_STEPS: VerificationStep[] = [
  {
    id: 'heritage_photos',
    title: 'Heritage Photos',
    titlePortuguese: 'Fotos de Herança',
    description: 'Upload photos showing Lusophone cultural heritage',
    descriptionPortuguese: 'Carregue fotos que mostrem herança cultural portuguesa',
    icon: PhotoIcon,
    completed: false,
    required: true,
    points: 25
  },
  {
    id: 'event_photos',
    title: 'Event Photos',
    titlePortuguese: 'Fotos de Eventos',
    description: 'Share photos from Lusophone cultural events',
    descriptionPortuguese: 'Partilhe fotos de eventos culturais portugueses',
    icon: SparklesIcon,
    completed: false,
    required: true,
    points: 30
  },
  {
    id: 'cuisine_photos',
    title: 'Cuisine Photos',
    titlePortuguese: 'Fotos de Culinária',
    description: 'Show your appreciation for Portuguese cuisine',
    descriptionPortuguese: 'Mostre o seu apreço pela culinária portuguesa',
    icon: HeartIcon,
    completed: false,
    required: false,
    points: 20
  },
  {
    id: 'community_photos',
    title: 'Community Photos',
    titlePortuguese: 'Fotos da Comunidade',
    description: 'Demonstrate involvement in Portuguese-speaking community',
    descriptionPortuguese: 'Demonstre envolvimento na comunidade de falantes de português',
    icon: UserGroupIcon,
    completed: false,
    required: false,
    points: 25
  }
]

export default function CulturalVerificationIntegration({
  userPhotos = [],
  onPhotosChange,
  showVerificationPrompt = true,
  isUserProfile = false,
  onComplete
}: CulturalVerificationIntegrationProps) {
  const { language } = useLanguage()
  const [photos, setPhotos] = useState<CulturalPhoto[]>(userPhotos)
  const [verificationResults, setVerificationResults] = useState<VerificationResults | null>(null)
  const [showUploadArea, setShowUploadArea] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [verificationSteps, setVerificationSteps] = useState(VERIFICATION_STEPS)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (userPhotos.length !== photos.length) {
      setPhotos(userPhotos)
    }
  }, [userPhotos])

  useEffect(() => {
    updateVerificationSteps(photos)
  }, [photos])

  const updateVerificationSteps = (currentPhotos: CulturalPhoto[]) => {
    const updatedSteps = verificationSteps.map(step => {
      let completed = false
      
      switch (step.id) {
        case 'heritage_photos':
          completed = currentPhotos.some(photo => 
            photo.categories.some(cat => cat.id === 'heritage') && 
            photo.verificationStatus === 'verified'
          )
          break
        case 'event_photos':
          completed = currentPhotos.some(photo => 
            photo.categories.some(cat => cat.id === 'events') && 
            photo.verificationStatus === 'verified'
          )
          break
        case 'cuisine_photos':
          completed = currentPhotos.some(photo => 
            photo.categories.some(cat => cat.id === 'cuisine') && 
            photo.verificationStatus === 'verified'
          )
          break
        case 'community_photos':
          completed = currentPhotos.some(photo => 
            photo.categories.some(cat => cat.id === 'community') && 
            photo.verificationStatus === 'verified'
          )
          break
      }
      
      return { ...step, completed }
    })

    setVerificationSteps(updatedSteps)
  }

  const handlePhotosChange = (newPhotos: CulturalPhoto[]) => {
    setPhotos(newPhotos)
    onPhotosChange?.(newPhotos)
  }

  const handleVerificationComplete = (results: VerificationResults) => {
    setVerificationResults(results)
    onComplete?.(results)

    // Show achievement notifications
    if (results.totalBadges > 0) {
      toast.success(
        language === 'pt' 
          ? `🏆 Conquistou ${results.totalBadges} distintivos culturais!` 
          : `🏆 Earned ${results.totalBadges} cultural badges!`,
        { duration: 4000 }
      )
    }

    if (results.overallScore >= 85) {
      toast.success(
        language === 'pt' 
          ? '🌟 Perfil culturalmente verificado com distinção!' 
          : '🌟 Profile culturally verified with distinction!',
        { duration: 5000 }
      )
    }
  }

  const getCompletionPercentage = () => {
    const completed = verificationSteps.filter(step => step.completed).length
    return Math.round((completed / verificationSteps.length) * 100)
  }

  const getTotalPoints = () => {
    return verificationSteps
      .filter(step => step.completed)
      .reduce((total, step) => total + step.points, 0)
  }

  const getVerificationLevel = (score: number) => {
    if (score >= 95) return { level: 'Legendary', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (score >= 85) return { level: 'Epic', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (score >= 75) return { level: 'Rare', color: 'text-blue-600', bg: 'bg-blue-100' }
    return { level: 'Common', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const verificationLevel = verificationResults ? getVerificationLevel(verificationResults.overallScore) : null

  // Show onboarding prompt for new users
  const shouldShowOnboarding = showVerificationPrompt && photos.length === 0 && !showOnboarding

  return (
    <div className="space-y-6">
      {/* Onboarding Prompt */}
      {shouldShowOnboarding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-6 border border-primary-200"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckSolid className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-2">
              {language === 'pt' ? 'Verificação Cultural Portuguesa' : 'Lusophone Cultural Verification'}
            </h3>
            <p className="text-primary-600 max-w-lg mx-auto">
              {language === 'pt' 
                ? 'Aumente a sua credibilidade e conecte-se com outros membros da comunidade de falantes de português através da verificação cultural'
                : 'Boost your credibility and connect with other Portuguese-speaking community members through cultural verification'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-xl">
              <CheckCircleIcon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? 'Autenticidade' : 'Authenticity'}
              </div>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-xl">
              <TrophyIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? 'Distintivos' : 'Badges'}
              </div>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-xl">
              <HeartIcon className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? 'Mais Matches' : 'More Matches'}
              </div>
            </div>
            <div className="text-center p-3 bg-white bg-opacity-50 rounded-xl">
              <FireIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? 'Prioridade' : 'Priority'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowUploadArea(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105"
            >
              {language === 'pt' ? 'Começar Verificação' : 'Start Verification'}
            </button>
            <button
              onClick={() => setShowOnboarding(true)}
              className="px-6 py-3 bg-white text-primary-600 border border-primary-300 rounded-xl font-semibold hover:bg-primary-50 transition-all"
            >
              {language === 'pt' ? 'Mais Tarde' : 'Later'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Verification Dashboard */}
      {(photos.length > 0 || verificationResults) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <ShieldCheckSolid className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {language === 'pt' ? 'Verificação Cultural' : 'Cultural Verification'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getCompletionPercentage()}% {language === 'pt' ? 'completo' : 'complete'} • {getTotalPoints()} {language === 'pt' ? 'pontos' : 'points'}
                  </p>
                </div>
              </div>

              {verificationResults && (
                <div className={`px-4 py-2 rounded-xl ${verificationLevel?.bg} ${verificationLevel?.color} font-semibold`}>
                  {Math.round(verificationResults.overallScore)}% {language === 'pt' ? 'Verificado' : 'Verified'}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{language === 'pt' ? 'Progresso da Verificação' : 'Verification Progress'}</span>
                <span>{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${getCompletionPercentage()}%` }}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-xl border transition-all ${
                      step.completed 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step.completed ? (
                          <CheckCircleIcon className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {language === 'pt' ? step.titlePortuguese : step.title}
                          </h4>
                          {step.required && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              {language === 'pt' ? 'Obrigatório' : 'Required'}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {language === 'pt' ? step.descriptionPortuguese : step.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-emerald-600">
                            +{step.points} {language === 'pt' ? 'pontos' : 'points'}
                          </span>
                          {step.completed && (
                            <span className="text-xs text-emerald-600 font-medium">
                              ✓ {language === 'pt' ? 'Completo' : 'Complete'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowUploadArea(!showUploadArea)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all"
                >
                  <CameraIcon className="w-4 h-4" />
                  {language === 'pt' ? 'Adicionar Fotos' : 'Add Photos'}
                </button>
                
                {photos.length > 0 && (
                  <button
                    onClick={() => setShowGallery(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    <PhotoIcon className="w-4 h-4" />
                    {language === 'pt' ? 'Ver Galeria' : 'View Gallery'} ({photos.length})
                  </button>
                )}
              </div>

              {verificationResults && verificationResults.badges.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'pt' ? 'Distintivos:' : 'Badges:'}
                  </span>
                  <CulturalVerificationBadges 
                    badges={verificationResults.badges} 
                    size="small"
                    maxDisplay={4}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Photo Upload Area */}
      {showUploadArea && (
        <PortugueseCulturalPhotoVerification
          photos={photos}
          onPhotosChange={handlePhotosChange}
          onVerificationComplete={handleVerificationComplete}
          maxPhotos={12}
          showVerificationDetails={true}
        />
      )}

      {/* Photo Gallery */}
      <CulturalPhotoGallery
        photos={photos}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        userName={language === 'pt' ? 'Suas Fotos' : 'Your Photos'}
        showVerificationDetails={true}
      />

      {/* Tips and Guidelines */}
      {(showUploadArea || photos.length === 0) && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5" />
            {language === 'pt' ? 'Dicas para Melhor Verificação' : 'Tips for Better Verification'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-blue-900 mb-2">
                {language === 'pt' ? '📸 Fotos de Alta Qualidade:' : '📸 High-Quality Photos:'}
              </h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {language === 'pt' ? 'Imagens nítidas e bem iluminadas' : 'Clear and well-lit images'}</li>
                <li>• {language === 'pt' ? 'Elementos culturais claramente visíveis' : 'Cultural elements clearly visible'}</li>
                <li>• {language === 'pt' ? 'Evite filtros pesados' : 'Avoid heavy filters'}</li>
                <li>• {language === 'pt' ? 'Resolução mínima de 1080p' : 'Minimum 1080p resolution'}</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-blue-900 mb-2">
                {language === 'pt' ? '🏆 Maximizar Pontuação:' : '🏆 Maximize Score:'}
              </h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {language === 'pt' ? 'Inclua texto em português nas fotos' : 'Include Lusophone text in photos'}</li>
                <li>• {language === 'pt' ? 'Mostre símbolos culturais autênticos' : 'Show authentic cultural symbols'}</li>
                <li>• {language === 'pt' ? 'Fotos em eventos conhecidos' : 'Photos at recognized events'}</li>
                <li>• {language === 'pt' ? 'Diversifique as categorias culturais' : 'Diversify cultural categories'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}