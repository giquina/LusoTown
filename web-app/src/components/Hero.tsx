'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import SocialLogin from './SocialLogin'
import { getImagesByCategory } from '@/lib/profileImages'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden w-full" style={{
      background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,182,193,0.15), transparent 40%), linear-gradient(135deg, #fefefe 0%, #f8f9fa 50%, #f0f4f8 100%)`
    }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            rotateX: [0, 5, 0],
            rotateY: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 via-purple-100 to-blue-100 rounded-full opacity-30"
        />
        <motion.div 
          animate={{ 
            rotateX: [0, -5, 0],
            rotateY: [0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-orange-200 via-pink-100 to-purple-100 rounded-full opacity-25"
        />
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-6 h-6 bg-pink-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-3/4 right-1/3 w-4 h-4 bg-purple-400 rounded-full"
        />
        <motion.div
          animate={{ 
            x: [0, 15, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-blue-400 rounded-full opacity-50"
        />
      </div>

      <div className="container-width relative z-10 section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Smart Personalized Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border border-pink-200 rounded-2xl px-6 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-pink-500" />
                <span className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  30+ Events Monthly • 300+ Active Members • UK-Wide
                </span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </motion.div>

            {/* Main Headlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight tracking-tight break-words">
                WHERE{' '}
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse font-extrabold">
                  AMAZING
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800">
                  WOMEN CONNECT
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl font-medium break-words">
                Join the <span className="font-bold text-pink-600">premier verified community</span> for 30+ single & childfree women in the UK. From wine tastings in Covent Garden to career workshops in Shoreditch—find your tribe and create the social life you've always wanted across <span className="font-bold text-purple-600">London and beyond</span>.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {[
                { icon: HeartIcon, text: "30+ EVENTS MONTHLY", color: "#ef4444" },
                { icon: UsersIcon, text: "300+ VERIFIED MEMBERS", color: "#3b82f6" },
                { icon: SparklesIcon, text: "98% SAFETY RATING", color: "#f59e0b" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" style={{color: item.color}} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide text-center sm:text-left">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <motion.a
                href="/signup"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group text-lg sm:text-xl font-bold px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  JOIN FREE & BROWSE EVENTS
                  <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </motion.a>

              <motion.a
                href="/events"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.9)"
                }}
                whileTap={{ scale: 0.95 }}
                className="text-lg sm:text-xl font-bold px-8 sm:px-10 py-4 sm:py-5 bg-white/70 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-purple-300"
              >
                VIEW UPCOMING EVENTS
              </motion.a>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <SocialLogin mode="signup" />
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Member Photos Background */}
            <div className="absolute inset-0 z-0">
              <div className="grid grid-cols-3 gap-2 opacity-20 h-full">
                {getImagesByCategory('community').slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    className="aspect-square rounded-2xl overflow-hidden"
                  >
                    <img 
                      src={photo.path}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Join 300+ Women</h3>
                  <p className="text-gray-600">Already connecting in London</p>
                </div>
                
                {/* Member Avatars */}
                <div className="flex justify-center mb-4">
                  <div className="flex -space-x-3">
                    {getImagesByCategory('community').slice(0, 4).map((photo, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden"
                      >
                        <img 
                          src={photo.path}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xs font-bold">
                      +300
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/40 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-pink-600">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="bg-white/40 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-purple-600">30+</div>
                    <div className="text-sm text-gray-600">Monthly Events</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/40 rounded-xl p-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                      <HeartIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Verified profiles only</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 rounded-xl p-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                      <UsersIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Interest-based matching</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 rounded-xl p-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <SparklesIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Weekly local events</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}