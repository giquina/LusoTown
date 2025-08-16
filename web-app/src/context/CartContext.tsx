'use client'

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

export interface CartItem {
  id: string
  type: 'event' | 'business_service' | 'product' | 'transport_service'
  title: string
  description?: string
  price: number
  currency: string
  imageUrl?: string
  quantity: number
  maxQuantity?: number
  
  // Event-specific fields
  eventDate?: string
  eventTime?: string
  eventLocation?: string
  eventCategory?: string
  spotsLeft?: number
  requiresApproval?: boolean
  membershipRequired?: 'free' | 'core' | 'premium'
  
  // Business-specific fields
  businessName?: string
  businessCategory?: string
  serviceType?: string
  
  // Transport service fields
  transportServiceId?: string
  vehicleId?: string
  driverId?: string
  pickupDateTime?: string
  pickupLocation?: string
  dropoffLocation?: string
  hours?: number
  bookingType?: 'hourly' | 'day_rate' | 'block_booking' | 'airport_transfer'
  passengerCount?: number
  pricingBreakdown?: any
  
  // Additional metadata
  addedAt: string
  expiresAt?: string // For time-sensitive items
  metadata?: Record<string, any>
}

export interface SavedItem {
  id: string
  type: 'event' | 'business' | 'feed' | 'group'
  title: string
  description?: string
  imageUrl?: string
  category?: string
  savedAt: string
  metadata?: Record<string, any>
  
  // Event-specific
  eventDate?: string
  eventTime?: string
  eventLocation?: string
  eventPrice?: number
  
  // Business-specific
  businessName?: string
  businessRating?: number
  businessLocation?: string
}

export interface ReservationRequest {
  itemId: string
  itemType: 'event'
  quantity: number
  userNotes?: string
  dietaryRequirements?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

interface CartContextType {
  // Cart functionality
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (item: Omit<CartItem, 'id' | 'quantity' | 'addedAt'> & { quantity?: number }) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  
  // Saved items functionality
  savedItems: SavedItem[]
  savedCount: number
  addToSaved: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void
  removeFromSaved: (id: string) => void
  isSaved: (id: string) => boolean
  toggleSaved: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void
  
  // Reservations
  pendingReservations: ReservationRequest[]
  createReservation: (request: ReservationRequest) => Promise<{ success: boolean; message: string }>
  
  // Utility functions
  isInCart: (id: string) => boolean
  getCartItem: (id: string) => CartItem | undefined
  getSavedItem: (id: string) => SavedItem | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [pendingReservations, setPendingReservations] = useState<ReservationRequest[]>([])

