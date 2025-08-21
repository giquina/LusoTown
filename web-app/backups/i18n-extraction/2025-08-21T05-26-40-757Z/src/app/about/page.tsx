'use client'

import Footer from '@/components/Footer'
import { ROUTES } from '@/config/routes'
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
import { useLanguage } from '@/context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <GlobeAltIcon className="w-4 h-4 mr-2" />
                {t('about.hero.badge', 'Unidos pela Língua • United by Language')}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {/* Desktop full title */}
                <span className="hidden sm:block">
                  About <span className="gradient-text">LusoTown London</span>
                </span>
                {/* Mobile short title */}
                <span className="sm:hidden">
                  About <span className="gradient-text">Us</span>
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {/* Desktop full subtitle */}
                <span className="hidden sm:block">
                  LusoTown connects Portuguese speakers and friends through real-life meetups in London. Whether you're new to the city, have roots in a Portuguese-speaking country, or simply love our culture and language, this is your space to meet people in person, share, and celebrate.
                </span>
                {/* Mobile short subtitle */}
                <span className="sm:hidden">
                  Connecting Portuguese speakers in London through real-life meetups!
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-20 bg-white">
          <div className="container-width">
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
                      <strong>As Portuguese speakers across the UK,</strong> we understand the deep connection 
                      to our heritage and the importance of preserving our beautiful language. Whether you're 
                      from Portugal, Brazil, Angola, or any Portuguese-speaking nation, the UK is now home.
                    </p>
                    <p>
                      <strong>We've experienced the challenge of finding</strong> Portuguese-speaking services, or simply wanting to connect with people who understand 
                      our culture, traditions, and the warmth of our communities back home.
                    </p>
                    <p>
                      <strong>London's Portuguese diaspora is rich and diverse,</strong> but we're often 
                      scattered across the city. LusoTown was created to bring us together—to share resources, 
                      support each other, and preserve our Portuguese heritage.
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
              
              {/* Features Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">When you join, you can:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      🎉
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Discover & Join Events</h4>
                      <p className="text-gray-600">Find cultural festivals, food markets, live music, networking meetups, and more.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      📱
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Stay Updated on LusoTown Feed</h4>
                      <p className="text-gray-600">See the latest events, posts, and community updates in real time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      📝
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Post & Share with the Community</h4>
                      <p className="text-gray-600">Add your own updates, photos, and tips, and tag events or businesses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      ❤️
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Save Your Favourites</h4>
                      <p className="text-gray-600">Bookmark events, businesses, and posts you love so you never miss out.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      🏪
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Support Portuguese Businesses</h4>
                      <p className="text-gray-600">Explore our directory and discover places run by or for Portuguese speakers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      👥
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Connect with People Like You</h4>
                      <p className="text-gray-600">Meet new friends, share experiences, and keep your language and traditions alive in London.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 text-center">
                    LusoTown is completely free to join and built for people from: Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and Príncipe, East Timor, Macau, and Equatorial Guinea — and for anyone who feels part of our Portuguese-speaking world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The "Aha" Moment Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width">
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
                    Helping preserve Portuguese language and culture, supporting those who are proud of their heritage, 
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
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nossa Missão: Preservar a Cultura, Conectar Corações
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We believe every Portuguese speaker in London deserves a community that celebrates 
                  our heritage, supports our community, and keeps our beautiful language thriving.
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
                      <p><strong>Language heritage.</strong> Ensuring Portuguese continues to be spoken with pride and confidence.</p>
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
                      <p><strong>Community-focused platform.</strong> Supporting Portuguese speakers and connecting our diaspora.</p>
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

              {/* Portuguese-Speaking Countries Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">A Língua Portuguesa Pelo Mundo</h3>
                  <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                    Portuguese is spoken by over 280 million people across four continents! Each country has evolved the language uniquely, 
                    creating a beautiful tapestry of accents, expressions, and cultural flavors that make our community so vibrant.
                  </p>
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 text-center">
                    <p className="text-gray-700 font-medium">🌍 10 Countries • 4 Continents • 280+ Million Speakers • 1 Beautiful Language Community</p>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* Portugal */}
                  <div className="border-2 border-primary-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary-200 bg-gradient-to-br from-white to-primary-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇵🇹</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Portugal</h4>
                        <p className="text-sm text-gray-600 font-medium">O berço da língua • The birthplace</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Language Heritage:</strong> Home to the original Portuguese with its distinctive European pronunciation, the beautiful 'ão' endings, and formal conjugations that preserve centuries of linguistic tradition.</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Gems:</strong> Fado music that captures saudade, Pastéis de Nata invented by monks, and the world's oldest bookstore (Livraria Bertrand, 1732)!</p>
                      <p className="text-gray-700"><strong>⚡ Fun Fact:</strong> Portuguese is the oldest nation-state in Europe (1143) and gave the world the word "saudade"—untranslatable longing that every Portuguese speaker understands.</p>
                    </div>
                  </div>
                  
                  {/* Brazil */}
                  <div className="border-2 border-secondary-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-secondary-200 bg-gradient-to-br from-white to-secondary-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇧🇷</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Brazil</h4>
                        <p className="text-sm text-gray-600 font-medium">O maior país lusófono • The largest Portuguese-speaking nation</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Language Evolution:</strong> Brazilian Portuguese has softer sounds, unique expressions like "tô" for "estou," and indigenous/African influences creating words like "abacaxi" (pineapple) and "cafuné" (gentle head caress).</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Powerhouse:</strong> Carnival, bossa nova, capoeira, and the world's largest Portuguese-speaking population (over 215 million people!).</p>
                      <p className="text-gray-700"><strong>⚡ Amazing Fact:</strong> Brazil is the only Portuguese-speaking country in the Americas and has more Portuguese speakers than Portugal itself—by a factor of 20!</p>
                    </div>
                  </div>
                  
                  {/* Angola */}
                  <div className="border-2 border-purple-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇦🇴</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Angola</h4>
                        <p className="text-sm text-gray-600 font-medium">Terra de kizomba • Land of kizomba</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Linguistic Blend:</strong> Angolan Portuguese mixes with Kimbundu, Umbundu, and Kikongo languages, creating unique expressions like "bué" (a lot) and "fixe" (cool)—now used across the Portuguese-speaking world!</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Gift to the World:</strong> Birthplace of kizomba dance and semba music, which influenced global Latin dance culture and Brazilian samba.</p>
                      <p className="text-gray-700"><strong>⚡ Incredible Fact:</strong> Home to the Welwitschia plant that can live over 1,500 years—some are older than Portuguese as a language!</p>
                    </div>
                  </div>
                  
                  {/* Mozambique */}
                  <div className="border-2 border-green-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-green-200 bg-gradient-to-br from-white to-green-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇲🇿</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Mozambique</h4>
                        <p className="text-sm text-gray-600 font-medium">Pérola do Índico • Pearl of the Indian Ocean</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Multilingual Magic:</strong> Portuguese blends with Makhuwa, Tsonga, and Sena languages, creating coastal dialects influenced by Arabic and Swahili trade languages.</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Fusion:</strong> Marrabenta music, Dhow boat traditions, and architecture blending African, Arab, and Portuguese influences in stunning ways.</p>
                      <p className="text-gray-700"><strong>⚡ Ocean Wonder:</strong> Home to pristine coral reefs and the world's largest cashew tree, plus dugongs (sea cows) that inspired mermaid legends!</p>
                    </div>
                  </div>
                  
                  {/* Cape Verde */}
                  <div className="border-2 border-primary-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary-200 bg-gradient-to-br from-white to-primary-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇨🇻</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Cape Verde</h4>
                        <p className="text-sm text-gray-600 font-medium">Ilhas da música • Islands of music</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Creole Heritage:</strong> Portuguese coexists with Kriolu (Cape Verdean Creole), creating a unique bilingual culture where both languages flow naturally in daily life.</p>
                      <p className="text-gray-700"><strong>🎭 Musical Soul:</strong> Birthplace of Morna music and legendary Cesária Évora, the "Barefoot Diva" who brought Cape Verdean music to the world.</p>
                      <p className="text-gray-700"><strong>⚡ Island Magic:</strong> 10 volcanic islands where it almost never rains, but the music and culture are so rich they water the soul!</p>
                    </div>
                  </div>
                  
                  {/* Guinea-Bissau */}
                  <div className="border-2 border-orange-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-orange-200 bg-gradient-to-br from-white to-orange-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇬🇼</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Guinea-Bissau</h4>
                        <p className="text-sm text-gray-600 font-medium">Terra dos cajus • Land of cashews</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Creole Diversity:</strong> Portuguese mixes with Kriol and over 20 local languages including Fula, Mandinka, and Balanta, creating Africa's most multilingual Portuguese-speaking society.</p>
                      <p className="text-gray-700"><strong>🎭 Matriarchal Islands:</strong> The Bijagó archipelago features rare matriarchal societies where women choose their husbands—unique in the Portuguese-speaking world!</p>
                      <p className="text-gray-700"><strong>⚡ Cashew Capital:</strong> Produces some of the world's finest cashews and has more languages per square kilometer than almost anywhere else on Earth!</p>
                    </div>
                  </div>
                  
                  {/* São Tomé and Príncipe */}
                  <div className="border-2 border-yellow-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-yellow-200 bg-gradient-to-br from-white to-yellow-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇸🇹</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">São Tomé and Príncipe</h4>
                        <p className="text-sm text-gray-600 font-medium">Ilhas do cacau • Chocolate islands</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Creole Paradise:</strong> Portuguese coexists with Forro, Angolar, and Principense—unique creole languages that evolved on these isolated islands, preserving 500-year-old Portuguese linguistic features.</p>
                      <p className="text-gray-700"><strong>🎭 Chocolate Heritage:</strong> First place in Africa where cocoa was cultivated, creating the world's finest chocolate with Portuguese colonial plantation architecture as a backdrop.</p>
                      <p className="text-gray-700"><strong>⚡ Tiny Giant:</strong> Africa's second-smallest country but with such biodiversity that 95% of its plants exist nowhere else on Earth!</p>
                    </div>
                  </div>
                  
                  {/* East Timor */}
                  <div className="border-2 border-red-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-red-200 bg-gradient-to-br from-white to-red-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇹🇱</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">East Timor (Timor-Leste)</h4>
                        <p className="text-sm text-gray-600 font-medium">Nação mais nova • Youngest nation</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Linguistic Survivor:</strong> Portuguese survived 24 years of Indonesian occupation and became a symbol of independence, now mixing beautifully with Tetum and local languages.</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Bridge:</strong> Unique blend of Southeast Asian, Melanesian, and Portuguese influences creating distinct architecture, textiles, and spiritual practices.</p>
                      <p className="text-gray-700"><strong>⚡ Phoenix Nation:</strong> The world's newest country (independent since 2002) and the only place where Portuguese and Asian cultures create such a unique fusion!</p>
                    </div>
                  </div>
                  
                  {/* Macau */}
                  <div className="border-2 border-pink-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-pink-200 bg-gradient-to-br from-white to-pink-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇲🇴</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Macau</h4>
                        <p className="text-sm text-gray-600 font-medium">Oriente português • Portuguese Orient</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ East-West Fusion:</strong> Portuguese coexists with Cantonese and Mandarin, creating Patuá—a unique Portuguese-Chinese creole with only 50 fluent speakers left, making it critically endangered.</p>
                      <p className="text-gray-700"><strong>🎭 Culinary Magic:</strong> Birthplace of Portuguese egg tarts (pastéis de nata), Minchi (Macanese comfort food), and fusion cuisine that influenced food culture across Asia.</p>
                      <p className="text-gray-700"><strong>⚡ Historic Marvel:</strong> 460+ years of Portuguese heritage in China, creating the world's most unique East-West cultural blend and UNESCO World Heritage architecture!</p>
                    </div>
                  </div>
                  
                  {/* Equatorial Guinea */}
                  <div className="border-2 border-teal-100 rounded-xl p-6 hover:shadow-lg transition-all hover:border-teal-200 bg-gradient-to-br from-white to-teal-50/30">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">🇬🇶</span>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Equatorial Guinea</h4>
                        <p className="text-sm text-gray-600 font-medium">África portuguesa • Portuguese Africa (by adoption)</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="text-gray-700"><strong>🗣️ Newest Addition:</strong> Portuguese became co-official with Spanish and French in 2010, making Equatorial Guinea the newest member of our Portuguese-speaking family!</p>
                      <p className="text-gray-700"><strong>🎭 Cultural Crossroads:</strong> The only Portuguese-speaking country in Africa that was never colonized by Portugal, creating a unique perspective on Portuguese as a bridge language.</p>
                      <p className="text-gray-700"><strong>⚡ Unique Position:</strong> The only Portuguese-speaking country on the equator and the only African nation where Portuguese joins Spanish and French as official languages!</p>
                    </div>
                  </div>
                </div>
                
                {/* Language Statistics */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">🌍 A Língua Portuguesa em Números</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-primary-600">280M+</div>
                      <div className="text-xs text-gray-600">Native Speakers</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-secondary-600">5th</div>
                      <div className="text-xs text-gray-600">Most Spoken Language</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">4</div>
                      <div className="text-xs text-gray-600">Continents</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">12+</div>
                      <div className="text-xs text-gray-600">Unique Accents</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-2">
                    "Do Minho ao Timor, de Cabo Verde ao Brasil—somos uma só família lusófona!"
                  </p>
                  <p className="text-gray-600 italic text-sm">
                    From Portugal's northern Minho to distant Timor, from Cape Verde's islands to Brazil's vastness—we are one Portuguese-speaking family, united by language, enriched by diversity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Impact Stats */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
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
                  <div className="text-3xl font-bold text-primary-600 mb-2">750+</div>
                  <div className="text-sm text-gray-600">Portuguese Community Members</div>
                  <div className="text-xs text-gray-500 mt-1">Connected in London</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">15+</div>
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

        {/* Our Values & Inclusive Community */}
        <section className="py-20 bg-white">
          <div className="container-width">
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

              {/* Inclusive Community Statement */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Um Abraço Caloroso • A Warm Embrace
                </h3>
                <div className="prose prose-lg text-gray-700 max-w-none">
                  <p className="text-center text-lg font-medium text-gray-800 mb-6">
                    "Somos uma comunidade de mente aberta que acolhe todos os falantes de português com o coração cheio de amor."
                  </p>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <p className="mb-4">
                      <strong>This platform welcomes open-minded people from every corner of the Portuguese-speaking world.</strong> 
                      Our staff and community come from all countries that speak Portuguese—from the historic streets of Porto 
                      to the vibrant beaches of Rio, from the cultural richness of Luanda to the island beauty of Cabo Verde.
                    </p>
                    <p className="mb-4">
                      <strong>We embrace diversity in all its forms.</strong> Whether you're Muslim, Christian, atheist, agnostic, 
                      or hold any other belief, you are welcome here. Religion is a personal journey, and we respect everyone's 
                      individual path. What unites us is our shared language, our cultural heritage, and our commitment to 
                      supporting one another in this beautiful, challenging journey called life.
                    </p>
                    <p className="mb-4">
                      <strong>We ask only for respect, kindness, and mutual support.</strong> Life in London can be challenging 
                      enough without facing it alone. Together, we create a space where Portuguese speakers can find friendship, 
                      guidance, and the warmth of home, no matter where that home originally was.
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-base text-gray-600 italic">
                      "Aqui, todos têm lugar. Here, everyone belongs. We're not just building a community—we're creating a family."
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Guidelines Notice */}
              <div className="bg-primary-50 border-l-4 border-primary-500 rounded-r-xl p-6">
                <h4 className="text-lg font-semibold text-primary-900 mb-3">Our Event Philosophy</h4>
                <p className="text-primary-800">
                  We maintain thoughtful guidelines for our events to ensure everyone feels comfortable and welcome. 
                  Our events focus on cultural celebration, language preservation, and community building—not religious 
                  themes, as we believe faith is beautifully personal. We're here to enjoy life together, learn from 
                  each other, and celebrate the rich tapestry of Portuguese-speaking cultures.
                </p>
                <div className="mt-4">
                  <a href="/community-guidelines" className="text-primary-600 hover:text-primary-800 font-medium underline">
                    Read our full Community Guidelines →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
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

        {/* Join CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Join Nossa Comunidade?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether you're from Portugal, Brazil, Angola, or any Portuguese-speaking nation, 
                your community in London is waiting for you.
              </p>
              <a 
                href={ROUTES.signup}
                className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                JOIN NOW
              </a>
              <p className="text-gray-500 text-sm mt-4">
                Free to join • Immediate access • UK Portuguese community
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}