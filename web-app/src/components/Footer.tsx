'use client'

import { HeartIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Logo from '@/components/Logo'

const getFooterLinks = (t: any) => ({
  community: [
    { name: 'Events & Culture', href: '/events' },
    { name: 'Community', href: '/community' },
    { name: 'Become a Host', href: '/host' },
    { name: 'Business Directory', href: '/directory' },
    { name: t('footer.housing-assistance'), href: '/housing-assistance' },
    { name: t('footer.neighborhood-groups'), href: '/neighborhood-groups' },
    { name: 'Mentorship Programs', href: '/mentorship' },
    { name: 'Community Guidelines', href: '/community-guidelines' },
  ],
  services: [
    { name: 'Premium Services', href: '/services' },
    { name: 'Executive Transport', href: '/services#executive-transport' },
    { name: 'Close Protection', href: '/services#close-protection' },
    { name: 'Transport & SIA', href: '/transport' },
    { name: 'Business Networking', href: '/business-networking' },
  ],
  support: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Safety & Verification', href: '/safety' },
  ],
  company: [
    { name: 'About LusoTown', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Community Chat', href: '/forums' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Careers', href: '/careers' },
    { name: 'Live TV', href: '/live' },
    { name: 'Partnerships', href: '/partnerships' },
    { name: 'Corporate Partnerships', href: '/corporate-partnerships' },
    { name: 'Institutional Partnerships', href: '/portuguese-institutional-partnerships' },
    { name: 'Instituto Camões Partnership', href: '/instituto-camoes' },
  ],
  legal: [
    { name: 'Community Guidelines', href: '/community-guidelines' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Community Safety', href: '/safety' },
  ],
})

export default function Footer() {
  const { t } = useLanguage()
  const footerLinks = getFooterLinks(t)

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content - Enhanced Multi-Column Responsive Layout */}
      <div className="container-width py-12 sm:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1 space-y-6">
            <Logo size="medium" className="text-white" />
            
            <p className="text-gray-300 leading-relaxed break-words">
              {t('footer.description')}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 min-w-0">
                <MapPinIcon className="h-5 w-5 text-action-400 flex-shrink-0" />
                <span className="break-words">Portuguese speakers in London & UK | Unidos pela Língua</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 min-w-0">
                <EnvelopeIcon className="h-5 w-5 text-secondary-400 flex-shrink-0" />
                <span className="break-all">connect@lusotown.co.uk</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-5 gap-6 lg:gap-8">
            {/* Community */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-primary-300">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base break-words leading-relaxed min-h-[44px] flex items-center"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-premium-300">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base break-words leading-relaxed min-h-[44px] flex items-center"
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
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base break-words leading-relaxed min-h-[44px] flex items-center"
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
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base break-words leading-relaxed min-h-[44px] flex items-center"
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
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline text-sm sm:text-base break-words leading-relaxed min-h-[44px] flex items-center"
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
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent min-w-0 min-h-[44px]"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap min-h-[44px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-width py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm break-words leading-relaxed">
              © {new Date().getFullYear()} LusoTown UK. All rights reserved. {t('footer.tagline')}
            </p>
            
            <div className="flex items-center gap-6">
              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 hidden sm:block">We Accept:</span>
                {/* Visa */}
                <div className="w-8 h-5 bg-primary-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="w-8 h-5 bg-red-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                {/* Apple Pay */}
                <div className="w-8 h-5 bg-black rounded-sm flex items-center justify-center">
                  <svg className="w-4 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.078 23.55c-.473-.316-.893-.703-1.244-1.15-.383-.463-.738-.95-1.064-1.454-.766-1.12-1.365-2.345-1.78-3.636-.5-1.502-.743-2.94-.743-4.347 0-1.57.34-2.94 1.002-4.09.49-.9 1.22-1.653 2.1-2.182.85-.5 1.695-.743 2.56-.743.615 0 1.295.108 2.030.324.48.142.922.279 1.327.408.336.108.542.142.618.108.073-.034.229-.108.468-.216.473-.216 1.044-.324 1.717-.324.915 0 1.717.216 2.402.65.315.2.607.45.877.75-.22.108-.42.243-.6.405-.473.42-.723 1.002-.723 1.744 0 .65.216 1.22.65 1.717.28.324.607.594.975.81-.108.324-.243.65-.405.975-.54 1.044-1.22 2.030-2.030 2.943-.65.743-1.22 1.22-1.717 1.435-.4.173-.743.216-1.044.216-.4 0-.81-.108-1.244-.324-.434-.216-.81-.324-1.127-.324-.324 0-.7.108-1.127.324-.434.216-.827.324-1.186.324-.216 0-.473-.043-.77-.13z"/>
                    <path d="M15.588 0c.108.757-.108 1.515-.65 2.272-.434.65-1.044 1.186-1.717 1.435-.108-.757.108-1.515.65-2.272.434-.65 1.044-1.186 1.717-1.435z"/>
                  </svg>
                </div>
                {/* Google Pay */}
                <div className="w-8 h-5 bg-gray-100 rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">G</span>
                </div>
                {/* PayPal */}
                <div className="w-8 h-5 bg-primary-700 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PP</span>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/LusoTownUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a
                  href="https://www.instagram.com/lusotownuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-secondary-500 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987S24.014 18.607 24.014 11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.418-3.323c.875-.875 2.026-1.297 3.323-1.297s2.448.422 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297zm0-7.618c-.928 0-1.756.354-2.379.977-.623.623-.977 1.451-.977 2.379 0 .928.354 1.756.977 2.379.623.623 1.451.977 2.379.977.928 0 1.756-.354 2.379-.977.623-.623.977-1.451.977-2.379 0-.928-.354-1.756-.977-2.379-.623-.623-1.451-.977-2.379-.977zm7.618 7.618c-1.297 0-2.448-.49-3.323-1.297-.928-.827-1.418-1.978-1.418-3.275s.49-2.448 1.418-3.323c.875-.875 2.026-1.297 3.323-1.297s2.448.422 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.275c-.875.807-2.026 1.297-3.323 1.297zm0-7.618c-.928 0-1.756.354-2.379.977-.623.623-.977 1.451-.977 2.379 0 .928.354 1.756.977 2.379.623.623 1.451.977 2.379.977.928 0 1.756-.354 2.379-.977.623-.623.977-1.451.977-2.379 0-.928-.354-1.756-.977-2.379-.623-.623-1.451-.977-2.379-.977z"/>
                  </svg>
                </a>

                <a
                  href="https://twitter.com/LusoTownUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/company/lusotown-uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@LusoTownUK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-action-500 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <a
                  href="https://wa.me/447123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-secondary-500 transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Contact us on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HeartIcon className="h-4 w-4 text-action-400" />
                <span>{t('footer.bottom')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}