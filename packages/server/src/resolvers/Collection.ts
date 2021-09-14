import 'reflect-metadata'
import { Prisma } from '@prisma/client'
import slug from 'slug'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Args,
    ArgsType,
    Ctx,
    InputType,
    Field,
    Authorized,
    Extensions,
    UseMiddleware,
    MiddlewareFn,
    ObjectType,
    Root,
    Int,
} from 'type-graphql'
import Collection from '../models/Collection'
import { Context } from '../context'

@InputType()
class CollectionUpdateInput {
    @Field()
    title: string

    @Field((type) => Int)
    id: number
}

export const isAuth: MiddlewareFn<Context> = ({ context, info }, next) => {
    return next()
}

@Resolver(Collection)
export default class CollectionResolver {
    @Query(() => Collection)
    async collectionById(
        @Arg('id', (type) => Int) id: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.product.findUnique({
            where: { id },
        })
    }

    @Query(() => [Collection])
    async getCollections(@Ctx() ctx: Context) {
        return ctx.prisma.collection.findMany({
            include: {
                products: true,
            },
        })
    }

    @Mutation(() => Collection)
    async createCollection(@Arg('title') title: string, @Ctx() ctx: Context) {
        // use title & timestamp to create slug
        const sluged = slug(title)
        const timestamp = new Date().getTime().toString()

        return ctx.prisma.collection.create({
            data: {
                title,
                slug: [sluged, timestamp].join('-'),
            },
        })
    }

    @Mutation(() => Collection)
    async updateCollection(
        @Arg('data') data: CollectionUpdateInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.collection.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
            },
        })
    }

    @Mutation(() => Collection)
    async delCollection(
        @Arg('id', (type) => Int) id: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.collection.delete({
            where: {
                id,
            },
        })
    }
}
