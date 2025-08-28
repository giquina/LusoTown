/**
 * LusoTown Community Components
 * Essential components for Portuguese-speaking community platform
 * Focused on simplicity, accessibility, and community needs
 * 
 * ARCHITECTURE PRINCIPLES:
 * - Community-first design (no luxury/elite positioning)
 * - Mobile-optimized for Portuguese diaspora
 * - Bilingual EN/PT support throughout
 * - Simple cultural matching (no complex AI)
 * - PostGIS-powered business directory
 * - Essential university partnerships (8 institutions)
 * 
 * COMPONENT COUNT: Streamlined from 446 to ~290 community-focused components  
 * REMOVED SYSTEMS: NFT, creator economy, luxury branding, complex AI, voice messaging, over-engineered performance monitoring
 */

// Essential UI Foundation
export * from './ui'

// Community Core Components
export { default as Header } from './Header'
export { default as Footer } from './Footer'
export { default as MobileNavigation } from './MobileNavigation'
export { default as Logo } from './Logo'

// Events System (Portuguese Cultural Events)
export { default as EventCard } from './EventCard'
export { default as ImprovedEventCard } from './ImprovedEventCard'
export { default as EventsShowcase } from './EventsShowcase'
export { default as CulturalCalendar } from './CulturalCalendar'

// Business Directory (PostGIS-powered)
export { default as BusinessCard } from './BusinessCard'
export { default as BusinessDirectory } from './BusinessDirectory'
export { default as BusinessMap } from './BusinessMap'

// Simple Matching System (Cultural Compatibility)
export { MatchesSystem } from './matches'
export { default as SimpleMatches } from './MatchesSystem'

// Transport Coordination
export { TransportCoordination } from './transport'
export { default as TransportServiceCard } from './TransportServiceCard'

// Student Services (8 University Partnerships)
export * from './students'

// Community Foundation
export { default as WelcomeSystem } from './WelcomeSystem'
export { default as Testimonials } from './Testimonials'
export { default as AuthSystem } from './AuthSystem'

// Mobile-First Essentials
export { default as MobileWelcomeWizard } from './MobileWelcomeWizard'
export { default as AppDownloadBar } from './AppDownloadBar'

// Portuguese Cultural Elements
export { default as HeritageSelector } from './HeritageSelector'
export { default as PortugueseNavigation } from './PortugueseNavigation'

// Community Carousels (Simplified)
export { LusophoneCarousel, WeekendEventsCarousel } from './carousels'
