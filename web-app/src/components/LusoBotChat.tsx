'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Card } from '@/components/ui/card'
import { ModernButton } from '@/components/ui/ModernButton'

/**
 * Simple LusoBot chat component
 * Consolidated from complex AI chat system
 */
export default function LusoBotChat() {
  const { t } = useLanguage()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message])
      setMessage('')
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary-900">
          {t('lusobot.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('lusobot.description')}
        </p>
      </div>
      
      <div className="space-y-2 mb-4 h-64 overflow-y-auto bg-gray-50 p-3 rounded">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            {t('lusobot.startConversation')}
          </p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="bg-white p-2 rounded shadow-sm">
              {msg}
            </div>
          ))
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder={t('lusobot.typePlaceholder')}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <ModernButton onClick={handleSendMessage}>
          {t('common.send')}
        </ModernButton>
      </div>
    </Card>
  )
}