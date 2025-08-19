/**
 * Enhanced StreamPlayer with Ad Revenue Integration
 * LusoTown Portuguese Community Streaming Platform
 */

'use client'

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSubscription } from '@/context/SubscriptionContext';
import { Play, Pause, Volume2, VolumeX, Maximize, Eye, Clock } from 'lucide-react';
import Hls from 'hls.js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads';
import 'videojs-ima';

interface StreamPlayerProps {
  streamId?: string;
  hlsUrl?: string;
  youtubeVideoId?: string;
  isLive?: boolean;
  accessLevel?: 'public' | 'registered' | 'premium';
  title?: string;
  culturalContext?: 'portugal' | 'brazil' | 'diaspora' | 'uk_portuguese';
  onViewerJoin?: () => void;
  onViewerLeave?: () => void;
  enableAds?: boolean;
  adConfig?: {
    prerollEnabled?: boolean;
    midrollEnabled?: boolean;
    bannerEnabled?: boolean;
    adTagUrl?: string;
  };
}

// Ad serving service
class AdService {
  private baseUrl: string;
  private impressionId: string | null = null;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }

  async getAdConfig() {
    try {
      const response = await fetch(`${this.baseUrl}/api/ads/config`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching ad config:', error);
      return { success: false, networks: [] };
    }
  }

  async serveAd(position: string, streamId?: string, contentType: string = 'stream') {
    try {
      const response = await fetch(`${this.baseUrl}/api/ads/serve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position,
          contentType,
          streamId,
          contentId: streamId
        })
      });
      
      const result = await response.json();
      if (result.success && result.ad) {
        return result;
      }
      
      // Fallback to LusoTown promotional content
      return {
        success: true,
        ad: {
          type: 'lusotown_promo',
          title: 'Join the Portuguese Community',
          description: 'Discover events, connect with Portuguese speakers, and access premium services.',
          imageUrl: '/images/ads/lusotown-default.jpg',
          clickUrl: '/premium-membership',
          duration: 10
        },
        context: { culturalContext: 'uk_portuguese' }
      };
    } catch (error) {
      console.error('Error serving ad:', error);
      return null;
    }
  }

  async trackImpression(campaignId: string, networkId: string, position: string, streamId?: string, viewDuration: number = 0, wasCompleted: boolean = false) {
    try {
      const response = await fetch(`${this.baseUrl}/api/ads/impression`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          networkId,
          position,
          streamId,
          viewDuration,
          wasCompleted
        })
      });
      
      const result = await response.json();
      if (result.success) {
        this.impressionId = result.impressionId;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error tracking impression:', error);
      return null;
    }
  }

  async trackClick(campaignId: string, networkId: string, clickUrl: string) {
    try {
      if (!this.impressionId) return null;
      
      const response = await fetch(`${this.baseUrl}/api/ads/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          impressionId: this.impressionId,
          campaignId,
          networkId,
          clickUrl
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error tracking click:', error);
      return null;
    }
  }
}

export function StreamPlayer({ 
  streamId,
  hlsUrl, 
  youtubeVideoId,
  isLive = false, 
  accessLevel = 'public',
  title = '',
  culturalContext = 'uk_portuguese',
  onViewerJoin,
  onViewerLeave,
  enableAds = true,
  adConfig = {
    prerollEnabled: true,
    midrollEnabled: false,
    bannerEnabled: true
  }
}: StreamPlayerProps) {
  const { t } = useLanguage();
  const { hasAccess } = useSubscription();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);
  const adServiceRef = useRef<AdService>(new AdService());
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [showBannerAd, setShowBannerAd] = useState(false);
  const [bannerAdData, setBannerAdData] = useState<any>(null);
  const [adConfig_] = useState(() => adConfig);

  // Access control check
  const hasStreamAccess = accessLevel === 'public' || hasAccess(accessLevel);

  useEffect(() => {
    let watchTimeInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      watchTimeInterval = setInterval(() => {
        setWatchTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (watchTimeInterval) {
        clearInterval(watchTimeInterval);
      }
    };
  }, [isPlaying]);

  // Initialize Video.js player with ad support
  useEffect(() => {
    if (!videoRef.current || !hasStreamAccess) return;

    const initializePlayer = async () => {
      try {
        // Initialize Video.js
        const player = videojs(videoRef.current!, {
          controls: true,
          responsive: true,
          fluid: true,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          html5: {
            vhs: {
              overrideNative: !videojs.browser.IS_SAFARI
            }
          },
          plugins: {
            // Initialize ad plugin if ads are enabled
            ...(enableAds && {
              ads: {
                debug: process.env.NODE_ENV === 'development'
              }
            })
          }
        });

        playerRef.current = player;

        // Setup ad integration if enabled
        if (enableAds) {
          await setupAdIntegration(player);
        }

        // Set video source
        if (youtubeVideoId) {
          // YouTube integration
          player.src({
            src: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
            type: 'video/youtube'
          });
        } else if (hlsUrl) {
          // HLS streaming
          player.src({
            src: hlsUrl,
            type: 'application/x-mpegURL'
          });
        }

        // Player event handlers
        player.on('play', () => {
          setIsPlaying(true);
          onViewerJoin?.();
        });

        player.on('pause', () => {
          setIsPlaying(false);
        });

        player.on('ended', () => {
          setIsPlaying(false);
          onViewerLeave?.();
        });

        player.on('volumechange', () => {
          setIsMuted(player.muted());
        });

        player.on('fullscreenchange', () => {
          setIsFullscreen(player.isFullscreen());
        });

        return () => {
          if (player && !player.isDisposed()) {
            player.dispose();
          }
        };
      } catch (error) {
        console.error('Error initializing player:', error);
      }
    };

    initializePlayer();
  }, [hasStreamAccess, hlsUrl, youtubeVideoId, enableAds]);

  // Setup ad integration
  const setupAdIntegration = async (player: any) => {
    try {
      const adService = adServiceRef.current;
      
      // Get ad configuration
      const adConfigResponse = await adService.getAdConfig();
      if (!adConfigResponse.success) {
        console.warn('Ad configuration not available');
        return;
      }

      // Setup preroll ads if enabled
      if (adConfig_.prerollEnabled) {
        player.on('readyforpreroll', async () => {
          const adResponse = await adService.serveAd('preroll', streamId);
          if (adResponse && adResponse.ad) {
            await playPrerollAd(player, adResponse);
          } else {
            player.trigger('nopreroll');
          }
        });
      }

      // Setup banner ads if enabled
      if (adConfig_.bannerEnabled) {
        setupBannerAds();
      }

      // Setup midroll ads for long content (disabled by default for live streams)
      if (adConfig_.midrollEnabled && !isLive) {
        setupMidrollAds(player);
      }

    } catch (error) {
      console.error('Error setting up ads:', error);
    }
  };

  // Play preroll ad
  const playPrerollAd = async (player: any, adResponse: any) => {
    const { ad, campaign } = adResponse;
    
    try {
      if (ad.type === 'lusotown_promo') {
        // Custom LusoTown promotional ad
        await playLusoTownPromo(player, ad, campaign);
      } else {
        // Third-party ad network
        await playThirdPartyAd(player, ad, campaign);
      }
    } catch (error) {
      console.error('Error playing preroll ad:', error);
      player.trigger('nopreroll');
    }
  };

  // Play LusoTown promotional ad
  const playLusoTownPromo = async (player: any, ad: any, campaign: any) => {
    return new Promise<void>((resolve) => {
      // Create overlay element
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
      overlay.innerHTML = `
        <div class="text-center text-white p-8 max-w-md">
          <div class="mb-4">
            <img src="${ad.imageUrl}" alt="${ad.title}" class="w-32 h-32 mx-auto rounded-xl object-cover" />
          </div>
          <h3 class="text-xl font-bold mb-2">${ad.title}</h3>
          <p class="text-gray-300 mb-4">${ad.description}</p>
          <div class="space-y-2">
            <button onclick="window.location.href='${ad.clickUrl}'" class="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
              ${t({ pt: 'Saber Mais', en: 'Learn More' })}
            </button>
            <button id="skip-ad" class="w-full text-gray-400 hover:text-white text-sm">
              ${t({ pt: 'Pular anúncio em', en: 'Skip ad in' })} <span id="countdown">${ad.duration}</span>s
            </button>
          </div>
        </div>
      `;

      // Add overlay to player
      const playerEl = player.el();
      playerEl.appendChild(overlay);

      // Countdown timer
      let countdown = ad.duration;
      const countdownEl = overlay.querySelector('#countdown');
      const skipBtn = overlay.querySelector('#skip-ad') as HTMLButtonElement;
      
      const timer = setInterval(() => {
        countdown--;
        if (countdownEl) countdownEl.textContent = countdown.toString();
        
        if (countdown <= 0) {
          clearInterval(timer);
          skipBtn.disabled = false;
          skipBtn.onclick = () => {
            playerEl.removeChild(overlay);
            resolve();
          };
          skipBtn.textContent = t({ pt: 'Pular Anúncio', en: 'Skip Ad' });
        }
      }, 1000);

      // Track impression
      if (campaign) {
        adServiceRef.current.trackImpression(
          campaign.id, 
          campaign.networkId || 'lusotown_promo', 
          'preroll', 
          streamId, 
          ad.duration,
          true
        );
      }

      // Auto-skip after duration
      setTimeout(() => {
        if (overlay.parentNode) {
          playerEl.removeChild(overlay);
          resolve();
        }
      }, ad.duration * 1000);
    });
  };

  // Play third-party ad
  const playThirdPartyAd = async (player: any, ad: any, campaign: any) => {
    // For third-party ads, we would integrate with their SDKs
    // For now, show placeholder
    return playLusoTownPromo(player, {
      title: 'Advertisement',
      description: 'Supporting Portuguese community content',
      imageUrl: '/images/ads/generic-ad.jpg',
      clickUrl: '#',
      duration: 15
    }, campaign);
  };

  // Setup banner ads
  const setupBannerAds = async () => {
    try {
      const adResponse = await adServiceRef.current.serveAd('banner_overlay', streamId);
      if (adResponse && adResponse.ad) {
        setBannerAdData(adResponse.ad);
        setShowBannerAd(true);
        
        // Auto-hide banner after 10 seconds
        setTimeout(() => {
          setShowBannerAd(false);
        }, 10000);
      }
    } catch (error) {
      console.error('Error setting up banner ads:', error);
    }
  };

  // Setup midroll ads
  const setupMidrollAds = (player: any) => {
    // Schedule midroll ads at 25%, 50%, 75% of content
    const schedulePoints = [0.25, 0.5, 0.75];
    
    player.on('timeupdate', () => {
      const currentTime = player.currentTime();
      const duration = player.duration();
      
      if (duration && currentTime && duration > 300) { // Only for content > 5 mins
        const progress = currentTime / duration;
        
        schedulePoints.forEach(point => {
          if (Math.abs(progress - point) < 0.01) {
            // Trigger midroll ad
            player.trigger('contentupdate');
          }
        });
      }
    });
  };

  // Handle banner ad click
  const handleBannerAdClick = async () => {
    if (bannerAdData && bannerAdData.clickUrl) {
      await adServiceRef.current.trackClick('banner_campaign', 'lusotown_promo', bannerAdData.clickUrl);
      window.open(bannerAdData.clickUrl, '_blank');
    }
  };

  if (!hasStreamAccess) {
    return (
      <div className="relative w-full bg-black rounded-xl overflow-hidden">
        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary-900 to-secondary-900 text-white">
          <div className="text-center p-8">
            <h3 className="text-xl font-bold mb-4">
              {t({ pt: 'Acesso Premium Necessário', en: 'Premium Access Required' })}
            </h3>
            <p className="text-gray-300 mb-6">
              {t({ 
                pt: 'Este conteúdo está disponível para membros da comunidade portuguesa.', 
                en: 'This content is available to Portuguese community members.' 
              })}
            </p>
            <button className="bg-action-500 hover:bg-action-600 text-white px-6 py-3 rounded-lg transition-colors">
              {t({ pt: 'Obter Acesso', en: 'Get Access' })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden">
      {/* Video Player */}
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full aspect-video"
          controls
          preload="auto"
          data-setup="{}"
          playsInline
        />
      </div>

      {/* Live Badge */}
      {isLive && (
        <div className="absolute top-4 left-4 bg-action-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 animate-pulse z-10">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          {t({ pt: 'AO VIVO', en: 'LIVE' })}
        </div>
      )}

      {/* Banner Ad Overlay */}
      {showBannerAd && bannerAdData && (
        <div 
          className="absolute bottom-20 left-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg cursor-pointer z-20 transition-opacity hover:bg-opacity-100"
          onClick={handleBannerAdClick}
        >
          <div className="flex items-center space-x-3">
            {bannerAdData.imageUrl && (
              <img 
                src={bannerAdData.imageUrl} 
                alt={bannerAdData.title}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{bannerAdData.title}</h4>
              <p className="text-xs text-gray-300 truncate">{bannerAdData.description}</p>
            </div>
            <button 
              className="text-gray-400 hover:text-white text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setShowBannerAd(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Stream Info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm z-10">
        <div className="flex items-center space-x-4">
          {viewerCount > 0 && (
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{viewerCount.toLocaleString()}</span>
            </div>
          )}
          {watchTime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, '0')}</span>
            </div>
          )}
        </div>
        
        {title && (
          <div className="text-right">
            <h3 className="font-semibold truncate max-w-xs">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}