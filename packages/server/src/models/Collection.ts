import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'
import Product from './Product'
import Base from './Base'

@ObjectType()
export default class Collection extends Base {
    @Field()
    title: string

    @Field({ nullable: true })
    description: string

    @Field()
    slug: string

    @Field((type) => [Product])
    products: Product[]
}
