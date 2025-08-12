'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { 
  CheckIcon, 
  XMarkIcon, 
  HeartIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LockClosedIcon,
  ArrowRightIcon,
  UsersIcon,
  EyeSlashIcon,
  BoltIcon,
  GiftIcon,
  TrophyIcon,
  CameraIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { 
  CheckIcon as CheckIconSolid,
  StarIcon as StarIconSolid,
  ShieldCheckIcon as ShieldCheckIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid'
import { Crown } from 'lucide-react'

interface PricingTier {
  name: string
  price: number
  originalPrice?: number
  description: string
  icon: React.ReactNode
  solidIcon: React.ReactNode
  features: string[]
  limitations: string[]
  highlighted: boolean
  buttonText: string
  buttonStyle: string
  badge?: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for exploring our community and getting started safely',
    icon: <UserIcon className="w-6 h-6" />,
    solidIcon: <UserIcon className="w-6 h-6" />,
    features: [
      'Basic profile creation',
      'Browse 5 profiles per day',
      'Join public chat rooms',
      'Attend 1 free event per month',
      'Basic interest matching',
      'Community guidelines access',
      'Safety verification process'
    ],
    limitations: [
      'Limited profile browsing',
      'No private group access',
      'No direct messaging',
      'No premium events',
      'Standard support only'
    ],
    highlighted: false,
    buttonText: 'Start Free Today',
    buttonStyle: 'btn-secondary'
  },
  {
    name: 'Core',
    price: 12,
    originalPrice: 15,
    description: 'Full platform access for meaningful connections & experiences',
    icon: <StarIcon className="w-6 h-6" />,
    solidIcon: <StarIconSolid className="w-6 h-6" />,
    features: [
      'Unlimited profile browsing',
      'Advanced matching algorithms',
      'All chat rooms & private groups',
      'Unlimited event attendance',
      'Priority event booking',
      'Enhanced profile features',
      'Direct messaging capabilities',
      'Interest-based group creation',
      'Monthly virtual meetups',
      'Expert-led workshops',
      'Event calendar sync',
      'Enhanced safety verification'
    ],
    limitations: [
      'No VIP event access',
      'Standard customer support'
    ],
    highlighted: true,
    buttonText: 'Choose Core',
    buttonStyle: 'btn-primary',
    badge: 'Most Popular'
  },
  {
    name: 'Premium',
    price: 25,
    originalPrice: 35,
    description: 'VIP experience with exclusive access & personal concierge service',
    icon: <Crown className="w-6 h-6" />,
    solidIcon: <Crown className="w-6 h-6" />,
    features: [
      'Everything in Core, plus:',
      'VIP events & exclusive experiences',
      'Personal community concierge',
      'Advanced privacy controls',
      'Profile verification badge',
      'First access to new features',
      '1-on-1 community guidance sessions',
      'Private member directory',
      'VIP event seating & perks',
      'Exclusive venue partnerships',
      'Monthly exclusive experiences',
      'Priority 24/7 support',
      'Personal introduction service'
    ],
    limitations: [],
    highlighted: false,
    buttonText: 'Go Premium',
    buttonStyle: 'btn-primary bg-gradient-to-r from-purple-500 to-pink-500 border-transparent hover:from-purple-600 hover:to-pink-600'
  }
]

const features = [
  {
    icon: <ShieldCheckIcon className="w-5 h-5" />,
    title: 'Safety First Verification',
    description: 'Selfie verification, age confirmation (30+), and profile authentication ensure authentic connections'
  },
  {
    icon: <HeartIcon className="w-5 h-5" />,
    title: 'Meaningful Connections',
    description: 'Interest-based matching algorithm connects you with women who share your passions and values'
  },
  {
    icon: <CalendarIcon className="w-5 h-5" />,
    title: 'Exclusive Events',
    description: 'Wine tastings, cultural experiences, wellness workshops, and networking events curated for our community'
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
    title: 'Private Group Spaces',
    description: 'Topic-based chat groups and forums for deeper discussions with like-minded members'
  },
  {
    icon: <LockClosedIcon className="w-5 h-5" />,
    title: 'Women-Only Community',
    description: 'Exclusive space for single, childfree women 30+ to connect without judgment'
  },
  {
    icon: <TrophyIcon className="w-5 h-5" />,
    title: 'Professional Network',
    description: 'Connect with accomplished women, share career insights, and build professional relationships'
  }
]

