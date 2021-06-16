import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity('membership')
export class MembershipModel {
  @Field()
  @Column()
  stateFlg: number; // 0 承認待ち 1参加中 2削除済み

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.membership, { primary: true })
  user: UserModel;

  @Field(() => GroupModel)
  @ManyToOne(() => GroupModel, (group) => group.membership, { primary: true })
  group: GroupModel;
}
