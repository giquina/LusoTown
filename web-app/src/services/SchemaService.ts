/**
 * Schema Service for Portuguese-speaking Community Platform
 * Manages all JSON-LD structured data generation and validation
 */

import {
  generateEventSchema,
  generateBusinessSchema,
  generateReviewSchema,
  generatePersonSchema,
  generateUniversityEventSchema,
  generatePageSchema,
  LUSOTOWN_ORGANIZATION_SCHEMA,
  PORTUGUESE_CULTURAL_CATEGORIES,
  PORTUGUESE_SEO_KEYWORDS
} from '@/config/schema-markup';
import { 
  LUSOPHONE_CELEBRATIONS, 
  UNIVERSITY_EVENTS,
  getCelebrationById,
  getCelebrationsByCategory
} from '@/config/lusophone-celebrations';
import { 
  PORTUGUESE_BUSINESS_CATEGORIES,
  getBusinessCategoryById,
  getPopularBusinessCategories
} from '@/config/business-categories';

export class SchemaService {
  /**
   * Generate homepage schema with Portuguese community focus
   */
  static generateHomepageSchema() {
    const featuredEvents = LUSOPHONE_CELEBRATIONS.slice(0, 3).map(celebration =>
      generateEventSchema(celebration)
    );

    const popularBusinesses = getPopularBusinessCategories().slice(0, 4).map(category =>
      generateBusinessSchema(category, {
        name: `${category.name.en} Directory`,
        description: `Discover authentic ${category.name.pt.toLowerCase()} across London's Portuguese-speaking community`
      })
    );

    return {
      organization: LUSOTOWN_ORGANIZATION_SCHEMA,
      events: featuredEvents,
      businesses: popularBusinesses,
      breadcrumbList: this.generateBreadcrumbSchema([
        { name: 'Home', url: '/' }
      ])
    };
  }

