// Centralized pricing configuration and helpers

export type Currency = "GBP";

export const currency: Currency = "GBP";
export const currencySymbol = "£";

// Core plans (display amounts in major units)
export const plans = {
  community: {
    monthly: 19.99,
    labelEn: "Community",
    labelPt: "Comunidade",
  },
  ambassador: {
    monthly: 39.99,
    labelEn: "Ambassador",
    labelPt: "Embaixador",
  },
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

// Generic formatter (en-GB)
export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    amount
  );

export const planPriceLabel = (
  plan: keyof typeof plans,
  locale: "en" | "pt" = "en"
) => {
  const p = plans[plan];
  const label = locale === "pt" ? p.labelPt : p.labelEn;
  return `${label} ${formatPrice(p.monthly)}/month`;
};

export const monthlyPrice = (plan: keyof typeof plans) => plans[plan].monthly;

// New subscription helper functions
export const getCommunityMembershipPrice = () => plans.community.monthly;
export const getCulturalAmbassadorPrice = () => plans.ambassador.monthly;

// Legacy helpers (deprecated)
export const annualMembershipPrice = () => membership.annual;
export const studentAnnualPrice = () => membership.studentAnnual;
export const groupAnnualPrice = () => membership.groupAnnual;
