'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// Modern Card System for Portuguese-speaking Community Platform

interface BaseCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  elevation?: 'none' | 'low' | 'medium' | 'high' | 'premium'
  padding?: 'none' | 'small' | 'medium' | 'large' | 'xl'
  radius?: 'none' | 'small' | 'medium' | 'large'
  interactive?: boolean
  cultural?: boolean
  nation?: 'portugal' | 'brazil' | 'angola' | 'cape-verde' | 'mozambique' | 'guinea-bissau' | 'sao-tome' | 'timor'
}

const elevationClasses = {
  none: '',
  low: 'shadow-card',
  medium: 'shadow-card-hover',
  high: 'shadow-elevated',
  premium: 'shadow-premium shadow-cultural'
}

const paddingClasses = {
  none: '',
  small: 'p-4',
  medium: 'p-6', // 24px minimum for modern design
  large: 'p-8',
  xl: 'p-10'
}

const radiusClasses = {
  none: '',
  small: 'rounded-lg',
  medium: 'rounded-card', // 12px standard
  large: 'rounded-card-lg' // 16px for larger cards
}

const nationalThemes = {
  portugal: 'border-l-4 border-red-500 bg-gradient-to-r from-red-50/30 to-green-50/30',
  brazil: 'border-l-4 border-green-500 bg-gradient-to-r from-green-50/30 to-yellow-50/30',
  angola: 'border-l-4 border-yellow-600 bg-gradient-to-r from-yellow-50/30 to-red-50/30',
  'cape-verde': 'border-l-4 border-blue-600 bg-gradient-to-r from-blue-50/30 to-white/50',
  mozambique: 'border-l-4 border-green-600 bg-gradient-to-r from-green-50/30 to-blue-50/30',
  'guinea-bissau': 'border-l-4 border-red-500 bg-gradient-to-r from-red-50/30 to-yellow-50/30',
  'sao-tome': 'border-l-4 border-green-500 bg-gradient-to-r from-green-50/30 to-red-50/30',
  timor: 'border-l-4 border-red-600 bg-gradient-to-r from-red-50/30 to-black/5'
}

export function ModernCard({
  children,
  className,
  elevation = 'medium',
  padding = 'medium',
  radius = 'medium',
  interactive = false,
  cultural = false,
  nation,
  ...props
}: BaseCardProps) {
  const elevationClass = elevationClasses[elevation]
  const paddingClass = paddingClasses[padding]
  const radiusClass = radiusClasses[radius]
  const nationalTheme = nation ? nationalThemes[nation] : ''
  
  const interactiveClasses = interactive 
    ? 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.02] cursor-pointer' 
    : 'transition-shadow duration-300'

  const culturalClasses = cultural && !nation
    ? 'bg-gradient-to-br from-primary-50/50 via-secondary-50/50 to-accent-50/50 border border-primary-200/50'
    : 'bg-white border border-neutral-200/50'

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        elevationClass,
        paddingClass,
        radiusClass,
        interactiveClasses,
        culturalClasses,
        nationalTheme,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  border?: boolean
}

