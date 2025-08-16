'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  SparklesIcon,
  GlobeAltIcon,
  CurrencyPoundIcon,
  HeartIcon,
  ArrowRightIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { toast } from 'react-hot-toast'

export default function HostPage() {
  const { t, language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [selectedCategory, setSelectedCategory] = useState<'professional' | 'cultural' | 'business'>('professional')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'professional',
    experience: '',
    description: '',
    location: '',
    availability: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    toast.success(isPortuguese ? 'Aplicação enviada com sucesso!' : 'Application submitted successfully!')
  }

  const categories = [
    {
      id: 'professional',
      title: isPortuguese ? 'Serviços Profissionais' : 'Professional Services',
      description: isPortuguese ? 'Workshops de IA, coaching empresarial, consultoria' : 'AI workshops, business coaching, consulting',
      icon: AcademicCapIcon,
      color: 'premium',
      examples: isPortuguese ? ['Workshops de IA', 'Coaching Empresarial', 'Consultoria Investimento'] : ['AI Workshops', 'Business Coaching', 'Investment Consulting']
    },
    {
      id: 'cultural',
      title: isPortuguese ? 'Eventos Culturais' : 'Cultural Events',
      description: isPortuguese ? 'Aulas de culinária, noites de Fado, tours culturais' : 'Cooking classes, Fado nights, cultural tours',
      icon: SparklesIcon,
      color: 'secondary',
      examples: isPortuguese ? ['Aulas Culinária', 'Noites Fado', 'Tours Culturais'] : ['Cooking Classes', 'Fado Nights', 'Cultural Tours']
    },
    {
      id: 'business',
      title: isPortuguese ? 'Promoção Empresarial' : 'Business Promotion',
      description: isPortuguese ? 'Restaurantes, lojas, serviços profissionais' : 'Restaurants, shops, professional services',
      icon: BriefcaseIcon,
      color: 'coral',
      examples: isPortuguese ? ['Restaurantes', 'Lojas', 'Serviços'] : ['Restaurants', 'Shops', 'Services']
    }
  ]

  const benefits = [
    {
      icon: UserGroupIcon,
      title: isPortuguese ? 'Alcance 500+ Portugueses' : 'Reach 500+ Portuguese Speakers',
      description: isPortuguese ? 'Conecte com profissionais, famílias e jovens adultos portugueses' : 'Connect with Portuguese professionals, families, and young adults'
    },
    {
      icon: CurrencyPoundIcon,
      title: isPortuguese ? 'Gere Receita Sustentável' : 'Generate Sustainable Revenue',
      description: isPortuguese ? 'Monetize a sua experiência com processamento de pagamentos integrado' : 'Monetize your expertise with built-in payment processing'
    },
    {
      icon: GlobeAltIcon,
      title: isPortuguese ? 'Construa a Sua Rede' : 'Build Your Network',
      description: isPortuguese ? 'Conecte com outros profissionais portugueses' : 'Connect with fellow Portuguese professionals'
    },
    {
      icon: HeartIcon,
      title: isPortuguese ? 'Preserve o Património' : 'Preserve Heritage',
      description: isPortuguese ? 'Partilhe a cultura portuguesa enquanto constrói negócio' : 'Share Portuguese culture while building business'
    }
  ]

  const steps = [
    {
      number: 1,
      title: isPortuguese ? 'Candidate-se' : 'Apply',
      description: isPortuguese ? 'Preencha o formulário com os seus dados e experiência' : 'Fill out the form with your details and experience'
    },
    {
      number: 2,
      title: isPortuguese ? 'Revisão' : 'Review',
      description: isPortuguese ? 'A nossa equipa revê a sua candidatura (24-48h)' : 'Our team reviews your application (24-48h)'
    },
    {
      number: 3,
      title: isPortuguese ? 'Configuração' : 'Setup',
      description: isPortuguese ? 'Configure o seu perfil e primeiro evento/serviço' : 'Set up your profile and first event/service'
    },
    {
      number: 4,
      title: isPortuguese ? 'Lançamento' : 'Launch',
      description: isPortuguese ? 'Comece a aceitar reservas da comunidade' : 'Start accepting bookings from the community'
    }
  ]

  const successStories = [
    {
      name: 'Maria Santos',
      role: isPortuguese ? 'Instrutora de IA' : 'AI Instructor',
      quote: isPortuguese ? 'Organizei 15 workshops de IA e construí uma base sólida de clientes portugueses. O apoio da comunidade é incrível!' : 'I\'ve hosted 15 AI workshops and built a solid Portuguese client base. The community support is incredible!',
      revenue: '£3,500/month',
      avatar: 'MS'
    },
    {
      name: 'João Silva',
      role: isPortuguese ? 'Proprietário de Padaria' : 'Bakery Owner',
      quote: isPortuguese ? 'A minha padaria passou de local para Londres inteira. Agora organizo workshops mensais e a clientela triplicou!' : 'My bakery went from local to London-wide. Now I host monthly workshops and my customer base tripled!',
      revenue: '£5,200/month',
      avatar: 'JS'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-premium-50 via-white to-coral-50 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-premium-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-70"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-70"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-block bg-gradient-to-r from-premium-600 to-coral-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg mb-4">
                  {isPortuguese ? 'Para Profissionais Portugueses' : 'For Portuguese Professionals'}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                {isPortuguese ? 'Partilhe a Sua Especialidade Portuguesa' : 'Share Your Portuguese Expertise'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 mb-8"
              >
                {isPortuguese 
                  ? 'Junta-te a centenas de profissionais portugueses que apresentam os seus serviços à nossa comunidade crescente. Desde workshops de negócios a experiências culturais.'
                  : 'Join hundreds of Portuguese professionals showcasing their services to our growing community. From business workshops to cultural experiences.'
                }
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="#apply"
                  className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-premium-600 to-coral-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isPortuguese ? 'Começar Agora' : 'Get Started Now'}
                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
                <a
                  href="#benefits"
                  className="text-lg font-bold px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-premium-300 hover:-translate-y-1"
                >
                  {isPortuguese ? 'Saber Mais' : 'Learn More'}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Escolha a Sua Categoria' : 'Choose Your Category'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isPortuguese 
                  ? 'Que tipo de experiência quer partilhar com a comunidade portuguesa?'
                  : 'What type of experience do you want to share with the Portuguese community?'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => {
                const IconComponent = category.icon
                const isSelected = selectedCategory === category.id
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`relative cursor-pointer p-8 rounded-3xl border-2 transition-all duration-300 ${
                      isSelected
                        ? `border-${category.color}-500 bg-${category.color}-50 shadow-xl scale-105`
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedCategory(category.id as any)}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      isSelected 
                        ? `bg-gradient-to-r from-${category.color}-500 to-${category.color}-600` 
                        : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <span 
                          key={example}
                          className={`text-xs px-3 py-1 rounded-full ${
                            isSelected 
                              ? `bg-${category.color}-100 text-${category.color}-800`
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                    
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <CheckIcon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Porquê Escolher a LusoTown?' : 'Why Choose LusoTown?'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isPortuguese 
                  ? 'Junte-se a uma plataforma dedicada ao sucesso de profissionais portugueses'
                  : 'Join a platform dedicated to the success of Portuguese professionals'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-premium-500 to-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Histórias de Sucesso' : 'Success Stories'}
              </h2>
              <p className="text-lg text-gray-600">
                {isPortuguese ? 'Profissionais portugueses reais construindo negócios prósperos' : 'Real Portuguese professionals building thriving businesses'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-premium-400 to-coral-400 rounded-full flex items-center justify-center text-white font-bold">
                      {story.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{story.name}</h3>
                      <p className="text-gray-600 text-sm">{story.role}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm text-gray-500">{isPortuguese ? 'Receita Mensal' : 'Monthly Revenue'}</div>
                      <div className="font-bold text-green-600">{story.revenue}</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Como Funciona' : 'How It Works'}
              </h2>
              <p className="text-lg text-gray-600">
                {isPortuguese ? 'Processo simples para começar a organizar' : 'Simple process to start hosting'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-premium-500 to-coral-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <ArrowRightIcon className="w-6 h-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-20 bg-gradient-to-r from-premium-50 to-coral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Candidate-se Agora' : 'Apply Now'}
              </h2>
              <p className="text-lg text-gray-600">
                {isPortuguese ? 'Preencha o formulário e comece a partilhar a sua experiência' : 'Fill out the form and start sharing your expertise'}
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Nome Completo' : 'Full Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                      placeholder={isPortuguese ? 'O seu nome' : 'Your name'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Telefone' : 'Phone'} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                      placeholder="+44 7xxx xxx xxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Categoria' : 'Category'} *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                    >
                      <option value="professional">{isPortuguese ? 'Serviços Profissionais' : 'Professional Services'}</option>
                      <option value="cultural">{isPortuguese ? 'Eventos Culturais' : 'Cultural Events'}</option>
                      <option value="business">{isPortuguese ? 'Promoção Empresarial' : 'Business Promotion'}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Experiência/Especialidade' : 'Experience/Expertise'} *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                    placeholder={isPortuguese ? 'Ex: Consultor de IA, Chef, Instrutor de Fado' : 'Ex: AI Consultant, Chef, Fado Instructor'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPortuguese ? 'Descrição da Sua Oferta' : 'Description of Your Offering'} *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                    placeholder={isPortuguese ? 'Descreva o que quer oferecer à comunidade portuguesa...' : 'Describe what you want to offer to the Portuguese community...'}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Localização' : 'Location'} *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                      placeholder={isPortuguese ? 'Ex: Londres, Manchester' : 'Ex: London, Manchester'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPortuguese ? 'Disponibilidade' : 'Availability'}
                    </label>
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-premium-400 focus:border-transparent"
                      placeholder={isPortuguese ? 'Ex: Fins de semana, Noites' : 'Ex: Weekends, Evenings'}
                    />
                  </div>
                </div>
                
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-premium-600 to-coral-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-premium-700 hover:to-coral-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {isPortuguese ? 'Enviar Candidatura' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}