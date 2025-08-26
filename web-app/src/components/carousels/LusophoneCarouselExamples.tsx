'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import LusophoneCarousel, { 
  type WeekendEventItem, 
  type PALOPHeritageItem, 
  type WeeklyDiscoveryItem, 
  type CulturalCelebrationItem 
} from './LusophoneCarousel'
import { 
  WeekendEventCard, 
  PALOPHeritageCard, 
  WeeklyDiscoveryCard, 
  CulturalCelebrationCard 
} from './LusophoneCarouselCards'
import { useLanguage } from '@/context/LanguageContext'
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'

/**
 * Custom hooks for carousel data management
 */

/**
 * Hook for managing weekend events data
 */
export function useWeekendEvents() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const router = useRouter()

  const toggleFavorite = useCallback((eventId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId)
        toast.success('Removed from favorites')
      } else {
        newFavorites.add(eventId)
        toast.success('Added to favorites')
      }
      return newFavorites
    })
  }, [])

  const toggleBookmark = useCallback((eventId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(eventId)) {
        newBookmarks.delete(eventId)
        toast.success('Bookmark removed')
      } else {
        newBookmarks.add(eventId)
        toast.success('Event bookmarked')
      }
      return newBookmarks
    })
  }, [])

  const handleEventClick = useCallback((event: WeekendEventItem) => {
    router.push(`/events/${event.id}`)
  }, [router])

  return {
    favorites,
    bookmarks,
    toggleFavorite,
    toggleBookmark,
    handleEventClick
  }
}

/**
 * Hook for managing PALOP heritage interactions
 */
export function usePALOPHeritage() {
  const router = useRouter()

  const handleExploreClick = useCallback((heritageId: string) => {
    router.push(`/heritage/${heritageId}`)
    toast.success('Exploring heritage...')
  }, [router])

  const handleHeritageClick = useCallback((heritage: PALOPHeritageItem) => {
    router.push(`/heritage/${heritage.id}`)
  }, [router])

  return {
    handleExploreClick,
    handleHeritageClick
  }
}

/**
 * Hook for managing weekly discovery interactions
 */
export function useWeeklyDiscovery() {
  const router = useRouter()

  const handleDiscoverClick = useCallback((discoveryId: string) => {
    router.push(`/discover/${discoveryId}`)
    toast.success('Discovering more...')
  }, [router])

  const handleDiscoveryClick = useCallback((discovery: WeeklyDiscoveryItem) => {
    router.push(`/discover/${discovery.id}`)
  }, [router])

  return {
    handleDiscoverClick,
    handleDiscoveryClick
  }
}

/**
 * Hook for managing cultural celebration interactions
 */
export function useCulturalCelebrations() {
  const router = useRouter()

  const handleLearnMoreClick = useCallback((celebrationId: string) => {
    router.push(`/celebrations/${celebrationId}`)
    toast.success('Learning more...')
  }, [router])

  const handleCelebrationClick = useCallback((celebration: CulturalCelebrationItem) => {
    router.push(`/celebrations/${celebration.id}`)
  }, [router])

  return {
    handleLearnMoreClick,
    handleCelebrationClick
  }
}

/**
 * Weekend Events Carousel Example
 */
interface WeekendEventsCarouselProps {
  events: WeekendEventItem[]
  loading?: boolean
  className?: string
}

export function WeekendEventsCarousel({ 
  events, 
  loading = false, 
  className = '' 
}: WeekendEventsCarouselProps) {
  const { language } = useLanguage()
  const { favorites, bookmarks, toggleFavorite, toggleBookmark, handleEventClick } = useWeekendEvents()

  const renderEventCard = useCallback((event: WeekendEventItem, index: number) => (
    <WeekendEventCard
      key={event.id}
      event={event}
      onFavoriteToggle={toggleFavorite}
      onBookmarkToggle={toggleBookmark}
      isFavorite={favorites.has(event.id)}
      isBookmarked={bookmarks.has(event.id)}
    />
  ), [favorites, bookmarks, toggleFavorite, toggleBookmark])

  return (
    <LusophoneCarousel
      items={events}
      renderItem={renderEventCard}
      title={{
        en: 'Weekend Portuguese-speaking Community Events',
        pt: 'Eventos de Fim de Semana da Comunidade Lusófona'
      }}
      subtitle={{
        en: 'Discover authentic events celebrating Portuguese-speaking cultures across London',
        pt: 'Descubra eventos autênticos celebrando as culturas lusófonas em Londres'
      }}
      autoAdvance={true}
      autoAdvanceInterval={6000}
      onItemClick={handleEventClick}
      loading={loading}
      className={className}
      emptyStateMessage={{
        en: 'No weekend events available right now. Check back soon for new Portuguese-speaking community events!',
        pt: 'Nenhum evento de fim de semana disponível agora. Volte em breve para novos eventos da comunidade lusófona!'
      }}
    />
  )
}

