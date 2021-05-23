import 'reflect-metadata'
import { Resolver, Query, Mutation, Arg, Ctx, InputType, Field } from 'type-graphql'
import { omit } from 'lodash'
import jwt from 'jsonwebtoken'

import Customer from '../models/Customer'
import { Context } from '../context'

@InputType()
export class CustomerCreateInput {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field({ nullable: true })
    id?: number
}

@InputType()
class LoginInput {
    @Field()
    email: string

    @Field()
    password: string
}

@Resolver(Customer)
export default class CustomerResolver {
    @Query(() => Customer)
    async CustomerById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.customer.findUnique({
            where: { id },
        })
    }

    @Query(() => [Customer])
    async allCustomers(@Ctx() ctx: Context) {
        return ctx.prisma.customer.findMany()
    }

    @Mutation(() => Customer)
    async login(@Arg('data') data: LoginInput, @Ctx() ctx: Context) {
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
    async createCustomer(@Arg('data') data: CustomerCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.customer.create({
            data: {
                ...omit(data, ['id']),
            },
        })
    }

    @Mutation(() => Customer)
    async updateCustomer(@Arg('data') data: CustomerCreateInput, @Ctx() ctx: Context) {
        return ctx.prisma.customer.update({
            where: {
                id: data.id,
            },
            data: {
                ...omit(data, ['id']),
            },
        })
    }

    @Mutation(() => Customer)
    async delCustomer(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.customer.delete({
            where: {
                id,
            },
        })
    }
}
