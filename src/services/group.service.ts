import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import { GroupModel } from 'src/models/group.model';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';
import { customAlphabet } from 'nanoid';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupModel)
    private groupRepository: Repository<GroupModel>,
    @Inject(UserService) private userService: UserService,
  ) {}

  async findGroup(searchId: string) {
    return this.groupRepository.findOne({ searchId });
  }

  async joinGroup(userId: string, searchId: string) {
    const targetGroup = await this.groupRepository.findOne({ searchId });
    await this.userService.addGroupByUser({
      userId,
      groupId: targetGroup.id,
      stateFlg: 0,
    });
    return targetGroup;
  }

  async withdrawal(userId: string, groupId: number) {
    return this.userService.deleteGroupByUser(userId, groupId);
  }

  async save(userId: string, group: AddGroupDto) {
    const nanoid = customAlphabet(
      '1234567890abcdefghijklmnopqestuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      10,
    );
    const searchId = nanoid();
    const addgroupData = { ...group, searchId };
    const newgroup = await this.groupRepository.save(addgroupData);
    this.userService.addGroupByUser({
      userId,
      groupId: newgroup.id,
      stateFlg: 1,
    });
    return newgroup;
  }

  async update(group: UpdateGroupDto) {
    const newgroup = await this.groupRepository.save(group);
    return newgroup;
  }
}
