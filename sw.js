// Service Worker for aggressive caching and performance
const CACHE_VERSION = 'v2';
const CACHE_NAME = `portfolio-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_VERSION}`;
const PAGE_CACHE = `pages-${CACHE_VERSION}`;

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about/',
  '/portfolio/',
  '/services/',
  '/contact/',
  '/blog/',
  '/images/logo jsoe (1).svg',
  '/images/profile-jose.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, PAGE_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated with version:', CACHE_VERSION);
      return self.clients.claim();
    })
  );
});

// Retry fetch with exponential backoff
async function fetchWithRetry(request, retries = MAX_RETRIES) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      return response;
    }
    throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (MAX_RETRIES - retries + 1)));
      return fetchWithRetry(request, retries - 1);
    }
    throw error;
  }
}

// Network-first strategy for pages
async function networkFirstStrategy(request) {
  try {
    const response = await fetchWithRetry(request);
    
    // Cache successful page responses
    if (response.ok) {
      const cache = await caches.open(PAGE_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If it's a page navigation, try to return the home page
    if (request.destination === 'document') {
      const homeCache = await caches.match('/');
      if (homeCache) {
        return homeCache;
      }
    }
    
    throw error;
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetchWithRetry(request).then(response => {
      if (response.ok) {
        caches.open(STATIC_CACHE).then(cache => {
          cache.put(request, response);
        });
      }
    }).catch(() => {});
    
    return cachedResponse;
  }
  
  try {
    const response = await fetchWithRetry(request);
    
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    throw error;
  }
}

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (except CDN assets)
  if (url.origin !== location.origin && !url.hostname.includes('cdnjs.cloudflare.com')) {
    return;
  }

  // Determine strategy based on request type
  if (request.destination === 'document' || url.pathname.endsWith('/')) {
    // Network-first for pages
    event.respondWith(networkFirstStrategy(request));
  } else if (
    request.url.includes('/_next/static/') ||
    request.url.includes('/images/') ||
    request.url.includes('/videos/') ||
    request.url.includes('cdnjs.cloudflare.com') ||
    request.url.includes('.css') ||
    request.url.includes('.js') ||
    request.url.includes('.woff') ||
    request.url.includes('.svg') ||
    request.url.includes('.png') ||
    request.url.includes('.jpg')
  ) {
    // Cache-first for static assets
    event.respondWith(cacheFirstStrategy(request));
  } else {
    // Default: network with cache fallback
    event.respondWith(
      fetchWithRetry(request).catch(() => {
        return caches.match(request);
      })
    );
  }
});

// Background sync for analytics (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Sync any pending analytics data when back online
  try {
    const cache = await caches.open('analytics-queue');
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        await fetch(request);
        await cache.delete(request);
      } catch (error) {
        console.log('Failed to sync analytics:', error);
      }
    }
  } catch (error) {
    console.log('Analytics sync error:', error);
  }
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/images/logo_v2.svg',
        badge: '/images/logo_v2.svg',
        tag: 'portfolio-notification',
      })
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});