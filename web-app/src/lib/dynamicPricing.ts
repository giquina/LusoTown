import { calculatePricing, type PricingCalculationRequest } from './transportServices'

export interface PricingTier {
  id: string
  name: string
  namePortuguese: string
  membershipLevel: 'free' | 'core' | 'premium'
  discountPercentage: number
  benefits: string[]
  benefitsPortuguese: string[]
}

export interface BundleDiscount {
  id: string
  name: string
  namePortuguese: string
  serviceTypes: string[]
  discountPercentage: number
  minimumServices: number
}

export interface CorporateRate {
  id: string
  companyName: string
  serviceTypes: string[]
  discountPercentage: number
  volumeThreshold: number
  isActive: boolean
}

export interface DynamicPricingOptions {
  serviceId: string
  serviceType: 'standard' | 'enhanced' | 'hybrid'
  datetime: string
  duration: number
  groupSize: number
  membershipTier: 'free' | 'core' | 'premium'
  addOnServices?: string[]
  corporateAccount?: string
  bundleServices?: string[]
  vehiclePreference?: 'standard' | 'premium' | 'luxury'
  requiresSIA?: boolean
  seasonalMultiplier?: number
}

export interface PricingResult {
  basePrice: number
  serviceFee: number
  membershipDiscount: number
  bundleDiscount: number
  corporateDiscount: number
  seasonalSurcharge: number
  siaComplexityFee: number
  vehiclePremium: number
  addOnsCost: number
  subtotal: number
  vat: number
  totalPrice: number
  currency: string
  breakdown: PricingBreakdownItem[]
  membershipSavings: number
  bundleSavings: number
}

export interface PricingBreakdownItem {
  id: string
  description: string
  descriptionPortuguese: string
  amount: number
  type: 'charge' | 'discount' | 'tax'
  category: 'base' | 'premium' | 'membership' | 'bundle' | 'corporate' | 'seasonal' | 'compliance' | 'tax'
}

// Pricing tier definitions
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Community Member',
    namePortuguese: 'Membro da Comunidade',
    membershipLevel: 'free',
    discountPercentage: 0,
    benefits: [
      'Access to standard services',
      'Basic booking features',
      'Community support'
    ],
    benefitsPortuguese: [
      'Acesso a serviços padrão',
      'Funcionalidades básicas de reserva',
      'Apoio da comunidade'
    ]
  },
  {
    id: 'core',
    name: 'Core Member',
    namePortuguese: 'Membro Core',
    membershipLevel: 'core',
    discountPercentage: 10,
    benefits: [
      '10% discount on all services',
      'Priority booking',
      'Lusophone cultural concierge',
      'Monthly member events'
    ],
    benefitsPortuguese: [
      '10% desconto em todos os serviços',
      'Reserva prioritária',
      'Concierge cultural português',
      'Eventos mensais para membros'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Member',
    namePortuguese: 'Membro Premium',
    membershipLevel: 'premium',
    discountPercentage: 20,
    benefits: [
      '20% discount on all services',
      'VIP booking priority',
      'Dedicated Lusophone account manager',
      'Exclusive premium events',
      'Complimentary upgrades',
      'Corporate account benefits'
    ],
    benefitsPortuguese: [
      '20% desconto em todos os serviços',
      'Prioridade VIP para reservas',
      'Gestor de conta português dedicado',
      'Eventos premium exclusivos',
      'Upgrades gratuitos',
      'Benefícios de conta corporativa'
    ]
  }
]

// Bundle discount configurations
export const BUNDLE_DISCOUNTS: BundleDiscount[] = [
  {
    id: 'cultural-explorer',
    name: 'Cultural Explorer Bundle',
    namePortuguese: 'Pacote Explorador Cultural',
    serviceTypes: ['portuguese-tours', 'luxury-experiences'],
    discountPercentage: 15,
    minimumServices: 2
  },
  {
    id: 'business-professional',
    name: 'Business Professional Bundle',
    namePortuguese: 'Pacote Profissional de Negócios',
    serviceTypes: ['airport-transfers', 'vip-protection'],
    discountPercentage: 12,
    minimumServices: 2
  },
  {
    id: 'complete-experience',
    name: 'Complete Lusophone Experience',
    namePortuguese: 'Experiência Portuguesa Completa',
    serviceTypes: ['portuguese-tours', 'airport-transfers', 'luxury-experiences'],
    discountPercentage: 18,
    minimumServices: 3
  }
]

