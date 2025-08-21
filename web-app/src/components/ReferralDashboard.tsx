'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { authService } from '@/lib/auth'
import { referralService, ReferralStats, ReferralCampaign, LeaderboardEntry } from '@/lib/referral'
import { Users, Gift, TrendingUp, Award, Share2, Copy, MessageCircle, Mail, QrCode, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

interface ReferralDashboardProps {
  className?: string
}

export default function ReferralDashboard({ className = '' }: ReferralDashboardProps) {
  const { language, t } = useLanguage()
  const [userCode, setUserCode] = useState<string>('')
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [campaign, setCampaign] = useState<ReferralCampaign | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [referralHistory, setReferralHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'share' | 'leaderboard' | 'history'>('dashboard')

  useEffect(() => {
    loadReferralData()
  }, [])

  const loadReferralData = async () => {
    const user = authService.getCurrentUser()
    if (!user) return

    setIsLoading(true)
    try {
      // Load user's referral code
      const code = await referralService.getUserReferralCode(user.id)
      if (code) {
        setUserCode(code.code)
      }

      // Load stats
      const userStats = await referralService.getReferralStats(user.id)
      setStats(userStats)

      // Load active campaign
      const campaigns = await referralService.getActiveCampaigns()
      if (campaigns.length > 0) {
        setCampaign(campaigns[0])
      }

      // Load leaderboard
      const leaderboardData = await referralService.getLeaderboard(10)
      setLeaderboard(leaderboardData)

      // Load referral history
      const history = await referralService.getReferralHistory(user.id)
      setReferralHistory(history)
    } catch (error) {
      console.error('Error loading referral data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(
        type === 'code' 
          ? t('referral.code.copied')
          : language === 'pt' 
            ? 'Link copiado!'
            : 'Link copied!'
      )
    } catch (error) {
      toast.error(
        language === 'pt' 
          ? 'Erro ao copiar'
          : 'Failed to copy'
      )
    }
  }

  const shareData = userCode ? referralService.generateShareData(userCode, language) : null

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary-200 rounded mb-4"></div>
          <div className="h-4 bg-secondary-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-secondary-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8" />
          <h1 className="text-2xl font-bold">{t('referral.dashboard.title')}</h1>
        </div>
        <p className="text-red-100">{t('referral.dashboard.subtitle')}</p>
        
        {campaign && (
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">
              {language === 'pt' ? campaign.title_pt : campaign.title_en}
            </h3>
            <p className="text-sm text-red-100">
              {language === 'pt' ? campaign.description_pt : campaign.description_en}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'dashboard', label: language === 'pt' ? 'Painel' : 'Dashboard', icon: TrendingUp },
            { id: 'share', label: language === 'pt' ? 'Partilhar' : 'Share', icon: Share2 },
            { id: 'leaderboard', label: language === 'pt' ? 'Classificação' : 'Leaderboard', icon: Award },
            { id: 'history', label: language === 'pt' ? 'Histórico' : 'History', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-coral-500 text-coral-600'
                  : 'border-transparent text-gray-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary-600">{t('referral.stats.total-earnings')}</p>
                    <p className="text-2xl font-bold text-blue-900">£{stats?.totalEarnings || 0}</p>
                  </div>
                  <Gift className="h-8 w-8 text-primary-500" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-action-600">{t('referral.stats.completed-referrals')}</p>
                    <p className="text-2xl font-bold text-green-900">{stats?.completedReferrals || 0}</p>
                  </div>
                  <Users className="h-8 w-8 text-action-500" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">{t('referral.stats.active-friends')}</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats?.activeReferrals || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-accent-500" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">{t('referral.stats.bonus-unlocked')}</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {stats?.bonusUnlocked ? (language === 'pt' ? 'Sim' : 'Yes') : (language === 'pt' ? 'Não' : 'No')}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Your Referral Code */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">{t('referral.code.title')}</h3>
              <p className="text-secondary-600 mb-4">{t('referral.code.description')}</p>
              <div className="flex items-center gap-3">
                <div className="bg-white border-2 border-dashed border-red-300 rounded-lg px-6 py-4 flex-1">
                  <span className="text-2xl font-bold text-coral-600 tracking-wider">{userCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(userCode, 'code')}
                  className="bg-coral-600 text-white px-4 py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'pt' ? 'Copiar' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Progress to Bonus */}
            {stats && !stats.bonusUnlocked && (
              <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{t('referral.progress.title')}</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-secondary-600 mb-2">
                    <span>{stats.completedReferrals} / 5 {language === 'pt' ? 'amigos' : 'friends'}</span>
                    <span>{Math.round(stats.progressToBonus * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.progressToBonus * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-secondary-600">
                  {t('referral.progress.description').replace('{remaining}', String(5 - stats.completedReferrals))}
                </p>
              </div>
            )}

            {stats?.bonusUnlocked && (
              <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-gold-600" />
                  <h3 className="text-lg font-semibold text-gold-900">{t('referral.progress.complete')}</h3>
                </div>
                <p className="text-gold-700">{t('referral.rewards.bonus-description')}</p>
              </div>
            )}
          </div>
        )}

        {/* Share Tab */}
        {activeTab === 'share' && shareData && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('referral.share.title')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* WhatsApp */}
              <a
                href={shareData.socialUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-action-500 text-white p-4 rounded-lg hover:bg-action-600 transition-colors flex items-center gap-3"
              >
                <MessageCircle className="h-6 w-6" />
                <span>{t('referral.share.whatsapp')}</span>
              </a>

              {/* Email */}
              <a
                href={shareData.socialUrls.email}
                className="bg-primary-500 text-white p-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-3"
              >
                <Mail className="h-6 w-6" />
                <span>{t('referral.share.email')}</span>
              </a>

              {/* Copy Link */}
              <button
                onClick={() => copyToClipboard(shareData.url, 'link')}
                className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-3"
              >
                <Copy className="h-6 w-6" />
                <span>{t('referral.share.link')}</span>
              </button>

              {/* Facebook */}
              <a
                href={shareData.socialUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-3"
              >
                <ExternalLink className="h-6 w-6" />
                <span>{t('referral.share.facebook')}</span>
              </a>

              {/* Instagram (just copy URL) */}
              <button
                onClick={() => copyToClipboard(shareData.url, 'link')}
                className="bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-3"
              >
                <Copy className="h-6 w-6" />
                <span>{t('referral.share.instagram')}</span>
              </button>

              {/* QR Code placeholder */}
              <button
                onClick={() => copyToClipboard(shareData.url, 'link')}
                className="bg-gray-700 text-white p-4 rounded-lg hover:bg-secondary-800 transition-colors flex items-center gap-3"
              >
                <QrCode className="h-6 w-6" />
                <span>{t('referral.share.qr')}</span>
              </button>
            </div>

            {/* Share Messages Preview */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">{language === 'pt' ? 'Mensagem de Partilha' : 'Share Message Preview'}</h4>
              <div className="bg-white border rounded-lg p-4">
                <p className="text-secondary-700">{shareData.messages.generic}</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('referral.leaderboard.title')}</h3>
            
            {stats?.leaderboardPosition && (
              <div className="bg-gradient-to-r from-gold-50 to-yellow-50 border border-gold-200 rounded-lg p-4">
                <p className="text-gold-800">
                  {language === 'pt' ? 'A sua posição' : 'Your position'}: <span className="font-bold">#{stats.leaderboardPosition}</span>
                </p>
              </div>
            )}

            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('referral.leaderboard.position')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('referral.leaderboard.name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('referral.leaderboard.referrals')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'pt' ? 'Dias Grátis' : 'Free Days'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id} className={index < 3 ? 'bg-gradient-to-r from-gold-50/20 to-yellow-50/20' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 && <Award className="h-4 w-4 text-gold-500 mr-2" />}
                          <span className="font-medium">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{entry.first_name} {entry.last_name?.charAt(0)}.</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{entry.completed_referrals}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{entry.total_free_days}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">{t('referral.history.title')}</h3>
            
            {referralHistory.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('referral.history.empty')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {referralHistory.map((referral) => (
                  <div key={referral.id} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {referral.profiles?.first_name} {referral.profiles?.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{referral.profiles?.email}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(referral.created_at).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          referral.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : referral.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {t(`referral.history.${referral.status}`)}
                        </span>
                        {referral.referral_rewards?.length > 0 && (
                          <p className="text-xs text-action-600 mt-1">
                            {t('referral.history.reward-earned')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}