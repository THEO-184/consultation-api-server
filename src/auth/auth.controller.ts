import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginOfficerDto,
  LoginOfficerResponseDto,
  LoginPatientResponseDto,
  PatientLoginDto,
} from './dto/auth.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/officer')
  @ApiCreatedResponse({ status: 201, type: LoginOfficerResponseDto })
  officerLogin(@Body() payload: LoginOfficerDto) {
    return this.authService.OfficerLogin(payload);
  }

  @Post('login/patient')
  @ApiCreatedResponse({ status: 201, type: LoginPatientResponseDto })
  PatientLogin(@Body() payload: PatientLoginDto) {
    return this.authService.PatientLogin(payload);
  }
}
