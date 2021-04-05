import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddGroupDto } from 'src/dto/group.dto';
import { GroupModel } from 'src/models/group.model';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupModel)
    private groupRepository: Repository<GroupModel>,
  ) {}

  async findOne(id: number) {
    return this.groupRepository.findOne(id);
  }

  async save(group: AddGroupDto) {
    return await this.groupRepository.save(group);
  }
}
