import { Box, ButtonIcon, MarkdownEditor } from "@/components/common";
import { InputForm } from "@/components/common/hook-form";
import { useFieldArray } from "react-hook-form";

import { AccordionView } from "../accordion-view";
import { Button } from "../button";
import { EmploymentHistoryProps } from "./types";

import * as Styles from './styles'
import { baseEmployment } from "../form";

export function EmploymentHistory (props: EmploymentHistoryProps) {
  const {
    control,
    register,
    errors
  } = props


  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'experiences',
    keyName: '_id'
  })

  const renderFields = fields.map((value, index) => {
    const _value = value as any

   
    return (
      <Box key={_value._id} alignItems="flexStart" gap={1}>
        <AccordionView 
          title={_value?.office || '(Não especificado)'}
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
                id={`experience.${index}.office`}
                register={register(`experience.${index}.office`)}
                name={`experiences.${index}.office`}
              />
              <InputForm 
                label="Nome da empresa"
                fullWidth
                register={register(`experience.${index}.company_name`)}
                name={`experiences.${index}.company_name`}
              />
            </Box>
            <InputForm 
              label="Site da empresa"
              fullWidth
              register={register(`experience.${index}.company_site`)}
              name={`experiences.${index}.company_site`}
            />
            <MarkdownEditor 
              label="Descrição"
            />
          </Styles.Container>
        </AccordionView>
        <ButtonIcon 
          type="button"
          label="delete" 
          icon={{ name: 'delete' }} 
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