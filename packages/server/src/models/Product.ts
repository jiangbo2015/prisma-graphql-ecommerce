import 'reflect-metadata'
import { ObjectType, Field, Int, ID } from 'type-graphql'
import Collection from './Collection'

@ObjectType()
export default class Product {
    @Field((type) => Int)
    id: number

    @Field((type) => Date)
    createdAt: Date

    @Field((type) => Date)
    updatedAt: Date

    @Field()
    title: string

    @Field()
    price: number

    @Field()
    image?: string

    @Field()
    slug: string

    @Field(() => [Collection], { nullable: true })
    collections?: Collection[] | null
}
