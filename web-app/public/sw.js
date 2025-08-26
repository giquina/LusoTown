// Service Worker for LusoTown Portuguese-speaking community Platform
// Version: 3.0.0 - Enhanced Mobile PWA with Portuguese Cultural Features

const CACHE_VERSION = '3.0.1';
const CACHE_NAME = `lusotown-v${CACHE_VERSION}-portuguese-community`;
const OFFLINE_URL = '/offline.html';
const PORTUGUESE_CULTURAL_CACHE = `portuguese-cultural-v${CACHE_VERSION}`;
const API_CACHE = `api-cache-v${CACHE_VERSION}`;
const IMAGES_CACHE = `images-v${CACHE_VERSION}`;
const STATIC_CACHE = `static-v${CACHE_VERSION}`;

// Portuguese cultural priorities
const CULTURAL_PRIORITY_ROUTES = [
  '/events',
  '/community', 
  '/business-directory',
  '/cultural-calendar',
  '/portuguese-heritage'
];

// Mobile-first optimization settings
const MOBILE_OPTIMIZATION = {
  maxImageSize: 500 * 1024, // 500KB for mobile
  maxApiCacheTime: 5 * 60 * 1000, // 5 minutes
  backgroundSyncInterval: 30 * 1000, // 30 seconds
  offlineQueueLimit: 50,
  compressionEnabled: true
};

// Portuguese cultural assets that should be cached
const PORTUGUESE_ASSETS = [
  '/',
  '/offline',
  '/events',
  '/my-network',
  '/business-directory',
  '/live',
  '/transport',
  '/matches',
  '/students',
  '/premium-membership',
  // Portuguese cultural images
  '/images/portuguese-flag.svg',
  '/images/fado-guitar.svg',
  '/images/azulejos-pattern.svg',
  '/images/pasteis-de-nata.jpg',
  '/images/christ-the-king.jpg',
  '/images/ponte-25-abril.jpg',
  // Cultural event assets
  '/events/fado-night.jpg',
  '/events/festa-junina.jpg',
  '/events/santo-antonio.jpg',
  '/events/festa-do-avante.jpg',
  // Business directory assets
  '/icons/restaurant.svg',
  '/icons/business.svg',
  '/icons/services.svg',
  '/icons/culture.svg',
  // Fonts and styles
  '/fonts/poppins-regular.woff2',
  '/fonts/poppins-semibold.woff2',
  '/fonts/inter-regular.woff2'
];

// Portuguese cultural event categories for priority caching
const PORTUGUESE_EVENT_CATEGORIES = [
  'fado-nights',
  'festa-junina',
  'santo-antonio',
  'festa-do-avante',
  'portuguese-wine-tasting',
  'azulejos-workshop',
  'portuguese-cooking-class',
  'lusophone-networking',
  'brazilian-capoeira',
  'cape-verdean-music',
  'angolan-culture',
  'mozambican-heritage'
];

// Install event - Cache Portuguese cultural assets
self.addEventListener('install', event => {
  console.log('[SW] Installing LusoTown Portuguese-speaking community Service Worker');
  
  event.waitUntil(
    (async () => {
      try {
        // Cache core Portuguese cultural assets
        const cache = await caches.open(CACHE_NAME);
        console.log('[SW] Caching Portuguese cultural assets...');
        await cache.addAll(PORTUGUESE_ASSETS);
        
        // Cache Portuguese cultural event categories
        const culturalCache = await caches.open(PORTUGUESE_CULTURAL_CACHE);
        const culturalRequests = PORTUGUESE_EVENT_CATEGORIES.map(category => 
          new Request(`/api/events?category=${category}&lang=pt`)
        );
        
        // Pre-cache popular Portuguese cultural content
        await Promise.allSettled(
          culturalRequests.map(async request => {
            try {
              const response = await fetch(request);
              if (response.ok) {
                await culturalCache.put(request, response);
              }
            } catch (error) {
              console.log(`[SW] Failed to cache Portuguese cultural content: ${request.url}`, error);
            }
          })
        );
        
        console.log('[SW] Portuguese cultural assets cached successfully');
      } catch (error) {
        console.error('[SW] Failed to cache Portuguese cultural assets:', error);
      }
    })()
  );
  
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating LusoTown Portuguese-speaking community Service Worker');
  
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name !== CACHE_NAME && 
        name !== PORTUGUESE_CULTURAL_CACHE && 
        name !== API_CACHE
      );
      
      await Promise.all(
        oldCaches.map(name => {
          console.log(`[SW] Deleting old cache: ${name}`);
          return caches.delete(name);
        })
      );
    })()
  );
  
  self.clients.claim();
});

