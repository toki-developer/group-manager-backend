import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { group } from 'node:console';
import { truncate } from 'node:fs';
import { addGroupByUserDto, AddUserDto } from 'src/dto/user.dto';
import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import { In, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    @InjectRepository(GroupModel)
    private groupRepository: Repository<GroupModel>,
  ) {}

  async findOne(id: string) {
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

  async findGroupByUser(id: string): Promise<GroupModel[] | null> {
    const user = await this.userRepository.findOne({
      relations: ['groups'],
      where: { id: id },
    });
    return user.groups;
  }

  async findUserByGroup(id: number): Promise<UserModel[] | null> {
    const allUsers = await this.userRepository.find({
      relations: ['groups'],
    });
    const users = allUsers.filter((user) => {
      const u = user.groups.filter((group) => group.id == id);
      if (u.length > 0) return true;
    });
    return users;
  }
}
