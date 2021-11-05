import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'

// add isAbstract to prevent generate schema
@ObjectType({ isAbstract: true })
export default class Base {
    @Field((type) => Int)
    id: number

    @Field((type) => Date)
    createdAt: Date

    @Field((type) => Date)
    updatedAt: Date
}
