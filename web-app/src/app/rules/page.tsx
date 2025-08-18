import Footer from '@/components/Footer'
import { ShieldCheckIcon, ScaleIcon, ExclamationTriangleIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Rules | LusoTown London - Community Rules',
  description: 'Clear, simple rules that keep the LusoTown community safe, respectful, and enjoyable for everyone.',
  alternates: { canonical: '/rules' }
}

export default function RulesPage() {
  const rules = [
    { icon: ShieldCheckIcon, title: 'Safety First', desc: 'Verification required. No harassment, threats, or unsafe behavior—online or in-person.' },
    { icon: ScaleIcon, title: 'Respect & Integrity', desc: 'No hate speech, discrimination, impersonation, or misleading profiles.' },
    { icon: HandRaisedIcon, title: 'No Spam or Soliciting', desc: 'No unsolicited promotions, scraping, or commercial activity without permission.' },
    { icon: ExclamationTriangleIcon, title: 'Report Issues', desc: 'Use in-app report or email safety@lusotown.com for any concerns. Zero tolerance for serious violations.' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-16">
        <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Rules</h1>
              <p className="text-lg text-gray-600">Simple rules so everyone feels safe, respected, and welcome. For the full standard, see our <a href="/community-guidelines" className="text-primary-600 underline">Community Guidelines</a>.</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-width">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {rules.map((r, i) => {
                const Icon = r.icon
                return (
                  <div key={i} className="bg-white rounded-2xl border p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{r.title}</h3>
                    <p className="text-gray-600">{r.desc}</p>
                  </div>
                )
              })}
            </div>

            <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 border">
              <p className="text-gray-700">
                Violations may result in warnings, suspensions, or permanent bans per our <a href="/terms" className="text-primary-600 underline">Terms of Service</a>. For help, contact <a href="mailto:safety@lusotown.com" className="text-primary-600 underline">safety@lusotown.com</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
