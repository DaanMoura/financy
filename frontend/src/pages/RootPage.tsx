import { useAuthStore } from '@/stores/auth'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'

const RootPage = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <DashboardPage />
}

export default RootPage
