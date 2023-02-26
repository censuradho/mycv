import * as Styles from './styles'
import { EducationHistoryProps } from './types'
import { useFieldArray } from "react-hook-form";
import { Box, ButtonIcon } from '@/components/common';
import { AccordionView } from '../accordion-view';

export function EducationHistory (props: EducationHistoryProps) {
  const {
    control,
    register,
    errors,
    // experiences
  } = props


  const {
    fields,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: 'educations',
    keyName: '_id'
  })

  const renderFields = fields.map((value, index) => {
    const _value = value as any

    return (
      <Box key={_value._id} alignItems="flexStart" gap={0.1}>
        <AccordionView 
          title={'(Não especificado)'}
          subTitle={''}
        >

          
        </AccordionView>
        <ButtonIcon 
          type="button"
          label="delete" 
          icon={{ name: 'delete' }}
          onClick={() => remove(index)}
        />
      </Box>

    )
  })

  return (
    <Styles.Container></Styles.Container>
  )
}