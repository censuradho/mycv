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
          label="Ocupação"
          textHelper="Add seu cargo como ‘Senior Marketer’ ou ‘Sales Executive’ para que você está aplicando"
          register={register('first_name')}
        />
        <InputForm 
          label="Primeiro nome"
          textHelper=""
          register={register('first_name')}
        />
      </Styles.Form>
    </Styles.Container>
  )
}