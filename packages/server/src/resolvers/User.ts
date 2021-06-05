import 'reflect-metadata'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    InputType,
    Field,
} from 'type-graphql'
import { omit } from 'lodash'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { Context } from '../context'

@InputType()
export class UserCreateInput {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field({ nullable: true })
    role?: string

    @Field({ nullable: true })
    id?: number
}

@InputType()
class UserLoginInput {
    @Field()
    email: string

    @Field()
    password: string
}

@Resolver(User)
export default class UserResolver {
    @Query(() => User)
    async userById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.user.findUnique({
            where: { id },
        })
    }

    @Query(() => [User])
    async allUsers(@Ctx() ctx: Context) {
        return ctx.prisma.user.findMany()
    }

    @Mutation(() => User)
    async login(@Arg('data') data: UserLoginInput, @Ctx() ctx: Context) {
        const res = await ctx.prisma.user.findFirst({
            where: data,
        })
        if (!res) {
            throw Error('Email or Password error')
        }
        const token = jwt.sign(
            {
                id: res.id,
                email: res.email,
                role: res.role,
            },
            'supersecret',
            {
                expiresIn: '30d',
            }
        )

        return { ...res, token }
    }

    @Mutation(() => User)
    async createUser(@Arg('data') data: UserCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.user.create({
            data: {
                ...omit(data, ['id']),
            },
        })
    }

    @Mutation(() => User)
    async updateUser(@Arg('data') data: UserCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                ...omit(data, ['id']),
            },
        })
    }

    @Mutation(() => User)
    async delUser(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.user.delete({
            where: {
                id,
            },
        })
    }
}
