'use client'

import React from 'react'
import AngolaEliteNetwork from '@/components/AngolaEliteNetwork'
import AngolaLuxuryDirectory from '@/components/AngolaLuxuryDirectory'
import AngolaDiamondCapital from '@/components/AngolaDiamondCapital'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Diamond, Crown, Building2, ArrowRight } from 'lucide-react'

// Note: metadata moved to layout.tsx since this is a client component

export default function AngolaElitePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-yellow-600 via-amber-700 to-orange-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Diamond className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              {t('angola.elite.title', 'Angola Elite Network')}
            </h1>
            <p className="text-xl opacity-90 max-w-4xl mx-auto">
              {t('angola.elite.subtitle', "Africa's Diamond Capital Meets London's Financial Elite")}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="sticky top-0 z-40 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-8 py-4">
            <a 
              href="#diamond-capital" 
              className="flex items-center gap-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              <Diamond className="h-5 w-5" />
              Diamond Capital
            </a>
            <a 
              href="#elite-network" 
              className="flex items-center gap-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              <Crown className="h-5 w-5" />
              Elite Network
            </a>
            <a 
              href="#luxury-directory" 
              className="flex items-center gap-2 text-gray-700 hover:text-amber-600 font-medium transition-colors"
            >
              <Building2 className="h-5 w-5" />
              Luxury Directory
            </a>
          </nav>
        </div>
      </div>

      {/* Angola Diamond Capital Section */}
      <section id="diamond-capital" className="scroll-mt-20">
        <AngolaDiamondCapital />
      </section>

      {/* Elite Network Section */}
      <section id="elite-network" className="scroll-mt-20 bg-gray-50">
        <AngolaEliteNetwork />
      </section>

      {/* Luxury Directory Section */}
      <section id="luxury-directory" className="scroll-mt-20">
        <AngolaLuxuryDirectory />
      </section>

      {/* Cultural Bridge Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Bridging Luanda and London
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            LusoTown's Angola Elite Network serves as the cultural and business bridge 
            connecting London's sophisticated Angolan diaspora with their homeland's wealth 
            and opportunities. We celebrate Angola's position as Africa's Diamond Capital 
            while fostering the next generation of Angola-United Kingdom business relationships.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Diamond className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Natural Wealth</h3>
              <p className="text-gray-600">
                Connect with opportunities in Angola's $12B diamond industry and $45B oil sector
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Crown className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Elite Community</h3>
              <p className="text-gray-600">
                Join London's most successful Angolan professionals and entrepreneurs
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cultural Bridge</h3>
              <p className="text-gray-600">
                Sophisticated cultural exchange between Luanda's high society and London's elite
              </p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 px-10 py-4 text-lg"
          >
            <Crown className="h-6 w-6 mr-3" />
            Join the Elite Network
            <ArrowRight className="h-6 w-6 ml-3" />
          </Button>
        </div>
      </section>
    </div>
  )
}