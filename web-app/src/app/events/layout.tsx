import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'
import { ROUTES } from '@/config/routes'

export const metadata: Metadata = metadataFor('events', ROUTES.events)

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
