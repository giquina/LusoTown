import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('businessNetworking', '/business-networking')

export default function BusinessNetworkingLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
