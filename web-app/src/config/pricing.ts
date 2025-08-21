/**
 * Centralized Pricing Configuration and Helpers
 * 
 * All pricing, currency, and payment-related constants and utilities
 * to eliminate hardcoded price strings throughout the application.
 * 
 * Environment variables support for dynamic pricing:
 * - NEXT_PUBLIC_COMMUNITY_PRICE_MONTHLY
 * - NEXT_PUBLIC_AMBASSADOR_PRICE_MONTHLY
 * - NEXT_PUBLIC_STUDENT_DISCOUNT_RATE
 * - NEXT_PUBLIC_ANNUAL_DISCOUNT_RATE
 */

export type Currency = "GBP" | "EUR" | "USD" | "BRL";

export const CURRENCIES = {
  GBP: { symbol: "£", code: "GBP", name: "British Pound", locale: "en-GB" },
  EUR: { symbol: "€", code: "EUR", name: "Euro", locale: "de-DE" },
  USD: { symbol: "$", code: "USD", name: "US Dollar", locale: "en-US" },
  BRL: { symbol: "R$", code: "BRL", name: "Brazilian Real", locale: "pt-BR" }
} as const;

export const currency: Currency = "GBP";
export const currencySymbol = "£";

// Environment variable overrides for dynamic pricing
const getEnvPrice = (key: string, defaultValue: number): number => {
  if (typeof window !== 'undefined') {
    const envValue = process.env[`NEXT_PUBLIC_${key}`];
    return envValue ? parseFloat(envValue) : defaultValue;
  }
  return defaultValue;
};

// Subscription Plans (display amounts in major units)
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    monthly: 0,
    annual: 0,
    monthlyStripe: 0, // in pence for Stripe
    annualStripe: 0, // in pence for Stripe
    labelEn: "Free",
    labelPt: "Grátis",
    features: {
      matches: 3,
      messages: 10,
      events: true,
      basicSupport: true
    }
  },
  community: {
    id: 'community',
    monthly: getEnvPrice('COMMUNITY_PRICE_MONTHLY', 19.99),
    annual: getEnvPrice('COMMUNITY_PRICE_ANNUAL', 199.99), // ~17% discount
    get monthlyStripe() { return Math.round(this.monthly * 100) }, // in pence for Stripe
    get annualStripe() { return Math.round(this.annual * 100) }, // in pence for Stripe
    labelEn: "Community Member",
    labelPt: "Membro da Comunidade",
    features: {
      matches: -1, // unlimited
      messages: -1, // unlimited
      events: true,
      prioritySupport: true,
      networking: true
    }
  },
  ambassador: {
    id: 'ambassador',
    monthly: getEnvPrice('AMBASSADOR_PRICE_MONTHLY', 39.99),
    annual: getEnvPrice('AMBASSADOR_PRICE_ANNUAL', 399.99), // ~17% discount
    get monthlyStripe() { return Math.round(this.monthly * 100) }, // in pence for Stripe
    get annualStripe() { return Math.round(this.annual * 100) }, // in pence for Stripe
    labelEn: "Cultural Ambassador",
    labelPt: "Embaixador Cultural",
    features: {
      matches: -1, // unlimited
      messages: -1, // unlimited
      events: true,
      prioritySupport: true,
      networking: true,
      premiumEvents: true,
      eventHosting: true,
      businessDirectory: true
    }
  }
} as const;

// Legacy plans for backward compatibility
export const plans = {
  community: SUBSCRIPTION_PLANS.community,
  ambassador: SUBSCRIPTION_PLANS.ambassador,
} as const;

// Legacy pricing (deprecated - use LEGACY_TRANSPORT_PRICING instead)
export const membership = {
  annual: LEGACY_TRANSPORT_PRICING.annual,
  studentAnnual: LEGACY_TRANSPORT_PRICING.studentAnnual,
  groupAnnual: LEGACY_TRANSPORT_PRICING.groupAnnual,
} as const;

// Creator/Events pricing
export const creator = {
  proMonthly: 24.99, // Creator Pro monthly
  ticketFeePercent: 8, // % per ticket
  ticketFeeFlat: 0.4, // £ per ticket
} as const;

// Legacy formatter (deprecated - use enhanced formatPrice below)
export const legacyFormatPrice = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    amount
  );

