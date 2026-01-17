import { Outlet } from 'react-router-dom'
import Background from './Background'
import Header from './Header'

const AppLayout = () => {
  return (
    <Background>
      <Header />
      <main className="h-full w-full p-12 pt-24">
        <Outlet />
      </main>
    </Background>
  )
}

export default AppLayout
