'use client'

import React, { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { authService } from '@/lib/auth'
import ReferralDashboard from '@/components/ReferralDashboard'
import SubscriptionGate from '@/components/SubscriptionGate'
import Footer from '@/components/Footer'
import { Users, Gift, TrendingUp } from 'lucide-react'

function ReferralsPageInner() {
  const { language, t } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const searchParams = useSearchParams()
  const user = authService.getCurrentUser()
  const isDemoUser = authService.isDemoUser()

  // Check if user has access to referral system
  const hasAccess = isDemoUser || hasActiveSubscription || isInTrial

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Users className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Faça login para continuar' : 'Please log in to continue'}
              </h1>
              <p className="text-gray-600 mb-6">
                {language === 'pt' 
                  ? 'Acesse o seu painel de indicações e comece a ganhar recompensas.'
                  : 'Access your referral dashboard and start earning rewards.'
                }
              </p>
              <a
                href="/login"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
              >
                {language === 'pt' ? 'Fazer Login' : 'Log In'}
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-red-600 to-green-600 text-white rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="h-12 w-12" />
              <h1 className="text-3xl md:text-4xl font-bold">{t('referral.title')}</h1>
            </div>
            <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
              {t('referral.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Gift className="h-8 w-8 text-green-300" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'pt' ? 'Mês Grátis' : 'Free Month'}
                </h3>
                <p className="text-sm text-red-100">
                  {language === 'pt' 
                    ? 'Ganhe um mês grátis por cada amigo que se junte'
                    : 'Earn a free month for each friend who joins'
                  }
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'pt' ? 'Bónus por Volume' : 'Volume Bonus'}
                </h3>
                <p className="text-sm text-red-100">
                  {language === 'pt' 
                    ? 'Convide 5 amigos e ganhe 2 meses grátis'
                    : 'Refer 5 friends and get 2 months free'
                  }
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-yellow-300" />
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'pt' ? 'Comunidade' : 'Community'}
                </h3>
                <p className="text-sm text-red-100">
                  {language === 'pt' 
                    ? 'Ajude a crescer a comunidade portuguesa'
                    : 'Help grow the Portuguese community'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {hasAccess ? (
            <ReferralDashboard />
          ) : (
            <SubscriptionGate 
              mode="general"
              title={language === 'pt' ? 'Desbloqueie o Sistema de Indicações' : 'Unlock Referral System'}
              description={language === 'pt' 
                ? 'Acesse o sistema de indicações e comece a ganhar recompensas por trazer amigos portugueses à comunidade.'
                : 'Access the referral system and start earning rewards for bringing Portuguese friends to the community.'
              }
              features={[
                language === 'pt' ? 'Código de indicação único' : 'Unique referral code',
                language === 'pt' ? 'Mês grátis por amigo' : 'Free month per friend',
                language === 'pt' ? 'Bónus por volume' : 'Volume bonuses',
                language === 'pt' ? 'Classificação da comunidade' : 'Community leaderboard'
              ]}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default function ReferralsPage() {
  return (
    <Suspense>
      <ReferralsPageInner />
    </Suspense>
  )
}