// Corporate rate configurations
export const CORPORATE_RATES: CorporateRate[] = [
  {
    id: 'portuguese-businesses',
    companyName: 'Lusophone Business Network',
    serviceTypes: ['airport-transfers', 'vip-protection', 'luxury-experiences'],
    discountPercentage: 25,
    volumeThreshold: 10,
    isActive: true
  },
  {
    id: 'cultural-organizations',
    companyName: 'Lusophone Cultural Organizations',
    serviceTypes: ['portuguese-tours', 'luxury-experiences'],
    discountPercentage: 20,
    volumeThreshold: 5,
    isActive: true
  }
]

// Base service rates
const BASE_SERVICE_RATES = {
  'portuguese-tours': 65,
  'airport-transfers': 85,
  'vip-protection': 150,
  'luxury-experiences': 120
}

// Vehicle premium rates
const VEHICLE_PREMIUMS = {
  standard: 0,
  premium: 25,
  luxury: 50
}

// SIA complexity fees based on risk assessment
const SIA_COMPLEXITY_FEES = {
  low: 0,
  medium: 30,
  high: 60,
  critical: 120
}

// Seasonal multipliers
const SEASONAL_MULTIPLIERS = {
  peak: 1.3, // Christmas, New Year, Lusophone holidays
  high: 1.15, // Summer season, major events
  standard: 1.0, // Regular periods
  low: 0.9 // January-February
}

// Add-on service rates
const ADDON_RATES = {
  'portuguese-interpreter': 40,
  'cultural-guide': 35,
  'photography-service': 60,
  'wine-tasting-experience': 80,
  'fado-performance': 120,
  'portuguese-cooking-class': 100,
  'business-translation': 50,
  'legal-document-assistance': 70
}

export class DynamicPricingEngine {
  private vatRate = 0.20 // United Kingdom VAT rate