// Fetch event - Portuguese cultural caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external domains (except Portuguese cultural CDNs)
  if (url.origin !== location.origin && !isPortugueseCulturalCDN(url.origin)) {
    return;
  }
  
  event.respondWith(handleFetchRequest(request));
});

// Handle different types of requests with Portuguese cultural priority
async function handleFetchRequest(request) {
  const url = new URL(request.url);
  
  try {
    // API requests - Network first with cache fallback
    if (url.pathname.startsWith('/api/')) {
      return await handleApiRequest(request);
    }
    
    // Portuguese cultural content - Cache first
    if (isPortugueseCulturalContent(url.pathname)) {
      return await handlePortugueseCulturalRequest(request);
    }
    
    // Navigation requests - Network first with offline fallback
    if (request.mode === 'navigate') {
      return await handleNavigationRequest(request);
    }
    
    // Static assets - Cache first
    if (isStaticAsset(url.pathname)) {
      return await handleStaticAssetRequest(request);
    }
    
    // Default: Network first
    return await handleNetworkFirstRequest(request);
    
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    return await handleOfflineRequest(request);
  }
}

// Portuguese cultural content handler
async function handlePortugueseCulturalRequest(request) {
  const culturalCache = await caches.open(PORTUGUESE_CULTURAL_CACHE);
  const cachedResponse = await culturalCache.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Serving Portuguese cultural content from cache:', request.url);
    
    // Update cache in background
    fetch(request).then(response => {
      if (response.ok) {
        culturalCache.put(request, response.clone());
      }
    }).catch(() => {
      // Ignore background update failures
    });
    
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      await culturalCache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return createPortugueseOfflineResponse();
  }
}

// API request handler with Portuguese context
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache Portuguese-speaking community data
      if (isPortugueseApiEndpoint(url.pathname)) {
        const apiCache = await caches.open(API_CACHE);
        await apiCache.put(request, response.clone());
      }
    }
    
    return response;
  } catch (error) {
    // Try to serve from cache for Portuguese-speaking community endpoints
    if (isPortugueseApiEndpoint(url.pathname)) {
      const apiCache = await caches.open(API_CACHE);
      const cachedResponse = await apiCache.match(request);
      
      if (cachedResponse) {
        console.log('[SW] Serving Portuguese API data from cache:', request.url);
        return cachedResponse;
      }
    }
    
    throw error;
  }
}

// Navigation request handler
async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const offlineResponse = await cache.match(OFFLINE_URL);
    
    if (offlineResponse) {
      return offlineResponse;
    }
    
    return createPortugueseOfflineResponse();
  }
}

// Static asset handler
async function handleStaticAssetRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

// Network first handler
async function handleNetworkFirstRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Offline request handler
async function handleOfflineRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  return createPortugueseOfflineResponse();
}

// Utility functions
function isPortugueseCulturalContent(pathname) {
  const culturalPaths = [
    '/events/fado',
    '/events/festa',
    '/events/santo',
    '/events/portuguese',
    '/events/brazilian',
    '/events/angolan',
    '/events/cape-verdean',
    '/events/mozambican',
    '/business-directory/portuguese',
    '/business-directory/restaurants',
    '/cultural-calendar',
    '/portuguese-heritage'
  ];
  
  return culturalPaths.some(path => pathname.startsWith(path));
}

function isPortugueseApiEndpoint(pathname) {
  const apiEndpoints = [
    '/api/events',
    '/api/businesses',
    '/api/community',
    '/api/matches',
    '/api/cultural-content',
    '/api/portuguese-speakers'
  ];
  
  return apiEndpoints.some(endpoint => pathname.startsWith(endpoint));
}

function isPortugueseCulturalCDN(origin) {
  const culturalCDNs = [
    'portuguese-content.lusotown.com',
    'lusotown-portuguese-content.b-cdn.net',
    'lusotown-portuguese-streams.b-cdn.net',
    'res.cloudinary.com'
  ];
  
  return culturalCDNs.some(cdn => origin.includes(cdn));
}

function isStaticAsset(pathname) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2'];
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

