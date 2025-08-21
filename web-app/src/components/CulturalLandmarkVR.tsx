'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Map, Clock, Users, Camera, Info, Star, Navigation, Volume2, Settings, Share, Bookmark } from 'lucide-react';

interface Landmark {
  id: string;
  name: string;
  namePt: string;
  city: string;
  cityPt: string;
  region: string;
  regionPt: string;
  coordinates: { lat: number; lng: number };
  category: 'religious' | 'castle' | 'palace' | 'bridge' | 'tower' | 'monument' | 'museum';
  period: string;
  periodPt: string;
  significance: string;
  significancePt: string;
  vrExperience: {
    duration: number;
    viewpoints: ViewPoint[];
    audioNarration: {
      en: string;
      pt: string;
    };
    interactiveElements: InteractiveElement[];
    virtualTour: VirtualTourStop[];
  };
  images: {
    thumbnail: string;
    gallery: string[];
    vrThumbnail: string;
  };
  facts: {
    built: string;
    architect?: string;
    height?: string;
    style: string;
    stylePt: string;
    visitors: string;
  };
  accessibility: {
    wheelchair: boolean;
    audioGuide: boolean;
    braille: boolean;
    signLanguage: boolean;
  };
  nearbyAttractions: string[];
  culturalEvents: string[];
  bestVisitTime: string;
  bestVisitTimePt: string;
  rating: number;
  reviewCount: number;
}

interface ViewPoint {
  id: string;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  position: { x: number; y: number; z: number; rotation: { x: number; y: number; z: number } };
  imageUrl: string;
  audioClip?: string;
  historicalContext: string;
  historicalContextPt: string;
  recommendedDuration: number;
}

interface InteractiveElement {
  id: string;
  type: 'info-panel' | 'audio-story' | 'historical-overlay' | '3d-model' | 'timeline' | 'comparison';
  position: { x: number; y: number; z: number };
  title: string;
  titlePt: string;
  content: string;
  contentPt: string;
  media?: {
    image?: string;
    audio?: string;
    video?: string;
    model3d?: string;
  };
  trigger: 'click' | 'proximity' | 'gaze' | 'gesture';
}

interface VirtualTourStop {
  id: string;
  name: string;
  namePt: string;
  description: string;
  descriptionPt: string;
  duration: number;
  viewpoint: string;
  narration: {
    en: string;
    pt: string;
  };
  interactiveElements: string[];
  nextStops: string[];
}

