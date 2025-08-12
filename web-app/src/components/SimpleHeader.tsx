import { HeartIcon, Bars3Icon } from '@heroicons/react/24/outline'

export default function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 min-h-[64px]">
      <nav className="container-width px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">AdyaTribe</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/events" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Events
            </a>
            <a href="/how-it-works" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              How It Works
            </a>
            <a href="/community" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Community
            </a>
            <a href="/pricing" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Pricing
            </a>
            <a href="/about" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Log In
            </a>
            <a href="/signup" className="bg-gradient-to-r from-primary-400 to-secondary-400 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
              Join Free
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-900 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors duration-200 min-h-[44px] min-w-[44px] bg-white border border-gray-300 shadow-md"
              aria-label="Open menu"
            >
              <Bars3Icon className="block h-6 w-6 text-gray-900 stroke-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}