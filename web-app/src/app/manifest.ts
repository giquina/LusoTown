import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LusoTown London - Lusophone Social Calendar',
    short_name: 'LusoTown',
    description: 'Connect with Portuguese speakers in London. Book experiences, join activities, live life together with your lusophone community.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1E40AF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['social', 'lifestyle', 'travel', 'business'],
    lang: 'en-GB',
    orientation: 'portrait-primary',
    scope: '/',
  }
}