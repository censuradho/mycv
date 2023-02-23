import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CreateCurriculumDto } from "./dto/create";
import { QueryDto } from "./dto/query";

@Controller('curriculum')
export class CurriculumController {
  constructor (private readonly service: CurriculumService) {}
  
  @Post()
  async create (@Body() body: CreateCurriculumDto) {
    return await this.service.create(body)
  }

  @Get('me')
  async me (@Query() query:  QueryDto) {
    return await this.service.me(query)
  }

  @Get()
  async findAll (@Query() query:  QueryDto) {
    return await this.service.findAll(query)
  }
}