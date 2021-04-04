import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from 'src/models/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  readonly userMaps = new Map<number, UserModel>([
    [1, { id: 1, name: 'hige', iconUrl: 'hoge' }],
    [2, { id: 2, name: 'sample', iconUrl: 'user' }],
    [3, { id: 3, name: 'sample', iconUrl: 'hoge' }],
  ]);

  @Query(() => UserModel)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.userMaps.get(id);
  }
}
