import { Controller, Post, Body, Get } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CreateCurriculumDto } from "./dto/create";

@Controller('curriculum')
export class CurriculumController {
  constructor (private readonly service: CurriculumService) {}
  
  @Post()
  async create (@Body() body: CreateCurriculumDto) {
    return await this.service.create(body)
  }

  @Get('me')
  async me () {
    return await this.service.me()
  }

  @Get()
  async findAll () {
    return await this.service.findAll()
  }
}