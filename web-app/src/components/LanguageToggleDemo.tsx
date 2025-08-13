'use client'

import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'

export default function LanguageToggleDemo() {
  const { language } = useLanguage()

  // Mock translations
  const translations = {
    en: {
      welcome: 'Welcome to LusoTown Community Feed',
      description: 'Share updates, connect with others, and stay in the loop with the latest from our Portuguese community in London',
      postPlaceholder: "What's happening in your Lusophone world?",
      post: 'Post',
      events: 'Events',
      businesses: 'Businesses',
      members: 'Members'
    },
    pt: {
      welcome: 'Bem-vindo ao Feed da Comunidade LusoTown',
      description: 'Compartilhe atualizações, conecte-se com outros e mantenha-se informado sobre as últimas notícias da nossa comunidade lusófona em Londres',
      postPlaceholder: 'O que está acontecendo no seu mundo lusófono?',
      post: 'Publicar',
      events: 'Eventos',
      businesses: 'Negócios',
      members: 'Membros'
    }
  }

  const t = translations[language]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Language Toggle Demo</h3>
        <LanguageToggle />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{t.welcome}</h2>
        <p className="text-gray-600">{t.description}</p>
        
        <div className="flex items-center gap-3 mt-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
            Y
          </div>
          <textarea
            placeholder={t.postPlaceholder}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
            {t.post}
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">45</div>
            <div className="text-sm text-gray-600">{t.events}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">78</div>
            <div className="text-sm text-gray-600">{t.businesses}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">320</div>
            <div className="text-sm text-gray-600">{t.members}</div>
          </div>
        </div>
      </div>
    </div>
  )
}