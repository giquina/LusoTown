"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBagIcon,
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  GiftIcon,
  TagIcon,
  CurrencyPoundIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";

interface MarketplaceProduct {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  category: string;
  seller: string;
  sellerLocation: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: number;
  featured: boolean;
  culturalAuthenticity: number;
  shippingTime: string;
  shippingTimeEn: string;
  tags: string[];
  tagsEn: string[];
  commissionRate: number;
}

interface MarketplaceCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  productCount: number;
  featured: boolean;
  avgCommission: number;
}

const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: 'food_wine',
    name: 'Comida e Vinhos',
    nameEn: 'Food & Wine',
    icon: <GiftIcon className="w-6 h-6" />,
    productCount: 387,
    featured: true,
    avgCommission: 12.5
  },
  {
    id: 'handicrafts',
    name: 'Artesanato',
    nameEn: 'Handicrafts',
    icon: <SparklesIcon className="w-6 h-6" />,
    productCount: 156,
    featured: true,
    avgCommission: 18.0
  },
  {
    id: 'fashion',
    name: 'Moda Portuguesa',
    nameEn: 'Portuguese Fashion',
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    productCount: 92,
    featured: false,
    avgCommission: 15.0
  },
  {
    id: 'books_media',
    name: 'Livros e M�dia',
    nameEn: 'Books & Media',
    icon: <CheckCircleIcon className="w-6 h-6" />,
    productCount: 234,
    featured: true,
    avgCommission: 20.0
  },
  {
    id: 'home_decor',
    name: 'Decora��o do Lar',
    nameEn: 'Home Decor',
    icon: <HeartIcon className="w-6 h-6" />,
    productCount: 128,
    featured: false,
    avgCommission: 16.5
  },
  {
    id: 'services',
    name: 'Servi�os Culturais',
    nameEn: 'Cultural Services',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    productCount: 67,
    featured: true,
    avgCommission: 25.0
  }
];

const featuredProducts: MarketplaceProduct[] = [
  {
    id: 'vinho-verde-collection',
    name: 'Cole��o de Vinho Verde Premium',
    nameEn: 'Premium Vinho Verde Collection',
    description: 'Sele��o aut�ntica de vinhos verdes diretamente do Minho, incluindo variedades tradicionais e modernas',
    descriptionEn: 'Authentic selection of vinho verde wines directly from Minho, including traditional and modern varieties',
    price: 89.99,
    originalPrice: 120.00,
    category: 'food_wine',
    seller: 'Quinta do Vale Verde',
    sellerLocation: 'Viana do Castelo, Portugal',
    rating: 4.9,
    reviews: 167,
    image: '/images/products/vinho-verde-collection.jpg',
    inStock: 45,
    featured: true,
    culturalAuthenticity: 98,
    shippingTime: '3-5 dias �teis',
    shippingTimeEn: '3-5 business days',
    tags: ['Vinho Verde', 'Premium', 'Direto do Produtor', 'Sustent�vel'],
    tagsEn: ['Vinho Verde', 'Premium', 'Direct from Producer', 'Sustainable'],
    commissionRate: 12.0
  },
  {
    id: 'azulejo-handcrafted',
    name: 'Azulejos Artesanais Tradicionais',
    nameEn: 'Traditional Handcrafted Azulejos',
    description: 'Azulejos portugueses pintados � m�o por artes�os em Caldas da Rainha, perfeitos para decora��o aut�ntica',
    descriptionEn: 'Hand-painted Portuguese azulejos by artisans in Caldas da Rainha, perfect for authentic decoration',
    price: 145.00,
    category: 'handicrafts',
    seller: 'Cer�micas Tradicionais Lda',
    sellerLocation: 'Caldas da Rainha, Portugal',
    rating: 4.8,
    reviews: 89,
    image: '/images/products/azulejos-traditional.jpg',
    inStock: 23,
    featured: true,
    culturalAuthenticity: 96,
    shippingTime: '7-10 dias �teis',
    shippingTimeEn: '7-10 business days',
    tags: ['Azulejos', 'Artesanal', 'Pintado � M�o', 'Decora��o'],
    tagsEn: ['Azulejos', 'Handcrafted', 'Hand-painted', 'Decoration'],
    commissionRate: 18.5
  },
  {
    id: 'fado-guitar-lessons',
    name: 'Aulas de Guitarra Portuguesa Online',
    nameEn: 'Portuguese Guitar Lessons Online',
    description: 'Aulas personalizadas de guitarra portuguesa com mestre fadista, incluindo t�cnicas tradicionais e repert�rio cl�ssico',
    descriptionEn: 'Personalized Portuguese guitar lessons with fado master, including traditional techniques and classic repertoire',
    price: 75.00,
    category: 'services',
    seller: 'Mestre Jo�o Fado',
    sellerLocation: 'Lisboa, Portugal / London, United Kingdom',
    rating: 5.0,
    reviews: 34,
    image: '/images/products/fado-guitar-lessons.jpg',
    inStock: 999,
    featured: true,
    culturalAuthenticity: 100,
    shippingTime: 'Imediato',
    shippingTimeEn: 'Immediate',
    tags: ['Fado', 'Guitarra Portuguesa', 'Aulas Online', 'Mestre'],
    tagsEn: ['Fado', 'Portuguese Guitar', 'Online Lessons', 'Master'],
    commissionRate: 25.0
  }
];

