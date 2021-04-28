import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import { GroupResolver } from 'src/resolvers/group.resolver';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupModel, UserModel])],
  providers: [GroupService, GroupResolver, UserService],
})
export class GroupModule {}