  async calculatePrice(options: DynamicPricingOptions): Promise<PricingResult> {
    const breakdown: PricingBreakdownItem[] = []
    
    // 1. Base service price
    const baseRate = BASE_SERVICE_RATES[options.serviceId as keyof typeof BASE_SERVICE_RATES] || 75
    const basePrice = baseRate * options.duration
    
    breakdown.push({
      id: 'base-service',
      description: `Base service rate (${options.duration} hours)`,
      descriptionPortuguese: `Taxa base do serviço (${options.duration} horas)`,
      amount: basePrice,
      type: 'charge',
      category: 'base'
    })

    // 2. Group size adjustment
    let groupSizeMultiplier = 1
    if (options.groupSize > 4) {
      groupSizeMultiplier = 1 + ((options.groupSize - 4) * 0.1)
      const groupSurcharge = basePrice * (groupSizeMultiplier - 1)
      
      breakdown.push({
        id: 'group-size',
        description: `Large group surcharge (${options.groupSize} people)`,
        descriptionPortuguese: `Sobretaxa para grupo grande (${options.groupSize} pessoas)`,
        amount: groupSurcharge,
        type: 'charge',
        category: 'base'
      })
    }

    let subtotal = basePrice * groupSizeMultiplier

    // 3. Vehicle premium
    const vehiclePremium = VEHICLE_PREMIUMS[options.vehiclePreference || 'standard'] * options.duration
    if (vehiclePremium > 0) {
      breakdown.push({
        id: 'vehicle-premium',
        description: `${options.vehiclePreference} vehicle premium`,
        descriptionPortuguese: `Premium de veículo ${options.vehiclePreference}`,
        amount: vehiclePremium,
        type: 'charge',
        category: 'premium'
      })
      subtotal += vehiclePremium
    }

    // 4. SIA compliance complexity fee
    let siaComplexityFee = 0
    if (options.requiresSIA) {
      // In a real implementation, this would be calculated based on the SIA questionnaire
      const complexityLevel = this.determineSIAComplexity(options)
      siaComplexityFee = SIA_COMPLEXITY_FEES[complexityLevel]
      
      if (siaComplexityFee > 0) {
        breakdown.push({
          id: 'sia-compliance',
          description: `SIA compliance processing (${complexityLevel} complexity)`,
          descriptionPortuguese: `Processamento de conformidade SIA (complexidade ${complexityLevel})`,
          amount: siaComplexityFee,
          type: 'charge',
          category: 'compliance'
        })
        subtotal += siaComplexityFee
      }
    }

    // 5. Add-on services
    let addOnsCost = 0
    if (options.addOnServices && options.addOnServices.length > 0) {
      for (const addon of options.addOnServices) {
        const addonCost = ADDON_RATES[addon as keyof typeof ADDON_RATES] || 0
        addOnsCost += addonCost
        
        breakdown.push({
          id: `addon-${addon}`,
          description: `${addon.replace('-', ' ')} service`,
          descriptionPortuguese: `Serviço de ${addon.replace('-', ' ')}`,
          amount: addonCost,
          type: 'charge',
          category: 'premium'
        })
      }
      subtotal += addOnsCost
    }

    // 6. Seasonal adjustment
    const seasonalMultiplier = this.getSeasonalMultiplier(options.datetime)
    let seasonalSurcharge = 0
    if (seasonalMultiplier > 1) {
      seasonalSurcharge = subtotal * (seasonalMultiplier - 1)
      breakdown.push({
        id: 'seasonal-surcharge',
        description: `Peak season surcharge (+${((seasonalMultiplier - 1) * 100).toFixed(0)}%)`,
        descriptionPortuguese: `Sobretaxa de época alta (+${((seasonalMultiplier - 1) * 100).toFixed(0)}%)`,
        amount: seasonalSurcharge,
        type: 'charge',
        category: 'seasonal'
      })
      subtotal += seasonalSurcharge
    }

    // 7. Membership discount
    const membershipTier = PRICING_TIERS.find(tier => tier.membershipLevel === options.membershipTier)
    const membershipDiscount = subtotal * (membershipTier?.discountPercentage || 0) / 100
    const membershipSavings = membershipDiscount
    
    if (membershipDiscount > 0) {
      breakdown.push({
        id: 'membership-discount',
        description: `${membershipTier?.name} discount (-${membershipTier?.discountPercentage}%)`,
        descriptionPortuguese: `Desconto ${membershipTier?.namePortuguese} (-${membershipTier?.discountPercentage}%)`,
        amount: -membershipDiscount,
        type: 'discount',
        category: 'membership'
      })
      subtotal -= membershipDiscount
    }

    // 8. Bundle discount
    let bundleDiscount = 0
    let bundleSavings = 0
    if (options.bundleServices && options.bundleServices.length >= 2) {
      const applicableBundle = this.findApplicableBundle(options.bundleServices)
      if (applicableBundle) {
        bundleDiscount = subtotal * applicableBundle.discountPercentage / 100
        bundleSavings = bundleDiscount
        
        breakdown.push({
          id: 'bundle-discount',
          description: `${applicableBundle.name} bundle discount (-${applicableBundle.discountPercentage}%)`,
          descriptionPortuguese: `Desconto de pacote ${applicableBundle.namePortuguese} (-${applicableBundle.discountPercentage}%)`,
          amount: -bundleDiscount,
          type: 'discount',
          category: 'bundle'
        })
        subtotal -= bundleDiscount
      }
    }

    // 9. Corporate discount
    let corporateDiscount = 0
    if (options.corporateAccount) {
      const corporateRate = CORPORATE_RATES.find(rate => 
        rate.id === options.corporateAccount && rate.isActive
      )
      if (corporateRate) {
        corporateDiscount = subtotal * corporateRate.discountPercentage / 100
        
        breakdown.push({
          id: 'corporate-discount',
          description: `Corporate account discount (-${corporateRate.discountPercentage}%)`,
          descriptionPortuguese: `Desconto de conta corporativa (-${corporateRate.discountPercentage}%)`,
          amount: -corporateDiscount,
          type: 'discount',
          category: 'corporate'
        })
        subtotal -= corporateDiscount
      }
    }

    // 10. VAT calculation
    const vat = subtotal * this.vatRate
    breakdown.push({
      id: 'vat',
      description: `VAT (${(this.vatRate * 100).toFixed(0)}%)`,
      descriptionPortuguese: `IVA (${(this.vatRate * 100).toFixed(0)}%)`,
      amount: vat,
      type: 'tax',
      category: 'tax'
    })

    const totalPrice = subtotal + vat

    return {
      basePrice,
      serviceFee: 0,
      membershipDiscount,
      bundleDiscount,
      corporateDiscount,
      seasonalSurcharge,
      siaComplexityFee,
      vehiclePremium,
      addOnsCost,
      subtotal,
      vat,
      totalPrice,
      currency: 'GBP',
      breakdown,
      membershipSavings,
      bundleSavings
    }
  }

