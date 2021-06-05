import 'reflect-metadata'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    InputType,
    ArgsType,
    Field,
    Int,
    ArgOptions,
    ID,
    Authorized,
    Args,
} from 'type-graphql'
import { Prisma } from '@prisma/client'
import { omit, partial } from 'lodash'
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
    image: string

    @Field()
    collectionId: number
}

@InputType()
export class ProductUpdateInput extends ProductCreateInput {
    @Field()
    id: number
}

@Resolver(Product)
export default class ProductResolver {
    @Query(() => Product)
    async productById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.product.findUnique({
            where: { id },
        })
    }

    @Authorized()
    @Query(() => [Product])
    async allProducts(@Ctx() ctx: Context) {
        return ctx.prisma.product.findMany({
            include: {
                collections: true,
            },
        })
    }

    @Mutation(() => Product)
    async createProduct(
        @Arg('data') data: ProductCreateInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.product.create({
            data: {
                ...data,
                ...omit(data, ['collectionId']),
                collections: {
                    connect: {
                        id: data.collectionId,
                    },
                },
            },
            include: {
                collections: true,
            },
        })
    }

    @Mutation(() => Product)
    async delProduct(
        @Arg('id', (type) => Int!) id: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.product.delete({
            where: {
                id,
            },
        })
    }

    @Mutation(() => Product)
    async updateProduct(
        @Arg('data') data: ProductUpdateInput,
        @Ctx() ctx: Context
    ) {
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
            include: {
                collections: true,
            },
        })
    }
}
