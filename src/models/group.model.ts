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

  @Field({ nullable: false })
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  iconUrl?: string;

  @ManyToMany((type) => UserModel, (user) => user.id)
  users?: UserModel[];

  @Field()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
