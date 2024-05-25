import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginOfficerDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

export class PatientLoginDto {
  @IsEmail()
  email: string;

  @IsNumber()
  id: number;
}

export type JwtPayload = {
  email: string;
  id: number;
  facilityId?: number;
};
