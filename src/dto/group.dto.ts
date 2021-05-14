import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddGroupDto {
  @Field()
  name: string;
  @Field()
  iconUrl?: string;
}

@InputType()
export class UpdateGroupDto {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  iconUrl?: string;
}
