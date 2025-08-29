'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { ChatUser } from '@/types/chat'

interface PollOption {
  id: string
  text: string
  votes: number
  userVoted?: boolean
}

interface Poll {
  id: string
  question: string
  options: PollOption[]
  createdBy: string
  endsAt: Date
  isActive: boolean
}

interface PortuguesePollsProps {
  currentUser: ChatUser | null
  canCreatePolls: boolean
  streamId: string
}

export default function PortuguesePolls({ 
  currentUser, 
  canCreatePolls, 
  streamId 
}: PortuguesePollsProps) {
  const { language } = useLanguage()
  const [polls] = useState<Poll[]>([])

  const t = {
    en: {
      culturalPolls: 'Cultural Polls',
      noPollsYet: 'No polls yet',
      createPoll: 'Create Poll'
    },
    pt: {
      culturalPolls: 'Sondagens Culturais',
      noPollsYet: 'Ainda não há sondagens',
      createPoll: 'Criar Sondagem'
    }
  }

  const text = t[language]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {text.culturalPolls}
      </h3>

      {canCreatePolls && (
        <button className="w-full p-3 border-2 border-dashed border-primary-300 rounded-lg text-primary-600 hover:border-primary-400 transition-colors">
          {text.createPoll}
        </button>
      )}

      {polls.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {text.noPollsYet}
        </div>
      )}
    </div>
  )
}
