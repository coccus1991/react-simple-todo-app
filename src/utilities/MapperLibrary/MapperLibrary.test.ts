import {ModelMapper, propertyMap} from "./MapperLibrary";

class User {
    @propertyMap("first_name")
    name = "";

    surname = "";

    age  = 0;
}

test('test mapping', () => {
    const user = new ModelMapper(User).map({first_name: "pippo", second_name: "pippa", age: 20})

    // case with propertyMap expected cast first_name into name
    expect(user.name).toBe("pippo");

    //case neither property-map nor the property has the same key of the source, expected the value keeps null
    expect(user.surname).toBe("");

    //case where exist the same key of the source, expected will be mapped
    expect(user.age).toBe(20);
})
