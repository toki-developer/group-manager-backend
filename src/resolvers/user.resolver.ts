import { Inject } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddUserDto } from 'src/dto/user.dto';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query((returns) => UserModel, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.userService.findOne(id);
  }

  @Mutation((returns) => UserModel)
  async saveUser(@Args('user') user: AddUserDto) {
    return await this.userService.save(user);
  }
}
