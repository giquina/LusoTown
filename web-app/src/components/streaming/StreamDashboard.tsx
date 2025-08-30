'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { STREAMING_CONFIG } from '@/config/streaming'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { PlayIcon, StopIcon, CogIcon, TvIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface StreamRoom {
  id: string
  roomName: string
  title: string
  description: string
  category: string
  subcategory?: string
  isPrivate: boolean
  maxParticipants: number
  tags: string[]
  language: string
  status: 'scheduled' | 'live' | 'ended'
  creator: {
    id: string
    name: string
    avatar?: string
    heritage?: string
  }
  participant_count?: number
  createdAt: string
}

export function StreamDashboard() {
  const { t, language } = useLanguage()
  const { user, profile } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [myStreams, setMyStreams] = useState<StreamRoom[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showOBSGuide, setShowOBSGuide] = useState(false)
  const [activeStream, setActiveStream] = useState<StreamRoom | null>(null)

  useEffect(() => {
    if (user) {
      fetchMyStreams()
    }
  }, [user])

  const fetchMyStreams = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/streaming/room/create')
      
      if (response.ok) {
        const data = await response.json()
        // Filter to show only user's streams
        const userStreams = data.rooms?.filter((room: StreamRoom) => 
          room.creator.id === user?.id
        ) || []
        setMyStreams(userStreams)
      }
    } catch (error) {
      console.error('Error fetching streams:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateStream = () => {
    setShowCreateModal(true)
  }

  const handleEndStream = async (roomName: string) => {
    try {
      // Implementation for ending stream
      console.log('Ending stream:', roomName)
      // Update stream status to ended
      await fetchMyStreams()
    } catch (error) {
      console.error('Error ending stream:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <TvIcon className="w-16 h-16 text-primary-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-900 mb-2">
            {t('streaming.dashboard.loginRequired')}
          </h2>
          <p className="text-primary-600">
            {t('streaming.dashboard.loginDescription')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-2">
              🎥 {t('streaming.dashboard.title')}
            </h1>
            <p className="text-primary-600 text-lg">
              {t('streaming.dashboard.subtitle')}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowOBSGuide(true)}
              className="flex items-center gap-2"
            >
              <CogIcon className="w-5 h-5" />
              {t('streaming.dashboard.obsGuide')}
            </Button>
            <Button
              onClick={handleCreateStream}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
            >
              <PlayIcon className="w-5 h-5" />
              {t('streaming.dashboard.createStream')}
            </Button>
          </div>
        </div>

        {/* Portuguese Cultural Categories Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {Object.entries(STREAMING_CONFIG.categories).map(([key, category]) => (
            <motion.div
              key={key}
              className="bg-white rounded-lg p-4 text-center shadow-sm border border-primary-200"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-primary-900 text-sm">
                {category.name[language as keyof typeof category.name]}
              </h3>
              <p className="text-xs text-primary-600 mt-1">
                {category.subcategories.length} {t('streaming.dashboard.subcategories')}
              </p>
            </motion.div>
          ))}
        </div>

        {/* My Streams */}
        <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">
            {t('streaming.dashboard.myStreams')}
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : myStreams.length === 0 ? (
            <div className="text-center py-12">
              <TvIcon className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                {t('streaming.dashboard.noStreams.title')}
              </h3>
              <p className="text-primary-600 mb-6">
                {t('streaming.dashboard.noStreams.description')}
              </p>
              <Button onClick={handleCreateStream}>
                {t('streaming.dashboard.createFirstStream')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {myStreams.map((stream) => (
                <motion.div
                  key={stream.id}
                  className="border border-primary-200 rounded-lg overflow-hidden"
                  whileHover={{ y: -2 }}
                >
                  {/* Stream Thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-primary-600 to-primary-800 relative">
                    <CloudinaryImage
                      src={`streaming-thumbnails/${stream.category}-${stream.id}`}
                      alt={stream.title}
                      fill
                      className="object-cover"
                      fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-3xl mb-2">
                              {STREAMING_CONFIG.categories[stream.category as keyof typeof STREAMING_CONFIG.categories]?.icon || '🎥'}
                            </div>
                            <p className="font-semibold">
                              {STREAMING_CONFIG.categories[stream.category as keyof typeof STREAMING_CONFIG.categories]?.name[language as keyof typeof STREAMING_CONFIG.categories[keyof typeof STREAMING_CONFIG.categories]['name']] || stream.category}
                            </p>
                          </div>
                        </div>
                      }
                    />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      stream.status === 'live' 
                        ? 'bg-red-600 text-white' 
                        : stream.status === 'scheduled'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-600 text-white'
                    }`}>
                      {t(`streaming.status.${stream.status}`)}
                    </div>
                  </div>

                  {/* Stream Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-primary-900 text-lg mb-2 line-clamp-2">
                      {stream.title}
                    </h3>
                    <p className="text-primary-600 text-sm mb-3 line-clamp-2">
                      {stream.description}
                    </p>
                    
                    {/* Stream Stats */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4 text-sm text-primary-600">
                        <span>👥 {stream.participant_count || 0}</span>
                        <span>
                          {STREAMING_CONFIG.categories[stream.category as keyof typeof STREAMING_CONFIG.categories]?.icon} 
                          {STREAMING_CONFIG.categories[stream.category as keyof typeof STREAMING_CONFIG.categories]?.name[language as keyof typeof STREAMING_CONFIG.categories[keyof typeof STREAMING_CONFIG.categories]['name']]}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {stream.status === 'live' ? (
                        <>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => setActiveStream(stream)}
                          >
                            {t('streaming.dashboard.manageStream')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEndStream(stream.roomName)}
                            className="flex items-center gap-1"
                          >
                            <StopIcon className="w-4 h-4" />
                            {t('streaming.dashboard.endStream')}
                          </Button>
                        </>
                      ) : stream.status === 'scheduled' ? (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => setActiveStream(stream)}
                        >
                          {t('streaming.dashboard.startStream')}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          disabled
                        >
                          {t('streaming.dashboard.streamEnded')}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Stream Modal */}
      {showCreateModal && (
        <CreateStreamModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onStreamCreated={fetchMyStreams}
        />
      )}

      {/* OBS Setup Guide Modal */}
      {showOBSGuide && (
        <OBSGuideModal
          isOpen={showOBSGuide}
          onClose={() => setShowOBSGuide(false)}
        />
      )}

      {/* Active Stream Management */}
      {activeStream && (
        <StreamManagementModal
          stream={activeStream}
          isOpen={!!activeStream}
          onClose={() => setActiveStream(null)}
          onStreamUpdated={fetchMyStreams}
        />
      )}
    </div>
  )
}

// Create Stream Modal Component
function CreateStreamModal({ 
  isOpen, 
  onClose, 
  onStreamCreated 
}: { 
  isOpen: boolean
  onClose: () => void
  onStreamCreated: () => void
}) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'musica',
    subcategory: '',
    isPrivate: false,
    maxParticipants: 100,
    tags: [] as string[],
    language: language
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/streaming/room/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Stream created:', data)
        onStreamCreated()
        onClose()
        // You might want to redirect to the stream management page here
      } else {
        console.error('Failed to create stream')
      }
    } catch (error) {
      console.error('Error creating stream:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategory = STREAMING_CONFIG.categories[formData.category as keyof typeof STREAMING_CONFIG.categories]

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          {t('streaming.createModal.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              {t('streaming.createModal.title')}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder={t('streaming.createModal.titlePlaceholder')}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              {t('streaming.createModal.description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder={t('streaming.createModal.descriptionPlaceholder')}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">
              {t('streaming.createModal.category')}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
              className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              {Object.entries(STREAMING_CONFIG.categories).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.icon} {category.name[language as keyof typeof category.name]}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {selectedCategory && (
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                {t('streaming.createModal.subcategory')}
              </label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">
                  {t('streaming.createModal.selectSubcategory')}
                </option>
                {selectedCategory.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name[language as keyof typeof sub.name]}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Privacy & Participants */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary-700 mb-2">
                {t('streaming.createModal.maxParticipants')}
              </label>
              <select
                value={formData.maxParticipants}
                onChange={(e) => setFormData({...formData, maxParticipants: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={10}>10 pessoas</option>
                <option value={25}>25 pessoas</option>
                <option value={50}>50 pessoas</option>
                <option value={100}>100 pessoas</option>
                <option value={200}>200 pessoas</option>
              </select>
            </div>
            <div className="flex items-center mt-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPrivate}
                  onChange={(e) => setFormData({...formData, isPrivate: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-primary-700">
                  {t('streaming.createModal.private')}
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingSpinner size="sm" />
              ) : (
                t('streaming.createModal.create')
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

// OBS Setup Guide Modal
function OBSGuideModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void
}) {
  const { t } = useLanguage()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          🎥 {t('streaming.obsGuide.title')}
        </h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="border border-primary-200 rounded-lg p-4">
            <h3 className="font-bold text-primary-900 mb-3">
              1. {t('streaming.obsGuide.step1.title')}
            </h3>
            <p className="text-primary-600 mb-3">
              {t('streaming.obsGuide.step1.description')}
            </p>
            <div className="bg-primary-50 p-3 rounded-lg">
              <p className="text-sm text-primary-800">
                💡 {t('streaming.obsGuide.step1.tip')}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border border-primary-200 rounded-lg p-4">
            <h3 className="font-bold text-primary-900 mb-3">
              2. {t('streaming.obsGuide.step2.title')}
            </h3>
            <div className="space-y-2 text-sm text-primary-700">
              <p><strong>Server:</strong> {process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'rtmp://localhost:1935/live/'}</p>
              <p><strong>Stream Key:</strong> {t('streaming.obsGuide.step2.streamKey')}</p>
            </div>
          </div>

          {/* Recommended Settings */}
          <div className="border border-primary-200 rounded-lg p-4">
            <h3 className="font-bold text-primary-900 mb-3">
              ⚙️ {t('streaming.obsGuide.settings.title')}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>{t('streaming.obsGuide.settings.resolution')}:</strong> 1920x1080</p>
                <p><strong>{t('streaming.obsGuide.settings.fps')}:</strong> 30 FPS</p>
                <p><strong>{t('streaming.obsGuide.settings.bitrate')}:</strong> 2500 kbps</p>
              </div>
              <div>
                <p><strong>{t('streaming.obsGuide.settings.encoder')}:</strong> x264</p>
                <p><strong>{t('streaming.obsGuide.settings.preset')}:</strong> veryfast</p>
                <p><strong>{t('streaming.obsGuide.settings.audio')}:</strong> 160 kbps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button onClick={onClose}>
            {t('common.close')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// Stream Management Modal (placeholder)
function StreamManagementModal({ 
  stream, 
  isOpen, 
  onClose, 
  onStreamUpdated 
}: { 
  stream: StreamRoom
  isOpen: boolean
  onClose: () => void
  onStreamUpdated: () => void
}) {
  const { t } = useLanguage()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-6">
          {t('streaming.manageModal.title')}: {stream.title}
        </h2>
        
        <p className="text-primary-600 mb-6">
          {t('streaming.manageModal.description')}
        </p>

        <div className="flex justify-end">
          <Button onClick={onClose}>
            {t('common.close')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}