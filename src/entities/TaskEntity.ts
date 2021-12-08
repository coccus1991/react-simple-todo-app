import {propertyMap} from "../utilities/MapperLibrary";
import BaseEntity from "./BaseEntity";

export default class TaskEntity extends BaseEntity {
    @propertyMap("id")
    id: string;

    @propertyMap("created_date")
    create_date: number;

    @propertyMap("name")
    name: string;

    @propertyMap("description")
    description: string;

    @propertyMap("completed")
    completed: boolean;
}
