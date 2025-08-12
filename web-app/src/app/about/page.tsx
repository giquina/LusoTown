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
  TrophyIcon,
  GlobeAltIcon,
  HomeIcon,
  BookOpenIcon
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
                <GlobeAltIcon className="w-4 h-4 mr-2" />
                Unidos pela Língua • United by Language
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About <span className="gradient-text">LusoTown London</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your digital home away from home. Where Portuguese speakers and families in London 
                connect, celebrate heritage, and keep our beautiful language alive together.
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
                        LT
                      </div>
                      <p className="text-gray-600 font-medium">LusoTown Team</p>
                      <p className="text-sm text-gray-500">Community Builders</p>
                      <p className="text-xs text-gray-400 mt-2">London • Portuguese Heritage</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    "We Know How Much It Means to Keep the Language Alive"
                  </h2>
                  <div className="prose text-gray-600 space-y-4">
                    <p>
                      <strong>As Portuguese speakers living in London,</strong> we understand the deep connection 
                      to our heritage and the importance of preserving our beautiful language. Whether you're 
                      from Portugal, Brazil, Angola, or any Portuguese-speaking nation, London is now home.
                    </p>
                    <p>
                      <strong>We've experienced the challenge of raising bilingual children,</strong> finding 
                      Portuguese-speaking services, or simply wanting to connect with people who understand 
                      our culture, traditions, and the warmth of our communities back home.
                    </p>
                    <p>
                      <strong>London's Portuguese diaspora is rich and diverse,</strong> but we're often 
                      scattered across the city. LusoTown was created to bring us together—to share resources, 
                      support each other, and ensure our children grow up proud of their Portuguese heritage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 mb-16">
                <blockquote className="text-xl text-gray-700 font-medium italic text-center mb-6">
                  "A saudade que sentimos da nossa terra natal nunca desaparece, mas em Londres, 
                  podemos criar um pedacinho de casa juntos. LusoTown é onde nos encontramos, 
                  onde celebramos quem somos."
                </blockquote>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
                    LT
                  </div>
                  <p className="text-sm text-gray-600 font-medium">LusoTown Community Founders</p>
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
                The Heart of Our Portuguese Community
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HomeIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Saudade & Connection</h3>
                  <p className="text-gray-600">
                    That feeling of missing home, our culture, and speaking Portuguese naturally with people who understand. 
                    We created a space where saudade becomes connection.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpenIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Language Preservation</h3>
                  <p className="text-gray-600">
                    Helping families pass Portuguese to the next generation, supporting children who are proud of their heritage, 
                    and keeping our beautiful language alive in London.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserGroupIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
                  <p className="text-gray-600">
                    From finding Portuguese schools to navigating UK systems, we help each other with the practical 
                    and emotional challenges of life in London as Portuguese speakers.
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
                  Nossa Missão: Preservar a Cultura, Conectar Corações
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We believe every Portuguese speaker in London deserves a community that celebrates 
                  our heritage, supports our families, and keeps our beautiful language thriving.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Portuguese Community Matters</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Cultural preservation.</strong> Keeping our traditions, values, and way of life alive in London.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Language heritage.</strong> Ensuring our children speak Portuguese with pride and confidence.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Shared understanding.</strong> Connecting with people who truly understand saudade and our journey.</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Mutual support.</strong> Helping each other navigate life in London while staying connected to home.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">What Makes LusoTown Special</h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start">
                      <GlobeAltIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>All Portuguese-speaking countries.</strong> Portugal, Brazil, Angola, Mozambique, Cape Verde—todos são bem-vindos.</p>
                    </div>
                    <div className="flex items-start">
                      <UserGroupIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Family-focused community.</strong> Supporting parents, children, grandparents, and extended families.</p>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>London-specific resources.</strong> Practical help for Portuguese speakers navigating UK life.</p>
                    </div>
                    <div className="flex items-start">
                      <HeartIcon className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" />
                      <p><strong>Cultural celebration.</strong> Events, traditions, and celebrations that make London feel like home.</p>
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
                Growing London's Portuguese Community
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Since launching, LusoTown has brought together Portuguese speakers from across London,
                creating connections that strengthen our community and preserve our heritage.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Portuguese Families</div>
                  <div className="text-xs text-gray-500 mt-1">Connected in London</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">8</div>
                  <div className="text-sm text-gray-600">Countries Represented</div>
                  <div className="text-xs text-gray-500 mt-1">Portuguese-speaking nations</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Heritage Pride</div>
                  <div className="text-xs text-gray-500 mt-1">Feel more connected</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">32</div>
                  <div className="text-sm text-gray-600">London Boroughs</div>
                  <div className="text-xs text-gray-500 mt-1">With active members</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <blockquote className="text-xl text-gray-700 italic mb-6">
                  "Finalmente encontrei uma comunidade em Londres onde os meus filhos podem crescer 
                  orgulhosos de serem portugueses. LusoTown não é só uma plataforma—é um pedacinho 
                  de casa que trouxemos connosco."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    MC
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Maria C.</p>
                    <p className="text-sm text-gray-600">Mãe de dois, Hackney • Member since early 2024</p>
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
                Os Nossos Valores • Our Core Values
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">🇵🇹 Heritage Preservation</h3>
                  <p className="text-gray-600">
                    Preserving and celebrating Portuguese culture, traditions, and language for current and 
                    future generations. Our heritage is our strength, and sharing it builds stronger communities.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-secondary-600 mb-4">🏠 Community Connection</h3>
                  <p className="text-gray-600">
                    Creating meaningful relationships that transform London from a foreign city into a place 
                    where Portuguese speakers feel at home, supported, and understood.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-purple-600 mb-4">👨‍👩‍👧‍👦 Family Support</h3>
                  <p className="text-gray-600">
                    Supporting Portuguese families in London with resources, connections, and community that 
                    help children grow proud of their heritage while thriving in British society.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8">
                  <h3 className="text-xl font-semibold text-green-600 mb-4">🌍 Cultural Celebration</h3>
                  <p className="text-gray-600">
                    Celebrating the diversity of Portuguese-speaking countries—from Portugal to Brazil, Angola 
                    to Cape Verde—uniting us all through our shared linguistic and cultural bonds.
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
                Nossa Visão • Our Vision for the Future
              </h2>
              <p className="text-xl mb-8 opacity-90">
                By 2027, we envision LusoTown as London's strongest Portuguese community platform, 
                connecting families across all boroughs and ensuring our language and culture thrive for generations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <UserGroupIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">5,000+ Families</h3>
                  <p className="text-sm opacity-80">Connected across Greater London</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <BookOpenIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">100+ Schools</h3>
                  <p className="text-sm opacity-80">Teaching Portuguese heritage</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <HeartIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Cultural Legacy</h3>
                  <p className="text-sm opacity-80">Preserving heritage for future generations</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <p className="text-lg font-medium mb-4">
                  "Juntos, estamos a construir uma ponte entre as nossas origens e o nosso futuro em Londres. 
                  LusoTown é mais que uma comunidade—é a nossa família londrina."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    LT
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">LusoTown Team</p>
                    <p className="text-sm opacity-80">Community Builders</p>
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