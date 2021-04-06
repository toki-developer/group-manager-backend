import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { GroupModel } from 'src/models/group.model';
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
@Entity('user')
export class UserModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column()
  name: string;

  @Field({ nullable: false })
  @Column()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  iconUrl?: string;

  @ManyToMany((type) => GroupModel, (group) => group.id, {
    cascade: true,
  })
  @JoinTable()
  groups?: GroupModel[];

  @Field()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
