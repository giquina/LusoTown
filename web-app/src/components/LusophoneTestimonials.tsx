'use client'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { StarIcon } from '@heroicons/react/24/solid'

interface Testimonial {
  id: string
  name: string
  age: number
  heritage: string
  flag: string
  location: string
  membershipType: string
  quote: string
  achievement: string
  businessValue?: string
}

const testimonials: Testimonial[] = [
  {
    id: 'brazilian-member',
    name: 'Carlos Silva',
    age: 34,
    heritage: 'Brazilian',
    flag: '🇧🇷',
    location: 'São Paulo → London',
    membershipType: 'Executive Member',
    quote: 'As a Brazilian member of LusoTown, I love how they celebrate ALL Portuguese-speaking cultures equally. I\'ve learned so much about PALOP heritage through member events, and made business connections across the entire Lusophone world.',
    achievement: 'Connected with 15+ Angolan entrepreneurs',
    businessValue: '£500K+ in cross-border deals facilitated'
  },
  {
    id: 'angolan-member', 
    name: 'Isabel Mendes',
    age: 29,
    heritage: 'Angolan',
    flag: '🇦🇴',
    location: 'Luanda → Manchester',
    membershipType: 'Founding Member',
    quote: 'Finally, a community that recognizes PALOP identity with pride! Through LusoTown membership, I\'ve connected with other Angolan entrepreneurs and also learned about Lusophone and Brazilian business opportunities.',
    achievement: 'Founded 3 UK-Angola trade partnerships',
    businessValue: 'PALOP Business Network Leader'
  },
  {
    id: 'cape-verdean-member',
    name: 'António Tavares',
    age: 42,
    heritage: 'Cape Verdean',
    flag: '🇨🇻',
    location: 'Praia heritage',
    membershipType: 'Full Member',
    quote: 'The cultural events celebrate Morna music alongside Fado and Samba. It\'s beautiful to see all Portuguese-speaking cultures represented as equals. My children are learning about their Cape Verdean roots through community events.',
    achievement: 'Organized 12+ Morna music nights',
    businessValue: 'Cultural Heritage Preservation'
  },
  {
    id: 'portuguese-member',
    name: 'Maria Santos',
    age: 36,
    heritage: 'Lusophone',
    flag: '🇵🇹',
    location: 'Porto → London',
    membershipType: 'Associate Member',
    quote: 'I love being part of a community that\'s truly global. I\'ve made friends from Brazil, Angola, Cape Verde - the Portuguese language connects us all. My business now has clients across 5 Portuguese-speaking countries.',
    achievement: 'Built network across 8 countries',
    businessValue: 'Expanded to 3 new Lusophone markets'
  },
  {
    id: 'mozambican-member',
    name: 'Sofia Machel',
    age: 31,
    heritage: 'Mozambican',
    flag: '🇲🇿',
    location: 'Maputo → Edinburgh',
    membershipType: 'Elite Member',
    quote: 'Through LusoTown, I\'ve connected with successful professionals from across the Portuguese-speaking world. The business network helped me establish my consulting firm, and the cultural events keep me connected to my Mozambican heritage.',
    achievement: 'Launched UK consulting practice',
    businessValue: '£200K+ first-year revenue'
  },
  
  // GUINEA-BISSAU REPRESENTATION
  {
    id: 'guinea-bissau-agricultural-success',
    name: 'Maria Sanhá',
    age: 35,
    heritage: 'Guinea-Bissau',
    flag: '🇬🇼',
    location: 'Bissau → Bristol',
    membershipType: 'Professional Member',
    quote: 'Through LusoTown, I connected with other PALOP entrepreneurs and learned about UK agricultural markets. My cashew import business now supplies premium nuts to restaurants across Britain, celebrating Guinea-Bissau\'s agricultural heritage.',
    achievement: 'Built UK cashew import business serving 40+ restaurants',
    businessValue: 'First Guinea-Bissau agricultural products distributor in Southwest England'
  },

  {
    id: 'guinea-bissau-healthcare-professional',
    name: 'Dr. João Vieira',
    age: 41,
    heritage: 'Guinea-Bissau', 
    flag: '🇬🇼',
    location: 'Bissau → Manchester',
    membershipType: 'Elite Member',
    quote: 'LusoTown helped me connect with other Portuguese-speaking healthcare professionals. Working in Manchester NHS, I now coordinate tropical medicine programs and help train staff on PALOP health practices. My Guinea-Bissau medical knowledge benefits UK healthcare.',
    achievement: 'Leads tropical medicine training programs for NHS Greater Manchester',
    businessValue: 'Enhanced NHS cultural competency for Portuguese-speaking patients'
  },

  // SÃO TOMÉ AND PRÍNCIPE REPRESENTATION
  {
    id: 'sao-tome-cocoa-entrepreneur', 
    name: 'Ana do Espírito Santo',
    age: 38,
    heritage: 'São Tomé and Príncipe',
    flag: '🇸🇹',
    location: 'São Tomé → Edinburgh',
    membershipType: 'Founding Member',
    quote: 'LusoTown connected me with luxury chocolate makers across Scotland. My São Tomé Premium Cocoa business now supplies Edinburgh\'s finest chocolatiers with beans from my family\'s plantation. We\'re putting São Tomé cocoa heritage on the UK luxury map.',
    achievement: 'Supplies 12+ premium chocolatiers with authentic São Tomé cocoa',
    businessValue: '£300K+ annual revenue showcasing island cocoa heritage'
  },

  {
    id: 'sao-tome-cultural-center',
    name: 'Carlos Neves',
    age: 44,
    heritage: 'São Tomé and Príncipe',
    flag: '🇸🇹', 
    location: 'Príncipe Island → London',
    membershipType: 'Cultural Ambassador',
    quote: 'Starting the first São Tomé Cultural Center in London through connections made at LusoTown events. We preserve Tchiloli dramatic traditions, teach Ússua music, and celebrate our unique island culture. The Portuguese-speaking community embraces our island heritage.',
    achievement: 'Founded London\'s first São Tomé and Príncipe Cultural Center',
    businessValue: 'Cultural preservation and community education hub'
  },

  // EAST TIMOR/TIMOR-LESTE REPRESENTATION
  {
    id: 'east-timor-academic-researcher',
    name: 'Dr. Teresa Guterres',
    age: 33,
    heritage: 'East Timor (Timor-Leste)',
    flag: '🇹🇱',
    location: 'Dili → Oxford',
    membershipType: 'Academic Member', 
    quote: 'LusoTown opened doors to Portuguese-speaking academic networks across Europe. My research on post-colonial Portuguese identity benefits from connections with scholars from all PALOP nations. East Timor\'s unique Asian-Lusophone perspective enriches academic discourse.',
    achievement: 'Published groundbreaking research on Asian-Lusophone identity',
    businessValue: 'First East Timorese researcher at Oxford Portuguese Studies Department'
  },

  {
    id: 'east-timor-cultural-ambassador',
    name: 'Miguel Ximenes',
    age: 29,
    heritage: 'East Timor (Timor-Leste)',
    flag: '🇹🇱',
    location: 'Dili → Birmingham', 
    membershipType: 'Cultural Bridge Builder',
    quote: 'Through LusoTown, I organize events that showcase East Timor as the bridge between Asian and Lusophone cultures. Our Timorese coffee ceremonies combined with Portuguese traditions create unique cultural fusion experiences that celebrate our distinctive identity.',
    achievement: 'Organizes monthly East Timor-Portuguese cultural fusion events', 
    businessValue: 'Cultural education and bridge-building between Asian and Lusophone communities'
  },
  
  {
    id: 'mixed-heritage-member',
    name: 'Ricardo Fernandes',
    age: 28,
    heritage: 'Lusophone-Brazilian',
    flag: '🇵🇹🇧🇷',
    location: 'London born',
    membershipType: 'Community Member',
    quote: 'As someone with mixed heritage, I finally found a place that celebrates ALL sides of the Portuguese-speaking world. I\'ve learned business Lusophone, attended Brazilian Carnival events, and made friends who understand both cultures.',
    achievement: 'Cultural bridge-building champion',
    businessValue: 'Cross-cultural expertise valued at companies'
  }
]

