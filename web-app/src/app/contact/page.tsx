import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We'd love to hear from you! Whether you have questions, feedback, or need support, we're here to help.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                    <form className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                        >
                          <option value="">Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="feedback">Feedback</option>
                          <option value="partnership">Partnership</option>
                          <option value="safety">Safety Concern</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                          placeholder="Tell us how we can help you..."
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn-primary w-full"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold mb-6">Other ways to reach us</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">✉️</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email Support</h3>
                          <p className="text-gray-600">hello@lusotown.com</p>
                          <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-secondary-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">🏢</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Office</h3>
                          <p className="text-gray-600">London, United Kingdom</p>
                          <p className="text-sm text-gray-500">Proudly serving women across the UK</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">⏰</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Support Hours</h3>
                          <p className="text-gray-600">Monday - Friday: 9am - 6pm GMT</p>
                          <p className="text-sm text-gray-500">Weekend emergency support available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl p-8 text-white">
                    <h3 className="text-xl font-semibold mb-4">Need immediate help?</h3>
                    <p className="mb-4">
                      For urgent safety concerns or technical issues affecting your account, please reach out immediately.
                    </p>
                    <a
                      href="mailto:urgent@lusotown.com"
                      className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-block"
                    >
                      urgent@lusotown.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}