import { PartialType } from '@nestjs/swagger';
import { CreateUsercommentDto } from './create-usercomment.dto';

export class UpdateUsercommentDto extends PartialType(CreateUsercommentDto) {}
