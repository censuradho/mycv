import { Injectable, Inject } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { randomUUID } from 'crypto'
import { PrismaService } from 'src/database/prisma.service'
import { ForbiddenException } from 'src/decorators/errors'
import { AuthRequest } from '../auth/models'
import { AvatarService } from '../avatar/avatar.service'
import { CreateCurriculumDto } from './dto/create'
import { QueryDto } from './dto/query'
import { CURRICULUM_ERRORS } from './errors'

@Injectable()
export class CurriculumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly avatar: AvatarService,
    @Inject(REQUEST) private readonly request: AuthRequest
  ) {}

  async create(payload: CreateCurriculumDto) {
    const curriculumExist = await this.prisma.curriculum.findUnique({
      where: {
        user_id: this.request.user.id,
      },
    })

    if (curriculumExist)
      throw new ForbiddenException(
        CURRICULUM_ERRORS.USER_ALREADY_RELATED_CURRICULUM
      )

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
        civil_state: payload?.civil_state,
        contact_preference: payload?.contact_preference,
        phone: payload?.phone,
        presentation: payload?.presentation,
        public_email: payload?.public_email,
        is_pcd: payload?.is_pcd,
        searchable: payload?.searchable,
        title: payload.title,
        first_name: payload.first_name,
        last_name: payload.last_name,
        ...(address && {
          address: {
            create: {
              id: randomUUID(),
              city: address.city,
              country: address.country,
            },
          },
        }),
        ...(portfolios && {
          portfolios: {
            create: portfolios?.map((value) => ({
              id: randomUUID(),
              icon: value?.icon,
              link: value?.link,
              name: value?.name,
            })),
          },
        }),
        ...(skills && {
          skills: {
            create: skills?.map((value) => ({
              id: randomUUID(),
              name: value.name,
            })),
          },
        }),
        ...(languages && {
          languages: {
            create: languages?.map((value) => ({
              id: randomUUID(),
              conversation: value.conversation,
              name: value.name,
              reading: value.reading,
              writing: value.writing,
            })),
          },
        }),
        ...(educations && {
          educations: {
            create: educations?.map((value) => ({
              id: randomUUID(),
              initial_date: value?.initial_date,
              final_date: value?.final_date,
              situation: value?.situation,
              level: value?.level,
              institution_name: value?.institution_name,
              is_main: value?.is_main,
            })),
          },
        }),
        ...(links && {
          links: {
            create: links?.map((value) => ({
              id: randomUUID(),
              href: value.href,
              icon: value.icon,
              name: value.name,
              description: value.description,
            })),
          },
        }),
        ...(experiences && {
          experiences: {
            create: experiences?.map((value) => ({
              id: randomUUID(),
              description: value?.description,
              is_main: value?.is_main,
              initial_date: value?.initial_date,
              final_date: value?.final_date,
              employer: value?.employer,
              title: value?.title,
            })),
          },
        }),
        user: {
          connect: {
            id: this.request.user.id,
          },
        },
      },
    })
  }

  async me() {
    return this.prisma.curriculum.findFirst({
      where: {
        user_id: this.request.user.id,
      },
      include: {
        address: true,
        educations: true,
        experiences: true,
        languages: true,
        links: true,
        portfolios: true,
        skills: true,
      },
    })
  }

  async findAll(query?: QueryDto) {
    return await this.prisma.curriculum.findMany({
      where: {
        ...(query?.q && {
          OR: [
            {
              address: {
                OR: [
                  {
                    city: {
                      startsWith: query?.q,
                    },
                  },
                  {
                    country: {
                      startsWith: query?.q,
                    },
                  },
                ],
              },
            },
            {
              languages: {
                some: {
                  name: {
                    startsWith: query?.q,
                  },
                },
              },
            },
            {
              public_email: {
                startsWith: query.q,
              },
            },
          ],
        }),
      },
      include: {
        address: true,
        educations: true,
        experiences: true,
        languages: true,
        links: true,
        portfolios: true,
        skills: true,
      },
    })
  }

  async avatarUpload(file: Express.Multer.File) {
    await this.avatar.upload(file, this.request.user.id)
  }

  async findAllSkillsByName(name: string) {
    return await this.prisma.skill.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
    })
  }
}
