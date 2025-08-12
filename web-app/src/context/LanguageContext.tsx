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
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.join-community': 'Join Community',
    
    // Hero Section
    'hero.badge': "London's Portuguese Community • 500+ Members • Cultural Events",
    'hero.title': 'DISCOVER LUSOTOWN LONDON',
    'hero.subtitle': 'A vibrant community platform for Portuguese speakers and their families in London. Find cultural events, connect with your heritage, discover Portuguese businesses, and share stories of the Lusophone experience in the capital.',
    'hero.cta.primary': 'JOIN PORTUGUESE COMMUNITY',
    'hero.cta.secondary': 'EXPLORE CULTURAL EVENTS',
    
    // Features
    'features.title': 'Why Choose LusoTown London',
    'features.subtitle': 'Everything You Need for Community Connection',
    'features.events.title': 'Cultural Events Calendar',
    'features.events.description': 'From Fado nights to Festival de Santo António - discover and join authentic Portuguese cultural celebrations across London.',
    'features.groups.title': 'Community Groups',
    'features.groups.description': 'Connect with Portuguese entrepreneurs, families, and professionals. Share advice, organize meetups, and build lasting friendships.',
    'features.business.title': 'Portuguese Business Directory',
    'features.business.description': 'Find trusted Portuguese restaurants, services, and professionals who understand your language and culture.',
    'features.resources.title': 'Resource Hub',
    'features.resources.description': 'Essential information on housing, jobs, education, and language classes to help you thrive in London.',
    'features.stories.title': 'Stories & Culture',
    'features.stories.description': 'Share your journey, preserve traditions, and celebrate the rich diversity of Portuguese-speaking communities.',
    'features.local.title': 'London & Beyond',
    'features.local.description': 'Connect with Portuguese speakers across London and the UK while staying connected to your roots and heritage.',
    
    // Testimonials
    'testimonials.badge': 'Real Stories, True Friendships',
    'testimonials.title': 'Meet Our Lusophone Community',
    'testimonials.subtitle': 'Hear from Portuguese, Brazilian, Angolan, and Cape Verdean women who found their community in London',
    
    // Footer
    'footer.description': 'Connecting Portuguese-speaking communities in London. Unidos pela Língua - United by Language. Join our vibrant community preserving heritage, culture, and building meaningful connections across the Portuguese diaspora.',
    'footer.newsletter.title': 'Stay Connected',
    'footer.newsletter.description': 'Get updates on community events, cultural celebrations, and inspiring stories from our Portuguese-speaking community.',
    'footer.tagline': 'Proudly built for the Portuguese-speaking community in London 🌍',
    'footer.bottom': 'Unidos pela Língua',
    
    // About Page
    'about.hero.badge': 'Unidos pela Língua • United by Language',
    'about.hero.title': 'About LusoTown London',
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
    'nav.pricing': 'Preços',
    'nav.about': 'Sobre',
    'nav.contact': 'Contacto',
    'nav.login': 'Entrar',
    'nav.join-community': 'Juntar à Comunidade',
    
    // Hero Section
    'hero.badge': 'Comunidade Portuguesa de Londres • 500+ Membros • Eventos Culturais',
    'hero.title': 'DESCUBRA A LUSOTOWN LONDON',
    'hero.subtitle': 'Uma plataforma comunitária vibrante para falantes de português e suas famílias em Londres. Encontre eventos culturais, conecte-se com a sua herança, descubra negócios portugueses e partilhe histórias da experiência lusófona na capital.',
    'hero.cta.primary': 'JUNTAR À COMUNIDADE PORTUGUESA',
    'hero.cta.secondary': 'EXPLORAR EVENTOS CULTURAIS',
    
    // Features
    'features.title': 'Porquê Escolher a LusoTown London',
    'features.subtitle': 'Tudo o Que Precisa para Conexão Comunitária',
    'features.events.title': 'Calendário de Eventos Culturais',
    'features.events.description': 'Desde noites de Fado ao Festival de Santo António - descubra e participe em celebrações culturais portuguesas autênticas por Londres.',
    'features.groups.title': 'Grupos Comunitários',
    'features.groups.description': 'Conecte-se com empresários, famílias e profissionais portugueses. Partilhe conselhos, organize encontros e construa amizades duradouras.',
    'features.business.title': 'Diretório de Negócios Portugueses',
    'features.business.description': 'Encontre restaurantes, serviços e profissionais portugueses confiáveis que entendem a sua língua e cultura.',
    'features.resources.title': 'Centro de Recursos',
    'features.resources.description': 'Informações essenciais sobre habitação, empregos, educação e aulas de língua para prosperar em Londres.',
    'features.stories.title': 'Histórias e Cultura',
    'features.stories.description': 'Partilhe a sua jornada, preserve tradições e celebre a rica diversidade das comunidades lusófonas.',
    'features.local.title': 'Londres e Além',
    'features.local.description': 'Conecte-se com falantes de português por Londres e o Reino Unido mantendo ligação às suas raízes e herança.',
    
    // Testimonials
    'testimonials.badge': 'Histórias Reais, Amizades Verdadeiras',
    'testimonials.title': 'Conheça a Nossa Comunidade Lusófona',
    'testimonials.subtitle': 'Ouça mulheres portuguesas, brasileiras, angolanas e cabo-verdianas que encontraram a sua comunidade em Londres',
    
    // Footer
    'footer.description': 'Conectando comunidades lusófonas em Londres. Unidos pela Língua - United by Language. Junte-se à nossa comunidade vibrante preservando herança, cultura e construindo conexões significativas pela diáspora portuguesa.',
    'footer.newsletter.title': 'Mantenha-se Conectado',
    'footer.newsletter.description': 'Receba atualizações sobre eventos comunitários, celebrações culturais e histórias inspiradoras da nossa comunidade lusófona.',
    'footer.tagline': 'Orgulhosamente construído para a comunidade lusófona de Londres 🌍',
    'footer.bottom': 'Unidos pela Língua',
    
    // About Page
    'about.hero.badge': 'Unidos pela Língua • United by Language',
    'about.hero.title': 'Sobre a LusoTown London',
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

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('lusotown-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage)
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