import {propertyMap} from "../utilities/MapperLibrary";
import BaseEntity from "./BaseEntity";

export default class TaskEntity extends BaseEntity {
    @propertyMap("id")
    id: string;

    @propertyMap("name")
    name: string;

    @propertyMap("completed")
    completed: boolean;
}