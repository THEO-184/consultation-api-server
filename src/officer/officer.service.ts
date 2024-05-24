import { Injectable } from '@nestjs/common';

import { UpdateOfficerDto } from './dto/update-officer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OfficerService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return `This action returns all officer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} officer`;
  }

  update(id: number, updateOfficerDto: UpdateOfficerDto) {
    return `This action updates a #${id} officer`;
  }

  remove(id: number) {
    return `This action removes a #${id} officer`;
  }
}
