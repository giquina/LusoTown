'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'pt-pt' | 'pt-br'

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
    'nav.community': 'Members',
    'nav.community-guidelines': 'Membership Guidelines',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.join-membership': 'Become a Member',
    
    // Hero Section
    'hero.badge': "Unidos pela Língua • United by Language",
    'hero.title': 'Find Your Portuguese Family in London.',
    'hero.subtitle': 'Connect with 500+ Portuguese speakers at authentic London venues. Find your people today.',
    'hero.cta.primary': 'Find My People',
    'hero.cta.secondary': 'Join Our Family',
    
    // How It Works Section
    'how-it-works.title': 'Come Home to Your Portuguese Family',
    'how-it-works.subtitle': 'Discover how easy it is to find your people and feel at home again in four heartwarming steps',
    'how-it-works.quote': '"A saudade só se cura com encontros reais" - Homesickness can only be cured with real meetings at real places',
    'how-it-works.step1.title': 'Become Part of Our Family',
    'how-it-works.step1.subtitle': 'Seja Bem-Vindo à Nossa Família',
    'how-it-works.step2.title': 'Discover Real London Venues', 
    'how-it-works.step2.subtitle': 'Descubra Locais Reais de Londres',
    'how-it-works.step3.title': 'Meet at Authentic Places',
    'how-it-works.step3.subtitle': 'Encontre-se em Locais Autênticos',
    'how-it-works.step4.title': 'Build Your London Network',
    'how-it-works.step4.subtitle': 'Construa a Sua Rede de Londres',
    
    // Quick Start Section
    'quick-start.title': 'Meet Portuguese Speakers at Real London Venues',
    'quick-start.subtitle': 'Connect at authentic Portuguese venues from Stockwell to Vauxhall - find your people at real London locations.',
    'quick-start.quote': '"Onde há portugueses, há sempre uma mesa para mais um" - Where there are Portuguese people in London, there\'s always room for one more at the table',
    
    // What You Can Do Section
    'what-you-can-do.badge': 'O Que Podes Fazer • What You Can Do',
    'what-you-can-do.title': 'Meet Portuguese Speakers at Authentic London Venues',
    'what-you-can-do.subtitle': 'From Stockwell\'s Portuguese bakeries to Vauxhall\'s cultural centers, from Elephant & Castle\'s community spaces to authentic Fado restaurants - connect where Portuguese culture lives',
    'what-you-can-do.testimonial': '"I\'ve found my Portuguese family here - from Sunday lunches in Stockwell to Fado nights at authentic venues"',
    
    'what-you-can-do.events.title': 'Find & Join Events',
    'what-you-can-do.events.description': 'Discover Portuguese cultural events across London - from traditional Fado nights at authentic venues like Bar do Fado to Portuguese film screenings at cultural centers. Connect with your heritage through real experiences.',
    'what-you-can-do.events.cta': 'Browse Events',
    'what-you-can-do.events.locations': 'Stockwell • South Kensington • Vauxhall',
    
    'what-you-can-do.groups.title': 'Create Your Own Groups',
    'what-you-can-do.groups.description': 'Start age-based groups (20s-30s professionals), origin-based communities (Portugal, Brazil, Angola), or interest-based circles (cooking, football, language exchange). Build lasting friendships.',
    'what-you-can-do.groups.cta': 'Start a Group',
    'what-you-can-do.groups.examples': 'Mums & Tots • Young Professionals • 50+ Social',
    
    'what-you-can-do.feed.title': 'Stay Updated on LusoFeed',
    'what-you-can-do.feed.description': 'Follow member updates, event news, and cultural highlights. Share photos from Portuguese festivals and stay connected.',
    'what-you-can-do.feed.cta': 'View Feed',
    'what-you-can-do.feed.features': 'Live Updates • Photo Sharing • Community News',
    
    'what-you-can-do.favorites.title': 'Save Your Favourites',
    'what-you-can-do.favorites.description': 'Never miss that perfect Portuguese bakery, the monthly cultural gathering, or your favorite community event. Build your personal collection of Portuguese experiences in London.',
    'what-you-can-do.favorites.cta': 'View Saved Items',
    'what-you-can-do.favorites.types': 'Events • Businesses • Cultural Sites',
    
    // Features
    'features.title': 'Why Portuguese Hearts Choose LusoTown',
    'features.subtitle': 'Your Warm Welcome Home for Portuguese Families Across London & UK',
    'features.events.title': 'Celebrate Together Like Family',
    'features.events.description': 'Join intimate Fado nights and Portuguese festivals across London. Meet like-minded members who share your heritage and interests.',
    'features.groups.title': 'Find Your People',
    'features.groups.description': 'Whether you\'re a young professional missing mãe\'s cooking or a parent wanting your children to know their heritage, find your tribe. We\'re all different ages, from different places, but we understand each other\'s journey home.',
    'features.business.title': 'Support Our Family Businesses',
    'features.business.description': 'Find the bakery that makes pastéis like your avó\'s, the restaurant owner who greets you with a warm smile, the services run by people who understand your story. When we support each other, we all feel more at home.',
    'features.resources.title': 'London Community Resources',
    'features.resources.description': 'Access language exchange programs at Portuguese cultural centers, cultural workshops in authentic venues, and community support networks across London\'s Portuguese neighborhoods.',
    'features.stories.title': 'Real London Success Stories',
    'features.stories.description': 'Real stories from Portuguese speakers who found their London community, preserved their heritage, and built meaningful connections at authentic venues from Stockwell to Camden.',
    'features.local.title': 'Borough Communities',
    'features.local.description': 'Connect with Portuguese speakers in your London borough. Find local communities in Lambeth, Southwark, Camden - discover Portuguese cultural centers and gathering places near you.',
    'features.culture.title': 'Portuguese Cultural Heritage',
    'features.culture.description': 'Celebrate Portuguese traditions at authentic London venues. From Fado nights at traditional restaurants to festas at Portuguese churches - keep our culture alive in real places.',
    'features.language.title': 'In-Person Language Exchange',
    'features.language.description': 'Practice Portuguese with native speakers at coffee shops, cultural centers, and community spaces across London. Build real connections through face-to-face language exchange.',
    'features.heritage.title': 'Heritage Preservation',
    'features.heritage.description': 'Connect with Portuguese roots through real community spaces - Portuguese churches, cultural associations, and family-run businesses that preserve our traditions in London.',
    
    // Testimonials
    'testimonials.badge': 'Real Stories, Real London Venues',
    'testimonials.title': 'Meet Your London Portuguese Community',
    'testimonials.subtitle': 'Hear from Portuguese speakers who found their London network and built lasting friendships at authentic venues',
    
    // Footer
    'footer.description': 'Connect Portuguese speakers across London & UK. Where families reconnect with heritage and build lasting friendships. Unidos pela Língua - United by Language.',
    'footer.newsletter.title': 'Stay Connected',
    'footer.newsletter.description': 'Get updates on Portuguese cultural events, community gatherings, and real meetups happening at authentic venues across London.',
    'footer.tagline': 'Connecting Portuguese hearts at real London venues',
    'footer.bottom': 'Unidos pela Língua • London Community',
    
    // About Page
    'about.hero.badge': 'Unidos pela Língua • United by Language',
    'about.hero.title': 'About LusoTown',
    'about.mission.title': 'Nossa Missão: Preservar a Cultura, Conectar Corações',
    'about.mission.subtitle': 'Our Mission: Preserve Culture, Connect Hearts',
    
    // Cart and Favorites
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Empty cart',
    'cart.add-to-cart': 'Add to Cart',
    'cart.remove': 'Remove',
    'cart.checkout': 'Checkout',
    'cart.total': 'Total',
    'cart.item': 'item',
    'cart.items': 'items',
    'cart.added': 'Added to cart',
    'cart.removed': 'Removed from cart',
    'cart.clear': 'Clear Cart',
    'cart.save-later': 'Save for later',
    
    'favorites.title': 'Saved Items',
    'favorites.empty': 'No saved items yet',
    'favorites.save': 'Save',
    'favorites.saved': 'Saved',
    'favorites.remove': 'Remove from saved',
    'favorites.added': 'Added to favorites',
    'favorites.removed': 'Removed from favorites',
    'favorites.view-all': 'View All Saved',
    
    'event.save': 'Save Event',
    'event.saved': 'Event Saved',
    'event.add-to-cart': 'Add to Cart',
    'event.view-details': 'View Details',
    'event.register': 'Register',
    'event.join-waitlist': 'Join Waitlist',
    'event.full': 'Full',
    'event.spots-left': 'spots left',
    'event.free': 'FREE',
    
    'business.save': 'Save Business',
    'business.saved': 'Business Saved',
    'business.view': 'View Business',
    
    // Language Toggle
    'language.switch-to-portuguese': 'Português',
    'language.switch-to-english': 'English',
    
    // Login & Authentication
    'login.title': 'Welcome Back to the Family!',
    'login.subtitle': 'Sign in to connect with your Portuguese network',
    'login.membership-badge': 'Your Portuguese network in London',
    'login.membership-missed-you': 'Your Portuguese network missed you.',
    'login.hearts-waiting': 'Over 500 Portuguese hearts are waiting for you.',
    'login.membership-updates': 'Member Updates',
    'login.live': 'LIVE',
    'login.portuguese-support': 'Portuguese-Speaking Support',
    'login.support-description': 'Need help? Our team speaks Portuguese and is here for you.',
    'login.contact-support': 'Contact Support →',
    'login.new-to-lusotown': 'New to LusoTown?',
    'login.join-family-description': 'Join our vibrant Portuguese family in London and find your people.',
    'login.join-family-button': 'Join Our Family →',
    'login.sign-in-account': 'Sign in to your account',
    'login.email': 'Email Address',
    'login.email-placeholder': 'your@email.com',
    'login.password': 'Password',
    'login.password-placeholder': 'Enter your password',
    'login.remember-me': 'Remember me',
    'login.forgot-password': 'Forgot password?',
    'login.welcome-home': 'Welcome Home',
    'login.signing-in': 'Welcome back to the family...',
    'login.connecting': 'Connecting to your network...',
    'login.preparing': 'Preparing your Portuguese home...',
    'login.no-account': "Don't have an account?",
    'login.join-family-link': 'Join Our Family',
    'login.terms-privacy': 'By signing in, you agree to our',
    'login.terms': 'Terms of Service',
    'login.and': 'and',
    'login.privacy': 'Privacy Policy',
    'login.safe-membership': 'Safe & Verified Membership',
    'login.fill-fields-error': 'Please fill in all fields',
    'login.login-failed': 'Login failed',
    'login.unexpected-error': 'An unexpected error occurred. Please try again.',
    
    // Community Highlights
    'login.fado-night': 'Fado Night in Camden',
    'login.fado-tonight': 'Today at 8pm • Bar do Fado',
    'login.new-bakery': 'New Bakery in Stockwell',
    'login.fresh-pasteis': 'Fresh pastéis de nata daily',
    'login.portuguese-mums': '"Portuguese Mums" Group',
    'login.new-members': '89 new members this week',
    'login.attendees': 'attendees',
    'login.participants': 'participants',
    'login.table-quote': '"Where there are Portuguese people, there\'s always room for one more at the table"',
    
    // Groups
    'groups.title': 'Portuguese Member Groups',
    'groups.subtitle': 'Find your group and connect with Portuguese speakers',
    'groups.create': 'Create Group',
    'groups.join': 'Join Group',
    'groups.joined': 'Joined',
    'groups.pending': 'Pending',
    'groups.members': 'members',
    'groups.member': 'member',
    'groups.view': 'View Group',
    'groups.save': 'Save Group',
    'groups.saved': 'Group Saved',
    'groups.report': 'Report Group',
    
    // Group Creation
    'group.create.title': 'Create Portuguese Member Group',
    'group.create.subtitle': 'Build connections with Portuguese speakers in London',
    'group.create.name': 'Group Name',
    'group.create.description': 'Description',
    'group.create.category': 'Category',
    'group.create.location': 'Location',
    'group.create.borough': 'London Borough',
    'group.create.language': 'Language Preference',
    'group.create.portuguese-origin': 'Portuguese Origin',
    'group.create.age-restrictions': 'Age Restrictions',
    'group.create.meeting-frequency': 'Meeting Frequency',
    'group.create.verification-level': 'Verification Level',
    'group.create.max-members': 'Maximum Members',
    'group.create.private': 'Private Group',
    'group.create.rules': 'Group Rules',
    'group.create.contact': 'Contact Information',
    'group.create.cultural-focus': 'Cultural Focus',
    'group.create.submit': 'Create Group',
    'group.create.preview': 'Preview Group',
    'group.create.success': 'Group created successfully!',
    'group.create.error': 'Error creating group',
    
    // Age Groups
    'age.18-25': '18-25 years old',
    'age.25-35': '25-35 years old', 
    'age.35-50': '35-50 years old',
    'age.50+': '50+ years old',
    'age.families': 'Families with children',
    'age.all-ages': 'All ages welcome',
    
    // Portuguese Origins
    'origin.portugal': 'Portugal',
    'origin.brazil': 'Brazil',
    'origin.angola': 'Angola',
    'origin.mozambique': 'Mozambique',
    'origin.cape-verde': 'Cape Verde',
    'origin.guinea-bissau': 'Guinea-Bissau',
    'origin.sao-tome-principe': 'São Tomé and Príncipe',
    'origin.east-timor': 'East Timor',
    'origin.macau': 'Macau',
    'origin.equatorial-guinea': 'Equatorial Guinea',
    'origin.mixed': 'Mixed/Multiple Origins',
    'origin.any': 'All Portuguese-speaking origins',
    
    // Meeting Frequencies
    'frequency.weekly': 'Weekly',
    'frequency.biweekly': 'Every 2 weeks',
    'frequency.monthly': 'Monthly',
    'frequency.quarterly': 'Quarterly',
    'frequency.irregular': 'Irregular/As needed',
    'frequency.one-time': 'One-time event',
    
    // Verification Levels
    'verification.none': 'No verification required',
    'verification.basic': 'Basic verification (email)',
    'verification.verified': 'Verified users only',
    'verification.premium': 'Premium members only',
    
    
    // Membership Page
    'community.hero.title': 'The Portuguese Network in London',
    'community.hero.subtitle': 'Discover the vibrant Portuguese-speaking network in London. Connect with 500+ Portuguese speakers across authentic venues from Stockwell to Vauxhall.',
    'community.stats.members': 'Portuguese Network Members',
    'community.stats.events': 'Cultural Events Monthly',
    'community.stats.boroughs': 'London Boroughs',
    'community.stats.countries': 'Countries Represented',
    'community.events.title': 'Events Happening Now',
    'community.events.subtitle': 'Join these Portuguese cultural events happening this week across London',
    'community.areas.title': 'Portuguese Member Areas',
    'community.areas.subtitle': 'Discover where Portuguese members gather in London. Each area offers authentic venues and cultural connections.',
    'community.origins.title': 'Communities by Origin',
    'community.origins.subtitle': 'Each Portuguese-speaking country brings its own culture, traditions, and warmth. Find your community of origin or discover other Portuguese cultures.',
    'community.members.title': 'Meet Our Members',
    'community.members.subtitle': 'Real people making real connections across London - stories from Portuguese speakers',
    'community.values.title': 'Our Member Values',
    'community.values.subtitle': 'What makes our network special? These shared values every member embraces, reflecting Portuguese culture.',
    'community.business.title': 'Portuguese Businesses in London',
    'community.business.subtitle': 'Support our business members. From family bakeries to authentic restaurants - services by people who understand our culture.',
    'community.cta.title': 'Ready to Join the Portuguese Family?',
    'community.cta.subtitle': 'Your Portuguese family is waiting. Join 500+ Portuguese speakers who have made London their home, one connection at a time. United by language, united by heart.',
    'community.cta.tagline': '"Unidos pela Língua" - Wherever you come from in the Portuguese-speaking world, you have a home here in London.',
    
    // App Download Section
    'app.badge': 'Now Available on Mobile',
    'app.heading.part1': 'Take Your',
    'app.heading.membership': 'Network',
    'app.heading.part2': 'Everywhere',
    'app.description': 'Never miss Portuguese meetups in London or new connections. Get the LusoTown mobile app and stay connected with your network wherever you go.',
    'app.cta.title': 'Join 500+ verified Portuguese speakers',
    'app.cta.description': 'Your Luso-London network is already growing. Download the app and find your network today.',
    'app.features.notifications.title': 'Instant Notifications',
    'app.features.notifications.description': 'Never miss event invites or group messages',
    'app.features.local-events.title': 'Local Events',
    'app.features.local-events.description': 'Find Portuguese meetups and activities nearby',
    'app.features.real-time-chat.title': 'Real-time Chat',
    'app.features.real-time-chat.description': 'Stay connected with your Portuguese network anywhere',
    'app.features.mobile-experience.title': 'Mobile Experience',
    'app.features.mobile-experience.description': 'Optimized for seamless member engagement',
    'app.download.app-store-label': 'Download LusoTown on the App Store',
    'app.download.google-play-label': 'Get LusoTown on Google Play',
    'app.info.free-download': 'Free to download • Available on iOS 14+ and Android 8+',
    'app.info.secure': '100% Safe and Verified',
    'app.info.membership': 'Luso-London Network',
    'app.mockup.reading-club': 'Portuguese Reading Club',
    'app.mockup.new-messages': '3 new messages',
    'app.mockup.message-preview': 'Anyone read \'Os Maias\' by Eça de Queirós?',
    'app.mockup.weekend-walks': 'Weekend Walks',
    'app.mockup.tomorrow-time': 'Tomorrow, 10:00',
    'app.mockup.new-in-area': 'New in Your Area',
    
    // CTA Section
    'cta.badge': 'Limited Time - Join Today',
    'cta.title': 'Your Network is Here',
    'cta.subtitle': 'Join LusoTown London today and discover your Portuguese network.',
    'cta.button': 'JOIN NOW',
    'cta.guarantee': 'No commitment • Start connecting immediately • Cancel anytime',
    'cta.social-proof': 'Portuguese speakers joined in the last 24 hours',
    'cta.connect-time': 'Join now and connect with the Luso-London network within 48 hours',
    'cta.trust.verified-profiles': 'Verified Profiles',
    'cta.trust.member-support': 'Member Support',
    'cta.trust.satisfaction-guarantee': 'Satisfaction Guarantee',
    'cta.benefits.join-network': 'Join the Luso-London network',
    'cta.benefits.cultural-access': 'Access to Portuguese cultural events',
    'cta.benefits.find-businesses': 'Find Portuguese businesses and services',
    'cta.benefits.connect-diaspora': 'Connect with the Portuguese diaspora',
    'cta.benefits.safe-environment': 'Safe and welcoming environment',
    'cta.benefits.free-start': 'Free to get started',
  },
  'pt-pt': {
    // Navigation
    'nav.events': 'Eventos',
    'nav.how-it-works': 'Como Funciona',
    'nav.community': 'Membros',
    'nav.community-guidelines': 'Diretrizes da Comunidade',
    'nav.pricing': 'Preços',
    'nav.about': 'Sobre',
    'nav.contact': 'Contacto',
    'nav.login': 'Entrar',
    'nav.join-community': 'Juntar à Comunidade',
    
    // Hero Section
    'hero.badge': 'Unidos pela Língua • United by Language',
    'hero.title': 'Pessoas Reais, Locais Reais, Conexões Portuguesas Reais.',
    'hero.subtitle': 'Junta-te a mais de 500 falantes de português que se encontram em locais autênticos por Londres - desde as padarias portuguesas de Stockwell aos centros culturais de Vauxhall. Vive a comunidade genuína em sítios que parecem casa.',
    'hero.cta.primary': 'Encontrar Convívios Reais',
    'hero.cta.secondary': 'Juntar à Comunidade',
    
    // How It Works Section
    'how-it-works.title': 'Encontra a Tua Comunidade Portuguesa em Londres',
    'how-it-works.subtitle': 'Conecta-te com falantes de português em locais reais por Londres em quatro passos autênticos - desde Elephant & Castle a Camden',
    'how-it-works.quote': '"A saudade só se cura com encontros reais" - A nostalgia só se cura com encontros reais em locais reais',
    'how-it-works.step1.title': 'Junta-te à Tua Família Portuguesa',
    'how-it-works.step1.subtitle': 'Junte-se à Sua Família Portuguesa',
    'how-it-works.step2.title': 'Descobre Experiências Autênticas', 
    'how-it-works.step2.subtitle': 'Descubra Experiências Autênticas',
    'how-it-works.step3.title': 'Experimenta Conexões Reais',
    'how-it-works.step3.subtitle': 'Experimente Conexões Reais',
    'how-it-works.step4.title': 'Constrói a Tua Rede Portuguesa',
    'how-it-works.step4.subtitle': 'Construa a Sua Rede Portuguesa',
    
    // Quick Start Section
    'quick-start.title': 'Conhece Falantes de Português em Locais Reais',
    'quick-start.subtitle': 'Desde cafés portugueses aconchegantes a festivais culturais vibrantes, conecta-te com a tua comunidade em locais autênticos por Londres e Reino Unido',
    'quick-start.quote': '"Onde há portugueses, há sempre uma mesa para mais um" - Onde há portugueses, há sempre lugar para mais um',
    
    // What You Can Do Section
    'what-you-can-do.badge': 'O Que Podes Fazer • What You Can Do',
    'what-you-can-do.title': 'Encontra a Tua Comunidade Portuguesa em Londres',
    'what-you-can-do.subtitle': 'Conecta-te com a autêntica cultura portuguesa através de experiências reais nos bairros portugueses vibrantes de Londres',
    'what-you-can-do.testimonial': '"Encontrei o meu povo aqui - desde almoços de domingo em Stockwell a noites de Fado em South Kensington"',
    
    'what-you-can-do.events.title': 'Encontra e Participa em Eventos',
    'what-you-can-do.events.description': 'Descobre eventos culturais portugueses por Londres - desde noites tradicionais de Fado em locais autênticos como o Bar do Fado a sessões de cinema português em centros culturais. Conecta-te com a tua herança através de experiências reais.',
    'what-you-can-do.events.cta': 'Ver Eventos',
    'what-you-can-do.events.locations': 'Stockwell • South Kensington • Vauxhall',
    
    'what-you-can-do.groups.title': 'Cria os Teus Próprios Grupos',
    'what-you-can-do.groups.description': 'Inicia grupos por idades (profissionais dos 20-30), comunidades por origem (Portugal, Brasil, Angola), ou círculos por interesses (culinária, futebol, intercâmbio linguístico). Constrói amizades duradouras.',
    'what-you-can-do.groups.cta': 'Criar Grupo',
    'what-you-can-do.groups.examples': 'Mães e Bebés • Jovens Profissionais • Social 50+',
    
    'what-you-can-do.feed.title': 'Mantém-te Atualizado no LusoFeed',
    'what-you-can-do.feed.description': 'Segue notícias da comunidade, atualizações de eventos e destaques culturais. Partilha fotos de festivais portugueses, recomenda restaurantes autênticos e mantém-te conectado com a tua comunidade portuguesa.',
    'what-you-can-do.feed.cta': 'Ver Feed',
    'what-you-can-do.feed.features': 'Atualizações em Tempo Real • Partilha de Fotos • Notícias da Comunidade',
    
    'what-you-can-do.favorites.title': 'Guarda os Teus Favoritos',
    'what-you-can-do.favorites.description': 'Nunca percas aquela padaria portuguesa perfeita, o encontro cultural mensal, ou o teu evento comunitário favorito. Constrói a tua coleção pessoal de experiências portuguesas em Londres.',
    'what-you-can-do.favorites.cta': 'Ver Itens Guardados',
    'what-you-can-do.favorites.types': 'Eventos • Negócios • Locais Culturais',
    
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
    
    // Cart and Favorites
    'cart.title': 'Carrinho de Compras',
    'cart.empty': 'Carrinho vazio',
    'cart.add-to-cart': 'Adicionar ao Carrinho',
    'cart.remove': 'Remover',
    'cart.checkout': 'Finalizar Compra',
    'cart.total': 'Total',
    'cart.item': 'item',
    'cart.items': 'itens',
    'cart.added': 'Adicionado ao carrinho',
    'cart.removed': 'Removido do carrinho',
    'cart.clear': 'Limpar Carrinho',
    'cart.save-later': 'Guardar para mais tarde',
    
    'favorites.title': 'Itens Guardados',
    'favorites.empty': 'Nenhum item guardado',
    'favorites.save': 'Guardar',
    'favorites.saved': 'Guardado',
    'favorites.remove': 'Remover dos guardados',
    'favorites.added': 'Adicionado aos favoritos',
    'favorites.removed': 'Removido dos favoritos',
    'favorites.view-all': 'Ver Todos os Guardados',
    
    'event.save': 'Guardar Evento',
    'event.saved': 'Evento Guardado',
    'event.add-to-cart': 'Adicionar ao Carrinho',
    'event.view-details': 'Ver Detalhes',
    'event.register': 'Inscrever-se',
    'event.join-waitlist': 'Juntar à Lista de Espera',
    'event.full': 'Completo',
    'event.spots-left': 'vagas restantes',
    'event.free': 'GRÁTIS',
    
    'business.save': 'Guardar Negócio',
    'business.saved': 'Negócio Guardado',
    'business.view': 'Ver Negócio',
    
    // Language Toggle
    'language.switch-to-portuguese': 'Português',
    'language.switch-to-english': 'English',
    
    // Login & Authentication
    'login.title': 'Bem-vindo de volta à família!',
    'login.subtitle': 'Entre na sua conta para conectar com a comunidade portuguesa',
    'login.community-badge': 'A sua família portuguesa em Londres',
    'login.community-missed-you': 'A sua comunidade portuguesa estava com saudades.',
    'login.hearts-waiting': 'Mais de 500 corações portugueses aguardam por si.',
    'login.community-updates': 'Novidades da Comunidade',
    'login.live': 'AGORA',
    'login.portuguese-support': 'Apoio em Português',
    'login.support-description': 'Precisa de ajuda? A nossa equipa fala português e está aqui para si.',
    'login.contact-support': 'Contactar Apoio →',
    'login.new-to-lusotown': 'Novo na LusoTown?',
    'login.join-family-description': 'Junte-se à nossa família portuguesa vibrante em Londres e encontre o seu povo.',
    'login.join-family-button': 'Juntar à Família →',
    'login.sign-in-account': 'Entre na sua conta',
    'login.email': 'Email',
    'login.email-placeholder': 'seu@email.com',
    'login.password': 'Palavra-passe',
    'login.password-placeholder': 'Introduza a sua palavra-passe',
    'login.remember-me': 'Lembrar-me',
    'login.forgot-password': 'Esqueceu a palavra-passe?',
    'login.welcome-home': 'Entrar em Casa',
    'login.signing-in': 'Bem-vindo de volta à família...',
    'login.connecting': 'Conectando com a sua comunidade...',
    'login.preparing': 'Preparando o seu lar português...',
    'login.no-account': 'Não tem conta?',
    'login.join-family-link': 'Juntar à Família',
    'login.terms-privacy': 'Ao entrar, concorda com os nossos',
    'login.terms': 'Termos de Serviço',
    'login.and': 'e',
    'login.privacy': 'Política de Privacidade',
    'login.safe-community': 'Comunidade Segura & Verificada',
    'login.fill-fields-error': 'Por favor, preencha todos os campos',
    'login.login-failed': 'Erro no login',
    'login.unexpected-error': 'Ocorreu um erro inesperado. Tente novamente.',
    
    // Community Highlights
    'login.fado-night': 'Noite de Fado no Camden',
    'login.fado-tonight': 'Hoje às 20:00 • Bar do Fado',
    'login.new-bakery': 'Nova Padaria em Stockwell',
    'login.fresh-pasteis': 'Pastéis de nata frescos todos os dias',
    'login.portuguese-mums': 'Grupo "Mães Portuguesas"',
    'login.new-members': '89 novos membros esta semana',
    'login.attendees': 'participantes',
    'login.participants': 'participantes',
    'login.table-quote': '"Onde há portugueses, há sempre uma mesa para mais um"',
    
    // Groups
    'groups.title': 'Grupos da Comunidade Portuguesa',
    'groups.subtitle': 'Encontra a tua comunidade e conecta-te com falantes de português',
    'groups.create': 'Criar Grupo',
    'groups.join': 'Juntar ao Grupo',
    'groups.joined': 'Membro',
    'groups.pending': 'Pendente',
    'groups.members': 'membros',
    'groups.member': 'membro',
    'groups.view': 'Ver Grupo',
    'groups.save': 'Guardar Grupo',
    'groups.saved': 'Grupo Guardado',
    'groups.report': 'Reportar Grupo',
    
    // Group Creation
    'group.create.title': 'Criar Grupo da Comunidade Portuguesa',
    'group.create.subtitle': 'Constrói conexões com falantes de português em Londres',
    'group.create.name': 'Nome do Grupo',
    'group.create.description': 'Descrição',
    'group.create.category': 'Categoria',
    'group.create.location': 'Localização',
    'group.create.borough': 'Região de Londres',
    'group.create.language': 'Preferência de Idioma',
    'group.create.portuguese-origin': 'Origem Portuguesa',
    'group.create.age-restrictions': 'Restrições de Idade',
    'group.create.meeting-frequency': 'Frequência de Encontros',
    'group.create.verification-level': 'Nível de Verificação',
    'group.create.max-members': 'Máximo de Membros',
    'group.create.private': 'Grupo Privado',
    'group.create.rules': 'Regras do Grupo',
    'group.create.contact': 'Informações de Contacto',
    'group.create.cultural-focus': 'Foco Cultural',
    'group.create.submit': 'Criar Grupo',
    'group.create.preview': 'Pré-visualizar Grupo',
    'group.create.success': 'Grupo criado com sucesso!',
    'group.create.error': 'Erro ao criar grupo',
    
    // Age Groups
    'age.18-25': '18-25 anos',
    'age.25-35': '25-35 anos', 
    'age.35-50': '35-50 anos',
    'age.50+': '50+ anos',
    'age.families': 'Famílias com crianças',
    'age.all-ages': 'Todas as idades bem-vindas',
    
    // Portuguese Origins
    'origin.portugal': 'Portugal',
    'origin.brazil': 'Brasil',
    'origin.angola': 'Angola',
    'origin.mozambique': 'Moçambique',
    'origin.cape-verde': 'Cabo Verde',
    'origin.guinea-bissau': 'Guiné-Bissau',
    'origin.sao-tome-principe': 'São Tomé e Príncipe',
    'origin.east-timor': 'Timor-Leste',
    'origin.macau': 'Macau',
    'origin.equatorial-guinea': 'Guiné Equatorial',
    'origin.mixed': 'Origens Mistas',
    'origin.any': 'Todas as origens lusófonas',
    
    // Meeting Frequencies
    'frequency.weekly': 'Semanalmente',
    'frequency.biweekly': 'Quinzenalmente',
    'frequency.monthly': 'Mensalmente',
    'frequency.quarterly': 'Trimestralmente',
    'frequency.irregular': 'Irregular/Conforme necessário',
    'frequency.one-time': 'Evento único',
    
    // Verification Levels
    'verification.none': 'Sem verificação necessária',
    'verification.basic': 'Verificação básica (email)',
    'verification.verified': 'Apenas utilizadores verificados',
    'verification.premium': 'Apenas membros premium',
    
    
    // Community Page
    'community.hero.title': 'A Comunidade Portuguesa de Londres',
    'community.hero.subtitle': 'Descobre a vibrante comunidade de falantes de português em Londres. Desde padarias familiares em Stockwell a centros culturais em Vauxhall, desde festivais brasileiros a noites de Fado - aqui é onde 500+ corações portugueses se encontram e se sentem em casa.',
    'community.stats.members': 'Membros da Comunidade Portuguesa',
    'community.stats.events': 'Eventos Culturais por Mês',
    'community.stats.boroughs': 'Bairros de Londres',
    'community.stats.countries': 'Países Representados',
    'community.events.title': 'Eventos Acontecendo Agora',
    'community.events.subtitle': 'Junta-te a estes eventos culturais portugueses acontecendo esta semana por Londres',
    'community.areas.title': 'Bairros da Comunidade Portuguesa',
    'community.areas.subtitle': 'Descobre onde a comunidade portuguesa se reúne em Londres. Cada bairro tem a sua própria personalidade, desde padarias familiares a centros culturais vibrantes.',
    'community.origins.title': 'Comunidades por Origem',
    'community.origins.subtitle': 'Cada país lusófono traz a sua própria cultura, tradições e calor humano. Encontra a tua comunidade de origem ou descobre outras culturas portuguesas.',
    'community.members.title': 'Conhece os Membros da Comunidade',
    'community.members.subtitle': 'Pessoas reais fazendo conexões reais através de Londres - histórias da comunidade portuguesa',
    'community.values.title': 'Nossos Valores Comunitários',
    'community.values.subtitle': 'O que torna a nossa comunidade especial? Estes valores partilhados que cada membro abraça, refletindo o melhor da cultura portuguesa.',
    'community.business.title': 'Negócios Portugueses em Londres',
    'community.business.subtitle': 'Apoia a nossa comunidade empresarial. Desde padarias familiares que fazem pastéis como a avó fazia, a restaurantes que servem francesinha autêntica, a serviços prestados por pessoas que compreendem a nossa cultura.',
    'community.cta.title': 'Pronto para se Juntar à Família Portuguesa?',
    'community.cta.subtitle': 'A tua família portuguesa está à espera. Junta-te a 500+ falantes de português que fizeram de Londres a sua casa, uma conexão de cada vez. Unidos pela língua, unidos pelo coração.',
    'community.cta.tagline': '"Unidos pela Língua" - Onde quer que venhas no mundo lusófono, aqui tens casa em Londres.',
    
    // App Download Section
    'app.badge': 'Agora Disponível no Móvel',
    'app.heading.part1': 'Leve a Sua',
    'app.heading.community': 'Comunidade',
    'app.heading.part2': 'em Todo Lado',
    'app.description': 'Nunca perca encontros lusos em Londres, chats de grupo ou novas conexões. Obtenha a aplicação móvel LusoTown e mantenha-se conectado com a comunidade portuguesa onde quer que vá.',
    'app.cta.title': 'Junte-se a 500+ portugueses verificados',
    'app.cta.description': 'A sua comunidade luso-londrina já está a crescer. Descarregue a aplicação e encontre a sua comunidade hoje.',
    'app.features.notifications.title': 'Notificações Instantâneas',
    'app.features.notifications.description': 'Nunca perca convites para eventos ou mensagens do grupo',
    'app.features.local-events.title': 'Eventos Locais',
    'app.features.local-events.description': 'Encontre encontros e atividades portuguesas próximas',
    'app.features.real-time-chat.title': 'Chat em Tempo Real',
    'app.features.real-time-chat.description': 'Mantenha-se conectado com a comunidade lusa em qualquer lugar',
    'app.features.mobile-experience.title': 'Experiência Mobile',
    'app.features.mobile-experience.description': 'Otimizado para engagement comunitário sem costura',
    'app.download.app-store-label': 'Descarregue LusoTown na App Store',
    'app.download.google-play-label': 'Obtenha LusoTown no Google Play',
    'app.info.free-download': 'Grátis para descarregar • Disponível no iOS 14+ e Android 8+',
    'app.info.secure': '100% Seguro e Verificado',
    'app.info.community': 'Comunidade Luso-Londrina',
    'app.mockup.reading-club': 'Clube de Leitura Luso',
    'app.mockup.new-messages': '3 mensagens novas',
    'app.mockup.message-preview': 'Alguém leu \'Os Maias\' do Eça de Queirós?',
    'app.mockup.weekend-walks': 'Caminhadas de Fim de Semana',
    'app.mockup.tomorrow-time': 'Amanhã, 10:00',
    'app.mockup.new-in-area': 'Novos na Sua Área',
    
    // CTA Section
    'cta.badge': 'Oferta Limitada - Junte-se Hoje',
    'cta.title': 'A Sua Comunidade Está Aqui',
    'cta.subtitle': 'Não passe mais fins-de-semana sozinho. Junte-se ao LusoTown London hoje e descubra a comunidade portuguesa que procurava.',
    'cta.button': 'JUNTAR AGORA',
    'cta.guarantee': 'Sem compromisso • Comece a conectar-se imediatamente • Cancele quando quiser',
    'cta.social-proof': 'portugueses juntaram-se nas últimas 24 horas',
    'cta.connect-time': 'Junte-se agora e conecte-se com a comunidade luso-londrina em 48 horas',
    'cta.trust.verified-profiles': 'Perfis Verificados',
    'cta.trust.community-support': 'Apoio Comunitário',
    'cta.trust.satisfaction-guarantee': 'Garantia Satisfação',
    'cta.benefits.join-community': 'Junte-se à comunidade luso-londrina',
    'cta.benefits.cultural-access': 'Acesso a eventos culturais portugueses',
    'cta.benefits.find-businesses': 'Encontre empresas e serviços lusos',
    'cta.benefits.connect-diaspora': 'Conecte-se com a diáspora portuguesa',
    'cta.benefits.safe-environment': 'Ambiente seguro e acolhedor',
    'cta.benefits.free-start': 'Gratuito para começar',
  },
  'pt-br': {
    // Navigation
    'nav.events': 'Eventos',
    'nav.how-it-works': 'Como Funciona',
    'nav.community': 'Comunidade',
    'nav.community-guidelines': 'Diretrizes da Comunidade',
    'nav.pricing': 'Preços',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'nav.join-community': 'Juntar à Família',
    
    // Hero Section
    'hero.badge': 'Unidos pela Língua • United by Language',
    'hero.title': 'Encontra a Tua Família Portuguesa em Londres.',
    'hero.subtitle': 'Bem-vindo a casa! Junta-te a mais de 500 corações portugueses que encontraram a sua gente em padarias acolhedoras de Stockwell, centros culturais calorosos de Vauxhall, e onde quer que as famílias portuguesas se reúnam. Vem como és, sai sentindo que pertences.',
    'hero.cta.primary': 'Encontrar a Minha Gente',
    'hero.cta.secondary': 'Juntar à Família',
    
    // How It Works Section
    'how-it-works.title': 'Encontre Sua Comunidade Portuguesa',
    'how-it-works.subtitle': 'Conecte-se com falantes de português em locais autênticos por todo o Reino Unido em quatro passos significativos',
    'how-it-works.quote': '"A saudade só se cura com encontros reais" - A nostalgia só se cura com encontros reais',
    'how-it-works.step1.title': 'Junte-se à Sua Família Portuguesa',
    'how-it-works.step1.subtitle': 'Junte-se à Sua Família Portuguesa',
    'how-it-works.step2.title': 'Descubra Experiências Autênticas', 
    'how-it-works.step2.subtitle': 'Descubra Experiências Autênticas',
    'how-it-works.step3.title': 'Experimente Conexões Reais',
    'how-it-works.step3.subtitle': 'Experimente Conexões Reais',
    'how-it-works.step4.title': 'Construa Sua Rede Portuguesa',
    'how-it-works.step4.subtitle': 'Construa Sua Rede Portuguesa',
    
    // Quick Start Section
    'quick-start.title': 'Conheça Falantes de Português em Locais Reais',
    'quick-start.subtitle': 'De cafés portugueses aconchegantes a festivais culturais vibrantes, conecte-se com sua comunidade em locais autênticos por Londres e Reino Unido',
    'quick-start.quote': '"Onde há portugueses, há sempre uma mesa para mais um" - Onde há portugueses, há sempre lugar para mais um',
    
    // What You Can Do Section
    'what-you-can-do.badge': 'O Que Você Pode Fazer • What You Can Do',
    'what-you-can-do.title': 'Encontre Sua Comunidade Portuguesa em Londres',
    'what-you-can-do.subtitle': 'Conecte-se com a autêntica cultura portuguesa através de experiências reais nos bairros portugueses vibrantes de Londres',
    'what-you-can-do.testimonial': '"Encontrei minha galera aqui - desde almoços de domingo em Stockwell a noites de Fado em South Kensington"',
    
    'what-you-can-do.events.title': 'Encontre e Participe de Eventos',
    'what-you-can-do.events.description': 'Descubra eventos culturais portugueses por Londres - desde noites tradicionais de Fado em locais autênticos como o Bar do Fado a sessões de cinema português em centros culturais. Conecte-se com sua herança através de experiências reais.',
    'what-you-can-do.events.cta': 'Ver Eventos',
    'what-you-can-do.events.locations': 'Stockwell • South Kensington • Vauxhall',
    
    'what-you-can-do.groups.title': 'Crie Seus Próprios Grupos',
    'what-you-can-do.groups.description': 'Inicie grupos por idades (profissionais dos 20-30), comunidades por origem (Portugal, Brasil, Angola), ou círculos por interesses (culinária, futebol, intercâmbio linguístico). Construa amizades duradouras.',
    'what-you-can-do.groups.cta': 'Criar Grupo',
    'what-you-can-do.groups.examples': 'Mamães e Bebês • Jovens Profissionais • Social 50+',
    
    'what-you-can-do.feed.title': 'Mantenha-se Atualizado no LusoFeed',
    'what-you-can-do.feed.description': 'Acompanhe notícias da comunidade, atualizações de eventos e destaques culturais. Compartilhe fotos de festivais portugueses, recomende restaurantes autênticos e mantenha-se conectado com sua comunidade portuguesa.',
    'what-you-can-do.feed.cta': 'Ver Feed',
    'what-you-can-do.feed.features': 'Atualizações em Tempo Real • Compartilhamento de Fotos • Notícias da Comunidade',
    
    'what-you-can-do.favorites.title': 'Salve Seus Favoritos',
    'what-you-can-do.favorites.description': 'Nunca perca aquela padaria portuguesa perfeita, o encontro cultural mensal, ou seu evento comunitário favorito. Construa sua coleção pessoal de experiências portuguesas em Londres.',
    'what-you-can-do.favorites.cta': 'Ver Itens Salvos',
    'what-you-can-do.favorites.types': 'Eventos • Negócios • Locais Culturais',
    
    // Features
    'features.title': 'Por que Escolher LusoTown',
    'features.subtitle': 'Seu Centro de Conexões para Comunidades Portuguesas no Reino Unido',
    'features.events.title': 'Eventos Culturais & Encontros',
    'features.events.description': 'Desde noites de Fado a festivais culturais, celebrações tradicionais a encontros comunitários portugueses - descubra e participe em eventos por todo o Reino Unido. Eventos abertos a todas as idades, com requisitos de idade específicos indicados por evento.',
    'features.groups.title': 'Comunidades Portuguesas',
    'features.groups.description': 'Conecte-se com falantes de português que compartilham seus interesses - desde preservação cultural a atividades sociais. Faça amizades genuínas por todo o Reino Unido com indivíduos de todas as idades.',
    'features.business.title': 'Rede de Negócios Portugueses',
    'features.business.description': 'Descubra negócios portugueses, restaurantes e serviços por todo o Reino Unido. Apoie nossa comunidade e encontre locais onde nossa cultura é celebrada.',
    'features.resources.title': 'Recursos Comunitários',
    'features.resources.description': 'Acesse programas de intercâmbio linguístico, workshops culturais, apoio comunitário e encontros locais. Conecte-se com sua herança portuguesa onde quer que esteja.',
    'features.stories.title': 'Histórias da Comunidade',
    'features.stories.description': 'Histórias reais de falantes de português que encontraram sua comunidade, preservaram sua cultura e construíram conexões significativas através de nossa plataforma global.',
    'features.local.title': 'Comunidades Locais',
    'features.local.description': 'Conecte-se com falantes de português em sua cidade ou região. Encontre comunidades locais, centros culturais e grupos portugueses perto de você.',
    'features.culture.title': 'Herança Cultural',
    'features.culture.description': 'Celebre e preserve as tradições, música e costumes portugueses. Desde noites de Fado a festivais tradicionais, mantenha nossa cultura viva.',
    'features.language.title': 'Intercâmbio Linguístico',
    'features.language.description': 'Pratique português com falantes nativos e ajude outros a aprender inglês. Construa conexões através da aprendizagem de línguas.',
    'features.heritage.title': 'Conexão da Herança',
    'features.heritage.description': 'Conecte-se com suas raízes portuguesas e compartilhe histórias com outros que entendem a jornada de preservar a cultura no exterior.',
    
    // Testimonials
    'testimonials.badge': 'Histórias Reais, Conexões Reais',
    'testimonials.title': 'Conheça Sua Comunidade Portuguesa Global',
    'testimonials.subtitle': 'Ouça falantes de português que encontraram sua comunidade, preservaram sua herança e construíram conexões duradouras pelo mundo',
    
    // Footer
    'footer.description': 'A plataforma para comunidades de fala portuguesa no Reino Unido. Conecte-se com sua herança portuguesa, encontre comunidades locais, participe em eventos culturais e construa amizades significativas. Aberto a todas as idades. Unidos pela Língua - United by Language.',
    'footer.newsletter.title': 'Mantenha-se Conectado',
    'footer.newsletter.description': 'Receba atualizações sobre eventos culturais portugueses, notícias da comunidade e encontros por todo o Reino Unido.',
    'footer.tagline': 'Conectando corações portugueses pelo Reino Unido',
    'footer.bottom': 'Unidos pela Língua • Comunidade UK',
    
    // About Page
    'about.hero.badge': 'Unidos pela Língua • United by Language',
    'about.hero.title': 'Sobre LusoTown',
    'about.mission.title': 'Nossa Missão: Preservar a Cultura, Conectar Corações',
    'about.mission.subtitle': 'Our Mission: Preserve Culture, Connect Hearts',
    
    // Cart and Favorites
    'cart.title': 'Carrinho de Compras',
    'cart.empty': 'Carrinho vazio',
    'cart.add-to-cart': 'Adicionar ao Carrinho',
    'cart.remove': 'Remover',
    'cart.checkout': 'Finalizar Compra',
    'cart.total': 'Total',
    'cart.item': 'item',
    'cart.items': 'itens',
    'cart.added': 'Adicionado ao carrinho',
    'cart.removed': 'Removido do carrinho',
    'cart.clear': 'Limpar Carrinho',
    'cart.save-later': 'Salvar para mais tarde',
    
    'favorites.title': 'Itens Salvos',
    'favorites.empty': 'Nenhum item salvo',
    'favorites.save': 'Salvar',
    'favorites.saved': 'Salvo',
    'favorites.remove': 'Remover dos salvos',
    'favorites.added': 'Adicionado aos favoritos',
    'favorites.removed': 'Removido dos favoritos',
    'favorites.view-all': 'Ver Todos os Salvos',
    
    'event.save': 'Salvar Evento',
    'event.saved': 'Evento Salvo',
    'event.add-to-cart': 'Adicionar ao Carrinho',
    'event.view-details': 'Ver Detalhes',
    'event.register': 'Inscrever-se',
    'event.join-waitlist': 'Entrar na Lista de Espera',
    'event.full': 'Lotado',
    'event.spots-left': 'vagas restantes',
    'event.free': 'GRÁTIS',
    
    'business.save': 'Salvar Negócio',
    'business.saved': 'Negócio Salvo',
    'business.view': 'Ver Negócio',
    
    // Language Toggle
    'language.switch-to-portuguese': 'Português',
    'language.switch-to-english': 'English',
    
    // Login & Authentication
    'login.title': 'Bem-vindo de volta à família!',
    'login.subtitle': 'Entre na sua conta para conectar com a comunidade portuguesa',
    'login.community-badge': 'Sua família portuguesa em Londres',
    'login.community-missed-you': 'Sua comunidade portuguesa estava com saudades.',
    'login.hearts-waiting': 'Mais de 500 corações portugueses aguardam por você.',
    'login.community-updates': 'Novidades da Comunidade',
    'login.live': 'AGORA',
    'login.portuguese-support': 'Suporte em Português',
    'login.support-description': 'Precisa de ajuda? Nossa equipe fala português e está aqui para você.',
    'login.contact-support': 'Entrar em Contato →',
    'login.new-to-lusotown': 'Novo na LusoTown?',
    'login.join-family-description': 'Junte-se à nossa família portuguesa vibrante em Londres e encontre sua galera.',
    'login.join-family-button': 'Entrar na Família →',
    'login.sign-in-account': 'Entre na sua conta',
    'login.email': 'Email',
    'login.email-placeholder': 'seu@email.com',
    'login.password': 'Senha',
    'login.password-placeholder': 'Digite sua senha',
    'login.remember-me': 'Lembrar de mim',
    'login.forgot-password': 'Esqueceu a senha?',
    'login.welcome-home': 'Bem-vindo a Casa',
    'login.signing-in': 'Bem-vindo de volta à família...',
    'login.connecting': 'Conectando com sua comunidade...',
    'login.preparing': 'Preparando seu lar português...',
    'login.no-account': 'Não tem conta?',
    'login.join-family-link': 'Entrar na Família',
    'login.terms-privacy': 'Ao entrar, você concorda com nossos',
    'login.terms': 'Termos de Serviço',
    'login.and': 'e',
    'login.privacy': 'Política de Privacidade',
    'login.safe-community': 'Comunidade Segura & Verificada',
    'login.fill-fields-error': 'Por favor, preencha todos os campos',
    'login.login-failed': 'Erro no login',
    'login.unexpected-error': 'Ocorreu um erro inesperado. Tente novamente.',
    
    // Community Highlights
    'login.fado-night': 'Noite de Fado no Camden',
    'login.fado-tonight': 'Hoje às 20:00 • Bar do Fado',
    'login.new-bakery': 'Nova Padaria em Stockwell',
    'login.fresh-pasteis': 'Pastéis de nata frescos todos os dias',
    'login.portuguese-mums': 'Grupo "Mamães Portuguesas"',
    'login.new-members': '89 novos membros esta semana',
    'login.attendees': 'participantes',
    'login.participants': 'participantes',
    'login.table-quote': '"Onde há portugueses, há sempre uma mesa para mais um"',
    
    // Groups
    'groups.title': 'Grupos da Comunidade Portuguesa',
    'groups.subtitle': 'Encontre sua comunidade e conecte-se com falantes de português',
    'groups.create': 'Criar Grupo',
    'groups.join': 'Entrar no Grupo',
    'groups.joined': 'Membro',
    'groups.pending': 'Pendente',
    'groups.members': 'membros',
    'groups.member': 'membro',
    'groups.view': 'Ver Grupo',
    'groups.save': 'Salvar Grupo',
    'groups.saved': 'Grupo Salvo',
    'groups.report': 'Reportar Grupo',
    
    // Group Creation
    'group.create.title': 'Criar Grupo da Comunidade Portuguesa',
    'group.create.subtitle': 'Construa conexões com falantes de português em Londres',
    'group.create.name': 'Nome do Grupo',
    'group.create.description': 'Descrição',
    'group.create.category': 'Categoria',
    'group.create.location': 'Localização',
    'group.create.borough': 'Região de Londres',
    'group.create.language': 'Preferência de Idioma',
    'group.create.portuguese-origin': 'Origem Portuguesa',
    'group.create.age-restrictions': 'Restrições de Idade',
    'group.create.meeting-frequency': 'Frequência de Encontros',
    'group.create.verification-level': 'Nível de Verificação',
    'group.create.max-members': 'Máximo de Membros',
    'group.create.private': 'Grupo Privado',
    'group.create.rules': 'Regras do Grupo',
    'group.create.contact': 'Informações de Contato',
    'group.create.cultural-focus': 'Foco Cultural',
    'group.create.submit': 'Criar Grupo',
    'group.create.preview': 'Visualizar Grupo',
    'group.create.success': 'Grupo criado com sucesso!',
    'group.create.error': 'Erro ao criar grupo',
    
    // Age Groups
    'age.18-25': '18-25 anos',
    'age.25-35': '25-35 anos', 
    'age.35-50': '35-50 anos',
    'age.50+': '50+ anos',
    'age.families': 'Famílias com crianças',
    'age.all-ages': 'Todas as idades bem-vindas',
    
    // Portuguese Origins
    'origin.portugal': 'Portugal',
    'origin.brazil': 'Brasil',
    'origin.angola': 'Angola',
    'origin.mozambique': 'Moçambique',
    'origin.cape-verde': 'Cabo Verde',
    'origin.guinea-bissau': 'Guiné-Bissau',
    'origin.sao-tome-principe': 'São Tomé e Príncipe',
    'origin.east-timor': 'Timor-Leste',
    'origin.macau': 'Macau',
    'origin.equatorial-guinea': 'Guiné Equatorial',
    'origin.mixed': 'Origens Mistas',
    'origin.any': 'Todas as origens lusófonas',
    
    // Meeting Frequencies
    'frequency.weekly': 'Semanalmente',
    'frequency.biweekly': 'A cada 2 semanas',
    'frequency.monthly': 'Mensalmente',
    'frequency.quarterly': 'Trimestralmente',
    'frequency.irregular': 'Irregular/Conforme necessário',
    'frequency.one-time': 'Evento único',
    
    // Verification Levels
    'verification.none': 'Sem verificação necessária',
    'verification.basic': 'Verificação básica (email)',
    'verification.verified': 'Apenas usuários verificados',
    'verification.premium': 'Apenas membros premium',
    
    
    // Community Page
    'community.hero.title': 'A Comunidade Portuguesa de Londres',
    'community.hero.subtitle': 'Descubra a vibrante comunidade de falantes de português em Londres. Desde padarias familiares em Stockwell a centros culturais em Vauxhall, desde festivais brasileiros a noites de Fado - aqui é onde 500+ corações portugueses se encontram e se sentem em casa.',
    'community.stats.members': 'Membros da Comunidade Portuguesa',
    'community.stats.events': 'Eventos Culturais por Mês',
    'community.stats.boroughs': 'Bairros de Londres',
    'community.stats.countries': 'Países Representados',
    'community.events.title': 'Eventos Acontecendo Agora',
    'community.events.subtitle': 'Junte-se a esses eventos culturais portugueses acontecendo esta semana por Londres',
    'community.areas.title': 'Bairros da Comunidade Portuguesa',
    'community.areas.subtitle': 'Descubra onde a comunidade portuguesa se reúne em Londres. Cada bairro tem sua própria personalidade, desde padarias familiares a centros culturais vibrantes.',
    'community.origins.title': 'Comunidades por Origem',
    'community.origins.subtitle': 'Cada país lusófono traz sua própria cultura, tradições e calor humano. Encontre sua comunidade de origem ou descubra outras culturas portuguesas.',
    'community.members.title': 'Conheça os Membros da Comunidade',
    'community.members.subtitle': 'Pessoas reais fazendo conexões reais através de Londres - histórias da comunidade portuguesa',
    'community.values.title': 'Nossos Valores Comunitários',
    'community.values.subtitle': 'O que torna nossa comunidade especial? Esses valores compartilhados que cada membro abraça, refletindo o melhor da cultura portuguesa.',
    'community.business.title': 'Negócios Portugueses em Londres',
    'community.business.subtitle': 'Apoie nossa comunidade empresarial. Desde padarias familiares que fazem pastéis como a vovó fazia, a restaurantes que servem francesinha autêntica, a serviços prestados por pessoas que compreendem nossa cultura.',
    'community.cta.title': 'Pronto para se Juntar à Família Portuguesa?',
    'community.cta.subtitle': 'Sua família portuguesa está esperando. Junte-se a 500+ falantes de português que fizeram de Londres sua casa, uma conexão de cada vez. Unidos pela língua, unidos pelo coração.',
    'community.cta.tagline': '"Unidos pela Língua" - Onde quer que você venha no mundo lusófono, você tem uma casa aqui em Londres.',
    
    // App Download Section
    'app.badge': 'Agora Disponível no Móvel',
    'app.heading.part1': 'Leve Sua',
    'app.heading.community': 'Comunidade',
    'app.heading.part2': 'em Todo Lugar',
    'app.description': 'Nunca perca encontros lusos em Londres, chats de grupo ou novas conexões. Obtenha o aplicativo móvel LusoTown e mantenha-se conectado com a comunidade portuguesa onde quer que vá.',
    'app.cta.title': 'Junte-se a 500+ portugueses verificados',
    'app.cta.description': 'Sua comunidade luso-londrina já está crescendo. Baixe o aplicativo e encontre sua comunidade hoje.',
    'app.features.notifications.title': 'Notificações Instantâneas',
    'app.features.notifications.description': 'Nunca perca convites para eventos ou mensagens do grupo',
    'app.features.local-events.title': 'Eventos Locais',
    'app.features.local-events.description': 'Encontre encontros e atividades portuguesas próximas',
    'app.features.real-time-chat.title': 'Chat em Tempo Real',
    'app.features.real-time-chat.description': 'Mantenha-se conectado com a comunidade lusa em qualquer lugar',
    'app.features.mobile-experience.title': 'Experiência Mobile',
    'app.features.mobile-experience.description': 'Otimizado para engagement comunitário sem costura',
    'app.download.app-store-label': 'Baixe LusoTown na App Store',
    'app.download.google-play-label': 'Obtenha LusoTown no Google Play',
    'app.info.free-download': 'Grátis para baixar • Disponível no iOS 14+ e Android 8+',
    'app.info.secure': '100% Seguro e Verificado',
    'app.info.community': 'Comunidade Luso-Londrina',
    'app.mockup.reading-club': 'Clube de Leitura Luso',
    'app.mockup.new-messages': '3 mensagens novas',
    'app.mockup.message-preview': 'Alguém leu \'Os Maias\' do Eça de Queirós?',
    'app.mockup.weekend-walks': 'Caminhadas de Fim de Semana',
    'app.mockup.tomorrow-time': 'Amanhã, 10:00',
    'app.mockup.new-in-area': 'Novos na Sua Área',
    
    // CTA Section
    'cta.badge': 'Oferta Limitada - Entre Hoje',
    'cta.title': 'Sua Comunidade Está Aqui',
    'cta.subtitle': 'Chega de fins de semana sozinho. Entre no LusoTown London hoje e descubra a comunidade portuguesa que você estava procurando.',
    'cta.button': 'ENTRAR AGORA',
    'cta.guarantee': 'Sem compromisso • Comece a se conectar imediatamente • Cancele quando quiser',
    'cta.social-proof': 'portugueses entraram nas últimas 24 horas',
    'cta.connect-time': 'Entre agora e se conecte com a comunidade luso-londrina em 48 horas',
    'cta.trust.verified-profiles': 'Perfis Verificados',
    'cta.trust.community-support': 'Suporte Comunitário',
    'cta.trust.satisfaction-guarantee': 'Garantia de Satisfação',
    'cta.benefits.join-community': 'Junte-se à comunidade luso-londrina',
    'cta.benefits.cultural-access': 'Acesso a eventos culturais portugueses',
    'cta.benefits.find-businesses': 'Encontre empresas e serviços lusos',
    'cta.benefits.connect-diaspora': 'Conecte-se com a diáspora portuguesa',
    'cta.benefits.safe-environment': 'Ambiente seguro e acolhedor',
    'cta.benefits.free-start': 'Grátis para começar',
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
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt-pt' || savedLanguage === 'pt-br')) {
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