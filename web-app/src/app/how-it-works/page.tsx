'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  UserIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  PhotoIcon,
  CameraIcon,
  TagIcon,
  SparklesIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  HeartIcon,
  CheckCircleIcon,
  StarIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  MegaphoneIcon,
  GiftIcon,
  TrophyIcon,
  CheckIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 }
  }
}

// Onboarding steps data
const onboardingSteps = [
  {
    step: 1,
    icon: UserIcon,
    title: "Welcome & First Name",
    description: "Start your journey with a warm welcome. Share your first name and get ready to join an amazing community of women.",
    highlight: "Personal & friendly introduction"
  },
  {
    step: 2,
    icon: CalendarDaysIcon,
    title: "Age Verification",
    description: "Confirm you're 30+ to ensure our community maintains its focus on accomplished, mature women seeking meaningful connections.",
    highlight: "30+ verification for quality community"
  },
  {
    step: 3,
    icon: EnvelopeIcon,
    title: "Email & Account Setup",
    description: "Secure your account with email validation. This keeps your profile safe and ensures you never miss community updates.",
    highlight: "Secure account protection"
  },
  {
    step: 4,
    icon: PhotoIcon,
    title: "Profile Photo Upload",
    description: "Choose a lovely photo from your gallery or take a new one. Your photo helps members recognize you and builds trust.",
    highlight: "Camera or gallery selection"
  },
  {
    step: 5,
    icon: CameraIcon,
    title: "Live Selfie Verification",
    description: "Our AI-powered verification ensures you're a real person, creating the safest possible environment for all members.",
    highlight: "AI-powered safety verification"
  },
  {
    step: 6,
    icon: TagIcon,
    title: "Interest Selection",
    description: "Choose from 48 carefully curated interests across 6 categories. This helps us connect you with perfectly compatible women.",
    highlight: "48 interests, 6 categories for perfect matching"
  },
  {
    step: 7,
    icon: SparklesIcon,
    title: "Welcome to Your Tribe",
    description: "Celebrate joining the community! Review our guidelines and get ready to meet amazing women who share your passions.",
    highlight: "Community guidelines & celebration"
  }
]

// Platform features
const platformFeatures = [
  {
    icon: UserGroupIcon,
    title: "Smart Interest Matching",
    description: "Our algorithm analyzes your 48+ interest selections to connect you with genuinely compatible women who share your passions and lifestyle.",
    demo: "Sarah matched with 12 book lovers in Central London"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Group Chat Communities",
    description: "Join topic-based group discussions without the pressure of 1-on-1 dating. Build friendships naturally through shared interests.",
    demo: "Join 'London Hiking Club' with 47 active members"
  },
  {
    icon: CalendarIcon,
    title: "Event Discovery",
    description: "Discover local meetups, workshops, and exclusive member events. From wine tastings to career networking, there's something for everyone.",
    demo: "15 events this week in London & surrounding areas"
  },
  {
    icon: MapPinIcon,
    title: "Local Member Directory",
    description: "Browse verified profiles of women in your area. Filter by interests, age, and location to find your perfect tribe members.",
    demo: "243 verified members within 5 miles of you"
  },
  {
    icon: LockClosedIcon,
    title: "Private Forums",
    description: "Participate in moderated discussions about career, relationships, travel, and life transitions in safe, supportive spaces.",
    demo: "Join 'Career Growth 30+' forum with 156 members"
  },
  {
    icon: ShieldCheckIcon,
    title: "Safety Dashboard",
    description: "Advanced reporting tools, privacy controls, and verification status tracking keep you safe and in control of your experience.",
    demo: "99.8% satisfaction rate with safety features"
  }
]

