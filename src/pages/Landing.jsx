import MainLayout from '../layout/MainLayout'
import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'

export default function Landing() {
  return (
    <MainLayout>
      <Hero />
      <div className="mt-[100px]">
        <Features />
      </div>
    </MainLayout>
  )
}