function createPortugueseOfflineResponse() {
  const offlineHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>LusoTown - Offline | Comunidade de Falantes de Português</title>
        <style>
          body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #DC2626, #B91C1C);
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .container {
            max-width: 400px;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            backdrop-filter: blur(10px);
          }
          .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          h1 { margin-bottom: 0.5rem; font-size: 1.5rem; }
          p { opacity: 0.9; line-height: 1.6; margin-bottom: 2rem; }
          .portuguese { font-style: italic; opacity: 0.8; margin-top: 1rem; }
          .retry-btn {
            background: white;
            color: #DC2626;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .retry-btn:hover {
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">🇵🇹</div>
          <h1>You're Offline</h1>
          <p>Can't connect to the Portuguese-speaking community right now. Check your internet connection and try again.</p>
          <p class="portuguese">Não consegues conectar à comunidade de falantes de português. Verifica a tua ligação à internet.</p>
          <button class="retry-btn" onclick="window.location.reload()">
            Try Again | Tentar Novamente
          </button>
        </div>
      </body>
    </html>
  `;
  
  return new Response(offlineHtml, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}

// Enhanced push notification handler for Portuguese cultural events
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  if (!event.data) {
    console.log('[SW] No notification data received');
    return;
  }
  
  try {
    const data = event.data.json();
    console.log('[SW] Notification data:', data);
    
    // Check if notifications should be shown during quiet hours
    if (isQuietHours() && data.priority !== 'urgent') {
      console.log('[SW] Quiet hours - scheduling notification for later');
      scheduleNotificationForLater(data);
      return;
    }
    
    // Check daily notification limits
    if (exceedsNotificationLimits(data.type)) {
      console.log('[SW] Notification limit exceeded for type:', data.type);
      return;
    }
    
    const options = createPortugueseNotificationOptions(data);
    
    // Store notification for analytics
    storeNotificationEvent(data);
    
    event.waitUntil(
      Promise.all([
        self.registration.showNotification(data.title || 'LusoTown', options),
        updateNotificationHistory(data)
      ])
    );
  } catch (error) {
    console.error('[SW] Error handling push notification:', error);
    
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification('LusoTown', {
        body: 'Nova atualização da comunidade portuguesa / New Portuguese community update',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png'
      })
    );
  }
});

// Enhanced notification click handler with actions
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked', event.action);
  
  event.notification.close();
  
  const notificationData = event.notification.data || {};
  let urlToOpen = '/';
  
  // Handle different notification actions
  switch (event.action) {
    case 'view-event':
      urlToOpen = notificationData.eventUrl || '/events';
      break;
    case 'share-event':
      // Share via Web Share API or fallback to social sharing
      handleEventShare(notificationData);
      return;
    case 'view-match':
      urlToOpen = notificationData.matchUrl || '/matches';
      break;
    case 'send-message':
      urlToOpen = notificationData.messageUrl || '/messages';
      break;
    case 'rsvp-yes':
      // Handle RSVP in background
      handleEventRSVP(notificationData, 'yes');
      urlToOpen = notificationData.eventUrl || '/events';
      break;
    case 'get-directions':
      urlToOpen = notificationData.directionsUrl || 
                 `https://maps.google.com/?q=${encodeURIComponent(notificationData.location || 'London')}`;
      break;
    default:
      // Default click - use notification's URL or home
      urlToOpen = notificationData.url || '/';
  }
  
  // Track notification interaction
  trackNotificationInteraction(event.notification.tag, event.action);
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Check if LusoTown is already open
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

function createPortugueseNotificationOptions(data) {
  const userLanguage = data.language || 'en';
  
  const defaultOptions = {
    body: data.body,
    icon: data.icon || '/icons/icon-192x192.png',
    badge: data.badge || '/icons/badge-72x72.png',
    tag: data.tag || `lusotown-${data.type || 'general'}`,
    requireInteraction: data.requireInteraction || false,
    timestamp: Date.now(),
    renotify: true,
    silent: data.silent || false,
    vibrate: data.vibrate || getVibratePattern(data.culturalContext?.region),
    data: {
      url: data.url || '/',
      eventUrl: data.eventUrl,
      matchUrl: data.matchUrl,
      messageUrl: data.messageUrl,
      directionsUrl: data.directionsUrl,
      location: data.location,
      type: data.type,
      priority: data.priority || 'normal'
    },
    actions: []
  };

  // Add image for rich notifications
  if (data.image) {
    defaultOptions.image = data.image;
  }

  // Add Portuguese cultural context actions based on notification type
  switch (data.type) {
    case 'cultural-event':
    case 'festa':
    case 'fado-night':
      defaultOptions.actions = [
        {
          action: 'view-event',
          title: userLanguage === 'pt' ? 'Ver Evento' : 'View Event',
          icon: '/icons/calendar-action.png'
        },
        {
          action: 'rsvp-yes',
          title: userLanguage === 'pt' ? 'Vou!' : 'I\'m Going!',
          icon: '/icons/check-action.png'
        }
      ];
      break;

    case 'community-match':
      defaultOptions.actions = [
        {
          action: 'view-match',
          title: userLanguage === 'pt' ? 'Ver Perfil' : 'View Profile',
          icon: '/icons/user-action.png'
        },
        {
          action: 'send-message',
          title: userLanguage === 'pt' ? 'Enviar Mensagem' : 'Send Message',
          icon: '/icons/message-action.png'
        }
      ];
      break;

    case 'business-update':
    case 'restaurant-special':
      defaultOptions.actions = [
        {
          action: 'view-business',
          title: userLanguage === 'pt' ? 'Ver Oferta' : 'View Deal',
          icon: '/icons/business-action.png'
        },
        {
          action: 'get-directions',
          title: userLanguage === 'pt' ? 'Como Chegar' : 'Get Directions',
          icon: '/icons/navigation-action.png'
        }
      ];
      break;

    case 'heritage-reminder':
      defaultOptions.actions = [
        {
          action: 'view-celebration',
          title: userLanguage === 'pt' ? 'Ver Celebração' : 'View Celebration',
          icon: '/icons/flag-action.png'
        }
      ];
      break;

    default:
      defaultOptions.actions = [
        {
          action: 'view-content',
          title: userLanguage === 'pt' ? 'Ver Mais' : 'View More',
          icon: '/icons/view-action.png'
        }
      ];
  }

  return defaultOptions;
}

// Background sync for Portuguese-speaking community content
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'portuguese-community-sync') {
    event.waitUntil(syncPortugueseCommunityContent());
  } else if (event.tag === 'cultural-events-sync') {
    event.waitUntil(syncCulturalEvents());
  } else if (event.tag === 'business-directory-sync') {
    event.waitUntil(syncBusinessDirectory());
  }
});

