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
    quote: 'Finally, a community that recognizes PALOP identity with pride! Through LusoTown membership, I\'ve connected with other Angolan entrepreneurs and also learned about Portuguese and Brazilian business opportunities.',
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
    heritage: 'Portuguese',
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
  {
    id: 'mixed-heritage-member',
    name: 'Ricardo Fernandes',
    age: 28,
    heritage: 'Portuguese-Brazilian',
    flag: '🇵🇹🇧🇷',
    location: 'London born',
    membershipType: 'Community Member',
    quote: 'As someone with mixed heritage, I finally found a place that celebrates ALL sides of the Portuguese-speaking world. I\'ve learned business Portuguese, attended Brazilian Carnival events, and made friends who understand both cultures.',
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
              <span className="text-sm font-bold text-primary-600 uppercase tracking-wider">
                {t('testimonials.lusophone.badge', 'UNIDOS PELA LÍNGUA')}
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.lusophone.title', 'What Our Global Portuguese-Speaking Community Says')}
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('testimonials.lusophone.subtitle', 'From Portugal to Brazil, Angola to Cape Verde, Mozambique to the UK - hear from successful members across the entire Lusophone world')}
            </p>
            
            {/* Flag Display */}
            <div className="flex justify-center gap-3 mt-6 text-3xl">
              🇵🇹 🇧🇷 🇦🇴 🇨🇻 🇲🇿 🇬🇼 🇸🇹 🇹🇱
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Member Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <span className="text-xl">{testimonial.flag}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{testimonial.age}</span>
                      <span>•</span>
                      <span>{testimonial.heritage}</span>
                    </div>
                    <div className="text-xs text-gray-500">{testimonial.location}</div>
                  </div>
                </div>

                {/* Membership Type Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-accent-100 to-premium-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full">
                    <StarIcon className="w-3 h-3" />
                    {testimonial.membershipType}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-4 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Achievement & Value */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="font-medium">{testimonial.achievement}</span>
                  </div>
                  
                  {testimonial.businessValue && (
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="font-medium">{testimonial.businessValue}</span>
                    </div>
                  )}
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mt-4 pt-4 border-t border-gray-100">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">Verified Member</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PALOP Excellence Recognition */}
          <div className="mt-16 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">🏆</span>
              <h3 className="text-2xl font-bold">
                {t('palop.excellence', 'PALOP Excellence Recognition: Angola 🇦🇴, Cape Verde 🇨🇻, Guinea-Bissau 🇬🇼, Mozambique 🇲🇿, São Tomé 🇸🇹')}
              </h3>
            </div>
            <p className="text-lg opacity-95 max-w-4xl mx-auto">
              {t('palop.independence', 'Celebrating 50+ years of PALOP independence and success in the UK')}
            </p>
          </div>

          {/* Community Stats */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">750+</div>
              <div className="text-sm text-gray-600">Portuguese Speakers</div>
              <div className="text-xs text-gray-500">All Nations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600">8</div>
              <div className="text-sm text-gray-600">Countries Represented</div>
              <div className="text-xs text-gray-500">🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹🇹🇱</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600">50+</div>
              <div className="text-sm text-gray-600">Monthly Events</div>
              <div className="text-xs text-gray-500">All Cultures</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-premium-600">£25M+</div>
              <div className="text-sm text-gray-600">Business Deals</div>
              <div className="text-xs text-gray-500">Cross-Border</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}