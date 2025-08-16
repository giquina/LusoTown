import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  DocumentTextIcon, 
  HandRaisedIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  HeartIcon,
  LockClosedIcon,
  ScaleIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Terms of Service | LusoTown London - Portuguese Community Guidelines',
  description: 'Review LusoTown London\'s terms of service, community guidelines, and membership requirements for our Portuguese community platform.',
  keywords: [
    'terms of service',
    'community guidelines',
    'platform rules',
    'membership terms',
    'Portuguese community rules',
    'UK terms',
    'community standards',
    'platform policy',
    'user agreement',
    'Portuguese diaspora community',
    'LusoTown London'
  ],
  openGraph: {
    title: 'Terms of Service | LusoTown London',
    description: 'Review LusoTown London\'s terms of service, community guidelines, and membership requirements.',
    type: 'website',
    url: '/terms',
  },
  alternates: {
    canonical: '/terms'
  }
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Effective Date: January 2025
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Welcome to LusoTown! These terms govern your use of our platform and establish the foundation for our safe, supportive community of 30+ single and childfree women.
              </p>
            </div>
          </div>
        </section>

        {/* Agreement Summary */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HandRaisedIcon className="w-6 h-6 text-secondary-600 mr-3" />
                  Your Agreement with LusoTown
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    By using LusoTown, you're agreeing to these terms and joining our community committed to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-secondary-200">
                      <div className="flex items-center mb-2">
                        <HeartIcon className="w-5 h-5 text-secondary-600 mr-2" />
                        <span className="font-semibold text-gray-900">Authentic Connection</span>
                      </div>
                      <p className="text-sm text-gray-600">Building genuine friendships based on shared values and life choices</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-secondary-200">
                      <div className="flex items-center mb-2">
                        <ShieldCheckIcon className="w-5 h-5 text-secondary-600 mr-2" />
                        <span className="font-semibold text-gray-900">Community Safety</span>
                      </div>
                      <p className="text-sm text-gray-600">Maintaining a secure, verified, and supportive environment</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-secondary-200">
                      <div className="flex items-center mb-2">
                        <UserGroupIcon className="w-5 h-5 text-secondary-600 mr-2" />
                        <span className="font-semibold text-gray-900">Respectful Interaction</span>
                      </div>
                      <p className="text-sm text-gray-600">Treating all members with kindness, respect, and understanding</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-secondary-200">
                      <div className="flex items-center mb-2">
                        <ScaleIcon className="w-5 h-5 text-secondary-600 mr-2" />
                        <span className="font-semibold text-gray-900">Fair Usage</span>
                      </div>
                      <p className="text-sm text-gray-600">Using the platform responsibly and in accordance with our community guidelines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto space-y-12">

              {/* Eligibility and Account Creation */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <UserGroupIcon className="w-6 h-6 text-primary-600 mr-3" />
                  1. Eligibility and Account Creation
                </h2>
                <div className="space-y-6">
                  
                  <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-700 mb-3">Membership Requirements</h3>
                    <p className="text-gray-600 mb-3">To join LusoTown, you must:</p>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Be at least 30 years old
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Identify as a woman
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Be single and/or childfree (by choice)
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Reside in the UK
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Provide accurate information during registration
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Complete our verification process, including selfie verification
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Responsibilities</h3>
                    <div className="space-y-3 text-gray-600">
                      <p>
                        You are responsible for maintaining the confidentiality of your account credentials and for all 
                        activities that occur under your account. You agree to:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li>• Use a strong, unique password</li>
                        <li>• Notify us immediately of any unauthorized account access</li>
                        <li>• Keep your profile information accurate and up-to-date</li>
                        <li>• Not share your account with others</li>
                        <li>• Not create multiple accounts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Guidelines and Behavior */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HeartIcon className="w-6 h-6 text-primary-600 mr-3" />
                  2. Community Guidelines and Expected Behavior
                </h2>
                <div className="space-y-6">
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">✅ We Encourage</h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• Authentic, respectful communication</li>
                      <li>• Supportive interactions and mutual encouragement</li>
                      <li>• Celebrating each other's choices and achievements</li>
                      <li>• Constructive discussions about shared interests</li>
                      <li>• Organizing and participating in community events</li>
                      <li>• Reporting concerning behavior to maintain safety</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">❌ Prohibited Behavior</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-red-700 mb-2">Safety Violations</h4>
                        <ul className="text-red-600 text-sm space-y-1">
                          <li>• Harassment, bullying, or threatening behavior</li>
                          <li>• Sharing others' personal information without consent</li>
                          <li>• Impersonating another person or entity</li>
                          <li>• Creating fake or misleading profiles</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-700 mb-2">Community Disruption</h4>
                        <ul className="text-red-600 text-sm space-y-1">
                          <li>• Hate speech, discrimination, or prejudicial comments</li>
                          <li>• Spam, promotional content, or commercial activities</li>
                          <li>• Inappropriate sexual content or advances</li>
                          <li>• Disrespecting others' life choices or circumstances</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-800 mb-3">Content Standards</h3>
                    <p className="text-primary-700 mb-3">All content you share on LusoTown must:</p>
                    <ul className="text-primary-600 space-y-2">
                      <li>• Be appropriate for a professional women's community</li>
                      <li>• Respect intellectual property rights</li>
                      <li>• Comply with UK laws and regulations</li>
                      <li>• Not contain offensive, explicit, or harmful material</li>
                      <li>• Be relevant to our community's interests and values</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Platform Usage and Features */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LockClosedIcon className="w-6 h-6 text-primary-600 mr-3" />
                  3. Platform Usage and Features
                </h2>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Membership Tiers</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Free Membership</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Basic profile creation</li>
                          <li>• Limited community access</li>
                          <li>• View public events</li>
                          <li>• Basic messaging features</li>
                        </ul>
                      </div>
                      <div className="bg-primary-50 rounded-lg p-4">
                        <h4 className="font-semibold text-primary-700 mb-2">Core Membership</h4>
                        <ul className="text-primary-600 text-sm space-y-1">
                          <li>• Full community access</li>
                          <li>• Unlimited messaging</li>
                          <li>• Event creation and hosting</li>
                          <li>• Advanced matching features</li>
                        </ul>
                      </div>
                      <div className="bg-secondary-50 rounded-lg p-4">
                        <h4 className="font-semibold text-secondary-700 mb-2">Premium Membership</h4>
                        <ul className="text-secondary-600 text-sm space-y-1">
                          <li>• All Core features</li>
                          <li>• Exclusive events and workshops</li>
                          <li>• Priority customer support</li>
                          <li>• Advanced privacy controls</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Rules</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p><strong>No commercial use:</strong> LusoTown is for personal networking and friendship only</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p><strong>Data scraping prohibited:</strong> Automated data collection or scraping is not allowed</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p><strong>Platform integrity:</strong> Do not attempt to hack, exploit, or reverse engineer our system</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p><strong>Respect boundaries:</strong> Honor other members' privacy settings and communication preferences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment and Subscription Terms */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Payment and Subscription Terms</h2>
                <div className="space-y-6">
                  
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Subscription Details</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Subscription fees are charged monthly or annually in advance</li>
                      <li>• All prices include applicable UK VAT</li>
                      <li>• Automatic renewal unless cancelled before the next billing cycle</li>
                      <li>• Price changes will be communicated 30 days in advance</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Refund Policy</h3>
                    <div className="space-y-3 text-gray-600">
                      <p>We offer refunds under the following circumstances:</p>
                      <ul className="space-y-2 ml-4">
                        <li>• Within 14 days of first subscription (Consumer Rights Act 2015)</li>
                        <li>• Technical issues preventing platform use for more than 7 days</li>
                        <li>• Account suspension due to our error</li>
                        <li>• Subscription cancellation due to verified safety concerns</li>
                      </ul>
                      <p className="text-sm text-gray-500 mt-4">
                        Refunds are processed within 5-10 business days to the original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety and Moderation */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 text-primary-600 mr-3" />
                  5. Safety, Moderation, and Enforcement
                </h2>
                <div className="space-y-6">
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">Our Safety Commitment</h3>
                    <p className="text-orange-700 mb-3">
                      LusoTown is committed to maintaining a safe environment. We employ:
                    </p>
                    <ul className="text-orange-600 space-y-2">
                      <li>• Mandatory identity verification for all members</li>
                      <li>• Automated content filtering and moderation</li>
                      <li>• Human review team for reported content</li>
                      <li>• Regular safety audits and improvements</li>
                      <li>• Collaboration with relevant authorities when necessary</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Enforcement Actions</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="font-semibold text-gray-900">Warning</h4>
                        <p className="text-gray-600 text-sm">
                          First offense or minor violations result in a formal warning and guidance on community standards.
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-400 pl-4">
                        <h4 className="font-semibold text-gray-900">Temporary Suspension</h4>
                        <p className="text-gray-600 text-sm">
                          Repeated violations or more serious offenses result in 7-30 day account suspension.
                        </p>
                      </div>
                      <div className="border-l-4 border-red-400 pl-4">
                        <h4 className="font-semibold text-gray-900">Permanent Ban</h4>
                        <p className="text-gray-600 text-sm">
                          Serious safety violations, harassment, or repeated offenses result in permanent account termination.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">Zero Tolerance Policy</h3>
                    <p className="text-red-700 mb-3">
                      The following behaviors result in immediate permanent suspension:
                    </p>
                    <ul className="text-red-600 space-y-1">
                      <li>• Threats of violence or self-harm</li>
                      <li>• Sharing explicit sexual content</li>
                      <li>• Doxxing or sharing personal information without consent</li>
                      <li>• Promoting illegal activities</li>
                      <li>• Creating fake accounts or catfishing</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Privacy and Data Protection */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Privacy and Data Protection</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your privacy is paramount to us. Our data practices are governed by our comprehensive 
                    <a href="/privacy" className="text-primary-600 hover:underline font-medium ml-1">Privacy Policy</a>, 
                    which details how we collect, use, and protect your personal information.
                  </p>
                  
                  <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary-800 mb-3">Key Privacy Principles</h3>
                    <ul className="text-primary-700 space-y-2">
                      <li>• We never sell your personal data to third parties</li>
                      <li>• You control your profile visibility and contact preferences</li>
                      <li>• All data is stored securely within the UK/EU</li>
                      <li>• You can request data deletion at any time</li>
                      <li>• We comply with UK GDPR and Data Protection Act 2018</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Intellectual Property</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">LusoTown's Property</h3>
                    <p className="text-gray-600 mb-3">
                      The LusoTown platform, including its design, features, algorithms, and content, is protected by 
                      copyright, trademark, and other intellectual property laws. You may not:
                    </p>
                    <ul className="text-gray-600 space-y-2 ml-4">
                      <li>• Copy, modify, or distribute our proprietary code or design</li>
                      <li>• Use our trademarks or branding without permission</li>
                      <li>• Create derivative works based on our platform</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
                    <p className="text-gray-600 mb-3">
                      You retain ownership of content you share on LusoTown, but grant us a license to:
                    </p>
                    <ul className="text-gray-600 space-y-2 ml-4">
                      <li>• Display your content within the platform</li>
                      <li>• Process your content for platform functionality</li>
                      <li>• Use anonymized content for platform improvement</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-3">
                      This license ends when you delete your content or close your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-primary-600 mr-3" />
                  8. Limitation of Liability and Disclaimers
                </h2>
                <div className="space-y-6">
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Platform Availability</h3>
                    <p className="text-yellow-700">
                      While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. LusoTown 
                      is provided "as is" and we are not liable for temporary service interruptions, scheduled 
                      maintenance, or technical difficulties.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Member Interactions</h3>
                    <p className="text-gray-600 mb-3">
                      LusoTown facilitates connections between members but is not responsible for:
                    </p>
                    <ul className="text-gray-600 space-y-2 ml-4">
                      <li>• The accuracy of information provided by other members</li>
                      <li>• Actions or behavior of other members outside the platform</li>
                      <li>• Disputes between members</li>
                      <li>• Outcomes of events organized through the platform</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">Liability Limitations</h3>
                    <p className="text-red-700 text-sm">
                      To the fullest extent permitted by UK law, LusoTown's liability is limited to the amount 
                      paid for your subscription in the 12 months prior to any claim. We are not liable for 
                      indirect, incidental, or consequential damages arising from platform use.
                    </p>
                  </div>
                </div>
              </div>

              {/* Termination */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Account Termination</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Termination by You</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Cancel subscription anytime in account settings</li>
                      <li>• Access continues until end of current billing cycle</li>
                      <li>• Delete account and data permanently if desired</li>
                      <li>• Export your data before account deletion</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Termination by LusoTown</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• For violation of these terms</li>
                      <li>• For safety or legal concerns</li>
                      <li>• For fraudulent or suspicious activity</li>
                      <li>• With 30 days notice for operational reasons</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Changes to These Terms</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We may update these Terms of Service to reflect changes in our services, legal requirements, 
                    or community needs. When we make changes:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• We'll notify you via email and platform notification</li>
                    <li>• Changes take effect 30 days after notification</li>
                    <li>• Continued use constitutes acceptance of new terms</li>
                    <li>• You may terminate your account if you disagree with changes</li>
                  </ul>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Governing Law and Dispute Resolution</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    These terms are governed by the laws of England and Wales. Any disputes will be resolved through:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <h3 className="font-semibold text-primary-800 mb-2">First Step: Direct Resolution</h3>
                      <p className="text-primary-700 text-sm">
                        Contact our support team at hello@lusotown.com to resolve issues directly
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Formal Disputes</h3>
                      <p className="text-green-700 text-sm">
                        Unresolved disputes subject to exclusive jurisdiction of English courts
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">12. Contact Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Questions About These Terms?</h3>
                    <div className="space-y-2">
                      <p>Email: legal@lusotown.com</p>
                      <p>Response Time: Within 48 hours</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">General Support</h3>
                    <div className="space-y-2">
                      <p>Email: hello@lusotown.com</p>
                      <p>Hours: Monday-Friday, 9am-6pm GMT</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm opacity-90">
                    <strong>Last Updated:</strong> January 2025 • <strong>Version:</strong> 1.2
                  </p>
                  <p className="text-sm opacity-90 mt-2">
                    Thank you for being part of the LusoTown community. Together, we're building something special.
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