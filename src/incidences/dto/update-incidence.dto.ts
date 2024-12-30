import { PartialType } from '@nestjs/swagger';
import { CreateIncidenceDto } from './create-incidence.dto';

export class UpdateIncidenceDto extends PartialType(CreateIncidenceDto) {}
