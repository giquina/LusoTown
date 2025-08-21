'use client'

import { motion } from 'framer-motion'
import { ROUTES } from '@/config'
import { 
  CheckCircleIcon, 
  DevicePhoneMobileIcon, 
  CameraIcon, 
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const nextSteps = [
  {
    step: 1,
    icon: DevicePhoneMobileIcon,
    title: "Download LusoTown App",
    description: "Get our mobile app from the App Store or Google Play",
    timeframe: "Within 24 hours"
  },
  {
    step: 2,
    icon: CameraIcon,
    title: "Complete Verification",
    description: "Take a selfie for our advanced safety verification",
    timeframe: "2-3 minutes"
  },
  {
    step: 3,
    icon: UserGroupIcon,
    title: "Join Your Groups",
    description: "Connect with women in your area and interests",
    timeframe: "Instantly"
  }
]

export default function SignupSuccess() {
  return (
    <main className="min-h-screen">
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen flex items-center">
          <div className="container-width w-full">
            <div className="max-w-4xl mx-auto text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <CheckCircleIcon className="h-12 w-12 text-white" />
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-12"
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Welcome to the <span className="gradient-text">Waitlist!</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Your invitation request has been received. We're excited to welcome you to our community of amazing women!
                </p>
                
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/70">
                  <ClockIcon className="h-5 w-5 text-primary-400" />
                  <span className="font-medium text-gray-700">You'll hear from us within 24-48 hours</span>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  What Happens Next?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {nextSteps.map((step, index) => {
                    const IconComponent = step.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="w-8 h-8 bg-primary-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        <div className="inline-flex items-center gap-1 bg-primary-50 rounded-full px-3 py-1 text-sm text-primary-600 font-medium">
                          <ClockIcon className="h-4 w-4" />
                          {step.timeframe}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Safety Reminder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/70"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-secondary-400" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Safety is Our Priority
                  </h3>
                </div>
                <p className="text-gray-600">
                  Every member goes through our verification process to ensure a safe, authentic community. 
                  This creates the trusted environment where genuine friendships flourish.
                </p>
              </motion.div>

              {/* Footer Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <a 
                  href={ROUTES.home}
                  className="btn-outline text-base px-8 py-3"
                >
                  Return to Homepage
                </a>
                <a 
                  href="/how-it-works"
                  className="btn-primary text-base px-8 py-3"
                >
                  Learn More About LusoTown
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

