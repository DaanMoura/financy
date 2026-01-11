import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import LoginPage from './pages/auth/LoginPage'

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

export default App
