'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EventCard from '@/components/EventCard'
import ImprovedEventCard from '@/components/ImprovedEventCard'
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
  const [activeDemo, setActiveDemo] = useState<'feed' | 'cart' | 'preview'>('feed')
  
  const isPortuguese = language === 'pt'

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

  // Premium events for preview demo
  const premiumEvents = [
    {
      id: 'premium-event-1',
      title: 'Exclusive Fado Night with Maria do Rosário',
      description: 'An intimate evening with renowned fadista Maria do Rosário, featuring traditional Portuguese Fado music in an exclusive venue for LusoTown Family members only.',
      date: '2025-08-25',
      time: '19:30',
      endTime: '23:00',
      location: 'Ronnie Scott\'s Jazz Club',
      address: '47 Frith St, Soho, London W1D 4HT',
      maxAttendees: 40,
      currentAttendees: 8,
      category: 'Cultural',
      price: 65,
      currency: 'GBP',
      images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format'],
      hostName: 'Miguel Santos',
      hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
      featured: true,
      averageRating: 4.9,
      totalReviews: 15,
      membershipRequired: 'premium' as const,
      requiresApproval: false,
      tags: ['Fado', 'Music', 'Traditional', 'Portuguese Culture', 'Exclusive'],
      verifiedEvent: true
    },
    {
      id: 'premium-event-2',
      title: 'Portuguese Wine Tasting: Douro Valley Collection',
      description: 'Guided tasting of premium Douro wines with Portuguese sommelier João Santos. Learn about Portuguese winemaking traditions while enjoying artisanal cheeses.',
      date: '2025-08-27',
      time: '18:00',
      endTime: '21:00',
      location: 'Berry Bros. & Rudd',
      address: '3 St James\'s St, St. James\'s, London SW1A 1EG',
      maxAttendees: 25,
      currentAttendees: 3,
      category: 'Food & Drink',
      price: 75,
      currency: 'GBP',
      images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop&auto=format'],
      hostName: 'João Santos',
      hostImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
      featured: true,
      averageRating: 5.0,
      totalReviews: 12,
      membershipRequired: 'premium' as const,
      requiresApproval: true,
      tags: ['Wine', 'Tasting', 'Douro', 'Portuguese Wines', 'Premium'],
      verifiedEvent: true
    },
    {
      id: 'community-event-1',
      title: 'Portuguese Business Networking Breakfast',
      description: 'Connect with Portuguese entrepreneurs and professionals over a traditional Portuguese breakfast. Share experiences and build meaningful business connections.',
      date: '2025-08-23',
      time: '08:00',
      endTime: '10:30',
      location: 'The Shard - Level 31',
      address: '31 Thomas St, London SE1 9RY',
      maxAttendees: 50,
      currentAttendees: 15,
      category: 'Business',
      price: 35,
      currency: 'GBP',
      images: ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&auto=format'],
      hostName: 'Carlos Rodrigues',
      hostImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face&auto=format',
      featured: false,
      averageRating: 4.7,
      totalReviews: 23,
      membershipRequired: 'core' as const,
      requiresApproval: false,
      tags: ['Business', 'Networking', 'Breakfast', 'Entrepreneurs', 'Community'],
      verifiedEvent: true
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
                <button
                  onClick={() => setActiveDemo('preview')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeDemo === 'preview'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isPortuguese ? '👑 Sistema de Prévia' : '👑 Preview System'}
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
                          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
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
              ) : activeDemo === 'cart' ? (
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
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Sistema de Prévia de Valor da Comunidade Portuguesa' : 'Portuguese Community Value Preview System'}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {isPortuguese 
                        ? 'Mostra aos utilizadores gratuitos o valor da adesão premium através de pré-visualizações de conteúdo exclusivo'
                        : 'Shows free users the value of premium membership through exclusive content previews'
                      }
                    </p>
                  </div>

                  {/* Preview Demo Info */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6 mb-8">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? 'Demonstração: Como utilizador gratuito' : 'Demo: As a free user'}
                      </h3>
                      <p className="text-gray-600">
                        {isPortuguese 
                          ? 'Os eventos abaixo mostram como os utilizadores gratuitos vêem eventos premium com sobreposições de prévia'
                          : 'The events below show how free users see premium events with preview overlays'
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-premium-500 rounded-full"></span>
                        {isPortuguese ? 'Eventos premium com prévia' : 'Premium events with preview'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                        {isPortuguese ? 'Botões de upgrade para adesão' : 'Upgrade to membership buttons'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                        {isPortuguese ? 'Benefícios de membro destacados' : 'Member benefits highlighted'}
                      </div>
                    </div>
                  </div>

                  {/* Premium Events with Preview Overlays */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {premiumEvents.map((event, index) => (
                      <ImprovedEventCard 
                        key={event.id} 
                        event={event}
                        showPreviewOverlay={true} // Always show preview overlay for this demo
                        onUpgrade={() => alert(isPortuguese ? 'Redirecionamento para página de adesão!' : 'Redirect to membership page!')}
                      />
                    ))}
                  </div>

                  {/* Benefits Explanation */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      {isPortuguese ? 'Como o Sistema de Prévia Funciona' : 'How the Preview System Works'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-4">
                          {isPortuguese ? 'Para Utilizadores Gratuitos:' : 'For Free Users:'}
                        </h4>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Vêem pré-visualizações de eventos premium' : 'See previews of premium events'}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Sobreposições com benefícios de adesão' : 'Overlays showing membership benefits'}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Botões claros para fazer upgrade' : 'Clear upgrade call-to-action buttons'}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Informações sobre preços e disponibilidade' : 'Pricing and availability information'}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-4">
                          {isPortuguese ? 'Benefícios Esperados:' : 'Expected Benefits:'}
                        </h4>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Aumento de 15-25% nas conversões' : '15-25% increase in conversions'}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Maior compreensão do valor da adesão' : 'Better understanding of membership value'}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Redução da taxa de abandono' : 'Reduced abandonment rate'}</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{isPortuguese ? 'Experiência mais envolvente' : 'More engaging user experience'}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                      <p className="text-gray-600 mb-4">
                        {isPortuguese 
                          ? 'Clique nos eventos acima para ver como funciona o sistema de prévia!'
                          : 'Click on the events above to see how the preview system works!'
                        }
                      </p>
                      <button
                        onClick={() => window.location.href = '/events'}
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        {isPortuguese ? 'Ver Sistema Completo nos Eventos' : 'See Full System in Events'}
                      </button>
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