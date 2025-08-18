'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import ConversationsList from '@/components/ConversationsList'
import MessagingInterface from '@/components/MessagingInterface'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Calendar,
  ArrowLeft,
  Settings,
  Shield,
  Info
} from 'lucide-react'

export default function MessagesPage() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const translations = {
    en: {
      pageTitle: 'Messages',
      selectConversation: 'Select a conversation to start messaging',
      safeMessaging: 'Safe Messaging',
      safetyFeatures: [
        'All messages are reviewed for inappropriate content',
        'Only matched users or event attendees can message',
        'Block and report features available',
        'Portuguese community moderation'
      ],
      howItWorks: 'How Messaging Works',
      steps: [
        'Like someone\'s profile or attend the same event',
        'When both people like each other, you can message',
        'Start conversations with Portuguese cultural topics',
        'Build meaningful connections safely'
      ],
      backToList: 'Back to conversations',
      messagesPoweredBy: 'Messages powered by LusoTown\'s safety system',
      communityGuidelines: 'View community guidelines',
      reportIssue: 'Report an issue'
    },
    pt: {
      pageTitle: 'Mensagens',
      selectConversation: 'Selecione uma conversa para começar a trocar mensagens',
      safeMessaging: 'Mensagens Seguras',
      safetyFeatures: [
        'Todas as mensagens são revistas para conteúdo inapropriado',
        'Apenas utilizadores em match ou participantes de eventos podem enviar mensagens',
        'Funcionalidades de bloqueio e denúncia disponíveis',
        'Moderação da comunidade portuguesa'
      ],
      howItWorks: 'Como Funcionam as Mensagens',
      steps: [
        'Goste do perfil de alguém ou participe no mesmo evento',
        'Quando ambas as pessoas gostam uma da outra, podem trocar mensagens',
        'Inicie conversas com tópicos culturais portugueses',
        'Construa ligações significativas com segurança'
      ],
      backToList: 'Voltar às conversas',
      messagesPoweredBy: 'Mensagens alimentadas pelo sistema de segurança da LusoTown',
      communityGuidelines: 'Ver diretrizes da comunidade',
      reportIssue: 'Reportar um problema'
    }
  }

  const t = translations[language]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Check if there's a conversation ID in URL params
    const conversationId = searchParams.get('conversation')
    const userId = searchParams.get('user')
    
    if (conversationId || userId) {
      // Set selected conversation based on URL params
      // This would be implemented with actual conversation data
    }
  }, [searchParams])

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation)
  }

  const handleBackToList = () => {
    setSelectedConversation(null)
  }

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-10 h-10 text-primary-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {t.selectConversation}
        </h3>
        
        <div className="space-y-6">
          {/* Safety Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-green-800">{t.safeMessaging}</h4>
            </div>
            <ul className="space-y-2 text-sm text-green-700">
              {t.safetyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How it Works */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">{t.howItWorks}</h4>
            </div>
            <ol className="space-y-2 text-sm text-blue-700">
              {t.steps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Connection Types */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
              <Heart className="w-5 h-5 text-red-500" />
              <div>
                <div className="font-medium text-red-800 text-sm">Mutual Match</div>
                <div className="text-xs text-red-600">Both liked each other</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium text-blue-800 text-sm">Event Connection</div>
                <div className="text-xs text-blue-600">Met at same event</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3">{t.messagesPoweredBy}</p>
          <div className="flex justify-center space-x-4 text-xs">
            <button className="text-primary-600 hover:text-primary-700">
              {t.communityGuidelines}
            </button>
            <button className="text-primary-600 hover:text-primary-700">
              {t.reportIssue}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">{t.pageTitle}</h1>
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-primary-100 rounded-full">
                <Shield className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-800">Safe & Monitored</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)]">
        <div className="flex h-full">
          {/* Desktop Layout */}
          {!isMobile && (
            <>
              {/* Conversations Sidebar */}
              <div className="w-80 border-r border-gray-200 bg-white">
                <ConversationsList
                  onConversationSelect={handleConversationSelect}
                  selectedConversationId={selectedConversation?.id}
                  className="h-full"
                />
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <MessagingInterface
                    targetUserId={selectedConversation.other_participant.id}
                    targetUserName={`${selectedConversation.other_participant.first_name} ${selectedConversation.other_participant.last_name || ''}`}
                    targetUserImage={selectedConversation.other_participant.profile_picture_url}
                    targetUserLocation={selectedConversation.other_participant.location}
                    conversationId={selectedConversation.id}
                    className="h-full"
                  />
                ) : (
                  <EmptyState />
                )}
              </div>
            </>
          )}

          {/* Mobile Layout */}
          {isMobile && (
            <div className="flex-1">
              {selectedConversation ? (
                <MessagingInterface
                  targetUserId={selectedConversation.other_participant.id}
                  targetUserName={`${selectedConversation.other_participant.first_name} ${selectedConversation.other_participant.last_name || ''}`}
                  targetUserImage={selectedConversation.other_participant.profile_picture_url}
                  targetUserLocation={selectedConversation.other_participant.location}
                  conversationId={selectedConversation.id}
                  onBack={handleBackToList}
                  className="h-full"
                />
              ) : (
                <ConversationsList
                  onConversationSelect={handleConversationSelect}
                  selectedConversationId={selectedConversation?.id}
                  className="h-full"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowInfo(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t.safeMessaging}</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Safety Features</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {t.safetyFeatures.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t.howItWorks}</h4>
                <ol className="space-y-1 text-sm text-gray-600">
                  {t.steps.map((step, index) => (
                    <li key={index}>{index + 1}. {step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}