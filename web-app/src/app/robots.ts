import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/?lang=pt',
          '/events',
          '/events?lang=pt',
          '/business-directory',
          '/business-directory?lang=pt',
          '/business-networking',
          '/business-networking?lang=pt',
          '/community',
          '/directory',
          '/groups'
        ],
        disallow: ['/admin/', '/api/', '/profile/edit', '/dashboard/private']
      }
    ],
    sitemap: 'https://lusotown.com/sitemap.xml'
  }
}
