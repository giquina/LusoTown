'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { getProfileImage, getImagesByCategory, getImageWithFallback, getAltTextWithFallback } from '@/lib/profileImages'

const testimonials = [
  {
    name: "Sarah Chen",
    age: "34",
    location: "Clapham, London",
    imageId: "sarah-chen",
    quote: "I moved to London at 32 for work and felt so isolated. AdyaTribe helped me find my book club girls and now we're planning a trip to Scotland together! It's like finding your chosen family.",
    rating: 5,
    relationship: "Found her London book club tribe"
  },
  {
    name: "Maya Patel",
    age: "38", 
    location: "Shoreditch, London",
    imageId: "maya-patel",
    quote: "The walking group I joined through AdyaTribe has become my weekend sanctuary. From Hampstead Heath to Richmond Park, these women push me to explore London while providing incredible support.",
    rating: 5,
    relationship: "Adventure buddy for life"
  },
  {
    name: "Jessica Williams",
    age: "31",
    location: "Notting Hill, London", 
    imageId: "jessica-williams",
    quote: "As a childfree woman in London, I often felt judged. Here, I found women who celebrate my choices and share similar life goals. We support each other's careers and UK travel dreams.",
    rating: 5,
    relationship: "Career and travel support system"
  },
  {
    name: "Emma Johnson",
    age: "41",
    location: "Greenwich, London",
    imageId: "emma-johnson",
    quote: "After my divorce, I thought making new friends in London would be impossible. The women I met through AdyaTribe helped me rediscover myself and showed me that your 40s can be empowering.",
    rating: 5,
    relationship: "Post-divorce support network"
  },
  {
    name: "Priya Sharma",
    age: "35",
    location: "Canary Wharf, London",
    imageId: "priya-sharma",
    quote: "The cooking group introduced me to British and international women who've enriched my London experience immeasurably. We explore Borough Market together and share our cultural recipes.",
    rating: 5,
    relationship: "Cultural exchange and friendship"
  },
  {
    name: "Lisa Thompson",
    age: "39",
    location: "Richmond, London",
    imageId: "lisa-thompson",
    quote: "I was skeptical about online friendships, but these London connections are the most genuine I've experienced. The verification process ensures everyone is real and serious about friendship.",
    rating: 5,
    relationship: "Genuine London friendships"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function Testimonials() {
  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse animation-delay-200"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-primary-600 font-medium mb-6 border border-white/30">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            Real Stories, Real Friendships
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hear from Our{' '}
            <span className="gradient-text">Amazing Community</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Discover how hundreds of women have transformed their social lives and built meaningful connections through AdyaTribe.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="group"
            >
              <div className="card p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
                {/* Quote Icon */}
                <div className="mb-6">
                  <ChatBubbleLeftIcon className="h-8 w-8 text-primary-300" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-base">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-white">
                    <img 
                      src={getImageWithFallback(testimonial.imageId)} 
                      alt={getAltTextWithFallback(testimonial.imageId)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}, {testimonial.age}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-primary-600 font-medium">
                      {testimonial.relationship}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Meet Your <span className="gradient-text">Future Friends</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of amazing women from diverse backgrounds who are building meaningful connections across London and the UK.
            </p>
          </div>
          
          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {getImagesByCategory('community').map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg ring-2 ring-white hover:ring-primary-200 transition-all duration-300"
              >
                <img 
                  src={member.path}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-primary-400 mb-2">4.9/5</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary-400 mb-2">300+</p>
                <p className="text-gray-600">Verified Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-400 mb-2">89%</p>
                <p className="text-gray-600">Made Real Friends</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Write Your Own Success Story?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of women who've found their tribe. Your perfect friendship match is just a click away.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block">
            Start Your Journey Today
          </a>
        </motion.div>
      </div>
    </section>
  )
}