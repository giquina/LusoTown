import Footer from '@/components/Footer'
import { ROUTES } from '@/config/routes'
import { ShieldCheckIcon, HeartIcon, UserGroupIcon, ExclamationTriangleIcon, GlobeAltIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Community Guidelines | LusoTown London - Portuguese Community Standards',
  description: 'Learn about LusoTown London community guidelines that ensure a respectful, inclusive environment for the Portuguese diaspora community in London.',
}

export default function CommunityGuidelines() {
  const { t } = useLanguage()
  
  const guidelines = [
    {
      icon: ShieldCheckIcon,
      title: t('community_guidelines.respect.title'),
      description: t('community_guidelines.respect.description')
    },
    {
      icon: GlobeAltIcon,
      title: t('community_guidelines.inclusion.title'),
      description: t('community_guidelines.inclusion.description')
    },
    {
      icon: HeartIcon,
      title: t('community_guidelines.network.title'),
      description: t('community_guidelines.network.description')
    },
    {
      icon: UserGroupIcon,
      title: t('community_guidelines.culture.title'),
      description: t('community_guidelines.culture.description')
    },
    {
      icon: BuildingOfficeIcon,
      title: t('community_guidelines.community.title'),
      description: t('community_guidelines.community.description')
    },
    {
      icon: ExclamationTriangleIcon,
      title: t('community_guidelines.report.title'),
      description: t('community_guidelines.report.description')
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('community_guidelines.hero.title')}
              </h1>
              <p className="text-xl text-secondary-600 leading-relaxed">
                {t('community_guidelines.hero.description')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {guidelines.map((guideline, index) => {
                  const IconComponent = guideline.icon
                  return (
                    <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center mb-6">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{guideline.title}</h3>
                      <p className="text-secondary-600 leading-relaxed">{guideline.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossa Comunidade (Our Community)</h2>
                <div className="prose prose-lg text-secondary-700 space-y-4">
                  <p>
                    LusoTown London is committed to maintaining a respectful, inclusive environment for all Portuguese speakers and working professionals. 
                    Our community guidelines ensure everyone feels welcome, valued, and supported while advancing careers and celebrating Portuguese culture.
                  </p>
                  
                  <div className="bg-white border-l-4 border-primary-500 p-4 rounded-r-lg my-6">
                    <p className="font-semibold text-primary-700 mb-2">Inclusive Community Statement</p>
                    <p className="text-secondary-700">
                      This platform is for open-minded people, and we do not discriminate in any way. You are welcome to join our staff, which comes from all the countries that speak Portuguese. 
                      Whether you're Muslim, atheist, agnostic, or Christian, we just ask you to be respectful and share and teach and help one another in any way you can, 
                      as life is already challenging as it is. We're making an effort so everyone can get along. That's why we have strict guidelines before attending one of our events. 
                      We do not create events that are religious driven, as we believe religion views should be private by default. We just want to enjoy life around people that speak our language 
                      and learn a thing or two whilst in this journey called life.
                    </p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <GlobeAltIcon className="w-5 h-5 mr-2 text-primary-600" />
                      Communication That Connects Hearts
                    </h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Speak with warmth and respect in Portuguese, English, or any language of the heart</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Celebrate the beautiful diversity across all Portuguese-speaking nations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Use language that welcomes professionals, students, and adults from all backgrounds</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-action-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Share professional opportunities with generosity and integrity</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <HeartIcon className="w-5 h-5 mr-2 text-coral-500" />
                      Cultural Celebration & Heritage
                    </h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-coral-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Honor traditional festivals—from Festa do Avante to Festa Junina, São João to Carnival</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Share stories, recipes, music, and traditions with younger generations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Keep our beautiful language alive and thriving in London</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Support Portuguese businesses and cultural initiatives with pride</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <UserGroupIcon className="w-5 h-5 mr-2 text-indigo-500" />
                      Professional & Community Support
                    </h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Welcome newcomers with open arms and practical guidance for London life</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Share resources for education, healthcare, legal matters, and daily navigation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Help professionals thrive in British society while honoring Portuguese identity</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>Create meaningful spaces where young adults and professionals connect with their heritage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Juntos Somos Mais Fortes • Together We Are Stronger</h3>
                <p className="text-lg mb-6 opacity-90">
                  These guidelines aren't rules—they're our promise to each other. A commitment to creating 
                  the kind of community where every Portuguese speaker in London feels at home, valued, and loved.
                </p>
                <p className="text-base mb-8 opacity-80">
                  Tem perguntas sobre as nossas diretrizes da comunidade? Estamos aqui para ajudar. 
                  Questions about our community guidelines? We're here to help.
                </p>
                 <a 
                   href={ROUTES.contact} 
                  className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Entre em Contato / Contact Our Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}