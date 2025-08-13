'use client'

import { motion } from 'framer-motion'
import { 
  UserGroupIcon, 
  CalendarDaysIcon, 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function HowItWorks() {
  const steps = [
    {
      number: '1️⃣',
      title: 'Join the Community',
      description: 'Sign up for free and create your profile.',
      icon: UserGroupIcon
    },
    {
      number: '2️⃣',
      title: 'Discover Events & Businesses',
      description: 'From food festivals to language meetups.',
      icon: CalendarDaysIcon
    },
    {
      number: '3️⃣',
      title: 'Post & Connect on LusoFeed',
      description: 'Share updates, photos, and tips.',
      icon: ChatBubbleLeftRightIcon
    },
    {
      number: '4️⃣',
      title: 'Save Your Favourites',
      description: 'Keep track of the events, posts, and places you love.',
      icon: HeartIcon
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with LusoTown in just a few simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl p-6 shadow-lg border border-white/50 text-center hover:shadow-xl transition-all duration-300 opacity-0 translate-y-5"
              style={{
                animation: `fadeInUp 0.6s ease-out ${0.3 + index * 0.1}s both`
              }}
            >
              <div className="text-3xl mb-4">{step.number}</div>
              <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-12"
        >
          <a 
            href="/how-it-works" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
          >
            Learn More
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}