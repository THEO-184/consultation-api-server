import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
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
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  date: Date;

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
