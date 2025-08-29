/**
 * Events Sitemap Generation for Portuguese-speaking Community Platform
 * Specialized sitemap for Portuguese cultural events and celebrations
 */

import { NextResponse } from 'next/server';
import { SITE_URL } from '@/config/site';
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations';

function generateEventsSitemapXML() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Portuguese cultural events
  LUSOPHONE_CELEBRATIONS.forEach((event, index) => {
    const eventSlug = event.name.en.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const eventUrl = `${SITE_URL}/events/${eventSlug}`;
    const eventDate = event.date || `${new Date().getFullYear()}-06-15`;
    
    // Main event page
    sitemap += `
  <url>
    <loc>${eventUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE_URL}/images/events/${eventSlug}.jpg</image:loc>
      <image:title>${event.name.en} | Portuguese Cultural Event</image:title>
      <image:caption>${event.description.en}</image:caption>
    </image:image>`;
    
    // Language alternates
    sitemap += `
    <xhtml:link rel="alternate" hreflang="en-GB" href="${eventUrl}"/>
    <xhtml:link rel="alternate" hreflang="pt-PT" href="${SITE_URL}/pt/eventos/${eventSlug}"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt-br/eventos/${eventSlug}"/>
  </url>`;
    
    // Portuguese language version
    sitemap += `
  <url>
    <loc>${SITE_URL}/pt/eventos/${eventSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE_URL}/images/events/${eventSlug}.jpg</image:loc>
      <image:title>${event.name.pt} | Evento Cultural Português</image:title>
      <image:caption>${event.description.pt}</image:caption>
    </image:image>
  </url>`;
  });

  // Event categories
  const eventCategories = [
    'cultural-festivals',
    'business-networking',
    'university-events',
    'community-gatherings',
    'food-wine-events',
    'music-dance',
    'sports-recreation',
    'religious-celebrations'
  ];

  eventCategories.forEach(category => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/events/category/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    
    // Portuguese version
    sitemap += `
  <url>
    <loc>${SITE_URL}/pt/eventos/categoria/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Regional event pages
  const regions = [
    'london',
    'manchester',
    'birmingham',
    'bristol',
    'edinburgh',
    'glasgow',
    'cardiff',
    'leeds',
    'liverpool',
    'nottingham'
  ];

  regions.forEach(region => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/events/region/${region}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

export async function GET() {
  try {
    const sitemap = generateEventsSitemapXML();
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=43200, s-maxage=43200', // 12 hours
      },
    });
  } catch (error) {
    console.error('Events sitemap generation error:', error);
    return new NextResponse('Error generating events sitemap', { status: 500 });
  }
}