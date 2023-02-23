import { IsOptional, IsString } from "class-validator";

enum Index {
  'address.' = 'address'
}
export class QueryDto {
  @IsOptional()
  @IsString()
  q: string
}