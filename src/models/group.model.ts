import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MembershipModel } from 'src/models/membership.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => MembershipModel, (membership) => membership.group, {
    cascade: true,
  })
  membership?: MembershipModel[];

  @Field({ nullable: true })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
