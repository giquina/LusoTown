'use client'

import { motion } from 'framer-motion'

export default function AboutLusoTown() {
  const features = [
    {
      emoji: '🎉',
      title: 'Discover & Join Events',
      description: 'Find cultural festivals, food markets, live music, networking meetups, and more.'
    },
    {
      emoji: '📱',
      title: 'Stay Updated on LusoTown Feed',
      description: 'See the latest events, posts, and community updates in real time.'
    },
    {
      emoji: '📝',
      title: 'Post & Share with the Community',
      description: 'Add your own updates, photos, and tips, and tag events or businesses.'
    },
    {
      emoji: '❤️',
      title: 'Save Your Favourites',
      description: 'Bookmark events, businesses, and posts you love so you never miss out.'
    },
    {
      emoji: '🏪',
      title: 'Support Portuguese Businesses',
      description: 'Explore our directory and discover places run by or for Portuguese speakers.'
    },
    {
      emoji: '👥',
      title: 'Connect with People Like You',
      description: 'Meet new friends, share experiences, and keep your language and traditions alive in London.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              About LusoTown
            </h2>
            <p className="text-lg text-gray-600">
              LusoTown is your online community for Portuguese speakers and friends in London. Whether you're new to the city, have family roots in a Portuguese-speaking country, or simply love our culture and language, this is your space to connect, share, and celebrate.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">When you join, you can:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm">
                    {feature.emoji}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                LusoTown is completely free to join and built for people from: Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and Príncipe, East Timor, Macau, and Equatorial Guinea — and for anyone who feels part of our Portuguese-speaking world.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}