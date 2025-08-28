'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

// Modern Button System for Portuguese-speaking Community Platform

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'cultural' | 'portuguese' | 'brazil' | 'palop'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  gradient?: boolean
}

const baseButtonClasses = 'inline-flex items-center justify-center gap-2 rounded-button font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500',
  secondary: 'bg-white hover:bg-neutral-50 text-primary-700 border border-neutral-300 hover:border-primary-300 shadow-sm hover:shadow-md focus:ring-primary-500',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white shadow-sm hover:shadow-md focus:ring-primary-500',
  ghost: 'text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-500',
  destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg focus:ring-red-500',
  cultural: 'bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 hover:from-secondary-700 hover:via-primary-700 hover:to-accent-700 text-white shadow-md hover:shadow-lg focus:ring-secondary-500',
  portuguese: 'bg-gradient-to-r from-red-600 via-green-600 to-red-600 hover:from-red-700 hover:via-green-700 hover:to-red-700 text-white shadow-md hover:shadow-lg focus:ring-red-500',
  brazil: 'bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 hover:from-green-600 hover:via-yellow-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg focus:ring-green-500',
  palop: 'bg-gradient-to-r from-primary-600 via-accent-600 to-action-600 hover:from-primary-700 hover:via-accent-700 hover:to-action-700 text-white shadow-md hover:shadow-lg focus:ring-primary-500'
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm', // Default size
  lg: 'h-12 px-6 text-base min-h-[48px]', // Touch-friendly
  xl: 'h-14 px-8 text-lg min-h-[56px]', // Extra touch-friendly
  icon: 'h-10 w-10 p-0'
}

const gradientHoverEffects = {
  cultural: 'hover:scale-[1.02] hover:shadow-cultural active:scale-[0.98]',
  portuguese: 'hover:scale-[1.02] hover:shadow-portuguese active:scale-[0.98]',
  brazil: 'hover:scale-[1.02] hover:shadow-elevated active:scale-[0.98]',
  palop: 'hover:scale-[1.02] hover:shadow-lusophone active:scale-[0.98]'
}

export function ModernButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  gradient = false,
  disabled,
  ...props
}: ButtonProps) {
  const isGradientVariant = ['cultural', 'portuguese', 'brazil', 'palop'].includes(variant)
  const hasGradientEffects = gradient || isGradientVariant
  
  const variantClass = variantClasses[variant]
  const sizeClass = sizeClasses[size]
  const gradientEffect = hasGradientEffects && isGradientVariant ? gradientHoverEffects[variant as keyof typeof gradientHoverEffects] : ''
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        baseButtonClasses,
        variantClass,
        sizeClass,
        gradientEffect,
        widthClass,
        'transform transition-all duration-200',
        !isDisabled && 'hover:-translate-y-0.5 active:translate-y-0',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {!loading && leftIcon && leftIcon}
      <span className={cn(loading && 'opacity-0')}>{children}</span>
      {!loading && rightIcon && rightIcon}
    </button>
  )
}

// Specialized Button Components

interface CulturalButtonProps extends Omit<ButtonProps, 'variant'> {
  nation?: 'portugal' | 'brazil' | 'palop' | 'lusophone'
}

export function CulturalButton({ 
  nation = 'lusophone', 
  className,
  ...props 
}: CulturalButtonProps) {
  const variantMap = {
    portugal: 'portuguese' as const,
    brazil: 'brazil' as const,
    palop: 'palop' as const,
    lusophone: 'cultural' as const
  }

  return (
    <ModernButton
      variant={variantMap[nation]}
      gradient
      className={cn('font-semibold', className)}
      {...props}
    />
  )
}

interface CTAButtonProps extends ButtonProps {
  emphasis?: 'high' | 'medium' | 'low'
}

export function CTAButton({ 
  emphasis = 'high',
  size = 'lg',
  className,
  children,
  ...props 
}: CTAButtonProps) {
  const emphasisVariants = {
    high: 'cultural',
    medium: 'primary',
    low: 'outline'
  } as const

  const emphasisSizes = {
    high: 'xl',
    medium: 'lg',
    low: 'md'
  } as const

  return (
    <ModernButton
      variant={emphasisVariants[emphasis]}
      size={emphasisSizes[emphasis]}
      gradient={emphasis === 'high'}
      className={cn(
        'font-bold tracking-wide',
        emphasis === 'high' && 'text-shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </ModernButton>
  )
}

interface IconButtonProps extends Omit<ButtonProps, 'size' | 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode
  label: string
  size?: 'sm' | 'md' | 'lg'
}

export function IconButton({ 
  icon, 
  label, 
  size = 'md',
  className,
  ...props 
}: IconButtonProps) {
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  return (
    <ModernButton
      size="icon"
      className={cn(iconSizes[size], className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </ModernButton>
  )
}

interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

export function ButtonGroup({ 
  children, 
  className,
  orientation = 'horizontal',
  spacing = 'sm',
  ...props 
}: ButtonGroupProps) {
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  }

  const spacingClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }

  return (
    <div
      className={cn(
        'flex items-center',
        orientationClasses[orientation],
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Portuguese Community Action Buttons with cultural context

export function JoinEventButton({ 
  eventName, 
  className,
  ...props 
}: { eventName?: string } & ButtonProps) {
  return (
    <CulturalButton
      nation="lusophone"
      size="lg"
      className={cn('font-semibold', className)}
      {...props}
    >
      🎉 Participar{eventName && ` em ${eventName}`}
    </CulturalButton>
  )
}

export function ContactBusinessButton({ 
  businessName,
  className,
  ...props 
}: { businessName?: string } & ButtonProps) {
  return (
    <ModernButton
      variant="primary"
      size="md"
      className={cn('font-medium', className)}
      {...props}
    >
      💬 Contactar{businessName && ` ${businessName}`}
    </ModernButton>
  )
}

export function ConnectMemberButton({ 
  memberName,
  className,
  ...props 
}: { memberName?: string } & ButtonProps) {
  return (
    <ModernButton
      variant="outline"
      size="md"
      className={cn('font-medium', className)}
      {...props}
    >
      🤝 Conectar{memberName && ` com ${memberName}`}
    </ModernButton>
  )
}

export function SubscribeButton({ 
  tier = 'Premium',
  className,
  ...props 
}: { tier?: string } & ButtonProps) {
  return (
    <CulturalButton
      nation="lusophone"
      size="xl"
      fullWidth
      className={cn('font-bold text-lg', className)}
      {...props}
    >
      ⭐ Subscrever {tier}
    </CulturalButton>
  )
}

// Export all button components
export {
  ModernButton as LusoModernButton,
  CulturalButton as LusoCulturalButton,
  CTAButton as LusoCTAButton,
  IconButton as LusoIconButton,
  ButtonGroup as LusoButtonGroup,
  JoinEventButton as LusoJoinEventButton,
  ContactBusinessButton as LusoContactBusinessButton,
  ConnectMemberButton as LusoConnectMemberButton,
  SubscribeButton as LusoSubscribeButton
}