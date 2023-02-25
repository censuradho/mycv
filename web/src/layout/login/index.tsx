import { Box, Button, Typography } from '@/components/common'
import { InputForm, InputPassword } from '@/components/common/hook-form'
import { SignInWithEmailPasswordRequest } from '@/services/api/auth/types'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as Styles from './styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailPasswordValidationSchema } from './validation'

export function LoginLayout () {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInWithEmailPasswordRequest>({
    resolver: yupResolver(signInWithEmailPasswordValidationSchema)
  })

  const onSubmit = async () => {

  }

  return (
    <Styles.Container>
      <Styles.FormView>
        <Styles.Form onSubmit={handleSubmit(onSubmit)}>
          <Box fullWidth flexDirection="column" gap={0.5} marginBottom={2.625}>
            <Typography size="lg" color="heading" fontWeight="600">Login🌟</Typography>
            <Typography>Comece agora a criar curriculos incríveis</Typography>
          </Box>
          <InputForm 
            label="E-mail"
            register={register('email')}
            fullWidth
            errorMessage={errors?.email?.message}
          />
          <InputPassword 
            label="Senha"
            register={register('password')}
            fullWidth
            errorMessage={errors?.password?.message}
          />
          <Box marginTop={2} fullWidth>
            <Button fullWidth>Entrar</Button>
          </Box>
        </Styles.Form>
      </Styles.FormView>
      <Styles.InfoView>
        <Styles.Figure>
          <Image src="/curriculum-login.png" fill alt="Currículo modelo" />
        </Styles.Figure>
      </Styles.InfoView>
    </Styles.Container>
  )
}