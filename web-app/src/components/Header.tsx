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
import { useLanguage } from '@/context/LanguageContext'

const getNavigationLinks = (t: any) => [
  { name: t('nav.events'), href: '/events' },
  { name: t('nav.members'), href: '/members' },
  { name: t('nav.pricing'), href: '/pricing' },
  { name: t('nav.contact'), href: '/contact' },
]

const authenticatedNavigationLinks = [
  { name: 'Events', href: '/events' },
  { name: 'Members', href: '/members' },
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
      core: { icon: <HeartIcon className="w-4 h-4" />, color: 'text-[#FF6B6B]', label: 'Core' },
      premium: { icon: <Crown className="w-4 h-4" />, color: 'text-purple-600', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const navigationLinks = user ? authenticatedNavigationLinks : getNavigationLinks(t)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 min-h-[64px]">
      <nav className="container-width px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Logo size="medium" animated />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
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
          <div className="hidden md:flex items-center space-x-4">
            <CartButton />
            <SavedItemsButton />
            <LanguageToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{user.name.split(' ')[0]}</div>
                    <div className="flex items-center space-x-1">
                      {getMembershipBadge(user.membershipTier).icon}
                      <span className={`text-xs ${getMembershipBadge(user.membershipTier).color}`}>
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
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="/favorites"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span>My Favourites</span>
                      </a>
                      <a
                        href="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        <span>Dashboard</span>
                      </a>
                      {user.role === 'admin' && (
                        <a
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <ShieldCheckIcon className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </a>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 text-left"
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
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {t('nav.login')}
                </a>
                <a href="/signup" className="bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:from-green-700 hover:via-red-700 hover:to-yellow-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  BECOME MEMBER
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2 relative z-50">
            <CartButton />
            <SavedItemsButton />
            <LanguageToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-900 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-colors duration-200 min-h-[48px] min-w-[48px] bg-white border border-gray-300 shadow-md active:bg-gray-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6 text-gray-900 stroke-2" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6 text-gray-900 stroke-2" aria-hidden="true" />
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
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile menu content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden relative z-50 bg-white border-t border-gray-200 shadow-xl"
              >
                <div className="px-4 pt-4 pb-3 space-y-1">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="border-t border-gray-200 pt-4 pb-3">
                  
                  {user ? (
                    <>
                      <div className="flex items-center px-3 pb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-base font-medium text-gray-800">{user.name}</div>
                          <div className="flex items-center space-x-1">
                            {getMembershipBadge(user.membershipTier).icon}
                            <span className={`text-sm ${getMembershipBadge(user.membershipTier).color}`}>
                              {getMembershipBadge(user.membershipTier).label} Member
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <a
                        href={`/profile/${user.id}`}
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="/favorites"
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <HeartIcon className="w-5 h-5" />
                        <span>My Favourites</span>
                      </a>
                      
                      <a
                        href="/dashboard"
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserCircleIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                      </a>
                      
                      {user.role === 'admin' && (
                        <a
                          href="/admin"
                          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
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
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log In
                      </a>
                      <div className="mt-3 px-3">
                        <a 
                          href="/signup"
                          className="bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-700 hover:via-red-700 hover:to-yellow-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full text-center block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          BECOME MEMBER
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