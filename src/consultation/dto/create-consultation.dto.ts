import { HealthCareProviderDepartment } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;
}

export class CreateConsultationDto {
  @IsString()
  @IsNotEmpty()
  consultationType: string;

  @IsString()
  @IsNotEmpty()
  medicalCondition: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  healthcareProviderId: number;
  // remove isOPtional when frontend is ready
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date?: string;

  @ValidateNested()
  @Type(() => PatientDto)
  patient: PatientDto;
}

export class SearchConsultationsDto {
  // remove isOPtional when frontend is ready

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  patientName?: string;

  @IsString()
  @IsOptional()
  healthcareProvider?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  consultationType?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  medicalCondition?: string;
}

// RESPONSE DTOS

class PatientResponseDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  id: number;
}

class OfficerResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

class HealthCareProvideResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEnum(HealthCareProviderDepartment)
  department: HealthCareProviderDepartment;
}
class ConsultationResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  date: string;

  @IsString()
  consultationType: string;

  @IsString()
  medicalCondition: string;

  @IsString()
  notes: string;

  @IsNumber()
  officerId: number;

  @IsNumber()
  patientId: number;

  @IsNumber()
  healthcareProviderId: number;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @ValidateNested()
  @Type(() => HealthCareProvideResponseDto)
  healthcareProvider: HealthCareProvideResponseDto;

  @ValidateNested()
  @Type(() => OfficerResponseDto)
  officer: OfficerResponseDto;

  @ValidateNested()
  @Type(() => PatientResponseDto)
  patient: PatientResponseDto;
}

export class BookConsultationResponseDto {
  @ValidateNested()
  @Type(() => ConsultationResponseDto)
  consultation: ConsultationResponseDto;

  @IsString()
  message: string;
}

export class GetPatientConsultationResponseDto {
  @ValidateNested({ each: true })
  @Type(() => ConsultationResponseDto)
  consultations: ConsultationResponseDto[];

  @IsNumber()
  count: number;
}