/**
 * PALOP Heritage Carousel Example
 */
interface PALOPHeritageCarouselProps {
  heritageItems: PALOPHeritageItem[]
  loading?: boolean
  className?: string
}

export function PALOPHeritageCarousel({ 
  heritageItems, 
  loading = false, 
  className = '' 
}: PALOPHeritageCarouselProps) {
  const { language } = useLanguage()
  const { handleExploreClick, handleHeritageClick } = usePALOPHeritage()

  const renderHeritageCard = useCallback((heritage: PALOPHeritageItem, index: number) => (
    <PALOPHeritageCard
      key={heritage.id}
      heritage={heritage}
      onExploreClick={handleExploreClick}
    />
  ), [handleExploreClick])

  return (
    <LusophoneCarousel
      items={heritageItems}
      renderItem={renderHeritageCard}
      title={{
        en: 'PALOP Cultural Heritage',
        pt: 'Património Cultural PALOP'
      }}
      subtitle={{
        en: 'Explore the rich cultural heritage of Portuguese-speaking African countries',
        pt: 'Explore o rico património cultural dos países africanos de língua portuguesa'
      }}
      autoAdvance={false}
      responsive={{
        mobile: { itemsPerView: 1, spacing: 16 },
        tablet: { itemsPerView: 2, spacing: 20 },
        desktop: { itemsPerView: 3, spacing: 24 }
      }}
      onItemClick={handleHeritageClick}
      loading={loading}
      className={className}
      emptyStateMessage={{
        en: 'Heritage content is being curated. Check back soon to explore PALOP cultural heritage!',
        pt: 'O conteúdo do património está sendo preparado. Volte em breve para explorar o património cultural PALOP!'
      }}
    />
  )
}

/**
 * Weekly Discovery Carousel Example
 */
interface WeeklyDiscoveryCarouselProps {
  discoveries: WeeklyDiscoveryItem[]
  loading?: boolean
  className?: string
}

export function WeeklyDiscoveryCarousel({ 
  discoveries, 
  loading = false, 
  className = '' 
}: WeeklyDiscoveryCarouselProps) {
  const { language } = useLanguage()
  const { handleDiscoverClick, handleDiscoveryClick } = useWeeklyDiscovery()

  const renderDiscoveryCard = useCallback((discovery: WeeklyDiscoveryItem, index: number) => (
    <WeeklyDiscoveryCard
      key={discovery.id}
      discovery={discovery}
      onDiscoverClick={handleDiscoverClick}
    />
  ), [handleDiscoverClick])

  return (
    <LusophoneCarousel
      items={discoveries}
      renderItem={renderDiscoveryCard}
      title={{
        en: 'Weekly Portuguese-speaking Community Discoveries',
        pt: 'Descobertas Semanais da Comunidade Lusófona'
      }}
      subtitle={{
        en: 'Fresh discoveries from London\'s Portuguese-speaking community every week',
        pt: 'Novas descobertas da comunidade lusófona de Londres todas as semanas'
      }}
      autoAdvance={true}
      autoAdvanceInterval={4000}
      responsive={{
        mobile: { itemsPerView: 1, spacing: 16 },
        tablet: { itemsPerView: 2, spacing: 20 },
        desktop: { itemsPerView: 3, spacing: 24 }
      }}
      onItemClick={handleDiscoveryClick}
      loading={loading}
      className={className}
      emptyStateMessage={{
        en: 'No new discoveries this week. Check back for fresh Portuguese-speaking community finds!',
        pt: 'Nenhuma nova descoberta esta semana. Volte para novos achados da comunidade lusófona!'
      }}
    />
  )
}

/**
 * Cultural Celebrations Carousel Example
 */
interface CulturalCelebrationsCarouselProps {
  celebrations?: CulturalCelebrationItem[]
  loading?: boolean
  className?: string
  featuredOnly?: boolean
}

