import 'reflect-metadata'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    InputType,
    Field,
    Int,
} from 'type-graphql'

import Product from '../models/Product'
import { Context } from '../context'
import { createSlug } from '../utils/slug'

@InputType()
export class ProductBaseInput {
    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    price: number

    @Field()
    image: string
}

@InputType()
export class ProductUpdateInput extends ProductBaseInput {
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

    @Query(() => [Product])
    async productList(@Ctx() ctx: Context) {
        return ctx.prisma.product.findMany({
            include: {
                collections: true,
            },
        })
    }

    @Mutation(() => Product)
    async productCreate(
        @Arg('data') data: ProductBaseInput,
        @Arg('collectionId') collectionId: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.product.create({
            data: {
                ...data,
                slug: createSlug(data.title),
                collections: {
                    connect: {
                        id: collectionId,
                    },
                },
            },
            include: {
                collections: true,
            },
        })
    }

    @Mutation(() => Product)
    async productUpdate(
        @Arg('id', (type) => Int!) id: number,
        @Arg('data') data: ProductBaseInput,
        @Arg('collectionId') collectionId: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.product.update({
            where: {
                id,
            },
            data: {
                ...data,
                slug: createSlug(data.title),
                collections: {
                    connect: {
                        id: collectionId,
                    },
                },
            },
            include: {
                collections: true,
            },
        })
    }

    @Mutation(() => Product)
    async productDelete(
        @Arg('id', (type) => Int!) id: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.product.delete({
            where: {
                id,
            },
        })
    }
}
