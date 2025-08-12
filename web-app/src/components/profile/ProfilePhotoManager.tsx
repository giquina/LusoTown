'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlusIcon, 
  XMarkIcon, 
  CameraIcon,
  PhotoIcon,
  StarIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline'
import { getCurrentUser, UserProfile, uploadPhoto, updateProfile, deletePhoto, validateImage, compressImage } from '@/lib/supabase'

interface PhotoUpload {
  id: string
  file: File
  preview: string
  caption?: string
  isProfilePicture: boolean
  uploadProgress: number
  status: 'uploading' | 'completed' | 'error'
}

interface ProfilePhotoManagerProps {
  profile: UserProfile | null
  onUpdate: () => void
}

export default function ProfilePhotoManager({ profile, onUpdate }: ProfilePhotoManagerProps) {
  const [uploads, setUploads] = useState<PhotoUpload[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get current user on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        console.error('Error loading user:', error)
      }
    }
    loadUser()
  }, [])

  const photos = profile?.photos || []
  const profilePicture = photos.find(p => p.is_profile_picture)
  const hasProfilePicture = !!profile?.profile_picture_url

  const createPhotoUpload = (file: File, isProfilePicture: boolean = false): PhotoUpload => {
    return {
      id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      isProfilePicture,
      uploadProgress: 0,
      status: 'uploading'
    }
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || !currentUser) return

    const newUploads: PhotoUpload[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const validation = validateImage(file)
      
      if (!validation.valid) {
        // Use a simple alert instead of toast for now
        alert(`${file.name}: ${validation.error}`)
        continue
      }

      try {
        // Compress the image
        const compressedFile = await compressImage(file)
        
        // Create upload object - first upload becomes profile picture if none exists
        const upload = createPhotoUpload(compressedFile, !hasProfilePicture && i === 0)
        newUploads.push(upload)
      } catch (error) {
        alert(`Failed to process ${file.name}`)
      }
    }

    if (newUploads.length > 0) {
      setUploads(prev => [...prev, ...newUploads])
      // Start uploading
      for (const upload of newUploads) {
        handlePhotoUpload(upload)
      }
    }
  }

  const handlePhotoUpload = async (upload: PhotoUpload) => {
    if (!currentUser) return

    try {
      setUploads(prev => prev.map(u => 
        u.id === upload.id 
          ? { ...u, status: 'uploading' as const }
          : u
      ))

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploads(prev => prev.map(u => 
          u.id === upload.id && u.uploadProgress < 90
            ? { ...u, uploadProgress: u.uploadProgress + 10 }
            : u
        ))
      }, 200)

      const result = await uploadPhoto(currentUser.id, upload.file, upload.isProfilePicture)

      clearInterval(progressInterval)

      if (result.success) {
        setUploads(prev => prev.map(u => 
          u.id === upload.id 
            ? { ...u, status: 'completed' as const, uploadProgress: 100 }
            : u
        ))
        
        alert('Photo uploaded successfully!')
        
        // Remove from uploads after delay and refresh profile
        setTimeout(() => {
          setUploads(prev => prev.filter(u => u.id !== upload.id))
          onUpdate()
        }, 2000)
      } else {
        setUploads(prev => prev.map(u => 
          u.id === upload.id 
            ? { ...u, status: 'error' as const }
            : u
        ))
        alert(result.error || 'Failed to upload photo')
      }
    } catch (error) {
      setUploads(prev => prev.map(u => 
        u.id === upload.id 
          ? { ...u, status: 'error' as const }
          : u
      ))
      alert('Upload failed')
    }
  }

  const handleSetProfilePicture = async (photoUrl: string) => {
    if (!currentUser) return

    try {
      const result = await updateProfile(currentUser.id, { 
        profile_picture_url: photoUrl 
      })
      
      if (result.success) {
        alert('Profile picture updated!')
        onUpdate()
      } else {
        alert(result.error || 'Failed to update profile picture')
      }
    } catch (error) {
      alert('Failed to update profile picture')
    }
  }

  const handleDeletePhoto = async (photoPath: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      const result = await deletePhoto(photoPath)
      
      if (result.success) {
        alert('Photo deleted')
        onUpdate()
      } else {
        alert(result.error || 'Failed to delete photo')
      }
    } catch (error) {
      alert('Failed to delete photo')
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

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(u => u.id !== uploadId))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Photo Gallery</h2>
        <p className="text-gray-600">
          Add photos to showcase your personality and interests. Your first photo will be your profile picture.
        </p>
      </div>

      {/* Current Profile Picture */}
      {hasProfilePicture && profile?.profile_picture_url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            Current Profile Picture
          </h3>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-lg">
              <img
                src={profile.profile_picture_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                This is how other members see you in their feed and search results.
              </p>
              <p className="text-sm text-gray-500">
                Profile picture set • AdyaTribe verified
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver
              ? 'border-[#FF6B6B] bg-[#FF6B6B]/5'
              : 'border-gray-300 hover:border-[#FF6B6B] hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              dragOver ? 'bg-[#FF6B6B] text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              <ArrowUpTrayIcon className="w-8 h-8" />
            </div>
            
            <div>
              <p className={`text-lg font-medium ${
                dragOver ? 'text-[#FF6B6B]' : 'text-gray-900'
              }`}>
                {dragOver ? 'Drop your photos here!' : 'Upload Photos'}
              </p>
              <p className="text-gray-600 mt-1">
                Drag and drop photos here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#FF6B6B] hover:text-[#FF5252] font-medium"
                >
                  browse files
                </button>
              </p>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>• Maximum file size: 5MB</p>
              <p>• Supported formats: JPG, PNG, WebP</p>
              <p>• Recommended: Clear, well-lit photos that show your face</p>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </motion.div>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-gray-900">Uploading Photos</h3>
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={upload.preview}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {upload.file.name}
                  </span>
                  <button
                    onClick={() => removeUpload(upload.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      upload.status === 'completed' 
                        ? 'bg-green-500' 
                        : upload.status === 'error'
                        ? 'bg-red-500'
                        : 'bg-[#FF6B6B]'
                    }`}
                    style={{ width: `${upload.uploadProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-600">
                    {upload.status === 'completed' && '✅ Upload complete'}
                    {upload.status === 'error' && '❌ Upload failed'}
                    {upload.status === 'uploading' && `Uploading... ${upload.uploadProgress}%`}
                  </span>
                  {upload.isProfilePicture && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Profile Picture
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Photo Gallery Status */}
      {!hasProfilePicture && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <PhotoIcon className="w-5 h-5" />
            No Profile Picture Yet
          </h3>
          <p className="text-yellow-800 mb-4">
            Upload your first photo to complete your profile and help other members recognize you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
            <div>
              <h4 className="font-medium mb-2">Benefits of adding a photo:</h4>
              <ul className="space-y-1">
                <li>• Increase profile views by 70%</li>
                <li>• Build trust with the community</li>
                <li>• Help others recognize you at events</li>
                <li>• Complete your profile verification</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">What makes a great photo:</h4>
              <ul className="space-y-1">
                <li>• Clear view of your face</li>
                <li>• Good lighting</li>
                <li>• Recent photo (within 1 year)</li>
                <li>• Genuine smile</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Photo Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <PhotoIcon className="w-5 h-5" />
          Photo Tips for Better Connections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">✅ What to Include:</h4>
            <ul className="space-y-1">
              <li>• Clear, well-lit photos of your face</li>
              <li>• Photos showing your interests & hobbies</li>
              <li>• Recent photos (within the last year)</li>
              <li>• Natural, smiling expressions</li>
              <li>• 3-5 photos for best results</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">❌ What to Avoid:</h4>
            <ul className="space-y-1">
              <li>• Group photos where you're hard to identify</li>
              <li>• Heavily filtered or edited photos</li>
              <li>• Photos with inappropriate content</li>
              <li>• Blurry or dark images</li>
              <li>• Photos with other people's faces visible</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}