'use client'

import { motion } from 'framer-motion'
import { buildUnsplashUrl } from '@/config'
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline'
import { buildUnsplashUrl } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { buildUnsplashUrl } from '@/config'
import { Connection } from '@/context/NetworkingContext'
import { buildUnsplashUrl } from '@/config'

interface NetworkPreviewProps {
  eventId: string
  connections: Connection[]
  maxPreview?: number
  showAddButton?: boolean
}

export default function NetworkPreview({ 
  eventId, 
  connections, 
  maxPreview = 3,
  showAddButton = true 
}: NetworkPreviewProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const previewConnections = connections.slice(0, maxPreview)
  const remainingCount = Math.max(0, connections.length - maxPreview)

  if (connections.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary-50 border border-primary-200 rounded-lg p-4"
    >
      <div className="flex items-center gap-3">
        <UserGroupIcon className="w-5 h-5 text-primary-600" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-primary-700">
            {isPortuguese ? 'Da sua rede' : 'From your network'}
          </h4>
          <p className="text-xs text-primary-600">
            {connections.length} {isPortuguese 
              ? `conexã${connections.length === 1 ? 'o' : 'ões'} também vã${connections.length === 1 ? 'i' : 'o'}`
              : `connection${connections.length === 1 ? '' : 's'} also attending`
            }
          </p>
        </div>
      </div>

      {/* Connection Avatars */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex -space-x-2">
          {previewConnections.map((connection) => (
            <div
              key={connection.id}
              className="relative"
            >
              <img
                src={connection.connectedUser.profilePictureUrl || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format`}
                alt={connection.connectedUser.firstName}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                title={`${connection.connectedUser.firstName} ${connection.connectedUser.lastName || ''}`}
              />
              {connection.connectedUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
          
          {remainingCount > 0 && (
            <div className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-primary-700">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>

        {showAddButton && (
          <button 
            className="ml-2 w-8 h-8 rounded-full bg-white border-2 border-dashed border-primary-300 flex items-center justify-center hover:border-primary-400 hover:bg-primary-50 transition-colors"
            title={isPortuguese ? 'Convidar mais pessoas' : 'Invite more people'}
          >
            <PlusIcon className="w-4 h-4 text-primary-600" />
          </button>
        )}
      </div>

      {/* Names Preview */}
      <div className="mt-2">
        <p className="text-xs text-primary-600">
          {previewConnections.map(conn => conn.connectedUser.firstName).join(', ')}
          {remainingCount > 0 && (
            <span>
              {' '}{isPortuguese ? 'e mais' : 'and'} {remainingCount} {isPortuguese ? 'outros' : 'others'}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  )
}