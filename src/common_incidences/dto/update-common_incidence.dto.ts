import { PartialType } from '@nestjs/swagger';
import { CreateCommonIncidenceDto } from './create-common_incidence.dto';

export class UpdateCommonIncidenceDto extends PartialType(CreateCommonIncidenceDto) {}
