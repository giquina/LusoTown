'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusIcon, 
  XMarkIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { ProfilePhoto } from '@/lib/connections'
import { profileService } from '@/lib/profile'
import { toast } from 'react-hot-toast'

interface ProfileGalleryProps {
  photos: ProfilePhoto[]
  isOwnProfile?: boolean
  onPhotoClick?: (photo: ProfilePhoto, index: number) => void
  onPhotoAdd?: (files: File[]) => void
  onPhotoDelete?: (photoId: string) => void
  onPhotoLike?: (photoId: string) => void
}

export default function ProfileGallery({ 
  photos, 
  isOwnProfile = false,
  onPhotoClick,
  onPhotoAdd,
  onPhotoDelete,
  onPhotoLike
}: ProfileGalleryProps) {
  const [dragOver, setDragOver] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<ProfilePhoto | null>(null)
  const [showFullGallery, setShowFullGallery] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const validFiles: File[] = []
    const errors: string[] = []

    Array.from(files).forEach(file => {
      const validation = profileService.validateImage(file)
      if (validation.valid) {
        validFiles.push(file)
      } else {
        errors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (errors.length > 0) {
      toast.error(`Some files were invalid: ${errors[0]}`)
    }

    if (validFiles.length > 0) {
      onPhotoAdd?.(validFiles)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const visiblePhotos = showFullGallery ? photos : photos.slice(0, 6)
  const hasMore = photos.length > 6

  const PhotoCard = ({ photo, index }: { photo: ProfilePhoto; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [liked, setLiked] = useState(false)

    return (
      <motion.div
        key={photo.id}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="relative group aspect-square bg-gray-200 rounded-xl overflow-hidden cursor-pointer"
        onClick={() => onPhotoClick?.(photo, index)}
      >
        {/* Photo */}
        <img
          src={photo.url}
          alt={photo.caption || `Photo ${index + 1}`}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <CameraIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Profile Picture Badge */}
        {photo.isProfilePicture && (
          <div className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded-full font-medium">
            Profile
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
          <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {!isOwnProfile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLiked(!liked)
                      onPhotoLike?.(photo.id)
                    }}
                    className="flex items-center gap-1 hover:scale-110 transition-transform"
                  >
                    {liked ? (
                      <HeartSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="text-sm">{photo.likes + (liked ? 1 : 0)}</span>
                  </button>
                )}
                <div className="flex items-center gap-1">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span className="text-sm">{photo.comments.length}</span>
                </div>
              </div>
              
              {isOwnProfile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.confirm('Are you sure you want to delete this photo?')) {
                      onPhotoDelete?.(photo.id)
                    }
                  }}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {photo.caption && (
              <p className="text-sm mt-2 line-clamp-2">{photo.caption}</p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  if (photos.length === 0 && !isOwnProfile) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
        <div className="text-center py-8 text-gray-500">
          <CameraIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No photos shared yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Photos {photos.length > 0 && <span className="text-gray-500">({photos.length})</span>}
        </h3>
        {hasMore && !showFullGallery && (
          <button
            onClick={() => setShowFullGallery(true)}
            className="text-sm text-[#FF6B6B] hover:text-[#FF5252]"
          >
            View All
          </button>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Existing Photos */}
        <AnimatePresence mode="popLayout">
          {visiblePhotos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </AnimatePresence>

        {/* Add Photo Button (Owner Only) */}
        {isOwnProfile && (
          <motion.div
            layout
            className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
              dragOver
                ? 'border-[#FF6B6B] bg-[#FF6B6B]/5'
                : 'border-gray-300 hover:border-[#FF6B6B] hover:bg-gray-50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusIcon className={`w-8 h-8 mb-2 ${dragOver ? 'text-[#FF6B6B]' : 'text-gray-400'}`} />
            <p className={`text-sm font-medium ${dragOver ? 'text-[#FF6B6B]' : 'text-gray-600'}`}>
              {dragOver ? 'Drop photos here' : 'Add Photos'}
            </p>
            <p className="text-xs text-gray-500 mt-1 text-center">
              JPG, PNG or WebP<br />Max 5MB each
            </p>
          </motion.div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      {/* Show More/Less Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowFullGallery(!showFullGallery)}
            className="text-sm text-[#FF6B6B] hover:text-[#FF5252] font-medium"
          >
            {showFullGallery ? 'Show Less' : `View All ${photos.length} Photos`}
          </button>
        </div>
      )}

      {/* Photo Upload Tips (Owner Only) */}
      {isOwnProfile && photos.length === 0 && (
        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <h4 className="text-sm font-semibold text-primary-900 mb-2">Photo Tips</h4>
          <ul className="text-sm text-primary-800 space-y-1">
            <li>• Add at least 3-5 photos to get more profile views</li>
            <li>• Include a clear profile picture showing your face</li>
            <li>• Share photos from events, hobbies, or activities you enjoy</li>
            <li>• Avoid group photos where it's hard to identify you</li>
          </ul>
        </div>
      )}
    </div>
  )
}