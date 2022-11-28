import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: `Email address from the user` })
  @IsEmail()
  email: string;

  @Field(() => String, { description: `Auth password from the user` })
  @IsString()
  pass: string;
}
