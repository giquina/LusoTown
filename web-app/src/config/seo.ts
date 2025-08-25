/**
 * SEO and metadata configuration
 * Centralizes all hardcoded SEO, JSON-LD, and metadata values
 */

import { brand } from "./brand";
import { contact, socialMedia, officeLocations } from "./contact";

// SEO Configuration
export const seo = {
  // Primary site metadata
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || brand.name,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://lusotown.london",

  // Default page metadata
  defaultTitle:
    process.env.NEXT_PUBLIC_DEFAULT_TITLE ||
    "LusoTown - London | Lusophone Social & Business Network",
  defaultDescription:
    process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION ||
    "The Lusophone social and business network in London. Connect with Portuguese speakers, book cultural events, attend technology workshops, and build professional networks. Unidos pela Língua.",

  // Complete SEO keyword set
  keywords: [
    // Primary Lusophone SEO Keywords
    "portuguese social calendar london",
    "agenda social portuguesa londres",
    "comunidade de falantes de português londres",
    "portugueses em londres",
    "brasileiros em londres",
    "lusófonos londres",
    "angolanos em londres",
    "moçambicanos em londres",
    "cabo-verdianos londres",

    // Activity-focused (not "finding community")
    "atividades para portugueses londres",
    "eventos portugueses londres",
    "fazer amigos portugueses londres",
    "conhecer portugueses londres",
    "sair com portugueses londres",
    "cultura portuguesa londres",
    "portuguese activities london",
    "portuguese events london",
    "portuguese friends london",
    "portuguese culture london",

    // Business & Networking
    "negócios portugueses londres",
    "empresários portugueses londres",
    "networking português londres",
    "portuguese business london",
    "portuguese entrepreneurs london",
    "portuguese networking london",
    "portuguese business directory london",

    // Cultural & Social
    "fado nights london",
    "noites de fado londres",
    "portuguese restaurants london",
    "restaurantes portugueses londres",
    "portuguese music london",
    "música portuguesa londres",
    "brazilian events london",
    "eventos brasileiros londres",
    "angolan culture london",
    "cultura angolana londres",
    "mozambican heritage uk",
    "património moçambicano uk",
    "cape verdean music london",
    "música cabo-verdiana londres",
    "portuguese heritage preservation",
    "diaspora community london",
    // Lusophone Keywords
    "comunidade de falantes de português londres",
    "comunidade brasileira londres",
    "comunidade angolana londres",
    "comunidade moçambicana londres",
    "cabo-verdianos londres",
    "calendário social português londres",
    "comunidade lusófona reino unido",
    "eventos portugueses londres",
    "networking português londres",
    "negócios portugueses londres",
    "noites de fado londres",
    "restaurantes portugueses londres",
    "eventos brasileiros londres",
    "cultura angolana londres",
    "herança moçambicana reino unido",
    "música cabo-verdiana londres",
    "preservação herança portuguesa",
    "diáspora lusófona londres",
  ],

  // Authors and publishers
  authors: [{ name: "LusoTown" }],
  creator: "LusoTown",
  publisher: "LusoTown",

  // Open Graph defaults
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE || "/og-image.jpg",
  ogType: "website",

  // Twitter Card defaults
  twitterCard: "summary_large_image",
  twitterSite: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@lusotownlondon",
  twitterCreator: process.env.NEXT_PUBLIC_TWITTER_CREATOR || "@lusotownlondon",

  // Language and locale
  locale: "en_GB",
  alternateLocales: ["pt_PT", "pt_BR"],

  // Verification codes
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
  bingSiteVerification: process.env.BING_SITE_VERIFICATION,

  // Structured data
  jsonLd: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brand.name,
      description:
        process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION ||
        "Lusophone social and business network in London",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://lusotown.london",
      logo: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://lusotown.london"
      }/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "customer service",
        email: contact.support,
        areaServed: "GB",
        availableLanguage: ["English", "Lusophone"],
      },
      sameAs: [
        socialMedia.facebook,
        socialMedia.instagram,
        socialMedia.twitter,
        socialMedia.linkedin,
      ].filter(Boolean),
      address: {
        "@type": "PostalAddress",
        streetAddress: officeLocations.london.address,
        addressLocality: "London",
        addressRegion: "England",
        postalCode: officeLocations.london.postcode,
        addressCountry: "GB",
      },
    },

    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: brand.name,
      description: "Portuguese-speaking community services in London",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://lusotown.london",
      telephone: contact.phone,
      email: contact.support,
      priceRange: "££",
      servesCuisine: "Lusophone",
      areaServed: {
        "@type": "City",
        name: "London",
      },
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: brand.name,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://lusotown.london",
      potentialAction: {
        "@type": "SearchAction",
        target: `${
          process.env.NEXT_PUBLIC_SITE_URL || "https://lusotown.london"
        }/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  },
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "Portuguese Speakers Community",
    description: seo.defaultDescription,
    keywords:
      "portuguese london, Portuguese-speaking community, portuguese events, portuguese business, lusitanian, luso town",
  },

  events: {
    title: `Lusophone Events in London | ${brand.name}`,
    description:
      "Discover Lusophone cultural events, meetups, and community gatherings in London. Join the vibrant Lusophone diaspora community.",
    keywords:
      "portuguese events london, portuguese meetups, portuguese culture, community events",
  },

  transport: {
    title: `Lusophone Transport Services London | ${brand.name}`,
    description:
      "Premium transport services for the Portuguese-speaking community in London. Executive cars, airport transfers, and cultural tour transport.",
    keywords:
      "portuguese transport london, executive cars, airport transfer, portuguese driver",
  },

  matches: {
    title: `Find Lusophone Matches in London | ${brand.name}`,
    description:
      "Connect with Lusophone singles in London. Cultural compatibility matching for meaningful relationships within the Lusophone diaspora.",
    keywords:
      "portuguese dating london, portuguese matches, portuguese singles, lusitanian dating",
  },

  streaming: {
    title: `Lusophone Live Streaming Platform | ${brand.name}`,
    description:
      "Get paid to stream for the Portuguese-speaking community. 85/15 revenue split, cultural emotes, and monetize your Lusophone content.",
    keywords:
      "portuguese streaming, live streaming income, portuguese content creator, monetize streaming",
  },

  directory: {
    title: `Lusophone Business Directory London | ${brand.name}`,
    description:
      "Discover Portuguese businesses, services, and professionals in London. Complete directory of Lusophone-owned businesses.",
    keywords:
      "portuguese business london, portuguese services, portuguese directory, portuguese professionals",
  },
};

// Helper functions
export const generateMetadata = (page?: keyof typeof pageSEO) => {
  const pageData = page ? pageSEO[page] : pageSEO.home;
  const computedTitle = pageData?.title || seo.defaultTitle;

  return {
    title: computedTitle,
    description: seo.defaultDescription,
    keywords: seo.keywords,
    authors: seo.authors,
    creator: seo.creator,
    publisher: seo.publisher,
    openGraph: {
      type: seo.ogType,
      locale: seo.locale,
      alternateLocale: seo.alternateLocales,
      url: seo.siteUrl,
      title: computedTitle,
      description: seo.defaultDescription,
      siteName: "LusoTown London",
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: "LusoTown - Real-Life Lusophone Meetups in London & United Kingdom",
        },
      ],
    },
    twitter: {
      card: seo.twitterCard,
      title: computedTitle,
      description: seo.defaultDescription,
      images: [seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: seo.siteUrl,
      languages: {
        "en-GB": seo.siteUrl,
        "pt-PT": `${seo.siteUrl}/pt`,
      },
    },
    verification: {
      google: seo.googleSiteVerification,
      other: {
        bing: seo.bingSiteVerification,
      },
    },
  };
};

export const generateJsonLd = (
  type: keyof typeof seo.jsonLd = "organization"
) => {
  return JSON.stringify(seo.jsonLd[type]);
};
