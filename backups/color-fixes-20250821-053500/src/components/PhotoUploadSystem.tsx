'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CameraIcon, 
  PhotoIcon, 
  XMarkIcon, 
  StarIcon,
  EyeIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'
import { uploadPhoto, deletePhoto, getCurrentUser } from '@/lib/supabase'

interface Photo {
  id?: string
  url: string
  caption?: string
  is_profile_picture: boolean
  uploaded_at?: string
  file?: File
  isUploading?: boolean
}

interface PhotoUploadSystemProps {
  photos: Photo[]
  onPhotosChange: (photos: Photo[]) => void
  maxPhotos?: number
  isPortuguese: boolean
}

export default function PhotoUploadSystem({ 
  photos, 
  onPhotosChange, 
  maxPhotos = 6,
  isPortuguese 
}: PhotoUploadSystemProps) {
  const [dragOver, setDragOver] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (photos.length + files.length > maxPhotos) {
      toast.error(
        isPortuguese 
          ? `Máximo de ${maxPhotos} fotos permitido` 
          : `Maximum ${maxPhotos} photos allowed`
      )
      return
    }

    const user = await getCurrentUser()
    if (!user) {
      toast.error(isPortuguese ? 'Faça login primeiro' : 'Please log in first')
      return
    }

    const newPhotos: Photo[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        toast.error(
          isPortuguese 
            ? 'Apenas imagens são permitidas' 
            : 'Only images are allowed'
        )
        continue
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error(
          isPortuguese 
            ? 'Imagem deve ser menor que 5MB' 
            : 'Image must be smaller than 5MB'
        )
        continue
      }

      // Create preview
      const previewUrl = URL.createObjectURL(file)
      const newPhoto: Photo = {
        url: previewUrl,
        is_profile_picture: photos.length === 0, // First photo is profile picture
        file,
        isUploading: true
      }

      newPhotos.push(newPhoto)
    }

    // Add photos to state
    const updatedPhotos = [...photos, ...newPhotos]
    onPhotosChange(updatedPhotos)

    // Upload photos
    for (let i = 0; i < newPhotos.length; i++) {
      const photo = newPhotos[i]
      const photoIndex = photos.length + i

      try {
        const result = await uploadPhoto(
          user.id, 
          photo.file!, 
          photo.is_profile_picture
        )

        if (result.success) {
          // Update photo with uploaded URL
          const uploadedPhoto: Photo = {
            ...photo,
            url: result.url!,
            isUploading: false
          }

          // Clean up preview URL
          URL.revokeObjectURL(photo.url)

          // Update in array
          const finalPhotos = [...updatedPhotos]
          finalPhotos[photoIndex] = uploadedPhoto
          onPhotosChange(finalPhotos)

          toast.success(
            isPortuguese 
              ? 'Foto carregada com sucesso!' 
              : 'Photo uploaded successfully!'
          )
        } else {
          throw new Error(result.error || 'Upload failed')
        }
      } catch (error) {
        console.error('Error uploading photo:', error)
        toast.error(
          isPortuguese 
            ? 'Erro ao carregar foto' 
            : 'Error uploading photo'
        )

        // Remove failed upload
        const filteredPhotos = updatedPhotos.filter((_, index) => index !== photoIndex)
        onPhotosChange(filteredPhotos)
      }
    }
  }, [photos, onPhotosChange, maxPhotos, isPortuguese])

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

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index)
    
    // If removing profile picture, make first remaining photo the profile picture
    if (photos[index].is_profile_picture && updatedPhotos.length > 0) {
      updatedPhotos[0].is_profile_picture = true
    }
    
    onPhotosChange(updatedPhotos)
    toast.success(isPortuguese ? 'Foto removida' : 'Photo removed')
  }

  const setProfilePicture = (index: number) => {
    const updatedPhotos = photos.map((photo, i) => ({
      ...photo,
      is_profile_picture: i === index
    }))
    onPhotosChange(updatedPhotos)
    toast.success(
      isPortuguese 
        ? 'Foto de perfil definida!' 
        : 'Profile picture set!'
    )
  }

  const addCaption = (index: number, caption: string) => {
    const updatedPhotos = [...photos]
    updatedPhotos[index] = { ...updatedPhotos[index], caption }
    onPhotosChange(updatedPhotos)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragOver 
            ? 'border-primary-400 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
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

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            {dragOver ? (
              <ArrowUpTrayIcon className="w-8 h-8 text-primary-500" />
            ) : (
              <PhotoIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isPortuguese ? 'Adicionar Fotos' : 'Add Photos'}
            </h3>
            <p className="text-gray-600 mb-4">
              {isPortuguese 
                ? `Arraste e solte ou clique para selecionar até ${maxPhotos} fotos`
                : `Drag and drop or click to select up to ${maxPhotos} photos`
              }
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all"
            >
              <PhotoIcon className="w-5 h-5" />
              {isPortuguese ? 'Escolher Fotos' : 'Choose Photos'}
            </button>

            {/* Camera capture for mobile */}
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute('capture', 'environment')
                  fileInputRef.current.click()
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-secondary-500 text-white rounded-xl hover:bg-secondary-600 transition-all"
            >
              <CameraIcon className="w-5 h-5" />
              {isPortuguese ? 'Câmara' : 'Camera'}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            {isPortuguese 
              ? 'JPG, PNG ou WebP. Máximo 5MB por foto.'
              : 'JPG, PNG or WebP. Maximum 5MB per photo.'
            }
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? 'Suas Fotos' : 'Your Photos'} ({photos.length}/{maxPhotos})
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <AnimatePresence>
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.url}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || `Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Upload overlay */}
                  {photo.isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-sm">
                          {isPortuguese ? 'Carregando...' : 'Uploading...'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Photo actions overlay */}
                  {!photo.isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPhoto(photo)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                          title={isPortuguese ? 'Ver foto' : 'View photo'}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setProfilePicture(index)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                          title={isPortuguese ? 'Definir como foto de perfil' : 'Set as profile picture'}
                        >
                          {photo.is_profile_picture ? (
                            <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <StarIcon className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => removePhoto(index)}
                          className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all"
                          title={isPortuguese ? 'Remover foto' : 'Remove photo'}
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Profile picture badge */}
                  {photo.is_profile_picture && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <StarSolidIcon className="w-3 h-3" />
                      {isPortuguese ? 'Perfil' : 'Profile'}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl max-h-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption || 'Photo'}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {selectedPhoto.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <p>{selectedPhoto.caption}</p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-2">
          {isPortuguese ? 'Diretrizes para Fotos' : 'Photo Guidelines'}
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {isPortuguese ? 'Use fotos recentes e claras' : 'Use recent and clear photos'}</li>
          <li>• {isPortuguese ? 'Mostre seu rosto claramente' : 'Show your face clearly'}</li>
          <li>• {isPortuguese ? 'Evite fotos de grupo confusas' : 'Avoid confusing group photos'}</li>
          <li>• {isPortuguese ? 'Mantenha o conteúdo apropriado' : 'Keep content appropriate'}</li>
          <li>• {isPortuguese ? 'A primeira foto será sua foto de perfil' : 'First photo will be your profile picture'}</li>
        </ul>
      </div>
    </div>
  )
}