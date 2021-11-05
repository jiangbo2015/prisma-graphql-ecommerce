import 'reflect-metadata'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    InputType,
    Field,
    FieldResolver,
    Root,
    Int,
} from 'type-graphql'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { Context } from 'src/context'

@InputType()
export class UserBaseInput {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field({ nullable: true })
    role?: string
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
    async userList(@Ctx() ctx: Context) {
        return ctx.prisma.user.findMany()
    }

    @Mutation(() => User)
    async userLogin(@Arg('data') data: UserLoginInput, @Ctx() ctx: Context) {
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
    async userCreate(@Arg('data') data: UserBaseInput, @Ctx() ctx: Context) {
        return ctx.prisma.user.create({
            data,
        })
    }

    @Mutation(() => User)
    async userUpdate(
        @Arg('id', (type) => Int) id: number,
        @Arg('data') data: UserBaseInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.user.update({
            where: {
                id,
            },
            data,
        })
    }

    @Mutation(() => User)
    async userDelete(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.user.delete({
            where: {
                id,
            },
        })
    }

    // @FieldResolver()
    // avgRating(@Root() user: User): string {
    //     return user.email
    // }
}
