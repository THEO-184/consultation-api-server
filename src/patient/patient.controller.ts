import { Controller, Get, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetPatient } from 'src/auth/decorators/patient.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPatientConsultationResponseDto } from 'src/consultation/dto/create-consultation.dto';

@ApiTags('Patient')
@UseGuards(AuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('consultations')
  @ApiResponse({ status: 200, type: GetPatientConsultationResponseDto })
  getMyConsultation(@GetPatient('id') id: number) {
    return this.patientService.getMyConsultations(id);
  }
}
