import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import { UserResolver } from 'src/resolvers/user.resolver';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, GroupModel])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
