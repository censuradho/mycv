import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CurriculumController } from "./curriculum.controller";
import { CurriculumService } from "./curriculum.service";

@Module({
  providers: [PrismaService, CurriculumService],
  controllers: [CurriculumController]
})
export class CurriculumModule {}