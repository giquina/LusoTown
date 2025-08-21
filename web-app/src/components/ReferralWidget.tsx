'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { authService } from '@/lib/auth'
import { referralService, ReferralStats } from '@/lib/referral'
import { Users, Gift, Share2, Copy, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ReferralWidgetProps {
  className?: string
  variant?: 'compact' | 'full'
  showStats?: boolean
}

export default function ReferralWidget({ 
  className = '', 
  variant = 'compact',
  showStats = true 
}: ReferralWidgetProps) {
  const { language, t } = useLanguage()
  const [userCode, setUserCode] = useState<string>('')
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadReferralData()
  }, [])

  const loadReferralData = async () => {
    const user = authService.getCurrentUser()
    if (!user) return

    try {
      const code = await referralService.getUserReferralCode(user.id)
      if (code) {
        setUserCode(code.code)
      }

      if (showStats) {
        const userStats = await referralService.getReferralStats(user.id)
        setStats(userStats)
      }
    } catch (error) {
      console.error('Error loading referral data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(userCode)
      toast.success(t('referral.code.copied'))
    } catch (error) {
      toast.error(language === 'pt' ? 'Erro ao copiar' : 'Failed to copy')
    }
  }

  const shareWhatsApp = () => {
    if (!userCode) return
    const shareData = referralService.generateShareData(userCode, language)
    window.open(shareData.socialUrls.whatsapp, '_blank')
  }

  const copyShareLink = async () => {
    if (!userCode) return
    const shareData = referralService.generateShareData(userCode, language)
    try {
      await navigator.clipboard.writeText(shareData.url)
      toast.success(language === 'pt' ? 'Link copiado!' : 'Link copied!')
    } catch (error) {
      toast.error(language === 'pt' ? 'Erro ao copiar' : 'Failed to copy')
    }
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border animate-pulse ${className}`}>
        <div className="p-4">
          <div className="h-4 bg-secondary-200 rounded mb-2"></div>
          <div className="h-6 bg-secondary-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-br from-red-50 to-green-50 rounded-lg border border-red-200 ${className}`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Users className="h-5 w-5 text-coral-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t('referral.title')}</h3>
              <p className="text-sm text-secondary-600">{language === 'pt' ? 'Convide amigos e ganhe' : 'Invite friends and earn'}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('referral.code.title')}</p>
                <p className="font-bold text-coral-600 text-lg tracking-wider">{userCode}</p>
              </div>
              <button
                onClick={copyCode}
                className="bg-coral-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {showStats && stats && (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-action-600">{stats.completedReferrals}</p>
                <p className="text-xs text-secondary-600">{language === 'pt' ? 'Amigos' : 'Friends'}</p>
              </div>
              <div className="bg-white/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-primary-600">£{stats.totalEarnings}</p>
                <p className="text-xs text-secondary-600">{language === 'pt' ? 'Ganhos' : 'Earned'}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={shareWhatsApp}
              className="bg-action-500 text-white p-2 rounded-lg hover:bg-action-600 transition-colors flex items-center justify-center gap-1 text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={copyShareLink}
              className="bg-coral-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1 text-sm"
            >
              <Share2 className="h-4 w-4" />
              <span>{language === 'pt' ? 'Link' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <div className={`bg-white rounded-xl shadow-lg border ${className}`}>
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="h-8 w-8" />
          <h2 className="text-xl font-bold">{t('referral.title')}</h2>
        </div>
        <p className="text-red-100">{t('referral.subtitle')}</p>
      </div>

      <div className="p-6">
        {showStats && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-900">{stats.completedReferrals}</p>
              <p className="text-sm text-primary-600">{t('referral.stats.completed-referrals')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-900">£{stats.totalEarnings}</p>
              <p className="text-sm text-action-600">{t('referral.stats.total-earnings')}</p>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-accent-900">{stats.activeReferrals}</p>
              <p className="text-sm text-accent-600">{t('referral.stats.active-friends')}</p>
            </div>
          </div>
        )}

        <div className="bg-secondary-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">{t('referral.code.title')}</h3>
          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-dashed border-red-300 rounded-lg px-4 py-3 flex-1">
              <span className="text-xl font-bold text-coral-600 tracking-wider">{userCode}</span>
            </div>
            <button
              onClick={copyCode}
              className="bg-coral-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'pt' ? 'Copiar' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">{t('referral.share.title')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={shareWhatsApp}
              className="bg-action-500 text-white p-3 rounded-lg hover:bg-action-600 transition-colors flex items-center gap-3"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{t('referral.share.whatsapp')}</span>
            </button>
            <button
              onClick={copyShareLink}
              className="bg-coral-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-3"
            >
              <Share2 className="h-5 w-5" />
              <span>{t('referral.share.link')}</span>
            </button>
          </div>
        </div>

        {stats && !stats.bonusUnlocked && (
          <div className="mt-6 bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-lg p-4">
            <h4 className="font-semibold text-gold-900 mb-2">{t('referral.progress.title')}</h4>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gold-700 mb-1">
                <span>{stats.completedReferrals} / 5 {language === 'pt' ? 'amigos' : 'friends'}</span>
                <span>{Math.round(stats.progressToBonus * 100)}%</span>
              </div>
              <div className="w-full bg-gold-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-gold-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.progressToBonus * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gold-700">{t('referral.rewards.bonus-description')}</p>
          </div>
        )}
      </div>
    </div>
  )
}