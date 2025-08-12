'use client'

import { HeartIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const footerLinks = {
  community: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Community Guidelines', href: '/community-guidelines' },
    { name: 'Safety Center', href: '/safety' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Report Issue', href: '/contact' },
    { name: 'Feedback', href: '/contact' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Data Protection', href: '/data-protection' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-width px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AdyaTribe</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Where amazing women connect, grow, and build lasting friendships. Join our community of 30+ single & childfree women creating meaningful bonds across London and the UK.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span>London & UK Community</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span>hello@adyatribe.com</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Community */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary-300">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-secondary-300">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-primary-300">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-secondary-300">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
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
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Connected</h3>
            <p className="text-gray-300 mb-6">
              Get updates on new features, community events, and inspiring stories from our members.
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
              © {new Date().getFullYear()} AdyaTribe. All rights reserved. Built with ❤️ for amazing women everywhere.
            </p>
            
            <div className="flex items-center gap-6">
              {/* Social links would go here */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HeartIcon className="h-4 w-4 text-primary-400" />
                <span>Made by women, for women</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}