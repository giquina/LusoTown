import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('businessDirectory', '/business-directory')

export default function BusinessDirectoryLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
