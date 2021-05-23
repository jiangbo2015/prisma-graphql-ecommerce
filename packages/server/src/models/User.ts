import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
export default class User {
    @Field((type) => Int)
    id: number

    @Field((type) => Date)
    createdAt: Date

    @Field((type) => Date)
    updatedAt: Date

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field()
    role?: string

    @Field()
    token?: string
}
