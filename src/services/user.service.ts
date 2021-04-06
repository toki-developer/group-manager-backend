import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { group } from 'node:console';
import { addGroupByUserDto, AddUserDto } from 'src/dto/user.dto';
import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    @InjectRepository(GroupModel)
    private groupRepository: Repository<GroupModel>,
  ) {}

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async save(user: AddUserDto) {
    return await this.userRepository.save(user);
  }

  async addGroupByUser(affiliation: addGroupByUserDto) {
    const user = await this.userRepository.findOne({
      relations: ['groups'],
      where: { id: affiliation.userId },
    });
    const group = await this.groupRepository.findOne(affiliation.groupId);
    user.groups.push(group);
    return await this.userRepository.save(user);
  }

  async findGroupByUser(id: number): Promise<GroupModel[] | null> {
    const user = await this.userRepository.findOne({
      relations: ['groups'],
      where: { id: id },
    });
    return user.groups;
  }
}
