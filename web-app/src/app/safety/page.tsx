import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  UserGroupIcon,
  EyeIcon,
  LockClosedIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
  HandRaisedIcon,
  HeartIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

export default function SafetyCenter() {
  const safetyFeatures = [
    {
      title: 'Identity Verification',
      description: 'Every member completes selfie verification to ensure authenticity',
      icon: ShieldCheckIcon,
      color: 'primary'
    },
    {
      title: 'Community Verification',
      description: 'Profile verification ensures genuine connections across all age groups',
      icon: CheckCircleIcon,
      color: 'secondary'
    },
    {
      title: 'Profile Moderation',
      description: 'Human review of all profiles and photos before approval',
      icon: EyeIcon,
      color: 'purple'
    },
    {
      title: 'Secure Messaging',
      description: 'Encrypted communication with reporting and blocking features',
      icon: LockClosedIcon,
      color: 'green'
    },
    {
      title: '24/7 Monitoring',
      description: 'Automated content filtering plus human moderation team',
      icon: ClockIcon,
      color: 'blue'
    },
    {
      title: 'Safe Reporting',
      description: 'Anonymous reporting system with quick response times',
      icon: ExclamationTriangleIcon,
      color: 'red'
    }
  ]

  const meetingSafelyTips = [
    {
      category: 'Before Meeting',
      icon: CheckCircleIcon,
      tips: [
        'Always meet in public places for first meetings',
        'Tell a trusted friend where you\'re going and when you\'ll check in',
        'Video chat or phone call before meeting in person',
        'Trust your instincts - if something feels off, postpone',
        'Share the meeting location and time with someone you trust'
      ]
    },
    {
      category: 'During the Meeting',
      icon: EyeIcon,
      tips: [
        'Stay in public, well-lit areas with other people around',
        'Keep your phone charged and accessible',
        'Don\'t share personal information like your home address',
        'Have your own transportation - don\'t rely on others',
        'Trust your gut - leave if you feel uncomfortable'
      ]
    },
    {
      category: 'Online Safety',
      icon: LockClosedIcon,
      tips: [
        'Keep personal details private until you build trust',
        'Don\'t share financial information or send money',
        'Be cautious of people who avoid video calls or group meetups',
        'Report suspicious behavior immediately',
        'Use LusoTown\'s messaging system initially'
      ]
    }
  ]

  const warningSignsData = [
    {
      category: 'Profile Red Flags',
      signs: [
        'Refuses to video chat or meet in group settings',
        'Profile photos look too professional or model-like',
        'Inconsistent information or vague details',
        'Pushes for immediate personal contact information',
        'Profile recently created with minimal information'
      ]
    },
    {
      category: 'Communication Concerns',
      signs: [
        'Asks for money, gifts, or financial assistance',
        'Pressures you to meet alone or in private locations',
        'Becomes angry or manipulative when you set boundaries',
        'Asks overly personal questions too quickly',
        'Language doesn\'t match their stated background'
      ]
    },
    {
      category: 'Behavioral Warnings',
      signs: [
        'Disrespects your boundaries or comfort level',
        'Makes you feel pressured or uncomfortable',
        'Shows signs of controlling behavior',
        'Speaks negatively about other women or groups',
        'Exhibits discriminatory attitudes or language'
      ]
    }
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
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Your Safety Is Our Priority
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Safety Center
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                LusoTown is built with women's safety at its core. Learn about our comprehensive safety features, 
                get tips for meeting safely, and access resources to help you navigate friendships with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="py-12 bg-red-50 border-b-4 border-red-200">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-100 border border-red-300 rounded-xl p-6">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-red-800 mb-4">Emergency & Immediate Safety</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-red-700 mb-2">Emergency Services</h3>
                        <div className="space-y-1 text-red-600">
                          <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2" />
                            <span><strong>999</strong> - Police, Fire, Ambulance</span>
                          </div>
                          <div className="flex items-center">
                            <PhoneIcon className="w-4 h-4 mr-2" />
                            <span><strong>101</strong> - Non-emergency police</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-700 mb-2">Platform Safety</h3>
                        <div className="space-y-1 text-red-600">
                          <div className="flex items-center">
                            <EnvelopeIcon className="w-4 h-4 mr-2" />
                            <span><strong>safety@lusotown.com</strong></span>
                          </div>
                          <div className="text-sm">Response within 2-4 hours, monitored 24/7</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Built-In Safety Features
                </h2>
                <p className="text-xl text-gray-600">
                  Multiple layers of protection to ensure authentic connections and safe interactions
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 bg-${feature.color}-100 text-${feature.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meeting Safely Guide */}
        <section className="py-20 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Meeting Safely: Your Complete Guide
                </h2>
                <p className="text-xl text-gray-600">
                  Essential safety tips for meeting new friends through LusoTown
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {meetingSafelyTips.map((section, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-6">
                      <section.icon className="w-8 h-8 text-primary-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">{section.category}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Recognize Warning Signs
                </h2>
                <p className="text-xl text-gray-600">
                  Trust your instincts and watch for these potential red flags
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {warningSignsData.map((category, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-red-800 mb-6 flex items-center">
                      <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
                      {category.category}
                    </h3>
                    
                    <div className="space-y-3">
                      {category.signs.map((sign, signIndex) => (
                        <div key={signIndex} className="flex items-start">
                          <XMarkIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{sign}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8">
                <div className="flex items-start">
                  <HandRaisedIcon className="w-8 h-8 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4">Trust Your Instincts</h3>
                    <p className="text-yellow-700 mb-4">
                      If something feels wrong, it probably is. You don't need to justify your feelings or give someone 
                      the "benefit of the doubt" at the expense of your safety and comfort.
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-yellow-800 font-medium">
                        Remember: Genuine people will respect your boundaries, be patient with your comfort level, 
                        and want you to feel safe. Anyone who pressures or dismisses your safety concerns is not 
                        someone you want in your life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting System */}
        <section className="py-20 bg-primary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How to Report Concerns
                </h2>
                <p className="text-xl text-gray-600">
                  Multiple ways to report issues with quick, confidential responses
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-600 mr-3" />
                    In-App Reporting
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Profile Reports</h4>
                        <p className="text-gray-600 text-sm">Use the "Report" button on any profile to flag concerning behavior or fake accounts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Message Reports</h4>
                        <p className="text-gray-600 text-sm">Report inappropriate messages directly from your chat interface</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Event Reports</h4>
                        <p className="text-gray-600 text-sm">Report concerning behavior at events or inappropriate event descriptions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <EnvelopeIcon className="w-6 h-6 text-secondary-600 mr-3" />
                    Email Support
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <h4 className="font-semibold text-secondary-800 mb-2">Safety Team</h4>
                      <div className="space-y-1">
                        <div className="flex items-center text-secondary-700">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          <span>safety@lusotown.com</span>
                        </div>
                        <div className="text-secondary-600 text-sm">
                          Response: Within 2-4 hours • Monitored 24/7
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-600 text-sm">
                      <p>• All reports are confidential and taken seriously</p>
                      <p>• Include screenshots or evidence when possible</p>
                      <p>• We investigate all reports within 24 hours</p>
                      <p>• Follow-up communication within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">What Happens When You Report</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Report Received</h4>
                    <p className="text-gray-600 text-sm">Your report is immediately logged and assigned to our safety team</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Investigation</h4>
                    <p className="text-gray-600 text-sm">We review all evidence and may contact involved parties for more information</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Action Taken</h4>
                    <p className="text-gray-600 text-sm">Appropriate measures are implemented, from warnings to permanent bans</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Follow-Up</h4>
                    <p className="text-gray-600 text-sm">You receive an update on the resolution and any additional steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Resources */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Additional Support Resources
                </h2>
                <p className="text-xl text-gray-600">
                  External resources for additional support and information
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary-800 mb-4">Women's Safety Organizations</h3>
                  <div className="space-y-3 text-primary-700">
                    <div>
                      <h4 className="font-semibold">Women's Aid</h4>
                      <p className="text-sm">24-hour helpline: 0808 2000 247</p>
                      <p className="text-sm">Support for women experiencing domestic violence</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Victim Support</h4>
                      <p className="text-sm">24-hour helpline: 08 08 16 89 111</p>
                      <p className="text-sm">Free and confidential support for victims of crime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Mental Health Support</h3>
                  <div className="space-y-3 text-green-700">
                    <div>
                      <h4 className="font-semibold">Samaritans</h4>
                      <p className="text-sm">24-hour helpline: 116 123</p>
                      <p className="text-sm">Emotional support for anyone in distress</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Mind</h4>
                      <p className="text-sm">Info line: 0300 123 3393</p>
                      <p className="text-sm">Mental health information and support</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Online Safety</h3>
                  <div className="space-y-3 text-purple-700">
                    <div>
                      <h4 className="font-semibold">Get Safe Online</h4>
                      <p className="text-sm">Website: getsafeonline.org</p>
                      <p className="text-sm">UK's leading source for online safety advice</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Action Fraud</h4>
                      <p className="text-sm">Helpline: 0300 123 2040</p>
                      <p className="text-sm">Report online fraud and cybercrime</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4">Emergency Services</h3>
                  <div className="space-y-3 text-red-700">
                    <div>
                      <h4 className="font-semibold">Emergency</h4>
                      <p className="text-sm">Call: 999</p>
                      <p className="text-sm">Police, Fire, Ambulance - immediate danger</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Non-Emergency Police</h4>
                      <p className="text-sm">Call: 101</p>
                      <p className="text-sm">Report crimes and get police advice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Commitment */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <HeartIcon className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-6">
                Our Commitment to Your Safety
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Your safety and wellbeing are not negotiable. We're constantly improving our safety features, 
                listening to community feedback, and working with safety experts to ensure LusoTown remains 
                a secure space for women to build meaningful friendships.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm opacity-90">
                <div className="flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  Zero Tolerance for Harassment
                </div>
                <div className="flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  24/7 Safety Monitoring
                </div>
                <div className="flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Community-First Approach
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