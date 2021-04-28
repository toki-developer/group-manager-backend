import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddGroupDto } from 'src/dto/group.dto';
import { GroupModel } from 'src/models/group.model';
import { UserService } from 'src/services/user.service';
import { createConnection, createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupModel)
    private groupRepository: Repository<GroupModel>,
    @Inject(UserService) private userService: UserService,
  ) {}

  async findOne(id: number) {
    return this.groupRepository.findOne(id);
  }

  async save(id: number, group: AddGroupDto) {
    const newgroup = await this.groupRepository.save(group);
    this.userService.addGroupByUser({ userId: id, groupId: newgroup.id });
    return newgroup;
  }
}
