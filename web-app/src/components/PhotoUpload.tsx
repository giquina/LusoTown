'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PhotoIcon, 
  XMarkIcon, 
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface PhotoUploadProps {
  onPhotosUploaded: (photos: UploadedPhoto[]) => void
  maxPhotos?: number
  maxFileSize?: number // in MB
  eventId?: string
  className?: string
}

export interface UploadedPhoto {
  id: string
  file: File
  preview: string
  caption?: string
  isUploading?: boolean
  uploadProgress?: number
  error?: string
}

export default function PhotoUpload({ 
  onPhotosUploaded, 
  maxPhotos = 6, 
  maxFileSize = 10,
  eventId,
  className = '' 
}: PhotoUploadProps) {
  const { language } = useLanguage()
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const isPortuguese = language === 'pt'

  const handleFileSelect = useCallback((files: FileList) => {
    const newPhotos: UploadedPhoto[] = []
    const currentCount = photos.length
    
    setUploadError(null)

    Array.from(files).forEach((file, index) => {
      if (currentCount + index >= maxPhotos) {
        setUploadError(isPortuguese 
          ? `Máximo de ${maxPhotos} fotos permitidas`
          : `Maximum ${maxPhotos} photos allowed`
        )
        return
      }

      if (file.size > maxFileSize * 1024 * 1024) {
        setUploadError(isPortuguese 
          ? `Arquivo muito grande (máx. ${maxFileSize}MB)`
          : `File too large (max ${maxFileSize}MB)`
        )
        return
      }

      if (!file.type.startsWith('image/')) {
        setUploadError(isPortuguese 
          ? 'Apenas imagens são permitidas'
          : 'Only image files are allowed'
        )
        return
      }

      const photoId = `photo-${Date.now()}-${index}`
      const preview = URL.createObjectURL(file)
      
      newPhotos.push({
        id: photoId,
        file,
        preview,
        isUploading: false,
        uploadProgress: 0
      })
    })

    if (newPhotos.length > 0) {
      const updatedPhotos = [...photos, ...newPhotos]
      setPhotos(updatedPhotos)
      onPhotosUploaded(updatedPhotos)
      
      // Simulate upload process
      newPhotos.forEach((photo, index) => {
        setTimeout(() => {
          simulateUpload(photo.id)
        }, index * 500)
      })
    }
  }, [photos, maxPhotos, maxFileSize, isPortuguese, onPhotosUploaded])

  const simulateUpload = (photoId: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, isUploading: true, uploadProgress: 0 }
        : photo
    ))

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        setPhotos(prev => prev.map(photo => 
          photo.id === photoId 
            ? { ...photo, isUploading: false, uploadProgress: 100 }
            : photo
        ))
      } else {
        setPhotos(prev => prev.map(photo => 
          photo.id === photoId 
            ? { ...photo, uploadProgress: progress }
            : photo
        ))
      }
    }, 200)
  }

  const removePhoto = (photoId: string) => {
    const updatedPhotos = photos.filter(photo => {
      if (photo.id === photoId) {
        URL.revokeObjectURL(photo.preview)
        return false
      }
      return true
    })
    setPhotos(updatedPhotos)
    onPhotosUploaded(updatedPhotos)
  }

  const updateCaption = (photoId: string, caption: string) => {
    const updatedPhotos = photos.map(photo => 
      photo.id === photoId ? { ...photo, caption } : photo
    )
    setPhotos(updatedPhotos)
    onPhotosUploaded(updatedPhotos)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer hover:bg-secondary-50 ${
          isDragging 
            ? 'border-primary-400 bg-primary-50' 
            : 'border-secondary-300'
        } ${
          photos.length >= maxPhotos ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={photos.length >= maxPhotos}
        />
        
        <div className="text-center">
          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isPortuguese ? 'Adicionar Fotos do Evento' : 'Add Event Photos'}
          </h3>
          <p className="text-secondary-600 mb-4">
            {isPortuguese 
              ? 'Arraste fotos aqui ou clique para selecionar'
              : 'Drag photos here or click to select'
            }
          </p>
          <div className="text-sm text-gray-500">
            {isPortuguese 
              ? `${photos.length}/${maxPhotos} fotos • Máx. ${maxFileSize}MB cada`
              : `${photos.length}/${maxPhotos} photos • Max ${maxFileSize}MB each`
            }
          </div>
        </div>

        {isDragging && (
          <div className="absolute inset-0 bg-primary-50 border-2 border-primary-400 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <CloudArrowUpIcon className="w-12 h-12 text-primary-500 mx-auto mb-2" />
              <p className="text-primary-600 font-medium">
                {isPortuguese ? 'Solte as fotos aqui' : 'Drop photos here'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <ExclamationTriangleIcon className="w-5 h-5 text-coral-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{uploadError}</p>
            <button
              onClick={() => setUploadError(null)}
              className="ml-auto text-coral-500 hover:text-red-700"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <AnimatePresence>
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden bg-secondary-100"
              >
                <Image
                  src={photo.preview}
                  alt="Upload preview"
                  fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
                />
                
                {/* Upload Progress */}
                {photo.isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <CloudArrowUpIcon className="w-6 h-6 mx-auto mb-2 animate-bounce" />
                      <div className="text-xs">{Math.round(photo.uploadProgress || 0)}%</div>
                    </div>
                  </div>
                )}

                {/* Upload Complete */}
                {!photo.isUploading && photo.uploadProgress === 100 && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="w-5 h-5 text-action-500 bg-white rounded-full" />
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 left-2 bg-coral-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-coral-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>

                {/* Caption Input */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input
                    type="text"
                    placeholder={isPortuguese ? 'Adicionar legenda...' : 'Add caption...'}
                    value={photo.caption || ''}
                    onChange={(e) => updateCaption(photo.id, e.target.value)}
                    className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 text-xs rounded px-2 py-1 border border-white/30 focus:outline-none focus:border-white/60"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Photo Tips */}
      {photos.length === 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h4 className="font-medium text-primary-900 mb-2">
            {isPortuguese ? 'Dicas para Fotos de Eventos:' : 'Event Photo Tips:'}
          </h4>
          <ul className="text-sm text-primary-700 space-y-1">
            <li>• {isPortuguese ? 'Capture momentos especiais e conexões reais' : 'Capture special moments and real connections'}</li>
            <li>• {isPortuguese ? 'Mostre a cultura portuguesa sendo celebrada' : 'Show Portuguese culture being celebrated'}</li>
            <li>• {isPortuguese ? 'Inclua detalhes do local e ambiente' : 'Include venue details and atmosphere'}</li>
            <li>• {isPortuguese ? 'Respeite a privacidade dos participantes' : 'Respect participants\' privacy'}</li>
          </ul>
        </div>
      )}
    </div>
  )
}