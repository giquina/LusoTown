'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'portuguese' | 'premium' | 'luxury'
  className?: string
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

export function LoadingSpinner({
  size = 'md',
  variant = 'primary',
  className = ''
}: LoadingSpinnerProps) {
  const variants = {
    primary: 'border-primary-200 border-t-primary-600',
    portuguese: 'border-red-200 border-t-red-600',
    premium: 'border-premium-200 border-t-premium-600',
    luxury: 'border-gray-200 border-t-gray-800'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2',
        spinnerSizes[size],
        variants[variant],
        className
      )}
    />
  )
}

interface PortugueseFlagLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PortugueseFlagLoader({
  size = 'md',
  className = ''
}: PortugueseFlagLoaderProps) {
  const sizes = {
    sm: 'w-8 h-6',
    md: 'w-16 h-12',
    lg: 'w-24 h-18'
  }

  return (
    <div className={cn('relative', sizes[size], className)}>
      {/* Green section */}
      <motion.div 
        className="absolute left-0 top-0 w-1/3 h-full bg-green-600"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0 }}
      />
      
      {/* Red section */}
      <motion.div 
        className="absolute right-0 top-0 w-2/3 h-full bg-red-600"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      {/* Coat of arms placeholder */}
      <motion.div 
        className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
    </div>
  )
}

interface PulsingDotsProps {
  variant?: 'primary' | 'portuguese' | 'premium'
  className?: string
}

export function PulsingDots({
  variant = 'primary',
  className = ''
}: PulsingDotsProps) {
  const variants = {
    primary: 'bg-primary-600',
    portuguese: 'bg-red-600',
    premium: 'bg-premium-600'
  }

  return (
    <div className={cn('flex space-x-2', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('w-3 h-3 rounded-full', variants[variant])}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  )
}

interface WaveLoaderProps {
  variant?: 'primary' | 'portuguese' | 'ocean'
  className?: string
}

export function WaveLoader({
  variant = 'primary',
  className = ''
}: WaveLoaderProps) {
  const variants = {
    primary: 'bg-primary-600',
    portuguese: 'bg-gradient-to-r from-red-600 to-green-600',
    ocean: 'bg-gradient-to-r from-blue-600 to-teal-600'
  }

  return (
    <div className={cn('flex items-end space-x-1', className)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={cn('w-2 rounded-full', variants[variant])}
          animate={{
            height: [20, 40, 20],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  )
}

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'avatar' | 'image'
  lines?: number
}

export function Skeleton({
  className = '',
  variant = 'text',
  lines = 1
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'
  
  const variants = {
    text: 'h-4 rounded',
    card: 'h-48 rounded-xl',
    avatar: 'w-12 h-12 rounded-full',
    image: 'h-64 rounded-lg'
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants.text,
              index === lines - 1 ? 'w-3/4' : 'w-full',
              className
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
    />
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  variant?: 'default' | 'blur' | 'premium'
  message?: string
}

export function LoadingOverlay({
  isLoading,
  children,
  variant = 'default',
  message = 'Loading...'
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>

  const overlayVariants = {
    default: 'bg-white/80',
    blur: 'bg-white/40 backdrop-blur-sm',
    premium: 'bg-gradient-to-br from-white/80 via-primary-50/50 to-white/80 backdrop-blur-md'
  }

  return (
    <div className="relative">
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'absolute inset-0 z-50 flex flex-col items-center justify-center',
          overlayVariants[variant]
        )}
      >
        <div className="text-center">
          <div className="mb-4">
            {variant === 'premium' ? (
              <PortugueseFlagLoader size="lg" />
            ) : (
              <LoadingSpinner size="lg" variant="primary" />
            )}
          </div>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </motion.div>
    </div>
  )
}

interface ProgressBarProps {
  progress: number
  variant?: 'primary' | 'portuguese' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({
  progress,
  variant = 'primary',
  size = 'md',
  showPercentage = false,
  className = ''
}: ProgressBarProps) {
  const variants = {
    primary: 'bg-primary-600',
    portuguese: 'bg-gradient-to-r from-red-600 to-green-600',
    premium: 'bg-gradient-to-r from-premium-600 to-premium-800'
  }

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  return (
    <div className={cn('w-full', className)}>
      {showPercentage && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full', sizes[size])}>
        <motion.div
          className={cn('rounded-full', sizes[size], variants[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

interface CircularProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  variant?: 'primary' | 'portuguese' | 'premium'
  showPercentage?: boolean
  className?: string
}

export function CircularProgress({
  progress,
  size = 100,
  strokeWidth = 8,
  variant = 'primary',
  showPercentage = true,
  className = ''
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (Math.min(Math.max(progress, 0), 100) / 100) * circumference

  const variants = {
    primary: 'stroke-primary-600',
    portuguese: 'stroke-red-600',
    premium: 'stroke-premium-600'
  }

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={variants[variant]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  )
}