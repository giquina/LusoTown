// Modular pricing engine for chauffeur services with caching and discount logic

interface ServiceTier {
  id: string
  basePrice: number
  hourlyRate?: number
  minimumHours?: number
  maximumHours?: number
  discountTiers?: DiscountTier[]
  membershipDiscounts?: MembershipDiscount[]
  seasonalMultipliers?: SeasonalMultiplier[]
}

interface ExperiencePackage {
  id: string
  basePrice: number | 'Custom'
  duration: string
  fixedPrice: boolean
  additionalHours?: number
  discountTiers?: DiscountTier[]
}

interface DiscountTier {
  minHours: number
  discountPercentage: number
  description: string
}

interface MembershipDiscount {
  membershipLevel: 'free' | 'family' | 'ambassador'
  discountPercentage: number
  maxDiscount?: number
}

interface SeasonalMultiplier {
  startDate: string // MM-DD format
  endDate: string
  multiplier: number
  description: string
}

interface BookingDetails {
  serviceId: string
  serviceType: 'tier' | 'package'
  date: string
  duration: number // in hours
  membershipLevel?: 'free' | 'family' | 'ambassador'
  eventType?: string
  isMultiDay?: boolean
  numberOfDays?: number
  additionalServices?: string[]
}

interface PricingBreakdown {
  basePrice: number
  hourlyRate?: number
  totalHours: number
  subtotal: number
  discounts: DiscountApplication[]
  totalDiscount: number
  finalPrice: number
  currency: string
  breakdown: PriceComponent[]
  recommendations?: PricingRecommendation[]
}

interface DiscountApplication {
  type: 'membership' | 'bulk' | 'seasonal' | 'promotional'
  name: string
  amount: number
  percentage: number
  appliedTo: number
}

interface PriceComponent {
  name: string
  quantity: number
  unitPrice: number
  total: number
  description?: string
}

interface PricingRecommendation {
  type: 'upgrade' | 'duration' | 'alternative'
  message: string
  messagePortuguese: string
  potentialSaving?: number
  alternativeServiceId?: string
}

class ChauffeurPricingEngine {
  private cache = new Map<string, { result: PricingBreakdown; timestamp: number }>()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private serviceTiers: Record<string, ServiceTier> = {
    essential: {
      id: 'essential',
      basePrice: 45,
      hourlyRate: 45,
      minimumHours: 2,
      maximumHours: 12,
      discountTiers: [
        { minHours: 4, discountPercentage: 5, description: '5% discount for 4+ hours' },
        { minHours: 8, discountPercentage: 10, description: '10% discount for 8+ hours' }
      ],
      membershipDiscounts: [
        { membershipLevel: 'family', discountPercentage: 10 },
        { membershipLevel: 'ambassador', discountPercentage: 15 }
      ]
    },
    premium: {
      id: 'premium',
      basePrice: 65,
      hourlyRate: 65,
      minimumHours: 2,
      maximumHours: 16,
      discountTiers: [
        { minHours: 4, discountPercentage: 8, description: '8% discount for 4+ hours' },
        { minHours: 8, discountPercentage: 12, description: '12% discount for 8+ hours' },
        { minHours: 12, discountPercentage: 18, description: '18% discount for 12+ hours' }
      ],
      membershipDiscounts: [
        { membershipLevel: 'family', discountPercentage: 12 },
        { membershipLevel: 'ambassador', discountPercentage: 20 }
      ]
    },
    vip: {
      id: 'vip',
      basePrice: 85,
      hourlyRate: 85,
      minimumHours: 3,
      maximumHours: 20,
      discountTiers: [
        { minHours: 6, discountPercentage: 10, description: '10% discount for 6+ hours' },
        { minHours: 12, discountPercentage: 15, description: '15% discount for 12+ hours' }
      ],
      membershipDiscounts: [
        { membershipLevel: 'family', discountPercentage: 15 },
        { membershipLevel: 'ambassador', discountPercentage: 25 }
      ]
    },
    elite: {
      id: 'elite',
      basePrice: 120,
      hourlyRate: 120,
      minimumHours: 4,
      maximumHours: 24,
      discountTiers: [
        { minHours: 8, discountPercentage: 12, description: '12% discount for 8+ hours' },
        { minHours: 16, discountPercentage: 20, description: '20% discount for 16+ hours' }
      ],
      membershipDiscounts: [
        { membershipLevel: 'family', discountPercentage: 18 },
        { membershipLevel: 'ambassador', discountPercentage: 30, maxDiscount: 200 }
      ]
    }
  }

