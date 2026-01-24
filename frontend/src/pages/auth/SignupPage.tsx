import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@tanstack/react-query'
import { EyeIcon, EyeOffIcon, LockIcon, LogInIcon, MailIcon, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const signup = useAuthStore(state => state.signup)

  const { mutate: performSignup, isPending } = useMutation({
    mutationFn: async () => {
      await signup({ name, email, password })
    },
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!')
    },
    onError: () => {
      toast.error('Falha ao realizar o cadastro!')
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    performSignup()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-gray-800 text-[20px] text-center font-bold">Criar conta</h1>
        <p className="text-gray-600 text-[16px] text-center font-normal">
          Comece a controlar suas finanças ainda hoje
        </p>
      </div>

      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  <UserRound />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>E-mail</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  placeholder="mail@exemplo.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  placeholder="Digite sua senha"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    onClick={() => {
                      setIsPasswordVisible(prev => !prev)
                    }}
                  >
                    {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="text-[12px] mt-2">
                A senha deve ter no mínimo 8 caracteres
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button type="submit" disabled={isPending} className="w-full">
            Cadastrar
          </Button>

          <div className="flex gap-2 w-full items-center justify-center-safe">
            <div className="h-px bg-gray-300 w-full" />
            <span className="text-gray-500 text-[14px]">ou</span>
            <div className="h-px bg-gray-300 w-full" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-[16px] text-center font-normal">Já tem uma conta?</p>

            <Link to="/">
              <Button className="w-full" variant="outline">
                <LogInIcon />
                <span>Fazer login</span>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
