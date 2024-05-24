import { Module } from '@nestjs/common';
import { HealthcareProvidersService } from './healthcare-providers.service';
import { HealthcareProvidersController } from './healthcare-providers.controller';

@Module({
  controllers: [HealthcareProvidersController],
  providers: [HealthcareProvidersService],
})
export class HealthcareProvidersModule {}
