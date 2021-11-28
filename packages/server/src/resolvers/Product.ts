import { Prisma } from '@prisma/client'
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
import { omit } from 'lodash'

const omitId = <T extends { id?: number }>(data: T): Omit<T, 'id'> =>
    omit(data, 'id')

@InputType()
export class ProductInput {
    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    price: number

    @Field()
    image: string

    @Field((type) => Int, { nullable: true })
    id: number

    @Field((type) => Int, { nullable: true })
    collectionId: number
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
    async productCreate(@Arg('data') data: ProductInput, @Ctx() ctx: Context) {
        return ctx.prisma.product.create({
            data: {
                ...omitId(data),
                slug: createSlug(data.title),
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
    async productUpdate(@Arg('data') data: ProductInput, @Ctx() ctx: Context) {
        return ctx.prisma.product.update({
            where: {
                id: data.id,
            },
            data: {
                ...omitId(data),
                slug: createSlug(data.title),
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
