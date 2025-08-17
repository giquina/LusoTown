import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('heritage', '/instituto-camoes')

export default function HeritageLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
