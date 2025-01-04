import { Injectable } from '@nestjs/common';
import { CreateUsercommentDto } from './dto/create-usercomment.dto';
import { UpdateUsercommentDto } from './dto/update-usercomment.dto';

@Injectable()
export class UsercommentsService {
  create(createUsercommentDto: CreateUsercommentDto) {
    return 'This action adds a new usercomment';
  }

  findAll() {
    return `This action returns all usercomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usercomment`;
  }

  update(id: number, updateUsercommentDto: UpdateUsercommentDto) {
    return `This action updates a #${id} usercomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} usercomment`;
  }
}
