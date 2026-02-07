import { UserIcon } from '@/components/custom/UserIcon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@tanstack/react-query'
import { LogOut, MailIcon, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [name, setName] = useState('')

  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    }
  }, [user?.name])

  const { mutate: logoutUser, isPending: isLogoutPending } = useMutation({
    mutationFn: async () => {
      logout()
    },
    onSuccess: () => {
      navigate('/')
    },
    onError: error => {
      toast.error('Falha ao fazer logout')
      console.error(error)
    }
  })

  // Mock mutation for updating user
  const { mutate: saveChanges, isPending: isSavePending } = useMutation({
    mutationFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real app, we would call an API here
      // updateUser({ name })
    },
    onSuccess: () => {
      toast.success('Alterações salvas com sucesso!')
    },
    onError: () => {
      toast.error('Falha ao salvar alterações')
    }
  })

  const handleLogout = () => {
    logoutUser()
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveChanges()
  }

  if (!user) return null

  return (
    <div className="flex justify-center pt-12 px-6">
      <Card className="w-full max-w-[500px]">
        <CardContent className="pt-8 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <UserIcon size="lg" className="h-24 w-24 text-3xl" />
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100" />

          <form onSubmit={handleSave} className="w-full flex flex-col gap-6">
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel>Nome completo</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    placeholder="Seu nome completo"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                  <InputGroupAddon>
                    <UserRound className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>E-mail</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    value={user.email}
                    readOnly
                    className="bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <InputGroupAddon>
                    <MailIcon className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>O e-mail não pode ser alterado</FieldDescription>
              </Field>
            </FieldGroup>

            <div className="flex flex-col gap-3 pt-2">
              <Button type="submit" disabled={isSavePending} className="w-full">
                {isSavePending ? 'Salvando...' : 'Salvar alterações'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                disabled={isLogoutPending}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair da conta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
