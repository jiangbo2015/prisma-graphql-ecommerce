import 'reflect-metadata'
import { Prisma } from '@prisma/client'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    InputType,
    Field,
    Authorized,
    Extensions,
    UseMiddleware,
    MiddlewareFn,
    ObjectType,
    Root,
} from 'type-graphql'
import { omit } from 'lodash'
import Collection from '../models/Collection'
import { Context } from '../context'

@InputType()
export class CollectionCreateInput {
    @Field()
    name: string

    @Field()
    slug: string
}

@InputType()
export class CollectionUpdateInput extends CollectionCreateInput {
    @Field()
    id: number
}

@ObjectType()
export class CollectionWithCount extends Collection {
    @Field()
    productCount: number
}

export const isAuth: MiddlewareFn<Context> = ({ context, info }, next) => {
    console.dir(info.parentType.getFields()[info.fieldName].extensions)

    return next()
}

@Resolver(Collection)
export default class CollectionResolver {
    @Query(() => Collection)
    async collectionById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.product.findUnique({
            where: { id },
        })
    }

    @Query(() => [CollectionWithCount])
    async allCollections(@Ctx() ctx: Context) {
        const res = await ctx.prisma.collection.findMany({
            // include: {
            //     products: true,
            // },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        })
        console.log(res, 'res')

        return res.map((x) => ({
            ...x,
            productCount: x._count?.products,
        }))
    }

    // @FieldResolver()
    // count(@Root() collection: Collection) {
    //     return collection._count
    // }

    @Mutation(() => Collection)
    async createCollection(
        @Arg('data') data: CollectionCreateInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.collection.create({
            data,
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
