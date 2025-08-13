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
  title: 'Success Stories - Real Women, Real Connections | AdyaTribe',
  description: 'Discover how AdyaTribe has helped thousands of women 30+ across the UK build lasting friendships, launch businesses, and create meaningful support networks. Read authentic success stories from London, Manchester, Edinburgh and beyond.',
  keywords: [
    'AdyaTribe success stories',
    'women friendship UK',
    'female networking success',
    '30+ women connections',
    'UK women community testimonials',
    'single women support network',
    'childfree women friendships',
    'London women networking',
    'female entrepreneurs UK',
    'women business partnerships'
  ],
  openGraph: {
    title: 'Success Stories - Real Women, Real Connections | AdyaTribe',
    description: 'Discover how AdyaTribe has helped thousands of women 30+ across the UK build lasting friendships, launch businesses, and create meaningful support networks.',
    type: 'website',
    url: 'https://adyatribe.com/success-stories',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdyaTribe Success Stories - Women Building Connections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Success Stories - Real Women, Real Connections | AdyaTribe',
    description: 'Discover how AdyaTribe has helped thousands of women 30+ across the UK build lasting friendships and support networks.',
    images: ['/og-image.jpg'],
  },
}

export default function SuccessStories() {
  const featuredStories: FeaturedStory[] = [
    {
      id: 1,
      name: "Emma & Sarah",
      location: "London",
      memberSince: "March 2024",
      title: "From Strangers to Best Friends",
      excerpt: "We met at a hiking group and now we're inseparable - traveling together, supporting each other through career changes, and building the sisterhood we always wanted.",
      story: `I joined AdyaTribe after moving to London for work at 32. As a single, childfree woman in finance, I felt like an outsider in most social circles. Everyone seemed to be coupled up or focused on family life.

      Sarah and I met at one of the hiking groups in Hampstead Heath. We were both nervous newcomers, but something clicked immediately. We started chatting about our careers, travel dreams, and the challenges of being independent women in London.

      What started as weekend hikes turned into regular coffee dates, then weekend trips to the Cotswolds. When I was made redundant last year, Sarah was my biggest supporter, helping me network and even letting me stay in her spare room while I job-hunted.

      Now, 10 months later, we're planning a month-long trip to Southeast Asia together. AdyaTribe didn't just help me find a friend - it helped me find my person, my chosen family. The community showed me that there are incredible women out there who get it, who celebrate your choices, and who'll be there through thick and thin.`,
      image: "members/emma-sarah.jpg",
      tags: ["Career Support", "Travel Buddies", "Best Friends"],
      joinDate: "2024-03",
      testimonial: "AdyaTribe showed me that chosen family is just as powerful as blood family. Sarah and I are living proof that meaningful friendships can happen at any age."
    },
    {
      id: 2,
      name: "Priya",
      location: "Manchester",
      memberSince: "January 2024",
      title: "Building My Support Network",
      excerpt: "After my divorce at 35, I felt completely lost. AdyaTribe helped me rebuild my confidence and create a support network of amazing women who truly understand my journey.",
      story: `My divorce was finalized on New Year's Eve 2023. At 35, I suddenly found myself starting over completely - new flat, new routine, and most challengingly, a new identity as a single woman again.

      Most of my married friends meant well, but they couldn't relate to my experience. I needed women who understood what it felt like to be redefining yourself in your 30s, who didn't see being single as something to 'fix.'

      Through AdyaTribe, I found not just one friend, but an entire network. The book club introduced me to literature that helped me process my emotions. The professional networking group helped me rebuild my confidence at work. The weekend activities group showed me I could have fun and adventures on my own terms.

      One particular moment stands out: I was having a terrible day after a difficult mediation session. I posted in our Manchester group, and within an hour, three women had reached out. By evening, I had a bouquet of flowers, a bottle of wine, and two friends sitting in my living room just listening.

      I'm now a group organizer myself, hosting monthly brunches for newly single women. I want to pay forward what AdyaTribe gave me - the reminder that you're not alone, that there's a whole community of strong, independent women ready to support each other.`,
      image: "members/priya.jpg",
      tags: ["Divorce Support", "Community Leader", "Personal Growth"],
      joinDate: "2024-01",
      testimonial: "AdyaTribe taught me that starting over isn't just about rebuilding - it's about building something even better than before."
    },
    {
      id: 3,
      name: "Jessica & Lisa",
      location: "Edinburgh",
      memberSince: "February 2024",
      title: "Entrepreneurial Partnership",
      excerpt: "We connected over our shared passion for sustainable fashion and ended up launching a business together. Our friendship became the foundation of our startup success.",
      story: `I'd been struggling with the idea of starting my sustainable fashion consultancy for months, but as a solo entrepreneur, it felt overwhelming. When I joined AdyaTribe's Edinburgh professional network, I was just looking for moral support and maybe some networking opportunities.

      That's where I met Lisa, who had just left her corporate marketing job to pursue ethical business ventures. We grabbed coffee after a networking event and talked for four hours about our shared vision for sustainable commerce.

      What started as mutual support evolved into something bigger. Lisa's marketing expertise complemented my fashion industry knowledge perfectly. We started collaborating on small projects, then bigger ones, and eventually decided to officially partner up.

      Our business, Conscious Closet Consulting, launched six months ago and we're already profitable. But more than that, I gained a business partner I trust completely and a friend who shares my values and ambitions.

      The other AdyaTribe members have been incredible supporters too - they were our first clients, our honest critics, and our biggest cheerleaders. We've built not just a business, but a community around conscious consumption.

      People ask if mixing friendship and business is risky, but when you find someone through AdyaTribe's verification process who shares your values and work ethic, it actually makes the partnership stronger.`,
      image: "members/jessica-lisa.jpg",
      tags: ["Business Partners", "Entrepreneurship", "Sustainability"],
      joinDate: "2024-02",
      testimonial: "AdyaTribe connected me with not just a business partner, but a woman who shares my vision for changing the world through ethical business."
    }
  ]

  const quickStories: QuickStory[] = [
    {
      name: "Charlotte",
      location: "Brighton",
      story: "Found my marathon training partner and we've run three races together since joining!",
      category: "Fitness Buddy"
    },
    {
      name: "Maya",
      location: "Birmingham",
      story: "The professional networking group helped me land my dream job - and gain 5 new mentors.",
      category: "Career Growth"
    },
    {
      name: "Sophie",
      location: "Bristol",
      story: "My book club friends have become my closest confidantes. We meet weekly and support each other through everything.",
      category: "Book Club"
    },
    {
      name: "Rachel",
      location: "London",
      story: "Started a pottery class with women from AdyaTribe - now we have our own studio space and sell our work!",
      category: "Creative Community"
    },
    {
      name: "Anna",
      location: "Glasgow",
      story: "After years of feeling isolated, I now have a group of women who truly understand and celebrate my childfree choice.",
      category: "Lifestyle Support"
    },
    {
      name: "Kate",
      location: "Liverpool",
      story: "We started a monthly dinner club that's become the highlight of my month. Real conversations, real connections.",
      category: "Dinner Club"
    },
    {
      name: "Zara",
      location: "Cardiff",
      story: "After my corporate burnout, the wellness group helped me transition to freelance life with amazing support and referrals.",
      category: "Career Transition"
    },
    {
      name: "Olivia",
      location: "Newcastle",
      story: "The travel group has become my adventure family - we've explored Scotland, Ireland, and planning our Iceland trip!",
      category: "Travel Adventures"
    },
    {
      name: "Amelia",
      location: "Oxford",
      story: "Started a sustainable living workshop with AdyaTribe friends - we're making real environmental impact together.",
      category: "Sustainability"
    }
  ]

  const impactStats: ImpactStat[] = [
    { label: "Lasting Friendships Formed", value: "520+", icon: HeartIcon },
    { label: "Support Networks Created", value: "95+", icon: UserGroupIcon },
    { label: "Business Partnerships", value: "48+", icon: TrophyIcon },
    { label: "Women Supported", value: "1,200+", icon: SparklesIcon }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <HeartIcon className="w-4 h-4 mr-2" />
                Real Stories • Real Friendships
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                Success Stories
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-balance">
                Discover how AdyaTribe has helped thousands of incredible women across the UK build meaningful friendships, 
                launch businesses, and create the support networks they always dreamed of.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
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
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Featured Success Stories
              </h2>
              <p className="text-center text-gray-600 mb-16">
                In-depth stories from women whose lives have been transformed by the AdyaTribe community
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
          <div className="container-width px-4 sm:px-6 lg:px-8">
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
          <div className="container-width px-4 sm:px-6 lg:px-8">
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
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-balance">
                Ready to Write Your Own Success Story?
              </h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90 text-balance">
                Join thousands of incredible women who've found their tribe through AdyaTribe. 
                Your next best friend, business partner, or support network is waiting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="/signup"
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Join AdyaTribe
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
          <div className="container-width px-4 sm:px-6 lg:px-8">
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