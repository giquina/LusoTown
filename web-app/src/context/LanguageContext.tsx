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
    'hero.badge': "21+ Portuguese Social Network • 500+ Active Members • Nightlife & Events",
    'hero.title': 'CONNECT WITH LUSOTOWN LONDON',
    'hero.subtitle': 'The social platform for Portuguese speakers (21+) in London. Connect with fellow Portuguese, discover nightlife, attend social events, find Portuguese-friendly restaurants and venues. Because you shouldn\'t be alone just because you\'re not English.',
    'hero.cta.primary': 'JOIN OUR SOCIAL COMMUNITY',
    'hero.cta.secondary': 'EXPLORE NIGHTLIFE & EVENTS',
    
    // Features
    'features.title': 'Why Choose LusoTown London',
    'features.subtitle': 'Your Social Connection Hub for Portuguese Adults in London',
    'features.events.title': 'Nightlife & Social Events',
    'features.events.description': 'From Fado nights to weekend parties, cocktail hours to Portuguese club nights - discover and join the best social events across London.',
    'features.groups.title': 'Adult Social Groups',
    'features.groups.description': 'Connect with Portuguese adults who love nightlife, dining, fitness, and socializing. Make genuine friendships and plan adventures together.',
    'features.business.title': 'Portuguese-Friendly Venues',
    'features.business.description': 'Discover restaurants, bars, gyms, and venues where Portuguese is spoken and our culture is celebrated. Feel at home in London.',
    'features.resources.title': 'Social Meetups',
    'features.resources.description': 'Regular brunches, gym sessions, pub crawls, and dinner parties. Never eat or drink alone again - find your Portuguese tribe.',
    'features.stories.title': 'Member Stories',
    'features.stories.description': 'Real stories from Portuguese adults who found their social circle, best friends, and unforgettable nights out through our community.',
    'features.local.title': 'London Social Scene',
    'features.local.description': 'Navigate London\'s social scene with fellow Portuguese. From rooftop bars to hidden speakeasies - explore the city together.',
    
    // Testimonials
    'testimonials.badge': 'Real Stories, Real Connections',
    'testimonials.title': 'Meet Your Portuguese Social Circle',
    'testimonials.subtitle': 'Hear from Portuguese speakers who found their best friends, amazing nights out, and social home in London',
    
    // Footer
    'footer.description': 'The social platform for Portuguese speakers (21+) in London. Never be alone again - connect with your Portuguese tribe for nightlife, events, dining, and genuine friendships. Unidos pela Língua - United by Language.',
    'footer.newsletter.title': 'Stay in the Loop',
    'footer.newsletter.description': 'Get updates on the hottest Portuguese events, nightlife, meetups, and social gatherings happening in London.',
    'footer.tagline': 'For Portuguese adults who refuse to be lonely in London 🇵🇹',
    'footer.bottom': 'Unidos pela Língua • 21+ Only',
    
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
    'hero.badge': 'Rede Social Portuguesa 21+ • 500+ Membros Ativos • Vida Noturna & Eventos',
    'hero.title': 'CONECTA-TE COM LUSOTOWN LONDON',
    'hero.subtitle': 'A plataforma social para falantes de português (21+) em Londres. Conecta-te com outros portugueses, descobre vida noturna, participa em eventos sociais, encontra restaurantes e locais lusófonos. Porque não deves estar sozinho só por não seres inglês.',
    'hero.cta.primary': 'JUNTAR À NOSSA COMUNIDADE SOCIAL',
    'hero.cta.secondary': 'EXPLORAR VIDA NOTURNA & EVENTOS',
    
    // Features
    'features.title': 'Porquê Escolher a LusoTown London',
    'features.subtitle': 'O Teu Centro de Conexões Sociais para Adultos Portugueses em Londres',
    'features.events.title': 'Vida Noturna & Eventos Sociais',
    'features.events.description': 'Desde noites de Fado a festas de fim de semana, horas de cocktail a noites de clube portuguesas - descobre e participa nos melhores eventos sociais em Londres.',
    'features.groups.title': 'Grupos Sociais de Adultos',
    'features.groups.description': 'Conecta-te com adultos portugueses que adoram vida noturna, jantar, fitness e socializar. Faz amizades genuínas e planeia aventuras juntos.',
    'features.business.title': 'Locais Lusófonos',
    'features.business.description': 'Descobre restaurantes, bares, ginásios e locais onde português é falado e a nossa cultura é celebrada. Sente-te em casa em Londres.',
    'features.resources.title': 'Encontros Sociais',
    'features.resources.description': 'Brunches regulares, sessões de ginásio, pub crawls e jantares. Nunca mais comas ou bebas sozinho - encontra a tua tribo portuguesa.',
    'features.stories.title': 'Histórias de Membros',
    'features.stories.description': 'Histórias reais de adultos portugueses que encontraram o seu círculo social, melhores amigos e noites inesquecíveis através da nossa comunidade.',
    'features.local.title': 'Cena Social de Londres',
    'features.local.description': 'Navega a cena social de Londres com outros portugueses. Desde bares no topo de edifícios a speakeasies escondidos - explora a cidade juntos.',
    
    // Testimonials
    'testimonials.badge': 'Histórias Reais, Conexões Reais',
    'testimonials.title': 'Conhece o Teu Círculo Social Português',
    'testimonials.subtitle': 'Ouve falantes de português que encontraram os seus melhores amigos, noites incríveis e lar social em Londres',
    
    // Footer
    'footer.description': 'A plataforma social para falantes de português (21+) em Londres. Nunca mais estejas sozinho - conecta-te com a tua tribo portuguesa para vida noturna, eventos, jantares e amizades genuínas. Unidos pela Língua - United by Language.',
    'footer.newsletter.title': 'Mantém-te Atualizado',
    'footer.newsletter.description': 'Recebe atualizações sobre os eventos portugueses mais quentes, vida noturna, encontros e reuniões sociais em Londres.',
    'footer.tagline': 'Para adultos portugueses que se recusam a estar sozinhos em Londres 🇵🇹',
    'footer.bottom': 'Unidos pela Língua • Apenas 21+',
    
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