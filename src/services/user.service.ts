import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/dto/user.dto';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async save(user: AddUserDto) {
    return await this.userRepository.save(user);
  }
}
