'use client'

import AuthPopupDemo from '@/components/AuthPopupDemo'

export default function AuthPopupDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="pt-16">
        <section className="py-12">
          <div className="container-width">
            <AuthPopupDemo />
          </div>
        </section>
      </div>
    </main>
  )
}