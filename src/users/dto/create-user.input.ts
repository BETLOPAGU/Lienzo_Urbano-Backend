import { Field, InputType, OmitType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(User, ['id'] as const) {
  @Field(() => String, {
    nullable: true,
    description: `Photo from the user`,
  })
  @IsOptional()
  photo?: string;
}
