'use client'

import { useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon as CartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import Cart from '@/components/Cart'

export default function CartButton() {
  const { cartCount, cartItems } = useCart()
  const { language } = useLanguage()
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  const isPortuguese = language === 'pt-pt' || language === 'pt-br'

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-gray-600 hover:text-primary-500 transition-colors group"
        title={isPortuguese ? 'Carrinho de Compras' : 'Shopping Cart'}
      >
        {cartCount > 0 ? (
          <CartSolidIcon className="w-6 h-6 text-primary-500" />
        ) : (
          <ShoppingCartIcon className="w-6 h-6" />
        )}
        
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold animate-pulse">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {cartCount > 0 
            ? `${cartCount} ${isPortuguese ? (cartCount === 1 ? 'item' : 'itens') : (cartCount === 1 ? 'item' : 'items')}`
            : (isPortuguese ? 'Carrinho vazio' : 'Empty cart')
          }
        </div>
      </button>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}