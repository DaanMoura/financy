import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { Label } from '@radix-ui/react-label'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserRoundPlusIcon } from 'lucide-react'
import { useState } from 'react'

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-gray-800 text-[20px] text-center font-bold">Fazer login</h1>
        <p className="text-gray-600 text-[16px] text-center font-normal">Entre na sua conta para continuar</p>
      </div>

      <div className="flex flex-col">
        <form className="flex flex-col gap-6">
          <FieldGroup className="gap-4">
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
            </Field>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Checkbox id="remember-me" />
                <Label className="text-gray-700 text-[14px]" htmlFor="remember-me">Lembrar-me</Label>
              </div>
              <a className="text-brand-base text-[14px]" href="/auth/forgot-password">Recuperar senha</a>
            </div>
          </FieldGroup>

          <Button className="w-full">Entrar</Button>

          <div className="flex gap-2 w-full items-center justify-center-safe">
            <div className="h-px bg-gray-300 w-full" />
            <span className="text-gray-500 text-[14px]">ou</span>
            <div className="h-px bg-gray-300 w-full" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-gray-600 text-[16px] text-center font-normal">Ainda não tem uma conta?</p>

            <Button className="w-full" variant="outline">
              <UserRoundPlusIcon/>
              <span>Criar conta</span>
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
