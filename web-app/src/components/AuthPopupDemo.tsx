'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCartIcon, 
  EyeIcon, 
  UserIcon,
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useAuthRequired } from '@/hooks/useAuthRequired'
import { useLanguage } from '@/context/LanguageContext'
import { isAuthenticated, logout } from '@/lib/auth'
import { toast } from 'react-hot-toast'

export default function AuthPopupDemo() {
  const { requireAuthForCart, requireAuthForDetails } = useAuthRequired()
  const { language } = useLanguage()
  const [demoStep, setDemoStep] = useState(1)
  
  const isPortuguese = language === 'pt'
  const userAuthenticated = isAuthenticated()
  
  const demoEvent = {
    id: 'demo-event-1',
    title: isPortuguese ? 'Noite de Fado em Camden' : 'Fado Night in Camden',
    description: isPortuguese ? 
      'Uma noite autêntica de fado com artistas portugueses renomados' :
      'An authentic fado night with renowned Portuguese artists',
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    date: '2024-12-15',
    time: '19:30',
    location: 'Camden Arts Centre, London'
  }
  
  const cartItemData = {
    type: 'event' as const,
    title: demoEvent.title,
    description: demoEvent.description,
    price: demoEvent.price,
    currency: 'GBP',
    imageUrl: demoEvent.imageUrl,
    eventDate: demoEvent.date,
    eventTime: demoEvent.time,
    eventLocation: demoEvent.location,
    eventCategory: 'Cultural',
    spotsLeft: 15,
    requiresApproval: false,
    membershipRequired: 'free' as const,
    maxQuantity: 4,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    metadata: {
      featured: true,
      demo: true
    }
  }
  
  const handleDemoAddToCart = () => {
    const addToCartAction = () => {
      toast.success(
        isPortuguese ? 
          'Item adicionado ao carrinho com sucesso!' : 
          'Item added to cart successfully!',
        { icon: '🛒', duration: 3000 }
      )
      setDemoStep(3)
    }
    
    requireAuthForCart(addToCartAction, demoEvent.id, demoEvent.title, cartItemData)
  }
  
  const handleDemoViewDetails = () => {
    const viewDetailsAction = () => {
      toast.success(
        isPortuguese ? 
          'Redirecionando para detalhes do evento...' : 
          'Redirecting to event details...',
        { icon: '👀', duration: 3000 }
      )
      setDemoStep(3)
    }
    
    requireAuthForDetails(viewDetailsAction, demoEvent.id, `/events/${demoEvent.id}`)
  }
  
  const handleLogout = async () => {
    try {
      await logout()
      toast.success(isPortuguese ? 'Logout realizado com sucesso' : 'Logged out successfully')
      setDemoStep(1)
    } catch (error) {
      toast.error(isPortuguese ? 'Erro no logout' : 'Logout error')
    }
  }
  
  const resetDemo = () => {
    setDemoStep(1)
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center shadow-lg">
            <HeartIcon className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">LusoTown</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Demonstração do Sistema de Autenticação' : 'Authentication Popup System Demo'}
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isPortuguese ? 
            'Experimente como o sistema de popups de autenticação funciona quando utilizadores não autenticados tentam usar funcionalidades que requerem registo.' :
            'Experience how the authentication popup system works when non-authenticated users try to use features that require registration.'
          }
        </p>
      </div>
      
      {/* Authentication Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="w-8 h-8 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isPortuguese ? 'Estado da Autenticação' : 'Authentication Status'}
              </h3>
              <p className={`text-sm ${userAuthenticated ? 'text-green-600' : 'text-orange-600'}`}>
                {userAuthenticated ? 
                  (isPortuguese ? 'Utilizador autenticado' : 'User authenticated') :
                  (isPortuguese ? 'Utilizador não autenticado' : 'User not authenticated')
                }
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {userAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isPortuguese ? 'Logout' : 'Logout'}
              </button>
            )}
            <button
              onClick={resetDemo}
              className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
            >
              {isPortuguese ? 'Reiniciar Demo' : 'Reset Demo'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Demo Steps */}
      <div className="grid gap-6">
        {/* Step 1: Demo Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {isPortuguese ? 'Evento de Demonstração' : 'Demo Event'}
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Event Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                  <SparklesIcon className="w-12 h-12 text-primary-500" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {demoEvent.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-4">
                  {demoEvent.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>📅 {demoEvent.date} at {demoEvent.time}</div>
                  <div>📍 {demoEvent.location}</div>
                  <div>💷 £{demoEvent.price}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleDemoViewDetails}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-2 px-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    <EyeIcon className="w-4 h-4" />
                    {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                  </button>
                  
                  <button
                    onClick={handleDemoAddToCart}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                    {isPortuguese ? 'Adicionar' : 'Add to Cart'}
                  </button>
                </div>
              </div>
              
              {/* Instructions */}
              <div>
                <h5 className="text-lg font-semibold text-gray-900 mb-3">
                  {isPortuguese ? 'Como Testar' : 'How to Test'}
                </h5>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        {isPortuguese ? 'Certifique-se que não está autenticado' : 'Ensure you are not authenticated'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {isPortuguese ? 
                          'Se estiver logado, clique em "Logout" acima' :
                          'If logged in, click "Logout" above'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        {isPortuguese ? 'Clique em qualquer botão do evento' : 'Click any button on the event'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {isPortuguese ? 
                          '"Ver Detalhes" ou "Adicionar ao Carrinho"' :
                          '"View Details" or "Add to Cart"'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        {isPortuguese ? 'Observe o popup de autenticação' : 'Observe the authentication popup'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {isPortuguese ? 
                          'Diferentes botões mostram diferentes popups' :
                          'Different buttons show different popups'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Step 2: Expected Behavior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {isPortuguese ? 'Comportamento Esperado' : 'Expected Behavior'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                  <EyeIcon className="w-5 h-5" />
                  {isPortuguese ? 'Popup "Ver Detalhes"' : 'View Details Popup'}
                </h4>
                <ul className="text-sm text-primary-800 space-y-1">
                  <li>• {isPortuguese ? 'Informações completas do evento' : 'Complete event information'}</li>
                  <li>• {isPortuguese ? 'Detalhes de contacto do organizador' : 'Host contact details'}</li>
                  <li>• {isPortuguese ? 'Avaliações e fotos de membros' : 'Member reviews and photos'}</li>
                  <li>• {isPortuguese ? 'Preços exclusivos para membros' : 'Exclusive member pricing'}</li>
                </ul>
              </div>
              
              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                <h4 className="font-semibold text-secondary-900 mb-2 flex items-center gap-2">
                  <ShoppingCartIcon className="w-5 h-5" />
                  {isPortuguese ? 'Popup "Adicionar ao Carrinho"' : 'Add to Cart Popup'}
                </h4>
                <ul className="text-sm text-secondary-800 space-y-1">
                  <li>• {isPortuguese ? 'Guardar múltiplas experiências' : 'Save multiple experiences'}</li>
                  <li>• {isPortuguese ? 'Descontos exclusivos para membros' : 'Member-only discounts'}</li>
                  <li>• {isPortuguese ? 'Processo de checkout fácil' : 'Easy checkout process'}</li>
                  <li>• {isPortuguese ? 'Acompanhar reservas num só lugar' : 'Track bookings in one place'}</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-accent-50 to-premium-50 border border-accent-200 rounded-lg p-4">
              <h4 className="font-semibold text-accent-900 mb-3">
                {isPortuguese ? 'Funcionalidades do Sistema' : 'System Features'}
              </h4>
              <ul className="text-sm text-accent-800 space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRightIcon className="w-4 h-4 mt-0.5 text-accent-600" />
                  {isPortuguese ? 'Preservação da intenção do utilizador' : 'User intent preservation'}
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon className="w-4 h-4 mt-0.5 text-accent-600" />
                  {isPortuguese ? 'Restauro automático após registo' : 'Automatic restoration after signup'}
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon className="w-4 h-4 mt-0.5 text-accent-600" />
                  {isPortuguese ? 'Interface bilingue (EN/PT)' : 'Bilingual interface (EN/PT)'}
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon className="w-4 h-4 mt-0.5 text-accent-600" />
                  {isPortuguese ? 'Design responsivo e animações' : 'Responsive design and animations'}
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRightIcon className="w-4 h-4 mt-0.5 text-accent-600" />
                  {isPortuguese ? 'Estatísticas da comunidade portuguesa' : 'Portuguese community stats'}
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Step 3: Success Message */}
        {demoStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-900">
                  {isPortuguese ? 'Demo Concluída!' : 'Demo Completed!'}
                </h3>
                <p className="text-green-700">
                  {isPortuguese ? 
                    'O sistema de popups de autenticação está a funcionar corretamente.' :
                    'The authentication popup system is working correctly.'
                  }
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">
                {isPortuguese ? 'Próximos Passos' : 'Next Steps'}
              </h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isPortuguese ? 'Teste o registo completo no /signup' : 'Test full signup flow at /signup'}</li>
                <li>• {isPortuguese ? 'Verifique a restauração da intenção após autenticação' : 'Check intent restoration after authentication'}</li>
                <li>• {isPortuguese ? 'Experimente em diferentes dispositivos' : 'Try on different devices'}</li>
                <li>• {isPortuguese ? 'Teste com diferentes tipos de eventos' : 'Test with different event types'}</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}