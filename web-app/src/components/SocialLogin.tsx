'use client'

import React, { useState } from 'react'
import SocialLoginButton from './SocialLoginButton'

interface SocialLoginProps {
  mode: 'login' | 'signup'
}

export default function SocialLogin({ mode }: SocialLoginProps) {
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)

  const handleSocialLogin = (platform: string) => {
    setLoadingPlatform(platform)
    
    // Placeholder for actual OAuth integration
    console.log(`${mode === 'login' ? 'Logging in' : 'Signing up'} with ${platform}`)
    
    // Simulate loading state
    setTimeout(() => {
      setLoadingPlatform(null)
      // Here you would redirect to OAuth provider or handle the authentication
      console.log(`${platform} authentication would be implemented here`)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
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
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            or continue with email
          </span>
        </div>
      </div>
    </div>
  )
}