'use client'

import React from 'react'

interface SocialLoginButtonProps {
  provider: string
  onClick: () => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export default function SocialLoginButton({
  provider,
  onClick,
  disabled = false,
  className = '',
  children
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center px-4 py-3 border border-gray-300 
        rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 
        hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children || `Sign in with ${provider}`}
    </button>
  )
}
