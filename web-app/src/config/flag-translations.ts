/**
 * Flag System Translations
 * Bilingual support for the Lusophone Flag System
 */

export const FLAG_TRANSLATIONS = {
  en: {
    // Flag rotation labels
    'flags.current_flag': 'Current flag',
    'flags.click_to_change': 'Click to change',
    'flags.representing': 'Representing',
    'flags.celebrating': 'Celebrating',
    'flags.lusophone_nations': 'Lusophone Nations',
    'flags.rotation_status': 'Flag rotation showing',
    'flags.nations': 'Portuguese-speaking nations',
    'flags.current_position': 'Currently displaying',
    'flags.of': 'of',
    'flags.interaction_hint': 'Use arrow keys or click to navigate',

    // Footer flag section
    'footer.celebrating_nations': 'Celebrating Portuguese-Speaking Nations',
    'footer.click_to_explore': 'Click to explore',
    'footer.all_nations': 'All 8 Portuguese-Speaking Nations',
    'footer.uk_community': 'United Kingdom Portuguese-speaking community',
    'footer.celebrating_diversity': 'Celebrating Lusophone diversity in the UK',
    'footer.heritage_quote_attribution': 'Portuguese Cultural Heritage',

    // Cultural showcase
    'cultural.showcase.title': 'United by Language, Diverse by Culture',
    'cultural.showcase.description': 'From the Atlantic coasts of Portugal to the vibrant cities of Brazil, from the rich heritage of Angola to the musical islands of Cape Verde - we celebrate the beautiful diversity of Portuguese-speaking communities in the United Kingdom.',
    'cultural.uk_residents': 'UK residents',

    // Section descriptions
    'sections.hero.flag_description': 'Celebrating Lusophone heritage',
    'sections.features.flag_description': 'Portuguese-speaking community features',
    'sections.testimonials.flag_description': 'Stories from our community',
    'sections.events.flag_description': 'Cultural events and celebrations',
    'sections.footer.flag_description': 'United Lusophone community',
    'sections.about.flag_description': 'Our cultural diversity',

    // Success stories
    'success_stories.heritage_pride': 'Proud of my heritage, thriving in the UK',
    'success_stories.community_strength': 'Strength through community',

    // Business directory
    'business.origin': 'Origin',
  },

  pt: {
    // Flag rotation labels
    'flags.current_flag': 'Bandeira atual',
    'flags.click_to_change': 'Clique para alterar',
    'flags.representing': 'Representando',
    'flags.celebrating': 'Celebrando',
    'flags.lusophone_nations': 'Nações Lusófonas',
    'flags.rotation_status': 'Rotação de bandeiras mostrando',
    'flags.nations': 'nações de língua portuguesa',
    'flags.current_position': 'Atualmente exibindo',
    'flags.of': 'de',
    'flags.interaction_hint': 'Use as setas do teclado ou clique para navegar',

    // Footer flag section
    'footer.celebrating_nations': 'Celebrando as Nações de Língua Portuguesa',
    'footer.click_to_explore': 'Clique para explorar',
    'footer.all_nations': 'Todas as 8 Nações de Língua Portuguesa',
    'footer.uk_community': 'Comunidade de língua portuguesa do Reino Unido',
    'footer.celebrating_diversity': 'Celebrando a diversidade lusófona no Reino Unido',
    'footer.heritage_quote_attribution': 'Património Cultural Português',

    // Cultural showcase
    'cultural.showcase.title': 'Unidos pela Língua, Diversos pela Cultura',
    'cultural.showcase.description': 'Desde as costas atlânticas de Portugal às cidades vibrantes do Brasil, desde o rico património de Angola às ilhas musicais de Cabo Verde - celebramos a bela diversidade das comunidades de língua portuguesa no Reino Unido.',
    'cultural.uk_residents': 'residentes do Reino Unido',

    // Section descriptions
    'sections.hero.flag_description': 'Celebrando o património lusófono',
    'sections.features.flag_description': 'Recursos da comunidade de língua portuguesa',
    'sections.testimonials.flag_description': 'Histórias da nossa comunidade',
    'sections.events.flag_description': 'Eventos culturais e celebrações',
    'sections.footer.flag_description': 'Comunidade lusófona unida',
    'sections.about.flag_description': 'A nossa diversidade cultural',

    // Success stories
    'success_stories.heritage_pride': 'Orgulhoso do meu património, prosperando no Reino Unido',
    'success_stories.community_strength': 'Força através da comunidade',

    // Business directory
    'business.origin': 'Origem',
  }
} as const;

/**
 * Helper function to get flag translation
 */
export function getFlagTranslation(key: string, language: 'en' | 'pt' = 'en'): string {
  return FLAG_TRANSLATIONS[language][key as keyof typeof FLAG_TRANSLATIONS['en']] || key;
}