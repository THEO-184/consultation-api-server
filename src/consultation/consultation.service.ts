import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateConsultationDto,
  SearchConsultationsDto,
} from './dto/create-consultation.dto';

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

  async getPatientConsultation(
    payload: SearchConsultationsDto,
    officerId: number,
  ) {
    const {
      consultationType,
      date,
      healthcareProvider,
      medicalCondition,
      patientName,
    } = payload;
    const consultation = await this.prisma.consultation.findMany({
      where: {
        AND: [
          { officerId },
          {
            OR: [
              {
                date: date ? { equals: new Date(date) } : undefined,
              },
              {
                consultationType: consultationType
                  ? { contains: consultationType, mode: 'insensitive' }
                  : undefined,
              },
              {
                healthcareProvider: healthcareProvider
                  ? {
                      name: {
                        contains: healthcareProvider,
                        mode: 'insensitive',
                      },
                    }
                  : undefined,
              },
              {
                patient: patientName
                  ? {
                      OR: [
                        {
                          firstName: {
                            contains: patientName,
                            mode: 'insensitive',
                          },
                        },
                        {
                          lastName: {
                            contains: patientName,
                            mode: 'insensitive',
                          },
                        },
                      ],
                    }
                  : undefined,
              },
              {
                medicalCondition: medicalCondition
                  ? { contains: medicalCondition }
                  : undefined,
              },
            ],
          },
        ],
      },
      include: {
        healthcareProvider: true,
        officer: true,
        patient: true,
      },
    });

    return { consultation, count: consultation.length };
  }
}
