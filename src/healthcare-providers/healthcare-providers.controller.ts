import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { HealthcareProvidersService } from './healthcare-providers.service';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetOfficer } from 'src/auth/decorators/officer.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcare Provider')
@UseGuards(AuthGuard)
@Controller('healthcare-providers')
export class HealthcareProvidersController {
  constructor(
    private readonly healthcareProvidersService: HealthcareProvidersService,
  ) {}

  @Get()
  findAll(@GetOfficer('facilityId') facilityId: number) {
    return this.healthcareProvidersService.getFacilityHealthCareProviders(
      facilityId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthcareProvidersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthcareProvidersService.remove(+id);
  }
}