  /**
   * Generate events page schema with cultural context
   */
  static generateEventsPageSchema() {
    const allEventSchemas = LUSOPHONE_CELEBRATIONS.map(celebration =>
      generateEventSchema(celebration)
    );

    const universityEventSchemas = UNIVERSITY_EVENTS.map(event =>
      generateUniversityEventSchema(event)
    );

    return {
      organization: LUSOTOWN_ORGANIZATION_SCHEMA,
      culturalEvents: allEventSchemas,
      universityEvents: universityEventSchemas,
      breadcrumbList: this.generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Events | Eventos', url: '/events' }
      ]),
      eventCollection: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Portuguese Cultural Events in London",
        "description": "Comprehensive list of Portuguese-speaking community events across the United Kingdom",
        "numberOfItems": allEventSchemas.length,
        "itemListElement": allEventSchemas.map((event, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": event
        }))
      }
    };
  }

  /**
   * Generate business directory schema with Portuguese context
   */
  static generateBusinessDirectorySchema() {
    const businessSchemas = PORTUGUESE_BUSINESS_CATEGORIES.map(category =>
      generateBusinessSchema(category, {
        name: `${category.name.en} Directory London`,
        description: `Authentic ${category.name.pt.toLowerCase()} serving the Portuguese-speaking community across London and the UK`
      })
    );

    const sampleReviews = [
      generateReviewSchema(
        "Taberna Real",
        "Maria Costa",
        5,
        "Autêntico restaurante português em Londres! O bacalhau à Brás estava perfeito. Authentic Portuguese restaurant in London! The bacalhau à Brás was perfect.",
        "Portuguese",
        "pt"
      ),
      generateReviewSchema(
        "Casa Brazil",
        "João Silva", 
        5,
        "Best Brazilian restaurant in London! Excellent feijoada and amazing caipirinha. Melhor restaurante brasileiro de Londres!",
        "Brazilian",
        "en"
      ),
      generateReviewSchema(
        "Angola Kitchen",
        "Ana Fernandes",
        4,
        "Delicious Angolan cuisine. The muamba de galinha reminds me of home. Comida angolana deliciosa!",
        "Angolan",
        "pt"
      )
    ];

    return {
      organization: LUSOTOWN_ORGANIZATION_SCHEMA,
      businesses: businessSchemas,
      reviews: sampleReviews,
      breadcrumbList: this.generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Business Directory | Directório Empresarial', url: '/business-directory' }
      ]),
      businessCollection: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Portuguese Business Directory London",
        "description": "Complete directory of Portuguese-speaking businesses across the United Kingdom",
        "numberOfItems": businessSchemas.length,
        "itemListElement": businessSchemas.map((business, index) => ({
          "@type": "ListItem", 
          "position": index + 1,
          "item": business
        }))
      }
    };
  }

  /**
   * Generate specific event schema by ID
   */
  static generateEventSchema(eventId: string) {
    const celebration = getCelebrationById(eventId);
    if (!celebration) return null;

    const eventSchema = generateEventSchema(celebration);
    
    return {
      organization: LUSOTOWN_ORGANIZATION_SCHEMA,
      event: eventSchema,
      breadcrumbList: this.generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Events | Eventos', url: '/events' },
        { name: celebration.name.en, url: `/events/${eventId}` }
      ]),
      relatedEvents: getCelebrationsByCategory(celebration.category)
        .filter(c => c.id !== eventId)
        .slice(0, 3)
        .map(c => generateEventSchema(c))
    };
  }

  /**
   * Generate business schema by category
   */
  static generateBusinessCategorySchema(categoryId: string) {
    const category = getBusinessCategoryById(categoryId);
    if (!category) return null;

    const businessSchema = generateBusinessSchema(category);
    
    return {
      organization: LUSOTOWN_ORGANIZATION_SCHEMA,
      business: businessSchema,
      breadcrumbList: this.generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Business Directory', url: '/business-directory' },
        { name: category.name.en, url: `/business-directory/${categoryId}` }
      ]),
      subcategories: category.subcategories.map(sub => ({
        "@type": "Service",
        "name": sub.name.en,
        "description": sub.name.pt,
        "keywords": sub.keywords
      }))
    };
  }

  /**
   * Generate community leaders schema
   */
  static generateCommunitySchema() {
    const communityLeaders = [
      generatePersonSchema(
        "Dr. Isabel Mendes",
        "Portuguese cultural preservation advocate and community leader in London",
        "Portuguese",
        "Cultural Director",
        "Instituto Camões London"
      ),
      generatePersonSchema(
        "Carlos Rodrigues",
        "Brazilian business association president and entrepreneur",
        "Brazilian",
        "Business Association President", 
        "Brazilian Chamber of Commerce UK"
      ),
      generatePersonSchema(
        "Amália Santos",
        "Cape Verdean music promoter and cultural event coordinator", 
        "Cape Verdean",
        "Cultural Event Coordinator",
        "Cape Verdean Cultural Association"
      ),
      generatePersonSchema(
        "Miguel Torres",
        "Angolan community representative and integration specialist",
        "Angolan",
        "Community Representative",
        "Angolan Community UK"
      ),
      generatePersonSchema(
        "Fátima Silva",
        "Mozambican heritage specialist and cultural educator",
        "Mozambican", 
        "Cultural Educator",
        "Mozambican Heritage UK"
      )
    ];

    return {
      organization: LUSOTOWN_ORGANIZATION_SCHEMA,
      communityLeaders: communityLeaders,
      breadcrumbList: this.generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Community | Comunidade', url: '/community' }
      ])
    };
  }

  /**
   * Generate breadcrumb navigation schema
   */
  static generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `https://lusotown.london${item.url}`
      }))
    };
  }

  /**
   * Generate FAQ schema for Portuguese community
   */
  static generateFAQSchema() {
    const faqs = [
      {
        question: "What is LusoTown London?",
        answer: "LusoTown London is the premier platform connecting Portuguese-speaking communities across the United Kingdom, including Portuguese, Brazilian, Angolan, Cape Verdean, Mozambican, and other lusophone diaspora communities."
      },
      {
        question: "Where can I find Portuguese restaurants in London?", 
        answer: "Our business directory features authentic Portuguese restaurants across London, particularly in areas like Vauxhall, Stockwell, and other Portuguese community hubs. You can browse by cuisine type including Portuguese, Brazilian, Angolan, and Cape Verdean food."
      },
      {
        question: "How can I join Portuguese cultural events in London?",
        answer: "Browse our events page to discover Santos Populares celebrations, Fado nights, Brazilian festivals, and other cultural events. We feature celebrations from all Portuguese-speaking countries throughout the year."
      },
      {
        question: "Is LusoTown available in Portuguese?",
        answer: "Yes! Nossa plataforma está disponível em português. We provide full bilingual support in both English and Portuguese to serve our diverse lusophone community."
      },
      {
        question: "Which areas of the UK does LusoTown serve?",
        answer: "While based in London, LusoTown serves Portuguese-speaking communities across the entire United Kingdom, including Manchester, Birmingham, Edinburgh, Bristol, and other major cities with Portuguese diaspora populations."
      }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  /**
   * Generate search results schema for Portuguese community searches
   */
  static generateSearchResultsSchema(
    query: string,
    results: any[],
    category?: 'events' | 'businesses' | 'community'
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "name": `Search Results for "${query}" | Resultados para "${query}"`,
      "description": `Search results for Portuguese-speaking community content: ${query}`,
      "url": `https://lusotown.london/search?q=${encodeURIComponent(query)}`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": results.length,
        "itemListElement": results.map((result, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": category === 'events' ? 'Event' : category === 'businesses' ? 'LocalBusiness' : 'Thing',
            "name": result.name || result.title,
            "description": result.description,
            "url": result.url
          }
        }))
      },
      "keywords": [
        query,
        ...PORTUGUESE_SEO_KEYWORDS.primary,
        ...PORTUGUESE_CULTURAL_CATEGORIES.filter(cat => 
          cat.toLowerCase().includes(query.toLowerCase())
        )
      ]
    };
  }

  /**
   * Generate schema for Portuguese language pages
   */
  static generateLanguagePageSchema(language: 'pt' | 'en') {
    const isPortuguese = language === 'pt';
    
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isPortuguese ? "LusoTown Londres - Comunidade Lusófona" : "LusoTown London - Portuguese Community",
      "description": isPortuguese 
        ? "Plataforma oficial da comunidade lusófona em Londres e Reino Unido" 
        : "Official Portuguese-speaking community platform in London and United Kingdom",
      "inLanguage": language === 'pt' ? 'pt-PT' : 'en-GB',
      "isPartOf": {
        "@type": "WebSite",
        "name": "LusoTown London",
        "url": "https://lusotown.london"
      },
      "about": [
        isPortuguese ? "Comunidade portuguesa Londres" : "Portuguese community London",
        isPortuguese ? "Eventos culturais portugueses" : "Portuguese cultural events", 
        isPortuguese ? "Negócios lusófonos Reino Unido" : "Lusophone businesses United Kingdom"
      ]
    };
  }

  /**
   * Validate schema markup before output
   */
  static validateSchema(schema: any): boolean {
    try {
      // Basic validation checks
      if (!schema || typeof schema !== 'object') return false;
      if (!schema['@context'] || !schema['@type']) return false;
      
      // Schema.org context validation
      if (schema['@context'] !== 'https://schema.org') return false;
      
      return true;
    } catch (error) {
      console.error('Schema validation error:', error);
      return false;
    }
  }

  /**
   * Generate complete page schema package
   */
  static generateCompletePageSchema(
    pageType: 'home' | 'events' | 'business' | 'community' | 'search',
    pageData?: any
  ) {
    let schemas: any[] = [];

    switch (pageType) {
      case 'home':
        const homeSchema = this.generateHomepageSchema();
        schemas = [
          homeSchema.organization,
          ...homeSchema.events,
          ...homeSchema.businesses,
          homeSchema.breadcrumbList,
          this.generateFAQSchema()
        ];
        break;

      case 'events':
        const eventsSchema = this.generateEventsPageSchema();
        schemas = [
          eventsSchema.organization,
          ...eventsSchema.culturalEvents,
          eventsSchema.breadcrumbList,
          eventsSchema.eventCollection
        ];
        break;

      case 'business':
        const businessSchema = this.generateBusinessDirectorySchema();
        schemas = [
          businessSchema.organization,
          ...businessSchema.businesses,
          businessSchema.breadcrumbList,
          businessSchema.businessCollection
        ];
        break;

      case 'community':
        const communitySchema = this.generateCommunitySchema();
        schemas = [
          communitySchema.organization,
          ...communitySchema.communityLeaders,
          communitySchema.breadcrumbList
        ];
        break;

      default:
        schemas = [LUSOTOWN_ORGANIZATION_SCHEMA];
    }

    // Filter valid schemas
    return schemas.filter(schema => this.validateSchema(schema));
  }
}

export default SchemaService;