const CulturalLandmarkVR: React.FC = () => {
  const { language } = useLanguage();
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [currentViewpoint, setCurrentViewpoint] = useState<ViewPoint | null>(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [showInteractiveElements, setShowInteractiveElements] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [tourProgress, setTourProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const vrContainerRef = useRef<HTMLDivElement>(null);

  // Mock landmarks data
  const landmarks: Landmark[] = [
    {
      id: 'torre-belem',
      name: 'Belém Tower',
      namePt: 'Torre de Belém',
      city: 'Lisbon',
      cityPt: 'Lisboa',
      region: 'Lisbon',
      regionPt: 'Lisboa',
      coordinates: { lat: 38.6916, lng: -9.2162 },
      category: 'tower',
      period: '16th Century',
      periodPt: 'Século XVI',
      significance: 'UNESCO World Heritage Site and symbol of Portuguese maritime discoveries',
      significancePt: 'Património Mundial da UNESCO e símbolo dos descobrimentos marítimos portugueses',
      vrExperience: {
        duration: 35,
        viewpoints: [
          {
            id: 'exterior-view',
            name: 'Tower Exterior',
            namePt: 'Exterior da Torre',
            description: 'Marvel at the Manueline architecture from the riverbank',
            descriptionPt: 'Admire a arquitetura manuelina da margem do rio',
            position: { x: 0, y: 0, z: -30, rotation: { x: 0, y: 0, z: 0 } },
            imageUrl: '/vr/belem-tower-exterior.jpg',
            historicalContext: 'Built between 1514-1520 during the reign of King Manuel I',
            historicalContextPt: 'Construída entre 1514-1520 durante o reinado de D. Manuel I',
            recommendedDuration: 8
          },
          {
            id: 'interior-chambers',
            name: 'Interior Chambers',
            namePt: 'Câmaras Interiores',
            description: 'Explore the fortress chambers and defensive structures',
            descriptionPt: 'Explore as câmaras da fortaleza e estruturas defensivas',
            position: { x: 0, y: 15, z: 0, rotation: { x: 0, y: 45, z: 0 } },
            imageUrl: '/vr/belem-tower-interior.jpg',
            historicalContext: 'Used as a ceremonial gateway and later as a prison',
            historicalContextPt: 'Usada como portal cerimonial e mais tarde como prisão',
            recommendedDuration: 10
          },
          {
            id: 'terrace-view',
            name: 'Tower Terrace',
            namePt: 'Terraço da Torre',
            description: 'Panoramic view of the Tagus River and Jerónimos Monastery',
            descriptionPt: 'Vista panorâmica do rio Tejo e Mosteiro dos Jerónimos',
            position: { x: 0, y: 25, z: 0, rotation: { x: 0, y: 180, z: 0 } },
            imageUrl: '/vr/belem-tower-terrace.jpg',
            historicalContext: 'Strategic position for monitoring river traffic',
            historicalContextPt: 'Posição estratégica para monitorar tráfego fluvial',
            recommendedDuration: 12
          }
        ],
        audioNarration: {
          en: '/audio/belem-tower-narration-en.mp3',
          pt: '/audio/belem-tower-narration-pt.mp3'
        },
        interactiveElements: [
          {
            id: 'manueline-details',
            type: 'info-panel',
            position: { x: -5, y: 3, z: -10 },
            title: 'Manueline Architecture',
            titlePt: 'Arquitetura Manuelina',
            content: 'Distinctive Portuguese architectural style blending maritime motifs',
            contentPt: 'Estilo arquitetônico português distintivo com motivos marítimos',
            trigger: 'click'
          },
          {
            id: 'discovery-timeline',
            type: 'timeline',
            position: { x: 8, y: 5, z: -15 },
            title: 'Age of Discoveries Timeline',
            titlePt: 'Cronologia dos Descobrimentos',
            content: 'Interactive timeline of Portuguese maritime achievements',
            contentPt: 'Cronologia interativa dos feitos marítimos portugueses',
            trigger: 'click'
          }
        ],
        virtualTour: [
          {
            id: 'welcome',
            name: 'Welcome to Belém Tower',
            namePt: 'Bem-vindos à Torre de Belém',
            description: 'Begin your journey through Portugal\'s maritime heritage',
            descriptionPt: 'Inicie a sua jornada pelo património marítimo português',
            duration: 5,
            viewpoint: 'exterior-view',
            narration: {
              en: 'Welcome to the iconic Belém Tower...',
              pt: 'Bem-vindos à icónica Torre de Belém...'
            },
            interactiveElements: [],
            nextStops: ['fortress-exploration']
          },
          {
            id: 'fortress-exploration',
            name: 'Fortress Exploration',
            namePt: 'Exploração da Fortaleza',
            description: 'Discover the defensive capabilities and royal chambers',
            descriptionPt: 'Descubra as capacidades defensivas e câmaras reais',
            duration: 15,
            viewpoint: 'interior-chambers',
            narration: {
              en: 'As we enter the fortress interior...',
              pt: 'Ao entrarmos no interior da fortaleza...'
            },
            interactiveElements: ['manueline-details'],
            nextStops: ['panoramic-views']
          },
          {
            id: 'panoramic-views',
            name: 'Panoramic Views',
            namePt: 'Vistas Panorâmicas',
            description: 'Experience breathtaking views from the tower terrace',
            descriptionPt: 'Experimente vistas deslumbrantes do terraço da torre',
            duration: 15,
            viewpoint: 'terrace-view',
            narration: {
              en: 'From this vantage point...',
              pt: 'Deste ponto de vista...'
            },
            interactiveElements: ['discovery-timeline'],
            nextStops: []
          }
        ]
      },
      images: {
        thumbnail: '/images/landmarks/belem-tower-thumb.jpg',
        gallery: [
          '/images/landmarks/belem-tower-1.jpg',
          '/images/landmarks/belem-tower-2.jpg',
          '/images/landmarks/belem-tower-3.jpg'
        ],
        vrThumbnail: '/images/landmarks/belem-tower-vr.jpg'
      },
      facts: {
        built: '1514-1520',
        architect: 'Francisco de Arruda',
        height: '35 meters',
        style: 'Manueline',
        stylePt: 'Manuelino',
        visitors: '500,000+ annually'
      },
      accessibility: {
        wheelchair: false,
        audioGuide: true,
        braille: true,
        signLanguage: true
      },
      nearbyAttractions: ['Jerónimos Monastery', 'Discovery Monument', 'Cultural Center of Belém'],
      culturalEvents: ['Maritime Heritage Festival', 'Discoveries Day Celebration'],
      bestVisitTime: 'Morning hours for best lighting',
      bestVisitTimePt: 'Horas da manhã para melhor iluminação',
      rating: 4.6,
      reviewCount: 12847
    },
    {
      id: 'mosteiro-jeronimos',
      name: 'Jerónimos Monastery',
      namePt: 'Mosteiro dos Jerónimos',
      city: 'Lisbon',
      cityPt: 'Lisboa',
      region: 'Lisbon',
      regionPt: 'Lisboa',
      coordinates: { lat: 38.6979, lng: -9.2067 },
      category: 'religious',
      period: '16th Century',
      periodPt: 'Século XVI',
      significance: 'UNESCO World Heritage Site and masterpiece of Manueline architecture',
      significancePt: 'Património Mundial da UNESCO e obra-prima da arquitetura manuelina',
      vrExperience: {
        duration: 45,
        viewpoints: [
          {
            id: 'main-facade',
            name: 'Main Façade',
            namePt: 'Fachada Principal',
            description: 'Admire the ornate Manueline façade with intricate stone carvings',
            descriptionPt: 'Admire a fachada manuelina ornamentada com entalhes em pedra intrincados',
            position: { x: 0, y: 0, z: -40, rotation: { x: 0, y: 0, z: 0 } },
            imageUrl: '/vr/jeronimos-facade.jpg',
            historicalContext: 'Commissioned by King Manuel I to commemorate Vasco da Gama\'s voyage',
            historicalContextPt: 'Encomendado por D. Manuel I para comemorar a viagem de Vasco da Gama',
            recommendedDuration: 10
          },
          {
            id: 'church-interior',
            name: 'Church Interior',
            namePt: 'Interior da Igreja',
            description: 'Experience the soaring vaulted ceiling and tombs of Portuguese explorers',
            descriptionPt: 'Experimente o teto abobadado e os túmulos dos exploradores portugueses',
            position: { x: 0, y: 10, z: 0, rotation: { x: -10, y: 0, z: 0 } },
            imageUrl: '/vr/jeronimos-interior.jpg',
            historicalContext: 'Final resting place of Vasco da Gama and Luís de Camões',
            historicalContextPt: 'Local de descanso final de Vasco da Gama e Luís de Camões',
            recommendedDuration: 15
          },
          {
            id: 'cloisters',
            name: 'Cloisters',
            namePt: 'Claustros',
            description: 'Walk through the peaceful two-story cloisters with detailed stonework',
            descriptionPt: 'Caminhe pelos claustros pacíficos de dois andares com trabalho detalhado em pedra',
            position: { x: 20, y: 5, z: 10, rotation: { x: 0, y: 90, z: 0 } },
            imageUrl: '/vr/jeronimos-cloisters.jpg',
            historicalContext: 'Monastic life center where Hieronymite monks lived and worked',
            historicalContextPt: 'Centro da vida monástica onde os monges jerónimos viviam e trabalhavam',
            recommendedDuration: 20
          }
        ],
        audioNarration: {
          en: '/audio/jeronimos-narration-en.mp3',
          pt: '/audio/jeronimos-narration-pt.mp3'
        },
        interactiveElements: [
          {
            id: 'vasco-gama-tomb',
            type: '3d-model',
            position: { x: -8, y: 2, z: 15 },
            title: 'Vasco da Gama\'s Tomb',
            titlePt: 'Túmulo de Vasco da Gama',
            content: 'Interactive 3D model of the explorer\'s ornate tomb',
            contentPt: 'Modelo 3D interativo do túmulo ornamentado do explorador',
            trigger: 'proximity'
          },
          {
            id: 'manueline-elements',
            type: 'historical-overlay',
            position: { x: 5, y: 8, z: -5 },
            title: 'Manueline Decorative Elements',
            titlePt: 'Elementos Decorativos Manuelinos',
            content: 'Discover maritime symbols carved in stone',
            contentPt: 'Descubra símbolos marítimos esculpidos em pedra',
            trigger: 'gaze'
          }
        ],
        virtualTour: [
          {
            id: 'monastery-introduction',
            name: 'Monastery Introduction',
            namePt: 'Introdução ao Mosteiro',
            description: 'Learn about the monastery\'s founding and significance',
            descriptionPt: 'Aprenda sobre a fundação e significado do mosteiro',
            duration: 8,
            viewpoint: 'main-facade',
            narration: {
              en: 'The Jerónimos Monastery stands as a testament...',
              pt: 'O Mosteiro dos Jerónimos ergue-se como testemunho...'
            },
            interactiveElements: [],
            nextStops: ['sacred-spaces']
          },
          {
            id: 'sacred-spaces',
            name: 'Sacred Spaces',
            namePt: 'Espaços Sagrados',
            description: 'Explore the church and its historical significance',
            descriptionPt: 'Explore a igreja e a sua importância histórica',
            duration: 20,
            viewpoint: 'church-interior',
            narration: {
              en: 'Within these sacred walls...',
              pt: 'Dentro destas paredes sagradas...'
            },
            interactiveElements: ['vasco-gama-tomb'],
            nextStops: ['monastic-life']
          },
          {
            id: 'monastic-life',
            name: 'Monastic Life',
            namePt: 'Vida Monástica',
            description: 'Experience daily life in the monastery cloisters',
            descriptionPt: 'Experimente a vida quotidiana nos claustros do mosteiro',
            duration: 17,
            viewpoint: 'cloisters',
            narration: {
              en: 'The cloisters were the heart...',
              pt: 'Os claustros eram o coração...'
            },
            interactiveElements: ['manueline-elements'],
            nextStops: []
          }
        ]
      },
      images: {
        thumbnail: '/images/landmarks/jeronimos-thumb.jpg',
        gallery: [
          '/images/landmarks/jeronimos-1.jpg',
          '/images/landmarks/jeronimos-2.jpg',
          '/images/landmarks/jeronimos-3.jpg'
        ],
        vrThumbnail: '/images/landmarks/jeronimos-vr.jpg'
      },
      facts: {
        built: '1501-1601',
        architect: 'Diogo Boitac and João de Castilho',
        height: '25 meters (church nave)',
        style: 'Manueline',
        stylePt: 'Manuelino',
        visitors: '800,000+ annually'
      },
      accessibility: {
        wheelchair: true,
        audioGuide: true,
        braille: true,
        signLanguage: true
      },
      nearbyAttractions: ['Belém Tower', 'National Coach Museum', 'Maritime Museum'],
      culturalEvents: ['Holy Week Celebrations', 'Heritage Night'],
      bestVisitTime: 'Early morning or late afternoon',
      bestVisitTimePt: 'Início da manhã ou final da tarde',
      rating: 4.8,
      reviewCount: 18624
    },
    {
      id: 'castelo-sao-jorge',
      name: 'São Jorge Castle',
      namePt: 'Castelo de São Jorge',
      city: 'Lisbon',
      cityPt: 'Lisboa',
      region: 'Lisbon',
      regionPt: 'Lisboa',
      coordinates: { lat: 38.7139, lng: -9.1334 },
      category: 'castle',
      period: '11th Century',
      periodPt: 'Século XI',
      significance: 'Historic castle and royal residence overlooking Lisbon',
      significancePt: 'Castelo histórico e residência real com vista sobre Lisboa',
      vrExperience: {
        duration: 40,
        viewpoints: [
          {
            id: 'castle-walls',
            name: 'Castle Walls',
            namePt: 'Muralhas do Castelo',
            description: 'Walk along the ancient fortification walls',
            descriptionPt: 'Caminhe ao longo das antigas muralhas de fortificação',
            position: { x: 0, y: 12, z: -25, rotation: { x: 0, y: 30, z: 0 } },
            imageUrl: '/vr/sao-jorge-walls.jpg',
            historicalContext: 'Fortifications built by the Moors in the 11th century',
            historicalContextPt: 'Fortificações construídas pelos mouros no século XI',
            recommendedDuration: 12
          },
          {
            id: 'archaeological-site',
            name: 'Archaeological Site',
            namePt: 'Sítio Arqueológico',
            description: 'Discover layers of Lisbon\'s history beneath your feet',
            descriptionPt: 'Descubra camadas da história de Lisboa sob os seus pés',
            position: { x: -15, y: 0, z: 10, rotation: { x: -15, y: 45, z: 0 } },
            imageUrl: '/vr/sao-jorge-archaeology.jpg',
            historicalContext: 'Evidence of Roman, Visigothic, and Islamic occupation',
            historicalContextPt: 'Evidências de ocupação romana, visigótica e islâmica',
            recommendedDuration: 15
          },
          {
            id: 'panoramic-terrace',
            name: 'Panoramic Terrace',
            namePt: 'Terraço Panorâmico',
            description: 'Breathtaking 360° views of Lisbon and the Tagus River',
            descriptionPt: 'Vistas deslumbrantes de 360° de Lisboa e do rio Tejo',
            position: { x: 0, y: 20, z: 0, rotation: { x: 0, y: 0, z: 0 } },
            imageUrl: '/vr/sao-jorge-panorama.jpg',
            historicalContext: 'Strategic location for monitoring the city and river',
            historicalContextPt: 'Localização estratégica para monitorar a cidade e o rio',
            recommendedDuration: 13
          }
        ],
        audioNarration: {
          en: '/audio/sao-jorge-narration-en.mp3',
          pt: '/audio/sao-jorge-narration-pt.mp3'
        },
        interactiveElements: [
          {
            id: 'medieval-siege',
            type: 'historical-overlay',
            position: { x: 10, y: 5, z: -12 },
            title: 'Medieval Siege of Lisbon',
            titlePt: 'Cerco Medieval de Lisboa',
            content: 'Visualize the 1147 siege that captured the castle',
            contentPt: 'Visualize o cerco de 1147 que capturou o castelo',
            trigger: 'click'
          },
          {
            id: 'royal-chambers',
            type: '3d-model',
            position: { x: -5, y: 8, z: 5 },
            title: 'Royal Chambers Recreation',
            titlePt: 'Recriação das Câmaras Reais',
            content: '3D reconstruction of medieval royal apartments',
            contentPt: 'Reconstrução 3D dos aposentos reais medievais',
            trigger: 'proximity'
          }
        ],
        virtualTour: [
          {
            id: 'fortress-arrival',
            name: 'Arrival at the Fortress',
            namePt: 'Chegada à Fortaleza',
            description: 'Enter through the historic gates',
            descriptionPt: 'Entre pelos portões históricos',
            duration: 7,
            viewpoint: 'castle-walls',
            narration: {
              en: 'As you approach São Jorge Castle...',
              pt: 'Ao aproximar-se do Castelo de São Jorge...'
            },
            interactiveElements: [],
            nextStops: ['historical-layers']
          },
          {
            id: 'historical-layers',
            name: 'Layers of History',
            namePt: 'Camadas da História',
            description: 'Explore the archaeological discoveries',
            descriptionPt: 'Explore as descobertas arqueológicas',
            duration: 18,
            viewpoint: 'archaeological-site',
            narration: {
              en: 'Beneath this castle lie centuries...',
              pt: 'Sob este castelo jazem séculos...'
            },
            interactiveElements: ['medieval-siege', 'royal-chambers'],
            nextStops: ['city-overlook']
          },
          {
            id: 'city-overlook',
            name: 'City Overlook',
            namePt: 'Vista sobre a Cidade',
            description: 'Marvel at Lisbon from above',
            descriptionPt: 'Maravilhe-se com Lisboa do alto',
            duration: 15,
            viewpoint: 'panoramic-terrace',
            narration: {
              en: 'From this commanding height...',
              pt: 'Desta altura dominante...'
            },
            interactiveElements: [],
            nextStops: []
          }
        ]
      },
      images: {
        thumbnail: '/images/landmarks/sao-jorge-thumb.jpg',
        gallery: [
          '/images/landmarks/sao-jorge-1.jpg',
          '/images/landmarks/sao-jorge-2.jpg',
          '/images/landmarks/sao-jorge-3.jpg'
        ],
        vrThumbnail: '/images/landmarks/sao-jorge-vr.jpg'
      },
      facts: {
        built: '11th century (Moorish era)',
        height: '110 meters above sea level',
        style: 'Medieval fortress',
        stylePt: 'Fortaleza medieval',
        visitors: '1.2M+ annually'
      },
      accessibility: {
        wheelchair: true,
        audioGuide: true,
        braille: false,
        signLanguage: true
      },
      nearbyAttractions: ['Fado Museum', 'Lisbon Cathedral', 'Miradouro da Senhora do Monte'],
      culturalEvents: ['Medieval Fair', 'Castle Night Tours'],
      bestVisitTime: 'Sunset for spectacular views',
      bestVisitTimePt: 'Pôr do sol para vistas espetaculares',
      rating: 4.5,
      reviewCount: 16432
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', namePt: 'Todas as Categorias', icon: '🏛️' },
    { id: 'religious', name: 'Religious', namePt: 'Religiosos', icon: '⛪' },
    { id: 'castle', name: 'Castles', namePt: 'Castelos', icon: '🏰' },
    { id: 'palace', name: 'Palaces', namePt: 'Palácios', icon: '🏛️' },
    { id: 'bridge', name: 'Bridges', namePt: 'Pontes', icon: '🌉' },
    { id: 'tower', name: 'Towers', namePt: 'Torres', icon: '🗼' },
    { id: 'monument', name: 'Monuments', namePt: 'Monumentos', icon: '🗿' },
    { id: 'museum', name: 'Museums', namePt: 'Museus', icon: '🏛️' }
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('vr-landmark-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const filteredLandmarks = landmarks.filter(landmark => {
    const matchesSearch = 
      landmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      landmark.namePt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      landmark.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      landmark.significance.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || landmark.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const startVRExperience = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    setCurrentViewpoint(landmark.vrExperience.viewpoints[0]);
    setTourProgress(0);
  };

  const changeViewpoint = (viewpoint: ViewPoint) => {
    setCurrentViewpoint(viewpoint);
  };

  const toggleFavorite = (landmarkId: string) => {
    const newFavorites = favorites.includes(landmarkId)
      ? favorites.filter(id => id !== landmarkId)
      : [...favorites, landmarkId];
    
    setFavorites(newFavorites);
    localStorage.setItem('vr-landmark-favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4"
          >
            🏛️ {language === 'pt' ? 'Monumentos Portugueses em VR' : 'Portuguese Landmarks in VR'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
          >
            {language === 'pt'
              ? 'Explore os monumentos mais icônicos de Portugal através de experiências imersivas de realidade virtual. Cada pedra conta uma história.'
              : 'Explore Portugal\'s most iconic landmarks through immersive virtual reality experiences. Every stone tells a story.'}
          </motion.p>
        </div>

        {!selectedLandmark ? (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={language === 'pt' ? 'Pesquisar monumentos...' : 'Search landmarks...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-secondary-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {language === 'pt' ? category.namePt : category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Landmarks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLandmarks.map((landmark) => (
                <motion.div
                  key={landmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={landmark.images.vrThumbnail}
                      alt={language === 'pt' ? landmark.namePt : landmark.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-landmark.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-90 text-secondary-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {categories.find(c => c.id === landmark.category)?.icon} {landmark.period}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleFavorite(landmark.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.includes(landmark.id)
                            ? 'bg-coral-500 text-white'
                            : 'bg-white bg-opacity-80 text-secondary-600 hover:text-coral-500'
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => startVRExperience(landmark)}
                        className="bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors"
                      >
                        🥽
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary-800 mb-2">
                      {language === 'pt' ? landmark.namePt : landmark.name}
                    </h3>
                    <p className="text-secondary-600 mb-3">
                      {language === 'pt' ? landmark.significancePt : landmark.significance}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Map className="h-4 w-4 mr-1" />
                        {language === 'pt' ? landmark.cityPt : landmark.city}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {landmark.vrExperience.duration} min
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-accent-500">
                          <Star className="h-4 w-4 mr-1" />
                          {landmark.rating}
                        </span>
                        <span className="text-gray-500">
                          {landmark.reviewCount.toLocaleString()} {language === 'pt' ? 'avaliações' : 'reviews'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {landmark.accessibility.wheelchair && <span title="Wheelchair accessible">♿</span>}
                        {landmark.accessibility.audioGuide && <span title="Audio guide available">🎧</span>}
                        {landmark.accessibility.signLanguage && <span title="Sign language support">🤟</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* VR Experience Interface */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Experience Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {language === 'pt' ? selectedLandmark.namePt : selectedLandmark.name}
                  </h2>
                  <p className="text-amber-100 text-lg">
                    {language === 'pt' ? selectedLandmark.cityPt : selectedLandmark.city} • {selectedLandmark.period}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsVRMode(!isVRMode)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isVRMode ? 'bg-white text-amber-600' : 'bg-amber-500 hover:bg-amber-400'
                    }`}
                  >
                    {isVRMode ? '👁️ Regular' : '🥽 VR Mode'}
                  </button>
                  <button
                    onClick={() => setSelectedLandmark(null)}
                    className="text-amber-100 hover:text-white transition-colors"
                  >
                    ← {language === 'pt' ? 'Voltar' : 'Back'}
                  </button>
                </div>
              </div>
            </div>

            {/* VR Viewer */}
            <div className="relative bg-black aspect-video" ref={vrContainerRef}>
              {currentViewpoint ? (
                <div className="absolute inset-0">
                  <img
                    src={currentViewpoint.imageUrl}
                    alt={language === 'pt' ? currentViewpoint.namePt : currentViewpoint.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-vr-360.jpg';
                    }}
                  />
                  
                  {/* Interactive Elements Overlay */}
                  {showInteractiveElements && selectedLandmark.vrExperience.interactiveElements.map((element) => (
                    <motion.div
                      key={element.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bg-amber-500 text-white p-3 rounded-full cursor-pointer hover:bg-amber-600 transition-colors shadow-lg"
                      style={{
                        left: `${50 + element.position.x}%`,
                        top: `${50 + element.position.y}%`
                      }}
                      onClick={() => {
                        toast.error(language === 'pt' ? element.contentPt : element.content);
                      }}
                    >
                      {element.type === 'info-panel' && <Info className="h-5 w-5" />}
                      {element.type === '3d-model' && '📐'}
                      {element.type === 'historical-overlay' && '📜'}
                      {element.type === 'timeline' && '📅'}
                      {element.type === 'audio-story' && '🎧'}
                      {element.type === 'comparison' && '🔍'}
                    </motion.div>
                  ))}
                  
                  {/* Viewpoint Info Overlay */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-md">
                    <h4 className="font-bold text-lg mb-2">
                      {language === 'pt' ? currentViewpoint.namePt : currentViewpoint.name}
                    </h4>
                    <p className="text-sm mb-2">
                      {language === 'pt' ? currentViewpoint.descriptionPt : currentViewpoint.description}
                    </p>
                    <p className="text-xs text-gray-300">
                      {language === 'pt' ? currentViewpoint.historicalContextPt : currentViewpoint.historicalContext}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏛️</div>
                    <p className="text-xl">
                      {language === 'pt' ? 'A carregar experiência...' : 'Loading experience...'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Experience Controls */}
            <div className="bg-secondary-900 text-white p-6">
              {/* Viewpoint Selector */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">
                  {language === 'pt' ? 'Pontos de Vista' : 'Viewpoints'}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedLandmark.vrExperience.viewpoints.map((viewpoint) => (
                    <motion.button
                      key={viewpoint.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => changeViewpoint(viewpoint)}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        currentViewpoint?.id === viewpoint.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-secondary-700 hover:bg-secondary-600'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">
                        {language === 'pt' ? viewpoint.namePt : viewpoint.name}
                      </div>
                      <div className="text-xs text-gray-300">
                        {viewpoint.recommendedDuration} min
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Experience Settings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowInteractiveElements(!showInteractiveElements)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      showInteractiveElements ? 'bg-amber-600 text-white' : 'bg-secondary-700 hover:bg-secondary-600'
                    }`}
                  >
                    <Info className="h-4 w-4" />
                    <span className="text-sm">
                      {language === 'pt' ? 'Elementos Interativos' : 'Interactive Elements'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      audioEnabled ? 'bg-amber-600 text-white' : 'bg-secondary-700 hover:bg-secondary-600'
                    }`}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">
                      {language === 'pt' ? 'Narração' : 'Narration'}
                    </span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-secondary-700 hover:bg-secondary-600 transition-colors">
                    <Share className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-secondary-700 hover:bg-secondary-600 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-secondary-700 hover:bg-secondary-600 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Landmark Information */}
            <div className="p-6 bg-secondary-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-secondary-800 mb-3">
                    {language === 'pt' ? 'Informações Históricas' : 'Historical Information'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>{language === 'pt' ? 'Construído:' : 'Built:'}</strong> {selectedLandmark.facts.built}</div>
                    {selectedLandmark.facts.architect && (
                      <div><strong>{language === 'pt' ? 'Arquiteto:' : 'Architect:'}</strong> {selectedLandmark.facts.architect}</div>
                    )}
                    <div><strong>{language === 'pt' ? 'Estilo:' : 'Style:'}</strong> {language === 'pt' ? selectedLandmark.facts.stylePt : selectedLandmark.facts.style}</div>
                    {selectedLandmark.facts.height && (
                      <div><strong>{language === 'pt' ? 'Altura:' : 'Height:'}</strong> {selectedLandmark.facts.height}</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-secondary-800 mb-3">
                    {language === 'pt' ? 'Informações de Visita' : 'Visitor Information'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>{language === 'pt' ? 'Visitantes anuais:' : 'Annual visitors:'}</strong> {selectedLandmark.facts.visitors}</div>
                    <div><strong>{language === 'pt' ? 'Melhor horário:' : 'Best visit time:'}</strong> {language === 'pt' ? selectedLandmark.bestVisitTimePt : selectedLandmark.bestVisitTime}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-accent-500">★</span>
                      <span><strong>{selectedLandmark.rating}</strong> ({selectedLandmark.reviewCount.toLocaleString()} {language === 'pt' ? 'avaliações' : 'reviews'})</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-secondary-800 mb-3">
                    {language === 'pt' ? 'Atrações Próximas' : 'Nearby Attractions'}
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {selectedLandmark.nearbyAttractions.slice(0, 4).map((attraction, index) => (
                      <li key={index} className="text-secondary-600">• {attraction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalLandmarkVR;