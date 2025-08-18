// Centralized pricing configuration and helpers

export type Currency = 'GBP';

export const currency: Currency = 'GBP';
export const currencySymbol = '£';

// Updated 3-Tier Pricing Structure (monthly plans)
export const plans = {
  free: {
    monthly: 0,
    labelEn: 'Free Member',
    labelPt: 'Membro Grátis',
    features: ['3 matches/day', '10 messages/month', 'Basic profile', '1 free event/month'],
  },
  community: {
    monthly: 19.99,
    labelEn: 'Community Member',
    labelPt: 'Membro da Comunidade',
    features: ['Unlimited matches', 'Unlimited messaging', 'Full events access', 'Priority support'],
    popular: true,
  },
  ambassador: {
    monthly: 39.99,
    labelEn: 'Cultural Ambassador',
    labelPt: 'Embaixador Cultural',
    features: ['Everything in Community', 'Priority event visibility', 'Host events', 'VIP experiences'],
  },
} as const;

// Legacy memberships (deprecated - use monthly plans above)
export const membership = {
  // These are kept for backward compatibility but should not be used in new features
  annual: 25, // DEPRECATED: Use monthly plans instead
  studentAnnual: 12.5, // DEPRECATED: Student discounts now applied to monthly plans  
  groupAnnual: 20, // DEPRECATED: Group discounts applied to monthly plans
} as const;

// Creator/Events pricing
export const creator = {
  proMonthly: 24.99, // Creator Pro monthly
  ticketFeePercent: 8, // % per ticket
  ticketFeeFlat: 0.40, // £ per ticket
} as const;

// Generic formatter (en-GB)
export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

export const planPriceLabel = (plan: keyof typeof plans, locale: 'en' | 'pt' = 'en') => {
  const p = plans[plan];
  const label = locale === 'pt' ? p.labelPt : p.labelEn;
  return `${label} ${formatPrice(p.monthly)}/month`;
};

export const monthlyPrice = (plan: keyof typeof plans) => plans[plan].monthly;
export const annualMembershipPrice = () => membership.annual;
export const studentAnnualPrice = () => membership.studentAnnual;
export const groupAnnualPrice = () => membership.groupAnnual;
