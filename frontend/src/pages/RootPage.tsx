import { useAuthStore } from '@/stores/auth'
import LoginPage from './auth/LoginPage'
import DashboardPage from './dashboard/DashboardPage'

const RootPage = () => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <DashboardPage />
}

export default RootPage
