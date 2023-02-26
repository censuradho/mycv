import { Box, ButtonIcon } from "@/components/common";
import { DatePickerForm, EditorForm, InputForm } from "@/components/common/hook-form";
import { useFieldArray } from "react-hook-form";

import { AccordionView } from "../accordion-view";
import { Button } from "../button";
import { EmploymentHistoryProps } from "./types";

import { SwitchForm } from "@/components/common/hook-form/switch";
import { format } from "@/lib/date-fns";
import { baseEmployment } from "../form";
import * as Styles from './styles';

export function EmploymentHistory (props: EmploymentHistoryProps) {
  const {
    control,
    register,
    errors,
    experiences
  } = props


  const {
    fields,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: 'experiences',
    keyName: '_id'
  })


  const renderFields = fields.map((value, index) => {
    const _value = value as any
    const experience = experiences?.[index]

    const { initial_date, final_date } = experience || {}

    const title = `${experience?.title}  ${experience?.employer && '- ' + experience?.employer}`
    const fromTo = `${initial_date && format(new Date(initial_date), 'MMM yyyy')} ${final_date && '- ' + format(new Date(final_date), 'MMM yyyy')}`

    return (
      <Box key={_value._id} alignItems="flexStart" gap={0.1}>
        <AccordionView 
          title={title.trim() || '(Não especificado)'}
          subTitle={fromTo.trim()}
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
                label="Cargo"
                fullWidth
                id={`experience.${index}.title`}
                register={register(`experiences.${index}.title`)}
                name={`experiences.${index}.title`}
                errorMessage={errors?.[index]?.title?.message}
              />
              <InputForm 
                label="Nome da empresa"
                fullWidth
                register={register(`experiences.${index}.employer`)}
                name={`experiences.${index}.employer`}
                errorMessage={errors?.[index]?.employer?.message}
              />
            </Box>
            <SwitchForm
              name={`experiences.${index}.is_main`}
              control={control} 
              label="Atual"
              errorMessage={errors?.[index]?.is_main?.message}
            />
            <Box gap={1}>
              <DatePickerForm
                name={`experiences.${index}.initial_date`}
                control={control}
                label="Início"
                fullWidth
                showMonthYearPicker
                dateFormat="MMM, yyyy"
                errorMessage={errors?.[index]?.initial_date?.message}
              />
              <DatePickerForm
                name={`experiences.${index}.final_date`}
                label="Fim"
                fullWidth
                disabled={experience?.is_main}
                control={control}
                showMonthYearPicker
                dateFormat="MMM, yyyy"
                errorMessage={errors?.[index]?.final_date?.message}
              />
            </Box>
            <EditorForm
              id={`experiences.${index}.description`}
              label="Descrição"
              name={`experiences.${index}.description`}
              control={control}
              errorMessage={errors?.[index]?.description?.message}
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
        <Button onClick={() => append(baseEmployment)}>Add experiência</Button>
      </Box>
    </>
  )
}