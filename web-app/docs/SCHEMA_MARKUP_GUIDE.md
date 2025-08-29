# Schema Markup Guide for Portuguese-speaking Community SEO

## Overview

This guide explains how to implement comprehensive JSON-LD structured data for LusoTown's Portuguese-speaking community platform to maximize search engine visibility and cultural authenticity.

## 🎯 SEO Strategy Focus

### Target Keywords
- **Primary**: comunidade portuguesa londres, portuguese community london, brasileiros em londres, brazilians in london
- **Cultural**: fado noites londres, santos populares uk, kizomba aulas londres
- **Business**: restaurantes portugueses londres, pastéis de nata london, negócios lusófonos
- **Geographic**: vauxhall portuguese community, stockwell portuguese area, borough portuguese restaurants

### Geographic Coverage
- **London**: Vauxhall, Stockwell, Elephant & Castle, Borough, Central London
- **UK Cities**: Manchester, Birmingham, Edinburgh, Bristol
- **Community Focus**: All 8 Portuguese-speaking nations (PALOP + Portugal + Brazil + East Timor)

## 🏗️ Schema System Architecture

### Core Configuration Files
```
src/config/schema-markup.ts    - Master schema definitions
src/services/SchemaService.ts  - Business logic and generation
src/components/SEO/SchemaMarkup.tsx - React components
```

### Schema Types Implemented

#### 1. Organization Schema
- **Purpose**: Establish LusoTown as authoritative Portuguese community platform
- **Coverage**: Full UK geography, all Portuguese-speaking nations
- **Languages**: Portuguese (PT/BR), English (GB)

#### 2. Event Schema
- **Cultural Events**: Santos Populares, Carnival, Fado nights
- **University Events**: Student mixers, career fairs, cultural festivals
- **Community Celebrations**: All PALOP nations represented
- **Bilingual Support**: Event names in English and Portuguese

#### 3. Business Schema
- **Categories**: 12 business categories from restaurants to technology
- **Geographic**: PostGIS-powered location data
- **Cultural Context**: Portuguese, Brazilian, Angolan, Cape Verdean cuisines
- **Reviews**: Community testimonials in Portuguese and English

#### 4. Person Schema
- **Community Leaders**: From all Portuguese-speaking nations
- **Professionals**: Business owners, cultural organizers, educators
- **Students**: University Portuguese-speaking student communities

## 🚀 Implementation Guide

### Quick Start - Page Implementation

#### Homepage Schema
```typescript
import { HomePageSchema } from '@/components/SEO/SchemaMarkup';

export default function HomePage() {
  return (
    <>
      <HomePageSchema />
      {/* Page content */}
    </>
  );
}
```

#### Events Page Schema
```typescript
import { EventsPageSchema, EventSchema } from '@/components/SEO/SchemaMarkup';

export default function EventsPage() {
  return (
    <>
      <EventsPageSchema />
      <EventSchema 
        eventName="Santos Populares London | Santos Populares Londres"
        description="Traditional Portuguese festival celebration in London"
        startDate="2025-06-13T19:00:00"
        location="Portuguese Cultural Center London"
        countries={["Portugal"]}
      />
      {/* Page content */}
    </>
  );
}
```

#### Business Directory Schema
```typescript
import { BusinessDirectorySchema, BusinessSchema } from '@/components/SEO/SchemaMarkup';

export default function BusinessDirectoryPage() {
  return (
    <>
      <BusinessDirectorySchema />
      <BusinessSchema 
        name="Taberna Real"
        description="Authentic Portuguese restaurant serving traditional bacalhau and pastéis de nata"
        address={{
          street: "123 Vauxhall Bridge Road",
          city: "London", 
          postcode: "SW1V 1EE"
        }}
        phone="+44 20 1234 5678"
        cuisine={["Portuguese cuisine", "Traditional Portuguese"]}
        rating={4.8}
        reviewCount={127}
      />
      {/* Page content */}
    </>
  );
}
```

### Advanced Implementation

#### Custom Event Schema
```typescript
import SchemaService from '@/services/SchemaService';

// Generate schema for specific celebration
const carnivalSchema = SchemaService.generateEventSchema(
  getCelebrationById('carnival-lusophone')
);

// Generate schema for university event  
const studentMixerSchema = SchemaService.generateUniversityEventSchema(
  getUniversityEvents()[0]
);
```

#### Portuguese Business Categories
```typescript
import { PORTUGUESE_BUSINESS_CATEGORIES } from '@/config/business-categories';

// Generate schema for restaurant category
const restaurantSchema = SchemaService.generateBusinessSchema(
  PORTUGUESE_BUSINESS_CATEGORIES.find(cat => cat.id === 'restaurants')
);
```

