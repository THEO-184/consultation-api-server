import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async getMyConsultations(PatientId: number) {
    const consultations = await this.prisma.consultation.findMany({
      where: {
        patientId: PatientId,
      },
      include: {
        healthcareProvider: {
          select: {
            department: true,
            name: true,
          },
        },

        officer: {
          select: {
            name: true,
            healthFacility: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return { consultations, count: consultations.length };
  }
}
