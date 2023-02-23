import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

enum EducationLevel {
  /*Ensino médio**/
  highSchool = 'highSchool',
  /*Ensino superior**/
  universityEducation = 'universityEducation',
  /*Curso online**/
  onlineCourse = 'onlineCourse',
  /*Curso presencial**/
  classroomCourse = 'classroomCourse',
  /*Certificação**/
  certification = 'certification',
  /*Evento de formação**/
  trainingEvent = 'trainingEvent',
  /*Tecnólogo**/
  technologist = 'technologist',
  /*Técnico**/
  technician = 'technician',
  /*Doutorado**/
  doctorateDegree = 'doctorateDegree',
  /*Pós-graduação**/
  postgraduateStudies = 'postgraduateStudies',
  /*Mestrado**/
  master = 'master',
  /*PHD**/
  phD = 'phD',
  /*Especialização**/
  specialization = 'specialization',
  /*Capacitação**/
  training = 'training',
  /*Aperfeiçoamento**/
  improvement = 'improvement',
  /*Reciclagem**/
  recycling = 'recycling',
  /*Profissionalizante**/
  professionalizing = 'professionalizing',
  /*Extensão**/
  extension = 'extension',
  /*Intercambio**/
  exchange = 'exchange'
}

enum SituationEducation {
  /*Não informar**/
  notInform = 'notInform',
  /*Completo**/
  complete = 'complete',
  /*Cursando**/
  coursing = 'coursing',
  /*Pausado**/
  paused = 'paused',
  /*Incompleto**/
  incomplete = 'incomplete'
}

enum CivilState {
  doNotInform = 'doNotInform',
  married = 'married',
  single = 'single',
  divorced = 'divorced'
}

enum ContactPreference {
  phone = 'phone',
  cellPhone = 'cellPhone',
  whatsapp = 'whatsapp',
  telegran = 'telegran',
  email = 'email',
}

class Education {
  @IsEnum(EducationLevel)
  level: EducationLevel

  @IsString()
  institution_name: string

  @IsEnum(SituationEducation)
  situation: SituationEducation

  @IsDateString()
  initial_date: string

  @IsDateString()
  final_date: string

  @IsOptional()
  @IsBoolean()
  is_main: boolean
}

enum ExperienceType {
  professional = 'professional',
  production = 'production',
  volunteering = 'volunteering'
}

class Experience {
  @IsEnum(ExperienceType)
  type: ExperienceType

  @IsString()
  company_name: string

  @IsString()
  office: string

  @IsDateString()
  initial_date: string

  @IsDateString()
  final_date: string

  @IsOptional()
  @IsBoolean()
  is_main: boolean

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString() 
  company_site: string
}

enum LanguageLevel {
  basic = 'basic',
  intermediate = 'intermediate',
  proficient = 'proficient',
  advanced = 'advanced',
  fluent = 'fluent'
}
class Language {
  @IsString()
  name: string

  @IsEnum(LanguageLevel)
  conversation: LanguageLevel

  @IsEnum(LanguageLevel)
  reading: LanguageLevel

  @IsEnum(LanguageLevel)
  writing: LanguageLevel
}

class Skill {
  @IsString()
  name: string
}
export class CreateCurriculumDto {
  @IsEnum(CivilState)
  civil_state: CivilState

  @IsOptional()
  @IsString()
  availability: string

  @IsString()
  presentation: string

  @IsString()
  number: string

  @IsString()
  public_email: string
  
  @IsEnum(ContactPreference)
  contact_preference: ContactPreference

  @IsOptional()
  @IsBoolean()
  is_pcd?: string

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Education)
  @IsArray()
  educations: Education[]

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Experience)
  @IsArray()
  experiences: Experience[]

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Language)
  @IsArray()
  languages: Language[]

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Skill)
  @IsArray()
  skills: Skill[]
}