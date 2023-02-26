import { FORM_ERROR_MESSAGES } from '@/constants/messages'
import * as y from 'yup'

export const curriculumValidationSchema = y.object({
  title: y.string().required(FORM_ERROR_MESSAGES.required),
  presentation: y.string().required(FORM_ERROR_MESSAGES.required),
  phone: y.string().required(FORM_ERROR_MESSAGES.required),
  public_email: y.string().email(FORM_ERROR_MESSAGES.invalid).required(FORM_ERROR_MESSAGES.required),
  contact_preference: y.string().required(FORM_ERROR_MESSAGES.required),
  first_name: y.string().required(FORM_ERROR_MESSAGES.required),
  last_name: y.string().required(FORM_ERROR_MESSAGES.required),
  is_pcd: y.boolean(),
})