  private determineSIAComplexity(options: DynamicPricingOptions): keyof typeof SIA_COMPLEXITY_FEES {
    // In a real implementation, this would analyze the SIA questionnaire data
    // For now, we'll use service type as a proxy
    switch (options.serviceType) {
      case 'enhanced':
        return 'high'
      case 'hybrid':
        return 'medium'
      default:
        return 'low'
    }
  }

  private getSeasonalMultiplier(datetime: string): number {
    const date = new Date(datetime)
    const month = date.getMonth() + 1
    const day = date.getDate()

    // Peak season: December 15 - January 15, Lusophone holidays
    if ((month === 12 && day >= 15) || (month === 1 && day <= 15)) {
      return SEASONAL_MULTIPLIERS.peak
    }

    // High season: June - September
    if (month >= 6 && month <= 9) {
      return SEASONAL_MULTIPLIERS.high
    }

    // Low season: January 16 - February
    if (month === 1 && day > 15 || month === 2) {
      return SEASONAL_MULTIPLIERS.low
    }

    return SEASONAL_MULTIPLIERS.standard
  }

  private findApplicableBundle(serviceTypes: string[]): BundleDiscount | null {
    for (const bundle of BUNDLE_DISCOUNTS) {
      const matchingServices = serviceTypes.filter(service => 
        bundle.serviceTypes.includes(service)
      )
      
      if (matchingServices.length >= bundle.minimumServices) {
        return bundle
      }
    }
    
    return null
  }

  // Multi-currency support
  async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    // In a real implementation, this would call a currency conversion API
    const exchangeRates: Record<string, number> = {
      'GBP': 1,
      'EUR': 1.17,
      'USD': 1.25,
      'BRL': 6.5, // Brazilian Real for Portuguese-speaking community
      'MXN': 25.0 // Mexican Peso
    }

    const fromRate = exchangeRates[fromCurrency] || 1
    const toRate = exchangeRates[toCurrency] || 1
    
    return (amount / fromRate) * toRate
  }

  // Payment processing integration
  async createPaymentIntent(
    amount: number, 
    currency: string, 
    metadata: Record<string, any>
  ): Promise<{ clientSecret: string; paymentIntentId: string }> {
    // In a real implementation, this would integrate with Stripe or similar
    return {
      clientSecret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
      paymentIntentId: `pi_${Math.random().toString(36).substr(2, 9)}`
    }
  }

  // Corporate billing workflow
  async generateCorporateInvoice(
    bookingData: any,
    pricingResult: PricingResult,
    corporateAccount: string
  ): Promise<{ invoiceId: string; dueDate: string; terms: string }> {
    // In a real implementation, this would generate and send invoices
    return {
      invoiceId: `INV-${Date.now()}`,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      terms: 'Net 30'
    }
  }
}

export const dynamicPricingEngine = new DynamicPricingEngine()

// Enhanced dynamic pricing library for Lusophone market optimization and revenue maximization

export interface PricingConfig {
  tier: import('./supabase').MembershipTier
  baseMonthlyPrice: number
  baseYearlyPrice: number
  currentMonthlyPrice: number
  currentYearlyPrice: number
  discountPercentage: number
  yearlyDiscount: number
  studentDiscount?: number
  corporateDiscount?: number
  promoCode?: string
  validUntil?: Date
}

export interface MarketSegment {
  id: string
  name: string
  namePortuguese: string
  targetAudience: string[]
  priceMultiplier: number
  features: string[]
  description: string
  descriptionPortuguese: string
}

