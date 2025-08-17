import type { Metadata } from 'next'
import { metadataFor } from '@/lib/next-metadata'

export const metadata: Metadata = metadataFor('premiumMembership', '/premium-membership')

export default function PremiumMembershipLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
