/**
 * Centralized Pricing Helpers with i18n Integration
 * 
 * This module provides pricing display utilities that integrate with the
 * centralized pricing config and i18n system to eliminate hardcoded prices.
 */

import { 
  SUBSCRIPTION_PLANS,
  TRANSPORT_PRICING,
  TOURS_PRICING,
  EVENTS_PRICING,
  BUSINESS_PRICING,
  STREAMING_PRICING,
  STUDENT_PRICING,
  LEGACY_TRANSPORT_PRICING,
  formatPrice,
  getPlanPrice,
  getStudentPrice,
  type Currency,
  type SubscriptionPlan
} from '@/config/pricing';

/**
 * Get formatted subscription price with proper i18n integration
 */
export const getFormattedSubscriptionPrice = (
  planId: SubscriptionPlan,
  billing: 'monthly' | 'annual' = 'monthly',
  isStudent: boolean = false,
  locale: 'en' | 'pt' = 'en'
): string => {
  const price = isStudent 
    ? getStudentPrice(planId, billing)
    : getPlanPrice(planId, billing);
  
  const formattedPrice = formatPrice(price);
  
  if (price === 0) {
    return locale === 'pt' ? 'Grátis' : 'Free';
  }
  
  const periodLabel = billing === 'annual' 
    ? (locale === 'pt' ? '/ano' : '/year')
    : (locale === 'pt' ? '/mês' : '/month');
  
  return `${formattedPrice}${periodLabel}`;
};

/**
 * Get formatted transport pricing
 */
export const getFormattedTransportPrice = (
  serviceType: keyof typeof TRANSPORT_PRICING,
  locale: 'en' | 'pt' = 'en'
): string => {
  const service = TRANSPORT_PRICING[serviceType];
  const baseRate = service.baseRate;
  const formattedPrice = formatPrice(baseRate);
  
  const hourLabel = locale === 'pt' ? '/hora' : '/hour';
  return `${formattedPrice}${hourLabel}`;
};

/**
 * Get formatted event pricing
 */
export const getFormattedEventPrice = (
  category: keyof typeof EVENTS_PRICING,
  eventType: string,
  locale: 'en' | 'pt' = 'en'
): string => {
  const categoryPricing = EVENTS_PRICING[category];
  if (typeof categoryPricing === 'object' && eventType in categoryPricing) {
    const price = (categoryPricing as any)[eventType];
    return price === 0 ? (locale === 'pt' ? 'Grátis' : 'Free') : formatPrice(price);
  }
  return locale === 'pt' ? 'Preço a consultar' : 'Price on request';
};

/**
 * Get formatted business listing price
 */
export const getFormattedBusinessPrice = (
  listingType: keyof typeof BUSINESS_PRICING,
  locale: 'en' | 'pt' = 'en'
): string => {
  const price = BUSINESS_PRICING[listingType];
  
  if (price === 0) {
    return locale === 'pt' ? 'Grátis' : 'Free';
  }
  
  const formattedPrice = formatPrice(price);
  const monthLabel = locale === 'pt' ? '/mês' : '/month';
  return `${formattedPrice}${monthLabel}`;
};

/**
 * Get formatted streaming creator price
 */
export const getFormattedStreamingPrice = (
  locale: 'en' | 'pt' = 'en'
): string => {
  const price = STREAMING_PRICING.creatorMonthly;
  const formattedPrice = formatPrice(price);
  const monthLabel = locale === 'pt' ? '/mês' : '/month';
  return `${formattedPrice}${monthLabel}`;
};

/**
 * Get formatted legacy transport membership price
 */
export const getFormattedLegacyTransportPrice = (
  membershipType: keyof typeof LEGACY_TRANSPORT_PRICING,
  locale: 'en' | 'pt' = 'en'
): string => {
  const price = LEGACY_TRANSPORT_PRICING[membershipType];
  const formattedPrice = formatPrice(price);
  const yearLabel = locale === 'pt' ? '/ano' : '/year';
  return `${formattedPrice}${yearLabel}`;
};

/**
 * Get price range display
 */
