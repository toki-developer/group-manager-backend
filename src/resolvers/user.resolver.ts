import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddUserDto } from 'src/dto/user.dto';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query((returns) => [UserModel])
  async users() {
    return await this.userService.findAll();
  }

  @Mutation((returns) => UserModel)
  async saveUser(@Args('user') user: AddUserDto) {
    return await this.userService.save(user);
  }
}
