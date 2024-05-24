import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, LoginOfficerDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginOfficerDto) {
    const officer = await this.prisma.officer.findUnique({
      where: { email: data.email },
    });

    if (!officer) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      officer.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = {
      email: officer.email,
      id: officer.id,
      facilityId: officer.healthFacilityId,
    };

    const token = this.createToken(payload);
    delete officer.password;
    return { token, officer };
  }

  private createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
