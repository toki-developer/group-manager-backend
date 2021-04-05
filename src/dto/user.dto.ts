import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserDto {
  @Field()
  name: string;
}
