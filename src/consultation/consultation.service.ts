import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'src/auth/dto/auth.dto';

@Injectable()
export class ConsultationService {
  constructor(private prisma: PrismaService) {}
  async bookConsultation(payload: CreateConsultationDto, officer: JwtPayload) {
    const isValidHealthCareProvider =
      await this.prisma.healthFacility.findFirst({
        where: {
          AND: [
            { officer: { id: officer.id } },
            {
              HealthcareProviders: {
                some: { id: payload.healthcareProviderId },
              },
            },
          ],
        },
      });

    if (!isValidHealthCareProvider) {
      throw new NotFoundException('Health care provider not found');
    }

    const consultation = await this.prisma.consultation.create({
      data: {
        consultationType: payload.consultationType,
        medicalCondition: payload.medicalCondition,
        notes: payload.notes,
        officer: { connect: { id: officer.id } },
        healthcareProvider: { connect: { id: payload.healthcareProviderId } },
        patient: {
          connectOrCreate: {
            create: {
              ...payload.patient,
            },
            where: {
              email: payload.patient.email,
            },
          },
        },
      },
      include: {
        officer: {
          select: {
            id: true,
            name: true,
          },
        },
        healthcareProvider: {
          select: {
            id: true,
            department: true,
            name: true,
          },
        },
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return { consultation, message: 'consultation booked successfully' };
  }

  findAll() {
    return `This action returns all consultation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultation`;
  }

  update(id: number, updateConsultationDto: UpdateConsultationDto) {
    return `This action updates a #${id} consultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultation`;
  }
}
