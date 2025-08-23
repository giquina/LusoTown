"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  GlobeAltIcon,
  MapPinIcon,
  HomeIcon,
  MusicalNoteIcon,
  CakeIcon,
  AcademicCapIcon,
  SunIcon,
  CloudIcon,
  MountainIcon,
  BeakerIcon,
  HeartIcon,
  SparklesIcon,
  FlagIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  TrophyIcon,
  HandRaisedIcon,
} from '@heroicons/react/24/outline';
import {
  GlobeAltIcon as GlobeSolid,
  MapPinIcon as MapSolid,
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import type { SaudadeProfile, CulturalDepthProfile, RegionalIdentity } from './SaudadeMatchingSystem';

// Regional Specialization Types
interface RegionalCompatibilityProfile {
  primaryRegion: PortugueseRegion;
  secondaryRegions: PortugueseRegion[];
  diasporaGeneration: 'first' | 'second' | 'third' | 'mixed';
  ukResidencePattern: 'london_central' | 'london_suburbs' | 'greater_london' | 'uk_cities' | 'mixed';
  regionalLoyalty: number; // 1-10
  crossRegionalTolerance: number; // 1-10
  culturalAdaptability: number; // 1-10
}

interface PortugueseRegion {
  id: string;
  name: string;
  nameEn: string;
  namePt: string;
  characteristics: RegionalCharacteristics;
  culturalMarkers: CulturalMarker[];
  traditions: RegionalTradition[];
  dialect: DialectInfo;
  emigrationPatterns: EmigrationPattern;
  ukCommunityStrength: number; // 1-10
  londonPresence: LondonPresence;
}

interface RegionalCharacteristics {
  personality: string[];
  values: string[];
  socialStyle: 'formal' | 'casual' | 'traditional' | 'modern' | 'mixed';
  familyOrientation: number; // 1-10
  religiosity: number; // 1-10
  workEthic: string;
  communicationStyle: 'direct' | 'indirect' | 'expressive' | 'reserved';
}

interface CulturalMarker {
  type: 'food' | 'music' | 'festival' | 'craft' | 'landscape' | 'architecture' | 'sport';
  name: string;
  significance: number; // 1-10
  recognitionLevel: 'local' | 'regional' | 'national' | 'international';
  emotionalAttachment: number; // 1-10
}

interface RegionalTradition {
  name: string;
  category: 'religious' | 'seasonal' | 'family' | 'community' | 'agricultural' | 'maritime';
  importance: number; // 1-10
  preservation: 'strong' | 'moderate' | 'weak' | 'evolving';
  diasporaAdaptation: 'maintained' | 'adapted' | 'lost' | 'recreated';
}

interface DialectInfo {
  category: 'northern' | 'central' | 'southern' | 'insular' | 'standard';
  distinctiveness: number; // 1-10
  preservationInDiaspora: number; // 1-10
  mutualIntelligibility: Record<string, number>;
  emotionalSignificance: number; // 1-10
}

interface EmigrationPattern {
  historicalWaves: EmigrationWave[];
  primaryDestinations: string[];
  motivations: string[];
  communityFormation: 'tight' | 'moderate' | 'loose' | 'dispersed';
  generationalRetention: number; // 1-10
}

interface EmigrationWave {
  period: string;
  intensity: number; // 1-10
  destinations: string[];
  characteristics: string[];
}

interface LondonPresence {
  concentration: 'high' | 'moderate' | 'low' | 'scattered';
  primaryAreas: string[];
  communityInstitutions: CommunityInstitution[];
  culturalEvents: CulturalEvent[];
  businessPresence: number; // 1-10
}

interface CommunityInstitution {
  type: 'church' | 'school' | 'club' | 'restaurant' | 'shop' | 'media';
  name: string;
  influence: number; // 1-10
  regionalSpecificity: number; // 1-10
}

interface CulturalEvent {
  name: string;
  frequency: 'weekly' | 'monthly' | 'seasonal' | 'annual';
  attendance: number; // 1-10
  regionalSpecificity: number; // 1-10
  crossRegionalAppeal: number; // 1-10
}

interface RegionalMatchingResult {
  compatibility: number; // 1-100
  culturalResonance: number; // 1-100
  dialectCompatibility: number; // 1-100
  traditionAlignment: number; // 1-100
  communityNetworkOverlap: number; // 1-100
  saudadeResonance: number; // 1-100
  strengths: RegionalStrength[];
  challenges: RegionalChallenge[];
  recommendations: RegionalRecommendation[];
  culturalBridges: CulturalBridge[];
}

interface RegionalStrength {
  category: 'cultural' | 'linguistic' | 'social' | 'emotional' | 'practical';
  description: string;
  impact: number; // 1-10
}

interface RegionalChallenge {
  category: 'cultural' | 'linguistic' | 'social' | 'generational' | 'practical';
  description: string;
  severity: number; // 1-10
  mitigationStrategies: string[];
}

interface RegionalRecommendation {
  type: 'conversation' | 'activity' | 'cultural' | 'community' | 'family';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  culturalDepth: number; // 1-10
}

interface CulturalBridge {
  type: 'shared_tradition' | 'common_value' | 'similar_experience' | 'complementary_difference';
  element: string;
  connectionStrength: number; // 1-10
  emotionalResonance: number; // 1-10
}

interface RegionalSpecializationAIProps {
  userProfile: CulturalDepthProfile;
  potentialMatches: any[];
  onRegionalAnalysis: (analysis: RegionalMatchingResult[]) => void;
  focusRegion?: string;
  enableCrossRegionalMatching?: boolean;
  showDetailedAnalytics?: boolean;
}

// Portuguese Regional AI Engine
class PortugueseRegionalAI {
  static readonly REGIONS: Record<string, PortugueseRegion> = {
    minho: {
      id: 'minho',
      name: 'Minho',
      nameEn: 'Minho Province',
      namePt: 'Província do Minho',
      characteristics: {
        personality: ['traditional', 'family-oriented', 'hardworking', 'religious', 'hospitable'],
        values: ['family_loyalty', 'land_connection', 'religious_faith', 'community_solidarity', 'tradition_respect'],
        socialStyle: 'traditional',
        familyOrientation: 9,
        religiosity: 8,
        workEthic: 'industrious',
        communicationStyle: 'reserved',
      },
      culturalMarkers: [
        { type: 'food', name: 'Vinho Verde', significance: 9, recognitionLevel: 'international', emotionalAttachment: 9 },
        { type: 'festival', name: 'Festa de São João', significance: 8, recognitionLevel: 'regional', emotionalAttachment: 8 },
        { type: 'music', name: 'Folk Traditional', significance: 7, recognitionLevel: 'local', emotionalAttachment: 8 },
        { type: 'landscape', name: 'Green Valleys', significance: 8, recognitionLevel: 'national', emotionalAttachment: 9 },
      ],
      traditions: [
        { name: 'Romarias', category: 'religious', importance: 9, preservation: 'strong', diasporaAdaptation: 'adapted' },
        { name: 'Folk Festivals', category: 'seasonal', importance: 8, preservation: 'moderate', diasporaAdaptation: 'recreated' },
        { name: 'Agricultural Celebrations', category: 'agricultural', importance: 7, preservation: 'weak', diasporaAdaptation: 'lost' },
      ],
      dialect: {
        category: 'northern',
        distinctiveness: 7,
        preservationInDiaspora: 6,
        mutualIntelligibility: { 'porto': 9, 'lisboa': 7, 'acores': 6 },
        emotionalSignificance: 8,
      },
      emigrationPatterns: {
        historicalWaves: [
          { period: '1960s-1970s', intensity: 9, destinations: ['France', 'Germany', 'United Kingdom'], characteristics: ['economic', 'family_chain'] },
          { period: '2008-2015', intensity: 6, destinations: ['United Kingdom', 'Switzerland', 'Luxembourg'], characteristics: ['economic_crisis', 'youth_emigration'] },
        ],
        primaryDestinations: ['France', 'United Kingdom', 'Germany', 'Switzerland'],
        motivations: ['economic_opportunity', 'family_reunification', 'better_life'],
        communityFormation: 'tight',
        generationalRetention: 7,
      },
      ukResidencePattern: 'london_suburbs',
      ukCommunityStrength: 7,
      londonPresence: {
        concentration: 'moderate',
        primaryAreas: ['Lambeth', 'Southwark', 'Croydon'],
        communityInstitutions: [
          { type: 'church', name: 'Igreja Portuguesa de Londres', influence: 8, regionalSpecificity: 7 },
          { type: 'club', name: 'Casa do Minho', influence: 7, regionalSpecificity: 9 },
        ],
        culturalEvents: [
          { name: 'Festa do Vinho Verde', frequency: 'annual', attendance: 8, regionalSpecificity: 9, crossRegionalAppeal: 6 },
        ],
        businessPresence: 6,
      },
    },

    porto_norte: {
      id: 'porto_norte',
      name: 'Porto/Norte',
      nameEn: 'Porto and Northern Portugal',
      namePt: 'Porto e Norte de Portugal',
      characteristics: {
        personality: ['proud', 'industrious', 'direct', 'passionate', 'loyal'],
        values: ['regional_pride', 'hard_work', 'authenticity', 'football_culture', 'entrepreneurship'],
        socialStyle: 'mixed',
        familyOrientation: 8,
        religiosity: 7,
        workEthic: 'entrepreneurial',
        communicationStyle: 'direct',
      },
      culturalMarkers: [
        { type: 'food', name: 'Francesinha', significance: 9, recognitionLevel: 'national', emotionalAttachment: 9 },
        { type: 'food', name: 'Tripas à Moda do Porto', significance: 8, recognitionLevel: 'regional', emotionalAttachment: 7 },
        { type: 'festival', name: 'Santos Populares', significance: 9, recognitionLevel: 'national', emotionalAttachment: 8 },
        { type: 'sport', name: 'FC Porto', significance: 10, recognitionLevel: 'international', emotionalAttachment: 10 },
        { type: 'architecture', name: 'Azulejo Tiles', significance: 8, recognitionLevel: 'international', emotionalAttachment: 7 },
      ],
      traditions: [
        { name: 'São João do Porto', category: 'seasonal', importance: 10, preservation: 'strong', diasporaAdaptation: 'maintained' },
        { name: 'Marcha Popular', category: 'community', importance: 8, preservation: 'strong', diasporaAdaptation: 'adapted' },
        { name: 'Football Culture', category: 'community', importance: 9, preservation: 'strong', diasporaAdaptation: 'maintained' },
      ],
      dialect: {
        category: 'northern',
        distinctiveness: 6,
        preservationInDiaspora: 7,
        mutualIntelligibility: { 'minho': 9, 'lisboa': 8, 'acores': 7 },
        emotionalSignificance: 7,
      },
      emigrationPatterns: {
        historicalWaves: [
          { period: '1960s-1980s', intensity: 8, destinations: ['France', 'United Kingdom', 'Canada'], characteristics: ['economic', 'skilled_workers'] },
          { period: '2010s', intensity: 7, destinations: ['United Kingdom', 'Germany', 'Netherlands'], characteristics: ['youth_mobility', 'higher_education'] },
        ],
        primaryDestinations: ['United Kingdom', 'France', 'Germany', 'Canada'],
        motivations: ['economic_opportunity', 'career_advancement', 'education'],
        communityFormation: 'moderate',
        generationalRetention: 6,
      },
      ukResidencePattern: 'london_central',
      ukCommunityStrength: 8,
      londonPresence: {
        concentration: 'high',
        primaryAreas: ['Kensington', 'Chelsea', 'Stockwell', 'Vauxhall'],
        communityInstitutions: [
          { type: 'restaurant', name: 'Adega', influence: 8, regionalSpecificity: 8 },
          { type: 'club', name: 'Clube Português de Londres', influence: 9, regionalSpecificity: 6 },
          { type: 'media', name: 'Rádio Portuguesa', influence: 7, regionalSpecificity: 5 },
        ],
        culturalEvents: [
          { name: 'Santos Populares London', frequency: 'annual', attendance: 9, regionalSpecificity: 8, crossRegionalAppeal: 8 },
          { name: 'FC Porto London Supporters', frequency: 'weekly', attendance: 8, regionalSpecificity: 9, crossRegionalAppeal: 4 },
        ],
        businessPresence: 8,
      },
    },

    lisboa_centro: {
      id: 'lisboa_centro',
      name: 'Lisboa/Centro',
      nameEn: 'Lisbon and Central Portugal',
      namePt: 'Lisboa e Centro de Portugal',
      characteristics: {
        personality: ['cosmopolitan', 'cultural', 'sophisticated', 'artistic', 'intellectual'],
        values: ['education', 'arts', 'cultural_heritage', 'cosmopolitanism', 'progressive_thinking'],
        socialStyle: 'modern',
        familyOrientation: 7,
        religiosity: 6,
        workEthic: 'professional',
        communicationStyle: 'expressive',
      },
      culturalMarkers: [
        { type: 'music', name: 'Fado', significance: 10, recognitionLevel: 'international', emotionalAttachment: 10 },
        { type: 'food', name: 'Pastéis de Belém', significance: 9, recognitionLevel: 'international', emotionalAttachment: 8 },
        { type: 'architecture', name: 'Mosteiro dos Jerónimos', significance: 9, recognitionLevel: 'international', emotionalAttachment: 7 },
        { type: 'festival', name: 'Lisboa em Festa', significance: 8, recognitionLevel: 'national', emotionalAttachment: 7 },
      ],
      traditions: [
        { name: 'Fado Vadio', category: 'cultural', importance: 10, preservation: 'strong', diasporaAdaptation: 'maintained' },
        { name: 'Literary Traditions', category: 'cultural', importance: 8, preservation: 'strong', diasporaAdaptation: 'adapted' },
        { name: 'Urban Festivals', category: 'seasonal', importance: 7, preservation: 'evolving', diasporaAdaptation: 'recreated' },
      ],
      dialect: {
        category: 'central',
        distinctiveness: 4,
        preservationInDiaspora: 8,
        mutualIntelligibility: { 'porto': 8, 'minho': 7, 'alentejo': 9, 'acores': 7 },
        emotionalSignificance: 6,
      },
      emigrationPatterns: {
        historicalWaves: [
          { period: '1970s-1990s', intensity: 7, destinations: ['United Kingdom', 'Canada', 'Australia'], characteristics: ['professional', 'educated'] },
          { period: '2010s-present', intensity: 8, destinations: ['United Kingdom', 'Germany', 'Netherlands'], characteristics: ['economic_crisis', 'professional_mobility'] },
        ],
        primaryDestinations: ['United Kingdom', 'France', 'Canada', 'Australia'],
        motivations: ['career_opportunities', 'lifestyle', 'economic_crisis'],
        communityFormation: 'moderate',
        generationalRetention: 5,
      },
      ukResidencePattern: 'mixed',
      ukCommunityStrength: 9,
      londonPresence: {
        concentration: 'high',
        primaryAreas: ['South Kensington', 'Notting Hill', 'Hammersmith', 'Fulham'],
        communityInstitutions: [
          { type: 'school', name: 'Escola Portuguesa de Londres', influence: 9, regionalSpecificity: 5 },
          { type: 'restaurant', name: 'Taberna Real', influence: 8, regionalSpecificity: 7 },
          { type: 'club', name: 'Casa de Portugal', influence: 9, regionalSpecificity: 6 },
        ],
        culturalEvents: [
          { name: 'Fado em Londres', frequency: 'monthly', attendance: 9, regionalSpecificity: 8, crossRegionalAppeal: 9 },
          { name: 'Festa de Lisboa London', frequency: 'annual', attendance: 8, regionalSpecificity: 8, crossRegionalAppeal: 7 },
        ],
        businessPresence: 9,
      },
    },

    acores: {
      id: 'acores',
      name: 'Açores',
      nameEn: 'Azores Islands',
      namePt: 'Ilhas dos Açores',
      characteristics: {
        personality: ['island_identity', 'close_community', 'resilient', 'maritime', 'emigration_culture'],
        values: ['community_solidarity', 'island_pride', 'family_connections', 'maritime_heritage', 'diaspora_unity'],
        socialStyle: 'traditional',
        familyOrientation: 10,
        religiosity: 9,
        workEthic: 'community_oriented',
        communicationStyle: 'expressive',
      },
      culturalMarkers: [
        { type: 'festival', name: 'Festa do Espírito Santo', significance: 10, recognitionLevel: 'regional', emotionalAttachment: 10 },
        { type: 'food', name: 'Linguiça', significance: 9, recognitionLevel: 'regional', emotionalAttachment: 9 },
        { type: 'music', name: 'Chamarrita', significance: 8, recognitionLevel: 'local', emotionalAttachment: 9 },
        { type: 'landscape', name: 'Volcanic Lakes', significance: 9, recognitionLevel: 'international', emotionalAttachment: 9 },
      ],
      traditions: [
        { name: 'Império do Espírito Santo', category: 'religious', importance: 10, preservation: 'strong', diasporaAdaptation: 'maintained' },
        { name: 'Island Festivals', category: 'community', importance: 9, preservation: 'strong', diasporaAdaptation: 'adapted' },
        { name: 'Emigrant Solidarity', category: 'community', importance: 9, preservation: 'strong', diasporaAdaptation: 'maintained' },
      ],
      dialect: {
        category: 'insular',
        distinctiveness: 8,
        preservationInDiaspora: 9,
        mutualIntelligibility: { 'lisboa': 7, 'porto': 7, 'madeira': 8 },
        emotionalSignificance: 9,
      },
      emigrationPatterns: {
        historicalWaves: [
          { period: '1950s-1970s', intensity: 10, destinations: ['USA', 'Canada', 'United Kingdom'], characteristics: ['mass_emigration', 'family_chain'] },
          { period: '1980s-2000s', intensity: 6, destinations: ['mainland_portugal', 'United Kingdom', 'Canada'], characteristics: ['continued_flow', 'family_reunification'] },
        ],
        primaryDestinations: ['USA', 'Canada', 'United Kingdom', 'Brazil'],
        motivations: ['economic_necessity', 'family_reunification', 'tradition'],
        communityFormation: 'tight',
        generationalRetention: 9,
      },
      ukResidencePattern: 'london_suburbs',
      ukCommunityStrength: 9,
      londonPresence: {
        concentration: 'moderate',
        primaryAreas: ['Brixton', 'Stockwell', 'Tulse Hill', 'Streatham'],
        communityInstitutions: [
          { type: 'church', name: 'Igreja Açoriana', influence: 9, regionalSpecificity: 10 },
          { type: 'club', name: 'Casa dos Açores', influence: 8, regionalSpecificity: 10 },
          { type: 'shop', name: 'Mercearia Açoriana', influence: 7, regionalSpecificity: 9 },
        ],
        culturalEvents: [
          { name: 'Festa do Espírito Santo London', frequency: 'annual', attendance: 9, regionalSpecificity: 10, crossRegionalAppeal: 5 },
          { name: 'Azorean Cultural Festival', frequency: 'annual', attendance: 8, regionalSpecificity: 10, crossRegionalAppeal: 4 },
        ],
        businessPresence: 6,
      },
    },

    madeira: {
      id: 'madeira',
      name: 'Madeira',
      nameEn: 'Madeira Island',
      namePt: 'Ilha da Madeira',
      characteristics: {
        personality: ['island_pride', 'unique_culture', 'hospitality', 'artistic', 'tourism_aware'],
        values: ['island_identity', 'beauty_appreciation', 'cultural_preservation', 'family_honor', 'artistic_expression'],
        socialStyle: 'traditional',
        familyOrientation: 9,
        religiosity: 8,
        workEthic: 'service_oriented',
        communicationStyle: 'expressive',
      },
      culturalMarkers: [
        { type: 'food', name: 'Poncha', significance: 9, recognitionLevel: 'regional', emotionalAttachment: 9 },
        { type: 'festival', name: 'Festa da Flor', significance: 8, recognitionLevel: 'international', emotionalAttachment: 8 },
        { type: 'music', name: 'Folklore Madeirense', significance: 8, recognitionLevel: 'regional', emotionalAttachment: 9 },
        { type: 'craft', name: 'Bordado da Madeira', significance: 9, recognitionLevel: 'international', emotionalAttachment: 8 },
      ],
      traditions: [
        { name: 'New Year Fireworks', category: 'seasonal', importance: 9, preservation: 'strong', diasporaAdaptation: 'adapted' },
        { name: 'Wine Festival', category: 'seasonal', importance: 8, preservation: 'strong', diasporaAdaptation: 'recreated' },
        { name: 'Folklore Dancing', category: 'cultural', importance: 8, preservation: 'moderate', diasporaAdaptation: 'adapted' },
      ],
      dialect: {
        category: 'insular',
        distinctiveness: 7,
        preservationInDiaspora: 8,
        mutualIntelligibility: { 'lisboa': 8, 'acores': 8, 'porto': 7 },
        emotionalSignificance: 8,
      },
      emigrationPatterns: {
        historicalWaves: [
          { period: '1960s-1980s', intensity: 8, destinations: ['Venezuela', 'South Africa', 'United Kingdom'], characteristics: ['economic', 'adventure'] },
          { period: '1990s-2010s', intensity: 5, destinations: ['United Kingdom', 'mainland_portugal', 'Canada'], characteristics: ['professional', 'family'] },
        ],
        primaryDestinations: ['Venezuela', 'United Kingdom', 'South Africa', 'Canada'],
        motivations: ['economic_opportunity', 'adventure', 'family'],
        communityFormation: 'moderate',
        generationalRetention: 7,
      },
      ukResidencePattern: 'greater_london',
      ukCommunityStrength: 6,
      londonPresence: {
        concentration: 'low',
        primaryAreas: ['Jersey', 'Reading', 'Slough'],
        communityInstitutions: [
          { type: 'club', name: 'Casa da Madeira', influence: 7, regionalSpecificity: 9 },
          { type: 'restaurant', name: 'Madeira Restaurant', influence: 6, regionalSpecificity: 8 },
        ],
        culturalEvents: [
          { name: 'Madeira Cultural Day', frequency: 'annual', attendance: 6, regionalSpecificity: 9, crossRegionalAppeal: 5 },
        ],
        businessPresence: 5,
      },
    },

    alentejo: {
      id: 'alentejo',
      name: 'Alentejo',
      nameEn: 'Alentejo Region',
      namePt: 'Região do Alentejo',
      characteristics: {
        personality: ['calm', 'contemplative', 'traditional', 'rural', 'philosophical'],
        values: ['simplicity', 'nature_connection', 'contemplation', 'tradition', 'authenticity'],
        socialStyle: 'traditional',
        familyOrientation: 8,
        religiosity: 7,
        workEthic: 'steady',
        communicationStyle: 'reserved',
      },
      culturalMarkers: [
        { type: 'food', name: 'Migas', significance: 8, recognitionLevel: 'regional', emotionalAttachment: 8 },
        { type: 'landscape', name: 'Cork Oak Plains', significance: 9, recognitionLevel: 'national', emotionalAttachment: 9 },
        { type: 'music', name: 'Cante Alentejano', significance: 9, recognitionLevel: 'international', emotionalAttachment: 9 },
        { type: 'craft', name: 'Cork Products', significance: 8, recognitionLevel: 'international', emotionalAttachment: 7 },
      ],
      traditions: [
        { name: 'Cante Alentejano', category: 'cultural', importance: 9, preservation: 'strong', diasporaAdaptation: 'maintained' },
        { name: 'Agricultural Festivals', category: 'agricultural', importance: 8, preservation: 'moderate', diasporaAdaptation: 'lost' },
        { name: 'Cork Traditions', category: 'agricultural', importance: 7, preservation: 'moderate', diasporaAdaptation: 'adapted' },
      ],
      dialect: {
        category: 'southern',
        distinctiveness: 6,
        preservationInDiaspora: 5,
        mutualIntelligibility: { 'lisboa': 9, 'algarve': 8, 'porto': 7 },
        emotionalSignificance: 7,
      },
      emigrationPatterns: {
        historicalWaves: [
          { period: '1960s-1970s', intensity: 7, destinations: ['France', 'Germany', 'United Kingdom'], characteristics: ['agricultural_workers', 'economic'] },
          { period: '2010s', intensity: 4, destinations: ['United Kingdom', 'Germany', 'Angola'], characteristics: ['youth_emigration', 'professional'] },
        ],
        primaryDestinations: ['France', 'United Kingdom', 'Germany', 'Angola'],
        motivations: ['economic_opportunity', 'better_conditions'],
        communityFormation: 'loose',
        generationalRetention: 4,
      },
      ukResidencePattern: 'uk_cities',
      ukCommunityStrength: 4,
      londonPresence: {
        concentration: 'low',
        primaryAreas: ['Scattered'],
        communityInstitutions: [
          { type: 'club', name: 'Grupo Alentejano', influence: 5, regionalSpecificity: 8 },
        ],
        culturalEvents: [
          { name: 'Cante Alentejano Performance', frequency: 'seasonal', attendance: 5, regionalSpecificity: 9, crossRegionalAppeal: 6 },
        ],
        businessPresence: 3,
      },
    },
  };

  static analyzeRegionalCompatibility(
    userRegion: string,
    potentialRegion: string,
    userProfile: CulturalDepthProfile
  ): RegionalMatchingResult {
    const userRegionData = this.REGIONS[userRegion] || this.REGIONS['lisboa_centro'];
    const potentialRegionData = this.REGIONS[potentialRegion] || this.REGIONS['lisboa_centro'];

    // Calculate various compatibility scores
    const culturalResonance = this.calculateCulturalResonance(userRegionData, potentialRegionData);
    const dialectCompatibility = this.calculateDialectCompatibility(userRegionData, potentialRegionData);
    const traditionAlignment = this.calculateTraditionAlignment(userRegionData, potentialRegionData);
    const communityNetworkOverlap = this.calculateCommunityOverlap(userRegionData, potentialRegionData);
    const saudadeResonance = this.calculateSaudadeResonance(userRegionData, potentialRegionData, userProfile);

    // Overall compatibility
    const compatibility = Math.round(
      culturalResonance * 0.25 +
      dialectCompatibility * 0.15 +
      traditionAlignment * 0.20 +
      communityNetworkOverlap * 0.15 +
      saudadeResonance * 0.25
    );

    return {
      compatibility,
      culturalResonance,
      dialectCompatibility,
      traditionAlignment,
      communityNetworkOverlap,
      saudadeResonance,
      strengths: this.identifyRegionalStrengths(userRegionData, potentialRegionData),
      challenges: this.identifyRegionalChallenges(userRegionData, potentialRegionData),
      recommendations: this.generateRegionalRecommendations(userRegionData, potentialRegionData),
      culturalBridges: this.identifyCulturalBridges(userRegionData, potentialRegionData),
    };
  }

  static calculateCulturalResonance(region1: PortugueseRegion, region2: PortugueseRegion): number {
    // Shared cultural markers
    const sharedMarkers = region1.culturalMarkers.filter(marker1 =>
      region2.culturalMarkers.some(marker2 => 
        marker1.type === marker2.type && 
        Math.abs(marker1.significance - marker2.significance) <= 2
      )
    );

    const markerScore = (sharedMarkers.length / Math.max(region1.culturalMarkers.length, region2.culturalMarkers.length)) * 100;

    // Personality alignment
    const sharedPersonality = region1.characteristics.personality.filter(trait =>
      region2.characteristics.personality.includes(trait)
    );
    const personalityScore = (sharedPersonality.length / Math.max(region1.characteristics.personality.length, region2.characteristics.personality.length)) * 100;

    // Values alignment
    const sharedValues = region1.characteristics.values.filter(value =>
      region2.characteristics.values.includes(value)
    );
    const valuesScore = (sharedValues.length / Math.max(region1.characteristics.values.length, region2.characteristics.values.length)) * 100;

    return Math.round((markerScore * 0.4 + personalityScore * 0.3 + valuesScore * 0.3));
  }

  static calculateDialectCompatibility(region1: PortugueseRegion, region2: PortugueseRegion): number {
    if (region1.dialect.category === region2.dialect.category) {
      return 100;
    }

    const mutualIntelligibility = region1.dialect.mutualIntelligibility[region2.id] || 70;
    const emotionalSignificanceAvg = (region1.dialect.emotionalSignificance + region2.dialect.emotionalSignificance) / 2;
    const preservationAvg = (region1.dialect.preservationInDiaspora + region2.dialect.preservationInDiaspora) / 2;

    return Math.round((mutualIntelligibility * 0.5 + emotionalSignificanceAvg * 10 * 0.3 + preservationAvg * 10 * 0.2));
  }

  static calculateTraditionAlignment(region1: PortugueseRegion, region2: PortugueseRegion): number {
    const sharedTraditionCategories = region1.traditions.filter(t1 =>
      region2.traditions.some(t2 => t1.category === t2.category)
    );

    const categoryScore = (sharedTraditionCategories.length / Math.max(region1.traditions.length, region2.traditions.length)) * 100;

    // Diaspora adaptation compatibility
    const adaptationCompatibility = region1.traditions.filter(t1 => {
      const similarTradition = region2.traditions.find(t2 => t1.category === t2.category);
      return similarTradition && t1.diasporaAdaptation === similarTradition.diasporaAdaptation;
    }).length;

    const adaptationScore = (adaptationCompatibility / Math.max(region1.traditions.length, region2.traditions.length)) * 100;

    return Math.round((categoryScore * 0.6 + adaptationScore * 0.4));
  }

  static calculateCommunityOverlap(region1: PortugueseRegion, region2: PortugueseRegion): number {
    // London presence overlap
    const sharedAreas = region1.londonPresence.primaryAreas.filter(area =>
      region2.londonPresence.primaryAreas.includes(area)
    );

    const areaOverlap = sharedAreas.length > 0 ? 80 : 30;

    // Community strength compatibility
    const strengthDiff = Math.abs(region1.ukCommunityStrength - region2.ukCommunityStrength);
    const strengthCompatibility = Math.max(0, 100 - (strengthDiff * 15));

    // Institution overlap
    const institutionTypes1 = region1.londonPresence.communityInstitutions.map(i => i.type);
    const institutionTypes2 = region2.londonPresence.communityInstitutions.map(i => i.type);
    const sharedInstitutionTypes = institutionTypes1.filter(type => institutionTypes2.includes(type));
    const institutionOverlap = (sharedInstitutionTypes.length / Math.max(institutionTypes1.length, institutionTypes2.length)) * 100;

    return Math.round((areaOverlap * 0.4 + strengthCompatibility * 0.3 + institutionOverlap * 0.3));
  }

  static calculateSaudadeResonance(
    region1: PortugueseRegion, 
    region2: PortugueseRegion, 
    userProfile: CulturalDepthProfile
  ): number {
    // Emigration pattern similarity
    const emigrationSimilarity = this.calculateEmigrationSimilarity(region1, region2);

    // Family orientation compatibility
    const familyDiff = Math.abs(region1.characteristics.familyOrientation - region2.characteristics.familyOrientation);
    const familyCompatibility = Math.max(0, 100 - (familyDiff * 12));

    // Cultural marker emotional attachment
    const emotionalAttachment1 = region1.culturalMarkers.reduce((sum, marker) => sum + marker.emotionalAttachment, 0) / region1.culturalMarkers.length;
    const emotionalAttachment2 = region2.culturalMarkers.reduce((sum, marker) => sum + marker.emotionalAttachment, 0) / region2.culturalMarkers.length;
    const attachmentCompatibility = 100 - (Math.abs(emotionalAttachment1 - emotionalAttachment2) * 15);

    // User's saudade intensity influence
    const saudadeInfluence = userProfile.saudadeProfile.saudadeIntensity >= 7 ? 1.2 : 1.0;

    return Math.round((emigrationSimilarity * 0.4 + familyCompatibility * 0.3 + attachmentCompatibility * 0.3) * saudadeInfluence);
  }

  static calculateEmigrationSimilarity(region1: PortugueseRegion, region2: PortugueseRegion): number {
    // Shared emigration destinations
    const sharedDestinations = region1.emigrationPatterns.primaryDestinations.filter(dest =>
      region2.emigrationPatterns.primaryDestinations.includes(dest)
    );

    const destinationScore = (sharedDestinations.length / Math.max(region1.emigrationPatterns.primaryDestinations.length, region2.emigrationPatterns.primaryDestinations.length)) * 100;

    // Community formation similarity
    const formationCompatibility = region1.emigrationPatterns.communityFormation === region2.emigrationPatterns.communityFormation ? 100 : 60;

    // Generational retention similarity
    const retentionDiff = Math.abs(region1.emigrationPatterns.generationalRetention - region2.emigrationPatterns.generationalRetention);
    const retentionCompatibility = Math.max(0, 100 - (retentionDiff * 15));

    return Math.round((destinationScore * 0.4 + formationCompatibility * 0.3 + retentionCompatibility * 0.3));
  }

  static identifyRegionalStrengths(region1: PortugueseRegion, region2: PortugueseRegion): RegionalStrength[] {
    const strengths: RegionalStrength[] = [];

    // Shared cultural markers
    const sharedMarkers = region1.culturalMarkers.filter(marker1 =>
      region2.culturalMarkers.some(marker2 => marker1.type === marker2.type)
    );

    if (sharedMarkers.length > 0) {
      strengths.push({
        category: 'cultural',
        description: `Shared cultural elements: ${sharedMarkers.map(m => m.name).join(', ')}`,
        impact: 8,
      });
    }

    // Similar family orientation
    if (Math.abs(region1.characteristics.familyOrientation - region2.characteristics.familyOrientation) <= 2) {
      strengths.push({
        category: 'social',
        description: 'Compatible family values and orientation',
        impact: 9,
      });
    }

    // Similar emigration experience
    const sharedDestinations = region1.emigrationPatterns.primaryDestinations.filter(dest =>
      region2.emigrationPatterns.primaryDestinations.includes(dest)
    );

    if (sharedDestinations.length > 0) {
      strengths.push({
        category: 'emotional',
        description: 'Shared emigration experience and understanding',
        impact: 8,
      });
    }

    return strengths;
  }

  static identifyRegionalChallenges(region1: PortugueseRegion, region2: PortugueseRegion): RegionalChallenge[] {
    const challenges: RegionalChallenge[] = [];

    // Dialect differences
    if (region1.dialect.category !== region2.dialect.category) {
      const intelligibility = region1.dialect.mutualIntelligibility[region2.id] || 70;
      if (intelligibility < 80) {
        challenges.push({
          category: 'linguistic',
          description: 'Different regional dialects may cause communication nuances',
          severity: Math.round((100 - intelligibility) / 10),
          mitigationStrategies: [
            'Focus on standard Portuguese',
            'Appreciate dialect differences as cultural richness',
            'Learn about regional linguistic expressions',
          ],
        });
      }
    }

    // Different social styles
    if (region1.characteristics.socialStyle !== region2.characteristics.socialStyle) {
      challenges.push({
        category: 'social',
        description: 'Different social and communication styles',
        severity: 6,
        mitigationStrategies: [
          'Discuss communication preferences openly',
          'Respect different social approaches',
          'Find middle ground in social interactions',
        ],
      });
    }

    // Religious differences
    const religiosityDiff = Math.abs(region1.characteristics.religiosity - region2.characteristics.religiosity);
    if (religiosityDiff >= 3) {
      challenges.push({
        category: 'cultural',
        description: 'Different levels of religious involvement',
        severity: Math.round(religiosityDiff),
        mitigationStrategies: [
          'Respect religious differences',
          'Focus on shared cultural values',
          'Find common spiritual or traditional ground',
        ],
      });
    }

    return challenges;
  }

  static generateRegionalRecommendations(region1: PortugueseRegion, region2: PortugueseRegion): RegionalRecommendation[] {
    const recommendations: RegionalRecommendation[] = [];

    // Cultural exploration
    recommendations.push({
      type: 'cultural',
      title: 'Explore Regional Traditions Together',
      description: `Learn about each other's regional traditions: ${region1.name} and ${region2.name}`,
      priority: 'high',
      culturalDepth: 9,
    });

    // Food exploration
    const foodMarkers1 = region1.culturalMarkers.filter(m => m.type === 'food');
    const foodMarkers2 = region2.culturalMarkers.filter(m => m.type === 'food');
    if (foodMarkers1.length > 0 || foodMarkers2.length > 0) {
      recommendations.push({
        type: 'activity',
        title: 'Regional Food Exchange',
        description: 'Cook and share traditional dishes from both regions',
        priority: 'high',
        culturalDepth: 8,
      });
    }

    // Community events
    if (region1.londonPresence.culturalEvents.length > 0 || region2.londonPresence.culturalEvents.length > 0) {
      recommendations.push({
        type: 'community',
        title: 'Attend Regional Cultural Events',
        description: 'Participate in cultural events from both regional communities in London',
        priority: 'medium',
        culturalDepth: 8,
      });
    }

    // Language and dialect appreciation
    if (region1.dialect.category !== region2.dialect.category) {
      recommendations.push({
        type: 'conversation',
        title: 'Dialect and Language Appreciation',
        description: 'Share and appreciate regional linguistic differences and expressions',
        priority: 'medium',
        culturalDepth: 7,
      });
    }

    return recommendations;
  }

  static identifyCulturalBridges(region1: PortugueseRegion, region2: PortugueseRegion): CulturalBridge[] {
    const bridges: CulturalBridge[] = [];

    // Shared traditions
    region1.traditions.forEach(t1 => {
      const similarTradition = region2.traditions.find(t2 => t1.category === t2.category);
      if (similarTradition) {
        bridges.push({
          type: 'shared_tradition',
          element: `${t1.category} traditions`,
          connectionStrength: Math.round((t1.importance + similarTradition.importance) / 2),
          emotionalResonance: 8,
        });
      }
    });

    // Shared values
    const sharedValues = region1.characteristics.values.filter(value =>
      region2.characteristics.values.includes(value)
    );

    sharedValues.forEach(value => {
      bridges.push({
        type: 'common_value',
        element: value,
        connectionStrength: 9,
        emotionalResonance: 8,
      });
    });

    // Emigration experience
    const sharedDestinations = region1.emigrationPatterns.primaryDestinations.filter(dest =>
      region2.emigrationPatterns.primaryDestinations.includes(dest)
    );

    if (sharedDestinations.length > 0) {
      bridges.push({
        type: 'similar_experience',
        element: `emigration to ${  sharedDestinations.join(', ')}`,
        connectionStrength: 8,
        emotionalResonance: 9,
      });
    }

    return bridges;
  }
}

export default function RegionalSpecializationAI({
  userProfile,
  potentialMatches,
  onRegionalAnalysis,
  focusRegion,
  enableCrossRegionalMatching = true,
  showDetailedAnalytics = false,
}: RegionalSpecializationAIProps) {
  const { language } = useLanguage();
  const [regionalAnalysis, setRegionalAnalysis] = useState<RegionalMatchingResult[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>(focusRegion || userProfile.regionalPreferences[0]?.region || 'lisboa_centro');
  const [crossRegionalEnabled, setCrossRegionalEnabled] = useState(enableCrossRegionalMatching);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<RegionalMatchingResult | null>(null);

  useEffect(() => {
    performRegionalAnalysis();
  }, [userProfile, potentialMatches, selectedRegion, crossRegionalEnabled]);

  const performRegionalAnalysis = async () => {
    setLoading(true);

    const userRegion = selectedRegion;
    const analyses: RegionalMatchingResult[] = [];

    // Analyze each potential match
    potentialMatches.forEach((match, index) => {
      const matchRegion = match.saudadeProfile?.regionalIdentity?.region || 'lisboa_centro';
      
      // Skip if cross-regional matching is disabled and regions don't match
      if (!crossRegionalEnabled && userRegion !== matchRegion) {
        return;
      }

      const analysis = PortugueseRegionalAI.analyzeRegionalCompatibility(
        userRegion,
        matchRegion,
        userProfile
      );

      analyses.push(analysis);
    });

    // Sort by compatibility score
    analyses.sort((a, b) => b.compatibility - a.compatibility);

    setRegionalAnalysis(analyses);
    onRegionalAnalysis(analyses);
    setLoading(false);
  };

  const getRegionDisplayName = (regionId: string) => {
    const region = PortugueseRegionalAI.REGIONS[regionId];
    if (!region) return regionId;
    return language === 'pt' ? region.namePt : region.nameEn;
  };

  const getRegionIcon = (regionId: string) => {
    switch (regionId) {
      case 'minho': return MountainIcon;
      case 'porto_norte': return BuildingLibraryIcon;
      case 'lisboa_centro': return BookOpenIcon;
      case 'acores': case 'madeira': return SunIcon;
      case 'alentejo': return CloudIcon;
      default: return MapPinIcon;
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 55) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-100 rounded-2xl p-6 h-32"></div>
          <div className="bg-gray-100 rounded-2xl p-6 h-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Regional AI Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GlobeSolid className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-primary-900">
            {language === 'pt' ? 'Especialização Regional Inteligente' : 'Intelligent Regional Specialization'}
          </h2>
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <MapPinIcon className="w-4 h-4" />
            {getRegionDisplayName(selectedRegion)}
          </div>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {language === 'pt' 
            ? 'Sistema inteligente que otimiza matches baseado nas especificidades regionais portuguesas e experiências de emigração no Reino Unido'
            : 'Intelligent system that optimizes matches based on Portuguese regional specificities and emigration experiences in the United Kingdom'}
        </p>
      </div>

      {/* Regional Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Configuração Regional' : 'Regional Configuration'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PortugueseRegionalAI.REGIONS).map(([id, region]) => {
                const IconComponent = getRegionIcon(id);
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedRegion(id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedRegion === id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {language === 'pt' ? region.namePt : region.nameEn}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                {language === 'pt' ? 'Matches Inter-Regionais' : 'Cross-Regional Matches'}
              </span>
              <button
                onClick={() => setCrossRegionalEnabled(!crossRegionalEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  crossRegionalEnabled ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    crossRegionalEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Analysis Results */}
      {regionalAnalysis.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {regionalAnalysis.slice(0, 6).map((analysis, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={index * 0.1}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedAnalysis(analysis)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <GlobeAltIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {language === 'pt' ? 'Análise Regional' : 'Regional Analysis'} #{index + 1}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'pt' ? 'Compatibilidade regional detalhada' : 'Detailed regional compatibility'}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getCompatibilityColor(analysis.compatibility)}`}>
                  {analysis.compatibility}%
                </div>
              </div>

              {/* Compatibility Scores */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className={`text-lg font-bold ${getScoreColor(analysis.culturalResonance)}`}>
                    {analysis.culturalResonance}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Ressonância Cultural' : 'Cultural Resonance'}
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className={`text-lg font-bold ${getScoreColor(analysis.saudadeResonance)}`}>
                    {analysis.saudadeResonance}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Ressonância Saudade' : 'Saudade Resonance'}
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className={`text-lg font-bold ${getScoreColor(analysis.dialectCompatibility)}`}>
                    {analysis.dialectCompatibility}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Dialeto' : 'Dialect'}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className={`text-lg font-bold ${getScoreColor(analysis.communityNetworkOverlap)}`}>
                    {analysis.communityNetworkOverlap}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Rede Comunitária' : 'Community Network'}
                  </div>
                </div>
              </div>

              {/* Strengths Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? 'Pontos Fortes Regionais:' : 'Regional Strengths:'}
                </h4>
                <div className="space-y-1">
                  {analysis.strengths.slice(0, 2).map((strength, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-green-700">
                      <StarSolid className="w-3 h-3" />
                      {strength.description.length > 50 ? 
                        `${strength.description.substring(0, 50)  }...` : 
                        strength.description}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Bridges Preview */}
              {analysis.culturalBridges.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {language === 'pt' ? 'Pontes Culturais:' : 'Cultural Bridges:'}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {analysis.culturalBridges.slice(0, 3).map((bridge, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {bridge.element}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Regional Analysis Detail Modal */}
      {selectedAnalysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <GlobeSolid className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-primary-900">
                  {language === 'pt' ? 'Análise Regional Detalhada' : 'Detailed Regional Analysis'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Overall Compatibility */}
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {selectedAnalysis.compatibility}%
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {language === 'pt' ? 'Compatibilidade Regional Geral' : 'Overall Regional Compatibility'}
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedAnalysis.culturalResonance}%
                  </div>
                  <div className="text-sm font-medium text-blue-800">
                    {language === 'pt' ? 'Ressonância Cultural' : 'Cultural Resonance'}
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {selectedAnalysis.saudadeResonance}%
                  </div>
                  <div className="text-sm font-medium text-purple-800">
                    {language === 'pt' ? 'Ressonância de Saudade' : 'Saudade Resonance'}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {selectedAnalysis.dialectCompatibility}%
                  </div>
                  <div className="text-sm font-medium text-green-800">
                    {language === 'pt' ? 'Compatibilidade Dialetal' : 'Dialect Compatibility'}
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {selectedAnalysis.traditionAlignment}%
                  </div>
                  <div className="text-sm font-medium text-orange-800">
                    {language === 'pt' ? 'Alinhamento de Tradições' : 'Tradition Alignment'}
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {selectedAnalysis.communityNetworkOverlap}%
                  </div>
                  <div className="text-sm font-medium text-indigo-800">
                    {language === 'pt' ? 'Sobreposição de Rede' : 'Network Overlap'}
                  </div>
                </div>
              </div>

              {/* Regional Strengths */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-yellow-500" />
                  {language === 'pt' ? 'Pontos Fortes Regionais' : 'Regional Strengths'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAnalysis.strengths.map((strength, idx) => (
                    <div key={idx} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-900 capitalize">
                          {strength.category}
                        </span>
                        <div className="flex">
                          {[...Array(strength.impact)].map((_, i) => (
                            <StarSolid key={i} className="w-3 h-3 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-yellow-800">{strength.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Bridges */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <HandRaisedIcon className="w-5 h-5 text-blue-500" />
                  {language === 'pt' ? 'Pontes Culturais' : 'Cultural Bridges'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAnalysis.culturalBridges.map((bridge, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-900 capitalize">
                          {bridge.type.replace('_', ' ')}
                        </span>
                        <div className="text-xs text-blue-700">
                          {bridge.connectionStrength}/10
                        </div>
                      </div>
                      <p className="text-sm text-blue-800">{bridge.element}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <LightBulbIcon className="w-5 h-5 text-green-500" />
                  {language === 'pt' ? 'Recomendações Regionais' : 'Regional Recommendations'}
                </h4>
                <div className="space-y-3">
                  {selectedAnalysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-green-900">{rec.title}</h5>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-green-800">{rec.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-green-600">
                          {language === 'pt' ? 'Profundidade Cultural:' : 'Cultural Depth:'}
                        </span>
                        <div className="flex">
                          {[...Array(rec.culturalDepth)].map((_, i) => (
                            <HeartSolid key={i} className="w-3 h-3 text-red-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              {selectedAnalysis.challenges.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 text-orange-500" />
                    {language === 'pt' ? 'Desafios e Mitigação' : 'Challenges & Mitigation'}
                  </h4>
                  <div className="space-y-3">
                    {selectedAnalysis.challenges.map((challenge, idx) => (
                      <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-orange-900 capitalize">
                            {challenge.category}
                          </span>
                          <div className="text-xs text-orange-700">
                            {language === 'pt' ? 'Severidade:' : 'Severity:'} {challenge.severity}/10
                          </div>
                        </div>
                        <p className="text-sm text-orange-800 mb-3">{challenge.description}</p>
                        <div>
                          <div className="text-xs font-medium text-orange-700 mb-1">
                            {language === 'pt' ? 'Estratégias de Mitigação:' : 'Mitigation Strategies:'}
                          </div>
                          <div className="space-y-1">
                            {challenge.mitigationStrategies.map((strategy, sIdx) => (
                              <div key={sIdx} className="text-xs text-orange-700 flex items-center gap-2">
                                <SparklesIcon className="w-3 h-3" />
                                {strategy}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
              >
                {language === 'pt' ? 'Aplicar Insights Regionais' : 'Apply Regional Insights'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}