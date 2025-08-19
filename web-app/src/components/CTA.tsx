"use client";

// LusoTown Design System:
// - Background: Portuguese flag colors (red, yellow, green gradients)
// - Portuguese cultural elements and storytelling
// - Emotional connection with heritage and community

import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
  UserGroupIcon,
  MapPinIcon,
  FireIcon,
  CameraIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { plans, formatPrice } from "@/config/pricing";

const getBenefits = (t: any) => [
  {
    icon: HeartIcon,
    title: "Portuguese Soul Connections",
    description: "Find people who understand saudade and love pastéis de nata",
    tag: "FREE",
    tagColor: "bg-green-500"
  },
  {
    icon: CameraIcon,
    title: "LusoTown TV & Streaming",
    description: "Watch fado sessions, Portuguese shows & cultural content",
    tag: "FREE",
    tagColor: "bg-green-500"
  },
  {
    icon: MapPinIcon,
    title: "London Portuguese Events",
    description: "Fado nights, wine tastings & cultural celebrations",
    tag: "FREE",
    tagColor: "bg-green-500"
  },
  {
    icon: SparklesIcon,
    title: "Unlimited Matches + VIP Events",
    description: "Premium matching & exclusive Portuguese gatherings",
    tag: "£19.99/mo",
    tagColor: "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
  },
  {
    icon: StarIcon,
    title: "Cultural Ambassador Status",
    description: "Host events, earn revenue & Portuguese chauffeur access",
    tag: "£39.99/mo",
    tagColor: "bg-gradient-to-r from-yellow-500 via-red-500 to-green-500"
  },
  {
    icon: GlobeAltIcon,
    title: "Global Portuguese Network",
    description: "Connect with 10+ countries & preserve your heritage",
    tag: "ALL PLANS",
    tagColor: "bg-gradient-to-r from-green-500 to-red-500"
  },
];

export default function CTA() {
  const { t } = useLanguage();
  const benefits = getBenefits(t);
  
  return (
    <section className="py-24 bg-gradient-to-br from-red-600 via-yellow-500 to-green-600 relative overflow-hidden">
      {/* Portuguese Cultural Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 left-16 w-64 h-64 bg-white/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        
        {/* Floating Portuguese Cultural Elements */}
        <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🇵🇹</div>
        <div className="absolute top-40 right-32 text-4xl opacity-30 animate-bounce delay-1000" style={{ animationDuration: '4s' }}>🎭</div>
        <div className="absolute bottom-32 right-20 text-5xl opacity-25 animate-bounce delay-500" style={{ animationDuration: '3.5s' }}>⚽</div>
        <div className="absolute bottom-40 left-32 text-3xl opacity-35 animate-bounce delay-1500" style={{ animationDuration: '4.5s' }}>🥐</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Emotional Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 text-white font-bold mb-8 border border-white/30 shadow-lg">
              <span className="text-2xl animate-pulse">🏠</span>
              <span>Encontre a Sua Casa Portuguesa em Londres</span>
              <span className="text-2xl animate-pulse">🏠</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              <span className="block mb-2">Join the</span>
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                Portuguese Community
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto mb-6 font-medium">
              From {formatPrice(plans.community.monthly)}/month - Connect with Portuguese speakers across London. 
              Unlimited matches, events, and networking.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-white/90 text-lg font-medium">
              <div className="flex items-center gap-2">
                <FireIcon className="h-5 w-5 text-yellow-300" />
                <span>Community Member: {formatPrice(plans.community.monthly)}/month</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="h-5 w-5 text-yellow-300" />
                <span>Cultural Ambassador: {formatPrice(plans.ambassador.monthly)}/month</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="group bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${benefit.tagColor} shadow-lg`}>
                      {benefit.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Community Stats & Live Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/30 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-white mb-2">M</div>
                <div className="text-white/80 text-sm font-medium">Matches Made</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-2">A</div>
                <div className="text-white/80 text-sm font-medium">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-2">J</div>
                <div className="text-white/80 text-sm font-medium">Joined Today</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-2">L</div>
                <div className="text-white/80 text-sm font-medium">Live Events</div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-6 pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-300 mb-1">+500</div>
                  <div className="text-white/80 text-sm">Monthly Experiences</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300 mb-1">150+</div>
                  <div className="text-white/80 text-sm">Portuguese Venues</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300 mb-1">10+</div>
                  <div className="text-white/80 text-sm">Countries Represented</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/30 max-w-2xl mx-auto mb-12"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-6">Quick Join</h3>
            
            {/* Social Login Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <a href="/auth/google" className="bg-white/20 hover:bg-white/30 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-2xl mb-2">📧</div>
                <div className="text-white text-sm font-medium">Google</div>
              </a>
              <a href="/auth/facebook" className="bg-white/20 hover:bg-white/30 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-2xl mb-2">📘</div>
                <div className="text-white text-sm font-medium">Facebook</div>
              </a>
              <a href="/auth/instagram" className="bg-white/20 hover:bg-white/30 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-2xl mb-2">📸</div>
                <div className="text-white text-sm font-medium">Instagram</div>
              </a>
              <a href="/auth/linkedin" className="bg-white/20 hover:bg-white/30 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-white text-sm font-medium">LinkedIn</div>
              </a>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-white/80 text-sm">or continue with email</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>
            
            <a
              href="/signup"
              className="w-full bg-white text-red-600 hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 group flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🏠</span>
              {t("nav.start-free", "Start Free")}
              <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <p className="text-white/80 text-sm text-center mt-4">
              {t(
                "cta.guarantee",
                "No commitment • Start connecting immediately • Cancel anytime"
              )}
            </p>
          </motion.div>

          {/* Portuguese Community Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto mb-8"
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl animate-pulse">🇵🇹</span>
                <span className="text-white font-bold text-lg">Portuguese Community Activity</span>
                <span className="text-3xl animate-pulse">🇵🇹</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
                      style={{
                        background: i <= 4 
                          ? `linear-gradient(45deg, #dc2626, #eab308, #16a34a)` 
                          : `linear-gradient(45deg, #16a34a, #eab308, #dc2626)`,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-white font-bold text-xl mb-2">
                🎉 27 Portuguese speakers joined in the last 24 hours
              </p>
              <p className="text-white/90 mb-4">
                Active now: Sofia (Stockwell), Miguel (Vauxhall), Ana (Borough), João (Elephant & Castle)
              </p>
              <p className="text-yellow-300 font-semibold">
                ⚡ Join now and start matching with Portuguese speakers within 1 hour
              </p>
            </div>
          </motion.div>

          {/* Portuguese Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🔒</div>
              <div className="text-xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 text-sm font-medium">
                {t("cta.trust.verified-profiles", "Verified Portuguese Profiles")}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🛡️</div>
              <div className="text-xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80 text-sm font-medium">
                {t("cta.trust.community-support", "Portuguese Community Moderation")}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-3">💝</div>
              <div className="text-xl font-bold text-white mb-2">Saudade</div>
              <div className="text-white/80 text-sm font-medium">
                {t("cta.trust.satisfaction-guarantee", "Cultural Understanding Guarantee")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
