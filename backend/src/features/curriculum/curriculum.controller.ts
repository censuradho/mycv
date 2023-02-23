import { Controller, Post, Body } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CreateCurriculumDto } from "./dto/create";

@Controller('curriculum')
export class CurriculumController {
  constructor (private readonly service: CurriculumService) {}
  
  @Post()
  async create (@Body() body: CreateCurriculumDto) {
    return await this.service.create(body)
  }
}