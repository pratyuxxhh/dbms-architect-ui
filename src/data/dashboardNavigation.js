import {
  HiOutlineSquares2X2,
  HiOutlineCommandLine,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2'

export const dashboardNavigation = [
  { label: 'Dashboard', href: '/dashboard', icon: HiOutlineSquares2X2, active: true },
  { label: 'Playground', href: '/playground', icon: HiOutlineCommandLine },
  { label: 'Logout', href: '/login', icon: HiOutlineArrowRightOnRectangle },
]