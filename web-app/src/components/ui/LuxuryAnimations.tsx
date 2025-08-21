'use client'

import React from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = ''
}: FadeInProps) {
  const directionVariants = {
    up: { y: distance, opacity: 0 },
    down: { y: -distance, opacity: 0 },
    left: { x: distance, opacity: 0 },
    right: { x: -distance, opacity: 0 },
    none: { opacity: 0 }
  }

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  stagger?: number
  className?: string
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  className = ''
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({
  children,
  className = ''
}: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  scale?: number
  className?: string
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.95,
  className = ''
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ scale, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  className?: string
}

export function FloatingElement({
  children,
  amplitude = 10,
  duration = 3,
  className = ''
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface HoverLiftProps {
  children: React.ReactNode
  lift?: number
  scale?: number
  className?: string
}

export function HoverLift({
  children,
  lift = 8,
  scale = 1.02,
  className = ''
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{
        y: -lift,
        scale,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PortugueseWaveProps {
  className?: string
  variant?: 'red' | 'green' | 'heritage'
}

export function PortugueseWave({
  className = '',
  variant = 'heritage'
}: PortugueseWaveProps) {
  const variants = {
    red: 'from-red-500 to-red-700',
    green: 'from-green-500 to-green-700',
    heritage: 'from-red-500 via-yellow-500 to-green-500'
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-r opacity-20',
          variants[variant]
        )}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          clipPath: 'polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)'
        }}
      />
    </div>
  )
}

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  cursor?: boolean
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  cursor = true
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState('')
  const [showCursor, setShowCursor] = React.useState(cursor)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1))
        index++
        if (index === text.length) {
          clearInterval(interval)
          if (cursor) {
            setTimeout(() => setShowCursor(false), 1000)
          }
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, speed, cursor])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}: CountUpProps) {
  const [count, setCount] = React.useState(start)

  React.useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (endTime - startTime), 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      const currentCount = start + (end - start) * easeProgress
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [start, end, duration])

  return (
    <span className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

interface ParticleFieldProps {
  particleCount?: number
  className?: string
  variant?: 'portuguese' | 'luxury' | 'heritage'
}

export function ParticleField({
  particleCount = 20,
  className = '',
  variant = 'heritage'
}: ParticleFieldProps) {
  const variants = {
    portuguese: ['bg-red-500', 'bg-green-500', 'bg-yellow-500'],
    luxury: ['bg-purple-500', 'bg-blue-500', 'bg-indigo-500'],
    heritage: ['bg-primary-500', 'bg-secondary-500', 'bg-coral-500']
  }

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    color: variants[variant][i % variants[variant].length],
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10
  }))

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={cn('absolute rounded-full opacity-30', particle.color)}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

interface GradientShiftProps {
  children: React.ReactNode
  colors?: string[]
  duration?: number
  className?: string
}

export function GradientShift({
  children,
  colors = ['from-primary-500', 'from-secondary-500', 'from-coral-500'],
  duration = 4,
  className = ''
}: GradientShiftProps) {
  const [currentColor, setCurrentColor] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length)
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [colors.length, duration])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-r to-transparent opacity-20',
          colors[currentColor]
        )}
        key={currentColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({
  children,
  className = ''
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}