"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon,
  FilmIcon,
  PhotoIcon,
  MicrophoneIcon,
  HeartIcon,
  ShareIcon,
  DownloadIcon,
  PlayCircleIcon,
  ClockIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { Event } from '@/types/event';
import YouTubeAPIService from '@/services/YouTubeAPIService';

interface EventHighlight {
  id: string;
  eventId: string;
  event: Event;
  highlightType: 'auto_compilation' | 'cultural_moments' | 'testimonials' | 'best_of' | 'tradition_showcase';
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnailUrl: string;
  videoUrl?: string;
  youtubeVideoId?: string;
  culturalMoments: CulturalMoment[];
  testimonials: Testimonial[];
  musicMoments: MusicMoment[];
  keyHighlights: string[];
  viewCount: number;
  likeCount: number;
  shareCount: number;
  status: 'processing' | 'ready_for_review' | 'approved' | 'published' | 'archived';
  createdAt: string;
  publishedAt?: string;
}

interface CulturalMoment {
  id: string;
  timestamp: number; // seconds in the video
  type: 'fado_performance' | 'traditional_dance' | 'food_preparation' | 'cultural_discussion' | 'community_singing' | 'tradition_explanation';
  description: string;
  participants: string[];
  culturalSignificance: string;
  featured: boolean;
}

interface Testimonial {
  id: string;
  participantName: string;
  culturalBackground: string;
  quote_pt: string;
  quote_en: string;
  emotion: 'joy' | 'nostalgia' | 'pride' | 'connection' | 'gratitude';
  timestamp: number;
  featured: boolean;
}

interface MusicMoment {
  id: string;
  songTitle: string;
  artist?: string;
  musicType: 'fado' | 'folk' | 'modern_portuguese' | 'brazilian' | 'african_portuguese';
  timestamp: number;
  duration: number;
  communityReaction: 'singing_along' | 'emotional' | 'dancing' | 'applause';
  culturalContext: string;
}

interface EventFootage {
  id: string;
  eventId: string;
  filename: string;
  duration: number;
  quality: '1080p' | '720p' | '480p';
  fileSize: number; // in MB
  uploadedBy: string;
  uploadedAt: string;
  processed: boolean;
  culturalContent: boolean;
}

