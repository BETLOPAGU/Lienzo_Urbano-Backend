import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UserTypes } from 'src/users/enums/user-types.enum';

@InputType('UserType')
@ObjectType()
export class User {
  @Field(() => Int, { description: `ID from the user` })
  @IsInt()
  id: number;

  @Field(() => UserTypes, {
    description: `Type ID from the user`,
  })
  @IsInt()
  @Min(1)
  @Max(Object.keys(UserTypes).length / 2)
  typeId: number;

  @Field(() => String, { description: `First name from the user` })
  @IsString()
  firstName: string;

  @Field(() => String, { description: `Last name from the user` })
  @IsString()
  lastName: string;

  @Field(() => String, { description: `Email address from the user` })
  @IsEmail()
  email: string;

  @Field(() => String, { description: `Auth password from the user` })
  @IsString()
  pass: string;

  @Field(() => String, {
    nullable: true,
    description: `Phone number from the user`,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @Field(() => String, {
    nullable: true,
    description: `Gender from the user`,
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @Field(() => Date, {
    nullable: true,
    description: `Birthdate of the user`,
  })
  @IsOptional()
  birthdate?: Date;

  @Field(() => String, {
    nullable: true,
    description: `Home address from the user`,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @Field(() => String, {
    nullable: true,
    description: `Contact information from the user`,
  })
  @IsString()
  @IsOptional()
  contact?: string;

  @Field(() => String, {
    nullable: true,
    description: `URL from the AWS S3 where is stored the user photo`,
  })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @Field(() => String, {
    nullable: true,
    description: `Google UID for auth`,
  })
  @IsString()
  @IsOptional()
  googleUid?: string;

  @Field(() => String, {
    nullable: true,
    description: `Facebook UID for auth`,
  })
  @IsString()
  @IsOptional()
  facebookUid?: string;

  @Field(() => String, {
    nullable: true,
    description: `Firebase token`,
  })
  @IsString()
  @IsOptional()
  firebaseToken?: string;

  @Field(() => Date, {
    nullable: true,
    description: `Registration date of the user`,
  })
  @IsOptional()
  createdDate?: Date;

  @Field(() => Date, {
    nullable: true,
    description: `Date of deletion of the user`,
  })
  @IsOptional()
  deletedDate?: Date;

  @Field(() => Boolean, {
    nullable: true,
    description: `Boolean to know if the user is soft deleted`,
  })
  @IsOptional()
  isDeleted?: boolean;
}
