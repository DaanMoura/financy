import { Card } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import logo from '@/assets/Financy_Logo.svg'
import Background from './Background'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Background>
      <div className="flex flex-col w-full gap-8 py-12">
        <img className="mx-auto" src={logo} alt="Financy logo" />
        <main className="mx-auto w-md py-4">
          <Card className="p-8">
            <Outlet />
          </Card>
        </main>
      </div>
      <Toaster />
    </Background>
  )
}

export default AuthLayout
