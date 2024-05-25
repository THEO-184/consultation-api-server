import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import {
  CreateConsultationDto,
  SearchConsultationsDto,
} from './dto/create-consultation.dto';
import { GetOfficer } from 'src/auth/decorators/officer.decorator';
import { JwtPayload } from 'src/auth/dto/auth.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  bookConsultation(
    @Body() payload: CreateConsultationDto,
    @GetOfficer() officer: JwtPayload,
  ) {
    return this.consultationService.bookConsultation(payload, officer);
  }

  @Get()
  getPatientConsultation(
    @Query() searchParams: SearchConsultationsDto,
    @GetOfficer('id') officerId: number,
  ) {
    return this.consultationService.getPatientConsultation(
      searchParams,
      officerId,
    );
  }
}
