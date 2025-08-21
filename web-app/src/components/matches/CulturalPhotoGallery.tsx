'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  InformationCircleIcon,
  StarIcon,
  ShieldCheckIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { CulturalPhoto } from './PortugueseCulturalPhotoVerification'
import CulturalVerificationBadges, { VerificationBadge } from './CulturalVerificationBadges'

interface CulturalPhotoGalleryProps {
  photos: CulturalPhoto[]
  isOpen: boolean
  onClose: () => void
  initialPhotoIndex?: number
  userName?: string
  showVerificationDetails?: boolean
}

export default function CulturalPhotoGallery({
  photos,
  isOpen,
  onClose,
  initialPhotoIndex = 0,
  userName,
  showVerificationDetails = true
}: CulturalPhotoGalleryProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex)
  const [showDetails, setShowDetails] = useState(false)

  if (!isOpen || photos.length === 0) return null

  const currentPhoto = photos[currentIndex]

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const getCategoryColor = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      blue: 'bg-blue-100 text-primary-700 border-blue-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      slate: 'bg-slate-100 text-slate-700 border-slate-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
    return colors[color as keyof typeof colors] || colors.emerald
  }

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-secondary-100 text-secondary-700 border-gray-200'
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              {userName && (
                <div className="text-white">
                  <h2 className="font-bold text-lg">
                    {language === 'pt' ? `Fotos Culturais de ${userName}` : `${userName}'s Cultural Photos`}
                  </h2>
                  <p className="text-sm opacity-75">
                    {currentIndex + 1} {language === 'pt' ? 'de' : 'of'} {photos.length}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {showVerificationDetails && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                  title={language === 'pt' ? 'Ver detalhes' : 'View details'}
                >
                  <InformationCircleIcon className="w-6 h-6" />
                </button>
              )}
              
              <button
                className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                title={language === 'pt' ? 'Partilhar' : 'Share'}
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Navigation Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all transform hover:scale-110"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all transform hover:scale-110"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Photo */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative max-w-full max-h-full"
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption || 'Cultural photo'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Photo Status Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {/* Verification Status */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getVerificationStatusColor(currentPhoto.verificationStatus)}`}>
                  <div className="flex items-center gap-1">
                    {currentPhoto.verificationStatus === 'verified' && <CheckBadgeIcon className="w-4 h-4" />}
                    {currentPhoto.verificationStatus === 'verified' && (language === 'pt' ? 'Verificada' : 'Verified')}
                    {currentPhoto.verificationStatus === 'pending' && (language === 'pt' ? 'Pendente' : 'Pending')}
                    {currentPhoto.verificationStatus === 'rejected' && (language === 'pt' ? 'Rejeitada' : 'Rejected')}
                  </div>
                </div>

                {/* Verification Score */}
                {currentPhoto.verificationStatus === 'verified' && (
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <StarSolid className="w-4 h-4 text-accent-500" />
                      <span className="text-sm font-bold text-gray-900">
                        {Math.round(currentPhoto.verificationScore)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Badges Preview */}
              {currentPhoto.verificationBadges.length > 0 && (
                <div className="absolute top-4 right-4">
                  <CulturalVerificationBadges 
                    badges={currentPhoto.verificationBadges} 
                    size="small"
                    maxDisplay={3}
                    showTooltips={true}
                  />
                </div>
              )}

              {/* Photo Info Overlay */}
              {(currentPhoto.caption || currentPhoto.location || currentPhoto.eventDate) && (
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 backdrop-blur-sm text-white p-4 rounded-lg">
                  {currentPhoto.caption && (
                    <p className="font-medium mb-2">{currentPhoto.caption}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm opacity-75">
                    {currentPhoto.location && (
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{currentPhoto.location}</span>
                      </div>
                    )}
                    
                    {currentPhoto.eventDate && (
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{new Date(currentPhoto.eventDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex 
                        ? 'border-white scale-110' 
                        : 'border-transparent hover:border-secondary-300'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {photo.verificationStatus === 'verified' && (
                      <div className="absolute top-1 right-1">
                        <CheckBadgeIcon className="w-3 h-3 text-emerald-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Details Sidebar */}
          {showDetails && showVerificationDetails && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-full lg:w-96 bg-white h-full overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                    {language === 'pt' ? 'Detalhes da Verificação' : 'Verification Details'}
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    {language === 'pt' 
                      ? 'Análise cultural automática desta foto'
                      : 'Automated cultural analysis of this photo'
                    }
                  </p>
                </div>

                {/* Verification Status */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'pt' ? 'Estado da Verificação' : 'Verification Status'}
                  </h4>
                  <div className={`p-3 rounded-lg border ${getVerificationStatusColor(currentPhoto.verificationStatus)}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {currentPhoto.verificationStatus === 'verified' && (language === 'pt' ? 'Verificada' : 'Verified')}
                        {currentPhoto.verificationStatus === 'pending' && (language === 'pt' ? 'Pendente' : 'Pending')}
                        {currentPhoto.verificationStatus === 'rejected' && (language === 'pt' ? 'Rejeitada' : 'Rejected')}
                      </span>
                      {currentPhoto.verificationStatus === 'verified' && (
                        <span className="font-bold">{Math.round(currentPhoto.verificationScore)}%</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cultural Categories */}
                {currentPhoto.categories.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Categorias Culturais' : 'Cultural Categories'}
                    </h4>
                    <div className="space-y-2">
                      {currentPhoto.categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCategoryColor(category.color)}`}>
                            <span>{category.icon}</span>
                            <span className="font-medium">
                              {language === 'pt' ? category.namePortuguese : category.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-secondary-600">
                            {Math.round(category.confidence)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detected Elements */}
                {currentPhoto.detectedElements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Elementos Detectados' : 'Detected Elements'}
                    </h4>
                    <div className="space-y-2">
                      {currentPhoto.detectedElements.map((element) => (
                        <div key={element.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">
                              {language === 'pt' ? element.namePortuguese : element.name}
                            </span>
                            <span className="text-sm font-medium text-secondary-600">
                              {Math.round(element.confidence)}%
                            </span>
                          </div>
                          <p className="text-sm text-secondary-600">
                            {language === 'pt' ? element.descriptionPortuguese : element.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Badges */}
                {currentPhoto.verificationBadges.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Distintivos Conquistados' : 'Earned Badges'}
                    </h4>
                    <div className="space-y-2">
                      {currentPhoto.verificationBadges.map((badge) => (
                        <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl">{badge.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {language === 'pt' ? badge.namePortuguese : badge.name}
                            </div>
                            <div className="text-sm text-secondary-600">
                              {language === 'pt' ? badge.descriptionPortuguese : badge.description}
                            </div>
                          </div>
                          <div className="text-xs bg-secondary-200 text-secondary-600 px-2 py-1 rounded-full capitalize">
                            {badge.rarity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Metadata */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'pt' ? 'Informações da Foto' : 'Photo Information'}
                  </h4>
                  <div className="space-y-2 text-sm text-secondary-600">
                    <div className="flex justify-between">
                      <span>{language === 'pt' ? 'Carregada em:' : 'Uploaded:'}</span>
                      <span>{new Date(currentPhoto.uploadedAt).toLocaleDateString()}</span>
                    </div>
                    
                    {currentPhoto.location && (
                      <div className="flex justify-between">
                        <span>{language === 'pt' ? 'Localização:' : 'Location:'}</span>
                        <span>{currentPhoto.location}</span>
                      </div>
                    )}
                    
                    {currentPhoto.eventDate && (
                      <div className="flex justify-between">
                        <span>{language === 'pt' ? 'Data do evento:' : 'Event date:'}</span>
                        <span>{new Date(currentPhoto.eventDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}