export function CulturalCelebrationsCarousel({ 
  celebrations,
  loading = false, 
  className = '',
  featuredOnly = false
}: CulturalCelebrationsCarouselProps) {
  const { language } = useLanguage()
  const { handleLearnMoreClick, handleCelebrationClick } = useCulturalCelebrations()

  // Use provided celebrations or fallback to config data
  const celebrationItems = celebrations || LUSOPHONE_CELEBRATIONS.map((celebration): CulturalCelebrationItem => ({
    id: celebration.id,
    title: celebration.name,
    description: celebration.description,
    flagEmoji: celebration.flagEmoji,
    countries: celebration.countries,
    category: celebration.category,
    celebrationType: celebration.category,
    period: celebration.period,
    significance: celebration.significance,
    traditionalElements: celebration.traditionalElements
  }))

  const displayItems = featuredOnly ? celebrationItems.slice(0, 6) : celebrationItems

  const renderCelebrationCard = useCallback((celebration: CulturalCelebrationItem, index: number) => (
    <CulturalCelebrationCard
      key={celebration.id}
      celebration={celebration}
      onLearnMoreClick={handleLearnMoreClick}
    />
  ), [handleLearnMoreClick])

  return (
    <LusophoneCarousel
      items={displayItems}
      renderItem={renderCelebrationCard}
      title={{
        en: 'Lusophone Cultural Celebrations',
        pt: 'Celebrações Culturais Lusófonas'
      }}
      subtitle={{
        en: 'Celebrate the rich traditions of Portuguese-speaking cultures throughout the year',
        pt: 'Celebre as ricas tradições das culturas lusófonas durante todo o ano'
      }}
      autoAdvance={true}
      autoAdvanceInterval={8000}
      responsive={{
        mobile: { itemsPerView: 1, spacing: 16 },
        tablet: { itemsPerView: 2, spacing: 20 },
        desktop: { itemsPerView: 3, spacing: 24 }
      }}
      onItemClick={handleCelebrationClick}
      loading={loading}
      className={className}
      emptyStateMessage={{
        en: 'Cultural celebrations are being updated. Explore our rich Lusophone heritage soon!',
        pt: 'As celebrações culturais estão sendo atualizadas. Explore nosso rico património lusófono em breve!'
      }}
    />
  )
}

/**
 * Utility function to create mock data for testing
 */
export function createMockWeekendEvents(count: number = 6): WeekendEventItem[] {
  const mockEvents: WeekendEventItem[] = [
    {
      id: 'event-1',
      title: {
        en: 'Fado Night at Heritage Centre',
        pt: 'Noite de Fado no Centro do Património'
      },
      description: {
        en: 'Experience authentic Portuguese Fado music with local artists',
        pt: 'Experimente música Fado portuguesa autêntica com artistas locais'
      },
      date: 'Saturday, Dec 16',
      time: '19:30',
      location: 'Portuguese Cultural Centre, Central London',
      price: 15,
      attendees: 32,
      maxAttendees: 50,
      countries: ['Portugal'],
      flagEmoji: '🇵🇹',
      category: 'Music',
      tags: ['Fado', 'Live Music', 'Cultural'],
      image: '/events/fado-night.jpg'
    },
    {
      id: 'event-2',
      title: {
        en: 'Brazilian Capoeira Workshop',
        pt: 'Workshop de Capoeira Brasileira'
      },
      description: {
        en: 'Learn the art of Capoeira with Brazilian masters',
        pt: 'Aprenda a arte da Capoeira com mestres brasileiros'
      },
      date: 'Sunday, Dec 17',
      time: '14:00',
      location: 'Community Sports Centre, South London',
      price: 0,
      attendees: 18,
      maxAttendees: 25,
      countries: ['Brazil'],
      flagEmoji: '🇧🇷',
      category: 'Sports & Culture',
      tags: ['Capoeira', 'Workshop', 'Free'],
      image: '/events/capoeira.jpg'
    },
    {
      id: 'event-3',
      title: {
        en: 'Angolan Kizomba Dance Class',
        pt: 'Aula de Dança Kizomba Angolana'
      },
      description: {
        en: 'Learn the sensual rhythms of Angolan Kizomba dance',
        pt: 'Aprenda os ritmos sensuais da dança Kizomba angolana'
      },
      date: 'Friday, Dec 22',
      time: '20:00',
      location: 'Dance Studio, East London',
      price: 12,
      attendees: 28,
      maxAttendees: 30,
      countries: ['Angola'],
      flagEmoji: '🇦🇴',
      category: 'Dance',
      tags: ['Kizomba', 'Dance Class', 'Social'],
      image: '/events/kizomba.jpg'
    }
  ]

  return mockEvents.slice(0, count)
}

/**
 * Export all example components and utilities
 */
export {
  WeekendEventsCarousel,
  PALOPHeritageCarousel,
  WeeklyDiscoveryCarousel,
  CulturalCelebrationsCarousel,
  useWeekendEvents,
  usePALOPHeritage,
  useWeeklyDiscovery,
  useCulturalCelebrations,
  createMockWeekendEvents
}