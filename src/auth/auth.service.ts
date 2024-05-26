import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, LoginOfficerDto, PatientLoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async OfficerLogin(data: LoginOfficerDto) {
    const officer = await this.prisma.officer.findUnique({
      where: { email: data.email },
      include: {
        healthFacility: {
          select: {
            name: true,
          },
        },
      },
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

  async PatientLogin(payload: PatientLoginDto) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: payload.id },
    });

    if (!patient) {
      throw new NotFoundException('unauthorized');
    }

    const jwtPayload: JwtPayload = {
      email: patient.email,
      id: patient.id,
    };

    const token = this.createToken(jwtPayload);

    return { token, patient };
  }

  private createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