export function CardHeader({ children, className, border = false, ...props }: CardHeaderProps) {
  return (
    <div 
      className={cn(
        'flex flex-col space-y-2',
        border && 'pb-4 border-b border-neutral-200',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  className?: string
  level?: 2 | 3 | 4
  gradient?: boolean
}

export function CardTitle({ 
  children, 
  className, 
  level = 3,
  gradient = false,
  ...props 
}: CardTitleProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent'
    : 'text-primary-900'

  const sizeClasses = {
    2: 'text-heading-2 font-bold',
    3: 'text-heading-3 font-semibold',
    4: 'text-heading-4 font-medium'
  }

  return (
    <HeadingTag
      className={cn(
        sizeClasses[level],
        gradientClass,
        'leading-tight',
        className
      )}
      {...props}
    >
      {children}
    </HeadingTag>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
  muted?: boolean
}

export function CardDescription({ 
  children, 
  className, 
  muted = true,
  ...props 
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        'text-body leading-relaxed',
        muted ? 'text-neutral-600' : 'text-primary-900',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  border?: boolean
  justify?: 'start' | 'center' | 'end' | 'between'
}

export function CardFooter({ 
  children, 
  className, 
  border = false,
  justify = 'start',
  ...props 
}: CardFooterProps) {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4',
        justifyClasses[justify],
        border && 'pt-4 border-t border-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Specialized Card Components for LusoTown

interface EventCardProps extends BaseCardProps {
  title: string
  description: string
  date?: string
  location?: string
  attendees?: number
  image?: string
  featured?: boolean
}

export function EventCard({
  title,
  description,
  date,
  location,
  attendees,
  image,
  featured = false,
  className,
  nation,
  ...props
}: EventCardProps) {
  return (
    <ModernCard
      elevation={featured ? 'premium' : 'medium'}
      padding="large"
      radius="large"
      interactive
      cultural={!nation}
      nation={nation}
      className={cn('group', className)}
      {...props}
    >
      {image && (
        <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-card-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white rounded-full text-sm font-medium">
              Destaque
            </div>
          )}
        </div>
      )}

      <CardContent>
        <CardHeader>
          <CardTitle gradient={featured}>
            {title}
          </CardTitle>
          {(date || location) && (
            <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
              {date && (
                <span className="flex items-center gap-1">
                  📅 {date}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  📍 {location}
                </span>
              )}
            </div>
          )}
        </CardHeader>

        <CardDescription>
          {description}
        </CardDescription>

        {attendees && (
          <CardFooter justify="between">
            <span className="text-sm text-neutral-600">
              {attendees} participantes
            </span>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Ver detalhes →
            </button>
          </CardFooter>
        )}
      </CardContent>
    </ModernCard>
  )
}

interface BusinessCardProps extends BaseCardProps {
  name: string
  description: string
  category?: string
  rating?: number
  location?: string
  image?: string
  verified?: boolean
}

export function BusinessCard({
  name,
  description,
  category,
  rating,
  location,
  image,
  verified = false,
  className,
  nation,
  ...props
}: BusinessCardProps) {
  return (
    <ModernCard
      elevation="medium"
      padding="large"
      radius="medium"
      interactive
      cultural={!nation}
      nation={nation}
      className={cn('group', className)}
      {...props}
    >
      {image && (
        <div className="relative h-32 -mx-8 -mt-8 mb-4 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <CardContent>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle level={4} className="flex-1">
              {name}
              {verified && (
                <span className="ml-2 text-green-500" title="Verificado">✓</span>
              )}
            </CardTitle>
            {rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-medium">{rating}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {category && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                {category}
              </span>
            )}
          </div>
        </CardHeader>

        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>

        {location && (
          <CardFooter>
            <span className="text-sm text-neutral-600 flex items-center gap-1">
              📍 {location}
            </span>
          </CardFooter>
        )}
      </CardContent>
    </ModernCard>
  )
}

interface CommunityMemberCardProps extends BaseCardProps {
  name: string
  bio: string
  avatar?: string
  heritage?: string
  interests?: string[]
  verified?: boolean
}

export function CommunityMemberCard({
  name,
  bio,
  avatar,
  heritage,
  interests = [],
  verified = false,
  className,
  ...props
}: CommunityMemberCardProps) {
  return (
    <ModernCard
      elevation="medium"
      padding="large"
      radius="medium"
      interactive
      cultural
      className={cn('group text-center', className)}
      {...props}
    >
      <CardContent>
        <div className="flex flex-col items-center">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all duration-300"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-lg mb-4">
              {name.charAt(0)}
            </div>
          )}

          <CardHeader className="items-center">
            <CardTitle level={4} className="flex items-center gap-2">
              {name}
              {verified && (
                <span className="text-green-500" title="Membro Verificado">✓</span>
              )}
            </CardTitle>
            {heritage && (
              <span className="text-sm text-secondary-600 font-medium">
                {heritage}
              </span>
            )}
          </CardHeader>

          <CardDescription className="text-center line-clamp-2 mb-4">
            {bio}
          </CardDescription>

          {interests.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs"
                >
                  {interest}
                </span>
              ))}
              {interests.length > 3 && (
                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs">
                  +{interests.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </ModernCard>
  )
}

// Export all card components
export {
  ModernCard as LusoModernCard,
  CardContent as LusoCardContent,
  CardHeader as LusoCardHeader,
  CardTitle as LusoCardTitle,
  CardDescription as LusoCardDescription,
  CardFooter as LusoCardFooter,
  EventCard as LusoEventCard,
  BusinessCard as LusoBusinessCard,
  CommunityMemberCard as LusoCommunityMemberCard
}