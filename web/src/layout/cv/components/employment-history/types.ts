import { Control, UseFormRegister } from "react-hook-form"

export interface EmploymentHistoryProps {
  register: UseFormRegister<any>
  errors?: any
  control: Control<any, any>
}