'use client'

import { HeartIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Logo from '@/components/Logo'

const getFooterLinks = (t: any) => ({
  community: [
    { name: 'Events & Culture', href: '/events' },
    { name: 'Community Groups', href: '/community' },
    { name: 'Business Directory', href: '/directory' },
    { name: 'Community Guidelines', href: '/community-guidelines' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Safety & Verification', href: '/safety' },
    { name: 'How It Works', href: '/how-it-works' },
  ],
  company: [
    { name: 'About LusoTown', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Community Chat', href: '/forums' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Community Safety', href: '/safety' },
    { name: 'Platform Guidelines', href: '/community-guidelines' },
  ],
})

export default function Footer() {
  const { t } = useLanguage()
  const footerLinks = getFooterLinks(t)

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-width px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1 space-y-6">
            <Logo size="medium" className="text-white" />
            
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPinIcon className="h-5 w-5 text-red-400" />
                <span>UK Portuguese Community Platform</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <EnvelopeIcon className="h-5 w-5 text-green-400" />
                <span>connect@lusotown.co.uk</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            {/* Community */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-primary-300">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-secondary-300">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-primary-300">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-secondary-300">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.newsletter.title')}</h3>
            <p className="text-gray-300 mb-6">
              {t('footer.newsletter.description')}
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-width px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} LusoTown UK. All rights reserved. {t('footer.tagline')}
            </p>
            
            <div className="flex items-center gap-6">
              {/* Social links would go here */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HeartIcon className="h-4 w-4 text-red-400" />
                <span>{t('footer.bottom')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}