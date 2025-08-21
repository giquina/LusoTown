// Centralized testimonial content. Move to CMS/i18n in a future step.
// Keeping Portuguese-first authentic testimonials consolidated here.

import { buildAvatarUrl } from '@/config/cdn'

export const authenticPortugueseTestimonials = {
  community: [
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Fernanda Oliveira',
      age: '31',
      location: 'Stockwell, Londres',
      quote:
        'Mudei-me para Londres há 3 anos e sentia-me desligada da minha cultura. Através da LusoTown descobri a Casa do Bacalhau em Stockwell e eventos de fado no The Ivy. Agora organizamos saraus mensais onde cantamos fados tradicionais e partilhamos histórias de casa. É como ter um pedacinho de Portugal em Londres!',
      rating: 5,
      relationship: 'Organizadora de Eventos Culturais',
      imageId: 'fernanda-oliveira',
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Marco Santos',
      age: '28',
      location: 'Bermondsey, Londres',
      quote:
        'Cresci no Brasil e queria manter viva a nossa tradição musical em Londres. A LusoTown ajudou-me a encontrar outros brasileiros e portugueses que amam samba e bossa nova. Agora temos uma roda de samba todos os domingos no Burgess Park. A música une-nos mais que qualquer fronteira!',
      rating: 5,
      relationship: 'Músico e Organizador Comunitário',
      imageId: 'marco-santos',
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Catarina Lopes',
      age: '35',
      location: 'Nine Elms, Londres',
      quote:
        'Trabalho em tech mas sempre quis ensinar português às minhas filhas. Através da LusoTown organizamos workshops de língua portuguesa para crianças na biblioteca local. Ver os pequenos a falar "obrigada" e cantar canções portuguesas é a minha maior alegria. Estamos a criar a próxima geração luso-londrina!',
      rating: 5,
      relationship: 'Educadora e Mãe Luso-Britânica',
      imageId: 'catarina-lopes',
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'João Pereira',
      age: '42',
      location: 'Camden, Londres',
      quote:
        'Sou de Cabo Verde e quando cheguei a Londres sentia falta da morna e da nossa coladeira. Na LusoTown encontrei outros cabo-verdianos e também portugueses do continente que apreciam a nossa música. Organizamos noites de música crioula no community centre. É lindo ver como a língua portuguesa nos une a todos!',
      rating: 5,
      relationship: 'Músico Tradicional Cabo-verdiano',
      imageId: 'joao-pereira',
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Adelaide Silva',
      age: '39',
      location: 'Brixton, Londres',
      quote:
        'Vim de Angola para estudar na universidade e fiquei. Através da LusoTown conheci outras mulheres angolanas e também brasileiras que, como eu, trabalham em finanças. Criámos um grupo de networking profissional onde falamos português e apoiamo-nos mutuamente. A nossa força vem da união lusófona!',
      rating: 5,
      relationship: 'Consultora Financeira Angolana',
      imageId: 'adelaide-silva',
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Ricardo Mendonça',
      age: '33',
      location: 'Elephant & Castle, Londres',
      quote:
        'Nasci nos Açores e trouxe comigo o amor pelas nossas festas do Espírito Santo. A LusoTown ajudou-me a encontrar outros açorianos em Londres e também madeirenses. Agora celebramos as nossas festas insulares juntos, com linguiça, massa sovada e muita nostalgia. As ilhas estão longe, mas o coração está perto!',
      rating: 5,
      relationship: 'Organizador Cultural Açoriano',
      imageId: 'ricardo-mendonca',
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Esperança Santos',
      age: '29',
      location: 'South London, Londres',
      quote:
        'Sou de São Tomé e Príncipe e estudei medicina em Londres. Sentia-me isolada até descobrir a comunidade lusófona através da LusoTown. Conheci médicos brasileiros, enfermeiras portuguesas e outros profissionais de saúde de países lusófonos. Agora temos reuniões mensais onde partilhamos conhecimentos e apoio mútuo.',
      rating: 5,
      relationship: 'Médica São-tomense',
      imageId: 'esperanca-santos',
    },
  ],
  transport: [
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'António Ferreira',
      location: 'Canary Wharf, Londres',
      rating: 5,
      text:
        'Preciso frequentemente de transporte para reuniões de negócios importantes. O serviço de motorista português da LusoTown é impecável - pontual, discreto e compreende as nossas necessidades culturais. Durante as viagens podemos falar em português sobre negócios sem preocupações. Excelente para executivos lusos!',
      service: 'Transporte Executivo',
      avatar:
        buildAvatarUrl('1507003211169-0a1dd7228f2d'),
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Isabel Mendes',
      location: 'Kensington, Londres',
      rating: 5,
      text:
        'Organizei um tour especial para os meus pais que visitaram Londres pela primeira vez. O motorista falava português perfeito e conhecia todos os locais com história portuguesa - desde a Casa de Portugal em South Kensington até restaurantes autênticos em Vauxhall. Os meus pais adoraram sentir-se em casa!',
      service: 'Tour Cultural Português',
      avatar:
        buildAvatarUrl('1438761681033-6461ffad8d80'),
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Rui Costa',
      location: 'Greenwich, Londres',
      rating: 5,
      text:
        'Como brasileiro em Londres, estava nervoso com o sistema de transportes para eventos importantes. O serviço português da LusoTown eliminou todo o stress - motoristas que entendem a nossa pontualidade cultural, falam nossa língua e conhecem os melhores caminhos. Agora uso sempre para eventos especiais!',
      service: 'Transporte para Eventos',
      avatar:
        buildAvatarUrl('1472099645785-5658abf4ff4e'),
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Patrícia Silva',
      location: 'South Lambeth, Londres',
      rating: 5,
      text:
        'Trabalho até tarde e sempre me preocupei com a segurança no regresso a casa. O serviço de transporte seguro da LusoTown com motoristas portugueses é perfeito - sinto-me segura, posso relaxar falando português e eles conhecem bem as áreas portuguesas de Londres. Recomendo a todas as mulheres lusas!',
      service: 'Transporte Seguro Noturno',
      avatar:
        buildAvatarUrl('1494790108755-2616b612b632'),
    },
    {
      language: 'pt' as const,
      isAuthentic: true,
      name: 'Carlos Alberto',
      location: 'Elephant & Castle, Londres',
      rating: 5,
      text:
        'Trouxe a minha família de Portugal para visitar Londres e queríamos um tour que respeitasse a nossa cultura. O motorista português mostrou-nos não só os pontos turísticos tradicionais mas também locais especiais para portugueses - mercados, restaurantes, centros comunitários. Foi uma experiência autenticamente lusa!',
      service: 'Tour Familiar Português',
      avatar:
        buildAvatarUrl('1507003211169-0a1dd7228f2d'),
    },
  ],
}

export type AuthenticPortugueseTestimonials = typeof authenticPortugueseTestimonials