export const getFormattedPriceRange = (
  minPrice: number,
  maxPrice: number,
  locale: 'en' | 'pt' = 'en'
): string => {
  if (minPrice === 0 && maxPrice === 0) {
    return locale === 'pt' ? 'Grátis' : 'Free';
  }
  
  if (minPrice === 0) {
    const fromLabel = locale === 'pt' ? 'A partir de' : 'From';
    return `${fromLabel} ${formatPrice(maxPrice)}`;
  }
  
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

/**
 * Get savings display for annual vs monthly plans
 */
export const getFormattedSavings = (
  planId: SubscriptionPlan,
  locale: 'en' | 'pt' = 'en'
): string => {
  const monthly = getPlanPrice(planId, 'monthly');
  const annual = getPlanPrice(planId, 'annual');
  
  const monthlyTotal = monthly * 12;
  const savings = monthlyTotal - annual;
  const savingsPercentage = Math.round((savings / monthlyTotal) * 100);
  
  const saveLabel = locale === 'pt' ? 'Economize' : 'Save';
  return `${saveLabel} ${savingsPercentage}%`;
};

/**
 * Get formatted student discount price
 */
export const getFormattedStudentDiscount = (
  planId: SubscriptionPlan,
  billing: 'monthly' | 'annual' = 'monthly',
  locale: 'en' | 'pt' = 'en'
): string => {
  const regularPrice = getPlanPrice(planId, billing);
  const studentPrice = getStudentPrice(planId, billing);
  
  const discountAmount = regularPrice - studentPrice;
  const discountPercentage = Math.round((discountAmount / regularPrice) * 100);
  
  const saveLabel = locale === 'pt' ? 'Economize' : 'Save';
  return `${saveLabel} ${discountPercentage}% (${formatPrice(discountAmount)})`;
};

/**
 * Replace hardcoded pricing in text with dynamic pricing
 */
export const replacePricingInText = (
  text: string,
  locale: 'en' | 'pt' = 'en'
): string => {
  let updatedText = text;
  
  // Replace common hardcoded prices with dynamic ones
  const replacements: { [key: string]: string } = {
    '£19.99/month': getFormattedSubscriptionPrice('community', 'monthly', false, locale),
    '£19.99/mês': getFormattedSubscriptionPrice('community', 'monthly', false, locale),
    '£39.99/month': getFormattedSubscriptionPrice('ambassador', 'monthly', false, locale),
    '£39.99/mês': getFormattedSubscriptionPrice('ambassador', 'monthly', false, locale),
    '£199/year': getFormattedSubscriptionPrice('community', 'annual', false, locale),
    '£199/ano': getFormattedSubscriptionPrice('community', 'annual', false, locale),
    '£399/year': getFormattedSubscriptionPrice('ambassador', 'annual', false, locale),
    '£399/ano': getFormattedSubscriptionPrice('ambassador', 'annual', false, locale),
    '£25/year': getFormattedLegacyTransportPrice('annual', locale),
    '£25/ano': getFormattedLegacyTransportPrice('annual', locale),
    '£12.50/year': getFormattedLegacyTransportPrice('studentAnnual', locale),
    '£12.50/ano': getFormattedLegacyTransportPrice('studentAnnual', locale),
    '£24.99/month': getFormattedStreamingPrice(locale),
    '£24.99/mês': getFormattedStreamingPrice(locale)
  };
  
  Object.entries(replacements).forEach(([hardcoded, dynamic]) => {
    updatedText = updatedText.replace(new RegExp(hardcoded, 'g'), dynamic);
  });
  
  return updatedText;
};

/**
 * Validate and format any price input
 */
export const validateAndFormatPrice = (
  input: string | number,
  currency: Currency = 'GBP'
): string => {
  const numericValue = typeof input === 'string' ? parseFloat(input) : input;
  
  if (isNaN(numericValue) || numericValue < 0) {
    return 'Invalid price';
  }
  
  return formatPrice(numericValue, currency);
};

/**
 * Get contextual pricing labels
 */
export const getPricingLabels = (locale: 'en' | 'pt' = 'en') => ({
  free: locale === 'pt' ? 'Grátis' : 'Free',
  from: locale === 'pt' ? 'A partir de' : 'From',
  perMonth: locale === 'pt' ? '/mês' : '/month',
  perYear: locale === 'pt' ? '/ano' : '/year',
  perHour: locale === 'pt' ? '/hora' : '/hour',
  perDay: locale === 'pt' ? '/dia' : '/day',
  save: locale === 'pt' ? 'Economize' : 'Save',
  popular: locale === 'pt' ? 'Mais Popular' : 'Most Popular',
  recommended: locale === 'pt' ? 'Recomendado' : 'Recommended',
  bestValue: locale === 'pt' ? 'Melhor Valor' : 'Best Value',
  studentPrice: locale === 'pt' ? 'Preço Estudante' : 'Student Price',
  regularPrice: locale === 'pt' ? 'Preço Regular' : 'Regular Price'
});

export default {
  getFormattedSubscriptionPrice,
  getFormattedTransportPrice,
  getFormattedEventPrice,
  getFormattedBusinessPrice,
  getFormattedStreamingPrice,
  getFormattedLegacyTransportPrice,
  getFormattedPriceRange,
  getFormattedSavings,
  getFormattedStudentDiscount,
  replacePricingInText,
  validateAndFormatPrice,
  getPricingLabels
};