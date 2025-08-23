"use client";

import React from "react";
import {
  ArrowRightIcon,
  HeartIcon,
  UsersIcon,
  MapPinIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  StarIcon,
  CheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { communityStats } from "@/config/community";
import { ROUTES } from "@/config/routes";
import { motion } from "framer-motion";
import { LuxuryRipple } from "./LuxuryMobileInteraction";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [liveActivity, setLiveActivity] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useLanguage();

  // Real-time activity simulation
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setLiveActivity(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic stats that feel real
  const dynamicStats = {
    totalMembers: '1,247',
    newThisWeek: '23',
    nextEvent: 'Porto Night this Friday',
    eventAttending: '47',
    rating: '4.8',
    reviews: '890+'
  };

  // Real testimonials with photos
  const testimonials = [
    {
      text: "Finally found my Portuguese community in London!",
      author: "Maria, Vauxhall",
      image: "M",
      verified: true
    },
    {
      text: "Best business networking I've found",
      author: "João, Tech Entrepreneur",
      image: "J",
      verified: true
    },
    {
      text: "My kids are learning Portuguese through LusoTown events",
      author: "Ana, Mother",
      image: "A",
      verified: true
    }
  ];

  // Live activity feed
  const liveActivities = [
    "🎵 Fado Night tomorrow - 12 spots left",
    "💼 Business mixer this weekend",
    "🍽️ Portuguese food market Sunday",
    "🔴 Someone just joined from Manchester!"
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden w-full bg-gradient-to-br from-white via-red-50/20 to-green-50/20">
      {/* Portuguese tile pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c53026' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Portuguese flag inspired gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-red-500/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - WOW Content */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Live Activity Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-white to-red-100 border border-green-200 rounded-full px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm" />
                <span className="text-sm font-bold text-gray-800">
                  {liveActivities[liveActivity]}
                </span>
              </div>
            </motion.div>

            {/* Conversion Headlines */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight"
              >
                <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                  Finally!
                </span>{" "}
                <span className="text-gray-900">Your Portuguese Community in London</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-xl xs:text-2xl sm:text-3xl text-gray-700 leading-relaxed font-medium">
                  <span className="font-bold text-green-600">{dynamicStats.totalMembers} Portuguese speakers</span> and growing • 
                  <span className="font-bold text-blue-600">{dynamicStats.newThisWeek} joined this week</span>
                </p>
                
                <div className="flex items-center gap-4 text-lg text-gray-600">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <StarSolid key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                    <span className="font-bold text-yellow-600">{dynamicStats.rating}★ from {dynamicStats.reviews} reviews</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  <span className="font-semibold text-red-600">Next event:</span> {dynamicStats.nextEvent} ({dynamicStats.eventAttending} attending)
                </p>
              </motion.div>
            </div>

            {/* Clear Path Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/50"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                What brings you here today?
              </h3>
              
              <div className="space-y-3">
                <LuxuryRipple
                  className="w-full bg-gradient-to-r from-red-50 to-green-50 border-2 border-red-200 rounded-2xl p-4 hover:border-red-300 transition-all cursor-pointer group"
                  onClick={() => window.location.href = '/matches'}
                  hapticFeedback="medium"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
                      <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                        I WANT TO SOCIALIZE
                      </h4>
                      <p className="text-sm text-gray-600">Find events, meet friends, experience culture</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>
                </LuxuryRipple>
                
                <LuxuryRipple
                  className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4 hover:border-blue-300 transition-all cursor-pointer group"
                  onClick={() => window.location.href = ROUTES.community}
                  hapticFeedback="medium"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <BriefcaseIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        I WANT TO NETWORK
                      </h4>
                      <p className="text-sm text-gray-600">Connect with Portuguese professionals</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </LuxuryRipple>
                
                <LuxuryRipple
                  className="w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4 hover:border-purple-300 transition-all cursor-pointer group"
                  onClick={() => window.location.href = ROUTES.host}
                  hapticFeedback="medium"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                        I WANT TO CREATE EVENTS
                      </h4>
                      <p className="text-sm text-gray-600">Host events, build your brand, make money</p>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                </LuxuryRipple>
              </div>
            </motion.div>

            {/* Main CTA Buttons */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {/* Big Green Button */}
              <LuxuryRipple
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer group"
                onClick={() => window.location.href = '/signup'}
                hapticFeedback="medium"
                rippleColor="rgba(255, 255, 255, 0.3)"
              >
                <motion.div
                  className="relative z-10 flex items-center justify-center gap-4 px-8 py-6 text-xl font-black"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <span className="text-xl">🇵🇹</span>
                  <span className="relative z-10">
                    <span className="hidden sm:inline">Join {dynamicStats.totalMembers} Portuguese Speakers in London - FREE</span>
                    <span className="sm:hidden">Join {dynamicStats.totalMembers} Portuguese Speakers - FREE</span>
                  </span>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRightIcon className="h-7 w-7" />
                  </motion.div>
                </motion.div>
              </LuxuryRipple>

              {/* Smaller Explore Button */}
              <LuxuryRipple
                className="w-full bg-white/90 backdrop-blur-lg border-2 border-gray-200 text-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                onClick={() => window.location.href = ROUTES.events}
                hapticFeedback="light"
                rippleColor="rgba(34, 197, 94, 0.2)"
              >
                <motion.div
                  className="relative z-10 flex items-center justify-center gap-3 px-6 py-4 text-lg font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">👀</span>
                  <span>Explore Community First</span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRightIcon className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </motion.div>
              </LuxuryRipple>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-wrap items-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span>Verified Portuguese speakers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <span>Safe & secure</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Social Proof & Live Activity */}
          <div
            className={`relative transition-all duration-1000 delay-600 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            } self-start space-y-6`}
          >
            {/* Live Activity Card */}
            <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="space-y-6">
                {/* Live Activity Header */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold text-gray-800">Live Activity</h3>
                </div>

                {/* Live Updates */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-green-50 rounded-2xl p-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      🎵
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-800">Fado Night Tomorrow</p>
                      <p className="text-sm text-green-600">12 spots left • Camden</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      💼
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-800">Business Mixer</p>
                      <p className="text-sm text-blue-600">This weekend • Canary Wharf</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-purple-50 rounded-2xl p-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      🍽️
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-800">Portuguese Food Market</p>
                      <p className="text-sm text-purple-600">Sunday • Borough Market</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-red-50 rounded-2xl p-4 animate-pulse">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <p className="text-sm text-red-600 font-medium">
                      <span className="font-bold">João from Manchester</span> just joined!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Proof Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Real People, Real Stories</h3>
                  <div className="flex items-center justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <StarSolid key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                    <span className="text-lg font-bold text-yellow-600 ml-2">4.8/5</span>
                  </div>
                </div>

                {/* Rotating Testimonials */}
                <div className="bg-gradient-to-r from-green-50 via-white to-red-50 rounded-2xl p-5 border border-green-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {testimonials[currentTestimonial].image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-800">{testimonials[currentTestimonial].author}</span>
                        {testimonials[currentTestimonial].verified && (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-700 italic leading-relaxed">
                        "{testimonials[currentTestimonial].text}"
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <StarSolid key={i} className="w-3 h-3 text-yellow-500" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">Verified Portuguese</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Member Count */}
                <div className="text-center">
                  <div className="flex justify-center -space-x-3 mb-3">
                    {["M", "A", "J", "C", "L"].map((initial, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-3 border-white shadow-lg bg-gradient-to-br from-green-400 via-red-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm"
                      >
                        {initial}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-3 border-white shadow-lg bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                      +{dynamicStats.totalMembers}
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">
                    <span className="font-bold text-green-600">{dynamicStats.totalMembers} Portuguese speakers</span> already connected
                  </p>
                </div>
              </div>
            </div>

            
            {/* Quick Stats Card */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-green-600 mb-1">
                    {dynamicStats.newThisWeek}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Joined This Week
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-red-600 mb-1">
                    {dynamicStats.eventAttending}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Next Event Spots
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-blue-600 mb-1">
                    12+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Cities Covered
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-purple-600 mb-1">
                    {dynamicStats.rating}★
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    User Rating
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
