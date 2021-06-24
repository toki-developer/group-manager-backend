import { Field, ObjectType } from '@nestjs/graphql';
import { MembershipModel } from 'src/models/membership.model';
import { MessageModel } from 'src/models/message.model';
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
  @Field()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

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

  @OneToMany(() => MessageModel, (message) => message.group, {
    cascade: true,
  })
  message?: MessageModel[];

  @Field({ nullable: true })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
