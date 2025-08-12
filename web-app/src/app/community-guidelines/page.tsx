import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShieldCheckIcon, HeartIcon, UserGroupIcon, ExclamationTriangleIcon, GlobeAltIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Community Guidelines | LusoTown London - Portuguese Community Standards',
  description: 'Learn about LusoTown London community guidelines that ensure a respectful, inclusive environment for the Portuguese diaspora community in London.',
}

export default function CommunityGuidelines() {
  const guidelines = [
    {
      icon: ShieldCheckIcon,
      title: "Respeito (Respect)",
      description: "Treat all community members with dignity and respect. Value cultural diversity across all Portuguese-speaking countries including Portugal, Brazil, Angola, Mozambique, and others."
    },
    {
      icon: GlobeAltIcon,
      title: "Inclusão (Inclusion)",
      description: "Welcome all Portuguese speakers regardless of country of origin. Embrace our shared language while celebrating our unique cultural differences."
    },
    {
      icon: HeartIcon,
      title: "Família (Family)",
      description: "Support each other like extended family. Help fellow Portuguese speakers navigate life in London and maintain strong community bonds across generations."
    },
    {
      icon: UserGroupIcon,
      title: "Cultura (Culture)",
      description: "Preserve and celebrate Portuguese heritage through language, traditions, and cultural events. Share our rich cultural diversity with the wider London community."
    },
    {
      icon: BuildingOfficeIcon,
      title: "Comunidade (Community)",
      description: "Foster professional networking and mutual support. Help fellow Portuguese speakers thrive in London's business environment while maintaining our cultural identity."
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Report Concerns",
      description: "If you encounter any behavior that makes you uncomfortable or violates our community standards, please report it to our moderation team immediately."
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Community Guidelines
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Creating a respectful, inclusive environment for the Portuguese diaspora community in London to connect, support each other, and celebrate our shared heritage.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-width px-4 sm:px-6 lg:px-8">
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
                      <p className="text-gray-600 leading-relaxed">{guideline.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossa Comunidade (Our Community)</h2>
                <div className="prose prose-lg text-gray-700 space-y-4">
                  <p>
                    LusoTown London is committed to maintaining a respectful, inclusive environment for all Portuguese speakers and their families. 
                    Our community guidelines ensure everyone feels welcome, valued, and supported while preserving our cultural heritage in London.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Communication Standards</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respectful communication in both Portuguese and English</li>
                    <li>Cultural sensitivity across all Portuguese-speaking countries</li>
                    <li>Family-friendly language appropriate for all ages</li>
                    <li>Professional networking ethics in business discussions</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Cultural Events & Heritage</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Celebrate traditional Portuguese holidays and festivals</li>
                    <li>Share cultural knowledge and traditions with younger generations</li>
                    <li>Support Portuguese language learning and preservation</li>
                    <li>Promote Portuguese businesses and cultural initiatives in London</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Family & Community Support</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide guidance for newcomers to London</li>
                    <li>Share resources for education, healthcare, and legal matters</li>
                    <li>Support families navigating British systems while maintaining Portuguese identity</li>
                    <li>Create safe spaces for children and teenagers to connect with their heritage</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-8">
                  Tem perguntas sobre as nossas diretrizes da comunidade? Estamos aqui para ajudar. / Questions about our community guidelines? We're here to help.
                </p>
                <a 
                  href="/contact" 
                  className="btn-primary inline-flex items-center gap-2"
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