import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('events', '/events')

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
