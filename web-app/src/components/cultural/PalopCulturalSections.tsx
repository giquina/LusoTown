'use client'

import React, { useState } from 'react'
import { ChevronRightIcon, PlayIcon, CalendarIcon, UsersIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { PALOP_CULTURAL_SECTIONS, CROSS_CULTURAL_EVENTS, CTA_THEMES, type CulturalSection } from '@/config/palop-cultural-sections'

interface PalopCulturalSectionsProps {
  className?: string
  featuredNations?: string[]
  showAllEvents?: boolean
  enableCarousel?: boolean
}

export default function PalopCulturalSections({
  className = '',
  featuredNations,
  showAllEvents = true,
  enableCarousel = true
}: PalopCulturalSectionsProps) {
  const { t, currentLanguage } = useLanguage()
  const [selectedNation, setSelectedNation] = useState<string | null>(null)
  const [showTestimonials, setShowTestimonials] = useState<string | null>(null)

  // Filter nations if specified
  const displayedSections = featuredNations 
    ? PALOP_CULTURAL_SECTIONS.filter(section => featuredNations.includes(section.id))
    : PALOP_CULTURAL_SECTIONS

  const handleJoinCommunity = (nationId: string) => {
    // Track cultural engagement
    if (typeof window !== 'undefined') {
      // Analytics tracking for Portuguese community engagement
      console.log(`Cultural engagement: ${nationId} community`)
    }
    
    // Navigate to community page
    window.location.href = `/communities/${nationId}`
  }

  const CulturalSectionCard = ({ section }: { section: CulturalSection }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Nation Header */}
      <div className="bg-gradient-to-r from-heritage-primary to-heritage-secondary p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{section.nation.flag}</span>
            <div>
              <h3 className="text-2xl font-bold">{section.nation.name}</h3>
              <p className="text-heritage-primary-100 text-sm">
                {section.community.communitySize}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedNation(selectedNation === section.id ? null : section.id)}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <PlayIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <UsersIcon className="h-4 w-4" />
            <span>{section.community.primaryRegions.length} UK regions</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{section.events.annual.length} annual events</span>
          </div>
        </div>
      </div>

      {/* Cultural Highlights */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Music & Dance */}
          <div>
            <h4 className="font-semibold text-heritage-primary mb-3 flex items-center">
              <HeartIcon className="h-4 w-4 mr-2" />
              Music & Dance
            </h4>
            <div className="space-y-2">
              {section.cultural.primaryGenres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="inline-block bg-heritage-primary/10 text-heritage-primary px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-2">
              {section.cultural.traditionalDances.slice(0, 2).map((dance, index) => (
                <span
                  key={index}
                  className="inline-block bg-heritage-secondary/10 text-heritage-secondary px-2 py-1 rounded text-xs mr-2 mb-1"
                >
                  {dance}
                </span>
              ))}
            </div>
          </div>

          {/* Community Presence */}
          <div>
            <h4 className="font-semibold text-heritage-primary mb-3">UK Presence</h4>
            <p className="text-gray-600 text-sm mb-3">{section.community.ukPresence}</p>
            <div className="text-xs text-gray-500">
              <strong>Main regions:</strong> {section.community.primaryRegions.slice(0, 3).join(', ')}
              {section.community.primaryRegions.length > 3 && ` +${section.community.primaryRegions.length - 3} more`}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        {showAllEvents && (
          <div className="mt-6 border-t pt-6">
            <h4 className="font-semibold text-heritage-primary mb-3">Upcoming Events</h4>
            <div className="space-y-3">
              {section.events.regular.slice(0, 2).map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-gray-500">{event.frequency} • {event.venue}</p>
                  </div>
                  <CalendarIcon className="h-4 w-4 text-heritage-primary" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial Preview */}
        {section.testimonials.length > 0 && (
          <div className="mt-6 border-t pt-6">
            <button
              onClick={() => setShowTestimonials(showTestimonials === section.id ? null : section.id)}
              className="w-full text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-heritage-primary">Community Voice</h4>
                <ChevronRightIcon className={`h-4 w-4 transform transition-transform ${showTestimonials === section.id ? 'rotate-90' : ''}`} />
              </div>
            </button>
            
            {showTestimonials === section.id && (
              <div className="mt-4 space-y-4">
                {section.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-heritage-primary/5 p-4 rounded-lg">
                    <blockquote className="text-sm italic text-gray-700 mb-2">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{testimonial.name}, {testimonial.age}</p>
                        <p className="text-xs text-gray-500">{testimonial.profession} • {testimonial.location}</p>
                      </div>
                      <div className="text-xs bg-heritage-accent/10 text-heritage-accent px-2 py-1 rounded">
                        {testimonial.highlight}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 space-y-4">
          <div className="text-center">
            <h4 className="font-semibold text-heritage-primary mb-2">{section.callToAction.primary}</h4>
            <p className="text-sm text-gray-600 mb-4">{section.callToAction.secondary}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => handleJoinCommunity(section.id)}
              className="w-full bg-heritage-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-heritage-primary-dark transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>{section.callToAction.buttonText}</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-heritage-secondary/10 text-heritage-secondary py-2 px-4 rounded text-sm hover:bg-heritage-secondary/20 transition-colors">
                View Events
              </button>
              <button className="bg-heritage-accent/10 text-heritage-accent py-2 px-4 rounded text-sm hover:bg-heritage-accent/20 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-heritage-primary mb-4">
          {currentLanguage === 'pt' ? 'Comunidades Lusófonas no Reino Unido' : 'Portuguese-Speaking Communities in the UK'}
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          {currentLanguage === 'pt' 
            ? 'Celebrando a rica diversidade cultural dos 8 países de língua portuguesa representados no Reino Unido'
            : 'Celebrating the rich cultural diversity of all 8 Portuguese-speaking nations represented in the UK'
          }
        </p>
        
        {/* Cross-Cultural Events Banner */}
        <div className="bg-gradient-to-r from-heritage-primary/10 to-heritage-secondary/10 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-heritage-primary mb-4">
            {currentLanguage === 'pt' ? 'Eventos Transculturais' : 'Cross-Cultural Events'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CROSS_CULTURAL_EVENTS.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-sm mb-1">{event.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{event.date}</p>
                <div className="flex flex-wrap gap-1">
                  {event.nations.includes('all') ? (
                    <span className="text-xs bg-heritage-primary/10 text-heritage-primary px-2 py-1 rounded">
                      All Nations
                    </span>
                  ) : (
                    event.nations.slice(0, 3).map((nation, idx) => {
                      const nationData = PALOP_CULTURAL_SECTIONS.find(s => s.id === nation)
                      return nationData ? (
                        <span key={idx} className="text-xs">
                          {nationData.nation.flag}
                        </span>
                      ) : null
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {displayedSections.map((section) => (
          <CulturalSectionCard key={section.id} section={section} />
        ))}
      </div>

      {/* Global Community CTA */}
      <div className="bg-gradient-to-r from-heritage-primary to-heritage-secondary rounded-2xl p-8 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">
          {currentLanguage === 'pt' 
            ? 'Una-te à Nossa Comunidade Global' 
            : 'Join Our Global Portuguese-Speaking Community'
          }
        </h3>
        <p className="text-xl mb-6 opacity-90">
          {currentLanguage === 'pt'
            ? '750+ membros de todas as 8 nações lusófonas unidos no Reino Unido'
            : '750+ members from all 8 Portuguese-speaking nations united in the UK'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.location.href = '/register'}
            className="bg-white text-heritage-primary py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            {currentLanguage === 'pt' ? 'Juntar-se Agora' : 'Join Now'}
          </button>
          <button
            onClick={() => window.location.href = '/events'}
            className="bg-heritage-accent text-heritage-primary py-3 px-8 rounded-lg font-semibold hover:bg-heritage-accent-dark transition-colors"
          >
            {currentLanguage === 'pt' ? 'Ver Eventos' : 'View Events'}
          </button>
        </div>
      </div>
    </div>
  )
}

export { PALOP_CULTURAL_SECTIONS, CROSS_CULTURAL_EVENTS }