  private experiencePackages: Record<string, ExperiencePackage> = {
    'tea-ritz': {
      id: 'tea-ritz',
      basePrice: 180,
      duration: '3 hours',
      fixedPrice: true,
      discountTiers: [
        { minHours: 1, discountPercentage: 0, description: 'Fixed price experience' }
      ]
    },
    'mayfair-night': {
      id: 'mayfair-night',
      basePrice: 240,
      duration: '4 hours',
      fixedPrice: true,
      additionalHours: 50
    },
    'london-landmarks': {
      id: 'london-landmarks',
      basePrice: 240,
      duration: '4 hours',
      fixedPrice: true,
      additionalHours: 55
    },
    'harry-potter': {
      id: 'harry-potter',
      basePrice: 290,
      duration: '6 hours',
      fixedPrice: true,
      additionalHours: 45
    },
    'james-bond': {
      id: 'james-bond',
      basePrice: 290,
      duration: '5 hours',
      fixedPrice: true,
      additionalHours: 50
    },
    'royal-london': {
      id: 'royal-london',
      basePrice: 240,
      duration: '4 hours',
      fixedPrice: true,
      additionalHours: 55
    },
    'airport-vip': {
      id: 'airport-vip',
      basePrice: 95,
      duration: '2 hours',
      fixedPrice: true,
      additionalHours: 35
    },
    'shopping': {
      id: 'shopping',
      basePrice: 320,
      duration: '6 hours',
      fixedPrice: true,
      additionalHours: 45
    },
    'bespoke': {
      id: 'bespoke',
      basePrice: 'Custom',
      duration: 'Flexible',
      fixedPrice: false
    }
  }

  private seasonalMultipliers: SeasonalMultiplier[] = [
    {
      startDate: '12-20',
      endDate: '01-05',
      multiplier: 1.2,
      description: 'Christmas and New Year premium'
    },
    {
      startDate: '12-31',
      endDate: '01-01',
      multiplier: 1.5,
      description: 'New Year\'s Eve premium'
    }
  ]

  /**
   * Calculate pricing with comprehensive breakdown and optimizations
   */
  calculatePricing(booking: BookingDetails): PricingBreakdown {
    const cacheKey = this.generateCacheKey(booking)
    
    // Check cache first
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.result
    }

    const result = this.calculatePricingInternal(booking)
    
    // Cache the result
    this.cache.set(cacheKey, { result, timestamp: Date.now() })
    