// Lusophone market segments based on cultural and economic patterns
export const portugueseMarketSegments: MarketSegment[] = [
  {
    id: 'young-professionals',
    name: 'Young Professionals',
    namePortuguese: 'Jovens Profissionais',
    targetAudience: ['25-35', 'recent-graduates', 'career-focused'],
    priceMultiplier: 0.8,
    features: ['career-networking', 'professional-events', 'mentorship'],
    description: 'Lusophone professionals starting their United Kingdom careers',
    descriptionPortuguese: 'Profissionais portugueses a iniciar carreira no Reino Unido'
  },
  {
    id: 'established-families',
    name: 'Established Families',
    namePortuguese: 'Famílias Estabelecidas',
    targetAudience: ['35-50', 'families', 'homeowners'],
    priceMultiplier: 1.2,
    features: ['family-events', 'education-support', 'community-integration'],
    description: 'Lusophone families with children settled in United Kingdom',
    descriptionPortuguese: 'Famílias portuguesas com filhos estabelecidas no Reino Unido'
  },
  {
    id: 'business-owners',
    name: 'Business Owners',
    namePortuguese: 'Empresários',
    targetAudience: ['entrepreneurs', 'business-owners', 'investors'],
    priceMultiplier: 1.5,
    features: ['business-networking', 'partnership-opportunities', 'investment-events'],
    description: 'Lusophone entrepreneurs and business leaders',
    descriptionPortuguese: 'Empresários e líderes de negócios portugueses'
  },
  {
    id: 'students',
    name: 'Students',
    namePortuguese: 'Estudantes',
    targetAudience: ['18-25', 'university-students', 'recent-arrivals'],
    priceMultiplier: 0.5,
    features: ['student-events', 'academic-support', 'social-integration'],
    description: 'Lusophone students in United Kingdom universities',
    descriptionPortuguese: 'Estudantes portugueses em universidades britânicas'
  }
]

// Dynamic pricing based on Portuguese-speaking community preferences and spending patterns
export class PortuguesePricingEngine {
  
  // Calculate optimized pricing for Lusophone market
  static calculateOptimizedPricing(tier: import('./supabase').MembershipTier, userSegment?: string): PricingConfig {
    const { getMembershipTierConfig } = require('./supabase')
    const baseConfig = getMembershipTierConfig(tier)
    let segment: MarketSegment | undefined
    
    if (userSegment) {
      segment = portugueseMarketSegments.find(s => s.id === userSegment)
    }
    
    const multiplier = segment?.priceMultiplier || 1.0
    const monthlyPrice = Math.round(baseConfig.monthlyPrice * multiplier)
    const yearlyPrice = Math.round(baseConfig.yearlyPrice * multiplier)
    
    // Lusophone cultural preference for annual savings
    const yearlyDiscount = Math.round(((monthlyPrice * 12) - yearlyPrice) / (monthlyPrice * 12) * 100)
    
    return {
      tier,
      baseMonthlyPrice: baseConfig.monthlyPrice,
      baseYearlyPrice: baseConfig.yearlyPrice,
      currentMonthlyPrice: monthlyPrice,
      currentYearlyPrice: yearlyPrice,
      discountPercentage: segment ? Math.round((1 - multiplier) * 100) : 0,
      yearlyDiscount,
      studentDiscount: tier === 'student' ? 50 : undefined,
      corporateDiscount: tier === 'business' ? 15 : undefined
    }
  }
  
  // Special promotional pricing for Portuguese-speaking community events
  static getPromotionalPricing(tier: import('./supabase').MembershipTier, promoCode: string): PricingConfig | null {
    const baseConfig = this.calculateOptimizedPricing(tier)
    
    const promos: Record<string, { discount: number; validUntil: Date; description: string }> = {
      'LUSO2025': {
        discount: 25,
        validUntil: new Date('2025-12-31'),
        description: 'New Year Portuguese-speaking community Special'
      },
      'STUDENT50': {
        discount: 50,
        validUntil: new Date('2025-09-30'),
        description: 'Student Back-to-School Discount'
      },
      'FAMILY20': {
        discount: 20,
        validUntil: new Date('2025-06-30'),
        description: 'Family Membership Discount'
      },
      'BUSINESS15': {
        discount: 15,
        validUntil: new Date('2025-08-31'),
        description: 'Business Network Early Bird'
      }
    }
    
    const promo = promos[promoCode.toUpperCase()]
    if (!promo || new Date() > promo.validUntil) {
      return null
    }
    
    const discountedMonthly = Math.round(baseConfig.currentMonthlyPrice * (1 - promo.discount / 100))
    const discountedYearly = Math.round(baseConfig.currentYearlyPrice * (1 - promo.discount / 100))
    
    return {
      ...baseConfig,
      currentMonthlyPrice: discountedMonthly,
      currentYearlyPrice: discountedYearly,
      discountPercentage: promo.discount,
      promoCode,
      validUntil: promo.validUntil
    }
  }
  
