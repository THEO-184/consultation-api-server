import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginOfficerDto, PatientLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/officer')
  officerLogin(@Body() payload: LoginOfficerDto) {
    return this.authService.OfficerLogin(payload);
  }

  @Post('login/patient')
  PatientLogin(@Body() payload: PatientLoginDto) {
    return this.authService.PatientLogin(payload);
  }
}
