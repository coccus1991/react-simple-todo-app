import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {TaskActions} from "../../store/actions/TaskActions";
import classes from "./ListTasksContainer.module.scss"
import TaskCard from "../../components/ui/TaskCard/TaskCard";
import TaskEntity from "../../entities/TaskEntity";


export default () => {
    const tasks = useSelector((state: RootState) => state.taskStore.tasks)

    const onEditStatusHandler = (task: TaskEntity) => {
        task.completed = !task.completed;
        TaskActions.updateTask(task);
    }

    useEffect(() => {
        TaskActions.getTasks();
    }, [])

    return (
        <div className={`${classes.ListTasksContainer} row`}>
            <div className="col-xs-12">
                <ul>
                    {tasks.map(task =>
                        <li className="mb-3" key={task.id}>
                            <TaskCard onEditStatus={onEditStatusHandler} task={task}/>
                        </li>
                    )
                    }
                </ul>
            </div>
        </div>
    );
}
