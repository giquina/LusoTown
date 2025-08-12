'use client'

import { motion } from 'framer-motion'
import { 
  DevicePhoneMobileIcon, 
  BellIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

const mobileFeatures = [
  {
    icon: BellIcon,
    title: "Instant Notifications",
    description: "Never miss event invites or new group messages"
  },
  {
    icon: MapPinIcon,
    title: "Location-Based Events",
    description: "Find nearby meetups and activities on the go"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Real-Time Chat",
    description: "Stay connected with your groups anywhere"
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Mobile-First Experience",
    description: "Optimized for seamless mobile community engagement"
  }
]

export default function AppDownloadSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-48 h-48 bg-secondary-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-25 blur-2xl"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full px-4 py-2 text-primary-600 font-medium">
              <SparklesIcon className="h-4 w-4" />
              Now Available on Mobile
            </div>

            {/* Heading */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Take Your{' '}
                <span className="gradient-text">Community</span>
                {' '}Everywhere
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Never miss out on London meetups, group chats, or new connections. 
                Get the AdyaTribe mobile app and stay connected to your tribe wherever life takes you.
              </p>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Join 1,000+ verified women 30+</h3>
                    <p className="text-gray-600">Your community is already growing across London and the UK. Download the app and find your tribe today.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mobileFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100/50 hover:bg-white/80 transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* App Store Button - Enhanced */}
              <a 
                href="#" 
                className="group inline-flex items-center bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl shadow-lg"
                aria-label="Download AdyaTribe on the App Store"
              >
                <div className="mr-5">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-90 font-medium">Download on the</div>
                  <div className="text-xl font-bold -mt-1 tracking-tight">App Store</div>
                </div>
              </a>

              {/* Google Play Button - Enhanced */}
              <a 
                href="#" 
                className="group inline-flex items-center bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl shadow-lg"
                aria-label="Get AdyaTribe on Google Play"
              >
                <div className="mr-5">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs opacity-90 font-medium">Get it on</div>
                  <div className="text-xl font-bold -mt-1 tracking-tight">Google Play</div>
                </div>
              </a>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-gray-500 text-sm">
                Free to download • Available on iOS 14+ and Android 8+
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>100% Safe & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  <span>London-First Community</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 blur-2xl transform scale-110"></div>
              
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl" style={{ width: '320px', height: '640px' }}>
                <div className="bg-white rounded-[2rem] overflow-hidden w-full h-full">
                  
                  {/* Status Bar */}
                  <div className="bg-white px-6 py-3 flex justify-between items-center text-xs font-medium text-gray-900">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-gray-300 rounded-sm">
                        <div className="w-3 h-1 bg-green-500 rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Interface Mockup */}
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 flex-1 flex flex-col">
                    
                    {/* Header */}
                    <div className="bg-white px-6 py-4 shadow-sm border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-900">AdyaTribe</h1>
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <BellIcon className="h-4 w-4 text-primary-600" />
                        </div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="p-6 space-y-4 flex-1">
                      
                      {/* Active Groups Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <UserGroupIcon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">London Book Club</h3>
                            <p className="text-xs text-gray-500">3 new messages</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600">&quot;Anyone read The Seven Moons of Maali Almeida?&quot;</p>
                        </div>
                      </div>

                      {/* Upcoming Events Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                            <CalendarIcon className="h-5 w-5 text-secondary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Weekend Walks</h3>
                            <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">Hyde Park, London</p>
                        </div>
                      </div>

                      {/* New Connections Card */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 text-sm mb-3">New in Your Area</h3>
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                              style={{
                                backgroundColor: `hsl(${(i * 80) % 360}, 65%, 70%)`,
                              }}
                            />
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                            +5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}