// Membership tiers
const membershipTiers = [
  {
    name: "Free Explorer",
    icon: HeartIcon,
    price: "£0",
    period: "forever",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    features: [
      "Create verified profile",
      "Browse 20 member profiles",
      "Join 2 group discussions",
      "View upcoming events",
      "Basic safety features"
    ],
    experience: "Perfect for testing the waters and meeting a few like-minded women"
  },
  {
    name: "Core Member",
    icon: TrophyIcon,
    price: "£12",
    period: "per month",
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    popular: true,
    features: [
      "Everything in Free",
      "Unlimited member browsing",
      "Join all group discussions",
      "RSVP to all events",
      "Advanced matching algorithm",
      "Priority customer support",
      "Private messaging",
      "Create & host events"
    ],
    experience: "Full platform access for building a thriving social circle"
  },
  {
    name: "VIP Premium",
    icon: StarIcon,
    price: "£25",
    period: "per month",
    color: "text-secondary-600",
    bgColor: "bg-secondary-50",
    features: [
      "Everything in Core",
      "Exclusive VIP events",
      "Personal community concierge",
      "Priority event RSVPs",
      "Advanced privacy controls",
      "Member spotlight features",
      "Early access to new features",
      "Quarterly member gifts"
    ],
    experience: "Premium experience with exclusive access and personal support"
  }
]

// Success stories
const successStories = [
  {
    name: "Sarah M.",
    age: 34,
    location: "Central London",
    image: "/profiles/sarah-success.jpg",
    story: "New in Town",
    title: "From Lonely to London Social Butterfly",
    quote: "I moved to London for work and knew absolutely no one. Within 3 months on AdyaTribe, I had a solid group of 8 girlfriends who've become my chosen family.",
    outcome: "Found her London tribe through shared love of theatre and weekend markets"
  },
  {
    name: "Emma R.",
    age: 38,
    location: "Canary Wharf",
    image: "/profiles/emma-success.jpg",
    story: "Career Networking",
    title: "Professional Growth Through Friendship",
    quote: "The women I met through AdyaTribe have not only become close friends but have opened incredible career opportunities. My current promotion came through a connection here!",
    outcome: "Secured senior management role through AdyaTribe professional network"
  },
  {
    name: "Lisa C.",
    age: 42,
    location: "Richmond",
    image: "/profiles/lisa-success.jpg",
    story: "Activity Partners",
    title: "Adventure Companions at Every Turn",
    quote: "I found my hiking crew, travel buddies, and weekend adventure partners all through AdyaTribe. Last month we did a group trip to Scotland - it was magical!",
    outcome: "Active in 5 different interest groups with regular meetup attendance"
  }
]

// Safety features
const safetyFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Multi-Layer Verification",
    description: "Photo verification, live selfie confirmation, and AI authenticity checks ensure every member is genuine.",
    stats: "99.2% authentic profile rate"
  },
  {
    icon: ExclamationTriangleIcon,
    title: "Advanced Reporting System",
    description: "Easy-to-use reporting tools with rapid response team for any safety concerns or inappropriate behavior.",
    stats: "< 2 hour average response time"
  },
  {
    icon: LockClosedIcon,
    title: "GDPR-Compliant Privacy",
    description: "Your data is protected with enterprise-level security and full compliance with UK privacy regulations.",
    stats: "Bank-level encryption standards"
  },
  {
    icon: MegaphoneIcon,
    title: "Community Moderation",
    description: "Professional moderation team plus community guidelines ensure respectful, supportive interactions.",
    stats: "96.8% positive interaction rating"
  }
]

