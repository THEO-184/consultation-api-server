import { Injectable } from '@nestjs/common';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OfficerService {
  constructor(private prisma: PrismaService) {}
  async create(createOfficerDto: CreateOfficerDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createOfficerDto.password, saltOrRounds);
    return await this.prisma.officer.create({
      data: { ...createOfficerDto, password: hash },
    });
  }

  findAll() {
    return `This action returns all officer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} officer`;
  }

  update() {
    return `This action updates a #${id} officer`;
  }

  remove(id: number) {
    return `This action removes a #${id} officer`;
  }
}
