import { AutoComplete, Box, MarkdownEditor, Typography } from '@/components/common'
import { InputForm } from '@/components/common/hook-form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/common'

import { EmploymentHistory } from '../employment-history'
import * as Styles from './styles'

export const baseEmployment = {
  type: '',
  company_name: '',
  office: '',
  initial_date: '',
  final_date: '',
  is_main: false,
  description: '',
  company_site: ''
}

export function Form () {
  const { 
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      experiences: [baseEmployment]
    }
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  
  return (
    <Styles.Container>
      <Styles.Form onSubmit={handleSubmit(onSubmit)}>
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
            <AutoComplete 
              label="Cidade"
              // fullWidth
              // register={register('address.city')}
            />
          </Box>
          <Box flexDirection="column" gap={0.5}>
            <Styles.SectionTitle>Resumo profissional</Styles.SectionTitle>
            <Typography as="p" size="xsm">Escreva 2-4 frases curtas e enérgicas para interessar o leitor! Mencione sua função, experiência e o mais importante - suas maiores conquistas, melhores qualidades e habilidades.</Typography>
          </Box>
          <MarkdownEditor />
          <Box flexDirection="column" gap={0.5}>
            <Styles.SectionTitle>Histórico profissional</Styles.SectionTitle>
            <Typography as="p" size="xsm">Mostre sua experiência relevante (últimos 10 anos). Use marcadores para anotar suas conquistas, se possível - use números/fatos (Conquistado X, medido por Y, fazendo Z).</Typography>
          </Box>
          <EmploymentHistory 
            control={control}
            register={register}
            errors={errors}
          />
        </Box>
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.Container>
  )
}