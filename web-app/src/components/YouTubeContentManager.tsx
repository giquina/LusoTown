"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircleIcon,
  ListBulletIcon,
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  CalendarDaysIcon,
  TagIcon,
  LanguageIcon,
  GlobeAltIcon,
  TvIcon,
  FilmIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import YouTubeAPIService, { YouTubeVideo, YouTubePlaylist, YouTubeAnalytics } from '@/services/YouTubeAPIService';

interface ContentCalendar {
  id: string;
  date: string;
  contentType: 'member_spotlight' | 'event_preview' | 'event_highlight' | 'cultural_education' | 'business_feature';
  title: string;
  description: string;
  culturalContext: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal';
  status: 'planned' | 'in_production' | 'ready' | 'published' | 'rescheduled';
  youtubeVideoId?: string;
  estimatedViews: number;
  priority: 'low' | 'medium' | 'high';
}

interface PerformanceMetrics {
  totalViews: number;
  totalSubscribers: number;
  monthlyGrowth: number;
  topPerformingVideo: YouTubeVideo;
  engagementRate: number;
  geographicDistribution: Record<string, number>;
  culturalContentPerformance: Record<string, number>;
}

export default function YouTubeContentManager() {
  const { language, t } = useLanguage();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [contentCalendar, setContentCalendar] = useState<ContentCalendar[]>([]);
  const [analytics, setAnalytics] = useState<YouTubeAnalytics | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [selectedTab, setSelectedTab] = useState<'videos' | 'playlists' | 'calendar' | 'analytics'>('videos');
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    loadYouTubeContent();
  }, []);

  const loadYouTubeContent = async () => {
    try {
      setIsLoading(true);

      // Load mock YouTube content data
      const mockVideos: YouTubeVideo[] = [
        {
          id: 'video1',
          title: '🇵🇹 LusoTown: História de Sucesso - Maria Silva, Pastelaria de Sonho',
          description: 'Conheça a incrível jornada de Maria Silva, que trouxe os autênticos pastéis de nata para Borough Market.',
          thumbnailUrl: '/youtube/maria_silva_thumbnail.jpg',
          duration: '12:34',
          viewCount: 2847,
          likeCount: 189,
          publishedAt: '2025-08-15T14:30:00Z',
          channelId: 'UCLusoTownLondon',
          tags: ['LusoTown', 'Portuguese Community', 'Success Story', 'Pastéis de Nata', 'Borough Market'],
          categoryId: '22',
          language: 'pt',
          culturalContext: 'portugal',
          portugueseFocus: true
        },
        {
          id: 'video2',
          title: '🎵 Prévia: Noite de Fado Autêntico - O que esperar',
          description: 'Prepare-se para uma noite mágica de Fado tradicional com fadistas diretamente de Lisboa.',
          thumbnailUrl: '/youtube/fado_preview_thumbnail.jpg',
          duration: '4:18',
          viewCount: 1256,
          likeCount: 98,
          publishedAt: '2025-08-18T10:15:00Z',
          channelId: 'UCLusoTownLondon',
          tags: ['Fado', 'Portuguese Music', 'Event Preview', 'Traditional', 'Culture'],
          categoryId: '10',
          language: 'pt',
          culturalContext: 'portugal',
          portugueseFocus: true
        },
        {
          id: 'video3',
          title: '🏘️ Comunidade Portuguesa: Momentos Marcantes - Santos Populares 2025',
          description: 'Os melhores momentos da nossa celebração dos Santos Populares em Hyde Park.',
          thumbnailUrl: '/youtube/santos_populares_highlight.jpg',
          duration: '8:42',
          viewCount: 3421,
          likeCount: 267,
          publishedAt: '2025-06-25T16:45:00Z',
          channelId: 'UCLusoTownLondon',
          tags: ['Santos Populares', 'Portuguese Festival', 'Community', 'Tradition', 'London'],
          categoryId: '22',
          language: 'pt',
          culturalContext: 'portugal',
          portugueseFocus: true
        }
      ];

      const mockPlaylists: YouTubePlaylist[] = [
        {
          id: 'playlist1',
          title: 'LusoTown: Histórias de Sucesso',
          description: 'Histórias inspiradoras de portugueses que alcançaram sucesso em Londres',
          thumbnailUrl: '/youtube/success_stories_playlist.jpg',
          itemCount: 12,
          createdAt: '2025-01-15T10:00:00Z',
          privacy: 'public',
          culturalCategory: 'success_stories'
        },
        {
          id: 'playlist2',
          title: 'Eventos Culturais Portugueses',
          description: 'Prévias e destaques dos nossos eventos culturais',
          thumbnailUrl: '/youtube/cultural_events_playlist.jpg',
          itemCount: 28,
          createdAt: '2025-02-01T12:00:00Z',
          privacy: 'public',
          culturalCategory: 'events'
        },
        {
          id: 'playlist3',
          title: 'Tradições Portuguesas em Londres',
          description: 'Preservando e celebrando tradições portuguesas',
          thumbnailUrl: '/youtube/traditions_playlist.jpg',
          itemCount: 15,
          createdAt: '2025-03-10T14:30:00Z',
          privacy: 'public',
          culturalCategory: 'traditions'
        }
      ];

      const mockContentCalendar: ContentCalendar[] = [
        {
          id: '1',
          date: '2025-08-22',
          contentType: 'member_spotlight',
          title: 'História de João Santos - Músico de Fado',
          description: 'Entrevista com João Santos sobre preservar o Fado em Londres',
          culturalContext: 'portugal',
          status: 'in_production',
          estimatedViews: 1500,
          priority: 'high'
        },
        {
          id: '2',
          date: '2025-08-25',
          contentType: 'event_preview',
          title: 'Prévia: Workshop de Culinária Portuguesa',
          description: 'O que esperar do nosso próximo workshop de bacalhau à brás',
          culturalContext: 'portugal',
          status: 'planned',
          estimatedViews: 800,
          priority: 'medium'
        },
        {
          id: '3',
          date: '2025-08-28',
          contentType: 'cultural_education',
          title: 'História dos Azulejos Portugueses',
          description: 'Explorando a rica tradição dos azulejos portugueses',
          culturalContext: 'portugal',
          status: 'ready',
          estimatedViews: 1200,
          priority: 'medium'
        }
      ];

      const mockMetrics: PerformanceMetrics = {
        totalViews: 45672,
        totalSubscribers: 3241,
        monthlyGrowth: 18.5,
        topPerformingVideo: mockVideos[2],
        engagementRate: 7.8,
        geographicDistribution: {
          'GB': 65,
          'PT': 15,
          'BR': 12,
          'FR': 4,
          'ES': 4
        },
        culturalContentPerformance: {
          'portugal': 78,
          'universal': 62,
          'diaspora': 45,
          'brazil': 38
        }
      };

      setVideos(mockVideos);
      setPlaylists(mockPlaylists);
      setContentCalendar(mockContentCalendar);
      setMetrics(mockMetrics);

    } catch (error) {
      console.error('Error loading YouTube content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleContent = async (content: Partial<ContentCalendar>) => {
    try {
      const newContent: ContentCalendar = {
        id: Date.now().toString(),
        date: content.date || '',
        contentType: content.contentType || 'cultural_education',
        title: content.title || '',
        description: content.description || '',
        culturalContext: content.culturalContext || 'universal',
        status: 'planned',
        estimatedViews: content.estimatedViews || 500,
        priority: content.priority || 'medium'
      };

      setContentCalendar(prev => [...prev, newContent]);
    } catch (error) {
      console.error('Error scheduling content:', error);
    }
  };

  const handlePublishContent = async (contentId: string) => {
    try {
      // In a real implementation, this would trigger the actual publishing process
      setContentCalendar(prev => prev.map(content => 
        content.id === contentId 
          ? { ...content, status: 'published', youtubeVideoId: `published_${Date.now()}` }
          : content
      ));
    } catch (error) {
      console.error('Error publishing content:', error);
    }
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDuration = (duration: string): string => {
    // Duration is already in MM:SS format
    return duration;
  };

  const getContentTypeIcon = (type: string) => {
    const icons = {
      'member_spotlight': EyeIcon,
      'event_preview': CalendarDaysIcon,
      'event_highlight': FilmIcon,
      'cultural_education': GlobeAltIcon,
      'business_feature': ChartBarIcon
    };
    const Icon = icons[type as keyof typeof icons] || FilmIcon;
    return <Icon className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'planned': 'text-blue-600 bg-blue-100',
      'in_production': 'text-yellow-600 bg-yellow-100',
      'ready': 'text-green-600 bg-green-100',
      'published': 'text-purple-600 bg-purple-100',
      'rescheduled': 'text-orange-600 bg-orange-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'text-gray-600',
      'medium': 'text-yellow-600',
      'high': 'text-red-600'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'pt' ? 'Gestão de Conteúdo YouTube' : 'YouTube Content Management'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'pt' 
              ? 'Gira todo o conteúdo YouTube da LusoTown com foco cultural português'
              : 'Manage all LusoTown YouTube content with Portuguese cultural focus'
            }
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <TvIcon className="w-5 h-5" />
            {language === 'pt' ? 'Novo Upload' : 'New Upload'}
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <EyeIcon className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatViews(metrics.totalViews)}</p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Total de Visualizações' : 'Total Views'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalSubscribers.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Subscritores' : 'Subscribers'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">+{metrics.monthlyGrowth}%</p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Crescimento Mensal' : 'Monthly Growth'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{metrics.engagementRate}%</p>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Taxa de Interação' : 'Engagement Rate'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'videos', label: language === 'pt' ? 'Vídeos' : 'Videos', icon: PlayCircleIcon },
            { id: 'playlists', label: language === 'pt' ? 'Playlists' : 'Playlists', icon: ListBulletIcon },
            { id: 'calendar', label: language === 'pt' ? 'Calendário' : 'Calendar', icon: CalendarDaysIcon },
            { id: 'analytics', label: language === 'pt' ? 'Analytics' : 'Analytics', icon: ChartBarIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {selectedTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                layout
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/events/default.jpg';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {formatDuration(video.duration)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 transition-opacity">
                    <button
                      onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors"
                    >
                      <PlayCircleIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      {formatViews(video.viewCount)}
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      {video.likeCount}
                    </div>
                  </div>

                  {/* Cultural Context */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {video.culturalContext && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${{
                          portugal: 'bg-green-100 text-green-800',
                          brazil: 'bg-yellow-100 text-yellow-800',
                          africa: 'bg-orange-100 text-orange-800',
                          diaspora: 'bg-purple-100 text-purple-800',
                          universal: 'bg-blue-100 text-blue-800'
                        }[video.culturalContext]}`}>
                          {video.culturalContext}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <LanguageIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{video.language}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'playlists' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                layout
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={playlist.thumbnailUrl}
                    alt={playlist.title}
                    className="w-20 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/events/default.jpg';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{playlist.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{playlist.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <PlayCircleIcon className="w-4 h-4" />
                          {playlist.itemCount} {language === 'pt' ? 'vídeos' : 'videos'}
                        </div>
                        <div className="flex items-center gap-1">
                          <GlobeAltIcon className="w-4 h-4" />
                          {playlist.privacy}
                        </div>
                      </div>
                      <button
                        onClick={() => window.open(`https://youtube.com/playlist?list=${playlist.id}`, '_blank')}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        {language === 'pt' ? 'Ver Playlist' : 'View Playlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'calendar' && (
          <div className="space-y-4">
            {contentCalendar
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((content) => (
                <motion.div
                  key={content.id}
                  layout
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        {getContentTypeIcon(content.contentType)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{content.title}</h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(content.status)}`}>
                            {content.status}
                          </div>
                          <div className={`text-sm font-medium ${getPriorityColor(content.priority)}`}>
                            {content.priority}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{content.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-4 h-4" />
                            {new Date(content.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <EyeIcon className="w-4 h-4" />
                            {formatViews(content.estimatedViews)} {language === 'pt' ? 'estimadas' : 'estimated'}
                          </div>
                          <div className="flex items-center gap-1">
                            <GlobeAltIcon className="w-4 h-4" />
                            {content.culturalContext}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {content.status === 'ready' && (
                        <button
                          onClick={() => handlePublishContent(content.id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-medium"
                        >
                          {language === 'pt' ? 'Publicar' : 'Publish'}
                        </button>
                      )}
                      
                      {content.youtubeVideoId && (
                        <button
                          onClick={() => window.open(`https://youtube.com/watch?v=${content.youtubeVideoId}`, '_blank')}
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
        )}

        {selectedTab === 'analytics' && metrics && (
          <div className="space-y-6">
            {/* Geographic Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'pt' ? 'Distribuição Geográfica' : 'Geographic Distribution'}
              </h3>
              <div className="space-y-3">
                {Object.entries(metrics.geographicDistribution).map(([country, percentage]) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-gray-700">{country}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-primary-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Content Performance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'pt' ? 'Performance por Contexto Cultural' : 'Cultural Content Performance'}
              </h3>
              <div className="space-y-3">
                {Object.entries(metrics.culturalContentPerformance).map(([context, score]) => (
                  <div key={context} className="flex items-center justify-between">
                    <span className="text-gray-700 capitalize">{context}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">{score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Video */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'pt' ? 'Vídeo Mais Popular' : 'Top Performing Video'}
              </h3>
              <div className="flex items-center gap-4">
                <img
                  src={metrics.topPerformingVideo.thumbnailUrl}
                  alt={metrics.topPerformingVideo.title}
                  className="w-24 h-16 object-cover rounded-lg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/events/default.jpg';
                  }}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{metrics.topPerformingVideo.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      {formatViews(metrics.topPerformingVideo.viewCount)}
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      {metrics.topPerformingVideo.likeCount}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => window.open(`https://youtube.com/watch?v=${metrics.topPerformingVideo.id}`, '_blank')}
                  className="text-red-600 hover:text-red-700"
                >
                  <PlayCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}