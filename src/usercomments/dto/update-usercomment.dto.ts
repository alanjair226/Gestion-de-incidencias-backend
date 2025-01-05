import { PartialType } from '@nestjs/mapped-types';
import { CreateUsercommentDto } from './create-usercomment.dto';

export class UpdateUsercommentDto extends PartialType(CreateUsercommentDto){}