export default function CulturalMarketplace() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showRevenue, setShowRevenue] = useState(false);

  const isPortuguese = language === 'pt';

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Revenue calculations
  const totalProducts = marketplaceCategories.reduce((sum, cat) => sum + cat.productCount, 0);
  const avgOrderValue = 85;
  const monthlyOrders = 1250;
  const monthlyRevenue = monthlyOrders * avgOrderValue;
  const platformCommission = monthlyRevenue * 0.08; // 8% average commission
  const annualProjection = monthlyRevenue * 12 * 1.2; // 20% growth

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-accent-50">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-accent-600 text-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium mb-8">
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              {isPortuguese ? 'Marketplace Cultural Portugu�s' : 'Portuguese Cultural Marketplace'}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {isPortuguese 
                ? 'Descubra Produtos Aut�nticos Portugueses'
                : 'Discover Authentic Portuguese Products'
              }
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Conecte-se diretamente com produtores e artes�os portugueses. Produtos verificados, autenticidade cultural garantida e entrega em Londres.'
                : 'Connect directly with Portuguese producers and artisans. Verified products, guaranteed cultural authenticity, and London delivery.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-secondary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all">
                {isPortuguese ? 'Explorar Marketplace' : 'Explore Marketplace'}
              </button>
              
              <button 
                onClick={() => setShowRevenue(!showRevenue)}
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                {isPortuguese ? 'Analytics de Receitas' : 'Revenue Analytics'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Analytics Dashboard */}
      {showRevenue && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="py-12 bg-gray-900 text-white"
        >
          <div className="container-width">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isPortuguese ? 'Dashboard de Receitas - Marketplace Cultural' : 'Revenue Dashboard - Cultural Marketplace'}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CurrencyPoundIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Receita Mensal' : 'Monthly Revenue'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">�{monthlyRevenue.toLocaleString()}</p>
                <p className="text-green-100 text-sm">
                  {isPortuguese ? '+22% m�s anterior' : '+22% from previous month'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBagIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Pedidos Mensais' : 'Monthly Orders'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">{monthlyOrders.toLocaleString()}</p>
                <p className="text-blue-100 text-sm">�{avgOrderValue} {isPortuguese ? 'valor m�dio' : 'average value'}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TagIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Comiss�es' : 'Commissions'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">�{platformCommission.toLocaleString()}</p>
                <p className="text-purple-100 text-sm">8% {isPortuguese ? 'comiss�o m�dia' : 'average commission'}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <SparklesIcon className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">
                    {isPortuguese ? 'Produtos Ativos' : 'Active Products'}
                  </h3>
                </div>
                <p className="text-3xl font-bold">{totalProducts}</p>
                <p className="text-orange-100 text-sm">{isPortuguese ? '+45 este m�s' : '+45 this month'}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary-600 to-accent-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                {isPortuguese ? 'Proje��o Anual (2025)' : 'Annual Projection (2025)'}
              </h3>
              <p className="text-4xl font-bold mb-2">
                �{annualProjection.toLocaleString()}
              </p>
              <p className="text-white/80">
                {isPortuguese 
                  ? 'Incluindo crescimento de 20% no marketplace cultural portugu�s'
                  : 'Including 20% growth in Portuguese cultural marketplace'
                }
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Categorias Culturais' : 'Cultural Categories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Explore produtos e servi�os aut�nticos organizados por categoria cultural portuguesa'
                : 'Explore authentic products and services organized by Portuguese cultural category'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {marketplaceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  category.featured 
                    ? 'border-secondary-200 ring-4 ring-secondary-50' 
                    : 'border-gray-100 hover:border-secondary-200'
                }`}
              >
                {category.featured && (
                  <div className="inline-flex items-center bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <StarIcon className="w-3 h-3 mr-1" />
                    {isPortuguese ? 'Popular' : 'Popular'}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center text-secondary-600 group-hover:bg-secondary-200 transition-colors">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary-600 transition-colors">
                      {isPortuguese ? category.name : category.nameEn}
                    </h3>
                    <p className="text-gray-600">
                      {category.productCount} {isPortuguese ? 'produtos' : 'products'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {isPortuguese ? 'Comiss�o M�dia:' : 'Avg Commission:'}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {category.avgCommission}%
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-secondary-50 text-secondary-600 py-3 rounded-xl font-semibold group-hover:bg-secondary-100 transition-colors">
                  {isPortuguese ? 'Ver Produtos' : 'View Products'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Produtos em Destaque' : 'Featured Products'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Produtos premium selecionados com autenticidade cultural verificada por especialistas portugueses'
                : 'Premium products selected with cultural authenticity verified by Portuguese experts'
              }
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-10 bg-gray-200 rounded-t-2xl">
                    <div className="flex items-center justify-center h-48 bg-gradient-to-br from-secondary-100 to-accent-100">
                      <ShoppingBagIcon className="w-16 h-16 text-secondary-400" />
                    </div>
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    {favorites.includes(product.id) ? (
                      <HeartIconSolid className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {isPortuguese ? 'Destaque' : 'Featured'}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {isPortuguese ? product.name : product.nameEn}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {isPortuguese ? product.description : product.descriptionEn}
                      </p>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <StarIconSolid className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-sm">{product.rating}</span>
                          <span className="text-gray-500 text-sm">({product.reviews})</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4 text-secondary-500" />
                          <span className="text-xs text-secondary-600 font-medium">
                            {product.culturalAuthenticity}% {isPortuguese ? 'Aut�ntico' : 'Authentic'}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{product.sellerLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TruckIcon className="w-4 h-4" />
                          <span>{isPortuguese ? product.shippingTime : product.shippingTimeEn}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(isPortuguese ? product.tags : product.tagsEn).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          �{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            �{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isPortuguese ? 'Comiss�o' : 'Commission'}: {product.commissionRate}%
                      </div>
                    </div>
                    
                    <button className="bg-secondary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-600 transition-colors">
                      {isPortuguese ? 'Comprar' : 'Buy Now'}
                    </button>
                  </div>

                  {/* Stock Status */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {isPortuguese ? 'Em stock:' : 'In stock:'}
                      </span>
                      <span className={`font-medium ${product.inStock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                        {product.inStock > 999 ? '' : product.inStock} {isPortuguese ? 'unidades' : 'units'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Integration CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-accent-600 text-white">
        <div className="container-width text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {isPortuguese 
                ? 'Venda os Seus Produtos no Marketplace'
                : 'Sell Your Products on the Marketplace'
              }
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Conecte-se diretamente com a comunidade de falantes de português em Londres. Zero custos iniciais, comiss�es competitivas e suporte especializado.'
                : 'Connect directly with the Portuguese-speaking community in London. Zero startup costs, competitive commissions, and specialized support.'
              }
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 rounded-xl p-6">
                <ShieldCheckIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  {isPortuguese ? 'Verifica��o Cultural' : 'Cultural Verification'}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? 'Certificamos a autenticidade dos seus produtos portugueses'
                    : 'We certify the authenticity of your Portuguese products'
                  }
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <CurrencyPoundIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  {isPortuguese ? 'Comiss�es Justas' : 'Fair Commissions'}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? 'Taxas competitivas de 8-25% dependendo da categoria'
                    : 'Competitive rates of 8-25% depending on category'
                  }
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <TruckIcon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  {isPortuguese ? 'Log�stica Integrada' : 'Integrated Logistics'}
                </h3>
                <p className="text-white/80">
                  {isPortuguese
                    ? 'Entrega r�pida em Londres e Reino Unido'
                    : 'Fast delivery in London and across the United Kingdom'
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-secondary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all">
                {isPortuguese ? 'Registar como Vendedor' : 'Register as Seller'}
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                {isPortuguese ? 'Guia do Vendedor' : 'Seller Guide'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}