import {
  HiOutlineSquares2X2,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2'

export const dashboardNavigation = [
  { label: 'Dashboard', href: '/dashboard', icon: HiOutlineSquares2X2, active: true },
  { label: 'History', href: '#history', icon: HiOutlineClock },
  { label: 'Settings', href: '#settings', icon: HiOutlineCog6Tooth },
  { label: 'Logout', href: '/login', icon: HiOutlineArrowRightOnRectangle },
]