export const planPriceLabel = (
  plan: keyof typeof plans,
  locale: "en" | "pt" = "en"
) => {
  const p = plans[plan];
  const label = locale === "pt" ? p.labelPt : p.labelEn;
  return `${label} ${legacyFormatPrice(p.monthly)}/month`;
};

export const monthlyPrice = (plan: keyof typeof plans) => plans[plan].monthly;

// New subscription helper functions
export const getCommunityMembershipPrice = () => plans.community.monthly;
export const getCulturalAmbassadorPrice = () => plans.ambassador.monthly;

// Transport Services Pricing
export const TRANSPORT_PRICING = {
  luxury: {
    baseRate: 45, // per hour
    minimumBooking: 2, // hours
    extraPassenger: 5, // per passenger after 4
    waitTime: 25, // per hour
    airportSurcharge: 15
  },
  group: {
    baseRate: 35, // per hour
    minimumBooking: 3, // hours
    maxPassengers: 8,
    extraHour: 30
  },
  student: {
    baseRate: 25, // per hour
    discount: 0.5, // 50% off regular pricing
    verificationRequired: true
  },
  // Security services
  security: {
    basicProtection: 400, // per day
    enhancedProtection: 800, // per day
    closeProtection: 65 // per hour
  },
  // Premium transport packages
  packages: {
    premium4Hours: 320,
    premium6Hours: 380,
    premium6HoursPlus: 450,
    premium8Hours: 520,
    group4Hours: 280,
    group8Hours: 580,
    VIPWeekend: 1480,
    specialEvent5Hours: 420,
    airportPickup2Hours: 145,
    airportTransfer4Hours: 320,
    eventTransport3Hours: 380
  }
} as const;

// Event and Creator Pricing
export const EVENT_PRICING = {
  ticketFeePercent: 8, // % per ticket
  ticketFeeFlat: 0.4, // £ per ticket
  minimumTicketFee: 0.5,
  maximumTicketFee: 25,
  creatorRevenueSplit: 0.85, // 85% to creator, 15% to platform
  premiumEventFee: 15 // flat fee for premium event features
} as const;

// Business Directory Pricing
export const BUSINESS_PRICING = {
  basicListing: 0, // free
  premiumListing: 29.99, // per month
  featuredListing: 49.99, // per month
  verificationFee: 15, // one-time
  additionalPhotos: 5, // per photo beyond free limit
  socialMediaBoost: 19.99 // per month
} as const;

// Streaming Platform Pricing
export const STREAMING_PRICING = {
  creatorMonthly: 24.99,
  donationFee: 0.03, // 3% platform fee
  subscriptionFee: 0.05, // 5% platform fee
  minimumDonation: 1,
  maximumDonation: 500,
  creatorRevenueSplit: 0.85 // 85% to creator
} as const;

// Payment Processing Fees
export const PAYMENT_FEES = {
  stripe: {
    cardRate: 0.014, // 1.4%
    cardFee: 0.2, // 20p
    europeanCardRate: 0.025, // 2.5%
    paymentIntentFee: 0.2
  },
  paypal: {
    domesticRate: 0.034, // 3.4%
    internationalRate: 0.044, // 4.4%
    fixedFee: 0.2
  }
} as const;

// Discount and Promotion Constants
export const DISCOUNTS = {
  student: getEnvPrice('STUDENT_DISCOUNT_RATE', 0.5), // 50% off
  annual: getEnvPrice('ANNUAL_DISCOUNT_RATE', 0.17), // 17% off (2 months free)
  earlyBird: 0.2, // 20% off for early adopters
  referral: 0.1, // 10% off for successful referrals
  groupBooking: 0.15, // 15% off for group bookings (5+ people)
  portuguese: 0.05 // 5% off for Portuguese cultural events
} as const;

// Student Pricing (calculated with discount)
export const STUDENT_PRICING = {
  community: {
    monthly: SUBSCRIPTION_PLANS.community.monthly * (1 - DISCOUNTS.student),
    annual: SUBSCRIPTION_PLANS.community.annual * (1 - DISCOUNTS.student),
    get monthlyFormatted() { return formatPrice(this.monthly) },
    get annualFormatted() { return formatPrice(this.annual) },
    get monthlyStripe() { return Math.round(this.monthly * 100) },
    get annualStripe() { return Math.round(this.annual * 100) }
  },
  ambassador: {
    monthly: SUBSCRIPTION_PLANS.ambassador.monthly * (1 - DISCOUNTS.student),
    annual: SUBSCRIPTION_PLANS.ambassador.annual * (1 - DISCOUNTS.student),
    get monthlyFormatted() { return formatPrice(this.monthly) },
    get annualFormatted() { return formatPrice(this.annual) },
    get monthlyStripe() { return Math.round(this.monthly * 100) },
    get annualStripe() { return Math.round(this.annual * 100) }
  }
} as const;

