import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlinePlay } from 'react-icons/hi2'
import Button from '../common/Button'

export default function HeroButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row w-full sm:w-auto px-2">
      <Link to="/dashboard" className="w-full sm:w-auto">
        <Button variant="primary" className="w-full sm:w-auto px-6 sm:px-7 py-3 text-sm sm:text-base shadow-xl shadow-primary/10 hover:scale-[1.02] flex items-center justify-center gap-2">
          <span>Start Generating Free</span>
          <HiOutlineArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </Link>
      <a href="#how-it-works" className="w-full sm:w-auto">
        <Button variant="secondary" className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-surface/80">
          <HiOutlinePlay className="h-4 w-4 text-primary" />
          <span>See How It Works</span>
        </Button>
      </a>
    </div>
  )
}
