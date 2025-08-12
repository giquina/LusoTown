import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to AdyaTribe! | Your Invitation is Being Processed',
  description: 'Thank you for requesting an invitation to AdyaTribe. Learn what happens next in our verification process for the UK\'s premier community of women 30+.',
  robots: 'noindex, nofollow' // Prevent indexing of success pages
}

export default function SignupSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}