import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginOfficerDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginOfficerDto) {
    return this.authService.login(payload);
  }
}
