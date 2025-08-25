// Shared pricing configuration for LusoTown platform
// This file provides pricing configuration that can be used by both web and mobile apps
// Following LusoTown's zero hardcoding policy

// Subscription Plans Configuration
const SUBSCRIPTION_PLANS = {
  community: {
    id: 'community',
    name: 'Community',
    namePt: 'Comunidade',
    monthly: parseFloat(process.env.NEXT_PUBLIC_COMMUNITY_PRICE_MONTHLY) || 19.99,
    yearly: parseFloat(process.env.NEXT_PUBLIC_COMMUNITY_PRICE_YEARLY) || 199.99,
    currency: 'GBP',
    currencySymbol: '£',
    stripePriceIdMonthly: process.env.STRIPE_COMMUNITY_PRICE_ID_MONTHLY || 'price_community_monthly',
    stripePriceIdYearly: process.env.STRIPE_COMMUNITY_PRICE_ID_YEARLY || 'price_community_yearly',
    features: [
      'Access to Portuguese cultural events',
      'Basic community matching',
      'Join Portuguese business networking',
      'Access to community forums',
      'Basic event RSVP',
      'Community messaging'
    ],
    featuresPt: [
      'Acesso a eventos culturais portugueses',
      'Matching básico da comunidade',
      'Participar em networking empresarial português',
      'Acesso aos fóruns da comunidade',
      'RSVP básico para eventos',
      'Mensagens da comunidade'
    ],
    limits: {
      eventsPerMonth: 5,
      messagesPerDay: 50,
      businessConnections: 10,
      streamingHoursPerMonth: 0
    },
    popular: false
  },

  ambassador: {
    id: 'ambassador',
    name: 'Ambassador',
    namePt: 'Embaixador',
    monthly: parseFloat(process.env.NEXT_PUBLIC_AMBASSADOR_PRICE_MONTHLY) || 39.99,
    yearly: parseFloat(process.env.NEXT_PUBLIC_AMBASSADOR_PRICE_YEARLY) || 399.99,
    currency: 'GBP',
    currencySymbol: '£',
    stripePriceIdMonthly: process.env.STRIPE_AMBASSADOR_PRICE_ID_MONTHLY || 'price_ambassador_monthly',
    stripePriceIdYearly: process.env.STRIPE_AMBASSADOR_PRICE_ID_YEARLY || 'price_ambassador_yearly',
    features: [
      'All Community features',
      'Advanced Portuguese cultural matching',
      'Premium event access',
      'Create and host events',
      'Advanced business networking',
      'Priority customer support',
      'Basic streaming access',
      'Extended messaging features'
    ],
    featuresPt: [
      'Todas as funcionalidades da Comunidade',
      'Matching cultural português avançado',
      'Acesso premium a eventos',
      'Criar e organizar eventos',
      'Networking empresarial avançado',
      'Suporte ao cliente prioritário',
      'Acesso básico ao streaming',
      'Funcionalidades de mensagens estendidas'
    ],
    limits: {
      eventsPerMonth: 20,
      messagesPerDay: 200,
      businessConnections: 50,
      streamingHoursPerMonth: 10,
      hostEventsPerMonth: 2
    },
    popular: true
  },

  elite: {
    id: 'elite',
    name: 'Elite',
    namePt: 'Elite',
    monthly: parseFloat(process.env.NEXT_PUBLIC_ELITE_PRICE_MONTHLY) || 79.99,
    yearly: parseFloat(process.env.NEXT_PUBLIC_ELITE_PRICE_YEARLY) || 799.99,
    currency: 'GBP',
    currencySymbol: '£',
    stripePriceIdMonthly: process.env.STRIPE_ELITE_PRICE_ID_MONTHLY || 'price_elite_monthly',
    stripePriceIdYearly: process.env.STRIPE_ELITE_PRICE_ID_YEARLY || 'price_elite_yearly',
    features: [
      'All Ambassador features',
      'Unlimited Portuguese cultural events',
      'VIP business networking access',
      'Premium streaming and content creation',
      'Exclusive luxury transport services',
      'White-glove concierge support',
      'Advanced analytics and insights',
      'Priority verification badges'
    ],
    featuresPt: [
      'Todas as funcionalidades do Embaixador',
      'Eventos culturais portugueses ilimitados',
      'Acesso VIP ao networking empresarial',
      'Streaming premium e criação de conteúdo',
      'Serviços de transporte de luxo exclusivos',
      'Suporte concierge de alto nível',
      'Análises e insights avançados',
      'Distintivos de verificação prioritários'
    ],
    limits: {
      eventsPerMonth: -1, // Unlimited
      messagesPerDay: -1, // Unlimited
      businessConnections: -1, // Unlimited
      streamingHoursPerMonth: -1, // Unlimited
      hostEventsPerMonth: -1 // Unlimited
    },
    popular: false
  }
};

