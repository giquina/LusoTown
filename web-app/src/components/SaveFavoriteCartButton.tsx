'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartIcon,
  ShoppingCartIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, ShoppingCartIcon as CartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { useAuthRequired } from '@/hooks/useAuthRequired'
import { toast } from 'react-hot-toast'
import { getButtonStyles, cn, Typography, Spacing, IconSystem } from '@/lib/design'

interface SaveFavoriteCartButtonProps {
  // Item identification
  itemId: string
  itemType: 'event' | 'business' | 'feed' | 'group'
  
  // Item details for saving/cart
  title: string
  description?: string
  imageUrl?: string
  category?: string
  
  // Event-specific fields
  eventDate?: string
  eventTime?: string
  eventLocation?: string
  eventPrice?: number
  spotsLeft?: number
  maxQuantity?: number
  requiresApproval?: boolean
  membershipRequired?: 'free' | 'core' | 'premium'
  
  // Business-specific fields
  businessName?: string
  businessRating?: number
  businessLocation?: string
  
  // Display options
  showSave?: boolean
  showCart?: boolean
  layout?: 'horizontal' | 'vertical' | 'compact'
  size?: 'small' | 'medium' | 'large'
  iconOnly?: boolean
  
  // Styling
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
  
  // Callbacks
  onSaved?: () => void
  onAddedToCart?: () => void
}

