import { Controller, Get, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetPatient } from 'src/auth/decorators/patient.decorator';

@UseGuards(AuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('consultations')
  getMyConsultation(@GetPatient('id') id: number) {
    return this.patientService.getMyConsultations(id);
  }
}
