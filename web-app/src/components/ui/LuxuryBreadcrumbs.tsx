'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  current?: boolean
}

interface LuxuryBreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  variant?: 'default' | 'luxury' | 'portuguese' | 'elite' | 'heritage' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  separator?: 'chevron' | 'slash' | 'dot' | 'arrow'
  showHome?: boolean
  homeLabel?: string
  homeHref?: string
  glass?: boolean
  animate?: boolean
}

const variantClasses = {
  default: {
    container: 'bg-white border border-gray-200',
    item: 'text-gray-600 hover:text-gray-900',
    current: 'text-gray-900 font-semibold',
    separator: 'text-gray-400'
  },
  luxury: {
    container: 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 shadow-lg',
    item: 'text-amber-700 hover:text-amber-900 transition-colors duration-200',
    current: 'text-amber-900 font-bold',
    separator: 'text-amber-400'
  },
  portuguese: {
    container: 'bg-gradient-to-r from-red-50 via-amber-50 to-green-50 border border-red-200 shadow-lg',
    item: 'text-red-700 hover:text-red-900 transition-colors duration-200',
    current: 'text-red-900 font-bold',
    separator: 'text-amber-500'
  },
  elite: {
    container: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl',
    item: 'text-amber-300 hover:text-amber-100 transition-colors duration-200',
    current: 'text-white font-bold',
    separator: 'text-amber-500'
  },
  heritage: {
    container: 'bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border border-amber-200 shadow-lg',
    item: 'text-amber-800 hover:text-amber-900 transition-colors duration-200',
    current: 'text-amber-900 font-bold',
    separator: 'text-amber-500'
  },
  minimal: {
    container: 'bg-transparent',
    item: 'text-gray-500 hover:text-gray-700',
    current: 'text-gray-900 font-medium',
    separator: 'text-gray-300'
  }
}

const sizeClasses = {
  sm: {
    container: 'px-3 py-2',
    text: 'text-sm',
    icon: 'w-4 h-4',
    separator: 'w-3 h-3'
  },
  md: {
    container: 'px-4 py-3',
    text: 'text-base',
    icon: 'w-5 h-5',
    separator: 'w-4 h-4'
  },
  lg: {
    container: 'px-6 py-4',
    text: 'text-lg',
    icon: 'w-6 h-6',
    separator: 'w-5 h-5'
  }
}

const separatorIcons = {
  chevron: ChevronRightIcon,
  slash: () => <span>/</span>,
  dot: () => <span>•</span>,
  arrow: () => <span>→</span>
}

export default function LuxuryBreadcrumbs({
  items,
  className = '',
  variant = 'default',
  size = 'md',
  separator = 'chevron',
  showHome = true,
  homeLabel,
  homeHref = '/',
  glass = false,
  animate = true
}: LuxuryBreadcrumbsProps) {
  const { t } = useLanguage()
  const SeparatorIcon = separatorIcons[separator]

  // Add home item if requested
  const allItems = showHome ? [
    {
      label: homeLabel || t('navigation.home') || 'Home',
      href: homeHref,
      icon: <HomeIcon className={cn(sizeClasses[size].icon)} />
    },
    ...items
  ] : items

  const containerClasses = cn(
    'flex items-center space-x-2 rounded-xl font-medium',
    sizeClasses[size].container,
    sizeClasses[size].text,
    glass ? 'backdrop-blur-lg bg-white/20 border border-white/30' : variantClasses[variant].container,
    className
  )

  const breadcrumbItems = allItems.map((item, index) => {
    const isLast = index === allItems.length - 1
    const itemClasses = cn(
      'flex items-center space-x-1 transition-all duration-200',
      glass 
        ? isLast 
          ? 'text-white font-semibold' 
          : 'text-white/80 hover:text-white'
        : isLast 
          ? variantClasses[variant].current 
          : variantClasses[variant].item,
      !isLast && 'hover:scale-105'
    )

    const content = (
      <>
        {item.icon && (
          <span className="flex-shrink-0">
            {item.icon}
          </span>
        )}
        <span className="truncate max-w-[150px] sm:max-w-none">
          {item.label}
        </span>
      </>
    )

    return (
      <React.Fragment key={index}>
        {animate ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-2"
          >
            {item.href && !isLast ? (
              <Link href={item.href} className={itemClasses}>
                {content}
              </Link>
            ) : (
              <span className={itemClasses}>
                {content}
              </span>
            )}
          </motion.div>
        ) : (
          <div className="flex items-center space-x-2">
            {item.href && !isLast ? (
              <Link href={item.href} className={itemClasses}>
                {content}
              </Link>
            ) : (
              <span className={itemClasses}>
                {content}
              </span>
            )}
          </div>
        )}
        
        {!isLast && (
          <div className={cn(
            'flex-shrink-0',
            glass ? 'text-white/60' : variantClasses[variant].separator
          )}>
            {typeof SeparatorIcon === 'function' && SeparatorIcon.name ? (
              <SeparatorIcon className={sizeClasses[size].separator} />
            ) : (
              <SeparatorIcon />
            )}
          </div>
        )}
      </React.Fragment>
    )
  })

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <motion.ol
        className={containerClasses}
        initial={animate ? { opacity: 0, y: -10 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={animate ? { duration: 0.4 } : undefined}
      >
        {/* Elite variant decorative elements */}
        {variant === 'elite' && (
          <div className="absolute inset-0 rounded-xl">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
          </div>
        )}
        
        {/* Lusophone pattern overlay */}
        {variant === 'portuguese' && (
          <div className="absolute inset-0 opacity-10 rounded-xl overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='azulejo' x='0' y='0' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Crect width='10' height='10' fill='none'/%3E%3Ccircle cx='5' cy='5' r='1.5' fill='rgba(220,20,60,0.3)'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23azulejo)'/%3E%3C/svg%3E")`
            }} />
          </div>
        )}
        
        <div className="flex items-center space-x-2 relative z-10">
          {breadcrumbItems}
        </div>
      </motion.ol>
    </nav>
  )
}

// Specialized breadcrumb components
export function EliteBreadcrumbs({ children, ...props }: Omit<LuxuryBreadcrumbsProps, 'variant'>) {
  return (
    <LuxuryBreadcrumbs
      variant="elite"
      size="lg"
      animate={true}
      {...props}
    />
  )
}

export function PortugueseBreadcrumbs({ children, ...props }: Omit<LuxuryBreadcrumbsProps, 'variant'>) {
  return (
    <LuxuryBreadcrumbs
      variant="portuguese"
      separator="dot"
      animate={true}
      {...props}
    />
  )
}

export function HeritageBreadcrumbs({ children, ...props }: Omit<LuxuryBreadcrumbsProps, 'variant'>) {
  return (
    <LuxuryBreadcrumbs
      variant="heritage"
      separator="arrow"
      animate={true}
      {...props}
    />
  )
}

export function GlassBreadcrumbs({ children, ...props }: Omit<LuxuryBreadcrumbsProps, 'variant' | 'glass'>) {
  return (
    <LuxuryBreadcrumbs
      glass={true}
      variant="default"
      animate={true}
      {...props}
    />
  )
}