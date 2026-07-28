import Container from '../common/Container'
import FeatureCard from './FeatureCard'
import { features } from '../../data/features'

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="pb-20">
      <Container>
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}
