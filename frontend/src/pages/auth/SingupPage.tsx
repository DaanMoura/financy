import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { EyeIcon, EyeOffIcon, LockIcon, LogInIcon, MailIcon, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-gray-800 text-[20px] text-center font-bold">Criar conta</h1>
        <p className="text-gray-600 text-[16px] text-center font-normal">
          Comece a controlar suas finanças ainda hoje
        </p>
      </div>

      <div className="flex flex-col">
        <form className="flex flex-col gap-6">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Nome completo</FieldLabel>
              <InputGroup>
                <InputGroupInput placeholder="Seu nome completo" type="text" />
                <InputGroupAddon>
                  <UserRound />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>E-mail</FieldLabel>
              <InputGroup>
                <InputGroupInput placeholder="mail@exemplo.com" type="email" />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="Digite sua senha"
                  type={isPasswordVisible ? 'text' : 'password'}
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

          <Button className="w-full">Cadastrar</Button>

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
                <span>Criar conta</span>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
