import { Injectable } from '@nestjs/common';
import { CreateHealthcareProviderDto } from './dto/create-healthcare-provider.dto';
import { UpdateHealthcareProviderDto } from './dto/update-healthcare-provider.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthcareProvidersService {
  constructor(private prism: PrismaService) {}
  create(officer: CreateHealthcareProviderDto) {
    return 'This action adds a new healthcareProvider';
  }

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

  update(id: number, updateHealthcareProviderDto: UpdateHealthcareProviderDto) {
    return `This action updates a #${id} healthcareProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthcareProvider`;
  }
}
