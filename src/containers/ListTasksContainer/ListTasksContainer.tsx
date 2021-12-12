import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useSearchParams, Link} from "react-router-dom";
import {TaskActions} from "../../store/actions/TaskActions";
import classes from "./ListTasksContainer.module.scss"
import TaskCard from "../../components/ui/TaskCard/TaskCard";
import TaskEntity from "../../entities/TaskEntity";
import AlertService from "../../services/alert/AlertService";


export default () => {
    let tasks = useSelector((state: RootState) => state.taskStore.tasks)
    const searchParams = useSearchParams();


    const filter = searchParams[0].get("filter") || "all";

    tasks = tasks.filter(task => {
        switch (filter.toLowerCase()) {
            case "todo":
                return !task.completed;
            case "completed":
                return task.completed;
        }
        return true;
    }).sort((a, b) => {
        return b.created_date - a.created_date
    });

    const onEditStatusHandler = (task: TaskEntity) => {
        task.completed = !task.completed;
        TaskActions.updateTask(task);
    }

    const onDeleteHandler = async (task: TaskEntity) => {
        const check = await AlertService.confirm({
            text: "Do you wanna delete the task?"
        });

        if (!check) return;

        try {
            TaskActions.deleteTask(task)
            AlertService.success({text: "Task deleted with success!"})
        } catch (e) {
            AlertService.error({text: "Something went wrong..."});
        }

    }

    useEffect(() => {
        TaskActions.getTasks();
    }, [])

    return (
        <div className={`${classes.ListTasksContainer} row`}>
            <div className="col-12 mb-4">
                <h3 className="mb-3">Filter</h3>
                <div className="btn-group col-12" role="group" aria-label="Basic outlined example">
                    <Link className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
                          to={"?filter=all"}>All</Link>
                    <Link className={`btn btn-outline-primary ${filter === "todo" ? "active" : ""}`}
                          to={"?filter=todo"}>TODO</Link>
                    <Link className={`btn btn-outline-primary ${filter === "completed" ? "active" : ""}`}
                          to={"?filter=completed"}>Completed</Link>
                </div>
                <hr/>
            </div>

            <div className="col-12">
                <ul>
                    {tasks.length > 0 ? tasks.map(task =>
                        <li className="mb-3" key={task.id}>
                            <TaskCard onDelete={onDeleteHandler} onEditStatus={onEditStatusHandler} task={task}/>
                        </li>
                    ) : <h2 className="text-center p-5">No tasks</h2>
                    }
                </ul>
            </div>
        </div>
    );
}
