import { SITE_URL } from '@/config/site'
import { ROUTES } from '@/config/routes'
import { EXTERNAL_SERVICES } from '@/config/cdn'

/**
 * YouTube API Service for LusoTown's Streaming Platform
 * Handles all YouTube API operations with Portuguese cultural content focus
 * Created: 2025-08-18
 */

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  channelId: string;
  tags: string[];
  categoryId: string;
  language: string;
  culturalContext?: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal';
  portugueseFocus: boolean;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount: number;
  createdAt: string;
  privacy: 'public' | 'unlisted' | 'private';
  culturalCategory: string;
}

export interface YouTubeLiveStream {
  id: string;
  title: string;
  description: string;
  scheduledStartTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  concurrentViewers?: number;
  broadcastStatus: 'upcoming' | 'live' | 'complete';
  thumbnailUrl: string;
}

export interface UploadOptions {
  title: string;
  description: string;
  tags: string[];
  categoryId: string;
  language: 'pt' | 'pt-BR' | 'pt-PT' | 'en';
  privacy: 'public' | 'unlisted' | 'private';
  playlistId?: string;
  culturalContext?: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal';
  portugueseCulturalFocus: boolean;
  thumbnailBlob?: Blob;
}

export interface YouTubeAnalytics {
  views: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
  subscribersGained: number;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  impressions: number;
  clickThroughRate: number;
  geographicDistribution: Record<string, number>;
  ageGroupDistribution: Record<string, number>;
  genderDistribution: Record<string, number>;
}

