'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Shield, Trash2, Clock, Ban, AlertTriangle } from 'lucide-react'
import { ChatMessage, ChatUser } from '@/types/chat'
import { REGIONAL_INDICATORS } from '@/lib/portuguese-emotes'
import { socketManager } from '@/lib/socket-client'

interface ChatMessageProps {
  message: ChatMessage
  currentUser: ChatUser | null
  canModerate: boolean
  onReaction: (emoji: string) => void
  language: 'en' | 'pt'
}

export default function ChatMessageComponent({ 
  message, 
  currentUser, 
  canModerate, 
  onReaction, 
  language 
}: ChatMessageProps) {
  const [showModerationMenu, setShowModerationMenu] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  if (isDeleted) return null

  const isOwnMessage = currentUser?.id === message.userId
  const regionInfo = REGIONAL_INDICATORS[message.userRegion]

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDeleteMessage = () => {
    if (canModerate) {
      socketManager.deleteMessage(message.id)
      setIsDeleted(true)
    }
  }

  const handleTimeoutUser = (duration: number) => {
    if (canModerate && !message.isHost && !message.isModerator) {
      socketManager.timeoutUser(message.userId, duration)
    }
  }

  const handleBanUser = () => {
    if (canModerate && !message.isHost && !message.isModerator) {
      socketManager.banUser(message.userId)
    }
  }

  const handleReactionClick = (emoji: string) => {
    onReaction(emoji)
  }

  // Parse message for emotes (simple implementation)
  const renderMessageContent = (text: string) => {
    // In a full implementation, this would render actual emote images
    // For now, we'll keep the emote codes as text
    return text
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-3 group ${
        message.isSuperchat 
          ? 'bg-accent-50 p-3 rounded-lg border-l-4 border-accent-500' 
          : ''
      }`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
        message.isHost 
          ? 'bg-gradient-to-r from-action-500 to-secondary-500'
          : message.isModerator
          ? 'bg-gradient-to-r from-blue-500 to-blue-600'
          : message.isSubscriber
          ? 'bg-gradient-to-r from-premium-500 to-premium-600'
          : 'bg-gradient-to-r from-gray-400 to-gray-500'
      }`}>
        {message.username.slice(0, 2).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        {/* User Info Header */}
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`text-sm font-medium ${
            message.isHost 
              ? 'text-action-600' 
              : message.isModerator
              ? 'text-blue-600'
              : 'text-gray-700'
          }`}>
            {message.username}
          </span>
          
          {/* Regional Indicator */}
          <span 
            className="text-xs flex items-center gap-1"
            title={regionInfo.name}
          >
            <span>{regionInfo.flag}</span>
          </span>
          
          {/* Badges */}
          {message.isHost && (
            <span className="bg-action-100 text-action-700 px-1.5 py-0.5 rounded text-xs font-medium">
              {language === 'pt' ? 'HOST' : 'HOST'}
            </span>
          )}
          
          {message.isModerator && !message.isHost && (
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-blue-600" />
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">
                {language === 'pt' ? 'MOD' : 'MOD'}
              </span>
            </div>
          )}
          
          {message.isSubscriber && !message.isHost && !message.isModerator && (
            <Crown className="w-3 h-3 text-premium-600" />
          )}
          
          {/* Superchat Amount */}
          {message.isSuperchat && message.superchatAmount && (
            <span className="bg-accent-200 text-accent-800 px-2 py-0.5 rounded-full text-xs font-bold">
              €{message.superchatAmount}
            </span>
          )}
          
          {/* Timestamp */}
          <span className="text-xs text-gray-400 ml-auto">
            {formatTime(message.timestamp)}
          </span>

          {/* Moderation Menu */}
          {canModerate && !isOwnMessage && (
            <div className="relative">
              <button
                onClick={() => setShowModerationMenu(!showModerationMenu)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 
                  rounded transition-all"
              >
                <AlertTriangle className="w-3 h-3" />
              </button>

              {showModerationMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg 
                    shadow-lg z-50 py-1 min-w-32"
                >
                  <button
                    onClick={handleDeleteMessage}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                      text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                    {language === 'pt' ? 'Apagar' : 'Delete'}
                  </button>
                  
                  {!message.isModerator && !message.isHost && (
                    <>
                      <button
                        onClick={() => handleTimeoutUser(60)}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                          text-amber-600 hover:text-amber-700"
                      >
                        <Clock className="w-3 h-3" />
                        {language === 'pt' ? '1min timeout' : '1min timeout'}
                      </button>
                      
                      <button
                        onClick={() => handleTimeoutUser(600)}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                          text-amber-600 hover:text-amber-700"
                      >
                        <Clock className="w-3 h-3" />
                        {language === 'pt' ? '10min timeout' : '10min timeout'}
                      </button>
                      
                      <hr className="my-1" />
                      
                      <button
                        onClick={handleBanUser}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 
                          text-red-600 hover:text-red-700"
                      >
                        <Ban className="w-3 h-3" />
                        {language === 'pt' ? 'Banir' : 'Ban'}
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`text-sm break-words ${
          message.isSuperchat ? 'font-medium' : 'text-gray-900'
        }`}>
          {renderMessageContent(message.message)}
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {message.reactions.map((reaction, index) => {
              const hasReacted = currentUser && reaction.users.includes(currentUser.id)
              
              return (
                <button
                  key={index}
                  onClick={() => handleReactionClick(reaction.emoji)}
                  disabled={!currentUser}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                    hasReacted
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : currentUser
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      : 'bg-gray-100 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                  title={`${reaction.users.length} ${
                    language === 'pt' 
                      ? (reaction.users.length === 1 ? 'reação' : 'reações')
                      : (reaction.users.length === 1 ? 'reaction' : 'reactions')
                  }`}
                >
                  <span>{reaction.emoji}</span>
                  <span className="font-medium">{reaction.count}</span>
                </button>
              )
            })}
            
            {/* Add reaction button */}
            {currentUser && (
              <button
                onClick={() => setShowModerationMenu(false)} // Could be replaced with quick reaction picker
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 
                  hover:text-gray-600 text-xs transition-colors flex items-center justify-center"
                title={language === 'pt' ? 'Adicionar reação' : 'Add reaction'}
              >
                +
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}