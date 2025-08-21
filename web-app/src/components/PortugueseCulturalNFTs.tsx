'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Palette, Star, Eye, Heart, Share, Download, Wallet, Trophy, Globe, Users, Calendar, Tag } from 'lucide-react';

interface CulturalNFT {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  artist: {
    name: string;
    bio: string;
    bioPt: string;
    avatar: string;
    verified: boolean;
    location: string;
    totalSales: number;
  };
  category: 'traditional-art' | 'photography' | 'digital-art' | 'music' | 'literature' | 'dance' | 'crafts' | 'architecture';
  culturalOrigin: {
    region: string;
    regionPt: string;
    period: string;
    periodPt: string;
    significance: string;
    significancePt: string;
  };
  nft: {
    imageUrl: string;
    animationUrl?: string;
    audioUrl?: string;
    modelUrl?: string;
    blockchain: 'ethereum' | 'polygon' | 'solana';
    tokenId: string;
    contractAddress: string;
    currentPrice: {
      amount: number;
      currency: 'ETH' | 'MATIC' | 'SOL' | 'EUR';
    };
    lastSale?: {
      amount: number;
      currency: string;
      date: string;
    };
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    edition: {
      current: number;
      total: number;
    };
  };
  metadata: {
    dimensions?: string;
    format: string;
    fileSize: string;
    resolution?: string;
    duration?: string;
    attributes: {
      trait_type: string;
      value: string;
      rarity_percentage: number;
    }[];
  };
  culturalAuthenticity: {
    verified: boolean;
    verifiedBy: string;
    certificationDate: string;
    historicalAccuracy: number;
    culturalSignificance: number;
  };
  engagement: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    favorites: number;
  };
  royalties: {
    artistPercentage: number;
    culturalFundPercentage: number;
  };
  availability: {
    status: 'available' | 'sold' | 'auction' | 'reserved';
    auctionEndTime?: string;
    reservePrice?: number;
  };
  tags: string[];
  created: string;
  updated: string;
}

interface NFTCollection {
  id: string;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  theme: string;
  themePt: string;
  curator: string;
  totalItems: number;
  floorPrice: number;
  totalVolume: number;
  coverImage: string;
  featuredNFTs: string[];
}

