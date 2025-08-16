'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, HeartIcon, UserCircleIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/24/outline'
import { Crown, LogOut } from 'lucide-react'
// import { authService, User } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import LanguageToggle from '@/components/LanguageToggle'
import CartButton from '@/components/CartButton'
import SavedItemsButton from '@/components/SavedItemsButton'
import SearchBar from '@/components/SearchBar'
import { useLanguage } from '@/context/LanguageContext'

const getNavigationLinks = (t: any) => [
  { name: t('nav.events', 'Events'), href: '/events' },
  { name: t('nav.transport', 'Transport & Tours'), href: '/transport' },
  { name: t('nav.pricing', 'Pricing'), href: '/pricing' },
  { name: t('nav.case-studies', 'Case Studies'), href: '/case-studies' },
]

const getAuthenticatedNavigationLinks = (t: any) => [
  { name: t('nav.events', 'Events'), href: '/events' },
  { name: t('nav.transport', 'Transport & Tours'), href: '/transport' },
  { name: t('nav.my-network', 'My Network'), href: '/my-network' },
  { name: t('nav.pricing', 'Pricing'), href: '/pricing' },
  { name: t('nav.case-studies', 'Case Studies'), href: '/case-studies' },
  { name: t('nav.networks', 'Networks'), href: '/community' },
  { name: 'Dashboard', href: '/dashboard' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Auth temporarily disabled for demo
    // const currentUser = authService.getCurrentUser()
    // setUser(currentUser)
    // const unsubscribe = authService.onAuthStateChange((newUser) => {
    //   setUser(newUser)
    // })
    // return unsubscribe
  }, [])

  const handleLogout = async () => {
    // Auth temporarily disabled for demo
    setShowUserMenu(false)
    router.push('/')
  }

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <UserCircleIcon className="w-4 h-4" />, color: 'text-gray-600', label: 'Free' },
      core: { icon: <HeartIcon className="w-4 h-4" />, color: 'text-coral-600', label: 'Core' },
      premium: { icon: <Crown className="w-4 h-4" />, color: 'text-premium-600', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const navigationLinks = user ? getAuthenticatedNavigationLinks(t) : getNavigationLinks(t)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 min-h-[72px]">
      <nav className="container-width px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center gap-2 sm:gap-3">
              <Logo size="small" animated className="sm:hidden" />
              <Logo size="medium" animated className="hidden sm:block lg:hidden" />
              <Logo size="large" animated className="hidden lg:block" />
              <div className="hidden lg:flex items-center gap-2 ml-3">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white">
                  <span className="text-xs">🇬🇧</span>
                </div>
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white">
                  <span className="text-xs">🇵🇹</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 ml-4 xl:ml-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA / User Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <SearchBar variant="header" />
            <CartButton />
            <SavedItemsButton />
            <LanguageToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors h-10"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-action-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{user.name.split(' ')[0]}</div>
                    <div className="flex items-center gap-1">
                      {getMembershipBadge(user.membershipTier).icon}
                      <span className={`text-xs ${getMembershipBadge(user.membershipTier).color} whitespace-nowrap`}>
                        {getMembershipBadge(user.membershipTier).label}
                      </span>
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    >
                      <a
                        href={`/profile/${user.id}`}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="/favorites"
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span>My Favourites</span>
                      </a>
                      <a
                        href="/dashboard"
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        <span>Dashboard</span>
                      </a>
                      {user.role === 'admin' && (
                        <a
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-premium-700 hover:bg-premium-50 min-h-[44px]"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <ShieldCheckIcon className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </a>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-action-700 hover:bg-action-50 text-left min-h-[44px]"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-600 hover:text-primary-600 p-2 rounded-md transition-colors duration-200 h-10 w-10 flex items-center justify-center"
                  title="Login"
                >
                  <UserIcon className="w-5 h-5" />
                </a>
                <a href="/signup" className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-2 px-4 lg:px-6 rounded-lg shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap h-10 flex items-center text-sm">
                  <span className="hidden lg:inline">{t('nav.join-membership', 'BECOME A MEMBER')}</span>
                  <span className="lg:hidden">JOIN</span>
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button - Fixed spacing for better touch targets */}
          <div className="flex md:hidden items-center gap-2 relative z-50 flex-shrink-0 mr-1">
            <CartButton />
            <SavedItemsButton />
            <LanguageToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-lg text-primary-700 hover:text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 h-12 w-12 bg-white border-2 border-primary-200 shadow-lg active:bg-primary-50 active:scale-95 ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-primary-700 stroke-2" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-primary-700 stroke-2" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Mobile menu backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile menu content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden relative z-50 bg-white border-t border-primary-200 shadow-2xl rounded-b-lg mx-2 mb-2"
              >
                <div className="px-4 pt-6 pb-4 space-y-2">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="border-t border-primary-100 pt-4 pb-3">
                  
                  {user ? (
                    <>
                      <div className="flex items-center px-3 pb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-action-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                          <div className="flex items-center space-x-1">
                            {getMembershipBadge(user.membershipTier).icon}
                            <span className={`text-sm ${getMembershipBadge(user.membershipTier).color} whitespace-nowrap`}>
                              {getMembershipBadge(user.membershipTier).label} Member
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <a
                        href={`/profile/${user.id}`}
                        className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="/favorites"
                        className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <HeartIcon className="w-5 h-5" />
                        <span>My Favourites</span>
                      </a>
                      
                      <a
                        href="/dashboard"
                        className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserCircleIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                      </a>
                      
                      {user.role === 'admin' && (
                        <a
                          href="/admin"
                          className="flex items-center space-x-3 text-premium-600 hover:text-premium-700 hover:bg-premium-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <ShieldCheckIcon className="w-5 h-5" />
                          <span>Admin Panel</span>
                        </a>
                      )}
                      
                      <button
                        onClick={() => {
                          handleLogout()
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-center space-x-3 text-action-600 hover:text-action-700 hover:bg-action-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 w-full text-left border border-transparent hover:border-action-200 min-h-[44px]"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>Log In</span>
                      </a>
                      <div className="mt-4 px-0">
                        <a 
                          href="/signup"
                          className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 w-full text-center block min-h-[44px] flex items-center justify-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="text-base">BECOME A MEMBER</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}