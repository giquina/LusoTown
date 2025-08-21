'use client'

import { CartItem } from '@/context/CartContext'
import { toast } from 'react-hot-toast'

// Service types for cart integration
export interface PremiumServiceForCart {
  id: string
  name: string
  namePortuguese: string
  price: number
  maxPrice: number
  priceUnit: string
  priceUnitPortuguese: string
  description: string
  descriptionPortuguese: string
  image: string
  category: string
  rating: number
}

// Convert premium service to cart item
export function createServiceCartItem(
  service: PremiumServiceForCart,
  isPortuguese: boolean,
  customizations?: {
    selectedDate?: string
    selectedTime?: string
    location?: string
    participants?: number
    specialRequests?: string
  }
): CartItem {
  return {
    id: `service-${service.id}-${Date.now()}`,
    type: 'premium_service',
    title: isPortuguese ? service.namePortuguese : service.name,
    description: isPortuguese ? service.descriptionPortuguese : service.description,
    price: service.price,
    currency: 'GBP',
    imageUrl: service.image,
    quantity: 1,
    maxQuantity: 10,
    
    // Service-specific fields
    serviceType: service.category,
    
    // Event-like fields for services with time components
    eventDate: customizations?.selectedDate,
    eventTime: customizations?.selectedTime,
    eventLocation: customizations?.location,
    
    // Additional metadata
    addedAt: new Date().toISOString(),
    metadata: {
      serviceId: service.id,
      participants: customizations?.participants,
      specialRequests: customizations?.specialRequests,
      priceUnit: isPortuguese ? service.priceUnitPortuguese : service.priceUnit,
      maxPrice: service.maxPrice,
      rating: service.rating
    }
  }
}

// Add service to cart with subscription check
export function addServiceToCart(
  service: PremiumServiceForCart,
  addToCart: (item: CartItem) => void,
  isPortuguese: boolean,
  customizations?: Parameters<typeof createServiceCartItem>[2]
) {
  // Check subscription status for premium services
  const hasSubscription = localStorage.getItem('lusotown-subscription') === 'active'
  
  if (!hasSubscription) {
    toast.error(
      isPortuguese 
        ? 'Subscrição necessária para serviços premium'
        : 'Subscription required for premium services'
    )
    return false
  }

  const cartItem = createServiceCartItem(service, isPortuguese, customizations)
  addToCart(cartItem)
  
  toast.success(
    isPortuguese 
      ? `${service.namePortuguese} adicionado ao carrinho`
      : `${service.name} added to cart`
  )
  
  return true
}

// Calculate service pricing with potential discounts
export function calculateServicePrice(
  service: PremiumServiceForCart,
  quantity: number = 1,
  membershipTier: 'free' | 'core' | 'premium' = 'free'
): {
  basePrice: number
  discount: number
  finalPrice: number
  savings: number
} {
  const basePrice = service.price * quantity
  
  // Membership discounts
  const discountRates = {
    free: 0,
    core: 0.05, // 5% discount
    premium: 0.10 // 10% discount
  }
  
  const discountRate = discountRates[membershipTier]
  const discount = basePrice * discountRate
  const finalPrice = basePrice - discount
  const savings = discount
  
  return {
    basePrice,
    discount,
    finalPrice,
    savings
  }
}