import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'
import Base from './Base'

@ObjectType()
export default class User extends Base {
    @Field()
    name: string

    @Field()
    email: string

    password: string

    @Field()
    role?: string

    @Field()
    token?: string
}
