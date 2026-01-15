import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SingupPage'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  )
}

export default App
