import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HealthcareProvidersService } from './healthcare-providers.service';
import { CreateHealthcareProviderDto } from './dto/create-healthcare-provider.dto';
import { UpdateHealthcareProviderDto } from './dto/update-healthcare-provider.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/auth/decorators/officer.decorator';

@UseGuards(AuthGuard)
@Controller('healthcare-providers')
export class HealthcareProvidersController {
  constructor(
    private readonly healthcareProvidersService: HealthcareProvidersService,
  ) {}

  @Post()
  create(@Body() createHealthcareProviderDto: CreateHealthcareProviderDto) {
    return this.healthcareProvidersService.create(createHealthcareProviderDto);
  }

  @Get()
  findAll(@GetUser('facilityId') facilityId: number) {
    return this.healthcareProvidersService.getFacilityHealthCareProviders(
      facilityId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthcareProvidersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHealthcareProviderDto: UpdateHealthcareProviderDto,
  ) {
    return this.healthcareProvidersService.update(
      +id,
      updateHealthcareProviderDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthcareProvidersService.remove(+id);
  }
}
