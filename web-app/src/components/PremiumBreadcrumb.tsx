'use client'

// LusoTown Premium Breadcrumb Navigation
// Sophisticated visual hierarchy for affluent Portuguese speakers
// Luxury design with intelligent micro-interactions

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isActive?: boolean
  subtitle?: string
}

interface PremiumBreadcrumbProps {
  items: BreadcrumbItem[]
  variant?: 'default' | 'luxury' | 'minimal'
  showHome?: boolean
  className?: string
}

export default function PremiumBreadcrumb({ 
  items, 
  variant = 'luxury',
  showHome = true,
  className = '' 
}: PremiumBreadcrumbProps) {
  const { t } = useLanguage()

  const homeItem: BreadcrumbItem = {
    label: t('navigation.home', 'Home'),
    href: ROUTES.home,
    icon: <HomeIcon className="w-4 h-4" />
  }

  const allItems = showHome ? [homeItem, ...items] : items

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }

  if (variant === 'minimal') {
    return (
      <motion.nav 
        className={`flex items-center space-x-1 text-sm ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Breadcrumb"
      >
        {allItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center"
          >
            {index > 0 && (
              <ChevronRightIcon className="w-3 h-3 text-gray-400 mx-2" />
            )}
            {item.href && !item.isActive ? (
              <a
                href={item.href}
                className="text-gray-600 hover:text-premium-600 transition-colors duration-200 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className={`${item.isActive ? 'text-premium-600 font-medium' : 'text-gray-500'}`}>
                {item.label}
              </span>
            )}
          </motion.div>
        ))}
      </motion.nav>
    )
  }

  if (variant === 'luxury') {
    return (
      <motion.nav 
        className={`relative ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Luxury Navigation Breadcrumb"
      >
        {/* Elegant background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-primary-50/40 to-premium-50/60 backdrop-blur-sm rounded-2xl border border-primary-100/60 shadow-lg"></div>
        
        <div className="relative px-6 py-4">
          <div className="flex items-center space-x-2">
            {allItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center group"
              >
                {index > 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="mx-3"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-premium-400 group-hover:text-premium-600 transition-all duration-300" />
                  </motion.div>
                )}
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.href && !item.isActive ? (
                    <a
                      href={item.href}
                      className="group/link relative"
                    >
                      <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/60 hover:bg-white/90 border border-transparent hover:border-premium-200/50 shadow-sm hover:shadow-md transition-all duration-300">
                        {item.icon && (
                          <span className="text-premium-500 group-hover/link:text-premium-700 transition-colors duration-300">
                            {item.icon}
                          </span>
                        )}
                        <div>
                          <span className="text-gray-700 group-hover/link:text-premium-700 font-medium transition-colors duration-300">
                            {item.label}
                          </span>
                          {item.subtitle && (
                            <div className="text-xs text-gray-500 group-hover/link:text-premium-600 transition-colors duration-300">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Hover effect line */}
                      <motion.div
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-premium-400 to-secondary-400 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  ) : (
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-premium-100 to-secondary-50 border border-premium-200/50 shadow-md">
                      {item.icon && (
                        <span className="text-premium-600">
                          {item.icon}
                        </span>
                      )}
                      <div>
                        <span className="text-premium-800 font-semibold">
                          {item.label}
                        </span>
                        {item.subtitle && (
                          <div className="text-sm text-premium-600">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Elite progress indicator */}
          <motion.div
            className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-premium-400 via-secondary-400 to-action-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((allItems.findIndex(item => item.isActive) + 1) / allItems.length) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            />
          </motion.div>
        </div>
      </motion.nav>
    )
  }

  // Default variant - sophisticated but clean
  return (
    <motion.nav 
      className={`flex items-center space-x-2 py-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Navigation Breadcrumb"
    >
      {allItems.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="flex items-center"
        >
          {index > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="mx-2"
            >
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            </motion.div>
          )}
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.href && !item.isActive ? (
              <a
                href={item.href}
                className="group relative flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                {item.icon && (
                  <span className="text-primary-500 group-hover:text-primary-700 transition-colors duration-300">
                    {item.icon}
                  </span>
                )}
                <span className="text-gray-600 group-hover:text-primary-700 font-medium transition-colors duration-300">
                  {item.label}
                </span>
                {item.subtitle && (
                  <span className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors duration-300">
                    {item.subtitle}
                  </span>
                )}
              </a>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-100 border border-primary-200">
                {item.icon && (
                  <span className="text-primary-600">
                    {item.icon}
                  </span>
                )}
                <span className="text-primary-800 font-semibold">
                  {item.label}
                </span>
                {item.subtitle && (
                  <span className="text-sm text-primary-600">
                    {item.subtitle}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </motion.nav>
  )
}

// Helper hook for automatic breadcrumb generation
export function useBreadcrumb(currentPage: string, customItems?: BreadcrumbItem[]) {
  const { t } = useLanguage()
  
  // Map common routes to breadcrumb items
  const routeMap: Record<string, BreadcrumbItem[]> = {
    '/events': [
      { label: t('navigation.events', 'Events'), isActive: true }
    ],
    '/events/create': [
      { label: t('navigation.events', 'Events'), href: ROUTES.events },
      { label: t('navigation.create-event', 'Create Event'), isActive: true }
    ],
    '/community': [
      { label: t('navigation.community', 'Community'), isActive: true }
    ],
    '/services': [
      { label: t('navigation.services', 'Premium Services'), isActive: true }
    ],
    '/transport': [
      { label: t('navigation.services', 'Services'), href: ROUTES.services },
      { label: t('navigation.transport', 'Transport'), isActive: true }
    ],
    '/london-tours': [
      { label: t('navigation.services', 'Services'), href: ROUTES.services },
      { label: t('navigation.london-tours', 'London Tours'), isActive: true }
    ],
    '/business-networking': [
      { label: t('navigation.events', 'Events'), href: ROUTES.events },
      { label: t('navigation.business-networking', 'Business Networking'), isActive: true }
    ],
    '/matches': [
      { label: t('navigation.matches', 'Find Your Match'), isActive: true }
    ],
    '/tv': [
      { label: t('navigation.tv', 'Live TV'), isActive: true }
    ],
    '/live': [
      { label: t('navigation.streaming', 'Streaming Income'), isActive: true }
    ]
  }

  return customItems || routeMap[currentPage] || []
}