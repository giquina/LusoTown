'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Gift,
  Crown,
  Video,
  Calculator,
  Info,
  Sparkles
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function CreatorEarningsCalculator() {
  const { language } = useLanguage()
  const [followers, setFollowers] = useState(500)
  const [avgViewers, setAvgViewers] = useState(50)
  const [streamHours, setStreamHours] = useState(10)
  const [workshopPrice, setWorkshopPrice] = useState(25)
  const [workshopsPerMonth, setWorkshopsPerMonth] = useState(4)
  const [donationRate, setDonationRate] = useState(15) // percentage of viewers who donate
  const [avgDonation, setAvgDonation] = useState(5)
  const [premiumSubs, setPremiumSubs] = useState(10)
  const [premiumPrice, setPremiumPrice] = useState(15)

  const isPt = language === 'pt'

  // Calculate different revenue streams
  const calculateEarnings = () => {
    // Donations: avgViewers * donationRate * avgDonation * streams per month (assuming 4 per month)
    const monthlyDonations = (avgViewers * (donationRate / 100) * avgDonation * 4) * 0.85

    // Premium subscriptions: premiumSubs * premiumPrice * 85%
    const monthlySubscriptions = premiumSubs * premiumPrice * 0.85

    // Workshops: workshopsPerMonth * workshopPrice * 85%
    const monthlyWorkshops = workshopsPerMonth * workshopPrice * 0.85

    // Future sponsorships (placeholder - 70% split)
    const monthlySponsorships = followers > 1000 ? Math.min((followers / 100) * 2, 300) * 0.70 : 0

    return {
      donations: Math.round(monthlyDonations),
      subscriptions: Math.round(monthlySubscriptions),
      workshops: Math.round(monthlyWorkshops),
      sponsorships: Math.round(monthlySponsorships),
      total: Math.round(monthlyDonations + monthlySubscriptions + monthlyWorkshops + monthlySponsorships),
      annual: Math.round((monthlyDonations + monthlySubscriptions + monthlyWorkshops + monthlySponsorships) * 12)
    }
  }

  const earnings = calculateEarnings()

  // Preset scenarios for quick calculations
  const presets = [
    {
      name: isPt ? 'Iniciante' : 'Beginner',
      description: isPt ? 'Começar devagar' : 'Starting small',
      values: {
        followers: 200,
        avgViewers: 25,
        streamHours: 6,
        workshopPrice: 15,
        workshopsPerMonth: 2,
        donationRate: 10,
        avgDonation: 3,
        premiumSubs: 5,
        premiumPrice: 10
      }
    },
    {
      name: isPt ? 'Intermediário' : 'Intermediate',
      description: isPt ? 'Audiência estabelecida' : 'Established audience',
      values: {
        followers: 800,
        avgViewers: 75,
        streamHours: 12,
        workshopPrice: 30,
        workshopsPerMonth: 6,
        donationRate: 18,
        avgDonation: 7,
        premiumSubs: 20,
        premiumPrice: 15
      }
    },
    {
      name: isPt ? 'Avançado' : 'Advanced',
      description: isPt ? 'Criador experiente' : 'Experienced creator',
      values: {
        followers: 2000,
        avgViewers: 150,
        streamHours: 20,
        workshopPrice: 50,
        workshopsPerMonth: 8,
        donationRate: 25,
        avgDonation: 12,
        premiumSubs: 50,
        premiumPrice: 20
      }
    }
  ]

  const applyPreset = (preset: typeof presets[0]) => {
    setFollowers(preset.values.followers)
    setAvgViewers(preset.values.avgViewers)
    setStreamHours(preset.values.streamHours)
    setWorkshopPrice(preset.values.workshopPrice)
    setWorkshopsPerMonth(preset.values.workshopsPerMonth)
    setDonationRate(preset.values.donationRate)
    setAvgDonation(preset.values.avgDonation)
    setPremiumSubs(preset.values.premiumSubs)
    setPremiumPrice(preset.values.premiumPrice)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {isPt ? 'Calculadora de Ganhos de Criador' : 'Creator Earnings Calculator'}
        </h2>
        <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
          {isPt
            ? 'Descubra quanto pode ganhar partilhando a sua paixão pela cultura portuguesa. Ajuste os valores com base no seu público e conteúdo.'
            : 'Discover how much you can earn sharing your passion for Portuguese culture. Adjust the values based on your audience and content.'}
        </p>
      </div>

      {/* Preset Scenarios */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {isPt ? 'Cenários Rápidos' : 'Quick Scenarios'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset, index) => (
            <motion.button
              key={preset.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => applyPreset(preset)}
              className="p-4 bg-white border-2 border-secondary-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all text-left group"
            >
              <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700">
                {preset.name}
              </h4>
              <p className="text-sm text-secondary-600">{preset.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-primary-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {isPt ? 'Os Seus Números' : 'Your Numbers'}
            </h3>
          </div>

          <div className="space-y-6">
            {/* Audience Metrics */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                {isPt ? 'Métricas de Audiência' : 'Audience Metrics'}
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    {isPt ? 'Seguidores' : 'Followers'}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={followers}
                    onChange={(e) => setFollowers(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>50</span>
                    <span className="font-medium text-primary-600">{followers.toLocaleString()}</span>
                    <span>5,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    {isPt ? 'Espectadores Médios por Stream' : 'Avg Viewers per Stream'}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={avgViewers}
                    onChange={(e) => setAvgViewers(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>10</span>
                    <span className="font-medium text-primary-600">{avgViewers}</span>
                    <span>500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Metrics */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                {isPt ? 'Criação de Conteúdo' : 'Content Creation'}
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    {isPt ? 'Horas de Stream por Mês' : 'Stream Hours per Month'}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    step="2"
                    value={streamHours}
                    onChange={(e) => setStreamHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>4h</span>
                    <span className="font-medium text-primary-600">{streamHours}h</span>
                    <span>40h</span>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isPt ? 'Preço Workshop (£)' : 'Workshop Price (£)'}
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={workshopPrice}
                      onChange={(e) => setWorkshopPrice(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isPt ? 'Workshops/Mês' : 'Workshops/Month'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={workshopsPerMonth}
                      onChange={(e) => setWorkshopsPerMonth(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Monetization Settings */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                {isPt ? 'Configurações de Monetização' : 'Monetization Settings'}
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isPt ? '% Espectadores que Doam' : '% Viewers who Donate'}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="1"
                      value={donationRate}
                      onChange={(e) => setDonationRate(parseInt(e.target.value))}
                      className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center text-sm text-primary-600 font-medium">{donationRate}%</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isPt ? 'Doação Média (£)' : 'Avg Donation (£)'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={avgDonation}
                      onChange={(e) => setAvgDonation(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isPt ? 'Subscritores Premium' : 'Premium Subscribers'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="200"
                      value={premiumSubs}
                      onChange={(e) => setPremiumSubs(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isPt ? 'Preço Premium (£)' : 'Premium Price (£)'}
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="50"
                      value={premiumPrice}
                      onChange={(e) => setPremiumPrice(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Total Earnings Card */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-semibold">
                {isPt ? 'Ganhos Estimados' : 'Estimated Earnings'}
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold">£{earnings.total.toLocaleString()}</div>
                <div className="text-primary-100">{isPt ? 'por mês' : 'per month'}</div>
              </div>
              <div className="pt-3 border-t border-primary-400/30">
                <div className="text-lg font-semibold">£{earnings.annual.toLocaleString()}</div>
                <div className="text-primary-100">{isPt ? 'por ano' : 'per year'}</div>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isPt ? 'Divisão de Receitas' : 'Revenue Breakdown'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">
                    {isPt ? 'Doações' : 'Donations'}
                  </span>
                </div>
                <span className="font-semibold text-primary-600">£{earnings.donations}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-premium-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-premium-600" />
                  <span className="font-medium text-gray-900">
                    {isPt ? 'Subscrições' : 'Subscriptions'}
                  </span>
                </div>
                <span className="font-semibold text-premium-600">£{earnings.subscriptions}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-action-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-action-600" />
                  <span className="font-medium text-gray-900">
                    {isPt ? 'Workshops' : 'Workshops'}
                  </span>
                </div>
                <span className="font-semibold text-action-600">£{earnings.workshops}</span>
              </div>

              {earnings.sponsorships > 0 && (
                <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary-600" />
                    <span className="font-medium text-gray-900">
                      {isPt ? 'Patrocínios' : 'Sponsorships'}
                    </span>
                  </div>
                  <span className="font-semibold text-secondary-600">£{earnings.sponsorships}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isPt ? 'Insights Adicionais' : 'Additional Insights'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-600">
                  {isPt
                    ? 'Recebe 85% de todas as receitas - uma das divisões mais generosas do mercado.'
                    : 'You receive 85% of all revenue - one of the most generous splits in the market.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-action-500 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-600">
                  {isPt
                    ? 'Pagamentos processados mensalmente até ao 5º dia útil.'
                    : 'Payments processed monthly by the 5th business day.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-600">
                  {isPt
                    ? 'Ganhos podem aumentar significativamente com crescimento da audiência.'
                    : 'Earnings can grow significantly with audience growth.'}
                </span>
              </div>
              {followers > 1000 && (
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-600">
                    {isPt
                      ? 'Com mais de 1.000 seguidores, está elegível para oportunidades de patrocínio!'
                      : 'With 1,000+ followers, you\'re eligible for sponsorship opportunities!'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}