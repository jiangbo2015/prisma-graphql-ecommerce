import 'reflect-metadata'
import { ObjectType, Field, Int, ID } from 'type-graphql'
import Collection from './Collection'
import Base from './Base'

@ObjectType()
export default class Product extends Base {
    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    price: number

    @Field()
    image?: string

    @Field()
    slug: string

    @Field(() => [Collection], { nullable: 'itemsAndList' })
    collections: Collection[]
}
