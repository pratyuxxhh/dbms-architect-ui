import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlinePlay } from 'react-icons/hi2'
import Button from '../common/Button'

export default function HeroButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link to="/dashboard">
        <Button variant="primary" className="px-7 py-3 text-base shadow-xl shadow-primary/10 hover:scale-[1.02] flex items-center gap-2">
          <span>Start Generating Free</span>
          <HiOutlineArrowRight className="h-5 w-5" />
        </Button>
      </Link>
      <a href="#how-it-works">
        <Button variant="secondary" className="px-6 py-3 text-base flex items-center gap-2 hover:bg-surface/80">
          <HiOutlinePlay className="h-4 w-4 text-primary" />
          <span>See How It Works</span>
        </Button>
      </a>
    </div>
  )
}
