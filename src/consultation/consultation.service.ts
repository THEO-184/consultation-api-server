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
        date: new Date(payload.date),
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

    const startDate = date ? this.startOfDay(date) : undefined;
    const endDate = date ? this.endOfDay(date) : undefined;

    const consultations = await this.prisma.consultation.findMany({
      where: {
        AND: [
          { officerId },
          {
            AND: [
              {
                date: date ? { gte: startDate, lte: endDate } : undefined,
              },
              {
                consultationType: consultationType
                  ? { contains: consultationType, mode: 'insensitive' }
                  : undefined,
              },
              {
                healthcareProvider: healthcareProvider
                  ? { id: parseInt(healthcareProvider) }
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

    return { consultations, count: consultations.length };
  }

  private startOfDay = (dateString: string): Date => {
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  };

  private endOfDay = (dateString: string): Date => {
    const date = new Date(dateString);
    date.setUTCHours(23, 59, 59, 999);
    return date;
  };
}
