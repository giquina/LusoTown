'use client'

import React, { useState, useEffect } from 'react'
import { 
  Calendar,
  Smartphone,
  Edit3,
  Bookmark,
  Store,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Heart,
  Crown,
  Star,
  Award,
  Diamond,
  Gem
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutLusoTown() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Calendar,
      title: 'Discover & Join Events',
      description: 'Find Portuguese cultural events at authentic London venues - from Fado nights to food festivals at real Portuguese locations.',
      gradient: 'from-action-500 to-action-600',
      lightBg: 'from-action-50 to-action-100/50',
      shadowColor: 'shadow-action-500/20'
    },
    {
      icon: Smartphone,
      title: 'Stay Updated on LusoTown Feed',
      description: 'See the latest events, posts, and community updates in real time.',
      gradient: 'from-primary-500 to-primary-600',
      lightBg: 'from-primary-50 to-primary-100/50',
      shadowColor: 'shadow-primary-500/20'
    },
    {
      icon: Edit3,
      title: 'Post & Share with the Community',
      description: 'Add your own updates, photos, and tips, and tag events or businesses.',
      gradient: 'from-secondary-500 to-secondary-600',
      lightBg: 'from-secondary-50 to-secondary-100/50',
      shadowColor: 'shadow-secondary-500/20'
    },
    {
      icon: Bookmark,
      title: 'Save Your Favourites',
      description: 'Bookmark events, businesses, and posts you love so you never miss out.',
      gradient: 'from-premium-500 to-premium-600',
      lightBg: 'from-premium-50 to-premium-100/50',
      shadowColor: 'shadow-premium-500/20'
    },
    {
      icon: Store,
      title: 'Support Portuguese Businesses',
      description: 'Explore our directory and discover places run by or for Portuguese speakers.',
      gradient: 'from-accent-500 to-coral-500',
      lightBg: 'from-accent-50 to-coral-100/50',
      shadowColor: 'shadow-accent-500/20'
    },
    {
      icon: Users,
      title: 'Connect with Portuguese Speakers',
      description: 'Find Your Match among Portuguese speakers through real-life meetups at authentic London venues, share experiences, and keep your language and traditions alive.',
      gradient: 'from-coral-500 to-action-500',
      lightBg: 'from-coral-50 to-action-100/50',
      shadowColor: 'shadow-coral-500/20'
    }
  ]


  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-secondary-50 overflow-hidden">
      {/* Background decorative elements - matching hero section */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200 via-primary-100 to-accent-100 rounded-full opacity-30 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-action-200 via-premium-100 to-coral-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-premium-400 rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-primary-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 border border-secondary-200 rounded-2xl px-6 py-3 shadow-lg mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'}`}>
            <Globe className="h-5 w-5 text-secondary-600" />
            <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
              {t('about.hero.badge', 'Unidos pela Língua • Portuguese Community')}
            </span>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            About <span className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">LusoTown</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium">
            LusoTown is where Portuguese hearts find their London network. Whether you're homesick, building your career while honoring your heritage, 
            or simply miss the warmth of Portuguese conversation, this is your professional home. Every person here understands your journey and opens their networks to support you.
          </p>
        </div>

        {/* Main Features Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3 shadow-lg mb-6">
              <Heart className="h-5 w-5 text-action-500" />
              <span className="text-lg font-bold text-gray-800">When you join LusoTown, you can:</span>
            </div>
          </div>

          {/* Features Grid - Enhanced Multi-Column Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative bg-white/60 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-white/30 ${feature.shadowColor} hover:shadow-xl transition-all duration-700 delay-${100 + index * 100} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:rotate-3 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lusophone Heritage Section */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-premium-50 via-accent-50 to-coral-50 border border-premium-200 rounded-3xl px-8 py-4 shadow-xl mb-8">
              <Crown className="h-6 w-6 text-premium-600" />
              <span className="text-lg font-bold bg-gradient-to-r from-premium-600 to-accent-600 bg-clip-text text-transparent">
                Prestigious Lusophone Heritage
              </span>
              <Diamond className="h-5 w-5 text-premium-500 animate-pulse" />
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Nine Nations of <span className="bg-gradient-to-r from-premium-600 via-accent-600 to-coral-600 bg-clip-text text-transparent">Excellence</span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Discover the sophisticated cultural heritage of Portuguese-speaking nations, home to luxury resorts, Michelin-starred cuisine, 
              world-renowned wines, and elite communities that shape global culture and commerce.
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Portugal",
                flag: "🇵🇹",
                heritage: "The birthplace of global exploration and maritime excellence, Portugal offers UNESCO World Heritage sites, world-class Port wine estates in Douro Valley, and luxury pousadas in historic palaces. Home to Europe's most exclusive golf resorts and Michelin-starred restaurants in Porto and Lisbon.",
                highlights: ["Luxury Pousadas & Quintas", "Port Wine Heritage", "Michelin Dining Scene", "Exclusive Golf Resorts"],
                ukDiaspora: "Portugal's UK community includes successful entrepreneurs, luxury property developers, and finance professionals who've established exclusive networking circles and premium cultural societies across London's most prestigious districts.",
                traditions: "Royal heritage preservation, artisanal craftsmanship, exclusive wine tastings",
                stats: "€45B tourism industry • 27 Michelin stars • 15 UNESCO sites"
              },
              {
                name: "Brazil",
                flag: "🇧🇷",
                heritage: "A continental powerhouse of luxury beach resorts, world-renowned cuisine, and cultural sophistication. From São Paulo's haute couture fashion week to Rio's exclusive beach clubs, Brazil represents Latin America's pinnacle of luxury lifestyle and international business excellence.",
                highlights: ["Exclusive Beach Clubs", "Haute Couture Fashion", "Premium Coffee Estates", "Luxury Eco-Resorts"],
                ukDiaspora: "Brazilian professionals in London's financial district, luxury fashion industry, and high-end hospitality sector form an affluent community with strong ties to Brazil's economic elite and international business networks.",
                traditions: "Carnival haute couture, premium cachaça tastings, exclusive samba clubs",
                stats: "£2.1T GDP • 200+ luxury resorts • World's largest fashion week"
              },
              {
                name: "Angola",
                flag: "🇦🇴",
                heritage: "Africa's oil-rich diamond nation offering exclusive safari lodges, luxury coastal resorts, and a rapidly growing high-end hospitality sector. Angola's cultural renaissance showcases sophisticated art galleries, premium restaurants, and elite social clubs in Luanda's affluent districts.",
                highlights: ["Diamond & Oil Wealth", "Exclusive Safari Lodges", "Contemporary Art Scene", "Premium Hospitality"],
                ukDiaspora: "Angolan business leaders and petroleum industry executives in London maintain extensive networks with Angola's economic elite, creating sophisticated cultural exchanges and premium business opportunities between both nations.",
                traditions: "Luxury cultural festivals, exclusive art auctions, premium traditional crafts",
                stats: "$70B oil revenues • Africa's 3rd largest economy • Growing luxury market"
              },
              {
                name: "Mozambique",
                flag: "🇲🇿",
                heritage: "East Africa's jewel offering world-class beach resorts, exclusive diving experiences, and luxury safari lodges. Mozambique's pristine coastline attracts international elite seeking ultimate privacy and sophistication in untouched natural settings.",
                highlights: ["Ultra-Luxury Beach Resorts", "Exclusive Diving Expeditions", "Premium Safari Lodges", "Private Island Getaways"],
                ukDiaspora: "Mozambican professionals in London's maritime, energy, and luxury travel sectors maintain exclusive connections with the country's tourism elite and natural resource industries.",
                traditions: "Traditional dhow sailing, exclusive cultural festivals, artisanal luxury crafts",
                stats: "$15B GDP growth • 2,500km pristine coastline • World-class diving sites"
              },
              {
                name: "Cape Verde",
                flag: "🇨🇻",
                heritage: "The Atlantic's sophisticated island nation renowned for luxury beach resorts, world-class spas, and exclusive cultural experiences. Cape Verde's volcanic landscapes host premium eco-lodges and high-end wellness retreats attracting global luxury travelers.",
                highlights: ["Luxury Island Resorts", "World-Class Spas", "Exclusive Cultural Tours", "Premium Eco-Lodges"],
                ukDiaspora: "Cape Verdean professionals in London's luxury hospitality, wellness, and cultural sectors form an elite community with strong connections to the islands' growing premium tourism industry.",
                traditions: "Morna cultural evenings, exclusive island festivals, premium craft traditions",
                stats: "€1.8B tourism revenue • 5-star resort destinations • UNESCO cultural heritage"
              },
              {
                name: "Guinea-Bissau",
                flag: "🇬🇼",
                heritage: "West Africa's exclusive destination offering pristine archipelagos, luxury fishing lodges, and unique cultural experiences. Guinea-Bissau's untouched Bijagós Islands provide ultra-exclusive retreats for discerning travelers seeking authentic luxury experiences.",
                highlights: ["Exclusive Island Retreats", "Premium Fishing Lodges", "Untouched Natural Beauty", "Cultural Authenticity"],
                ukDiaspora: "Guinea-Bissau's London professionals in environmental sciences, luxury travel, and cultural preservation maintain exclusive networks focused on sustainable luxury tourism and cultural heritage projects.",
                traditions: "Traditional mask ceremonies, exclusive cultural festivals, artisanal craftsmanship",
                stats: "UNESCO Biosphere Reserve • 88 pristine islands • Exclusive eco-tourism"
              },
              {
                name: "São Tomé and Príncipe",
                flag: "🇸🇹",
                heritage: "The Gulf of Guinea's luxury paradise offering exclusive eco-resorts, premium chocolate plantations, and sophisticated bird-watching retreats. These volcanic islands provide ultra-private luxury experiences for elite travelers seeking untouched tropical sophistication.",
                highlights: ["Ultra-Exclusive Eco-Resorts", "Premium Chocolate Estates", "Luxury Bird-Watching", "Private Island Experiences"],
                ukDiaspora: "São Tomé professionals in London's luxury food industry, eco-tourism, and sustainable development sectors form exclusive networks connecting to the islands' premium chocolate and eco-luxury markets.",
                traditions: "Chocolate plantation tours, exclusive cultural performances, traditional craftsmanship",
                stats: "World's finest cocoa • 95% forest coverage • Ultra-exclusive tourism"
              },
              {
                name: "East Timor",
                flag: "🇹🇱",
                heritage: "Southeast Asia's emerging luxury destination offering exclusive diving sites, premium eco-lodges, and sophisticated cultural experiences. East Timor's pristine mountains and coral reefs attract discerning travelers seeking authentic luxury in untouched environments.",
                highlights: ["World-Class Diving Sites", "Premium Eco-Lodges", "Exclusive Cultural Tours", "Mountain Luxury Retreats"],
                ukDiaspora: "East Timorese professionals in London's international development, luxury travel, and cultural sectors maintain sophisticated networks connecting to the nation's emerging premium tourism and cultural preservation initiatives.",
                traditions: "Traditional weaving masterclasses, exclusive cultural festivals, mountain retreat ceremonies",
                stats: "Coral triangle diving • Premium eco-tourism • UNESCO heritage sites"
              },
              {
                name: "Macau",
                flag: "🇲🇴",
                heritage: "Asia's luxury gaming and entertainment capital offering world-class casinos, Michelin-starred restaurants, and exclusive shopping experiences. Macau combines Portuguese colonial elegance with contemporary Asian sophistication, creating a unique luxury destination.",
                highlights: ["World-Class Casinos", "Michelin Dining Excellence", "Luxury Shopping", "Colonial Elegance"],
                ukDiaspora: "Macau's London professionals in gaming, luxury hospitality, and international finance maintain exclusive connections to Asia's premier luxury entertainment and high-end business networks.",
                traditions: "Portuguese-Macanese fusion cuisine, exclusive cultural festivals, luxury heritage tours",
                stats: "£45B gaming revenue • 20+ Michelin stars • Asia's Las Vegas"
              }
            ].map((country, index) => (
              <div
                key={country.name}
                className={`group relative bg-white/70 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 border border-white/40 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-premium-50/60 via-accent-50/40 to-coral-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10">
                  {/* Flag and Country Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl sm:text-5xl">{country.flag}</div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-premium-700 transition-colors duration-300">
                        {country.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-premium-500" />
                        <span className="text-sm font-semibold text-premium-600">Premium Heritage</span>
                      </div>
                    </div>
                  </div>

                  {/* Heritage Overview */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                    {country.heritage}
                  </p>

                  {/* Elite Highlights */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-accent-500" />
                      <span className="text-sm font-bold text-gray-800">Elite Highlights</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {country.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Gem className="h-3 w-3 text-coral-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UK Diaspora */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-accent-50/60 to-coral-50/40 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-accent-600" />
                      <span className="text-sm font-bold text-accent-700">Elite UK Community</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {country.ukDiaspora}
                    </p>
                  </div>

                  {/* Premium Stats */}
                  <div className="bg-gradient-to-r from-premium-50/60 to-accent-50/40 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Diamond className="h-4 w-4 text-premium-600" />
                      <span className="text-sm font-bold text-premium-700">Luxury Statistics</span>
                    </div>
                    <p className="text-xs text-premium-600 font-semibold">
                      {country.stats}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-gradient-to-r from-premium-50/80 via-accent-50/60 to-coral-50/60 border border-premium-200/40 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="h-8 w-8 text-premium-600" />
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-premium-600 to-accent-600 bg-clip-text text-transparent">
                Join London's Elite Lusophone Community
              </span>
            </div>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Connect with sophisticated Portuguese speakers who share your appreciation for luxury, culture, and exclusive experiences across London's most prestigious venues.
            </p>
            <div className="inline-flex items-center gap-3 text-premium-600 hover:text-premium-700 transition-colors duration-300 cursor-pointer group">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <span className="text-lg font-bold">Ready to join London's most exclusive Portuguese-speaking network?</span>
              <ArrowRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}