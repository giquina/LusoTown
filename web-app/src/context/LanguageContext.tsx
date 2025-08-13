'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'pt'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.events': 'Events',
    'nav.how-it-works': 'How It Works',
    'nav.community': 'Community',
    'nav.community-guidelines': 'Community Guidelines',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.join-community': 'Join Community',
    
    // Hero Section
    'hero.badge': "Unidos pela Língua • United by Language",
    'hero.title': 'Connect. Celebrate. Community.',
    'hero.subtitle': 'Your home for Portuguese culture in the UK. Find events, make friends, celebrate heritage.',
    'hero.cta.primary': 'JOIN OUR COMMUNITY',
    'hero.cta.secondary': 'EXPLORE EVENTS',
    
    // Features
    'features.title': 'Why Choose LusoTown',
    'features.subtitle': 'Your Connection Hub for Portuguese Communities Across the UK',
    'features.events.title': 'Cultural Events & Gatherings',
    'features.events.description': 'From Fado nights to cultural festivals, traditional celebrations to Portuguese community gatherings - discover and join events across the UK. Events welcoming all ages and generations.',
    'features.groups.title': 'Portuguese Communities',
    'features.groups.description': 'Connect with Portuguese speakers who share your interests - from cultural preservation to social activities. Make genuine friendships across the UK with individuals of all ages.',
    'features.business.title': 'Portuguese Business Network',
    'features.business.description': 'Discover Portuguese-owned businesses, restaurants, and services across the UK. Support our community and find places where our culture is celebrated.',
    'features.resources.title': 'Community Resources',
    'features.resources.description': 'Access language exchange programs, cultural workshops, community support, and local meetups. Connect with your Portuguese heritage wherever you are.',
    'features.stories.title': 'Community Stories',
    'features.stories.description': 'Real stories from Portuguese speakers who found their community, preserved their culture, and built meaningful connections through our global platform.',
    'features.local.title': 'Local Communities',
    'features.local.description': 'Connect with Portuguese speakers in your city or region. Find local communities, cultural centers, and Portuguese-speaking groups near you.',
    'features.culture.title': 'Cultural Heritage',
    'features.culture.description': 'Celebrate and preserve Portuguese traditions, music, and customs. From Fado nights to traditional festivals, keep our culture alive.',
    'features.language.title': 'Language Exchange',
    'features.language.description': 'Practice Portuguese with native speakers and help others learn English. Build connections through language learning.',
    'features.heritage.title': 'Heritage Connection',
    'features.heritage.description': 'Connect with your Portuguese roots and share stories with others who understand the journey of preserving culture abroad.',
    
    // Testimonials
    'testimonials.badge': 'Real Stories, Real Connections',
    'testimonials.title': 'Meet Your Global Portuguese Community',
    'testimonials.subtitle': 'Hear from Portuguese speakers who found their community, preserved their heritage, and built lasting connections worldwide',
    
    // Footer
    'footer.description': 'The platform for Portuguese-speaking communities across the UK. Connect with your Portuguese heritage, find local communities, attend cultural events, and build meaningful friendships. Open to all ages. Unidos pela Língua - United by Language.',
    'footer.newsletter.title': 'Stay Connected',
    'footer.newsletter.description': 'Get updates on Portuguese cultural events, community news, and gatherings happening across the UK.',
    'footer.tagline': 'Connecting Portuguese hearts across the UK',
    'footer.bottom': 'Unidos pela Língua • UK Community',
    
    // About Page
    'about.hero.badge': 'Unidos pela Língua • United by Language',
    'about.hero.title': 'About LusoTown',
    'about.mission.title': 'Nossa Missão: Preservar a Cultura, Conectar Corações',
    'about.mission.subtitle': 'Our Mission: Preserve Culture, Connect Hearts',
    
    // Language Toggle
    'language.switch-to-portuguese': 'Português',
    'language.switch-to-english': 'English',
  },
  pt: {
    // Navigation
    'nav.events': 'Eventos',
    'nav.how-it-works': 'Como Funciona',
    'nav.community': 'Comunidade',
    'nav.community-guidelines': 'Diretrizes da Comunidade',
    'nav.pricing': 'Preços',
    'nav.about': 'Sobre',
    'nav.contact': 'Contacto',
    'nav.login': 'Entrar',
    'nav.join-community': 'Juntar à Comunidade',
    
    // Hero Section
    'hero.badge': 'Unidos pela Língua • United by Language',
    'hero.title': 'Conectar. Celebrar. Comunidade.',
    'hero.subtitle': 'A tua casa para a cultura portuguesa no Reino Unido. Encontra eventos, faz amigos, celebra a herança.',
    'hero.cta.primary': 'JUNTAR À COMUNIDADE',
    'hero.cta.secondary': 'EXPLORAR EVENTOS',
    
    // Features
    'features.title': 'Porquê Escolher a LusoTown',
    'features.subtitle': 'O Teu Centro de Conexões para Comunidades Portuguesas no Reino Unido',
    'features.events.title': 'Eventos Culturais & Encontros',
    'features.events.description': 'Desde noites de Fado a festivais culturais, celebrações tradicionais a encontros comunitários portugueses - descobre e participa em eventos por todo o Reino Unido. Eventos abertos a todas as idades, com requisitos de idade específicos indicados por evento.',
    'features.groups.title': 'Comunidades Portuguesas',
    'features.groups.description': 'Conecta-te com falantes de português que partilham os teus interesses - desde preservação cultural a atividades sociais. Faz amizades genuínas por todo o Reino Unido com indivíduos de todas as idades.',
    'features.business.title': 'Rede de Negócios Portugueses',
    'features.business.description': 'Descobre negócios portugueses, restaurantes e serviços por todo o Reino Unido. Apoia a nossa comunidade e encontra locais onde a nossa cultura é celebrada.',
    'features.resources.title': 'Recursos Comunitários',
    'features.resources.description': 'Acede a programas de intercâmbio linguístico, workshops culturais, apoio comunitário e encontros locais. Conecta-te com a tua herança portuguesa onde quer que estejas.',
    'features.stories.title': 'Histórias da Comunidade',
    'features.stories.description': 'Histórias reais de falantes de português que encontraram a sua comunidade, preservaram a sua cultura e construíram conexões significativas através da nossa plataforma global.',
    'features.local.title': 'Comunidades Locais',
    'features.local.description': 'Conecta-te com falantes de português na tua cidade ou região. Encontra comunidades locais, centros culturais e grupos portugueses perto de ti.',
    'features.culture.title': 'Herança Cultural',
    'features.culture.description': 'Celebra e preserva as tradições, música e costumes portugueses. Desde noites de Fado a festivais tradicionais, mantém a nossa cultura viva.',
    'features.language.title': 'Intercâmbio Linguístico',
    'features.language.description': 'Pratica português com falantes nativos e ajuda outros a aprender inglês. Constrói conexões através da aprendizagem de línguas.',
    'features.heritage.title': 'Conexão da Herança',
    'features.heritage.description': 'Conecta-te com as tuas raízes portuguesas e partilha histórias com outros que entendem a jornada de preservar a cultura no estrangeiro.',
    
    // Testimonials
    'testimonials.badge': 'Histórias Reais, Conexões Reais',
    'testimonials.title': 'Conhece a Tua Comunidade Portuguesa Global',
    'testimonials.subtitle': 'Ouve falantes de português que encontraram a sua comunidade, preservaram a sua herança e construíram conexões duradouras pelo mundo',
    
    // Footer
    'footer.description': 'A plataforma para comunidades de fala portuguesa no Reino Unido. Conecta-te com a tua herança portuguesa, encontra comunidades locais, participa em eventos culturais e constrói amizades significativas. Aberto a todas as idades. Unidos pela Língua - United by Language.',
    'footer.newsletter.title': 'Mantém-te Conectado',
    'footer.newsletter.description': 'Recebe atualizações sobre eventos culturais portugueses, notícias da comunidade e encontros por todo o Reino Unido.',
    'footer.tagline': 'Conectando corações portugueses pelo Reino Unido',
    'footer.bottom': 'Unidos pela Língua • Comunidade UK',
    
    // About Page
    'about.hero.badge': 'Unidos pela Língua • United by Language',
    'about.hero.title': 'Sobre a LusoTown',
    'about.mission.title': 'Nossa Missão: Preservar a Cultura, Conectar Corações',
    'about.mission.subtitle': 'Our Mission: Preserve Culture, Connect Hearts',
    
    // Language Toggle
    'language.switch-to-portuguese': 'Português',
    'language.switch-to-english': 'English',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en')

  // Load saved language preference or detect from browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem('lusotown-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage)
    } else {
      // Default to English for UK-based Portuguese community platform
      // Users can manually switch to Portuguese as needed
      setLanguage('en')
      localStorage.setItem('lusotown-language', 'en')
    }
  }, [])

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('lusotown-language', lang)
  }

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const translation = translations[language][key as keyof typeof translations['en']]
    return translation || fallback || key
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}