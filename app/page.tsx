import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { ServicesSection } from '@/components/site/services-section'
import { BookingForm } from '@/components/site/booking-form'
import { SiteFooter } from '@/components/site/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ServicesSection />
        <BookingForm />
      </main>
      <SiteFooter />
    </div>
  )
}
