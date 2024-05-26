import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import {
  BookConsultationResponseDto,
  CreateConsultationDto,
  GetPatientConsultationResponseDto,
  SearchConsultationsDto,
} from './dto/create-consultation.dto';
import { GetOfficer } from 'src/auth/decorators/officer.decorator';
import { JwtPayload } from 'src/auth/dto/auth.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Consultation')
@UseGuards(AuthGuard)
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  @ApiCreatedResponse({ status: 201, type: BookConsultationResponseDto })
  bookConsultation(
    @Body() payload: CreateConsultationDto,
    @GetOfficer() officer: JwtPayload,
  ) {
    return this.consultationService.bookConsultation(payload, officer);
  }

  @Get()
  @ApiResponse({ status: 200, type: GetPatientConsultationResponseDto })
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
