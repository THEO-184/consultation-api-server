import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfficerService {
  constructor(private prisma: PrismaService) {}

  create() {
    return `This action returns all officer`;
  }

  findAll() {
    return `This action returns all officer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} officer`;
  }

  update(id: number) {
    return `This action updates a #${id} officer`;
  }

  remove(id: number) {
    return `This action removes a #${id} officer`;
  }
}
