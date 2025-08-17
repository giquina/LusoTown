'use client'

import React, { useState, useEffect } from 'react'
import { Shield, MapPin, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function PortugueseSpeakersSection() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const countries = [
    { flag: 'PT', name: 'Portugal', code: 'PT' },
    { flag: 'BR', name: 'Brazil', code: 'BR' },
    { flag: 'AO', name: 'Angola', code: 'AO' },
    { flag: 'MZ', name: 'Mozambique', code: 'MZ' },
    { flag: 'CV', name: 'Cape Verde', code: 'CV' },
    { flag: 'GW', name: 'Guinea-Bissau', code: 'GW' },
    { flag: 'ST', name: 'São Tomé', code: 'ST' },
    { flag: 'TL', name: 'East Timor', code: 'TL' },
    { flag: 'MO', name: 'Macau', code: 'MO' },
    { flag: 'GQ', name: 'Eq. Guinea', code: 'GQ' }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 relative overflow-hidden border-t border-gray-100">
      {/* Portuguese-inspired background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/50 rounded-full opacity-35" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Countries Section */}
        <div className={`bg-white/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/30 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/70 border border-gray-200 rounded-2xl px-6 py-3 shadow-lg mb-6">
              <Shield className="h-5 w-5 text-secondary-500" />
              <span className="text-sm font-bold text-gray-700">Professional Network • Adult Community</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built for Portuguese speakers from <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">across the globe</span>
            </h3>
          </div>
          
          {/* Countries Grid - Enhanced Multi-Column Layout */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 justify-items-center mb-8">
            {countries.map((country, index) => (
              <div
                key={country.code}
                className={`group flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl border border-white/40 hover:border-secondary-300 transition-all duration-300 hover:scale-105 hover:-translate-y-1 transition-all duration-500 delay-${50 * index} ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${50 * index}ms` }}
              >
                <img 
                  src={`https://flagcdn.com/24x18/${country.flag.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/48x36/${country.flag.toLowerCase()}.png 2x, https://flagcdn.com/72x54/${country.flag.toLowerCase()}.png 3x`}
                  alt={`${country.name} flag`}
                  className="w-6 h-4 object-cover rounded-sm group-hover:scale-110 transition-transform duration-300 shadow-sm"
                  loading="lazy"
                />
                <span className="text-sm font-bold text-gray-700 group-hover:text-secondary-600 transition-colors duration-300">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Whether you're from Portugal, Brazil, Angola, Mozambique, or any Portuguese-speaking nation, 
              LusoTown London connects you with authentic venues where Portuguese culture thrives and community happens.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500 text-white rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <MapPin className="h-5 w-5" />
              <span className="font-bold text-lg">Join 750+ Portuguese speakers meeting at authentic venues across London</span>
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}