// Student Discounts
const STUDENT_DISCOUNTS = {
  community: {
    percentage: 50,
    monthly: 9.99,
    yearly: 99.99,
    verification: 'university_email'
  },
  ambassador: {
    percentage: 40,
    monthly: 23.99,
    yearly: 239.99,
    verification: 'university_email'
  },
  elite: {
    percentage: 30,
    monthly: 55.99,
    yearly: 559.99,
    verification: 'university_email'
  }
};

// Mobile-specific pricing features
const MOBILE_FEATURES = {
  community: [
    'Mobile event notifications',
    'Basic location-based matching',
    'Mobile messaging',
    'Event check-in via QR code',
    'Portuguese cultural content feed'
  ],
  ambassador: [
    'All Community mobile features',
    'Advanced push notifications',
    'Offline event access',
    'Mobile streaming viewing',
    'Priority mobile support',
    'Advanced mobile matching'
  ],
  elite: [
    'All Ambassador mobile features',
    'Unlimited offline content',
    'Mobile live streaming creation',
    'White-glove mobile concierge',
    'Advanced mobile analytics',
    'VIP mobile experiences'
  ]
};

// Pricing Display Helpers
const formatPrice = (amount, currency = 'GBP') => {
  const symbols = {
    GBP: '£',
    EUR: '€',
    USD: '$'
  };
  
  return `${symbols[currency] || symbols.GBP}${amount.toFixed(2)}`;
};

const calculateYearlySavings = (monthly, yearly) => {
  const monthlyTotal = monthly * 12;
  const savings = monthlyTotal - yearly;
  const percentage = Math.round((savings / monthlyTotal) * 100);
  return { savings, percentage };
};

// Free tier features
const FREE_TIER = {
  id: 'free',
  name: 'Free',
  namePt: 'Gratuito',
  monthly: 0,
  yearly: 0,
  currency: 'GBP',
  currencySymbol: '£',
  features: [
    'Browse Portuguese cultural events',
    'Basic community access',
    'Limited messaging (5 per day)',
    'View business directory',
    'Community guidelines access'
  ],
  featuresPt: [
    'Navegar eventos culturais portugueses',
    'Acesso básico à comunidade',
    'Mensagens limitadas (5 por dia)',
    'Ver diretório empresarial',
    'Acesso às diretrizes da comunidade'
  ],
  limits: {
    eventsPerMonth: 1,
    messagesPerDay: 5,
    businessConnections: 1,
    streamingHoursPerMonth: 0
  }
};

module.exports = {
  SUBSCRIPTION_PLANS,
  STUDENT_DISCOUNTS,
  MOBILE_FEATURES,
  FREE_TIER,
  
  // Helper functions
  formatPrice,
  calculateYearlySavings,
  
  // Constants
  CURRENCIES: {
    GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
    EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
    USD: { symbol: '$', code: 'USD', name: 'US Dollar' }
  }
};