import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'action' | 'outline' | 'ghost' | 'destructive' | 'portugal' | 'brazil' | 'palop'
  size?: 'small' | 'medium' | 'large' | 'icon'
  mobile?: boolean
}

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'medium',
  mobile = false,
  disabled = false,
  ...props 
}: ButtonProps) {
  // Use LusoTown Mobile Design System classes
  const baseClass = 'lusotown-button lusotown-focus'
  
  const variants = {
    primary: 'lusotown-button-primary',
    secondary: 'lusotown-button-secondary', 
    action: 'lusotown-button-action',
    outline: 'lusotown-button-secondary',
    ghost: 'bg-transparent hover:bg-primary-50 text-primary-600 hover:text-primary-700',
    destructive: 'lusotown-button-action',
    portugal: 'lusotown-button-portugal',
    brazil: 'lusotown-button-brazil',
    palop: 'lusotown-button-palop'
  }

  const sizes = {
    small: 'lusotown-button-small',
    medium: '', // Default mobile-optimized size
    large: 'h-52 px-32 text-lg',
    icon: 'lusotown-button-icon'
  }

  // Mobile-specific optimizations
  const mobileClasses = mobile ? 'lusotown-touch-target lusotown-cta-text-mobile' : ''

  return (
    <button 
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${mobileClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="lusotown-button-text lusotown-portuguese-text">
        {children}
      </span>
    </button>
  )
}