'use client'

import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ArrowRightIcon, 
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface CaseStudiesPromoProps {
  variant?: 'default' | 'compact' | 'banner'
  className?: string
}

export default function CaseStudiesPromo({ variant = 'default', className = '' }: CaseStudiesPromoProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl p-6 border border-secondary-200/40 ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Real Portuguese Stories</h3>
            <p className="text-sm text-gray-600 mb-3">
              From strangers at London museums to business partners and best friends. Read how Portuguese speakers transformed their lives.
            </p>
            <a 
              href="/case-studies" 
              className="inline-flex items-center gap-1 text-secondary-600 hover:text-secondary-700 font-semibold text-sm group"
            >
              Read Case Studies
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 ${className}`}
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-4">
            <HeartIcon className="w-4 h-4" />
            Featured Case Studies
          </div>
          <h3 className="text-2xl font-bold mb-3">
            3 Portuguese Stories That Changed Everything
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            From flatmates to business partners to cultural leaders. Discover how Portuguese speakers 
            transformed their London lives through LusoTown connections.
          </p>
          <a 
            href="/case-studies" 
            className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Read Full Stories
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 ${className}`}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UserGroupIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Real Portuguese Community Stories
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Read detailed case studies of how Portuguese speakers from Brazil, Portugal, Angola, and beyond 
          have built meaningful friendships, business partnerships, and cultural connections in London.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-sm">
          <div className="bg-secondary-50 rounded-lg p-4">
            <div className="font-semibold text-secondary-700 mb-1">Case Study 1</div>
            <div className="text-gray-600">Museum friends become flatmates</div>
          </div>
          <div className="bg-accent-50 rounded-lg p-4">
            <div className="font-semibold text-accent-700 mb-1">Case Study 2</div>
            <div className="text-gray-600">Networking leads to £150K business</div>
          </div>
          <div className="bg-coral-50 rounded-lg p-4">
            <div className="font-semibold text-coral-700 mb-1">Case Study 3</div>
            <div className="text-gray-600">Book club launches cultural movement</div>
          </div>
        </div>
        
        <a 
          href="/case-studies" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
        >
          Read All Case Studies
          <ArrowRightIcon className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  )
}