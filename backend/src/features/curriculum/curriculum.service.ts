import { Injectable, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { randomUUID } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { ForbiddenException } from "src/decorators/errors";
import { AuthRequest } from "../auth/models";
import { CreateCurriculumDto } from "./dto/create";
import { CURRICULUM_ERRORS } from "./errors";

@Injectable()
export class CurriculumService {
  constructor (
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: AuthRequest
  ) {}

  async create (payload: CreateCurriculumDto) {
    const curriculumExist = await this.prisma.curriculum.findUnique({ 
      where: {
        user_id: this.request.user.id
      }
    })

    if (curriculumExist) throw new ForbiddenException(CURRICULUM_ERRORS.USER_ALREADY_RELATED_CURRICULUM)

    const {
      address,
      portfolios = [],
      educations = [],
      experiences = [],
      links = [],
      skills = [],
      languages = [],
     } = payload

    return await this.prisma.curriculum.create({
      data: {
        id: randomUUID(),
        availability: payload?.availability,
        civil_state: payload?.civil_state,
        contact_preference: payload?.contact_preference,
        number: payload?.number,
        presentation: payload?.presentation,
        public_email: payload?.public_email,
        is_pcd: payload?.is_pcd,
        searchable: payload?.searchable,
        ...(address && ({
          address: {
            create: {
              id: randomUUID(),
              city: address.city,
              country: address.country,
              region: address.region,
            }
          }
        })),
        ...(portfolios && ({
          portfolios: {
            create: portfolios?.map(value => ({
              id: randomUUID(),
              icon: value?.icon,
              link: value?.link,
              name: value?.name,
            }))
          }
        })),
        ...(skills && ({
          skills: {
            create: skills?.map(value => ({
              id: randomUUID(),
              name: value.name,
            }))
          }
        })),
        ...(languages && ({
          languages: {
            create: languages?.map(value => ({
              id: randomUUID(),
              conversation: value.conversation,
              name: value.name,
              reading: value.reading,
              writing: value.writing,
            }))
          }
        })),
        ...(educations && ({
          educations: {
            create: educations?.map(value => ({
              id: randomUUID(),
              initial_date: value?.initial_date,
              final_date: value?.final_date,
              situation: value?.situation,
              level: value?.level,
              institution_name: value?.institution_name,
              is_main: value?.is_main,
            }))
          }
        })),
        ...(links && ({
          links: {
            create: links?.map(value => ({
              id: randomUUID(),
              href: value.href,
              icon: value.icon,
              name: value.name,
              description: value.description,
            }))
          }
        })),
        ...(experiences && ({
          experiences: {
            create: experiences?.map(value => ({
              id: randomUUID(),
              company_site: value?.company_site,
              description: value?.description,
              is_main: value?.is_main,
              initial_date: value?.initial_date,
              final_date: value?.final_date,
              company_name: value?.company_name,
              office: value?.office,
              type: value?.type,
            }))
          }
        })),
        user: {
          connect: {
            id: this.request.user.id
          }
        }
      }
    })
    return payload
  }
}