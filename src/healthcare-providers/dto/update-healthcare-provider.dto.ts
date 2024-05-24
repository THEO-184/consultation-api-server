import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthcareProviderDto } from './create-healthcare-provider.dto';

export class UpdateHealthcareProviderDto extends PartialType(CreateHealthcareProviderDto) {}
