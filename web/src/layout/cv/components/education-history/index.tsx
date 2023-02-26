import * as Styles from './styles'
import { EducationHistoryProps } from './types'
import { useFieldArray } from "react-hook-form";
import { Box, ButtonIcon } from '@/components/common';
import { AccordionView } from '../accordion-view';
import { InputForm } from '@/components/common/hook-form';
import { Button } from '../button';
import { baseEducation } from '../form';

export function EducationHistory (props: EducationHistoryProps) {
  const {
    control,
    register,
    errors,
    data
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
          <Styles.Container>
            <Box
              gap={1}
              flexDirection={{
                '@initial': 'column',
                '@table-min': 'row'
              }}
            >
              <InputForm 
                label="Nome da empresa"
                fullWidth
                id={`educations.${index}.institution_name`}
                register={register(`educations.${index}.institution_name`)}
                name={`educations.${index}.institution_name`}
                errorMessage={errors?.[index]?.institution_name?.message}
              />
            </Box>
          </Styles.Container>
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
    <>
      {renderFields}
      <Box marginTop={2}>
        <Button onClick={() => append(baseEducation)}>Add experiência</Button>
      </Box>
    </>
  )
}