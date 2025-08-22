import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'md',
  disabled = false,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm'
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-11 px-8 text-base'
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}