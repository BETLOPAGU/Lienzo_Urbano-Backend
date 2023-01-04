import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { EventTypes } from '../enums/event-types.enum';

@InputType('EventInput')
@ObjectType()
export class Event {
  @Field(() => Int, { description: `ID from the event` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the user` })
  @IsInt()
  userId: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;

  @Field(() => EventTypes, {
    description: `Type ID from the event`,
  })
  @IsInt()
  @Min(1)
  @Max(Object.keys(EventTypes).length / 2)
  typeId: number;

  @Field(() => Date, {
    nullable: true,
    description: `Creation date of the record`,
  })
  @IsOptional()
  createdDate?: Date;
}
