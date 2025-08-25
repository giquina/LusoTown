import { PortugueseEmote } from '@/types/chat'

// Lusophone Cultural Emotes System
export const PORTUGUESE_EMOTES: PortugueseEmote[] = [
  // Cultural Emotions
  {
    code: ':saudade:',
    url: '/emotes/saudade.png',
    culturalContext: 'Deep longing and nostalgic feeling unique to Portuguese culture',
    regions: ['brazil', 'portugal', 'africa', 'diaspora'],
    category: 'cultural'
  },
  {
    code: ':desenrascanço:',
    url: '/emotes/desenrascanco.png',
    culturalContext: 'Lusophone art of creative problem-solving',
    regions: ['portugal', 'diaspora'],
    category: 'cultural'
  },

  // Celebrations & Festivals
  {
    code: ':festa:',
    url: '/emotes/festa.png',
    culturalContext: 'Traditional Portuguese celebration/party',
    regions: ['brazil', 'portugal', 'africa', 'diaspora'],
    category: 'celebration'
  },
  {
    code: ':carnival:',
    url: '/emotes/carnival.png',
    culturalContext: 'Brazilian Carnival celebration',
    regions: ['brazil', 'diaspora'],
    category: 'celebration'
  },
  {
    code: ':festa-junina:',
    url: '/emotes/festa-junina.png',
    culturalContext: 'Traditional Brazilian June festival',
    regions: ['brazil', 'diaspora'],
    category: 'celebration'
  },
  {
    code: ':santo-antonio:',
    url: '/emotes/santo-antonio.png',
    culturalContext: 'Lusophone saint celebrations in June',
    regions: ['portugal', 'diaspora'],
    category: 'celebration'
  },

  // Sports
  {
    code: ':futebol:',
    url: '/emotes/futebol.png',
    culturalContext: 'Football passion shared across Portuguese-speaking world',
    regions: ['brazil', 'portugal', 'africa', 'diaspora'],
    category: 'sports'
  },
  {
    code: ':selecao:',
    url: '/emotes/selecao.png',
    culturalContext: 'National football team pride',
    regions: ['brazil', 'portugal', 'diaspora'],
    category: 'sports'
  },
  {
    code: ':cristiano:',
    url: '/emotes/cristiano.png',
    culturalContext: 'Cristiano Ronaldo celebration',
    regions: ['portugal', 'diaspora'],
    category: 'sports'
  },

  // Food & Culture
  {
    code: ':pasteis:',
    url: '/emotes/pasteis.png',
    culturalContext: 'Famous Lusophone custard tarts (Pastéis de Nata)',
    regions: ['portugal', 'diaspora'],
    category: 'food'
  },
  {
    code: ':feijoada:',
    url: '/emotes/feijoada.png',
    culturalContext: 'Traditional Brazilian stew',
    regions: ['brazil', 'diaspora'],
    category: 'food'
  },
  {
    code: ':bacalhau:',
    url: '/emotes/bacalhau.png',
    culturalContext: 'Lusophone codfish dishes',
    regions: ['portugal', 'diaspora'],
    category: 'food'
  },
  {
    code: ':caipirinha:',
    url: '/emotes/caipirinha.png',
    culturalContext: 'Brazilian national cocktail',
    regions: ['brazil', 'diaspora'],
    category: 'food'
  },

  // Music & Arts
  {
    code: ':fado:',
    url: '/emotes/fado.png',
    culturalContext: 'Traditional Lusophone melancholic music',
    regions: ['portugal', 'diaspora'],
    category: 'music'
  },
  {
    code: ':samba:',
    url: '/emotes/samba.png',
    culturalContext: 'Brazilian samba dance and music',
    regions: ['brazil', 'diaspora'],
    category: 'music'
  },
  {
    code: ':guitarrada:',
    url: '/emotes/guitarrada.png',
    culturalContext: 'Lusophone guitar music',
    regions: ['portugal', 'diaspora'],
    category: 'music'
  },

  // Regional Pride
  {
    code: ':brasil:',
    url: '/emotes/brasil.png',
    culturalContext: 'Brazilian pride and identity',
    regions: ['brazil', 'diaspora'],
    category: 'cultural'
  },
  {
    code: ':portugal:',
    url: '/emotes/portugal.png',
    culturalContext: 'Lusophone pride and identity',
    regions: ['portugal', 'diaspora'],
    category: 'cultural'
  },
  {
    code: ':lusofonia:',
    url: '/emotes/lusofonia.png',
    culturalContext: 'Portuguese-speaking world unity',
    regions: ['brazil', 'portugal', 'africa', 'diaspora'],
    category: 'cultural'
  }
]

export const REGIONAL_INDICATORS = {
  brazil: {
    flag: '🇧🇷',
    color: '#009739',
    name: 'Brasil'
  },
  portugal: {
    flag: '🇵🇹',
    color: '#FF0000',
    name: 'Portugal'
  },
  africa: {
    flag: '🌍',
    color: '#FFA500',
    name: 'África Lusófona'
  },
  diaspora: {
    flag: '🌎',
    color: '#4A90E2',
    name: 'Diáspora'
  }
}

// Quick reaction emojis for Portuguese culture
export const QUICK_REACTIONS = ['❤️', '👏', '🎵', '🇵🇹', '🇧🇷', '😍', '🔥', '⚽', '🎉', '🎊']

// Lusophone greetings and common phrases for auto-suggestions
export const PORTUGUESE_PHRASES = [
  'Olá pessoal!',
  'Boa noite!',
  'Que lindo!',
  'Parabéns!',
  'Muito obrigado!',
  'Saudades!',
  'Força!',
  'Vamos lá!',
  'Que maravilha!',
  'Está fantástico!'
]

// Emote categories for picker organization
export const EMOTE_CATEGORIES = {
  cultural: {
    name: 'Cultural',
    icon: '🏛️',
    color: '#8B5A3C'
  },
  celebration: {
    name: 'Festas',
    icon: '🎉',
    color: '#FF6B35'
  },
  sports: {
    name: 'Desporto',
    icon: '⚽',
    color: '#4CAF50'
  },
  food: {
    name: 'Comida',
    icon: '🍽️',
    color: '#FF9800'
  },
  music: {
    name: 'Música',
    icon: '🎵',
    color: '#9C27B0'
  }
}

export function getEmotesByCategory(category: string): PortugueseEmote[] {
  return PORTUGUESE_EMOTES.filter(emote => emote.category === category)
}

export function getEmotesByRegion(region: string): PortugueseEmote[] {
  return PORTUGUESE_EMOTES.filter(emote => 
    emote.regions.includes(region as any)
  )
}

export function parseEmotesInMessage(message: string): { text: string, emotes: PortugueseEmote[] } {
  let processedMessage = message
  const foundEmotes: PortugueseEmote[] = []

  PORTUGUESE_EMOTES.forEach(emote => {
    if (message.includes(emote.code)) {
      foundEmotes.push(emote)
      processedMessage = processedMessage.replace(
        new RegExp(emote.code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        `<img src="${emote.url}" alt="${emote.code}" class="inline-emote" title="${emote.culturalContext}" />`
      )
    }
  })

  return {
    text: processedMessage,
    emotes: foundEmotes
  }
}