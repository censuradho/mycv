import { Curriculum, Experience } from "@/services/api/curriculum/types"
import { Control, UseFormRegister } from "react-hook-form"

export interface EducationHistoryProps {
  register: UseFormRegister<any>
  errors?: any
  control: Control<any, any>
  data: Curriculum['educations']
}