  // Corporate bulk pricing for Portuguese businesses
  static getCorporatePricing(tier: import('./supabase').MembershipTier, employeeCount: number): PricingConfig {
    const baseConfig = this.calculateOptimizedPricing(tier)
    
    // Volume discounts for Portuguese businesses
    let corporateDiscount = 0
    if (employeeCount >= 50) corporateDiscount = 30
    else if (employeeCount >= 20) corporateDiscount = 20
    else if (employeeCount >= 10) corporateDiscount = 15
    else if (employeeCount >= 5) corporateDiscount = 10
    
    const discountedMonthly = Math.round(baseConfig.currentMonthlyPrice * (1 - corporateDiscount / 100))
    const discountedYearly = Math.round(baseConfig.currentYearlyPrice * (1 - corporateDiscount / 100))
    
    return {
      ...baseConfig,
      currentMonthlyPrice: discountedMonthly,
      currentYearlyPrice: discountedYearly,
      corporateDiscount,
      discountPercentage: corporateDiscount
    }
  }
  
  // Format pricing for Lusophone locale
  static formatPortuguesePrice(price: number, currency: string = 'GBP'): string {
    const priceInPounds = price / 100 // Convert from pence to pounds
    
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(priceInPounds)
  }
  
  // Get recommended tier based on user profile
  static getRecommendedTier(userProfile: {
    age?: number
    isStudent?: boolean
    hasFamily?: boolean
    isBusinessOwner?: boolean
    monthsInUK?: number
  }): import('./supabase').MembershipTier {
    
    // Student identification
    if (userProfile.isStudent) {
      return 'student'
    }
    
    // Business owner identification
    if (userProfile.isBusinessOwner) {
      return userProfile.hasFamily ? 'business' : 'professional'
    }
    
    // Family considerations
    if (userProfile.hasFamily) {
      return userProfile.monthsInUK && userProfile.monthsInUK > 24 ? 'business' : 'professional'
    }
    
    // Age-based recommendations
    if (userProfile.age) {
      if (userProfile.age < 25) return 'student'
      if (userProfile.age > 45) return 'business'
    }
    
    // Default professional tier for most Portuguese-speaking community members
    return 'professional'
  }
  
  // Calculate ROI for membership investment
  static calculateMembershipROI(tier: import('./supabase').MembershipTier, expectedUsage: {
    monthlyEvents?: number
    businessConnections?: number
    serviceUsage?: number
  }): number {
    const { getMembershipTierConfig } = require('./supabase')
    const config = getMembershipTierConfig(tier)
    const pricing = this.calculateOptimizedPricing(tier)
    
    // Estimated value of benefits
    let estimatedValue = 0
    
    // Event value (£20 per premium event)
    if (expectedUsage.monthlyEvents) {
      estimatedValue += expectedUsage.monthlyEvents * 20 * 12
    }
    
    // Business connection value (£100 per quality connection)
    if (expectedUsage.businessConnections) {
      estimatedValue += expectedUsage.businessConnections * 100
    }
    
    // Service discount savings
    if (expectedUsage.serviceUsage) {
      const discountRate = tier === 'student' ? 0.5 : tier === 'professional' ? 0.1 : tier === 'business' ? 0.2 : tier === 'vip' ? 0.3 : 0
      estimatedValue += expectedUsage.serviceUsage * discountRate
    }
    
    // ROI calculation
    const yearlyInvestment = pricing.currentYearlyPrice / 100
    return Math.round(((estimatedValue - yearlyInvestment) / yearlyInvestment) * 100)
  }
}