export default function SaveFavoriteCartButton({
  itemId,
  itemType,
  title,
  description,
  imageUrl,
  category,
  eventDate,
  eventTime,
  eventLocation,
  eventPrice = 0,
  spotsLeft,
  maxQuantity,
  requiresApproval = false,
  membershipRequired = 'free',
  businessName,
  businessRating,
  businessLocation,
  showSave = true,
  showCart = true,
  layout = 'horizontal',
  size = 'medium',
  iconOnly = false,
  className = '',
  variant = 'default',
  onSaved,
  onAddedToCart
}: SaveFavoriteCartButtonProps) {
  const { 
    isSaved, 
    toggleSaved, 
    isInCart, 
    addToCart,
    cartCount 
  } = useCart()
  const { t } = useLanguage()
  const { requireAuthForCart } = useAuthRequired()
  
  const [isAnimating, setIsAnimating] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const itemSaved = isSaved(title)
  const itemInCart = isInCart(title)
  const canAddToCart = itemType === 'event' && eventPrice !== undefined

  const handleSave = () => {
    setIsAnimating(true)
    
    const savedItem = {
      type: itemType,
      title,
      description,
      imageUrl,
      category,
      eventDate,
      eventTime,
      eventLocation,
      eventPrice,
      businessName,
      businessRating,
      businessLocation,
      metadata: {
        itemId,
        spotsLeft,
        requiresApproval,
        membershipRequired
      }
    }
    
    toggleSaved(savedItem)
    
    // Show success animation
    setTimeout(() => {
      setIsAnimating(false)
      onSaved?.()
    }, 500)
    
    // Toast notification
    toast.success(
      itemSaved ? t('favorites.removed') : t('favorites.added'),
      {
        icon: itemSaved ? '💔' : '❤️',
        duration: 2000
      }
    )
  }

  const handleAddToCart = () => {
    if (!canAddToCart) return
    
    if (itemInCart) {
      toast.error(t('cart.already-in-cart', 'Already in cart'))
      return
    }
    
    // Check availability for events
    if (itemType === 'event' && spotsLeft !== undefined && spotsLeft <= 0) {
      toast.error(t('event.full'))
      return
    }
    
    const cartItem = {
      type: 'event' as const,
      title,
      description,
      price: eventPrice || 0,
      currency: 'GBP',
      imageUrl,
      eventDate,
      eventTime,
      eventLocation,
      eventCategory: category,
      spotsLeft,
      maxQuantity,
      requiresApproval,
      membershipRequired,
      metadata: {
        itemId
      }
    }
    
    const addToCartAction = () => {
      setIsAnimating(true)
      
      addToCart(cartItem)
      
      setTimeout(() => {
        setIsAnimating(false)
        onAddedToCart?.()
      }, 500)
    }

    // Use auth-required hook - will show popup if not authenticated
    requireAuthForCart(addToCartAction, itemId, title, cartItem)
  }

  // Use design system sizing
  const getSizeClasses = () => {
    if (iconOnly) {
      return cn(Spacing.touchTarget, 'rounded-lg')
    }
    // For buttons with text, use design system sizes
    return '' // Size handled by getButtonStyles
  }

  // Use unified button system
  const getVariantClasses = (active: boolean) => {
    if (iconOnly) {
      return cn(
        'transition-all duration-200 rounded-lg flex items-center justify-center relative',
        active ? 'bg-primary-100 text-primary-600' : 'bg-white hover:bg-secondary-50 text-secondary-600 shadow-sm border border-secondary-200'
      )
    }
    
    // Map our variants to design system variants
    const designVariant = variant === 'outline' ? 'outline' : 
                         variant === 'ghost' ? 'ghost' : 
                         active ? 'primary' : 'secondary'
    
    return getButtonStyles(designVariant as any, size as any)
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex-col gap-2'
      case 'compact':
        return 'gap-1'
      default:
        return 'gap-3'
    }
  }

  if (!showSave && !showCart) {
    return null
  }

  return (
    <div className={`flex items-center ${getLayoutClasses()} ${className}`}>
      {/* Save/Favorite Button */}
      {showSave && (
        <div className="relative flex-1">
          <button
            onClick={handleSave}
            onMouseEnter={() => setShowTooltip(itemSaved ? t('favorites.remove') : t('favorites.save'))}
            onMouseLeave={() => setShowTooltip(null)}
            className={`${getSizeClasses()} ${getVariantClasses(itemSaved)} group w-full`}
            title={itemSaved ? t('favorites.remove') : t('favorites.save')}
          >
            <AnimatePresence mode="wait">
              {isAnimating && !itemSaved ? (
                <motion.div
                  key="saving"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 bg-coral-500 text-white rounded-lg flex items-center justify-center"
                >
                  <HeartSolidIcon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="heart"
                  initial={false}
                  animate={{ scale: itemSaved ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {itemSaved ? (
                    <HeartSolidIcon className={cn(IconSystem.sizes.md, 'text-coral-500')} />
                  ) : (
                    <HeartIcon className={cn(IconSystem.sizes.md, 'group-hover:text-coral-500')} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {!iconOnly && (
              <span className={cn('ml-2', Typography.button)}>
                {itemSaved ? t('favorites.saved') : t('favorites.save')}
              </span>
            )}
          </button>
          
          {/* Save Tooltip */}
          {showTooltip && (
            <div className="absolute -top-8 left-1/2 transform -transecondary-x-1/2 bg-secondary-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              {showTooltip}
            </div>
          )}
        </div>
      )}

      {/* Add to Cart Button */}
      {showCart && canAddToCart && (
        <div className="relative flex-1">
          <button
            onClick={handleAddToCart}
            onMouseEnter={() => setShowTooltip(itemInCart ? t('cart.in-cart', 'In Cart') : t('cart.add-to-cart'))}
            onMouseLeave={() => setShowTooltip(null)}
            disabled={itemInCart || (spotsLeft !== undefined && spotsLeft <= 0)}
            className={`${getSizeClasses()} ${getVariantClasses(itemInCart)} group disabled:opacity-50 disabled:cursor-not-allowed w-full ${className}`}
            title={itemInCart ? t('cart.in-cart', 'In Cart') : t('cart.add-to-cart')}
          >
            <AnimatePresence mode="wait">
              {isAnimating ? (
                <motion.div
                  key="adding"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute inset-0 bg-primary-500 text-white rounded-lg flex items-center justify-center"
                >
                  <CheckIcon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={false}
                  animate={{ scale: itemInCart ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {itemInCart ? (
                    <CartSolidIcon className={cn(IconSystem.sizes.md, 'text-primary-600')} />
                  ) : (
                    <ShoppingCartIcon className={cn(IconSystem.sizes.md, 'group-hover:text-primary-600')} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {!iconOnly && (
              <span className={cn('ml-2', Typography.button)}>
                {itemInCart ? t('cart.added') : 
                 spotsLeft !== undefined && spotsLeft <= 0 ? t('event.full') :
                 t('cart.add-to-cart')}
              </span>
            )}
            
            {/* Cart count indicator */}
            {itemInCart && cartCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold">
                {cartCount > 99 ? '99+' : cartCount}
              </div>
            )}
          </button>
          
          {/* Warnings */}
          {spotsLeft !== undefined && spotsLeft <= 3 && spotsLeft > 0 && (
            <div className="absolute -bottom-6 left-1/2 transform -transecondary-x-1/2 text-xs text-orange-600 whitespace-nowrap flex items-center gap-1">
              <ExclamationTriangleIcon className={IconSystem.sizes.xs} />
              {spotsLeft} {t('event.spots-left')}
            </div>
          )}
          
          {/* Cart Tooltip */}
          {showTooltip && (
            <div className="absolute -top-8 left-1/2 transform -transecondary-x-1/2 bg-secondary-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              {showTooltip}
            </div>
          )}
        </div>
      )}
    </div>
  )
}