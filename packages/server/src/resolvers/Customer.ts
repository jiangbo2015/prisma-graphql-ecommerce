import 'reflect-metadata'
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    InputType,
    Int,
    Field,
} from 'type-graphql'
import jwt from 'jsonwebtoken'
import { IsEmail } from 'class-validator'
import Customer from '../models/Customer'
import { Context } from 'src/context'

@InputType()
export class CustomerBaseInput {
    @Field()
    name: string

    @Field()
    @IsEmail({}, { message: 'not an email input' })
    email: string

    @Field()
    password: string
}

@InputType()
export class LoginInput {
    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string
}

@Resolver(Customer)
export default class CustomerResolver {
    @Query(() => Customer)
    async customerById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.customer.findUnique({
            where: { id },
        })
    }

    @Query(() => [Customer])
    async customerList(@Ctx() ctx: Context) {
        return ctx.prisma.customer.findMany()
    }

    @Mutation(() => Customer)
    async customerLogin(@Arg('data') data: LoginInput, @Ctx() ctx: Context) {
        const res = await ctx.prisma.customer.findFirst({
            where: data,
        })
        if (!res) {
            throw Error('Email or Password error')
        }
        const token = jwt.sign(
            {
                id: res.id,
                email: res.email,
            },
            'supersecret',
            {
                expiresIn: '30d',
            }
        )

        console.log(res, 'res')
        return { ...res, token }
    }

    @Mutation(() => Customer)
    async customerCreate(
        @Arg('data') data: CustomerBaseInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.customer.create({
            data,
        })
    }

    @Mutation(() => Customer)
    async customerUpdate(
        @Arg('id', (type) => Int) id: number,
        @Arg('data') data: CustomerBaseInput,
        @Ctx() ctx: Context
    ) {
        return ctx.prisma.customer.update({
            where: {
                id,
            },
            data,
        })
    }

    @Mutation(() => Customer)
    async customerDelete(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.customer.delete({
            where: {
                id,
            },
        })
    }
}
