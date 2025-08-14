'use client'

import { supabase, type Profile } from '@/lib/supabase'
import { getImageWithFallback } from '@/lib/profileImages'
import { User as SupabaseUser } from '@supabase/supabase-js'

// User interface for the application
export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  membershipTier: 'free' | 'core' | 'premium'
  profileImage?: string
  joinedDate: string
  interests: string[]
  favoriteEvents: string[]
  location: string
}

// Auth state change listener type
export type AuthStateChangeHandler = (user: User | null) => void

// Map Supabase profile to User interface
function mapProfileToUser(profile: Profile, supabaseUser: SupabaseUser): User {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.first_name + (profile.last_name ? ` ${profile.last_name}` : ''),
    role: profile.email.includes('admin@lusotown.com') ? 'admin' : 'user', // Simple admin check
    membershipTier: profile.membership_tier,
    profileImage: profile.profile_picture_url || getImageWithFallback('default-user'),
    joinedDate: new Date(profile.created_at).toISOString().split('T')[0],
    interests: [], // Will be populated from user_interests table if needed
    favoriteEvents: [], // Will be populated from user favoriteEvents if needed
    location: profile.location || ''
  }
}

export class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null
  private authStateListeners: AuthStateChangeHandler[] = []

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
      AuthService.instance.initializeAuthListener()
    }
    return AuthService.instance
  }

  private initializeAuthListener() {
    // Listen for auth state changes from Supabase
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadUserProfile(session.user)
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null
        this.notifyAuthStateChange(null)
      }
    })

    // Try to load current session on initialization
    this.loadCurrentSession()
  }

  private async loadCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      
      if (session?.user) {
        await this.loadUserProfile(session.user)
      }
    } catch (error) {
      console.error('Error loading current session:', error)
    }
  }

  private async loadUserProfile(supabaseUser: SupabaseUser): Promise<User | null> {
    try {
      // Get the user's profile from the profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (error) {
        console.error('Error loading user profile:', error)
        return null
      }

      if (profile) {
        const user = mapProfileToUser(profile, supabaseUser)
        this.currentUser = user
        this.notifyAuthStateChange(user)
        return user
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error)
    }
    return null
  }

  private notifyAuthStateChange(user: User | null) {
    this.authStateListeners.forEach(listener => listener(user))
  }

  onAuthStateChange(handler: AuthStateChangeHandler): () => void {
    this.authStateListeners.push(handler)
    
    // Return unsubscribe function
    return () => {
      this.authStateListeners = this.authStateListeners.filter(listener => listener !== handler)
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        const user = await this.loadUserProfile(data.user)
        if (user) {
          return { success: true, user }
        } else {
          return { success: false, error: 'Failed to load user profile' }
        }
      }

      return { success: false, error: 'Unknown authentication error' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  async signup(email: string, password: string, userData: { firstName: string; lastName?: string }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName || ''
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        // The profile will be created automatically by the database trigger
        // We'll wait a moment for it to be created, then load it
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const user = await this.loadUserProfile(data.user)
        if (user) {
          return { success: true, user }
        } else {
          return { success: true, error: 'Account created. Please check your email to verify your account.' }
        }
      }

      return { success: false, error: 'Unknown signup error' }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      this.currentUser = null
      this.notifyAuthStateChange(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser()
    return user?.role === 'admin'
  }

  async updateFavorites(eventId: string, action: 'add' | 'remove'): Promise<void> {
    const user = this.getCurrentUser()
    if (!user) return

    // Update local state
    if (action === 'add' && !user.favoriteEvents.includes(eventId)) {
      user.favoriteEvents.push(eventId)
    } else if (action === 'remove') {
      user.favoriteEvents = user.favoriteEvents.filter(id => id !== eventId)
    }

    // TODO: Implement database update for favorite events
    // This would involve updating a user_favorite_events table
    try {
      // Placeholder for future database implementation
      console.log(`${action} favorite event ${eventId} for user ${user.id}`)
    } catch (error) {
      console.error('Error updating favorites:', error)
    }
  }

  async updateProfile(updates: Partial<User>): Promise<void> {
    const user = this.getCurrentUser()
    if (!user) throw new Error('No user logged in')

    try {
      // Map User interface updates to Profile table updates
      const profileUpdates: Partial<Profile> = {}
      
      if (updates.name) {
        const nameParts = updates.name.split(' ')
        profileUpdates.first_name = nameParts[0]
        if (nameParts.length > 1) {
          profileUpdates.last_name = nameParts.slice(1).join(' ')
        }
      }
      
      if (updates.location) profileUpdates.location = updates.location
      if (updates.membershipTier) profileUpdates.membership_tier = updates.membershipTier
      if (updates.profileImage) profileUpdates.profile_picture_url = updates.profileImage

      // Update the profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileUpdates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      // Update local user state
      Object.assign(user, updates)
      this.notifyAuthStateChange(user)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      
      if (error) {
        return { success: false, error: error.message }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance()

// Convenience exports for common auth operations
export const getCurrentUser = () => authService.getCurrentUser()
export const isAuthenticated = () => authService.isAuthenticated()
export const isAdmin = () => authService.isAdmin()
export const logout = () => authService.logout()

// Hook-like function for auth state changes (for React components)
export const useAuthState = (callback: AuthStateChangeHandler) => {
  return authService.onAuthStateChange(callback)
}