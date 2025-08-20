import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";
import Footer from "@/components/Footer";
import { plans, formatPrice } from "@/config/pricing";
import { contactInfo } from "@/config/contact";
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CogIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  BookOpenIcon,
  LightBulbIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Help Center | LusoTown London - Support, FAQs & User Guides",
  description:
    "Get help with LusoTown London! Find answers to common questions, contact support, and learn how to make the most of our Portuguese community platform.",
  keywords: [
    "help center",
    "support",
    "FAQ",
    "user guide",
    "LusoTown help",
    "community support",
    "platform help",
    "user support",
    "how to use",
    "Portuguese community help",
  ],
  openGraph: {
    title: "Help Center | LusoTown",
    description:
      "Get help with LusoTown! Find answers to common questions, contact support, and user guides.",
    type: "website",
    url: "/help",
  },
  alternates: {
    canonical: "/help",
  },
};

export default function HelpCenter() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: UserGroupIcon,
      color: "primary",
      faqs: [
        {
          question: "How do I join LusoTown London?",
          answer:
            "Simply sign up on our website or download our app. Create your profile, share your Portuguese heritage connection, and start connecting with our vibrant community. All ages and families welcome!",
        },
        {
          question: "What is the verification process?",
          answer:
            "Our verification includes basic profile review and community guidelines confirmation. This helps ensure a safe, welcoming environment for Portuguese speakers and their families of all ages.",
        },
        {
          question: "Do I need to pay to use LusoTown London?",
          answer: `We offer a free membership with basic features. Core membership (${formatPrice(
            plans.community.monthly
          )}/month) unlocks full community access, unlimited messaging, and event creation. Premium membership (${formatPrice(
            plans.ambassador.monthly
          )}/month) adds exclusive events and priority support.`,
        },
        {
          question: "What areas does LusoTown cover?",
          answer:
            "We currently serve women across the UK, with the largest communities in the U.K., Manchester, Birmingham, Edinburgh, and Bristol. We're expanding to more cities based on member demand.",
        },
      ],
    },
    {
      title: "Safety & Privacy",
      icon: ShieldCheckIcon,
      color: "secondary",
      faqs: [
        {
          question: "How do you verify member identity?",
          answer:
            "We use selfie verification technology combined with profile review. Members must provide a recent photo that matches their live selfie, and our team reviews profiles for authenticity.",
        },
        {
          question: "What information is shared with other members?",
          answer:
            "Only information you choose to share is visible to other members. You control your profile visibility, contact preferences, and what personal details you include. Your email and private information are never shared.",
        },
        {
          question: "How do I report concerning behavior?",
          answer: `Use the report button on any profile or message, or email ${contactInfo.safety}. We investigate all reports within 24 hours and take appropriate action to maintain community safety.`,
        },
        {
          question: "Can I block or remove someone?",
          answer:
            "Yes, you can block any member from contacting you or seeing your profile. You can also remove connections at any time. Blocked users cannot rejoin groups you're in or attend events you organize.",
        },
      ],
    },
    {
      title: "Using the Platform",
      icon: CogIcon,
      color: "purple",
      faqs: [
        {
          question: "How do I find women with similar interests?",
          answer:
            "Use our interest matching feature - select from 48+ interests across categories like fitness, travel, career, and hobbies. We'll suggest connections based on shared interests and location.",
        },
        {
          question: "How do I join or create events?",
          answer:
            "Browse events in your area on the Events tab, or create your own with Core+ membership. Events range from coffee meetups to weekend trips, professional networking to hobby groups.",
        },
        {
          question: "What types of groups can I join?",
          answer:
            "We have interest-based groups (hiking, book clubs, career networking), location-based groups (London 30s, Manchester professionals), and activity groups (fitness, travel, food). All groups are moderated for safety.",
        },
        {
          question: "How does messaging work?",
          answer:
            "Free members can send 10 messages per month. Core members have unlimited messaging in groups and with connections. Premium members get priority message delivery and advanced messaging features.",
        },
      ],
    },
    {
      title: "Account Management",
      icon: UserGroupIcon,
      color: "green",
      faqs: [
        {
          question: "How do I update my profile?",
          answer:
            "Go to your profile settings to update photos, interests, location, and bio. Changes to your profile photo require re-verification for safety. Other changes are instant.",
        },
        {
          question: "Can I change my membership level?",
          answer:
            "Yes, you can upgrade or downgrade anytime in account settings. Upgrades are immediate, downgrades take effect at the next billing cycle. Pro-rated refunds available for annual subscriptions.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Account deletion is permanent and removes all your data within 30 days. Go to Settings > Account > Delete Account. You can also request data export before deletion.",
        },
        {
          question: "What happens if I cancel my subscription?",
          answer:
            "You keep your current membership benefits until the end of your billing cycle, then your account reverts to free membership. Your profile and connections remain active.",
        },
      ],
    },
  ];

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get personalized help from our support team",
      contact: contactInfo.general,
      icon: EnvelopeIcon,
      color: "primary",
      response: "Usually within 4-6 hours",
      hours: "Monday-Friday, 9am-6pm GMT",
    },
    {
      title: "Safety Concerns",
      description: "Report safety issues or concerning behavior",
      contact: contactInfo.safety,
      icon: ShieldCheckIcon,
      color: "red",
      response: "Within 2-4 hours",
      hours: "Monitored 24/7",
    },
    {
      title: "Technical Issues",
      description: "App bugs, login problems, or technical difficulties",
      contact: "tech@lusotown.com",
      icon: CogIcon,
      color: "blue",
      response: "Within 6-12 hours",
      hours: "Monday-Friday, 9am-6pm GMT",
    },
  ];

  const quickTips = [
    {
      title: "Complete Your Profile",
      description: "Members with complete profiles get 3x more connections",
      icon: UserGroupIcon,
    },
    {
      title: "Join Local Groups",
      description: "Active group members make friends 40% faster",
      icon: UserGroupIcon,
    },
    {
      title: "Attend Events",
      description: "In-person meetups lead to stronger friendships",
      icon: UserGroupIcon,
    },
    {
      title: "Be Authentic",
      description: "Genuine profiles attract more meaningful connections",
      icon: HandRaisedIcon,
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <QuestionMarkCircleIcon className="w-4 h-4 mr-2" />
                We're here to help
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Help Center
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Find answers to common questions, get support, and make the most
                of your LusoTown experience. Our community is here to support
                your journey to meaningful friendships.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-white">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search help..."
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2">
                  Search
                </button>
              </div>
              <p className="text-center text-gray-500 mt-4">
                Popular searches: verification, pricing, events, safety, profile
                setup
              </p>
            </div>
          </div>
        </section>

        {/* Quick Support Options */}
        <section className="py-16 bg-gray-50">
          <div className="container-width">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Get Help Fast
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {supportChannels.map((channel) => (
                  <div
                    key={channel.contact}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 bg-${channel.color}-100 text-${channel.color}-600 rounded-xl flex items-center justify-center mb-4`}
                    >
                      <channel.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {channel.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{channel.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        <a
                          href={`mailto:${channel.contact}`}
                          className={`text-${channel.color}-600 hover:underline font-medium`}
                        >
                          {channel.contact}
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        <span>Response: {channel.response}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <span>{channel.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <LightBulbIcon className="w-6 h-6 text-primary-600 mr-3" />
                  Pro Tips for Success
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickTips.map((tip) => (
                    <div key={tip.title} className="bg-white rounded-lg p-4">
                      <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-3">
                        <tip.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {tip.title}
                      </h4>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Find answers to the most common questions about LusoTown
              </p>

              <div className="space-y-12">
                {faqCategories.map((category) => (
                  <div
                    key={category.title}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <div
                      className={`bg-${category.color}-50 px-6 py-4 border-b border-${category.color}-100`}
                    >
                      <h3
                        className={`text-xl font-bold text-${category.color}-700 flex items-center`}
                      >
                        <category.icon className="w-6 h-6 mr-3" />
                        {category.title}
                      </h3>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {category.faqs.map((faq) => (
                        <div key={faq.question} className="px-6 py-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                            <QuestionMarkCircleIcon
                              className={`w-5 h-5 text-${category.color}-500 mr-2 mt-0.5 flex-shrink-0`}
                            />
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 leading-relaxed ml-7">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency and Safety Information */}
        <section className="py-16 bg-red-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-red-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                  <ExclamationTriangleIcon className="w-6 h-6 mr-3" />
                  Safety & Emergency Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      If You Feel Unsafe
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <p>
                        • <strong>Immediate danger:</strong> Call 999 (UK
                        emergency services)
                      </p>
                      <p>
                        • <strong>Platform safety:</strong> Email
                        {contactInfo.safety}
                      </p>
                      <p>
                        • <strong>Block and report:</strong> Use in-app
                        reporting tools
                      </p>
                      <p>
                        • <strong>Document evidence:</strong> Screenshot
                        concerning behavior
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Meeting Safely
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <p>• Always meet in public places first</p>
                      <p>• Tell someone where you're going</p>
                      <p>• Trust your instincts - leave if uncomfortable</p>
                      <p>
                        • Use LusoTown's group events for safer first meetings
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-medium">
                    <strong>Remember:</strong> Your safety is our top priority.
                    We have a zero-tolerance policy for harassment, threats, or
                    any behavior that makes members feel unsafe. Report
                    concerning behavior immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-gray-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Additional Resources
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <BookOpenIcon className="w-8 h-8 text-primary-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Community Guidelines
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn about our community standards and how we maintain a
                    safe, supportive environment.
                  </p>
                  <a
                    href={ROUTES.community}
                    className="text-primary-600 hover:underline font-medium"
                  >
                    Read Guidelines →
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <ShieldCheckIcon className="w-8 h-8 text-secondary-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Safety Center
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive safety resources, tips, and tools to help you
                    stay safe while making connections.
                  </p>
                  <a
                    href={ROUTES.safety}
                    className="text-secondary-600 hover:underline font-medium"
                  >
                    Visit Safety Center →
                  </a>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Success Stories
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Read inspiring stories from women who've found their tribe
                    through LusoTown.
                  </p>
                  <a
                    href={ROUTES.successStories}
                    className="text-purple-600 hover:underline font-medium"
                  >
                    Read Stories →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
              <p className="text-xl mb-8 opacity-90">
                Our friendly support team is here to help you make the most of
                your LusoTown experience. Don't hesitate to reach out with any
                questions or concerns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${contactInfo.general}`}
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Email Support
                </a>
                <a
                  href={ROUTES.contact}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Contact Form
                </a>
              </div>

              <p className="text-sm opacity-75 mt-6">
                Average response time: 4-6 hours during business hours (Mon-Fri,
                9am-6pm GMT)
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