export default function LusophoneTestimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl">🌍</span>
              <span className="text-2xl">🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹🇹🇱</span>
              <span className="text-2xl">🌍</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                {t('testimonials.title', 'Real Stories from Our Portuguese-speaking Community')}
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
              {t('testimonials.subtitle', 'Celebrating success stories from all 8 Portuguese-speaking nations across the United Kingdom')}
            </p>
            
            <p className="text-sm text-gray-500 italic">
              {t('testimonials.inclusive', 'Portugal • Brazil • Angola • Cape Verde • Mozambique • Guinea-Bissau • São Tomé & Príncipe • East Timor')}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{testimonial.flag}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.heritage} • {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Achievement */}
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-primary-600">Achievement: </span>
                    <span className="text-gray-600">{testimonial.achievement}</span>
                  </div>
                  
                  {testimonial.businessValue && (
                    <div className="text-sm">
                      <span className="font-medium text-secondary-600">Impact: </span>
                      <span className="text-gray-600">{testimonial.businessValue}</span>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                    {testimonial.membershipType}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              {t('testimonials.cta_text', 'Ready to write your own success story with the Portuguese-speaking community?')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-colors">
                {t('testimonials.cta_primary', 'Join Our Community')}
              </button>
              
              <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                {t('testimonials.cta_secondary', 'Share Your Story')}
              </button>
            </div>
          </div>

          {/* Community Statistics */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600">8</div>
                <div className="text-sm text-gray-600">Portuguese-speaking Nations Represented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600">750+</div>
                <div className="text-sm text-gray-600">Active Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-600">200+</div>
                <div className="text-sm text-gray-600">Business Success Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-action-600">15+</div>
                <div className="text-sm text-gray-600">UK Cities Connected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}