'use client'

import { useAuthIntentRestore } from '@/hooks/useAuthIntentRestore'

/**
 * Component to handle auth intent restoration
 * This should be included in the main layout
 */
export default function AuthIntentHandler() {
  useAuthIntentRestore()
  return null
}