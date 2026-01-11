import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
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
        <form>
          <FieldGroup>
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
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
