'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// Modern Typography System for Portuguese-speaking Community Platform

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  variant?: 
    | 'display-large' 
    | 'display' 
    | 'display-small'
    | 'heading-1'
    | 'heading-2'
    | 'heading-3'
    | 'heading-4'
    | 'body-large'
    | 'body'
    | 'body-small'
    | 'caption'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'white' | 'portuguese' | 'cultural'
  align?: 'left' | 'center' | 'right'
  portuguese?: boolean
  responsive?: boolean
}

const typographyVariants = {
  'display-large': 'text-display-large font-display',
  'display': 'text-display font-display',
  'display-small': 'text-display-small font-display',
  'heading-1': 'text-heading-1 font-display md:text-display-small',
  'heading-2': 'text-heading-2 font-display md:text-heading-1',
  'heading-3': 'text-heading-3 font-display md:text-heading-2',
  'heading-4': 'text-heading-4 font-display md:text-heading-3',
  'body-large': 'text-body-large font-sans',
  'body': 'text-body font-sans',
  'body-small': 'text-body-small font-sans',
  'caption': 'text-caption font-sans uppercase tracking-wide'
}

const responsiveVariants = {
  'display-large': 'text-mobile-display md:text-display lg:text-display-large',
  'display': 'text-mobile-display md:text-display-small lg:text-display',
  'display-small': 'text-mobile-heading md:text-heading-1 lg:text-display-small',
  'heading-1': 'text-mobile-heading md:text-heading-1',
  'heading-2': 'text-mobile-heading md:text-heading-2',
  'heading-3': 'text-mobile-body md:text-heading-3',
  'heading-4': 'text-mobile-body md:text-heading-4',
  'body-large': 'text-mobile-body md:text-body-large',
  'body': 'text-mobile-body md:text-body',
  'body-small': 'text-mobile-body md:text-body-small',
  'caption': 'text-caption'
}

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
}

const colorClasses = {
  primary: 'text-primary-900',
  secondary: 'text-secondary-700',
  accent: 'text-accent-600',
  muted: 'text-neutral-600',
  white: 'text-white',
  portuguese: 'bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent',
  cultural: 'bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent'
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}

export function Typography({
  children,
  className,
  as = 'div',
  variant = 'body',
  weight,
  color = 'primary',
  align = 'left',
  portuguese = false,
  responsive = true,
  ...props
}: TypographyProps) {
  const Component = as as keyof JSX.IntrinsicElements

  const variantClasses = responsive 
    ? responsiveVariants[variant] 
    : typographyVariants[variant]

  const weightClass = weight ? weightClasses[weight] : ''
  const colorClass = colorClasses[color]
  const alignClass = alignClasses[align]
  const portugueseClass = portuguese ? 'break-words hyphens-auto' : ''

  return (
    <Component
      className={cn(
        variantClasses,
        weightClass,
        colorClass,
        alignClass,
        portugueseClass,
        'transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

// Specialized Typography Components for Portuguese-speaking Community

export function DisplayHeading({ 
  children, 
  className, 
  size = 'large',
  cultural = true,
  ...props 
}: {
  children: React.ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large'
  cultural?: boolean
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const sizeVariants = {
    small: 'display-small' as const,
    medium: 'display' as const,
    large: 'display-large' as const
  }

  return (
    <Typography
      as="h1"
      variant={sizeVariants[size]}
      color={cultural ? 'portuguese' : 'primary'}
      weight="extrabold"
      className={cn('mb-6 leading-tight', className)}
      portuguese
      {...props}
    >
      {children}
    </Typography>
  )
}

export function SectionHeading({ 
  children, 
  className, 
  level = 2,
  accent = false,
  ...props 
}: {
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4
  accent?: boolean
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const levelMap = {
    1: { as: 'h1' as const, variant: 'heading-1' as const },
    2: { as: 'h2' as const, variant: 'heading-2' as const },
    3: { as: 'h3' as const, variant: 'heading-3' as const },
    4: { as: 'h4' as const, variant: 'heading-4' as const }
  }

  const { as, variant } = levelMap[level]

  return (
    <Typography
      as={as}
      variant={variant}
      color={accent ? 'cultural' : 'primary'}
      weight="bold"
      className={cn('mb-4', className)}
      portuguese
      {...props}
    >
      {children}
    </Typography>
  )
}

export function BodyText({ 
  children, 
  className, 
  size = 'body',
  muted = false,
  ...props 
}: {
  children: React.ReactNode
  className?: string
  size?: 'small' | 'body' | 'large'
  muted?: boolean
} & React.HTMLAttributes<HTMLParagraphElement>) {
  const sizeVariants = {
    small: 'body-small' as const,
    body: 'body' as const,
    large: 'body-large' as const
  }

  return (
    <Typography
      as="p"
      variant={sizeVariants[size]}
      color={muted ? 'muted' : 'primary'}
      className={cn('mb-4', className)}
      portuguese
      {...props}
    >
      {children}
    </Typography>
  )
}

export function CulturalLabel({ 
  children, 
  className,
  nation,
  ...props 
}: {
  children: React.ReactNode
  className?: string
  nation?: 'portugal' | 'brazil' | 'angola' | 'cape-verde' | 'mozambique' | 'guinea-bissau' | 'sao-tome' | 'timor'
} & React.HTMLAttributes<HTMLSpanElement>) {
  const nationColors = {
    portugal: 'bg-red-600 text-white',
    brazil: 'bg-green-500 text-white',
    angola: 'bg-yellow-500 text-black',
    'cape-verde': 'bg-blue-600 text-white',
    mozambique: 'bg-green-600 text-white',
    'guinea-bissau': 'bg-red-500 text-white',
    'sao-tome': 'bg-green-500 text-white',
    timor: 'bg-red-600 text-white'
  }

  const bgColor = nation ? nationColors[nation] : 'bg-primary-600 text-white'

  return (
    <Typography
      as="span"
      variant="caption"
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        bgColor,
        className
      )}
      {...props}
    >
      {children}
    </Typography>
  )
}

export function CommunityQuote({ 
  children, 
  author,
  nation,
  className,
  ...props 
}: {
  children: React.ReactNode
  author?: string
  nation?: string
  className?: string
} & React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        'border-l-4 border-secondary-400 pl-6 my-6 italic',
        className
      )}
      {...props}
    >
      <Typography
        variant="body-large"
        color="muted"
        className="mb-2"
        portuguese
      >
        "{children}"
      </Typography>
      {(author || nation) && (
        <footer className="text-sm">
          <Typography
            variant="body-small"
            weight="medium"
            color="secondary"
          >
            {author && `— ${author}`}
            {author && nation && ', '}
            {nation}
          </Typography>
        </footer>
      )}
    </blockquote>
  )
}

// Export individual typography components for backwards compatibility
export { DisplayHeading as LusoDisplayHeading }
export { SectionHeading as LusoSectionHeading }
export { BodyText as LusoBodyText }
export { CulturalLabel as LusoCulturalLabel }
export { CommunityQuote as LusoCommunityQuote }