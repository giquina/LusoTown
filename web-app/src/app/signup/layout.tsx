import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join AdyaTribe | Exclusive Community for Women 30+ in London & UK',
  description: 'Request your invitation to AdyaTribe - a safe, verified community of 300+ professional women 30+ in London & UK. Quality friendships through selfie verification and curated groups.',
  openGraph: {
    title: 'Join AdyaTribe | Exclusive Community for Women 30+ in London & UK',
    description: 'Request your invitation to AdyaTribe - a safe, verified community of 300+ professional women 30+ in London & UK. Quality friendships through selfie verification and curated groups.',
    type: 'website',
    locale: 'en_GB',
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}