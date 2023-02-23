import { Controller } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";

@Controller()
export class CurriculumController {
  constructor (private readonly service: CurriculumService) {}
  
}