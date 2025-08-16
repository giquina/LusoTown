'use client'

import { useState, useEffect } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon as CartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { isAuthenticated, useAuthState } from '@/lib/auth'
import Cart from '@/components/Cart'

export default function CartButton() {
  const { cartCount, cartItems } = useCart()
  const { language } = useLanguage()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const isPortuguese = language === 'pt'

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
  }, [])

  useEffect(() => {
    const unsubscribe = useAuthState((user) => {
      setIsLoggedIn(!!user)
    })
    return unsubscribe
  }, [])

  // Don't render if user is not authenticated
  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-3 text-gray-600 hover:text-primary-500 transition-colors group min-h-[44px] min-w-[44px] flex items-center justify-center"
        title={isPortuguese ? 'Carrinho de Compras' : 'Shopping Cart'}
      >
        {cartCount > 0 ? (
          <CartSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
        ) : (
          <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
        
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-action-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold animate-pulse">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
        
        {/* Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          {cartCount > 0 
            ? `${cartCount} ${isPortuguese ? (cartCount === 1 ? 'item' : 'itens') : (cartCount === 1 ? 'item' : 'items')}`
            : (isPortuguese ? 'Carrinho vazio' : 'Empty cart')
          }
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </button>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}