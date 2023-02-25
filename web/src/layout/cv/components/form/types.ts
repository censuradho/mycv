interface Experience {
  type: string,
  company_name: string,
  office: string,
  initial_date: string,
  final_date: string,
  is_main: boolean,
  description: string,
  company_site: string
}

export interface CvFormData {
  civil_state: string,
  availability: string
  presentation: string
  first_name: string
  last_name: string
  public_email: string
  contact_preference: string
  phone: string
  occupation: string
  experiences: Experience[]
}