// Transport Legacy Pricing (for backward compatibility)
export const LEGACY_TRANSPORT_PRICING = {
  annual: getEnvPrice('TRANSPORT_ANNUAL_PRICE', 25), // £25/year
  studentAnnual: getEnvPrice('TRANSPORT_STUDENT_ANNUAL_PRICE', 12.5), // £12.50/year student rate
  groupAnnual: 20, // Legacy group pricing
} as const;

// Price Display Constants
export const PRICE_DISPLAY = {
  fromLabel: "From",
  fromLabelPt: "A partir de",
  perMonthLabel: "/month",
  perMonthLabelPt: "/mês",
  perYearLabel: "/year",
  perYearLabelPt: "/ano",
  perHourLabel: "/hour",
  perHourLabelPt: "/hora",
  freeLabel: "Free",
  freeLabelPt: "Grátis",
  popularLabel: "Most Popular",
  popularLabelPt: "Mais Popular",
  saveLabel: "Save",
  saveLabelPt: "Economize"
} as const;

// Enhanced formatter with multi-currency support
export const formatPrice = (
  amount: number, 
  currencyCode: Currency = "GBP",
  locale?: string
) => {
  const defaultLocale = locale || CURRENCIES[currencyCode].locale;
  return new Intl.NumberFormat(defaultLocale, { 
    style: "currency", 
    currency: currencyCode 
  }).format(amount);
};

export const formatPriceRange = (
  minAmount: number, 
  maxAmount: number, 
  currencyCode: Currency = "GBP"
) => {
  const min = formatPrice(minAmount, currencyCode);
  const max = formatPrice(maxAmount, currencyCode);
  return `${min} - ${max}`;
};

export const calculateDiscount = (
  originalPrice: number, 
  discountType: keyof typeof DISCOUNTS
): number => {
  const discountRate = DISCOUNTS[discountType];
  return originalPrice * (1 - discountRate);
};

export const calculateSubscriptionSavings = (monthlyPrice: number): number => {
  const annualPrice = monthlyPrice * 12;
  const discountedAnnual = calculateDiscount(annualPrice, 'annual');
  return annualPrice - discountedAnnual;
};

export const getPlanPrice = (
  planId: keyof typeof SUBSCRIPTION_PLANS, 
  billing: 'monthly' | 'annual' = 'monthly'
): number => {
  return SUBSCRIPTION_PLANS[planId][billing];
};

export const getPlanLabel = (
  planId: keyof typeof SUBSCRIPTION_PLANS, 
  locale: 'en' | 'pt' = 'en'
): string => {
  const plan = SUBSCRIPTION_PLANS[planId];
  return locale === 'pt' ? plan.labelPt : plan.labelEn;
};

export const getFormattedPlanPrice = (
  planId: keyof typeof SUBSCRIPTION_PLANS,
  billing: 'monthly' | 'annual' = 'monthly',
  locale: 'en' | 'pt' = 'en'
): string => {
  const price = getPlanPrice(planId, billing);
  const formattedPrice = formatPrice(price);
  
  if (price === 0) {
    return locale === 'pt' ? PRICE_DISPLAY.freeLabelPt : PRICE_DISPLAY.freeLabel;
  }
  
  const periodLabel = billing === 'annual' 
    ? (locale === 'pt' ? PRICE_DISPLAY.perYearLabelPt : PRICE_DISPLAY.perYearLabel)
    : (locale === 'pt' ? PRICE_DISPLAY.perMonthLabelPt : PRICE_DISPLAY.perMonthLabel);
  
  return `${formattedPrice}${periodLabel}`;
};

export const getTransportQuote = (
  serviceType: keyof typeof TRANSPORT_PRICING,
  hours: number,
  passengers: number = 1
): number => {
  const service = TRANSPORT_PRICING[serviceType];
  const baseRate = service.baseRate;
  
  // Handle different service types
  let minimumHours = 1;
  if ('minimumBooking' in service) {
    minimumHours = service.minimumBooking;
  }
  
  const billingHours = Math.max(hours, minimumHours);
  let totalPrice = baseRate * billingHours;
  
  // Add extra passenger fee if applicable
  if ('extraPassenger' in service && passengers > 4) {
    totalPrice += (passengers - 4) * service.extraPassenger;
  }
  
  return totalPrice;
};

