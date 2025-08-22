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
  Gem,
  Music as MusicalNote
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
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 border border-secondary-200 rounded-3xl px-8 py-4 shadow-xl mb-8">
              <MusicalNote className="h-6 w-6 text-secondary-600" />
              <span className="text-lg font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Vibrant Lusophone Culture
              </span>
              <Heart className="h-5 w-5 text-accent-500 animate-pulse" />
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Nine Nations of <span className="bg-gradient-to-r from-secondary-600 via-accent-600 to-coral-600 bg-clip-text text-transparent">Cultural Magic</span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Experience the incredible cultural energy of Portuguese-speaking nations - from passionate fado and explosive samba to sensual kizomba and soulful morna. 
              These communities bring amazing music, delicious food, vibrant nightlife, and heartwarming connections that make the UK more exciting and culturally rich.
            </p>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Portugal",
                flag: "🇵🇹",
                heritage: "The heart of fado music and passionate folklore dancing, Portugal brings soul-stirring musical traditions and modern Portuguese pop to UK communities. From intimate acoustic guitar circles to lively Santos Populares street festivals, Portuguese culture creates warm gathering spaces where everyone feels at home.",
                highlights: ["Fado Music Nights", "Traditional Folk Dancing", "Modern Portuguese Pop", "Community Festivals"],
                ukDiaspora: "Portugal's UK community creates vibrant cultural hubs across London, Manchester, and beyond, organizing fado nights in cozy pubs, folklore dance workshops, and Portuguese food festivals that welcome everyone to experience the warmth of Portuguese hospitality and traditions.",
                traditions: "Passionate fado performances, folklore dance circles, community celebrations",
                stats: "280,000+ Portuguese speakers in UK • 100+ cultural events yearly • Fado UNESCO heritage"
              },
              {
                name: "Brazil",
                flag: "🇧🇷",
                heritage: "Brazil explodes with infectious energy through samba, bossa nova, funk carioca, and forró that get everyone dancing! From passionate carnival celebrations to football watch parties that unite communities, Brazilian culture brings joy, rhythm, and that famous warm Brazilian embrace that makes everyone feel like family.",
                highlights: ["Samba & Bossa Nova", "Carnival Energy", "Funk Carioca & Forró", "Football Watch Parties"],
                ukDiaspora: "Brazilian communities across the UK create the most vibrant parties and gatherings - from Manchester samba schools to London capoeira circles, Birmingham Brazilian barbecues to Edinburgh carnival celebrations that fill the streets with music, dance, and infectious Brazilian joy.",
                traditions: "Explosive carnival street parties, capoeira circles, football celebrations",
                stats: "95,000+ Brazilians in UK • Year-round carnival energy • Samba schools in 15 cities"
              },
              {
                name: "Angola",
                flag: "🇦🇴",
                heritage: "Angola brings the sensual rhythm of kizomba and the energetic beats of semba that create magical dance floor moments! Combined with powerful gospel music, hypnotic percussion circles, and modern afrobeat fusion, Angolan culture creates spaces where people connect through rhythm, movement, and shared cultural pride.",
                highlights: ["Kizomba Dance Nights", "Semba Music Sessions", "Afrobeat Fusion", "Gospel Celebrations"],
                ukDiaspora: "Angolan communities in London, Birmingham, and Manchester host incredible kizomba dance workshops, semba music nights, and cultural festivals that celebrate African-Portuguese heritage through cooking classes, storytelling, and vibrant community gatherings that welcome everyone.",
                traditions: "Sensual kizomba dancing, rhythmic semba nights, gospel celebrations",
                stats: "25,000+ Angolans in UK • Kizomba classes in 20+ cities • Growing music scene"
              },
              {
                name: "Mozambique",
                flag: "🇲🇿",
                heritage: "Mozambique pulses with the energetic rhythms of marrabenta and pandza music that fill dance floors across the UK! From coastal food culture featuring amazing seafood feasts to powerful storytelling traditions and artistic expression workshops, Mozambican culture brings vibrant community celebrations that connect hearts.",
                highlights: ["Marrabenta Music Sessions", "Pandza Dance Circles", "Coastal Food Culture", "Community Storytelling"],
                ukDiaspora: "Mozambican communities in London, Birmingham, and Liverpool create amazing cultural experiences through marrabenta dance sessions, traditional drumming circles, coastal cuisine workshops, and heritage celebration gatherings that welcome everyone to join the cultural feast.",
                traditions: "Energetic marrabenta dancing, traditional drumming ceremonies, storytelling marathons",
                stats: "15,000+ Mozambicans in UK • Marrabenta classes in 10+ cities • Growing cultural scene"
              },
              {
                name: "Cape Verde",
                flag: "🇨🇻",
                heritage: "Cape Verde enchants with the heartfelt sounds of morna and the energetic rhythms of funaná and coladeira that create magical musical evenings! Island food culture, vibrant Creole celebrations, and traditional guitar circles bring together communities in warm, welcoming gatherings that celebrate island heritage.",
                highlights: ["Soulful Morna Sessions", "Energetic Funaná Dancing", "Coladeira Music Nights", "Creole Celebrations"],
                ukDiaspora: "Cape Verdean communities across the UK host incredible morna acoustic sessions, funaná dance parties, traditional food festivals, and island cultural celebrations that fill hearts with the warmth and beauty of island traditions.",
                traditions: "Heartfelt morna performances, high-energy funaná dancing, island celebrations",
                stats: "8,000+ Cape Verdeans in UK • Morna UNESCO heritage • Island festivals in 8 cities"
              },
              {
                name: "Guinea-Bissau",
                flag: "🇬🇼",
                heritage: "Guinea-Bissau brings the rhythmic power of gumbe music and traditional dance circles that create amazing community bonds! Through traditional rice dish celebrations, powerful oral storytelling marathons, and vibrant cultural festivals, this community preserves powerful heritage traditions.",
                highlights: ["Gumbe Music Festivals", "Traditional Dance Circles", "Community Food Sharing", "Storytelling Traditions"],
                ukDiaspora: "Guinea-Bissau communities in London and Manchester organize incredible gumbe music festivals, traditional drumming ceremonies, community cooking gatherings, and heritage celebration events that connect people through powerful cultural traditions.",
                traditions: "Rhythmic gumbe festivals, traditional drumming ceremonies, storytelling marathons",
                stats: "3,500+ Guinea-Bissauans in UK • Growing gumbe music scene • Traditional arts preservation"
              },
              {
                name: "São Tomé and Príncipe",
                flag: "🇸🇹",
                heritage: "São Tomé and Príncipe brings sweet island culture through amazing chocolate-making workshops, vibrant cultural performances, and traditional music circles that celebrate island heritage! These communities create magical gatherings where people connect through food, music, and cultural traditions.",
                highlights: ["Chocolate-Making Workshops", "Traditional Music Circles", "Island Cultural Shows", "Community Celebrations"],
                ukDiaspora: "São Tomé communities in London create wonderful cultural experiences through chocolate-making workshops, traditional music sessions, island food festivals, and cultural celebration gatherings that share the sweetness of island culture with everyone.",
                traditions: "Sweet chocolate workshops, traditional music circles, island celebrations",
                stats: "Small but vibrant UK community • Amazing chocolate heritage • Growing cultural presence"
              },
              {
                name: "East Timor",
                flag: "🇹🇱",
                heritage: "East Timor brings rich cultural traditions through traditional weaving workshops, vibrant cultural festivals, and mountain heritage ceremonies that connect people to ancient traditions! These communities create beautiful spaces for cultural dialogue and tradition preservation.",
                highlights: ["Traditional Weaving Workshops", "Cultural Heritage Festivals", "Mountain Ceremonies", "Community Dialogues"],
                ukDiaspora: "East Timorese communities in London organize beautiful traditional weaving masterclasses, cultural festivals, and heritage preservation gatherings that share the beauty of Timorese traditions and connect people through cultural dialogue.",
                traditions: "Traditional weaving circles, cultural festivals, heritage ceremonies",
                stats: "Emerging UK community • Rich weaving traditions • Cultural heritage preservation"
              },
              {
                name: "Macau",
                flag: "🇲🇴",
                heritage: "Macau creates unique cultural fusion through Portuguese-Macanese cuisine workshops, cultural festivals that blend Asian and Portuguese traditions, and heritage celebration events that showcase the beautiful blend of two cultures meeting in harmony.",
                highlights: ["Portuguese-Macanese Fusion Cuisine", "Cultural Fusion Festivals", "Heritage Tours", "East-West Celebrations"],
                ukDiaspora: "Macau communities in London create fascinating cultural fusion experiences through Portuguese-Macanese cooking classes, cultural festivals, and heritage celebration events that show the beautiful meeting of Eastern and Western traditions.",
                traditions: "Portuguese-Macanese fusion cuisine, cultural blend festivals, heritage celebrations",
                stats: "Unique cultural fusion heritage • Portuguese-Chinese traditions • Growing UK presence"
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
                        <MusicalNote className="h-4 w-4 text-secondary-500" />
                        <span className="text-sm font-semibold text-secondary-600">Cultural Heritage</span>
                      </div>
                    </div>
                  </div>

                  {/* Heritage Overview */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                    {country.heritage}
                  </p>

                  {/* Cultural Highlights */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="h-4 w-4 text-accent-500" />
                      <span className="text-sm font-bold text-gray-800">Cultural Highlights</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {country.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <MusicalNote className="h-3 w-3 text-coral-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UK Community */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-accent-50/60 to-coral-50/40 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-accent-600" />
                      <span className="text-sm font-bold text-accent-700">UK Cultural Community</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {country.ukDiaspora}
                    </p>
                  </div>

                  {/* Cultural Stats */}
                  <div className="bg-gradient-to-r from-secondary-50/60 to-accent-50/40 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-secondary-600" />
                      <span className="text-sm font-bold text-secondary-700">Cultural Impact</span>
                    </div>
                    <p className="text-xs text-secondary-600 font-semibold">
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
          <div className="bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MusicalNote className="h-8 w-8 text-secondary-600" />
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Join the UK's Most Vibrant Lusophone Community
              </span>
            </div>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Connect with passionate Portuguese speakers who love music, dancing, amazing food, and vibrant cultural celebrations! From fado nights to samba parties, kizomba dancing to carnival celebrations - find your cultural family across the UK.
            </p>
            <div className="inline-flex items-center gap-3 text-secondary-600 hover:text-secondary-700 transition-colors duration-300 cursor-pointer group">
              <Heart className="h-6 w-6 animate-pulse" />
              <span className="text-lg font-bold">Ready to experience the joy of Lusophone culture across the UK?</span>
              <ArrowRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}