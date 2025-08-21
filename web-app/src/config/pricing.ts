/**
 * Centralized Pricing Configuration and Helpers
 * 
 * All pricing, currency, and payment-related constants and utilities
 * to eliminate hardcoded price strings throughout the application.
 */

export type Currency = "GBP" | "EUR" | "USD" | "BRL";

export const CURRENCIES = {
  GBP: { symbol: "£", code: "GBP", name: "British Pound" },
  EUR: { symbol: "€", code: "EUR", name: "Euro" },
  USD: { symbol: "$", code: "USD", name: "US Dollar" },
  BRL: { symbol: "R$", code: "BRL", name: "Brazilian Real" }
} as const;

export const currency: Currency = "GBP";
export const currencySymbol = "£";

// Subscription Plans (display amounts in major units)
export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    monthly: 0,
    annual: 0,
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
    monthly: 19.99,
    annual: 199.99, // ~17% discount
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
    monthly: 39.99,
    annual: 399.99, // ~17% discount
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

// Legacy pricing (deprecated - use plans instead)
export const membership = {
  annual: 25, // Legacy £25/year - deprecated
  studentAnnual: 12.5, // Legacy student rate - deprecated
  groupAnnual: 20, // Legacy group pricing - deprecated
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
  student: 0.5, // 50% off
  annual: 0.17, // 17% off (2 months free)
  earlyBird: 0.2, // 20% off for early adopters
  referral: 0.1, // 10% off for successful referrals
  groupBooking: 0.15, // 15% off for group bookings (5+ people)
  portuguese: 0.05 // 5% off for Portuguese cultural events
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
  locale: string = "en-GB"
) => {
  return new Intl.NumberFormat(locale, { 
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

// Student pricing utilities
export const getStudentPrice = (
  planId: keyof typeof SUBSCRIPTION_PLANS, 
  billing: 'monthly' | 'annual' = 'monthly'
): number => {
  const regularPrice = getPlanPrice(planId, billing);
  return calculateDiscount(regularPrice, 'student');
};

export const getFormattedStudentPrice = (
  planId: keyof typeof SUBSCRIPTION_PLANS, 
  billing: 'monthly' | 'annual' = 'monthly',
  currency: Currency = 'GBP'
): string => {
  const studentPrice = getStudentPrice(planId, billing);
  return formatPrice(studentPrice, currency);
};

// Type definitions
export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
export type TransportService = keyof typeof TRANSPORT_PRICING;
export type DiscountType = keyof typeof DISCOUNTS;
export type BusinessListingType = keyof typeof BUSINESS_PRICING;
