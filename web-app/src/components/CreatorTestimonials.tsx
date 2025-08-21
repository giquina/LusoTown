'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Users,
  DollarSign,
  PlayCircle,
  MapPin,
  Calendar
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function CreatorTestimonials() {
  const { language } = useLanguage()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  
  const isPt = language === 'pt'

  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      location: 'Lisboa, Portugal',
      category: isPt ? 'Música Tradicional & Fado' : 'Traditional Music & Fado',
      avatar: '/images/creators/maria-fado.jpg',
      monthlyEarnings: 1850,
      totalEarnings: 14200,
      followers: 2400,
      streams: 48,
      joinedDate: '2024-03-15',
      rating: 4.9,
      quote: isPt 
        ? 'Em apenas 6 meses na LusoTown, consegui transformar a minha paixão pelo fado numa fonte de rendimento estável. A plataforma conectou-me com portugueses em Londres que ansiavam por autêntica cultura portuguesa. Os meus workshops de fado online têm sempre casa cheia!'
        : 'In just 6 months on LusoTown, I turned my passion for fado into a stable income source. The platform connected me with Portuguese people in London who were craving authentic Portuguese culture. My online fado workshops are always sold out!',
      achievements: [
        { 
          icon: DollarSign, 
          label: isPt ? 'Maior ganho mensal' : 'Highest monthly earning', 
          value: '£2,340' 
        },
        { 
          icon: Users, 
          label: isPt ? 'Aula mais popular' : 'Most popular class', 
          value: isPt ? '89 participantes' : '89 participants' 
        },
        { 
          icon: Star, 
          label: isPt ? 'Avaliação média' : 'Average rating', 
          value: '4.9/5' 
        }
      ],
      contentHighlight: isPt 
        ? 'Especialista em ensino de guitarra portuguesa e canto tradicional'
        : 'Expert in Portuguese guitar and traditional singing instruction'
    },
    {
      id: 2,
      name: 'João Silva',
      location: 'São Paulo, Brasil',
      category: isPt ? 'Workshops Culinários' : 'Culinary Workshops',
      avatar: '/images/creators/joao-cooking.jpg',
      monthlyEarnings: 1340,
      totalEarnings: 8950,
      followers: 1890,
      streams: 52,
      joinedDate: '2024-05-20',
      rating: 4.8,
      quote: isPt
        ? 'Ensinar receitas brasileiras para a comunidade portuguesa em Londres tem sido incrivelmente gratificante. A partilha de receitas e a monetização acontecem naturalmente na plataforma. Nunca pensei que podia ganhar dinheiro a ensinar como fazer coxinhas!'
        : 'Teaching Brazilian recipes to the Portuguese community in London has been incredibly rewarding. Recipe sharing and monetization happen naturally on the platform. I never thought I could make money teaching how to make coxinhas!',
      achievements: [
        { 
          icon: PlayCircle, 
          label: isPt ? 'Streams realizadas' : 'Streams completed', 
          value: '52' 
        },
        { 
          icon: TrendingUp, 
          label: isPt ? 'Crescimento mensal' : 'Monthly growth', 
          value: '+23%' 
        },
        { 
          icon: Users, 
          label: isPt ? 'Receita mais popular' : 'Most popular recipe', 
          value: isPt ? 'Brigadeiros' : 'Brigadeiros' 
        }
      ],
      contentHighlight: isPt 
        ? 'Focado em doces brasileiros e pratos tradicionais adaptados para Londres'
        : 'Focused on Brazilian sweets and traditional dishes adapted for London'
    },
    {
      id: 3,
      name: 'Ana Costa',
      location: 'Luanda, Angola',
      category: isPt ? 'Educação Cultural & História' : 'Cultural Education & History',
      avatar: '/images/creators/ana-culture.jpg',
      monthlyEarnings: 920,
      totalEarnings: 5680,
      followers: 1520,
      streams: 38,
      joinedDate: '2024-06-10',
      rating: 4.7,
      quote: isPt
        ? 'Partilhar a história e tradições de Angola com a diáspora portuguesa tem criado ligações profundas. Os workshops ao vivo sobre a influência angolana na cultura portuguesa geram tanto impacto cultural quanto financeiro. É maravilhoso ver jovens em Londres interessados nas suas raízes.'
        : 'Sharing Angola\'s history and traditions with the Portuguese diaspora has created deep connections. Live workshops about Angolan influence on Portuguese culture generate both cultural and financial impact. It\'s wonderful to see young people in London interested in their roots.',
      achievements: [
        { 
          icon: Star, 
          label: isPt ? 'Workshop mais bem avaliado' : 'Highest rated workshop', 
          value: '4.9/5' 
        },
        { 
          icon: Users, 
          label: isPt ? 'Alunos regulares' : 'Regular students', 
          value: '45' 
        },
        { 
          icon: Calendar, 
          label: isPt ? 'Workshops mensais' : 'Monthly workshops', 
          value: '8' 
        }
      ],
      contentHighlight: isPt 
        ? 'Especialista em história da lusofonia e influências culturais africanas'
        : 'Expert in Lusophone history and African cultural influences'
    },
    {
      id: 4,
      name: 'Pedro Rocha',
      location: 'Porto, Portugal',
      category: isPt ? 'Empreendedorismo & Negócios' : 'Entrepreneurship & Business',
      avatar: '/images/creators/pedro-business.jpg',
      monthlyEarnings: 1580,
      totalEarnings: 11400,
      followers: 2100,
      streams: 41,
      joinedDate: '2024-04-01',
      rating: 4.8,
      quote: isPt
        ? 'Como empresário português em Londres, uso a LusoTown para partilhar conhecimentos sobre como montar negócios no Reino Unido. A comunidade é muito engajada e os workshops sobre vistos de negócios e networking profissional são sempre muito procurados.'
        : 'As a Portuguese entrepreneur in London, I use LusoTown to share knowledge about setting up businesses in the UK. The community is very engaged and workshops about business visas and professional networking are always in high demand.',
      achievements: [
        { 
          icon: DollarSign, 
          label: isPt ? 'Maior evento' : 'Biggest event', 
          value: '£480' 
        },
        { 
          icon: Users, 
          label: isPt ? 'Participantes únicos' : 'Unique participants', 
          value: '127' 
        },
        { 
          icon: TrendingUp, 
          label: isPt ? 'Taxa de reconversão' : 'Return rate', 
          value: '78%' 
        }
      ],
      contentHighlight: isPt 
        ? 'Consultoria especializada para empreendedores portugueses no Reino Unido'
        : 'Specialized consultancy for Portuguese entrepreneurs in the United Kingdom'
    },
    {
      id: 5,
      name: 'Carmen Fernandes',
      location: 'Mindelo, Cabo Verde',
      category: isPt ? 'Música & Dança Cabo-verdiana' : 'Cape Verdean Music & Dance',
      avatar: '/images/creators/carmen-morna.jpg',
      monthlyEarnings: 760,
      totalEarnings: 4200,
      followers: 980,
      streams: 29,
      joinedDate: '2024-07-15',
      rating: 4.9,
      quote: isPt
        ? 'Ensinar morna e coladeira para a comunidade cabo-verdiana em Londres tem sido uma experiência única. A LusoTown permite-me manter viva a cultura cabo-verdiana entre os mais jovens da diáspora, e ainda consigo sustentar a minha família com isso.'
        : 'Teaching morna and coladeira to the Cape Verdean community in London has been a unique experience. LusoTown allows me to keep Cape Verdean culture alive among the younger diaspora, and I can still support my family with it.',
      achievements: [
        { 
          icon: PlayCircle, 
          label: isPt ? 'Aulas de dança' : 'Dance classes', 
          value: '24' 
        },
        { 
          icon: Star, 
          label: isPt ? 'Especialidade' : 'Specialty', 
          value: 'Morna' 
        },
        { 
          icon: Users, 
          label: isPt ? 'Alunos ativos' : 'Active students', 
          value: '31' 
        }
      ],
      contentHighlight: isPt 
        ? 'Preservação autêntica da música e dança tradicional cabo-verdiana'
        : 'Authentic preservation of traditional Cape Verdean music and dance'
    }
  ]

  // Auto-advance testimonials
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [autoPlay, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  const currentCreator = testimonials[currentTestimonial]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isPt ? 'Histórias de Sucesso dos Criadores' : 'Creator Success Stories'}
        </h2>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          {isPt
            ? 'Conheça criadores portugueses reais que transformaram a sua paixão cultural numa fonte de rendimento sustentável na LusoTown.'
            : 'Meet real Portuguese creators who have transformed their cultural passion into sustainable income on LusoTown.'}
        </p>
      </div>

      {/* Main Testimonial Display */}
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Creator Profile */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-4xl font-bold text-primary-600">
                    {currentCreator.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {currentCreator.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-secondary-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{currentCreator.location}</span>
                  </div>
                  <p className="text-sm text-primary-600 font-medium mb-3">
                    {currentCreator.category}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(currentCreator.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-secondary-600 ml-1">
                      {currentCreator.rating}/5
                    </span>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xl font-bold text-action-600">
                        £{currentCreator.monthlyEarnings.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-700">
                        {isPt ? 'Mensal' : 'Monthly'}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xl font-bold text-primary-600">
                        {currentCreator.followers.toLocaleString()}
                      </div>
                      <div className="text-xs text-primary-700">
                        {isPt ? 'Seguidores' : 'Followers'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Quote className="w-12 h-12 text-primary-200 absolute -top-2 -left-2" />
                  <blockquote className="text-lg text-secondary-700 leading-relaxed pl-8">
                    {currentCreator.quote}
                  </blockquote>
                </div>

                {/* Content Highlight */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {isPt ? 'Especialização:' : 'Specialization:'}
                  </h4>
                  <p className="text-secondary-600 text-sm">
                    {currentCreator.contentHighlight}
                  </p>
                </div>

                {/* Achievements */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {isPt ? 'Destaques:' : 'Achievements:'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentCreator.achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="p-2 bg-primary-100 rounded-lg">
                          <achievement.icon className="w-4 h-4 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {achievement.value}
                          </div>
                          <div className="text-xs text-secondary-600">
                            {achievement.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6 flex items-center gap-4 text-sm text-secondary-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {isPt ? 'Membro desde' : 'Member since'} {
                        new Date(currentCreator.joinedDate).toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', {
                          month: 'long',
                          year: 'numeric'
                        })
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      £{currentCreator.totalEarnings.toLocaleString()} {isPt ? 'total ganho' : 'total earned'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-secondary-600" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-secondary-600" />
          </button>
        </div>
      </div>

      {/* Testimonial Dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTestimonial(index)
              setAutoPlay(false)
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentTestimonial
                ? 'bg-primary-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {isPt ? 'Impacto Coletivo dos Nossos Criadores' : 'Collective Impact of Our Creators'}
          </h3>
          <p className="text-secondary-600">
            {isPt 
              ? 'Números reais da nossa comunidade de criadores portugueses'
              : 'Real numbers from our Portuguese creator community'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              £{testimonials.reduce((sum, creator) => sum + creator.totalEarnings, 0).toLocaleString()}
            </div>
            <div className="text-sm text-secondary-600">
              {isPt ? 'Total Pago' : 'Total Paid Out'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600">
              {testimonials.reduce((sum, creator) => sum + creator.followers, 0).toLocaleString()}
            </div>
            <div className="text-sm text-secondary-600">
              {isPt ? 'Seguidores Totais' : 'Total Followers'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">
              {testimonials.reduce((sum, creator) => sum + creator.streams, 0)}
            </div>
            <div className="text-sm text-secondary-600">
              {isPt ? 'Streams Realizadas' : 'Streams Completed'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-action-600">
              {(testimonials.reduce((sum, creator) => sum + creator.rating, 0) / testimonials.length).toFixed(1)}/5
            </div>
            <div className="text-sm text-secondary-600">
              {isPt ? 'Avaliação Média' : 'Average Rating'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}