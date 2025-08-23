'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CameraIcon, 
  PhotoIcon, 
  XMarkIcon, 
  StarIcon,
  ShieldCheckIcon,
  FireIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  SparklesIcon,
  HeartIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EyeIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  FlagIcon,
  MusicalNoteIcon,
  CakeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { 
  StarIcon as StarSolidIcon,
  ShieldCheckIcon as ShieldCheckSolidIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'

export interface CulturalPhoto {
  id: string
  url: string
  caption?: string
  categories: CulturalCategory[]
  verificationStatus: 'pending' | 'verified' | 'rejected'
  verificationScore: number
  detectedElements: CulturalElement[]
  uploadedAt: string
  location?: string
  eventDate?: string
  verificationBadges: VerificationBadge[]
}

export interface CulturalCategory {
  id: string
  name: string
  namePortuguese: string
  confidence: number
  color: string
  icon: string
}

export interface CulturalElement {
  id: string
  type: 'text' | 'symbol' | 'food' | 'location' | 'clothing' | 'flag' | 'decoration'
  name: string
  namePortuguese: string
  confidence: number
  description: string
  descriptionPortuguese: string
}

export interface VerificationBadge {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  requirements: string[]
  achievedAt: string
}

interface PortugueseCulturalPhotoVerificationProps {
  photos: CulturalPhoto[]
  onPhotosChange: (photos: CulturalPhoto[]) => void
  maxPhotos?: number
  showVerificationDetails?: boolean
  onVerificationComplete?: (verificationResults: VerificationResults) => void
}

interface VerificationResults {
  overallScore: number
  totalBadges: number
  verifiedPhotos: number
  heritageAuthenticity: number
  communityInvolvement: number
  culturalKnowledge: number
  badges: VerificationBadge[]
}

const CULTURAL_CATEGORIES: CulturalCategory[] = [
  {
    id: 'heritage',
    name: 'Portuguese Heritage',
    namePortuguese: 'Herança Portuguesa',
    confidence: 0,
    color: 'emerald',
    icon: '🇵🇹'
  },
  {
    id: 'events',
    name: 'Portuguese Events',
    namePortuguese: 'Eventos Portugueses',
    confidence: 0,
    color: 'blue',
    icon: '🎉'
  },
  {
    id: 'cuisine',
    name: 'Portuguese Cuisine',
    namePortuguese: 'Culinária Portuguesa',
    confidence: 0,
    color: 'orange',
    icon: '🍽️'
  },
  {
    id: 'locations',
    name: 'Portuguese Locations',
    namePortuguese: 'Locais Portugueses',
    confidence: 0,
    color: 'purple',
    icon: '📍'
  },
  {
    id: 'community',
    name: 'Portuguese-speaking community',
    namePortuguese: 'Comunidade de Falantes de Português',
    confidence: 0,
    color: 'pink',
    icon: '👥'
  },
  {
    id: 'traditions',
    name: 'Portuguese Traditions',
    namePortuguese: 'Tradições Portuguesas',
    confidence: 0,
    color: 'indigo',
    icon: '🏛️'
  }
]

const VERIFICATION_BADGES: VerificationBadge[] = [
  {
    id: 'heritage_verified',
    name: 'Heritage Verified',
    namePortuguese: 'Herança Verificada',
    description: 'Verified Portuguese cultural heritage through authentic photos',
    descriptionPortuguese: 'Herança cultural portuguesa verificada através de fotos autênticas',
    icon: '🛡️',
    color: 'emerald',
    rarity: 'common',
    requirements: ['3+ heritage photos', 'Family or cultural items verified'],
    achievedAt: ''
  },
  {
    id: 'event_verified',
    name: 'Event Verified',
    namePortuguese: 'Evento Verificado',
    description: 'Confirmed attendance at Portuguese cultural events',
    descriptionPortuguese: 'Participação confirmada em eventos culturais portugueses',
    icon: '🎪',
    color: 'blue',
    rarity: 'common',
    requirements: ['Event photos with timestamps', 'Recognized Portuguese events'],
    achievedAt: ''
  },
  {
    id: 'community_member',
    name: 'Community Member',
    namePortuguese: 'Membro da Comunidade',
    description: 'Active member of Portuguese-speaking community in London',
    descriptionPortuguese: 'Membro ativo da comunidade de falantes de português em Londres',
    icon: '👑',
    color: 'pink',
    rarity: 'rare',
    requirements: ['Community event participation', 'Portuguese social activities'],
    achievedAt: ''
  },
  {
    id: 'cultural_guardian',
    name: 'Cultural Guardian',
    namePortuguese: 'Guardião Cultural',
    description: 'Preserves and shares Portuguese traditions',
    descriptionPortuguese: 'Preserva e partilha as tradições portuguesas',
    icon: '🏆',
    color: 'indigo',
    rarity: 'epic',
    requirements: ['Traditional Portuguese elements', 'Cultural knowledge demonstration'],
    achievedAt: ''
  },
  {
    id: 'lusophone_traveler',
    name: 'Lusophone Traveler',
    namePortuguese: 'Viajante Lusófono',
    description: 'Traveled to Portuguese-speaking countries',
    descriptionPortuguese: 'Viajou para países de língua portuguesa',
    icon: '🌍',
    color: 'purple',
    rarity: 'rare',
    requirements: ['Photos from Portugal/Brazil/Angola/etc.', 'Geolocation verification'],
    achievedAt: ''
  },
  {
    id: 'fado_lover',
    name: 'Fado Lover',
    namePortuguese: 'Amante do Fado',
    description: 'Deep appreciation for Portuguese Fado music',
    descriptionPortuguese: 'Apreço profundo pela música Fado portuguesa',
    icon: '🎵',
    color: 'slate',
    rarity: 'epic',
    requirements: ['Fado event photos', 'Portuguese music venues'],
    achievedAt: ''
  },
  {
    id: 'santos_populares_champion',
    name: 'Santos Populares Champion',
    namePortuguese: 'Campeão dos Santos Populares',
    description: 'Celebrates Portuguese Saints festivals with passion',
    descriptionPortuguese: 'Celebra as festas dos Santos Populares com paixão',
    icon: '🎊',
    color: 'yellow',
    rarity: 'legendary',
    requirements: ['Santos Populares celebration photos', 'Traditional decorations'],
    achievedAt: ''
  }
]

export default function PortugueseCulturalPhotoVerification({
  photos,
  onPhotosChange,
  maxPhotos = 8,
  showVerificationDetails = true,
  onVerificationComplete
}: PortugueseCulturalPhotoVerificationProps) {
  const { language } = useLanguage()
  const [selectedPhoto, setSelectedPhoto] = useState<CulturalPhoto | null>(null)
  const [verificationResults, setVerificationResults] = useState<VerificationResults | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showUploadArea, setShowUploadArea] = useState(true)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock verification function - in real app would use AI/ML service
  const verifyPhoto = useCallback((file: File): Promise<{
    categories: CulturalCategory[]
    elements: CulturalElement[]
    score: number
    badges: VerificationBadge[]
  }> => {
    return new Promise((resolve) => {
      // Simulate AI analysis delay
      setTimeout(() => {
        // Mock results based on filename/randomization
        const mockCategories = CULTURAL_CATEGORIES.map(cat => ({
          ...cat,
          confidence: Math.random() * 100
        })).filter(cat => cat.confidence > 30)

        const mockElements: CulturalElement[] = [
          {
            id: 'flag_detection',
            type: 'flag',
            name: 'Portuguese Flag',
            namePortuguese: 'Bandeira Portuguesa',
            confidence: 85,
            description: 'Portuguese flag detected in photo',
            descriptionPortuguese: 'Bandeira portuguesa detectada na foto'
          },
          {
            id: 'text_portuguese',
            type: 'text',
            name: 'Portuguese Text',
            namePortuguese: 'Texto Português',
            confidence: 92,
            description: 'Portuguese language text identified',
            descriptionPortuguese: 'Texto em língua portuguesa identificado'
          }
        ]

        const score = Math.random() * 40 + 60 // 60-100 range

        // Award badges based on score and elements
        const earnedBadges = VERIFICATION_BADGES.filter(() => Math.random() > 0.7)
          .slice(0, 2)
          .map(badge => ({
            ...badge,
            achievedAt: new Date().toISOString()
          }))

        resolve({
          categories: mockCategories,
          elements: mockElements,
          score,
          badges: earnedBadges
        })
      }, 2000)
    })
  }, [])

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (photos.length + files.length > maxPhotos) {
      toast.error(
        language === 'pt' 
          ? `Máximo de ${maxPhotos} fotos permitido` 
          : `Maximum ${maxPhotos} photos allowed`
      )
      return
    }

    const newPhotos: CulturalPhoto[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      if (!file.type.startsWith('image/')) {
        toast.error(
          language === 'pt' 
            ? 'Apenas imagens são permitidas' 
            : 'Only images are allowed'
        )
        continue
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB for cultural photos
        toast.error(
          language === 'pt' 
            ? 'Imagem deve ser menor que 10MB' 
            : 'Image must be smaller than 10MB'
        )
        continue
      }

      const photoId = `photo_${Date.now()}_${i}`
      const previewUrl = URL.createObjectURL(file)
      
      const newPhoto: CulturalPhoto = {
        id: photoId,
        url: previewUrl,
        categories: [],
        verificationStatus: 'pending',
        verificationScore: 0,
        detectedElements: [],
        uploadedAt: new Date().toISOString(),
        verificationBadges: []
      }

      newPhotos.push(newPhoto)
    }

    // Add photos to state immediately
    const updatedPhotos = [...photos, ...newPhotos]
    onPhotosChange(updatedPhotos)

    // Start verification for each photo
    for (let i = 0; i < newPhotos.length; i++) {
      const photo = newPhotos[i]
      const file = files[i]
      
      try {
        toast.loading(
          language === 'pt' 
            ? 'Analisando elementos culturais portugueses...' 
            : 'Analyzing Portuguese cultural elements...',
          { id: `verify_${photo.id}` }
        )

        const verificationResult = await verifyPhoto(file)
        
        // Update photo with verification results
        const verifiedPhoto: CulturalPhoto = {
          ...photo,
          categories: verificationResult.categories,
          detectedElements: verificationResult.elements,
          verificationScore: verificationResult.score,
          verificationStatus: verificationResult.score > 70 ? 'verified' : 'rejected',
          verificationBadges: verificationResult.badges
        }

        // Update in array
        const photoIndex = photos.length + i
        const finalPhotos = [...updatedPhotos]
        finalPhotos[photoIndex] = verifiedPhoto
        onPhotosChange(finalPhotos)

        toast.success(
          language === 'pt' 
            ? `Foto verificada! Pontuação: ${Math.round(verificationResult.score)}%` 
            : `Photo verified! Score: ${Math.round(verificationResult.score)}%`,
          { id: `verify_${photo.id}` }
        )

        // Award badges
        if (verificationResult.badges.length > 0) {
          verificationResult.badges.forEach(badge => {
            toast.success(
              language === 'pt' 
                ? `🏆 Conquistou: ${badge.namePortuguese}!` 
                : `🏆 Earned: ${badge.name}!`,
              { duration: 4000 }
            )
          })
        }

      } catch (error) {
        console.error('Error verifying photo:', error)
        toast.error(
          language === 'pt' 
            ? 'Erro na verificação cultural' 
            : 'Cultural verification error',
          { id: `verify_${photo.id}` }
        )
      }
    }

    // Calculate overall verification results
    setTimeout(() => {
      calculateVerificationResults(updatedPhotos)
    }, 100)
  }, [photos, onPhotosChange, maxPhotos, language, verifyPhoto])

  const calculateVerificationResults = useCallback((allPhotos: CulturalPhoto[]) => {
    const verifiedPhotos = allPhotos.filter(p => p.verificationStatus === 'verified')
    const allBadges = allPhotos.flatMap(p => p.verificationBadges)
    const uniqueBadges = allBadges.filter((badge, index, self) => 
      index === self.findIndex(b => b.id === badge.id)
    )

    const averageScore = verifiedPhotos.length > 0 
      ? verifiedPhotos.reduce((sum, p) => sum + p.verificationScore, 0) / verifiedPhotos.length 
      : 0

    const results: VerificationResults = {
      overallScore: averageScore,
      totalBadges: uniqueBadges.length,
      verifiedPhotos: verifiedPhotos.length,
      heritageAuthenticity: Math.min(95, averageScore + uniqueBadges.length * 5),
      communityInvolvement: Math.min(90, verifiedPhotos.length * 15),
      culturalKnowledge: Math.min(100, uniqueBadges.filter(b => b.rarity === 'epic' || b.rarity === 'legendary').length * 25),
      badges: uniqueBadges
    }

    setVerificationResults(results)
    
    if (onVerificationComplete) {
      onVerificationComplete(results)
    }
  }, [onVerificationComplete])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFileSelect(files)
    }
  }, [handleFileSelect])

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(p => p.id !== photoId)
    onPhotosChange(updatedPhotos)
    calculateVerificationResults(updatedPhotos)
    toast.success(language === 'pt' ? 'Foto removida' : 'Photo removed')
  }

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => 
        photo.categories.some(cat => cat.id === selectedCategory)
      )

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100'
      case 'rare': return 'text-blue-600 bg-blue-100'
      case 'epic': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryColor = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      slate: 'bg-slate-100 text-slate-700 border-slate-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  useEffect(() => {
    if (photos.length > 0) {
      calculateVerificationResults(photos)
    }
  }, [photos, calculateVerificationResults])

  return (
    <div className="space-y-6">
      {/* Verification Overview */}
      {verificationResults && showVerificationDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-6 border border-primary-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-primary-900 flex items-center gap-2">
              <ShieldCheckSolidIcon className="w-6 h-6 text-emerald-600" />
              {language === 'pt' ? 'Verificação Cultural Portuguesa' : 'Portuguese Cultural Verification'}
            </h3>
            <div className="flex items-center gap-2">
              <StarSolidIcon className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg text-primary-900">
                {Math.round(verificationResults.overallScore)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{verificationResults.verifiedPhotos}</div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Fotos Verificadas' : 'Verified Photos'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{verificationResults.totalBadges}</div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Distintivos' : 'Badges'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(verificationResults.heritageAuthenticity)}%</div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Autenticidade' : 'Authenticity'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{Math.round(verificationResults.communityInvolvement)}%</div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Envolvimento' : 'Involvement'}
              </div>
            </div>
          </div>

          {/* Badges Display */}
          {verificationResults.badges.length > 0 && (
            <div>
              <h4 className="font-semibold text-primary-900 mb-3">
                {language === 'pt' ? 'Distintivos Conquistados' : 'Earned Badges'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {verificationResults.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border ${getRarityColor(badge.rarity)}`}
                    title={language === 'pt' ? badge.descriptionPortuguese : badge.description}
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <span className="font-medium text-sm">
                      {language === 'pt' ? badge.namePortuguese : badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Upload Area */}
      {showUploadArea && (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragOver 
              ? 'border-primary-400 bg-primary-50' 
              : 'border-primary-300 hover:border-primary-400 bg-white'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
              {dragOver ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <PhotoIcon className="w-10 h-10 text-primary-600" />
                </motion.div>
              ) : (
                <CameraIcon className="w-10 h-10 text-primary-500" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                {language === 'pt' ? 'Adicionar Fotos Culturais Portuguesas' : 'Add Portuguese Cultural Photos'}
              </h3>
              <p className="text-primary-600 mb-4 max-w-lg mx-auto leading-relaxed">
                {language === 'pt' 
                  ? 'Partilhe fotos que mostrem a sua ligação à cultura portuguesa - eventos, tradições, família, comida, ou locais especiais'
                  : 'Share photos that show your connection to Portuguese culture - events, traditions, family, food, or special places'
                }
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all transform hover:scale-105"
              >
                <PhotoIcon className="w-5 h-5" />
                {language === 'pt' ? 'Escolher Fotos' : 'Choose Photos'}
              </button>

              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.setAttribute('capture', 'environment')
                    fileInputRef.current.click()
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-coral-500 text-white rounded-xl hover:from-accent-600 hover:to-coral-600 transition-all transform hover:scale-105"
              >
                <CameraIcon className="w-5 h-5" />
                {language === 'pt' ? 'Câmara' : 'Camera'}
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <InformationCircleIcon className="w-5 h-5" />
                {language === 'pt' ? 'Exemplos de Fotos Culturais' : 'Cultural Photo Examples'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                <div className="space-y-1">
                  <div>🎉 {language === 'pt' ? 'Santos Populares, festas portuguesas' : 'Santos Populares, Portuguese festivals'}</div>
                  <div>🍽️ {language === 'pt' ? 'Pastéis de nata, francesinha, bifana' : 'Pastéis de nata, francesinha, bifana'}</div>
                  <div>🏛️ {language === 'pt' ? 'Centros culturais portugueses' : 'Portuguese cultural centers'}</div>
                </div>
                <div className="space-y-1">
                  <div>🎵 {language === 'pt' ? 'Noites de fado, música portuguesa' : 'Fado nights, Portuguese music'}</div>
                  <div>🇵🇹 {language === 'pt' ? 'Fotos de Portugal, azulejos' : 'Photos from Portugal, azulejos'}</div>
                  <div>👨‍👩‍👧‍👦 {language === 'pt' ? 'Família, tradições familiares' : 'Family, family traditions'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {language === 'pt' ? 'Todas' : 'All'} ({photos.length})
          </button>
          {CULTURAL_CATEGORIES.map((category) => {
            const count = photos.filter(photo => 
              photo.categories.some(cat => cat.id === category.id)
            ).length
            
            if (count === 0) return null
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? getCategoryColor(category.color).replace('bg-', 'bg-').replace('text-', 'text-').replace('border-', 'border-2 border-')
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {language === 'pt' ? category.namePortuguese : category.name} ({count})
              </button>
            )
          })}
        </div>
      )}

      {/* Photos Grid */}
      {filteredPhotos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary-900">
              {language === 'pt' ? 'Suas Fotos Culturais' : 'Your Cultural Photos'} ({filteredPhotos.length})
            </h3>
            <button
              onClick={() => setShowUploadArea(!showUploadArea)}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${showUploadArea ? 'rotate-180' : ''}`} />
              {showUploadArea 
                ? (language === 'pt' ? 'Ocultar Upload' : 'Hide Upload')
                : (language === 'pt' ? 'Adicionar Mais' : 'Add More')
              }
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="aspect-square relative">
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Cultural photo'}
                      className="w-full h-full object-cover"
                    />

                    {/* Verification Status Overlay */}
                    <div className="absolute top-3 left-3">
                      {photo.verificationStatus === 'pending' && (
                        <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {language === 'pt' ? 'Verificando...' : 'Verifying...'}
                        </div>
                      )}
                      {photo.verificationStatus === 'verified' && (
                        <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3" />
                          {Math.round(photo.verificationScore)}%
                        </div>
                      )}
                      {photo.verificationStatus === 'rejected' && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-3 h-3" />
                          {language === 'pt' ? 'Rejeitada' : 'Rejected'}
                        </div>
                      )}
                    </div>

                    {/* Verification Score */}
                    {photo.verificationStatus === 'verified' && (
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <StarSolidIcon className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs font-bold text-gray-900">
                            {Math.round(photo.verificationScore)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Photo Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPhoto(photo)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                          title={language === 'pt' ? 'Ver detalhes' : 'View details'}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removePhoto(photo.id)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                          title={language === 'pt' ? 'Remover foto' : 'Remove photo'}
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Badges Preview */}
                    {photo.verificationBadges.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex gap-1">
                        {photo.verificationBadges.slice(0, 3).map((badge) => (
                          <div
                            key={badge.id}
                            className="w-6 h-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center"
                            title={language === 'pt' ? badge.namePortuguese : badge.name}
                          >
                            <span className="text-xs">{badge.icon}</span>
                          </div>
                        ))}
                        {photo.verificationBadges.length > 3 && (
                          <div className="w-6 h-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">+{photo.verificationBadges.length - 3}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Photo Info */}
                  <div className="p-4">
                    {/* Categories */}
                    {photo.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {photo.categories.slice(0, 2).map((category) => (
                          <span
                            key={category.id}
                            className={`px-2 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(category.color)}`}
                          >
                            {category.icon} {language === 'pt' ? category.namePortuguese : category.name}
                          </span>
                        ))}
                        {photo.categories.length > 2 && (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600">
                            +{photo.categories.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Detected Elements Preview */}
                    {photo.detectedElements.length > 0 && (
                      <div className="text-xs text-gray-600">
                        {photo.detectedElements.slice(0, 2).map((element, index) => (
                          <span key={element.id}>
                            {index > 0 && ', '}
                            {language === 'pt' ? element.namePortuguese : element.name}
                          </span>
                        ))}
                        {photo.detectedElements.length > 2 && (
                          <span> +{photo.detectedElements.length - 2} {language === 'pt' ? 'mais' : 'more'}</span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square lg:aspect-auto">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || 'Cultural photo'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    {language === 'pt' ? 'Detalhes da Verificação Cultural' : 'Cultural Verification Details'}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                      selectedPhoto.verificationStatus === 'verified' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : selectedPhoto.verificationStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedPhoto.verificationStatus === 'verified' && <CheckCircleIcon className="w-4 h-4" />}
                      {selectedPhoto.verificationStatus === 'pending' && <ClockIcon className="w-4 h-4" />}
                      {selectedPhoto.verificationStatus === 'rejected' && <ExclamationTriangleIcon className="w-4 h-4" />}
                      {selectedPhoto.verificationStatus === 'verified' && (language === 'pt' ? 'Verificada' : 'Verified')}
                      {selectedPhoto.verificationStatus === 'pending' && (language === 'pt' ? 'Pendente' : 'Pending')}
                      {selectedPhoto.verificationStatus === 'rejected' && (language === 'pt' ? 'Rejeitada' : 'Rejected')}
                    </div>
                    
                    {selectedPhoto.verificationStatus === 'verified' && (
                      <div className="flex items-center gap-1">
                        <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-primary-900">
                          {Math.round(selectedPhoto.verificationScore)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Categories */}
                {selectedPhoto.categories.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">
                      {language === 'pt' ? 'Categorias Culturais' : 'Cultural Categories'}
                    </h4>
                    <div className="space-y-2">
                      {selectedPhoto.categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCategoryColor(category.color)}`}>
                            <span>{category.icon}</span>
                            <span className="font-medium">
                              {language === 'pt' ? category.namePortuguese : category.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {Math.round(category.confidence)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detected Elements */}
                {selectedPhoto.detectedElements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">
                      {language === 'pt' ? 'Elementos Culturais Detectados' : 'Detected Cultural Elements'}
                    </h4>
                    <div className="space-y-2">
                      {selectedPhoto.detectedElements.map((element) => (
                        <div key={element.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">
                              {language === 'pt' ? element.namePortuguese : element.name}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              {Math.round(element.confidence)}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === 'pt' ? element.descriptionPortuguese : element.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Badges */}
                {selectedPhoto.verificationBadges.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">
                      {language === 'pt' ? 'Distintivos Conquistados' : 'Earned Badges'}
                    </h4>
                    <div className="space-y-2">
                      {selectedPhoto.verificationBadges.map((badge) => (
                        <div key={badge.id} className={`flex items-center gap-3 p-3 rounded-lg border ${getRarityColor(badge.rarity)}`}>
                          <span className="text-2xl">{badge.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">
                              {language === 'pt' ? badge.namePortuguese : badge.name}
                            </div>
                            <div className="text-sm opacity-75">
                              {language === 'pt' ? badge.descriptionPortuguese : badge.description}
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRarityColor(badge.rarity)}`}>
                            {badge.rarity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <InformationCircleIcon className="w-5 h-5" />
          {language === 'pt' ? 'Diretrizes para Verificação Cultural' : 'Cultural Verification Guidelines'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-blue-900 mb-2">
              {language === 'pt' ? '✅ Fotos Recomendadas:' : '✅ Recommended Photos:'}
            </h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {language === 'pt' ? 'Eventos culturais portugueses (Santos Populares, Fado)' : 'Portuguese cultural events (Santos Populares, Fado)'}</li>
              <li>• {language === 'pt' ? 'Comida tradicional portuguesa' : 'Traditional Portuguese food'}</li>
              <li>• {language === 'pt' ? 'Locais portugueses ou centros culturais' : 'Portuguese locations or cultural centers'}</li>
              <li>• {language === 'pt' ? 'Fotos de família com tradições portuguesas' : 'Family photos with Portuguese traditions'}</li>
              <li>• {language === 'pt' ? 'Objetos culturais (azulejos, fado guitar, etc.)' : 'Cultural objects (azulejos, fado guitar, etc.)'}</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-blue-900 mb-2">
              {language === 'pt' ? '🔒 Privacidade e Segurança:' : '🔒 Privacy and Safety:'}
            </h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• {language === 'pt' ? 'Controle quais fotos são verificadas' : 'Control which photos are verified'}</li>
              <li>• {language === 'pt' ? 'Defina configurações de privacidade' : 'Set privacy settings'}</li>
              <li>• {language === 'pt' ? 'Reporte representações culturais falsas' : 'Report false cultural representations'}</li>
              <li>• {language === 'pt' ? 'Respeite a representação cultural' : 'Respect cultural representation'}</li>
              <li>• {language === 'pt' ? 'Fotos são analisadas automaticamente, não por humanos' : 'Photos are analyzed automatically, not by humans'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}