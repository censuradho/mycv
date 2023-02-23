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

class Education {
  @IsEnum(EducationLevel)
  level: EducationLevel

  @IsString()
  institution_name: string

  @IsString()
  name: string

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

export class CreateCurriculumDto {
  @IsString()
  civil_state: string

  @IsString()
  availability: string

  @IsString()
  presentation: string

  @IsString()
  number: string

  @IsString()
  public_email: string
  
  @IsString()
  contact_preference: string

  @IsOptional()
  @IsBoolean()
  is_pcd?: string

  @ValidateNested({ each: true })
  @Type(() => Education)
  education: Education[]
}