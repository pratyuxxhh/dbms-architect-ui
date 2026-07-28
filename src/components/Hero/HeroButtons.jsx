import { Link } from 'react-router-dom'
import Button from '../common/Button'

export default function HeroButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link to="/signup">
        <Button variant="primary">Get Started</Button>
      </Link>
      <Link to="/login">
        <Button variant="secondary">Login</Button>
      </Link>
    </div>
  )
}
