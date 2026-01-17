import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: async () => {
      logout()
    },
    onSuccess: () => {
      navigate('/')
    },
    onError: error => {
      toast('Falha ao fazer logout')
      console.error(error)
    }
  })

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <Button onClick={handleLogout} disabled={isPending}>
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