const PortugueseCulturalNFTs: React.FC = () => {
  const { language } = useLanguage();
  const [selectedNFT, setSelectedNFT] = useState<CulturalNFT | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string>('');

  // Mock NFTs data
  const culturalNFTs: CulturalNFT[] = [
    {
      id: 'azulejo-heritage-001',
      title: 'Azulejo Patterns of São Bento Station',
      titlePt: 'Padrões de Azulejo da Estação de São Bento',
      description: 'High-resolution digital preservation of historic azulejo panels depicting Portuguese history',
      descriptionPt: 'Preservação digital de alta resolução dos painéis históricos de azulejo retratando a história portuguesa',
      artist: {
        name: 'Maria Azevedo',
        bio: 'Digital preservationist specializing in Portuguese ceramic art documentation',
        bioPt: 'Preservacionista digital especializada na documentação da arte cerâmica portuguesa',
        avatar: '/images/artists/maria-azevedo.jpg',
        verified: true,
        location: 'Porto, Portugal',
        totalSales: 15
      },
      category: 'traditional-art',
      culturalOrigin: {
        region: 'Porto, Northern Portugal',
        regionPt: 'Porto, Norte de Portugal',
        period: '1900-1916',
        periodPt: '1900-1916',
        significance: 'Represents the golden age of Portuguese azulejo art in public transportation',
        significancePt: 'Representa a idade de ouro da arte de azulejo portuguesa no transporte público'
      },
      nft: {
        imageUrl: '/nft/azulejo-sao-bento-001.jpg',
        blockchain: 'ethereum',
        tokenId: '1001',
        contractAddress: '0x123...abc',
        currentPrice: {
          amount: 2.5,
          currency: 'ETH'
        },
        lastSale: {
          amount: 1.8,
          currency: 'ETH',
          date: '2024-01-15'
        },
        rarity: 'rare',
        edition: {
          current: 1,
          total: 5
        }
      },
      metadata: {
        dimensions: '4000x6000px',
        format: 'PNG',
        fileSize: '15.2 MB',
        resolution: '300 DPI',
        attributes: [
          { trait_type: 'Era', value: 'Belle Époque', rarity_percentage: 15.2 },
          { trait_type: 'Tile Count', value: '144 tiles', rarity_percentage: 8.7 },
          { trait_type: 'Color Palette', value: 'Blue & White', rarity_percentage: 45.3 },
          { trait_type: 'Artistic Style', value: 'Figurative', rarity_percentage: 12.1 }
        ]
      },
      culturalAuthenticity: {
        verified: true,
        verifiedBy: 'Portuguese Institute of Cultural Heritage',
        certificationDate: '2024-01-10',
        historicalAccuracy: 95,
        culturalSignificance: 88
      },
      engagement: {
        views: 3247,
        likes: 892,
        shares: 156,
        comments: 47,
        favorites: 234
      },
      royalties: {
        artistPercentage: 10,
        culturalFundPercentage: 2.5
      },
      availability: {
        status: 'available'
      },
      tags: ['azulejo', 'historic', 'transportation', 'porto', 'ceramic', 'blue-white'],
      created: '2024-01-10T10:00:00Z',
      updated: '2024-01-15T14:30:00Z'
    },
    {
      id: 'fado-soul-audio-001',
      title: 'Soul of Fado - Original Performance',
      titlePt: 'Alma do Fado - Atuação Original',
      description: 'Exclusive recording of traditional Fado performance in Coimbra, capturing the essence of saudade',
      descriptionPt: 'Gravação exclusiva de atuação tradicional de Fado em Coimbra, capturando a essência da saudade',
      artist: {
        name: 'Carlos Rodrigues',
        bio: 'Traditional Fado singer and cultural preservationist from Coimbra',
        bioPt: 'Fadista tradicional e preservacionista cultural de Coimbra',
        avatar: '/images/artists/carlos-rodrigues.jpg',
        verified: true,
        location: 'Coimbra, Portugal',
        totalSales: 8
      },
      category: 'music',
      culturalOrigin: {
        region: 'Coimbra, Central Portugal',
        regionPt: 'Coimbra, Centro de Portugal',
        period: '19th Century Tradition',
        periodPt: 'Tradição do Século XIX',
        significance: 'UNESCO Intangible Cultural Heritage representing Portuguese emotional expression',
        significancePt: 'Património Cultural Imaterial da UNESCO representando a expressão emocional portuguesa'
      },
      nft: {
        imageUrl: '/nft/fado-soul-visual.jpg',
        audioUrl: '/nft/fado-soul-audio.mp3',
        animationUrl: '/nft/fado-soul-visualization.mp4',
        blockchain: 'polygon',
        tokenId: '2001',
        contractAddress: '0x456...def',
        currentPrice: {
          amount: 450,
          currency: 'EUR'
        },
        rarity: 'legendary',
        edition: {
          current: 1,
          total: 1
        }
      },
      metadata: {
        format: 'MP3 + MP4',
        fileSize: '12.8 MB',
        duration: '4:23',
        attributes: [
          { trait_type: 'Fado Style', value: 'Coimbra', rarity_percentage: 25.5 },
          { trait_type: 'Instrument', value: 'Portuguese Guitar', rarity_percentage: 15.8 },
          { trait_type: 'Recording Quality', value: 'Studio Master', rarity_percentage: 5.2 },
          { trait_type: 'Emotional Intensity', value: 'Deep Saudade', rarity_percentage: 8.7 }
        ]
      },
      culturalAuthenticity: {
        verified: true,
        verifiedBy: 'Portuguese Fado Museum',
        certificationDate: '2024-01-12',
        historicalAccuracy: 98,
        culturalSignificance: 95
      },
      engagement: {
        views: 5689,
        likes: 1247,
        shares: 298,
        comments: 89,
        favorites: 567
      },
      royalties: {
        artistPercentage: 15,
        culturalFundPercentage: 5
      },
      availability: {
        status: 'auction',
        auctionEndTime: '2024-02-01T18:00:00Z',
        reservePrice: 400
      },
      tags: ['fado', 'music', 'coimbra', 'saudade', 'unesco', 'traditional'],
      created: '2024-01-12T16:00:00Z',
      updated: '2024-01-16T12:00:00Z'
    },
    {
      id: 'lisbon-tram-journey-001',
      title: 'Tram 28 Journey Through Lisbon',
      titlePt: 'Viagem do Elétrico 28 Através de Lisboa',
      description: 'Immersive 360° video journey capturing the soul of Lisbon through its iconic tram route',
      descriptionPt: 'Viagem imersiva em vídeo 360° capturando a alma de Lisboa através do seu icônico percurso de elétrico',
      artist: {
        name: 'Ana Santos',
        bio: 'Documentary filmmaker specializing in urban Portuguese culture',
        bioPt: 'Cineasta documentária especializada na cultura urbana portuguesa',
        avatar: '/images/artists/ana-santos.jpg',
        verified: true,
        location: 'Lisbon, Portugal',
        totalSales: 23
      },
      category: 'photography',
      culturalOrigin: {
        region: 'Lisbon, Portugal',
        regionPt: 'Lisboa, Portugal',
        period: 'Contemporary',
        periodPt: 'Contemporâneo',
        significance: 'Documents the living heritage of Lisbon\'s public transportation and urban landscape',
        significancePt: 'Documenta o património vivo do transporte público e paisagem urbana de Lisboa'
      },
      nft: {
        imageUrl: '/nft/tram28-thumbnail.jpg',
        animationUrl: '/nft/tram28-360-journey.mp4',
        blockchain: 'ethereum',
        tokenId: '3001',
        contractAddress: '0x789...ghi',
        currentPrice: {
          amount: 1.2,
          currency: 'ETH'
        },
        rarity: 'uncommon',
        edition: {
          current: 3,
          total: 28
        }
      },
      metadata: {
        dimensions: '8K 360°',
        format: 'MP4',
        fileSize: '245 MB',
        duration: '12:30',
        attributes: [
          { trait_type: 'Route Section', value: 'Graca to Campo de Ourique', rarity_percentage: 35.7 },
          { trait_type: 'Time of Day', value: 'Golden Hour', rarity_percentage: 18.2 },
          { trait_type: 'Season', value: 'Spring', rarity_percentage: 25.0 },
          { trait_type: 'Passenger Stories', value: '5 Interactions', rarity_percentage: 12.5 }
        ]
      },
      culturalAuthenticity: {
        verified: true,
        verifiedBy: 'Lisbon Municipal Archives',
        certificationDate: '2024-01-08',
        historicalAccuracy: 92,
        culturalSignificance: 85
      },
      engagement: {
        views: 8934,
        likes: 1856,
        shares: 423,
        comments: 167,
        favorites: 789
      },
      royalties: {
        artistPercentage: 12,
        culturalFundPercentage: 3
      },
      availability: {
        status: 'available'
      },
      tags: ['lisbon', 'tram', 'urban', 'documentary', '360video', 'heritage'],
      created: '2024-01-08T09:00:00Z',
      updated: '2024-01-14T11:20:00Z'
    }
  ];

  // Mock collections data
  const nftCollections: NFTCollection[] = [
    {
      id: 'portuguese-heritage-collection',
      name: 'Portuguese Heritage Collection',
      namePt: 'Coleção do Património Português',
      description: 'Curated collection of NFTs preserving Portuguese cultural artifacts and traditions',
      descriptionPt: 'Coleção curada de NFTs preservando artefatos culturais e tradições portuguesas',
      theme: 'Cultural Preservation',
      themePt: 'Preservação Cultural',
      curator: 'Portuguese Cultural Institute',
      totalItems: 156,
      floorPrice: 0.8,
      totalVolume: 45.7,
      coverImage: '/collections/portuguese-heritage-cover.jpg',
      featuredNFTs: ['azulejo-heritage-001', 'fado-soul-audio-001']
    },
    {
      id: 'modern-portugal-collection',
      name: 'Modern Portugal Collection',
      namePt: 'Coleção Portugal Moderno',
      description: 'Contemporary interpretations of Portuguese culture and urban life',
      descriptionPt: 'Interpretações contemporâneas da cultura portuguesa e vida urbana',
      theme: 'Contemporary Culture',
      themePt: 'Cultura Contemporânea',
      curator: 'Digital Arts Portugal',
      totalItems: 89,
      floorPrice: 0.5,
      totalVolume: 23.4,
      coverImage: '/collections/modern-portugal-cover.jpg',
      featuredNFTs: ['lisbon-tram-journey-001']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', namePt: 'Todas as Categorias', icon: '🎨' },
    { id: 'traditional-art', name: 'Traditional Art', namePt: 'Arte Tradicional', icon: '🖼️' },
    { id: 'photography', name: 'Photography', namePt: 'Fotografia', icon: '📷' },
    { id: 'digital-art', name: 'Digital Art', namePt: 'Arte Digital', icon: '💻' },
    { id: 'music', name: 'Music', namePt: 'Música', icon: '🎵' },
    { id: 'literature', name: 'Literature', namePt: 'Literatura', icon: '📚' },
    { id: 'dance', name: 'Dance', namePt: 'Dança', icon: '💃' },
    { id: 'crafts', name: 'Crafts', namePt: 'Artesanato', icon: '🧩' },
    { id: 'architecture', name: 'Architecture', namePt: 'Arquitetura', icon: '🏢' }
  ];

  const rarities = [
    { id: 'all', name: 'All Rarities', namePt: 'Todas as Raridades' },
    { id: 'common', name: 'Common', namePt: 'Comum', color: 'text-secondary-600' },
    { id: 'uncommon', name: 'Uncommon', namePt: 'Incomum', color: 'text-action-600' },
    { id: 'rare', name: 'Rare', namePt: 'Raro', color: 'text-primary-600' },
    { id: 'epic', name: 'Epic', namePt: 'Épico', color: 'text-accent-600' },
    { id: 'legendary', name: 'Legendary', namePt: 'Lendário', color: 'text-yellow-600' }
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('nft-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Simulate wallet connection check
    const savedWallet = localStorage.getItem('wallet-address');
    if (savedWallet) {
      setIsWalletConnected(true);
      setUserAddress(savedWallet);
    }
  }, []);

  const connectWallet = async () => {
    // Simulate wallet connection
    const mockAddress = '0x1234...5678';
    setIsWalletConnected(true);
    setUserAddress(mockAddress);
    localStorage.setItem('wallet-address', mockAddress);
  };

  const toggleFavorite = (nftId: string) => {
    const newFavorites = favorites.includes(nftId)
      ? favorites.filter(id => id !== nftId)
      : [...favorites, nftId];
    
    setFavorites(newFavorites);
    localStorage.setItem('nft-favorites', JSON.stringify(newFavorites));
  };

  const filteredNFTs = culturalNFTs.filter(nft => {
    const matchesSearch = 
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.titlePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    const matchesRarity = rarityFilter === 'all' || nft.nft.rarity === rarityFilter;
    
    return matchesSearch && matchesCategory && matchesRarity;
  });

  const getRarityColor = (rarity: string) => {
    return rarities.find(r => r.id === rarity)?.color || 'text-secondary-600';
  };

  const formatPrice = (amount: number, currency: string) => {
    if (currency === 'EUR') {
      return `€${amount.toLocaleString()}`;
    }
    return `${amount} ${currency}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
          {language === 'pt' ? 'Disponível' : 'Available'}
        </span>;
      case 'auction':
        return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
          {language === 'pt' ? 'Leilão' : 'Auction'}
        </span>;
      case 'sold':
        return <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-semibold">
          {language === 'pt' ? 'Vendido' : 'Sold'}
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 via-pink-50 to-primary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4"
          >
            🎨 {language === 'pt' ? 'NFTs Culturais Portugueses' : 'Portuguese Cultural NFTs'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary-600 max-w-3xl mx-auto mb-6"
          >
            {language === 'pt'
              ? 'Descubra, colecione e preserve a herança cultural portuguesa através de tokens não-fungíveis autênticos e verificados.'
              : 'Discover, collect, and preserve Portuguese cultural heritage through authentic, verified non-fungible tokens.'}
          </motion.p>

          {/* Wallet Connection */}
          <div className="flex justify-center mb-8">
            {!isWalletConnected ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="bg-gradient-to-r from-accent-600 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Wallet className="h-5 w-5" />
                <span>{language === 'pt' ? 'Conectar Carteira' : 'Connect Wallet'}</span>
              </motion.button>
            ) : (
              <div className="bg-white border border-secondary-200 rounded-lg px-6 py-3 flex items-center space-x-3 shadow-sm">
                <div className="w-3 h-3 bg-action-500 rounded-full"></div>
                <span className="text-sm font-medium text-secondary-700">
                  {language === 'pt' ? 'Conectado:' : 'Connected:'} {userAddress}
                </span>
              </div>
            )}
          </div>
        </div>

        {!selectedNFT ? (
          <>
            {/* Collections Showcase */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-secondary-800 mb-6">
                {language === 'pt' ? 'Coleções em Destaque' : 'Featured Collections'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nftCollections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={collection.coverImage}
                        alt={language === 'pt' ? collection.namePt : collection.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder-collection.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-2">
                          {language === 'pt' ? collection.namePt : collection.name}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {language === 'pt' ? collection.descriptionPt : collection.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-accent-600">{collection.totalItems}</div>
                          <div className="text-sm text-gray-500">{language === 'pt' ? 'Itens' : 'Items'}</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent-600">{collection.floorPrice} ETH</div>
                          <div className="text-sm text-gray-500">{language === 'pt' ? 'Preço Mínimo' : 'Floor Price'}</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent-600">{collection.totalVolume}</div>
                          <div className="text-sm text-gray-500">{language === 'pt' ? 'Volume Total' : 'Total Volume'}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      {language === 'pt' ? 'Pesquisar' : 'Search'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'pt' ? 'Pesquisar NFTs...' : 'Search NFTs...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      {language === 'pt' ? 'Categoria' : 'Category'}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {language === 'pt' ? category.namePt : category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      {language === 'pt' ? 'Raridade' : 'Rarity'}
                    </label>
                    <select
                      value={rarityFilter}
                      onChange={(e) => setRarityFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      {rarities.map(rarity => (
                        <option key={rarity.id} value={rarity.id}>
                          {language === 'pt' ? rarity.namePt : rarity.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      {language === 'pt' ? 'Ordenar Por' : 'Sort By'}
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="newest">{language === 'pt' ? 'Mais Recente' : 'Newest'}</option>
                      <option value="oldest">{language === 'pt' ? 'Mais Antigo' : 'Oldest'}</option>
                      <option value="price-high">{language === 'pt' ? 'Preço: Maior' : 'Price: High to Low'}</option>
                      <option value="price-low">{language === 'pt' ? 'Preço: Menor' : 'Price: Low to High'}</option>
                      <option value="popular">{language === 'pt' ? 'Mais Popular' : 'Most Popular'}</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-secondary-600">
                    {filteredNFTs.length} {language === 'pt' ? 'NFTs encontrados' : 'NFTs found'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-accent-100 text-accent-600' : 'text-gray-400 hover:text-secondary-600'
                      }`}
                    >
                      🗳️
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-accent-100 text-accent-600' : 'text-gray-400 hover:text-secondary-600'
                      }`}
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* NFTs Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {filteredNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedNFT(nft)}
                >
                  <div className="relative">
                    <img
                      src={nft.nft.imageUrl}
                      alt={language === 'pt' ? nft.titlePt : nft.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-nft.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(nft.availability.status)}
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(nft.id);
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(nft.id)
                            ? 'bg-coral-500 text-white'
                            : 'bg-white bg-opacity-80 text-secondary-600 hover:text-coral-500'
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-90 ${
                        getRarityColor(nft.nft.rarity)
                      }`}>
                        {nft.nft.rarity.toUpperCase()}
                      </span>
                    </div>
                    
                    {nft.culturalAuthenticity.verified && (
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-action-500 text-white p-2 rounded-full" title="Culturally Verified">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-secondary-800 mb-2">
                          {language === 'pt' ? nft.titlePt : nft.title}
                        </h3>
                        <p className="text-secondary-600 text-sm line-clamp-2">
                          {language === 'pt' ? nft.descriptionPt : nft.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent-600">
                            {formatPrice(nft.nft.currentPrice.amount, nft.nft.currentPrice.currency)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {nft.nft.edition.current}/{nft.nft.edition.total}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={nft.artist.avatar}
                          alt={nft.artist.name}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = '/images/default-avatar.jpg';
                          }}
                        />
                        <div>
                          <p className="font-semibold text-sm">{nft.artist.name}</p>
                          {nft.artist.verified && (
                            <span className="text-xs text-primary-500 flex items-center">
                              ✓ {language === 'pt' ? 'Verificado' : 'Verified'}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {language === 'pt' ? nft.culturalOrigin.regionPt : nft.culturalOrigin.region}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {nft.engagement.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {nft.engagement.likes.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4" />
                        <span>{nft.culturalAuthenticity.culturalSignificance}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* NFT Detail View */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* NFT Header */}
            <div className="bg-gradient-to-r from-accent-600 to-primary-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {language === 'pt' ? selectedNFT.titlePt : selectedNFT.title}
                  </h2>
                  <p className="text-accent-100">
                    {language === 'pt' ? selectedNFT.culturalOrigin.regionPt : selectedNFT.culturalOrigin.region} • {selectedNFT.culturalOrigin.period}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedNFT(null)}
                    className="text-accent-100 hover:text-white transition-colors"
                  >
                    ← {language === 'pt' ? 'Voltar' : 'Back'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* NFT Media */}
              <div>
                <div className="relative bg-secondary-100 rounded-xl overflow-hidden aspect-square">
                  {selectedNFT.nft.animationUrl ? (
                    <video
                      src={selectedNFT.nft.animationUrl}
                      poster={selectedNFT.nft.imageUrl}
                      controls
                      className="w-full h-full object-cover"
                    >
                      <source src={selectedNFT.nft.animationUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={selectedNFT.nft.imageUrl}
                      alt={language === 'pt' ? selectedNFT.titlePt : selectedNFT.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-nft-large.jpg';
                      }}
                    />
                  )}
                  
                  {selectedNFT.culturalAuthenticity.verified && (
                    <div className="absolute top-4 left-4 bg-action-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2">
                      <span>✓</span>
                      <span className="text-sm font-semibold">
                        {language === 'pt' ? 'Culturalmente Verificado' : 'Culturally Verified'}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-2 rounded-lg text-sm font-semibold bg-white bg-opacity-90 ${
                      getRarityColor(selectedNFT.nft.rarity)
                    }`}>
                      {selectedNFT.nft.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                {/* Audio Player */}
                {selectedNFT.nft.audioUrl && (
                  <div className="mt-4 bg-secondary-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-lg">🎵</div>
                      <div className="font-semibold">
                        {language === 'pt' ? 'Áudio Original' : 'Original Audio'}
                      </div>
                    </div>
                    <audio controls className="w-full">
                      <source src={selectedNFT.nft.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                )}
              </div>

              {/* NFT Information */}
              <div className="space-y-6">
                {/* Price and Purchase */}
                <div className="bg-secondary-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        {language === 'pt' ? 'Preço Atual' : 'Current Price'}
                      </div>
                      <div className="text-3xl font-bold text-accent-600">
                        {formatPrice(selectedNFT.nft.currentPrice.amount, selectedNFT.nft.currentPrice.currency)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        {language === 'pt' ? 'Edição' : 'Edition'}
                      </div>
                      <div className="text-lg font-semibold">
                        {selectedNFT.nft.edition.current} / {selectedNFT.nft.edition.total}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {isWalletConnected ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-accent-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-accent-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Wallet className="h-5 w-5" />
                          <span>{language === 'pt' ? 'Comprar Agora' : 'Buy Now'}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="border border-accent-600 text-accent-600 py-3 px-4 rounded-lg font-semibold hover:bg-accent-50 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Tag className="h-5 w-5" />
                          <span>{language === 'pt' ? 'Fazer Oferta' : 'Make Offer'}</span>
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={connectWallet}
                        className="col-span-2 bg-secondary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Wallet className="h-5 w-5" />
                        <span>{language === 'pt' ? 'Conectar Carteira para Comprar' : 'Connect Wallet to Purchase'}</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Artist Information */}
                <div>
                  <h3 className="text-lg font-bold text-secondary-800 mb-4">
                    {language === 'pt' ? 'Artista' : 'Artist'}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedNFT.artist.avatar}
                      alt={selectedNFT.artist.name}
                      className="w-16 h-16 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-avatar.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-lg">{selectedNFT.artist.name}</h4>
                        {selectedNFT.artist.verified && (
                          <span className="text-primary-500" title="Verified Artist">✓</span>
                        )}
                      </div>
                      <p className="text-secondary-600 text-sm mb-2">
                        {language === 'pt' ? selectedNFT.artist.bioPt : selectedNFT.artist.bio}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📍 {selectedNFT.artist.location}</span>
                        <span>🎨 {selectedNFT.artist.totalSales} {language === 'pt' ? 'vendas' : 'sales'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cultural Significance */}
                <div>
                  <h3 className="text-lg font-bold text-secondary-800 mb-4">
                    {language === 'pt' ? 'Importância Cultural' : 'Cultural Significance'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-secondary-600 mb-1">
                        {language === 'pt' ? 'Significância:' : 'Significance:'}
                      </div>
                      <p className="text-secondary-800">
                        {language === 'pt' ? selectedNFT.culturalOrigin.significancePt : selectedNFT.culturalOrigin.significance}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold text-secondary-600 mb-1">
                          {language === 'pt' ? 'Precisão Histórica' : 'Historical Accuracy'}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-secondary-200 rounded-full h-2">
                            <div
                              className="bg-action-500 h-2 rounded-full"
                              style={{ width: `${selectedNFT.culturalAuthenticity.historicalAccuracy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{selectedNFT.culturalAuthenticity.historicalAccuracy}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-secondary-600 mb-1">
                          {language === 'pt' ? 'Valor Cultural' : 'Cultural Value'}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-secondary-200 rounded-full h-2">
                            <div
                              className="bg-accent-500 h-2 rounded-full"
                              style={{ width: `${selectedNFT.culturalAuthenticity.culturalSignificance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{selectedNFT.culturalAuthenticity.culturalSignificance}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-action-500">✓</span>
                        <span className="font-semibold text-green-800">
                          {language === 'pt' ? 'Verificado por:' : 'Verified by:'} {selectedNFT.culturalAuthenticity.verifiedBy}
                        </span>
                      </div>
                      <div className="text-sm text-green-700">
                        {language === 'pt' ? 'Data de certificação:' : 'Certification date:'} {new Date(selectedNFT.culturalAuthenticity.certificationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* NFT Attributes */}
                <div>
                  <h3 className="text-lg font-bold text-secondary-800 mb-4">
                    {language === 'pt' ? 'Atributos' : 'Attributes'}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedNFT.metadata.attributes.map((attribute, index) => (
                      <div key={index} className="bg-secondary-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-secondary-800">{attribute.trait_type}</div>
                            <div className="text-secondary-600">{attribute.value}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {language === 'pt' ? 'Raridade' : 'Rarity'}
                            </div>
                            <div className="font-semibold text-accent-600">{attribute.rarity_percentage}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement Stats */}
                <div>
                  <h3 className="text-lg font-bold text-secondary-800 mb-4">
                    {language === 'pt' ? 'Envolvimento' : 'Engagement'}
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-secondary-800">{selectedNFT.engagement.views.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{language === 'pt' ? 'Visualizações' : 'Views'}</div>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-coral-500">{selectedNFT.engagement.likes.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{language === 'pt' ? 'Curtidas' : 'Likes'}</div>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary-500">{selectedNFT.engagement.shares.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{language === 'pt' ? 'Compartilhamentos' : 'Shares'}</div>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-accent-500">{selectedNFT.engagement.favorites.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{language === 'pt' ? 'Favoritos' : 'Favorites'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortugueseCulturalNFTs;