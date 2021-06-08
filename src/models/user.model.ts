import { Field, ObjectType } from '@nestjs/graphql';
import { GroupModel } from 'src/models/group.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToMany(() => GroupModel, (group) => group.id, {
    cascade: true,
  })
  @JoinTable()
  groups?: GroupModel[];

  @Field({ nullable: true })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
