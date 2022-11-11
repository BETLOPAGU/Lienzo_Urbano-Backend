import { ClassType, ObjectType, InputType, Field } from "type-graphql";

// adds id property to the base, extended class
export function withId<TClassType extends ClassType>(BaseClass: TClassType) {
    @ObjectType({ isAbstract: true })
    @InputType({ isAbstract: true })
    class IDTrait extends BaseClass {
      @Field(type => Number)
      id!: number;
    }
    return IDTrait;
}