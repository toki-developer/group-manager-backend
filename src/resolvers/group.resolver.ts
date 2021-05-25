import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import { GroupModel } from 'src/models/group.model';
import { GroupService } from 'src/services/group.service';

@Resolver(() => GroupModel)
export class GroupResolver {
  constructor(@Inject(GroupService) private groupService: GroupService) {}

  @Query((returns) => GroupModel)
  async findGroup(@Args('searchId') searchId: string) {
    return await this.groupService.findGroup(searchId);
  }

  @Mutation((returns) => GroupModel, { nullable: true })
  async joinGroup(
    @Args('userId') userId: string,
    @Args('searchId') searchId: string,
  ) {
    return await this.groupService.joinGroup(userId, searchId);
  }

  @Mutation((returns) => GroupModel)
  async saveGroup(
    @Args('userId') userId: string,
    @Args('group') group: AddGroupDto,
  ) {
    return await this.groupService.save(userId, group);
  }

  @Mutation((returns) => GroupModel)
  async updateGroup(@Args('group') group: UpdateGroupDto) {
    return await this.groupService.update(group);
  }
}