async function syncPortugueseCommunityContent() {
  try {
    console.log('[SW] Syncing Portuguese-speaking community content...');
    
    const apiCache = await caches.open(API_CACHE);
    const culturalCache = await caches.open(PORTUGUESE_CULTURAL_CACHE);
    
    // Sync Portuguese cultural events
    const eventsResponse = await fetch('/api/events?lang=pt&featured=true');
    if (eventsResponse.ok) {
      await culturalCache.put('/api/events?lang=pt&featured=true', eventsResponse);
    }
    
    // Sync Portuguese businesses
    const businessResponse = await fetch('/api/businesses?lang=pt&featured=true');
    if (businessResponse.ok) {
      await apiCache.put('/api/businesses?lang=pt&featured=true', businessResponse);
    }
    
    console.log('[SW] Portuguese-speaking community content synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync Portuguese-speaking community content:', error);
  }
}

async function syncCulturalEvents() {
  try {
    console.log('[SW] Syncing Portuguese cultural events...');
    
    const culturalCache = await caches.open(PORTUGUESE_CULTURAL_CACHE);
    
    for (const category of PORTUGUESE_EVENT_CATEGORIES) {
      try {
        const response = await fetch(`/api/events?category=${category}&lang=pt&limit=10`);
        if (response.ok) {
          await culturalCache.put(`/api/events?category=${category}&lang=pt&limit=10`, response);
        }
      } catch (error) {
        console.log(`[SW] Failed to sync events for category ${category}:`, error);
      }
    }
    
    console.log('[SW] Portuguese cultural events synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync cultural events:', error);
  }
}

async function syncBusinessDirectory() {
  try {
    console.log('[SW] Syncing Portuguese business directory...');
    
    const apiCache = await caches.open(API_CACHE);
    
    const businessTypes = ['restaurants', 'services', 'retail', 'professional', 'cultural'];
    
    for (const type of businessTypes) {
      try {
        const response = await fetch(`/api/businesses?type=${type}&portuguese=true&limit=20`);
        if (response.ok) {
          await apiCache.put(`/api/businesses?type=${type}&portuguese=true&limit=20`, response);
        }
      } catch (error) {
        console.log(`[SW] Failed to sync businesses for type ${type}:`, error);
      }
    }
    
    console.log('[SW] Portuguese business directory synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync business directory:', error);
  }
}

console.log('[SW] LusoTown Portuguese-speaking community Service Worker loaded successfully');