import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { UserResolver } from 'src/resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  providers: [UserResolver],
})
export class UserModule {}
