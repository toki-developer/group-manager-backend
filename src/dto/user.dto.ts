import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserDto {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  iconUrl?: string;
}

@InputType()
export class addGroupByUserDto {
  @Field()
  userId: string;
  @Field()
  groupId: number;
}
