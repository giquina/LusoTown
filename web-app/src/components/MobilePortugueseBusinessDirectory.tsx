"use client";

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  GlobeAltIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  BanknotesIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  ShareIcon,
  ChevronRightIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon,
  MapPinIcon as MapPinSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

// Mobile Business Directory with Map Integration
interface BusinessDirectoryProps {
  businesses?: Array<{
    id: string;
    name: string;
    category: string;
    heritage: string;
    heritageFlag: string;
    description: string;
    descriptionPt?: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
    rating: number;
    reviewCount: number;
    openNow?: boolean;
    priceLevel: number;
    images: string[];
    specialties: string[];
    languages: string[];
    distance: number;
    coordinates: [number, number];
    verified: boolean;
    isFavorited?: boolean;
  }>;
  onBusinessSelect?: (businessId: string) => void;
  onToggleFavorite?: (businessId: string) => void;
  onDirections?: (businessId: string) => void;
  showMap?: boolean;
}

export function MobilePortugueseBusinessDirectory({
  businesses = [],
  onBusinessSelect,
  onToggleFavorite,
  onDirections,
  showMap = true
}: BusinessDirectoryProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Sample Portuguese businesses following cultural guidelines
  const sampleBusinesses = [
    {
      id: '1',
      name: 'Casa do Bacalhau',
      category: 'restaurant',
      heritage: 'Portugal',
      heritageFlag: '🇵🇹',
      description: 'Authentic Portuguese restaurant specializing in traditional codfish dishes and regional wines',
      descriptionPt: 'Restaurante português autêntico especializado em pratos tradicionais de bacalhau e vinhos regionais',
      address: '145 Vauxhall Bridge Road, London SW1V 1DX',
      phone: '+44 20 7834 5678',
      email: 'info@casadobacalhau.co.uk',
      website: 'www.casadobacalhau.co.uk',
      rating: 4.7,
      reviewCount: 342,
      openNow: true,
      priceLevel: 3,
      images: ['/api/placeholder/400/300'],
      specialties: ['Bacalhau à Brás', 'Francesinha', 'Pastéis de Nata', 'Vinho Verde'],
      languages: ['Lusophone', 'English'],
      distance: 0.3,
      coordinates: [51.489, -0.134] as [number, number],
      verified: true,
      isFavorited: true
    },
    {
      id: '2',
      name: 'Sabores do Brasil',
      category: 'restaurant',
      heritage: 'Brazil',
      heritageFlag: '🇧🇷',
      description: 'Brazilian steakhouse and bar featuring traditional churrasco and live samba music',
      descriptionPt: 'Churrascaria e bar brasileiro com churrasco tradicional e música de samba ao vivo',
      address: '78 Stockwell Road, London SW9 0DA',
      phone: '+44 20 7735 9012',
      website: 'www.saboresdobrasil.co.uk',
      rating: 4.5,
      reviewCount: 256,
      openNow: false,
      priceLevel: 2,
      images: ['/api/placeholder/400/300'],
      specialties: ['Picanha', 'Feijoada', 'Caipirinha', 'Pão de Açúcar'],
      languages: ['Lusophone', 'English', 'Spanish'],
      distance: 0.7,
      coordinates: [51.474, -0.123] as [number, number],
      verified: true,
      isFavorited: false
    },
    {
      id: '3',
      name: 'Morabeza Cape Verde',
      category: 'restaurant',
      heritage: 'Cape Verde',
      heritageFlag: '🇨🇻',
      description: 'Cape Verdean restaurant serving traditional island cuisine with live Morna music',
      descriptionPt: 'Restaurante cabo-verdiano com culinária tradicional das ilhas e música Morna ao vivo',
      address: '23 South Lambeth Road, London SW8 1RH',
      phone: '+44 20 7582 3456',
      rating: 4.6,
      reviewCount: 128,
      openNow: true,
      priceLevel: 2,
      images: ['/api/placeholder/400/300'],
      specialties: ['Cachupa', 'Linguiça', 'Grogue', 'Pastel com Diabo Dentro'],
      languages: ['Lusophone', 'Crioulo', 'English'],
      distance: 0.5,
      coordinates: [51.483, -0.127] as [number, number],
      verified: false,
      isFavorited: true
    },
    {
      id: '4',
      name: 'Lisboa Books & Coffee',
      category: 'bookstore',
      heritage: 'Portugal',
      heritageFlag: '🇵🇹',
      description: 'Lusophone bookstore and café with literature from all Portuguese-speaking countries',
      descriptionPt: 'Livraria e café português com literatura de todos os países lusófonos',
      address: '92 Golborne Road, London W10 5PS',
      phone: '+44 20 8960 7890',
      email: 'books@lisboacoffee.co.uk',
      website: 'www.lisboacoffee.co.uk',
      rating: 4.8,
      reviewCount: 89,
      openNow: true,
      priceLevel: 1,
      images: ['/api/placeholder/400/300'],
      specialties: ['Lusophone Literature', 'Brazilian Authors', 'African Poetry', 'Coffee'],
      languages: ['Lusophone', 'English', 'French'],
      distance: 1.2,
      coordinates: [51.524, -0.213] as [number, number],
      verified: true,
      isFavorited: false
    },
    {
      id: '5',
      name: 'Kizomba Dance Studio',
      category: 'services',
      heritage: 'Angola',
      heritageFlag: '🇦🇴',
      description: 'Professional dance studio teaching Kizomba, Semba, and other African Lusophone dances',
      descriptionPt: 'Estúdio de dança profissional que ensina Kizomba, Semba e outras danças africanas lusófonas',
      address: '156 Old Kent Road, London SE1 5TY',
      phone: '+44 20 7394 5678',
      email: 'info@kizombalondon.com',
      website: 'www.kizombalondon.com',
      rating: 4.9,
      reviewCount: 167,
      openNow: false,
      priceLevel: 2,
      images: ['/api/placeholder/400/300'],
      specialties: ['Kizomba Classes', 'Semba Workshops', 'Private Lessons', 'Cultural Events'],
      languages: ['Lusophone', 'English', 'French'],
      distance: 2.1,
      coordinates: [51.494, -0.071] as [number, number],
      verified: true,
      isFavorited: false
    }
  ];

  const displayBusinesses = businesses.length > 0 ? businesses : sampleBusinesses;

  const categories = [
    { 
      id: 'all', 
      label: language === 'pt' ? 'Todos' : 'All', 
      icon: CubeIcon,
      count: displayBusinesses.length 
    },
    { 
      id: 'restaurant', 
      label: language === 'pt' ? 'Restaurantes' : 'Restaurants', 
      icon: BuildingStorefrontIcon,
      count: displayBusinesses.filter(b => b.category === 'restaurant').length 
    },
    { 
      id: 'services', 
      label: language === 'pt' ? 'Serviços' : 'Services', 
      icon: UserGroupIcon,
      count: displayBusinesses.filter(b => b.category === 'services').length 
    },
    { 
      id: 'retail', 
      label: language === 'pt' ? 'Comércio' : 'Retail', 
      icon: BuildingStorefrontIcon,
      count: displayBusinesses.filter(b => b.category === 'retail').length 
    },
    { 
      id: 'bookstore', 
      label: language === 'pt' ? 'Livrarias' : 'Bookstores', 
      icon: CubeIcon,
      count: displayBusinesses.filter(b => b.category === 'bookstore').length 
    }
  ];

  const filteredBusinesses = displayBusinesses
    .filter(business => 
      selectedCategory === 'all' || business.category === selectedCategory
    )
    .filter(business =>
      searchQuery === '' || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.priceLevel - b.priceLevel;
        default:
          return a.distance - b.distance;
      }
    });

  const getPriceLevelDisplay = (level: number) => {
    return '£'.repeat(level) + '£'.repeat(Math.max(0, 3 - level)).replace(/£/g, '·');
  };

  const formatDistance = (distance: number) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  return (
    <div className="mobile-business-directory">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 responsive-portuguese-heading">
          {language === 'pt' 
            ? 'Diretório de Negócios Lusófonos' 
            : 'Lusophone Business Directory'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Descubra negócios autênticos de todas as comunidades lusófonas'
            : 'Discover authentic businesses from all Portuguese-speaking communities'}
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'pt' ? 'Procurar negócios, especialidades...' : 'Search businesses, specialties...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 lusophone-touch-target responsive-portuguese-text"
          />
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="px-4 mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-red-300 transition-colors lusophone-touch-target"
          >
            <FunnelIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {language === 'pt' ? 'Filtros' : 'Filters'}
            </span>
          </motion.button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'price')}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm font-semibold"
          >
            <option value="distance">
              {language === 'pt' ? 'Distância' : 'Distance'}
            </option>
            <option value="rating">
              {language === 'pt' ? 'Avaliação' : 'Rating'}
            </option>
            <option value="price">
              {language === 'pt' ? 'Preço' : 'Price'}
            </option>
          </select>
        </div>
        
        <div className="text-sm text-gray-600">
          {filteredBusinesses.length} {language === 'pt' ? 'resultados' : 'results'}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category, index) => {
            const isActive = selectedCategory === category.id;
            const IconComponent = category.icon;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300
                  lusophone-touch-target min-w-[120px] justify-center
                  ${isActive 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-red-300'
                  }
                `}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-semibold text-sm">{category.label}</span>
                {category.count > 0 && (
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-bold
                    ${isActive ? 'bg-white/20' : 'bg-red-100 text-red-600'}
                  `}>
                    {category.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Business List */}
      <div className="px-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBusinessSelect?.(business.id)}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                {/* Business Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{business.heritageFlag}</span>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {business.heritage}
                      </span>
                      {business.verified && (
                        <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 responsive-portuguese-title">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2 responsive-portuguese-text">
                      {language === 'pt' && business.descriptionPt 
                        ? business.descriptionPt 
                        : business.description}
                    </p>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite?.(business.id);
                    }}
                    className="lusophone-touch-target flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {business.isFavorited ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.button>
                </div>

                {/* Business Details */}
                <div className="space-y-3">
                  {/* Rating and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <StarSolidIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-sm text-gray-900">
                          {business.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({business.reviewCount} {language === 'pt' ? 'avaliações' : 'reviews'})
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-gray-600">
                        {getPriceLevelDisplay(business.priceLevel)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {business.openNow !== undefined && (
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          business.openNow 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {business.openNow 
                            ? (language === 'pt' ? 'Aberto' : 'Open')
                            : (language === 'pt' ? 'Fechado' : 'Closed')
                          }
                        </div>
                      )}
                      <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {formatDistance(business.distance)}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="flex-1">{business.address}</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1">
                    {business.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                    {business.specialties.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        +{business.specialties.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {language === 'pt' ? 'Idiomas:' : 'Languages:'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {business.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Options */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    {business.phone && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${business.phone}`;
                        }}
                        className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors text-sm font-semibold lusophone-touch-target"
                      >
                        <PhoneIcon className="w-4 h-4" />
                        <span>{language === 'pt' ? 'Ligar' : 'Call'}</span>
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDirections?.(business.id);
                      }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm font-semibold lusophone-touch-target"
                    >
                      <MapPinSolidIcon className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Direções' : 'Directions'}</span>
                    </motion.button>

                    {business.website && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://${business.website}`, '_blank');
                        }}
                        className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors text-sm font-semibold lusophone-touch-target"
                      >
                        <GlobeAltIcon className="w-4 h-4" />
                        <span>{language === 'pt' ? 'Site' : 'Website'}</span>
                      </motion.button>
                    )}

                    <div className="flex-1" />
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Share functionality
                      }}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-700 transition-colors text-sm font-semibold lusophone-touch-target"
                    >
                      <ShareIcon className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Partilhar' : 'Share'}</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBusinesses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 px-4"
        >
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'pt' ? 'Nenhum negócio encontrado' : 'No businesses found'}
          </h3>
          <p className="text-gray-600 mb-6 responsive-portuguese-text">
            {language === 'pt'
              ? 'Experimente filtros diferentes ou sugira um novo negócio lusófono'
              : 'Try different filters or suggest a new Portuguese business'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg lusophone-touch-target"
          >
            {language === 'pt' ? 'Sugerir Negócio' : 'Suggest Business'}
          </motion.button>
        </motion.div>
      )}

      {/* Cultural Business Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mx-4 mt-8 p-4 bg-gradient-to-r from-blue-50 via-red-50 to-green-50 rounded-xl border border-blue-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <CheckBadgeIcon className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-sm text-blue-800">
            {language === 'pt' ? 'Negócios Verificados' : 'Verified Businesses'}
          </span>
        </div>
        <p className="text-sm text-blue-700 responsive-portuguese-text">
          {language === 'pt'
            ? 'Todos os negócios listados são autênticos e celebram a cultura lusófona. Apoie a nossa comunidade!'
            : 'All listed businesses are authentic and celebrate Portuguese culture. Support our community!'}
        </p>
      </motion.div>
    </div>
  );
}

export default MobilePortugueseBusinessDirectory;