import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('live', '/live')

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
