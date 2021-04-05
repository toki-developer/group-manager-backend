import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { UserResolver } from 'src/resolvers/user.resolver';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
