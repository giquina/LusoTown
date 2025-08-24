/**
 * Partnership Highlight Component
 * Showcases partner events like Chocolate Kizomba with member benefits
 */

"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { PARTNERSHIP_EVENTS, PARTNERSHIP_HIGHLIGHTS } from '@/config/partnership-events'
import { 
  MapPinIcon, 
  ClockIcon, 
  SparklesIcon,
  TicketIcon,
  UsersIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

interface PartnershipHighlightProps {
  partner: keyof typeof PARTNERSHIP_HIGHLIGHTS
  showFullDetails?: boolean
  showDiscount?: boolean
  onInterestToggle?: (interested: boolean) => void
  className?: string
}

export default function PartnershipHighlight({
  partner,
  showFullDetails = true,
  showDiscount = true,
  onInterestToggle,
  className = ""
}: PartnershipHighlightProps) {
  const { t, language } = useLanguage()
  
  const highlight = PARTNERSHIP_HIGHLIGHTS[partner]
  const partnerEvent = PARTNERSHIP_EVENTS.find(event => 
    event.id === partner || event.id.includes(partner.replace('-', '-'))
  )

  if (!highlight || !partnerEvent) return null

  const getPartnerIcon = (partnerId: string) => {
    if (partnerId.includes('kizomba')) return HeartIcon
    if (partnerId.includes('fado')) return SparklesIcon
    if (partnerId.includes('business')) return UsersIcon
    return SparklesIcon
  }

  const PartnerIcon = getPartnerIcon(partner)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <PartnerIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{highlight.title}</h3>
            <p className="text-sm text-white/90">{highlight.subtitle}</p>
          </div>
        </div>
        
        {/* Highlight Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
          <SparklesIcon className="h-4 w-4" />
          {highlight.highlight}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-700 mb-4">{partnerEvent.description}</p>

        {/* Event Details */}
        {showFullDetails && (
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPinIcon className="h-4 w-4 text-primary-500" />
              <span>{partnerEvent.location}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 text-primary-500" />
              <span>{partnerEvent.schedule}</span>
            </div>

            {partnerEvent.socialHandle && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-primary-500 font-medium">@</span>
                <span className="text-primary-600 font-medium">
                  {partnerEvent.socialHandle.replace('@', '')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Member Benefits */}
        <div className="mb-5">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            {language === 'pt' ? 'Benefícios para Membros:' : 'Member Benefits:'}
          </h4>
          <div className="grid gap-2">
            {partnerEvent.memberBenefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-primary-50 rounded-xl p-4 mb-4">
          <div className="relative">
            <div className="absolute -top-1 -left-1 text-2xl text-primary-300 leading-none">"</div>
            <blockquote className="pl-6 text-sm italic text-primary-900 leading-relaxed">
              {highlight.testimonial}
            </blockquote>
          </div>
        </div>

        {/* Discount & CTA */}
        {showDiscount && partnerEvent.lusoTownDiscount && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <TicketIcon className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-900">
                {language === 'pt' ? 'Oferta Especial!' : 'Special Offer!'}
              </span>
            </div>
            <p className="text-green-800 text-sm mb-3">
              {highlight.callToAction}
            </p>
            <div className="text-2xl font-bold text-green-900">
              {partnerEvent.lusoTownDiscount}% {language === 'pt' ? 'desconto' : 'discount'}
            </div>
          </div>
        )}

        {/* Interest Toggle */}
        {onInterestToggle && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {language === 'pt' ? 'Interessado neste evento?' : 'Interested in this event?'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => onInterestToggle(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Event Types Preview */}
      {showFullDetails && partnerEvent.eventTypes.length > 0 && (
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">
            {language === 'pt' ? 'Tipos de eventos disponíveis:' : 'Available event types:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {partnerEvent.eventTypes.map((eventType, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-white rounded-full text-gray-600 border border-gray-200"
              >
                {eventType.type}
                {eventType.beginnerFriendly && (
                  <span className="ml-1 text-green-600">✓</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}