'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BriefcaseIcon, 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  CurrencyPoundIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChevronDownIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'

// Mock job data for Portuguese speakers
const mockJobs = [
  {
    id: 1,
    title: 'Lusophone-English Business Analyst',
    company: 'FinTech Solutions Ltd',
    location: 'Canary Wharf, London',
    salary: '£45,000 - £60,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Leading fintech company seeking bilingual Business Analyst to work with Lusophone markets. Native Portuguese speaker required.',
    requirements: ['Fluent Lusophone and English', 'Business analysis experience', 'Financial services background preferred'],
    benefits: ['Portuguese-speaking team', '25 days holiday', 'Private healthcare'],
    featured: true,
    remote: false,
    category: 'Finance'
  },
  {
    id: 2,
    title: 'Lusophone Customer Success Manager',
    company: 'TechStart London',
    location: 'Shoreditch, London',
    salary: '£40,000 - £55,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Join our diverse team helping Portuguese-speaking customers succeed with our platform.',
    requirements: ['Native Portuguese speaker', 'Customer service experience', 'Tech-savvy'],
    benefits: ['Remote work options', 'Lusophone cultural holidays recognized', 'Career development'],
    featured: false,
    remote: true,
    category: 'Technology'
  },
  {
    id: 3,
    title: 'Lusophone Language Teacher',
    company: 'London International School',
    location: 'Camden, London',
    salary: '£35,000 - £45,000',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Teach Portuguese language to diverse international students in prestigious London school.',
    requirements: ['Teaching qualification', 'Native Portuguese speaker', 'Experience with young learners'],
    benefits: ['School holidays', 'Professional development', 'International environment'],
    featured: false,
    remote: false,
    category: 'Education'
  },
  {
    id: 4,
    title: 'Lusophone Content Marketing Specialist',
    company: 'Digital Marketing Agency',
    location: 'King\'s Cross, London',
    salary: '£35,000 - £50,000',
    type: 'Full-time',
    posted: '5 days ago',
    description: 'Create engaging Lusophone content for Brazilian and Lusophone markets. Work with international brands.',
    requirements: ['Lusophone copywriting skills', 'Marketing experience', 'Social media expertise'],
    benefits: ['Creative environment', 'Brazilian coffee bar', 'Flexible hours'],
    featured: true,
    remote: true,
    category: 'Marketing'
  },
  {
    id: 5,
    title: 'Lusophone-Speaking Tour Guide',
    company: 'London Heritage Tours',
    location: 'Central London',
    salary: '£25,000 - £35,000',
    type: 'Part-time',
    posted: '1 day ago',
    description: 'Lead Portuguese-speaking tourists through London\'s historic sites. Flexible schedule, great for students.',
    requirements: ['Fluent Lusophone and English', 'Knowledge of London history', 'Enthusiastic personality'],
    benefits: ['Flexible schedule', 'Tips included', 'Meet people from around the world'],
    featured: false,
    remote: false,
    category: 'Tourism'
  },
  {
    id: 6,
    title: 'Bilingual Healthcare Assistant',
    company: 'NHS Trust London',
    location: 'Multiple London Locations',
    salary: '£25,000 - £30,000',
    type: 'Full-time',
    posted: '4 days ago',
    description: 'Support Portuguese-speaking patients in London hospitals. Make a difference in your community.',
    requirements: ['Healthcare experience preferred', 'Fluent Lusophone and English', 'Compassionate nature'],
    benefits: ['NHS pension', 'Career progression', 'Serve Portuguese-speaking community'],
    featured: false,
    remote: false,
    category: 'Healthcare'
  }
]

const jobCategories = [
  'All Categories',
  'Technology',
  'Finance', 
  'Healthcare',
  'Education',
  'Marketing',
  'Tourism',
  'Hospitality',
  'Legal',
  'Engineering'
]

const jobTypes = [
  'All Types',
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
]

export default function JobsPage() {
  const { t } = useLanguage()
  const [jobs, setJobs] = useState(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedType, setSelectedType] = useState('All Types')
  const [showRemoteOnly, setShowRemoteOnly] = useState(false)
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  // Filter jobs based on criteria
  useEffect(() => {
    let filtered = jobs

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    if (selectedType !== 'All Types') {
      filtered = filtered.filter(job => job.type === selectedType)
    }

    if (showRemoteOnly) {
      filtered = filtered.filter(job => job.remote)
    }

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, selectedCategory, selectedType, showRemoteOnly])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary-600 via-action-600 to-accent-600 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <BriefcaseIcon className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Lusophone Jobs in London</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Find Your Perfect Job in London
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with Lusophone-friendly employers and opportunities designed for bilingual professionals in London
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-white/80">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">45+</div>
                  <div className="text-white/80">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">£45k</div>
                  <div className="text-white/80">Avg Salary</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">92%</div>
                  <div className="text-white/80">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-lg"
                />
              </div>
              <button className="bg-secondary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary-700 transition-colors whitespace-nowrap">
                Search Jobs
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              >
                {jobCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={showRemoteOnly}
                  onChange={(e) => setShowRemoteOnly(e.target.checked)}
                  className="rounded text-secondary-600 focus:ring-secondary-500"
                />
                <span className="text-sm font-medium">Remote Only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs found
            {searchQuery && <span> for "{searchQuery}"</span>}
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl border ${job.featured ? 'border-secondary-300 ring-2 ring-secondary-100' : 'border-gray-200'} p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                {job.featured && (
                  <div className="inline-flex items-center gap-1 bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <CheckCircleIcon className="w-4 h-4" />
                    Featured Job
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <BuildingOfficeIcon className="w-4 h-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            savedJobs.includes(job.id)
                              ? 'bg-secondary-100 text-secondary-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <BookmarkIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                          <ShareIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CurrencyPoundIcon className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      {job.remote && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                          Remote Available
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {req}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Posted {job.posted}</span>
                      <div className="flex gap-3">
                        <button className="text-secondary-600 hover:text-secondary-700 font-semibold">
                          View Details
                        </button>
                        <button className="bg-secondary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-secondary-50 to-accent-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't Find the Perfect Job?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Set up job alerts and get notified when Lusophone-friendly positions become available
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors">
                Create Job Alert
              </button>
              <button className="border border-secondary-600 text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition-colors">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}