export default function HowItWorks() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-40 h-40 bg-primary-100 rounded-full opacity-20"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary-100 rounded-full opacity-20"></div>
          </div>
          
          <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2 text-primary-700 font-medium mb-6">
                <SparklesIcon className="h-4 w-4" />
                Complete Platform Guide
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                How AdyaTribe <span className="gradient-text">Works</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                From secure onboarding to thriving community membership, discover how hundreds of UK women 30+ are building meaningful friendships through our thoughtfully designed platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline text-lg px-8 py-4"
                >
                  Watch Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Secure Onboarding Journey */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 text-green-700 font-medium mb-6">
                <ShieldCheckIcon className="h-4 w-4" />
                Secure 7-Step Onboarding
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Safe Journey to <span className="gradient-text">Community</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Our carefully designed onboarding process ensures safety, authenticity, and perfect matching from day one. Every step is crafted to create the best possible experience.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={slideVariants}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:w-1/2">
                    <div className="card p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary-400 rounded-xl flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{step.step}</span>
                        </div>
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary-600" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                      <div className="inline-flex items-center gap-2 bg-secondary-50 rounded-full px-3 py-1 text-secondary-700 text-sm font-medium">
                        <CheckCircleIcon className="h-4 w-4" />
                        {step.highlight}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    {/* Step-specific mockups */}
                    {step.step === 1 && (
                      <div className="bg-white rounded-2xl shadow-lg p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <div className="text-2xl font-bold text-gray-900 mb-4">Welcome to AdyaTribe!</div>
                          <div className="bg-gray-100 rounded-lg p-3 mb-4">
                            <input type="text" placeholder="Enter your first name" className="w-full border-0 bg-transparent text-center" disabled />
                          </div>
                          <p className="text-sm text-gray-500">Friendly, personal introduction</p>
                        </div>
                      </div>
                    )}
                    {step.step === 2 && (
                      <div className="bg-white rounded-2xl shadow-lg p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <div className="text-lg font-bold text-gray-900 mb-4">Verify Your Age</div>
                          <div className="bg-primary-50 rounded-lg p-4 mb-4">
                            <CalendarDaysIcon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Date of Birth</div>
                            <div className="text-primary-600 font-medium">30+ Verification</div>
                          </div>
                          <div className="flex items-center justify-center text-green-600 text-sm">
                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                            Age Confirmed
                          </div>
                        </div>
                      </div>
                    )}
                    {step.step === 3 && (
                      <div className="bg-white rounded-2xl shadow-lg p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <div className="text-lg font-bold text-gray-900 mb-4">Secure Your Account</div>
                          <div className="bg-gray-100 rounded-lg p-3 mb-4">
                            <input type="email" placeholder="your-email@example.com" className="w-full border-0 bg-transparent text-center text-sm" disabled />
                          </div>
                          <div className="flex items-center justify-center text-green-600 text-sm">
                            <LockClosedIcon className="w-4 h-4 mr-1" />
                            Email Secured
                          </div>
                        </div>
                      </div>
                    )}
                    {step.step === 4 && (
                      <div className="bg-white rounded-2xl shadow-lg p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <div className="text-lg font-bold text-gray-900 mb-4">Profile Photo</div>
                          <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <PhotoIcon className="w-8 h-8 text-primary-600" />
                          </div>
                          <div className="flex gap-2 justify-center">
                            <button className="bg-primary-100 text-primary-600 px-3 py-1 rounded text-sm">Camera</button>
                            <button className="bg-secondary-100 text-secondary-600 px-3 py-1 rounded text-sm">Gallery</button>
                          </div>
                        </div>
                      </div>
                    )}
                    {step.step === 5 && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <div className="text-lg font-bold text-gray-900 mb-4">Live Selfie Verification</div>
                          <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <CameraIcon className="w-8 h-8 text-green-600" />
                          </div>
                          <div className="text-sm text-green-600 mb-2">AI Verification Active</div>
                          <div className="flex items-center justify-center text-green-600 text-sm">
                            <ShieldCheckIcon className="w-4 h-4 mr-1" />
                            Identity Confirmed
                          </div>
                        </div>
                      </div>
                    )}
                    {step.step === 6 && (
                      <div className="bg-white rounded-2xl shadow-lg p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <div className="text-lg font-bold text-gray-900 mb-4">Choose Interests</div>
                          <div className="flex flex-wrap gap-2 justify-center mb-4">
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">Books</span>
                            <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">Yoga</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Wine</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Travel</span>
                            <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">Art</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Fitness</span>
                          </div>
                          <p className="text-xs text-gray-500">6 categories, 48 total interests</p>
                        </div>
                      </div>
                    )}
                    {step.step === 7 && (
                      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 h-64 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                        <div className="text-center w-full max-w-xs">
                          <SparklesIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                          <div className="text-xl font-bold text-gray-900 mb-2">Welcome to Your Tribe!</div>
                          <p className="text-sm text-gray-600 mb-4">You're now part of a community of 10,000+ amazing women</p>
                          <div className="bg-white rounded-lg px-4 py-2">
                            <div className="text-primary-600 font-medium text-sm">Community Guidelines</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Platform Features Showcase */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-secondary-50 rounded-full px-4 py-2 text-secondary-700 font-medium mb-6">
                <UserGroupIcon className="h-4 w-4" />
                Core Platform Features
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need for <span className="gradient-text">Real Connections</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Discover the powerful features that make AdyaTribe the premier platform for 30+ women seeking authentic friendships and community.
              </p>
            </motion.div>

            {/* Interactive Feature Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
              {/* Smart Matching Demo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Smart Interest Matching</h3>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="text-lg font-semibold text-gray-900 mb-4">Your Matches</div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">S</div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">Sarah, 34</div>
                        <div className="text-xs text-gray-500">Books, Wine, Yoga • 98% match</div>
                      </div>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">E</div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">Emma, 38</div>
                        <div className="text-xs text-gray-500">Travel, Art, Books • 94% match</div>
                      </div>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">L</div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">Lisa, 42</div>
                        <div className="text-xs text-gray-500">Hiking, Books, Photography • 91% match</div>
                      </div>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <HeartIcon className="w-3 h-3 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">AI-powered matching based on 48+ interests across 6 categories</p>
              </motion.div>

              {/* Local Directory Demo */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Local Member Directory</h3>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-gray-900">Near You</div>
                    <div className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">5 miles</div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary-600 mb-1">243</div>
                    <div className="text-sm text-gray-600">Verified members nearby</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-primary-200 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs text-gray-600">Central</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-secondary-200 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs text-gray-600">Canary Wharf</div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-purple-200 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs text-gray-600">Richmond</div>
                    </div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-2">
                    <div className="text-xs text-primary-700">15 new members this week</div>
                  </div>
                </div>
                <p className="text-gray-600">Browse verified profiles of women in your local area</p>
              </motion.div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="card p-8 group hover:scale-105 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors duration-300">
                    <feature.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="bg-secondary-50 rounded-lg p-3 border-l-4 border-secondary-400">
                    <p className="text-secondary-700 font-medium text-sm">{feature.demo}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Membership Experience Journey */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-50 rounded-full px-4 py-2 text-yellow-700 font-medium mb-6">
                <StarIcon className="h-4 w-4" />
                Membership Tiers
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Choose Your <span className="gradient-text">Community Experience</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                From exploring the community to full VIP access, find the perfect membership level for your friendship goals and lifestyle.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {membershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  variants={itemVariants}
                  className={`relative card p-8 ${tier.popular ? 'ring-2 ring-primary-400 scale-105' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 ${tier.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                    <tier.icon className={`h-7 w-7 ${tier.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 ml-2">/{tier.period}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{tier.experience}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                      tier.popular 
                        ? 'bg-primary-400 hover:bg-primary-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Choose {tier.name}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-primary-700 font-medium mb-6">
                <StarIcon className="h-4 w-4" />
                Member Success Stories
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Real Stories from <span className="gradient-text">Real Women</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                See how AdyaTribe has transformed the lives of women across London and the UK, creating lasting friendships and meaningful connections.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {successStories.map((story, index) => (
                <motion.div
                  key={story.name}
                  variants={itemVariants}
                  className="card p-8 text-center transform hover:scale-105 transition-all duration-300"
                >
                  {/* Enhanced profile mockup */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                    {story.name.split(' ')[0].charAt(0)}{story.name.split(' ')[1]?.charAt(0)}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-gray-500">{story.age} • {story.location}</p>
                  </div>
                  
                  <div className="bg-primary-50 rounded-lg p-3 mb-6">
                    <p className="text-primary-700 font-medium text-sm">{story.story}</p>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{story.title}</h4>
                  
                  <blockquote className="text-gray-600 italic mb-4 leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                  
                  {/* Success metrics */}
                  <div className="bg-green-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">{index === 0 ? '8' : index === 1 ? '12' : '5'}</div>
                        <div className="text-xs text-green-700">{index === 0 ? 'Close Friends' : index === 1 ? 'Connections' : 'Groups'}</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{index === 0 ? '3mo' : index === 1 ? '6mo' : '4mo'}</div>
                        <div className="text-xs text-green-700">Time Frame</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">{story.outcome}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Safety & Trust */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 text-green-700 font-medium mb-6">
                <ShieldCheckIcon className="h-4 w-4" />
                Safety First
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Safety is Our <span className="gradient-text">Top Priority</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Advanced verification, GDPR compliance, and professional moderation create the safest possible environment for meaningful connections.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            >
              {safetyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="card p-8"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400">
                    <p className="text-green-700 font-medium text-sm">{feature.stats}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Community Guidelines Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center border border-primary-100 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="max-w-2xl mx-auto">
                <HeartIcon className="h-12 w-12 text-primary-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Built by Women, for Women</h3>
                <p className="text-lg text-gray-600 mb-6">
                  AdyaTribe was created by women who understand the unique challenges of making meaningful adult friendships. 
                  Every feature prioritizes empathy, safety, and authentic connections.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold text-primary-600">10,000+</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold text-primary-600">99.2%</div>
                    <div className="text-sm text-gray-600">Verified Profiles</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold text-primary-600">96.8%</div>
                    <div className="text-sm text-gray-600">Satisfaction Rate</div>
                  </div>
                  <div className="transform hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl font-bold text-primary-600">24/7</div>
                    <div className="text-sm text-gray-600">Safety Monitoring</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Interactive App Journey Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 max-w-6xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Experience the Complete Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* App Screenshots Mockup */}
                <div className="text-center">
                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4 mb-4">
                      <UserGroupIcon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Dashboard</div>
                    </div>
                    <div className="text-xs text-gray-500">Your personalized community hub</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-lg p-4 mb-4">
                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Chat Groups</div>
                    </div>
                    <div className="text-xs text-gray-500">Join topic-based discussions</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 mb-4">
                      <CalendarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Events</div>
                    </div>
                    <div className="text-xs text-gray-500">Discover local meetups</div>
                  </div>
                </div>
              </div>
              
              {/* Feature Interaction Flow */}
              <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">From Connection to Friendship</h4>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary-600 font-bold">1</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">Discover</div>
                    <div className="text-xs text-gray-500">Find compatible members</div>
                  </div>
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-primary-200 to-secondary-200"></div>
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-secondary-600 font-bold">2</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">Connect</div>
                    <div className="text-xs text-gray-500">Join group conversations</div>
                  </div>
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-secondary-200 to-green-200"></div>
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">Meet</div>
                    <div className="text-xs text-gray-500">Attend local events</div>
                  </div>
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-green-200 to-purple-200"></div>
                  <div className="flex-1 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <HeartIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">Thrive</div>
                    <div className="text-xs text-gray-500">Build lasting friendships</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-400 to-secondary-400 text-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your Tribe?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed mb-12">
                Join hundreds of amazing women who've already found meaningful friendships through AdyaTribe. 
                Your community is waiting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 hover:text-primary-700 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200"
                >
                  Start Free Today
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200"
                >
                  Schedule Demo
                </motion.button>
              </div>
              
              <p className="text-sm opacity-75 mt-6">
                No commitment required • Cancel anytime • GDPR compliant
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}