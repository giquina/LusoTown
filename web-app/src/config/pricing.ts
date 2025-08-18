// Centralized pricing configuration and helpers

export type Currency = 'GBP';

export const currency: Currency = 'GBP';
export const currencySymbol = '£';

// Core plans (display amounts in major units)
export const plans = {
  community: {
    monthly: 19.99,
    labelEn: 'Community',
    labelPt: 'Comunidade',
  },
  ambassador: {
    monthly: 39.99,
    labelEn: 'Ambassador',
    labelPt: 'Embaixador',
  },
} as const;

// Memberships
export const membership = {
  annual: 25, // £25/year standard membership
  studentAnnual: 12.5, // 50% student rate
  groupAnnual: 20, // group pricing per person used on pricing page
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
