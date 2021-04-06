import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModel } from 'src/models/group.model';
import { GroupResolver } from 'src/resolvers/group.resolver';
import { GroupService } from 'src/services/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupModel])],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
