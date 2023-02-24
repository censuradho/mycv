import * as Styles from './styles'
import { useForm } from 'react-hook-form'
import { InputForm } from '@/components/common/hook-form'
import { Box } from '@/components/common'

export function Form () {
  const { 
    register
  } = useForm()
  
  return (
    <Styles.Container>
      <Styles.Form>
        <Box flexDirection="column" gap={2}>
          <Styles.SectionTitle>Informações pessoais</Styles.SectionTitle>
          <Box flexDirection="column" gap={1}>
            <InputForm 
              label="Ocupação"
              fullWidth
              textHelper="Add seu cargo como ‘Senior Marketer’ ou ‘Sales Executive’ para que você está aplicando"
              register={register('first_name')}
            />
            <Box 
              gap={1}
              flexDirection={{
                '@initial': 'column',
                '@table-min': 'row'
              }}
            >
              <InputForm 
                label="Primeiro nome"
                fullWidth
                register={register('first_name')}
              />
              <InputForm 
                label="Sobrenome"
                fullWidth
                register={register('last_name')}
              />
            </Box>
            <Box 
              gap={1}
              flexDirection={{
                '@initial': 'column',
                '@table-min': 'row'
              }}
            >
              <InputForm 
                label="E-mail"
                fullWidth
                register={register('email')}
              />
              <InputForm 
                label="Telefone"
                fullWidth
                register={register('phone')}
              />
            </Box>
            <InputForm 
              label="Cidade"
              fullWidth
              register={register('address.city')}
            />
          </Box>
        </Box>
      </Styles.Form>
    </Styles.Container>
  )
}