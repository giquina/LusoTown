// 🇵🇹 LusoTown Mobile - Portuguese Cultural Configuration

export const CULTURAL_SYMBOLS = {
  flag: '🇵🇹',
  castle: '🏰',
  ship: '⛵',
  music: '🎵',
  wine: '🍷',
  fish: '🐟',
  azulejo: '🟦',
  fado: '🎶',
  pastéis: '🧁',
  cork: '🌳',
};

export const HERITAGE_FLAGS = {
  portugal: '🇵🇹',
  brazil: '🇧🇷',
  'cape-verde': '🇨🇻',
  angola: '🇦🇴',
  mozambique: '🇲🇿',
  'guinea-bissau': '🇬🇼',
  'east-timor': '🇹🇱',
  'sao-tome': '🇸🇹',
};

export const PORTUGUESE_REGIONS = {
  minho: { name: { en: 'Minho', pt: 'Minho' }, emoji: '🌿' },
  douro: { name: { en: 'Douro', pt: 'Douro' }, emoji: '🍇' },
  'tras-os-montes': { name: { en: 'Trás-os-Montes', pt: 'Trás-os-Montes' }, emoji: '⛰️' },
  'beira-interior': { name: { en: 'Beira Interior', pt: 'Beira Interior' }, emoji: '🏔️' },
  'beira-litoral': { name: { en: 'Beira Litoral', pt: 'Beira Litoral' }, emoji: '🌊' },
  'ribatejo': { name: { en: 'Ribatejo', pt: 'Ribatejo' }, emoji: '🐂' },
  'estremadura': { name: { en: 'Estremadura', pt: 'Estremadura' }, emoji: '🏛️' },
  'alto-alentejo': { name: { en: 'Alto Alentejo', pt: 'Alto Alentejo' }, emoji: '🌾' },
  'baixo-alentejo': { name: { en: 'Baixo Alentejo', pt: 'Baixo Alentejo' }, emoji: '🫒' },
  algarve: { name: { en: 'Algarve', pt: 'Algarve' }, emoji: '🏖️' },
  azores: { name: { en: 'Azores', pt: 'Açores' }, emoji: '🌋' },
  madeira: { name: { en: 'Madeira', pt: 'Madeira' }, emoji: '🌺' },
};

export const LUSOPHONE_COUNTRIES = [
  {
    code: 'portugal',
    name: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    language: 'pt',
    capital: { en: 'Lisbon', pt: 'Lisboa' },
    continent: 'Europe',
  },
  {
    code: 'brazil',
    name: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷',
    language: 'pt',
    capital: { en: 'Brasília', pt: 'Brasília' },
    continent: 'South America',
  },
  {
    code: 'cape-verde',
    name: { en: 'Cape Verde', pt: 'Cabo Verde' },
    flag: '🇨🇻',
    language: 'pt',
    capital: { en: 'Praia', pt: 'Praia' },
    continent: 'Africa',
  },
  {
    code: 'angola',
    name: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    language: 'pt',
    capital: { en: 'Luanda', pt: 'Luanda' },
    continent: 'Africa',
  },
  {
    code: 'mozambique',
    name: { en: 'Mozambique', pt: 'Moçambique' },
    flag: '🇲🇿',
    language: 'pt',
    capital: { en: 'Maputo', pt: 'Maputo' },
    continent: 'Africa',
  },
  {
    code: 'guinea-bissau',
    name: { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' },
    flag: '🇬🇼',
    language: 'pt',
    capital: { en: 'Bissau', pt: 'Bissau' },
    continent: 'Africa',
  },
  {
    code: 'east-timor',
    name: { en: 'East Timor', pt: 'Timor-Leste' },
    flag: '🇹🇱',
    language: 'pt',
    capital: { en: 'Dili', pt: 'Díli' },
    continent: 'Asia',
  },
  {
    code: 'sao-tome',
    name: { en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' },
    flag: '🇸🇹',
    language: 'pt',
    capital: { en: 'São Tomé', pt: 'São Tomé' },
    continent: 'Africa',
  },
];

export const CULTURAL_INTERESTS = [
  { id: 'fado', name: { en: 'Fado Music', pt: 'Fado' }, emoji: '🎶', category: 'music' },
  { id: 'football', name: { en: 'Football', pt: 'Futebol' }, emoji: '⚽', category: 'sports' },
  { id: 'gastronomy', name: { en: 'Portuguese Cuisine', pt: 'Gastronomia Portuguesa' }, emoji: '🍽️', category: 'food' },
  { id: 'wine', name: { en: 'Portuguese Wines', pt: 'Vinhos Portugueses' }, emoji: '🍷', category: 'food' },
  { id: 'literature', name: { en: 'Portuguese Literature', pt: 'Literatura Portuguesa' }, emoji: '📚', category: 'culture' },
  { id: 'history', name: { en: 'Portuguese History', pt: 'História Portuguesa' }, emoji: '🏛️', category: 'culture' },
  { id: 'festivals', name: { en: 'Portuguese Festivals', pt: 'Festas Portuguesas' }, emoji: '🎊', category: 'culture' },
  { id: 'handicrafts', name: { en: 'Portuguese Handicrafts', pt: 'Artesanato Português' }, emoji: '🎨', category: 'arts' },
  { id: 'azulejos', name: { en: 'Portuguese Tiles', pt: 'Azulejos' }, emoji: '🟦', category: 'arts' },
  { id: 'navigation', name: { en: 'Portuguese Discoveries', pt: 'Descobrimentos Portugueses' }, emoji: '🧭', category: 'history' },
  { id: 'folk-dance', name: { en: 'Portuguese Folk Dance', pt: 'Folclore Português' }, emoji: '💃', category: 'dance' },
  { id: 'cork', name: { en: 'Portuguese Cork', pt: 'Cortiça Portuguesa' }, emoji: '🌳', category: 'nature' },
];

export const APP_CONFIG = {
  name: 'LusoTown',
  version: '1.0.0',
  description: {
    en: 'Portuguese-speaking Community Platform in the UK',
    pt: 'Plataforma da Comunidade de Língua Portuguesa no Reino Unido',
  },
  supportEmail: 'support@lusotown.com',
  community: {
    totalMembers: 2750,
    totalStudents: 2150,
    universityPartnerships: 8,
  },
  social: {
    twitter: '@LusoTownUK',
    instagram: '@lusotownuk',
    facebook: 'LusoTownUK',
  },
};

export const DEMO_CREDENTIALS = {
  email: 'demo@lusotown.com',
  password: 'LusoTown2025!',
};

export default {
  CULTURAL_SYMBOLS,
  HERITAGE_FLAGS,
  PORTUGUESE_REGIONS,
  LUSOPHONE_COUNTRIES,
  CULTURAL_INTERESTS,
  APP_CONFIG,
  DEMO_CREDENTIALS,
};