'use client'

// LusoTown Premium Page Layout
// Sophisticated page structure with elite navigation for affluent Portuguese speakers
// Includes premium breadcrumbs, smart navigation, and accessibility features

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import PremiumBreadcrumb, { BreadcrumbItem } from '@/components/PremiumBreadcrumb'
import { InlineSmartNavigation } from '@/components/SmartNavigation'
import { useNavigation } from '@/context/NavigationContext'
import { useLanguage } from '@/context/LanguageContext'

interface PremiumPageLayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  title?: string
  subtitle?: string
  description?: string
  showSmartNavigation?: boolean
  variant?: 'default' | 'luxury' | 'minimal'
  backgroundPattern?: 'none' | 'subtle' | 'elegant'
  className?: string
  headerActions?: React.ReactNode
}

function PremiumPageLayout({
  children,
  breadcrumbs,
  title,
  subtitle,
  description,
  showSmartNavigation = true,
  variant = 'luxury',
  backgroundPattern = 'elegant',
  className = '',
  headerActions
}: PremiumPageLayoutProps) {
  const { updateBreadcrumbs, getBreadcrumbsForPath, state } = useNavigation()
  const { t } = useLanguage()

  // Update breadcrumbs when component mounts or breadcrumbs prop changes
  useEffect(() => {
    const crumbs = breadcrumbs || getBreadcrumbsForPath(state.currentPath)
    updateBreadcrumbs(crumbs)
  }, [breadcrumbs, state.currentPath, updateBreadcrumbs, getBreadcrumbsForPath])

  const getBackgroundPattern = () => {
    switch (backgroundPattern) {
      case 'subtle':
        return 'bg-gradient-to-br from-gray-50 to-white'
      case 'elegant':
        return 'bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30'
      default:
        return 'bg-white'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }

  return (
    <motion.div
      className={`min-h-screen ${getBackgroundPattern()} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium background effects */}
      {backgroundPattern === 'elegant' && (
        <>
          <div className="absolute inset-0 bg-[url('/patterns/portuguese-tile.svg')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"></div>
        </>
      )}

      {/* Navigation Header */}
      <motion.div
        className="relative pt-20 lg:pt-24 pb-8"
        variants={itemVariants}
      >
        <div className="container-width">
          {/* Premium Breadcrumb Navigation */}
          <motion.div
            className="mb-6"
            variants={itemVariants}
          >
            <PremiumBreadcrumb
              items={breadcrumbs || getBreadcrumbsForPath(state.currentPath)}
              variant={variant === 'minimal' ? 'minimal' : 'luxury'}
              className="mb-4"
            />
          </motion.div>

          {/* Page Header */}
          {(title || subtitle || description) && (
            <motion.div
              className="relative"
              variants={itemVariants}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div className="flex-1">
                  {title && (
                    <motion.h1
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {title}
                      {variant === 'luxury' && (
                        <motion.div
                          className="mt-2 h-1 w-20 bg-gradient-to-r from-premium-400 via-secondary-400 to-action-400 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.8, duration: 0.8 }}
                        />
                      )}
                    </motion.h1>
                  )}
                  
                  {subtitle && (
                    <motion.p
                      className="text-lg sm:text-xl text-premium-600 font-medium mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {subtitle}
                    </motion.p>
                  )}
                  
                  {description && (
                    <motion.p
                      className="text-gray-600 text-lg leading-relaxed max-w-3xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      {description}
                    </motion.p>
                  )}
                </div>

                {/* Header Actions */}
                {headerActions && (
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    {headerActions}
                  </motion.div>
                )}
              </div>

              {/* Smart Navigation Suggestions */}
              {showSmartNavigation && (
                <motion.div
                  variants={itemVariants}
                  className="mb-8"
                >
                  <InlineSmartNavigation maxSuggestions={4} />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.main
        className="relative flex-1"
        variants={itemVariants}
      >
        <div className="container-width">
          {children}
        </div>
      </motion.main>

      {/* Premium Footer Spacer */}
      <div className="h-20"></div>
    </motion.div>
  )
}

// Export both default and named export
export default PremiumPageLayout
export { PremiumPageLayout }

// Specialized layout variants
export function LuxuryPageLayout(props: Omit<PremiumPageLayoutProps, 'variant'>) {
  return <PremiumPageLayout {...props} variant="luxury" />
}

export function MinimalPageLayout(props: Omit<PremiumPageLayoutProps, 'variant'>) {
  return <PremiumPageLayout {...props} variant="minimal" backgroundPattern="subtle" />
}

export function ElegantPageLayout(props: Omit<PremiumPageLayoutProps, 'variant'>) {
  return <PremiumPageLayout {...props} variant="luxury" backgroundPattern="elegant" />
}

// Content section components for consistent layout
export function PremiumSection({ 
  children, 
  className = '', 
  background = 'white',
  padding = 'default'
}: {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'gray' | 'primary' | 'transparent'
  padding?: 'none' | 'small' | 'default' | 'large'
}) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    transparent: 'bg-transparent'
  }

  const paddingClasses = {
    none: '',
    small: 'py-8',
    default: 'py-12 sm:py-16',
    large: 'py-16 sm:py-20'
  }

  return (
    <motion.section
      className={`${bgClasses[background]} ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className="container-width">
        {children}
      </div>
    </motion.section>
  )
}

export function PremiumCard({ 
  children, 
  className = '',
  hover = true,
  gradient = false 
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}) {
  return (
    <motion.div
      className={`
        ${gradient 
          ? 'bg-gradient-to-br from-white to-primary-50/50' 
          : 'bg-white'
        }
        rounded-2xl border border-gray-200/60 shadow-lg
        ${hover ? 'hover:shadow-xl hover:border-primary-200/60' : ''}
        transition-all duration-300 ${className}
      `}
      whileHover={hover ? { y: -2, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  )
}