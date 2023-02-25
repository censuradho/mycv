import { Box, Button } from '@/components/common'
import { InputForm, InputPassword } from '@/components/common/hook-form'
import { SignInWithEmailPasswordRequest } from '@/services/api/auth/types'
import { useForm } from 'react-hook-form'
import * as Styles from './styles'

export function LoginLayout () {
  const {
    register
  } = useForm<SignInWithEmailPasswordRequest>()

  return (
    <Styles.Container>
      <Styles.Form>
        <InputForm 
          label="E-mail"
          register={register('email')}
        />
        <InputPassword 
          label="Senha"
          register={register('password')}
        />
        <Box marginTop={2}>
          <Button fullWidth>Entrar</Button>
        </Box>
      </Styles.Form>
    </Styles.Container>
  )
}