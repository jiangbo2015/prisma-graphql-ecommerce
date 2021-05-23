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
    name: string

    @Field()
    slug: string

    @Field((type) => Product, { nullable: true })
    products?: Product | null
}