const testimonials = [
  {
    name: 'Sarah M.',
    age: 34,
    location: 'London',
    membership: 'Core Member',
    quote: 'AdyaTribe has given me the confidence to embrace my choices. I\'ve found my tribe of amazing women who truly get it.',
    rating: 5
  },
  {
    name: 'Emma R.',
    age: 42,
    location: 'Manchester',
    membership: 'Premium Member',
    quote: 'The events are incredible - from wine tours to book clubs. I\'ve made genuine friendships that extend beyond the platform.',
    rating: 5
  },
  {
    name: 'Jessica L.',
    age: 38,
    location: 'Edinburgh',
    membership: 'Core Member',
    quote: 'Finally, a community where I don\'t have to explain or justify my lifestyle. These women understand and celebrate it.',
    rating: 5
  }
]

const stats = [
  { number: '300+', label: 'Active Members', icon: <UsersIcon className="w-6 h-6" /> },
  { number: '30+', label: 'Monthly Events', icon: <CalendarIcon className="w-6 h-6" /> },
  { number: '98%', label: 'Safety Rating', icon: <ShieldCheckIconSolid className="w-6 h-6" /> },
  { number: '4.9/5', label: 'Member Satisfaction', icon: <StarIconSolid className="w-6 h-6" /> }
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getDiscountedPrice = (price: number) => {
    return isAnnual ? Math.round(price * 10) : price // 10 months for price of 12
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <ShieldCheckIconSolid className="w-4 h-4 mr-2" />
                Trusted by 300+ verified women across the UK
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Tribe Awaits:
                <span className="gradient-text"> Choose Your Journey</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Connect with accomplished, verified women 30+ who celebrate the single, childfree lifestyle. 
                From meaningful friendships to professional networks, find your perfect community experience.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-600">
                <div className="flex items-center">
                  <CameraIcon className="w-4 h-4 mr-2 text-primary-500" />
                  Selfie Verified
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 mr-2 text-primary-500" />
                  30+ Age Verified
                </div>
                <div className="flex items-center">
                  <LockClosedIcon className="w-4 h-4 mr-2 text-primary-500" />
                  GDPR Compliant
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary-500" />
                  30-Day Guarantee
                </div>
              </div>
              
              {/* Annual/Monthly Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-primary-600 transition-transform ${
                      isAnnual ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  Annual
                  <span className="ml-1 text-green-600 font-semibold">(Save 20%)</span>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingTiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-8 ${
                    tier.highlighted
                      ? 'bg-white border-2 border-primary-400 shadow-xl scale-105'
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      tier.name === 'Free' ? 'bg-gray-100 text-gray-600' :
                      tier.name === 'Core' ? 'bg-primary-100 text-primary-600' :
                      'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600'
                    }`}>
                      {tier.highlighted ? tier.solidIcon : tier.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-6">{tier.description}</p>
                    
                    <div className="mb-6">
                      {tier.price === 0 ? (
                        <div className="text-4xl font-bold text-gray-900">Free</div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          {isAnnual && tier.originalPrice && (
                            <div className="text-lg text-gray-500 line-through">
                              £{tier.originalPrice * 12}
                            </div>
                          )}
                          <div className="text-4xl font-bold text-gray-900">
                            £{getDiscountedPrice(tier.price)}
                          </div>
                          <div className="text-gray-600">
                            /{isAnnual ? 'year' : 'month'}
                          </div>
                        </div>
                      )}
                      {isAnnual && tier.price > 0 && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Save £{tier.price * 2} per year
                        </div>
                      )}
                    </div>

                    <button className={`w-full ${tier.buttonStyle} group`}>
                      {tier.buttonText}
                      <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckIconSolid className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {tier.limitations.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        {tier.limitations.map((limitation, limitationIndex) => (
                          <div key={limitationIndex} className="flex items-start space-x-3 mb-2">
                            <XMarkIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-t border-b border-gray-100">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Members Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join hundreds of women who have found their tribe and embraced their authentic selves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.location} • Age {testimonial.age}</div>
                    </div>
                    <div className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                      {testimonial.membership}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare Membership Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See exactly what's included with each membership tier.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-primary-600 bg-primary-50">Core</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'Profile Creation & Browsing', free: '5 per day', core: 'Unlimited', premium: 'Unlimited' },
                    { feature: 'Event Attendance', free: '1 per month', core: 'Unlimited', premium: 'Unlimited + VIP' },
                    { feature: 'Chat Groups Access', free: 'Public only', core: 'All groups', premium: 'All + Private directory' },
                    { feature: 'Direct Messaging', free: false, core: true, premium: true },
                    { feature: 'Priority Event Booking', free: false, core: true, premium: true },
                    { feature: 'Personal Concierge', free: false, core: false, premium: true },
                    { feature: 'VIP Events Access', free: false, core: false, premium: true },
                    { feature: '1-on-1 Guidance', free: false, core: false, premium: true },
                    { feature: 'Customer Support', free: 'Standard', core: 'Priority', premium: '24/7 Priority' }
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <CheckIconSolid className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-gray-600">{row.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-primary-50">
                        {typeof row.core === 'boolean' ? (
                          row.core ? (
                            <CheckIconSolid className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-primary-700 font-medium">{row.core}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <CheckIconSolid className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-purple-700 font-medium">{row.premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Visual Feature Demonstrations Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See AdyaTribe in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our app features with interactive mockups that showcase how members connect, chat, and build lasting friendships.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              {/* Profile Card Mockup */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Verified Member Profiles</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                      SH
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">Sarah, 34</h4>
                    <p className="text-sm text-gray-600 mb-4">Marketing Director • Central London</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">Books</span>
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">Yoga</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Wine</span>
                    </div>
                    <div className="flex items-center justify-center text-green-600 text-sm">
                      <ShieldCheckIcon className="w-4 h-4 mr-1" />
                      Verified Profile
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Authentic profiles with selfie verification and interest-based matching</p>
              </div>

              {/* Chat Room Mockup */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Group Chat Communities</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        📚
                      </div>
                      <div className="ml-3">
                        <h5 className="font-semibold text-gray-900">Book Club Londoners</h5>
                        <p className="text-sm text-gray-600">45 members • Active now</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-primary-400 rounded-full flex-shrink-0"></div>
                        <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                          <p className="text-sm">Just finished 'Fourth Wing'! Any fantasy recs?</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 justify-end">
                        <div className="bg-primary-500 text-white rounded-lg px-3 py-2 max-w-xs">
                          <p className="text-sm">Try 'The Priory of the Orange Tree'!</p>
                        </div>
                        <div className="w-6 h-6 bg-secondary-400 rounded-full flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Safe group discussions without the pressure of 1-on-1 dating</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Event Card Mockup */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Curated Events</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="h-32 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                      <CalendarDaysIcon className="w-12 h-12 text-white" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        Covent Garden, London
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Wine & Paint Evening</h5>
                      <p className="text-sm text-gray-600 mb-3">Creative night with fellow book lovers</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          12 attending
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">£15</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">From wine tastings to career workshops - events for every interest</p>
              </div>

              {/* Safety Verification Demo */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Safety First Approach</h3>
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <ShieldCheckIcon className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Selfie Verification</h5>
                        <p className="text-sm text-gray-600">AI-powered identity confirmation</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        Live photo matches profile
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        Age verification (30+)
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        Real person confirmed
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Multi-layer verification ensures the safest possible community</p>
              </div>
            </div>
          </div>
        </section>

        {/* Member Activity Dashboard Mockup */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Track Your Community Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See your progress, connections, and engagement with a personalized activity dashboard designed for meaningful interactions.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
                <h4 className="font-semibold text-gray-900 mb-6 text-xl text-center">Your AdyaTribe Activity</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-600 mb-1">47</div>
                    <div className="text-sm text-gray-600">Connections Made</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-50 rounded-lg">
                    <div className="text-3xl font-bold text-secondary-600 mb-1">8</div>
                    <div className="text-sm text-gray-600">Events Attended</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">156</div>
                    <div className="text-sm text-gray-600">Messages Sent</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-1">4.9</div>
                    <div className="text-sm text-gray-600">Member Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AdyaTribe?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                More than just a community - we're your support system for creating meaningful connections and experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Money-Back Guarantee Section */}
        <section className="py-16 bg-green-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIconSolid className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                100% Satisfaction Guarantee
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're so confident you'll love AdyaTribe that we offer a full 30-day money-back guarantee. 
                If you're not completely satisfied with your membership experience, we'll refund every penny - no questions asked.
              </p>
              <div className="bg-white rounded-lg p-6 inline-block">
                <p className="text-sm text-gray-600 mb-2">Protected by our guarantee:</p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    Full refund within 30 days
                  </div>
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    No questions asked
                  </div>
                  <div className="flex items-center">
                    <CheckIconSolid className="w-4 h-4 text-green-500 mr-2" />
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions? We Have Answers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about joining AdyaTribe's community.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "How does the verification process work?",
                  answer: "Our multi-step verification ensures authentic connections: (1) Age verification confirms you're 30+, (2) Selfie verification matches your photos to your real identity, (3) Profile review ensures quality and authenticity. This process typically takes 24-48 hours and keeps our community safe and genuine."
                },
                {
                  question: "What makes AdyaTribe different from other platforms?",
                  answer: "AdyaTribe is exclusively for single, childfree women 30+. We focus on meaningful friendships and professional networking rather than dating. Our community celebrates this lifestyle choice with curated events, expert workshops, and authentic connections with women who truly understand your journey."
                },
                {
                  question: "Can I change or cancel my membership?",
                  answer: "Absolutely! You can upgrade, downgrade, or cancel your membership at any time from your account settings. Upgrades take effect immediately with prorated billing. Cancellations remain active until the end of your current billing cycle, after which you'll have access to free tier features."
                },
                {
                  question: "What types of events do you host?",
                  answer: "Our events range from wine tastings and cultural experiences to professional networking and wellness workshops. Core members access all regular events, while Premium members enjoy exclusive VIP events, private venue access, and curated experiences with limited attendance for more intimate connections."
                },
                {
                  question: "Is my personal information safe?",
                  answer: "Yes. We're GDPR compliant with enterprise-grade security. Your data is encrypted, never sold to third parties, and you control your privacy settings. Our verification process ensures authentic members while protecting your anonymity until you choose to connect with someone."
                },
                {
                  question: "What if I don't find my tribe right away?",
                  answer: "Building meaningful connections takes time! We offer a 30-day satisfaction guarantee - if you're not happy with your membership experience, contact us for a full refund. Our community concierge (Premium) or support team (Core) can help you find the right groups and events for your interests."
                },
                {
                  question: "Do you have members in my area?",
                  answer: "We have active communities across the UK, with the highest concentrations in London, Manchester, Edinburgh, Bristol, and Birmingham. Our platform shows local events and members in your area, and we're continuously growing our regional presence based on member demand."
                },
                {
                  question: "How do I know if this community is right for me?",
                  answer: "Start with our free membership to explore the community, attend a public event, and get a feel for our culture. If you're a single, childfree woman 30+ looking for authentic connections with like-minded women, you'll likely find your tribe here. Our 30-day guarantee removes all risk from upgrading."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <a href="/contact" className="btn-outline inline-flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2" />
                Contact Our Support Team
              </a>
            </div>
          </div>
        </section>

        {/* App Preview & Social Proof Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join the Conversation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how AdyaTribe members are building meaningful connections every day through our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Live Activity Feed Mockup */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Community Activity</h3>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">J</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Jessica</span>
                          <span className="text-gray-600"> joined </span>
                          <span className="font-medium text-primary-600">Book Club Londoners</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-secondary-50 rounded-lg">
                      <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Maria</span>
                          <span className="text-gray-600"> created event </span>
                          <span className="font-medium text-secondary-600">Wine Tasting in Canary Wharf</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">15 minutes ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Anna</span>
                          <span className="text-gray-600"> verified her profile with selfie check</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                      </div>
                    </div>
                    <div className="text-center pt-4">
                      <div className="text-sm text-gray-500">12 new activities in the last hour</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-center mb-4">
                    <TrophyIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">This Week's Impact</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">New Connections</span>
                      <span className="font-bold text-primary-600">187</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Events Hosted</span>
                      <span className="font-bold text-secondary-600">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Messages Sent</span>
                      <span className="font-bold text-green-600">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Verified Members</span>
                      <span className="font-bold text-purple-600">28</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <SparklesIcon className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-lg font-bold mb-1">99.7%</div>
                  <div className="text-sm opacity-90">Member Satisfaction</div>
                  <div className="text-xs opacity-75 mt-2">Based on 300+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          
          <div className="container-width px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <BoltIcon className="w-4 h-4 mr-2" />
                Join 300+ verified women today
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Your Tribe is Waiting
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Don't spend another weekend wondering where your people are. 
                Join AdyaTribe and discover the community you've been searching for.
              </p>

              {/* Urgency Elements */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">24-48hrs</div>
                    <div className="text-sm opacity-80">Verification Process</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">30 Days</div>
                    <div className="text-sm opacity-80">Money-Back Guarantee</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold mb-1">30+</div>
                    <div className="text-sm opacity-80">Events This Month</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="/signup" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 group transform hover:scale-105 transition-all duration-200">
                  Start Your Journey Free
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200">
                  Already a Member? Sign In
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <ShieldCheckIconSolid className="w-4 h-4 mr-2" />
                  Verified Community
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <LockClosedIcon className="w-4 h-4 mr-2" />
                  GDPR Protected
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <HeartIconSolid className="w-4 h-4 mr-2" />
                  No Judgment Zone
                </div>
                <div className="flex items-center hover:opacity-100 transition-opacity duration-200">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Cancel Anytime
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}