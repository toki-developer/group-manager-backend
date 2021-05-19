import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('group')
@Unique(['searchId'])
export class GroupModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ name: 'searchId' })
  searchId: string;

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