## 📊 Schema Validation & Testing

### Validation Tools
1. **Google Rich Results Test**: Test individual schemas
2. **Schema.org Validator**: Validate JSON-LD structure  
3. **Internal Validation**: `SchemaService.validateSchema()`

### Testing Checklist
- [ ] All schemas include Portuguese cultural context
- [ ] Bilingual support (EN/PT) in names and descriptions
- [ ] Geographic coverage includes full UK
- [ ] All 8 Portuguese-speaking nations represented
- [ ] Business categories include cultural authenticity markers
- [ ] Event schemas cover seasonal celebrations
- [ ] Person schemas represent diverse community leadership

## 🌍 Cultural Authenticity Guidelines

### Portuguese Community Context
- Use "Portuguese-speaking community" not "Portuguese community"
- Include all PALOP nations: Portugal, Brazil, Angola, Cape Verde, Mozambique, Guinea-Bissau, São Tomé and Príncipe, East Timor
- Reference UK-wide presence, not just London
- Maintain cultural authenticity in business and event descriptions

### Language Guidelines
- Event names: "Santos Populares London | Santos Populares Londres"
- Business descriptions: Include Portuguese cultural context
- Keywords: Mix of Portuguese and English terms
- Geographic references: Include Portuguese community areas

### Seasonal Considerations
- **June**: Santos Populares, Festa Junina
- **September**: Brazilian Independence Day  
- **November**: Angolan Independence Day
- **March**: Cape Verdean Culture Month
- **February-March**: Carnival celebrations
- **Year-round**: Fado, Samba, Kizomba events

## 🔧 Schema Components Reference

### Basic Components
```typescript
// Homepage with FAQ
<HomePageSchema />

// Events listing
<EventsPageSchema />

// Business directory
<BusinessDirectorySchema />

// Community leaders
<CommunityPageSchema />

// Portuguese language pages
<PortuguesePageSchema pageType="events" />
```

### Specific Schema Components
```typescript
// Individual event
<EventSchema {...eventProps} />

// Individual business
<BusinessSchema {...businessProps} />

// Customer review
<ReviewSchema {...reviewProps} />

// Search results
<SearchResultsSchema {...searchProps} />
```

### Custom Schema Generation
```typescript
// Complete page schema package
const schemas = SchemaService.generateCompletePageSchema('events', {
  eventId: 'santos-populares-festa-junina'
});

// Specific celebration schema
const celebrationSchema = SchemaService.generateEventSchema('brazilian-independence');

// Community leader schema
const leaderSchema = SchemaService.generatePersonSchema(
  'Maria Silva',
  'Portuguese cultural event organizer',
  'Portuguese',
  'Cultural Director'
);
```

## 📈 SEO Impact Measurement

### Key Metrics to Track
- **Search Visibility**: Portuguese community keywords ranking
- **Rich Results**: Event and business schema appearing in search
- **Click-Through Rate**: Improvement from enhanced snippets
- **Local Search**: Portuguese business directory visibility
- **Cultural Search**: Performance on lusophone-specific queries

### Portuguese Community Keywords Performance
- comunidade portuguesa londres → Target: Top 3
- portuguese events london → Target: Featured snippet
- restaurantes portugueses londres → Target: Local pack
- fado nights london → Target: Top 5
- brazilian community london → Target: Top 5

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Schema validation passes for all page types
- [ ] Portuguese cultural context maintained throughout
- [ ] All PALOP nations represented in community schemas
- [ ] Bilingual support implemented (EN/PT)
- [ ] Geographic coverage spans full UK
- [ ] Business categories reflect cultural authenticity

### Post-Deployment
- [ ] Google Search Console monitoring activated
- [ ] Rich results testing completed
- [ ] Schema markup visible in search results
- [ ] Portuguese community search performance tracking
- [ ] Cultural authenticity maintained in search snippets

## 📞 Community Integration

### Schema Data Sources
- **Cultural Events**: `/src/config/lusophone-celebrations.ts`
- **Business Categories**: `/src/config/business-categories.ts`  
- **University Events**: University partnerships data
- **Community Leaders**: Portuguese diaspora representatives
- **Geographic Data**: PostGIS business location data

### Maintenance
- **Monthly**: Update celebration dates and seasonal events
- **Quarterly**: Review business category performance
- **Annually**: Update community statistics and geographic coverage
- **Ongoing**: Monitor Portuguese cultural authenticity in search results

This schema markup system ensures LusoTown maintains its position as the authoritative platform for Portuguese-speaking communities across the United Kingdom while maximizing search engine visibility and cultural authenticity.