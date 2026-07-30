import MainLayout from '../layout/MainLayout'
import Hero from '../components/Hero/Hero'
import MetricsBar from '../components/Landing/MetricsBar'
import HowItWorks from '../components/Landing/HowItWorks'
import InteractiveFeatures from '../components/Landing/InteractiveFeatures'
import SchemaComparison from '../components/Landing/SchemaComparison'
import Testimonials from '../components/Landing/Testimonials'
import FAQ from '../components/Landing/FAQ'
import CtaBanner from '../components/Landing/CtaBanner'

export default function Landing() {
  return (
    <MainLayout>
      <Hero />
      <MetricsBar />
      <HowItWorks />
      <InteractiveFeatures />
      <SchemaComparison />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </MainLayout>
  )
}
