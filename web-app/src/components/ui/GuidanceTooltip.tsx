'use client'
import React, { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
interface GuidanceTooltipProps {
  id: string
  title: string
  description?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus' | 'auto'
  delay?: number
  children: React.ReactNode
  className?: string
  showOnMount?: boolean
  priority?: 'high' | 'medium' | 'low'
}
// Predefined guidance tooltips for common UI elements
export const GUIDANCE_TOOLTIPS = {
  homepage: {
    hero: 'guidance.welcome.title',
    palop: 'guidance.palop.title',
    events: 'guidance.calendar.title',
    businesses: 'guidance.business.title'
  },
  events: {
    calendar: 'guidance.calendar.title',
    filters: '📅 Use filters to find events that match your interests and schedule',
    booking: '🎫 Click any event to see pricing and availability'
  },
  matches: {
    types: 'guidance.matches.title',
    compatibility: '💫 Our AI matches you based on cultural interests and values',
    profile: '✨ Complete your profile for better matches'
  },
  business: {
    directory: 'guidance.business.title',
    search: '🔍 Search by business type, location, or Portuguese heritage',
    support: '❤️ Support Portuguese-speaking entrepreneurs in your community'
  }
} as const
export default function GuidanceTooltip({
  id,
  title,
  description,
  position = 'top',
  trigger = 'hover',
  delay = 500,
  children,
  className = '',
  showOnMount = false,
  priority = 'medium'
}: GuidanceTooltipProps) {
  const { t } = useLanguage()
  const elementRef = useRef<HTMLDivElement>(null)
  // Initialize tooltip functionality on client side only
  useEffect(() => {
    // Only initialize tooltip functionality if TooltipProvider is available
    if (typeof window !== 'undefined') {
      try {
        import('@/components/ui/Tooltip').then(({ useTooltipTrigger }) => {
          // Dynamic import to avoid SSR issues
        })
      } catch (error) {
        // Tooltip functionality not available, but data-guidance attribute will still work
        }
    }
  }, [])
  // Always render the data-guidance attribute for testing/debugging
  return (
    <div
      ref={elementRef}
      className={`guidance-tooltip-wrapper ${className}`}
      data-guidance={id}
      data-tooltip-priority={priority}
      data-tooltip-title={title}
      data-tooltip-description={description}
      data-tooltip-position={position}
      data-tooltip-trigger={trigger}
    >
      {children}
    </div>
  )
}
// Pre-configured guidance tooltips for common elements
export function HomepageHeroTooltip({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <GuidanceTooltip
      id="homepage-hero"
      title={t('guidance.welcome.title')}
      description={t('guidance.welcome.subtitle')}
      position="bottom"
      trigger="auto"
      delay={1000}
      showOnMount
      priority="high"
    >
      {children}
    </GuidanceTooltip>
  )
}
export function PALOPSectionTooltip({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <GuidanceTooltip
      id="palop-section"
      title={t('guidance.palop.title')}
      description={t('guidance.palop.subtitle')}
      position="top"
      trigger="hover"
      delay={800}
      priority="medium"
    >
      {children}
    </GuidanceTooltip>
  )
}
export function EventsCalendarTooltip({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <GuidanceTooltip
      id="events-calendar"
      title={t('guidance.calendar.title')}
      description={t('guidance.calendar.subtitle')}
      position="bottom"
      trigger="auto"
      delay={600}
      showOnMount
      priority="high"
    >
      {children}
    </GuidanceTooltip>
  )
}
export function MatchingTooltip({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <GuidanceTooltip
      id="matching-section"
      title={t('guidance.matches.title')}
      description={t('guidance.matches.subtitle')}
      position="bottom"
      trigger="auto"
      delay={700}
      showOnMount
      priority="medium"
    >
      {children}
    </GuidanceTooltip>
  )
}
export function BusinessDirectoryTooltip({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()
  return (
    <GuidanceTooltip
      id="business-directory"
      title={t('guidance.business.title')}
      description={t('guidance.business.subtitle')}
      position="top"
      trigger="auto"
      delay={800}
      showOnMount
      priority="medium"
    >
      {children}
    </GuidanceTooltip>
  )
}
// Hook for creating custom guidance tooltips
export function useGuidanceTooltip(
  id: string,
  config: Partial<GuidanceTooltipProps> = {}
) {
  const { t } = useLanguage()
  return {
    id,
    title: config.title || t(`guidance.${id}.title`, `Guidance for ${id}`),
    description: config.description || t(`guidance.${id}.subtitle`, ''),
    position: config.position || 'top',
    trigger: config.trigger || 'hover',
    delay: config.delay || 500,
    priority: config.priority || 'medium'
  }
}
// Utility to add guidance attributes to existing components
export function withGuidance<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  guidanceId: string,
  tooltipConfig?: Partial<GuidanceTooltipProps>
) {
  return function GuidanceWrappedComponent(props: T) {
    return (
      <GuidanceTooltip
        id={guidanceId}
        title={tooltipConfig?.title || ''}
        {...tooltipConfig}
      >
        <Component {...props} />
      </GuidanceTooltip>
    )
  }
}
