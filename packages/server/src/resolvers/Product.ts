import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg, Ctx, InputType, Field, Int } from 'type-graphql'
import { omit } from 'lodash'
import Product from '../models/Product'
import { Context } from '../context'

@InputType()
export class ProductCreateInput {
    @Field()
    title: string

    @Field()
    slug: string

    @Field()
    price: number

    @Field()
    collectionId: number

    @Field()
    id?: number
}

@Resolver(Product)
export default class ProductResolver {
    @Query(() => Product)
    async productById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.product.findUnique({
            where: { id },
        })
    }

    @Query(() => [Product])
    async allProducts(@Ctx() ctx: Context) {
        return ctx.prisma.product.findMany({
            include: {
                collections: true,
            },
        })
    }

    @Mutation(() => Product)
    async addProduct(@Arg('data') data: ProductCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.product.create({
            data: {
                ...omit(data, ['id', 'collectionId']),
                collections: {
                    connect: {
                        id: data.collectionId,
                    },
                },
            },
        })
    }

    @Mutation(() => Product)
    async delProduct(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.product.delete({
            where: {
                id,
            },
        })
    }

    @Mutation(() => Product)
    async updateProduct(@Arg('data') data: ProductCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.product.update({
            where: {
                id: data.id,
            },
            data: {
                ...omit(data, ['id', 'collectionId']),
                collections: {
                    connect: {
                        id: data.collectionId,
                    },
                },
            },
        })
    }
}
