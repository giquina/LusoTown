"use client";

import React, { useState, useEffect } from 'react';
import { HeartIcon, EyeIcon, MapPinIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

interface CulturalItem {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  image: string;
  category: 'tradition' | 'food' | 'music' | 'architecture' | 'festival';
  location: string;
  likes: number;
  views: number;
  isLiked: boolean;
  photographer: string;
  cultural: boolean;
}

const CulturalGallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [items, setItems] = useState<CulturalItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock Lusophone cultural gallery items
  useEffect(() => {
    const mockItems: CulturalItem[] = [
      {
        id: '1',
        title: 'Azulejo Tiles at Benfica',
        titlePt: 'Azulejos do Benfica',
        description: 'Traditional Lusophone ceramic tiles celebrating football culture',
        descriptionPt: 'Azulejos tradicionais portugueses celebrando a cultura do futebol',
        image: '/images/cultural/azulejos-benfica.jpg',
        category: 'architecture',
        location: 'Lusophone Club, London',
        likes: 124,
        views: 2430,
        isLiked: false,
        photographer: 'Maria Santos',
        cultural: true
      },
      {
        id: '2',
        title: 'Fado Performance',
        titlePt: 'Espetáculo de Fado',
        description: 'Soulful Fado music performance in traditional Lusophone style',
        descriptionPt: 'Espetáculo de Fado tradicional português com toda a alma',
        image: '/images/cultural/fado-performance.jpg',
        category: 'music',
        location: 'Camden, London',
        likes: 89,
        views: 1560,
        isLiked: true,
        photographer: 'António Pereira',
        cultural: true
      },
      {
        id: '3',
        title: 'Pastéis de Nata Workshop',
        titlePt: 'Workshop de Pastéis de Nata',
        description: 'Traditional Lusophone custard tarts making workshop',
        descriptionPt: 'Workshop tradicional de confeção de pastéis de nata',
        image: '/images/cultural/pasteis-nata.jpg',
        category: 'food',
        location: 'Borough Market, London',
        likes: 201,
        views: 3240,
        isLiked: false,
        photographer: 'Catarina Silva',
        cultural: true
      },
      {
        id: '4',
        title: 'Santos Populares Festival',
        titlePt: 'Festival dos Santos Populares',
        description: 'Traditional Lusophone street festival celebration',
        descriptionPt: 'Celebração tradicional do festival de rua português',
        image: '/images/cultural/santos-populares.jpg',
        category: 'festival',
        location: 'Stockwell, London',
        likes: 156,
        views: 2890,
        isLiked: true,
        photographer: 'João Rodrigues',
        cultural: true
      }
    ];
    
    setTimeout(() => {
      setItems(mockItems);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { key: 'all', label: t('gallery.all', 'All'), labelPt: 'Tudo' },
    { key: 'tradition', label: t('gallery.tradition', 'Tradition'), labelPt: 'Tradição' },
    { key: 'food', label: t('gallery.food', 'Food'), labelPt: 'Comida' },
    { key: 'music', label: t('gallery.music', 'Music'), labelPt: 'Música' },
    { key: 'architecture', label: t('gallery.architecture', 'Architecture'), labelPt: 'Arquitetura' },
    { key: 'festival', label: t('gallery.festival', 'Festival'), labelPt: 'Festival' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const toggleLike = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tradition': return 'from-green-500 to-red-500';
      case 'food': return 'from-yellow-500 to-orange-500';
      case 'music': return 'from-purple-500 to-pink-500';
      case 'architecture': return 'from-blue-500 to-indigo-500';
      case 'festival': return 'from-red-500 to-green-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">{t('gallery.loading', 'Loading Portuguese culture...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-white to-red-100 border border-green-200 rounded-full px-6 py-3 mb-4">
          <span className="text-2xl">🇵🇹</span>
          <span className="font-bold text-gray-800">
            {t('gallery.title', 'Lusophone Cultural Gallery')}
          </span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          {t('gallery.subtitle', 'Discover Lusophone Culture in London')}
        </h2>
        
        <p className="text-gray-600">
          {t('gallery.description', 'A visual celebration of Portuguese heritage, traditions, and community life')}
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
              selectedCategory === category.key
                ? 'bg-gradient-to-r from-green-600 to-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {language === 'pt' ? category.labelPt : category.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-green-100 to-red-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-200 to-red-200">
                <span className="text-6xl opacity-50">🇵🇹</span>
              </div>
              
              {/* Category Badge */}
              <div className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(item.category)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                {item.category.toUpperCase()}
              </div>
              
              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform duration-200"
                >
                  {item.isLiked ? (
                    <HeartSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform duration-200">
                  <ShareIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? item.titlePt : item.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {language === 'pt' ? item.descriptionPt : item.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <HeartIcon className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                </div>
                
                <span className="text-xs text-gray-400">
                  by {item.photographer}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-green-600 to-red-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          {t('gallery.upload', 'Share Your Lusophone Culture')}
        </button>
      </div>
    </div>
  );
};

export default CulturalGallery;