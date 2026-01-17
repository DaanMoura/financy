import logo from '@/assets/Financy_Logo.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-neutral-white border-b border-b-gray-200 flex absolute top-0 left-0 right-0 justify-between items-center px-12 py-4">
      <Link to="/">
        <img className="mx-auto" src={logo} alt="Financy logo" />
      </Link>
      <nav className="flex items-center justify-between gap-5">
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/categories">Categories</Link>
      </nav>
      <div>
        <Link to="/profile">User</Link>
      </div>
    </header>
  )
}

export default Header
