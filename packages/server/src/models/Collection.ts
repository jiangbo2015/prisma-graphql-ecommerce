import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'
import Product from './Product'

@ObjectType()
export default class Collection {
    @Field((type) => Int)
    id: number

    @Field((type) => Date)
    createdAt: Date

    @Field((type) => Date)
    updatedAt: Date

    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    slug: string

    @Field((type) => [Product])
    products: Product[]
}
