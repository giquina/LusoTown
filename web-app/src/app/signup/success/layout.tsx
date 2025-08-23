import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to LusoTown! | Your Invitation is Being Processed',
  description: 'Thank you for requesting an invitation to LusoTown. Learn what happens next in our verification process for the United Kingdom\'s premier community of women 30+.',
  robots: 'noindex, nofollow' // Prevent indexing of success pages
}

export default function SignupSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}