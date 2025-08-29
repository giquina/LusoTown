/**
 * Business Sitemap Generation for Portuguese-speaking Community Platform
 * Specialized sitemap for Portuguese businesses and services
 */

import { NextResponse } from 'next/server';
import { SITE_URL } from '@/config/site';
import { PORTUGUESE_BUSINESS_CATEGORIES } from '@/config/business-categories';

function generateBusinessSitemapXML() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Portuguese business categories
  PORTUGUESE_BUSINESS_CATEGORIES.forEach(category => {
    const categoryUrl = `${SITE_URL}/business/${category.slug}`;
    
    sitemap += `
  <url>
    <loc>${categoryUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${category.isPopular ? 0.9 : 0.7}</priority>
    <image:image>
      <image:loc>${SITE_URL}/images/business/${category.slug}.jpg</image:loc>
      <image:title>${category.name.en} | Portuguese Businesses London</image:title>
      <image:caption>${category.description.en}</image:caption>
    </image:image>`;
    
    // Language alternates
    sitemap += `
    <xhtml:link rel="alternate" hreflang="en-GB" href="${categoryUrl}"/>
    <xhtml:link rel="alternate" hreflang="pt-PT" href="${SITE_URL}/pt/negocios/${category.slug}"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt-br/negocios/${category.slug}"/>
  </url>`;
    
    // Portuguese language version
    sitemap += `
  <url>
    <loc>${SITE_URL}/pt/negocios/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${category.isPopular ? 0.9 : 0.7}</priority>
    <image:image>
      <image:loc>${SITE_URL}/images/business/${category.slug}.jpg</image:loc>
      <image:title>${category.name.pt} | Negócios Portugueses Londres</image:title>
      <image:caption>${category.description.pt}</image:caption>
    </image:image>
  </url>`;
  });

  // Business location pages
  const businessLocations = [
    'vauxhall',
    'stockwell',
    'elephant-castle',
    'borough',
    'bermondsey',
    'camberwell',
    'brixton',
    'clapham',
    'battersea',
    'putney',
    'hammersmith',
    'shepherds-bush',
    'brent',
    'harrow',
    'hounslow',
    'croydon'
  ];

  businessLocations.forEach(location => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/business/location/${location}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    
    // Portuguese version
    sitemap += `
  <url>
    <loc>${SITE_URL}/pt/negocios/localidade/${location}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  // Special business features
  const businessFeatures = [
    'new-businesses',
    'featured-businesses',
    'portuguese-owned',
    'brazilian-owned',
    'palop-owned',
    'family-friendly',
    'delivers',
    'takeaway',
    'outdoor-seating',
    'live-music',
    'fado-nights',
    'portuguese-speaking-staff'
  ];

  businessFeatures.forEach(feature => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/business/features/${feature}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  });

  // Business search pages
  const searchTerms = [
    'restaurants',
    'cafes',
    'bakeries',
    'supermarkets',
    'travel-agencies',
    'money-transfer',
    'beauty-salons',
    'barber-shops',
    'legal-services',
    'accountants',
    'doctors',
    'dentists',
    'construction',
    'cleaning-services',
    'driving-instructors'
  ];

  searchTerms.forEach(term => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/business/search/${term}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

export async function GET() {
  try {
    const sitemap = generateBusinessSitemapXML();
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
      },
    });
  } catch (error) {
    console.error('Business sitemap generation error:', error);
    return new NextResponse('Error generating business sitemap', { status: 500 });
  }
}