// Legacy helpers (deprecated but maintained for compatibility)
export const annualMembershipPrice = () => membership.annual;
export const studentAnnualPrice = () => membership.studentAnnual;
export const groupAnnualPrice = () => membership.groupAnnual;

// Comprehensive Pricing Helpers
export const getStudentPrice = (
  planId: keyof typeof SUBSCRIPTION_PLANS,
  billing: 'monthly' | 'annual' = 'monthly'
): number => {
  return STUDENT_PRICING[planId as keyof typeof STUDENT_PRICING][billing];
};

export const getFormattedStudentPrice = (
  planId: keyof typeof SUBSCRIPTION_PLANS,
  billing: 'monthly' | 'annual' = 'monthly',
  locale: 'en' | 'pt' = 'en'
): string => {
  const price = getStudentPrice(planId, billing);
  const formattedPrice = formatPrice(price);
  
  if (price === 0) {
    return locale === 'pt' ? PRICE_DISPLAY.freeLabelPt : PRICE_DISPLAY.freeLabel;
  }
  
  const periodLabel = billing === 'annual' 
    ? (locale === 'pt' ? PRICE_DISPLAY.perYearLabelPt : PRICE_DISPLAY.perYearLabel)
    : (locale === 'pt' ? PRICE_DISPLAY.perMonthLabelPt : PRICE_DISPLAY.perMonthLabel);
  
  return `${formattedPrice}${periodLabel}`;
};

export const getPriceForStripe = (
  planId: keyof typeof SUBSCRIPTION_PLANS,
  billing: 'monthly' | 'annual' = 'monthly',
  isStudent: boolean = false
): number => {
  if (isStudent) {
    return STUDENT_PRICING[planId as keyof typeof STUDENT_PRICING][`${billing}Stripe` as const];
  }
  return SUBSCRIPTION_PLANS[planId][`${billing}Stripe` as const];
};

export const getSavingsAmount = (planId: keyof typeof SUBSCRIPTION_PLANS): number => {
  const monthly = SUBSCRIPTION_PLANS[planId].monthly * 12;
  const annual = SUBSCRIPTION_PLANS[planId].annual;
  return monthly - annual;
};

export const getSavingsPercentage = (planId: keyof typeof SUBSCRIPTION_PLANS): number => {
  const monthly = SUBSCRIPTION_PLANS[planId].monthly * 12;
  const annual = SUBSCRIPTION_PLANS[planId].annual;
  return Math.round(((monthly - annual) / monthly) * 100);
};

export const getFormattedSavings = (
  planId: keyof typeof SUBSCRIPTION_PLANS,
  locale: 'en' | 'pt' = 'en'
): string => {
  const percentage = getSavingsPercentage(planId);
  const saveLabel = locale === 'pt' ? PRICE_DISPLAY.saveLabelPt : PRICE_DISPLAY.saveLabel;
  return `${saveLabel} ${percentage}%`;
};

// Price comparison helpers
export const comparePrices = (
  price1: number,
  price2: number,
  currencyCode: Currency = "GBP"
): {
  difference: number;
  percentageDifference: number;
  formattedDifference: string;
  cheaperOption: 'first' | 'second' | 'equal';
} => {
  const difference = Math.abs(price1 - price2);
  const percentageDifference = price1 !== 0 ? Math.round((difference / price1) * 100) : 0;
  const formattedDifference = formatPrice(difference, currencyCode);
  
  let cheaperOption: 'first' | 'second' | 'equal';
  if (price1 < price2) cheaperOption = 'first';
  else if (price2 < price1) cheaperOption = 'second';
  else cheaperOption = 'equal';
  
  return {
    difference,
    percentageDifference,
    formattedDifference,
    cheaperOption
  };
};

// Multi-currency conversion helpers (requires exchange rate API)
export const convertPrice = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRate?: number
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Placeholder for exchange rate logic
  // In production, this would use real-time exchange rates
  const defaultRates: Record<string, number> = {
    'GBP-EUR': 1.17,
    'GBP-USD': 1.27,
    'GBP-BRL': 6.54,
    'EUR-GBP': 0.85,
    'USD-GBP': 0.79,
    'BRL-GBP': 0.15
  };
  
  const rateKey = `${fromCurrency}-${toCurrency}`;
  const rate = exchangeRate || defaultRates[rateKey] || 1;
  
  return amount * rate;
};

