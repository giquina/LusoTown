/**
 * Dynamic Sitemap Generation for Portuguese-speaking Community Platform
 * Generates comprehensive XML sitemap with events, businesses, and community pages
 */

import { NextResponse } from 'next/server';
import { SITE_URL } from '@/config/site';
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations';
import { PORTUGUESE_BUSINESS_CATEGORIES } from '@/config/business-categories';

// Static pages for Portuguese community platform
const STATIC_PAGES = [
  {
    url: '',
    priority: 1.0,
    changefreq: 'daily'
  },
  {
    url: '/events',
    priority: 0.9,
    changefreq: 'daily'
  },
  {
    url: '/business',
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    url: '/community',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    url: '/students',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    url: '/transport',
    priority: 0.7,
    changefreq: 'weekly'
  },
  {
    url: '/about',
    priority: 0.6,
    changefreq: 'monthly'
  },
  {
    url: '/contact',
    priority: 0.6,
    changefreq: 'monthly'
  },
  {
    url: '/privacy',
    priority: 0.5,
    changefreq: 'yearly'
  },
  {
    url: '/terms',
    priority: 0.5,
    changefreq: 'yearly'
  }
];

// Portuguese language variants
const LANGUAGE_VARIANTS = ['', '/pt', '/pt-br'];

function generateSitemapXML() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Static pages with language variants
  STATIC_PAGES.forEach(page => {
    LANGUAGE_VARIANTS.forEach(lang => {
      const url = `${SITE_URL}${lang}${page.url}`;
      
      sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
      
      // Add hreflang alternates
      LANGUAGE_VARIANTS.forEach(altLang => {
        const hreflang = altLang === '' ? 'en-GB' : altLang === '/pt' ? 'pt-PT' : 'pt-BR';
        const altUrl = `${SITE_URL}${altLang}${page.url}`;
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${altUrl}"/>`;
      });
      
      sitemap += `
  </url>`;
    });
  });

  // Portuguese cultural events
  LUSOPHONE_CELEBRATIONS.slice(0, 20).forEach((event, index) => {
    const eventUrl = `${SITE_URL}/events/${event.name.en.toLowerCase().replace(/\s+/g, '-')}`;
    
    sitemap += `
  <url>
    <loc>${eventUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    
    // Portuguese language variants for events
    sitemap += `
  <url>
    <loc>${SITE_URL}/pt/eventos/${event.name.pt.toLowerCase().replace(/\s+/g, '-')}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Portuguese business categories
  PORTUGUESE_BUSINESS_CATEGORIES.slice(0, 15).forEach(category => {
    const categoryUrl = `${SITE_URL}/business/${category.slug}`;
    
    sitemap += `
  <url>
    <loc>${categoryUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    
    // Portuguese business category variants
    sitemap += `
  <url>
    <loc>${SITE_URL}/pt/negocios/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Community areas
  const communityAreas = [
    'london',
    'manchester', 
    'birmingham',
    'bristol',
    'edinburgh',
    'cardiff',
    'glasgow',
    'leeds'
  ];

  communityAreas.forEach(area => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/community/${area}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  // University partnerships
  const universities = [
    'ucl',
    'kings-college',
    'imperial',
    'lse',
    'oxford',
    'cambridge',
    'manchester',
    'edinburgh'
  ];

  universities.forEach(uni => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/students/${uni}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

export async function GET() {
  try {
    const sitemap = generateSitemapXML();
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}