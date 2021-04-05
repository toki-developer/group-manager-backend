import { Inject } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddGroupDto } from 'src/dto/group.dto';
import { GroupModel } from 'src/models/group.model';
import { GroupService } from 'src/services/group.service';

@Resolver(() => GroupModel)
export class GroupResolver {
  constructor(@Inject(GroupService) private groupService: GroupService) {}

  @Query((returns) => GroupModel, { nullable: true })
  async group(@Args('id', { type: () => ID }) id: number) {
    return await this.groupService.findOne(id);
  }

  @Mutation((returns) => GroupModel)
  async saveGroup(@Args('group') group: AddGroupDto) {
    return await this.groupService.save(group);
  }
}
