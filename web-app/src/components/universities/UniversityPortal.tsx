'use client'

import React, { useState, useMemo } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import UniversityPartnershipCard from './UniversityPartnershipCard'
import { UNIVERSITY_PARTNERSHIPS, UNIVERSITY_STATS } from '@/config/universities'
import { formatPrice } from '@/config/pricing'

interface UniversityPortalProps {
  showSubscriptionOptions?: boolean
  userUniversityId?: string
  compact?: boolean
}

export default function UniversityPortal({
  showSubscriptionOptions = true,
  userUniversityId,
  compact = false
}: UniversityPortalProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()

  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedPartnershipLevel, setSelectedPartnershipLevel] = useState<string>('')
  const [showOnlyWithSocieties, setShowOnlyWithSocieties] = useState(false)

  // Filter universities based on selections
  const filteredUniversities = useMemo(() => {
    let filtered = [...UNIVERSITY_PARTNERSHIPS]

    if (selectedRegion) {
      filtered = filtered.filter(uni => uni.region === selectedRegion)
    }

    if (selectedPartnershipLevel) {
      filtered = filtered.filter(uni => uni.partnershipLevel === selectedPartnershipLevel)
    }

    if (showOnlyWithSocieties) {
      filtered = filtered.filter(uni => uni.portugueseSociety?.active)
    }

    return filtered.sort((a, b) => {
      // Priority: Strategic > Official > Community > Pending
      const levelPriority: Record<string, number> = {
        strategic: 0,
        official: 1,
        community: 2,
        pending: 3
      }
      return levelPriority[a.partnershipLevel] - levelPriority[b.partnershipLevel]
    })
  }, [selectedRegion, selectedPartnershipLevel, showOnlyWithSocieties])

  const regionOptions = [
    { id: '', name: { en: 'All Regions', pt: 'Todas as Regiões' } },
    { id: 'london', name: { en: 'London', pt: 'Londres' } },
    { id: 'england', name: { en: 'England', pt: 'Inglaterra' } },
    { id: 'scotland', name: { en: 'Scotland', pt: 'Escócia' } },
    { id: 'wales', name: { en: 'Wales', pt: 'País de Gales' } },
    { id: 'northern_ireland', name: { en: 'Northern Ireland', pt: 'Irlanda do Norte' } }
  ]

  const partnershipLevelOptions = [
    { id: '', name: { en: 'All Partnerships', pt: 'Todas as Parcerias' } },
    { id: 'strategic', name: { en: 'Strategic Partners', pt: 'Parceiros Estratégicos' } },
    { id: 'official', name: { en: 'Official Partners', pt: 'Parceiros Oficiais' } },
    { id: 'community', name: { en: 'Community Partners', pt: 'Parceiros Comunitários' } },
    { id: 'pending', name: { en: 'Pending Partnerships', pt: 'Parcerias Pendentes' } }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('university.portal_title', 'University Society Portal')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('university.portal_subtitle', 'Connect with Portuguese-speaking student societies across UK universities')}
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
            {UNIVERSITY_STATS.totalPartnerships}
          </div>
          <div className="text-sm text-gray-600">
            {t('university.total_partnerships', 'University Partnerships')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: colors.secondary }}>
            {UNIVERSITY_STATS.totalPortugueseStudents.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {t('university.portuguese_students', 'Portuguese Students')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: colors.accent }}>
            {UNIVERSITY_STATS.totalLusoTownMembers.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {t('university.lusotown_members', 'LusoTown Members')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold mb-2" style={{ color: colors.action }}>
            {formatPrice(75)}
          </div>
          <div className="text-sm text-gray-600">
            {t('university.annual_subscription', 'Annual Subscription')}
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      {showSubscriptionOptions && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('university.society_membership_benefits', 'Society Membership Benefits')}
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>✓ {t('university.benefit_events', 'Access to exclusive Portuguese cultural events')}</li>
                <li>✓ {t('university.benefit_networking', 'Student networking opportunities')}</li>
                <li>✓ {t('university.benefit_support', 'Academic and cultural support')}</li>
                <li>✓ {t('university.benefit_mentorship', 'Mentorship programs with alumni')}</li>
                <li>✓ {t('university.benefit_resources', 'Portuguese language learning resources')}</li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                {formatPrice(75)}
              </div>
              <div className="text-gray-600 mb-4">
                {t('university.per_academic_year', 'per academic year')}
              </div>
              <button
                className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.primary }}
              >
                {t('university.subscribe_now', 'Subscribe Now')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('university.filter_region', 'Filter by Region')}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {regionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('university.filter_partnership', 'Partnership Level')}
            </label>
            <select
              value={selectedPartnershipLevel}
              onChange={(e) => setSelectedPartnershipLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {partnershipLevelOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="activeSocieties"
              checked={showOnlyWithSocieties}
              onChange={(e) => setShowOnlyWithSocieties(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="activeSocieties" className="ml-2 text-sm text-gray-700">
              {t('university.active_societies_only', 'Active Portuguese societies only')}
            </label>
          </div>
        </div>
      </div>

      {/* User's University Highlight */}
      {userUniversityId && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('university.your_university', 'Your University')}
          </h2>
          {(() => {
            const userUni = UNIVERSITY_PARTNERSHIPS.find(uni => uni.id === userUniversityId)
            return userUni ? (
              <UniversityPartnershipCard
                university={userUni}
                showSubscriptionInfo={showSubscriptionOptions}
                compact={compact}
              />
            ) : null
          })()}
        </div>
      )}

      {/* University Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedRegion || selectedPartnershipLevel || showOnlyWithSocieties
              ? t('university.filtered_partnerships', 'Filtered Partnerships')
              : t('university.all_partnerships', 'All University Partnerships')
            }
          </h2>
          <div className="text-sm text-gray-600">
            {filteredUniversities.length} {t('common.universities', 'universities')} found
          </div>
        </div>

        {filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('university.no_results', 'No universities found')}
            </h3>
            <p className="text-gray-600">
              {t('university.try_different_filters', 'Try adjusting your filters to find more universities')}
            </p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            compact 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {filteredUniversities.map((university) => (
              <UniversityPartnershipCard
                key={university.id}
                university={university}
                showSubscriptionInfo={showSubscriptionOptions}
                compact={compact}
              />
            ))}
          </div>
        )}
      </div>

      {/* Partnership Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('university.partnership_info', 'Partnership Information')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {t('university.how_it_works', 'How It Works')}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {t('university.step1', 'Subscribe to access university society features')}</li>
              <li>• {t('university.step2', 'Connect with Portuguese students at your university')}</li>
              <li>• {t('university.step3', 'Join cultural events and activities')}</li>
              <li>• {t('university.step4', 'Access mentorship and support programs')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {t('university.contact_us', 'Contact Us')}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {t('university.partnership_inquiry', 'Interested in establishing a partnership with your university?')}
            </p>
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              {t('university.get_in_touch', 'Get in Touch')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}