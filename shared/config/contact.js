// Shared contact configuration for LusoTown platform
// This file provides contact configuration that can be used by both web and mobile apps
// Following LusoTown's zero hardcoding policy

const CONTACT_INFO = {
  // Primary contact methods
  email: {
    primary: process.env.CONTACT_EMAIL || 'hello@lusotown.com',
    support: process.env.SUPPORT_EMAIL || 'support@lusotown.com',
    business: process.env.BUSINESS_EMAIL || 'business@lusotown.com',
    partnerships: process.env.PARTNERSHIPS_EMAIL || 'partnerships@lusotown.com',
    press: process.env.PRESS_EMAIL || 'press@lusotown.com',
    legal: process.env.LEGAL_EMAIL || 'legal@lusotown.com'
  },

  // Demo account for testing
  demo: {
    email: process.env.DEMO_EMAIL || 'demo@lusotown.com',
    password: process.env.DEMO_PASSWORD || 'LusoTown2025!',
    name: 'Demo User'
  },

  // Phone numbers
  phone: {
    main: process.env.CONTACT_PHONE || '+44 20 7123 4567',
    whatsapp: process.env.WHATSAPP_NUMBER || '+44 7123 456789',
    emergency: process.env.EMERGENCY_CONTACT || '+44 20 7123 4567'
  },

  // Physical addresses
  address: {
    registered: {
      line1: '123 Portuguese Square',
      line2: 'Suite 100',
      city: 'London',
      postcode: 'E1 6AN',
      country: 'United Kingdom',
      countryCode: 'GB'
    },
    postal: {
      line1: 'PO Box 1234',
      city: 'London',
      postcode: 'E1 6AN',
      country: 'United Kingdom',
      countryCode: 'GB'
    }
  },

  // Social media handles
  social: {
    twitter: process.env.TWITTER_HANDLE || '@LusoTownUK',
    instagram: process.env.INSTAGRAM_HANDLE || '@lusotownuk',
    facebook: process.env.FACEBOOK_PAGE || 'LusoTownUK',
    linkedin: process.env.LINKEDIN_COMPANY || 'company/lusotown',
    youtube: process.env.YOUTUBE_CHANNEL || '@LusoTownUK',
    tiktok: process.env.TIKTOK_HANDLE || '@lusotownuk'
  },

  // Website URLs
  urls: {
    website: process.env.WEBSITE_URL || 'https://lusotown.com',
    blog: process.env.BLOG_URL || 'https://blog.lusotown.com',
    help: process.env.HELP_URL || 'https://help.lusotown.com',
    status: process.env.STATUS_URL || 'https://status.lusotown.com',
    careers: process.env.CAREERS_URL || 'https://careers.lusotown.com'
  },

  // Business hours (in GMT/BST)
  businessHours: {
    timezone: 'Europe/London',
    weekdays: {
      start: '09:00',
      end: '18:00'
    },
    weekends: {
      start: '10:00',
      end: '16:00'
    },
    closed: ['Sunday'] // Days when support is closed
  },

  // Response times
  responseTime: {
    email: '24 hours',
    phone: 'Immediate',
    whatsapp: '2 hours',
    social: '4 hours',
    emergency: 'Immediate'
  }
};

// Portuguese-speaking community specific contacts
const PORTUGUESE_CONTACTS = {
  // Cultural centers and institutions
  institutoCamoes: {
    name: 'Instituto Camões',
    email: 'london@instituto-camoes.pt',
    phone: '+44 20 7581 8722',
    address: '11 Belgrave Square, London SW1X 8PP'
  },

  consulateGeneral: {
    name: 'Consulado Geral de Portugal em Londres',
    email: 'consulado@cgportugallondres.gov.pt',
    phone: '+44 20 7581 8722',
    address: '11 Belgrave Square, London SW1X 8PP'
  },

  casaDoBrasil: {
    name: 'Casa do Brasil em Londres',
    email: 'info@casadobrasil.org.uk',
    phone: '+44 20 7840 9200',
    address: '32 Green Street, London W1K 7AT'
  }
};

// Mobile app specific contact methods
const MOBILE_CONTACT = {
  // In-app support
  inAppSupport: {
    enabled: true,
    chatSupport: true,
    voiceSupport: false,
    videoSupport: false
  },

  // Push notifications for support
  notifications: {
    supportUpdates: true,
    emergencyAlerts: true,
    maintenanceAlerts: true
  },

  // App store support
  appStore: {
    ios: {
      supportUrl: 'https://apps.apple.com/app/lusotown/id1234567890',
      reviewUrl: 'https://apps.apple.com/app/lusotown/id1234567890?action=write-review'
    },
    android: {
      supportUrl: 'https://play.google.com/store/apps/details?id=com.lusotown.app',
      reviewUrl: 'https://play.google.com/store/apps/details?id=com.lusotown.app&showAllReviews=true'
    }
  }
};

// Emergency contacts for community safety
const EMERGENCY_CONTACTS = {
  uk: {
    police: '999',
    medical: '999',
    fire: '999',
    nonEmergencyPolice: '101',
    nhsDirect: '111'
  },
  
  portugal: {
    police: '112',
    medical: '112',
    fire: '112',
    nonEmergency: '808 200 000'
  },

  // Community-specific emergency support
  communitySupport: {
    mental_health: {
      name: 'Samaritans',
      phone: '116 123',
      available: '24/7',
      free: true
    },
    domestic_violence: {
      name: 'National Domestic Violence Helpline',
      phone: '0808 2000 247',
      available: '24/7',
      free: true
    }
  }
};

// Helper functions
const formatPhoneNumber = (phone, country = 'UK') => {
  // Basic phone number formatting
  if (country === 'UK') {
    return phone.replace(/(\+44)(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  }
  return phone;
};

const getBusinessHoursStatus = () => {
  const now = new Date();
  const londonTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  const currentHour = parseInt(londonTime.split(':')[0]);
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  
  if (isWeekend) {
    return currentHour >= 10 && currentHour < 16 ? 'open' : 'closed';
  }
  
  return currentHour >= 9 && currentHour < 18 ? 'open' : 'closed';
};

module.exports = {
  CONTACT_INFO,
  PORTUGUESE_CONTACTS,
  MOBILE_CONTACT,
  EMERGENCY_CONTACTS,
  
  // Helper functions
  formatPhoneNumber,
  getBusinessHoursStatus
};