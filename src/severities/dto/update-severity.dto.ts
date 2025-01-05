import { PartialType } from '@nestjs/mapped-types';
import { CreateSeverityDto } from './create-severity.dto';

export class UpdateSeverityDto extends PartialType(CreateSeverityDto){}
