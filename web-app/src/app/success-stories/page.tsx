import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  HeartIcon, 
  UserGroupIcon, 
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  StarIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline'

// TypeScript interfaces
interface FeaturedStory {
  id: number
  name: string
  location: string
  memberSince: string
  title: string
  excerpt: string
  story: string
  image: string
  tags: string[]
  joinDate: string
  testimonial: string
}

interface QuickStory {
  name: string
  location: string
  story: string
  category: string
}

interface ImpactStat {
  label: string
  value: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const metadata: Metadata = {
  title: 'Success Stories - Portuguese Community Connections | LusoTown London',
  description: 'Real success stories from Portuguese speakers who found their community in London. From Portugal to Brazil, Angola to Mozambique - discover how LusoTown connects Portuguese hearts across the UK.',
  keywords: [
    'Portuguese community London success stories',
    'Brazilian community UK testimonials',
    'Angolan community London connections',
    'Mozambican community UK experiences',
    'Cape Verdean London networking',
    'Portuguese business partnerships UK',
    'Lusophone community success',
    'Portuguese cultural preservation London',
    'Portuguese friendship networks UK',
    'Portuguese heritage community'
  ],
  openGraph: {
    title: 'Success Stories - Real Women, Real Connections | LusoTown',
    description: 'Discover how LusoTown has helped thousands of women 30+ across the UK build lasting friendships, launch businesses, and create meaningful support networks.',
    type: 'website',
    url: 'https://adyatribe.com/success-stories',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LusoTown Success Stories - Women Building Connections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Success Stories - Real Women, Real Connections | LusoTown',
    description: 'Discover how LusoTown has helped thousands of women 30+ across the UK build lasting friendships and support networks.',
    images: ['/og-image.jpg'],
  },
}

export default function SuccessStories() {
  const featuredStories: FeaturedStory[] = [
    {
      id: 1,
      name: "Maria & Sofia",
      location: "Stockwell, London",
      memberSince: "March 2024",
      title: "From Saudade to Irmandade: Portuguese Sisters Born in London",
      excerpt: "Two Portuguese souls meeting over shared saudade, now building Portuguese family traditions in London. From strangers to sisters through fado, food, and our ancestors' wisdom.",
      story: `Vim do Porto for my banking career carrying minha mãe's prayers and minha avó's strength, but London's success tasted empty without Portuguese warmth. The saudade cut deeper than homesickness - it was cultural soul-longing that no amount of professional achievement could heal.

      Sofia and I met at a magical fado night at Portuguese Cultural Centre in Camden. She'd come from São Paulo with similar dreams and identical heartache. As 'Lágrima' played, we both cried - not from sadness, but from recognition. Finally, alguém who understood that success without cultura feels hollow.

      What started as Portuguese coffee dates at a café in Stockwell turned into weekly Sunday lunches cooking traditional recipes together. When my mother couldn't visit for my birthday, Sofia organized a surprise Portuguese festa with pastéis de nata, vinho verde, and even hired a fadista.

      Now we're planning to bring our families together - Sofia's parents are visiting from Brazil, and my mother from Portugal. LusoTown didn't just help us find friendship; it helped us create the Portuguese family support system we missed. We speak Portuguese together, preserve our traditions, and help other Portuguese newcomers feel at home.

      Through our friendship, we've also connected with other Portuguese professionals and even started a monthly Portuguese book club reading authors from Portugal, Brazil, Angola, and Mozambique.`,
      image: "members/maria-sofia.jpg",
      tags: ["Portuguese Heritage", "Cultural Preservation", "Saudade Support"],
      joinDate: "2024-03",
      testimonial: "LusoTown gave us more than friendship - it gave us irmandade portuguesa that transforms London saudade into amor de família. Unidos pela língua, strengthened by saudade shared."
    },
    {
      id: 2,
      name: "João Pedro",
      location: "Vauxhall, London",
      memberSince: "January 2024",
      title: "Building My London Portuguese Network",
      excerpt: "After years in tech feeling isolated, LusoTown helped me find Portuguese professionals who understand both my career ambitions and cultural background.",
      story: `Working in London's tech scene for three years, I was successful professionally but culturally isolated. Most networking events felt superficial, and I missed the depth of Portuguese relationships and conversation.

      LusoTown's Portuguese professional network changed everything. I connected with other Portuguese speakers in tech, finance, and creative industries who understood the balance between career ambition and maintaining cultural identity.

      Through the network, I met Carlos, a Brazilian designer, and Ana, a software engineer from Lisbon. We started a monthly meetup for Portuguese-speaking tech professionals that now attracts 40+ people regularly. We discuss everything from career growth to preserving Portuguese work culture values in London's corporate environment.

      The community also supported my side project - a language learning app for Portuguese children born in the UK. Three community members became beta testers, two invested in the startup, and one became my business partner.

      Last month, we organized London's first Portuguese Tech Summit, attended by 150+ professionals from across the UK. It was covered by Portuguese media and even attracted attention from companies wanting to hire Portuguese talent.

      LusoTown showed me that professional networking doesn't have to mean losing cultural identity - it can mean strengthening both your career and your community simultaneously.`,
      image: "members/joao-pedro.jpg",
      tags: ["Professional Network", "Tech Community", "Cultural Identity"],
      joinDate: "2024-01",
      testimonial: "Finding Portuguese professionals who share my values and ambitions has been transformative - both for my career and my sense of belonging in London."
    },
    {
      id: 3,
      name: "Ana Lúcia & Family",
      location: "Elephant & Castle, London",
      memberSince: "February 2024",
      title: "Portuguese Family Community for Our Children",
      excerpt: "We found other Portuguese families who understand the importance of raising bilingual children with cultural pride. Our kids now have Portuguese friends and we have our village.",
      story: `Moving to London with two young children, my biggest worry was that they would lose their Portuguese language and cultural connection. Local schools and activities were great, but we needed our children to maintain their Portuguese identity.

      Through LusoTown, we discovered other Portuguese and Brazilian families facing the same challenge. We formed a support network that meets weekly for Portuguese playgroups where children speak only Portuguese and learn about our traditions.

      We organize Portuguese children's festivals, celebrate Santos Populares together, and even started a Portuguese Saturday school in partnership with the Portuguese Church in South London. Our children now have best friends who speak Portuguese and understand their bicultural experience.

      My daughter, who was becoming shy about speaking Portuguese, now proudly teaches her British school friends Portuguese words and explains Portuguese holidays to her class. She sees her bilingual identity as a superpower rather than something different.

      We've also created a practical support network - from sharing Portuguese children's books to coordinating visits to Portugal so kids can travel together. When my mother visits from Braga, she now has multiple Portuguese families to visit and our children have Portuguese grandmothers and aunts.

      LusoTown helped us realize we weren't alone in wanting to raise confident, bilingual Portuguese children in London. We've built the Portuguese village our children needed to thrive.`,
      image: "members/ana-lucia-family.jpg",
      tags: ["Family Community", "Bilingual Children", "Cultural Transmission"],
      joinDate: "2024-02",
      testimonial: "Our children are growing up proud to be Portuguese in London because LusoTown helped us find families who share our values and cultural commitment."
    }
  ]

  const quickStories: QuickStory[] = [
    {
      name: "Carlos",
      location: "Camden, London",
      story: "From watching Portugal matches alone with saudade, to leading 50-strong Portuguese football família at The Portuguese Tavern! Every goal celebration feels like home - 'GOOOOLO!' echoing with nossa paixão!",
      category: "Portuguese Football Família"
    },
    {
      name: "Isabella",
      location: "Manchester",
      story: "Struggling with imposter syndrome until I met Portuguese professionals who saw my Brazilian warmth as strength, not weakness. Now thriving with mentors who speak both business and coração!",
      category: "Brazilian Professional Power"
    },
    {
      name: "Miguel",
      location: "Birmingham",
      story: "Found Portuguese book club where we debate Saramago over vinho verde, cry over Eça de Queirós with pastéis de nata, and discover contemporary voices. Literatura feeds nossa alma!",
      category: "Portuguese Literature & Soul"
    },
    {
      name: "Fernanda",
      location: "Bermondsey, London",
      story: "Teaching minha avó's receitas to Portuguese families in London! From caldo verde to bacalhau, preserving our mothers' wisdom one meal at a time. Cooking together, keeping cultura alive!",
      category: "Avó's Recipes & Heritage"
    },
    {
      name: "Ricardo",
      location: "Edinburgh",
      story: "After feeling culturally isolated, I found Portuguese speakers who celebrate our heritage and support each other's success.",
      category: "Cultural Pride"
    },
    {
      name: "Catarina",
      location: "Bristol",
      story: "Our monthly Portuguese mums meetup is a lifeline - sharing parenting in Portuguese while kids play together.",
      category: "Portuguese Mothers"
    },
    {
      name: "André",
      location: "Leeds",
      story: "The business network helped me launch my consultancy with Portuguese clients - community became customers and mentors.",
      category: "Entrepreneurship"
    },
    {
      name: "Mariana",
      location: "Liverpool",
      story: "Planning group trips back to Portugal with London Portuguese friends - maintaining roots while building UK life!",
      category: "Heritage Travel"
    },
    {
      name: "Paulo",
      location: "Oxford",
      story: "Organizing Portuguese film nights screening movies from Portugal, Brazil, and Lusophone Africa - cultural preservation through cinema.",
      category: "Cultural Events"
    }
  ]

  const impactStats: ImpactStat[] = [
    { label: "Portuguese Friendships Formed", value: "750+", icon: HeartIcon },
    { label: "Cultural Communities Created", value: "85+", icon: UserGroupIcon },
    { label: "Portuguese Business Partnerships", value: "42+", icon: TrophyIcon },
    { label: "Portuguese Speakers Connected", value: "1,200+", icon: SparklesIcon }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <HeartIcon className="w-4 h-4 mr-2" />
                Real Stories • Real Friendships
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                From Saudade to Success: Portuguese Hearts United in London
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-balance">
                Real Portuguese souls who transformed London loneliness into thriving community connections. From pastéis de nata meetups in Stockwell to fado nights in Camden - discover how nossa gente builds lasting bonds while preserving Portuguese heart in the city's rhythm.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
                The Impact We're Making Together
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {impactStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stories */}
        <section className="py-20 bg-gray-50">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Featured Success Stories
              </h2>
              <p className="text-center text-gray-600 mb-16">
                In-depth stories from women whose lives have been transformed by the LusoTown community
              </p>

              <div className="space-y-16 lg:space-y-20">
                {featuredStories.map((story, index) => (
                  <div key={story.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="relative">
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                              {story.name.split(' ')[0].charAt(0)}{story.name.includes('&') ? story.name.split('& ')[1].charAt(0) : ''}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                            <p className="text-gray-600">{story.location}</p>
                            <p className="text-sm text-gray-500 mt-1">Member since {story.memberSince}</p>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {story.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-4">
                          <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                          <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                          <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                          <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                          <StarIcon className="w-5 h-5 text-yellow-400" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {story.title}
                        </h3>
                        
                        <p className="text-lg text-gray-600 mb-6 italic">
                          "{story.excerpt}"
                        </p>
                        
                        <div className="prose text-gray-600 space-y-4 mb-6">
                          {story.story.split('\n\n').slice(0, 2).map((paragraph, pIndex) => (
                            <p key={pIndex} className="leading-relaxed">
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>
                        
                        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
                          <div className="flex items-start">
                            <ChatBubbleOvalLeftIcon className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                            <blockquote className="text-gray-700 italic">
                              "{story.testimonial}"
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Success Stories */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  More Success Stories
                </h2>
                <p className="text-xl text-gray-600">
                  Brief snapshots of connections and achievements from our community
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {quickStories.map((story, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:scale-105 transition-transform">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{story.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {story.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      "{story.story}"
                    </p>
                    
                    <div className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      <SparklesIcon className="w-4 h-4 mr-1" />
                      {story.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Highlights */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                What Makes Our Community Special
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <UserGroupIcon className="w-8 h-8 text-primary-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Connections</h3>
                  <p className="text-gray-600">
                    Our verification process ensures you're connecting with genuine women who share your values. 
                    No fake profiles, no ulterior motives - just real women looking for real friendships.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <HeartIcon className="w-8 h-8 text-secondary-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Judgment-Free Environment</h3>
                  <p className="text-gray-600">
                    Whether you're single by choice, childfree, career-focused, or simply creating your own path, 
                    our community celebrates your choices without question.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <SparklesIcon className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Diverse Interests</h3>
                  <p className="text-gray-600">
                    From hiking groups to book clubs, professional networking to creative workshops - 
                    find women who share your passions and discover new interests together.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <TrophyIcon className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Supportive Network</h3>
                  <p className="text-gray-600">
                    Beyond friendships, our members support each other through career changes, personal growth, 
                    business ventures, and life's unexpected challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Community CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-balance">
                Ready to Write Your Own Success Story?
              </h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90 text-balance">
                Join thousands of incredible women who've found their tribe through LusoTown. 
                Your next best friend, business partner, or support network is waiting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="/signup"
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Join LusoTown
                </a>
                <a
                  href="/how-it-works"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Learn More
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm opacity-75">
                <div className="flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  All Ages Welcome
                </div>
                <div className="flex items-center justify-center">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Single & Childfree Welcome
                </div>
                <div className="flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  UK-Wide Community
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Inspired by More Success Stories
              </h3>
              <p className="text-gray-600 mb-8">
                Subscribe to receive monthly success stories, community highlights, and tips for building 
                meaningful friendships as an independent woman.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe anytime. No spam, just inspiring stories.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}