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
    Int,
} from 'type-graphql'
import Collection from '../models/Collection'
import { Context } from '../context'
import { createSlug } from '../utils/slug'
@InputType()
class CollectionBaseInput {
    @Field()
    title: string

    @Field({ nullable: true })
    description: string
}

@Resolver(Collection)
export default class CollectionResolver {
    @Query(() => Collection)
    async collectionById(
        @Arg('id', (type) => Int) id: number,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.collection.findUnique({
            where: { id },
        })
    }

    @Query(() => [Collection])
    async collectionList(@Ctx() ctx: Context) {
        return ctx.prisma.collection.findMany({
            include: {
                products: true,
            },
        })
    }

    @Mutation(() => Collection)
    async collectionCreate(
        @Arg('data') data: CollectionBaseInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.collection.create({
            data: {
                ...data,
                slug: createSlug(data.title),
            },
        })
    }

    @Mutation(() => Collection)
    async collectionUpdate(
        @Arg('id', (type) => Int) id: number,
        @Arg('data') data: CollectionBaseInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.collection.update({
            where: {
                id,
            },
            data: {
                ...data,
                slug: createSlug(data.title),
            },
        })
    }

    @Mutation(() => Collection)
    async collectionDelete(
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
