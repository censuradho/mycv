import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, Typography } from '@/components/common'
import { EditorForm, InputForm } from '@/components/common/hook-form'
import { AutoCompleteForm } from '@/components/common/hook-form/auto-complete'
import { useDebounceCallback } from '@/hooks'
import {
  CreateCurriculum, EnumContactPreference,
  EnumEducationLevel,
  EnumEducationSituation,
  EnumLanguageLevel
} from '@/services/api/curriculum/types'
import { GetCityResponse, GetCountryResponse } from '@/services/ninja/places/types'

import { placeServices } from '@/services/local-api/places'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContactPreference } from '../contact-preference'
import { EducationHistory } from '../education-history'
import { EmploymentHistory } from '../employment-history'
import { Skills } from '../skills'
import * as Styles from './styles'
import { curriculumValidationSchema } from './validations'
import { Languages } from '../languages'

export const baseEmployment: CreateCurriculum['experiences'] = [{
  employer: '',
  title: '',
  initial_date: '',
  final_date: '',
  is_main: false,
  description: '',
}]

export const baseEducation: CreateCurriculum['educations'] = [{
  final_date: '',
  initial_date: '',
  institution_name: '',
  is_main: false,
  level: EnumEducationLevel.highSchool,
  situation: EnumEducationSituation.notInform,
  title: ''
}]

export const baseSkill: CreateCurriculum['skills'] = [{
  name: ''
}]

export const baseLanguages: CreateCurriculum['languages'] = [{
  name: '',
  conversation: EnumLanguageLevel.basic,
  reading: EnumLanguageLevel.basic,
  writing: EnumLanguageLevel.basic
}]

export function Form () {
  const { 
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreateCurriculum>({
    resolver: yupResolver(curriculumValidationSchema),
    defaultValues: {
      experiences: baseEmployment
    }
  })

  const [searchCity, setSearchCity] = useState('')
  const [searchCountry, setSearchCountry] = useState('')

  const [cities, setCities] = useState<GetCityResponse[]>([])
  const [countries, setCountries] = useState<GetCountryResponse[]>([])

  const getCities = useDebounceCallback(async (cityName: string) => {
    const { data } = await placeServices.findByCityName(cityName)
    setCities(data)
  }, 2000)

  const getCountries = useDebounceCallback(async (cityName: string) => {
    const { data } = await placeServices.findByCountryName(cityName)
    setCountries(data)
  }, 2000)


  const optionsCities = cities.map(city => ({
    label: city.name,
    value: city.name
  }))

  const optionsCountries = countries.map(country => ({
    label: country.name,
    value: country.name
  }))

  const [
    experiences, 
    educations,
    skills,
    languages
  ] = watch(['experiences', 'educations', 'skills', 'languages'])

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  const handleSearchCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchCity(value)

    if (value.length === 0) setCities([])

    if (value.length > 3) getCities(value)
  }

  const handleSearchCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchCountry(value)

    if (value.length === 0) setCountries([])

    if (value.length > 3) getCountries(value)
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
              register={register('title')}
              placeholder="ex Software Developer"
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
                type="email"
                inputMode="email"
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
            <Box
              fullWidth
              gap={1}
              flexDirection={{
                '@initial': 'column',
                '@table-min': 'row'
              }}
            >
              <AutoCompleteForm
                control={control}
                name="address.country"
                label="Pais (opcional)"
                keyName="value"
                onChange={handleSearchCountry}
                items={optionsCountries}
                value={searchCountry}
                onSelect={value => setSearchCountry(value)}
                errorMessage={errors?.address?.city?.message}
              />
              <AutoCompleteForm
                control={control}
                name="address.city"
                label="Cidade (opcional)"
                keyName="value"
                onChange={handleSearchCity}
                items={optionsCities}
                value={searchCity}
                onSelect={value => setSearchCity(value)}
                errorMessage={errors?.address?.city?.message}
              />
            </Box>
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
          <EditorForm  
            name="presentation"
            control={control}
            errorMessage={errors.presentation?.message}
          />
          <Box flexDirection="column" gap={0.5}>
            <Styles.SectionTitle>Histórico profissional</Styles.SectionTitle>
            <Typography as="p" size="xsm">Mostre sua experiência relevante (últimos 10 anos). Use marcadores para anotar suas conquistas, se possível - use números/fatos (Conquistado X, medido por Y, fazendo Z).</Typography>
          </Box>
          <EmploymentHistory 
            control={control}
            register={register}
            errors={errors?.experiences}
            experiences={experiences}
          />
          <Box flexDirection="column" gap={0.5}>
            <Styles.SectionTitle>Educação</Styles.SectionTitle>
            <Typography as="p" size="xsm">
              Uma educação variada em seu currículo resume o valor que seu aprendizado e experiência trarão para o trabalho.
            </Typography>
          </Box>
          <EducationHistory 
            control={control}
            register={register}
            errors={errors?.educations}
            data={educations}
          />
          <Box flexDirection="column" gap={0.5}>
            <Styles.SectionTitle>Habilidades</Styles.SectionTitle>
            <Typography as="p" size="xsm">
              Escolha 5 das habilidades mais importantes para mostrar seus talentos! Certifique-se de que correspondam às palavras-chave da lista de empregos, caso se candidate através de um sistema online.
            </Typography>
          </Box>
          <Skills 
            control={control}
            register={register}
            errors={errors?.educations}
            data={skills}
          />
          <Box flexDirection="column" gap={0.5}>
            <Styles.SectionTitle>Idiomas</Styles.SectionTitle>
          </Box>
          <Languages 
            control={control}
            register={register}
            errors={errors?.languages}
            data={languages}
          />
        </Box>
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.Container>
  )
}