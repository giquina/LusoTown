'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { messagingService } from '@/services/messagingService'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  X, 
  MessageCircle, 
  Sparkles, 
  CheckCircle,
  Users,
  Calendar,
  Star
} from 'lucide-react'

interface MatchToMessageFlowProps {
  user: {
    id: string
    firstName: string
    lastName?: string
    profilePictureUrl?: string
    age?: number
    location?: string
    bio?: string
    interests?: string[]
    compatibilityScore?: number
  }
  onLike?: () => void
  onPass?: () => void
  onMessage?: () => void
  onClose?: () => void
}

export default function MatchToMessageFlow({
  user,
  onLike,
  onPass,
  onMessage,
  onClose
}: MatchToMessageFlowProps) {
  const { language } = useLanguage()
  const [actionTaken, setActionTaken] = useState<'like' | 'pass' | 'mutual' | null>(null)
  const [loading, setLoading] = useState(false)

  const translations = {
    en: {
      compatibility: 'Compatibility',
      location: 'Location',
      interests: 'Interests',
      like: 'Like',
      pass: 'Pass',
      sendMessage: 'Send Message',
      youLiked: 'You liked this profile!',
      mutualMatch: 'It\'s a mutual match!',
      canNowMessage: 'You can now send messages to each other',
      waitingForMatch: 'Waiting for them to like you back...',
      profilePassed: 'Profile passed',
      viewMoreProfiles: 'View more profiles',
      startConversation: 'Start Conversation',
      matchExplanation: 'When both people like each other, you can start messaging safely within the Portuguese community.',
      safetyNote: 'All messages are monitored for safety and inappropriate content.',
      culturalNote: 'Connect with fellow Portuguese speakers in London!'
    },
    pt: {
      compatibility: 'Compatibilidade',
      location: 'Localização',
      interests: 'Interesses',
      like: 'Gostar',
      pass: 'Passar',
      sendMessage: 'Enviar Mensagem',
      youLiked: 'Gostou deste perfil!',
      mutualMatch: 'É um match mútuo!',
      canNowMessage: 'Agora podem enviar mensagens um ao outro',
      waitingForMatch: 'Aguardando que gostem do seu perfil...',
      profilePassed: 'Perfil passou',
      viewMoreProfiles: 'Ver mais perfis',
      startConversation: 'Iniciar Conversa',
      matchExplanation: 'Quando ambas as pessoas gostam uma da outra, podem começar a trocar mensagens com segurança na comunidade portuguesa.',
      safetyNote: 'Todas as mensagens são monitorizadas para segurança e conteúdo inapropriado.',
      culturalNote: 'Conecte-se com outros falantes de português em Londres!'
    }
  }

  const t = translations[language]

  const handleLike = async () => {
    try {
      setLoading(true)
      await messagingService.likeUser(user.id)
      setActionTaken('like')
      onLike?.()
      
      // Simulate checking for mutual match (in real app, this would be handled by the backend trigger)
      setTimeout(() => {
        // For demo purposes, 30% chance of immediate mutual match
        if (Math.random() < 0.3) {
          setActionTaken('mutual')
        }
      }, 1000)
    } catch (error) {
      console.error('Error liking user:', error)
      alert(error instanceof Error ? error.message : 'Failed to like user')
    } finally {
      setLoading(false)
    }
  }

  const handlePass = async () => {
    try {
      setLoading(true)
      await messagingService.passUser(user.id)
      setActionTaken('pass')
      onPass?.()
    } catch (error) {
      console.error('Error passing user:', error)
      alert(error instanceof Error ? error.message : 'Failed to pass user')
    } finally {
      setLoading(false)
    }
  }

  const handleStartMessage = () => {
    onMessage?.()
  }

  if (actionTaken === 'mutual') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
          >
            <Heart className="w-8 h-8 text-white fill-current" />
          </motion.div>
          
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-bold text-green-800 mb-2"
          >
            {t.mutualMatch}
          </motion.h3>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-green-700 mb-6"
          >
            {t.canNowMessage}
          </motion.p>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handleStartMessage}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t.startConversation}</span>
          </motion.button>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 p-3 bg-blue-50 rounded-lg"
          >
            <p className="text-sm text-blue-700">{t.culturalNote}</p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (actionTaken === 'like') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg"
      >
        <div className="text-center">
          <CheckCircle className="mx-auto w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-lg font-bold text-blue-800 mb-2">{t.youLiked}</h3>
          <p className="text-blue-700 mb-4">{t.waitingForMatch}</p>
          
          <div className="p-3 bg-gray-50 rounded-lg mb-4">
            <p className="text-sm text-gray-600">{t.matchExplanation}</p>
            <p className="text-xs text-gray-500 mt-2">{t.safetyNote}</p>
          </div>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t.viewMoreProfiles}
          </button>
        </div>
      </motion.div>
    )
  }

  if (actionTaken === 'pass') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-6 bg-gray-50 border border-gray-200 rounded-lg"
      >
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mb-4">
            <X className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">{t.profilePassed}</h3>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t.viewMoreProfiles}
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Profile Image */}
      <div className="aspect-w-3 aspect-h-4 bg-gray-200">
        {user.profilePictureUrl ? (
          <img
            src={user.profilePictureUrl}
            alt={user.firstName}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Users className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.firstName} {user.lastName}, {user.age}
          </h2>
          {user.compatibilityScore && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
              <Star className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {user.compatibilityScore}% {t.compatibility}
              </span>
            </div>
          )}
        </div>

        {user.location && (
          <div className="flex items-center space-x-2 text-gray-600 mb-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{user.location}</span>
          </div>
        )}

        {user.bio && (
          <p className="text-gray-700 mb-4">{user.bio}</p>
        )}

        {user.interests && user.interests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">{t.interests}</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.slice(0, 6).map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePass}
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
            <span>{t.pass}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            disabled={loading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Heart className="w-5 h-5" />
            <span>{t.like}</span>
          </motion.button>
        </div>

        {/* Educational Note */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">{t.matchExplanation}</p>
        </div>
      </div>
    </div>
  )
}