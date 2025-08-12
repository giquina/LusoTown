import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShieldCheckIcon, HeartIcon, UserGroupIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Community Guidelines | AdyaTribe - Safe Space for Women 30+',
  description: 'Learn about AdyaTribe community guidelines that ensure a safe, respectful environment for professional women 30+ in London & UK to build meaningful friendships.',
}

export default function CommunityGuidelines() {
  const guidelines = [
    {
      icon: ShieldCheckIcon,
      title: "Respect & Kindness",
      description: "Treat every member with respect, empathy, and kindness. No harassment, bullying, or discriminatory language will be tolerated."
    },
    {
      icon: UserGroupIcon,
      title: "Authentic Connections",
      description: "Be genuine in your interactions. Our community values authenticity over networking or sales pitches."
    },
    {
      icon: HeartIcon,
      title: "Support Each Other",
      description: "Offer support, encouragement, and celebrate each other's successes. We lift each other up."
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Report Concerns",
      description: "If you encounter any behavior that makes you uncomfortable, please report it to our moderation team immediately."
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
                Creating a safe, supportive space where women 30+ can build meaningful friendships and connections.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment to Safety</h2>
                <div className="prose prose-lg text-gray-700">
                  <p>
                    AdyaTribe is committed to maintaining a safe, inclusive environment for all members. 
                    Our community guidelines are designed to ensure every woman feels respected, 
                    valued, and protected while building meaningful connections.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-8">
                  Questions about our community guidelines? We're here to help.
                </p>
                <a 
                  href="/contact" 
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Contact Our Team
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