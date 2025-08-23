/**
 * Portuguese-speaking countries configuration for matching preferences
 * Users can select which Portuguese-speaking countries they want to match with
 */

export interface PortugueseCountry {
  code: string;
  name: string;
  namePortuguese: string;
  flag: string;
  continent: string;
  population: number;
  isPrimary: boolean; // Major Portuguese-speaking countries
  diasporaSize?: string; // Diaspora population in United Kingdom
}

export const PORTUGUESE_SPEAKING_COUNTRIES: PortugueseCountry[] = [
  // Primary Portuguese-speaking countries (most common in diaspora)
  {
    code: 'PT',
    name: 'Portugal',
    namePortuguese: 'Portugal',
    flag: '🇵🇹',
    continent: 'Europe',
    population: 10_300_000,
    isPrimary: true,
    diasporaSize: '500,000+',
  },
  {
    code: 'BR',
    name: 'Brazil',
    namePortuguese: 'Brasil',
    flag: '🇧🇷',
    continent: 'South America',
    population: 215_000_000,
    isPrimary: true,
    diasporaSize: '150,000+',
  },
  {
    code: 'AO',
    name: 'Angola',
    namePortuguese: 'Angola',
    flag: '🇦🇴',
    continent: 'Africa',
    population: 34_000_000,
    isPrimary: true,
    diasporaSize: '50,000+',
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    namePortuguese: 'Moçambique',
    flag: '🇲🇿',
    continent: 'Africa',
    population: 32_000_000,
    isPrimary: true,
    diasporaSize: '15,000+',
  },
  {
    code: 'CV',
    name: 'Cape Verde',
    namePortuguese: 'Cabo Verde',
    flag: '🇨🇻',
    continent: 'Africa',
    population: 560_000,
    isPrimary: true,
    diasporaSize: '25,000+',
  },
  
  // Secondary Portuguese-speaking countries
  {
    code: 'GW',
    name: 'Guinea-Bissau',
    namePortuguese: 'Guiné-Bissau',
    flag: '🇬🇼',
    continent: 'Africa',
    population: 2_000_000,
    isPrimary: false,
    diasporaSize: '5,000+',
  },
  {
    code: 'ST',
    name: 'São Tomé and Príncipe',
    namePortuguese: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    continent: 'Africa',
    population: 220_000,
    isPrimary: false,
    diasporaSize: '2,000+',
  },
  {
    code: 'TL',
    name: 'East Timor',
    namePortuguese: 'Timor-Leste',
    flag: '🇹🇱',
    continent: 'Asia',
    population: 1_300_000,
    isPrimary: false,
    diasporaSize: '1,000+',
  },
  {
    code: 'MO',
    name: 'Macau',
    namePortuguese: 'Macau',
    flag: '🇲🇴',
    continent: 'Asia',
    population: 680_000,
    isPrimary: false,
    diasporaSize: '3,000+',
  },
];

export const PRIMARY_COUNTRIES = PORTUGUESE_SPEAKING_COUNTRIES.filter(country => country.isPrimary);
export const SECONDARY_COUNTRIES = PORTUGUESE_SPEAKING_COUNTRIES.filter(country => !country.isPrimary);

// Default preferences for new users
export const DEFAULT_COUNTRY_PREFERENCES = ['PT', 'BR']; // Portugal and Brazil by default

// Get country by code
export const getCountryByCode = (code: string): PortugueseCountry | undefined => {
  return PORTUGUESE_SPEAKING_COUNTRIES.find(country => country.code === code);
};

// Get countries by continent for grouping
export const getCountriesByContinent = () => {
  const continents: Record<string, PortugueseCountry[]> = {};
  
  PORTUGUESE_SPEAKING_COUNTRIES.forEach(country => {
    if (!continents[country.continent]) {
      continents[country.continent] = [];
    }
    continents[country.continent].push(country);
  });
  
  return continents;
};

// Validation helper
export const isValidCountryCode = (code: string): boolean => {
  return PORTUGUESE_SPEAKING_COUNTRIES.some(country => country.code === code);
};