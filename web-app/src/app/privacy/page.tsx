import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  ShieldCheckIcon, 
  EyeIcon, 
  LockClosedIcon,
  UserIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Privacy Policy | AdyaTribe - GDPR Compliant Data Protection',
  description: 'Learn how AdyaTribe protects your privacy and personal data. Our GDPR-compliant privacy policy for the UK\'s premier 30+ women\'s community platform.',
  keywords: [
    'privacy policy',
    'GDPR compliance',
    'data protection',
    'UK privacy',
    'women community privacy',
    'personal data protection',
    'privacy rights UK',
    'data security',
    'privacy policy women',
    'UK GDPR'
  ],
  openGraph: {
    title: 'Privacy Policy | AdyaTribe',
    description: 'Learn how AdyaTribe protects your privacy and personal data with our GDPR-compliant privacy policy.',
    type: 'website',
    url: '/privacy',
  },
  alternates: {
    canonical: '/privacy'
  }
}

export default function PrivacyPolicy() {
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
                GDPR Compliant • Last Updated: January 2025
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your privacy is fundamental to everything we do at AdyaTribe. This policy explains how we collect, use, and protect your personal data in accordance with UK GDPR and Data Protection Act 2018.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-16 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <EyeIcon className="w-6 h-6 text-secondary-600 mr-3" />
                  Privacy at a Glance
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600"><strong>We collect minimal data</strong> - only what's necessary for your safety and community experience</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600"><strong>You control your data</strong> - view, edit, or delete your information anytime</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600"><strong>Security is paramount</strong> - your data is encrypted and protected</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600"><strong>No selling or sharing</strong> - we never sell your data to third parties</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600"><strong>UK-based processing</strong> - your data remains within the UK/EU</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-600"><strong>Transparent practices</strong> - clear information about what we do with your data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

              {/* Who We Are */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <UserIcon className="w-6 h-6 text-primary-600 mr-3" />
                  1. Who We Are
                </h2>
                <div className="prose text-gray-600 space-y-4">
                  <p>
                    AdyaTribe is operated by AdyaTribe Ltd, a company registered in England and Wales. 
                    We are committed to protecting and respecting your privacy in accordance with the 
                    UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Data Controller Details:</p>
                    <p>AdyaTribe Ltd<br />
                    Email: privacy@adyatribe.com<br />
                    Address: London, United Kingdom<br />
                    ICO Registration: [Pending Registration]</p>
                  </div>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <DocumentTextIcon className="w-6 h-6 text-primary-600 mr-3" />
                  2. Information We Collect
                </h2>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Information</h3>
                    <p className="text-gray-600 mb-3">When you create an account, we collect:</p>
                    <ul className="text-gray-600 space-y-2 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        First name and age (to create your community profile)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Email address (for account access and communications)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Profile photo and verification selfie (for safety and authenticity)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Interest tags (to connect you with like-minded women)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Location (city/region only, for local community matching)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
                    <ul className="text-gray-600 space-y-2 ml-4">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Platform activity (events attended, groups joined, messages sent)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Device information and IP address (for security and platform optimization)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Interaction data (to improve matching and recommendations)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LockClosedIcon className="w-6 h-6 text-primary-600 mr-3" />
                  3. How We Use Your Information
                </h2>
                <div className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-primary-700 mb-3">Essential Services</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Account creation and management</li>
                        <li>• Identity verification and safety</li>
                        <li>• Community matching and connections</li>
                        <li>• Event organization and participation</li>
                        <li>• Platform security and fraud prevention</li>
                      </ul>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-secondary-700 mb-3">Communication & Support</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Send important service updates</li>
                        <li>• Respond to your questions and requests</li>
                        <li>• Notify you of relevant community activities</li>
                        <li>• Provide customer support</li>
                        <li>• Share safety information and resources</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-purple-700 mb-3">Platform Improvement (With Your Consent)</h3>
                    <p className="text-gray-600 mb-3">
                      We may use anonymized data to improve our platform, but only with your explicit consent:
                    </p>
                    <ul className="text-gray-600 space-y-2 ml-4">
                      <li>• Analyze platform usage to enhance user experience</li>
                      <li>• Develop new features and services</li>
                      <li>• Conduct research on community building and women's networking</li>
                    </ul>
                    <p className="text-sm text-purple-600 mt-3 font-medium">
                      You can withdraw consent at any time in your account settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Basis */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-primary-600 mr-3" />
                  4. Legal Basis for Processing
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-green-400 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Contractual Necessity</h3>
                      <p className="text-gray-600">Processing your account data to provide our community platform services</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-blue-400 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Legitimate Interest</h3>
                      <p className="text-gray-600">Ensuring platform safety, preventing fraud, and improving user experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-purple-400 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Consent</h3>
                      <p className="text-gray-600">Marketing communications and optional data analysis for platform improvement</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-red-400 rounded-full mt-1 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Legal Obligation</h3>
                      <p className="text-gray-600">Compliance with legal requirements and law enforcement requests when necessary</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sharing */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <GlobeAltIcon className="w-6 h-6 text-primary-600 mr-3" />
                  5. Data Sharing and Third Parties
                </h2>
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">We Never Sell Your Data</h3>
                    <p className="text-red-700">
                      AdyaTribe will never sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Limited Sharing for Essential Services</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary-400 pl-4">
                        <h4 className="font-semibold text-gray-900">Service Providers</h4>
                        <p className="text-gray-600">
                          We use trusted UK/EU-based service providers for hosting (Supabase), email delivery, 
                          and payment processing. These providers are bound by strict data protection agreements.
                        </p>
                      </div>
                      <div className="border-l-4 border-secondary-400 pl-4">
                        <h4 className="font-semibold text-gray-900">Safety and Legal Requirements</h4>
                        <p className="text-gray-600">
                          We may share information if required by law, to prevent harm, or to protect the 
                          safety of our community members.
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-400 pl-4">
                        <h4 className="font-semibold text-gray-900">Business Transfers</h4>
                        <p className="text-gray-600">
                          In the event of a merger or acquisition, user data would be transferred under 
                          the same privacy protections with advance notice to users.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 text-primary-600 mr-3" />
                  6. Your Data Protection Rights
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h3 className="font-semibold text-primary-700 mb-2">Access</h3>
                      <p className="text-gray-600 text-sm">Request a copy of all personal data we hold about you</p>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <h3 className="font-semibold text-secondary-700 mb-2">Rectification</h3>
                      <p className="text-gray-600 text-sm">Correct any inaccurate or incomplete information</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-700 mb-2">Erasure</h3>
                      <p className="text-gray-600 text-sm">Request deletion of your personal data ('right to be forgotten')</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-semibold text-green-700 mb-2">Portability</h3>
                      <p className="text-gray-600 text-sm">Export your data in a machine-readable format</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h3 className="font-semibold text-indigo-700 mb-2">Restriction</h3>
                      <p className="text-gray-600 text-sm">Limit how we process your personal data</p>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-4">
                      <h3 className="font-semibold text-pink-700 mb-2">Objection</h3>
                      <p className="text-gray-600 text-sm">Object to processing based on legitimate interests</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h3 className="font-semibold text-orange-700 mb-2">Withdraw Consent</h3>
                      <p className="text-gray-600 text-sm">Withdraw consent for optional processing activities</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-4">
                      <h3 className="font-semibold text-teal-700 mb-2">Complaint</h3>
                      <p className="text-gray-600 text-sm">File a complaint with the ICO or relevant supervisory authority</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
                  <p className="text-gray-600 mb-3">
                    You can exercise most of these rights directly in your account settings. For other requests:
                  </p>
                  <div className="flex items-center space-x-4">
                    <EnvelopeIcon className="w-5 h-5 text-primary-600" />
                    <span className="text-primary-600 font-medium">privacy@adyatribe.com</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    We will respond to all requests within 30 days and may require verification of your identity.
                  </p>
                </div>
              </div>

              {/* Data Retention */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Data Retention</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We retain your personal data only as long as necessary to provide our services and comply with legal obligations:
                  </p>
                  <ul className="text-gray-600 space-y-3 ml-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Active accounts:</strong> Data retained while your account is active</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Deleted accounts:</strong> Most data deleted within 30 days, some safety records retained for 12 months</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>Legal requirements:</strong> Some data may be retained longer to comply with legal obligations</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Data Security</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Safeguards</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• End-to-end encryption for sensitive data</li>
                      <li>• Secure HTTPS connections</li>
                      <li>• Regular security audits and updates</li>
                      <li>• Access controls and authentication</li>
                      <li>• Automated backup and recovery systems</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizational Measures</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Staff training on data protection</li>
                      <li>• Limited access on a need-to-know basis</li>
                      <li>• Regular security assessments</li>
                      <li>• Incident response procedures</li>
                      <li>• Third-party security agreements</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">9. Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Privacy Questions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <EnvelopeIcon className="w-5 h-5 mr-3" />
                        <span>privacy@adyatribe.com</span>
                      </div>
                      <p className="text-sm opacity-90">
                        For all privacy-related inquiries, data requests, and concerns
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">General Support</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <EnvelopeIcon className="w-5 h-5 mr-3" />
                        <span>hello@adyatribe.com</span>
                      </div>
                      <p className="text-sm opacity-90">
                        For general questions about our platform and services
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm opacity-90">
                    <strong>Last Updated:</strong> January 2025 • <strong>Next Review:</strong> July 2025
                  </p>
                  <p className="text-sm opacity-90 mt-2">
                    We will notify you of any material changes to this privacy policy via email and platform notifications.
                  </p>
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