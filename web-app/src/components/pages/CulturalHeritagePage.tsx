'use client'

import React, { useState } from 'react'
import { 
  HeartIcon, 
  CalendarIcon, 
  UsersIcon, 
  MapPinIcon, 
  PlayIcon,
  StarIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import PalopCulturalSections from '@/components/cultural/PalopCulturalSections'
import PalopCulturalCarousel from '@/components/carousels/PalopCulturalCarousel'
import { PALOP_CULTURAL_SECTIONS, CROSS_CULTURAL_EVENTS } from '@/config/palop-cultural-sections'

interface CulturalHeritagePageProps {
  className?: string
}

export default function CulturalHeritagePage({ className = '' }: CulturalHeritagePageProps) {
  const { t, currentLanguage } = useLanguage()
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showSuccessStories, setShowSuccessStories] = useState(false)

  // Success stories aggregated from all nations
  const allSuccessStories = PALOP_CULTURAL_SECTIONS.flatMap(section => 
    section.testimonials.map(testimonial => ({
      ...testimonial,
      nation: section.nation,
      nationId: section.id
    }))
  )

  // Filter sections based on selected filter
  const getFilteredSections = () => {
    if (selectedFilter === 'all') return PALOP_CULTURAL_SECTIONS
    if (selectedFilter === 'palop') {
      return PALOP_CULTURAL_SECTIONS.filter(section => 
        ['angola', 'cape-verde', 'mozambique', 'guinea-bissau', 'sao-tome-principe'].includes(section.id)
      )
    }
    if (selectedFilter === 'americas') {
      return PALOP_CULTURAL_SECTIONS.filter(section => 
        ['portugal', 'brazil'].includes(section.id)
      )
    }
    if (selectedFilter === 'asia-pacific') {
      return PALOP_CULTURAL_SECTIONS.filter(section => 
        section.id === 'east-timor'
      )
    }
    return PALOP_CULTURAL_SECTIONS
  }

  const filteredSections = getFilteredSections()

  const handleJoinCommunity = () => {
    window.location.href = '/register'
  }

  const StatCard = ({ icon: Icon, value, label, subtext }: {
    icon: React.ElementType
    value: string
    label: string
    subtext?: string
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
      <Icon className="h-8 w-8 mx-auto text-heritage-primary mb-3" />
      <div className="text-3xl font-bold text-heritage-primary mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
      {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
    </div>
  )

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Hero Section with Carousel */}
      <section className="relative">
        <PalopCulturalCarousel
          className="h-[600px]"
          autoPlay={true}
          autoPlayInterval={6000}
          enablePortugueseGestures={true}
          onNationSelect={(nationId) => {
            // Scroll to that nation's section
            const element = document.getElementById(`nation-${nationId}`)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              {currentLanguage === 'pt' 
                ? 'Herança Cultural Lusófona' 
                : 'Portuguese Cultural Heritage'
              }
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow">
              {currentLanguage === 'pt'
                ? 'Celebrando 8 nações, uma língua, infinitas tradições'
                : 'Celebrating 8 nations, one language, infinite traditions'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-heritage-primary mb-12">
            {currentLanguage === 'pt' 
              ? 'Nossa Comunidade em Números' 
              : 'Our Community in Numbers'
            }
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <StatCard
              icon={UsersIcon}
              value="750+"
              label={currentLanguage === 'pt' ? 'Membros Ativos' : 'Active Members'}
              subtext={currentLanguage === 'pt' ? 'Reino Unido' : 'UK-wide'}
            />
            <StatCard
              icon={MapPinIcon}
              value="8"
              label={currentLanguage === 'pt' ? 'Nações' : 'Nations'}
              subtext={currentLanguage === 'pt' ? 'Lusófonas' : 'Portuguese-speaking'}
            />
            <StatCard
              icon={CalendarIcon}
              value="50+"
              label={currentLanguage === 'pt' ? 'Eventos Anuais' : 'Annual Events'}
              subtext={currentLanguage === 'pt' ? 'Culturais' : 'Cultural'}
            />
            <StatCard
              icon={HeartIcon}
              value="25+"
              label={currentLanguage === 'pt' ? 'Tradições' : 'Traditions'}
              subtext={currentLanguage === 'pt' ? 'Preservadas' : 'Preserved'}
            />
            <StatCard
              icon={StarIcon}
              value="100+"
              label={currentLanguage === 'pt' ? 'Parcerias' : 'Partnerships'}
              subtext={currentLanguage === 'pt' ? 'Locais' : 'Local'}
            />
            <StatCard
              icon={PlayIcon}
              value="15+"
              label={currentLanguage === 'pt' ? 'Gêneros Musicais' : 'Music Genres'}
              subtext={currentLanguage === 'pt' ? 'Representados' : 'Represented'}
            />
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: currentLanguage === 'pt' ? 'Todas as Nações' : 'All Nations' },
              { key: 'americas', label: currentLanguage === 'pt' ? 'Américas' : 'Americas' },
              { key: 'palop', label: 'PALOP África' },
              { key: 'asia-pacific', label: currentLanguage === 'pt' ? 'Ásia-Pacífico' : 'Asia-Pacific' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedFilter === filter.key
                    ? 'bg-heritage-primary text-white shadow-lg scale-105'
                    : 'bg-white text-heritage-primary hover:bg-heritage-primary/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Cultural Events Highlight */}
      <section className="py-16 bg-gradient-to-r from-heritage-primary/10 to-heritage-secondary/10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-heritage-primary mb-12">
            {currentLanguage === 'pt' 
              ? 'Eventos Transculturais' 
              : 'Cross-Cultural Events'
            }
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CROSS_CULTURAL_EVENTS.map((event, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-heritage-primary mb-2">{event.name}</h3>
                <div className="text-heritage-secondary font-semibold mb-2">{event.date}</div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {event.nations.includes('all') ? (
                    <span className="text-xs bg-heritage-primary/10 text-heritage-primary px-2 py-1 rounded">
                      {currentLanguage === 'pt' ? 'Todas as Nações' : 'All Nations'}
                    </span>
                  ) : (
                    event.nations.map((nationId, idx) => {
                      const nation = PALOP_CULTURAL_SECTIONS.find(s => s.id === nationId)
                      return nation ? (
                        <span key={idx} className="text-sm">
                          {nation.nation.flag} {nation.nation.name}
                        </span>
                      ) : null
                    })
                  )}
                </div>
                
                <button className="w-full bg-heritage-primary text-white py-2 rounded-lg hover:bg-heritage-primary-dark transition-colors">
                  {currentLanguage === 'pt' ? 'Saber Mais' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Cultural Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <PalopCulturalSections 
            featuredNations={selectedFilter === 'all' ? undefined : filteredSections.map(s => s.id)}
            showAllEvents={true}
            enableCarousel={true}
          />
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-heritage-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {currentLanguage === 'pt' 
                ? 'Histórias de Sucesso' 
                : 'Success Stories'
              }
            </h2>
            <p className="text-xl opacity-90">
              {currentLanguage === 'pt'
                ? 'Membros da nossa comunidade que alcançaram o sucesso no Reino Unido'
                : 'Community members who have achieved success in the UK'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allSuccessStories.slice(0, 6).map((story, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{story.nation.flag}</span>
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-sm opacity-75">{story.profession} • {story.location}</p>
                  </div>
                </div>
                
                <blockquote className="italic mb-4 opacity-90">
                  "{story.quote}"
                </blockquote>
                
                <div className="text-sm bg-heritage-accent/20 text-heritage-accent px-3 py-1 rounded-full inline-block">
                  {story.highlight}
                </div>
              </div>
            ))}
          </div>

          {!showSuccessStories && allSuccessStories.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowSuccessStories(true)}
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 py-3 px-8 rounded-lg font-semibold hover:bg-white hover:text-heritage-primary transition-all duration-300"
              >
                {currentLanguage === 'pt' ? 'Ver Mais Histórias' : 'View More Stories'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-heritage-secondary to-heritage-accent">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            {currentLanguage === 'pt' 
              ? 'Faça Parte da Nossa Comunidade' 
              : 'Become Part of Our Community'
            }
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {currentLanguage === 'pt'
              ? 'Conecte-se com portugueses de todas as 8 nações lusófonas no Reino Unido'
              : 'Connect with Portuguese speakers from all 8 lusophone nations in the UK'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleJoinCommunity}
              className="bg-white text-heritage-primary py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <span>
                {currentLanguage === 'pt' ? 'Juntar-se Agora' : 'Join Now'}
              </span>
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => window.location.href = '/events'}
              className="bg-heritage-primary text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-heritage-primary-dark transition-colors"
            >
              {currentLanguage === 'pt' ? 'Ver Eventos' : 'View Events'}
            </button>
          </div>

          {/* Community Impact Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div>
              <div className="text-3xl font-bold">750+</div>
              <div className="text-sm opacity-75">
                {currentLanguage === 'pt' ? 'Membros Ativos' : 'Active Members'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm opacity-75">
                {currentLanguage === 'pt' ? 'Nações Representadas' : 'Nations Represented'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm opacity-75">
                {currentLanguage === 'pt' ? 'Cidades do Reino Unido' : 'UK Cities'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-75">
                {currentLanguage === 'pt' ? 'Eventos Anuais' : 'Annual Events'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}