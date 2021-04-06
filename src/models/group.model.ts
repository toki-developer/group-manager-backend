import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('group')
export class GroupModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: true })
  iconUrl?: string;

  @ManyToMany((type) => UserModel, (user) => user.id, {
    cascade: true,
  })
  users?: UserModel[];

  @Field()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
