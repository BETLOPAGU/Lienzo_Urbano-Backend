import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql"
import { Context } from '../index';
import { Field, ObjectType, InputType } from "type-graphql"
import { withId } from "../lib/mixins"
import PrismaClient from '../db/prisma'
import { USER_TYPES } from "../constants/types";
const prisma = PrismaClient.instance

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
class AbstractUser {
    @Field({ description: `Type ID from the user: ${JSON.stringify(USER_TYPES)}` })
    typeId!: number
    @Field({ description: `Name from the user` })
    name!: string
    @Field({ description: `Email address from the user` })
    email!: string
    @Field({ description: `Auth password from the user` })
    pass!: string
    @Field(type => String, {nullable: true, description: `Home address from the user`})
    address!: string | null
    @Field(type => String, {nullable: true, description: `Contact information from the user`})
    contact!: string | null
    @Field(type => String, {nullable: true, description: `URL from the AWS S3 where is stored the user photo`})
    photoUrl!: string | null
}

@ObjectType()
class User extends withId(AbstractUser) {}

@InputType()
class UserInput extends AbstractUser {}

@Resolver()
export class UsersResolvers {
    @Query(returns => [User], { description: "Return all users data" })
    async getUsers(@Ctx() ctx: Context): Promise<User[]> {
        return prisma.users.findMany()
    }

    @Query(returns => User, {nullable: true, description: "Return user data by ID"})
    async getUser(@Arg("id") id: number, @Ctx() ctx: Context): Promise<User | null> {
        return prisma.users.findUnique({where: {id}})
    }

    @Mutation(returns => User, { description: "Create a new user" })
    async createUser(@Arg("input") input: UserInput, @Ctx() ctx: Context): Promise<User> {
        return prisma.users.create({data: input})
    }

    @Mutation(returns => User, { description: "Update user data" })
    async updateUser(@Arg("id") id: number, @Arg("input") input: UserInput, @Ctx() ctx: Context): Promise<User> {
        return prisma.users.update({data: input, where: {id}})
    }

    @Mutation(returns => User, { description: "Delete user" })
    async deleteUser(@Arg("id") id: number, @Ctx() ctx: Context): Promise<User> {
        return prisma.users.delete({where: {id}})
    }
}
