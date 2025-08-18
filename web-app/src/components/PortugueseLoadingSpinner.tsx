'use client'

import { motion } from 'framer-motion'

interface PortugueseLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  theme?: 'default' | 'streaming' | 'cultural'
}

export default function PortugueseLoadingSpinner({ 
  size = 'md', 
  text,
  theme = 'default'
}: PortugueseLoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return { spinner: 'w-4 h-4', text: 'text-xs' }
      case 'md': return { spinner: 'w-6 h-6', text: 'text-sm' }
      case 'lg': return { spinner: 'w-8 h-8', text: 'text-base' }
      default: return { spinner: 'w-6 h-6', text: 'text-sm' }
    }
  }

  const getThemeConfig = () => {
    switch (theme) {
      case 'streaming':
        return {
          gradient: 'from-red-500 via-primary-500 to-secondary-500',
          dots: ['🔴', '🎥', '🎵']
        }
      case 'cultural':
        return {
          gradient: 'from-green-500 via-red-500 to-yellow-500', // Portuguese flag colors
          dots: ['🇵🇹', '🎭', '🎶']
        }
      default:
        return {
          gradient: 'from-primary-500 via-secondary-500 to-accent-500',
          dots: ['•', '•', '•']
        }
    }
  }

  const sizes = getSizeClasses()
  const config = getThemeConfig()

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Portuguese Flag-inspired Spinner */}
      <div className="relative">
        <motion.div
          className={`${sizes.spinner} border-2 border-transparent bg-gradient-to-r ${config.gradient} rounded-full`}
          style={{
            background: `conic-gradient(from 0deg, #059669, #DC2626, #EAB308, #059669)`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute inset-1 bg-white rounded-full`}
          animate={{ scale: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated Dots */}
      <div className="flex items-center gap-1">
        {config.dots.map((dot, index) => (
          <motion.span
            key={index}
            className={`${sizes.text} select-none`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.2, 
              repeat: Infinity, 
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          >
            {dot}
          </motion.span>
        ))}
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p 
          className={`${sizes.text} text-gray-600 text-center max-w-xs`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Portuguese Pulse Animation
export function PortuguesePulse({ 
  children, 
  color = 'primary',
  intensity = 'soft' 
}: { 
  children: React.ReactNode
  color?: 'primary' | 'secondary' | 'flag' | 'cultural'
  intensity?: 'soft' | 'medium' | 'strong'
}) {
  const getColorConfig = () => {
    switch (color) {
      case 'flag':
        return 'shadow-green-500/20 border-green-500/30'
      case 'cultural':
        return 'shadow-red-500/20 border-red-500/30'
      case 'secondary':
        return 'shadow-secondary-500/20 border-secondary-500/30'
      default:
        return 'shadow-primary-500/20 border-primary-500/30'
    }
  }

  const getScale = () => {
    switch (intensity) {
      case 'soft': return [1, 1.02, 1]
      case 'medium': return [1, 1.05, 1]
      case 'strong': return [1, 1.08, 1]
      default: return [1, 1.02, 1]
    }
  }

  return (
    <motion.div
      animate={{ 
        scale: getScale(),
        boxShadow: [
          `0 0 0 0 ${color === 'flag' ? 'rgb(34 197 94 / 0.7)' : 'rgb(99 102 241 / 0.7)'}`,
          `0 0 0 4px ${color === 'flag' ? 'rgb(34 197 94 / 0.3)' : 'rgb(99 102 241 / 0.3)'}`,
          `0 0 0 0 ${color === 'flag' ? 'rgb(34 197 94 / 0)' : 'rgb(99 102 241 / 0)'}`
        ]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`rounded-xl border ${getColorConfig()}`}
    >
      {children}
    </motion.div>
  )
}

// Portuguese Success Animation
export function PortugueseSuccess({ 
  message,
  onComplete 
}: { 
  message: string
  onComplete?: () => void 
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onAnimationComplete={onComplete}
      className="flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="bg-green-100 p-4 rounded-full mb-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-4xl"
        >
          🇵🇹
        </motion.div>
      </motion.div>
      
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg font-semibold text-green-700 mb-2 text-center"
      >
        {message}
      </motion.h3>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="h-1 bg-gradient-to-r from-green-500 to-red-500 rounded-full max-w-xs"
      />
    </motion.div>
  )
}