/**
 * Server-side Supabase client for API routes
 * Re-exports the createClient function from the main supabase module
 */

import { cookies } from 'next/headers'
import { createClient as createSupabaseClient } from '../supabase'

export function createClient() {
  const cookieStore = cookies()
  return createSupabaseClient(cookieStore)
}

// Re-export for convenience
export { createClient as default }