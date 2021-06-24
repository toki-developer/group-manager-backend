import { MembershipModel } from './membership.model';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageModel } from 'src/models/message.model';

@ObjectType()
@Entity('user')
export class UserModel {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: true })
  iconUrl?: string;

  @OneToMany(() => MembershipModel, (membership) => membership.user, {
    cascade: true,
  })
  membership?: MembershipModel[];

  @OneToMany(() => MessageModel, (message) => message.user, {
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