class YouTubeAPIService {
  private apiKey: string;
  private channelId: string;
  private baseUrl = process.env.NEXT_PUBLIC_YOUTUBE_API_URL || 'https://www.googleapis.com/youtube/v3';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
    this.channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '';
  }

  // ============================================================================
  // CORE YOUTUBE API METHODS
  // ============================================================================

  /**
   * Upload video to YouTube with Portuguese cultural metadata
   */
  async uploadVideo(file: File, options: UploadOptions): Promise<YouTubeVideo> {
    try {
      const metadata = {
        snippet: {
          title: this.enhanceTitleWithCulturalContext(options.title, options.culturalContext),
          description: this.enhanceDescriptionWithCulturalTags(options.description, options),
          tags: this.enhanceTagsWithPortugueseKeywords(options.tags, options.culturalContext),
          categoryId: options.categoryId,
          defaultLanguage: options.language,
          defaultAudioLanguage: options.language
        },
        status: {
          privacyStatus: options.privacy,
          selfDeclaredMadeForKids: false
        }
      };

      // Add to Portuguese cultural playlist if specified
      if (options.playlistId || options.portugueseCulturalFocus) {
        const playlistId = options.playlistId || await this.getPortugueseCulturalPlaylistId(options.culturalContext);
        if (playlistId) {
          await this.addVideoToPlaylist(playlistId, metadata.snippet.title);
        }
      }

      const response = await fetch(`${this.baseUrl}/videos?part=snippet,status&key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadata)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`YouTube API Error: ${data.error?.message || 'Unknown error'}`);
      }

      // Upload thumbnail if provided
      if (options.thumbnailBlob) {
        await this.uploadThumbnail(data.id, options.thumbnailBlob);
      }

      return this.mapYouTubeVideoResponse(data);
    } catch (error) {
      console.error('Error uploading video to YouTube:', error);
      throw error;
    }
  }

  /**
   * Create live stream with Portuguese cultural context
   */
  async createLiveStream(
    title: string,
    description: string,
    scheduledStartTime: string,
    culturalContext?: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal'
  ): Promise<YouTubeLiveStream> {
    try {
      const enhancedTitle = this.enhanceTitleWithCulturalContext(title, culturalContext);
      const enhancedDescription = this.enhanceDescriptionWithCulturalTags(description, {
        culturalContext,
        portugueseCulturalFocus: true,
        tags: [],
        title,
        description,
        categoryId: '25', // News & Politics - suitable for cultural content
        language: 'pt',
        privacy: 'public'
      });

      const broadcast = await fetch(`${this.baseUrl}/liveBroadcasts?part=snippet,status&key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          snippet: {
            title: enhancedTitle,
            description: enhancedDescription,
            scheduledStartTime
          },
          status: {
            privacyStatus: 'public'
          }
        })
      });

      const broadcastData = await broadcast.json();
      
      if (!broadcast.ok) {
        throw new Error(`YouTube Live API Error: ${broadcastData.error?.message || 'Unknown error'}`);
      }

      return this.mapYouTubeLiveStreamResponse(broadcastData);
    } catch (error) {
      console.error('Error creating YouTube live stream:', error);
      throw error;
    }
  }

  /**
   * Get video analytics with Portuguese audience focus
   */
  async getVideoAnalytics(videoId: string, startDate: string, endDate: string): Promise<YouTubeAnalytics> {
    try {
      const metrics = [
        'views',
        'estimatedMinutesWatched',
        'averageViewDuration',
        'subscribersGained',
        'likes',
        'dislikes',
        'comments',
        'shares',
        'impressions',
        'impressionClickThroughRate'
      ];

      const response = await fetch(
        `${EXTERNAL_SERVICES.youtubeAnalytics}/reports?ids=channel==${this.channelId}&startDate=${startDate}&endDate=${endDate}&metrics=${metrics.join(',')}&filters=video==${videoId}&key=${this.apiKey}`,
        {
          headers: {
            'Authorization': `Bearer ${await this.getAccessToken()}`
          }
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`YouTube Analytics API Error: ${data.error?.message || 'Unknown error'}`);
      }

      // Get geographic distribution (focus on Portuguese-speaking countries)
      const geoResponse = await this.getGeographicAnalytics(videoId, startDate, endDate);
      
      return this.mapAnalyticsResponse(data, geoResponse);
    } catch (error) {
      console.error('Error fetching YouTube analytics:', error);
      throw error;
    }
  }

  /**
   * Search for Portuguese cultural content
   */
  async searchPortugueseContent(
    query: string,
    culturalContext?: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal'
  ): Promise<YouTubeVideo[]> {
    try {
      let enhancedQuery = query;
      
      // Add cultural context to search query
      if (culturalContext) {
        const contextKeywords = {
          portugal: 'Portugal português tradição',
          brazil: 'Brasil brasileiro cultura',
          africa: 'África lusófono PALOP',
          diaspora: 'comunidade portuguesa emigração',
          universal: 'lusófono português'
        };
        enhancedQuery += ` ${contextKeywords[culturalContext]}`;
      }

      const response = await fetch(
        `${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(enhancedQuery)}&regionCode=GB&relevanceLanguage=pt&maxResults=25&type=video&key=${this.apiKey}`
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`YouTube Search API Error: ${data.error?.message || 'Unknown error'}`);
      }

      return data.items.map((item: any) => this.mapSearchResultToVideo(item));
    } catch (error) {
      console.error('Error searching YouTube content:', error);
      throw error;
    }
  }

  // ============================================================================
  // PLAYLIST MANAGEMENT FOR PORTUGUESE CONTENT
  // ============================================================================

  /**
   * Create specialized playlists for Portuguese cultural content
   */
  async createPortugueseCulturalPlaylists(): Promise<Record<string, string>> {
    const playlists = [
      {
        title: 'LusoTown: Histórias de Sucesso da Comunidade',
        description: 'Histórias inspiradoras de portugueses que alcançaram sucesso em Londres',
        culturalContext: 'diaspora'
      },
      {
        title: 'LusoTown: Prévia de Eventos Culturais',
        description: 'Conheça os próximos eventos culturais portugueses em Londres',
        culturalContext: 'universal'
      },
      {
        title: 'LusoTown: Momentos Marcantes de Eventos',
        description: 'Os melhores momentos dos nossos eventos culturais portugueses',
        culturalContext: 'universal'
      },
      {
        title: 'LusoTown: Tradições Portuguesas em Londres',
        description: 'Preservando e celebrando tradições portuguesas na comunidade londrina',
        culturalContext: 'portugal'
      },
      {
        title: 'LusoTown: Sabores de Portugal em Londres',
        description: 'Culinária portuguesa autêntica na capital britânica',
        culturalContext: 'portugal'
      },
      {
        title: 'LusoTown: Fado e Música Portuguesa',
        description: 'A alma portuguesa através da música e do Fado',
        culturalContext: 'portugal'
      },
      {
        title: 'LusoTown: Negócios e Empreendedorismo',
        description: 'Histórias de sucesso empresarial da comunidade portuguesa',
        culturalContext: 'universal'
      },
      {
        title: 'LusoTown: Educação e Preservação Cultural',
        description: 'Ensino da língua e cultura portuguesa para as novas gerações',
        culturalContext: 'diaspora'
      }
    ];

    const playlistIds: Record<string, string> = {};

    for (const playlist of playlists) {
      try {
        const response = await fetch(`${this.baseUrl}/playlists?part=snippet,status&key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await this.getAccessToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            snippet: {
              title: playlist.title,
              description: playlist.description,
              tags: ['LusoTown', 'Portuguese', 'Community', 'London', 'Culture'],
              defaultLanguage: 'pt'
            },
            status: {
              privacyStatus: 'public'
            }
          })
        });

        const data = await response.json();
        playlistIds[playlist.culturalContext] = data.id;
      } catch (error) {
        console.error(`Error creating playlist ${playlist.title}:`, error);
      }
    }

    return playlistIds;
  }

  // ============================================================================
  // HELPER METHODS FOR PORTUGUESE CULTURAL ENHANCEMENT
  // ============================================================================

  /**
   * Enhance video titles with Portuguese cultural context
   */
  private enhanceTitleWithCulturalContext(
    title: string,
    culturalContext?: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal'
  ): string {
    const contextPrefixes = {
      portugal: '🇵🇹 Portugal em Londres: ',
      brazil: '🇧🇷 Brasil em Londres: ',
      africa: '🌍 África Lusófona: ',
      diaspora: '🏘️ Comunidade Portuguesa: ',
      universal: '🇵🇹 LusoTown: '
    };

    if (culturalContext && contextPrefixes[culturalContext]) {
      return `${contextPrefixes[culturalContext]}${title}`;
    }

    return `🇵🇹 LusoTown: ${title}`;
  }

  /**
   * Enhance video descriptions with cultural tags and community information
   */
  private enhanceDescriptionWithCulturalTags(description: string, options: UploadOptions): string {
    let enhanced = description;

    // Add cultural context
    enhanced += '\n\n🏘️ Sobre a LusoTown:\n';
    enhanced += 'A maior comunidade de portugueses em Londres, conectando pessoas através de eventos culturais, networking e experiências autênticas.\n\n';

    // Add relevant cultural hashtags
    const culturalHashtags = [
      '#LusoTown', '#PortugueseLondon', '#ComunidadePortuguesa', '#PortugueseCulture',
      '#LusitanianLondon', '#PortugueseEvents', '#CulturaPortuguesa', '#LondonPortuguese'
    ];

    if (options.culturalContext) {
      const contextHashtags = {
        portugal: ['#Portugal', '#Fado', '#TraditionPortuguesa', '#PatrimónioPortuguês'],
        brazil: ['#Brasil', '#CulturaBrasileira', '#ComunidadeBrasileira', '#BrasilLondres'],
        africa: ['#ÁfricaLusófona', '#PALOP', '#CulturaAfricana', '#LusófonosÁfrica'],
        diaspora: ['#Emigração', '#DiásporaPortuguesa', '#Saudade', '#PortugueseHeritage'],
        universal: ['#Lusófono', '#LínguePortuguesa', '#ComunidadeLusófona']
      };
      
      culturalHashtags.push(...contextHashtags[options.culturalContext]);
    }

    enhanced += `\n\n${culturalHashtags.join(' ')}\n\n`;

    // Add community links
    enhanced += '🔗 Links úteis:\n';
  const site = (process.env.NEXT_PUBLIC_SITE_URL || '').trim() || SITE_URL;
  enhanced += `• Website: ${site}\n`;
  enhanced += `• Eventos: ${site}${ROUTES.events}\n`;
  enhanced += `• Comunidade: ${site}${ROUTES.myNetwork}\n`;
    enhanced += '• Instagram: @LusoTownLondon\n';

    return enhanced;
  }

  /**
   * Enhance tags with Portuguese cultural keywords
   */
  private enhanceTagsWithPortugueseKeywords(
    tags: string[],
    culturalContext?: 'portugal' | 'brazil' | 'africa' | 'diaspora' | 'universal'
  ): string[] {
    const basePortugueseTags = [
      'LusoTown', 'Portuguese Community', 'London Portuguese', 'Comunidade Portuguesa',
      'Portuguese Culture', 'Lusitanian', 'Portuguese Events', 'Cultural Heritage'
    ];

    const contextualTags = {
      portugal: ['Portugal', 'Fado', 'Portuguese Traditions', 'Cultural Heritage', 'Azulejos'],
      brazil: ['Brazil', 'Brazilian Culture', 'Brazilian Community', 'Samba', 'Capoeira'],
      africa: ['Lusophone Africa', 'PALOP', 'African Culture', 'Portuguese Speaking Africa'],
      diaspora: ['Portuguese Diaspora', 'Immigration', 'Saudade', 'Heritage Preservation'],
      universal: ['Lusophone', 'Portuguese Language', 'Portuguese Speaking Community']
    };

    let enhancedTags = [...tags, ...basePortugueseTags];

    if (culturalContext && contextualTags[culturalContext]) {
      enhancedTags.push(...contextualTags[culturalContext]);
    }

    // Remove duplicates and limit to YouTube's 500 character limit for tags
    return Array.from(new Set(enhancedTags)).slice(0, 15);
  }

  /**
   * Get geographic analytics with focus on Portuguese-speaking regions
   */
  private async getGeographicAnalytics(videoId: string, startDate: string, endDate: string): Promise<Record<string, number>> {
    try {
      const response = await fetch(
        `${EXTERNAL_SERVICES.youtubeAnalytics}/reports?ids=channel==${this.channelId}&startDate=${startDate}&endDate=${endDate}&metrics=views&dimensions=country&filters=video==${videoId}&key=${this.apiKey}`,
        {
          headers: {
            'Authorization': `Bearer ${await this.getAccessToken()}`
          }
        }
      );

      const data = await response.json();
      const geoDistribution: Record<string, number> = {};

      if (data.rows) {
        data.rows.forEach(([country, views]: [string, number]) => {
          geoDistribution[country] = views;
        });
      }

      return geoDistribution;
    } catch (error) {
      console.error('Error fetching geographic analytics:', error);
      return {};
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private async getAccessToken(): Promise<string> {
    // This would typically integrate with your OAuth2 implementation
    // For now, return a placeholder - in production, implement proper OAuth2 flow
    return process.env.YOUTUBE_ACCESS_TOKEN || '';
  }

  private async getPortugueseCulturalPlaylistId(culturalContext?: string): Promise<string | null> {
    // This would fetch the appropriate playlist ID from your database
    // based on the cultural context
    return null;
  }

  private async addVideoToPlaylist(playlistId: string, videoId: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/playlistItems?part=snippet&key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          snippet: {
            playlistId,
            resourceId: {
              kind: 'youtube#video',
              videoId
            }
          }
        })
      });
    } catch (error) {
      console.error('Error adding video to playlist:', error);
    }
  }

  private async uploadThumbnail(videoId: string, thumbnailBlob: Blob): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('thumbnail', thumbnailBlob);

      await fetch(`${this.baseUrl}/thumbnails/set?videoId=${videoId}&key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`
        },
        body: formData
      });
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
    }
  }

  private mapYouTubeVideoResponse(data: any): YouTubeVideo {
    return {
      id: data.id,
      title: data.snippet.title,
      description: data.snippet.description,
      thumbnailUrl: data.snippet.thumbnails.high?.url || data.snippet.thumbnails.default.url,
      duration: '0', // Would need to fetch from video details
      viewCount: 0, // Would need to fetch from video statistics
      likeCount: 0,
      publishedAt: data.snippet.publishedAt,
      channelId: data.snippet.channelId,
      tags: data.snippet.tags || [],
      categoryId: data.snippet.categoryId,
      language: data.snippet.defaultLanguage || 'pt',
      portugueseFocus: true
    };
  }

  private mapYouTubeLiveStreamResponse(data: any): YouTubeLiveStream {
    return {
      id: data.id,
      title: data.snippet.title,
      description: data.snippet.description,
      scheduledStartTime: data.snippet.scheduledStartTime,
      broadcastStatus: data.status.lifeCycleStatus,
      thumbnailUrl: data.snippet.thumbnails.high?.url || data.snippet.thumbnails.default.url
    };
  }

  private mapSearchResultToVideo(item: any): YouTubeVideo {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: '0',
      viewCount: 0,
      likeCount: 0,
      publishedAt: item.snippet.publishedAt,
      channelId: item.snippet.channelId,
      tags: [],
      categoryId: '0',
      language: 'pt',
      portugueseFocus: true
    };
  }

  private mapAnalyticsResponse(data: any, geoData: Record<string, number>): YouTubeAnalytics {
    const row = data.rows?.[0] || [];
    
    return {
      views: row[0] || 0,
      estimatedMinutesWatched: row[1] || 0,
      averageViewDuration: row[2] || 0,
      subscribersGained: row[3] || 0,
      likes: row[4] || 0,
      dislikes: row[5] || 0,
      comments: row[6] || 0,
      shares: row[7] || 0,
      impressions: row[8] || 0,
      clickThroughRate: row[9] || 0,
      geographicDistribution: geoData,
      ageGroupDistribution: {},
      genderDistribution: {}
    };
  }
}

const youTubeService = new YouTubeAPIService();
export default youTubeService;