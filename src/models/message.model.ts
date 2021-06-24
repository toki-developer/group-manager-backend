import { Field, ObjectType } from '@nestjs/graphql';
import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('message')
export class MessageModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => UserModel, (user) => user.message)
  user: UserModel;

  @ManyToOne(() => GroupModel, (group) => group.message)
  group: GroupModel;

  @Field()
  @Column()
  message: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
