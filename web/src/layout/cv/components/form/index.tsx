import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Box, Button, MarkdownEditor, Typography } from '@/components/common'
import { InputForm } from '@/components/common/hook-form'
import { AutoCompleteForm } from '@/components/common/hook-form/auto-complete'
import { useDebounceCallback } from '@/hooks'
import { CreateCurriculum, EnumContactPreference, Experience } from '@/services/api/curriculum/types'
import { cityService } from '@/services/local-api/city'
import { GetCityResponse } from '@/services/local-api/city/types'

import { EmploymentHistory } from '../employment-history'
import * as Styles from './styles'
import { curriculumValidationSchema } from './validations'
import { ContactPreference } from '../contact-preference'

export const baseEmployment: Experience = {
  employer: '',
  title: '',
  initial_date: '',
  final_date: '',
  is_main: false,
  description: '',
}

export function Form () {
  const { 
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCurriculum>({
    resolver: yupResolver(curriculumValidationSchema),
    defaultValues: {
      experiences: [baseEmployment]
    }
  })

  const [search, setSearch] = useState('')
  const [cities, setCities] = useState<GetCityResponse[]>([])

  const getCities = useDebounceCallback(async (cityName: string) => {
    const { data } = await cityService.findByName(cityName)
    setCities(data)
  }, 2000)

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  const options = cities.map(city => ({
    label: city.name,
    value: city.name
  }))

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearch(value)

    if (value.length === 0) setCities([])

    if (value.length > 3) getCities(value)
  }

  console.log(errors)

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
              register={register('title')}
              placeholder="e.g Software Developer"
              errorMessage={errors?.title?.message}
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
                errorMessage={errors?.first_name?.message}
              />
              <InputForm 
                label="Sobrenome"
                fullWidth
                register={register('last_name')}
                errorMessage={errors?.last_name?.message}
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
                register={register('public_email')}
                errorMessage={errors?.public_email?.message}
              />
              <InputForm 
                label="Telefone"
                fullWidth
                register={register('phone')}
                errorMessage={errors?.phone?.message}
              />
            </Box>
            <AutoCompleteForm
              control={control}
              name="address.city"
              label="Cidade"
              keyName="value"
              onChange={handleSearch}
              items={options}
              value={search}
              onSelect={value => setSearch(value)}
              // errorMessage={errors?.city?.message}
            />
          </Box>
          <Box flexDirection="column" gap={2}>
            <Styles.SectionTitle>Preferência de contato</Styles.SectionTitle>
            <ContactPreference
              name="contact_preference" 
              options={[
                {
                  icon: 'whatsapp',
                  value: EnumContactPreference.whatsapp,
                  label: 'Whatsapp',
                  id: 'whatsapp'
                },
                {
                  icon: 'mail',
                  value: EnumContactPreference.email,
                  label: 'E-mail',
                  id: 'mail'
                },
                {
                  icon: 'phone',
                  value: EnumContactPreference.phone,
                  label: 'Telefone',
                  id: 'phone'

                },
                {
                  icon: 'telegram',
                  value: EnumContactPreference.telegram,
                  label: 'Telegram',
                  id: 'telegram'
                }
              ]}
              errorMessage={errors?.contact_preference?.message}
              control={control} 
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