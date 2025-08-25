'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
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

function MessagesContent() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const searchParams = useSearchParams()
  const { language } = useLanguage()

  useEffect(() => {
    const conversationId = searchParams.get('conversation')
    if (conversationId) {
      setSelectedConversationId(conversationId)
    }
  }, [searchParams])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const isPortuguese = language === 'pt'

  const content = {
    title: isPortuguese ? 'Mensagens' : 'Messages',
    subtitle: isPortuguese ? 'Conecta com a comunidade portuguesa' : 'Connect with Lusophone community',
    noConversation: isPortuguese ? 'Seleciona uma conversa para começar' : 'Select a conversation to start',
    instructions: isPortuguese 
      ? 'Só podes enviar mensagens a pessoas com quem fizeste match ou que participaram no mesmo evento.'
      : 'You can only message people you\'ve matched with or who attended the same event.',
    getStarted: isPortuguese ? 'Como Começar:' : 'Get Started:',
    step1: isPortuguese ? '1. Vai a "Encontrar Match" para encontrar compatibilidades' : '1. Go to "Find Matches" to find compatible connections',
    step2: isPortuguese ? '2. Participa em eventos da comunidade portuguesa' : '2. Attend Lusophone community events',
    step3: isPortuguese ? '3. Faz match ou conecta em eventos para desbloquear mensagens' : '3. Match or connect at events to unlock messaging',
    findMatches: isPortuguese ? 'Encontrar Matches' : 'Find Matches',
    browseEvents: isPortuguese ? 'Ver Eventos' : 'Browse Events',
    back: isPortuguese ? 'Voltar' : 'Back'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{content.title}</h1>
                <p className="text-sm text-gray-600">{content.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                {isPortuguese ? 'Mensagens Seguras' : 'Safe Messaging'}
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                {content.instructions}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${isMobile && selectedConversationId ? 'hidden' : 'block'} lg:col-span-1`}
          >
            <ConversationsList 
              onSelectConversation={(id) => setSelectedConversationId(id)}
              selectedConversationId={selectedConversationId}
            />
          </motion.div>

          {/* Messaging Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${isMobile && !selectedConversationId ? 'hidden' : 'block'} lg:col-span-2`}
          >
            {selectedConversationId ? (
              <div className="relative h-full">
                {isMobile && (
                  <button
                    onClick={() => setSelectedConversationId(null)}
                    className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <MessagingInterface conversationId={selectedConversationId} />
              </div>
            ) : (
              <div className="h-full bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <MessageCircle className="w-16 h-16 text-gray-300" />
                      <Heart className="w-6 h-6 text-red-500 absolute -top-1 -right-1" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {content.noConversation}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {content.instructions}
                  </p>

                  <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">{content.getStarted}</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start space-x-2">
                        <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{content.step1}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{content.step2}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Users className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{content.step3}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                      {content.findMatches}
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      {content.browseEvents}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesContent />
    </Suspense>
  )
}