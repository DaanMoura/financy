import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import SignupPage from './pages/auth/SignupPage'
import { useAuthStore } from './stores/auth'
import AppLayout from './components/layout/AppLayout'
import RootPage from './pages/RootPage'
import TransactionsPage from './pages/transactions/TransactionsPage'
import CategoriesPage from './pages/categories/CategoriesPage'
import ProfilePage from './pages/profile/ProfilePage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  const { isAuthenticated } = useAuthStore()
  const layout = isAuthenticated ? <AppLayout /> : <AuthLayout />

  return (
    <Routes>
      <Route element={layout}>
        <Route path="/" element={<RootPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
