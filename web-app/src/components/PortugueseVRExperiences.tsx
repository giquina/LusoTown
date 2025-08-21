'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Camera, Map, Calendar, Users, Play, Pause, VolumeX, Volume2, RotateCcw, Share, Heart, Eye } from 'lucide-react';

interface VRExperience {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  location: string;
  locationPt: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'landmarks' | 'festivals' | 'nature' | 'history' | 'culture';
  thumbnailUrl: string;
  vrUrl: string;
  audioGuide: {
    en: string;
    pt: string;
  };
  highlights: string[];
  highlightsPt: string[];
  culturalContext: string;
  culturalContextPt: string;
  virtualGuide: {
    name: string;
    avatar: string;
    bio: string;
    bioPt: string;
  };
  interactions: {
    id: string;
    type: 'info' | 'quiz' | 'photo' | 'story';
    position: { x: number; y: number; z: number };
    content: string;
    contentPt: string;
  }[];
  relatedExperiences: string[];
  userRating: number;
  totalViews: number;
}

interface VRPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  quality: '360p' | '720p' | '1080p' | '4K';
  viewMode: 'vr' | 'ar' | '360' | 'flat';
}

const PortugueseVRExperiences: React.FC = () => {
  const { language } = useLanguage();
  const [selectedExperience, setSelectedExperience] = useState<VRExperience | null>(null);
  const [playerState, setPlayerState] = useState<VRPlayerState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    quality: '1080p',
    viewMode: 'vr'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [showInteractions, setShowInteractions] = useState(true);
  const vrPlayerRef = useRef<HTMLDivElement>(null);

  // Mock VR experiences data
  const vrExperiences: VRExperience[] = [
    {
      id: 'porto-historical-center',
      title: 'Porto Historical Center',
      titlePt: 'Centro Histórico do Porto',
      description: 'Walk through the cobblestone streets of Porto\'s UNESCO World Heritage site',
      descriptionPt: 'Caminha pelas ruas calcetadas do centro histórico do Porto, Património Mundial da UNESCO',
      location: 'Porto, Portugal',
      locationPt: 'Porto, Portugal',
      duration: 45,
      difficulty: 'beginner',
      category: 'landmarks',
      thumbnailUrl: '/images/vr/porto-historical.jpg',
      vrUrl: '/vr/porto-historical-center.mp4',
      audioGuide: {
        en: '/audio/porto-historical-en.mp3',
        pt: '/audio/porto-historical-pt.mp3'
      },
      highlights: [
        'Livraria Lello bookstore',
        'Clérigos Tower views',
        'São Bento Station azulejos',
        'Dom Luís I Bridge walk'
      ],
      highlightsPt: [
        'Livraria Lello',
        'Vistas da Torre dos Clérigos',
        'Azulejos da Estação de São Bento',
        'Caminhada na Ponte Dom Luís I'
      ],
      culturalContext: 'Experience the architectural blend of Roman, Gothic, and Baroque influences that tell the story of Porto\'s maritime heritage.',
      culturalContextPt: 'Experimente a mistura arquitetônica das influências romanas, góticas e barrocas que contam a história do património marítimo do Porto.',
      virtualGuide: {
        name: 'António Silva',
        avatar: '/images/guides/antonio-silva.jpg',
        bio: 'Local historian and Porto native with 20 years of guiding experience',
        bioPt: 'Historiador local e natural do Porto com 20 anos de experiência como guia'
      },
      interactions: [
        {
          id: 'lello-info',
          type: 'info',
          position: { x: 10, y: 5, z: -15 },
          content: 'Livraria Lello inspired J.K. Rowling\'s Hogwarts library',
          contentPt: 'A Livraria Lello inspirou a biblioteca de Hogwarts de J.K. Rowling'
        },
        {
          id: 'azulejo-quiz',
          type: 'quiz',
          position: { x: -8, y: 3, z: -20 },
          content: 'Test your knowledge about Portuguese azulejos',
          contentPt: 'Teste os seus conhecimentos sobre os azulejos portugueses'
        }
      ],
      relatedExperiences: ['lisbon-trams', 'douro-valley'],
      userRating: 4.8,
      totalViews: 15420
    },
    {
      id: 'santos-populares-festival',
      title: 'Santos Populares Festival',
      titlePt: 'Festivais dos Santos Populares',
      description: 'Immerse yourself in Lisbon\'s most beloved summer celebration',
      descriptionPt: 'Mergulhe na mais querida celebração de verão de Lisboa',
      location: 'Lisbon, Portugal',
      locationPt: 'Lisboa, Portugal',
      duration: 60,
      difficulty: 'intermediate',
      category: 'festivals',
      thumbnailUrl: '/images/vr/santos-populares.jpg',
      vrUrl: '/vr/santos-populares-festival.mp4',
      audioGuide: {
        en: '/audio/santos-populares-en.mp3',
        pt: '/audio/santos-populares-pt.mp3'
      },
      highlights: [
        'Traditional marchas parade',
        'Grilled sardines experience',
        'Alfama neighborhood atmosphere',
        'Traditional folk dancing'
      ],
      highlightsPt: [
        'Desfile das marchas tradicionais',
        'Experiência das sardinhas assadas',
        'Atmosfera do bairro de Alfama',
        'Danças folclóricas tradicionais'
      ],
      culturalContext: 'Join the celebration of Saint Anthony, Saint John, and Saint Peter with authentic Portuguese traditions.',
      culturalContextPt: 'Junte-se à celebração de Santo António, São João e São Pedro com tradições portuguesas autênticas.',
      virtualGuide: {
        name: 'Maria Santos',
        avatar: '/images/guides/maria-santos.jpg',
        bio: 'Cultural anthropologist specializing in Portuguese folk traditions',
        bioPt: 'Antropóloga cultural especializada em tradições folclóricas portuguesas'
      },
      interactions: [
        {
          id: 'sardine-cooking',
          type: 'story',
          position: { x: 5, y: 2, z: -10 },
          content: 'Learn the art of grilling perfect sardines',
          contentPt: 'Aprenda a arte de assar sardinhas perfeitas'
        },
        {
          id: 'marcha-dance',
          type: 'photo',
          position: { x: -12, y: 4, z: -8 },
          content: 'Join the marcha and take a commemorative photo',
          contentPt: 'Junte-se à marcha e tire uma foto comemorativa'
        }
      ],
      relatedExperiences: ['fado-experience', 'lisbon-trams'],
      userRating: 4.9,
      totalViews: 28350
    },
    {
      id: 'douro-valley-vineyard',
      title: 'Douro Valley Vineyards',
      titlePt: 'Vinhas do Vale do Douro',
      description: 'Explore the terraced vineyards of the world\'s oldest wine region',
      descriptionPt: 'Explore as vinhas em socalcos da região vinícola mais antiga do mundo',
      location: 'Douro Valley, Portugal',
      locationPt: 'Vale do Douro, Portugal',
      duration: 50,
      difficulty: 'beginner',
      category: 'nature',
      thumbnailUrl: '/images/vr/douro-valley.jpg',
      vrUrl: '/vr/douro-valley-vineyards.mp4',
      audioGuide: {
        en: '/audio/douro-valley-en.mp3',
        pt: '/audio/douro-valley-pt.mp3'
      },
      highlights: [
        'Terraced vineyard landscapes',
        'Traditional quinta visit',
        'Port wine tasting experience',
        'Douro River cruise simulation'
      ],
      highlightsPt: [
        'Paisagens de vinhas em socalcos',
        'Visita a quinta tradicional',
        'Experiência de prova de vinho do Porto',
        'Simulação de cruzeiro no rio Douro'
      ],
      culturalContext: 'Discover 2000 years of winemaking tradition in the world\'s first demarcated wine region.',
      culturalContextPt: 'Descubra 2000 anos de tradição vinícola na primeira região demarcada do mundo.',
      virtualGuide: {
        name: 'João Ferreira',
        avatar: '/images/guides/joao-ferreira.jpg',
        bio: 'Fifth-generation winemaker and Douro Valley expert',
        bioPt: 'Viticultor de quinta geração e especialista do Vale do Douro'
      },
      interactions: [
        {
          id: 'wine-tasting',
          type: 'story',
          position: { x: 8, y: 3, z: -12 },
          content: 'Virtual wine tasting with sommelier guidance',
          contentPt: 'Prova de vinhos virtual com orientação de sommelier'
        },
        {
          id: 'harvest-simulation',
          type: 'quiz',
          position: { x: -15, y: 2, z: -18 },
          content: 'Experience the traditional grape harvest process',
          contentPt: 'Experimente o processo tradicional de vindima'
        }
      ],
      relatedExperiences: ['porto-historical-center', 'portuguese-cuisine'],
      userRating: 4.7,
      totalViews: 12680
    }
  ];

  const categories = [
    { id: 'all', name: 'All Experiences', namePt: 'Todas as Experiências' },
    { id: 'landmarks', name: 'Landmarks', namePt: 'Monumentos' },
    { id: 'festivals', name: 'Festivals', namePt: 'Festivais' },
    { id: 'nature', name: 'Nature', namePt: 'Natureza' },
    { id: 'history', name: 'History', namePt: 'História' },
    { id: 'culture', name: 'Culture', namePt: 'Cultura' }
  ];

  useEffect(() => {
    // Check for WebXR support
    if ('xr' in navigator) {
      setIsVRSupported(true);
    }
  }, []);

  const filteredExperiences = vrExperiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.titlePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayExperience = (experience: VRExperience) => {
    setSelectedExperience(experience);
    setPlayerState(prev => ({ ...prev, isLoading: true }));
    // Simulate loading
    setTimeout(() => {
      setPlayerState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
    }, 2000);
  };

  const togglePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const toggleMute = () => {
    setPlayerState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleVolumeChange = (volume: number) => {
    setPlayerState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
  };

  const changeViewMode = (mode: VRPlayerState['viewMode']) => {
    setPlayerState(prev => ({ ...prev, viewMode: mode }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-secondary-100 text-secondary-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landmarks': return '🏛️';
      case 'festivals': return '🎊';
      case 'nature': return '🌿';
      case 'history': return '📜';
      case 'culture': return '🎭';
      default: return '🌟';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4"
          >
            {language === 'pt' ? 'Experiências VR Portuguesas' : 'Portuguese VR Experiences'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary-600 max-w-3xl mx-auto mb-6"
          >
            {language === 'pt' 
              ? 'Explore Portugal como nunca antes através de experiências imersivas de realidade virtual. Viaje pelos nossos monumentos, tradições e paisagens naturais.'
              : 'Explore Portugal like never before through immersive virtual reality experiences. Journey through our landmarks, traditions, and natural landscapes.'}
          </motion.p>
          
          {!isVRSupported && (
            <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded-lg max-w-2xl mx-auto mb-6">
              <p className="text-sm">
                {language === 'pt'
                  ? 'VR não suportado neste dispositivo. Pode ainda desfrutar da experiência em modo 360°.'
                  : 'VR not supported on this device. You can still enjoy the 360° experience mode.'}
              </p>
            </div>
          )}
        </div>

        {!selectedExperience ? (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={language === 'pt' ? 'Pesquisar experiências...' : 'Search experiences...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {language === 'pt' ? category.namePt : category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* VR Experiences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={experience.thumbnailUrl}
                      alt={language === 'pt' ? experience.titlePt : experience.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-vr.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-secondary-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {getCategoryIcon(experience.category)} {language === 'pt' ? categories.find(c => c.id === experience.category)?.namePt : categories.find(c => c.id === experience.category)?.name}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                        {experience.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePlayExperience(experience)}
                        className="bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Play className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary-800 mb-2">
                      {language === 'pt' ? experience.titlePt : experience.title}
                    </h3>
                    <p className="text-secondary-600 mb-3">
                      {language === 'pt' ? experience.descriptionPt : experience.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Map className="h-4 w-4 mr-1" />
                        {language === 'pt' ? experience.locationPt : experience.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {experience.duration} min
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-accent-500">
                          ⭐ {experience.userRating}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          {experience.totalViews.toLocaleString()}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-coral-500 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* VR Player */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Player Header */}
            <div className="bg-secondary-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {language === 'pt' ? selectedExperience.titlePt : selectedExperience.title}
                  </h2>
                  <p className="text-gray-300">
                    {language === 'pt' ? selectedExperience.locationPt : selectedExperience.location}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    ← {language === 'pt' ? 'Voltar' : 'Back'}
                  </button>
                  <button className="text-gray-300 hover:text-white transition-colors">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* VR Player */}
            <div className="relative bg-black aspect-video" ref={vrPlayerRef}>
              {playerState.isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
                    <p>{language === 'pt' ? 'A carregar experiência VR...' : 'Loading VR experience...'}</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🥽</div>
                    <p className="text-xl mb-2">
                      {playerState.isPlaying
                        ? (language === 'pt' ? 'Experiência VR Ativa' : 'VR Experience Active')
                        : (language === 'pt' ? 'Experiência VR Pausada' : 'VR Experience Paused')}
                    </p>
                    <p className="text-gray-300">
                      {language === 'pt' ? 'Use óculos VR para experiência completa' : 'Use VR headset for full experience'}
                    </p>
                  </div>
                </div>
              )}

              {/* Interactive Hotspots */}
              {showInteractions && selectedExperience.interactions.map((interaction) => (
                <motion.div
                  key={interaction.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bg-emerald-500 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-600 transition-colors"
                  style={{
                    left: `${50 + interaction.position.x}%`,
                    top: `${50 + interaction.position.y}%`
                  }}
                  onClick={() => {
                    toast.error(language === 'pt' ? interaction.contentPt : interaction.content);
                  }}
                >
                  {interaction.type === 'info' && 'ℹ️'}
                  {interaction.type === 'quiz' && '❓'}
                  {interaction.type === 'photo' && '📸'}
                  {interaction.type === 'story' && '📖'}
                </motion.div>
              ))}
            </div>

            {/* Player Controls */}
            <div className="bg-secondary-900 text-white p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlayPause}
                    className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    {playerState.isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </motion.button>
                  
                  <div className="flex items-center space-x-2">
                    <button onClick={toggleMute} className="text-gray-300 hover:text-white transition-colors">
                      {playerState.isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={playerState.volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </div>

                  <button
                    onClick={() => setShowInteractions(!showInteractions)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      showInteractions ? 'bg-emerald-600 text-white' : 'bg-secondary-700 text-gray-300'
                    }`}
                  >
                    {language === 'pt' ? 'Interações' : 'Interactions'}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300 mr-4">
                    {language === 'pt' ? 'Modo de Visualização:' : 'View Mode:'}
                  </span>
                  {(['vr', 'ar', '360', 'flat'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => changeViewMode(mode)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        playerState.viewMode === mode
                          ? 'bg-emerald-600 text-white'
                          : 'bg-secondary-700 text-gray-300 hover:bg-secondary-600'
                      }`}
                    >
                      {mode.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary-700 rounded-full h-2 mb-4">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(playerState.currentTime / selectedExperience.duration) * 100}%` }}
                ></div>
              </div>

              {/* Experience Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    {language === 'pt' ? 'Contexto Cultural' : 'Cultural Context'}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {language === 'pt' ? selectedExperience.culturalContextPt : selectedExperience.culturalContext}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    {language === 'pt' ? 'Guia Virtual' : 'Virtual Guide'}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedExperience.virtualGuide.avatar}
                      alt={selectedExperience.virtualGuide.name}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-avatar.jpg';
                      }}
                    />
                    <div>
                      <p className="font-semibold">{selectedExperience.virtualGuide.name}</p>
                      <p className="text-gray-300 text-sm">
                        {language === 'pt' ? selectedExperience.virtualGuide.bioPt : selectedExperience.virtualGuide.bio}
                      </p>
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

export default PortugueseVRExperiences;