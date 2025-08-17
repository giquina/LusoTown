import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('matches', '/matches')

export default function MatchesLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
