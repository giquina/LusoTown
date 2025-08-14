'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import {
  ShoppingCartIcon,
  XMarkIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CreditCardIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { ShoppingCartIcon as CartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { toast } from 'react-hot-toast'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    addToSaved,
    createReservation 
  } = useCart()
  const { language } = useLanguage()
  const [processingCheckout, setProcessingCheckout] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  
  const isPortuguese = language === 'pt-pt' || language === 'pt-br'

  const formatPrice = (price: number, currency: string = 'GBP') => {
    const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'
    return `${symbol}${price.toFixed(2)}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const toggleItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const handleSaveForLater = (item: typeof cartItems[0]) => {
    addToSaved({
      type: item.type,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.eventCategory || item.businessCategory,
      eventDate: item.eventDate,
      eventTime: item.eventTime,
      eventLocation: item.eventLocation,
      eventPrice: item.price,
      businessName: item.businessName,
      businessLocation: item.eventLocation,
      metadata: item.metadata
    })
    removeFromCart(item.id)
  }

  const handleCreateReservation = async (item: typeof cartItems[0]) => {
    if (item.type === 'event') {
      const result = await createReservation({
        itemId: item.id,
        itemType: 'event',
        quantity: item.quantity
      })
      
      if (result.success) {
        // Show success in UI
      }
    }
  }

  const handleCheckout = async () => {
    setProcessingCheckout(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For events, create reservations
      const eventItems = cartItems.filter(item => item.type === 'event')
      for (const eventItem of eventItems) {
        await handleCreateReservation(eventItem)
      }
      
      // Clear cart after successful checkout
      clearCart()
      onClose()
      
      toast.success(isPortuguese 
        ? 'Pagamento processado! Receberás confirmações por email.' 
        : 'Payment processed! You\'ll receive confirmations by email.', {
        icon: '✅',
        duration: 5000
      })
      
    } catch (error) {
      toast.error(isPortuguese 
        ? 'Erro no processamento. Tenta novamente.'
        : 'Processing error. Please try again.')
    } finally {
      setProcessingCheckout(false)
    }
  }

  const getItemWarnings = (item: typeof cartItems[0]) => {
    const warnings: string[] = []
    
    if (item.type === 'event') {
      // Check if event is soon
      if (item.eventDate) {
        const eventDate = new Date(item.eventDate)
        const now = new Date()
        const daysUntilEvent = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysUntilEvent <= 3) {
          warnings.push(isPortuguese 
            ? `Evento em ${daysUntilEvent} dias`
            : `Event in ${daysUntilEvent} days`)
        }
      }
      
      // Check spots availability
      if (item.spotsLeft !== undefined && item.spotsLeft <= 5) {
        warnings.push(isPortuguese 
          ? `Apenas ${item.spotsLeft} vagas restantes`
          : `Only ${item.spotsLeft} spots left`)
      }
      
      // Check membership requirements
      if (item.membershipRequired && item.membershipRequired !== 'free') {
        warnings.push(isPortuguese 
          ? `Requer membership ${item.membershipRequired}`
          : `Requires ${item.membershipRequired} membership`)
      }
      
      // Check if requires approval
      if (item.requiresApproval) {
        warnings.push(isPortuguese 
          ? 'Requer aprovação do organizador'
          : 'Requires host approval')
      }
    }
    
    // Check expiration
    if (item.expiresAt) {
      const expiresAt = new Date(item.expiresAt)
      const now = new Date()
      if (expiresAt > now) {
        const minutesLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60))
        if (minutesLeft <= 60) {
          warnings.push(isPortuguese 
            ? `Expira em ${minutesLeft} min`
            : `Expires in ${minutesLeft} min`)
        }
      }
    }
    
    return warnings
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <CartSolidIcon className="h-7 w-7 text-primary-500" />
                            {cartCount > 0 && (
                              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                              </span>
                            )}
                          </div>
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {isPortuguese ? 'Carrinho de Compras' : 'Shopping Cart'}
                          </Dialog.Title>
                        </div>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length === 0 ? (
                            <div className="text-center py-12">
                              <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {isPortuguese ? 'Carrinho vazio' : 'Empty cart'}
                              </h3>
                              <p className="text-gray-500">
                                {isPortuguese 
                                  ? 'Adiciona alguns eventos ou serviços para começar!'
                                  : 'Add some events or services to get started!'
                                }
                              </p>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((item) => {
                                const warnings = getItemWarnings(item)
                                const isExpanded = expandedItems.has(item.id)
                                
                                return (
                                  <motion.li 
                                    key={item.id} 
                                    className="flex py-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                  >
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                      {item.imageUrl ? (
                                        <img
                                          src={item.imageUrl}
                                          alt={item.title}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                          {item.type === 'event' ? (
                                            <CalendarDaysIcon className="w-8 h-8 text-primary-500" />
                                          ) : (
                                            <ShoppingCartIcon className="w-8 h-8 text-gray-400" />
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3 className="line-clamp-2 text-sm font-semibold">
                                            {item.title}
                                          </h3>
                                          <p className="ml-4 font-bold text-primary-600">
                                            {formatPrice(item.price * item.quantity, item.currency)}
                                          </p>
                                        </div>
                                        
                                        {/* Event Details */}
                                        {item.type === 'event' && (
                                          <div className="mt-2 space-y-1">
                                            {item.eventDate && (
                                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <CalendarDaysIcon className="w-3 h-3" />
                                                <span>{formatDate(item.eventDate)} • {item.eventTime}</span>
                                              </div>
                                            )}
                                            {item.eventLocation && (
                                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <MapPinIcon className="w-3 h-3" />
                                                <span className="truncate">{item.eventLocation}</span>
                                              </div>
                                            )}
                                            {item.eventCategory && (
                                              <span className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                                                {item.eventCategory}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                        
                                        {/* Warnings */}
                                        {warnings.length > 0 && (
                                          <div className="mt-2 space-y-1">
                                            {warnings.map((warning, index) => (
                                              <div key={index} className="flex items-center gap-1 text-xs text-amber-600">
                                                <ExclamationTriangleIcon className="w-3 h-3" />
                                                <span>{warning}</span>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                      
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                          {/* Quantity Controls */}
                                          <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                              className="p-1 text-gray-400 hover:text-gray-600"
                                            >
                                              <MinusIcon className="w-4 h-4" />
                                            </button>
                                            <span className="px-3 py-1 text-sm font-medium">
                                              {item.quantity}
                                            </span>
                                            <button
                                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                              className="p-1 text-gray-400 hover:text-gray-600"
                                              disabled={item.maxQuantity && item.quantity >= item.maxQuantity}
                                            >
                                              <PlusIcon className="w-4 h-4" />
                                            </button>
                                          </div>
                                          
                                          <div className="text-xs text-gray-500">
                                            {formatPrice(item.price, item.currency)} {isPortuguese ? 'cada' : 'each'}
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          {/* Save for Later */}
                                          <button
                                            type="button"
                                            onClick={() => handleSaveForLater(item)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title={isPortuguese ? 'Guardar para mais tarde' : 'Save for later'}
                                          >
                                            <HeartIcon className="w-4 h-4" />
                                          </button>
                                          
                                          {/* Remove */}
                                          <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title={isPortuguese ? 'Remover' : 'Remove'}
                                          >
                                            <TrashIcon className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer with Checkout */}
                    {cartItems.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        {/* Summary */}
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>{isPortuguese ? 'Subtotal' : 'Subtotal'}</p>
                            <p>{formatPrice(cartTotal)}</p>
                          </div>
                          
                          <div className="flex justify-between text-sm text-gray-500">
                            <p>{isPortuguese ? 'Itens' : 'Items'}</p>
                            <p>{cartCount}</p>
                          </div>
                          
                          <p className="text-sm text-gray-500">
                            {isPortuguese 
                              ? 'Taxas e custos de processamento calculados no checkout.'
                              : 'Shipping and taxes calculated at checkout.'}
                          </p>
                        </div>
                        
                        {/* Clear Cart */}
                        <button
                          onClick={clearCart}
                          className="w-full mb-3 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                          {isPortuguese ? 'Limpar Carrinho' : 'Clear Cart'}
                        </button>
                        
                        {/* Checkout Button */}
                        <button
                          onClick={handleCheckout}
                          disabled={processingCheckout}
                          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processingCheckout ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              {isPortuguese ? 'Processando...' : 'Processing...'}
                            </>
                          ) : (
                            <>
                              <CreditCardIcon className="w-5 h-5" />
                              {isPortuguese ? 'Finalizar Compra' : 'Checkout'}
                            </>
                          )}
                        </button>
                        
                        <p className="mt-2 text-center text-xs text-gray-500">
                          {isPortuguese 
                            ? 'Pagamento seguro • Confirmação por email'
                            : 'Secure payment • Email confirmation'}
                        </p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}