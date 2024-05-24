import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateOfficerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
