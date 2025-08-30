'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { ROUTES } from '@/config/routes'
import { UniversityPartnership } from '@/config/universities'
import { formatPrice } from '@/config/pricing'

interface UniversityPartnershipCardProps {
  university: UniversityPartnership
  showSubscriptionInfo?: boolean
  compact?: boolean
}

export default function UniversityPartnershipCard({
  university,
  showSubscriptionInfo = true,
  compact = false
}: UniversityPartnershipCardProps) {
  const { t, language } = useLanguage()
  const { colors } = useHeritage()

  const getPartnershipLevelColor = (level: string) => {
    switch (level) {
      case 'strategic': return colors.primary
      case 'official': return colors.secondary
      case 'community': return colors.accent
      case 'pending': return '#94a3b8'
      default: return colors.primary
    }
  }

  const getPartnershipLevelLabel = (level: string) => {
    const labels: Record<string, { en: string; pt: string }> = {
      strategic: { en: 'Strategic Partner', pt: 'Parceiro Estratégico' },
      official: { en: 'Official Partner', pt: 'Parceiro Oficial' },
      community: { en: 'Community Partner', pt: 'Parceiro Comunitário' },
      pending: { en: 'Pending Partnership', pt: 'Parceria Pendente' }
    }
    return labels[level]?.[language] || level
  }

  const getUniversityTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      russell_group: '🏛️',
      london_university: '🏙️',
      red_brick: '🧱',
      modern: '🏢',
      specialist: '🎯',
      ancient: '⚰️'
    }
    return icons[type] || '🎓'
  }

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 ${compact ? 'p-4' : 'p-6'}`}>
      {/* Partnership Level Badge */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: getPartnershipLevelColor(university.partnershipLevel) }}
        >
          {getPartnershipLevelLabel(university.partnershipLevel)}
        </div>
        
        {university.hasPortugueseProgram && (
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">🇵🇹</span>
            <span>{t('university.portuguese_program', 'Portuguese Program')}</span>
          </div>
        )}
      </div>

      <div className={`flex ${compact ? 'space-x-3' : 'space-x-4'}`}>
        {/* University Logo/Icon */}
        <div className={`flex-shrink-0 ${compact ? 'w-16 h-16' : 'w-20 h-20'}`}>
          <div 
            className={`${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-lg flex items-center justify-center text-3xl`}
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            {getUniversityTypeIcon(university.type)}
          </div>
        </div>

        {/* University Details */}
        <div className="flex-1 min-w-0">
          {/* Name and Location */}
          <div className="mb-2">
            <h3 className={`font-semibold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
              {university.shortName}
            </h3>
            <p className="text-gray-600 text-sm">
              {language === 'pt' ? university.namePortuguese : university.name}
            </p>
            <p className="text-gray-500 text-sm capitalize">
              {university.region.replace('_', ' ')} • {university.type.replace('_', ' ')}
            </p>
          </div>

          {/* Student Statistics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {university.portugueseStudents.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">
                {t('university.portuguese_students', 'Portuguese Students')}
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                {university.lusoTownMembers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">
                {t('university.lusotown_members', 'LusoTown Members')}
              </div>
            </div>
          </div>

          {/* Portuguese Society Info */}
          {university.portugueseSociety && (
            <div className="mb-4 p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm">
                  {university.portugueseSociety.name}
                </h4>
                <div className="flex items-center space-x-1">
                  <span 
                    className={`w-2 h-2 rounded-full ${
                      university.portugueseSociety.active ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  ></span>
                  <span className="text-xs text-gray-600">
                    {university.portugueseSociety.active ? 
                      t('common.active', 'Active') : 
                      t('common.inactive', 'Inactive')
                    }
                  </span>
                </div>
              </div>
              
              {university.portugueseSociety.memberCount && (
                <p className="text-sm text-gray-600 mb-2">
                  👥 {university.portugueseSociety.memberCount} {t('common.members', 'members')}
                </p>
              )}
              
              {university.portugueseSociety.meetingFrequency && (
                <p className="text-sm text-gray-600">
                  📅 {university.portugueseSociety.meetingFrequency}
                </p>
              )}
            </div>
          )}

          {/* Services Available */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 text-sm mb-2">
              {t('university.services_available', 'Services Available')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(university.studentServices).map(([service, available]) => (
                <div key={service} className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${available ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                  <span className="text-xs text-gray-600 capitalize">
                    {service.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center space-x-2">
              <span>👤</span>
              <span>{university.contact.name}, {university.contact.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <a href={`mailto:${university.contact.email}`} className="text-blue-600 hover:underline">
                {university.contact.email}
              </a>
            </div>
            {university.contact.phone && (
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <a href={`tel:${university.contact.phone}`} className="text-blue-600 hover:underline">
                  {university.contact.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* University Society Subscription */}
      {showSubscriptionInfo && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">
                {t('university.society_membership', 'Society Membership')}
              </h4>
              <p className="text-sm text-gray-600">
                {t('university.annual_subscription', 'Annual university society subscription')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                {formatPrice(75)}
              </div>
              <div className="text-sm text-gray-500">
                {t('common.per_year', 'per year')}
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex space-x-3">
            <Link
              href={`${ROUTES.universities}/${university.id}`}
              className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('university.learn_more', 'Learn More')}
            </Link>
            
            {university.partnershipLevel !== 'pending' && (
              <Link
                href={`${ROUTES.universities}/${university.id}/subscribe`}
                className="flex-1 text-center px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                {t('university.join_society', 'Join Society')}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Additional Actions */}
      <div className="mt-4 flex justify-between text-sm">
        {university.website && (
          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
          >
            <span>🌐</span>
            <span>{t('university.visit_website', 'Visit Website')}</span>
          </a>
        )}
        
        {university.portugueseStudiesPage && (
          <a
            href={university.portugueseStudiesPage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
          >
            <span>📚</span>
            <span>{t('university.portuguese_studies', 'Portuguese Studies')}</span>
          </a>
        )}

        {university.portugueseSociety?.whatsappGroup && (
          <a
            href={university.portugueseSociety.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-green-600 hover:text-green-800"
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  )
}