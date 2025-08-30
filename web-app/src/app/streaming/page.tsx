import { Metadata } from 'next'
import { StreamDashboard } from '@/components/streaming/StreamDashboard'

export const metadata: Metadata = {
  title: 'Portuguese Community Streaming | LusoTown',
  description: 'Create and watch Portuguese cultural streams - Fado, cooking, events, and more from the Portuguese-speaking community in the UK',
  keywords: 'Portuguese streaming, Fado live, Portuguese cooking, cultural events, PALOP community',
  openGraph: {
    title: 'Portuguese Community Streaming | LusoTown',
    description: 'Join live Portuguese cultural streaming - music, cooking, events and community discussions',
    images: ['/images/streaming-og.jpg'],
  }
}

export default function StreamingPage() {
  return (
    <main className="min-h-screen">
      <StreamDashboard />
    </main>
  )
}
