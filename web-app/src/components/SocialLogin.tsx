'use client'

import React, { useState } from 'react'
import SocialLoginButton from './SocialLoginButton'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface SocialLoginProps {
  mode: 'login' | 'signup'
}

export default function SocialLogin({ mode }: SocialLoginProps) {
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)

  const handleSocialLogin = async (platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn') => {
    // Instagram OAuth is not supported via Supabase; show notice.
    if (platform === 'Instagram') {
      toast.error('Instagram login is coming soon');
      return;
    }

    // Map UI platform names to Supabase providers
    const providerMap: Record<string, Parameters<typeof supabase.auth.signInWithOAuth>[0]['provider']> = {
      Google: 'google',
      Facebook: 'facebook',
      LinkedIn: 'linkedin_oidc', // Requires LinkedIn OIDC configured in Supabase
    }

    const provider = providerMap[platform]
    if (!provider) {
      toast.error('Unsupported provider')
      return
    }

    setLoadingPlatform(platform)
    try {
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      })
      if (error) {
        toast.error(error.message)
        setLoadingPlatform(null)
      }
      // On success, Supabase will redirect; no further action here.
    } catch (e) {
      console.error('Social login error:', e)
      toast.error('Failed to start social login')
      setLoadingPlatform(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Multi-column social login layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Row 1: Google + Facebook */}
        <SocialLoginButton
          platform="google"
          onClick={() => handleSocialLogin('Google')}
          isLoading={loadingPlatform === 'Google'}
        />
        
        <SocialLoginButton
          platform="facebook"
          onClick={() => handleSocialLogin('Facebook')}
          isLoading={loadingPlatform === 'Facebook'}
        />
        
        {/* Row 2: Instagram + LinkedIn */}
        <SocialLoginButton
          platform="instagram"
          onClick={() => handleSocialLogin('Instagram')}
          isLoading={loadingPlatform === 'Instagram'}
        />
        
        <SocialLoginButton
          platform="linkedin"
          onClick={() => handleSocialLogin('LinkedIn')}
          isLoading={loadingPlatform === 'LinkedIn'}
        />
      </div>
      
      {/* Email option - centered and smaller as secondary option */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            or continue with email
          </span>
        </div>
      </div>
    </div>
  )
}