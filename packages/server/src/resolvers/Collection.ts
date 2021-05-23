import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg, Ctx, InputType, Field } from 'type-graphql'
import { omit } from 'lodash'
import Collection from '../models/Collection'
import { Context } from '../context'

@InputType()
export class CollectionCreateInput {
    @Field()
    name: string

    @Field()
    slug: string

    @Field()
    id?: number
}

@Resolver(Collection)
export default class CollectionResolver {
    @Query(() => Collection)
    async collectionById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.product.findUnique({
            where: { id },
        })
    }

    @Query(() => [Collection])
    async allCollections(@Ctx() ctx: Context) {
        return ctx.prisma.collection.findMany()
    }

    @Mutation(() => Collection)
    async createCollection(@Arg('data') data: CollectionCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.collection.create({
            data,
        })
    }

    @Mutation(() => Collection)
    async updateCollection(@Arg('data') data: CollectionCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.collection.update({
            where: {
                id: data.id,
            },
            data: {
                ...omit(data, ['id']),
            },
        })
    }

    @Mutation(() => Collection)
    async delCollection(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.collection.delete({
            where: {
                id,
            },
        })
    }
}
