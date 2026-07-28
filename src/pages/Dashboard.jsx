import DashboardLayout from '../components/layout/DashboardLayout'
import GenerateSchemaCard from '../components/dashboard/GenerateSchemaCard'
import FeatureCard from '../components/dashboard/FeatureCard'
import { dashboardFeatures } from '../data/dashboardFeatures'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <section className="space-y-5">
        <GenerateSchemaCard />

        <div className="grid gap-4 md:grid-cols-3">
          {dashboardFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}