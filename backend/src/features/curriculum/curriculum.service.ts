import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateCurriculumDto } from "./dto/create";

@Injectable()
export class CurriculumService {
  constructor (private readonly prisma: PrismaService) {}

  async create (payload: CreateCurriculumDto) {
    return payload
  }
}