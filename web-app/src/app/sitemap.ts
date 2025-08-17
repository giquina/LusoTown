import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lusotown.com'
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/business-directory`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/business-networking`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/community`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/feed`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/directory`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/groups`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]
}