  // Load from localStorage on mount with error handling
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lusotown-cart')
      const savedFavorites = localStorage.getItem('lusotown-saved')
      const savedReservations = localStorage.getItem('lusotown-reservations')
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        // Validate cart items structure
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart)
        }
      }
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites)
        // Validate saved items structure
        if (Array.isArray(parsedFavorites)) {
          setSavedItems(parsedFavorites)
        }
      }
      if (savedReservations) {
        const parsedReservations = JSON.parse(savedReservations)
        // Validate reservations structure
        if (Array.isArray(parsedReservations)) {
          setPendingReservations(parsedReservations)
        }
      }
    } catch (error) {
      console.error('Error loading cart/saved data:', error)
      // Clear corrupted data
      localStorage.removeItem('lusotown-cart')
      localStorage.removeItem('lusotown-saved')
      localStorage.removeItem('lusotown-reservations')
    }
  }, [])

  // Save to localStorage when data changes with error handling
  useEffect(() => {
    try {
      localStorage.setItem('lusotown-cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cartItems])

  useEffect(() => {
    try {
      localStorage.setItem('lusotown-saved', JSON.stringify(savedItems))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }, [savedItems])

  useEffect(() => {
    try {
      localStorage.setItem('lusotown-reservations', JSON.stringify(pendingReservations))
    } catch (error) {
      console.error('Error saving reservations to localStorage:', error)
    }
  }, [pendingReservations])

  // Cart functions - memoized to prevent unnecessary re-renders
  const addToCart = useCallback((item: Omit<CartItem, 'id' | 'quantity' | 'addedAt'> & { quantity?: number }) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      quantity: item.quantity || 1,
      addedAt: new Date().toISOString()
    }
    
    // Check if item already exists (for events, don't allow duplicates)
    const existingItem = cartItems.find(cartItem => 
      cartItem.type === newItem.type && 
      cartItem.title === newItem.title &&
      (newItem.type === 'event' ? cartItem.eventDate === newItem.eventDate : true)
    )
    
    if (existingItem && newItem.type === 'event') {
      toast.error('Este evento já está no teu carrinho')
      return
    }
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + newItem.quantity)
      return
    }
    
    // Check availability for events
    if (newItem.type === 'event' && newItem.spotsLeft !== undefined) {
      if (newItem.spotsLeft < newItem.quantity) {
        toast.error(`Apenas ${newItem.spotsLeft} vagas disponíveis`)
        return
      }
    }
    
    setCartItems(prev => [...prev, newItem])
    toast.success('Adicionado ao carrinho', {
      icon: '🛒',
      duration: 2000
    })
  }, [cartItems])

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    toast.success('Removido do carrinho')
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        // Check max quantity constraints
        if (item.maxQuantity && quantity > item.maxQuantity) {
          toast.error(`Máximo ${item.maxQuantity} unidades`)
          return item
        }
        
        // Check spots availability for events
        if (item.type === 'event' && item.spotsLeft !== undefined && quantity > item.spotsLeft) {
          toast.error(`Apenas ${item.spotsLeft} vagas disponíveis`)
          return item
        }
        
        return { ...item, quantity }
      }
      return item
    }))
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast.success('Carrinho limpo')
  }, [])

  // Saved items functions
  const addToSaved = useCallback((item: Omit<SavedItem, 'id' | 'savedAt'>) => {
    // Check if already saved
    if (savedItems.some(saved => saved.type === item.type && saved.title === item.title)) {
      toast.error('Item já guardado nos favoritos')
      return
    }
    
    const newSavedItem: SavedItem = {
      ...item,
      id: `saved-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date().toISOString()
    }
    
    setSavedItems(prev => [...prev, newSavedItem])
    toast.success('Guardado nos favoritos', {
      icon: '❤️',
      duration: 2000
    })
  }, [savedItems])

  const removeFromSaved = useCallback((id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id))
    toast.success('Removido dos favoritos')
  }, [])

  const isSaved = useCallback((title: string) => {
    return savedItems.some(item => item.title === title)
  }, [savedItems])

  const toggleSaved = useCallback((item: Omit<SavedItem, 'id' | 'savedAt'>) => {
    const existing = savedItems.find(saved => saved.title === item.title)
    if (existing) {
      removeFromSaved(existing.id)
    } else {
      addToSaved(item)
    }
  }, [savedItems, removeFromSaved, addToSaved])

  // Reservation functions
  const createReservation = useCallback(async (request: ReservationRequest): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if item is in cart
      const cartItem = cartItems.find(item => 
        item.type === request.itemType && item.title.includes(request.itemId)
      )
      
      if (!cartItem) {
        return { success: false, message: 'Item não encontrado no carrinho' }
      }
      
      // Validate quantity
      if (request.quantity > cartItem.quantity) {
        return { success: false, message: 'Quantidade inválida' }
      }
      
      // Check if reservation already exists
      const existingReservation = pendingReservations.find(res => res.itemId === request.itemId)
      if (existingReservation) {
        return { success: false, message: 'Reserva já existe para este item' }
      }
      
      // Create reservation
      setPendingReservations(prev => [...prev, request])
      
      // Remove from cart (move to reservations)
      removeFromCart(cartItem.id)
      
      toast.success('Reserva criada com sucesso! Aguarda confirmação.', {
        icon: '📅',
        duration: 4000
      })
      
      return { success: true, message: 'Reserva criada com sucesso' }
    } catch (error) {
      console.error('Error creating reservation:', error)
      return { success: false, message: 'Erro ao criar reserva' }
    }
  }, [cartItems, pendingReservations, removeFromCart])

  // Utility functions
  const isInCart = useCallback((title: string) => {
    return cartItems.some(item => item.title === title)
  }, [cartItems])

  const getCartItem = useCallback((id: string) => {
    return cartItems.find(item => item.id === id)
  }, [cartItems])

  const getSavedItem = useCallback((id: string) => {
    return savedItems.find(item => item.id === id)
  }, [savedItems])

  // Computed values - memoized for performance
  const cartCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0), 
    [cartItems]
  )
  
  const cartTotal = useMemo(() => 
    cartItems.reduce((total, item) => total + (item.price * item.quantity), 0), 
    [cartItems]
  )
  
  const savedCount = useMemo(() => savedItems.length, [savedItems])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    savedItems,
    savedCount,
    addToSaved,
    removeFromSaved,
    isSaved,
    toggleSaved,
    pendingReservations,
    createReservation,
    isInCart,
    getCartItem,
    getSavedItem
  }), [
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    savedItems,
    savedCount,
    addToSaved,
    removeFromSaved,
    isSaved,
    toggleSaved,
    pendingReservations,
    createReservation,
    isInCart,
    getCartItem,
    getSavedItem
  ])

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}