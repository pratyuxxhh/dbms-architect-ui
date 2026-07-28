import { RiRobot2Line } from 'react-icons/ri'
import { HiOutlineArrowDownTray, HiOutlineShare, HiOutlineCheckCircle } from 'react-icons/hi2'

export const features = [
  {
    title: 'AI-powered schema generation',
    description:
      'Describe your app and instantly generate normalized database structures.',
    icon: RiRobot2Line,
  },
  {
    title: 'SQL download',
    description:
      'Export clean SQL files ready for PostgreSQL, MySQL, or SQLite.',
    icon: HiOutlineArrowDownTray,
  },
  {
    title: 'ER diagram support',
    description:
      'Visualize relationships with elegant entity-relationship diagrams.',
    icon: HiOutlineShare,
  },
  {
    title: 'ANSI SQL compliance',
    description:
      'Generate standards-aligned schemas with best-practice constraints.',
    icon: HiOutlineCheckCircle,
  },
]
