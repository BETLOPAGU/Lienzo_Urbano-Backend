import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { NotificationTypes } from 'src/users/enums/notification-types.enum';

@ObjectType()
export class Notification {
  @Field(() => Int, { description: `ID from the notification` })
  @IsInt()
  id: number;

  @Field(() => Int, {
    description: `ID from the user who owns the notification`,
  })
  @IsInt()
  userId: number;

  @Field(() => NotificationTypes, {
    description: `Type ID from the notification`,
    nullable: true,
  })
  @IsInt()
  @Min(1)
  @Max(Object.keys(NotificationTypes).length / 2)
  @IsOptional()
  typeId?: number;

  @Field(() => String, {
    description: `Title of the notification`,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, {
    description: `Content of the notification`,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @Field(() => String, {
    description: `Link of the notification`,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  link?: string;

  @Field(() => String, {
    nullable: true,
    description: `Creation date of the notification`,
  })
  @IsOptional()
  createdDate?: Date;

  @Field(() => Boolean, {
    nullable: true,
    description: `Boolean to know if the user has viewed the notification`,
  })
  @IsOptional()
  viewed?: boolean;
}
