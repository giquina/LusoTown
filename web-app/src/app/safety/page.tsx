'use client'

import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  UserGroupIcon,
  EyeIcon,
  LockClosedIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
  HandRaisedIcon,
  HeartIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  LanguageIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

export default function SafetyCenter() {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'

  const safetyFeatures = [
    {
      title: isPortuguese ? 'Verificação de Identidade Portuguesa' : 'Portuguese Identity Verification',
      description: isPortuguese ? 
        'Todos os membros completam verificação de identidade portuguesa/lusófona para assegurar autenticidade cultural' :
        'Every member completes Portuguese/Lusophone identity verification to ensure cultural authenticity',
      icon: ShieldCheckIcon,
      color: 'secondary'
    },
    {
      title: isPortuguese ? 'Verificação Comunitária Portuguesa' : 'Portuguese Community Verification',
      description: isPortuguese ? 
        'Verificação de perfil assegura conexões genuínas com falantes de português em Londres' :
        'Profile verification ensures genuine connections with Portuguese speakers in London',
      icon: CheckCircleIcon,
      color: 'accent'
    },
    {
      title: isPortuguese ? 'Moderação Bilingue' : 'Bilingual Moderation',
      description: isPortuguese ? 
        'Revisão humana de todos os perfis e fotos por moderadores fluentes em português' :
        'Human review of all profiles and photos by Portuguese-fluent moderators',
      icon: EyeIcon,
      color: 'action'
    },
    {
      title: isPortuguese ? 'Mensagens Seguras em Português' : 'Secure Portuguese Messaging',
      description: isPortuguese ? 
        'Comunicação encriptada com recursos de denúncia e bloqueio em português' :
        'Encrypted communication with Portuguese reporting and blocking features',
      icon: LockClosedIcon,
      color: 'primary'
    },
    {
      title: isPortuguese ? 'Monitoramento 24/7 Bilingue' : '24/7 Bilingual Monitoring',
      description: isPortuguese ? 
        'Filtragem automática de conteúdo mais equipa de moderação que fala português' :
        'Automated content filtering plus Portuguese-speaking moderation team',
      icon: ClockIcon,
      color: 'coral'
    },
    {
      title: isPortuguese ? 'Denúncia Segura e Anônima' : 'Safe Anonymous Reporting',
      description: isPortuguese ? 
        'Sistema de denúncia anônima com tempos de resposta rápidos em português' :
        'Anonymous reporting system with quick Portuguese response times',
      icon: ExclamationTriangleIcon,
      color: 'premium'
    }
  ]

  const meetingSafelyTips = [
    {
      category: isPortuguese ? 'Antes do Encontro' : 'Before Meeting',
      icon: CheckCircleIcon,
      tips: isPortuguese ? [
        'Encontre-se sempre em locais públicos portugueses para primeiros encontros (cafés, restaurantes da comunidade)',
        'Conte a um amigo português de confiança onde vai e quando fará contacto',
        'Faça videochamada ou ligação em português antes de se encontrar pessoalmente',
        'Confie nos seus instintos - se algo não parece certo, adie o encontro',
        'Partilhe a localização e hora do encontro com alguém da sua confiança'
      ] : [
        'Always meet in Portuguese public places for first meetings (community cafés, restaurants)',
        'Tell a trusted Portuguese friend where you\'re going and when you\'ll check in',
        'Video chat or phone call in Portuguese before meeting in person',
        'Trust your instincts - if something feels off, postpone',
        'Share the meeting location and time with someone you trust'
      ]
    },
    {
      category: isPortuguese ? 'Durante o Encontro' : 'During the Meeting',
      icon: EyeIcon,
      tips: isPortuguese ? [
        'Permaneça em áreas públicas, bem iluminadas, com outras pessoas à volta (especialmente locais portugueses)',
        'Mantenha o seu telemóvel carregado e acessível',
        'Não partilhe informações pessoais como a sua morada',
        'Tenha o seu próprio transporte - não dependa de outros',
        'Confie no seu instinto - saia se se sentir desconfortável'
      ] : [
        'Stay in public, well-lit Portuguese areas with other people around',
        'Keep your phone charged and accessible',
        'Don\'t share personal information like your home address',
        'Have your own transportation - don\'t rely on others',
        'Trust your gut - leave if you feel uncomfortable'
      ]
    },
    {
      category: isPortuguese ? 'Segurança Online' : 'Online Safety',
      icon: LockClosedIcon,
      tips: isPortuguese ? [
        'Mantenha os seus detalhes pessoais privados até construir confiança',
        'Não partilhe informações financeiras nem envie dinheiro',
        'Tenha cuidado com pessoas que evitam videochamadas ou encontros em grupo',
        'Denuncie comportamentos suspeitos imediatamente em português',
        'Use o sistema de mensagens do LusoTown inicialmente'
      ] : [
        'Keep personal details private until you build trust',
        'Don\'t share financial information or send money',
        'Be cautious of people who avoid video calls or Portuguese group meetups',
        'Report suspicious behavior immediately in Portuguese',
        'Use LusoTown\'s messaging system initially'
      ]
    }
  ]

  const warningSignsData = [
    {
      category: isPortuguese ? 'Bandeiras Vermelhas no Perfil' : 'Profile Red Flags',
      signs: isPortuguese ? [
        'Recusa videochamadas ou encontros em grupos portugueses',
        'Fotos de perfil parecem demasiado profissionais ou de modelo',
        'Informações inconsistentes ou detalhes vagos sobre origem portuguesa',
        'Pressiona para contacto pessoal imediato',
        'Perfil criado recentemente com informações mínimas'
      ] : [
        'Refuses to video chat or meet in Portuguese group settings',
        'Profile photos look too professional or model-like',
        'Inconsistent information or vague details about Portuguese background',
        'Pushes for immediate personal contact information',
        'Profile recently created with minimal information'
      ]
    },
    {
      category: isPortuguese ? 'Preocupações na Comunicação' : 'Communication Concerns',
      signs: isPortuguese ? [
        'Pede dinheiro, prendas, ou assistência financeira',
        'Pressiona para encontros sozinhos ou em locais privados',
        'Fica zangado ou manipulador quando define limites',
        'Faz perguntas pessoais demais muito rapidamente',
        'A linguagem não coincide com a origem portuguesa declarada'
      ] : [
        'Asks for money, gifts, or financial assistance',
        'Pressures you to meet alone or in private locations',
        'Becomes angry or manipulative when you set boundaries',
        'Asks overly personal questions too quickly',
        'Language doesn\'t match their stated Portuguese background'
      ]
    },
    {
      category: isPortuguese ? 'Avisos Comportamentais' : 'Behavioral Warnings',
      signs: isPortuguese ? [
        'Desrespeita os seus limites ou nível de conforto',
        'Faz com que se sinta pressionada ou desconfortável',
        'Mostra sinais de comportamento controlador',
        'Fala negativamente sobre outras mulheres portuguesas ou grupos',
        'Exibe atitudes ou linguagem discriminatórias'
      ] : [
        'Disrespects your boundaries or comfort level',
        'Makes you feel pressured or uncomfortable',
        'Shows signs of controlling behavior',
        'Speaks negatively about other Portuguese women or groups',
        'Exhibits discriminatory attitudes or language'
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-accent-50 relative overflow-hidden">
          {/* Portuguese-inspired background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-8 py-4 shadow-xl mb-8 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
                  <ShieldCheckIcon className="w-5 h-5 text-secondary-600" />
                  <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                    {isPortuguese ? 'A Sua Segurança é a Nossa Prioridade' : 'Your Safety Is Our Priority'}
                  </span>
                </div>
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                {isPortuguese ? (
                  <>
                    Centro de Segurança<br />
                    <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                      Comunidade Portuguesa
                    </span>
                  </>
                ) : (
                  <>
                    Portuguese Community<br />
                    <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                      Safety Center
                    </span>
                  </>
                )}
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
                {isPortuguese ? 
                  'O LusoTown foi construído com a segurança da comunidade portuguesa no centro. Aprenda sobre as nossas funcionalidades de segurança abrangentes, obtenha dicas para encontros seguros, e aceda a recursos para navegar amizades com confiança em Londres.' :
                  'LusoTown is built with Portuguese community safety at its core. Learn about our comprehensive safety features, get tips for safe meetups, and access resources to help you navigate friendships with confidence in London.'
                }
              </p>
              
              {/* Portuguese Community Trust Elements */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-secondary-200/40">
                  <HomeIcon className="w-4 h-4 mr-2 text-secondary-500" />
                  {isPortuguese ? 'Locais Portugueses Seguros' : 'Safe Portuguese Venues'}
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-secondary-200/40">
                  <LanguageIcon className="w-4 h-4 mr-2 text-accent-500" />
                  {isPortuguese ? 'Suporte Bilingue 24/7' : '24/7 Bilingual Support'}
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-secondary-200/40">
                  <UserGroupIcon className="w-4 h-4 mr-2 text-coral-500" />
                  {isPortuguese ? 'Comunidade Verificada' : 'Verified Community'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-red-100 border-b-4 border-red-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-200/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/90 backdrop-blur-lg border border-red-300/60 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-red-800 mb-6">
                      {isPortuguese ? 'Emergência e Segurança Imediata' : 'Emergency & Immediate Safety'}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-red-50/50 rounded-2xl p-6">
                        <h3 className="font-bold text-red-700 mb-4 text-lg flex items-center">
                          <PhoneIcon className="w-5 h-5 mr-2" />
                          {isPortuguese ? 'Serviços de Emergência UK' : 'UK Emergency Services'}
                        </h3>
                        <div className="space-y-3 text-red-600">
                          <div className="flex items-center bg-white/80 rounded-lg p-3">
                            <PhoneIcon className="w-5 h-5 mr-3 text-red-500" />
                            <div>
                              <div className="font-bold text-lg">999</div>
                              <div className="text-sm">
                                {isPortuguese ? 'Polícia, Bombeiros, Ambulância' : 'Police, Fire, Ambulance'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center bg-white/80 rounded-lg p-3">
                            <PhoneIcon className="w-5 h-5 mr-3 text-red-500" />
                            <div>
                              <div className="font-bold text-lg">101</div>
                              <div className="text-sm">
                                {isPortuguese ? 'Polícia não-emergência' : 'Non-emergency police'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-50/50 rounded-2xl p-6">
                        <h3 className="font-bold text-red-700 mb-4 text-lg flex items-center">
                          <EnvelopeIcon className="w-5 h-5 mr-2" />
                          {isPortuguese ? 'Segurança da Plataforma' : 'Platform Safety'}
                        </h3>
                        <div className="space-y-3 text-red-600">
                          <div className="bg-white/80 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <EnvelopeIcon className="w-5 h-5 mr-2 text-red-500" />
                              <span className="font-bold">seguranca@lusotown.com</span>
                            </div>
                            <div className="text-sm text-red-700">
                              {isPortuguese ? 
                                'Resposta em 2-4 horas • Monitorizado 24/7 • Suporte em Português' :
                                'Response within 2-4 hours • Monitored 24/7 • Portuguese Support'
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Portuguese Community Emergency Resources */}
                    <div className="mt-8 bg-gradient-to-r from-secondary-50/60 via-accent-50/40 to-coral-50/40 rounded-2xl p-6">
                      <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center">
                        <GlobeAltIcon className="w-5 h-5 mr-2 text-secondary-600" />
                        {isPortuguese ? 'Recursos Consulares Portugueses' : 'Portuguese Consular Resources'}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/70 rounded-lg p-3">
                          <div className="font-semibold text-gray-800">
                            {isPortuguese ? 'Consulado Geral de Portugal' : 'Portuguese Consulate General'}
                          </div>
                          <div className="text-gray-600">London: +44 20 7235 5331</div>
                          <div className="text-gray-600 text-xs">
                            {isPortuguese ? 'Assistência consular para cidadãos portugueses' : 'Consular assistance for Portuguese citizens'}
                          </div>
                        </div>
                        <div className="bg-white/70 rounded-lg p-3">
                          <div className="font-semibold text-gray-800">
                            {isPortuguese ? 'Consulado do Brasil' : 'Brazilian Consulate'}
                          </div>
                          <div className="text-gray-600">London: +44 20 7499 0877</div>
                          <div className="text-gray-600 text-xs">
                            {isPortuguese ? 'Assistência para cidadãos brasileiros' : 'Assistance for Brazilian citizens'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-24 h-24 bg-secondary-200/30 rounded-full opacity-40 animate-pulse" />
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent-200/20 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '6s' }} />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-8 py-4 shadow-lg mb-8 backdrop-blur-sm">
                  <ShieldCheckIcon className="w-6 h-6 text-secondary-600" />
                  <span className="text-sm font-bold text-secondary-700">
                    {isPortuguese ? 'Segurança Integrada' : 'Built-In Safety'}
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {isPortuguese ? 
                    'Funcionalidades de Segurança da Comunidade Portuguesa' :
                    'Portuguese Community Safety Features'
                  }
                </h2>
                <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  {isPortuguese ? 
                    'Múltiplas camadas de proteção para garantir conexões autênticas portuguesas e interações seguras em Londres' :
                    'Multiple layers of protection to ensure authentic Portuguese connections and safe interactions in London'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="group bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/40 via-transparent to-accent-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-xl`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meeting Safely Guide */}
        <section className="py-20 bg-gray-50">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Meeting Safely: Your Complete Guide
                </h2>
                <p className="text-xl text-gray-600">
                  Essential safety tips for meeting new friends through LusoTown
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {meetingSafelyTips.map((section, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-6">
                      <section.icon className="w-8 h-8 text-primary-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">{section.category}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Recognize Warning Signs
                </h2>
                <p className="text-xl text-gray-600">
                  Trust your instincts and watch for these potential red flags
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {warningSignsData.map((category, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-red-800 mb-6 flex items-center">
                      <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
                      {category.category}
                    </h3>
                    
                    <div className="space-y-3">
                      {category.signs.map((sign, signIndex) => (
                        <div key={signIndex} className="flex items-start">
                          <XMarkIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{sign}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                <div className="flex items-start">
                  <HandRaisedIcon className="w-8 h-8 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4">Trust Your Instincts</h3>
                    <p className="text-yellow-700 mb-4">
                      If something feels wrong, it probably is. You don't need to justify your feelings or give someone 
                      the "benefit of the doubt" at the expense of your safety and comfort.
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-yellow-800 font-medium">
                        Remember: Genuine people will respect your boundaries, be patient with your comfort level, 
                        and want you to feel safe. Anyone who pressures or dismisses your safety concerns is not 
                        someone you want in your life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting System */}
        <section className="py-20 bg-primary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How to Report Concerns
                </h2>
                <p className="text-xl text-gray-600">
                  Multiple ways to report issues with quick, confidential responses
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-600 mr-3" />
                    In-App Reporting
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Profile Reports</h4>
                        <p className="text-gray-600 text-sm">Use the "Report" button on any profile to flag concerning behavior or fake accounts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Message Reports</h4>
                        <p className="text-gray-600 text-sm">Report inappropriate messages directly from your chat interface</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Event Reports</h4>
                        <p className="text-gray-600 text-sm">Report concerning behavior at events or inappropriate event descriptions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <EnvelopeIcon className="w-6 h-6 text-secondary-600 mr-3" />
                    Email Support
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <h4 className="font-semibold text-secondary-800 mb-2">Safety Team</h4>
                      <div className="space-y-1">
                        <div className="flex items-center text-secondary-700">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          <span>safety@lusotown.com</span>
                        </div>
                        <div className="text-secondary-600 text-sm">
                          Response: Within 2-4 hours • Monitored 24/7
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-600 text-sm">
                      <p>• All reports are confidential and taken seriously</p>
                      <p>• Include screenshots or evidence when possible</p>
                      <p>• We investigate all reports within 24 hours</p>
                      <p>• Follow-up communication within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">What Happens When You Report</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Report Received</h4>
                    <p className="text-gray-600 text-sm">Your report is immediately logged and assigned to our safety team</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Investigation</h4>
                    <p className="text-gray-600 text-sm">We review all evidence and may contact involved parties for more information</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Action Taken</h4>
                    <p className="text-gray-600 text-sm">Appropriate measures are implemented, from warnings to permanent bans</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Follow-Up</h4>
                    <p className="text-gray-600 text-sm">You receive an update on the resolution and any additional steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Resources */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Additional Support Resources
                </h2>
                <p className="text-xl text-gray-600">
                  External resources for additional support and information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Women's Safety Organizations</h3>
                  <div className="space-y-3 text-primary-700">
                    <div>
                      <h4 className="font-semibold">Women's Aid</h4>
                      <p className="text-sm">24-hour helpline: 0808 2000 247</p>
                      <p className="text-sm">Support for women experiencing domestic violence</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Victim Support</h4>
                      <p className="text-sm">24-hour helpline: 08 08 16 89 111</p>
                      <p className="text-sm">Free and confidential support for victims of crime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Mental Health Support</h3>
                  <div className="space-y-3 text-green-700">
                    <div>
                      <h4 className="font-semibold">Samaritans</h4>
                      <p className="text-sm">24-hour helpline: 116 123</p>
                      <p className="text-sm">Emotional support for anyone in distress</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Mind</h4>
                      <p className="text-sm">Info line: 0300 123 3393</p>
                      <p className="text-sm">Mental health information and support</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Online Safety</h3>
                  <div className="space-y-3 text-purple-700">
                    <div>
                      <h4 className="font-semibold">Get Safe Online</h4>
                      <p className="text-sm">Website: getsafeonline.org</p>
                      <p className="text-sm">UK's leading source for online safety advice</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Action Fraud</h4>
                      <p className="text-sm">Helpline: 0300 123 2040</p>
                      <p className="text-sm">Report online fraud and cybercrime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Emergency Services</h3>
                  <div className="space-y-3 text-red-700">
                    <div>
                      <h4 className="font-semibold">Emergency</h4>
                      <p className="text-sm">Call: 999</p>
                      <p className="text-sm">Police, Fire, Ambulance - immediate danger</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Non-Emergency Police</h4>
                      <p className="text-sm">Call: 101</p>
                      <p className="text-sm">Report crimes and get police advice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Commitment */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <HeartIcon className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-6">
                Our Commitment to Your Safety
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Your safety and wellbeing are not negotiable. We're constantly improving our safety features, 
                listening to community feedback, and working with safety experts to ensure LusoTown remains 
                a secure space for women to build meaningful friendships.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm opacity-90">
                <div className="flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  Zero Tolerance for Harassment
                </div>
                <div className="flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  24/7 Safety Monitoring
                </div>
                <div className="flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Community-First Approach
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}