"use client";

// LusoTown Design System:
// - Background: Lusophone gradient (from-secondary-600 via-action-600 to-accent-600)
// - Button text: secondary-700 (green) for contrast against white background
// - Never use primary (blue) colors for CTA sections

import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { plans, formatPrice } from "@/config/pricing";
import { communityStats } from "@/config/community";

// Social login providers
const socialProviders = [
  { name: 'Google', icon: '🔍', href: '/auth/google' },
  { name: 'Facebook', icon: '📘', href: '/auth/facebook' },
  { name: 'Instagram', icon: '📸', href: '/auth/instagram' },
  { name: 'LinkedIn', icon: '💼', href: '/auth/linkedin' },
];

// Enhanced community highlights with United Kingdom focus
const communityHighlights = [
  { 
    label: "Lusophone Speakers", 
    value: communityStats.members, 
    icon: UserGroupIcon,
    description: "Across the United Kingdom"
  },
  { 
    label: "Monthly United Kingdom Events", 
    value: "150+", 
    icon: CalendarDaysIcon,
    description: "London, Manchester, Birmingham & more"
  },
  { 
    label: "United Kingdom Cities", 
    value: "25+", 
    icon: GlobeAltIcon,
    description: "From Edinburgh to Brighton"
  },
  { 
    label: "Success Stories", 
    value: "500+", 
    icon: HeartIcon,
    description: "Lusophone connections made in the United Kingdom"
  },
];

export default function CTA() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 bg-gradient-to-br from-secondary-600 via-action-600 to-accent-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header - Improved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold mb-8 border border-white/30">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇵🇹</span>
                <span className="text-lg">🇬🇧</span>
              </div>
              <SparklesIcon className="h-5 w-5" />
              Portuguese-speaking community in the United Kingdom
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              From {formatPrice(plans.community.monthly)}/month
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-8 border border-white/20">
              <p className="text-2xl sm:text-3xl text-white font-bold mb-4 leading-tight">
                Connect with Portuguese speakers across the United Kingdom
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                From London to Manchester, Birmingham to Edinburgh - join the largest Portuguese-speaking community platform in the United Kingdom. 
                Unlimited matches, cultural events, and professional networking nationwide.
              </p>
            </div>

            {/* Pricing Tiers - United Kingdom Focused */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                <h3 className="text-white font-bold text-xl mb-2">United Kingdom Community Member</h3>
                <p className="text-white/90 text-2xl font-bold">{formatPrice(plans.community.monthly)}/month</p>
                <p className="text-white/80 text-sm mt-3 leading-relaxed">
                  Connect with Portuguese speakers across England, Scotland, Wales & Northern Ireland
                </p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center relative overflow-hidden">
                <div className="absolute -top-2 -right-2 bg-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Cultural Ambassador</h3>
                <p className="text-white/90 text-2xl font-bold">{formatPrice(plans.ambassador.monthly)}/month</p>
                <p className="text-white/80 text-sm mt-3 leading-relaxed">
                  Premium access + priority visibility across all United Kingdom Lusophone events
                </p>
              </div>
            </div>
          </motion.div>

          {/* Community Stats - More Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {communityHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <motion.div
                  key={highlight.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{highlight.value}</div>
                  <div className="text-white/90 font-semibold text-sm mb-2">{highlight.label}</div>
                  <div className="text-white/70 text-xs">{highlight.description}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Primary Action */}
              <a
                href="/signup"
                className="bg-white text-secondary-700 hover:bg-gray-50 font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 group inline-flex items-center justify-center"
              >
                Quick Join
                <ArrowRightIcon className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              {/* Social Login Options */}
              <div className="w-full max-w-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/30"></div>
                  <span className="text-white/80 font-medium">or continue with</span>
                  <div className="flex-1 h-px bg-white/30"></div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {socialProviders.map((provider, index) => (
                    <motion.a
                      key={provider.name}
                      href={provider.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:border-white/40 transition-all duration-300 group flex flex-col items-center"
                    >
                      <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">{provider.icon}</span>
                      <span className="text-white text-sm font-medium">{provider.name}</span>
                    </motion.a>
                  ))}
                </div>
                
                <p className="text-white/70 text-center mt-4 text-sm">
                  or continue with email
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto"
          >
            {/* Social Proof - United Kingdom Focused */}
            <div className="text-center mb-8">
              <div className="flex justify-center -space-x-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: `hsl(${(i * 51) % 360}, 65%, 55%)`,
                    }}
                  >
                    United Kingdom
                  </div>
                ))}
              </div>
              <p className="text-white font-bold text-xl mb-2">
                23 Portuguese speakers from across the United Kingdom joined today
              </p>
              <p className="text-white/80 text-lg">
                Connect with your Portuguese-speaking community nationwide within 48 hours
              </p>
            </div>

            {/* Trust Signals Grid */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/80 text-sm">Verified Profiles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80 text-sm">Community Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">30-Day</div>
                <div className="text-white/80 text-sm">Money Back Guarantee</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
