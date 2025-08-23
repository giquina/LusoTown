import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join LusoTown | Exclusive Community for Women 30+ in London & United Kingdom',
  description: 'Request your invitation to LusoTown - a safe, verified community of 300+ professional women 30+ in London & United Kingdom. Quality friendships through selfie verification and curated groups.',
  openGraph: {
    title: 'Join LusoTown | Exclusive Community for Women 30+ in London & United Kingdom',
    description: 'Request your invitation to LusoTown - a safe, verified community of 300+ professional women 30+ in London & United Kingdom. Quality friendships through selfie verification and curated groups.',
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