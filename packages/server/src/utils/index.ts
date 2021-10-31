// import { ClassType, InputType, ObjectType } from 'type-graphql'
// import { FieldMetadata } from 'type-graphql/dist/metadata/definitions'
// import { MetadataStorage } from 'type-graphql/dist/metadata/metadata-storage'

// export function PartialType<TClassType extends ClassType>(
//     BaseClass: TClassType
// ) {
//     const metadata: MetadataStorage = (global as any).TypeGraphQLMetadataStorage

//     @ObjectType({ isAbstract: true })
//     @InputType({ isAbstract: true })
//     class PartialClass extends BaseClass {}

//     // Copy relevant fields and create a nullable version on the new type
//     const fields = metadata.fields.filter(
//         (f) => f.target === BaseClass || BaseClass.prototype instanceof f.target
//     )
//     fields.forEach((field) => {
//         console.log(field.schemaName), 'schemaName'
//         const newField = {
//             ...field,
//             typeOptions: { ...field.typeOptions, nullable: true },
//             target: PartialClass,
//         }
//         metadata.fields.push(newField)
//     })

//     return PartialClass
// }

// export function PickType<TClassType extends ClassType>(
//     BaseClass: TClassType,
//     fieldNames: Array<string>
// ) {
//     const metadata: MetadataStorage = (global as any).TypeGraphQLMetadataStorage

//     @ObjectType({ isAbstract: true })
//     @InputType({ isAbstract: true })
//     class PickClass extends BaseClass {}

//     // Copy relevant fields and create a nullable version on the new type
//     const fields = metadata.fields.filter(
//         (f) =>
//             (f.target === BaseClass ||
//                 BaseClass.prototype instanceof f.target) &&
//             fieldNames.includes(f.schemaName)
//     )
//     fields.map((field) => {
//         console.log(field.schemaName), 'schemaName'
//         const newField = {
//             ...field,
//             target: PickClass,
//         }
//         metadata.fields.push(newField)
//     })

//     return PickClass
// }
