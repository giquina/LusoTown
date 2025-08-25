// 🇵🇹 LusoTown Mobile - Design System Showcase
// Comprehensive examples of Portuguese Cultural Design System implementation

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions
} from 'react-native';

import {
  PortugueseButton,
  HeritageCard,
  CulturalEventCard,
  OnboardingFlow,
  PortugueseTabBar,
  PortugueseHeader,
  PortugueseActionSheet,
  PORTUGUESE_THEME,
  COMPONENT_THEMES,
  CULTURAL_UTILITIES
} from '../index';

import { COLORS, CULTURAL_COLORS } from '../tokens/colors';
import { ICONOGRAPHY } from '../tokens/iconography';
import { IMAGERY } from '../tokens/imagery';
import { CULTURAL_AUTHENTICITY } from '../patterns/CulturalAuthenticity';

import { HeritageCountry, PortugueseEvent } from '../../types';

const { width } = Dimensions.get('window');

/**
 * Design System Showcase
 * 
 * Comprehensive demonstration of all Portuguese Cultural Design System components
 * with real-world usage examples and cultural context.
 */
export function DesignSystemShowcase() {
  // State for interactive examples
  const [selectedHeritage, setSelectedHeritage] = useState<HeritageCountry[]>(['portugal']);
  const [activeTab, setActiveTab] = useState('home');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [currentSection, setCurrentSection] = useState('buttons');

  // Sample data for examples
  const sampleEvent: PortugueseEvent = {
    id: '1',
    title: { en: 'Fado Night at Cultural Centre', pt: 'Noite de Fado no Centro Cultural' },
    description: { 
      en: 'Authentic Portuguese Fado performance with traditional musicians',
      pt: 'Espetáculo autêntico de Fado português com músicos tradicionais'
    },
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    date: '2024-03-15T19:30:00Z',
    location: {
      name: 'Portuguese Cultural Centre',
      address: '123 Heritage Street',
      city: 'London',
      postcode: 'E1 6AN'
    },
    price: 15,
    currency: 'GBP',
    capacity: 100,
    attendeesCount: 67,
    categories: [{
      id: 'music',
      name: { en: 'Music & Fado', pt: 'Música e Fado' },
      icon: '🎵',
      color: '#8B4513'
    }],
    organizer: {
      id: '1',
      name: 'Centro Cultural Português',
      avatar: '',
      isVerified: true
    },
    culturalContext: ['portugal']
  };

  // Navigation tabs configuration
  const tabConfigs = [
    {
      key: 'home',
      icon: 'home-outline' as const,
      iconFocused: 'home' as const,
      label: 'Home',
      labelPortuguese: 'Início',
      culturalIcon: '🏠'
    },
    {
      key: 'events',
      icon: 'calendar-outline' as const,
      iconFocused: 'calendar' as const,
      label: 'Events',
      labelPortuguese: 'Eventos',
      culturalIcon: '🎉'
    },
    {
      key: 'heritage',
      icon: 'flag-outline' as const,
      iconFocused: 'flag' as const,
      label: 'Heritage',
      labelPortuguese: 'Herança',
      culturalIcon: '🇵🇹'
    },
    {
      key: 'community',
      icon: 'people-outline' as const,
      iconFocused: 'people' as const,
      label: 'Community',
      labelPortuguese: 'Comunidade',
      culturalIcon: '👥'
    }
  ];

  // Section navigation - Enhanced with new cultural sections
  const sections = [
    { key: 'colors', title: 'Cultural Colors', titlePt: 'Cores Culturais' },
    { key: 'palop', title: 'PALOP Heritage', titlePt: 'Herança PALOP' },
    { key: 'iconography', title: 'Cultural Icons', titlePt: 'Ícones Culturais' },
    { key: 'buttons', title: 'Portuguese Buttons', titlePt: 'Botões Portugueses' },
    { key: 'heritage', title: 'Heritage Cards', titlePt: 'Cartões de Herança' },
    { key: 'events', title: 'Event Cards', titlePt: 'Cartões de Eventos' },
    { key: 'navigation', title: 'Navigation', titlePt: 'Navegação' },
    { key: 'imagery', title: 'Heritage Imagery', titlePt: 'Imagens da Herança' },
    { key: 'authenticity', title: 'Cultural Authenticity', titlePt: 'Autenticidade Cultural' }
  ];

  const renderSectionSelector = () => (
    <View style={styles.sectionSelector}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sections.map((section) => (
          <PortugueseButton
            key={section.key}
            title={section.titlePt}
            variant={currentSection === section.key ? 'primary' : 'outline'}
            size="small"
            style={styles.sectionButton}
            onPress={() => setCurrentSection(section.key)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderColorsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cores Culturais Portuguesas • Portuguese Cultural Colors</Text>
      
      {/* Primary Portuguese Colors */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Cores Primárias da Herança • Primary Heritage Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: COLORS.portuguese.red[500] }]}>
            <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>Portuguese Red</Text>
            <Text style={[styles.colorCode, { color: '#FFFFFF' }]}>#FF0000</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: COLORS.portuguese.green[500] }]}>
            <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>Heritage Green</Text>
            <Text style={[styles.colorCode, { color: '#FFFFFF' }]}>#2E8B57</Text>
          </View>
          <View style={[styles.colorSwatch, { backgroundColor: COLORS.portuguese.gold[500] }]}>
            <Text style={[styles.colorLabel, { color: '#1F2937' }]}>Portuguese Gold</Text>
            <Text style={[styles.colorCode, { color: '#1F2937' }]}>#FFD700</Text>
          </View>
        </View>
      </View>

      {/* Azulejo Cultural Colors */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Azulejos Tradicionais • Traditional Azulejo Blues</Text>
        <View style={styles.colorRow}>
          {[300, 500, 700].map(shade => (
            <View key={shade} style={[styles.colorSwatch, { backgroundColor: CULTURAL_COLORS.azulejo[shade as keyof typeof CULTURAL_COLORS.azulejo] }]}>
              <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>Azulejo {shade}</Text>
              <Text style={[styles.colorCode, { color: '#FFFFFF' }]}>
                {CULTURAL_COLORS.azulejo[shade as keyof typeof CULTURAL_COLORS.azulejo]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Heritage Country Colors */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Cores das Nações Lusófonas • Lusophone Nations Colors</Text>
        <View style={styles.flagColorsGrid}>
          {[
            { code: 'portugal', name: 'Portugal', flag: '🇵🇹' },
            { code: 'brazil', name: 'Brazil', flag: '🇧🇷' },
            { code: 'capeVerde', name: 'Cape Verde', flag: '🇨🇻' },
            { code: 'angola', name: 'Angola', flag: '🇦🇴' }
          ].map(country => (
            <View key={country.code} style={styles.flagColorItem}>
              <Text style={styles.flagEmoji}>{country.flag}</Text>
              <View style={[
                styles.flagColorSwatch, 
                { backgroundColor: CULTURAL_COLORS.heritage[country.code as keyof typeof CULTURAL_COLORS.heritage] }
              ]} />
              <Text style={styles.flagColorName}>{country.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPALOPSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Herança PALOP • PALOP Heritage Colors</Text>
      <Text style={styles.sectionDescription}>
        Celebrating African Portuguese-speaking nations with authentic cultural colors
      </Text>
      
      {Object.entries(CULTURAL_COLORS.palop).map(([country, colors]) => (
        <View key={country} style={styles.subsection}>
          <Text style={styles.subsectionTitle}>
            {country === 'capeVerde' ? 'Cape Verde 🇨🇻' : 
             country === 'guineaBissau' ? 'Guinea-Bissau 🇬🇼' : 
             country === 'saoTome' ? 'São Tomé 🇸🇹' : 
             country.charAt(0).toUpperCase() + country.slice(1)} {country === 'angola' ? '🇦🇴' : country === 'mozambique' ? '🇲🇿' : ''}
          </Text>
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: colors.primary }]}>
              <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>Primary</Text>
              <Text style={[styles.colorCode, { color: '#FFFFFF' }]}>{colors.primary}</Text>
            </View>
            <View style={[styles.colorSwatch, { backgroundColor: colors.accent }]}>
              <Text style={[
                styles.colorLabel, 
                { color: colors.accent === '#FFD700' ? '#1F2937' : '#FFFFFF' }
              ]}>Accent</Text>
              <Text style={[
                styles.colorCode, 
                { color: colors.accent === '#FFD700' ? '#1F2937' : '#FFFFFF' }
              ]}>{colors.accent}</Text>
            </View>
            <View style={[styles.colorSwatch, { backgroundColor: colors.cultural }]}>
              <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>Cultural</Text>
              <Text style={[styles.colorCode, { color: '#FFFFFF' }]}>{colors.cultural}</Text>
            </View>
          </View>
          <Text style={styles.palopDescription}>
            {country === 'angola' && 'Diamond heritage, Kizomba culture, and modern excellence'}
            {country === 'capeVerde' && 'Island geography, Morna music, and maritime heritage'}
            {country === 'mozambique' && 'Coastal spices, Indian Ocean heritage, and cultural fusion'}
            {country === 'guineaBissau' && 'Community arts, cultural preservation, and traditional knowledge'}
            {country === 'saoTome' && 'Cocoa paradise, tropical culture, and island hospitality'}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderIconographySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Iconografia Cultural • Cultural Iconography</Text>
      <Text style={styles.sectionDescription}>
        24px standard sizing with authentic Portuguese cultural representation
      </Text>
      
      {/* Heritage Flags */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Bandeiras das Nações • Heritage Flags</Text>
        <View style={styles.flagGrid}>
          {[
            { code: 'portugal', name: 'Portugal', flag: '🇵🇹' },
            { code: 'brazil', name: 'Brazil', flag: '🇧🇷' },
            { code: 'angola', name: 'Angola', flag: '🇦🇴' },
            { code: 'capeVerde', name: 'Cape Verde', flag: '🇨🇻' },
            { code: 'mozambique', name: 'Mozambique', flag: '🇲🇿' },
            { code: 'guineaBissau', name: 'Guinea-Bissau', flag: '🇬🇼' },
            { code: 'eastTimor', name: 'East Timor', flag: '🇹🇱' },
            { code: 'saoTome', name: 'São Tomé', flag: '🇸🇹' }
          ].map(country => (
            <View key={country.code} style={styles.flagItem}>
              <Text style={styles.flagIconLarge}>{country.flag}</Text>
              <Text style={styles.flagNameSmall}>{country.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cultural Heritage Icons */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Ícones da Herança • Heritage Icons</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.azulejo[500] }]}>
              <Text style={styles.iconPlaceholder}>🏰</Text>
            </View>
            <Text style={styles.iconLabel}>Castelo</Text>
          </View>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.celebration.fado }]}>
              <Text style={styles.iconPlaceholder}>🎸</Text>
            </View>
            <Text style={styles.iconLabel}>Fado Guitar</Text>
          </View>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.celebration.kizomba }]}>
              <Text style={styles.iconPlaceholder}>💃</Text>
            </View>
            <Text style={styles.iconLabel}>Kizomba</Text>
          </View>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.palop.capeVerde.primary }]}>
              <Text style={styles.iconPlaceholder}>🎵</Text>
            </View>
            <Text style={styles.iconLabel}>Morna</Text>
          </View>
        </View>
      </View>

      {/* PALOP Cultural Icons */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Ícones PALOP • PALOP Cultural Icons</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.palop.angola.accent }]}>
              <Text style={styles.iconPlaceholder}>💎</Text>
            </View>
            <Text style={styles.iconLabel}>Angola Diamonds</Text>
          </View>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.palop.capeVerde.accent }]}>
              <Text style={styles.iconPlaceholder}>🏝️</Text>
            </View>
            <Text style={styles.iconLabel}>Cape Verde Islands</Text>
          </View>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.palop.mozambique.accent }]}>
              <Text style={styles.iconPlaceholder}>🌶️</Text>
            </View>
            <Text style={styles.iconLabel}>Peri-peri</Text>
          </View>
          <View style={styles.iconShowcaseItem}>
            <View style={[styles.iconContainer, { backgroundColor: CULTURAL_COLORS.palop.saoTome.accent }]}>
              <Text style={styles.iconPlaceholder}>🍫</Text>
            </View>
            <Text style={styles.iconLabel}>São Tomé Cocoa</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderImagerySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Imagens da Herança • Heritage Imagery</Text>
      <Text style={styles.sectionDescription}>
        High-quality photography standards for authentic cultural representation
      </Text>
      
      {/* Photography Standards */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Padrões de Fotografia • Photography Standards</Text>
        <View style={styles.standardsList}>
          <Text style={styles.standardItem}>✅ Authentic Portuguese-speaking communities</Text>
          <Text style={styles.standardItem}>✅ Professional quality with cultural pride</Text>
          <Text style={styles.standardItem}>✅ Diverse heritage representation</Text>
          <Text style={styles.standardItem}>✅ Contemporary success stories</Text>
          <Text style={styles.standardItem}>✅ Cultural dignity and respect</Text>
        </View>
      </View>

      {/* PALOP Business Excellence Examples */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Excelência Empresarial PALOP • PALOP Business Excellence</Text>
        <View style={styles.businessGrid}>
          <View style={styles.businessShowcaseCard}>
            <View style={[styles.businessImagePlaceholder, { backgroundColor: CULTURAL_COLORS.palop.angola.accent }]}>
              <Text style={styles.businessEmoji}>💎</Text>
            </View>
            <Text style={styles.businessTitle}>Elite Angolan Diamonds</Text>
            <Text style={styles.businessDescription}>Premium luxury jewelry showcasing Angola's diamond excellence</Text>
          </View>
          
          <View style={styles.businessShowcaseCard}>
            <View style={[styles.businessImagePlaceholder, { backgroundColor: CULTURAL_COLORS.palop.capeVerde.accent }]}>
              <Text style={styles.businessEmoji}>🎵</Text>
            </View>
            <Text style={styles.businessTitle}>Morna Soul Academy</Text>
            <Text style={styles.businessDescription}>Authentic Cape Verdean music education preserving island culture</Text>
          </View>
        </View>
      </View>

      {/* Mobile Optimization */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Otimização Móvel • Mobile Optimization</Text>
        <View style={styles.optimizationGrid}>
          <View style={styles.optimizationItem}>
            <Text style={styles.optimizationTitle}>Hero Images</Text>
            <Text style={styles.optimizationSpec}>375×200px @ 85%</Text>
          </View>
          <View style={styles.optimizationItem}>
            <Text style={styles.optimizationTitle}>Business Cards</Text>
            <Text style={styles.optimizationSpec}>343×200px @ 80%</Text>
          </View>
          <View style={styles.optimizationItem}>
            <Text style={styles.optimizationTitle}>Profiles</Text>
            <Text style={styles.optimizationSpec}>120×120px @ 80%</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAuthenticitySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Autenticidade Cultural • Cultural Authenticity</Text>
      <Text style={styles.sectionDescription}>
        Comprehensive validation system ensuring respectful Portuguese heritage representation
      </Text>
      
      {/* Core Cultural Values */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Valores Culturais Fundamentais • Core Cultural Values</Text>
        <View style={styles.valuesList}>
          <Text style={styles.valueItem}>🤝 <Text style={styles.valueTerm}>Hospitalidade</Text> - Warm Portuguese hospitality</Text>
          <Text style={styles.valueItem}>💙 <Text style={styles.valueTerm}>Saudade</Text> - Deep cultural longing and connection</Text>
          <Text style={styles.valueItem}>👨‍👩‍👧‍👦 <Text style={styles.valueTerm}>Família</Text> - Strong family and community bonds</Text>
          <Text style={styles.valueItem}>🎉 <Text style={styles.valueTerm}>Alegria</Text> - Celebration of life and culture</Text>
          <Text style={styles.valueItem}>🏆 <Text style={styles.valueTerm}>Orgulho</Text> - Cultural pride and heritage celebration</Text>
        </View>
      </View>

      {/* PALOP Cultural Values */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Valores Culturais PALOP • PALOP Cultural Values</Text>
        <View style={styles.palopValues}>
          <View style={styles.palopValueCard}>
            <Text style={styles.palopCountryTitle}>Angola 🇦🇴</Text>
            <Text style={styles.palopValueDescription}>Resistência, Riqueza Cultural, Dança</Text>
          </View>
          <View style={styles.palopValueCard}>
            <Text style={styles.palopCountryTitle}>Cape Verde 🇨🇻</Text>
            <Text style={styles.palopValueDescription}>Morabeza, Sodade, Música</Text>
          </View>
          <View style={styles.palopValueCard}>
            <Text style={styles.palopCountryTitle}>Mozambique 🇲🇿</Text>
            <Text style={styles.palopValueDescription}>Unidade, Costa, Fusão Cultural</Text>
          </View>
        </View>
      </View>

      {/* Authenticity Checklist */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Lista de Verificação • Authenticity Checklist</Text>
        <View style={styles.checklistContainer}>
          <View style={styles.checklistSection}>
            <Text style={styles.checklistTitle}>Visual Design</Text>
            {CULTURAL_AUTHENTICITY.checklist.visual_design.slice(0, 3).map((item, index) => (
              <Text key={index} style={styles.checklistItem}>{item}</Text>
            ))}
          </View>
          <View style={styles.checklistSection}>
            <Text style={styles.checklistTitle}>Content</Text>
            {CULTURAL_AUTHENTICITY.checklist.content.slice(0, 3).map((item, index) => (
              <Text key={index} style={styles.checklistItem}>{item}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderButtonsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Botões Portugueses • Portuguese Buttons</Text>
      
      {/* Button Variants */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Variantes • Variants</Text>
        
        <PortugueseButton
          title="Primário • Primary"
          variant="primary"
          size="medium"
          icon="heart"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Primary Button', 'Portuguese primary action!')}
        />
        
        <PortugueseButton
          title="Secundário • Secondary"
          variant="secondary"
          size="medium"
          icon="checkmark-circle"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Secondary Button', 'Portuguese secondary action!')}
        />
        
        <PortugueseButton
          title="Herança • Heritage"
          variant="heritage"
          size="medium"
          icon="flag"
          culturalContext="portugal"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Heritage Button', 'Portuguese heritage action!')}
        />
        
        <PortugueseButton
          title="Cultural • Cultural"
          variant="cultural"
          size="medium"
          icon="star"
          culturalContext="brazil"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Cultural Button', 'Brazilian cultural action!')}
        />
      </View>

      {/* Button Sizes */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Tamanhos • Sizes</Text>
        
        <PortugueseButton
          title="Pequeno • Small"
          variant="outline"
          size="small"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Small Button')}
        />
        
        <PortugueseButton
          title="Médio • Medium"
          variant="outline"
          size="medium"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Medium Button')}
        />
        
        <PortugueseButton
          title="Grande • Large"
          variant="outline"
          size="large"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Large Button')}
        />
        
        <PortugueseButton
          title="Extra Grande • Extra Large"
          variant="outline"
          size="xlarge"
          style={styles.exampleButton}
          onPress={() => Alert.alert('Extra Large Button')}
        />
      </View>

      {/* Cultural Context Examples */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Contexto Cultural • Cultural Context</Text>
        
        {['portugal', 'brazil', 'cape-verde', 'angola'].map((country) => (
          <PortugueseButton
            key={country}
            title={`${CULTURAL_UTILITIES.getHeritageFlag(country)} ${country.charAt(0).toUpperCase() + country.slice(1)}`}
            variant="cultural"
            size="medium"
            culturalContext={country}
            style={styles.exampleButton}
            onPress={() => Alert.alert(`${country} Cultural Button`)}
          />
        ))}
      </View>
    </View>
  );

  const renderHeritageSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cartões de Herança • Heritage Cards</Text>
      
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Seleção de Herança • Heritage Selection</Text>
        
        <View style={styles.heritageGrid}>
          {(['portugal', 'brazil', 'cape-verde', 'angola'] as HeritageCountry[]).map((heritage) => (
            <HeritageCard
              key={heritage}
              heritage={heritage}
              selected={selectedHeritage.includes(heritage)}
              size="medium"
              showDescription={true}
              language="pt"
              style={styles.heritageCardExample}
              onPress={(selectedHeritage) => {
                setSelectedHeritage(prev => 
                  prev.includes(selectedHeritage)
                    ? prev.filter(h => h !== selectedHeritage)
                    : [...prev, selectedHeritage]
                );
              }}
            />
          ))}
        </View>
      </View>

      {/* Different Heritage Card Sizes */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Tamanhos • Sizes</Text>
        
        <View style={styles.heritageSizeRow}>
          <HeritageCard
            heritage="portugal"
            selected={true}
            size="small"
            style={styles.heritageSizeExample}
            onPress={() => {}}
          />
          
          <HeritageCard
            heritage="brazil"
            selected={true}
            size="medium"
            style={styles.heritageSizeExample}
            onPress={() => {}}
          />
          
          <HeritageCard
            heritage="cape-verde"
            selected={true}
            size="large"
            style={styles.heritageSizeExample}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );

  const renderEventsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cartões de Eventos • Event Cards</Text>
      
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Layouts de Eventos • Event Layouts</Text>
        
        {/* Featured Event Card */}
        <CulturalEventCard
          event={sampleEvent}
          layout="featured"
          language="pt"
          showCulturalContext={true}
          showCategories={true}
          showAttendeesCount={true}
          showPrice={true}
          style={styles.eventCardExample}
          onPress={(event) => Alert.alert('Event Details', `Opening ${event.title.pt}`)}
          onAttend={(event) => Alert.alert('Attend Event', `Joining ${event.title.pt}`)}
          onToggleFavorite={(event) => Alert.alert('Toggle Favorite', `Favorited ${event.title.pt}`)}
        />
        
        {/* Standard Event Card */}
        <CulturalEventCard
          event={{
            ...sampleEvent,
            title: { en: 'Brazilian Food Festival', pt: 'Festival de Comida Brasileira' },
            culturalContext: ['brazil'],
            categories: [{
              id: 'food',
              name: { en: 'Food & Cuisine', pt: 'Comida e Culinária' },
              icon: '🍽️',
              color: '#FF6B35'
            }]
          }}
          layout="standard"
          language="pt"
          style={styles.eventCardExample}
          onPress={(event) => Alert.alert('Event Details', `Opening ${event.title.pt}`)}
        />
        
        {/* Compact Event Card */}
        <CulturalEventCard
          event={{
            ...sampleEvent,
            title: { en: 'Portuguese Language Class', pt: 'Aula de Português' },
            culturalContext: ['portugal'],
            categories: [{
              id: 'education',
              name: { en: 'Education', pt: 'Educação' },
              icon: '📚',
              color: '#3498DB'
            }]
          }}
          layout="compact"
          language="pt"
          style={styles.eventCardExample}
          onPress={(event) => Alert.alert('Event Details', `Opening ${event.title.pt}`)}
        />
      </View>
    </View>
  );

  const renderNavigationSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Navegação • Navigation</Text>
      
      {/* Portuguese Header Example */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Cabeçalho • Header</Text>
        
        <PortugueseHeader
          title="Events"
          titlePortuguese="Eventos"
          leftButton={{
            icon: 'menu',
            onPress: () => Alert.alert('Menu', 'Opening navigation menu'),
            accessibilityLabel: 'Abrir menu'
          }}
          rightButton={{
            icon: 'notifications',
            onPress: () => Alert.alert('Notifications', 'Opening notifications'),
            accessibilityLabel: 'Notificações',
            badgeCount: 3
          }}
          culturalContext="portugal"
          style={styles.headerExample}
        />
      </View>

      {/* Portuguese Tab Bar Example */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Barra de Abas • Tab Bar</Text>
        
        <PortugueseTabBar
          activeTab={activeTab}
          tabs={tabConfigs}
          onTabChange={setActiveTab}
          badgeCounts={{ events: 5, heritage: 2 }}
          style={styles.tabBarExample}
        />
      </View>

      {/* Action Sheet Trigger */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Folha de Ações • Action Sheet</Text>
        
        <PortugueseButton
          title="Abrir Ações • Open Actions"
          variant="outline"
          onPress={() => setShowActionSheet(true)}
          style={styles.exampleButton}
        />
      </View>
    </View>
  );

  const renderPatternsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Padrões de Interface • UI Patterns</Text>
      
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Temas Culturais • Cultural Themes</Text>
        
        {/* Portuguese Theme Example */}
        <View style={[styles.themeExample, { backgroundColor: PORTUGUESE_THEME.colors.primary + '10' }]}>
          <Text style={[styles.themeTitle, { color: PORTUGUESE_THEME.colors.primary }]}>
            Tema Português • Portuguese Theme
          </Text>
          <Text style={styles.themeDescription}>
            Cores da bandeira portuguesa com contexto cultural autêntico.
          </Text>
          <PortugueseButton
            title="Exemplo • Example"
            variant="primary"
            size="small"
            onPress={() => Alert.alert('Portuguese Theme')}
          />
        </View>

        {/* Heritage Theme Example */}
        <View style={[styles.themeExample, { backgroundColor: COMPONENT_THEMES.heritage.colors.selectedBackground }]}>
          <Text style={[styles.themeTitle, { color: COMPONENT_THEMES.heritage.colors.selectedText }]}>
            Tema de Herança • Heritage Theme
          </Text>
          <Text style={styles.themeDescription}>
            Tema especial para seleção e contexto cultural de herança.
          </Text>
          <PortugueseButton
            title="Herança • Heritage"
            variant="heritage"
            size="small"
            onPress={() => Alert.alert('Heritage Theme')}
          />
        </View>
      </View>

      {/* Cultural Utilities Example */}
      <View style={styles.subsection}>
        <Text style={styles.subsectionTitle}>Utilidades Culturais • Cultural Utilities</Text>
        
        <View style={styles.utilitiesExample}>
          <Text style={styles.utilityTitle}>Bandeiras de Herança • Heritage Flags</Text>
          <View style={styles.flagsRow}>
            {['portugal', 'brazil', 'cape-verde', 'angola'].map(country => (
              <View key={country} style={styles.flagExample}>
                <Text style={styles.flagEmoji}>{CULTURAL_UTILITIES.getHeritageFlag(country)}</Text>
                <Text style={styles.flagLabel}>{country}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'colors':
        return renderColorsSection();
      case 'palop':
        return renderPALOPSection();
      case 'iconography':
        return renderIconographySection();
      case 'buttons':
        return renderButtonsSection();
      case 'heritage':
        return renderHeritageSection();
      case 'events':
        return renderEventsSection();
      case 'navigation':
        return renderNavigationSection();
      case 'imagery':
        return renderImagerySection();
      case 'authenticity':
        return renderAuthenticitySection();
      default:
        return renderColorsSection(); // Default to colors showcase
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PortugueseHeader
        title="Design System"
        titlePortuguese="Sistema de Design"
        leftButton={{
          icon: 'arrow-back',
          onPress: () => Alert.alert('Back', 'Navigate back'),
          accessibilityLabel: 'Voltar'
        }}
        culturalContext="heritage"
      />

      {renderSectionSelector()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentSection()}
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🇵🇹 Sistema de Design Cultural Português para LusoTown Mobile
          </Text>
          <Text style={styles.footerSubtext}>
            Portuguese Cultural Design System for LusoTown Mobile
          </Text>
        </View>
      </ScrollView>

      {/* Action Sheet */}
      <PortugueseActionSheet
        visible={showActionSheet}
        title="Ações do Evento"
        titlePortuguese="Event Actions"
        items={[
          {
            key: 'attend',
            title: 'Attend Event',
            titlePortuguese: 'Participar no Evento',
            icon: 'calendar',
            culturalIcon: '🎉',
            onPress: () => {
              setShowActionSheet(false);
              Alert.alert('Attend', 'Attending event!');
            }
          },
          {
            key: 'favorite',
            title: 'Add to Favorites',
            titlePortuguese: 'Adicionar aos Favoritos',
            icon: 'heart',
            culturalIcon: '❤️',
            onPress: () => {
              setShowActionSheet(false);
              Alert.alert('Favorite', 'Added to favorites!');
            }
          },
          {
            key: 'share',
            title: 'Share Event',
            titlePortuguese: 'Partilhar Evento',
            icon: 'share',
            culturalIcon: '📱',
            onPress: () => {
              setShowActionSheet(false);
              Alert.alert('Share', 'Sharing event!');
            }
          },
          {
            key: 'delete',
            title: 'Delete Event',
            titlePortuguese: 'Eliminar Evento',
            icon: 'trash',
            destructive: true,
            onPress: () => {
              setShowActionSheet(false);
              Alert.alert('Delete', 'Event deleted!');
            }
          }
        ]}
        onCancel={() => setShowActionSheet(false)}
        cancelText="Cancelar"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PORTUGUESE_THEME.colors.background,
  },
  sectionSelector: {
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: PORTUGUESE_THEME.colors.border,
    paddingVertical: PORTUGUESE_THEME.spacing.md,
  },
  sectionButton: {
    marginLeft: PORTUGUESE_THEME.spacing.md,
    marginRight: PORTUGUESE_THEME.spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: PORTUGUESE_THEME.spacing.lg,
  },
  section: {
    marginBottom: PORTUGUESE_THEME.spacing['2xl'],
  },
  sectionTitle: {
    ...PORTUGUESE_THEME.typography.headingLarge,
    color: PORTUGUESE_THEME.colors.text,
    marginTop: PORTUGUESE_THEME.spacing.xl,
    marginBottom: PORTUGUESE_THEME.spacing.lg,
    textAlign: 'center',
  },
  subsection: {
    marginBottom: PORTUGUESE_THEME.spacing.xl,
  },
  subsectionTitle: {
    ...PORTUGUESE_THEME.typography.headingSmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  exampleButton: {
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  heritageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  heritageCardExample: {
    width: (width - (PORTUGUESE_THEME.spacing.lg * 2) - PORTUGUESE_THEME.spacing.sm) / 2,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  heritageSizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heritageSizeExample: {
    marginHorizontal: PORTUGUESE_THEME.spacing.xs,
  },
  eventCardExample: {
    marginBottom: PORTUGUESE_THEME.spacing.lg,
  },
  headerExample: {
    marginBottom: PORTUGUESE_THEME.spacing.md,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
  },
  tabBarExample: {
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  themeExample: {
    padding: PORTUGUESE_THEME.spacing.lg,
    borderRadius: PORTUGUESE_THEME.borderRadius.large,
    marginBottom: PORTUGUESE_THEME.spacing.md,
    ...PORTUGUESE_THEME.shadows.small,
  },
  themeTitle: {
    ...PORTUGUESE_THEME.typography.headingSmall,
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  themeDescription: {
    ...PORTUGUESE_THEME.typography.bodySmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  utilitiesExample: {
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    padding: PORTUGUESE_THEME.spacing.lg,
    borderRadius: PORTUGUESE_THEME.borderRadius.large,
    ...PORTUGUESE_THEME.shadows.small,
  },
  utilityTitle: {
    ...PORTUGUESE_THEME.typography.labelLarge,
    color: PORTUGUESE_THEME.colors.text,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  flagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flagExample: {
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 32,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
  },
  flagLabel: {
    ...PORTUGUESE_THEME.typography.caption,
    color: PORTUGUESE_THEME.colors.textSecondary,
    textTransform: 'capitalize',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: PORTUGUESE_THEME.spacing['2xl'],
    marginTop: PORTUGUESE_THEME.spacing.xl,
  },
  footerText: {
    ...PORTUGUESE_THEME.typography.bodyMedium,
    color: PORTUGUESE_THEME.colors.primary,
    textAlign: 'center',
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  footerSubtext: {
    ...PORTUGUESE_THEME.typography.bodySmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    textAlign: 'center',
  },

  // New Cultural Design System Styles
  sectionDescription: {
    ...PORTUGUESE_THEME.typography.bodyMedium,
    color: PORTUGUESE_THEME.colors.textSecondary,
    textAlign: 'center',
    marginBottom: PORTUGUESE_THEME.spacing.lg,
    lineHeight: 22,
  },

  // Color Showcase Styles
  colorRow: {
    flexDirection: 'row',
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  colorSwatch: {
    flex: 1,
    height: 80,
    marginRight: PORTUGUESE_THEME.spacing.sm,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  colorCode: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  flagColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flagColorItem: {
    alignItems: 'center',
    width: (width - (PORTUGUESE_THEME.spacing.lg * 2)) / 4 - PORTUGUESE_THEME.spacing.sm,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  flagEmoji: {
    fontSize: 24,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
  },
  flagColorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  flagColorName: {
    fontSize: 10,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
  },

  // PALOP Section Styles
  palopDescription: {
    ...PORTUGUESE_THEME.typography.bodySmall,
    color: PORTUGUESE_THEME.colors.textSecondary,
    fontStyle: 'italic',
    marginTop: PORTUGUESE_THEME.spacing.sm,
    textAlign: 'center',
  },

  // Iconography Styles
  flagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flagItem: {
    alignItems: 'center',
    width: (width - (PORTUGUESE_THEME.spacing.lg * 2)) / 4 - PORTUGUESE_THEME.spacing.xs,
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  flagIconLarge: {
    fontSize: 32,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
  },
  flagNameSmall: {
    fontSize: 9,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconShowcaseItem: {
    alignItems: 'center',
    width: (width - (PORTUGUESE_THEME.spacing.lg * 2)) / 4 - PORTUGUESE_THEME.spacing.xs,
    marginBottom: PORTUGUESE_THEME.spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: PORTUGUESE_THEME.spacing.sm,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  iconPlaceholder: {
    fontSize: 24,
  },
  iconLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: PORTUGUESE_THEME.colors.textSecondary,
    fontWeight: '500',
  },

  // Imagery Section Styles
  standardsList: {
    marginTop: PORTUGUESE_THEME.spacing.sm,
  },
  standardItem: {
    fontSize: 14,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: PORTUGUESE_THEME.spacing.sm,
    lineHeight: 20,
  },
  businessGrid: {
    flexDirection: 'row',
    marginTop: PORTUGUESE_THEME.spacing.md,
  },
  businessShowcaseCard: {
    flex: 1,
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    padding: PORTUGUESE_THEME.spacing.lg,
    marginRight: PORTUGUESE_THEME.spacing.sm,
    borderRadius: PORTUGUESE_THEME.borderRadius.large,
    ...PORTUGUESE_THEME.shadows.small,
  },
  businessImagePlaceholder: {
    height: 80,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: PORTUGUESE_THEME.spacing.md,
  },
  businessEmoji: {
    fontSize: 32,
  },
  businessTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: PORTUGUESE_THEME.colors.text,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
  },
  businessDescription: {
    fontSize: 12,
    color: PORTUGUESE_THEME.colors.textSecondary,
    lineHeight: 16,
  },
  optimizationGrid: {
    flexDirection: 'row',
    marginTop: PORTUGUESE_THEME.spacing.md,
  },
  optimizationItem: {
    flex: 1,
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    padding: PORTUGUESE_THEME.spacing.md,
    marginRight: PORTUGUESE_THEME.spacing.xs,
    borderRadius: PORTUGUESE_THEME.borderRadius.medium,
    alignItems: 'center',
  },
  optimizationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: PORTUGUESE_THEME.colors.text,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
    textAlign: 'center',
  },
  optimizationSpec: {
    fontSize: 10,
    color: PORTUGUESE_THEME.colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'monospace',
  },

  // Authenticity Section Styles
  valuesList: {
    marginTop: PORTUGUESE_THEME.spacing.sm,
  },
  valueItem: {
    fontSize: 14,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: PORTUGUESE_THEME.spacing.md,
    lineHeight: 20,
  },
  valueTerm: {
    fontWeight: '600',
    color: PORTUGUESE_THEME.colors.text,
  },
  palopValues: {
    marginTop: PORTUGUESE_THEME.spacing.sm,
  },
  palopValueCard: {
    backgroundColor: PORTUGUESE_THEME.colors.surface,
    padding: PORTUGUESE_THEME.spacing.lg,
    borderRadius: PORTUGUESE_THEME.borderRadius.large,
    marginBottom: PORTUGUESE_THEME.spacing.md,
    ...PORTUGUESE_THEME.shadows.small,
  },
  palopCountryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PORTUGUESE_THEME.colors.text,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
  },
  palopValueDescription: {
    fontSize: 14,
    color: PORTUGUESE_THEME.colors.textSecondary,
    fontStyle: 'italic',
  },
  checklistContainer: {
    flexDirection: 'row',
    marginTop: PORTUGUESE_THEME.spacing.md,
  },
  checklistSection: {
    flex: 1,
    marginRight: PORTUGUESE_THEME.spacing.md,
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: PORTUGUESE_THEME.colors.text,
    marginBottom: PORTUGUESE_THEME.spacing.sm,
  },
  checklistItem: {
    fontSize: 11,
    color: PORTUGUESE_THEME.colors.textSecondary,
    marginBottom: PORTUGUESE_THEME.spacing.xs,
    lineHeight: 16,
  },
});

export default DesignSystemShowcase;