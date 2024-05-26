import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthcareProvidersService {
  constructor(private prism: PrismaService) {}

  async getFacilityHealthCareProviders(facilityId: number) {
    const healthcareProviders = await this.prism.healthcareProvider.findMany({
      where: { healthFacilityId: facilityId },
      include: {
        _count: { select: { consultations: true } },
      },
      orderBy: { consultations: { _count: 'asc' } },
    });
    return { healthcareProviders };
  }

  findOne(id: number) {
    return `This action returns a #${id} healthcareProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthcareProvider`;
  }
}
