'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { messagingService, MessagePermissionCheck } from '@/services/messagingService'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Heart, 
  Calendar, 
  Users, 
  Lock, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import logger from '@/utils/logger'

interface MessageAuthorizationGateProps {
  targetUserId: string
  targetUserName: string
  targetUserImage?: string
  children: React.ReactNode
  onPermissionGranted?: () => void
  onPermissionDenied?: () => void
}

export default function MessageAuthorizationGate({
  targetUserId,
  targetUserName,
  targetUserImage,
  children,
  onPermissionGranted,
  onPermissionDenied
}: MessageAuthorizationGateProps) {
  const { language } = useLanguage()
  const [permission, setPermission] = useState<MessagePermissionCheck | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const translations = {
    en: {
      checking: 'Checking messaging permissions...',
      authorized: 'You can message this user',
      unauthorized: 'Unable to send message',
      mutualMatch: 'You are mutually matched',
      sharedEvents: 'You attended events together',
      noPermission: 'You can only message users you are matched with or have attended events together.',
      howToMessage: 'How to message this user:',
      steps: {
        match: 'Like their profile and wait for them to like you back',
        event: 'Attend the same community events to unlock messaging'
      },
      sharedEventsCount: (count: number) => `${count} shared event${count === 1 ? '' : 's'}`,
      learnMore: 'Learn about our safety features',
      tryAgain: 'Check again'
    },
    pt: {
      checking: 'Verificando permissões de mensagem...',
      authorized: 'Pode enviar mensagem a este utilizador',
      unauthorized: 'Não é possível enviar mensagem',
      mutualMatch: 'Vocês fazem match mútuo',
      sharedEvents: 'Participaram em eventos juntos',
      noPermission: 'Só pode enviar mensagens a utilizadores com quem faz match ou participou em eventos juntos.',
      howToMessage: 'Como enviar mensagem a este utilizador:',
      steps: {
        match: 'Goste do perfil deles e espere que gostem do seu',
        event: 'Participe nos mesmos eventos da comunidade para desbloquear mensagens'
      },
      sharedEventsCount: (count: number) => `${count} evento${count === 1 ? '' : 's'} partilhado${count === 1 ? '' : 's'}`,
      learnMore: 'Saiba mais sobre as nossas funcionalidades de segurança',
      tryAgain: 'Tentar novamente'
    }
  }

  const t = translations[language]

  useEffect(() => {
    checkPermissions()
  }, [targetUserId])

  const checkPermissions = async () => {
    if (!targetUserId) return

    try {
      setLoading(true)
      setError(null)
      
      const permissionResult = await messagingService.checkMessagePermission(targetUserId)
      setPermission(permissionResult)
      
      if (permissionResult.can_message && onPermissionGranted) {
        onPermissionGranted()
      } else if (!permissionResult.can_message && onPermissionDenied) {
        onPermissionDenied()
      }
    } catch (err) {
      logger.error('Message authorization check failed', err, {
        area: 'messaging',
        action: 'check_authorization',
        culturalContext: 'lusophone',
        targetUserId
      })
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-3 text-gray-600">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
          <span>{t.checking}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-3 text-red-700 mb-4">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">Error</span>
        </div>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={checkPermissions}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {t.tryAgain}
        </button>
      </div>
    )
  }

  // If user has permission, render children (messaging interface)
  if (permission?.can_message) {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div className="flex items-center space-x-3 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{t.authorized}</span>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {permission.has_mutual_match && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full text-sm text-green-700">
                <Heart className="h-4 w-4" />
                <span>{t.mutualMatch}</span>
              </div>
            )}
            
            {permission.has_event_permission && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-full text-sm text-blue-700">
                <Calendar className="h-4 w-4" />
                <span>{t.sharedEventsCount(permission.shared_events_count)}</span>
              </div>
            )}
          </div>
        </motion.div>
        
        {children}
      </div>
    )
  }

  // If no permission, show explanation and guidance
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-50 border border-gray-200 rounded-lg"
    >
      <div className="flex items-center space-x-3 text-gray-700 mb-4">
        <Lock className="h-5 w-5" />
        <span className="font-medium">{t.unauthorized}</span>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        {targetUserImage && (
          <img
            src={targetUserImage}
            alt={targetUserName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <h3 className="font-medium text-gray-900">{targetUserName}</h3>
          <p className="text-sm text-gray-600">{t.noPermission}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">{t.howToMessage}</h4>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
            <Heart className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900">Mutual Match</h5>
              <p className="text-sm text-gray-600">{t.steps.match}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
            <Calendar className="h-5 w-5 text-secondary-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900">Shared Events</h5>
              <p className="text-sm text-gray-600">{t.steps.event}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{t.learnMore}</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}