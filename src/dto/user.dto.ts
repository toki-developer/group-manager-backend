import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserDto {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  iconUrl?: string;
}

@InputType()
export class addGroupByUserDto {
  @Field()
  userId: number;
  @Field()
  groupId: number;
}
