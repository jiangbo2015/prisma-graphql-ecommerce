import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'
import Base from './Base'

@ObjectType()
export default class Customer extends Base {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field()
    token?: string
}