// Validation helpers
export const isPriceValid = (price: number): boolean => {
  return typeof price === 'number' && price >= 0 && Number.isFinite(price);
};

export const validateSubscriptionTier = (tier: string): tier is keyof typeof SUBSCRIPTION_PLANS => {
  return tier in SUBSCRIPTION_PLANS;
};

export const validateCurrency = (currency: string): currency is Currency => {
  return currency in CURRENCIES;
};

// Tours and Events Pricing
export const TOURS_PRICING = {
  // Women-focused events
  womenNetworking: {
    wine30Plus: 85,
    professional40Plus: 165
  },
  
  // Professional development
  professional: {
    websiteCreation: 125,
    businessNetworking: 165
  },
  
  // Cultural experiences
  cultural: {
    languageExchange: 75,
    fadoNight: 95,
    cookingWorkshop: 95
  },
  
  // Tours and experiences  
  tours: {
    canterburyHeritage: 145,
    walkingTour: 35
  },
  
  // Social activities
  social: {
    fridayNight: 25,
    bookClub: 20
  }
} as const;

// Extended Events Pricing (from events.ts)
export const EVENTS_PRICING = {
  // Cultural events
  cultural: {
    fadoEvening: 45,
    portugalFestival: 55,
    traditionalDinner: 35,
    capeVerdeanNight: 30
  },
  
  // Sports and entertainment  
  sports: {
    footballViewing: 15,
    quadradoShow: 25
  },
  
  // Professional and networking
  professional: {
    businessNetworking: 25,
    businessBreakfast: 45,
    womenNetworking: 38,
    aiCodingWorkshop: 85
  },
  
  // Premium experiences
  premium: {
    royalCulturalTour: 58,
    luxuryNightOut: 65,
    photographyExperience: 45,
    culinaryTour: 52
  },
  
  // Community events
  community: {
    languageCafe: 8,
    carnivalCelebration: 20,
    freeEvents: 0 // Free events
  }
} as const;

// Legacy tours pricing structure for compatibility
export const toursPricing = {
  walkingTours: {
    standard: TOURS_PRICING.tours.walkingTour,
    heritage: TOURS_PRICING.tours.canterburyHeritage
  },
  womenEvents: {
    wine30Plus: TOURS_PRICING.womenNetworking.wine30Plus,
    professional40Plus: TOURS_PRICING.womenNetworking.professional40Plus
  },
  professionalEvents: {
    websiteWorkshop: TOURS_PRICING.professional.websiteCreation,
    networking: TOURS_PRICING.professional.businessNetworking
  },
  culturalEvents: {
    languageExchange: TOURS_PRICING.cultural.languageExchange,
    fadoNight: TOURS_PRICING.cultural.fadoNight,
    cooking: TOURS_PRICING.cultural.cookingWorkshop
  },
  socialEvents: {
    fridayNight: TOURS_PRICING.social.fridayNight,
    bookClub: TOURS_PRICING.social.bookClub
  }
} as const;

// Type definitions
export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
export type TransportService = keyof typeof TRANSPORT_PRICING;
export type DiscountType = keyof typeof DISCOUNTS;
export type BusinessListingType = keyof typeof BUSINESS_PRICING;
export type ToursPricingType = keyof typeof TOURS_PRICING;

// Development helpers and validation
if (typeof window === 'undefined') {
  // Server-side validation during build
  console.log('[Pricing Config] Centralized pricing system loaded successfully');
  
  // Validate pricing consistency
  const communityMonthly = SUBSCRIPTION_PLANS.community.monthly;
  const ambassadorMonthly = SUBSCRIPTION_PLANS.ambassador.monthly;
  
  if (communityMonthly <= 0 || ambassadorMonthly <= communityMonthly) {
    console.warn('[Pricing Config] Warning: Price hierarchy may be incorrect');
  }
  
  // Validate student pricing
  const studentCommunity = STUDENT_PRICING.community.monthly;
  if (studentCommunity >= communityMonthly) {
    console.warn('[Pricing Config] Warning: Student pricing should be lower than regular pricing');
  }
}
