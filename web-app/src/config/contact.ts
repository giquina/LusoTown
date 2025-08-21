import { SOCIAL_URLS } from '@/config'
export const contactInfo = {
  general: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@lusotown.com',
  safety: process.env.NEXT_PUBLIC_SAFETY_EMAIL || 'safety@lusotown.com',
  events: process.env.NEXT_PUBLIC_EVENTS_EMAIL || 'events@lusotown.com',
  tech: process.env.NEXT_PUBLIC_TECH_EMAIL || 'tech@lusotown.com',
  support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@lusotown.com',
  partnerships: process.env.NEXT_PUBLIC_PARTNERSHIPS_EMAIL || 'partnerships@lusotown.com'
};

export const contactPhones = {
  general: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+44 20 7123 4567',
  emergency: process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '+44 20 7123 4567'
};

export const socialMedia = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/lusotown',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/lusotown',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/lusotown',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/lusotown',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@lusotown'
};

export const officeLocations = {
  london: {
    name: process.env.NEXT_PUBLIC_OFFICE_NAME || 'LusoTown London HQ',
    address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || 'Portuguese Community Centre, Vauxhall, London',
    postcode: process.env.NEXT_PUBLIC_OFFICE_POSTCODE || 'SW8 2LG',
    phone: contactPhones.general,
    email: contactInfo.general
  }
};