    return result
  }

  private calculatePricingInternal(booking: BookingDetails): PricingBreakdown {
    if (booking.serviceType === 'package') {
      return this.calculatePackagePricing(booking)
    } else {
      return this.calculateTierPricing(booking)
    }
  }

  private calculateTierPricing(booking: BookingDetails): PricingBreakdown {
    const tier = this.serviceTiers[booking.serviceId]
    if (!tier) {
      throw new Error(`Service tier not found: ${booking.serviceId}`)
    }

    const duration = Math.max(booking.duration, tier.minimumHours || 1)
    const effectiveDuration = Math.min(duration, tier.maximumHours || 24)
    
    const baseSubtotal = tier.hourlyRate * effectiveDuration
    const seasonalMultiplier = this.getSeasonalMultiplier(booking.date)
    const adjustedSubtotal = baseSubtotal * seasonalMultiplier

    const discounts = this.calculateDiscounts({
      subtotal: adjustedSubtotal,
      duration: effectiveDuration,
      tier,
      membershipLevel: booking.membershipLevel,
      isMultiDay: booking.isMultiDay,
      numberOfDays: booking.numberOfDays
    })

    const totalDiscount = discounts.reduce((sum, discount) => sum + discount.amount, 0)
    const finalPrice = Math.max(adjustedSubtotal - totalDiscount, tier.basePrice)

    const breakdown: PriceComponent[] = [
      {
        name: `${tier.id} Service`,
        quantity: effectiveDuration,
        unitPrice: tier.hourlyRate,
        total: baseSubtotal,
        description: `${effectiveDuration} hours at £${tier.hourlyRate}/hour`
      }
    ]

    if (seasonalMultiplier !== 1) {
      breakdown.push({
        name: 'Seasonal Adjustment',
        quantity: 1,
        unitPrice: baseSubtotal * (seasonalMultiplier - 1),
        total: baseSubtotal * (seasonalMultiplier - 1),
        description: `${((seasonalMultiplier - 1) * 100).toFixed(0)}% seasonal premium`
      })
    }

    const recommendations = this.generateRecommendations(booking, finalPrice)

    return {
      basePrice: tier.basePrice,
      hourlyRate: tier.hourlyRate,
      totalHours: effectiveDuration,
      subtotal: adjustedSubtotal,
      discounts,
      totalDiscount,
      finalPrice,
      currency: 'GBP',
      breakdown,
      recommendations
    }
  }

  private calculatePackagePricing(booking: BookingDetails): PricingBreakdown {
    const pkg = this.experiencePackages[booking.serviceId]
    if (!pkg) {
      throw new Error(`Experience package not found: ${booking.serviceId}`)
    }

    if (pkg.basePrice === 'Custom') {
      return {
        basePrice: 0,
        totalHours: 0,
        subtotal: 0,
        discounts: [],
        totalDiscount: 0,
        finalPrice: 0,
        currency: 'GBP',
        breakdown: [{
          name: 'Bespoke Service',
          quantity: 1,
          unitPrice: 0,
          total: 0,
          description: 'Custom pricing - contact for quote'
        }],
        recommendations: []
      }
    }

    const basePrice = pkg.basePrice as number
    const packageHours = parseInt(pkg.duration.split(' ')[0]) || 1
    const additionalHours = Math.max(0, booking.duration - packageHours)
    const additionalCost = additionalHours * (pkg.additionalHours || 50)
    
    const subtotal = basePrice + additionalCost
    const seasonalMultiplier = this.getSeasonalMultiplier(booking.date)
    const adjustedSubtotal = subtotal * seasonalMultiplier

    // Packages typically have fewer discounts
    const membershipDiscount = this.calculateMembershipDiscount(
      adjustedSubtotal,
      booking.membershipLevel
    )
    
    const discounts: DiscountApplication[] = membershipDiscount ? [membershipDiscount] : []
    const totalDiscount = discounts.reduce((sum, discount) => sum + discount.amount, 0)
    const finalPrice = adjustedSubtotal - totalDiscount

    const breakdown: PriceComponent[] = [
      {
        name: `${pkg.id} Package`,
        quantity: 1,
        unitPrice: basePrice,
        total: basePrice,
        description: `Base package (${pkg.duration})`
      }
    ]

    if (additionalCost > 0) {
      breakdown.push({
        name: 'Additional Hours',
        quantity: additionalHours,
        unitPrice: pkg.additionalHours || 50,
        total: additionalCost,
        description: `${additionalHours} extra hours`
      })
    }

    return {
      basePrice,
      totalHours: packageHours + additionalHours,
      subtotal: adjustedSubtotal,
      discounts,
      totalDiscount,
      finalPrice,
      currency: 'GBP',
      breakdown,
      recommendations: this.generateRecommendations(booking, finalPrice)
    }
  }

  private calculateDiscounts(params: {
    subtotal: number
    duration: number
    tier: ServiceTier
    membershipLevel?: string
    isMultiDay?: boolean
    numberOfDays?: number
  }): DiscountApplication[] {
    const discounts: DiscountApplication[] = []

    // Bulk hour discount
    const bulkDiscount = this.calculateBulkDiscount(params.subtotal, params.duration, params.tier)
    if (bulkDiscount) discounts.push(bulkDiscount)

    // Membership discount
    const membershipDiscount = this.calculateMembershipDiscount(
      params.subtotal,
      params.membershipLevel as any
    )
    if (membershipDiscount) discounts.push(membershipDiscount)

    // Multi-day discount
    if (params.isMultiDay && params.numberOfDays && params.numberOfDays >= 3) {
      const multiDayDiscount: DiscountApplication = {
        type: 'promotional',
        name: 'Multi-day Booking',
        amount: params.subtotal * 0.15,
        percentage: 15,
        appliedTo: params.subtotal
      }
      discounts.push(multiDayDiscount)
    }

    return discounts
  }

  private calculateBulkDiscount(
    subtotal: number,
    duration: number,
    tier: ServiceTier
  ): DiscountApplication | null {
    if (!tier.discountTiers) return null

    // Find the highest applicable discount
    const applicableDiscount = tier.discountTiers
      .filter(discount => duration >= discount.minHours)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)[0]

    if (!applicableDiscount) return null

    return {
      type: 'bulk',
      name: 'Bulk Hours Discount',
      amount: subtotal * (applicableDiscount.discountPercentage / 100),
      percentage: applicableDiscount.discountPercentage,
      appliedTo: subtotal
    }
  }

  private calculateMembershipDiscount(
    subtotal: number,
    membershipLevel?: 'free' | 'family' | 'ambassador'
  ): DiscountApplication | null {
    if (!membershipLevel || membershipLevel === 'free') return null

    const discountPercentages = {
      family: 10,
      ambassador: 15
    }

    const percentage = discountPercentages[membershipLevel]
    const amount = subtotal * (percentage / 100)

    return {
      type: 'membership',
      name: `${membershipLevel.charAt(0).toUpperCase() + membershipLevel.slice(1)} Member`,
      amount,
      percentage,
      appliedTo: subtotal
    }
  }

  private getSeasonalMultiplier(dateString: string): number {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

    for (const multiplier of this.seasonalMultipliers) {
      if (this.isDateInRange(dateKey, multiplier.startDate, multiplier.endDate)) {
        return multiplier.multiplier
      }
    }

    return 1
  }

  private isDateInRange(date: string, start: string, end: string): boolean {
    // Handle year-crossing ranges like Dec-Jan
    if (start > end) {
      return date >= start || date <= end
    }
    return date >= start && date <= end
  }

  private generateRecommendations(
    booking: BookingDetails,
    currentPrice: number
  ): PricingRecommendation[] {
    const recommendations: PricingRecommendation[] = []

    // Recommend upgrade for better value
    if (booking.serviceType === 'tier' && booking.serviceId === 'essential' && booking.duration >= 6) {
      const premiumPricing = this.calculatePricing({
        ...booking,
        serviceId: 'premium'
      })
      
      const valueImprovement = (premiumPricing.finalPrice - currentPrice) / booking.duration
      
      if (valueImprovement < 25) {
        recommendations.push({
          type: 'upgrade',
          message: `Upgrade to Premium for only £${valueImprovement.toFixed(0)} more per hour`,
          messagePortuguese: `Melhore para Premium por apenas £${valueImprovement.toFixed(0)} mais por hora`,
          alternativeServiceId: 'premium'
        })
      }
    }

    // Recommend longer duration for better rates
    if (booking.duration < 4 && booking.serviceType === 'tier') {
      const longerBooking = this.calculatePricing({
        ...booking,
        duration: 4
      })
      
      const currentHourlyRate = currentPrice / booking.duration
      const longerHourlyRate = longerBooking.finalPrice / 4
      
      if (longerHourlyRate < currentHourlyRate * 0.95) {
        recommendations.push({
          type: 'duration',
          message: `Book 4 hours to save £${(currentHourlyRate - longerHourlyRate).toFixed(0)} per hour`,
          messagePortuguese: `Reserve 4 horas para poupar £${(currentHourlyRate - longerHourlyRate).toFixed(0)} por hora`,
          potentialSaving: (currentHourlyRate - longerHourlyRate) * 4
        })
      }
    }

    return recommendations
  }

  private generateCacheKey(booking: BookingDetails): string {
    return `${booking.serviceId}-${booking.serviceType}-${booking.duration}-${booking.date}-${booking.membershipLevel || 'none'}-${booking.numberOfDays || 1}`
  }

  /**
   * Clear pricing cache (useful for testing or manual cache invalidation)
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get available service tiers
   */
  getServiceTiers(): ServiceTier[] {
    return Object.values(this.serviceTiers)
  }

  /**
   * Get available experience packages
   */
  getExperiencePackages(): ExperiencePackage[] {
    return Object.values(this.experiencePackages)
  }

  /**
   * Validate booking parameters
   */
  validateBooking(booking: BookingDetails): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (booking.serviceType === 'tier') {
      const tier = this.serviceTiers[booking.serviceId]
      if (!tier) {
        errors.push(`Invalid service tier: ${booking.serviceId}`)
      } else {
        if (tier.minimumHours && booking.duration < tier.minimumHours) {
          errors.push(`Minimum duration for ${booking.serviceId} is ${tier.minimumHours} hours`)
        }
        if (tier.maximumHours && booking.duration > tier.maximumHours) {
          errors.push(`Maximum duration for ${booking.serviceId} is ${tier.maximumHours} hours`)
        }
      }
    } else if (booking.serviceType === 'package') {
      const pkg = this.experiencePackages[booking.serviceId]
      if (!pkg) {
        errors.push(`Invalid experience package: ${booking.serviceId}`)
      }
    }

    if (booking.duration <= 0) {
      errors.push('Duration must be greater than 0')
    }

    const bookingDate = new Date(booking.date)
    if (bookingDate < new Date()) {
      errors.push('Booking date cannot be in the past')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Singleton instance
export const pricingEngine = new ChauffeurPricingEngine()

// Export types for use in components
export type {
  ServiceTier,
  ExperiencePackage,
  BookingDetails,
  PricingBreakdown,
  DiscountApplication,
  PriceComponent,
  PricingRecommendation
}