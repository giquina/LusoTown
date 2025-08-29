'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface CommunityService {
  id: number
  icon: string
  title: string
  titlePt: string
  description: string
  descriptionPt: string
  action: string
  actionPt: string
}

const communityServices: CommunityService[] = [
  {
    id: 1,
    icon: '🚗',
    title: 'Ride Sharing',
    titlePt: 'Partilha de Viagens',
    description: 'Connect with community members for shared journeys',
    descriptionPt: 'Conecte-se com membros da comunidade para viagens partilhadas',
    action: 'Find Rides',
    actionPt: 'Encontrar Viagens'
  },
  {
    id: 2,
    icon: '🎯',
    title: 'Event Transport',
    titlePt: 'Transporte para Eventos',
    description: 'Coordinated transport to Portuguese community events',
    descriptionPt: 'Transporte coordenado para eventos da comunidade portuguesa',
    action: 'Book Transport',
    actionPt: 'Reservar Transporte'
  },
  {
    id: 3,
    icon: '🏥',
    title: 'Essential Services',
    titlePt: 'Serviços Essenciais',
    description: 'Transport to appointments and essential locations',
    descriptionPt: 'Transporte para consultas e locais essenciais',
    action: 'Request Help',
    actionPt: 'Solicitar Ajuda'
  },
  {
    id: 4,
    icon: '🛒',
    title: 'Shopping Trips',
    titlePt: 'Viagens de Compras',
    description: 'Group trips to Portuguese shops and markets',
    descriptionPt: 'Viagens em grupo para lojas e mercados portugueses',
    action: 'Join Group',
    actionPt: 'Juntar-se ao Grupo'
  }
]

const communityStats = [
  { number: '750+', label: 'Active Members', labelPt: 'Membros Ativos' },
  { number: '2,150+', label: 'Students Connected', labelPt: 'Estudantes Conectados' },
  { number: '8', label: 'UK Universities', labelPt: 'Universidades do Reino Unido' },
  { number: '50+', label: 'Weekly Trips', labelPt: 'Viagens Semanais' }
]

export default function ServiceCommunityBridge() {
  const { language } = useLanguage()

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
            {language === 'pt' ? 'Conectando a Comunidade' : 'Connecting the Community'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'Conectamos membros da comunidade lusófona através de serviços de transporte partilhado e coordenado'
              : 'We connect Portuguese-speaking community members through shared and coordinated transport services'
            }
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: PORTUGUESE_COLORS.gold[600] }}
              >
                {stat.number}
              </div>
              <div className="text-gray-600">
                {language === 'pt' ? stat.labelPt : stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {communityServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
                  {language === 'pt' ? service.titlePt : service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {language === 'pt' ? service.descriptionPt : service.description}
                </p>
              </div>
              
              <button 
                className="w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-300 hover:opacity-90"
                style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
              >
                {language === 'pt' ? service.actionPt : service.action}
              </button>
            </div>
          ))}
        </div>

        {/* Community Bridge Message */}
        <div 
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: PORTUGUESE_COLORS.gold[50] }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
            {language === 'pt' ? 'Mais que Transporte' : 'More Than Transport'}
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
            {language === 'pt'
              ? 'Criamos conexões genuínas na comunidade lusófona. Cada viagem é uma oportunidade para conhecer novos amigos, partilhar experiências e fortalecer os laços culturais que nos unem.'
              : 'We create genuine connections in the Portuguese-speaking community. Every trip is an opportunity to meet new friends, share experiences and strengthen the cultural bonds that unite us.'
            }
          </p>
          <button 
            className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: PORTUGUESE_COLORS.red[500] }}
          >
            {language === 'pt' ? 'Junte-se à Comunidade' : 'Join the Community'}
          </button>
        </div>
      </div>
    </section>
  )
}
