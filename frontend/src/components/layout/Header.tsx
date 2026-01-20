import logo from '@/assets/Financy_Logo.svg'
import { Link, NavLink, type NavLinkRenderProps } from 'react-router-dom'
import { UserIcon } from '../custom/UserIcon'
import { cn } from '@/lib/utils'

const Header = () => {
  const getLinkClass = ({ isActive }: NavLinkRenderProps) => {
    if (isActive) {
      return cn('text-sm text-brand-base font-semibold')
    }
    return cn('text-sm text-neutral-gray-500')
  }

  return (
    <header className="bg-neutral-white border-b border-b-gray-200 flex absolute top-0 left-0 right-0 justify-between items-center px-12 py-4">
      <Link to="/">
        <img className="mx-auto" src={logo} alt="Financy logo" />
      </Link>
      <nav className="flex items-center justify-between gap-5">
        <NavLink to="/" className={getLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={getLinkClass}>
          Transactions
        </NavLink>
        <NavLink to="/categories" className={getLinkClass}>
          Categories
        </NavLink>
      </nav>
      <div>
        <Link to="/profile">
          <UserIcon size="sm" />
        </Link>
      </div>
    </header>
  )
}

export default Header
