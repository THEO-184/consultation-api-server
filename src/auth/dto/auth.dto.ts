import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginOfficerDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

export type JwtPayload = {
  email: string;
  id: number;
  facilityId: number;
};
