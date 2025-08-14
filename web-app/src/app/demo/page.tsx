'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventCard from '@/components/EventCard'
import EventFeed from '@/components/EventFeed'
import Cart from '@/components/Cart'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function DemoPage() {
  const { language } = useLanguage()
  const { cartCount, savedCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState<'feed' | 'cart'>('feed')
  
  const isPortuguese = language === 'pt-pt' || language === 'pt-br'

  // Sample event data for demonstration
  const sampleEvents = [
    {
      id: 'demo-event-1',
      title: 'Noite de Fado & Vinho Verde - Authentic Portuguese Night',
      description: 'Experience the soul of Portugal with traditional Fado music, Vinho Verde tasting, and authentic Portuguese cuisine.',
      date: '2025-08-16',
      time: '19:00',
      endTime: '23:30',
      location: 'A Toca Restaurant',
      maxAttendees: 35,
      currentAttendees: 22,
      category: 'Music & Entertainment',
      price: 45,
      currency: 'GBP',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
      hostName: 'Miguel Santos',
      hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
      featured: true,
      averageRating: 4.8,
      totalReviews: 23,
      membershipRequired: 'free' as const,
      requiresApproval: false
    },
    {
      id: 'demo-event-2',
      title: 'Portuguese Language Exchange & Cocktails',
      description: 'Practice your Portuguese while enjoying creative cocktails inspired by Portuguese culture.',
      date: '2025-08-20',
      time: '18:00',
      endTime: '22:00',
      location: 'Bar Elixir, Battersea',
      maxAttendees: 45,
      currentAttendees: 31,
      category: 'Language Exchange',
      price: 8,
      currency: 'GBP',
      imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&auto=format',
      hostName: 'Joana Ribeiro',
      hostImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=100&h=100&fit=crop&crop=face&auto=format',
      featured: false,
      averageRating: 4.6,
      totalReviews: 18
    },
    {
      id: 'demo-event-3',
      title: 'Portuguese Book Club - "O Guarani"',
      description: 'Discussing José de Alencar\'s classic with fellow Portuguese literature lovers.',
      date: '2025-08-18',
      time: '18:30',
      endTime: '20:30',
      location: 'Champor-Champor Restaurant',
      maxAttendees: 15,
      currentAttendees: 12,
      category: 'Books & Reading',
      price: 25,
      currency: 'GBP',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format',
      hostName: 'Ana Pereira',
      hostImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format',
      featured: false,
      averageRating: 4.9,
      totalReviews: 8,
      requiresApproval: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
              >
                LusoTown {isPortuguese ? 'Demonstração' : 'Demo'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 mb-8"
              >
                {isPortuguese 
                  ? 'Experimenta as novas funcionalidades: Feed de Eventos em tempo real e Sistema de Carrinho/Reservas'
                  : 'Try out the new features: Live Event Feed and Shopping Cart/Reservation System'
                }
              </motion.p>
              
              {/* Feature Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <CalendarDaysIcon className="w-8 h-8 text-primary-500" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600">150+</div>
                  <div className="text-sm text-gray-600">{isPortuguese ? 'Eventos Ativos' : 'Active Events'}</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <ShoppingCartIcon className="w-8 h-8 text-secondary-500" />
                  </div>
                  <div className="text-2xl font-bold text-secondary-600">{cartCount}</div>
                  <div className="text-sm text-gray-600">{isPortuguese ? 'No Carrinho' : 'In Cart'}</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <HeartIcon className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">{savedCount}</div>
                  <div className="text-sm text-gray-600">{isPortuguese ? 'Guardados' : 'Saved'}</div>
                </div>
              </motion.div>

              {/* Demo Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setActiveDemo('feed')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'feed'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isPortuguese ? '📱 Feed de Eventos' : '📱 Event Feed'}
                </button>
                <button
                  onClick={() => setActiveDemo('cart')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'cart'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isPortuguese ? '🛒 Sistema de Carrinho' : '🛒 Cart System'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Content */}
        <section className="py-12">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
              {activeDemo === 'feed' ? (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Feed de Eventos em Tempo Real' : 'Live Event Feed'}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {isPortuguese 
                        ? 'Mantém-te atualizado com as últimas atividades, fotos e atualizações de eventos da comunidade portuguesa'
                        : 'Stay updated with the latest event activities, photos, and updates from the Portuguese community'
                      }
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {isPortuguese ? 'Funcionalidades do Feed' : 'Feed Features'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {isPortuguese ? 'Atualizações em tempo real' : 'Real-time updates'}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          {isPortuguese ? 'Fotos e comentários' : 'Photos and comments'}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          {isPortuguese ? 'Reações interativas' : 'Interactive reactions'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="max-h-[600px] overflow-y-auto">
                      <EventFeed limit={3} />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Sistema de Carrinho e Reservas' : 'Cart & Reservation System'}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {isPortuguese 
                        ? 'Adiciona eventos ao carrinho, guarda favoritos, e faz reservas facilmente'
                        : 'Add events to cart, save favorites, and make reservations easily'
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {sampleEvents.map((event) => (
                      <EventCard key={event.id} {...event} />
                    ))}
                  </div>

                  {/* Feature Highlights */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {isPortuguese ? 'Funcionalidades do Sistema' : 'System Features'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <ShoppingCartIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {isPortuguese ? 'Carrinho Inteligente' : 'Smart Cart'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese 
                            ? 'Expiração automática e validação de vagas'
                            : 'Auto-expiry and spot validation'
                          }
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <HeartIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {isPortuguese ? 'Favoritos Organizados' : 'Organized Favorites'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese 
                            ? 'Guarda e organiza por tipo e categoria'
                            : 'Save and organize by type and category'
                          }
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <CalendarDaysIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {isPortuguese ? 'Reservas Seguras' : 'Secure Reservations'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese 
                            ? 'Confirmação automática e códigos únicos'
                            : 'Auto-confirmation and unique codes'
                          }
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <UserGroupIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {isPortuguese ? 'Gestão de Grupos' : 'Group Management'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {isPortuguese 
                            ? 'Reservas para múltiplas pessoas'
                            : 'Multi-person reservations'
                          }
                        </p>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                      <button
                        onClick={() => setIsCartOpen(true)}
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                        {isPortuguese ? 'Abrir Carrinho de Compras' : 'Open Shopping Cart'}
                        {cartCount > 0 && (
                          <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </button>
                      
                      <p className="mt-4 text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Experimenta adicionar alguns eventos ao carrinho usando os botões acima!'
                          : 'Try adding some events to your cart using the buttons above!'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}