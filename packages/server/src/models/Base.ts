import 'reflect-metadata'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
export default abstract class Base {
    @Field((type) => Int)
    id: number

    @Field((type) => Date)
    createdAt: Date

    @Field((type) => Date)
    updatedAt: Date
}
