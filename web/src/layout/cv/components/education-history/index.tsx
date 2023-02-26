import * as Styles from './styles'
import { EducationHistoryProps } from './types'
import { useFieldArray } from "react-hook-form";
import { Box, ButtonIcon, Select } from '@/components/common';
import { AccordionView } from '../accordion-view';
import { DatePickerForm, InputForm, SelectForm } from '@/components/common/hook-form';
import { Button } from '../button';
import { baseEducation } from '../form';
import { SwitchForm } from '@/components/common/hook-form/switch';
import { EnumEducationSituation } from '@/services/api/curriculum/types';

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
    const current = data?.[index]



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
                label="Nome da instituição"
                fullWidth
                id={`educations.${index}.institution_name`}
                register={register(`educations.${index}.institution_name`)}
                name={`educations.${index}.institution_name`}
                errorMessage={errors?.[index]?.institution_name?.message}
              />
              <SelectForm
                label="Situação"
                control={control}
                name={`educations.${index}.situation`}
                fullWidth
                options={[
                  {
                    label: 'Não informado',
                    value: EnumEducationSituation.notInform
                  },
                  {
                    label: 'Cursando',
                    value: EnumEducationSituation.coursing
                  },
                  {
                    label: 'Completo',
                    value: EnumEducationSituation.complete
                  },
                  {
                    label: 'Incompleto',
                    value: EnumEducationSituation.incomplete
                  },
                  {
                    label: 'Trancado',
                    value: EnumEducationSituation.paused
                  },
                ]}
              />
            </Box>
            <Box
              gap={1}
              flexDirection={{
                '@initial': 'column',
                '@table-min': 'row'
              }}
            >
              <DatePickerForm 
                name={`educations.${index}.initial_date`}
                label="Início"
                fullWidth
                control={control}
                showMonthYearPicker
                dateFormat="MMM, yyyy"
                errorMessage={errors?.[index]?.final_date?.message}
              />
              <DatePickerForm 
                name={`educations.${index}.final_date`}
                label="Fim"
                fullWidth
                disabled={current?.is_main}
                control={control}
                showMonthYearPicker
                dateFormat="MMM, yyyy"
                errorMessage={errors?.[index]?.final_date?.message}
              />
            </Box>
            <SwitchForm
              name={`educations.${index}.is_main`}
              control={control} 
              label="Atual"
              errorMessage={errors?.[index]?.is_main?.message}
            />
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