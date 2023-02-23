import { IsBoolean, IsOptional, IsString } from "class-validator";

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
}