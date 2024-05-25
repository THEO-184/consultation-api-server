import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OfficerService } from './officer.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('officer')
export class OfficerController {
  constructor(private readonly officerService: OfficerService) {}

  @Post()
  create() {
    return this.officerService.create();
  }

  @Get()
  findAll() {
    return this.officerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.officerService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officerService.remove(+id);
  }
}
