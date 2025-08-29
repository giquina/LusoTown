'use client'

import React from 'react'
import { LusophoneCarousel, LusophoneCarouselItem } from './LusophoneCarousel'

export interface CarouselExampleProps {
  title?: string
  type?: 'events' | 'businesses' | 'testimonials' | 'general'
}

const sampleEvents: LusophoneCarouselItem[] = [
  {
    id: '1',
    title: { en: 'Portuguese Cultural Festival', pt: 'Festival Cultural Português' },
    subtitle: { en: 'London', pt: 'Londres' },
    description: { en: 'Experience Portuguese culture', pt: 'Experimente a cultura portuguesa' },
    flagEmoji: '🇵🇹',
    category: 'cultural'
  },
  {
    id: '2', 
    title: { en: 'Brazilian Music Night', pt: 'Noite de Música Brasileira' },
    subtitle: { en: 'Manchester', pt: 'Manchester' },
    description: { en: 'Enjoy Brazilian rhythms', pt: 'Desfrute dos ritmos brasileiros' },
    flagEmoji: '🇧🇷',
    category: 'music'
  }
]

export default function LusophoneCarouselExamples({ 
  title = 'Community Events',
  type = 'general' 
}: CarouselExampleProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <LusophoneCarousel
        items={sampleEvents}
        variant="events"
        showControls={true}
        enablePortugueseGestures={true}
        autoAdvance={{
          enabled: false,
          interval: 5000
        }}
        mobileSettings={{
          enableSwipeGestures: true,
          enableHapticFeedback: false,
          enablePullToRefresh: false
        }}
      />
    </div>
  )
}

export { type CarouselExampleProps }
