'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PaperAirplaneIcon, UserIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { COMPONENT_Z_INDEX } from '@/config/z-index-layers'
import { useAriaAnnouncements } from '@/hooks/useAriaAnnouncements'
import { useFocusIndicator } from '@/hooks/useFocusManagement'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'system' | 'assistant'
  timestamp: Date
  senderName?: string
}

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  recipientName?: string
  recipientId?: string
  initialMessages?: ChatMessage[]
  onSendMessage?: (message: string, recipientId?: string) => void
}

export default function ChatWindow({ 
  isOpen, 
  onClose, 
  recipientName,
  recipientId,
  initialMessages = [],
  onSendMessage 
}: ChatWindowProps) {
  const { t, language } = useLanguage()
  const { announcePolite, announceAssertive } = useAriaAnnouncements()
  const { addFocusClasses } = useFocusIndicator()
  
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus management when chat opens
  useEffect(() => {
    if (isOpen) {
      // Delay focus to ensure DOM is ready
      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus()
        announcePolite({
          en: `Chat with ${recipientName || 'LusoBot'} opened. Type your message and press Enter to send.`,
          pt: `Chat com ${recipientName || 'LusoBot'} aberto. Digite sua mensagem e pressione Enter para enviar.`
        })
      }, 300)
      
      return () => clearTimeout(focusTimeout)
    }
  }, [isOpen, recipientName, announcePolite])

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      senderName: t('common.you') || 'You'
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    // Announce message sent
    announceAssertive({
      en: `Message sent: ${newMessage.text}`,
      pt: `Mensagem enviada: ${newMessage.text}`
    })

    // Call external handler if provided
    if (onSendMessage) {
      onSendMessage(newMessage.text, recipientId)
    }

    // Simulate response for demo purposes
    setTimeout(() => {
      const responses = {
        en: [
          "Thanks for your message! I'll get back to you soon.",
          "That's interesting! Tell me more.",
          "I understand. Let me help you with that.",
          "Great question! Here's what I think..."
        ],
        pt: [
          "Obrigado pela sua mensagem! Responderei em breve.",
          "Isso é interessante! Conte-me mais.",
          "Entendo. Deixe-me ajudá-lo com isso.",
          "Ótima pergunta! Aqui está o que penso..."
        ]
      }
      
      const responseText = responses[language][Math.floor(Math.random() * responses[language].length)]
      
      const systemResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: recipientId ? 'system' : 'assistant',
        timestamp: new Date(),
        senderName: recipientName || 'LusoBot'
      }
      
      setMessages(prev => [...prev, systemResponse])
      setIsTyping(false)
      
      announcePolite({
        en: `New message from ${systemResponse.senderName}: ${systemResponse.text}`,
        pt: `Nova mensagem de ${systemResponse.senderName}: ${systemResponse.text}`
      })
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClose = () => {
    announcePolite({
      en: 'Chat window closed',
      pt: 'Janela de chat fechada'
    })
    onClose()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4"
        style={{ zIndex: COMPONENT_Z_INDEX.lusoBotWidget }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose()
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
      >
        <motion.div 
          ref={chatContainerRef}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full h-[32rem] flex flex-col overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 id="chat-title" className="text-lg font-semibold">
                  {recipientName || (language === 'pt' ? 'LusoBot' : 'LusoBot')}
                </h3>
                {isTyping && (
                  <p className="text-sm text-white/80">
                    {language === 'pt' ? 'A digitar...' : 'Typing...'}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={language === 'pt' ? 'Fechar chat' : 'Close chat'}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50" role="log" aria-live="polite">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-medium mb-2">
                  {language === 'pt' 
                    ? `Inicie uma conversa com ${recipientName || 'LusoBot'}` 
                    : `Start a conversation with ${recipientName || 'LusoBot'}`
                  }
                </p>
                <p className="text-sm">
                  {language === 'pt' 
                    ? 'Digite uma mensagem abaixo para começar' 
                    : 'Type a message below to get started'
                  }
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white text-gray-900 shadow-sm border'
                  }`}>
                    <p className="text-sm break-words">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white text-gray-900 shadow-sm border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'pt' 
                  ? 'Digite uma mensagem...' 
                  : 'Type a message...'
                }
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-label={language === 'pt' ? 'Campo de mensagem' : 'Message input field'}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label={language === 'pt' ? 'Enviar mensagem' : 'Send message'}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
