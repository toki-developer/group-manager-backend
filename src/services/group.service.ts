import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import { GroupModel } from 'src/models/group.model';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';

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

  async save(userId: string, group: AddGroupDto) {
    const nanoid = customAlphabet(
      '1234567890abcdefghijklmnopqestuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      10,
    );
    const searchId = nanoid();
    const addgroup = { ...group, searchId };
    const newgroup = await this.groupRepository.save(addgroup);
    this.userService.addGroupByUser({ userId, groupId: newgroup.id });
    return newgroup;
  }

  async update(group: UpdateGroupDto) {
    const newgroup = await this.groupRepository.save(group);
    return newgroup;
  }
}
