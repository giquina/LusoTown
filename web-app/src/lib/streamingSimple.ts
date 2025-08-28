// Simplified streaming for Portuguese community events
// Focus on embedding existing platform streams rather than hosting our own

export interface CommunityStream {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  hostName: string
  eventType: 'fado' | 'cultural' | 'business' | 'educational' | 'festival'
  platform: 'youtube' | 'instagram' | 'facebook' | 'twitch'
  embedUrl: string
  scheduledStart: string
  isLive: boolean
  viewerCount?: number
  language: 'pt' | 'en' | 'both'
}

// Simple event types for Portuguese community
export const STREAM_EVENT_TYPES = {
  fado: {
    label: 'Fado & Traditional Music',
    labelPortuguese: 'Fado e Música Tradicional',
    color: 'purple'
  },
  cultural: {
    label: 'Cultural Events',
    labelPortuguese: 'Eventos Culturais', 
    color: 'blue'
  },
  business: {
    label: 'Business & Networking',
    labelPortuguese: 'Negócios e Networking',
    color: 'green'
  },
  educational: {
    label: 'Portuguese Language',
    labelPortuguese: 'Língua Portuguesa',
    color: 'yellow'
  },
  festival: {
    label: 'Festivals & Celebrations',
    labelPortuguese: 'Festivais e Celebrações',
    color: 'red'
  }
} as const

// Mock community streams for demonstration
export const mockCommunityStreams: CommunityStream[] = [
  {
    id: 'stream_1',
    title: 'Fado Night Live from Portuguese Cultural Centre',
    titlePortuguese: 'Noite de Fado ao Vivo do Centro Cultural Português',
    description: 'Join us for an evening of traditional Portuguese Fado music',
    descriptionPortuguese: 'Junte-se a nós para uma noite de Fado tradicional português',
    hostName: 'Portuguese Cultural Centre London',
    eventType: 'fado',
    platform: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    scheduledStart: '2024-09-15T19:00:00Z',
    isLive: false,
    language: 'both'
  },
  {
    id: 'stream_2',
    title: 'Portuguese Business Network Meetup',
    titlePortuguese: 'Encontro da Rede Empresarial Portuguesa',
    description: 'Monthly networking event for Portuguese-speaking entrepreneurs',
    descriptionPortuguese: 'Evento mensal de networking para empreendedores de língua portuguesa',
    hostName: 'LusoTown Business Network',
    eventType: 'business',
    platform: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    scheduledStart: '2024-09-20T18:30:00Z',
    isLive: true,
    viewerCount: 47,
    language: 'both'
  }
]

// Simple functions for community streaming
export function getCommunityStreams(): CommunityStream[] {
  return mockCommunityStreams
}

export function getLiveStreams(): CommunityStream[] {
  return mockCommunityStreams.filter(stream => stream.isLive)
}

export function getUpcomingStreams(): CommunityStream[] {
  const now = new Date()
  return mockCommunityStreams.filter(stream => 
    new Date(stream.scheduledStart) > now && !stream.isLive
  )
}

export function getStreamsByType(eventType: keyof typeof STREAM_EVENT_TYPES): CommunityStream[] {
  return mockCommunityStreams.filter(stream => stream.eventType === eventType)
}

// Utility to generate safe embed URLs
export function getSafeEmbedUrl(stream: CommunityStream): string {
  // In a real app, validate and sanitize these URLs
  return stream.embedUrl
}

// Helper to format stream timing
export function formatStreamTime(scheduledStart: string, language: 'en' | 'pt' = 'en'): string {
  const date = new Date(scheduledStart)
  return date.toLocaleString(
    language === 'pt' ? 'pt-PT' : 'en-GB',
    {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  )
}