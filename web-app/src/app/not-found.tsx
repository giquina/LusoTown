'use client'

import React from 'react'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'
import { HomeIcon, ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function NotFound() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">🇵🇹</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {isPortuguese ? 'Página Não Encontrada' : 'Page Not Found'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isPortuguese 
                ? 'Parece que esta página decidiu explorar outro bairro português! Vamos ajudá-lo a encontrar o que procura.'
                : 'Looks like this page decided to explore another Portuguese neighborhood! Let\'s help you find what you\'re looking for.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href={ROUTES.home}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <HomeIcon className="w-5 h-5" />
              {isPortuguese ? 'Voltar ao Início' : 'Back to Home'}
            </Link>

            <Link
              href={ROUTES.events}
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:text-primary-700 transition-all duration-200"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              {isPortuguese ? 'Explorar Eventos' : 'Explore Events'}
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full inline-flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              {isPortuguese ? 'Página Anterior' : 'Previous Page'}
            </button>
          </div>

          {/* Helpful Links */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 mb-4">
              {isPortuguese ? 'Páginas Populares:' : 'Popular Pages:'}
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link href={ROUTES.community} className="text-primary-600 hover:text-primary-700 hover:underline">
                {isPortuguese ? 'Comunidade' : 'Community'}
              </Link>
              <Link href={ROUTES.groups} className="text-primary-600 hover:text-primary-700 hover:underline">
                {isPortuguese ? 'Grupos' : 'Groups'}
              </Link>
              <Link href={ROUTES.londonTours} className="text-primary-600 hover:text-primary-700 hover:underline">
                {isPortuguese ? 'Tours Londres' : 'London Tours'}
              </Link>
              <Link href={ROUTES.contact} className="text-primary-600 hover:text-primary-700 hover:underline">
                {isPortuguese ? 'Contato' : 'Contact'}
              </Link>
            </div>
          </div>

          {/* Cultural Touch */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
            <p className="text-xs text-gray-600 italic">
              {isPortuguese 
                ? '"Onde há portugueses, há sempre uma mesa para mais um" - A comunidade portuguesa de Londres espera por si!'
                : '"Where there are Portuguese, there\'s always room for one more" - The Portuguese community in the U.K. awaits you!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}