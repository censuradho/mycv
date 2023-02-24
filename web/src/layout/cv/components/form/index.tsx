import * as Styles from './styles'
import { useForm } from 'react-hook-form'
import { InputForm } from '@/components/common/hook-form'

export function Form () {
  const { 
    register
  } = useForm()

  return (
    <Styles.Container>
      <Styles.Form>
        <InputForm 
          label="Primeiro nome"
          register={register('first_name')}
        />
      </Styles.Form>
    </Styles.Container>
  )
}