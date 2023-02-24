import { Box } from "@/components/common";
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
    remove 
  } = useFieldArray({
    control,
    name: 'experiences',
    keyName: '_id'
  })

  const renderFields = fields.map((value, index) => (
    <AccordionView 
      key={value._id} 
      title="(Não especificado)"
      onClickMenu={() => {}}
    >
      <Styles.Container>
        <InputForm 
          label="Cargo"
          register={register(`experience.${index}.office`)}
          name={`experiences.${index}.office`}
        />
        <InputForm 
          label="Nome da empresa"
          register={register(`experience.${index}.company_name`)}
          name={`experiences.${index}.company_name`}
        />
      </Styles.Container>
    </AccordionView>
  ))

  return (
    <>
      {renderFields}
      <Box marginTop={2}>
        <Button onClick={() => append(baseEmployment)}>Add experiência</Button>
      </Box>
    </>
  )
}