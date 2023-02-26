enum CivilState {
  doNotInform = 'doNotInform',
  married = 'married',
  single = 'single',
  divorced = 'divorced'
}

export interface Experience {
  employer: string,
  title: string,
  initial_date: string,
  final_date: string,
  description: string,
  is_main: boolean
}

export enum EnumContactPreference {
  phone = 'phone',
  cellPhone = 'cellPhone',
  whatsapp = 'whatsapp',
  telegram = 'telegram',
  email = 'email'
}

export enum EnumEducationLevel {
  highSchool = 'highSchool',
  universityEducation = 'universityEducation',
  onlineCourse = 'onlineCourse',
  classroomCourse = 'classroomCourse',
  certification = 'certification',
  trainingEvent = 'trainingEvent',
  technologist = 'technologist',
  technician = 'technician',
  doctorateDegree = 'doctorateDegree',
  postgraduateStudies = 'postgraduateStudies',
  master = 'master',
  phD = 'phD',
  specialization = 'specialization',
  training = 'training',
  improvement = 'improvement',
  recycling = 'recycling',
  professionalizing = 'professionalizing',
  extension = 'extension',
  exchange = 'exchange'
}

export enum EnumEducationSituation {
  notInform = 'notInform',
  complete = 'complete',
  coursing = 'coursing',
  paused = 'paused',
  incomplete = 'incomplete'
}

interface Address {
  city: string
  country: string
}

interface Education {
  title: string
  institution_name: string
  situation: keyof typeof EnumEducationSituation
  initial_date: string
  final_date: string
  level: keyof typeof EnumEducationLevel
  is_main: boolean
}


export interface Curriculum {
  id: string
  views: number
  searchable: boolean
  civil_state: keyof typeof CivilState
  title: string
  presentation: string
  phone: string
  public_email: string
  contact_preference: string
  first_name: string
  last_name: string
  is_pcd: boolean
  experiences?: Array<Experience>
  address?: Address
  educations?: Array<Education>
}

export interface CreateCurriculum extends Omit<Curriculum,
  'searchable'
  | 'views'
> {
}