export default function EventHighlightAutomation() {
  const { language, t } = useLanguage();
  const [highlights, setHighlights] = useState<EventHighlight[]>([]);
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<EventHighlight | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [footage, setFootage] = useState<EventFootage[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load completed events (mock data)
      const mockCompletedEvents: Event[] = [
        {
          id: 1,
          title: 'Noite de Fado Autêntico - Agosto',
          description: 'Uma noite mágica de Fado tradicional com fadistas de Lisboa',
          location: 'Soho Cultural Centre',
          date: '2025-08-15',
          time: '19:30',
          attendees: 38,
          maxAttendees: 40,
          price: 35,
          category: 'Música Tradicional',
          image: '/events/fado-night.jpg',
          status: 'fully-booked',
          portugueseCulturalFocus: true,
          culturalCategory: 'traditional_music'
        },
        {
          id: 2,
          title: 'Workshop de Culinária: Bacalhau à Brás',
          description: 'Aprenda a cozinhar o clássico prato português',
          location: 'Community Kitchen',
          date: '2025-08-12',
          time: '14:00',
          attendees: 16,
          maxAttendees: 16,
          price: 45,
          category: 'Culinária',
          image: '/events/cooking-class.jpg',
          status: 'fully-booked',
          portugueseCulturalFocus: true,
          culturalCategory: 'gastronomy'
        }
      ];

      // Load existing highlights (mock data)
      const mockHighlights: EventHighlight[] = [
        {
          id: '1',
          eventId: '1',
          event: mockCompletedEvents[0],
          highlightType: 'cultural_moments',
          title: 'Momentos Mágicos: Noite de Fado Autêntico',
          description: 'Os momentos mais emocionantes da nossa noite de Fado, desde as lágrimas de saudade até aos aplausos calorosos.',
          duration: 180, // 3 minutes
          thumbnailUrl: '/events/fado-highlight-thumb.jpg',
          youtubeVideoId: 'mock_highlight_123',
          culturalMoments: [
            {
              id: '1',
              timestamp: 45,
              type: 'fado_performance',
              description: 'Interpretação emocionante de "Lágrima" por Maria Fernandes',
              participants: ['Maria Fernandes', 'José Silva (guitarrista)'],
              culturalSignificance: 'Fado clássico que representa a alma portuguesa',
              featured: true
            },
            {
              id: '2',
              timestamp: 120,
              type: 'community_singing',
              description: 'Comunidade unida a cantar "Estranha Forma de Vida"',
              participants: ['Toda a comunidade'],
              culturalSignificance: 'Momento de união através da música tradicional',
              featured: true
            }
          ],
          testimonials: [
            {
              id: '1',
              participantName: 'Ana Costa',
              culturalBackground: 'Portuguesa do Porto',
              quote_pt: 'Senti-me em casa, como se estivesse numa casa de Fado em Alfama.',
              quote_en: 'I felt at home, as if I was in a Fado house in Alfama.',
              emotion: 'nostalgia',
              timestamp: 90,
              featured: true
            }
          ],
          musicMoments: [
            {
              id: '1',
              songTitle: 'Lágrima',
              artist: 'Maria Fernandes',
              musicType: 'fado',
              timestamp: 30,
              duration: 60,
              communityReaction: 'emotional',
              culturalContext: 'Fado tradicional de Coimbra'
            }
          ],
          keyHighlights: ['Autenticidade', 'Emoção', 'Comunidade', 'Tradição'],
          viewCount: 542,
          likeCount: 67,
          shareCount: 23,
          status: 'published',
          createdAt: '2025-08-16T10:00:00Z',
          publishedAt: '2025-08-17T15:30:00Z'
        }
      ];

      setCompletedEvents(mockCompletedEvents);
      setHighlights(mockHighlights);

      // Load footage for events
      const mockFootage: EventFootage[] = [
        {
          id: '1',
          eventId: '1',
          filename: 'fado_night_main_camera.mp4',
          duration: 7200, // 2 hours
          quality: '1080p',
          fileSize: 2048, // 2GB
          uploadedBy: 'event_organizer',
          uploadedAt: '2025-08-16T08:00:00Z',
          processed: true,
          culturalContent: true
        },
        {
          id: '2',
          eventId: '1',
          filename: 'fado_night_audience_reactions.mp4',
          duration: 1800, // 30 minutes
          quality: '720p',
          fileSize: 512, // 512MB
          uploadedBy: 'volunteer_photographer',
          uploadedAt: '2025-08-16T09:15:00Z',
          processed: true,
          culturalContent: true
        }
      ];

      setFootage(mockFootage);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateHighlightReel = async (event: Event, highlightType: string) => {
    try {
      setIsProcessing(true);

      // Simulate AI processing of footage
      await new Promise(resolve => setTimeout(resolve, 3000));

      const newHighlight: EventHighlight = {
        id: Date.now().toString(),
        eventId: event.id.toString(),
        event,
        highlightType: highlightType as any,
        title: generateHighlightTitle(event, highlightType),
        description: generateHighlightDescription(event, highlightType),
        duration: 180, // 3 minutes default
        thumbnailUrl: `/events/${event.id}_highlight_thumb.jpg`,
        culturalMoments: generateMockCulturalMoments(event),
        testimonials: generateMockTestimonials(event),
        musicMoments: generateMockMusicMoments(event),
        keyHighlights: generateKeyHighlights(event),
        viewCount: 0,
        likeCount: 0,
        shareCount: 0,
        status: 'ready_for_review',
        createdAt: new Date().toISOString()
      };

      setHighlights(prev => [newHighlight, ...prev]);
      setShowGenerator(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error generating highlight reel:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateHighlightTitle = (event: Event, type: string): string => {
    const templates = {
      cultural_moments: language === 'pt' 
        ? `Momentos Culturais: ${event.title}`
        : `Cultural Moments: ${event.title}`,
      testimonials: language === 'pt'
        ? `Testemunhos: ${event.title}`
        : `Testimonials: ${event.title}`,
      best_of: language === 'pt'
        ? `Melhores Momentos: ${event.title}`
        : `Best of: ${event.title}`,
      auto_compilation: language === 'pt'
        ? `Resumo: ${event.title}`
        : `Highlights: ${event.title}`,
      tradition_showcase: language === 'pt'
        ? `Tradições em Destaque: ${event.title}`
        : `Traditions Showcase: ${event.title}`
    };
    
    return templates[type as keyof typeof templates] || event.title;
  };

  const generateHighlightDescription = (event: Event, type: string): string => {
    const templates = {
      cultural_moments: language === 'pt'
        ? `Os momentos mais autênticos e emocionantes de ${event.title}, capturando a essência da cultura portuguesa.`
        : `The most authentic and emotional moments from ${event.title}, capturing the essence of Portuguese culture.`,
      testimonials: language === 'pt'
        ? `Ouça o que os participantes têm a dizer sobre ${event.title} e a importância destes eventos culturais.`
        : `Hear what participants have to say about ${event.title} and the importance of these cultural events.`,
      best_of: language === 'pt'
        ? `Uma compilação dos melhores momentos de ${event.title}, desde as tradições até às novas amizades.`
        : `A compilation of the best moments from ${event.title}, from traditions to new friendships.`
    };

    return templates[type as keyof typeof templates] || event.description;
  };

  const generateMockCulturalMoments = (event: Event): CulturalMoment[] => {
    // Generate relevant cultural moments based on event type
    const baseMoments = [
      {
        id: '1',
        timestamp: Math.random() * 120,
        type: 'cultural_discussion' as const,
        description: language === 'pt' 
          ? 'Partilha de histórias sobre tradições familiares'
          : 'Sharing stories about family traditions',
        participants: ['Vários participantes'],
        culturalSignificance: language === 'pt'
          ? 'Preservação da memória cultural através de histórias pessoais'
          : 'Preserving cultural memory through personal stories',
        featured: true
      }
    ];

    if (event.culturalCategory === 'traditional_music') {
      baseMoments.push({
        id: '2',
        timestamp: Math.random() * 120 + 60,
        type: 'fado_performance',
        description: 'Interpretação emocionante de Fado tradicional',
        participants: ['Fadista principal', 'Guitarrista'],
        culturalSignificance: 'Expressão máxima da alma portuguesa através da música',
        featured: true
      });
    }

    return baseMoments;
  };

  const generateMockTestimonials = (event: Event): Testimonial[] => {
    return [
      {
        id: '1',
        participantName: 'Maria Santos',
        culturalBackground: 'Portuguesa',
        quote_pt: 'Foi uma experiência incrível, senti-me verdadeiramente conectada às minhas raízes.',
        quote_en: 'It was an incredible experience, I felt truly connected to my roots.',
        emotion: 'pride',
        timestamp: Math.random() * 120,
        featured: true
      },
      {
        id: '2',
        participantName: 'João Silva',
        culturalBackground: 'Brasileiro',
        quote_pt: 'A comunidade lusófona em Londres é extraordinária, eventos como este unem-nos.',
        quote_en: 'The Lusophone community in London is extraordinary, events like this unite us.',
        emotion: 'connection',
        timestamp: Math.random() * 120 + 60,
        featured: true
      }
    ];
  };

  const generateMockMusicMoments = (event: Event): MusicMoment[] => {
    if (event.culturalCategory !== 'traditional_music') return [];

    return [
      {
        id: '1',
        songTitle: 'Lágrima',
        artist: 'Performer Local',
        musicType: 'fado',
        timestamp: 30,
        duration: 180,
        communityReaction: 'emotional',
        culturalContext: 'Fado tradicional de Coimbra, expressão de saudade'
      }
    ];
  };

  const generateKeyHighlights = (event: Event): string[] => {
    const baseHighlights = [
      language === 'pt' ? 'Comunidade' : 'Community',
      language === 'pt' ? 'Autenticidade' : 'Authenticity',
      language === 'pt' ? 'Tradição' : 'Tradition'
    ];

    if (event.culturalCategory === 'traditional_music') {
      baseHighlights.push(
        language === 'pt' ? 'Emoção Musical' : 'Musical Emotion',
        language === 'pt' ? 'Fado Autêntico' : 'Authentic Fado'
      );
    } else if (event.culturalCategory === 'gastronomy') {
      baseHighlights.push(
        language === 'pt' ? 'Sabores Tradicionais' : 'Traditional Flavors',
        language === 'pt' ? 'Técnicas Ancestrais' : 'Ancestral Techniques'
      );
    }

    return baseHighlights;
  };

  const handlePublishHighlight = async (highlight: EventHighlight) => {
    try {
      // Simulate publishing to YouTube
      const uploadOptions = {
        title: highlight.title,
        description: highlight.description,
        tags: [
          'LusoTown',
          'Portuguese Community',
          'London',
          'Cultural Events',
          highlight.event.category,
          ...highlight.keyHighlights
        ],
        categoryId: '22', // People & Blogs
        language: 'pt' as const,
        privacy: 'public' as const,
        culturalContext: 'universal' as const,
        portugueseCulturalFocus: true
      };

      // Simulate upload process
      const youtubeVideoId = `highlight_${Date.now()}`;
      
      setHighlights(prev => prev.map(h => 
        h.id === highlight.id 
          ? { 
              ...h, 
              youtubeVideoId,
              status: 'published',
              publishedAt: new Date().toISOString()
            }
          : h
      ));

    } catch (error) {
      console.error('Error publishing highlight:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'processing': 'text-blue-600 bg-blue-100',
      'ready_for_review': 'text-yellow-600 bg-yellow-100',
      'approved': 'text-green-600 bg-green-100',
      'published': 'text-purple-600 bg-purple-100',
      'archived': 'text-gray-600 bg-gray-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getHighlightTypeIcon = (type: string) => {
    const icons = {
      'cultural_moments': SparklesIcon,
      'testimonials': MicrophoneIcon,
      'best_of': HeartIcon,
      'auto_compilation': FilmIcon,
      'tradition_showcase': MusicalNoteIcon
    };
    const Icon = icons[type as keyof typeof icons] || FilmIcon;
    return <Icon className="w-5 h-5" />;
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'pt' ? 'Destaques Automáticos' : 'Automated Highlights'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'pt' 
              ? 'Crie compilações automáticas dos melhores momentos dos eventos'
              : 'Create automated compilations of the best event moments'
            }
          </p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          disabled={isProcessing}
          className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <FilmIcon className="w-5 h-5" />
          {language === 'pt' ? 'Novo Destaque' : 'New Highlight'}
        </button>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {highlights.map((highlight) => (
          <motion.div
            key={highlight.id}
            layout
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  {getHighlightTypeIcon(highlight.highlightType)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{highlight.title}</h3>
                  <p className="text-sm text-gray-500">{highlight.event.title}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(highlight.status)}`}>
                {highlight.status}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="relative mb-4">
              <img
                src={highlight.thumbnailUrl}
                alt={highlight.title}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/events/default.jpg';
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {formatDuration(highlight.duration)}
              </div>
              {highlight.youtubeVideoId && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => window.open(`https://youtube.com/watch?v=${highlight.youtubeVideoId}`, '_blank')}
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                  >
                    <PlayCircleIcon className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {highlight.description}
            </p>

            {/* Key Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {highlight.keyHighlights.slice(0, 3).map((key, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
                >
                  {key}
                </span>
              ))}
            </div>

            {/* Stats */}
            {highlight.status === 'published' && (
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <PlayCircleIcon className="w-4 h-4" />
                  {highlight.viewCount}
                </div>
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />
                  {highlight.likeCount}
                </div>
                <div className="flex items-center gap-1">
                  <ShareIcon className="w-4 h-4" />
                  {highlight.shareCount}
                </div>
              </div>
            )}

            {/* Content Summary */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <SparklesIcon className="w-3 h-3" />
                {highlight.culturalMoments.length} {language === 'pt' ? 'momentos' : 'moments'}
              </div>
              <div className="flex items-center gap-1">
                <MicrophoneIcon className="w-3 h-3" />
                {highlight.testimonials.length} {language === 'pt' ? 'depoimentos' : 'testimonials'}
              </div>
              <div className="flex items-center gap-1">
                <MusicalNoteIcon className="w-3 h-3" />
                {highlight.musicMoments.length} {language === 'pt' ? 'música' : 'music'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedHighlight(highlight)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
              </button>

              <div className="flex items-center gap-2">
                {highlight.status === 'ready_for_review' && (
                  <button
                    onClick={() => handlePublishHighlight(highlight)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg font-medium"
                  >
                    {language === 'pt' ? 'Publicar' : 'Publish'}
                  </button>
                )}

                {highlight.youtubeVideoId && (
                  <button
                    onClick={() => window.open(`https://youtube.com/watch?v=${highlight.youtubeVideoId}`, '_blank')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <PlayCircleIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Generate Highlight Modal */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'pt' ? 'Gerar Destaque Automático' : 'Generate Automatic Highlight'}
                </h2>

                {/* Completed Events */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === 'pt' ? 'Eventos Concluídos' : 'Completed Events'}
                  </h3>
                  
                  {completedEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedEvent?.id === event.id ? 'border-primary-500 bg-primary-50' : 'hover:border-primary-300'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/events/default.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <UserGroupIcon className="w-4 h-4" />
                              {event.attendees} {language === 'pt' ? 'participantes' : 'participants'}
                            </div>
                          </div>
                        </div>

                        {/* Available Footage */}
                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center gap-1 mb-1">
                            <CameraIcon className="w-4 h-4" />
                            {footage.filter(f => f.eventId === event.id.toString()).length} {language === 'pt' ? 'vídeos' : 'videos'}
                          </div>
                          <div>
                            {Math.round(footage
                              .filter(f => f.eventId === event.id.toString())
                              .reduce((acc, f) => acc + f.fileSize, 0) / 1024
                            )}GB
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlight Type Selection */}
                {selectedEvent && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {language === 'pt' ? 'Tipo de Destaque' : 'Highlight Type'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          type: 'cultural_moments',
                          title: language === 'pt' ? 'Momentos Culturais' : 'Cultural Moments',
                          description: language === 'pt' 
                            ? 'Destaque tradições, música e expressões culturais'
                            : 'Highlight traditions, music and cultural expressions'
                        },
                        {
                          type: 'testimonials',
                          title: language === 'pt' ? 'Depoimentos' : 'Testimonials',
                          description: language === 'pt'
                            ? 'Compile reações e comentários dos participantes'
                            : 'Compile reactions and comments from participants'
                        },
                        {
                          type: 'best_of',
                          title: language === 'pt' ? 'Melhores Momentos' : 'Best Moments',
                          description: language === 'pt'
                            ? 'Seleção automática dos momentos mais envolventes'
                            : 'Automatic selection of most engaging moments'
                        },
                        {
                          type: 'tradition_showcase',
                          title: language === 'pt' ? 'Mostra de Tradições' : 'Tradition Showcase',
                          description: language === 'pt'
                            ? 'Foque em demonstrações e explicações de tradições'
                            : 'Focus on tradition demonstrations and explanations'
                        }
                      ].map((option) => (
                        <button
                          key={option.type}
                          onClick={() => generateHighlightReel(selectedEvent, option.type)}
                          disabled={isProcessing}
                          className="text-left p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors disabled:opacity-50"
                        >
                          <h4 className="font-medium text-gray-900 mb-2">{option.title}</h4>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowGenerator(false)}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    {language === 'pt' ? 'Cancelar' : 'Cancel'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Highlight Detail Modal */}
      <AnimatePresence>
        {selectedHighlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedHighlight(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedHighlight.title}</h2>
                  <button
                    onClick={() => setSelectedHighlight(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cultural Moments */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5" />
                      {language === 'pt' ? 'Momentos Culturais' : 'Cultural Moments'}
                    </h3>
                    <div className="space-y-3">
                      {selectedHighlight.culturalMoments.map((moment) => (
                        <div key={moment.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary-600">
                              {formatDuration(Math.floor(moment.timestamp))}
                            </span>
                            {moment.featured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                {language === 'pt' ? 'Destaque' : 'Featured'}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{moment.description}</p>
                          <p className="text-xs text-gray-500">{moment.culturalSignificance}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MicrophoneIcon className="w-5 h-5" />
                      {language === 'pt' ? 'Depoimentos' : 'Testimonials'}
                    </h3>
                    <div className="space-y-3">
                      {selectedHighlight.testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {testimonial.participantName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDuration(Math.floor(testimonial.timestamp))}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 italic mb-1">
                            "{language === 'pt' ? testimonial.quote_pt : testimonial.quote_en}"
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{testimonial.culturalBackground}</span>
                            <span>•</span>
                            <span className="capitalize">{testimonial.emotion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-8 text-center"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Processando Destaque...' : 'Processing Highlight...'}
              </h3>
              <p className="text-gray-600">
                {language === 'pt' 
                  ? 'Analisando footage e criando compilação automática'
                  : 'Analyzing footage and creating automatic compilation'
                }
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}