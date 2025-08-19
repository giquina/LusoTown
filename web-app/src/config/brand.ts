export const brandConfig = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || 'LusoTown',
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE || 'Unidos pela Língua',
  taglineEn: process.env.NEXT_PUBLIC_BRAND_TAGLINE_EN || 'United by Language',
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'lusotown.com',
  domainLondon: process.env.NEXT_PUBLIC_DOMAIN_LONDON || 'lusotown.london',
  description: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION || 'London\'s Portuguese community platform for authentic connections',
  descriptionPt: process.env.NEXT_PUBLIC_BRAND_DESCRIPTION_PT || 'Plataforma da comunidade portuguesa de Londres para conexões autênticas'
};

export const defaultImages = {
  event: process.env.NEXT_PUBLIC_DEFAULT_EVENT_IMAGE || '/events/networking.jpg',
  profile: process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE || '/images/profiles/default.jpg',
  logo: process.env.NEXT_PUBLIC_LOGO_PATH || '/logo.png',
  logoWhite: process.env.NEXT_PUBLIC_LOGO_WHITE_PATH || '/logo-white.png',
  favicon: process.env.NEXT_PUBLIC_FAVICON_PATH || '/favicon.ico',
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.jpg'
};

export const venues = {
  defaultEventVenue: process.env.NEXT_PUBLIC_DEFAULT_VENUE || 'Portuguese Community Centre',
  defaultEventAddress: process.env.NEXT_PUBLIC_DEFAULT_ADDRESS || 'Vauxhall, London',
  mainHubs: [
    'Stockwell Portuguese Centre',
    'Vauxhall Cultural Centre', 
    'Borough Market',
    'Camden Portuguese Community'
  ]
};

export const brandColors = {
  primary: '#D4A574', // Portuguese gold
  secondary: '#8B4513', // Portuguese brown  
  accent: '#228B22', // Portuguese green
  action: '#DC143C', // Portuguese red
  premium: '#8B008B', // Premium purple
  coral: '#FF7F50' // Coral accent
};