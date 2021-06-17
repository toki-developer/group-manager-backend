import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { addGroupByUserDto, AddUserDto } from 'src/dto/user.dto';
import { MembershipModel } from 'src/models/membership.model';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  async user(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => UserModel)
  async saveUser(@Args('user') user: AddUserDto) {
    return await this.userService.save(user);
  }

  @Mutation(() => UserModel)
  async addGroupByUser(@Args('affiliation') affiliation: addGroupByUserDto) {
    return await this.userService.addGroupByUser(affiliation);
  }

  @Query(() => [MembershipModel], { nullable: true })
  async groupsByUser(@Args('id') id: string) {
    return await this.userService.findGroupByUser(id);
  }

  // @Query(() => [UserModel], { nullable: true })
  // async usersByGroup(@Args('id', { type: () => Int }) id: number) {
  //   return await this.userService.findUserByGroup(id);
  // }
}
