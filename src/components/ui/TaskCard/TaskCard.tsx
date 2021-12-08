import React from "react";
import TaskEntity from "../../../entities/TaskEntity";
import classes from "./TaskCard.module.scss"

interface TaskCardComponentInterface {
    task: TaskEntity
    onDelete?: (task: TaskEntity) => void
    onEditStatus?: (task: TaskEntity) => void
}

export default (props: TaskCardComponentInterface) => {
    const onDeleteHandler = () => {
        if (props.onDelete) {
            props.onDelete(props.task)
        }
    }

    const onEditStatusHandler = () => {
        if (props.onEditStatus) {
            props.onEditStatus(props.task)
        }
    }
    return (
        <div className={`${classes.TaskCardComponent} row`}>
            <div className="col-9">
                <h3>{props.task.name}</h3>
                <hr/>
                <p>{props.task.description}</p>
            </div>
            <div className={`col-md-3`}>
                <div className={`d-grid gap-2 p-1`}>
                    <button onClick={onEditStatusHandler} className={`btn mb-2 ${props.task.completed ? "btn-success": "btn-primary"}`}
                            type="button">{props.task.completed ? "Completed" : "To Do"}</button>
                    <button onClick={onDeleteHandler} className="btn btn-danger" type="button">Delete</button>
                </div>
            </div>
        </div>
    );
}
