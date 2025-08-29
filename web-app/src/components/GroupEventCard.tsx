'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface GroupEvent {
  id?: string
  title?: string
  description?: string
  date?: string
  location?: string
}

interface GroupEventCardProps {
  event?: GroupEvent
  className?: string
}

export default function GroupEventCard({ event, className = '' }: GroupEventCardProps) {
  const { language } = useLanguage()

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div 
        className="h-1 w-full rounded-t-lg mb-4"
        style={{ backgroundColor: PORTUGUESE_COLORS.gold[500] }}
      ></div>
      
      <h3 className="text-lg font-semibold mb-2" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
        {event?.title || (language === 'pt' ? 'Evento da Comunidade' : 'Community Event')}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {event?.description || (language === 'pt' 
          ? 'Junte-se à comunidade lusófona para este evento especial'
          : 'Join the Portuguese-speaking community for this special event'
        )}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{event?.date || (language === 'pt' ? 'Data a definir' : 'Date TBD')}</span>
        <span>{event?.location || (language === 'pt' ? 'Londres' : 'London')}</span>
      </div>
      
      <button 
        className="w-full mt-4 py-2 px-4 rounded-lg font-medium text-white transition-colors duration-300 hover:opacity-90"
        style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
      >
        {language === 'pt' ? 'Participar' : 'Join Event'}
      </button>
    </div>
  )
}
