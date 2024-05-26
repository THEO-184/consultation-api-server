import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LoginOfficerDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

export class PatientLoginDto {
  @IsNumber()
  id: number;
}

export type JwtPayload = {
  email: string;
  id: number;
  facilityId?: number;
};

class HealthFacilityResponseDto {
  @IsString()
  name: string;
}

export class OfficerResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;

  @IsNumber()
  healthFacilityId: number;

  @ValidateNested()
  @Type(() => HealthFacilityResponseDto)
  healthFacility: HealthFacilityResponseDto;
}

export class LoginOfficerResponseDto {
  @IsString()
  token: string;

  @ValidateNested()
  @Type(() => OfficerResponseDto)
  officer: OfficerResponseDto;
}

export class PatientResponseDto {
  @IsNumber()
  id: number;
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}

export class LoginPatientResponseDto {
  @IsString()
  token: string;

  @ValidateNested()
  @Type(() => PatientResponseDto)
  patient: PatientResponseDto;
}
