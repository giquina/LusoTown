import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  SparklesIcon,
  CheckCircleIcon,
  MapPinIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export default function About() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Founded by women, for women in 2024
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                The Story Behind <span className="gradient-text">AdyaTribe</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Where incredible 30+ single & childfree women across the UK find their chosen family 
                and build the meaningful friendships they've been searching for.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="w-80 h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 lg:mb-0">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 mx-auto">
                        AE
                      </div>
                      <p className="text-gray-600 font-medium">Adyam Embaie</p>
                      <p className="text-sm text-gray-500">Founder & CEO</p>
                      <p className="text-xs text-gray-400 mt-2">London • Age 34</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    "I Was Tired of Being the Only Single, Childfree Woman in Every Room"
                  </h2>
                  <div className="prose text-gray-600 space-y-4">
                    <p>
                      <strong>Three years ago, I sat alone in my Canary Wharf apartment</strong> after another 
                      evening where I'd been the only single woman at a dinner party, fielding the usual 
                      questions: "When are you settling down?" "Don't you want kids?" "You're so career-focused!"
                    </p>
                    <p>
                      <strong>I'd built an incredible career as a financial analyst,</strong> traveled to 30+ countries, 
                      owned my own place, and made choices I was proud of. Yet finding genuine friendships 
                      with women who understood and celebrated this lifestyle felt impossible.
                    </p>
                    <p>
                      <strong>Moving to London for work at 31 meant starting over socially.</strong> Dating apps 
                      weren't the answer—I wanted real friendships, not romantic connections. Meetup groups 
                      felt superficial. Work colleagues were lovely but lived completely different lives.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 mb-16">
                <blockquote className="text-xl text-gray-700 font-medium italic text-center mb-6">
                  "That night, I realized there were hundreds of incredible women like me across London 
                  and the UK—accomplished, independent, happy with our choices—but struggling to find 
                  our people. So I decided to create the community I wished existed."
                </blockquote>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
                    AE
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Adyam Embaie, Founder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The "Aha" Moment Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                The "Aha" Moment That Changed Everything
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleLeftRightIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Conversation</h3>
                  <p className="text-gray-600">
                    At a work event, I overheard three women in their 30s talking about feeling isolated despite loving their independent lives. We ended up chatting for hours.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Connection</h3>
                  <p className="text-gray-600">
                    We exchanged numbers and started meeting regularly. Within weeks, we'd created our own little tribe of like-minded women who truly understood each other.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SparklesIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Vision</h3>
                  <p className="text-gray-600">
                    That's when it hit me: What if I could create a platform to help hundreds of women find their tribe, just like we had? AdyaTribe was born.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Impact */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Mission: Celebrate Your Choices, Find Your People
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We believe every woman who's chosen independence, career focus, or a childfree life deserves 
                  a community that celebrates these choices—not questions them.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why 30+? Why Single & Childfree?</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Life experience matters.</strong> You've figured out who you are and what you value.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Your choices are valid.</strong> Society might question them, but your tribe won't.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Similar life stages create deeper bonds.</strong> You understand each other's freedoms and challenges.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Quality over quantity.</strong> You want meaningful connections, not superficial networking.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">What Makes Us Different</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <ShieldCheckIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Safety-first approach.</strong> Selfie verification and age confirmation ensure authentic connections.</p>
                    </div>
                    <div className="flex items-start">
                      <UserGroupIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Community, not dating.</strong> We focus on friendships and professional networking.</p>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Real-world connections.</strong> Online matching leads to offline friendships through curated events.</p>
                    </div>
                    <div className="flex items-start">
                      <HeartIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Judgment-free space.</strong> Your lifestyle choices are celebrated, never questioned.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Impact We're Making Together
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Since launching in early 2024, AdyaTribe has helped hundreds of women find their people.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-2">300+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                  <div className="text-xs text-gray-500 mt-1">Growing UK Community</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">120+</div>
                  <div className="text-sm text-gray-600">Events Hosted</div>
                  <div className="text-xs text-gray-500 mt-1">Since Launch</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                  <div className="text-sm text-gray-600">Safety Rating</div>
                  <div className="text-xs text-gray-500 mt-1">Member feedback</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">47</div>
                  <div className="text-sm text-gray-600">Avg. Connections</div>
                  <div className="text-xs text-gray-500 mt-1">Per active member</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "AdyaTribe didn't just help me find friends—it helped me find women who celebrate my success, 
                  understand my choices, and inspire me to be even more authentically myself. This is what 
                  sisterhood should feel like."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    SH
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Sarah H.</p>
                    <p className="text-sm text-gray-600">Marketing Director, London • Member since March 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                The Values That Guide Everything We Do
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">🌟 Authenticity Over Perfection</h3>
                  <p className="text-gray-600">
                    We encourage real stories, honest struggles, and genuine connections. Your imperfect moments 
                    make you relatable, not your highlight reel.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-secondary-600 mb-4">💎 Quality Over Quantity</h3>
                  <p className="text-gray-600">
                    We'd rather you make 3 deep friendships than 30 shallow connections. Our algorithms and 
                    events are designed for meaningful matches, not massive numbers.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-purple-600 mb-4">🛡️ Safety as Standard</h3>
                  <p className="text-gray-600">
                    Every member is verified, every event is moderated, and every interaction is protected. 
                    Your safety isn't negotiable—it's the foundation of everything we build.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-green-600 mb-4">🎉 Celebrating Your Choices</h3>
                  <p className="text-gray-600">
                    Single by choice? Childfree and proud? Career-focused? We celebrate every path that 
                    leads to your happiness and authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Our Vision for the Future
              </h2>
              <p className="text-xl mb-8 opacity-90">
                By 2027, we envision AdyaTribe as the UK's premier community for accomplished women 30+, 
                with thriving chapters in every major city and a support network that spans generations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <TrophyIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">10,000+ Members</h3>
                  <p className="text-sm opacity-80">Across major UK cities</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">2,000+ Events</h3>
                  <p className="text-sm opacity-80">Annual community experiences</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <HeartIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Generational Impact</h3>
                  <p className="text-sm opacity-80">Mentorship & wisdom sharing</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-lg font-medium mb-4">
                  "Together, we're rewriting the narrative around what it means to be a single, 
                  childfree woman in today's world."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    AE
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Adyam Embaie</p>
                    <p className="text-sm opacity-80">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}