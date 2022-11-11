import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql"
import { Context } from '../index';
import { Field, ObjectType, InputType } from "type-graphql"
import { withId } from "../lib/mixins"
import PrismaClient from '../db/prisma'
const prisma = PrismaClient.instance

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
class AbstractArtwork {
    @Field({ description: `ID from the artist` })
    artistId!: number
    @Field({ description: `Title of the artwork` })
    title!: string
    @Field({ description: `Description of the artwork` })
    description!: string
    @Field(type => String, {nullable: true, description: `URL from the AWS S3 where is stored the artwork image`})
    imageUrl!: string | null
    @Field(type => Date, {nullable: true, description: `Publication date of the artwork`})
    publicationDate!: Date | null
    @Field(type => String, {nullable: true, description: `Categories to which the artwork belongs`})
    categories!: string | null
}

@ObjectType()
class Artwork extends withId(AbstractArtwork) {}

@InputType()
class ArtworkInput extends AbstractArtwork {}

@Resolver()
export class ArtworksResolvers {
    @Query(returns => [Artwork], { description: "Return all users data" })
    async getArtworks(@Ctx() ctx: Context): Promise<Artwork[]> {
        return prisma.artworks.findMany()
    }
    @Query(returns => [Artwork], { description: "Return all users data" })
    async getArtworksByCategory(@Arg("categoryName") categoryName: string, @Ctx() ctx: Context): Promise<Artwork[]> {
        return prisma.artworks.findMany({
            where: {
                categories: {
                    contains: categoryName
                }
            }
        })
    }

    @Query(returns => Artwork, {nullable: true, description: "Return user data by ID"})
    async getArtwork(@Arg("id") id: number, @Ctx() ctx: Context): Promise<Artwork | null> {
        return prisma.artworks.findUnique({where: {id}})
    }

    @Mutation(returns => Artwork, { description: "Create a new user" })
    async createArtwork(@Arg("input") input: ArtworkInput, @Ctx() ctx: Context): Promise<Artwork> {
        return prisma.artworks.create({data: input})
    }

    @Mutation(returns => Artwork, { description: "Update user data" })
    async updateArtwork(@Arg("id") id: number, @Arg("input") input: ArtworkInput, @Ctx() ctx: Context): Promise<Artwork> {
        return prisma.artworks.update({data: input, where: {id}})
    }

    @Mutation(returns => Artwork, { description: "Delete user" })
    async deleteArtwork(@Arg("id") id: number, @Ctx() ctx: Context): Promise<Artwork> {
        return prisma.artworks.delete({where: {id}})
    }
}
